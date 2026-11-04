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

## images

All are business-owned Booking.com or Airbnb property uploads (`dossier.images[].license`). Nothing is upscaled, and nothing is shown wider than its source.

| use | asset | crop / size |
|---|---|---|
| first screen | img-009 | desktop 1920×1080 from y 160 (1280 and 1920 renditions); phone 700×1244 from x 520 |
| clock frames, 14:15 | img-103 (afternoon), img-008 (sunset), img-099 (night), img-105 (7:30), img-009 (the break) | 1280 and 760 widths; horizons for the wipe at .40 / .84 / .45 / .46 / .67 of frame height (`data-hz`; 4g reads them from media `focalY`) |
| Deluxe with Balcony, 3:2 | img-076, 073, 079, 068, 077, 074 (bath) | centre crops of 1440×1920 portraits |
| Superior, 3:2 | img-035, 037, 034, 017, 064 (bath with water heater) | |
| Deluxe 2 Adults + 1 Child, 3:2 | img-040, 036, 053 (bath) | |
| Deluxe Family, 3:2 | img-031, 045, 022, 027 | |
| Budget Double, 3:2 | img-047, 046, 048, 049 | |
| Budget Single, 3:2 | img-056, 057, 059, 061 (bath) | |
| inside the house, masonry at own ratio | img-006, 007, 011, 030, 019, 016 | whole frames at 720 w |
| getting here, matted print 4:3 | img-002 (the sign) | 840×630 at native |

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
3. **The accent is close to Lotus.** Concepts.md flagged that #BE4532 (the sign's sun, darkened for 5.1:1 under white text) is 7° from Lotus's shipped #B8431C. Side by side on white they read as the same warm red family; this one is slightly lighter and more vermilion. I kept it, because it is the client's own mark and appears only as the booking colour, the hour marker and the round Call. If the human judges it too alike across the run, the fallback in concepts.md applies: concept 1's banana-leaf green for booking, with the sun kept for the marker and Call. That is a call for the pick, not a defect.
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
8. **Lane note.** Two tool runs touched scratch outside this folder:
   - `node tools/check-design.mjs unique` (the variant name selects every business's unique mockup) rewrote the scratch `shots/check-design/` sheets of other businesses' unique mockups before I stopped it. Those are gitignored scratch, regenerated by the same tool. The final check ran on this page's path only.
   - The tasteskill inspector wrote `.taste-skill/` at the repo root, which I removed.

## other businesses in this run

- **Cheeky Monkey** (picked unique, drone-loop hero) is loud surf colour, painted-sign lettering, boards and a main road, with a right-hand drawer.
- **Lotus Surf House** (picked calm, "The gate") is a carved gate and a garden house, inward and shaded, in Parisienne with a red-oxide button and a slide-down panel. It is ordered by floor.
- **This page** opens on open sky and sea from a roof, whose sky becomes the white page. It moves through a day: one pinned window turns from the afternoon thatch to sunset, night, the restaurant at 7:30 and the break, with the inn's sign-sun as the hour marker. It is the only page in the run that names its own break and carries that break's forecast. Its booking is a centred card (a bottom sheet on phones) that asks how many are coming.
- The nearest thing to another page is the accent, which is close to Lotus's red (conflict 3).

## hand-off checks (4e)

1. **Look loop: pass.** Three first-screen rounds, then one whole-page, one checks-and-states and one final whole-page round, all written up. Every `dist/img` file comes from `src/make-media.sh`.
2. **Booking: pass.** Every "Check dates" action is `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html`, identical to `dossier.booking.engine_url` (asserted in `build.py`). Call is `tel:+94778921396`, as `dossier.contact.phone`. The audit's tap-through landed on the Booking.com listing. "Find your room" links are a real `rooms/` page.
3. **`check-design`: pass.** 0 problems, 0 default-look warnings (h1/h2 Caveat, body Red Hat Text, ground #fff).
4. **`check-places`: pass.** 0 borrowed images.
5. **Reduced motion, no WebGL and scroll: pass.**
   - Reduced motion: stacked blocks, no pin (audit: 1 canvas, hidden; photograph visible).
   - `?nogl`: CSS cross-fades.
   - `scroll.early.cls` 0.0009 and `scroll.settled.cls` 0.
6. **Other businesses: pass.** Compared above.
7. **Video and first screen: pass.** No usable video (gaps). The first screen is the strongest own photograph, img-009 at 1920 px, and the main item is the WebGL horizon-wipe set-piece over five of the business's own 1920 px photographs.

audit-mockup (phone, slow 4G, 2026-11-04T23:30Z):
- first load: 382 KB (HTML with inline CSS and JS 98 KB, images 202 KB, fonts 81 KB);
- JS: inline, about 14 KB raw;
- largest image: 78 KB;
- LCP: 1,888 ms; CLS: 0.0011;
- third party on load: fonts.gstatic.com only (the 4e font allowance). The Rosa JSON and widget load only near their block.
