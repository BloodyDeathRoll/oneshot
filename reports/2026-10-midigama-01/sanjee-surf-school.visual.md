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
