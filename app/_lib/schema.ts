import { BUSINESS, AREAS_SERVED, SITE_URL } from "@/app/_config/business";
import type { Bird, FaqItem } from "@/app/_types";

/**
 * Schema.org JSON-LD builders. Pure functions fed by the canonical business
 * identity (app/_config/business.ts) and the data files, rendered via the
 * <JsonLd> component. Validate output with Google's Rich Results Test.
 */

type JsonLd = Record<string, unknown>;

/** Stable @id for the business entity so other nodes (Offers) can reference it. */
export const BUSINESS_ID = `${SITE_URL}/#business`;

/** Sitewide LocalBusiness — the core local-SEO entity (who/where/contact). */
export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: AREAS_SERVED,
    founder: BUSINESS.founders.map((name) => ({ "@type": "Person", name })),
    knowsAbout: [
      "Hatching eggs",
      "Egg incubation",
      "Day-old chicks",
      "Ducklings",
      "Coturnix quail",
      "Brooding and chick care",
    ],
    sameAs: BUSINESS.sameAs,
  };
}

/** ItemList of the birds on a species page — helps Google read the lineup. */
export function birdListSchema(name: string, birds: Bird[], path: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: `${SITE_URL}${path}`,
    itemListElement: birds.map((bird, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: bird.name,
        description: bird.description,
        ...(bird.image ? { image: `${SITE_URL}${bird.image}` } : {}),
        category: "Animals & Pet Supplies > Live Animals",
        brand: { "@type": "Brand", name: BUSINESS.name },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability:
            bird.availability === "available"
              ? "https://schema.org/InStock"
              : "https://schema.org/PreOrder",
          url: `${SITE_URL}${path}`,
          seller: { "@id": BUSINESS_ID },
        },
      },
    })),
  };
}

/** FAQPage from the FAQ data. */
export function faqPageSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** HowTo for the incubation and brooding guides. */
export function howToSchema(
  name: string,
  description: string,
  path: string,
  steps: Array<{ title: string; body: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: `${SITE_URL}${path}`,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.body,
    })),
  };
}

/** BreadcrumbList for nested pages. Paths are site-relative (e.g. "/guides"). */
export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
