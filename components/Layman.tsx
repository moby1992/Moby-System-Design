"use client";

import { useExplanationMode } from "./ExplanationModeProvider";

/** Renders its children only when "Simple" (layman) mode is active. */
export default function Layman({ children }: { children: React.ReactNode }) {
  const { mode } = useExplanationMode();
  if (mode !== "layman") return null;
  return (
    <div className="my-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
        <span aria-hidden>🌱</span> In plain English
      </div>
      {children}
    </div>
  );
}
