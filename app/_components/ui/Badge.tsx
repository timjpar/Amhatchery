import type { Availability } from "@/app/_types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "accent" | "muted" | "soft-brand" | "soft-accent";
}

export function Badge({ children, variant = "brand" }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    brand: { background: "var(--c-brand)", color: "var(--c-brand-fg)" },
    accent: { background: "var(--c-accent)", color: "var(--c-accent-fg)" },
    /* Opaque, not a tint — these pills also sit on top of photographs. */
    muted: {
      background: "var(--c-panel)",
      color: "var(--c-ink-2)",
      border: "1px solid var(--c-line)",
    },
    "soft-brand": {
      background: "color-mix(in srgb, var(--c-brand) 16%, var(--c-page))",
      color: "var(--c-link)",
    },
    "soft-accent": {
      background: "color-mix(in srgb, var(--c-accent) 26%, var(--c-page))",
      color: "color-mix(in srgb, var(--c-accent-fg) 78%, var(--c-ink))",
    },
  };

  return (
    <span
      className="label-mono inline-flex items-center px-2.5 py-1 rounded-btn"
      style={styles[variant]}
    >
      {children}
    </span>
  );
}

const AVAILABILITY_COPY: Record<Availability, { label: string; variant: BadgeProps["variant"] }> = {
  available: { label: "Hatching now", variant: "soft-brand" },
  seasonal: { label: "Seasonal", variant: "soft-accent" },
  "coming-soon": { label: "Coming soon", variant: "muted" },
};

export function AvailabilityBadge({ status }: { status: Availability }) {
  const { label, variant } = AVAILABILITY_COPY[status];
  return <Badge variant={variant}>{label}</Badge>;
}
