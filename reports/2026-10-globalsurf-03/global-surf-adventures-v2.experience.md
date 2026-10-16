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
