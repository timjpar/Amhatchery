import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { JsonLd } from "@/app/_components/seo/JsonLd";
import { howToSchema, breadcrumbSchema } from "@/app/_lib/schema";
import { broodingSteps } from "@/app/_data/incubation";

export const metadata: Metadata = {
  title: "Brooding Guide — Chick, Duckling & Quail Care",
  description:
    "Set up a brooder and get chicks, ducklings, and quail through their first six weeks: temperatures week by week, bedding, feed and niacin, water safety, and moving out to the coop.",
};

const kit = [
  { item: "Brooder box", detail: "A plastic tote, stock tank, or ring of cardboard. Half a square foot per chick to start, doubling by week four." },
  { item: "Heat source", detail: "A heat plate is safer than a lamp and closer to how a hen does it. If you use a lamp, chain it up twice — never trust the clamp alone." },
  { item: "Bedding", detail: "Pine shavings. Never cedar, whose oils damage chick lungs, and never newspaper, which is slick enough to splay legs." },
  { item: "Feeder", detail: "Chick starter at 18–20% protein, free choice. Game bird feed at 24–28% for quail." },
  { item: "Waterer", detail: "Shallow, with marbles or pebbles in the trough for the first two weeks so nothing drowns." },
  { item: "Thermometer", detail: "One at chick height at the warm end. The chicks' behaviour is the real gauge, but a number helps you catch drift." },
];

const temps = [
  { week: "Week 1", temp: "95°F" },
  { week: "Week 2", temp: "90°F" },
  { week: "Week 3", temp: "85°F" },
  { week: "Week 4", temp: "80°F" },
  { week: "Week 5", temp: "75°F" },
  { week: "Week 6", temp: "Ambient" },
];

export default function BroodingGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          howToSchema(
            "How to brood chicks, ducklings, and quail",
            "Brooder setup, temperatures week by week, feed and water, and moving birds out to the coop.",
            "/guides/brooding",
            broodingSteps.map((s) => ({ title: s.title, body: s.body })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides/brooding" },
            { name: "Brooding Guide", path: "/guides/brooding" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Guide · Brooding"
        title="The first six weeks"
        subtitle="Have the brooder built and holding temperature before you come pick birds up. It's a short list of cheap things, and getting it right on day one saves you a bad week."
        image="/images/flock/barred-rock-flock-electric-fence.jpeg"
        imagePosition="center 55%"
        facts={["Start at 95°F", "Drop 5°F a week", "18–20% starter", "Out at 6 weeks"]}
      />

      {/* Kit list */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Before pickup"
            title="What you need in the barn"
            subtitle="Set it all up a day early and let it run, so you find the problems while the box is still empty."
            align="left"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kit.map((k, i) => (
              <div
                key={k.item}
                className="rounded-card border p-6"
                style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
              >
                <p className="label-mono mb-3" style={{ color: "var(--c-brand)", opacity: 0.65 }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--c-title)" }}>
                  {k.item}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {k.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temperature ladder */}
      <section className="rail-bg relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 mesh opacity-40" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="The ladder"
            title="Five degrees cooler every week"
            subtitle="Raise the lamp, don't move the birds. By six weeks a feathered bird handles a Tennessee night on its own."
            align="left"
            light
            className="mb-12"
          />
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px"
            style={{ background: "color-mix(in srgb, var(--c-rail-fg) 16%, transparent)" }}
          >
            {temps.map((t) => (
              <div key={t.week} className="p-6 text-center" style={{ background: "var(--c-rail)" }}>
                <p
                  className="label-mono mb-3"
                  style={{ color: "color-mix(in srgb, var(--c-rail-fg) 58%, transparent)" }}
                >
                  {t.week}
                </p>
                <p
                  className="text-2xl md:text-3xl font-semibold"
                  style={{ color: "var(--c-accent)", fontFamily: "var(--font-mono)" }}
                >
                  {t.temp}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-sm mt-8 leading-relaxed max-w-2xl"
            style={{ color: "color-mix(in srgb, var(--c-rail-fg) 72%, transparent)" }}
          >
            Keep one warm end and one cool end so the birds can choose. A tight
            huddle right under the heat means too cold; birds pressed to the far
            walls and panting means too hot; scattered and busy means you got it
            right.
          </p>
        </div>
      </section>

      {/* Stages */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Week by week" title="How it goes" className="mb-14" />
          <ol className="flex flex-col">
            {broodingSteps.map((step, i) => (
              <li
                key={step.title}
                className="relative pl-8 md:pl-12 pb-12 last:pb-0"
                style={{
                  borderLeft:
                    i === broodingSteps.length - 1 ? "1px solid transparent" : "1px solid var(--c-line)",
                }}
              >
                <span
                  className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2"
                  style={{ background: "var(--c-brand)", borderColor: "var(--c-page)" }}
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
                      <li key={point} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--c-ink-2)" }}>
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

      {/* Species differences */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Not all the same"
            title="Where ducklings and quail differ"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-card border p-7" style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--c-title)" }}>
                Ducklings
              </h3>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                <li>Add niacin — a tablespoon of brewer&apos;s yeast per cup of feed — or they go weak-legged.</li>
                <li>Never medicated feed. They eat more than chicks and can overdose on the coccidiostat.</li>
                <li>They will flood the brooder. Waterer on hardware cloth over a drip tray, deeper shavings.</li>
                <li>Swimming only supervised, warm, and brief until they&apos;re feathered.</li>
              </ul>
            </div>
            <div className="rounded-card border p-7" style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--c-title)" }}>
                Quail
              </h3>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                <li>Game bird starter at 24–28% protein — chick starter is too thin to get them laying at six weeks.</li>
                <li>They are the size of a bumblebee at hatch. Marbles in every waterer, no exceptions.</li>
                <li>Cover the brooder. A day-old quail can hop higher than you expect and a week-old can fly.</li>
                <li>Everything runs faster: they feather by three weeks and lay by six.</li>
              </ul>
            </div>
          </div>

          <p className="text-sm mt-10 text-center leading-relaxed" style={{ color: "var(--c-ink-2)" }}>
            Still deciding what to hatch? Compare{" "}
            <Link href="/chickens" style={{ color: "var(--c-link)" }}>chickens</Link>,{" "}
            <Link href="/ducks" style={{ color: "var(--c-link)" }}>ducks</Link>, and{" "}
            <Link href="/quail" style={{ color: "var(--c-link)" }}>quail</Link>.
          </p>
        </div>
      </section>

      <CTABanner
        title="Brooder ready?"
        subtitle="Reserve chicks, ducklings, or quail from the next hatch and we'll walk you through the first week at pickup."
        primaryLabel="Reserve Now"
        primaryHref="/reserve"
        secondaryLabel="Hatchery FAQ"
        secondaryHref="/guides/faq"
      />
    </>
  );
}
