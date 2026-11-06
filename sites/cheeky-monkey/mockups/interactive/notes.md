# Cheeky Monkey: interactive mockup, "The wall of boards" (concept 2)

Station 4e · designer 0.7.0 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-10-26.
Page: `dist/index.html` (one file, CSS and JS inline, fonts from Google Fonts at 4e). Media: `src/make-media.sh` (`# media:` for `dist/img/**` and `dist/video/**`); a clean rebuild from it gives the same 79 images and 4 clips.

## look-log

Each round shot with `tools/shoot.mjs … --out shots`, sheets opened at 1440 and 390, with `dossier/cheeky-monkey/assets/old-site-desktop.png` / `old-site-mobile.png` beside them.

**Round 1, first screen.** The triptych reads as one wall of boards, but because a 1920×1080 composite was drawn with `cover` into 1440×900, the three columns were 450 / 528 / 450 px wide. That reads as a mistake, not a triptych. The nav ("Surf weeks" and the rest) sat on the light shop ceiling with too little contrast. Change: the recipe now builds the composite at 1728×1080 (16:10), with three 576 px columns each scaled down from the 1080 px source, so the columns are exact thirds at 16:10 and at 16:9 (cover crops only top and bottom). The top gradient is stronger. Against the old site, which opens on PHP warnings, a stock-feeling surfer, a black "not bookable" banner and no booking link, this is already clearly better at a glance: the shop's own boards are moving, with one magenta button to live dates.

**Round 2, first screen.** The thirds are exact and the white 6 px gutters make it read as a deliberate triptych. On the phone, the 9:16 loop starts on the poster frame and is full-bleed, but the magenta button sank into a red-and-magenta board, and "Midigama, Sri Lanka" was thin over busy resin. Change: a 1.5 px translucent white ring and a deeper shadow on the hero button only, the location line set in bold with a tighter shadow, and a stronger centre scrim on the phone. Still clearly better than the old site: it is one clean phone screen, where the old one is 470 px wide and scrolls sideways.

**Round 3, first screen.** The button now separates from the footage on every frame I checked (a red board, the orange board with the hand, the dark gap between boards). The title is centred both ways, with one CTA, the header, and nothing else. The middle column passes a dark stretch of the reel at about 8–10 s. It helps the title's legibility, so I kept it. Clearly better than the old site at a glance.

**Round 4, whole page.** Built every section. The sheet showed real flaws:
- the four week cards overflowed the container at 1440 (the room chips would not shrink);
- the `width`/`height` attributes on `<img>` were overriding `aspect-ratio`, so the roof photo, Baba and the Instagram tiles came out stretched tall;
- Baba's head was cropped;
- there was a dead gap beside the long roof column;
- "Open in Google Maps" appeared twice;
- the closing line was too heavy in Knewave at 46 px;
- the fin band (img-108) was a 21:9 crop of mostly grey wall.

Changes: `minmax(0,1fr)` columns with two-line chips; `img{height:auto}`; Baba re-cropped from the top (cy 0.12); a sticky roof photo; one map button; the closing line at 40 px; the fin band re-cut to 3:1 on the row of fins.

**Round 5, whole page, phone.** The phone sheet had only 4 captures for an 11,000 px page: the layout viewport was 1560 px wide. The cause was the visually hidden `aria-live` span in each week card. It was positioned against the section, so it escaped the swipe row's clipping. Fixes: `.week{position:relative}`, plus `minmax(0,1fr)` on the stacked panel, stage and quote grids, date fields that can shrink, smaller quote dots on the phone, and a breakable Instagram handle. Re-shot: 16 phone captures, no sideways overflow. check-design then failed twice: the hero's fallback colour counted as a dark ground (moved to the media box), and the purple "400" tile was a large dark panel behind text on the phone (now lilac with the figure in the place colour).

**Round 6, whole page and states.** audit-mockup: first load was 1.62 MB, because every room gallery's 1200 px photos loaded behind the hidden stages, and early-scroll CLS was 0.0172 at `#shop` (font swap: the rooms section got 31 px shorter and the shop 25 px taller). Changes:
- the hidden room stages are out of layout and crossfade in;
- gallery photos after the first load only when their gallery nears the viewport;
- the plan-panel room tiles use 192 px thumbs;
- metric-matched fallback faces (Arial at 103.6% for Schibsted Grotesk, Impact at 114% for Knewave).

Result: 272 KB first load, CLS 0 / 0. Looked at the states shoot.mjs cannot catch, with Playwright:
- the room chip rolls the price digits (Yoga and Surf, shared double → USD 280), and the mailto subject follows the chip;
- the Rooms tab with dates gives `…cheeky-monkey.en-gb.html?checkin=2026-12-01&checkout=2026-12-08&group_adults=2&no_rooms=1`;
- the drag strip moves with momentum (scrollLeft 487 after one drag);
- with reduced motion, no video source is attached and the poster stays;
- with no JS, every panel stacks and every link works.

Flaws found and fixed in this round:
- with no JS, the transparent header turned white-on-white once past the hero (now `position:absolute` without JS);
- the Rooms and Boards tabs left about 350 px of dead space, because the panel is fixed at the tallest tab's height so nothing jumps (now a 16:9 preview of the chosen room that crossfades when a tile is picked, and a portrait of the blue fish on the Boards tab);
- the email button overflowed each week card (now the call button has no icon inside the cards, and both fit).

**Round 7, whole page (final sheets in `shots/`).** No overflow, overlap or unreadable text at 1440 or at 390. Every section is its own moment: the wall in motion, a colour-coded counter, the room viewer, a draggable wall of boards, the fin band, the roof, Baba, guests over their own beach selfie, the map, the closing line and Instagram. **Clearly better than the old site, side by side:** the old site has no video, a half-empty desktop hero, PHP warnings, a "not bookable" banner, no booking link anywhere and a 470 px-wide phone layout. This page opens on the shop's own new boards, gets to live Booking.com dates in one tap, and shows every surf-week price one scroll down.

Skill notes (tools.md: a note, never a gate). The tasteskill inspector FAILs on text-shadow, button shadows and pill shadows; they stay. The text-shadow and the scrim are the legibility aids over moving footage (playbook §1a), the button ring is what separates the CTA from a red board, and the pill and lift shadows are the micro-animations custom.md asks for. Two of its findings are false positives:
- "headlines past two lines": the 0–9 columns of the digit roll, which are clipped to one line;
- "Moderate 11 px from the edge": the swipe row's peek at 768.

"No poster" is also a false reading: the hero's poster is the `<picture>` under the `<video>`, which is the LCP image.

## images

All business-owned (`dossier/cheeky-monkey/assets/index.json`). Booking.com images are property uploads (approved 2026-09-19); the others come from the owner's own site, Facebook or Instagram. None of the unknown-licence images (img-153, 156–161) is used. Nothing is shown wider than its source; no image is upscaled.

| use | asset | licence note |
|---|---|---|
| hero, phone (9:16 loop from 4.0 s) + poster | vid-009 (3.0–13.0 s cut) | business-owned reel, @cheekymonkeysrilanka, 7 Oct 2026 |
| hero, desktop triptych (offsets 3.3 / 6.1 / 10.0 s) + poster | vid-009 | same |
| room tiles, room viewer | img-030, 014, 021, 016, 033, 026 · 058, 041, 045, 050, 053 · 002, 004, 009, 013 · 035, 034, 036, 037 · 064, 063, 065, 070 | Booking.com property uploads |
| wall of boards strip (3:4) | img-146, 096, 087, 116, 131, 114, 163, 109 | owner's site / Facebook |
| Boards tab portrait | img-087 | owner's site |
| fin band 3:1 | img-108 | owner's site |
| roof 4:5, yoga slideshow | img-078 · img-137, 136, 140 | Booking.com / owner's site |
| Baba 1:1 | img-141 | owner's site |
| guests band | img-085 | owner's site |
| Instagram tiles | img-096, 134, 146, 137, 089, 107 | owner's site / Booking.com |

Deviation from concepts.md: img-117 is replaced in the strip by img-109 (a 3:4 crop of the long rental rack), because img-117 carries Instagram story stickers ("#MIDIGAMA … CHEEKY MONKEY - MIDIGAMA") burnt into the picture.

## gaps

- **No WhatsApp** (dossier). Booking is Booking.com for rooms (hero, header, phone bar, every room, the Rooms tab, closing, footer), plus `tel:+94719248686` and `mailto:cheekymonkeymidi@gmail.com` (with the subject prefilled per week and room type) for surf weeks and lessons, as the copy's `closing` line says.
- **Prices are from 2021.** Every price block carries a dot-marked "Price published in 2021", and the footer repeats it.
- **No shop hours** and **no opening status**: neither is stated anywhere on the page.
- **The break has no name**, so there is no forecast (concepts §3). The spot and season lines from the copy sit under "Getting here".
- **No instructor names**: only Baba is named.
- **No water footage of its own**: the hero is the indoor reel, by the concept's choice.
- **Instagram tiles** link to the profile, not to posts (the dossier has no per-post URLs).
- **Schema** (from concepts §6, unchanged): no `rooms[].photos[]` (the galleries are wired by hand here), no short hero line, no announcement line.

## conflicts

None blocking. Two deliberate departures from concepts.md, both improvements:
1. **The triptych is one baked 1728×1080 clip** (three columns side by side, made by the recipe), not three `<video>` elements playing one file from three offsets. One download and one decode: the columns can never drift, and there is no weak-device fallback to maintain. It is 2.9–3.5 MB (WebM / MP4), under the 4 MB desktop line. The concept's "≈480×853 columns" became 576×1080 source columns, drawn at about 480×900 at 1440×900, still downscaled.
2. **The Rooms and Boards tabs carry a photograph** (room preview, blue fish), because the fixed-height panel otherwise left dead space. The concept's "this segment scrolls to it" is kept as a "See every room" / "See the wall of boards" button.

Known 4e limits, not flaws:
- with JS off, each room gallery shows its first photo only (the other photos load by script, for the first-load budget);
- the tap targets under 44 px are the review citation links and the phone review dots; each review also has 44 px previous and next buttons.

## other businesses in this run

Cheeky Monkey is the only business concepted in run `2026-10-midigama-01`. Within the business, the three variants are being built at the same time:
- calm opens on img-147, the street photo through board noses, with "Catch waves, not worries" in a script and a red button;
- unique opens on one board-shaped window on white, with the featureLine in a marker hand and a blue button;
- this one opens on a full-bleed moving triptych of the rack, with the business name in Knewave and a magenta button.

A visitor would notice a street, a single board on white, and a moving wall of colour. The type, colour and booking pattern also differ (concepts §5).

## hand-off checks (4e)

1. Look loop: 3 first-screen rounds and 4 whole-page rounds, each written up above; every `dist/` media file comes from `src/make-media.sh` (a clean rebuild was verified). **pass**
2. Booking CTA = `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`, character for character with `dossier.booking.engine_url`; audit tap-through landed there on a 390 px viewport. Booking.com honours `checkin`/`checkout`/`group_adults` (checked live: "1 Dec – 8 Dec · 2 adults"). **pass**
3. `node tools/check-design.mjs sites/cheeky-monkey/mockups/interactive/dist/index.html`: ok, 0 problems, 0 default-look warnings. **pass**
4. `node tools/check-places.mjs cheeky-monkey`: 0 borrowed images, 0 failing. **pass**
5. Reduced motion: the poster only, no video source attached, transitions cut. No WebGL in this variant (none in the concept). `audit-mockup`: `scroll.early.cls` 0, `scroll.settled.cls` 0. **pass**
6. Other businesses: none in this run; the variants are compared above. **pass**
7. vid-009 is used as the hero main item on both widths; the last round says why this page beats the old site. **pass**

audit-mockup (phone, slow 4G): first load 272 KB, JS 0 KB external (inline), LCP 532 ms, CLS 0.002, scroll CLS 0 / 0, largest image 58 KB, fonts 64 KB. The third-party hosts on load are Google Fonts only, allowed at 4e (self-hosted at 4g). Hero video after first paint: phone 1.57 MB WebM / 1.64 MB MP4, desktop 3.06 MB WebM / 3.50 MB MP4.
