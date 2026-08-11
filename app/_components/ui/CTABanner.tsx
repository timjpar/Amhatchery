import Link from "next/link";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "rail" | "brand" | "accent";
}

export function CTABanner({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "rail",
}: CTABannerProps) {
  const bandClass = { rail: "rail-bg", brand: "brand-band", accent: "section-band" }[variant];
  const fg = variant === "rail" ? "var(--c-rail-fg)" : variant === "brand" ? "var(--c-brand-fg)" : "var(--c-accent-fg)";

  return (
    <section className={`${bandClass} relative overflow-hidden py-16 md:py-20 px-4`}>
      <div className="absolute inset-0 mesh opacity-40" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: fg }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg mb-9 leading-relaxed" style={{ color: fg, opacity: 0.82 }}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center h-12 px-8 font-semibold rounded-btn transition-all hover:opacity-90 active:translate-y-px"
            style={{
              background: "var(--c-accent)",
              color: "var(--c-accent-fg)",
              textDecoration: "none",
            }}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center h-12 px-8 font-semibold rounded-btn border transition-all hover:opacity-80 active:translate-y-px"
              style={{
                borderColor: "color-mix(in srgb, currentColor 40%, transparent)",
                color: fg,
                textDecoration: "none",
              }}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
