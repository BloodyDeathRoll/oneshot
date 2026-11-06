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
