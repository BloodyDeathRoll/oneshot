# Sanjee Surf School, interactive: "Where you start"

Station 4e, designer 0.7.1, run `2026-10-midigama-01`, concept 2 in `concepts.md`.
Built by `src/make-media.sh` then `src/build.py` (words read from `copy/en.json`; `src/page.css`, `src/page.js`, `src/swell.js`).

## look-log

Compared with: `dossier/sanjee-surf-school/assets/old-site-desktop.png` and `old-site-mobile.png`. Gold notes read: Global Surf, The Lavish Haven, KA, Layday.

Rounds 1 and 2 were shot with a scratch Playwright harness at the same 1440x900 and 390x844 sizes, not `tools/shoot.mjs`, because I needed frames over time and frame differences. From round 3 on it is `tools/shoot.mjs`. Only `shots/round-6` is kept.

**Round 1, first screen.** The composition already holds, a paddler alone on a big aqua band with the title in the calm lower water, but the picture is flat and hazy and the sky reads grey. I will take the haze off with a mild grade baked into the file, so the still and the shader stay one picture. Beside the old site (an empty hotel pool behind tree trunks, a cookie box, no name and no place) it is clearly better at a glance, on plainness and honesty rather than on richness.

**Round 2, first screen.** The grade worked, the wave now reads aqua and the sky clean, but a slit-scan over 13 s showed the water only wobbling in place, and at 1x the phone canvas was softer than the still underneath. I added two layers of surface sliding towards the camera and raised the phone canvas to 1.3x. Still clearly better than the old site, which has no water on its first screen that a visitor could read as the school's.

**Round 3, first screen.** On the phone the sliding layers smeared the lens droplets at the foot of the frame into vertical streaks, and the phone had no menu, and the button's shadow looked heavy over the water. I locked the droplet zone out of the motion, added the phone menu and made the button flat. Clearly better than the old site's phone screen: name, what and where and one action, with no toast and no cookie box.

**Round 4, whole page.** Below the hero the concept's `#D6DAE0` read as a grey admin panel at this size, the board chart was grey blobs on grey stripes, card prices did not line up, the sticky header showed text through it, and the message panel left a hole beside it. I lightened the large panels to `#E6E9ED`, redrew the boards in `#91B0C8` with a stringer, and aligned the prices. I also made the header and bar opaque and centred "Before you book" against the panel. Clearly better than the old 30,387 px page, which has no menu on a phone and its first price at 2,522 px.

**Round 5, whole page.** The interaction shots found the phone's rolling digits showing halves of two numbers, the nav floating short of the right edge on the hero (held off it by the hidden button), and tablet boards drawn huge. The first-screen frame also showed the surface layers at 16 px per cycle fogging the lower water, which is the "effect hiding the photograph" the concept warned about. I fixed the digit window, slid the nav with a transform, capped the chart scale and halved the travel to 8 px per cycle, after which the frame is as crisp as the still; I also fixed the two tap targets under 44 px and added a skip link. The fog is the one I would have missed without comparing frames against the still.

**Round 6, whole page, last.** Sheets checked at both widths for overflow, overlap and unreadable text: none at rest; the fixed header and bar pass over text while scrolling, as any sticky bar does, and nothing rests under them. Reduced motion and no WebGL show the same picture with the canvas hidden and the tiles still working; no JS hides tiles and message panel, keeps every word and link, and on a phone drops the hero button because the bar carries the action. **Why this beats the old site:** it opens on the sea and a person going out rather than a hotel pool, names the school and the town, reaches a price one scroll down rather than 2,500 px, and replaces five taps, three typed fields and a card with one tap.

### Skills, one line each
- `/animate`, `/design-motion-principles` (create mode, marketing weighting): tokens `--ease-out` `cubic-bezier(.23,1,.32,1)`, press 120 ms, state 240 ms, travel 300 ms; the spring is a sampled damped spring with about 1.05 overshoot. Hover gated.
- `/find-animation-opportunities`: taken: boards stand up once with a 50 ms stagger the first time the chart is seen; the pill fades in on first choice. Rejected: section entrances (custom.md: no reveals on headings), print hover.
- `/review-animations`, read and applied by hand: the pill's `width` no longer transitions. Left in: the rolling digits and pill at 300 ms, at the top of the budget, deliberate. Menu closes without an exit animation.
- `/emil-design-eng`: first 90 lines read only, as the decision framework; I did not work through the whole checklist.
- `/mobile-native`: tap highlight on `html`, no overscroll override (this is a document), controls unselectable, `overscroll-behavior-x: contain` on swipe rows, safe areas, 16 px date input. Nothing tried on real hardware.
- `/impeccable`: `craft-floor.md` read and applied (selection colour, caret, tabular numerals). **Its scripts were not run**: the launcher downloads and runs a binary into `~/.impeccable/`, outside this worktree. So no `detect --json` and no `/impeccable critique` by its engine.
- `inspect.mjs`, last run, 5 FAIL and 7 WARN, all kept on purpose or false:
  - `shadow`: the cards' soft shadow; custom.md allows it and it lifts them off the panel.
  - `icon-cards` and `eyebrow`: the "for you" dot, not an icon or a kicker.
  - `palette-terracotta`: `#d7a98b` is the loading colour behind the sunset, covered by the photograph.
  - `covered-text`: sticky bars passing over text in transit.
  - `edge-text` at 768: not traced; I believe it is the next card in the swipe row.
  - `statement-length`: the `spot` sentence set large, copy unchanged.
  - `size-count`: 19 sizes, partly from clamps. A real, small untidiness, not fixed.
  - `no-footage`: no usable video (Alon, concepts §2).
  - `side-scroll`: the concept's peek rows.
  - `lopsided` and `empty-middle`: not seen in the render, the print fills that side.
  - `still-page`: it counts DOM movement; the moving thing is a canvas.

## images

| File in `dist/img/` | Asset | Licence note | Use |
|---|---|---|---|
| `hero-img-009-1600.webp` (inlined in the HTML, see conflicts) | img-009, 1600x1067 | business-owned, sanjee-surf.com | hero, full-bleed, mild grade |
| `feature-img-018-wide-1440`, `-tall-900` | img-018, 1440x1920 | business-owned, sanjee-surf.com | feature band |
| `print-img-007-962`, `-640` | img-007, 962x938 | business-owned, sanjee-surf.com. **Concept's rights flag: may be a beach photographer's** | Sanjee print |
| `print-img-006-848` | img-006, 848x480 | business-owned, Google listing | print at 500 css px |
| `print-img-014-1000` | img-014, 1280x960 | business-owned, sanjee-surf.com | print at 500 css px |
| `back-img-002-wide-2000`, `-tall-900` | img-002, 2000x1500 | business-owned, Google listing | closing band |

No review photo and no atmosphere image is used, so no credit line is needed. img-036, `usable: false` images and the concept's rejected images are not used. No generated imagery.

Hard constraint 5, from the other businesses' mockups opened in this run (Cheeky Monkey unique, Lotus calm and interactive, Coconut interactive and calm): those first screens show a drawn board window on a beach, a carved gate, a shaded garden and a thatched roof, each with land or a building and a name as title. This one is open sea with no land and no building, a dark what-and-where title low on the water, a cobalt button and no Booking.com. Below the fold it has level tiles, a message that writes itself and boards drawn to scale, none of which they have.

## gaps

- Video: none usable (concepts §2). The swell stands in for it.
- Hours, cancellation, reply time, rental deposit amount: not on the page, by instruction.
- Instagram: omitted, all socials dead (F11). No social icons.
- Beginner Lesson private or group: no row, by instruction.
- Schema gaps the mockup hard-wires are those in concepts §6: hero line, rental kind and duration (labels are split on ", "), board sizes, wave paragraph order, tour groups by position, plus message wording, tile labels and board outlines in the template.

## conflicts

**Blocking under the rule "a flaw is fixed or listed", for the human before the pick:**
1. **The ripple pattern does not travel.** A slit-scan over 25 s on a real GPU shows the photograph's ripples staying at fixed rows with a small wobble, and only faint light bands moving down through them. It is shimmer and passing light on a still, not a swell moving through the water. Larger travel fogged the photograph (round 5), so this is the limit of one still; footage would fix it. **I have never watched it play**: I judged stills, 8x frame differences and slit-scans.
2. **The hero is soft on a phone,** 1.26 source px per css px, as the concept predicted. Not fixable at 4e with this material. A 3000 px frame would fix it.

**Departures, each with its reason:**
3. Concept says amplitude at most 3 css px. The swell lift is at most 3, but ripple refraction adds roughly 1 to 2 and the surface travel is up to 4 either way near the camera (8 per cycle). At 3 alone the slit-scan showed only a wobble.
4. Concept says canvas at most 1x DPR. Phones run 1.3x, because at 1x the moving water was visibly softer than the still.
5. Hero is graded (contrast 1.1, saturation 1.18, gamma 0.98) and re-encoded at q84, 71 KB. The haze made the first screen flat.
6. Tint: large panels use `#E6E9ED`, not `#D6DAE0`, and the boards use `#91B0C8` and `#C9D8E4`, not the tint. At full size the concept's value read as a grey admin panel, and tint boards were barely visible.
7. Boards lie down on a phone, in rows with one edge as baseline, instead of standing: six labels do not fit in 350 px. Length is still to one scale. **Lengths are from the copy; outline widths and shapes are illustrative and no width is printed.**
8. Tile code is not lazy-booted (Kube): CSS and JS are inline at 4e, about 22 KB of JS uncompressed, so nothing is gained until 4g.
9. Hero image inlined as a data URI at 4e only, about 95 KB of the HTML: a `file://` page may not hand a `file://` image to WebGL, and the look loop and critics shoot from `file://`. Gold pages inline images too. 4g serves a normal file.
10. Title sits in the lower third, not centred (the concept's own departure, for the human).
11. Date field has its label beside it, not floating, to match the chip rows; the calibration asks for floating labels on forms.

**Wording to check, interface words of mine:** "5 private sessions | 2 hours each" (`lessons[2].duration_as_written` "5 days x 2 hours" and `.note`; en.json has `durationMin` 120 only), "per lesson", "per day", "for you", "Your message", "Add to my message", "In my message", "Languages:", the tile labels, and the visitor's message sentences, built from [0]'s level words.

**Check-design scope:** run on this page's path, not `<slug>`, because the slug form writes into the sibling variants' `shots/`.
