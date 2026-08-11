import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { howToSchema, breadcrumbSchema } from "@/app/_lib/schema";
import {
  incubationSteps,
  incubationSpecs,
  candlingMarks,
  INCUBATION_TEMP,
} from "@/app/_data/incubation";

export const metadata: Metadata = {
  title: "Incubation Guide — Setting Eggs Through Hatch Day",
  description:
    "How we incubate chicken, duck, and quail eggs: 99.5°F, humidity by species, turning schedules, candling milestones, lockdown days, and what to do (and not do) on hatch day.",
};

const troubles = [
  {
    problem: "Nothing developing at day 7",
    cause: "Infertile eggs, or the incubator ran cold for a long stretch early on.",
    fix: "Check the rooster-to-hen ratio at the source and calibrate your thermometer against a known-good one. A single cheap dial thermometer is the most common culprit.",
  },
  {
    problem: "Chicks pip but never unzip",
    cause: "Humidity dropped during lockdown and the membrane dried onto the chick.",
    fix: "Stop opening the lid after lockdown. Top water up through a port. If you've already lost humidity, raising it fast can still save some of them.",
  },
  {
    problem: "Hatch is early and chicks are small",
    cause: "Running too hot — even a degree adds up over three weeks.",
    fix: "Drop to a true 99.5°F forced-air. Verify with a thermometer at egg height, not the incubator's own readout.",
  },
  {
    problem: "Hatch is late and chicks are sticky",
    cause: "Running cool, or humidity was too high through the first two-thirds.",
    fix: "Warm it up and dry it out. The air cell should reach about a third of the egg by lockdown — candle to check rather than guessing.",
  },
  {
    problem: "Splayed legs after hatch",
    cause: "Slippery brooder floor, usually newspaper or bare plastic.",
    fix: "Use pine shavings or rubber shelf liner from day one. Hobble the affected chick with a plaster loop for two or three days and it usually corrects.",
  },
];

export default function IncubationGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          howToSchema(
            "How to incubate chicken, duck, and quail eggs",
            "Setting, turning, candling, lockdown, and hatch day for chicken, duck, and quail eggs.",
            "/guides/incubation",
            incubationSteps.map((s) => ({ title: s.title, body: s.body })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides/incubation" },
            { name: "Incubation Guide", path: "/guides/incubation" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Guide · Incubation"
        title="From setting eggs to hatch day"
        subtitle="What we actually run in our own incubators. Nothing here is exotic — most hatches fail on temperature, humidity, or impatience, and those are all fixable."
        image="/images/farm/muscovy-duck-broody-nest-hatching-eggs.jpeg"
        imagePosition="center 40%"
        facts={[
          `${INCUBATION_TEMP.forcedAir} forced-air`,
          `${INCUBATION_TEMP.stillAir} still-air`,
          "Turn 3–5× daily",
          "Candle day 7 & 14",
        ]}
      />

      {/* Species table */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Reference"
            title="Days, lockdown, and humidity by species"
            subtitle={`Temperature is the same for all of them — ${INCUBATION_TEMP.forcedAir} forced-air, ${INCUBATION_TEMP.stillAir} still-air, ${INCUBATION_TEMP.stillAirNote}.`}
            align="left"
            className="mb-10"
          />

          <div className="overflow-x-auto rounded-card border" style={{ borderColor: "var(--c-line)" }}>
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr style={{ background: "var(--c-rail)" }}>
                  {["Species", "Incubation", "Stop turning", "Early humidity", "Lockdown humidity"].map((h) => (
                    <th key={h} className="label-mono text-left px-5 py-3.5" style={{ color: "var(--c-rail-fg)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {incubationSpecs.map((spec, i) => (
                  <tr key={spec.species} style={{ background: i % 2 === 0 ? "var(--c-panel)" : "var(--c-page)" }}>
                    <td className="px-5 py-4">
                      <p className="font-semibold" style={{ color: "var(--c-title)" }}>
                        {spec.species}
                      </p>
                      {spec.note && (
                        <p className="text-xs mt-1 leading-snug" style={{ color: "var(--c-ink-2)" }}>
                          {spec.note}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 font-bold" style={{ color: "var(--c-brand)", fontFamily: "var(--font-mono)" }}>
                      {spec.days}
                    </td>
                    <td className="px-5 py-4" style={{ color: "var(--c-ink)", fontFamily: "var(--font-mono)" }}>
                      {spec.lockdown}
                    </td>
                    <td className="px-5 py-4" style={{ color: "var(--c-ink)", fontFamily: "var(--font-mono)" }}>
                      {spec.humidityEarly}
                    </td>
                    <td className="px-5 py-4" style={{ color: "var(--c-ink)", fontFamily: "var(--font-mono)" }}>
                      {spec.humidityLockdown}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The four stages */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="The run" title="Four stages, start to finish" className="mb-14" />

          <ol className="flex flex-col">
            {incubationSteps.map((step, i) => (
              <li
                key={step.title}
                className="relative pl-8 md:pl-12 pb-12 last:pb-0"
                style={{
                  borderLeft:
                    i === incubationSteps.length - 1 ? "1px solid transparent" : "1px solid var(--c-line)",
                }}
              >
                <span
                  className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2"
                  style={{ background: "var(--c-brand)", borderColor: "var(--c-panel)" }}
                  aria-hidden="true"
                />
                <p className="label-mono mb-2" style={{ color: "var(--c-brand)" }}>
                  {step.label}
                </p>
                <h3 className="text-2xl font-semibold mb-3" style={{ color: "var(--c-title)" }}>
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed mb-5" style={{ color: "var(--c-ink)" }}>
                  {step.body}
                </p>
                {step.points && (
                  <ul className="flex flex-col gap-2.5">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed"
                        style={{ color: "var(--c-ink-2)" }}
                      >
                        <span aria-hidden="true" style={{ color: "var(--c-accent)" }}>
                          →
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Candling */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Candling"
            title="What you should see, and when"
            subtitle="Chicken timings. Quail run about four days ahead of this; ducks about a week behind. Candle in a dark room, briefly, and put the egg straight back."
            align="left"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-px" style={{ background: "var(--c-line)" }}>
            {candlingMarks.map((mark) => (
              <div key={mark.day} className="p-6" style={{ background: "var(--c-panel)" }}>
                <p
                  className="text-2xl font-semibold mb-3"
                  style={{ color: "var(--c-brand)", fontFamily: "var(--font-mono)" }}
                >
                  {mark.day}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {mark.what}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="When it goes wrong"
            title="Troubleshooting a bad hatch"
            subtitle="Almost every problem on this list traces back to one of two dials. Fix the dial, not the symptom."
            className="mb-12"
          />
          <div className="flex flex-col gap-4">
            {troubles.map((t) => (
              <div
                key={t.problem}
                className="rounded-card border p-6"
                style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
              >
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--c-title)" }}>
                  {t.problem}
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                  <dt className="label-mono pt-0.5" style={{ color: "var(--c-ink-2)" }}>
                    Likely
                  </dt>
                  <dd style={{ color: "var(--c-ink)" }}>{t.cause}</dd>
                  <dt className="label-mono pt-0.5" style={{ color: "var(--c-brand)" }}>
                    Fix
                  </dt>
                  <dd style={{ color: "var(--c-ink)" }}>{t.fix}</dd>
                </dl>
              </div>
            ))}
          </div>

          <p className="text-sm mt-10 text-center leading-relaxed" style={{ color: "var(--c-ink-2)" }}>
            Hatched them? The next six weeks are covered in the{" "}
            <Link href="/guides/brooding" style={{ color: "var(--c-link)" }}>
              brooding guide
            </Link>
            .
          </p>
        </div>
      </section>

      <CTABanner
        title="Need eggs to practice on?"
        subtitle="Coturnix quail hatch in seventeen days and forgive a lot of mistakes — the best first run for a new incubator."
        primaryLabel="Buy Hatching Eggs"
        primaryHref="/hatching-eggs"
        secondaryLabel="Brooding Guide"
        secondaryHref="/guides/brooding"
      />
    </>
  );
}
