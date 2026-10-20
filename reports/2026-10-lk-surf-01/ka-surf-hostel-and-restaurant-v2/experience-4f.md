# KA Surf Hostel v2 — experience-critic, station 4f (quick)

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20 · written without reading visual-critic or critic.

## How it was walked

- **Served over http** (`127.0.0.1:8791–8796`), not `file://`. Font CDNs (Google Fonts, Fontshare) were let through so the real faces render. Every other off-origin request was aborted and logged.
- **Phone:** 390×844, touch, iPhone UA, CDP 1.6 Mbps / 150 ms RTT, CPU ×4.
  - Six walks, **run one at a time**, so the frame counts are comparable.
  - Cold-load frames at 0.5 / 1.5 / 3 s.
  - A wheel scroll at human pace: 0.7 screen in 8 steps, then a 450 ms dwell, with a frame and the running animations at each stop.
  - A rAF frame-time recorder, plus CLS, LCP and long-task observers.
  - Then one scroll and a tap on the foot-bar "Check dates", with frames at 80 / 160 / 300 / 600 ms. The walk stopped at the OTA hand-off: no personal data, no external page opened.
- **Laptop:** 1440×900. The same walk, plus hover on the primary CTA (computed style at 60 and 400 ms) and a click.
- **Phone, reduced motion** and **phone, JavaScript off:** a top frame, a full-page frame, and counts of hidden text and broken images.
- **Interaction probes** (`probe.json`):
  - interactive: the story frame (auto-advance, tap-to-advance, chapter tap, off-screen behaviour);
  - unique: the shutter, the idle swaps, the frame-to-viewer transition, Esc and focus return;
  - calm: the sticky-print curtain;
  - all pages: press feedback.
- **Inspector:** tasteskill `inspect.mjs` at 1440 + 390 on all six pages. Each page's motion declarations were also grepped.
- **Evidence:** `reports/2026-10-lk-surf-01/experience/ka-surf-hostel-and-restaurant-v2/<round>-<variant>/walk.json` and `probe.json`. All frames and sheets were deleted after scoring.
- **Current site:** none (`dossier.existing_site.url: null`). KA lives only on Booking.com, Hostelworld, Agoda and Instagram. Per base.md hard constraint 2, the comparison is with the gold page. The gold page is the round-3 unique "Canopy" that Shahar picked (`agents/designer/gold/ka-surf-hostel.html`, also scored below as r3 unique), plus the OTA listings.
- **Funnel target:** no `dossier/*/audit.json`, so there is no `recommended`. Taps to book are judged against the earlier round.
- **Caveats:**
  - Headless Chromium with SwiftShader. A real mid-range Android will drop more frames than these counts show, so they are only good for comparing pages.
  - Rosa and the map were blocked, so only their fallbacks were seen. Both fallbacks work.
  - The `/design-motion-principles` HTML audit was not run. Its principles were applied to the measured evidence below.

## Measured, all six

| page | phone bytes, first load | phone LCP (throttled) | CLS | phone scroll frames >34 ms / max | laptop scroll frames >34 ms | CTA hover | press `:active` | inspector |
|---|---|---|---|---|---|---|---|---|
| v2 calm | 574 KB | **3.10 s** | 0.0001 | 0 / 17 ms | 0 | bg darkens over 160 ms | `.btn:active scale(.97)` (CSS) | 1 FAIL (focal-point), 4 WARN |
| v2 interactive | 699 KB | **3.58 s** | 0.0018 | 0 / 17 ms | 0 | bg darkens over 160 ms | scale(.97), measured on the foot bar | 2 FAIL (focal-point, covered-text "On Instagram" @390), 3 WARN |
| v2 unique | 853 KB | 1.60 s | 0.0009 | 0 / 17 ms | 0 | bg darkens over 160 ms; roll frames scale 1.035 | `.btn:active scale(.97)` (CSS) | 2 FAIL (focal-point, covered-text "Getting here" @390), 3 WARN |
| r3 calm | 516 KB | 2.88 s | 0.005 | 0 / 33 ms | 0 | — | none | 8 FAIL incl. **still-page (0 elements move)**, hairline ×8, outlined boxes ×9, 3-line headlines |
| r3 interactive | 588 KB | 3.19 s | **0.041** | 0 / 17 ms (one 83 ms idle long frame) | 0 | **none** (bg unchanged at 400 ms) | none | 5 FAIL incl. still-page (5 move), hairline ×8, 6-line quote headline |
| r3 unique (Canopy, gold) | 255 KB | **0.58 s** | 0.002 | 1 / 50 ms (one 100 ms idle frame) | 0 | none (text link) | none | 8 FAIL incl. still-page (7 move), hairline ×13, blank gaps ×3, covered-text h1 |

- **Fonts:** all six pages fetch them from Google Fonts or Fontshare on load (2–3 requests). That is acceptable in a mockup, but they must be self-hosted at build (playbook §4).
- **Reduced motion and JavaScript off:** all six pages, no broken images. In the v2 pages, no hidden text either. The r3 hidden-text counts are only the closed booking panel's contents (and Canopy's header name under reduced motion).
- **Booking links:** real links in every mode. Each "Check dates" is an `href` to Hostelworld, and the sheet is a progressive enhancement.
- **No video:** none of the six pages has one, because the dossier has none. The concepts flag the Instagram reel `DUDRxbRD153` as an unharvested gap (`concepts.md` §2). The rubric's video hard-fail does not apply.

---

## v2 calm — "Patio"

**Timeline (phone):**
- 0.5 s: header, then **an empty mint field** filling the top 45 % of the screen. Below it sit the h1 "Five minutes from Kabalana Beach", the tagline, a papaya "Check dates" (white on `#D23C06`) and "9.8/10 on Hostelworld | 66 reviews | Sep 2026".
- 1.5 s: the cottage print paints, but only half of it.
- 3 s: the print is whole. It is small: about 230 CSS px wide and 220 px tall, in a field 390 px wide and about 380 px tall.
- LCP 3.10 s, over the 2.5 s budget.

**The walk:**
- After one scroll I know what this is, where, and that it is family-run. There is no price, and the copy says so honestly.
- Then come the dorm print, "Dorms and private rooms" in Kalam, and a dot slideshow of four rooms.
- Then a bed list, five quotes, three rating cards, breakfast, and the amenities: 19 rows in three white boxes.
- Then the beach, Instagram, getting here, and the mint footer.
- On the phone it is one column of small prints and lists. Attention drops at the amenities (frames 12–14).
- **Laptop:** the signature works. The mint half holds one sticky print per section: `img-004` stays at top 234 px from scroll 900 to 2100, then the next print (`img-002`) slides up over it. It is calm and well judged. But it exists only at ≥ 1000 px, so the phone never sees it.

**Wanting to go:** the moments that work are the room slideshow (`img-007`, `img-001`) and the fruit plate. The empty mint at first paint and the long white amenity boxes deflate it.

**Booking:**
- 2 taps: foot bar "Check dates", then the sheet, then "Check dates on Hostelworld / Booking.com / Agoda".
- The sheet rises within 160 ms (transform 420 ms, drawer curve) and is fully in place by 300 ms, with no dropped frames.
- It lists the six bed and room types, an honest "Rates change with the dates…" line, Hostelworld as the one papaya primary, and the others as quiet rows.
- It is clear and trustworthy, but you choose nothing in it. It is a list and three links.

**Motion:**
- Section reveal: opacity 600 ms + transform 700 ms ease-out, IntersectionObserver.
- The sheet. Hover darkening over 160 ms, gated to fine pointers. `.btn:active` scale .97.
- The Instagram `igfade`, 27 s and run once.
- Everything is composite-only, with 0 long frames on the phone or the laptop.
- Restrained and correct, but on the phone almost nothing moves that you would notice.

**Score: 6/10. Fail.** Fine but forgettable on the phone. Clean, readable and honest, with papaya done right, but the first screen is a small picture in a large empty colour.

**Better than the current presence (Canopy/gold and the OTAs):** **yes.** KA's own photograph is on the first screen, it is white on papaya, there are no hairlines, the Instagram strip and the footer are designed, and the booking sheet is inside the page. Beside the Hostelworld listing it is far warmer.

**Better than the earlier round (r3 calm):** **yes, clearly.**
- r3 calm opens on a 3-line 52 px headline above a green band. It has 8 hairlines, 9 outlined boxes, underlined "check dates" links, and ink on watermelon.
- r3 calm has **zero motion**: inspector still-page with 0 elements moving, no hover, no press.
- v2 calm adds smooth, purposeful micro-interactions where r3 had none.

**Fix list:**
1. **Phone first screen:** draw the print at the concept's full phone cap (300 CSS px wide; now about 230 px, cropped short) and preload `img-006` at phone size behind a tiny mint-tinted placeholder. The field must never sit empty at 0.5 s, and LCP must come under 2.5 s.
2. **Give the phone its own version of the sticky-print curtain** (for example, a print that holds while its section's text scrolls past). The signature move currently exists only on the laptop.
3. Compress the amenities into " | "-separated groups, two columns on the phone. The three white boxes of 19 rows are the dead stretch of the page.
4. Let the booking sheet offer a choice (dorm or private, as in interactive), so the tap means something before the hand-off.
5. Lift the rating proof into the rooms section on the phone. The first screen's text block is tight under a short print.

**Keep:** the mint/papaya pairing (white on papaya), the laptop sticky-print curtain, the honest sheet copy, the Kalam section titles and the designed footer.

---

## v2 interactive — "Stories"

**Timeline (phone):**
- 0.5 s: the h1 "Five minutes / from Kabalana Beach", right-aligned, then **a large grey story frame** with five progress segments and a pause icon.
- 1.5 s: the cottages fill the top third of the frame. The rest is still grey.
- 3 s: the picture is still finishing.
- LCP **3.58 s**, the slowest of the six.
- The thin blurred "slivers" above and below the frame (the previous and next pictures) read as **loading skeleton bars** at this size.

**The walk:**
- Once loaded, the frame is the page's heart:
  - it auto-advances every 4 s, measured (`img-006` → `img-001`);
  - tapping its right half advances it, with a 300 ms crossfade done by 120 ms and 0 long frames;
  - five chapter circles ("The stay, Rooms, Breakfast, The beach, Evenings") switch the story. Tapping "Breakfast" **grows the circle into the frame** (frame at 80 ms), and the story restarts on the fruit plate.
- This is the one moment in the round that feels like flicking through a friend's trip. It is in the native format of every picture KA owns.
- Below it: "Dorms and private rooms" on a runner-blue field with two dot slideshows, a draggable quote rail with arrows, ratings, breakfast, three amenity columns with line icons, the beach with the Rosa headline (0.7–1.1 m), Instagram, getting here, and the blue footer.
- Attention drops in the amenity lists and in the empty white Rosa box (whose fallback did work).

**Wanting to go:** the story frame and the chapter-to-frame grow do it. The grey frame at first load, and the long text-and-list middle on blue, deflate it.

**Booking:**
- Foot bar "Check dates" (it appears once the hero is gone), then a sheet in which you **choose "A dorm bed / 3 dormitories" or "A private room / 3 room types"**, each with a thumbnail. The bed list swaps in with a 220 ms `bedsin`. Then "Check dates on Hostelworld" (primary) or Booking.com / Agoda.
- 2 taps, or 3 with the choice. This is the best booking moment of the six: the visitor understands what kind of bed they want before the hand-off, and the sheet is in the page's own blue and type.

**Motion:**
- The story: WAAPI progress, a 300 ms crossfade, and the chapter-circle grow.
- The sheet: 420 ms drawer curve.
- Press feedback: scale .97 measured on the foot bar, .95 on the chapters and .94 on the rail arrows. Hover darkening over 160 ms.
- 0 long frames on the phone in the scroll, the taps and the sheet.
- **Weakness:** the story keeps auto-advancing while off-screen. At scroll 3000 it was still moving, which is wasted work and battery.

**Score: 7/10. Fail (narrowly).** The most engaging page of the round and the best booking choice, but on a slow phone its first impression is a grey box for 1.5–3 s, and the middle of the page is lists.

**Better than the current presence:** **yes.** KA's own pictures are played as stories, not a grey thumbnail strip as on Hostelworld. Booking is in-page with a real choice, in white on blue.

**Better than the earlier round (r3 interactive):** **yes, clearly.**
- r3 interactive overlays **green slats** on every photograph, the kind of decorative overlay the calibration rejects. It shows a 158 px "9.8" in the hero, has no hover or press response, and CLS 0.041 from the slats.
- v2 replaces that with a story you control and adds real micro-interactions. It is smoother (CLS 0.0018 vs 0.041; 0 vs 1 idle long frame).

**Fix list:**
1. **First frame:** preload `img-006` at the phone size, with a blurred 1–2 KB placeholder painted in the HTML. The frame must never be grey at 0.5 s; target LCP ≤ 2.5 s throttled (now 3.58 s).
2. **Drop or restyle the slivers on the phone.** At that size they read as skeleton loaders, not as the previous and next pictures.
3. **Pause the story when it leaves the viewport and after the visitor's first tap** (WCAG 2.2.2, as unique already does for its swaps). Fix "On Instagram" sitting under the foot bar at 390 px (inspector covered-text) with bottom padding equal to the bar.
4. Compress the amenities into " | " groups and close the empty white Rosa box space (the widget's reserved box reads as blank when it fails).
5. Bring one quote (Mia's dengue line) up beside the rooms. The rail hides the strongest sentence behind a swipe.

**Keep:** the story frame and its chapter-circle grow, the dorm/private choice in the sheet, the press and hover tuning, the runner blue with white type, and the Gochi Hand titles.

---

## v2 unique — "The roll"

**Timeline (phone):**
- 0.5 s: "KA Surf Hostel", the h1 "Five minutes from Kabalana Beach", the tagline, a papaya "Check dates" and the proof line, then **blank page below**.
- 1.5 s: the **shutter** is mid-run. Two columns of frames are uncovering (garden, private room).
- 3 s: a two-column camera roll fills the lower half (cottages, room, fruit plate, bathroom).
- LCP 1.60 s, the best of the v2 set. All fonts landed in time.

**The walk:**
- The roll continues for about 1.5 screens of KA's own pictures. Then come:
  - rooms: a large 3:4 dot slideshow and the bed list;
  - staff: "9.9 / 9.9 / 24 hours" as big numbers, the night-table photograph, the quotes, the ratings;
  - breakfast; amenities (lists again); the beach on a cyan field with the Rosa headline; Instagram; getting here;
  - a footer of tiles, with "Check dates" as a papaya tile holding the three OTA buttons.
- After one scroll I know what, where and how it feels. It is told almost entirely through the pictures.

**Wanting to go:** on the laptop, immediately. The first screen is a full wall of KA's garden, rooms, plate, boards and evenings, with the name and the button in its middle. It is the strongest first screen of all six pages, and it beats Canopy at a glance. On the phone the roll is good once it appears. The empty half-screen at 0.5 s and the amenity lists deflate it.

**Booking:**
- 2 taps: "Check dates" (the cell, the slim header or the foot bar), then the sheet (it rises in 160–300 ms, same structure as calm), then the OTA.
- **The roll is also a way in.** Clicking any frame opens a viewer:
  - the frame **grows from its place in the roll into the dialog** (laptop frames at 60 → 160 ms);
  - the chapter's title and text fade in beside it, with a dot slideshow of that chapter and its own "Check dates";
  - 0 long frames; Esc closes it and focus returns to the roll;
  - on the phone the same viewer opens full-height in about 200 ms.
- This is the best micro-interaction of the round. A picture you were drawn to becomes the room's description and a booking button in one move.

**Motion:**
- The shutter: clip-path, 700 ms, 70 ms per column.
- Hover on roll frames: scale 1.035. Hover darkening on buttons over 160 ms. `.btn:active` .97.
- The viewer grow. Reveals.
- 0 long frames anywhere.
- **Bug:** the advertised "roll is alive" idle swaps **never fire at 1440×900.**
  - The roll shows 20 frames covering all 18 ids in `POOL`, so `free` is always empty.
  - 16 s of watching showed 0 overlays and 0 WAAPI animations.
  - After the shutter, the laptop roll is still.

**Score: 8/10. Pass.**
- The laptop is a clear 8+: the first screen, the shutter and the viewer.
- The phone is a 7: a blank lower half at 0.5 s, a two-column roll, the same list middle as its siblings.
- The booking path is the shortest that is still designed, and the viewer gives the pictures a job.

**Better than the current presence:** **yes, clearly.** A whole screen of KA's own pictures against Canopy's drawn leaves, white on papaya instead of ink on watermelon, and no hairlines. Against the OTA listings, it is everything their grey galleries are not.

**Better than the earlier round (r3 unique, Canopy):** **yes.**
- v2 wins on photographs (Canopy had none on the first screen).
- v2 wins on motion. Canopy's leaves part on scroll, and the inspector counts only 7 elements moving; it has one 50 ms scroll frame and a 100 ms idle frame, and no hover or press response.
- v2 also wins on colour and on booking.
- Canopy is better on raw speed (LCP 0.58 s vs 1.60 s, 255 KB vs 853 KB) and on the single bold phone idea at first paint.

**Fix list:**
1. **Make the idle swaps real.** Widen `POOL` beyond what the roll shows (repeat ids, or add `-019`/`-023`/`-024` crops), or let a swap reuse an id that is not adjacent. Otherwise remove the claim and keep the roll still.
2. **Phone first screen:** do not leave the lower half blank until the shutter. Paint the first two rows of the roll immediately and run the shutter only at ≥ 1000 px (or start it at 0 ms), so 0.5 s shows pictures, not paper.
3. Fix "Getting here" sitting 100 % under the foot bar at 390 px (inspector covered-text). Add bottom padding equal to the bar on the last sections.
4. Compress the amenities into " | " groups, as in the other two. It is the same dead stretch on every variant.
5. Add the dorm/private choice from interactive's sheet to this sheet. The viewer already knows which chapter you came from, so preselect it.

**Keep:** the laptop roll with the name cell, the shutter, the frame-to-viewer grow with its own "Check dates", the cyan beach field, the footer tiles, white on papaya, and LCP 1.6 s.

---

## Earlier round (r3, run 2026-09-ahangama-02), scored for comparison only

| page | score | one line |
|---|---|---|
| r3 calm | 5 | A 3-line headline above a green band and two prints. Lines and outlined boxes everywhere, underlined "check dates", ink on watermelon. Zero motion and no hover or press response. Booking is 2 taps through a `<details>` drop (280 ms). |
| r3 interactive | 6 | Big "9.8" plus green slats laid over every photograph (a decorative overlay; CLS 0.041). Quote set as a 6-line headline. No hover or press feedback. The sheet with rated OTA tiles is good. |
| r3 unique, Canopy (gold, picked) | 7 | The strongest single idea on the phone (drawn banana leaves parting, LCP 0.58 s), but no photograph of KA on the first screen, a 3-line 138 px headline, ink on watermelon, 13 hairlines and 3 blank gaps. |

## Experience ranking (4f)

1. **unique** (8, pass). The best first screen and the best micro-interaction (frame → viewer), with fast LCP.
2. **interactive** (7, fail narrowly). The most engaging mechanic and the best booking choice. Its slow, grey first load on a phone holds it back.
3. **calm** (6, fail). Clean and correct, but a small picture in empty colour and almost no felt motion on the phone.

## Final table

| variant | new score | earlier score | better than current site | better than earlier round |
|---|---|---|---|---|
| calm | 6 (fail) | 5 | n/a: no website. Yes vs the gold page and the OTA listings | **yes.** Photo on the first screen, smooth sheet/hover/press where r3 had no motion at all; the curtain works but is laptop-only |
| interactive | 7 (fail) | 6 | n/a: no website. Yes vs the gold page and the OTA listings | **yes, clearly.** Story frame with tap and chapter-grow instead of static green slats; press/hover where r3 had none; CLS 0.0018 vs 0.041 |
| unique | **8 (pass)** | 7 (gold) | n/a: no website. Yes vs the gold page and the OTA listings | **yes.** The photo wall plus shutter plus frame-to-viewer grow beat Canopy's scroll leaves on motion and micro-interaction; Canopy stays faster (0.58 s vs 1.60 s LCP) |

**Motion smoothness, all three v2 pages:** 0 frames over 34 ms on the throttled phone (scroll, taps, sheet, viewer) and on the laptop, CLS ≤ 0.002, and composite-only transitions. Every v2 page has tuned hover (160 ms), press (scale .94–.97) and drawer curves. None of the r3 pages has hover or press feedback at all.
