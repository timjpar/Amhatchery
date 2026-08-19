import { LINKS } from "@/app/_config/links";

/**
 * Failure notice for the contact form.
 *
 * When delivery actually failed we say so and hand over a route that doesn't
 * depend on us. Submissions post straight from the visitor's browser to
 * FormSubmit, so a failure here is real — there's no server-side fallback
 * quietly holding the message.
 */
export function FormErrorNotice({
  message,
  showFallback = false,
}: {
  message: string;
  showFallback?: boolean;
}) {
  return (
    <div
      role="alert"
      className="text-sm p-3 rounded-btn"
      style={{
        background: "color-mix(in srgb, var(--c-brand) 14%, transparent)",
        color: "var(--c-brand)",
      }}
    >
      <p className="m-0">{message}</p>
      {showFallback && (
        <p className="m-0 mt-2">
          Call or text us at{" "}
          <a href={LINKS.phoneHref} style={{ color: "inherit", fontWeight: 600 }}>
            {LINKS.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${LINKS.email}`} style={{ color: "inherit", fontWeight: 600 }}>
            {LINKS.email}
          </a>
          .
        </p>
      )}
    </div>
  );
}
