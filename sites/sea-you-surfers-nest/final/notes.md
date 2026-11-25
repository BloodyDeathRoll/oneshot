# Sea You Surfers Nest: final site (4g), "In the palms"

Station 4g · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-23/25.

The source is `mockups/interactive` (round 3), picked by Alon at gate b: "i like the interactive one" (ledger e73a5a9).

## What was built

The site is one Astro project (astro 7.3.3, sharp 0.35.4), with static output in `dist/`.

| File | What it does |
|---|---|
| `src/pages/index.astro` | A line-for-line port of the mockup's `build.py`. Same markup, class names and section order. Bound to `src/tenant/content.json` (schema v0.11), the SCHEMA GAP file `src/gaps/gaps.json` and the template's `src/lib/labels.json`. |
| `src/styles/site.css` | The mockup's `page.css`, with self-hosted `@font-face` and the 4g changes marked "4g:". |
| `src/scripts/site.js` | The mockup's interactions, unchanged: header, phone bar, "Who's coming?" tiles, room pill, slideshows, momentum shelf, quote row. |
| `src/scripts/palms.js` | **The palm shader, vendored.** Raw WebGL, no library, about 6.7 KB gz with `site.js`. It runs only when the page writes `data-mask-wide` / `data-mask-tall`, i.e. only when `photos.generated.json` has a mask for the hero photo. A replaced hero photo gets no mask and no shader (concepts §6). |
| `src/lib/slots.mjs` | photos[] row n fills slot n, with the mockup's crop boxes written as slack fractions. The hero's boxes come out exactly 1400×788 @ (300, 0) and 600×860 @ (650, 0), the mockup's. |
| `src/lib/site.mjs` | Plumbing: reads, formats and escapes. `TEL_CONFIRMED = false`. |
| `src/lib/icons.mjs` | Icons. |
| `src/lib/labels.json` | Interface wording. |
| `scripts/make-media.sh` | **The media recipe** (`# media:` headers for `src/tenant/media/*`, `src/palms/*`, `public/photos/*`, `public/palms/*`). It runs `seed-from-dossier.mjs` (the 24 business-owned originals → `src/tenant/media/`, `content.json`, `gaps.json`), then the graded hero upload `img-003-graded.jpg` (the mockup's round-3 frond grade plus the 4f r3 top-right darkening), then the palm mask painted on that photograph, then `scripts/photos.mjs`. |
| `scripts/photos.mjs` | Crops every slot to its shapes (never enlarged, WebP), and cuts the mask with the hero's own boxes. It runs again in `npm run build`. |
| `scripts/fetch-tenant.mjs` | The Payload fetch for station 8, copied plumbing. It is not part of `npm run build`. |
| `public/fonts/` | Plus Jakarta Sans (variable, latin) and Courgette (latin): Google Fonts woff2, self-hosted, with their OFL licences. Fonts are not media. |
| `wrangler.jsonc` | For the deployer; nothing is deployed at 4g. |

No Payload, and no tenant (station 8).

Rebuild: `npm install && npm run seed && npm run build`.

## Port comparison

Both pages were served over http and shot with `tools/shoot.mjs`: the final into `shots/`, the round-3 mockup into a scratch folder.

- **Text, alts, aria-labels and links**, extracted from both pages and diffed: the visible text and every `href` are **identical**. The only differences are the intended img-010 removal: one alt is gone, and the Standard slideshow is "1 of 4" … "4 of 4", with no "Photo 5".
- **Desktop frames, PSNR against the mockup:**
  - 01–06: 34–47 dB (the same page; font rasterising aside);
  - 00: 29 dB (the darker top-right fronds, 4f r3 fix 1);
  - 07–08: 12–14 dB (the guests section on mint, and everything after it moved up 29 px by the whole quote cards);
  - 09: 28 dB.
- **No other visible difference.** The page is 8127 px tall against the mockup's 8156.

**Differences from the mockup, all intended (none is a regression):**
1. The top-right fronds at 1440 are darker (4f r3 visual 1). This is a second masked curve in the grade, in `make-media.sh`.
2. "Ashly, and the guests" sits on the balcony table's own mint `#73C592` (4f r3 visual 2). The critic suggested bottle green, but that is a dark panel behind body text, which house rule 1 forbids and check-design fails; see conflicts. Ink on it is 7:1.
3. The review row shows whole cards inside the grid (`flex-basis: 100%`), so no clipped "Jan 2026" (4f r3 visual 3).
4. img-010 (the WC door) is dropped from the Standard photos (coordinator: the room has 0 bathrooms on Booking.com). Standard has 4 photos.
5. The `<title>` is "Sea You Surfers Nest, Midigama", the other finals' rule. The mockup's was "…: a bed and breakfast in Midigama, Sri Lanka".
6. No font preloads. Measured with an LCP observer on a throttled phone, the hero image painted at 1644 ms with the two font preloads and 992 ms without; audit-mockup's median LCP went from 1684 to 1392 ms. The fonts swap in over metric-matched fallbacks, with CLS unchanged at 0.0026.

The booking links still land on the top of the Booking.com listing: there are no dates to pass (standing).

## Checks (4g hand-off)

| Check | Result |
|---|---|
| `npm run build` | ok: 1 page, photos 24 → 32 files |
| `tools/check-design.mjs …/final/dist/index.html` | **ok**: 0 problems, 0 warnings |
| `tools/check-places.mjs sea-you-surfers-nest` | **ok**: 0 borrowed images (none exist) |
| axe-core 4.10.2, WCAG 2.0/2.1 A+AA | **0 violations** at 390 and 1440 |
| Keyboard walk, reduced motion | JS on: 36 stops at 390, 43 at 1440. JS off: 30 and 37. Every focused element is on screen; the first stop is "Skip to the rooms", visible on focus with and without JS |
| JS off | All four outbound links (Booking.com, both Airbnb listings, Google Maps) are plain links. "Who's coming?" becomes three labelled groups of links, both rooms stack, and the slideshows are scroll-snap rows |
| Reduced motion (with `?palms`) | h1, line, button and still at opacity 1; canvas `display:none`, never started |
| No WebGL (`--disable-webgl --disable-3d-apis`) | The graded still shows, the canvas never shows, no page errors |
| Software GL, default URL | The still stays (the weak-device rule) |
| Software GL with `?palms` | The shader runs; frames 1.8 s apart differ at PSNR 21 dB, only in the fronds |
| Booking end to end | A phone tap on the hero's "See live dates" requests `https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html` (third party stubbed). That equals `dossier.booking.engine_url` character for character; the seed asserts it, and the two Airbnb URLs against `other_engines`. 1 tap |
| Phone number | `tel:` 0, "715880052" 0 in `dist/`. `TEL_CONFIRMED = false` (dossier gaps[0], unconfirmed) |
| Prices | none on the page |
| URLs | relative only, lowercase filenames, no third-party request |

**`tools/audit-mockup.mjs sea-you-surfers-nest ../final`** (throttled phone, 3 runs, the machine loaded; `audit.json` = the median run):

| Line | Target | Measured (median of 3) |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | **524 KB** (523,670 B): images 403 KB, fonts 46 KB, HTML 75 KB (19 KB gz, CSS + JS inline) |
| JS, compressed | ≤ 300 KB | 0 external; inline `site.js` + `palms.js` 18.6 KB, **6.7 KB gz** |
| Largest image above the fold | ≤ 300 KB | 50 KB (the phone hero) |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families, 46 KB, self-hosted |
| LCP | ≤ 2.5 s | **1392 ms** (runs 1364 / 1392 / 1420) |
| CLS | < 0.1 | **0.0026** |
| Scroll CLS, early / settled | < 0.01 | 0.0053 / 0 |
| Third-party requests on load | 0 | **0** |
| Tap targets under 44 px | 0 | 0 |

## facts

Every fact on the page comes from `content.json` (= `copy/en.json`, passed at 4c) or `gaps.json`; the dossier key for each is given here.

| On the page | Source |
|---|---|
| Sea You Surfers Nest | `businessName` ← dossier business.name |
| Bed and breakfast | gaps `typeLine` ← dossier business.google_category |
| Midigama, Sri Lanka; 151 Weliwaththa Rd, Midigama 80650, Sri Lanka | `contact.address` ← dossier location.address (Google) |
| "Hello to waves in a minute walk," says the house's own listing. | `spot` ← dossier business.other_names (Booking.com title) |
| 7 rooms, all doubles · sleeps 14 | gaps `houseCount` ← dossier room_types[3] (Airbnb: 7 bedrooms, 14) and the copy's "All seven rooms are doubles…" |
| Free WiFi in public areas · Kitchen · Fan and mosquito net | `amenities[]` ← dossier facilities |
| 4.9/5 Google 11 · 8.0/10 Booking.com 8 · 5.0/5 Airbnb 10 · 21 Nov 2026 | `ratings[]` ← dossier reviews |
| Deluxe Double Room · Standard Double Room, beds, sleeps, notes (13 m² / 12 m²…) | `rooms[]` ← dossier room_types[0–1] |
| Check-out 06:00–10:00; the stay note | `stayInfo` ← dossier stay_info |
| The five reviews, verbatim, with authors and months | `testimonials[]` ← dossier reviews.quotes |
| Ask Ashly on Airbnb; Ashly | gaps `host` ← copy "Ashly" block, dossier business.owner, contact.airbnb_messaging |
| The six copy blocks | `copyBlocks[]` ← copy/en.json (4c) |
| The three listing links and Google Maps | `bookingLinks[]`, `contact.mapUrl` ← dossier booking, location.map_url |

## editable (once a CMS product is sold, station 8)

The owner edits all of the following in the "My site" form, and the site rebuilds:
- Basics: the name and the tagline.
- Text: the six copy blocks and the closing.
- Photos: the 24 rows in slot order, each cropped by the build. The hero is row 1; replacing it turns the shader off.
- Rooms & stay: the two room rows, check-out and the stay note.
- Amenities.
- Reviews: delete a row.
- Contact & booking: the address, map link and the three booking links. The phone shows only once `TEL_CONFIRMED` is set at the sale, with the number confirmed.

Not owner-editable: layout, CSS, JS, the shader and its mask, fonts, labels, slot crops, and the gaps file until the schema has fields for it (below).

## schema gaps (`src/gaps/gaps.json`)

| Gap | What the page shows | Proposal |
|---|---|---|
| A business-type display line | "Bed and breakfast" in the hero (4f r1: type + place on the first screen). `businessType` is an enum (`beach_lodging`) with no wording | an optional localized `typeLine` (≤ 40) |
| The house's own room count | "7 rooms, all doubles \| sleeps 14". `rooms[]` holds the two types Booking.com sells, not the house's count | `stayInfo.roomCount` / `stayInfo.sleeps` |
| The host's first name | "Ask Ashly on Airbnb". There is no owner/host field for lodging (`team[]` is a brand module) | `team[]` as a shared module, or `contact.hostName` |
| Booking link roles | "Who's coming?" sends a couple, a group or a question to the right `bookingLinks[]` row (gaps `bookingRoles`) | `bookingLinks[].audience` (`couple` \| `group` \| `question`) |
| A per-room feature list | "In every room" (four objects from the copy, plus the amenity) | `rooms[].features[]`, or a shared `everyRoom[]` |
| Room galleries | `rooms[].photo` holds one photo; the stage shows 6 + 4 per room (`slots.mjs` S.rooms) | `rooms[].photos[]` (≤ 8), as Cheeky Monkey, Lotus and Coconut asked |
| A short CTA label | "See live dates" (template label; the full copy label goes in `aria-label`) | `bookingLinks[].shortLabel` (≤ 20) |
| The shader's mask | tied to the hero photograph, made by recipe; a replaced hero gets none | a template rule, not a field (concepts §6) |

## images

All 24 are `business-owned` Booking.com / Airbnb property uploads; the alt text is the mockup's. The hero upload is img-003 with the fronds graded (a recipe in `make-media.sh`; the table, pot and parapet are untouched). Nothing is upscaled.

## conflicts

1. **4f r3 visual fix 2 against house rule 1.** The visual critic suggested Ashly's section on bottle green `#334825` with white type. That is a dark ground behind body text, which house rule 1 forbids ("never a large dark panel behind body text") and `check-design` fails (it flags any ground under luminance 0.35 that is taller than a third of the viewport). The deeper beat is made instead with the table's own mint `#73C592` (luminance 0.45, a light ground), with ink text at 7:1. If Shahar wants the bottle green, it is a one-line change, but it needs a house-rule exception.
2. **The phone number stays off** (dossier gaps[0], unconfirmed). This is not a defect: `TEL_CONFIRMED` in `src/lib/site.mjs` is the switch for station 8.

## other finals in this run

Lotus opens on its carved gate in a calm white page. Cheeky Monkey is a loud surf shop. This page has none of their faces, colours or first screens; see the mockup's notes and concepts §5.
