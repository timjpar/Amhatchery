import Image from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  /** Decorative background photo — alt stays empty, so describe nothing here. */
  imagePosition?: string;
  /** Small mono facts printed along the bottom edge, e.g. "21 days · 99.5°F". */
  facts?: string[];
  children?: React.ReactNode;
}

/**
 * Interior page masthead. Photo behind a dark scrim + wire-mesh texture, with
 * the title set large in the display serif and facts in mono along the base.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imagePosition = "center",
  facts,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: imagePosition }}
            sizes="100vw"
          />
        ) : (
          /* No photo: a warm brooder-lamp glow rather than a flat field, so the
             photo-less heroes still read as designed. */
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 15% 0%, color-mix(in srgb, var(--c-accent) 28%, var(--c-rail)) 0%, var(--c-rail) 62%)",
            }}
          />
        )}
        <div className="absolute inset-0 hero-scrim" />
        <div className="absolute inset-0 hero-scrim-left" />
        <div className="absolute inset-0 mesh opacity-50" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
        {eyebrow && (
          <p className="label-mono hero-stamp mb-5" style={{ color: "var(--c-accent)" }}>
            {eyebrow}
          </p>
        )}
        <h1
          className="hero-type text-4xl sm:text-5xl md:text-6xl font-semibold max-w-3xl"
          style={{ color: "#fdfaf2", textWrap: "balance" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="hero-type mt-5 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: "rgba(253,250,242,0.9)" }}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}

        {facts && facts.length > 0 && (
          <ul
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5"
            style={{ borderColor: "rgba(253,250,242,0.22)" }}
          >
            {facts.map((fact) => (
              <li
                key={fact}
                className="label-mono hero-type"
                style={{ color: "rgba(253,250,242,0.8)" }}
              >
                {fact}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
