"use client";

import { useTheme } from "./ThemeProvider";

/**
 * Two-state theme toggle: "Eggshell" (daylight) ↔ "Brooder" (heat-lamp dark).
 * Lives in the nav rail, so it inherits --c-rail-fg for its colors.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isBrooder = theme === "brooder";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group inline-flex items-center gap-2 h-9 pl-2.5 pr-3 rounded-btn border transition-colors cursor-pointer ${className}`}
      style={{
        borderColor: "color-mix(in srgb, currentColor 28%, transparent)",
        color: "inherit",
      }}
      aria-label={`Switch to the ${isBrooder ? "Eggshell" : "Brooder"} theme`}
      title={`Switch to the ${isBrooder ? "Eggshell" : "Brooder"} theme`}
    >
      <span
        className="relative flex-none w-4 h-4 transition-transform duration-500"
        style={{ transform: isBrooder ? "rotate(180deg)" : "none" }}
        aria-hidden="true"
      >
        {isBrooder ? (
          /* Heat lamp */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.45.95 1.13.95 1.85V17h5.3v-1.35c0-.72.35-1.4.95-1.85A6 6 0 0 0 12 3z" />
            <path d="M9.6 20h4.8" />
          </svg>
        ) : (
          /* Sun */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-4 h-4">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2 12h2M20 12h2M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5" />
          </svg>
        )}
      </span>
      <span className="label-mono" style={{ fontSize: "0.625rem" }}>
        {isBrooder ? "Brooder" : "Eggshell"}
      </span>
    </button>
  );
}
