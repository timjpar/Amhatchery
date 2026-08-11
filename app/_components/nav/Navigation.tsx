"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "@/app/_config/links";
import { BUSINESS } from "@/app/_config/business";
import { EggMark } from "@/app/_components/ui/decorations/EggMark";
import { ThemeToggle } from "@/app/_components/theme/ThemeToggle";

type NavLinkDef = { href: string; label: string; note?: string };

const birdLinks: NavLinkDef[] = [
  { href: "/hatching-eggs", label: "Hatching & Eating Eggs", note: "From $10 a dozen" },
  { href: "/chickens", label: "Chickens & Chicks", note: "Chicks from $5" },
  { href: "/ducks", label: "Ducks & Ducklings", note: "Muscovy & Call" },
  { href: "/quail", label: "Quail", note: "Laying at 6 weeks" },
];

const guideLinks: NavLinkDef[] = [
  { href: "/guides/incubation", label: "Incubation Guide", note: "Set to hatch day" },
  { href: "/guides/brooding", label: "Brooding & Chick Care", note: "First six weeks" },
  { href: "/guides/faq", label: "Hatchery FAQ", note: "The common questions" },
];

const flatLinks: NavLinkDef[] = [
  { href: "/available", label: "Available Now" },
  { href: "/farm-shop", label: "Farm Shop" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ============ DESKTOP ============ */}
      <nav
        className="hidden lg:flex items-center justify-between gap-6 px-6 xl:px-10 py-3 sticky top-0 z-[999] rail-bg"
        aria-label="Main navigation"
        style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-rail-fg) 14%, transparent)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          style={{ textDecoration: "none", color: "var(--c-rail-fg)" }}
          aria-label={`${BUSINESS.name} home`}
        >
          <EggMark size={30} />
          <span
            className="text-xl font-semibold tracking-tight leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {BUSINESS.name}
          </span>
        </Link>

        <div className="flex items-center gap-0.5">
          <Dropdown label="What We Hatch" links={birdLinks} active={birdLinks.some((l) => isActive(l.href))} />
          <Dropdown label="Guides" links={guideLinks} active={pathname.startsWith("/guides")} />
          {flatLinks.map((link) => (
            <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <a
            href={LINKS.phoneHref}
            className="label-mono hidden xl:inline"
            style={{ color: "color-mix(in srgb, var(--c-rail-fg) 72%, transparent)", textDecoration: "none" }}
          >
            {LINKS.phone}
          </a>
          <Link
            href="/reserve"
            className="inline-flex items-center h-10 px-5 rounded-btn font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
          >
            Reserve
          </Link>
        </div>
      </nav>

      {/* ============ MOBILE ============ */}
      <nav
        className="lg:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-[999] rail-bg"
        aria-label="Main navigation"
        style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-rail-fg) 14%, transparent)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ textDecoration: "none", color: "var(--c-rail-fg)" }}
          aria-label={`${BUSINESS.name} home`}
        >
          <EggMark size={26} />
          <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            {BUSINESS.name}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/reserve"
            className="inline-flex items-center h-9 px-4 rounded-btn font-semibold text-sm"
            style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
          >
            Reserve
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-btn cursor-pointer"
            style={{ color: "var(--c-rail-fg)" }}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      {drawerOpen && (
        /* Above the announcement banner (z-1001), or it clips the close button. */
        <div className="lg:hidden fixed inset-0 z-[1100]" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-y-auto rail-bg"
            style={{ borderLeft: "1px solid color-mix(in srgb, var(--c-rail-fg) 14%, transparent)" }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-rail-fg) 14%, transparent)" }}
            >
              <span className="label-mono" style={{ color: "color-mix(in srgb, var(--c-rail-fg) 60%, transparent)" }}>
                Menu
              </span>
              <button
                type="button"
                onClick={closeDrawer}
                className="w-10 h-10 flex items-center justify-center rounded-btn cursor-pointer"
                style={{ color: "var(--c-rail-fg)" }}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <div className="px-5 py-6 flex flex-col gap-7">
              <DrawerGroup title="What We Hatch" links={birdLinks} pathname={pathname} onNavigate={closeDrawer} />
              <DrawerGroup title="Guides" links={guideLinks} pathname={pathname} onNavigate={closeDrawer} />
              <DrawerGroup
                title="More"
                links={[...flatLinks, { href: "/contact", label: "Contact" }]}
                pathname={pathname}
                onNavigate={closeDrawer}
              />

              <div className="pt-2 flex flex-col gap-3">
                <Link
                  href="/reserve"
                  onClick={closeDrawer}
                  className="inline-flex items-center justify-center h-12 rounded-btn font-semibold"
                  style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
                >
                  Reserve With a Deposit
                </Link>
                <a
                  href={LINKS.phoneHref}
                  className="inline-flex items-center justify-center h-12 rounded-btn font-semibold border"
                  style={{
                    borderColor: "color-mix(in srgb, var(--c-rail-fg) 32%, transparent)",
                    color: "var(--c-rail-fg)",
                    textDecoration: "none",
                  }}
                >
                  Call or text {LINKS.phone}
                </a>
                <div className="pt-1">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-btn text-sm font-medium transition-colors hover:opacity-100"
      style={{
        color: active ? "var(--c-accent)" : "var(--c-rail-fg)",
        opacity: active ? 1 : 0.85,
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  links,
  active,
}: {
  label: string;
  links: NavLinkDef[];
  active: boolean;
}) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center gap-1.5 px-3 py-2 rounded-btn text-sm font-medium cursor-pointer"
        style={{ color: active ? "var(--c-accent)" : "var(--c-rail-fg)", opacity: active ? 1 : 0.85 }}
        aria-haspopup="true"
      >
        {label}
        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="absolute top-full left-0 pt-2 min-w-[280px] opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity z-50">
        <div
          className="rounded-card border overflow-hidden shadow-soft-lg"
          style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 transition-colors hover:bg-[var(--c-panel)]"
              style={{ color: "var(--c-ink)", textDecoration: "none" }}
            >
              <span className="block text-sm font-semibold" style={{ color: "var(--c-title)" }}>
                {link.label}
              </span>
              {link.note && (
                <span className="label-mono block mt-0.5" style={{ color: "var(--c-ink-2)" }}>
                  {link.note}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DrawerGroup({
  title,
  links,
  pathname,
  onNavigate,
}: {
  title: string;
  links: NavLinkDef[];
  pathname: string;
  /** Closes the drawer — the links own this, so no route-change effect is needed. */
  onNavigate: () => void;
}) {
  return (
    <div>
      <p
        className="label-mono mb-3"
        style={{ color: "color-mix(in srgb, var(--c-rail-fg) 55%, transparent)" }}
      >
        {title}
      </p>
      <div className="flex flex-col">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="py-2.5 text-base font-medium border-b last:border-b-0"
              style={{
                color: active ? "var(--c-accent)" : "var(--c-rail-fg)",
                borderColor: "color-mix(in srgb, var(--c-rail-fg) 10%, transparent)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
