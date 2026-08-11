import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { ContactLine } from "@/app/_components/ui/ContactLine";
import { eggTypes, chickens, ducks, quail } from "@/app/_data/flock";
import { incubationSpecs } from "@/app/_data/incubation";

export const metadata: Metadata = {
  title: "Hatching Eggs & Farm-Fresh Eating Eggs in East Tennessee",
  description:
    "Fertile hatching eggs from $10 a dozen and farm-fresh eating eggs from AM Hatchery in Newport, TN — chicken, duck, and quail. Never washed, never shipped, collected within seven days.",
};

const handling = [
  "Collected two to three times a day so nothing sits in a cold nest box.",
  "Never washed — the bloom on the shell is what keeps bacteria out.",
  "Stored point-down at 55–65°F and turned daily until they go home with you.",
  "Sold within seven days of lay, and we tell you the lay date.",
];

const eggBreeds = [
  ...chickens.filter((b) => b.hatchingEggPrice),
  ...ducks.filter((b) => b.hatchingEggPrice),
  ...quail.filter((b) => b.hatchingEggPrice),
];

export default function HatchingEggsPage() {
  return (
    <>
      <PageHero
        eyebrow="What we hatch · 01"
        title="Hatching eggs & eating eggs"
        subtitle="Fertile eggs for your own incubator, and the same birds' eggs for your own kitchen. Both come out of nest boxes you're welcome to come look at."
        image="/images/farm/muscovy-duck-broody-nest-hatching-eggs.jpeg"
        imagePosition="center 45%"
        facts={["Hatching eggs from $10", "Eating eggs from $5", "Never washed", "Local pickup only"]}
      />

      {/* Price list */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Price list"
            title="What a dozen costs"
            subtitle="Hatching-egg prices move with the breed — rarer lines cost us more to keep, so they cost you a little more too."
            align="left"
            className="mb-12"
          />

          <div className="rounded-card border overflow-hidden" style={{ borderColor: "var(--c-line)" }}>
            {eggTypes.map((egg, i) => (
              <div
                key={egg.name}
                className="flex items-start justify-between gap-5 p-6"
                style={{
                  background: i % 2 === 0 ? "var(--c-panel)" : "var(--c-page)",
                  borderTop: i === 0 ? "none" : "1px solid var(--c-line)",
                }}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--c-title)" }}>
                    {egg.name}
                  </h3>
                  {egg.note && (
                    <p className="text-sm leading-relaxed max-w-md" style={{ color: "var(--c-ink-2)" }}>
                      {egg.note}
                    </p>
                  )}
                </div>
                <div className="text-right flex-none">
                  <p
                    className="text-2xl font-bold leading-none"
                    style={{ color: "var(--c-brand)", fontFamily: "var(--font-mono)" }}
                  >
                    {egg.price}
                  </p>
                  {egg.unit && (
                    <p className="label-mono mt-1.5" style={{ color: "var(--c-ink-2)" }}>
                      {egg.unit}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ContactLine lead="Availability moves with the season" />
          </div>
        </div>
      </section>

      {/* By breed */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="By breed"
            title="Hatching eggs we sell"
            subtitle="Mixed dozens are fine — tell us the split you want when you reserve."
            className="mb-12"
          />
          <div className="rounded-card border overflow-hidden" style={{ borderColor: "var(--c-line)", background: "var(--c-page)" }}>
            {eggBreeds.map((bird, i) => (
              <div
                key={bird.id}
                className="flex items-center justify-between gap-4 px-6 py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--c-line)" }}
              >
                <div className="min-w-0">
                  <p className="font-semibold" style={{ color: "var(--c-title)" }}>
                    {bird.name}
                  </p>
                  {bird.eggNote && (
                    <p className="label-mono mt-0.5" style={{ color: "var(--c-ink-2)" }}>
                      {bird.eggNote}
                    </p>
                  )}
                </div>
                <p
                  className="text-sm font-bold flex-none text-right"
                  style={{ color: "var(--c-brand)", fontFamily: "var(--font-mono)" }}
                >
                  {bird.hatchingEggPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we handle them */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="label-mono mb-4" style={{ color: "var(--c-brand)" }}>
              How we handle them
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-5" style={{ color: "var(--c-title)" }}>
              Most failed hatches are decided before the incubator is switched on.
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--c-ink)" }}>
              An egg that was washed, chilled, or three weeks old will not hatch
              well no matter how good your incubator is. So we treat collection and
              storage as the actual job:
            </p>
            <ul className="flex flex-col gap-3">
              {handling.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  <span aria-hidden="true" style={{ color: "var(--c-brand)" }}>
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono mb-4" style={{ color: "var(--c-brand)" }}>
              Incubation at a glance
            </p>
            <div className="rounded-card border overflow-hidden" style={{ borderColor: "var(--c-line)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--c-rail)" }}>
                    <th className="label-mono text-left px-4 py-3" style={{ color: "var(--c-rail-fg)" }}>
                      Species
                    </th>
                    <th className="label-mono text-right px-4 py-3" style={{ color: "var(--c-rail-fg)" }}>
                      Days
                    </th>
                    <th className="label-mono text-right px-4 py-3" style={{ color: "var(--c-rail-fg)" }}>
                      Lockdown
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {incubationSpecs.map((spec, i) => (
                    <tr
                      key={spec.species}
                      style={{
                        background: i % 2 === 0 ? "var(--c-panel)" : "var(--c-page)",
                      }}
                    >
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--c-ink)" }}>
                        {spec.species}
                      </td>
                      <td
                        className="px-4 py-3 text-right"
                        style={{ color: "var(--c-brand)", fontFamily: "var(--font-mono)" }}
                      >
                        {spec.days.replace(" days", "")}
                      </td>
                      <td
                        className="px-4 py-3 text-right"
                        style={{ color: "var(--c-ink-2)", fontFamily: "var(--font-mono)" }}
                      >
                        {spec.lockdown}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-5 leading-relaxed" style={{ color: "var(--c-ink-2)" }}>
              Run at 99.5°F forced-air across all four.{" "}
              <Link href="/guides/incubation" style={{ color: "var(--c-link)" }}>
                The full guide
              </Link>{" "}
              covers turning, candling, humidity, and what to do on hatch day.
            </p>
          </div>
        </div>
      </section>

      {/* No guarantee */}
      <section className="pb-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-card border-l-4 border p-7"
            style={{
              background: "var(--c-panel)",
              borderColor: "var(--c-line)",
              borderLeftColor: "var(--c-brand)",
            }}
          >
            <p className="label-mono mb-3" style={{ color: "var(--c-brand)" }}>
              Straight talk on hatch rates
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--c-ink)" }}>
              We guarantee the eggs are fertile, fresh, and correctly handled up to
              the moment you take them, and we candle a sample from every batch.
              What happens after that is your incubator, your power supply, and
              your humidity — so hatching eggs are sold as-is. A good home hatch on
              fresh local eggs runs 70–85%. Set more than you want birds, and
              remember half of what hatches will be cockerels.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Reserve a dozen"
        subtitle="Tell us the breeds and the week, and we'll set them aside as they're laid."
        primaryLabel="Reserve Now"
        primaryHref="/reserve"
        secondaryLabel="Read the Incubation Guide"
        secondaryHref="/guides/incubation"
      />
    </>
  );
}
