# Instrument (direction A) — look-log

Designer, run `dashboard-01`, 2026-09-27. Overview + Pipeline, `dist/index.html`, built by `build.mjs`
from `src/index.html` + `dashboard/data.json`. Every number on the page is read from the embedded
`data.json` at runtime; nothing is typed into the HTML.

References open beside every round: Sypher `15-36-13` / `15-44-34`, R. AI Ops `15-46-57`,
23andMe tree `15-38-36`, Nexus `15-38-28`.

Sheets per round: `shots/round-N/desktop-sheet.png` + `mobile-sheet.png` (official `tools/shoot.mjs`,
1440 and 390 — the tool has no width flag), plus `overview-1440.png`, `overview-1024.png`,
`pipeline-1440.png`, `pipeline-1024.png` and `state-*.png` (hover, focus, run 01, reduced motion,
highlighted pipeline row) from a scratch Playwright script at 1440×900 and 1024×768.

## Round 1 — first build (Overview and Pipeline both drawn; Pipeline hidden behind the sidebar)

Worse than the references:
- Bug, not taste: `#pipeline{display:grid}` beat `.view[hidden]` — the Pipeline panel rendered under
  the Overview (visible at the bottom of `overview-1440.png`, `main.scrollHeight` 1696 vs 856).
- KPI empty states: "when when Shahar sends…" (my label + the data's own "when"); sentences cut at
  the cell bottom at 1024.
- Critic-mean strip (140×24, dots at y 5/12/19, no labels) read as three loose dots; Sypher labels
  every axis and the pass line at 80 was invisible.
- Barcode bars 12 px wide with a 4 px gap looked like tiles, not Sypher's barcode; no baseline.
- Needs-you 4th row ("6 proposals without a merge re…") truncated and its right cell overran the
  column.
- Pipeline table: fixed column widths summed to 1223 px in a 1168 px panel, so "Last note" collapsed
  to 0 px — the "why is it stuck" column, the one R. AI Ops keeps on every row, was missing.
- Sidebar "Pipeline 35" badge in solid accent shouted louder than the actual gates.

## Round 2 — fixes above

Changed: `display:none!important` on hidden views; `.kpi{overflow:hidden}`; dropped my "when" label;
barcode 10 px bars / 3 px gap on a 1 px `#E5E8EF` baseline; critic strip widened to 168 px with the
80 line labelled and a 100 end tick; needs-you columns 42/34/rest/40; pipeline lost the "Copy r/f" and
"Lines" columns (not in the brief) so "Last note" got ~170 px; badge grey.

Still worse:
- KPI sentences still clipped: the `<p>` was a flex child and shrank from 28 px to ~15 px (its default
  1em bottom margin pushed the column over 96 px). Visible in `overview-1440.png` cells 3–5.
- Panel titles 13 px/600 in a 36 px header: one step above body, Sypher's titles are ~16 px in a
  48 px header — no hierarchy between "Funnel" and its sub-label.
- Big numeral "3" in the needs-you header sat 3 px above the title's baseline (align-self:center).
- Pipeline at 1024: the legend and the group tabs wrapped onto two lines in the 48 px header.

## Round 3 — hierarchy and 1024

Changed: `.es{flex:none;margin:auto 0 0}`; panel h2 15 px/600 in a 40 px header (a deliberate step
outside the 11/12/13/20/28 scale, see deviations); the 28 px numeral baseline-aligned with the title;
top-bar title 15 px; legend hidden under 1280 px, tabs `nowrap`, pipeline columns 176/104/…/112/64/52
at 1024; segment 32 px at 1440, 26 at 1024.

Checked states: run `ahangama-01` renders honestly (all KPIs "no earlier run", funnel 4 → 4 → 0,
"Nothing waits on you"), `#pipeline/the-lavish-haven` highlights the row.

Still worse:
- Focus ring drawn around the whole `<g>` bounding box, tooltip included (a 90×70 px blue box for a
  10×24 bar) — `state-focus.png`.
- Funnel tooltip for the first row overlapped its own count and ran to the panel edge.
- Station tooltip on the first pipeline row was cut by the sticky header (`state-pipe-focus.png`).
- Funnel axis for run 01 (max 4) drew only the "0" tick.
- Activity table: every business slug in accent blue — 12 blue links per screen, where Sypher keeps
  table text ink and reserves colour for state.

## Round 4 — focus, tooltips, tables

Changed: focus ring on a `.hit` rect inside each datum (2 px accent stroke), `outline:none` on the
`<g>`; funnel tooltip anchored at the bar end, flipped to `end` past 55 % of the width, below the
first row; station tooltips below the bar on the first two rows; tick step 10 / 5 / 1 by maximum;
activity business names in ink; avg-critic empty state for a run with no live site.

Still worse (small):
- Run-01 sparkline sentence had doubled parentheses.
- Gate rows in the pipeline: the state pill said only "packaged"; the gate glyph lived only in the
  legend and on the bar.
- Barcode: zero days drawn as 2 px blocks read as a value.
- Arrow keys on the tab strips re-rendered the strip and dropped keyboard focus to `<body>` (found
  with a keyboard pass, not on a sheet).

## Round 5 — both views, final

Changed: gate pills carry a ◇ glyph; zero days are a 1 px tick; wording fixes; "0 of 0" no longer
prints "0 %"; focus is restored to the chosen tab / run button after every re-render (including the
re-render that follows the hash change); sidebar foot names the anchor and `max_sites`.

Compared once more against Sypher `15-36-13`: same skeleton (KPI cells divided by rules, table with
pill tabs, 32 px rows), our panels are flatter (no hairline border, per §5), our KPI numerals 20 px
where Sypher's are 14 px bold, our labels sentence-case 11 px where Sypher's are 9 px tracked caps
(§5 bans caps). Against R. AI Ops: every pipeline row has a status pill + a 9-segment bar with
gates; no per-row sparkline (there is no per-business series in `data.json`). Against 23andMe: the
bar steps `#1F4BFF → #7A93FF → #EEF1FF`, out rows in `#D6DEFF/#AEBDFF`. Against Nexus: grouped
sidebar with count badges.

## Measurements (round 5, `dist/index.html`)

| Check | 1440×900 | 1024×768 |
|---|---|---|
| `scrollWidth` = `innerWidth` | 1440 = 1440 (both views) | 1024 = 1024 (both views) |
| Overview fits without page scroll | yes (`main` 856/856; activity table scrolls inside) | no — stacks, `main` scrolls (1613/724) |
| Console errors / page errors | 0 | 0 |
| Requests other than the file | 0 | 0 |
| Focusable chart data | 28 (18 barcode days, 7 funnel rows, 3 critic dots) | 28 |
| Pipeline focusable segments | 315 (35 × 9) | 315 |
| Largest font-size on the page | 28 px | 28 px |

- File: 346.9 KB total; **99.4 KB before the data** (`<script id="data">` 247.5 KB). Font 44.6 KB
  woff2 → 59.5 KB base64.
- Font: IBM Plex Sans variable (wght 100–700, latin subset, `@fontsource-variable/ibm-plex-sans`
  5.3.0, OFL 1.1, licence copied to `src/fonts/`). Used at 11 / 12 / 13 / 15 / 20 / 28 px, weights 400 /
  500 / 600, `tabular-nums` on `html`.
- Contrast: ink `#0B1220` on white 18.7:1; `#4B5563` on ground `#F3F5F9` 6.9:1; `#6B7280` on white
  4.83:1 (used only on white — on the ground it is 4.43, so nothing there uses it); accent `#1F4BFF`
  on white 5.99:1, on ground 5.48, on `#EEF1FF` 5.32; white on accent 5.99; green `#1A7F37` on white
  5.08; red `#C0182B` on white 6.16; tooltip white on `#0B1220` 18.7.
- Motion: KPI numbers count up once (600 ms, ease-out), bars/barcode/ring draw once (700 ms);
  under `prefers-reduced-motion: reduce` the first paint already shows the final value
  (`3`, `transform: matrix(1,0,0,1,0,0)`, ring at its final offset). No loop anywhere.
- Keyboard: Tab reaches sidebar, run buttons, every chart datum, every gate link, tabs (arrow keys
  move and select), note cells (tooltip on focus); Enter on a gate arrow lands on the highlighted
  pipeline row; focus survives every re-render.

## Deviations from concepts.md §A, and why

1. **Panel titles 15 px** (scale says 11/12/13/20/28): 13 px/600 was indistinguishable from body
   text at 13 px/400 on the round-2 sheet; Sypher's ~16 px titles are what make its density legible.
2. **Barcode bars 10 px wide, 3 px gap** instead of "2 px bars, 1 px gap": the series has 9 days, so
   2 px bars would be a 26 px smear; at 10 px each day is a focus target with a tooltip.
3. **Activity shows 12 rows at 1440×900**, not 14: 44 top bar + 96 KPI + 272 middle + headers leave
   ~386 px for rows; the remaining 13 of the 25 lines scroll inside the panel.
4. **Radius 8 / 4** as concepts.md §A and BRIEF §6 ("low radius") say, although BRIEF §5 says cards
   are 12–20 px — the two sections disagree and §6 is the one that defines this direction.
5. **Gate links go to `#pipeline/<slug>`** (the row, highlighted) rather than the Sites view the data's
   `gate_target` names, because Sites is not built until after the pick. The "review prompt diffs"
   item points at Decisions the same way and is shown as text, not a link.
6. **Pipeline was drawn in round 1** alongside the Overview (the brief asks for three Overview rounds
   first). Rounds 1–3 were judged on the Overview sheets; the Pipeline fixes in those rounds were
   layout-breaking bugs, not design passes; rounds 4–5 covered both views.
7. **No "Copy r/f" / "Lines" columns** in the pipeline (BRIEF §3 does not ask for them; they cost the
   "Last note" column its width). The copyeditor fails belong to the Agents view.
8. **1024 sheets come from a scratch script**, because `tools/shoot.mjs` shoots 1440 and 390 only and
   `tools/` is outside my write scope. Its 390 sheets are in every round folder but mobile is out of
   scope (BRIEF §3).

## Conflicts / not done

- `tools/shoot.mjs` cannot open the Pipeline view (it takes a file path, no `#hash`), so the official
  sheets show the Overview only; `pipeline-1440.png` / `pipeline-1024.png` are the scratch script's.
- The critic gauge (20 px ring) is not itself focusable; its value is printed beside it in text, per
  the task's "focusable elements with aria-label or a visible value".
- `#6B7280` (shared tertiary grey) fails AA on the `#F3F5F9` ground by 0.07; it is used only inside
  white panels here. Worth a note for the other two directions.
