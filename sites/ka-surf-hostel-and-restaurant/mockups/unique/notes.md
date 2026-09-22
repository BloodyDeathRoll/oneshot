# KA Surf Hostel — 4e mockup, unique · "Canopy"

designer 0.3.2 · run `2026-09-ahangama-02` · concepts.md round 3, concept 3. Forecast block revised
under designer 0.3.3 on 2026-09-22 (rounds 9–11); width, centring and platform marks rounds 15–16.

## look-log

**Round 1 — first screen only** (`shots/round-1/`). As design: it reads as a wreath — about thirty
small blades cut off by the viewport edges ring the headline evenly, which is exactly the 2017
tropical-café print the concept warns about, and the two lit front blades are so big and pale that
they pull the eye away from the words and swallow the last letter of "Kabalana". Change: far fewer,
far larger blades, weighted to one side so the clearing leans left where the type is; one short front
blade that only nicks the end of a line; keep leaves off the tagline. A stranger would guess
generated: the even ring is what a default "leaf frame" looks like.

**Round 2 — first screen** (`shots/round-2/`). As design: ten large blades now read as a canopy and
the clearing leans left towards the type, but a shade blade on the left runs over the "B" of
"Beach", the lit front blade still hides half of the last "a" of "Kabalana" so the word reads
"Kabalanc", and on the phone the leaves take 55 % of the screen and the second ratings line runs off
the right edge. Change: pull the left blade back to the margin, shorten the front blade's reach, fix
the phone leaves by screen fraction (tips above 17 % and below 80 %) and stack the phone ratings. A
stranger might still take it for a stock "tropical" hero at a glance; the cut-paper slits and the
hard chamfered tips are what argue against it, so they stay large.

**Round 3 — first screen** (`shots/round-3/`). As design: the type is now clear of green everywhere
except the one deliberate nick, the phone clearing is about 64 % of the screen, and the desktop
composition has one heavy mass top-right answered by smaller blades bottom-left — it holds; what is
still wrong is an empty 52 px header strip on the phone above the leaves (the name is hidden there
until scroll), the front blade still covering most of the final "a", and short top blades on the
phone that read as polygons rather than leaves. Change: the phone header slides away until the
clearing has scrolled past, so the leaves meet the top edge; the front blade's tip stops at the
letter's edge; phone top blades lengthened. Would a stranger guess generated: less so — the one
cut-paper idea, the 10 rem ExtraLight heading and nothing else on the screen read as a decision.

**Round 4 — whole page** (`shots/round-4/`). As design: the walk works — the canopy closes into one
green column at columns 2–3 and the rooms section picks it up — but the line was broken by a 180 px
white gap at the foot of every section; the breakfast text ran under the fruit plate; the dorm print
stood clear of the spine instead of hanging off it; and on the phone the spine was missing altogether
(zero-width grid item), the forecast and "the swell is up" heading were set at heading size, and the
check-in times ran off the right edge. Change: the spine now runs into each section's bottom padding,
breakfast text narrowed to four columns, prints moved onto the spine's edge, phone spine stretched,
phone heading rule scoped to section headings, a script-ordering error (clamp used before it was
defined) fixed. Would a stranger guess generated: the one green line doing different jobs in each
section reads as intended; the gaps did not.

**Round 5 — whole page** (`shots/round-5/`). As design: the line is continuous now and the three
garden prints stand in the six-column field; still wrong: the third print overlapped the second,
the phone check-out time was cut off, and on the phone the front blade still hid the end of
"Kabalana". Change: the three field prints staggered with explicit offsets, phone times stacked, the
phone front blade pulled back to the edge; the no-JS/reduced-motion SVG canopy was exported from the
same geometry and inlined.

**Round 6 — whole page** (`shots/round-6/`, plus `shots/states/`). As design: the page reads as one
walk from the bed to the water, and the first screen, reduced-motion, no-JS and 2D-canvas versions
all show the same parted canopy. Still wrong, found in `shots/states/panel-*.png`: the slide-out's
third tile (Agoda) was clipped off the panel's right edge, because the tiles would not shrink below
their word width. Change: tiles now shrink evenly (min-width 0) with smaller type in the panel.

**Round 7 — whole page, final** (`shots/round-7/`). Verification shoot after the panel fix; the
scrolled sheets are the same as round 6 because the change is inside the closed panel. Left as it
is, and visible: while a section's turn is mid-slide, a still shows a stub of the green band apart
from the new column (it closes up as you scroll); on the phone the Agoda tile's "Check dates on"
wraps to two lines; the phone walk section has a lot of empty space above "Getting here", which is
the "five minutes of white" the concept asks for.

**Round 8 — whole page, stock-011 removed** (`shots/round-8/`). Removed the Ahangama view (stock-011): its
`.atm` wrapper with the `<img>` and licence line, the footer's "except the reef at Ahangama: …" clause and its
links (the footer now reads "Photographs: KA Surf Hostel's own, from its Booking.com listing and Instagram."),
the `.atm`/`.st`/`.lic` CSS and `.lic a` from a shared link rule; nothing added in its place and no other
change. On both sheets the blue wave section now ends on the three beach crops with the section's own bottom
padding, then the booking tiles. A stranger would not see a gap.

**Round 9 — forecast block, 0.3.3 rule** (`shots/round-9/`, shot from the file path). Before: the
Rosa block was the headline plus five bordered day cells (Mon–Fri height and bucket word), all drawn
by the page. After: the left half keeps only the headline (credit, 0.7–1.1 m, time, swell, wind,
"Rosa, updated…"); the day cells and their CSS are gone; the right half (columns 8–12, right-aligned)
is a reserved 420 × 500 box holding Rosa's widget iframe, `src` empty until an IntersectionObserver
(rootMargin 400 px) sets it from `data-src`. The quote moved to the row under the block, same columns
(9–12), because the widget now occupies its old place. What the sheet showed was wrong: the
right-hand box was empty. The shoot log says why: rosa.surf sends `frame-ancestors *`, which does
not match a `file://` page, so Chromium blocked the frame, its `load` still fired, and the page hid
the fallback link: an empty box, which the rule forbids. Change: on `file://` the page no longer
loads the frame and the plain link stays; the look is shot over http from round 10 on.

**Round 10 — forecast block** (`shots/round-10/`, the same `dist/` served at
`http://127.0.0.1:8765/`, no console errors). The widget renders in both sheets: Rosa's light card
with the rosa.surf badge, satellite header, "Kabalana", today's 3-hourly rows and the day dots.
At 1440 the headline sits in columns 1–6 and the card's top lines up with the credit line; at 390
the headline comes first and the card follows at 350 px wide inside the 20 px margins. Found in the
no-JS capture: the fallback link's underline ran the full width of the box instead of under the
words (a flex item's border). Change: the link uses a text underline.

**Round 11 — forecast block, final** (`shots/round-11/`, over http, no console errors). Sheets
the same as round 10 around the forecast; the no-JS box now shows the two-line underlined link
centred in the 1 px ink frame. Nothing else on the page changed between round 8 and round 11.
A stranger would read the right column as an embedded Rosa card, which is what it has to be.

**Round 12 — forecast block and guests section, Shahar 2026-09-22** (`shots/round-12/`, over http,
no console errors). Before: headline in columns 1–6, widget right-aligned in 8–12 with an empty
column between, and Saketh's quote under the widget in 9–12. After: headline in columns 1–5 and the
widget's 420 × 500 box left-aligned in 6–9, one 24 px gutter apart (measured 48–594 and 618–1038 px
at 1440), the pair under the spot heading's 1–9 measure; the widget markup is untouched. Saketh's
quote, words and attribution unchanged, now sits in the "What guests say about the staff" section
at columns 10–12 beside the veranda photograph and under Mia's quote, in the section's own `.q`
type; on the phone it follows Clara's quote. The blue section now runs heading, forecast, beach
crops. Sheets show no overlap or overflow at 1440 or 390; at 390 the halves stack headline then
widget inside the 20 px margins. What remains visible: at 1440 the headline's words end about
two-thirds into its five columns, so the air sits inside the headline column, not between columns;
on the phone the whole block (780 px) is taller than the space between the top line and the booking
bar, so `forecast-390.png` shows the bar over the widget's day dots.

**Round 13 — wide screens and the map, Shahar 2026-09-22** (`shots/round-13/`, over http at
`127.0.0.1:8931`, no console errors; plus `wide1920-NN.png` / `wide2560-NN.png` from a /tmp
Playwright helper that walks the page down so lazy content loads, then captures viewport stops).
Cause of the empty band: every section's 12-column grid did grow with the window, but nearly
everything in it is a fixed size — prints 320–480 px, the beach crops and booking tiles 300 px in
left-packed flex rows, the widget 420 px, type in rem — so above 1440 the items stayed put at the
left and the extra width collected on the right (at 1906 the crops ended at 1243 px, the tiles at
1185). Approach, applied to the whole page: a centred content box. `--pad` =
`max(48px, (100cqw − 1600px) / 2)` (main is an inline-size container, so `cqw` excludes the
scrollbar) is the side margin of every section, the sky panel's inner grid, the footer and the top
line (which uses `%` because it is fixed); the columns grow until the content is 1600 px (window
1696) and then stay centred. The two green bands that bleed to the right edge (`.here .spine`,
`.family .turn`) bleed by `--pad` instead of 48 px, so they still reach the window edge. Above
1440 only, the beach row becomes a 3-column grid over columns 1–9 and the booking tiles fill
columns 1–9 (the spot heading's and the forecast pair's measure); at 1440 both keep their 300 px.
Map: added in "Getting here" (below). As design, the sheets showed: 1920 and 2560 now carry the
page in the middle with equal bands (160 px and 480 px each side) — no section is lopsided; the
map at the first bbox was at zoom 15 with a third of the box sea; its credit hung below the text's
last line so the box ended 30 px short of the address. Pixel diff against round 12 at 1440: only
the map area (x 48–480 on two stops) and the animated canopy differ; forecast, crops and tiles are
pixel-identical. At 390: everything above "Getting here" identical; the map follows the address
and the rest of the page moves down by it. Change: bbox tightened to
80.3455,5.9760,80.3540,5.9845 (zoom 16), credit positioned under the box so the box's bottom lines
up with the address line.

**Round 14 — final** (`shots/round-14/`, same server, no console errors). The map is at zoom 16:
the pin, the lanes down to the A2 / Matara Road, the railway, "Kabalana" and the beach, with a
strip of sea. At 1440 the box is 432 × 470 in columns 1–4, top at the heading, bottom at the
address line, its right edge 126 px left of the line, as the text is 126 px right of it; at 1920
it is 517 × 516. 2560: content 480–2080, the forecast pair, crops and tiles all inside it. What
remains visible: the first screen's headline stays at 8.4 % from the window edge (the canopy is a
full-bleed composition drawn around it), so at 2560 it sits left of the content box's edge; the
crops and tiles end at column 9, leaving columns 10–12 empty, which is the section's 9-column
measure and matches 1440. Final captures: `shots/getting-1440.png`, `getting-1920.png`,
`getting-390.png`, `forecast-1920.png`, `photos-1920.png`, `booking-1920.png`.

**Round 15 — a 1200 px column, centred groups, platform marks, Shahar 2026-09-22**
(`shots/round-15/`, over http at `127.0.0.1:8947`, no console errors; plus `w1525-NN.png` /
`w1920-NN.png` from a /tmp Playwright helper that walks the page down so lazy content loads).
Why round 13 did not show: Shahar's CSS viewport is about 1525 px (1906 px screen with display
scaling), below the 1696 px where the 1600 px cap began to centre. Change: `--wmax` 1600 → 1200 px,
so `--pad = max(48px, (100cqw − 1200px)/2)` for every section, the sky panel, the footer and the top
line; above 1296 px the content is a centred 1200 px column (1440 now carries 1200 instead of 1344,
as asked). Forecast: the headline and the widget's untouched 420 × 500 box are wrapped in one grid
(`max-content` + `420px`, one 24 px gutter) centred as a group in the column; the spot heading now
spans the whole column (1/13) instead of 1–9. Beach photographs: 300 px each, 48 px apart, centred as
a group (the >1440 "fill columns 1–9" rule is removed); on the phone still a left-aligned swipe row.
Booking tiles: 300 px each, one gutter apart, centred as a group; phone unchanged. Each tile gets
its platform's mark (below, `images`), in ink like the tile's text, 32 px tall (22 px on the phone),
above "Check dates on" / the name; on hover it inverts with the text. Measured: at 1525 column
163–1363, pair 365–1160, crops 265–1261, tiles 289–1237 (all centred on 762.5); at 1920 column
360–1560, pair 562–1358, crops 462–1458, tiles 486–1434 (centre 960); no horizontal overflow. What the
sheets showed wrong: the marks sat centred in the tiles (a flex item stretched, the SVG centred
itself in the box). Change: `align-self:flex-start`.

**Round 16 — final** (`shots/round-16/`, same server, no console errors). The marks sit flush left
above the text in all three tiles, same height. At 1525 and 1920 the forecast pair, the three
photographs and the three tiles each sit centred in the 1200 px column with equal bands; the
heading fills the column. At 390 nothing moved: headline then widget, the swipe row, three tiles in a
row (the Agoda tile's "Check dates on" still wraps, as in round 7). What remains visible: the
"Rates change…" sentence above the tiles and the contact row below stay left-aligned on the column
(not asked to change); the first screen's headline still sits at 8.4 % of the window (the canopy is a
full-bleed composition), so at 1920 it starts left of the column's edge. Final captures:
`shots/forecast-1525.png`, `photos-1525.png`, `booking-1525.png`, `booking-390.png`,
`forecast-1920.png`, `booking-1920.png`. Booking hrefs compared before/after: identical (12
Hostelworld, 3 Booking.com, 2 Agoda). `check-design --no-shots`: unique ok, 0 problems, 0 warnings.

**Map — what and why.** OpenStreetMap's own embed (`export/embed.html`, mapnik layer, marker),
tiles untouched, no key; the response sets no cookie and sends no frame restriction (checked with
`curl -I`). A card sized by the text beside it rather than a column-height map: a 900 px portrait
slab would be a second big block competing with the green line, which is the page's one idea;
sized to the text and mirrored about the line, it reads as the other half of the spread. Square,
1 px ink frame (custom.md: thin black lines, nothing rounded). Title "Map of KA Surf Hostel,
Ahangama (OpenStreetMap)"; credit "Map © OpenStreetMap contributors" linked to
openstreetmap.org/copyright (a licence credit, not a caption). Loading copies the Rosa widget:
empty `src`, `data-src` set by an IntersectionObserver (rootMargin 400 px), `data-loading` while
loading, the box reserved by the grid row so nothing shifts; until it loads, and with JS off, the
box shows the address and the existing "Open the map" link. Marker: the dossier's
`location.plus_code` "X9J2+PR Ahangama" = 5.98181, 80.35206, which matches the scout's Google pin
in `reports/2026-09-ahangama-02/candidates.json` (5.9818405, 80.3520113). **Not** the
`@5.9794134,80.350836` in the Google Maps link: that is the viewport centre of a search, shared
with other businesses' links (Licuala Lanka carries the same `@`), about 300 m south-west of the
pin; and not `location.lat_lng` [5.9805, 80.3486], which the dossier itself notes as approximate
(about 400 m west).

**Lazy-load and no-JS evidence** (/tmp Playwright script, `http://127.0.0.1:8931/`, 2026-09-22):
- 390 × 844, load, no scroll, 3 s: 5 requests, hosts `127.0.0.1:8931, fonts.googleapis.com,
  fonts.gstatic.com`; 0 to openstreetmap.org, rosa.surf or rosa-data-opal.vercel.app; both iframe
  `src` null.
- Scrolled to "Getting here": 8 openstreetmap.org requests, first
  `https://www.openstreetmap.org/export/embed.html?bbox=80.3455%2C5.9760%2C80.3540%2C5.9845&layer=mapnik&marker=5.98181%2C80.35206`,
  then its embed CSS and JS; the box gets `.on`.
- JavaScript off, 1440, scrolled to the map: 0 third-party requests; iframe `src` null and hidden;
  the 432 × 470 box shows "No 207/A, Welhengoda, 80650 Ahangama, Sri Lanka / Open the map" →
  the dossier's Google Maps URL.
- `node tools/check-design.mjs ka-surf-hostel-and-restaurant --no-shots`: unique ok, 0 problems,
  0 warnings. `node tools/check-places.mjs`: 0 failing.

## images

All business photographs are the business's own (`license: business-owned`: property uploads on its
Booking.com listing, approved for use by Shahar 2026-09-19, or posts on its own Instagram
@kasurfhostel). None is captioned or tied to a room type. None is shown wider than its source.

| file in `dist/img/` | asset | licence note | how it is used |
|---|---|---|---|
| `img-001-576.jpg` | img-001 | Booking.com, business-owned | 384 px print, rooms, hangs off the spine |
| `img-004-576.jpg` | img-004 | Booking.com, business-owned | 384 px print, rooms |
| `img-003-576.jpg` | img-003 | Booking.com, business-owned | 480 px print, breakfast, over the spine |
| `img-005-576.jpg` | img-005 | Booking.com, business-owned | 320 px print in the garden field |
| `img-006-576.jpg` | img-006 | Booking.com, business-owned | 320 px print in the garden field |
| `img-008-576.jpg` | img-008 | Booking.com, business-owned | 320 px print in the garden field |
| `img-002-576.jpg` | img-002 | Booking.com, business-owned | 384 px print, family, over the spine |
| `img-012-432.jpg` | img-012 | Booking.com, business-owned | centre-cropped 1024×576 → 432×576 (3:4), 384 px, family |
| `img-023-480.jpg` | img-023 | own Instagram | turned upright, centre-cropped 640 → 480×640, 300 px, wave |
| `img-020-480.jpg` | img-020 | own Instagram | centre-cropped 640 → 480×640, 300 px, wave |
| `img-021-480.jpg` | img-021 | own Instagram | turned upright, centre-cropped 640 → 480×640, 300 px, wave |

**Platform marks on the booking tiles (2026-09-22, round 15).** Self-hosted in `dist/img/`, no
hotlinking; each drawn in one colour, ink `#060504` (the tile's text colour), 32 px tall. They label
links to the hostel's own listings on each platform (nominative use of the marks); none is modified in
shape. Colour is changed to one ink colour as briefed — a platform's brand guidelines may ask for its
colours; not checked against each platform's partner guidelines.

| file in `dist/img/` | source | licence / terms | what was done |
|---|---|---|---|
| `bookingdotcom.svg` | Simple Icons 16.32.0, `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/bookingdotcom.svg` (Simple Icons' own source for it: bookingholdings.com/media-room) | SVG data CC0 1.0 (Simple Icons); the mark is a Booking.com trademark | `fill="#060504"` added; path untouched |
| `hostelworld.svg` | not in Simple Icons; Hostelworld's own SVG favicon, `https://www.hostelworld.com/hw-icon.svg` (linked as `rel="icon"` on hostelworld.com) | © Hostelworld Group, trademark; no licence granted, used only to label the link to the listing | the two paths (orange rounded square, white "H") merged into one ink path with `fill-rule="evenodd"`, so the H is knocked out of the square |
| `agoda.svg` | not in Simple Icons; no favicon SVG on agoda.com (only `favicon.ico`, a 48 px PNG); Agoda's own header logo, `https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg` (the `<img>` in agoda.com's header) | © Agoda, trademark; no licence granted, used only to label the link to the listing | its six fills (grey wordmark, five coloured dots) set to ink; paths untouched. It is the wordmark with dots (140:72), so at the same 32 px height it is 62 px wide, where the other two are square marks |

Beach frames carry alt text of what is seen; none is labelled Kabalana, because the dossier does not
say where they were taken.

Excluded on purpose (concepts.md §2): img-010 (roundel reading "Sea Food Restaurant"), img-011
(buffalo, mis-described, not tied to the hostel), img-014 and img-017 (group photos at other
premises), img-015 (screenshot of someone else's post about Madeira). Not used by this concept:
img-007, img-009, img-013, img-016, img-018, img-019, img-022, img-024 (img-019 was cut; it was
prepared and deleted because a shirtless stranger fills it). No stock file is used.

**Removed 2026-09-22:** stock-011 (CC BY-SA 4.0, "Ahangama view — Sasith Lakshan wickramasinghe"). Reason: the page served a downscaled re-saved copy, against PLAN.md §9's re-save rule for share-alike files (critic 4f round 3 hard fail); Shahar's decision, 2026-09-22. Its `<img>`, credit line, footer credit and CSS are gone and `dist/img/stock-011-*.jpg` is deleted. No photograph replaces it.

## gaps

- **No WhatsApp, no email** (`contact.whatsapp.gap`, `contact.email.gap`). Booking is the three OTA
  listings plus `tel:+94773746053`. Every "Check dates" is a plain link to the Hostelworld listing
  (first `bookingLinks[]` row); with JS it opens the slide-out with all three listings and the phone.
  No prefilled message is possible; the tapped room is carried only as a line of text at the panel's
  head, never as a URL parameter.
- **No rates.** The offer block's sentence ("Rates change with the season and the dates — the
  booking links below show what is actually free.") sits in the panel and above the footer tiles.
- **No season** (`season: null`): nothing said about when it is good; the Rosa block is live data, not
  a season claim.
- **No reply time** (`booking.reply_time_hint` gap): not shown.
- **Hours**: only check-in/check-out and "Reception is open 24 hours" from `stayInfo`.
- **Socials**: the dossier has the Instagram, but `copy/en.json` does not carry it, so the footer does
  not link it (words and links on the page come from en.json; the map URL is the dossier's
  `location.map_url`, used as the "Open the map" link).
- **Rosa forecast, left half** is the checked-in fixture (`agents/designer/fixtures/rosa-kabalana.json`,
  generated 2026-09-21 14:25 UTC = 19:55 Colombo): `current.h` [0.7, 1.1] m, `current.t`
  2026-09-21T20:30+05:30 (a Monday), first in-window swell 12.6 s from 184° (south), wind 6.5 km/h
  from 270°, cross-shore. Rendered as static HTML so it shows with JS off. The 24-hour staleness rule
  and the live JSON request are 4g's job.
- **Rosa forecast, right half** is Rosa's widget, live:
  `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, the iframe exactly as in
  tools.md except `src` → `data-src`. **Theme: light.** The block sits on the page's sky panel
  (`#AFCFF7`) on a light page (house rule 1: light themes, never a large dark panel); Rosa's light
  card is white with ink text, so it reads as a white card on blue, while the dark card would be the
  one large dark panel on the page. Units metric, as the headline shows metres.
- **Lazy-load evidence** (`/tmp` Playwright script, `http://127.0.0.1:8765/`, 2026-09-22):
  - 390 × 844, load, no scroll, 3 s wait: 5 requests, hosts `127.0.0.1:8765, fonts.googleapis.com,
    fonts.gstatic.com`; **0** to `rosa.surf` or `rosa-data-opal.vercel.app`; iframe `src` null.
  - After scrolling to the block: the frame's `src` is set and it loads. Rosa requests:
    `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`,
    `https://rosa-data-opal.vercel.app/data/spots/kabalana.json` (made by the widget itself),
    `https://rosa.surf/favicon.svg`.
  - JavaScript off, scrolled to the block: 0 Rosa requests; iframe `src` null and hidden; the 350 × 500
    box shows "See today's forecast for Kabalana on Rosa" → `https://rosa.surf/spot/kabalana`.
  - At 1440 the widget box measures 420 × 500 (reserved; nothing shifts when it arrives).
- Captures: `shots/forecast-1440.png` (1440 × 900) and `shots/forecast-390.png` (390 × 844, DPR 2),
  both after the widget had loaded.

## conflicts

- **"KA Surf Hostel" in the clearing vs. the top line.** The concept puts the name in the clearing
  and a top line above the canvas. Both are kept; to avoid printing the name twice on one screen, the
  top line's name is hidden until the clearing has scrolled away (with JS; with JS off it shows). On
  the phone the whole top line waits off-screen until then, so the leaves reach the top edge.
  Alternative: show it twice.
- **"Vertex sway on two slow frequencies" in a WebGL vertex shader.** The two-frequency sway, the
  pointer repulsion and the scroll morph are computed in JavaScript once per frame and drawn by WebGL
  as flat-colour triangles (2D canvas when WebGL is missing, `?no-webgl` forces it). Same look and
  motion; one geometry routine feeds WebGL, 2D canvas and the static SVG. Not instanced quads.
- **Static SVG size.** Two inline SVGs (desktop 11 KB, phone 7 KB), each under the 15 KB the concept
  sets, 18 KB together.
- **`img-012` crop.** The concept asks for it "at 384 px" as a print; the one shape is 3:4, so the
  1024×576 night frame is centre-cropped to 432×576 around the ring lamp. It is shown at 384 px, below
  its new width.
- **Beach crops at 300 px on the sky panel**: done; on the phone they are a swipe row at 220 px.
- **The authoring hook `?svg`** (exports the canopy as SVG) is still in the script; it runs only
  with that query string. Delete at 4g.
- **Rosa forecast: concept vs. playbook 0.3.0 / designer 0.3.3.** concepts.md (round 3) asks for
  "five upright day cells beneath" the now line. The rule of 2026-09-21/22 forbids anything day-by-day
  in the site's half; the cells are removed and the days are left to Rosa's widget. Shahar's brief
  for this revision says the same.
- **Rosa's card is rounded (16 px) and has its own type (Inter), green and orange.** custom.md says
  nothing rounded and one flat colour for booking; the rule says the widget is never restyled,
  cropped or recoloured. The widget wins, as the rule says; the site's own half stays square and in
  Outfit, and the fallback box is square.
- **Two different "nows" side by side at 4e.** The left half is the fixed fixture (Monday 21 Sep,
  20:30) while the widget is live (today, 22 Sep). At 4g both come from the live JSON; at 4e this is
  what the rule's "fixture on the left, live widget on the right" produces. The fixture is also more
  than 24 h old today, which at 4g would switch the headline to the plain link.
- **A failed frame cannot be seen from the page.** rosa.surf's `frame-ancestors *` blocks a
  `file://` parent, and a blocked or failed cross-origin frame still fires `load`, so the page cannot
  tell a loaded widget from a blank one. At 4e the `file://` case keeps the plain link; over http(s)
  the frame is trusted once `load` fires. Suggestion for 4g: load the widget only after the
  headline's own JSON request succeeds and is under 24 h old, so a network failure keeps the link.
  Alternative (not done): leave the link visible under the frame, which shows its box edges round the
  card's rounded corners.
- **The quote moved one row down.** Saketh's quote sat in columns 9–12 beside the old block; the
  widget now takes that place, so the quote keeps its columns on the next row. No other element moved.
- **A second third-party embed (the map) vs. playbook §4.** Playbook 0.3.0 §4 names Rosa's widget
  as "the one third-party embed a site may carry", and says "Map is a static image linking to
  Google Maps, not an embedded map on load". Shahar asked on 2026-09-22 for a map widget in
  "Getting here"; built as asked: OpenStreetMap's embed, never on first load (0 requests at 390
  with no scroll), loaded only near the section, reserved box, address + link fallback. What the
  playbook rule would have cost: a static map image (self-hosted, no request) instead of a live
  embed — the playbook, not this page, needs to say which is wanted before 4g. Also: the map
  frame's own attribution strip already shows "© OpenStreetMap contributors", so the credit is on
  the page twice (the second one was asked for).
- **Wide-screen tiles and crops change at 1441 px, not at 1440.** To keep 1440 exactly as it was,
  the "fill columns 1–9" rule starts above 1440; at 1441 the tiles jump from 300 to about 318 px.
- **Default-look warnings**: none (fonts Outfit/Outfit/Outfit, ground hsl(210 7% 95%) — not cream,
  0 all-caps labels, 0 labelled headings).

## hand-off check 6 — what a visitor would notice is different

- **The Lavish Haven** (its three mockups and the gold page): they open on a photograph of the lit
  pool or a pool-shaped window of water, with a serif or Jost heading, on cream or blue-white; here
  the first screen has no photograph at all — cut-paper banana blades in three greens part around a
  10 rem Outfit ExtraLight headline, and there is no water until the last screen. Lavish's sections
  are 12-column editorial bands; here one green line walks down the page and changes column at every
  section, and the prints hang off it.
- **Layday Surf** (three mockups): a bordered spec card ruled into cells on an ochre field with a
  heavy wide sans; here nothing is bordered except the forecast's no-JS fallback box, the ground is cool white,
  the type is ExtraLight, and the page is mostly air.
- **Gold** (`the-lavish-haven.html`): no reuse of its first-screen device (water window), section
  order (pool → rooms → wave → close), palette (pool blue, lamp yellow) or typeface (Jost). Shared, and
  stated in concepts.md: a cool white ground, a light geometric sans, a right-edge drawer that
  remembers the tapped row — both required by custom.md or the concept.
