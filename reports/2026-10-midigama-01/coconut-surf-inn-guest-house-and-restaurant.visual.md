# Coconut Surf Inn — visual-critic

## Round 1 — quick (station 4f)

Run `2026-10-midigama-01` · station 4f (quick, the three mockups) · **round 1** · visual-critic 0.2.0 · 2026-11-05.
Pages: `sites/coconut-surf-inn-guest-house-and-restaurant/mockups/{calm,interactive,unique}/dist/`, also served live at :8921 / :8922 / :8923. Concepts: `sites/coconut-surf-inn-guest-house-and-restaurant/concepts.md` (creative-director 0.6.1).

Shot sets. Screenshots are scratch and get deleted after the round, so every line below says in words what its file shows.
- **The mockups:** the shared `sites/<slug>/mockups/<variant>/shots/` sets (desktop-NN / mobile-NN at 1440 / 390, scrolled). Each set is newer than its dist, so I reused them:
  - calm: dist 01:22:16, shots 01:22:40; 18 + 22 captures;
  - interactive: dist 01:25:35, shots 01:27:14, shot with `?depth=force`; 14 + 17 captures;
  - unique: dist 01:30:54, shots 01:31:30; 15 + 19 captures.
- **My own Playwright walk** (SwiftShader WebGL), in `reports/2026-10-midigama-01/visual-coconut-r1/shots/`:
  - `int-left` / `int-right` / `int-rest` / `int-crops`: the interactive hero with the pointer at the left edge, then the right edge, then at rest;
  - `calm-m-t0` / `t7` / `t15` / `calm-pan`: the calm phone hero at 0, 7 and 15 s;
  - `uni-wipe-00…15` / `uni-wipe-grid`: the unique set-piece at 1440, scrolled through the pin in 250 px wheel steps;
  - `mobile-00-trio`: the three phone first screens side by side;
  - `lotus-m-00` / `lotus-vs-unique`: the shipped Lotus site's phone first screen beside unique's.
- **Tasteskill inspector:** calm 8 FAIL / 5 WARN, interactive 10 FAIL / 9 WARN, unique 6 FAIL / 6 WARN.

**Current presence.** The business has **no website**. The comparison is what a visitor reaches today:
- `dossier/…/funnel/walk/05-booking-com-fold.png`, the Booking.com phone listing: a navy bar and a yellow search box; "Coconut Surf Inn" in heavy black type with the 8.5 badge; then a grey, empty concrete entrance hall with a ceiling fan (1/45); then a yellow "Choose dates to see prices" block. It does not show the sea.
- `01-google-listing-fold.png`, Google Maps: a map, "4.8 ★ (88) · 3-star hotel", blue Directions / Call buttons, and the same dim entrance-hall photo.

The bar for "better" is low. **All three first screens beat it at a glance**, because all three open on the sea from the house, which no listing shows.

**Material context**, which I accept from `concepts.md` §2:
- There is no usable video. All three clips are third-party, and vid-003 is another business's drone film. The video hard fail therefore does not apply.
- 70 own photographs are ≥ 1920 px, and **every first screen carries one of them** (img-009 or img-102), so the photo hard fail is not triggered.
- The room photographs are ordinary phone snapshots, and the budget rooms are dim night shots.

Independence: I did not open the critic's or experience-critic's output for this business.

---

## 1 · calm "The view from the roof"

**Three-second test**
- **1440 (desktop-00):** img-009 full-bleed. A big, pale, overcast sky fills the top half. Then palms, the sea with whitewater on the reef, the blue-tarp beach shacks and the green. "Coconut Surf Inn" is set in dark-ink Satisfy at 60 px, centred in the sky, with the location line and one leaf-green pill under it. It is calm, clear, and obviously a beach place. The photograph is a hazy phone shot: grey-white sky, soft palms, and power lines and poles across the bottom right. I would scroll.
- **390 (mobile-00, calm-pan):** a tall crop, mostly sky and palm trunks, with the title and a full-width green button in the upper third. The one-time pan **is visible**. Between t0 and t15 the frame travels from the left palms to the right (PSNR 13.4 dB, a clear change). It ends on the bushes, two walkers and a corner of tin roof, not on the reef. That is the ending the concept's own failure note warns against.

**Checklist**
- **Media:** the best wide view leads, unobstructed, with the calibrated form (title, short line, one button). After the hero the photographs drop to small sizes:
  - The six rooms are 4:5 slideshows about 340 px wide (desktop-02…08).
  - img-103 (the roof, 21:9 full-bleed, desktop-09) is the only other big picture. It is good, but the hammock in the foreground is cut through the middle.
  - Sunset img-008 is a 4:5 print beside the turtle photo (desktop-10).
- **Composition and grid:**
  - "Six kinds of room" is the page's biggest problem. It is **six alternating 6/6 rows, each a tall slideshow beside a short text block**, and runs about 6 screens at 1440 (desktop-02 → desktop-08). Half of every screen is empty tint (desktop-03: the Superior room photo on the right, three lines of text bottom-left, nothing else). The inspector flags an empty middle of 1630 px. It is the same failure the Lotus calm had at 4f.
  - The 7/5 "Inside the house" split (desktop-08) and the "From 7:30, the break" + Rosa row (desktop-13/14) are orderly.
- **Typography:** Onest + Satisfy is tasteful and close to the "readable text + hand-lettered titles" bar. "Six kinds of room", "Inside the house", "On the roof" and "11:00, check-out" all read well. Weak spots:
  - 15 font sizes (inspector).
  - The closing sentence is set in Satisfy at 40 px over 3 lines (desktop-17). That is long for a script.
  - "The restaurant upstairs" breaks onto two lines at 1440 (desktop-12).
- **Colour:** white, a cool sky tint and a saturated banana-leaf green. The green is unmistakable and distinct in the run, and white on it passes. There is no deep or saturated band anywhere: the page is pale from top to bottom.
- **Hierarchy and rhythm:** the eye always finds the button, and the phone bar ("Check dates on Booking.com" + phone icon) is on every mobile frame. The pace is uniform: white/tint alternation with one full-bleed band.
- **Polish:** clean pills and real footer buttons (desktop-17).
  - Resting shadows on every booking button, plus text-shadows on the hero (inspector).
  - The "Rack for your boards" detail line wraps into an orphan under the trust row (desktop-01).
  - Mobile: "Inside the house" passes under the sticky header at one scroll position (inspector covered-text).
- **Distinctiveness:** the view makes it Coconut. Below the hero, it is a tidy guesthouse template.
- **Hero and motion:** the hero is clean, with one clear CTA. Motion is micro only (the pan, the 1.02 settle, dots, the bar), which is correct for calm. The inspector reports a "still page": 3 elements moved.

**Score: 6 / 10.** Competent and tasteful, and template level below the fold. It is closest to Global Surf `postcard` in method (script titles, one CTA, dot slideshows, a real footer). It is below it in section variety, and the rooms run is a long stack of half-empty rows.
**Better than the current presence?** **Yes.** First screen: desktop-00 / mobile-00 against 05-booking-com-fold (the sea and the reef against an empty entrance hall). Whole page: yes, clearly on clarity (fan vs A/C said plainly), modestly on beauty.
**Hard fail:** dimension 8 below 8.

**Fix list (biggest effect first)**
1. Compress "Six kinds of room" to about two screens. Use **two groups, each one row**:
   - A/C: four rooms as a 4-up of 4:5 slideshows with text under each.
   - Fan: two rooms as a 2-up.
   - Or one large 4:3 stage with a room list beside it.
   No 6/6 row may hold a 340 px photo beside three lines of text (desktop-02…08).
2. Add a second and third full-bleed moment of pace. Use img-008 (sunset) full-bleed between "On the roof" and "By the beach", and img-099 (the house lit at night) as a dark 21:9 band before "The restaurant upstairs". The page needs one deep, saturated change of gear, and both photographs exist at 1920 px.
3. Re-crop the hero:
   - Desktop: start the 16:9 crop lower, so the bottom edge sits above the wires and poles (bottom right of desktop-00).
   - Phone: end the pan on the reef and whitewater, not on the tin roof and bushes (calm-m-t15).
   - Lift the flat grey sky slightly (+contrast, not a tint).
4. Re-crop img-103 in the roof band (desktop-09) so the hammock is whole or out of frame, not cut through the middle.
5. Tidy: flat buttons without resting shadows; no hero text-shadow (the ink on the pale sky already passes); bring the scale to about 6 sizes; set the closing line at 32 px or as body text with a short script lead; fix the "Rack for your boards" orphan.

**Keep:** img-009 as the hero with the centred script title and one green pill, the one-time phone pan, Onest + Satisfy, the banana-leaf green, the plain fan / A/C grouping, the Rosa row without rules, and the footer.

---

## 2 · interactive "Under the thatch"

**Three-second test**
- **1440 (desktop-00):** img-102 full-bleed. The thatch fringe hangs across the top, a dark pillar sits on the left, and the swing frame and a bright potted tree are on the right. The sea and windblown palms show between them, and the concrete terrace with sun-dapple fills the bottom. **It is the most atmospheric photograph of the three**: you are standing on the roof. "Coconut Surf Inn" is set in white Shadows Into Light Two at 64 px, with a white location line and a saffron pill. The title face is thin and scratchy, like a marker note, and does not match the photograph's quality. I would scroll.
- **390 (mobile-00):** the thatch fringe fills the top third, with the sea in a band and the title over the parapet. A large dark terrace floor fills the bottom. The phone gets no parallax without a tilt permission. It is moody and good, but darker and greyer than the desktop.

**Checklist**
- **Media, and the main item:** the WebGL depth parallax is live (`?depth=force`: one 1440×900 canvas at opacity 1).
  - Moving the pointer from the left edge to the right edge shifts the near layers by about 10–15 px against the horizon (`int-crops`: the pillar and the swing frame move, the palms behind barely move; PSNR 16.7 dB between the two frames).
  - It reads as a real 3D shift when you move the mouse, with no visible tearing of the fringe at this amplitude.
  - At rest, nothing moves. A visitor who does not move the pointer sees a still, and on a phone almost everyone sees a still.
- **Other media:** this variant has the best pace below the fold.
  - img-008 sunset as a full-bleed 16:9 band (desktop-07).
  - img-099, the house at night, as a 21:9 band (desktop-09/10).
  - img-007 for the light-well at 3:2 (desktop-04).
  - The room stage (desktop-02): a 4:3 slideshow about 390 px wide beside a list. The Superior photo (the green towel on a bed) is soft and unflattering at that size.
- **Composition and grid:**
  - The sleep tiles plus list-and-stage (desktop-02) are the **best room presentation of the three**: compact, one tap per question, fan / A/C / hot-water chips.
  - Against it: the "13:00, check-in" row is a **4-up of identical icon cards** (desktop-01, inspector icon-cards), the template pattern.
  - Grey rounded cards repeat everywhere: facts, list, quotes and forecast.
  - The veranda row and the quote row are cut at the right edge (desktop-04, desktop-12; inspector side-scroll ×9).
  - The inspector flags empty-middle runs of 2995 px ("How do you like to sleep?", "11:00, check-out").
- **Typography:** Shadows Into Light Two is the weak link. "How do you like to sleep?", "Inside the house", "The restaurant upstairs" and the closing statement (desktop-02/04/09/13) are hairline, scrawled and uneven. It reads as casual marker, not as the inn's sign. The header wordmark in the same face (desktop-00, mobile-00) is barely there. There are 18 font sizes in use. Nunito Sans body is fine.
- **Colour:** saffron on cool white, aubergine for the big numbers. The saffron is warm, distinct in the run, and white on it passes. The sunset and night bands give the page its only saturated moments, and they work.
- **Hierarchy and rhythm:** the phone bar has three buttons (book, call, expand ˄) on every frame, and is clear. The sections vary in pace better than calm.
- **Polish:**
  - Resting shadows on 22 elements, and a gradient + shadow on the book button (inspector button-fx).
  - Rolling-digit strips (inspector headline-lines "0 1 2 3 …").
  - The quote card byline sits 14 px from the screen edge (desktop-12).
  - Mobile: "11:00, check-out" passes under the bar (covered-text).
- **Distinctiveness:** the thatch hero and the "how do you like to sleep" switch belong to this place. The icon-card row and the grey card system do not.
- **Hero and motion:** interesting, clean, one clear CTA. The main item exists and works on pointer, but only on pointer. Micro-animations are present (tile lift, pill slide, rolling digits, drag rows).

**Score: 6 / 10.** It has the best hero photograph and the best mid-page pace, but it is held down by the title face, the icon-card row and the grey-card sameness. It is closest to Global Surf `try-your-week` in intent (a place you stand in). It is below it because the hand face cheapens the hero and the motion is invisible without input.
**Better than the current presence?** **Yes.** First screen: desktop-00 / mobile-00 against 05-booking-com-fold (under the thatch looking at the sea, against an empty hall). Whole page: yes, and the sleep switch is a real improvement on Booking's contradictory room info.
**Hard fail:** dimension 8 below 8.

**Fix list (biggest effect first)**
1. Replace Shadows Into Light Two everywhere. Use a firmer hand with real weight for the titles only (a brush or signwriter script at 600+ weight, checked against the sign img-002). Set the header wordmark in the text face or the same new script at weight. The closing statement goes to body text.
2. Make the main item visible without input. Run a slow idle eye-drift (±6–8 px at the near layer over 8–10 s, looping gently, paused off-screen), so the depth reads on a still visit and on phones. Keep the pointer response on top of it. Test: two frames 3 s apart, no pointer, must differ visibly.
3. Replace the 4-up icon-card row (desktop-01) with one " | " details line and the two ratings set large. Remove the grey card behind the quotes and the forecast headline: use space and a tone step, not boxes.
4. Grow the room stage. Make the 4:3 stage about 640 px wide (≤ native) and lead each A/C room with its best frame (for the Deluxe with Balcony, the rattan-chair balcony shot, not the towel-on-bed shot). Close the empty-middle runs in the sleep section and the check-out section.
5. Tidy: flat booking buttons (no gradient, no resting shadow); end the veranda and quote rows inside the grid, or show their peek clearly as a carousel with dots; move the byline off the screen edge; brighten the mobile hero crop slightly (mobile-00 is grey-dark at the bottom half).

**Keep:** img-102 as the hero and the depth-parallax idea, the saffron accent, the sleep tiles + list-and-stage, the sunset full-bleed band, the night 21:9 band, and the expandable phone bar.

---

## 3 · unique "Round the clock"

**Three-second test**
- **1440 (desktop-00):** a white top. "Coconut Surf Inn" is set in ink Caveat at 72 px, clean and confident, with the location line and a vermilion pill. Below it, img-009 rises out of the white: the sky dissolves upward into the page, and the palms, sea, shacks and reef fill the lower 70 %. It is airy, clean and unusual. The dissolve works because the sky is already pale. **But** at a glance it reads partly as a washed or fogged photograph rather than as an intentional idea, and the bottom edge still carries the tin roof, wires and tuk-tuks (lower right). I would scroll.
- **390 (mobile-00):** the best phone first screen of the three. Title, line and button sit on pure white, with full contrast and no shade. A tall view of palms and the reef rises from below. It is calm, legible and inviting. The round vermilion Call button sits in the header.

**Checklist**
- **Media, and the main item:** the set-piece is the best thing in the whole set.
  - A sticky split: the pinned photograph is on the right 7 columns, with a clock line and a vermilion sun disc moving down it (uni-wipe grid).
  - The frames: img-103 (the roof, desktop-06), img-008 (a saturated sunset, desktop-07), img-099 (the house lit at night, desktop-08), img-105 (the restaurant at 7:30, desktop-09) and img-009 (the break, desktop-10).
  - The WebGL canvas is live (704×836 at opacity 1 throughout the pin). The sun disc steps Afternoon → Sunset → 22:00 → 7:30 → The break as the blocks pass.
  - It tells "a day here" in the business's own big photographs, and it is engaging.
  - Gaps: the last frame (img-009, desktop-10) ends about 120 px short of the viewport bottom, so a white slab shows under it. The phone pin (mobile-09…12) leaves a lot of empty white between the timeline and the next faded title.
- **Composition and grid:**
  - The rooms are 3:2 slideshows, two per row, with "A/C | Hot water" / "Fan" chips on the photo (desktop-02…04). They are compact and honest, and the dim fan rooms stay small, which is right.
  - "Inside the house" is not a true masonry. It has a hole under the middle column and a lone portrait bottom-right (desktop-05, `uni-pin-grid` bottom right).
  - The sign as a matted print in "Getting here" (desktop-13) carries a heavy drop-shadow mat, which looks dated (inspector shadow).
- **Typography:** Red Hat Text + Caveat is the strongest pair in the set. Caveat titles ("Six kinds of room", "The afternoon", "Today on Coconuts", "11:00, check-out") have weight and the sign's bounce, and they read at every size. The body is a little small and light inside the set-piece text column (desktop-06…09). The closing line in Caveat over 2 lines (desktop-14) works better than calm's or interactive's. 13 sizes.
- **Colour:** white, a cool grey tint, ink, and the sign's vermilion for the booking button, the hour marker and the round Call button. It is consistent, and the sun-disc idea is genuinely brand-led. The set-piece's sunset and night frames give the page its saturated moments. See the accent verdict below for the Lotus closeness.
- **Hierarchy and rhythm:** this page has the most varied pace: white opener → fact paragraph → 2-up rooms → masonry → a 450 vh pin → forecast → one big quote → sign print → closing. The phone bar ("Check dates on Booking.com" + "Find your room") is on every frame.
- **Polish:**
  - Mobile: the inspector reports the set-piece titles passing 100 % under the pinned media at some scroll positions ("The afternoon", "Sunset", "From 7:30", "The break"). On the phone sheet the titles appear faded below the timeline first (mobile-10), so a reader sees them arrive. Acceptable, but the empty band is visible.
  - Two small timeline labels sit 14 px from the phone's edge.
- **Distinctiveness:** highest of the three. The clock, the sun disc and the dissolve all belong to this inn and to no other site in the run.
- **Hero and motion:** clean, with one clear CTA. The hero itself is still (by concept). The main item is the set-piece, and it is seen by everyone who scrolls. Micro-animations: the disc easing, dots, press-fill.

**Score: 7 / 10.** The best idea, the best type pair and the best mid-page section in the set. It is held back by a hero that partly reads as a fogged photo with clutter at its foot, a masonry with holes, the slab at the end of the pin, and the dated print mat. It is closest to `the-lavish-haven.html` in method (the place's own picture held on a white page with the type on white). It is below Lavish because Lavish's shape is crisp and decisive at the first glance, while this dissolve is soft and its picture is grey.
**Better than the current presence?** **Yes.** First screen: mobile-00 / desktop-00 against 05-booking-com-fold (the reef and the green under a clean title, against an entrance hall in an OTA frame). Whole page: yes, clearly. It is the only one of the three that sells what a day there is like.
**Hard fail:** dimension 8 below 8.

**Fix list (biggest effect first)**
1. Make the hero decisive, not foggy:
   - Shorten the dissolve to about the top 25 % and end it **under** the palm crowns, so the crowns stand crisp against white.
   - Lift the photograph's contrast and blue slightly (the grade, not a tint).
   - Crop the bottom edge above the tin roof, wires and tuk-tuks: at 1440, raise the crop so the bottom sits at the path and the green (desktop-00, lower right).
2. Fix the set-piece's exit and the phone pin. The last frame must fill the pinned height, with no white slab under img-009 (desktop-10). On the phone, cut the blocks to about 60 svh each so no empty white band sits between the timeline and the next title (mobile-09…12).
3. Rebuild "Inside the house" as a gap-free masonry or a clean 3-up. No hole under the middle column, and no lone portrait (desktop-05).
4. Change the booking colour away from Lotus's brick (see the verdict below). Keep the sun vermilion for the hour disc and the round Call button.
5. Remove the drop-shadow mat on the sign print (desktop-13), set the set-piece body at 17 px in full ink, and take the timeline labels in from the phone's edge.

**Keep:** the clock structure and the sticky-split set-piece with the sun disc, the five frames and their order, Caveat + Red Hat Text, the title on white, the 2-up rooms with Fan / A/C chips, the forecast row, the single big quote, the round Call button, and the closing.

### The accent: is `#BE4532` too close to Lotus's shipped `#B8431C`?

**Yes, too close.** Measured:
- Hue 8° against 15°, a 7° gap.
- CIE ΔE76 ≈ 9.7 (L 46 / 45, both strongly red-orange).
- The inspector also flags unique's button as a "terracotta / rust-orange accent".

Side by side (`lotus-vs-unique.png`, both phone first screens), the two buttons are **the same object**: the same pill, the same calendar icon, the same label "Check dates on Booking.com", and a red-orange that a viewer cannot tell apart without the two touching. The difference in hue is real but sub-perceptual at button size. Two sites from one studio in one village with an identical booking button reads as a template, which is exactly what a pitch must not show.

Recommendation, for the human at the pick:
- **(a)** Make the booking button the sign's **ink** (`#252323`, white text, 15.6:1). The sign is a black palm in front of an orange sun. Use the vermilion only for the sun-disc hour marker and the round Call button, where it becomes the accent it was meant to be.
- **(b)** Use the concept's own fallback, the banana-leaf green, which is free if unique is picked (only one variant ships).

I prefer (a): it keeps the sign's two colours and makes the sun the one round, orange thing on the page, as the concept intended.

---

## Ranking at 4f (visual quality only)

1. **unique "Round the clock" (7/10):** the only page with a real idea carried through. Its clock set-piece of the inn's own 1920 px photographs is the best section in the set, and it has the strongest type and the best phone first screen. The hero dissolve needs to be crisper, and the booking colour must move away from Lotus's.
2. **interactive "Under the thatch" (6/10):** the most atmospheric hero photograph and the best mid-page pace (sunset and night bands, a good room switch), but a thin marker-style title face, an icon-card row, and parallax nobody sees without moving a pointer.
3. **calm "The view from the roof" (6/10):** a clean, tasteful sea-view hero with a visible phone pan, but six screens of half-empty room rows and a uniformly pale page below the fold.

**All three fail dimension 8 (< 8) and go back to the designer before any human sees them.** All three are clearly better than the current presence (an OTA listing that opens on an empty entrance hall).

**What the designer prompt got wrong (for the learn step):**
- The same pattern as Lotus. With strong 1920 px material, the designs still spent most of their length in pale, card-and-slideshow rows at small scale. The best pictures (img-008, img-099, img-102/103) were mostly used once or not at all as full-bleed.
- Calm repeated the half-empty 6/6 room row after it was named at Lotus's 4f.
- Interactive again chose a thin casual hand face for titles (Patrick Hand at Lotus, Shadows Into Light Two here).

The prompt should say:
- every page carries at least two full-bleed or near-full-bleed moments after the hero when ≥ 1920 px material exists;
- a room list never runs longer than two screens at 1440;
- a title script must have real stroke weight (no hairline or marker hands);
- a pointer-only main item must also move visibly at rest;
- a booking button's colour, shape and label together must not repeat a sibling site already shipped in the same run.

---

## Round 2 — quick (station 4f)

Run `2026-10-midigama-01` · station 4f · **round 2** (after the 4e loop-back, designer 0.7.1) · visual-critic 0.2.0 · 2026-11-05.
Pages served live at :8921 (calm), :8922 (interactive, `?depth=force` for my walk), :8923 (unique). I read each mockup's round-2 notes for *what changed*; every verdict below comes from the screenshots.

Shot sets (scratch, deleted after the round; every line says in words what the file shows):
- **Shared sets**, each newer than its dist, so reused: calm dist 10:26:49 / shots 10:27:09 (16 desktop + 19 mobile); interactive dist 02:05:52 / shots 02:07:02 (13 + 17); unique dist 02:04:57 / shots 02:05:00 (15 + 17).
- **My own walk** in `reports/2026-10-midigama-01/visual-coconut-r2/shots/`:
  - `calm768-sheet` / `int768-sheet` / `uni768-sheet` (+ `*-t768-NN`): each page at 768 × 1024, 1000 px steps. Scroll width = 768 on all three (no overflow).
  - `int-idle-{1440,390}-{a,b}`: the interactive hero with **no pointer**, two frames 3 s apart.
  - `uni-pin-3600 … 8400` / `uni-pin-grid`: unique's set-piece at 1440, settled 1.5 s at each 600 px step; `uni1440-walk` / `uni390-walk`: the same at reading pace.
  - `mobile-00-trio`: the three phone first screens side by side.
- **Inspector** (run on the three exact URLs; `.taste-skill/` removed after): calm 4 FAIL / 7 WARN (was 8/5), interactive 9 FAIL / 6 WARN (was 10/9), unique 4 FAIL / 4 WARN (was 6/6).
- **Current presence:** unchanged, no website; the Booking.com phone fold (`dossier/…/funnel/walk/05-booking-com-fold.png`: blue bar, search box, an empty entrance hall 1/45) and the Google fold. The material context of round 1 stands (no usable video; 70 own photos ≥ 1920 px; every first screen carries one).

Independence: I did not open the critic's or experience-critic's round-2 output.

### 1 · calm "The view from the roof" — round 2

**Round-1 fixes, checked**
| # | Round-1 complaint | Round 2 | Evidence |
|---|---|---|---|
| 1 | Rooms = six half-empty 6/6 rows, ~6 screens | **Fixed.** A/C rooms are one 4-up row of 4:5 slideshows; the fan rooms one row; ~1.9 screens at 1440 | desktop-02 (four A/C cards in one row: balcony rattan chairs, hammock + board veranda, bed, red-wall family room), desktop-03 |
| 2 | No full-bleed pace after the hero | **Fixed.** Sunset img-008 full-bleed, then the night img-099 band with the white script title on the black sky | desktop-07 (pink-orange sky, three palm silhouettes, edge to edge), desktop-09 (the house lit at night, "The restaurant upstairs" in white) |
| 3 | Hero crop: wires/poles at the foot; phone pan ends on the tin roof | **Fixed, at a cost** (below). Desktop is cut above the wires; phone pan ends on the reef | desktop-00 (sky, palm row, a strip of sea; no poles), mobile-00 |
| 4 | Hammock cut through the middle | **Fixed.** img-103 re-cropped; the whole hammock in the band | desktop-05/06 (grey hammock whole under the thatch) |
| 5 | Resting shadows, hero text-shadow, 15 sizes, closing at 40 px, orphan | **Mostly fixed.** Flat buttons, closing at 32 px, no orphan; 14 sizes; text-shadow kept on the header over the photo | desktop-14 (closing in two Satisfy lines over flat green + outline Call), inspector `size-count` 14 |

**Three-second test, fresh**
- **1440 (desktop-00):** a blue sky over a row of palms, a thin band of sea at the very foot; ink Satisfy title, one line, a leaf-green pill, all in the sky. Clean and calm. But the fix took away what made it *this* place: the reef, the green and the beach are gone, and what remains reads as a generic tropical sky that any Sri Lanka listing could open with. The photo is soft at 1440 (crop of 1810 px, slight phone-sharpening halo on the fronds).
- **390 (mobile-00, `mobile-00-trio` left):** the same: sky, tall palms, sea at the foot; ink type legible.

**New / remaining problems**
- **Fan-room row (desktop-03):** the label "Fan rooms: no air conditioning and no hot water" and the check-in line sit at the bottom-left with ~420 px of empty tint above them, beside two tall 4:5 dark room photos. It is the round-1 half-empty row in miniature.
- **Pale run between the bands:** "13:00, check-in", "Six kinds of room", "From 7:30, the break", "11:00, check-out" and "Getting here" are all white or grey-tint centred blocks with large empty bands (desktop-04 top: ~150 px of empty grey under the room buttons; desktop-12: ~110 px of empty grey above "From 7:30"; mobile-15/16: an empty grey band under the review dots). Inspector `empty-middle` at 768 (1382 px in "Six kinds of room").
- At 768 (`calm768-sheet`) the layout holds; the fan row stacks properly; the sticky header covers "The Eranga family home" and "11:00, check-out" at one scroll position each (inspector `covered-text` @768).
- Margins 88 px left / 116 px right at 1440 (inspector `off-centre`).

**Score: 7 / 10** (round 1: 6). The rooms and the pace are genuinely fixed and the page now has a day → sunset → night rhythm. It is held below 8 by a first screen that became anonymous sky, the half-empty fan row and the pale centred blocks between the bands. Closest gold: Global Surf `postcard` in method; below it because its first screen no longer says "this house, this reef".
**Better than the current presence?** **Yes** — first screen desktop-00 / mobile-00 vs 05-booking-com-fold (sky, palms and sea vs an empty hall); whole page clearly (two-row rooms with A/C vs fan stated, three full-bleed moments).
**Hard fail:** dimension 8 below 8.

**Fix list (to reach 8)**
1. Give the first screen its place back: keep img-009 but shift the 16:9 so the sea and the reef whitewater are the bottom ~25 % (the wires can be cut by ending the crop at the green, as unique's crop does from y 20 → 1100), or set the title block higher so the frame can start lower. The phone already ends on the reef; desktop needs it too.
2. Fan row (desktop-03): top-align the label block with the photos, and fill its column (the check-in/out line, the house note and a small "Fan rooms" photo strip or the two cards at 3:4 so the row is shorter). No column of empty tint taller than ~120 px.
3. Tighten the vertical rhythm of the tint blocks: cut the empty grey bands above "From 7:30", under the room buttons and under the review dots to the section's normal padding.
4. Equal side margins at 1440 (88 / 88), and stop the header covering the section titles at 768 (scroll-margin-top on headings, or let the header hide on scroll down).
5. Bring the type scale to ~8 sizes.

**Keep:** the 4-up A/C row, the sunset and night bands, the whole-hammock roof band, ink Satisfy on the sky, the banana-leaf green, the one-time phone pan ending on the reef, the footer.

### 2 · interactive "Under the thatch" — round 2

**Round-1 fixes, checked**
| # | Round-1 complaint | Round 2 | Evidence |
|---|---|---|---|
| 1 | Shadows Into Light Two: thin marker title | **Fixed.** Merienda 700: a weighted sign-painter hand, confident at 64 px and as the wordmark | desktop-00 ("Coconut Surf Inn" white, solid strokes, over the parapet), desktop-02 "How do you like to sleep?" |
| 2 | Parallax invisible without a pointer | **Fixed.** Idle drift: two no-pointer frames 3 s apart differ at PSNR 17.3 dB (1440) and 18.3 dB (390), as large as round 1's full pointer sweep (16.7); one live canvas at opacity 1 at both widths; no tearing of the fringe | `int-idle-1440-a/b`, `int-idle-390-a/b` |
| 3 | 4-up icon-card row; grey cards everywhere | **Fixed.** "13:00, check-in" is a details line, the booking pair and the two ratings set large (76 px); the quotes and the forecast sit on white | desktop-01 (8.5/10 and 4.8/5 large at right, text left), desktop-11 |
| 4 | Room stage too small, towel shot leading | **Fixed.** Picks row over a stage ~880 px wide; Superior leads with the hammock + board veranda | desktop-02 (hammock, red-brown French doors, a surfboard against the wall, filling ~2/3 of the screen) |
| 5 | Gradient/shadow buttons; rows cut at the right edge; byline at the edge; dark phone hero | **Partly.** Phone hero cropped tighter and brighter. **Still:** the review row is cut at the right edge with no visible control at 1440 and 768; the inspector still finds a gradient button fill and resting shadows on the pill and the slideshow arrows | desktop-11 (a fourth review column cut at "clear / a gre…" at the right edge, no dots or arrows), `int768-sheet` frame 12 (same at 768), inspector `button-fx`, `shadow` |

**Three-second test, fresh**
- **1440 (desktop-00):** standing under the thatch, the sea and windblown palms framed by the fringe and the swing, the title in a strong white hand on the parapet, one burnt-saffron pill. It moves on its own now. This is the best first screen of the three and the most "this place".
- **390 (`mobile-00-trio` middle):** thatch and a hanging bulb at the top, palms and a band of sea, the title on the dark parapet, the button on the floor. Moody, clear, alive.

**New / remaining problems**
- The review drag row (above) and the veranda strip (desktop-04 bottom: a fourth photo cut at the right edge) read as layout errors, not carousels.
- Grey-tint sections still carry most of the page between the photographs ("How do you like to sleep?" 2834 px `empty-middle`; "11:00, check-out" a single line of three ratings then the cut review row).
- The restaurant block (desktop-08/09) stacks four mid-size rounded photos with text between; it is orderly but is the one stretch that feels like a card layout.
- 17 font sizes; Nunito Sans body at 13–14 px in the check-in details line is small and grey (desktop-01).

**Score: 7 / 10** (round 1: 6). The hero now earns an 8 on its own (a strong sign-hand, a living main item from the house's own photograph, one CTA), and the rooms stage is good. The page below still has the unresolved round-1 polish items: rows that run off the right edge with no control, gradient and shadow on buttons, and long grey sections. Closest gold: Global Surf `try-your-week` (a place you stand in); just below it on polish.
**Better than the current presence?** **Yes** — desktop-00 / mobile-00 vs 05-booking-com-fold (under the thatch looking at a moving sea vs an empty hall); whole page clearly (the sleep switch, sunset and night bands).
**Hard fail:** dimension 8 below 8.

**Fix list (to reach 8)**
1. End every horizontal row inside the grid, or make it an obvious carousel: the reviews (desktop-11) as a 3-up with dots/arrows like the room stage, or one large quote at a time; the veranda strip (desktop-04) as a flush 4-up.
2. Booking buttons flat: no gradient fill, no resting shadow on the pill or the slideshow arrows (shadow on hover only).
3. "11:00, check-out" and "How do you like to sleep?": cut the empty grey; let the three ratings sit large as in check-in, and keep the sleep section's tint only behind the tiles + stage.
4. Restaurant block (desktop-08/09): one large image (the night house, already a band) plus one 3:2, not four rounded tiles.
5. Details lines at ≥ 15 px in full ink; type scale to ~8 sizes.

**Keep:** img-102 hero with the idle drift + pointer parallax, Merienda titles, the burnt-saffron accent, the 76 px ratings, the picks + 880 px stage, the sunset and night bands, the expandable phone bar.

### 3 · unique "Round the clock" — round 2

**Round-1 fixes, checked**
| # | Round-1 complaint | Round 2 | Evidence |
|---|---|---|---|
| 1 | Hero read as fog; tin roof, wires, tuk-tuks at the foot | **Fixed on desktop.** The crowns stand crisp against the white page; the sea, the reef's white water and the green are untouched; the roofs and wires are out of frame. A pale grey-blue band remains just above the horizon | desktop-00 (black-green crowns sharp on white, the sea and blue-tarp shacks along the foot) |
| 2 | White slab at the pin's exit; empty phone bands | **Fixed.** At 8400 the break frame scrolls away with "Today on Coconuts" following, no slab; phone blocks have natural height | `uni-pin-8400` (palms + sea frame top right, "Today on Coconuts" and 0.3–0.5 m below), `uni390-walk` |
| 3 | Masonry with a hole and a lone portrait | **Fixed.** Three flush columns, portrait over landscape | `uni-pin-4200` ("Inside the house" beside six photos in a clean 3 × 2) |
| 4 | Booking colour = Lotus's button | **Fixed.** Ink `#252323` pill on every booking action; vermilion only for the sun disc and the round Call | desktop-00, desktop-13 (black "Check dates on Booking.com" + a small round red Call) |
| 5 | Drop-shadow mat on the sign; set-piece body small; edge labels | **Fixed.** The sign is a plain rounded photo; dial labels inset | desktop-12 (round black-and-orange sign, no mat), mobile-09 |

The set-piece, settled frame by frame (`uni-pin-grid`): afternoon (the hammock under the thatch) → sunset (img-008, the disc on "Sunset") → 22:00 (the house lit at night) → 7:30 (the restaurant with the sea) → the break (img-009). Image and dial stay in step once settled; at reading pace (`uni1440-walk`) the swap trails the text by about one block, which reads as the wipe arriving, not as a bug.

**Three-second test, fresh**
- **1440 (desktop-00):** white page, a confident Caveat title, one black pill, and the inn's palms rising out of the white into a sea view. Decisive now, not foggy. Still a faint grey haze band just above the horizon (y ≈ 600–780).
- **390 (`mobile-00-trio` right):** title, line and black button on white, then palms, the sea and the reef's white water. A tuk-tuk and the blue-tarp shacks are still visible at the foot.

**New / remaining problems**
- **768 set-piece (`uni-t768-05`):** the desktop three-column split is kept at tablet width: a ~230 px text column ("The / afternoon" broken over two lines at 52 px), a 120 px dial, and the photograph squeezed into a narrow portrait sliver at the right edge. It is cramped; the phone layout (photo on top, dial, text) would serve 768 better.
- The rooms run (desktop-02…04) is ~2.5 screens of 2-up 3:2 slideshows on grey, photos ~235 px tall; honest and tidy, but the quietest stretch of the page (inspector `empty-middle` 1492 px).
- The closing line in Caveat runs 4 lines at 390 (inspector `headline-lines`), and mobile-15 has ~150 px of empty white above it.

**Score: 8 / 10** (round 1: 7). Every round-1 complaint is fixed. It is the only page of the three with a real idea carried through (the stay told by the clock, in the house's own big photographs, with the sign's sun as the hour marker); the hero is now clean and decisive with one clear CTA; the type pair is the strongest; it is distinct from Lotus and Cheeky Monkey. The 768 set-piece and the rooms' quiet run are real but secondary, and do not pull it below "clearly professional, beautiful and clearly better than the current presence". Closest gold: `the-lavish-haven.html` (the place's own picture held on white, type on white); now close to it in decisiveness, below it in first-glance crispness because of the grey haze above the horizon.
**Better than the current presence?** **Yes** — desktop-00 / mobile-00 vs 05-booking-com-fold; whole page clearly (it is the only page that shows what a day there is like).
**Hard fail:** none from this critic. **Pass** (dimension 8 = 8).

**Fix list (for 4g; none blocks the pick)**
1. 768: switch the set-piece to the phone layout (photo, dial, text stacked) below ~1024 px.
2. Hero: lift the grey-blue haze band just above the horizon toward white or clean blue (the `sky()` key's lower ramp), and on the phone end the crop above the tuk-tuk at the foot.
3. Rooms: give the A/C rooms one larger lead image (e.g. the Deluxe with Balcony at 4:3 across 7 columns) so the run has one big moment, or shorten it to ~2 screens.
4. Closing at ≤ 3 lines on the phone (smaller size or shorter `closing` setting), and remove the empty white above it (mobile-15).
5. 12 font sizes → ~8.

**Keep:** everything structural — the sky-to-white hero, the ink booking pill + vermilion sun/Call, Caveat + Red Hat Text, the five-frame clock set-piece with the moving sun, the flush "Inside the house", the plain sign photo, the single big quote, the forecast row.

### Ranking at 4f, round 2 (visual quality only)

1. **unique "Round the clock" — 8/10, pass.** The clock set-piece of the house's own photographs, now under a crisp, decisive white-sky hero with an ink button that no longer copies Lotus.
2. **interactive "Under the thatch" — 7/10.** The best and now living first screen with a proper sign-hand title, let down by rows running off the right edge, gradient/shadow buttons and long grey sections.
3. **calm "The view from the roof" — 7/10.** Rooms and pace fixed (two rows, three full-bleed moments), but the new hero crop is anonymous sky and the fan row and tint blocks are still half empty.

**Interactive and calm still fail dimension 8 (< 8)**; unique passes this critic. All three are clearly better than the current presence.

**What the designer prompt got wrong (for the learn step):** fixing one flaw by cropping (calm's wires) removed the thing that made the first screen this place; the prompt should say a re-crop must keep the business's identifying feature (here the reef and the green) in frame. Interactive left two round-1 fix-list items (rows past the edge, gradient buttons) unaddressed; the 4e hand-off should check every fix-list item off explicitly. Unique's desktop layout was kept at 768: the set-piece pattern needs a stated tablet breakpoint.
