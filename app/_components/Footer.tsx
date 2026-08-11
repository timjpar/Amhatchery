import Link from "next/link";
import { LINKS } from "@/app/_config/links";
import { BUSINESS } from "@/app/_config/business";
import { EggMark } from "@/app/_components/ui/decorations/EggMark";
import { SocialButtons } from "@/app/_components/ui/SocialLinks";

const columns: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "What We Hatch",
    links: [
      { href: "/hatching-eggs", label: "Hatching & Eating Eggs" },
      { href: "/chickens", label: "Chickens & Chicks" },
      { href: "/ducks", label: "Ducks & Ducklings" },
      { href: "/quail", label: "Quail" },
      { href: "/available", label: "Available Now" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/guides/incubation", label: "Incubation Guide" },
      { href: "/guides/brooding", label: "Brooding & Chick Care" },
      { href: "/guides/faq", label: "Hatchery FAQ" },
      { href: "/reserve", label: "How Reserving Works" },
    ],
  },
  {
    title: "Visit",
    links: [
      { href: "/about", label: "About the Hatchery" },
      { href: "/farm-shop", label: "Farm Shop" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rail-bg relative overflow-hidden pt-14 pb-6">
      <div className="absolute inset-0 mesh opacity-30" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10 pb-10 border-b"
          style={{ borderColor: "color-mix(in srgb, var(--c-rail-fg) 14%, transparent)" }}
        >
          {/* Brand */}
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4"
              style={{ color: "var(--c-rail-fg)", textDecoration: "none" }}
            >
              <EggMark size={30} />
              <span className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {BUSINESS.name}
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed max-w-xs mb-5"
              style={{ color: "color-mix(in srgb, var(--c-rail-fg) 72%, transparent)" }}
            >
              A small family hatchery in Newport, Tennessee. Fertile hatching eggs,
              day-old chicks, ducklings, and quail — hatched here, picked up here.
            </p>
            <div className="max-w-[240px]">
              <SocialButtons />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className="label-mono mb-4"
                style={{ color: "color-mix(in srgb, var(--c-rail-fg) 55%, transparent)" }}
              >
                {col.title}
              </h3>
              <nav className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{
                      color: "var(--c-rail-fg)",
                      opacity: 0.72,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div
          className="py-6 flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2 border-b"
          style={{ borderColor: "color-mix(in srgb, var(--c-rail-fg) 14%, transparent)" }}
        >
          <p className="label-mono" style={{ color: "color-mix(in srgb, var(--c-rail-fg) 55%, transparent)" }}>
            Newport, TN · By appointment
          </p>
          <a href={LINKS.phoneHref} className="text-sm" style={{ color: "var(--c-accent)" }}>
            {LINKS.phone}
          </a>
          <a href={`mailto:${LINKS.email}`} className="text-sm" style={{ color: "var(--c-accent)" }}>
            {LINKS.email}
          </a>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
          style={{ color: "color-mix(in srgb, var(--c-rail-fg) 50%, transparent)" }}
        >
          <p>© {year} {BUSINESS.name}. All rights reserved.</p>
          <p>
            Sister farms:{" "}
            <a href={LINKS.rabbitry} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
              AMRabbits
            </a>{" "}
            ·{" "}
            <a href={LINKS.farmstead} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
              Firstfruits Farmstead
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
