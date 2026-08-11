import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { BirdCard } from "@/app/_components/cards/BirdCard";
import { ContactLine } from "@/app/_components/ui/ContactLine";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { birdListSchema } from "@/app/_lib/schema";
import { quail, PRICING } from "@/app/_data/flock";

export const metadata: Metadata = {
  title: "Coturnix Quail & Quail Chicks for Sale in East Tennessee",
  description:
    "Coturnix and Jumbo Coturnix quail from AM Hatchery in Newport, TN. Chicks $5, grown birds $15, hatching eggs from $10. Laying in six weeks — the fastest way onto your own eggs.",
};

const whyQuail = [
  { stat: "17", unit: "days", label: "Incubation — the shortest of any bird we hatch." },
  { stat: "6", unit: "weeks", label: "From hatch to the first egg. Chickens take five months." },
  { stat: "1", unit: "sq ft", label: "Floor space per bird. A whole covey fits where two hens would." },
  { stat: "0", unit: "crowing", label: "No rooster racket. Most city ordinances don't cover quail." },
];

export default function QuailPage() {
  return (
    <>
      <JsonLd data={birdListSchema("Quail at AM Hatchery", quail, "/quail")} />

      <PageHero
        eyebrow="What we hatch · 04"
        title="Coturnix quail"
        subtitle="The fastest route from an empty pen to your own eggs. Quiet, cheap to feed, and productive enough that two dozen birds will keep a family in eggs."
        facts={[
          `Chicks ${PRICING.quailChick}`,
          `Grown ${PRICING.quailGrown}`,
          "17–18 day incubation",
          "Laying at 6 weeks",
        ]}
      />

      {/* Why quail */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Why quail"
            title="The numbers make the argument"
            align="left"
            className="mb-12"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyQuail.map((item) => (
              <div
                key={item.label}
                className="rounded-card border p-6"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <p
                  className="text-5xl font-semibold leading-none mb-1"
                  style={{ color: "var(--c-brand)", fontFamily: "var(--font-display)" }}
                >
                  {item.stat}
                </p>
                <p className="label-mono mb-4" style={{ color: "var(--c-ink-2)" }}>
                  {item.unit}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="pb-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Lines we keep" title="Standard and Jumbo" align="left" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {quail.map((bird) => (
              <BirdCard key={bird.id} bird={bird} sizes="(max-width: 640px) 100vw, 50vw" />
            ))}
          </div>
          <div className="mt-10">
            <ContactLine />
          </div>
        </div>
      </section>

      {/* Keeping quail */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="relative aspect-[4/5] rounded-card overflow-hidden border" style={{ borderColor: "var(--c-line)" }}>
            <Image
              src="/images/farm/coturnix-quail-hen-nest-eggs.jpeg"
              alt="Coturnix quail hen sitting on a hay nest beside three speckled quail eggs"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="label-mono mb-4" style={{ color: "var(--c-brand)" }}>
              Keeping them
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-5" style={{ color: "var(--c-title)" }}>
              Cover the pen. Always.
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "var(--c-ink)" }}>
              <p>
                Quail flush straight up when startled — a hard vertical launch
                that ends against whatever is above them. An uncovered pen means a
                lost bird, and a wire roof at head height means a hurt one. Use
                soft netting overhead, or keep the pen short enough that they
                can&apos;t build up speed.
              </p>
              <p>
                They want game bird feed at 24–28% protein, not chick starter —
                the extra protein is what gets them laying at six weeks. Give them
                sand to dust-bathe in and something to hide under, and they settle
                right down.
              </p>
              <p style={{ color: "var(--c-ink-2)" }}>
                Marbles in the chick waterer for the first fortnight. A quail chick
                is the size of a bumblebee and will drown in a centimetre of water.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Start with a covey"
        subtitle="Two dozen quail chicks and a covered pen will have you gathering eggs before the summer is out."
        primaryLabel="Reserve Now"
        primaryHref="/reserve"
        secondaryLabel="Incubation Guide"
        secondaryHref="/guides/incubation"
      />
    </>
  );
}
