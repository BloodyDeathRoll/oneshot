# Coconut Surf Inn: experience critique (4f pre-score)

experience-critic 0.2.0 · station 4f (quick), round 1 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-05
Pages: `sites/coconut-surf-inn-guest-house-and-restaurant/mockups/{calm,interactive,unique}/dist/index.html`, served on :8921 / :8922 / :8923.
Compared with: the business's current presence. It has no website, so that means the three folds a traveller meets today: Booking.com (`dossier/coconut-surf-inn-guest-house-and-restaurant/funnel/walk/05-booking-com-fold.png`), the Google Maps listing (`01-google-listing-fold.png`) and Airbnb (`06-airbnb-fold.png`), with audit F1–F9. The gold pages were not re-rendered this round; the gold calibration (references.md) was applied.
Written without reading the critic's or the visual-critic's report.

Frames are in `reports/2026-10-midigama-01/experience/coconut-surf-inn-guest-house-and-restaurant/` (git-ignored PNGs, plus `calm-walk.log`, `interactive-walk.log`, `unique-walk.log` and `states.log`). Recipes: the scratch Playwright scripts `walk.mjs` (cold phone load, human-pace scroll at 0.7 screen per step, laptop, hover, reduced motion, JS off) and `states.mjs` (calm pan over 15 s, interactive depth parallax with `?depth=force` under pointer and on load, the sleep tiles, the phone bar, the unique set-piece scrolled in 14 steps on both widths, the "Find your room" sheet, `/rooms/` with JS off, and the hero tap-through). Chromium with SwiftShader WebGL. Phone: 390×844 @2x with touch, CDP 1.6 Mbps / 150 ms RTT and 4× CPU for the cold load. Laptop: 1440×900.

Timing note: the `load` event came at 6.3 s on all three. Interactive and unique show their complete first screen in the first frame (requested at 0.5 s). Calm does not (see its timeline).

## Summary

| | calm "The view from the roof" | interactive "Under the thatch" | unique "Round the clock" |
|---|---|---|---|
| **Dimension 8 (experience)** | **8 / 10** | **7 / 10** | **8 / 10** |
| Better than the current presence (Booking.com + Google + Airbnb) | **yes** | **yes** | **yes** |
| Pass / fail (this critic) | **pass**, narrowly | **fail**: below 8 | **pass** |
| Taps to book | 1 (hero → Booking.com listing) | 1 | 1 |
| Hard fails (dimension-8 side) | none | below 8/10 | none |

**Experience ranking at 4f: 1 unique · 2 calm · 3 interactive.**
- **Unique** is the only page where you live a day at the house. You scroll, the photograph turns from the afternoon under the thatch to the sunset, the lit house at night, the restaurant at 7:30 and the break, and the sign's orange sun steps down the clock. It is the one moment in this run's three Coconut pages that a traveller would remember.
- **Calm** has the best first screen on a phone: the view pans once along the beach like a turning head and comes to rest on the whitewater over the reef (`calm-phone-pan-0…15000.png`). After that it is the longest page of the three (19 phone screens), with a six-screen run of rooms.
- **Interactive** has the best booking tool ("How do you like to sleep?" answers fan vs A/C in one tap) and a depth effect you can really see on a laptop. On a phone, though, its first screen is half grey concrete floor under a thin marker-pen title, and the effect is only a 6 s drift.

**Video and photo hard fail: does not apply.** No usable own video exists (concepts §2: all three clips are third-party or another business's). All three first screens carry a business-owned 1920 px photograph (img-009, img-102). I accept the concept's reasons.

**One thing for the human at the pick:** calm and unique open on the **same photograph** (img-009) with nearly the same crop. Side by side on the laptop (`calm-laptop-t2000.png` vs `unique-laptop-t2000.png`), the only difference is that unique fades the sky to white and sets the type there. Choosing between them is choosing what comes after the first screen.

**The current presence, honestly.** The Booking.com fold is a blue search bar, an empty grey entrance hall in a 1/45 carousel, "8.5 Very good · 142 reviews" and a yellow "Choose dates to see prices". Google is a map, "4.8 (88)", Directions / Start / **Call**, and a dim hall photo. Airbnb is a dark bedroom (1/29), "Shared bathroom", and "Hosted by Chinthaka · 13 years hosting". **None of them shows the sea.** Each mockup opens on it. Where the current presence is still better:
- Booking.com puts live prices on the same page once the dates are in. On all three mockups they are one tap away, on Booking.com.
- Google has **Call** as a labelled button on its first screen. All three mockups have only a phone icon in the header on the first screen, and the labelled Call arrives one scroll down.
- Airbnb names the host with his face on its first screen. On the mockups Chinthaka appears only in words, about ten screens down.

---

## 1. Calm: "The view from the roof", 8/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| 0.5 s, 1.5 s | Header, "Coconut Surf Inn" in Satisfy (dark ink on the sky), "Gurubebila, between Midigama and Weligama", the leaf-green "Check dates on Booking.com" button (56 px tall, y 306). Behind them, the top three quarters of img-009 (sky and palms). **The bottom quarter is a flat pale-blue box**: the photograph has not arrived there yet. | `calm-phone-t500.png`, `-t1500.png` |
| 3 s | The photo has painted down to the beach. A strip of flat blue is still at the foot. | `calm-phone-t3000.png` |
| 6 s | Complete: the sea, the blue-tarp shacks and the green, with the pan under way. | `calm-phone-t6000.png` |
| 0 → 15 s | The pan. The crop travels from the left palms along the beach and rests on the centre-right, where the whitewater breaks on the reef (`translateX -491 px` at rest, `states.log`). It plays once and does not loop. | `calm-phone-pan-0/4000/8000/15000.png` |

Feeling: you are on the roof, turning your head along the beach. It is clean, has one action and is not a template section. The pan is this page's one moment of motion and it is the right one. It is the best phone first screen of the three. The text and the button are usable from the first frame. Only the picture is late, but for the first ~3 s on slow 4G the visitor sees palms over a blue box rather than the sea.

On the laptop (`calm-laptop-t2000.png`) the view is full-bleed with the horizon low and the reef whitewater visible. Two flaws:
- The title's "C" sits on the big palm crown at centre-left.
- The bottom edge keeps the power line and the tin roofs (concept §4.1 names exactly this as its failure risk).

### Walk (phone: `calm-phone-s00…s27.png`, page 16,300 px = about 19 screens, the longest)
- **s01–s03, 13:00 check-in:** the script title, the tagline, a centred " | " details line, then two rating cards and Book + Call. What, where, trust and action all arrive within two scrolls.
  - The rating cards stack "142 reviews / 4 Nov 2026" in three small lines beside the score (s02), which is fussy.
- **s03–s11, Six kinds of room:** the A/C group first (a snowflake icon with a plain line), then the fan group. Every room has a full-width 4:5 slideshow, beds | sleeps | m², its note and its own button.
  - **This is where attention drops.** Six rooms in the same layout run for about seven screens. The first, Deluxe with Balcony, sells well (red cushions, the balcony door, s04). Then come close-ups of a green towel on a bed and a bare bedroom, and the fan rooms lead with a purple towel and a dim mosquito net (s09–s10).
  - The fan / A/C split is honest and plain, which fixes audit F5.
- **s11–s13, Inside the house:** the light-well with its jade channel, then three small 4:5 prints. It is a lift.
- **s13–s14, On the roof:** img-103 full-bleed (the hammock under the thatch, the swing, the sea). It is the second-best moment on the page, and it is where a traveller starts wanting to be there.
- **s15–s17:** By the beach (sunset palms, turtle hatchlings with locals), then the restaurant slideshow and the family. Warm.
- **s18–s20, From 7:30, the break:** `spot` set large, `season` under it, the drawn headline (0.4–0.6 m, knee-high, swell, wind) and Rosa's widget. It works, but on a phone it is the third screen of grey text in a row.
- **s21–s27:** guests (three dated ratings again, then one quote at a time), Getting here, the closing line in the script, and the footer with buttons. Good.
- **Phone bar:** "Check dates on Booking.com" + a phone icon. It is hidden at s00–s01 and visible from s02 (y 1182) to the end (`calm-walk.log`). Nothing covers content.

### The story after one scroll
What, where, trust and how to book: yes. Why this place: the view says it, "the sea from the roof". Cost: honestly "live dates on Booking.com". The surf is in the picture (the whitewater) and in words at screen 18.

### Wanting to go
Lifts: the pan ending on the reef, the light-well, the roof band, the sunset. Deflates: seven screens of room slideshows that look alike, led for four of the six rooms by bed close-ups.

### Booking
1 tap: the hero link goes to `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html`, and the first request after the tap is that URL (`states.log`). This matches the audit (`engine`, 1 click). There are 14 Booking.com links on the page, one per room. `tel:+94778921396` sits beside every main action and in the bar. The visitor knows fan vs A/C before the tap, which Booking.com's own description gets wrong.

### Motion and states
- On the laptop, 87 of 94 links and buttons carry transitions. The hero CTA lifts 1 px and its shadow deepens (`calm-laptop-hover-cta.png`). Nav links and the wordmark have none.
- Slideshows slide (`calm-phone-slide-mid/next.png`). The bar slides up.
- Reduced motion: no pan, a composed still (`calm-phone-reduced-*`).
- **JS off has a visible bug:** the transparent fixed header's white wordmark "Coconut Surf Inn" overprints the body text "Midigama and Weligama, on the south coast of Sri Lanka" (`calm-phone-nojs-s1.png`). The bar becomes static at the foot (`nojs` in the walk log), which is correct.
- No main item, which is correct for calm.

### Score: 8, better than the current presence: yes
The first screen is engaging, it is clearly better than any listing, and it is 1 tap to book. It is held at 8 by a middle that sags (seven screens of near-identical room blocks) and a page that is too long for a phone.

**Fix list (biggest effect first)**
1. Compress the rooms on the phone. One slideshow per group (A/C, fan), with the rooms as compact rows under it (label | beds | sleeps | m² | button). Or lead every room's slideshow with its best wide shot, not a bed close-up. Seven screens should become about three.
2. Fix the hero's slow paint. Ship a phone hero small enough to arrive whole within ~1.5 s on the throttled profile (or a tiny blurred placeholder of the same crop, not a flat colour box), so the sea is on screen before the visitor scrolls.
3. Laptop crop: move the title off the palm crown, and crop above the power line and tin roofs at the bottom.
4. Fix the JS-off header: when JS is off the header should not be fixed, or it should have a solid ground once scrolled, so the wordmark never sits on body text.
5. Put a labelled "Call" in the first screen on the phone (a small text button under the CTA, or show the bar from load). Google's Call is on its first screen, and the audit's secondary action is `tel`.

**Keep:** the one-time pan ending on the reef; Satisfy titles in the ink; the leaf-green accent used only for booking; the plain A/C / fan groups; the roof band; the footer.

---

## 2. Interactive: "Under the thatch", 7/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| 0.5 s | img-102 complete: the thatch fringe across the top, a dark pillar left, palms and the sea in the middle band. Below that is the parapet, then about 40% of the screen of grey concrete floor with leaf shadows. "Coconut Surf Inn" in Shadows Into Light Two, white, at y ≈ 440. The town, then the saffron "Check dates on Booking.com" at y 548. | `interactive-phone-t500.png` |
| 1.5 s → 3 s | The depth canvas fades in (opacity 0.83 → 1, `interactive-walk.log`). | `-t1500`, `-t3000` |

**The main item, walked.**
- **Laptop, pointer (`?depth=force`):** moving the pointer from far left to far right shifts the near layers against the sea. Whole-frame PSNR is 16.2 dB between the two frames, so the change is plainly visible (`interactive-laptop-depth-left.png` vs `-right.png`). The pillar slides across the horizon and uncovers sea, and the fringe moves against the sky. I saw no tearing at the fringe. It reads as "the photo was taken in 3D", which is the concept's own test. On the laptop the hero is strong: the thatch frames the sea, and the swing and the planter give depth (`interactive-laptop-t2000.png`).
- **Phone:** there is no pointer, and tilt needs a permission tap that nothing on the page invites. The visitor gets the one-time drift: PSNR 20.8 dB between 0 s and 3 s, and 20.5 dB from 3 s to 6.5 s (`interactive-phone-drift-0/3000/6500.png`). It is noticeable if you look for it. For most visitors on a phone the hero is a still photograph.

**As a still on a phone, the first screen half pulls you in.** The sea under the thatch is the hook, but the lower ~40% is bare concrete floor and a planter box. The title face is thin, airy handwriting that reads as a casual marker label. Calibration asks for "tasteful and readable" and judged Patrick Hand in the same register as not great, and this is close to it. The hero is not a cookie-cutter section, so the method-5 cap does not apply. It is still the weakest first impression of the three on a phone.

### Walk (phone: `interactive-phone-s00…s21.png`, page 12,848 px = about 15 screens, the shortest)
- **s01:** the concrete floor fills most of the screen before "13:00, check-in" arrives. This is a dead screen.
- **s01–s03, 13:00 check-in:** four stacked grey icon cards (Coconuts, restaurant hours, "Live dates and prices / On Booking.com", ratings), then Book + Call.
  - This is the most templated block of the set. "Live dates and prices" as a fact card is filler. The ratings card crams "8.5/10 and 4.8/5 / Booking.com, 142 · Google, 88 · 4 Nov 2026" into small text.
- **s03–s06, How do you like to sleep?:** the best moment on the page.
  - Three tiles: "Air conditioning and hot water" (open by default), "A fan and cold water", "Three or four of us".
  - Tapping "A fan and cold water" fills it saffron (`interactive-phone-sleep-fan-mid/-fan.png`). The chips below change to Budget Single and Budget Double (`states.log`). The room shows "Fan / No A/C / No hot water" chips and its own button (`-sleep-fan-viewer.png`).
  - "Three or four of us" gives the 2+1 room and the Family room. This answers the audit's F5 better than any listing, and in one tap.
- **s06–s08, Inside the house:** the light-well, then a swipe row of 4:5 veranda prints (hammocks, a surfboard by a red door).
- **s08–s09, On the roof:** benches, then Erin's rooftop quote and a 3-photo slideshow. On the phone, the roof's best photograph (img-102) has already been spent on the hero.
- **s10–s11, By the beach:** the sunset band, full-bleed. A lift.
- **s12–s14:** the restaurant (purple benches, saffron cushions), Janno's breakfast quote, and the house lit at night (img-099), the best colour on the page.
- **s14–s17:** the break, Rosa, amenities, then "11:00, check-out" with three rating cards and a swipe row of quotes with peek.
- **s18–s21:** Getting here, the closing line in the thin hand face (five lines tall at 390 px), and the footer.
- **Phone bar:** "Check dates on Booking.com" + phone + ˄. It is visible from s02 (`interactive-walk.log`). The ˄ opens the audit-ordered summary: what + where, spot, restaurant, live dates, ratings (`interactive-phone-bar-open.png`).

### Booking
- 1 tap: the hero link goes to the dossier's Booking.com URL, and that is the first request after the tap (`states.log`).
- From the tiles, 2 taps: a tile, then "Check dates on Booking.com" (or 3 taps with a room chip).
- The price is honestly "live dates". Fan vs A/C is known before the tap.

### Motion and states
- On the laptop, 84 of 89 interactive elements have transitions. The wordmark and the two rating links have none.
- The CTA lifts 2 px on hover with a deeper shadow (`interactive-laptop-hover-cta.png`).
- The tile fill, the chip pill and the stage cross-fade are all smooth (`-sleep-fan-mid.png`).
- Reduced motion: the canvas stays at opacity 0, so the still photo shows (`interactive-walk.log`).
- JS off: the three groups stack with headings and buttons, which reads well (`interactive-phone-nojs-s1/s2.png`).

### Score: 7, better than the current presence: yes
It has the best booking moment and a real, visible main item on a laptop. On the phone, where the traveller is, the main item barely registers. The first screen is half floor under a thin marker-style title, the second screen is the rest of the floor, and the check-in block is a stack of cards. It is pleasant and useful, but it does not make you want to be there until the sunset band, ten screens in.

**Fix list**
1. Recrop the phone hero: move the crop down by the concrete. Put the horizon in the upper-middle with the fringe on top, and end the frame at the parapet. Or put the title block on the floor area so it isn't dead space. Then the phone's first screen is under-thatch-to-sea with no floor below it.
2. Replace Shadows Into Light Two for the hero title, the closing line and the section titles with a fuller, more refined hand at the same sizes. Keep the airy face, if at all, for small labels.
3. Give the phone a felt main item: a slow ±6 px eye drift that loops gently while the hero is in view (never on reduced motion), or scroll-linked depth over the first 300 px of scroll. That way a phone visitor sees the layers move without granting tilt.
4. Replace the four stacked fact cards with one " | " line plus the rating pair, as calm does. The tiles are the interactive moment, so the cards in front of them only add chrome.
5. Add a labelled Call to the first screen, as for calm.

**Keep:** the "How do you like to sleep?" tiles and the Fan / No A/C / No hot water chips; the depth parallax on the laptop; the saffron used only for booking; the night photo of the house; the bar's ˄ summary.

---

## 3. Unique: "Round the clock", 8/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| 0.5 s → 6 s | White page: wordmark "Coconut Surf Inn" (Caveat) top left with the round vermilion Call button, then **"Coconut Surf Inn" again**, large and centred, the town line, and the vermilion "Check dates on Booking.com" at y 208. Below, img-009 rises out of the white: the palm crowns stand up into the faded sky, then the sea, the blue-tarp shacks and the green at the foot. Complete in the first frame. Nothing moves. | `unique-phone-t500…t6000.png` |

Feeling: calm, bright and clearly the sea. The dissolve reads as the photograph's sky becoming the page, not as fog, because img-009's overcast sky is already pale. The button sits high (y 208), well inside the first screen. Two things weaken it:
- **The name is on screen twice, in the same face, 150 px apart.** The header wordmark and the centred title are both Caveat, and they read as an echo.
- On the phone, the 9:16 crop leaves the sea and the reef in the bottom 25%, small. The palms carry the frame.

On the laptop (`unique-laptop-t2000.png`) the type sits in the white top band and the view fills the rest. It is clean, but it is very close to calm's laptop first screen (same photo, same crop region). The power line and roofs show at the bottom here too.

### The main item: the set-piece, walked
Phone (`unique-phone-pin-00…14.png`) and laptop (`unique-laptop-pin-00…14.png`), each scrolled through `#stay` in 14 steps. The pin is on (`pin=true`), and the WebGL canvas is at opacity 1 during the pin (`states.log`).
- **Laptop:** the text column scrolls on the left, the clock line runs down the middle, and the photograph is pinned on the right half. The frames turn: thatch and hammock (The afternoon) → sunset palms → the house lit at night (Until 22:00) → the restaurant with the sea (From 7:30) → the view to the break. The orange sun disc steps down the clock at each time.
  - This is the strongest sequence in the run for Coconut, and it tells what no listing says: what a day here is like.
  - Mid-change (`unique-laptop-pin-02.png`) the wipe shows as a reddish smudge rising from the **bottom** of the frame over the hammock photo. It does not read as a band from the horizon. It looks like a stain for the moment it is visible.
- **Phone:** the photo is pinned in the top ~half, with the clock row under it and the text scrolling beneath. The transitions are clean on the phone frames.
  - The reading window between the clock row and the bar is about a third of the screen, so each block's text is read through a slot (`unique-phone-pin-03`, `-09`).
  - The sticky photo makes up for it: you keep looking at the place while you read about it.
- **Exit:** the pinned frame scrolls away and "Today on Coconuts" follows directly with the forecast. The pin's last frame (the break) hands straight to today's surf, which is a good ending.

The method-5 bar (a main item from the business's own media, plus micro-animations) is met. The set-piece is felt, it is all the business's own 1920 px photographs, and the dots animate through their `::before`.

### Walk (phone: `unique-phone-s00…s23.png`, page 14,094 px = about 17 screens)
- **s01–s03, 13:00 check-in:** one paragraph of facts in the text face (what, where, Coconuts, restaurant hours, live dates), then three dated rating pills on one line each, then Book + Call. It is the cleanest booking head of the three. The rating rows ("8.5/10 Booking.com | 142 reviews | 4 Nov 2026") are compact.
- **s03–s09, Six kinds of room:** the slideshows carry a printed chip ("A/C | Hot water" or "Fan") on the photo's corner, with the text under each and its own button. Fan vs A/C is legible without reading.
  - It is still about six screens of rooms, and the fan rooms lead with the same weak purple-towel and net photographs as calm.
- **s09–s11, Inside the house:** a true masonry of the light-well and verandas, with the text in a narrow column. Calm and good.
- **s11–s18:** the set-piece (above), then the forecast and the amenities as one " | " paragraph.
- **s18–s20, 11:00 check-out:** three ratings and one quote at a time (1/12 with arrows).
- **s20–s23:** the sign (img-002) as a matted print beside "Getting here". It is the brand's own mark at the end, and a nice touch. Then the closing in Caveat, the vermilion button + round Call, and the footer.
- **Phone bar:** "Check dates on Booking.com" + "Find your room". It is visible from s01 (y 591), earlier than the other two (`unique-walk.log`). The phone icon is the header's round button.

### Booking
- 1 tap: the hero link goes to the dossier's Booking.com URL, and that is the first request after the tap (`states.log`).
- **"Find your room"** (bar or section 3) opens a bottom sheet over the page (`unique-phone-finder-mid/-finder.png`): "How many are coming?" with 1 Just me | 2 Two of us | 3 Three | 4 Four | ? Not sure.
  - Focus lands on the first tile (`states.log`: `tile:1 Just me`).
  - "2" lists the rooms that sleep two or more, each with a thumbnail, its chips and "Check dates on Booking.com" (`-finder-2.png`).
  - "Not sure" shows the closing line plus a Call pill **and** a round Call button side by side, which is redundant (`-finder-ns.png`).
  - Esc closes the sheet and returns focus to the bar button.
  - With JS off, `/rooms/` is a real page listing the rooms with "Back to Coconut Surf Inn" (`unique-phone-nojs-rooms.png`).
- Taps to a chosen room's dates: 3 (bar → tile → "Check dates"). It is the kindest step in the set for a group deciding how many beds they need.

### Motion and states
- On the laptop, 61 of 102 interactive elements carry a transition on the element itself. The other 41 are mostly slideshow and review dots, which animate their `::before` (`.dot::before{transition:width .3s}`), so in practice everything but the wordmark and the Rosa credit has a state.
- The CTA hover adds a vermilion glow shadow but no lift (`unique-laptop-hover-cta.png`). It is the flattest hover of the three.
- Reduced motion: no pin; the five moments stack as blocks (`unique-phone-reduced-s2.png`).
- JS off: a clean page, the bar static, no overprint (`unique-phone-nojs-*`).

### Score: 8, better than the current presence: yes
The first screen is clean and bright with one action. The middle is the only stretch in the three mockups that makes you feel the place hour by hour. Booking is 1 tap, with a humane finder for groups. It is held at 8 by the doubled name in the hero, a phone crop where the sea is small, the mid-wipe smudge on the laptop, and a room run as long as calm's.

**Fix list (biggest effect first)**
1. Remove the doubled name on the first screen. Hide the header wordmark while the hero title is in view (show it once the title scrolls off), or set the centred title as the place line and keep the wordmark.
2. Phone hero crop: give the sea and the reef more of the frame. Start the photograph higher, or use a 4:5 crop under a shorter white band, so the whitewater is not a strip at the foot.
3. Make the wipe read as the concept says, a soft band moving out from each photo's horizon. If that can't be done, use a clean cross-fade. As captured it is a reddish smudge rising from the bottom edge (`unique-laptop-pin-02.png`).
4. Shorten the rooms on the phone, as for calm. Use one shared slideshow per group, or lead each room with its best wide shot. The fan rooms' net close-ups should not take a full slideshow width each.
5. Small finishes:
   - On the phone, give the pinned text a little more room: shrink the pinned photo to ~45 svh, or drop the clock labels to one line.
   - Remove the second Call in the "Not sure" step.
   - Give the hero CTA the same 1–2 px lift on hover as the other buttons.

**Keep:** the set-piece and the sun disc on the clock; the dissolve of the sky into the page; the vermilion from the inn's sign used only for booking and the marker; the compact rating pills; the "Find your room" sheet with "Not sure"; the matted sign print by "Getting here".

---

## What the designer prompt got wrong (one paragraph, quotable)
All three pages tell the house well and book in one tap. All three also lose the traveller in the same place: the six-room run on a phone, about seven screens of full-width slideshows that look alike, four of them led by a bed close-up or a dim mosquito net. The designer should be told to compress lodging offers on the phone to one block per room group, and to lead with each room's widest, brightest photograph. Two process notes:
- Calm and unique were built in parallel on the same hero photograph with near-identical crops, so the human is shown two of the same first screens. The concepts must keep the first-screen photograph distinct across variants, not only the first-screen device.
- The interactive main item was tuned for the pointer. On the phone, where the persona lives, it is a 6 s drift and then a still. A main item has to be felt on a phone without a permission tap.
