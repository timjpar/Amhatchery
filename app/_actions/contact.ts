"use server";

import { headers } from "next/headers";
import { LINKS } from "@/app/_config/links";
import { FIELD_LIMITS, RATE_LIMIT, isInterest } from "@/app/_config/contact";
import { rateLimit } from "@/app/_lib/rate-limit";
import { sendInquiryEmail } from "@/app/_lib/mail";

/**
 * Contact form handler. Validates the submission and emails it to the farm
 * inbox (app/_config/links.ts) via app/_lib/mail.ts.
 *
 * Server Actions are public HTTP endpoints — anything the form can send, a
 * script can send too, and far faster. So this validates independently of the
 * client: length caps first, then an allowlist on `interest`, then a per-IP
 * rate limit, all before a single byte reaches Resend.
 */

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
  honeypot?: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * Strips CR/LF and trims. Applied to every value that ends up in an email
 * header (subject, reply_to) — newlines there are the classic header-injection
 * vector for smuggling extra recipients.
 */
function sanitizeLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Best-effort client IP. Vercel always sets x-forwarded-for at the edge. */
async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip")?.trim() || "unknown";
}

const CONTACT_FALLBACK =
  `Please call or text us at ${LINKS.phone}, or email ${LINKS.email} directly.`;

export async function submitContact(data: ContactFormData): Promise<ActionResult> {
  // Bots fill hidden fields; humans don't. Pretend success so they move on,
  // and spend nothing else on the request.
  if (data.honeypot) return { success: true };

  // Reject oversized input before trimming, sanitizing, or emailing any of it.
  const overLimit = (
    [
      ["name", data.name],
      ["email", data.email],
      ["phone", data.phone],
      ["interest", data.interest],
      ["message", data.message],
    ] as const
  ).some(([field, value]) =>
    typeof value === "string" && value.length > FIELD_LIMITS[field],
  );

  if (overLimit) {
    return {
      success: false,
      error: "That message is longer than we can accept. Please shorten it and try again.",
    };
  }

  const name = sanitizeLine(data.name ?? "");
  const email = sanitizeLine(data.email ?? "");
  const phone = sanitizeLine(data.phone ?? "");
  const interest = sanitizeLine(data.interest ?? "");
  const message = (data.message ?? "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in your name, email, and a message." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "That email address doesn't look right — mind checking it?" };
  }

  // `interest` reaches the email subject line, so it must be one of ours
  // rather than whatever a scripted caller decided to send.
  if (!isInterest(interest)) {
    return { success: false, error: "Please choose one of the listed options." };
  }

  const limit = rateLimit(await clientIp(), RATE_LIMIT.max, RATE_LIMIT.windowMs);
  if (!limit.ok) {
    const minutes = Math.ceil(limit.retryAfter / 60);
    return {
      success: false,
      error:
        `That's a few messages in a short time — please wait about ${minutes} ` +
        `minute${minutes === 1 ? "" : "s"} and try again. In a hurry? ${CONTACT_FALLBACK}`,
    };
  }

  const result = await sendInquiryEmail({ name, email, phone, interest, message });

  if (result.status !== "sent") {
    // Log the whole submission either way, so an inquiry is never lost to a
    // missing key or a Resend outage — it stays recoverable from the runtime
    // logs while someone fixes the cause. (README documents this fallback.)
    //
    // This does put submitted PII in the runtime logs, which is a deliberate
    // trade: for a small farm, losing a real customer's message is worse than
    // it sitting in the owner's own Vercel logs. What makes it acceptable is
    // the rate limit above — previously this branch was an unbounded log-volume
    // amplifier that anyone could drive by making Resend fail.
    console[result.status === "failed" ? "error" : "warn"](
      result.status === "failed"
        ? `Hatchery inquiry: email send failed (${result.reason}) — logging instead:`
        : "Hatchery inquiry: RESEND_API_KEY not set — logging instead:",
      { name, email, phone, interest, message, timestamp: new Date().toISOString() },
    );
  }

  if (result.status === "failed") {
    return {
      success: false,
      error: `Something went wrong sending that. ${CONTACT_FALLBACK}`,
    };
  }

  return { success: true };
}
