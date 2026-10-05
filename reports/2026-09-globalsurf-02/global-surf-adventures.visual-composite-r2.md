# Global Surf Lodge Kabalana: visual-critic, station 4f, picked composite, round 2

visual-critic 0.1.1 · run `2026-09-globalsurf-02` · 2026-10-04 · quick mode · round 2 (after the designer's fix round, commit 2c7a17e) · independent: I opened no critic or experience-critic report.

Pages: `sites/global-surf-adventures/mockups/picked/dist/` (home) and `dist/book/` (standalone booking), served on :8971.

Shots (all under `reports/2026-09-globalsurf-02/visual-composite-r2/`):
- `home/` and `book/`: tools/shoot.mjs at 1440 and 390, shot fresh this round.
- `walk/`: my own Playwright walk with the engine blocked, so the snapshot path shows.
  - `hero-<w>-0..8.png` + `hero-<w>-sheet.png`: hero frames taken every 1.25 s during real playback.
  - `<w>-1-level` … `<w>-4-total`: the booking steps at 1440×900 and 390×844, plus `-full` page shots.
  - `390-guests-*`, `guests-cap-390.png`: the guests band on the phone.
  - `walk.json`: video rendition, engine calls, and the hand-off button's position.
- `current/home/` and `current/lodge/`: globalsurf.com and the Kabalana lodge page, shot today.

Bar used:
- Shahar's calibration of 2026-09-29 (every point is a hard bar).
- His verbatim composite instructions (ledger, `mocked → picked`).
- The gold notes (`agents/designer/gold/global-surf-notes.md`).
- The current site.

The Dancing Script titles, the Lora hero title and the #1 palette are settled. I judged only whether they are applied consistently.

House rules beat my round-1 asks: no large flat dark panel and no overlay on the hero video. I judged the designer's answers against those rules.

---

## Round-1 fixes: fixed or not

| # | Round-1 fix | Status | Evidence |
|---|---|---|---|
| 1 | Hand-off visible on step 4 | **fixed** | The bar now carries a coral "Continue booking" next to "Total $3,092". At 1440×900 it sits at y 834–886; at 390×844 at y 786–834. Both are fully on screen (`walk/1440-4-total`, `walk/390-4-total`, `walk.json`). |
| 2a | Booking level clip soft | **fixed** | Native 864×1080 cut drawn at 720×824. The level-1 surfer in the media half reads clean, with no blocky spray (`walk/1440-1-level`). |
| 2b | Phone media block pushes the choice off screen | **fixed** | The band is now 135 px. All three level cards start on the first screen; the room step has no band (`walk/390-1-level`, `390-2-room`). |
| 2c | Phone hero soft | **not fixable, accepted** | The 608 px crop of 1080p source has no larger source. It is still soft at 2× (`walk/hero-390-2`, the guide), but acceptable in motion. |
| 2d | *New this round:* room photos in the booking media half | **regressed / new** | The room gallery fills the 720×824 half on desktop. `sizes="50vw"` makes the browser pick the 800 px rendition, which is then cover-scaled about ×1.55. The dorm lamps and beams are visibly soft (`walk/1440-2-room`, `1440-2b-room-twin`). The 1400 px renditions exist in `img/w/`. |
| 3 | Whole dollars | **fixed** | $1,466 / +$80 / $1,546 / $3,092 in the bar and the total card (`walk/1440-4-total`, `390-3c-dates-filled`). |
| 4 | "Choose this room" is the clear action | **fixed** | Coral, directly under the name and price. It is at y 481 at 1440 and on the first phone screen. "✓ Chosen" appears after choosing, the pill gets a tick instead of the badge dot, and Next stays soft until a room is chosen (`walk/1440-2-room`, `390-2-room`). |
| 5a | One ink moment on home | **fixed, within the house rule** | "What guests say" is #27293E with the guests' toast photo toned into it. It has real weight, and the page now changes temperature once, after the pool photo (`home/desktop-08`, `home/mobile-09`). A flat panel would break house rule 1; the toned photograph is the better answer. |
| 5b | Hero title over the pool-deck poster | **fixed** | The title is legible on all nine sampled frames at both widths: pool, stand-up, guide, reef and back to the pool (`walk/hero-1440-sheet`, `hero-390-sheet`). There is no overlay, only the local shade. |
| s1 | Dorm details wrap mid-item | **fixed** | "Sleeps 4 \| 4 single beds \| Private outdoor bathroom" then "Shared". Items stay whole and no line ends on a bare bar (`home/desktop-06`, `mobile-07`). |
| s2 | Freestylers repeats its title | **fixed** | The detail line is now just "from 4 nights" (`home/desktop-03`). |
| s3 | Phone level-card wraps in booking | **fixed** | "From $1,466 pp \| 7 nights" fits on one line, and the radio is a white tick disc (`walk/390-1-level`). |
| s4 | Closing split's empty white under the buttons | **not fixed** (minor) | About 180 px of empty white under "Book package now / Questions? Ask us", beside the taller photo (`home/desktop-11`). |

## Three-second note

**Desktop** (`home/desktop-00`, `walk/hero-1440-sheet`):
- The lodge's own loop at real speed: pool deck, a beginner's first stand-up, the guide cheering, then the reef rider.
- Only the header, one centred Lora line and one coral "Book package now" sit on top.
- It feels warm and alive, and I would keep scrolling.
- The title now holds on the white-walled pool frame without relying on its glow.

**Phone** (`home/mobile-00`, `walk/hero-390-sheet`):
- Same structure, centred both ways.
- The palm and pool poster is bright and inviting.
- The footage is soft by source; it reads as video, not as an error.

**Below the fold:** one designed site.
- One button system, one dot style, script titles in ink.
- White and neutral bands alternate, and the toned ink guests band gives the page a dusk moment before the waves.

**Booking:** now feels finished at both widths.
- Every step's choice is on the first screen.
- The money is clean.
- The destination ("Continue booking") is always in the bar.

## Shahar's composite instructions, item by item

| # | Instruction (condensed) | Verdict | Evidence |
|---|---|---|---|
| 1 | Hero = #1's loop + #3's beginner and cheering guide | met: four scenes, real speed, about 10.3 s, title legible on every scene | `walk/hero-1440-sheet`, `hero-390-sheet` |
| 2 | Fonts from #3, titles in a script (now the approved Dancing Script) | met: Lora + Dancing Script only, home and booking | `home/desktop-01`, `-05`, `walk/1440-3-dates` |
| 3 | "Next set is yours" from #3 | met | `home/desktop-01` |
| 4 | Choose your level from #1, Booking rating removed | met | `home/desktop-02`, `-03` |
| 5 | What's included + Surf again from #3 | met | `home/desktop-04`, `-05` |
| 6 | Our rooms from #2 | met | `home/desktop-06` |
| 7 | Pool image, What guests say, The waves from #3 | met; guests now in ink | `home/desktop-07`, `-08`, `-09` |
| 8 | Follow the lodge from #2 | met | `home/desktop-10` |
| 9 | "Book the week for your level" from #3 | met | `home/desktop-10`, `-11` |
| 10 | Footer from #1 | met | `home/desktop-12` |
| 11 | Booking standalone, each step on its own screen | **met, now also on the phone**: each step's choice is on its first screen | `walk/390-1-level`, `390-2-room`, `390-3-dates`, `390-4-total` |
| 12 | Rooms step: Dorm/Twin/Deluxe selector + a clear CTA to choose | **met**: coral "Choose this room" under the name and price, "✓ Chosen" after | `walk/1440-2-room`, `1440-2b-room-twin`, `390-2-room` |

## Calibration checklist (2026-09-29 bar)

| # | Point | Verdict | Evidence |
|---|---|---|---|
| 1 | Hero: title + one short CTA | met | `home/desktop-00`, `mobile-00` |
| 2 | No rating in the hero | met | same |
| 3 | Title centred both ways, modest size | met | `walk/hero-*-sheet` |
| 4 | No overlay on the video | met: local radial shade only | same |
| 5 | No title reveal animation | none seen | same |
| 6 | White on coral only | met, home and booking | `home/desktop-03`, `walk/1440-4-total` |
| 7 | Tasteful readable fonts + handwritten titles | met | `home/desktop-sheet` |
| 8 | Same fonts and colours through booking | met | `book/desktop-sheet`, `walk/*` |
| 9 | No rules or underlines; buttons for actions | met | `home/desktop-sheet` |
| 10 | Designed contact + real footer | met | `home/desktop-12` |
| 11 | Distinct sections | met: the ink guests band now varies the tone as well as the layout | `home/desktop-sheet` |
| 12 | Instagram | met | `home/desktop-10` |
| 13 | Slideshows with dots | met. On the phone the quotes use ‹ 1 / 9 ›, a sensible change from nine wrapping dots. | `home/mobile-09` |
| 14 | Compact " \| " details | met | `home/desktop-06`, `-08` |
| 15 | Forecast two-column, no stretch or lines | met | `home/desktop-09` |
| 16 | Text over media centred; CTAs aligned | met | `home/desktop-07`, `-11` |
| 17 | Rooms sold with several big images | met on home. In booking the photos are big but soft (fix 1). | `home/desktop-06`, `walk/1440-2-room` |
| 18 | Inclusions without images | met | `home/desktop-04` |
| 19 | Floating labels | met | `walk/1440-3c-dates-filled`, `390-3c-dates-filled` |
| 20 | Booking feels part of the site | met | `walk/*` |

## What is still wrong (none is a calibration point)

1. **The phone guests band hides the first review's name** (new, from the "size to the quote shown" fix).
   - On load at 390, the quote frame is 220 px tall but the first figure needs 253 px.
   - "Fanny, Germany | Booking.com" is therefore clipped below the frame (`home/mobile-09`, `walk/390-guests-section`).
   - Measured: frame bottom 603, caption bottom 636. Quotes 2–9 size correctly after a tap.
   - This looks like a measurement taken before Lora swapped in.
   - The frame height also changes from 152 to 354 px between quotes, so the ‹ › control jumps under the thumb.
2. **Booking room photos are soft on desktop.**
   - The largest picture on the room step is an 800 px file cover-scaled into 720×824 (`walk/1440-2-room`, `1440-2b-room-twin`).
3. **Phone booking step 1 band crops the level-1 poster to a headless torso.**
   - It shows a bikini bottom and an arm on the first screen of `/book/` (`walk/390-1-level`).
   - The 4:5 poster is cover-cropped into 390×135 at `object-position: 50% 50%`.
4. **Room titles mix casing.** "Mixed dorm room – 4 beds" against "Shared Twin Room – 2 Beds" (`walk/1440-2b-room-twin`, `1440-4-total`).
5. **Smaller polish:**
   - On the phone total card, "… | 7 / nights" wraps mid-item (`walk/390-4-total`).
   - The closing split still leaves about 180 px of empty white (`home/desktop-11`).
   - The phone step title "Dates and / guests" takes two very large lines (`walk/390-3-dates`). The chips are still on the first screen.

## Score: **8.0 / 10**: PASS (narrowly)

- **Home:** solidly 8. Professional, consistent, specific to the lodge, and every one of Shahar's instructions is followed. The ink guests band gives it the depth it lacked in round 1.
- **Booking:** the round-1 blockers are gone: hidden action, soft clip, cents, buried room CTA. It now reads as a finished hotel desk at both widths. What remains is image handling (soft room photos, a bad phone crop) and one clipped caption. They are visible to a careful eye but small and cheap to fix, and none breaks the flow.
- **Closest gold:** The Sign at round 5. Same structure and polish, with its dark band restored as a toned photograph. Slightly below it on the softness of the booking room photos.

## Better than the current site? **Yes**

- **First screen:** `home/desktop-00` + `walk/hero-1440-sheet` against `current/lodge/desktop-00` and `current/home/desktop-00`.
  - The current lodge page has a YouTube-framed dusk palm shot, a breadcrumb and a stacked title-case headline.
  - The current home has a drone shot with YouTube chrome, a pause icon over the title and a Messenger bubble.
- **Whole page:** `home/desktop-sheet` + `book/desktop-sheet` against `current/lodge/desktop-sheet` and `mobile-sheet`.
  - Ours: prices, rooms sold with galleries, level footage, a sourced rating, a real booking flow and a designed footer.
  - Theirs: greyed Kuula embeds, an empty rooms viewer, tiny grey body text, a lead form and a cramped footer.
  - The current site's sand warmth and olive script are its strengths. Ours matches that charm and wins on everything else.

## Predicted Shahar verdict

- **Home:** accepted.
- **Booking:** accepted.
- He may note the soft room photo on the desktop room step and the odd torso crop at the top of the phone booking.
- On the phone home he may notice the first review has no name.
- Pitchable once fixes 1–3 below are in. They are each a small change.

## Fix list (biggest effect first)

1. **Phone quotes: size the frame after fonts load.**
   - Measure on `document.fonts.ready` and on resize, or use a fixed min-height equal to the tallest figure at that width.
   - The attribution must always show, and the ‹ › control should not jump.
   - Evidence: `home/mobile-09`, `walk/390-guests-section`.
2. **Booking room media half: serve the 1400 px renditions on desktop.**
   - Set `sizes` on the media-half gallery to about `(min-width: 1000px) 1240px, 100vw`. The 720×824 cover crop of a 3:2 photo needs about 1240 px.
   - Evidence: `walk/1440-2-room`.
3. **Phone booking band, step 1: recrop.**
   - Set `object-position` to about `50% 20%` per level poster, so the surfer's head and board are in the strip.
   - Or use a landscape frame or photo of that level for the band.
   - Evidence: `walk/390-1-level`.
4. **Normalise room titles to one casing** in the template display ("Shared twin room – 2 beds"), or ask the owner to fix them in the CMS. Evidence: `walk/1440-2b-room-twin`.
5. **Close the empty space in the closing split**, by vertically centring its text column against the photo, or shortening the photo. Also keep "7 nights" together on the phone total card. Evidence: `home/desktop-11`, `walk/390-4-total`.

**Keep:**
- the four-scene hero loop, its centred Lora title and the coral CTA;
- Lora + Dancing Script as applied;
- the ink-toned guests band;
- the "Next set is yours" split;
- the level clips on home;
- the #2 room viewer;
- the Rosa block, the Instagram row and the #1 footer;
- in booking: the split desk, the progress bar, the step-4 hand-off in the bar, the coral "Choose this room" → "✓ Chosen", whole-dollar money, the Saturday chips, the segmented nights and the floating-label steppers.
