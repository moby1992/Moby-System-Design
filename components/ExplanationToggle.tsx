"use client";

import type { ExplanationMode } from "@/lib/types";
import { useExplanationMode } from "./ExplanationModeProvider";

const OPTIONS: { value: ExplanationMode; label: string; hint: string }[] = [
  { value: "layman", label: "Simple", hint: "Plain-English explanation" },
  { value: "standard", label: "Standard", hint: "Formal engineering language" },
];

export default function ExplanationToggle() {
  const { mode, setMode } = useExplanationMode();

  return (
    <div className="sticky top-16 z-20 -mx-4 mb-8 border-b border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Explanation style
        </span>
        <div
          role="tablist"
          aria-label="Explanation style"
          className="inline-flex rounded-full border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
        >
          {OPTIONS.map((opt) => {
            const active = mode === opt.value;
            return (
              <button
                key={opt.value}
                role="tab"
                aria-selected={active}
                title={opt.hint}
                onClick={() => setMode(opt.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white text-indigo-600 shadow-sm dark:bg-zinc-700 dark:text-indigo-300"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
