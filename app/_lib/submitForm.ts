/**
 * Browser-side FormSubmit client.
 *
 * FormSubmit refuses requests originating from cloud infrastructure — a
 * server-side POST from a Vercel function comes back HTTP 403 — so submissions
 * go straight from the visitor's browser, which is how the service is designed
 * to be used. Consequently this form has no Server Action behind it, no API
 * key, and no environment variable to leave unset.
 *
 * Spam handling is the hidden honeypot in the form plus FormSubmit's own
 * filtering. A per-IP limiter isn't possible here and bought little anyway:
 * anything abusive can post to the endpoint directly without involving this
 * site at all.
 *
 * Mirrors the setup already proven on amrabbits.com.
 */

import { LINKS } from "@/app/_config/links";

/** The AJAX endpoint returns JSON; the bare one redirects to FormSubmit's page. */
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax";

/** Longest value we'll relay, per field. Guards against a paste-bomb. */
const MAX_FIELD_LENGTH = 5000;

export interface SubmitResult {
  success: boolean;
  error?: string;
  /** True when delivery failed, so the UI can offer phone/email instead. */
  showFallback?: boolean;
}

export async function submitForm({
  subject,
  fields,
  replyTo,
  honeypot,
}: {
  subject: string;
  /** Label/value pairs, rendered by FormSubmit as rows in the email. */
  fields: Array<[string, string]>;
  replyTo?: string;
  honeypot?: string;
}): Promise<SubmitResult> {
  // Silent success: a bot that filled the hidden field shouldn't learn it was caught.
  if (honeypot) return { success: true };

  if (fields.some(([, value]) => value.length > MAX_FIELD_LENGTH)) {
    return { success: false, error: "That message is longer than we can accept." };
  }

  if (replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
    return { success: false, error: "That email address doesn't look right — mind checking it?" };
  }

  try {
    const res = await fetch(`${FORMSUBMIT_ENDPOINT}/${encodeURIComponent(LINKS.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...Object.fromEntries(fields),
        _subject: subject,
        _template: "table",
        // The AJAX endpoint can't present a challenge, so asking for one would
        // reject every submission.
        _captcha: "false",
        ...(replyTo ? { _replyto: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });

    // FormSubmit answers 200 even when it declines, so the body decides.
    // `success` comes back as the string "true", not a boolean.
    const body: unknown = await res.json().catch(() => null);
    const success =
      typeof body === "object" && body !== null && "success" in body
        ? String((body as { success: unknown }).success) === "true"
        : false;

    if (!res.ok || !success) {
      return {
        success: false,
        error: "We couldn't send your message just now.",
        showFallback: true,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "We couldn't send your message just now.",
      showFallback: true,
    };
  }
}
