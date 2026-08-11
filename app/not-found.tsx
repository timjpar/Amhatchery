import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

const elsewhere = [
  { href: "/available", label: "What's available now" },
  { href: "/hatching-eggs", label: "Hatching eggs" },
  { href: "/guides/incubation", label: "Incubation guide" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <section
      className="relative overflow-hidden min-h-[75vh] flex items-center py-20 px-4"
      style={{ background: "var(--c-page)" }}
    >
      <div className="relative max-w-3xl mx-auto w-full">
        <p className="label-mono mb-6" style={{ color: "var(--c-brand)" }}>
          Error 404 · Nothing in this shell
        </p>

        <div className="mb-8" aria-hidden="true">
          <CrackedEgg />
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold mb-5" style={{ color: "var(--c-title)" }}>
          This one didn&apos;t develop.
        </h1>

        <p className="text-lg leading-relaxed max-w-xl mb-10" style={{ color: "var(--c-ink)" }}>
          We candled it and there&apos;s nothing there — the page you asked for
          doesn&apos;t exist, or it moved when the hatchery split off from the
          rabbitry. Here&apos;s where most people were heading:
        </p>

        <ul className="flex flex-col border-t" style={{ borderColor: "var(--c-line)" }}>
          {elsewhere.map((link) => (
            <li key={link.href} className="border-b" style={{ borderColor: "var(--c-line)" }}>
              <Link
                href={link.href}
                className="flex items-center justify-between gap-4 py-4 group"
                style={{ color: "var(--c-title)", textDecoration: "none" }}
              >
                <span className="text-lg font-semibold">{link.label}</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  style={{ color: "var(--c-brand)" }}
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-7 rounded-btn font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
          >
            Back to the hatchery
          </Link>
        </div>
      </div>
    </section>
  );
}

/** An egg split clean in half with nothing inside — the visual joke. */
function CrackedEgg() {
  return (
    <svg viewBox="0 0 120 100" className="w-32 h-28" fill="none" aria-hidden="true">
      {/* Top half, tipped */}
      <g transform="rotate(-16 34 28)">
        <path
          d="M34 6c9 0 16 12 16 22 0 1.6-.2 3.1-.5 4.4L18.6 32C18.2 30.8 18 29.4 18 28 18 18 25 6 34 6Z"
          stroke="var(--c-title)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </g>
      {/* Bottom half */}
      <path
        d="M42 50.5 88 48c1.9 3.6 3 7.6 3 11.6C91 72 80.2 82 67 82S43 72 43 59.6c0-3.2.7-6.3 2-9.1Z"
        stroke="var(--c-title)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Jagged break line */}
      <path
        d="M42 50.5l7-4.5 6 4.5 6-4.5 6 4.5 6-4.5 6 4.5 6-4.5 3 2"
        stroke="var(--c-brand)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
