# Global Surf Lodge Kabalana — mockup, concept 3 · bolder · "The sign"

designer 0.4.1 · station 4e · run `2026-09-globalsurf-02` · 2026-09-29

Pages: `dist/index.html` (home) and `dist/book/index.html` (booking desk). The source is in `src/`: `build.py` assembles both pages from the partials and reads every room, inclusion, testimonial and footer string straight from `copy/en.json`, so none of that copy is retyped. Photos are resized WebP files in `dist/img/`. Video renditions and posters are in `dist/video/`. Fonts load from Google Fonts: Bricolage Grotesque (text) and Yellowtail (script titles). Rounds 2 onwards were shot over `http://localhost` with a static server on `dist/`. The first round was shot over `file://`, and there Rosa's `frame-ancestors *` refuses the frame. Over http the widget loads.

## look-log

The old site was open beside every round: `old-site-home-desktop-fold.png` / `-mobile-fold.png` and `old-site-lodge-desktop.png` (full page). Process note: the whole page existed from round 1, but rounds 1–3 were judged on the first screen only.

### Round 1: first screen (`shots/round-1/`)
- **What was wrong with the design:** the header's hidden "Book now" still took up its space, so the four links sat off-centre with a hole at the right. On the phone the script title broke as "Your surf week starts / here", leaving one orphan word. The subtitle was thin over the white bungalow walls. Further down, the Instagram tiles rendered as tall strips, not squares (the height attribute won over aspect-ratio).
- **Change:** the header button is `display:none` until the header turns solid. `text-wrap: balance` and a 330 px measure on the phone title. The subtitle is heavier with a tighter shadow. Tile `height:auto`.
- **Against the old site:** already better at a glance. Theirs is an agency reel under a dark header bar, a serif title and a small button, with a Messenger bubble over the next section. Ours is the lodge's own pool and reef, the sign's brush script and one clear coral button.

### Round 2: first screen (`shots/round-2/`)
- **What was wrong with the design:** desktop is right now: a clear video, header only, one centred title, a very short where-line and one button. The phone title now wraps as two balanced lines. What was left: the phone button (204 px) is small for a thumb, the logo is a little light at 1440, and the phone's closing band clipped its buttons (min-height too short for the text).
- **Change:** hero button at least 250 px wide on the phone. Logo 170 px on desktop. The closing band sizes to its content on the phone (min 640 px), and its text gets a stronger shadow.
- **Against the old site:** clearly better. Same shape as the owner's current cover (video, centred title, coral button), but the lodge's own footage, and no bubble or badge on it.

### Round 3: first screen (`shots/round-3/`)
- **What was wrong with the design:** nothing on the first screen against the calibration list. There is no rating, no tagline stack, no overlay, no title animation, no black text on coral, and no rule under the header. The title is 68 px, not a giant word. Below the fold, the closing text sat on the bright lamps of img-093.
- **Change:** stronger shadow on the closing line (`0 1px 3px` + `0 2px 26px`), and then the booking page was built.
- **Against the old site:** better at a glance on both widths.

### Round 4: whole home page (`shots/round-4/`) and booking page (`shots/round-4-book/`)
- **Home:** levels as three living 4:5 video panels on aqua, with the price and button on each. The week as full-bleed photo pairs. Three full-bleed room galleries with arrows and dots, each with a description, a detail line and a price. The feature photograph with the featureLine in script. The lodge with a dot slideshow. Inclusions with icons and level pills. One quote at a time with dots. Waves with the Rosa headline beside the widget, no line between them. The Instagram row. The closing band. An aqua footer with icon buttons. The phone bar appears after the hero. Instagram squares and the phone closing band are now correct.
- **Booking page:** the disabled "Continue booking" rendered as pale salmon, which reads as the muddy orange the house rules ban. On the phone, the room step showed the same room photo twice (the band and the card gallery).
- **Change:** the button always shows at full coral. With no date or no guests, it scrolls to "Dates and guests" and focuses the missing field instead. On narrow screens the band keeps the level clip during the room step. If the live check finds the chosen room not free, the page moves the choice to a free room and says "Only the … is free on these dates" when only one is free. The phone bar is hidden with JS off, where it can do nothing.

### Round 5: booking page (`shots/round-5-book/`)
- Desktop is a split screen: the pinned left half crossfades from the level clip to the room photo (it follows the chosen room's current slide) to img-001 to img-093. The steps run down the right on white, with script titles, floating-label fields, a segmented nights control, −/+ guest steppers and an aqua total card. On the phone the media band shrinks from 38vh to 20vh as you scroll, and the bottom bar shows the running total with "Continue".
- **Checked against the calibration:** one font pair and one coral throughout the booking pages. Actions are buttons. No rules or underlines. Floating labels, not boxes. Rooms are sold with 5–6 photos each. Inclusions are an icon list with no photographs.
- **Against the old site:** its book buttons drop the chosen package on a generic engine page and it never shows a price. Here you see level, inclusions, rooms, dates, guests and total, then land on the engine's room step with everything but the room already filled in.

Reduced motion (`shots/reduced-motion-390.png`): the hero attaches no video sources and shows only the poster, and the level panels don't open or play. There is no WebGL on either page.

### Round 6: fixes from the r2 critics (`shots/round-6/`, `shots/round-6-book/`)
The old site was open beside this round.
- **Colour:** the aqua `#A2E6FB` sections are gone. The section, footer and total-card ground is now a cool light neutral, `#EEF2F5`. Coral now sits only on white, on light grey or on a photograph. Booking selections are ink `#27293E` with white text; blue fills are gone. Sand was not used: custom.md bans sand and proposal 002 asks for "clean whites and light neutrals". A deep navy section would put body text on a dark panel, which house rule 1 forbids.
- **Level cards:** three equal 4:5 columns, and each button sits on the card's bottom line. The widening on hover is gone; pointing at a card only plays its clip. The posters are now the JPGs (the AVIFs were soft), and desktop clips use the d1920 webm. The Level 2 clip is scaled 1.32 from the top so the rock drops out of frame.
- **Closing band:** img-093 is darkened (brightness .52). The line and both buttons are centred, 620 px wide.
- **Feature line:** it sits at the centre of the water (the image is framed on the bottom of the photo), at no more than 60 % of the width.
- **Script face:** Yellowtail becomes Damion. Yellowtail's "F" read as "+" ("+ollow"); Damion's F is clear.
- **Hero:** the subtitle is dropped (the critic found it hard to read in 3 of 4 frames). This closes conflict 1: the hero is now title plus button only.
- **"Questions? Ask us" → "WhatsApp us"** (`ctas.whatsapp_footer`, already approved copy). The button was always a filled button. What read as an underline was the long tail of Bricolage's "Q", and the font has no alternate glyph for it.
- **Booking on phones:** the media band is a 34vh block (min 220 px) that scrolls away with the page. It no longer sticks or covers step titles.
- **JS off:** Chromium forces native controls on video when scripts are off, so `.no-js video{display:none}` hides them. The hero, the level cards and the booking media show their posters as CSS backgrounds instead. Measured: 0 visible videos on either page.
- **Tap targets:** dots are 44×44, the steppers 44 wide, and the logo, Rosa credit and "Terms and conditions" links at least 44 px tall. Measured on the booking page at 390 px: 0 targets under 44 px.
- **Booking-page clip:** now attached after `load` + 60 ms. Measured: first paint at 212 ms, then the level clip requested at +356 ms.
- **Not borrowed:** the pill switcher and the sticky summary. The equal cards fixed the level choice, and the split screen already keeps the media beside the steps; the total step carries the summary.
- **Checks:**
  - `check-design`: ok on both pages; fonts Damion + Bricolage.
  - `funnel`: clicks_to_book 1, CTA above the fold, 0 broken.
  - Hand-off with JS off: `…/level-1-fomies?start=2027-02-20&end=2027-02-27&female=1&male=0&couple=0`.
  - Hand-off with JS on: `…/level-2-rollers?start=2027-02-13&couple=1&end=2027-02-20`, with a live total of $3,092.05.
- **Against the old site:** calmer and closer to its tasteful white-plus-script look, but with the lodge's own footage, prices, sold rooms and a working booking desk. Clearly better at a glance.

### Round 7: polish after the r2 re-score (`shots/round-7/`, `shots/round-7-book/`)
The old site was open beside this round.
- **Level footage:** new 4:5 portrait cuts at 864×1080. I made them in `dist/video/` with ffmpeg; they are derivatives and not in `dossier.videos[]`. Each is a centre crop of the 1080 p source with no upscaling, used on both phone and desktop; phones previously got the 720×406 rendition upscaled. The poster JPGs are extracted at q3.
  - `vid-010-p45`: from `vid-010-source.mp4`, 20–29 s, the golden-hour stand-up; webm 1.9 MB.
  - `vid-003e-p45`: from 1.4 s, which trims the opening frames with the dark rock; webm 1.27 MB.
  - `vid-002e-p45`: webm 0.94 MB.
  - Removed: the old m720/m1280/d1920 level renditions and the CSS zoom.
- **Closing band:** a short script line, "All levels, steps from the beach" (`hero.subtitle`, approved copy). Under it, the closing sentence at 18 px and 460 px wide, then the buttons, all centred. The photo is framed low (pool, not palm fronds) and darkened to .5.
- **Confident middle section:** "What guests say" is now a full-bleed img-023 (guests toasting), darkened, with white text. A navy band would put more than a third of the viewport of dark ground behind text, which `check-design` fails. A darkened photograph counts as a picture, not a dark theme.
- **Length:** the phone page went from 15.3k to 12.3k px in these shots; the critic measured 14,374 before.
  - The second photo pair of the week is gone (the bowl and the toast; the toast moved to the reviews).
  - On phones the level cards became a swipe row with dots.
  - Section padding on phones is tighter.
  - The reviews show only the 7 Booking.com reviews; the two dropped are testimonials from globalsurf.com. At 44 px each, 9 dots can't fit a 390 px phone.
- **Booking level cards:** each has a 76×95 thumbnail from its clip.
- **Room selection:** the photos, text and tick now sit in one card. The selected card turns a light blue-grey (`#D6E1EA`) with an ink tick. I tried navy first, but on the phone the navy card is taller than a third of the screen and `check-design` fails it ("dark ground behind text").
- **Check-in:** with JS, Saturday date chips grouped by month, built from the select's options (the same snapshot). Chips the live calendar marks full are disabled. Without JS, the native select and the check-out select remain.
- **Tap targets:** 0 targets under 44 px measured at 390 px on both pages. The review dots are now 7 × 44 px.
- **Checks:**
  - `check-design`: ok on both pages.
  - `funnel`: clicks_to_book 1, CTA above the fold, 0 broken.
  - Hand-off with JS on (chip Sat 13 Feb, 1 couple, Level 2): `…/level-2-rollers?start=2027-02-13&couple=1&end=2027-02-20`, live total $3,092.05.
  - Hand-off with JS off: `…/level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1`.
  - No video is visible with JS off.

## Tested (Playwright, 1440 and 390)

- **First load:** 0 requests to Bookinglayer.
- **Live data after interaction** (Level 2, 13 Feb 2027, 1 couple, twin): one GET for the check-in calendar (19 Dec 2026 marked "full" for that mix), one GET for rooms, one POST quote. Result: Package $1,466 pp, twin +$80.02, total **$3,092.05**. That matches the engine sample in `docs/bookinglayer.md`, and the page is labelled "Live price from the booking engine".
- **14 nights:** the live base is $2,639 pp. On that date the dorm was not free, so the page shows that.
- **Hand-off with JS on:** `https://globalsurfadventures.bookinglayer.com/en/product/level-2-rollers?start=2027-02-13&couple=1&end=2027-02-20` (always `end`; zero guest types are dropped). The request was intercepted and aborted; the engine was not opened.
- **Hand-off with JS off** (re-tested after the coordinator's fix): check-in select (`start`) plus a no-JS check-out select (`end`, grouped by check-in, 7/14/21/28 nights, built at build time from the same snapshot calendar), then one of three "Continue with Level n" buttons (`formaction`). Result: `…/level-2-rollers?start=2027-02-20&end=2027-03-06&female=0&male=0&couple=1`. `duration` is no longer sent anywhere. With JS on, re-tested: `…/level-2-rollers?start=2027-02-20&couple=1&end=2027-03-06`.
- **WhatsApp:** the booking-page button carries the choices in the prefilled text. The number and base text are copied from `copy/en.json` `bookingLinks`.
- **`check-design`:** passes on both pages. Round 4 first failed because the hero's fallback `background-color` was a mid blue (L = 0.32). It is now a light `#CDE4EE` behind the poster. No default-look warnings.
- **`funnel`** (`funnel/funnel.json`): clicks_to_book 1, CTA above the fold, 8 pages, 0 broken, 0 console errors.
- **Contrast:** white on coral `#D1402A` 4.69, on hover `#B7331F` 5.99; ink on aqua 10.35; secondary ink `#3F4260` on white 9.72; field label `#5A5D78` on the field grey 5.74.

**Weights:** home HTML 61 KB (16 KB gzip), book HTML 59 KB (16 KB gzip), JS inline. Hero poster AVIF 45 KB. Fonts come from Google, two families (not measured here; 4g self-hosts them). Hero video after first paint: m1280 webm 1.39 MB on phones, d1920 webm 2.66 MB on desktop. Level clips load only when a panel opens or scrolls into view: m720 mp4 1.05–1.90 MB, m1280 webm 1.23–1.99 MB. `dist/` is 23 MB on disk, mostly video renditions that are never loaded together. No `audit-mockup` at 4e.

## images

All `business-owned` per `dossier.images[]`, none `not_lodge`, no stock.

| where | asset | note |
|---|---|---|
| hero | vid-009e (d1920/m1280 webm, d1920/m720 mp4, poster avif/jpg) | lodge's own clip; the edit is not recorded in `dossier.videos[]` (only vid-009 is) |
| level panels / booking step 1 | vid-010, vid-003e, vid-002e (m1280 webm, m720 mp4, posters) | 4:5 / half-screen centre crops keep the vid-010 and vid-003 corner badges out of frame; vid-003e and vid-002e are not in `dossier.videos[]` as separate ids |
| the week | img-118, img-111, img-011, img-023 | 3:2 pairs, full-bleed at 50vw (720 px drawn from 1600 px) |
| rooms (home + booking) | dorm img-063, 095, 042, 064, 050 · twin img-080, 084, 083, 069, 079 · deluxe img-081, 082, 041, 043, 044, 071 | galleries from `copy/en.json mockup_extras.rooms[].gallery`; img-078 dropped because it is the same frame as img-063 |
| feature | img-005 | full-bleed from a 2000 px source |
| the lodge | img-001, 075, 026, 077, 073, 061 | 3:2 crop; 026 and 061 are 16:9 sources |
| Instagram tiles | img-016, 104, 024, 115, 037, 060 | square centre crops; lodge photographs, not posts |
| closing / booking step 4 | img-093 | 1536 px source, drawn at ≤ 1440 px |
| booking step 3 | img-001 | |
| logo | logo-002.svg paths, recoloured with currentColor | |

## gaps

- **Instagram:** no posts were harvested, so the tiles are the lodge's own photographs linking to `@globalsurf_kabalana`, with no post chrome.
- **Room ↔ photo mapping:** still an owner confirmation (`docs/bookinglayer.md` §4). The twin's bed layout is contradictory (Booking.com says 2 singles, the engine says double + single).
- **Deluxe double:** the description comes from the copy's `mockup_extras`. `dossier.rooms_engine` carries the engine data.
- **Choosable Saturdays snapshot:** the doc's list for Level 1 with 1 woman (`docs/bookinglayer.md` §2.1). The live call replaces it per level and guest mix.
- **Snapshot prices exist for 7 nights only** (`offers[].price`, `rooms_engine` samples). For 14/21/28 nights the total reads "Shown on the booking page" until the live quote returns.
- **No season, and no reply-time promise.**
- **The Rosa headline** is a real South Point response fetched once while building (2026-09-29 20:30 local, `generated_at` 14:26Z), inlined and labelled with its time. There is no checked-in `rosa-south-point` fixture (only `rosa-kabalana.json`).
- **Phone number** is the Israeli HQ line (`contact.phone`); the lodge's own number is on Google only. The concepts already flag this.

## conflicts

1. **Subtitle vs concept (closed in round 6: the subtitle was dropped).** Concept 3 says the hero carries "nothing else" but the title. The playbook §3 asks for what + where above the fold, and the calibration allows a very short subtitle. I added `hero.subtitle_alt`, "Sri Lanka's south coast, all levels", at 20 px. Alternative: drop it and rely on the header and page title for the place.
2. **JS-off dates** (fixed at the coordinator's request): the hand-off now uses only `start` + `end`. Without JS the visitor picks the check-out from a second select whose options are grouped by check-in, so a mismatched pair is possible; the engine validates it. The select's labels "Check-out" and "Choose your check-out" are new interface microcopy, not in `copy/en.json`.
3. **Level on the JS-off booking page.** The level radio can't change the form action without JS, so JS-off shows three "Continue with Level n" buttons.
4. **custom.md vs gate feedback:** script titles, soft rounded buttons and cards, gentle shadows on the arrows and phone bar, and no thin black lines. Resolved in favour of Shahar's gate feedback, per proposal 002.
5. **Aqua sections:** the concept caps aqua at four sections, and the home page uses exactly four: levels, what's included, waves and footer. The room text blocks stay on white so the cap holds, and the booking page's total card is aqua (a card, not a section).
6. **Rounding:** a couple's twin supplement is 80.025 per person, so it shows as +$80.02 while the totals add up exactly ($1,546.03 pp, $3,092.05). That is a one-cent display difference.

## other variants

Concepts 1 and 2 are being built in parallel by other designers in their own folders. They were not open when this was written, so the hard-constraint-5 comparison is left to the orchestrator and critic. Only one business is in this run.

## Round 8: small fixes (`shots/round-8/`)
- **Booking-page MP4 fallback:** the `data-mp4` paths were missing `../` because the build's path regex skipped attribute names with digits. Fixed. Re-tested with every `.webm` request blocked, at 1440 and 390: `200 ../video/vid-002e-p45.mp4`, and the clip plays.
- **`vid-010-p45.mp4`:** re-encoded at crf 28 to 1.92 MB, under the 2 MB phone cap. The webm is 1.90 MB.
- **Hero title:** 0.9 px white stroke on the Damion title and a soft layered text-shadow (the title's own shade only, no band on the video). It now holds over the white umbrellas (`round-8/hero-poster-1440.png`).
- **Phone level carousel:** each card's media is 1:1 on phones and its "Choose Level N" button is full-width, so the whole card, button included, is on screen while swiping (`round-8/levels-390.png`).
- **Closing sub-line:** one line from 900 px up; it wraps, balanced, below that (`round-8/closing-1440.png`).
- **check-design:** ok on both pages.

## Round 9: hero title placement (`shots/round-9/`)
- From 900 px up, the title and button still sit centred horizontally but now at the bottom of the hero, `max(64px, 11vh)` from its lower edge.
- The pool frame puts the stack on the dark pool water, clear of the white umbrellas and loungers. The surf frame puts it on the water below the surfer. Checked at 1440 and 1920 on both frames, poster and playing (`hero-1440/1920-poster|video.png`).
- Phones are unchanged (vertically centred).
- The closing sub-line was already one line from 900 px up (round 8).
- **Conflict:** the calibration asks for a title centred horizontally and vertically; on laptop it is now centred horizontally only, at the coordinator's request.

## Round 10: hero title back to the centre (`shots/round-10/`)
- **Round 9 reverted:** Shahar's rule is explicit, so the title and button are centred horizontally and vertically again at every width.
- **Legibility over the umbrellas:** a soft radial shade behind the title text only (an `h1::before` gradient, alpha .38 at its centre fading to 0, extending 36/64 px beyond the text), on top of the existing text-shadow and 0.9 px stroke. Nothing lies over the rest of the video.
- **`object-position` doesn't help:** it can't move the umbrellas. The clip is 16:9, so it has no vertical slack at 1440×900 or 1920×1080.
- Checked at 1440 and 1920 on the pool frame (poster) and the surf frame (playing). `check-design`: ok. The round-9 conflict is closed.
