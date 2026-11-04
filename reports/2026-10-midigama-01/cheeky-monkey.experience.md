# Cheeky Monkey Surf Camp: experience critique

experience-critic 0.2.0 · station 5 (full), round 1 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-03
Page: `sites/cheeky-monkey/final/dist/index.html` (the picked unique concept, "Pick your board", with Alon's beach grounds and "Down at the water"), served as static files on `127.0.0.1:8963`.
Compared with: https://cheekymonkeymidigama.com/ (walked live today) and the gold notes (`agents/designer/gold/`).
Written without reading the critic's or the visual-critic's report for this round.

Frames: `reports/2026-10-midigama-01/experience/cheeky-monkey/` (git-ignored PNGs, plus `final-walk.log`). Recipes: the scratch scripts `walk.mjs` (cold load + human-pace scroll), `piece.mjs` (set-piece, hover, drawer, reduced motion, JS off) and `current.mjs` (the current site). All are Playwright on Chromium with WebGL on.

| | |
|---|---|
| **Score (dimension 8)** | **8 / 10** |
| **Better than the current site** | **yes** |
| **Pass / fail (this critic)** | **pass**, with no hard fail from the experience side |
| **Taps to book** | **1**: the hero's "Check dates on Booking.com" goes straight to `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`. That matches the audit's target (`engine`, 1 click). The same link sits in the phone bar on every frame of the walk. |

---

## 1. Phone, cold (390 × 844, iPhone UA, ~1.6 Mbps / 150 ms RTT, 4× CPU)

| t | What is on screen | Frame |
|---|---|---|
| 0.5 s | The drawn beach (sky, two wave bands, sand), "Come as a stranger," / "leave as a friend.", and the blue "Check dates on Booking.com" button. The board window is still empty: only its contact shadow shows. The page is already usable. | `final-phone-t500.png` |
| 1.5 s | The poster appears in the board: a white board beside a magenta one, with the shop ceiling above them. | `final-phone-t1500.png` |
| 3 s / 6 s | Nothing changes. The video is attached (`m720.mp4`, readyState 1) but has not started at 6 s. At 1.6 Mbps, 1.86 MB needs about 9 s. The still poster holds well. | `final-phone-t3000.png`, `-t6000.png`, `final-walk.log` |
| all of the slow walk | **The display face never arrives.** Every title, from the hero line to "What guests say", is drawn in the fallback face (Marker Felt here), not Permanent Marker. That is `font-display: optional` on a slow first load. On an Android phone, the stack's last entry, `cursive`, gives a formal script, so the page's whole voice is lost on exactly the network the playbook assumes. | `final-phone-t*.png`, `final-phone-s01…s31.png`; CSS `--hand:'Permanent Marker','Marker Felt','Comic Sans MS',cursive` |

Feeling: friendly, clean and unmistakably *cheeky*. One centred idea (a board standing on a beach) and one button. It is not a template hero. But the only real thing on the first screen is a narrow strip of indoor footage. Everything else is drawn, and no water or light is real.

### The scroll set-piece (unthrottled, so the reel plays: `final-phone-piece-00…09.png`, `final-laptop-piece-00…11.png`)
The board's mask scales out to fill the screen while the reel keeps playing, then hands off to "Catch waves, not worries". This is the page's best moment: you are pulled *into* the shop, among 400 bright rails, and a hand reaches for one (piece-09). It is scrubbed and smooth, the phone bar stays visible throughout, and the text fades before the footage moves under it.
Weak spots:
- Halfway through, the full-screen frame passes through dark, motion-blurred handheld footage (phone piece-05/06: mostly black with two smeared rails).
- On a 3× phone the 720 px rendition fills the whole screen and looks soft.
- On the laptop the opened footage is a 1080-wide portrait strip with drawn beach at the sides (laptop piece-08). That is honest (never upscaled), but it is less of an arrival than the phone version.

### Human-pace scroll (0.6 screens at a time, 700 ms pauses: `final-phone-s01…s31.png`)
- **s01–s02:** the intro "Catch waves, not worries" on sand, short and centred. Good.
- **s03–s05, Down at the water:** the first big photograph after the hero is **stock-003, a borrowed Wikimedia beach under a tree branch**. It is followed by its credit line "Indische Oceaan - panoramio (1) — Maaike Hage, CC BY-SA 3.0", which reads like a caption. Only after it come the business's own surf photos (img-100, the yellow fish img-103, img-155), and those are the pictures that make you want to go. Attention dips at the credit line.
- **s06–s09, A week of surf:** four package cards: a board-shaped crop of a photo on a flat blue, yellow, red or green block, then a range, a dense grey line of room prices, and "Published 2021, call to confirm". The crops are tiny ovals, so the blocks read as colour swatches more than pictures. On a phone the row scrolls sideways. The prices are clear, honestly dated, and per person per 7 nights. Then "Every week comes with" (an icon list) and the lesson card (USD 20, 90 min, levels).
- **s10–s15, The rooms:** five rooms, each a dot slideshow of 5–6 real photos with beds, sleeps and m², and a "Check dates on Booking.com" under each. The rooms are sold properly (calibration met). "Staying here" is compact.
- **s16–s19, Baba's Surf Shop:** a masonry of the shop (racks, the shaper, the fin wall, hand-painted boards), with rentals and brands. Real, specific and lively.
- **s20–s22, Up on the roof:** a full-bleed pink sunset shaka (img-134), then the roof and the amenities as one " | " paragraph. The band carries a strong pink cast and is slightly soft on the laptop.
- **s23, Three rooms in 2009:** Baba among the boards, plus the old shop front as a print. A human moment.
- **s24–s26, What guests say:** a quote slider (1/11) and two rating cards with source, count and date.
- **s27–s29:** Getting here with today's front (the red tuk-tuk), Good to know, then the closing line beside the small rainbow-rail board and three aligned buttons.
- **s30–s31:** Instagram tiles, the "Follow" tile as a board-shaped ellipse (it reads a little like a stretched pill), and a real footer with buttons and icons.

The phone bar ("Check dates on Booking.com" + "Plan a stay") is in all 31 frames, and nothing covers the content.

## 2. The story after one scroll
What, where, why and what it costs: "Cheeky Monkey … surf and yoga camp on the main road through Midigama, close to the main point breaks" plus the reel of 400 boards tells you **what** and **where** within a screen of the hero. **Why this place** (the shop, the boards, Baba) is told through media, which is right. **Cost** arrives at about 4 screens (s06–s07), or 1 tap through "Plan a stay". The **water**, which a travelling surfer is buying, first appears through a stranger's photo (stock-003) rather than the business's own.

## 3. Wanting to go
- **Lifts:** the zoom into the rack (piece-07/09); img-103 (the yellow fish at the shorebreak); the room slideshows with their murals; Baba; the pink sunset shaka.
- **Deflates:** the drawn beach under a narrow indoor clip (the first impression is illustration, not place); the stock band and its credit; the grey fine print on the package cards.

## 4. Booking (tap-through, stopped before any personal data: `final-phone-drawer-1…4.png`, `final-walk.log`)
- **Rooms:** 1 tap, hero → Booking.com (live dates). Every room has the same link.
- **A surf week:** bar "Plan a stay" → "A surf week" → "Yoga and Surf" → "Shared double" shows **USD 280 per person, 7 nights**, "Published 2021, call to confirm before you book", then "Call about this week" (`tel:+94719248686`) or "Email". The email subject is prefilled: "Cheeky Monkey: Yoga and Surf Lesson Package, shared double room". That is 4 taps to a call or email that carries the choice. The price and the dated note appear before the tap.
- The drawer looks like the site (same chips, type and blue). Esc closes it and focus returns to "Plan a stay". It trusts well: the dates are honest, and the phone number is real and tappable.
- **The current site:** no path at all. The only action is a `mailto:` far down the home page. There is no Booking.com link and no tappable phone, and a banner says the rooms "aren't bookable right now" (`current-phone-*.png`; `current.mjs` log: `links: ["mailto:…"]`).

## 5. Motion and interaction
- **Main item present:** vid-009 inside a WebGL board mask (`gl-live`), with the scrubbed board-mask zoom-through. The cap-7 rule does not apply: the hero is clean, has one CTA and is not a cookie-cutter section, and the main item comes from the business's own footage.
- **Micro-animations:** the package card lifts on hover (`final-laptop-card-hover.png`), the button states work, the chips toggle in the drawer, slideshow dots stretch, and quotes slide. The resin gloss on pointer move is barely perceptible (`final-laptop-hero-pointerL/R.png` look almost identical). It neither helps nor hurts.
- **Reduced motion:** the poster sits in the board shape, nothing pins, and no video is requested (`final-phone-rm-0/1.png`). Still a good page.
- **JS off:** the same first screen with the poster, and the hero link works. **Defect:** the fixed header has no ground without JS, so "Catch waves, not worries" runs under "Cheeky Monkey / Surf Camp | Midigama" (`final-phone-nojs-1.png`). The phone bar is also absent.
- **Inspector** (`/design-taste-frontend`), the relevant lines only:
  - "17 different font sizes".
  - "Yellow-cream background #f2e8d7".
  - The empty middle beside "The rooms" title at 1440.
  - Resting shadows on buttons and cards.

  Its `pinned-over-picture` and `reduced-hidden` (the closed drawer) are not defects for this concept.

## 6. Laptop (1440 × 900: `final-laptop-t1500/t4000.png`, `final-laptop-s01…s27.png`, `final-laptop-piece-*.png`)
- The video plays at 1.3 s (`d1920.webm`).
- The first screen is balanced: the line splits either side of the board and the button sits under "leave as a friend.". But the board is about 240 px of a 1440 px screen, so the business's footage covers roughly a seventh of the first screen. The concept's own failure warning ("a narrow board … reads as small or coy on a 1440 px screen") is half true: the beach fills the space now, but with drawing, not media.
- Below the hero, the 2-up room slideshows, the shop masonry and the guests section hold well at this width. The package row fits in four columns without side-scrolling.

## 7. Against the current site (`current-phone-*.png`, `current-laptop-*.png`; `dossier/cheeky-monkey/assets/old-site-*.png`)
- **The current site is worse almost everywhere:**
  - a PHP notice above the logo on every page;
  - the layout runs 470 px wide in a 390 px phone (`scrollWidth 470`);
  - a black "not bookable" banner under the hero;
  - no ratings, no prices on the menu pages, no tappable phone, no booking link.
- **Where it is honestly better:** its first screen is a real full-bleed photograph of a surfer with a yellow fish at the shorebreak (img-103). It is water, light and a person, the feeling a surfer is buying. The new first screen is a drawing plus an indoor clip. The new page uses that same photo, but three screens down.

**Verdict: better than the current site, yes, clearly.** It is better on the first screen as a working, branded and bookable thing, and better on the whole page by a wide margin.

## 8. Score: 8 / 10
- **Earns it:** a distinctive, cheeky first screen with one clear action; a real "into the shop" set-piece from the business's own footage; rooms, shop, Baba and guests each designed as a moment; booking in 1 tap and prices 1 tap away, inside a drawer that feels like the site; no deflating clutter.
- **Keeps it from 9:** the first screen leans on a drawing rather than the place's strongest media; the slow-network font fallback; the stock band leading "Down at the water"; the dark middle of the zoom.

---

## Fix list (biggest effect first)
1. **Load the display face on slow networks.** On the throttled phone the whole walk shows the fallback instead of Permanent Marker (`final-phone-t*.png`, `s*.png`), so the page's voice is lost for the target visitor. Use `font-display: swap` for Permanent Marker (29 KB, already preloaded) with a size-adjusted fallback `@font-face` (`size-adjust` / `ascent-override`) so the swap does not shift the layout. At minimum, replace the bare `cursive` at the end of the stack: on Android it is a formal script.
2. **Lead "Down at the water" with the business's own surf photograph, not stock-003.** Put img-103 (the yellow fish at the shorebreak) or img-100 as the full-bleed band. Move the Wikimedia panorama, or drop it, and set its credit in the footer credits or as small type that does not read as a caption under the section title (`final-laptop-s05/s06.png`, `final-phone-s03.png`).
3. **Make the first screen carry more real place.** Keep the board idea, but make the drawn beach recede: for example, a softer, paler drawing with fewer flat bands, or the board standing on a real sand and water still (img-100 / img-155 crop). Let the board's footage be the most saturated thing on screen. On the laptop, the board could be taller or wider (it is about 240 px of 1440).
4. **Trim the dark middle of the zoom-through.** Start the scrubbed cut after the dark, blurred frames (the reel's 3.0–4.4 s section reads black at full screen: `final-phone-piece-05/06.png`), or hold the poster frame until the mask passes about 60 %. On phones, the zoom's final state would be sharper with a 1080-wide tier.
5. **Make the package cards picture-led and lighter.**
   - Give the photo in each card a real crop (a taller board shape, or a rectangle at the card's width) instead of a small oval on a flat primary block.
   - Move the "Private room USD 400 | shared double …" fine print into the drawer, or into a two-line price row at body size (`final-laptop-s08/s09.png`).
   - Also fix the JS-off header: give it a ground when JS is off (`final-phone-nojs-1.png`).

## Must-fix before the pitch (not round-blocking)
- Fix 1 (font loading on slow networks).
- Fix 2 (own photo leads the water section, stock credit not as a caption).
- The JS-off header overlap.

## Keep
- The board window with the reel, and the board-mask zoom into the shop: the page's signature.
- One CTA on the first screen, going straight to Booking.com (1 tap), and the persistent two-button phone bar.
- The "Plan a stay" drawer: chips, live price per room type, the honest "Published 2021" note, prefilled call and email.
- The five room slideshows with their murals; the shop masonry; Baba's section; the guests slider with dated rating cards.
- Rethink Sans + Permanent Marker, the blue booking colour, and the shoreline section edges, consistent all the way through the drawer and footer.

---

## Round 2

experience-critic 0.2.0 · station 5 (full), round 2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-04
Page: `sites/cheeky-monkey/final/dist/` (designer 0.7.1), served by `astro preview` on `localhost:8950`. Compared with https://cheekymonkeymidigama.com/, walked live again today.
I wrote this without reading the critic's or the visual-critic's round-2 report. The first screen is now Alon's drone loop. I judge how it is delivered, not whether it should be there.

Frames are under `reports/2026-10-midigama-01/experience/cheeky-monkey/r2-*.png`. The step log is `r2-walk.log`, and the recipe is `r2-walk.mjs.txt`: Playwright on Chromium with autoplay allowed. The phone profile is 390 × 844, DPR 3, touch, an iPhone UA, ~1.6 Mbps / 150 ms RTT and 4× CPU. The laptop is 1440 × 900.

| | |
|---|---|
| **Score (dimension 8)** | **8 / 10** |
| **Better than the current site** | **yes**, and now on the first screen too |
| **Pass / fail (this critic)** | **pass**, with no experience-side hard fail |
| **Taps to book** | **1**. The first screen has the header "Book", the hero's "Check dates on Booking.com" and a `tel:` icon (`r2-walk.log` "booking links"). Both booking links go to `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`. After the first scroll the phone bar holds "Check dates on Booking.com" and "Plan a stay" (`r2-phone-bar.png`). This matches the audit target (engine, 1). |

### 1. Phone, cold and throttled: the drone loop's delivery (`r2-phone-t*.png`, `r2-walk.log` "phone-cold")

| t | On screen | Video state |
|---|---|---|
| 0.5 s | The header, the two-line marker title in **Permanent Marker** (both families are already `loaded`), and the blue button on the flat sea-blue ground. The page is usable. The legibility scrim's radial shade shows as a dark smudge on the empty blue (`r2-phone-t500.png`). | hero: no source yet. The board reel has **already started downloading** (request at 440 ms). |
| 1.5 s | The phone poster (608 × 1080 crop) is half painted: palms and village on top, flat blue below (`r2-phone-t1500.png`). | still none |
| 3 s | The whole poster is up: reef, the rock wall, the village under the palms. It is a good, real frame, and it carries the first screen alone. The poster finished at 2.4 s. | hero sources attached after `load` (request at 3.7 s) |
| 6 s | Same poster | hero `m1280.webm`, readyState 1, not yet faded in |
| 10 s | The loop is running. The fade-in is soft, and the cut reaches the surfer on the green wall (`r2-phone-t10000.png`). | hero `on`, t = 3.2 s |

- **Poster-first is right.** The text and the CTA come first, then a real poster, then the loop fades in over the poster's matching frame. The handoff does not jump: `r2-phone-handoff-poster.png` and `-video0.png` share the same crop at `object-position 55% 50%`.
- **The board reel slows the hero down.** The intro board sits just under a 100svh hero. Its observer uses a `300px` margin, so on a 390 × 844 phone the board counts as near the screen on page load. Its 1.86 MB `cm-board.m720.mp4` therefore starts at **440 ms**. That is before `load` and before the hero loop, and it runs alongside the poster (182 → 2395 ms). Its download takes until 16.9 s. The hero's 0.88 MB WebM, which starts at 3.7 s, does not finish until 12.6 s. On the playbook's phone, the visitor watches a still poster for about 9 s, partly because of a 124 px board they have not scrolled to. With no scroll at all, the video bytes on that first visit come to **2.74 MB** (`phone total video bytes`).
- **The phone tier is soft.** A 390 × 844 screen covers the 1280 × 720 tier at 844 CSS px tall. That is under one source pixel per CSS pixel, so ~2.5 device px per source px on DPR 3. The frame at 100 % is soft but clean, with no blocking (`r2-phone-handoff-video0.png`). The surf shot is the softest part (`r2-phone-loop-3_5.png`, `-5.png`). The interpolated slow motion holds up, and I saw no tearing in the frames I sampled. The poster is drawn from the 1080 px source, so it is a little sharper than the video that replaces it.
- **Off screen it pauses, and it resumes at the top.** At 1.5 screens down: hero `paused: true`, the board still playing. Back at the top: hero `paused: false` (`phone scrolled 1.5 screens` / `phone back at top`). In the slow scroll, the hero pauses from s03 and the board from s05 (`phone s1…s33`).
- **Laptop:** `d1920.webm` (1.58 MB) is playing by 0.5 s on a fast line (`r2-laptop-t500.png`). The wide 16:9 frame reads as the coast, the sea and the village at once (`r2-laptop-t1500.png`). It is the strongest first screen this business has had.

### 2. Reduced motion, Save-Data, JS off (`r2-phone-rm-*.png`, `-savedata-*`, `-nojs-*`)
- **Reduced motion:** the `js still` class is set, and **0 media requests over a full scroll**. The poster, line and button are identical to the motion first screen, so it is still a good page.
- **Save-Data** (`navigator.connection.saveData = true`, injected): `js still`, **0 media requests**, poster only.
- **JS off:** the header has its white ground (round 1's overlap is fixed), with the poster, the line and a plain-link CTA. 0 media requests. The board shows its reel's poster (`r2-phone-nojs-2.png`).
- The tier is read once, before first paint. A visitor who switches on reduced motion mid-visit keeps the loop until they reload. This is minor.

### 3. The story and wanting to go (`r2-phone-s01…s33.png`)
- **After one scroll** (s02–s04) you know what this is and where: the real coast and surf, then "Catch waves, not worries" with the board, then img-103 full-bleed. That is a real Cheeky Monkey surfer with the yellow board in the shorebreak. Then "Down at the water" has The spot, The season and the business's own beach photos. **There is no borrowed photo and no caption-like credit.** Round-1 fix 2 is done, and attention no longer dips there.
- **What makes you want to go:** the drone pass over the reef and the surfer on the green wave, then img-103. In round 1 the only real footage was a strip of shop interior; now the place does the selling.
- **Prices:** "A week of surf" (s07–s08) leads each card with a whole photo on a white card, then "USD 300–400 per person, 7 nights", with the room fine print under it. That is clearly calmer than round 1's colour swatches. The fine print is still small grey type. The lesson card (USD 20, 90 min, levels) and the "Published 2021, call to confirm" notes remain honest.
- **Rooms, shop, roof, Baba, guests, getting here and the closing** all hold as in round 1 (s11–s30). The guests slide on the phone leaves a tall empty gap under a short review (`r2-phone-s26.png`).

### 4. Motion and interaction
- **Hero:** a calm drone loop with an 0.8 s fade-in and no overlays, title animation or WebGL. Only the header, one centred two-line title and one button sit on the footage. That is the calibration bar exactly. The loop counts as the unique variant's main item (a great video cut), so the method-5 cap does not apply.
- **Board:** a 3° tilt at rest, a hover that stands it up, and a resin sheen (`r2-laptop-board-hover.png`). The **zoom-through set-piece is gone** with the cartoon hero. That was the page's best moment in round 1, and the board is now a small ornament. On the laptop it is ~172 px wide in a wide sand band, with the shop reel often showing a dark frame (`r2-laptop-s02.png`), so its idea ("pick your board") reads weakly there.
- **Cards** lift on hover and the photo eases in (`r2-laptop-card-hover.png`). The buttons, chips and drawer are as in round 1.

### 5. Against the current site (`r2-current-phone-1.png`)
The current site still has the PHP notice at the top, still runs 470 px wide in a 390 px phone, and has **0** booking, WhatsApp or `tel:` links. Round 1's one honest point in its favour was that its first screen was a real photograph of the water. That point is gone: the new first screen is the real coast in motion, with one action. **Better: yes, clearly, on the first screen and over the whole page.**

### 6. Score: 8 / 10
- **Earns it:** the real place now carries the first screen, delivered correctly: poster first, reduced motion, Save-Data and JS off all still, pause off screen, a phone tier, 1 tap to book, and the fonts now arrive on the slow phone. The water section is all the business's own, and the cards are photo-led.
- **Keeps it from 9:** on the target phone the loop waits ~9 s behind an eagerly loaded board reel; the phone video is soft; and with the zoom-through gone, the page's signature "pick your board" moment is a small ornament.

### Fix list (biggest effect first)
1. **Do not load the board reel during first load.** Gate the board's `watch()` behind the same `load` + frame as the hero, and attach it only after the hero's `playing` event or on the first scroll. On a 390 × 844 phone its 300 px margin already covers the board at load: the request goes out at 440 ms, competes with the poster, and pushes the loop's start to about 9–10 s (`r2-walk.log` "phone-cold requests").
2. **Give the board reel a phone-sized rendition.** The board is 124 CSS px wide on phones (`.board` `min(124px,34vw)`) but loads the 720 × 1280 H.264 MP4 at 1.86 MB. A 360 × 640 WebM plus MP4 (well under 0.5 MB) would look the same at that size and cut the phone's video total from 2.74 MB to about 1.3 MB.
3. **Sharpen the phone hero.** Portrait phones show a 9:16 slice of a 16:9 tier, so most of the 1280 px is never seen while the visible part is upscaled. Cut a portrait rendition: the poster's own 608 × 1080 crop, as WebM + MP4, chosen by `(max-aspect-ratio: 3/4)` like the poster. It would be sharper on the surf shot, smaller than `m1280`, and match the poster's sharpness at the handoff. Delete the unused `cm-drone.m720.mp4` from the build.
4. **Give the empty pre-poster frame a ground.** At 0.5 s on the slow phone, the radial scrim draws a dark blob on flat `--sea` (`r2-phone-t500.png`). Either show the scrim only once the poster has decoded, or inline a ~1 KB blurred LQIP of the poster as the hero's background.
5. **Give "pick your board" its moment back on the laptop.** Make the intro board larger at ≥ 1024 px (or the intro band shorter), and start the shop reel on a bright frame of the boards, not a dark one (`r2-laptop-s02.png`). Also trim the empty height of the phone review slide (`r2-phone-s26.png`).

### Keep
- The drone loop exactly as cut: the reef, the village, the surfer. Keep the poster-first delivery, the 0.8 s fade, the 55 % crop, the pause off screen, and the posters only under reduced motion, Save-Data and JS off.
- One centred two-line title and one button on the footage, the header Book, and the phone bar.
- img-103 leading "Down at the water", with no borrowed photo. The photo-led white package cards.
- `font-display: swap` with the metric-matched fallbacks: Permanent Marker is loaded at 0.5 s on the throttled phone.
- The rooms, the shop masonry, Baba, the guests and the drawer, as in round 1.

**Report (round 2):** 8/10 · pass · better than current: yes · taps to book: 1 · top three fixes: defer the board reel off first load; a phone-sized board reel; a portrait phone rendition of the drone loop.

---

## Round 3

experience-critic 0.2.0 · station 5 (full), round 3 (the last) · run `2026-10-midigama-01` (test, operator alon) · 2026-11-04
Page: `sites/cheeky-monkey/final/dist/` (designer 0.7.1, round 3), served by `astro preview` on `localhost:8950`. Compared with https://cheekymonkeymidigama.com/, walked again this round.
I wrote this without reading the critic's or the visual-critic's round-3 report. The drone hero is Alon's choice; I judge how it is delivered.

Evidence is under `reports/2026-10-midigama-01/experience/cheeky-monkey/r3-*`:
- `r3-walk.mjs.txt` (recipe) with `r3-walk-run1.log` and `r3-walk.log` (two full walks);
- `r3-arm.mjs.txt` / `r3-arm.log` (five extra cold phone loads, logging what arms the board reel);
- `r3-current.mjs.txt` / `r3-current.log` (the current site).

The phone profile is the same as round 2: 390 × 844, DPR 3, touch, an iPhone UA, ~1.6 Mbps / 150 ms RTT and 4× CPU. The laptop is 1440 × 900.

| | |
|---|---|
| **Score (dimension 8)** | **8 / 10** |
| **Better than the current site** | **yes**, clearly, on the first screen and over the whole page |
| **Pass / fail (this critic)** | **pass**, with no experience-side hard fail |
| **Taps to book** | **1**. The first screen shows the header "Book", a `tel:` icon and "Check dates on Booking.com", all 46–56 px tall. Both booking links go to `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`. After the first scroll the phone bar holds "Check dates on Booking.com" and "Plan a stay" (`r3-phone-bar.png`). This matches the audit target (engine, 1). |

### 1. Phone, cold and throttled: when the loop starts

I made seven cold loads: two full walks and five arm runs.

| Load | Poster done | `load` | Hero `playing` | Board reel requested |
|---|---|---|---|---|
| walk 1 | 3.44 s | 3.43 s | **5.35 s** | 5.58 s (after the hero) |
| arm 2–5 | — | 3.43–3.45 s | **5.28–5.29 s** | 5.29–5.31 s (after the hero) |
| walk 2 | 2.92 s | 3.85 s | **7.27 s** | **1.02 s** (before `load`) |
| arm 1 | — | 3.83 s | **7.24 s** | **0.66 s** (before `load`) |

- **In 5 of 7 loads the loop plays at ~5.3 s**, down from ~9–10 s in round 2. The reel waits for the hero, and the phone video total is **1.42 MB**: `p1080.webm` 0.999 MB + `p640.webm` 0.419 MB, down from 2.74 MB.
- **In 2 of 7 loads the round-2 problem comes back.** The board reel is requested at 0.66–1.02 s, before `load`, and the hero only plays at ~7.3 s.
  - The cause shows in `r3-arm.log`. The `<source>` elements carry only `data-src`, so each one fires an `error` event while the page parses: 9 of them, at 226–239 ms in runs 2–5 and at 616–621 ms in run 1.
  - `site.js` arms the reel on `hv.addEventListener('error',arm,true)`, a capturing listener. When those empty-source errors fire after the script has run (run 1), they arm the reel at once. It is a race, and on a slow real phone it can go either way.
- **The poster competes with the images below the fold.**
  - `cm-drone-poster-r1.778-m-608.webp` (116 KB) is requested at ~200 ms. It finishes at 2.9–3.4 s, together with eight lazy images that Chrome's lazy margin pulls in at ~470–860 ms (img-103, 100, 151, 149, 135, 137, 096 and the board poster, ~430 KB).
  - The hero attaches only after window `load`, so it waits for all of them too. On its own the poster would land in about 1 s.
- **The first frames are fixed.** At 0.5 s and 1.5 s the text and button sit on the poster's tonal gradient, with the poster painting in from the top and no dark blob (`r3-phone-t500.png`, `-t1500.png`).
  - The scrim switches on (`.hero.lit`) at 2.9–3.3 s, with the poster.
  - CLS is 0, and both fonts are loaded at 0.5 s.
- **Off screen** the hero pauses at 1.5 screens down and plays again back at the top (`phone scrolled 1.5 screens` / `back at top`).

### 2. The loop on the phone and the laptop
- **Portrait tier:** the phone gets `p1080` (608 × 1080) and the poster/video handoff shares the crop (`r3-phone-handoff-*.png`). The surf shot is clearly crisper than round 2's m1280 at the same size. You can read the rider's face and the board's rails (`r3-phone-heroframe-4/5.png`).
- **Rider vs. type:** I sampled the loop at 0.5, 2, 3, 4, 5, 5.5 and 6 s on the phone and at 2, 3, 4 and 5.5 s on the laptop. The rider is never under the line or the button. The line sits at y 655–719 and the button at 737–793 of 844. The board's nose touches the left edge at 5.5 s on the phone, which is acceptable for a fast pass (`r3-phone-heroframe-5_5.png`).
- **Grade:** the surf water is now turquoise-green and matches the poster's sea. It no longer drops to milky grey.
- **Seam:** at 6.0 s the dissolve shows the surfer as a ghost over the village (`r3-phone-heroframe-6.png`). In motion it reads as a 0.4 s breath, not a cut.
- **Text placement:** the line in the lower band on clear water reads calmer than a centred block would over the rider.
- **Laptop:** `d1920.webm` is playing by 0.5 s. The board reel now opens on bright red, green and yellow rails (`r3-laptop-s02.png`, `r3-laptop-board-hover.png`), and the 224 px board holds the intro better than round 2's 172 px. It is still a supporting moment, not a set-piece.

### 3. Reduced motion, Save-Data, JS off
All three load **0 media requests over a full scroll**:
- reduced motion: `js still`, posters only;
- Save-Data: `js still`;
- JS off: white header, the poster, the line and the plain CTA, with the scrim on (`r3-phone-rm-*`, `-savedata-*`, `-nojs-*`).

### 4. Story, wanting to go, booking (`r3-phone-s01…s33.png`)
- **After one scroll** you know what this is and where. You see the real coast and the surf, then the bright board with "Catch waves, not worries", then img-103 full-bleed, then "Down at the water" with img-100 and img-151 (s02–s06). img-151 (the surfers with their soft boards on the sand) is a warmer, crisper image than round 2's hazy wide shot.
- **Prices** come at s07–s08 (USD 300–400 per person, 7 nights, dated 2021). The rooms, shop, roof, Baba, guests, getting here and the closing all hold.
- **Review slideshow:** the box now sizes to the quote. On the phone the `.quotes` block measures 380 / 352 / 523 / 409 px for slides 1–4, and the empty gap from round 2 is gone (`r3-phone-review-1…4.png`). The side effect is that the rating cards below move up and down by up to ~170 px on each slide change. The move is animated and caused by the visitor, so it is not CLS, but the cards visibly jump.
- **Booking:** 1 tap to Booking.com. The drawer opens from the bar's "Plan a stay" (`r3-phone-drawer.png`). Across the page there are 43 booking, call and email links in 9 unique targets, and every engine link is the dossier URL.

### 5. Against the current site (`r3-current-phone-1.png`, `r3-current.log`)
The current site still shows a PHP notice above the logo. It runs 470 px wide in a 390 px phone, and its only contact link is a `mailto:`, with no booking and no phone link. **Better: yes, clearly.**

### 6. Score: 8 / 10
- **Earns it:**
  - A real, moving first screen of the place, delivered properly: tonal ground, then the poster, then the loop, with crisp portrait footage.
  - The type is clear of the surfer, and the water is graded to match the poster.
  - The loop starts ~4 s sooner in most loads, and the phone video weight is halved.
  - The posters stand in under every "still" condition.
  - Booking takes 1 tap, and the water section uses only the business's own photos.
- **Keeps it from 9:**
  - The reel-arming race still lets the board steal the first load in 2 of 7 cold loads, which puts the loop back at ~7.3 s.
  - The poster waits ~3 s behind images below the fold.
  - "Pick your board" is a supporting moment rather than a signature.
  - The rating cards jump when the review changes.

### Fix list (biggest effect first; none blocks this pass)
1. **Close the reel-arming race.** Ignore the parse-time `error` events from empty `<source data-src>` elements: arm only on an error whose `target.src` is set, or add the `error` listener inside `attach(hv)`. Evidence: `r3-arm.log` run 1, and `r3-walk.log`, where the reel is requested at 0.66 / 1.02 s and the hero plays at ~7.3 s.
2. **Let the poster have the line on the phone.** Attach the hero on the poster's `load` (it already sets `.hero.lit`) plus a frame, not on window `load`. Keep the lazy images below the hero out of the first second: `fetchpriority="low"`, or a JS-gated `loading` for the "Down at the water" and shop images. Today the 116 KB poster takes 2.9–3.4 s because eight images are downloading with it.
3. **Hold the guests block still on a slide change.** Size the track to the tallest quote at that width once, and centre shorter quotes in it. Alternatively, keep the per-quote height but place the rating cards beside or above the slider on phones so they do not jump (`r3-phone-review-1…4.png`).
4. **Smooth the poster's first paint.** At 0.5–1.5 s the progressive WebP draws a hard horizontal edge over the tonal gradient (`r3-phone-t500/t1500.png`). Give the poster a short opacity fade-in on load, as the video already has.
5. **Give "pick your board" more weight if a later round allows.** On the phone the reel board is 124 px wide beside a large intro. A tap that opens the reel larger, or a short scroll-linked rise, would bring back some of round 1's "into the shop" moment without touching the hero.

### Keep
- The drone loop as recut: the graded surf shot, the 0.4 s dissolve, the type in the lower band, the `p1080` portrait tier at focalX 52, and the `d1920` tier on desktop.
- The tonal pre-poster ground and the scrim shown only after the poster loads.
- The reel kept off first load (when the race does not fire), its `p640` phone tier, and its bright-rail opening.
- One line and one button on the footage, the header "Book", the phone bar, and the drawer.
- img-103, img-100 and img-151 in "Down at the water"; the photo-led cards; the rooms, shop, Baba and guests.

**Report (round 3):** 8/10 · pass · better than current: yes · taps to book: 1 · loop starts at ~5.3 s on the throttled phone (5 of 7 loads; ~7.3 s when the arming race fires) · top three fixes: close the reel-arming race on empty-source `error` events; attach the hero on poster load and keep the images below the fold out of the first second; stop the rating cards jumping on a review change.
