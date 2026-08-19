"use client";

import { useState } from "react";
import { submitContact } from "@/app/_actions/contact";
import { LINKS } from "@/app/_config/links";
import { INTERESTS, FIELD_LIMITS } from "@/app/_config/contact";
import { EggMark } from "@/app/_components/ui/decorations/EggMark";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const result = await submitContact({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      interest: fd.get("interest") as string,
      message: fd.get("message") as string,
      honeypot: fd.get("_h") as string,
    });
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-card border p-10 text-center"
        style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
      >
        <div className="flex justify-center mb-4" style={{ color: "var(--c-brand)" }}>
          <EggMark size={44} />
        </div>
        <h3 className="text-2xl font-semibold mb-2" style={{ color: "var(--c-title)" }}>
          Message sent
        </h3>
        <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: "var(--c-ink-2)" }}>
          Michael usually replies within a day. If it&apos;s time-sensitive — a hatch
          going out this week, say — call or text{" "}
          <a href={LINKS.phoneHref} style={{ color: "var(--c-link)" }}>{LINKS.phone}</a> and
          you&apos;ll get an answer faster.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot */}
      <input name="_h" type="text" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" required>
          <input name="name" type="text" required maxLength={FIELD_LIMITS.name} autoComplete="name" className="input-base" placeholder="Your name" />
        </Field>
        <Field label="Email" required>
          <input name="email" type="email" required maxLength={FIELD_LIMITS.email} autoComplete="email" className="input-base" placeholder="you@email.com" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Phone" hint="optional — fastest way to reach you">
          <input name="phone" type="tel" maxLength={FIELD_LIMITS.phone} autoComplete="tel" className="input-base" placeholder="423-555-0100" />
        </Field>
        <Field label="What are you after?">
          <select name="interest" className="input-base" defaultValue={INTERESTS[0]}>
            {INTERESTS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" required>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={FIELD_LIMITS.message}
          className="input-base resize-y"
          placeholder="How many birds are you looking for, and roughly when?"
        />
      </Field>

      {status === "error" && (
        <p
          className="text-sm p-3 rounded-btn"
          style={{
            background: "color-mix(in srgb, var(--c-brand) 14%, transparent)",
            color: "var(--c-brand)",
          }}
          role="alert"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full h-12 rounded-btn font-semibold text-base transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
        style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)" }}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-mono block mb-2" style={{ color: "var(--c-ink-2)" }}>
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>
            {" "}*
          </span>
        )}
        {hint && <span className="normal-case tracking-normal font-normal"> — {hint}</span>}
      </span>
      {children}
    </label>
  );
}
