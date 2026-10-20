# KA Surf Hostel v2: critic pre-score (station 4f, quick)

Run `2026-10-lk-surf-01` · critic 0.4.3 · rubric 0.3.1 · measured 2026-10-20 · round 1 of the v2 mockups
(designer 0.6.1, creative-director 0.5.1). Prompt assembled with `ONESHOT_RUN=2026-10-lk-surf-01 node tools/prompt.mjs critic`.

Dimensions 1–7 only (max 80). Dimension 8 belongs to visual-critic and experience-critic; I did not read
their reports. Gate at this stage: no hard fail, dimensions 1, 3, 7 each ≥ 6, scroll CLS (early and
settled) < 0.01. Dimensions 2, 5, 6 are reported, not gating.

**For comparison only (not part of the gate):** the earlier round (`sites/ka-surf-hostel-and-restaurant/mockups/*`,
the round-3 pages, built 2026-09) scored with the same tools, widths and order, against **today's** dossier and rubric.

## Method (same for all six pages, in this order)

1. `tools/audit-mockup.mjs` (390 × 844 phone, 1.6 Mbps / 150 ms / 4x CPU), run from a scratch tree that
   symlinks each `dist/` and `copy/`, so neither the designer's untracked v2 `audit.json` nor the committed
   earlier-round `audit.json` was overwritten (`git status` clean for the earlier round). Copies:
   `evidence/{new,earlier}-<variant>.audit.json`.
2. `tools/shoot.mjs` at 1440 × 900 and 390 × 844 **over http** (own static server on 127.0.0.1, not
   file://, so the web fonts load), into a scratch folder. Contact sheets read, screenshots deleted;
   `evidence/*.shoot.json` kept (0 console errors on all six). The designer's shared `shots/` were shot
   from file:// and were not used.
3. `tools/check-design.mjs <page> --no-shots`.
4. Playwright walk over a plain static server (`evidence/*.walk.json`): first-screen actions at 390,
   tap on the first-screen "Check dates", sheet contents, tap on the first sheet link (navigation
   recorded, external hosts blocked); 400 px scroll steps for overflow and lazy requests; Rosa/map with
   JavaScript off and with every third-party request blocked; at 1440 a Tab pass, Enter on "Check dates",
   12 Tabs inside the sheet, Esc, focus return; axe-core 4.14 (wcag2a/aa, 2.1a/aa) at 390 and 1440 after
   scrolling every reveal in; page text at 1440 diffed against `sites/<slug>/copy/en.json`, every
   remaining line traced to `dossier/ka-surf-hostel-and-restaurant-v2/dossier.json`.
5. Embed check: scroll each embed box to centre, wait 8 s (`evidence/new-embeds-as-built.json`), and a
   control run with only the `loading` attribute removed (`evidence/new-embeds-control-without-loading-lazy.json`).

There is no `dossier/<slug>/audit.json` (station 3b never ran for KA), so no `recommended` funnel target;
the primary action was checked against `dossier.booking` (engine Booking.com; Hostelworld and Agoda in
`other_engines`; `contact.phone`). The dossier has **no video** (`videos: null`) and no photograph ≥ 1920 px
(largest 1024 px), so the two media hard fails do not apply.

## Summary

| variant | new round (1–7, /80) | earlier round (1–7, /80) | hard fails (new) | hard fails (earlier, today's dossier) |
|---|---|---|---|---|
| calm "Patio" | **65.4** (pass on 1–7) | 42.8 | none | facts: Booking.com 9.5/10 (38) (dossier 9.4 / 39); non-Google address; "improvers … when the swell is up"; "Rates change with the season". Also scroll CLS 0.223 (back to designer) |
| interactive "Stories" | **60.8** (pass on 1–7) | 38.6 | none | same facts; scroll CLS 0.063 (back to designer) |
| unique "The roll" | **67.7** (pass on 1–7) | 48.4 | none | same facts, plus "you feel it about ten minutes after you drop your bag … come back wet" |

"Pass on 1–7": no hard fail, dims 1/3/7 ≥ 6, scroll CLS 0 / 0. The final result also needs dimension 8 ≥ 8
from both visual critics. The earlier round's facts failures come from the copy and dossier moving on
since September (dossier re-read 2026-09-25; Google-address rule 2026-09-23; copy rewritten), not from design.

### Playbook §4 budget, measured (390 phone, throttled, no scroll)

| line | target | v2 calm | v2 interactive | v2 unique | earlier calm | earlier interactive | earlier unique |
|---|---|---|---|---|---|---|---|
| first-load transfer | ≤ 1536 KB | 561 KB (10 req) | 686 KB (17) | 833 KB (28) | 507 KB (9) | 577 KB (9) | 252 KB (8) |
| JS (external) | ≤ 300 KB | 0 (inline) | 0 (inline) | 0 (inline) | 0 | 0 | 0 |
| largest image | ≤ 300 KB | 127 KB | 127 KB | 70 KB | 127 KB | 124 KB | 73 KB |
| fonts | ≤ 2 fam, ≤ 150 KB | Albert Sans + Kalam, 53 KB | Public Sans + Gochi Hand, 46 KB | Switzer + Nanum Pen Script, 50 KB | Outfit, 32 KB | Outfit, 32 KB | Outfit, 32 KB |
| LCP | ≤ 2500 ms | **2960 (+18 %)** | **3432 (+37 %)** | 1564 | **2752 (+10 %)** | **3048 (+22 %)** | 556 |
| CLS (load) | < 0.1 | 0.0001 | 0.0017 | 0.0009 | 0.005 | 0.041 | 0.0026 |
| scroll CLS early / settled | < 0.01 | 0 / 0 | 0 / 0 | 0 / 0 | **0.2232** / 0 (`section#here`, `section#family`) | **0.0632** / 0 (`section#rooms`) | 0.0007 / 0 |
| third-party hosts on load | 0 (Google Fonts tolerated at 4e) | fonts.gstatic.com | fonts.googleapis/gstatic | fonts.gstatic.com + **cdn.fontshare.com** | Google Fonts | Google Fonts | Google Fonts |

No line is over by more than 50 %, so no budget hard fail. Both LCP misses are the 127 KB hero WebP
(`img-006.webp`, the largest image) on the throttled phone.

### The embeds in v2 interactive and v2 unique never load (measured)

Both pages carry the Rosa widget and a Google Maps iframe as `<iframe data-src=… loading="lazy" hidden>`.
The script sets `src` when the box nears the viewport and un-hides the frame on its `load` event. Because
the frame is `hidden` (display: none) **and** `loading="lazy"`, Chromium never starts the request, so `load`
never fires: after 8 s at the block, `src` is set, 0 requests to rosa.surf / maps.google.com, frames are
`about:blank`, 0 × 0, and the plain-link fallback stays on screen (390 and 1440). Control: the same page
with only `loading` removed makes the widget request, the Rosa JSON request, and shows the widget at
358 × 500 in its 500 px box and the map in its 269 px box. Space is reserved correctly (box height
unchanged), and nothing is requested on first load. So the visitor sees a 500 px white card saying
"See today's forecast for Kabalana on Rosa" and a grey map card with "Open in Google Maps" (contact
sheets, beach and "Getting here" stops), never the widget. Fix: drop `loading="lazy"` (the script already
defers `src`) or un-hide before setting `src`.

`check-design` (facts, hard constraint 4): 0 problems, 0 warnings on all six. v2 calm: Albert Sans / Kalam on
`#F1F2FB`; v2 interactive: Public Sans / Gochi Hand on `#F1F2FB`; v2 unique: Switzer / Nanum Pen Script on
`#F1F2FB`; 0 all-caps labels and 0 labelled headings on each. Earlier round: Outfit only on `#F0F1F2`.

### Facts table (all three v2 pages)

| on the page | dossier key | result |
|---|---|---|
| KA Surf Hostel; "Surf, chill and feel at home in Ahangama" | `business.name`, `business.tagline` | match |
| Five-minute walk to Kabalana Beach | `location.distance_to_beach` | match |
| Kabalana sandy beach break for beginners and intermediates; The Rock reef A-frame for advanced | `location.spot` | match |
| 6 room types, bed lines | `room_types[]` | match |
| A/C + fan, lockers + fridge, hot showers, garden, filtered water, scooter + surf rack, laundry, minimarket, luggage, tour desk, 24 h reception and security, airport transfers, bicycle parking, pets on request no charge | `facilities[]`, `business.description_long` | match |
| Breakfast: rotis, fruit, pancakes, eggs, vegan options | `business.description_long` | match |
| Children not accommodated; no cots or extra beds | `house_rules[1]` | match |
| Check-in 13:00–23:00, check-out by 13:00; reception 24 h | `hours_note` | match, but `contradictions[1]` (Booking.com says 24 h) is "unresolved — ask the owner" |
| Staff 9.9 on Booking.com and on Hostelworld; value for money and security 10 | `reviews.booking.categories.Staff`, `reviews.hostelworld.categories` | match |
| 9.8/10 Hostelworld (66) · 9.4/10 Booking.com (39) · 4.8/5 Google (42), "read on 25 Sep 2026" | `reviews.*` refreshed 2026-09-25 | match (the page uses the dossier; `copy/en.json` still says 9.5 / 38, designer notes it) |
| 5 quotes, authors, sources, Feb/Mar 2026 dates | `reviews.quotes[]` | verbatim (script check: 5/5 on each page) |
| 207/A Welahangoda, Ahangama 80650, Sri Lanka | `location.address` + postcode from `address_other_platforms[0]` | match per playbook §6 refinement (1); source noted in the earlier `copy/sources.md` l. 51 |
| Airport about 5 km, station a little over 2 km, shuttle | `location.nearby` (3.3 mi, 1.3 mi), `facilities` | match |
| +94 77 374 6053 / `tel:+94773746053` | `contact.phone` | match |
| Hostelworld / Booking.com / Agoda URLs, Instagram, Google Maps URL | `contact.socials`, `booking` | match, character for character |
| "Every photograph on this page is KA's own" (unique) | all 24 `images[].license: business-owned`, no stock used | match |
| Rosa headline (interactive, unique): 0.7–1.1 m chest-high, swell 1.3 m at 12.6 s from the south (184°), wind 6.5 km/h from the west, cross-shore, "**Sun** 21 Sep 2026, 20:30" | 4e fixture `agents/designer/fixtures/rosa-kabalana.json` (`current`) | values match; **weekday wrong: 2026-09-21 is a Monday** |

Mapping: dossier "Kabalana beach break" → Rosa `kabalana` (concepts.md); `spot=kabalana` in the widget URL
and the credit link `https://rosa.surf/spot/kabalana`. Widget URL and `sandbox` are Rosa's own embed code
(`agents/designer/tools.md`). Headline: no day-by-day boxes.

---

## v2 calm "Patio" · 65.4 / 80 (1–7)

```
mode: quick   round: 1   variant: calm
total (1–7): 65.4 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table above: 0 mismatches, 0 unsourced. `audit.facts` unmatched numbers 9.4, 39, 25, 2026 = refreshed dossier ratings and read date. −1: publishes the check-in window while `contradictions[1]` is open. |
| 2 | mobile + perf | 6 | One budget line over: LCP 2960 ms (+18 %), hero `img-006.webp` 127 KB. Everything else inside; scroll CLS 0 / 0. 390 sheet (16 stops): no horizontal overflow (scrollWidth 390 at every 400 px step), persistent "Check dates" + call bar from the second stop on. |
| 3 | booking CTA | 9 | 390: first screen "Check dates" (358 × 56). Tap opens popover `#book`, focus on Close; it holds Hostelworld, Booking.com, Agoda and `tel:+94773746053`, all exact to the dossier. First sheet link navigates to the Hostelworld listing. JS off: the trigger is a plain Hostelworld link (4 booking links in `#book`, 17 on the page). −1: hero to engine is 2 taps; the hero action is Hostelworld, not `booking.engine_url` (Booking.com), a concepts.md choice with no 3b target to check it against. |
| 4 | brand fit | 8 | §3 order present: KA's own photograph + what/where + action on the first screen, rooms, what's included, guests, breakfast, amenities, Kabalana, Instagram, getting here, contact footer. No forecast, no map (concept choice). −2: the spot (Kabalana) comes after amenities and guests, later than §3 item 4; no rates (dossier gap, stated). |
| 5 | copy | 9 | Words are `copy/en.json` plus labels ("In your room", "Around the house", "Call the family", "The boards, the beach and the table, as KA posts them."). English complete. −1: copy still carries 9.5 (38); the page silently overrides it with the dossier value. |
| 6 | accessibility | 7 | axe 0 violations at 390 and 1440. 31 images, 0 without alt. Skip link, `lang="en"`, 2 px solid focus outline on every Tab stop. Esc closes the sheet and focus returns to "Check dates". Reduced motion: photograph visible, no canvas. −3: the sheet is a non-modal `popover`: after 12 Tabs focus has left it (rubric: drawers trap focus); 2 of 36 tap targets under 44 px (brand 123 × 43, phone link 159 × 24). |
| 7 | security + delivery | 9 | Static, inline JS, relative paths, lowercase filenames, no secrets. No embeds; 0 non-font third-party requests on load and over a full scroll. −1: fonts from fonts.gstatic.com (allowed at 4e, self-host at 4g). |

**For the human:** the only v2 page with no third-party embed; LCP 2.96 s is over the 2.5 s line on the
throttled phone. Fonts Albert Sans + Kalam on `#F1F2FB`.

**Top 3 fixes:**
1. Bring LCP under 2.5 s: a smaller/AVIF first-screen print than the 127 KB `img-006.webp`.
2. Make the booking sheet keep focus while open (modal `dialog`, as interactive and unique do) and lift the brand mark and phone link to ≥ 44 px.
3. Move "Kabalana" (the spot) up to §3 item 4, ahead of guests and amenities.

---

## v2 interactive "Stories" · 60.8 / 80 (1–7)

```
mode: quick   round: 1   variant: interactive
total (1–7): 60.8 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | Same traced set as calm, 0 dossier mismatches. Rosa headline values match the fixture. −1 check-in contradiction (as calm); −1 the headline says "**Sun** 21 Sep 2026", but 21 Sep 2026 is a Monday. |
| 2 | mobile + perf | 5 | LCP 3432 ms (+37 %), the largest over-budget line of the v2 pages (same 127 KB hero WebP). Rest inside; scroll CLS 0 / 0. 390 sheet (17 stops): no overflow; story frame, chapter circles, persistent bar. |
| 3 | booking CTA | 9 | First screen "Check dates" (358 × 52); tap opens `dialog#book` with focus on Close; same four links, exact; first link lands on Hostelworld. JS off: plain links (4 in `#book`, 16 on the page). −1 as calm (2 taps, Hostelworld over `engine_url`, no 3b target). |
| 4 | brand fit | 7 | §3 order present, spot with forecast before Instagram and getting here. −3: the two embed boxes never fill (above): the visitor gets a 500 px white card with a link where the Rosa widget should be, and a grey map card. |
| 5 | copy | 9 | `copy/en.json` plus labels and the fixture headline. −1 copy's stale 9.5 (38), as calm. |
| 6 | accessibility | 8 | axe 0 at 390 and 1440; 33 images, 0 without alt; skip link; focus outline; dialog keeps focus over 12 Tabs, Esc closes, focus back on "Check dates"; story has a pause control; reduced motion static. −2: 2 of 47 tap targets under 44 px (brand 124 × 42, story pause button 32 × 32). |
| 7 | security + delivery | 7 | 2 embeds (the maximum), 0 requests on first load, space reserved (box 500 / 269 px, unchanged), plain link with JS off and with requests blocked. −3: hard constraint 9 not met: after scrolling to the block, 0 requests to Rosa (widget or JSON) and 0 to the map. The frames never load because they are `hidden` + `loading="lazy"` (control run with `loading` removed loads both). Google Fonts at 4e. |

**For the human:** the Rosa widget and the map never show on this page as built; LCP 3.4 s is the
slowest of the six. Fonts Public Sans + Gochi Hand on `#F1F2FB`.

**Top 3 fixes:**
1. Make the embeds load: remove `loading="lazy"` from the two `data-src` iframes (or un-hide them before setting `src`); re-check one widget + one JSON request after scroll.
2. Bring LCP under 2.5 s: a lighter first story frame than the 127 KB `img-006.webp`.
3. Correct the forecast weekday ("Mon 21 Sep 2026", or derive it from the data at 4g) and make the story pause button ≥ 44 px.

---

## v2 unique "The roll" · 67.7 / 80 (1–7)

```
mode: quick   round: 1   variant: unique
total (1–7): 67.7 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | As interactive: 0 dossier mismatches; "Every photograph on this page is KA's own" holds (24/24 business-owned, no stock). −1 check-in contradiction; −1 "Sun 21 Sep 2026" (a Monday). |
| 2 | mobile + perf | 9 | Every line inside: 833 KB, LCP 1564 ms, largest image 70 KB, 2 families 50 KB, CLS 0.0009, scroll CLS 0 / 0. 390 sheet (17 stops): no overflow; the first screen is the title cell + button + photo grid; persistent bar after the cell's button scrolls away. −1: heaviest first load of the six (28 requests). |
| 3 | booking CTA | 9 | First screen "Check dates" (358 × 52); `dialog#book` with the same four exact links; first link lands on Hostelworld. JS off: plain links (4 in `#book`, 15 on the page). −1 as calm. |
| 4 | brand fit | 7 | §3 order present (rooms, staff/guests, breakfast, amenities, beach + forecast, Instagram, getting here, footer). −3: the same two empty embed boxes as interactive, on the cyan beach field and in "Getting here". |
| 5 | copy | 9 | `copy/en.json` plus labels ("Staff, on Booking.com", "24 hours / Reception", footer ratings line). −1 stale copy rating, as calm. |
| 6 | accessibility | 10 | axe 0 at 390 and 1440; 46 images, 0 without alt (the roll's frame links are named by their image alt, `tabindex=-1`); 0 of 43 tap targets under 44 px; skip link; dialog keeps focus over 12 Tabs, Esc closes, focus returns to "Check dates"; idle swaps stop at first input; reduced motion static. |
| 7 | security + delivery | 6 | As interactive: 0 requests on load, reserved boxes, fallback links, but the Rosa widget, the Rosa JSON and the map never load after scrolling (−3). −1: fonts from `cdn.fontshare.com` as well as Google, outside the Google-Fonts exception in critic `tools.md`; treated as a 4e font CDN, not as a hard fail (if Shahar rules otherwise, this page hard-fails "third-party request on first load"). |

**For the human:** the only v2 page inside every budget line (LCP 1.56 s); it shares interactive's empty
Rosa and map boxes, and loads Switzer from Fontshare. Fonts Switzer + Nanum Pen Script on `#F1F2FB`.

**Top 3 fixes:**
1. Make the embeds load (same one-attribute fix as interactive) and re-check after scroll.
2. Self-host Switzer (now a second third-party font host on first load).
3. Correct the forecast weekday ("Mon 21 Sep 2026", or derive it from the data at 4g).

---

## Earlier round (comparison only, today's dossier and rubric)

| variant | 1 facts | 2 perf | 3 CTA | 4 fit | 5 copy | 6 a11y | 7 delivery | total /80 |
|---|---|---|---|---|---|---|---|---|
| calm | 2 | 5 | 8 | 6 | 6 | 5 | 9 | 42.8 |
| interactive | 2 | 4 | 7 | 5 | 6 | 5 | 8 | 38.6 |
| unique | 2 | 8 | 9 | 7 | 5 | 6 | 8 | 48.4 |

- **Facts (all three, hard fail today):** Booking.com "9.5/10, 38 reviews" vs dossier 9.4 / 39 (re-read 2026-09-25);
  address "No 207/A, Welhengoda, 80650 Ahangama, Sri Lanka" is Booking.com's, not the Google listing
  (playbook §6); "suits beginners and improvers, with The Rock reef alongside it when the swell is up"
  (dossier: The Rock for advanced, nothing on swell); "Rates change with the season" (`season` is a gap);
  "which guests mention more often than anything else"; unique also "you feel it about ten minutes after you
  drop your bag … come back wet".
- **calm:** scroll CLS 0.2232 (`section#here`, `section#family`) → back to designer; LCP 2752 ms; 17 of 24 tap
  targets under 44 px ("check dates" 85 × 25); axe `scrollable-region-focusable` × 3 at 390; booking links exact, plain links.
- **interactive:** scroll CLS 0.0632 (`section#rooms`), load CLS 0.041, LCP 3048 ms; Rosa block shows five
  day-by-day boxes (Mon 21 … Fri 25, playbook §4 forbids) and no Rosa widget; axe colour-contrast 4.11:1 on
  `.saketh > .by`, `scrollable-region-focusable` × 2; Enter on "Check dates" did not open the drawer at 1440;
  `audit.no_js.booking_links_reachable` 0 inside `#book`.
- **unique:** inside every budget line (252 KB, LCP 556 ms); OSM map and Rosa widget load lazily after scroll
  (OSM at y 10400, Rosa widget at 11200, JSON at 11600), reserved 320 / 500 px; 14 of 20 tap targets under
  44 px; at 390 two early stops are blank green leaf panels (scroll-driven content, contact sheet stops 01–02).

## What the designer prompt got wrong

The v2 designer's own checks never observed an embed actually rendering: the notes record "lazy, reserved,
plain-link fallback" for the Rosa widget and the map, but on both pages that carry them the iframes combine
`hidden` with `loading="lazy"` and a script that waits for `load` to un-hide them, so Chromium never fetches
them and the visitor only ever sees the fallback cards. The designer prompt should require, before hand-off,
a scrolled run that shows the widget frame and the Rosa JSON request in the network log (hard constraint 9's
check, run by the designer), and should say that `loading="lazy"` must not be combined with `hidden`/`display:none`
on a frame whose `src` the script already defers. Two smaller items repeat across the variants: hero prints
of 127 KB push LCP over 2.5 s on the throttled phone (calm, interactive), and a hand-typed weekday in the
4e Rosa fixture headline ("Sun" for Monday 21 September 2026).
