# Sanjee Surf School: calm mockup, "The sand" (concept 1)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.
Page: `dist/index.html`, one file, with CSS and JS inlined from `src/page.css` and `src/page.js` by `src/build.py`. Words, prices, ratings, reviews and contact are read from `copy/en.json`, not retyped. Fonts come from Google Fonts at 4e (Source Sans 3 400/600, Mr Dafoe).
Media: `src/make-media.sh` (`# media: sites/sanjee-surf-school/mockups/calm/dist/img/**`). Wash line: `src/trace-wash.py` writes `src/wash.json`, text only.
To rebuild: `bash src/make-media.sh && python3 src/build.py`. `--hero` builds the first screen only, which is how rounds 1 to 4 were made.

## look-log

**The bar.** The business has its own site. Compared with `dossier/sanjee-surf-school/funnel/walk/01-home-fold-settled.png` (phone first screen) and `assets/old-site-desktop.png` (whole page). Shots are in `shots/round-N`. `shots/round-9` is the last.

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

**Skills, in full:**
- `node .claude/skills/design-taste-frontend/scripts/inspect.mjs` ran at round 3 and three times from round 7 on, not every round. Last result: **3 FAIL, 4 WARN.** Every line is answered below in "Inspector".
- `/animate`, `/design-motion-principles`: loaded before motion. I used `/animate`'s tables. I did not open the workflow file `/design-motion-principles` points to.
- `/find-animation-opportunities`: its gate was applied by me, below. No separate report.
- `/mobile-native`: applied: `svh`, tap highlight, `touch-action`, `user-select` on controls, safe areas, 44 px targets, hover gated. **Nothing was tried on real hardware.**
- `/review-animations` (read from its file, it cannot be invoked), `/emil-design-eng`: findings applied (asymmetric press timing, named transition properties, nothing from `scale(0)`).
- `/impeccable`: **reference files only** (`craft-floor.md`, `critique.md`). Its scripts download and run a binary into `~/.impeccable/bin/`, which is outside this worktree, and I was told not to touch anything outside it. So no `detect` and no two-agent critique. My own read, single context, is the "weak" list below.
- Not used: `/apple-design`, `/break-ui`, `/animation-performance` (nothing stuttered in the stills; motion was not watched moving, see below).

**Motion as built** (gate: frequency, purpose):
| What | Values | Why it passes |
|---|---|---|
| Wash line runs up once | CSS keyframes, transform, 900 ms; rim 1200 ms with opacity | rare, once a visit: delight budget; over the 300 ms UI cap on purpose |
| Button press | scale 0.97, 120 ms in, 160 ms out, `--ease-out` | feedback, on every button |
| Slideshow | 350 ms, cancellable, native swipe; dot widens by `clip-path` | state; the concept's value, over 300 ms |
| Print settle | 8 px, transform, 480 ms, once | rare, prevents a flat arrival; no fade; headings never move |
| Phone bar | 240 ms `--ease-drawer` | spatial |
| Header | white over 200 ms; nav slides 214 px over 240 ms as the button arrives | state |
| Menu | 200 ms from the top right, icon morphs to a cross; closes instantly | origin at its trigger |
| Row hover | tint over 160 ms, gated to fine pointers | feedback |

Rejected: reveal on headings (custom.md); stagger on tour rows (data being read); parallax (not in the concept, and the prints are small).

**Not seen moving.** All motion was judged from stills and one mid-animation frame of the wash. Nobody has watched it at speed.

### Inspector, last run, line by line
- `FAIL icon-cards` (3 lesson rows): each row's only icon is in its WhatsApp button. They are the concept's stacked rows with prices. Kept.
- `FAIL eyebrow` ("5 November 2026" above "Before you book", phone): that is the rating's capture date ending the block above. It labels nothing. Kept.
- `FAIL covered-text` ("Week Intensive" under a fixed bar, phone): text scrolling under the header and bar at some scroll stop. It never rests there, and anchor jumps clear the header. Kept.
- `WARN no-footage`: settled, no video.
- `WARN side-scroll`: the quote slideshow, by concept. Dots are there, and it is native swipe.
- `WARN empty-middle` ("5/5"): I could not find this on the sheets. Rating and quote sit together and centred. I read it as a measuring artefact of the slideshow track, but I have not proved that.
- `WARN still-page`: calm, no canvas, by rule. It is also a fair warning: see weak list.

## images

All are `business-owned` in `dossier.images[]`, uploaded to the business's Google listing or from its site. No review photo and no atmosphere image is used, so no credit is due and none is shown. No caption. Alt texts were written from the photographs.

| use | asset | measured | crop and drawn size |
|---|---|---|---|
| first screen, desktop | img-002 | 2000×1500 | 1960×1225 from x 0, y 275; files at 1960 and 1400 |
| first screen, phone | img-002 | | 693×1500 window at x 1000 |
| shallows print | img-005 | 832×464 | 4:3, 618×464, drawn about 423 css px. Faces visible: owner to confirm consent |
| feature band | img-009 | 1600×1067 | whole; drawn 1440 wide. Phone window 740×1067 |
| Sanjee print | img-008 | 997×1024 | rotated upright by 19°, 676×845 from the part the rotation leaves whole, drawn about 423 css px |
| outside print | img-013 | 1280×960 | scaled to 1120, drawn about 423 css px |
| wave print | img-006 | 848×480 | native, drawn about 423 css px |
| closing, half-bleed | img-019 | 1440×1920 | scaled to 1200 (desktop) and 900 (phone); bottom of frame kept |

Not used: img-036, everything `usable: false`, the images concepts §2 rejects.

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

**Blocking, for you before the pick:**
1. **"5 private sessions | 2 hours" can read as two hours in total for USD 160.** The dossier says `5 days × 2 hours`, and concepts §2 reads it as 2 hours each. Concepts §3 asks for those two items together, and `en.json` has no "each". The obvious fix, "2 hours each", is a word I may not add (hard constraint 1, and the copy condition). It needs a line from the copywriter or an instruction. ¶2 beside it helps a little ("After 2 hours of surfing"). Left as the concept says.

**Departures from the concept, each one a choice made on sight:**
1. **The second wash line is not inverted and not white.** Concept: inverted, white, leading into the closing split. Over the top of img-019 that sits on sky and read as a mountain ridge in two rounds. Built: the same line in the tint, coming up from the footer over the wet sand at the foot of the picture, across the full width. Still two uses of the one shape. Phone order changed to text, picture, footer so it does the same there; the concept had the picture first.
2. **Widths.** Concept: 720 for reading, 960 for tables. Built: one left edge at 1080 with text held to a measure, because three left edges looked unplanned. Quotes keep the 720 column. So prints are about 423 css px, not 480, 460, 560 and 480. All are under their limits.
3. **Tagline** sits in the left column above "Who we teach", not centred above the split. Left alone, it was a stranded line.
4. **Rating and last button** sit beside "Before you book" on desktop, not stacked above and below it. Phone order is the concept's: rating, then words, then button.
5. **Hero crop** is 1960×1225, not 2000×1250, to lose a utility pole at the frame's edge. Title and button sit above the visual centre at most windows, centred in the open sky so they clear the palms: at 1440×900 the block's middle is at 40% of the height. Calibration says centred vertically; concepts §4 says "in the sky".
6. **Header text** is `#1C2C52` over the sky, not the ink `#253864`, for AA at the zenith.
7. **Focus ring** is an ink outline with a sky halo. Sky alone on white is 2.24:1. Active slideshow dot stays sky as the concept says: also 2.24:1, with state also carried by its width and `aria-current`. Inactive dots 3.42:1. For 4g to judge.
8. **Wash line** was traced by script from the foam edge in img-019 (flipped, deepest notches compressed), not by hand. Same source, as the concept wanted.
9. **Rim on the wash** (a second, 50% copy of the line) is my addition, to make the edge soft. Concept: "one soft wash line".
10. **Desktop gets a bar too:** a white header with the button once the hero has gone. The concept names only the phone bar; playbook §3 asks for the action to be reachable from every screen.
11. **Sanjee's words are 24 px on desktop, not 22**, and details lines 16 px, to bring the page to nine sizes.
12. **Tuk-tuk paragraphs** are two columns on desktop, not one. All four remain directly above the rows.

**custom.md against the concept, for the human:** custom.md says "Booking lives inside the site … choose the level, see what is included … pick dates, then hand off". Concept 1 is one tap to WhatsApp on every offer, with no panel, under the audit's `clicks_to_book: 1`. I built the concept. The cost: no date or level is carried, except the offer's name in the prefill. Concepts 2 and 3 cover the other side. custom.md's "slideshows" exist only for quotes: the material has no gallery to show.

**What is weak, my own read (single context, no detector, so `/impeccable critique` did not really run):**
- The first screen has no surfer, and its most eye-catching things are red-roofed buildings on a headland. Nothing says they are the school's, but a stranger could assume it. It may read as a resort.
- Below the hero the page is calm to the point of plain: white, tint rows, type, a table, a long list. The band and the closing picture carry it, with nothing between the band and the closing at full width. It has no gallery, because the material has none.
- The prints are small because the sources are soft. img-005 and img-006 are video stills, img-013 has a tilted horizon and a dull beach, img-008 is visibly smoothed.
- The tour list is long, 12 rows, and on a phone that is about three screens.
- One button label appears 22 times. It is correct, and it is a lot of red.
- Source Sans 3 at 600 on the title is honest but not memorable. The wash line is the only idea on the screen, and it is small.

**Tools:**
- `tools/check-design.mjs` hardcodes port 8960, which another worktree's `astro preview` (PID 82235) holds, and its browser would read that server. I did not stop it. I ran a copy in my scratchpad that differs in the port (9311) and in absolute import paths only, with `--no-shots`, in path mode so it touches no sibling folder. The repo's tool is unchanged.

## other businesses in this run

First screens opened at 1440: Coconut Surf Inn calm, Lotus Surf House calm (picked), Cheeky Monkey calm and unique (picked). Sibling variants of this business were not opened.
- **Coconut calm is the closest, as concepts §5 warned.** Both are a full-bleed coast with a centred title. Coconut is a cloudy pale sky behind tall palms, a script name in dark green, a subtitle, a green button, seen from a roof, with a beach bar and wires below. This is a saturated clear sky with a rust headland, text-face navy words, a red button, seen from the sand, ending in a white wash line. Nobody would take one for the other, but side by side they are the same kind of page.
- **Lotus:** white half with a script name beside a carved gate in a garden. Inward and green; this faces out to sea.
- **Cheeky Monkey unique:** a board-shaped window on a drawn beach. Loud and illustrated; this is a plain photograph.
- **Below the fold:** this page has no rooms at all. It sells three lessons, a rate table and a 12-row tour list, and its first question is level.

## measured

`tools/audit-mockup.mjs` on the last build: phone 390×844 at 2x, 1.6 Mbps, 150 ms latency, 4x CPU, one run on localhost, no scroll.
| Line | Budget | Measured |
|---|---|---|
| First-load transfer | 1.5 MB | 277 KB uncompressed (HTML 72, fonts 46, images 166) |
| JS as a file | 300 KB | 0 (3.5 KB inline) |
| Largest first-screen image | 300 KB | 105 KB phone (desktop 1400 w 104 KB, 1960 w 194 KB) |
| Fonts | 2 families, 150 KB | 2 families, 46 KB |
| LCP | 2.5 s | tool: **784 ms, the H1, not the picture** (three other runs 544 to 684 ms) |
| CLS | 0.1 | 0.0005 |
| `scroll.early.cls` / `scroll.settled.cls` | 0.01 | 0.001 / 0 |
| Third-party on load | 0 | 2 hosts, Google Fonts, allowed at 4e only |

**LCP caveat:** Chromium never reports the full-viewport hero photograph as an LCP candidate, in any of my runs. My own timing (temporary server on 9312, same throttle) has `hero-m.webp` arriving at about **1.5 s**. Read that as the real moment the picture appears; the 784 ms is the words. Under budget either way.
Whole page, all images: about 340 KB phone, about 496 KB desktop at 2x. Not measured: anything on a real phone or network, or gzip.
