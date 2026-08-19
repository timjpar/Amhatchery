"use client";

import type { ThemeName } from "@/app/_types";
import { THEMES, nextTheme, useTheme } from "./ThemeProvider";

/**
 * One icon per theme, drawn on a 24×24 grid with currentColor strokes so each
 * inherits whatever surface the button is sitting on.
 */
const ICONS: Record<ThemeName, React.ReactNode> = {
  /* A Marans egg — the terracotta-brown one. */
  marans: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 3c3.2 0 6 4.6 6 8.6A6 6 0 0 1 6 11.6C6 7.6 8.8 3 12 3z" />
      <path d="M9.6 12.4a2.6 2.6 0 0 0 4.8 0" />
    </svg>
  ),
  /* Sun */
  eggshell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2 12h2M20 12h2M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5" />
    </svg>
  ),
  /* Heat lamp */
  brooder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.45.95 1.13.95 1.85V17h5.3v-1.35c0-.72.35-1.4.95-1.85A6 6 0 0 0 12 3z" />
      <path d="M9.6 20h4.8" />
    </svg>
  ),
};

/**
 * Cycles the palette: Marans → Eggshell → Brooder → Marans. Shows the theme
 * you are currently in; the tooltip names the one the next click brings up.
 * Lives in the nav rail, so it inherits --c-rail-fg for its colors.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, cycleTheme } = useTheme();
  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];
  const upNext = nextTheme(current.id);
  const spin = THEMES.findIndex((t) => t.id === current.id) * 180;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`group inline-flex items-center gap-2 h-9 pl-2.5 pr-3 rounded-btn border transition-colors cursor-pointer ${className}`}
      style={{
        borderColor: "color-mix(in srgb, currentColor 28%, transparent)",
        color: "inherit",
      }}
      aria-label={`Theme: ${current.label}. Switch to ${upNext.label} — ${upNext.hint}.`}
      title={`Switch to ${upNext.label} — ${upNext.hint}`}
    >
      <span
        className="relative flex-none w-4 h-4 transition-transform duration-500"
        style={{ transform: `rotate(${spin}deg)` }}
        aria-hidden="true"
      >
        {ICONS[current.id]}
      </span>
      <span className="label-mono" style={{ fontSize: "0.625rem" }}>
        {current.label}
      </span>
    </button>
  );
}
