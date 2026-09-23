# Layday Surf Ahangama — SEO report (station 4h)

seo 0.2.0 · run `2026-09-ahangama-02` · 2026-09-23 · site: `sites/layday-surf-ahangama/final/` (the 4g build, "Inside")

Nothing visible changed. The proof is under "Look": 0 differing pixels in full-page captures at three widths, and every element has the same box and computed style.

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/index.astro` | **h1.** Before, the h1 was the hero display headline, "A two-minute walk from Kabalana", which does not contain the business name. Now the page's only `<h1>` is the name in the top line: `<h1 class="name">Layday Surf Ahangama</h1>` (it was a `<span>`). The display headline is now `<p class="hl" id="h-intro">`, so the section's `aria-labelledby` still resolves. **Title:** was the name alone (20 chars). It is now brand first, then the intro heading: "Layday Surf Ahangama · A two-minute walk from Kabalana" (54 chars). The rule: use `"<name>, <town>"` when the name does not contain the town (KA's rule). This name already contains "Ahangama", so the second half is `intro.heading` if the whole title fits in 60 chars. Otherwise the title is the name alone. **Meta description:** was the tagline alone (40 chars). It is now tagline + intro heading + the intro's first sentence, cut at a sentence boundary to fit 155: "Surf, chill and feel at home in Ahangama. A two-minute walk from Kabalana. Small, new, and about as close to the wave as you can sleep." (135 chars). **Added:** `hreflang` en + x-default, `og:type/site_name/title/description`, plus `og:url` and `og:image` (with width, height and alt) only when `SITE_URL` is set, and `twitter:card` summary. **JSON-LD** (below) is one block, escaped (`<` → `<`), and placed **at the end of `<body>`**. It was in `<head>` at first, and there the extra ~3 KB before first paint measurably cost about 30 ms of LCP (400/408/408/420/412 ms vs 376–388). At the end of the body the cost is back inside the jitter. |
| `final/src/lib/site.mjs` | New: `LD_TYPE` (businessType → schema.org type). `MAP_PIN` (SCHEMA GAP, see geo below). `postalAddress()`: KA's helper, extended so that it also splits "street, town, country" with no postcode, but only when it recognises the country. It never adds a part. `metaDescription()`: KA's. |
| `final/src/styles/site.css` | The two `h1{…}` rules are now `.hl{…}`, with the same declarations. `.top .name` already sets size and weight, and `*{margin:0}` covers margins, so the new h1 renders exactly as the span did. There is a comment at each changed line. |
| `final/shots/seo/` | `shoot.mjs` captures of the new build. |
| `final/audit.json` | Rewritten by the audit. |

No change to robots.txt, sitemap.xml, the preview rule or llms.txt. The 4g port already carried them over from KA, and they are verified below. Nothing outside `final/` changed apart from this report. The template needed no per-site override.

## Structured data: type and fields

**`Hostel`**: `businessType` is `beach_lodging`, the business sells beds in a single dormitory, and Booking.com files it as "Hostel" (dossier `business.type.note`).

| property | value | content field → dossier |
|---|---|---|
| `name` | Layday Surf Ahangama | `businessName` → `business.name` (= Google's listing name, candidates.json) |
| `description` | the meta description | `tagline`, `copyBlocks[intro]` heading + first sentence → `business.tagline`, `location.distance_to_beach` (copy/sources.md) |
| `telephone` | +94778553343 | `contact.phone` → `contact.phone` (source: Google Maps) |
| `address` | PostalAddress {streetAddress "'Warnagiri' Welhengoda", addressLocality "Ahangama", addressCountry "LK"} | `contact.address` → `location.address` (Hostelworld form) |
| `geo` | 5.97846, 80.35265 | **SCHEMA GAP `MAP_PIN`**, explained below |
| `hasMap` | the Google Maps URL | `contact.mapUrl` → `location.map_url` |
| `checkinTime` / `checkoutTime` | 14:00 / 14:00 | `stayInfo.checkInFrom` / `.checkOutTo` → `stayInfo` |
| `amenityFeature` | 19 × LocationFeatureSpecification {name, value: true} | `amenities[]` (the same 19 rows as on the page) → `facilities[]` |
| `knowsLanguage` | ["en"] | `languagesSpoken` → `languages_spoken` |
| `sameAs` | Hostelworld, Booking.com, Agoda | `bookingLinks[]` → `booking.engine_url`, `other_engines` |
| `@id`, `url`, `image` (10) | only with `SITE_URL` | `photos[]` |

**geo.** The dossier's `location.lat_lng` is a gap. Its note says "the scout recorded the pin only in candidates.json". I took the pin from `reports/2026-09-ahangama-02/candidates.json`: evidence "pin 5.9784609,80.3526536" from Google Maps on 2026-09-19. I encoded it myself: it gives plus code `6MQ2X9H3+93`, the same "X9H3+93" that is in Google's own address line. Booking.com's pin (5.9784743, 80.352641) encodes to the same cell. The `@5.9794134,80.350836` in `contact.mapUrl` is the centre of the search viewport (`X9H2+Q8`), not the pin, so I did not use it. The pin is rounded to 5 decimals (about 1 m).

**Validation.** No network validator was available. The block parses with `JSON.parse` (1 block, 13 keys; 16 with `SITE_URL`). I checked the properties against schema.org by reading, the same way as for KA: `checkinTime`/`checkoutTime` and `amenityFeature` belong to LodgingBusiness, `hasMap` to Place, `knowsLanguage` to Organization, and `addressCountry` takes an ISO alpha-2 code. Every property belongs to the type, and every field has a content source.

**Left to 4i:** `containsPlace` (the room list) and FAQ data, as in KA's split.

## Measured before and after

"Before" is the 4g build, rebuilt at the start of this session and copied to scratch. "After" is the final `dist/`. Both were measured with `tools/audit-mockup.mjs` (mobile, slow 4G, first load, no scroll) in the same session. It ran from a scratch copy on port 8752, because the tool hard-codes 8980. The runs were interleaved to cancel drift.

| | before | after | target (playbook §4) |
|---|---|---|---|
| HTML | 56 996 B | 60 456 B (+3 460: JSON-LD ~2.9 KB, the head tags ~0.6 KB) | — |
| First-load transfer | 178 278 B, 6 requests | 181 738 B, 6 requests, all local | ≤ 1.5 MB |
| JS as files | 0 | 0 | ≤ 300 KB |
| Fonts | 27 752 B, 1 family | same | ≤ 2, ≤ 150 KB |
| Largest image on first load | 28 408 B | same | ≤ 200 KB |
| **LCP** (runs) | 376 / 380 / 388 / 376 / 376 ms | **392 / 384 / 380 ms** (final `audit.json`: 380) | ≤ 2.5 s |
| **CLS** | 0 | **0** | < 0.1 |
| Third-party on load | 0 | 0 | 0 |
| Headings | H1 (the display headline) + 5 H2 + 1 H3 | H1 (the name) + 5 H2 + 1 H3 | — |
| `<title>` / description | 20 / 40 chars | 54 / 135 chars | ≤ 60 / ≤ 155 |
| JSON-LD | none | 13 keys (16 with `SITE_URL`) | parses |
| og / hreflang | none / none | og:* + twitter:card; hreflang, og:url and og:image with `SITE_URL` | — |

All figures come from headless Chromium on this machine with the audit's throttling. No real phone was used.

## Look (no visible change)

- **Element and pixel diff** (a Playwright script in scratch; the before and after dists served on 8754 and 8755; Rosa blocked in both so it doesn't add noise). It covers 1440×900, 390×844 and 1920×1080, each with JS off and with reduced motion. It checks all 236 elements' boxes (to 0.1 px) and their font size, weight, line height, letter spacing, colour, margin, max-width, display and family. **The only differences in all 6 runs are the two tag names:** span→H1 (the name) and H1→P, class "" → `hl` (the headline). **Full-page pixel diff: 0 px differ in all 6** (1440×9064, 390×10340, 1920×9158).
- **shoot.mjs** `final/shots/seo/` compared with the same tool's shots of the before build (scratch). Page heights match (desktop 9 334, phone 10 657), and so do the capture counts (12 / 14). Pixels differing (channel delta > 8): **0.00 % on 25 of 26 captures**. The exception is desktop-07 at 8.96 %, in the box x 648…1067, y 621…899. That box is Rosa's widget: it had loaded in the after shoot and was still blank in the before shoot (I compared the crops side by side). The rest of that frame is identical.

## Checks

| check | result |
|---|---|
| `npm run build` | clean, 0 warnings. `dist/`: fonts, index.html, llms.txt, photos, robots.txt (no sitemap: preview build) |
| `check-design.mjs … --no-shots` (scratch copy, port 8753) | ok, 0 problems, 0 warnings; h1/h2/body "Urbanist", labelled headings 0/7 |
| h1 | exactly 1: "Layday Surf Ahangama" |
| NAP on the page vs JSON-LD | phone `+94778553343` in 6 `tel:` links and in the JSON-LD. Address string identical in "Practicalities", the footer and the JSON-LD parts. Google Maps link ×2 on the page + `hasMap` |
| no `SITE_URL` (the `dist/` left in place) | `noindex, nofollow` meta; robots.txt `Disallow: /` for `*` and the 15 named AI bots; no canonical, no sitemap |
| `SITE_URL=https://layday-surf-ahangama.os1.workers.dev/` (throwaway outDir) | noindex meta **plus** canonical, hreflang en + x-default, og:url, og:image `…/photos/img-018-1024.jpg` 1024×768 + alt; JSON-LD 16 keys; robots.txt still the preview refusal; no sitemap; llms.txt carries the preview line |
| `SITE_URL=https://example.test/` (throwaway outDir) | no noindex; canonical, hreflang, og:*; JSON-LD `@id` `https://example.test/#business`, 10 images; robots.txt allow-all + AI group + `Sitemap: https://example.test/sitemap.xml`; one-URL `sitemap.xml` with hreflang en |

The throwaway builds went to scratch and were deleted afterwards. I rebuilt the real `dist/` last, with no `SITE_URL`.

## Still wrong, and what it would take

1. **The address on the site is not character for character Google's.** Google has "Warnagiri welhengoda, Ahangama 80650, Sri Lanka" (candidates.json, Google place page). The site and the dossier's `location.address.value` have the Hostelworld form "'Warnagiri' Welhengoda, Ahangama, Sri Lanka": quotes, different casing and no postcode. The name and the phone match Google exactly. The address is copy that passed 4c, so this station did not change it. **For Shahar:** keep it as is (with KA you said casing doesn't matter, but here the postcode is missing too), or have the seed use "'Warnagiri' Welhengoda, Ahangama 80650, Sri Lanka". `postalAddress()` already parses "Ahangama 80650" into locality + postalCode, so the JSON-LD would gain `postalCode` with no template change.
2. **Schema gaps**, the same ones as KA's report and still only proposed: `contact.geo` (now a `MAP_PIN` constant), `seo.title` / `seo.description`, `socials[]`, `alternateNames[]`. `alternateNames[]` matters here: Hostelworld writes "Lay Day Surf Ahangama" (dossier `business.name.note`), and someone searching that spelling gets no `alternateName` to match.
3. **The h1 is the name only.** base.md asks for "the business name and what it is". The name already says "Surf" and "Ahangama". The tagline sits in the hero, too far from the top line to join the h1 without moving it. I won't add hidden text.
4. **The display headline is a `<p>` now.** Screen readers announce "Layday Surf Ahangama" as the heading and the big headline as a paragraph. This is intended (it is KA's pattern), but the critic should know.
5. **The map link text is "Open the map"** (×2). It's fine for SEO. KA's build says "Open in Google Maps". Changing it would change visible wording, so I only mention it.
6. **The spot `<h2>` is 119 chars.** It is a valid heading, just long. Shortening it would change copy. This is a recommendation only.
7. **There is no favicon or logo.** `/favicon.ico` returns 404, and there is no sourced mark to use. Same as KA.
8. **No production domain yet.** The deployer must build production with `SITE_URL=https://<domain>/`. A build without it is a noindexed preview.

## Refused or omitted because the sources don't support it

- **`aggregateRating` / `review`:** omitted. `ratings[]` has real scores: Hostelworld 9.8/10 from 10 reviews, Booking.com 10/10 from 6, Google 5.0/5 from 15. But they are third-party scores. For KA, Shahar decided on no ratings markup, and I applied the same decision here. That is my assumption, since the decision was about KA.
- **`openingHoursSpecification`:** `openingHours[]` is empty. "Reception has limited hours" is prose only.
- **`priceRange`:** there are no prices (the rates are live OTA inventory; dossier `gaps[]`).
- **`numberOfRooms` / bed count:** the room note says "bed count is not published consistently".
- **No category words** such as "hostel" or "best …" in the title or description. The content does not use them, and the type is carried by the JSON-LD.
