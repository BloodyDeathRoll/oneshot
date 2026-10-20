# Layday Surf Ahangama v2 — experience-critic, station 4f (quick)

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20 · written without reading visual-critic or critic.

## How it was walked

- Served over http (`127.0.0.1`), not `file://`. One Playwright walk per page (`walk.json` kept beside each page's frames under `reports/2026-10-lk-surf-01/experience/layday-surf-ahangama-v2/<round>-<variant>/`; the frames themselves were deleted after scoring).
- **Phone:** 390×844, touch, iPhone UA, CDP 1.6 Mbps / 150 ms RTT, CPU ×4. Cold-load frames at 0.5 / 1.5 / 3 s. Then a wheel scroll at human pace (0.7 screen in 8 steps, then a 450 ms dwell), with a frame and the list of running animations at each stop. A rAF frame-time recorder ran throughout, with CLS and long-task observers. Then the primary "Check dates" was tapped and frames were taken at 80 / 160 / 300 / 600 ms, stopping at the OTA hand-off. No personal data was entered and no external link was followed.
- **Phone, reduced motion** and **phone, JavaScript off:** top frame plus a full-page frame, with hidden-text and broken-image counts.
- **Laptop:** 1440×900, frames at 0.3 / 1 / 2.5 s, the same scroll walk, then hover on the primary CTA (computed style at 60 ms and 400 ms) and a click with frames at 100 / 250 / 600 ms.
- **Evidence tools:** tasteskill inspector (`inspect.mjs`, 1440 + 390) on all six pages, and a grep of every page's motion declarations (`transition`, `@keyframes`, scroll listeners, `:active`, hover gating).
- **Caveat:** the six phone walks ran in parallel, so the throttled-CPU frame counts are pessimistic and only good for comparing pages. The laptop walks are clean.
- **Current site:** none. `dossier.existing_site.url` is null: no website and no socials, only three OTA listings and a Google pin. Per the base.md hard constraint 2, the comparison is therefore with the gold page (`agents/designer/gold/layday-surf.html`, the round-3 unique "Inside" that Shahar picked) and with the OTA listings.
- **Funnel target:** none. Neither `dossier/` holds an `audit.json` with `recommended`, so taps to book are judged against the earlier round.
- **Not done:** the `/design-motion-principles` HTML audit. Its principles were applied to the measured evidence below instead.

## Measured, all six

| page | phone first-load bytes (no scroll) | LCP (throttled) | CLS | phone frames >34 ms / max | laptop frames >34 ms | hover feedback on CTA | inspector |
|---|---|---|---|---|---|---|---|
| v2 calm | 789 KB | 1.28 s | 0 | 5 / 150 ms | 0 | bg darkens over 160 ms, press `scale(.97)`, hover gated to fine pointers | 1 FAIL (covered-text under the foot bar), 5 WARN |
| v2 interactive | 427 KB | 0.64 s | 0.0007 | 7 / 117 ms | 0 | same | 1 FAIL (covered-text: "Guests", "Practicalities"), 5 WARN incl. name-only-title, long-pin |
| v2 unique | 700 KB | **2.40 s** | 0.0001 | 2 / 117 ms | 0 | same | 1 FAIL (covered-text "Practicalities"), 2 WARN |
| r3 calm | 195 KB | 0.61 s | 0.0009 | 0 / 17 ms | 0 | **none** (bg unchanged at 400 ms) | 5 FAIL incl. **still-page (0 elements move)**, hairline ×9, eyebrows, 3-line headlines |
| r3 interactive | 435 KB | 1.58 s | 0.0018 | 1 / 83 ms | 0 | **none** | 5 FAIL incl. hairline ×30, covered-text |
| r3 unique (gold) | 336 KB | 0.56 s | 0.0007 | 2 / 117 ms | 0 | bg darkens instantly (no transition) | 6 FAIL incl. still-page (2 move), hairline ×32, covered-text |

All six pages, with reduced motion and with JavaScript off: no hidden text and no broken images. The booking links are real links in both modes.

---

## v2 calm — "Samples"

**Timeline (phone):**
- **0.5 s:** header, h1 "A two-minute walk from Kabalana", tagline, 10/10 line, a grey "Call" pill, and below them **flat yellow rectangles**. The photo tiles have not arrived, so the first thing a traveller sees under the words looks like empty placeholders.
- **0.5 s → 1.5 s:** the fallback face visibly swaps to Pilcrow Rounded (letter shapes change), although CLS stays 0.
- **1.5 s / 3 s:** the berth, basin and cane-locker tiles fill in beside the plaster swatches.
- The red foot bar ("Check dates" / "Call") is present from 0.5 s.

**The walk:**
- After one scroll I know what it is and where, and that it is small and new. I do not know what it costs (no rates exist; the copy says so).
- The story is told through small tiles and a lot of type. Sections are white and grey with lists ("Practicalities", 19 amenities), and two beach photographs come late ("The wave").
- The specimen idea (a swatch beside each material) reads on the laptop. On the phone the swatches read as blank colour blocks.
- The laptop first screen keeps the left half empty above a small CTA pair, with the mosaic on the right.
- The footer wordmark, set in coloured bars, reads as a bar chart.

**Wanting to go:** the moment that works is the room gallery with dots (`img-012`, `img-005`). What deflates it: the long grey practicalities and amenities lists, and the circular yellow medallion around a berth photo ("Newly built"), which feels like a decoration.

**Booking:**
- Taps: tap the foot-bar "Check dates", optionally choose an arrival date and nights, then tap "Check dates on Booking.com / Hostelworld / Agoda". That is 2 taps (3 with a date).
- On the phone the tap starts a **JS smooth scroll of ~8,100 px**. The 80–300 ms frames show the whole page racing past, a long ride to a section at the foot.
- The panel is honest ("Rates change with the dates… Booking.com opens with your dates"), but the native `mm/dd/yyyy` field and the three red OTA buttons stacked identically make the choice feel like a form, not a stay.

**Motion:**
- One reveal (opacity + transform, 560 ms ease-out, IntersectionObserver, fires once).
- A 1600 ms specimen crossfade.
- A thumbnail marquee (`drift`, 80 s linear infinite), paused off-screen.
- Press `scale(.92–.97)`, hover gated to fine pointers. Everything stays on composite-only properties.
- Smooth on the laptop (0 frames >34 ms). On the throttled phone, 5 frames over 34 ms, worst 150 ms, during reveals.
- The marquee is the only continuous motion, and it is a strip of tiny thumbnails nobody will look at. Purposeful motion is otherwise thin.
- Reduced motion: identical page, still good.

**Score: 6/10. Fail** (below 8). The photographs lead the first screen and the craft is clean, but it is forgettable. On the phone it opens on blank yellow blocks and asks the visitor to read.

**Better than the current site:** no site. Beside the OTA listings: yes (dated ratings, room gallery, directions).

**Better than the earlier round (r3 calm "Berth"):** **yes.**
- r3 calm had no photograph on its first screen, zero motion (inspector still-page) and no hover response.
- It also had violet booking on hairline-ruled boxes.
- v2 is smoother and has real press and hover feedback, so it wins clearly on micro-interactions.

**Fix list:**
1. Phone first screen: lead with one large berth photograph (`img-002` at native 576 px) instead of a 2×2 mosaic with blank swatches. Paint the tiles' average colour or a blur-up so nothing reads as empty at 0.5 s.
2. Put "Check dates" (red) in the hero itself; the grey "Call" pill should not be the hero's only action.
3. Replace the 8,000 px smooth scroll with a bottom sheet (as interactive does), or jump without animation.
4. Fold practicalities and amenities into a compact " | " list or an accordion, and give "The wave" its photographs at full column width earlier.
5. Drop the yellow medallion and the bar-chart footer wordmark. Fill the empty left half of the laptop hero.

**Keep:** the room gallery with dots, the dated ratings, the "Finding the door" card with "Open in Google Maps", the press and hover craft, and CLS 0.

---

## v2 interactive — "One room"

**Timeline (phone):**
- At 0.5 s the whole first screen is already there: berth yellow ground, "Just one dorm" set large in two lines, the one-line "where", a large berth portrait (`img-002`), and the raspberry "Check dates" foot bar. LCP 0.64 s.
- Nothing changes at 1.5 s or 3 s, which is right: the media is in place early.

**The walk:**
- The first scroll is the best moment of the round. The pinned title stays while the portraits pass under it and the ground shifts from pale yellow to berth yellow (frames 0–4). It feels like walking down the one room, and it says the one thing only Layday can say.
- Then come script section titles (Yellowtail: "The place", "Finding the door", "Guests", "The wave"), matching custom.md's readable face plus a handwritten title face.
- The rest of the walk: a live map at the door section, guest quotes beside prints, ratings set large, Rosa's headline beside Rosa's widget, two beach frames, and a visit card over the room photograph.
- After one scroll I know what it is, where, and why this place. Cost is a gap.
- Attention drops at "Practicalities": a long single-column amenity list on white over two phone screens.

**Wanting to go:** yes, at the pinned run and the room gallery. What deflates it: the release of the pin repeats the title, sentence and button on white (frame 5), so for a moment it feels like the page started again. The name-only h1 (inspector WARN) is carried by the sentence directly under it.

**Booking:**
- Taps: tap "Check dates", then a sheet rises from the button (origin-aware, 320 ms drawer curve, rows staggered 40 ms; at 80 ms the OTA buttons are still pale, and by 300 ms everything is settled). Choose a date and nights, then tap an OTA. That is 2 taps (3 with a date).
- It stays in the page's colours and type (script "Check dates" title, raspberry buttons, white text), so it feels like part of the site, not detached.
- On the laptop the same panel opens as a centred dialog over a dimmed hero, smooth (0 frames >34 ms).
- Weak spots: the native date field, and three identical OTA buttons with no hint of which to pick.

**Motion:**
- Scroll-driven pin with a ground crossfade (rAF and passive scroll listeners, transform and opacity only).
- One reveal (560 ms).
- Sheet: `up` 320 ms in, 180 ms out. Exit faster than entry, which is right.
- Menu 160 ms.
- Press scale, hover gated.
- The most motion of the six. On the throttled phone, 7 frames over 34 ms (worst 117 ms) during the pinned run. Laptop: 0 frames over 34 ms, max 33 ms.
- Purposeful: the motion is the story, not decoration.
- Reduced motion: the pin collapses into a stacked page with the sentence and button under the title, still good. JavaScript off: anchors work, page 12,280 px.

**Score: 8/10. Pass** (experience). Engaging, the room carries the page, and booking is two taps in a sheet that belongs to the site.

**Better than the current site:** no site. Beside the OTA listings and the gold page: yes.

**Better than the earlier round (r3 interactive "Curtain"):** **yes, clearly.**
- r3 hid its one print behind ink curtain lines, put violet on lilac, and showed 30 hairlines.
- Its hover gave no feedback and its "Check dates" jumped straight out to Hostelworld.
- v2's pinned run is smoother and more meaningful motion, and its sheet is a real micro-interaction where r3 had none.

**Fix list:**
1. Release of the pin: do not repeat the title, sentence and button on white. End the run on the last portrait and go straight into "The place".
2. Phone hero: let the portrait run wider (to the gutter on both sides) so the photograph, not the yellow, is the first impression.
3. Practicalities: compact " | " amenity groups in two columns on the phone; the foot bar currently covers "Guests" and "Practicalities" (inspector covered-text). Add bottom padding equal to the bar.
4. In the sheet, name a default ("Booking.com opens with your dates") as the one primary button, with the other two OTAs secondary. Style the date field as a floating-label pill, not native `mm/dd/yyyy`.
5. Cut the 7 phone long frames in the pinned run: pre-decode the four portraits and avoid the ground-colour repaint (crossfade an overlay's opacity instead of `background-color`).

**Keep:** the pinned "Just one dorm" run, the script section titles, the origin-aware booking sheet, the map at the door, Rosa's two halves, and LCP 0.64 s.

---

## v2 unique — "Name in plaster"

**Timeline (phone):**
- 0.5 s: the berth photograph full width for the top half, a yellow field with the tagline in small serif, the word "Layday" set large in Boska, then a small light italic "A two-minute walk from Kabalana" on white. Raspberry foot bar.
- At 0.5 s the photograph is already painted, but LCP is **2.40 s**, at the edge of the 2.5 s budget: the late Boska face and the larger image weigh on it.

**The walk:**
- Laptop: the first screen is the strongest single image of the round. Three room prints edge to edge over a yellow plaster field with "Layday" as a monument.
- Phone: the hero holds. Below it the page becomes **thin serif body text** (Boska 400/500 at ~15 px) on white and on yellow. The long yellow guests field (frames 8–9) is a wall of small serif text and is hard to read at arm's length.
- After one scroll I know what and where, mostly through type.
- Beach frames, Rosa, practicalities and a large phone number follow, then a second giant "Layday" in the footer.

**Wanting to go:** the laptop hero and the beach pair do it. What deflates it on the phone: the dense yellow guests block and the light italic subheads, which read as faint.

**Booking:**
- Laptop: "Check dates" grows the yellow field in place (grid rows over 420 ms, then the controls stagger 50 ms; close in 280 ms). Booking happens inside the business's own colour, which is a lovely continuity transition.
- Phone: the foot bar "Check dates" leads to the same panel. My walk's first visible match was the panel's "Check dates on Booking.com" link, a real link to the listing.
- That is 2 taps (3 with a date). Same native date field and three equal OTA buttons.

**Motion:**
- Reveal 560 ms.
- Band drift (scroll-linked transform).
- Field opening on `grid-template-rows`: a layout property, accepted by the accordion exemption, and smooth on the laptop (0 frames >34 ms).
- Touch handlers on the gallery.
- The fewest phone long frames of the v2 set (2, worst 117 ms).
- Restrained and well-tuned, but the phone sees little of it: the field opening, the best micro-interaction here, is mostly a laptop moment.

**Score: 7/10. Fail** (below 8). The best first screen on the laptop, but the phone experience is a reading exercise in a thin serif, and LCP is at the budget edge.

**Better than the current site:** no site. Beside the OTA listings: yes.

**Better than the earlier round (r3 unique "Inside", the gold page):** **yes, narrowly.**
- v2 wins on what the gold notes left open: photography on the first screen, no hairlines, no empty screen after the hero, booking in the business colour instead of violet.
- v2 also wins on motion: the field opening is a real, smooth micro-interaction. r3's drawn berth flattening is a scroll transform the inspector counts as nearly still (2 elements), and its hover darkens instantly with no transition.
- r3 is better on readability (Urbanist) and on the strength of its one idea on the phone.

**Fix list:**
1. Body text: set paragraphs in General Sans (already loaded) at 17 px or larger, and keep Boska for the name and the statements only. This is the biggest phone fix.
2. Break the yellow guests field into the three ratings, one large quote, and a swipeable quote row. No walls of serif text.
3. Bring LCP under 2 s on a throttled phone: preload the hero image at the phone size, and subset Boska to the glyphs of "Layday" plus the statements.
4. Phone hero: put the one-line "what + where" in the yellow field under the name, set in the sans and readable. The faint italic line on white below it is too light.
5. Make the field opening the phone's moment as well: open it from the foot bar as a sheet that grows out of the yellow, with the same curve. Drop the second footer "Layday".

**Keep:** the three-print band plus the monument name on the laptop, booking inside the yellow field, Rosa's two halves, the large tap-to-call number, and CLS ~0.

---

## Earlier round (r3, run 2026-09-ahangama-02), scored for comparison only

| page | score | one line |
|---|---|---|
| r3 calm "Berth" | 5 | No photograph on the first screen (a yellow box with a violet button and ruled box). Zero motion and no hover response. Readable, but flat and dated. |
| r3 interactive "Curtain" | 6 | One print behind ink "curtain" lines. 30 hairlines, violet on lilac. "Check dates" goes straight to Hostelworld (1 tap, but no choice). |
| r3 unique "Inside" (gold) | 7 | The one idea on the phone's first screen: a drawn berth in the business's yellow. But the photographs come late, a near-empty screen follows the hero, violet booking, lines everywhere. |

## Experience ranking (4f)

1. **interactive** (8). The only page that pulls you through the room. Its booking sheet feels part of the site.
2. **unique** (7). The best laptop first screen, a weaker phone read.
3. **calm** (6). Clean but forgettable, and it opens on blank swatches on the phone.

## Final table

| variant | new score | earlier score | better than current site | better than earlier round |
|---|---|---|---|---|
| calm | 6 (fail) | 5 | n/a: no website. Yes vs OTA listings | yes. Photographs lead, real motion and press/hover feedback where r3 had none |
| interactive | **8 (pass)** | 6 | n/a: no website. Yes vs OTA listings and gold | yes, clearly. Pinned room run and origin-aware sheet vs static lines |
| unique | 7 (fail) | 7 (gold) | n/a: no website. Yes vs OTA listings | yes, narrowly. Photo-led, smooth in-place booking field. Worse body readability than the gold page |
