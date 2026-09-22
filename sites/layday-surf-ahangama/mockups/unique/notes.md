# Layday Surf Ahangama — unique · "Inside" — 4e notes

Designer 0.3.3, run `2026-09-ahangama-02`, 2026-09-22. Brief: `concepts.md` round 3, concept 3.
One file, `dist/index.html` (CSS and JS inline, Urbanist from Google Fonts), photographs in `dist/img/`.

## look-log

Every round was served over http (`python3 -m http.server`, a verified free port) and shot with
`tools/shoot.mjs`; both contact sheets were opened each round. Rounds 5–7 also carry 1525 and 1920 px
viewport stops (`w1525-NN.png`, `w1920-NN.png`); rounds 5–7 carry the reduced-motion, JS-off and
no-WebGL captures (`rm*`, `nojs*`, `nogl*`) and the drawer (`drawer1440.png`, `drawer390.png`).

**Round 1 — first screen.** The back wall was an empty yellow void: the headline, the score and the
button were missing, because the sticky stage makes its own stacking context under the fixed canvas.
The box also sat off-centre, because the "lean" rotated the wrong way and the headless mouse at 0,0
counted as a pointer, so the back wall slid instead of holding still. A stranger would read it as a
3D-software test render, not a berth. Change: stage above the canvas, orbit about the back wall
(translate plus counter-rotate), clip the drawing to the stage so the ceiling doesn't paint the top line.

**Round 2 — first screen.** It reads as the inside of a box now, and the 1px ink seams make it look
drawn rather than rendered. Wrong: the words sit high on the back wall with half the wall empty
underneath; the niche is a flat square; on the phone the words spill out of the box as it flattens
(they ride the wall, and the wall shrinks to 16:10). Change: the words sit at the foot of the back
wall (lying in the bunk), a deeper niche with lit inner faces, the words fade out before the box
flattens, and a full-height stage on the phone in camera mode.

**Round 3 — first screen.** The headline now lies low in the berth, and the niche and the lamp arm
make it img-018 within a second. Still wrong: on the phone the niche squashes into a thin sliver
while the box flattens, because it scales with the box height. Change: the niche keeps its square as
the box morphs. A stranger might guess generated from the flatness, but the flatness is the brief
(flat planes, no gradients); nothing else gives it away.

**Round 4 — whole page (first build below the fold).** Wrong: Beth's quote ran under the two berth
prints (the pair is wider than six columns); the docked berth, at 208 × 130, hid the ends of lines
in the right-hand column; on the phone the address ran into "Open the map". The climb-out works: box,
then a flat 16:10 berth growing its ladder, then docked at the corner (phone: the foot bar).

**Round 5 — whole page.** Quote and pair are separated (5 + 7 columns); dock is smaller
(176 × 110); the phone address is fixed. 1525 and 1920 checked: content sits in the centred 1200 px
column, groups (trios, pair, forecast pair, footer berth) are centred in it, and only the first-screen
box runs full width. States: the reduced-motion and JS-off pages show the static box; no-WebGL draws
the same box on a 2D canvas and flies the same way. Wrong: the drawer is yellow on the yellow back wall
with no edge, and the static lamp is too small to read.

**Round 6 — whole page + states.** The drawer has a 1px ink edge; the static lamp has a wall plate and
a bigger head. The page sheets are the same as round 5: this round's changes are in the drawer and the
static layout, which `shoot.mjs` does not capture, so they are in `rm1440-00.png` and `drawer1440.png`.
Wrong: on the phone, "Close" still sits on top of the drawer's first sentence.

**Round 7 — whole page (last).** Visible change: the phone drawer's first sentence now clears "Close"
(`drawer390.png`); the phone drawer also loses its left border. The page sheets are otherwise the same
as round 6 by design. Looked at for overflow, overlap and unreadable text at 1440, 390, 1525 and 1920:
none found except the known overlap below.

**Known, not fixed:** at 1440 and 1525 the fixed docked berth (bottom-right, 176 × 110 plus its
ladder) covers the ends of text lines in the right-hand column as they scroll past (the column ends at
x 1320 at 1440). At 1920 it sits clear of the column. On a phone it is the foot bar and the page has
bottom padding for it.

## images

All from `dossier/layday-surf-ahangama/assets/`, all `license: business-owned` ("property-uploaded
photo on the business's own Booking.com listing; Shahar approved OTA listing photos as usable
2026-09-19"). Copied with PIL, never enlarged; filenames keep the asset id.

| File | Asset | Source → copy | Shown at | Alt text says |
|---|---|---|---|---|
| `img-018-1024.jpg` | img-018 | 1024×768, as is | 512 CSS px | inside a berth: plaster, niche, lamp, pillow, curtain |
| `img-012-1024.jpg` | img-012 | 1024×768, as is | 640 CSS px | the dorm through its open door |
| `img-002-45.jpg` | img-002 | 576×768 → 576×720 centre 4:5 | 320 | a lower berth close up |
| `img-008-45.jpg` | img-008 | 576×768 → 576×720 | 320 | berth end, ladder, drawer |
| `img-013-45.jpg` | img-013 | 576×768 → 576×720 | 320 | cane lockers, concrete shelving |
| `img-003-45.jpg` | img-003 | 576×768 → 576×720 | 320 | basin, cane mirror |
| `img-017-45.jpg` | img-017 | 1024×768 → 614×768 crop → 576×720 | 320 | bench, cushions, painting |
| `img-019-45.jpg` | img-019 | 1024×768 → 614×768 crop → 576×720 | 320 | surfers in the line-up |
| `img-021-45.jpg` | img-021 | 1024×768 → 614×768 crop → 576×720 | 320 | a blue board carried through the shallows |
| `img-020-45.jpg` | img-020 | 1024×768 → 614×768 crop → 576×720 | 320 | a man walking on wet sand, palms |

No photograph is full-bleed or on the first screen (the first screen is drawn). Beach alt text never
says "Kabalana": the dossier doesn't say where the beach frames were taken. No stock, no captions.
**Excluded:** img-009 (a private double room; the only room type sold is a dorm bed), img-022 (a
third-party resort building dominates it), img-015 (weak), img-006 (a near-duplicate of img-003),
img-014 (a near-duplicate of img-012). The rest were left out for the concept's photo list, not for
policy reasons.

## gaps

- **No rates** (`gaps[]` offers): no price is shown. The offer block's rates sentence sits in the
  drawer and the footer berth, next to the three listings.
- **No WhatsApp, no email:** the booking path is the dossier's `engine`. Every "Check dates" is a real
  link to the Hostelworld listing; with JS it opens the drawer (Hostelworld, Booking.com, Agoda, phone).
  URLs checked by script against `dossier.json`: identical, with no date parameters.
- **No bed count** (`contradictions[0]`): no number and nothing countable. One box is drawn, with no
  bed or pillow. Catherine's verbatim quote says "4 bunk beds"; it is a guest's words and stays.
- **No coordinates:** "Open the map" links to the dossier's `map_url`; no drawn pin, no embedded map.
- **No season:** nothing shown.
- **No photograph of the gate or platform:** "Finding the door" is carried by type (a 7 rem heading
  and the sentences as a ruled column) plus Catherine's quote.
- `rooms[0].note` ("bed count is not published consistently") is an internal note and is not shown.
- **Rosa fixture age:** `rosa-kabalana.json` was generated 2026-09-21 14:25 UTC, which is more than
  24 h before today. At 4e it is inlined as tools.md says. 4g must apply playbook §4's 24 h fallback
  to the live JSON.

## conflicts

1. **Static box: CSS planes, not an inline SVG.** The concept asks for an inline SVG (≤ 10 KB) under
   reduced motion and JS off. I drew the same planes as two `clip-path` divs on the yellow stage, plus a
   CSS niche and lamp. CSS can tie the geometry to the stage (`--a` × width/height) so it matches the
   camera's starting frame exactly; an SVG polygon cannot use those values. Cost of the alternative:
   one SVG per breakpoint, drifting from the canvas.
2. **The forecast's reserved box is not the one shape.** §3 lists "the forecast's reserved box" as a
   16:10 berth. tools.md fixes Rosa's widget at 420 × 500, portrait, and forbids cropping it. I kept
   420 × 500; its JS-off state is a 1px ink outline around the plain link. The one shape appears on
   the first-screen box (it flattens to 16:10), the docked berth (176 × 110), the drawer (16:10 on
   desktop) and the footer berth.
3. **Phone booking control.** The concept docks a small berth at the bottom-right and, on a phone,
   asks for a fixed foot bar. On a phone the box docks into the bar, which is full width, 64 px tall,
   yellow, with its ladder on the right, and so not 16:10.
4. **Offer block split.** `copyBlocks[offer]` paragraph 1 is under "The room"; paragraph 2 (the rates
   sentence) is in the drawer and the footer berth, as concepts §2 directs. All words appear.
5. **"Tilts the viewpoint by up to 3°"** is built as an orbit about the back wall (camera translation
   plus a counter-rotation of at most 3°), so the back wall and its words hold still and the seams
   swing. A pure rotation moved the whole wall under the words (round 1). Fine pointers only, off
   while scrolling out, off on touch.
6. **Beth's quote names "Rukshan".** Concepts §1 says the name is a guest's, unconfirmed, and not used.
   The testimonial is verbatim in `en.json` and shown whole; the name is used nowhere else.
7. **Words not in `en.json`.** Only interface labels, which the schema gives to the template:
   "Check dates", "check dates", "Call", "or call", "Close", "Open the map", "Check in from / until",
   "Check out by", rating lines ("9.8/10 on Hostelworld, 10 reviews"; "Hostelworld, 10 reviews"),
   quote attributions (author, platform, month from `date`), the formatted phone "+94 77 855 3343",
   and the Rosa headline and credit lines (playbook §4 exemption).

## default look (check-design)

`node tools/check-design.mjs layday-surf-ahangama --no-shots`: unique `ok`, 0 warnings. Urbanist on h1,
h2 and body; ground `#E8E9F0` (hsl 233 21% 93%, not cream); 0 all-caps labels; 0/7 labelled headings.
`node tools/check-places.mjs layday-surf-ahangama`: 0 borrowed images, 0 failing.

## Rosa forecast and lazy load (measured with Playwright, 390 × 844, touch)

- JS on, load with no scroll: hosts contacted were the local server, fonts.googleapis.com and
  fonts.gstatic.com; **0 requests to rosa**; the plain link was visible. After scrolling to the block:
  the iframe `src` was set to `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, 3
  rosa requests, class `on`, link hidden.
- JS off: 0 rosa requests before or after the scroll; `src` stays empty; the plain link "See today's
  forecast for Kabalana on Rosa" is visible in the reserved 420 × 500 box.
- `file://`: the script does not set `src` (Rosa will not frame there), so the link stays.
- The widget rendered live in the http shots (rounds 4–7). The headline half is inlined from the fixture
  (0.7–1.1 m; Monday 21 September, 20:30; swell 12.6 s from the south; wind 6.5 km/h from the west,
  cross-shore; Rosa updated 21 September 2026, 19:55). The credit line links to rosa.surf/spot/kabalana.
  The two halves are one 72 px gutter apart and centred as a group, and they stack on a phone.

## booking and states

- The drawer at 1440 opens from the hero "Check dates", focuses its first link, traps Tab, closes on Esc
  and returns focus to the button (checked by script). At 390 the foot bar's "Check dates" opens it too.
  The links were not followed off-site: no OTA page was loaded.
- Reduced motion (`rm1440-00`, `rm390-00`): the static CSS box, words on the back wall, the berth docked
  from the start, no canvas. JS off (`nojs*`): the same, and the dock's "Check dates" is a `<details>`
  holding the three listings and the phone; every other "Check dates" is a plain Hostelworld link.
  No WebGL (`nogl1440-*`): the same polygons on a 2D canvas, the same climb-out. No references.md #29
  black rectangles were seen in any capture.

## hand-off check 6 — against the other businesses and gold

Opened: KA calm round-7, interactive round-8, unique round-16 (picked, "Canopy") sheets, and the
Lavish gold page notes and shots.

- **Against KA unique (Canopy):** there, green leaf cut-outs are pushed aside around a white clearing
  and close into a green spine down the page. Here the whole first screen is the inside of one yellow
  box, drawn in perspective with ink seams, with the words on its back wall, and it flattens into a
  small berth docked in the corner. There is no green and no spine; the page below is plain ground,
  no colour column. The booking colour is violet, not coral.
- **Shared with KA, stated:** the forecast pair uses the same mechanics (a large light height, three
  lines, an "updated" line, the widget right), as instructed; KA sets it on a sky-blue band, this page
  on the ground with no panel. The practicalities row of three large light times, and large light
  rating numerals, are devices KA also uses (KA "Getting here"; KA interactive's 9.8 in the hero).
  Here they come from the concept and sit in a different order and grid, but a visitor comparing the
  two could notice them.
- **Against the Lavish gold page:** no pool-shaped window, no water, no blue, no Jost, no cut corner, no
  lamp-yellow button. Yellow here is the large field and booking is violet. The section order differs:
  inside → room → finding the door → newly built → guests → wave → practicalities → berth footer.
