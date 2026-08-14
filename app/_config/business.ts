import { LINKS } from "@/app/_config/links";

/**
 * Canonical business identity (NAP — Name, Address, Phone) for AM Hatchery.
 *
 * Single source of truth for structured data (app/_lib/schema.ts), the footer,
 * and the contact page. Keep this consistent with the Google Business Profile
 * listing — NAP consistency across the web is a local-SEO ranking signal.
 *
 * NOTE: SITE_URL is the live domain, registered through Vercel and connected to
 * the `amhatchery` project (`www` 308-redirects to the apex). It is the single
 * place to change the domain — sitemap, robots, canonical URLs, and JSON-LD all
 * read from it.
 */

export const SITE_URL = "https://amhatchery.com";

export const BUSINESS = {
  name: "AM Hatchery",
  legalName: "AM Hatchery",
  tagline: "Hatching eggs, chicks, ducklings & quail — Newport, Tennessee",
  description:
    "Small family hatchery in Newport, Tennessee. Fertile hatching eggs, day-old chicks, ducklings, and quail from heritage and blue-egg-laying breeds — plus farm-fresh eating eggs. Local pickup in East Tennessee.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/logo.svg`,
  image: `${SITE_URL}/images/farm/muscovy-duck-broody-nest-hatching-eggs.jpeg`,
  email: LINKS.email,
  /** E.164-style for schema; display/href versions live in links.ts. */
  telephone: "+1-423-540-6566",
  contactName: "Michael",
  founders: ["Michael Parsons", "Ali Parsons"],
  /** Chicks from $5, hatching eggs from $10, grown birds to $50. */
  priceRange: "$",
  /** Home-based hatchery — no public street address. City-level only. */
  address: {
    locality: "Newport",
    region: "TN",
    regionName: "Tennessee",
    postalCode: "37821",
    country: "US",
  },
  /** Approximate Newport, TN centroid. Refine with the GBP map pin. */
  geo: {
    latitude: 35.9668,
    longitude: -83.1871,
  },
  hoursNote: "By appointment",
  sameAs: [LINKS.facebook, LINKS.instagram, LINKS.tiktok],
} as const;

/**
 * Areas served — East Tennessee + Western North Carolina.
 * Feeds LocalBusiness.areaServed.
 */
export const AREAS_SERVED: string[] = [
  "Newport, TN",
  "Cocke County, TN",
  "Sevier County, TN",
  "Jefferson County, TN",
  "Hamblen County, TN",
  "Knox County, TN",
  "Greene County, TN",
  "East Tennessee",
  "Smoky Mountains",
  "Western North Carolina",
  "Asheville, NC",
];

/**
 * Google Search Console verification token (HTML-tag method).
 * Paste the content value from Search Console here; leave "" to omit the tag.
 */
export const GOOGLE_SITE_VERIFICATION: string = "";
