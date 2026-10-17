# Global Surf Lodge Kabalana v2 — SEO report (station 4h)

seo 0.2.1 · run `2026-10-globalsurf-03` · 2026-10-17 · operator shahar · site: `sites/global-surf-adventures-v2/final/` (the 4g build, ledger `picked → built`)

The 4g port carried no SEO plumbing: a relative `og:image`, the same description (the tagline) on both pages, no canonical, no JSON-LD, no robots.txt or sitemap, and **no h1 on `book/`**. This station adds the same plumbing as the v1 final of the same business (`sites/global-surf-adventures/final`, seo 0.2.0), adapted to v2's files, and gives `book/` its h1. Nothing visible changed (proof under "Look").

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | New "SEO plumbing" section: `isPreviewUrl` / `SITE` / `IS_PREVIEW` (the preview rule, Shahar 2026-09-22), `abs`, `ROUTES` (home, `book/`), `metaDescription`, `postalAddress`, `pinFromMapUrl`, `LD_TYPE`, `businessLd()`, `ldJson()`, `seoHead()`. New `anyShape()` (a photo's uncropped shape, else the first one the page uses; for JSON-LD `image`). `bookForm()`: on `book/` the form title is `h1` and the four step titles `h2`; the drawer on home keeps `h2` / `h3`. |
| `final/src/pages/index.astro` | **Description** was the tagline alone (81 chars). Now the tagline + the welcome's lodge sentence + the rooms block's first sentence, all owner-written, cut at a sentence to 155: "Surf weeks for all levels on Sri Lanka's south coast, a few steps from the ocean. The lodge sits in the green of the jungle. There are just twelve rooms." (153; same as v1). **Title** unchanged: "Global Surf Lodge Kabalana \| Surf weeks in Sri Lanka" (52, brand first). **Removed** the 4g `og:image` (a relative path, `photos/gs2-hero-poster-full-1280.jpg`, which link previews do not read) and `og:title` = name only. **Added** via `seoHead`: preview `noindex, nofollow`, canonical, hreflang en + x-default, `og:type/site_name/title/description/url`, `og:image` (the hero poster JPEG, 1280×720, with its alt) and `twitter:card` (`summary_large_image` with an image, else `summary`). Every absolute URL only with `SITE_URL`. **JSON-LD:** one block at the end of `<body>`. |
| `final/src/pages/book/index.astro` | Title unchanged ("Book your week \| Global Surf Lodge Kabalana", 43). **Description** was the tagline (a duplicate of home's); now the v1 booking page's interface wording, 84 chars: "Choose your level, your room, your dates and guests. Prices from the booking engine." Same head tags as home (path `book/`, no og:image). **JSON-LD:** a `WebPage` whose `about` is the business (`@id` …`/#business` with `SITE_URL`, else name + type). |
| `final/src/styles/site.css` | Two selectors widened so the new heading levels render exactly as before: `.book h2.script` → `.book .script`, `.step h3` → `.step h3,.step h2`. |
| `final/src/pages/robots.txt.js` | New. Real domain: `User-agent: *` / `Allow: /` + `Sitemap:` (with `SITE_URL`). Preview: one refusal (`Disallow: /`), no sitemap line. Named AI-crawler groups are 4i's. |
| `final/src/pages/[sitemap].xml.js` | New. Built only with `SITE_URL` on a non-preview host. 2 URLs (home, `book/`), each with hreflang en. `lastmod` from `updatedAt` when the CMS has one (the seed has null, so none). |
| `final/audit.json` | Rewritten by the after measurement. |

Nothing written outside `sites/global-surf-adventures-v2/`. No content field and no copy changed.

## Structured data

**`["LodgingBusiness", "SportsActivityLocation"]`**, as v1. `businessType` is `surf_camp`: it sells the bed and the lessons (schemas/business-types.md). base.md names `SportsActivityLocation` for a school or camp; `LodgingBusiness` carries `checkinTime`, `checkoutTime` and `amenityFeature`. schema.org allows a multi-typed entity. Booking.com files it as Hostel and Google as a hotel; neither is the business's own word, so no sub-type.

| property | value | content field → dossier |
|---|---|---|
| `name` | Global Surf Lodge Kabalana | `businessName` → `business.name`. Google's name differs: "Still wrong" 2 |
| `description` | the meta description | `tagline`, `copyBlocks[intro]` ¶2 s1, `copyBlocks[about][1]` ¶1 s1 |
| `telephone` | +97299733943 | `contact.phone` → `contact.phone` (the business's site). Not Google's: "Still wrong" 2 |
| `email` | info@globalsurf.com | `contact.email` → `contact.email` |
| `address` | PostalAddress {streetAddress "Henewatta Addara Gederawata", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"} | `contact.address` → `location.address` (the Google listing, place names capitalised per playbook §6) |
| `geo` | 5.9810484, 80.3420635 | parsed from `contact.mapUrl`'s `!3d…!4d…` (the Google place pin) = dossier `location.lat_lng` |
| `hasMap` | the Google Maps place URL | `contact.mapUrl` → `location.map_url` |
| `priceRange` | "From USD 1,466 per person, 7 nights" | the lowest `lessons[].price` + `currency`, worded as the page prints it ("From $1,466 pp \| 7 nights") → `offers[0–2].price` (28 Sep 2026) |
| `checkinTime` / `checkoutTime` | 14:00 / 11:00 | `stayInfo.checkInFrom` / `.checkOutTo` |
| `amenityFeature` | 15 × LocationFeatureSpecification | `amenities[]` (label + note) |
| `sameAs` | Instagram @globalsurf_kabalana, the Booking.com listing | `gaps.json` `instagram.url` (SCHEMA GAP, the page's IG link) → `contact.instagram_profiles[1]`; `ratings[0].url` → `reviews.booking` |
| `openingHoursSpecification`, `knowsLanguage` | not emitted | the code is there; `openingHours[]` and `languagesSpoken[]` are empty |
| `@id`, `url`, `image` (17: poster + 16 photos[] rows) | only with `SITE_URL` | `heroVideoPoster`, `photos[]`, as WebP files the page serves |

14 keys on a preview build, 17 with `SITE_URL`.

**Validation.** No network validator was available. Every block parses with `JSON.parse` (1 per page). Properties checked against schema.org by reading (as v1). With `SITE_URL=https://example.test/`, all 17 `image` URLs and the `og:image` exist in the build output.

## Measured, before and after

"Before" is the 4g build, rebuilt at the start of this session (`npm run build`); it came out byte-identical to the `dist/` on disk (`diff -rq`) and was kept in scratch. Both measured with `tools/audit-mockup.mjs global-surf-adventures-v2 ../final` (390×844 phone, slow 4G, CPU ×4, first load, no scroll); the last four runs interleaved before/after.

| | before (4g) | after | target |
|---|---|---|---|
| HTML, home | 98 162 B | 100 859 B (+2 697: JSON-LD + head tags) | — |
| HTML, booking | 69 338 B | 70 110 B (+772) | — |
| First-load transfer, video excluded | 476 264 B (HTML + fonts 82 744 + images 295 358), 18 requests, all local | 478 961 B, 18 requests, all local | ≤ 1.5 MB |
| First-load transfer incl. the phone hero video the 3.5 s wait catches | 1 195 380 B | 1 198 077 B | — |
| JS, compressed | 7.7 KB, inline | unchanged (no JS touched) | ≤ 300 KB |
| Largest image | 88 458 B | same | ≤ 300 KB |
| **LCP** (ms, runs) | 448 / 436 / 452 / 456 / 436 | **452 / 464 / 468 / 452 / 448 / 448 / 452 / 448 / 460** (final `audit.json`: 460) | ≤ 2 500 |
| **CLS** (load) | 0.0061 | **0.0061** every run | < 0.1 |
| **Scroll CLS early / settled** | 0.0072 / 0, **once 0.013 / 0** (1 of 5 runs) | **0.0072 / 0 in 9 of 9 runs** | < 0.01 |
| Third-party on load | 0 | 0 | 0 |
| Tap targets < 44 px | 0 of 55 | 0 of 55 | — |
| Images without alt | 0 of 50 | 0 of 50 | — |
| h1 | home 1 ("Your surf week starts here"), **book/ 0** | home 1 (unchanged), **book/ 1 ("Book your week")** | 1 per page |
| JSON-LD / og:image / canonical | none / relative path / none | 1 block per page / absolute with `SITE_URL` / with `SITE_URL` | — |

The LCP spread (436–468 ms) is noise on both sides; this station made no performance gain or loss. The early scroll CLS: the 4g baseline went over 0.01 once (0.013) in five runs; the after build never did in nine. Its two shifts (0.0061 the hero button/title on font swap, 0.0011 the phone bar) are the 4g build's and untouched here. All figures are headless Chromium on this machine, no real phone.

## Look (no visible change)

- **Markup.** Home `<body>` is identical character for character to before once the ld+json script is stripped (67 841 = 67 841 chars). `book/` differs only in the five heading tags (h2 → h1, 4 × h3 → h2).
- **Pixels.** Full-page Playwright captures (every image forced eager and decoded, fonts ready, third parties blocked, animations disabled, reduced motion) of home, `book/` and home with the drawer open × 390×844 and 1440×900 × JS off / JS on: **10 of 10 PNGs byte-identical** before vs after. A control run (before vs before) is identical in all 10.
- I did not run `shoot.mjs`: nothing that renders changed. `clean-shots.mjs`: 0 files.

## Checks

| check | result |
|---|---|
| `npm run build` | clean; `dist/`: index.html, book/, fonts, photos, video, robots.txt (no sitemap: preview) |
| `npm test` (repo) | 40 / 40 pass |
| `ONESHOT_RUN=2026-10-globalsurf-03 node tools/check-wiring.mjs` | 16 agents, 0 failures, 2 warnings (stubs) |
| `check-design` home / `book/` | 0 problems, 0 warnings each (book/ h1 now Parisienne, the form's own script title) |
| `tools/funnel.mjs` over http | clicks_to_book 1, CTA above fold, 8 pages, 1 broken (`/book` without the slash → 404 on the local test server) — identical on the before build; Cloudflare's static assets redirect `/book` → `/book/` |
| NAP, page vs JSON-LD | footer `tel:+97299733943` = `telephone`; footer address "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" = the PostalAddress parts joined; "Open in Maps" = `hasMap` |
| no `SITE_URL` (the `dist/` left in place) | noindex both pages; robots.txt `Disallow: /`; no canonical, og:url, og:image or sitemap; JSON-LD 14 keys |
| `SITE_URL=https://global-surf-adventures-v2.os1.workers.dev/` (scratch outDir) | still noindex + `Disallow: /`, no sitemap. Canonical, hreflang en + x-default, og:url, og:image `…/photos/gs2-hero-poster-full-1280.jpg` 1280×720 + alt, `summary_large_image`; JSON-LD 17 keys |
| `SITE_URL=https://example.test/` (scratch outDir) | no noindex; robots.txt `Allow: /` + `Sitemap: https://example.test/sitemap.xml`; sitemap with 2 URLs + hreflang; canonical per page; `@id` `https://example.test/#business`, `book/` `about` → that `@id` |

## Still wrong, and what it would take

1. **The home h1 has neither the name nor the place.** It is the hero title "Your surf week starts here" (`gaps.json` `heroTitle`), as in v1, where this was put to Shahar and is still open (`notes/global-surf-adventures.md`). The header shows only the agency's GLOBALSURF logo (SVG, link `aria-label` "Global Surf Lodge Kabalana, home"); an h1 around it would carry no text, and I won't add hidden text. **For Shahar:** (a) a hero title with the name or the place (copy change, visible); (b) the logo link in an h1; (c) leave it. The title, `og:site_name` and JSON-LD `name` carry the exact name either way.
2. **NAP differs from Google in name and phone.** Google lists "Global Surf Lodge", phone +94770776747. The site uses "Global Surf Lodge Kabalana" and +97299733943 (the Israeli HQ line the business's own site publishes; copy/sources.md, passed 4c). Fix: `contact.phone` changed by the owner, and an `alternateNames[]` field (still only proposed).
3. **`sameAs` leaves out Facebook and YouTube.** The footer links them, but they are the agency's (Global SURF), not the lodge's. Tripadvisor is unverified and in no field.
4. **Schema gaps**, unchanged and only proposed: `socials[]` (sameAs reads `gaps.json`), `alternateNames[]`, `seo.title` / `seo.description` (home's "Surf weeks in Sri Lanka" and the `book/` description are template literals), a geo field (worked around via `contact.mapUrl`).
5. **12 of 44 home links have no text, only an `aria-label`:** 3 logo links ("Global Surf Lodge Kabalana, home"), 6 Instagram photo tiles ("See @globalsurf_kabalana on Instagram") and the 3 footer social icons. Every one has an accessible name; none points at a page of this site except the logo (`#top` / `./`). Left as they are: changing them touches rendered markup. (v1's three empty level-card anchors to `book/?level=…` do not exist in v2.)
6. **No favicon or lodge logo** (dossier `business.logo.note`: the only logo is the agency's).
7. **No production domain yet.** The deployer must build with `SITE_URL=https://<domain>/` (trailing slash). Without it, or on workers.dev, the build is a noindexed preview by design.

## Refused or omitted because the sources don't support it

- **`aggregateRating` / `review`:** omitted. `ratings[]` has Booking.com 8.6/10 (80, 28 Sep 2026), real, but Shahar's no-ratings-markup decision (KA) holds for every site since.
- **`alternateName` "Global Surf Lodge"**, **`brand` / `parentOrganization` "Global Surf Adventures"**: in the dossier, in no content field. Not hard-coded (base.md hard constraint 4).
- **`openingHoursSpecification`, `knowsLanguage`:** the fields are empty.
- **`numberOfRooms` (12), star rating:** only in copy prose / in no field.
- **Per-level `Offer`s, rooms, FAQ:** left to 4i, from the same fields.
- No category or superlative words added to the title or description beyond the owner's fields.
