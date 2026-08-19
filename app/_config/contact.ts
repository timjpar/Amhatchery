/**
 * Contact-form contract shared by the client form and the Server Action.
 *
 * Both sides import from here so the `<select>` options and the server-side
 * allowlist can't drift apart — the action rejects anything not in `INTERESTS`,
 * because that value is interpolated into the outgoing email subject line.
 */

export const INTERESTS = [
  "Hatching eggs",
  "Chicks",
  "Ducklings",
  "Quail",
  "Grown birds",
  "Eating eggs",
  "Something else",
] as const;

export type Interest = (typeof INTERESTS)[number];

export function isInterest(value: string): value is Interest {
  return (INTERESTS as readonly string[]).includes(value);
}

/**
 * Maximum accepted length per field. Enforced server-side before any other
 * work: without these, a multi-megabyte `message` is parsed, held in memory,
 * and forwarded to Resend on every request.
 */
export const FIELD_LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  interest: 50,
  message: 5000,
} as const;

/** Submissions allowed per IP per window. */
export const RATE_LIMIT = {
  max: 3,
  windowMs: 10 * 60 * 1000,
} as const;
