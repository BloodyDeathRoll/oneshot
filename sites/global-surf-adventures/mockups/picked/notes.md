# Picked composite, Global Surf Lodge Kabalana

designer 0.4.1 · after the `mocked → picked` gate · run `2026-09-globalsurf-02` · 2026-09-30

Shahar picked a composite of the three approved mockups: #1 = `the-sign`, #2 = `try-your-week`, #3 = `postcard`. This is one mockup built from his section-by-section list. It ports the chosen sections' markup, CSS and JS and changes only what had to be unified.

Output: `dist/index.html` (home) and `dist/book/index.html` (booking, one step per screen). CSS and JS are inline. Photos and level clips are copied from the source mockups' `dist/` into `dist/img/{s,p,w}/` and `dist/video/s/`. The path keeps the origin: s = the-sign, p = postcard, w = try-your-week. The new hero loop is `dist/video/hero-*`.

Source (`src/`):
- `build.py` + `book.py`: build both pages from `copy/en.json`. Every string comes from there, apart from the template labels listed below.
- `site.css`, `home.css`, `book.css`, `common.js`, `home.js`, `book.js`: the ported code. Every block is marked with its origin.
- `make-hero.sh`: the hero loop.
- `hero-shots.mjs` + `hero-sheet.sh`: hero frames at five loop times.
- `book-shots.mjs`: walks the booking steps.
- `checks.mjs`: tap targets, reduced motion, and throttled paint and weights.
- `reqs.mjs`: request list.

Rebuild: `bash src/make-hero.sh && python3 src/build.py`.

## Which section came from where

| # | Section | From | Notes |
|---|---|---|---|
| 1 | Hero | #1 | Video, header only, `title_c3` "Your surf week starts here" + "Book package now" (`ctas.hero_c1`), centred both ways, with #1's soft local shade behind the title only. New three-scene loop (below). |
| 2 | Fonts | #3 → Give You Glory | Lora for all text (#3). **Give You Glory** (Google, 400 only, no synthesised bold) for every section/handwritten title: hero, section titles, footer titles and booking step titles. Marck Script and Caveat are gone. It is the only font on the site besides Lora. |
| 3 | "Next set is yours" | #3 | Asymmetric split, img-118 4:5 with img-024 over its corner. |
| 4 | Choose your level | #1 | Three living 4:5 clips (vid-010/003e/002e p45 cuts), Freestylers card. **The Booking.com trust line is removed.** Phone: swipe row with dots. |
| 5 | What's included | #3 | Full-bleed half photo (img-115) + icon list (Level 1) + the Level 3 "coached" line + the airport-pickup note. |
| 5 | Surf, breakfast, surf again | #3 | Text left, slideshow running off the right edge (img-104, 011, 023, 114, 060). |
| 6 | Our rooms | #2 | Split header + room viewer: Dorm / Twin / Deluxe double pills, 16:10 gallery with arrows and dots, description, details, price, "Choose this room". |
| 7 | Pool image (feature line) | #3 | img-005, featureLine in Lora italic as in #3. |
| 7 | What guests say | #3 | Score column (8.6, Booking.com, 80 reviews, 28 Sep 2026, category scores) + quote slideshow of all 9 testimonials. |
| 7 | The waves | #3 | Rosa headline (live JSON when the block nears; plain link when stale or failed) + Rosa's widget, lazy. |
| 8 | Follow the lodge | #2 | Header row with the ink Instagram button, snap row of 8 lodge photos with page dots. |
| 9 | "Book the week for your level." | #3 | Split closing: img-111 left, `closing` in two parts (script line + sentence), coral + WhatsApp buttons. |
| 10 | Footer | #1 | Logo + tagline, "Talk to us" buttons, Getting here, Follow icons, legal line. |
| — | Header, phone bar | #1 | Transparent over the hero, then white with "Book now". Phone bar "From $1,466 pp \| 7 nights · Book now" after the hero. |
| — | Booking | #1 → steps | #1's split screen (media half + steps column, floating labels, Saturday chips, segmented nights, steppers, total card, live engine data, hand-off), now one step per screen. The rooms step uses #2's viewer. |

## What I unified

- **Palette (#1):** ink `#27293E`, secondary `#3F4260`, white ground, light neutral `#EEF2F5` for alternating sections, footer and total card, coral `#D1402A` (hover `#B7331F`) with white text only, WhatsApp green on icons.
  - #3's sand tint, teal script titles and teal icons, and #2's aqua tint, all recoloured to these.
  - Script titles and icons are ink, as in #1.
- **Section rhythm:** white / light neutral alternate down the page (welcome W, levels N, included W, week N, rooms W, feature photo, guests N, waves W, Instagram N, closing W, footer N). No two neutral bands touch.
- **One button system (#1):** book (coral), soft (neutral on white, white on neutral), ink. #3's `btn-white` with a shadow became #1's soft button.
- **One slideshow component:**
  - #1's scroll-snap track with 44 px dots and arrows serves the week slideshow, the quotes, the room galleries (home and booking) and the phone level row.
  - #2's transform slider and its pill-shaped active dot are not used, so all dots look the same.
  - #2's room pills and panel slide-in animation are kept as they were.
- **One header, one footer, one logo** (#1's SVG path, currentColor) on both pages.
- **Fonts:** one Google Fonts request (Give You Glory + Lora 400/500/600 + 500 italic), loaded without blocking the first paint.

## Hero loop

`src/make-hero.sh`. Sources: business-owned `vid-009-source.mp4` and `vid-010-source.mp4`. Cut points were measured with ffmpeg `scdet`.

| Scene | Source | In → out | Length |
|---|---|---|---|
| 1 Pool deck | vid-009 | 5.28 → 8.04 s (vid-009e's pool shot) | 2.76 s |
| 2 Beginner stands up | vid-010 | 28.16 → 29.44 s (the shot in #3's hero) | 1.28 s |
| 3 Guide cheers, arms up, clapping | vid-010 | 29.44 → 31.08 s (the shot in #3's hero) | 1.64 s |
| 4 Surfer on the reef | vid-009 | 40.36 → 45.00 s (vid-009e's reef shot) | 4.64 s |

- **Length:** 10.32 s. Real speed, one direction, hard cuts only, no synthesised or interpolated frames, no audio, faststart.
- **Order:** calm lodge → first stand-up → the guide's cheer → the reef rider, then back to the pool.
- **Badge:** vid-010 has the Global Surf badge top-left.
  - Desktop takes a 1728×972 crop at x = 192, which removes it.
  - The phone crop is central, so the badge never shows.
  - vid-009 has no badge.
- **vid-010 grade:** a mild `eq` lift (contrast 1.06, saturation 1.12) so its flat grade sits closer to vid-009. It is a colour adjustment only.
- **Desktop rendition:** 1728×972, webm **3.41 MB**, mp4 **3.63 MB** (≤ 4 MB).
- **Phone rendition:** 608×1080 (9:16), webm **1.72 MB**, mp4 **1.95 MB** (≤ 2 MB). The crop is set per shot so subjects stay whole: pool x 700, stand-up 656, guide 600. On the reef shot the crop follows the surfer with a slow 150 px pan across its 4.64 s (real frames).
  - Checked at 0.5 / 3.4 / 4.8 / 7.5 / 9.8 s (`shots/round-2/hero/sheet-390.png`, `round-3/hero`).
  - The phone rendition is chosen on portrait screens under 768 px.
- **Posters:** the first frame of each rendition, so the video starts exactly where the poster is: the pool deck under palms.
  - `hero-poster-d.webp` 66 KB / jpg 138 KB.
  - `hero-poster-m.webp` 30 KB / jpg 60 KB.
  - A small phone copy (`hero-poster-m-lq.webp`, 7.8 KB) is inlined as the phone hero background, so the picture is in the first paint on phones. It is phones only: a 512 px desktop copy drawn full-bleed at 1440 failed check-design (hard constraint 7), so it was removed.
- **Reduced motion or Save-Data:** poster only, no video source attached. Measured: 0 video requests on home and booking.

## Booking: one step per screen

- **Steps:** `book/#level` → `#room` → `#dates` → `#total`, each pushed to history.
  - Browser back/forward move between steps. Tested: back from #total lands on #dates, forward returns.
  - `?level=` and `?room=` are kept in sync with `replaceState`, so a reload or a shared link keeps the choices.
- **Home links:** "Choose Level n" opens `book/?level=…#room`, "Choose this room" opens `book/?room=…`, and the other CTAs open `book/`.
- **Progress indicator:** four bars with the copy's `step_pills` (Level | Room | Dates & guests | Total), plus "Step n of 4" (`step_counter`). Done steps are clickable.
- **Step nav:** Back | Total | Next. On desktop it is sticky at the bottom of the steps column; on phones it is a fixed bottom bar.
  - On the total step Next is hidden, so "Continue booking" is the one action.
  - Next on dates without a Saturday or a guest focuses the missing field.
- **Rooms step:** #2's Dorm / Twin / Deluxe double selector.
  - Each room shows its gallery (5–6 photos, dots, arrows), line, description, details and price, and a coral "Choose this room" (a radio styled as a button).
  - Choosing turns the button ink with a tick, marks the pill with a dot, and moves on to Dates.
  - The media half keeps the level clip on this step, so the gallery is not shown twice.
- **Media half (#1):**
  - level → the level's clip, attached after `load`.
  - dates → img-001, total → img-093. Both photographs are loaded only when their step comes up.
- **Engine:** the-sign's logic, unchanged.
  - 0 Bookinglayer requests on load. The live calendar, rooms and quote are fetched only after interaction.
  - The snapshot is the fallback: "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026."
  - Rooms the engine marks not free are dimmed. If the chosen room is not free, the choice moves to a free one.
- **Hand-off (JS on):** `…/en/product/level-2-rollers?start=2027-02-20&couple=1&end=2027-02-27` (start/end/guests, never duration, zero guest types dropped).
- **JS off:** all four steps stack as one working GET form. There is a no-JS check-out select, and three "Continue with Level n" submit buttons (#1's pattern).
  - Tested hand-off: `…/level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1`.
  - The room radios are not submitted, because the engine takes no room parameter (`docs/bookinglayer.md` §3).
- **WhatsApp:** the booking-page button carries the choices in the prefilled text.

## look-log

Every round's sheets are in `shots/`. `shots/sources/` holds the three source mockups' sheets at 1440 and 390 (shot this session). `shots/compare-round-4-desktop.png` puts ours beside them.

- **Round 1** (`round-1/`, `round-1/hero/`)
  - Whole page built from the ported sections.
  - What was wrong: on the phone the reef rider drifted out of the 9:16 crop at the end of the shot, and the board was cut. The phone title sat on white bungalow walls with too light a shade. The feature line on phones hid behind the booking bar.
  - Beside the sources, it already reads as one site: one ink/neutral/coral palette, one pair of faces, one button and dot system.
- **Round 2** (`round-2/hero/`)
  - Phone reef crop now follows the surfer with a 150 px pan: whole in every sampled frame.
  - Stronger title shade and shadow on phones.
- **Round 3** (`round-3/`, `round-3/hero/`, `round-3-book/`, `round-4-book/`)
  - Hero title reduced (Caveat 700, max 74 px): not a giant word.
  - Phone feature line lifted above the bar.
  - Booking built and walked. Its room step showed the same dorm photo twice (media half + gallery), so the media half now keeps the level clip. Progress labels were truncated at 390 ("Dates & gue…") and now fit.
- **Round 4** (`round-4/`, `round-5-book/`)
  - Level posters are lazy `<img>`s, not eager CSS backgrounds.
  - Fonts no longer block paint.
  - Inline small posters.
  - Booking step photographs are deferred.
  - Result: whole page and booking re-shot. Nothing on the calibration list is present:
    - hero: title + one short coral CTA only, centred both ways, no rating, no overlay effects, no title animation;
    - white on coral only;
    - one font pair everywhere, booking included;
    - no rules or underlines, and actions are buttons;
    - dot slideshows;
    - " | " details;
    - forecast two-column with no divider;
    - rooms sold with 5–6 photos;
    - inclusions as an icon list;
    - floating labels;
    - Instagram section;
    - a real footer.
  - Against the old site and the three sources: it keeps the bar's shape (video, centred title, coral button, handwritten titles, distinct sections, Instagram, footer) and reads as one designed site. The recoloured #2/#3 sections sit on the same white/neutral ground as #1's.

- **Round 5 — font change** (`round-6-font/`, `round-6-font/hero/`, `round-6-font-book/`)
  - Shahar (via coordinator): *"I still do not like the font. try google's 'give you glory' instead of caveat. There should be only one more font on the site."*
  - Caveat is replaced by Give You Glory everywhere (hero, all section titles, footer titles, booking step titles and the "What's included" subtitle). The Caveat request is removed; the only other face is Lora.
  - Give You Glory is thin and wide, so it was retuned:
    - weight 400 with `font-synthesis:none`;
    - a hairline `-webkit-text-stroke` in the text colour (.35 px on titles, .3 px footer, .8 px white on the hero) so the strokes hold on white and over video;
    - sections clamp(52px, 5.4vw, 80px) at line-height 1.18 and +.01em tracking, phones 42–50 px;
    - hero clamp(52px, 5.2vw, 76px) on desktop and 41 px on phones, which keeps it to two balanced lines inside the gutters;
    - footer titles 40 px; booking subtitle 40–52 px.
  - Every title was read at 390 and 1440 (home sheets, hero sheets at five loop times, booking steps). All read clearly.
  - The face's own letterforms (its "r" is a small capital R) stay as designed.
  - Because the face is wide, two split-column titles wrap: "Next set / is yours" on desktop, and "Surf, breakfast, / surf again" in three lines in the 470 px week column. Both are balanced, and nothing overflows.

Known compromise, first screen: with the title centred both ways, the stand-up, the guide and the reef rider pass behind the title in their shots. That is also true of the source heroes. #1's radial shade behind the words keeps it legible on every sampled frame.

## Checks (once, at the end)

- **`check-design`** (re-run after the font change):
  - Home: **ok**, 0 problems (h1/h2 Give You Glory, body Lora, ground white, 0 all-caps labels). The first re-run failed on the inlined 512 px desktop poster (constraint 7), which is now phones only.
  - Booking: **ok** through a temporary root-level copy with `../` rewritten. It was deleted afterwards, as for postcard, because the tool serves the page's own folder.
- **`funnel`** (`funnel/funnel.json`, over http): clicks_to_book 1, CTA above the fold, 8 pages, 0 broken. It reports the primary action as whatsapp, the same tool gap as the sources: it does not classify the GET form to the engine.
- **Tap targets** (`src/checks.mjs`, `shots/checks.json`): 0 visible targets under 44 px on home and on each booking step, at 390 and 1440.
- **Reduced motion:** 0 video requests on home (after scrolling) and on booking. Poster only.
- **Poster paint** (throttled phone: 150 ms RTT, 1.6 Mb/s, CPU ×4, gzip as the host would serve):
  - Phone: FCP **0.30 s** with the inline poster in the first paint. The full poster arrives by 0.66 s.
  - Desktop: FCP 0.26 s (title and button on the #CDE4EE ground). The full 66 KB poster arrives by 2.0 s at that throttle. Desktop is not the slow-phone case.
- **Booking walk** (`round-5-book/walk.json`): 0 engine calls on load, snapshot total $3,092.05 (L2, couple, twin, 20 Feb 2027), back/forward correct, hand-offs as above, no console errors apart from the requests the test aborted on purpose.

## Weights

| | |
|---|---|
| Home HTML (CSS + JS inline, two small posters inlined) | 98 KB, **40 KB gzip** |
| Booking HTML | 79 KB, **21 KB gzip** |
| Home first load, phone, no scroll, video excluded (gzip) | **374 KB** (after the font change), including the poster, the lazy images the browser pulls within its look-ahead margin, and the Google fonts |
| Home first load, desktop | 432 KB (poster 66 KB) |
| Hero video after first paint | phone webm 1.72 MB / mp4 1.95 MB · desktop webm 3.41 MB / mp4 3.63 MB |
| Level clips (on hover/in view, one at a time) | 0.9–1.9 MB each (the-sign's p45 cuts) |
| Booking first load, phone, video excluded | ~145 KB + fonts |
| `dist/` on disk | 26 MB (20 MB video renditions never loaded together) |

## images

All are `business-owned` (dossier). No stock, so `check-places` has nothing to check.

- **Hero:** vid-009 + vid-010 sources (new loop, above).
- **Level clips / booking level picks:** vid-010-p45, vid-003e-p45, vid-002e-p45 (the-sign's cuts, copied).
- **Welcome:** img-118, img-024 (postcard 4:5 crops).
- **Included:** img-115.
- **Week:** img-104 (postcard's badge-free re-crop), 011, 023, 114, 060.
- **Rooms (home + booking, try-your-week renditions):**
  - dorm img-063, 095, 042, 050, 064;
  - twin img-080, 084, 083, 069, 079;
  - deluxe img-081, 082, 041, 043, 044, 071;
  - img-078 is dropped as the same frame as img-063.
- **Feature:** img-005.
- **Instagram:** img-001, 024, 060, 099, 114, 010, 073, 012 (try-your-week's tiles, lodge photographs, not posts).
- **Closing:** img-111.
- **Booking media:** img-001 (dates), img-093 (total).
- **Alt text:** `dossier.images[].description` where it exists, otherwise postcard's written alts.

## gaps (unchanged from the sources)

- Instagram posts were not harvested, so the tiles are the lodge's own photographs linking to the profile.
- Room ↔ photo mapping is an owner confirmation (`docs/bookinglayer.md` §4).
- Snapshot prices exist for 7 nights only. For 14/21/28 nights the total reads "Shown on the booking page" until the live quote returns.
- The Saturday list is the doc's snapshot (Level 1, 1 woman). The live calendar replaces it per level and guest mix.
- No season, no reply-time promise.
- The phone number is the HQ line.
- The Rosa headline's inlined values are postcard's 28 Sep reading. They show only when the live JSON confirms fresh data (≤ 24 h); otherwise the plain link shows.

## Template labels not in `copy/en.json`

- **Nav:** "Levels", "Rooms", "The lodge", "Contact".
- **Footer titles:** "Talk to us", "Follow". Also "Terms and conditions".
- **Accessibility and control labels:** "Skip to content", "Menu", "Previous/Next photo", "Show n of N", "Instagram photos n of N".
- **Room pill short names:** "Dorm", "Twin", "Deluxe double" (#2's).
- **Booking:**
  - "Back" (step nav);
  - "Booking steps";
  - "Check-out" / "Choose your check-out" (no-JS select, #1's);
  - "Continue with Level n" (no-JS, #1's);
  - "Total for n guest(s)";
  - "Shown on the booking page", "Not free on these dates" (engine states, #1's).
- **Freestylers WhatsApp prefill:** postcard's text.
- **Rosa labels:** "Wave height, …", "Swell from the …", "Wind, …", "See today's forecast for South Point on Rosa".

## conflicts / what I had to change

1. **Hero CTA:** #1's page read "Book your week" (`ctas.hero_c3`). Shahar's brief and the gold notes say "Book package now", so it is `ctas.hero_c1` (approved copy).
2. **Script face in the hero:** #1's hero title was its script face. It is now Give You Glory, like every handwritten title.
3. **Feature line:** #3 sets it in Lora italic, not script, and I kept it that way (it is a line, not a title). Switching it to Give You Glory is one CSS rule.
4. **Rooms step media:** #1's desktop media half followed the chosen room's photo. With #2's gallery on the same screen that showed the same photo twice, so the room step keeps the level clip. The alternative would be to drop the gallery from the step, which contradicts the brief.
5. **The first screen crosses subjects** (see look-log). The alternative is moving the title off-centre, which Shahar's rule forbids.
6. **Fonts** still load from Google Fonts: allowed at this station, self-hosted at 4g.
7. **The phone crop pans** on the reef shot (a moving crop over real frames). If Shahar reads that as an effect, a fixed crop at x 640 keeps the rider whole in most frames but trims the board late in the shot.
