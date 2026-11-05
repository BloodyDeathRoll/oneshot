# Sanjee Surf School: unique mockup, "The set" (concept 3)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.

**Files.** The page is `dist/index.html`. CSS and JS are inlined from `src/page.css` and `src/page.js` by `src/build.py`, which also runs `src/body.py` (everything below the first screen). Every word comes from `copy/en.json`. Media come from `src/make-media.sh` (`# media: sites/sanjee-surf-school/mockups/unique/dist/img/**`). Fonts are Shrikhand and Atkinson Hyperlegible 400/700, latin woff2 from fonts.gstatic.com at this station; 4g self-hosts them.

**Rebuild:** `bash src/make-media.sh && python3 src/build.py`.

**To view it: serve `dist/` over http.** Opened as `file://`, the browser refuses the photographs as WebGL textures, so the page shows the CSS fallback (prints bobbing), not the swell. `tools/audit-mockup.mjs` and `tools/check-design.mjs` serve over http and see the swell; `tools/shoot.mjs <file path>` does not. To see the swell in stills use `tools/shoot.mjs http://127.0.0.1:<port>/?swell=0.62`. `?swell=<0..1>` freezes the swell at that phase, `?still` gives the static prints, `?nogl` the CSS fallback.

## look-log

The bar: the old site (`assets/old-site-desktop.png`, `old-site-mobile.png`, `funnel/walk/01-home-fold-settled.png`), and `gold/the-lavish-haven.html`, rendered once at 1440 during round 3 and judged against from then on. Global Surf's pages and KA were not rendered this session. Rounds 1 to 3 were the first screen alone, with nothing below it in the file. Only `shots/round-6` is kept; earlier sheets are deleted, and its first frame has the swell frozen at phase 0.62.

**Round 1, first screen.** Five prints on white at the concept's sizes: back row 009, 018, 006; front row 002 at 880 and 007 at 520.
- Wrong as design: the back row sat as three evenly spaced cards, and it read as a photo grid above a second photo grid. img-002 kept too much sky, so the headland, the point of the picture, fell through the fold. On the phone img-006 touched the top of img-007 edge to edge. On the first shot WebGL had not run at all, because `shoot.mjs` with a file path is `file://`.
- Changed: back prints tuck under the front row, so the five are one mass. img-002 recropped to 2000×1100 from y 400, which puts the whole headland and the sand above 900 px. Front row moved up to 428 and 402.
- Against the old site: already clearly better. The old fold is a hotel pool behind tree trunks, a teal headline lost in branches and a cookie box. Here the first read is what, where, Sanjee on the board and a button. Against Lavish it is not there yet: Lavish has one idea and this was still several pictures.

**Round 2, first screen.** Shot over http with the swell frozen midway. Fragment and vertex stages disagreed on precision, so the program failed to link and the page silently fell back; fixed. GL paint order came from DOM order, not z-index, so img-006 sat under img-002 on the phone; now sorted by computed z-index.
- Wrong as design, once it ran: paper flex works and is the first thing here that reads as an idea rather than a layout. But the light band on img-002 was hard-edged, like a light leak, and the horizon bent like jelly at amplitude 34 and width 250. GL shadows were much weaker than the CSS ones, so the seam between img-007 and the blue sky of img-002 went flat. img-018's right edge nearly lined up with img-007's left edge, an accidental alignment.
- Changed: amplitude 26, width 290, phone 15 and 170. Shading is now smooth with no clamp (0.22). Shadow blur 46, opacity .40. img-018 moved left.

**Round 3, first screen.** The prints flex without the horizon wobbling, and the shadow now separates the front print. Then a real defect: **two desktop captures came back with the title and no prints at all.** The page state was `set bob gl`, which fits a lost context followed by my code hiding the real images over an empty canvas. I did not prove the cause; it has not come back in any capture since, but under software GL only.
- Changed: the real `<img>`s now stay until one pixel has been read back from the middle of the front print. A lost context brings the images straight back and the swell returns only if the GPU does. Phone canvas capped at DPR 1.5 only under 6 cores: at 1.5 the one sharp action picture went visibly softer than the `<img>` beneath it (departure, below).
- Against the old site: clearly better at a glance, on both widths. Against Lavish and Global Surf's single-object first screens: it is busier. It is a set of prints, not one object. That is what the concept asks for and I think it holds at rest, but it is the honest risk on this page.
- Inspector over `file://`: `still-page` FAIL, because headless saw 0 elements move during its scroll. Kept: the swell is the concept's main item, and it runs over http. `no-footage` WARN: settled, no usable video. `shadow` FAIL at 390: it is the open phone menu, which really floats. Kept.

**Round 4, whole page.** Sheets at 1440 and 390, `shots/round-4`.
- Flaws found: the season text ran under img-014 at 1440 (text covered). The desktop floating bar covered text in the right column on several screens and the footer's email button (fixed element over text). The sticky header let text show through its 97 % white. On the phone the send button in the sheet was below the fold of the sheet. At 1920 the set stayed left, leaving a white column on the right. "Finding us" in the header was overlapped once the action arrived. "ask about the Private Coaching" read wrongly in the prefill.
- Changed: img-014 moved right of the text. The persistent action now lives in the header on wide screens, with the nav sliding left into reserved room, and is a full-width bar only under 1180 px, where the footer has room for it. Header opaque. Send button sticky in the sheet, tiles tightened to 44 px. Set centred above 1600. Prefill wording fixed in both places.
- `/find-animation-opportunities`, kept one: prints further down the page settle 18 px on first view, transform only, 640 ms ease-out, no fade (purpose: the last of the swell, rare, once per print). Rejected: a stagger on the lesson columns (data people are reading, and the prices already step), a closing animation for the phone menu (`details` cannot and it is frequent), any heading reveal (custom.md).
- `/animate`, `/design-motion-principles`, `/mobile-native`: curves from the shared set; press 120 ms at .97; the sheet 420 ms in on the drawer curve and 200 ms out, no overshoot; hover gated behind `(hover:hover) and (pointer:fine)`; `svh`-free hero (fixed heights); 16 px inputs; tap highlight off; `touch-action: manipulation`; safe-area padding on the bar and sheet. Not tested on a real phone.
- `/emil-design-eng` checklist: no `transition: all`, no `scale(0)`, exit faster than enter. One thing it would flag is kept: the sheet also animates when opened from the keyboard.
- `/impeccable`: reference files only (`craft-floor.md`), as `tools.md` allows. I did not run its downloaded binary, so `impeccable detect` and its critique command did not run. Added `::selection` and a real skip link from that floor.
- `/review-animations`: could not run. The skill refuses invocation by an agent (`disable-model-invocation`) and says it is for the user to run.

**Round 5, whole page.** Sheets at 1440 and 390, plus the sheet open, reduced motion, no JS, no WebGL, the phone menu and 14 widths from 320 to 1920 (no horizontal overflow at any).
- Flaws found: on the phone the feature line's second line sat on the dark sea at the horizon, so it moved up (ink on the sky behind it measures 8.8:1, desktop 8.2 to 8.8). 18 font sizes, most of them half-point differences: cut to one scale.
- Reduced motion and no JS: the same five prints at rest, with CSS shadows, not a different object. No JS: every button is a plain `wa.me` link, and the persistent action is visible from the start. No WebGL (`?nogl`): the prints bob ±4 px in sequence on a 12 s loop.
- Sheet at 1440 and 390: opens from a lesson button with that lesson chosen and focus on it; tiles rewrite the bubble and the `href`; Esc closes it and focus returns to the opener.
- **Against the old site, side by side: clearly better.** The old first screen is an empty pool that names neither the school nor Weligama, and opens to a cookie box and a five-tap dialog. This one shows what, where, the man and his board, the score and a one-tap WhatsApp button. **Against the gold bar (`the-lavish-haven`): less sure.** Lavish has one object and one idea. This has five pictures and one idea, and the idea only shows while the swell passes. At rest it is a tidy stack of prints on white. It does not read as a scrapbook to me, because the edges are straight and the prints overlap as one mass, but it is the less resolved of the two. The hero title in Shrikhand is very loud and I would want a human to see it.

**Round 6, whole page, final build.** Type scale only, plus the phone band line, no layout change. Sheets (`shots/round-6`) looked at for overflow, overlap and unreadable text: none found.
- The running swell, not frozen, at 1440: 3.2 s after load it is mid-pass over the right-hand prints, and at 9 s the set is flat and matches the static layout. During that capture the browser logged `CONTEXT_LOST_WEBGL` once and the page recovered to `set gl` with the prints on screen, so the round 3 guard does real work here. Software GL only: smoothness and frame rate on a real phone are not known.
- `audit-mockup`, final build, throttled phone: first load 314,758 bytes, LCP 1604 ms, CLS 0.0053, scroll CLS early 0.0067 and settled 0. The early shifts are the font swap on the rating line and on text.
- Inspector on the final build, run on the file path, so without the swell: 5 FAIL, 9 WARN. Its verdict is "not done". Every line is a note under `tools.md`, none a gate, and each is kept for a stated reason:
  - FAIL `eyebrow`: a false match, a body sentence above a price.
  - FAIL `shadow`: 6 prints at rest. The concept's prints float.
  - FAIL `edge-text`: "3 days" at the right edge is the strip's next-card peek, which the concept asks for.
  - FAIL `untitled-section` at 390: `#boards` has its `h2`, so that is a false match. `#waves` opens on `spot` and `season` with its `h2` lower, because the copy gives those two fields no heading and I may not add one.
  - FAIL `covered-text` at 390: "Sanjee, head instructor" at one scroll stop, passing under the sticky header.
  - WARN `statement-length`: the `spot` sentence at 34 px runs 4 lines.
  - WARN `mixed-font-headline`: `USD`, figure and unit on one line.
  - WARN `card-rows`: the strip and the masonry.
  - WARN `size-count`: 16 sizes, down from 18. Still more than it wants, and a fair criticism.
  - WARN `no-footage`: settled.
  - WARN `side-scroll`: the strip.
  - WARN `empty-middle`: the "1 hour" strip row, a false match on a wide scroller.
  - WARN `still-page`: 8 elements moved, on `file://`, where the swell cannot run.

## images

All are `business-owned` in `assets/index.json`. No review photo, no stock, no atmosphere, so no credit line is required anywhere on the page. No generated imagery.

| Asset | Native | Drawn at | Where | Licence note | Flag |
|---|---|---|---|---|---|
| img-002 | 2000×1500 | 880 css px, crop 2000×1100; phone 343 css, crop 1320×660 | hero, front | Google listing, account named for the school | Under the 1920 hard-fail rule this is the first-screen picture |
| img-007 | 962×938 | 520 css px; phone 367 css | hero, front print | own site | **Photographer provenance flag.** Fallback per concept: img-006 takes the front print and the rail colour needs a new source. Identifiable only from behind |
| img-009 | 1600×1067 | 400 css px, crop 1200×800 | hero, back; hidden on phone | own site | none |
| img-018 | 1440×1920 | 300 css px, crop 1440×720 | hero, back; hidden on phone | own site | none |
| img-006 | 848×480 | 360 css px; phone 156; again at 380 | hero, back; before you book | Google listing | Also the fallback for img-007 |
| img-005 | 832×464 | 500 css px | before you book | Google listing | Faces visible: owner to confirm consent |
| img-020 | 1440×1920 | full-bleed, crop 1440×800; phone crop 1080×1300 | band | own site | Capped at 1760 wide, so at most 1.22× on a very wide screen |
| img-008 | 997×1024 | 480 css px, tilt kept | Sanjee | own site | Identifiable: consent. Visibly smoothed |
| img-012 | 750×558 | 500 css px | outside | own site | Processed look |
| img-014 | 1280×960 | 440 css px | outside | own site | Soft |
| img-017 | 1200×1600 | 560 css px, crop 1200×1300 | back on the sand | own site | none |

Not used: img-036 and every `usable: false`, img-015, img-021 to 032, img-033 to 035, img-041, img-001, img-003, img-004, img-010, img-011, img-013, img-016, img-019.

## gaps

- **Video:** none on disk, so none on the page (Alon, `concepts.md` §2 and §3).
- **Hours and cancellation:** none, on purpose. No block, no placeholder (N10).
- **Group size on the Beginner Lesson:** no row (N7).
- **Instagram:** all socials are dead (F11), so no section and no icons. custom.md asks for the feed; the concept omits it for this reason.
- **Reply time:** not in the copy, so not beside the button.
- **Schema gaps the mockup hard-wires** (`concepts.md` §6): `heroLine`; `priceList` split by position into 12 tours and 2 to buy; `rentals[]` label parsed into kind and duration for the strip; `spots[]`; `pricesAsOf`. The sentence "All prices are as of 5 November 2026." is repeated verbatim beside the rental and tour rows, because the price date otherwise sits far from them.
- **Interface labels the template owns:** Lessons (nav and section title, same word as the copy heading), Ask about this lesson, Your message, Lesson, Your level, Date, People, Not sure, Soft-top, Hardboard, Call, Email, Open in Google Maps, Menu, Skip to lessons, per lesson, per hour, per day, the level words on tiles and detail lines, English, Sinhala, Google. None states a fact the copy does not.

## conflicts

1. **Concept: "the canvas capped at DPR 1.5 on phones". What I did:** 1.5 only on phones under 6 cores, otherwise 2. At 1.5 the front print went visibly softer than its own `<img>`. The canvas draws only while something moves. Cost: more pixels during a pass on good phones.
2. **Concept: "one fixed canvas behind the DOM". What I did:** one canvas absolute in the hero, in front of the (now transparent) `<img>`s, which still take the pointer. It leaves with the page, as the concept also asks, and costs nothing once out of view.
3. **Concept: sheet code "booted on first touch (#5)". What I did:** the sheet's markup and code are inline in the HTML, about 3 KB. Lazy loading would save nothing worth a second request.
4. **Concept: the phone hero shows img-002 "behind and rising above". What I did:** a separate crop of img-002 (the headland alone, 1320×660), because img-007 would otherwise cover the only part of it worth seeing. Hidden on phone: img-009 and img-018, as the concept lists.
5. **custom.md "On the first screen, only the header, at most one short centred title, and one short call to action" against the concept's rating line.** The concept tests the rating on purpose (`concepts.md` §6) and your brief confirms it. It stays, for the human at the pick.
6. **custom.md "full-bleed, clear, unobstructed" and hard constraint 7's full-bleed default for a ≥ 1920 px photograph against this concept's white ground with img-002 at 880 css px.** `concepts.md` argues the hard-fail rule is met because img-002 is the largest thing on the screen, and rubric dimension 8 allows a reason both visual critics accept. They have not ruled on it. **If either refuses, this concept fails on that alone.**
7. **`tools/audit-mockup.mjs` `booking.triggers_are_links` reports false.** It expects triggers to be `href="#book"`. Mine are real `wa.me` links that JS turns into the sheet, which is what base.md and the station brief ask for. Left as it is.
8. **`node tools/check-design.mjs <slug>` as written would shoot the sibling variants and write in their folders.** I ran it with the path form, on this page only.
9. **Fonts come from fonts.gstatic.com at this station**, as base.md allows, so `third_party_hosts` is 1 on first load. The rubric's "any third-party request on first load" hard fail is 4g's to clear by self-hosting.

No flaw found in a look round is left open. Number 6 is unruled, and it is the one that could fail this concept outright.

## different from the others in this run (hard constraint 5)

First screens opened at 1440: Cheeky Monkey unique, Lotus calm, Coconut unique. I did not open calm or interactive here.
- **Cheeky Monkey:** a single drawn board window on a drawn beach, painted lettering. Here: real photographs as paper, no drawn scene, a fat italic signwriter's face.
- **Lotus:** a half-page carved gate in green shade, a thin script. Here: open sea and sky, five pictures, no split.
- **Coconut:** one full-width roof view dissolving into white, a light script. Here: photographs that stay rectangles and move, with a price block in solid sky blue next.
- What a visitor would notice: this is the only page in the run where the pictures themselves move like paper, and the only one that opens on a person surfing.
