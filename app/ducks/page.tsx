import type { Metadata } from "next";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { BirdCard } from "@/app/_components/cards/BirdCard";
import { ContactLine } from "@/app/_components/ui/ContactLine";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { birdListSchema } from "@/app/_lib/schema";
import { ducks, PRICING } from "@/app/_data/flock";

export const metadata: Metadata = {
  title: "Ducks & Ducklings for Sale in East Tennessee",
  description:
    "Muscovy and Call ducklings from AM Hatchery in Newport, TN. Ducklings from $5, grown birds $30–$50, plus duck hatching eggs. Local pickup across East Tennessee.",
};

const duckNotes = [
  {
    title: "Niacin, not medicated feed",
    body: "Ducklings burn through niacin far faster than chicks and go weak-legged without it. A tablespoon of brewer's yeast per cup of feed fixes it. Never give them medicated chick starter — they eat more than chicks and can overdose on the coccidiostat.",
  },
  {
    title: "Water they can't drown in",
    body: "Ducklings will swim before they can regulate their own temperature, and a chilled duckling goes downhill fast. Shallow water, supervised, short sessions, then straight back under the lamp until they're feathered.",
  },
  {
    title: "They are messy and it's fine",
    body: "A duckling will empty a waterer into its bedding as a hobby. Plan on deeper shavings, a waterer set on hardware cloth over a tray, and a brooder that's easy to strip out.",
  },
];

export default function DucksPage() {
  return (
    <>
      <JsonLd data={birdListSchema("Duck breeds at AM Hatchery", ducks, "/ducks")} />

      <PageHero
        eyebrow="What we hatch · 03"
        title="Ducks & ducklings"
        subtitle="Muscovies for pest control and quiet company, Call ducks for charm. Both are hardy, both are excellent mothers, and both will change how you feel about your yard's fly population."
        image="/images/farm/white-muscovy-duck-homestead.jpeg"
        imagePosition="center 45%"
        facts={[
          `Ducklings ${PRICING.duckling}`,
          `Grown ${PRICING.duckGrown}`,
          "Muscovy 35 days",
          "Call duck 28 days",
        ]}
      />

      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Hatching now"
            title="Breeds we raise"
            align="left"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ducks.map((bird) => (
              <BirdCard key={bird.id} bird={bird} sizes="(max-width: 640px) 100vw, 50vw" />
            ))}
          </div>
          <div className="mt-10">
            <ContactLine />
          </div>
        </div>
      </section>

      {/* Duckling care */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Before you take them home"
            title="Ducklings aren't just wet chicks"
            subtitle="Three things that catch people out in the first fortnight. The brooding guide covers the rest."
            className="mb-12"
          />
          <div className="flex flex-col gap-6">
            {duckNotes.map((note, i) => (
              <div
                key={note.title}
                className="rounded-card border p-6 md:p-7 flex gap-5"
                style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
              >
                <span
                  className="label-mono flex-none pt-1"
                  style={{ color: "var(--c-brand)", opacity: 0.65 }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--c-title)" }}>
                    {note.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                    {note.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Reserve your ducklings"
        subtitle="Muscovy hatches take 35 days, so reserving early is the difference between this batch and next month's."
        primaryLabel="Reserve Now"
        primaryHref="/reserve"
        secondaryLabel="Brooding Guide"
        secondaryHref="/guides/brooding"
      />
    </>
  );
}
