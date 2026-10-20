# Layday Surf Ahangama v2 · interactive · "One room"

Station 4e, designer 0.6.1, run `2026-10-lk-surf-01`, 2026-10-20. Concept 2 of `../../concepts.md`
(tasteskill direction *The pinned poster*, seed 915584138, sheet `.taste-skill/layday-v2-pinned-poster/`).
Idea: the photographs of the only room become portraits passing under one pinned title, "Just one dorm".
One file: `dist/index.html`; images from `src/make-media.sh` (`# media:` header).

## look-log

1. **First screen, round 1.** The pinned run works (four grounds, four portraits), but the title at
   8.5 vw used a third of the width and left a hole between it and the portrait. Changed: title to
   11.2 vw.
2. **Round 2.** Strong: big two-line title, the berth large and sharp, one sentence, one raspberry
   button. The portrait touched the header (75 px); the sentence broke "two-/minute". Anchored the
   portrait to the bottom (top ≈ 94 px), balanced the sentence.
3. **Round 3.** Hyphen made non-breaking; phone: title pinned, sentence under it, 2:3 portrait at
   78 % against the right margin, foot bar. Beside round 3 (`../../../layday-surf-ahangama/mockups/
   interactive`, "Curtain": a print behind ink lines) and the picked round-2 spec card: this first
   screen says the one thing only Layday can say, over the room itself. Clearly better.
4. **Whole page, round 1.** Rosa box empty under `file://` (the widget refuses file origins; over
   http it loads, checked by critique B); the phone contact card wrapped its buttons; "A-/frame"
   hyphen break. Fixed the card padding and the hyphen.
5. **Whole page, round 2 (inspector + skills).** Inspector: terracotta tell on the cane-mirror
   ground `#D4B299` (also on concepts.md's own "never terracotta" list) → panel 3 is now the inside
   of a berth on berth yellow `#E2B827` and panel 4 the basin on white; pin 3.7 → 2.3 screens; a
   resting shadow on the contact card removed; the directions paragraph cut to the lead size.
   Reduced motion: the sentence and button had dropped below all four stacked portraits → pinned
   under the title.
6. **Last round, against the old site and round 3.** No business website exists; against the OTA
   thumbnails and round 3 this page wins on the first screen and on the walk through the room
   (pinned run, gallery with dots, a live map at the door section, guests with prints, Rosa, a
   visit card on the room photograph). Critique A: "the only one that obviously beats round 3".
   Weakest point: the release of the pinned run repeats the sentence and button once on white.

Inspector, last run: 0 FAIL except `covered-text` at 768 (text passing under the mandated fixed
phone booking bar; playbook §3 wins). WARNs defended: no-footage (no video exists); side-scroll =
gallery scroll-snap row; empty-middle = same row; long-pin 3 screens = the concept's 2.5-screen run
plus the hero; name-only-title at 768 = the h1 is the copy's "Just one dorm", the sentence under it
says where (the copy never says "hostel").

## skills

| Skill | What it flagged / gave | What changed |
|---|---|---|
| tasteskill draw (`--show`) | pinned title over portraits, panels each on their own sampled ground | built; Source Serif 4 → Yellowtail for section titles (concept), palette from the room |
| `inspect.mjs` | terracotta ground, long pin, resting shadow, statement over 3 lines, covered text | fixed all but the foot-bar `covered-text` |
| `/animate` | gate: pin swap occasional, sheet occasional, stepper tens/day → fast and small | crossfade 350 ms + ground 400 ms `--ease-io`; sheet 280 ms in / 180 ms out; stepper 180 ms |
| `/design-motion-principles` | origin-aware panel (Emil), one Jhey moment | sheet scales from the tapped button's centre (`--ox/--oy`); listing buttons stagger 40 ms |
| `/find-animation-opportunities` | menu `<details>` popped open with no origin; phone sheet should come from the bottom bar it was opened from; "Leaving" teleports | menu 160 ms scale .96 from top-right; ≤900 sheet slides up 320 ms `--ease-drawer`, out 200 ms; Leaving fade |
| `/impeccable typeset` + detect | clean except cramped-padding on media holders (false positives) | none needed |
| `/mobile-native` | tap highlight, `touch-action`, sheet scroll chaining | baseline + `overscroll-behavior: contain` on the sheet |
| `/emil-design-eng` | exits faster than enters; no `scale(0)` | already so; reduced motion collapses all to 1 ms |
| `/impeccable critique` (A + B) | A: release repeats the hero text; Rosa empty box; dense "The place" columns; B: no overflow, no console errors, Rosa and OSM load over http | Rosa/OSM confirmed working; release kept (see conflicts) |
| `/review-animations` | not run: refuses model invocation; Shahar must run it | — |

Playwright states looked at: sheet mid-grow at 120 ms (scales from the button), open, Esc closes and
focus returns to the button; phone bottom sheet.

## images

Business-owned Booking.com photos, centre crops, never above native: img-002, 005, 018, 003 (2:3
portraits 512 × 768); img-012, 005, 011, 002, 018, 008, 017 (gallery 4:5 576); img-017, 013, 001
(guests 3:4); img-019, img-021 (wave 1024); img-012 (visit card 1024). No stock.

## gaps

As calm: no video, rates, WhatsApp/email, season, Instagram, bed count, gate photograph, `audit.json`.

## conflicts

- Ratings 9.8 (copy) vs 10/10 (dossier, read 25 September 2026): dossier shown. Not blocking.
- Taiya's "ended up here a week" sentence from the dossier beside the nights control (see calm).
- OTA dates: Booking.com verified live; Hostelworld and Agoda plain (Agoda's dossier URL redirected a
  headless browser to the city page; auditor to re-check).
- Panel 3 ground changed from the cane-mirror tan (terracotta tell) to berth yellow; concept said
  berth yellow appears only in photographs. Not blocking.
- Panel lines: panel 3 now carries the about block's "There is only the one dormitory." (verbatim
  copy) instead of "Rates change with the dates."
- The pinned run's release shows the sentence and button once more on white (critique A). Kept: it
  is the stage scrolling away; shortening further would cut a panel. Not blocking.
- Two embeds (OSM map + Rosa), both lazy with reserved boxes and plain-link fallbacks.
- No blocking conflicts.

## hand-off checks

1. Look loop: 3 first-screen + 3 whole-page rounds; recipe present; flaws fixed or listed.
2. Booking targets identical to the dossier; phone tap-through: foot bar → sheet → arrival focused →
   Booking.com carries the dates.
3. check-design: 0 problems, 0 warnings.  4. check-places: pass.
5. Reduced motion (no pin: four portraits stacked on their grounds, sentence + button under the
   title, sheet instant) and no-JS (static stack, links to `#book` card) looked at; no WebGL.
   `audit-mockup` scroll CLS early 0.0004, settled 0.
6. KA v2 "Stories" splits its h1 around a centred phone-like frame on cool white; Layday's title
   holds at left with the portrait off-centre right on grounds that change colour (plaster,
   concrete, berth yellow, white). Lavish v2 "Pick your view" holds a balcony view at right on pale
   aqua; here the words hold and the room changes.
7. No video exists; first screen = the berth photograph at native size; why it beats the current
   presence: round 6 above.

---

# Round 2 (4f round 1 → designer), 2026-10-20

Read in full: the three 4f reports (interactive: critic 72.7/80, visual 7, experience 8). Shot
and inspected over http.

## look-log, round 2

7. **The pinned run.** Three views (lit plaster → concrete → berth yellow), pinned for two
   screens (`200svh`), and the title, sentence and button fade out (260 ms) in the last quarter,
   so the release shows only the last portrait leaving: nothing repeats on white. Phone portrait
   now full width between the margins.
8. **Below the fold, each section its own layout** (visual fix 1–2): "The place" two text
   columns; "The room" a wide row of seven 4:5 room photographs edge to edge (scroll-snap, dots
   44 × 44), the offer text beside one booking card that holds "Bed in the dormitory", "Check
   dates" and the rates line; "Newly built, and kept that way" three material photographs
   edge to edge (lockers, basin, porch); Guests on the berth-yellow field with Beth's quote large
   beside the three ratings, then Jennine, Akshay and Taiya in a row; no lone prints in white
   space. Practicalities: one compact " | " list. Gallery order changed so the two near-identical
   room views no longer sit side by side.
9. **Rosa and tap targets.** The headline now reads Rosa's live per-spot JSON in one lazy request
   when the block nears the view, shown only if `generated_at` is under 24 h; otherwise (JS off,
   request failed, stale) the plain link "See today's forecast for Kabalana on Rosa". The
   21 September fixture is no longer on the page. The reserved Rosa box shows a designed card
   (script title + button) until the widget loads, then hides it. Dots, brand mark and citation
   links ≥ 44 px; fonts self-hosted (Libre Franklin variable + Yellowtail, 42 KB).

## skills, round 2

| Skill | What it flagged / gave | What changed |
|---|---|---|
| `inspect.mjs` (http) | few-pictures (lazy photos not yet loaded when it counts: first gallery photo made eager); covered text under the Rosa iframe (card now hidden once the widget loads); long-pin; covered "The room" (foot bar) | fixed, except the foot bar |
| `/animate` | the release fade: occasional, purpose = preventing a repeated screen; opacity only, 260 ms ease-out | built |
| `/mobile-native` | phone card cramped (stacked); buttons wrapping (padding 18 px on phones); arrows hidden under 600 px | fixed |
| `/impeccable detect` | cramped padding on the stage, map and guests field (full-bleed holders, false positives) | — |

## conflicts, round 2

- `covered-text` at 390 ("The room" under the fixed booking bar at one scroll stop): kept, as
  calm. `long-pin` WARN: the inspector counts the hero plus the two-screen run; the title is gone
  before the release.
- `name-only-title` WARN: the h1 is the copy's "Just one dorm"; the sentence under it says where.
- Rosa: live headline at 4e goes beyond tools.md's fixture rule, done because 4f asked that dated
  numbers never show as current; same endpoint and 24 h rule as 4g.
- Earlier conflicts on facts and OTA dates unchanged.

## hand-off checks, round 2

2. Booking: foot bar → bottom sheet, arrival focused, Booking.com carries the dates; Esc closes,
   focus returns (laptop: dialog grows from the button). 3. check-design: 0/0. 4. check-places: pass.
5. `audit-mockup`: scroll CLS early 0.0065 (a 0.0055 foot-bar shift when the face lands), settled 0;
   fonts 42 KB; first load 361 KB; LCP 1.23 s; third-party on load: none; tap targets < 44: 0.
   Reduced motion: three portraits stacked on their grounds, sentence + button under the title.
6–7. As round 1.
