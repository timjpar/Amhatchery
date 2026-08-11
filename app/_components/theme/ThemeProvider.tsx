"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { ThemeName } from "@/app/_types";

const STORAGE_KEY = "amh-theme";
const DEFAULT_THEME: ThemeName = "eggshell";
const ALLOWED_THEMES: ThemeName[] = ["eggshell", "brooder"];

/**
 * The chosen theme lives in localStorage, not in React state — the inline
 * script in layout.tsx reads it and stamps data-theme on <html> before React
 * hydrates, which is what prevents a flash of the wrong palette.
 *
 * React subscribes to that external value with useSyncExternalStore rather than
 * copying it into state inside an effect: the server snapshot is the default
 * theme (matching the server-rendered markup), and the client snapshot is the
 * stored value, so hydration stays consistent.
 */

let listeners: Array<() => void> = [];

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  // Keep other tabs in sync too.
  window.addEventListener("storage", onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): ThemeName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored && ALLOWED_THEMES.includes(stored)) return stored;
  } catch {
    /* Safari private mode and similar — fall through to the default. */
  }
  return DEFAULT_THEME;
}

function getServerSnapshot(): ThemeName {
  return DEFAULT_THEME;
}

function writeTheme(next: ThemeName) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* Non-persistent is still better than broken. */
  }
  document.documentElement.setAttribute("data-theme", next);
  listeners.forEach((l) => l());
}

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: ThemeName) => writeTheme(next), []);

  const toggleTheme = useCallback(() => {
    writeTheme(getSnapshot() === "eggshell" ? "brooder" : "eggshell");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
