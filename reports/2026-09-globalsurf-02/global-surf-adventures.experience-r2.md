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
