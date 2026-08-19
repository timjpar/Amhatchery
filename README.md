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
| `app/_lib/flickr.ts` | Scrapes public Flickr albums for the /available gallery. Hourly ISR. |

## Routine edits

**Change a price** — `app/_data/flock.ts`. The `PRICING` object holds the
headline numbers; individual birds can override.

**Add or retire a breed** — add an entry to `chickens`, `ducks`, or `quail` in
`app/_data/flock.ts`. Set `availability` to `"available"`, `"seasonal"`, or
`"coming-soon"`; the pages sort themselves out. Put photos in
`public/images/flock/` or `public/images/farm/`.

**Update the notice bar** — `app/_components/AnnouncementBanner.tsx`.

**Refresh the availability gallery** — nothing to do. `/available` re-scrapes
the Flickr albums hourly, so new photos appear without a redeploy.

## Contact form

The form posts straight from the visitor's browser to
[FormSubmit](https://formsubmit.co), which emails the submission to
`LINKS.email` (`amrabbitstn@gmail.com`). See `app/_lib/submitForm.ts`. There is
no API key, no environment variable, and no Server Action behind it — the same
setup amrabbits.com uses.

It posts from the browser rather than the server on purpose: FormSubmit answers
HTTP 403 to requests originating from cloud infrastructure, so a POST from a
Vercel function fails in production while the identical call from a laptop
succeeds.

**Activation is scoped to recipient + origin.** amrabbits.com was activated
long ago, and firstfruitshatchery.com needed its own after the domain move —
changing the domain resets this. Until an origin is activated, FormSubmit
answers `{"success":"false"}` with a "This form needs Activation" message — so
submissions are *rejected*, not queued, and the visitor correctly sees the
failure notice with the phone and email fallback rather than a false
"Message sent".

To activate a new origin, submit once from it, then click the "Activate Form"
link FormSubmit emails to `LINKS.email`. The submission doesn't have to come
from the deployed site — any non-cloud machine works if you set the `Origin`
header, which is faster than deploying to test:

```bash
curl -s -X POST "https://formsubmit.co/ajax/amrabbitstn%40gmail.com" -H "Content-Type: application/json" -H "Origin: https://firstfruitshatchery.com" -d '{"Name":"test","Message":"test","_captcha":"false"}'
```

It must not come from cloud infrastructure, though — FormSubmit answers 403 to
those, which is the same reason the form posts from the browser rather than a
Vercel function.

Spam handling is the hidden honeypot in the form plus FormSubmit's own
filtering. There is deliberately no rate limiter: it could only run
server-side, and the endpoint is reachable without going through this site at
all.

The domain is live: `firstfruitshatchery.com` is registered through Vercel and
connected to the `amhatchery` project, with `www` 308-redirecting to the apex.
`SITE_URL` in `app/_config/business.ts` is the real domain — sitemap, robots,
canonical URLs, and JSON-LD all read from it.

`amhatchery.com` was the original domain. Both it and its `www` now
308-redirect to `firstfruitshatchery.com`, configured on the Vercel project's
Domains tab rather than in `next.config.ts`, so the hop happens at the edge
without invoking the app. Leave that domain registered and attached to the
project — dropping it breaks every inbound link and search result pointing at
the old address.

Deposits already work — the PayPal hosted button in `app/_config/paypal.ts` is
the same one the rabbitry uses, so payments land in the existing account. Swap
both values there to point them somewhere else.

## Images

Photos in `public/images/` are capped at 2048px on the long edge and re-encoded
at quality 82 — the source only needs to feed the largest `deviceSizes` entry
(1920). Drop new photos in at any size and re-run the same treatment; a 10MB
phone photo costs Vercel bandwidth and optimizer time for no visible gain.

`next.config.ts` serves optimized images as AVIF only (not AVIF + WebP — Next
caches each format separately, so listing both doubles billed transformations),
across four device widths, cached for 30 days.

**Replacing a photo requires a new filename.** Optimized variants are cached for
30 days with no invalidation mechanism, and `/images/*` is sent to browsers with
`max-age=2592000`. Reusing a filename means returning visitors can keep seeing
the old photo for up to a month.

## Theming

Three themes, all defined as CSS custom properties in `app/globals.css`:
`marans` (the default — cream paper, terracotta ink, sage bands), `eggshell`
(warmer paper, green rail), and `brooder` (dark, heat-lamp). The toggle in the
nav rail cycles them in that order. The inline script in `app/layout.tsx` stamps
`data-theme` on `<html>` before React hydrates so there's no flash;
`ThemeProvider` reads the stored value with `useSyncExternalStore`. Colors are
referenced as `var(--c-*)`, never hardcoded.

Adding, removing, or renaming a theme means editing four places, which the
comment at the top of `globals.css` also lists: the CSS block, `ThemeName` in
`app/_types/index.ts`, the `THEMES` array in `ThemeProvider.tsx`, and both the
`data-theme` attribute and the inline script's `allowed` list in `layout.tsx`.

## Redirects

`next.config.ts` maps the old AMRabbits farm URLs (`/farm/eggs`,
`/farm/chickens`, …) to their new homes here, so inbound links and any old
Google results keep working.
