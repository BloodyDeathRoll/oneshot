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
