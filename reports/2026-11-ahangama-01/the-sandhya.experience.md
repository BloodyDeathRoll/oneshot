# The Sandhya: experience critic, station 4f, round 1

experience-critic 0.2.0 · run `2026-11-ahangama-01` · operator alon · `mode: test` · 2026-11-06. Written without reading the other two reviewers' reports.

Frames and logs: `reports/2026-11-ahangama-01/experience/the-sandhya/<calm|interactive|unique|current>/`. Paths below are relative to that folder.

## Result

| Page | Score | Result | Better than current? | Taps to engine, first screen | Taps to engine, from a room |
|---|---|---|---|---|---|
| calm, "The Artwork" | **8** | pass on this dimension, no margin | yes | 1 | 1 |
| interactive, "Double Height" | **7** | **fail** | yes | 1 | 2 (tile, then room button) |
| unique, "The Hour" | **7** | **fail** | yes, closest call on mood alone | 1 | 1 (panel button, or the bar) |
| current site | n/a | n/a | n/a | 2, dates dropped per audit F2 | not re-walked; audit F8 |

**Experience ranking:** 1 calm, 2 interactive, 3 unique. Unique has the highest ceiling: if the first screen's joins are fixed, it would be the page people remember.

These are the experience critic's scores only. Rubric dimension 8 also needs visual-critic, and I have not seen that report.

No score was capped mechanically. Interactive and unique both have a WebGL main item. Almost every control carries a transition, and only the logo links do not (`micro.mjs` output: interactive 2 of 39 elements, unique 3 of 58, all logos).

## The missing date picker: what it does to the walk

This departs from `agents/designer/custom.md` ("see the rooms, pick dates, then hand off") and is going to the operator at the pick. It is recorded here and is not counted as a defect in any score.

- **In all three, the first tap leaves the site.** No date, guest count or nightly price is chosen or seen on our page. The visitor meets dates and price for the first time on an engine page nobody here has seen, in its own styling.
- **Room choice is the only thing carried across,** as `?rid=`. All four `rid` values were verified on the tapped URLs on all three pages.
- **Whether the engine honours `?rid=` or dates is unknown.** The engine was stubbed and never loaded. If it ignores `?rid=`, the loss is silent, and it costs most where the page promised most: interactive's room sheet and unique's bar, which says "Studio King: check live dates".
- **How close each page gets to an in-site journey:** interactive, then unique, then calm. Interactive lets you browse and switch rooms in place before handing off. Unique opens the room in place and the bar follows it. Calm is per-room buttons on the page.
- **What is gained:** no false promise. The current site's panel shows dates (`current/phone/reserve-panel.jpg`), and audit F2 records that it sends the engine none of them if they are left as shown.
- **For the pick:** `references.md` also says "the booking journey must feel like part of the site, not detached", and that any calibration point shown puts a page below 8. If the operator treats that line as binding here, **none of the three can reach 8 as built, including calm.**

## Calibration points that apply to all three

Decided or declared upstream, so judged but not scored down on their own. The operator should know they are there.

- The title is 81 characters and the CTA 26, against the calibration's "very short" and "Book package now". `concepts.md` says the label is final.
- The title sits low, or on a card, and is not centred vertically. Declared in `concepts.md` §6. It works on calm's bed and on unique's sand. Interactive's card is the least elegant answer.
- There is an Instagram button and no feed, because no post could be read.

## Same walk on the current site

Slow 4G and 4x CPU, phone 390 x 844, one run.

- **Timeline:** white at 0.5, 1.5, 3, 6, 15 and 30 s. The page is visible and RESERVE is on top by the 55 s frame (`current/phone/coldsheet-01.jpg`), which agrees with the audit's 52 s. 16.1 MB had transferred by 85 s.
- **First screen:** "Sandhya, /suhnd-yah/, noun" over a soft figure. It never says hotel.
- **Booking:** RESERVE is 70 x 30 px and has no `href`. Tapping it opens a panel with today's dates, 2 adults and a cookie sentence inside the panel. Its RESERVE reaches the engine: 2 taps (`current-reserve.mjs`). My intercept cannot see a URL fragment, so the audit's empty-date finding was not re-tested.
- **Where it is better than all three, honestly:**
  - It has more mood. The dark first screen with a person in it is evocative at 1440 (`current/laptop/scroll-000.jpg`), and the pool-water close-up and sunset carousels give it a dusk feeling.
  - Its small serif and generous white feel expensive and sure of themselves.
  - It is shorter: 8,000 px on a phone against 12,180 to 19,266.
- **Where it loses:** everything a person with a phone needs. It takes about a minute to appear and has no rooms on the home page, no rating and no plain statement of what it is.

## calm: score 8

**Timeline, slow 4G, phone** (`calm/phone/coldsheet-01.jpg`)
- 0.5 s: ground colour, header links, title and button, all usable. No logo yet.
- 1.5 s: logo and the top third of the photograph.
- 3 s: complete. 587 KB settled, CLS 0.0007.
- A tap at 1.08 s, before the photograph, reached the engine.

**The walk.** 20 phone screens.
- The first screen is the best single moment in the set at 1440 (`calm/laptop/scroll-000.jpg`): a bed, a window, one palm, the sea, nothing laid on the view. I wanted to be in that room.
- On the phone the top two-thirds still does that. The bottom third becomes a flat grey slab that no longer reads as a bed (`calm/phone/cold-settled.jpg`), and the fronds are slightly soft at 2x (`calm/motion/hero-2x-crop.jpg`), as the designer flagged. A 3x phone would show more; I could not test one.
- **After one scroll:** what and where are clear. Why this place is answered by the view. Cost is not printed, by decision, and the sentence pointing to the booking page arrives only after all four rooms.
- **Rooms start at 2,185 px,** 2.6 screens down, against about 1,000 on the other two.
- **What makes me want to go:** the window, img-068 and img-032 full-bleed with nothing on them, and the room galleries.
- **What deflates it:**
  - Dining is about 2 screens of prose before the first dish (`calm/phone/sheet-02.jpg` frame 6 to `sheet-03.jpg` frame 1).
  - Kabalana is about 2.5 screens of text on a tint (`sheet-04.jpg`, `sheet-05.jpg` start).
  - The feature line is five lines of thin script (`sheet-02.jpg` frame 5), and on the laptop it is white script on a wall (`calm/laptop/sheet-01.jpg` row 2). It is slow to read in both places.
  - The ending is thin: two small prints, then a white card repeating the tagline (`sheet-05.jpg`).

**Booking.**
- Hero, bar and all four room links verified by tap.
- A tappable engine link was in view in every scroll frame.
- It is the only page where the bar waits until the hero button has gone, so only one button is on screen near the top (`final.mjs`: 1 at every scroll position from 0 to 300 px).
- Back from the engine stub returns to the same scroll position (y 1201).
- Ratings first appear at 12,377 px, 15 screens down, which is late for a page asking this price.

**Motion.** Very little, as the brief asks: a press to 0.97 was measured, and a gallery swipe moves the dot (`calm/tap/gallery-pair.jpg`). A traveller will read this page as still. The 1.04 settle was not perceptible in frames.

**Fallbacks.** Reduced motion and JS off both hold (`calm/fallback/`). All engine links are visible with JS off and a finger tap reaches the engine. No canvas, so no-WebGL does not apply.

**Why 8.** It meets the rubric's sentence: engaging, clearly better than the current site, easy to book. It has no margin, because its one idea is a very good photograph, and the concept's own failure risk (just another nice hotel page) is what its long middle drifts towards.

**Fix list**
1. Break up the phone prose. In Dining, put the food masonry straight after the first paragraph. Run Kabalana's paragraphs as steps with a photograph between them, so no phone screen is text alone.
2. Set the feature line in the text face, as large as the Wallpaper* sentence. Keep the script for short titles.
3. Bring proof forward: add a compact rating line directly after the rooms, and keep the full Guests block where it is.
4. Make the ending earn the name: on the phone, take img-027 full width (1200 px is enough there), with the ground easing to a dusk tint before the booking card.
5. Re-frame the phone hero so the lower third reads as bed (pillow edge, fold), and get the original from the owner for sharpness.

**Keep:** the first screen's composition with nothing on the view; img-068 and img-032 full-bleed; per-room galleries with dots and a button each; the bar's timing; text and button before the image.

## interactive: score 7

**Timeline, slow 4G, phone** (`interactive/phone/coldsheet-01.jpg`)
- 0.5 s: header, card and button, usable, in a fallback font.
- 1.5 s: most of the photograph.
- 3 s: complete. The text visibly gets heavier when the font arrives.
- 654 KB, LCP 2.1 s, CLS 0. A tap at 1.02 s reached the engine.

**The walk.** 14.4 phone screens, the shortest.
- At 1440 the lounge is stunning (`interactive/laptop/scroll-000.jpg`).
- On the phone the crop is busier, and the card takes the bottom quarter. It is clean with a clear action, but it reads more like interface over a photograph than the other two heroes.
- **After one scroll** you have what, where, both ratings and the rooms starting at 997 px. This is the best-ordered funnel of the three.
- **The best interaction in the set is the room sheet** (`interactive/tap/sheet-800.jpg`, `sheet-swiped.jpg`, `interactive/motion/laptop-sheet-suite.jpg`): a gallery that follows the finger, chips to switch rooms, the button docked at the foot. The room button in the sheet reached the engine with the right `rid`. On the laptop, the Suite chip changed the button to `rid=53603`, Esc closes the sheet, and focus returns to the tile.
- **What deflates it:**
  - The kit is a paragraph, not a list (`interactive/phone/sheet-01.jpg` frames 3 and 4).
  - Dining is about 1.5 screens of text before any food (`sheet-02.jpg`).
  - The guests panel puts the longest text on the most saturated ground, and that cyan is out of key with concrete and teak (`sheet-02.jpg` frames 5 and 6).
  - The thin pen script reads as scrappy beside a hotel at this price.

**Main item: the WebGL depth piece.**
- **Phone:** the canvas becomes visible on scroll and the rods stay straight (`interactive/motion/depthsheet-01.jpg`). The photograph is leaving the screen while it plays, and there is no movement at rest. A first-time phone visitor is likely to see a still, so the main item barely registers where most of these visitors are. This is the main reason for 7.
- **Laptop:** moving under the hand is a real pleasure in the mid-range, but the edges give it away at the extremes:
  - Pointer bottom right: a scalloped edge on the glass band under the beam (`interactive/motion/crop-beam-botright.jpg`).
  - Pointer top left: uprights bowing behind the hoop chairs (`crop-floor-topleft.jpg`).
  - Bent table and sofa legs are visible even with the pointer on the CTA (`btn-press.jpg`), which is where every laptop visitor's pointer goes.
  - This is more visible than the "about 2 px" in the designer's notes, and it is close to what Shahar rejected as reading "as a mistake".
- **Not judged:** frame rate on a real device. `?noguard` made no difference in this headless run, so I never saw the weak-device guard drop out.

**Booking.**
- First screen 1 tap, room 2 taps.
- A tappable engine link was in view in every scroll frame.
- From 40 px of scroll there are two identical booking buttons on screen, the card's and the bar's (`final.mjs`, `depthsheet-01.jpg`).
- Back from the engine stub returns to the same place (y 912) with the sheet closed.

**Fallbacks.** Reduced motion and no-WebGL give the same photograph and a working page. JS off gives stacked rooms with every `rid` link live (`interactive/fallback/`). Good.

**Fix list**
1. Make the depth perceptible on a phone: hold the hero while the first part of the scroll plays, with the card rising over it, so the room moves while it is still on screen.
2. Cut the desktop displacement until uprights, table legs and the glass band stay true at every pointer position, checked at the corners and at the CTA. If that cannot hold, reduce the amplitude.
3. On phones, set the kit as an icon list and put food photographs after Dining's first paragraph.
4. Replace the cyan guests panel with a pale tint or a photograph moment, and try a calmer script for titles.
5. Delay the bar until the card's button has left the screen, as calm does. Re-crop the phone room tiles so they lead with the view, not the ceiling fan.

**Keep:** the room sheet whole; ratings straight under the hero; rooms one scroll away; the picture-identical fallbacks; the closing pair of img-023 and the blue-hour print.

## unique: score 7

**Timeline, slow 4G, phone** (`unique/phone/coldsheet-01.jpg`)
- 0.5 s: logo, title and button, usable, on the noon ground.
- 1.5 s: top of the picture.
- 3 s: complete. The shader then took over with no change I could see.
- 789 KB, LCP 2.5 s, CLS 0.0006. A tap at 1.06 s reached the engine.

**The walk.** 22.8 phone screens, the longest.
- It is the only first screen with an idea you remember, and it comes from the hotel's name (`unique/laptop/scroll-000.jpg`). I understood it at once and wanted to see what it did.
- **It also looks processed, which is the concept's own stated failure risk,** and at normal size:
  - The hedge meets the sand along a hard, scalloped edge with a green rim (`unique/motion/crop-sandline.jpg`).
  - The dusk side of the hedge is a near-black slab.
  - The lit panes are mottled (`crop-panes.jpg`).
  - The magenta sky is the least believable part.
- On the phone the day-to-dusk change is squeezed into a narrower width, so the hedge shows a shorter seam (`unique/motion/hero-2x-crop.jpg`, `unique/phone/cold-settled.jpg`). For a hotel that charges the top of its town, "is this picture real?" is the wrong first question. A real blue-hour photograph is on the same page, and beside it the grade shows.
- **There is no sea on the first screen of a beachfront hotel.** The sea arrives with the first room photograph, one scroll later.
- **Then the page recovers well.** Rooms start at 908 px with large photographs (`unique/phone/sheet-01.jpg`), and the serif and sans pairing is the most grown-up type in the set. The room panels expand well on the laptop (`unique/motion/laptop-rooms-open-700.jpg`).
- **The set-piece is the best moment on the page** (`unique/motion/piecesheet-01.jpg`, `unique/laptop/sheet-02.jpg` row 2): the building reaches dusk under your thumb, then "Why Sandhya" gives the word.
- **What deflates it:** the long run of Dining, Casual Luxe and Kabalana text, and the Services list open by default (`sheet-05.jpg`). On the phone the set-piece also sits between pale empty bands.

**Booking.**
- First screen 1 tap, room 1 tap.
- **The bar that remembers works.** On a finger scroll it read Studio King, Studio Twin, Studio+ King, Director's Suite in turn, each with the matching `rid`, and returned to the plain label at y 3379 (`unique-rooms.mjs bar`). With the Suite panel open on the laptop, the header action named the Suite.
- A label that names a room raises the stakes on the unknown `?rid=`.
- From 40 px of scroll there are two identical buttons on screen (`final.mjs`, `unique/motion/herosheet-01.jpg`).
- Back from the stub returned to the same place (y 1200).

**Motion.** Scrub through the set-piece and panel growth were seen in frames. Software GL gave 8 to 10 frames per second here, which says little about a phone, so **the smoothness of the page's main effect is not judged.**

**Fallbacks.**
- Reduced motion: no pin, baked dusk still.
- No WebGL: stills with a crossfade.
- JS off: all panels open with every link live.
- All are good pages (`unique/fallback/`).
- Three gallery slides stayed unloaded after the reduced-motion walk because they are lazy and off to the side. No blank photograph appeared in any frame, but I did not swipe to them.

**Why 7 and not higher.** It clearly beats the current site as a funnel and has the only real idea in the set, but its first screen shows its joins at normal size, on the screen where the rubric caps a page that fails to pull you in. I did not apply that cap: it does pull you in. I scored it down for what you see once it has.

**Fix list**
1. Re-cut the masks at the hedge and sand line, lift the hedge out of near-black on the dusk side, and clean the lit panes. Judge the first screen alone at 1440 and 390 before anything else.
2. Bring the sky closer to the hotel's real twilight pictures: less magenta, with the pink held low on the horizon. Widen the transition on the phone so it reads as light, not a seam.
3. Make the set-piece larger on the phone, filling the pinned screen above the bar instead of sitting between bands.
4. Trim the phone length: close Services by default, as the other two do, and break Kabalana into steps.
5. Delay the bar until the hero button has gone. On the laptop, choose closed-panel crops that show the view, not the slab of the Studio+ tub.

**Keep:** the idea and the end-of-page payoff; the bar that remembers; panel expansion and floor-area proportions; the type pairing with the Sanskrit word in the same face; rooms first; the baked-still fallbacks.

## Not covered

- **No real device.** Everything is headless Chromium with an emulated iPhone viewport and synthesized touch. No WebKit, no iOS Safari, no real GPU, no 3x screen. WebGL smoothness, heat and battery on a phone are not judged, and sharpness on a 3x phone is inferred from 2x crops.
- **The engine.** Requests were intercepted and stubbed; Cloudbeds was not loaded by me. Whether it honours `?rid=` or dates is **unknown**, and so is everything past the hand-off.
- **Timing quality.** Single runs on a shared machine with other reviewers running. A network outage hit mid-session, and I cannot say exactly when it began.
  - The phone walks ran before the first errors and looked clean. Hero taps and the rest of the booking checks were repeated after the connection came back.
  - Early scripted runs of interactive's hero tap took about 15 minutes (`interactive/tap/`, 927 s and 887 s), and scripted room taps and page loads on unique timed out. I do not read these as page faults: on interactive a main-thread poll found the link at 504 ms with one long task of 52 ms, and on unique all four room links worked by finger. The exact cause is **not established**. My script waited on the first engine link, which is a hidden header button on interactive, and the outage may also have played a part.
- **Frames vs detail.** The timed phone frames captured at 390 px wide despite the 2x setting. Sharpness was judged only from the separate 2x crops.
- **Not walked:** 360 px phones, landscape, tablet, phone browser bars. Reduced motion and no-WebGL were walked on the phone only. Interactive's soft ring on press was not seen in my 130 ms frame.
- **Micro-animations:** counted as a transition present on the element or its children, at 1440. This shows the code exists, not that each one feels right; only the main button's press was measured.
- **Tools not run:** the `design-taste-frontend` inspector, `/impeccable`, `/emil-design-eng`, `/design-motion-principles`, `/review-animations`. The Playwright MCP server failed to connect, so I used the Playwright library directly.
- **Gold pages:** I read `references.md`, `gold/README.md` and the Global Surf notes, but did not render the gold pages this round. The comparison that counts here is the current site, which was walked.
- **Facts, copy and accessibility** are the critic's and were not audited. `reports/` frames are scratch and were not committed.

---

# Round 2: interactive and unique only

experience-critic 0.2.0 · 2026-11-07 · commit `2351ac2`. Calm passed round 1 and was not re-scored. Written without reading the other reviewers' round 2 sections. I walked what is on the page now and tested the designers' claims rather than assuming them.

Frames: `experience/the-sandhya/<interactive|unique>/r2-phone`, `r2-laptop`, `r2-motion`, `r2-fallback`. Paths below are relative to `experience/the-sandhya/`.

## Result

| Page | Round 1 | Round 2 | Result | Better than current? | Taps to engine, first screen | From a room |
|---|---|---|---|---|---|---|
| interactive | 7 | **8** | pass on this dimension, thin on motion | yes | 1 | 2 (tile, then room button) |
| unique | 7 | **7** | **fail**, held there by the first screen | yes overall; **no** on first-screen mood | 1 | 1 (panel button, or the bar) |

**Ranking of these two:** interactive, then unique. Unique has the better end of page. Interactive has the better start and the better room choice.

The date picker departure from round 1 is unchanged on both pages. The same warning applies: if "the booking journey must feel like part of the site" is binding, neither reaches 8 as built. Whether the engine honours `?rid=` or dates is still unknown.

The current site was not re-walked. The comparison uses the round 1 frames in `current/`.

## Plain re-timing

Slow 4G, 4x CPU, phone, three cold loads per page, font host up, tap by coordinates at about 1 s, engine request intercepted.

| Page | Link in view and on top | Tap made at | Tap to engine request |
|---|---|---|---|
| interactive | 323 to 324 ms | 1,013 to 1,023 ms | 1 to 4 ms |
| unique | 377 to 387 ms | 1,010 to 1,107 ms | 0 to 1 ms |

The long tap timings from round 1 did not recur. These numbers are headless and show when the tap reached the intercept, not how fast a phone feels.

## interactive: score 8

**Timeline** (`interactive/r2-phone/coldsheet-01.jpg`): text and button usable at 0.5 s in a fallback font, most of the photograph at 1.5 s and already in the final font, complete at 3 s. 641 KB settled, LCP 2.2 s, CLS 0.

**Does a first-time visitor register the motion on a phone?** Only partly.
- **The hold is real.** The card stays at y 772 until 186 px of scroll, then rises (`interactive/r2-motion/hold-01.jpg`).
- **The move is small.** Read by eye from `walkin-trio.jpg`, an upright near the right of the frame shifts about 6 px by the end of the hold and about 10 px by 355 px of scroll. Lines stay straight.
- **On a normal flick, probably not as motion.** At 700 px/s the hold lasts about a quarter of a second and the whole walk-in about half a second. It is more likely to feel like the page has some weight than like walking into a room.
- **On a slow drag, yes.** The room can be seen coming towards you.
- This is better than round 1, where the photograph was leaving the screen, but it is still modest. I judged it from frames and timing, not on a phone in the hand.

**Are lines still bending on desktop?** I found no bending at 1440. In round 1 I saw scalloped glass, bowed uprights and bent table legs; I could not find them in the frames I inspected.
- Inspected: pointer top left and bottom right in full, plus crops of the beam, the floor with the pointer on the CTA, and the rods (`laptop-topleft.png`, `laptop-botright.png`, `crop-beam-botright.jpg`, `crop-floor-cta.jpg`, `crop-rods-topright.jpg`).
- The feature photograph also held at two corners (`feature-topleft.jpg`, `feature-botright.jpg`).
- Bottom left and centre were captured but not inspected.

**Is four flat planes at 0.9% still worth having?** Yes, keep it, and stop spending on it.
- It no longer reads as a mistake and gives the room a little weight under the hand. The sofa moves about 10 to 15 px between opposite corners, by eye.
- A visitor who does not move the pointer sees a still, and on a phone the effect is slight. It is now seasoning, not what sells the page.
- It satisfies the main-item rule as written: WebGL on the business's best photograph. If "main item" is read as something a phone visitor must notice, this is borderline. That is the main risk to this 8.

**Is the bar right now?** Yes.
- Stepping through 0 to 1,400 px there is one engine button in view at all times, with a single 20 px step at 940 px showing none while the bar arrives. The two identical buttons from round 1 are gone.
- No scroll frame lacked a tappable engine link, and all four rooms reached the engine with the right `rid` through the sheet.

**Do rooms arrive late enough to hurt?** No. "The rooms" moved from 997 to 1,192 px, with the first tile at 1,386 px. Both ratings still come first, and the rooms title is in the second frame of the walk (`interactive/r2-phone/sheet-01.jpg`). The page grew from 14.4 to 15.5 screens.

**The rest of the walk improved.**
- The kit is a list now.
- Food arrives after Dining's first paragraph.
- The cyan panel is gone, replaced by a pool-water photograph.
- The new script suits the hotel better than the pen hand.
- Room tiles lead with the view.
- Kabalana is still about 2.5 screens, the longest stretch with the least to look at (`sheet-03.jpg`).

**Fallbacks** (`interactive/r2-fallback/`): reduced motion, no WebGL and JS off all hold, and the hero tap reached the engine in each. With JS off, every room link is live.

**Why 8:** engaging, clearly better than the current site, easy to book. It has the best room choice in the set, and its round 1 faults were fixed in the frames I inspected.

**Fix list**
1. Make the walk-in easier to notice on a normal flick: try about twice the forward step, since it is a projective move and lines stay straight, and judge it on a real phone.
2. Break Kabalana into steps with photographs between them.
3. Tighten the phone rating lines in Guests, which wrap mid-detail in two narrow columns.
4. Shorten the plain prose run in Casual Luxe on phones, with a photograph earlier.
5. Add the missing transition to the footer logo, for consistency.

**Keep:** the room sheet; ratings under the hero; the bar's timing; the planes with straight lines; the kit list; food after the first paragraph; the pool-water photograph.

## unique: score 7

**Timeline** (`unique/r2-phone/coldsheet-01.jpg`): title and button usable at 0.5 s, partial photograph at 1.5 s, complete at 3 s. 332 KB settled, LCP 1.9 s, CLS 0. It is now the lightest first load of the two.

**Does the first screen still hold attention?** It holds you long enough to read and scroll, but it does not pull you in.
- It is honest, sharp and clear: the real building, nothing to doubt (`unique/r2-motion/first-screen.jpg`).
- At 1440 the title on real sand above a strip of real water is a pleasant composition (`unique/r2-laptop/scroll-000.jpg`).
- On the phone it is a daylight elevation, then a title and button on a plain ground, then a sliver of water. That is close to the plain section Shahar warned against, and the idea does not arrive until about 14 screens later.
- The water strip does its job. There is now sea on the first screen, and it invites the scroll.

**Does the mood beat the current site?** No. The current first screen still has more mood. This one beats it on being real, sharp, clear about what the place is, and visible in about 3 s where the current site took about 55 s in round 1. Overall the page is clearly better. On feeling alone, at first sight, it is not.

**Does the set-piece sequence read well on a phone?** Yes, and it is the best sequence in the set, with one rough join.
- **The sweep:** it reads at once (`unique/r2-motion/piece-01.jpg`). Panes warm to amber and the hedge stays dark green. The hard sand line and black slab from round 1 are gone in these frames.
- **The join:** the real img-027 rises as an opaque sheet with a hard top edge. For a moment two different navy skies meet in a visible line, and the camera jumps from square-on to oblique (`piece-100.jpg`, `piece-110.jpg`). It reads as a wipe to a different picture, not as the same evening arriving.
- **The landing:** worth it. img-027 is the most desirable picture on the page (`piece-120.jpg`), and "Why Sandhya" follows straight away.
- **The rest:** the print reaches the top of the screen exactly as the pin ends, so it never holds still under the thumb. It stays on screen for about another screen of scroll while the title rises.
- **For the operator:** the all-dusk frame could pass for a photograph at a glance on a phone (`piece-092.jpg`), and its label reaches assistive technology only. It is on screen briefly and the page rests on a real picture, so I find it acceptable as motion. The designer's notes say the ruling is still open.
- **The pin** is 1,182 px, 1.4 screens, about 1.7 s at a 700 px/s drag. That is short enough not to feel like a trap.

**Bar label, retested with fast swipes:** fixed.
- Nine swipes at 2,400 to 8,000 px/s, 124 samples: one distinct label at every sample, and no mismatch between label and `rid` (`unique/r2-motion/bars-sheet.jpg`).
- A tap straight after a 6,000 px/s swipe reached the room the bar named (Studio Twin, `rid=53586`), with the label still fading in.
- At 2,309 and 2,415 px the bar names Director's Suite while the Studio+ King heading is still on screen. The Suite photograph fills the screen there, and label and link agree, so this is not a wrong booking.

**Phone length:** 15,864 px, 18.8 screens at 844 px, against the reported 18.7 (15,789 px) and 22.8 in round 1. Services is closed, and Kabalana and the guests are swipe rows. Rooms still start early, at 900 px.

**Other checks.**
- All four room links reached the engine with the right `rid`.
- The hero button is gone before the bar arrives, but from 780 px the bar sits with a room button, and from 1,300 px with two, so up to three navy buttons can be on screen.
- The three unloaded slides I could not clear in round 1 are explained: swiped by finger to the end of each gallery, in normal and reduced-motion modes, the photographs were there.

**Fallbacks** (`unique/r2-fallback/`): reduced motion, no WebGL and JS off all hold, and the hero tap reached the engine in each. No-WebGL gets the daylight photograph, then img-027 rising over it. That version alone is a respectable page if the operator rules against the moving grade.

**Why 7:** method step 5 caps a page at 7 when its first screen does not pull you in, and on the phone this one does not. **From the rooms onward I would put this page at 8.** The operator directed the plain first screen, so this is a decision to make at the pick rather than a mistake by the designer, but I am not waiving the cap on my own.

**Fix list**
1. Give the first screen a hook that ties it to the idea. If the operator allows the moving grade, let the first few pixels of scroll start the day, lighting one bay, while the rest state stays ungraded. This needs the operator's ruling.
2. On the phone, try the title and button on the sand inside the photograph, as at 1440, rather than on a plain ground under it. Source pixels limit the crop, so test the sharpness.
3. Soften the join: no hard top edge where the print meets the graded sky, and hold the print still for about a quarter of a screen before the pin releases.
4. Reduce the buttons in the rooms: up to three navy buttons on one phone screen is too many of the same thing.
5. Make the second guest quote easier to find, since it now sits behind a swipe, and trim the prose run through Casual Luxe.

**Keep:** the ungraded first photograph and water strip as honest material; the sweep; ending on the real img-027; the bar that remembers; rooms first; the shorter phone page; the type pairing.

## Not covered, round 2

- **No real device:** headless Chromium with an emulated iPhone and synthesized touch, no WebKit or real GPU. Whether the walk-in is felt, and how smooth either WebGL effect is, were not judged on a phone. Software GL says little about frame rate, so I did not measure it this round.
- **Engine:** intercepted and never loaded. Everything past the hand-off is unknown, including `?rid=` and dates.
- **Motion was judged from still frames and timing,** not from watching it run. The finger-pass and flick frames in `r2-motion/` were captured but I read the timings, not the images.
- **Inspected partly:** interactive's bottom-left and centre pointer frames were captured and not inspected. The laptop walk was checked on one contact sheet per page.
- **Not walked:** 360 px phones, landscape, tablet, the current site this round. Fallbacks were walked on the phone only.
- **Micro-animations:** counted as code present at 1440, not judged for feel. Interactive's footer logo and unique's logo links have no transition.
- **Tools not run:** the taste inspector, `/impeccable`, `/emil-design-eng`, `/design-motion-principles`, `/review-animations`.
- **Facts, copy and accessibility** are the critic's and were not audited.

---

# 4g round 1: the built site (calm, `sites/the-sandhya/final/dist`)

experience-critic 0.2.0 · station 5, full mode, round 1 · 2026-11-09 · built at commit `d3ce216` · served from `final/dist/` on port 8775, because 8773 was already held by another process serving `mockups/calm/dist`, which I left alone. Written without reading the critic's or the visual critic's 4g reports.

Logs: `reports/2026-11-ahangama-01/experience/the-sandhya/final-r1/*.json`. Frames: `sites/the-sandhya/final/shots/ec-r1/` (gitignored scratch). Below, a frame name refers to that folder and a `.json` name to the log folder.

## Result

| | |
|---|---|
| Score | **8 / 10**, as at 4f, still with no margin |
| Result | pass on this dimension |
| Better than the current site? | **yes** |
| Taps to the engine, no dates | 1 from the first screen, 1 from any room, 1 from the bar |
| Taps to the engine with dates | 3 to 5, and only after scrolling about 19 phone screens to the closing card (details below) |

Rubric dimension 8 is the lower of my score and the visual critic's, and I have not seen theirs.

## Did my 4f fixes land?

| 4f fix | State in the build | Evidence |
|---|---|---|
| 1. Break up the phone prose | **Half done.** On the phone the dishes now follow Dining ¶2. Kabalana is unchanged and still has a full phone screen of text on the tint. | `phone-walk-09`, `-10`; `phone-walk-16` (`phone-sheet-3`, third frame) |
| 2. Set the feature line in the text face | **Phone only.** On the phone it is 24 px Schibsted Grotesk, 123 px tall, and reads well. At 1440 it is still Sacramento at 42.5 px across 5 lines, and the inspector flags it (`headline-lines`, `lopsided`). | `walk.json` `pos.feature`, `laptop.json` `pos.feature`, `laptop-walk-08` |
| 3. Show a compact rating line after the rooms | **Done.** It sits at 5,977 px on the phone, against 12,377 px at 4f. It is set as small grey text, so it reads as fine print rather than as proof. | `walk.json` `.rooms-proof`, `phone-walk-07` |
| 4. Give the ending more weight | **Partly done.** The blue-hour print is larger and the sunset overlaps it. There is no dusk tint, and the page still ends on the white card that repeats the tagline. | `phone-walk-21`, `-22` |
| 5. Re-frame the phone hero | **Not done** (it needs the 8080 px original). The lower third is still grey, not a bed. | `phone-walk-00`, `phone-cold-fallback-sheet` |

I also checked the keyboard and phone fixes:
- The bar is `<nav aria-label="Book or call">`.
- The dots measure 44 × 44.
- Amenities are closed at both 390 and 1440 (`walk.json`, `laptop.json` `pos`).

## Timeline, phone (390 × 844, 2x, touch, 1.6 Mbps, 150 ms RTT, 4x CPU)

Two cold runs (`cold.json`, `phone-cold1-*`, `phone-cold2-*`):
- **The 0.5 s frame was captured at about 1.8 s.** The screenshot call blocked during the throttled load, so I have no true 0.5 s frame. At that point the h1 and the button were on screen and only the top of the photograph had painted (`phone-cold-fallback-sheet`, first panel).
- **3 s:** the photograph was complete.
- **Measured:** the hero link was visible at 544 ms. A finger tap at 1,008 ms reached the engine. The page moved 618 KB in 8 requests, all to one host, with CLS 0.0032. Headless LCP was 564 ms on a local server, which says little about a real phone.

## The walk, phone

The page is 17,032 px tall, 20.2 screens (`walk.json`, 26 frames, `phone-sheet-1` to `-4`). In the order a visitor meets it:
- **First screen:** unchanged, and still the best moment on the page: the window, the palm and the sea, with nothing laid over the view.
- **Rooms:** start at 2,141 px, with galleries and a button each.
- **Proof:** the new rating line comes after the amenities.
- **Middle:** the feature photograph, then Dining (now photographs early), Casual Luxe, Kabalana (still text-heavy), Guests, Exclusive Use, Why Sandhya, and the closing card with the new fields.
- **Booking always in reach:** every one of the 26 frames had a tappable engine link on top (`walk.json` `noEngineFrames: []`).
- **Two or three identical crimson buttons at once in two places:**
  - In the rooms: two room buttons plus the bar, at 3,375 and 4,050 px.
  - At the closing card: the card's button plus the bar (`multiEngineFrames`; `phone-walk-22`).

## The date fields: does the journey now feel part of the site?

**Where they are, they are well made** (`phone-book-card-dates.png`, `laptop-focus-checkin.jpg`):
- They are soft rounded fields in the card's colours, with the label inside the field, 16 px type and 67 px tall on the phone.
- They have a visible focus ring, and they read as part of the card rather than as a bolted-on form.

**What I verified** (headless, engine intercepted):
- **Both dates set:** all 8 engine links are rewritten (`book.json` `afterBoth`). Tapping the card button, the bar and the Director's Suite button landed on `…/WMvA6V#checkin=2026-12-09&checkout=2026-12-12` and `…?rid=53603#checkin=…&checkout=…` (`book.json`, `book2.json`, `book3.json`).
- **Check-in only:** check-out fills itself with the next night, so a visitor rarely sees the half state (`afterCheckinOnly`).
- **Check-out cleared:** the line "Choose both dates, or clear both." appears and every link goes back to plain (`book3.json` `clearedOut`, `phone-book-card-half.png`). Past dates and a same-day pair are refused the same way (`book.json`).
- **JS off:** the fields are hidden, the 8 links are plain, and a tap reaches the engine (`fallback.json`, `phone-jsoff-book.jpg`).
- **Adults:** never sent.
- **Keyboard:** both fields are reachable and labelled. Typing a date works. Each field takes 4 Tab stops in Chromium (day, month, year, picker), which is the browser's own control (`keys.json`).

**Where it falls short:**
1. **The fields are only at the end of the page:** 16,090 px on the phone, which is 19 screens, and 15,331 px at 1440.
   - Nothing on the page links to them (`walk.json` `toBook: 0`).
   - The hero, header, room and bar buttons all go straight to the engine, so a visitor who books from the first screen or from a room never sees them. That is the path most visitors take.
   - The sentence "Nightly rates are on our booking page, for the dates you choose" sits after the rooms at about 5,600 px, with no field near it.
   - For most visitors the first tap still leaves the site with nothing chosen, exactly as at 4f.
2. **Nothing confirms that the dates go with the tap.** After both dates are set, every button still says "Check rooms and live dates" and the room buttons still say "…: check live dates" (`book2.json` `barText`). No nights are shown, so a visitor cannot tell that anything was carried.
3. **Back from the engine lost the dates every time** (`book.json` `afterBack`; `book3.json` `backState`: `back_forward` and `persisted` false).
   - Headless Chromium reloaded the page instead of restoring it from the back-forward cache, even with Playwright's flag against that cache removed. The inputs came back empty and the links plain.
   - A phone that restores the page from that cache would probably keep the dates; one that reloads would not. The `pageshow` handler can only re-apply what the inputs still hold.
   - I could not test this on a real phone.

**Taps with dates:** scroll about 19 screens to the card, tap check-in, pick a day in the native picker (1 or 2 taps), change check-out for a stay longer than one night (1 or 2 more taps), then tap the button. That is 3 to 5 taps. On the current site the panel is 2 taps away and shows today's dates, which audit F2 found are not sent if left as shown.

**My reading of `references.md` ("the booking journey must feel like part of the site"):** **partly met.**
- The closing card now lets you choose and carries the choice, in the site's own type and colour. That is a real gain over the mockup and over the current site's panel.
- The main path is unchanged.
- I did not score it below 8 for this, because Alon ruled on the fields at gate b and they are honest where they are. It is the first fix below.

**The engine is unknown, and this is how I scored it.**
- Cloudbeds was intercepted and never loaded, so whether it honours `#checkin=…&checkout=…` and `?rid=` is unknown.
- I did not count it as a page fault. My score assumes the person check in `notes.md` happens before go-live.
- If the engine ignores the fragment and the fields stay, they become a promise the site does not keep. I would then put the booking experience at 7 and want the fields removed, as `notes.md` already says.

## Motion and interaction

The same quiet page as at 4f, which is what the calm brief asks for:
- Buttons darken on hover over 180 ms and press over 120 ms (`laptop.json` `heroHover`). The fields tint on hover.
- The slideshows have dots and arrows, and swipe on a phone.
- Reduced motion leaves 0 running animations, and the bar is simply up (`fallback.json`).
- The desktop parallax was not measured this round.

The inspector (`design-taste-frontend` `inspect.mjs`) reported 6 FAIL and 7 WARN. I take them as evidence lines, not as the score:
- `headline-lines` and `lopsided`: the desktop feature line, as in the 4f fix 2 row above.
- `covered-text`: the bar covers "Studio Twin" at one scroll position on the phone. This is normal for a sticky bar and minor.
- `shadow` on the prints, `eyebrow` (a false hit: it is the last item of the closed Amenities list, which sits above the feature line), `small-title` and `hero-words`: concept decisions already seen at the pick.
- `no-footage`: an operator decision (no usable video).

## Laptop, 1440 × 900

The same walk, shorter (`laptop.json`, 23 frames, `laptop-sheet-1` and `-2`):
- The first screen is the mockup's and still the strongest of the set.
- The header button is always in view, so every frame had a booking link.
- At the closing card two identical buttons are on screen, the header's and the card's (`laptop-focus-checkin.jpg`).

## Against the current site

The current site was loaded once at each size, unthrottled, first screen only (`current.json`, `side-by-side.jpg`). It is unchanged: the dark figure at the window, "Sandhya /suhnd-yah/ noun", RESERVE in the corner, 8,000 px on a phone.
- **Where it is still better:** honestly, mood at 1440. The figure and the dusk light are more evocative than our bright bedroom.
- **Where ours is better, clearly:**
  - It says what it is on the first screen.
  - It is usable in about 1 s where the current site took about 55 s in the 4f round.
  - It has rooms with galleries, both ratings, and a booking link on every frame.
  - It now carries dates honestly, where the current panel shows dates and audit F2 found it does not send them.

## Why 8

It still meets the rubric's sentence: engaging, clearly better than the current site, easy to book.
- **Why it is not higher:**
  - The fixes that landed are modest.
  - The dates help only the visitor who reaches the end.
  - The long middle (Casual Luxe, Kabalana) and the thin ending are where they were.
- **Why it is not lower:**
  - The first screen still pulls you in.
  - A booking link is never out of reach.
  - Nothing got worse in the port.

## Fix list (biggest effect first)

1. **Put the dates where the choice is made.**
   - Add the same pair of fields, sharing state with the closing card, directly after the rooms, next to "Nightly rates are on our booking page, for the dates you choose".
   - On the phone, give the bar a way to reach them, for example a small "Dates" control beside the button that scrolls to the fields.
   - Keep every link a plain link, so a visitor can still book in 1 tap without dates.
2. **Show that the dates travel.** With both dates set, change the button labels to name them, for example "Check 9 to 12 Dec" on the bar and the card, and "Studio King: 9 to 12 Dec" on the room buttons. Show the nights next to the fields.
3. **Keep the dates when the visitor comes back from the engine.** Store the pair in `sessionStorage` and restore it on `pageshow` and on load.
4. **Finish 4f fix 1 and the desktop half of fix 2.**
   - Run Kabalana on the phone as steps with a photograph between paragraphs (`phone-walk-16`).
   - At 1440, set the feature line in the text face, or in fewer lines.
5. **Tidy the end of the page.**
   - Hide the phone bar while the card's own button is on screen.
   - Give the last screen the dusk: img-027 edge to edge with the ground easing to a dusk tint, instead of the white card repeating the tagline.
   - Set the rating line after the rooms with the score as a number people notice, not as fine print.

**Keep:**
- the first screen, with text and button usable before the photograph
- the room galleries with a button each
- the bar's timing near the top
- the fields' look (soft, label inside, 16 px)
- fields hidden with JS off, plain hrefs, no adults count, and the half-date line
- the dishes after Dining ¶2 and the feature line in the text face on the phone
- the rating line after the rooms

## Not covered, 4g round 1

- **No real device.** I used headless Chromium with an emulated iPhone and synthesized touch, with no WebKit and no iOS Safari. In particular I did not see:
  - how an empty `appearance: none` date input renders on iOS
  - the native date pickers
  - the back-forward cache on a real phone (the date-loss finding comes from a headless reload)
  - a 3x screen
- **The engine.** It was intercepted and never loaded. Whether Cloudbeds honours the dates or `?rid=` is unknown, and so is everything past the hand-off.
- **Timing.** The 0.5 s frame was taken late (about 1.8 s). The cold runs were single runs on a shared machine.
- **Keyboard visibility.** My check of whether each Tab stop was in view waited only 40 ms after each Tab and does not hold up against smooth scrolling, so I make no claim about focus staying in view.
- **Partly walked or not walked:**
  - The current site was loaded once per size, first screen only, unthrottled. The 4f frames in `current/` stand for the rest of it.
  - Not walked: 360 px phones, landscape, tablet.
  - Fallbacks were walked on the phone only.
  - The desktop parallax and the gallery crossfade were not measured.
- **Tools not run:** `/impeccable`, `/emil-design-eng`, `/design-motion-principles`, `/review-animations`. The gold pages were not rendered.
- **Inspector side effect:** the inspector wrote its frames and `report.json` to `.taste-skill/inspect/` in the worktree, which is gitignored. That was my run, outside `reports/`.
- **Facts, copy, budgets and accessibility** belong to the critic and were checked here only as far as listed above.
