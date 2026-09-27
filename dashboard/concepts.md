# OneShot dashboard — three directions (run `dashboard-01`, BRIEF §6, step 1)

Creative director, 2026-09-27. Product UI for one operator. All three directions share `data.json`,
the five views, §5 of the brief, and one accent `#1F4BFF`. They differ in layout, density, type and
how each chart is drawn. Nothing here is a landing page; nothing from `agents/designer/gold/` is a
layout source (the gold pages were opened for colour, type and motion only).

## 0. What the data actually is today (`dashboard/data.json`, generated 2026-09-27 15:30)

- 39 business rows over 2 runs: `2026-09-ahangama-02` (35, current) and `2026-09-ahangama-01` (4, all
  superseded). 320 ledger lines, 46 human decisions, 1 correction line, 0 leads.
- Funnel of the current run (`funnel[]`, "ever reached"): discovered 35 · scored 35 · shortlisted 24 ·
  approved 12 · harvested 10 · copy_passed 3 · concepted 3 · mocked 3 · picked 3 · built 3 · passed 3 ·
  packaged 3 · pitched 0 · reply 0 · meeting 0 · sale 0.
- Gates open: 3, all `send the pitch`, since 2026-09-25 (2 days): KA Surf Hostel, Layday Surf
  Ahangama, The Lavish Haven. Groups: delivered 3 · dropped 9 · not_approved 12 · not_shortlisted 11.
- Critic: KA 86 (3 numbered rounds: 73 → 72 → 92, then verifications 92, 93, 86), Layday 91.5 (1 round),
  Lavish 91.5 (70 → 91.5). Mean of latest scores 89.7. Copy rounds (`copy_rounds`): KA 10, Lavish 6,
  Layday 5 — the copyeditor fails the brief wants visible are there, but only as counts and note text.
- Missing entirely: pitches, replies, meetings, clients, cost (`expenses.tracked: false`,
  `token_spend_tracked: false`). Previous-run deltas are impossible for every KPI except "researched"
  (35 vs 4): run 01 never passed `shortlisted`. Sparklines can only be built from ledger timestamps
  (per-day series: gates open, live sites, ledger lines) and from critic rounds per site.

So every KPI row below shows a designed empty delta ("first run to reach this stage") and every
sparkline is either a real per-day series derived from `ledger.jsonl` or absent. No fixture invents.

## 1. Reference table (`dashboard/ref/`, all 13 opened; sizes are estimates read off the screenshots, which are 793–1149 px wide, so roughly ×1.25–1.4 for a 1440 layout)

| File (`Screenshot from …`) | Product | What it does well; measured / estimated |
|---|---|---|
| `2026-09-25 15-38-36.png` | 23andMe, "Your genetic relationship" | One hue stepped through four tints (yellow → orange → red → oxblood) to say "how close"; unrelated nodes are outline-only grey. Pill nodes 96×72, 1.5 px grey connectors. Numeral "22.16%" ~18 px regular under a 12 px grey label. |
| `2026-09-25 15-40-32.png` | 23andMe, "Compare your Ancestry" | Two donuts with initials in the hole; a four-row comparison table, 62 px rows, hairline dividers, 16 px bold tabular percentages, 8 px tint dots as legend. Card radius ~16, no border, one soft shadow. |
| `2026-09-27 15-36-13.png` | Sypher (fleet + invoices) | Densest reference. KPI cells inside one card separated by 1 px rules, not by cards: 9 px tracked label, 14 px bold value, delta inline. Barcode sparkline (2 px bars), segmented progress bar, dual-axis line chart with checkbox legend, 10-row table at ~33 px rows, tabs as pills. Card gap ~8, radius ~8. |
| `2026-09-27 15-36-41.png` | Mondly (learning dashboard) | Pill nav in a rounded top bar, black active pill. Numeral "24,9" ~46 px light with a 12 px two-line unit beside it. Bar chart with ONE saturated bar, the rest a pale tint, a dashed average line with a tag ("4.2 hours"). Three-segment stacked bar under "64%". Radius ~20, card gap ~16. |
| `2026-09-27 15-38-04.png` | Shopeers (commerce) | Canonical KPI card: 13 px bold label + icon, 26 px bold number, green/red delta pill, "vs. 14,653 last period" in 10 px grey. Line chart with a white tooltip, bar chart with one blue bar and its value above it, gauge "68%" with a target line. Date range + "Last 30 days" selects in the page header. Radius ~10, gap ~12. |
| `2026-09-27 15-38-28.png` | Nexus (commerce) | Sidebar grouped GENERAL / TOOLS / SUPPORT with a count badge. Stacked bars whose series are tints of one violet plus one teal; a highlighted bar with its value tag; donut; integration table with mini progress bars in a column. Date range "Oct 18 – Nov 18" + period select. Radius ~10. |
| `2026-09-27 15-38-48.png` | Logip (team tasks) | The roomy one. Three stats in one row separated by vertical hairlines, each with an outlined circle icon, 22 px value, coloured delta text. Line chart with a dark tooltip (date, two rows with colour ticks). Right column is an activity feed. Radius ~20, gap ~24, lots of air. |
| `2026-09-27 15-41-49.png` | NexaFlow (construction budget) | Donut "73%" with the label in the hole; ONE filled accent card holding three 28 px numbers and a progress bar (the only saturated block on the page); bar chart where the first bar is saturated and the rest are tint; line with dots. Radius ~12, gap ~16. |
| `2026-09-27 15-42-53.png` | Nodus (endpoint audit log) | Almost no cards: white ground, thin rules. Pill nav, black active pill. One oversized "1,395" ~72 px light centred with a 12 px month under it; three small KPIs with delta pills at left; a full-width chart of grey bars behind one accent line with event markers and a range handle; period pills 1D 1W 1M 1Y MAX; a table with "237 Items" as a chip. |
| `2026-09-27 15-43-09.png` | FinGuard (personal finance) | Outlined pill nav, black active. One saturated blue block card with a sentence in it. "87%" over a three-segment bar with labels under each segment. Rounded bar chart with one orange bar and a value tag. Bars with the percentage inside and a dashed leader to a black label. Status pills in the table. Radius ~20, gap ~16. |
| `2026-09-27 15-44-34.png` | Sypher (same dashboard, tooltip open) | The tooltip: dark, date on top, three rows each with a 8 px colour square, name, right-aligned tabular value. Vertical dashed cursor line. Legend as checkboxes that toggle series. |
| `2026-09-27 15-45-44.png` | "Dasbor" (unnamed Indonesian commerce kit) | Least usable (gradient glass ground, decorative). Keep only: the summary trio with icon discs and the value tag "186" over the tallest bar; the to-do list as a checklist of plain sentences. |
| `2026-09-27 15-46-57.png` | "R." AI Ops, Models | Dark, so no colour taken. Structure: KPI card with number 26 px + delta pill left, sparkline right; a table where EVERY row carries a status dot, a 60×20 sparkline and a thin progress bar; a side list of name / % / bar. This is the Pipeline row and the Agents row. |

## 2. Shared system (all three)

- Accent `#1F4BFF`. Tints for series and states: `#4A6DFF`, `#7A93FF`, `#AEBDFF`, `#D6DEFF`,
  `#EEF1FF`. Focus ring `#1F4BFF` 2 px outside, 2 px offset. Deltas and status only: green `#1A7F37`,
  red `#C0182B` (both ≥ 4.5:1 on white). Warning/"waiting on you" is the accent, not amber.
- Ink `#0B1220`, secondary `#4B5563`, tertiary/labels `#6B7280` (4.6:1 on white; nothing lighter
  carries text), rules `#E5E8EF`, card `#FFFFFF`.
- Numbers: `font-variant-numeric: tabular-nums` on `html`; count-up once on load (600 ms, ease-out),
  charts draw once (`stroke-dashoffset` 700 ms), both skipped under `prefers-reduced-motion`.
- Every chart is inline SVG with a `<title>`, visible axis or labels, and each datum a
  `<g tabindex="0" role="img" aria-label="…">`; the value bubble is an SVG `<g class="tip">` shown on
  `:hover` and `:focus` (CSS only). Charts read from `data.json` via one `fetch`, once.
- Empty state, one component, three sizes: the number set as a hollow "0" (outline, tint
  `#AEBDFF`), one sentence in secondary grey saying what will appear and which ledger transition
  writes it, and the earliest date it can exist. Never a dash, never "N/A".

Station bar mapping (assumption — BRIEF says "stations 1–9", PLAN §4 numbers 1–7 + 4a–4i + ∞; I
collapse to nine segments, gates marked ◇): 1 Scout · 2 Shortlist ◇ · 3 Harvest · 4 Copy (4a–c) ·
5 Concept + Mockups (4d–e) ◇ pick · 6 Build + SEO (4g–i) · 7 Critique · 8 Deliver · 9 Pitch ◇ send.

---

## A. "Instrument"

**Idea.** A control panel: everything on one screen, rules instead of cards, numbers set small and
many, so Shahar reads the whole run without scrolling at 1440.

**Takes from.** Sypher (`15-36-13`, `15-44-34`): KPI cells divided by 1 px rules inside one panel,
barcode sparklines, checkbox legend, the dark three-row tooltip, 33 px table rows, pill tabs for
table filters. "R." AI Ops (`15-46-57`): the row that carries a status dot + sparkline + progress
bar; the side list name / value / bar. 23andMe (`15-38-36`): one hue in four steps to mean "how far
along"; outline-only for stages not reached. Nexus (`15-38-28`): grouped sidebar with a count badge.

**Palette.** Ground `#F3F5F9`; panel `#FFFFFF`; rules `#E5E8EF`; accent `#1F4BFF` for the current
station, the highlighted bar and links; station tints `#1F4BFF` → `#7A93FF` → `#D6DEFF` (done →
in progress → not reached, the 23andMe step); text greys as shared.

**Type.** IBM Plex Sans, variable, weights 400/500/600, `tnum` on. OFL 1.1; files from
`github.com/IBM/plex` releases (`IBM-Plex-Sans/fonts/complete/woff2/`) or npm
`@fontsource-variable/ibm-plex-sans`, copied into `dist/fonts/`. Scale: 11 label · 12 table ·
13 body · 20 KPI · 28 the one big number per view. Line height 1.3.

**Radius / spacing.** Radius 8 (panels), 4 (chips, pills), 999 only for status dots. Spacing scale
4 / 8 / 12 / 16 / 24; panel padding 16; panel gap 12; table row 32; KPI cell 96 high.

**Overview at 1440** (sidebar 208 · content 1200 · gutters 16; top bar 44 with run segmented
control [ahangama-02 | ahangama-01] and a date-range field "19 Sep – 27 Sep"):

```
┌208┬────────────────────────────── 1200 ─────────────────────────────┐
│nav│ KPI PANEL (1 card, 6 cells × 200, rules between, 96 high)        │
│   │ live 3 │ needs you 3 │ pitched 0 │ replies 0 │ clients 0 │ 89.7 │
│   │ spark  │ spark       │ empty     │ empty     │ empty     │ 3 dots│
│   ├──────────────────── 700 ────────────┬────────── 488 ─────────────┤
│   │ FUNNEL: 7 rows, 28 high             │ NEEDS YOU: table, 3 rows   │
│   │ label · count · bar · % of previous │ name · gate · since · [→] │
│   ├──────────────────────────────────────┴────────────────────────────┤
│   │ RECENT ACTIVITY: 14 rows × 32 = 448, ts · slug · agent · from→to │
│   │ · note (ellipsis, full on hover) · tabs: All | Human | Critic     │
└───┴───────────────────────────────────────────────────────────────────┘
```

**At 1024:** sidebar collapses to a 56 px icon rail; KPI panel becomes 3 × 2 cells (each 320 wide);
funnel and needs-you stack at full width (needs-you first: it is question a); activity keeps its
columns but drops `agent` into the from→to cell.

**Charts.**
- *Sparkline* (KPI cell, 160×24): Sypher barcode — one 2 px bar per day, 1 px gap, 9 days
  (19–27 Sep), tint `#AEBDFF`, today `#1F4BFF`; `<title>` per bar, focus shows "25 Sep · 3".
- *Funnel*: horizontal bars, 700 wide, height 16, x-axis of 0 / 10 / 20 / 30 ticks in 11 px grey at
  top; bar fill `#1F4BFF` for stages reached, outline `#D6DEFF` 1 px for zero stages; count right of
  the bar, "% of previous" in grey after it (24/35 → 69%). Hover/focus: the row highlights
  `#EEF1FF` and the value cell turns ink.
- *Bar with one highlighted bar* (Agents: rounds per pass): 8 px columns, 4 px gap, tint `#D6DEFF`,
  the max column `#1F4BFF` with its value in 11 px above; baseline rule and integer y ticks.
- *Score across rounds* (Sites, small multiple 200×48): 1.5 px accent line, 3 px dots at each round,
  dashed rule at 80 (pass threshold, labelled "80" at right), x labels "r1 r2 r3", verifications
  after the pass drawn as hollow dots. Focus on a dot: dark tooltip "round 3 · 92 · PASS".
- *Donut / gauge*: not used in A except one 20 px ring next to the critic mean (270° arc, stroke 3,
  value in text beside it, never inside).
- *Station progress bar* (Pipeline row): nine 1-px-separated segments 48×6, done segments
  `#1F4BFF`, current `#7A93FF` with a 2 px pulse-free outline, not reached `#EEF1FF`; gates are 6 px
  diamonds on the segment border, filled when passed; focus on a segment reads "6 Build · passed
  22 Sep · designer 0.3.4".

**Empty states.** Pitched / replies / clients cells: hollow "0" at 20 px, "appears when a `packaged →
pitched` line is written; 3 sites are waiting for you to send". Cost: a sixth sidebar item
"Cost" greyed with "expenses.jsonl not tracked yet" — no chart drawn for nothing.

**Leaves out on purpose.** Card shadows, icons in KPI cells, any illustration, greeting text,
avatars, a hero number. Nothing over 28 px on the Overview.

---

## B. "Soft cards"

**Idea.** A calm morning read: six big rounded cards, generous charts with air around them, the
accent appears only where Shahar's hand is needed.

**Takes from.** Logip (`15-38-48`): 24 px gaps, radius 20, the three-stat row separated by vertical
hairlines with outlined circle icons, the right-hand activity feed, the dark tooltip. Shopeers
(`15-38-04`): the KPI card anatomy (label, big number, delta pill, "vs last run" line) and the gauge
with a target line. NexaFlow (`15-41-49`): exactly ONE filled accent card per screen (theirs "Total
Project Budget"; ours "Needs you"), donut with the label in the hole, first bar saturated and the
rest tint. 23andMe (`15-40-32`): the comparison table with tint dots and a soft single shadow.

**Palette.** Ground `#F5F7FB`; card `#FFFFFF` with `0 1px 2px rgba(11,18,32,.04), 0 8px 24px
rgba(11,18,32,.06)`; the one filled card `#1F4BFF` with white text (7.9:1) and `#D6DEFF` secondary
text; chart tints `#AEBDFF` / `#D6DEFF`, series accent `#1F4BFF` only for the current run.

**Type.** Manrope, variable, weights 300/500/700, `tnum` on. OFL 1.1; files from
`github.com/sharanda/manrope` (`fonts/variable/`) or npm `@fontsource-variable/manrope`, copied to
`dist/fonts/`. Scale: 13 label · 15 body · 18 card title · 44 KPI (weight 300) · 64 needs-you
number. Line height 1.45.

**Radius / spacing.** Radius 20 (cards), 12 (inner tiles), 999 (pills). Spacing 8 / 16 / 24 / 32 /
48; card padding 28; card gap 24; list row 56.

**Overview at 1440** (sidebar 240 with labels and a "3" badge on Needs you · content 1152 · top bar
72 with page title, run pill-select, date-range pill):

```
┌240┬──────────── 752 ──────────────┬──────── 376 ─────────┐
│nav│ KPI 3×2 grid (gap 24)          │ NEEDS YOU (filled    │
│   │ ┌live 3┐┌pitched 0┐┌replies 0┐ │ accent card, tall)   │
│   │ │44px  ││hollow   ││hollow   │ │ 64px "3"             │
│   │ │spark ││sentence ││sentence │ │ 3 rows: name · gate  │
│   │ └──────┘└─────────┘└─────────┘ │ · "2 days" · white   │
│   │ ┌clients┐┌critic 89.7┐┌open  ┐ │ pill button "Open"   │
│   │ │hollow ││gauge      ││ gates│ │                      │
│   ├─────── 752 ────────────────────┼───── 376 ────────────┤
│   │ FUNNEL card: 7 bars, 40 high,  │ RECENT ACTIVITY feed │
│   │ 56 row pitch, count + %        │ 8 items, 56 each,    │
│   │                                │ agent initial disc   │
└───┴────────────────────────────────┴──────────────────────┘
```

**At 1024:** sidebar to a 72 px rail with icons and 11 px labels; needs-you moves to the top at full
width (one row: 64 px number left, the three gate rows right); KPI grid 2 × 3; funnel full width;
activity full width below, 6 items.

**Charts.**
- *Sparkline* (140×36, bottom-right of the KPI card): 2 px `#1F4BFF` line, area fill `#EEF1FF`,
  end dot 4 px, end value in 13 px; no axis, but the first and last dates in 11 px grey under it.
  Focus walks the points; a white tooltip with a 1 px `#E5E8EF` border (Shopeers) shows "24 Sep · 0".
- *Funnel*: seven horizontal rounded bars (radius 8, height 20), tint `#D6DEFF`, with the stage the
  run has reached last (`packaged`, 3) in `#1F4BFF`; count in 18 px weight 700 right-aligned, drop
  from previous in 13 px grey ("−11"); no axis — the widest bar is 35 and says so.
- *Bar with one highlighted bar*: rounded 24 px columns, 12 px gap, `#D6DEFF`, max in `#1F4BFF`
  with a dark value tag above it (Mondly's "4.2 hours" tag), dashed mean line labelled at left.
- *Score across rounds* (Sites card, 320×96): 2 px line, 6 px dots, soft area, y ticks 60/80/100,
  x "Round 1…3"; hollow dots for post-pass verifications; dark tooltip.
- *Donut / gauge* (critic mean): 180° gauge, stroke 10, track `#EEF1FF`, value arc `#1F4BFF`,
  target tick at 80 labelled "pass 80", number 44 px in the mouth, "mean of 3 sites" under.
- *Station progress bar*: one 8 px track radius 4, filled `#1F4BFF` to the current station, gate
  markers as 12 px rings on the track (filled ring = passed); the label under the bar names the
  next step and its owner ("Send the pitch · you").

**Empty states.** Pitched / replies / clients are full cards: hollow 44 px "0", sentence "Will show the
count and a per-week sparkline once a pitch is sent", and a quiet tinted button "3 ready to send →"
linking to the gate. Cost card: "Not tracked yet — appears when `expenses.jsonl` has a line".

**Leaves out on purpose.** Tables on the Overview, tabs, dense rules, icons in KPI cards except the
Logip circle on needs-you, anything smaller than 13 px. The accent touches exactly one card and
the chart's current stage.

---

## C. "Statement"

**Idea.** One big fact per screen: the Overview opens with the number of things waiting on Shahar
set enormous, everything else is small, ruled and secondary; pills, not menus.

**Takes from.** Nodus (`15-42-53`): the 72 px light centred number with a small caption, small KPIs
with delta pills beside it, white ground with rules instead of cards, the full-width chart under a
row of period pills, the items chip on the table. FinGuard (`15-43-09`): the single saturated
accent block carrying a sentence, outlined pill nav with a solid active pill, bars with the value
inside and a dashed leader to a label, status pills. Mondly (`15-36-41`): the highlighted-bar chart
with a dashed average line and a tag, the three-segment bar under a percentage. Sypher: nothing
but the tooltip.

**Palette.** Ground `#FFFFFF` for the page, `#F2F4F8` only as thin bands behind secondary rows; the
accent block `#1F4BFF`; pills: outline `#E5E8EF`, active pill ink `#0B1220` with white text; chart
tints `#AEBDFF` / `#EEF1FF`; the big number in ink, never in the accent.

**Type.** Geist Sans, variable, weights 200/400/600, `tnum` on. OFL 1.1; files from
`github.com/vercel/geist-font` releases (`Geist/webfonts/`) or npm `geist` (`dist/fonts/geist-sans/`),
copied to `dist/fonts/`. Scale: 12 label · 14 body · 20 section · 32 secondary numbers · 120 the one
number (weight 200, tracking −0.02 em). Line height 1.35.

**Radius / spacing.** Radius 16 (the accent block, table container), 999 (pills), 0 on charts and
rules. Spacing 8 / 16 / 32 / 64; band padding 32; vertical rhythm 64 between statements.

**Sidebar.** BRIEF §3 asks for a left sidebar and §6 asks C for pill navigation; C keeps the sidebar
as a 72 px rail (icon + 11 px label, accent bar on the active view) and uses pills for the run
selector, the date range and every in-view switch. If Shahar prefers the Nodus top-bar nav, the rail
folds into it; that is a one-line decision at the gate.

**Overview at 1440** (rail 72 · content 1280 · top bar 56: pills [ahangama-02] [ahangama-01] left,
[19–27 Sep ▾] right):

```
┌72┬──────────────────────────── 1280 ─────────────────────────────┐
│  │ STATEMENT band (h 320)                                          │
│  │        3                        ┌ accent block 400×200 ┐        │
│  │   need you  (12px caption)      │ "Three pitches are   │        │
│  │   KA · Layday · Lavish as pills │ ready. Nothing has   │        │
│  │   each → its gate               │ been sent yet." [Open]│       │
│  ├─── small KPIs, one rule above and below, 6 cells, 32px numbers ─┤
│  │ live 3 ▴first │ pitched 0 │ replies 0 │ clients 0 │ 89.7 │ 35  │
│  ├──────────────── FUNNEL full width, 1280×240 ─────────────────────┤
│  │ 7 tall columns, value inside, dashed leader to "packaged 3"      │
│  ├── RECENT ACTIVITY table, chip "320 lines", pills All Human Critic┤
└──┴─────────────────────────────────────────────────────────────────┘
```

**At 1024:** the statement band puts the accent block under the number (both full width, block
120 high); KPI cells 3 × 2; the funnel keeps seven columns at 1024 wide; the table hides `note`
behind the row's focus/hover.

**Charts.**
- *Sparkline* (KPI cell, 96×20): 1.5 px ink line, no fill, last point an accent dot; value on
  focus in a black Nodus tag "+33%"-style: "25 Sep · 3".
- *Funnel*: seven vertical columns 120 wide, 32 gap, tint `#EEF1FF`, the current stage `#1F4BFF`,
  the value printed inside the top of each column (FinGuard's "67%"), zero stages drawn as a
  1 px dashed outline column with "0" inside; stage names under; a dashed leader from the current
  column to a black label "3 built, none pitched".
- *Bar with one highlighted bar*: Mondly — 40 px rounded columns, tint, one accent, dashed mean
  with a tag at left; y axis omitted, values on hover as tags, integers under each column.
- *Score across rounds*: Nodus — grey 4 px columns for each critic line (verifications included) with
  one 2 px accent line through the numbered rounds; event markers (black discs) where Shahar
  overrode; period pills r1 r2 r3; value tag on focus.
- *Donut / gauge*: full 360° ring, stroke 14, 160 px, number 48 px in the hole ("89.7"), caption
  "critic mean, 3 sites", three-segment bar beneath for 86 / 91.5 / 91.5 labelled per site.
- *Station progress bar*: nine pills in a row (24 high), passed pills filled ink with white number,
  current pill accent, unreached outline; gates are pills with a ◇ glyph; focus reads the station,
  date and agent version.

**Empty states.** Pitched / replies / clients cells: hollow 32 px "0" plus one sentence; when a gate
can unblock them, the sentence is a link ("send one of the 3 pitches"). Cost: a whole Statement band
on its own view — hollow "0", "Cost appears when expenses.jsonl or token spend is tracked; today
neither is" — no gauge for an untracked number.

**Leaves out on purpose.** Card grids, shadows, sparkline-in-every-cell, icons, the greeting, colour
on anything that is not the accent block or the current stage. Only one number is large.

---

## 3. Divergence table

| | A Instrument | B Soft cards | C Statement |
|---|---|---|---|
| First thing the eye lands on | the 6-cell KPI panel (all equal) | the one filled accent card "Needs you" | the 120 px "3" |
| Overview skeleton | panel → 2 columns → full-width table | 3×2 cards + tall right card → card + feed | statement band → KPI rule row → full-width funnel → table |
| Cards | one panel per group, rules inside | 20 px cards, one soft shadow | none; bands and rules, one accent block |
| Sidebar | 208 grouped, badge | 240 with labels, badge | 72 rail; pills everywhere else |
| Funnel form | horizontal bars with axis | horizontal rounded bars, no axis | vertical columns, value inside, leader |
| Largest numeral | 28 | 64 | 120 |
| Type | IBM Plex Sans 400–600 | Manrope 300–700 | Geist 200–600 |
| Radius | 8 / 4 | 20 / 12 | 16 / 999 / 0 |
| Density | 14 activity rows visible | 8 feed items | 10 table rows under two big statements |
| Accent budget | station colour + links | one card + current stage | one block + current stage |

No two share a skeleton, a card model, a funnel drawing or a numeral scale.

## 4. What `data.json` lacks for the views (for the designer's `data.mjs`)

1. **Per-day series** (for every sparkline): gates open, live sites, ledger lines, per day from
   `ledger.jsonl` timestamps — derivable, not present.
2. **Per-agent pass/fail counts, rounds per pass and versions**: only `history[].agent/v/to` per
   business; nothing aggregated. Copyeditor fails must be counted from `to === 'copy_failed'` lines
   per agent, per run (KA 10 copy rounds is a count today, not a list).
3. **Third-fail overrides**: exist only as note text ("Shahar overrode the round-3 copyeditor fail",
   "Allow round 3", "One more pass"); needs a parsed `override: true` on the human line.
4. **Critic scores per round** as numbers: today one `critic_score` per business; the 73 → 72 → 92
   sequence lives in `history[].note` regex territory. Also which lines are verifications, not rounds.
5. **Prompt versions from `agents/*/CHANGELOG.md`** (latest entry per agent: designer 0.3.4, critic
   0.3.2, copywriter 0.3.1, copyeditor 0.3.0, harvester 0.3.0, creative-director 0.2.3, orchestrator
   0.2.1, the rest 0.2.0) and that entry's line. Parse the highest version, not the first line:
   copywriter's and copyeditor's files are not newest-first. Cross-check against `run.yaml` pins and
   the `v` on ledger lines, and show any disagreement.
6. **Screenshot paths** per site (`sites/<slug>/**/shots/…`, first desktop sheet) and the
   final-vs-picked sheet paths for the Sites card.
7. **Previous-run deltas**: `runs[]` has group counts only; needs the same KPI set per run so a delta
   can be computed or honestly declared "no previous".
8. **Owner of the next step** per business (me / agent name) and the gate URL target (which view
   and which row) — the Pipeline "next step" and "owner" columns.
9. **Station index** per state (the 1–9 mapping above) and the date each station was reached.
10. **Pitch / reply / meeting / client** fields exist (`pitched_at`, `outcome`) but are null everywhere;
    cost is absent (`expenses.tracked: false`, no token spend). The views need the empty-state
    copy to know which transition will fill them — put the mapping in `data.json`, not in the HTML.
