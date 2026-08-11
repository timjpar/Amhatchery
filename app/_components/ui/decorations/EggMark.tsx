/**
 * The AM Hatchery mark: an egg with a zigzag pip line across the crown.
 * Drawn in currentColor so it works on the dark nav rail and on cream paper.
 */
export function EggMark({
  size = 32,
  className = "",
  accent = "var(--c-accent)",
}: {
  size?: number;
  className?: string;
  accent?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Egg body */}
      <path
        d="M20 4c6.2 0 11.5 8.6 11.5 16.6C31.5 28.6 26.4 34 20 34S8.5 28.6 8.5 20.6C8.5 12.6 13.8 4 20 4Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Pip line — the crack a chick makes on the way out */}
      <path
        d="M9.6 16.5l3.9 2.6 3.6-3.4 3.6 3.4 3.6-3.4 3.6 3.4 3.2-2.4"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small feather used as a section flourish. */
export function Feather({
  size = 28,
  className = "",
  color = "var(--c-brand)",
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M25 5c2.5 6.5.6 13.4-4.6 17.6-3.2 2.6-7 3.4-9.9 2.3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M25 5c-7.7-.6-14 3.2-16.4 9.2-1.5 3.7-1 7.6.9 10.7L7 28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 9.6c3.4-1.6 7.2-2.2 10.8-1.8M10 14.4c3.2-1.3 6.7-1.7 10-1.2M9.2 19.6c2.7-1 5.6-1.3 8.4-.9"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}
