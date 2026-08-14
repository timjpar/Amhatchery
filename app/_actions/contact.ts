"use server";

import { LINKS } from "@/app/_config/links";
import { sendInquiryEmail } from "@/app/_lib/mail";

/**
 * Contact form handler. Validates the submission and emails it to the farm
 * inbox (app/_config/links.ts) via app/_lib/mail.ts.
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

export async function submitContact(data: ContactFormData): Promise<ActionResult> {
  // Bots fill hidden fields; humans don't. Pretend success so they move on.
  if (data.honeypot) return { success: true };

  const { name, email, phone, interest, message } = data;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, error: "Please fill in your name, email, and a message." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "That email address doesn't look right — mind checking it?" };
  }

  const result = await sendInquiryEmail({ name, email, phone, interest, message });

  if (result.status !== "sent") {
    // Log the whole submission either way, so an inquiry is never lost to a
    // missing key or a Resend outage — it stays recoverable from the runtime
    // logs while someone fixes the cause.
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
      error:
        "Something went wrong sending that. Please call or text us at " +
        `${LINKS.phone}, or email ${LINKS.email} directly.`,
    };
  }

  return { success: true };
}
