# Cheeky Monkey Surf Camp — final site (station 4g)

designer 0.7.0 · run `2026-10-midigama-01` (test, operator alon) · 2026-10-27 · port of `mockups/unique/` ("Pick your
board"). Alon picked it at gate b and kept unique only: *"i like the unique one, but lets work on the background a bit
to make it more colorful with surf and beach vibes."* He then asked for big photos of the beach and surf. Look rounds 4–7
made both changes in the mockup: the beach-colour grounds, and "Down at the water" with the stock-003 band and the own
surf photos. Both were carried over unchanged in round 1. **Round 2** (below) replaced the drawn first screen with the
drone loop, on Alon's decision, and dropped stock-003.

## Round 3 (critique r2: critic 70.4/75 + the vid-001 licence hard fail, visual-critic 8/10, experience-critic 8/10) — 2026-11-04

designer 0.7.1, the last allowed round. Fixed against the "## Round 2" sections of `reports/2026-10-midigama-01/
cheeky-monkey.md`, `.visual.md` and `.experience.md`. The only hard fail, vid-001's licence, was waived by Alon in
session today ("i accept it as an exception for the preview"): conflicts 6. The copy is unchanged.

| Report item | Change |
|---|---|
| **Surfer under the type** (visual fix 1) | Across the surf shot the rider stays between 33% and 62% of the frame's height, while the sky above him and the water below him are clear. So the line and the button now sit in the lower band of the hero, still centred horizontally (`place-items:end center`; line 52 px at 1440, 26–34 px on phones). On a portrait phone the new p1080 tier is a 9:16 crop centred at 52% of the frame width (`heroVideoPoster.focalX`). The rider moves between 41% and 64% of the width, and a 390×844 screen shows 26% of it. **Checked every 0.25 s over the whole loop (25 frames) at 1440×900 and 390×844 by looking at the frames.** The rider is never under the line or the button. At 1440 the closest frame (5.5 s) leaves about 50 px between the board and the line. At 390 he stays whole in frame in every sample (the board's nose touches the left edge at 5.0–5.5 s). Boxes: 1440 line y 645–762, button 786–842 (of 900); 390 line 655–719, button 737–793 (of 844) |
| **Grey surf segment** (visual fix 2) | The surf shot is graded towards the poster's turquoise: `eq` contrast 1.17, saturation 1.4, gamma 0.95, plus `colorbalance` with red down and blue up in the mid-tones. Three grades were compared beside the poster frame, and the middle one was kept as the natural one. The water now reads green-turquoise instead of milky grey (`1440-22`) |
| **Loop seam and opening** (visual fix 3) | A 0.4 s crossfade at the loop point: the surf shot dissolves into the first 10 frames of the coast shot, and the file starts on that shot's 11th frame, so the seam has no hard cut and nothing jumps back. The near-still opening is now about 0.6 s after the dissolve (11.00–11.64 s slowed 5/3×, was 1.2 s at 2×). Loop 6.2 s, 155 frames at 25 fps (the 6 s floor holds) |
| **Phone sharpness** (visual fix 4; experience fix 3) | A portrait tier `p1080` (608×1080, cut from the 1920 master at its full height, `unsharp` 0.45), WebM 1.00 MB / MP4 1.87 MB, served by `(max-aspect-ratio: 3/4)` ahead of m1280. It is about 1.3 device px per source px on a DPR-3 phone (m1280 was about 2.5). The phone poster is the same crop at the same centre, from the full-resolution frame, WebP q80 with light sharpening (sigma 0.6), 116 KB. The unused `cm-drone.m720.mp4` is gone, as are the reel's unused d1920/m1280 encodes (5.5 MB) and the publisher's poster JPEGs, which this template never serves (`scripts/video-site.mjs`) |
| **Board reel** (experience fixes 1, 2, 5; visual fix 5) | (a) It is no longer part of first load. It is armed only when the hero loop fires `playing` or at the first scroll (or on load when there is no loop), then attaches as the board nears the screen. Throttled phone: the reel is requested at 5.07 s, after the hero plays at 5.07 s (round 2: at 440 ms). (b) A phone tier `p640` (360×640): WebM 0.42 MB / MP4 0.47 MB, served at ≤ 860 px; desktops keep m720. (c) The cut now starts on the bright rail shot (red, green, yellow, sand rails) and leaves out the dark shot (8.27–9.57 s) and the abstract orange close-up (4.23–5.17 s): 5.17–8.27, 9.57–13.0 and 3.0–4.23 s, 7.77 s, cut at the reel's own shot changes. The poster alt was rewritten from the new frame. (d) At ≥ 1024 px the board is 224 px wide (was 172) |
| **Header contrast** (critic dim 6) | A deeper top shade, `rgba(8,26,36,.66)` → `.5` at 72 px → 0 at 180 px, which is always on (also over the placeholder before the poster). The subtitle is full white, with firmer text shadows. **Sampled at 7 points in the loop** (0.1, 0.5, 1.2, 2.0, 3.0, 4.4, 5.8 s): the header text was hidden, and the brightest pixel behind each text box was measured (text shadows not counted). Worst values: 1440 wordmark 5.85:1, subtitle 5.24:1, nav 5.23:1; 390 wordmark 6.29:1, subtitle 5.82:1. Every one is ≥ 4.5:1 (round 2: 3.0–4.8) |
| **First half-second on slow phones** (experience fix 4) | Before the poster arrives, the hero ground is a gradient of the poster's own top, middle and bottom colours (`bands`, computed by `scripts/photos.mjs`, no image). The line's scrim is shown only once the poster has loaded (`.hero.lit`, set by the poster's `onload`; with JS off it is always on). The throttled phone at 0.5 s and 1.5 s shows a tonal ground with no dark blob. A 24 px LQIP was tried first, but `check-design` read it as a 24 px image drawn full-bleed (hard constraint 7), so it was replaced |
| **Review slideshow** (critic dim 2; experience fix 5) | The track takes the height of the quote on show (`align-items:flex-start`, height set on change, a 0.35 s ease). Measured at 1440: quote 1 = 226 px, 2 = 192, 3 = 364, with the track equal each time (it was always 364). At 390: 259 / 231 / 402 |
| **Empty band above "What guests say"** (visual fix 5) | It was 240 px of stacked padding (Baba's 120 px bottom + the guests' 120 px top). It is now 120 px at 1440 and 72 px at 390 |
| **Lazy room slides** (visual fix 5) | Every lazy photo now shows its own crop's mean colour while it loads (each room slide `li`, and each slot `<img>`). This replaces the pink-grey box |
| **Hazy wide photo in "Down at the water"** (visual fix 5) | img-155 is replaced by the business-owned **img-151** (1920×900, the business's own site, 2020): Cheeky Monkey surfers on the sand with coconuts, in front of their colourful soft boards, palms behind. It is crisp and bright. The slot's hard-coded 1600/702 ratio is gone, and the photo keeps its own shape |
| **Scroll CLS** (found in this round) | Moving the type to the bottom made the font swap shift the hero block 3 px sideways (Rethink Sans is 6 px narrower than its fallback in the button). Early scroll CLS was 0.026. Fixed: the block is full width, and the hero button has a min-width that holds either font. Early 0 / settled 0 |
| Not changed | The copy (the intro heading and the hero line are the copy station's). The package cards, the 17 font sizes, the closing board size |

### The hero cut, round 3 (vid-001; every frame of the loop looked at)

| Source (vid-001) | What | In the loop |
|---|---|---|
| 11.24–11.64 s | the reef, the rock wall along the coast road, the village under the palms | 0–≈0.6 s, slowed 5/3× |
| 15.64–16.32 s | the village and the sea beyond the palms | ≈0.6–1.8 s (31 frames), slowed 2× |
| 20.48–23.84 s | the drone low over a surfer on a green reef wave, **graded** | ≈1.8–6.2 s (110 frames), slowed 1.33× |
| 11.00–11.24 s | the reef again, dissolved in over the last 0.4 s of the surf shot | 5.8–6.2 s, then the file starts again at 11.24 s |

**Poster:** the master's own first frame, source 11.24 s. It is an original frame, not an interpolated one: 10 output
frames at 5/3× are 6 source frames. So the loop fades in over exactly the poster. Landscape 1280/1920 WebP 107/189 KB.
The portrait crop 608×1080 at focalX 52 is sharpened, 116 KB.
**Renditions:** d1920 WebM 1.64 MB / MP4 3.82 MB · m1280 WebM 0.91 / MP4 1.95 MB · p1080 WebM 1.00 / MP4 1.87 MB. None
has audio, every MP4 is faststart, and nothing is upscaled.

### Look loop (round 3)

- **R3-1** (1440 + 390, 25 frames each, every 0.25 s): the type moved into the lower band. At 1440 the rider is above
  the line in every frame. At 390, with focalX 49, the rider was clipped at the right edge at 3.0–4.0 s. At 55 the
  close pass was clipped at the left edge. At 52 he is whole in every sample. The graded surf shot holds the poster's
  colour, and the dissolve back to the coast reads as a breath, not a cut.
- **R3-2** (whole page, `tools/shoot.mjs` over http, desktop 17 + phone 22 captures): the 224 px board with the bright
  rails holds the intro on the laptop. img-151 brings colour to the water section. The guest card is as tall as its
  quote, and the band above it is half what it was. Nothing overlaps or overflows at either width.
- **R3-3** (throttled phone, cold): text and button at 0.5 s on the poster's colour gradient, with no blob. The poster
  is in at 3.17 s. The loop plays at 5.07 s (round 2: about 9–10 s). The reel comes after.

## Round 2 (critique r1 fail: critic 65.1/75 + hard fail, visual-critic 7/10, experience-critic 8/10) — 2026-11-04

designer 0.7.1. Fixed against `reports/2026-10-midigama-01/cheeky-monkey.md`, `.visual.md`, `.experience.md`, and
Alon's decision in session today on the first screen: *"i dont like the cartoon"*, then *"yes, use the promo drone
shots"*.

| Report item | Change |
|---|---|
| **Hard fail** (critic dim 3): `funnel.mjs` read the header phone icon as the primary action (`tel`) | The header's first action is now a blue **Book** button to the Booking.com engine URL (`bookingLinks[0]`), placed before the phone icon at every width. `funnel.mjs`: `primary_action` = **engine**, `hero_action` = **engine**, clicks_to_book 1 = `recommended` |
| **Hero** (Alon; visual fix 4; experience fix 3) | The drawn beach (sky/sea/foam/sand bands), the board window over it and the WebGL zoom-through are gone. The first screen is a full-bleed, silent 6.72 s loop of drone footage of the Midigama coast cut from vid-001 (below), with the header, the featureLine centred on two lines and the one "Check dates on Booking.com" button. It uses the schema's Astro snippet: `heroVideo` / `heroVideoPoster` from content, renditions written by the build, `<source>` webm then mp4, the phone tier (`m1280`) first by media query, attached after load + one frame, the poster only under reduced motion or Save-Data. The footage pauses off screen. The poster is a `<picture>` and the LCP: the whole 16:9 frame at 1280/1920 for landscape screens, and a 9:16 crop at the source's full 1080 px height for portrait phones |
| **Video zoom ends on a blocky frame** (visual fix 1; experience fix 4) | The zoom is gone with the cartoon hero. The board window stays, as the concept's one shape, standing on the sand beside the intro. It holds the shop reel (vid-009, now `videos[0]`) at most 172 CSS px wide from the 720-wide `m720` tier, so the footage is never blown up. The reel attaches 300 px before the board reaches the screen, plays only on screen, and shows a resin sheen while it loads and once on hover. The board tilts 3° at rest and stands up on hover |
| **Stock photo** (visual fix 2; experience fix 2) | "Down at the water" opens on the business's own **img-103** (the surfer in a Cheeky Monkey vest with the yellow fish), full-bleed: 16:9 from the top at 1280/2000 px for screens, 4:5 for phones. img-100 (tall) and img-155 (wide) sit beside the spot and season. **stock-003 is dropped**: the drone footage now shows the real coast, the business's own surf photographs carry the section, and the grey borrowed shore no longer earns a place. Its 2.2 MB, its CC BY-SA credit and its lazy loader are gone. The page shows no borrowed photograph |
| **Package cards** (visual fix 3; experience fix 5) | No red, yellow, green or blue blocks. Each card leads with its photograph, whole, at the card's width (5:4, 640 px), on a plain white card, with the page's single booking blue on the buttons. On hover the card lifts and the photo eases in by 4%; the pointer tilt is gone |
| **a11y** (critic dim 6) | `role="group"` removed from the room photo tracks and the review track (the 34 `listitem` nodes). The testimonial source links are `#095EA2` (6.3:1 on `#EAF3FE`; was 4.44:1). axe: **0 violations** at 390 and 1440 |
| **Fonts** (critic dim 2; experience fix 1) | `font-display: swap` on both families. Metric-matched local fallbacks are `Rethink Fallback` (Arial/Helvetica/Roboto, size-adjust 104.3%, ascent 95.1%, descent 29.7%) and `Marker Fallback` (Arial Bold, size-adjust 103.5%, ascent 107.2%, descent 30.7%, line-gap 2.9%), measured against Arial in Chromium. The bare `cursive` is gone. CLS 0, scroll CLS early 0 / settled 0 |
| **JS off: the header had no ground** (experience) | The header is white by default. Only with JS (`html.js`) is it clear and white-on-footage over the hero, until the page scrolls |
| **Finish** (visual fix 5) | The blue glow and resting shadow are gone from every `.btn`, and the cards are flat until hover. The Instagram follow tile is a square tile the size of the photos (it was a blue ellipse), and the grid columns are `minmax(0,1fr)`, so the long handle no longer squeezes the photos at 390. The hidden "Loading the shop's reel" status string is removed |
| Not changed | The intro heading "Catch waves, not worries" (critic dim 5, optional: the owner's own line, a copy-station decision). The 17 font sizes, the empty middle beside "The rooms" and the closing board size (visual fix 5, minor). Section spacing under the reviews is the standard section padding |

### The hero cut (vid-001, every frame looked at)

The film was split into 2 fps contact sheets. Each candidate edge was then checked frame by frame at 25 fps (scratch,
deleted). Clean drone seconds are rare, because the captions run over almost every aerial shot. Used:

| Source (vid-001) | What | In the loop |
|---|---|---|
| 11.00–11.60 s | the reef, the rock wall along the coast road and the village under the palms (first coast frame after the scooter shot; "GREAT LOCATION" fades in at 11.68 s) | 0–1.2 s, slowed 2× |
| 15.64–16.32 s | the village and the sea beyond the palms (the caption has faded out by 15.6 s; the surf shot starts at 16.4 s) | 1.2–2.56 s, slowed 2× |
| 20.48–23.84 s | the drone low over a surfer on a green reef wave ("MANY SURF SPOTS" fades out by 20.4 s; the next shot, the garden, starts at 24.0 s) | 2.56–6.72 s, slowed 1.33× |

Rejected: 0–4.5 s and 77.5–89.6 s (the logo animation, the phone and email card, the credits); 4.54–5.10 s (a 0.5 s
top-down of the garden); 42.1–42.9 s (palms from below, not a drone shot); 43.18–43.50 s (0.3 s of the building
before "ROOFTOP"); 59.0 s (a coast road whose place is not certain); and everything that is not drone footage.

Slow motion is motion-compensated interpolation to 25 fps (`minterpolate mci`), so it stays smooth, never duplicated
frames. The source is a 1080p YouTube encode, and its flat sky carries 8×8 compression blocks. A light `deband` runs
first, and the blocks were checked before and after on a contrast-boosted crop. **Poster:** the source's I-frame at
**11.00 s** (the loop's first frame), debanded, at 1280/1920 (104 / 188 KB WebP) plus the 608×1080 phone crop (79 KB).
Every rendition was checked at 100% on contrast-boosted crops of the sky and foliage, with no macroblocking: `d1920` WebM
1.58 MB / MP4 3.46 MB, `m1280` WebM 0.88 MB / MP4 1.83 MB, `m720` MP4 0.74 MB. Native 1920 wide, never upscaled. On a
390 px phone the 1280 tier is drawn about 1500 CSS px wide (cover), which is a little soft on the surf shot.

### Look loop (round 2)

- **R2-1** (1440 + 390, video playing): the loop reads at once as the place: reef, village and surf. One centred line and
  one button sit on it. At 390 the line broke as "Come as a / stranger, leave / as a friend." It was then split at its
  comma into two lines (`splitLine`), 26–36 px on phones. The header Book and phone sit clear of the wordmark at 390.
- **R2-2** (reduced motion, JS off): the debanded coast poster with the same line and button. With JS off the header
  is white. Against round 1 (a drawn beach with a sliver of indoor reel) and the current site (a PHP notice, no
  booking action), this first screen is clearly better: the real coast and one action.
- **R2-3** (whole page, `tools/shoot.mjs`, desktop 17 + phone 22 captures): the board with the real Rockwell reel beside
  the intro; img-103 full-bleed; calm photo-led cards. At 390 the Instagram grid was squeezed (70 / 194 px columns,
  from the long handle's min-content), so it is now `minmax(0,1fr)`, 111 px tiles. Nothing overlaps at either width.

## Build

```
npm install                  # astro 7.3.3 + sharp 0.35.4 into this folder (node_modules is git-ignored)
bash scripts/make-media.sh   # the seed (no Payload tenant before a sale) + every media file
npm run build                # photos step + astro build → dist/index.html
npm run build:cms            # after a sale with a CMS: fetch-tenant → publisher video step → photos → build
```

Needs `tools/link-assets.sh cheeky-monkey` (the dossier assets) and ffmpeg with libx264 + libsvtav1. `wrangler.jsonc` is
for station 6; nothing is deployed. Every media file is git-ignored and made by `scripts/make-media.sh`. Its
`# media:` headers cover `src/tenant/media`, `src/gaps/media`, `public/photos` and `public/video` (round 2: `public/atmo` is gone with stock-003; the drone cut and its poster are made from vid-001 by the same script).

| Path | What |
|---|---|
| `src/pages/index.astro` | the home page. The markup and class names are the mockup's, bound to content. 4g changes are commented |
| `src/styles/site.css`, `src/scripts/site.js` | the mockup's CSS and JS, inlined as in the mockup. 4g changes are commented: the button radius, and the reel read from content |
| `src/lib/site.mjs`, `slots.mjs`, `labels.json`, `icons.svg.txt` | content plumbing; which photo sits where and how it is cropped; template wording; the icon sprite |
| `src/tenant/content.json` | the seed, in Payload's REST shape (schema v0.9/v0.10). `npm run fetch` replaces it after a sale |
| `src/gaps/gaps.json` | SCHEMA GAP content (below). It survives a fetch |
| `scripts/*` | `make-media.sh`, `seed-from-dossier.mjs`, `photos.mjs`, `fetch-tenant.mjs` (plumbing from `sites/global-surf-adventures-v2/final`, plus `rooms[].photo`). Round 3: `video-site.mjs`, this template's own video step after the publisher's `video.mjs`. It makes the hero's portrait `p1080` tier and the reel's `p640` tier from the uploads, and removes the tiers and poster JPEGs the template never serves. It runs in `make-media.sh`, `npm run media` and `npm run build:cms` |
| `public/fonts/` | Rethink Sans (variable, latin) and Permanent Marker (latin) woff2 files from Google Fonts, self-hosted, with their OFL and Apache licences |

## Port comparison (round 1, against the picked mockup; round 2 changed the first screen and the water section on purpose, above)

The final sheets are `shots/desktop-sheet.png` and `shots/mobile-sheet.png`. The mockup was re-shot into a scratch
folder rather than its own `shots/`.
- **Page height:** desktop 15,562 vs 15,561 px; phone 17,203 vs 17,179 px.
- **Captures:** 20 + 23 on each.
- **Structure:** the text, links, alt texts and aria labels were compared line by line: 169 / 70 / 56 / 68 on each side.
- **Markup:** a normalised HTML diff of the body differs only in whitespace and in the two items below.
- **Pixels:** a per-capture diff shows the same composition at every stop. The pixel differences are:
  - the moving reel and the beach drift, caught at other moments;
  - WebP encoder noise (sharp instead of cwebp, at the same ratio, width and quality);
  - the button corners;
  - from the transfers line on, the phone is 24 px lower.

Visible differences, both intended:

| Item | Mockup | Final | Why |
|---|---|---|---|
| Booking buttons (every `.btn`: hero, rooms, cards, closing, footer, phone bar, drawer) | left corners square, right end round | 18 px soft tail corners, a round nose half the height | **A bug, fixed.** The CSS asked for `18px 999px 999px 18px`. The browser scales every radius down by one factor when adjacent radii overflow the box (999 + 999 > 52 px), so the 18 px corners came out about 0.5 px. The concept draws the button as a board: "the booking button's rounded nose-shape". The nose is now `calc(var(--bh) / 2)`, with `--bh` set per button size (52 / 50 / 46 px) |
| Getting here, the transfers line | "… \| Drop and pick-up USD 130 \| …" | "… \| Airport drop and pick-up USD 130 \| …" | the line is built from `priceList[]`, and the copy's label is "Airport drop and pick-up". The mockup had shortened it by hand. Because the label is longer, the phone line wraps once more, which is the +24 px |

Everything else matches the mockup and its notes:
- the first screen (the board window over the drawn beach, the split featureLine, the blue button);
- the WebGL resin gloss, live (`gl-live`);
- the board-mask zoom-through over 180 vh / 110 vh, with the section height fixed before first paint;
- the colour grounds and shoreline edges;
- "Down at the water": stock-003 whole with its credit, and the img-100 / 103 / 155 mosaic;
- the four board cards, the inclusions and the lesson card;
- the five room slideshows, the shop masonry, the roof, Baba and the guests;
- Getting here, the closing, Instagram, the footer, the phone bar and the drawer.

## Performance (`tools/audit-mockup.mjs cheeky-monkey ../final`, throttled phone 390×844, no scroll) — `audit.json`, round 3

| Item | Target | Measured (round 3) |
|---|---|---|
| First-load transfer, video excluded | ≤ 1.5 MB | **691 KB** (708,018 B in 12 requests): HTML 97 KB (CSS and JS inline), fonts 65 KB, images 546 KB (the hero poster, plus the images the browser's lazy margin pulls in just below it) |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | portrait phone `p1080` (608×1080) WebM **1.00 MB**, MP4 fallback **1.87 MB** · landscape phone/tablet `m1280` WebM 0.91 / MP4 1.95 MB · desktop `d1920` (native) WebM **1.64 MB**, MP4 **3.82 MB** · 6.2 s · attached after load + one frame, paused off screen |
| Shop reel (intro board, `videos[0]`) | not first load | phone `p640` WebM **0.42 MB** / MP4 0.47 MB, desktop `m720` MP4 1.71 MB. It is armed only after the hero plays or at the first scroll. None under reduced motion / Save-Data / JS off |
| JS, compressed | ≤ 300 KB | **3.2 KB gzip** (9.0 KB raw), inline, no library |
| Largest above-the-fold image | ≤ 300 KB | **116 KB** (the phone poster, 608×1080 WebP q80, sharpened); desktop poster 189 KB (1920 WebP) |
| Fonts | ≤ 2 families, ≤ 150 KB | Rethink Sans + Permanent Marker, 65 KB, self-hosted, preloaded, `swap` with metric-matched fallbacks |
| LCP | ≤ 2.5 s | **480 ms** (a second run measured 832 ms) |
| CLS (load) | < 0.1 | **0** |
| Scroll CLS early / settled | < 0.01 | **0 / 0** |
| Third-party requests on load | 0 | **0**, and 0 over a full scroll at 1440 and 390 |
| Loop start, throttled phone, cold (1.6 Mbps / 150 ms / 4× CPU, 390×844 DPR 3) | — | poster requested 191 ms, decoded 3.17 s (116 KB); `load` 3.30 s; `p1080.webm` requested 3.33 s; **hero `playing` 5.07 s** (round 2: ~9–10 s); board `p640.webm` requested 5.07 s, after the hero (round 2: 440 ms); hero file complete 10.26 s, before the first loop ends |

`dist/` is 16 MB (round 2: 19 MB).

There are no embeds and no borrowed photographs.

## Checks (4g, round 3)

| Check | Result |
|---|---|
| `npm run build` | **pass**: 1 page, `dist/index.html` 96,992 B |
| `tools/check-design.mjs sites/cheeky-monkey/final/dist/index.html` | **ok**, 0 problems, 0 warnings (after the LQIP was replaced by the colour gradient; it had failed "inline image drawn 1440px wide from a 24px source") |
| `tools/check-places.mjs cheeky-monkey` | **ok** (1 borrowed use in `mockups/*`, 0 failing). The final shows no borrowed photograph |
| axe-core 4.10.2 (WCAG 2.0/2.1 A + AA, after a full scroll, third-party blocked) | **0 violations** at 390 and 1440, 27 rule sets pass. Incomplete: `color-contrast` 172 / 176 (text over photos and footage). The header over the footage was sampled by hand instead (above: ≥ 5.23:1 at every sample) |
| `tools/funnel.mjs http://127.0.0.1:8950/ --depth 3` | **clicks_to_book 1, primary engine ("Book"), hero engine (0 taps to flow), CTA above the fold**, 0 broken. Engine/engine/1 = `audit.json.recommended`. Output in the scratchpad, not the repo |
| JS off (390, 1440) | **pass**: the header is white, the poster loads (the portrait crop at 390, 1920 at 1440), the line's scrim is on, and the first booking link is the engine. `#book` is visible as an in-page section. **0 video requests** |
| Reduced motion (390, 1440) | **pass**: `js still`, the posters only, **0 video requests** over a full scroll |
| Motion tier (served sources) | 390 phone: hero `cm-drone.p1080.webm`, board `cm-board.p640.webm`. 1440: hero `cm-drone.d1920.webm`, board `cm-board.m720.mp4`. The board's tilted bounding box is 145 px at 390 (a 124 px board) and 261 px at 1440 (a 224 px board) |
| Keyboard (1440 motion, 390 reduced motion) | Every stop is outlined. 1440 order: skip link, wordmark, Surf weeks, Rooms, Shop, Plan a stay, Book, Call, the hero button, See the surf weeks. 390: skip link, wordmark, Book, Call, the hero button, … Drawer: Enter opens it with focus on Close, Tab stays inside after 12 presses, Esc closes it, and focus returns to "Plan a stay". `audit-mockup`: opens / closes / focus returned = true |
| Booking end to end (1440 + 390) | 23 Booking.com links on the page, **all** exactly `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html` (`booking.engine_url`). `audit-mockup` tapped it: 1 tap. Drawer → A surf week → Yoga and Surf → Shared double = **USD 280**, Email subject "Cheeky Monkey: Yoga and Surf Lesson Package, shared double room". Drawer → A room → a room → hand-off to the engine URL. `tel:+94719248686` |
| Review slideshow | the track's height equals the quote on show (1440: 226 / 192 / 364; 390: 259 / 231 / 402) |
| Offline except the local server | 0 third-party hosts on load and over a full scroll at both widths |
| Tap targets < 44 px | 0 of 84 · images without alt: 0 (6 decorative `alt=""`) |
| Facts | `audit-mockup`: 48 numbers, 1 not in the passed copy: "2018", in the footer credit (`dossier.videos[]` vid-001), as in round 2 |
| Sheets | `shots/desktop-sheet.png` (17) and `shots/mobile-sheet.png` (22), shot over http from :8950, left for the critics |

## editable (owner, after a CMS sale) — where each thing on the page is edited

| Admin tab | Field | Where it shows |
|---|---|---|
| Basics | `businessName` | `<title>`, the section label, the wordmark (split by `gaps.wordmark` while the split rebuilds the name exactly; otherwise the full name) |
| Basics | `tagline` | the meta description |
| Basics | `featureLine` | the first screen's line over the drone loop, split at its comma onto two lines |
| Basics | `closing` | the closing line |
| Text | `copyBlocks` | by slot and order: `intro`[0] the intro · `about`[0] Baba · `about`[1] the shop · `about`[2] the roof · `offer`[0] lessons · `offer`[1] "A week of surf" (¶1–4 are the card lines, the last ¶ is the lede) · `info`[0] Getting here · `info`[1] Good to know |
| Prices | `priceList` | the four surf-week cards and the drawer (grouped by `gaps.weeks[].group`; range, room line, "per person, 7 nights" and the year all come from the rows); the flat rows are the transfers line |
| Lessons | `lessons` | the lesson card and the drawer (price, unit, duration, levels, the other lesson types, group size) |
| Photos & video | `photos[0–24]` | "Down at the water" ×3 (photos[1] is the full-bleed band) · the cards ×4 · the shop masonry ×7 · the roof band and side · Baba and the print · Getting here · the closing board · Instagram ×5 (`src/lib/slots.mjs`, cropped by the build) |
| Photos & video | `heroVideo` + `heroVideoPoster` | the full-bleed first screen: the drone loop and its poster (renditions and poster crops from the build). Round 3: `heroVideoPoster.focalX` (seeded 52) centres both the phone poster crop and the portrait video tier, so an owner who uploads a new clip sets where an upright phone looks. **Use to be confirmed with the owner at pitch:** the seeded cut is from Lorenzo Marzocca's 2018 promo film (vid-001, licence unknown). If the owner holds the rights, or the raw footage, it stays or is replaced by an upload; if not, the owner uploads their own clip or a photograph |
| Photos & video | `videos[0]` (video, poster, description) | the shop reel in the intro's board window (the description is its alt) |
| Rooms & stay | `rooms[]` | label, beds, sleeps and note make each room line; the m² goes on the drawer tile; `photo` is slide 1 and the drawer tile |
| Rooms & stay | `stayInfo` | check-in/out and the house rules ("Staying here") |
| Amenities | `amenities` | the roof's amenities line |
| Rentals & shop | `rentals`, `brands` | the shop list and the brands line |
| Surf | `spot`, `season` | "Down at the water" |
| Reviews | `ratings`, `testimonials` | the two rating cards and the 11-quote slideshow |
| Contact & booking | `contact.phone`, `contact.email`, `contact.address`, `contact.mapUrl`, `bookingLinks[0]` (Booking.com), `bookingLinks[1]` (Instagram) | every call, email, address, map, booking and Instagram button |

Not owner-editable today (the gaps below): the package names, the inclusions list, the lesson price year, the room
slides 2–6, the hero footage's credit line, the socials, the place line and the drawer's board text.

## schema gaps (bound only to existing fields; the rest is in `src/gaps/gaps.json`)

1. **Hero / what-and-where line** (creative director, concepts.md §6): there is no short subtitle field. The header shows
   `gaps.place` "Midigama, Sri Lanka" (the town in `contact.address`) after the wordmark. A proposal could add an optional
   `heroLine` (≤ 50 chars).
2. **Room galleries** (creative director): `rooms[].photo` holds one photo, which is bound as slide 1. Slides 2–6 per
   room are in `gaps.roomGalleries` (18 photos, `src/gaps/media/`). It needs `rooms[].photos[]` (≤ 8).
3. **Announcement line** (creative director): there is no field. The mockup shows no announcement either, so nothing is
   bound and nothing is invented. The open-status question (Facebook says low season / Arugam Bay) needs that field before
   any line can appear.
4. **Packages:** `priceList[]` is flat. A package (three room prices under one name, a short name and a one-line
   description) has no module. `gaps.weeks` holds each group prefix and the two display names.
5. **Package inclusions:** "Every week comes with" is "A week of surf" ¶5 split into an icon list (`gaps.inclusions`).
   There is no field.
6. **Lesson price date** (copyeditor N3): `lessons[]` has no note, so "Published 2021" on the lesson card comes from
   `gaps.lessonPriceYear`. It stays next to the "Lessons for your level" block that says "published in 2021", as N3
   asks.
7. **Credit on the hero footage** (round 2): `media` has no credit or licence field. The footer line "Drone footage:
   Lorenzo Marzocca (2018 promo film for Cheeky Monkey)", linked to the film's YouTube page, comes from
   `gaps.heroCredit`, built from `dossier.videos[]` vid-001. It is shown only while a `heroVideo` is set. (Round 1's
   `gaps.atmosphere`, the stock-003 credit, is gone with the photograph.)
8. **Socials:** `socialLinks[]` exists only among the v0.11 brand modules. A surf_camp has no field for its website (the
   source link on the `site` testimonial), Instagram (the tiles, the follow tile, the footer) and Facebook
   (`gaps.socials`).
9. **"In every room" line** in "Staying here": `amenities[0–2]` joined into one sentence (`gaps.stayRoomLine`).
10. **The drawer's board step** ("400 boards to rent" …): the shop ¶1 plus `rentals[]` as the drawer's words
    (`gaps.drawer`).
11. **SEO title** (not in v0.1): `gaps.seo.title`, which is the mockup's title.

## Facts (every checkable claim → field → dossier; the copy's audit is `copy/review.md`, 0 unsourced / 0 contradicted)

| Claim on the page | Field | Dossier |
|---|---|---|
| Surf weeks: USD 400/300/300 · 350/295/280 · 300/280/280 · 290/250/250, per person, 7 nights, published 2021 | `priceList[0–11]` | `offers[0–11]`, `packages[0–3]` |
| Card lines, "halves that", the tuk-tuk lesson | `copyBlocks offer[1]` ¶1–4 | `packages[0–3].value.includes` |
| Inclusions (7 nights … lake tour USD 5 extra; the board and ride with the three lesson packages) | gap (¶5) | `packages[0–3].value.includes`, `offers[25]` |
| Surf lesson USD 20 per person, 90 min, beginner / intermediate / advanced; private, group max 6, SUP, surf spot tour | `lessons[]` | `lessons[0–5]`, `levels[0–2]` |
| Five rooms: beds, sleeps, m², views | `rooms[]` | `room_types[]` |
| Check-in 14:00–19:00, check-out 06:00–11:00; house rules | `stayInfo` | `stay_info` |
| A/C, private bathroom and entrance in every room; the amenities line | `amenities[]`, gap line | `room_types_note`, `facilities[]` |
| 400 boards; shaper; shelves; brands; scooters; own boards shaped in Bali | `copyBlocks about[1]`, `rentals[]`, `brands[]` | `rentals[0–3]`, `business.description_shop`, `brands[]` |
| Opened late 2009 with three rooms; ten rooms by 2021; Baba | `copyBlocks about[0]` | `business.since`, `room_count`, `business.owner`, `business.run_by` |
| 180° sea view; rooftop yoga at sunrise and sunset | `copyBlocks about[2]` | `facilities[3]`, `[5]`, `reviews.quotes[8]` |
| Google 4.5/5, 467 reviews, 26 Oct 2026 · Booking.com 8.3/10, 45 reviews, 26 Oct 2026 | `ratings[]` | `reviews.google`, `reviews.booking` |
| 11 quotes, authors, sources, months | `testimonials[]` | `reviews.quotes[…]` (machine-checked by the copyeditor) |
| 350 m, 800 m, 2 km, 3.3 km, 10 km; Galle–Matara main road | `copyBlocks info[0]` | `location` (Booking.com distances) |
| Airport drop USD 65, pick-up USD 65, both USD 130, published 2021 | `priceList[12–14]` | `offers[15–17]` |
| Address; +94 71 924 8686; cheekymonkeymidi@gmail.com; map; Booking.com; Instagram; Facebook; site | `contact`, `bookingLinks`, gap socials | `location.address`, `contact.*`, `booking.engine_url`, `contact.socials` |
| Spot and season | `spot`, `season` | `location.spot`, `season` |
| Drone footage credit (Lorenzo Marzocca, 2018 promo film) | gap heroCredit | `videos[]` vid-001 `found_on`, `source_url` |
| No generator; taxi, safari, cooking class | `copyBlocks info[1]` | as in `copy/review.md` |

## images

These are the mockup's images (`mockups/unique/notes.md`, "images"), made by the build from the same dossier ids at the
same ratios, crop centres, widths and qualities.
- **Business-owned:** img-100, 103, 151 (round 3; was 155), 149, 135, 137, 096, 109, 146, 112 (cropped 1035:1180 from the top, without the
  avatar badge), 108, 131, 116, 087, 134, 078, 141, 121, 082, 105, 085, 099, 089 and 013.
- **Room slides:** img-030, 014, 021, 016, 033, 026 · 035, 034, 036, 037 · 058, 041, 045, 050, 053 · 002, 004, 009, 013 ·
  064, 063, 065, 070.
- **Hero, from vid-001 (round 2, recut in round 3):** Lorenzo Marzocca's 2018 promo film for the guesthouse. A 6.2 s
  loop of its caption-free drone seconds of the Midigama coast (11.00–11.64, 15.64–16.32, 20.48–23.84 s, the surf shot
  graded, a 0.4 s crossfade at the seam), and its first frame (11.24 s) as the poster. Licence **unknown** (a third-party YouTube upload, not the business's channel), used on Alon's decision in
  session 2026-11-04 and accepted by him as an exception for the preview (conflicts 6). It is credited in the footer,
  to be confirmed with the owner at pitch. Alt: "Drone
  view of the Midigama coast: turquoise reef water, the rock wall along the coast road, houses and palms behind",
  written from the frame.
- **From vid-009 (business-owned reel, 7 Oct 2026):** `videos[0]` in the intro's board window (round 3: 5.17–8.27,
  9.57–13.0 and 3.0–4.23 s, starting on the bright rail shot, with its first frame as the poster) and the closing board
  (12.8 s).
- **Round 3:** img-155 is replaced in "Down at the water" by **img-151** (business-owned, the business's own site,
  uploaded 2020-05-28). The alt was written from the photograph: "Cheeky Monkey surfers on the sand with coconuts,
  lined up in front of their colourful soft boards, palms behind".
- **Atmosphere:** none since round 2. stock-003 is dropped.
- **Alt text:** the mockup's, word for word (`scripts/seed-from-dossier.mjs` ALT).

## gaps

The same as in the mockup:
- No WhatsApp: `contact.whatsapp` is `null` in `content.json` (copyeditor N6; the copy has `""`).
- Rooms go to Booking.com. Weeks, lessons and boards go to `tel:`, prefilled `mailto:` and Instagram.
- Every price is dated 2021.
- The Booking.com date parameters are not built (they cannot be tap-tested in a test run).
- No break name, so no forecast.
- No shop hours.
- No instructor names.
- Open status is unclear, so the page says nothing about it.
- The Instagram tiles link to the profile, because no post URLs were harvested.
- No owner water footage. The hero uses the 2018 promo film's drone shots (third party, licence unknown).

Copyeditor N1 (the rooftop quote fragment, with Mihrican's full quote in the slideshow) is unchanged from the mockup.

## conflicts

1. **The concept's `/plan/` URL.** The drawer is `#book`, as in the mockup. With JS off it is the same content as an
   in-page section with every link, which works on any host and in a subfolder, and it is the convention
   `audit-mockup` measures. A separate `plan/` page would duplicate it, so none was built. Mockup conflict 10 said
   "4g gives it a real page". That promise is not kept: the in-page section already gives JS-off visitors the same
   path.
2. **Fonts: resolved in round 2.** Round 1 kept `font-display: optional`, because swap had moved the layout
   (early-scroll CLS 0.13). Round 2 uses `swap` (playbook §4) with metric-matched local fallbacks. Measured: CLS 0,
   scroll CLS 0 / 0.
3. **No library to vendor.** Round 2 has no WebGL at all: 2.9 KB gzip of inline JS.
4. **Phone video tier.** The hero follows the schema's snippet: phones get `m1280` (0.88 MB WebM / 1.83 MB MP4),
   desktops `d1920`. The shop reel is shown small, so it uses `m720` at every width (the schema's tier for small clips).
5. **Hard constraint 5:** in round 1 the run had one built business. Lotus Surf House (built since) opens on a calm
   photograph layout. This page opens on full-bleed drone footage of the reef coast, with Permanent Marker titles, sand
   and aqua grounds, and the board window, so the two do not look interchangeable.
6. **The hero footage's licence (round 2, Alon's decision; waived for the preview in round 3).** vid-001 is Lorenzo Marzocca's 2018 promo film, made for
   the guesthouse ("A little present for my friend Baba") but published on his own YouTube channel. Its licence is
   **unknown**, and the base rule is that an image of unknown ownership is not used as if it were the business's. Alon
   decided in session today to use its drone shots ("yes, use the promo drone shots"), so the cut is used with a
   discreet footer credit. **Use to be confirmed with the owner at pitch** (a pitch point: does Baba hold the rights or
   the raw footage?). If not, `heroVideo` is replaced by an owner upload, or emptied and
   `heroVideoPoster` set to an owner photograph (the template then shows that photograph full-bleed, without video). It is not offered as the business's image in JSON-LD or the
   link preview.
   **Waiver, round 3 (Alon in session, 2026-11-04: "i accept it as an exception for the preview").** The critic's
   round-2 hard fail on this line, "an image is used against the run's image policy", is accepted by the human as an
   exception. The exception holds **for the preview only**, until the owner confirms the rights at pitch. If the
   owner declines, or cannot confirm, the fallback is business-owned media: an owner clip as `heroVideo`, or
   `heroVideo` emptied with a business-owned photograph ≥ 1920 px as `heroVideoPoster`. The template already renders
   both. The drone hero and its footer credit stay as they are.
7. **The concept's set-piece is gone.** Concept 3 ("Pick your board") put the board window and its WebGL zoom-through
   on the first screen. The human's decision replaces that first screen with the drone loop. The board survives as a
   smaller moment in the intro, with the shop reel. The hero's main item is now "a great cut of the footage"
   (base.md 0.7.0), not WebGL. The critics' "keep the zoom" notes are overridden by Alon's decision.
8. **Source quality.** The drone footage is a 2018 1080p YouTube encode: a little soft at 100%, with compression
   blocks in the flat sky, which are debanded in the master. Round 3: upright phones now get the 608×1080 portrait
   tier at the source's full height, about 1.3 device px per source px at DPR 3 (m1280 drew about 2.5), so it is as
   sharp as the source allows. It is native on every tier and never upscaled. Raw footage from the owner or the
   filmmaker would lift it further (pitch point).
9. **The hero type is no longer vertically centred (round 3).** The calibration notes (references.md) ask for text
   over video "centred and vertically centred". The visual critic's round-2 fix 1 asks that the surfer never sits
   under the line or the button. Across the surf shot he rides through the middle of the frame (33–62% of its
   height), so both cannot hold. The line and the button stay centred horizontally and sit in the lower band
   (71–94% of the hero at 1440, 78–94% at 390), over clear water. The alternative was to crop the surf shot so the
   rider moves out of the middle. On desktop the frame has no slack for that, so it would have meant upscaling the
   segment (hard constraint 7's spirit).
10. **The phone crop's centre is fitted to this footage (round 3).** The portrait tier and the phone poster are centred
    on `heroVideoPoster.focalX`, which is seeded at 52 for this cut. It is not hard-coded in the template (schema
    v0.10: focal points are owner-set). A 390×844 screen shows 26% of the frame's width, and the rider travels
    across 23% of it, so 52 is the one centre that keeps him whole. Any other cut needs its own focal point.

## Not done

- SEO, JSON-LD, robots, sitemap and llms.txt (stations 4h / 4i).
- Deploy (station 6).
- `shots/` holds round 3's sheets (`tools/shoot.mjs` over http, desktop 17 + phone 22 captures), left for the critics.

## 2026-11-04 — the Rosa forecast (Rams), added after critique

**Human decision (Alon, operator, 2026-11-04):** the site carries Rosa's forecast for spot `rams` ("Rams"). The business
never names its break, which is why concepts.md §3 and "Not shown" above said no forecast. Rams is the Rosa spot nearest the
guesthouse pin: Rosa's spot (5.962565, 80.393597) against the dossier's `location.lat_lng` (5.9617986, 80.3967609) is
about 360 m. This overrides schema v0.3's "the nearest other spot is never used" on Alon's say. So the block never calls
Rams "our break" or the business's own break. It is only "Forecast for Rams by Rosa". No walking time is stated
because none is sourced. No wave fact is content: the numbers come only from Rosa's live JSON.

| What | Where |
|---|---|
| `forecast: {enabled: true, rosaSpotId: "rams", spotName: "Rams"}` | `src/tenant/content.json`, and `scripts/seed-from-dossier.mjs` carries the same value with the decision in a comment, so a reseed keeps it |
| The block | `src/pages/index.astro`, at the end of "Down at the water" (`#water`), under its photo grid and above "The surf weeks". It renders nothing unless `enabled` and a valid `rosaSpotId` |
| Logic | `src/scripts/site.js`, ported from `sites/layday-surf-ahangama/final` (the same as KA / Lavish). One JSON request when the block is within 400 px of the screen. The headline is drawn only from data under 24 h old. After that the widget gets its `src`, but only after a HEAD 200 and the frame's `load`, within 10 s. Otherwise the plain link stays. New: if it fails while the block is still below the screen (`.solo`), the empty headline box is dropped (no visible shift). If the block is in view, the box stays reserved |
| Look | `src/styles/site.css`. The headline is a white 22 px-radius card like the lesson card, on the aqua ground. It has the blue wave icon and the credit link, the height range in Rethink Sans 600 (92 px desktop, 64 px phone), the time in ink 600 with swell and wind in ink-2, and Rosa's update time in the site's pink `.dated` pill. The two boxes are 420 × 500 side by side, centred, at desktop widths. On a phone they stack: card 340 px high, widget box 500 px. Rosa's widget is `theme=light`, embedded exactly as Rosa ships it |
| llms.txt | "Pages" lists `Forecast for Rams by Rosa` → rosa.surf/spot/rams, as the Ahangama sites do |

Checks (local preview, `astro preview` on :8950): `node tools/site-check.mjs cheeky-monkey --url http://localhost:8950/`
gave **PASS** on all 10 checks. forecast-block at 390 / 1440: section height 2614→2614 / 2289→2289, shift 0, headline drawn,
iframe set, JSON 200. Performance: 0 third-party requests on load, CLS 0, 451,591 B first load in 10 requests. A separate
Playwright check found no rosa.surf or rosa-data request on first load, no console errors and no horizontal overflow. JS off:
only the link, in the 420 × 500 box. JSON blocked and stale data (30 h): link shown, no numbers, no widget request.
Cost: about 3.5 KB gzip of inline HTML (CSS + JS + markup), no new requests. The embed count is 1 of 2 (the page has no map
iframe).
