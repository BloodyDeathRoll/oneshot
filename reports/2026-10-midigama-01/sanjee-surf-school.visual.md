# Sanjee Surf School — visual-critic

## Round 1 — quick (station 4f)

Run `2026-10-midigama-01` · station 4f (quick, the three mockups) · **round 1** · visual-critic 0.2.0 · 2026-11-05.
Pages: `sites/sanjee-surf-school/mockups/{calm,interactive,unique}/dist/`, served over http from my own servers on 9350, 9351 and 9352. Concepts: `sites/sanjee-surf-school/concepts.md` (creative-director 0.6.1).

Independence: I did not open the critic's or experience-critic's report or folder, or any designer's `notes.md`.

### How I looked

Screenshots are scratch and get deleted after the round, so every line below says in words what its file shows. All paths are under `reports/2026-10-midigama-01/visual-sanjee-r1/`.

- **Shot sets:** `calm/`, `interactive/`, `unique/`, from `tools/shoot.mjs` over http at 1440 and 390. No console errors in any.
- **Timed first screens:** `motion/`, a burst for the first 2.5 s, then one frame a second to 18 s, at both widths, under SwiftShader.
- **Real GPU sequences:** `gpu/`, frames about every 0.3–0.4 s through 10–14 s at both widths, with new-headless Chromium reporting "ANGLE Metal Renderer: Apple M1".
- **States:** `states/` and `states2/`: `?swell=` frozen frames, `?still`, `?nogl`, 1920 wide, reduced motion, hover and press, tile and sheet states, phone menus, human-pace wheel scroll.
- **Tasteskill inspector:** calm 3 FAIL / 4 WARN, interactive 3 FAIL / 6 WARN, unique 5 FAIL / 8 WARN. `tools/check-design.mjs` passes all three with 0 problems and 0 warnings.

**Limits, stated plainly:**
- I judged motion from frame sequences, change measurements and pixel-over-time images. I did not watch live playback, so "reads as" is an inference from those.
- Nothing was measured on a phone. rAF ran at a median of 16.7 ms and a p95 of 18.6 ms on the M1's GPU, and at a median of 16.7 ms and a p95 of about 50 ms under SwiftShader (unique). rAF pacing is not shader draw time, and an M1 is not a mid-range Android, so **phone frame rate is unknown**.
- The current site was judged from captures only, as instructed: `dossier/.../assets/old-site-*.png` and `funnel/walk/`. Its serif headings look like a Times-style face, and I cannot tell whether that is its real font or a capture fallback.
- No business video has been seen by anyone. vid-001 and vid-002 are not on disk.
- Gold: Lavish, KA and Layday rendered in full. Global Surf's clips do not exist in this worktree, so `gold-the-sign.png` shows only a blank blue ground with the title and button. I saw its form, not its footage.
- `/impeccable critique`, `/emil-design-eng` and the motion-audit skills were not run. Evidence is my own looking plus the inspector.

**False alarm to ignore:** in every SwiftShader set, including `tools/shoot.mjs`, unique's prints appear cut by a straight line once the page is scrolled, leaving a white gap (`states/unique-d-scroll300.png`, `states2/sheet-uni-wheel.png`). **This is a capture artefact, not a page bug.** The canvas buffer read back at scrollY 300 holds whole prints (`clip/swiftshader-d-canvas-buffer.png`), and on the Metal GPU they are whole at both widths (`clip/newheadless-d-y300.png`, `clip/newheadless-m-y300.png`). I did not count it.

### The current site

- **First screen** (`current/old-desktop-fold.png`, `funnel/walk/01-home-fold-settled.png`): an infinity pool under pandanus trunks, with the sea through the branches. It is a genuinely atmospheric picture under a dim overlay. The white "Ride the Wave" reads, "of Your Life" in teal gets lost against the trunks and water, and the teal eyebrow is illegible. A cookie box covers the bottom. It names neither the school nor Weligama.
- **Whole page** (`current/old-desktop-a.png`, `-b.png`, `old-site-desktop.png`): a generic teal template with eyebrows, two-tone headings, check-list cards, and stat rows like "100% Passion".
- **What it has that the new pages lack:** visual wealth. A nine-photo Coco Beach mosaic at real size is the best moment on it, and a large instructor card carries the img-007 surfer. That mosaic is why "better than the current site" is not automatic here.

### Material rulings

- **Video hard fail:** not triggered. vid-001 and vid-002 are business-owned but no file exists, and concepts §2 records Alon's decision to go on stills. I accept that.
- **Photographs ≥ 1920 px:** img-002 (2000×1500) is the only own landscape at that width. Ruled per variant below.

---

## 1 · calm "The sand"

**Three-second test**
- **1440 (`calm/desktop-00.png`):** a saturated blue sky, a rust headland low right, a navy title and a red button. Bright, clear and immediately pleasant. It reads as a holiday-resort shot: the tiled roofs look like a hotel, and **nothing says surfing except the words.** My eye then drops to the white blob along the bottom edge. I would scroll, without excitement.
- **390 (`calm/mobile-00.png`, `crops/phones-four.png`):** better composed than desktop. The headland fills the lower half, and the title and button sit cleanly in the sky. The wash line is thin here and looks fine.

**First-screen ruling: MEETS the full-bleed and small-photograph rules.**
- Full-bleed from img-002, the file being 1960 px wide. It is drawn at 1440, so 1.36 source px per css px, and is about 1:1 at 1920 (`states/calm-w-fold.png`). Phone: a 692 px wide file across 390 css px, 1.77 source px per css px, which is fine on a 2× screen and a little soft on 3×.
- Only the header, one title and one button are on it. The title is centred horizontally, slightly above the vertical centre, and sits in empty sky. Unobstructed apart from the wash at the foot.
- It obeys every rule and is still the plain centred-title-over-a-still form. That is the cookie-cutter section Shahar described, redeemed only by the colour.

**Checklist**
- **Media:** the best wide picture leads, well cropped. But **the page has no action until far down.** The only surfer riding a wave is img-006, a 423 css px print next to "Other waves" (`calm/desktop-07.png`). img-007, the best action frame and the one the old site uses large, is not on the page. The print sizes are honest and none looks upscaled. Oversharpening in img-002 shows at 1:1 in the foliage (`calm/desktop-00.png`), acceptable.
- **Composition and grid:** orderly centred column and 7/5 splits (`calm/desktop-01.png`, `-05.png`), with nothing broken. Long runs are one print beside a little text. In `calm/desktop-08.png` and `-09.png`, tour text sits on the left and price and a red square on the far right, with a gap of about 450 px. The img-009 band is the one calm, full-width pause that works (`calm/desktop-03.png`).
- **Typography:** the best-behaved pair of the three. Source Sans 3 is readable and Mr Dafoe has real character (`calm/desktop-01.png`, `-05.png`). Its steep slant makes "Coco Beach is our home spot, a beach break." a strain as a two-line title (`calm/desktop-06.png`).
- **Colour:** bright, clean and from the place. The red booking colour is unmistakable, white on red. The pale `#D2EAF7` lesson rows are calm but make a soft, uniform page (`calm/desktop-02.png`).
- **Hierarchy and rhythm:** the eye always finds the button. The pace is white, tint, one band, white, white, white, closing. The twelve red icon squares are the loudest thing in the lower page (`calm/desktop-08.png`, `-09.png`).
- **Polish:** clean. The exception is the wash line, which is the one thing that looks wrong.
- **Distinctiveness:** the headland is this place. Below the hero it is a tidy template, and most of it could be any school.
- **Hero and motion:** see below. Micro-animations I saw: button darkens on hover and on press (`states2/sheet-btn-calm.png`), phone menu opens as a clean card (`states2/sheet-menus.png`), slideshow dot stretches into a bar (`calm/desktop-06.png`).

**Motion: what I observed**
- A single event on load. The white shape rises from about 22 px low, overshoots by 12 px and settles in 900 ms; a second translucent layer follows over 1200 ms (`crops/calm-wash-run.png`, sampled at 0, 200, 400, 600, 900 and 2000 ms). After that **the first screen is completely static**: zero change across all fifteen 1 s steps from t = 3 s, at both widths.
- **It does not read as water on desktop.** Settled, it is a white vector shape with a parallel grey-lilac outline, the `.wash.film` layer at 50 % (`crops/calm-wash-1x.png`, `crops/calm-wash-left3x.png`). The lobes are regular and about 140 px wide. It rides up over the green water between x≈270 and x≈620 instead of following the sand. It looks like a stock SVG wave divider with a stroke, or torn paper.
- **On the phone it reads acceptably** as a thin soft edge on the sand (`crops/calm-wash-m.png`).
- At about a second, the run-up is over almost before anyone looks at it. CSS only, so GPU limits do not apply.

**Score: 6 / 10.** Clean, bright and professional at competent-template level. Closest to Global Surf `the-sign` in first-screen form, as far as I could see it, and below it because a still is not footage and the sections are not designed moments. **Below 8: hard fail.**

**Better than the current site: NO, as "clearly better".**
- First screen **yes** (`calm/desktop-00.png` vs `current/old-desktop-fold.png`): clear, bright, says what and where, one button, no cookie box.
- Whole page **not clearly** (`calm/desktop-sheet.png` vs `old-site-desktop.png`): cleaner, more coherent and free of the fake-stat clutter, but plainer. The old page's mosaic and large surfer card have more pull than calm's white runs and small prints.

**Fix list**
1. **Rebuild the wash line, or remove it on desktop.** `.wash` and `.wash.film` in `src/page.css` and the shape in `src/wash.json`, at the hero foot and again at `section.closing`. Remove the permanent parallel outline by fading `.wash.film` to 0 as it settles, like foam draining. Halve the amplitude and break the regular lobes. Keep the white entirely below the sand line so it never covers the water. Slow the run-up to about 1.4 s. Keep the phone version's scale as the model.
2. **Put a surfer high on the page.** After the hero, at `section.shallows` (#who), a picture of someone riding a wave must appear in the first or second screen. Today the first one is at `section.outside`. Use img-006 at up to 520 css px, or img-007 at up to 640 css px if the rights question clears; let it overlap the hero's lower edge so it shows above the fold at 1440.
3. **Give the page a mosaic.** In `section.outside` (#waves) replace the single img-013 print with real masonry of img-013, 014, 012, 017, 018 and 020 at their real sizes. The old site's Coco Beach block is the moment to beat, and these are the same pictures.
4. **Fix the tour list** in `section.coast` (#tuktuk). Bring the price next to its text, close the gap of about 450 px, and make the twelve icon buttons a quiet tint at rest, red on hover or tap, so the lower page stops being a column of red squares.
5. **Crop the closing picture** in `section.closing`: take img-019 down to foam and footprints. At 1440 the top of the half-bleed arrives as empty sky beside an empty left column, so "Finding us" opens on nothing (`calm/desktop-09.png`).

**Keep:** the first-screen crop, palette and red; the type pair; the three stacked lesson rows; the img-009 band; the Sanjee split (`calm/desktop-05.png`); the phone first screen.

---

## 2 · interactive "Where you start"

**Three-second test**
- **1440 (`interactive/desktop-00.png`):** a wide, flat band of teal water under a pale hazy sky, with one small dark figure in the middle. A heavy near-black title and a navy button sit low on the water. Honest and on subject, since this is a person going surfing, but bland and low in contrast. Bright specks along the bottom edge look like dust on the screen. It looks like a soft holiday snapshot blown up, and I felt nothing.
- **390 (`interactive/mobile-00.png`, `crops/int-m-2x.png`):** the softest first screen of the set. The picture has an oily, compressed look at phone resolution. The figure reads better here than on desktop because it is relatively larger.

**First-screen ruling: DOES NOT MEET the rule on ≥ 1920 px photographs. Meets the 1200 px floor by the letter only.**
- Full-bleed, source 1600×1067, above the 1200 px floor, and `check-design` passes. Desktop: 1.11 source px per css px at 1440, and upscaled about 1.2× at 1920 (`states/interactive-w-fold.png`).
- **On a phone the crop is only about 493 source px across 390 css px**, 1.26 source px per css px on a 2–3× screen, drawn through a 507×1097 canvas. That passes the check and fails what the floor is for: stopping a soft photo from filling a phone.
- **Rubric hard fail, by my ruling.** The business has a ≥ 1920 px photograph and the first screen carries none. The concept's reason is that img-009 is the only picture of someone going out, on water that moves. The reason depends on the motion paying off, and as built it does not, while the 2000 px bay is held back to the page's last screen. **I do not accept the reason as built.** I would accept this picture if the swell visibly travels and the phone picture holds up.
- The title in the lower third is a departure from the calibration, and I accept it: it keeps clear of the paddler. It is not what is wrong here. Only the header, title and button are on the screen.

**Checklist**
- **Media:** the hero is the weakest of the three leads. The real strengths come later: **the sunset band (img-018, `interactive/desktop-05.png`) is the best full-bleed moment in the set**, and the large img-007 with Sanjee's words is strong (`interactive/desktop-06.png`). The page has its best material the wrong way round.
- **Composition and grid:** tool-like and orderly, too much like product UI.
  - Three nested levels of rounded rectangle: grey panel, white tile, white card (`states/interactive-d-tile-after.png`).
  - Lesson cards have holes of about 100 px above the buttons, because all match the Week Intensive's height (`interactive/desktop-02.png`, `interactive/mobile-02.png`).
  - The message panel has a large empty white bubble (`interactive/desktop-02.png`).
- **Typography:** Manrope is clean with tight tracking. **Covered By Your Grace is the page's biggest type problem:** thin, wide word gaps ("Who  we  teach"), a lower-case "sanjee", and it looks like school-notebook marker beside a SaaS sans (`interactive/desktop-06.png`, `states/interactive-d-tile-after.png`). The same complaint applies at the level of "tasteful and readable", which is the calibration's bar.
- **Colour:** the cobalt is unmistakable with white text. The grey `#D6DAE0` panels are dull and belong to a dashboard, not a beach (`states/interactive-d-tile-after.png`). The lower half of the page is pale except for the sunset and bay.
- **Hierarchy and rhythm:** the booking logic is the clearest of the three. The hero title is then immediately repeated at 48 px (`interactive/desktop-01.png`). The pace improves a lot from the sunset down.
- **Polish:** careful. Inspector: resting shadows on `li.card`, 19 font sizes. Board chart: tails cut flat on the baseline, all one grey-blue (`states/interactive-d-boards.png`, `interactive/mobile-05.png`).
- **Distinctiveness:** the to-scale board chart is a real idea and belongs to this school. The rest could be a booking product's template.
- **Hero and motion:** see below. Micro-animations I saw as end states: selected tile tint, "for you" dots on the matching cards (`states/interactive-d-tile-after.png`), Soft-top / Hardboard pill on phone (`interactive/mobile-06.png`), "Add to my message" turning into "In my message" with the card outlined and the message text updated (`states/interactive-d-added.png`). These work and are the page's strength.

**Motion: what I observed**
- The shader runs continuously on the Metal GPU, with no console errors except "GPU stall" under SwiftShader. Sky and horizon are locked.
- Amplified difference (`crops/int-diff-3s-x10.png`): horizontal streaks along the water's own rows, a broad brightness drift in the bottom band, and **dark, unmoving discs** around the paddler (about 180 px wide) and the other two heads.
- Size of the change: a mean of 0.6–1.2 grey levels per 0.3–0.4 s step (`gpu/`), 1.6–2.4 per 1 s step. Comparing frames 2 s apart at 1:1 and 3× (`crops/int-paddler-1x.png`, `gpu/paddler-3x.png`), they are hard to tell apart. No halo around the paddler, no visible warping of him, and no jelly.
- **It does not read as a swell.** A single column of pixels over about 9 s (`gpu/kymo-int-x1000.png`) shows the bands **staying at the same height, with almost no slope**: only slow brightness drift in the bottom band. The water shimmers in place. The crest never moves and the wave never arrives. The paddler and his splash stay frozen, so the one thing that should be moving does not.
- **Verdict:** it does read as water, not as an artefact, and it avoids the failure the concept feared. But it is so subtle that many visitors will not notice it, and a glance sees a still. As the variant's main item it is not interesting enough, which by the 2026-10-20 rule means not an 8.
- Phone: same shimmer on the lower-resolution canvas. Reduced motion: still photograph (`states/interactive-m-reduced.png`).

**Score: 5 / 10.** Clear and useful, with one good chart and one fine band, but the first screen is flat and soft, and the page looks like a booking product. For its tile-tap booking the closest reference is White Desert (references #5), without that site's art direction. Far below the Global Surf bar. **Below 8: hard fail, plus the ≥ 1920 px first-screen hard fail above.**

**Better than the current site: NO.**
- First screen **no** (`interactive/desktop-00.png` vs `current/old-desktop-fold.png`; `crops/phones-four.png`): clearer and on subject, but the old screen, with its problems, is the richer picture. Not clearly better.
- Whole page **no** (`interactive/desktop-sheet.png` vs `old-site-desktop.png`): better to book from, not better to look at. Grey panels against the old mosaic and large surfer lose on pull.

**Fix list**
1. **Change the hero, or make it earn its place.**
   - Preferred: **move the shader to img-018**, the sunset (1440×1920; landscape crop at 1440, native portrait on a phone, so far sharper than today's 493 px; above 1440 wide it would upscale, so cap it as img-009 is capped today). Its 1920 px long edge counts as a ≥ 1920 px photograph on the reading in concepts §2, which also clears my hard-fail ruling. Water carrying a sun's reflection should read as moving water far more than this flat teal, and tiny figures in the shore break keep it about surfing. Move the title into the sky. Check it side by side with Coconut's and Lotus's heroes for divergence; a new band is then needed where the sunset sits today.
   - If img-009 stays: in `src/swell.js`, make a front visibly travel toward the shore, raise the crest's displacement well beyond the current ≤ 3 px, and let the paddler ride it with a small bob instead of sitting in a frozen disc. Grade the picture for contrast, and tighten the crop to reduce the empty sky.
2. **Replace the section-title face** (`h2.script`, Covered By Your Grace). Use a hand with more weight and tighter word spacing, tested on "Sanjee, head instructor" and "Other waves, as we rate them".
3. **Get rid of the dashboard** in `section.where` and `section.msg-wrap`. Take the grey panel away and use white or a colour from the water. Drop the resting shadows on `li.card`. **Give each level tile its own picture**: img-005 for Total beginner, img-008 for I can stand up, img-009, img-006, and so on, which is also custom.md's "levels with their footage".
4. **Close the holes in the lesson cards** (`li.card`). Stop stretching to equal height, or carry the Week Intensive paragraph outside its card directly beneath it, keeping it together as the copy review requires. Demote "Add to my message" from a second full-width button to a small chip. Shrink the empty message bubble in `#message` to its text.
5. **Finish the board chart** in `section.boards-sec`. Draw real tails instead of the flat cut at the baseline, and colour the boards from the school's own soft-tops (the red and blue of img-005) instead of one grey-blue. It is the page's one original idea and should look like it.

**Keep:** tile-to-message logic; the sunset band; the large img-007 with Sanjee's words; the sticky tour column; the "for you" dots; the to-scale chart as an idea.

---

## 3 · unique "The set"

**Three-second test**
- **1440 (`unique/desktop-00.png`):** fat black italic title, pink button, and then five photographs colliding. **The first thing I actually see is the surfer**, the strongest subject on any of the three first screens. Then the mess: the bay is cut by him, the sunset is half hidden, the other prints stick out behind. It has energy and character, and it looks like a scrapbook or a slide collage. It is not clean and slick. I would keep scrolling, mainly out of curiosity.
- **390 (`unique/mobile-00.png`, `states/unique-m-still.png`, `crops/phones-four.png`):** **the best single screen in the set, on the width that matters most.** A big clear surfer on a yellow board, a confident title and a full-width button, with the headland behind. The collage collapses into something clear.

**First-screen ruling: DOES NOT MEET the full-bleed rule. MEETS the small-photograph rule.**
- **Small photographs: passes.** Every print is at or under its native size: img-007 (962 px) at 520 css px on desktop and 367 on a phone, img-002 file 1760 at 880 css px, the back row at 300–400 css px. Nothing is upscaled, which is the concept's strongest claim, and it is true.
- **Full-bleed: fails.** A ≥ 1920 px photograph exists, so a full-bleed first screen is the default (designer base.md constraint 7). The fallbacks in references #8, #9, #10 and #27 are for material that is genuinely small, and here the material is not: calm proves img-002 holds the full screen. custom.md's "full-bleed, clear, unobstructed" is missed three ways: no full-bleed, img-002 shown at 880 css px with about 22 % of it under img-007, and a rating line added to title and button.
- **Rubric hard fail: not triggered**, because img-002 is on the first screen. The concept's reason, that the action shots are the real subject and they are small, is a good reason for the prints. It is not a reason to shrink and cover the one big picture.
- Against the bar: KA and Lavish also skip the full-bleed and work, because each is one decisive gesture. This is five.

**Checklist**
- **Media:** uses the most of the business's own material, and the best action frame big. The imagery is the most alive of the three. `section.band` is the exception: img-020 is a grey, flat overcast sky with visible compression blocks around the sun (`unique/desktop-04.png`, `crops/uni-band-sky-2x.png`).
- **Composition and grid:** the boldest and the most uneven.
  - **Stepped prices on the blue block are the best mid-page moment in the set** (`unique/desktop-01.png`).
  - The "Lessons" title sits about 40 px lower than "Who we teach" beside it, and looks like an error, not a step (`unique/desktop-01.png`).
  - Overlapped prints work (`unique/desktop-07.png`).
  - On the hero, the bottom of img-002 shows as a 4 px sliver under img-007 from about x=836 to x=1030 (`clip/newheadless-d-y300.png`).
- **Typography:** Shrikhand gives the page a real identity, and it is great on prices and short titles. Two faults:
  - **The f's overhang swallows the word space: the hero reads "Surflessons"** at both widths (`unique/desktop-00.png`, `unique/mobile-00.png`).
  - **Atkinson's slashed zero appears on every number**: "2Ø26", "3Ø seconds", "8'Ø–9'Ø" (`crops/uni-rating-2x.png`, `unique/desktop-03.png`), and "USD 4Ø" on the sheet (`states/unique-d-sheet-700.png`). On a price list it reads as a mistake.
- **Colour:** white, cloud blue, pink. Distinct and memorable, with white on pink. Flat `#94D4FF` under fat ink and pink can tip toward a children's brochure (`unique/desktop-01.png`). The beige message bubble is off-palette (`states/unique-d-sheet-700.png`). The band's grey is the opposite of "clean and bright".
- **Hierarchy and rhythm:** the most varied pace of the three: white, big blue, overlaps, swipe strip, band, masonry, columns, list, dogs. The title crowds the header at the top of the hero, with little air between them (`unique/desktop-00.png`, `unique/mobile-00.png`).
- **Polish:** masonry, sheet and strip are clean (`unique/desktop-06.png`, `states/unique-d-sheet-700.png`). Inspector: resting shadows on prints and "3 days" 9 px from the edge in the side-scroll, which is a deliberate peek. The phone menu card is clean (`states2/sheet-menus.png`).
- **Distinctiveness:** the only one of the three nobody would mistake for a template.
- **Hero and motion:** see below. Micro-animations: button press-fill, seen as a darker flood on hover and press (`states2/sheet-btn-uni.png`); sheet tiles, dot stretch. I saw end states for these, not the transitions.

**Motion: what I observed**
- **A pass runs about 5.6 s, then the screen is completely still for about 6.4 s**, repeating every 12 s (`gpu/sheet-unique-d.png`, `gpu/sheet-unique-m.png`). The change per step rises and falls smoothly to 5.5 and returns to 0, and it starts up again on time. This is clearly visible, unlike interactive's.
- **It reads as paper flexing, or a flag, not as water.** Right to left, each print's rectangle warps, with its top edge bulging by up to about 26 px on desktop and about 15 px on a phone (`states/unique-d-swell0.62.png`, `states/unique-m-swell0.62.png`). The surfer's body bends with the sheet, and neighbouring prints kink against each other as the crest passes between them (`unique/desktop-00.png`). The moving shadow helps the paper illusion. It is a visible, well-made effect, and it is a WebGL demo sitting on top of the photographs, not something that makes them better.
- **At the moment of peak flex it looks like a rendering wobble** to someone not told the idea. In the resting frames (`states/unique-d-still.png`, `gpu/sheet-unique-d.png`, lower rows) the composition is calmer and better, which says something.
- Scroll: on Metal, prints leave with the page cleanly, and the swell damps with scroll. Reduced motion and `?still`: static prints (`states/unique-m-reduced.png`). `?nogl`: captured (`states/unique-d-nogl.png`), not reviewed in detail.

**Score: 6 / 10.** The only page with an identity and the best phone first screen, held back by a cluttered desktop first screen, a swell that reads as a gimmick, a slashed zero through every price, and a gloomy band. Closest to `ka-surf-hostel.html` in method: an idea on a light ground. Below it because KA's shape is one decisive gesture, while this is five photographs competing. **Below 8: hard fail.**

**Better than the current site: YES, narrowly.**
- First screen **yes** (`unique/mobile-00.png` vs `current/old-mobile-fold.png`; `unique/desktop-00.png` vs `current/old-desktop-fold.png`): Sanjee surfing against an empty pool, and it names the place. It is less composed than the old picture on desktop, and clearly better on a phone.
- Whole page **yes, narrowly** (`unique/desktop-sheet.png` vs `old-site-desktop.png`): it has what the old teal template lacks: identity and pace. It still lacks the old mosaic's photographic wealth.

**Fix list**
1. **Recompose the first screen around one picture.** In `.set` and `section.hero`: make img-002 the full-bleed ground at desktop width, with the title in its sky, and float **only** img-007, plus at most img-006, as prints over the bay's lower part. Drop img-009 and img-018 from the hero, since both appear elsewhere or can. Phone: keep today's composition, it works, with img-002 running behind the title. This meets the rule and keeps the concept. If the white ground stays, cut to two prints with no overlap of the bay's headland, and take the ruling above as standing.
2. **Make the swell lift the prints instead of bending them.** Lower the amplitude (`AMP` at 26/15) to about 10–12 px, and move each print as a nearly rigid body with a small rotation, keeping only a slight flex at the edges. Keep the moving shadow. Shorten the still gap so it does not read as stopped.
3. **Remove the slashed zero everywhere.** Use a plain-zero alternate if this subset has one; otherwise swap Atkinson Hyperlegible for a face with an ordinary zero. Add `word-spacing` of about .12em on the hero `h1` so it stops reading "Surflessons", and give it more air under the header.
4. **Replace the grey band** in `section.band` (img-020). Use img-018, the sunset, or crop img-020 to the sea glitter alone in a shallow band with the line set on white above. It should be the page's high point, and today it is the gloom.
5. **Tidy the blue block** in `section.shallows`: align "Lessons" with "Who we teach" (let the stepping start at the prices, where it works) and fill or close the empty upper right. Replace the beige bubble in `#sheet` with the blue tint. Close the 4 px sliver where img-002's bottom edge shows under img-007.

**Keep:** Shrikhand for prices and short titles; the stepped prices; the phone first screen; the rail pink; the overlapped prints mid-page; the dogs at the close; the real masonry of quotes.

---

## Ranking at 4f (visual quality only)

1. **unique "The set" (6/10):** the only page with an identity, and the best phone first screen, because Sanjee is actually surfing on it. The desktop first screen is a collage and the swell reads as flexing paper.
2. **calm "The sand" (6/10):** the cleanest and brightest first screen on desktop, with a tidy, plain page beneath it, no surfer until far down, and a wash line that looks like a stock divider on desktop.
3. **interactive "Where you start" (5/10):** the best booking logic, on a flat, soft first screen with a shimmer most people won't notice, under dashboard-grey panels and a weak hand face.

**All three fail dimension 8 (< 8) and go back to the designer before any human sees them.** Calm and interactive are also not clearly better than the current site, and interactive's first screen is a rubric hard fail by my ruling.

**What the designer prompt got wrong (for the learn step):**
- Three concepts handled "the material is weak" by working around the lack of a surfer picture, and none asked what a visitor sees first. The one first screen with a surfer on it is the one that felt alive.
- A shader's job was specified by amplitude ("at most 3 css px"), which guarantees it is safe and can make it invisible. Main items need a bar for what a visitor notices in three seconds, not just a ceiling.
- `tools/check-design.mjs`' 1200 px floor reads the source width, so a phone crop of 493 source px passes. The floor needs to be measured on the crop actually drawn.
- All three pages have less photographic wealth than the old site's mosaic, using the same pictures. Prints "at or below native size" became small prints one at a time; nothing asked for pictures to be used together.

**Outside dimension 8, for the critic's lane:** all three mockups request Google Fonts on first load (`fonts.gstatic.com` on all three; `fonts.googleapis.com` too on calm and interactive). Rubric: any third-party request on first load is a hard fail in general, and designer base.md lists self-hosting as binding at 4g.

---

## Round 2 — quick (station 4f)

Run `2026-10-midigama-01` · station 4f (quick, three reworked mockups) · **round 2** · visual-critic 0.2.0 · 2026-11-05.
Pages: `sites/sanjee-surf-school/mockups/{calm,interactive,unique}/dist/`, served over http from my own server on 9350, 9351 and 9352, stopped afterwards.

Independence: I did not open the critic's or experience-critic's report or folder, for either round, or any designer's `notes.md`. I looked at each page and wrote first impressions before opening round 1 above.

### How I looked

All paths are under `reports/2026-10-midigama-01/visual-sanjee-r2/`. Screenshots are scratch, so each line says in words what its file shows.

- **GPU:** every capture ran in headless Chromium reporting "ANGLE Metal Renderer: Apple M1". No SwiftShader this round, so no `tools/shoot.mjs` set: I shot my own walks into this folder as instructed.
- **Walks:** `<variant>-d-NN.png` (1440×900), `<variant>-m-NN.png` (390×844 at 2×), `<variant>-w-00.png` (1920×1080), human-pace scroll. Sheets: `sheet-<variant>-d.png`, `sheet-<variant>-m.png`. No console errors in any.
- **Motion:** `motion/`, timed frames at both widths (calm 0.1–18 s, interactive 2–14 s every 750 ms, unique 2–11.8 s every 700 ms), 1:1 crops of foam and figures, amplified difference maps, a region shift estimate per frame (`motion/crops.json`), and one-column time-slice images at about 30 samples a second over 18–19 s (`motion/kymo-*.png`).
- **States:** `states/`: 1:1 and 2× crops, contrast sampled behind the text with the text hidden, `?swell=` frames, scrolled unique, tile, message and sheet states, reduced motion on a phone, 2560×1300.
- **Side by side:** `compare-calm-unique-d.png` (with a blurred "squint" row), `compare-phones.png`, `compare-interactive-old-gold.png`.
- **Inspector:** calm 6 FAIL / 3 WARN, interactive 4 FAIL / 6 WARN, unique 4 FAIL / 9 WARN. Its FAILs are evidence lines only; where they matter they are quoted below.

**Limits, stated plainly:**
- I did not watch live playback. "Reads as" is my inference from frame sequences, time-slices and measurements. **Whoever gates this should watch interactive's foam live for 20 seconds on a real screen.**
- Nothing was run on a phone. rAF held 60 fps (worst frame under 18 ms) on all three at both viewport sizes on the M1. That is pacing on an M1, not shader cost and not a phone: **phone frame rate is unknown.**
- The current site is judged from captures only, as instructed. I rendered Lavish, KA and Layday; Global Surf's clips and shots are not in this worktree, so that page is known to me from its notes only.
- `/impeccable critique`, `/emil-design-eng` and the motion-audit skills were not run.
- The Metal captures show no straight-line cut on unique's prints when scrolled (`states/u-d-y300.png`, `states/u-m-y200.png`): prints are whole. The known artefact was not counted and did not appear.

### The three rulings

**Ruling 1 · interactive's first screen and "≥ 1920 px": it clears, on the long edge. Hard fail not triggered.**
- The exact words: rubric hard fail, "has photographs ≥ 1920 px and the first screen carries none of them — unless the concept gives a reason both visual critics accept". Playbook §1a: "a business-owned photograph at ≥ 1920 px (≥ 1200 px is the hard floor for anything drawn full-width)". **Neither states an axis.** Where the project means width it says so: designer base.md constraint 7 says "under 1200 px wide". Concepts §2 already reads 1920 as the long edge for this business and lists img-018 among the six. img-018 measures 1440×1920 (`sips`). So it counts.
- The 1200 px floor is met: the drawn width is 1440 source px.
- **What the ruling does not say.** The long edge gives no extra sharpness on desktop. The file drawn is a 1440×1100 crop, so desktop gets 1440 px across whatever the file's height. It is a phone photograph, which is what the floor was written about. If anyone reads the rule as width, I would accept the concept's reason under the exception, because the picture holds and it is the most beautiful real picture they have. But the exception needs both visual critics, so the wording should be settled in the learn step: the rubric should name the axis.
- **Upscaling, looked at:**
  - At 1440 on a 1× screen it draws 1:1 and is fine (`interactive-d-00.png`, `states/i-d-foam-1x.png`).
  - At 1920 it is 1.33×. At a glance it holds (`interactive-w-00.png`). At 1:1 the foam goes painterly and the figures become soft blobs, with no blocks or halos (`states/i-w-foam-1x.png`, `states/i-w-figure-1x.png`). Water and cloud forgive it. Acceptable.
  - On a 1440 wide 2× laptop the same 1440 file spreads over 2880 device px, softer than the 1920 case (`states/i-d2x-foam.png`). Soft but not ugly.
  - **Above 1920 it breaks in a different way.** `.stage{max-width:1920px}` stops the picture, and the hero's `#c9b9a8` shows as flat tan panels with hard vertical edges, 320 px each side at 2560×1300, with the header spanning over them (`states/i-2560.png`). It looks like a broken page on a large monitor. Calm and unique scale to full width at 2560 (`states/c-2560.png`, `states/u-2560.png`).
- img-002 as a closing band only: fine. It lands well as the payoff (`interactive-d-11.png`).

**Ruling 2 · calm against unique: not distinct on desktop. Unique has become calm plus a bigger print and a louder title.**
- `compare-calm-unique-d.png`: same photograph, same crop logic, same saturated sky over the upper half, same headland low right, same four words centred in that sky, a red-pink button under them, and a print at the lower left in the same place. **Both prints include the same surfer, img-006.** In the squint row the two are the same composition; what differs is the size of a grey-green rectangle.
- What does differ: Shrikhand against Source Sans, the rating line, the size of the print, Sanjee instead of the woman on the wave, and the wash line. Those are real, but they are type and casting, not a different first screen.
- Below the first screen they are very different pages: blue block and stepped prices against a white column.
- On phones the pair is closer to acceptable, since unique's big Sanjee dominates (`compare-phones.png`), but the skeleton is the same: title, button, headland, print.
- **For the record, this is partly my doing.** Round 1 told calm to float a surfer print over the hero's foot and told unique to make img-002 full-bleed with img-007 over it. Each note was right alone and together they produced this pair. The project exists because the founder rejected look-alikes, so this outranks my round 1 notes.
- Only img-002 can carry a full-bleed at ≥ 1920 px wide, so calm and unique cannot both lead with it full-bleed. **Calm keeps the bay. Unique has to move** (unique fix 1).

**Ruling 3 · calm's print: works on the phone; on desktop it does not break the screen but it costs more than it gives. Take it off the desktop first screen.**
- Title and button stay clear and first in the eye (`calm-d-00.png`). It does fix round 1's "nothing says surfing". It is not broken.
- On desktop (`calm-d-00.png`, `states/c-d-print-1x.png`) it reads as a video thumbnail or the SaaS "hero with a card overlapping" pattern. The rounded rectangle and resting shadow do that (inspector `[shadow]` on `div.print.hero-print`).
- Its muted grey-green sits badly against the very saturated bay, so it looks pasted on.
- At 1440 it makes two near-misses: its top edge at y=574 runs about 16 px above the sea's horizon, and its right edge at x=540 clips the toe of the headland.
- custom.md is plain: "full-bleed, clear, unobstructed. On the first screen, only the header, at most one short centred title, and one short call to action". This is a fourth thing on that screen, and it is the main reason for Ruling 2.
- At 1920 and 2560 it clears the headland and sits more calmly (`calm-w-00.png`, `states/c-2560.png`), but the thumbnail reading stays.
- On a phone (`calm-m-00.png`) it stacks cleanly under the headland and the surfer reads large. It is the best version of the idea, and I would keep it there, though it is still strictly a breach of the same sentence, which a human may want to rule on.

---

## 1 · calm "The sand" (round 2)

**Three-second test**
- **1440 (`calm-d-00.png`):** bright, clean, happy; holiday first, and then a surfer in a box. I read the title at once. I would scroll, with mild interest.
- **390 (`calm-m-00.png`):** better. Headland, then surfer, in a natural stack. A pleasant first screen, not a stirring one.

**First-screen verdict:** meets the full-bleed and pixel rules (img-002, 1439 px file at 1440, about 1:1 at 1920). Misses "only header, title, CTA" (Ruling 3). The plain centred-title-over-a-still form is still the base. Calm needs no canvas, but the hero still has to be interesting, and this one gets its interest from a bolted-on print.

**Round 1 notes, what landed**
- **Wash line: fixed.** Soft sand edge meeting white, no parallel outline, no longer over the water (`states/c-d-wash-right.png`). The biggest single gain here. It stopped being a fault.
- Surfer high on the page: landed, at the cost in Ruling 3.
- **Mosaic: landed, and it is the page's best moment** (`calm-d-07.png`): six real pictures at real size in three columns, a wealth the page did not have, and the same material as the old site's Coco Beach block used better.
- Tour list: fixed. Prices beside the text, quiet tint icons (`calm-d-10.png`).
- Closing crop: fixed. Foam and wet sand (`calm-d-10.png`), lovely on its own.

**Checklist**
- **Media:** best wide picture leads. Oversharpened foliage and heavy saturation make it a touch postcard-resort, and the tiled roofs say hotel (`calm-d-00.png`). A tiny dark figure sits at the left edge, x≈18, y≈660, and reads as a speck.
- **Composition and grid:** orderly. Lesson rows and 5/7 splits are competent and predictable (`sheet-calm-d.png`).
- **Typography:** Source Sans with Mr Dafoe remains the most tasteful pair of the three. "Coco Beach is our home spot" is now set in the text face, which solves the slant strain (`calm-d-06.png`).
- **Colour:** white, pale tint and red are clean and the red is unmistakable, but the long pale-blue runs make the middle of the page soft (`calm-d-02.png`).
- **Hierarchy and rhythm:** better: band, then Sanjee, then quotes, then mosaic, then list, then closing. The first three screens below the hero are the flattest stretch.
- **Polish:** clean at both widths. Slight imbalance at 1440: print and mosaic reach 60 px from the left, the reading column stops 180 px from the right (inspector `[off-centre]`).
- **Distinctiveness:** the headland and the wash are this place. The lessons block could be any school.
- **Hero and motion (observed):**
  - The wash runs up once in about a second (`motion/kymo-c-d-x900.png`, `motion/c-d-wash.png`). In the very first capture, at about 100 ms, the hero's foot is a straight edge before the mask applies. I saw it in one frame only, so it may not register.
  - The bay then drifts about 6 px across and 5 px down at the palms between 2.5 s and about 14 s, and stops (`motion/c-d-diff.png`, `motion/crops.json`). Sky stays visually unchanged. **Nobody will perceive this as motion.** It is harmless and adds almost nothing; a still would look the same.
  - It reads as a settling photograph, not as water or as jelly, because nothing deforms.

**Score: 7 / 10.** Clean, bright, well set, with one really good section and a good close. It is professional, but the first screen is a pleasant picture with a thumbnail on it and most of the middle is tidy rather than beautiful. Closest to Global Surf `the-sign` in form (from its notes), below it because a still with a card is not footage; above the round 1 version in every way. **Below 8: hard fail.**

**Better than the current site: YES.**
- First screen yes (`calm-d-00.png` vs top of `dossier/.../assets/old-site-desktop.png`; `compare-phones.png` vs `funnel/walk/01-home-fold-settled.png`): the old one is moodier and richer as a picture, but its text is lost in trunks and a cookie box covers the foot. Calm says what and where, cleanly.
- Whole page yes (`sheet-calm-d.png` vs `old-site-desktop.png`): round 1 said not clearly, and the mosaic changes that.

**Fix list**
1. **Desktop first screen: take `.hero-print` off it** (`src/page.css` line 101, `margin:-236px`). Above about 900 px wide, hang it off the wash so only its top 60–90 px shows above the fold at 1440×900 and the surfer arrives with the first scroll, as the start of the next section. Keep the phone rule at line 300. That restores custom.md's sentence and breaks the look-alike with unique.
2. **Grade the img-006 print** to live next to this bay: more contrast and more saturation in the green, and less of the grey upper sea by cropping 15–20 % off its top. Drop or halve the resting shadow.
3. **Give the desktop hero its one interesting thing** now the print has gone. The strongest candidate I can see is a slower, longer wash, the concept's own device: let the wash visibly run and drain over 2–3 s, and repeat rarely. Today's drift at 6 px over 12 s can go; it costs nothing to remove. Do not add a canvas.
4. **Lift the lesson stretch** (`section` rows on `#D2EAF7`): put one picture in it (img-005 is the only lesson photo and is just above), or break the three identical rows, so the first three screens under the hero stop being pale blue boxes.
5. **Crop the stray figure out of `hero-2000.webp`,** x≈18, y≈660 at 1440, and reduce the oversharpening halo in the foliage with a slight blur pass at source.

**Keep:** the wash line as it is now; the mosaic; the closing foam crop; the type pair; the red; the tour list; the phone first screen.

---

## 2 · interactive "Where you start" (round 2)

**Three-second test**
- **1440 (`interactive-d-00.png`):** a sunset over breaking water with small people out in it. I felt something, for the first time on this business. It is the only first screen of the three I would stop on. Then the title: heavy dark letters across the orange clouds, which look stuck on.
- **390 (`interactive-m-00.png`):** the best first screen of the whole set, at either width. Sun, swell, foam on the sand, title in a calmer sky. It would pass as a good surf brand's phone hero. Round 1's weakest first screen has become the strongest.

**First-screen verdict:** the right picture, full-bleed, with only header, title and button on it. Hard fail not triggered (Ruling 1). **One calibration breach, measured:** the desktop title and nav are near-black `#181D10` on an orange sky: mean background behind the `h1` `#E29D68` at 1440, `#EBA265` at 1920 (`states/states.json`). references.md: "Never black or blue text on orange", and "A page showing any of them is below 8". Contrast is not the problem (ink 7.3:1) and plain white is not the answer (2.3:1). It sits in the upper third, not vertically centred: I accept that, since the middle of the frame is water and figures. On the phone the title sits on a grey-tan part of the sky, not on orange, and I do not count it there.

**Checklist**
- **Media:** best image in the folder, full-bleed, properly leading. img-002 as the closer and img-007 large with Sanjee's words (`interactive-d-06.png`): the page now has its material the right way round. The img-009 band (`interactive-d-05.png`) is the weakest full-bleed left: flat teal, soft, about a screen and a half tall, and a cut-off head at the far left edge at about y=668.
- **Composition and grid:** **the level tiles with their own photographs are the best mid-page moment here** (`interactive-d-01.png`). Lesson cards are now tight (`interactive-d-02.png`). The row under them is untidy: group line, rating pill and Week paragraph on three different baselines. The message panel beside "Before you book" is now tidy and looks designed (`interactive-d-03.png`).
- **Typography:** Courgette replaces the marker face and is a clear improvement: readable, warm, consistent (`interactive-d-01.png`, `-04.png`). It is a bit wedding-invitation on "Lessons". Manrope is fine. 18 font sizes (inspector).
- **Colour:** the dashboard grey has gone; the pale water tint is fresher. The cobalt is unmistakable and reads hard against the orange hero, which works for a button. The six-colour board chart brings real colour into the middle of the page (`interactive-d-04.png`).
- **Hierarchy and rhythm:** hero, tiles, prices, message, boards, band, Sanjee, quotes, waves, tours, bay. The most varied and best paced of the three after unique.
- **Polish:** clean. Tails and colours on the board chart are finished. **Tan pillarbox panels above 1920** (Ruling 1, `states/i-2560.png`). The inspector's `[lopsided]` on "Sanjee, head instructor" does not match what I see: the print sits beside the text at 1440 (`interactive-d-06.png`), so I did not count it.
- **Distinctiveness:** a to-scale board chart and tile-to-message builder belong to this school. The hero is a sunset, which could be any coast, but these people in this water make it feel taken, not bought.
- **Interactions (end states on Metal):** tile selects, "for you" dots land on matching cards, "Add to my message" becomes "In my message" with an outlined card and the message rewrites (`states/i-d-added.png`). Transitions themselves not seen.

**Motion: what I observed (Metal, M1)**
- Sky and sun locked: zero difference above the horizon in every map (`motion/i-d-diff.png`). Horizon, sun and the upright board: shift 0 across all frames (`motion/crops.json`, `motion/i-d-board.png`).
- **Fronts do walk to shore.** The time-slice at x=1150 shows a bump appearing in further rows first and reaching nearer rows later, with a slope (`motion/kymo-i-d-x1150.png`). Round 1's bands had no slope; this is the change that makes it a swell.
- **Size:** the foam region moves through about 11 px, from +1 to −10 (`motion/crops.json`), mid-water about ±3 px. Larger than the stated 8 px at the foam itself. Period about 9 s, and smooth, with a specular glint visibly crossing the reflection bands (kymo, rows 220–330).
- **Figures hold.** The nearest swimmer moves at most 1 px, with no halo and no warping across 8 frames at 3× (`motion/i-d-figure.png`). The left-hand figures likewise (`motion/i-d-figures-left.png`). No dark discs or haloes around them.
- **Does it read as water?** The sea and reflections, yes, plainly (`motion/i-d-mid.png`): wavelets keep their shape and rise and fall with their surface, which is how a swell looks from the beach.
- **The foam is the honest risk.** At 300 ms steps it looks fine frame to frame (`motion/i-d-foam-fine.png`), but the foam's bubbles keep their identity and rise and fall as one mass; they never churn or travel (`motion/i-d-foam.png`). At that speed I expect it to read as slow breathing water, and to someone staring at the lower right corner, slightly gelatinous. I saw no tearing or stretching. **That is my inference from stills, and the one thing here I most want a human to watch.**
- Reduced motion: no change at all across 9 s on a phone viewport (mean difference 0). Phone: motion again starts only below the horizon (rows from 781 of 1688, `motion/crops.json`). The canvas is 780×936 on a 3× screen, so capped at 2×, and at 3× the shore foam still looks crisp and strong (`states/i-m3x-lower.png`). I did not study the phone's foam over time as closely as the desktop's.
- This passes the main-item bar: it is visible, on the business's own media, and makes the picture better.

**Score: 7 / 10.** The first screen and the motion are at or near an 8; the phone hero is above it. It is held at 7 by the title on orange, which the calibration makes a hard bar, by the broken hero above 1920, and by a middle of the page that is still more product than picture in stretches. Closest to Global Surf in spirit (the business's own water, title and button only), still below it because a still with a shader is not footage. **Below 8: hard fail, and the nearest of the three.**

**Better than the current site: YES.**
- First screen yes (`compare-interactive-old-gold.png`, `compare-phones.png`): both are atmospheric, but this one is surf, not a pool, and it says what and where.
- Whole page yes (`sheet-interactive-d.png` vs `old-site-desktop.png`): better to book from, and now better to look at.

**Fix list**
1. **Title on the orange, desktop.** `.hero-copy h1` and the header links in `src/page.css` line 76: white text on a graded sky. I tried it at runtime only: a warm dark top-down scrim, about `rgba(70,40,40,.62)` to transparent over the top half, white `h1` and nav (`states/i-d-override-white.png`). It looks better than today, more dramatic and more expensive, and by arithmetic gives about 4.5:1 at the title; not measured. The playbook §1a allows a legibility scrim. Keep the ink title on the phone if its sky stays grey.
2. **Remove the pillarbox.** `.stage{max-width:1920px}` at line 73. Let the picture scale to full width above 1920. Calm and unique do this at 2560 and hold. If that looks too soft at 2560, cap at about 2240 and fade the sides into a blurred copy of the same picture, never a flat panel with a hard edge. Do this before anyone opens it on a big monitor.
3. **Make the foam churn slightly, or reduce it.** In `src/swell.js`, lower foam-region lift from about 11 px to about 6–7 px, and add a small horizontal travel in the shore band so the mass stops moving as one block. Leave the sea and the figure masks alone. They are right.
4. **Shorten or replace the img-009 band** (`interactive-d-05.png`): 50–55 vh, cropped to the paddler and the crest, and off the cut-off head at the left edge. It is about a screen and a half of flat teal between the two strongest parts of the page.
5. **Tidy the row under the lesson cards** (`interactive-d-02.png`): one baseline, with the Week paragraph directly under its card and the rating pill and group line together.

**Keep:** the hero picture, its crop and its phone version; the swell's walking fronts and masks; the level tiles with photographs; the board chart; Courgette; img-002 as the closer; the tile-to-message logic.

---

## 3 · unique "The set" (round 2)

**Three-second test**
- **1440 (`unique-d-00.png`):** a big soft surfer on a green wave, stuck over the bay from the other mockup. Energy, yes. Then I notice the soft picture beside a very sharp one. A heavy, confident title. I would scroll, for the man on the board.
- **390 (`unique-m-00.png`):** strong, because Sanjee is huge, and busier than before. Title, button, rating, headland, a small print and the big print compete in one screen. Round 1's best phone screen is now second to interactive's.

**First-screen verdict:** now meets full-bleed and the hard fail: img-002 is there. **But it fails as a first screen for the third design** (Ruling 2), and misses custom.md's "unobstructed, only header, title and CTA" with two prints and a rating. The concept's own "white page" is gone, so the idea that made it unique has moved off the screen where it counted.

**Round 1 notes, what landed**
- Recomposed around img-002 with two prints: done as I asked, and I now rule against the outcome.
- Rigid lift instead of bending: landed. No more flag or wobble (`states/u-d-swell0.5.png`).
- Slashed zero: gone (Figtree). "Surflessons": gone. Air under the header: a little better.
- Grey band: replaced with img-018, now a real high point (`states/u-d-band.png`).
- Blue block: "Who we teach" and "Lessons" now align; stepped prices start cleanly (`unique-d-01.png`). The beige bubble has gone from the sheet (`states/u-d-sheet.png`).

**Checklist**
- **Media:** img-007 drawn at 558 css px from a 640 px file at 1×. It is soft and oily at this size, with smoothing on the skin and the water (`states/u-d-print-1x.png`), right next to a crisp oversharpened bay, and that gap is what the eye notices. The print's pale lilac sky against the saturated blue is a hard mismatch. The back print's grey top band does the same. The band and masonry work.
- **Composition and grid:** stepped prices remain the best mid-page moment in the set (`states/u-d-y300.png`, `unique-d-01.png`). The overlapped prints in the lower page are scrappier than before: the hazy img-014 print sits on top of the far better palm picture and takes the eye (`unique-d-07.png`).
- **Phone hero:** the bay stops in a straight line at about 470 css px with the blue block starting behind the print, visible at both sides (`unique-m-00.png`, `states/u-m-y200.png`). That edge looks unresolved.
- **Typography:** Shrikhand with Figtree is confident and characterful, the page's identity. "Who we teach" and prices are great. Very heavy on a long line: the band line is near its limit (`states/u-d-band.png`).
- **Colour:** bay blue into cloud-blue block is a nice continuation at the hero's foot (`states/u-d-y300.png`). The rail pink is distinct. The band's ink line sits on pale tan, mean `#D4B898`, with an orange cloud reaching "time."; I do not count this as "black on orange", but it is close to it, and white or a shorter band would settle it.
- **Hierarchy and rhythm:** the most varied pace of the three.
- **Polish:** sheet clean and now on palette (`states/u-d-sheet.png`). Inspector `[covered-text]` flags the hero title as hidden at scroll; I read that as the sticky header passing over it, and saw no fault in `states/u-d-y300.png`. 7 resting shadows on prints; allowed on objects meant to float.
- **Distinctiveness:** below the first screen, the only page nobody would take for a template. On the first screen, the sibling of calm.

**Motion: what I observed (Metal, M1)**
- `motion/kymo-u-d-x400.png`: a sharp bump repeating every 8.4 s, about 1.4 s wide, with all rows moving together. So rigid, as intended. Peak about 10 px at the front print (`motion/crops.json`, frames 3–5), about 8 px at the back print about 0.7 s earlier.
- **Between passes it is dead still.** The pass takes 5.6 s (`PASS = 5600`, `src/page.js` line 290) but with only two prints bunched at the left it touches something for only about 2.5 s; the rest is over bare bay. So the frame is fully still about 6 of every 8.4 s: difference 0 at 0→9 and 0.02 at 0→6 (`motion/crops.json`).
- At peak each print lifts and tilts by a few pixels; the left edge leans about 10 px from top to bottom (`states/u-d-swell0.5.png`).
- **How it reads:** not jelly and not paper any more. But not water either: **a card that hops once and stops,** against a photograph of water that does not move. To me that is an attention nudge, the "shake" a UI does to get noticed, and the bay's stillness under a floating print undercuts the idea of a swell. It is well made and harmless, and it is no longer a main item. The rule of 2026-10-20 needs one; this is a micro-animation.
- Scroll on Metal: clean, whole prints in the frames I opened (`states/u-d-y300.png`, `states/u-d-y450.png`, `states/u-m-y200.png`). Reduced motion: effectively static across 9 s on a phone viewport (mean difference at most 0.001).

**Score: 7 / 10.** Round 1's four named faults are gone and the page has a real identity and the best section in the set. It is held at 7 by a first screen that is calm's with a soft photograph on it, and by a main item that stopped being one. Closest to `ka-surf-hostel.html` in method further down the page; below it on the first screen, where KA has one decisive gesture and this has a bay, two prints and a line of proof. **Below 8: hard fail.**

**Better than the current site: YES.**
- First screen yes (`unique-d-00.png`, `unique-m-00.png` vs `old-site-desktop.png` top and `funnel/walk/01-home-fold-settled.png`): a man surfing against an empty pool, though less composed than the old picture on desktop.
- Whole page yes (`sheet-unique-d.png` vs `old-site-desktop.png`): identity and pace the teal template does not have.

**Fix list**
1. **Give it its own first screen; this reverses my round 1 fix 1.** `.hero`, `.ground` and the prints in `src/page.css` lines 58–59. **Leave the bay to calm.** Back to a light or cloud-blue `#94D4FF` ground with **one decisive gesture:** img-007 at its honest size, at most about 480–520 css px on desktop, large in the centre or right, Shrikhand title running across or behind its top edge, the button below. Carry img-002 as a low wide strip along the foot, about 240–300 px high and edge to edge, headland visible, with the print overlapping it. That still carries a ≥ 1920 px photograph on the first screen, so the rubric hard fail stays clear. It takes the custom.md full-bleed default as the concept's stated exception, and **I would accept that reason:** calm holds the full-bleed and a third bay would be the look-alike the founder rejected. Against the concept's "five prints" fear, keep to this one print plus the strip.
2. **Make the motion a main item again, on the new composition.** If the strip is the ground, let the swell come from it: the strip's own water lifts in a travelling front (the fronts that already work on interactive; own code, different picture), and it reaches the print, which rides it. Cut the dead time: shorten `PASS` so the crest spends its time under the print, and bring the still gap to about 2–3 s. Keep today's near-rigid body.
3. **Reduce the softness gap.** Cap the img-007 print at about 480–520 css px and serve the 962 px file at every density above 1×; `set-img-007-640` at 640 css px on a 1920 screen has no margin at all (`walk.json`, `unique-w-00.png`). A slight local contrast lift at source would help. Crop the print's lilac sky by about a quarter, so less of it meets the blue.
4. **Phone hero:** remove the small img-006 print and resolve the straight bay edge at about 470 css px. Let the bay fade into the block, or end it behind the print's top so no hard line shows at either side. Move the rating below the print or out of the hero (`unique-m-00.png`).
5. **Fix the lower overlap** in `unique-d-07.png`: put the palm picture on top and let the hazy img-014 go under, or drop it.

**Keep:** Shrikhand with Figtree; the stepped prices; the rail pink; the cloud-blue block; the img-018 band; the rigid-body lift; the quote masonry; the dogs; the sheet.

---

## Can they reach 8 with this photography?

- **Interactive: yes, and soon.** Fixes 1 and 2 are small. I would expect an 8 once they are in and the foam has been watched live.
- **Unique: probably.** The page already carries it, and the first screen needs a re-composition, not better pictures. The limit is real, though: its one action frame is soft and must stay under about 520 css px, and it carries a rights flag. If the owner cannot clear img-007 the concept loses its hero.
- **Calm: not confidently.** Its only big picture has no surfer in it and looks like a resort. Without the print it is the plain form I marked down in round 1, and with the print it breaks custom.md and looks like unique. A strong wash might carry it. If the next round still does not reach 8, the honest conclusion is that this photography cannot give a quiet 8 on desktop without on-location material, the frame concepts §6 already names.

## Ranking at 4f (visual quality only), round 2

1. **interactive "Where you start" (7/10):** the sunset and walking swell are the one first screen that moves you, and the phone hero is the best in the set; the desktop title on orange and the broken hero above 1920 keep it from an 8.
2. **unique "The set" (7/10):** the page with the most identity and the best mid-page section, whose desktop first screen has become calm's with a soft print and whose swell is down to a small hop.
3. **calm "The sand" (7/10):** the cleanest page, with a fixed wash line and a very good mosaic, whose first screen is a bright postcard with a thumbnail on it.

**All three fail dimension 8 (< 8) and go back to the designer.** None hits the "not better than the current site" fail this round. Calm and unique together also fail the three-different-designs requirement on the desktop first screen.

**What the designer prompt got wrong (for the learn step):**
- Critic notes are written per page, and nothing checks them against each other. Two of my own round 1 notes converged calm and unique. The critic's method should include a side-by-side of all three first screens, with the squint test, every round.
- "≥ 1920 px" has no axis in the rubric or playbook, which is why this round needed a ruling. Name it. My suggestion: width for a landscape full-bleed, long edge for a portrait full-bleed on a phone.
- A full-bleed picture wider than its file has no rule above 1920: nothing tests 2560, and the tan pillarbox passed every check. Add a 2560 shot to the look loop.
- "Never black or blue text on orange" came from buttons, and it collides with sunset skies, where white alone fails contrast. Worth a line saying what to do: grade the sky.

---

## Round 3 — quick (station 4f), interactive only

Run `2026-10-midigama-01` · station 4f · **round 3** · visual-critic 0.2.0 · 2026-11-05. Limited to `interactive` by Alon, so calm and unique were not re-scored and there is no ranking this round.
Page: `sites/sanjee-surf-school/mockups/interactive/dist/`, served over http from my own server on 9353, stopped afterwards.

Independence: I did not open the critic's or experience-critic's report or folder, or the designer's `notes.md`. I looked at the page and wrote my first impressions before opening rounds 1 and 2.

**Two biases to declare.** The scrim was my own round 2 suggestion, and round 2 predicted an 8. I tried to judge against both: I rate the scrim darker than it needs to be, and the 8 below is narrow and carries conditions.

### How I looked

All paths are under `reports/2026-10-midigama-01/visual-sanjee-r3/`. Screenshots are scratch, so each line says in words what its file shows.

- **Renderer:** headless Chromium reporting "ANGLE Metal Renderer: Apple M1" for everything except `shots/`.
- **Shot set:** `shots/`, from `tools/shoot.mjs` over http at 1440 and 390, which uses software GL. I read these for layout only, not motion. 12 desktop and 17 phone captures.
- **First screens on Metal:** `hero-390.png` (2×), `hero-768`, `hero-1280`, `hero-1440`, `hero-1920`, `hero-2560`, `hero-1440-2x.png`, plus `hero-360x640`, `375x667`, `600x900`, `700x900`, `701x900`, `1024x768`, `1366x768`.
- **Contrast:** sampled from the render with the words made transparent, at 14 sizes. `noscrim-compare-with.png` and `-without.png` give the sky row by row, with and without the scrim.
- **Motion:** the page's own shader on Metal, stepped by a virtual clock to exact times and shot at 12 fps: 18 s at 1440×900 and 10 s at 390×844 at 2×. From those: `slice-*.png` (time-slices), `energy-d1440.png` (mean frame difference ×10), `foam-*-seq.png`, `crop-*.png`, block-matched displacement and mean brightness per region. Real-time rAF measured separately.
- **Runtime trials, nothing on disk changed:** `trial-lighter-scrim-1440.png`, `trial-band-*.png`, and a patched shader in memory.
- **Band:** `band-1920`, `band-2560`, `bandcheck-*`.
- **Other:** `tiles-2x.png`, `state-tile-advanced.png`, gold pages rendered (`gold-the-lavish-haven`, `gold-ka-surf-hostel`, `gold-layday-surf`). I opened Lavish and Layday; KA was rendered and not opened.
- **Inspector:** 4 FAIL (`icon-cards`, `eyebrow`, `edge-text`, `covered-text`), 6 WARN. I read only the tail of its output and did not examine each FAIL, so I do not rely on them. Its `[lopsided]` on "Sanjee, head instructor" does not match `band-1920.png` or `shots/desktop-sheet.png`, where the print sits beside the text.

**Limits, stated plainly:**
- **I did not watch it live.** "Reads as" is inference from frames and measurements. **A human should watch the foam for 20 seconds on a real screen before this goes further.**
- **Nothing ran on a phone.** rAF held 60 fps at 1440, 1440 at 2×, 2560 and 390 at 2×, with p95 about 18 ms, on an M1. That is pacing on an M1, not a mid-range Android: **phone frame rate is unknown.**
- The virtual clock drove the rAF timestamp and `performance.now`, in steps of 41.7 ms. My first capture stepped at 83 ms and tripped the page's own slow-device guard, which stopped the shader, so I threw it away. That guard is doing its job; it says nothing about real speed.
- Block matching is unreliable where the water has little texture. I ignore the outliers: `mid-C` on desktop (dx 22 px) and `low` on the phone (dx 35 px).
- The current site is judged from captures only (`old-site-desktop.png`, `funnel/walk/01-home-fold-settled.png`). I did not reshoot it.
- `/impeccable critique`, `/emil-design-eng` and the motion-audit skills were not run.
- Global Surf's footage is not in this worktree, so that bar is known to me from its notes.

### Three-second test (before reading earlier rounds)

- **1440 (`hero-1440.png`):** a dusk sea with people in it, a burning sky, a white title and one blue button. I would stop and scroll. Then a doubt: the sky is browner and heavier than a sunset should be, and the water is brighter than the sky it reflects.
- **390 (`hero-390.png`):** lovely. Pale sky, ink title, gold cloud, sun on the horizon, a real wave landing on wet sand. The best thing this business has ever had on a screen.
- **Current site (`funnel/walk/01-home-fold-settled.png`):** an atmospheric pool under trunks, with illegible words over it and a cookie box. This beats it at a glance, at both widths.

### The five things asked

**1 · Hero title and sky: legal and good, but darker than it needs to be.**
- **Rule met.** White at every size from 701 up. Title contrast: mean 6.4–6.9, p5 5.2–5.7, min 4.2–4.7. Wordmark mean 6.1–7.0. Nav mean 6.7–7.1 at 1024 and up. The background behind the title is about `rgb(134,77,53)`, hsl 18/43/37: a darker orange, which is what the calibration asks for.
- **Dark band: no.** The scrim tails off at y≈414 at 1440, under the far water, and the horizon is naturally dark, so no edge shows at any width (`hero-1280`, `hero-1920`, `hero-2560`).
- **Still a sunset: yes, a late and rusty one.** It has lost the glow. Row by row at 1440 (`noscrim-compare-*.png`): y=40 goes from `223,186,141` to `128,88,70`; y=160 from `217,154,108` to `128,75,55`; y=220 from `225,159,97` to `147,89,56`. Lightness falls from 63–71 % to 36–40 % and saturation from 43–68 % to 26–45 %.
- **Where it costs most:** the top 15 % of the frame is brown rather than sky, most of all at 768 (`hero-768.png`, grey-brown). The water's peach reflection is now brighter than the sky that makes it. The eye reads this as a filter, though few would name it.
- **There is headroom.** The title is large text and needs 3:1; it has 6+. Tried at runtime with warmer, lighter stops (fix 2): burnt orange and visibly a sunset (`trial-lighter-scrim-1440.png`), with title mean 5.0–5.75, min 3.1–3.6, and nav mean at least 5.6, p5 at least 4.8.
- **390 and small phones:** ink on pale sand, background hsl 34–35 / 27–37 / 73–74, contrast above 9. Not orange. I do not count it. `hero-375x667.png` holds too.
- **One breach-in-waiting between 600 and 700 wide.** At 700×900 (`hero-700x900.png`) the ink title sits across peach-orange cloud, mean `rgb(220,187,146)`, hsl 33/52/72, close to what I called "close to it" on unique in round 2. At 700 the picture is lovely and at 701 it is rust, an abrupt jump for anyone resizing. Few visitors are at this width (a foldable, a tablet in split view). I do not hold the score on it, and it is fix 3.
- **Tight at 1280×720** (`hero-1280.png`): the button's foot is at y=236 and the sun at about y=270. It holds.

**2 · Above 1440: acceptable, soft.**
- 1920 at 1.33× holds at a glance (`hero-1920.png`). At 2560 at 1.78× it still reads as a beautiful picture from viewing distance (`hero-2560.png`), and no pillarbox remains, which was the round 2 fault.
- At 1:1 it is plainly soft (`crop-2560-horizon.png`, `crop-2560-foam.png`): figures become dark blobs, foam goes waxy and painterly, and there are faint compression blocks in the sky by the sun. Beside razor-sharp type the difference is visible if you look. Water and cloud forgive it; figures do not, but they are small.
- **A 1440 laptop at 2× is the same or worse, at 2.0×** (`hero-1440-2x.png`): foam smeary at device pixels, and this is the commonest screen in the building. Soft, not ugly.
- No seam where the canvas meets the photograph at the horizon (`crop-2560-horizon.png`).
- `hero-img-018-wide-1440.webp` is 177 KB against a 300 KB limit, so some of the wax is compression and can be bought back (fix 4).

**3 · Motion: reads as water, with one thing still breathing.** Confidence: high that it is visible and that it is not jelly in stills; medium that the mid-water reads right; **low to medium on the foam until someone watches it.**
- **Felt immediately.** The canvas is on at about 295 ms on localhost, first paint 268 ms. The rate of change in the water is highest in the first half second (4.27 grey levels per step, against a typical 2.4; phone 4.64 against 2.9), then cycles between about 1.4 and 3.3 and never stops.
- **A front does walk in.** Lag on the vertical movement from mid-water (y≈560–610) to the near water (y≈740–830) is about 3.3–3.6 s, correlation 0.89–0.98 (desktop). Foam at y≈740 leads foam at y≈820 by about 0.8 s. Time-slices show bands bending in sequence (`slice-d1440-x720.png`, `slice-m390-x400.png`). Bright glints cross the reflection rows diagonally, toward the shore.
- **Size:** vertical travel through about 8–10 px in near water and foam on desktop (`foam-*`, `low-*`), about 4 px at `mid-L`; on the phone about 9–14 device px, so 5–7 css px. Sky, sun and upright board do not move at all (`energy-d1440.png`).
- **Not jelly in stills.** No tearing, stretching or rubber edges in 100 % crops half a cycle apart (`crop-d1440-mid-halfcycle.png`, `foam-d1440-seq.png`, `crop-m390-foam-t3-t7.png`). Foam churn landed: horizontal travel of about 5–7 px and clumps no longer holding exact shape. It looks like water that has been lightly liquefied, which at this speed I expect to pass as water.
- **What still breathes is the light, not the geometry.** Mean brightness of the foam over time, three patches across about 440 px of it: **17–19 % swing on desktop, peaking at the same moment, correlation 0.99–1.00.** Phone: 12–18 %, correlation 0.93–1.00. Displacement across six neighbouring patches is also in phase, r≈0.8–0.9. Near the shore the front has almost no slant, so the whole band lifts and glows as one on a 9 s clock. `crop-m390-foam-t3-t7.png` shows it: bright and lifted in one frame, dim and blue in the other. **This is round 2's slow breathing, reduced in shape and still present in light.** A 9 s period is right for swell and wrong for foam.
- **Tried in memory** (fix 1): a front slanted across the frame, plus less shared light in the shore band. Swing drops to **6–7 %**, and patches across the foam decorrelate to r=0.25 at the far ends. Mid-water is nearly unchanged at 16 %. I measured this and did not look at it in motion.
- **Limits of a still that remain, and are acceptable:** the two breaking lines in the far water barely move (0.5–0.8 px), so they read as held, and the shoreline never runs up the sand (0.5–1 px). On the phone the near breaker is a large frozen form whose top heaves, with droplets frozen in the air. It is a cinemagraph, and it will not look like footage.
- **Hard-fail check:** the business has video but no file exists, and the round 1 ruling on that stands. The first screen carries img-018 (long edge 1920), and round 2's Ruling 1 stands.

**4 · Level tiles: the row holds, and the Advanced tile is not filler.**
- `tiles-2x.png`, `shots/desktop-01.png`: a lip of white water breaking on a green face is a stronger picture than Intermediate beside it, and an empty wave suits "Advanced" better than a person would. Crisp enough at 2×.
- It does sit two tiles from its own source. Same grey-blue sky, same green water, a matching white shoulder. An attentive eye sees the same wave, but I expect most will not care.
- The bigger issue is that the same frame now appears three times, since the Coco Beach print (`shots/desktop-07.png`) shows it whole. Not a blocker. Replace it if the owner sends anything.
- Tapping works and looks designed (`state-tile-advanced.png`): dark outline, tinted label, a chip for the matching lesson and "for you" on its card.

**5 · The middle of the page: better, one new defect at wide screens, tours still the flattest stretch.**
- **The band is right at laptop sizes and has a new fault on big monitors.** At 1440 and 1728 (`shots/desktop-05.png`, `bandcheck-1728x1117.png`) it is a calm, well-proportioned pause, the head is gone from the left edge, and the paddler sits whole on the green face. At 1920×1080 he is whole, just above the edge (`band-1920.png`).
- **Above about 2000 wide it loses him**, because the height is capped while the width grows. 2200×1240: the board is cut at the bottom edge (`bandcheck-2200x1240.png`). 2560×1440: only an arm and the top of a head (`band-2560.png`). **2560×1080: he is gone, leaving one far head alone on the water** (`bandcheck-2560x1080.png`). Tried a fix at runtime (fix 1a): whole and well placed at all five sizes tested (`trial-band-2560x1440.png`, `trial-band-1440x900.png`).
- **The band's line is tight to the top edge**, about 22 px at 1440, and looks parked there.
- **Tours: still the dullest stretch, though cleanly set.** About 1.5 screens of plain rows at 1440 (`shots/desktop-08.png`, `-09.png`) and about 3.5 at 390 (`shots/mobile-sheet.png`), no picture, and a column of twelve identical round cobalt buttons as the loudest thing. The sticky text column does its job. In its favour, it comes just before the page's biggest picture, so the close pays off.
- **Weakest print on the page:** `shots/desktop-07.png`, lower left, under "Other waves": the top half is flat grey sky.
- **The rest holds.** Lesson cards are tight, with big prices (`shots/desktop-02.png`). The row beneath now shares one baseline, though the Week paragraph (x≈961) aligns with neither its card's edge (953) nor its text (983). Message panel and "Before you book" are tidy (`shots/desktop-03.png`). Board chart is charming and original (`shots/desktop-03.png`, `-04`). Sanjee with his words is strong (`band-1920.png`). The bay close is big and happy, an abrupt jump from dusk to postcard blue but a real payoff (`shots/desktop-10.png`).

### Checklist

- **Media:** the strongest picture leads, full-bleed, on both widths. The surfer and the bay are held for later and land well. Less photographic wealth than the old site's mosaic, better used.
- **Composition and grid:** a tidy 12-column grid. Tiles, chart and full-bleed moments give scale contrast; the rest is pale rounded panels. Still some product feel from the lessons to the message.
- **Typography:** Manrope and the script are consistent and readable. No awkward breaks in the hero at any width tested. The script is a little wedding-invitation on short words. Two lines are at the top of a band with little air.
- **Colour:** dusk, white, pale water, cobalt. The booking colour is unmistakable and consistent. The warm hero mood is not echoed lower down, where the page runs cool.
- **Hierarchy and rhythm:** the eye always knows where to go, and sections vary in pace until the tours.
- **Polish:** clean at both widths, with the band crop above 2000 as the exception.
- **Distinctiveness:** the to-scale board chart, the tile-built message and this water make it this school's page. The cards alone could be anyone's.
- **Hero and motion:** interesting, clean, slick, one CTA, a main item from the business's own media. Meets Shahar's 2026-10-20 bar. Micro-animations seen as end states; transitions not seen.

### Score: 8 / 10, narrowly

- **Why it clears:** the first screen is the real thing on both widths, and on a phone it is above 8. All three things that held round 2 at 7 are dealt with on the screens most people use: the title is white on a darker orange, the pillarbox is gone, and the band is a pause instead of a screen and a half of flat teal. The motion is a visible main item that makes the picture better. Below the hero the page is professional throughout and beautiful for most of its length: tiles, chart, Sanjee, close. That is my calibration's 8 and no more.
- **Why only just:** the tours are dull, the sky gives away more glow than it must, the photograph is soft on Retina, and the foam's shared pulse is unresolved.
- **Conditions, stated plainly:**
  1. **The 8 stands for widths up to about 2000.** At 2200 and up the band loses its subject. Had that been the screen I judged, I would give 7. Fix 1a is one CSS line and must ship before a human sees this.
  2. **The motion half of the 8 rests on inference.** If someone watches the foam and sees it breathing, that takes this back to 7 until fix 1b is in. Fix 1b is small and measured; I would apply it without waiting to find out.
- **Closest reference:** Global Surf in spirit (own water, title and button only), below it because a still with a shader is not footage. Against Lavish and Layday (`gold-the-lavish-haven.png`, `gold-layday-surf.png`): more emotional on the first screen, because it is a real place at a real hour, but less art-directed, with plainer type and fewer sections that are moments of their own. Would a top studio put it in its portfolio? The hero, yes. The whole page, not quite yet.

**Better than the current site: YES.**
- First screen yes (`hero-1440.png` vs top of `dossier/.../assets/old-site-desktop.png`; `hero-390.png` vs `funnel/walk/01-home-fold-settled.png`): surf at sunset against a hotel pool, readable against illegible, what and where stated, nothing covering it.
- Whole page yes (`shots/desktop-sheet.png` vs `old-site-desktop.png`): the old page's only advantage is its nine-photo mosaic, and this page is more beautiful, more engaging and far clearer to book from.

### Fix list, biggest effect first

1. **Two must-fixes.**
   - **a. Band crop**, `src/page.css` line 209: `.feature img{height:max(clamp(300px,52vh,640px),29vw);object-position:50% 60%}`. Tested at runtime at 1440×900, 1920×1080, 2200×1240, 2560×1080 and 2560×1440; I opened 1440 and 2560×1440, the paddler is whole in both, and the other three rest on the arithmetic. Phone rule at line 339 is unaffected.
   - **b. Foam, so it stops pulsing as one**, `src/swell.js`: line 40 add `+v.x*3.4` to `ph`; line 59 `c*=1.+m*near*(1.-.6*sb)*(.10*sl+.05*h);`; line 68 end with `*h*m*near*.09*(1.-.5*sb);`. Measured in memory at 1440 only, over 11 s against the build's 18 s: swing from 17–19 % to 6–7 %, patches decorrelated. Not looked at in motion, so watch it.
2. **Lighten and warm the scrim**, `src/page.css` line 81: `linear-gradient(to bottom,rgb(150,116,104) 0,rgb(182,140,116) 34%,rgb(196,160,140) 60%,rgb(226,208,200) 80%,#fff 100%)`. Keeps the white, gives back the orange. Measured at 768, 1280, 1440, 1920, 2560: title mean 5.0–5.75, min 3.1–3.6 (large text, needs 3:1); nav mean at least 5.6.
3. **Move the ink/white switch from 700/701 to 600/601,** in the same `@media` at `src/page.css` line 80, the picture's `<source media>` and the preload `media` in the build. Removes ink on cloud at 601–700. Check the title and scrim at 601 afterwards; not tried.
4. **Buy back foam detail.** Re-encode `hero-img-018-wide-1440.webp` (`src/make-media.sh`) at a higher quality, up to about 280 KB against the 300 KB limit. Check the figures and the foam at 2× afterwards. Not tried.
5. **Lift the tours and the grey print.** Give the rows' buttons the quiet tint at rest, cobalt on hover or tap, so the column stops being the loudest thing (`#tuktuk`, `shots/desktop-08.png`). Crop the grey sky out of the `img-014` print under "Other waves" (`shots/desktop-07.png`). Give the band's line more air: raise the top of the `inset` in `.feature p`, `src/page.css` line 210, to about `clamp(18px,2vw,32px)`, and check it stays on the sky.

**Keep:** the hero picture and both crops; the phone first screen exactly as it is; the walking front, the masks and the figures' stillness; the churn; the five photo tiles including Advanced; the board chart; Sanjee with his words; tile-to-message; img-002 as the close.

**What the designer prompt got wrong (for the learn step):**
- A clamp on height with `object-fit: cover` on a band whose subject sits low in the file breaks at widths nobody shoots. The hero got a 2560 check after round 2; the same check belongs on every full-bleed. Add 2200×1240 and 2560×1080 to the look loop.
- "Reduce the breathing" was checked by displacement. The shared light moved the same way, and only brightness over time showed it. Motion review should measure both.
- I gave the scrim as a colour and a rough contrast. A critic note on a scrim should give the contrast to aim for (large text 3:1), or a safe build will overshoot.

---

## Round 1 — full (station 5, the built site)

Run `2026-10-midigama-01` · station 5 (full) · **round 1** · visual-critic 0.2.0 · 2026-11-05.
Page: `sites/sanjee-surf-school/final/dist/`, served over http from my own server on 9450; the picked mockup `mockups/interactive/dist/` on 9451. Both stopped afterwards. Nothing else in the worktree was touched.

Independence: I did not open the critic's or experience-critic's report or folder. I shot and looked at the site before opening the earlier rounds above.

### How I looked

All paths are under `reports/2026-10-midigama-01/visual-sanjee-full-r1/`. Screenshots are scratch, so each line says in words what its file shows.

- **GPU:** every capture of mine ran in headless Chromium reporting "ANGLE Metal Renderer: Apple M1". `shots/` is the exception: `tools/shoot.mjs` over http, software GL, read for layout only.
- **First screens, built and mockup:** `fs-final-*.png`, `fs-mock-*.png` at 390, 600, 650, 700, 701, 768, 1280, 1440, 1920, 2560. Also `hero-1440-2x.png`.
- **Mockup comparison:** every viewport-height slice of both builds with motion off, at 390 (1× and 2×), 768, 1280, 1440, 1920, 2560, compared pixel by pixel. Paired shots and amplified differences: `pair-*.png`. Side-by-side crops: `q-hero-2x.png`, `crop-768-tile.png`. File sizes, dimensions and PSNR for the images.
- **Fonts:** font files held back at the network, shot, then released: `fout-*-before.png`, `fout-*-after.png`, `fout-*-script-*.png`, at 390, 768, 1440, 1920, with every heading, paragraph and section box measured before and after. CDP named the real font drawn for each element.
- **Cold load:** 1.6 Mbps, 150 ms RTT, 4× CPU: `cold-390.png`, `cold-1440.png`.
- **Motion:** eight frames 1.2 s apart at 390 at 2×, 1440 and 2560, both builds (`mo-*.png`), mean change per tenth of the screen, filmstrips `strip-final-390.png`, `strip-mock-390.png`, `strip-final-1440.png`, rAF rate over 3 s.
- **Contrast:** words made transparent, background sampled under them, at 14 sizes.
- **States:** tile, card, message, phone menu, chosen wave paragraph: `ix2-*.png`.
- **Runtime trials, nothing on disk changed:** `trial-scrim-*.png`, `trial-tours-*.png`, `t3-*.png`.
- **Gold:** rendered Lavish, Layday and KA at 1440. I opened Layday's whole page (`g2.png`) and not the other two. Global Surf's footage is not in this worktree, so that bar is known to me from its notes.
- **Inspector:** 4 FAIL, 8 WARN, listed at the end of the checklist.

**Limits, stated plainly:**
- **I did not watch it live, and nothing ran on a phone.** "Reads as" comes from frames and measurements. rAF held 60.3 fps at all three sizes on an M1, which says nothing about a mid-range Android. **Phone frame rate is still unknown.** Alon's real-phone viewing of the mockup is the only human evidence for the motion, and it carries over here because the shader is unchanged.
- **Roboto could not be tested.** This Mac has Arial, so the fallback I saw is Arial. Android, the customer's phone, gets the Roboto fallback, and I have not seen it.
- The current site is judged from captures only, as instructed: `old-site-desktop.png`, `old-site-mobile.png`, `funnel/walk/01-home-fold-settled.png`. I did not reshoot it.
- I did not film the mockup's cold load, so I cannot say the loading sequence is the same as the port's.
- `/impeccable critique`, `/emil-design-eng` and the motion-audit skills were not run.
- Unexplained: `scrollHeight` at 768 read 12525 after a scroll and return, against 12604 on load, with no section moved. `tools/shoot.mjs` at 390 similarly reports 12906 against 12985. It is below the footer's content or in its padding. I did not chase it and saw nothing wrong on screen.

### Three-second test (before reading earlier rounds)

- **390 (`fs-final-390.png`):** pale sky, a gold band of cloud, the sun sitting on the horizon, one real wave landing on wet sand. Immediately beautiful, and I would keep going. It is the best thing on the page.
- **1440 (`fs-final-1440.png`):** dusk sea with people in it, a white title and one blue button. I would stop and scroll. The sky is rusty rather than glowing, and the water is brighter than the sky above it. It looks a touch filtered, and I notice that before I notice anything else wrong.
- **Current site (`01-home-fold-settled.png`, `old-site-desktop.png`):** a hotel pool under trunks, a teal "of Your Life" lost in them, an illegible teal eyebrow and a cookie box. This beats it at a glance, at both widths.

### 1 · Did anything change from the mockup? Nothing a visitor would see, apart from the two changes that were meant.

- **Layout:** page height is identical at all six widths (12985, 12604, 9280, 9508, 10122, 11063). Canvas size is identical at all ten widths tested.
- **Date field (`pair-390-date-final.png` vs `-mock.png`):** 19 css px narrower, and "Not sure" sits 19 px further left. The dead space beside the calendar icon has gone. **Slightly better than the mockup.**
- **Photos, 1× and 2×:** same dimensions, except three tile files that differ by one pixel of height. File sizes are within about 3 %. PSNR against the mockup's files is 41–44 dB on the five I measured (both hero files, band, close, waves print). Side by side at 2× I cannot tell them apart (`q-hero-2x.png`: the swimmer, foam and reflection; `crop-768-tile.png`: the palms and beach). I opened only those two crops at that scale, not every photo. **Not worse, not better, as far as I looked.**
- **Pixel comparison, whole page:** mean difference 0.5–1.5 grey levels per slice. The one cluster I can name with a cause is the date field and chip (390 and 768). The 768 "Not sure" tile also shows a cluster, and side by side it looks identical. The 1440 run showed larger scattered clusters across most slices; re-shooting one of them (y=6300) gave only low-level noise on the photo and pure black on all the type (`pair-1440-tours-diff.png`), so I take them as that run's timing. I did not re-shoot the others.
- **Markup:** the hero line is now a `p.hero-title` and the header's name is the `h1` (station 4h). It looks the same, because the title's style moved with it. The inspector's `small-title` and `name-only-title` come from this. That is an SEO decision and not a visual fault: "Surf lessons in Weligama" is still what the first screen says.
- **Fonts arriving: no jump on the first screen, and a visible change of letter style lower down.**
  - **Title, 1440 and 1920:** moves 1.2 px left and grows 2.2 px wider. Same line, same height. **390:** box unchanged, same two lines. **768:** 0.7 px. Arial Bold to Manrope Bold at this size is a change of letterforms, not a jump. I would not expect anyone to notice it (`fout-1440-before.png`, `cold-1440.png`).
  - **Section titles:** they do not move, but they change character. Plain Arial becomes the Courgette script (`fout-1440-script-before.png` vs `-after.png`, "Sanjee, head instructor"). This is the biggest visible change, and only someone already scrolled that far on a slow connection sees it. On the throttled run Courgette was in by about 1.5 s, while the visitor was still on the hero.
  - **Body text set at weight 600** (leads, nav, chips, table cells, quotes) draws in Arial Bold until Manrope lands, and it visibly lightens at that moment (`fout-1440-script-before.png`). It does not move.
  - **Phone only:** in the fallback, two paragraphs ("Surf lessons in Weligama, on…" and "Every lesson includes…") are one line shorter, so everything below shifts by 27 then 54 px when Manrope arrives. Page 12928 → 12984 px. Layout shift 0.0043 with the page scrolled, and 0 on a cold load with no scroll (budget < 0.1). Harmless, and off the first screen.
  - **Roboto not seen**, see limits.
- **Cold load (`cold-390.png`, `cold-1440.png`):** title and button are up at once on the tan ground. The picture paints from the top down at about 1.6–2.2 s, with a hard horizontal edge across the screen in the middle of that, and is whole by about 3 s. The canvas then fades in. The tan matches the picture well, and it reads as loading, not as a fault.

### 2 · The first screen at each width

| Width | Title | Measured title contrast (mean / p5 / min) | Verdict |
|---|---|---|---|
| **390** (`fs-final-390.png`) | ink, 2 lines | 9.71 / 9.62 / 9.50, on `rgb(208,193,172)`, sand | **Above 8.** Clean, balanced, the wave lands in the lower half. Do not touch |
| **768** (`fs-final-768.png`) | white | 6.58 / 5.52 / 4.69 | **Passes, the weakest width.** Top of the sky grey-brown. The landscape file is cropped hard, so the foam fills the lower third at about 1.9× and is the softest on the page |
| **1280** (`fs-final-1280.png`) | white | 6.70 / 5.36 / 4.40 | **Passes.** Tight but composed; button foot at y=249, sun at about y=315 |
| **1440** (`fs-final-1440.png`) | white | 6.71 / 5.37 / 4.40 | **Passes.** Strong, a bit rusty. On a 2× laptop soft at the foam but handsome (`hero-1440-2x.png`) |
| **1920** (`fs-final-1920.png`) | white | 6.46 / 5.34 / 4.43 | **Passes.** The best-balanced desktop |
| **2560** (`fs-final-2560.png`) | white | 6.86 / 5.57 / 4.61 | **Passes.** No pillarbox. Soft at 1:1, fine from viewing distance. Title and button look small on the frame; the calibration wants that |

**Ruling on ink near yellow cloud at 600–700: not a fault. Leave it, and withdraw my round 3 fix 3.**
- I looked at 600, 650, 680 and 700. At 600 the title sits on clear sand (`fs-final-600.png`). As the window widens, yellow flecks come up to the "S" and the cloud reaches under the baseline, most at 700 (`fs-final-700.png`).
- Measured under the words: mean contrast 9.6–9.7 at every step. Minimum falls from 9.26 at 600 to 6.28 at 700, far above the 3:1 large text needs.
- The ground is peach-sand, mean `rgb(222,189,148)` at 700, not orange. The calibration's bar is about text on orange, and this is not that.
- It is also prettier than what happens at 701 (`fs-final-701.png`). The visible problem around that width is the jump from a lit sky to a rust one. Moving the switch would only move the jump and put a white title on a lighter sky at a width nobody has checked. Lightening the scrim (fix 1) shrinks the jump directly.

**The scrim.** My earlier trial value is still what the page needs. Re-tried this round on the built site: `trial-scrim-1440.png` and `trial-scrim-768.png` show burnt orange and a real sunset with the title still strong, and they are simply better pictures than `fs-final-1440.png` and `fs-final-768.png`. Measured with it: title mean 5.08–5.74, p5 4.00–4.52, min 3.21–3.66 across 768–2560 (large text needs 3:1). Wordmark mean 5.96–6.76. Nav mean 6.00–6.73, but p5 is 4.77–4.89 and min 4.32–4.38 at 1280 and 1440, so a few pixels of 15 px nav dip below 4.5:1 where cloud crosses it.

**Hard-fail checks:** video: no file exists, and the earlier ruling stands. Photographs ≥ 1920: img-018 on the long edge, and round 2's Ruling 1 stands. Calibration: title plus one short CTA, no decorative overlay, no reveal animation, white on a darker orange from 701 up. Met at every width.

### 3 · Motion: the same as the mockup. Metal, not software GL.

- **Same code:** `final/src/scripts/swell.js` and `mockups/interactive/src/swell.js` are byte-identical (`cmp`, 9930 bytes). The inline script's differences from the mockup are all in `site.js` matters (message strings, date checks), none in the shader.
- **Same behaviour:** mean change per tenth of the screen, frames 1.2 s apart, at 390: final 0, 0, 0, 0, 1.72, 25.26, 21.60, 12.73, 4.94, 4.31; mockup 0, 0, 0, 0, 1.74, 25.64, 21.84, 12.60, 4.95, 4.33. 1440 and 2560 follow the same pattern, with gaps per band of up to about 8 % at 1.2 s and about 11 % at 8.4 s. The two builds were not on a shared clock, so that is what sampling a moving surface at different moments would give; it is not proof of identity, and the byte comparison is. Sky, sun and upright board do not move at any size.
- **What the frames show:** on the phone the breaker heaves and the spray and foam change, and the sand and shoreline hold (`strip-final-390.png`, same in `strip-mock-390.png`). At 1440 the reflection brightens and dims along the water while the wavelets keep their shape, and swimmers and breaking lines hold (`strip-final-1440.png`). No tearing in any frame. Reads as water in stills.
- **Conclusion:** Alon's viewing of the mockup's foam on a real phone applies to the port. I did not re-judge it, and I did not watch it myself.
- **Reduced motion:** still photograph, and I used that state for all the comparisons.

### 4 · The whole page

**Checklist**
- **Media:** the strongest picture leads, full-bleed. The five photo tiles come next, and they are the page's second-best moment (`shots/desktop-01.png`). img-007 with Sanjee's words is the third (`fout-1440-script-after.png`). The bay close is big and happy (`shots/desktop-10.png`). Fewer photographs than the old site's mosaic, better used, and nothing upscaled badly apart from the 2× hero. The paddler band now holds at every wide size: whole at 2560×1080 and 2560×1440 (`band-2560x1080.png`, `band-2560x1440.png`), so round 3's condition 1 is met.
- **Composition and grid:** tidy, with real scale contrast from the tiles, chart and full-bleed bands. Pale rounded panels make the lessons-to-message run feel a little like a product, though a good one (`shots/desktop-02.png`, `-03.png`).
- **Typography:** Manrope plus Courgette is readable and consistent, and it meets the calibration's "readable face + script". The script is a little wedding-invitation on short words like "Lessons". **One fault I had not called before: Manrope's `|` looks like a capital I.** "Languages: English I Sinhala", "13 Google reviews I as of 5 November 2026", "Bodyboard I per day", "Total beginner, beginner I 2 hours" (`fout-1440-script-after.png`, `shots/desktop-02.png`, `-04.png`). The mockup has it too. It is on every details line, and once seen it can't be unseen. The separator is the calibration's own device, so it has to work.
- **Colour:** dusk, white, pale water, cobalt. The booking colour is unmistakable. The warm hero mood does not come back, and the page runs cool from the tiles down. The chart brings the only colour to the middle (`shots/desktop-03.png`).
- **Hierarchy and rhythm:** the eye always knows where to go. Good pace from hero to Sanjee: picture, tiles, prices, tool, chart, band, man, quotes. It then slackens, as below.
- **Polish:** clean at every width I opened. The row under the lesson cards still sits loosely (`shots/desktop-02.png`). The band's line is parked about 22 px from the band's top edge (`shots/desktop-05.png`, `band-2560x1440.png`).
- **Distinctiveness:** the to-scale board chart, the photo tiles and the tile-built message make it this school's page. Nobody would take it for a template above the tours. The tour list and the footer could be anyone's.
- **Hero and motion:** interesting, clean, one CTA, main item from the business's own media. Meets Shahar's 2026-10-20 bar. Tile select, "for you" dot, the chip row and the highlighted wave paragraph work and look designed (`ix2-final-1440-tile.png`, `ix2-final-1440-waves.png`). I saw these as end states, not as transitions.

**The earlier complaints, looked at again:**
- **Tours: still the dullest stretch, and it is the page's weakest moment.** On a phone it is 2557 css px, about three full screens of 844, and about three and a half of the window left between header and bar (`shots/mobile-12.png`, `-13.png`, `-14.png`). Every row is the same: name, duration, grey lines, price, one cobalt circle. At 1440 it is about 1.3 screens beside a sticky column with a large empty area under it (`shots/desktop-09.png`). Twelve filled cobalt circles are the loudest thing there. With a tint at rest the column goes quiet and the words lead, and it looks considerably calmer on both widths (`trial-tours-1440.png`, `trial-tours-390.png`). That does not make it exciting. It stops it shouting.
- **The Other waves print: half grey sky, still true.** About 40 % of it, by eye, is a flat grey band directly under the coloured Coco Beach print (`ix2-final-1440-waves.png`). Cropped to 3:2 at runtime it improves but is still a third sky (`t3-waves-1440.png`). 16:9 is the target by arithmetic; I have not looked at that exact crop.
- **Is it a page a real business would be proud of? Yes, without hesitation.** A small Weligama school would be delighted, and the page is plainly a different class from what they have. **Against the gold bar it is close, not equal.** Layday (`g2.png`) has a stronger single idea on its first screen and more art direction in its type. This page is more emotional on the first screen, because it is a real place at a real hour, and has a better booking tool. Would a top studio publish it? The phone hero and the tiles, yes. The whole page, not until the tours and the sky are dealt with.

**Inspector, as evidence lines.** FAIL `icon-cards` (three cards; the lesson cards in `shots/desktop-02.png` carry no icon on top, so I do not count it, though I did not trace which row it means), FAIL `eyebrow` (false: "for you" and the price date are not eyebrows), FAIL `edge-text` (768, an "Ask on WhatsApp" 15 px from the edge, 1 px under its line, not visible as a fault), FAIL `covered-text` ("Before you book" passes under the fixed phone bar while scrolling; expected). WARN `size-count` (18 sizes, real but not visible as a fault), `no-footage` (no file exists), `side-scroll` (the quotes' deliberate peek), `lopsided` (false: the print sits beside the text), `small-title` and `name-only-title` (the h1 decision above), `still-page` (contradicted by the shader), `empty-middle` (768, quotes row). None lowers my score.

### Score: 8 / 10

- **Why it holds:** the port changed nothing visible, and the mockup's two round 3 conditions are now met: the band holds at every width, and Alon has watched the foam. The first screen is the real thing at all six widths and above 8 on the phone. Below it the page is professional throughout and beautiful for most of its length. That is my calibration's 8.
- **I checked whether that was inertia.** Taken cold, the page earns an 8 on what is on the screen. It does not earn a 9: the sky is duller than it should be on every desktop, the tours are a long plain list, and the separator is a small typographic error repeated all over the page.
- **Closest reference:** Global Surf in spirit (own water, title and button only), below it because a still with a shader is not footage. Below Layday for art direction, above it for feeling on the first screen.

**Better than the current site: YES, first screen and whole page.**
- First screen: `fs-final-1440.png` vs the top of `old-site-desktop.png`, `fs-final-390.png` vs `01-home-fold-settled.png`. Surf at sunset against a hotel pool, readable against illegible, what and where stated, nothing covering it.
- Whole page: `shots/desktop-sheet.png` vs `old-site-desktop.png`. The old page is 16785 px of teal template cards. Its one advantage remains the Coco Beach mosaic, and the tiles and full-bleed bands use the same kind of material better.

### Fix list, biggest effect first

None of these blocks a pass. All are in `sites/sanjee-surf-school/final/src/`.

1. **Lighten and warm the scrim.** `styles/site.css` line 95, the gradient in `.stage::after`: `linear-gradient(to bottom,rgb(150,116,104) 0,rgb(182,140,116) 34%,rgb(196,160,140) 60%,rgb(226,208,200) 80%,#fff 100%)`. The largest single gain on every desktop and tablet, and it softens the jump at 701. Tried at runtime; I opened 1440 and 768; measured as above. Check the nav at 1280 and 1440, where a few pixels dip below 4.5:1, and the wordmark and nav at 1024.
2. **Make the separator read as a separator.** `pages/index.astro` lines 81, 92, 210, 219, 226, wherever ` | ` is joined: wrap it in `<span class="sep">|</span>`, with `.sep{font-family:Arial,sans-serif;font-weight:400;opacity:.45;padding-inline:.1em}`. Tried at runtime on all 13 text runs in `main`; `t3-creds-1440.png` shows a real thin pipe. The bare ` | ` in the rating's `<i>` and in `details` should go through the same wrapper. Screen-reader text and the `.r-t i` phone rule at `styles/site.css` line 323 should be checked after.
3. **Quiet the tour column and shorten it on phones.**
   - `styles/site.css`, after line 58: `.tour .ico{background:var(--water);color:var(--book)}` and, inside the hover query, `.tour:hover .ico,.tour .ico:hover{background:var(--book);color:#fff}`. Tried and looked at both widths (`trial-tours-*.png`). Icon contrast on the tint not measured.
   - Phone, line 362 onward: put the price on the name's row or beside the duration so it stops taking its own line. About 45 px × 12 rows, so roughly a fifth of the section. Not tried.
4. **Fill the empty column beside the tours on desktop.** `.tours-copy` is sticky with about 400 px of nothing under it at 1440 (`shots/desktop-09.png`). Add one own print under its text, at no more than 500 css px, desktop only. img-019 (stilt poles and footprints, 1440 px, on the page nowhere) is the candidate from concepts §2. **I did not open that picture this round and did not try this.** Copy rule R2-N2 stays met, because the text and rows are untouched.
5. **Crop the grey sky off the waves print.** `lib/slots.mjs` line 46: `crop: null` to about `[1280, 720, 0, 240]`, then rebuild the file. It is the same crop form as `back-wide`. 3:2 tried at runtime and not enough (`t3-waves-1440.png`). 16:9 by arithmetic, not looked at.

**Smaller, in order:**
- Give the band's line more air: `styles/site.css` line 224, the first value in `inset` to `clamp(18px,2vw,32px)`. Shot in the trial (`t3-band-1440.png`), but I did not open that shot, so check it stays on the sky.
- Phone board chart: `styles/site.css` lines 327–332. Six boards at 104 px scroll sideways, so the shortest and longest are never on screen together and the "to scale" idea is lost at the width that matters most (`shots/mobile-05.png`). Worth trying six narrower boards that fit, with shorter labels below. Not tried, and the labels may not fit.
- Re-encode `hero-img-018-wide-1440.webp` at a higher quality (176 KB against the 300 KB limit, `lib/slots.mjs`) and compare at 2×. The source is 1440 px, so expect a modest gain. Round 3's fix 4, still not tried.
- Tablet portrait could use the tall file. At 768×1024 the wide file is drawn at about 1.9×, and the 1000 px tall file would be about 1.5×. It would need the switch and the title colour looked at together. Not tried.

**Keep:** the hero picture and both crops; the phone first screen exactly as it is; ink up to 700; the swell; the five photo tiles; the board chart; img-007 with Sanjee's words; the tile-built message; the bay as the close; the narrower date field.

**What the designer prompt got wrong (for the learn step):**
- A separator was specified as a character (" | ") and nobody checked how the chosen face draws it. Picking a typeface should include looking at the punctuation the page relies on.
- The fallback faces were tuned for line breaks, and they work, but only Arial could be checked here. The phone fallback, Roboto, is untested on this machine. Station 4g needs a way to look at it, or a stated limit in its notes.
- My own fix list has no owner between rounds: the scrim, the tours and the grey print were called in round 3 as optional and came through the port untouched. That is correct, because a port must not redesign, but a full-mode round then scores the same open items again.
