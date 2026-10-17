# Global Surf v2: experience critic, station 4f, round 1

experience-critic 0.1.0 · run `2026-10-globalsurf-03` · slug `global-surf-adventures-v2` · 2026-10-16 (UTC)
Pages, served over http by `tools/_serve.mjs`: calm :9711, interactive :9712, unique :9713. The visual critic's and the critic's reports were not read.

Frames are in `reports/2026-10-globalsurf-03/experience/global-surf-adventures-v2/<page>/`, with `walk.json` holding video state, fixed elements, headings and request hosts for every frame:
- `phone-cold-{500,1500,3000,6000}ms.jpg`: 390×844, touch, about 1.6 Mbps, 150 ms RTT and 4× CPU.
- `phone-walk-NN`, `laptop-walk-NN`, `reduced-walk-NN` and `nojs-walk-NN`: scrolls at a human pace, about 0.3 viewport every 0.4 s, with a frame every 0.6 viewport. The sheets are `sheet-*.jpg`.
- `book-phone-NN.jpg` and `book-phone.json`: the booking tap-through. Engine requests were intercepted and aborted, so nothing was booked.
- `unique/drop-*.jpg` and `unique/drop.json`: the set-piece, scrubbed in 13 steps on a slow phone, a fast phone and a laptop.

**The current site** was walked live on the same profiles: `current-lodge/` (the Kabalana lodge page) and `current-home/`. **Gold**: `gold-the-sign/` was walked, but its images do not resolve in this worktree, so it only served to compare structure. The bar comes from `gold/global-surf-notes.md`.

## The current site (the page to beat)

- **Cold load on the phone profile.** At 0.5 s there is a dark sunset rock under "Your Surf Trip To Sri-Lanka Starts Here", with a breadcrumb above the title and a small coral button. The page takes 50 s to fire `load`, makes 229 requests and contacts 27 hosts, including googletagmanager, doubleclick, facebook, kuula, elfsight and youtube (`current-lodge/walk.json`). A Messenger bubble covers the bottom-right corner of every frame (`current-lodge/sheet-phone-1.jpg`).
- **What it does well.** Handwritten section titles ("Choose your level", "Our Experiences", "Wellness", "Nature", "Adventure"), layouts that overlap photographs, a full-bleed tropical band, an Instagram feed and a real footer (`current-lodge/sheet-laptop-1.jpg`).
- **What it lacks.**
  - No price anywhere.
  - The rooms are a blurred Kuula 360° box with a play button.
  - The level tiles lead to the engine and lose the chosen package (audit F1/F2).
- **Taps to book.** One tap reaches the engine home, and then the visitor has to find the package again and choose guests and a date before seeing a price (audit F2).

## calm: "Walk to the water"

**Timeline on the phone (`calm/sheet-phone-cold.jpg`).**
- At 0.5 s and 1.5 s the poster is already painted: a smiling woman carrying a mint soft-top, "Next set is yours" and the crimson "Book package now". It reads at once.
- At 3.0 s `hero-m608.webm` is playing (t=0.1). It is the fastest video start of the three.
- At 6 s the 9:16 crop of the "boards under the tree" shot shows a torso with no head (`phone-cold-6000ms.jpg`). The phone file is 608 px wide drawn at 780 device px, so it looks slightly soft.

**The walk on the phone (`calm/sheet-phone-1.jpg`, 26 frames).**
- One scroll down are three portrait level stills with a Play button, "From $1,466 pp | 7 nights" and "Choose Level n" (frames 02–04). The trust line follows with the Booking.com 8.6.
- After one scroll the page has answered what it is, where it is, the price and the level. That part is good.
- Attention drops in three places:
  - The lodge text and the amenities paragraph run for two screens of small grey text (frames 10–12).
  - The rooms are three stacked slideshows with text under each, six screens of the same rhythm (frames 13–19).
  - The guests section repeats one quote on the photograph and again under it (frames 23–24).
- The pool full-bleed with "Footwear is discouraged. Chilling out is inescapable." is the one moment that makes you want to be there (frame 08).

**Motion.**
- The hero plays on both widths. The level clips play only on Play, and slides move 0.35 s.
- Nothing is janky. Outside the hero nothing moves, which is the calm brief.
- Reduced motion shows posters only, with no video attached (`reduced` run). With JS off the page stacks cleanly (`sheet-nojs-1.jpg`).

**Booking (`calm/bk-row1.jpg`, `bk-row2.jpg`, `book-phone.json`).**
- The path was hero → `/book/` → Level 2 → Next → Twin → Next → Sat 7 Nov → +1 man → Continue booking, which is **8 taps**, at the audit's limit of 8.
- The hand-off was `…/en/product/level-2-rollers?start=2026-11-07&end=2026-11-14&female=1&male=1&couple=0`.
- The level and the price are clear before the tap.
- The page reads as a utility form: grey padded cards with small thumbnails. It does not feel like the bright page the visitor came from.
- The Saturday chips are just the next 12 Saturdays and include all of November. In the engine snapshot the other two pages use, November has no departures. A visitor can pick a week that does not exist.

**Laptop (`calm/sheet-laptop-1.jpg`).**
- The hero is the group walking soft-tops up the beach (`laptop-cold-3000ms.jpg`), and the button sits on a walking guest.
- The levels row stills are about 380 px wide.
- The rooms are three big slideshows, one after another. Clean, but long.

**Against the current site.** It is better on the first screen, on price, on rooms and on booking. The current site is better in one way: its editorial rhythm (overlapping photos, varied section shapes). Calm sets everything in a centred column and gets monotonous after the levels.

**Score: 7/10. Fail** (below 8). **Better than the current site: yes.** **Taps to book: 8.**

**Fix list, biggest effect first.**
1. Break the six-screen rooms run. Use one room viewer (a slideshow plus name pills, or a swipe row with peek), or make the second and third rooms shorter, so the middle of the page stops repeating.
2. Make `/book/` look like the home page. Use bigger level and room images and fewer grey boxes, and show the running total pinned at the foot on the phone, the way the unique drawer does.
3. Saturday chips: show only the departures in the engine snapshot, with the date of the snapshot, or label them "check availability". Never offer weeks the engine does not run.
4. Phone hero cut: drop or reframe the shot that crops heads off (6 s frame), and keep the mint-board woman as the anchor.
5. Cut the lodge copy and the amenities paragraph on phones to a few lines plus icon chips, and do not repeat the quote under the sunset band.

**Keep:** the poster frame and the title, the 3 s video start, the prices on the level cards, the full-bleed pool with the feature line, the white page with one crimson booking colour.

## interactive: "The ride"

**Timeline on the phone (`interactive/sheet-phone-cold.jpg`).**
- From 0.5 s to 3 s the poster is a close crop of a dark tuk-tuk body with a passenger's leg and the boards on the roof. It is soft (upscaled) and muddy, and "Surf weeks in Sri Lanka" sits on dark, busy texture.
- The video starts between 3 s and 6 s (`ride-p810.webm` at t=2.17 at 6 s).
- The first impression is the weakest of the three. It does not say "lodge" or "sea" until the reef and pool shots, 3–5 s into the loop.
- One scroll down, the bottom of the hero is a near-black frame of the loop (`pick-a.jpg`, left).

**The walk on the phone (`sheet-phone-1.jpg`).**
- The level reel is one large card with arrows and dots. Only the centred card plays, so `level-1.webm` plays and the others wait (walk frames 1–3).
- The "Compare levels" toggle works.
- The pool wipe is the best interactive moment of the run: from the palm seen from above to the same pool from the garden (frames 7–8).
- Attention drops on the amenities. They are 18 bordered tiles in two columns (frames 9–10), which reads as a settings screen.
- The quote cards are white with shadows. The closing white text on the toast photograph is legible (`pick-a.jpg`, right).

**Laptop (`laptop-walk-02.jpg`).** This is where the page is at its best. The three-card reel, with Level 2 large and playing and its price on the clip, is engaging and clear. So are the dinner-toast closing and the room mosaics.

**Booking (`interactive/bk-sheet-a.jpg`, `bk-row2.jpg`).**
- The path was hero → `/book/` → Level 2 tile (auto-advances) → Twin tile (auto-advances) → Sat 19 Dec → +1 man → Next → Continue booking, which is **7 taps**.
- The hand-off was `…/level-2-rollers?start=2026-12-19&male=1&end=2026-12-26`.
- The ticket on the last screen, with the tuk-tuk photograph and the line-by-line total, is the most enjoyable booking moment of the three.
- Until a date is chosen the footer says "Total for 1 guest —" while all the steppers are at 0. The price is known from step 1 ($1,466) but is not shown.
- Totals are printed to the cent: "$1,606.04".

**Motion, reduced motion and JS off.** The reel snaps and the wipe follows the finger, with no jank in the frames. Under reduced motion no video is attached. With JS off the reel is a row of posters and both pool photographs are stacked (`sheet-nojs-1.jpg`). The transparent header then overlaps body text on white sections (nojs frames 3, 9, 13).

**Against the current site.** It is better on price, levels, rooms and booking. The current site's first screen at least shows a sunset; this phone hero is a dark crop of a vehicle.

**Score: 7/10. Fail.** **Better than the current site: yes.** **Taps to book: 7.**

**Fix list.**
1. Phone hero: choose a poster and opening shot that read in sun, such as the tuk-tuk on the coast road in full view or the reef aerial, not the close crop of the tuk-tuk's side. Never let the loop sit on the near-black interior frame.
2. Replace the 18 bordered amenity tiles with a compact " | " line or bare icons with no boxes.
3. Booking footer: show "$1,466 pp" from the first step and keep the guest count consistent with the steppers. Round totals to whole dollars.
4. Phone level reel: show a peek of the next card so the swipe is discoverable without the arrows.
5. With JS off, give the header a solid ground on non-hero sections. Also add the 24 h staleness gate to the forecast headline: its 16 Oct numbers have no gate.

**Keep:** the laptop level reel, the pool wipe, the tile-per-question booking with the ticket, the toast closing, the tangerine button with white text.

## unique: "From the air" (scroll set-piece)

**Timeline on the phone (`unique/sheet-phone-cold.jpg`).**
- From 0.5 s to 3 s the poster is the best first frame of the run: the lodge's white roofs and long blue pool in the palms, the road below, "Your surf week starts here" in Literata and a pool-blue button.
- The video is slower to start. It is ready only at about 6 s (t=0.97 at 6 s), because the phone file finishes downloading later than calm's.
- At 6 s the drone has risen to the sea. You know at once that it is a place by the ocean.
- On the laptop at 3 s the frame looks inland at the road, a truck and a lagoon (`laptop-cold-3000ms.jpg`). It is less "surf" than the phone poster.

**The set-piece.**
- **Laptop (`sheet-drop-laptop.jpg`, `drop-laptop-fast-05.jpg`).** The descent reads as one continuous move: road and roofs, the pool, then the palm in the water. It then dives into the blue, arrives at the water's edge and shows "Footwear is discouraged. Chilling out is inescapable." This is the most memorable moment in either Global Surf run, and it explains the place in four seconds of scrolling.
  - Mid-zoom, img-062 is visibly soft.
  - At the hand-off a feathered rectangle of img-026 is visible over img-062 for one step (frame 05).
- **Phone, fast network (`sheet-drop-phone.jpg`).** The same story plays in a 4:5 window between the script title and the bottom bar. That is about 60 % of the screen, so it is less immersive but still continuous.
- **Phone, slow 4G: a real failure.**
  - On the walk, GSAP (from jsdelivr) and the plates had not arrived when the visitor reached the drop, so they scrolled past the static version.
  - When it booted, at walk frame 16, the page grew from 12,666 px to 14,886 px. The visitor, who was at the waves band, was thrown back 2,220 px to the lodge amenities and saw the rooms a second time (`unique/jump-15-17.jpg`, `walk.json` heights).
  - Measured separately, the drop took **9.5 s** to boot from 900 px above it on the slow profile, against 1.5 s on a fast one (`drop.json`).

**The walk on the phone (`sheet-phone-1.jpg`).**
- The levels are three full-width blocks, each with its clip, price and button (frames 2–5). Only the clip in view plays.
- The room viewer uses the names as tabs, which is clear.
- The forecast headline says **"South Point, Tue 29 Sep, 20:30"**: 0.6–0.9 m, 12 s, 8 km/h. The numbers are hard-coded in the HTML and nothing hides them when they are old. Beside them Rosa's live widget shows today, 0.4–0.8 m. A traveller sees two conflicting forecasts, one 17 days old and presented as current. Only calm hides a stale headline (`stale()` > 24 h, calm `dist/index.html:530`). Interactive's headline is from 16 Oct, so it is fresh today, but it has no gate and will go stale the same way. The same block appears in `sheet-nojs-1.jpg`.
- The closing shows the dusk pool with the line and the buttons under it, on white.

**Booking (`unique/bk-row.jpg`).**
- The path was hero → drawer opens → Level 2 → Twin → Saturday (native select) → +1 man → Continue booking. That is **6 taps**, or 7 counting the select's own picker.
- The hand-off was `…/level-2-rollers?start=2026-12-19&end=2026-12-26&female=1&male=1&couple=0`.
- The live total is docked at the foot from the first tap: "$1,466 → $1,606.04 → $3,212.08, Total for 2 guests". This is the most trustworthy flow of the three, because the price is always visible.
- The docked block plus the clip band take about 40 % of the phone screen, so the choices scroll in a narrow middle strip. The room thumbnails are small.

**Reduced motion and JS off.** Under reduced motion the drop is the static two-up plus img-005 with the feature line, and no video is attached. With JS off the page is the same static composition, and the level clips show native controls at 0:00 (`sheet-nojs-1.jpg`).

**Against the current site.** It is better at a glance and on the whole page: the lodge itself from the air, prices one scroll down, rooms sold, a booking flow that keeps the package. The current site's editorial overlaps are matched here by the asymmetric level grid on the laptop.

**Score: 7/10. Fail.** On the laptop or a fast phone this page is an 8–9 and the clear experience winner. It fails this round on the phone profile the playbook says to assume, which leaves two defects:
- the set-piece boots late and yanks the visitor 2,220 px;
- the forecast headline is weeks old and contradicts the widget beside it.

Both are small to fix. **Better than the current site: yes.** **Taps to book: 6.**

**Fix list.**
1. The drop on slow connections:
   - Start loading GSAP and the phone plates much earlier, for example at the first scroll after first paint or when the levels section is in view, instead of 800 px before the drop.
   - **Never insert the pin while the visitor is past it.** If it is not ready by the time its top reaches the viewport, keep the static tier for that page view.
   - Vendor GSAP (designer 0.5.0 already plans this for 4g).
2. Forecast: apply the 24 h rule as calm does. Hide or refresh the drawn headline when the data is old, and never show numbers that contradict the widget next to it.
3. Phone hand-off seam (frame 05): feather or cross-fade img-026 so no rectangle edge shows, and shorten the stretch where img-062 is zoomed past native.
4. Phone drawer: make the docked total a single line (total plus button) and move the price note into the flow, so the choices get the screen.
5. Laptop hero: start the loop on the frame with the sea and the pool (the phone poster's framing), not the inland road with the truck.

**Keep:** the aerial poster, the drop and its three plates, the pool-blue booking colour, the drawer with the live docked total, the asymmetric laptop level grid, Literata with Parisienne.

## Experience ranking (4f)

1. **unique.** The only page that makes you want to be there and understand the place in one gesture. Its two failures (the late boot and jump on slow 4G, the stale forecast) are mechanical and fixable in one round.
2. **interactive.** It has the most engaging middle (reel, wipe, ticket), but the weakest first screen on a phone.
3. **calm.** The best phone first screen, but it is forgettable after the levels, and its booking page reads as a form.

None passes this round. All three beat the current site clearly. The one sentence for the human: **unique's sky-to-pool drop is the experience to sell, once it stops jumping on slow phones.**

## What the designer prompt got wrong

The set-piece rules cover reduced motion, JS off and weak devices. They do not cover **the visitor who arrives before the library does**. A pinned section that boots late changes the page's height above the reader. The rule should be: load early, and if the pin is not live when its top reaches the viewport, stay static for that view. Separately, a hard-coded forecast headline needs the same 24 h staleness gate in every variant. Only calm has one. Unique already shows 29 Sep numbers, and interactive will show stale numbers after 17 Oct.

---

# Round 2 (4f, after the 4e rework of commit 23f7563)

experience-critic 0.1.0 · 2026-10-17 (UTC). Pages served over http by `tools/_serve.mjs` (calm :9731, interactive :9732, unique :9733; separate ports for the booking, drop and forecast probes). The visual critic's and the critic's reports were not read.

Frames are in `reports/2026-10-globalsurf-03/experience/global-surf-adventures-v2/<page>/r2/`:
- `walk-all.json`: every frame's scroll position, page height, height jumps, videos in view (src, time, paused, readyState), fixed elements, headings in view, horizontal overflow, and the hosts contacted per run.
- `phone-cold-{500,1500,3000,6000}ms.jpg` + `sheet-phone-cold.jpg`: 390×844, touch, DPR 2, 1.6 Mbps, 150 ms RTT, 4× CPU.
- `phone-walk-NN` / `laptop-walk-NN` (1440×900) / `reduced-walk-NN` / `nojs-walk-NN`: about 0.3 viewport every 0.4 s, a frame every 0.6 viewport; sheets `sheet-{phone,laptop,reduced,nojs}.jpg`.
- `book-NN.jpg`, `sheet-book.jpg`, `book.json`: the booking tap-through at 390 from the hero button. Engine and wa.me requests were intercepted and aborted; nothing was booked.
- `unique/r2/drop-{laptop,phonefast,phoneslow}-NN.jpg`, `sheet-drop-*.jpg`, `drop.json`: the set-piece scrubbed in 17 steps. On `phoneslow` (≈1.6 Mbps, 4× CPU) the visitor reads the hero for 3 s and wheels down at a human pace, as a real reader would.
- `<page>/r2/forecast-stale.jpg`: each page with the clock set to 20 Oct 2026 and every rosa request blocked, to test the 24 h gate.

**The current site** has not changed since round 1, so the walk in round 1 still stands (`reports/2026-10-globalsurf-03/current-site/shots/mobile-sheet.png` confirms it). The lodge page opens on a dark sunset palm under a breadcrumb, a salmon all-caps button and the Messenger bubble. It shows no price anywhere, the rooms are a Kuula 360° box, and the level tiles lose the package on the way to the engine. Its strengths are the handwritten titles, the Instagram block and its distinct sections.

## calm: round 2

**Round-1 fixes, re-checked.**
1. **Rooms run.** Fixed. There is one room viewer with three name tabs (`phone-walk-12/13`), and on the laptop the slideshow is flush left with the text beside it (`sheet-laptop.jpg` row 2). The middle of the page no longer repeats itself.
2. **`/book/` looks like the home page.** Fixed. It has a pool band with the script title, large level cards (4:5) and room cards (3:2) in swipe rows with a peek, and a pinned "Total $1,466 for 1 guest | Continue booking" from the first screen (`sheet-book.jpg`). It now feels like the same site.
3. **Saturday chips.** Fixed. They are the engine's 13 Saturdays, with no November, and are labelled "Dates from the booking engine, 29 Sep 2026; the next page shows what is free today" (`book-05.jpg`).
4. **Phone hero cut.** Fixed. The poster and opening shot are the drone over the whitewater with beginners waiting (`sheet-phone-cold.jpg`, 0.5–3 s). The title sits on water. The mint-board woman follows at 6 s, head in frame. The video plays at 3.0 s (`hero-m608.webm`, t=0.13), still the fastest start of the three.
5. **Lodge copy and the quote.** Fixed. "Read more" holds the second paragraph, the amenities are a two-row swipe of chips (`phone-walk-10`), and the quote appears once, under the photograph (`phone-walk-16/17`).

**Timeline and walk.** One scroll down, the visitor sees the script "Choose your level", the " | " detail line ("12 rooms | Saturday check-in | ISA-certified surf guides"), then the level cards with "From $1,466 pp | 7 nights". The 8.6 score card follows. The story is told with photographs, not tables. Attention still dips on "What's included", which is about 1.5 screens of icon list (`phone-walk-05/06`). The pool full-bleed with the feature line remains the moment that makes you want to go. On the laptop the page now has real rhythm: split headers, a flush-left room slideshow, the dinner block mirrored and an Instagram row of six (`sheet-laptop.jpg`).

**Booking.** The path is hero → `/book/` → Level 2 → Next → Twin → Next → Sat 19 Dec → +1 man → Continue booking. That is **8 taps**, the same as round 1 and at the audit's limit. The hand-off was `…/level-2-rollers?start=2026-12-19&end=2026-12-26&female=1&male=1&couple=0`. The total was visible at every step ($1,466 → $1,606 → $3,212 for 2 guests), in whole dollars.

**Motion, reduced motion, JS off.**
- **Reduced motion:** posters only, with no video attached (`sheet-reduced.jpg`).
- **JS off, two defects (`sheet-nojs.jpg`):**
  - The header stays `fixed` and transparent with white type. On every white section it becomes a ghost "GLOBALSURF" and menu icon printed over body text (nojs frames 02, 05, 06, 08–14). Interactive had the same defect in round 1 and fixed it. Calm has it now.
  - The forecast headline prints the hard-coded "0.4–0.6 m · South Point, knee-high | Fri 16 Oct, 20:30" (nojs frame 16). Its 24 h gate is JavaScript, so with JS off the numbers are shown as current forever. The playbook (§4, Rosa) says that without JS the block shows the plain link, never stale numbers. With JS on and the data aged 3 days, the gate works (`forecast-stale.jpg`: only the link and the card remain).

**Laptop.** The 0.5 s and 3 s frames are the drone over the water, clean. At 6 s the bright beach-and-sky frame (pop-up practice) leaves the white nav links almost invisible (`sheet-laptop-cold.jpg`, bottom right). This is minor, because the logo and the button stay legible.

**Against the current site.** It is better at a glance and on the whole page: bright water and real beginners against a dark palm, prices one scroll down against none, every room with 5–6 photographs against a 360° blur, and a booking page that keeps the package. The old site's editorial variety is now matched on the laptop. On the phone it is still the quietest of the three, which is its brief.

**Score: 8/10. Pass.** **Better than the current site: yes.** **Taps to book: 8.**

**Remaining fixes.**
1. JS off: give the header a solid ground (or `position:absolute` over the hero only) so it never prints over white sections.
2. JS off: render the forecast headline only from script, so the no-JS page shows the plain Rosa link, as unique and interactive do.
3. Shorten "What's included" on phones: two columns of icon lines, or the first six with "Show all".
4. Laptop hero: add a little halo to the nav links on the bright pop-up frame, or drop that shot from the desktop loop.
5. Booking: tapping a level card could open the room step itself, as interactive's tiles do, which saves two "Next" taps (8 → 6).

**Keep:** the drone poster with the title on water, the 3 s start, prices on the level cards, the pool feature line, the one room viewer, the new `/book/` with its pinned total, the engine Saturdays with their date, Birthstone over Figtree with crimson as the only accent.

## interactive: round 2

**Round-1 fixes, re-checked.**
1. **Phone hero.** Fixed. The poster and first frame are the bright reef aerial with surfers in the lineup and the coast behind (`sheet-phone-cold.jpg`, 0.5–3 s). "Surf weeks in Sri Lanka" reads on blue, and nothing is muddy. At 6 s the loop is on the pool and palm from above. On this profile the video starts between 3 s and 6 s (t=2.2 at 6 s). Because the poster is a good still, the wait costs nothing. No near-black frame appears on the phone walk.
2. **Amenities.** Fixed. They are a borderless icon list. On phones it is one column of 17 lines, about 1.5 screens (`phone-walk-08–10`). It is calmer than the boxes but long.
3. **Booking footer.** Fixed. It shows "Per person $1,466" from step 1, then "$1,606", then "Total for 1 guest $1,606" in whole dollars (`book.json` foot, `sheet-book.jpg`).
4. **Reel peek.** Fixed. The next card's edge shows at 390 (`phone-walk-02`).
5. **JS-off header, and the forecast gate.** Fixed. With JS off the header is solid on white sections and the forecast is the card plus the plain link (`sheet-nojs.jpg`). With JS on and data 3 days old, the headline is gone and only "See today's forecast for South Point on Rosa" remains (`forecast-stale.jpg`).

**Walk.**
- On the laptop the reel is the best "choose your level" of the run (`laptop-walk-02.jpg`): Level 2 large and playing, with its price on the clip, and Levels 1 and 3 flanking it.
- The compare table (`nojs` frames 04–05 show it open) answers "what's the difference" in one glance.
- The pool wipe still opens on the top-down palm and is the best touch moment.
- The rooms now sell: a 3:2 lead photograph, three thumbnails, "6 photos", the price line and "Choose this room" for each (`phone-walk-12–15`).
- The closing card overlapping the toast photograph is warm and clean.
- On the phone, attention dips at "What's included", which takes about 3 screens with the level switch and the bowl photographs (`phone-walk-04–06`), and again at the amenities list.

**Booking.** The path is hero → `/book/` → Level 2 → Twin → Sat 19 Dec (chip) → +1 man → Next → Continue booking. That is **7 taps**. The hand-off was `…/level-2-rollers?start=2026-12-19&male=1&end=2026-12-26`. The step pills, the script step titles and the ticket with the tuk-tuk photograph make this the most enjoyable booking of the three. The chips are the engine's Saturdays, grouped by month.

**Laptop hero (`sheet-laptop-cold.jpg`).** It opens on the reef (0.5 s) and moves to the pool (1.5 s). At 3 s there is a cross-fade with a ghosted tuk-tuk, and at 6 s the tuk-tuk's dark cab fills the frame behind the title. The title stays legible, but the last third of the loop is the least inviting footage.

**Against the current site.** Better at a glance on both widths now: sunlit reef and pool against a dark palm. It is also better on the whole page: prices, a compare table, sold rooms, a forecast, and a booking flow that keeps the package.

**Score: 8/10. Pass.** **Better than the current site: yes.** **Taps to book: 7.**

**Remaining fixes.**
1. Cut "What's included" plus the amenities on phones by about half: two columns of short icon lines, and fold the second half of the amenities behind "Show all 17".
2. Laptop loop: shorten the dark-cab tuk-tuk shot, or open the cab framing wider, so the loop ends in light.
3. On phones the level card is about 60 % of the width, with a lot of white around it (`phone-walk-02`). Make the centred card about 80 % wide, so the clip carries the screen.
4. The empty "Choose a Saturday" state could pre-select the next departure, as unique does, which saves a tap.
5. Keep the reef as the phone opening, but trim the loop to stay on light frames (reef → pool → the coast-road tuk-tuk in full view).

**Keep:** the reef poster, the laptop reel, the compare table, the pool wipe, the room cards with thumbnails, the tile-per-step booking with the ticket, the tangerine buttons with white text, Sacramento over Plus Jakarta Sans.

## unique: round 2

**Round-1 fixes, re-checked.**
1. **The drop on slow connections.** Fixed, and this was the blocker.
   - GSAP is gone, so there is no jsdelivr host on any run (`walk-all.json` hosts).
   - On the slow phone walk the page height held at 14,419 px for all 28 frames, with no jump (round 1: +2,220 px).
   - The drop was live (`html.drop-live`) and its plates were drawn when the reader reached them (`phone-walk-10–14`).
   - In the dedicated slow probe the reader reached the drop 11.8 s after load, read the hero for 3 s, and found it live with an unchanged height through all 17 steps (`drop.json`, `sheet-drop-phoneslow.jpg`).
2. **Forecast.** Fixed. Today it shows "South Point, Fri 16 Oct, 20:30" from a fresh fixture, in agreement with the widget beside it. With the clock 3 days ahead and Rosa blocked, it shows only the link and the card (`forecast-stale.jpg`). With JS off it shows the link and no numbers (`sheet-nojs.jpg`).
3. **The hand-off seam.** Fixed: no rectangle edge in any step (`sheet-drop-laptop.jpg`, `sheet-drop-phonefast.jpg`). Two softer moments remain:
   - One step at the switch from the zoomed lodge to the pool is a heavy blur (laptop step 06, phone step 04). It reads as a focus pull, not as blockiness, but for about 200 px of scroll the screen is out of focus.
   - The pool → bar hand-off still shows a brief double exposure, with the bar ghosted over the pool (laptop step 11, phone step 09).
4. **Phone drawer.** Fixed. The foot is one line, "Total for 1 guest $1,466 | Continue booking", and the clip band is thin (`sheet-book.jpg`). The choices get the screen.
5. **Laptop hero.** Fixed. The poster and first frame are the sea and reef over the lodge roofs (`sheet-laptop-cold.jpg`, 0.5 s). The road-and-truck shot still appears at 1.5 s, followed by a palm cross-fade at 3 s, but it no longer opens the page.

**Timeline on the phone.** From 0.5 s to 6 s the poster is open sea, the reef line, palms and the lodge's white roofs, with "Your surf week starts here" in Literata and the deep-blue button (`sheet-phone-cold.jpg`). It is still the best first frame of the run. On this profile the hero video is attached by 6 s but has not started (readyState 1, t=0, and still t=0 at the first scroll). On slow 4G the visitor sees only the poster, which is a good still. The level clips start as each card enters the screen (`walk-all.json`, frames 02–05).

**Walk.**
- One scroll down are "Choose your level", the one-line price sentence and the 8.6 proof, then three full-width level blocks with clips and prices.
- The drop is the moment you want to be there: from above the roofs to the pool, the palm, the water, and "Footwear is discouraged. Chilling out is inescapable." On phones it plays in a 4:5 stage with about 250 px of white above and below (`sheet-drop-phoneslow.jpg`), so it is less immersive than on the laptop but continuous and calm.
- The room tabs with the full-width gallery read as selling rooms.
- **One slow-network hole:** the waves band (`waves-img-099-m.webp`, 85 KB, lazy) was still blank when the reader reached it. That left about 700 px of plain white between the rooms and "The waves", with only a strip of the barrel painted (`phone-walk-18/19`). The space was reserved, so nothing shifted, but it reads as an empty page.

**Booking.** The path is hero → drawer → Level 2 → Twin → Saturday (select, pre-set to the next departure) → +1 man → Continue booking. That is **6 taps**, or 7 counting the select's own picker. The hand-off was `…/level-2-rollers?start=2027-01-23&end=2027-01-30&female=1&male=1&couple=0`. The live total is docked from the first tap. Two flaws remain:
- The totals and room supplements still print cents: "+$140.04 pp", "$1,606.04", "$3,212.08". Interactive and calm round to whole dollars.
- The room thumbnails in the drawer are small (about 56 px).

**Reduced motion and JS off.** Reduced motion shows the static two-up plus img-005 with the feature line, and no video (`sheet-reduced.jpg`). With JS off the static drop shows, the inline booking form has three "Continue booking: Level n" buttons, and the forecast is the link. The level clips still show native controls at 0:00 (`sheet-nojs.jpg`, frames 02–04).

**Against the current site.** It is clearly better, at a glance and on the whole page. It shows this lodge on this coast from the air, against a dark palm and a breadcrumb. Prices are one scroll down. Rooms are sold with real galleries. The booking flow keeps the package and shows the total from the first tap. The current site is better in nothing that matters to the traveller. Its handwritten titles are matched by Parisienne.

**Score: 9/10. Pass.** **Better than the current site: yes.** **Taps to book: 6.**

**Remaining fixes.**
1. Waves band on slow connections: give the lazy image a tinted ground or an inline low-quality placeholder (or start it loading when the rooms come into view), so the reader never meets 700 px of white.
2. Drawer: round the totals and supplements to whole dollars, as on the other two pages.
3. Drop: shorten the fully blurred step at the roof → pool switch, and end the pool → bar cross-fade before the bar is half visible.
4. Phone drop stage: let the 4:5 stage grow to the space between the header and the bottom bar (or go full-bleed), so the white bands above and below disappear.
5. JS off: drop `controls` from the level clips, or show the poster image instead.

**Keep:** the aerial poster with the title on the sea, the drop with no library and no jump, the lockstep pool hand-off, the deep-blue booking colour, the drawer with its docked one-line total and pre-set Saturday, the room tabs with the full-width gallery, Literata with Parisienne.

## Experience ranking (4f, round 2)

1. **unique (9).** It is the only page that explains the place in one gesture, and it now does so on a slow phone without moving the page. The booking is the fastest and most transparent.
2. **interactive (8).** It has the most engaging middle (reel, compare table, wipe, ticket) and now a sunlit first screen. It is long on phones in "What's included" and the amenities.
3. **calm (8).** It has the clearest first screen and a booking page that now belongs to the site. It is the quietest of the three, and with JS off its header and forecast break.

All three pass and all three beat the current site. The one sentence for the human: **unique sells the lodge from the air in four seconds of scrolling and books in six taps; interactive is the playful choice; calm is the clean one.**

## What the designer prompt got wrong (round 2)

1. The JS-off rules are applied per page rather than as one checklist. Calm kept a fixed transparent header and a forecast headline in the HTML, and interactive had fixed both after round 1. Two lines belong in the designer's 4e checks:
   - "With JS off, the header never sits over a white section in white type."
   - "A forecast headline is written by script only."
2. Lazy-loaded full-bleed bands need a tinted ground or a placeholder, because on the playbook's slow phone a blank reserved box reads as a broken page.
