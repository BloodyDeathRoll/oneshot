# Global Surf v2 · calm · "Walk to the water" — designer 0.5.0, station 4e

Run `2026-10-globalsurf-03`, 2026-10-16/17. Round 2 (rework after 4f round 1: visual 7, experience 7) on 2026-10-17. Brief: `concepts.md` Concept 1. Pages: `dist/index.html` (home) and `dist/book/index.html` (the booking page, "the open page" accordion). Media recipe: `src/make-media.sh` (`# media:` headers for `dist/img/**` and `dist/video/**`; video lives in the store via `tools/link-assets.sh`). Rosa fixture: `src/rosa-south-point.json` (live response of 2026-10-16T14:26Z, unedited).

Old-site comparison: the dossier has no `old-site-*.png`, so the live site was shot for this round with `tools/shoot.mjs` (home and lodge page, into `/tmp/claude-1000/gs-v2-oldsite-calm`, not in the repo). What it showed: home opens on a Maldives aerial with a YouTube pause icon and a black bar under the video; the lodge page opens on a dark sunset rock with breadcrumbs, YouTube chrome and the Messenger bubble on every screen; no price anywhere, a Kuula 360° box, a beige footer with underlined links. Its strength: handwritten section titles, real photography, an Instagram block.

## look-log

**First screen, round 1.** Built header + hero only: vid-010 morning edit full-bleed, "Next set is yours" in Figtree 600 / 56 px, crimson "Book package now". The sheet showed the title sitting on bright sand and the walking group's heads, with only a faint shadow: readable but weak on the 390 px group shot, and the logo and nav thin over the sky. Against the old site's home and lodge heroes it already wins at a glance (bright, real guests, one button, no chrome or bubble), but the title needed to hold over every frame of the loop, not just the poster.

**First screen, round 2.** Title up to 60 px with a wider, softer local halo (text-shadow only, no overlay), the same halo on nav and logo; the hero button tightened on phones. Checked the poster state separately under reduced motion: the 14.0 s frame (two women with mint soft-tops, sun behind) is the best frame of the loop at both widths and the title now reads on sand, palms and boards. Gap found: phones had no navigation at all.

**First screen, round 3.** Added the phone menu (white full-screen sheet, focus moved in, Esc closes, focus returned) and the phone bottom bar ("From $1,466 pp | 7 nights" + "Book now", appears after the hero). Header turns into a plain white bar with "Book now" after the hero. Sheet: header, centred title, one button, nothing else; clearly better than both old heroes side by side.

**Whole page, round 1.** Built every section from the copy. Sheets showed: the Freestylers photo and the Instagram tiles stretched to their `height` attributes (portrait boxes cropping 3:2 photos), the quotes stuck to the top of the sunset band over a light sky, the footer logo with a 150 px empty box above it, the "Open in Maps" pin icon unsized so the button wrapped into three lines, the trust pill breaking badly at 390 px, and the Instagram tint running straight into a tint footer as one grey slab.

**Whole page, round 2.** Fixed all of it: `height:auto` on images (aspect ratios now hold), quotes vertically centred on the band with a soft local shade behind the text only; on phones the quotes sit under the photograph on white (white text on the 4:5 sunset crop was low contrast); logo aspect ratio fixed; every button icon sized; trust pill wraps cleanly; footer on white as the concept says, contact buttons on the tint. Breakfast slideshow given more width. Checked again over http (check-design shots): Rosa's widget renders in its reserved 420×500 box beside the drawn headline; no overflow or overlap at 1440 or 390; nothing covered by the header or the bottom bar.

**Why this beats the current site (last round, side by side).** The current home opens on another country, the lodge page on a dark rock with video chrome and a chat bubble, and neither shows a price. This page opens on the lodge's own guests walking soft-tops to the sea in morning sun with one button; one scroll down are three levels with their footage and "From $1,466 pp | 7 nights" on each; rooms are sold with 5–6 photographs each; the booking flow stays on the site until guest details and payment. It keeps what the old site does well (handwritten titles, an Instagram block, a real footer) and does it more cleanly.

**Booking page.** Shot at 1440/390 and tapped through on a 390 px touch viewport: `?level=2` → twin room → Sat 7 Nov → +1 man → "Continue booking" landed on `https://globalsurfadventures.bookinglayer.com/en/product/level-2-rollers?start=2026-11-07&end=2026-11-14&female=1&male=1&couple=0` (engine request intercepted, nothing booked). Fixed after the first shot: "Questions? Ask us" was invisible on the tint total card; the logo kept the hero's halo on the white header; 16 Saturday chips were too long on a phone (12 now).

**Round 2.1 (rework after 4f round 1; whole page rebuilt against the three reports).** Hero recut: the busy group walk with the hotel block and the backlit tree shot (heads cut at 9:16) are gone. The loop now opens on the drone over the whitewater where beginners wait for the next set (sand above, turquoise water under "Next set is yours"), then a beginner riding the whitewater, the two women with mint soft-tops, lying on the boards, the pop-up; 7.2 s, a light grade on the master, desktop at 4.0 Mb/s (3.96 MB mp4 / 3.18 MB webm; phone 1.79 / 1.54 MB). Kalam in teal replaced by Birthstone in ink; teal removed everywhere (icons, pills, dots and score badge are ink), so crimson is the only accent. The centred stack is broken up: levels header split (title + " | " detail line left, intro right), wider level stills, the Freestylers card beside an 8.6 score card, the two price paragraphs moved out of the levels into a white price card under the breakfast slideshow, the lodge as title + amenity chips left and text right, the rooms as one viewer with three tabs and the slideshow flush to the left edge, guests split (sunset photo flush left, quotes on white right), dinner mirrored, Instagram one row of six. The Level 1 still is now img-114 (theory round a mint soft-top), a crisp photograph instead of a soft video frame. The sheet showed: a horizontal overflow on phones (the 1fr guests grid took the min-content of the quote track, pushing the menu and Book now off screen and cutting the quotes), the room tabs wrapping to two rows at 1440, and "What's" set with a gap in Birthstone. Against the old site (`reports/2026-10-globalsurf-03/current-site/shots/desktop-sheet.png`): its first screen is a dark palm still with a breadcrumb; ours opens on the lodge's own beginners in bright water with one button. Clearly better at a glance.

**Round 2.2.** minmax(0,1fr) on every phone grid: no overflow at 390, and the menu and Book now are back in the header. The tabs sit on one row (head grid 1fr auto). Guests bottom padding tightened. Rosa: the widget is inserted only on an http(s) origin; until it loads, and wherever it is refused, the reserved 420×500 box shows a designed card (wave icon, "South Point", the crimson "See today's forecast for South Point on Rosa" button) instead of an empty or failed frame. Shot over http, the widget renders in its box beside the headline. Reduced motion looked at: the poster is the drone frame, the title reads on water at both widths, Play buttons hidden. Phone: the lodge's second paragraph waits behind "Read more", the amenities are a two-row swipe of chips, and the quote appears once, under the photograph.

**Round 2.3 (booking page).** /book/ rebuilt to look like the home page: the pool photograph as a band under the header with the script title, no grey step boxes, level cards 4:5 and room cards 3:2 at full width (swipe rows with peek on phones), ink check badges, the included list on one tint card, the total as a two-column tint card, and on phones a pinned bar with the running total and "Continue booking". The Saturday chips are the engine's choosable Saturdays from `docs/bookinglayer.md` (one guest, read 29 Sep 2026; past ones dropped in the browser), labelled "Dates from the booking engine, 29 Sep 2026; the next page shows what is free today." The "Questions? Ask us" WhatsApp prefill now names the chosen level, room, date, nights and guests. The phone header gets "Back to the lodge". Tapped through at 390 over http: hero → /book/ (1 tap); `?level=2` → twin → Next → Sat 24 Oct → +1 man → pinned "Continue booking" landed on `https://globalsurfadventures.bookinglayer.com/en/product/level-2-rollers?start=2026-10-24&end=2026-10-31&female=1&male=1&couple=0` (intercepted, nothing booked). From the hero with no preselection: 7 taps. Apostrophe kerned. Final shots over http in `shots/`.

**Why this beats the current site (round 2, side by side).** The current lodge page opens on a dark, desaturated palm still with a breadcrumb and a Messenger bubble, prints no price, and shows the rooms as a blurred 360° box. This page opens on the lodge's own beginners in bright water with one button, sells the three levels with prices one scroll down, shows every room with 5–6 photographs in one viewer, and keeps the handwritten titles the old site does well, in a finer hand.

## images

All `business-owned` (dossier `images[].license`). None is `not_lodge`.

| file in dist/img | asset | license | note |
|---|---|---|---|
| hero-poster-1728/1000, hero-poster-m608 | vid-010 frame 17.12 s (drone over the whitewater) | business-owned | badge cropped (1728×972 / 608×1080 native); round 2 |
| level-1 | img-114 | business-owned | 3:4; round 2 (was a vid-010 frame) |
| level-2 | img-133 | business-owned | 3:4 crop |
| level-3 | img-099 | business-owned | 3:4 crop |
| freestylers | img-001 | business-owned | 3:2 |
| breakfast-011/021/033/057 | img-011, img-021, img-033, img-057 | business-owned | 3:2 |
| pool-2000 / pool-m | img-005 (2000 px) | business-owned | full-bleed 16:9 / 4:5 |
| waves-2000 / waves-m | img-112 (2000 px) | business-owned | 21:9 band / 4:3; surf illustration, never captioned as the lodge's wave |
| sunset-45 / sunset-m | img-111 (2000 px) | business-owned | 4:5 beside the quotes (1066 / 900 px); round 2 |
| dinner | img-065 | business-owned | 4:5 |
| room-063/078/095/042/050/064 | dorm gallery | business-owned | 3:2, shown 16:9 desktop |
| room-080/084/083/069/079 | twin gallery | business-owned | |
| room-081/082/041/043/044/071 | deluxe double gallery | business-owned | |
| ig-024/090/055/087/118/016 | Instagram tiles | business-owned | square, link to @globalsurf_kabalana |

Video (`dist/video`, store): `hero-d1728` (3.6 MB mp4 / 2.5 MB webm), `hero-m608` (1.7 / 1.3 MB), `level-1/2/3` (0.4–0.8 MB each, played only on Play).

## gaps

- No season in the dossier: not shown.
- No daily schedule times: the page follows the day's order, never a clock.
- Only WhatsApp is the Israeli HQ mobile; "Call us" is the HQ line `+97299733943` (copy `contact.phone`); the lodge's Google number is not on the page (copy did not pass it).
- No harvested Instagram posts: the tiles are the lodge's own photographs linking to the profile.
- Room supplements and totals are the engine's 7-night snapshots (29 Sep 2026); for 14/21/28 nights the booking page says "Price for n nights on the next page" instead of extrapolating.
- Saturday chips (round 2): the engine's choosable Saturdays for one guest on 29 Sep 2026 (`docs/bookinglayer.md`), labelled with that date; the engine confirms. No-JS: plain check-in / check-out date fields and one "Continue booking" button per level.
- Rosa: headline inlined from the fixture; if it is older than 24 h it is hidden and one lazy request to the live JSON redraws it, else only the plain link remains.

## conflicts

None blocking. Deliberate departures from the concept, recorded for the critics:
1. **Hero cut list (round 2).** Concept: 8.28–10.72 → 10.72–12.24 → 13.56–15.92 → 15.92–17.04, poster at 14.6 s. Built: drone over the whitewater 17.12–18.40 (poster) → beginner rides 18.68–19.68 → women with mint soft-tops 13.60–15.88 → lying 10.76–12.20 → pop-up 12.28–13.52, 7.2 s. The visual critic found the group shot busy (hotel block) and the title on bodies; the experience critic found the tree shot cutting heads at 9:16. The mint soft-tops stay in the loop, but the poster is now a frame where the title sits on water. The women's mid-shot still puts the title over a board for 2.3 s of the loop; it stays legible with the halo, and they are the concept's anchor.
2. **Phone hero rendition** is a 608×1080 native 9:16 crop instead of a scaled 16:9 file, so the phone is never filled by an upscaled band.
3. **Level 1 still** (round 2) is img-114, a group on the sand round a guide and a mint soft-top, not the concept's 14.6 s video frame: the visual critic found the video frame soft and duller than its neighbours. The soft-tops still return at Level 1, and the Level 1 clip (Play) is still vid-010.
4. **Quotes on phones** sit under the sunset photograph on white, not on it: white text on the bright 4:5 crop failed contrast.
5. **Booking page title** uses `title_c3` ("Your surf week starts here"), which is also the unique variant's hero line; swap for another copy line if the human finds that confusing.

6. **Rating on the first screen (critic d4, fix 2) not done.** Shahar's calibration in references.md says "No rating in the hero." The 8.6 score card sits one scroll down, beside the Freestylers card. A human decision if it is wanted.
7. **The booking page carries a photo band** (pool img-005 under the header), against the concept's "no media band on the booking page", because the experience critic asked that /book/ look like the bright home page.
8. **Carousel dots are 36×44 px**, not 44×44: nine review dots 44 px wide do not fit a 390 px phone. They clear WCAG 2.5.8 (24 px), and the slides also swipe and take arrow keys.
9. **Fonts still load from Google Fonts** (the 4e allowance); self-hosting is 4g's (critic fix 5).

## hand-off checks (4e, round 2)

1. Look loop: 3 first-screen rounds + 2 whole-page rounds + booking page shot (round 1); rounds 2.1–2.3 (round 2). Every flaw named above was fixed or is listed under conflicts.
2. Booking targets copied from the copy/dossier: engine product URLs `…/en/product/level-1-fomies|level-2-rollers|level-3-riders`, WhatsApp `https://wa.me/972523593240?text=…` (copy `bookingLinks`), tel `+97299733943`, mailto `info@globalsurf.com`. Tapped through on a 390 px viewport (above).
3. `node tools/check-design.mjs sites/global-surf-adventures-v2/mockups/calm/dist` and `…/dist/book` (round 2): **ok**, 0 problems, 0 default-look warnings (home: h1 Figtree, h2 Birthstone, body Figtree; book: h1 Birthstone; ground #FFFFFF; 0 all-caps labels). Run by path because another agent held the shared port. The dossier-width check does not apply in path mode; every full-width image comes from a source of 1728 px or more.
4. `node tools/check-places.mjs global-surf-adventures-v2`: 0 borrowed images, 0 failing.
5. Reduced motion looked at: poster only, Play buttons hidden, no transitions. No WebGL/canvas on this page.
6. Against the other two variants (looked at their check-design first screens): interactive opens on a tuk-tuk with boards on the road under "Surf weeks in Sri Lanka" with a tangerine button; unique opens on a drone shot of the lodge's roofs under "Your surf week starts here" in a serif with a pool-blue button. Calm is the only one with beginners in the water on the first screen, a crimson button, a rounded sans + fine script pair (Figtree + Birthstone; interactive uses Plus Jakarta Sans + Sacramento, unique Literata + Parisienne), stills-first levels and full-width stacked room slideshows.
7. The business's video is used (hero + three level clips); the first screen is its strongest footage.
