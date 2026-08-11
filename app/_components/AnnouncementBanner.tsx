import Link from "next/link";

/**
 * Sitewide notice bar. Edit the copy here when the hatch schedule changes —
 * it is not dismissible, so keep it genuinely useful.
 */
export function AnnouncementBanner() {
  return (
    <div
      className="relative z-[1001] w-full text-center"
      style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)" }}
      role="region"
      aria-label="Announcement"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-sm font-medium">
        <span aria-hidden="true">🥚</span>
        <span>
          Spring hatches are running weekly
          <span className="hidden sm:inline"> — chicks, ducklings, and quail available now</span>.
        </span>
        <Link
          href="/available"
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-80"
          style={{ color: "var(--c-accent-fg)" }}
        >
          See what&apos;s hatched
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
