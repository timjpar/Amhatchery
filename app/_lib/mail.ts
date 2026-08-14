import { LINKS } from "@/app/_config/links";

/**
 * Transactional email via Resend's REST API.
 *
 * Called over plain `fetch` rather than the `resend` SDK — this is one POST to
 * one endpoint, so a dependency (and its update cadence) isn't worth it.
 *
 * Requires `RESEND_API_KEY`. `MAIL_FROM` must be an address on a domain
 * verified in Resend; it defaults to the hatchery domain. Replies go to the
 * person who filled in the form, so answering from the inbox reaches them
 * directly. See README for the one-time Resend setup.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Inquiries land in the shared farm inbox unless an override is set. */
const TO_ADDRESS = process.env.CONTACT_TO_EMAIL || LINKS.email;
const FROM_ADDRESS = process.env.MAIL_FROM || "AM Hatchery <inquiries@amhatchery.com>";

export type SendResult =
  | { status: "sent" }
  /** No API key configured — caller should fall back to logging. */
  | { status: "not-configured" }
  | { status: "failed"; reason: string };

/** Escapes user-supplied text before it goes into the HTML body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface InquiryEmail {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
}

/**
 * Sends a contact-form inquiry to the farm inbox. Never throws — a mail outage
 * shouldn't surface as an unhandled error in a Server Action, so failures come
 * back as a `failed` result for the caller to handle.
 */
export async function sendInquiryEmail(inquiry: InquiryEmail): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { status: "not-configured" };

  const { name, email, phone, interest, message } = inquiry;

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone?.trim() || "—"],
    ["Interested in", interest],
  ];

  const html = [
    `<h2 style="margin:0 0 16px">New inquiry from amhatchery.com</h2>`,
    `<table cellpadding="6" style="border-collapse:collapse;margin-bottom:16px">`,
    ...rows.map(
      ([label, value]) =>
        `<tr><td style="font-weight:700">${label}</td><td>${escapeHtml(value)}</td></tr>`,
    ),
    `</table>`,
    `<p style="font-weight:700;margin:0 0 4px">Message</p>`,
    `<p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>`,
  ].join("");

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: email,
        subject: `Hatchery inquiry — ${name} (${interest})`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      // Resend puts the useful detail in the body, not the status text.
      return { status: "failed", reason: `${res.status} ${await res.text()}` };
    }

    return { status: "sent" };
  } catch (error) {
    return { status: "failed", reason: String(error) };
  }
}
