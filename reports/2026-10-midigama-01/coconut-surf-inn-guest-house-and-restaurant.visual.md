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
