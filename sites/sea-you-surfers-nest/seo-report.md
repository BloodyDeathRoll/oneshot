# Sea You Surfers Nest — SEO report (station 4h)

seo 0.2.2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-25 · site: `sites/sea-you-surfers-nest/final/` (the 4g build, commit c1a2a35, one page)

Unlike Lotus and Cheeky Monkey, this 4g build carried no search plumbing: it had a `<title>`, a description and the IS_PREVIEW `noindex` meta, but no Open Graph or Twitter tags, no JSON-LD, no robots.txt and no sitemap route. This station ported that plumbing from `sites/lotus-surf-house/final/` (the same code, so the preview rule and the head are identical across the run's finals), and fitted the JSON-LD to this business: a `BedAndBreakfast` with 7 rooms, **no telephone** (the number is read off the sign photograph and unconfirmed) and **no price**. Nothing visible changed (see "Look").

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | Added the SEO plumbing, as in Lotus: `AI_CRAWLERS`, `abs`, `ROUTES`, `metaDescription`, `postalAddress`, `pinFromMapUrl`, `LD_TYPE`, `ogImage`, `businessLd`, `ldJson`, `seoHead`. New here: `pageTitle()` (the title rule with the ≤ 60 guard, moved out of the page), `ldType()` (the lodging sub-type, read from the hero's type line, below), `numberOfRooms` from the SCHEMA GAP `houseCount`, and `sameAs` taking the `bookingLinks[]` URLs as well as `ratings[].url`. `telephone` is emitted only when `TEL` is set, and `TEL` stays null while `TEL_CONFIRMED = false` (unchanged). The IS_PREVIEW rule is unchanged. |
| `final/src/pages/index.astro` | Title from `pageTitle()` (same output). Description through `metaDescription` (same two owner fields, same output, now guarded to 155 at a sentence boundary). The `seoHead` tags after the description. One `application/ld+json` block at the end of `<body>`. |
| `final/src/pages/robots.txt.js` | **New**, a copy of Lotus's (the run's shared file): `Disallow: /` for `*` and every named AI crawler on a preview; `Allow: /` and a `Sitemap:` line on a real domain. |
| `final/src/pages/[sitemap].xml.js` | **New**, a copy of Lotus's: built only with SITE_URL on a real domain. One URL, hreflang `en`, no invented `lastmod` (the seed's `updatedAt` is null). |
| `final/audit.json` | The last after-run of `audit-mockup` (it is the file the tool writes). |

Nothing was written outside `sites/sea-you-surfers-nest/`. No content field, gaps value, copy, CSS, JS or visible markup changed. llms.txt is not added here: it is 4i's (aiseo), as on Cheeky Monkey. **Note for 4i:** Lotus's `llms.txt.js` prints `c.contact.phone` directly; on this site it must print the phone only when `TEL` is set, or the unconfirmed number leaks.

## Head, per page and locale (one page, `en` only)

| | value | length | source |
|---|---|---|---|
| `<title>` | Sea You Surfers Nest, Midigama | 30 | `businessName` + the town of `contact.address` (the other finals' rule; the 4g output, unchanged) |
| description | A bed and breakfast in Midigama, on Sri Lanka’s south coast. Live dates are on Booking.com, and groups can rent the whole house on Airbnb. | 138 | `tagline` + `closing` (owner fields, passed copy; unchanged from 4g) |
| h1 | "Sea You Surfers Nest" (brand first) | — | `businessName`. The "what and where" is the next line, `<p class="where">` "Bed and breakfast \| Midigama, Sri Lanka" |
| og:title / og:description / og:site_name | same as title / description / name | — | **new** |
| og:image (SITE_URL only) | `photos/img-003-graded-r0.563-wide-1400.webp`, 1400×788, alt "A mint-green table with a potted pothos and two mint chairs on the upstairs balcony, coconut palm fronds…" | — | **new**; rule: the first `photos[]` slot shown that is landscape and ≥ 1200 px wide. That is the hero, the picture the link should open on |
| twitter:card | `summary_large_image` with SITE_URL, else `summary` | — | **new** |
| canonical, hreflang `en` + `x-default`, og:url | SITE_URL | — | **new**; none on a preview |
| robots meta | `noindex, nofollow` on a preview only | — | IS_PREVIEW (4g, kept) |

## Structured data

**`BedAndBreakfast`** (a schema.org sub-type of `LodgingBusiness`). `businessType` is `beach_lodging`: the business sells double rooms and offers no lessons (dossier `businessType_why`), so `LD_TYPE` gives `LodgingBusiness`. The sub-type comes from the type line the hero already prints, gaps `typeLine` "Bed and breakfast" ← dossier `business.google_category` "Bed & breakfast" (Google), and the owner-field tagline says the same ("A bed and breakfast in Midigama…"). `ldType()` maps only a line that names the sub-type (`bed and breakfast` / `bed & breakfast` → `BedAndBreakfast`, `hostel` → `Hostel`); any other line keeps `LodgingBusiness`, so an owner who rewrites the line cannot produce a wrong type. On Lotus no sub-type was added because the platforms disagreed and no field held one; here a displayed field does, and no source contradicts it.

| property | value | content field → dossier |
|---|---|---|
| `name` | Sea You Surfers Nest | `businessName` → `business.name` (the Google listing name) |
| `description` | the meta description | `tagline` + `closing` |
| `address` | PostalAddress {streetAddress "151 Weliwaththa Rd", postalCode "80650", addressLocality "Midigama", addressCountry "LK"} | `contact.address` → `location.address` (Google's words, character for character; Booking's 81700 / Kumbalgama is in `contradictions`, resolved to Google) |
| `geo` | 5.9621402, 80.3974064 | the pin in `contact.mapUrl` (`!3d…!4d…`) = `location.lat_lng` (the Google pin) |
| `hasMap` | the Google Maps place URL | `contact.mapUrl` → `location.map_url` |
| `checkoutTime` | 10:00 | `stayInfo.checkOutTo` → `stay_info.check_out` (Booking and Agoda agree; the page prints 06:00–10:00) |
| `numberOfRooms` | 7 | gaps `houseCount.rooms` → `room_count` (the owner on Airbnb: "one A/C room & Six Non A/C rooms") — the page prints "7 rooms, all doubles" |
| `amenityFeature` | 8 × LocationFeatureSpecification (Free WiFi (in public areas), Fan and mosquito net, Free toiletries, Kitchen, Free private parking on site, Airport shuttle (additional charge), Laundry (additional charge), Security cameras outside) | `amenities[]` → `facilities`. **No air conditioning** anywhere in the JSON-LD: only one of the seven rooms has it (dossier `contradictions`: "never 'air-conditioned rooms'"), and the page says so in the copy |
| `knowsLanguage` | ["en"] | `languagesSpoken` |
| `containsPlace` | 2 × HotelRoom: Deluxe Double Room and Standard Double Room, each "1 large double bed", occupancy max 2 | `rooms[]` → `room_types[0–1]`. No `amenityFeature` per room, so the Deluxe room's Booking "air conditioning" line is not carried |
| `sameAs` | the Google listing, the Booking.com listing, the two Airbnb listings (room, whole house) | `ratings[].url` + `bookingLinks[].url` → `reviews.*.source_url`, `booking.engine_url`, `booking.other_engines` |
| `@id`, `url`, `image` (24 photo files) | SITE_URL only | the WebP files the page shows |

Preview build: 13 keys. With SITE_URL: 16. **Not emitted:**
- `telephone`: the only number (+94715880052) was read off the sign in a photo and is published as text nowhere (dossier `gaps[0]`, `human_decision: true`); `TEL_CONFIRMED = false`. It appears when the owner confirms it at station 8 and `TEL_CONFIRMED` is set, with no other change.
- `priceRange` / `makesOffer`: the business publishes no price; rates are live OTA inventory.
- `checkinTime`: Booking says 14:00–18:00 and Airbnb "after 15:00" (dossier `contradictions`, resolution "none"); `stayInfo.checkInFrom` is null.
- `aggregateRating` / `review`: see "Refused".
- `openingHoursSpecification`: a B&B publishes no opening hours; `openingHours[]` is empty.

**Validation.** No network validator was used. There is one block per page, and it parses with `JSON.parse`. Its `<` characters are escaped. I checked the properties against schema.org by reading them (`numberOfRooms`, `checkoutTime`, `amenityFeature`, `containsPlace` are valid on `LodgingBusiness` and so on `BedAndBreakfast`). With `SITE_URL=https://example.com/` (built into a scratch outDir), all 24 `image` URLs and the `og:image` exist in the build output.

## Local signals (NAP)

- **Name.** The header wordmark, the h1, the phone bar, the footer and the JSON-LD `name` all read "Sea You Surfers Nest", Google's listing name.
- **Address.** "Finding the house" and the footer print `contact.address`, "151 Weliwaththa Rd, Midigama 80650, Sri Lanka" (3 occurrences in the HTML). That is the PostalAddress parts joined, and Google's address exactly.
- **Phone.** None, on purpose: 0 `tel:` links and 0 occurrences of the number in `dist/` (HTML, robots.txt) and in the JSON-LD. The Google listing has no phone either ("Add place's phone number"), so site and listing agree.
- **Map.** "Google Maps" links the Google listing. There is no map embed, so nothing blocks rendering. `geo` is the Google pin.

## Crawlability and the preview rule

| build | robots meta | robots.txt | sitemap.xml | canonical / og:image |
|---|---|---|---|---|
| no SITE_URL (**`dist/` now**) | `noindex, nofollow` | `Disallow: /` for `*` and for every named AI crawler | none | none |
| `https://sea-you.example.workers.dev/` | `noindex, nofollow` | `Disallow: /` | none | — |
| `https://example.com/` (scratch outDir) | none | `Allow: /`, the AI-crawler group `Allow: /`, `Sitemap: https://example.com/sitemap.xml` | 1 URL (`https://example.com/`) + hreflang en | canonical, hreflang en + x-default, og:url, og:image all absolute |

Before this station the preview `dist/` had no robots.txt at all, so a crawler that ignored the meta tag had nothing telling it to stay out; now it has. One route, one locale, no orphan pages. The internal links are the skip link and four in-page anchors (Rooms, Courtyard, Guests, Finding the house) with descriptive text.

## Measured, before and after

Method: `tools/audit-mockup.mjs sea-you-surfers-nest ../final`, run three times on the 4g `dist/` (copied aside first) and three times on the new preview `dist/`. The profile is a throttled phone, 390×844, 1.6 Mbps / 150 ms / 4× CPU, first load with no scroll. The tool's server port is hard-coded to 8980, which was in use, so it was run from a scratch copy that differs only in the port (and absolute import paths); the measurement code is the same.

| | before (4g) | after | target |
|---|---|---|---|
| HTML file | 75,196 B (19,226 gzip -9) | 77,776 B (19,830 gzip -9): +2,580 B: the JSON-LD block 2,177 B, the og/twitter tags 402 B, one space | — |
| First-load transfer, no video | 523,670 B, 15 requests, all local | **526,250 B**, 15 requests, all local (images 402,894 B and fonts 45,580 B unchanged) | ≤ 1.5 MB |
| **LCP** (3 runs, ms) | 1232 / 1396 / 1816 (median 1396) | **1352 / 1352 / 1808** (median 1352) | ≤ 2,500 |
| **CLS** (load) | 0.0026 ×3 | **0.0026 ×3** | < 0.1 |
| Scroll CLS early / settled | 0.0053, 0.0026, 0.0027 / 0 | 0.0053, 0.0026, 0.0026 / 0 | < 0.01 |
| Largest image above the fold | 50,232 B | 50,232 B | ≤ 300 KB |
| Third-party requests on load | 0 | 0 | 0 |
| Images without alt | 0 of 25 | 0 of 25 | 0 |
| Tap targets under 44 px | 0 | 0 | 0 |
| Heading order | H1 H2 H3 H2 H3 H3 H3 H2 H2 H2 H2 H2 | same | one h1, no skips |

The machine was loaded: the third run was the slow one on both sides (1816 / 1808 ms), so the spread is the machine, not the page. On the medians this station made no measurable gain or loss (1396 → 1352 ms, inside the run-to-run noise); 4g's own median was 1392. The 2.6 KB the HTML grew is ≈ 0.6 KB gzipped, and the JSON-LD sits after the last script, so nothing on the critical path changed. `final/audit.json` is the median after-run (LCP 1352 ms).

The image and font handling was already what base.md asks for, so I left it as it was:
- every `<img>` (25) has `width` and `height`; 24 are `loading="lazy"`, and the hero is eager with `fetchpriority="high"` and preloaded per viewport (`imagesrcset` wide ≥ 768 px, the tall crop below);
- the fonts are self-hosted with `font-display: swap`. They are deliberately **not** preloaded: 4g measured the hero at 1644 ms with font preloads and 992 ms without (`notes.md`), and that holds;
- CSS and JS are inline (no request); there is no render-blocking third-party script.

## Look (no visible change)

- **Markup.** Once the new `og:` / `twitter:` meta tags and the `ld+json` block are removed, the before and after `index.html` differ by one whitespace character between the last `</script>` and `</body>`, which renders nothing. The tags added to the head are all `<meta>` / `<link>`, which do not render.
- **Pixels.** Playwright full-page captures with reduced motion, lazy images forced eager and fonts ready, at 390 and 1440, JS on and off, two captures per build, hashed in memory, none written (scratch script `pix.mjs`).
  - 390 / JS off: byte-identical before vs after (all four captures one hash).
  - 390 / JS on and 1440 / JS off: the before build flips between hashes against itself (the control); each after hash equals a before hash, so no change shows.
  - 1440 / JS on: no two captures match, before against before included. Counted in pixels (`pix2.mjs`, sharp): both pages are 1440×8127 (the 4g height); rows 0–1604 (the hero, the glance and "Who's coming?") are identical in every capture; before vs before differs by 1,588,478 px in rows 1605–5352, after vs after by 1,435,663 px, and before vs after by 283,188–436,003 px, all inside that same band (the slideshows, momentum shelf and quote row, whose JS state varies per load). No change outside the control's own noise.
- `tools/check-design.mjs sites/sea-you-surfers-nest/final/dist/index.html --no-shots`: **ok**, 0 problems, 0 warnings, the same as at 4g. Details: h1 Courgette, h2/body Plus Jakarta Sans, ground `#FFFFFF`, 0 all-caps labels, 0/12 labelled headings. (Run from a scratch copy that differs only in the port, 8960 being in use.)

## Checks

| check | result |
|---|---|
| `npm run build` (final, no SITE_URL) | **pass**. `dist/`: index.html, robots.txt (new), fonts, palms, photos. No sitemap, because this is a preview |
| `SITE_URL=https://example.com/ npx astro build --outDir <scratch>` | pass: sitemap.xml with 1 URL, robots `Allow: /` + Sitemap, canonical / hreflang / og:url / og:image absolute, JSON-LD 16 keys, all 24 image URLs exist |
| `SITE_URL=https://sea-you.example.workers.dev/ … --outDir <scratch>` | pass: `noindex, nofollow`, robots `Disallow: /`, no sitemap |
| JSON-LD | 1 block, `JSON.parse` ok, `@type` BedAndBreakfast, **no `telephone`, no `priceRange`, no `aggregateRating`**, no air-conditioning claim |
| Phone | `tel:` 0 and "715880052" 0 across `dist/` |
| Prices | none in the page, the head or the JSON-LD |
| `diff -rq` 4g `dist/` vs new `dist/` | `index.html` differs (head tags + JSON-LD only, above); robots.txt is new; every photo, font and palm file identical |
| `tools/audit-mockup.mjs` (port-only scratch copy) | the numbers above, 3 + 3 runs |
| `tools/check-design.mjs … --no-shots` (port-only scratch copy) | ok, 0 / 0 |
| Pixels | no visible change (above) |

## Still wrong, and what it would take

1. **No phone anywhere, including the Google listing.** The one number is on the sign in a photograph. Until the owner confirms it, the site has no `telephone` and no call button, and neither does Google. The fix is the owner's: confirm the number, add it to the Google listing (which is unclaimed: no phone, no website), then set `TEL_CONFIRMED` at station 8. That one switch puts it in the JSON-LD and on the page. This is a pitch point.
2. **The Google listing is unclaimed and has no website.** Once the site has a domain, the listing's "website" field is the strongest brand-query link there is. Claiming the listing is the owner's step.
3. **The h1 is the name only.** "Bed and breakfast | Midigama, Sri Lanka" is the next line, `<p class="where">`. That is the right order for the brand query (base.md §6), and the title and description carry the category words. Folding the type line into the h1 would restyle the hero (h1 is `.hand` Courgette), so it was not done.
4. **The title has no category word.** "Sea You Surfers Nest, Midigama" (30) follows the house rule; "bed and breakfast" is in the description. A per-locale `seo.title` (proposal A) would let the owner write "Sea You Surfers Nest, Midigama | Bed and breakfast" without a hard-coded string.
5. **`typeLine` and `houseCount` live in `gaps.json`.** The JSON-LD sub-type and `numberOfRooms` read them, as the page does. When the schema gets `typeLine` and `stayInfo.roomCount` (4g's proposals, `notes.md` "schema gaps"), only the two reads in `site.mjs` move.
6. **`sameAs` is listings only.** The business has no Instagram, Facebook or Tripadvisor (dossier `gaps`); Agoda is a Booking-fed listing and is in no content field, so it was not added.
7. **No production domain yet.** Canonical, og:url, og:image, the JSON-LD `@id` / `url` / `image` and the sitemap appear only with `SITE_URL=https://<domain>/`. On the `workers.dev` preview, link previews show no image (`twitter:card` falls back to `summary`). That is correct for a noindexed preview.
8. **og:image is WebP and graded.** WhatsApp, Facebook and X read WebP. It is the hero upload with its fronds graded (the 4g recipe), the picture the page opens on. A JPEG rendition for older scrapers would be a new media file made by a new shape in `scripts/photos.mjs`; none was made.
9. **No favicon.** The dossier has the sign's logo only inside a photograph, not as a file.
10. **Check-in time.** Booking and Airbnb disagree (14:00 vs after 15:00), so neither the page nor the JSON-LD states it. The owner settles it.

## Refused or omitted because the sources don't support it (or a decision forbids it)

- **`telephone`, any `tel:` link:** the number is unconfirmed (above; the coordinator's standing instruction for this site).
- **`priceRange`, `makesOffer`, any price:** none published; OTA rates are live inventory (dossier `gaps`: "no price published by the business").
- **`aggregateRating` / `review`:** omitted. `ratings[]` holds Google 4.9/5 (11), Booking.com 8.0/10 (8) and Airbnb 5.0/5 (10), all real and dated 2026-11-21. Shahar's no-ratings-markup decision (KA), applied to every site since, holds here too. Agoda's 8.8 is Booking's 8 reviews re-scored and is never shown.
- **"Air-conditioned" anything:** one room of seven has AC (the owner's words); no `amenityFeature` or room property says otherwise.
- **`alternateName`:** the sign reads "Sea You – The Surfers Nest – Midigama", Booking "Sea You Surfers Nest! Hello to waves in a minute walk", Airbnb "Sea You Surfer's Nest". These are in no content field (base.md hard constraint 4; proposal B).
- **A distance to the beach:** the sources give 91 m to 500 m (dossier `contradictions`); the page quotes the listing's own words in `spot`, and no metre figure was put in the head or JSON-LD.
- **"Surf" claims:** no lessons or rentals are sold (surf rental is an add-on a guest mentions), so no `SportsActivityLocation` and no surf wording beyond the name.
- `checkinTime`, `email` (none published), `openingHoursSpecification`.

## Schema proposals (diffs to `schemas/site-content.md`, not applied)

The same as Lotus's, Cheeky Monkey's, KA's and The Lavish Haven's reports; repeated because this site needs them too. D is not needed here: the owner's `contact.mapUrl` carries the Google pin.

**A. Per-locale SEO head**

```diff
+| `seo.title` | text | no | **yes** | owner | ≤ 60; the page's `<title>`; empty = "<businessName>, <town>" | `"Sea You Surfers Nest, Midigama \| Bed and breakfast"` |
+| `seo.description` | text | no | **yes** | owner | ≤ 155; empty = the template's rule | |
+| `seo.image` | upload → `media` | no | no | owner | landscape ≥ 1200 px; empty = the template's rule | |
```

**B. Other names**

```diff
+| `alternateNames[]` | array (≤ 4) of text ≤ 80 | no | – | deployer (dossier listings) / owner | JSON-LD `alternateName` only, never shown | `["Sea You – The Surfers Nest"]` |
```

**C. `socialLinks[]` as a shared module.** Move the v0.11 brand module's `socialLinks[]` (platform select + `https://` URL) to "Shared modules", with `website`, `tripadvisor` and `google` added to the select. JSON-LD `sameAs` reads it. No new field shape.

## Ledger note (`built → optimised`)

4h seo 0.2.2: ported the search plumbing (seoHead, businessLd, robots.txt, sitemap route) from lotus-surf-house/final; JSON-LD `BedAndBreakfast` (from the hero's type line, Google's category) with Google's address, the Google pin, checkoutTime 10:00, numberOfRooms 7, 8 amenities, 2 HotelRooms and 4 listings in sameAs; no telephone (unconfirmed, TEL_CONFIRMED false), no priceRange, no rating markup. Title and description unchanged (30 / 138 chars); og/twitter tags added; preview rule kept (noindex, robots `Disallow: /`, no sitemap). LCP median 1352 ms (was 1396), CLS 0.0026 (was 0.0026), first load 526,250 B (+2,580), check-design ok, no visible change.
