# KA Surf Hostel v2 — visual-critic 4f, designer round 2 (notes rounds 6–7)

visual-critic 0.1.2, 2026-10-20. Same method and calibration as `visual-4f.md` (r1).
Each new dist was served over http and shot with `tools/shoot.mjs` at 1440 and 390 (`--settle 1500`) into my own scratch folder. The tasteskill inspector was run at 1440 and 390.
All screenshots were deleted after scoring. KA has no website, so the comparison is again the OTA listing plus the gold page (Canopy). The earlier round was not re-scored; its r1 scores stand (calm 4.5, interactive 4.5, unique 5.5).

Verified fixed since r1: the Rosa widget and the map now render in interactive and unique (seen in the sheets: the Rosa card with the Kabalana table, and the Google map with pin). Fonts are no longer flagged, and the designer reports 0 third-party requests on load (not re-measured here).

## calm — r1 6.5 → r2 7

- **First screen (desktop-00):** three prints at three sizes on the mint (plate behind, cottages 360 × 480, private room in front) and a 66 px title. There is now a moment, and the inspector's focal-point check passes. But the trio crowds the field's right edge: the room print ends about 8 px from the mint/white seam. The plate is mostly hidden. The left 40 px of mint is empty while the right is jammed.
- **390 (mobile-00):** the room print runs off the right edge of the screen. It reads as clipped by accident, not as a bleed. A blank mint band follows the hero before the next print arrives.
- **Page:** prints no longer get sliced at section edges, and the stage crossfades. Rooms are at 432 px with dots, beds are on one " | " line, body text is 18 px in ink, and the amenities are condensed (desktop-02, desktop-06). Still even-paced: the same split for seven sections. Empty white below the Wolfgang quote (desktop-03) and above "On Instagram" (desktop-08). Footer: a big Kalam "KA Surf Hostel" sits alone in a mint band, with the links a screen later (desktop-10/11).
- **Inspector:** 0 FAIL; WARN off-centre 86/130 px, 12 sizes.
- Better than current presence: yes. Better than the earlier calm: yes (r1 reasons hold).

Fixes left (below 8):
1. Re-seat the hero trio inside the mint with equal air on both sides (about 64 px from the seam). Let the plate show at least half. On a phone, keep the room print inside the 16 px gutter.
2. Break the even split once more mid-page. Give "What guests say" a full-width band, for example the long-table photo at 432 px beside Mia's quote at 28 px, so the page has a second moment after the hero.
3. Close the remaining blank stretches (desktop-03 under the quote, desktop-08 above Instagram). Put the footer name and its buttons on one screen.

## interactive — r1 6 → r2 7

- **First screen (desktop-00):** the frame is now 432 × 576 on a pale denim ground, and the h1 is 62 px at 36 px from each frame edge. No longer a phone mock on a blank page: it reads as a composed poster. But the halves are unequal. "Five minutes" is one line on the centre axis, while "from Kabalana / Beach" is two lines plus the tagline stacked beneath it, so the right side is twice as heavy and sits higher. The reel slivers above and below the frame still read as loading bars on desktop.
- **390:** the stacked headline is uneven ("Five minutes" flush left, "from Kabalana Beach" indented on a different measure). The frame, button and chapter circles sit well.
- **Page:** Caveat replaces Gochi Hand and is calmer, readable and tasteful. The Instagram grid is large and the best image moment. The forecast and map now render. The rooms block on the denim field is good. Still some dead air: between the amenities and "The beach" (desktop-06/07), and the getting-here map box stands blank while it loads (desktop-09).
- **Inspector:** FAIL focal-point (the designer argues the frame is the most a 576 px photo can hold. I accept that the frame can't grow, but it doesn't excuse the uneven headline).
- Better than current presence: yes. Better than the earlier interactive: yes.

Fixes left (below 8):
1. Balance the hero headline. Put both halves on one line each at the same size ("Five minutes" | "from Kabalana Beach", allowing 56 px), on the same baseline, and move the tagline under the frame with the button. Drop the desktop reel slivers or make them clearly photo edges (more height, no grey).
2. Cut the gap before "The beach" (desktop-06/07) to the 112 px section rhythm. Give the map box a static map image as its placeholder instead of a blank tile.
3. Give the page one more photographic moment between the rooms and the beach. For example, breakfast with the plate at 432 px and the reel cover beside it, rather than the current 288 px prints.

## unique — r1 7 → r2 7

- **First screen (desktop-00):** improved. Seven columns of 196 px frames, a three-column text cell, a 60 px h1 and a 28 px wordmark. It is the strongest first screen of any KA round. But the fruit-plate photo appears twice on the same screen (column 3 top and column 7), and so does the dorm. Repeats on a "camera roll" make it look padded.
- **Page:** the roll is carried down, with five-frame bands opening the staff, amenities, beach and getting-here sections. The Instagram grid is 4 × 2 at about 330 px. The beach is sea-glass instead of pool cyan: quieter and better, if a little grey. The tile footer is good. The embeds load.
- **Blocking defect at 390 (mobile-05, mobile-06):** the sticky staff facts ("9.9 / Staff, on Booking.com", "9.9", "24 hours") slide over the body paragraph and the quotes. They are printed on top of the text and unreadable for a whole screen of scroll. The sticky column was meant for desktop only. This is the inspector's covered-text FAIL ("What guests say about the staff" 100% hidden), and it is not the booking bar.
- Also: the five-frame bands repeat the same five-across pattern four times and start to read as a template device. The 390 hero type is small (about 24 px h1) for a full-screen roll. The footer's Call and Instagram tiles are mostly empty.
- **Inspector:** FAIL focal-point, FAIL covered-text (above).
- Better than current presence: yes. Better than the earlier unique (Canopy): yes. The overlap bug holds it at 7 instead of the 7.5–8 the rest of the work earned.

Fixes left (below 8):
1. Make the staff facts column non-sticky below the desktop breakpoint, or stack it above the text. Today it overlaps the paragraph and quotes at 390.
2. Remove the duplicates from the first screen's roll (each picture once per viewport), and vary the later bands: not four identical five-across rows. For example, one band of three larger frames, one offset strip, one pair.
3. Raise the phone hero to a 34–36 px h1 with the wordmark at 22 px. Fill or merge the empty footer tiles (Call, Instagram) so the close is as tight as the opening.

## Table

| variant | r1 | r2 | better than earlier round |
|---|---|---|---|
| calm | 6.5 | 7 | yes |
| interactive | 6 | 7 | yes |
| unique | 7 | 7 | yes |

All three are still below 8, so 4f is still a fail. Visual ranking unchanged: unique, then calm and interactive (tied). Unique reaches 8 fastest: fix the phone overlap and the duplicate frames.
