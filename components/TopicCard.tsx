"use client";

import Link from "next/link";
import type { TopicMeta } from "@/lib/types";

export default function TopicCard({
  topic,
  completed,
}: {
  topic: TopicMeta;
  completed: boolean;
}) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
          {topic.category}
        </span>
        {completed && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            <CheckIcon /> Done
          </span>
        )}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
        {topic.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {topic.summary}
      </p>
      <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
        <ClockIcon /> {topic.readTime} read
      </div>
    </Link>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
