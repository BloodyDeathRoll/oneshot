# KA Surf Hostel — SEO report (station 4h)

seo 0.2.0 · run `2026-09-ahangama-02` · 2026-09-22 · site: `sites/ka-surf-hostel-and-restaurant/final/` (the 4g build, "Canopy")

Nothing visible changed. Proof is under "Look" below: 0 differing pixels in full-page captures at three widths.

## What changed, and where

| file | change |
|---|---|
| `final/src/pages/index.astro` | **h1.** It was the display headline "Five minutes from Kabalana Beach", which has no business name in it. Now the page's only `<h1>` is the name line: `<h1 class="who"><b>KA Surf Hostel</b> <span>Surf, chill and feel at home in Ahangama</span></h1>` (`businessName` + `tagline`: brand first, then what and where). The display headline is now `<p class="hl">` and keeps its exact look. The space between the name and the tagline is not rendered (they sit in a flex container), but it stops crawlers reading "HostelSurf". **Title** now takes the town from `contact.address`. The hard-coded `PLACE` is used only if the address has no "<postcode> <town>" part. The output is the same: "KA Surf Hostel, Ahangama" (24 chars). **Meta description** is built from owner fields (`tagline` + `copyBlocks` intro heading + offer heading, cut to 155 at a sentence): "Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach. Dorms and private rooms." (100 chars). Before, it was the tagline alone (40 chars). **Added:** `og:site_name`, `og:description` (same text), `twitter:card` summary, and `hreflang="x-default"`. `og:image` is now `photos[0]` (the schema's "hero" row, which the owner orders) with `og:image:width/height/alt`. Before, it was `photos[4]`. **JSON-LD** is rebuilt (below) and escaped (`<` → `<`), so owner text containing `</script>` cannot break out of the block. |
| `final/src/lib/site.mjs` | New helpers: `LD_TYPE` (businessType → schema.org type), `postalAddress()` (splits `contact.address` into street / postcode / town / ISO country only when the text has that shape, otherwise keeps it all in `streetAddress`; it never adds a part), `metaDescription()`. |
| `final/src/styles/site.css` | The three `h1{…}` rules are now `.clear .hl{…}`, with the same declarations and the same order. `.clear .who` gains `font-size:inherit;font-weight:inherit` so the h1's UA defaults can't leak in. |
| `final/src/scripts/site.js` | The pointer guard that keeps leaves off the headline now selects `.clear .hl` instead of `h1` (one selector). |
| `final/src/pages/robots.txt.js` (new) | `dist/robots.txt`: `User-agent: *` / `Allow: /`, plus `Sitemap: <abs>` when `SITE_URL` is set. |
| `final/src/pages/[sitemap].xml.js` (new) | `dist/sitemap.xml`, built **only** when `SITE_URL` is set (the sitemap protocol needs absolute URLs). It lists one URL with `hreflang="en"`, and `lastmod` from the CMS `updatedAt` when it exists (null today, so it is omitted). |
| `final/shots/seo/` | shoot.mjs captures of the new build. |

Everything is in KA's own template. There are no per-site overrides, and no file outside `final/` changed apart from this report.

### Domain unknown: how canonical and the sitemap handle it

Every absolute URL depends on the build env var `SITE_URL` (astro `site`): `canonical`, both `hreflang`, `og:url`, `og:image*`, JSON-LD `@id`/`url`/`image`, the `Sitemap:` line and `sitemap.xml` itself. Without `SITE_URL` (today) these are simply absent. Every link on the page stays relative, `robots.txt` still allows everything, and the zip still runs on any host. **The deployer must build production with `SITE_URL=https://<domain>/`.** Checked: `SITE_URL=https://example.test/ astro build --outDir /tmp/…` emits canonical/hreflang/og:url `https://example.test/`, og:image `https://example.test/photos/img-001-576.jpg` 576×768, 11 JSON-LD image URLs, `Sitemap: https://example.test/sitemap.xml`, and a one-URL sitemap. Without it, the build emits none of those, and emits robots.txt with no Sitemap line.

## Structured data: type and fields

**`Hostel`** (schema.org Thing › Place/Organization › LocalBusiness › LodgingBusiness › Hostel). Reason: `businessType` is `beach_lodging` (base.md: LodgingBusiness / Hostel / Resort for lodging), the business sells dorm beds and private rooms (`rooms[]`), and Booking.com files it as "Hostel" (dossier `business.type.note`). `LD_TYPE` maps the other types to base.md's choices.

JSON-LD emitted today (no `SITE_URL`). Every value comes from `content.json`:

| property | value | content field → dossier |
|---|---|---|
| `name` | KA Surf Hostel | `businessName` → `business.name` |
| `description` | the meta description | `tagline`, intro/offer headings → `business.tagline`, `location.distance_to_beach`, `room_types[]` |
| `telephone` | +94773746053 | `contact.phone` → `contact.phone` (Google) |
| `address` | PostalAddress: streetAddress "No 207/A, Welhengoda", postalCode 80650, addressLocality Ahangama, addressCountry LK | `contact.address` → `location.address` (Booking.com) |
| `geo` | 5.98181, 80.35206 | the map pin already on the page (`MAP_PIN`, SCHEMA GAP) = plus code X9J2+PR. Re-encoded here: 5.98181, 80.35206 → `6MQ2X9J2+PR`. The dossier's `lat_lng` [5.9805, 80.3486] is marked "approximate" and encodes to `6MQ2X8JX+6C`, so it was not used |
| `hasMap` | the Google Maps URL | `contact.mapUrl` → `location.map_url` |
| `checkinTime` / `checkoutTime` | 13:00 / 13:00 (earliest check-in, latest check-out, per schema.org's definitions) | `stayInfo.checkInFrom`, `.checkOutTo` → `hours_note` |
| `amenityFeature` | 17 × LocationFeatureSpecification {name, value: true} | `amenities[]` (the same 17 rows the page shows) → `facilities[]` |
| `knowsLanguage` | ["en"] | `languagesSpoken` → `languages_spoken` |
| `sameAs` | Hostelworld, Booking.com, Agoda listings | `bookingLinks[]` → `booking.engine_url`, `booking.other_engines` |
| `@id`, `url`, `image` | only with `SITE_URL` | `photos[]` |

**Validation.** No network validator was available. The block parses with `JSON.parse` (1 block, 13 keys). I checked each property against schema.org by reading: `checkinTime`/`checkoutTime` are LodgingBusiness properties (DateTime or Time; "13:00" is a valid Time), `amenityFeature` is on LodgingBusiness/Place with range LocationFeatureSpecification, and that type's `value` accepts Boolean. `hasMap` is on Place (URL). `knowsLanguage` is on Organization (Text, a BCP 47 code), which LocalBusiness inherits. `addressCountry` takes Text (ISO 3166-1 alpha-2). Everything else is basic Thing/Place/LocalBusiness. There is no property the type doesn't carry, and no field without a content source.

## Measured before and after

Before = the 4g build rebuilt at the start of this session (`/tmp` copy). After = the final build. Both measured by `tools/audit-mockup.mjs` (mobile, first load, no scroll) in the same session. LCP was run three times each because it jitters by about ±10 ms.

| | before | after | target (playbook §4) |
|---|---|---|---|
| HTML | 73 635 B (gzip -9 25 249) | 75 851 B (gzip -9 25 639) | — |
| First-load transfer | 206 056 B (201 KB) | 208 272 B (203 KB) | ≤ 1.5 MB |
| JS as files / inline | 0 / inline only | 0 / inline only (1 selector changed) | ≤ 300 KB |
| Fonts | 1 family, 32 292 B | same | ≤ 2, ≤ 150 KB |
| Largest image on first load | 47 428 B | same | ≤ 200 KB |
| LCP (3 runs) | 400 / 388 / 388 ms | 384 / 392 / 380 ms (final run 388) | ≤ 2.5 s |
| CLS | 0 | 0 | < 0.1 |
| Third-party requests on load | 0 | 0 | 0 |
| Headings | H1 (the headline) + 7 H2 | H1 (name + tagline) + 7 H2 | — |
| `<title>` / description | 24 / 40 chars | 24 / 100 chars | ≤ 60 / ≤ 155 |
| robots.txt / sitemap.xml | none / none | yes / only with `SITE_URL` | — |
| JSON-LD properties | 6 (name, description, address as one string, telephone, sameAs) | 13, plus 3 with `SITE_URL` | — |

Every figure is from headless Chromium on this machine, with the audit tool's throttling. No real phone was used.

### Look (no visible change)

- **Geometry and style diff, before vs after** (`/tmp` Playwright script). It compares every element in `<body>`: box to 0.1 px, plus font-size, weight, line-height, letter-spacing, colour and margins. It ran at 1440×900, 390×844 and 1920×1080, each with JS off, reduced motion and WebGL. Result: 262/262 elements, and the only difference is the class name on element 23 (`""` → `hl`, the renamed headline). All boxes and styles are identical, including the new h1 (18 px, same box).
- **Full-page pixel diff** (JS off and reduced motion): **0 px differ** at 1440 (1440×11205), at 390 (390×12833 JS off, 390×13065 reduced) and at 1920 (1920×11534). One reduced-motion capture per run shows a 512×384 block that differs (196 608 px). It landed at 1920 in the first run and at 1440 in the second, while the same width passed in the other run. It is a lazy load finishing at different times, not the page.
- **shoot.mjs** `final/shots/seo/` vs `final/shots/round-3/`: same page heights (desktop 11 835, mobile 13 656) and the same capture counts (15 / 18). Share of pixels differing per capture: every mobile capture 0.00%. Every desktop capture 0.00% except 00 at 0.06% (the live canopy's randomness) and 11 at 4.92%, where Rosa's widget had finished loading in the new shoot and was still blank in round 3. Viewed side by side, both are otherwise identical.

## Still wrong, and what it would take

1. **The name on Google differs from the name on the site.** Google lists "KA surf hostel and restaurant", Hostelworld "K A Surf Hostel", Booking.com and the site "KA Surf Hostel" (dossier `business.name.note`). The address differs too: Google has "207/A welahangoda, Ahangama", the site "No 207/A, Welhengoda, 80650 Ahangama" (`location.address.note`). base.md wants name, address and phone character-identical to Google. Fixing that needs either the owner to align the Google Business Profile, or a decision on which spelling is canonical. It is an owner and pitch item, not a template change. The phone matches.
2. **Schema gaps: fields SEO needs that `schemas/site-content.md` v0.3 lacks.** Proposed as a diff; not applied, since this station may not write schemas:
   ```diff
   + | `seo.title` | text | no | **yes** | owner | ≤ 60; default "<businessName>, <town>" | "KA Surf Hostel, Ahangama" |
   + | `seo.description` | text | no | **yes** | owner | ≤ 155; default built from tagline + headings | |
   + | `contact.geo.lat` / `.lng` | number | no | no | deployer | from the dossier's plus code, not an approximate pin | 5.98181 / 80.35206 |
   + | `socials[]` (`platform`, `url`) | array ≤ 8 | no | no | owner | https URLs; feeds JSON-LD sameAs | instagram, tripadvisor, google_maps |
   + | `alternateNames[]` | text | no | no | deployer | names the business is listed under elsewhere | "KA surf hostel and restaurant" |
   ```
   Until these exist, `geo` comes from the SCHEMA GAP constant `MAP_PIN`. `sameAs` lacks Instagram, Tripadvisor and the Google listing, which are in the dossier but have no content field, and there is no `alternateName`. That weakens the brand query for "KA surf hostel and restaurant", the name Google uses.
3. **No production domain.** Canonical, hreflang, og:url/og:image and the sitemap are absent until the build gets `SITE_URL`. Without og:image, a link pasted into WhatsApp today gets no preview picture.
4. **og:image shape.** `photos[0]` crop is 576×768 portrait (the build only makes 3:4 crops). Link-preview surfaces prefer about 1.91:1 at 1200×630 and will crop it. A dedicated 1200×630 crop in `scripts/photos.mjs` would fix this. It is outside first load and invisible on the page, but not done here.
5. **No favicon or logo.** Browsers and Google fetch `/favicon.ico` and get 404. The schema has no logo field and the dossier no logo, so there is nothing sourced to use. Needs the owner's mark, or a design decision.
6. **The display headline is a `<p>` now.** Screen readers announce the h1 as "KA Surf Hostel Surf, chill and feel at home in Ahangama" and the big headline as a paragraph. That is intended (base.md: the h1 carries the name), but it is a semantic change the critic should know about.
7. **The spot sentence is an `<h2>`** 122 chars long ("Kabalana: a sandy beach break…"). It is a valid heading, but long. Shortening it would change visible copy, so it is left alone. Recommendation only.
8. **Map.** The OpenStreetMap embed (lazy, JS-gated) is still the open 4g conflict with playbook §4. From an SEO view it is harmless: 0 requests on load.

## Refused or omitted because the sources don't support it

- **`aggregateRating` and `review`:** omitted. `ratings[]` holds three real platform scores (Hostelworld 9.8/10 from 66, Booking.com 9.5/10 from 38, Google 4.8/5 from 42), but they are third-party scores. Google's review-snippet guidelines do not allow marking up ratings collected on other sites as the business's own, and self-serving LocalBusiness ratings get no rich result. One `aggregateRating` would mean picking one platform or averaging, and base.md forbids averaging. **Shahar's call** if he wants one platform's score marked up anyway, attributed to it.
- **`openingHoursSpecification`:** omitted. `openingHours[]` is empty, and "Reception is open 24 hours" exists only as prose in `stayInfo.note`.
- **`priceRange`:** omitted. There are no prices (rates are live OTA inventory).
- **`petsAllowed`, `numberOfRooms`, room offers:** omitted. The facts exist only as amenity or room prose, with no structured values to map without interpreting them.
- **No keyword-stuffed title or description** ("best surf hostel in Ahangama" and the like). Title and description use owner fields only.

## Checks, verbatim

```
$ node tools/check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots
ok    sites/ka-surf-hostel-and-restaurant/final/dist
      look: fonts h1 "Outfit" · h2 "Outfit" · body "Outfit"   ground rgb(240, 241, 242) = hsl(210 7% 95%)   all-caps labels 0   labelled headings 0/8
│ 0       │ 'sites/ka-surf-hostel-and-restaurant/final/dist' │ 0        │ 0        │
1 page(s) · 0 failing · default-look warnings never fail

$ node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant ../final
audited ka-surf-hostel-and-restaurant/../final
│ (index) │ slug                     │ variant    │ first KB │ JS KB │ LCP ms │ CLS │ 3rd party │ noJS links │ kbd ok │ alt miss │
│ 0       │ 'ka-surf-hostel-and-res' │ '../final' │ 203      │ 0     │ 388    │ 0   │ 0         │ 4          │ 'n/a'  │ 0        │

$ node tools/shoot.mjs http://127.0.0.1:8941/ --out sites/ka-surf-hostel-and-restaurant/final/shots/seo
desktop: 15 captures, page 11835px
mobile: 18 captures, page 13656px
```

`final/audit.json` was rewritten by the audit (bytes_total 208 272, lcp_ms 388, cls 0, third_party_hosts []). `final/notes.md` still describes the 4g h1 and JSON-LD; this report supersedes those two lines, and I did not edit notes.md.

---

## Re-run after 4g round 2 — 2026-09-22

seo 0.2.0 · same run. What changed in the build since the first pass (final/notes.md "Round 2"): `contact.address` is now "207/A Welahangoda, 80650 Ahangama, Sri Lanka", the breakfast copy block, `amenities[0]` and `spot` were changed, and the OpenStreetMap embed was replaced by a Google Maps link. Shahar's decisions: the name stays "KA Surf Hostel" (casing doesn't matter), and no ratings markup.

**Result: the rebuild broke nothing in the SEO layer. No file was changed.** Every template change from the first pass is still in `src/` and still produces the same output from the new content.

### Re-verified on the new `dist/`

| check | result |
|---|---|
| `<title>` | "KA Surf Hostel, Ahangama" (24 chars). The town is still parsed from the new address, so the `PLACE` fallback is not used. |
| meta description / og:description | unchanged, 100 chars (tagline + intro and offer headings, none of which changed) |
| h1 | exactly one: `<b>KA Surf Hostel</b> <span>Surf, chill and feel at home in Ahangama</span>` |
| h2s | 7: Dorms and private rooms · **Breakfast, every day** (new) · What is here · What guests say about the staff · Getting here · **the new spot sentence** · Check dates |
| JSON-LD | 1 block, parses, 14 keys, `@type` Hostel. `address` = PostalAddress {streetAddress **"207/A Welahangoda"**, postalCode "80650", addressLocality "Ahangama", addressCountry "LK"}: `postalAddress()` splits the new string correctly. `geo` 5.98181, 80.35206 (still `MAP_PIN`, which round 2 kept). `hasMap` = `contact.mapUrl` = dossier `location.map_url`, character for character. `amenityFeature` 17 rows, [0] "Free breakfast". `telephone` +94773746053. `sameAs` = the 3 listings. No `aggregateRating`/`review` (Shahar: no ratings markup). |
| NAP on the page vs JSON-LD | The visible address in "Getting here" and the footer (3 occurrences in the HTML incl. JSON-LD) is identical to `contact.address`. Phone is identical in 5 `tel:` links and the JSON-LD. |
| robots.txt | `User-agent: *` / `Allow: /` plus the 4i AI-crawler group. There is no `Sitemap:` line without `SITE_URL`. |
| SITE_URL gating | A throwaway build with `SITE_URL=https://example.test/` (to `final/.astro/siteurl-check/`, then deleted) emits: canonical, hreflang en + x-default, og:url, og:image `…/photos/img-001-576.jpg` 576×768 + alt, JSON-LD 17 keys (`@id` `https://example.test/#business`, `url`, 11 `image`) with the new streetAddress, `Sitemap: https://example.test/sitemap.xml` (robots.txt line 22), and a one-URL `sitemap.xml` with hreflang en. The real `dist/` has none of them. |
| old texts | 0 hits in `dist/index.html` for "Welhengoda", "No 207", "Breakfast changes", "changes daily", "improvers", "swell is up", "openstreetmap". The only iframe is Rosa's widget (`data-src`, lazy). |

### First-pass "still wrong" items: status now

1. **NAP vs Google: resolved on the address.** The site's street is Google's "207/A welahangoda" (Shahar: casing doesn't matter). The site adds "80650" and "Sri Lanka", which Google's listing leaves out. That is a superset, not a conflict. **The name is unchanged by decision.** Google's "KA surf hostel and restaurant" still differs from the site's "KA Surf Hostel", so `alternateNames[]` (item 2) remains the way to connect them. Traceability note: the dossier's `location.address.value` still holds the Booking.com form ("No 207/A, Welhengoda, …"). The site's string comes from `location.address.note` (Google/Hostelworld spelling) plus Booking's postcode, as recorded in `copy/sources.md`. I did not touch the dossier. Updating `value` is the harvester's or Shahar's call.
2. Schema gaps (`seo.*`, `contact.geo`, `socials[]`, `alternateNames[]`): unchanged and still proposed.
3. No production domain: unchanged.
4. og:image is a 576×768 portrait: unchanged.
5. No favicon/logo: unchanged.
6. Display headline is a `<p>`: unchanged and intended.
7. **Spot h2 is now 113 chars** (was 122): "Kabalana: a sandy beach break for beginners and intermediates, and The Rock, a reef A-frame for advanced surfers." Still a valid, descriptive heading, and it now names both breaks.
8. **Map: closed.** The embed is gone. "Open in Google Maps" (Getting here) and "Open the map" (footer) both link to `contact.mapUrl`, so local SEO gets exactly what base.md §3 asks for, a link to the Google Maps listing. No map request on load or on scroll.
- **`aggregateRating`: closed by decision** (Shahar: no ratings markup).

### Measured (same tools as the first pass)

| | first pass (after 4i) | now (4g round 2) | target |
|---|---|---|---|
| HTML | 76 333 B (gzip -9 25 719) | 73 225 B (gzip -9 24 933) | — |
| First-load transfer | 208 754 B (204 KB) | 231 552 B (226 KB), 8 requests, all local | ≤ 1.5 MB |
| JS files | 0 | 0 | ≤ 300 KB |
| Fonts | 32 292 B, 1 family | same | ≤ 2, ≤ 150 KB |
| Largest image on first load | 47 428 B | same | ≤ 200 KB |
| LCP | 384 ms | 380 ms | ≤ 2.5 s |
| CLS | 0 | 0 | < 0.1 |
| Third-party on load | 0 | 0 | 0 |

The +22.8 KB is not SEO. The throttled first load now also pulls the breakfast photo, because the shorter breakfast copy moved it into the lazy-load margin (explained in `final/notes.md` round 2). The HTML shrank by 3.1 KB because the map markup and its script were removed.

### Look

No file changed, so there is nothing to diff at code level. shoot.mjs `final/shots/seo-2/` vs `final/shots/round-4/`: same page heights (desktop 11 729, mobile 13 092) and counts (15 / 18). Pixels differing (channel delta > 8): 0.00% on every capture except mobile-00 at 0.02% (the canopy's randomness) and desktop-11 at 8.35%. In desktop-11, Rosa's widget finished loading in the new shoot and was blank in round-4. The page is otherwise identical.
Shooting note: two earlier shoot.mjs runs of this same build captured desktop-00/01 with the canopy canvas blank (white ground, no leaves). The page itself renders the canopy: I checked with separate Playwright probes that ran the same launch flags and the same scroll/pointer sequence, 9 of 9 screenshots with leaves, and the third shoot run matched round-4 at 0.00%. So it is a flaky WebGL capture in headless swiftshader, not the site. It can fool a critic comparing shots.

**Seen, not changed (look):** in desktop-11, with the widget loaded, the widget's left edge (x≈698) covers the "m" of the forecast headline "0.7–1.0 m", which ends at about x≈720 in round-4, where the widget was blank. That is a 4g layout issue in the forecast pair at 1440, outside this station. I'm reporting it for the critic.

### Checks, verbatim

```
$ npx --no-install astro build        (in final/)
  ├─ /llms.txt (+4ms)
  ├─ /robots.txt (+1ms)
  ├─ /index.html (+4ms)
✓ Completed in 15ms.
[build] 1 page(s) built in 168ms
[build] Complete!

$ node tools/check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots
ok    sites/ka-surf-hostel-and-restaurant/final/dist
      look: fonts h1 "Outfit" · h2 "Outfit" · body "Outfit"   ground rgb(240, 241, 242) = hsl(210 7% 95%)   all-caps labels 0   labelled headings 0/8
│ 0       │ 'sites/ka-surf-hostel-and-restaurant/final/dist' │ 0        │ 0        │
1 page(s) · 0 failing · default-look warnings never fail

$ node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant ../final
audited ka-surf-hostel-and-restaurant/../final
│ (index) │ slug                     │ variant    │ first KB │ JS KB │ LCP ms │ CLS │ 3rd party │ noJS links │ kbd ok │ alt miss │
│ 0       │ 'ka-surf-hostel-and-res' │ '../final' │ 226      │ 0     │ 380    │ 0   │ 0         │ 4          │ 'n/a'  │ 0        │

$ node tools/shoot.mjs http://127.0.0.1:8963/ --out sites/ka-surf-hostel-and-restaurant/final/shots/seo-2
desktop: 15 captures, page 11729px
mobile: 18 captures, page 13092px

JSON-LD parse (dist/index.html): 1 block, 14 keys — @context,@type,name,description,telephone,address,geo,hasMap,checkinTime,checkoutTime,amenityFeature,containsPlace,knowsLanguage,sameAs
JSON-LD parse (SITE_URL=https://example.test/ build): 1 block, 17 keys, @id https://example.test/#business, streetAddress "207/A Welahangoda"
```

`final/audit.json` was rewritten by the audit (bytes_total 231 552, lcp_ms 380, cls 0, third_party_hosts []).

---

## Re-run after 4g round 3 — 2026-09-22

seo 0.2.0 · same run. What changed in the build since the round-2 re-run (`final/notes.md` "Round 3"): `copy/en.json` re-passed 4c in full and was re-seeded, so four values in `content.json` moved — `copyBlocks[0].body` (new intro), `copyBlocks[1].body` ("private lockers", "The bathrooms are modern and the showers are hot", "Rates change with the dates"), `copyBlocks[3].body` ("What is here", rewritten, ending "Reception is open 24 hours."), and `amenities[3].label` ("Private lockers and personal fridge in every room"). Two CSS lines make the forecast fallback keep its reserved box, and the footer's map link now reads "Open in Google Maps".

**Result: the rebuild broke nothing in the SEO layer. No file was changed.** Every heading the head is built from is unchanged, so title, description and `og:*` are byte-identical to the round-2 re-run; the one content value that reaches structured data (`amenities[3].label`) is carried through correctly.

### Re-verified on the new `dist/`

| check | result |
|---|---|
| `<title>` | "KA Surf Hostel, Ahangama", 24 chars (≤ 60). Still parsed from `contact.address`; the `PLACE` fallback is not used. |
| meta description / `og:description` | "Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach. Dorms and private rooms.", 100 chars (≤ 155). It is `metaDescription([tagline, intro.heading, offer.heading])`, and round 3 changed **bodies**, not headings: `tagline` "Surf, chill and feel at home in Ahangama", `copyBlocks[0].heading` "Five minutes from Kabalana Beach", `copyBlocks[1].heading` "Dorms and private rooms" are all unchanged. So the description is still right, and still true of the new copy. |
| single `<h1>` | exactly 1 in the page: `<b>KA Surf Hostel</b> <span>Surf, chill and feel at home in Ahangama</span>`. |
| headings | H1 + 7 H2 (Dorms and private rooms · Breakfast, every day · What is here · What guests say about the staff · Getting here · the spot sentence · Check dates). `audit.json` `a11y.headings` = `["H1","H2"×7]`, `check-design` "labelled headings 0/8". |
| JSON-LD | 1 block, parses, 14 keys, `@type` `Hostel`. `address` = PostalAddress {streetAddress "207/A Welahangoda", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"} — the split still fires on the unchanged address string. `geo` 5.98181, 80.35206 (`MAP_PIN`, SCHEMA GAP, unchanged). `hasMap` = `contact.mapUrl`, character-identical to the dossier's `location.map_url`. `checkinTime`/`checkoutTime` 13:00/13:00. `amenityFeature` 17 rows, **[3] is now "Private lockers and personal fridge in every room"** (the only structured-data value round 3 moved). `containsPlace` 6 × HotelRoom (4i's). `telephone` +94773746053. `knowsLanguage` ["en"]. `sameAs` = the 3 listings. No `aggregateRating`/`review` (Shahar: no ratings markup). |
| NAP on the page vs JSON-LD | address "207/A Welahangoda, 80650 Ahangama, Sri Lanka" appears 3× in the HTML (Getting here, footer, JSON-LD), identical each time; phone +94773746053 6× (5 `tel:` hrefs + JSON-LD). |
| Google Maps link | "Open in Google Maps" 2× (Getting here and the footer, round 3's fix), both to `contact.mapUrl`. "Open the map" 0. That is base.md §3's link to the Google listing, twice, with no map request on load. |
| robots.txt | 512 B: `User-agent: *` / `Allow: /`, then 4i's AI-crawler group. No `Sitemap:` line without `SITE_URL`, and no `sitemap.xml` in `dist/` — as designed. |
| `SITE_URL` gating | Throwaway build with `SITE_URL=https://example.test/` (to `final/.astro/siteurl-check/`, deleted afterwards): canonical, `hreflang` en + x-default, `og:url`, `og:image` `…/photos/img-001-576.jpg` 576×768 + `og:image:alt`, JSON-LD 17 keys (`@id` `https://example.test/#business`, `url`, 11 `image`), `Sitemap: https://example.test/sitemap.xml`, and a one-URL `sitemap.xml` with `hreflang="en"`. The real `dist/` has none of them and every link on it stays relative. |
| forecast fallback | No SEO surface: the block carries no fact that is in the head or the JSON-LD, and the fallback path is still a plain link. `og:*`, canonical and the LD graph are untouched by it. CLS stays 0 (audit), which is the ranking signal that could have moved. |
| retired phrases | In `dist/index.html` and `dist/llms.txt`: "ten minutes" 0/0, "come back wet" 0/0, "open to the sky" 0/0, "with the season" 0/0, "if you ask" 0/0, "a private locker" 0/0, "Open the map" 0/0. Also "Welhengoda" 0, "No 207" 0. |

### "Still wrong" items: status now

Unchanged from the round-2 re-run, all of them. 1 (name vs Google's "KA surf hostel and restaurant" — the address is a superset, the name differs by decision), 2 (schema gaps `seo.*`, `contact.geo`, `socials[]`, `alternateNames[]` — still proposed, still not applied), 3 (no production domain), 4 (og:image is a 576×768 portrait), 5 (no favicon/logo), 6 (the display headline is a `<p>`, intended). Item 7: the spot `<h2>` is unchanged at 113 chars. Item 8 (map) stays closed, and round 3 made it better by giving the footer link the same words as the one under "Getting here". `aggregateRating` stays closed by Shahar's decision.

### Measured

| | round-2 re-run | now (4g round 3) | target |
|---|---|---|---|
| HTML | 73 225 B (gzip -9 24 933) | 74 158 B (gzip -9 25 223) | — |
| First-load transfer | 231 552 B (226 KB) | 232 485 B (227 KB), 8 requests, all local | ≤ 1.5 MB |
| JS as files | 0 | 0 | ≤ 300 KB |
| Fonts | 32 292 B, 1 family | same | ≤ 2, ≤ 150 KB |
| Largest image on first load | 47 428 B | same | ≤ 200 KB |
| LCP (3 runs) | 380 ms | 396 / 388 / 396 ms | ≤ 2.5 s |
| CLS | 0 | 0 | < 0.1 |
| Third-party on load | 0 | 0 | 0 |
| `<title>` / description | 24 / 100 chars | 24 / 100 chars | ≤ 60 / ≤ 155 |
| JSON-LD | 14 keys (17 with `SITE_URL`) | same | parses |

The +933 B of HTML is the longer round-3 copy. LCP jitters by about ±10 ms between runs on this machine; `notes.md` round 3 recorded 388 ms for this same build.

### Look

No file changed, so there is nothing to diff at code level. `shoot.mjs` `final/shots/seo-3/` vs `final/shots/round-6/`: same page heights (desktop 11 689, phone 13 032) and counts (15 / 18). Pixels differing (channel delta > 8): **0.00 % on 30 of the 33 captures**, and the three that move are the two known sources:

- desktop-00 0.03 % (407 px) and mobile-00 0.05 % (718 px), scattered over the whole frame — the canopy draws its leaves randomly. Both captures have leaves (looked at `seo-3/desktop-00.png`); the blank-canopy flake described in the round-2 re-run did not happen this time.
- desktop-11 9.65 % (125 056 px), and the differing pixels are exactly the box x 698…1117, y 602…899 — 420 px wide, i.e. `.fc-rosa`, Rosa's widget. It finished loading in this shoot and was still blank in round-6. Viewed side by side, the rest of the frame is identical.

**Seen, not changed (look):** the round-2 re-run reported the widget's left edge covering the "m" of the forecast headline at 1440. In this build's capture it does not: the headline reads "0.7–1.1 m" and ends at about x 672, clear of the widget at x 698. Nothing here changed that, so it looks like it depends on the number Rosa returns; still a 4g matter, not this station's.

### Checks, verbatim

```
$ npx --no-install astro build        (in final/)
  ├─ /llms.txt (+3ms)
  ├─ /robots.txt (+1ms)
  ├─ /index.html (+4ms)
✓ Completed in 15ms.
[build] 1 page(s) built in 175ms
[build] Complete!

$ node tools/check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots
ok    sites/ka-surf-hostel-and-restaurant/final/dist
      look: fonts h1 "Outfit" · h2 "Outfit" · body "Outfit"   ground rgb(240, 241, 242) = hsl(210 7% 95%)   all-caps labels 0   labelled headings 0/8
│ 0       │ 'sites/ka-surf-hostel-and-restaurant/final/dist' │ 0        │ 0        │
1 page(s) · 0 failing · default-look warnings never fail

$ node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant ../final
audited ka-surf-hostel-and-restaurant/../final
│ (index) │ slug                     │ variant    │ first KB │ JS KB │ LCP ms │ CLS │ 3rd party │ noJS links │ kbd ok │ alt miss │
│ 0       │ 'ka-surf-hostel-and-res' │ '../final' │ 227      │ 0     │ 396    │ 0   │ 0         │ 4          │ 'n/a'  │ 0        │

$ node tools/shoot.mjs http://127.0.0.1:8991/ --out sites/ka-surf-hostel-and-restaurant/final/shots/seo-3
desktop: 15 captures, page 11689px
mobile: 18 captures, page 13032px

JSON-LD parse (dist/index.html): 1 block, 14 keys — @context,@type,name,description,telephone,address,geo,hasMap,checkinTime,checkoutTime,amenityFeature,containsPlace,knowsLanguage,sameAs
  amenityFeature[3].name = "Private lockers and personal fridge in every room"
JSON-LD parse (SITE_URL=https://example.test/ build): 1 block, 17 keys, @id https://example.test/#business, 11 image URLs
title 24 chars · description 100 chars · h1 count 1 · h2 count 7
```

Budget lines from `final/audit.json` (rewritten by the audit: bytes_total 232 485, bytes_js 0, bytes_fonts 32 292, largest_image_bytes 47 428, lcp_ms 396, cls 0, third_party_hosts [], requests 8) — every one inside playbook §4.

---

## Preview build: noindex when there is no real domain — 2026-09-22

seo 0.2.0 · same run. Shahar's decision (ledger, 2026-09-22), verbatim: *"Yes, add the noindex: robots.txt Disallow: / plus the noindex meta whenever SITE_URL is absent or points at workers.dev, off on a real domain. Run it through the SEO station, not by hand."* — and *"build the preview with `SITE_URL=https://ka-surf-hostel.os1.workers.dev/`"*. The site is about to be deployed to a temporary preview at `https://ka-surf-hostel.os1.workers.dev/` to show the owner.

Nothing on the page moved. Proof under "Look" below.

### The rule, and the one place it lives

`final/src/lib/site.mjs`, beside the other helpers:

```js
export const isPreviewUrl = (url) => {
  if (!url) return true
  let host
  try { host = new URL(url).hostname.toLowerCase().replace(/^\[|\]$/g, '') } catch { return true }
  return host === 'workers.dev' || host.endsWith('.workers.dev')
    || host === 'localhost' || host.endsWith('.localhost')
    || host === '127.0.0.1' || host === '::1'
}
export const SITE = import.meta.env.SITE ? new URL(import.meta.env.SITE) : null
export const IS_PREVIEW = isPreviewUrl(SITE)
```

A build is a **preview** when it has no production domain of its own: no `SITE_URL` at all, a `SITE_URL` on `*.workers.dev`, or one on `localhost` / `127.0.0.1` / `::1` (a local `astro build` is a preview too). An unparseable `SITE_URL` is treated as a preview — the safe side. Everything that needs the answer imports `IS_PREVIEW`; no file sniffs the URL itself.

| file | change |
|---|---|
| `final/src/lib/site.mjs` | the block above (`isPreviewUrl`, `SITE`, `IS_PREVIEW`). Nothing else in the file changed. |
| `final/src/pages/robots.txt.js` | on a preview the whole file is one refusal (below). The real-domain path is byte-for-byte what it was, AI group and `Sitemap:` line included. |
| `final/src/pages/[sitemap].xml.js` | `getStaticPaths()` is now `IS_PREVIEW ? [] : [{…}]` (it was `process.env.SITE_URL ? … : []`). A preview gets no `sitemap.xml`: it disallows everything, and a sitemap is a list of pages asking to be indexed. Unchanged for a build with no `SITE_URL` — still no sitemap. |
| `final/src/pages/index.astro` | one line in the head: `{IS_PREVIEW && <meta name="robots" content="noindex, nofollow">}`, right after `<title>`. `const site` now reads the shared `SITE` instead of re-reading `import.meta.env.SITE`. Nothing else: canonical, `hreflang`, `og:url` and `og:image` still follow `SITE_URL`, so the preview's own links resolve. |
| `final/src/pages/llms.txt.js` | one preview-only line (see below). This is 4i's file; the change is three lines and is marked as 4h's in a comment. |

No CSS, no script, no body markup, no content. Nothing outside `final/` and this report.

### Preview robots.txt, verbatim (states 1 and 2 — byte-identical to each other)

```
# Preview build: this is not the published site. Nothing here may be crawled or indexed.
User-agent: *
Disallow: /

# The named AI crawlers repeat the refusal: a bot matching its own group ignores the "*" group.
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Meta-ExternalAgent
User-agent: Amazonbot
User-agent: DuckAssistBot
User-agent: MistralAI-User
Disallow: /
```

**Why the AI group is repeated rather than dropped.** A crawler that matches a group of its own ignores the `*` group entirely — that is the rule 4i relied on to give the AI bots their own `Allow: /`. Leaving that group as-is under a site-wide `Disallow: /` would therefore have told exactly the fifteen named crawlers the opposite of what the file says, and dropping the group would have left them on the `*` group by silence. Repeating them with `Disallow: /` says it to every one of them in its own words. No group in the preview file allows anything, and there is no `Sitemap:` line because there is no sitemap.

`AI_CRAWLERS` itself is untouched: the owner's allow/deny decision (aiseo-report.md) is still the single source, and it takes effect the moment the site gets a real domain.

### /llms.txt: kept reachable, marked

`/llms.txt` is still built and still served on a preview. What changed: on a preview build only, one line under the summary blockquote:

```
# KA Surf Hostel

> Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach.

Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.
```

**Why this and not something else.** Three options were on the table. (a) Stop emitting the file: rejected — Shahar asked for it to stay reachable, and it is how we and the owner read what an answer engine would see. (b) Rely on `robots.txt` alone: correct for every compliant fetcher, since `Disallow: /` covers `/llms.txt` like any other path, but it leaves the file itself silent, and an engine that ignores robots.txt would read a complete, confident description of a hostel with a live URL in its "Pages" section and no hint that the URL is throwaway. (c) What I did: robots.txt keeps doing the real work, and the file says what it is in band. A static file cannot carry `X-Robots-Tag` (no server to set a header on Workers static assets) and llms.txt has no meta mechanism, so a plain sentence is the only signal available inside the file. It costs 100 bytes, it is preview-only, and it disappears on a real domain.

The rest of the file is unchanged, including the `## Pages` link, which on this build reads `- [KA Surf Hostel, Ahangama](https://ka-surf-hostel.os1.workers.dev/): the website, one page` — the preview's own URL, so the owner's links work.

### The three builds

All three in `final/`, `npx --no-install astro build`, `dist/` inspected after each.

**1 · no `SITE_URL`** — `dist/`: `fonts img index.html llms.txt photos robots.txt` (no `sitemap.xml`).

```
  ├─ /llms.txt (+3ms)
  ├─ /robots.txt (+1ms)
  ├─ /index.html (+4ms)
✓ Completed in 15ms.
[build] 1 page(s) built in 165ms
[build] Complete!
```

robots.txt: the preview file above, verbatim. Head, verbatim (preload, inline style and JSON-LD elided):

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>KA Surf Hostel, Ahangama</title>
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach. Dorms and private rooms.">
<meta property="og:type" content="website">
<meta property="og:site_name" content="KA Surf Hostel">
<meta property="og:title" content="KA Surf Hostel, Ahangama">
<meta property="og:description" content="Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach. Dorms and private rooms.">
<meta name="twitter:card" content="summary">
```

`grep -c canonical dist/index.html` → 0. `grep -c sitemap dist/robots.txt` → 0. JSON-LD: 14 keys, no `@id` / `url` / `image`. Exactly the old no-`SITE_URL` behaviour, plus the noindex meta.

**2 · `SITE_URL=https://ka-surf-hostel.os1.workers.dev/`** (the preview that will be deployed) — `dist/`: same six entries, still **no `sitemap.xml`**.

```
  ├─ /llms.txt (+3ms)
  ├─ /robots.txt (+1ms)
  ├─ /index.html (+4ms)
✓ Completed in 15ms.
[build] 1 page(s) built in 170ms
[build] Complete!
```

robots.txt: byte-identical to state 1 — the preview file above, **no `Sitemap:` line**. Head, verbatim:

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>KA Surf Hostel, Ahangama</title>
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach. Dorms and private rooms.">
<link rel="canonical" href="https://ka-surf-hostel.os1.workers.dev/">
<link rel="alternate" hreflang="en" href="https://ka-surf-hostel.os1.workers.dev/">
<link rel="alternate" hreflang="x-default" href="https://ka-surf-hostel.os1.workers.dev/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="KA Surf Hostel">
<meta property="og:title" content="KA Surf Hostel, Ahangama">
<meta property="og:description" content="Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach. Dorms and private rooms.">
<meta property="og:url" content="https://ka-surf-hostel.os1.workers.dev/">
<meta property="og:image" content="https://ka-surf-hostel.os1.workers.dev/photos/img-001-576.jpg">
<meta property="og:image:width" content="576">
<meta property="og:image:height" content="768">
<meta property="og:image:alt" content="A private room with a double bed, white plank walls and the door open to the garden">
<meta name="twitter:card" content="summary">
```

Canonical and `og:url` point at the preview host, as asked, so a link pasted from the preview resolves and the WhatsApp preview picture loads from the preview itself. `noindex, nofollow` is what stops that being an indexing invitation. **This is the state `dist/` is left in.**

**3 · `SITE_URL=https://example.test/`** — `dist/` gains `sitemap.xml`:

```
  ├─ /llms.txt (+4ms)
  ├─ /robots.txt (+1ms)
  ├─ /sitemap.xml (+1ms)
  ├─ /index.html (+4ms)
✓ Completed in 17ms.
[build] 1 page(s) built in 176ms
[build] Complete!
```

robots.txt, verbatim — today's behaviour, unchanged:

```
User-agent: *
Allow: /

# AI crawlers and assistants: allowed, so answers can quote and link this site (owner to confirm)
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Meta-ExternalAgent
User-agent: Amazonbot
User-agent: DuckAssistBot
User-agent: MistralAI-User
Allow: /

Sitemap: https://example.test/sitemap.xml
```

sitemap.xml, verbatim:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url><loc>https://example.test/</loc><xhtml:link rel="alternate" hreflang="en" href="https://example.test/"/></url>
</urlset>
```

Head, verbatim — **no robots meta**:

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>KA Surf Hostel, Ahangama</title>
<meta name="description" content="Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach. Dorms and private rooms.">
<link rel="canonical" href="https://example.test/">
<link rel="alternate" hreflang="en" href="https://example.test/">
<link rel="alternate" hreflang="x-default" href="https://example.test/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="KA Surf Hostel">
<meta property="og:title" content="KA Surf Hostel, Ahangama">
<meta property="og:description" content="Surf, chill and feel at home in Ahangama. Five minutes from Kabalana Beach. Dorms and private rooms.">
<meta property="og:url" content="https://example.test/">
<meta property="og:image" content="https://example.test/photos/img-001-576.jpg">
<meta property="og:image:width" content="576">
<meta property="og:image:height" content="768">
<meta property="og:image:alt" content="A private room with a double bed, white plank walls and the door open to the garden">
<meta name="twitter:card" content="summary">
```

`grep -c noindex dist/index.html` → 0. JSON-LD: 17 keys — `@context,@type,@id,url,name,description,image,telephone,address,geo,hasMap,checkinTime,checkoutTime,amenityFeature,containsPlace,knowsLanguage,sameAs`, `@id` `https://example.test/#business`, 11 image URLs. `dist/llms.txt` has no preview line. Identical to what the round-3 re-run recorded for a `SITE_URL` build.

### Checks, verbatim (on the state-2 `dist/`)

```
$ node tools/check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots
ok    sites/ka-surf-hostel-and-restaurant/final/dist
      look: fonts h1 "Outfit" · h2 "Outfit" · body "Outfit"   ground rgb(240, 241, 242) = hsl(210 7% 95%)   all-caps labels 0   labelled headings 0/8
│ 0       │ 'sites/ka-surf-hostel-and-restaurant/final/dist' │ 0        │ 0        │
1 page(s) · 0 failing · default-look warnings never fail

$ node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant ../final
audited ka-surf-hostel-and-restaurant/../final
│ (index) │ slug                     │ variant    │ first KB │ JS KB │ LCP ms │ CLS │ 3rd party │ noJS links │ kbd ok │ alt miss │
│ 0       │ 'ka-surf-hostel-and-res' │ '../final' │ 229      │ 0     │ 404    │ 0   │ 0         │ 4          │ 'n/a'  │ 0        │

$ node tools/shoot.mjs http://127.0.0.1:8947/ --out sites/ka-surf-hostel-and-restaurant/final/shots/seo-4
desktop: 15 captures, page 11689px
mobile: 18 captures, page 13032px
```

Budgets (from the rewritten `final/audit.json`): bytes_total 234 770, bytes_html 76 443, bytes_js 0, bytes_fonts 32 292, largest_image 47 428, lcp_ms 404, cls 0, third_party_hosts [], requests 8 — every one inside playbook §4.

| | 4g round 7 (no `SITE_URL`) | now (preview, `SITE_URL` = workers.dev) | target |
|---|---|---|---|
| HTML | 74 945 B | 76 443 B | — |
| First-load transfer | 233 272 B (228 KB) | 234 770 B (229 KB), 8 requests, all local | ≤ 1.5 MB |
| LCP | 396 ms | 404 ms | ≤ 2.5 s |
| CLS | 0 | 0 | < 0.1 |
| Third-party on load | 0 | 0 | 0 |

The +1 498 B of HTML is **not** the noindex meta (48 B). It is the absolute URLs that a `SITE_URL` build emits and the previous no-`SITE_URL` build did not: canonical, two `hreflang`, `og:url`, four `og:image*`, and the JSON-LD `@id` / `url` / 11 `image` entries. A production build carries the same weight. LCP moved 8 ms, inside this machine's ±10 ms jitter.

### Look

`shoot.mjs` `final/shots/seo-4/` vs `final/shots/round-7/`: same page heights (desktop 11 689, phone 13 032) and counts (15 / 18). Pixels differing (channel delta > 8): **0.00 % on 31 of the 33 captures**. The two that move are the two known sources, both present in every earlier round:

- desktop-00 297 px (0.02 %) and mobile-00 232 px (0.02 %), scattered over the whole frame — the canopy draws its leaves randomly. Both captures have leaves (checked `seo-4/desktop-00.png`); the blank-canopy flake did not happen this run.
- desktop-11 5 722 px (0.44 %), in the box x 1069…1117, y 602…721 — the right edge of Rosa's widget, where its satellite tile had not finished painting in this shoot. Cropped and compared side by side: the widget is otherwise identical, and the rest of the frame is pixel-identical.

(`round-7` also holds `jsoff-*`, `nowebgl-*` and `reduced-*` captures, which `shoot.mjs` does not produce; they have no counterpart in `seo-4`.)

### What still depends on the real domain

1. **Everything in this section is temporary by design.** The moment the deployer builds with the client's own `SITE_URL`, `IS_PREVIEW` is false and the site is back to today's behaviour with no change to any file: allow-all robots with the owner's AI group, the `Sitemap:` line, `sitemap.xml`, canonical, `hreflang`, `og:*`, no robots meta, and no preview line in `/llms.txt`. **A production build that forgets `SITE_URL` is now a noindexed site, not a site with a missing canonical** — louder and safer than the old silent failure, but it must be in the deploy checklist.
2. **`*.workers.dev` is permanently treated as preview.** If a client's site were ever meant to live on its workers.dev URL for real, this rule would have to be revisited. That is not the plan (PLAN.md: Cloudflare Registrar domain per client), and I did not add an override.
3. **The preview will not be de-indexed later — it will never be indexed.** `noindex` on a page that is also `Disallow`ed is not read by a crawler that honours robots.txt, so the two are belt and braces for different crawlers, not a sequence. If the preview URL is ever pasted somewhere public and then retired, the cleanest removal is deleting the Worker, not a robots change.
4. **The "still wrong" list is unchanged** from the round-3 re-run: the site's name still differs from Google's "KA surf hostel and restaurant" (by decision); the schema gaps `seo.*`, `contact.geo`, `socials[]`, `alternateNames[]` are still proposed and not applied; `og:image` is still a 576×768 portrait rather than a 1200×630 crop; there is still no favicon or logo; the display headline is still a `<p>` (intended); the spot `<h2>` is still 113 chars. None of them is affected by the preview rule.
