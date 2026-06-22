"use client";

import { useExplanationMode } from "./ExplanationModeProvider";

/** Renders its children only when "Standard" (formal) mode is active. */
export default function Standard({ children }: { children: React.ReactNode }) {
  const { mode } = useExplanationMode();
  if (mode !== "standard") return null;
  return (
    <div className="my-6 rounded-xl border border-indigo-200 bg-indigo-50/60 p-5 dark:border-indigo-900/60 dark:bg-indigo-950/30">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-400">
        <span aria-hidden>📐</span> The standard explanation
      </div>
      {children}
    </div>
  );
}
