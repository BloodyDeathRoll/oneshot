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

---

# Build after the pick (Shahar picked B, 2026-09-27; BRIEF Amendments)

Lead accent **#6A2FE0** (saturated pure purple): 6.78:1 on white and white on it; tints for series
and states #8859E6 / #A682EC / #C3ACF3 / #E1D5F9 / #F3EEFD; secondary text on the accent card
#EDE6FB (5.59:1). Blue #1F4BFF survives only as the link colour (preview / proposal / file links,
5.99:1 on white). Green / red unchanged, deltas and status only. Ground stays #F5F7FB (a
purple-tinted #F5F6FB was tried in round 8 and dropped: #6B7280 on it measured 4.48:1).

`build.mjs` now also copies each built site's `shots.first` sheet, byte for byte, to
`dist/img/<slug>.png` (1.0–1.8 MB each, 1952 px wide; no resizer is installed in the repo) — the
page lazy-loads them on the Sites view only. Nothing is embedded as base64 except the font.

## Round 6 — recolour + critic's top 5 + Sites / Agents / Decisions first build (`shots/round-6`)

Critic fixes for B (dashboard/critique-mockups.md): filter counts no longer `opacity:.7` (now
`#4B5563`, 7.0:1 on the ground); KPI cards recomposed to Shopeers' anatomy (label · numeral 40/300
with the sparkline beside it · one delta line) and no min-height; empty cards are the hollow 0 plus
one grey line ("fills on packaged → pitched", transition and earliest date in `title`) and, on
Pitched, the "3 ready to send →" action; the Researched constant-35 sparkline is gone (delta pill
alone); the real per-day series `gates_open` moved into the accent card as a white sparkline;
tooltips instant (no transition); station bars: focus selects the current segment's own tooltip,
←/→/Home/End walk the nine segments, a polite live region reads each one (one tab stop per row).

Look, against the references:
- Overview: funnel now begins at y ≈ 620 (first screen at 1440×900) but the KPI cards are still
  ~236 px tall — the four-row Needs-you card sets the grid row.
- Sites (Shopeers card + 23andMe hairline rows): the proposal URL wraps onto its own line, "Layday
  Surf Ahang…" truncates against its pill; otherwise the 44 px score, PASS/FAIL verdict, score line
  (R1–R3 filled, V1–V3 hollow, dashed pass line at 80) and link rows read as intended.
- Agents (Logip three-stat row, Mondly highlighted column + dashed mean, NexaFlow stacked tint
  bar): the override list's `white-space:nowrap` span widened the page to 4066 px at 1440; changelog
  lines showed raw backticks; column labels "K / L" could not tell Layday from Lavish.
- Decisions (Logip feed rhythm on a rail): the filter pills wrapped under a two-line summary.

## Round 7 — all five (`shots/round-7`)

Changed: `.ovl li span{min-width:0}` (overflow gone at 1440); backticks stripped; labels "KA / Lay /
Lav"; Needs-you rows 56 px and the proposals gate folded into a footer line with its own Open, so
the card is ~490 px and the KPI cards ~220; site names may wrap and the link text is the host
without `.os1.workers.dev`; decisions summary on one line. Remaining: Agents overflows only at
1024 (glance chart measured its width while hidden and fell back to 1096 px); the numeral in
"Live sites" hangs at the bottom of its row while the sparkline sits high; Layday's wrapped name
pushes its score and chart ~24 px lower than the other two cards.

## Round 8 — final, all five (`shots/round-8`)

Changed: glance-chart width from the viewport when compact; "no gate open to …" moved to the
sub-line's `title` (card ~440 px, KPI cards ~200 px, funnel header + four bars on the first
screen); `kpi-row` centred; the state pill moved under the site name so all three cards align;
`gate` filter maps to the `delivered` group so "3 ready to send →" lands on exactly the three rows;
a `hashchange` listener so `#sites/<slug>`, `#decisions/proposals` etc. work after load as well as
on load; ground back to #F5F7FB. Evidence in `shots/round-8/ix-*.png`: funnel hover, sparkline focus
("21 Sep · 0" with ring), gauge focus, one station tooltip per hovered segment, bar focus + arrow
keys, run-01 overview, "ready to send" landing, reduced motion.

## Final measurements (`measure.mjs`, scratch)

- scrollWidth = innerWidth on all five views at 1440 (1440/1440) and 1024 (1024/1024).
- Console errors 0 on every view at both widths; requests: 1 (the file) on Overview, Pipeline,
  Agents, Decisions; 4 on Sites (the file + the 3 site PNGs from `dist/img/`); 0 beyond those.
- Size: 352.0 KB total, data 246.9 KB, **105.1 KB before data**.
- Charts: Overview 4 (2 sparklines, gauge, funnel), Pipeline 35 station bars, Sites 3 score
  lines, Agents 6 (fails chart + 5 rounds-per-pass columns), Decisions 0 (a timeline, no chart).
  Every chart has a `<title>`, visible text labels, at least one focusable datum and a tooltip
  shown on `:hover` and `:focus`; 0 charts fail any of those checks.
- Keyboard walk at 1440, Tab from the sidebar through each view: Overview 39 stops, Pipeline 45,
  Sites 25, Agents 96, Decisions 45 — every stop shows a ring (2 px accent outline, the pill
  wrapper's `:focus-within` ring, or the datum's `.hit` stroke). Station bar: focus → "8 Deliver",
  ArrowLeft → "7 Critique" tooltip at opacity 1, live region "KA Surf Hostel: 7 Critique, reached
  22 Sep".
- Reduced motion: at 120 ms every numeral is final (3, 0, 0, 0, 35, 3, 86, 91.5, 91.5), 0 running
  animations, 0 undrawn elements.
- Contrast (computed): ink on ground 17.35, on card 18.72; #4B5563 on card 7.56, on ground 7.00;
  #6B7280 on card 4.83, on ground 4.51; accent on white 6.78; white on accent 6.78; #EDE6FB on
  accent 5.59; accent on #F3EEFD 5.96; blue link on white 5.99; green on white 5.08, on #EDF7F0
  4.63; red on white 6.16, on #FCEBED 5.36; tooltip text 18.72, tooltip secondary #C3ACF3 on ink
  9.38. The hollow "0" stroke (#C3ACF3, 2.0:1) is a shape; the card's `aria-label` carries the value.
- Text under 13 px: the 1024 rail labels and badge (11 px, concepts §B); nothing else.
- Tabular figures verified (equal widths for 1111 / 0000); Manrope reported loaded.

## Deviations from the coordinator's brief / concepts, and why

- KPI numerals 40 px (concepts said 44) so the cards could drop to ~200 px; the critic's "near
  180" is not reached because the Needs-you card (three gate rows + the proposals footer) still sets
  the row height at 1440.
- Agents: the eight agents with no pass/fail state in the ledger (aiseo, copywriter,
  creative-director, deployer, humanizer, orchestrator, seo, writer) get compact cards (version pill,
  ledger-line count, last changelog line) without a bar chart — there is nothing to chart.
- Sites screenshots are the contact sheets on disk (magenta sheet ground with 3×3 tiles), cropped
  16:10 from the top; KA has no `final_vs_picked` sheet on disk and the card says so.
- Decisions: 46 lines is the whole set; notes longer than 220 characters clamp to three lines with
  a "Show the full reason" toggle so the timeline stays scannable.

## Open / not blocking

- The station-bar segments are reachable by arrow keys from the bar (one tab stop per row), not by
  Tab per segment — the critic's own recommendation for Instrument, applied here.
- `tools/shoot.mjs` still has no width or hash flag; the 1024 and the four non-Overview sheets per
  round come from the scratch shooter (same Chromium flags, 0.9 viewport steps, 700 ms settle).

## Round 9 — after the final critic pass (PASS 86/100; `shots/round-9`)

Data: rebuilt from `data.json` generated 18:41 UTC (327 ledger lines; the critic card now shows
Overrides 0, the copyeditor 4; proposals carry `status` — 8 files, "6 without a merge record · 1
decided", `001-control-layer-gates.md` tagged **approved** in green).

Changed, against the critic's five and the coordinator's list:
1. Sites thumbnails: `build.mjs` renders each site's first tile (`desktop-00.png` beside
   `shots.first`; the sheet only if the tile is missing) through Playwright at 672×420 (2× the
   336×210 slot, cover, top) as JPEG q82 → 31 + 22 + 33 = **87 KB** for the three (was 4.04 MB of
   contact sheets). The card now shows one first screen, not nine tiles on a magenta grid.
2. Sites nav button lost focus after Enter because `go()` sets `location.hash = 'sites'` and the
   cards grid had `id="sites"` — the fragment navigation moved focus. Grid renamed `sites-grid`;
   Enter on every nav button now keeps focus on the button. The view heading (`h1`, tabindex −1)
   receives focus only when a hash change or deep link switches the view with nothing else to focus.
3. Column charts highlight the max column only when it is unique (scout's 35 equal columns: no
   tag); the score chart's "pass" label sits left, above the dashed line, clear of the dots.
4. Accent budget: Decisions' 26 "Show the full reason" toggles and the proposal file links are
   ink-2 with an underline; on Sites only the Preview link is blue, Proposal / sheets / report are
   ink-2 underlined. Purple on Decisions is now the 17 gate dots and tags only.
5. Each rounds-per-pass chart is one tab stop (`.bar`) with ←/→/Home/End walking the columns, the
   same live region as the station bars: Agents 87 → **13** stops.

Measured (final build): scrollWidth = innerWidth on all five views at 1440 and 1024; console
errors 0 everywhere; requests 1 on Overview / Pipeline / Agents / Decisions, 4 on Sites (file + 3
JPEGs), 0 beyond those; 355.7 KB total, **106.5 KB before data**, `dist/img` 87 KB; keyboard walk
39 / 45 / 29 / 13 / 47 stops, all ringed; Enter on each nav button → focus stays on the button (all
five); column chart focus + ArrowRight → "KA · pass on 22 Sep · 3 rounds" with the live region;
station bar unchanged; reduced motion final at 120 ms, 0 animations. Contrast table unchanged
(lowest text pair 4.51:1). The `final-1440-*.png` files in this folder are the critic's, not mine.
