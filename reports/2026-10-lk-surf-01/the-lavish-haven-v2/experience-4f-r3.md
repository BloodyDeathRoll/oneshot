# The Lavish Haven v2 — experience-critic, station 4f, round 3 (last)

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20 · mode: quick · same method and calibration as `experience-4f.md` and `-r2.md`. I did not read the other reviewers' reports. The designer's round 3 is notes rounds 8–9. There is still no website; the current site is the hotel's Booking.com page.

**Method:**
- The same Playwright walk as r1 and r2, served over local HTTP. Phone walks ran one at a time, at 390×844 with touch, slow 4G and 4× CPU.
- Cold-load frames: the frame aimed at 0.5 s landed at 1.2–1.8 s, the 1.5 s frame at 1.5–1.8 s, and the 3 s frame on time.
- Phone checks:
  - a human-pace scroll with a frame probe;
  - the fixed booking bar and the first-screen controls;
  - the first-screen booking button measured at 390×844, 390×740 and 360×640.
- Interactions:
  - calm: crossfade and slideshow.
  - interactive: the view chips, the photo sequence on scroll, and the dates hand-off.
  - unique: the swing, and the flip (scroll and height before and after, and where focus goes after Esc).
- Reduced motion, JavaScript off, a 1440×900 laptop walk, and the tasteskill inspector at 1440 and 390.
- Frame times: no frame over 100 ms on any page, and at most 1 over 50 ms. Headless Chromium keeps a steady frame rate even under load, so this number does not tell the pages apart. Smoothness is judged from the frames captured mid-transition.

## calm — "Prints": 6 → 7 → 7

**Cold phone load.**
- First load is 490 KB.
- LCP is 2524 ms, which is 24 ms over the 2.5 s line on my throttle. The designer measured 2416 ms on its own throttle.
- CLS is 0.001.
- The script name, the tagline, the button (bottom edge at 683 px) and the rating are all on the first screen.

**What changed.**
- The tan block beside the rooms is gone. Two balcony photographs now run beside the room list.
- "Staying longer" has a full 1024 px photograph of the pool and garden at noon.
- The pool cluster is now four prints at about 520 px each.
- "After dark" fades and scales in from 0.98 over 900 ms. It is off under reduced motion.
- On laptop the page is now image-led (frames `laptop-scroll-*`). The white wall no longer reads as empty, except beside "New, and it shows": the inspector flags a 1694 px empty middle there, and the slideshow sits at one edge.

**Motion and booking.**
- Motion is slow, smooth and composite-only: the blind crossfade, the drift, the "After dark" arrival and the button press-scale.
- Booking is 1 tap. There is one booking button per phone screen, and a fixed bar with a `tel:` icon.
- With JavaScript off the page is complete: 11 Booking links and 3 `tel:` links.

**Score 7.**
- It is clearly better than the Booking.com page, and better than r2: there are more and bigger photographs, and the type is calmer.
- It is still a quiet page. There is no moment on scroll that pulls you in the way unique's door hanger or interactive's view does.
- The phone story is the same as r2, plus one 1024 px photograph.

**Left for 8:**
1. Make "After dark" the one felt moment on the phone as well. Give the night pool a full-width, taller crop (4:5 at 390). Today it sits at 4:3 above a 22 px caption.
2. Close the 1694 px empty middle beside "New, and it shows" on laptop. Put the slideshow and its text in one centred block.
3. Bring the phone LCP back under 2.5 s, for example with a lighter 768 w pool rendition.

## interactive — "Pick your view": 7 → 7 → 8

**Cold phone load.**
- First load is 463 KB.
- LCP is 2468 ms.
- CLS is 0: the earlier 0.017 load shift is gone.
- At about 1.5 s the view box is still empty aqua. When it has loaded it shows pool and garden from an upper floor (`img-079`), with no chairs and no ashtray.

**Laptop.**
- The first screen now fills the right half with that photograph, edge to edge, from the header to the fold.
- The name, tagline, button and rating sit on the left, with "Pick your view" and its chips at the fold.
- It is the most inviting first screen of all the v2 pages, and r1's softness is not visible at 1.17×.

**Walk.**
- On scroll the stage photograph changes section by section, never repeating twice in a row. Recorded sequence: all → bed → night → stay → Kabalana → practicalities.
- On the phone a photograph breaks the lists every couple of screens: the night pool, the blind, the door.
- Bodoni is now used only at 40 px and above, so the hairlines no longer break up.

**Chooser.**
- A chip tap filters the rows right under the chips. Measured: Garden 5 → 6 rows, Kitchen → 3, All → 12, with 2 rows in view right after the tap on the phone.
- The photograph crossfades as you tap (blend visible at 350 ms).

**Motion and booking.**
- Smooth and purposeful: the crossfade, the FLIP row moves and the press-scale.
- Booking is 1 tap. The optional dates path is 3 taps and hands off as `…?checkin=2026-12-10&checkout=2026-12-14&group_adults=2&no_rooms=1&group_children=0`. As in r1 and r2, I did not verify that Booking.com honours these dates; I stopped at the hand-off.
- Reduced motion: nothing runs. JavaScript off: the page is complete.

**Score 8.**
- Engaging: you choose a view and the page answers.
- Clearly better than the current site, and easy to book.
- **Pass on dimension 8 for this critic.**
- Small things left, none blocking:
  - The phone's view box is an empty aqua block until the photo decodes. A blurred placeholder or a dominant-colour fill would help.
  - The inspector's `off-centre` flag is the split layout by concept.

## unique — "Do not disturb" (the door hanger): 6 → 8 → 7

**Cold phone load.**
- First load is 325 KB, down from 519 KB.
- LCP is 1704 ms and CLS is 0.
- The night print is now 4:3 at full width, and the hanger overlaps only its foot. The lit water is visible, which was the r2 fix.

**Regression found.**
- The hanger's front "Check dates on Booking.com" button now sits at **806–856 px on a 390×844 screen**. It is cut 12 px by the bottom edge on arrival.
- At 390×740 and 360×640 it is completely below the fold (801–856 px).
- The fixed booking bar appears only after the first scroll (`phone-cold-settled`).
- So a phone visitor lands with no usable booking action on the first screen. That breaks playbook §0 ("One clear booking action is always visible (first screen and a persistent bar on mobile)"), and r2 had it at 734–784 px.
- This one issue costs the round its 8.

**Everything else improved.**
- "Staying longer" has a 1024 px balcony photograph, with its letters in four columns under it.
- Kabalana has the noon pool at 1024 px, in its own section before the curtain footer.
- On the phone there are eight amenities plus "All 25".
- On laptop the room tags are three per row, with 19 px names.

**Motion.**
- The swing settles within about 900 ms.
- The flip: scroll is 469 → 469 on the phone and 0 → 0 on laptop, and height is 640 → 640 on the phone and 700 → 700 on laptop. Esc returns focus to "Choose dates first".
- The curtain footer runs as before.
- The micro-interactions are still the best in the run.

**Score 7** (8 the moment the button is back on the first screen). Better than the current site: yes, though on arrival on a phone the booking action is weaker than r2.

**Left for 8:**
1. Bring the front booking button above the fold on every phone height, at or under about 640 px. Shorten the night print on the phone (16:10, or a max height of about 28svh), shrink the hanger's head, or show the fixed bar from load until the hanger's button is in view.
2. Close the 1694 px empty middle beside "New, and it shows" on laptop. This is the same layout as calm.

---

## Table

| variant | r1 | r2 | r3 |
|---|---|---|---|
| calm | 6 | 7 | 7 |
| interactive | 7 | 7 | 8 |
| unique | 6 | 8 | 7 |

**Experience ranking at 4f:** 1. interactive 8 · 2. unique 7 (the r2 level is one fix away) · 3. calm 7.

**Result for this critic:** interactive passes. Calm and unique are under 8, which is a hard fail on dimension 8 for those two. What is left for each is listed above. For unique it is one fix: the first-screen booking button on phones.
