# Coconut Surf Inn: interactive mockup, "Under the thatch" (concept 2)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.

- Page: `dist/index.html`, one file. CSS and JS are inlined from `src/page.css` / `src/page.js` by `src/build.py`.
- Words come from `copy/en.json` via `src/coconut_data.py`, which also asserts the booking URL and phone against `dossier.json`.
- The forecast headline comes from `src/rosa-weligama-west.json`: one real, unedited Rosa response for `weligama-west`, fetched 2026-11-05.
- Media: `src/make-media.sh` (`# media: …/interactive/dist/img/**`). The depth map is drawn from shapes by `src/paint-depth.py`, which make-media.sh calls.
- Fonts: Google Fonts at 4e (Nunito Sans 400/700, Merienda 700). Round 2 replaced Shadows Into Light Two.
- Rebuild: `bash src/make-media.sh && python3 src/build.py`.

## look-log

Every shot was taken with `tools/shoot.mjs` over http (`http://localhost:8922/?depth=force`). The shader reads the photo as a same-origin texture, so on `file://` it keeps the still.

**The bar.** There is no website, so I compared against:
- the Booking.com and Google folds (`dossier/…/funnel/walk/05-booking-com-fold.png`, `01-google-listing-fold.png`);
- gold Global Surf `try-your-week`, via `gold/global-surf-notes.md`: own footage, one centred title, one CTA, every section designed as a moment.

**Process note.** The page skeleton was assembled before round 1, as on Lotus. Rounds 1–4 shot and changed the first screen only (`--max 2`).

**Round 1, first screen.** img-102 full-bleed, with the title, the town line and the saffron button centred over it.
- The shader works. With the pointer at the left edge and then the right, the pillar and the swing frame shift against the palms and the horizon, with no tearing on the thatch fringe (the fringe's depth tapers to its tips).
- With the eye at rest, the canvas matches the still `<img>`: desktop PSNR 39.8 dB, and the amplified difference image is blank. So the fade-in does not jump.
- What was wrong:
  - the title sat on pale sky haze, at only 1.9–2.5:1 against white;
  - the town line orphaned "Weligama" on the phone.
- Change: a soft radial shade behind the three lines, and `text-wrap: balance`.
- Even at round 1 it is clearly better than the Booking.com fold (an entrance hall in a 1/45 carousel and a yellow search bar): you are standing under the thatch looking at the sea.

**Round 2, first screen.** The stronger shade read as grey smog over the sky above the title, on both widths. The cure looked worse than the problem.
- Change: the text block moves down so it sits on the parapet and the sea (desktop +14 vh, phone +22 vh). The shade gets flatter and wider.

**Round 3, first screen.** The phone is right now. The sky, the palms and the fringe are clean, the title sits on the dark parapet, and the button fills the empty floor. Desktop still showed a haze above the title.
- Change: desktop text +20 vh, and the shade's centre moved down, with less reach upwards.

**Round 4, first screen.** Clean. Header over the dark thatch (no scrim needed), one script title, one line, one button, and the photograph untouched above the horizon.
- Measured white-on-photo contrast, with the text hidden and the background read under each line's box:
  - title p90 3.5 / p98 3.0 on desktop, p90 3.4 on the phone (large text needs 3:1);
  - town line p98 ≥ 4.0.
- Against gold: Global Surf has its own footage, and this house has none. This first screen gives it the same thing, a place you stand in that moves when you do, made from its own 1920 px photograph. It clearly beats every listing fold.
- **Deviation, recorded:** the text block sits about 60 % down the screen, not at dead centre, so the sky stays clean.

**Round 5, whole page.** What the sheets showed:
- On the phone, "See rooms and live dates on Booking.com" (nowrap) pushed past 390 px.
- On the phone, the 2×2 fact cards were cramped into four-line stacks.
- On both widths, every room slideshow had a grey void under its photo. `content-visibility:auto` with a 600 px intrinsic size had been set on the slides.
- The closing line orphaned "us."

Changes:
- buttons wrap and go full width on the phone;
- facts become one column on the phone;
- `content-visibility` removed;
- `text-wrap: balance` on every script title;
- tighter section padding on the phone.

**Round 6, whole page.**
- The phone bar label was truncated ("Booking.c…"): its icon is dropped and the label set at 14.5 px, so it now fits.
- Review cards no longer stretch to the tallest one.
- check-design failed `r219-img-099-1280` (drawn 1200 px from a density-corrected 1199 px source). Its `sizes` now always picks the 1920 file on desktop.
- audit-mockup: the first load was **1.54 MB**. Chrome's lazy-load distance pulled in every hidden room's slides. Now:
  - hidden slides are deferred: page.js writes their `<img>` when their room or slideshow is shown, and a `<noscript>` copy keeps them with JS off;
  - room slides get a 720/1200 srcset.
  - Result: **365 KB**.

**Round 7, whole page (final sheets in `shots/`).** No overflow at 390 / 768 / 1440: scrollWidth equals the viewport, and the only element past the edge is the hero `<img>` inside `overflow:hidden`, scaled 1.015 to match the shader's overscan. Each section is its own moment:
- the moving terrace;
- 13:00, check-in: four fact cards with dated ratings;
- "How do you like to sleep?": three tiles, then a list + stage room viewer. Its height is fixed (854 px at 1440 for every group), so nothing jumps.
- inside the house: the light-well, then a draggable veranda row;
- the afternoon on the roof: the photo, then Erin's words beside a dot slideshow;
- the full-bleed sunset band, then the green and the turtle print;
- until 22:00: the purple benches, Janno's breakfast quote, the house lit at night, the Eranga family;
- from 7:30, the break: spot + season, the Rosa headline, and Rosa's live widget (it loaded in the shoot);
- 11:00, check-out: three rolling ratings and 12 dated reviews;
- getting here, the closing line and the footer.

States checked in Playwright, with no page errors:
- the fan tile filters the list to the two budget rooms and loads their photos;
- "Three or four of us" opens Deluxe 2A+1C with its 4 photos;
- the viewer height is the same for all three groups (854 px);
- on the phone, the bar's ˄ opens the audit-ordered summary;
- with JS off, the tiles are anchor links (shown neutral), the rooms stack under "Rooms with air conditioning and hot water" / "Fan rooms: no air conditioning and no hot water" with all their photos (45 images visible), and the bar is static at the foot.

**Skill notes** (tools.md: notes, never gates). The inspector (`design-taste-frontend/scripts/inspect.mjs`) returned 10 FAIL / 9 WARN:
- `headline-lines` misreads the hidden 0–9 columns of the rolling digits. The closing statement is the copy's `closing` in the script, 3 lines on desktop.
- `eyebrow` is the concept's clock tags ("The afternoon", "Sunset", "Until 22:00"). They are the archetype's device (a stay told by the clock), set as small purple text with an icon, not tracked caps.
- `shadow`, `text-shadow` and `button-fx` are the legibility shade on the photograph (playbook §1a's scrim) and the requested 2 px lifts. The "gradient" is the nav link underline.
- `icon-cards`: the 4-up fact row and the three sleep tiles are the concept's specified devices (§4.2).
- `edge-text` is the peek of the review row and the room chips.
- `covered-text` at 390: "11:00, check-out" passes under the fixed phone bar at one scroll stop. That is any fixed bar mid-scroll, not a resting overlap.
- `no-footage`: there is no usable video.
- `still-page`: headless software GL trips the weak-device fallback (see conflicts 1).
- `empty-middle` is the sleep head's 6/6 split and the rating figures.

Curves were set by `/animate` principles:
- presses scale to 0.97 in 80–160 ms with a strong ease-out;
- the tile fill is 180 ms;
- the stage cross-fades with an 8 px rise over 220 ms;
- the pick pill takes 260 ms `(.23,1,.32,1)`;
- the bar uses the drawer curve `(.32,.72,0,1)` over 300 ms;
- the shader eye is critically damped with τ 140 ms, plus one ±4 px drift over 6 s.

**Round 2 (4f loop-back, 2026-11-05).** Scores to beat: visual 6, experience 7, critic 64.4/80. Shots over http with `?depth=force`; the comparison bar is unchanged (Booking.com / Google folds, gold `try-your-week`).

- **R2-1, first screen.**
  - The sheet showed the phone frame as about 40 % grey floor. The title face looked like a marker note.
  - Changes:
    - the phone crop is now 600×1120 of img-102 (thatch, sea, parapet), not 1152×1440;
    - the title face is Merienda 700 (a weighted, sign-painted hand, compared against Kalam, Courgette, Kaushan, Oleo Script, Norican, Sriracha and Grand Hotel on a test sheet), with the wordmark in the same face at 20–22 px;
    - the hero line is now "A guesthouse in Gurubebila, between Midigama and Weligama" (a fragment of `tagline`), so the type is on the first phone screen;
    - the idle depth drift runs continuously.
  - Better than the Booking.com fold at a glance: yes. The phone now opens on thatch, sea and parapet, and a still visit can see the depth.
- **R2-2, first screen.**
  - The phone title crossed the horizon line.
  - Changes: the text block moved to 54 svh (it sits on the parapet), and desktop moved to 26 vh.
  - Drift test, no pointer, two frames 3 s apart: PSNR 18.0 dB at 390 and 17.1 dB at 1440. That is about as large a change as the old full pointer sweep (16.7). No tearing at the fringe or the pillar (scratch frames).
- **R2-3, first screen + check-in.** The ratings were ordered above the "13:00" title on the phone. They now follow the buttons, and their labels are balanced. The phone call icon in the header stays hidden while the hero is in view. Clean.
- **R2-4, whole page.**
  - The 4-up icon cards are gone. "13:00, check-in" is now the tagline, one " | " details line, the booking pair, and the two ratings set large (76 px), each a whole link of 64 px or more: "Booking.com, 142 reviews, 4 Nov 2026".
  - The rooms are a row of picks over one stage: the photo is 9fr (about 880 px at 1440), with the text beside it. On the phone the stage runs edge to edge, the tiles are compact, and the chips and note are tighter. The rooms take about 1.5 phone screens, down from about 3.
  - Each A/C room leads with its brightest wide frame.
  - The grey cards are gone behind the forecast headline and the reviews. The reviews sit on white under a saffron quote mark.
  - Erin's and Janno's quotes now appear only in their own blocks.
  - "11:00, check-out" is now one line of three dated rating links.
  - The closing is in the text face at 26 px.
- **R2-5, whole page (final sheets in `shots/`).** No overflow at 390 or 1440, and Rosa's widget loads on the shot.
  - Inspector (notes, not gates) gave 9 FAIL / 7 WARN. What I fixed:
    - resting shadows removed from the buttons, tiles and print (call buttons are now a tint fill);
    - phone hero line at 18 px.
  - What stays, with the reason:
    - `headline-lines` misreads the rolling digit columns;
    - `eyebrow` is the concept's clock tags;
    - `text-shadow` is the hero scrim (playbook §1a);
    - `icon-cards` is the three sleep tiles, the concept's booking device;
    - `covered-text` is the fixed phone bar mid-scroll;
    - `side-scroll` is the veranda and review drag rows;
    - `no-footage`: there is no usable video;
    - `still-page`: the headless GL.
  - With JS off, the slideshow dots were drawn (`[hidden]` was overridden) and did nothing. Fixed with `.ctrl[hidden]{display:none}`.

**Round 3 (4f loop-back, last allowed round, 2026-11-05).** Scores to beat: visual 7 (bar 8), experience 8, critic 76.5/80. Shots over http with `?depth=force`; the comparison bar is unchanged (Booking.com / Google folds, gold `try-your-week`). Kept as they passed: Merienda, the continuous drift, the 600×1120 phone crop, no icon-card fact row, Booking.com as the primary and hero action, the Rosa probe-then-frame fallback.

- **R3-1, first screen.**
  - Desktop crop moved from y 120 to y 40 of img-102 (the depth map moved with it, 480:270:0:10), so about 80 px less concrete floor shows; the text block moved down to sit on the horizon and parapet (margin 36 vh). The phone crop is unchanged.
  - The header wordmark is hidden while the hero is in view (`.top:not(.stuck) .mark`) and fades in once the hero has gone: one name on the first screen.
  - A labelled **Call** sits in the hero after "Check dates on Booking.com" in DOM order, as a translucent white button with no colour of its own (secondary). On the phone it wraps under the booking button.
  - Cold load: a 40 px (desktop) / 24 px (phone) blurred copy of the same crop is inlined as the hero `<img>`'s background and dropped (`.loaded`) once the photograph is in. With the hero photo requests aborted, both widths paint the blurred terrace with the title and both buttons, not a grey box with a smudge (scratch `ph-390/1440.png`). The hero section's own colour stays light (`#c9d2d6`), because check-design read a darker one as a dark ground.
  - Still clearly better than the Booking.com fold at a glance.
- **R3-2, whole page.**
  - **Rows past the edge (fix 1).** The verandas are now a flush 4-up inside the grid (2×2 on the phone). The reviews are a paged carousel inside the grid: 3 up at 1440, 2 at 768, 1 on the phone, with 48 px round arrows (disabled at the ends) and one 44 px dot per page (4 pages at 1440). On the phone, where 10 pages of dots would not fit at 44 px, a "2 of 10" counter sits between the arrows. Arrow keys work on the focused track. With JS off the reviews are a plain grid of all ten and no controls show. Tested: Next moves one page, the dot and counter follow, and Previous is disabled on page 1.
  - **Flat buttons (fix 2).** No box-shadow on any button, at rest or on hover. Hover is a 2 px lift and a colour step. The nav underline is now a drawn `::after` bar, not a `linear-gradient` background (the inspector's `button-fx` read the nav links as gradient-filled buttons). The slideshow arrows and the room pick pill lost their shadows. Inspector: `shadow` and `button-fx` are gone.
  - **Empty grey (fix 3).** "How do you like to sleep?" is on the white ground: one-column head, tint only on the tiles and the pick pill, the room stage borderless (photo 9fr rounded, text beside it, the button right under the note). "11:00, check-out" now sets the three ratings large (8.5/10, 4.8/5, 4.44/5, with count and date, each a link) and then the carousel; the grey line of three small links is gone.
  - **Restaurant (fix 4).** img-106 is one 4:5 photo at 440 px beside the text, then img-099 (the house at night) is one full-bleed 21:9 band, and the family text follows on white. The two rounded tiles of the block are now one smaller photo and one big band.
  - **Type (fix 5).** The details line is 16 px in full ink (`#302618`). Sizes in use at 1440 are **14 / 16 / 17 / 20 / 26 / 44 / 60 / 76** (8, measured in the browser and by the inspector; was 17). At 768 and 390 there are also 8 each (32 / 38 / 54 are the phone steps of 44 / 60 / 76). The phone bar label is 16 px and fits.
  - **Rooms label (fix 9).** `div.picks` has `role="group"` with `aria-label="Rooms"`.
- **R3-3, final sheets (`shots/`).** No overflow at 390, 768 or 1440 (scrollWidth = viewport). The veranda grid ends at the grid edge, and the review track is clipped inside the grid with its controls under it. Nothing reads as cut off.
  - Inspector (notes, not gates): 4 FAIL / 4 WARN (was 9 / 6). `headline-lines`, `shadow`, `button-fx`, `size-count`, `edge-text` and `still-page` are gone. What stays, with the reason:
    - `eyebrow` is the concept's clock tags;
    - `text-shadow` is the hero scrim (playbook §1a);
    - `icon-cards` is the three sleep tiles (the concept's booking device; now tint fills on white, no shadow);
    - `covered-text` is the fixed phone bar mid-scroll;
    - `side-scroll` counts the slideshow tracks, the pick rail and the review track, which all have dots, arrows or a counter;
    - `empty-middle` measures the off-screen slides of those tracks (the gap it reports, 2695 px, is wider than the page);
    - `no-footage`: there is no usable video;
    - `name-only-title` at 390: the town line sits right under the title.

## images

All photographs are Booking.com property uploads, `business-owned` (asserted in `coconut_data.py` for every room gallery). No upscaling. Every full-bleed image is drawn from a 1920 px source. Alt texts were written from each photograph.

| use | asset | crop |
|---|---|---|
| first screen + shader texture | img-102 | desktop 16:9 (1920×1080, y 40 since round 3; was y 120); 40 px and 24 px blurred placeholders of the same two crops, inlined (round 3); phone (round 2) 600×1120 at x 152, y 0, so the floor below y 1120 is out; object-position 30 % |
| depth map | drawn from shapes (`paint-depth.py`), not from pixels | the same two crops, at a quarter of the size |
| rooms, 4:3 | Deluxe Balcony 076 073 079 068 077 074 · Superior 030 035 037 034 017 064 · Deluxe 2A+1C 036 040 038 053 · Family 045 031 022 027 · Budget Double 048 047 046 049 · Budget Single 056 057 059 061 | 4:3, the brightest wide frame first, bathroom last (round 2) |
| inside the house | img-007 (3:2); verandas 024 020 005 016 (4:5, a flush 4-up since round 3); 030 and 017 now sit only in the Superior gallery | |
| on the roof | img-104 (16:9); slideshow 100 101 015 (3:2) | |
| sunset | img-008 band (16:9 desktop, 4:5 phone); img-095 (3:2 print) | |
| restaurant | img-106 (4:5, 440 px beside the text); img-099 (21:9, full-bleed band since round 3) | |

img-089 has no `room_types` on Booking.com. Round 2 dropped it (critic 4f dim 1); every gallery photo is now asserted against its room's `room_types`.

## gaps

- **No video.** None is usable (concepts §2), so the hero main item is the WebGL depth parallax on the business's own photograph.
- **No price.** Every booking action goes to the Booking.com listing. The copy's `closing` says so.
- **No WhatsApp, no email.** `tel:+94778921396` is the only direct channel.
- **No Instagram.** The section is omitted, not faked.
- **No photos of surfing, the hosts or food.** The guests' words carry those.
- **Schema gaps (concepts §6), hard-wired in the mockup:**
  - room galleries;
  - the fan / A/C grouping, read from each room's `note`;
  - the "Fan / A/C / Hot water / Balcony" chips;
  - the restaurant hours as data;
  - the short hero line ("Gurubebila, between Midigama and Weligama", the tagline's own words).
- **Rosa.** The headline is inlined from the fixture (`generated_at` 2026-11-04T20:26Z, for Thu 5 Nov 02:30). At 4g it is fetched live, under the 24-hour rule.

## conflicts

None blocking.

0. **Round 3: a stray check-design run.** I ran `node tools/check-design.mjs --help` to read its usage. It ignored the flag and began the all-slug run, and I stopped it after its first page. It had already re-made `sites/cheeky-monkey/mockups/calm/shots/check-design/` (scratch, gitignored, re-made by that mockup's own check). After that I ran it on this page's exact path only. `tools/funnel.mjs` wrote `funnel/` at the repo root. I kept a copy of its `funnel.json` in my scratchpad and removed the folder. A `.taste-skill/` appeared at the repo root at 11:04, made by another session's inspector run (my own inspector runs each deleted theirs right after). It is deleted at hand-off.

0b. **Round 2: the run's other agents.** In round 2 I first ran `check-design` for the whole slug, by mistake. It rewrote the scratch `shots/check-design/` folders of calm and unique as well (gitignored, re-made by their own check-design run). After that I ran it on this page only. I deleted the `.taste-skill/` my inspector run made. The one at the repo root now (02:04) was made by unique's run, not by mine.

1. **The depth shader turns itself off on a slow GPU.** Round 2: the idle drift runs only while the hero is in view and the tab is visible; it never starts under reduced motion or Save-Data. If more than 12 of the first 30 frames take over 24 ms, the canvas stays hidden and the still photograph remains (the concept's weak-device rule). Headless Chromium with software GL can trip this. To see the effect headless, open `dist/index.html?depth=force` over http (every shot in this log used it). Reduced motion and Save-Data never start it: audit `reduced_motion` shows 1 canvas, hidden, photograph visible.
2. **Hero text below centre** (about 58–62 % of the screen height), against the calibration's "centred vertically". Centred, the title sat on pale sky and needed a shade that greyed the sky (round 2). Lower, it sits on the parapet, and the photograph above the horizon stays untouched. The alternative costs a visibly smudged sky.
3. **custom.md asks for booking that lets you "pick dates, then hand off".** The concept's pattern stops at the room: tile → room → "Check dates on Booking.com", 1 tap from the hero. Booking.com cannot preselect a room from a URL, and the URL is copied from the dossier unchanged, so there is no date picker. A dates step with `checkin` / `checkout` parameters would change the dossier URL. That is a decision for the human, not for 4e.

4. **Round 3: the night band.** img-099 is the house at night, a 1920 px phone photograph. Drawn full-bleed at 21:9, it shows some low-light grain at 1440. It passes check-design's pixel rule and is the strongest picture of the restaurant, so it stays as the block's one big image. If the visual critic reads the grain as a flaw, the alternative is img-106 large and img-099 in the 440 px slot. Not blocking.
5. **Round 3 is the last allowed round.** If either visual critic still scores this page below 8 after this round, that is a blocking conflict for the human before the pick (base.md, "A mockup below 8 is not finished because the rounds ran out"). Most of what held the score down was the page, not the material: rows, buttons, grey, type. The material limit that stays is that there is no video and there are no photos of surfing, the hosts or food.

## other businesses in this run

- **Cheeky Monkey** opens on a street through board noses, a moving reel triptych, or a board-shaped window. Its colour is loud surf, its lettering painted-sign, and you walk along a shop.
- **Lotus** opens on a shady garden whose sunlight moves (its interactive), behind a carved gate, with table-blue or red-oxide buttons. You climb the house floor by floor.
- **This page** opens under a thatched roof looking out to sea, and the room itself has depth when you move. Its colours are saffron and aubergine from the restaurant's cushions. It is ordered by the clock (13:00 → 11:00), and booking starts from "How do you like to sleep?" (fan or A/C). It is the only page in the run that carries its own break's live forecast.
- **Sibling variants for this business**, from concepts.md:
  - calm: the view from the roof (img-009), banana-leaf green;
  - unique: img-009 dissolving into white, with the sign's vermilion and a sticky split.
  - Neither shares this first screen, type pair or accent.

## hand-off checks (4e), round 3

Each item on the 4f round-2 fix lists is checked off above (R3-1, R3-2).

1. **Look loop: pass.** Round 3 had two first-screen shoots and two whole-page shoots, written up above. Every `dist/img` file is made by `src/make-media.sh` (re-run; it adds `hero-wide-lq` and `hero-tall-lq`).
2. **Booking CTA: pass.** Every booking href equals `dossier.booking.engine_url` (asserted at build), and every `tel:` is `tel:+94778921396`. The audit tap-through landed on the Booking.com listing.
   - `node tools/funnel.mjs http://localhost:8922/ --depth 3`: **primary `engine` "Check dates on Booking.com", hero `engine` "Check dates on Booking.com" (0 taps to flow), clicks_to_book 1, CTA above the fold, 0 broken**. The hero Call (`tel`) did not take over.
3. **`check-design` (this page's exact path): pass.** 0 problems and 0 warnings. Merienda / Nunito Sans, white ground.
4. **`check-places`: pass.** 0 borrowed images.
5. **Reduced motion, JS off and early scroll: pass.**
   - Reduced motion: the canvas is never live and the photograph shows.
   - JS off at 390 and 1440: no overflow, the reviews are a grid of all ten with no controls, the wordmark is visible, and every link works.
   - `scroll.early.cls` 0.0001, `scroll.settled.cls` 0.
6. **Other businesses: pass.** Unchanged from round 1.
7. **Video and media: pass.** No usable video. img-102 at 1920 px with the depth parallax and the idle drift, unchanged.

**Accessibility (scratch axe-core, WCAG 2.0/2.1 A+AA, after a full scroll, Rosa blocked):**
- 0 violations at 1440, 768 and 390. The only "needs review" item is `color-contrast` over the photographs. The old `aria-prohibited-attr` on `.picks` is gone.
- 0 links or buttons under 44 px at any of the three widths: the review arrows are 48 px, the dots 44 px.
- With Rosa blocked: no iframe is inserted, `elementFromPoint` hits the plain link, and a tap requests `https://rosa.surf/spot/weligama-west`.

**audit-mockup (phone, slow 4G, 4× CPU), round 3:**
- first load **669 KB** in 12 requests: images 482 KB, fonts 68 KB, HTML 134 KB (the two placeholders add about 0.5 KB);
- largest image 152 KB (the lazy-distance veranda photo, not the hero);
- **LCP 564 ms**, CLS 0.0002;
- third-party on load: Google Fonts only (allowed at 4e).

## hand-off checks (4e), round 2

1. **Look loop: pass.** Round 1 had seven rounds; round 2 adds five (three on the first screen, two on the whole page). Every `dist/img` file is made by `src/make-media.sh`, re-run this round.
2. **Booking CTA: pass.** Every booking href equals `dossier.booking.engine_url` (asserted at build). The audit tap-through landed on `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html`.
   - `tools/funnel.mjs --depth 3`: **primary `engine` ("Check dates on Booking.com"), hero `engine`**, clicks_to_book 1. In round 1 both were `tel`.
3. **`check-design` (this page): pass,** 0 problems and 0 warnings. Fonts Merienda / Nunito Sans, white ground.
4. **`check-places`: pass.** 0 borrowed images.
5. **Reduced motion, no WebGL and early scroll: pass.**
   - Reduced motion keeps 1 canvas, hidden, with the photograph visible.
   - `scroll.early.cls` 0.0003, `scroll.settled.cls` 0.
   - With JS off: 390 px wide, the rooms stacked in their two groups, no dots.
6. **Other businesses: pass.** Unchanged from round 1. Merienda is used by no other site in the run (Cheeky Monkey: Permanent Marker / Knewave / Yellowtail; Lotus: Parisienne / Patrick Hand / Allura; calm: Satisfy; unique: Caveat).
7. **Video and media: pass.** No usable video. img-102 at 1920 px with the depth parallax, which now moves at rest.

**Accessibility (scratch axe-core 4.x run, WCAG 2.0/2.1 A+AA, after a full scroll):**
- 0 violations at 390 and at 1440, 30 rule sets passing. The ratings are `role="img"` with "8.5 out of 10" / "4.8 out of 5".
- 0 links or buttons under 44 px at either width: slide dots 44×44, rating links ≥ 44 px tall, nav, wordmark, Rosa credit and footer buttons all at 44.
- Rosa blocked: the plain link "See today's forecast for Coconuts on Rosa" is visible and on top (`elementFromPoint` hits it). The frame is added only after a no-cors probe to Rosa succeeds.

**audit-mockup (phone, slow 4G, 4× CPU), round 2:**
- first load **663 KB**: images 482 KB, fonts 68 KB;
- largest image 152 KB: the veranda print `r45-img-016-720`, pulled in by Chrome's lazy distance, not the hero;
- phone hero 52 KB;
- **LCP 496 ms**, CLS 0.0005;
- every playbook §4 line is still met.

## hand-off checks (4e), round 1

1. **Look loop: pass.** Four first-screen rounds, three whole-page and state rounds, all written up. Every `dist/img` file comes from `src/make-media.sh`. Every flaw named above was fixed, or is listed under conflicts.
2. **Booking CTA: pass.** Every booking href equals `dossier.booking.engine_url` character for character (asserted at build). The audit tap-through landed on `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html`. The phone is `tel:+94778921396`, matching the dossier.
3. **`check-design`: pass.** ok, 0 problems, 0 warnings.
4. **`check-places`: pass.** 0 borrowed images.
5. **Reduced motion, no WebGL and early scroll: pass.** Reduced motion, no WebGL and `file://` all keep the photograph. `scroll.early.cls` 0.0018, `scroll.settled.cls` 0.
6. **Other businesses: pass.** Compared above.
7. **Video and media: pass.** There is no usable video. The first screen is img-102 at 1920 px with the WebGL depth parallax as its main item, and it beats the listing folds (round 4).

audit-mockup (phone, slow 4G, 4× CPU):
- first load **365 KB**: images 180 KB (hero 102 KB), fonts 65 KB, HTML with inline CSS/JS 129 KB uncompressed;
- third-party hosts on load: Google Fonts only (allowed at 4e);
- largest image 102 KB;
- **LCP 520 ms**, CLS 0.0018;
- Rosa's JSON is not fetched (the fixture is inlined), and the widget iframe loads only near its block.
