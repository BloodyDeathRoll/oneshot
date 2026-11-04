# Coconut Surf Inn: interactive mockup, "Under the thatch" (concept 2)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.

- Page: `dist/index.html`, one file. CSS and JS are inlined from `src/page.css` / `src/page.js` by `src/build.py`.
- Words come from `copy/en.json` via `src/coconut_data.py`, which also asserts the booking URL and phone against `dossier.json`.
- The forecast headline comes from `src/rosa-weligama-west.json`: one real, unedited Rosa response for `weligama-west`, fetched 2026-11-05.
- Media: `src/make-media.sh` (`# media: …/interactive/dist/img/**`). The depth map is drawn from shapes by `src/paint-depth.py`, which make-media.sh calls.
- Fonts: Google Fonts at 4e (Nunito Sans 400/700, Shadows Into Light Two).
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

## images

All photographs are Booking.com property uploads, `business-owned` (asserted in `coconut_data.py` for every room gallery). No upscaling. Every full-bleed image is drawn from a 1920 px source. Alt texts were written from each photograph.

| use | asset | crop |
|---|---|---|
| first screen + shader texture | img-102 | desktop 16:9 (1920×1080, y 120); phone 4:5 (1152×1440, x 40), object-position 22 % |
| depth map | drawn from shapes (`paint-depth.py`), not from pixels | the same two crops, at a quarter of the size |
| rooms, 4:3 | Deluxe Balcony 076 073 079 068 077 074 · Superior 035 034 037 030 017 064 · Deluxe 2A+1C 040 036 038 053 · Family 031 045 022 027 089 · Budget Double 047 046 048 049 · Budget Single 056 057 059 061 | 4:3, bathroom last |
| inside the house | img-007 (3:2); verandas 030 017 024 020 005 016 (4:5) | |
| on the roof | img-104 (16:9); slideshow 100 101 015 (3:2) | |
| sunset | img-008 band (16:9 desktop, 4:5 phone); img-095 (3:2 print) | |
| restaurant | img-106 (4:5); img-099 (21:9) | |

img-089 has no `room_types` on Booking.com. It is shown as the family room's bathroom, following concepts §4.1 (gallery list).

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

1. **The depth shader turns itself off on a slow GPU.** If more than 12 of the first 30 frames take over 24 ms, the canvas stays hidden and the still photograph remains (the concept's weak-device rule). Headless Chromium with software GL can trip this. To see the effect headless, open `dist/index.html?depth=force` over http (every shot in this log used it). Reduced motion and Save-Data never start it: audit `reduced_motion` shows 1 canvas, hidden, photograph visible.
2. **Hero text below centre** (about 58–62 % of the screen height), against the calibration's "centred vertically". Centred, the title sat on pale sky and needed a shade that greyed the sky (round 2). Lower, it sits on the parapet, and the photograph above the horizon stays untouched. The alternative costs a visibly smudged sky.
3. **custom.md asks for booking that lets you "pick dates, then hand off".** The concept's pattern stops at the room: tile → room → "Check dates on Booking.com", 1 tap from the hero. Booking.com cannot preselect a room from a URL, and the URL is copied from the dossier unchanged, so there is no date picker. A dates step with `checkin` / `checkout` parameters would change the dossier URL. That is a decision for the human, not for 4e.

## other businesses in this run

- **Cheeky Monkey** opens on a street through board noses, a moving reel triptych, or a board-shaped window. Its colour is loud surf, its lettering painted-sign, and you walk along a shop.
- **Lotus** opens on a shady garden whose sunlight moves (its interactive), behind a carved gate, with table-blue or red-oxide buttons. You climb the house floor by floor.
- **This page** opens under a thatched roof looking out to sea, and the room itself has depth when you move. Its colours are saffron and aubergine from the restaurant's cushions. It is ordered by the clock (13:00 → 11:00), and booking starts from "How do you like to sleep?" (fan or A/C). It is the only page in the run that carries its own break's live forecast.
- **Sibling variants for this business**, from concepts.md:
  - calm: the view from the roof (img-009), banana-leaf green;
  - unique: img-009 dissolving into white, with the sign's vermilion and a sticky split.
  - Neither shares this first screen, type pair or accent.

## hand-off checks (4e)

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
