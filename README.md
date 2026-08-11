# AM Hatchery

Marketing site for the poultry side of the family farm in Newport, Tennessee —
hatching eggs, chicks, ducklings, and quail. Split out of the `amrabbits` site,
which keeps the rabbitry.

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript.

## Running it

```bash
npm run dev
```

Then open http://localhost:3000. `npm run build` for a production build,
`npm run lint` to check.

## Where things live

| Path | What's in it |
| --- | --- |
| `app/_config/business.ts` | Name, phone, email, city, geo, areas served. Feeds the footer, contact page, and all JSON-LD. **Set `SITE_URL` here when the domain is registered** — sitemap, robots, canonicals, and structured data all read from it. |
| `app/_config/links.ts` | Phone, email, socials, Cash App, sister-farm sites, and the Flickr album URLs. |
| `app/_config/paypal.ts` | Public PayPal client id + hosted button id for the reservation deposit. |
| `app/_data/flock.ts` | Every bird we sell, plus `PRICING` and the egg price list. Edit prices here, not in the pages. |
| `app/_data/incubation.ts` | Incubation specs, the guide steps, candling milestones, brooding steps. |
| `app/_data/faq.ts` | FAQ questions and answers. |
| `app/_components/` | Shared UI. `PageHero`, `SectionHeader`, `BirdCard`, `CTABanner`, `ContactLine` cover most page structure. |
| `app/_lib/schema.ts` | JSON-LD builders (LocalBusiness, ItemList, FAQPage, HowTo, BreadcrumbList). |
| `app/_lib/flickr.ts` | Scrapes public Flickr albums for the /available gallery. 10-minute ISR. |

## Routine edits

**Change a price** — `app/_data/flock.ts`. The `PRICING` object holds the
headline numbers; individual birds can override.

**Add or retire a breed** — add an entry to `chickens`, `ducks`, or `quail` in
`app/_data/flock.ts`. Set `availability` to `"available"`, `"seasonal"`, or
`"coming-soon"`; the pages sort themselves out. Put photos in
`public/images/flock/` or `public/images/farm/`.

**Update the notice bar** — `app/_components/AnnouncementBanner.tsx`.

**Refresh the availability gallery** — nothing to do. `/available` re-scrapes
the Flickr albums every 10 minutes, so new photos appear without a redeploy.

## Two things to wire up before launch

1. **The contact form doesn't email anyone yet.** `app/_actions/contact.ts`
   validates the submission and logs it to the server console. Connect it to a
   mail provider (Resend, SendGrid, or a Formspree-style endpoint) so inquiries
   reach the inbox in `links.ts`.
2. **`SITE_URL` is a placeholder** (`https://amhatchery.com`). Set the real
   domain in `app/_config/business.ts`.

Deposits already work — the PayPal hosted button in `app/_config/paypal.ts` is
the same one the rabbitry uses, so payments land in the existing account. Swap
both values there to point them somewhere else.

## Theming

Two themes, both defined as CSS custom properties in `app/globals.css`:
`eggshell` (light, cream paper) and `brooder` (dark, heat-lamp). The inline
script in `app/layout.tsx` stamps `data-theme` on `<html>` before React hydrates
so there's no flash; `ThemeProvider` reads the stored value with
`useSyncExternalStore`. Colors are referenced as `var(--c-*)`, never hardcoded.

## Redirects

`next.config.ts` maps the old AMRabbits farm URLs (`/farm/eggs`,
`/farm/chickens`, …) to their new homes here, so inbound links and any old
Google results keep working.
