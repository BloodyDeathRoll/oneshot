# Global Surf Lodge Kabalana — SEO report (station 4h)

seo 0.2.0 · run `2026-09-globalsurf-02` · 2026-10-05 · operator shahar · site: `sites/global-surf-adventures/final/` (the 4g build, ledger `picked → built`)

Nothing visible changed. No markup that renders was touched: only `<head>` tags and one non-rendering `application/ld+json` script per page. Proof under "Look".

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | New "SEO plumbing" section. `SITE` / `IS_PREVIEW` / `isPreviewUrl` (the preview rule KA's build set, Shahar 2026-09-22, same code as Lavish/Layday). `ROUTES` (home, `book/`). `metaDescription` and `sentences`. `postalAddress` (address text → PostalAddress). `pinFromMapUrl` (geo, see below). `LD_TYPE`. `businessLd()` (the JSON-LD). `ldJson()` (escapes `<`). `seoHead()` (shared head tags). |
| `final/src/pages/index.astro` | **Description** was the tagline alone (81 chars). Now it is the tagline + the welcome's lodge sentence + the rooms block's first sentence, all owner-written, cut at a sentence to 155: "Surf weeks for all levels on Sri Lanka's south coast, a few steps from the ocean. The lodge sits in the green of the jungle. There are just twelve rooms." (153). **Title** unchanged: "Global Surf Lodge Kabalana \| Surf weeks in Sri Lanka" (52, brand first). **Added:** preview `noindex, nofollow`, canonical, hreflang en + x-default, `og:type/site_name/title/description/url`, `og:image` (the hero poster, 1280×720, with its alt) and `twitter:card` (`summary_large_image` with an image, else `summary`). Every absolute URL appears only with `SITE_URL`. **JSON-LD:** one block at the end of `<body>`. |
| `final/src/pages/book/index.astro` | Same head tags (path `book/`, no og:image). Title and description unchanged; the description is interface wording that describes the flow's steps, not a business fact. **JSON-LD:** a `WebPage` whose `about` is the business (`@id` …`/#business` with `SITE_URL`, else name + type). |
| `final/src/pages/robots.txt.js` | New. A real domain gets `User-agent: *` / `Allow: /` + `Sitemap:` (with `SITE_URL`). A preview gets one refusal (`Disallow: /`) and no sitemap line. Named AI-crawler groups are left to 4i. |
| `final/src/pages/[sitemap].xml.js` | New. Built only with `SITE_URL` on a non-preview host. 2 URLs (home, `book/`), each with hreflang en. `lastmod` comes from `updatedAt` when the CMS has one (the seed has null, so none is written). |
| `final/audit.json` | Rewritten by the after measurement. |

Nothing written outside `sites/global-surf-adventures/`. No content field and no copy changed.

## Structured data

**`["LodgingBusiness", "SportsActivityLocation"]`**. `businessType` is `surf_camp`: it sells the bed and the lessons (schema/business-types.md). base.md names `SportsActivityLocation` for a school or camp. `LodgingBusiness` is what carries `checkinTime`, `checkoutTime` and `amenityFeature`. schema.org allows a multi-typed entity, so it gets both. Booking.com files it as Hostel and Google as a hotel; neither is the business's own word, so I used no sub-type.

| property | value | content field → dossier |
|---|---|---|
| `name` | Global Surf Lodge Kabalana | `businessName` → `business.name`. Google's name differs: "Still wrong" 2 |
| `description` | the meta description | `tagline`, `copyBlocks[intro]` ¶2 s1, `copyBlocks[about][1]` ¶1 s1 |
| `telephone` | +97299733943 | `contact.phone` → `contact.phone` (the business's site). Not Google's: "Still wrong" 2 |
| `email` | info@globalsurf.com | `contact.email` → `contact.email` |
| `address` | PostalAddress {streetAddress "Henewatta Addara Gederawata", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"} | `contact.address` → `location.address` (the Google listing, place names capitalised per playbook §6) |
| `geo` | 5.9810484, 80.3420635 | parsed from `contact.mapUrl`'s `!3d…!4d…` (the Google place pin), = dossier `location.lat_lng` exactly |
| `hasMap` | the Google Maps place URL | `contact.mapUrl` → `location.map_url` |
| `priceRange` | "From USD 1,466 per person, 7 nights" | the lowest `lessons[].price` + `currency`, worded as the page prints it ("From $1,466 pp \| 7 nights") → `offers[0–2].price` (28 Sep 2026) |
| `checkinTime` / `checkoutTime` | 14:00 / 11:00 | `stayInfo.checkInFrom` / `.checkOutTo` |
| `amenityFeature` | 15 × LocationFeatureSpecification | `amenities[]` (label + note), the same rows as the content |
| `sameAs` | Instagram @globalsurf_kabalana, the Booking.com listing | `gaps.json` `instagram.url` (SCHEMA GAP, the footer's link) → `contact.instagram_profiles[1]`; `ratings[0].url` → `reviews.booking` |
| `@id`, `url`, `image` (10: poster + 9 photos) | only with `SITE_URL` | `heroVideoPoster`, `photos[]` |

That is 14 keys on a preview build and 17 with `SITE_URL`.

**geo with no constant.** The schema has no geo field. Lavish used a hard-coded `MAP_PIN` guarded by the seed. Here the pin is read from the owner's own map link: a Google place URL carries the listing's pin as `!3d<lat>!4d<lng>` (the `@…` part is only the viewport). If the owner changes the link, the pin follows. A link without a pin gives no `geo`, never a guess.

**Validation.** No network validator was available. Both blocks parse with `JSON.parse` (1 block per page). I checked the properties against schema.org by reading: `checkinTime`/`checkoutTime`/`amenityFeature` are on LodgingBusiness; `geo`/`hasMap`/`address`/`telephone` on Place/LocalBusiness; `priceRange` on LocalBusiness; `addressCountry` takes ISO alpha-2. With `SITE_URL=https://example.test/`, all 10 `image` URLs exist in the build output.

## Measured, before and after

"Before" is the 4g build, rebuilt at the start of this session (`make-media.sh` + `npm run build`). It came out byte-identical to the `dist/` on disk (`diff -rq`), and I copied it to scratch. Both builds were measured with `tools/audit-mockup.mjs global-surf-adventures ../final` (390×844 phone, slow 4G, first load, no scroll), and the last six runs were interleaved before/after.

| | before | after | target (playbook §4) |
|---|---|---|---|
| HTML, home | 91 963 B | 94 913 B (+2 950: JSON-LD + head tags) | — |
| HTML, booking | 98 149 B | 98 921 B (+772) | — |
| First-load transfer | 512 851 B, 11 requests, all local | 515 801 B, 11 requests, all local | ≤ 1.5 MB |
| Fonts / largest image | 103 872 B / 73 030 B | same | ≤ 150 KB / ≤ 300 KB |
| **LCP** (ms, runs) | 452 / 452 / 448 / 456 / 448 / 444 | **428 / 436 / 428 / 448 / 432 / 432 / 428 / 428** (final `audit.json`: 432) | ≤ 2 500 |
| **CLS** | 0.0033 | **0.0033** | < 0.1 |
| Third-party on load | 0 | 0 | 0 |
| Tap targets < 44 px | 0 of 56 | 0 of 56 | — |
| Images without alt / without width+height | 0 / 0 (home 39, booking 40) | same | — |
| Headings, home | H1 "Your surf week starts here" + 12 H2 + 7 H3 | unchanged | — |
| JSON-LD / og / canonical | none / none / none | 1 block per page / og:* + twitter:card / with `SITE_URL` | — |

The LCP difference (after ≈ 20 ms lower) is in the noise. It is not a gain this station made. All figures come from headless Chromium on this machine; no real phone was used.

## Look (no visible change)

- **Markup.** The body of both pages is identical character for character to before, once the new head tags and the ld+json script are stripped (home 91 413 = 91 413 chars, booking 97 595 = 97 595).
- **Pixels.** I made full-page Playwright captures of before and after (scratch script; every image forced to load and decoded, fonts ready, third parties blocked, animations disabled). They cover home and booking × 390×844 and 1440×900 × JS off and JS on + reduced motion. **8 of 8 PNGs are byte-identical.** A control run (before vs before) is also identical in all 4 home captures. A first version of the script that did not wait for image decode differed even in the control, so the wait is what makes the comparison valid.
- I did not run `shoot.mjs`: no markup that renders changed. `clean-shots.mjs` found nothing to remove.

## Checks

| check | result |
|---|---|
| `bash scripts/make-media.sh && npm run build` | clean. `dist/`: index.html, book/, fonts, photos, video, robots.txt (no sitemap: preview) |
| `npm test` (repo) | 13 / 13 pass |
| `node tools/check-wiring.mjs` | 16 agents, 0 failures, 2 warnings (taxonomy.md and server-hardening.md are stubs) |
| h1 | exactly 1 per page: home "Your surf week starts here", booking "Your level" (see "Still wrong" 1) |
| NAP, page vs JSON-LD | phone `tel:+97299733943` in the footer = JSON-LD `telephone`. The footer `<address>` "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" = the JSON-LD parts joined. "Open in Maps" = `hasMap` |
| no `SITE_URL` (the `dist/` left in place) | noindex on both pages; robots.txt `Disallow: /`; no canonical, og:url, og:image or sitemap; JSON-LD 14 keys |
| `SITE_URL=https://global-surf-adventures.os1.workers.dev/` (scratch outDir) | still noindex + `Disallow: /`, no sitemap. Canonical, hreflang en + x-default, og:url, og:image `…/video/gs-hero-loop-poster.1280.jpg` 1280×720 + alt, `summary_large_image`; JSON-LD 17 keys |
| `SITE_URL=https://example.test/` (scratch outDir) | no noindex; robots.txt `Allow: /` + `Sitemap: https://example.test/sitemap.xml`; sitemap with 2 URLs + hreflang; canonical per page; JSON-LD `@id` `https://example.test/#business`, booking page `about` → that `@id` |

## Still wrong, and what it would take

1. **The home h1 has neither the name nor the place.** It is the hero title "Your surf week starts here" (`gaps.json` `heroTitle`). On Lavish, Layday and KA the name in the top bar became the h1. Here the top bar shows no name as text, only the agency's GLOBALSURF logo (an SVG whose link has `aria-label` "Global Surf Lodge Kabalana, home"). An h1 around that logo would give crawlers no text, and I won't add hidden text. So I kept the visible h1. **For Shahar:** (a) a hero title that carries the name or the place (a copy change, visible); (b) the logo link wrapped in an h1 (invisible, but its only text is the aria-label); or (c) leave it. The title, `og:site_name` and JSON-LD `name` carry the exact name either way.
2. **NAP differs from Google in name and phone.** Google lists "Global Surf Lodge" with phone +94770776747 (dossier `business.name.note`, `contact.phone_lodge`). The site and JSON-LD use "Global Surf Lodge Kabalana" and +97299733943, the Israeli HQ line the business's own site publishes (copy/sources.md rows `businessName`, `contact.phone`, passed 4c). Which phone reaches the lodge is already an open owner question (sources.md, audit F5). The address matches Google with place names capitalised. Fixes would be `contact.phone` changed by the owner, and an `alternateNames[]` field to carry "Global Surf Lodge" into `alternateName` (still only proposed, as on KA/Layday/Lavish).
3. **`sameAs` leaves out Facebook and YouTube.** The footer links them, but they are the agency's (Global SURF / GLOBAL SURF), not the lodge's, and `sameAs` claims the same entity. Tripadvisor is unverified (403) and in no content field. The Google listing is in `hasMap`.
4. **Schema gaps**, unchanged and still only proposed: `socials[]` (sameAs reads `gaps.json`), `alternateNames[]`, `seo.title` / `seo.description` (the home title's "Surf weeks in Sri Lanka" and the booking description are template literals from 4g), and a geo field (worked around via `contact.mapUrl`).
5. **The booking page loads the dates and total photos eagerly** (`img-001-full-1600.webp`, `img-093-full-1536.webp`) for steps that are not shown yet. Making them lazy changes when they paint on the step change, so it is a design call. The booking page has no budget line of its own.
6. **Three empty anchors on home.** The level cards' media links are `aria-hidden`, `tabindex=-1` duplicates of each card's button. Crawlers see three links to `book/?level=…` with no anchor text. The same URLs have text links beside them. I left them because changing them touches rendered markup.
7. **No favicon or lodge logo.** The only logo is the agency's (dossier `business.logo.note`).
8. **No production domain yet.** The deployer must build with `SITE_URL=https://<domain>/` (trailing slash). Without it, or on workers.dev, the build is a noindexed preview by design.

## Refused or omitted because the sources don't support it

- **`aggregateRating` / `review`:** omitted. `ratings[]` has Booking.com 8.6/10 (80, 28 Sep 2026), which is real, but Shahar decided on no ratings markup for KA, and every site since has followed it.
- **`alternateName` "Global Surf Lodge":** in the dossier, but in no content field. Not hard-coded (base.md hard constraint 4).
- **`brand` / `parentOrganization` "Global Surf Adventures":** dossier `business.brand`, but no content field carries it. The footer's "© Global Surf Adventures" is a 4g template literal.
- **`openingHoursSpecification`, `knowsLanguage`:** `openingHours[]` and `languagesSpoken[]` are empty.
- **`numberOfRooms` (12), star rating (Google "3-star"):** the room count is only in copy prose and the star rating is in no field.
- **Per-level `Offer`s / `makesOffer`:** not added at 4h. `priceRange` carries the from-price, and 4i may add offers or an FAQ from the same fields.
- **No category or superlative words** added to the title or description beyond the owner's fields.
