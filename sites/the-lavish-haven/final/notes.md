# The Lavish Haven — 4g build, round 1 · the gold page

designer 0.3.4 · run `2026-09-ahangama-02` · pick: ledger line 244, `agent: "human"`, 2026-09-23T04:16:49Z
("the picked design is agents/designer/gold/the-lavish-haven.html"). Copy: `copy/en.json`, passed 4c
round 4 (ledger 2026-09-23T09:07:02Z). Source of the look: `agents/designer/gold/the-lavish-haven.html`.

## What this is

One Astro 7.3.3 project, static output: `dist/index.html` + `robots.txt` + `llms.txt` (+ `sitemap.xml`
only on a non-preview build). Toolchain symlinked from `spikes/payload/site/node_modules`, as KA and
Layday (no install). Shape copied from those two builds; nothing of their look.

| file | job |
|---|---|
| `scripts/seed-from-dossier.mjs` | CMS stand-in: writes `src/tenant/content.json` (schema v0.5 REST shape) + `src/tenant/media/` from `copy/en.json` + the dossier. `npm run seed`. Throws if the copy's slots change, a photo is not business-owned, or a rating has no `fetched_at`. |
| `scripts/fetch-tenant.mjs` | Layday's (= the spike's) fetch step, locales `['en']`; `npm run fetch` / `build:cms`. Not part of `npm run build`. |
| `scripts/photos.mjs` | build step: slots 0–2 4:3 (the gold's 1024×768 / 960×720 / 820×615 frames), slots 3+ 4:5 (the gold's 600×750 crops), cropped around the media doc's `focalX/focalY`; widths ≤ the crop, never enlarged; WebP + JPEG → `public/photos/`. |
| `src/pages/index.astro` | the page; every owner-editable value read from `content.json`. |
| `src/styles/site.css` | the gold stylesheet verbatim, then a "4g additions" block, each change commented. |
| `src/scripts/site.js` | the gold script verbatim except lines marked `4g:` (drawer line, parallax target, reduced-motion context, context loss) + the live Rosa loader replacing the gold's widget-only loader. |
| `src/lib/site.mjs` | helpers, interface wording, platform names, score/date formatting, preview rule, `postalAddress()`. |
| `wrangler.jsonc` | Worker `the-lavish-haven`, `./dist`. **Not deployed.** |

`npm run build` = `node scripts/photos.mjs && astro build`: clean, 0 warnings. No `SITE_URL` → preview
build: `noindex, nofollow` meta, robots.txt `Disallow: /` for `*` and every named AI crawler, no sitemap.

## Where the passed copy goes (no gold-page words kept)

| gold element | now |
|---|---|
| hero h1 (3 lines) | `tagline`, split into lines by `headLines()` (after a comma; a part > 16 chars at its middle word) → the same three lines |
| hero proof | `ratings[]`: score, "of <scale> on <platform>, <count> reviews", + "read 19 September 2026" |
| night line over the water | first sentence of `offer[1]` ("The outdoor pool is in the middle of the hotel and open all year.") — the gold's own pool sentence is not in the copy |
| "Off the main road, over the surf" + lead + body | `intro`: heading "Among cafés and restaurants", ¶1 as the lead, ¶2 as body |
| rooms heading + text + list | `offer[0]` (3 paragraphs now) + `rooms[]` (label; beds, note, sleeps) |
| "New, and it shows" | `about[0]`: ¶1 lead, ¶2 body. Gold's bold numbers dropped (plain-text schema) |
| "The staff are the reason people extend" | `about[1]` "Staying longer" + `testimonials[]` (verbatim, "<author>, on Booking.com") |
| "Pool, restaurant, spa" + amenities | `offer[1]` + `amenities[]` |
| wave big text + "Two minutes from the hotel, on foot." | `spot`: all but its last sentence large, the last sentence as the small line |
| practicalities | `info[0]` |
| closing headline | `closing` (schema v0.5) |
| footer | address `contact.address`, `contact.mapUrl`, `contact.phone`, `bookingLinks[]` labels |

## Gold-page strings not in the passed copy — what was done

| gold string | done |
|---|---|
| `<title>` / meta description | built from content (KA's rule): title "The Lavish Haven, Ahangama" (name + town parsed from the address); description = tagline + intro's first sentence + rooms heading, cut at a sentence ≤ 155. Final form is 4h's. |
| "Scroll, and it gets dark" | kept as interface text (`aria-hidden`, as in the gold): it describes the page's own motion and asserts nothing about the business. |
| ten alt texts | rewritten from looking at each photograph (table under `images`). Dropped: "king bed" ×2 and "family room" (room types the dossier does not tie to a photo), "from an upper balcony", "at midday" (not visible as fact). |
| drawer "The hotel takes bookings on these two listings…" | replaced by `closing` ("Rates move with the dates. Booking.com and Agoda show what is available."). |
| drawer "The same rooms, listed on Agoda" | dropped. Agoda's row shows its name only; Booking.com's row shows its rating from `ratings[]` + capture date. |
| "Front desk, staffed 24 hours" (footer heading and drawer, next to the phone) | footer heading → "Phone"; drawer → "Or call". Nothing says the number reaches the front desk. |
| script "…Look for it by that name on the listing." | cut to "You were looking at the <room>." |
| forecast with hard-coded numbers | live (below). No number is in the HTML. |
| Google Fonts (Jost) | self-hosted: fontsource `@fontsource-variable/jost` 5.3.0, latin, 26 576 B, OFL (`public/fonts/ofl.txt`), declared under the family name "Jost" the gold's `--font` already asks for. |
| "Two minutes from the hotel, on foot." / "Rates move… free." | now come from `spot` and `closing` in their passed wording. |

Words on the page not from content: interface labels only — "Check dates", "Close", "Or call", "Where",
"Phone", "Book", "Open in Google Maps", "Skip to content", "Scroll, and it gets dark", "read <date>",
"of", "on", "reviews", "sleeps", "You were looking at the", forecast labels ("Swell … s from the …",
"Wind … km/h from the …", "Updated …", "Forecast for Kabalana by Rosa", "See today's forecast for
Kabalana on Rosa"), and aria labels.

## Deviations from the gold look (all measured; compare sheets in `shots/`)

Compared capture by capture against the gold shot the same way (`shots/gold-ref/`, 1440 and 390):
`4g-round-1/compare-*.png` and `4g-round-3/compare-*.png` (gold left, build right); section by section
at 1525, 1024, 768: `4g-round-2/sections-*.png`, `4g-round-3/sections-1525.png`, `sections-1024.png`.
Layout, type, colour, shape, motion and photo crops are the gold's; what differs:

1. **Text lengths (copy changed, layout kept).** The "where" section is shorter (intro is 2 short
   paragraphs vs the gold's long lead), so everything below sits higher: page 10 273 px vs 10 531 at
   1440, 11 389 vs 11 323 at 390. Rooms text is 3 paragraphs (fits beside the list at every width).
   "New" has a short lead and a longer body (swap of weight vs gold). Guests heading "Staying longer"
   is one line where the gold's was two. Night line: 3 shorter lines where the gold had 3 (balanced; 66 vs 86 characters). Closing
   headline 3 lines at 1440 (gold 3). No overflow at 390, 768, 1024, 1440, 1525 (scrollWidth = width).
2. **The wave's small line** (spot's last sentence, 49 chars vs the gold's 36) broke into two ragged
   lines inside the gold's 17em box. Now `width:fit-content; max-width:34em`: one line at 1024/1440/1525
   (27 px tall), right edge flush with the big text (928/1305/1385 px); wraps normally on a phone.
3. **Capture date on each rating**: hero proof +1 line (15 px) under each score (first screen at 390:
   the pool starts where it did; the two rating lines each gain one line, see `4g-round-3/compare-mobile-a.png`). Drawer's Booking.com row: two lines.
4. **Forecast reserved box**: the headline column is fixed at 340 px (gold: `max-content`, 337 at 1440,
   340 at 1525) and `min-height` 262 px desktop / 252 px ≤ 900 (gold measured 255 / 260 / 249). Hidden
   until fresh data is drawn, so on failure or JS off there is an empty 262 px area left of the plain
   link (Layday's behaviour).
5. **Reduced motion — a gold bug fixed.** The gold page created an opaque WebGL context and never drew
   into it when `prefers-reduced-motion` was set: the pool was a **black** shape (seen on the gold page
   itself, 1440). The context is no longer created then, so the gold's CSS noon-blue gradient shows.
6. **WebGL context loss (headless)**: this build lost its context on 1 of 6 loads (gold 0 of 6, as
   Layday found). Setup is now re-runnable; on loss the canvas hides (gradient shows) and the water
   returns on restore: 6 of 6 loads drawn after the change.
7. **Tap targets at ≤ 760 px**: footer linked lines are 44 px rows (footer ~16 px taller per link,
   li gap 4 → 0); header name and Rosa credit get invisible vertical padding (no line moves).
8. `<picture>` (WebP + JPEG srcset) wraps every photo with `display:contents`, so each `<img>` sits
   where the gold's bare `<img>` did; parallax now moves the `<img>` inside.
9. Skip link (off-screen until focused). Strip's aria-label "Photographs of the hotel".

## Rosa forecast (live, KA/Layday mechanics)

One request to `https://rosa-data-opal.vercel.app/data/spots/kabalana.json` when the wave panel is
400 px from the viewport; with data < 24 h old the headline is drawn in the gold's form ("0.7–1.0 m",
"Wednesday 23 September, 08:30", "Swell 11.5 s from the south", "Wind 16.2 km/h from the west,
cross-shore", credit + "Updated 23 September, 07:56" — live values in `4g-round-3/desktop-10.png`),
and only then does Rosa's iframe get its `src` (markup exactly as tools.md, `theme=light`, metric).
Failure, 10 s timeout, stale, JS off, no IntersectionObserver/fetch, `file://`: the plain link "See
today's forecast for Kabalana on Rosa" in the 420 × 500 box.

Tested with the block **on screen** when the result lands (`4g-round-2/states/`, JSON routed to the
fixture with a 1 h / 30 h `generated_at`, widget stubbed): 390, 1440, 1525 × success (1.5 s) · 404
(1.5 s) · abort (3 s) · hang to the 10 s timeout · stale → **CLS 0, identical positions of the headline
box, the widget box and the next heading before and after, 0 third-party requests before the scroll**
on all 15 runs. Offline (all non-local aborted): `fc off`, link visible, Jost loaded, 10/10 images.

## Checks

- `node tools/check-design.mjs sites/the-lavish-haven/final/dist/index.html --no-shots` → **ok**, 0
  problems, 0 warnings; fonts h1/h2/body "Jost", ground rgb(245,248,250) = hsl(204 33% 97%), all-caps
  labels 0, labelled headings 0/12. *(Run from a scratch copy with only the port changed to 8762; the
  tool hard-codes 8960.)*
- `node tools/check-places.mjs the-lavish-haven` → 0 borrowed image uses, 0 failing. No stock image is
  used; all ten photographs are business-owned dossier assets.
- `tools/audit-mockup.mjs the-lavish-haven ../final` → `final/audit.json` *(scratch copy, port 8763)*:
  first load **581 530 B / 12 requests** (HTML 53 264 incl. inline CSS + JS, font 26 576, images
  501 690 — the lazy images near the fold load too, as on the gold), JS as files 0 B, **LCP 396 ms**,
  **CLS 0**, **third-party on load 0**, images without alt 0, **tap targets under 44: 0 of 18** (5 before
  the fix), skip link yes. Numbers not in the passed copy: "19", "2026" (the capture date).
  `no_js.booking_links_reachable` 0 and `keyboard` n/a: the tool looks for `#book` / `data-open-drawer`,
  which this page (like the gold) does not use — covered by hand below.
- Keyboard (1440, 390): Tab 1 = "Skip to content", Tab 3 = header "Check dates"; Enter opens the drawer;
  seven Tabs cycle Close → Booking.com → Agoda → phone → Close…, all inside; Esc closes; focus returns
  to "Check dates". A room row opens it with "You were looking at the Superior King Room." Drawer
  targets all ≥ 44. 0 page errors.
- JS off, reduced motion, no WebGL (getContext stubbed), 1440 and 390: static layout (`motion` off),
  night print visible, 15 booking links (13 Booking.com, 2 Agoda), Rosa link visible, 0 overflow, 0
  errors (`4g-round-2/checks/`).
- hrefs in the raw HTML: Booking.com ×13, Agoda ×2, `tel:+94764832988` ×2, Google Maps ×1, rosa.surf
  ×2 — each identical to the dossier (`booking.engine_url`, `booking.other_engines[0]`, `contact.phone`,
  `location.map_url`).
- `tools/shoot.mjs` rounds: `4g-round-1` (port), `4g-round-3` (final; `shoot.json` errors `[]`).

### Budget (playbook §4, mobile, first load, no scroll; `audit.json` 2026-09-23T09:27:33Z)

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 581 530 B, 12 requests |
| JS, compressed | ≤ 300 KB | inline only: 15 587 B raw / 6 733 B gzip; 0 B as files |
| Largest above-the-fold image | ≤ 200 KB | first screen is drawn (no photo); largest image on first load 122 396 B |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family, 1 file, 26 576 B |
| LCP | ≤ 2.5 s | 396 ms |
| CLS | < 0.1 | 0 on load; 0 on every forecast path with the block on screen |
| Third-party requests on load | 0 | 0 |

## Rounds

- **4g-round-1**: pure port on the passed copy + dates + live forecast. Compared with the gold: same
  page; found the wave's small line breaking in two.
- **4g-round-2**: walk-line fix; 1525/1024/768 section compares; forecast states; keyboard/JS-off/
  reduced-motion/no-WebGL/offline. Found: black pool under reduced motion (gold bug) and 5 small tap
  targets — fixed; WebGL context loss 1/6 — fixed.
- **4g-round-3**: final shoot + compares after all fixes.

Note: the `4g-round-2/sections-*.png` compares blocked all third parties, so the gold side there is in a
fallback font (its Jost comes from Google Fonts) and shows its hard-coded forecast; `4g-round-3/sections-*`
allow Google Fonts for the gold and are the like-for-like compare.

## images

| slot | asset | crop | alt |
|---|---|---|---|
| 0 night print | img-002 | 4:3, full | The pool at night, lit from below, with two storeys of lit rooms and balconies behind it |
| 1 where | img-079 | 4:3, full | The pool and the stone-paved garden seen from above, with palms behind the tiled roofs |
| 2 where | img-069 | 4:3, full | A covered balcony with wooden chairs and a low table, looking down through the railing to the pool |
| 3 strip | img-007 | 4:5, focalX 42 | A bedroom with a wooden staircase up to a loft, warm light on plaster walls |
| 4 strip | img-073 | 4:5, focalX 60 | Wooden chairs on a balcony with a textured stone wall, the pool below |
| 5 strip | img-021 | 4:5, focalX 50 | A bed under a pitched white ceiling, grey-green curtains either side of a glass door |
| 6 strip | img-028 | 4:5, focalX 55 | Two beds under a timber ceiling, a wooden chair at a desk, a glass door at the far end |
| 7 strip | img-071 | 4:5, focalX 45 | A balcony with wooden chairs under a white timber roof, looking into palms |
| 8 strip | img-017 | 4:5, focalX 55 | A made bed with folded towels, a tall window on one side and a painting of a wave on the wall |
| 9 strip | img-008 | 4:5, focalX 45 | A loft bedroom behind a timber balustrade, with purple curtains |

Identified by matching the gold's ten inlined images against `dossier/the-lavish-haven/assets/`
(grayscale signature distance ≤ 4.3 for every match, next-best ≥ 18); the strip crops' horizontal
offsets were measured the same way (123, 307, 205, 256, 153, 256, 153 px of 1024 → the focalX above;
built offsets 123, 307, 205, 256, 154, 256, 154). All ten: `license: business-owned` (property photos
on the Booking.com listing, approved 2026-09-19). All 1024×768 sources; none drawn wider than its
source (largest: the night print, ≤ 740 CSS px). No captions; no photo tied to a room type.

## facts — every fact on the page → dossier key

All words come from `copy/en.json` (passed 4c round 4; per-paragraph sources in `copy/sources.md`) or
the dossier.

| on the page | source |
|---|---|
| The Lavish Haven | `business.name` (copy `businessName`) |
| A new hotel, two minutes from Kabalana | copy `tagline` (`location.distance_to_beach`, reviews "brand new") |
| 9.2 of 10 on Booking.com, 34 reviews | `reviews.booking.rating/count` |
| 5.0 of 5 on Google, 21 reviews | `reviews.google.rating/count` |
| read 19 September 2026 (×3) | `reviews.booking.fetched_at`, `reviews.google.fetched_at` = 2026-09-19T18:55:00Z |
| all six copy blocks (incl. 9.6 location, 9.7/9.7/9.4 categories, Koggala 5 km) | copy blocks → `copy/sources.md` rows |
| night line | copy `offer[1]` ¶1 sentence 1 (`facilities[]`) |
| nine room rows, beds, "ground floor", sleeps 4/5 | `room_types[]` (copy `rooms[]`) |
| 25 amenity rows | `facilities[]` (copy `amenities[]`) |
| five quotes + authors, "on Booking.com" | `reviews.quotes[0,4,3,6,7]` (copy `testimonials[]`, verbatim) |
| Kabalana: … The beach is two minutes… | `location.spot`, `location.distance_to_beach` (copy `spot`) |
| Rates move with the dates… | copy `closing` (`gaps[]` offers, `booking.path.note`) |
| No166/1 Walhengoda Road, Ahangama 80650, Sri Lanka | `location.address` (Google, capitalised per playbook §6; copy `contact.address`) |
| +94 76 483 2988 | `contact.phone` |
| Booking.com / Agoda links | `booking.engine_url`, `booking.other_engines[0]` |
| Open in Google Maps | `location.map_url` |
| Rosa headline and widget | live Rosa data, facts-rule exemption; `kabalana` ← `location.spot` "Kabalana beach break" |

## editable — what the owner edits, and where (Payload "My site" form)

Basics: `businessName` (header), `tagline` (hero lines), `closing` (closing panel + drawer).
Text: `copyBlocks` by slot and order — intro[0] → "where"; offer[0] → rooms; offer[1] → pool/restaurant
+ its first sentence as the night line; about[0] → "new"; about[1] → guests; info[0] → practicalities.
`spot` (wave; last sentence becomes the small line). `rooms[]` (label, beds, note, sleeps).
`amenities[]`. Photos: `photos[]` order = slots (0 night print, 1–2 where, 3+ strip); focal point sets
the strip crop; the build crops and sizes. Contact & booking: `contact.phone`, `address`, `mapUrl`,
`bookingLinks[]` (first = every "Check dates" and room row). Deployer-only: `ratings[]` (incl.
`capturedAt`), `testimonials[]`, `forecast` (owner may switch it off). Not editable: layout, motion,
type, colour, interface labels.

## gaps

- `contact.whatsapp` is required by the schema and null in the dossier (`contact.whatsapp` gap, "not
  published"). Seeded null, as KA/Layday; booking path = Booking.com + Agoda + phone. Deployer decision.
- `season` null → not shown. No check-in/out times (`stayInfo` gap) → none shown.
- House number 166/1 vs 166/2 (copyeditor's open item) — the page prints the Google listing's 166/1.
- Testimonials have no dates (dossier has none) → none shown.
- No JSON-LD / Open Graph: station 4h. `postalAddress()` is ready for it.
- No Payload tenant; `content.json` is the seed. Payload collection is behind the schema (PLAN §9).

## conflicts

1. **Night line binding.** The gold's night line was its own sentence; the copy has no field for it.
   It is bound to the first sentence of `offer[1]` (so the line repeats in that section, as the gold's
   repeated in "where"). If the owner reorders the offer blocks, the line follows the block. A schema
   field would be cleaner — not invented; reported.
2. **German quote language.** Testimonials have no language field; the page marks a quote `lang="de"`
   by a heuristic (a German letter + two German words), as the gold marked Benjamin's by hand.
3. **"read"** is an interface word the gold did not have (same as KA/Layday).

## not verified

- A real phone, a real GPU, Safari, Firefox. Headless Chromium only (software GL).
- Rosa widget and JSON in a real browser (both answered in headless today; widget rendered).
- The `build:cms` path against a real Payload tenant (none exists).
- Real screen readers. Throttled LCP beyond the audit's one run.
