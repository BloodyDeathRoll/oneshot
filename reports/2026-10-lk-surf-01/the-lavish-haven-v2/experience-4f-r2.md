# The Lavish Haven v2 — experience-critic, station 4f, round 2

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20 · mode: quick · same method and calibration as `experience-4f.md`. Independent: the other reviewers' reports were not read. Only the three v2 mockups were re-scored (designer round 2, notes rounds 6–7). The current site is still the hotel's Booking.com page; there is no website.

## Method (evidence)

The same Playwright walk as round 1, with pages served over local HTTP and walked one at a time:

- **Phone cold load:** 390×844, touch, slow 4G (1.6 Mbps, 150 ms RTT) and 4× CPU. The 0.5 s frame actually landed at 1.2–1.8 s and the 1.5 s frame at 1.6–1.8 s, because screenshots are slow under throttle. The 3 s frame landed on time.
- **Phone scroll:** human pace, with a rAF frame probe. The fixed booking bar and the first-screen controls were recorded.
- **Interactions:**
  - calm: crossfade, slideshow.
  - interactive: chips (frames at 100 / 350 / 850 ms, plus rows in view after the tap), stage photo sequence on scroll, dates panel.
  - unique: swing (200–1400 ms), flip (120 / 270 / 670 ms, plus scroll and height before and after), Esc focus return.
- **Other states:** reduced motion, JS off, and a 1440×900 laptop walk.
- **tasteskill inspector** at 1440 and 390.
- **Frame times:** 0–1 frames over 50 ms and none over 100 ms on every page. The headless caveat from round 1 still holds, so smoothness is again judged from the mid-transition frames.

**Fonts (round 1's shared finding):** fixed on all three. The display face now uses `swap` and the body face uses `optional` with a size-adjusted fallback. On the throttled cold phone load every face reached `loaded`, and the designed h1 face (Pinyon / Bodoni / EB Garamond italic) rendered by the settled frame. The fallback-to-script swap caused no layout shift: CLS on the cold phone load was calm 0.001 / interactive 0.017 / unique 0.

---

## calm — "Prints": r1 6 → r2 7

- **Cold phone:** first load 472 KB, LCP 2276 ms. At about 1.8 s the name, tagline, button and the new first-screen rating (9.3 / 34 · 5.0 / 21, read 25 Sep 2026) are usable. The pool print is still decoding as a strip at that point; by settle it fills the content width, with the blind square overlapping its corner. The script name is now shown on a first visit.
- **Walk:**
  - The new **"After dark"** section, right after the intro, is the moment that was missing. The night pool shows at full 1024 px with the featureLine beside it, and it makes you want to be there.
  - The twelve rooms now take about 1.3 phone screens, down from about 3.
  - Amenities show eight plus an "All 25 at the hotel" button.
  - There is one booking button per phone screen: the header pill is hidden, and the hero button hands over to the bar ("Check dates on Booking.com" + `tel:`).
- **Booking:** still 1 tap to `booking.com/hotel/lk/the-lavish-haven.html`.
- **Motion:** unchanged and correct: the blind crossfade, the transform drift, the snap slideshow and the press-scale. It is still the least alive of the three.
- **Reduced motion:** nothing runs. **JS off:** complete, with 11 Booking links and 3 `tel:`.
- **Laptop:**
  - The first screen is unchanged and still good.
  - Lower down, the white wall still reads as sparse: small prints in the pool cluster, the inspector's `empty-middle` at "New, and it shows" (1805 px), and `ragged-edges`.
  - The flat tan field beside the rooms is still a dead block.

**Score 7.** Better than the current site: yes. Better than r1: yes.

**Fixes left (under 8):**
1. Give laptop the same weight the phone has. Below "After dark", no print under about 480 px. Put the pool cluster on a tighter grid of four larger prints, and close the 1805 px empty middle beside "New, and it shows".
2. Replace the flat tan field beside the rooms with a photograph, or drop it.
3. On the phone, sit the rating under the button so the first screen ends on it, and show the pool print fully decoded (preload the 640 w rendition the phone actually uses).
4. Add one more felt moment on scroll. For example, the "After dark" print could arrive with a slow 600 ms opacity/scale-from-0.98 when it enters the view. Composite only, off under reduced motion.

## interactive — "Pick your view": r1 7 → r2 7

- **Cold phone:** first load 459 KB, LCP 2436 ms (close to the 2.5 s line), CLS 0.017.
  - At about 1.2 s the top band of the view photo has painted, with an empty aqua block below it. By about 1.6 s the photo is in.
  - The new hero (`img-069`) puts the pool across a third of the frame. That is better than the chair and ashtray, but dark teak chairs still fill the lower half.
- **Chooser:**
  - On the phone, the photo now sits above the chips and the filtered rows start right under them. A Garden tap swaps the photo and visibly changes the list (5 → 6 rows, 2 rows in view after the tap; frames 100 / 350 / 850 ms). That is the round-1 fix, and it works.
  - On laptop the crossfade shows a clean blend at 350 ms.
  - On scroll, the stage now changes per section: all → bedroom → night pool → blind → noon pool → balcony door. That gives the page far more photographs than r1.
- **Booking:**
  - 1 tap.
  - Optional dates panel, about 3 taps, handing off as `…?checkin=2026-12-10&checkout=2026-12-14&group_adults=2&no_rooms=1&group_children=0`. Not verified on Booking.com, by design.
- **Motion:** smooth and purposeful (crossfade, FLIP rows, press-scale). Reduced motion: nothing runs. JS off: complete.
- **Laptop:**
  - The stage is now capped at 1.0× native, so it is sharp. The cost is a 553 px framed print floating in a 45 % aqua column.
  - The first screen is less immersive than r1's edge-to-edge half: half the screen is now aqua around a framed picture.
  - The inspector flags `off-centre` (by concept).
  - Bodoni at subtitle sizes loses its hairlines ("Λ year-round" on the phone).

**Score 7.** Same score, different balance: the chooser and the photo story are better; the first-screen pull on laptop is weaker. Better than the current site: yes. Better than r1: yes, slightly (the chooser now does its job on the phone, and there are more photographs).

**Fixes left (under 8):**
1. On laptop, let the stage photo fill its column edge to edge at up to 1.2× (the playbook allows that; the cap at 1.0× costs more than the softness it saves), or use a 4:5 crop that fills the column height. Half the screen should be the view, not aqua.
2. Re-crop the hero so the chairs leave the lower half: crop up and right on `img-069` so pool and garden fill at least 60 %.
3. Use Bodoni only from 40 px up, with Hanken for subtitles like "A year-round outdoor pool…".
4. Check the phone LCP (2436 ms throttled) and the 0.017 shift: preload the phone crop of the hero view and reserve its box.

## unique — "Do not disturb" (the door hanger): r1 6 → r2 8

- **Cold phone:**
  - First load 519 KB, LCP 1908 ms, CLS 0.
  - At about 1.6 s the night pool print is a strip with the white hanger rising over its foot.
  - By settle: the hanger's head, punched hole and slot, the name in Garamond italic, the tagline, the rating, "Check dates on Booking.com" and "Choose dates first".
- **The object:** it is now unmistakably a door hanger (round head, hole, slot, flaring body), not a coupon. It is the most distinctive first screen of the round on both widths.
- **Rooms:** fixed. The 3.5-screen pastel stack is now one swipeable snap row on the phone and one screen of small tags grouped by view on laptop. Attention no longer drops there.
- **Booking:**
  - 1 tap from the hanger or the bar.
  - "Choose dates first" flips to arrival, departure and guests. Scroll before and after: 0 / 0. Height before and after: 640 / 640 on the phone and 700 / 700 on laptop. Esc returns focus to "Choose dates first".
  - The same dated hand-off to Booking.com, with Agoda and Call on the back.
  - The booking step is part of the object, the best booking feel in this run.
- **Motion:** the swing is visible at 200 ms and settled by 900 ms. The 3D flip tilt is visible at 270 ms and settles cleanly at 670 ms, with no jump now. The curtain footer is unchanged. Reduced motion: nothing runs, and the flip becomes a crossfade. JS off: complete (10 Booking links, 3 `tel:`).
- **Still weak:**
  - On the phone the hanger's head sits over the lit pool water in the night print, the brightest part of the best photograph (the cold and settled frames show it).
  - The amenity list on the phone still runs in full (about 1.5 screens).
  - Laptop has the `empty-middle` gap at "New, and it shows".

**Score 8.** Engaging, clearly better than the current site, and easy to book. **Pass on dimension 8 for this critic.** Better than the current site: yes. Better than r1: yes, clearly.

**Fixes that would lift it further:**
1. On the phone, move the hanger's head off the pool water: show the print taller (4:3 at full width) and overlap only its bottom 40 px, or hang the hanger from the photograph's right third.
2. On the phone, show eight amenities plus "All 25", as calm and interactive now do.
3. Close the 1805 px empty middle beside "New, and it shows" on laptop.

---

## Table

| variant | r1 | r2 | better than earlier round |
|---|---|---|---|
| calm | 6 | 7 | yes. Fonts show on a first phone visit; "After dark" adds the missing big moment; rooms down from about 3 to 1.3 screens; one booking button per screen |
| interactive | 7 | 7 | yes, slightly. The chooser works on the phone and the stage changes with every section; but the 1.0× cap leaves a framed print in a half-aqua first screen on laptop |
| unique | 6 | 8 | yes, clearly. A real door hanger, rooms in one screen or one swipe row, and a jump-free flip with Esc and focus return |

**Ranking at 4f (experience only):**
1. unique 8.
2. interactive 7.
3. calm 7.

Calm sits just behind interactive: its "After dark" moment is strong, but it has less to do.

**Result:** calm and interactive remain under 8, which is a hard fail on dimension 8 for those two; their top fixes are listed above. Unique passes for this critic.
