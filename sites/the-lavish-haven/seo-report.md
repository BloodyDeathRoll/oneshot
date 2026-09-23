# The Lavish Haven — SEO report (station 4h)

seo 0.2.0 · run `2026-09-ahangama-02` · 2026-09-23 · site: `sites/the-lavish-haven/final/` (the 4g build, the gold page)

Nothing visible changed. Proof under "Look": 0 differing pixels in frozen full-page captures at three widths × two modes, and every element has the same box and computed style.

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/index.astro` | **h1.** Before, the page's h1 was the hero display headline (the tagline "A new hotel, two minutes from Kabalana"), which does not contain the business name. Now the only `<h1>` is the name in the bar: `<h1><a class="name" href="#top">The Lavish Haven</a></h1>`. The tagline is `<p class="display">` with the same three `<span>` lines. **Title** unchanged from 4g: "The Lavish Haven, Ahangama" (26 chars; KA's rule, `<name>, <town>` with the town parsed from `contact.address`), now with a fallback to the name alone above 60 chars. **Description** unchanged: tagline + intro's first sentence + rooms heading, 136 chars. **Added:** `hreflang` en + x-default, canonical, `og:url`, `og:image` (+ width, height, alt) only with `SITE_URL`; `og:type/site_name/title/description` and `twitter:card` summary always. **JSON-LD**: one block, escaped (`<` → `\u003c`), at the **end of `<body>`** (measured below: in the head it costs ~40 ms of LCP, at the end ~15 ms). |
| `final/src/lib/site.mjs` | New: `LD_TYPE` (businessType → schema.org type; `beach_lodging` → `Hotel` for this site) and `MAP_PIN` (SCHEMA GAP, see geo). |
| `final/src/styles/site.css` | The three `.hero-copy h1 span` selectors now read `.hero-copy .display span` (same declarations). One new rule at the end: `.bar h1{display:contents;font:inherit}`, so the h1 has no box and the link stays the bar's flex item with its own size, weight and 44 px tap padding. Commented at each line. |
| `final/scripts/seed-from-dossier.mjs` | Layday's pin check: the seed stops if `MAP_PIN` and dossier `location.lat_lng` disagree at 5 decimals. Re-ran the seed: `content.json` and `media/` byte-identical. |
| `final/shots/seo/` | `shoot.mjs` captures of the new build. |
| `final/audit.json` | Rewritten by the audit (2026-09-23T09:45:48Z). |

No change to robots.txt, sitemap.xml, the preview rule or llms.txt: 4g carried them over from KA/Layday. Verified below. Nothing written outside `sites/the-lavish-haven/`.

## Structured data

**`Hotel`** (a `LodgingBusiness`): `businessType` is `beach_lodging`, and dossier `business.type.note` says Booking.com files it as "Hotel" (17 rooms, restaurant, pool). The schema has no lodging sub-type field, so the sub-type is set in this site's `LD_TYPE`. That is a per-site choice, stated here as base.md hard constraint 3 asks.

| property | value | content field → dossier |
|---|---|---|
| `name` | The Lavish Haven | `businessName` → `business.name` (Booking.com). Google's name differs: see "Still wrong" 1 |
| `description` | the meta description | `tagline`, `copyBlocks[intro]` ¶1 s1, `copyBlocks[offer][0].heading` (copy/sources.md) |
| `telephone` | +94764832988 | `contact.phone` → `contact.phone` (Google Maps) |
| `address` | PostalAddress {streetAddress "No166/1 Walhengoda Road", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"} | `contact.address` → `location.address` (Google listing, place names capitalised per playbook §6) |
| `geo` | 5.97946, 80.35083 | **SCHEMA GAP `MAP_PIN`** ← `location.lat_lng` 5.9794565, 80.3508299 (Google place URL `!3d/!4d`, 2026-09-23) |
| `hasMap` | Google Maps search URL | `contact.mapUrl` → `location.map_url` |
| `amenityFeature` | 25 × LocationFeatureSpecification {name, value: true} | `amenities[]` (the same 25 rows as the page) → `facilities[]` |
| `sameAs` | Booking.com, Agoda | `bookingLinks[]` → `booking.engine_url`, `other_engines[0]` |
| `@id`, `url`, `image` (10) | only with `SITE_URL` | `photos[]` |

10 keys on a preview build, 13 with `SITE_URL`. **geo check:** I encoded the pin myself: 5.9794565, 80.3508299 → plus code `6MQ2X9H2+Q8`. That is the "X9H2+Q8" on Google's listing (`location.plus_code`). The rounded pin and Booking.com's pin fall in the same cell. The encoder was cross-checked on Layday's pin (→ X9H3+93, as its report says).

**Validation.** No network validator was available. The block parses with `JSON.parse` (1 block). I checked the properties against schema.org by reading: `amenityFeature` belongs to LodgingBusiness, `hasMap` to Place, `geo`/`address`/`telephone` to Place/LocalBusiness, and `addressCountry` takes ISO alpha-2. Every value traces to content.json except `geo` (a schema gap, checked against the dossier by the seed).

**Left to 4i:** `containsPlace` (the nine room types) and FAQ data, as in KA/Layday's split.

## Measured, before and after

"Before" is the 4g build, rebuilt at the start of this session and copied to scratch. "After" is the final `dist/`. Both were measured with `tools/audit-mockup.mjs` (mobile, slow 4G, CPU ×4, first load, no scroll), run from a scratch copy on port 8760 because the tool hard-codes 8980. Runs were interleaved.

| | before | after | target (playbook §4) |
|---|---|---|---|
| HTML | 53 264 B | 57 201 B (+3 937: JSON-LD ~3.1 KB, head tags ~0.9 KB) | — |
| First-load transfer | 581 530 B, 12 requests | 585 467 B, 12 requests, all local | ≤ 1.5 MB |
| JS as files / fonts / largest image | 0 / 26 576 B, 1 family / 122 396 B | same | — |
| **LCP** (runs) | 396 / 396 / 380 / 388 / 388 / 392 / 384 / 396 / 388 / 380 ms | **416 / 404 / 404 / 412 / 400 / 412 / 412 / 408 / 400 / 412 ms** (final `audit.json`: 404) | ≤ 2.5 s |
| **CLS** | 0 | **0** | < 0.1 |
| Third-party on load | 0 | 0 | 0 |
| Tap targets < 44 px | 0 of 18 | 0 of 18 | 0 |
| Headings | H1 (tagline) + 8 H2 (one is the drawer's) + 3 H3 | H1 (name) + 8 H2 + 3 H3 | — |
| JSON-LD / og / hreflang | none / none / none | 10 keys (13 with `SITE_URL`) / og:* + twitter:card / with `SITE_URL` | — |

JSON-LD placement (same interleaved series): **in `<head>` 440 / 432 / 432 / 436 ms**, at the end of `<body>` 412 / 400 / 412 / 412 ms, head tags only (no JSON-LD) 396 / 400 / 408 ms. So the end of the body is the right place. What is left (about +15 ms median) is the extra bytes, far inside the 2.5 s budget. All figures come from headless Chromium on this machine. No real phone was used.

## Look (no visible change)

- **Element and pixel diff** (a Playwright script in scratch; before and after served on 8761/8762; third parties blocked; images forced loaded; CSS animations frozen at t=0, because the swell SVG animates even without JS and made a control run of before-vs-before differ). Covers 1440×900, 390×844 (dpr 2) and 1920×1080, each with JS off and with JS on + reduced motion. **All 245 elements have identical boxes (0.1 px) and computed font size/weight/line height/letter spacing/colour/margin/padding/max-width/display/family/opacity/transform. The only differences are the new bar `<h1>` and the headline's tag, h1 → p. Full-page pixel diff: 0 px in all 6** (1440×8787, 780×18890, 1920×9214). The control run (before vs before) is also 0 in all 6.
- **With motion on** (JS, WebGL, no reduced motion; 1440 and 390, scroll 0 and 300, after the intro animation): the bar and hero-copy elements (17) have identical boxes, opacity and transform, and the bar strip's pixels are identical.
- **shoot.mjs** `final/shots/seo/` vs the before build (scratch): same page heights (desktop 10 273, phone 11 389) and capture counts (13 / 15), `errors []`. 19 of 28 captures differ by 0.00 %. The 9 that differ are the hero frames with the live WebGL water and the swell animation. A before-vs-before control shoot differs in the same frames by the same amounts (up to 27 %), so this is animation, not change.
- **Accessibility tree:** `heading "The Lavish Haven" [level=1]` is exposed with `display:contents` (Chromium). The h2s and h3s are unchanged.

## Checks

| check | result |
|---|---|
| `npm run build` | clean. `dist/`: fonts, index.html, llms.txt, photos, robots.txt (no sitemap: preview build) |
| `check-design.mjs … --no-shots` (scratch copy, port 8763) | ok, 0 problems, 0 warnings; h1/h2/body "Jost", labelled headings 0/12 |
| h1 | exactly 1: "The Lavish Haven" |
| NAP on page vs JSON-LD | phone `+94764832988` in 2 `tel:` links and the JSON-LD (= dossier `contact.phone`, source Google). The address in the footer is identical to the JSON-LD parts joined. Google Maps link on the page + `hasMap` |
| no `SITE_URL` (the `dist/` left in place) | `noindex, nofollow`; robots.txt `Disallow: /` for `*` and the named AI bots; no canonical, no sitemap |
| `SITE_URL=https://the-lavish-haven.os1.workers.dev/` (throwaway outDir) | noindex **plus** canonical, hreflang en + x-default, og:url, og:image `…/photos/img-002-1024.jpg` 1024×768 + alt; JSON-LD 13 keys; robots.txt still the refusal; no sitemap; llms.txt carries the preview line |
| `SITE_URL=https://example.test/` (throwaway outDir) | no noindex; canonical, hreflang, og:*; JSON-LD `@id` `https://example.test/#business`, 10 images; robots.txt `Allow: /` + AI groups + sitemap line; one-URL `sitemap.xml` with hreflang en |

Throwaway builds went to scratch. The real `dist/` is the plain preview build. All servers on 8760–8763 were stopped.

## Still wrong, and what it would take

1. **The name is not Google's.** Google lists "The Lavish Haven Hotel And Resort". The site, the copy and the JSON-LD use Booking.com's "The Lavish Haven" (copy/sources.md row `businessName`, passed 4c). The phone matches Google exactly. The address is Google's words with the place names capitalised (playbook §6 refinement 2). **For Shahar:** keep the short name (as with KA, where the name stayed by decision), or have an `alternateNames[]` field carry Google's form into JSON-LD `alternateName`. That field is still only proposed (KA/Layday reports).
2. **House number 166/1 (Google) vs 166/2 (Booking.com's JSON-LD)**, the copyeditor's open item. The site follows Google, as playbook §6 says.
3. **`hasMap` / "Open in Google Maps" point at a Google *search* URL** (`location.map_url`, whose `@5.9794134,80.350836` is a viewport centre). The dossier has the listing's own place URL (with its CID) in `location.address.source_url`. A place URL ties the site to the listing more directly. Changing `contact.mapUrl` means changing the seed's content and dossier `map_url`, which is not this station's call. **Recommendation for Shahar / the harvester.**
4. **`sameAs` lacks Tripadvisor and the Google listing.** Both are in the dossier (`booking.other_engines[1]`, `contact.socials`), but the only content field that reaches `sameAs` is `bookingLinks[]`, and the seed puts only Booking.com and Agoda there. `socials[]` is the proposed schema field (same gap as KA/Layday).
5. **Schema gaps**, unchanged and still only proposed: `contact.geo` (here `MAP_PIN`, guarded by the seed), `seo.title` / `seo.description`, `socials[]`, `alternateNames[]`, and now a lodging sub-type (Hotel / Hostel / Resort) so `LD_TYPE` need not be per site.
6. **The h1 is the name only.** base.md asks for "the business name and what it is". "Hotel" is in the tagline, which is the display headline far below the bar. Joining them would move type, so I kept the look.
7. **The display headline is a `<p>` now.** Screen readers announce the name as the heading and the big headline as a paragraph. This is intended (KA/Layday's pattern); the critic should know.
8. **og:image** is the 1024×768 night print (4:3), not a 1200×630 crop. `twitter:card` is `summary` accordingly.
9. **No favicon or logo.** No sourced mark exists (same as KA/Layday).
10. **No production domain yet.** The deployer must build production with `SITE_URL=https://<domain>/`. Without it the build is a noindexed preview.

## Refused or omitted because the sources don't support it

- **`aggregateRating` / `review`:** omitted. `ratings[]` has Booking.com 9.2/10 (34) and Google 5.0/5 (21), both real. But Shahar decided on no ratings markup for KA, and it was applied to Layday. I applied the same decision here.
- **`checkinTime` / `checkoutTime`:** `stayInfo` times are null (dossier gap "no check-in/check-out times published").
- **`openingHoursSpecification`:** `openingHours[]` is empty. A hotel's 24-hour front desk is an amenity row, not opening hours.
- **`priceRange`:** no prices (the rates are live OTA inventory; dossier `gaps[]`).
- **`numberOfRooms`:** "17 rooms" is in dossier `businessType_note` only, not in content. No field carries it.
- **`knowsLanguage`, `email`:** `languagesSpoken` is empty and `contact.email` is null. The template emits them only when they are set.
- **No category or superlative words** added to the title or description beyond what the content says ("A new hotel…" is the owner's tagline).
