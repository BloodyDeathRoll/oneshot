# KA Surf Hostel — concepts, round 2

Station 4d, creative-director 0.1.0, 2026-09-20. **Round 1 was rejected at the pick gate.**

## 0. Why there is a round 2

Shahar, at the gate: *"no mockup looks good. I'd ask for 3 new mockups."* Asked what was wrong, he
named three things: **the noticeboard idea itself**, **too little imagery / too text-heavy**, and
**it looks dated / cheap**.

All three round-1 concepts were the noticeboard, so this is a rejection of the archetype, not of a
layout. The reasoning that produced it was sound and is still true — KA's best photograph is
576 × 768 and cannot fill a screen — but the conclusion drawn from it was wrong. "The photographs
are small" was allowed to become "the page has no photography", and a page with no photography on a
coast like this one is thin, and the pinned-card devices used to fill the gap (tilts, paper mats,
drop shadows) are the visual language of 2012.

The policy changed with it. PLAN.md §9, amended today: **freely-licensed atmosphere photography is
allowed** — the place, never the business. That removes the premise. KA can now open on an image.

## 1. What this business actually is

A family lives at this hostel and runs it, and every review uses the same word for it. One guest
wrote that the staff nursed her through dengue with Ayurvedic medicine on top of what the hospital
was already giving her. Breakfast is included, it is Sri Lankan — rotis, hoppers, pancakes, eggs, a
fruit platter, a vegan option — and **it changes every day**, which guests mention more often than
anything else. It is five minutes' walk from Kabalana. It scores **9.8/10 on Hostelworld across 66
reviews**, the highest number any business in this run holds anywhere.

Two facts are doing all the work: **where it is** and **who runs it**. Everything else is a bunk.

## 2. What the material can and cannot carry

**The business's own photographs — 24, all business-owned, 361–1024 px.**
The best is `img-002`, the long table at night, at **576 × 768**. That still cannot be full-bleed and
`tools/build-mockup.mjs` still refuses it. What is different now is that it no longer has to be:
these are close photographs — a breakfast spread, the family on the veranda, a bowl of cut fruit, a
bunk, an outdoor shower — and close photographs are fine at 380–520 px. They are the *inside* of the
page. Seven are stored sideways in a square frame and carry an explicit `rotate` in `photos.json`.

**Atmosphere — 7, in `dossier/ka-surf-hostel-and-restaurant/stock/`, CC0 or CC BY, every one looked
at and described.** These are the *outside*:

| id | what it is | px | licence |
|---|---|---|---|
| `stock-001` | an empty beach at Thiranagama: shorebreak, wet sand, a line of palms | 5647 | CC0 |
| `stock-002` | **Admiralty Chart 3730, Plans on the South Coast of Ceylon** | 16733 | public domain |
| `stock-003` | sunset over the south coast, cloud lit orange behind palm silhouettes | 5616 | CC0 |
| `stock-004` | coconut palms leaning over a Ceylon beach, photographed around 1900 | 4036 | public domain |
| `stock-005` | a single palm leaning out over flat water | 2096 | CC BY 2.0 |
| `stock-006` | the shorebreak at Hikkaduwa under a heavy sky | 2560 | CC BY 3.0 |
| `stock-007` | the sun going down over the Laccadive Sea | 4851 | CC BY 3.0 |

Eleven more were fetched and rejected on sight — a candlelight vigil that a filename called
"Kabalana", and a five-star hotel's suite, rooftop and infinity pool. The last group is the exact
thing the policy forbids: a borrowed room that reads as the room you would be booking.

**Numbers:** 9.8 / 9.5 / 4.8 with counts. Six bed and room types. Check in 13:00–23:00. Koggala
Airport ~5 km, Ahangama station ~2 km. Six named breakfast items. **Five minutes on foot.**

**Gaps worth designing around:** no rates; no WhatsApp; no site of its own; and the "and restaurant"
in Google's listing name that no OTA and no menu supports — so the page says breakfast, never
restaurant. Two live contradictions, parking and check-in, that must stay unresolved.

## 3. The page archetype — **the chart**

`stock-002` is a nautical survey of this exact water, drawn around 1900, public domain, and 16733 px
across. It is the best single asset this business has access to, and it is about the one thing KA's
pitch is about: **position**. Five minutes from Kabalana. Two kilometres from the station. Five from
the airport. A family at a fixed point on a coast.

So the page is navigational. The chart is the ground it is drawn on and the device that answers
"where is this?"; licensed ocean photography carries the full-bleed moments; and the hostel's own
photographs appear as what they honestly are — close snapshots from inside the place — at the size
they can hold. Type is a contemporary grotesk, flat, no shadows, no tilts, no paper texture.

Distinct from the other two in the run: The Lavish Haven is a courtyard, a magazine built around a
body of water it owns. Layday is a bordered spec card for a single room. KA is a position on a coast.

## 4. Three concepts

Shared across all three, because it is one business: **Space Grotesk** display (a technical,
contemporary face that sits with measurements and chart lettering) with **Instrument Sans** for
body — 52 KB together. Chart paper `#F4EFE2`, chart ink `#1D2326`, sea `#2A6472`, and one accent
reserved for booking, a chart red `#D2451E`. Light throughout.

### 1 · calm — **"Five minutes"**

The idea: a clear, conventional page whose organising fact is the distance to the water.

- **First screen — a split, not a hero.** The chart on the left, cropped to Kabalana Bay; the empty
  beach on the right; the name across the seam; under it "Five minutes on foot" set as a measured
  line, the three platform scores, and the booking row. No text-heavy wall, no photo-less board.
- **Structure:** split head → the three scores as a rule of figures → where it is, against the
  chart → the family, with three of the hostel's own photographs at 420 px → breakfast, the six
  items as a list beside the fruit photograph → beds and rooms as a plain table with a book link per
  row → full-bleed shorebreak → what is here → guests' words → the wave, with the live Kabalana
  forecast → getting here, on the chart again, with the three distances → footer.
- **Motion:** none. PLAN.md §9: the calm mockup skips the canvas. **Zero bytes of JavaScript.**
- **Booking:** a row of three platform cards under the head, Hostelworld first, plus `tel:`;
  persistent bar on a phone (references.md #4, #6, #7).
- **Fails if:** the chart becomes wallpaper. It has to be legible and positioned, not a texture.

### 2 · interactive — **"Soundings"**

The idea: the chart is the page, and the photographs surface through it.

- **First screen — the chart itself**, full-bleed and slowly drifting, with KA's position marked and
  the name over it. As you scroll the chart dissolves into the water it describes: the beach, then
  the shorebreak, then the sunset, each emerging through the paper.
- **Motion:** a hand-written WebGL cross-dissolve between the chart and the photographs, masked by
  the chart's own ink density so the paper appears to *wash out* rather than fade — a dissolve that
  comes from the artwork instead of being applied to it. Plus ±4 rem image parallax, off at ≤767 px
  (references.md #17). Without WebGL or with reduced motion: the photograph, no chart overlay.
- **Structure:** as concept 1, with the room table becoming a snapping rail and the photographs an
  even masonry with one gap everywhere. Booking behind a slide-down drawer (#1).
- **Fails if:** the dissolve makes either layer unreadable. The chart is information, not an effect.

### 3 · unique — **"Latitude"**

The idea: one horizon line runs the whole page, and everything is placed above or below it.

- **First screen — a horizon.** A single hairline across the viewport with the sea above it and
  chart paper below, the name set across it at 8 rem in Space Grotesk, and the coordinates of
  Ahangama set small beside it. No photograph fills the screen; the sea is a band.
- **Structure:** the horizon persists as the page's spine. Sections alternate above and below it;
  the hostel's own photographs hang beneath it like soundings, at their true small size; the
  atmosphere images are the band itself, changing as you go. The six breakfast items are set as a
  numbered run along the line. Guests' words sit above it.
- **Motion:** the band is a WebGL water surface — not the Lavish Haven's pool, but open sea seen
  edge-on, a slow swell that moves the horizon a few pixels. Kinetic type on the name.
- **Booking:** a right-edge slide-out.
- **Fails if:** one line is not enough structure and the page reads as loose.

## 5. Divergence table

| Business | Variant | Archetype | First-screen device | Ground | Motion idiom | Booking |
|---|---|---|---|---|---|---|
| KA | calm | the chart | split: chart beside ocean, name on the seam | chart paper | none | card row |
| KA | interactive | the chart | the chart itself, full-bleed, drifting | chart paper | chart dissolving into water | slide-down drawer |
| KA | unique | the chart | a single horizon line with type across it | chart paper / sea band | swell moving the horizon | right slide-out |
| Lavish Haven | calm | the courtyard | full-bleed night pool | cream | CSS fixed bands | docked strip |
| Lavish Haven | interactive | the courtyard | pinned water canvas | cream | water | slide-down drawer |
| Lavish Haven | unique | the courtyard | type on plaster over a fixed waterline | plaster | water + projected type | right slide-out |
| Layday | calm | the printed spec card | one bordered card on a colour field | sand | none | the card's footer row |
| Layday | interactive | the printed spec card | the card, with light crossing it | sand | sun across plaster | drawer from the card |
| Layday | unique | the printed spec card | the card at full bleed, ruled into cells | sand | leaf shadow | right slide-out |

No archetype + first-screen combination repeats.

**What a visitor would notice is different.** Against the Lavish Haven: that site is a magazine built
around a pool it owns and opens on a photograph of it; KA opens on a chart of the coast and never
claims a picture it did not take. Against Layday: Layday is one bordered object read in panels; KA is
a continuous coastline you travel along.

**If we could photograph one thing on location:** the long table at dinner, wide, at 2400 px. The
licensed atmosphere solves the outside of this page. Nothing solves the inside except going there.
