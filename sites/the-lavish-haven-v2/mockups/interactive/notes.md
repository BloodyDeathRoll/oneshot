# The Lavish Haven v2 — interactive · "Pick your view" — designer notes (4e)

designer 0.6.1 · run 2026-10-lk-surf-01 · 2026-10-20 · concept: `sites/the-lavish-haven-v2/concepts.md` §4.2
(tasteskill direction `split-stage`, seed 1603694499, dealt at 4d; not redrawn here).

## look-log

Old site for every comparison: the live site (`https://the-lavish-haven.os1.workers.dev`, shot this session) and the
Booking.com phone page (`dossier/the-lavish-haven/funnel/booking-fold.png`).

**Round 1 (first screen).** The split works at once — aqua reading half, a balcony photograph filling the right 45 % at
1.17x — but the crop of `img-073` was mostly a dark teak chair and table with only a sliver of pool, so the "view" the page
is named after was not in the picture; the left column centred its block and left 270 px of empty aqua under it; on the
phone the view came after all the text, the opposite of the concept. Change: the crop moved right to take in the pool through
the rail; the "Pick your view" section and its chips now start at the bottom of the first screen, so the live thing is visible
before any scroll; on the phone the view goes first. Against the live site: not yet — sharper idea, but the chair crop is dull.

**Round 2 (first screen).** The pool now shows through the rail and the chips sit at the fold. Two defects: on the phone the
view was an empty aqua block (the sticky figure had `align-self:start` in a flex column, so it collapsed to 0 px wide), and
the header sat under the photograph. On desktop the six chips wrapped, leaving "All twelve" alone on a second line. Change:
header, reading column and view are now three grid items (header and text left, view spanning both rows), reordered on the
phone as header → view → text; chips tightened. Against the live site: closer; the balcony photograph is a real place where
the live page shows abstract water.

**Round 3 (first screen).** Phone shows header, the balcony over the pool, then the name; desktop has the name, tagline, one
button and the rating in the reading half, and "Pick your view" with its chips at the fold. Still wrong: the chips wrapped
again at 1440 (→ labels shortened to "Pool & garden" and "Sleeps 4+", interface words, not copy), and on the phone the 62svh
view pushed the button below the fold (→ 52svh view, name at 52 px). Against the live site: yes — at a glance this is a hotel
balcony over a lit-blue pool with the rating and the button beside it, where the live page is a water texture and a headline;
and the chooser promises something the Booking.com page cannot do (show only the rooms with that view).

**Round 4 (whole page, 1440 + 390).** Built the chooser's room list (12 rows, filtered by the words in Booking's names;
counts verified: pool 5, garden 6, both 3, own kitchen 3, sleeps 4+ 5), the offer, the "Choose dates first" slide-down
panel (a GET form to Booking.com with `checkin`, `checkout`, `group_adults`; Agoda gets the same dates as `checkIn`,
`los`, `adults`), "Among cafés", the one-frame bedroom slideshow beside "New, and it shows", the pool section (the fixed
half turns to the night pool as it arrives), "Staying longer" with the letters, Kabalana with the Rosa headline and
widget, practicalities as run-in paragraphs, then the view releases into a paper-white closing band and a footer with
the name at full width. Every section sets the fixed half (IntersectionObserver at mid-screen): pool → all-garden →
garden → night → pool & garden → noon pool. What the sheet showed wrong: the Rosa headline (52 px) wrapped "0.7– / 1.1 m"
beside the 420 px widget → headline above widget; on the phone the chip labels wrapped inside the chips → `nowrap`; in
the dates panel the white Agoda button vanished on the white form card → aqua fill. Against the live site: yes — the
live page shows water and a list; this one shows the room you would sit in and changes it with your choice.

**Round 5 (whole page, after the skills pass and the critique; last round).** The critique's P0: at 1920 px the fixed
half drew the 553 px source at 864 px (1.56x), so the concept's 1.2x cap had not been built → the image is now capped at
663 × 921 and centred, with the aqua round it on wide screens. Also from the critique: hero tightened so the chips and the
first room rows show on arrival; h1 76 → 64 px. From the inspector: the pressed chip had a resting shadow → it is now a
dark-ink chip with white text (no shadow); the rating's date line read as an eyebrow over "Pick your view" at 768 → set
inline and more air; entrances added to statements, the frame, letters and the forecast (the page measured 0 moving
elements; custom.md keeps headings still). From `audit-mockup`: an early scroll moved the page by 0.48 on the phone —
the fixed view figure came after the reading column in the HTML and was painted late at the top (CSS `order`) → the
figure now comes first in the DOM; then fonts self-hosted + preloaded with `optional` → early and settled scroll CLS 0.
With the old site beside it: the live first screen is a headline beside a water shape; this one is a balcony over the
lit-blue pool, the name, one button and both ratings — and below it the chooser that sorts twelve room names Booking.com
lists flat and unexplained. Clearly better at a glance and in use.

## skills (tools.md "Design skills", in its order)

- **tasteskill draw** — not re-dealt: concepts.md names `split-stage` (seed 1603694499); sheet reprinted and used (split
  stage, one frame contents change, one long letter, answers as reading text). Jost replaced at 4d (gold face).
- **inspect.mjs** — run in round 3 (first screen, not rounds 1–2), round 4 and round 5. Fixed: resting shadow on the
  chip, eyebrow ×2, closing statement too large, Dariusz quote too large on the phone, mixed-font Rosa headline, still
  page. Left: `off-centre` @1440 (the split stage: the view fills the right 45 % to the edge by design, the reading
  column has its own margins); WARN `no-footage`, `size-count` 14, `side-scroll` (phone chips row), `statement-length`.
- **/animate + /design-motion-principles** — the view crossfade is WAAPI (600 ms, ease-in-out, incoming 1.02 → 1),
  decoded before it starts so it never flashes; the room list is FLIP (WAAPI, 280 ms ease-out on staying rows, 220 ms
  fade + 6 px for arriving rows; leaving rows go instantly — a filter tapped many times should not wait); the dates
  panel is a 320 ms drawer curve on `grid-template-rows` (the accordion exception) with the form fading in 200 ms; chips
  and buttons press .97 in 140 ms. Reduced motion: swaps are instant, no FLIP, no scale.
- **/find-animation-opportunities** — accepted: Rosa frame fades in on load (300 ms). Rejected: a fade on the live count
  text (people read it; instant is right), heading reveals, motion on photos.
- **/impeccable typeset / layout / polish** — statements 1.28 → 1.32 leading, `text-wrap` balance/pretty, labels 13 →
  14 px; the remaining `tight-leading` hits are display headings at 1.04 (intentional). Layout scan: `cramped-padding`
  on the closing band → bottom padding added.
- **/mobile-native** — as calm (viewport `interactive-widget`, tap highlight, `touch-action`, `user-select` on controls,
  16 px+ inputs so iOS does not zoom, `color-scheme`, hover gated); chips row `overscroll-behavior-x: contain`.
- **Playwright** (MCP browser not exposed to this agent; scripts instead): chip "Garden" on a 390 touch viewport (6 of 12
  rows, count text, inline view), the panel open with dates, the crossfade mid-way at 1440, the submit tap-through.
- **/review-animations** — not run: user-only skill (`disable-model-invocation`).
- **/emil-design-eng** — nothing flagged on this page beyond what the motion skills had set.
- **/impeccable critique** (dual sub-agent) — A: 26/32, the strongest of the three ("the only one where the idea does a
  job for the visitor"); its P0 (1.2x cap) and P1 (hero band) fixed; P2 "keep the chosen view sticky on the phone" not
  done (a sticky photo would cover the list it filters; see conflicts). B: detector 11 warnings, all judged false
  positives (crossfade layers at opacity 0, display-heading leading, a padded band); no overflow; contrast passes.

## images

All `business-owned` Booking.com property photos from `dossier/the-lavish-haven-v2/assets/`, made by
`src/make-media.sh` (img/** and fonts/**), never above 1.2x their pixels. i-view-pool ← img-073 · i-view-garden ←
img-066 · i-view-both ← img-069 · i-view-kitchen ← img-011 · i-view-family ← img-029 · i-view-all ← img-079 ·
i-view-night ← img-002 · i-view-kabalana ← img-078 · i-room-1…6 ← img-007, -024, -013, -047, -055, -032. Each view photo
illustrates a kind of view, never a named room (no caption; the list never names the photo).

## gaps

Same as calm: no video, no prices, no WhatsApp/email/Instagram; rating 9.3 from the dossier where copy says 9.2; Rosa
from the fixture. Interface words added: chip labels (from the words in Booking's room names), the count line, "Choose
dates first", the panel's note ("Booking.com and Agoda open with these dates filled in…" — tested, below), "Your dates",
the practicalities run-in labels.

## conflicts

- Section order: concepts.md puts "Among cafés" before the chooser; the chooser comes first so the page's live thing is
  on the first screen (tasteskill step 4). Non-blocking.
- Critique P2 (sticky view while the phone list scrolls) not built: a sticky photo over a list it filters is the
  `covered-text` failure. Non-blocking.
- `font-display: optional` — as calm. No blocking conflicts.

## checks (4e hand-off)

1. Look loop: 3 first-screen rounds + 2 whole-page rounds; all dist media from `src/make-media.sh`.
2. Booking: every booking link = `booking.engine_url` / `other_engines[0]` / `tel:+94764832988` (20 checked). First-screen
   CTA tapped at 390 → Booking.com. Dates panel submit → `…the-lavish-haven.html?checkin=2026-11-12&checkout=2026-11-15&
   group_adults=2&no_rooms=1&group_children=0`; opened in headless Chrome, Booking.com shows "12 Nov – 15 Nov · 2 adults
   … Reserve for 3 nights". Agoda link → `?checkIn=2026-11-12&los=3&adults=2&rooms=1`; Agoda shows "Nov 12 – Nov 15,
   2 guests". The hand-off is tested, not assumed.
3. `check-design` ok. 4. `check-places` pass (0 borrowed images).
5. `audit-mockup` (last run): scroll CLS early 0 / settled 0; first load 310 KB, LCP 1524 ms, 0 third-party hosts.
   Reduced motion: instant swaps, opacity-only entrances.
6. Other businesses: KA v2's calm also splits a colour field and a photograph — but KA's is a narrow green field holding a
   small print, text on white to its right; Lavish's is an aqua reading half beside a full-height photograph that changes
   with a chooser. Layday v2 is yellow berths and heavy type. A visitor would notice the changing balcony view and the
   room chooser; neither other business has a choice of views to make.
7. No video exists; first screen on the strongest photograph (`img-073` at 1.17x); round 5 says why it beats the live site.

inspect.mjs FAIL left: `off-centre` @1440 (split stage, defended).

# Round 2 (after 4f round 1: critic 72.2/80, visual 7, experience 7)

Reports read in full (critic, visual, experience). Shot and inspected over http.

**Round 6 (whole page).** (1) Fonts: Bodoni Moda `swap`, Hanken `optional` + preload, with size-adjusted fallbacks
(114.7 % / 100.9 %); (2) "Mon 21 Sep"; all six category scores; (3) hero view: `img-073` (ashtray, dark chair) replaced by
`img-069` — the balcony with the pool across a third of the frame — and the fixed half is now capped at **1.0×** native
(553 × 768), aqua round it, so it is sharp at 1440; (4) every section has its own photograph in the fixed half, never the
same twice in a row: hero balcony → pool (chooser opens on Pool) → sunlit balcony (intro) → bedroom (New, and it shows) →
night pool → bamboo blind (Staying longer) → noon pool (Kabalana) → balcony door (Practicalities); new crops
i-view-hero/-pool/-intro/-bed/-stay/-prac, `both` re-cut from img-072 so no frame repeats; (5) intro and Kabalana
paragraphs in Hanken 19–23 px, Bodoni for titles only; (6) phone: the chooser's photo sits above the chips and the
filtered rows start right under them, chips wrap (no clipped row), the list opens on Pool (5 rows) so a tap visibly
changes it; (7) footer name sized to the column (no clip at 390); (8) Rosa frame gets a visible focus ring
(`:focus-within`); (9) phone header pill hidden; amenities eight + "All 25".
What the sheet showed wrong: the inline phone view was swapped on load and caused a 0.017 load shift → the init no
longer swaps images. Against the live site: a clean, sharp balcony-over-pool photograph now leads; the stage changes
with every section.

**Round 7 (last).** Inspector FAILs left: `off-centre` @1440 (the split stage, by concept) and `covered-text` @768/390
(sticky bar). WARN `still-page`, `size-count`, `no-footage`.

## skills (round 2)
inspect.mjs over http; /impeccable typeset (font split + metric fallbacks, Bodoni titles only); /mobile-native (chips
wrap, one booking button per screen); /animate: view crossfade unchanged, no animation on load.

## checks (round 2)
check-design ok · check-places pass · audit-mockup: first load 458 KB, LCP 2320 ms, scroll CLS 0 / 0, 0 third-party ·
17 links = dossier; tap → booking.engine_url; dates hand-off unchanged (verified round 1) · no overflow at 390.

# Round 3 (after 4f round 2: visual 7, experience 7, critic 77.0/80) — last round

**Round 8 (whole page).** Hero view now `img-079` (pool and garden from an upper floor — no table, no ashtray, no chairs;
pool and garden fill the frame); "All twelve" moved to `img-078` so nothing repeats; the fixed half fills its column
edge to edge again (1.17× at 1440 × 900, capped at 1.2×; only wider screens show aqua); Bodoni only at 40 px and up
(statements, the lead quote and subtitles in Hanken); on the phone a photograph breaks the lists every couple of screens
(night pool before "Pool, restaurant, spa", the blind before "Staying longer", the door before "Practicalities");
amenities eight + "All 25" on desktop too; hero file lighter (122 → 94 KB, LCP not raised: 2.36 s); the 0.017 load shift
was the Bodoni name wrapping to two lines in the fallback then one → `nowrap` at a fitting size, load CLS now 0.0004.
**Round 9 (last).** The new phone photographs overflowed by 20 px (negative margins) → fixed. Inspector FAILs left:
`off-centre` @1440 (split stage), `covered-text` @390 (phone bar).
**checks:** check-design ok · check-places pass · audit-mockup 461 KB, LCP 2356 ms, CLS 0.0004, scroll CLS 0 / 0, 0
third-party · 17 links = dossier, tap → booking.engine_url.
