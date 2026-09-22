# KA Surf Hostel — concepts, round 3

Station 4d, **creative-director 0.2.0**, 2026-09-21, run `2026-09-ahangama-02`.
**Round 3 for this business.** This file replaces the round-2 file (git keeps it). Written after
`agents/designer/references.md` was read in full, all 24 of the hostel's photographs and all 11
files in `stock/` were opened and looked at, and every colour below was sampled from the image
files with PIL (median of a pixel box; the boxes are listed in §6).

## 0. Why there is a round 3

- **Round 1, the kitchen noticeboard** — rejected at the pick gate, 2026-09-20. Shahar: *"no mockup
  looks good. I'd ask for 3 new mockups."* The ledger records three faults he named: the noticeboard
  idea itself, too text-heavy, dated/cheap.
- **Round 2, the chart** — built 2026-09-20, not picked. Its first build showed photographs of other
  places as Ahangama and was corrected. Shahar on its buttons: *"Orange buttons look outdated. Not a
  great CTA color, especially with this background… feels cheap and outdated."* No other reason for
  round 2 is on record, and none is assumed here.
- Both archetypes are retired. Neither is reused below, in whole or in part: no pinned cards, no
  mats, no tilts, no chart, no horizon line, no cream ground, no borrowed photograph on the first
  screen. Looking at round 2's screenshots, the business itself never appeared above the fold — a
  chart and somebody else's sea did. Round 3 puts KA's own photographs on the first screen, at the
  size they can honestly hold.
- What changed in between: creative-director 0.2.0 (proposal 003) and `agents/designer/custom.md` as
  Shahar edited it today — cool white grounds, one strong pure colour from the place carried large,
  one flat booking colour, a clean geometric sans in light weights, thin black lines, one bold idea
  with everything around it quiet, a page that answers the visitor.

## 1. What this business actually is

Not a hostel building: a few small cottages and an old columned house standing apart in a garden of
banana trees and coconut palms, off the main road, five minutes' walk from Kabalana Beach. The rooms
open straight onto the green and some of the bathrooms have no ceiling — a glass roof, a black
shower wall, palms overhead. A local family manages it, and guests score the staff 9.9 out of 10
on Booking.com and 9.9 on Hostelworld; one guest wrote that the
staff nursed her through dengue with Ayurvedic medicine on top of what the hospital was giving her.
Breakfast is included, Sri Lankan, and different every day. It holds 9.8/10 on Hostelworld across 66
reviews — the highest number any business in this run has anywhere — and it has no website: every
word and picture it owns lives on a platform that takes a commission.

One more thing a stranger would not guess: Google calls it "KA surf hostel and restaurant" and its
own roundel (`img-010`) says "Sea Food Restaurant", but no listing, menu or price supports a
restaurant. The page says breakfast, never restaurant, and the roundel is not used.

## 2. What the material can and cannot carry

**Photographs, the business's own — 24 files, 361–1024 px wide.**

- The best photograph is **576 × 768 px**. Eight of the twelve Booking.com frames are that size, all
  upright 3:4 phone pictures. **Largest usable width of the best photograph: 576 px.** Nothing here
  can be full-bleed, and nothing is: every print in every concept is shown at or under its native
  size — **never wider than 576 CSS px, and 384 CSS px or less wherever the layout allows**, so a
  1.5× screen still gets one image pixel per device pixel. On a 390 px phone a print is 240–300 CSS
  px wide. Instagram frames (640 × 640) are cropped from the centre to 3:4 → 480 × 640 and shown at
  320 CSS px or less (references.md #26: one ratio for every picture in a run).
- Genuinely good: `img-003` (a hand holding the breakfast fruit plate against the garden — the
  sharpest, most saturated picture KA owns), `img-006` (two cottages under palms and banana
  leaves), `img-005` (the open-air bathroom: glass roof, black shower wall, plants, round basin),
  `img-001` (a private room, whitewashed plank wall, door open to the garden), `img-004` (the dorm:
  grey-green timber bunks, white linen with a blue runner, vaulted ceiling, fan), `img-002` (the long
  table at night under the veranda, a dozen or so guests).
- Useful: `img-007` (a cottage room seen through its open door, two mint chairs on the patio),
  `img-008` (a bathroom window full of banana leaves), `img-020` (blue soft-top boards stacked on
  the beach), `img-016` (low sun on the sea through palm fronds), and the sideways beach frames
  `img-018`, `img-019`, `img-021`–`img-024`, which are stored rotated 90° inside a square and must
  be turned upright before cropping.
- Small or dark: `img-013` (a rice-and-curry spread from above, 361 × 640 — a video cover, usable at
  180 CSS px or not at all), `img-009` and `img-012` (the cottages and the house wall at night,
  1024 × 576; dark frames, usable once, small, on the light ground).
- **Not usable:** `img-015` is a screenshot of another person's Threads post about Madeira — not
  KA's picture and not about KA. `img-010` is the roundel with "Sea Food Restaurant" on it (see §1).
  `img-014` and `img-017` are group photographs taken at other premises (a green building on the
  waterline; a beach café); nothing in the dossier says who is in them, so they may not be presented
  as "the family". `img-011` is a field with two buffalo and an unidentified red building; the
  dossier's description of it ("a horse") is wrong and nothing ties it to the hostel.
- The dossier does not say where the beach frames were taken. Alt text describes what is seen; none
  of them is labelled Kabalana.
- Every `description` in `assets/index.json` is machine-written or a date string. Alt text has to be
  written by looking.

**Atmosphere available — 11 files in `stock/`, every one opened.**

| id | what it is | px | licence | verdict for round 3 |
|---|---|---|---|---|
| `stock-002`, `-009`, `-025` | Admiralty Chart 3730 and two crops of it | 16733 / 2200 / 6000 | public domain | not used — the retired round-2 archetype, and a cream sheet |
| `stock-003` | orange sunset cloud behind palm silhouettes | 5616 | CC0 | not used — warm and dark; wrong beside this palette |
| `stock-007` | sun going down over the Laccadive Sea | 4851 | CC BY 3.0 | not used — same reason; it was round 2's hero |
| `stock-004` | palms over a Ceylon beach, about 1900, black and white | 4036 | public domain | not used — place not recorded, and a period piece |
| `stock-005` | one palm leaning over flat blue water | 2096 | CC BY 2.0 | not used — place not recorded; reads as retouched |
| `stock-010`, `-012`, `-013` | stilt fishermen at Ahangama | 6000 / 3648 / 3603 | CC BY-SA | not used — strangers' faces on a page whose subject is a family |
| `stock-011` | **the reef shelf and shorebreak at Ahangama under a high blue sky** | 4032 × 3024 | CC BY-SA 4.0, `modify: false`, `place_ok: local` | **the one atmosphere image used**, once, in the wave section, shown whole at 4:3, never cropped, never a shader input, with its credit |

So atmosphere carries exactly one moment — the water at the end of the walk — and every concept
still works if `stock-011` is removed (the wave panel is a flat colour panel without it).

**Words.** Three headings are worth setting very large and they are already written: *"Five minutes
from Kabalana Beach"*, *"Run by a family, not a front desk"*, *"Breakfast changes every morning"*.
The long blocks are the family block (two paragraphs) and the offer block. Mia's dengue quote is
three sentences and is the strongest thing anyone has said about any business in this run. Tagline:
"Surf, chill and feel at home in Ahangama".

**Numbers.** 9.8/10 Hostelworld (66) · 9.5/10 Booking.com (38) · 4.8/5 Google (42) — three rows in
`ratings[]`. Check-in 13:00–23:00, check-out by 13:00. Six bed and room rows. Seventeen amenities.
Koggala Airport about 5 km, Ahangama station a little over 2 km. Five minutes on foot.

**Gaps.** No rates — the copy already turns that into a sentence ("the booking links below show what
is actually free"), which becomes the one line inside the booking panel. **No WhatsApp** and no
email: booking is three OTA listings and a phone number. No season. Two contradictions that stay
unresolved and unpublished (parking; the Wi-Fi claim — the page says "Free WiFi" and nothing more).
None of these is interesting enough to build a page on; the garden is.

## 3. The page archetype — **the garden**

The Lavish Haven is a courtyard: water in the middle, rooms round it. Layday is one room behind a
gate, so it is a card. KA is neither a building nor a room — it is **small white things standing
apart in a lot of green**: cottages, a veranda, open-air showers, a long table, scattered under
banana trees, away from the road. The owner's own list says "beautiful green garden & chill zone";
Booking.com lists garden, sun terrace, picnic area and outdoor furniture; guests write "calm and
quiet" and "away from the main road". The garden is visible in eight of the twelve Booking
photographs — through a bedroom door, a bathroom window, a glass roof.

So the page is a garden: **one field of pure leaf green per screen, and white things — upright
prints, short columns of light type — standing apart in it and beside it, with air between them.**
Nothing is boxed, ruled into cells, matted or stacked in bands. Type always sits on the white ground;
the green only ever carries photographs.

**The one shape** (references.md #28) is the upright 3:4 rectangle — the proportion of every good
photograph this business owns. Prints, the tiles in the booking panel and the forecast's day cells
use it. Nothing is square, nothing is rounded, nothing casts a shadow.

Shared by all three concepts, because it is one business:

**Colour — sampled, not chosen.**

| Role | Hex | Sampled from |
|---|---|---|
| ground | `#F0F1F2` | the white porcelain basin in the open-air bathroom, `img-005` |
| ink (text, 1 px lines) | `#060504` | the night sky behind the long table, `img-002` |
| **the garden — the one colour carried large** | `#75A12B` | a sunlit banana leaf in front of the cottages, `img-006` |
| garden, lit (only inside concepts 2 and 3's moving parts) | `#A3C415` | the banana leaf over the patio roof, `img-007` |
| garden, shade (same restriction) | `#4C6909` | a banana leaf in shadow, left edge of `img-006` |
| sky — the wave panel only | `#AFCFF7` | the sky above the palms, `img-006` |
| quiet panel grey, if one is needed | `#C4C5C1` | the dorm's white wall in shade, `img-004` |
| **booking accent — booking controls and nothing else** | `#F05654` | the watermelon on the breakfast plate, `img-003` |

Measured contrast: ink on ground 17.5:1; ink on watermelon 5.7:1, so **button text is ink, never
white** (white on watermelon is 3.4:1 and fails); watermelon against the green is 1.1:1, so **a
booking control never sits on the green field** — always on the white ground. Text never sits on
green at all.

Two colours the photographs offered were turned down on purpose. The bed runners' blue samples as a
dusty `#588AAC` (`img-004`) and custom.md rules out dusty tones. The surfboards' cyan `#13ACD1`
(`img-020`) is pure, but it is within a few points of the Lavish gold page's pool colour `#12B5EC`,
and two blue-on-white sites in one run is the cookie cutter again.

This palette would look wrong beside: cream, sand or the chart sheet; Layday's ochre; the sunset
atmosphere images; and the OTAs' own brand colours — so Hostelworld, Booking.com and Agoda are
named in ink type and never shown as logos or brand-coloured chips.

**Type — one family: Outfit** (variable, SIL OFL, self-hosted, Latin subset ≈ 35–45 KB). Light (300)
and ExtraLight (200) for display at 5–11 rem with tight tracking, Regular (400) for body at 17–18 px,
Medium (500) on booking controls. The reason is in the material: KA is made of circles — the
breakfast plate and its bowls (`img-003`, `img-013`), the round basin (`img-005`), the ring lamp on
the house wall (`img-012`) — and the numbers that prove the place, **9.8, 9.9, 66**, are digits
built from circles; Outfit draws 9, 8, 6 and 0 as near-perfect rings, and at weight 200 its strokes
are the same thickness as the page's 1 px ink lines, so the name "KA" — two letters that are all
diagonals — reads as line drawing rather than lettering. Checked against constraint 15: it is not a
serif, not Inter/Roboto/Arial, and not Jost (the Lavish gold page) nor any face the other concepts
in this run use. **No all-caps labels over headings, no 01/02/03, no middle-dot strings, no arrows
on links** — in any concept.

**Booking — what the channels are.** The dossier has no WhatsApp and no email. The primary action is
"Check dates"; underneath it is a plain link to the Hostelworld listing (the copy's first
`bookingLinks[]` row), so it works with JavaScript off. With the panel open the visitor sees three
upright tiles — Hostelworld, Booking.com, Agoda, URLs exactly as in the dossier, no date parameters
invented (references.md #22) — the sentence about rates from the offer block, and `tel:+94773746053`.
On a phone a thin bar stays at the foot of the screen: "Check dates" in watermelon, "Call" in ink
(#4). Nothing covers the page on load (#20).

**Quotes are not a section.** Every other site in this run has a reviews band. Here each of the five
testimonials stands in the section it is about, set as a short column of light type beside that
section's prints: Wolfgang with the beds, Elena with breakfast, Clara and Mia with the family,
Saketh with the wave. The three ratings are on the first screen.

## 4. Three concepts

### 1 · calm — **"Field"**

**The idea:** a quiet, conventional page on which three of the hostel's own photographs stand
knee-deep in one flat field of green.

- **The one thing:** the garden's green, as a single flat rectangle of `#75A12B`. It is the only
  loud element; everything else is white, ink and 1 px lines.
- **First screen (1440 × 900):** top line — "KA Surf Hostel" at left in Outfit 400, "Check dates"
  at right. Below it the intro heading, *Five minutes from Kabalana Beach*, in Outfit 200 at about
  9 rem across the full content width, two lines. Under its left end: the tagline, then
  "9.8/10 on Hostelworld, 66 reviews" with the other two ratings after it in smaller type, then the
  watermelon "Check dates" button with "or call +94 77 374 6053" beside it. Under its right end,
  columns 6–12: three upright prints — `img-006`, `img-001`, `img-003` — each 300 × 400 CSS px,
  48 px apart, tops staggered by 40 px, **standing in front of a green rectangle that rises from
  the bottom edge of the viewport to half their height** and bleeds off the right edge. What +
  where, the booking action and one proof point are all above the fold (playbook §3.1).
  **On a phone:** the heading at about 2.7 rem over three lines, tagline, the Hostelworld score,
  then the green field from 56 % of the screen down, with the three prints as a swipe row at 240 px
  wide, the next one peeking (#14); the booking bar fixed at the foot.
- **Structure, in order:** first screen → **beds and rooms**: the offer block's first paragraph as a
  lead, then the six rows as an open list (label, beds, a plain "check dates" text link per row —
  #7, without prices because there are none), Wolfgang's words beside it, `img-004` and `img-007` at
  384 px standing on a short green field at the right → **breakfast**: the heading set at 6 rem,
  the block, Elena's words, `img-003` repeated large (480 px) with `img-013` small beside it, no
  field → **the family**: heading at 6 rem, both paragraphs in a narrow column with air (#10),
  Mia's quote set in Outfit 300 at 2 rem as the section's one large text, Clara's beneath it,
  `img-002` at 384 px → **what is here**: the amenities as two ragged columns of plain lines, the
  info block, and the widest field on the page with `img-005`, `img-008`, `img-006` standing in it
  → **the wave**: a full-width panel of sky `#AFCFF7`, the `spot` sentence in Outfit 300 at 2.4 rem,
  Saketh's words, three upright beach crops (`img-020`, `img-023`, `img-018`) at 300 px, then
  `stock-011` whole at 4:3 → **getting here**: the info block, check-in and check-out as three large
  times, address, map link → footer: phone, address, the three listings, image credits.
- **Motion:** none. No canvas (PLAN.md §9). **Zero bytes of JavaScript**: the booking panel is a
  `<details>` element styled as a slide-down sheet, so the first tap reveals a panel instead of
  navigating (#1) with no script at all. Reduced motion, JS off and no WebGL all see the same page.
- **Booking pattern:** Tandjung Sari's slide-down panel (#1) holding three tiles and the phone
  (#2, #3 adapted: the hand-off is an OTA listing, not a WhatsApp prefill, because there is no
  WhatsApp); one accent (#6); fixed bar on a phone (#4).
- **Photographs:** `img-006`, `-001`, `-003` at 300 px on the first screen; `-004`, `-007`, `-002`,
  `-005`, `-008` at 384 px; `-003` once at 480 px; `-013` at 180 px; three beach crops at 300 px;
  `stock-011` lazy, below the fold, ≤ 180 KB as AVIF at 1600 w. First load ≈ 250 KB: HTML + CSS,
  one font file, three prints.
- **Forecast:** **No.** This concept's promise is zero JavaScript, and the forecast needs a script.
- **Fails if:** the green rectangle reads as a coloured box behind a photo row — it has to be big,
  off-centre and bleeding off two edges, or it is a template with a tint.

### 2 · interactive — **"Planks"**

**The idea:** the garden is behind a fence of upright green slats, and the slats turn to follow the
visitor's hand, opening onto the hostel's photographs.

- **The one thing:** the same green, cut into upright slats. The whitewashed vertical plank wall and
  plank door of `img-001` and the upright balusters of the bunks in `img-004` are how this place is
  built; the slats are those planks in the garden's colour. They are the only loud element, and the
  only place `#A3C415` and `#4C6909` appear (a slat turning toward the light goes lit, away goes to
  shade — three flat colours, no gradient).
- **First screen:** top line as concept 1. The heading *Five minutes from Kabalana Beach* in Outfit
  200 at about 8 rem, upper left, over columns 1–8; tagline, Hostelworld score and the watermelon
  button directly beneath it, on white. Across the full width of the lower 46 % of the viewport: a
  band of about seventy upright slats, edge to edge, and **behind them a row of five prints**
  (`img-006`, `-007`, `-001`, `-004`, `-005` — the cottage, the patio door, the room, the dorm, the
  open-air shower: a walk through the place) at 288 × 384 CSS px. At rest the slats stand a quarter
  open, so the photographs read through them the way a garden reads through a fence. Slats within
  about 220 px of the pointer turn edge-on and the print behind them is clear. **On a phone:** the
  band is the lower 44 % of the screen, the prints 240 px wide in a swipe row; a finger dragging
  across the band opens the slats under it; the booking bar is fixed at the foot.
- **The orchestrated moment:** on the first scroll (or first swipe of the row) every slat turns
  edge-on from the centre outward over about 900 ms and stays open; the band is now a free,
  draggable, snapping rail of prints with the next one peeking (#14, #18 — one sideways run inside
  a vertical page, never the page itself).
- **Structure, in order:** first screen → **the family** (heading at 6 rem; Mia's quote large;
  Clara's; `img-002`) — moved up, because "who runs it" is what this business is → **beds and
  rooms** (the six rows; a hairline under each row extends across the column when the row is hovered
  or focused; Wolfgang's words) → **breakfast** (`img-003` at 480 px; Elena's words) → **what is
  here** (amenities; `img-005`, `img-008` on a green field that slides in from the right edge as the
  section arrives) → **the wave** (sky panel, the forecast, beach crops, `stock-011`) → **getting
  here** → footer.
- **Motion and what it costs:** one 2D `<canvas>` for the slat band, hand-written, no library, about
  10 KB compressed; the prints stay real `<img>` elements under it, so the canvas is decoration and
  the DOM holds the content. Kube's ±4 rem image parallax on the later prints, off at ≤ 767 px
  (#17). Booking-panel ease 0.3 s. The button's fill wipes left-to-right in 150 ms on hover. Total
  script ≤ 30 KB, started after first paint; the booking panel's code loads on first interaction
  (#5). **Reduced motion:** the slats are drawn once, fully open, and the rail scrolls natively.
  **JavaScript off / no canvas:** the HTML already holds concept 1's composition with five prints —
  a flat green band behind the lower half of the row. WebGL is not used.
- **Booking pattern:** Kube's in-page overlay (#1), as a sheet that rises from the foot on a phone
  and drops from the header on desktop, three tiles + phone; the underlying element is a plain link
  (#3); one accent (#6).
- **Photographs:** five at 288 px behind the slats (≈ 45 KB each as AVIF — the first screen's images
  total ≈ 230 KB, inside the 1.5 MB first-load budget, none over 200 KB); the rest as concept 1.
- **Forecast:** **Yes**, in the wave section, after the `spot` sentence and never earlier. Mapping:
  dossier `location.spot` "Kabalana beach break" / `location.distance_to_beach` "Kabalana Beach"
  → Rosa spot id **`kabalana`**, name **"Kabalana"** (checked in
  `agents/designer/fixtures/rosa-kabalana.json`: `spot.id` `kabalana`, `spot.town` Kabalana). The
  dossier also names The Rock; the block is labelled Kabalana only and never stands for The Rock.
  Drawn on the sky panel in Outfit: now — height range, period and direction, wind with
  on/cross/offshore — then five days as five upright 3:4 cells (day, height range, Rosa's bucket
  word). Fixed height reserved; lazy request when the panel nears the viewport; plain link "See
  today's forecast for Kabalana on Rosa" with JS off, on failure or when older than 24 h; credit
  "Forecast for Kabalana by Rosa", linked.
- **Fails if:** at rest the slats hide so much that the first screen reads as a green bar with
  nothing behind it — the quarter-open rest state has to show recognisable photographs before
  anyone touches anything.

### 3 · unique — **"Canopy"**

**The idea:** you start under the banana leaves, push them aside, and walk out along one green line
that runs from the bed to the water.

- **The one thing:** the banana canopy itself — long flat leaf blades with a 1 px ink midrib, in the
  three sampled greens, drawn as **cut paper**: flat, hard-edged, no gradient, no texture, no
  shadow. It is the only loud element; once it has parted, the page is white, ink and one green
  line.
- **First screen:** the viewport is filled edge to edge with overlapping leaf blades on three depth
  layers — **except a clearing**, an irregular opening of the white ground that is never smaller
  than 60 % of the viewport on a phone and 50 % on desktop. In the clearing, as real DOM text on
  white: "KA Surf Hostel", the heading *Five minutes from Kabalana Beach* in Outfit 200 at 10 rem,
  the Hostelworld score, and the watermelon button. Blades on the front layer cross the ends of the
  heading's lines, so type and leaf overlap; the pointer (or a finger) pushes the nearest blades
  away and the clearing leans toward it. No photograph on this screen (references.md #27: when no
  photograph clears 1200 px the large moment is drawn, in colours sampled from the photographs).
  The top line and, on a phone, the fixed booking bar sit above the canvas.
- **The orchestrated moment:** scrolling is walking out. Over the first 120 svh the blades slide to
  the edges and close up into **a single flat green column, 2 grid columns wide — the spine** —
  which then runs the whole length of the page, changing grid column at every section.
- **Structure, in order — the walk from the bed to the beach:** canopy → **beds and rooms** (spine
  in columns 2–3; `img-001` and `img-004` hang off it at 384 px, overlapping its edge; the six
  rows and Wolfgang's words to the right) → **breakfast** (spine jumps to columns 9–10; `img-003`
  at 480 px overlapping it from the left; heading at 7 rem; Elena's words) → **what is here** (the
  spine widens to six columns — the garden proper — with `img-005`, `img-006`, `img-008` standing in
  it; the amenities as plain lines on the white beside it) → **the family** (spine narrows to
  columns 5–6; Mia's quote at 2.4 rem to its right, Clara's to its left, `img-002` overlapping) →
  **the walk**: the spine thins to a 1 px ink line for one screen, with nothing on it but the
  getting-here block — five minutes of white → **the wave**: the line meets the full-width sky
  panel; the `spot` sentence, the forecast, the beach crops, `stock-011` whole → footer, where the
  booking tiles are repeated large on white.
- **Motion and what it costs:** WebGL, hand-written, flat-colour instanced quads with a vertex sway
  on two slow frequencies and a pointer-repulsion field; device-pixel ratio capped at 1.5; paused
  when off-screen; about 35–45 KB compressed including a 2D-canvas fallback. Section headings drift
  a few pixels against the scroll; the spine's column changes are scroll-scrubbed slides. No fade-up
  on sections. **WebGL unavailable:** the same canopy on a 2D canvas. **Reduced motion:** an inline
  SVG of the parted canopy (≤ 15 KB), a static clearing, and the spine as plain CSS — nothing
  scroll-linked. **JavaScript off:** that same SVG and every word in the DOM. Note references.md
  #29 when shooting it: the DOM clearing over a WebGL canvas may punch a black rectangle in headless
  captures.
- **Booking pattern:** a right-edge slide-out, the width of one upright tile row, opened by the
  button, the fixed bar or any room row, and remembering which row was tapped only as a line of
  text at its head (no deep link is invented); plain link underneath (#3); one accent (#6); lazy
  booted (#5).
- **Photographs:** none on the first screen; `img-001`, `-004`, `-003`, `-005`, `-006`, `-008`,
  `-002` at 384–480 px along the spine; `img-012` (the ring lamp on the house wall at night) once,
  at 384 px, beside the family; beach crops at 300 px; `stock-011` whole. First load ≈ 120 KB plus
  the script.
- **Forecast:** **Yes** — same mapping as concept 2 (dossier "Kabalana beach break" → Rosa
  `kabalana`, "Kabalana"). It is where the green line ends: on the sky panel, one large "now" line
  in Outfit 200 (height range, period and direction, wind class) and five upright day cells beneath.
  Same loading rules, fallback link and credit.
- **Fails if:** flat banana leaves read as the 2017 tropical-café print. The blades have to be few,
  very large, geometric and hard-edged — closer to cut paper than to botany — or this concept looks
  more dated than the one it replaces.

## 5. Divergence table

| Business | Variant | Archetype | First-screen device | Grid | Colour ground | Motion idiom | Booking pattern |
|---|---|---|---|---|---|---|---|
| **KA Surf Hostel** | calm · Field | the garden | full-width light headline; three upright prints standing half-deep in one flat green field | open field, staggered free-standing objects | cool white `#F0F1F2` | none, 0 JS | `<details>` slide-down sheet, 3 tiles + tel |
| **KA Surf Hostel** | interactive · Planks | the garden | a band of upright green slats that turn under the pointer, five prints behind them | open field | cool white | slats turning to the pointer, then a draggable rail | in-page overlay sheet |
| **KA Surf Hostel** | unique · Canopy | the garden | a cut-paper leaf canopy filling the screen, with a white clearing that holds the headline | open field with one green spine that changes column | cool white | leaves parted by the pointer, closing into a spine on scroll | right-edge slide-out |
| Lavish Haven | calm | the courtyard | full-bleed night pool | 12-col editorial | cream | CSS fixed bands | docked strip |
| Lavish Haven | interactive | the courtyard | pinned water canvas | 12-col editorial | cream | water | slide-down drawer |
| Lavish Haven | unique | the courtyard | type on plaster over a fixed waterline | 12-col editorial | plaster | water + projected type | right slide-out |
| Lavish Haven | gold page (approved 2026-09-21, made outside 4d) | the courtyard | a pool-shaped window of live water on a white page, opening to full screen | wrapped single column + photo strip | cool white `#F5F8FA` | water, noon to night | right drawer |
| Layday Surf | calm | the printed spec card | one bordered card on a colour field | ruled frames | ochre field, paper card | none | the card's own footer row |
| Layday Surf | interactive | the printed spec card | the card, with light crossing it | ruled frames | ochre | sun across plaster | drawer from the card |
| Layday Surf | unique | the printed spec card | the card at full bleed, ruled into cells | ruled frames | ochre | leaf shadow | right slide-out |

No archetype + first-screen combination repeats. KA's two retired archetypes (the kitchen
noticeboard, the chart) are not in play and nothing of theirs is reused.

Two near-misses, stated rather than hidden. KA and the Lavish gold page both stand on a cool white
ground with a light geometric sans, because `agents/designer/custom.md` now asks that of every site;
they are kept apart by hue (leaf green and watermelon against pool blue and lamp yellow), by family
(Outfit, not Jost), by first-screen device, and by section order. And Layday's unbuilt-on *unique*
concept moves a leaf **shadow** across a photographed ochre wall, while KA's *unique* moves opaque
cut-paper blades that the visitor pushes aside; Layday's picked variant is the interactive one, so
the two will not meet on a finished site.

**The Lavish Haven** — a visitor sees blue water first and a hotel arranged round it; at KA they see
green, and small photographs standing in it, and there is no water until the very end of the page.

**Layday Surf Ahangama** — a visitor reads one ruled, bordered card where everything is aligned in
cells on ochre; at KA nothing has a border, nothing shares a baseline, and the white page is mostly
air with one green field in it.

## 6. Where every fact and colour comes from

| In this file | Dossier key |
|---|---|
| five minutes / 450 yd from Kabalana Beach | `location.distance_to_beach` |
| managed by a local family | `business.run_by`, `business.description_long` |
| garden, chill zone, sun terrace, picnic area, outdoor furniture | `business.description_long`, `facilities[]` |
| staff 9.9 / 9.9 | `reviews.booking.categories.Staff`, `reviews.hostelworld.categories.Staff` |
| 9.8 (66), 9.5 (38), 4.8 (42) | `reviews.hostelworld`, `reviews.booking`, `reviews.google` |
| dengue, "calm and quiet", "away from the main road", breakfast quotes | `reviews.quotes[]` (Mia, Wolfgang, Clara, Elena, Saketh) |
| breakfast included, Sri Lankan, changes daily | `business.description_long`, `reviews.quotes[]` (Elena) |
| six bed and room types | `room_types[]` |
| check-in 13:00–23:00, check-out 13:00 | `hours_note` (Hostelworld window; contradiction recorded in `contradictions[]`) |
| phone +94773746053; no WhatsApp; no email | `contact.phone`, `contact.whatsapp.gap`, `contact.email.gap` |
| three listings | `booking.engine_url`, `booking.other_engines` |
| Kabalana beach break, The Rock | `location.spot` |
| airport, station | `location.nearby` |
| "and restaurant" / Wi-Fi / parking unresolved | `contradictions[]`, `gaps[]` |
| no website | `existing_site` |
| photograph sizes | `images[].width/height`, confirmed by opening each file |

Colour sample boxes (left, top, right, bottom in image pixels; median per channel): ground
`img-005` 470,485,530,510 · ink `img-002` 120,200,250,260 · garden `img-006` 420,520,470,545 ·
garden lit `img-007` 470,140,540,165 · garden shade `img-006` 60,290,100,320 · sky `img-006`
230,20,330,80 · panel grey `img-004` 440,230,520,300 · watermelon `img-003` 200,440,300,500 ·
(turned down) runner blue `img-004` 455,610,520,650 · board cyan `img-020` 440,260,520,420.

**If we could photograph one thing on location:** the garden from the veranda steps at eight in the
morning — cottages, banana trees, the long table laid for breakfast — wide, at 2400 px or more. It
is the one picture that would let this page open on the place itself instead of on a drawing of it.
