import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { BirdCard } from "@/app/_components/cards/BirdCard";
import { EggMark, Feather } from "@/app/_components/ui/decorations/EggMark";
import { chickens, PRICING } from "@/app/_data/flock";
import { incubationSpecs, INCUBATION_TEMP } from "@/app/_data/incubation";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: {
    absolute:
      "Hatching Eggs, Chicks, Ducklings & Quail in East Tennessee | AM Hatchery",
  },
  description:
    "AM Hatchery in Newport, TN sells fertile hatching eggs, day-old chicks, ducklings, and Coturnix quail — Barred Rock, Rhode Island Red, and blue-egg-laying Ameraucanas. Local pickup across East Tennessee.",
};

const lineup = [
  {
    href: "/hatching-eggs",
    n: "01",
    title: "Hatching & Eating Eggs",
    price: `From ${PRICING.hatchingEggsFrom} a dozen`,
    blurb:
      "Fertile eggs collected within a week and never washed, plus farm-fresh eating eggs from the same pasture.",
    image: "/images/farm/muscovy-duck-broody-nest-hatching-eggs.jpeg",
    alt: "Broody Muscovy duck sitting on a clutch of hatching eggs in a straw nest",
  },
  {
    href: "/chickens",
    n: "02",
    title: "Chickens & Chicks",
    price: `Chicks ${PRICING.chickChick} · Grown ${PRICING.chickGrown}`,
    blurb:
      "Barred Rock, Rhode Island Red, and blue-egg-laying Ameraucanas and Easter Eggers.",
    image: "/images/farm/free-range-chicken-flock-newport-tn.jpeg",
    alt: "Free-range mixed chicken flock foraging on grass in Newport, Tennessee",
  },
  {
    href: "/ducks",
    n: "03",
    title: "Ducks & Ducklings",
    price: `Ducklings ${PRICING.duckling} · Grown ${PRICING.duckGrown}`,
    blurb:
      "Muscovies that clear a yard of pests and Call ducks that mostly clear a room of bad moods.",
    image: "/images/farm/white-muscovy-duck-homestead.jpeg",
    alt: "White Muscovy duck standing in the homestead yard",
  },
  {
    href: "/quail",
    n: "04",
    title: "Quail",
    price: `Chicks ${PRICING.quailChick} · Grown ${PRICING.quailGrown}`,
    blurb:
      "Coturnix and Jumbo Coturnix — laying speckled eggs six weeks from hatch, quiet enough for a small lot.",
    image: "/images/farm/coturnix-quail-hen-nest-eggs.jpeg",
    alt: "Coturnix quail hen on a hay nest beside speckled quail eggs",
  },
];

const promises = [
  {
    title: "Hatched here, not shipped here",
    body: "Every bird we sell came out of an incubator on this farm. Nothing gets drop-shipped from a commercial hatchery and resold to you at a markup.",
  },
  {
    title: "Eggs that were never in the mail",
    body: "Shipped hatching eggs arrive with rattled air cells and hatch badly. Ours go from the nest box to your incubator without a postal truck in between.",
  },
  {
    title: "We answer the phone after",
    body: "First hatch going sideways at 11pm on day 19? Call Michael. Support doesn't stop when the money changes hands.",
  },
  {
    title: "Straight answers on straight run",
    body: "Chicks are straight run and we say so. No sexing guesses we can't stand behind, no surprises six weeks later when somebody starts crowing.",
  },
];

const steps = [
  {
    n: "1",
    title: "Tell us what you want",
    body: "Call or text Michael at 423-540-6566, send a message, or watch Facebook and Instagram for what's coming off the incubator this week.",
  },
  {
    n: "2",
    title: "Put a deposit on it",
    body: "A partial deposit holds your pick and comes off the total at pickup. Same-day pickups don't need one.",
  },
  {
    n: "3",
    title: "Pick up in Newport",
    body: "We'll have your birds boxed and ready, walk you through the first week, and send you home set up to succeed.",
  },
];

export default function HomePage() {
  const featured = chickens.filter((bird) => bird.availability === "available");

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[78vh] md:min-h-[86vh] flex items-end overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/flock/rhode-island-red-chickens-mountain-view.jpeg"
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 42%" }}
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-scrim" />
          <div className="absolute inset-0 hero-scrim-left" />
          <div className="absolute inset-0 mesh opacity-40" />
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-14 md:pb-20">
          <p
            className="label-mono rise hero-stamp"
            style={{ color: "var(--c-accent)", animationDelay: "60ms" }}
          >
            <EggMark size={20} accent="var(--c-accent)" />
            Newport, Tennessee · Est. on a Smoky Mountain homestead
          </p>

          <h1
            className="rise hero-type mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl font-semibold max-w-4xl"
            style={{ color: "#fdfaf2", animationDelay: "140ms", textWrap: "balance" }}
          >
            Twenty-one days from
            <br className="hidden sm:block" />{" "}
            <span style={{ color: "var(--c-accent)" }}>our nest box</span> to your brooder.
          </h1>

          <p
            className="rise hero-type mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ color: "rgba(253,250,242,0.92)", animationDelay: "220ms" }}
          >
            Fertile hatching eggs, day-old chicks, ducklings, and quail from a
            family hatchery in East Tennessee. Picked up in person, so nothing
            you buy has ever been in the mail.
          </p>

          <div
            className="rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              href="/available"
              className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-semibold text-lg transition-all hover:opacity-90 active:translate-y-px"
              style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
            >
              See What&apos;s Hatched
            </Link>
            <Link
              href="/hatching-eggs"
              className="inline-flex items-center justify-center h-14 px-8 rounded-btn font-semibold text-lg border transition-all hover:opacity-80 active:translate-y-px"
              style={{
                borderColor: "rgba(253,250,242,0.45)",
                color: "#fdfaf2",
                textDecoration: "none",
              }}
            >
              Buy Hatching Eggs
            </Link>
          </div>

          <ul
            className="rise mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 border-t pt-5"
            style={{ borderColor: "rgba(253,250,242,0.22)", animationDelay: "380ms" }}
          >
            {[
              "Chicks from $5",
              "Hatching eggs from $10 / dozen",
              "Local pickup only",
              "Deposits hold your pick",
            ].map((fact) => (
              <li key={fact} className="label-mono" style={{ color: "rgba(253,250,242,0.72)" }}>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ THE LINEUP ============ */}
      <section className="py-20 md:py-28 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="What we hatch"
            title="Four things come off our incubators"
            subtitle="Prices hold across breeds unless a rarer line costs us more to keep. Everything is straight run unless we tell you otherwise."
            align="left"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lineup.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-card border overflow-hidden flex flex-col sm:flex-row transition-all duration-200 hover:-translate-y-0.5 shadow-soft"
                style={{
                  background: "var(--c-panel)",
                  borderColor: "var(--c-line)",
                  textDecoration: "none",
                }}
              >
                <div className="relative w-full sm:w-40 md:w-44 flex-none aspect-[16/9] sm:aspect-auto overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 180px"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="label-mono" style={{ color: "var(--c-brand)", opacity: 0.6 }}>
                      {item.n}
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "var(--c-title)" }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--c-ink)" }}>
                    {item.blurb}
                  </p>
                  <div className="rule-dash mb-3" aria-hidden="true" />
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--c-brand)", fontFamily: "var(--font-mono)" }}
                  >
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INCUBATION DAY COUNTER ============ */}
      <section className="rail-bg relative overflow-hidden py-20 md:py-24 px-4">
        <div className="absolute inset-0 mesh opacity-40" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="label-mono mb-4" style={{ color: "var(--c-accent)" }}>
                Know before you set
              </p>
              <h2
                className="text-3xl md:text-[2.75rem] font-semibold max-w-xl"
                style={{ color: "var(--c-rail-fg)" }}
              >
                Every species runs on its own clock.
              </h2>
            </div>
            <p
              className="text-base leading-relaxed max-w-sm"
              style={{ color: "color-mix(in srgb, var(--c-rail-fg) 72%, transparent)" }}
            >
              Same temperature across all of them —{" "}
              <strong style={{ color: "var(--c-accent)" }}>{INCUBATION_TEMP.forcedAir}</strong>{" "}
              forced-air, {INCUBATION_TEMP.stillAir} still-air. What changes is how
              long you wait and how wet you keep it.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "color-mix(in srgb, var(--c-rail-fg) 16%, transparent)" }}>
            {incubationSpecs.map((spec) => (
              <div
                key={spec.species}
                className="p-6 md:p-7"
                style={{ background: "var(--c-rail)" }}
              >
                <p
                  className="label-mono mb-4"
                  style={{ color: "color-mix(in srgb, var(--c-rail-fg) 60%, transparent)" }}
                >
                  {spec.species}
                </p>
                <p
                  className="text-4xl md:text-5xl font-semibold leading-none mb-4"
                  style={{ color: "var(--c-accent)", fontFamily: "var(--font-display)" }}
                >
                  {spec.days.replace(" days", "")}
                  <span className="text-base ml-1.5" style={{ color: "color-mix(in srgb, var(--c-rail-fg) 55%, transparent)" }}>
                    days
                  </span>
                </p>
                <dl className="flex flex-col gap-1 text-xs" style={{ color: "color-mix(in srgb, var(--c-rail-fg) 68%, transparent)" }}>
                  <div className="flex justify-between gap-2">
                    <dt>Lockdown</dt>
                    <dd style={{ fontFamily: "var(--font-mono)" }}>{spec.lockdown}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt>Humidity</dt>
                    <dd style={{ fontFamily: "var(--font-mono)" }}>{spec.humidityEarly}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/guides/incubation"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: "var(--c-accent)" }}
            >
              Read the full incubation guide
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURED BREEDS ============ */}
      <section className="py-20 md:py-28 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="In the coop right now"
            title="Breeds hatching this season"
            subtitle="Three laying breeds we keep year-round, including the blue and green egg layers everybody asks for. More heritage lines are on the way."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((bird) => (
              <BirdCard key={bird.id} bird={bird} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/chickens" className="inline-flex items-center gap-2 font-semibold" style={{ color: "var(--c-link)" }}>
              See every breed, including what&apos;s coming
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="py-20 md:py-28 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="mb-5">
                <Feather size={36} />
              </div>
              <h2 className="text-3xl md:text-[2.75rem] font-semibold mb-5" style={{ color: "var(--c-title)" }}>
                A small hatchery, on purpose.
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--c-ink)" }}>
                We hatch in batches we can actually keep an eye on. That means we
                sometimes run out, and it also means we know which hen laid the egg
                in your incubator.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--c-ink-2)" }}>
                Same family, same farm as{" "}
                <a href={LINKS.rabbitry} target="_blank" rel="noopener noreferrer" style={{ color: "var(--c-link)" }}>
                  AMRabbits
                </a>{" "}
                — the poultry side just outgrew the page it was living on.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9">
              {promises.map((item, i) => (
                <div key={item.title}>
                  <p className="label-mono mb-3" style={{ color: "var(--c-brand)", opacity: 0.65 }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--c-title)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20 md:py-28 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps, no paperwork"
            className="mb-14"
          />
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

      <CTABanner
        title="Ready to start a flock?"
        subtitle="Reserve with a deposit, or call Michael at 423-540-6566 and just ask what's hatching this week."
        primaryLabel="Reserve Now"
        primaryHref="/reserve"
        secondaryLabel="Read the Guides First"
        secondaryHref="/guides/incubation"
      />
    </>
  );
}
