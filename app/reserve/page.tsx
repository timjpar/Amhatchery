import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { ContactLine } from "@/app/_components/ui/ContactLine";
import { PayPalHostedDeposit } from "@/app/_components/payment/PayPalHostedDeposit";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Reserve Chicks, Ducklings, Quail & Hatching Eggs",
  description:
    "Reserve birds from AM Hatchery in Newport, TN with a partial deposit — chicks, ducklings, quail, or hatching eggs. Pay by PayPal, Venmo, card, Cash App, or cash at pickup.",
};

const steps = [
  {
    n: "1",
    title: "Tell us what you want",
    body: "Call or text Michael at 423-540-6566, email, or send a message. Say roughly how many birds and roughly when — we'll tell you which hatch that lands in.",
  },
  {
    n: "2",
    title: "Put a deposit down",
    body: "A partial deposit holds your pick from that hatch and comes straight off the total at pickup. Same-day pickups don't need one.",
  },
  {
    n: "3",
    title: "Pick up in Newport",
    body: "We'll have everything boxed and ready, go through the first week with you, and send you home with the care sheet.",
  },
];

const included = [
  "Deposit applied to the total at pickup",
  "Health check on every bird before it leaves",
  "Care sheet and a walkthrough at pickup",
  "Michael on the phone afterward if something goes sideways",
];

const paymentMethods = [
  { label: "PayPal", icon: "🔵" },
  { label: "Venmo", icon: "💸" },
  { label: "Debit / credit card", icon: "💳" },
  { label: "Cash App ($amrabbits)", icon: "💵" },
  { label: "Cash at pickup", icon: "🤝" },
];

export default function ReservePage() {
  return (
    <>
      <PageHero
        eyebrow="Reserve"
        title="Hold your pick from the next hatch"
        subtitle="Spring batches go quickly, and a Muscovy hatch is thirty-five days out from the day the eggs go in. Reserving is how you get the birds you actually wanted."
        image="/images/flock/homestead-ducks-and-chickens-pasture.jpeg"
        imagePosition="center 55%"
        facts={["Partial deposit", "Applied to total", "No deposit for same-day"]}
      />

      {/* Steps */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="How it works" title="Three steps" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.n}>
                <div
                  className="w-11 h-11 rounded-btn flex items-center justify-center text-lg font-bold mb-5"
                  style={{
                    background: "var(--c-brand)",
                    color: "var(--c-brand-fg)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {step.n}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--c-title)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deposit */}
      <section id="deposit" className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-card border p-8 md:p-12"
            style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
          >
            <p className="label-mono mb-4" style={{ color: "var(--c-brand)" }}>
              Pay a deposit online
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: "var(--c-title)" }}>
              A partial deposit holds your pick.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--c-ink)" }}>
              Prices vary by bird and by breed, so the deposit is a part payment
              rather than a fixed fee — whatever you pay here comes off the total
              when you collect. Talk to us first so we know what the deposit is
              holding.
            </p>

            <ul className="flex flex-col gap-2.5 mb-9">
              {included.map((point) => (
                <li key={point} className="flex gap-3 text-sm" style={{ color: "var(--c-ink)" }}>
                  <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="rule-dash mb-8" aria-hidden="true" />

            <p className="label-mono mb-3" style={{ color: "var(--c-ink-2)" }}>
              We accept
            </p>
            <div className="flex flex-wrap gap-2 mb-9">
              {paymentMethods.map((m) => (
                <span
                  key={m.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-btn text-sm border"
                  style={{
                    background: "var(--c-panel)",
                    color: "var(--c-ink)",
                    borderColor: "var(--c-line)",
                  }}
                >
                  <span aria-hidden="true">{m.icon}</span>
                  {m.label}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-4 max-w-[400px]">
              <PayPalHostedDeposit />
              <a
                href={LINKS.cashapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-bold text-lg transition-opacity hover:opacity-90"
                style={{ background: "#00D036", color: "#ffffff", textDecoration: "none" }}
              >
                Pay with Cash App
              </a>
            </div>

            <p className="text-xs mt-6" style={{ color: "var(--c-ink-2)" }}>
              Need a different arrangement?{" "}
              <Link href="/contact" style={{ color: "var(--c-link)" }}>
                Get in touch
              </Link>{" "}
              and we&apos;ll sort it out.
            </p>
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader eyebrow="The fine print" title="What a deposit does and doesn't do" align="left" className="mb-10" />
          <div className="flex flex-col gap-5">
            {[
              {
                q: "It holds a spot in a specific hatch.",
                a: "Not a specific chick — we can't know what colour comes out of the shell. If you want a particular grown bird, we can hold that one by name.",
              },
              {
                q: "It's non-refundable if you change your mind.",
                a: "We turn other buyers away to hold your birds, so a cancelled reservation costs us the hatch slot.",
              },
              {
                q: "If our hatch fails, you're covered.",
                a: "Rolled to the next hatch or refunded in full, whichever you'd rather. That's on us, not you.",
              },
              {
                q: "Birds need collecting within a week of the agreed date.",
                a: "Chicks grow fast and brooder space is finite. Tell us if you're delayed and we'll work something out — just don't go quiet.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-card border-l-4 border p-6"
                style={{
                  background: "var(--c-panel)",
                  borderColor: "var(--c-line)",
                  borderLeftColor: "var(--c-brand)",
                }}
              >
                <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--c-title)" }}>
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ContactLine lead="Questions before you pay" />
          </div>
        </div>
      </section>

      <CTABanner
        title="See what's available first"
        subtitle="The gallery updates as each hatch comes off, so you know what you're reserving."
        primaryLabel="Available Now"
        primaryHref="/available"
        secondaryLabel="Hatchery FAQ"
        secondaryHref="/guides/faq"
      />
    </>
  );
}
