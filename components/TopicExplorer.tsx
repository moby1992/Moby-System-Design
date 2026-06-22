"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { TopicMeta } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";
import TopicCard from "./TopicCard";

export default function TopicExplorer({ topics }: { topics: TopicMeta[] }) {
  const [query, setQuery] = useState("");
  const { completed, isComplete } = useProgress();

  const fuse = useMemo(
    () =>
      new Fuse(topics, {
        keys: ["title", "summary", "keywords", "category"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [topics],
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return topics;
    return fuse.search(q).map((r) => r.item);
  }, [query, fuse, topics]);

  const completedCount = topics.filter((t) => completed.includes(t.slug)).length;
  const pct = topics.length
    ? Math.round((completedCount / topics.length) * 100)
    : 0;

  return (
    <div>
      {/* Progress */}
      <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            Your progress
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
            {completedCount} of {topics.length} completed
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics (e.g. caching, CAP, queues)…"
          className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-indigo-950"
        />
      </div>

      {/* Grid */}
      {results.length === 0 ? (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          No topics match “{query}”.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((topic) => (
            <TopicCard
              key={topic.slug}
              topic={topic}
              completed={isComplete(topic.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
