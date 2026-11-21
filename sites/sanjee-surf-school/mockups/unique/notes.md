# Sanjee Surf School: unique mockup, "The set" (concept 3)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.

**Files.** The page is `dist/index.html`. CSS and JS are inlined from `src/page.css` and `src/page.js` by `src/build.py`, which also runs `src/body.py` (everything below the first screen). Every word comes from `copy/en.json`. Media come from `src/make-media.sh` (`# media: sites/sanjee-surf-school/mockups/unique/dist/img/**`). Fonts are Shrikhand and Figtree 400–700 (variable; Atkinson Hyperlegible until round 7), latin woff2 from fonts.gstatic.com at this station; 4g self-hosts them.

**Rebuild:** `bash src/make-media.sh && python3 src/build.py`.

**To view it: serve `dist/` over http.** Opened as `file://`, the browser refuses the photographs as WebGL textures, so the page shows the CSS fallback (prints bobbing), not the swell. `tools/audit-mockup.mjs` and `tools/check-design.mjs` serve over http and see the swell; `tools/shoot.mjs <file path>` does not. To see the swell in stills use `tools/shoot.mjs http://127.0.0.1:<port>/?swell=0.62`. `?swell=<0..1>` freezes the swell at that phase, `?still` gives the static prints, `?nogl` the CSS fallback.

## look-log

The bar: the old site (`assets/old-site-desktop.png`, `old-site-mobile.png`, `funnel/walk/01-home-fold-settled.png`), and `gold/the-lavish-haven.html`, rendered once at 1440 during round 3 and judged against from then on. Global Surf's pages and KA were not rendered this session. Rounds 1 to 3 were the first screen alone, with nothing below it in the file. Only the last round's sheets are kept (`shots/round-9`, swell frozen at rest); earlier sheets are deleted.

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

**Rework after pre-score round 1: visual 6, experience 8, critic 66.9 of 80.** Rounds 7 to 9. All three reports read first. Scratch copies of `check-design` and `audit-mockup` differ only in the port (9336, 9335), because the real ports were busy. Server: my own, on 9333.

**Round 7, first screen.** Five prints on white replaced by img-002 full-bleed, title in its sky, img-007 and img-006 floating on the bay.
- What I saw: the first time this hero looks decided, not assembled. The bay gives the screen one ground and the surfer one subject. img-007 went to the lower **left**, over open sea and sky, so the headland stays whole on the right, which the old layout covered. Swell now lifts each print as a near-rigid body (`AMP` 12 desktop, 10 phone; height and tilt read at the print's centre, 14 % of the local curve left at the edges), and the surfer no longer stretches. Figtree replaced Atkinson, whose every test feature (`zero`, `ss01–04`, `cv01`, `salt`, `lnum`, `onum`) kept the slashed zero, as did Atkinson Next. `word-spacing:.12em` opens "Surf lessons".
- Wrong: the phone ground ran down to the sand, leaving stray sand strips either side of img-007. img-006 on the phone was too large and hid a roof.
- Changed: phone ground stops in the water (crop 1114×1337) and the blue block starts behind img-007; img-006 cut to .34 of img-007's width, inset from its edge and tucked under it.

**Round 8, whole page.**
- Wrong: "Lessons" still sat above "Who we teach", because the tagline was inside the left column.
- Changed: tagline now runs across the block and both titles start level. That closes the empty upper right the critic named.
- Good: img-018 in the band is the page's high point now, not its gloom. The line sits in the peach sky. A third print, img-009, joined the outside pair, which uses a picture dropped from the hero and adds a little of the mosaic wealth both critics said the old site has.

**Round 9, states and checks.**
- `check-design` failed on my own placeholder: "inline image is drawn 1440px wide from a 20px source". A true reading of a 20 px blurred background. It is now removed as soon as the real bay has loaded, which also frees it. With JS off it stays underneath the real image, and no visitor sees it once the bay paints.
- Overflow at 320 from the longer rating line: it now wraps on phones.
- img-006 touched the hero button at 1280×720 (2 px): moved lower.
- Slow 4G on a phone (1.6 Mbps, 150 ms, 4× CPU): the request order is index, img-007, ground, img-006. The frame taken at 1.29 s shows a sharp top of img-007 painting in over its blur, and blurred colour everywhere else. No white boxes.
- Drag to dismiss: a slow 40 px drag returns, a long drag closes and returns focus to the button, and the sheet reopens clean. Esc closes the sheet and the phone menu. Hover on `#hero-cta` lifts 2 px with a shadow; strip cards lift 3 px and tint.
- Swell period 8.4 s, pass 5.6 s, so the still gap is 2.8 s, from 6.4 s.
- **Against the old site: clearly better on both widths.** Against calm: same picture, plainly a different page (see conflict 1). Against gold: closer than rounds 1 to 6, because there is now one ground and one subject, but Lavish's object is still more original than a print on a photo.
- Inspector on the final build, on the file path, so without the swell: 4 FAIL, 9 WARN. `eyebrow`, `shadow`, `edge-text` and the WARNs carry the reasons given in round 6. `covered-text` now names the hero title at scroll: it passes under the sticky header. `still-page` (10 elements) is `file://` again. `untitled-section` is `#waves` at 768 and 390, because the copy gives `spot` and `season` no heading.
- Real GPU, ANGLE Metal on an Apple M1, at 1440×900 and 390×844, both 2×: no context loss, rAF median 16.7 ms and p95 17.6 ms over about 5 s from load, which covers most of a pass. rAF pacing is not shader cost, and an M1 is not a mid-range Android. Under SwiftShader `CONTEXT_LOST_WEBGL` was logged in most runs and the page recovered to `set gl`; I did not find out why, and it did not happen on Metal.
- `/review-animations` still refuses agent invocation. `/impeccable` critique not run. Not tested on a real phone. I judged the swell from frames, not from watching it.

## images

All are `business-owned` in `assets/index.json`. No review photo, no stock, no atmosphere, so no credit line is required anywhere on the page. No generated imagery.

| Asset | Native | Drawn at | Where | Licence note | Flag |
|---|---|---|---|---|---|
| img-002 | 2000×1500 | **full-bleed ground**, crop 2000×1250, file 2000 and 1440 wide; phone crop 1114×1337, file 900 wide | hero | Google listing, account named for the school | Above 2000 css px wide it stretches a little (1.28× at 2560) |
| img-007 | 962×938 | at most 640 css px, 558 at 1440×900; phone 367 css | hero, front print | own site | **Photographer provenance flag.** See "how much rests on img-007" below |
| img-006 | 848×480 | 307 css px at 1440; phone 125; again at 380 | hero, small print; before you book | Google listing | Also the fallback for img-007 |
| img-009 | 1600×1067 | 340 css px, crop 1200×800 | outside, third print | own site | none |
| img-018 | 1440×1920 | full-bleed band, crop 1440×800; phone crop 1080×1300 | band | own site | Capped at 1760 wide, so at most 1.22× on a very wide screen |
| img-005 | 832×464 | 500 css px | before you book | Google listing | Faces visible: owner to confirm consent |
| img-008 | 997×1024 | 480 css px, tilt kept | Sanjee | own site | Identifiable: consent. Visibly smoothed |
| img-012 | 750×558 | 500 css px | outside | own site | Processed look |
| img-014 | 1280×960 | 440 css px | outside | own site | Soft |
| img-017 | 1200×1600 | 560 css px, crop 1200×1300 | back on the sand | own site | none |

Not used: img-020 (since round 7), img-036 and every `usable: false`, img-015, img-021 to 032, img-033 to 035, img-041, img-001, img-003, img-004, img-010, img-011, img-013, img-016, img-019.

`og:image` is a new file, `og-img-002.jpg` (1200×630, img-002), absolute, on the host the run's naming gives (`https://sanjee-surf-school.os1.workers.dev/`). That host does not exist yet, so the deployer must confirm it.

**How much rests on img-007.** Still a lot. It is the only large person on the first screen, on both widths, and it is what the phone screen is. If the rights do not clear, img-006 can take the front print: it is 848 px against 962, softer, and a smaller figure, so it holds at about 500 css px on desktop and about 370 on a phone (2.3 source px per css px). The bay, title and swell are unaffected. The rail pink is sampled from img-007, so it would need a new named source, though the hex could stay. I would expect the first screen to lose a real part of its pull, and I did not build or shoot that version. It should be re-scored if used.

## gaps

- **Video:** none on disk, so none on the page (Alon, `concepts.md` §2 and §3).
- **Hours and cancellation:** none, on purpose. No block, no placeholder (N10).
- **Group size on the Beginner Lesson:** no row (N7).
- **Instagram:** all socials are dead (F11), so no section and no icons. custom.md asks for the feed; the concept omits it for this reason.
- **Reply time:** not in the copy, so not beside the button.
- **Schema gaps the mockup hard-wires** (`concepts.md` §6): `heroLine`; `priceList` split by position into 12 tours and 2 to buy; `rentals[]` label parsed into kind and duration for the strip; `spots[]`; `pricesAsOf`. The sentence "All prices are as of 5 November 2026." is repeated verbatim beside the rental and tour rows, because the price date otherwise sits far from them.
- **Interface labels the template owns:** Lessons (nav and section title, same word as the copy heading), Ask about this lesson, Your message, Lesson, Your level, Date, People, Not sure, Soft-top, Hardboard, Call, Email, Open in Google Maps, Menu, Skip to lessons, per lesson, per hour, per day, the level words on tiles and detail lines, English, Sinhala, Google. None states a fact the copy does not.

## conflicts

1. **Concept 3's white ground against hard constraint 7 and the visual critic's ruling. Resolved in favour of the rule.** `concepts.md` puts five prints on white and img-002 at 880 css px. base.md says a photograph ≥ 1920 px makes a full-bleed first screen the default, with the small-print fallbacks only for genuinely small material, and calm proves img-002 holds the screen. So img-002 is now full-bleed with img-007 and img-006 on it, as the visual critic proposed. It also looked better. **Closest row in the run: calm, the same picture.** They differ on sight: Shrikhand against a text face, rail pink against red, a large man on a wave in front of the bay against nobody, and a rating line. Same headland, same blue. Both will not ship, but a human should see them side by side.
2. **Experience critic ("I accept the departure from full-bleed") against visual critic.** Followed the visual critic, as the coordinator's brief does. The swell likewise: experience liked it being plainly felt, visual read it as a flag. At 12 px it is quieter. Whether it is still felt within 3 s is the thing I most want re-scored. Measured only in stills, never watched on a real GPU.
3. **Concept: "the canvas capped at DPR 1.5 on phones". What I did:** 1.5 only on phones under 6 cores, otherwise 2. At 1.5 the front print went visibly softer than its own image. The canvas draws only while something moves.
4. **Concept: "one fixed canvas behind the DOM" and "vertex displacement so each print flexes like paper on water". What I did:** one canvas in the hero, in front of the transparent images, which still take the pointer. Prints now ride near-rigid, on the critic's finding that flexing read as a rendering wobble and stretched the surfer.
5. **Concept: sheet code "booted on first touch (#5)". What I did:** inline, about 3 KB. Lazy loading would save nothing worth a second request.
6. **custom.md "only the header, at most one short centred title, and one short call to action" against the concept's rating line.** The concept tests the rating on purpose and the brief confirms it. It stays, now on the sky, for the human at the pick. The prints also go beyond that custom.md line; they are this concept's main item (base.md's rule on main items).
7. **Concept's body face.** Atkinson Hyperlegible replaced by Figtree because no zero alternate exists. Not used by a picked page in this run. Shrikhand stays.
8. **`tools/audit-mockup.mjs` `booking.triggers_are_links` reports false.** It expects triggers to be `href="#book"`. Mine are real `wa.me` links that JS turns into the sheet, which is what base.md and the station brief ask for. Left as it is.
9. **`node tools/check-design.mjs <slug>` as written would shoot the sibling variants and write in their folders.** I ran it with the path form, on this page only.
10. **One word outside `en.json`:** Week Intensive reads "5 private sessions | 2 hours each" ("each" by the coordinator's instruction, from the dossier). "as of" before the capture date and "Languages:" are template labels.
11. **Fonts come from fonts.gstatic.com at this station**, as base.md allows, so `third_party_hosts` is 1 on first load. The rubric's "any third-party request on first load" hard fail is 4g's to clear by self-hosting.

No flaw found in a look round is left open. Nothing here is blocking at 4e.

## different from the others in this run (hard constraint 5)

First screens opened at 1440: Cheeky Monkey unique, Lotus calm, Coconut unique. I did not open calm or interactive here.
- **Cheeky Monkey:** a single drawn board window on a drawn beach, painted lettering. Here: a real bay, a fat italic signwriter's face.
- **Lotus:** a half-page carved gate in green shade, a thin script. Here: open sea and sky, no split.
- **Coconut:** one full-width roof view dissolving into white, a light script. Here: a saturated bay with two prints floating on it, then a price block in solid sky blue.
- What a visitor would notice: this is the only page in the run with prints riding over the picture, and the only one that opens on a person surfing.
