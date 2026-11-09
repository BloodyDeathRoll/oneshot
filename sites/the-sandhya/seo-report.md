# The Sandhya: SEO report (station 4h)

seo 0.2.2 · run `2026-11-ahangama-01` · 2026-11-09 · operator alon · `mode: test` · site: `sites/the-sandhya/final/` (the 4g build of calm, ledger state `built`)

The 4g build had a title of 95 characters, the tagline as its description, a relative `og:image` (which link previews cannot read), no robots meta, no JSON-LD, no robots.txt and no sitemap. This station adds the head, the structured data and the crawl files under the preview rule. **Nothing visible changed:** the `<body>` of the new `dist/index.html` is identical, character for character, to the 4g build once the one new `ld+json` script is removed (52 265 = 52 265 chars). No copy, content field, CSS or script was touched.

## The preview rule

This site is a preview until a sale. The rule is in `final/src/lib/seo.mjs`, the same one the other finals in this pipeline use (Shahar, 2026-09-22). A build is a preview when it has no `SITE_URL`, or when `SITE_URL` is a `*.workers.dev` or localhost URL. A preview build has:

- `<meta name="robots" content="noindex, nofollow">`;
- a `robots.txt` with `User-agent: *` and `Disallow: /`;
- no `sitemap.xml`;
- no canonical and no hreflang. A noindexed copy names no canonical home, which is a change from global-surf-adventures-v2, where a workers.dev build carried a canonical.

If the preview is built with `SITE_URL=https://the-sandhya.os1.workers.dev/`, it still gets an absolute `og:url` and `og:image`, so the pitch link shows the hero photograph in WhatsApp. It stays noindexed either way. Only a `SITE_URL` on the client's own domain (station 8) turns on indexing, the canonical, hreflang and the sitemap.

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/seo.mjs` | New. `isPreviewUrl` / `SITE` / `IS_PREVIEW`, `abs`, `ROUTES`, `pageTitle`, `metaDescription`, `postalAddress`, `pinFromMapUrl`, `LD_TYPE`, `heroImage`, `businessLd`, `ldJson`. Every value comes from `src/tenant/content.json` and `photos.generated.json`. |
| `final/src/pages/index.astro` | Head only, plus one JSON-LD script at the end of `<body>`, after the site script. **Title:** was "The Sandhya \| An adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka." (95 chars). Now "The Sandhya, Ahangama" (21). The rule is "name \| tagline" when that fits in 60 characters, else KA's "name, town", with the town parsed from `contact.address`. **Description:** was the tagline alone. Now the booking card's own sentences in the card's order, each whole sentence added only if it still fits in 155: "An adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka. A continental breakfast for two adults is included in your stay." (145). The spot sentence (83 chars) and the rates sentence did not fit and were skipped whole. **Added:** robots noindex on a preview; `og:site_name`, `og:title`, `og:description`; `twitter:card` (`summary`, or `summary_large_image` when there is an image); with `SITE_URL`, `og:url`, `og:image` with type, width, height and alt (the hero photograph, `photos/img-071-d-2000.webp`, 2000×1334, 176 KB); canonical and hreflang `en` + `x-default` only on a non-preview build. **Removed:** the relative `og:image`, and `og:title` set to the name alone. |
| `final/src/pages/robots.txt.js` | New. Preview: one refusal, no Sitemap line. Real domain: `Allow: /` plus `Sitemap:`. Named AI-crawler groups are left to station 4i. |
| `final/src/pages/[sitemap].xml.js` | New. Built only with a non-preview `SITE_URL`: one URL with hreflang `en` + `x-default`. `lastmod` only from the CMS's `updatedAt`, never invented (the demo's `content.json` has none). |
| `final/audit.json` | Rewritten by the last after-measurement. |

Headings were left alone. There is one `h1`, then h2 and h3 in order (audit: H1, H2, H2, H3×4, H2×5, H3, H2, H2).

## Structured data

**`Hotel`** (a `LodgingBusiness` subtype). `businessType` is `beach_lodging`, and the business calls itself a hotel (the tagline; dossier `business.type`: "Luxury Beachfront Boutique Hotel"). The schema has no lodging sub-type field, so `LD_TYPE` maps `beach_lodging` to `Hotel` in this template. That is a per-site choice, as at the-lavish-haven (base.md hard constraint 3).

| property | value | content field → dossier |
|---|---|---|
| `name` | The Sandhya | `businessName` → `business.name` (Google lists the same name) |
| `description` | the meta description | `tagline`, `copyBlocks[offer][1]` last ¶ → `business.description`, `booking.rate_terms` (copy/sources.md) |
| `telephone` | +94765700007 | `contact.phone` → `contact.phone` (own site, Google, engine agree) |
| `email` | reservations@thesandhya.com | `contact.email` → `contact.email` |
| `address` | PostalAddress {streetAddress "Baranige Wattha Walhengoda", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"} | `contact.address` → `location.address` (Google's words, capitalised; postcode from the engine, per playbook §6 refinement 1) |
| `geo` | 5.9769788, 80.3525613 | the `!3d…!4d…` pin in `contact.mapUrl` = dossier `location.lat_lng` (Google pin) |
| `hasMap` | the Google Maps place URL | `contact.mapUrl` → `location.map_url` |
| `checkinTime` / `checkoutTime` | 14:00 / 12:00 | `stayInfo` → own engine (the page also prints the contradiction note) |
| `amenityFeature` | 29 × LocationFeatureSpecification (label + note) | `amenities[]` → `facilities` |
| `knowsLanguage` | ["en"] | `languagesSpoken` → `languagesSpoken` (Trip.com) |
| `sameAs` | Instagram, the Trip.com listing, the Kayak listing | `socialLinks[]`, `ratings[].url` |
| `@id`, `url`, `image` (22 photos[] rows) | only with `SITE_URL` | `photos[]`, as the WebP files the page serves |

There are 14 keys on a build without `SITE_URL` and 17 with it.

**Validation.** No network validator was available, so this is checked locally only. The block parses with `JSON.parse` (one per page), and `<` is escaped so no value can close the script. The properties were checked against schema.org by reading. With `SITE_URL=https://example.test/` and with the workers.dev URL, all 22 `image` URLs and the `og:image` exist in the build output.

## Measured, before and after

"Before" is the 4g build, rebuilt at the start of this session and kept in scratch. Both were measured with `node tools/audit-mockup.mjs the-sandhya ../final`: a 390×844 phone, slow 4G, first load, local server.

| | before (4g) | after | target |
|---|---|---|---|
| HTML, uncompressed / gzip | 105 303 B / 43 760 B | 109 105 B / 44 344 B (+3.8 KB, of which 3.6 KB is JSON-LD) | — |
| First-load transfer | 610 793 B, 9 requests, all local | 614 595 B, 9 requests, all local | ≤ 1.5 MB |
| JS | 0 as files, inline unchanged | same | ≤ 300 KB |
| Largest image | 175 632 B | same | ≤ 300 KB |
| **LCP** (ms, runs) | 700 / 672 / 572 / 564 | **588 / 656 / 560 / 648 / 564 / 564** | ≤ 2 500 |
| **CLS** (load) | 0.0032 every run | **0.0032** every run | < 0.1 |
| **Scroll CLS early / settled** | 0.0032 / 0, **once 0.2744** (1 of 4 runs) | 0.0032 / 0, **once 0.2238** (1 of 6 runs) | < 0.1 |
| Third-party on load | 0 | 0 | 0 |
| Tap targets < 44 px / images without alt | 0 of 50 / 0 of 47 | same | — |

The LCP spread is noise on both sides. **The occasional early-scroll shift is in the 4g build, not from this station.** It appears on both builds, with identical bodies. In the after run that caught it, the shift (0.2206 at 4.4 s, y ≈ 7138) came from `div.step-two` and `div.bleed` while the throttled page was still loading, so most likely an image arriving without reserved space mid-scroll. The final `audit.json` shows 0.0032. **For the critic / designer:** look at the `.step-two` and `.bleed` blocks' reserved heights. I did not change them, because that is rendered layout.

## Checks

| check | result |
|---|---|
| `npm run build` (no `SITE_URL`) | clean. `dist/`: index.html, robots.txt (Disallow), fonts, img, photos. No sitemap |
| build with `SITE_URL=https://the-sandhya.os1.workers.dev/` (scratch outDir) | noindex, robots `Disallow: /`, no sitemap, no canonical. `og:url` + `og:image` absolute, `summary_large_image`. JSON-LD 17 keys, `@id` `…workers.dev/#business` |
| build with `SITE_URL=https://example.test/` (scratch outDir) | no noindex. robots `Allow: /` + `Sitemap: https://example.test/sitemap.xml`. Sitemap: 1 URL + hreflang. Canonical, hreflang en + x-default |
| `node tools/check-design.mjs sites/the-sandhya/final/dist` | ok, 0 problems, 0 warnings. h1 and body Schibsted Grotesk, h2 Sacramento, ground hsl(0 0% 95%), as at 4g. (`check-design.mjs the-sandhya` by slug checks the three mockups, not the final: 0 failing. I deleted the shots it wrote under `mockups/*/shots/check-design`.) |
| date fields + booking link (headless Chromium, 390, port 8977, stopped) | fields shown with JS. 8 `data-engine` links, all plain `https://hotels.cloudbeds.com/reservation/WMvA6V…`. After both dates, 8 of 8 carry `#checkin=…&checkout=…`. After clearing one date, all 8 are plain again and "Choose both dates, or clear both." shows. 0 page errors. Audit tap: `https://hotels.cloudbeds.com/reservation/WMvA6V` |
| NAP, page vs JSON-LD | footer `tel:+94765700007` = `telephone`. Footer address "Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka" = the PostalAddress parts joined. Footer "Map" link = `hasMap` |
| brand query | "The Sandhya" is the first words of `<title>`, `og:site_name`, JSON-LD `name` and the logo's alt. It is not in the h1 (Still wrong 1) |

## Still wrong, and what it would take

1. **The h1 carries what and where, but not the name.** The h1 is the tagline, "An adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka." That suits a category search, but base.md asks for the name too. The name is only the logo image's alt in the header. Putting both in one h1 means changing visible text or restructuring the hero, and either changes the look. **For a human:** (a) leave it, since the title, `og:site_name` and JSON-LD carry the exact name; (b) make the header logo the h1 and the tagline a `<p>` (same look with a CSS selector change, but the category h1 is lost); (c) a copy change that puts the name in the hero line.
2. **The title is short.** "The Sandhya, Ahangama" is right for the brand query but has no "hotel". The schema has no SEO title field, so the title is derived. Fix: the long-proposed `seo.title` / `seo.description` fields (not applied: `schemas/` is outside this station's scope).
3. **`og:image` is WebP.** Facebook and Twitter accept it. WhatsApp's preview of WebP was not tested on a phone. If it fails, add one JPEG rendition of the hero to `layout.mjs` for `og:image`.
4. **Schema gaps**, unchanged and only proposed: `seo.*`, `contact.geo` (worked around through `contact.mapUrl`'s pin), a lodging sub-type (so `LD_TYPE` need not be per site), and `alternateNames[]`.
5. **`sameAs` leaves out Facebook and Tripadvisor.** They are in dossier `contact.socials` from search results only, never opened, and in no content field.
6. **No production domain yet.** Station 8 must build with `SITE_URL=https://<domain>/` (trailing slash). Without it, or on workers.dev, the build is a noindexed preview by design.
7. **The intermittent early-scroll shift** (above) is the 4g layout's, roughly 1 run in 5.

## Refused or omitted because the sources do not support it

- **`aggregateRating` / `review`:** omitted. This follows Shahar's no-ratings-markup decision (KA, applied to every site since). Also, Kayak's 9.4 from 159 is not yet verified by a person, and both scores are third-party scores.
- **`priceRange` / `Offer`:** omitted. The only price is Exclusive Use, US$3,500 for the whole house per night, "from" and "++". That is a nightly price, not a room rate, and no room rate is published (gap `offers.nightly_rates`). No aggregator rate was used.
- **Michelin and press:** no Michelin name or distinction (the dossier shows none) and no press quote anywhere in the head or JSON-LD.
- **WhatsApp:** not used (`contact.whatsapp` is empty; dossier: weak, unconfirmed).
- **Adults-only:** only in the passed tagline, as the dossier states it ("Adults only", `business.description`). No age policy property, because the sources disagree on the minimum age (`contradictions.age_policy`).
- **`openingHoursSpecification`:** `openingHours[]` is empty. A 24-hour front desk is not opening hours.
- **`numberOfRooms` (9), `containsPlace` rooms, `starRating`:** 9 appears only in copy prose; rooms as data are left to station 4i; there is no star rating in the dossier.
- No category or superlative words were added beyond the owner's own fields.

## Not verified

- A real phone (LCP and CLS are headless Chromium on this machine, with throttling). Google's Rich Results Test or the schema.org validator over the network. WhatsApp, Facebook and X link previews on the workers.dev URL. The Cloudbeds engine honouring `#checkin` / `?rid=` (4g's open item, unchanged).
- I did not run `npm test` or `check-wiring`. I did not run `shoot.mjs`, because nothing that renders changed (the body is identical).
