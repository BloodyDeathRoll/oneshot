# KA Surf Hostel v2 — calm "Patio" — notes (station 4e, designer 0.6.1, run 2026-10-lk-surf-01)

## look-log

KA has no website (`existing_site.url: null`, no `old-site-*.png`), so "the current site" in every round is the
gold Canopy page (`agents/designer/gold/ka-surf-hostel.html`, round 3 picked) and the rejected round 2
(`sites/ka-surf-hostel-and-restaurant/mockups-rejected-02/`), both rendered beside these sheets.

- **Round 1 (first screen).** The mint field with the 384 × 512 cottage print is calm and right, but the
  h1 broke onto three lines at a 12ch measure, so the white half read as a narrow column pushed into its
  middle with a dead band on its right; on the phone the h1 was three lines too and the proof line
  wrapped. Change: a 17ch balanced measure at 56 px (two lines), shorter proof line ("| Sep 2026"),
  tighter mint field on the phone. Against Canopy: already better at a glance — KA's own cottages are
  on the first screen, Canopy had none.
- **Round 2 (first screen).** Two lines now, and the block sits on the white half's axis; the screen reads as
  a postcard standing in KA's patio paint beside a short, well-set sentence. What is wrong: the papaya
  `#CC4A1E` reads slightly brown on the cool white (tasteskill's inspector flags it as terracotta, and it is
  close to the muddy orange of house rule 4). Change: the same hue lifted to full saturation, `#D23C06`
  (white on it 4.8:1) — a clean papaya. Against Canopy: clearly better — a real photograph of the place
  and one calm button, instead of drawn leaves and a three-line headline.
- **Round 3 (first screen).** Desktop and phone hold; at 768 px the header's three links and the button
  wrapped into two lines each in the 55 % half. Change: links hidden under 1100 px (the button stays).
  `inspect.mjs`: focal-point FAIL kept on purpose — tasteskill wants an 8vw headline or a picture over a
  third of the screen; the calibration ("much smaller than a giant display word") and hard constraint 7
  (576 px source, never upscaled) forbid both. Logged under conflicts.
- **Round 4 (whole page).** Built the six split rows (each a sticky print in the mint half), the
  full-width breakfast plate, the menu sheet, display rows and the mint footer. The sheets showed: on the
  phone the reading column overflowed to 680 px (the slideshow's min-content widened the grid column:
  `min-width:0` on grid children, then `width:100%` on the centred tablet column); the amenity names were
  grey (a `:last-child` rule hit single-span rows); the Instagram mint frame repeated the thumbnails on the
  phone (hidden there); the address rows read as three-line headlines with eyebrow labels above them
  (rewritten as value first, note under it).
- **Round 5 (critique round, after `/impeccable critique`, `/emil-design-eng`, `/mobile-native`).** Fixed:
  every `<img>` with width/height attributes now `height:auto` (the Instagram thumbs had rendered as 1:3
  strips); the slideshow kept inside its column (it had run off the window edge); empty half-screens cut
  (`.read` padding 128 px, min-height 720 px, the mint stage `contain:size` so a short section no longer
  forces a full-height row); the rooms print is now the dorm and the slideshow the private rooms and
  bathrooms (no picture twice in one section); the sheet takes focus and returns it; the phone bar hides
  while the hero's own button is on screen (no two "Check dates" on the first phone screen); fonts load by
  script and are applied only while the visitor is still at the top, with size-matched Arial fallbacks
  (the early-scroll CLS was 0.057 from a late font swap, now 0).
- **Last round, against the current presence.** KA has no site; against the gold Canopy page and the
  round-3 calm (`compare.png` of 2026-10-20, both rendered at 1440 and 390): Canopy and round 3 open on a
  giant three-line headline and drawn leaves or stripes, with no photograph of KA on the first screen (r3
  calm has three small prints under the headline); Patio opens on KA's own cottages, sharp, in the paint of
  KA's own chairs, one short title and one button. Clearly better at a glance, and the calmest of the three.

## skills

| skill | what it flagged | what changed |
|---|---|---|
| `design-taste-frontend` draw (`split-stage`, as concepts.md names it) | dealt a photograph filling the half; Gambarino/General Sans; olive on bone | kept the composition (fixed half, reading column), refused the filling photograph (576 px source) and the dealt type/palette (concepts.md's mint/papaya and Albert Sans + Kalam win) |
| `inspect.mjs` (every round) | 3-line h1; terracotta accent `#CC4A1E`; off-centre header at 768; eyebrow labels on the address rows; covered text under the fixed header at 768; focal-point | h1 to a 17ch measure; papaya lifted to `#D23C06`; tablet header/footer on the content column; address rows rewritten; split breakpoint to 1000 px. focal-point kept (conflicts) |
| `/animate`, `/design-motion-principles` | weighting Jakub primary, Jhey secondary, Emil for the sheet; one curve family (`--ease-out`, `--ease-drawer`), press 140 ms, sheet 260 ms desktop / 420 ms drawer on the phone | tokens and durations as above; no heading reveals (custom.md) |
| `/find-animation-opportunities` | accepted: a once-only picture rise (desktop only) on the breakfast pair, the Kabalana pair and the Instagram thumbs; rejected: heading reveals (custom.md), parallax on the prints (576 px sources, calm), count-up on scores (data), autoplaying the room slideshow | rise added; nothing else |
| `/impeccable typeset/layout/polish` (references + `detect`) | detector: `buried-raster` on the Instagram crossfade layers (false positive, by design); polish: browser surfaces | `::selection` themed, focus ring, `text-wrap: balance/pretty` |
| `/mobile-native` | controls without `touch-action`, long-press callout on pictures, no `color-scheme` | `touch-action: manipulation` + `user-select: none` on controls, `-webkit-touch-callout: none` on pictures, `color-scheme: light`; the bar and sheet already had safe-area padding |
| `/emil-design-eng` | exit as slow as enter on the sheet | exit 160 ms (enter 260 ms) |
| `/impeccable critique` (two isolated agents) | Instagram strips (`height` attribute beat `aspect-ratio`); slideshow off the window edge; dead half-screens; print repeated in its own section; popover never took focus; dots 32 px wide | all fixed (round 5). Not changed: "rooms listed, not sold" — the dossier has no per-room text; the pictures are grouped by what they show |
| `/review-animations` | could not run: the skill is user-invocable only (`disable-model-invocation`) | — |

## images

All business-owned, from `dossier/ka-surf-hostel-and-restaurant-v2/assets/` (`license: business-owned`),
made by `../make-media.sh` (3:4 upright crops, never upscaled, WebP): img-006 (hero print), img-004, img-002,
img-005, img-021 (sticky prints), img-007, img-001, img-005, img-008 (slideshow), img-003 (square crop) and
img-013 (breakfast), img-020, img-016 (Kabalana pair), img-013/016/018–024 (Instagram, each linked to its
post; 018/019/021/022/023/024 turned upright). No stock, nothing borrowed. Not used: img-010 (restaurant
roundel, unsupported), img-011, img-014, img-015, img-017 (concepts.md §2).

## gaps

- No rates (the copy's sentence says the listings show them); no WhatsApp, no email: booking is the three
  listings + the phone, as concepts.md §3 derives (no `audit.json` from station 3b exists for KA).
- No video in the dossier (the reel `DUDRxbRD153` is only a cover, img-013): the first screen is KA's best
  photograph at native size instead.
- Copy is stale against the dossier: Booking.com shows **9.4/10 (39)** here from `reviews.booking`
  (fetched 2026-09-25), not the copy's 9.5 (38); the copy has no `capturedAt`, the page prints "read on
  25 Sep 2026" from the dossier. Copy otherwise verbatim.
- No season, no per-room descriptions or room-to-photo mapping in the dossier.

## conflicts

- **focal-point (tasteskill) vs calibration + hard constraint 7** — not blocking. Tasteskill fails a first
  screen without an 8vw headline or a picture over a third of the screen; the calibration forbids a giant
  title and the best photograph is 576 px. Kept: one 384 × 512 print and a 56 px title.
- **"zero bytes of JavaScript" (concepts.md)** — about 2 KB inline: every "Check dates" must be a real
  Hostelworld link (hard constraint 9), so a few lines turn it into the popover; plus the slideshow dots,
  the desktop-only picture rise, the phone-bar timing and the font loader. Everything works with JS off.
- **Instagram frame (concepts.md "one frame, contents change")** — the CSS crossfade runs once (27 s) and
  pauses on hover/focus instead of looping, for WCAG 2.2.2; the reading column adds the 3 × 3 grid of
  linked posts (custom.md asks for "the Instagram feed").
- **Concept's room slideshow list** — slideshow is img-007/001/005/008 and the sticky print img-004 (the
  concept had img-004 in both).
- **Fonts at 4e** load from fonts.gstatic.com by script (FontFace), so the early-scroll CLS stays 0; 4g
  self-hosts them.
- **check-places** fails on a tool gap, not on the page: `tools/check-places.mjs` has no locality entry
  for the `-v2` slugs. The page uses no borrowed photograph (0 checked). Needs a one-line entry in the tool
  (outside this station's lane).

## other businesses in this run (hand-off check 6)

Looked at the first screens of `layday-surf-ahangama-v2` and `the-lavish-haven-v2` (all six exist).
Lavish *Pick your view* is the near-miss concepts.md names (split stage): there the right half is a
photograph filling it on pale aqua; here the left half is a flat mint field with one small framed print
and the title sits in the white half. Layday calm hangs uneven prints from a rail on white with a heavy
grotesque title; KA calm is a mint/white split with a light sans title and a hand-written section face.

## checks (final)

check-design ok · check-places FAIL (tool gap above) · audit-mockup: first load 561 KB, JS 0 KB external,
LCP 2.96 s (throttled phone), CLS 0.0001, scroll CLS early 0 / settled 0, 3rd-party on load 1 (font file,
4e only) · inspect.mjs: 1 FAIL left (focal-point, conflicts) · booking: every "Check dates" is
`https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/`; the sheet holds the three listing URLs and
`tel:+94773746053`, identical to `copy/en.json` / dossier; focus in and back, Esc closes; JS off = plain
links · reduced motion: static (no rise, no crossfade, no slide).

## Round 2 (after 4f round 1: critic 65.4/80, visual 6.5, experience 6)

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

- **Round 6 (first screen, http).** The visual critic's point stood: nothing held a third of the screen. Now
  three of KA's prints stand in the mint at three sizes (cottages 360 × 480, the fruit plate 180 behind it,
  a private room 216 in front, separated by a mint ring, not a shadow), and the title is 66 px on two lines.
  `inspect.mjs` focal-point now passes. Sheet: the trio leaned on the field's left edge, the plate clipped;
  moved 30 px right.
- **Round 7 (whole page, http).** The sticky prints are one stage per run of sections whose print
  crossfades (600 ms) to the section in the middle of the screen; nothing is sliced at section edges any
  more. The phone gets its own hold-still: each section's print sits in a sticky mint band and the text
  panel (ground, rounded top) slides up over it. Order: rooms → Kabalana (playbook item 4, moved up) →
  breakfast → what is here → guests → Instagram → getting here. Rooms: 432 × 576 slideshow, the beds as
  one " | " line per group, body 18 px in ink. Amenities: three short " | " lines under their group names,
  not 19 rows in boxes. The booking sheet is now a modal `<dialog>` (focus stays inside, Esc closes, focus
  returns). `.read` min-height removed (it made empty half-screens). Against round 1 and Canopy: the first
  screen now has a moment (three prints, a big title) and the page never shows a cut print or a blank mint.

### skills, round 2

| skill | flagged | changed |
|---|---|---|
| `inspect.mjs` (http) | shadow on the front print; off-centre at 768 and 1440; covered-text at 768 | mint outline instead of shadow; tablet reading column, header and footer on one centred 680 px column; page margins 88 px. Left: covered-text (the phone bar at one scroll stop, see conflicts) and a WARN 86/130 px |
| `/animate`, `/design-motion-principles` | stage crossfade 600 ms `--ease-in-out` + 800 ms settle; Instagram frame cycles 8 times then stops (WCAG 2.2.2) | as listed |
| `/mobile-native` | the phone bar covered content at the end | body padded by the bar; the bar waits until the hero button has left |

### checks, round 2 (supersede the round-1 lines above)

check-design ok · check-places ok (0 borrowed photographs; the tool now knows the -v2 slugs) · audit-mockup:
first load 625 KB, LCP **1.90 s**, CLS 0, scroll CLS early 0 / settled 0, third-party on load **0** ·
inspect.mjs over http: 1 FAIL left, covered-text at 768 (conflicts) · booking: every "Check dates" =
Booking.com, the dialog's four links exact to the dossier, focus in and back, JS off = plain links ·
reduced motion and JS off at 390: 0 hidden headings or paragraphs, 0 broken images.

### conflicts, round 2

- **covered-text (tasteskill)** — the fixed phone booking bar (playbook §3: persistent on mobile) covers a
  heading at one scroll stop; the page is padded by the bar's height, so nothing is unreachable. Not blocking.
- **Kabalana before breakfast/amenities** — moved up at 4f's request (playbook §3 item 4); playbook item 3
  ("what's included") therefore follows the spot here.

## Round 3 (after 4f round 2: critic 75.0, visual 7, experience 7)

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

- **Round 8 (first screen + whole page, http).** The trio now sits inside the mint with even air (cottages
  300 × 400, plate 176 behind showing over half of the fruit, room 208 in front); on the phone the room
  print stays inside the gutter (the hero is one moment of pull: two prints overlapping, title, button).
  "What guests say about the staff" leaves the split: a full-width band with the long-table photograph at
  432 × 576 (sticky beside the text) and Mia's quote at 28 px, the other words in two columns below — the
  page's second moment. Reading-column padding 96/88 px (the blanks under Wolfgang and above Instagram are
  gone); the footer (name, three booking buttons, call/Instagram, address) fits one screen. The booking
  sheet offers the dorm-or-private choice with thumbnails, as interactive (experience r2). "Guests" in the nav.

### checks, round 3 (supersede earlier lines)

check-design ok · check-places ok · audit-mockup: 647 KB, LCP 1.88 s, CLS 0.0001, scroll CLS 0.0015 / 0,
third-party on load 0 · inspect.mjs (http): 1 FAIL, covered-text at 768 (phone bar, conflicts) · booking:
every "Check dates" = Booking.com, dialog with 4 exact links, focus in and back · reduced motion / JS off at
390: 0 hidden text, 0 broken images. Optional critic item (one tap fewer to the engine) not taken: the sheet
is where the visitor chooses dorm or private, which experience asked for.
