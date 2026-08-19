/**
 * Contact-form contract.
 *
 * The form posts straight from the visitor's browser to FormSubmit
 * (app/_lib/submitForm.ts), so there is no server-side counterpart to keep in
 * sync any more — these values drive the rendered `<select>` and the `maxLength`
 * on each input.
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

/**
 * Maximum accepted length per field, applied as `maxLength` on the inputs.
 * These are a UX guard, not a security control: the FormSubmit endpoint is
 * reachable without this site, so `submitForm` keeps its own backstop cap.
 */
export const FIELD_LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  interest: 50,
  message: 5000,
} as const;
