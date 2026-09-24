# Layday Surf Ahangama — concepts, round 3

Station 4d, **creative-director 0.2.2**, 2026-09-22, run `2026-09-ahangama-02`.
**Round 3 for this business.** This file replaces the round-2 file ("the printed spec card",
creative-director 0.1.0, 2026-09-20); git keeps it. Written after `agents/designer/references.md`
was read in full, all 22 photographs in `dossier/layday-surf-ahangama/assets/` were opened and
measured with PIL, and every colour below was sampled from those files with PIL (median of a pixel
box; the boxes are listed in §6).

## 0. Why there is a round 3

- **Round 2, the printed spec card**, was picked on 2026-09-20 (interactive, "The card, at four
  o'clock"). Shahar, verbatim: *"second looks best (8905). I'd ask for more movement/microanimation.
  Unique though a little outdated, nice movement when we have it. Good color separation, bad color
  tones. Would still need some work if shown to a client, good enough for now."*
- Sent back to 4d on 2026-09-22 to be redone under the proposal-003 prompts (ledger).
- What round 2 got wrong, looking at `mockups-picked-02/interactive/shots/`: an ochre field
  (`#E3BC6B`) under a cream card (`#F7F1E3`) with a rust accent — warm on warm on warm, which is the
  "bad tones"; Syne + Inter Tight; a tracked all-caps label over every heading ("WHERE IT IS", "THE
  ROOM"); 01–04 numbering; "MORNING" captioned on a photograph. Every one of those is now a house
  rule or a default-look item.
- What round 2 got right, and round 3 keeps: separation between grounds, one object on the page
  rather than a magazine, and movement Shahar noticed and liked.
- The spec-card archetype is retired: no card, no ruled cells, no ochre ground, no paper, no rust.

## 1. What this business actually is

The whole hostel is **one room**: a single air-conditioned dormitory, newly built, run by the family
who built it (`room_types[]`, Catherine's and Beth's quotes, `business.run_by` — the name Rukshan is
a guest's, unconfirmed, and is not used). Inside it every bed is its own **yellow plastered box** —
a berth with a curtain, a black wall lamp, a square niche in the plaster and a locking drawer
underneath, climbed by a black steel ladder (`img-002`, `img-005`, `img-008`, `img-018`). Nobody
knows how many berths: Booking says a 6-bed dorm, a guest says four bunks (`contradictions[]`), so
no number, and no drawing that could be counted, appears anywhere. And guests cannot find the door:
behind an unmarked large black gate, across a wooden platform, right of the house
(`location.finding_it`, `gaps[]`). Every rating it holds is perfect or nearly — Hostelworld 9.8 with
all seven categories at 10.0 — on small samples (10, 6, 15), never averaged.

## 2. What the material can and cannot carry

**Photographs, the business's own — 22 files, all business-owned, from Booking.com.**
Measured with PIL: 12 are **576 × 768** upright (`img-001`–`008`, `010`, `011`, `013`, `014`), 10
are **1024 × 768** landscape (`img-009`, `012`, `015`–`022`). **Largest usable width: 1024 px; the
best photograph is `img-012` at 1024 × 768.** Nothing clears 1200 px, so **nothing is full-bleed in
any concept.** Prints are shown at or under native size: landscape ≤ 640 CSS px (once per page),
otherwise ≤ 512; upright ≤ 384 CSS px. Every picture in a run of pictures is centre-cropped to one
ratio, 4:5 (references.md #26); 576 × 768 → 576 × 720, 1024 × 768 → 614 × 768.

- **Genuinely good:** `img-012` (the dorm seen through the open glass-and-timber door: yellow berths,
  timber door at the end, grey concrete floor, the bench with violet, ochre, green cushions and the
  abstract painting); `img-018` (inside a berth: yellow plaster ceiling and back wall, the square
  niche, white pillow, black lamp, curtain drawn back — **the one thing, photographed**); `img-002`
  (a lower berth close up, black ladder, locking drawers); `img-013` (cane locker fronts beside
  poured-concrete shelving).
- **Useful:** `img-005`, `img-011`, `img-014` (the room from other angles; `img-014` is a near-copy
  of `img-012`); `img-008` (the berth's end and ladder); `img-003` (basin, round cane mirror, cane
  cabinet; `img-006` is a near-duplicate — use one); `img-017` (the bench and painting; a water
  cooler takes a fifth of the frame); `img-001`, `img-004`, `img-007`, `img-010` (porch, steps,
  decking, garden path in hard sun); `img-016` (canopy from the terrace, a slice of sea).
- **Beach:** `img-019` (surfers in the line-up), `img-020`, `img-021` (a blue board carried along
  the shore), `img-022`. The dossier does not say where they were taken: alt text says what is
  seen, never "Kabalana".
- **Not used:** `img-009` is a **private double room** (bed, two towel rolls, dark timber doors, a
  framed print) — the dossier lists one room type, a dorm bed, so showing it would advertise a room
  nobody can book. `img-022` is dominated by a third-party resort building on the beach and could be
  read as this business. `img-015` (a towel ladder, half a basin) is weak.
- **No photograph is identified as the gate or the platform.** `img-004` and `img-010` show decking,
  but nothing ties either to the directions, so the directions section carries no photograph (§5
  pitch point).
- Every `description` in `assets/index.json` is "Booking.com listing photo": alt text is written by
  looking.

**Atmosphere:** there is no `stock/` folder and none was fetched. None is needed: the business owns
four beach frames at 1024 px that carry the wave section at print size. Atmosphere would only help
if a concept wanted the sea large, and none does.

**Words:** six copy blocks. Worth setting large: *"A two-minute walk from Kabalana"* (intro),
*"One dorm, and that is deliberate"*, and *"Finding the door"* — whose first sentence is "This is the
one thing worth reading twice." Longest: `about` (two paragraphs) and `offer`. Beth's quote is the
long testimonial; Catherine's is the one that says "one dorm room" and "difficult to find".

**Numbers:** 9.8/10 Hostelworld (10), 10/10 Booking.com (6), 5.0/5 Google (15); seven Hostelworld
categories at 10.0; check-in 14:00–19:00, check-out by 14:00; 19 amenities; phone +94 77 855 3343.

**Gaps:** no rates (dated OTA inventory) — the offer block's sentence "the booking links show what
is free" goes inside the booking panel. **No WhatsApp, no email, no website, no socials.** No
season. No coordinates in the dossier (`location.lat_lng` gap): the map is a link to the dossier's
`map_url`, never a drawn pin. **No bed count.** The gap worth designing around is the gate, and it is
designed around by giving the directions the page's third section and its largest type after the
headline, not by illustration.

## 3. The page archetype — **the berth**

You do not book a room here; there is only one. You book **a berth in it**: a yellow box you climb
into, draw a curtain across and switch a lamp on in. So every concept is built on one berth — a
single flat yellow landscape rectangle with square corners, a black 2 px ladder upright on one edge,
and beneath it **the drawer**, a 1 px ink outline where the booking lives, the way the locked
drawers sit under the real bunks. Always **one** berth, never a row or a stack of them, so the page
can never be counted into a bed number the dossier does not hold.

It belongs to no one else in the run. The Lavish Haven is a courtyard — water with rooms around it.
KA is a garden — white things standing apart in green. Layday is the inside of one box.

**The one shape** (references.md #28): the berth rectangle, landscape, about 16:10, square corners,
ladder on its right edge. Used for the first-screen berth, the booking drawer and the forecast's
reserved box. Nowhere else. Nothing rounded, no shadows, no gradients (except where a concept
names flat light planes).

Shared by all three concepts, because it is one business:

**Colour — sampled, not chosen.**

| Role | Hex | Sampled from |
|---|---|---|
| ground (page) | `#E8E9F0` | the white front panel of the water cooler beside the bench, `img-017` (top quintile of the box) |
| quiet panel, if one is needed | `#C5C9C9` | the rendered garden wall outside the porch, in sun, `img-001` |
| ink (text, 1–2 px lines, the ladder) | `#0B0F10` | the black steel ladder of a berth, `img-008` |
| **the berth — the one colour carried large** | `#E2B827` | the plastered back wall of a lower berth, `img-002` |
| berth, lit plane (concepts 2 and 3's moving parts only) | `#EED38F` | the sunlit end face of a berth, `img-008` |
| berth, shade plane (concept 3's box only) | `#CF9B0D` | the back wall of a berth in its own shadow, `img-018` |
| **booking accent — booking controls and nothing else** | `#3C1D51` | the violet cushion on the bench, `img-012` |

Measured contrast (WCAG): ink on ground 15.9:1; ink on berth yellow 10.2:1; booking violet on ground
11.7:1, ground-colour text on violet 11.7:1 (**button text is `#E8E9F0` on violet**); violet on
yellow 7.5:1, so a booking control may sit on the berth; yellow on ground 1.6:1, so **text is never
yellow**, and the yellow is only ever a field.

**Why yellow, after "bad color tones".** custom.md forbids ochre "unless the business itself is that
colour", and this business is: the berths are yellow plaster in every interior photograph. Round 2
failed by carrying the colour as the *ground*, under cream, with rust — every surface warm. Round 3
takes the most saturated sample (`#E2B827`, saturation 0.76; round 2's field `#E3BC6B` was greyer and
paler), puts it on a **cool** white-grey ground, gives it exactly one shape per screen, and pairs it
with ink and a cold violet. The dull shades the photographs also offer (`#8F6F11` in `img-005`,
`#CEA537` in `img-018`) are refused. The curtains sample dusty brown-pink and are refused too
(custom.md: no dusty tones); curtains, where they appear, are drawn in ink lines.

Turned down on purpose: the painting's red `#D91628` (`img-017`) — red beside yellow is a fast-food
sign; the painting's cobalt `#014B8B` and the board's blue `#157AC1` (`img-021`) — within reach of
the Lavish gold page's night and pool blues, and Lavish already pairs blue with a yellow button; the
doormat's magenta `#860F47` (`img-001`) — the violet is quieter at button size and belongs to the
room, not the porch.

This palette would look wrong beside: cream or sand (it would turn the yellow back into ochre),
KA's leaf green and watermelon, Lavish's pool blue, and the OTAs' brand colours — so Hostelworld,
Booking.com and Agoda are named in ink type, never as logos or coloured chips.

**Type — one family: Urbanist** (variable, SIL OFL, self-hosted, Latin subset — estimated 30–45 KB,
measure at 4e). ExtraLight 200 for display at 5–9 rem with tight tracking, Regular 400 body at
17–18 px, Medium 500 on booking controls. The reason is the ladder: Urbanist is monoline and
geometric, and at weight 200 its strokes at display size are about the width of the page's 2 px
ladder line, while its flat, horizontal terminals on t, f, e and the y's of "Layday" repeat the
rungs. Checked against hard constraint 15: not a serif, not Inter/Roboto/Arial, and not a face used
elsewhere in the run (KA: Outfit; Lavish gold: Jost; Lavish round 2: Instrument Serif, Fraunces,
Bricolage Grotesque; Layday round 2: Syne, Inter Tight). **No all-caps labels over headings, no
01/02/03, no middle-dot strings, no arrows on links, no captions under photographs** — in any
concept. The four steps of "Finding the door" are sentences in a column, not a numbered list.

**Booking — what the channels are.** The dossier's path is `engine`: Booking.com, Hostelworld, Agoda,
plus a phone; **no WhatsApp and no email**, so no prefill is possible and none is invented
(playbook §5). The primary action is **"Check dates"**, and under it is a plain link to the
Hostelworld listing (the copy's first `bookingLinks[]` row), so it works with JavaScript off (#3).
Opened, the drawer holds three listing links, URLs exactly as in the dossier with no date
parameters (#22), the offer block's sentence about rates, and `tel:+94778553343`. On a phone a thin
bar stays at the foot: "Check dates" in violet, "Call" in ink (#4). Nothing covers the page on load
(#20). One accent (#6).

**Quotes:** Beth's is the long one and is set once, large, in the room section; Catherine's sits
beside "Finding the door", because it is the guest saying it was hard to find; the three short
ones go with the ratings in the guests' section.

## 4. Three concepts

### 1 · calm — **"Berth"**

**The idea:** a quiet page whose first screen is one yellow berth with the headline lying in it and
the booking drawer underneath.

- **The one thing:** the berth — one flat `#E2B827` rectangle. The only loud element; everything
  else is ground, ink and 1 px lines.
- **First screen (1440 × 900):** top line — "Layday Surf Ahangama" left in Urbanist 400, "Check
  dates" right. Below, the berth across columns 1–9, about 58 vh tall, square-cornered, with the
  2 px ink ladder standing on its right edge from the top line to the bottom of the viewport (three
  rungs, reaching right). Inside the berth, in ink on yellow: *A two-minute walk from Kabalana* in
  Urbanist 200 at about 8 rem over two lines, and the tagline under it at 1.25 rem. Directly under
  the berth, the same width, **the drawer**: a 1 px ink outline 96 px tall holding the violet "Check
  dates" button, "or call +94 77 855 3343", and "9.8/10 on Hostelworld, 10 reviews" with the other
  two ratings after it in smaller type (no middle dots: each is its own line). Right of the ladder,
  columns 10–12: `img-002` as an upright 4:5 print at 288 × 360 CSS px, top-aligned with the berth —
  proof the yellow is real. What + where, the booking action and one proof point are above the fold
  (playbook §3.1). **On a phone:** the berth is full width inside 16 px gutters and 52 vh tall,
  headline 2.6 rem over three lines, ladder on its right edge; the drawer beneath it with the button
  and the Hostelworld score; `img-002` moves below the fold; the booking bar is fixed at the foot.
- **Structure, in order:** first screen → **the room**: "One dorm, and that is deliberate" at 5 rem,
  both paragraphs in a narrow column with air (#10), the `offer` block, the single `rooms[]` row
  "Bed in the dormitory" with a plain "check dates" link (#7, no price because there is none);
  `img-012` at 640 CSS px — its one appearance at that size — and Beth's quote in Urbanist 300 at
  1.8 rem beside it → **finding the door**: the heading at 6 rem, the four sentences as a short
  column at 1.4 rem, the map link, Catherine's quote; no photograph (§2) → **newly built**: the
  block, and three 4:5 prints at 320 px in one row, `img-013`, `img-003`, `img-017` → **guests**: the
  three ratings set as large light numerals with platform and count under each, Hostelworld's seven
  categories as one plain sentence, the three short quotes → **the wave**: the `spot` sentence at
  2.4 rem, then `img-019`, `img-021`, `img-020` as 4:5 prints at 320 px → **practicalities**:
  check-in and check-out as three large times, the notes, the 19 amenities in two ragged columns of
  plain lines, the address and map link → footer: the drawer repeated, phone, address, the three
  listings.
- **Motion:** none. No canvas (PLAN.md §9). **Zero bytes of JavaScript**: the drawer is a `<details>`
  element styled to open downward from under the berth, so the first tap reveals a panel instead of
  navigating (#1) with no script. Reduced motion, JS off and no WebGL all see the same page.
- **Booking pattern:** Tandjung Sari's slide-down panel (#1), as the drawer, holding the three
  listings and the phone (#2); fixed bar on a phone (#4); one accent (#6).
- **Photographs:** `img-002` at 288 px on the first screen; `img-012` at 640; `img-013`, `-003`,
  `-017`, `-019`, `-021`, `-020` at 320. First load ≈ 150 KB: HTML + CSS, one font file, one print.
- **Forecast:** **No.** This concept promises zero JavaScript; the forecast needs a script.
- **Fails if:** the yellow reads as ochre again — if the build lets it drift duller or warmer than
  `#E2B827`, or puts anything cream near it, this is round 2 in a new layout.

### 2 · interactive — **"Curtain"**

**The idea:** the berth has its curtain, drawn in ink lines, and the curtain answers the visitor's
hand.

- **The one thing:** the berth, with a curtain of about forty 1 px ink verticals hanging from a 2 px
  rail across its top. The curtain is line, not cloth — no texture, no colour, no shadow — so it is
  the berth made to move, not a second idea.
- **First screen:** top line as concept 1. The berth across the full content width, about 64 vh.
  Inside it, on the left two-thirds and **never under the curtain**: *A two-minute walk from
  Kabalana* in Urbanist 200 at about 8 rem, the tagline, the Hostelworld score, and the violet
  "Check dates" button (violet on yellow 7.5:1). The right third of the berth holds `img-018` — the
  inside of a real berth — as a landscape print at 512 × 384 CSS px (1024 native), and in front of it
  the curtain, gathered at rest to cover about half the print, lines bunched toward the ladder. Lines
  within about 200 px of the pointer swing aside and part; they settle back when it leaves. The
  drawer, a 1 px outline, sits under the berth with "or call +94 77 855 3343" and the other two
  ratings. **On a phone:** the berth full width, 58 vh, headline 2.6 rem; the print below the
  headline at 288 px wide with the curtain across it; a finger dragging across the print parts the
  lines; booking bar fixed at the foot.
- **The orchestrated moment:** on the first scroll the curtain runs along its rail to the ladder in
  about 900 ms, lines bunching as they go, and stays open. That is the page's one big movement.
- **Microinteractions (Shahar asked for more):** the drawer slides out from under the berth in
  0.3 s (Kube's ease, #17) when "Check dates" is tapped, and its three listing rows each extend a
  2 px ink edge on hover/focus like a drawer front being pulled; the ladder's three rungs step in
  one at a time, 80 ms apart, as the berth comes into view; hovering or focusing the booking button
  switches the berth's lamp on — the berth fill steps from `#E2B827` to the lit `#EED38F` in a hard
  wedge from the top-right corner, 200 ms; the print frames in the room section move ±4 rem inside
  their overflow-hidden wrappers (Kube's parallax, #17), off at ≤ 767 px. No fade-up on sections.
- **Structure, in order:** first screen → **the room**, pinned for two screens (#18, the one pinned
  run in a vertical page): text left; right, one 4:5 frame at 448 px through which `img-012`,
  `img-005`, `img-011`, `img-008`, `img-013` pass as scroll advances, each one entering behind a
  sweep of the same ink-line curtain; Beth's quote under the text → **finding the door** (heading at
  6 rem, four sentences, map link, Catherine) → **newly built** (`img-003`, `img-017`, `img-001` at
  320 px, parallax) → **guests** (ratings, categories, three short quotes) → **the wave** (spot
  sentence, the forecast, then `img-019`, `img-021`, `img-020` at 320 px) → **practicalities** →
  footer with the drawer repeated.
- **Motion and what it costs:** one 2D `<canvas>` for the curtain, hand-written, no library, about
  8 KB compressed; the print under it is a real `<img>`. Parallax + pinning + drawer ≈ 10 KB. Total
  script ≤ 30 KB, started after first paint; the drawer's code loads on first interaction (#5).
  WebGL is not used. **Reduced motion:** the curtain is drawn once, open against the ladder; no
  parallax, no pin (the room photographs stack as five 4:5 prints); the lamp still switches, without
  the wedge animation. **JavaScript off / no canvas:** concept 1's page with `img-018` in the berth
  and no curtain; the drawer is `<details>`.
- **Booking pattern:** the drawer under the berth — Kube's in-page overlay (#1) cut down to one
  panel that slides out of the berth's foot on desktop and rises from the bottom bar on a phone;
  plain link underneath (#3); one accent (#6).
- **Photographs:** `img-018` at 512 on the first screen (≈ 70 KB AVIF; first load ≈ 200 KB plus
  script, well inside 1.5 MB); five room frames at 448; the rest at 320.
- **Forecast:** **Yes**, in the wave section, after the `spot` sentence and below every offer; never
  on the first screen. Mapping: dossier `location.spot` "Kabalana beach break" and
  `location.distance_to_beach` "Kabalana Beach" → Rosa spot id **`kabalana`**, name **"Kabalana"**
  (checked in Rosa's `data/index.json` on 2026-09-22: `kabalana` → name "Kabalana", town Kabalana,
  5.97747 N 80.34842 E; also in `agents/designer/fixtures/rosa-kabalana.json`). The dossier also names
  The Rock reef; Rosa has no spot for it, and the block is labelled Kabalana only and never stands for
  The Rock. **Left half, drawn by the site** in Urbanist on the ground: wave height now at 6 rem
  weight 200, the time it is for, swell period and direction, wind speed with on/cross/offshore — one
  headline, no days. **Right half:** Rosa's own widget, `theme=light` (the page is light), metric,
  in a reserved 420 × 500 box, `src` set only when the section nears the viewport; never restyled,
  cropped or covered. Both halves have fixed dimensions. Fallback with JS off, a failed request or
  data older than 24 h: "See today's forecast for Kabalana on Rosa". Credit: "Forecast for Kabalana
  by Rosa", linked to `https://rosa.surf/spot/kabalana`.
- **Fails if:** the curtain reads as a barcode or a glitch effect — the lines must hang, bunch and
  swing like fabric on a rail, with uneven spacing, or the one thing becomes a gimmick.

### 3 · unique — **"Inside"**

**The idea:** the first screen puts you inside the berth, and scrolling climbs you out of it into the
room.

- **The one thing:** the berth, drawn from inside as a box in perspective: ceiling, back wall and
  one side wall as three flat planes (`#EED38F` lit, `#E2B827`, `#CF9B0D` shade), the square niche
  recessed in the back wall, a black lamp arm as a 2 px ink line, and the open side of the box is the
  screen. Flat planes only, hard edges, no texture (references.md #27: no photograph clears 1200 px,
  so the large moment is drawn, in colours sampled from the photographs).
- **First screen:** the canvas fills the viewport below the top line. On the back wall, as real DOM
  text in ink: *A two-minute walk from Kabalana* in Urbanist 200 at about 9 rem, the tagline, the
  Hostelworld score, and the violet "Check dates" button with the phone under it. The niche sits
  beside the headline; the pointer tilts the viewpoint by up to 3° — you lean in the bunk — and the
  planes shift against each other while the text stays put. No pillow, bed or second berth is drawn:
  one box, empty, so nothing can be counted. **On a phone:** the same box drawn narrower and taller,
  headline 2.8 rem on the back wall, device tilt is not used (the view holds still), booking bar
  fixed at the foot.
- **The orchestrated moment:** scrolling climbs out. Over the first 120 svh the camera pulls back
  through the open side; the box flattens into one yellow rectangle, the ladder appears on its right
  edge, and the rectangle shrinks and docks as a small berth at the bottom-right corner that holds
  the "Check dates" button for the rest of the page — the berth becomes the booking control. Under
  reduced motion none of this happens (see below).
- **Structure, in order:** inside → **the room**: the page is now the ground; "One dorm, and that is
  deliberate" at 6 rem; `img-018` at 512 px (the photograph of what you have just been inside),
  `img-012` at 640, `img-002` and `img-008` as 4:5 prints at 320; Beth's quote → **finding the
  door**: the heading at 7 rem, the four sentences, the map link, Catherine; the docked berth's
  ladder grows one rung while this section is on screen — the only ornament here → **newly built**
  (`img-013`, `img-003`, `img-017` at 320) → **guests** → **the wave** (spot sentence, forecast,
  `img-019`, `img-021`, `img-020` at 320) → **practicalities** → footer, where the docked berth opens
  out once more, large, as the drawer with all three listings.
- **Motion and what it costs:** WebGL, hand-written: about a dozen flat-shaded quads, a camera on a
  scroll-scrubbed path, pointer tilt eased at 0.08 (Lenis-like lerp, done by hand), DPR capped at
  1.5, paused when off-screen; ≈ 25–35 KB compressed including a 2D-canvas fallback. Kube parallax on
  the room prints, off at ≤ 767 px (#17). The drawer eases 0.3 s. **WebGL unavailable:** the same box
  on a 2D canvas (planes are flat, so it draws identically). **Reduced motion:** an inline SVG of the
  box interior (≤ 10 KB), no tilt, no fly-out; the small berth is simply fixed at the corner from the
  start. **JavaScript off:** that SVG, every word in the DOM, the drawer as `<details>`. When
  shooting, remember references.md #29: DOM text over the canvas can punch a blank rectangle in
  headless captures.
- **Booking pattern:** the docked berth — a fixed corner control that opens as a right-edge
  slide-out (#1) holding the three listings, the rates sentence and the phone; plain link underneath
  (#3); code booted on first interaction (#5); one accent (#6).
- **Photographs:** none on the first screen; `img-018` at 512, `img-012` at 640, the rest at 320.
  First load ≈ 90 KB plus the script.
- **Forecast:** **Yes** — same mapping as concept 2 (dossier "Kabalana beach break" → Rosa
  `kabalana`, "Kabalana"), in the wave section: the site's headline on the ground at left in
  Urbanist 200, Rosa's widget right in `theme=light`, 420 × 500 reserved, lazy, same fallback link
  and credit. No day boxes.
- **Fails if:** the box reads as a 3D-software demo or a yellow void — it must be recognisably the
  berth in `img-018` within a second (the niche and the lamp do that work), and it must stay flat and
  hard-edged, never lit with gradients.

## 5. Divergence table

| Business | Variant | Archetype | First-screen device | Grid | Colour ground | Motion idiom | Booking pattern |
|---|---|---|---|---|---|---|---|
| **Layday Surf** | calm · Berth | the berth | one flat yellow berth with the headline lying in it, ladder on its edge, drawer beneath | 12-col, left-weighted: berth 1–9, ladder, one print 10–12 | cool white `#E8E9F0` | none, 0 JS | `<details>` drawer under the berth |
| **Layday Surf** | interactive · Curtain | the berth | the berth with an ink-line curtain across a print of a real berth, parted by the pointer | 12-col, berth full content width; one pinned photo frame | cool white `#E8E9F0` | curtain drawn on scroll + microinteractions (drawer, rungs, lamp) | drawer sliding out of the berth's foot |
| **Layday Surf** | unique · Inside | the berth | inside the berth: a flat-plane yellow box in perspective filling the screen, headline on its back wall | full-viewport box, then 12-col open page | cool white `#E8E9F0` (after the box) | camera climbs out of the box; box docks as the booking control | docked corner berth → right slide-out |
| KA Surf Hostel | calm · Field | the garden | full-width light headline; three upright prints standing half-deep in one flat green field | open field, staggered free-standing objects | cool white `#F0F1F2` | none, 0 JS | `<details>` slide-down sheet, 3 tiles + tel |
| KA Surf Hostel | interactive · Planks | the garden | a band of upright green slats that turn under the pointer, five prints behind them | open field | cool white | slats turning to the pointer, then a draggable rail | in-page overlay sheet |
| KA Surf Hostel | unique · Canopy (picked 2026-09-22) | the garden | a cut-paper leaf canopy filling the screen, with a white clearing that holds the headline | open field with one green spine that changes column | cool white | leaves parted by the pointer, closing into a spine on scroll | right-edge slide-out |
| Lavish Haven | calm | the courtyard | full-bleed night pool | 12-col editorial | cream | CSS fixed bands | docked strip |
| Lavish Haven | interactive | the courtyard | pinned water canvas | 12-col editorial | cream | water | slide-down drawer |
| Lavish Haven | unique | the courtyard | type on plaster over a fixed waterline | 12-col editorial | plaster | water + projected type | right slide-out |
| Lavish Haven | gold page (approved 2026-09-21, outside 4d) | the courtyard | a pool-shaped window of live water on a white page, opening to full screen | wrapped single column + photo strip | cool white `#F5F8FA` | water, noon to night | right drawer |

Layday's round-2 rows ("the printed spec card") are retired and not in play; nothing of theirs is
reused. No archetype + first-screen combination repeats: "the berth" appears only in Layday's rows.

Near-misses, stated rather than hidden:

- **Three sites on a cool white ground with a light geometric sans** (Layday, KA, the Lavish gold
  page), because `agents/designer/custom.md` asks it of every site. They are held apart by the
  carried colour (yellow and violet; leaf green and watermelon; pool blue and lamp yellow), by
  family (Urbanist; Outfit; Jost), by first-screen device and by section order.
- **Yellow appears on Lavish's gold page** as its booking button. At Layday yellow is the large
  field and booking is violet, so the roles do not coincide; blue, which would have made the Lavish
  palette inverted, was refused for that reason (§3).
- **A drawn first screen in two unique concepts** (KA Canopy, Layday Inside), both from
  references.md #27. KA's is an organic canopy around a white clearing that the visitor pushes
  aside; Layday's is a rectilinear box interior, one colour, that the visitor climbs out of. KA's
  motion ends in a green spine down the page; Layday's ends in a small docked rectangle and no line.
- **A vertical ink element next to a colour field.** Layday's ladder is 2 px, never longer than the
  viewport, and never changes column; KA's spine is a solid green column that runs the whole page.

**The Lavish Haven** — a visitor meets blue water and a hotel arranged round it; at Layday they meet
one yellow box with a black ladder, and there is no water until the page is nearly over.

**KA Surf Hostel** — a visitor sees green, leaves and small photographs standing apart in air; at
Layday there is no green at all, no scattered objects, and the whole first screen is one square-cut
yellow shape with the words inside it.

## 6. Where every fact and colour comes from

| In this file | Dossier key |
|---|---|
| one dorm; one room type "Single Bed in 6-Bed Dormitory Room" | `room_types[]`, `reviews.quotes[]` (Catherine) |
| no bed count (6-bed vs 4 bunks) | `contradictions[0]` |
| newly built; family-run; kept clean daily | `reviews.quotes[]` (Beth, Jennine, Alina, Akshay), `business.since.gap`, `business.run_by` |
| two-minute walk to Kabalana Beach | `location.distance_to_beach`, `reviews.quotes[]` (Beth) |
| black gate, wooden platform, door right of the house; sign promised | `location.finding_it`, `gaps[]` (`location.finding_it`) |
| 9.8/10 (10), 10/10 (6), 5.0/5 (15); seven categories at 10.0; never averaged | `reviews.hostelworld`, `reviews.booking`, `reviews.google`, `contradictions[1]` |
| check-in 14:00–19:00, check-out by 14:00 | `stayInfo`, `hours_note` |
| phone +94778553343; no WhatsApp; no email; no site or socials | `contact.phone`, `contact.whatsapp.gap`, `contact.email.gap`, `existing_site` |
| three listings, path `engine` | `booking.path`, `booking.engine_url`, `booking.other_engines` |
| no rates | `gaps[]` (`offers`) |
| Kabalana beach break; The Rock reef | `location.spot` |
| map link; no coordinates | `location.map_url`, `location.lat_lng.gap` |
| berth details (yellow plaster, curtain, lamp, niche, drawer, ladder) | `images[]` `img-002`, `img-005`, `img-008`, `img-018`, looked at |
| photograph sizes | `images[].width/height`, confirmed with PIL on each file |
| Rosa `kabalana` | Rosa `data/index.json` (fetched 2026-09-22), not a dossier fact; the mapping is from `location.spot` |

Colour sample boxes (left, top, right, bottom in image pixels; median per channel unless noted):
ground `img-017` 870,370,970,420 (median of the brightest fifth) · quiet panel `img-001`
400,380,540,500 · ink `img-008` 343,250,352,700 · berth `img-002` 310,250,420,440 · berth lit
`img-008` 290,300,330,700 · berth shade `img-018` 480,370,580,480 · violet `img-012` 745,590,790,650 ·
(refused) dull yellows `img-005` 340,380,420,470 and `img-018` 300,20,700,120 · painting red `img-017`
440,150,480,190 · painting cobalt `img-017` 540,150,590,190 · board blue `img-021` 617,411,652,420 ·
doormat magenta `img-001` 360,555,385,572.

**If we could photograph one thing on location:** the black gate from the road, open, with the
wooden platform and the door beyond it, wide, at 2400 px or more. It is the picture that stops guests
getting lost, the only thing the directions section lacks, and the pitch in a single frame.
