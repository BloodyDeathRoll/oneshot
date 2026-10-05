# Global Surf Lodge Kabalana: visual-critic, station 5, final site, round 1

visual-critic 0.1.1 · run `2026-09-globalsurf-02` · 2026-10-05 · full mode · round 1 · independent: I did not open the critic's or the experience-critic's report for this round.

**Pages**
- Final: `sites/global-surf-adventures/final/dist/`, served on :8764 (home and `/book/`). Build of 2026-10-05 11:06. I did not rebuild or edit it.
- Picked composite: `mockups/picked/dist/`, served by me on :8972. Used for the port comparison.
- Current site: globalsurf.com.

**Shots.** Scratch files, deleted after scoring. Every line below says in words what the shot showed.
- `final-home/`, `final-book/`, `mock-home/`, `mock-book/`, `current-home/`: `tools/shoot.mjs` at 1440 and 390, shot today.
- Current lodge page: the shoot timed out twice today (page load over 30 s). I used the shared set from 2026-10-04 instead (`reports/…/current-site/shots/lodge/`, desktop and mobile sheets).
- `walk/`: my own Playwright walk with the Bookinglayer engine blocked, so the snapshot path shows. It covers:
  - hero frames every 1.25 s during playback (`hero-<w>-0..8`);
  - booking steps at 1440×900 and 390×844 (Level 2, then Twin, then Choose this room, then +1 couple, then the first Saturday, then Total);
  - the phone guests band (`guests-*`);
  - `walk.json`, which records the video renditions played and the image files drawn.

The bar I judged against:
- Shahar's calibration of 2026-09-29;
- the gold notes (`agents/designer/gold/global-surf-notes.md`);
- my own 4f round-2 report on the picked composite (8.0, pass).

---

## Three-second note

**Desktop** (`walk/final/hero-1440-0..8`, `final-home/desktop-00`):
- The four-scene lodge loop plays the d1920 WebM (1728×972): pool deck, beginner stand-up, cheering guide, reef rider, then back to the pool.
- On top are only the header, the centred Lora line "Your surf week starts here" and the coral "Book package now".
- It is the same first screen as the mockup, frame for frame: `hero-1440-compare` shows both rows matching apart from the timing offset.
- It feels warm and alive, and I keep scrolling.

**Phone** (`walk/final/hero-390-0..8`, `final-home/mobile-00`):
- The palm and pool poster paints first, then the build-made portrait rendition plays (`gs-hero-loop.p546.webm`, 546×972).
- It has the same scenes as the mockup's phone edit. It is a little tighter, and the guide shot is framed worse (regression R1).
- It still reads as one confident first screen.

**Below the fold:** one designed site.
- The desktop home is visually identical to the picked composite: same 9938 px page, same 13 viewports (`final-home/desktop-sheet` against `mock-home/desktop-sheet`).
- The only visible copy difference is "From 4 nights" instead of "from 4 nights" on the Freestylers card.

## Port fidelity ("port, do not redesign")

| Area | Final vs picked mockup | Evidence |
|---|---|---|
| Desktop home, all sections | Identical: hero, Next set split, level clips, inclusions, Surf again slideshow, room viewer, pool moment, ink guests band, Rosa block, Instagram row, closing split, footer. | `final-home/desktop-00…12` vs `mock-home/desktop-00…12` |
| Phone home | Same order and styling. The page is 134 px taller, because the guests band now reserves room for the tallest quote. | `final-home/mobile-sheet` vs `mock-home/mobile-sheet` |
| Desktop hero video | Same cut and the same crop. | `walk/hero-1440-compare` |
| Phone hero video | Portrait rendition of the one CMS upload instead of the mockup's separate phone edit. Same subjects, tighter. The reef pan is gone. **Known open decision for Shahar, not scored as a fail.** | `walk/hero-390-compare`, `hero-390-pairs` |
| Booking, desktop | Same split desk and progress bar. "Continue booking" sits in the bar on step 4. The dates step now has the guest steppers above the Saturdays (must-fix 1). | `walk/book-1440-final` vs `book-1440-mock` |
| Booking, phone | Same, except that on the dates step the guest steppers now sit above the Saturdays. | `walk/book-390-final` vs `book-390-mock` |
| Fonts, colours, buttons | Lora + Dancing Script, coral with white text, one button system, home and booking. Self-hosted, with no visible change from the Google-loaded mockup. | all sheets |

## My 4f round-2 fix list: status in the final

| # | 4f r2 item | Status | Evidence |
|---|---|---|---|
| 1 | Phone quotes: caption clipped, ‹ › jumps | **Fixed.** "Fanny, Germany \| Booking.com" shows on load. The › control stays at the same y for quotes 2–9 (658 px into the section; 677 on first measure). The mockup's control moved between −172 and 651. | `walk/guests-final-bottom`, `walk.json` |
| 2 | Booking room photos soft on desktop | **Fixed.** The media half now draws `img-063/095/042-full-1400.webp` (1235 px native) where the mockup drew 800 px files. The dorm's lamp weave and beams are visibly crisper side by side. | `walk/room-crop` (final left, mockup right) |
| 3 | Phone booking band: headless torso | **Fixed.** The level-1 band now shows the surfer's head and raised arm in dusk light, not a bikini bottom. It is still only a fragment of the figure, but it reads as a person. | `walk/final/book-390-1-level` vs `mock/book-390-1-level` |
| 4 | Room title casing | **Fixed.** "Shared twin room – 2 beds" on the room step and the total card. | `walk/final/book-1440-2b-twin`, `book-1440-4-total` |
| 5 | Closing split's empty white; "7 / nights" wrap | Empty white **not fixed** (listed as not done in notes.md). The wrap **is fixed**: "24 Oct 2026 – 31 Oct 2026" / "7 nights" on two clean lines. | `final-home/desktop-11`, `walk/final/book-390-4-total` |

## Checklist

- **Media:** the business's own footage leads at both widths. Big business-owned photographs follow: the Next set portrait, the pool moment, a five-photo room gallery per room and the Instagram row. In booking, each level has its own clip and the media half shows the room photos. Nothing is upscaled except the phone hero, which is soft by source, as at 4f. Evidence: `final-home/desktop-sheet`, `walk/final/book-1440-*`.
- **Composition and grid:** split / full-bleed / three-card / split rhythm, with scale contrast between the 8.6 figure and the quote, and between the pool moment and the cards. No tables where pictures should be. Evidence: `final-home/desktop-sheet`.
- **Typography:** Lora text and Dancing Script titles, consistent from the hero to the booking total. The phone "Dates and / guests" title still takes two very large lines (`walk/final/book-390-3-dates`).
- **Colour:** neutral and white bands, one ink-toned guests band, and coral used only for booking actions with white text. The booking colour is unmistakable. Evidence: `final-home/mobile-sheet`, the Book now bar on every phone viewport.
- **Hierarchy and rhythm:** the eye goes title → CTA → levels → inclusions → rooms → guests → waves → book. On the phone, a sticky "From $1,466 pp | 7 nights · Book now" bar sits on every screen. Evidence: `final-home/mobile-01…15`.
- **Polish:** clean at both widths, with three small new rough edges (R1–R3 below). Evidence: as cited there.
- **Distinctiveness:** specific to this lodge (its footage, its rooms, its Rosa spot, its guests). It does not read as a template.

## Regressions vs the picked mockup

None is a calibration point. All three are small.

- **R1. Phone hero, guide shot framed off-centre.**
  - The portrait crop is fixed at 46 % across. In the cheering-guide shot he sits left of centre, and his right arm is cut by the frame edge.
  - The mockup's phone edit had him centred with both hands in frame.
  - The reef and stand-up shots are equivalent to the mockup's.
  - Evidence: `walk/hero-390-pairs`, panels 1–2.
  - This belongs to the open phone-hero decision.
- **R2. Phone booking, dates step: the Saturdays are below the first screen.**
  - The three stacked guest steppers now come first (must-fix 1). At 390×844 only the "October 2026" heading shows above the bar. The chips start under it.
  - In the mockup, all four months of chips were on the first screen.
  - The step's main choice now needs a scroll.
  - Evidence: `walk/final/book-390-3c-dates-filled` vs `walk/mock/book-390-3c-dates-filled`.
  - On desktop at 1440×900, the February chips sit under the bar and March is off screen (`walk/final/book-1440-3c-dates-filled`). That is acceptable.
- **R3. Phone guests band, dead ink under the shorter quotes.**
  - The frame now takes the tallest quote's height, so the control no longer jumps. That is the right trade.
  - It leaves about 120–250 px of empty toned photo between the caption and ‹ 1 / 9 ›.
  - The band grew from 681 to 815 px.
  - Evidence: `walk/guests-final-bottom`, `final-home/mobile-09`.

## Known open decisions (noted, not failed)

1. **Phone hero is the build-made portrait crop of the one CMS video.** The mockup's separate phone edit and its reef pan are lost. It is visually acceptable, with R1 as the one visible cost.
2. **No visible business name or h1 on the first screen.** Only the GLOBALSURF wordmark and "Your surf week starts here" show. That follows Shahar's hero rule (title + one CTA). Visually I see no cost; whether the name should be visible is Shahar's call.

## Score: **8.0 / 10**: PASS

- **Home:** a faithful port of the passed composite. On desktop it is frame-identical. The 4g fixes improved the phone quotes. Still a solid 8.
- **Booking:** better than at 4f. Room photos are sharp, casing is consistent, the phone band crop reads, and the total card is clean. The cost is R2, where the Saturday chips moved off the phone's first screen.
- R1–R3 are small. None is visible enough to drop the page below "clearly professional, beautiful, clearly better than the current site". None lifts it to 9 either: the closing split's empty white, the soft phone hero and the two-line phone step title are still there.
- **Closest gold:** The Sign. Same structure and level of polish. Slightly below it on the phone hero's softness and on the R1 crop.

## Better than the current site? **Yes**, first screen and whole page

- **First screen:** `walk/final/hero-1440-0` (sunny pool deck, then the lodge's surf scenes, one centred title, one coral CTA, no chrome) against two current pages:
  - `current-home/desktop-00`: a drone shot inside a YouTube frame with a share icon, "More videos" and the YouTube logo bar, a Messenger bubble, and a tailor-made-trips headline about the whole agency;
  - the lodge page `desktop-sheet`, first frame: a dark dusk rock, a breadcrumb inside the hero, a two-line title-case headline and YouTube chrome.
- **Phone first screen:** `final-home/mobile-00` against `current lodge mobile-sheet` panel 1. Ours is a bright pool poster, then the loop. Theirs is a dark dusk still with a breadcrumb over the title and a Messenger bubble.
- **Whole page:** `final-home/desktop-sheet` + `final-book/*` against `current-home/desktop-sheet` and the lodge desktop and mobile sheets.
  - **Ours:** prices, levels with footage, rooms sold with galleries, a sourced rating, a forecast, Instagram, a designed footer and a real booking desk.
  - **Theirs:** a lead form, a duplicated "Choose your level" heading, a blurred Kuula 360 embed where the rooms should be, an empty "#BEGLOBAL" band, tiny grey body text, a dense text footer with a newsletter box, and a Messenger bubble on every screen.
  - The current site's sand warmth and handwritten titles are its strengths. Ours keeps that charm through the Dancing Script titles and beats it on everything else.

## Fix list (none blocks the pass; biggest effect first)

1. **Phone dates step (R2):** get at least the first month of Saturdays onto the first screen at 390×844.
   - Put the three steppers in one compact row (Women / Men / Couples, as on desktop), or shrink the phone step title to one line ("Dates & guests" at a smaller script size).
   - Evidence: `walk/final/book-390-3c-dates-filled`.
2. **Phone hero crop (R1):** move the portrait crop per scene so the guide is centred with both hands in frame, or offer Shahar the mockup's phone edit as a phone-only `videos[]` row.
   - This is part of the open decision.
   - Evidence: `walk/hero-390-pairs`.
3. **Phone guests band (R3):** keep the fixed height but set the control directly under the tallest caption.
   - Or cap the reserved height and allow a small control shift only for the one longest quote.
   - Either way, the empty toned area shrinks.
   - Evidence: `walk/guests-final-bottom`.
4. **Closing split (carried from 4f):** centre the text column vertically against the photo, or shorten the photo. About 180 px of empty white remains under the buttons (`final-home/desktop-11`).

**Keep:** everything ported from the composite:
- the four-scene hero with its centred Lora line and coral CTA;
- Lora + Dancing Script;
- the ink guests band;
- the level clips;
- the room viewer with 1400 px renditions in booking;
- the Rosa block, Instagram and the footer;
- the booking desk with the step-4 hand-off in the bar.
