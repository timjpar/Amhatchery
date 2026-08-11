import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { ContactLine } from "@/app/_components/ui/ContactLine";
import { Feather } from "@/app/_components/ui/decorations/EggMark";
import { LINKS } from "@/app/_config/links";
import { AREAS_SERVED } from "@/app/_config/business";

export const metadata: Metadata = {
  title: "About the Hatchery — A Family Farm in Newport, Tennessee",
  description:
    "AM Hatchery is a small family hatchery on a Smoky Mountain homestead in Newport, Tennessee — hatching chicks, ducklings, and quail in batches small enough to keep an eye on.",
};

const values = [
  {
    title: "Small batches, on purpose",
    body: "We hatch what we can watch. That means we run out sometimes, and it also means nobody here is guessing which hen laid the egg in your incubator.",
  },
  {
    title: "Local pickup, every time",
    body: "No mail, no couriers, no eggs rattling around a sorting facility for three days. You come to the farm, or we meet you somewhere in East Tennessee.",
  },
  {
    title: "Birds that were handled",
    body: "Everything gets picked up daily from the moment it hatches. Birds that are used to people are easier to keep, easier to catch, and better company.",
  },
  {
    title: "We tell you the bad news too",
    body: "Straight run means straight run. Hatch rates aren't guaranteed. Ducks are messy. You'll hear all of that from us before you pay, not after.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A hatchery that outgrew the farm page"
        subtitle="We're a family homestead in the Smoky Mountain foothills. The poultry started as a handful of hens for the kitchen, and then quietly took over a building."
        image="/images/flock/rhode-island-red-chickens-pasture.jpeg"
        imagePosition="center 55%"
      />

      {/* Story */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="mb-5">
              <Feather size={36} />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6" style={{ color: "var(--c-title)" }}>
              Newport, Tennessee
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "var(--c-ink)" }}>
              <p>
                The farm sits in Cocke County, in the foothills east of the Smokies.
                It started with rabbits — that side still runs as{" "}
                <a href={LINKS.rabbitry} target="_blank" rel="noopener noreferrer" style={{ color: "var(--c-link)" }}>
                  AMRabbits
                </a>{" "}
                — and the chickens came along the way most chickens do: a few birds
                for the kitchen, then a few more, then an incubator on the counter.
              </p>
              <p>
                These days the poultry has its own building, its own hatch schedule,
                and enough people asking for eggs and chicks that it needed its own
                site. Same family, same land, same phone number.
              </p>
              <p>
                We hatch chickens, ducks, and quail on a rolling schedule through the
                warm months and slow down over winter. Everything is picked up in
                person, which keeps the birds healthier and lets us actually talk to
                the people taking them home — usually longer than they planned on.
              </p>
              <p style={{ color: "var(--c-ink-2)" }}>
                If it&apos;s your first flock, say so. Nobody here thinks less of a
                beginner, and it changes what we&apos;d recommend you start with.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative aspect-[4/5] rounded-card overflow-hidden border" style={{ borderColor: "var(--c-line)" }}>
              <Image
                src="/images/flock/barred-rock-flock-electric-fence.jpeg"
                alt="Barred Rock flock behind electric poultry netting on the homestead pasture"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-card overflow-hidden border" style={{ borderColor: "var(--c-line)" }}>
              <Image
                src="/images/flock/muscovy-ducks-homestead-yard.jpeg"
                alt="Muscovy ducks in the homestead yard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="How we work" title="Four things we won't budge on" className="mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {values.map((value, i) => (
              <div key={value.title}>
                <p className="label-mono mb-3" style={{ color: "var(--c-brand)", opacity: 0.65 }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--c-title)" }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we serve */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            eyebrow="Where we serve"
            title="East Tennessee and over the line"
            subtitle="Pickup is at the farm in Newport. We'll sometimes meet partway for buyers coming from the far side of Knoxville or up from Asheville — ask."
            className="mb-10"
          />
          <ul className="flex flex-wrap justify-center gap-2">
            {AREAS_SERVED.map((area) => (
              <li
                key={area}
                className="label-mono px-3 py-2 rounded-btn border"
                style={{
                  background: "var(--c-panel)",
                  color: "var(--c-ink-2)",
                  borderColor: "var(--c-line)",
                }}
              >
                {area}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ContactLine lead="Not sure if we reach you?" />
          </div>
        </div>
      </section>

      <CTABanner
        title="Come see the place"
        subtitle="Visits are by appointment so somebody's here and the birds are penned. Call ahead and we'll show you around."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Farm Shop"
        secondaryHref="/farm-shop"
      />
    </>
  );
}
