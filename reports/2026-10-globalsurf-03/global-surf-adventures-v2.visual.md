# global-surf-adventures-v2: visual-critic, station 4f, round 1

visual-critic 0.1.1 · run `2026-10-globalsurf-03` · 2026-10-17 · mode quick

**What I compared against**
- The current site, shot today with `tools/shoot.mjs`. The lodge page went to `reports/2026-10-globalsurf-03/current-site/shots/` and the home page to `…/current-site/home-shots/`. The dossier's `old-site-*.png` files are not on disk.
- The gold page `the-sign`, shot into `reports/2026-10-globalsurf-03/gold-the-sign/shots/`. Its photographs don't render locally, so it only calibrates the hero and the type.
- The mockup shots are the shared sets in `sites/global-surf-adventures-v2/mockups/<variant>/shots/`. They were re-shot this round: calm build 4105e942, interactive 3c1bef4d, unique c102f2cd.

**The Rosa widget is missing in every set because of how I shot it.** The pages are opened as `file://`, and Rosa's CSP `frame-ancestors *` blocks framing from a file origin (the console error is in `shoot.json`). Calm and unique show an empty white reserved box, and interactive shows nothing. I don't score the missing widget. I do score how each block looks when the embed fails, because a visitor sees exactly that.

**The current site** (lodge page, `current-site/shots/desktop-00.png`, `mobile-00.png`):
- Hero: a dark, desaturated YouTube still of palm tops against a purple sky, a serif title, a breadcrumb and the logo seal.
- Under it, "Choose your level" appears twice over unrelated paragraphs, next to a lead form.
- Further down (`desktop-sheet.png` frames 2–6): brush-script section titles ("Our Experiences", "Surf", "Wellness", "Nature", "Adventure") over staggered photographs on a sand ground. It is tasteful and has character.
- Then a Kuula 360° block that renders as a brown blur (frames 8–9), an Instagram strip, a "#BEGLOBAL" filler and a dense footer.
- A Messenger bubble sits on every frame.
- There are no prices and no rooms anywhere.

The bar it sets: warm editorial sections with handwritten titles. Its weak spots are the hero, the 360° block and the funnel.

---

## 1 · calm, "Walk to the water"

**Three-second test.**
- Desktop (`calm/shots/desktop-00.png`): a sunny beach, about ten guests walking at the camera with boards, "Next set is yours" and a crimson pill. It feels warm and social, and I'd keep scrolling. But my eye goes to the crowd and the big hotel block top-right first, then to the title. The frame is busy, and the title and button sit on top of people's torsos.
- Phone (`mobile-00.png`): the same scene. The title is legible, but the frame is visibly soft (video compression on faces and sand). The bottom 40 % of the screen is empty sand.

**Checklist**
- **Media.** The business's own vid-010 leads. The levels use strong stills: img-133 and img-099 in `desktop-01.png`, which are crisp and saturated. Level 1 is a soft video frame (pop-up on the sand), visibly duller than its two neighbours. img-005 is full-bleed for the featureLine and img-111 for the guests (`desktop-sheet` frames 5 and 13). The hero poster is soft at 1440 (`desktop-00.png`: faces and sand texture smeared).
- **Composition.**
  - Everything is a centred 1160 px container with centred text blocks: the levels row, the Freestylers card, two centred explanatory paragraphs, a centred rating pill (`desktop-02.png`).
  - The room slideshows at full container width are the strongest layout (`desktop-sheet` frames 7–10).
  - The rest is a stack of the same centred block pattern with little scale contrast.
- **Typography.**
  - Figtree is clean and readable.
  - Kalam 700 in teal for titles ("Choose your level", `desktop-01.png`) reads as felt-marker school-project rather than elegant. It is the weakest script of the three pages and below the current site's brush titles.
  - Body copy at ~15 px in grey in the long centred paragraphs (`desktop-02.png`) reads as fine print.
- **Colour.**
  - White, a cool grey tint, teal titles and crimson buttons. The crimson works with white text.
  - The teal titles plus crimson buttons plus grey tint feel generic SaaS rather than Sri Lankan coast.
- **Hierarchy and rhythm.**
  - Image moments alternate with text on white, which is reasonable.
  - The rooms section is three long stacked slideshows: about 2.5 screens of near-identical blocks (`desktop-sheet` frames 7–10).
  - The guests band puts the quote in white across the surfer's body and the bright sunset sky (`desktop-12.png`): the quote and her torso compete, and contrast is weak on the pale sky.
- **Polish.**
  - Buttons, chips and the footer are tidy.
  - The forecast's right half is an empty white card when the embed fails (`desktop-11.png`). That reads as broken.
  - Nothing overflows at 390 (`mobile-sheet.png`).
- **Distinctiveness.** Low. Apart from the photographs, this could be any surf-camp template. Nothing in the layout says "this lodge".

**Score: 7 / 10 (fail, below 8).** It sits below the gold `the-sign`, whose hero is a single crisp surfer on a blue wave with a confident script title. Calm is competent template level plus good photos.

**Better than the current site?**
- First screen: **yes** (`calm desktop-00` vs `current-site desktop-00`). Real guests in sun beat a murky palm-sky still with a breadcrumb.
- Whole page: **yes, but narrowly** (`calm desktop-sheet` vs `current-site desktop-sheet`). Calm wins on prices, rooms and booking. It loses on warmth and character: the current site's brush titles on sand are more beautiful than Kalam on grey.

**Fixes, biggest effect first**
1. **Hero frame.** Pick a cleaner, sharper moment for the poster and the first shot. The two women with mint soft-tops is the concept's own choice; the current poster is the whole group with a hotel block behind. Crop so the title sits on sand or sky, not on bodies. Check sharpness at 1440 and, if it's soft, encode the d1728 tier at a higher bitrate.
2. **Replace Kalam** with a more refined hand that is still readable. Put titles in ink or the crimson family, not teal, so the page has one accent.
3. **Break the centred-container monotony.** Make the levels row larger, with less grey prose under it: move the two explanatory paragraphs into a compact " | " line. Make one room full-bleed. Give at least one section an asymmetric split.
4. **Guests band.** Move the quote off the surfer: put it in the sky's darker lower third, or beside the photo on white.
5. **Forecast.** Give the reserved widget box a designed fallback state (the "See today's forecast for South Point on Rosa" link styled inside it), so it is never an empty white card.

**Keep:** the room slideshows at full container width, the img-005 featureLine moment, the crimson-on-white button system, the footer with icon buttons, and the phone bottom bar.

---

## 2 · interactive, "The ride"

**Three-second test.**
- Desktop (`interactive/shots/desktop-00.png`): a tuk-tuk with surfboards on the roof on a coast road. It is charming, specific and makes me smile.
- But the white logo top-left almost disappears into the bright sky and palms.
- The title "Surf weeks in Sri Lanka" sits on the dark tuk-tuk body, so it is legible.
- The frame is soft and grey-toned, with the road filling the bottom third.
- Phone (`mobile-00.png`, in `mobile-sheet.png`): a tight, dark crop of the tuk-tuk's canopy. You can't tell it is a tuk-tuk at 390. It is just a dark shape behind the title.

**Checklist**
- **Media.**
  - The level reel (`desktop-01.png`) uses the business's footage with the centre card raised. Level 1 is a backlit, washed-out frame.
  - The pool wipe pairs img-026 and img-060 (`desktop-sheet` frame 5). It is good material, but split 50/50 it reads as two photos side by side, not a reveal.
  - img-138 makes a strong 21:9 band (frame 8).
  - The dinner closing on img-023 puts the white title across the guests' faces (`desktop-sheet` frame 11).
- **Composition.**
  - The level reel with peeking cards has energy.
  - The amenities are a 3-column grid of 18 grey boxed chips (`desktop-sheet` frame 6). It looks like a settings panel, against Shahar's "no excessive borders/boxes".
  - The room mosaics (frame 7) are neat but small: three narrow columns of 2×2 thumbnails. They are not "gorgeous rooms sold".
- **Typography.**
  - Plus Jakarta Sans is crisp. Sacramento titles (`desktop-01.png`) are elegant and large.
  - Body copy on the grey tint is light and small.
  - "The waves" title is clipped under the header in `desktop-08.png` (a scroll position, minor).
- **Colour.** The tangerine button with white text is strong and unmistakable. With the teal titles and grey tint, the page is cohesive but cool.
- **Hierarchy and rhythm.**
  - Many interactive widgets, each in its own container: reel, toggle, wipe, chips, mosaic, quote carousel, Instagram row. The page feels busy and the "day" disappears, which is the failure the concept itself predicted.
  - The forecast block has a full empty right half (`desktop-08.png`), so the section looks unfinished.
- **Polish.**
  - On the phone, amenity chips wrap into 5-line boxes ("Yoga, meditation and sound healing sessions", `mobile-sheet` frame 7).
  - The closing band crops its title at the top (`mobile-sheet` frame 15).
- **Distinctiveness.** Medium. The tuk-tuk is the most specific idea in the run, but after the hero the page becomes a component library.

**Score: 7 / 10 (fail, below 8).** It is below `the-sign`: more widgets, less composure, and a softer hero.

**Better than the current site?**
- First screen: **yes on desktop** (`interactive desktop-00` vs `current-site desktop-00`). **Marginal on the phone** (`interactive mobile-00` vs `current-site mobile-00`): the dark tuk-tuk crop is no prettier than the current palm still.
- Whole page: **yes** on content and funnel. On beauty it is about level with the current site's editorial sections, not clearly above.

**Fixes, biggest effect first**
1. **Hero.**
   - Add a soft local shade behind the logo, or pick a frame with darker sky, so the logo reads.
   - Re-crop the phone poster so the boards on the roof and the road read: shift the focal point left and up.
   - Check sharpness at 1440.
2. **Amenities.** Replace the 18 boxed chips with a compact " | " paragraph or a borderless icon list in two columns, as Shahar's calibration asks.
3. **Rooms.** Sell them bigger: one room per row with a large lead photo and a 3-thumb strip, or at least double the mosaic size. Today they read as catalogue thumbnails.
4. **Closing band.** Move the title and buttons off the faces in img-023, onto the table or a darker area, or put them under the image on white. Fix the phone crop of the title.
5. **Pool wipe.** Start it at 85/15 so the top-down palm dominates and the drag reveals the second view. Also give the forecast box a designed fallback (see calm fix 5).

**Keep:** the tuk-tuk idea, the level reel with the raised centre card, the tangerine button, Sacramento at its current size, the img-138 band, and the footer.

---

## 3 · unique, "From the air" (scroll set-piece)

**Three-second test.**
- Desktop (`unique/shots/desktop-00.png`): the lodge from the air, white roofs and the blue pool in a sea of palms, the coast road and a blue truck. This is the only hero in the run that shows the business itself, and that is powerful.
- But "Your surf week starts here" in white Literata sits on the busy palm canopy and the white building. It is hard to read: "week" and "starts" dissolve into the trees.
- The pool-blue button is half lost against the pool-blue water just below it.
- Phone (`mobile-sheet` frame 1): the same problem, worse. "starts here" sits on the white wall and is barely legible.
- It is still the frame I'd most want to scroll past, because the place is right there.

**Checklist**
- **Media.**
  - The hero is the business's own aerial footage.
  - The level grid (`desktop-01.png`) leads with a large 7/12-column Level 1 frame that is overexposed and washed out: a backlit beginner against white glare. It is the weakest image in the run, placed in the biggest slot. Levels 2 and 3 (vid-002 barrels, `desktop-sheet` frame 3) are fine.
  - img-099 is a superb full-bleed barrel (frame 11), and img-093 (the dusk pool) a superb dinner close (frame 14).
- **Set-piece ("the drop", `desktop-04` → `05` → `06` → `07`).**
  - It is the best moment of the whole run. It explains the lodge in five seconds: coast road, roofs, the pool, then the pool with its palm from directly above, then water level with the featureLine.
  - The progress dots at right are discreet.
  - The descent reads as continuous: the pool in `desktop-05` sits where `desktop-06` lands.
  - But `desktop-05` (mid-zoom on img-062) is visibly soft and blocky. The roof textures and palms are smeared from upscaling.
  - `desktop-04` enters with the plate abruptly cut by the tint section's bottom edge.
  - On the phone (`mobile-sheet` frames 8–10), "The lodge" title repeats above each pinned plate. After the drop there is a ~300 px empty white gap before the lodge text (`mobile-10.png`), and the lodge text has no title of its own.
- **Composition.**
  - The asymmetric 7/5 level grid is the most editorial of the three.
  - The room viewer with the names as the control (`desktop-sheet` frame 10) is elegant, but the gallery is only ~55 % of the container and the right column is small text.
  - The guests section (frame 13) is a good split: img-129 silhouettes with a Literata italic quote.
  - The levels intro leaves the right half empty (`desktop-01.png`), a large dead area beside the title.
- **Typography.** Literata plus Parisienne is the most tasteful pairing in the run. It is closest to the current site's "readable face + handwritten titles" and is legible everywhere except on the hero.
- **Colour.** White, pale pool tint, green-black ink and a pool-blue button. It is coherent and belongs to the place. The blue button lacks punch on blue imagery (hero, featureLine area).
- **Hierarchy and rhythm.** This page has the best pacing in the run: editorial grid → tint inclusions with the overlapping breakfast photo → three-screen drop → rooms → barrel band → forecast → guests → dusk close → Instagram edge to edge.
- **Polish.**
  - The forecast's right card is empty white when the embed fails (`desktop-sheet` frame 12).
  - The mobile gap after the set-piece (above).
  - Everything else is clean.
- **Distinctiveness.** High. Nobody would take this for a template, and the drop belongs to this lodge only.

**Score: 7 / 10 (fail, below 8; the closest to passing).**
- At the set-piece, the barrel band and the dusk close it is above `the-sign`.
- It is pulled below 8 by the first screen: a title that doesn't read, and a booking button that blends into the pool.
- Also by the washed-out Level 1 lead and the soft mid-zoom.
- The hero is the moment Shahar judges first. With the fixes below, 8–9 is in reach.

**Better than the current site?**
- First screen: **yes** (`unique desktop-00` vs `current-site desktop-00`). The lodge in sun beats a murky palm still, even with the legibility problem.
- Whole page: **yes, clearly** (`unique desktop-sheet` vs `current-site desktop-sheet`). It is more beautiful, it is editorial with the same "serif + script" character the current site has, and it explains the place far better.

**Fixes, biggest effect first**
1. **Hero legibility.**
   - Choose a poster and opening frame where the centre is calmer. The sea or the sky at ≈ 1.8–2.6 s of the rise works, or shift the title onto the band of distant palms and sky.
   - Add a soft radial local shade behind the title.
   - Give the button a white ground with ink text, or a darker blue (`#084F6A`) with a white hairline-free shadow, so it separates from the pool. Check at 390, where "starts here" now sits on the white wall.
2. **Level 1 lead image.** Replace the overexposed backlit frame in the 7-column slot with a properly exposed beginner moment, such as vid-010 13.56–15.92 (women with mint soft-tops) or img-104/img-118. Or regrade it. As it stands, the biggest picture on the second screen looks like a mistake.
3. **Set-piece resolution.**
   - Cap the img-062 zoom so the deepest mid-motion frame stays at or under ~1.2× native, or use a larger source (6000 px originals exist upstream for img-001…034; check whether img-062 has one).
   - Fix the entry so plate 1 starts full-frame rather than cut by the tint edge.
4. **Phone set-piece.** Remove the repeated "The lodge" title over each plate, close the ~300 px white gap after the drop (`mobile-10.png`), and put the "The lodge" title above the lodge text it introduces.
5. **Rooms and forecast.**
   - Give the room gallery more width (≥ 65 %, or full container with the text below).
   - Fill the levels-intro dead area (move the intro into the left column beside the Level 1 image top).
   - Give the forecast box a designed fallback state.

**Keep:**
- The aerial hero footage and idea.
- The drop: all three plates, the pool-on-pool hand-off, the dots, and the featureLine on the water.
- Literata plus Parisienne.
- The 7/5 level grid structure.
- The overlapping breakfast photo.
- The img-099 barrel band, the img-129 guests split and the img-093 dusk close.
- The edge-to-edge Instagram strip and the footer.

---

## Visual ranking (quick mode, visual quality only)

1. **unique: 7, fail.** The only page with portfolio moments: the drop from the coast road into the palm pool, the barrel band and the dusk close. Fix the hero title and button legibility and the washed-out Level 1 lead and it should pass.
2. **calm: 7, fail.** Clean, readable and well organised, with beautiful room slideshows. But it is a centred template with a schoolbook marker script and a busy, soft hero.
3. **interactive: 7, fail.** The tuk-tuk is the most charming idea in the run. But the page dissolves into boxed widgets (amenity chips, mosaics, carousels), and its phone hero crop loses the tuk-tuk.

All three are better than the current site, on the first screen and on the whole page. None is at 8 yet. All three go back to the designer for round 2 before any human sees them.

---
---

# Round 2: visual-critic, station 4f

visual-critic 0.1.1 · run `2026-10-globalsurf-03` · 2026-10-17 · mode quick

**What I looked at**
- Shared shot sets in `sites/global-surf-adventures-v2/mockups/<variant>/shots/`, all shot after the round-2 build (2026-10-16T21:5xZ; no `dist` file is newer than its `shoot.json`). Calm was shot over http. Interactive and unique were shot over `file://`, so in those sheets the forecast's right half shows the designed fallback card, not the widget.
- My own http probe of the round-2 builds: served `mockups/` with `tools/_serve.mjs`, Playwright, 1440×900 and 390×844, 3 s after load, then scrolled to the forecast. The scratch shots are not kept. What it showed:
  - All three hero videos play: calm `hero-d1728.webm` / `hero-m608.webm`, interactive `ride-d1728.webm` / `ride-p810.webm`, unique `hero-d1728.webm` / `hero-p668.webm`.
  - Rosa's widget renders in all three, at 420×500 on desktop and 350×500 on the phone.
- Also looked at both booking pages (`calm/dist/book/`, `interactive/dist/book/`) at 1440 and 390, and unique's booking drawer opened from the hero at 1440 and 390.
- For the current site I reused `reports/2026-10-globalsurf-03/current-site/shots/` from round 1: the murky palm-sky hero, breadcrumb, Messenger bubble, brush-script sections on sand, the Kuula blur, no prices.
- The other critics' round-2 reports were not opened.

---

## 1 · calm, round 2

**Three-second test.**
- Desktop (`calm desktop-00.png`, mid-loop): three guests walk at the camera with mint and blue soft-tops in warm sun. "Next set is yours" and the crimson button sit centred. It is warm, bright and social, and I'd scroll.
  - The title still lands on the middle guest's board and torso at this point in the loop, but the halo makes it read cleanly.
  - The hotel block and the crowd from round 1 are gone.
- Phone (`calm mobile-00.png`): a drone frame over the whitewater, with a beginner riding below the button.
  - The frame is visibly soft and blocky. It is the `m608` rendition stretched to a 780-device-px screen.
  - The button sits on the surfer's head.
  - The bottom ~35 % is flat dark water.
  - A lighter band about 38 px tall runs across the very top above the logo, with a hard edge under it. It reads as a crop seam.

**Round-1 fixes re-checked**
1. Hero frame: **partly fixed.** Desktop is cleaner and warmer. The phone is now the weakest first screen of the three (soft, button over the surfer).
2. Kalam in teal: **fixed.** The script is now in ink (`desktop-01.png`: "Choose your level"). It is elegant and readable, and it sits with the old site's handwritten character instead of below it.
3. Centred monotony: **mostly fixed.**
   - The levels intro is now an asymmetric split, with the title and " | " facts on the left and the copy on the right.
   - The level photos are large and crisp (`desktop-01.png`: img-133 surf lesson on sand, the rider, the barrel).
   - Rooms are now a split, with the photo bleeding left and the text on the right (`desktop-sheet` frame 7).
   - What's included pairs text with a photo slideshow (frame 4).
4. Guests band: **fixed.** It is now a split, with the sunset surfer left and the quote in ink on white right (frame 10). On the phone the quote sits under the photo.
5. Forecast: **fixed.** The designed card shows where Rosa is refused. Over http the widget renders beside a big "0.4–0.6 m" headline (frame 9 and the probe).

**Checklist**
- **Media.** The business's video leads. img-005 is used for the featureLine on the pool, img-138 for the rider band, and img-099 for the barrel. The levels use the three strongest stills. Only the phone hero rendition is soft.
- **Composition.** Better scale contrast than round 1.
  - The empty tint band between the levels and "What's included" (frame 3 bottom) is dead space.
  - The tail is weak: "Book the week for your level." sits beside a food photo that is cut by the screen edge (frame 11), then a food photo is half-visible above "Follow the lodge" (frame 12).
- **Typography.** Figtree with an ink script. The script is tasteful. Body copy is still small and grey in the lodge paragraph (frame 6).
- **Colour.** White, cool tint, ink and crimson. Clean, and the crimson is unmistakable. Still more "nice resort template" than south coast of Sri Lanka.
- **Hierarchy and rhythm.** Image bands alternate with white splits. The rhythm is good through the rooms. The closing third loses pace.
- **Polish.** Tidy buttons, icon list and footer, and a phone bar with the price. The issues are the phone hero seam and softness, and the cut-off closing images.
- **Distinctiveness.** Medium-low. It is professional, but the layout could carry any surf camp. The photos carry the identity.

**Booking page (`/book/`).** The pool-terrace band carries the script title, the level cards are 4:5 with ink checks, the included list sits on one tint card and the total card is clear. It feels like the same site. The script title over the string lights is a little busy.

**Score: 8 / 10, pass (just).** It is clearly professional and beautiful in its photographs, and now has a type voice of its own. It is below the gold `the-sign` in distinctiveness and in the phone first screen, which is the one thing that could drop it back under the bar.

**Better than the current site?**
- First screen: **yes** (`calm desktop-00` vs `current-site desktop-00`): bright guests and one button against a murky palm still with a breadcrumb.
- On the phone: **yes, narrowly** (`calm mobile-00` vs `current-site mobile-00`).
- Whole page: **yes** (`calm desktop-sheet` vs `current-site desktop-sheet`). It now matches the old site's handwritten warmth and beats it on photography, rooms and the funnel.

**Remaining fixes**
1. **Phone hero.**
   - Cut a phone master from the native source at ≥ 780 px wide instead of stretching `m608`.
   - Remove the light seam at the top.
   - Move the title and button up into the whitewater, or pick a frame where the surfer is below the button rather than under it.
2. **Closing third.** Give "Book the week" a full, uncut photograph (or the dusk pool, full-bleed, with the title on it), and stop the food photo bleeding into "Follow the lodge".
3. **Dead tint band.** Remove the empty tint band between the levels and "What's included".

**Keep:** the ink script, the levels split, the split rooms with slideshows, the featureLine on the pool, the barrel band, the guests split, the forecast pairing and the footer.

---

## 2 · interactive, round 2

**Three-second test.**
- Desktop (`interactive desktop-00.png`): a bright reef aerial. Turquoise water, surfers waiting in the line-up, white sets on the left and the palm coast across the top. "Surf weeks in Sri Lanka" and a tangerine pill sit dead centre on calm water. It is the cleanest, most legible first screen of the run. The logo and nav read on the sky.
- Phone (`interactive mobile-sheet` frame 1): the same reef, bright, with the title and button on water. In my 3 s http probe the loop has moved on to the palm over the pool, and the title still reads thanks to its shade.
- Round 1's dark tuk-tuk crop is gone.

**Round-1 fixes re-checked**
1. Hero logo, phone crop and sharpness: **fixed.**
2. Amenity chips: **fixed.** They are now a borderless two-column icon list (`desktop-sheet` frame 6; phone frame 7).
3. Rooms: **fixed.** Each room is a large lead photo with a 3-thumb strip and a "6 photos" badge, alternating left and right (frames 7–8). They now sell.
4. Closing band: **fixed.** The faces are clear above, and the white card with "Book the week for your level" sits low on the table (frame 12).
5. Pool wipe and forecast: **forecast fixed.** The designed fallback card shows, and the widget renders over http. The wipe still reads as two photos side by side (frame 5), but it is acceptable.

**Checklist**
- **Media.** The business's aerial video leads. The level reel uses the footage. img-138 is a big rider band. The level 1 card (on the reel) is a darker, softer video frame than its neighbours.
- **Composition.**
  - The reel with peeking cards, the toggle, the wipe and the alternating rooms add up to a clear, lively sequence.
  - The dead white area between the lodge amenities and "Our rooms" is about a third of a screen at 1440 (frame 6) and appears again on the phone (frame 7 bottom).
- **Typography.** Plus Jakarta Sans with Sacramento in teal. Sacramento is graceful at its size ("Choose your level", "The waves"). At small sizes and in teal it is thin.
  - The lodge featureLine on the pool wipe sits left-aligned and runs right up to the wipe handle on the phone (frame 6).
- **Colour.** Reef blue, white, tint and tangerine with white text. Cohesive, and the booking colour is strong.
- **Hierarchy and rhythm.** It is no longer a component library. Each interaction now earns its place, with image bands in between.
- **Polish.** The issues are the dead space above the rooms and the tight featureLine on the phone wipe. The footer, phone bar and buttons are good.
- **Distinctiveness.** Medium. The hero now says "this reef", but the tuk-tuk, the run's most specific idea, has moved deeper into the loop.

**Booking page (`/book/`).** The step pills, the big Sacramento "Your level", the 4:5 level cards with video frames and the sticky summary card with a tangerine total are clean and consistent with home. The level 2 and 3 card frames are greyish next to the bright home page.

**Score: 8 / 10, pass.** It has the strongest first screen of the run and a clean, lively body. It is held from 9 by the empty bands, the thin script, and a middle that is good rather than memorable. It is about level with `the-sign` on the hero and below it on composure.

**Better than the current site?**
- First screen: **yes** (`interactive desktop-00` / `mobile-00` vs `current-site desktop-00` / `mobile-00`). Bright reef and one button against a murky palm still, at both widths now.
- Whole page: **yes** (`interactive desktop-sheet` vs `current-site desktop-sheet`).

**Remaining fixes**
1. **Dead white band.** Remove the band between the lodge amenities and "Our rooms" (1440 and 390).
2. **Pool-wipe featureLine on the phone.** Centre it and keep it inside the left half with margin, or move it under the wipe.
3. **Brighten the frames.** Lift the level 1 reel frame and the `/book/` level 2–3 frames, or swap them for brighter moments, so they match the hero's brightness.

**Keep:** the reef hero, the level reel, the borderless amenity list, the alternating rooms with thumb strips, the img-138 band, the closing card, the forecast pairing, the booking page's summary card, and the tangerine.

---

## 3 · unique, round 2 (scroll set-piece)

**Three-second test.**
- Desktop (`unique desktop-00.png`): a high aerial of the coast. Reef and whitewater on the left, the beach curving into palms, the coast road on the right, distant hills. "Your surf week starts here" in Literata reads cleanly over the calm water and reef, and the deep pool-blue button stands clear.
  - In my 3 s probe the rise has moved over the palms and houses. The title still reads thanks to the local shade.
- Phone (`unique mobile-sheet` frame 1, and the probe at 3 s): the coast at the poster, then the lodge itself, with white roofs and the blue pool under the title. Legible and sharp. It is the most "this place" first screen in the run.

**Round-1 fixes re-checked**
1. Hero legibility: **fixed** at both widths, and the button no longer blends into the water.
2. Level 1 lead: **improved, not solved.** The backlit glare is gone, and it is now a guide and a laughing beginner in the whitewater (`desktop-01.png`). It is properly exposed, but grey-green, soft and low in contrast. It is still the dullest image in the largest slot on the second screen.
3. Set-piece resolution and entry:
   - **Resolution fixed.** In `desktop-05.png` (the img-062 mid-zoom on the lodge: road, roofs, pool and palm) the image is clean, with only slight softness and no blockiness.
   - **Entry fixed.** In `desktop-sheet` frame 5 the plate now starts as a framed card that grows.
   - The pool-on-pool hand-off to img-026 (frame 7) and the featureLine on the water (frame 8) remain the best sequence of the run.
4. Phone set-piece: **mostly fixed.** The repeated titles are gone and "The lodge" heads its own text (frame 10). A white gap still shows above the pinned plate (frames 8–9).
5. Rooms, dead area and forecast: **fixed.**
   - The room gallery is full container width with the names as tabs, and the text is in two columns below (frames 10–11).
   - The 8.6 Booking.com proof fills the space beside the levels intro.
   - The fallback card is designed, and over http the widget renders beside "0.4–0.6 m | 7 s | 4 km/h" (probe).

**Checklist**
- **Media.** The business's own aerials lead, then the drop through its own lodge. img-099 is a full-bleed barrel band, img-129 the yoga silhouettes, and the night lodge with string lights makes the close (frame 14). Two weak points:
  - the Level 1 frame;
  - the booking drawer's header, which is the same Level 1 video frame blown up to about 820 px wide. It is soft and smeared (unique drawer probe at 1440).
- **Composition.** It is the most editorial page: the 7/5 levels grid, the overlapping breakfast card on the tint, the three-plate drop, the full-width room viewer, the barrel band, the forecast split, the guests split, the night close, and the Instagram strip edge to edge. The levels grid is uneven (frame 3): Level 3's button floats lower than Level 1's.
- **Typography.** Literata with Parisienne is the most tasteful pairing in the run and the closest to the old site's readable face plus handwritten titles. The drawer stacks two script titles ("Book your week", then "Your level"), which is one too many.
- **Colour.** White, pale pool tint, green-black ink and a deep pool-blue button. Coherent, and of the place.
- **Hierarchy and rhythm.** This is the best pacing of the three. The drop gives the page a centre, and the sections vary in scale.
- **Polish.** Nearly clean. The remaining issues:
  - the white gap before the phone plate;
  - on the phone, a white stretch between the forecast card and a cropped sunset photo (frame 15);
  - the soft drawer header.
- **Distinctiveness.** High. The descent from the coast road onto this lodge's own pool belongs to no other business.

**Score: 8.5 / 10, pass.** It is above `the-sign` at the drop, the barrel band and the night close, and level with it on the hero. It is kept from 9 by the dull Level 1 lead and the soft drawer header, the two images a buyer sees right before choosing.

**Better than the current site?**
- First screen: **yes** (`unique desktop-00` / `mobile-00` vs `current-site desktop-00` / `mobile-00`). The coast and then the lodge itself, bright and legible, against a murky palm still.
- Whole page: **yes, clearly** (`unique desktop-sheet` vs `current-site desktop-sheet`). It has the same serif-plus-script character, far better photography, a real explanation of the place, and prices and rooms the old site never shows.

**Remaining fixes**
1. **Level 1 lead** (7-column slot and drawer header). Use a bright, sharp beginner moment: img-104, img-118, or the calm page's img-133 lesson on the sand. Show the drawer header at no more than its native width, or use a still photograph there.
2. **Drawer.** Drop the second script title: keep "Book your week" and set "Your level" as a plain step label.
3. **Phone gaps.** Close the white gap above the pinned plate and the gap between the forecast card and the guests photo (frames 8, 9 and 15). Align the level buttons on the 7/5 grid.

**Keep:** everything listed in the round-1 keep list, plus the new coast poster, the deeper button, the 8.6 proof beside the intro, the full-width room viewer and the forecast pairing.

---

## Visual ranking, round 2 (quick mode, visual quality only)

1. **unique: 8.5, pass.** It is the one page with portfolio moments: the descent onto the lodge's own pool, the barrel band and the night close. Only a dull Level 1 image and a soft drawer header keep it from 9.
2. **interactive: 8, pass.** It has the brightest, cleanest first screen of the run (the reef aerial) and a lively body that is no longer a widget catalogue. Some empty bands remain.
3. **calm: 8, pass (just).** It is clean and warm now, with a fine ink script and split layouts. It is the least distinctive of the three, and its phone hero is soft and crowded.

All three are better than the current site, on the first screen and on the whole page. From the visual side, all three can go to the human pick, with the remaining fixes listed above.
