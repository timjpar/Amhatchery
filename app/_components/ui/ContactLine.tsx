import Link from "next/link";
import { LINKS } from "@/app/_config/links";
import { BUSINESS } from "@/app/_config/business";

/**
 * The "call or text Michael" line that closes most content sections.
 * Centralised so the phone number and inbox only exist in one place.
 */
export function ContactLine({
  lead = "For current availability",
  className = "",
}: {
  lead?: string;
  className?: string;
}) {
  return (
    <p
      className={`text-sm leading-relaxed ${className}`}
      style={{ color: "var(--c-ink-2)" }}
    >
      {lead} — call or text {BUSINESS.contactName} at{" "}
      <a href={LINKS.phoneHref} style={{ color: "var(--c-link)" }}>
        {LINKS.phone}
      </a>
      , email{" "}
      <a href={`mailto:${LINKS.email}`} style={{ color: "var(--c-link)" }}>
        {LINKS.email}
      </a>
      , or{" "}
      <Link href="/contact" style={{ color: "var(--c-link)" }}>
        send a message
      </Link>
      .
    </p>
  );
}
