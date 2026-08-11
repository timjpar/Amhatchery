"use server";

/**
 * Contact form handler.
 *
 * NOTE: this currently validates and logs the submission to the server console
 * — it does not email anyone yet. Before launch, wire the marked section below
 * to a mail provider (Resend, SendGrid, or a Formspree-style endpoint) so
 * inquiries actually reach the inbox in app/_config/links.ts.
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

  // TODO: send this to the farm inbox instead of the server log.
  console.log("Hatchery inquiry:", {
    name,
    email,
    phone,
    interest,
    message,
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}
