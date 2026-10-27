# Cheeky Monkey Surf Camp: mockup, concept 1 · calm · "The signboard"

designer 0.7.0 · station 4e · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-10-26

Page: `dist/index.html`, one self-contained file (CSS and JS inline). It is written by `src/build.py`, which reads every heading, body, price, room, review, rating and contact from `sites/cheeky-monkey/copy/en.json`, so no copy is retyped. The only strings written in the template are interface labels: tab and button names, "Every week includes", "More lessons", "Guests' words", "On Instagram", "Address", "The waves", "When to come", "Airport transfers", and the alt text. Media and fonts: `src/make-media.sh` (`# media:` header for `dist/img/**`, `dist/video/**`, `dist/fonts/**`; needs ffmpeg and cwebp). Fonts are self-hosted Latin subsets: Albert Sans (variable, 400/600) and Yellowtail. Rebuild: `src/make-media.sh && python3 src/build.py`.

Rounds were shot with `tools/shoot.mjs` into `shots/` (replaced each round; the last set stays for the critics). Round 1 was shot over `file://`, where Chromium blocks the self-hosted fonts. From round 2 on the shoots ran over `http://127.0.0.1` with a static server on `dist/`. The old site (`assets/old-site-desktop.png`, `old-site-mobile.png`) was open beside every round.

## look-log

### Round 1: first screen
- **What was wrong with the design:** img-147 framed from y=420 cut the RESTAURANT sign off at the top. "Midigama, Sri Lanka" sat right on the lettering of the round CHEEKY MONKEY roadside sign, so two texts fought. On the phone the title sat in the sky but crossed a board nose. The wordmark was light for the header.
- **Change:** the wide crop now starts at y=340, so the whole RESTAURANT / MUSIC / BAR stack shows. The title block is lifted 14vh above centre (desktop) to clear the roadside sign. Wordmark 21 → 24 px.
- **Against the old site:** already better at a glance. The old first screen is PHP warnings, a stock-looking surfer under a two-line title and a black "not bookable" banner. On the phone it runs 470 px wide with no booking link. Ours is Midigama's own main road through the shop door, with one red button to live dates.

### Round 2: first screen
- **What was wrong with the design:** desktop was right: one script line in the sky band, the button under it, the roadside sign whole below, and the tuk-tuk on the road. On the phone, though, the lifted block now collided with the MUSIC/BAR signs ("BA" + "not worries" overprinted).
- **Change:** a separate phone position (block nearer centre, image `object-position: 62% 50%`, so the signs move left and the title sits in open sky). Stronger top gradient for the white nav over the pale sky.
- **Against the old site:** clearly better on both widths.

### Round 3: first screen (with a measured contrast pass)
- **What was wrong:** the composition was right on both widths, but I measured the white title against the real pixels behind it (text hidden, median and 90th-percentile luminance). The result was 2.19:1 desktop and 1.70:1 phone. The pale filtered sky is too bright for white, even with the text shadow (not counted). Concept 1 asked for that check.
- **Change:** a light grade on the photograph (brightness .9, contrast 1.06, saturation 1.06). A soft elliptical scrim centred on the title (`rgba(16,40,52,.5)` → 0; on the phone `.6`, wider and flatter). Title 64 → 72 px desktop, 40 → 46 px phone. Measured after: title **3.12:1** on both widths (large text, 3:1 floor). The "Midigama, Sri Lanka" line is 11.5:1 / 13.3:1. Wordmark 4.2:1 / 3.5:1 (24/19 px semibold).
- **Against the old site:** clearly better at a glance. The street, the signs and the board noses are still the picture, and the scrim reads as shade in the sky, not as a box.
- Inspector note: its "no text-shadow / no gradient" rules yield to playbook §1a's legibility scrim here.

### Round 4: whole page, first pass
- **The sheet showed:** every section of the concept is in order: the road, the counter (intro, "A week of surf" tabs, "Every week includes", "Lessons for your level"), five stacked room slideshows, the wall of boards with img-122 and the reel, the roof band, Baba, guests, getting here, the closing band, Instagram, the footer, and the phone bar.
- **Wrong:**
  1. The " | " separators rendered as heavy black bars wherever they sat outside a `.pipe` block (price units, rating meta, lesson cards).
  2. The inclusions in four columns left two orphans, and the "with the three lesson packages" chips wrapped awkwardly.
  3. The roof band's 21:9 crop (fy .30) cut the sea away, leaving only bodies lying on tiles.
  4. The guests' slideshow left a blank screen between a short quote and its dots, because the slides are as tall as the longest quote.
- **Change:**
  1. One global `.sep`, in a light place-colour.
  2. Inclusions in 5 × 2 with the icon above the words (one column on the phone).
  3. The roof crop is now from the top (sky, sun, sea, the instructor and the first mats). Measured: `featureLine` at **5.76:1** desktop / **5.57:1** phone over the lower gradient.
  4. The guests' dots now sit above the quote, so the reserve falls at the section's end, and the section's bottom padding is smaller.

### Round 5: whole page, second pass, plus checks
- **Wrong:**
  1. Each price card's unit line ("Per person, 7 nights | published 2021") wrapped at 1440.
  2. The inspector found a real defect: at 768 px the page scrolled sideways by 78 px. The three price columns with no-wrap units were too wide.
  3. On the phone, the panel text sat 2 px from the edge for the same reason.
  4. The room-dot pills used backdrop blur (six blurred surfaces).
- **Change:**
  1. Tighter card padding and a no-wrap unit at desktop.
  2. Below 980 px the prices become rows (name and unit left, price right).
  3. The unit wraps there. Measured with no sideways scroll at 390, 768, 1024 and 1440.
  4. The dot pills are solid translucent, so the header bar is the only blurred surface.
- **Last sheets looked at for overflow, overlap and unreadable text:** none found. Two things move with scroll position by design. The phone bar covers whatever sits behind it at the very bottom of the screen; content scrolls out from under it, and the footer has 120 px of bottom padding. The phone tab row is a swipe row with a peek ("Yoga an…"), as the concept asks.
- **Against the old site, whole page:** clearly better. The old page is a sideways-scrolling phone layout, server warnings, three equal stock-looking cards, no prices, no rooms and no booking link. This page carries:
  - the business's own street, sign, racks, roof and rooms, big;
  - four surf weeks with all twelve prices, dated;
  - five rooms sold with 4–6 photographs each;
  - both ratings with counts and dates, and eleven verbatim reviews;
  - one red Booking.com action on every screen (header bar on desktop, phone bar after the hero).

### Skill passes (polish only, never direction)
- **Inspector** (`design-taste-frontend/scripts/inspect.mjs`), final run before the round-5 fixes. Fixed: overflow at 768, text at the edge at 390, the glass surfaces. Kept, with reasons:
  - The hero and roof text shadows and scrim (legibility, playbook §1a).
  - The soft shadows on buttons and the tab pill (custom.md: "gentle shadows where they help").
  - 👍 in Jimmy's review, which is verbatim.
  - The "eyebrow" price labels ("Private room" above the price). They are the room choice, not kicker labels.
  - The closing line wraps to 3 lines on phone and tablet. It is the `closing` copy and cannot be cut; it is set in the script by the concept.
  - "Still page": calm has no canvas or scroll motion by concept. Motion is on interaction.
  - The 20 font sizes: a known spread, left for 4g's type pass.
  - `no-poster`: the clip's poster is an `<img>` under the `<video>`, so it paints before any video byte and works with JS off.
  - "Empty middle" on the rooms: a false read of the hidden arrow buttons at the gallery edges.
  - The inspector's `.taste-skill/` output folder was deleted after reading (not under `sites/`).
- **Micro-animations** (the `/find-animation-opportunities` and `/animate` checklist, applied by hand: transform and opacity only, one ease-out curve `cubic-bezier(.23,1,.32,1)`, 120–380 ms):
  - every button presses to 0.97; the booking buttons lift 1 px on hover (fine pointers only);
  - the contact buttons' icons turn red and tilt;
  - the tab pill slides (220 ms), and the panel cross-fades with a 6 px rise;
  - price cards and lesson cards lift;
  - inclusion icons tilt on hover;
  - slideshow dots stretch to a bar (`scaleX`), and the arrows press;
  - the shop squares zoom 3.5 % inside their frame;
  - the old-front print straightens on hover;
  - the reel fades in when it starts;
  - the header bar (desktop) and the phone bar slide in after the hero.
  - No heading reveals, no parallax.
- **Impeccable:** its downloaded engine binary was not run on this machine. Its reference files were not needed beyond the above.

### Reduced motion, no JS, keyboard (looked at)
- **Reduced motion:** all transitions drop to 0.01 ms, slideshows jump instead of sliding, and smooth scrolling is off. The reel never attaches its sources and shows its poster with a Play button (checked: `paused: true`, no `currentSrc`). The same happens under Save-Data.
- **JS off:** all four packages render stacked (all four panels visible, tab row hidden). Slideshows are native swipe/scroll-snap rows. The phone bar and the desktop header bar are hidden. The reel shows its poster image. Every booking, call, email and map action is a plain link.
- **Keyboard:** the tabs are a WAI-ARIA tablist (arrows, Home, End). The slideshow tracks are focusable and take Left/Right; dots and arrows are buttons. Visible focus ring in the ink colour. The desktop header bar is `aria-hidden` and its links are `tabindex=-1` (it duplicates the header). No drawer, so no focus trap is needed.

## images

All business-owned (`dossier/cheeky-monkey/assets/index.json`). Booking.com ones are property-uploaded photos on the business's own listing (hotel id 1229648). The others come from the media library of the owner's site, cheekymonkeymidigama.com. None of the seven unknown-licence images (img-153, 156–161) is used, and no stock is used.

| use | asset | licence note |
|---|---|---|
| hero (16:10 band desktop, 4:5 phone) | img-147 (2000×1868) | owner's site |
| shop, 4:5 | img-122 (1733×2000) | owner's site |
| shop squares | img-108, img-146, img-096 | owner's site |
| shop reel | vid-009 (business-owned reel, 7 Oct 2026), the dossier's clean cut 3.0–13.0 s, 720×1280 WebM 1.18 MB / MP4 1.43 MB, loaded only in view | Instagram reel of the business |
| roof band 21:9 / 4:5 | img-137 (1864×2000) | owner's site |
| Baba, 4:5 | img-141 | owner's site |
| the earlier shop front, small print | img-121, alt-texted as the earlier front, never as today's | owner's site |
| closing band 21:9 / 4:5 | img-103 (2000×1333) | owner's site |
| rooms (3:2) | Superior Double img-030, 014, 021, 016, 033, 026 · Double img-058, 041, 045, 050, 053 · Small Double img-002, 004, 009, 013 · Classic Triple img-035, 034, 036, 037 · Small Twin img-064, 063, 065, 070 | Booking.com property uploads |
| Instagram tiles | img-146, img-134, img-108, img-099, img-085, img-105 | owner's site / Booking.com |

Nothing is drawn wider than its source: the hero comes from a 2000 px source; the room photos come from 1440–1920 px sources and are shown at ≤ 1040 CSS px; the roof band comes from 1864 px.

## gaps

- **No WhatsApp:** the booking path is Booking.com for rooms (every room, the hero, the header bar and the phone bar) and phone/email for surf weeks and lessons, as the copy says. Pitch point.
- **Prices are from 2021:** every price carries "published 2021", and the copy's two dated notes sit under the weeks and the lessons, marked with a place-colour dot.
- **No break name:** the "The waves" line is the copy's `spot` text. There is no forecast (concept §3).
- **No shop hours, no opening status, no instructor names:** none is shown or implied.
- **Room galleries:** the schema holds one photo per room. The mockup hard-wires 4–6 per room from the concept (schema gap, concepts §6).
- **No hero subtitle field:** "what + where" is the wordmark plus "Midigama, Sri Lanka" from `contact.address` (concepts §6).
- **Instagram tiles** link to the profile; there are no per-post URLs.
- **Facebook link:** in the footer, from `dossier.contact.socials.facebook`. It is not in `copy/en.json`, so it is in `build.py` with its dossier key in a comment. Christina's review links to the owner's site (`source: "site"`), from `dossier.contact.socials.website`.

## conflicts

None blocking. Recorded deviations from concept 1, each a choice the human may overrule:
1. **Hero title contrast.** The concept asked for white Yellowtail with a 24 px / 25 % shadow and said "the designer checks ≥ 4.5:1 … if it fails, the title moves to the lower-centre over the darker road". It failed (2.2:1 / 1.7:1). The lower-centre position puts the title on the CHEEKY MONKEY sign and the TAXI board, so it stays in the sky with a light grade and a soft scrim, measured at 3.1:1. That passes the 3:1 floor for large text, not 4.5:1. The 15 px where-line passes 4.5:1 (11:1+).
2. **Footer ground.** The concept says white. It is the tint `#EEF1F2`, because the Instagram row above it is white and the two ran together on the sheet.
3. **Lesson cards.** The concept's third card is "Private lesson, SUP, Surf spot tour". It is titled "More lessons" (a label, no claim) and lists those three `lessons[]` labels.
4. **Airport transfers** (`priceList`, flat USD 65 / 65 / 130, 2021) are not in the concept. They are shown in "Getting here" so all three variants can carry the same prices.
5. **Room order** follows the concept (Superior first), not the copy's order (Small Double first).

## Hand-off checks (4e)

1. Look loop: five rounds (three first-screen, two whole-page), each written up above. Every `dist/` file is made by `src/make-media.sh` (the recipe empties `dist/img`, `dist/video`, `dist/fonts` and rebuilds them). The last sheets were looked at for overflow, overlap and unreadable text. **pass**
2. Booking CTA: `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html` matches `dossier.booking.engine_url` character for character. `tel:+94719248686` matches `dossier.contact.phone`. `audit-mockup` tapped the hero CTA at 390 px and landed on that URL. **pass**
3. `tools/check-design.mjs cheeky-monkey`: calm **ok**, 0 problems, 0 default-look warnings (fonts Yellowtail + Albert Sans, ground white). **pass**
4. `tools/check-places.mjs cheeky-monkey`: 0 borrowed images, 0 failing. **pass**
5. Reduced motion and no-JS looked at (above). There is no WebGL in calm. `audit-mockup`: **`scroll.early.cls` 0.0027, `scroll.settled.cls` 0**. First load 210 KB, 0 JS files (the JS is inline), LCP 436 ms, CLS 0, 0 third-party requests. **pass**
6. Other businesses in this run: none. Cheeky Monkey is the only business concepted in `2026-10-midigama-01` (concepts §5). Against its sibling variants, which are being built in parallel, a visitor would notice:
   - **calm** opens on a still street photograph, in Yellowtail with a red button;
   - **interactive** (per its concept and check-design) opens on the reel, in Knewave + Schibsted Grotesk with a magenta button;
   - **unique** opens on one board-shaped window on white, in Permanent Marker + Rethink Sans with a blue button.
   **pass**
7. The video is used: vid-009, the only usable clip, as the in-view reel card in the shop. The first screen is img-147, the strongest frame, as concept 1 decided. A vertical 1080 px indoor clip cannot be a desktop full-bleed, and calm opens on the still. The last look-log rounds say why this beats the current site. **pass**
