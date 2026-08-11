import type { ReactElement } from "react";

type JsonLdData = Record<string, unknown>;

/**
 * Renders structured data as a native <script type="application/ld+json"> tag.
 *
 * Per the Next.js JSON-LD guide: use a native <script> (not next/script, which
 * is for executable JS) and scrub "<" to its unicode escape so a value can't
 * break out of the script tag (XSS) when serialized with JSON.stringify.
 */
export function JsonLd({
  data,
}: {
  data: JsonLdData | JsonLdData[];
}): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
