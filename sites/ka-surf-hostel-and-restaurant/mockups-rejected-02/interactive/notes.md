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

## correction, 2026-09-20 — the photographs were of the wrong places

The first build of this archetype put **Hikkaduwa** (about 33 km up the coast, and named in its own
file), **Weligama**, **Thiranagama** and **Negombo** (about 180 km away) on a page about Ahangama,
and cropped the Admiralty sheet to its **Weligama Bay** plan — a chart of a different bay, with the
name printed on it. Shahar: *"Hikkaduwa beach is NOT IN AHANGAMA. Weligama bay IS NOT IN AHANGAMA.
You should have caught that by yourself."* He is right. A photograph of somewhere else shown as this
place is a false claim about the business, in the same class as an invented price, and it should
never have reached him.

What changed, on disk rather than in a conversation:

- Every atmosphere image now records **`place`** (where it was actually taken) and **`place_ok`** —
  `local` for Ahangama itself, `neutral` for open sea, sky or a detail with no landmark and no other
  place named in its credit. `tools/check-places.mjs` fails a build that uses anything else, and
  warns when a source file's own name mentions a place the displayed credit does not.
- Fourteen images were deleted: Hikkaduwa, Thiranagama, the Weligama Bay plan, a US Navy tsunami
  clearance photograph, and nine tea-factory interiors that Commons files under "Ahangama".
- The page now uses **photographs of Ahangama**: the reef shelf and shorebreak, the beach with the
  stilt-fishing poles, the stilt fishermen. Plus chart texture and open sea that name nowhere.
- Those Ahangama photographs are **CC BY-SA**, which binds adaptations, so they are shown whole with
  their credit and are never cropped on disk or used as shader input. The shader inputs here are
  public-domain and CC BY only. The policy is in PLAN.md §9.

**The accent colour also changed**, from a chart red to the deep teal of the water off this coast.
Shahar: *"Orange buttons look outdated. Not a great CTA color, especially with this background…
feels cheap and outdated."* On a warm cream ground an orange button reads as a 2010s landing page,
which is the thing these sites are sold against. The rule is now in `agents/designer/base.md`.

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

| id | what it is | place | licence |
|---|---|---|---|
| `stock-025` | Open water, depth soundings and the compass rose from the 1908–09 Admiralty survey of this coast | neutral | Public domain |
| `stock-005` | A single palm leaning out over flat water | neutral | CC BY 2.0 |
| `stock-011` | The reef shelf and shorebreak at Ahangama under a high sky | local | CC BY-SA 4.0 · shown whole, never adapted |
| `stock-012` | The beach at Ahangama with the stilt-fishing poles standing out of the shallows | local | CC BY-SA 2.0 · shown whole, never adapted |
| `stock-003` | Cloud lit orange at sunset behind palm silhouettes | neutral | CC0 |
| `stock-007` | The sun going down over the Laccadive Sea | neutral | CC BY 3.0 |

Thirty-four were fetched across two rounds and twenty-four rejected on sight: a candlelight vigil
that a filename called "Kabalana", a five-star hotel's suite, rooftop and infinity pool, nine
tea-factory interiors filed under "Ahangama", and every photograph of a village that is not this
one. **Nothing borrowed on this page shows an interior, a bed or a meal, and nothing is of anywhere
but Ahangama or open water.** Every use carries its credit in place, and all of them are listed
again in the footer.

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
| `tools/check-places.mjs` | pass — every borrowed photograph is Ahangama or place-neutral, credited, and the share-alike ones are shown rather than adapted |

**Measured** with `node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant interactive` on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), first load with no scroll: 222 KB of the 1.5 MB budget · JS 5 KB of 300 KB · fonts 51 KB of 150 KB · largest image 88 KB of 200 KB · LCP 616 ms of 2500 ms · CLS 0 of 0.1 · 0 third-party hosts. Every line inside budget. Raw numbers in `audit.json`.

## what a visitor would notice is different

Against **The Lavish Haven**: that site is a magazine built around a pool it owns and opens on a
photograph of it. KA opens on a chart of the coast and never claims a picture it did not take — the
close photographs are its own and stay small, the wide ones are credited to their photographers.
Against **Layday Surf**: Layday is a single bordered card read in panels on a sand field; KA is a
position on a coastline you travel along. See the divergence table in `concepts.md` §5.
