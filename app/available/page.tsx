import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/_components/ui/PageHero";
import { CTABanner } from "@/app/_components/ui/CTABanner";
import { GalleryGrid } from "@/app/_components/ui/GalleryGrid";
import { ContactLine } from "@/app/_components/ui/ContactLine";
import { LINKS } from "@/app/_config/links";
import { getAlbumPhotos } from "@/app/_lib/flickr";

export const metadata: Metadata = {
  alternates: { canonical: "/available" },
  title: "Available Now — Chicks, Ducklings, Quail & Eggs",
  description:
    "See what's available at AM Hatchery in Newport, TN right now — hatching eggs, chicks, ducklings, and quail. Photo galleries updated as each hatch comes off the incubator.",
};

const GALLERIES = [
  LINKS.flickrAlbums.eggs,
  LINKS.flickrAlbums.chickens,
  LINKS.flickrAlbums.ducks,
  LINKS.flickrAlbums.quail,
];

export default async function AvailablePage() {
  const galleries = await Promise.all(
    GALLERIES.map(async (gallery) => ({
      ...gallery,
      photos: await getAlbumPhotos(gallery.url, `${gallery.title} available at AM Hatchery`),
    })),
  );
  const populated = galleries.filter((g) => g.photos.length > 0);

  // The page regenerates on a 10-minute ISR cycle (see getAlbumPhotos), so the
  // render date doubles as a "last updated" stamp that stays current on its own.
  const updatedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "America/New_York",
  }).format(new Date());

  return (
    <>
      <PageHero
        eyebrow="Availability"
        title="What's off the incubator"
        subtitle="Updated as each hatch comes through. If you see something you want, a deposit holds it — birds move fast in spring."
        image="/images/flock/free-range-chickens-mobile-coop-flock.jpeg"
        imagePosition="center 55%"
        facts={[`Last updated ${updatedAt}`, "Pickup in Newport, TN"]}
      />

      <section className="py-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-6xl mx-auto">
          {populated.length > 0 ? (
            <div className="flex flex-col gap-16">
              {populated.map((gallery) => (
                <div key={gallery.url}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
                    <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: "var(--c-title)" }}>
                      {gallery.title}
                    </h2>
                    <p className="label-mono" style={{ color: "var(--c-ink-2)" }}>
                      {gallery.photos.length} photo{gallery.photos.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <GalleryGrid images={gallery.photos} aspect="portrait" />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-card border p-12 text-center max-w-2xl mx-auto"
              style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
            >
              <div className="text-4xl mb-5" aria-hidden="true">
                🐣
              </div>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: "var(--c-title)" }}>
                The gallery is refreshing
              </h2>
              <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "var(--c-ink-2)" }}>
                Photos load straight from our Flickr albums and occasionally take a
                moment. You can browse them directly in the meantime.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {GALLERIES.map((gallery) => (
                  <a
                    key={gallery.url}
                    href={gallery.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center h-11 px-5 rounded-btn font-semibold text-sm transition-opacity hover:opacity-90"
                    style={{ background: "var(--c-brand)", color: "var(--c-brand-fg)", textDecoration: "none" }}
                  >
                    {gallery.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="pb-20 px-4" style={{ background: "var(--c-page)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-card border p-9"
            style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
          >
            <h2 className="text-2xl font-semibold mb-3" style={{ color: "var(--c-title)" }}>
              See something you want?
            </h2>
            <p className="text-base leading-relaxed mb-7 max-w-md mx-auto" style={{ color: "var(--c-ink)" }}>
              Availability changes daily during hatch season, and what&apos;s pictured
              may already be spoken for. Reach out before you drive out.
            </p>
            <Link
              href="/reserve"
              className="inline-flex items-center justify-center h-13 px-8 py-3.5 rounded-btn font-semibold text-lg transition-opacity hover:opacity-90"
              style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
            >
              Reserve With a Deposit
            </Link>
            <div className="mt-7">
              <ContactLine lead="Or just ask what's here today" />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Not sure what to start with?"
        subtitle="Quail if you want eggs fast, Barred Rocks if you want easy, Muscovies if you want your yard's bugs gone."
        primaryLabel="Compare the Birds"
        primaryHref="/chickens"
        secondaryLabel="Read the Guides"
        secondaryHref="/guides/incubation"
      />
    </>
  );
}
