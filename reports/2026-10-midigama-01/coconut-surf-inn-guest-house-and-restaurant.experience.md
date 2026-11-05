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

---

## Round 2 (station 4f)

experience-critic 0.2.0 · station 4f (quick), round 2 · 2026-11-05 · after the 4e loop-back (designer 0.7.1, commit 694b188).
Pages: the same three `sites/coconut-surf-inn-guest-house-and-restaurant/mockups/{calm,interactive,unique}/dist/index.html`, served on :8921 / :8922 / :8923 (unique also `/rooms/`). Inputs read: my round-1 section above and each mockup's `notes.md` round-2 section. Comparison bar unchanged: the Booking.com, Google and Airbnb folds (`dossier/…/funnel/walk/01`, `05`, `06`). Written without reading the round-2 critic or visual-critic reports.

Evidence is in `reports/2026-10-midigama-01/experience/coconut-surf-inn-guest-house-and-restaurant/r2/` (git-ignored PNGs): `<variant>-walk.log` and `states.log`, the frames, and contact sheets in `r2/sheets/`. The recipes are the same scratch Playwright scripts as round 1, re-run unchanged (`walk.mjs`: cold phone load on CDP 1.6 Mbps / 150 ms / 4× CPU, human-pace scroll at 0.7 screen per step, laptop 1440×900, hover, reduced motion, JS off; `states.mjs`: calm pan, interactive depth on pointer and drift, sleep tiles, phone bar, unique set-piece in 14 steps on both widths, the "Find your room" sheet, `/rooms/` with JS off, hero tap-through). One addition, `drift.mjs`: the interactive phone hero at 8, 12, 16 and 24 s. Chromium with SwiftShader WebGL.

### Summary, round 2

| | calm "The view from the roof" | interactive "Under the thatch" | unique "Round the clock" |
|---|---|---|---|
| **Dimension 8 (experience)** | **8 / 10** (r1: 8) | **8 / 10** (r1: 7) | **8 / 10** (r1: 8) |
| Better than the current presence | **yes** | **yes** | **yes** |
| Pass / fail (this critic) | **pass** | **pass** | **pass** |
| Taps to book | 1 (hero → Booking.com listing) | 1 | 1 |
| Hard fails (dimension-8 side) | none | none | none |
| Phone page length | 14,214 px, about 17 screens (r1: 16,300) | 12,398 px, about 15 (r1: 12,848) | 12,830 px, about 15 (r1: 14,094) |

**Experience ranking at 4f, round 2: 1 unique · 2 interactive · 3 calm.** All three now pass, none at 9.
- **Unique** fixed all five items on my list. The set-piece is still the one moment in the three pages that a traveller would remember. It is held at 8 by the A/C room run, which still opens on bed close-ups.
- **Interactive** moved the most. The floor is gone from the phone hero, the title face is a real sign-painted hand, the depth now moves on a phone without a tap, and the check-in cards are gone. It is the shortest page and has the best booking tool.
- **Calm** fixed the cold paint, the room run and the JS-off header, and its middle now has a rhythm. But the new crop that got rid of the wires also took away most of the sea. Its first screen is now mostly sky on both widths, and it pulls less than it did in round 1.

**The current presence, round 2.** Unchanged since round 1, and each mockup still beats it at a glance: none of the listings shows the sea. Two things on the listings are still better:
- Google's labelled **Call** is on its first screen. On all three mockups the header's call icon is now *hidden* while the hero is in view (calm notes, round 12; interactive R2-3; unique round 7). My round-1 fix 5 asked for the opposite. A labelled Call now arrives one scroll down (calm s02, interactive s01, unique s02).
- Airbnb's host face is still not matched. There is no own photograph of the hosts (gaps), so this is not a design defect.

**Video and photo hard fail: still does not apply.** There is no usable own video, and every first screen carries img-009 or img-102 at 1920 px.

---

### R2.1 Calm, 8/10: pass, better than the current presence: yes

**Round-1 fixes, checked**
| # | Round-1 complaint | Round 2 | Evidence |
|---|---|---|---|
| 1 | Seven screens of near-identical room slideshows, led by bed close-ups | **Fixed.** The A/C rooms stack with 3:2 photos, and the two fan rooms sit side by side at half width with dots only. The run is s03–s07, about 4.5 phone screens. On the laptop it is one 4-up row plus one fan row, about 1.9 screens. Leads: the rattan balcony, the veranda with hammock and board, the whole 2+1 room. | `calm-phone-s03…s07.png`, `calm-laptop-s02/s03.png`, `sheets/calm-walk-a.png` |
| 2 | Slow hero paint: a flat blue box for ~3 s on slow 4G | **Fixed.** At 0.5 s the foot of the hero is a blurred image of the view, not a flat box. At 1.5 s the photograph is complete. | `calm-phone-t500/t1500.png`, `sheets/calm-cold.png` |
| 3 | Laptop: title on the palm crown; power line and tin roofs at the foot | **Fixed, at a cost.** The title is now ink on open sky and the wires are gone. But the crop stops at the horizon, so about 85% of the laptop first screen is sky and the sea is a thin strip at the foot. The reef whitewater is barely in frame. | `calm-laptop-t2000.png`, `sheets/laps.png` |
| 4 | JS off: the white wordmark overprinted body text | **Fixed.** With JS off the header scrolls away, and nothing overprints. | `calm-phone-nojs-s1.png` |
| 5 | A labelled Call on the first phone screen | **Not done, deliberately.** The call icon is hidden during the hero. The labelled Call comes at s02. | `calm-phone-s00/s02.png`, notes round 12 |

**Timeline (phone, throttled):**
- 0.5 s: the type and the leaf-green button are on the sky, over a soft blurred view.
- 1.5 s: the full photograph, with palms against blue and a strip of sea at y ≈ 790 of 844.
- 0 → 15 s: the pan moves from the left palms to the right palms and the green, and ends with the sea along the foot (`calm-phone-pan-0…15000.png`, PSNR 12.2 dB start to end). The whitewater is faint at the end frame.

In round 1 the pan ended on the reef breaking white, and that was the hook. Now the frame is palms and sky, with the sea as a band. It is still clean, still one action, and still not a template section, so the method-5 cap does not apply. But it is a postcard of palms more than "the sea from the roof".

**Walk (phone, `calm-phone-s00…s25`):**
- s01–s02: check-in, the " | " details line, the two rating cards, and Book + Call.
- s03–s07: rooms (above). Attention holds this time.
- s08: inside the house.
- s09–s10: the roof band. Fixed: the hammock is now whole.
- s11: **the sunset, full-bleed.**
- s13: **the house lit at night, full-bleed,** with "Until 22:00 / The restaurant upstairs" in white on its black sky. It is the best new moment on the page: day, sunset, then night, as the concept intends.
- s14–s16: the restaurant slideshow, then the Eranga family with Meagan's quote. This is the one remaining text-heavy stretch, about 1.5 screens of grey text.
- s16–s18: the break and Rosa.
- s19–s20: check-out, with one quote at a time. The quote fills a whole screen.
- s21–s23: getting here, the closing line, the footer.
- Phone bar: visible from s02 (y 1182) to the end, and it covers nothing (`calm-walk.log`).

**Booking:** 1 tap. The hero link goes to the dossier's Booking.com URL, and that is the first request after the tap (`states.log`). There are 14 Booking.com links and one `tel:+94778921396`.

**Motion:**
- On the laptop, 86 of 93 links and buttons carry transitions. The exceptions are the skip link, the wordmark, three nav links, the top Call and the Rosa credit.
- The hero CTA lifts 1 px with a deeper shadow (`calm-laptop-hover-cta.png`). Slides slide.
- Reduced motion: no pan, a composed still (`calm-phone-reduced-hero.png`).

**Score: 8, better than the current presence: yes.** The middle is now the best-paced of the three: rooms in about four screens, then the roof, the sunset and the night house as three full-bleed beats. What keeps it at 8, and stops it climbing, is the first screen. It has lost its sea. A traveller sees palms and sky, and the surf that the concept is named for is a strip.

**Fix list (biggest effect first)**
1. Give the sea back to the first screen without bringing back the wires. On the phone, let the pan end lower or later on the reef whitewater (the round-1 end frame minus the tuk-tuks). On the laptop, crop so the horizon sits near two-thirds, not at the foot. A bottom gradient into the page, or a crop that ends on the sea and the green just above the tarp line, are both cleaner than 85% sky.
2. A labelled Call in the first phone screen, a small ghost button under the CTA. The audit's secondary action is `tel`, and Google already shows it there. Hiding the icon is the opposite of the round-1 fix.
3. The Eranga block on the phone: shorten it to two short paragraphs, or set Meagan's quote as the block's lead in a larger size, so s14–s16 is not three screens of body text.
4. Check-out reviews on the phone: cap the quote height (or use a smaller size) so one review is not a whole screen (s19–s20).
5. Header: the white wordmark plus the script title say the name twice on the first screen (`calm-phone-s00.png`). Unique solved this by hiding the wordmark until the hero is gone. Do the same here.

**Keep:** the blurred placeholder; the 4-up / fan-row rooms and the wide leads; the sunset and the night-house full-bleed bands; the JS-off header; the one-time pan.

---

### R2.2 Interactive, 8/10: pass, better than the current presence: yes

**Round-1 fixes, checked**
| # | Round-1 complaint | Round 2 | Evidence |
|---|---|---|---|
| 1 | The phone hero was 40% concrete floor | **Fixed.** The 600×1120 crop runs from the thatch fringe to the sea and the parapet, and the title sits on the parapet. No dead floor screen follows: s01 is already check-in. | `interactive-phone-t1500…t6000.png`, `-s00/s01.png` |
| 2 | Thin marker-pen title face | **Fixed.** Merienda 700 is a full-bodied, sign-painted hand. It is readable at 40 px on the phone and suits a thatched roof. | `sheets/interactive-cold.png` |
| 3 | The main item barely registered on a phone | **Fixed.** The idle drift now runs continuously while the hero is in view. PSNR between phone frames is 18.7 dB (0→3 s), 17.5 dB (3→6.5 s), 17.4 dB (8→12 s) and 18.4 dB (16→24 s), as large as the laptop pointer sweep (16.4 dB, `interactive-laptop-depth-left/right.png`). There is no tearing at the fringe or the pillar. The canvas is live (`depth live op=1`) on both widths without `?depth=force` (`states.log`). | `interactive-phone-drift-*.png` |
| 4 | Four stacked grey fact cards | **Fixed.** Check-in is now the tagline, one " | " line, Book + Call, and the two ratings set large (8.5/10, 4.8/5) as links. | `interactive-phone-s01/s02.png` |
| 5 | A labelled Call on the first screen | **Not done.** The icon is hidden in the hero. A labelled "Call +94 77 892 1396" comes at s01. | `interactive-phone-s01.png` |

**Timeline (phone, throttled):**
- **0.5 s: a flat grey box with a dark blurred shade blob** in the lower third, and the title in the fallback sans (`interactive-phone-t500.png`). Below the photo, the scrim shows on its own as a smudge. This is the one new flaw.
- 1.5 s: the photograph is complete. The thatch fringe frames palms and sea, with Merienda on the parapet and the saffron button at y 684.
- 6 s: the canvas is live (`interactive-walk.log`).

From 1.5 s the first screen pulls you in: you stand under the roof looking at the sea, and the layers breathe. In round 1 this was the weakest phone first screen. It is now the strongest of the three on a phone.

**Walk (phone, `interactive-phone-s00…s25`):**
- s01–s02: check-in.
- s02–s04: "How do you like to sleep?". The rooms now take about 1.5 screens: tiles, pick chips, then one edge-to-edge stage.
  - Fan: the two budget rooms with "Fan / No A/C / No hot water" chips.
  - Three or four: the 2+1 room and the family room (`interactive-phone-sleep-*`, `states.log`).
- s05–s06: inside the house and the veranda row.
- s06–s08: the roof, with Erin's quote.
- s08–s09: **the sunset band.**
- s10: by the beach.
- s11–s12: the restaurant, with Janno.
- s13: the night house and the Eranga family.
- s14–s15: the break and Rosa.
- s16: amenities and check-out, with three ratings on one line, then quotes.
- s18–s20: getting here, the closing line in the text face, the footer.
- The phone bar is visible from s02. Its ˄ opens the audit-ordered summary (`interactive-phone-bar-open.png`).

**Booking:**
- 1 tap from the hero to the dossier's Booking.com URL (`states.log`).
- 2 taps from a tile ("A fan and cold water" → "Check dates on Booking.com").
- Fan vs A/C is clear before the tap.

**Motion:**
- On the laptop, 85 of 88 interactive elements carry transitions. The exceptions are the skip link, the wordmark and the Rosa credit.
- The CTA lifts 2 px on hover (`interactive-laptop-hover-cta.png`). The tile fill and the stage cross-fade are smooth.
- Reduced motion: the canvas stays at opacity 0, and the still shows (`interactive-phone-reduced-hero.png`).
- JS off: the rooms stack in their two groups (`interactive-phone-nojs-s1.png`).

**Score: 8, better than the current presence: yes.** The phone first screen now has a felt main item from the business's own photograph. The booking moment is the best in the set, and the page is the shortest. It is held at 8 by:
- the grey-box-plus-smudge first half-second;
- the name said twice in the same face on the hero (the Merienda wordmark at 22 px over the Merienda title at 40 px, `interactive-phone-s00.png`), which is the same echo I marked on unique in round 1;
- a laptop first screen that is still half grey concrete and planter box under the title (`interactive-laptop-t2000.png`).

**Fix list (biggest effect first)**
1. Cold paint: give the hero the same blurred placeholder calm now has (a ~40 px blurred img-102 as the hero background). Hide the text scrim until the photo has loaded, so the first half-second is the place, not a grey box with a dark blob.
2. Hide the header wordmark while the hero title is in view, as unique does. One name on the first screen.
3. Laptop crop: lift the frame so the parapet and the sea sit lower and less of the concrete floor and the planter box shows under the title. Or set the title block a little higher, on the parapet line, to cover less floor.
4. A labelled Call on the first phone screen (as for calm).
5. The phone bar label is 14.5 px in a narrow pill. Give it the room the ˄ and the phone icon leave, or drop the ˄ to the summary sheet, so "Check dates on Booking.com" is set at body size.

**Keep:** the continuous drift on the phone and pointer depth on the laptop; Merienda; the sleep tiles, chips and single stage; the large rating pair; the sunset band and the night house; the bar's ˄ summary.

---

### R2.3 Unique, 8/10: pass, better than the current presence: yes

**Round-1 fixes, checked**
| # | Round-1 complaint | Round 2 | Evidence |
|---|---|---|---|
| 1 | The name was on the first screen twice | **Fixed with JS.** The header wordmark and the round Call are hidden until the hero button has scrolled away. On the first screen: one Caveat title, one line, one button. With JS off the echo is back (`unique-phone-nojs-hero.png`), which is a minor point. | `unique-phone-t500…t6000.png`, `-s00/s01.png` |
| 2 | Phone crop: the sea was a strip at the foot | **Fixed.** The type sits on white, then the picture fills the rest. Palms stand crisp against the white sky, and the sea, the reef and the green take the lower third. The fade no longer reads as fog. | `sheets/unique-cold.png` |
| 3 | The mid-wipe read as a reddish smudge rising from the bottom | **Fixed.** Mid-change, a clean horizontal slit opens across the full frame width at the horizon: the sunset under the thatch (`unique-laptop-pin-02.png`), and the break opening through the restaurant (`-pin-10.png`). It reads as a deliberate double exposure along the horizon, and it is brief. Phone frames show the same (`unique-phone-pin-03.png`). | `sheets/u-wipe.png`, `sheets/u-pin-lap.png` |
| 4 | Rooms too long on the phone | **Fixed in part.** The fan rooms are compact rows with a 112 px thumbnail. The run is s03–s07, about 4 phone screens (r1: 6). The A/C rooms still lead with bed close-ups: Superior with the green towel (s04), the 2+1 (s05). | `unique-phone-s03…s07.png` |
| 5 | Small finishes: text window under the pin, the second Call in "Not sure", a flat CTA hover | **All fixed.** The pinned frame is 44 svh plus the dial, with about 40% of the screen to read in (`unique-phone-pin-01…13.png`). "Not sure" has one Call (`unique-phone-finder-ns.png`). The hero CTA lifts 1 px (`unique-walk.log`). | |

**Timeline (phone, throttled):** complete in the first frame at 0.5 s and still at 6 s, with nothing late (`unique-phone-t500…t6000.png`). The button is the sign's ink black, at y 222.

The black pill is quieter and less warm than round 1's vermilion, but it is unmistakable on white and it leaves the sun disc as the one orange thing on the page. Not a defect.

**Walk (phone, `unique-phone-s00…s21`):**
- s01–s02: check-in, the cleanest booking head of the three (one paragraph, three dated rating pills, Book + Call).
- s03–s07: rooms, with the "A/C | Hot water" chips on the photos. The "Find your room" pill sits above them.
- s08–s09: inside the house, three flush columns, now without a hole.
- s09–s14: the set-piece. Afternoon → sunset → 22:00 → 7:30 → the break, with the sun stepping down the dial. It hands straight to "Today on Coconuts" with the forecast (`unique-phone-pin-13/14.png`).
  - One small flaw: as a block enters, its script title passes under the dial's white fade and is half-clipped for a frame ("The afternoon", `unique-phone-pin-01.png`).
- s15–s16: Rosa and the amenities.
- s16–s18: check-out with one quote at a time.
- s18–s19: the sign as a plain rounded photograph by "Getting here".
- s20–s21: the closing line and the footer.
- The bar is visible from s01 (`unique-walk.log`).

**Booking:**
- 1 tap from the hero (`states.log`).
- Finder: bar → "2" → "Check dates" is 3 taps. Focus lands on "1 Just me", Esc closes the sheet and returns focus, and "2" lists the four doubles plus the 2+1 room (`unique-phone-finder-2.png`, `states.log`).
- `/rooms/` with JS off is a real list by group size (`unique-phone-nojs-rooms.png`).

**Motion:**
- On the laptop, 62 of 100 elements carry their own transition. The other 38 are the slideshow and review dots, which animate through `::before` as in round 1.
- Reduced motion: no pin, and the moments stack (`unique-phone-reduced-s2.png`).
- JS off: clean, with the bar static.

**Score: 8, better than the current presence: yes.** This is the strongest page of the three. The first screen is now decisive: one name, one button, the palms standing on white over the sea. The day-at-the-house set-piece is felt on both widths, and its wipe now looks intended. It is not a 9 because:
- the A/C room run still opens two of four rooms on bed close-ups (s04–s05), the same deflation I named in round 1;
- the laptop first screen still shows the blue tarp shacks along its foot (`unique-laptop-t2000.png`);
- block titles clip under the dial's fade on the phone.

**Fix list (biggest effect first)**
1. Lead every A/C room with its widest, brightest frame, as calm did this round. Superior should lead with the veranda (img-030 or the doorway), not the green towel. The 2+1 should lead with the room seen whole (img-040).
2. Laptop crop: end the frame above the blue-tarp shacks, or let the white page rise from the foot as well, so the last thing you see is the sea and the green.
3. Phone set-piece: start each block's title below the dial's fade (more top padding on the block, or a shorter fade), so no script title is ever half-clipped.
4. JS off: show the header wordmark only from the second screen (CSS `position:absolute` header, or the hero title as the only name), so the no-JS first screen also says the name once.
5. Give the slideshow and review dots a transition on the element, not only on `::before`, so the hover and focus state is felt as well as the active one.

**Keep:** the set-piece and its horizon slit; the sun disc on the dial; the keyed white sky; one name on the first screen; the black booking pill with the vermilion reserved for the sun and Call; the compact fan rows; the finder sheet and `/rooms/`; the pin handing straight to today's forecast.

---

### What the designer prompt got wrong, round 2 (quotable)
The loop-back worked: every page fixed what it was told to fix. Two lessons:
- **A crop fix must not cost the hook.** Calm removed the wires by cutting at the horizon, and lost the sea that made its first screen. When a crop moves, re-ask "is the thing that pulls you in still on the first screen?", not only "is the flaw gone?".
- **A fix given to one variant is a rule for all three.** The doubled name was fixed on unique and is still on calm and interactive. The bed-close-up lead was fixed on calm and is still on unique. The prompt should turn any first-screen or lodging fix from a 4f report into a check for every variant.

---

## Round 3 (station 4f)

experience-critic 0.2.0 · station 4f (quick), round 3, the last allowed round · 2026-11-05 · after the 4e loop-back (designer 0.7.1, commit 032ed8d).
Pages: `sites/coconut-surf-inn-guest-house-and-restaurant/mockups/calm/dist/index.html` (:8921) and `…/mockups/interactive/dist/index.html` (:8922). Only these two were revised. Unique passed round 2 at 8, is unchanged and is not re-scored here. Inputs read: my round-2 section above and the round-3 parts of each `notes.md` (calm look-log rounds 15–16 and its round-3 conflicts; interactive R3-1 to R3-3). Comparison bar unchanged: the Booking.com, Google and Airbnb folds. Written without reading the round-3 critic or visual-critic reports.

Evidence is in `reports/2026-10-midigama-01/experience/coconut-surf-inn-guest-house-and-restaurant/r3/` (git-ignored PNGs): `calm-walk.log`, `interactive-walk.log`, `states.log`, the frames, and contact sheets in `r3/sheets/`. Recipes (scratch, not committed):
- `walk.mjs`, unchanged from rounds 1–2: cold phone load on CDP 1.6 Mbps / 150 ms / 4× CPU, frames at 0.5 / 1.5 / 3 / 6 s, human-pace scroll at 0.7 screen per step, laptop 1440×900, CTA hover, transition count, reduced motion, JS off.
- `states3.mjs`, new this round: the calm pan at 0 / 4 / 8 / 13 s; the hero buttons measured on both widths; the wordmark state in and after the hero; hover on the new hero Call; the interactive drift on the phone and pointer depth on the laptop; the new review carousel tapped and clicked on both widths; the hero photos aborted (failed-load state); the phone bar at the page end; the hero tap-through.
- Chromium with SwiftShader WebGL. PSNR with ffmpeg.

### Summary, round 3

| | calm "The view from the roof" | interactive "Under the thatch" |
|---|---|---|
| **Dimension 8 (experience)** | **8 / 10** (r2: 8, r1: 8) | **8 / 10** (r2: 8, r1: 7) |
| Better than the current presence | **yes** | **yes** |
| Pass / fail (this critic) | **pass** | **pass** |
| Taps to book | 1 (hero → Booking.com listing) | 1 |
| Hard fails (dimension-8 side) | none | none |
| Regressions from round 3 | none that a traveller meets; one failed-load edge (below) | none |
| Phone page length | 13,394 px, about 16 screens (r2: 14,214) | 12,450 px, about 15 (r2: 12,398) |

**Experience ranking at 4f, final (unique carried from round 2): 1 unique · 2 interactive · 3 calm**, all three at 8. The gap between calm and interactive is now small: calm got its sea back, and on the laptop it is now the calmer and cleaner first screen of the two.

**The current presence, round 3.** Unchanged. Round 3 closed the one thing Google's listing still did better: **both pages now have a labelled Call on the first screen**, after the booking button and visibly quieter than it (calm: ink outline on a faint sky-white pill, 114×56 at y 334 on the phone; interactive: white text on a 16 % white pill, 94×54 at y 715; `states.log`). Booking.com's live prices once dates are in and Airbnb's host face remain the only things the listings have that the pages do not, and both are by design or by gap.

**Video and photo hard fail: still does not apply.** No usable own video; both first screens carry img-009 or img-102 at ≥ 1200 px source.

---

### R3.1 Calm, 8/10: pass, better than the current presence: yes

**Round-2 fixes, checked**
| # | Round-2 complaint | Round 3 | Evidence |
|---|---|---|---|
| 1 | The crop lost the sea: about 85 % sky on the laptop, sea a strip on the phone | **Fixed.** Laptop: the horizon now sits at about 80 % (y ≈ 715 of 900). Below it are the sea, the reef breaking white in two lines, the beach shelter under its blue roof, the sand and the green. The wires and tin roofs are out of frame. Phone: the sea and the whitewater fill the bottom fifth through the whole pan. | `calm-laptop-t2000.png`, `sheets/calm-pan.png`, `sheets/calm-cold.png` |
| 2 | No labelled Call on the first phone screen | **Fixed.** Book, then a quieter outlined **Call** under it, both inside the first screen on both widths. Hover turns the Call pill to solid ink with white text (`calm-laptop-hover-call.png`). | `calm-phone-s00.png`, `states.log` |
| 3 | The Eranga block was three screens of grey text | **Fixed.** Family + Meagan's quote now run about one phone screen (s16–s17). | `sheets/calm-walk-b.png` |
| 4 | One review filled a whole phone screen | **Fixed.** Reviews are 16 px on the phone; the longest holds about half a screen (s18–s19). | `calm-phone-s18/s19.png` |
| 5 | The name twice on the first screen | **Fixed.** The wordmark is `opacity 0 / hidden` in the hero and `1 / visible` after it (`states.log`). One name on the first screen. | `calm-phone-s00.png` |

**Timeline (phone, throttled):**
- 0.5 s: the title (Satisfy not yet loaded, fallback script), line, Book and Call on the sky, over the blurred view. No flat box.
- 1.5 s: the photograph is complete. Palms over the sea, whitewater on the reef along the foot. Fonts loaded.
- 0 → 13 s: the pan moves from the centre palms right to the reef and the beach shelter (PSNR 14.3 dB start to end; r2: 12.2). It is gentler than round 1's, but it now ends on the sea breaking white, which was round 1's hook.
- LCP-side: the title is `nowrap` with a locked height, and no reflow is visible between the 0.5 s and 1.5 s frames.

The first screen is back to what pulled me in round 1: you are on the roof looking at the break, with one name, one line and one green button. The phone frame is a little soft (the notes say it is drawn at about 2× its source); at arm's length on a phone it reads as haze over the sea, not as blur. Method-5 cap does not apply: clean, slick, one clear CTA, not a template section.

**Walk (phone, `calm-phone-s00…s22`):** no regressions against round 2.
- s01–s02: check-in, the " | " lines, two dated rating cards, Book + Call.
- s03–s08: rooms. The A/C cards lead wide (balcony, veranda with hammock and board, the 2+1 room whole); the fan pair sits side by side. Arrows are 44 px.
- s08–s10: inside the house; the roof band and hammock.
- s11–s12: **the sunset, full-bleed.** s13: **the house lit at night.** Still the best run on the page.
- s14–s17: the restaurant slideshow, then the family and Meagan, now about one screen.
- s17–s19: the break with Rosa (the headline and the widget both drawn), then check-out with three dated ratings and one shorter quote at a time.
- s20–s22: getting here, the closing line, the footer.
- Phone bar: visible from s02 (y 1182), and new this round it steps aside over the closing section and the footer, which carry their own Book and Call (`calm-walk.log`, s20–s22 `bar=false`). Below 900 px the header hides on the way down and returns on the way up.

**Booking:** 1 tap. The hero link is the dossier's Booking.com URL and is the first request after the tap (`states.log`). 14 Booking.com links, one `tel:+94778921396`.

**Motion:**
- On the laptop, 45 of 94 links and buttons carry a transition on the element (r2: 86 of 93). This is not a loss: the 44 px dot buttons added this round animate through `::before` (0.35 s, `states.log`), as unique's do. The others without one are the skip link, three nav links, the header Call and the Rosa credit. Calm's concept is micro-motion only, so the method-5 micro-animation cap does not bind it in any case.
- Hero CTA lifts 1 px with a deeper shadow; the hero Call inverts to ink.
- Reduced motion: no pan, a composed still on the reef end frame (`calm-phone-reduced-hero.png`).
- JS off: no wordmark, every slideshow a swipeable row, one Rosa link. One small flaw: two " | " separators start a wrapped line in the check-in details ("| Roof terrace", `calm-phone-nojs-s1.png`); with JS on, `page.js` hides them.

**Failed-load state (new check, `calm-phone-heroblocked-onlyfull.png`):** with the hero photos aborted, the blurred placeholder does not stay, the hero is flat blue, and the image's alt text prints in two lines across the top edge, clipped at both sides. Type and both buttons stay usable. This is an edge (a failed request, not slow 4G), but interactive handles it cleanly (`sheets/heroblocked.png`).

**Score: 8, better than the current presence: yes.** Every item on my round-2 list is done, and nothing a traveller meets regressed. It is still 8, not 9: the page after the first screen is the same well-paced, quiet page as round 2, there is no moment you would remember the next day except the sunset and the night house, and the phone hero is visibly soft.

**Fix list (for 4g, biggest effect first)**
1. Phone hero sharpness: if no sharper own frame exists, crop a little less tall so the image is drawn nearer 1.5× than 2×, or sharpen the 800 px rendition lightly. The first screen is the one place softness is felt.
2. Failed load: keep the blurred placeholder as a CSS background of `.hero-media` (as interactive does), and hide the `<img>` alt text visually on error, so a failed photo leaves the blurred view, not a printed caption.
3. JS off: hide a separator that starts a line with CSS (or render the separators only from JS), so the details line never starts with " | ".
4. The A/C room run on the phone is still four stacked cards (s03–s07). A peek of the next card or a 2-up at 390 would shorten it by a screen.
5. Give the header Call and the three nav links the same 120–200 ms colour transition as the rest, so the header feels part of the system.

**Keep:** the sea-and-reef crop on both widths; one name on the first screen; the outlined hero Call; the pan ending on the reef; the sunset and night-house bands; the shortened family and review stretch; the phone bar stepping aside at the footer; the hide-on-scroll header below 900 px.

---

### R3.2 Interactive, 8/10: pass, better than the current presence: yes

**Round-2 fixes, checked**
| # | Round-2 complaint | Round 3 | Evidence |
|---|---|---|---|
| 1 | Cold paint: a grey box with a dark smudge for the first half-second | **Fixed.** At 0.5 s the hero is a blurred terrace (thatch, sky, sea), with the title, line, Book and Call already set. With the hero photos aborted, both widths keep the blurred terrace and both buttons. | `sheets/interactive-cold.png`, `sheets/heroblocked.png` |
| 2 | The name twice on the hero | **Fixed.** The wordmark is hidden in the hero (`states.log`) and fades in with the stuck header. | `interactive-phone-s00.png` |
| 3 | Laptop: half the first screen was grey concrete | **Partly fixed.** The crop moved up 80 source px and the title now sits on the parapet line with the sea behind it. Concrete and the planter still take roughly the bottom third under the buttons. | `interactive-laptop-t2000.png` |
| 4 | No labelled Call on the first phone screen | **Fixed.** Translucent white **Call** under the booking button (94×54), clearly secondary. Hover lifts it 2 px and brightens it. | `interactive-phone-t1500.png`, `states.log` |
| 5 | Phone bar label at 14.5 px | **Fixed.** 16 px, fits beside the call and ˄ buttons. | `sheets/interactive-walk-a.png` |

**Timeline (phone, throttled):**
- 0.5 s: the blurred terrace with the type in the fallback sans (Merienda not yet in). Not a box; it reads as the place coming into focus.
- 1.5 s: the photograph is complete, Merienda is in, the saffron button at y 649 and Call at y 715.
- 6 s: the canvas is live (`depth live op=1`, `interactive-walk.log`). The drift runs without a tap: PSNR 17.7 dB (0 → 4 s) and 18.1 dB (4 → 8 s) on the phone, 16.6 dB for the laptop pointer sweep left to right. Same strength as round 2; no tearing at the fringe or the pillar.

From 1.5 s this is still the strongest phone first screen of the three revised pages: you stand under the thatch looking at the sea, and the layers breathe. The new Call does not crowd it.

**Walk (phone, `interactive-phone-s00…s20`):** no regressions against round 2.
- s01–s02: check-in, Book + Call, the two large ratings.
- s02–s05: "How do you like to sleep?" on white: three tiles, chips, one stage with Fan / A/C / Hot water chips. Clear.
- s05–s06: inside the house, then the verandas as a flush 2×2 (no more row running off the edge).
- s06–s08: the roof, Erin's quote, the sunset band.
- s09–s12: by the beach, the restaurant (one 4:5 photo), the house at night as one full-bleed band, the Eranga family.
- s13–s15: the break, the Rosa headline and widget, amenities.
- s16–s18: check-out with three large dated ratings, then **the new review carousel**: one review per page with 48 px round arrows and a "1 of 10" counter. Tapping Next slides to "2 of 10" in about half a second, Previous enables, and the slide is a clean horizontal move (`sheets/int-reviews.png`). On the laptop it is 3 up with four 44 px dots; Next moves a page and the active dot follows (`sheets/int-lap-reviews.png`).
- s18–s20: getting here, the closing line, the footer.
- Phone bar: visible from s02 to the end. Unlike calm it stays over the footer, which has its own buttons (`states.log`: `bar at end 774 vis=visible`). Minor.

**Booking:** 1 tap from the hero to the dossier's Booking.com URL (`states.log`). 2 taps from a tile. Fan vs A/C is clear before the tap.

**Motion:**
- On the laptop, 90 of 95 links and buttons carry transitions (r2: 85 of 88). The exceptions are the skip link, three nav links and the Rosa credit.
- Buttons are flat now: the hero CTA lifts 2 px and steps to a darker saffron, no shadow (`interactive-laptop-hover-cta.png`). The carousel arrows and dots animate.
- Reduced motion: the canvas stays at opacity 0, the still shows (`interactive-phone-reduced-hero.png`).
- JS off: the reviews are a plain grid, the rooms stack in two groups. The header wordmark shows over the hero with JS off, so the name is said twice there (`interactive-phone-nojs-hero.png`). Minor, as it was for unique in round 2.

**Score: 8, better than the current presence: yes.** Every round-2 item is done or partly done and nothing regressed; the carousels are an improvement on the rows that ran off the edge, and the cold paint is now the place, not a box. It is still 8, not 9: the laptop first screen still spends its lower third on concrete and a planter, the main item is a subtle breathing rather than a moment, and the middle of the page is well made but not memorable.

**Fix list (for 4g, biggest effect first)**
1. Laptop first screen: the lower third is still concrete. A crop that ends at the parapet top (the title then sits on the sea band), or a soft fade from the parapet into the page, would make the laptop as strong as the phone.
2. Laptop hero Call: at 16 % white over the planter and concrete its edge nearly disappears (`interactive-laptop-t2000.png`). Raise the fill to about 24 % or add a 1 px white edge, so it reads as a button at a glance.
3. Phone bar: step it aside over the closing section and the footer, as calm now does, so the footer's own Book and Call are not doubled.
4. JS off: hide the wordmark until the hero has scrolled away (CSS only), so the no-JS first screen says the name once.
5. Give the three nav links and the Rosa credit the same colour transition as the rest (the last five elements without one).

**Keep:** the blurred placeholder; the continuous drift and pointer depth; Merienda; one name on the first screen; the translucent hero Call; the sleep tiles and single stage on white; the 2×2 verandas; the paged review carousel with the counter on the phone; flat buttons with the 2 px lift.

---

### What the designer prompt got wrong, round 3 (quotable)
Little this round: both pages did what the round-2 lists asked, and the round-2 lesson ("a crop fix must not cost the hook") was applied: calm measured its photograph and found the one crop that keeps the sea and drops the wires. Two small lessons remain:
- **A fix on one variant is still not carried to its siblings in its no-JS and failed-load states.** Interactive got the failed-load placeholder right and calm did not; calm hides its wordmark with JS off and interactive does not. The hand-off check should walk the JS-off and hero-failed states for every variant, not only the one the report named.
- **The phone bar's behaviour at the footer is a shared rule, not a per-variant choice.** Calm steps it aside over the closing section and footer; interactive keeps it. Pick one rule for all three.
