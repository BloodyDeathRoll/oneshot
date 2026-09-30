# Global Surf — experience-critic, station 4f, round 2

experience-critic 0.1.0 · run `2026-09-globalsurf-02` · 2026-09-29 · independent (critic / visual-critic reports not opened)

Pages: `sites/global-surf-adventures/mockups/{postcard,try-your-week,the-sign}/dist/` (home + `book/`), served on http://127.0.0.1:8983.
Frames: `reports/2026-09-globalsurf-02/experience-r2/` (`<mockup>/` home, `<mockup>-book/` booking page, `<mockup>-flow/` the tapped booking walk, `current-home/` + `current-lodge/` the live globalsurf.com).
Walk setup: phone 390×844, touch, DPR 2, CDP 1.6 Mbps / 150 ms RTT / 4× CPU; laptop 1440×900; plus reduced motion and JavaScript off. Scroll at ~900 px/s with rAF frame timing. Engine hand-off intercepted: the engine's pages were never opened, nothing submitted. Only the site's own lazy `api.bookinglayer.io/public` quote calls ran.

Bar applied: Shahar's calibration of 2026-09-29 (every point a hard bar) and globalsurf.com home + lodge page as the minimum bar. For comparison, the engine page as Shahar saw it is `scratchpad/bookinglayer/deeplink-couple-2027-02-20-accommodation-step.png`: stock Roboto, blue buttons, one 80 px thumbnail per room, bordered boxes.

## Shared measurements

| | postcard | try-your-week | the-sign |
|---|---|---|---|
| First load, phone throttled (no scroll) | 319 KB | 862 KB | 244 KB |
| LCP / CLS (phone) | 0.76 s / 0.02 | 0.56 s / 0.007 | 0.49 s / 0.003 |
| Hero video starts | yes, m1280.webm, by 1.5 s | yes | yes |
| Third-party on load | **3 Google Fonts requests** | **3 Google Fonts requests** | **3 Google Fonts requests** |
| Scroll frames, phone 4× CPU | p95 16.7 ms, 1 frame >50 ms | p95 16.8 ms, 1 >50 ms | p95 16.7 ms, 1 >50 ms |
| Reduced motion | poster only, nothing plays | poster only | poster only |
| JS off, home | good (poster + CTA) | **black hero, native video controls, spinner, no poster** (`try-your-week/phone-nojs-home.jpg`) | poster OK, **native video control bar over the hero** (`the-sign/phone-nojs-home.jpg`) |
| Hand-off, JS on (L2, 20–27 Feb 2027, 1 couple, twin) | `level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` ✓ | `level-2-rollers?start=2027-02-20&end=2027-02-27&couple=1` ✓ | `level-2-rollers?start=2027-02-20&couple=1&end=2027-02-27` ✓ |
| Hand-off, JS off | same as JS on ✓ | **`…&female=1&male=0&couple=1&start=2027-02-20&duration=8`**: no `end` (docs/bookinglayer.md §3: use `end`, not `duration`), and the default "1 woman" is still in, so the booking is for 3 guests | ✓ |
| Taps, home → hand-off (the walk above) | **9** (2 are month arrows) | **16** (4 month arrows, 1 to remove the preset woman) | **10** (the native select counts as 2) |

Google Fonts on first load is a third-party request, which the rubric makes a hard fail. It belongs to the critic's dimensions, but I note it because all three pages carry it. Motion is purposeful and light everywhere: the hero clip, slideshows with dots, nothing scroll-driven, no reveal animations. No jank.

The current site (my walk, `current-home/`, `current-lodge/`): a dark header bar; an elegant brush script for the section titles ("Why Travel with Global Surf?", "Kabalana Lodge", "Accommodation"); serif display headings; a beige/earth palette; photo cards per level with the title over the photo; an Instagram grid; a real footer. Where it is weaker: no price anywhere, a lodge page that opens on a contact form, rooms reduced to a paragraph and a pillow photo, a Messenger bubble over everything, and booking by "Fill in your details". Where it is still better than all three mockups: **character**. It looks like a brand. The mockups look like one well-made template in three colourways.

---

## 1. postcard: 7/10 · fail (below 8) · would Shahar accept: **no, not as is (closest of the three)** · better than current: **yes, narrowly**

**Timeline (phone, throttled).** At 0.5 s the poster, header and "Surf weeks in Sri Lanka" + "Book package now" are all there. The title wraps on two lines, then re-sets to one line at 1.5 s when DM Sans arrives. By 3 s the clip is playing. By 6 s it has cut to the surfer (`postcard/sheet-phone-first.jpg`). The hero meets the calibration: title + one short CTA, centred, no rating, no overlay, white on coral. The title sits on the palm trunk, readable only through the text shadow.

**The walk.** After one scroll: "Next set is yours" (Caveat script), a short intro, and "12 rooms | Saturday check-in | ISA-certified surf guides". Then the level carousel with a peeking card, video per level, "From $1,466 pp | 7 nights" and a coral "Choose Level N". What's included is an icon list with the surf-theory photo. Rooms are sold properly: a 5–6-photo slideshow per room, a description, details split by " | " and the supplement with its date. Then reviews (8.6 Booking.com), the waves with Rosa, the Instagram grid, a closing card over the night-pool photo, and the footer with icon buttons (`postcard/sheet-phone-scroll-a/b.jpg`). A persistent "From $1,466 pp · Book now" bar runs throughout. Where attention drops: the 12,400 px phone page repeats the same beat (script title → centred grey paragraph → rounded photo) about eight times, and nothing surprises after the hero. On the laptop (`postcard/sheet-laptop.jpg`) sections float in large empty grey fields with 13–14 px body text. The welcome and "What's included" feel sparse, not generous.

**Booking** (`postcard-flow/`). The hero CTA lands on `book/` with a hero that re-titles itself per level ("Level 2 – Rollers"). This is the nicest touch in any of the three. The flow is one page in 4 numbered steps. Level cards have thumbnails and check marks. Rooms are big slideshows with "Choose this room". A custom calendar only shows months that have Saturdays, so 2 arrow taps to reach February. Guests use floating-label steppers. Then a live total ($3,092.05, "Live price from the booking engine"), with the deposit rule and the "next, on Bookinglayer…" line. It feels part of the site: same fonts, same coral, same cards. It is far more wanting-to-book than the engine's page. Defects:
- **The booking column widens after each choice.** The room card's right edge goes 340 → 355 → 361 px at 390 wide. By the total step the total card and "Continue booking" touch the right edge of the screen (left gutter 24 px, right ~4 px) (`postcard-flow/phone-19-before-continue-booking.jpg`, `ovf3`). It looks broken at the moment of paying.
- Two coral actions compete at the end: the bar's "Continue" and "Continue booking".
- The running total shows "$1,606.04" before any date is chosen (`phone-07`). Cents on a from-price read as noise.

**Top 5 fixes**
1. Fix the booking column so it never grows past its 342 px width, with symmetric gutters at every step.
2. Laptop: tighten the section spacing, set body text ≥ 16 px and let the photos fill the width (reference: current site's level cards). As it stands, the laptop reads empty.
3. Break the repeated rhythm on the phone: at least 3 full-bleed image or video moments between the text blocks. Cut the page by ~25 % (merge "Surf, breakfast, surf again" into What's included).
4. One final action at the total step. Hide the bar's "Continue" once "Continue booking" is on screen. Show whole dollars until dates are known.
5. Give the titles more character: a script with more presence than Caveat 600, closer to the current site's brush lettering. Move the hero title off the palm trunk (lower third, or a darker poster crop).

**Keep:** the hero exactly as structured; the per-level video; the rooms slideshows; the hero re-titling on `book/`; the calendar that skips empty months; the live total with the hand-off explainer; the footer buttons; JS-off behaviour.

---

## 2. the-sign: 6/10 · fail · would Shahar accept: **no** · better than current: **no (booking better, look not)**

**Timeline.** Poster + "Your surf week starts here" (Yellowtail script, 46 px) + subtitle + "Book your week" by 0.5 s. The clip plays by 3 s (`the-sign/sheet-phone-first.jpg`). The subtitle runs across the palm trunk and the umbrella and is hard to read in 3 of 4 frames.

**The walk.** Large level photos stacked on aqua with coral buttons. A food/friends photo pair. Rooms as swipeable photo rows. "Footwear is discouraged…" in script over the bar photo. Inclusions, reviews and the waves on aqua. An Instagram mosaic, the closing card and an aqua footer (`the-sign/sheet-phone-scroll-a/b.jpg`). The script is the closest of the three to the current site's lettering. But the saturated aqua blocks alternating with coral buttons are loud and add colour, not structure. Coral on light aqua is the harshest pairing in the run. On the laptop the level photos are strong and the rooms are big (`the-sign/sheet-laptop.jpg`). This is the best laptop of the three.

**Booking** (`the-sign-flow/`). One page in 4 steps with a sticky photo/video band per step. The band takes ~170 px under the header, 20 % of the phone screen, and **cuts each step's script title in half** ("Dates and guests", "Your total" sit behind it in `phone-11`, `13`, `15`, `17`). Level and room cards turn aqua when selected. The room card, once selected, is separated from its photos. Check-in is a native select ("Choose a Saturday"). The live total is correct. 10 taps.

**Calibration hits:** "Questions? Ask us" is **underlined text** on the closing card and on the booking total (`the-sign/sheet-phone-scroll-b.jpg`, `the-sign-book/sheet-a.jpg`). JS off shows native video controls over the hero and the booking band.

**Top 5 fixes**
1. Drop the sticky media band on phone, or make it scroll away. Never let it cover the step titles.
2. Remove every underline. Make "Questions? Ask us" a button like the footer's.
3. Tone the palette down: aqua as a rare accent, white/sand sections, coral only on the booking action.
4. Shorten the hero subtitle or drop it, and place the title where the poster is calm.
5. JS off: no `controls` on the videos. Show the poster `<img>` instead.

**Keep:** the Yellowtail + Bricolage pairing (the right direction toward the original); the big level photographs; the laptop rooms rows; the step-by-step summary on the total.

---

## 3. try-your-week: 5/10 · fail · would Shahar accept: **no** · better than current: **no**

**Timeline.** Poster + "Next set is yours" (Newsreader serif) + "All levels, steps from the beach" + "Choose your level" by 0.5 s. The clip plays (`try-your-week/sheet-phone-first.jpg`). The hero CTA **does not book**: it scrolls to the levels section.

**The walk.** Levels behind pill tabs (Fomies/Rollers/Riders) *and* carousel dots: two controls for the same thing. The Level 1 video is cropped to a torso. Rooms behind Dorm/Twin/Deluxe tabs. A long plain amenity icon list. Reviews in cards. The waves. A horizontally scrolling Instagram row. The closing line is set in white serif straight on a busy palm/bar photo with no scrim, and is hard to read (`try-your-week/sheet-phone-scroll-b.jpg`). The footer buttons are narrow and left-hung, and "Whats App us" breaks oddly. Mansalva (a rough marker) for titles plus serif body text *inside buttons* reads as a school handout next to the current site's refined brush script.

**Booking** (`try-your-week-flow/`). A 4-step wizard with a numbered pill stepper, one step per screen, a big photo per step and a "Next" bar. It is clear, but it is the longest walk: **16 taps**. The calendar steps through empty months (4 arrows to February). Guests default to 1 woman, so a couple must first remove her. The total step leads with a large night-pool photo, and the numbers sit below the fold. JS off: the hero is black with native video controls and a spinner, and the hand-off sends `duration=8` without `end` plus the leftover `female=1` (a 3-guest booking).

**Top 5 fixes**
1. Hero CTA → `book/` ("Book package now").
2. JS-off hero: poster image, no controls. JS-off form: send `end`, default all guests to 0.
3. Replace Mansalva and the serif buttons with one readable text face plus a tasteful script (see the-sign).
4. Calendar: skip months with no Saturdays. Default guests to 0. Put the total numbers above the photo.
5. One control per carousel (tabs *or* dots), and a scrim or card behind the closing line.

**Keep:** the stepper's clarity; the per-step photography; review cards.

---

## Ranking (experience only)

1. **postcard**: the best phone booking of the run (6–9 taps, live total, hero re-titles per level, fully in the site's style). It fails on a layout bug at the total step and a thin, repetitive home page that still has less character than globalsurf.com.
2. **the-sign**: the right lettering and the strongest laptop, but underlined links, a loud aqua/coral palette and a sticky band that cuts the booking titles in half.
3. **try-your-week**: a clear wizard but the longest booking (16 taps), a hero CTA that doesn't book, a marker/serif type pair below the current site, and a broken JS-off hero and hand-off.

None reaches 8. All three beat the Bookinglayer engine page on feel, and all three hand off correct start/end/guests with JS on. Postcard is one fix round from a pass. The other two need type/colour work before a human sees them.

---

# Round 2 (after the fix round, commit 7d2bad2)

I re-walked everything from scratch with the same setup: phone 390×844 throttled, laptop 1440×900, reduced motion, JavaScript off, and the booking flows up to an intercepted hand-off. The engine was never opened. Frames are in `experience-r2/round2/`. Other reviewers' reports were not opened.

## Shared measurements

| | postcard | try-your-week | the-sign |
|---|---|---|---|
| Fonts (script titles + text) | Caveat Brush + DM Sans | Water Brush + Figtree | Damion + Bricolage Grotesque |
| First load, phone throttled | 470 KB | 763 KB | 454 KB |
| LCP / CLS (phone) | 0.79 s / 0.001 | 0.56 s / 0.009 | 0.51 s / 0.002 |
| Scroll frames, phone 4× CPU | p95 16.8 ms, max 83 ms | p95 16.7 ms, max 100 ms | p95 16.7 ms, max 83 ms |
| Reduced motion | poster only | poster only | poster only |
| JS off, home and booking | poster, no controls ✓ | poster, no controls ✓ (fixed) | poster, no controls ✓ (fixed) |
| Hand-off, JS on | `…level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` ✓ | `…?start=2027-02-20&end=2027-02-27&couple=1` ✓ | `…?start=2027-02-20&couple=1&end=2027-02-27` ✓ |
| Hand-off, JS off | ✓ start/end/guests | ✓ start/end, guests 0/0/1 (fixed: no `duration`, no leftover woman) | ✓ start/end/guests |
| Taps, home → hand-off (L2, 20 Feb, couple, twin) | 9 (2 are month arrows) | **8** | 10 (the native select counts as 2) |
| Underlined actions / dark text on coral | none | none | none |
| Third-party on load | 3 Google Fonts requests (for the critic) | same | same |

## postcard: 8/10 · pass · would Shahar accept: **yes** · better than current: **yes**

The phone page now breaks its rhythm with full-bleed photos: the woman carrying a board with an inset photo, the surf-theory class, the group walking to the water. The heavier brush script gives the titles the presence of the current site's lettering. The laptop (`round2/postcard/sheet-laptop.jpg`) is now editorial: photo/text splits, three level cards with photos, large room slideshows and a proper footer. It is clearly better than globalsurf.com.

Booking is fixed. The booking column stays 24–366 px through every choice (measured). The calendar skips empty months, the hero re-titles per level, and the live total reads $3,092.05.

**Remaining fixes:**
1. The Rosa block's fallback on phone is a ~500 px empty grey box with its button text clipped ("See today's forecast for South Point o"). Reserve a smaller box and let the text wrap.
2. The waves headline shows "Mon 28 Sep, 20:30" while the-sign shows Tue 29 Sep. Check the 24 h staleness rule.
3. The calendar popover is 2 px wider than the column (24–392 px).
4. Hide the bar's "Continue" once "Continue booking" is on screen.
5. Self-host the fonts.

## the-sign: 8/10 · pass · would Shahar accept: **yes** · better than current: **yes**

The aqua blocks are gone. Soft grey tints and navy selected cards make it calm and consistent. The underlines are gone. The sticky media band on the booking page now scrolls away, and the step titles show in full (`round2/the-sign-flow/sheet.jpg`). Big level photos and the laptop room rows are still the strongest imagery of the three. The hero is script title + CTA only.

**Remaining fixes:**
1. The phone home page is the longest of the three (14,374 px). Trim a section.
2. The selected room card on the booking page becomes a large navy block apart from its photos. Keep the photo and the selection together.
3. Check-in is a native select (2 taps). A chip or calendar picker like the other two would feel more part of the site.
4. The Rosa widget area is an empty white box until it loads.
5. Self-host the fonts.

## try-your-week: 7/10 · fail · would Shahar accept: **no** · better than current: **yes on booking, no on type**

The booking is now the best of the run: 3 steps, Saturday chips grouped by month, guests start at 0, and 8 taps to the hand-off. JS off is fixed. It fails on the title script. Water Brush's "r" reads as "ß" ("Your ßoom", "Our ßooms", `round2/try-your-week/sheet-a.jpg`, `round2/try-your-week-flow/sheet.jpg`). That breaks the "fonts must be tasteful and readable" bar in the headings a visitor reads most.

**Remaining fixes:**
1. Replace Water Brush with a brush script whose lower-case r is unambiguous.
2. Hero CTA "Choose your level" → "Book package now". It goes to `book/` anyway.
3. Drop the header "Book now" pill over the video while the hero CTA is on screen.
4. On phone the level tabs duplicate the carousel dots.
5. Self-host the fonts.

## Ranking (round 2)

1. **postcard**: now a complete, editorial site that beats globalsurf.com on phone and laptop and has the best-integrated booking. Its remaining issues are small (Rosa fallback box, stale forecast time).
2. **the-sign**: calm and consistent after the fixes, with the strongest imagery. It loses on length and the native date select.
3. **try-your-week**: the fastest booking of the three (8 taps), held back by a title script whose "r" reads as "ß".

---

# Round 3 (commits 1167414 + 91abce4)

I re-walked all three from scratch with the same setup: phone 390×844 throttled, laptop 1440×900, reduced motion, JavaScript off, and booking flows up to an intercepted hand-off. The engine was never opened. Frames are in `experience-r2/round3/`. Other reviewers' reports were not opened.

## Shared measurements

| | postcard | try-your-week | the-sign |
|---|---|---|---|
| Hero (phone) | "Surf weeks in Sri Lanka" + "Book package now" | "Next set is yours" + subtitle + "Book package now" | script "Your surf week starts here" + "Book your week" |
| First load / LCP / CLS (phone) | 443 KB / 0.79 s / 0.00 | 763 KB / 0.60 s / 0.009 | 597 KB / 0.50 s / 0.002 |
| Cold frames 0.5 / 1.5 / 3 s | poster, title, CTA from 0.5 s | **blank white at 0.5 s**, text on a flat tint at 1.5 s, poster at 3 s | poster, title, CTA from 0.5 s |
| Scroll, phone 4× CPU | p95 16.7 ms, max 67 ms | p95 16.8 ms, max 100 ms | p95 16.7 ms, max 83 ms |
| Reduced motion / JS off | poster only / poster, no controls ✓ | ✓ / ✓ | ✓ / ✓ |
| Hand-off, JS on | `level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` ✓ | `…?start=2027-02-20&end=2027-02-27&couple=1` ✓ | `…?start=2027-02-20&couple=1&end=2027-02-27` ✓ |
| Hand-off, JS off | ✓ start/end/guests | ✓ | ✓ |
| Taps, home → hand-off (L2, 20 Feb, couple, twin) | 9 (2 month arrows) | 8 | 9 |
| Third-party on load | 3 Google Fonts requests (for the critic) | same | same |

## the-sign: 9/10 · pass · would Shahar accept: **yes** · better than current: **yes, clearly**

The polish shows in the booking. Check-in is now a set of Saturday chips grouped by month, like try-your-week's. Room cards keep their photo inside the selected card. Level cards carry thumbnails, and the selected state is navy with white text (`round3/the-sign-flow/sheet.jpg`). The home page is shorter (12,340 px, down from 14,374). It has the strongest imagery of the run: big level video cards, two-photo room rows on the laptop and a lodge photo band. The Damion script gives the titles the handwritten feel of the current site. Fonts and colours are the same from the hero to the total.

**Remaining fixes:**
1. On the laptop hero the script title sits across the white umbrellas, and the light strokes thin out against them. Add a slightly stronger text shadow, or crop the poster darker behind the title.
2. The "Choose Level N" buttons on phone are a row below each photo card and are easy to miss while swiping the level carousel.
3. Self-host the fonts.

## postcard: 8/10 · pass · would Shahar accept: **yes** · better than current: **yes**

The round-2 issues are fixed:
- The Rosa block loads cleanly.
- The forecast time now reads "Tue 29 Sep 20:30".
- The booking column holds its width.

It keeps the best booking-page hero (re-titles per level), the most editorial laptop, and a calendar that skips empty months. It sits one point under the-sign because the booking page is visually quieter and the step titles use less of the imagery.

**Remaining fixes:**
1. At the total step the bar's "Continue" still competes with "Continue booking". Hide the bar's button there.
2. The calendar popover is still 2 px wider than the column.
3. Self-host the fonts.

## try-your-week: 8/10 · pass · would Shahar accept: **yes** · better than current: **yes**

The new Satisfy script is legible: "Our rooms", "Your room" and "Dates and guests" read correctly (`round3/try-your-week/sheet-phone.jpg`). The hero CTA is "Book package now". The booking is still the fastest (8 taps), a clear 3-step flow with Saturday chips and guests starting at 0.

**Remaining fixes:**
1. **Cold load:** the phone shows a blank white screen at 0.5 s and a flat tint at 1.5 s before the poster (`round3/heroes.jpg`). The other two paint the poster at 0.5 s. Preload the poster, and set a matching background image or colour behind it.
2. After a guest count is chosen but before a date, the bar says "From $1,546.03 pp", a per-person figure that changes with the room. Show the per-person price only once a date is picked, and drop the cents.
3. The level tabs and the carousel dots on the home page are still two controls for the same thing.
4. Self-host the fonts.

## Ranking (round 3)

1. **the-sign**: the most complete experience, with strong imagery, handwritten titles like the original's, and a booking flow that now has chips, photos in the selection cards and one consistent style to the total.
2. **postcard**: an editorial, well-built site with the most elegant booking-page hero. It is held back only by the duplicate final button and a quieter booking page.
3. **try-your-week**: now legible, with the quickest booking. Its hero is the only one of the three that paints late on a slow phone.

---

# Round 4 (commit 9fa6c2f)

I re-walked all three from scratch with the same setup: phone 390×844 throttled, laptop 1440×900, reduced motion, JavaScript off, and booking flows up to an intercepted hand-off. The engine was never opened. Frames are in `experience-r2/round4/`, plus the hero-clip strips `postcard-hero-clip-strip.jpg` and `tyw-hero-clip-strip.jpg`. Other reviewers' reports were not opened.

## Shared measurements

| | postcard | try-your-week | the-sign |
|---|---|---|---|
| Fonts / palette | Marck Script + Lora; cream, teal, coral | Satisfy + Figtree; white and pale aqua, coral | Damion + Bricolage; white and grey, navy, coral |
| Hero clip | vid-009p: pool-deck dolly, 10.4 s, forward then reversed | vid-009r: surf on the reef → pool deck, 7 s, two hard cuts | vid-009e (unchanged) |
| First load / LCP / CLS (phone) | 431 KB / 0.84 s / 0.001 | 713 KB / 0.31 s / 0.00 | 598 KB / 0.50 s / 0.003 |
| Cold frame at 0.5 s | poster + title + CTA | **poster + title + CTA (fixed)**; the logo only appears after 1.5 s | poster + title + CTA |
| Scroll, phone 4× CPU | p95 16.7 ms, max 50 ms | p95 16.8 ms, max 83 ms | p95 16.7 ms, max 100 ms |
| Reduced motion / JS off | poster only / poster, no controls ✓ | ✓ / ✓ | ✓ / ✓ |
| Hand-off, JS on | `level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` ✓ | `…?start=2027-02-20&end=2027-02-27&couple=1` ✓ | `…?start=2027-02-20&couple=1&end=2027-02-27` ✓ |
| Hand-off, JS off | ✓ | ✓ | ✓ |
| Taps, home → hand-off (L2, 20 Feb, couple, twin) | 9 (2 month arrows) | 8 | 9 |
| Third-party on load | **4** Google Fonts requests (was 3) | 3 | 3 |

### Postcard's forward-then-back hero loop: does it feel natural? No.

I measured frame-to-frame motion over all 260 frames of `vid-009p-m1280.webm` (mean pixel difference, 160 px wide). The dolly runs at a steady 1.7–2.2. At the midpoint (frames ~127–133) it drops to **0.0 for 6 frames, a 0.24 s freeze**, then restarts at full speed in the opposite direction with no easing. At the loop seam it reverses again at full speed. So twice per 10.4 s the camera stops dead and snaps backwards. On the reversed half the palm fronds and pool ripples also move backwards. On a phone it reads as a boomerang/rewind, not a slow cinematic move. It is the first thing a visitor sees and draws attention to itself. The earlier vid-009e (pool → surf, one cut) felt natural. This does not.

## the-sign: 9/10 · pass · would Shahar accept: **yes** · better than current: **yes, clearly**

Unchanged in substance from round 3 and still the most complete experience. It has big level video cards, room slideshows, handwritten Damion titles, a dark reviews band over the lodge photo, a chip date picker and a live total. Fonts and colours are consistent from the hero to the total.

**Remaining fixes:**
1. On the laptop hero the script title still sits across the white umbrellas. A slightly darker poster crop behind the title would help.
2. Self-host the fonts.

## try-your-week: 8/10 · pass · would Shahar accept: **yes** · better than current: **yes**

The hero now opens on the lodge's own reef-surf footage, and the poster paints by 0.5 s. It is the most energetic first screen of the three and a clear difference from the other two. The pale-aqua sections, a new closing over the palm photo and the new 2×2 contact tiles in the footer make it feel like its own site. The booking is unchanged and still the quickest: 3 steps, Saturday chips, 8 taps.

**Remaining fixes:**
1. The header logo is missing at 0.5 s and 1.5 s on the cold phone load. Only the menu icon shows until the logo arrives. Inline or preload it.
2. The footer tiles break "WhatsApp / us" over two lines. Use "WhatsApp" alone or a wider tile.
3. The clip cuts hard twice in 7 s (surf → pool, and pool → surf at the loop). It is acceptable, but a single scene or a softer cut would feel calmer.
4. Self-host the fonts.

## postcard: 7/10 · fail · would Shahar accept: **no (because of the hero clip)** · better than current: **yes, below the hero**

Everything below the hero is good:
- Warm cream palette and Lora serif body at 18 px.
- Editorial laptop layout.
- Booking pages restyled in the same cream and teal, with the per-level hero and the calendar that skips empty months.

But:
- **The boomerang hero** (above) is the first impression, and it looks like a rewind. That alone decides the score.
- **Marck Script** has very wide natural word spacing. At 50 px on a phone, the section titles break apart and wrap into fragments ("Next set is / yours", "Choose your / level", "What guests / say"). It reads less composed than round 3's Caveat Brush.
- A 4th Google Fonts request was added on first load.

**Remaining fixes:**
1. Replace the ping-pong loop with a one-directional clip: vid-009e, or a forward-only cut of the dolly with a crossfade at the loop point.
2. Tighten Marck Script (`word-spacing: -0.15em`) or return to Caveat Brush. Keep phone section titles to one or two lines.
3. Hide the bar's "Continue" when "Continue booking" is on screen (still open from round 3).
4. Self-host the fonts.

## Ranking (round 4)

1. **the-sign**: still the most complete and consistent experience, from the video hero to the total.
2. **try-your-week**: now visibly its own site, with a surf-first hero that paints fast and the quickest booking of the three.
3. **postcard**: a warm, well-built page and booking flow let down by a hero loop that visibly stops and plays backwards every 5 seconds.

---

# Round 5 (commits b99ae13 + ad2d451): last round before Shahar decides

I re-walked all three from scratch with the same setup: phone 390×844 throttled, laptop 1440×900, reduced motion, JavaScript off, and booking flows up to an intercepted hand-off. The engine was never opened. Frames are in `experience-r2/round5/`, plus the clip strips `vid-010g-m1280-strip.jpg` and `vid-002h-m1280-strip.jpg`, and `heroes.jpg` (phone at 0.5/1.5/3/6 s plus the laptop heroes). Other reviewers' reports were not opened.

## Shared measurements

| | postcard | try-your-week | the-sign |
|---|---|---|---|
| Hero clip | vid-010g, golden-hour beginners, 9 s, **6 shots** (cuts at ~1.3/2.7/4.4/5.6/7.2 s + seam) | vid-002h, reef barrels, 4.9 s, 1 continuous take + seam cut | vid-009e (unchanged) |
| Clip direction | forward only, no freeze (min frame motion 0.74) ✓ | forward only, steady (3–12) ✓ | ✓ |
| Title centred (phone, x/y of centre) | 195 / 378 ✓ | 195 / 361 ✓ | 195 / 411 ✓ |
| First load / LCP / CLS (phone) | 412 KB / 0.81 s / 0.001 | 725 KB / 0.36 s / 0.00 | 598 KB / 0.49 s / 0.003 |
| Cold frame at 0.5 s | poster + title + CTA | poster + **logo (fixed)** + title + CTA | poster + title + CTA |
| Scroll, phone 4× CPU | p95 16.7 ms, max 67 ms | p95 16.7 ms, max 83 ms | p95 16.7 ms, max 117 ms (1 frame) |
| Reduced motion / JS off | poster only / poster, no controls ✓ | ✓ / ✓ | ✓ / ✓ |
| Hand-off, JS on and off | `level-2-rollers?start=2027-02-20&end=2027-02-27&…couple=1` ✓ | ✓ | ✓ |
| Taps, home → hand-off (L2, 20 Feb, couple, twin) | 9 (2 month arrows) | 8 | 9 |
| Third-party on load | 4 Google Fonts requests | 3 | 3 |

## the-sign: 9/10 · pass · would Shahar accept: **yes** · better than current: **yes, clearly**

Unchanged, and still the most complete and consistent experience. The pool-to-surf hero is calm and legible. It has big level video cards, room slideshows, the handwritten Damion titles, and a chip date picker with a live total in the same style.

**Remaining fixes:**
1. On the laptop hero the script title still crosses the white umbrellas (`round5/heroes.jpg`).
2. Self-host the fonts.

## try-your-week: 8/10 · pass · would Shahar accept: **yes** · better than current: **yes**

The new reef-barrel hero is one steady forward take. It is the most striking first screen of the three, and the title and CTA stay readable over the green wall. The logo is now in the header by 0.5 s. The footer tiles read "WhatsApp us" on one line. The booking is still the quickest: 3 steps, Saturday chips, 8 taps.

**Remaining fixes:**
1. The loop seam is a hard cut from the end of the ride back to the start of the barrel every 4.9 s. It is short enough to notice. Add a 0.3 s crossfade, or use a longer take.
2. The poster is slightly soft on phone (upscaled frame). Use a sharper still from the same take.
3. Self-host the fonts.

## postcard: 8/10 · pass · would Shahar accept: **yes, if the phone poster is swapped** · better than current: **yes**

The ping-pong loop is gone: vid-010g only moves forward, with no freeze or reversal. The Marck Script titles now sit on one line ("Next set is yours", "Choose your level"). The bar's "Continue" is hidden at the total step, as promised. The cream, teal and coral palette with Lora is warm, and it carries through to the booking pages.

What holds it at 8:
- **Phone first screen:** the poster frame is an overexposed cream shot cropped to a headless torso and an outstretched arm. The white title sits on pale sky and only reads through its shadow halo (`round5/heroes.jpg`, first four frames). On the laptop the same clip opens on a strong silhouette, so this is a phone-crop problem.
- **The clip is a 6-shot montage in 9 s.** It runs forward and feels natural, but it is busier behind the title than the other two heroes.

**Remaining fixes:**
1. Use a phone poster and crop that keeps a whole subject and a darker area behind the title: the golden-hour silhouette or the woman standing up on the board.
2. Trim the montage to 3–4 shots, or hold each for ≥ 2 s.
3. Remove the 4th Google Fonts request, and self-host the fonts.

## Ranking (round 5)

1. **the-sign**: the most complete and consistent experience from the video hero to the total, and the safest pick.
2. **try-your-week**: the most striking hero (a single forward barrel take) and the quickest booking. It needs only a softer loop seam.
3. **postcard**: warm and well-built, with the ping-pong fixed. Its phone first screen is a washed-out, headless crop that the other two don't have.
