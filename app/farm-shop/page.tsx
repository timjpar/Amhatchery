import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/app/_components/ui/PageHero";
import { SectionHeader } from "@/app/_components/ui/SectionHeader";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { Button } from "@/app/_components/ui/Button";
import { LINKS } from "@/app/_config/links";

export const metadata: Metadata = {
  title: "Farm Shop — Produce, Eggs & Flowers at Firstfruits Farmstead",
  description:
    "While you're picking up birds, stop by the Firstfruits Farmstead farm shop in Newport, TN for seasonal produce, farm-fresh eggs, cut flower bouquets, and composted rabbit fertilizer.",
};

const offerings = [
  {
    name: "Farm Fresh Eggs",
    image: "/images/farm/silver-laced-wyandotte-hen-pasture.jpeg",
    alt: "Silver Laced Wyandotte laying hen foraging on pasture",
    description:
      "From the same pasture-raised hens whose eggs go in our incubators — gathered daily, with yolks the colour of a good afternoon.",
  },
  {
    name: "Fresh Produce",
    image: "/images/farm/firstfruits-farmstead-produce-basket.jpeg",
    alt: "Basket of farm-fresh eggs, quail eggs, squash, cucumbers, tomatoes, herbs, and pickles",
    description:
      "Homegrown, in-season vegetables cut at their peak. What's on the table changes weekly — swing by and see.",
  },
  {
    name: "Cut Flower Bouquets",
    image: "/images/flock/homestead-zinnia-flower-bouquet.jpeg",
    alt: "Fresh-cut zinnia flower bouquet from the homestead garden",
    description:
      "Seasonal bouquets picked from the garden that morning. Good for the kitchen table, better as an unexpected gift.",
  },
  {
    name: "Composted Fertilizer",
    image: "/images/flock/rabbit-manure-fertilizer-soil-amendment.jpeg",
    alt: "Composted rabbit manure used as an organic garden soil amendment",
    description:
      "Cold-composted rabbit manure from the rabbitry next door — a gentle, no-burn amendment your raised beds will notice.",
  },
];

export default function FarmShopPage() {
  return (
    <>
      <PageHero
        eyebrow="While you're here"
        title="The farm shop"
        subtitle="Most people who drive out for birds leave with vegetables too. Look for the sign out front, then let yourself in."
        image="/images/garden/harvested-carrots-bouquet-sunset-garden.jpeg"
        imagePosition="center 60%"
        facts={["Newport, TN", "Open when we're home", "Cash or card"]}
      />

      {/* The shop */}
      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Firstfruits Farmstead"
            title="Stop by on your way out"
            subtitle="The shop is a few steps from the brooder house. Eggs, produce, and flowers are laid out inside; pay in the box or find one of us in the yard."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative aspect-[3/4] rounded-card overflow-hidden border" style={{ borderColor: "var(--c-line)" }}>
              <Image
                src="/images/farm/firstfruits-farmstead-yard-sign.jpeg"
                alt="Firstfruits Farmstead sign in the garden out front of the farm shop"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-card overflow-hidden border" style={{ borderColor: "var(--c-line)" }}>
              <Image
                src="/images/farm/firstfruits-farmstead-farm-shop-interior.jpeg"
                alt="Inside the Firstfruits Farmstead farm shop with produce displays and fresh flowers"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 px-4" style={{ background: "var(--c-panel)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="On the table" title="What's usually out" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offerings.map((item) => (
              <article
                key={item.name}
                className="rounded-card border overflow-hidden flex flex-col"
                style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--c-title)" }}>
                    {item.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href={LINKS.farmstead} external size="lg" variant="outline">
              Visit the Firstfruits Farmstead site
            </Button>
          </div>
        </div>
      </section>

      <CTABanner
        title="Come for the chicks, leave with tomatoes"
        subtitle="Book a pickup and we'll make sure the shop is open when you get here."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Available Now"
        secondaryHref="/available"
      />
    </>
  );
}
