# Global Surf Lodge Kabalana — visual-critic, station 4f, picked composite

visual-critic 0.1.1 · run `2026-09-globalsurf-02` · 2026-10-04 · quick mode · independent (no critic / experience-critic report opened)

Pages: `sites/global-surf-adventures/mockups/picked/dist/` (home) and `dist/book/` (standalone booking), served on :8971.

Shots (all under `reports/2026-09-globalsurf-02/`):
- `visual-composite/home/` and `visual-composite/book/`: tools/shoot.mjs at 1440 and 390.
- `visual-composite/book-walk/`: a step-by-step walk at 1440 and 390, with the engine blocked so the snapshot path shows.
- `visual-composite/extra/`:
  - `play-<w>-NN-tX.png` + `hero-play-<w>-sheet.png`: hero loop frames taken during real playback;
  - `book-<w>-*-full.png`: full-page booking steps;
  - `home-full-<w>.png`.
- `current-site/shots/home/` and `current-site/shots/lodge/`: globalsurf.com and the Kabalana lodge page, shot today.

Bar used:
- Shahar's 2026-09-29 calibration (every point is a hard bar).
- His verbatim composite instructions (ledger, `mocked → picked`, 2026-09-30).
- The approved gold (`agents/designer/gold/global-surf-notes.md`).
- The current site.

Settled and not judged on taste: the Dancing Script titles and the #1 "The sign" palette (ink #27293E, neutral #EEF2F5, coral #D1402A), approved 2026-10-04. I checked only that they are applied consistently.

Method note: seeking the hero video fails because the local Python server has no range support. Hero frames were therefore captured while the video played in real time, about 1.2 s apart.

---

## Three-second note

**Desktop** (`home/desktop-00`, `extra/hero-play-1440-sheet`):
- The loop is the lodge's own footage at real speed: pool deck, a beginner's first stand-up, the guide cheering with both arms up, then the reef rider.
- Only the header sits on top, with one centred Lora line, "Your surf week starts here", and one coral "Book package now".
- It feels warm and human. I would keep scrolling.
- The weak frame is the pool deck, which is also the poster. There the white title crosses white walls and umbrellas and depends on its shadow (`extra/play-1440-01-t1.7`).

**Phone** (`home/mobile-00`, `extra/hero-play-390-sheet`):
- Same structure, and the title block is centred both ways.
- The 608 px rendition is visibly soft at 2×. The guide frame (`extra/play-390-03-t4.4`) and the palm/pool poster are smeared rather than crisp.

**Below the fold** the page reads as one designed site, not a patchwork:
- one button system, one slideshow component, one dot style;
- script titles in ink everywhere;
- white and neutral bands alternating.

It is calm and expensive-looking, but cooler and flatter than The Sign at round 5. The only dark moment, The Sign's ink reviews band, is gone, so after the hero the page never changes temperature.

## Shahar's composite instructions, item by item

| # | Instruction (verbatim, condensed) | Verdict | Evidence |
|---|---|---|---|
| 1 | Hero = #1's loop (pool + pro surfer) + #3's beginner standing up as the guide cheers | **met** — four scenes: pool → stand-up → guide cheers → reef rider, real speed, 10.3 s | `extra/hero-play-1440-sheet`, `hero-play-390-sheet` |
| 2 | Fonts from #3, but titles not #3's handwriting (→ Caveat, since replaced by approved Dancing Script) | **met** — Lora for all text and the hero line (as in #3), Dancing Script for every section, footer and booking-step title; computed fonts on the page are only these two | `home/desktop-01`, `-05`, `-11`; `book-walk/1440-1-level` |
| 3 | "Next set is yours" from #3 | met — asymmetric split, portrait photo with a small inset photo | `home/desktop-01` |
| 4 | Choose your level from #1, with the font changes, **Booking rating removed** | met — three 4:5 living clips, equal cards, buttons on one baseline, no rating line | `home/desktop-02`, `-03` |
| 5 | What's included + Surf again from #3 | met | `home/desktop-03/04`, `-05` |
| 6 | Our rooms from #2 | met — Dorm / Twin / Deluxe pills, big gallery with arrows and dots, "Choose this room" | `home/desktop-06` |
| 7 | Pool image, What guests say, The waves from #3 | met | `home/desktop-07`, `-08`, `-09` |
| 8 | Follow the lodge from #2 | met — header row + ink Instagram button + photo row with dots | `home/desktop-10` |
| 9 | "Book the week for your level" from #3 | met — split closing, coral + WhatsApp buttons | `home/desktop-10/11` |
| 10 | Footer from #1 | met — logo, Talk to us buttons, Getting here, Follow icons, legal row | `home/desktop-12` |
| 11 | Booking like #1 but **standalone**, **each step on its own screen** | met in structure — `/book/`, four steps (Level → Room → Dates & guests → Total), progress bar, back/forward work | `book-walk/1440-*` |
| | | **not met in practice on the phone** — every step opens with a ~570 px media block, so the step's choice starts below the first screen (level cards, room pills, date chips) | `book-walk/390-1-level`, `390-2b-room-twin`, `390-3-dates` |
| 12 | Rooms step: top selector dorm/twin/deluxe like #2 **and a clear CTA to choose that room** | **partly** — the pills are there; "Choose this room" is ink (secondary), below the fold at 1440×900 and 390, and competes with the coral "Next" in the bar | `book-walk/1440-2-room`, `extra/book-1440-2-room-full` |

## Calibration checklist (2026-09-29 bar)

| # | point | verdict | evidence |
|---|---|---|---|
| 1 | Hero: title + one short CTA | met — "Book package now" | `home/desktop-00` |
| 2 | No rating in hero | met | `home/desktop-00`, `mobile-00` |
| 3 | Title centred both ways, modest size | met — 48 px desktop / 41 px phone, centred | `extra/play-1440-*`, `play-390-*` |
| 4 | No overlay on video | met — only a soft local shade behind the title | same |
| 5 | No title reveal animation | none seen | play frames |
| 6 | White on coral only | met everywhere, home and booking | `home/desktop-03`, `book-walk/1440-*` |
| 7 | Tasteful readable fonts + handwritten titles | met — Lora + Dancing Script, consistent | `home/desktop-sheet` |
| 8 | Same fonts and colours through booking | met — same header, footer, script step titles, ink selection, coral Next | `book/desktop-sheet` |
| 9 | No rules or underlines; buttons for actions | met | `home/desktop-sheet` |
| 10 | Designed contact + real footer | met — icon buttons, four columns, legal row | `home/desktop-12` |
| 11 | Distinct, well-designed sections | met, with a caveat: the levels, week, guests, Instagram and footer bands all share one pale neutral, so pace comes from layout only, never from tone | `home/desktop-sheet` |
| 12 | Instagram | met (#2's row with dots) | `home/desktop-10` |
| 13 | Slideshows with dots | met — one component everywhere | `home/desktop-05`, `-06`, `-08` |
| 14 | Compact " \| " details | met. Flaw: the dorm details wrap mid-item ("Private outdoor / bathroom"). Flaw: Freestylers repeats its own title in the detail line ("Freestylers – B&B only \| from 4 nights") | `home/desktop-06`, `-03` |
| 15 | Forecast two-column, no stretch or lines | met | `home/desktop-09` |
| 16 | Text over media centred; CTAs aligned | met — hero and feature line centred; closing CTAs side by side | `home/desktop-07`, `-11` |
| 17 | Rooms sold with several big images | met — 16:10 gallery, five photos per room, description, price note | `home/desktop-06` |
| 18 | Inclusions without images | met (icon list) | `home/desktop-04` |
| 19 | Floating labels | met — guest steppers with labels inside the field | `book-walk/1440-3c-dates-filled` |
| 20 | Booking feels part of the site | met — split desk with a changing media half, site header and footer | `book/desktop-sheet` |

## What holds it below 8

1. **The last booking screen shows no action.**
   - On step 4 at 1440×900, the coral "Continue booking" hand-off is drawn behind the sticky bar (button top 857 px, bar 835–885 px). The bar shows only "Back" and "Total $3,092.05" (`book-walk/1440-4-total`). Only a coral sliver shows below the bar in the full-page shot (`extra/book-1440-4-total-full`).
   - On the phone the button is at 1,168 px, under the fold, and the bar again carries no action (`book-walk/390-4-total`).
   - The flow's destination is invisible on the screen where the visitor is most ready.
2. **Soft, upscaled footage in the booking desk's main picture.**
   - On steps 1–2 the left half (720 × 824 px) plays the 4:5 level clip, and it is pixelated: spray blocks and smeared skin (`book-walk/1440-1-level`, `1440-2-room`, `1440-2b-room-twin`).
   - On the phone the same clip fills 570 px above the step (`book-walk/390-1-level`).
   - The hero's phone rendition (608 px wide at 2×) is also soft (`extra/play-390-03-t4.4`).
   - Shahar has rejected softness on the first screen before ("the pixelation reads cheap").
3. **Prices with cents in the booking UI:** "$1,606.04", "+$80.03", "$1,546.03", "$3,092.05" in the bar and the total card (`book-walk/1440-3-dates`, `1440-4-total`). They look like a raw API dump, not a hotel's desk.
4. **The phone booking steps are not "one step per screen" in feel.** Media, progress, "Step n of 4" and a two-line script title push the choice off the first screen. On step 3 the date chips start at y ≈ 1,390 of 1,688 device px (`book-walk/390-3-dates`).
5. **Tone.** The home page is one cool temperature from the hero to the footer, white and #EEF2F5 only (`home/desktop-sheet`). The palette's own ink never appears as a band, so the guests or closing section has no weight. The current site's sand sections feel warmer by comparison.

Smaller polish:
- An unexplained red/white dot sits on the "Dorm" pill. It means "currently chosen" but reads as a notification badge (`book-walk/1440-2b-room-twin`, `390-2b-room-twin`).
- Phone level cards in booking step 1 wrap as "From $1,466 pp | 7 / nights", with an empty white circle as the radio (`book-walk/390-1-level`).
- The closing split leaves about 150 px of empty white under its buttons beside a taller photo (`home/desktop-11`).

## Score: **7.5 / 10** — FAIL (below 8), close

- **Home alone:** about 8. It is professional, consistent, specific to the place and follows every instruction.
- **Closest gold:** The Sign at round 5, with the same structure and polish, but cooler and without its dark band.
- **Booking:** brings the composite under the bar. Its frame is the best of the three originals, but the hidden final action, the soft footage as its main picture and the cents make it look unfinished. "How the booking flow feels" is part of dimension 8.

## Better than the current site? **Yes**

- **First screen:** `home/desktop-00` and `extra/hero-play-1440-sheet` against `current-site/shots/lodge/desktop-00` and `current-site/shots/home/desktop-00`. The current lodge page is a YouTube-framed sunset rock, with a breadcrumb, a stacked title and a messenger bubble. The current home is a drone shot with the YouTube chrome showing.
- **Whole page:** `home/desktop-sheet` against `current-site/shots/lodge/desktop-sheet`. Prices, sold rooms, level footage, reviews and a real booking flow, against greyed Kuula embeds, an empty rooms tab, tiny body text and a cramped footer.

## Predicted Shahar verdict

**Home: accepted** ("this is it"), perhaps with a note that it feels a bit grey or cool. **Booking: sent back.** He will tap through, reach "Your total" and find no button. He will also see the blurry surfer filling half the screen and the cents. Overall: not ready to pitch until the booking fixes below are in.

## Fix list (biggest effect first)

1. **Put the hand-off in the bar on step 4.**
   - Replace the bar's empty right side with the coral "Continue booking" (total beside it), at both widths.
   - Or reserve the bar's height as bottom padding in the step column, so the in-flow button is never under it.
   - Evidence: `book-walk/1440-4-total`, `390-4-total`.
2. **Booking media: no soft video.**
   - On steps 1–2, show the selected level's sharpest still: the d1920 poster or a business-owned photo of ≥ 1440 px. Or play a clip only if its source is at least 720 px wide for the 720 px half.
   - On the phone, cut the media block to about 200 px (or drop it), so the choice is on the first screen.
   - Serve the phone hero from a ≥ 720 × 1280 crop, or the 1080p source cropped, instead of 608 px.
   - Evidence: `book-walk/1440-1-level`, `390-1-level`, `extra/play-390-03-t4.4`.
3. **Round money to whole dollars** in the bar and the total card ($1,606, +$80, $3,092). Keep the exact figure for the engine hand-off only. Evidence: `book-walk/1440-3-dates`, `1440-4-total`.
4. **Make "Choose this room" the clear action Shahar asked for.**
   - Coral, directly under the room title and price, visible without scrolling at 1440×900.
   - Once chosen, it reads "✓ Chosen".
   - Remove the badge dot on the pill, or replace it with a small "chosen" label.
   - On this step "Next" can then stay secondary until a room is chosen.
   - Evidence: `book-walk/1440-2-room`, `extra/book-1440-2-room-full`.
5. **Give the home page one ink moment inside the approved palette.**
   - Set "What guests say" (or the closing) on #27293E with white Lora and a white script title, as The Sign's round-5 dark reviews band did.
   - Also nudge the hero shade so the pool-deck poster's title reads without relying on its glow.
   - Evidence: `home/desktop-08`, `extra/play-1440-01-t1.7`.

Also, small:
- Stop the dorm details from wrapping mid-item.
- Drop the duplicated "Freestylers – B&B only" in its detail line.
- Fix the phone level-card wraps in booking step 1.

**Keep:**
- the four-scene hero loop and its centred title + coral CTA;
- Lora + Dancing Script exactly as applied;
- the "Next set is yours" split;
- the level clips on home;
- the #2 room viewer;
- the #3 guests split with its large quote;
- the Rosa block;
- the Instagram row;
- the #1 footer;
- the booking's split desk, progress bar, Saturday chips, segmented nights, floating-label steppers and the deposit note.
