# The Lavish Haven v2 — calm · "Prints" — designer notes (4e)

designer 0.6.1 · run 2026-10-lk-surf-01 · 2026-10-20 · concept: `sites/the-lavish-haven-v2/concepts.md` §4.1
(tasteskill direction `uneven-photographs`, seed 1314457432, dealt at 4d; not redrawn here).

## look-log

Old site for every comparison: the current live site (the earlier round's pick, `https://the-lavish-haven.os1.workers.dev`,
shot this session with `tools/shoot.mjs`) — a pool-shaped window of WebGL water on white, Jost light, a ruled room table and
four interiors; and the hotel's Booking.com page on a phone (`dossier/the-lavish-haven/funnel/booking-fold.png`).

**Round 1 (first screen).** The sheet showed two prints and a script name, but the left half was three separate things —
a small blind print floating at the top, a 400 px hole, and the name at the bottom — and the large pool print (756 px)
stopped 190 px short of the name's baseline, so nothing tied the halves together. Change: the large print's foot aligned with
the button's foot, both prints hung from one top line, the next section allowed to show below the fold. Against the live
site: equal at best — the live page has more presence (one big water shape), this one is clearer about what the hotel is.

**Round 2 (first screen).** Both prints now share one top line and the button sits on the pool print's bottom edge, so the
screen reads as one wall. Wrong now: the name at 84 px on one line is weaker than the photograph next to it (the script is a
thin hairline at that size), and the small print sits exactly over the name's left edge, so the "uneven" wall looks like a
column. Change: name set on two lines at 108 px ("The Lavish / Haven", second line indented), small print moved one column in.
Against the live site: clearer, warmer and it shows the hotel; still less striking at a glance.

**Round 3 (first screen).** The two-line script name now holds its own against the 756 px print, the blind print hangs off
the name's right shoulder, and on the phone the square overlaps the pool print's lower-left corner as the concept asks.
Inspector (tasteskill `inspect.mjs`): FAIL `headline-lines` at 768 px (name in three lines because the desktop
composition started at 768) → the phone composition now runs up to 999 px; FAIL `few-pictures` and `still-page` are this
round being the first screen only (fixed in the whole-page round); WARN `no-footage` — the hotel has no video
(dossier `videos` absent) and a found clip of somewhere else would be shown as the hotel, so none. Against the live site:
yes, better at a glance — the first thing seen is the hotel's own pool and balcony at a sharp 0.74x, a name with character
and one blue button; the live page opens on generic water that could be any pool.

**Round 4 (whole page, 1440 + 390).** Built every section: where-it-is statement + balcony print; the twelve rooms
as a real table grouped by what each Booking.com name says it looks out on (pool / pool and garden / garden / no view
named), the offer paragraphs and a button; the bedroom slideshow with dots beside "New, and it shows" and the five
Booking category scores in one " | " line; the pool section as the page's one rest (heading and featureLine with six
prints gathered round it, drifting at their own rates); "Staying longer" with Dariusz's quote set as a letter and the
four others as small letters each with a "Read on Booking.com" button; Kabalana with the Rosa headline and widget; the
practicalities as four `<details>`; closing, footer with the name at full width; the phone booking bar. What the sheet
showed wrong: the phone layout scrolled sideways (the footer wordmark at 64 px min ran 69 px past 390, so iOS-style
emulation zoomed the whole page out and the bottom bar sat off-screen) → wordmark scaled 12.4vw; the room table at 390
squeezed names into five-line columns → rows restack (name, then beds + sleeps); the practicalities left two thirds of a
screen empty → a 3:4 print of a bedroom door opening onto a balcony (`img-045`) in the empty columns; the Rosa fallback
was hidden as soon as the iframe fired `load`, which it also does when framing is refused → the fallback link now stays
under the frame. Against the live site: clearly better on the whole page — the live page has one photograph of the
hotel above the fold of 14 screens and a hairline-ruled room table; this one shows 19 of the hotel's photographs at or
under native size, and every room name sorted by its view.

**Round 5 (whole page, after the skills pass and the critique; last round).** Inspector FAILs fixed: closing statement
set at 32 px max (it ran three lines at 40 px), the Rosa time line moved under the wave height (it read as an eyebrow),
slideshow and Kabalana columns widened (empty-middle). Critique fixes: the ochre bamboo field now fills the whole left
column behind the rooms list, the pool print standing on its foot (it was a misregistered rectangle with 450 px of white
above), the table caption no longer wraps word-per-word at 390, the phone pool cluster drops its sliver print. Fonts
self-hosted (recipe) with preload and `font-display: optional` — Google Fonts with `swap` shifted the page by 0.119 on an
early scroll; it is now 0. The phone hero image gets a 640 px source (LCP 2.98 s → 2.18 s on the throttled phone).
With the old site beside it (`the-lavish-haven.os1.workers.dev` first screen; Booking.com phone fold): the live page's
first screen is a headline and a WebGL water shape that could be any pool, with the rating stack; this one is the
hotel's own pool from above, its balcony blind, its name in a copperplate script and one pool-blue button — and on the
phone, where Booking.com shows an app banner and a cookie dialog over the night pool, it shows two photographs, the name
and the button, with the phone one tap away on every screen. Previous round's pick (the live site) wins on spectacle in
its first two screens; this page wins on everything a guest needs and on photography, and it no longer depends on WebGL.

## skills (tools.md "Design skills", in its order)

- **tasteskill draw** — not re-dealt: concepts.md names the direction (`uneven-photographs`, seed 1314457432); the sheet
  was reprinted (`draw.mjs --show`) and its blueprints used: two prints (hero), statement + table pushed right (rooms),
  photographs gathered round a heading (pool), wide heading + indented questions (practicalities), columns above /
  wordmark below (footer). Dealt palette/picsum photos not used (concepts.md: colours sampled from the hotel).
- **inspect.mjs** — run in round 3 (not in rounds 1–2: it was started late, said here rather than hidden) and in rounds
  4–5. It caught: headline in 3 lines at 768 (phone composition extended to 999 px), eyebrow (Rosa time line above the
  number → moved under), closing statement too large, empty middle beside the slideshow. Left, defended: `covered-text`
  at 768/390 is the sticky header and the phone booking bar passing over headings while scrolling (both required:
  playbook §3/§5 persistent booking, custom.md); `no-footage` (the hotel has no video; a found clip would be another
  place shown as this one); `size-count` 14 (two clamp ramps sampled at one width; roles are display / title / statement
  / body / small); `side-scroll` (the slideshow, which custom.md asks for); `statement-length` on the `spot` copy
  (27 words of passed copy, 5 lines at 32 px).
- **/animate + /design-motion-principles** (before any motion; marketing page → Jakub primary, Jhey secondary, Emil for
  controls): gave the system — tokens `--ease-out cubic-bezier(.23,1,.32,1)`, `--ease-in-out (.77,0,.175,1)`,
  `--ease-drawer (.32,.72,0,1)`; press 140 ms scale .97; hover 180 ms colour only, gated `(hover:hover) and
  (pointer:fine)`; entrances 640 ms opacity + 18 px, prints and letters only, never headings (custom.md wins over
  tasteskill's heading entrances); the blind crossfade as a CSS animation (off the main thread), paused when the tab is
  hidden; the drift as a scroll-driven CSS animation, off ≤ 999 px and under reduced motion.
- **/find-animation-opportunities** (once, all three pages): accepted — `<details>` answers snapped open → height +
  opacity via `::details-content` 260 ms ease-out (the accordion exception); the Rosa frame popped in → 300 ms opacity on
  load. Rejected — hover motion on photographs (custom.md: no effects over photos), heading reveals (custom.md),
  animating the room table (data people read).
- **/impeccable typeset / layout / polish** (`detect --scope type|layout`, craft-floor read): tight leading on the
  closing statement (1.28 → 1.32); `text-wrap: balance` on headings/statements, `pretty` on body; layout scan clean.
- **/mobile-native** (phone pass): `interactive-widget=resizes-content`, `color-scheme: light`, tap highlight off on
  `html`, `touch-action: manipulation` on every control, `user-select: none` + no callout on buttons/dots/summaries only,
  sticky header padded by `env(safe-area-inset-top)`, bar by `-bottom`; hover rules gated by `pointer: fine`. Not
  verifiable without a phone: tap delay, safe areas, keyboard over the bar.
- **Playwright** (the MCP browser is not exposed to this agent, so the same states were driven with Playwright scripts):
  hover on the CTA, the pool cluster mid-drift, the booking tap-through on a 390 touch viewport.
- **/review-animations** — could not run: the skill is `disable-model-invocation` (user-only). Shahar can run
  `/review-animations` on this file.
- **/emil-design-eng** — no `transition: all`, no `ease-in`, no `scale(0)`, hover gated; nothing changed on this page.
- **/impeccable critique** (dual sub-agent: A design review, B detector + browser): A scored 23/32 (P1 empty white wall
  in the rooms section, P1 caption wrapping at 390, P3 sliver print on the phone — all fixed; P0 "fonts often fall back"
  — fixed by self-hosting). B: detector 1 finding (`buried-raster` on the crossfade's second image — false positive), no
  overflow, no contrast failures, nav "Pool" link 33 px wide on desktop (height 49; noted, not changed).

## images

All from `dossier/the-lavish-haven-v2/assets/`, licence `business-owned` (property-uploaded Booking.com photos, approved
by Shahar 2026-09-19). Made by `src/make-media.sh`; none shown above 1.2x its source pixels.
c-pool, c-pool-640 ← img-078 · c-blind-1 ← img-077 · c-blind-2 ← img-075 · c-balcony ← img-071 · c-rooms-pool ← img-073 ·
c-room-1…6 ← img-007, -024, -029, -013, -032, -047 · c-night ← img-002 · c-g-pool-high ← img-067 · c-g-pool-rail ←
img-069 · c-g-canopy ← img-066 · c-g-kitchen ← img-011 · c-g-garden ← img-079 · c-night-sq ← img-001 · c-door ← img-045.
No photograph is captioned or tied to a room name. Fonts (Pinyon Script, Work Sans, latin subsets) are fetched by the
same recipe.

## gaps

- No video (dossier has none) — pitch point. No prices (live OTA inventory): the booking hands off to Booking.com.
- No WhatsApp, email or Instagram: primary action is the engine, `tel:` second; no Instagram feed is possible.
- Rating: `copy/en.json` says 9.2; the dossier's `reviews.booking.rating` is 9.3 (re-read 2026-09-25). The page shows 9.3
  "read 25 September 2026" (ratings are dossier-seeded). Category scores date from the 2026-09-19 harvest and say so.
- Rosa headline uses the checked-in fixture (`rosa-kabalana.json`, 21 Sep 20:30), with its time printed.
- Interface words added (not facts): section label "Your dates", the table caption, the group names ("Pool view",
  "No view in the name"), the four practicalities question labels; the answers are the passed copy, unchanged.

## conflicts

- concepts.md crossfades three blinds (`img-077` → `-075` → `-068`); `-075` and `-068` are near-identical frames, so the
  crossfade is two images (077 ↔ 075). Non-blocking.
- tasteskill house style vs custom.md (heading entrances, soft radii, shadows on the phone bar): custom.md wins.
- `font-display: optional`: on a slow first visit the page may stay in the fallback faces; chosen over `swap`, which
  moved the page on an early scroll. 4g self-hosts with metric-matched fallbacks. Non-blocking.
- No blocking conflicts.

## checks (4e hand-off)

1. Look loop: 3 first-screen rounds + 2 whole-page rounds; every dist file from `src/make-media.sh` (`# media:` img/**,
   fonts/**).
2. Booking CTA = `booking.engine_url` character for character (all 19 booking/tel/map links checked); tapped on a 390
   touch viewport → request to `https://www.booking.com/hotel/lk/the-lavish-haven.html`. Agoda = `other_engines[0]`.
   `tel:+94764832988` = `contact.phone`.
3. `check-design`: ok (0 problems, 0 warnings). 4. `check-places`: 0 borrowed images, pass.
5. `audit-mockup` (last run): scroll CLS early 0, settled 0; first load 463 KB, LCP 2184 ms, CLS 0, JS 0 KB
   external, 0 third-party hosts (fonts self-hosted). Reduced motion and no-WebGL (none used) looked at: crossfade and
   drift stop, entrances become opacity only.
6. Other businesses in this run (first screens at 1440, 2026-10-20): **KA v2** opens on a green field with one upright
   garden print beside a sans headline, or a centred print with the words either side, or a mosaic of 20 small photos;
   **Layday v2** opens on bold black grotesk or giant serif "Layday" with yellow berth photos. A visitor would notice
   that Lavish calm is a white wall with two prints of a pool and a balcony and a copperplate script name — no field of
   colour, no mosaic, no bold type. Near-miss: KA calm also shows one print on a light ground; Lavish's are two at very
   different sizes with no colour field.
7. No video exists; the first screen is built on the strongest photographs; round 5 says why it beats the live site.

inspect.mjs FAILs left: `covered-text` @768/390 (defended above). `review-animations` not run (user-only skill).

# Round 2 (after 4f round 1: critic 71.7/80, visual 6, experience 6)

Reports read in full: `reports/2026-10-lk-surf-01/the-lavish-haven-v2/{critic-4f,visual-4f,experience-4f}.md`.
All shooting and inspecting from here on is over http (a local static server), not file://, so the self-hosted fonts load.

**Round 6 (whole page).** Changes, each from a report: (1) fonts: display face (Pinyon Script) back to
`font-display: swap`, Work Sans `optional` + preload, both with metric fallbacks (`size-adjust` measured against
Liberation/Arial: Work Sans 110.7 %, Pinyon 91.1 %), so a slow first visit shows the script name; scroll CLS still 0;
(2) forecast label "Mon 21 Sep" (2026-09-21 is a Monday); (3) category scores now all six, value for money 9.1 included;
(4) rating on the first screen under the button, with its date (audit `above_fold: trust`); (5) the page's big moment: a
new "After dark" section right after the intro, the night pool `img-002` at its full 1024 px with the featureLine
beside it (it had been ~220 px); (6) "Twelve kinds of room": the 1.5-screen table is now a one-screen grouped list in
two columns (pool / pool and garden / garden / no view in the name), the 4:5 balcony print is in the tan field from the
first frame (the empty 480×800 block is gone), offer text in two columns; (7) bigger prints: phone hero pool print at
full content width with the blind square overlapping its corner; laptop pool-cluster prints now ≥ 360 px (four, none in
the heading's column, which also clears the covered-text collision); intro balcony, door and closing night print enlarged;
(8) Kabalana spot copy as a 22 px lead, not a 5-line statement; (9) phones: the header "Check dates" pill is hidden
(one booking button per screen: hero button, then the bar); amenities show eight and "All 25 at the hotel".
What the sheet showed wrong: the rating's date line overlapped the blind print at 1440 (the hero words grew) → print
narrowed, words block lowered; the phone blind square's ring read as a resting shadow → made a padded ground instead.
Against the live site and round 1: the page now has the night pool as one large moment the live page and round 1 lacked,
the rooms fit one screen, and the script name shows on a first phone visit.

**Round 7 (whole page, last).** Re-shot both widths over http; inspector, check-design, audit-mockup re-run. Remaining:
`covered-text` at 768/390 (the sticky header and bar passing over headings — required persistent booking),
WARN `empty-middle`/`ragged-edges` (the uneven-prints layout by concept), `size-count`, `no-footage` (none exists).

## skills (round 2)
- inspect.mjs over http each round; it caught the hero date overlap and the ring shadow (fixed).
- /impeccable typeset: display/body font loading split (swap for display, optional + preload for body) with
  `size-adjust` fallbacks — the reports' fix, kept under the 0.01 scroll-CLS line.
- /animate: nothing new moves; the amenity toggle is instant (a list people read).
- /mobile-native: one booking button per phone screen.
- /review-animations: still user-only.

## checks (round 2)
check-design ok (0/0) · check-places pass · audit-mockup: first load 471 KB, LCP 2172 ms, scroll CLS early 0 / settled 0,
0 third-party · 16 booking/tel links = dossier; first-screen button tapped at 390 → booking.engine_url · no overflow at 390.

# Round 3 (after 4f round 2: visual 7, experience 7, critic 76.2/80) — last round

**Round 8 (whole page).** From `visual-4f-r2`, `experience-4f-r2`, `critic-4f-r2` and the coordinator's list:
the tan field beside the rooms is gone; the left column now holds two prints that run the height of the list and offer
(the 4:5 balcony `img-073` and a 4:3 balcony over the pool `img-069`), so both columns end together; a second full
1024 px photograph (`img-079`, pool and garden at noon) in "Staying longer"; the pool cluster is four prints at their own
520 px, two by two and offset, heading above (no print under ~480 px below "After dark" on laptop); text on two main left
edges (column 1 and column 7); the type scale cut to 14 / 17 / 22 / statement / display (inspector count 16 → 13, the
rest are display clamps); the phone pool photo gets a 768 w rendition and correct `sizes`, both preloaded, and the 1024
file is lighter (LCP on the throttled phone 3.03 s after the extra photographs → 2.42 s); "After dark" arrives with a slow
900 ms fade and scale from .98 (off under reduced motion); the Rosa frame has a visible keyboard focus ring.
**Round 9 (last).** Re-shot over http. Inspector FAIL left: `covered-text` @768/390 (sticky header and phone bar —
required persistent booking). WARN: `empty-middle` beside "New, and it shows" (the inspector counts the slideshow's
off-screen slides; visually the photo and text sit side by side), `lopsided` "Your dates" (closing photo on the right),
`size-count` 13, `side-scroll` (slideshow), `no-footage`.
**skills:** inspect.mjs over http; /impeccable typeset + layout (scale and left edges); /animate (the After-dark arrival).
**checks:** check-design ok · check-places pass · audit-mockup 488 KB, LCP 2416 ms, scroll CLS 0 / 0, 0 third-party ·
16 links = dossier, tap → booking.engine_url · no overflow at 390.
