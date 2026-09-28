mode: quick (4f)    round: 1    agent: experience-critic 0.1.0    run: 2026-09-globalsurf-02    date: 2026-09-28
business: Global Surf Lodge Kabalana (`global-surf-adventures`)
pages: `sites/global-surf-adventures/mockups/{calm,interactive,unique}/dist/index.html`, served over http on 127.0.0.1:8983
current site: https://www.globalsurf.com/ and the lodge page https://www.globalsurf.com/global-hotels/sri-lanka/kabalana-surf-lodge/
funnel target (`audit.json.recommended`): primary `engine` "See the weekly surf packages and dates", `clicks_to_book: 1`, above the fold on the booking section: level → price → included → trust → action

Frames: `reports/2026-09-globalsurf-02/experience/global-surf-adventures/<page>/`. Walk logs: `<page>/walk.json` (timeline, scroll, video state, frame timing, taps) and `probe.json` (level taps, fine scroll frames, booking landings).

## How the walk was done

- **Phone:** Chromium with software GL, 390 × 844, DPR 2, touch, mobile UA; slow 4G (1.6 Mbps, 150 ms RTT) and 4× CPU through CDP. Cold load with frames at 0.5, 1.5 and 3 s, then load + 4 s and load + 7 s. After that, "human" scrolling: 0.7 of a viewport per swipe, ten wheel ticks, 1.2 s dwell, one frame per stop (`phone-scroll-NN.jpg`).
- **Motion:** unthrottled continuous scroll, 30 px every 33 ms, top to bottom, with rAF frame intervals logged (`motion-*`). Fine scroll through the booking section in 200 px steps (`fine-*`, `lapfine-*`).
- **Level choice and booking:** tapped the level controls, then tapped the primary action and a Level 1 link through to the engine, stopping at the engine's first screen (`level-*`, `book-*`). No guests chosen, no personal data entered.
- **Reduced motion** (`reduced-*`) and **JavaScript off** (`nojs-*`), on the phone.
- **Laptop:** 1440 × 900 on a 20 Mbps link, same cold frames, then scrolling (`laptop-*`).
- **Current site:** the same phone, laptop and booking walk on the home page and the lodge page (`current-home/`, `current-lodge/`).

Caveats:
- Headless Chromium uses software GL, so WebGL frame times are pessimistic compared with a real phone GPU.
- Python's `http.server` has no range requests. Every clip still played from the start.
- The "KB" counters below include the hero video that loaded during the 7 s after load. They are not the playbook's first-load budget; the critic measures that.
- On the current site, the frames I asked for at 1.5 s and 3 s actually landed at 4.2 s and 6.3 s on the lodge page, and 3.6 s and 5.5 s on the home page. The page was too busy to screenshot sooner. I report the real times.

## The current site, walked first (the bar to beat)

**Lodge page, phone** (`current-lodge/phone-*`):
- **0.5 s:** blank.
- **4.2 s:** a grey gradient block, with "Your Surf Trip To Sri-Lanka Starts Here", a breadcrumb and a small coral "BOOK YOUR STAY" (`phone-cold-1500ms.jpg`).
- **6.3 s:** the same grey block (`phone-cold-3000ms.jpg`). The hero video had not arrived. A Messenger bubble sits over the text from the first scroll onwards.
- **Numbers:** load event at 52 s, LCP 9.5 s (a stamp SVG), CLS 0.10, 22 hosts, about 9.1 MB by load + 7 s.

Scrolling it has real charm: dark, moody level tiles with real surfing (Level one / two / three / FreeStylers, `phone-scroll-01/02`), a big turquoise wave, script headings, a sunset yoga photo. Then it drifts into a Kuula 360 player, Maldives and Palau Instagram tiles, and a 2019 footer (`phone-scroll-08…11`). No price anywhere.

**Booking on the current site:** "BOOK YOUR STAY" goes to `bookinglayer.com/tests/…` and lands on the engine's home page, `bookinglayer.com/en`, with a generic "Sri Lanka" tile (`current-lodge/book-01-engine.jpg`). The package is lost. Reaching a product takes at least three more taps, and the price is first seen inside the engine.

**Home page, phone** (`current-home/`): a grey block with "Tailor-Made Surf Trips Like Never Before" until about 5.5 s, then a Maldives drone shot. The lodge is a carousel card further down. LCP 15.6 s.

**Where the current site is better than the new pages (honest):**
1. Its level tiles put a surfer on every level at a glance, dark and dramatic.
2. It has a warm, hand-made voice (script headings, sand ground).
3. It shows yoga and wellness imagery that none of the new pages use.

Everything else (speed, clarity, price, getting to book) loses badly.

---

## Page 1 · calm "Daybed"

**Timeline, phone, slow 4G:**
- **0.5 s:** the poster (pool deck, umbrellas, palm, blue sky) is painted, with name, tagline, a full-width coral CTA and "8.6/10 on Booking.com, 80 reviews · Read 28 Sep 2026", all usable (`calm/phone-cold-500ms.jpg`).
- **1.5 s:** the same frame. Sora has swapped in, a slight re-set of the type with no shift (CLS 0).
- **3 s:** video attached and playing (`vid-009-m1280.webm`; t = 3.5 s at load + 4 s).
- **Numbers:** LCP 608 ms (the H1).

**Feel of the first screen:** bright, clean, hotel-like. On a phone the crop is mostly umbrella canvas and the white wall. The pool is a strip at the bottom, and the 12 s cut (drone, pool deck, tuk-tuk, hillside Buddha, boat, dune path, reef coast; tiled in my ffmpeg check) never shows anyone surfing. It says "nice hotel", not "surf week".

**The walk (phone):**
- One swipe gives "Next set is yours" with two lodge photos (`phone-scroll-00/01`).
- At the third stop comes "Pick your level": a swipe row of 4:5 cards with **$1,466 per person, 7 nights** printed on the picture (`phone-scroll-02`). Card 1 plays the golden-hour beginner clip.
- Then a feature band (the pool at water level, featureLine), a 2 × 2 day grid, rooms, a large "8.6", quotes, the spot with Rosa's widget, getting here, and a dusk closing band (`phone-scroll-05…19`).
- The persistent bar appears as soon as the hero leaves: Fomies / Rollers / Riders · "$1,466 pp, 7 nights · lessons, meals, room" · coral "Packages and dates" (`phone-scroll-01` onwards).
- **Where attention drops:** stops 10–11 are an amenities list on pale grey with nothing to look at, and the long quote run (12–14) is text only.
- **The story:** after one swipe you know what and where. The price arrives at stop 2–3 through a photo card, not a table. Good.

**Taps to book:**
- **First screen:** 1 tap to `bookinglayer.com/en/category/sri-lanka` (`book-01-engine-category.jpg`).
- **Level:** "Book Level 1 – Fomies" is 1 tap to `/product/level-1-fomies` (`book-02-engine-level1.jpg`). The package survives. This meets `clicks_to_book: 1`.
- **Snag:** tapping "Rollers" in the bar turns the bar button into "Book Rollers", but the card row above still shows the Fomies card (`level-01-tap.jpg`). What you read and what you book disagree.
- The per-card "Book Level n" buttons are thin outline buttons, the weakest element in the section.

**Motion:**
- Only the hero video and the Level 1 card clip move. Scroll frames: p50 = p95 = 16.7 ms, none over 50 ms, on phone and laptop.
- Nothing jars, and nothing delights. There is no moment where the page moves with you.
- **Reduced motion:** no video requested, and the poster stands in.
- **JS off:** the full page, with all links (`nojs-*`).

**Laptop:**
- Hero is the drone over the lodge in the jungle, then the pool, with the name low left and the CTA (`laptop-cold-*`).
- The three level cards (a surfer on each, price on the photo) are the best screen of the page (`laptop-scroll-02`).
- The rest is a tidy 1200 px column, large white gaps, and small photos next to text (`laptop-scroll-07/08`).

**Score: 7 / 10.** Clear, fast and easy to book, but polite. It is the "nice hotel template" risk its own concept named. The one place it pulls you in is the level cards.
**Better than the current site:** yes, clearly on speed, price and booking, and on first impression (a sunlit lodge at 0.5 s against a grey block at 6 s). It is **below 8, so a hard fail at 4f.**

**Fix list (biggest effect first):**
1. Put water and surfing in the first screen. Re-crop the phone poster to the pool (lower centre) and re-cut vid-009 so the surf/reef shots (src ≈ 30–45 s) come in the first 4 s. As it stands, nothing in the first screen says "surf".
2. Make the level cards the page's big moment on the phone: one card per screen (≈ 85 vw) with its clip playing. A solid coral "Book Level n" on each card instead of the outline button.
3. Sync the bar's level switch with the card row: tapping Rollers scrolls the row to the Rollers card, not only the bar button.
4. Break the white runs: the amenities list (stops 10–11) and the quote run (12–14) need a picture between them. The pool-at-dusk band or a full-bleed day photo at 4:5 would do.
5. Make the day run genuinely big: a 2 × 2 grid of 195 px squares is a thumbnail sheet. Use full-width 4:5 frames.

**Keep:** poster painted at 0.5 s with text and CTA usable; price printed on the level photos; the persistent bar and its order (level → price → included → action); 1-tap product links; the big "8.6" trust moment; the dusk closing band; reduced-motion and no-JS behaviour.

---

## Page 2 · interactive "Pick your water"

**Timeline, phone, slow 4G:**
- **0.5 s:** the poster (palm, pool, umbrellas) is painted, with the giant white word **"Kabalana"** across the bottom and, above it, the name, tagline, "8.6/10" and a full-width coral CTA. All usable (`interactive/phone-cold-500ms.jpg`).
- **1.5 s:** Barlow Condensed has swapped in. The name narrows and the block reflows upward (CLS 0.026 phone, 0.052 laptop, `phone-cold-1500ms.jpg` against `-500ms`).
- **3 s:** video attached. Playing, t = 4.1 s at load + 4 s.
- **Numbers:** LCP 648 ms.

**Feel of the first screen:** the giant word over the moving lodge is a real idea, and it reads at once. But the stack of five small items above it (name, tagline, score, date, button) is crowded on a phone, and like calm the cut shows no surfing.

**The walk (phone):**
- At stop 1 the stage takes over. A sticky level switch ("Level 1 Fomies / Level 2 Rollers / Level 3 Riders", 70 px tall) sits over a 4:5 clip, with the level's words, **$1,466 per person, 7 nights**, the inclusions, trust and a coral "Book Level 1 – Fomies" below (`phone-scroll-01/02`).
- **Tapping a level changes the film:** Rollers plays vid-003 (a rider on a green wall, `level-tab-1.jpg`), and the bar follows ("Book Level 2"). This is the experience the audit asked for, and it feels good.
- **But Riders opens on a drone shot of the lodge roofs and palms, not a rider** (`level-tab-2.jpg`, and `laptop-scroll-03`). vid-002's cut runs: wave, drone over the lodge, pool top-down, top-down paddlers, and only then the barrel (frames 5–9 in my 1 fps tile). The "already carving" level is sold with a roof.
- **"Not sure which level?"** opens a slide-out with four answer tiles that hand off to WhatsApp (`drawer-00.jpg`). It is clear and in the way of nothing.
- **Day run on the phone:** the first stop is an empty aqua slab under the heading, with a photo sliver cut off at the right edge (`day-00.jpg`, `phone-scroll-06`). It reads as broken until you swipe sideways (native scroller, 2609 px wide; `day-01-swipe.jpg`).
- Then rooms as a tap list with one photo, "8.6/10", Fanny's quote in large type, the spot with Rosa's widget, and "Getting here" with the top-down lodge photo. That photo fills almost two phone screens (`phone-scroll-15/16`).
- The closing is the three level words, huge (`phone-scroll-18`).
- **Where attention drops:** the aqua slab, and the two-screen aerial.

**Taps to book:**
- **First screen:** 1 tap to the Sri Lanka category.
- **From the stage:** 1 tap on a level word, then 1 tap on "Book Level n", which reaches the right product (`/product/level-1-fomies`, `book-02-engine-level1.jpg`).
- **From any screen:** the bar's level switch plus "Book Level n", 2 taps, and always synced with the stage.
- **Trust:** price and level are both understood before the tap. It is the clearest level choice of the three.

**Motion:**
- The stage crossfade is clean. The horizontal run is smooth on the laptop (`laptop-scroll-07…11`).
- Frame timing: phone p50 = p95 = 16.7 ms, none over 50 ms. Laptop p95 16.7 ms, max 33 ms.
- **Reduced motion:** no video requested.
- **JS off:** the stage becomes three stacked levels, each with poster, price and link (`nojs-02/03`). But "Kabalana" clips to "Kabalan" at 390 px (`nojs-00`).
- **Weight:** the laptop walk pulled 9.4 MB (hero plus all three level clips).

**Laptop:**
- The giant word fills the width; the small name at left and "8.6" at right are tiny next to it (`laptop-cold-*`).
- The pinned stage steps Fomies → Rollers → Riders as you scroll: clip left, words right (`laptop-scroll-01…03`).
- The run of six day photos over the aqua band is the best "day at the lodge" moment of any page (`laptop-scroll-07…10`).

**Score: 8 / 10.** Engaging, the one page where choosing is fun, clearly better than the current site, and easy to book. It sits at the line because of the Riders clip, the empty aqua slab and the surf-less hero.
**Better than the current site:** yes. It beats the current level tiles at their own game: real water per level, plus the price and a working link.

**Fix list (biggest effect first):**
1. Re-cut the Riders clip (vid-002) to start at the barrel, src ≈ 5 s of the current cut. No drone, pool or paddling frames in a level clip.
2. Phone day run: start the track with a photograph in view, and drop or shorten the aqua slab so the first stop is never an empty colour block.
3. Hero: fewer items above the giant word on the phone (name + CTA; move the score and date into the header line or under the fold). Reserve the Barlow metrics (size-adjust) to stop the reflow at font swap. Put a surfing shot in the first 4 s of the cut.
4. "Getting here" aerial: cap it at 4:5 on phones. It is two screens of roofs.
5. JS off: fit "Kabalana" at 390 px (clamp on vw), or it reads "Kabalan".

**Keep:** the stage (tap a word, the water changes, the book button follows); the sticky level switch and a bar synced with it; the "Not sure which level?" drawer ending in WhatsApp; the giant place word; the laptop horizontal day run; the huge level words at the close; 1-tap product links.

---

## Page 3 · unique "Waterline"

**Timeline, phone, slow 4G:**
- **0.5 s:** a flat dark-teal screen with name, tagline, coral CTA and "8.6/10", text usable but **no picture** (`unique/phone-cold-500ms.jpg`).
- **1.5 s:** the poster is in (`phone-cold-1500ms.jpg`), with the waterline across the lowest fifth, the pool refracted below it.
- **3 s:** video playing (t = 4.7 s at load + 4 s).
- **Numbers:** LCP 620 ms (the H1; the poster painted after it).

**Feel of the first screen:** the waterline is a quiet, original touch. Once you notice the pool moving under the line, it is lovely. The first half-second is a dark empty panel, which the other two do not have.

**The walk (phone):**
- "Next set is yours", then a barrel photo, then "Pick your level" (`phone-scroll-00/01`).
- Each level is a full-width scene that rises through a thin waving line, the refraction visible in the fine frames (`fine-01`, `fine-07`, `fine-13`). The words sit below on the foam-grey ground: "Level 1 – Fomies", who it's for, **$1,466**, inclusions, a coral "Book Level 1 – Fomies →", and the rating (`fine-04…07`).
- Level 1 (golden-hour beginner) and Level 2 (the rider on the green wall, `fine-08/09`) are the strongest level moments of any page.
- **Level 3 again opens on top-down footage** (a pink board in the pool, paddlers on green water) before any barrel (`fine-13…15`).
- **The scene just before its video arrives is muddy:** a sepia band with blurred silhouettes (`phone-scroll-01`, `laptop-scroll-01`).
- **Length:** the three levels take about six phone screens, and the page is the longest of the three (14.7k px). The day masonry, rooms, big "8.6", quotes, getting here and the dusk band follow (`phone-scroll-09…23`).
- **Where attention drops:** the amenities list (`phone-scroll-14/15`), and the long quote column.
- The phone bar has **no level switch**: only "$1,466 pp, 7 nights · lessons, meals, room · Packages and dates". The phone header carries only the name.

**Taps to book:**
- **First screen:** 1 tap to the Sri Lanka category.
- **Level:** "Book Level 1 – Fomies" is 1 tap to `/product/level-1-fomies`.
- **Snag:** there is no quick way to jump levels on a phone. You scroll through the scenes, and the bar only offers the category.

**Motion:**
- On the phone the waterline is thin and reads like a pool edge, not a "liquid effect". Good taste.
- **Frame timing:** phone p95 33 ms, 5 frames over 50 ms, max 67 ms. Laptop p95 50 ms, **82 frames over 50 ms**, max 100 ms. This is the only page with visible jank risk. Software GL exaggerates it, but it needs a real-device check.
- **Reduced motion:** no shader, no video requested, static scenes (`reduced-*`).
- **JS off:** full content with stills (`nojs-*`).
- **Weight:** the laptop walk pulled 12.4 MB (four d1920 clips).

**Laptop:**
- The most cinematic of the three: full-bleed scenes, a real rider per level, each rising through the line (`laptop-scroll-02…06`, `lapfine-*`).
- The top-down pool photograph as the rooms scene is stunning (`laptop-scroll-11`).
- The bar carries Fomies / Rollers / Riders on the laptop.

**Score: 8 / 10.** The most "want to be there" page, level by level, clearly better than the current site, and easy to book. It is held at 8 by the empty first half-second, the Riders clip, the pre-video sepia frame and the frame drops.
**Better than the current site:** yes. It is the only new page that also beats the current site's drama.

**Fix list (biggest effect first):**
1. Paint the poster in the HTML before the canvas: an `<img>` or CSS background under the WebGL layer, so 0.5 s is the pool, not a teal panel.
2. Re-cut the Riders clip to open on the barrel (same fix as interactive). While a clip loads, show its own poster at full colour, not the tinted or sepia pre-frame.
3. Add the level switch to the phone bar (jump to the scene), so a traveller can compare levels without six screens of scrolling. Or shorten each level scene to one screen with the words beside it.
4. Performance: run the shader only while a join is on screen, at half resolution while scrolling. Verify on a mid-range Android. Load the d1920 level clips only when their scene is one screen away (the laptop walk pulled all four).
5. Put one picture into the amenities / quotes stretch, so the last third keeps the film's rhythm.

**Keep:** the waterline as the only device, thin and fast; full-bleed level scenes with the words on the ground below, never on the video; price and "Book Level n" on every scene; the top-down pool rooms scene; the dusk closing band; the variable-width titles; the reduced-motion and no-WebGL fallbacks.

---

## Shared across all three

- **The hero cut contains no surfing.** In order it shows: drone, pool deck, tuk-tuk, Buddha, boat, dune path, reef coast. The laptop "settled" frame of every page is the hillside Buddha (`*/laptop-settled.jpg`). For a business that sells surf weeks, the first screen sells a hotel. Move a surf shot into the first 4 s.
- **Riders (vid-002) cut** opens on non-surf frames on the two pages that use it as a clip.
- **Against the audit target:** all three meet `clicks_to_book: 1` to the engine and to each level's product, and all keep price, included, trust and action in the booking section. The current site needs at least 4 taps and never shows a price.

## Experience ranking (4f)

| rank | page | score | better than current | taps to book (first screen → engine / level → product) | pass at 4f (≥ 8 and better) |
|---|---|---|---|---|---|
| 1 | interactive "Pick your water" | 8 | yes | 1 / 2 (tap level, tap Book) | pass (at the line) |
| 2 | unique "Waterline" | 8 | yes | 1 / 1 (from its scene) | pass (at the line) |
| 3 | calm "Daybed" | 7 | yes | 1 / 1 (card) or 2 (bar) | **fail** (below 8) |

Why interactive is above unique: both make me want to go, and unique does it more strongly on a laptop. But interactive makes the traveller's actual decision (which level, what it costs, book it) a pleasure. It is smooth on every frame, and a phone user can compare levels in two taps. Unique needs six screens of scrolling and has the only frame drops.

The sentence the human needs to pick: **interactive is the easiest week to choose and book, unique is the most beautiful to watch, and calm is fast and clear but forgettable.**

---

# Round 2 (4f) — 2026-09-28

The same method as round 1, re-walked from scratch on the rebuilt `dist/`, again served on 127.0.0.1:8983:

- phone on slow 4G with 4× CPU: cold frames at 0.5, 1.5 and 3 s, then human-pace scroll;
- motion runs on phone and laptop;
- level taps, and taps through to the engine;
- reduced motion and JavaScript off;
- laptop at 1440 × 900.

Frames and logs are in `reports/2026-09-globalsurf-02/experience/global-surf-adventures/r2/<page>/`, with `r2/probe.json`. The current site is the round-1 walk from the same day (`current-lodge/`, `current-home/`). I did not open the critic's or visual-critic's reports.

**New cuts, checked in the pages:**
- The hero `vid-009e` plays on all three pages. It opens on the pool deck, and by load + 4 s shows a surfer on a reef wave (`*/phone-settled.jpg`, `*/laptop-settled.jpg`).
- Level 3 now plays `vid-002e` (calm and unique) or `lv3-*` (interactive). Tapping Riders shows a wave or a rider within 1.5 s (`interactive/level-tab-2.jpg`, `unique/level-02-tap.jpg`, `calm/level-02-tap.jpg`). The drone and pool frames are gone.

## calm "Daybed", round 2

**Timeline, phone:**
- **0.5 s:** the top ≈ 57 % is a flat light-blue block. The name, tagline, full-width coral CTA and "8.6/10 … Read 28 Sep 2026" sit on white below it and are already usable (`r2/calm/phone-cold-500ms.jpg`).
- **1.5 s:** the poster (the pool deck).
- **3 s:** the video is playing.
- **load + 4 s:** a surfer on a reef wave.
- **Numbers:** LCP 636 ms (the poster), CLS 0.

The hero is no longer full-bleed on the phone: picture above, text on white. It is clearer, but less immersive than round 1. On the laptop the text sits in a white card over the moving picture (`laptop-cold-*`).

**The walk:**
- **Levels:** the cards are now ≈ 300 px wide, each playing its clip with price and level on one line. Each card has a **solid coral "Book Level n – …"** (`phone-scroll-02/03`).
- **Bar and cards are in sync:** tapping Rollers or Riders in the bar scrolls the row to that card, and the bar button becomes "Book Rollers" or "Book Riders" (`level-01-tap.jpg`, `level-02-tap.jpg`). The round-1 mismatch is gone.
- **Day run:** full-width photographs (`phone-scroll-06…09`). A lounge photograph now breaks the amenities list (`phone-scroll-13`). The white stretches that lost me in round 1 are shorter.
- **featureLine:** white on the pool, readable (`phone-scroll-05`).
- **Where attention drops:** only the long quote column (`phone-scroll-15/16`).
- **Level card 1:** caught mid-dissolve in one frame, a ghosted double image (`phone-scroll-02`). It is the clip's own transition; harmless, but it looks soft at that moment.

**Taps to book:**
- From the first screen, 1 tap to `/category/sri-lanka`.
- From a card, 1 tap to `/product/level-1-fomies` (checked).
- From any screen, 1 tap on the bar's "Book <level>" (2 taps if you switch level first).
- This meets `clicks_to_book: 1`.

**Motion:**
- Phone and laptop both at p50 = p95 = 16.7 ms, no frame over 50 ms.
- Reduced motion requested no video.
- With JS off the page is complete: no broken images, no hidden sections.
- The laptop walk loaded 4.7 MB.

**Score: 8/10 — pass.** It is still the quietest of the three, but it now sells surf on the first screen. The level cards are the page's big moment, and booking is effortless. **Better than the current site: yes.**

**Top fixes:**
1. Phone hero: paint the poster (or its dominant colour, sampled from the photo) at 0.5 s, not a flat blue block. Consider giving the picture the full screen again, with text over the bottom gradient: the half-and-half split feels like a card, not an arrival.
2. Cut the dissolve out of the Level 1 card clip, or use a hard cut, so the card never shows a ghosted frame.
3. Break the quote column with one picture.

**Keep:** the synced bar and cards; the solid per-card Book buttons; the full-width day photographs; the lounge photograph after the amenities; white featureLine on the pool; smooth motion; the reduced-motion and no-JS behaviour.

## interactive "Pick your water", round 2

**Timeline, phone:**
- **0.5 s:** the poster, with a slimmer hero: name in the header, then tagline, "8.6/10 Booking.com · 80 reviews · 28 Sep 2026", a full-width coral CTA and the giant "Kabalana". The 0.5 s and 1.5 s frames have the same layout, so the round-1 font reflow is gone (`r2/interactive/phone-cold-500ms.jpg`, `-1500ms`).
- **Video:** playing by 1.5 s; surfer on the reef wave at load + 4 s.
- **Numbers:** LCP 1,172 ms (up from 648 ms, still well inside 2.5 s), CLS 0.

**The walk:**
- **The stage:** tap Fomies, Rollers or Riders and the clip changes (golden-hour beginner, rider on a green wall, **now a real barrel for Riders**). The words, price and "Book Level n" follow, and the bar stays in sync (`level-tab-0/1/2.jpg`, `level-bar-2.jpg`).
- **"Not sure which level?"** opens the four answer tiles that lead to WhatsApp (`drawer-00.jpg`).
- **Day run:** now opens on a photograph (the woman carrying a board), not the empty aqua slab (`day-00.jpg`, `phone-scroll-06`). Native swipe works.
- **Aerial:** the "Getting here" aerial is capped to a normal frame (`phone-scroll-14`).
- **JS off:** "Kabalana" now fits at 390 px (`nojs-00.jpg`).
- **featureLine (the one weak spot):** it is set in dark ink over the hair-flip photo. Where it crosses the dark sunshade (`phone-scroll-04`, `laptop-scroll-04`) it is hard to read, and it appears again at the top of the next frame as it scrolls over the photo (`phone-scroll-05`).

**Taps to book:**
- From the first screen, 1 tap to `/category/sri-lanka` (checked in the probe).
- From the stage: 1 tap to choose a level, 1 tap "Book Level n", which lands on `/product/level-1-fomies` (checked).
- From any screen, the synced bar: 1 tap for the shown level, 2 to switch.

**Motion:**
- Phone p50 = p95 = 16.7 ms, no frame over 50 ms.
- Laptop p95 16.8 ms, 1 frame at 50 ms.
- Reduced motion requested no video.
- With JS off the page is complete.
- The laptop walk loaded 9.2 MB, with every level clip viewed.

**Score: 9/10 — pass.** Every round-1 issue is fixed. It is the most engaging way to choose a week: you watch your water, see the price and book in two taps. The hero now shows surfing under the giant place word. **Better than the current site: yes, by a wide margin.**

**Top fixes:**
1. featureLine: white type, or keep it off the sunshade and on the water, so it stays readable over its whole scroll.
2. Bring phone LCP back towards 0.6 s: the hero text span now paints at 1.17 s; preload the font or paint the tagline with the fallback font.

**Keep:** the stage and its synced bar; the "Not sure" drawer; the slimmer hero with "Kabalana"; the day run opening on a photograph; the barrel for Riders; the capped aerial; the huge level words at the close; smooth motion.

## unique "Waterline", round 2

**Timeline, phone:**
- **0.5 s:** a graded placeholder (sky blue at the top down to dark teal) with name, tagline, coral CTA and "8.6/10" usable. Still no picture (`r2/unique/phone-cold-500ms.jpg`). It is better than round 1's flat teal, but it is not the pool.
- **1.5 s:** the poster, with the waterline across the bottom.
- **load + 4 s:** the surfer on the reef wave.
- **Numbers:** LCP 640 ms (the H1).

**The walk:**
- **The bar now has a level switch** ("Fomies · Rollers · Riders" plus "Book <level>"). Tapping Rollers jumps to its scene and the button follows (`level-01-tap.jpg`: `vid-003` playing, bar "Book Rollers").
- **Riders** opens on a green lineup wave, then the barrel (`level-02-tap.jpg`, `phone-scroll-05/06`). Fixed.
- **Laptop level scenes:** name, price and Book now share one row beside or under the film (`laptop-scroll-02…06`). It is the most cinematic walk of the three.
- **Day masonry:** now leads with the board-carrying photograph (`phone-scroll-10/11`).
- **The lodge from above** is still the best single picture on any page (`laptop-scroll-12`).
- **Where attention drops:** amenities (`phone-scroll-15/16`), and the long quote column.

**Taps to book:**
- From the first screen, 1 tap to `/category/sri-lanka`.
- From a scene or the bar, 1 tap to `/product/level-1-fomies` (checked).
- Switching level from anywhere: 1 tap in the bar, then Book.

**Motion — regression:**
- Scrolling now drops frames heavily. Phone: p95 83 ms, **379 of 1,292 frames over 50 ms**, max 133 ms. Laptop: p95 83 ms, 326 of 1,211 over 50 ms, max 167 ms.
- Round 1 in the same harness was p95 33 ms phone and 50 ms laptop.
- I re-ran the motion walk alone (no parallel load) and got the same result.
- Idle frames are clean (p95 16.7 ms at the hero, levels, day and guests), so the cost is in the scroll-linked work.
- Software GL overstates GPU cost, but the jump from round 1 is the page's own.

**Other checks:** reduced motion requested no video; with JS off the page is complete; the laptop walk loaded 8.4 MB.

**Score: 8/10 — pass, at the line.** It is the page that makes you most want to be there, and the round-1 booking gaps are closed (level switch in the bar, barrel for Riders). What holds it at 8 is the scroll jank, which a traveller on a mid-range Android would feel in exactly the moments the page is built on, plus the picture-less first half-second. **Better than the current site: yes.**

**Top fixes:**
1. Find the scroll-time cost: in the round-2 build it is new, and it is in scroll handling, not idle rendering. Throttle scroll work to one rAF, run the shader only while a join is on screen, and lower the resolution while scrolling. Verify on a real mid-range Android before build.
2. Paint the poster at 0.5 s: an `<img>` under the canvas, not a gradient.
3. One picture in the amenities or quotes stretch.

**Keep:** the waterline; the level switch in the bar that jumps to scenes; the laptop's one-row level scenes; the barrel for Riders; the lodge-from-above rooms scene; the reduced-motion and no-WebGL fallbacks.

## Experience ranking, round 2

| rank | page | score | 4f | better than current | taps to book (first screen → engine / → level product) |
|---|---|---|---|---|---|
| 1 | interactive "Pick your water" | 9 | pass | yes | 1 / 2 (tap level, tap Book) or 1 from the bar |
| 2 | unique "Waterline" | 8 | pass (at the line; fix the scroll jank before build) | yes | 1 / 1 |
| 3 | calm "Daybed" | 8 | pass (at the line) | yes | 1 / 1 |

All three pass round 2.

**The sentence for Shahar:** interactive is the one I'd book from: tap your level, watch your water, see $1,466 and book in two taps. Unique is the most beautiful, but it now stutters when you scroll. Calm is clear and smooth, but the quietest.

---

# Round 3 (4f, final before the human) — 2026-09-28

**How it was walked:**
- Same method, re-walked from scratch on the rebuilt `dist/`, served on 127.0.0.1:8983 (stopped afterwards).
- Phone on slow 4G with 4× CPU, laptop at 1440 × 900.
- Each page's motion run is a wheel scroll, measured **alone** (no parallel load), with rAF frame intervals logged.
- Level taps and engine landings were checked in `r3/probe.json`.
- Frames: `reports/2026-09-globalsurf-02/experience/global-surf-adventures/r3/<page>/` (motion runs in `r3/<page>-motion/`).
- I did not open the other reviewers' reports.

**Frame times, wheel scroll (rAF interval):**

| page | phone p50 / p95 / frames > 50 ms / max | laptop p50 / p95 / frames > 50 ms / max |
|---|---|---|
| calm | 16.7 / 16.8 / 0 of 1,589 / 17 | 16.7 / 16.7 / 0 of 1,172 / 17 |
| interactive | 16.7 / 16.8 / 0 of 1,063 / 17 | 16.7 / 16.7 / 0 of 1,259 / 17 |
| unique | 16.7 / 16.7 / **0 of 1,495** / 33 | 16.7 / 33.3 / **5 of 1,488** / 67 |

Unique's claim holds. Round 2 had 379 of 1,292 phone frames over 50 ms; round 3 has none. It is now as smooth as the other two on the phone, and near it on the laptop.

**New clips, checked in the pages:**
- The `vid-009e` hero reaches a surfer on a sunny reef wave by load + 4 s on every page (`*/phone-settled.jpg`, `*/laptop-settled.jpg`).
- Level 3 (`vid-002e`, or `lv3-*` on interactive) is barrels only. Tapping Riders shows a rider in the barrel within 1.5 s (`calm/level-02-tap.jpg`, `unique/level-02-tap.jpg`, `interactive/level-tab-2.jpg`).

**Booking, all three:**
- The first-screen CTA reaches `/category/sri-lanka` in 1 tap.
- A level's Book link reaches `/product/level-1-fomies` in 1 tap (checked on every page).
- The persistent bar carries a level switch and "Book <level>".
- Reduced motion requested no video on any page.
- JS off: all three complete, no broken images, no hidden sections.

## calm "Daybed", round 3 — **8/10, pass; better than current: yes**

**Timeline, phone:**
- **0.5 s:** a blue-to-sand gradient block where the picture goes. The name, tagline, full-width coral CTA and rating on white below it are usable (`r3/calm/phone-cold-500ms.jpg`).
- **1.5 s:** the pool poster.
- **Numbers:** LCP 640 ms (the poster).

**The walk:**
- **Levels restructured:** each level is now a full-width clip followed by its name, words, **$1,466**, what's included and "Book Level n" (`phone-scroll-02…07`). It is bigger and more immersive than round 2's swipe row.
- **The bar follows your scroll:** its highlight moves Fomies → Rollers → Riders, and the button becomes "Book Rollers", then "Book Riders" (`phone-scroll-03…06`, `level-01/02-tap.jpg`).
- **Regression:** the per-level "Book Level n" buttons are **outline buttons again** (`phone-scroll-03`, `level-02-tap.jpg`, `laptop-scroll-02…04`). The solid coral bar button still carries the booking, so no tap is lost.
- **Laptop featureLine:** dark ink over blue water, hard to read (`laptop-scroll-06`). On the phone it is white on the pool and fine (`phone-scroll-09`).
- **The long quote column** (`phone-scroll-18…21`) is still four screens of text.

**Weight:** the phone walk loaded 3.5 MB (hero and three level clips); the laptop 4.9 MB.

**Verdict:** clear, smooth, and surf on the first screen, but still the quietest page.

**Remaining fixes:**
1. Solid coral per-level Book buttons.
2. Paint the poster at 0.5 s, not a gradient.
3. White (or ink-on-light) featureLine on the laptop.
4. One picture in the quote column.

**Keep:** full-width level clips with the price under them; the scroll-synced bar; the full-width day photographs; smooth motion.

## interactive "Pick your water", round 3 — **9/10, pass; better than current: yes**

**Timeline, phone:**
- **0.5 s:** the new phone crop is painted. Name, tagline and "8.6/10 · 80 reviews · 28 Sep 2026" sit at the top on the dark sky; the pool and umbrellas fill the middle; the coral CTA and the giant "Kabalana" sit at the bottom (`r3/interactive/phone-cold-500ms.jpg`).
- **1.5 s:** the video is playing (a 480-px phone rendition).
- **load + 4 s:** the surfer is centred in the frame (`phone-settled.jpg`). It is the strongest phone first screen of the three.
- **Numbers:** LCP 788 ms (was 1,172 ms), CLS 0.

**The walk:**
- **The stage:** tap a level and the water changes (golden hour, green wall, barrel), and the price, words, "Book Level n" and bar follow (`level-tab-0/1/2.jpg`, `level-bar-2.jpg`).
- **"Not sure which level?"** opens the WhatsApp tiles (`drawer-00.jpg`).
- **featureLine is now white** on the hair-flip photo and reads cleanly (`phone-scroll-05`).
- The day run opens on a photograph; the aerial is capped.

**Weight:** the phone walk loaded 2.5 MB, the lightest; the laptop 7.1 MB, with every level clip viewed.

**Verdict:** every earlier issue is fixed. Choosing a level is a pleasure, and booking is always one tap away.

**Remaining fixes:** none that would change a visitor's experience. Polish only:
- the rooms tap list sits beside one photo and runs long on the phone (`phone-scroll-08`);
- the quote column is text-heavy.

**Keep:** everything, especially the stage, the synced bar, the new phone hero crop and the "Not sure" drawer.

## unique "Waterline", round 3 — **9/10, pass; better than current: yes**

**Timeline, phone:**
- **0.5 s:** the poster (the pool and umbrellas) is painted, with the name and tagline at the top, the coral CTA low, and the waterline across the foot (`r3/unique/phone-cold-500ms.jpg`). The round-1 and round-2 blank opening is fixed.
- **Video:** playing by 1.5 s, the surfer on the reef wave by load + 4 s.
- **Numbers:** LCP 608 ms.

**The walk:**
- **Level scenes:** Fomies (golden hour) → Rollers (the green wall) → Riders (**a pure barrel**, `phone-scroll-05/06`, `laptop-scroll-05`), each rising through the thin waterline, with price and a solid coral "Book Level n →" below.
- **The bar's level switch** jumps between scenes and the Book button follows (`level-01/02-tap.jpg`).
- **Laptop:** the most cinematic of the three (`laptop-scroll-02…06`). Scrolling it is now smooth (table above).
- **Hero legibility:** once the video plays, "8.6/10 on Booking.com, 80 reviews, as of 28 Sep 2026" sits in white on the pale refracted water under the line, and it is hard to read (`phone-settled.jpg`).
- **Weight:** the phone walk pulled 7.4 MB of video as the level scenes came into view (hero plus three m720 clips), the heaviest of the three. It all loads after first paint and only as you scroll, but on a metered SIM it adds up.

**Verdict:** now smooth, with a real picture from the first half-second and barrels for Riders. It is the page that most makes you want to go.

**Remaining fixes:**
1. Move the rating above the waterline, or set it on a dark scrim.
2. Load each level clip only when its scene is within one screen, and release it after, to bring the phone video total down.
3. One picture in the amenities or quotes stretch.

**Keep:** the waterline; the barrels; the bar's level switch; the poster at 0.5 s; the scroll performance fix.

## Experience ranking, round 3 (final 4f)

| rank | page | score | 4f | better than current | taps to book (first screen → engine / → level product) |
|---|---|---|---|---|---|
| 1 | interactive "Pick your water" | 9 | pass | yes | 1 / 1–2 (stage tap, then Book; or the bar) |
| 2 | unique "Waterline" | 9 | pass | yes | 1 / 1 |
| 3 | calm "Daybed" | 8 | pass | yes | 1 / 1 |

Interactive and unique tie on score. Interactive ranks first because it has no open issue that affects a visitor, and it is the lightest on a phone. Unique still has the hard-to-read hero rating and 7.4 MB of scroll-time video.

**The sentence for Shahar:** all three now beat the current site. Interactive is the easiest week to choose and book (tap your level, watch your water, book), unique is the most beautiful and now scrolls smoothly, and calm is clear and dependable but the quietest.

---

# Round 4 (4f) — 2026-09-29 · calm and interactive only

**How I walked it:**
- Same method as before: re-walked from scratch on the rebuilt `dist/`, served on 127.0.0.1:8983 and stopped afterwards.
- Phone on slow 4G with 4× CPU, then laptop at 1440 × 900.
- Wheel-scroll motion measured alone for each page.
- Level taps, and taps through to the booking engine (`r4/probe.json`).
- Reduced motion and JS off.
- Frames are in `reports/2026-09-globalsurf-02/experience/global-surf-adventures/r4/<page>/`.
- Unique was not re-walked; its round-3 result stands (9/10, pass).
- I did not open the other reviewers' reports.

**Checks that passed on both pages:**
- **Booking:** the first-screen CTA reaches `/category/sri-lanka` in 1 tap, and "Book Level 1" reaches `/product/level-1-fomies` in 1 tap.
- **Bar:** the bar's level switch changes the clip and the Book target on both pages.
- **Motion:** wheel scroll on phone and laptop ran at p50 16.7 ms / p95 ≤ 16.8 ms, with 0 frames over 50 ms on either page.
- **Reduced motion:** no video requested.
- **JS off:** complete on both.

## calm "Daybed", round 4 — **8/10, pass; better than current: yes**

**What is fixed since round 3:**
- **Poster at 0.5 s:** the pool is painted at 0.5 s (`r4/calm/phone-cold-500ms.jpg`; LCP 584 ms, the inline poster).
- **Full-bleed hero on the laptop:** the film fills the screen with the name, CTA and rating over it. By load + 4 s it shows the surfer on the reef (`laptop-cold-*`, `laptop-settled.jpg`).
- **Whole-sentence level headings** read well ("Level 1 – Fomies is for your first time on a board…", `phone-scroll-02/03`).
- **Solid coral "Book Level n"** buttons are back (`phone-scroll-03/05/07`, `laptop-scroll-02…04`).
- **Feature line on img-005:** white on the pool, readable on the phone and the laptop (`phone-scroll-09`, `laptop-scroll-06`).
- **Quote swipe row** with "Read all 80 reviews on Booking.com" (`phone-scroll-19`) replaces the four screens of text.

**Remaining fixes:**
1. **The phone hero is still not full-bleed.** The picture takes the top ≈ 57 % and the name and CTA sit on white below (`phone-cold-*`, `phone-settled.jpg`). The laptop now arrives in the film; the phone arrives at a card. Carry the full-bleed treatment to 390 px.
2. **Below the quote swipe row the phone shows about half a screen of empty ground** before "The spot" (`phone-scroll-19/20`). Tighten it.

It is still the quietest of the three, but it is now polished end to end and books without friction.

## interactive "Pick your water", round 4 — **9/10, pass; better than current: yes**

**What is fixed or improved since round 3:**
- **Portrait hero on the phone:** the 960 px phone video (`hero-p960.webm`) is playing by 1.5 s. By load + 4 s the surfer fills the portrait frame, with a lighter text band at the top and the CTA and "Kabalana" at the foot (`phone-settled.jpg`).
- **Fomies stage on the phone:** the clip is framed on the beginner in the whitewater and the cheering instructor (`phone-scroll-01`, `level-tab-0.jpg`). Riders is the barrel (`level-tab-2.jpg`).
- **Tighter phone spacing:** the page is 10,987 px, down from 11,207 px.
- **Weight:** 3.0 MB on the phone walk, 7.0 MB on the laptop with every level clip viewed.

**Remaining fixes:**
1. **Regression at 0.5 s:** the phone hero is a grey-to-white wash with no picture. "Kabalana" in white sits on pale grey and barely reads (`r4/interactive/phone-cold-500ms.jpg`). The poster only arrives by 1.5 s (in round 3 it was painted at 0.5 s). LCP is 912 ms (was 788 ms). Paint the poster (or a dark sampled colour) behind the text from the first frame.
2. **Laptop feature line:** "Footwear is discouraged. Chilling out is inescapable." is still dark ink where it crosses the dark sunshade and the wet hair (`laptop-scroll-04/05`). On the phone it is white and fine (`phone-scroll-05`). Make the laptop white as well.

## Ranking after round 4 (unique carried over from round 3)

| rank | page | score | 4f | better than current |
|---|---|---|---|---|
| 1 | interactive "Pick your water" | 9 | pass | yes |
| 2 | unique "Waterline" (round 3) | 9 | pass | yes |
| 3 | calm "Daybed" | 8 | pass | yes |

**The sentence for Shahar:** all three beat the current site. Interactive is the easiest week to choose and book, unique is the most beautiful, and calm is now polished and dependable but still the quietest, and on a phone it opens on a card rather than the film.

---

# Round 5 (4f) — 2026-09-29 · calm and interactive only

**How it was walked:** the same method as rounds 1–4, re-walked from scratch on the rebuilt `dist/`, served on 127.0.0.1:8983 and stopped afterwards.
- Phone on slow 4G with 4× CPU, then laptop at 1440 × 900.
- Each page's wheel-scroll motion was measured alone.
- Level taps and engine landings were checked (`r5/probe.json`).
- Reduced motion and JS off were checked on both pages.
- Frames are in `reports/2026-09-globalsurf-02/experience/global-surf-adventures/r5/<page>/`.
- Unique was not re-walked; its round-3 result stands.
- I did not open the other reviewers' reports.

**Both pages:**
- **Booking:** the first-screen CTA reaches `/category/sri-lanka` in 1 tap, and "Book Level 1" reaches `/product/level-1-fomies` in 1 tap. The bar's level switch changes both the clip and the Book target (calm: Rollers plays `l2-vid-003`, Riders plays `l3-vid-002e`; interactive: `lv2`, `lv3`).
- **Motion:** 0 frames over 50 ms on phone or laptop (p95 ≤ 16.8 ms).
- **Reduced motion:** no video requested.
- **JS off:** complete, with no broken images.

## calm "Daybed", round 5 — **8/10, pass; better than current: yes**

**Fixed since round 4:**
- **Full-bleed phone hero:** at 0.5 s the pool poster already fills the phone, with the name at the top and the tagline, CTA and rating at the foot (`r5/calm/phone-cold-500ms.jpg`). By load + 4 s it is the surfer on the reef (`phone-settled.jpg`). LCP 584 ms. The phone now arrives in the film, like the laptop.
- **Feature on img-017:** two guests laughing on a daybed over the pool, with "Footwear is discouraged. Chilling out is inescapable." in white. It is the warmest moment on the page (`phone-scroll-09`, `laptop-scroll-06`).
- **Guests on one screen:** "8.6", Fanny's quote, the 9.5 / 9.2 / 9.2 scores and a swipe row with "Read all 80 reviews" (`phone-scroll-18/19`). The empty half-screen from round 4 is gone.
- **Level films and solid Book buttons:** unchanged from round 4, and still good (`phone-scroll-02…07`).

**Remaining issues:**
1. **"The deck" strips** are thin letterbox crops of the timber deck used as dividers. Twice they cut people oddly: bare legs and feet on a daybed with no body (`phone-scroll-01` bottom, `phone-scroll-14` top). They read as accidental crops, not a signature. Crop them to deck, water and cushions only, or drop the people frames. This is what holds calm at 8.
2. Calm is still the quietest page by design. Nothing else in it slows or confuses a visitor.

## interactive "Pick your water", round 5 — **9/10, pass; better than current: yes**

**Both round-4 regressions are fixed:**
- **Phone poster at 0.5 s:** the pool poster is painted behind the text, "Kabalana" reads white on the picture, and the CTA is usable (`r5/interactive/phone-cold-500ms.jpg`). By load + 4 s the 960 px portrait surfer is playing. LCP 780 ms.
- **Laptop feature line:** "Footwear is discouraged. Chilling out is inescapable." is now white over the pool and reads cleanly (`laptop-scroll-05`). The dark-ink-on-sunshade frame is gone (`laptop-scroll-04`).

**Everything else holds:** the stage (tap a level, the water changes, the price and Book follow), the synced bar, the "Not sure which level?" drawer, and the barrel for Riders (`level-tab-*.jpg`, `drawer-00.jpg`).

**Remaining issues:** none that affect a visitor. Polish only: the rooms tap list runs long on the phone (`phone-scroll-08/09`).

## Ranking after round 5 (unique from round 3)

| rank | page | score | 4f | better than current |
|---|---|---|---|---|
| 1 | interactive "Pick your water" | 9 | pass | yes |
| 2 | unique "Waterline" (round 3) | 9 | pass | yes |
| 3 | calm "Daybed" | 8 | pass | yes |

**The sentence for Shahar:** all three beat the current site and book in one tap. Interactive is the easiest week to choose and book, unique is the most beautiful, and calm is now a full-bleed, warm, dependable page and still the quietest.
