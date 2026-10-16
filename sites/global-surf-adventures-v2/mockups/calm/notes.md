# Global Surf v2 · calm · "Walk to the water" — designer 0.5.0, station 4e

Run `2026-10-globalsurf-03`, 2026-10-16/17. Brief: `concepts.md` Concept 1. Pages: `dist/index.html` (home) and `dist/book/index.html` (the booking page, "the open page" accordion). Media recipe: `src/make-media.sh` (`# media:` headers for `dist/img/**` and `dist/video/**`; video lives in the store via `tools/link-assets.sh`). Rosa fixture: `src/rosa-south-point.json` (live response of 2026-10-16T14:26Z, unedited).

Old-site comparison: the dossier has no `old-site-*.png`, so the live site was shot for this round with `tools/shoot.mjs` (home and lodge page, into `/tmp/claude-1000/gs-v2-oldsite-calm`, not in the repo). What it showed: home opens on a Maldives aerial with a YouTube pause icon and a black bar under the video; the lodge page opens on a dark sunset rock with breadcrumbs, YouTube chrome and the Messenger bubble on every screen; no price anywhere, a Kuula 360° box, a beige footer with underlined links. Its strength: handwritten section titles, real photography, an Instagram block.

## look-log

**First screen, round 1.** Built header + hero only: vid-010 morning edit full-bleed, "Next set is yours" in Figtree 600 / 56 px, crimson "Book package now". The sheet showed the title sitting on bright sand and the walking group's heads, with only a faint shadow: readable but weak on the 390 px group shot, and the logo and nav thin over the sky. Against the old site's home and lodge heroes it already wins at a glance (bright, real guests, one button, no chrome or bubble), but the title needed to hold over every frame of the loop, not just the poster.

**First screen, round 2.** Title up to 60 px with a wider, softer local halo (text-shadow only, no overlay), the same halo on nav and logo; the hero button tightened on phones. Checked the poster state separately under reduced motion: the 14.0 s frame (two women with mint soft-tops, sun behind) is the best frame of the loop at both widths and the title now reads on sand, palms and boards. Gap found: phones had no navigation at all.

**First screen, round 3.** Added the phone menu (white full-screen sheet, focus moved in, Esc closes, focus returned) and the phone bottom bar ("From $1,466 pp | 7 nights" + "Book now", appears after the hero). Header turns into a plain white bar with "Book now" after the hero. Sheet: header, centred title, one button, nothing else; clearly better than both old heroes side by side.

**Whole page, round 1.** Built every section from the copy. Sheets showed: the Freestylers photo and the Instagram tiles stretched to their `height` attributes (portrait boxes cropping 3:2 photos), the quotes stuck to the top of the sunset band over a light sky, the footer logo with a 150 px empty box above it, the "Open in Maps" pin icon unsized so the button wrapped into three lines, the trust pill breaking badly at 390 px, and the Instagram tint running straight into a tint footer as one grey slab.

**Whole page, round 2.** Fixed all of it: `height:auto` on images (aspect ratios now hold), quotes vertically centred on the band with a soft local shade behind the text only; on phones the quotes sit under the photograph on white (white text on the 4:5 sunset crop was low contrast); logo aspect ratio fixed; every button icon sized; trust pill wraps cleanly; footer on white as the concept says, contact buttons on the tint. Breakfast slideshow given more width. Checked again over http (check-design shots): Rosa's widget renders in its reserved 420×500 box beside the drawn headline; no overflow or overlap at 1440 or 390; nothing covered by the header or the bottom bar.

**Why this beats the current site (last round, side by side).** The current home opens on another country, the lodge page on a dark rock with video chrome and a chat bubble, and neither shows a price. This page opens on the lodge's own guests walking soft-tops to the sea in morning sun with one button; one scroll down are three levels with their footage and "From $1,466 pp | 7 nights" on each; rooms are sold with 5–6 photographs each; the booking flow stays on the site until guest details and payment. It keeps what the old site does well (handwritten titles, an Instagram block, a real footer) and does it more cleanly.

**Booking page.** Shot at 1440/390 and tapped through on a 390 px touch viewport: `?level=2` → twin room → Sat 7 Nov → +1 man → "Continue booking" landed on `https://globalsurfadventures.bookinglayer.com/en/product/level-2-rollers?start=2026-11-07&end=2026-11-14&female=1&male=1&couple=0` (engine request intercepted, nothing booked). Fixed after the first shot: "Questions? Ask us" was invisible on the tint total card; the logo kept the hero's halo on the white header; 16 Saturday chips were too long on a phone (12 now).

## images

All `business-owned` (dossier `images[].license`). None is `not_lodge`.

| file in dist/img | asset | license | note |
|---|---|---|---|
| hero-poster-1728/1000, hero-poster-m608 | vid-010 frame 14.0 s | business-owned | badge cropped (1728×972 / 608×1080 native) |
| level-1 | vid-010 frame 12.9 s | business-owned | 3:4 |
| level-2 | img-133 | business-owned | 3:4 crop |
| level-3 | img-099 | business-owned | 3:4 crop |
| freestylers | img-001 | business-owned | 3:2 |
| breakfast-011/021/033/057 | img-011, img-021, img-033, img-057 | business-owned | 3:2 |
| pool-2000 / pool-m | img-005 (2000 px) | business-owned | full-bleed 16:9 / 4:5 |
| waves-2000 / waves-m | img-112 (2000 px) | business-owned | 21:9 band / 4:3; surf illustration, never captioned as the lodge's wave |
| sunset-2000 / sunset-m | img-111 (2000 px) | business-owned | 21:9 / 4:5 |
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
- Saturday chips are the next 12 Saturdays generated in the browser, not an availability claim; the engine shows which are free. No-JS: plain check-in / check-out date fields and one "Continue booking" button per level.
- Rosa: headline inlined from the fixture; if it is older than 24 h it is hidden and one lazy request to the live JSON redraws it, else only the plain link remains.

## conflicts

None blocking. Deliberate departures from the concept, recorded for the critics:
1. **Hero cut list.** Concept: 8.28–10.72 → 10.72–12.24 → 13.56–15.92 → 15.92–17.04 with poster at 14.6 s. Built: women walking 14.00–15.88 → group into the water → boards under the tree → lying on the boards → the pop-up itself (12.28–13.52, the shot boundary scdet found that the concept skipped), 8.0 s. The loop starts on its own poster frame (14.0 s; better faces than 14.6 s), so nothing jumps when the video starts.
2. **Phone hero rendition** is a 608×1080 native 9:16 crop instead of a scaled 16:9 file, so the phone is never filled by an upscaled band.
3. **Level 1 still** is the pop-up practice on the mint soft-tops (vid-010 12.9 s), not the 14.6 s frame, which would repeat the hero poster one scroll later. The soft-tops still return at Level 1, as the concept wants.
4. **Quotes on phones** sit under the sunset photograph on white, not on it: white text on the bright 4:5 crop failed contrast.
5. **Booking page title** uses `title_c3` ("Your surf week starts here"), which is also the unique variant's hero line; swap for another copy line if the human finds that confusing.

## hand-off checks (4e)

1. Look loop: 3 first-screen rounds + 2 whole-page rounds + booking page shot. Every flaw named above was fixed.
2. Booking targets copied from the copy/dossier: engine product URLs `…/en/product/level-1-fomies|level-2-rollers|level-3-riders`, WhatsApp `https://wa.me/972523593240?text=…` (copy `bookingLinks`), tel `+97299733943`, mailto `info@globalsurf.com`. Tapped through on a 390 px viewport (above).
3. `node tools/check-design.mjs global-surf-adventures-v2`: **calm ok**, 0 problems, 0 default-look warnings (h1 Figtree, h2 Kalam, body Figtree, ground #FFFFFF, 0 all-caps labels).
4. `node tools/check-places.mjs global-surf-adventures-v2`: 0 borrowed images, 0 failing.
5. Reduced motion looked at: poster only, Play buttons hidden, no transitions. No WebGL/canvas on this page.
6. Against the other two variants (looked at their check-design first screens): interactive opens on a tuk-tuk with boards on the road under "Surf weeks in Sri Lanka" with a tangerine button; unique opens on a drone shot of the lodge's roofs under "Your surf week starts here" in a serif with a pool-blue button. Calm is the only one with people on the first screen, a crimson button, a rounded sans + marker-hand pair, stills-first levels and full-width stacked room slideshows.
7. The business's video is used (hero + three level clips); the first screen is its strongest footage.
