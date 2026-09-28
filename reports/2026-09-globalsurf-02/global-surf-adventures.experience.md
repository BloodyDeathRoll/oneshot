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
