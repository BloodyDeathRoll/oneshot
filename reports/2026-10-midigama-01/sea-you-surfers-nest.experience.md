# Sea You Surfers Nest: experience critique (4f pre-score)

experience-critic 0.2.0 · station 4f (quick), round 1 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-22
Pages: `sites/sea-you-surfers-nest/mockups/{calm,interactive,unique}/dist/index.html`, each served over http on a random local port by the walk scripts.
Compared with: the business's current presence, which is `no_site`. A traveller meets the Google listing and the Booking.com listing (`dossier/sea-you-surfers-nest/funnel/walk.json`, `assets/walk/01-google-listing-fold.png`, `03-booking-com-fold.png`, `03-booking-com-dates.png`; audit F1–F9). Also compared with the gold bar (`agents/designer/gold/`, Global Surf notes) and with the calibration in `agents/experience-critic/references.md`.
Written without reading the critic's or the visual-critic's report.

Frames are in `reports/2026-10-midigama-01/experience/sea-you-surfers-nest/` (git-ignored PNGs). The logs there are `calm-walk.log`, `interactive-walk.log`, `unique-walk.log`, `states.log`, `cold.log` and `*-inspect.log`, and the recipes are `walk.mjs.txt`, `states.mjs.txt` and `cold.mjs.txt`.

How the walks were run:
- **Browser:** headless Chromium with SwiftShader WebGL.
- **Phone:** 390×844 @2x, touch, iPhone UA. The cold load was throttled with CDP to 1.6 Mbps, 150 ms RTT and 4× CPU.
- **Laptop:** 1440×900.
- **Third-party links:** recorded and stubbed, never loaded. Cookie dialogs did not arise.
- **Interactive's shader:** the page treats a software renderer as a weak device and keeps the still on this machine (`states.log`: default URL, canvas opacity 0). I therefore walked it with the designer's `?palms` switch, which is what a phone with a GPU runs.

**A note on timing.** The three walks ran in parallel first, which inflated the throttled numbers. I re-ran the cold loads one at a time (`cold.log`). Under 4× CPU each screenshot takes about 4 s, so after the first frame the "1.5 s" and later frames were really captured at about 5–10 s. I claim only the first frame and the settled state.
- **Calm:** the first frame at 0.5 s is blank white (`calm-cold-t500.png`). In the parallel run the 0.5 s frame already showed the photograph, the title in the Georgia fallback and a usable button (`calm-phone-t500.png`), with Grand Hotel swapped in by 3 s.
- **Interactive and unique:** the first frame is already the complete first screen.
- **LCP:** the H1 in all three (the web-font title): calm 5.5 s, interactive 2.3 s, unique 4.5 s.
- **Transfer to load:** 362, 764 and 281 KB.
- **Hosts on load:** local plus Google Fonts only, which is the 4e allowance.

## Summary

| | calm "The board rack" | interactive "In the palms" | unique "Every side of the four-poster" |
|---|---|---|---|
| **Dimension 8 (experience)** | **8 / 10** | **7 / 10** | **7 / 10** |
| Better than the current presence (Google + Booking.com) | **yes** | **yes** | **yes** |
| Pass / fail (this critic) | **pass**, narrowly | **fail**: below 8. The first screen does not pull you in, and the palms barely register (method-5 cap of 7). | **fail**: below 8. The set-piece is too long and empty on the phone, and the photo sits in the drawn bed like a card. |
| Taps to booking (hero → Booking.com listing) | 1 | 1 (the group path is 2: tile, then the whole house on Airbnb) | 1 (the door is 2: More, then a tile) |
| Hard fails (dimension-8 side) | none | below 8/10 | below 8/10 |

**Experience ranking at 4f: 1 calm · 2 unique · 3 interactive.**
- **Calm** is the only first screen that says "surfers' nest" at a glance (three boards on the rack). It reaches the rooms within one and a half scrolls.
- **Unique** has the idea a visitor would remember and the best laptop first screen of the set, the gabled mint bed full-bleed. On the phone, though, the turn costs about seven screens for four short sentences.
- **Interactive** has the best booking moment of the three: "Who's coming?" sends a couple, a group or a question to the right listing inside the page. But its first screen is a garden table with a quiet background shimmer, and its middle reads like an app of cards.

The video and photo hard fail does not apply:
- The business has no video of its own (concepts §2).
- All three first screens use own photographs from 2000 px sources: img-034 and img-004, img-003, img-005 and img-015.

The deliberate states were treated as designed, not as defects:
- There is no Call button anywhere (`tel` count 0 in every walk log), because the phone number is unconfirmed.
- The Booking.com link carries no dates.

**The current presence, honestly.**
- **On Google:** a traveller gets a map, "4.9 ★ (11) · Bed & breakfast", and Directions / Start / Save. There is no phone and no website (F2).
- **On Booking.com:** a blue search bar, the title "Sea You Surfers Nest! Hello to waves in a minute walk", "8.0 Very good · 8 reviews", the road sign as photo 1/45, then "Choose dates to see prices" on yellow.

Two things there are better than all three mockups:
- **Booking.com** shows live prices on the same page once dates are picked. Here they are always one tap away, on Booking.com.
- **Google** puts the map and Directions on the first screen. In all three mockups "Open in Google Maps" sits near the end: about 8 phone screens down in calm and interactive, and about 15 in unique (`*-walk.log`, "Finding the house").

Everything else favours the mockups:
- the house in its own pictures, under the one name from its sign (F7);
- the plain "Only one has air conditioning" (F4);
- the whole-house Airbnb option for groups;
- no sign-in and no rival hotels.

---

## 1. Calm: "The board rack", 8/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| 0.5 s | Serial run: blank white. Parallel run: img-034 (three boards on the rack) full-bleed, "Sea You Surfers Nest" in the Georgia fallback, "Midigama, Sri Lanka" and the slate "See live dates" button (202×56 at y 444). | `calm-cold-t500.png`, `calm-phone-t500.png` |
| settled (≤ 3 s in the parallel run) | The same, with the title in Grand Hotel at 44 px. No header and no other button. Nothing moves. | `calm-phone-t3000.png`, `calm-cold-t1500.png` |

Feeling: bright, clean and immediately on-topic. The worn boards, the plant and the concrete ledge say "surf house" before a word is read. The calibration asks for a title and one short CTA, and that is exactly what this screen has. It is the strongest phone first screen of the three.

On the laptop (`calm-laptop-t2000.png`), img-004 shows the veranda with the boards on the right and the pendant lamp and carved door behind. The title sits centred on a soft veil over the busiest part of the frame. It still reads, and the photograph is sharp.

### Walk (phone, 0.7 screen per step: `calm-phone-s00…s14.png`, 10.2 screens)
- **s01:** "A bed and breakfast in Midigama, on Sri Lanka's south coast.", then "'Hello to waves in a minute walk,' says the house's own listing" large in the script, the " | " included line, "Live dates on Booking.com" and three dated rating cards. What, where and why this place all arrive within one scroll. The phone bar (chevron + "See live dates") appears from here and stays (`calm-walk.log`: bar from s01).
- **s02:** the full-label button wraps to two lines, "See rooms and live dates on / Booking.com". It looks cramped next to the one-line buttons. Then "Seven rooms" with the A/C sentence at body size.
- **s03–s05:** the "In every room" card repeats, as an icon list, the five things the paragraph above it just named. Then the Deluxe and Standard rows, each with a 3:2 dot slideshow and its own button. The rooms arrive at screen 3, as the concept promised.
- **s05–s06, Around the courtyard:** a wide band of img-071, a grey concrete wall with a teal bench, then text, then two small balcony prints.
  - **This is the first deflation.** On the laptop the band fills almost a whole screen with grey wall (`calm-laptop-s04.png`, `calm-laptop-s05.png`).
- **s07–s10:** the matted prints (carved door, masks, board shower), then Breakfast as type only, then Ashly. This is about four screens of mostly grey text on the tint.
  - The three rating cards come back identical under Ashly (s09). The first slide is Niamh, so Kenza's "just steps away from the sea" (the page's one line about the water) is a swipe away.
- **s11–s14:** Finding the house with the sign print and "Open in Google Maps", then the closing card over the Deluxe room with all three ways in, then a real footer with buttons. This is good.

### The story after one scroll
- **What, where, trust and the sea claim:** yes, all within one scroll.
- **Why this place:** the boards and the four-poster say "a simple surfers' B&B".
- **Cost:** answered honestly as "Live dates on Booking.com".
- **Through media or tables:** media first, then two room galleries. There are no tables.

### Wanting to go
- **Lifts:** the board rack; the Deluxe room with the door open onto the veranda; the matted print row (the page's one playful note); the closing card over the bed.
- **Deflates:** the grey courtyard band; the four text-heavy screens from the carved doors to Ashly; seeing the same rating cards twice.

### Booking
**1 tap.** The hero link is `https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html`, and the only request made on the tap was that URL (`calm-walk.log`, "tap 1"). That equals the audit's `recommended` (engine, 1 click).
- **Other buttons:** every room row and the bar go to the same listing. The closing adds "Book a room on Airbnb" and "Book the whole house on Airbnb".
- **The expanded phone bar** (`calm-phone-bar-open.png`) shows the audit's summary in order: spot, included, price and ratings, then the full button. Three faults:
  - its background is translucent, so "Seven rooms" and the paragraph behind it show through the included line and the ratings;
  - at that scroll position it repeats the glance block that is still on screen above it;
  - it stacks two booking buttons, one above the other.
- **Before the tap:** a traveller knows the rooms are alike, that only one has A/C, and that groups can take the whole house. Booking.com never says that (F4).

### Motion and states
- **Hover and press:** on the laptop the hero CTA lifts 1 px and darkens to `rgb(49,74,84)` with a soft shadow (`calm-laptop-hover-cta.png`). 31 of 50 interactive elements carry transitions; the ones without are the slideshow dots and tracks, whose active pill slides instead.
- **Desktop hero parallax:** it works (`calm-laptop-parallax-0/300/600.png`).
- **Slideshows:** they cross-fade, and a phone swipe steps one photo (`calm-phone-deluxe-swipe-mid.png`, then dot 2 active in `states.log`).
- **Reduced motion:** the same composed page (`calm-phone-reduced-*`).
- **JavaScript off:** the hero, the glance and the room buttons all work, and the slideshows become swipe rows (`calm-phone-nojs-*`). The persistent bar is not there with JS off (`calm-walk.log`, nojs: bar false), but the per-room buttons cover it.
- **Main item:** none, which is correct for calm.

### Against the gold bar
- **What it shares with Global Surf:** the first-screen discipline (one title, one short line, one button, the business's best surf image) and a real footer.
- **What it lacks:** footage, which is a fact about the material.
- **Below the fold:** fewer distinct "moments" than gold. After the rooms, three sections in a row are text on tint.

### Score: 8, better than the current presence: yes
It is engaging at the first screen, clearly better than either listing, and 1 tap to book. It is held at 8 by a second half that goes grey and wordy, and by small repetitions: the ratings twice, the in-every-room list after the same sentence, the bar summary over the glance.

**Fix list (biggest effect first)**
1. Replace or cut the img-071 courtyard band. On the laptop it is a screen of grey wall.
   - Lead the section with img-003 (the mint table in the palms) or img-045 instead.
   - Or keep img-071 as a 21:9 strip no taller than about 40 % of the viewport.
2. Tighten the second half:
   - fold Breakfast into the Ashly block as one line;
   - start the guests slideshow on Kenza ("steps away from the sea"), so the sea arrives through a guest's words;
   - show the ratings under Ashly as one " | " line, not the same three cards again.
3. Fix the expanded phone bar:
   - give it an opaque ground, because the section text shows through (`calm-phone-bar-open.png`);
   - keep one booking button in it.
4. Keep the full-label button on one line on the phone (smaller side padding, or a 15 px label). Today it wraps "Booking.com" onto a second line in three places (s02, the bar panel, the closing).
5. Drop the "In every room" card on the phone, or merge it into the paragraph. It restates the five objects named two lines above.

**Keep:**
- the board-rack phone hero and the veranda laptop hero;
- Grand Hotel titles, with the slate taken from the sign used only for booking;
- the A/C sentence at body size;
- one button per room;
- the matted print row;
- the closing card with all three ways in;
- the footer buttons.

---

## 2. Interactive: "In the palms", 7/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| first frame | img-003 at 80 svh: the mint balcony table with a pothos, the parapet, and pale out-of-focus palms filling the top half. "Sea You Surfers Nest" in Kalam (36 px) and the bottle-green "See live dates" button (201×56 at y 195) sit in the palm band. The tagline starts under the hero. | `interactive-cold-t500.png`, `interactive-phone-t3000.png` |
| after load | With `?palms` the canvas fades in over the identical still. Nothing else changes. | `interactive-walk.log` (canvas opacity 0 → 0.999) |

**The main item.** Forced on, the shader moves only the fronds:
- On the laptop, the palm band changes by PSNR 23.3 dB between 0 and 1.5 s, and the table band is pixel-identical (PSNR inf).
- An 8× amplified difference image shows motion only above the parapet (`interactive-laptop-palms-0/1500.png`).
- A pointer sweep adds a gust (PSNR 24.0 against the resting frame, `interactive-laptop-palms-gust.png`).

So it is real, clean and not an overlay. But the fronds are washed out and out of focus, and the eye sits on the title and the green table. Side by side, the two stills 1.5 s apart look the same at page scale. A visitor will at most notice a slow shimmer behind the name, not wind in the palms.

As a still, the frame is fresh and colourful: one table, one plant, the house's mint. It does not say surf, sea or place, though. Without the title it could be any café balcony.

**Cap:** the first screen is pleasant but does not pull you in, and the main item barely registers. That caps the score at 7 (method 5).

### Walk (phone: `interactive-phone-s00…s15.png`, 11.1 screens)
- **s01:** a 2×2 icon fact grid: the spot line; "7 rooms, all doubles | sleeps 14"; "Free WiFi in public areas | Kitchen"; "Live dates on Booking.com". Then three stacked rating chips, which take about half a screen.
- **s02, "Who's coming?":** the best moment on the page. Three tiles: Two of you, A group, A question first (`interactive-phone-tiles-two/group/ask.png`).
  - "A group" swaps in "Book the whole house on Airbnb" and the sleeps-14 line.
  - "A question first" gives "Ask Ashly on Airbnb" with his reply time.
  - Each swap cross-fades and the mint ring draws in.
  - This answers the audit's "which listing do I need?" inside the page.
- **s03–s05, Seven rooms:** a sticky pill (Deluxe Double | Standard Double) slides and cross-fades a large 4:5 stage (`interactive-phone-rooms-standard-mid/standard.png`; `states.log`: pill sticky at top 10).
  - The "In every room" icon cards then repeat the paragraph above them.
- **s05–s07:** the courtyard text and the object shelf (bench, tea set, stool, settee, chairs). It peeks and swipes, and it is charming (`interactive-phone-shelf.png`). Then the board-shower print and the masks.
- **s08–s11:** Breakfast as type; Ashly; the three ratings again as cards; the quote swipe row, which opens on Kenza's "just steps away from the sea" (good); then Finding the house.
- **s12–s15:** the closing band (the palms photo again, with the closing line on a frosted card), then the **same "Who's coming?" panel a second time**, then the footer.
- **The phone bar** (name + "See live dates", 174×48) appears once the hero leaves and stays. It also works with JS off (`interactive-walk.log`, nojs: bar true).

The page is made of white rounded cards on mint: the fact grid, the chips, the tile panel, the icon cards, the quote cards and the closing card. It reads more like an app than a guesthouse. The inspector agrees: 43 resting shadows and `card-rows` (`interactive-inspect.log`).

### The story after one scroll
- **What and where:** yes.
- **The sea:** only through the spot line.
- **Why this place:** carried by the mint colour more than by any one picture.
- **Cost:** "Live dates on Booking.com".

### Wanting to go
- **Lifts:** the green table; the tile panel (it feels like someone is helping you choose); the shelf of objects; Kenza's quote first.
- **Deflates:** the card stack before and after the panel; the hero motion you don't notice; the repeated panel at the end.

### Booking
**1 tap** from the hero, the bar, the room stage and "Two of you", all to the dossier's Booking.com URL (`interactive-walk.log`, "tap 1"). The group path takes 2 taps (tile, then "Book the whole house on Airbnb").
- The A/C line sits under the couple's buttons, where it matters.
- With JS off, the panel becomes three labelled groups of plain links (`interactive-phone-nojs-*`).
- Of the three variants, this is the clearest booking choice.

### Motion and states
- **Transitions:** 43 of 63 interactive elements on the laptop. The ones without are dots, tracks and the quote track.
- **Press and hover:** the CTA lifts 1 px with a deeper shadow (`interactive-laptop-tile-hover.png`, `states.log`).
- **The shelf:** it drags with inertia on the laptop (`interactive-laptop-shelf-fling/rest.png`).
- **Reduced motion:** the canvas is `display:none` and the still stays (`interactive-walk.log`, reduced). With JS off everything is reachable.
- **The pill and tiles:** both move on mild springs and feel purposeful.

### Score: 7, better than the current presence: yes
It is easy to book, and it is the most helpful at choosing a listing. But it is fine rather than engaging. The hero is a table with a motion you hardly see, the title face sits loosely, and the middle is card chrome.

**Fix list**
1. Make the palms visible, or let the first screen carry more of them.
   - Raise the displacement where the fronds are in focus (the right third), so a viewer sees them sway within two seconds.
   - On the phone, crop higher, so the palm band is at least half the frame and the table less.
   - Keep the motion on the photograph's own pixels.
2. Strip the card chrome:
   - the 2×2 fact grid becomes one " | " line;
   - the three rating chips become one line;
   - "In every room" becomes a plain icon list (or goes, since it repeats the paragraph);
   - drop the resting shadows on tiles and cards.
3. Don't repeat the whole "Who's coming?" panel at the end. Put the three listing buttons under the closing line, or open the panel there and give the top one only the hero's button and a "Who's coming?" link.
4. Show the ratings once as cards (with the guests) and once as a line (in the glance). Today they appear three times: the chips, the cards and the footer note.
5. Tighten Kalam's word spacing in the H1 on the phone. "Sea You Surfers Nest" sets with wide gaps (`interactive-phone-t3000.png`) and reads like a placeholder face.

**Keep:**
- "Who's coming?" with its three answers and the A/C line under the couple's buttons;
- the sticky room pill and the 4:5 stage;
- the object shelf;
- Kenza first in the quote row;
- the bottle-green accent used only for booking;
- the bar that works with JS off.

---

## 3. Unique: "Every side of the four-poster", 7/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| first frame | img-005 crop, full-bleed: the timber towel ladder, a mint post and the teal throw. Over it sit a frosted header pill with "Sea You Surfers Nest" and a teal "Book" button, then the H1 "Sea You Surfers Nest" (Leckerli One, 40 px, two lines), the place line, the teal "See live dates" (180×52 at y 416), and a bottom pill: "Scroll, and the bed turns". | `unique-cold-t500.png`, `unique-phone-t3000.png` |

Feeling: warm and real, the bed a guest will sleep in. But the phone first screen is busy:
- the name appears twice, one centimetre apart;
- there are two booking buttons (header "Book" and hero "See live dates");
- there is a hint pill.

The calibration's "title + one short CTA" is not met on the phone. On the laptop (`unique-laptop-t2000.png`), img-015 full-bleed is the single best first frame of the set: the gabled mint canopy, lime sheets and the teal throw. The header there carries the name pill, four nav links and "Book".

### Walk (phone: `unique-phone-s00…s24.png` and the dense `unique-phone-turn-00…28.png`, 17.5 screens)
- **Screens 1–2:** the glance slides up as a white sheet over the photograph. It holds the tagline, the spot line large, an icon list of what's included, "Live dates on Booking.com", the three ratings as lines, the full button and "More ways to book".
- **Then** the same photograph comes back full screen, and the drawn mint four-poster grows around it (`unique-phone-turn-09…12`).
- **The turn:** the pin is 6020 px on the phone, or 7.1 screens (`states.log`).
  - Captions show only from y 2110 to y 4853, one short sentence per quarter turn: "All seven rooms are doubles…", "Only one has air conditioning…", "The rooms are furnished much alike.", "The bed is a mint-green four-poster…".
  - About 2.2 screens pass before the first caption.
  - About 1.4 screens at the exit have no caption: the bed alone on white, then empty white (`unique-phone-turn-24…28`).
  - **This is where attention drops.** The idea lands at the first quarter turn. After that it is the same object on white for several screens with a sentence each.
- **The drawn bed:** matte, panelled and lit, so not a wireframe. But the room photograph inside it is a flat rectangle:
  - posts cross over the photographed bed's own posts;
  - at the exit a white gap shows between the photo's lower edge and the footboard (`unique-laptop-turn-11.png`, `unique-laptop-turn-22.png`).
  - The result reads as a picture pinned inside a furniture configurator, which is the failure the concept itself named.
- **s09–s13, "Deluxe or Standard":** large 4:5 slideshows, each room with its button. Then "In every room", plus a full Facilities line that is useful here.
- **s14–s16:** the courtyard as a true two-column masonry on the phone. It is varied and lively, the best photo moment after the hero.
- **s16–s18:** the carved door and the board shower as an offset pair of prints. Then Breakfast.
- **s19–s21:** Ashly, the ratings as cards, and the quote stack, where a card turns away 6° and the next one comes up (`unique-phone-quotes-mid/1.png`).
- **s21–s24:** Finding the house, then the closing panel with the gable top edge (the one shape), with the three listing buttons, then the footer.

On the laptop (`unique-laptop-s00…s18.png`, 14.6 screens), the turn sits beside the captions in a left column and reads better. The four rests are clear (`unique-laptop-turn-08/11/14/18`). The pin is still 6.3 screens with a 1.5-screen captionless exit (`unique-laptop-turn-20…25`). The inspector counts 6 of 12 desktop screens as near-empty ground and flags `long-pin` on "Seven rooms". It cannot see the canvas, but the emptiness around the bed is real.

### The story after one scroll
- **What, where, the sea claim, inclusions, price and trust:** yes, all in the glance.
- **Why this place:** the bed. The turn then answers "are all the rooms like this?", the question Booking.com's 45-photo carousel leaves open.
- **Through media or tables:** media and type. There are no tables.

### Wanting to go
- **Lifts:** the laptop hero; the moment the photo backs into the drawn bed; the courtyard masonry; the quote stack.
- **Deflates:** the cut from a warm room photograph to a cold white page with a mint object; the long, near-empty pin on the phone; the photo-in-a-frame seams.

### Booking
**1 tap.** The hero and the bar's "See live dates" go straight to the dossier's Booking.com URL (`unique-walk.log`, "tap 1").
- **The door:** "More" on the phone (`unique-phone-door-mid/open.png`) and "Book" on the laptop (`unique-laptop-door-open.png`) open a side sheet with the gabled top, three tiles and the A/C line. Focus lands on the Booking.com tile, Tab cycles inside the sheet, and Esc closes it and returns focus to the opener (`states.log`).
- **JS off:** `/stay/` is a real page with the same three buttons and "Back to the house" (`unique-phone-nojs-stay.png`).
- The booking feels part of the site.

### Motion and states
- **Main item:** WebGL from the business's own photographs, which meets the method-5 requirement.
- **Micro-animations:** the door, the quote turn, slideshow cross-fades and button presses (the CTA lifts 2 px, `unique-laptop-hover-cta.png`). The three glance rating links have no hover or press transition (`unique-walk.log`, laptop transitions list).
- **Reduced motion:** no pin. A static 2×2 grid of the four photographs sits beside the four sentences, and the page drops from 14766 to 11352 px (`unique-phone-reduced-*`). This is arguably the better phone pacing.
- **JS off:** the same static grid (`unique-phone-nojs-*`).

### Score: 7, better than the current presence: yes
It is the most memorable idea, and its laptop hero is the best single frame here. As an experience on a phone, though, it asks a traveller to scroll about seven screens through a turning object, before any room detail, to learn four short facts. The drawn bed and the photograph do not yet look like one thing. It is engaging in its first ten seconds and slow after that.

**Fix list**
1. **Shorten the phone set-piece by more than half.** Aim for about 3 screens in total:
   - each caption rests for about 0.6 screen;
   - the turn starts as soon as the glance has passed;
   - cut the captionless exit (`unique-phone-turn-24…28`).
   - On the laptop, also cut the exit and bring the pin under about 4 screens.
2. **Seat the photograph in the bed.** Mask it to the frame's inner opening (canopy to mattress line, post to post), so there is no white gap above the footboard and no second set of posts across the photo (`unique-laptop-turn-11/22.png`). Or fill the opening edge to edge with the photo's own perspective.
3. **Clean the phone first screen.** Hide the header name pill and its "Book" until the hero has left, as the other two variants do. Then the screen holds one name, one place line, one button and the hint.
4. **Keep the warmth through the turn.** Set the bed on the tint (`#ECEBE5`) or a pale floor tone with its shadow, not pure white. Right now the first scroll drops from a sunlit room to an empty white stage.
5. **Small finish items:**
   - add hover and press feedback to the three glance rating links;
   - on the laptop, set the glance ratings as one line, since "5.0/5 Airbnb, 10 reviews" wraps alone onto a second line (`unique-laptop-s01.png`).

**Keep:**
- the img-015 laptop hero;
- the idea of the turn and its four sentences;
- the door sheet with its focus handling and the `/stay/` page;
- the courtyard masonry;
- the offset print pair;
- the quote stack;
- the gabled closing panel;
- the reduced-motion grid, as the model for the phone's pacing.

---

## Evidence index
- **Cold phone loads:** `cold.log`, `*-cold-t{500,1500,3000,6000}.png` (serial), and `*-phone-t*.png` (parallel run).
- **Phone walks:** `*-phone-sNN.png` with `*-walk.log` (scroll y, bar state, headings in view, canvas state).
- **Laptop walks:** `*-laptop-t2000.png`, `*-laptop-sNN.png`, `*-laptop-hover-cta.png`.
- **Reduced motion and JS off:** `*-phone-reduced-NN.png`, `*-phone-nojs-NN.png`.
- **States:** `states.log` with:
  - calm: `calm-phone-bar*.png`, `calm-phone-deluxe-*.png`, `calm-laptop-parallax-*.png`, `calm-laptop-slide-*.png`;
  - interactive: `interactive-*-palms-*.png`, `interactive-phone-tiles-*.png`, `interactive-phone-rooms-*.png`, `interactive-laptop-shelf-*.png`;
  - unique: `unique-*-turn-NN.png`, `unique-*-door-*.png`, `unique-*-quotes-*.png`, `unique-phone-nojs-stay.png`.
- **Tap-through:** "tap 1" in each `*-walk.log`. The third-party request was recorded and stubbed, never loaded.
- **Inspector:** `*-inspect.log` (`design-taste-frontend/scripts/inspect.mjs`, 1440 and 390). These are notes, not gates:
  - `still-page` on calm is expected;
  - `reduced-hidden` refers to the header mark and header button, which are hidden on the first screen by design; the hero title and button are visible under reduced motion in my frames;
  - `empty-screens` and `long-pin` on unique match my walk.

---
---

# Round 2

experience-critic 0.2.0 · station 4f (quick), round 2 · run `2026-10-midigama-01` · 2026-11-22
Pages: the same three files, as rebuilt in commit b0cce9b. Each variant's `notes.md` look-log ("4f round 1 → round 2") was read for what changed. Written without reading the other two reviewers' round-2 reports.

Evidence is in `reports/2026-10-midigama-01/experience/sea-you-surfers-nest/r2/`:
- PNG frames, which git ignores;
- the logs `calm-walk.log`, `interactive-walk.log`, `unique-walk.log`, `states.log`, `cold.log`, `palms.log` and `*-inspect.log`;
- the recipes `walk.mjs.txt`, `states.mjs.txt`, `cold.mjs.txt` and `palms.mjs.txt`.

The method was the same as round 1: phone 390×844 @2x with touch, a throttled cold load, a human-pace scroll, laptop 1440×900, hover, reduced motion, JS off, the booking tap-through with third-party requests stubbed, and the per-variant states. Interactive's shader was walked with `?palms`, as before.

**Machine load.** The other reviewers were running at the same time (load average 20–35), so:
- The first `states` run timed out and was re-run.
- Two throttled cold loads took over 140 s and were discarded. The cold loads in `cold.log` are a serial re-run at load average about 12.
- I use load timings only as notes; they belong to dimension 2, which the critic scores.

## Summary

| | calm | interactive | unique |
|---|---|---|---|
| **Dimension 8 (experience), round 2** | **8 / 10** (round 1: 8) | **8 / 10** (round 1: 7) | **8 / 10** (round 1: 7) |
| Pass / fail (this critic) | **pass** (no regression) | **pass** | **pass**, narrowly |
| Better than the current presence | yes | yes | yes |
| Taps to booking | 1 | 1 (groups: 2) | 1 (via the door: 2) |

**Experience ranking at 4f round 2: 1 calm · 2 interactive · 3 unique.** All three now clear the bar.
- **Calm** is still the clearest "surfers' nest" on a phone, and its rooms are now the page's second big moment.
- **Interactive's** hero now pulls, and it keeps the best booking choice of the three.
- **Unique** fixed its pacing and seated its photos. It is still the longest phone page and the least warm in the middle.

**Checked in every variant:**
- The hero CTA lands on `https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html` in one tap ("tap 1" in each walk log).
- `tel:` 0 and Agoda 0.
- Tap targets under 44 px: 0 (`states.log`).
- Only local hosts plus Google Fonts on load.

## Calm: 8/10, pass (no regression)

What changed against my round-1 list, checked on the page:
1. **Courtyard:** now a low 4:1 strip of the bench and cushion. It is no longer a screen of grey wall (`calm-laptop-s05.png`, phone `calm-phone-s04/05`). Fixed.
2. **The second half:** Breakfast sits inside the Ashly section as a small script heading (`calm-phone-s08`). The guests slideshow opens on Kenza's "just steps away from the sea" (`calm-phone-s09`). The ratings appear once as cards, in the glance, plus a compact copy in the bar's summary. Fixed.
3. **Phone bar:**
   - the panel is opaque, with one button;
   - it opens 284 px tall from y 499 (`calm-phone-bar-open.png`, `states.log`);
   - the bar steps aside once the closing's buttons are on screen (`calm-walk.log`: bar hidden from s11).

   Fixed.
4. **The full-label button** fits on one line at 390 (`calm-phone-s01/s02`). Fixed.
5. **"In every room"** is hidden on the phone and is one row of five icons on desktop. Fixed.

**Not regressed:**
- The phone first screen still has the board rack, the name, the business type (now the tagline, "A bed and breakfast in Midigama, on Sri Lanka's south coast.") and one slate button (`calm-phone-t3000.png`).
- The rooms are better than round 1: 1120 px galleries on the laptop (`calm-laptop-s02/s03`) and full-width on the phone. The Deluxe photo with the door open to the veranda now carries a whole screen.
- Reduced motion and JS off still give the finished page (`calm-phone-reduced-*`, `calm-phone-nojs-*`).

**One new note, not blocking:** the header is now on the first screen at both widths.
- On the phone it is a small script wordmark above the large script title, so the name appears twice (`calm-phone-t3000.png`).
- On desktop a header "See live dates" pill sits beside the hero's button (`calm-laptop-s00`).

The designer did this so nothing is hidden under reduced motion. It costs a little of the round-1 cleanliness but does not change the pull of the screen.

**Timing note (dimension 2, not mine):** calm's LCP is again the H1 in Grand Hotel, the slowest of the three. It was 8.9 s in the serial throttled run on a loaded machine, against 5.5 s in round 1 (`cold.log`).

**Polish (optional, not a fail list):**
1. On the phone, hide the header wordmark while the hero title is on screen. The reduced-motion concern can be met with `display:none` on the wordmark until scroll, rather than a hidden opacity.
2. Self-host and preload Grand Hotel at 4g, so the title is not the late LCP.

## Interactive: 8/10, pass

What changed against my round-1 list:
1. **The hero pulls now.**
   - The recrop fills the top half or more with fronds, graded darker and better defined (`interactive-laptop-s00.png`, `interactive-phone-s00.png`).
   - "Sea You Surfers Nest" is centred in Courgette, a tidier connected script than Kalam, over "Bed and breakfast | Midigama, Sri Lanka" and one bottle-green button.
   - The motion is now legible: on the laptop the palm band changes by **PSNR 16.7 dB in 1.5 s** (round 1: 23.3), while the table band stays effectively unchanged (54.8 dB) (`interactive-laptop-palms-0/1500/3000.png`). Side by side, the fronds visibly shift between frames.
   - Automatic gusts every 6–9 s mean it moves without a pointer.
   - **Cap lifted:** the first screen is clean and on-subject, and the main item registers.
2. **De-carded:**
   - the glance is one designed band (tagline, the spot quote large, one " | " included line, the address and "Open in Google Maps");
   - the ratings appear once, as large figures without boxes;
   - "In every room" is a plain icon list;
   - there are no resting shadows on tiles or cards (`interactive-phone-s01/s02`, `interactive-laptop-s01`).
3. **"Who's coming?"** appears once. The closing is the palms band with the closing line and three buttons (`interactive-laptop-s10`, `interactive-phone-s13`).
4. **Ratings:** once.
5. **Title:** Kalam replaced by Courgette.
6. **"Open in Google Maps":** moved up to phone screen 2.

**New:**
- A full-bleed carved doorway with the four-poster inside (img-051) opens the courtyard section and gives the page a second gear (`interactive-laptop-s04`).
- The shelf drags with inertia (`states.log`: scrollLeft 710 after a drag).

**States:**
- The tiles still switch the answer with the ring drawn in: the group answer is the whole house on Airbnb (`interactive-phone-tiles-group.png`).
- The pill is sticky and cross-fades the stage (`interactive-phone-rooms-standard.png`).
- The bar shows from screen 2 and works with JS off.
- Reduced motion keeps the still.

**One harness observation, not scored.** In the first, parallel walk under heavy machine load, the forced shader painted the palm band as a flat green gradient with a stair-stepped mask edge for several seconds (`interactive-phone-t1500/t3000/t6000.png`). I re-ran it serially under four conditions: network + CPU throttled, network only, CPU only, and none. **It did not recur**; every frame showed the real fronds (`palms.log`, `palms-*-*.png`). It is probably SwiftShader starved by three browsers. Cheap insurance would be to add `on` only after a first frame has been read back as non-uniform, or to fade in only after `load()` resolves and one frame has been drawn.

**Polish (optional):**
1. **The closing band inverts the hierarchy.** The primary Booking.com button is outlined on the dark shade, while the two Airbnb buttons are solid white (`interactive-laptop-s10`, `interactive-phone-s13`). Make Booking.com the solid one.
2. **On the phone the fronds are paler and move less** (PSNR 23.7 dB in 1.5 s, against 16.7 on the laptop). Apply the same grade and amplitude to the phone crop.

## Unique: 8/10, pass (narrowly)

What changed against my round-1 list:
1. **Pacing:**
   - **Phone:** the set-piece is 4058 px (round 1: 6020). Captions run from y 1477 to 4009, and there is no captionless exit (`states.log`). "Deluxe or Standard" arrives at phone screen 4.2 (round 1: 6.3) (`unique-walk.log`, s06), and the page is 15.2 phone screens (round 1: 17.5).
   - **Laptop:** the piece is 3958 px (round 1: 5643), and the rooms arrive at screen 5.
   - Fixed.
2. **The photograph sits in the bed:**
   - at each rest it fills the opening, post to post, from the footboard or side rail up to the canopy rail, and no drawn post crosses it (`unique-laptop-turn-09.png`, `unique-phone-s03/s04/s05`);
   - the white gap above the footboard is gone;
   - between rests the photos still cross-fade inside a rectangle, and you see two photos blended for a moment (`unique-laptop-turn-13.png`). That is acceptable in motion.

   Fixed.
3. **Phone first screen:** one name, the tagline, one button and the "Scroll, and the bed turns" hint. The header is gone until the hero leaves (`unique-phone-t3000.png`; `unique-walk.log` hero `firstScreen` lists one link). Fixed.
4. **Warmth:** the bed stands on the `#ECEBE5` tint with a contact shadow, not on pure white (`unique-laptop-s02/s03`). The drawn bed reads as painted wood, less like a configurator. Fixed.
5. **Small items:** "Open in Google Maps" and the address are now in the glance, on phone screen 2. The ratings still have no hover or press feedback (not re-measured as a gate).

**States:** the door still opens from "More" (phone) and "Book" (laptop) with focus on the Booking.com tile; Tab stays inside, Esc closes and returns focus (`states.log`). `/stay/` works with JS off. The quote stack still turns.

**Why only narrowly:**
- It is still the longest page on the phone (15.2 screens, against 10–11 for the other two).
- The middle (rooms, then masonry, prints, breakfast, Ashly) is long and evenly paced after the one big idea.
- On the laptop the first screen still carries a name pill and a "Book" button in the header beside the hero's button (`unique-laptop-s00`).
- One load-related frame: in the parallel walk the glance text overlapped the photo and bed at y 720 (`unique-laptop-s01.png`: "Fan and mosquito net" and "5.0/5 Airbnb" over the photograph). It did not appear in the serial dense frames at y 675 (`unique-laptop-turn-03`). It is a damping lag at low frame rates; clip the glance column or hold the bed to the right until the glance has passed.

**Polish (optional):**
1. Keep the bed out of the glance column at any frame rate. Pin its x to the right half from the first pull-back frame, rather than easing it there.
2. Trim the phone middle. Show the courtyard masonry at six photos instead of nine on the phone, and put the two room slideshows behind the same Deluxe | Standard switch, so the rooms take one screen, not two.
3. On the laptop first screen, let the header "Book" appear only once the hero button has scrolled away.

## Round 2 verdict

| variant | round 1 | round 2 | result |
|---|---|---|---|
| calm | 8 | **8** | **PASS** |
| interactive | 7 | **8** | **PASS** |
| unique | 7 | **8** | **PASS** |

All three are clearly better than the Google and Booking.com listings, and all three are 1 tap to the live dates. From the experience side, any of them can go to the human pick.
