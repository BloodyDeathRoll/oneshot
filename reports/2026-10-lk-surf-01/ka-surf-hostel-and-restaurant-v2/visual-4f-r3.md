# KA Surf Hostel v2 — visual-critic 4f, designer round 3 (notes round 8, the last)

visual-critic 0.1.2, 2026-10-20. Same method and calibration as `visual-4f.md` and `visual-4f-r2.md`.
Each dist was served over http and shot with `tools/shoot.mjs` at 1440 and 390 (`--settle 1500`) into my own scratch folder. The tasteskill inspector was run at 1440 and 390.
All screenshots were deleted after scoring. KA has no website, so the comparison is the OTA listing plus the gold page (Canopy).

## calm — r3 7 (r2 7)

- **Fixed:** the hero trio sits inside the mint with even air, and on the phone the room print stays inside the gutter (mobile-00). "What guests say" is now a full-width band, with the long-table photo at 432 px beside Mia's quote at 28 px and the other words in two columns (desktop-05/06). It is a real second moment. The blanks under Wolfgang and above Instagram are gone. The footer fits one screen (desktop-11). Inspector: 0 FAIL.
- **Left:** the hero got smaller to make room. The cottages are now 300 × 400 in a trio about 240 × 320 tall, set high in the mint, with the lower third of the half empty (desktop-00). The first screen has less pull than r2. Below the guests band the page goes back to the same even split with small prints for four sections (desktop-07 to desktop-10). It is clean and consistent, and it is still template-calm rather than beautiful.

Under 8, what is left:
1. Give the first screen back its scale: the cottages at about 384 × 512 with the trio centred vertically in the mint. Today the bottom third of the mint is empty.
2. Give one more section after the guests a different shape. For example, Instagram as a full-width four-across grid, or Kabalana with the beach prints at 432 px. Then the second half is not five identical splits.

## interactive — r3 7.5 (r2 7)

- **Fixed:** the hero headline is balanced. "Five minutes from" | "Kabalana Beach" are one line each at 56 px on one baseline, the tagline sits under the frame with the button, and the slivers are gone (desktop-00). It now reads as a composed poster. The breakfast plate is at 432 px, and the beach follows the rooms with no dead space. The map is a static OSM tile and the Rosa widget renders (desktop-03/04, desktop-09). Caveat titles work.
- **Left:** some loose air remains. There is an empty white band above "What guests say" (desktop-05 top). The breakfast field opens with a near-empty denim band (desktop-06), and a blank stretch sits between the amenities and "On Instagram" (desktop-08). The headline halves now sit within about 40 px of the page edges at 1440, so the composition feels slightly stretched. Inspector: FAIL focal-point (accepted, as in r2: the frame cannot grow honestly).

Under 8, what is left:
1. Pull the headline halves in to the frame's axis. Cap the hero line at about 1200 px, or set the halves at 52 px, so there is at least 96 px of air at the page edges.
2. Close the three remaining blank bands (above guests, the top of breakfast, before Instagram) to the 112 px rhythm.

## unique — r3 7.5 (r2 7)

- **Fixed:** the phone overlap bug is gone. The staff facts are sticky only on desktop, and at 390 the facts, paragraph and quotes read cleanly in sequence. No picture repeats on the first screen. The strips vary: three large night frames over the staff (desktop-04, the best band on the page), a pair of bathrooms, and an offset beach strip. Call and Instagram are merged in the footer. The phone headline is bigger. The embeds render.
- **Left:** desktop-05/06: the sticky facts column ("9.9 / 9.9 / 24 hours") sits alone in a wide empty left half for two screens beside long quotes, which reads as unused space. There is a blank stretch after the amenities before "On Instagram" (desktop-08), and the bathroom pair hangs alone at the bottom-left of the breakfast screen (desktop-07). The footer's Find us and Ratings tiles are large and mostly empty (desktop-12). Inspector: FAIL covered-text at single scroll stops (the 64 px desktop header passing over "The beach" / "What guests say"). This is a sticky-header artefact, not a visible defect in the sheets. FAIL focal-point accepted, as in r2.

Under 8, what is left:
1. Fill the staff section's left half: put the long-table photo under the sticky facts, or make the quotes span two columns beside a narrower facts rail. Two screens of empty left half is the page's weakest moment.
2. Close the gap before "On Instagram", and anchor the bathroom pair to "What is here" (not floating under breakfast).
3. Shrink the footer's Find us and Ratings tiles to content height, or merge them, so the close is as tight as the opening.

## Table

| variant | r1 | r2 | r3 |
|---|---|---|---|
| calm | 6.5 | 7 | 7 |
| interactive | 6 | 7 | 7.5 |
| unique | 7 | 7 | 7.5 |

All three are still below 8: 4f fails on the visual bar after the designer's last round. All three are clearly better than the current presence (an OTA listing) and better than the earlier round (calm 4.5, interactive 4.5, Canopy 5.5). If Shahar compares anyway, **unique** and **interactive** are the two to look at. Unique has the most distinctive first screen of any KA round. Interactive is now the most evenly finished.
