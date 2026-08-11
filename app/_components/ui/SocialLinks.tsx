import { LINKS } from "@/app/_config/links";

const SOCIALS = [
  {
    href: LINKS.facebook,
    label: "Facebook",
    brand: "#1877f2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-none">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: LINKS.instagram,
    label: "Instagram",
    brand: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: LINKS.tiktok,
    label: "TikTok",
    brand: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-none">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09z" />
      </svg>
    ),
  },
];

/** Icon-only row — for the nav and tight spots. */
export function SocialLinks({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-btn flex items-center justify-center transition-opacity hover:opacity-100"
          style={{
            color: light ? "var(--c-rail-fg)" : "var(--c-ink-2)",
            opacity: 0.75,
          }}
          aria-label={`Follow us on ${s.label}`}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

/** Full-width labelled buttons — for the footer and contact page. */
export function SocialButtons() {
  return (
    <div className="flex flex-col gap-2.5">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 h-11 px-4 rounded-btn font-medium text-sm transition-opacity hover:opacity-85"
          style={{ background: s.brand, color: "#ffffff", textDecoration: "none" }}
        >
          {s.icon}
          Follow on {s.label}
        </a>
      ))}
    </div>
  );
}
