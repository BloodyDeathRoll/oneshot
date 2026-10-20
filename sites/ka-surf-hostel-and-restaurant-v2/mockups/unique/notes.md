# KA Surf Hostel v2 — unique "The roll" — notes (station 4e, designer 0.6.1, run 2026-10-lk-surf-01)

## look-log

KA has no website (`existing_site.url: null`, no `old-site-*.png`), so "the current site" in every round is the
gold Canopy page (`agents/designer/gold/ka-surf-hostel.html`, round 3 picked) and the rejected round 2
(`sites/ka-surf-hostel-and-restaurant/mockups-rejected-02/`), both rendered beside these sheets.

- **Round 1 (first screen).** The roll works on sight — garden, room, plate, bathroom, dorm, boards, all
  sharp at 230 px — but the h1 broke onto three lines in the cell, and columns 1, 2 and 6 ran out of
  frames 40–60 px above the bottom edge, leaving ground showing under them (the sheet looked unfinished
  rather than cut by the viewport). Change: a 17ch balanced measure (two lines), a fourth frame in every
  outer column so all six are cut by the bottom edge. Against Canopy: far stronger at a glance — a whole
  screen of KA's own place against a screen of drawn leaves.
- **Round 2 (first screen).** All six columns now run off both edges; the cell reads as one frame of the
  roll that happens to be text. Wrong: papaya `#CC4A1E` reads brownish beside the photographs' cool
  whites (inspector: terracotta); at 768 px the six-column sheet squeezed the h1 to five lines. Change:
  papaya at full saturation `#D23C06`; under 1000 px the phone composition (cell first, two columns of
  frames).
- **Round 3 (first screen).** Tablet h1 was 30 px in a 560 px cell — too timid; now 44 px. Desktop
  unchanged: it is the strongest of the three first screens and clearly beats Canopy and round 2 at a
  glance (a whole screen of KA's own place, sharp, with the name and the button in its middle).
  focal-point FAIL kept on purpose (a grid of many small pictures is the concept; calibration + hard
  constraint 7), see conflicts.
- **Round 4 (whole page).** Built the shutter (clip-path, 700 ms, 70 ms per column), the idle swaps, the
  shared-element viewer, the slim header, rooms (432 × 576 dot slideshow + two-ended rows), staff (side
  facts + wide paragraph), breakfast pair, amenities in one-size columns, the cyan beach with the Rosa
  headline and widget, the Instagram strip, getting here with the lazy map, the footer of tiles. The
  sheets and the states showed: the cell's own "Check dates" also opened the viewer (a script error; the
  viewer is bound to the roll's frames only); "What guests say about the staff" ran to three lines at
  80 px in the side column (now a full-width heading over both columns); the spot sentence ran four
  lines; `check-design` failed the cyan field as a dark ground (L 0.34): lifted to `#2BB6D8` (L 0.39,
  ink 8.5:1), still the boards' cyan.
- **Round 5 (critique round).** Every `<img>` `height:auto` (the Instagram strip and the phone breakfast
  pair had rendered as strips); section titles down to 52–66 px (they outranked the 40 px h1, close to the
  "giant word"); the Instagram strip snaps inside the margin; the roll shows `cursor: zoom-in`; the idle
  swaps are a short spell (eight changes, about 28 s) that stops for good at the first touch, key or wheel
  (WCAG 2.2.2), and the swap layers are `aria-hidden`; the roll's frames are out of the tab order (the
  sections hold the same content, so a keyboard visitor reaches "Check dates" first); dots 44 px; the Rosa
  credit a quiet button; the phone bar waits until the cell's button scrolls away; fonts load by script,
  applied only while the visitor is at the top, with size-matched Arial fallbacks (an early scroll had
  jumped 0.05 on a late Switzer/Nanum swap; now 0).
- **Last round, against the current presence.** Against Canopy (drawn leaves, no photograph) and round-3
  unique: the first screen is twenty frames of KA's own garden, rooms, plate, bathrooms and boards, every
  one sharp at native size or smaller, with the name, title and one button in their middle. The boldest
  of the three and the clearest win over every earlier KA round.

## skills

| skill | what it flagged | what changed |
|---|---|---|
| `design-taste-frontend` draw (`contact-sheet`, dealt by id as concepts.md records) | text band then sheet, one size of text, Schibsted Grotesk, sheet and biro | the concept's version: the sheet fills the first screen, one cell holds the text; Switzer + Nanum Pen Script, papaya and cyan from concepts.md; no caption strips |
| `inspect.mjs` (every round) | 3-line h1 in the cell; columns running out above the bottom edge; terracotta; 5-line h1 at 768; 3-line h2; 4-line statement; focal-point | 17ch cell measure, a fourth frame per column, papaya `#D23C06`, phone composition below 1000 px, full-width staff heading, spot at 26 px / 44ch. focal-point kept (conflicts); covered-text at 390/768 is the phone bar over the footer tile |
| `/animate`, `/design-motion-principles` | Jhey for the roll, Jakub for the viewer, Emil for the sheet; shutter `clip-path` 700 ms `--ease-out` + 70 ms stagger (once per visit: delight tier); idle crossfade 900 ms `--ease-in-out`; viewer FLIP 420 ms; slide-out 400 ms `--ease-drawer` | as listed; the cell never animates |
| `/find-animation-opportunities` | accepted: viewer exit (it had none: 200 ms fade/scale), picture rise (desktop) on the breakfast pair, beach three, Instagram strip; rejected: heading reveals, a looping roll | added |
| `/impeccable typeset/layout/polish` + `detect` | `cramped-padding` on the full-bleed cyan wrapper and the dialog (false positives) | none needed |
| `/mobile-native` | as calm | as calm |
| `/emil-design-eng` | slide-out exit as slow as enter | exit 260 ms, enter 400 ms |
| `/impeccable critique` | see round 5; ranked unique first of the three | fixed as listed |
| `/review-animations` | not runnable by an agent (user-invocable only) | — |

## images

Business-owned only, made by `../make-media.sh`: the roll and its swap pool use img-001–009, 012, 013, 016,
018–023 at 360 × 480 (drawn about 230 CSS px wide: never upscaled); rooms img-004/001/007/005/008 at
576 × 768 (432 CSS); img-002, img-003, img-013, img-020, img-018, img-023; Instagram strip img-013/016/018–024,
each linked to its post. No stock.

## gaps

As calm and interactive (no rates, listings + phone only, no video, Booking.com 9.4 (39) from the dossier
over the copy's 9.5 (38), no season, Rosa headline from the 21 Sep fixture with its date printed).

## conflicts

- **Cyan** — concepts.md `#13ACD1` fails `check-design` (luminance 0.34 < 0.35, "dark ground behind
  text"); built `#2BB6D8`, a lighter tone of the same board cyan. Hard constraint wins.
- **Idle swaps** — concepts.md has them run while the roll is idle; built as eight swaps that stop at the
  first interaction (WCAG 2.2.2 needs a way to stop moving content, and a pause button would add a control
  to a first screen custom.md keeps to title + button).
- **focal-point (tasteskill)** — the concept *is* many small frames; not blocking.
- **Fonts** — Switzer is on Fontshare, not Google Fonts (base.md allows Google Fonts at 4e): the woff2
  files load from cdn.fontshare.com by script (FontFace); 4g self-hosts.
- **Rosa iframe sandbox** console warning — Rosa's own embed code, kept.
- **check-places** tool gap, as calm.

## other businesses in this run (hand-off check 6)

Layday *Name in plaster* opens on a band of three large upright prints over a yellow field holding
"Layday" at 19vw; Lavish *Do not disturb* is a hang tag beside one night-pool print. KA's roll is twenty
small frames edge to edge with no display word at all: nothing in the run looks like it.

## checks (final)

check-design ok · check-places FAIL (tool gap) · audit-mockup: first load 833 KB, LCP 1.58 s, CLS 0.0009,
scroll CLS early 0 / settled 0, 3rd-party on load 2 (font files, 4e only) · inspect.mjs: 2 FAILs left, both defended:
focal-point (conflicts) and covered-text at 768/390 (the persistent phone booking bar over the footer tile) · booking: every "Check dates" = the Hostelworld URL; the slide-out holds the three listing
URLs and `tel:+94773746053` exactly; focus in and back, Esc closes · JS off: the static roll, every frame a
link to its section · reduced motion: no shutter, no swaps, the viewer opens without the growth.

## Round 2 (after 4f round 1: critic 67.7/80, visual 7, experience 8)

### Primary booking channel (asked by 4f)

`dossier.booking.engine_url` is **Booking.com**; Hostelworld and Agoda are `booking.other_engines`. Round 1
followed concepts.md (Hostelworld, the 9.8 listing). Hard constraint 9 says the booking path recorded in the
dossier, so from round 2 every "Check dates" (the plain link that works with JS off, the bar, the header)
goes to `https://www.booking.com/hotel/lk/ka-surf-hostel.html`, and Booking.com is the papaya first button
in the sheet; Hostelworld and Agoda follow, then the phone. The hero proof line keeps the Hostelworld 9.8
(the strongest rating; a rating, not a booking path). No `audit.json` from station 3b exists to check it against.

### Shared round-2 fixes (all three)

- Fonts self-hosted in `dist/fonts/` (made by `../make-media.sh`, `# media:` header), preloaded,
  `font-display: optional`, Arial fallbacks size-adjusted to each face: 0 third-party requests on first load.
- First-screen print on a phone is the new 456 px `-m` file (64 KB) via `srcset`/`sizes` and an image
  preload; a 12 × 16 `-q` blur placeholder paints behind it, so the first screen is never blank.
- Forecast weekday corrected: 21 Sep 2026 is a **Mon**day.
- Tap targets: wordmark, phone links and the story pause are 44 px; body padded by the phone bar height
  (`padding-bottom: 76px`, `scroll-padding-bottom`).
- Every flow checked over http (`python3 -m http.server`), not file://.

### look-log, round 2

- **Round 6 (first screen, http).** The roll is now **seven** columns of 196 px frames (360 px sources),
  so the text cell spans the middle three: 604 × 452, wordmark 28 px, h1 60 px on two lines, tagline 19 px.
  It holds its own against the photographs. The weak shorts-only frame (`img-024`) left the roll and the
  Instagram set. The idle swaps never fired at 1440 (pool = what was on screen): a picture may now return,
  just never into its own column or a neighbour; measured 3 swaps in 12 s. The shutter runs only on a
  laptop; on a phone the frames paint at once (no blank lower half).
- **Round 7 (whole page, http).** The roll is carried down the page: a band of five frames opens the
  staff, amenities, beach and getting-here sections. Instagram is a 4 × 2 grid of ~330 px tiles (was a
  strip of 70–160 px). The beach field is a sea-glass tone sampled from the water in `img-018`
  (`#96AEB1`, L 0.40) instead of pool cyan. The staff facts column is sticky beside the long quotes (no
  more empty left half). Embeds load (same fix as interactive, verified: rosa.surf + Rosa JSON + maps after
  scroll, 0 on load). Section padding 120 px; the white gap and the empty cyan strip are gone.

### skills, round 2

| skill | flagged | changed |
|---|---|---|
| `inspect.mjs` (http) | covered-text at 390 (bar); empty-middle WARN at 768 | bar padding; covered-text left at one stop (conflicts). Left: focal-point |
| `/animate`, `/design-motion-principles` | swaps never ran | column-aware pool; still eight swaps max and stop at first input (WCAG 2.2.2) |

### checks, round 2 (supersede the round-1 lines above)

check-design ok (sea-glass passes the light-ground rule) · check-places ok · audit-mockup: first load 773 KB,
LCP **1.43 s**, CLS 0, scroll CLS 0 / 0, third-party on load **0** · embeds load after scroll · inspect.mjs
over http: 2 FAILs left, focal-point and covered-text at 390 (both in conflicts) · booking: every "Check
dates" = Booking.com, slide-out links exact, focus in and back · reduced motion and JS off at 390: 0 hidden
text, 0 broken images.

### conflicts, round 2

- **Platform marks in the sheet** (concepts.md) — not drawn: the OTAs' logos are trademarks; the buttons
  name the platform in the page's type.
- **Beach field** — concepts.md's board cyan → sea-glass `#96AEB1` from the photographs' water (visual critic).
- **focal-point / covered-text (tasteskill)** — as calm and interactive. Not blocking.

## Round 3 (after 4f round 2: critic 72.2, visual 7, experience 7)

### Shared round-3 fixes (all three)

- **Fonts on the slow phone** (experience r2): `font-display: optional` meant the brand faces never showed
  on 1.6 Mbps. Now the faces are subset (latin, `make-media.sh` with fonttools; Caveat pinned to its one
  weight: 75 → 47 KB), preloaded first in the head ahead of every photograph, `font-display: swap`, with Arial
  fallbacks size-adjusted **per weight** to each face's measured width. Measured on the throttled phone:
  `document.fonts.ready` with every face `loaded`; scroll CLS early ≤ 0.0015, settled 0.
- **Embed failure** (critic r2): the Rosa frame is now requested only after a `no-cors` probe of rosa.surf
  succeeds, is `visibility:hidden` + `pointer-events:none` until its own load, and only then fades in. With
  every Rosa/Google host blocked, the fallback link is the top element in the box (checked with
  `elementFromPoint`); with the network open, the widget shows (opacity 1). The live Google Maps embed is
  replaced by a static OpenStreetMap image (made by `make-media.sh`, credited on the image) that links to
  Google Maps: one embed per page, lighter, nothing blank while loading.

### look-log, round 3

- **Round 8 (first screen + whole page, http).** Every picture appears once on the first screen (the roll is
  at most 800 px tall; the seventh column uses `img-024` and second 3:4 views of the two night landscapes,
  `img-009`/`img-012` left halves, made by the recipe); the swap pool grew to 21 and still never repeats a
  picture in its own or a neighbouring column. **Phone bug fixed:** the staff facts are sticky only from
  1001 px, so at 390 they no longer print over the paragraph and quotes. Phone h1 36 px, wordmark 22 px;
  the phone roll paints blur placeholders behind its frames. The strips vary: three large night frames over
  the staff, a pair of bathrooms over the amenities, an offset strip of five on the beach; getting here keeps
  only its map. Strips are keyboard-reachable groups (`tabindex="0"`, `role="group"`, label; critic axe).
  "The beach" moved up after the rooms. Footer: Call and Instagram merged into one tile, two full rows.

### checks, round 3 (supersede earlier lines)

check-design ok · check-places ok · audit-mockup: 820 KB, LCP 1.14 s, CLS 0, scroll CLS 0.0004 / 0,
third-party on load 0 · embeds: open → widget visible; blocked → fallback link on top · inspect.mjs (http):
2 FAILs, focal-point and covered-text at 768/390 (the persistent phone bar over "What is here" at one
stop; page padded by the bar) — conflicts · booking: every "Check dates" = Booking.com, slide-out links
exact, focus in and back · reduced motion / JS off at 390: 0 hidden text, 0 broken images.
