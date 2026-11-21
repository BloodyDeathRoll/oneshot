# Coconut Surf Inn: calm mockup, "The view from the roof" (concept 1)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05 · **round 2** (loop-back from the 4f pre-score: visual 6, experience 8, critic 70.2/80).
Page: `dist/index.html`, one file, with CSS and JS inlined from `src/page.css` / `src/page.js` by `src/build.py`. Every word comes from `copy/en.json` via `src/data.py`. That data module (copy, alt texts, room galleries, icons, the Rosa mapping) sits inside `calm/` because the interactive and unique mockups were built in parallel in their own folders. Media: `src/make-media.sh` (`# media: …/calm/dist/img/**`). Rosa fixture: `src/rosa-weligama-west.json`, one unedited response fetched 2026-11-05. Fonts come from Google Fonts at 4e (Onest 400/600, Satisfy).
To rebuild: `bash src/make-media.sh && python3 src/build.py`. `--hero` builds the first screen only, which is how rounds 1–5 were made.

## look-log

Shot with `tools/shoot.mjs` (served on :8921), sheets opened at 1440 and 390. Extra states were captured with Playwright in the scratchpad: the end of the phone pan, reduced motion, no JS, and a pixel-contrast probe behind the hero lines.
**The bar.** There is no own website and no `old-site-*.png`. The comparison is what a visitor reaches today: `funnel/walk/05-booking-com-fold.png` (blue bar, search box, an empty entrance hall 1/45, a yellow date panel) and the Google/Airbnb folds. The gold bar is Global Surf `postcard`. I rendered it locally, but its footage is not on this machine, so I compared its method (one short centred title and one short CTA over the place's best media) and not the clip.

**Round 1, first screen.**
- Desktop: img-009 full-bleed reads at once as sea, reef and palms, and it beats the Booking fold, which never shows the sea. As design it has two flaws. The white script title's "C" collides with the big palm crown at centre-left. The subtitle crosses fronds.
- Phone: the photo is visibly soft and blocky (q66), and the subtitle orphans "Weligama" on its own line.
- Change: phone crop to 1600×1280 at q76, and `text-wrap: balance` on the subtitle.

**Round 2, first screen.**
- The phone pan's end frame (captured after 15 s) lands on the reef but has tuk-tuks in the corner.
- On desktop, a 30ch measure broke the subtitle into two lines.
- Change: the pan ends at x≈1040 of the source (reef and the two walkers, no tuk-tuks). The measure limit applies on the phone only. Desktop `object-position: 78%` moves the palm clear of the title.

**Round 3, first screen.**
- I measured the pixels behind the lines. White text came out at **1.9–3.3:1** in every state, so the concept's "check the pixels" test failed.
- A deeper radial shade lifted it to about 3:1, but its ellipse was clipped by its own box and showed a **hard grey rectangle** on the sky. That is a flaw, not a look.
- Change: a blurred ellipse that cannot clip.

**Round 4, first screen.**
- Contrast now passes for large text (p90 ≥ 3.4 desktop, ≥ 3.4 phone at every pan stage). But on desktop the shade reads as a **grey smudge on a bright sky**: an overlay on the photo, which the calibration forbids.
- Change: the concept's own alternative, "the title is set in the ink on the sky instead". The lines sit on open sky on desktop. On the phone the block moves up into the sky band (20svh), so ink holds through the whole pan. The only help left is a faint sky-white haze (`#EEF2F7` at 42%, blurred), which is invisible on the sky and lifts a stray frond tip.

**Round 5, first screen.** Measured ink at **≥ 5.9:1 at the 10th percentile** in every state (desktop; phone at the start, middle and end of the pan). The first screen is the header, one Satisfy title, one 19 px line and one leaf-green button, over the house's own view to Coconuts. The phone pans once from the left palms to the reef in 14 s and stops. (Round-1 state; see round 2 below.)
**Clearly better than what a visitor reaches today, at a glance:** the Booking.com fold opens on an empty entrance hall under a search bar, and this opens on the sea, the green and the break from the roof. It meets the gold method: one short title, one short CTA, the best own media, nothing else.

**Round 6, whole page.**
- The sheet showed `|` separators dangling at line ends wherever a details, meta or amenities line wrapped.
- The rating cards wrapped "4 / Nov 2026".
- At 390 the page was 453 px wide. The check-in button "See rooms and live dates on Booking.com" was nowrap at 394 px, with Call beside it.
- Blank bands appeared under the phone slideshows.
- Changes:
  - Separators are drawn in CSS before each item, and `page.js` hides one that would start a wrapped line.
  - The rating date goes on its own line.
  - The check-in and closing buttons stack on the phone and may wrap.
  - Off-screen slides no longer carry `content-visibility` with a 600 px intrinsic size, which was what padded every track to 600 px.
  - The phone bar's call button is fixed at 72 px.

**Round 7, whole page + inspector.**
- `design-taste-frontend/inspect.mjs` found a real **608 px blank** at the Rosa row while it waited: the headline sat at opacity 0 and the widget box's plain link was hidden. That is an "empty box", which playbook §4 forbids. Fix: the build-time values show at once when they are under 24 h old (a clock check, no request). The plain link stays visible in the reserved box until Rosa's iframe covers it.
- Other changes: `spot` gets an 820 px measure (3 lines, not 4); the closing line is 28 px on the phone; the quotes are centred in their stack; the room rows are tighter.
- Inspector FAILs kept, each against the concept:
  - `eyebrow`: the small "The afternoon / Sunset / Until 22:00" lines are the clock that orders this page (concepts §3), not labels.
  - `shadow` / `button-fx` / `text-shadow`: the 1–2 px lifts and the hero haze are the requested micro-detail and legibility.
  - `still-page`: calm has micro-motion only, by concept.
  - `side-scroll`: the slideshows are scroll-snap rows by design.
  - `covered-text`: the sticky header passing over a heading mid-scroll.
  - `no-footage`: there is no usable own video (concepts §2).
  - `size-count`: 15 sizes. I did not reduce it at 4e, and it is listed for 4g.

**Round 8, states.**
- Reduced motion: no settle and no pan. The phone rests on the reef frame. Nothing moves.
- No JS:
  - Two flaws, both fixed. The slideshow dots and arrows rendered without working (author `display:flex` beat `[hidden]`). The Rosa block showed its plain link twice plus an empty 500 px box; with no JS it is now one plain link only.
  - What remains with no JS: every slideshow is a swipeable row, every link works, and the phone bar is static at the foot.
- Final sheets in `shots/`: no overflow at 390, 768 or 1440 (scrollWidth = viewport), no overlap, no unreadable text. The hero image is wider than the phone by design, clipped by the hero.

**Round 9, final check (whole page).**
- The page tells the stay by the clock, in this order:
  - the view;
  - 13:00 check-in, with both dated ratings and the booking pair;
  - six rooms in two plain groups, A/C first and fan rooms never hidden, each with its gallery, beds, sleeps, m², full note and own button;
  - the courtyard, then the thatched roof band;
  - sunset on the green, then the restaurant until 22:00 with the Eranga family and Meagan's words;
  - 7:30 and the break: `spot` and `season`, the Rosa headline, and Rosa's light widget;
  - 11:00 check-out with three dated ratings and the quotes;
  - getting here, the closing line, the footer.
- Side by side with the Booking.com fold, this wins on the first screen (sea and reef against an entrance hall) and on the question the listings get wrong: which rooms have A/C and hot water.

Motion system (Kowalski ease-out `cubic-bezier(.23,1,.32,1)`):
- buttons press to 0.97 over 120 ms; the booking button lifts 1 px on hover;
- the nav underline grows from the left;
- rating cards lift 2 px;
- slides take 350 ms, and the active dot stretches into a sky-blue bar;
- the phone bar slides up over 240 ms (drawer curve) once the hero has gone;
- quotes cross-fade at 300 ms;
- the Rosa headline fades in at 200 ms;
- the hero settles once (desktop) or pans once (phone).

`/find-animation-opportunities` and `/animate` were **not invoked** as skills this run: the micro-animations above are the concept's own list (§4.1 Motion), implemented by hand.

## look-log, round 2 (from the 4f reports)

Inputs: `reports/2026-10-midigama-01/coconut-surf-inn-guest-house-and-restaurant{,.visual,.experience}.md`, calm parts and shared parts. Same method as round 1: `tools/shoot.mjs` on :8921 (sheets opened at 1440 and 390), plus Playwright state captures in the scratchpad: cold phone load at 1.6 Mbps / 150 ms / 4× CPU, the pan end at 15.5 s, reduced motion, no JS, and a pixel-contrast probe with the text made transparent.

**Round 10, first screen (fixes 3, 4, 7).**
- What was wrong: the 16:9 crop kept the power line, poles and tin roofs at its foot. The title "C" sat on a palm crown. The phone pan ended on the tin roof. It was almost the same crop as unique.
- Change: desktop is now the **sky composition** of img-009: 1810×1018 from the very top. Its bottom edge is the sea and the reef, above the blue tarp, the tin roof, the wires and the poles (all below y 1025 of the source). The title, the line and the button sit in the open blue sky at about 21 svh, above the crowns. Unique opens with a white top and the palms-to-the-green half of the same photograph. Calm now opens on a blue sky, a row of palms and a strip of sea, and the two no longer read as one crop. I kept img-009, not another photograph, because concept 1 is built on it ("used once, on the first screen"). A grade of +6% contrast and +10% saturation lifts the flat sky, with no tint.
- Phone: crop 1400×1090 from the top-left, at the same cut line. The pan now ends centred on source x≈1100: the reef whitewater, the tall palms and the bushes. The tin roof and the tuk-tuks are outside the crop.
- The hero line is now "A guesthouse in Gurubebila, between Midigama and Weligama", a fragment of the tagline asserted in `data.py`. It sets on two lines on the phone, so "guesthouse" is on the first phone screen.
- The haze and the text-shadows behind the hero type are removed (visual tidy list).

**Round 11, first screen (fix 3, the cold load).**
- What the sheet showed: on slow 4G the bottom of the phone hero was a flat blue box for about 3 s.
- Change:
  - A 40 px blurred placeholder of each crop (`hero-d-lq`, `hero-m-lq`, made by `make-media.sh`) is inlined as the hero image's own background. It moves with the pan, and it is dropped once the photograph has loaded.
  - The phone file shrank from 130 KB to 79 KB.
  - The hero ground colour is now the sky's blue, not grey.
- Captured at 0.5 s: the bottom quarter is the blurred view, never a flat box. At 1.5 s the photograph is complete.
- check-design first failed this placeholder as "a 40 px source drawn 1440 px wide". The placeholder is a loading state, so it now drops on load and check-design passes.

**Round 12, first screen (contrast and header).**
- Pixel probe, ink on the sky, p10 / min:
  - desktop title 6.2 / 5.7; desktop line 5.7;
  - phone at the pan start: title 4.2 / 3.9, line 4.3 / 4.2. This is large text: 64 / 48 px script, and the line is 19 px at 600.
  - phone at the pan end: 7.0 / 6.6.
- Header wordmark on the sky: 4.3 p10.
- Fix 5: the phone header's call icon is now hidden (and taken off the funnel's visible actions) until the first screen has gone, then it scales in with the white header. Re-ran `node tools/funnel.mjs http://localhost:8921/ --depth 3`: **primary engine, hero engine** ("Check dates on Booking.com"), clicks_to_book 1.
- Fix 8: with JS off, the header is `position:absolute`. It sits on the photograph and scrolls away, so the white wordmark never prints over body text (no-JS capture at y 900: clean).
- Clearly better than the bar at a glance: the Booking.com fold (an empty entrance hall under a search bar) against a blue sky, palms and the sea from the house's roof, with the name, what it is and one button.

**Round 13, whole page (fixes 1, 2, 6).**
- Rooms. Before: six alternating 6/6 rows, about 6 desktop and 7 phone screens. After:
  - Desktop: the A/C group is **one 4-up row** of 4:5 slideshows, each with its label, beds | sleeps | m², the full note and its own button. The fan group is **one row**: its label plus the check-in/out line and the house note on the left two columns, and the two fan rooms on the right. The section is now about 1.9 screens at 1440.
  - Phone: the A/C rooms stack with 3:2 photos and the two fan rooms sit side by side. About 4 phone screens instead of 7. The page went from 16,300 to 14,214 px on the phone and from 14,565 to 12,590 px on desktop.
  - The slideshow controls sit on the photograph in a small dark pill: arrows plus dots, dots only on the phone fan cards. Taps are 44 px tall.
  - Every room leads with its best wide frame: the rattan balcony (img-068), the veranda with the hammock and the board (img-030), the room seen whole for the 2 + 1 (img-040) and the family room (img-045), and the doorway view for the budget double (img-046). The budget single leads with img-056, the brightest of its four. A bed close-up or the purple towel never leads.
  - Fix 6: img-089 is gone. `data.py` now asserts every gallery photo against `dossier.images[].room_types`.
  - img-030 moved from "Inside the house" into the Superior lead. The inside 3-up now carries img-016, the lawn with the boards in their rack, which the copy names.
- Fix 2, the pace:
  - **img-008, the sunset, full-bleed**: cover, `min(100svh, 62vw)` tall, palms kept, 4:5 on the phone. It opens "By the beach", and the turtles sit beside the words under it.
  - **img-099, the house lit at night, full-bleed** at 2:1 from the top of the frame. "Until 22:00" and "The restaurant upstairs" are set in white on its black sky: 17.5:1 p10 on desktop, 12:1 on the phone, where the title sits at the band's foot on the dark plants.
  - The run of the page is now day (roof, 21:9), sunset, then night, each a full-width picture with a text section between.
  - Visual fix 4: img-103 is re-cropped from y 340, so the hammock is whole.
- Tidy: booking buttons are flat, with no resting shadow (the shadow is on hover only). The details line uses `text-wrap: balance`, so "Rack for your boards" is no longer an orphan. The closing line is 32 px on desktop and 24 px on the phone.

**Round 14, whole page + inspector + states.**
- Inspector: 5 FAIL / 8 WARN. Fixed:
  - `glass`: the slideshow pills are now a flat ink at 50%, with no blur.
  - `headline-lines`: the closing line on the phone is now 24 px.
- Kept, each against the concept as in round 7:
  - `eyebrow`: the clock labels, plus "Rack for your boards" (that is the details line, not a label);
  - `text-shadow`: the header wordmark and nav over the photograph only, which hold 4.3:1;
  - `still-page`: calm has micro-motion only;
  - `covered-text` at 768: the sticky header passing over titles mid-scroll;
  - `side-scroll`: the slideshows;
  - `no-footage`: no usable own video;
  - `size-count`: 14 sizes, down from 15, listed for 4g;
  - `off-centre`: it measures the scrolled slide rects, while the cards sit at 88 / 88 px.
- A real flaw found and fixed: a `|` separator started a wrapped meta line ("| 19 m²"). Inline-flex items with icons have different tops, so the old check was flaky. Now each item is checked in order by its vertical middle. Where dropping the separator would let an item jump back up a line, an explicit break is inserted. A ResizeObserver re-checks when a line re-wraps. 0 mismatches at 390, 768 and 1440.
- States:
  - Reduced motion: still, resting on the reef frame.
  - No JS: the header scrolls away, the slideshows are swipeable rows, every link works.
  - Cold load: placeholder, then the photograph, never a flat box.
  - No overflow at 390 or 1440.
- Last sheets looked at for overlap, overflow and unreadable text: none found.
- **Against the bar:** this round fixes what held calm at "template below the fold". The rooms read in two rows. Three full-width photographs (day, sunset, night) carry the middle of the page. The first screen is the house's own sky and sea, with what the place is and one button. The Booking.com fold still shows an empty hall and no sea.

## images

All are the business's own uploads (Booking.com property / Airbnb host), `business-owned` in `dossier.images[]`. Crops only, never upscaled. No stock.

| use | asset | crop |
|---|---|---|
| first screen, desktop (sky composition) | img-009 | 1810×1018 from the top, cut above the tarp, the roof and the wires; +6% contrast, +10% saturation |
| first screen, phone pan | img-009 | 1400×1090 from the top-left; the pan ends at x≈1100 (the reef) |
| hero placeholders | img-009 | the same crops at 40 px, blurred; shown only until the photograph has loaded |
| Deluxe with Balcony 4:5 (3:2 phone) | img-068, 076, 073, 079, 077, 074 | short side ≤ 720, CSS crop |
| Superior | img-030, 035, 034, 037, 017, 064 | same |
| Deluxe 2 Adults + 1 Child | img-040, 036, 038, 053 | same |
| Deluxe Family | img-045, 031, 022, 027 | same (img-089 dropped: no room type in the dossier) |
| Budget Double 4:5 | img-046, 048, 049, 047 | same |
| Budget Single 4:5 | img-056, 057, 059, 061 | same |
| inside, 3:2 | img-007 | whole frame, 1400 / 800 |
| inside, 3-up 4:5 | img-006, img-016, img-003 | 640 |
| roof band 21:9 / phone 4:5 | img-103 | 1920×822 from y 340 (the whole hammock) / 4:5 at 42% |
| roof, 4:5 + 3:2 | img-015, img-101 | 720 / 1000 |
| sunset band | img-008 | whole frame 1920 / 1280, CSS cover at 50% 30%; phone 4:5 centre |
| turtles 3:2 | img-095 | 1280 |
| night band 2:1 / phone 4:5 | img-099 | 1920×960 from the top / 4:5 at 35% |
| restaurant slideshow 3:2 | img-105, 106, 107, 104 | 1400 |

The alt texts were written from each photograph (`src/data.py` `ALT`). The new ones are img-016 and img-099, written from the full-size files.

## gaps

- **No price.** Every booking action goes to the listing; `closing` says Booking.com has the live dates and prices.
- **No WhatsApp, no email.** The secondary action is `tel:+94778921396` only.
- **No usable video** (concepts §2), and no photographs of surfing, the hosts or food. The surf is carried by the hero's whitewater, the host's `spot` line and Rosa; the hosts and breakfast by guests' words.
- **No Instagram, no website**, so there is no feed section. It is omitted, not faked.
- **Schema** (concepts §6): no `heroLine` (the hero uses "Gurubebila, between Midigama and Weligama", a fragment of the tagline, asserted in `data.py`); no `rooms[].photos[]` (galleries are hard-wired in `data.py`); no room group or features (the A/C and fan grouping is hard-wired and asserted against each room's note); restaurant hours only in `hoursNote` prose.
- **Rosa:** the headline is from the fixture (`generated_at` 2026-11-04T20:26Z, current hour 02:30 local). After 24 h the page fetches the live JSON when the block nears the viewport, and falls back to the plain link if that fails. Spot id `weligama-west` ("Coconut", Midigama, checked in the fixture), never `coconut` or `coconut-beach`. The block never names Plantations and never makes a level claim.

## conflicts

None blocking.
- **Hero type in ink, and on the phone set in the upper sky, not at dead vertical centre.** Calibration asks for a title centred horizontally and vertically, and the gold pages use white. Measured, white on this pale sky is 1.9–3.3:1, and any shade strong enough to fix it reads as a grey smudge (rounds 3–4). The concept names ink on the sky as the alternative. On desktop the block is centred; on the phone it sits at about 20svh, in the sky band, so the ink holds while the photo pans. The alternative would cost either contrast or a visible overlay on the photo.
- **custom.md "booking lives inside the site"** (level, rooms, dates, then hand-off) against concept 1's booking pattern (per-room buttons and a persistent bar, 1 tap to Booking.com). Calm builds the concept; the in-page chooser belongs to interactive and unique. Booking.com cannot preselect a room from a URL (concepts §4.1).
- **Meagan's quote** sits with "The Eranga family home" (concept §4.1 item 7), so the guests slideshow carries the other eleven. Every quote appears once and none is dropped.
- **First load 0.93 MB** is under the 1.5 MB budget. Part of it is the first room row's later slides, which Chromium's lazy-load distance fetches early. Holding them back needs JS (it would break the no-JS swipe), so I left it.
- **Phone hero sharpness:** the crop is 1090 px tall (the cut line above the wires and the tin roof) against about 1688 device px on a 2× phone, so it is a little soft. That is the material's ceiling: a taller crop brings back the wires the critics asked to remove.
- **Desktop hero is mostly sky** (round 2, fix 4): to cut above the wires, the roofs and the tarp, and to differ from unique's crop, the 16:9 must stop at y ≈ 1018. The sea is a strip at the foot, and the reef whitewater is barely in frame on desktop (it is the end of the phone pan). The alternative was a different photograph, which concept 1 does not allow ("img-009 … used once, on the first screen"). For the human at the pick.
- **"Rooms with a gallery each" on the phone fan cards:** the two fan rooms are half-width with dots only (no arrows). They are still swipeable, with 24×44 taps.
- **A 4e limit, not a flaw:** with JS off, a wrapped `|` line may start with a separator, because the script that hides it does not run.

## other businesses in this run

- **Lotus Surf House** (picked calm, "The gate"): a 6/6 split on white, with the carved gate photograph in the right half, a Parisienne title, a brick-red button, and a walk up a shaded garden house floor by floor.
- **Cheeky Monkey** (picked unique): a drawn surfboard on a cartoon beach with marker lettering, a blue button and loud surf colour.
- **This page:** full-bleed open sky, sea and reef from a roof, an ink Satisfy title in the sky, a banana-leaf green button, a one-time pan on phones, and a page ordered by the clock (13:00 to 11:00). It is the only site in the run that names its own break and carries its forecast.
- No face, accent or first-screen device is shared. The one shared thing is the copy label "Check dates on Booking.com" (Lotus too), which is the owner's real booking path.

## hand-off checks (4e), round 2

1. Look loop: rounds 1–9 (round 1 of 4e), then rounds 10–14 for this loop-back: three first-screen rounds (10–12), then whole-page and state rounds (13–14), all written up. Every `dist/img` file comes from `src/make-media.sh`, rebuilt clean this round. Every flaw named is fixed or listed under conflicts. **pass**
2. Booking CTA = `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html`, asserted equal to `dossier.booking.engine_url` in `data.py`. The `tel:` is asserted against `dossier.contact.phone`. The audit tap-through at 390 landed on the Booking.com URL. `tools/funnel.mjs` (390, depth 3): **primary_action engine, hero_action engine**, clicks_to_book 1. **pass**
3. `node tools/check-design.mjs sites/coconut-surf-inn-guest-house-and-restaurant/mockups/calm/dist/index.html`: ok, 0 problems, 0 warnings. Run in single-page mode so it does not write into the sibling variants' folders. **pass**
4. `node tools/check-places.mjs coconut-surf-inn-guest-house-and-restaurant`: 0 borrowed images. **pass**
5. Reduced motion looked at: still, resting on the reef frame. No WebGL in calm. `audit-mockup`: `scroll.early.cls` 0.0008, `scroll.settled.cls` 0. **pass**
6. Other businesses opened and compared (above). Calm's first screen now also differs from its own sibling unique: a blue sky, palms and a strip of sea, against unique's white top over palms and the green. **pass**
7. No usable video (concepts §2). The first screen is the strongest own photograph, img-009 at 1920, in a new crop. The last round compares it with the Booking.com fold. **pass**

`audit-mockup` (phone, slow 4G, 2026-11-05):
- first load 926 KB (budget 1.5 MB); fonts 56 KB; Google Fonts are the only third party, which is allowed at 4e;
- JS: inline only, about 8 KB;
- largest image 79 KB (budget 300 KB);
- **LCP 624 ms**; CLS 0.001; scroll CLS 0.0008 / 0;
- 0 images without alt; skip link present;
- 45 taps under 44 px **wide**. All are 44 px tall: the slideshow dots (24×44) and the active dot (36×44). They are listed for 4g.
- The numbers not in the copy are Rosa's (0.4, 0.6, 02:30) and the year.

## look-log, round 3 (from the 4f round-2 reports; the last allowed round)

Inputs: the round-2 sections of `reports/2026-10-midigama-01/coconut-surf-inn-guest-house-and-restaurant{,.visual,.experience}.md` (visual 7, experience 8, critic 73.5/80). Kept as they passed: the 4-up A/C row, the sunset and night full-width bands, the whole-hammock roof band, flat buttons, Booking.com as the one primary action, ink Satisfy on the sky, the banana-leaf green, the blurred hero placeholder. Same method: `tools/shoot.mjs` on :8921 (sheets opened at 1440 and 390), plus scratch Playwright captures: the phone pan start and end, reduced motion, no JS, a throttled cold load, Rosa blocked and live, a pixel-contrast probe and a layout-shift trace.

**Round 15, first screen (fixes 1, 2 and the doubled name).**
- What was wrong: the round-2 desktop crop stopped at the horizon, so about 85% of the first screen was generic sky and the sea was a strip at the foot. The name was on the first screen twice (wordmark + title). There was no Call on the first screen.
- I measured img-009 on a 100 px grid at full size. The horizon is at y 950, the reef whitewater at y 1010–1050 and the beach at y 1060–1100. The first wire on the left crosses at about y 1110, the tin and tarp roofs start at y 1200, and the poles sit in the dark trees right of x 1373. So the clean bottom edge is y 1100, the same line as unique's crop. No other own frame shows the sea and the reef at ≥ 1200 px without a date stamp or power lines (img-087, img-088 and img-111 carry both), so img-009 stays.
- Desktop: 1440×810 from (380, 290). The horizon now sits at about 80%. The bottom fifth is the sea, the reef breaking white, the beach shack under its blue roof, the sand and the green. The big palm moves to the left third, clear of the title. Shown at 1440×900 it is drawn at 1.0–1.1× its source.
- Phone: 800×850 from (700, 250). The pan is now 180 source px over 12 s. It starts on the two centre palms over the sea and ends on the reef whitewater and the beach shelter at x 1160, left of the poles. Reduced motion rests on that end frame.
- Hero actions: the Booking.com button, then a labelled, secondary **Call** (ink outline on a faint sky-white). It comes after the booking button in the DOM, wraps under it on the phone, and is visually quieter.
- The header wordmark is hidden while the hero is in view, and fades in with the white header, so the first screen says the name once. With JS off the header never turns solid, so the wordmark never shows; the h1 carries the name.
- Ink contrast behind the lines (p10 / min): desktop title 6.7 / 6.5, line 6.8 / 6.5; phone pan start 6.1 / 5.2 and 6.1 / 5.8; phone pan end 7.2 / 6.8 and 6.9 / 6.7.
- `node tools/funnel.mjs http://localhost:8921/ --depth 3`: **primary engine, hero engine** ("Check dates on Booking.com", 0 taps to flow), clicks_to_book 1, CTA above the fold.
- Against the bar: the Booking.com fold is an empty entrance hall under a search bar. This opens on the house's own view to Coconuts: palms, the sea and the reef breaking, with the name once, what it is, and Book + Call. The round-2 sky-only version lost this; it is back.

**Round 16, whole page (fixes 3–8).**
- Fix 3, Rosa fallback: a failed cross-origin frame still fires `load`, so the frame could not tell it had failed. Now the page sends one `no-cors` probe to the widget URL when the block nears the viewport, and frames Rosa only after the probe answers. If it fails, or nothing answers in 8 s, no frame is added. The box gets `.off` and the plain link "See today's forecast for Coconuts on Rosa" sits on top. Tested with every `rosa*` host aborted, at 390 and 1440: 0 iframes, `elementFromPoint` at the link's centre is the link, and a real tap / click requests `https://rosa.surf/spot/weligama-west`. With Rosa live the frame loads (1 iframe). 0 Rosa requests on first load. This costs one request more than "the JSON plus the frame" (the critic noted the same on interactive). It is a fact for 4g.
- Fix 4, fan rooms: the row is now a header line (the fan label on the left; check-in/out and the house note on the right), then two wide cards with the photo and the text side by side, text centred. There is no column of empty tint. At 1440 the fan row is about 480 px tall, down from about 640. On the phone the two fan rooms stay side by side.
- Fix 5, spacing:
  - Section padding is down from clamp(72, 9vw, 128) to clamp(56, 6.5vw, 96).
  - The ratings and quote margins are tighter. The footer bottom padding is 48 px on desktop (110 px only where the phone bar exists).
  - Margins: the off-centre was the footer's fine print, which had lost its auto margins and sat at x 0. It is centred again, and the inspector no longer flags off-centre.
  - Below 900 px the header steps aside while you scroll down and returns on the way up. The phone bar carries booking there, so the header never sits over a section title. `h2, h3, h4` get `scroll-margin-top: 96px` for the nav links. The inspector's `covered-text` at 768 (the header over titles) is gone.
- Fix 6, type: **7 sizes** (14 / 16 / 18 / 22 / 32 / 48 / 64 px, inspector-measured), down from 14. Body is 16, titles are 48 on desktop (32 at the smallest), and the family title is 32.
- Fix 7, dots: every dot button is 44×44, with the visual dot unchanged (7–8 px, the active one a short bar). `page.js` fits the controls to each box: dots and arrows where both fit; dots only where only the dots fit (the 6-photo A/C cards at 1440 and 390); otherwise 44 px arrows with passive pips, `aria-hidden` and not focusable (the phone fan cards, the phone review carousel). The A/C grid goes to 2 columns from 900 to 1199 px so the dots fit there too. Measured: **0 tap targets under 44 px** at 390 and at 1440 (audit-mockup: 0 of 64).
- Fix 8, family and reviews: the copy is audited, so I shortened the stretch with type, not words. Meagan's quote is 18 px on the phone (was 19) beside the two short family paragraphs, with tighter spacing. The reviews are 18 px on desktop and 16 px on the phone (were 22 / 19), so the longest (Chloe, 467 characters) holds the stack at about half a phone screen, not a whole one. The phone family + quote run is now about one screen.
- New flaw found and fixed: the phone h1 at 48 px wrapped to two lines in the fallback face and snapped to one when Satisfy arrived, a 0.0225 load shift. Now it is `nowrap` with its height locked at 1.15em, and the phone size is min(48px, 12vw). Load CLS went to 0.0014. The phone bar is `visibility:hidden` while it is off screen, so it no longer registers a shift either.
- New: the phone bar steps aside over the closing section and the footer, which carry their own Book and Call.
- Inspector: 3 FAIL / 3 WARN (round 2: 4 / 7). Kept, each against the concept:
  - `eyebrow`: the clock labels (concept §3).
  - `text-shadow`: the white header wordmark and nav over the photo.
  - `covered-text` at 390: the persistent phone booking bar (playbook §3/§5) over a title at one screen boundary. Probed: `elementFromPoint` there is `nav.bar`.
  - `no-footage`: no usable video.
  - `side-scroll`: the slideshows.
  - `empty-middle` at 768: the two-column room grid's gutter.
- States:
  - Reduced motion: still, on the reef end frame.
  - No JS: the header scrolls away with no wordmark, the slideshows are swipeable rows, the Rosa block is one plain link, and the page is 390 wide.
  - Cold load (1.6 Mbps / 150 ms / 4× CPU): the blurred placeholder, then the photograph.
  - Last sheets checked for overflow, overlap and unreadable text: none found.

## hand-off checks (4e), round 3

1. Look loop: rounds 15 (first screen) and 16 (whole page + states) written up above. Every `dist/img` file comes from `src/make-media.sh`, re-run this round. Every flaw named is fixed or listed under conflicts. **pass**
2. The Booking CTA and `tel:` are asserted against the dossier in `data.py`. The audit tap-through lands on the Booking.com URL. Funnel: primary engine, hero engine, 1 click. **pass**
3. `node tools/check-design.mjs sites/coconut-surf-inn-guest-house-and-restaurant/mockups/calm/dist/index.html`: 0 problems, 0 warnings. **pass**
4. `node tools/check-places.mjs coconut-surf-inn-guest-house-and-restaurant`: 0 borrowed images. **pass**
5. Reduced motion looked at. `audit-mockup`: `scroll.early.cls` 0.0005, `scroll.settled.cls` 0. **pass**
6. Other businesses: unchanged from round 2. Calm's crop now shares unique's bottom line (y 1100) but not its frame: x 380–1820 against unique's full width, a blue sky against unique's white-lifted top, and a 16:9 at 1440 against unique's palms-to-the-green. **pass**
7. No usable video. The first screen is img-009 at ≥ 1200 px source, now showing the sea and the reef. Compared with the Booking.com fold above. **pass**

`audit-mockup` (phone, slow 4G, round 3):
- first load 893 KB (914,413 B; budget 1.5 MB);
- JS inline only;
- fonts 56 KB;
- largest image 79 KB;
- **LCP 596 ms**; CLS 0.0014; scroll CLS 0.0005 / 0;
- 0 images without alt; 0 of 64 taps under 44 px;
- third party: Google Fonts only (allowed at 4e).

## conflicts, round 3

None blocking. The rest of the round-2 list stands, with these changes:
- **"Desktop hero is mostly sky"** is resolved (round 15). The sky is still the larger part of the frame: about 80% to the horizon. The material sets that limit: below y 1100 come the wires and roofs, and every other sea frame is under 1200 px or date-stamped.
- **The phone hero** is drawn at about 2× its source on a 2× phone (an 850 px tall crop). It is a little soft. A taller crop brings back the wires.
- **The Rosa probe** is one extra request when the block nears the viewport. It is the only way to know a cross-origin frame failed. For 4g.
- **Dots on the phone fan cards and the phone review carousel** are passive pips beside 44 px arrows. 44 px dot buttons do not fit there; swipe and the arrows work.
