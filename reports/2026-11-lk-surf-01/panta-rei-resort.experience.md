# Panta Rei Resort, Kabalana: experience pre-score (station 4f, round 1)

experience-critic 0.2.0 · run `2026-11-lk-surf-01` · 2026-11-06 · mode quick · independent: neither `panta-rei-resort.md` nor `.visual.md` was read, and no mockup `notes.md` was opened before this verdict was written.

**How it was walked.** The pages were served over http (`node tools/serve-mockups.mjs`, ports 8923 calm, 8924 interactive, 8925 unique) and walked with Playwright:
- **Phone:** 390 × 844, touch, DPR 2, throttled through CDP (1.6 Mbps, 150 ms RTT, 4× CPU). Cold-load frames at 0.5, 1.5, 3, 6 and 10 s, then a 600 px scroll every 0.9 s.
- **Laptop:** 1440 × 900, unthrottled. Frames at 0.5, 1.5 and 3 s, then an 800 px scroll every 0.9 s.
- **Booking:** tapped through from the hero "Check dates" to the engine room page, on phone and laptop. No personal data was entered and nothing was held or booked.
- **Other checks:** reduced motion, JavaScript off, a hover sweep over every visible control at 1440, and the tasteskill inspector (`inspect.mjs`).
- **Current site:** https://www.pantareiresort.com/ walked the same way.

Frames are in `reports/2026-11-lk-surf-01/experience/panta-rei-resort/{calm,interactive,unique,current,engine}/`. Walk logs are `*/walk-all.log` and `*/phone-book.log`.

## The current site, walked first (the bar to beat)

- **First seconds, phone:** the logo, a salmon "CHECK AVAILABILITY" and "Best price when booking direct" sit over a still of the rattan lounge (`current/phone-cold-500ms.png` … `-10000ms.png`). Its hero film had **not started after 10 s** on the throttled phone: paused, readyState 3 (`current/walk-all.log`). On the laptop the lounge film plays from 0.5 s (`current/laptop-cold-500ms.png`). It is warm and inviting, and it is the one thing the current site does well.
- **Story:** "No Paradise Like Home, Panta Rei." and two paragraphs, then full-bleed tiles carrying one word each ("THIS IS US", "ROOMS", "RESTAURANT", "FITNESS") with outline buttons, then a Google Map embed (`current/phone-scroll-01…03.png`, `laptop-scroll-01…05.png`). The page never says what a room is, how big it is, or what is included. It ends after about 3 phone screens.
- **Booking:** the CTA's href is `https://pantareiresort.holidayfuture.com/` with `target=_blank`, so it opens the engine **home** in a new tab. From there it takes dates (2 picks), "Check Availability" and then a room: about 5 taps to a priced room.
- **Where it is better than the new pages:** its laptop hero moves at once, on footage of the lounge, which is the most human place in the resort. The one-tap jump to the engine is also direct, even if it lands on the engine home.

---

## 1 · calm — "Welcome to Panta Rei"

**Timeline (phone, throttled):**
- 0.5 s: the title "Panta Rei, Kabalana", a full-width coral "Check dates" at the thumb and "Menu" show on a flat olive ground, with no picture yet (`calm/phone-cold-500ms.png`).
- 1.5 s: the poster arrives, the top-down ring of red roofs around the pool (`-1500ms`).
- 6 s: the film plays (`vid-001-p608.mp4`, t 0.46 s; `-6000ms`).
- LCP was 920 ms. Text and the booking action are usable before any media.

**The walk:**
- **Hero:** this is their own place from the air: the pool with swimmers, the roofs, one title and one button. It pulls you in.
- **Welcome:** the owner's welcome is set large on a mint panel, with "No paradise like home." in the hand-drawn script, then the rattan lounge full-bleed (`calm/phone-scroll-01…02`). That is where you start to want to be there.
- **"Four ways to stay":** each room gets a 4–6 photo slideshow with dots, its size, beds and note, and "Book this room" / "Ask us" (`phone-scroll-03…06`). The rooms are sold properly, which the current site never does.
- **Middle:** after "The pool" (the swimmer photo under a white card), attention drops. Restaurant, the fitness week strip and price rows, the four massage rows, then 6 long reviews make about 7 phone screens of panels and text with one picture each (`phone-scroll-09…15`). Nothing moves after the hero: the inspector reports `still-page`, with 8 elements moving on load and scroll.
- **Close:** a closing aerial with "Booking direct gets you our best rate…", then a real footer with buttons (`phone-scroll-20…22`).
- **After one scroll** you know what it is, where it is and why: 16 bungalows around a pool in Kabalana. You do not know the cost; no price is published for rooms (a dossier gap, handled honestly with "Prices move with the dates").

**Taps to book (phone, `calm/phone-book.log`):**
- Hero "Check dates" (1) opens the drawer: four room tiles, arrival, departure, a guests stepper, "See prices on our booking page" and "Ask on WhatsApp first" (`calm/phone-book-2-after-hero-cta.png`).
- Choose the Suite (2), enter dates, then "See prices" (3). That lands on `…/listings/572798?start=2026-12-10&end=2026-12-14&numberOfGuests=2` (`phone-book-5-engine.png`).
- **3 taps** to the right room page. A room's own "Book this room" gets there in **1**. With no room chosen, "See prices" goes to the engine home.
- The audit target is `clicks_to_book` 2.
- **The engine ignores the dates.** The room page shows "Select Dates" and 1 guest (`engine/room-with-dates-desktop.png`). I tested three spellings of the parameters (`start/end`, `startDate/endDate`, `checkIn/checkOut`), and the calendar request is always `startingDate=<today>`. The traveller types the dates twice. The drawer itself is clear and trustworthy, and its fonts and colours stay consistent with the page.

**Motion:**
- 32 of the 70 visible controls change on hover, with lift and darken. The slideshow arrows and dots do not.
- The drawer slides up.
- There are no section entrances and no parallax at phone width. This matches the calm brief.
- Reduced motion shows the poster only, and the page is fine (`calm/phone-reduced-motion.png`).
- With JS off, every "Check dates" is a real link to the engine (`walk-all.log`).

**Score: 7 / 10. Fail** (below 8). The first screen and the rooms are good. The 7 screens after "The pool" read as a well-made template, panels and price rows, with nothing that makes you feel the place.

**Better than the current site: yes.** It tells the story, sells the rooms, and its booking choice is clearer. It loses only on the laptop's instantly moving lounge film.

**Fix list (biggest effect first):**
1. **Give the middle a pulse.** Restaurant, fitness and after-the-surf should each open on a full-bleed picture moment (img-003 breakfast, img-004 yoga, img-035 boards on the lawn) before the text. Fold the four massage rows and the three class prices into compact " | " lines. Today that run is about 7 phone screens of panels (`phone-scroll-09…15`).
2. **Don't ask for dates the engine throws away.** Either hand off with "Pick your dates on the next page", keeping room and guests and dropping the two date fields (one fewer screen in the drawer), or find the parameter the engine really reads and prove it with a frame showing the dates filled in.
3. **Use a hero cut that unique does not use.** Calm and unique open on the identical top-down pool-and-roof frame (`calm/phone-cold-1500ms.png` against `unique/phone-cold-500ms.png`). For calm, use vid-001 14–24 s (pool, swimmer) or vid-002, so the human sees two different first screens.
4. **Paint the poster at 0.5 s, not a flat olive block.** Preload it, or inline a tiny blurred version of it.
5. **One quiet entrance per section** (a 12–16 px rise and fade on the picture, once). The calm brief allows it, and the inspector's `still-page` shows the page currently stands still.

**Keep:** the aerial hero with one title and the full-width thumb CTA; the owner's welcome set large with the script line; the room slideshows with "Book this room" per room; the drawer's four photo tiles; the persistent "Check dates" + WhatsApp bar; the footer with real buttons.

---

## 2 · interactive — "Morning swim"

**Timeline (phone, throttled):**
- 0.5 s: the poster is already there, a drone shot along a palm beach with breaking surf, with "Panta Rei, Kabalana", a coral "Check dates" and a WhatsApp icon (`interactive/phone-cold-500ms.png`).
- 6 s: the film starts (`hero-m1280.webm`); by 10 s it plays (t 3.86 s).
- LCP was 1,140 ms.

**The walk:**
- **Hero:** it is beautiful footage, but it is **not the business**. It shows a beach lined with other buildings, with "Panta Rei, Kabalana" set over it (`phone-cold-10000ms.png`, `laptop-cold-*`). Panta Rei is 600 m inland around a pool, so a traveller reads the beachfront block as the hotel. Nothing of the resort is on screen for the whole 15 s loop. This is the first-screen problem of the round.
- **Welcome:** a lilac page with the owner's text, then a rounded 4:5 clip of the resort from the air (`phone-scroll-01…03`). This is the first time you see the place.
- **"Four ways to stay":** the ring aerial full-bleed, then a row of four tall photo cards with "Look inside" and next-card peek (`interactive/phone-rooms-row.png`). Tapping a card opens a drawer with that room preselected, a gallery with arrows and dots, its details and "See prices" (`phone-room-drawer.png`). This is the best room-choosing moment of the three.
- **The pool:** two overlapping prints.
- **Restaurant:** on a peach page, with Breakfast / Later on / Dinner tabs and a sliding pill (`phone-menu-tab-after.png`). The Dinner tab holds a single line, "A mix of traditional and modern Mediterranean dishes", which is thin.
- **Fitness:** a vertical clip of a mat class in a phone frame, plus tappable week chips.
- **Guests:** a carousel. Then "Getting here" with distance chips, "Good to know" as " | " lines, groups, and a closing aerial with "Check dates and book direct" and WhatsApp (`interactive-ph2`, `laptop-scroll-*`).
- **Overall:** it is the most alive page to use, with three moving clips and four real interactions, but it is the weakest at saying "this is the place" in the first seconds.

**Taps to book (`interactive/phone-book.log`):**
- From the hero: "Check dates" (1), then a room chip (2), then "See prices" (3) lands on `…/listings/572798?start=…&end=…&numberOfGuests=2`: **3 taps**.
- From a room card: card (1), then "See prices" (2): **2**.
- **The trap:** "Check dates" then "See prices" without choosing a room goes to the engine **home**, and the dates already typed are silently dropped (`go href https://pantareiresort.holidayfuture.com/` after the dates were filled). The drawer preselects nothing and leaves a large empty area under the fields on laptop (`interactive/laptop-book-2-after-hero-cta.png`).
- The same engine problem as calm: the dates are ignored on the room page.

**Motion:**
- 26 of 44 controls change on hover.
- The tabs (sliding pill), the week-day chips and the dots have no hover state, though they respond on tap.
- The room drawer slides up with a gallery.
- There are three video moments, plus overlapping prints.
- Reduced motion leaves poster frames only (`phone-reduced-motion*.png`).
- With JS off, the CTAs link to the engine.

**Score: 7 / 10. Fail** (below 8; the method-5 cap applies, because the first screen shows a beach that is not the business under the business's name).

**Better than the current site: yes.** It is far richer after the first screen, and the room chooser beats anything on the current site. Its first screen is less truthful than the current site's lounge.

**Fix list:**
1. **Hero: show the business, or stop naming the beach as it.** Use vid-004 110–118 s (aerial of the bungalows), or open on the beach cut and end the loop on the ring. Or keep the beach and set the concept's own line, "A short walk from the waves", with "Panta Rei, Kabalana" smaller beneath, so the beach reads as nearby, not as the hotel.
2. **Preselect a room in the hero drawer** (unique does: Double is checked). Never let "See prices" silently drop typed dates onto the engine home.
3. **Dates:** the same fix as calm. Drop the date fields and say "pick them on the next page", or prove the engine reads them.
4. **Give the Dinner and "Later on" tabs real content** (3–5 dishes each from the dossier menu), or merge the tabs. One line under a tab feels broken.
5. **Hover and focus states on the tabs, day chips and dots** (Shahar 2026-10-20: micro-animations on every interactive element). These were the only controls in the sweep that do not respond to hover.

**Keep:** the room cards with "Look inside" that open a gallery drawer with the room preselected; the sliding-pill menu tabs; the vertical fitness clip in its frame; the welcome clip; the distance chips in "Getting here"; the colour-blocked pages; the closing aerial with both actions.

---

## 3 · unique — the scroll-scrubbed film

**Timeline (phone, throttled):**
- 0.5 s: the canvas poster (the top-down ring, pool and swimmers), "Panta Rei", "Boutique resort · Kabalana, Ahangama", a centred "Check dates", a "Check dates" in the header and a "Scroll" cue (`unique/phone-cold-500ms.png`). It stays the same through 10 s, by design: frames load on the first interaction, or 4.5 s after load. LCP was 716 ms, the fastest of the three.
- **Slow phone, real flick-scroll** (`unique/phone-slowfilm-00…11.png`): for the first ~7 s of scrolling (y 350→1,750) the film stays frozen on the poster. Captions 1/3 and 2/3 pass over a still picture, and a **"0% … 17%" counter** sits beside the pill (`phone-slowfilm-00…05`). At about 10.8 s the film becomes ready and jumps straight to the pull-out over the coast (`-06`, `-07`).
- **On a fast connection** the scrub is smooth: the ring, the jungle, then the sea with "3 / 3 The waves of Kabalana, a short walk from the resort." (`phone-scroll-01…05`, `laptop-scroll-01…05`).
- On laptop, the pull-out frame showing the ring of red roofs inside the jungle with the sea behind it (`unique/laptop-scroll-03.png`) is the single best moment of the round. It answers "where, and how far from the sea" without a word.

**The walk:**
- **After the film:** "No paradise like home." is set very large, with the welcome beneath (`unique-ph1`, `laptop-scroll-05`).
- **Rooms:** big single photos with a slideshow and arrows, size, beds and "Book this room".
- **In-page booking card:** four room tiles, "See all dates on our booking page", WhatsApp and Call (`unique-ph2` frame 1).
- **Then:** the pool, after the surf, the restaurant, the fitness week strip, the guests carousel, getting here with "Good to know" as a list, groups, the closing vid-002 aerial playing, and the footer.
- **Pill:** the floating "Check dates" + WhatsApp pill shrinks to icons during the film and grows after it.
- **Length:** at 17,500 px on phone it is long. The film alone pins for ~3,900 px, about 4.6 screens.
- **Structure:** after the film the structure and pictures are the same as calm's, so the "unique" lives only in the first 5 screens.

**Taps to book (`unique/phone-book.log`):**
- Hero "Check dates" (1) opens the drawer with **Double Room already selected**. "See prices" (2) reaches the Double room page: **2 taps**, which meets the audit target.
- For the Suite it is 3 taps. "Book this room" or the in-page booking card is **1**.
- On the phone the drawer's date fields sit below the drawer's first screen. The CTA is pinned at the drawer's foot, so it is still reachable (`unique/phone-book-2-after-hero-cta.png`).
- The same engine problem: the dates are dropped on the room page.

**Motion:**
- The film is the main item from the business's media, as method 5 requires.
- 35 of 49 controls change on hover, the most of the three.
- The pill morphs between icons and labels.
- Under reduced motion the scrub is replaced by stills with captions (`unique/phone-reduced-motion-2.png`).
- With JS off, "Check dates" points to `#book`, the in-page booking card whose links are real engine links.
- The inspector's `covered-text`, `pinned-over-picture` and `long-pin` findings are the film itself, not defects (tools.md).
- Its `headline-lines` finding is real: caption 2/3 is 25 words and runs 6 lines at 390 px (`unique-ph1` frame 2).

**Score: 8 / 10. Pass.** It is engaging and it is about this place. It is clearly better than the current site and is booked in 2 taps. It falls short of 9 because the film stalls on a slow phone and the page after it is calm's page again.

**Better than the current site: yes,** on the first screen, on the whole page and on booking.

**Fix list:**
1. **The slow-phone film.**
   - Start fetching the 26 key frames right after first paint, not on the first interaction. They are about 31 KB each, roughly 800 KB.
   - Hide the "0%…17%" counter.
   - While waiting, cross-fade between the 3–4 key frames already loaded instead of freezing, so a traveller on hostel Wi-Fi sees the ring rise rather than a still with captions sliding past (`phone-slowfilm-00…05`).
2. **Shorten the captions to 12 words or fewer.** Caption 2/3 runs 25 words and 6 lines over the moving picture at 390 px. Also shorten the pin by about a screen (4.6 screens is long on a phone).
3. **Dates:** the same engine fix. Drop the date fields from the drawer and say "pick your dates on the next page", or verify a parameter the engine actually reads.
4. **Make the second half its own.** After the film the sections repeat calm's order and pictures. Give one more section a unique-only treatment, for example the guests' words over a still from the film, or the room slideshow driven by horizontal swipe.
5. **Keep the floating pill off the closing statement and headings.** It covers the closing line on phone (`unique-ph3` frame 2) and sits over the room photos on laptop (`unique-lap1` row 3). Lift it, or hide it while the closing CTA is on screen.

**Keep:** the scroll-scrubbed aerial from the ring to the sea, with the pull-out frame; the hero title + subtitle + one CTA; the drawer with a room preselected (2 taps); the in-page booking card with room tiles; the pill that collapses during the film; the closing vid-002 aerial; reduced-motion stills with captions.

---

## Experience-only ranking (4f)

| Rank | Mockup | Score | Pass | Better than current | Taps to the engine room page (hero CTA) |
|---|---|---|---|---|---|
| 1 | unique | 8 | pass | yes | 2 (Double preselected); 1 via "Book this room" |
| 2 | interactive | 7 | fail | yes | 3 (2 from a room card; 2 taps to the engine *home* with dates dropped if no room chosen) |
| 3 | calm | 7 | fail | yes | 3 (1 via "Book this room") |

**The one sentence the human needs:** unique is the only page where the business's own film makes you want to go before you have read anything. Interactive is the most fun to use but opens on a beach that is not the hotel. Calm is clean and correct but forgettable after the hero.

**Interactive ranks above calm** on engagement: the room chooser, the clips and the tabs. One hero change would lift it. Calm's gap is structural: 7 screens of panels.

**Common to all three:** the engine at `pantareiresort.holidayfuture.com/listings/{id}` ignores `start`, `end` and `numberOfGuests` (and two other spellings tested). Every drawer asks for dates the traveller must type again on the engine (`engine/room-with-dates-desktop.png`), which falls short of the gold page's "hand-off with dates and guests pre-filled". Also, calm and unique share the same opening frame.

---

# Round 2 (station 4f, after the designer's revision)

experience-critic 0.2.0 · 2026-11-06 · same method and limits as round 1: Playwright on the served pages (ports 8923/8924/8925), phone 390 × 844 throttled (1.6 Mbps / 150 ms / 4× CPU), laptop 1440 × 900, slow-phone flick-scroll for unique, a real tap-through on every page's hero "Check dates" with the landed URL read back, reduced motion, JS off, and a hover sweep. Still independent: no other report and no `notes.md` was read. Frames are under `reports/2026-11-lk-surf-01/experience/panta-rei-resort/r2/{calm,interactive,unique,engine}/`.

## Correction to round 1: the engine does read the dates

Round 1 said the engine ignores `start`/`end`/`numberOfGuests`. **That was wrong.** Every round-1 test used the **Suite** (or Feb 2027 dates), and the engine **silently clears dates the room can't take**. Re-tested at 390 px (`r2/engine/*.png`):

| URL | Engine shows |
|---|---|
| Double 572800, Dec 10–13, 2 guests (the coordinator's URL) | **$465 · For 3 nights · Dec 10 – Dec 13** (`coord-double-dec10-13.png`) |
| Double, Dec 10–14 | $630 |
| Suite 572798, Mar 3–6 2027 | $615 |
| Suite, Dec 10–14 / Dec 10–13 / Jan 12–15 / Nov 20–23; Triple and Family, Dec 10–14 | "Add dates for prices": the dates are cleared, with **no "not available" message** |

So the hand-off works whenever the room is free. When it isn't, the traveller lands on a blank date picker with no explanation. That is the engine's behaviour, but our drawer can soften it (see the fix lists).

**Tap-through, all three pages** (`r2/*/phone-bookdef.log`): hero "Check dates" (1) opens the drawer with the **Double Room preselected** in all three. Entering arrival and departure, then tapping "See prices on our booking page" (2), lands on `…/listings/572800?start=2026-12-10&end=2026-12-13&numberOfGuests=2` with **$465 for 3 nights, Dec 10 – Dec 13** on screen (`r2/calm/phone-bookdef-4-engine.png`, and the same for interactive and unique). That is **2 taps plus the two date fields**, which meets the audit's `clicks_to_book` 2, and the price is visible on landing. Without dates, "See prices" still lands on the Double room page (calm adds `?numberOfGuests=2`). A room's own "Book this room" is 1 tap in calm and unique; in interactive a room card opens the drawer with that room preselected (2 taps).

---

## 1 · calm, round 2

**Timeline (phone, throttled):**
- 0.5 s: a pool-level poster is on screen at once (the long pool, red roofs, palms and sky) with the title "Panta Rei, Kabalana" and the full-width thumb CTA. No more flat olive block (`r2/calm/phone-cold-500ms.png`).
- 3 s: the film starts and turns into a gimbal walk across the lawn on the stepping stones (`-6000ms`, `-10000ms`).
- LCP was 1,496 ms. On the slow phone the clip buffers: it had played only 2.2 s of footage by 10 s (readyState 2–3, `r2/calm/walk-all.log`). It plays slow but it does play.

**The walk:**
- **Hero:** it now reads as "you, arriving at the pool", a human eye-level view, and it no longer shares a frame with unique.
- **Welcome:** the lounge again, and the room slideshows as before (`r2-calm` phone frames 01–08).
- **Lower half:** now led by photographs. "Restaurant and bar" is set over a full-bleed breakfast photo, the food shots sit in a row, the yoga photo runs full height beside "Panta Fitness Club", and the lawn-with-boards photo opens "After the surf" (`r2/calm/phone-scroll-09…14`, `laptop-scroll-07…11`).
- **Text:** the massage and class prices are still four and three rows, but they now sit under pictures instead of forming the section.
- **Close:** the aerial pool and the real footer, as before.

**Booking:** 2 taps to $465, as above (`r2/calm/phone-bookdef-*`).

**Motion:**
- 32 of 70 controls change on hover; the slideshow arrows and dots still don't.
- There are still no section entrances. Calm by brief, but the page stands still after the hero.
- Reduced motion shows the poster; with JS off every CTA is an engine link.

**Score: 8 / 10. Pass.** A warm, human first screen with one clear action, rooms properly sold, a lower half that now shows the place, and a 2-tap path that ends on a real total.

**Better than the current site: yes.**

**Fix list:**
1. On a slow phone the hero clip stalls and crawls (2.2 s of footage in 10 s). Serve a lighter phone rendition, or hold the poster until about 3 s of footage is buffered, so it plays smoothly once it starts.
2. Add a line under the drawer's dates: "If your dates clear on the next page, that room is full: try another room or WhatsApp us." The engine gives no message (`r2/engine/suite-dec10-14.png`).
3. One quiet entrance per section's picture, once. The page still has no motion below the hero.
4. Give the slideshow arrows and dots a hover and press state (they were the only controls without one in the sweep).
5. Fold the four massage rows into two compact " | " lines. They still take most of a phone screen.

**Keep:** the pool-level hero with the lawn walk; the full-width thumb CTA; the room slideshows with "Book this room"; the full-bleed photo openers in the lower half; the drawer with the Double preselected.

---

## 2 · interactive, round 2

**Timeline (phone, throttled):**
- 0.5 s: the hero is the **resort itself**, vid-002 over the ring of red roofs and the pool, with "Panta Rei, Kabalana" in a brush script and a coral "Check dates" (`r2/interactive/phone-cold-500ms.png`).
- 1.5 s: the film is already playing (t 2.2 s), and by 10 s it pulls out over the jungle (`-10000ms`).
- LCP was 1,560 ms.
- The round-1 problem, a beach that wasn't the hotel, is gone.

**The walk:**
- **Script headings throughout:** "Welcome to Panta Rei", "Four ways to stay", "The pool", "Restaurant and bar". They are readable and give the page the booklet's handwriting (`r2-interactive` phone frames).
- **Rooms:** the ring aerial with the four room photo cards and "Look inside", each opening a gallery drawer.
- **The pool:** the swimmer photo full-bleed.
- **Restaurant:** two tabs (Breakfast / Later on), each with a real dish list. The thin single-line Dinner tab is gone.
- **Fitness:** a 2 × 4 grid of day chips and per-class prices as " | " lines.
- **After the surf:** the lawn photo, then the massages with script subheads.
- **Then:** guests with a 1/6 quote stepper, "Getting here" with the distance list, groups, a closing image with "Check dates and book direct" and WhatsApp, and "Talk to us" as buttons (`r2/interactive/phone-scroll-*`, `laptop-scroll-*`).

**Booking:**
- 2 taps to $465 (`r2/interactive/phone-bookdef-*`).
- The Double is preselected, so the round-1 trap (landing on the engine home with the dates dropped) is gone.
- In the phone drawer the date fields sit below the room gallery, out of first view, so a quick visitor may tap "See prices" before seeing them. It still lands on the right room, just without a price.

**Motion:**
- 27 of 36 controls change on hover.
- The "Breakfast" tab (the selected one) and the quote dots don't.
- Reduced motion shows the poster; with JS off every CTA is an engine link.

**Score: 8 / 10. Pass.** The first screen is now the business and pulls you in, the room chooser is still the best way to pick a room in the round, and booking ends on a real total in 2 taps.

**Better than the current site: yes.**

**Fix list:**
1. In the phone drawer, put Arrival and Departure above the room gallery, or shrink the gallery to a strip, so the dates are seen before "See prices" (`r2/interactive/phone-bookdef-2-after-hero-cta.png`).
2. The same "if your dates clear, that room is full" line as calm.
3. Hover and press states for the selected tab and the quote dots.
4. At 1440 the fitness block's day chips and price line sit in a narrow column beside a small photo, with a lot of empty ground (`r2/interactive/laptop-scroll-06…07`). Give the shala photo or a clip the width.
5. The brush script is used for every heading, including long ones ("Getting here and around" wraps to two lines). Keep it for short titles and set the long ones in the text face.

**Keep:** the vid-002 hero of the resort with the script title and one CTA; the room cards that open a gallery drawer; the two-tab menu with real dishes; the distance list; "Talk to us" as buttons; the Double preselected.

---

## 3 · unique, round 2

**Timeline (phone, throttled):**
- 0.5 s: the canvas poster (the top-down pool), "Panta Rei", "Boutique resort · Kabalana, Ahangama" and "Check dates" (`r2/unique/phone-cold-500ms.png`). LCP was 1,256 ms.
- **Slow phone, flick-scroll** (`r2/unique/phone-slowfilm-00…11.png`, log below):

| Time | Scroll y | Film state | What the visitor sees |
|---|---|---|---|
| 3.9 s | 350 | waiting | poster, caption 1/3 |
| 6.2 s | 1,050 | waiting | poster, caption 2/3 |
| 8.4 s | 1,750 | ready, playing | the pull-out to the sea, caption 3/3 |
| 10.5 s on | 2,450+ | playing | the scrub runs with the scroll |

- **Better than round 1:** the stall is shorter (about 4.5 s of scrolling, against 7 s before), the "0%…17%" counter is replaced by a small spinner beside the pill, captions are two lines ("The bungalows sit in a ring around a long pool"), and the pin is shorter (3,038 px, against 3,882).
- **Still the same:** on a slow phone the ring-rising part is still skipped. The film comes alive only at the sea.

**The walk:**
- **After the film:** "No paradise like home." set large, the welcome, the lounge, rooms with slideshows, and the in-page booking card.
- **Lower half:** now opens each section on a full-bleed photo with the title over it: "After the surf" over the lawn, "Panta Fitness Club" over the shala, "What guests say" over a photo with 9.2 / 4.7 set large (`r2/unique/phone-scroll-12…20`). It no longer reads as calm's lower half.
- **Pill:** stays clear of the headings in the frames walked.

**Booking:** 2 taps to $465 (`r2/unique/phone-bookdef-*`). "Book this room" and the in-page booking card are 1 tap. With JS off, "Check dates" points to `#book`, whose links are real engine links.

**Motion:**
- The film is the main item.
- 33 of 48 controls change on hover; the dots don't.
- Reduced motion shows stills with captions.

**Score: 8 / 10. Pass.** It is still the strongest single moment of the round: the ring of roofs rising to the sea answers "where, and how close to the waves" without words. The revised lower half carries the page to the end. It is held below 9 by the slow-phone stall.

**Better than the current site: yes.**

**Fix list:**
1. The key frames still weren't ready until about 8.4 s on the throttled phone. Cut the key set further (every 12th frame), or start it from `DOMContentLoaded` with high fetch priority, so the ring is moving by the time the visitor's thumb reaches caption 2/3 (`phone-slowfilm-02…04`).
2. The same "if your dates clear, that room is full" line in the drawer.
3. In the phone drawer the date fields sit just below the drawer's first view (`r2/unique/phone-bookdef-2-after-hero-cta.png`). Make the room tiles smaller so "2. Your dates" is visible without scrolling.
4. Hover and press states on the slideshow dots.
5. The page is still about 17,300 px on a phone. Fold "Good to know" (14 rows) into " | " lines, as interactive does.

**Keep:** the scroll-scrubbed aerial with three short captions; the hero title, subtitle and one CTA; the full-bleed photo openers in the lower half; the large ratings over a photo; the in-page booking card; the Double preselected in the drawer.

---

## Experience-only ranking, round 2

| Rank | Mockup | Score | Pass | Better than current | Taps to a priced engine room page |
|---|---|---|---|---|---|
| 1 | unique | 8 | pass | yes | 2 (CTA → See prices, Double preselected, dates entered); 1 via "Book this room" |
| 2 | interactive | 8 | pass | yes | 2 (CTA or room card → See prices) |
| 3 | calm | 8 | pass | yes | 2; 1 via "Book this room" |

**The one sentence the human needs:** all three now open on the resort itself and end on a real price in 2 taps. Unique is the one you remember, for its film from the ring of roofs to the sea. Interactive is the most fun to choose a room in. Calm is the most human first screen: you, walking across the lawn to the pool.

**Common fix:** the engine silently clears dates when the chosen room is full. One line in the drawer would stop that looking like a broken hand-off.

---

# Station 5 · full r1 (the built interactive site)

experience-critic 0.2.0 · 2026-11-06. The prompt was re-read for station 5: same agent layers and same method; the bar is full mode, so a score below 8 or "not better than the current site" is a hard fail. The site was built from `sites/panta-rei-resort/final/` (`npm run build`), and `final/dist/` was served over http on port 8960 (the server is now stopped). It was walked as in rounds 1 and 2:
- phone 390 × 844, touch, throttled to 1.6 Mbps / 150 ms / 4× CPU, with cold frames and then a human-pace scroll;
- laptop 1440 × 900;
- reduced motion, JS off and a hover sweep;
- the hero "Check dates" and a room card tapped through to the engine, read back from the landed page.

Still independent: no other report and no `notes.md` was read. Frames are in `reports/2026-11-lk-surf-01/experience/panta-rei-resort/s5-r1/final/`. The current site is the round-1 walk (mobile emulation with an Android UA, `experience/panta-rei-resort/current/`).

**First seconds (phone, throttled):**
- 0.5 s: the script title "Panta Rei, Kabalana", "Check dates" and the WhatsApp icon on a flat green ground (`phone-cold-500ms.png`). Text and the booking action come before any media.
- 1.5 s: the poster has painted only its top third: the roofs, then a green band (`-1500ms`).
- 3 s: the full poster, the ring of roofs and the pool with swimmers (`-3000ms`).
- 6 s: the vid-002 film plays (t 1.9 s), and by 10 s it pulls out over the jungle (`-6000ms`, `-10000ms`).
- LCP was 2,256 ms, inside the 2.5 s budget.
- On a laptop the film plays from 0.5 s (`laptop-cold-500ms.png`).
- The first screen pulls you in: it is the place itself, one short title, one CTA and nothing else.

**Story and desire:**
- **Welcome:** a lilac page with "No paradise like home.", then the lounge clip, which loads lazily when its block arrives and plays by the next frame (`phone-scroll-01…02`).
- **Rooms:** "Four ways to stay" opens on the ring aerial, then the four room cards with "Look inside" (`phone-card-1-rooms.png`).
- **Pool and restaurant:** the swimmer full-bleed, then the restaurant photo with Breakfast / Later on dish lists.
- **Fitness:** "Panta Fitness Club" with the day chips and per-class prices, and then the mat-class clip filling the section (`phone-scroll-08…10`, `laptop-scroll-06…07`). It now feels like a place, not a timetable.
- **After the surf:** the lawn photo and the massages, with plain-face subheads now ("script titles only" holds).
- **Then:** guests with a quote stepper, "Getting here" with the distance list, groups with "Ask about a group".
- **Close:** the bright ring-and-pool aerial with "Booking direct gets you our best rate…", Check dates and WhatsApp (`phone-scroll-16`, `laptop-scroll-12`), and the footer with "Talk to us" buttons.
- After one scroll you know what it is, where it is and why you'd go. Price is answered on the engine, by design.

**Booking (`s5-r1/final/phone-bookdef.log`, `phone-card-*.png`):**
- **From the hero:** "Check dates" (1) opens the drawer with the Double Room preselected. Arrival, Departure and Guests (2 guests by default) now sit directly under the room chips and above the gallery, so they are in view without scrolling (`phone-bookdef-2-after-hero-cta.png`; arrival field at y 329). Entering 10 and 13 Dec, then "See prices on our booking page" (2), lands on `…/listings/572800?start=2026-12-10&end=2026-12-13&numberOfGuests=2` showing **$465 · For 3 nights · Dec 10 – Dec 13** (`phone-bookdef-4-engine.png`).
- **From a room card:** "Double Room" (1) opens the drawer on that room, then the dates, then "See prices" (2) gives the same URL and **$465** (`phone-card-2-drawer.png`, `phone-card-4-engine.png`).
- **Taps to book: 2** from either start, plus the two date fields. This meets `clicks_to_book` 2.
- With JS off, every "Check dates" is a real engine link.
- The current site needs about 5 taps from its engine home to a priced room.

**Motion and video:**
- Four moving pictures: the hero, the lounge, the fitness clip and the closing aerial. The hover sweep found 27 of 36 controls with a visible hover state; the selected "Breakfast" tab, the hero "Check dates" and the quote dots have none.
- Reduced motion shows posters only (`phone-reduced-motion.png`).
- No section entrances.

**Regressions against the picked mockup (interactive, round 2):**
1. **The hero is slower on a slow phone.** In the mockup the poster was there at 0.5 s and the film played at 1.5 s, with LCP 1,560 ms. In the build it is a flat green ground at 0.5 s, a third of the poster at 1.5 s, and the film at about 6 s (`hero-video` has `preload="none"`), with LCP 2,256 ms. It is inside budget, but the first two seconds are emptier than in the mockup.
2. **Two "Check dates" stacked at the end.** The persistent phone bar sits directly under the closing section's own "Check dates" + WhatsApp pair (`phone-scroll-16.png`). That is two identical buttons 60 px apart.
3. **Hover states:** none lost. The same three controls lack them as in the mockup.

Nothing else regressed. The five listed changes are all present, and the drawer change (dates before the gallery) fixes my round-2 fix #1.

**Score: 8 / 10. Pass.** It is engaging, it is clearly about this place from the first frame, it is easier to book than the current site, and it ends on a real total in 2 taps. It falls short of 9 because the first two seconds on a slow phone are flat green, and because nothing below the hero moves into view.

**Better than the current site: yes.** On the first screen, it shows their own resort film with one action, where the current site's film had not started after 10 s on the same throttled phone. On the page, every room is sold and the fitness, restaurant and getting-here sections are real. On booking, it is 2 taps to $465 against about 5 from the current site's engine home.

**Fix list:**
1. Get the hero poster on screen at first paint: a small preloaded `vid-002-poster-r1.778-p-608.webp` with `fetchpriority=high`, or an inline blurred version of it. Let the film start after `load`, not later. This brings the mockup's 0.5 s picture back.
2. Hide the persistent phone bar while the closing section's buttons are in view (an IntersectionObserver on the closing block).
3. Add a line under the drawer's dates: "If your dates clear on the next page, that room is full: try another room or WhatsApp us." The engine clears dates for a full room without any message (round 2, `r2/engine/suite-dec10-14.png`).
4. Hover and press states for the selected tab, the hero "Check dates" and the quote dots.
5. One quiet entrance for each section's main picture (a 12–16 px rise and fade, once, off under reduced motion), so the long middle has some life between the clips.

**Keep:** the vid-002 resort hero with the script title and one CTA; the room cards that open the drawer on the chosen room; the drawer with the dates above the gallery and the Double preselected; the lazy lounge clip; the fitness clip filling its section; the bright ring-and-pool closing; "Talk to us" as buttons; script for titles only.
