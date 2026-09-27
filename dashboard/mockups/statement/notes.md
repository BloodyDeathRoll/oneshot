# Statement — look-log (direction C, run dashboard-01)

References opened beside every round: Nodus `ref/…15-42-53.png`, FinGuard `…15-43-09.png`, Mondly
`…15-36-41.png` (sizes below are read off screenshots that are 793–1149 px wide; ×1.25–1.4 for 1440).
Sheets: `shots/round-N/desktop-*.png` (1440), `tablet-*.png` (1024, scratch shooter — `tools/shoot.mjs`
has no width flag and captures 1440 + 390 only; 390 sheets are kept but not designed for).

## Round 1 — Overview, first build (`shots/round-1`)

What is concretely worse than the references:

- Accent block (FinGuard): the sub-line "3 pitches waiting since 25 Sep" is an inline span, so it prints
  as "yet.3 pitches" glued to the sentence and then wraps. FinGuard's block carries one clean sentence.
- Funnel: the current column "built" (3 of 35 → 15 px tall) has its value set in white because the
  `.cur` rule colours every value white, inside or outside the bar. The one number the leader points
  at is invisible. FinGuard prints "67%" inside the highlighted bar; ours has no room, so the value
  must sit above it in ink.
- Funnel at 1024: the black leader label "3 built, none pitched" is drawn at `groupW + 24`, which is
  wider than the viewport, so it lands on top of the "client" column. FinGuard's leader ends in
  clear space to the right.
- Funnel: 72 px of dead white between the "Funnel" heading and the tallest column (tag headroom
  reserved for hover tips that clamp to 0 anyway). Nodus puts its big chart 24 px under the number.
- Rail: the foot prints "ahangama-02" in a 72 px rail, which wraps to three lines ("ahangama- / 02 /
  data 27 Sep"). Nodus/Mondly keep nothing in a rail that cannot fit on one line.
- KPI "researched" foot line reads "business mode · The Lavish Haven · test" — three tokens of
  run.yaml, none of them a sentence.
- Delta notes print the full run id "vs 2026-09-ahangama-01" three times on one screen; the run
  pills already shorten it to "ahangama-01".

What I changed for round 2: `.block .sub` is a block line; value fill is white only when inside
(`.val.in`); the leader becomes an elbow that goes up to a tag placed above the dashed zero outlines
whenever the seven columns fill the width; funnel headroom 44 → 30 px (height 280 → 256); rail foot
shows only "data · 27 Sep"; researched foot "around The Lavish Haven · test run"; run ids shortened
in delta notes.

## Round 2 — Overview (`shots/round-2`)

Fixed from round 1 and visible on the sheet: the block reads "Three sites are built and live. Nothing
has been sent yet." with the sub-line under it; "3" now prints in ink above the 15 px built column;
the 1024 leader climbs to a tag above the dashed outlines; rail foot is "data · 27 Sep".

Still worse than the references:

- Funnel at 1440 (FinGuard): with room to the right, the leader stays at the built column's height,
  which is 25 px above the baseline — lower than the 40 px dashed zero outlines — so the dashed line
  runs straight through "pitched", "replied" and "client" and through their "0"s. FinGuard's leader
  crosses nothing.
- Accent block (FinGuard): the sentence is 26 px; FinGuard's is ~26 px in a 793 px-wide screenshot,
  ~36 px at 1440. Ours is the quiet element on a page whose only other loud thing is the numeral.
- Statement band: 48 px above the numeral plus the numeral's own 12 px internal leading leaves
  ~60 px of white between the top rule and the top of the "3"; the caption sits 14 px below its
  baseline. Nodus keeps "April 2025" tight under "1,395".
- Gate pills are 34 px with 13 px text for both the name and the gate; the name should lead.

Changed for round 3: the leader always rises to 22 px above the zero outlines (elbow), and the tag
sits at that height right of the columns when it fits, above them when not; block sentence 30 px /
1.15, block 220 high; band top padding 40, caption 10 px under the numeral; gate pills 36 px with a
14 px name and a 13 px grey gate.

## Round 3 — Overview (`shots/round-3`)

Visible: the leader now climbs from the built column to 22 px above the dashed outlines and runs to
"3 built, none pitched" without crossing anything at 1440 or 1024; the block sentence is 30 px;
the numeral sits 40 px under the top rule with its caption 10 px below it.

Still worse than FinGuard: at 30 px in a 376 px inner width "Three sites are built and live.
Nothing has been sent yet." breaks into three lines with an orphan "yet.". FinGuard's block breaks
its sentence on the phrase. Changed for round 4: each sentence is its own line ("Three sites are
live." / "Nothing has been sent yet."), 28 px. Nothing else on the Overview reads worse than the
references at this size, so the Pipeline view is built next and round 4 shoots both views.

## Round 4 — Overview + Pipeline (`shots/round-4`, `shots/round-4/pipeline`)

Overview: the block now reads "Three sites are live. / Nothing has been sent yet." on two lines at
28 px; nothing else changed on the sheet. Pipeline, first build, beside "R." AI Ops (`…15-46-57`)
and Nodus's table:

- 1440: the Days value has 0 px right padding and runs into the note ("2Station 6 (managed…"). "R."
  keeps ≥ 24 px between every numeric column and the next.
- The top bar h1 says "Pipeline" and the section h2 says "Pipeline" 60 px under it.
- Out rows say the same thing three times: the state pill "shortlisted, not approved", the next step
  "out · shortlisted, not approved", and the note. "R." says a status once, as a dot + word.
- 1024: measured scrollWidth 1050 vs innerWidth 1024 — the table pushes the Days header off the
  page; nothing in the reference set scrolls sideways.
- Keyboard: every station pill is a tab stop, 9 per row, ~350 on the page. "R." rows are one stop.
- Contrast (computed): the funnel's zero value `#7A93FF` on white is 2.82:1; the block sub-line
  `#D6DEFF` on the accent is 4.49:1; the disabled rail tabs `#9CA3AF` are 2.54:1. All under AA.

Changed for round 5: Days gets 24 px right padding; section heading "Businesses"; out rows show
next step "none" and keep the label in the pill only; at 1024 the type label hides, station pills
are 20 px, state pills 11 px and the next-step cell wraps, with an `overflow-x:auto` wrapper as the
safety net; the station bar is one focusable group per row with ←/→ reading each station and Esc
returning to the bar; zero values in tertiary grey (4.83:1), block sub-line `#EEF1FF` (5.7:1),
disabled tabs tertiary grey (4.83:1).

## Round 5 — both views (`shots/round-5`, `shots/round-5/pipeline`, `shots/round-5/states`)

Visible on the sheets: Days sits 24 px clear of the note; "Businesses" under "Pipeline"; out rows say
"none" once; 1024 Pipeline fits (scrollWidth 1024 = innerWidth); zero values and disabled tabs in
tertiary grey; block sub-line in `#EEF1FF`. Measured: scrollWidth = innerWidth at 1440 and 1024 on
both views, 0 console errors, 0 requests beyond the file, 86 870 B before the data, tabular figures
(1111 and 0000 both 76.00 px at 32 px), every chart datum focusable with an aria-label.

State checks (`states/*.png`) found three things the sheets could not show:

- Funnel focus tip: the box draws but the text is ink on ink — `.funnel .col text` (0,2,1) beats
  `.tip text` (0,1,1) — and the tip at `y − 48` clamps to 0 over the neighbouring "35". The group's
  default focus outline also wraps the invisible tip. Sypher's tooltip is a dark box with white text
  above the datum and nothing else.
- Rail keyboard: ArrowDown moves the view but focus lands on `<body>`: the hash `#pipeline` matches
  the table container's `id="pipeline"`, and Chromium's fragment navigation blurs the tab.
- Data honesty: with ahangama-01 selected the two sparklines still drew the current run's per-day
  series (`series.*` is current-run only per DATA.md).

Changed for round 6: `.funnel .col .tip text` white; tips sit in the 30 px headroom band above all
columns; focus rings drawn on the bar / point / segment itself; container id `pipetable`; rail tabs
switch with `pushState` + `route()` so focus stays on the tab; sparklines render only for the
current run, the previous run's cell says "per-day series exist for the current run only".

## Round 6 — final, both views (`shots/round-6`, `shots/round-6/pipeline`, `shots/round-6/states`)

Visible in `states/funnel-focus.png`: the focused "shortlisted" column carries a 2 px accent stroke
and a black tag "shortlisted · 24 of 35 researched · 69%" in white sits above the columns. In
`states/run-01-overview.png`: no sparkline under the previous run; the live-sites cell says
"per-day series exist for the current run only". `states/rail-keyboard`: ArrowDown → focus stays on
`tab-pipeline`, hash `#pipeline`, title "Pipeline". A view switch now starts at the top of the page.
The 1440 and 1024 sheets are otherwise identical to round 5, which is the intent of this round.

## Measurements (final build, `dist/index.html`)

- scrollWidth = innerWidth: 1440 Overview 1440/1440, 1440 Pipeline 1440/1440, 1024 Overview
  1024/1024, 1024 Pipeline 1024/1024.
- Console errors 0 (both views, both widths, plus every state shot). Requests beyond the file: 0.
- File: 340 528 B total; 87 409 B before the data (`<script id="data">` is 253 119 B); the font is
  39 200 B of that as base64 (29 400 B woff2).
- Font: Geist Variable (npm `@fontsource-variable/geist` 5.3.0, latin subset only, OFL — licence in
  `src/fonts/LICENSE`), one file covering 100–900, used at 200 (numerals), 400, 500, 600. Tabular
  figures verified: "1111" and "0000" both 76.00 px wide at 32 px.
- Charts: statement sparkline 9 focusable points, live-sites sparkline 9, critic segments 3, funnel
  7 columns — every datum `tabindex=0` + `aria-label`, every svg has a `<title>`; the value tag shows
  on `:hover` and `:focus` (opacity measured 1 on focus and on hover).
- Contrast (computed): ink 18.72, secondary 7.56, tertiary 4.83 on white; accent on white 5.99;
  white on accent 5.99; `#EEF1FF` on accent 5.7; green 5.08; red 6.16; white on tertiary (out
  station pills) 4.83; accent on `#EEF1FF` (tint pill) 5.32. Nothing below 4.5 carries text
  (`#F2F4F8` is used only as a hover band under ink/secondary text, never under tertiary).
- Keyboard: skip link; rail is a vertical tablist (↑/↓/Home/End switch views, focus stays on the
  tab); run selector is a radiogroup (←/→); date range is a menu (↑/↓, Esc); every gate pill, table
  row (Enter opens the note) and station bar (←/→ reads each station, Esc back) is reachable.
- Motion: numerals count up once (600 ms), funnel columns and sparklines draw once (700 ms), both
  only on the first render; `prefers-reduced-motion` renders the final state with no animation
  (verified: numeral "3", `animation-name: none`). Hover states are instant. Nothing loops.

## Deviations from concepts.md §C, and why

1. `tools/shoot.mjs` has no width flag (1440 + 390 only). The 1024 sheets come from a scratch
   copy of its scroll/settle logic (`tablet-*.png`, `tablet-sheet.png`, `shoot-1024.json` in each
   round). The tool itself was not touched. The 390 sheets are real but not designed for (BRIEF §3).
2. Gate links go to `#pipeline/<slug>` (the row opens and is highlighted), not to the Sites view
   that `gates[].target.view` names, because Sites is built only after the pick (BRIEF §9). Retarget
   in one line when Sites exists.
3. The statement's number is `kpis.needs_you` (business rows with a gate) = 3. The project-wide
   "6 proposals without a merge record" gate (`gates[3]`, no slug, run `2026-09-mirissa-01`) is shown
   as a fourth, tinted pill under the three, not counted into the numeral, so the big number matches
   the KPI in `data.json`.
4. The funnel is linear (35 → 170 px), so "built 3" is a 15 px bar: values that do not fit inside
   print in ink above the column, and the leader climbs to a tag above the dashed zero outlines
   instead of running at bar height. A square-root scale would have been prettier and dishonest.
5. `dist/pipeline.html` (a 190-byte meta-refresh to `index.html#pipeline`) exists only so
   `tools/shoot.mjs`, which takes a file path, can shoot the Pipeline view.
6. The KPI row keeps the concept's two rules and white ground rather than a `#F2F4F8` band, because
   tertiary grey on that band measures 4.39:1 (under AA); the band appears only as a row hover.
7. The date-range pill filters what the data can honestly filter — the per-day sparklines and the
   activity table (last 25 ledger lines) — and says so in its menu. It does not filter the funnel or
   the KPIs, which are per-run "ever reached" counts.
8. Sparklines exist for the current run only (`series.*`); under ahangama-01 the cell says so.
9. Chart hit areas: each datum is one `<g tabindex=0>` as concepted; the station bar in the
   Pipeline is one focusable group per row with arrow keys inside, because nine tab stops per row
   made the table unusable by keyboard (~350 stops).

## Conflicts

None blocking. Open for the gate: the CD's rail-vs-Nodus-top-bar question — built as the 72 px
rail; the run pills and range pill already sit in the top bar, so folding the five views into it is
a small change if Shahar prefers.
