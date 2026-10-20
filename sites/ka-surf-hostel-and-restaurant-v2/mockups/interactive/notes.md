# KA Surf Hostel v2 — interactive "Stories" — notes (station 4e, designer 0.6.1, run 2026-10-lk-surf-01)

## look-log

KA has no website (`existing_site.url: null`, no `old-site-*.png`), so "the current site" in every round is the
gold Canopy page (`agents/designer/gold/ka-surf-hostel.html`, round 3 picked) and the rejected round 2
(`sites/ka-surf-hostel-and-restaurant/mockups-rejected-02/`), both rendered beside these sheets.

- **Round 1 (first screen).** Exactly the concept's "fails if": the 330 px frame read as a small phone
  picture floating in a wide white screen, the two halves of the h1 (44 px) were far from it and sat
  70 px below the frame's centre because the tagline block was in the same grid row. Change: the h1
  halves to 62 px, the frame to 360 × 480, the halves pinned to the reel's row so they meet the
  frame's centre line, the tagline/button/proof in their own row under it. Against Canopy: the place
  is on the first screen, which Canopy never had, but the screen was not yet composed.
- **Round 2 (first screen).** Composed now: the halves sit on the frame's centre line. What was wrong:
  "from Kabalana Beach" wrapped onto two lines at 62 px in its third of the screen, which broke the
  sentence's symmetry; the inspector also could not find the h1 (`display: contents` gave it no box).
  Change: 52 px, `nowrap`, the h1 a real subgrid row across all three columns; the phone layout now
  starts at 1000 px so a tablet never gets the split. Against Canopy: better — the place is the centre
  of the screen.
- **Round 3 (first screen).** Holds at 1440, 768 and 390: the screen reads as a story being played between
  the two halves of where it is. The inspector's late-title came from the reel lying over the middle of
  the h1's subgrid box; the h1 now sits above it (`pointer-events: none`, so taps still reach the frame).
  focal-point FAIL kept on purpose (calibration + hard constraint 7), see conflicts.
- **Round 4 (whole page).** Built the story script (5 stories, linear progress, 300 ms crossfade, tap
  halves, swipe, chapters whose circle grows into the frame), the pinned rooms on the runner-blue field,
  the quotes drag rail, breakfast on the field, amenities with three line icons, the beach with the Rosa
  headline and widget, the Instagram grid, getting here with the lazy map, the blue footer. The sheets
  showed: phone overflow from the quote rail (grid children `min-width:0`); the Instagram grid capped at
  1040 px left a dead right third (full width, full-size files); `inspect.mjs`: resting shadows on the
  quote cards and the floating button (removed: a tone step is enough), "Evenings" 15 px from the phone's
  edge, the forecast stack lopsided at 768.
- **Round 5 (critique round, after `/impeccable critique`, `/emil-design-eng`, `/mobile-native`).** The
  split h1 read as two unrelated labels at 1440 ("Five minutes" 500 px from the frame): the halves now hug
  the frame's edges, so the sentence reads through it (concepts.md put them on the page margins; under
  conflicts). Instagram images `height:auto` (they had rendered as strips); the fixed "Check dates" sat on
  the Follow button (moved under the grid); a pause/play control for the story (WCAG 2.2.2), and the live
  region announces only steps the visitor makes; the Rosa credit is a quiet button, not an underlined link;
  the forecast figure 56 px; dots 44 px; the phone bar hides while the hero's button is on screen and the
  header button is hidden on the phone (it had shown three "Check dates" at once).
- **Last round, against the current presence.** Against Canopy and round-3 interactive (stripes over the
  photographs, a 9.8 set as big as the headline): Stories opens on KA's garden playing as a story between
  the two halves of where it is, with one button and the score in small. Clearly better at a glance; the
  first screen is the most alive of the three, the page below it the most conventional.

## skills

| skill | what it flagged | what changed |
|---|---|---|
| `design-taste-frontend` draw (`pinned-poster`, as concepts.md names it) | sentence split by a frame, reel slivers; Unbounded/Onest, navy and pink | composition kept (frame 360 × 480, slivers, halves on the frame's centre line); type and palette from concepts.md (Public Sans + Gochi Hand, runner blue) |
| `inspect.mjs` (every round) | h1 invisible to it (`display: contents`); h1 wrapping at 768; late title (reel over the h1 box); resting shadows; edge text; lopsided forecast at 768 | h1 a real subgrid row above the reel (`pointer-events:none`), phone layout from 1000 px, shadows removed, chapters padded, widget centred. focal-point kept (conflicts); covered-text at 768/390 is the persistent phone bar (playbook §3) |
| `/animate`, `/design-motion-principles` | Jakub primary, Jhey for the story, Emil for the sheet; linear only on progress; crossfade 300 ms `--ease-in-out`; continuity 350 ms `--ease-out`; sheet 250 ms, drawer 420 ms | as listed; no heading reveals |
| `/find-animation-opportunities` | accepted: bed list crossfade when switching dorm/private in the sheet (220 ms), picture rise (desktop) on room prints, breakfast, Instagram grid, beach rail; rejected: heading reveals, parallax, count-up scores | added |
| `/impeccable typeset/layout/polish` + `detect` | `flat-type-hierarchy` (static read of the subgrid h1, false positive), `cramped-padding` on the full-bleed field wrapper and the dialog (false positives), `buried-raster` on the crossfade layer (by design) | none needed; browser surfaces themed |
| `/mobile-native` | `touch-action`, callout, `color-scheme` | as calm; story frame keeps `touch-action: pan-y` |
| `/emil-design-eng` | sheet exit as slow as enter | exit 180 ms, enter 250 ms; origin top right (the header button) |
| `/impeccable critique` | see round 5 | fixed as listed; "rooms list + small photo" partly answered (one dot slideshow per room type) — no per-room text exists |
| `/review-animations` | not runnable by an agent (user-invocable only) | — |

## images

Business-owned only, made by `../make-media.sh`: story pool img-006/001/004/005/003/007/008/013/002/020/018/
021/022/016/009/012; rooms img-004, img-001, img-007, img-005, img-008; img-002 (staff); img-003 + img-013
(breakfast); beach rail img-020/018/021/022/019/023; Instagram grid img-020/016/013/021/018/022/019/023, each
linked to its post. Beach frames are never captioned Kabalana. No stock.

## gaps

As calm: no rates, no WhatsApp/email (listings + phone), no video (reel cover only), Booking.com shown
as the dossier's 9.4/10 (39) not the copy's 9.5 (38), no season, no per-room text. The Rosa headline is
the checked-in fixture (`rosa-kabalana.json`, Sun 21 Sep 2026 20:30) inlined at 4e as base.md says; the
date is printed, so it reads as a past reading; 4g fetches it live.

## conflicts

- **Split h1 position** — concepts.md: halves flush to the page margins; built: halves against the frame's
  edges. The margin version read as two labels with a picture between them (critique P1); this reads as one
  sentence. Fallback, if Shahar prefers the blueprint: two CSS lines (`justify-self` back to start/end).
- **focal-point (tasteskill) vs calibration + hard constraint 7** — not blocking; as calm.
- **Rosa iframe sandbox** — the console warns that `allow-scripts allow-same-origin` lets it escape the
  sandbox; that attribute set is Rosa's own embed code (tools.md), kept exactly.
- **Fonts** load from Google Fonts with `display=swap`; the early-scroll CLS measured 0, so no loader was
  needed here. 4g self-hosts.
- **check-places** tool gap, as calm.

## other businesses in this run (hand-off check 6)

Layday *One room* is the near-miss concepts.md names: a big "Just one dorm" title above-left of a 2:3
portrait on yellow plaster, changing by scroll with the ground; here a cool-white screen, a small h1
split around a 3:4 story frame with progress segments and reel slivers, changed by tap/autoplay, ground
never changes. Lavish *Pick your view* is a split stage on pale aqua with a filling balcony photograph;
nothing here fills half the screen.

## checks (final)

check-design ok · check-places FAIL (tool gap) · audit-mockup: first load 686 KB, LCP 3.42 s (throttled
phone; the 130 KB hero WebP is the LCP — over the 2.5 s target, a 4g item: smaller first story frame /
AVIF), CLS 0.0017, scroll CLS early 0 / settled 0, 3rd-party on load 2 (Google Fonts, 4e only) ·
inspect.mjs: 2 FAILs left, both defended: focal-point (conflicts) and covered-text at 768/390 (the persistent phone booking bar, playbook §3) · booking: all "Check dates" = the Hostelworld URL; the dialog holds
the three listing URLs and `tel:+94773746053` exactly; focus into the dialog and back, Esc closes; JS off =
plain links · reduced motion: no autoplay, no crossfade, no continuity scale, taps still step.

## Round 2 (after 4f round 1: critic 60.8/80, visual 6, experience 7)

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

- **Round 6 (first screen, http).** The frame read as a small phone mock on blank lavender. Now: the
  frame is 432 × 576 (native 576 px source), the ground is a pale denim tint sampled from the sunlit bed
  runner (`#DBE9F6`, `img-004`), both halves of the h1 at 62 px sit exactly 36 px from the frame's edges,
  "from Kabalana Beach" breaks over two lines so it never runs off the screen, and the tagline sits under it.
  Gochi Hand replaced by **Caveat** 600 (calmer hand, both critics' typography note). The phone drops the
  slivers (they read as loading bars); the frame paints a blur placeholder before its photo.
- **Round 7 (whole page, http).** The Rosa widget and the map now load: the frames were `hidden` +
  `loading="lazy"`, which Chromium never fetches; now they are visible (opacity 0) in their reserved boxes,
  the observer sets `src` near the viewport and they fade in on load. Verified: 0 third-party requests on
  load; after scrolling, requests to rosa.surf, the Rosa JSON host and maps.google.com, both frames shown
  (420 × 500, 761 × 570). The story pauses when it leaves the screen and stops autoplay after the visitor's
  first tap or swipe (play resumes it). Section padding 112 px (the empty screens are gone).

### skills, round 2

| skill | flagged | changed |
|---|---|---|
| `inspect.mjs` (http) | 3-line h1 at 768/390 (desktop max-width leaked into the phone); covered-text | phone width restored; covered-text cleared by the bar padding. Left: focal-point (conflicts) |
| `/animate` | story autoplay off-screen wasted work | IntersectionObserver pauses it; first manual step hands control to the visitor |

### checks, round 2 (supersede the round-1 lines above)

check-design ok · check-places ok · audit-mockup: first load 801 KB, LCP **1.79 s**, CLS 0, scroll CLS 0 / 0,
third-party on load **0** · embeds load after scroll (verified above) · inspect.mjs over http: 1 FAIL left,
focal-point · booking: every "Check dates" = Booking.com, the dialog's links exact, focus in and back ·
reduced motion and JS off at 390: 0 hidden headings or paragraphs, 0 broken images.

### conflicts, round 2

- **focal-point (tasteskill)** — the frame is 432 × 576, the most a 576 px photograph can honestly hold;
  the calibration rules out a giant title. Not blocking.
- **Caveat** replaces concepts.md's Gochi Hand (visual critic: "childish").

## Round 3 (after 4f round 2: critic 73.8, visual 7, experience 8 — pass)

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

- **Round 8 (first screen + whole page, http).** Headline balanced: "Five minutes from" | "Kabalana Beach",
  one line each, 56 px, same baseline, 28 px from the frame; the tagline moved under the frame with the
  button. The reel slivers are gone on desktop and phone (they read as loading bars). "The beach" now
  follows the rooms (playbook order; critic), with no dead space before it. Breakfast plate at 432 × 576 with
  the reel cover at 216 beside it (visual: one more photo moment). The map box is the static OSM map. The
  story, chapters, sheet choice and motion are unchanged (experience passed them).

### checks, round 3 (supersede earlier lines)

check-design ok · check-places ok · audit-mockup: 769 KB, LCP 1.69 s, CLS 0, scroll CLS 0.0003 / 0,
third-party on load 0 · embeds: open → widget visible; blocked → fallback link on top · inspect.mjs (http):
1 FAIL, focal-point (conflicts) · booking: every "Check dates" = Booking.com, dialog links exact, focus in
and back · reduced motion / JS off at 390: 0 hidden text, 0 broken images.
