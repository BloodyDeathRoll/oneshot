# Coconut Surf Inn: unique mockup, "Round the clock" (concept 3)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.

**Files.** The page is `dist/index.html`. `dist/rooms/index.html` is the "Find your room" overlay as a page of its own, for visitors without JS.
- CSS and JS are inlined from `src/page.css` and `src/page.js` by `src/build.py`.
- Every word comes from `copy/en.json`. The forecast headline comes from `src/rosa-weligama-west.json`, a real, unedited Rosa response for spot `weligama-west` ("Coconut", Midigama), fetched 2026-11-05.
- Media come from `src/make-media.sh` (`# media: …/unique/dist/img/**`).
- Fonts are Red Hat Text (variable, 400–600) and Caveat 600, both latin woff2 from fonts.gstatic.com, preloaded, with metric-matched local fallbacks.
- Rebuild: `bash src/make-media.sh && python3 src/build.py`.
- To view it: `python3 -m http.server 8923` from `dist/`. Add `?still` to see the stacked, unpinned layout; add `?nogl` for the CSS cross-fade instead of WebGL.

## look-log

All shots were taken with `tools/shoot.mjs` over http (:8923). There is no website, so the bar is what a visitor reaches today: the Booking.com fold (`funnel/walk/05-booking-com-fold.png`, a grey entrance hall 1/45 under a blue bar and a yellow date form) and the Google and Airbnb folds. Beside those I held the gold method: `the-lavish-haven` notes (the place's own picture held on a white page, type on white) and the Global Surf level (one title, one short line, one button, the best media unobstructed).

Process note: the page skeleton was assembled before round 1. Rounds 1–3 changed the first screen only.

**Round 1, first screen.** img-009 cropped 16:9 from y 300, with the mask going from transparent to opaque between 8% and 54%.
- What was wrong as design: the crop cut away the blue part of the sky, so the overcast grey dissolved into white and the palm crowns sat in the fade. They read as a fogged photograph, which is the failure the concept warns about. The white tarp and tin roof of the shack took the bottom fifth. On the phone, 40% was white and the bottom was roofs.
- Change: crop from y 160, so the saturated blue upper sky is the part that becomes the page. The mask is now 6% → 42%, so it ends above the crowns.

**Round 2, first screen.** The crowns now stand crisp against blue, and the blue lifts into the white header and title. That is the concept's "page becomes the sky" without fog. The reef's white water, the green and the beach shacks sit untouched in the lower half.
- Still wrong: on the phone the shack roofs filled the bottom 15%.
- Change: the phone crop is now 700×1244 from x 520, which ends above the roofs. It is shown at 390 CSS px, under native.

**Round 3, first screen.** Desktop and phone both read as one photograph: an open view to the sea from the roof, with a short script title, one line and one vermilion button on the white sky.
- Side by side with the Booking.com fold (an entrance hall, a date form), this is clearly better at a glance. It shows the sea, the green and the reef in front of the house, which no listing shows.
- The dissolve does not move, as the concept says. The page's main item is the set-piece.

**Round 4, whole page.** Desktop and phone sheets, plus a mid-scroll capture of the set-piece at 1440 and 390 (headless SwiftShader).
- The horizon wipe works: the sunset opens along a soft warm band that travels out from its own horizon over the thatch frame, and the sun disc on the clock moves to "Sunset".
- Flaws found and fixed:
  - the three ratings wrapped 2 + 1 at 1440;
  - the review dots sat far below a short quote; they now sit above the stack;
  - the sign print was mostly wall; it is re-cropped to the sign, 840×630 at native;
  - the phone bar's "Check dates on Booking.com" touched its button edges;
  - the dial labels touched the photograph (the rail is now 136 px);
  - on the phone, text slid hard under the pinned frame; a 28 px white fade now runs under the dial.

**Round 5, checks and states.**
- `audit-mockup`:
  - First load was 1.13 MB, because the lazy off-screen slides were fetched. They are now held behind `data-src`, woken when a slideshow nears, with `<noscript>` copies for no-JS. First load is now **382 KB**.
  - Early-scroll CLS was 0.081. Font swap reflowed the copy paragraphs: tuning `size-adjust` alone could not match every line break. Fixed by preloading the two woff2 files plus metric fallbacks.
  - The Rosa iframe shifted its box. It is now absolutely positioned in its reserved 420×500 box.
  - Real bug: on phones the clock's sun element, translated four steps, widened the page to 648 px at the end of the set-piece. The layout viewport grew and the fixed bar moved. Fixed with `overflow:hidden` on the dial. Scroll CLS is now **0.0009 early / 0 settled**.
- Tap targets: 41 under 44 px, now 0 (dots and arrows are 44 px; the wordmark and the Rosa credit are 44 px tall).
- Inspector:
  - overflow at 768: fixed with `minmax(0,1fr)` grids;
  - resting button shadow: removed;
  - phone overlay rows overflowed: the chip moved into the row's text, and the column is `minmax(0,1fr)`.
- Overlay in Playwright, at 1440 and 390:
  - "Find your room" opens it, and focus lands on the "1" tile;
  - "2" shows the four doubles and the 2 + 1 room, with chips and booking buttons;
  - "Not sure" shows `closing` and Call;
  - Esc closes it and focus returns to the opener;
  - the audit's keyboard check passes (opens, closes, focus returned).
- Reduced motion: no pin, five stacked photo + text blocks, canvas hidden.
- No JS: the room slides load; the forecast shows the plain Rosa link in both halves; `rooms/` lists the rooms by group size with booking links.

**Round 6, final whole page** (sheets in `shots/`). No overflow, overlap or unreadable text at 1440 or 390, and the scroll width equals the viewport at 390, 768, 1024 and 1280. The page, in order:
- the sky-dissolve hero;
- "13:00, check-in": a paragraph of facts, three dated ratings, the booking button and Call;
- "Six kinds of room": 3:2 dot slideshows, two per row, A/C rooms first, each with a "Fan" or "A/C | Hot water" chip on the photo and its own button;
- "Inside the house": a true masonry beside a narrow column of copy;
- the 450 vh sticky split: The afternoon → Sunset → Until 22:00 → From 7:30 → The break, with the sign's sun moving down the clock;
- "Today on Coconuts": the headline left and Rosa's light widget right;
- "11:00, check-out": ratings and one quote at a time;
- the sign as a matted print beside "Getting here";
- the closing line in script, with the booking button and the round Call;
- the footer.

It is clearly better than every listing fold. Against gold it holds the Lavish method (the place's own picture on white, type on white) with none of its form.

Skill notes (tools.md: notes, never gates). Inspector findings kept, with reasons:
- `palette-terracotta`: #BE4532 is the sun on the inn's own sign (concept).
- `covered-text` @390: block titles pass under the pinned frame as they scroll. This is the sticky-split pattern itself; each block is read below the frame, never under it.
- `headline-lines`: the closing is `closing` (15 words) set in the script, as the concept asks.
- `off-centre` @390: the set-piece frames are full-bleed.
- `side-scroll`: the slideshows.
- `eyebrow`: a false reading of the rating meta.
- `shadow`: kept only on the matted print and the overlay card, which really float.
- `no-footage`: no usable video.
- `still-page`: headless; the wipe and the clock move on scroll.
- `size-count`: 13 sizes, a note only.

### Round 2 (loop-back from the 4f pre-score: visual 7, experience 8, critic 67.4)

Sheets in `shots/` (http :8923), plus scratch Playwright frames of the wipe mid-change, the pin's exit, Rosa blocked/unblocked and overflow at 320/360/390.

**Round 7, first screen (hero, header, colour).**
- What was wrong: the dissolve read as fog (palm crowns half-transparent in a grey sky), the foot carried the tin roof, wires and tuk-tuks, the phone crop left the sea a thin strip, the name was on screen twice in Caveat, and the booking pill was Lotus's button.
- Changes:
  - The fade is now baked into the file by `make-media.sh` (`sky()`): white = max(a short top ramp, a lower ramp x a brightness key on max(R,G,B)). The bright sky becomes the page white; the dark fronds keep every pixel. The palm crowns now stand crisp against white, the lower sky keeps its pale blue for the last ~20% above the horizon, and the sea, reef and green are untouched. No CSS mask any more.
  - Desktop crop is 16:9 from y 20 (bottom at y 1100, above the roofs, wires and tuk-tuks).
  - Phone: the hero is a column, type on white, then the picture fills what is left of the screen from a 560x712 crop on the reef. The sea and the white water are now the lower third of the picture, not a strip.
  - The header wordmark is the text face at 18/17 px, and with JS it and the round Call stay hidden (opacity/visibility, no layout change) until the hero's button has scrolled away. The first screen says the name once.
  - The hero line is "A guesthouse in Gurubebila, between Midigama and Weligama" (words of `tagline`), so the type is on the first phone screen; 18 px on the phone.
  - **Booking colour is the sign's ink `#252323`** with white text (15.6:1), every booking button (hero, header, rooms, bar, sheet, closing, footer). The vermilion `#BE4532` is now only the sun-disc hour marker and the round Call button, which makes the sun the one round orange thing on the page, as the concept meant. Press fill `#4A4646`; hover lifts 1 px.
- Against the bar (Booking.com fold: entrance hall under a blue bar) it is clearly better at a glance, and now decisive rather than soft: a black title, a black button and the inn's palms standing on the white page over the sea.

**Round 8, set-piece.**
- Wipe: as shot by the experience critic, the sunset arriving at horizon .84 through a 0.09-wide soft edge plus a warm glow read as a red smear rising from the bottom. The band's centre is now clamped to .38–.62 of the frame, the edge is 0.05 wide with a neutral light line, and the glow is gone. Captured 450 ms into each change at 1440 (SwiftShader): a clear horizontal slit opening from the horizon across the full width (afternoon → sunset, 22:00 → 7:30).
- Dimmed blocks: dimmed by colour, not opacity. Non-current text is `--muted` `#5A5656`; lowest measured pair in non-current blocks is 5.43:1 (the place-colour sub-title), so nothing visible is under 4.5:1.
- Phone: blocks are their natural height (no 64 svh minimum), so no empty white bands; the pinned photo is 44 svh + the 52 px dial; the tick labels sit 15% in from the edges.
- Exit: the pin still scrolls away (it is sticky), but "Today on Coconuts" now starts 56 px under the section edge (40 on the phone), so what follows the photograph is the next title, not an empty strip. The break frame is re-cropped (14:15 from the top 1150 rows) so it ends above the tin roofs too.

**Round 9, whole page.**
- "Inside the house": three explicit columns, each a 2:3 portrait over a 3:2 landscape (img-016 cropped to 2:3), so the grid ends flush with no hole. Phone: two flush columns, img-030 full width, img-016 dropped.
- The sign is a plain photograph with rounded corners: no mat, no shadow, no tilt.
- Rooms on the phone: the two fan rooms are compact rows (112 px thumbnail beside the facts), slideshow arrows hidden on phones (swipe + dots), tighter spacing. The room run went from about 6 phone screens to about 3.5. Budget Double now leads with the open door (img-046), not the towel.
- Erin's and Janno's reviews now appear once, in the set-piece; the guests slideshow holds the other ten.
- "Not sure" in the sheet and on `rooms/` has one Call, not two.
- Overflow: buttons wrap on phones; the bar's book button shrinks; scroll width equals the viewport at 320, 360 and 390 with JS, and 390 with JS off.
- Rosa: the iframe stays invisible, and the plain link stays visible in the reserved box, until the frame has loaded **and** a no-cors probe to rosa.surf has answered (a blocked host still fires `load` on Chrome's error page). Rosa blocked: link visible, iframe opacity 0. Rosa reachable: widget shown, link hidden.
- Inspector (notes, never gates): covered-text @390 is the sticky split itself, as in round 6; headline-lines is the closing line in the script, as the concept asks; eyebrow is a false reading of the rating meta; side-scroll is the slideshows; no-footage, no usable video; 12 font sizes. name-only-title fixed (the hero line is 18 px and says "guesthouse").

## images

All are business-owned Booking.com or Airbnb property uploads (`dossier.images[].license`). Nothing is upscaled, and nothing is shown wider than its source.

| use | asset | crop / size |
|---|---|---|
| first screen | img-009 | desktop 1920×1080 from y 20 (1280 and 1920 renditions); phone 560×712 from x 560, y 430; sky faded to white by a brightness key (`sky()`) |
| clock frames, 14:15 | img-103 (afternoon), img-008 (sunset), img-099 (night), img-105 (7:30), img-009 (the break, 1072×1150 from x 520, above the roofs) | 1280 and 760 widths; horizons for the wipe at .40 / .84 / .45 / .46 / .67 of frame height (`data-hz`; 4g reads them from media `focalY`) |
| Deluxe with Balcony, 3:2 | img-076, 073, 079, 068, 077, 074 (bath) | centre crops of 1440×1920 portraits |
| Superior, 3:2 | img-035, 037, 034, 017, 064 (bath with water heater) | |
| Deluxe 2 Adults + 1 Child, 3:2 | img-040, 036, 053 (bath) | |
| Deluxe Family, 3:2 | img-031, 045, 022, 027 | |
| Budget Double, 3:2 | img-046, 047, 048, 049 | |
| Budget Single, 3:2 | img-056, 057, 059, 061 (bath) | |
| inside the house, three flush columns | img-006 + 007, img-019 + 011, img-016 + 030 | whole frames at 720 w; img-016 cropped 2:3 |
| getting here, 4:3 | img-002 (the sign) | 840×630 at native, no mat |

Alt text was written from each photograph as seen on contact sheets, not from the dossier descriptions alone.

## gaps

- **No usable video** (vid-001 is a third-party listicle, vid-002 shows the pre-renovation building, vid-003 is another business's film).
- No WhatsApp and no email: Call (`tel:+94778921396`) is the only direct channel.
- No nightly prices: "Booking.com has the live dates and prices" is the copy's own line.
- No Instagram, so the section is omitted, not faked.
- No photographs of surfing, the hosts or food: the surf is in img-009's white water, in the host's `spot` line and in the forecast; the hosts and breakfast are in the guests' words.
- Schema gaps, as in concepts §6:
  - `heroLine` (the hero uses "Gurubebila, between Midigama and Weligama", words of `tagline`);
  - `rooms[].photos[]`;
  - `rooms[].group` / `features` for the Fan and A/C chips (hard-wired here from each room's `note`, asserted in `build.py`);
  - `openingHours` for 7:30 and 22:00.

## conflicts

None blocking. These are departures from concepts.md, each a deliberate call:
1. **Fan-room photos are 3:2 crops, not "4:5 letterboxed on the tint inside 3:2 frames".** Letterboxing is a padded picture box (house rule 2). Every slide is now one ratio; the fan-room sources are landscape or tall enough to give 1200 px 3:2 crops.
2. **The set-piece is CSS `position: sticky` plus about 4 KB of raw WebGL, not GSAP + ScrollTrigger + Lenis.** The scroll playbook allows sticky "for simple cases". There is no smooth-scroll hijack, no CDN library, nothing to vendor at 4g, and native scroll everywhere. Each frame change is a timed 1.1 s horizon wipe, triggered when a text block crosses 55% of the viewport (on phones, 30% into the area below the pinned frame).
3. **Resolved in round 2: booking is the sign's ink, not its sun.** Both 4f visual critics found the vermilion pill indistinguishable from Lotus's shipped `#B8431C` at button size. Following the visual critic's option (a), every booking button is now `#252323` (the palm on the sign) with white text; the vermilion stays only on the sun-disc hour marker and the round Call button. Round-1 text, for the record: Concepts.md flagged that #BE4532 (the sign's sun, darkened for 5.1:1 under white text) is 7° from Lotus's shipped #B8431C. Side by side on white they read as the same warm red family; this one is slightly lighter and more vermilion. I kept it, because it is the client's own mark and appears only as the booking colour, the hour marker and the round Call. If the human judges it too alike across the run, the fallback in concepts.md applies: concept 1's banana-leaf green for booking, with the sun kept for the marker and Call. That is a call for the pick, not a defect.
4. **Galleries vs concept 1's lists:**
   - img-089 (a bathroom with no `room_types`) is not used, so no bathroom is pinned to a room it may not belong to;
   - img-038 (a dim rope rail) is dropped;
   - img-030 sits only in the masonry, not twice on the page.
5. **"Rooms that sleep that many"** is read as rooms that sleep n or n + 1, smallest first in the `rooms/` page: 1 → the single and the doubles; 2 → the doubles and the 2 + 1; 3 → the 2 + 1 and the family room; 4 → the family room.
6. **Forecast.** The headline is inlined from the fixture (Thu 5 Nov 02:30, 0.4–0.6 m knee-high, swell 9.2 s from the S, wind 4 km/h cross-shore). When the block nears the viewport, page.js makes one request to Rosa's JSON and refreshes it, and sets the widget iframe's `src`. If the data is older than 24 h and the live request fails, the numbers are replaced by "See today's forecast for Coconuts on Rosa". Never `coconut` or `coconut-beach`.
7. Interface labels the template owns:
   - the clock moments ("The afternoon", "Sunset", "Until 22:00", "From 7:30", "The break") and their ticks;
   - the chips ("Fan", "A/C | Hot water");
   - "How many are coming?" and the tile labels;
   - "Find your room", "Today on Coconuts", "At the house", "Open in Google Maps";
   - the audit's `primary_label` "See rooms and live dates on Booking.com" on the check-in button.
8. **Hero adaptation.** Concepts.md says "the photograph itself is not altered … only a fade to the page's white". The round-2 fade is still only a fade to white, but keyed by brightness so the fronds stay opaque; it is baked into the derived file by `make-media.sh` rather than drawn by a CSS mask. If the human reads it as an effect rather than the photograph, the round-1 vertical mask is one line to restore.
9. **Round-2 lane note.** `check-design` ran on this page's path only. `.taste-skill/` already existed at the repo root (another designer's run, 02:02) before my inspector run; I left it in place rather than delete a folder another session may be reading.
10. **Calm vs unique first screen.** Kept img-009 as the concept says; the keyed white sky, the column layout on the phone and the lower crop make it a different first screen from calm's, whatever calm changes.
11. **Lane note (round 1).** Two tool runs touched scratch outside this folder:
   - `node tools/check-design.mjs unique` (the variant name selects every business's unique mockup) rewrote the scratch `shots/check-design/` sheets of other businesses' unique mockups before I stopped it. Those are gitignored scratch, regenerated by the same tool. The final check ran on this page's path only.
   - The tasteskill inspector wrote `.taste-skill/` at the repo root, which I removed.

## other businesses in this run

- **Cheeky Monkey** (picked unique, drone-loop hero) is loud surf colour, painted-sign lettering, boards and a main road, with a right-hand drawer.
- **Lotus Surf House** (picked calm, "The gate") is a carved gate and a garden house, inward and shaded, in Parisienne with a red-oxide button and a slide-down panel. It is ordered by floor.
- **This page** opens on open sky and sea from a roof, whose sky becomes the white page. It moves through a day: one pinned window turns from the afternoon thatch to sunset, night, the restaurant at 7:30 and the break, with the inn's sign-sun as the hour marker. It is the only page in the run that names its own break and carries that break's forecast. Its booking is a centred card (a bottom sheet on phones) that asks how many are coming.
- Round 2: the booking buttons are ink black, so the run's red-family booking pill (Lotus) is no longer shared (conflict 3).

## hand-off checks (4e)

1. **Look loop: pass.** Round 1: three first-screen rounds, then one whole-page, one checks-and-states and one final whole-page round. Round 2: rounds 7–9 above. Every `dist/img` file comes from `src/make-media.sh`.
2. **Booking: pass.** Every "Check dates" action is `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html`, identical to `dossier.booking.engine_url` (asserted in `build.py`). Call is `tel:+94778921396`, as `dossier.contact.phone`. The audit's tap-through landed on the Booking.com listing. "Find your room" links are a real `rooms/` page.
3. **`check-design`: pass** (`node tools/check-design.mjs sites/…/unique/dist/index.html`, round 2). 0 problems, 0 default-look warnings (h1/h2 Caveat, body Red Hat Text, ground #fff).
4. **`check-places`: pass.** 0 borrowed images.
5. **Reduced motion, no WebGL and scroll: pass.**
   - Reduced motion: stacked blocks, no pin (audit: 1 canvas, hidden; photograph visible).
   - `?nogl`: CSS cross-fades.
   - `scroll.early.cls` 0.001 and `scroll.settled.cls` 0 (round 2).
8. **`funnel.mjs` (round 2): `primary_action` = `engine` "Check dates on Booking.com", `hero_action` engine, `clicks_to_book` 1, CTA above fold.**
6. **Other businesses: pass.** Compared above.
7. **Video and first screen: pass.** No usable video (gaps). The first screen is the strongest own photograph, img-009 at 1920 px, and the main item is the WebGL horizon-wipe set-piece over five of the business's own 1920 px photographs.

audit-mockup, round 2 (phone, slow 4G): first load 370 KB (HTML 99 KB, images 190 KB, fonts 81 KB), LCP 1,680 ms, CLS 0.0011, 3rd party fonts.gstatic.com only, keyboard ok, 0 alt missing.

audit-mockup, round 1 (phone, slow 4G, 2026-11-04T23:30Z):
- first load: 382 KB (HTML with inline CSS and JS 98 KB, images 202 KB, fonts 81 KB);
- JS: inline, about 14 KB raw;
- largest image: 78 KB;
- LCP: 1,888 ms; CLS: 0.0011;
- third party on load: fonts.gstatic.com only (the 4e font allowance). The Rosa JSON and widget load only near their block.

## Human tweak before the pick (2026-11-05)

Alon: "i like the Unique mockup but switch the main image (the first one), take the one from "Calm" and put it as the top image for "Unique"."

- The first screen now uses calm's frame of img-009 and calm's grade (+6% contrast, +10% saturation): desktop 1440×810 from (380, 290), so the sea, reef whitewater and green fill the bottom fifth with no wires or roofs; phone 560×1100 from (800, 0), blue sky over the centre palms down to the reef, no pan. The white sky dissolve of round 2 is gone.
- The hero now runs full height under the transparent header (as calm's does), title, line and button sit on the sky in the existing ink. A blurred 40 px copy of each crop shows under the photo on a slow load and is dropped once it is in (check-design: 0 problems on both pages).
- funnel.mjs --depth 3: primary engine, hero engine, 1 click to book. Not re-scored by the critics; the round-2 scores were for the dissolve hero.
