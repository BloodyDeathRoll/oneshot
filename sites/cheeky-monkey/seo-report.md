# Cheeky Monkey Surf Camp — SEO report (station 4h)

seo 0.2.2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-03 · site: `sites/cheeky-monkey/final/` (the 4g build, one page)

The 4g build had no SEO plumbing. It had a 69-char title, the tagline as its description, and no canonical, Open Graph image, JSON-LD, robots.txt or sitemap. Its h1 read "Cheeky MonkeySurf Camp | …" in text, because there was no space between the two parts of the wordmark. This station adds the plumbing in the site's own template. Nothing visible changed (see "Look").

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | New section "SEO plumbing (station 4h)": `SITE` / `abs` (absolute URLs only with `SITE_URL`), `ROUTES` (`['']`), `metaDescription`, `postalAddress`, `pinFromMapUrl`, `LD_TYPE`, `priceRange`, `ogImage`, `pageImages`, `businessLd`, `ldJson`, `seoHead`. The code is the same as in the pipeline's other finals (`sites/global-surf-adventures-v2/final`), minus the preview/noindex rule (see "Still wrong" 1). |
| `final/src/pages/index.astro` | The description now goes through `metaDescription`. Head tags come from `seoHead`: `og:type/site_name/title/description`, `twitter:card`, and, with `SITE_URL` only, canonical, hreflang `en` + `x-default`, `og:url` and `og:image` (+ type, size, alt). One JSON-LD block sits before the page's JSON data script. In the h1, a space between `<b>Cheeky Monkey</b>` and `<span>Surf Camp \| Midigama, Sri Lanka</span>`. `.mark` is a flex column, so that whitespace does not render. |
| `final/src/pages/robots.txt.js` | New. `User-agent: *` / `Allow: /`, plus `Sitemap: <SITE_URL>sitemap.xml` when the build has `SITE_URL`. No noindex and no Disallow: the deployer handles previews (as briefed). Named AI-crawler groups are left to 4i. |
| `final/src/pages/[sitemap].xml.js` | New. Built only with `SITE_URL`, because the protocol needs absolute URLs. It lists 1 URL (home) with hreflang `en`. `lastmod` comes from `updatedAt` when the CMS has one; the seed has null, so there is no `lastmod`. |
| `final/src/gaps/gaps.json` + `final/scripts/seed-from-dossier.mjs` | `seo.title` (SCHEMA GAP) shortened from 69 to **58** chars, in both files so a re-seed keeps it: "Cheeky Monkey Surf Camp, Midigama \| Rooms, lessons, boards". It is built from `businessName`, the town, and the rooms, lessons and boards in the tagline (dossier `room_types`, `lessons`, `rentals`). |

Nothing was written outside `sites/cheeky-monkey/`. No content field and no copy changed.

## Head, per page and locale (one page, `en` only)

| | value | length | source |
|---|---|---|---|
| `<title>` | Cheeky Monkey Surf Camp, Midigama \| Rooms, lessons, boards | 58 | `businessName` + `gaps.place` town + tagline facts |
| description | Surf shop, rooms and lessons on the main road in Midigama, with 400 boards to rent. | 84 | `tagline` (owner field). The next owner sentence (spot, 77 chars) would push it to 162, so it is left out. |
| h1 | "Cheeky Monkey Surf Camp \| Midigama, Sri Lanka" (text), brand first | — | wordmark = `businessName` split by `gaps.wordmark`, + `gaps.place` |
| og:image | `photos/img-103-r0.667-1400.webp`, 1400×933, alt "A surfer in a Cheeky Monkey vest holding a yellow fish board, looking at the waves" | — | rule: the first `photos[]` row the page shows in a landscape shape ≥ 1200 px wide. The hero poster is 9:16 and would be cropped to a sliver in a WhatsApp preview |
| canonical / hreflang en + x-default / og:url | `SITE_URL` | — | none without `SITE_URL` (a relative canonical would be ambiguous between the preview and the real domain) |

## Structured data

**`["LodgingBusiness", "SportsActivityLocation"]`.** `businessType` is `surf_camp`: the business sells beds (5 room types) and lessons (`vertical/business-types.md`). base.md names `SportsActivityLocation` for a school or camp. `LodgingBusiness` carries `checkinTime`, `checkoutTime` and `amenityFeature`. schema.org allows an entity with more than one type. The table is the same as in the other finals. Google files the business as a "3-star hotel" and Facebook as a "Hotel resort". Neither is the owner's own word ("Your Surf and Yoga Camp in Midigama"), so no sub-type was added.

| property | value | content field → dossier |
|---|---|---|
| `name` | Cheeky Monkey Surf Camp | `businessName` → `business.name` (Booking.com). Google says "Cheeky Monkey": see "Still wrong" 2 |
| `description` | the meta description | `tagline` |
| `telephone` | +94719248686 | `contact.phone` → `contact.phone` (the Google listing, character for character) |
| `email` | cheekymonkeymidi@gmail.com | `contact.email` → `contact.email` |
| `address` | PostalAddress {streetAddress "Galle - Matara Main Road, Midigama East Midigama", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"} | `contact.address` → `location.address` (the Google listing, playbook §6 form) |
| `geo` | 5.9617986, 80.3967609 | parsed from `contact.mapUrl` `!3d…!4d…` (the Google pin) = dossier `location.lat_lng` |
| `hasMap` | the Google Maps place URL | `contact.mapUrl` → `location.map_url` |
| `priceRange` | "USD 20–400 (prices published 2021)" | every priced `priceList[]` + `lessons[]` row (lesson USD 20 … week USD 400). The year comes from the rows' notes and `gaps.lessonPriceYear`, as the page dates them |
| `checkinTime` / `checkoutTime` | 14:00 / 11:00 | `stayInfo.checkInFrom` / `.checkOutTo` |
| `amenityFeature` | 16 × LocationFeatureSpecification | `amenities[]` (label + note) |
| `knowsLanguage` | ["en"] | `languagesSpoken` |
| `sameAs` | the owner's site, Instagram, Facebook, the Google listing, the Booking.com listing | `gaps.socials` (SCHEMA GAP; the same links the footer shows) → `contact.socials`; `ratings[].url` → `reviews.google`, `reviews.booking` |
| `@id`, `url`, `image` (26: poster + 25 `photos[]` files) | only with `SITE_URL` | `heroVideoPoster`, `photos[]`, the WebP files the page serves |

That is 15 keys on a build without `SITE_URL` and 18 with it. `openingHoursSpecification` is in the code but not emitted, because `openingHours[]` is empty.

**Validation.** No network validator was used. The block parses with `JSON.parse` (1 per page) and its `<` characters are escaped. Properties were checked against schema.org by reading. With `SITE_URL=https://example.test/` (built into a scratch outDir), all 26 `image` URLs and the `og:image` exist in the build output.

## Local signals (NAP)

- Name: the footer wordmark and the h1 say "Cheeky Monkey" + "Surf Camp" = JSON-LD `name`.
- Address: the footer and "Getting here" print `contact.address` = the PostalAddress parts joined (the street, "Midigama East Midigama", "Ahangama 80650", "Sri Lanka").
- Phone: `tel:+94719248686` (shown as +94 71 924 8686) = `telephone` = Google.
- Map: "Open in Maps" links the Google listing (`hasMap`). There is no map embed, so nothing can block rendering.

## Measured, before and after

Method: `npx astro preview --port 8960` on `final/dist`, then a Playwright script (scratch) with the same profile as `tools/audit-mockup.mjs`: 390×844 at DPR 2, slow 4G (1.6 Mbps, 150 ms), CPU ×4, cache off, first load with no scroll, and a 3.5 s settle. "Before" is the 4g build, rebuilt at the start of this session. It came out byte-identical to the `dist/` on disk (`diff -rq`). The server was stopped afterwards.

| | before (4g) | after | target |
|---|---|---|---|
| HTML | 98,438 B (25,750 gzip) | 101,511 B (26,272 gzip): +3,073 B, JSON-LD + head tags | — |
| First-load transfer, video excluded | 397,348 B, 7 requests, all local | **400,421 B**, 7 requests, all local | ≤ 1.5 MB |
| **LCP** (5 runs, ms) | 848 / 984 / 1004 / 956 / 952 | **924 / 928 / 956 / 988 / 988** | ≤ 2,500 |
| **CLS** | 0 (every run) | **0** (every run) | < 0.1 |
| LCP element | the hero poster `<img>` (720 px WebP, 75.6 KB, preloaded) | same | — |
| Third-party requests on load | 0 | 0 | 0 |

The LCP spread is noise on both sides. This station made no performance gain or loss, and none was needed: the 4g build was already well inside every budget line. I left the image handling as it was. Every below-the-fold `<img>` already has width/height and `loading="lazy"`. The hero is eager with `fetchpriority="high"` and preloaded. Fonts are self-hosted and preloaded. There is no render-blocking script. Adding `srcset` tiers would change which pixels are drawn, and the brief was no visual change.

## Look (no visible change)

- **Markup.** The `<body>` is identical character for character to the 4g build once two things are removed: the ld+json script, and the single space added in the h1.
- **Pixels.** Full-page Playwright captures were taken with reduced motion, video blocked, lazy images forced eager and fonts ready. Before vs after, the PNGs are **byte-identical** at 390 (JS on, drawer open, JS off) and 1440 (JS on, drawer open). At 1440 with JS off, the capture is not stable even before vs before (the control differs). The "after" hash of one run equals the "before" hash of the next, so that case shows no change either. The h1 bounding box is identical in every case. All captures were deleted.

## Checks

| check | result |
|---|---|
| `npm run build` (final, no `SITE_URL`) | **pass**. `dist/`: index.html, robots.txt, atmo, fonts, photos, video (no sitemap: no `SITE_URL`) |
| `SITE_URL=https://example.test/ astro build --outDir <scratch>` | robots `Allow: /` + `Sitemap: https://example.test/sitemap.xml`; sitemap with 1 URL + hreflang; canonical, hreflang en + x-default, og:url, og:image absolute, `summary_large_image`; JSON-LD 18 keys, `@id` `https://example.test/#business` |
| `tools/check-design.mjs …/dist/index.html` | 0 problems, 0 warnings |
| `npm test` (repo) | 57 / 58. The one failure is `tools/test/live.test.mjs` (heartbeat events), unrelated to this site |
| `ONESHOT_RUN=2026-10-midigama-01 node tools/check-wiring.mjs` | 17 agents, 0 failures, 4 warnings (stubs) |

## Still wrong, and what it would take

1. **There is no preview rule in this build.** As briefed, I added no noindex. `deployer/base.md` station 6, however, says "the site's preview rule gives noindex, robots `Disallow`, no sitemap", and it checks for all three. This build always says `Allow: /` and carries no robots meta, though without `SITE_URL` it emits no sitemap. **Station 6 must add the noindex meta and `Disallow: /` itself**, or this site needs the `IS_PREVIEW` rule the other finals carry (`sites/global-surf-adventures-v2/final/src/lib/site.mjs`). That rule is a few lines and is not added here. **Decision for Alon/Shahar.**
   **Resolved after the station (orchestrator, 2026-11-03):** the `IS_PREVIEW` rule of the other finals is now in `final/src/lib/site.mjs`; a preview build (no `SITE_URL`, or a workers.dev / localhost one) carries `<meta name="robots" content="noindex, nofollow">`, robots.txt `Disallow: /` and no sitemap; a real-domain build is unchanged (checked with `SITE_URL=https://example.com/`: no noindex, `Allow: /`, sitemap.xml). The brief to this station was wrong to leave it out.
2. **The name differs from Google's.** Google lists "Cheeky Monkey". The site uses "Cheeky Monkey Surf Camp" (Booking.com's name). The shop also has its own Google listing, "Baba's surfshop/Cheeky monky midigama guesthouse" (3.2/5, 11 reviews). Its title, h1 and JSON-LD all *begin* with "Cheeky Monkey", so a brand search matches. An `alternateName` would tie the listings together, but no field holds it (proposal B).
3. **The brand query has a third competitor: the owner's own site**, cheekymonkeymidigama.com. It is in `sameAs` here. If the new site goes live on a different domain, the old site should redirect to it or link to it, or the two will split the brand query. That is a decision for the deployer and the owner at station 8.
4. **No production domain yet.** Canonical, og:url, og:image, the JSON-LD `@id` / `url` / `image` and the sitemap appear only when the build has `SITE_URL=https://<domain>/` (with a trailing slash). Without it, link previews show no image (`twitter:card` falls back to `summary`).
5. **og:image is WebP.** WhatsApp, Facebook, LinkedIn and X read WebP. Some older scrapers want JPEG, and a JPEG rendition would be a new media file. It would need an added shape in `scripts/photos.mjs` (the committed recipe); none was made.
6. **No favicon.** The dossier has no logo file. The wordmark is type, not an image.
7. **No opening hours in JSON-LD.** `openingHours[]` is empty, because the sources contradict each other: Facebook says "Always open" and "closed for low season", and the Instagram bio says "Surf shop 7am-6pm". It needs the owner.
8. **Every price is dated 2021**, and `priceRange` says so. An engine may still show "USD 20–400" without the year. The owner must confirm prices before go-live (playbook §7).

## Refused or omitted because the sources don't support it (or a decision forbids it)

- **`aggregateRating` / `review`:** omitted. `ratings[]` has Google 4.5/5 (467) and Booking.com 8.3/10 (45), both real, but Shahar's no-ratings-markup decision (KA) holds for every site.
- **`alternateName` "Cheeky Monkey" / "Baba's Surf Shop"**, **`founder` Baba**, **`foundingDate` 2009**, **`numberOfRooms` 10:** these are in the dossier or the copy prose but in no content field, so they were not hard-coded (base.md hard constraint 4).
- **Tripadvisor in `sameAs`:** the dossier's id comes from a link on the Google listing, and Tripadvisor itself returned 403 (unverified). It is in no content field either.
- **Facebook's "$$" price range** and its "Hotel resort" category: not the business's own words, and in no field.
- **`openingHoursSpecification`:** the field is empty (see "Still wrong" 7).
- **`makesOffer` / `containsPlace` (packages, lessons, rooms) and llms.txt:** left to 4i, from the same fields.
- No category or superlative words were added to the title or description beyond what the owner's fields say.

## Schema proposals (diffs to `schemas/site-content.md`, not applied)

**A. Per-locale SEO head** (closes notes.md schema gap 11; candidate listed under "Not in v0.1"):

```diff
+| `seo.title` | text | no | **yes** | owner | ≤ 60; the page's `<title>`; empty = the template builds it from `businessName` + the town | `"Cheeky Monkey Surf Camp, Midigama \| Rooms, lessons, boards"` |
+| `seo.description` | text | no | **yes** | owner | ≤ 155; empty = `tagline` | |
+| `seo.image` | upload → `media` | no | no | owner | image only, landscape ≥ 1200 px; the link-preview image; empty = the template's rule | |
```

**B. Other names** (Google's listing name differs from the site's):

```diff
+| `alternateNames[]` | array (≤ 4) of text ≤ 80 | no | – | deployer (from the dossier's listings) / owner | names the business is listed under elsewhere; JSON-LD `alternateName` only, never shown as a heading | `["Cheeky Monkey", "Baba's Surf Shop"]` |
```

**C. `socialLinks[]` as a shared module** (today it exists only among the v0.11 brand modules). This surf camp's website, Instagram and Facebook live in `gaps.socials`, and the JSON-LD `sameAs` reads them from there (notes.md gap 8). The diff moves the existing `socialLinks[]` rows (platform select + `https://` URL) from "v0.11 — brand modules" to "Shared modules", with `website` added to the platform select. No new field.

**D. Geo** (optional; it works today through `contact.mapUrl`'s Google pin):

```diff
+| `contact.geo` | group { `lat`: number −90..90, `lng`: number −180..180 } | no | no | deployer (dossier `location.lat_lng`) / owner | used for JSON-LD `geo` when `contact.mapUrl` carries no pin | `{ "lat": 5.9617986, "lng": 80.3967609 }` |
```
