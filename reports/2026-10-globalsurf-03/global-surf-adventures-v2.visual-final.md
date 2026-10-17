mode: full        round: 1        station: 5        variant: unique ("From the air")
agent: visual-critic 0.1.1 · run 2026-10-globalsurf-03 · 2026-10-17

# Global Surf v2: final site, visual verdict

**Score: 8.5 / 10. Pass. Better than the current site: yes, on the first screen and on the whole page.**

## What I looked at

- **Final build.** `sites/global-surf-adventures-v2/final/dist`, served over http (`localhost:8731`, so Rosa can frame). I shot it with `tools/shoot.mjs` into `sites/global-surf-adventures-v2/final/shots/`: 17 desktop and 19 mobile frames, page height 13,062 / 14,609 px, no console errors.
- **My own probes:**
  - hero frames at 0.2, 2, 4 and 6 s at both widths;
  - the reduced-motion poster at both widths;
  - full-page `/book/` at 1440 and 390.
- **Current site.** `reports/2026-10-globalsurf-03/current-site/shots/desktop-sheet.png` and `mobile-sheet.png`, the live Kabalana lodge page shot on 2026-10-16.
- **Picked mockup.** My round-2 verdict on `mockups/unique` (8.5, pass) in `global-surf-adventures-v2.visual.md`. I checked that verdict's remaining fixes against this build.
- **Gold bar.** `agents/designer/gold/` (the-sign, global-surf-notes) and the calibration list in `visual-critic/references.md`.

## Three-second test

- **Desktop** (`desktop-00.png`, plus hero probes at 0.2–6 s):
  - The loop runs through four shots: the lodge from the air in the palms, the reef coast curving away, surfers on boards from straight above, and the sea over the lodge roofs. All four are the business's own footage, crisp at 1440.
  - "Your surf week starts here" in Literata sits centred with one short deep-blue "Book package now" button. Only the header sits on top. There is no rating, no tagline and no overlay.
  - I want to keep scrolling.
  - One blemish: the frame at 0.2 s is a dissolve between two shots, palms ghosted over sea. It reads muddy for about half a second on every loop.
- **Phone** (`mobile-00.png`, phone hero probes, `poster-m`):
  - Same structure, with a good vertical crop of sea above the lodge roofs.
  - The image is visibly **soft**: palms and roofs smear at DPR 2 (the 668 px master is drawn across 780 device px), and the poster is soft too. Title and button are perfectly legible.
  - It is still the strongest first screen this business has had.
- **Current site** (`current-site desktop-sheet` frame 1, `mobile-sheet` frame 1):
  - A dark, murky upward shot of palm fronds against a purple sky, under a two-line title.
  - Breadcrumbs sit over the hero, there is a salmon all-caps button, and a Messenger bubble covers the corner.
  - The new page wins at a glance.

## Checklist (evidence per item)

**Media**
- The business's own aerial video leads (hero frames). Its best photographs follow big:
  - the three-plate drop onto the lodge's own pool (`desktop-04`, `-05`, `-06`, with img-062 → img-026);
  - the poolside featureLine plate ("Footwear is discouraged. Chilling out is inescapable.", sheet frame 8);
  - the barrel band (`desktop-11`, a surfer laughing inside a turquoise wave with the coast behind);
  - yoga silhouettes at sunset beside the review (`desktop-12`);
  - the night lodge under string lights (`desktop-13`).
- Rooms have six photos each (`desktop-10`, dots under the gallery), which answers Shahar's "sell the rooms" rule.
- Weak points:
  1. **Level 1's lead** in the big 7-column slot is still the dullest image on the page. `desktop-01` shows a soft, grey-green video frame of a shirtless man stretching beside a laughing woman. `desktop-02` shows the same clip as feet on foam boards in the sand. This was my round-2 fix #1, and it is not fixed.
  2. The **phone hero** is soft (`mobile-00`).
  3. On `/book/`, the level and room thumbnails are fine at 56 px, but the page itself carries no hero image (`book-d`).

**Composition and grid**
- Editorial throughout:
  - a 7/5 levels grid (`desktop-01`, `-02`);
  - the Freestylers card as a tinted strip (`desktop-02`);
  - the breakfast photo overlapping the tint band in "What's included" (sheet frame 4);
  - full-bleed drop plates;
  - a two-column lodge block, text left and slideshow with dots right (`desktop-08`);
  - a full-width room viewer with names as tabs (sheet frame 10);
  - the barrel band;
  - a waves split with numbers left and the Rosa widget right (`desktop-11`), with no rules and no stretched gap;
  - a guests split, the night close, an Instagram strip edge to edge, and a real three-column footer (`desktop-16`).
- Level buttons now align on one baseline (`desktop-02`, Level 1 and Level 3 buttons at the same height). Nothing reads as a table.
- Minor: between "What's included" and the drop, a pale tint strip ends and about 110 px of white follows before the framed plate starts (`desktop-04`, top). It reads as a seam.

**Typography**
- Literata for text with Parisienne script for section titles ("Choose your level", "What's included", "The lodge", "Our rooms", "The waves", "What guests say", "Follow the lodge", "Book your week"). This is the old site's readable-face-plus-handwriting formula done more elegantly.
- The headline sits at a modest size, not a giant word. Measure and leading are comfortable.
- The amenities list as " | " runs (`desktop-08`) is compact, per Shahar's rule.
- `/book/` has one script title only ("Book your week"), and its steps ("Your level", "What's included", "Your room", "Dates and guests") are plain labels. This was my round-2 fix #2, and it is fixed.

**Colour**
- White, a pale pool tint, green-black ink and one deep pool-blue for every booking button (header, levels, rooms, closing, `/book/` "Continue booking"). All have white text, and there is no orange.
- WhatsApp buttons are white pills with the green glyph. The booking colour is unmistakable and consistent from the hero to the engine hand-off.

**Hierarchy and rhythm**
- The pace varies well: levels with prices on the second screen, a tint band, the cinematic drop, then quiet text with a slideshow, the gallery, the barrel band, data with the widget, a quote, the night, a CTA, Instagram, and the footer.
- The phone bottom bar ("From $1,466 pp | 7 nights · Book now", every mobile frame) keeps the action in reach without covering content.

**Polish**
- Mostly clean at both widths: pills with soft shadows, circular icon buttons, slideshow arrows and dots, and a designed footer with buttons, not underlined links.
- Issues:
  - The hero dissolve ghosting (probe at 0.2 s, both widths).
  - The desktop header at the hero's exit (`desktop-01`) shows a dark teal, blurred band with no "Book now". It looks like a mid-transition state the visitor sees on every first scroll; it should snap from transparent to white.
  - On `/book/` (`book-d`), "Next, on our Bookinglayer booking page… 40% deposit…" is printed twice, once above the summary card and again inside it. Room names mix title case ("Shared Twin Room – 2 Beds") with sentence case ("Deluxe double room").
  - On `/book/` at 390 (`book-m`), the room-card text is squeezed into a narrow column beside the price, so "Mixed dorm room – 4 beds" breaks over three lines.
  - The phone gaps I flagged at round 2 (white above the plate, white between the forecast card and the sunset photo) are much smaller now (`mobile-06`, `mobile-14`).

**Distinctiveness**
- High. The descent from the coast road onto this lodge's own pool, and the reef coast in the hero, belong to no other business. Nobody would mistake this for a template.

## Score and closest reference

**8.5 / 10. Pass.**
- It is above `gold/the-sign` at the drop, the barrel band, the rooms and the night close, and level with it on the desktop hero.
- It is held below 9 by:
  - the soft phone hero (the first thing most visitors see);
  - the still-dull Level 1 lead;
  - the plain, slightly repetitive `/book/` page.
- It is a faithful build of the picked mockup, which I scored 8.5. Nothing regressed and two of my three round-2 fixes landed.

## Better than the current site?

- **First screen: yes.** `desktop-00` / `mobile-00` against `current-site desktop-sheet` frame 1 and `mobile-sheet` frame 1: the bright, legible aerial of the lodge and its reef against a murky palm silhouette with breadcrumbs and a chat bubble.
- **Whole page: yes, clearly.** `final desktop-sheet` against `current-site desktop-sheet`. It keeps the old site's character: serif with handwritten titles, distinct sections, Instagram and a real footer. It adds:
  - prices on the second screen;
  - rooms with six photos each;
  - the place explained from the air;
  - a live forecast;
  - a booking flow inside the site's own design.

  The old site has none of these, and its 360° viewer and newsletter footer look dated next to it.

## Fix list (biggest effect first)

1. **Sharpen the phone hero.**
   - Re-cut `hero-p668` from the 1080 px source at native height for DPR 2 (about 1080 px wide crop, or at least 780 px), and keep it within 2 MB with AV1/WebM.
   - Regenerate the phone poster from the same frame at 1080 w.
   - Today `mobile-00` and the poster are visibly smeared.
2. **Replace Level 1's lead** in the 7-column slot (`desktop-01`, `-02`).
   - Use a bright, sharp beginner moment: a still of img-104, img-118 or img-133 (lesson on the sand), or a better-lit vid-010 stretch.
   - It should be no softer than the Level 2 and Level 3 clips beside it.
3. **Remove the hero dissolve ghosting.**
   - Hard-cut between shots in the edit, or keep each dissolve under 0.3 s.
   - Make sure the loop restart (t = 0) is not a dissolve, so the poster → first-frame hand-off is clean.
4. **Clean up `/book/`.**
   - Print the Bookinglayer/deposit note once, inside the summary card only.
   - Use one case style for room names.
   - At 390, stack the price under the room text so names do not break over three lines.
   - Optionally add a slim image band (a room or pool still) under "Book your week", so the booking page feels as rich as the home page.
5. **Desktop header and seam.**
   - The header should go straight from transparent to solid white, so the dark blurred band with no button in `desktop-01` never shows.
   - Close the tint-strip-plus-white gap before the drop plate (`desktop-04`).

## Keep

- The aerial hero edit: one short title, one button, nothing else on the video.
- Literata + Parisienne.
- The single pool-blue booking colour.
- The 7/5 levels grid with prices and the 8.6 proof beside the intro.
- The three-plate drop and the featureLine plate.
- The lodge split with the slideshow.
- The full-width room galleries with names as tabs.
- The barrel band.
- The waves split with the Rosa widget.
- The yoga-sunset guests block.
- The night close with two buttons.
- The Instagram strip.
- The button-based footer.
- The phone bottom bar.
- `/book/` as one designed page with a single script title.
