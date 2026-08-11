interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Small mono kicker above the title — the site's typographic signature. */
  eyebrow?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "center",
  light = false,
  className = "",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div className={`${isCentered ? "text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <p
          className={`label-mono mb-4 flex items-center gap-3 ${
            isCentered ? "justify-center" : ""
          }`}
          style={{ color: light ? "var(--c-accent)" : "var(--c-brand)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-px w-6"
            style={{ background: "currentColor", opacity: 0.6 }}
          />
          {eyebrow}
          {isCentered && (
            <span
              aria-hidden="true"
              className="inline-block h-px w-6"
              style={{ background: "currentColor", opacity: 0.6 }}
            />
          )}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold"
        style={{ color: light ? "var(--c-rail-fg)" : "var(--c-title)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed max-w-2xl ${
            isCentered ? "mx-auto" : ""
          }`}
          style={{
            color: light
              ? "color-mix(in srgb, var(--c-rail-fg) 78%, transparent)"
              : "var(--c-ink-2)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
