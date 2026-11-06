# The Sandhya, unique: "The Hour" (station 4e, designer 0.7.1)

Run `2026-11-ahangama-01`, operator alon, `mode: test`, 2026-11-06. Page: `dist/index.html`, built by `src/build.mjs` from `copy/en.json`, `src/page.css`, `src/hour.js`, `src/page.js`. Media: `src/make-media.sh` (calls `src/bake.mjs`).

## look-log

Sheets are in `shots/round-1/`; each shoot replaced the last, so this log is the record of the earlier rounds. Old site beside every round: `dossier/the-sandhya/assets/old-site-first-screen-desktop.png` and `-mobile.png`.

**First screen alone, before anything below it was built.**

- **Round 1 (bake only, no page).** The composition held at once, which was the question: a square-on building takes a day across its width and reads as one picture. Wrong as design: the sky was a neon coral and magenta poster, the lit panes showed the source file's compression blocks as white squares, foliage went grey and speckled, and a bright green rim ran along the sand. Changed: softened the luminance the sky map reads, averaged curtains vertically (folds are vertical, blocks are not), sank foliage to near silhouette, keyed the sand against green. Old site: already clearer, but this version would have looked cheap beside it.
- **Round 2 (page at 1440 and 390).** Sky and panes now credible, and every bay coming on at once made the yellow boxes look pasted into daylight. The white logo the concept asks for vanished on pale noon cloud. Darkening the high cloud through warm tones then produced a smoky brown band down the middle, the one thing that really did look like a Photoshop trick. Changed: bays ramp up on their own timing, stone and leaves give up daylight before the sky does, logo set in ink on the noon side, white links stay on the dusk side. Clearly better than the old first screen at a glance: the old one shows a soft figure and a dictionary entry, this one shows the hotel, sharp, doing what its name means.
- **Round 3.** The fix for the brown band was to split the light: warm low in the sky, lilac high up. That removed the smoke, and the middle now goes white, lilac, rose, indigo. Phone: tightened the crop (668..1319, 60..990) so the building is larger, widened the slice so the hedge does not break hard. Contrast measured for the first time: 3.85:1 on the darkest pixel under the title, from one dark speck, and over the hedge at 1280x720 and 1366x768. Changed: a tone floor on the sand under the title (a curve on its shadows, no new detail), and the text block positioned by arithmetic in the middle of the sand at any window size.
- **Round 4.** Title now clears 4.5:1 on its darkest pixel at every size tried. **Verdict on the concept's failure test, judged alone: it does not fail.** At 1440x900 it reads as one photograph passing through a day, closer to a time-slice photograph than to a filter, because the structure of every cloud, palm and curtain is the photograph's own. Weakest points, stated plainly: the just-lit bays are flatter than the real curtains in img-027, and the phone version has less room for the transition than the desktop. Built the rest.

**Whole page.**

- **Round 5.** Found in the sheets: `img` had no `height:auto`, so `aspect-ratio` was ignored and img-038 and img-153 ran 1333 px tall. The phone's sticky bar appeared on the first screen beside the hero button, breaking "never a second booking button". Closed room panels were mostly ceiling fan. Why Sandhya's prints collided and left a hole under the text. Rating lines broke mid-date on phones. All fixed: phone hero fills the screen so the bar only arrives with the page; panels crop the ceiling and look towards the view with a per-photograph focal point; the prints sit in their own rows.
- **Round 6.** Sibling room names overlapped when one panel opened (fixed: they wrap at a smaller size in a reserved row). Buttons in the row did not align (fixed: pinned to the bottom). Studio+ King opened on a large white duvet, nothing that sets it apart, so it now leads with the soaking tub its note sells. `audit-mockup` measured scroll CLS 0.018 from the bar's label swap (fixed: both labels share one grid cell, button width fixed).
- **Round 7.** With fonts and images stalled, the hero link never painted: the Google Fonts stylesheet was render-blocking, so a stalled font host would have blocked the booking link, the exact fault F1 found on the old site. Fixed: the stylesheet is non-blocking with a `noscript` fallback, then retested (below). Loosening the curtain key turned parasols in lit bays into yellow wireframes (fixed). Kabalana left a large hole beside the map: Services moved into that column, photograph enlarged. A 1 px line under the phone set-piece frame removed. Beside the old site the whole page clearly wins on the first screen, on rooms and on booking; the old site's one remaining advantage is a real photograph with a person in it.

**Measured on the final build.**

| Check | Result |
|---|---|
| Title ink on darkest poster pixel under the text, 7 window sizes 1024x768 to 2560x1300 | 5.10:1 to 5.53:1 (spec 4.5). Median about 8:1 |
| The same on the h1's whole box, wider than the text, 3 sizes | 4.71:1 to 5.10:1 |
| Under the title at the 0.82 multiply, if it were fully at dusk | about 4.8:1, **computed from the floor, not measured** |
| White links on the sky, brightest pixel | 8.69:1 or better |
| Logo (black), darkest pixel | 7.04:1 or better |
| Hero link, images and fonts never answered | in the DOM at 129 ms desktop, 75 ms phone, topmost element, tap goes to the engine URL (request intercepted) |
| Poster against canvas at rest, compared at quarter size, 1440x900 | mean difference 0.64 of 255, 0.01% of pixels over 12 |
| The same on the phone, before the last canvas-resolution change | mean 2.22, 1.57% over 12. Not repeated after it |
| `audit-mockup` first load | 787 KB, largest image 92 KB, fonts 93 KB, LCP 916 to 2388 ms across runs on a shared machine, CLS 0.0006 |
| `audit-mockup` scroll | run-to-run early CLS 0.004 to 0.007 (limit 0.01), settled 0 |
| Tap targets under 44 px | 0 |
| `check-design`, `check-places` | pass, pass. No default-look warnings |

**Inspector (`design-taste-frontend/inspect.mjs`), kept with reasons:** long headlines are the copy's own statements and the words are not mine to cut. The gradient is the concept's continuous ground. "Still page" counts reveal animations, which `custom.md` forbids on headings. The h1 at 27 px and its word count are the concept's. "Covered text" is headings passing under the sticky bar and header while scrolling. "Eyebrow" is the end of the Services list above Exclusive Use, not a label. "Side scroll" is the phone galleries, which have dots. "No footage": there is no usable video.

**Skills not run,** to stay in budget: `/find-animation-opportunities`, `/review-animations`, `/emil-design-eng`, `/impeccable`. Impeccable's launcher also downloads and executes a binary. Micro-animations were written directly: button press, panel growth, plus to close, dots widening, bar label crossfade, map print tilt, rating lift, footer icons, drifting prints, set-piece dots.

## look-log, round 2 (rework after scoring, 2026-11-07)

Reviewers scored round 1 at 6 (visual) and 7 (experience): the first screen read as a trick at normal size, which is the concept's own failure test, and my round 1 verdict above that it did not fail was wrong. My account of the mottling as mostly a zoom problem was wrong too. Sheets: `shots/round-2/`, **shot over http, because a page opened from `file://` cannot load its images into WebGL and shows the no-WebGL fallback.** None of the words changed.

**What I did about the grade, plainly: I kept it only as a moving sweep, and the set-piece ends on the real img-027.** No graded still exists any more, on disk or in the page. Graded pixels are drawn live on the canvas while the visitor scrolls, and `make-media.sh` no longer writes one.

Why it ends on the real photograph: I rebuilt the grade against img-027 (curtain glow from a column-median texture of the source's own folds, amber not lemon, spill on soffits and hedge tops, dark green hedge, re-cut hedge and sand edge, a no-halo sky map with the pink held low) and put the all-dusk frame beside img-027 on one screen. **It still loses.** The real picture has light falling down the curtains from a cove, blue concrete with real falloff, whole chairs and wall-washers; the grade has flatter panes, broken chair shapes and flat sand. The operator's other test also points the same way: at normal size, especially on a phone, the all-dusk frame could be taken for a photograph at a glance. Either way the rule says end on the real one. So the real print rises, opaque, over the sweep from 68% of the pin and covers it before the sweep completes at 84%; the graded frame then fades out behind it. The page's rest state is a real photograph. The frame carries an honest label for assistive tech: "An effect, not a photograph taken at dusk…". **The operator or Shahar still has to rule on whether the moving grade may stay at all.** If not, the fallback path already exists and is one change away: it is what no-WebGL visitors get (the daylight photograph, then img-027 rising over it), with no bays lighting and no dots.

- **Pass 1 (grade alone, no page).** Amber, deep blue, dark green: the colour was right at once. Wrong: block marks still in the panes, trunks olive, concrete stained green, a blue halo round every palm. Changed: the green test now runs only in the bays with fronds in front, because the file's olive compression blocks were tripping it, and that was the actual source of the "stains" in round 1; trunks get their own dark tone; leaves must be truly greener than red; sky samples skip dark neighbours, which removes the halo.
- **Pass 2 (first screen, plain img-152).** Clearly better than the old first screen and better than my round 1: it is the hotel, in real light, with nothing to doubt. It has the same weakness as any daylight elevation: no sea. Beside `old-site-first-screen-desktop.png` the old page still has more mood; this one wins on being sharp, real and clear about what the place is. Sea: img-152 is taken from the waterline with its back to the water, so it holds no sea pixel. Added the real shallows from img-153 as a separate strip below it, with a gap so it never reads as one picture. Reads top to bottom as building, sand, water, the way the place is. Nav moved from white text to ink on pale pills, since the sky is now daylight.
- **Pass 3 (phone).** Re-cropped to x 930..1821, which ends on the building's own end wall where round 1 cut through a bay, with blue sky and palms beside it, at no more than source resolution. Set-piece now fills the screen above the bar; no pale bands.
- **Pass 4 (handover).** A crossfade into the print gave a double exposure of two buildings. Replaced with the print rising opaque over the sweep. A hard line across the trees left of the building traced to the sky polygon's edge; those trees are now in the foliage mask.
- **Pass 5 (measuring).** Tracing LCP on a throttled phone found the hero finishing at 3.8 s because 22 room photographs were fetched at load, inside Chrome's lazy-load margin. This is what the critic suspected on calm. Slides now have no box until their room is near (first photograph) or on screen (the rest), so they cannot fetch early; JS off, everything is there. The hero then finished at about 1.8 s and first load fell from 787 KB to 334 KB. Early scroll CLS rose to 0.017 from the title's font swap, so the fallbacks now carry the real faces' measured width and metrics.
- **Pass 6 (last sheet).** The phone sheet showed a blank box where the set-piece approaches, behind the bar. Two causes, both handled. The canvas could be drawn while off screen, so it now redraws on every arrival and only covers the still once it has drawn on screen. The box itself was the headless compositor artefact in designer references #29, an opaque layer over a WebGL canvas: canvas pixels read back correctly and `opacity: .999` on the bar and header removed it. Not seen on a real GPU either way, because none was available.

**Fix list, as asked.**

| Item | Done | Evidence |
|---|---|---|
| Phone bar stacking | Rewritten with one label element that is only ever re-texted, so it cannot stack; pending timer cleared | CDP touch gestures at 4,000 and 2,400 px/s: 1 label at every sample and at page end, 0 label/link mismatches; landing on rooms by fast swipe gives the right room and `rid` |
| Bar waits for the hero button | Phone bar and desktop header button stay hidden until the hero button leaves the screen | After 40 px: hidden. After the button has gone: visible |
| Phone set-piece | Fills the pinned screen above the bar, no bands | `shots/round-2/mobile-sheet.png` |
| Phone first screen | Re-cropped, as above | same |
| Phone length | 22.8 to 18.7 screens. Services closed, Kabalana a swipe row of steps, guests a swipe row, gentler room heights | `shoot.json` 15,789 px at 844 |
| Stair-stepped indents | Gone: each paragraph is a step, its first sentence as the lead | desktop sheet |
| Floating map | On a white card with its button, under the photograph, Services closed beside it | desktop sheet |
| Studio+ King rest crop | The window, palm and sea from img-071, cropped clear of the bed | `rooms-closed` look |
| Smeared header | Solid ground, phone bar too | desktop sheet |
| Pale corporate blue | Ground now starts at cloud white `#F2F6F6` and warms to the same peach | same |
| Footer | Prints the phone and email | page |
| `.strip` scrollers | `tabindex="0"`, labelled, arrow keys change photograph | test |
| `<h3>` in `<button>` | 0 now: the heading is plain, a separate button beside it expands; on phones that button is not rendered | test |
| Skip link | First Tab stop, shows on focus, lands on Rooms with the heading clear of the header | test |
| CTA at 320x568 | Inside the fold, bottom at 497 of 568; also at 360x640, 375x667, 390x664, 390x844, 412x915; no sideways overflow | test |
| Font sizes, inline संध्य | 22 sizes down to 14; the Sanskrit word no longer changes its line's height | inspector, look |

**Measured on the final build.**

| Check | Result |
|---|---|
| `audit-mockup` first load | 334 KB, 11 requests, largest image 113 KB. Google Fonts are the only other host, as allowed at 4e |
| LCP | 1788 ms in the last audit; 1964 ms in my own throttled trace, element `hour-noon-phone.webp` |
| CLS; scroll early and settled | 0; 0.0006 and 0.0006 |
| Tap targets under 44 px | 0 |
| Hero link, images and fonts never answered | topmost at about 60 ms, tap requests the engine URL (intercepted) |
| Title on the ungraded sand | 4.73:1 on its single darkest pixel at the worst of 7 window sizes, typically above 6:1 at the 0.1 percentile. **Computed:** pixels measured, title ink then darkened to `#211E13` so it would clear 4.5; no filter on the sand |
| `check-design`, `check-places` | pass, pass |

**Inspector, kept with reasons:** long headlines are the copy's statements. The gradient is the warming ground the reviewers asked to keep. "Eyebrow" is the end of the Services list above Exclusive Use. "Covered text" at 390 is a statement passing under the bar. "Side scroll" is galleries and swipe rows, which have dots. Size count 14 is mostly `clamp()` at one width. "No footage": no usable video.

## images

All from `dossier/the-sandhya/assets/`, `license: business-owned`, note in the dossier: published on the business's own site, no credit shown, photographer's terms not known. No stock. No image was re-fetched from an original.

- **First screen and start of the set-piece:** img-152, ungraded, re-encoded only (`hour-noon*.webp`). The phone file is a crop.
- **The sea on the first screen:** img-153, a crop of its lower part (`img-153-sea-*.webp`). A different photograph from img-152, taken from the water, kept apart by a gap or by the title.
- **Set-piece end:** img-027, real, at or under native size on desktop. On phones it is cropped to cover the screen, about 1.4x on a 2x display.
- **Shader inputs, derived from img-152:** `hour-mask.webp`, polygons cut by hand; `hour-folds.webp`, column medians of each pane. Neither is shown.
- **Studio King:** img-062, 077, 061, 070, 079. **Studio Twin:** img-167, 043, 080, 165, 083. **Studio+ King:** img-071, 076, 042, 066, 067, 074, 073. **Director's Suite:** img-087, 171, 172, 058, 059, 055.
- **Sections:** img-038 arrival; img-113, 110, 118, 115, 117 dining; img-032, 138, 126 house; img-153, 034, 013 Kabalana; img-039 Exclusive Use; img-154 Why Sandhya. `logo-white.png` for the logo, shown black by CSS.
- Files are at or under native size on disk. Drawn full-bleed at 1440: img-152, 038, 032, 117, 153, all at least 1500 wide.
- Alt text was written from labelled contact sheets and dossier descriptions, with img-152, 153, 027 and 154 opened at full size. Room photographs were seen at about 300 px, so their alt text is less closely checked.
- **Not used, per the concept:** img-025, 144 to 150, 036, 012, 057, 022, 024, 026, 029, 141 to 143.

## gaps

- **No usable video.** `vid-001` is a third party's vlog, `usable: false`. This stays a pitch point.
- **No nightly rate** on the page, by decision. The sentence "Nightly rates are on our booking page, for the dates you choose." appears with the rooms and in the booking section.
- **No Instagram feed:** no post could be read. A button only.
- **No season, no named owner or staff,** so no staff photographs and no season line.
- **Stay facts carry a contradiction,** shown as the copy gives it (`stayInfo.note`).
- **Template labels I added,** not on the concept's list: "Services", "Skip to Rooms", "Every room has" (the copy's own words as a lead-in). "Sleeps", "Check-in from", "Check-out to" and "read" are also template labels.

## conflicts

1. **The grade, for a ruling.** PLAN.md §9 says no generated imagery, and the curtains' glow is not in the photograph. Done per the operator's direction: moving sweep only, real ending, honest label. If the ruling is no grade, removing it costs the bays lighting and the dots, both on the reviewers' keep list.
2. **The hero no longer has a main item.** `base.md` and Shahar (2026-10-20) ask unique for a WebGL or video main item on the first screen, "never a cookie-cutter section". The operator's direction overrides this for this page: plain img-152, the day only in the set-piece. Cost: the first screen is now a strong photograph and a title, and the idea arrives later.
3. **The sea strip against `custom.md`.** It says "on the first screen, only the header, at most one short centred title, and one short call to action". The strip adds a second photograph to that screen, to answer the note that a beachfront hotel shows no sea. Alternative: remove it and let the sea arrive with the rooms, one scroll later. For the reviewers to judge.
4. **Date picker (departure, for the pick).** `custom.md` says "pick dates" inside the site. There is none, because nobody has seen the engine honour dates, and audit recommendation 4 says no dates shown that are not sent. The operator is raising this at the pick.
5. **img-068 left out of Studio+ King (concept against itself).** Concept 3's list includes it; the shared section says nothing may suggest a room has its own pool. The shared rule won.
6. **No GSAP (departure, no visible loss).** The pin is `position: sticky`, its height reserved in CSS from first paint, the scrub damped `requestAnimationFrame`.
7. **The kit list changes the punctuation of a paragraph.** Paragraph 3 of The rooms is a lead-in plus seven items in its own words and order. The connectives "Each one also has" and "too, with" are gone, and items start with a capital. The copyeditor has not seen this form, and the critic's fix list asks for that.
8. **Kabalana's steps set each paragraph's first sentence as a lead.** All words verbatim and in order, only the setting changes. On a phone they are a swipe row, so four of the five steps start off screen.

## what a visitor would notice against the other pages

No other business has mockups in this run. Against the two other variants of this business, per `concepts.md`: this one opens on the whole building from outside in daylight, not on a bedroom or a lounge; a Devanagari-capable serif and sans; indigo, not crimson or magenta. I did not open the `calm` or `interactive` pages in either round, though my calm-related note on lazy-loading comes from the critic's report.
