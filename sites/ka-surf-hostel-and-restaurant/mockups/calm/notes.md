# KA Surf Hostel — mockup 1, "calm"

Station 4e, round 2. Built 2026-09-20 on the **chart** archetype
(`sites/ka-surf-hostel-and-restaurant/concepts.md` §3, concept 1 "Five minutes").

## why this replaced round 1

Round 1 was three noticeboards and Shahar rejected all three: *"no mockup looks good."* Asked what
was wrong he named the noticeboard idea itself, too little imagery, and *"dated / cheap"*.

The reasoning that produced the noticeboard was sound — KA's best photograph is 576 × 768 and cannot
fill a screen — and the conclusion drawn from it was wrong. "The photographs are small" became "the
page has no photography", and the pinned-card devices used to fill the gap (tilts, paper mats, drop
shadows) are the visual language of about 2012. PLAN.md §9 was amended the same day to allow
freely-licensed **atmosphere**, which removes the premise: KA can open on an image without
pretending it took it.

## direction

Admiralty Chart 3730 — the 1900s survey of this coast, public domain, 16733 px — is the ground. It
is about the one thing KA's pitch is about: **position**. Five minutes from Kabalana, two kilometres
from the station, five from the airport.

- **The first screen is a split, not a hero**: the Weligama Bay plan on the left, an empty south-coast
  beach on the right, the name across the seam, and the distance set as a **measured line** with end
  ticks, the way a scale bar is drawn on a chart.
- **Three scores as a rule of figures**, then the three booking platforms centred under them.
- **The hostel's own photographs are the inside of the page** — four across at about 290 px, which is
  inside what a 576 px source can hold. They are never asked to fill anything.
- **Licensed ocean carries the full-bleed moments.** Every borrowed photograph shows its credit in
  place, and all of them are listed again in the footer.
- Flat and contemporary: **no tilts, no mats, no drop shadows.** Space Grotesk, a technical face that
  sits with measurements and chart lettering, with Instrument Sans for reading — 51 KB together.
- One accent, chart red, on booking only (references.md #6); persistent bar on a phone (#4); the
  playbook §3 order (#15); nothing covers the first screen (#20).

PLAN.md §9: the calm mockup skips the canvas. **Zero bytes of JavaScript.**

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
| `stock-009` | The compass rose from Admiralty Chart 3730, marked MAGNETIC and Varn 3°35′W (1925) | Public domain |
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
| Works with JavaScript off | pass — the build ships **0 bytes of its own JavaScript**; every action is an `<a href>` |
| Mobile 390 px / desktop 1440 px | pass — `shots/`, no overflow, no overlap |
| Tap targets ≥ 44 px | pass — 0 under 44 |
| Broken images | 0 |
| `tools/check-design.mjs` | pass — light ground, no padded picture boxes, no captions under photographs |

**Measured** with `node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant calm` on a throttled phone (1.6 Mbps, 150 ms RTT, 4x CPU), first load with no scroll: 324 KB of the 1.5 MB budget · JS 0 KB of 300 KB · fonts 51 KB of 150 KB · largest image 94 KB of 200 KB · LCP 1140 ms of 2500 ms · CLS 0 of 0.1 · 0 third-party hosts. Every line inside budget. Raw numbers in `audit.json`.

## what a visitor would notice is different

Against **The Lavish Haven**: that site is a magazine built around a pool it owns and opens on a
photograph of it. KA opens on a chart of the coast and never claims a picture it did not take — the
close photographs are its own and stay small, the wide ones are credited to their photographers.
Against **Layday Surf**: Layday is a single bordered card read in panels on a sand field; KA is a
position on a coastline you travel along. See the divergence table in `concepts.md` §5.
