# Layday Surf Ahangama v2 — experience-critic, station 4f, round 3 (calm only)

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20.

The same method, calibration and comparison basis as rounds 1 and 2: there is no business website, so the comparison is with the OTA listings and the gold page.

The walk was done over http, alone (no parallel walks), from my own scratch subfolder. Phone: 390×844, touch, 1.6 Mbps / 150 ms, CPU ×4. Then reduced motion, JavaScript off and laptop 1440×900, plus 8 frames of the laptop "The room" stage. The `walk.json` is kept at `reports/2026-10-lk-surf-01/experience/layday-surf-ahangama-v2/r3-calm-v2/`. All frames were deleted.

## Measured

| | r2 | r3 |
|---|---|---|
| phone first-load | 189 KB | 202 KB |
| LCP (throttled phone) | 1.42 s | 1.43 s |
| CLS load / scroll / laptop | 0 / 0 / 0 | 0 / 0 / 0.0001 |
| fonts on the slow first visit | fallbacks (Arial-like headings, serif in place of Caveat) | **Pilcrow and Caveat applied** (h1 "Pilcrow Rounded", h2 "Caveat") |
| phone frames >34 ms (CPU ×4) | 3 (max 67 ms) | 4 (max 183 ms) |
| laptop scroll / stage crossfade frames >34 ms | 0 | 0 / 0 (stage max 17 ms) |
| phone horizontal overflow | 0 | 0 |
| reduced motion | static, fine | static, no running animations, nothing hidden |
| JavaScript off | fine | fine, no hidden text, no broken images |

**Booking (phone):**
- The foot-bar "Check dates" opens the sheet in place (scroll 1200 → 1200). The sheet slides up from the foot, settled by 160 ms.
- The styled pill reads "Arrival / Choose a date". The native field is gone.
- Choosing 1 Dec 2026 shows "Tuesday 1 December", then "Leaving Friday 4 December". The section pill reads "1 Dec – 4 Dec, 3 nights", and the Booking.com links carry `?checkin=2026-12-01&checkout=2026-12-04…`.
- Booking.com is the one teak primary; Hostelworld and Agoda are secondary.
- Esc closes it, the scroll is unchanged, and focus returns to "Check dates".
- Taps: 2, or 3 with a date.
- The plain-URL Booking.com links that remain are the rating and footer source links, which is correct.

## The walk

**Phone:**
- **First screen** (h1, tagline, dated 10/10, teak "Check dates" plus "Call", the berth photograph large): painted by 0.5 s, in the right fonts. Calm and clear.
- **The script section titles** ("The room", "Just one dorm", "Newly built, and kept that way", "Finding the door", "The wave", "Guests", "Practicalities", "Check dates") now render on the slow phone. This was round 2's biggest loss, and it is fixed.
- **"The room" stage:** three landscape views crossfading, with dots. The 1.4 s ease-in-out is smooth and still under reduced motion. On a phone, though, the stage is one 4:3 photograph at column width, the same size as every other print, so it does not land as "the one moment".
- **Layouts:** "Just one dorm" (gallery with dots, text beside) and "Newly built" (chooser beside the specimen) now hold together. The booking section on plaster yellow, with the thumbnail strip and the dates pill, is the warmest screen on the page.

**What deflates the phone walk:**
- **The same photographs return.** The hero berth comes back as the "Newly built" specimen, and the stage's dormitory view comes back as the first "Just one dorm" slide. The room starts to feel smaller than it is.
- **Long white stretches of small text** around Guests and Practicalities, as in round 2.

**Laptop:**
- The hero is now two balanced halves (h1 to 96 px, two prints).
- The stage crossfade runs at a steady 16.7 ms per frame.
- The empty middle and the 512 px gap are gone.
- The footer wordmark is shorter, but it is still a row of coloured tiles.

**Wanting to go:** more than in round 2, on the laptop stage and the yellow booking section. On the phone it is still a pleasant, well-made page rather than one that pulls you in. The calm brief explains some of that, but not the repeated photos.

**Score: 7/10. Fail** (below 8). Easy to book, clean motion, and now in the right type on a slow phone, but it is still the least engaging of the three on a phone.

**Better than the current site:** no site. Beside the OTA listings: yes.

**Better than round 2:** yes. Fonts on a slow visit, the styled date pill with one dates state across the page, the stage, and the layouts all improved; the score rises within the band but stays at 7.

**Better than the earlier round (r3 calm "Berth"):** yes.

## What is left (under 8)

1. **Phone stage.** Make "The room" the phone's one big moment: full-bleed or near full-bleed at a taller crop, with the crossfade, instead of a column-width 4:3 print.
2. **No repeated photographs.** The hero berth (`img-002`) should not return as the "Newly built" specimen; use `img-008` or `img-013` there. The stage's dormitory view should not open the "Just one dorm" gallery.
3. **Break up the long white text stretches** around Guests and Practicalities on the phone: one large quote, plus a swipeable row for the rest (as unique r2 does).
4. **Footer:** replace the coloured-tile wordmark with a designed contact footer, or the name at heading size.
5. **Phone frames:** 4 frames over 34 ms (max 183 ms) under CPU ×4, up from 3 in round 2. Likely the stage crossfade decoding 1024 px images while scrolling: decode them ahead (`img.decode()`) before the first fade.

## Table

| variant | r1 | r2 | r3 |
|---|---|---|---|
| calm | 6 | 7 | **7 (fail)** |
