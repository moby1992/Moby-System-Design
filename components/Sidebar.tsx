"use client";

import { useState } from "react";
import Link from "next/link";
import type { TopicMeta } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";

function groupByCategory(topics: TopicMeta[]) {
  const groups = new Map<string, TopicMeta[]>();
  for (const t of topics) {
    if (!groups.has(t.category)) groups.set(t.category, []);
    groups.get(t.category)!.push(t);
  }
  return Array.from(groups.entries());
}

function NavList({
  topics,
  currentSlug,
  onNavigate,
}: {
  topics: TopicMeta[];
  currentSlug: string;
  onNavigate?: () => void;
}) {
  const { isComplete } = useProgress();
  return (
    <nav className="space-y-6">
      {groupByCategory(topics).map(([category, items]) => (
        <div key={category}>
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            {category}
          </p>
          <ul className="space-y-0.5">
            {items.map((t) => {
              const active = t.slug === currentSlug;
              return (
                <li key={t.slug}>
                  <Link
                    href={`/topics/${t.slug}`}
                    onClick={onNavigate}
                    className={`flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    }`}
                  >
                    <span>{t.title}</span>
                    {isComplete(t.slug) && (
                      <span className="text-emerald-500" aria-label="completed">
                        <CheckIcon />
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function Sidebar({
  topics,
  currentSlug,
}: {
  topics: TopicMeta[];
  currentSlug: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-4 inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 lg:hidden dark:border-zinc-700 dark:text-zinc-200"
      >
        <MenuIcon /> All topics
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24">
          <NavList topics={topics} currentSlug={currentSlug} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-5 shadow-xl dark:bg-zinc-950">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">All topics</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <CloseIcon />
              </button>
            </div>
            <NavList
              topics={topics}
              currentSlug={currentSlug}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
