import Image from "next/image";
import type { Bird } from "@/app/_types";
import { AvailabilityBadge } from "@/app/_components/ui/Badge";

/**
 * A breed card built like a spec sheet: photo, name, then a dashed rule and a
 * price row in mono. Used on the chicken, duck, and quail pages.
 */
export function BirdCard({ bird, sizes = "(max-width: 768px) 100vw, 33vw" }: { bird: Bird; sizes?: string }) {
  const prices = [
    bird.chickPrice && { label: "Chick", value: bird.chickPrice },
    bird.grownPrice && { label: "Grown", value: bird.grownPrice },
    bird.hatchingEggPrice && { label: "Eggs", value: bird.hatchingEggPrice },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <article
      className="rounded-card border overflow-hidden flex flex-col h-full transition-transform duration-200 hover:-translate-y-0.5 shadow-soft"
      style={{ background: "var(--c-panel)", borderColor: "var(--c-line)" }}
    >
      {bird.image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          {bird.imageFit === "contain" && (
            <Image
              src={bird.image}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover scale-110 blur-2xl brightness-90"
              sizes={sizes}
            />
          )}
          <Image
            src={bird.image}
            alt={bird.imageAlt ?? bird.name}
            fill
            className={`relative ${bird.imageFit === "contain" ? "object-contain" : "object-cover"}`}
            sizes={sizes}
          />
          {/* Status rides on the photo so the breed name gets the full card width. */}
          <span className="absolute top-3 left-3 z-10">
            <AvailabilityBadge status={bird.availability} />
          </span>
        </div>
      ) : (
        <div
          className="relative aspect-[4/3] flex items-center justify-center mesh"
          style={{ background: "var(--c-rail)" }}
        >
          <span className="text-5xl opacity-60" aria-hidden="true">
            🥚
          </span>
          <span className="absolute top-3 left-3">
            <AvailabilityBadge status={bird.availability} />
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold leading-tight mb-2" style={{ color: "var(--c-title)" }}>
          {bird.name}
        </h3>

        {bird.eggNote && (
          <p className="label-mono mb-3" style={{ color: "var(--c-ink-2)" }}>
            {bird.eggNote}
          </p>
        )}

        {bird.description && (
          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--c-ink)" }}>
            {bird.description}
          </p>
        )}

        {bird.alsoKnownAs && bird.alsoKnownAs.length > 0 && (
          <p className="text-xs mt-3 italic" style={{ color: "var(--c-ink-2)" }}>
            Also searched as: {bird.alsoKnownAs.join(", ")}
          </p>
        )}

        {prices.length > 0 && (
          <>
            <div className="rule-dash mt-5 mb-3" aria-hidden="true" />
            <dl className="flex flex-wrap gap-x-5 gap-y-1">
              {prices.map((p) => (
                <div key={p.label} className="flex items-baseline gap-1.5">
                  <dt className="label-mono" style={{ color: "var(--c-ink-2)" }}>
                    {p.label}
                  </dt>
                  <dd
                    className="text-sm font-bold"
                    style={{ color: "var(--c-brand)", fontFamily: "var(--font-mono)" }}
                  >
                    {p.value}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>
    </article>
  );
}
