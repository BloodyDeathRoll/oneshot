# Global Surf Lodge Kabalana — mockup 3 · unique · "Waterline"

designer 0.4.1 · station 4e · run `2026-09-globalsurf-02` · 2026-09-28

Shots are taken over `http://localhost` (a static server on `dist/`), not `file://`: Chromium treats
every `file://` image and video as cross-origin, so a WebGL texture upload from them is refused and
the page (correctly) falls back to its static waterline. Over http, as deployed, the shader runs.

## look-log

Old site beside every round: `dossier/global-surf-adventures/assets/old-site-lodge-desktop-fold.png`,
`old-site-lodge-mobile-fold.png` (the lodge page: a sepia tractor frame, a badge printed through the
headline, a breadcrumb, a Messenger bubble), `old-site-home-desktop-fold.png`.

### Round 1 — first screen (`shots/round-1/`)
- **Wrong as design:** two identical coral buttons on one screen (header and hero) split the eye; the
  tagline and the proof line sit on the white daybeds (desktop) and the white roofs of the drone shot
  (phone) and nearly vanish; the header repeats the H1 word for word; the underwater half has a
  rainbow fringe along the line on the phone that reads as a glitch, not water.
- **Change:** one coral button on the first screen (the header's appears only once docked); the
  header carries four quiet section links on desktop and nothing but the name on the phone; a
  low-left scrim so the words hold over any frame of the film; chromatic offset cut by two thirds,
  a brighter meniscus under the 1 px ink line.
- **Against the old site:** already clearly better at a glance — their lodge page opens on a sepia
  tractor with a badge through the headline; this opens on their own sunlit pool with the water
  line cutting through it, the name, one button straight to the packages and a dated rating.

### Round 2 — first screen (`shots/round-2/`)
- **Wrong as design:** on desktop it now holds — one coral action, four quiet links, the line lying
  across the pool with the refracted, magnified water under it; but on the phone the tagline still
  melts into the white roofs of the drone shot, and the name appears twice (header and H1) on a
  screen that has room for it once.
- **Change:** a phone-only scrim shaped to the text block (dark between 26 % and 52 % of the height,
  clear above and in the water), the header name hidden on the phone until the bar docks.
- **Against the old site:** better at a glance on both widths; the old lodge fold has no price
  path, no rating and a Messenger bubble over the copy.

### Round 3 — first screen (`shots/round-3/`)
- **Wrong as design:** the phone reads cleanly now; what is left is the drone frame the capture
  happened to land on (bright roofs) — the scrim is sized for the worst frame of the 12 s cut, so it
  holds for all. On desktop the scrolled capture shows the header still transparent over the last
  90 px of the hero: it docks only when the hero has fully left.
- **Change:** scrim a touch deeper (0.58); from here the first screen is fixed and the rest of the
  page is built under it.
- **Against the old site:** clearly better: their own lodge, their own water, one action, a dated
  rating; the old fold is a tractor.

### Round 4 — whole page (`shots/round-4/`)
- **Wrong as design:** half of every level scene came out blank white (magenta on the sheet) once
  the scene slid under the docked header — traced with a probe to the headless compositor, not the
  page (references.md #29: the canvas reported `gl-live`, correct size, drawing); on the phone the
  big coral buttons would not wrap, so the "One price" paragraph and the closing CTA ran off the right
  edge, and the persistent foot bar never showed in the captures (same compositor artefact).
- **Change:** `opacity:.999` on the fixed header and foot bar (the #29 workaround); buttons wrap on
  the phone and go full width; nothing else.
- **Against the old site:** the old lodge page's first three screens are a tractor, two headings
  both reading "Choose your level" and a form; here the first three are the pool film, the
  over-under barrel print and the first level's own footage with its price.

### Round 5 — whole page (`shots/round-5/`)
- **Wrong as design:** each level's details left a dead white field under the level name (the who-it's
  -for text in a narrow middle column); the feature line ran over the bright ceiling boards of the
  lounge; the phone foot bar had three cramped lines; the phone hero button broke onto two lines.
- **Change:** level name with the who-it's-for text under it on the left (7 columns), price block on
  the right spanning both rows; a soft radial scrim behind the feature line only; foot bar = price +
  "lessons, meals, room" + button; phone buttons 15 px, no wrap.
- **Against the old site:** clearly better; the old site states no price anywhere.

### Round 6 — whole page (`shots/round-6/`)
- **Wrong as design:** little left at 1440 and 390: "Twelve rooms, one big family" leaves "family"
  alone on its line at 1440 (it surfaces from narrow to wide as it crosses the line, so the break
  moves; accepted); a line of explanatory text under "Pick your level" was mine, not the copy's.
- **Change:** removed that line (copy rule). Video posters now point at the AVIF files the pictures
  already load (the `.jpg` posters were being fetched twice, 163 KB on first load).
- **Against the old site:** yes — see "Why it beats the current site" below.

### Round 7 — final whole page (`shots/round-7/`)
Checked for overflow, overlap and unreadable text at 1440 and 390: none found. Static layouts
looked at in `shots/static/` (`rm-*` = reduced motion: poster, CSS waterline, no video request;
`nogl-*` = WebGL disabled: film plays, 1 px ink line at each join).

**Why it beats the current site** (old-site-lodge-*-fold.png beside round-7 sheets): their lodge
page opens on a sepia tractor with the logo badge printed through the headline and a Messenger
bubble over the text, states no price on any page, and loses the package on every book button.
This opens on their own sunlit pool film with a live water surface across it, the name, one coral
button that lands in the package list in one tap, and a dated 8.6/10; one scroll down, each level
arrives as its own footage rising through the water, with $1,466, what is included and its own
product link.

## images

All business-owned (the business's YouTube channel / globalsurf.com, per `assets/index.json`).
| asset | use | licence note |
|---|---|---|
| vid-009e (orchestrator edit of vid-009: pool deck → reef surf) + poster | hero film, full-bleed | business-owned, YouTube @globalsurf1582 |
| vid-010 cut + poster | Level 1 scene | business-owned; faint badge top-left, cropped by cover/4:5 |
| vid-003 cut + poster | Level 2 scene | business-owned; badge top-left cropped by a 1.14 zoom anchored bottom-right |
| vid-002e (orchestrator edit: two barrels) + poster | Level 3 scene | business-owned; badge cropped the same way |
| img-100 (2000) | intro print, drawn ≤ 720 px | business-owned; surf place unidentified, no caption or place claim |
| img-005 (2000) | feature, full-bleed | business-owned, lodge |
| img-118, img-111 (1280, 3:2) + img-011, img-024, img-023 (4:5 crops) | day section: two big frames and a 3-up strip | business-owned; surf frames unidentified place, not captioned |
| img-075 | beside the amenities list, 3:2 | business-owned, lodge |
| img-026 (2000×1123) | lodge scene, full-bleed | business-owned, lodge |
| img-015, img-064, img-063 | rooms, cropped 3:2 | business-owned, lodge; not tied to a room type |
| img-016 | guests print, 4:5 | business-owned, lodge |
| img-062 | getting here, drawn ≤ 900 px | business-owned, lodge from above |
| img-093 (1536) | closing band, drawn ≤ 1440 at desktop | business-owned, lodge |

## gaps

- No season, no staff languages, no reply time: not shown.
- The Rock / South Point: named only as the copy names them; no break type or level fit.
- Surf footage is never tied to Kabalana's own wave; levels are illustrated, not located.
- WhatsApp is the Israeli HQ mobile (`bookingLinks[5]`), phone the HQ landline — used as given.
- Google rating (no count) not shown.

## conflicts

- Concept: persistent bar with a level switch "on every screen". On the phone the switch does not
  fit a 390 px bar with the price and a 44 px button; the phone foot bar carries price, inclusions
  and the engine button; the level switch lives in the desktop bar only. Alternative: a two-row
  bar, ≈ 100 px of a 844 px screen.
- Concept: waterline "≈ 0.8 s of scroll" at each join. Built as a viewport waterline at 80 % of the
  height: the incoming scene rises through it and the line then sinks out of the frame, so a scene
  at rest is clear. Same idea, no pinning.
- Interface labels not in `en.json` (template's, per the schema): "Base price in the booking engine,
  28 Sep 2026" (restates the copy's dated price), "as of 28 Sep 2026", "Packages and dates",
  "Pick your level ↓", "Call …", section links. Flag for the copyeditor if unwanted.
- Level 2 uses the new vid-003 cut (the concept predates it and planned img-125).
- Rosa forecast: not carried, per the concept.

## other variants in this run (hard constraint 5)

Same business, so all three open on vid-009. What a visitor notices: calm ("Daybed") keeps the film
clean with a centred title in a 1200 px column; interactive ("Pick your water") sets a giant
"Kabalana" across the pool and switches level clips on a pinned stage; this one lays a live
refracting water surface across the film and makes every later scene rise through it, in Archivo
Expanded on the whitewater-foam ground `#DDE5F0`.

## checks (run once, at the end)

- `node tools/check-design.mjs sites/global-surf-adventures/mockups/unique/dist/index.html`: ok, 0 problems, 0 warnings.
- `node tools/check-places.mjs global-surf-adventures`: 0 borrowed images, 0 failing.
- `node tools/funnel.mjs …/dist/index.html`: clicks_to_book 1, primary engine, CTA above the fold, 0 broken.
- First load (headless, no scroll, 8 s, over http): 279 KB without video at 390 and 1440 (HTML 45 KB,
  Archivo woff2 89 KB, hero poster AVIF 41 KB, three level posters 46 KB, img-100 57 KB); hero video
  after first paint 1.50 MB on the phone (m1280 webm), 2.98 MB on desktop (d1920 webm). Level clips
  load only when their scene is within one screen.
- Not verified: a real phone or GPU (software GL only); Safari (no AV1 → MP4 path untested); fonts
  from Google Fonts at 4e.

## Round 2 of review (4f → 4e), 2026-09-28

Reviews read: `reports/2026-09-globalsurf-02/global-surf-adventures.visual.md` (unique 7/10),
`.experience.md` (unique 8/10), `.md` (critic 72.0/80).

### Round 8 — whole page after the review fixes (`shots/round-8/`)
- **Wrong as design (before):** hero loop was a seven-shot montage (tuk-tuk driver under the title);
  the first 0.5 s on a slow phone was a flat teal panel; the waterline swept a whole screen with
  heavy refraction, so mid-scroll frames were smeared; level panels were tall pale-blue slabs with a
  dangling "Level n –"; Fomies opened on legs on sand, Riders on roofs; no level switch on the phone;
  level scenes pulled d1920 clips (8.2 MB); laptop p95 frame 50 ms.
- **Change:** hero = vid-009e (pool deck → reef surf), level 3 = vid-002e (barrels); every scene has
  a gradient sampled from its own poster behind the poster `<img>` (never flat teal; a 40 px LQIP
  image failed check-design's full-bleed rule, so it is colour only), level posters load eagerly;
  the transition now runs over ≈ 0.22 of a screen and at 55 % strength (less magnification, less
  displacement, lighter tint), and the canvas switches off as soon as the line has left a scene;
  level panel = name beside price and button, who-it's-for and includes below on hairlines, label
  "Level n" with the dash visually hidden (still in the heading text); Fomies starts at 0.5 s (the
  stand-up) and never loops back before it; phone bar = price line + Fomies / Rollers / Riders
  (jump, current one inked) + a button that becomes "Book Fomies/Rollers/Riders" with that product
  link while its scene is on screen (desktop header button does the same); level scenes use m1280 on
  desktop; rating links, skip link and header rating ≥ 44 px; shader has no chromatic pass, 3
  caustic iterations, 1.0 resolution on desktop. Day section: two big 3:2 frames and a 4:5 strip;
  img-075 beside the amenities.
- **Against the old site** (old-site-lodge-desktop-fold / -mobile-fold beside round-8 sheets): the
  old fold is a sepia tractor with a badge through the headline and no price; ours opens on the pool
  sliding into a real surfer on a reef wave with the water line across it, one coral button, a dated
  rating, and each level's own water with its price one scroll down. Clearly better on both widths.

### Round 9 — final (`shots/round-9/`)
Hero scrim moved up so "Global Surf" no longer sits white on the white roof; the level the bar
reports is the one whose panel is on screen (35 % line, not 50 %). No overflow or overlap at 1440
or 390.

### Before / after (measured, headless, software GL, over http)
| | before | after |
|---|---|---|
| laptop scroll frame time p95 / frames > 50 ms | 50 ms / 82 (critic walk) | 16.8 ms / 4 (max 67) |
| phone scroll p95 / > 50 ms | 33 ms / 5 | 16.8 ms / 0 |
| level clips on a desktop scroll | 8.2 MB (d1920) | 5.4 MB (m1280) |
| first load, no video | 279 KB | 287 KB |
| hero video after first paint | 1.50 MB phone / 2.98 MB desktop | 1.89 MB / 3.62 MB (vid-009e) |
| check-design / funnel | ok / 1 tap | ok / 1 tap (engine), level product 1 tap from its scene, 2 from the phone bar |
