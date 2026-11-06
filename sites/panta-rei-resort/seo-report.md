# Panta Rei Resort — SEO report (station 4h)

seo 0.2.2 · run `2026-11-lk-surf-01` (test, operator alon) · 2026-11-06 · site: `sites/panta-rei-resort/final/` (the 4g build of the picked interactive design, "Morning swim": one page)

The 4g build had no search plumbing: no robots meta, no canonical, no JSON-LD, no robots.txt, no sitemap. Its `og:image` was a relative URL, which link-preview scrapers reject. The `<title>` hard-coded "Kabalana, Ahangama" in the template, and the description was the tagline alone (97 characters).

This station copied the plumbing of `sites/coconut-surf-inn-guest-house-and-restaurant/final/`, which is the preview rule, `seoHead`, `businessLd`, robots and sitemap. It did not copy any design. It then fitted the plumbing to this business. **Nothing visible changed** (see "Look").

## What changed, and where

| file | change |
|---|---|
| `final/src/lib/site.mjs` | New SEO block, copied from coconut-surf-inn and adapted: <ul><li>the preview rule: `isPreviewUrl`, `SITE`, `IS_PREVIEW`, `abs`, `ROUTES = ['']`;</li><li>`TOWN` / `COUNTRY_NAME` from `contact.address`;</li><li>`TITLE`;</li><li>`metaDescription`, `sentences` and `HOME_DESCRIPTION`;</li><li>`postalAddress` and `pinFromMapUrl`;</li><li>`LD_TYPE`, where `beach_lodging` becomes `Resort` when the business's own name or tagline says "resort";</li><li>`ogImage`, `floorSize`, `businessLd`, `ldJson` and `seoHead`.</li></ul>Changes from the coconut-surf-inn version: <ul><li>`sameAs` also reads `socialLinks[]`;</li><li>`makesOffer` comes from `priceList[]`;</li><li>`HotelRoom.description` comes from `rooms[].note`;</li><li>`image` lists the hero poster, `photos[]` and `rooms[].photo`, each at its widest crop;</li><li>there is no `alternateName`, because Google's listing name equals `businessName`.</li></ul> |
| `final/src/pages/index.astro` | <ul><li>`<title>` is `TITLE`, read from content. It was hard-coded.</li><li>The description is `HOME_DESCRIPTION`. It was the tagline alone.</li><li>`noindex, nofollow` is added on a preview.</li><li>`seoHead` writes canonical, hreflang `en` + `x-default`, og:\* and twitter:card. It replaces the old og:title / og:description and the relative og:image.</li><li>One `application/ld+json` block sits at the end of body.</li></ul> |
| `final/src/pages/robots.txt.js` | **new.** On a preview it is one refusal: `Disallow: /`. On a real domain it is `Allow: /` plus a `Sitemap:` line. |
| `final/src/pages/[sitemap].xml.js` | **new.** Built only with SITE_URL on a real domain. It holds one URL with hreflang `en`, and `lastmod` only when `updatedAt` is set. |
| `final/scripts/seed-from-dossier.mjs` | New `listings()`, which writes `gaps.listings.sameAs` = the Tripadvisor URL from dossier `contact.socials.tripadvisor`. It fails unless the URL is entity d25364260. |
| `final/src/gaps/gaps.json` | Gains `listings` only. **I did not re-run the seed**, because it re-cuts the three video masters with ffmpeg. I evaluated the new `listings()` function on its own against the dossier and appended its output, which is what the seed writes. `content.json` is untouched. |
| `final/notes.md` | One row in "schema gaps" for `listings`. |

Nothing was written outside `sites/panta-rei-resort/`. No content field, copy, CSS, JS or visible markup changed. With `<head>` and the `ld+json` block removed, the 4g and 4h `index.html` files are **character-identical**. Inside `<head>`, everything except the title, description, robots, og:\* and twitter tags is identical too: preloads, fonts, CSS and script.

## Head (`en` only, one page)

| | before (4g) | after (4h) |
|---|---|---|
| `<title>` | Panta Rei Resort · Kabalana, Ahangama (37). "Kabalana, Ahangama" was hard-coded in the template | **Panta Rei Resort · Kabalana, Ahangama, Sri Lanka** (48) |
| description | the tagline, 97 characters | **150**: "A boutique resort set around a large pool in Kabalana, Ahangama, on the south coast of Sri Lanka. The waves of Kabalana, a short walk from the resort." |
| robots meta | none | `noindex, nofollow` on a preview |
| canonical / hreflang | none | with SITE_URL: canonical, hreflang `en` + `x-default` |
| og:title | "Panta Rei Resort, Kabalana" | the title |
| og:image | `photos/img-001-full-2000.webp`, **relative** (invalid) | with SITE_URL: the absolute URL of the same photo, 2000×1126, plus type, width, height and alt. `twitter:card` is `summary_large_image` |
| h1 | "Panta Rei, Kabalana" | unchanged (see "Still wrong" 1) |

Sources:
- **Title.**
  - `businessName`.
  - Then the place the `tagline` names when it ends in the address's town ("in Kabalana, Ahangama").
  - Then the address's country ("Sri Lanka").
  - If that runs over 60 characters, the shorter forms are used.
  - The brand comes first, because the brand query matters most (base.md §6). The country is there for travellers who search "Ahangama Sri Lanka".
- **Description.** `tagline`, then the first of these owner fields that still fits in 155 characters:
  1. the rooms block's first sentence (95 characters, which would make 193, so it is skipped);
  2. `spot` (fits: 150);
  3. `featureLine`.

## Structured data

**`Resort`**, a schema.org subtype of `LodgingBusiness`:
- `businessType` is `beach_lodging`.
- The business calls itself a resort in its name and in its tagline ("A boutique resort set around a large pool…").
- It sells rooms, a restaurant, classes and massages. It sells no lessons and no board hire, so there is no `SportsActivityLocation`.

| property | value | content field → dossier |
|---|---|---|
| `name` | Panta Rei Resort | `businessName` → `business.name` (the Google listing name) |
| `description` | the meta description | `tagline` + `spot` |
| `telephone` | +94728003022 | `contact.phone` → `contact.phone` (Google's `tel:` link) |
| `email` | hello@pantareiresort.com | `contact.email` → `contact.email` |
| `address` | PostalAddress {streetAddress "Back to Life Road, Kabalana Rd", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"} | `contact.address` → `location.address` (Google's words, place names capitalised, playbook §6) |
| `geo` | 5.9807381, 80.3497102 | read from the `!3d…!4d…` pin of `contact.mapUrl`, which equals `location.lat_lng` (the Google pin) |
| `hasMap` | the Google place URL | `contact.mapUrl` → `location.map_url` |
| `checkinTime` / `checkoutTime` | 14:00 / 11:00 | `stayInfo` → `stay_info.check_in` / `.check_out`. The 11:00 follows the dossier's resolution of the 11:00 vs 11:30 contradiction |
| `amenityFeature` | 16 × LocationFeatureSpecification | `amenities[]` → `facilities` |
| `containsPlace` | 4 × HotelRoom: Double 22 m² / 3, Triple 30 m² / 3, Family Villa 50 m² / 4, Suite with Private Pool 40 m² / 2. Each has bed, occupancy, floorSize and description | `rooms[]` → `room_types[]` |
| `makesOffer` | 8 × Offer: <ul><li>pool day pass 3,500 LKR;</li><li>fitness class 2,500 / 3,000 / 3,500 LKR;</li><li>each of the two massages at 20,000 LKR (60 min) and 17,000 LKR (45 min).</li></ul> | `priceList[]` → `offers[0–7]` |
| `sameAs` | <ul><li>Booking.com</li><li>Google</li><li>Instagram</li><li>Facebook</li><li>YouTube</li><li>**Tripadvisor**</li></ul> | `ratings[].url` → `reviews.*`; `socialLinks[]` → `contact.socials`; `gaps.listings` → `contact.socials.tripadvisor` |
| `@id`, `url`, `image` (12 files) | SITE_URL only | the WebP files the page serves (hero poster, `photos[]`, `rooms[].photo`) |

The block has 15 keys on a preview built without SITE_URL, and 18 with SITE_URL. `knowsLanguage` is omitted because `languagesSpoken` is empty: the dossier says staff languages are not stated.

**Validation.**
- **validator.schema.org** (the SITE_URL build's block, posted on its own): **0 errors, 0 warnings**, type `Resort`.
- `JSON.parse` succeeds, and `<` is escaped.
- In the `https://pantareiresort.example.com/` and `https://panta-rei-resort.os1.workers.dev/` builds, all 12 `image` URLs and the `og:image` exist in the output.

## Local signals (NAP)

- **Name.** "Panta Rei Resort" is in the `<title>`, `og:site_name`, JSON-LD `name` and the footer ©. That matches Google, character for character. The h1 reads "Panta Rei, Kabalana" (see "Still wrong" 1).
- **Address.** "Getting here" and the footer print `contact.address` = "Back to Life Road, Kabalana Rd, Ahangama 80650, Sri Lanka". That is Google's "back to life road, Kabalana Rd, Ahangama 80650, Sri Lanka", with only the place names capitalised. Joining the PostalAddress parts gives the same string.
- **Phone.** Every `tel:` link is `tel:+94728003022` (shown as +94 72 800 3022), and every WhatsApp link is `wa.me/94728003022`. Both equal `telephone` and Google's number.
- **Map.** "Open in Google Maps" links the Google listing. There is no map embed.

## Crawlability and the preview rule

| build | robots meta | robots.txt | sitemap.xml | canonical / og:image |
|---|---|---|---|---|
| no SITE_URL (**`dist/` now**) | `noindex, nofollow` | `Disallow: /` | none | none |
| `https://panta-rei-resort.os1.workers.dev/` (scratch outDir) | `noindex, nofollow` | `Disallow: /` | none | absolute, with summary_large_image |
| `https://pantareiresort.example.com/` (scratch outDir) | none | `Allow: /`, `Sitemap: https://pantareiresort.example.com/sitemap.xml` | 1 URL, hreflang en | canonical, hreflang en + x-default, og:url, og:image |

- There is one route and one locale. The internal links are the in-page anchors (Rooms, Restaurant, Fitness, Getting here).
- **For the deployer:**
  - Build the demo with `SITE_URL=https://panta-rei-resort.os1.workers.dev/`. Then the pitch link pasted into WhatsApp gets an absolute og:image, and it stays `noindex` and `Disallow: /`.
  - Without SITE_URL there is no og:image at all. Before 4h there was one, but it was relative and broken.

## Measured, before and after

**Method.**
- Profile: `tools/audit-mockup.mjs`'s first-load settings, run by a scratch script: 390×844 @2x, 1.6 Mbps / 150 ms / 4× CPU, cache off, no scroll, served over http.
- Before: the 4g `dist/`, copied aside. A rebuild of the 4g source first proved it byte-identical.
- After: the new `dist/`.

| | before (4g) | after (4h) | target |
|---|---|---|---|
| `index.html` | 84,139 B (21,183 gzip) | 89,521 B (22,455 gzip): +5.4 KB, mostly the JSON-LD | — |
| First-load transfer | 639,804 B, 12 requests, all local | **645,186 B**, 12 requests, all local | ≤ 1.5 MB |
| **LCP** (3 runs, ms) | 2152 / 2152 / 2144 | **2132 / 2144 / 2128** | ≤ 2,500 |
| **CLS** | 0 / 0 / 0 | **0 / 0 / 0** | < 0.1 |
| Third-party requests on load | 0 | 0 | 0 |

The LCP element is the hero poster `<img>` on both sides. The difference is noise.

The page already had the performance items of base.md §4, and this station did not touch them:
- the hero poster is preloaded per media query and set to `fetchpriority=high`;
- every `<img>` has width and height;
- below-the-fold images are `loading=lazy`;
- the two font families are self-hosted, preloaded and `swap`;
- there is no render-blocking script;
- videos attach after first paint or on scroll.

## Look (no visible change)

- **Markup.** The body is character-identical to 4g (checked above).
- **`tools/shoot.mjs`.** I ran `node tools/shoot.mjs sites/panta-rei-resort/final/dist/index.html --out sites/panta-rei-resort/final/shots`: 14 desktop and 16 mobile captures, the same page heights as 4g (11,209 / 12,086 px). I compared them pixel by pixel with a 4g set and a 4g control set shot the same way.
  - 26 of the 30 captures are identical to 4g.
  - The 4 that differ (desktop-00 and mobile-00, the hero; desktop-01, the Welcome clip; mobile-08, the fitness clip) differ only inside the `<video>` boxes. That is a different film frame. The text, buttons and photographs around the boxes are identical.
  - The file:// console errors (fonts and the logo mask blocked by CORS under `file://`) appear in the 4g set as well.
- **Stills without video.** These were full-page captures over http with reduced motion (posters, no video) and third parties blocked, at 1440 and 390, JS on and off.
  - 1440 and 390 with JS on, and 390 with JS off, are byte-identical (same sha256) to the 4g baseline. The 4g baseline was itself identical to a 4g control capture.
  - 1440 with JS off is the exception. The `loading=lazy` pool and fitness photos had loaded in the 4h capture and not in the 4g one. That is native lazy-loading timing on an unscrolled full-page capture, not markup: the body is identical, and both sides repeat their own result.
- **`tools/check-design.mjs`** on `dist/index.html`: ok, 0 problems, 0 warnings. Its temporary shots are deleted.

## Checks

| check | result |
|---|---|
| `npm run build` (no SITE_URL) | clean: 1 page, no warnings. `dist/` = index.html, robots.txt, fonts, photos, video. There is no sitemap (preview) |
| `diff -rq` 4g `dist/` vs new | `index.html` differs (head + JSON-LD) and `robots.txt` is new |
| SITE_URL builds (real domain, workers.dev) | see the crawlability table |
| JSON-LD | one block, validator.schema.org 0 / 0, every field traced above |
| one `<h1>` | yes |

## Still wrong, and what it would take

1. **The h1 is "Panta Rei, Kabalana", not "Panta Rei Resort".**
   - It is the concept's first-screen title (SCHEMA GAP `heroTitle`, concepts.md §6), and the human picked this design.
   - Changing it would change the first screen, so I left it. Hidden text would be the only other way, and that is ruled out.
   - The exact name is in the `<title>`, the JSON-LD and the footer.
   - For a later design round: the h1 could carry the full name, e.g. "Panta Rei Resort, Kabalana".
2. **The footer © line hard-codes ", Kabalana"** in the template (`© ${NAME}, Kabalana`). It is visible, so I did not change it.
   - Kabalana is also in the address ("Kabalana Rd") and in the tagline, so it is not a false fact.
   - It should be read from content when the template is next touched.
3. **The `<title>` and description have no field of their own.** Proposal A below would let the owner write, for example, "Panta Rei Resort · Boutique hotel in Kabalana, Sri Lanka", which is their own site's title.
4. **The restaurant is not its own entity.** It is a copy block plus `hoursNote`. It has no `Restaurant` with `openingHoursSpecification` and no menu, because the schema has no restaurant module (business-types.md "Open").
5. **Tripadvisor lives in `gaps.json`, not in the schema** (proposal C). It is seeded from the dossier, and the owner cannot edit it.
6. **No production domain yet.** canonical, og:url, og:image, the JSON-LD `@id` / `url` / `image` and the sitemap appear only with `SITE_URL`.
7. **og:image is WebP.** Older scrapers would need a JPEG, which would need a new shape in `scripts/photos.mjs`. None was made.
8. **No favicon.** The logo exists (img-023, white on transparent) but is drawn as a CSS mask. A favicon would need a recipe line in `scripts/photos.mjs`, which is a new media file, so it was not done here.

## Refused or omitted

- **`aggregateRating` / `review`: omitted.** base.md allows a platform-attributed rating, and the ratings are real: Booking.com 9.2/10 · 468 and Google 4.7/5 · 213, read 2026-11-06. But Shahar's no-ratings-markup decision (KA, applied to every site since; `sites/cheeky-monkey/final/src/lib/site.mjs`) still stands. The page shows both ratings visibly, with source and date.
- **The engine's self-reported "4.8/5 Google · 9.1/10 Booking · 4.5/5 Tripadvisor":** stale or unverified (dossier `reviews.self_reported_on_engine`). Not used anywhere.
- **`priceRange` and room rates:** rates are live inventory on the HolidayFuture engine ("Live prices are not content").
- **`numberOfRooms` (16):** `room_count` is in no content field. The copy says "16 bungalows", and that stays as text.
- **`knowsLanguage`:** `languagesSpoken` is empty, because staff languages are not published.
- **Agoda in `sameAs`:** the dossier has no listing URL.
- **The emergency phone, the massage WhatsApp (+7…) and `pantareiresort@gmail.com`:** none is a booking or NAP channel (dossier notes and contradictions).
- **"300 m from Kabalana Beach":** contradicted by other sources (dossier `contradictions[0]`). The page and the JSON-LD say only "a short walk", as the copy does.

## Schema proposals (diffs to `schemas/site-content.md`, not applied)

These are the same as in the coconut-surf-inn, lotus-surf-house and cheeky-monkey reports.

**A. Per-locale SEO head**
```diff
+| `seo.title` | text | no | **yes** | owner | ≤ 60; empty = "<businessName> · <place>, <country>" | `"Panta Rei Resort · Boutique hotel in Kabalana, Sri Lanka"` |
+| `seo.description` | text | no | **yes** | owner | ≤ 155; empty = the template's rule | |
+| `seo.image` | upload → `media` | no | no | owner | landscape ≥ 1200 px; empty = the template's rule | |
```
**C. `socialLinks[]` platforms.** Add `tripadvisor`, `google` and `website` to the select of the (now shared) `socialLinks[]`, so JSON-LD `sameAs` reads one owner-editable list and `gaps.listings` goes away.

**E. `rooms[].sizeM2`** (number). Today both the card and `floorSize` read the m² from the start of `rooms[].note`.

## Ledger note (`built → optimised`)

4h seo 0.2.2:
- Ported the finals' SEO plumbing: the preview rule (noindex, robots `Disallow: /`, no sitemap on a preview or workers.dev build), `seoHead`, sitemap, robots and one `Resort` JSON-LD block (validator.schema.org 0/0). The JSON-LD has the Google NAP, the geo pin, 4 rooms, 16 amenities, 8 offers and 6 `sameAs` (Tripadvisor via `gaps.listings`).
- The title is read from content (48 characters). The description grew from 97 to 150 characters. The broken relative og:image is replaced by an absolute one when SITE_URL is set.
- There is no `aggregateRating` (Shahar's decision). The h1 "Panta Rei, Kabalana" is unchanged (design).
- Results: LCP 2132/2144/2128 ms (was 2152/2152/2144), CLS 0, first load 645,186 B (+5.4 KB), 0 third-party, check-design ok, and the body markup is unchanged.
