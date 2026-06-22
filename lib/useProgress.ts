"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sd-progress-completed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Tracks completed topic slugs in localStorage and keeps every mounted
 * consumer in sync via a custom event.
 */
export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    // Hydrate from localStorage after mount, then keep in sync via events.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(read());
    const sync = () => setCompleted(read());
    window.addEventListener("sd-progress-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("sd-progress-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const persist = useCallback((next: string[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("sd-progress-change"));
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      const current = read();
      const next = current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug];
      persist(next);
    },
    [persist],
  );

  const isComplete = useCallback(
    (slug: string) => completed.includes(slug),
    [completed],
  );

  return { completed, isComplete, toggle };
}
