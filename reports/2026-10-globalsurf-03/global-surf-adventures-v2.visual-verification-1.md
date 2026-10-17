mode: full        round: verification 1 (after the station 5 r1 fix pass)        station: 5        variant: unique ("From the air")
agent: visual-critic 0.1.1 · run 2026-10-globalsurf-03 · 2026-10-17 · build: HEAD 291ae7c, dist built 15:29, no src newer

# Global Surf v2: final site, visual verification 1

**Score: 8.8 / 10. Pass. Better than the current site: yes, on the first screen and on the whole page.**

All five of my round-1 must-fixes landed, either fully or nearly. I found no regression. One small thing is left: the phone poster frame is still soft. It is not blocking.

## What I looked at

- **Final build.** `final/dist`, served over http on 127.0.0.1:8791. I shot it fresh with `tools/shoot.mjs` into my own scratch folder. The shared `final/shots/` set predates this dist: its shoot is from 15:18, the build from 15:29.
  - 16 desktop frames, 12,952 px tall.
  - 19 mobile frames, 14,419 px tall.
  - No console errors.
- **My probes:**
  - hero frames at 0.2, 0.6, 1.2, 2.5, 4, 6, 9 and 12 s, at 1440 and at 390 @2x;
  - the header at hero exit, scrolled to hero height −200, −80, −20, 0 and +40 px;
  - the reduced-motion first screen at both widths;
  - `/book/` full-page at both widths;
  - the video state read from the DOM.
- **Current site.** `reports/2026-10-globalsurf-03/current-site/shots/desktop-sheet.png` and `mobile-sheet.png` (globalsurf.com Kabalana lodge page).
- **Round-1 report.** `global-surf-adventures-v2.visual-final.md`. I did not open the other critics' reports.

## Three-second test

- **Desktop.** `desktop-00` and the hero probes show the same calm, bright aerial hero. One short Literata title and one pool-blue "Book package now" button sit on it, with nothing else on the video. The loop is now 7 s of clean cuts:
  1. the lodge and its pool from the air above the coast road;
  2. the reef coast curving away;
  3. the palms and roofs with the sea behind;
  4. surfers on boards from straight above.

  None of the 8 probe frames shows a ghosted dissolve. I want to scroll.
- **Phone.** `mobile-00` and the phone hero probes show the same structure.
  - The video now plays the 1080 × 1746 phone rendition (`gs2-hero.p1080.webm`, 1.4 MB).
  - The lodge-aerial frame at 1.2 s is crisp at DPR 2: in a crop of `hero-m-1200`, the pool tiles, sun loungers, umbrellas and road markings are all sharp.
  - This is a clear step up from round 1's smeared 668 px master.
- **Current site.** In `current-site mobile-sheet` frame 1 and `desktop-sheet` frame 1, the hero is a murky palm silhouette under a purple sky. Breadcrumbs sit over it, there is a salmon all-caps button, and a Messenger bubble covers the corner. The new site wins at a glance.

## Round-1 must-fixes, checked

1. **Sharpen the phone hero: fixed for the video, partly for the poster.**
   - The phone rendition is now 1080 w, and the poster `gs2-hero-poster.p1080.webp` is 1080 × 1746.
   - The poster *frame* is still the palms-and-roof shot, though (`rm-m`, the reduced-motion phone screen). At 100 % its palm fronds and roof edges are smeared by motion and compression. The source shot itself is soft, so a higher resolution does not cure it.
   - That frame is what every phone paints before the video starts, and all that a reduced-motion or Save-Data visitor ever sees. It is acceptable, but it is the softest moment of the first screen.
2. **Replace Level 1's lead: fixed.**
   - In `desktop-01` the big 7-column slot is now a golden-hour stand-up: a woman with arms out, silhouetted into the sun, with lens flare.
   - It is bright, warm and inviting, and reads as "first time, joyful". The grey shirtless-stretch frame is gone.
   - The image is a little soft, but the softness reads as golden-hour haze, not as a bad frame.
   - It also leads `/book/` "Your level" (`book-d`).
3. **Remove the hero dissolve ghosting: fixed.**
   - The `hero-d-*` and `hero-m-*` frames from 0.2 s to 12 s are all clean single shots.
   - The poster hands off to the video as a hard cut: the poster is the palms frame, and the video at 0.6 s opens on the lodge aerial. There is no muddy blend.
4. **Clean up `/book/`: fixed.**
   - In `book-d`, the Bookinglayer/deposit note appears once, inside the summary card under "Continue booking".
   - Room names are in one case style: "Mixed dorm room – 4 beds", "Shared twin room – 2 beds", "Deluxe double room".
   - In `book-m` at 390, each room name sits on one line beside a bigger thumbnail, with the price on its own line below the text.
   - The optional image band under "Book your week" was not added. The page stays plain but tidy. Not required.
5. **Desktop header and seam: fixed.**
   - In `exd` (the exit probes), the header is solid white with "Book now" at every offset past the hero. There is no blurred teal band without a button.
   - The thin dark strip under the header in `desktop-01` is the last pixels of the hero itself at that scroll position. It is not a header state.
   - Before the drop, in `desktop-04` (sheet frame 5), the What's-included tint now runs straight into the framed first plate, so the white seam is gone.

## Regressions

None found.
- **Unchanged and checked frame by frame on the contact sheets:** the drop (`desktop-04`/`-05`/`-06`), the featureLine plate (`desktop-07`), the lodge split (`desktop-08`), the room viewer and tabs (`desktop-09`/`-10`), the barrel band and waves split with Rosa (`desktop-11`), the guests block (`desktop-12`), the night close, Instagram and footer (`desktop-13`–`15`).
- **Phone:** the bottom bar is present in every mobile frame, with nothing overlapping. The review dots fit on one row in `mobile-15`.
- **Small leftover gap on the phone:** in `mobile-14`/`-15`, about 60 px of white sits between the end of the waves tint and the sunset photo. It is minor and was already much reduced in round 1.

## Checklist (short; full walk in round 1, unchanged)

- **Media.** Business-owned aerial video leads. After it come the business's best photographs, big: the pool drop, the barrel, yoga at sunset, the night lodge, and rooms with six photos each.
- **Composition.** Editorial throughout: a 7/5 levels grid, full-bleed plates, splits and a real footer. Nothing reads as a table.
- **Type.** Literata with Parisienne section titles, matching the old site's formula but cleaner. The headline is modest in size.
- **Colour.** One pool-blue booking colour, white text on it, used from the hero to `/book/` "Continue booking".
- **Hierarchy and rhythm.** Prices appear on the second screen. The pacing varies: quiet, cinematic, data, quote.
- **Polish.** Clean at both widths. The only notes are the soft phone poster frame and the small white gap on the phone.
- **Distinctiveness.** High. The descent onto this lodge's own pool belongs to no other business.

## Score and closest reference

**8.8 / 10. Pass.** This is above `gold/the-sign` at the drop, the rooms and the night close, and level with it on the hero. My round-1 score was 8.5. The rise comes from the clean hero loop, the sharper phone video, the better Level 1 lead and the tidier `/book/`. It is held under 9 by the soft phone poster frame and the still-plain booking page.

## Better than the current site?

- **First screen: yes.** Compare `desktop-00`/`mobile-00` with `current-site desktop-sheet` and `mobile-sheet` frame 1: a bright, legible aerial of the lodge and its reef, against a murky silhouette with breadcrumbs and a chat bubble.
- **Whole page: yes, clearly.** It keeps the old site's character (serif plus handwritten titles, distinct sections, Instagram, a real footer). It adds prices on the second screen, rich room galleries, a live forecast and a booking flow in the site's own design. The current site's tracked-caps footer link list and Kuula 360° viewer look dated next to it.

## Remaining fixes (none blocking)

1. **Phone poster frame.** Take the phone poster from the sharp lodge-aerial shot (the frame at about 1.2 s, as in `hero-m-1200`) instead of the soft palms-and-roof shot. Then reorder the loop so that shot opens it. That keeps the hand-off seamless and makes the reduced-motion and Save-Data screen as crisp as the video.
2. **Optional `/book/` image band.** Add a slim room or pool still under "Book your week", so the booking page carries some of the home page's richness.
3. **Phone waves-to-guests gap.** Close the roughly 60 px of white between the waves tint and the sunset photo (`mobile-14`/`-15`).

## Keep

Everything listed in round 1, plus the new hard-cut hero loop, the 1080 phone rendition, the golden-hour Level 1 lead, the header that snaps white, and the cleaned `/book/` room cards.
