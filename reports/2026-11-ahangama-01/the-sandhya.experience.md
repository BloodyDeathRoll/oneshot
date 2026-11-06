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
