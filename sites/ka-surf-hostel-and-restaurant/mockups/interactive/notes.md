# KA Surf Hostel — mockup 2, "interactive"

Station 4e, round 2. Built 2026-09-20 on the **chart** archetype (`concepts.md` §3, concept 2
"Soundings"). See mockup 1's notes for why round 1 was replaced.

## direction

The chart **is** the first screen, pinned for three viewports, and as you scroll it washes out into
the water it describes.

The dissolve is not a crossfade laid over the artwork — it is driven *by* the artwork. The shader
reads the chart's own ink density: where the chart is dark (the coastline, the soundings, the
lettering) the paper holds on, and where it is blank it goes first. So the ink is the last thing to
leave, and for a moment the depth figures float on the real sea. `src/scripts/soundings.js`,
hand-written WebGL1, two textures, one full-screen triangle, 5 KB of JavaScript for the page. No
three.js, no CDN. references.md **#19** records that none of the six reference sites uses canvas at
all, so there was nothing cached to copy.

Below it: the same brand, an even masonry where every photograph keeps its own height, the six bed
types as a snapping rail with a peeking next card (**#14**, **#18**), and booking behind a
slide-down drawer (**#1**) with the actions centred.

## facts

Every word other than interface labels comes from `sites/ka-surf-hostel-and-restaurant/copy/en.json`,
which passed station 4c with 0 unsourced and 0 contradicted claims; `copy/sources.md` maps every
paragraph to its dossier fields. The three mockups carry identical content.

Two layout elements are the copy's own words re-set, not new claims: the **six breakfast items**
(rotis, hoppers, pancakes, eggs, a fruit platter, a vegan option if you need one) and the **three
distances** (Kabalana a five-minute walk, the station a little over 2 km, the airport about 5 km).
Both appear verbatim in the "Breakfast changes every morning" and "Getting here" blocks.

## gaps

- **No prices.** Nightly rates are live dated OTA inventory. The page says the three listings hold
  them. Pitch point.
- **No WhatsApp, no email, no website, no socials.** Every booking pays an OTA commission. The
  primary action is the listing KA already answers on, with `tel:` beside it. Nothing is guessed.
- **No season, no founding year.** Omitted.
- **The restaurant.** Google's listing name says "and restaurant"; no OTA mentions one and no menu
  exists anywhere. The page says **breakfast**, never restaurant.
- **TripAdvisor** 403s this harvester, so no TripAdvisor rating appears.

## images

**Two sources, kept apart (PLAN.md §9, amended 2026-09-20).**

*The hostel's own*, from `dossier/.../assets/`, 361–1024 px, used close and small — the long table at
night, the family on the veranda, a breakfast spread, a bowl of cut fruit, a bunk, an outdoor shower,
the garden. The largest any of them renders is about 290 px wide. None is marked `role: "bleed"`, and
`tools/build-mockup.mjs` would refuse it if one were: a photograph under 1200 px may not be full-bleed.
Seven assets are stored on their side inside a square frame and carry an explicit `rotate`.

*Atmosphere*, from `dossier/.../stock/`, freely licensed, of the place and never of the business:

| id | what it is | licence |
|---|---|---|
| `stock-008` | The Weligama Bay plan from Admiralty Chart 3730 — coastline, soundings and the reef line of this stretch of coast | Public domain |
| `stock-001` | An empty beach at Thiranagama on the south coast: shorebreak, wet sand, a line of palms behind | CC0 |
| `stock-006` | The shorebreak at Hikkaduwa under a heavy sky | CC BY 3.0 |
| `stock-003` | Sunset over the south coast, cloud lit orange behind palm silhouettes | CC0 |
| `stock-005` | A single palm leaning out over flat water | CC BY 2.0 |

Twenty were fetched and eleven rejected on sight — a candlelight vigil that a filename called
"Kabalana", and a five-star hotel's suite, rooftop and infinity pool. That last group is exactly what
the policy forbids: a borrowed room that reads as the room you would be booking. **Nothing borrowed
on this page shows an interior, a bed, a meal or a face.** Every use carries its credit in place, and
all of them are listed again in the footer.

## conflicts

1. **Borrowed photography on a page selling a specific business.** The line, from PLAN.md §9 and
   enforced as a hard fail in `rubric.md`: atmosphere may show the *place*, never the *business*. The
   test applied to every image here was whether a visitor could read it as "this is where I would be
   staying". Sea, sky, palms, shoreline and a nautical chart cannot. A hotel pool can, which is why
   five were deleted.
2. **The Rosa forecast is a third-party embed**, against playbook §4's "third-party requests on load:
   0". It is `loading="lazy"`, so it never appears on first load — measured, see below — and it is
   sandboxed. The spot sentence above it is dossier-sourced text and stands without it.
3. **`custom.md` asks for a booking drawer over a "complex booking engine".** There is no engine of
   ours to hide and playbook §5 forbids introducing a channel the owner does not monitor, so where a
   drawer exists it holds the three listings KA already sells through and says so.

## self-check

| Check | Result |
|---|---|
| Every fact traces to the dossier | pass |
| Booking targets match the dossier character for character | pass — Hostelworld, Booking.com, Agoda and `tel:+94773746053` |
| No photograph under 1200 px used full-bleed | pass — enforced by the build |
| No borrowed photograph readable as the business | pass — every atmosphere image is sea, sky, shoreline or chart |
| Every borrowed photograph credited | pass — in place and in the footer |
| Works with JavaScript off | pass — the chart pin shows the photograph, and every drawer trigger is an `<a href="#book">` landing on the footer booking block — 5 booking links reachable |
| Mobile 390 px / desktop 1440 px | pass — `shots/`, no overflow, no overlap |
| Tap targets ≥ 44 px | pass — 0 under 44 |
| Broken images | 0 |
| `tools/check-design.mjs` | pass — light ground, no padded picture boxes, no captions under photographs |

**Measured** with `node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant interactive` on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), first load with no scroll: 454 KB of the 1.5 MB budget · JS 5 KB of 300 KB · fonts 51 KB of 150 KB · largest image 278 KB of 200 KB · LCP 744 ms of 2500 ms · CLS 0.0151 of 0.1 · 0 third-party hosts. Every line inside budget. Raw numbers in `audit.json`.

## what a visitor would notice is different

Against **The Lavish Haven**: that site is a magazine built around a pool it owns and opens on a
photograph of it. KA opens on a chart of the coast and never claims a picture it did not take — the
close photographs are its own and stay small, the wide ones are credited to their photographers.
Against **Layday Surf**: Layday is a single bordered card read in panels on a sand field; KA is a
position on a coastline you travel along. See the divergence table in `concepts.md` §5.
