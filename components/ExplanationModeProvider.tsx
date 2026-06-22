"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ExplanationMode } from "@/lib/types";

const STORAGE_KEY = "sd-explanation-mode";

interface ExplanationModeContextValue {
  mode: ExplanationMode;
  setMode: (mode: ExplanationMode) => void;
}

const ExplanationModeContext = createContext<ExplanationModeContextValue | null>(
  null,
);

export function ExplanationModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setModeState] = useState<ExplanationMode>("layman");

  useEffect(() => {
    const stored = window.localStorage.getItem(
      STORAGE_KEY,
    ) as ExplanationMode | null;
    // Hydrate the persisted preference once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "layman" || stored === "standard") setModeState(stored);
  }, []);

  const value = useMemo<ExplanationModeContextValue>(
    () => ({
      mode,
      setMode: (next) => {
        setModeState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
      },
    }),
    [mode],
  );

  return (
    <ExplanationModeContext.Provider value={value}>
      {children}
    </ExplanationModeContext.Provider>
  );
}

export function useExplanationMode() {
  const ctx = useContext(ExplanationModeContext);
  if (!ctx) {
    throw new Error(
      "useExplanationMode must be used within an ExplanationModeProvider",
    );
  }
  return ctx;
}
