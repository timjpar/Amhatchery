"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { ThemeName, ThemeOption } from "@/app/_types";

const STORAGE_KEY = "amh-theme";

/**
 * The themes, in the order the nav toggle cycles them. The first entry is the
 * default — it must match the `:root` block in globals.css, the `data-theme`
 * attribute on <html>, and the inline flash-prevention script in layout.tsx.
 */
export const THEMES: ThemeOption[] = [
  {
    id: "marans",
    label: "Marans",
    hint: "Cream paper, terracotta ink, sage bands",
  },
  {
    id: "eggshell",
    label: "Eggshell",
    hint: "Warm almanac paper, green rail",
  },
  {
    id: "brooder",
    label: "Brooder",
    hint: "Dark, heat-lamp glow",
  },
];

const DEFAULT_THEME: ThemeName = THEMES[0].id;
const ALLOWED_THEMES: ThemeName[] = THEMES.map((t) => t.id);

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

/** The theme after `theme` in the cycle, wrapping back to the first. */
export function nextTheme(theme: ThemeName): ThemeOption {
  const i = THEMES.findIndex((t) => t.id === theme);
  return THEMES[(i + 1) % THEMES.length];
}

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  cycleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: ThemeName) => writeTheme(next), []);

  // Reads the stored value rather than closing over `theme`, so rapid clicks
  // always step from what is actually on <html>.
  const cycleTheme = useCallback(() => {
    writeTheme(nextTheme(getSnapshot()).id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
