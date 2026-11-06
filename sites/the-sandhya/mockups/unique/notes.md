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

## images

All from `dossier/the-sandhya/assets/`, `license: business-owned`, note in the dossier: published on the business's own site, no credit shown, photographer's terms not known. No stock. No image was re-fetched from an original.

- **Hero, set-piece, baked stills and mask:** img-152 (1920x1080, the source's full width). `hour-slice*`, `hour-dusk*` are re-grades of it. No sky replaced, no pixel invented.
- **Studio King:** img-062, 077, 061, 070, 079. **Studio Twin:** img-167, 043, 080, 165, 083. **Studio+ King:** img-076, 071, 042, 066, 067, 074, 073. **Director's Suite:** img-087, 171, 172, 058, 059, 055.
- **Sections:** img-038 arrival; img-113, 110, 118, 115, 117 dining; img-032, 138, 126 house; img-153, 034, 013 Kabalana; img-039 Exclusive Use; img-027, 154 Why Sandhya. `logo-white.png` for the logo, shown black by CSS.
- Every file is at or under native size; nothing is enlarged on disk. Drawn full-bleed at 1440: img-152, 038, 032, 117, 153, all at least 1500 wide.
- Alt text was written from labelled contact sheets and the dossier descriptions, with img-152, 027 and 154 opened at full size. The room photographs were seen at about 300 px, so their alt text is less closely checked.
- **Not used, per the concept:** img-025, 144 to 150, 036, 012, 057, 022, 024, 026, 029, 141 to 143.

## gaps

- **No usable video.** `vid-001` is a third party's vlog, `usable: false`. The page leads with the photograph; this stays a pitch point.
- **No nightly rate** on the page, by decision. The sentence "Nightly rates are on our booking page, for the dates you choose." appears with the rooms and in the booking section.
- **No Instagram feed:** no post could be read. A button only.
- **No season, no named owner or staff,** so no staff photographs and no season line.
- **Stay facts carry a contradiction,** shown as the copy gives it (`stayInfo.note`).
- **The word "Services" is a template label I added** for the `amenities` list; it is not on the concept's list of labels. "Sleeps", "Check-in from", "Check-out to" and "read" are also template labels.

## conflicts

1. **Date picker (departure, for the pick).** `custom.md` says "pick dates" inside the site. There is none, because nobody has seen the engine honour dates, and audit recommendation 4 says no dates shown that are not sent. The operator is raising this at the pick. Cost: the booking journey is a link, not a journey inside the site.
2. **Logo colour (departure from the concept).** The concept says white logo and links on the sky. White on the noon sky measures about 1.7:1 and could not be read. The logo is black on the noon side (7:1 or better), the links white on the dusk side (8.7:1 or better). I think this suits the idea: each sits in its own hour.
3. **img-068 left out of Studio+ King (concept against itself).** Concept 3's photograph list includes it; the shared section says nothing may suggest a room has its own pool, and this frame looks like a private plunge pool. The shared rule won. Cost: one photograph.
4. **No GSAP (departure, no visible loss).** The pin is `position: sticky`, with its height reserved in CSS from first paint, and the scrub is damped `requestAnimationFrame`. 27 KB saved, no pin-spacer jump.
5. **The kit list changes the copy's punctuation of a paragraph.** Concept: "the kit as an icon list". Paragraph 3 of The rooms is now a lead-in, "Every room has", plus seven items in its own words and order. The connectives "Each one also has" and "too, with" are gone, and each item starts with a capital. The copyeditor has not seen this form.
6. **No-WebGL set-piece.** With JS on and WebGL unavailable, the pin stays and the two stills crossfade with scroll, where the concept says they swap. Midway there is a brief double exposure of the palms. Kept because it stays one object; reduced motion and no JS get the plain dusk still, no pin.
7. **First-load weight.** 787 KB against the concept's 0.6 MB target. Inside playbook §4's 1.5 MB. Most of the excess is room photographs the browser fetches early because of its generous lazy-load margin, not the first screen. A matter for 4g.
8. **Blocking by the letter of the rule, my reading is that it is minor: mottling in some lit curtains.** The source is a compressed 1920 px file, and reflections and compression blocks in the glass leave faint uneven patches in a few panes, and scratchy shapes where chairs sit behind the balustrade. Reduced over three rounds, and no further at 4e without a better source: the dossier holds this frame at 1920 only, and it has no larger original on record (`original_width` 1920). I see it mostly when zoomed; a critic should judge it at normal size.

## what a visitor would notice against the other pages

No other business has mockups in this run. Against the two other variants of this business, per `concepts.md`: this one shows the whole building from outside, not a bedroom or a lounge; a Devanagari-capable serif and sans; indigo, not crimson or magenta. `calm` and `interactive` were being built at the same time and I did not open them.
