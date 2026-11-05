# Sanjee Surf School: calm mockup, "The sand" (concept 1)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.
Page: `dist/index.html`, one file, with CSS and JS inlined from `src/page.css` and `src/page.js` by `src/build.py`. Words, prices, ratings, reviews and contact are read from `copy/en.json`, not retyped. Fonts come from Google Fonts at 4e (Source Sans 3 400/600, Mr Dafoe), loaded so they do not hold the first paint.
Media: `src/make-media.sh` (`# media: sites/sanjee-surf-school/mockups/calm/dist/img/**`). Wash line: `src/trace-wash.py` writes `src/wash.json`, text only.
To rebuild: `bash src/make-media.sh && python3 src/build.py`. `--hero` builds the first screen only, which is how rounds 1 to 4 were made.

## look-log

**The bar.** The business has its own site. Compared with `dossier/sanjee-surf-school/funnel/walk/01-home-fold-settled.png` (phone first screen) and `assets/old-site-desktop.png` (whole page). Shots are in `shots/round-N`. `shots/round-13` is the last, of the last build. Round 9 was the build the critics scored; rounds 10 to 13 are the rework after their round 1.

**Round 1, first screen.**
- **Wrong as design:** the wash line reads as a snowy mountain range: pointed white peaks, rounded valleys, far too tall on desktop, and it has eaten the sand it is meant to lap over. I had traced the foam edge correctly but kept the photograph's orientation, where foam tongues point down at the sand, so on the page the tongues were inside out. The button nearly touches the palm tops, and the header nav stops 200 px short of the right edge because of the hidden header button. A utility pole stands at the right edge of the frame.
- **Change:** flip the trace (white tongues up, sharp notches down), halve its height, add a faint film of water ahead of it, centre the words in the open sky rather than the whole frame, slide the nav right until the header's button arrives, crop 40 px off the right edge to lose the pole (1960 px, still over 1920).
- **Against the old site:** already clearly better at a glance. The old first screen is a hotel pool behind tree trunks, with teal type lost in branches, a cookie box over the bottom and no name or place. This says what and where over a clean bay.

**Round 2, first screen.**
- **Wrong as design:** the flipped trace now reads as foam, but the film I added (mirrored, at 42%) is a second ghost shape floating over the water with its own lobes, the kind of overlay the calibration calls a mistake. One notch at the left is so deep it looks like a tear in the page. The button still touches a palm top at its right corner. On the phone the white leaves brown blots of sand under it.
- **Change:** the film follows the main line, 9 px above it at 50%, so it reads as a wet rim and not a second object. Compress the deepest notches in the trace. Move the words up. Lower the wash on the phone so only the tongues reach the sand.
- **Against the old site:** clearly better, and now the words are legible at a glance, which the old fold's are not.

**Round 3, first screen.**
- **Wrong as design:** the wash is right at last, a wide tongue over the sand at left and small ones at right. But the words are placed by a percentage of the screen, so they only clear the palms at this one shape: worked out for 1280×720, the button would land on the palms. `inspect.mjs`: `few-pictures` and `still-page` FAIL because only the hero exists yet, and `no-footage` WARN, which stands (no video, settled in concepts §2).
- **Change:** the words' foot is now calculated from where the palm tops fall under `object-fit: cover`, 34 px above them at any window. The title stays centred across the width.
- **Against the old site:** clearly better. Beside the gold pages' method (one short centred title and one short CTA over the best own media) it holds up as a form, but I know Global Surf's only through its notes, and it has moving footage this page cannot match.

**Round 4, first screen.** Pixel probe of the ink against what is really behind each text, with the text hidden, every pixel in its box, seven windows from 360×640 to 1920×1080.
- **Wrong:** title fine (10th percentile at least 5.27:1 everywhere). But the phone's name in the header falls to a minimum of 3.84:1 at the top of the sky, where the sky is darkest, and the nav to 4.41:1 at 1024.
- **Change:** header text in `#1C2C52`, a touch deeper than the ink, until the header turns white. That multiplies each figure by 1.19 (worked out, not re-shot): phone minimum about 4.6:1, nav minimum about 5.3:1. No haze on the sky.
- **Against the old site:** at 390×844 the old fold is a pool, a cookie box and four colours of type; this is one bay, one sentence and one red button. Clearly better. The honest weakness stays what concepts §4 predicted: no surfer on this screen, so it can read as a nice beach. The title has to say "surf lessons" because the picture does not.

**Round 5, whole page.**
- **Wrong:** on the phone the header was transparent over content and the bottom bar never appeared: my IntersectionObserver did not fire there in this browser, so text ran under the name. Three different left edges (720, 960 and 1120 column widths) made every section start somewhere new. The separator JS produced "2 hoursOne-on-one" on a wrapped line. The space beside "Before you book" was a hole. The closing wash was squeezed to half width and looked like torn paper. Mr Dafoe's word spaces nearly vanish ("SanjeeSurfSchool").
- **Change:** header and bar driven by a plain scroll listener. One left edge at 1080 with text held to a reading measure. Rating and button placed beside "Before you book". The tagline moved into the left column above "Who we teach". `word-spacing` on the script.

**Round 6, whole page.**
- **Wrong:** phone now works. The wash over the closing photograph, even at the right scale, sits on sky, so it reads as a mountain ridge: water coming down over the sky means nothing. The separator bug survived in a new form (dropping a separator pulled the next item up beside it). "Email" fell to a second row in the closing.
- **Change:** the wash moved to the foot of the closing photograph, in the tint, coming up over the wet sand from the footer (see conflicts, departure 1). Separators redone with CSS only: each sits in its item's padding and the list is clipped, so one at a line start is simply not shown, and the JS is gone. Phone order changed so the picture leads into the footer.

**Round 7, whole page.**
- **Wrong:** the tide's translucent rim on the sand is a dirty grey line. A horizontal overflow from the tide's 240% width made Chromium's phone layout misplace taps (found when a test tap on the menu missed). Nav overflows at 768. "the Private Coaching" in a prefill. `.mark` under 44 px. `check-design` clean, but `audit-mockup` gave `scroll.early.cls` **0.057**, a font swap rewrapping the lesson rows. That fails hand-off check 5.
- **Change:** rim in white. `overflow-x: clip` on the footer. Menu and bottom bar take over below 1024. Prefill fixed. Fallback faces sized to the real ones from measured widths, regular and semibold (`scroll.early.cls` 0.0116, then 0.0034, then 0.001 at the end). The bar is `visibility: hidden` until shown, so Tab cannot land off screen. Spaces added in the rating link, whose accessible name read "5/513 Google reviews".

**Round 8, whole page.**
- **Wrong:** 15 font sizes (`inspect.mjs size-count`), and a void to the right of the four tuk-tuk paragraphs (`lopsided`).
- **Change:** nine sizes (16, 18, 20, 24, 28, 32, 40, 60, 64), so Sanjee's words are 24 px where the concept says 22. The tuk-tuk paragraphs run in two columns on desktop, directly above the rows, still in one block.

**Round 9, whole page, last.** Sheets at 1440 and 390 looked at for overflow, overlap and unreadable text, and none found. On this build, by probe: no horizontal overflow and no control under 44 px at ten widths from 320 to 1920; all 22 `wa.me` links go to the number and carry the one label; a phone menu tap lands with the heading clear of the header; dots land on their slide at both widths; no page errors. Reduced-motion and no-JS first screens looked at, at both widths: the wash is static with the rim at 50%, and with no JS the phone bar is always shown. Below the first screen those two states were not looked at: with JS off the dots are hidden and the slideshow is native scroll by the CSS, not by a shot. "Coco Beach is our home spot, a beach break." went from three lines to two on a phone (34 px, the only exception to the size scale).
- **Against the old site, why this beats it:** first screen as above. Whole page: the old page is 30,387 px, with 3,000 px of scroll before a price on a phone and no WhatsApp or phone link on it. This one is 9,102 px on desktop and 12,739 px on a phone, with a price one screen down, a WhatsApp action per lesson, per rental block and per tour, and a bar always in reach. Clearly better on clarity and on the first screen. Beauty below the fold is a closer call: the old site has more pictures of surfing in sequence, and this page has seven pictures, some soft.

**Pre-score round 1 (visual 6, experience 7, critic 70.2 of 80).** Both critics: it reads as a resort, no surfer until far down, tiled roofs the loudest thing. On desktop the wash is a stock SVG divider. The old site's mosaic has more pull than my white runs and small prints. They were right; the sheets show it. Rounds below answer them.

**Round 10, whole page.**
- **Changed:** img-006 (the surfer) as a print overlapping the foot of the hero, half on the first screen and half on the page, hero shortened to 90 svh (phone 80 svh, the whole print above the fold). Wash retraced with a blur about seven times wider and 12 points instead of 40, kept to the sand strip, film fading to nothing, 1.4 s. Real masonry of six pictures, 1320 wide. Sanjee and the guests moved up to straight after the band. Tours as 3 surf rows beside a print, then 9 outings in two columns, price on the title line, icon buttons a tint at rest. Closing cropped to foam and footprints. All of the critic's list.
- **Sheet showed:** first screen is transformed: a person on a wave, then the bay. Better on phone than anything so far. But a grey band of haze runs across the top of the print. Cut pole stumps at the top of the closing picture look accidental. A wrapped tour price starts its line with "|".
- **Against the old site:** first screen far ahead. The mosaic now answers its Coco Beach block with the same kind of pictures, and I think it holds up. That is my read, not a critic's.

**Round 11, whole page.**
- **Wrong:** the closing crop lost the foam to one corner, leaving a big plain brown field. On a short phone (360×640) the header was white at rest, because the title starts under it.
- **Changed:** print cropped (no haze, surfer nearer the middle). Tour price wraps without a separator, using the same clipping as the details lines. Closing crop moved right so the foam comes in. The bay settles once, 3.5% over 14 s, with the wash, so the first screen is not dead after a second.

**Round 12, whole page.**
- **Wrong:** a hairline of photograph under the footer's tide and a faint vertical line at the right edge: the blur on the shape was fading its own edges.
- **Changed:** both wash shapes run 10 px past each side, the tide overlaps the footer by 8 px.

**Round 13, whole page, last.** Sheets at 1440 and 390 and full-size frames looked at for overflow, overlap and unreadable text; none found. Hairline gone (`desktop-11`). Header stays clear at rest on a short phone (mark 6.06:1 on the sky at 360×640).
- **Against the old site:** first screen clearly better at both widths, on subject now. Whole page: more coherent, and for the first time not clearly poorer in pictures. Still fewer action pictures than the old page has, because I may not use img-007 here.

**Skills, in full:**
- `node .claude/skills/design-taste-frontend/scripts/inspect.mjs` ran at round 3, three times from round 7 on, and twice in the rework, not every round. Last result: **5 FAIL, 3 WARN.** Every line is answered below in "Inspector".
- `/animate`, `/design-motion-principles`: loaded before motion. I used `/animate`'s tables. I did not open the workflow file `/design-motion-principles` points to.
- `/find-animation-opportunities`: its gate was applied by me, below. No separate report.
- `/mobile-native`: applied: `svh`, tap highlight, `touch-action`, `user-select` on controls, safe areas, 44 px targets, hover gated. **Nothing was tried on real hardware.**
- `/review-animations` (read from its file, it cannot be invoked), `/emil-design-eng`: findings applied (asymmetric press timing, named transition properties, nothing from `scale(0)`).
- `/impeccable`: **reference files only** (`craft-floor.md`, `critique.md`). Its scripts download and run a binary into `~/.impeccable/bin/`, which is outside this worktree, and I was told not to touch anything outside it. So no `detect` and no two-agent critique. My own read, single context, is the "weak" list below.
- Not used: `/apple-design`, `/break-ui`, `/animation-performance` (nothing stuttered in the stills; motion was not watched moving, see below).

**Motion as built** (gate: frequency, purpose):
| What | Values | Why it passes |
|---|---|---|
| Wash comes in once | CSS keyframes, transform, 1400 ms; film of water ahead of it fades to 0 | rare, once a visit: delight budget; over the 300 ms UI cap on purpose |
| The bay settles once | scale 1.035 to 1, 14 s, `--ease-out`, then still | rare; so the first screen is not dead after a second. Off under reduced motion |
| Button press | scale 0.97, 120 ms in, 160 ms out, `--ease-out` | feedback, on every button |
| Slideshow | 350 ms, cancellable, native swipe; dot widens by `clip-path`; track height follows the quote, 240 ms | state; the concept's value, over 300 ms. Height is a layout animation, tolerated: only on a chosen slide |
| Print settle | 8 px, transform, 480 ms, once | rare, prevents a flat arrival; no fade; headings never move |
| Phone bar | 240 ms `--ease-drawer` | spatial |
| Header | white over 200 ms; nav slides 214 px over 240 ms as the button arrives | state |
| Menu | 200 ms from the top right, icon morphs to a cross; closes instantly | origin at its trigger |
| Row hover | tint over 160 ms, gated to fine pointers; a tour's icon goes red with it | feedback |

Rejected: reveal on headings (custom.md); stagger on tour rows (data being read); parallax (not in the concept, and the prints are small).

**Not seen moving.** All motion was judged from stills and a few mid-animation frames of the wash. Nobody has watched it at speed.

### Inspector, last run, line by line
`RESULT: 5 FAIL, 3 WARN — not done.` Sizes in use: 16, 18, 20, 24, 28, 32, 40, 60, 64.
- `FAIL gradient` (`section.hero`): the placeholder under the hero photo, seen only until the picture arrives, so a slow phone gets the bay's colours and not a flat box. Kept.
- `FAIL shadow` (`.hero-print`): the one resting shadow, lifting the print off the photograph. Kept.
- `FAIL icon-cards` (3 lesson rows): each row's only icon is in its WhatsApp button. Kept.
- `FAIL off-centre`: the hero print starts 60 px from the left at 1440, off the grid on purpose, to leave the headland clear. Kept.
- `FAIL eyebrow` ("as of 5 November 2026" above "Before you book"; "All prices are as of 5 November 2026." above "Finding us", phone): the end of the block above, labelling nothing. Kept.
- `WARN no-footage`: settled, no video.
- `WARN side-scroll`: the quote slideshow, by concept.
- `WARN empty-middle` ("5/5"): not visible on the sheets. I read it as a measuring artefact of the slideshow track, not proved.

## images

All are `business-owned` in `dossier.images[]`, uploaded to the business's Google listing or from its site. No review photo and no atmosphere image is used, so no credit is due and none is shown. No caption. Alt texts were written from the photographs.

| use | asset | measured | crop and drawn size |
|---|---|---|---|
| first screen, desktop | img-002 | 2000×1500 | 1960×1225 from x 0, y 275; files at 1960 and 1400 |
| first screen, phone | img-002 | | 693×1500 window at x 1000 |
| surfer print over the hero | img-006 | 848×480 | 780×440 from x 68, y 40; drawn 480 css px (342 on a phone) |
| shallows print | img-005 | 832×464 | 4:3, 618×464, drawn about 423 css px. Faces visible: owner to confirm consent |
| feature band | img-009 | 1600×1067 | whole; drawn 1440 wide. Phone window 740×1067 |
| Sanjee print | img-008 | 997×1024 | rotated upright by 19°, 676×845, drawn about 423 css px |
| mosaic | img-018, img-013, img-017, img-020, img-014 | 1440×1920, 1280×960, 1200×1600, 1440×1920, 1280×960 | whole, scaled to 860, drawn about 432 css px, each keeping its own shape |
| mosaic | img-019 | 1440×1920 | 1440×1080 from y 200 (sky and poles), scaled to 860 |
| print beside the surf tours | img-012 | 750×558 | whole, native, drawn about 423 css px |
| closing, half-bleed | img-019 | 1440×1920 | 1240×755 from x 60, y 1165 (foam and footprints). Different part of the frame from the mosaic's crop, with 115 rows of overlap at most |
| link preview | img-002 | | 1960×1029, 1200×630 JPEG (`img/og.jpg`) |

Not used: img-007 (rights flag open), img-036, everything `usable: false`, the images concepts §2 rejects.

## gaps

- **Hours and reply time:** none on the page, on purpose (N10).
- **Cancellation:** none, on purpose.
- **Beginner Lesson group size:** no row (N7). Checked in the DOM: "Total beginner, beginner | 2 hours".
- **Video:** none on disk, settled.
- **Instagram:** all socials are dead, so no feed and no icons (F11). custom.md asks for the feed; omitted, not faked.
- **Who holds the phone:** the label names nobody.
- **Schema (concepts §6):** no `heroLine` (the title is the tagline's first words, asserted in `build.py`); `rentals[]` label is split by `build.py` into kind and duration, asserted; tours and to-buy rows are split by position, asserted; `spot`'s first sentence is a script title by splitting at the first full stop, so an owner edit could break that; Google capture date hard-wired from `2026-11-05`, asserted.
- **Template-owned words:** nav labels, "Duration", "Soft-top", "Hardboard", "per lesson", "per day", "Call", "Email", "Open in Google Maps", "Google", "English", "Sinhala", and the WhatsApp prefill sentences.

## conflicts

**Blocking:** none now. "5 private sessions | 2 hours each" is built, with "each" as the one word the coordinator allowed outside `en.json`.

**Where the critics or the coordinator conflicted with the concept or each other. I put what looked best on the screen:**
1. **Which picture overlaps the hero.** Experience critic: img-005 at the wash line on a phone. Visual critic: img-006 up to 520 px. Built: img-006 at both widths, because a person on a wave says surfing faster, and its blues and greens sit in the bay. img-005 follows a screen later, where it answers "Who we teach". 480 px, not 520, so it does not bury the tip of the headland.
2. **The first screen is no longer "only header, title, CTA".** custom.md and the calibration ask for that, with the picture unobstructed. The print covers the lower left of the sea and part of the sand. The sky, title and button are still clear. Both critics asked for it. For the human to judge.
3. **The wash line.** Concept: the page's one shape, a visible line. Critics: stock divider. Built: a long soft edge on the sand only, much quieter. On a phone the print covers most of it, so it is close to invisible there. The concept's idea has become a detail rather than the first-screen device.
4. **Masonry list.** Coordinator named img-012, 013, 014, 017, 018, 020, and a print between the tours. Using img-012 in both would repeat it within two screens. Built: img-012 beside the surf tours (it has the swell, and colour), and a crop of img-019's sky and poles takes its place in the mosaic, the poles I had to cut from the closing.
5. **"A print between the 3 surf tours and the 9 outings".** On a phone it is literally between them. On desktop it sits beside the 3, with the 9 below, because a print alone in that gap brought back the empty middle. In reading order it still comes between.
6. **img-006 left the waves section**, so "Other waves" has no picture; it runs as three columns, in the copy's own order, under the mosaic.
7. **`spot` in the text face.** Concept: spot and season have no script title. I had made its first sentence one; the critics found it slow. Now its first sentence is a 32 px heading in Source Sans 3, the rest beside it. `spot` still reads in order, unchanged.

**Departures from the concept, each one a choice made on sight:**
1. **Order changed:** band, Sanjee, guests, boards, waves, tuk-tuk. Concept: boards before Sanjee. The experience critic found the best moment nine screens down and attention dropping at boards. The audit's lessons, rentals, tours order still holds, with people between. The "paddle out" order loses "board under your arm" before the line-up.
2. **The second wash line** is not white and inverted over the picture's top. It is the tint, rising from the footer over the wet sand at the picture's foot.
3. **Widths.** One left edge at 1080, not 720 and 960, because three left edges looked unplanned. Quotes keep the 720 column, the mosaic 1320. Prints about 423 css px, under their limits.
4. **Tagline** in the left column above "Who we teach", not centred above the split.
5. **Rating and a button** beside "Before you book" on desktop.
6. **Hero** is 90 svh (phone 80), not a full screen. Crop 1960×1225, to lose a utility pole. Title and button sit above true centre, 34 px over the palms; at 1440×900 the block's middle is at 30% of the screen height. Calibration says centred vertically; concepts §4 says "in the sky". On a short window (1280×720) the title comes close under the header.
7. **Header text** is `#1C2C52` over the sky, not the ink, for AA.
8. **Focus ring** is an ink outline with a sky halo. Active slideshow dot stays sky as the concept says, 2.24:1 on white, with state also carried by its width and `aria-current`. For 4g to judge.
9. **Wash line** was traced by script from the foam edge in img-019, then blurred heavily, so little of that foam's shape survives. No longer "traced by hand" in any useful sense.
10. **The bay's slow settle** is my addition; the visual critic noted the screen stopped dead after a second. Not in the concept.
11. **Desktop gets a bar too:** a header button once the hero's button has gone.
12. **Sanjee's words are 24 px on desktop, not 22**, for nine font sizes.
13. **Tuk-tuk paragraphs** are two columns on desktop. All four remain directly above the rows.
14. **Icon buttons on tours are a tint at rest**, red on hover, focus or press. Concept: "small WhatsApp icon button". The accent still means booking, but a tour's action is quieter than a lesson's.
15. **Words the template adds this round:** "each", "as of", "Languages:", "Skip to lessons", and the spaces in "+94 77 400 4422". "All prices are as of 5 November 2026." is repeated from [5] after the rate table and the tour list, as the critic asked; schema v0.11's "a fact lives in one field" is for 4g to solve (`pricesAsOf`, concepts §6).

**custom.md against the concept, for the human:** custom.md says "Booking lives inside the site … choose the level, see what is included … pick dates, then hand off". Concept 1 is one tap to WhatsApp on every offer, with no panel, under the audit's `clicks_to_book: 1`. I built the concept. The cost: no date or level is carried, except the offer's name in the prefill. Concepts 2 and 3 cover the other side. custom.md's "slideshows" exist only for quotes: the material has no gallery to show.

**What is weak, my own read (single context, no detector, so `/impeccable critique` did not really run):**
- The print is a soft video still. At 480 css px on a 2x screen it is about 1.6 source px per css px, and it looks it. It is honest, but a sharp image of a lesson is what this page needs.
- The surfer is not identified as Sanjee or as a student, and nothing says it is this school's lesson. It is an own upload, a still of vid-002.
- Tiled roofs are still the second-loudest thing on the first screen.
- The lesson rows and tour lists are still plain, and most of the page's life is in the pictures. The lesson section is the part most like a template.
- The mosaic has one gloomy picture (img-020) and one dull one (img-014). I kept them because the asked-for six were the material, and the contrast helps. img-012 is overprocessed.
- Between the print and the wash, the hero's foot is the least resolved thing on a phone: the wash is barely visible there.
- The page is still 12,672 px on a phone, about 15 screens. The tours came down but boards are long.
- Booking is still a question on WhatsApp to a number nobody has seen answered, against the old site's calendar.

**Tools:**
- `tools/check-design.mjs` and `tools/audit-mockup.mjs` hardcode ports 8960 and 8980; 8960 is held by another worktree's `astro preview`, which I did not stop. I ran scratchpad copies (`calm-sanjee/`) that differ in port (9311, 9313) and absolute import paths only, `check-design` with `--no-shots` in path mode so it touches no sibling folder. The repo's tools are unchanged.

## other businesses in this run

First screens opened at 1440: Coconut Surf Inn calm, Lotus Surf House calm (picked), Cheeky Monkey calm and unique (picked). Sibling variants of this business were not opened.
- **Coconut calm is the closest, as concepts §5 warned.** Both are a full-bleed coast with a centred title. Coconut is a cloudy pale sky behind tall palms, a script name in dark green, a subtitle, a green button, seen from a roof, with a beach bar and wires below. This is a saturated clear sky with a rust headland, text-face navy words, a red button, seen from the sand, ending in a white wash line. Nobody would take one for the other, but side by side they are the same kind of page.
- **Lotus:** white half with a script name beside a carved gate in a garden. Inward and green; this faces out to sea.
- **Cheeky Monkey unique:** a board-shaped window on a drawn beach. Loud and illustrated; this is a plain photograph.
- **Below the fold:** this page has no rooms at all. It sells three lessons, a rate table and a 12-row tour list, and its first question is level.

## measured

The audit copy on the last build: phone 390×844 at 2x, 1.6 Mbps, 150 ms latency, 4x CPU, one run on localhost, no scroll.
| Line | Budget | Measured |
|---|---|---|
| First-load transfer | 1.5 MB | 299 KB uncompressed (HTML 75, fonts 46, images 185) |
| JS as a file | 300 KB | 0 (4.2 KB inline) |
| Largest first-screen image | 300 KB | 105 KB phone (desktop 1400 w 104 KB, 1960 w 194 KB) |
| Fonts | 2 families, 150 KB | 2 families, 46 KB |
| LCP | 2.5 s | 1,652 ms. It tracks `hero-m.webp` arriving at about 1.6 s. Now the hero is under a full screen, Chromium reports a picture and not the H1 (round 9's 784 ms was the H1). I did not log the element on this run |
| CLS | 0.1 | 0.0005 |
| `scroll.early.cls` / `scroll.settled.cls` | 0.01 | 0.0003 / 0 |
| Third-party on load | 0 | 2 hosts, Google Fonts, allowed at 4e only |

**Cost of Google Fonts at first paint.** The critic measured 1,476 ms with the font stylesheet blocking. It now loads as `media="print"` and flips on load (`<noscript>` fallback). Three throttled runs each on the previous build, one more on this one: first paint 304 to 332 ms with the fonts, 308 to 312 ms with them blocked, so about nothing. What remains: text shows in the sized fallback faces until the swap at about 1.43 to 1.48 s, and the hero photo arrives about 230 ms later than with the fonts blocked (1,617 against 1,385 ms). Mr Dafoe's fallback is Brush Script on a Mac, and only a generic cursive on a phone, so section titles visibly change at the swap there. 4g self-hosts.

**Hero text contrast, from the pixels, seven windows 360×640 to 1920×1080:** title min 5.20:1, name min 5.21:1, nav min 5.27:1.
Whole page, all images: about 736 KB phone, about 908 KB desktop at 2x. Not measured: real phone or network, gzip, motion at speed.
