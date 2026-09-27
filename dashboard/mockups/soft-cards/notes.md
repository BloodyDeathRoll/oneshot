# soft-cards — look-log (direction B, BRIEF §7)

Designer, 2026-09-27. Overview + Pipeline of run `2026-09-ahangama-02`, every number from
`dashboard/data.json` (generated 13:13 UTC). References open beside every round: Logip
(`15-38-48`), Shopeers (`15-38-04`), NexaFlow (`15-41-49`), 23andMe table (`15-40-32`).

Build: `node dashboard/mockups/soft-cards/build.mjs` → `dist/index.html` (327 KB total, 80 KB
before data, font 24 KB woff2 / 32 KB base64). Font: Manrope variable (200–800, latin subset, OFL
1.1) from npm `@fontsource-variable/manrope` 5.3.0, kept in `src/fonts/` with its LICENSE.
Weights used: 300 (numerals 44/64), 400 body, 500/600 labels, 700 counts and titles. `tnum` on.

Shots: `tools/shoot.mjs` has no width flag (it shoots 1440 and 390), so each round has the
official 1440 sheets from it (`desktop-*.png`, `mobile-*.png` as a side effect) plus 1024 sheets
and the Pipeline sheets (`w1024-*.png`, `w1440-pipeline-*.png`, `w1024-pipeline-*.png`) from a
scratch copy of the tool with a `--width` and `--hash` flag, and `ix-*.png` hover / focus / reduced
motion / run-switch evidence from a scratch Playwright script. Nothing under `tools/` was changed.

## Round 1 — Overview, first build (`shots/round-1`)

Worse than the references, measured on the 1440 capture:

- Top-bar run select truncates ("ahangama-02 · 35 businesses · cur"): option text longer than the
  pill; Shopeers' pills carry a date range only.
- KPI cards: five of six repeat "First run to reach this stage" and three are 4-line grey
  paragraphs (13 px) where Shopeers has one 10 px "vs 14,653 last period" line. Text-heavy.
- Researched sparkline: a flat 35 drawn at the top of its 36 px box with the area fill under it
  reads as a solid tint block, not a line.
- Funnel: 20 px bars at 52 px pitch fill 364 px of a 600 px card; ~200 px dead space under
  "client" (the concept's sketch says 40 high / 56 pitch). Zero counts set in `#AEBDFF` on white =
  1.8:1, a text-contrast fail.
- Recent activity: first line "creative-director · Dash…" truncates against a 90 px timestamp;
  the note (the meat, Logip shows it as a bubble) is one ellipsised line.
- Needs-you card: the "+3 vs ahangama-01" delta wraps mid-phrase; the proposals row title
  truncates ("6 proposals without a merge reco…").
- 1024: the rail badge sits on the bell icon.
- Two console errors (`sizeTips` on a `.tip` circle without a rect) fixed before the sheets were
  kept; the round-1 sheets are the first clean render.

Changed for round 2: option text "ahangama-02 · current"; delta line "no earlier run to compare"
once per card (full note on `title`), none under the gauge; empty sentence shortened to "Ledger
line packaged → pitched. <earliest>"; sparkline domain = 1.35 × max so a flat line sits at 74 %;
funnel bars 32 high, 60 pitch, radius 10, labels capitalised, 15 px; zero counts in `#6B7280`;
proper minus sign; feed at 6 items with agent + time on line 1, business + transition on line 2,
note clamped to 2 lines; needs-you delta on its own 13 px line; proposals row "6 proposals to
review"; footer sentence derived from `gate_states` minus the open kinds; badge moved to the
button corner.

## Round 2 — Overview (`shots/round-2`)

Better: needs-you is the first thing the eye lands on; the feed is legible; funnel bars carry
weight. Still worse than the references:

- Funnel card: ~250 px empty under the seventh bar because the feed card (6 × ~105 px) sets the
  row height. NexaFlow fills its donut card with a four-item legend under the chart.
- Page title 26 px vs Logip's ~32 px greeting; the top bar reads lighter than the cards.
- No evidence yet that hover / focus values appear (BRIEF §5).

Changed for round 3: "where the rest left the run" under the funnel — a rule, one sentence
("3 of 35 built (9 %) · all 3 waiting on you to pitch") and 44 px legend rows with tint dots and
right-aligned bold counts from `runs[].groups` (dropped 9 · not approved 12 · not shortlisted 11),
the 23andMe row anatomy; title 28 px; a scratch script that photographs a funnel hover, a
keyboard-focused sparkline point, the gauge focus, and reduced motion.

## Round 3 — Overview (`shots/round-3`)

Funnel and feed cards now end on the same line (both ≈ 760 px). Evidence: dark tooltip on the
funnel bar ("shortlisted · 24 / 69 % of researched (35)"), light bordered tooltip + accent focus
ring on the sparkline point ("26 Sep · 3"), dark per-site list on the gauge. Worse than the
references:

- Gauge tooltip sits on the arc and covers the numeral; Logip's tooltip floats above the line.
- The sparkline focus capture was taken mid-fade (script timing), so the tip looked washed out.

Changed for round 4: gauge tip anchored above the arc (`cy − r − 16`); script waits 400 ms after
the last Tab. Then Pipeline built (it was in the file from round 1, first looked at now).

## Round 4 — Overview + Pipeline (`shots/round-4`)

Pipeline at 1440 against the 23andMe table and the R. AI Ops row: 72 px rows, hairlines, bold
tabular day counts, status pill with a dot, accent fill only on the three live rows (out rows use
`#AEBDFF`). Worse than the references:

- The label under each bar ("8 Deliver") repeated the Next-step column instead of adding the
  station date.
- 32 out rows said "none · out of the run" where the ledger's last note (`why`) says what actually
  stopped them ("dropped by Shahar: no usable photos…", "score <= presence_threshold 2").
- 1024: the table overflowed its card (the "In state" column clipped), filter pills wrapped under
  a broken summary line, "Owner" column too wide for 904 px of content.
- Hovering one station segment lit all nine tooltips (the bar group and the segments shared the
  `.datum` hover rule) and each tooltip was 24 px wide: `sizeTips` had measured text while the
  Pipeline view was `display:none`.
- Funnel for run `ahangama-01` printed "−0"; the "0 ready to send →" button appeared for a run
  with nothing to send.
- Computed contrast: `#D6DEFF` secondary text on the accent card 4.49:1 and green delta text on
  `#E6F4EA` 4.47:1 — both under AA by a hair.

Changed for round 5: under-label "8 Deliver · since 25 Sep" / "2 Shortlist · last there 19 Sep"
from `station_dates`; out rows show `why` ellipsised with the full note on `title`; at 1024 the
Owner column hides and a small owner chip sits under the next step, bar 200 px, header stacks;
tooltips use the child combinator (`.datum:hover > .tip`), the bar group is `.bar` with its own
current-station tip on keyboard focus only, and `sizeTips` re-runs for a view's SVGs when it is
shown; "±0"; button only when `needs_you > 0`; secondary text on accent `#E4E9FF` (4.96:1), green
pill background `#EDF7F0` (4.63:1).

## Round 5 — final (`shots/round-5`)

Both views at 1440 and 1024, interaction evidence re-captured: one tooltip per hovered segment
("7 Critique · reached 22 Sep"), bar focus tip ("8 Deliver · packaged / since 25 Sep / next: send
the pitch · you"), sparkline focus tip legible, run switch to `ahangama-01` shows `kpis_by_run`
(0 live, 4 researched, hollow critic "0", sparkline note "per-day series exist for the current run
only"), the "3 ready to send →" link lands on Pipeline filtered to the three gate rows, reduced
motion renders final values at 300 ms. Owner chip gap at 1024 fixed last (10 px).

## Measurements (final build, `measure.mjs` in scratch)

- scrollWidth = innerWidth at 1440 and 1024, Overview and Pipeline (1440/1440, 1024/1024).
- Console errors 0; requests beyond the file 0 (one `file://` request total) in all four loads.
- File 327.2 KB; data 246.9 KB; **80.3 KB before data**.
- Charts: Overview 4 SVG charts (2 sparklines, gauge, funnel), 26 focusable data; Pipeline 35
  station bars, each focusable with an `aria-label`; 0 charts without a focusable datum, 0 without
  text labels.
- Tabular figures: "1111" and "0000" measure equal widths in Manrope (tnum active); Manrope
  reported loaded by `document.fonts`.
- Contrast: ink `#0B1220` on ground 17.5:1, on card 18.7:1; `#4B5563` on card 7.6:1; `#6B7280` on
  card 4.83:1, on ground 4.51:1; accent `#1F4BFF` on white 5.99:1; white on accent 5.99:1;
  `#E4E9FF` on accent 4.96:1; accent on `#EEF1FF` 5.32:1; green `#1A7F37` on white 5.08:1, on
  `#EDF7F0` 4.63:1; red `#C0182B` on white 6.16:1, on `#FCEBED` 5.36:1. The hollow "0" stroke
  `#AEBDFF` is 1.8:1 by design (a shape, not text; the card's `aria-label` carries the value).
- Text under 13 px: the 1024 rail labels and badge (11 px, as concepts §B specifies) and the
  11 px initial inside the 20 px owner chip. Nothing else.
- Motion: numbers count up once (600 ms ease-out), funnel bars / station fills scale in once,
  sparkline and gauge strokes draw once (700 ms); all skipped under `prefers-reduced-motion`
  (`ix-reduced-motion.png`); nothing loops; hover states are instant.

## Deviations from concepts.md §B, and why

- Sixth KPI card is **Researched (35, +31 vs ahangama-01)** instead of the sketch's "open gates":
  open gates is already the accent card, and Researched is the only KPI with a real previous-run
  delta, so the delta pill anatomy from Shopeers appears at least once.
- Needs-you card lists a **fourth row**, "6 proposals to review", because `gates[]` carries it
  (BRIEF §1a names prompt diffs as a gate). The 64 px number stays `kpis.needs_you` = 3 businesses.
- Funnel bars are 32 px (the section's chart spec says 20, its layout sketch says 40); zero stages
  are a 56 px dashed outline stub so the row is not empty.
- Sparkline is 170 × 36 rather than 140 × 36 to fit the end value inside the SVG.
- Feed shows 6 items with a two-line note (concept: 8 items at 56 px) — the note is the content.
- Sites / Agents / Decisions exist in the sidebar as one-sentence placeholder views ("built after
  the pick") so the gate links from needs-you land somewhere honest.

## Conflicts / open

- `tools/shoot.mjs` cannot shoot 1024 or a `#pipeline` hash; the extra sheets come from a scratch
  copy (see top). If the critic wants them from the official tool, it needs a `--widths` flag.
- `gates[3]` (proposals) has `since: null`, so its row shows "no merge record in the ledger" and no
  age; `data.mjs` could take the newest proposal file's mtime.
- Dropped rows keep `station: 2` (their last state is `shortlisted`) although `station_dates`
  shows some reached station 3; the bar follows `station`, the per-segment tooltip shows the dates.
