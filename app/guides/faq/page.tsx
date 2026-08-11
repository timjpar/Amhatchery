import type { Metadata } from "next";
import { PageHero } from "@/app/_components/ui/PageHero";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { AccordionItem } from "@/app/_components/ui/AccordionItem";
import { ContactLine } from "@/app/_components/ui/ContactLine";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { faqPageSchema, breadcrumbSchema } from "@/app/_lib/schema";
import { faqs } from "@/app/_data/faq";

export const metadata: Metadata = {
  title: "Hatchery FAQ — Shipping, Hatch Rates, Sexing & Deposits",
  description:
    "Straight answers about buying hatching eggs and chicks from AM Hatchery in Newport, TN — why we don't ship, what we guarantee, straight-run chicks, vaccination, deposits, and farm visits.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides/faq" },
            { name: "FAQ", path: "/guides/faq" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Guide · FAQ"
        title="The questions we actually get asked"
        subtitle="Including the ones with answers people would rather we softened. We'd rather you know up front."
        image="/images/flock/barred-rock-chickens-pasture-coop.jpeg"
        imagePosition="center 68%"
      />

      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="border-t" style={{ borderColor: "var(--c-line)" }}>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <ContactLine lead="Something we didn't cover?" />
          </div>
        </div>
      </section>

      <CTABanner
        title="Still want to hatch your own?"
        subtitle="Good. Start with the incubation guide, then pick up a dozen eggs."
        primaryLabel="Incubation Guide"
        primaryHref="/guides/incubation"
        secondaryLabel="Buy Hatching Eggs"
        secondaryHref="/hatching-eggs"
      />
    </>
  );
}
