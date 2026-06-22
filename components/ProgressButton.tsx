"use client";

import { useProgress } from "@/lib/useProgress";

export default function ProgressButton({ slug }: { slug: string }) {
  const { isComplete, toggle } = useProgress();
  const done = isComplete(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        done
          ? "bg-emerald-600 text-white hover:bg-emerald-700"
          : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      }`}
    >
      <CheckIcon />
      {done ? "Completed" : "Mark as complete"}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
