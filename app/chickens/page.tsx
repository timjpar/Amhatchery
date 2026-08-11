import type { Metadata } from "next";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { BirdCard } from "@/app/_components/cards/BirdCard";
import { ContactLine } from "@/app/_components/ui/ContactLine";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { birdListSchema } from "@/app/_lib/schema";
import { chickens, PRICING } from "@/app/_data/flock";

export const metadata: Metadata = {
  title: "Chickens & Chicks for Sale in East Tennessee",
  description:
    "Barred Rock, Rhode Island Red, Silver Laced Wyandotte, and Ameraucana / Easter Egger blue egg layers from AM Hatchery in Newport, TN. Chicks from $5, grown birds $30–$50, hatching eggs from $10 a dozen.",
};

const hatching = chickens.filter((b) => b.availability === "available");
const comingSoon = chickens.filter((b) => b.availability === "coming-soon");

export default function ChickensPage() {
  return (
    <>
      <JsonLd data={birdListSchema("Chicken breeds at AM Hatchery", hatching, "/chickens")} />

      <PageHero
        eyebrow="What we hatch · 02"
        title="Chickens & chicks"
        subtitle="Four laying breeds we keep year-round, hatched in small batches and sold straight run. Grown, sexed birds are available too when we have them."
        image="/images/flock/homestead-mixed-chicken-flock-pasture.jpeg"
        imagePosition="center 55%"
        facts={[
          `Chicks ${PRICING.chickChick}`,
          `Grown ${PRICING.chickGrown}`,
          `Hatching eggs from ${PRICING.hatchingEggsFrom} / dozen`,
          "21-day incubation",
        ]}
      />

      {/* Hatching now */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Hatching now"
            title="The breeds we keep"
            subtitle="All four are dual-purpose, cold-hardy enough for a Tennessee winter, and calm enough to mix in one flock."
            align="left"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hatching.map((bird) => (
              <BirdCard
                key={bird.id}
                bird={bird}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Straight run note */}
      <section className="pb-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-card border p-7 md:p-8"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <p className="label-mono mb-3" style={{ color: "var(--c-brand)" }}>
              About straight run
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--c-ink)" }}>
              Day-old chicks are sold straight run — you get whatever hatched,
              which over a batch works out close to half cockerels. We don&apos;t
              vent-sex, because doing it badly is worse than not doing it. If you
              need hens for certain, buy grown pullets from us instead and
              we&apos;ll tell you exactly what you&apos;re taking home. Check your
              city ordinance on roosters before you fall in love with one.
            </p>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="On the way"
            title="Breeds joining the hatch program"
            subtitle="We keep these birds now and plan to hatch from them next season. Say the word and we'll put you on the list."
            className="mb-10"
          />
          <ul className="flex flex-wrap justify-center gap-2.5">
            {comingSoon.map((bird) => (
              <li
                key={bird.id}
                className="inline-flex items-baseline gap-2 px-4 py-2.5 rounded-btn border"
                style={{
                  background: "var(--c-page)",
                  color: "var(--c-ink)",
                  borderColor: "var(--c-line)",
                }}
              >
                <span className="text-sm font-medium">{bird.name}</span>
                {bird.eggNote && (
                  <span className="label-mono" style={{ color: "var(--c-ink-2)" }}>
                    {bird.eggNote}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <ContactLine lead="Want a breed that isn't hatching yet?" />
          </div>
        </div>
      </section>

      <CTABanner
        title="Reserve your chicks"
        subtitle="A deposit holds your pick from the next hatch, or see what came off the incubator this week."
        primaryLabel="Reserve Now"
        primaryHref="/reserve"
        secondaryLabel="Available Now"
        secondaryHref="/available"
      />
    </>
  );
}
