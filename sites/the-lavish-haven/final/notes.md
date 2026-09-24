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
| 4 strip | img-073 | 4:5, focalX 60 | Wooden chairs and a low table on a balcony beside a mottled grey wall, the pool below *(round 2; was "…textured stone wall…", HF-1)* |
| 5 strip | img-021 | 4:5, focalX 50 | A bed under a pitched white ceiling, grey-green curtains either side of a glass door |
| 6 strip | img-028 | 4:5, focalX 55 | Two beds under a timber ceiling, a wooden chair at a desk, a glass door at the far end |
| 7 strip | img-071 | 4:5, focalX 45 | A balcony with wooden chairs and a low table under white-painted rafters, looking into palms *(round 2; was "…under a white timber roof…")* |
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

## 4g round 2 (critic full round 1 FAIL 70, fix list items 1–4 only; 2026-09-23)

Fixed only items 1–4. Items 5 (dates on the in-copy ratings, 4a→4c or a Shahar ruling) and 6 (night-line
schema field, Shahar) are not mine and are untouched. Scratch: `scratchpad/lavish-4g2/` (harness scripts,
round-1 `dist` snapshot `dist-r1/`, every run's raw output). Shots and data: `shots/4g-round-4/`.

### 1. Alt texts (HF-1) — every photograph looked at again, one row each

Source files opened one by one (`dossier/the-lavish-haven/assets/img-NNN.jpg`, 1024×768). Material,
time-of-day and room-type words treated as claims.

| slot | asset | what the photograph shows | alt now | verdict |
|---|---|---|---|---|
| 0 | img-002 | night; pool with underwater lamps lit; two storeys of lit rooms with balconies behind | The pool at night, lit from below, with two storeys of lit rooms and balconies behind it | holds, unchanged |
| 1 | img-079 | from an upper floor: pool, crazy-paved stone courtyard with joints between stones, lawn, terracotta tile roofs, palms behind | The pool and the stone-paved garden seen from above, with palms behind the tiled roofs | holds (individual stones visible), unchanged |
| 2 | img-069 | covered balcony, four weathered wooden chairs, low wooden table, railing, pool below | A covered balcony with wooden chairs and a low table, looking down through the railing to the pool | holds, unchanged |
| 3 | img-007 | bed, wooden staircase to a loft, warm lamp light on smooth rendered walls | A bedroom with a wooden staircase up to a loft, warm light on plaster walls | holds (same trowelled finish the critic called plaster), unchanged |
| 4 | img-073 | balcony, wooden chairs and low table, one continuous grey-green trowelled wall with a framed relief, no joints, no stones; pool below through the railing | **Wooden chairs and a low table on a balcony beside a mottled grey wall, the pool below** | **changed: "stone" was false (HF-1)** |
| 5 | img-021 | bed, pitched ceiling of white-painted boards and beams, grey-green curtains either side of a glazed door | A bed under a pitched white ceiling, grey-green curtains either side of a glass door | holds, unchanged |
| 6 | img-028 | two beds, pitched planked (timber) ceiling, carved wooden chair at a built-in desk, glazed door at the far end | Two beds under a timber ceiling, a wooden chair at a desk, a glass door at the far end | holds, unchanged |
| 7 | img-071 | balcony, wooden chairs and low table; the roof is white-painted rafters under corrugated sheeting, not a timber roof; palms and other trees | **A balcony with wooden chairs and a low table under white-painted rafters, looking into palms** | **changed: "timber roof" named the wrong material for the roof (the rafters are timber, the sheeting is not)** |
| 8 | img-017 | made bed, rolled/folded towels on a stool, tall window on the left, painting of a breaking wave | A made bed with folded towels, a tall window on one side and a painting of a wave on the wall | holds, unchanged |
| 9 | img-008 | loft bedroom seen over a timber balustrade, purple curtains | A loft bedroom behind a timber balustrade, with purple curtains | holds, unchanged |

Changed in `scripts/seed-from-dossier.mjs`; `npm run seed` → `src/tenant/content.json` differs only in these
two `alt` strings; rebuilt. Alt text draws no pixels (0 px in every compare below).

### 2. Words glued in the text layer

Every visual gap between two phrases is now also a space in the markup: hero lines, rating score/text/date,
room label/beds, amenity label/note, quote/author, forecast lines and credit/updated, drawer
name/rating/"Check dates", "Or call"/number. Where the parts are blocks, flex or grid items the space is
not drawn. The amenity note sits inline with its own 8 px margin, so there the separator is a no-break
space in a `font-size:0` span (`.amen li .sp`): a plain space drew nothing either, but added a line-break
point and re-wrapped two rows at 320 px, so it was replaced (seen in the diff, not assumed).

Check (`gluecheck.mjs`, forecast live, whole page incl. the drawer, 390 and 1440): adjacent text nodes with
no whitespace inside one line-level element — round 1: **34** (7 amenity rows, 2 × "reviewsread…", 9 rooms,
5 quotes, hero lines, forecast, drawer); round 2: **0** at both widths. Aria snapshot now reads "Outdoor
swimming pool open all year", "Free private parking reservation needed", "… additional charge" ×5
(`data/aria-390.yml`). `innerText` JS off and JS on read for any other joins: none.

### 3. Static rim at phone width

Cause: with no animation nothing rewrites `#rim`'s points, so ≤ 760 px kept the desktop outline from the
markup while the pool took the phone clip. Fix: a second polygon `.m` with the phone outline
(`24,60 100,54 100,100 36,100 4,82`, the pool's own clip) shown only when `:root:not(.motion)` at ≤ 760;
`#rim` hidden there. With motion on, `.m` is `display:none` and `#rim` is driven by the script exactly as before.
Result on the static paths: the rim now matches the pool, and both sit under the night block, so the first
screen is words, ratings and then the night panel, with no line (`static-rim-after-jsoff.png`,
`static-rim-after-other.png`; before: `static-rim-before-r1.png`).

Check (`rimcheck.mjs`): every text line box vs every visible rim segment (stroke width included, clipped
where the night block paints over it), JS off / reduced motion / no WebGL × 15 widths (320–760) × 5 heights
(568–932), plus the motion path at 844 tall: **round 1: 210 of 225 static runs crossed text, round 2: 0 of 240
runs.** Looked at the first screens, not only the count. One thing seen that is not text: at 320 × 932 (and
any phone taller than the page's hero + night block) a 55 px strip of the pool shows below the night block;
it now carries its rim edge, as the pool's outline does everywhere else
(`static-320x932-stage-bottom-r1-vs-r2.png`). No text there.

### 4. Rosa widget failure → plain link

Cause: a cross-origin iframe fires `load` even when its request fails (it loads the browser's error page),
and `load` alone set `.on`, which hid the link and showed an empty box. Fix (`site.js`, `widget()`): one
CORS `HEAD` to the widget URL first (rosa.surf answers HEAD 200 with `access-control-allow-origin: *`,
checked live 2026-09-23); only if it answers OK is the frame given its `src`, and the frame is shown only
after `load`; a failed/erroring HEAD or no `load` within 10 s removes the `src` and leaves the link, which is
visible in the same reserved box from the start. The headline keeps its data (its own request succeeded).

Matrix (`fcstates.mjs`, `data/fcstates.json`), block **on screen** when each result lands, 390 / 1440 / 1525:
the 5 JSON paths (success 1.5 s · 404 1.5 s · abort 3 s · hang to the 10 s timeout · stale 30 h) = the 15
earlier runs, plus JSON fresh and the widget failing: abort at once · **slow failure (abort after 3 s)** ·
hang to 10 s · HTTP 500 · slow success (3 s). **33 runs: every failure ends with the link visible, `src`
removed, frame hidden; every success with the widget visible; CLS 0, the headline box, widget box and
`#h-prac` at identical page coordinates before and after, 0 third-party requests before the scroll, 0 page
errors** (the only console lines are the browser's own "Failed to load resource" on the failure paths).
The same harness on the round-1 build reproduces the bug: widget abort and slow abort → `on`, link hidden,
empty frame (`forecast-widget-fail-r1-vs-r2.png`).

Not covered, stated: HEAD succeeds but the frame's own GET then fails (a blocker that filters only
sub-frames, or the network dropping between the two requests). That case still shows an empty box
(`widget-getabort` in the data). It cannot be detected from outside a cross-origin frame without a
message from Rosa's widget, which sends none (checked `rosa/web/public/widget/index.html`: no
`postMessage`). Cost on success: one extra HEAD request to rosa.surf after the scroll.

**Shared mechanics:** the same `load`-only widget loader is in the KA build
(`sites/ka-surf-hostel-and-restaurant/final/src/scripts/site.js` line 68) and the Layday build
(`sites/layday-surf-ahangama/final/src/scripts/site.js` line 91), so the empty-box path is open there too
(read in the source, not run). KA's map loader already uses a HEAD probe; its Rosa loader does not.
Not touched.

### Look — 0 px except where a fix must change pixels

`pxdiff.mjs` (round-1 `dist` vs round-2 `dist`; water canvas hidden, swell animation frozen, Rosa JSON a
fixture, widget a stub, so both sides are deterministic): **36 of 40 compares 0 px**: JS-off full page at
768 / 1024 / 1440, reduced motion full page at 1440, the animated path at 390 (15 viewports) and 1440 (13
viewports) top to bottom, drawer and drawer-from-a-room at 390 and 1440. The 4 that differ are exactly the
static phone hero rim (JS off 320 / 390 / 600, reduced 390; every diff pixel above the night block, y
231–398). Page heights unchanged: 10 273 px (1440), 11 389 px (390). Gold vs build:
`compare-gold-desktop.png`, `compare-gold-mobile.png` (gold-ref left, round 4 right): same as round 1.

### Checks re-run

- `npm run build`: clean, 0 warnings. `index.html` 60 765 B (was 58 239: the spaces, the second polygon,
  the CSS and the loader).
- `check-design.mjs … --no-shots` (scratch copy, port 8763): **ok, 0 problems, 0 warnings**; Jost ×3, ground
  hsl(204 33% 97%), all-caps 0, labelled headings 0/12.
- `audit-mockup.mjs the-lavish-haven ../final` (scratch copy, port 8764) → `final/audit.json`
  2026-09-23T11:48:19Z: **589 031 B / 12 requests, local only; LCP 412 ms; CLS 0; third-party on load 0**;
  JS as files 0 B (inline 16 780 B raw / 7 158 B gzip); font 26 576 B; largest image 122 396 B; images
  without alt 0; tap targets under 44: 0 of 18; skip link yes.
- `shoot.mjs` → `shots/4g-round-4/`: desktop 13 / mobile 15 captures, `errors []`.
- Servers on 8760–8764 stopped. Nothing deployed, ledger not written, nothing committed.

## 4g round 3 (critic full round 1 item 6: the night line from schema v0.6 `featureLine`; 2026-09-23)

One change. The line over the night-pool photograph was the first sentence of the pool block (offer[1]
¶1 S1, "The outdoor pool is in the middle of the hotel and open all year."). It is now the owner field
`featureLine` (schema v0.6), copy as passed in `copy/review.md` round 5: "A year-round outdoor pool, at the
centre of the hotel." (54/140). Scratch: `/tmp/claude-1000/…/scratchpad/lavish-4g3/` (outside the repo).
Shots: `shots/4g-round-5/`.

### What changed
- `scripts/seed-from-dossier.mjs`: `featureLine: copy.featureLine ?? null`. `npm run seed` →
  `src/tenant/content.json` differs by that one key only (git diff: 1 line added).
- `src/pages/index.astro`: `nightLine = (c.featureLine ?? '').trim()`; `<p id="nightLine">` is rendered only
  when it is non-empty (schema: empty = no line there). Slot-mapping comment updated; offer[1] no longer
  feeds the night line.
- `src/scripts/site.js`: the scroll script's two writes to the line are guarded (`if(line){…}`), so an
  empty field cannot throw and stop the rest of the scroll animation.
- `src/pages/llms.txt.js`: the line is added after the intro text (see below).

### Fit — 390 / 768 / 1024 / 1440 / 1525 / 1920, JS off, reduced motion, motion (`fit.mjs`)
New line: 2 lines at every width in every mode (old: 3 at 390 static, 3 on the motion path at
390–1525, 2 elsewhere). Text box inside its own box, inside the 16 px side margins, no horizontal page
overflow, and on the motion path (sampled every 40 px over the first 4 screens) never over the rising
photograph: **0 of 18 runs with overflow or overlap. 0 page errors.** Looked at, not only counted:
`nightline-motion-r2-vs-r3.png`, `nightline-jsoff-r2-vs-r3.png` (round 2 left, round 3 right per width).

### Pixels vs round 2 (`pxdiff.mjs`, same deterministic harness as round 2; 96 compares: JS off and
reduced full page ×6 widths, motion path ×6 widths top to bottom, drawer and drawer-from-a-room at 390/1440)
- Round 2 → round 3: 73 of 96 are 0 px. The 23 that differ are the line itself: at 768–1920 every diff
  bbox lies inside the line's text box, page heights unchanged. At 390 (JS off, reduced) the page is
  31 px shorter (one line fewer, 28 px × 1.12), so everything below moves up by that much.
- To prove nothing else moved: round 2's `dist` with only the line's text replaced by the new text vs
  round 3: **96 of 96 compares 0 px**, 390 included. So round 3 = round 2 + the new words, nothing else.

### Empty field
Scratch copy built with `featureLine: null`: no `<p>` in the night block, JS off / reduced / motion at
390 and 1440, 0 page errors; the photograph keeps its place (`featureline-empty.png`).

### llms.txt
Included. The file already carries the site's other short standalone owner lines — `tagline` (in the
summary) and `closing` (as "Rates") — so this kind of line is covered. Placed as its own paragraph after
the intro text, no new heading. llms.txt otherwise unchanged (diff: +1 line).

### Checks re-run
- `npm run build`: clean, 0 warnings. `index.html` 60 764 B (was 60 765).
- `check-design.mjs <scratch copy of dist>/index.html --no-shots`: ok, 0 problems, 0 warnings.
- `shoot.mjs` → `shots/4g-round-5/`: desktop 13 / mobile 15 captures, page heights 10 273 / 11 389 (as round 2), `errors []`.
- `audit-mockup.mjs` not re-run: the only page change is 11 fewer bytes of text and a guard in the inline script.
- Servers on 8760–8763 stopped. Nothing deployed, ledger not written, nothing committed.

## Header background, JS off (2026-09-23)

Shahar: "Lavish: give the header a background with JavaScript off." (critic full round 2, finding 2: with
JS off nothing adds `.solid` to the fixed `.bar`, so it stayed transparent over page text; 62 of 98
scroll positions at 390.) Scratch: `/tmp/claude-1000/…/scratchpad/lavish-header/` (outside the repo).
Shots: `shots/jsoff-header/`.

### What changed
- `src/pages/index.astro`, one line in `<head>` after the inline stylesheet:
  `<noscript><style is:inline>.bar{background:var(--paper)}</style></noscript>`. The page's ground
  (#F5F8FA), fully opaque, at every scroll position. The JS path's `.solid` is the same colour at 92 %
  with a blur. The no-JS bar is opaque because the brief asks that no text show through. `<noscript>` is
  not parsed when JS runs, so the motion path and the reduced-motion path (JS on, `headerOnly()`) never
  see it. `:root:not(.motion)` was not used: it also matches reduced motion.

### JS off, 390 / 768 / 1440 / 1525 (`jsoff.mjs`, every 97 px, as the critic measured)
| width | steps | bar background | steps not opaque | bar pixels ≠ bar at top | text under the bar's links (geometry) |
|---|---|---|---|---|---|
| 390 | 98 | rgb(245,248,250) | 0 (was 98) | **0** (was 97) | 62, now hidden under the ground (was drawn through) |
| 768 | 97 | same | 0 (was 97) | **0** (was 93) | 57 |
| 1440 | 91 | same | 0 (was 91) | **0** (was 71) | 31 |
| 1525 | 94 | same | 0 (was 94) | **0** (was 73) | 29 |

"Bar pixels ≠ bar at top": at each step I captured the bar's box and compared it to the capture at scroll 0.
It is identical at every step and every width, so nothing passing under the bar shows through. The text
still passes under the bar by geometry, by design. It is covered now. See `bar-closeup-before-after.png`
(the critic's example, "The Lavish Haven" over the wave panel, is gone) and `steps-<w>-before-after.png`
(the whole page, top row before, bottom row after).

### First screen vs the gold page (JS off, scroll 0)
Before → after: **924–969 px differ, all inside the bar's own glyphs** (bbox y 14–62: "The Lavish Haven"
and "Check dates"). No other pixel moved. This is the text's anti-aliasing, not the layout. Headless Chromium
on Linux switches to subpixel (colour-fringed) text once the text sits on an opaque background (zoomed:
the letters are the same shape). Phones and macOS draw greyscale text, so they should show no change,
but I did not check that on a device. So gold → after is 924–969 px further than gold → before (132 524 → 133 448 at 390),
and all of the extra is in those glyphs. Two other ways to paint the bar still had 350–700 px of the same
fringe (`will-change`, a 99.6 % ground), so I kept the plain opaque ground.
`first-screen-<w>-gold-before-after.png`.

### JS on: unchanged
- Deterministic `pxdiff.mjs` (water canvas hidden, swell frozen, Rosa fixture and widget stub; the 4g-round-3
  harness), before `dist` vs after `dist`: **90 of 96 compares are 0 px**. Motion path top to bottom at
  390 / 768 / 1024 / 1440 / 1525 / 1920, **reduced motion full page at all six widths**, drawer and
  drawer-from-a-room at 390/1440: all 0 px. The 6 that differ are the JS-off full pages, and only in the bar
  glyphs above (bbox y 14–62).
- `tools/shoot.mjs` at 390/1440, before vs after: the only frames that differ are the ones that also differ
  between two runs of the unchanged build (desktop 00–03, 10, 11; mobile 00–03, 13: the WebGL water, the swell
  animation, and the blurred bar over the swell). Every other frame is 0 px. Page heights 10 273 / 11 389,
  `errors []` on both. The raw shots cannot give 0 px on animated frames, so the deterministic compare above
  is the proof for those frames.
- CSSOM, JS on, 390/1440, motion and reduced: 1 stylesheet, 174 rules, the same html class and the same bar
  state (transparent at top, `.solid` 92 % when scrolled) before and after. 0 page errors.

### Checks
- `npm run build`: clean, 0 warnings. `index.html` 60 829 B (was 60 764).
- `check-design.mjs <scratch copy>/index.html --no-shots`: ok, 0 problems, 0 warnings. Jost ×3, ground hsl(204 33% 97%).
- `audit-mockup.mjs` not re-run: the only change is 65 bytes inside `<noscript>`, which is not parsed on the
  JS-on audit path.
- Servers on 8760–8765 stopped. Nothing deployed, ledger not written, nothing committed.
