import type { Metadata } from "next";
import { PageHero } from "@/app/_components/ui/PageHero";
import { ContactForm } from "@/app/_components/forms/ContactForm";
import { SocialButtons } from "@/app/_components/ui/SocialLinks";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { LINKS } from "@/app/_config/links";
import { BUSINESS } from "@/app/_config/business";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact AM Hatchery — Newport, Tennessee",
  description:
    "Call or text Michael at 423-540-6566, email amrabbitstn@gmail.com, or send a message to ask about hatching eggs, chicks, ducklings, and quail in Newport, TN. Visits by appointment.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask us anything"
        subtitle="Texting is genuinely the fastest way to reach us — we're usually outside. Visits are by appointment so somebody's here to meet you."
        image="/images/farm/silver-laced-wyandotte-hen-pasture.jpeg"
        imagePosition="center 55%"
      />

      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
          {/* Details */}
          <div className="flex flex-col gap-9">
            <div>
              <p className="label-mono mb-4" style={{ color: "var(--c-brand)" }}>
                Get in touch
              </p>
              <dl className="flex flex-col gap-5">
                <div>
                  <dt className="label-mono mb-1" style={{ color: "var(--c-ink-2)" }}>
                    Call or text {BUSINESS.contactName}
                  </dt>
                  <dd>
                    <a
                      href={LINKS.phoneHref}
                      className="text-2xl font-semibold"
                      style={{ color: "var(--c-title)", fontFamily: "var(--font-display)" }}
                    >
                      {LINKS.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-mono mb-1" style={{ color: "var(--c-ink-2)" }}>
                    Email
                  </dt>
                  <dd>
                    <a href={`mailto:${LINKS.email}`} className="text-base" style={{ color: "var(--c-link)" }}>
                      {LINKS.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-mono mb-1" style={{ color: "var(--c-ink-2)" }}>
                    Where
                  </dt>
                  <dd className="text-base" style={{ color: "var(--c-ink)" }}>
                    {BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
                    <br />
                    <span className="text-sm" style={{ color: "var(--c-ink-2)" }}>
                      Home farm — exact address given when you book a pickup.
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="label-mono mb-1" style={{ color: "var(--c-ink-2)" }}>
                    Hours
                  </dt>
                  <dd className="text-base" style={{ color: "var(--c-ink)" }}>
                    By appointment
                    <br />
                    <span className="text-sm" style={{ color: "var(--c-ink-2)" }}>
                      Call ahead — chores don&apos;t keep office hours.
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rule-dash" aria-hidden="true" />

            <div>
              <p className="label-mono mb-4" style={{ color: "var(--c-brand)" }}>
                Follow the hatches
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--c-ink)" }}>
                New hatches get posted here first, usually while the chicks are
                still damp.
              </p>
              <SocialButtons />
            </div>
          </div>

          {/* Form */}
          <div
            className="rounded-card border p-7 md:p-9"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--c-title)" }}>
              Send a message
            </h2>
            <p className="text-sm mb-7" style={{ color: "var(--c-ink-2)" }}>
              Tell us roughly what you want and roughly when, and we&apos;ll tell you
              which hatch that lands in.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <CTABanner
        title="Know what you want already?"
        subtitle="Skip the back and forth — put a deposit down and we'll hold your pick."
        primaryLabel="Reserve Now"
        primaryHref="/reserve"
        secondaryLabel="See What's Available"
        secondaryHref="/available"
      />
    </>
  );
}
