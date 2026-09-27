# Critic — dashboard mockups (run `dashboard-01`, BRIEF §8)

Critic, 2026-09-27. Rubric: BRIEF.md §8 (replaces rubric.md). Under review: `dashboard/mockups/{instrument,soft-cards,statement}/dist/index.html` as committed in 5732325, each embedding `dashboard/data.json` generated 2026-09-27T13:13:29Z. Everything below was measured in headless Chromium at 1440×900 and 1024×768 (Playwright; scripts and raw `audit.json` per variant in the critic scratchpad), or computed from the files. Reference sizes are read off the `dashboard/ref` captures with a 10 px grid and scaled to 1440 by the capture width (Shopeers 837 px → ×1.72, Logip 1123 → ×1.28, Sypher 1085 → ×1.33, Mondly 1085 → ×1.33, Nodus 1095 → ×1.32, FinGuard 1089 → ×1.32, NexaFlow 870 → ×1.66, Nexus 844 → ×1.71, R. AI Ops 1149 → ×1.25); digit height ÷ 0.72 ≈ font size.

## Scores

| Dimension (weight) | Instrument | Soft cards | Statement |
|---|---|---|---|
| Data honesty (25) | 25 | 24 | 25 |
| The four questions (25) | 19 | 18 | 21 |
| Craft against references (25) | 19 | 18 | 20 |
| Charts (15) | 13 | 12 | 10 |
| Accessibility and speed (10) | 5 | 7 | 7 |
| **Total** | **81** | **79** | **83** |
| Hard fails | **contrast under AA** (27 elements at 4.43:1) | **contrast under AA** (4 elements at 3.43:1, Pipeline) | **contrast under AA** (1 element at 4.30:1, Overview) |
| Invented number / unlabelled chart / chart library | none / none / none | none / none / none | none / name-only labels on 3 micro-charts (see Charts) / none |

All three carry the same hard fail, each a one-token CSS fix (listed as fix 1 per variant). The ranking does not depend on it. A fourth item I did **not** count as a hard fail, shared by all three because concepts.md §2 prescribed it: the hollow "0" empty-state numeral is an outline in `#AEBDFF` on white, 1.82:1 (instrument 20 px, soft cards 44 px, statement 32 px). It is redundant with the adjacent sentence and carries an `aria-label`, so I treat it as a graphic, not text; if Shahar reads §5 strictly it fails all three equally.

## Data honesty — trace

`data.json` embedded in each dist is byte-identical (after JSON normalisation) to `dashboard/data.json`. Re-running `buildData()` today reproduces it except `recent_activity`, `non_business_runs` and `totals.ledger_lines` (322 → 323): the ledger gained the designer's `concepted → mocked` line at 13:37, after the file was written at 13:13. Every page prints the data time ("data 27 Sep 13:13 UTC"), so the staleness is declared, not hidden.

Overview numbers, all three variants → `data.json` → ledger:

| Shown | data.json | Ledger |
|---|---|---|
| live sites 3 | `kpis.live_sites` | last lines 318–320 (`passed → packaged`, 25 Sep 06:31) for KA, Layday, Lavish |
| needs you 3 · since 25 Sep · 2 d | `gates[0..2]`, `days_since_change` | same lines; 06:31 25 Sep → 13:13 27 Sep = 2.28 d → 2 |
| pitched 0 · replies 0 · clients 0 | `kpis.*` | no `pitched` / `outcome:*` line exists (0 of 319 business lines) |
| critic mean 89.7 | `kpis.avg_critic` | KA 86 (line 315, verification 3), Layday 91.5 (line 293, round 1), Lavish 91.5 (line 310, round 2): (86+91.5+91.5)/3 = 89.67 |
| KA 86 "verification", Layday 91.5 "round 1", Lavish 91.5 "round 2" | `critic_score`, `critic_score_kind` | KA lines 206/218/230 = 73/72/92 rounds, 238/241/315 = 92/93/86 verifications |
| researched 35 · +31 vs ahangama-01 (4) | `deltas.researched` | 35 slugs in run 02, 4 in run 01 (12 lines, states discovered/scored/shortlisted only) |
| funnel 35 / 24 / 10 / 3 / 0 / 0 / 0 | `funnel[]` | slugs with a `to_state` of discovered / shortlisted / harvested / built / pitched: 35 / 24 / 10 / 3 / 0 (recomputed from the raw lines) |
| 69 % · 42 % · 30 % · 0 %; −11 · −14 · −7 · −3; "3 of 35 built (9 %)" | derived in page | 24/35, 10/24, 3/10, 0/3; 3/35 = 8.6 % |
| sparklines: live sites 0,0,0,0,0,0,3,3,3 · gates open 3,1,1,0,0,0,3,3,3 | `series.*` | recomputed per UTC day from the raw lines: identical (19 Sep: three `mocked` gates; 20–21 Sep: KA only; 25 Sep on: three `packaged`) |
| ledger 322 lines · decisions 46 | `totals` | 322 lines at 13:13 (323 now); 46 `agent: human` business lines |
| "6 proposals without a merge record" | `gates[3]` | 6 `proposals/**/*.md` that are not `-APPLY.md`; no merge line in the ledger |
| soft cards "Dropped after approval 9 · Shortlisted, not approved 12 · Scored below the threshold 11" | `runs[0].groups` | all 9 dropped rows reached `approved` (checked); 12 last = shortlisted in a run with approvals; 11 last = scored |
| statement "Three sites are live. Nothing has been sent yet. · 3 pitches waiting since 25 Sep · 2 days" and "3 built, none pitched" | `live_sites`, `pitched`, `gates`, `funnel` | as above |

Pipeline sample, 11 rows × all three variants → `data.json` → ledger line: KA (98 lines, station 8, "send the pitch · Shahar", 2 d, critic 86, note = line 318), Layday (47 lines, 91.5, line 319), Lavish (50 lines, 91.5, line 320), Bappa (dropped, 7 d, note = line 121 "dropped by Shahar: no usable photos…", presence 0/5 = line 3x scored note), Boardwalk (dropped, line 136 "mode: test — FAILS…", presence 1/5), Good Story (dropped, line 114 "gate a reversed by Shahar…", presence 2/5), Surf Front (dropped, line 130 "disqualified…", presence 1/5), Dad And Sun (not approved, 8 d, line 39 "score <= presence_threshold 2", presence 0/5), Hool Kabalana (line 30, presence 0/5), Artur Barbaras (not shortlisted, line 86, presence 3/5), Licuala (line 100, presence 5/5). Station dates on the bars (e.g. KA 1–2 on 19 Sep, 6 on 22 Sep, 7 on 22 Sep, 8 on 25 Sep) match `station_dates` and the lines' timestamps. Run switch to `ahangama-01` in all three renders 4 / 4 / 0 and "no earlier run", sparklines withheld ("per-day series exist for the current run only") — honest.

No invented value found in any variant. Deduction: soft cards −1 for the "Researched" sparkline, which plots `series.businesses_seen` = 35 on all 9 days as a 170×36 area chart with an end value — a constant dressed as a trend.

## The four questions — timing (me, first look at each 1440×900 first screen, before reading the measurements)

| | Instrument | Soft cards | Statement |
|---|---|---|---|
| Eye lands first on | the blue funnel bars (researched bar 485×16 px at 332,228 — the largest saturated area) and the top KPI strip; the "Needs you" panel is one of four equal white panels, its only emphasis a 28 px/500 accent "3" at 952,153 | the filled accent card `section#needs`, 376×596 px at 1040,72 (224 000 px² of `#1F4BFF`), then the 64 px/300 "3" at 1068,164 | the 120 px/200 "3" (glyph 70×108 px at 116,96), then the accent block 440×220 at 956,96 with the 28 px sentence |
| a. What needs me? | ~3 s — third element read; names + gate + "2 d" + arrow, 3 rows in a 488 px panel | ~1 s — number, "businesses waiting on you", 3 named rows with Open | ~1 s — "3 · waiting on you · send the pitch · since 25 Sep · 2 days" + 3 name pills |
| b. Where is everything, what is stuck? | ~2 s for the counts (funnel with axis, on the first screen); "stuck" = only the "2 d" on the gate rows | > 5 s: the funnel starts at y = 692, two bars visible; needs a scroll (page 1511 px) | ~4 s: funnel columns and "3 built, none pitched" tag visible at y 700–880 of the first screen |
| c. How good is the output? | ~3 s — top-right cell "Critic mean 89.7 · 3 sites · pass 80" + 3 dots on the 80 line | ~3 s — gauge 89.7 with "pass 80" tick, second row | ~3 s — "critic mean 89.7 /100" in the rule row; the 96×6 segment bar adds nothing without hover |
| d. Money? | ~3 s — Pitched / Replies / Clients hollow 0 + the foot sentence in Needs-you | ~2 s — three hollow cards, "3 ready to send →" | ~2 s — the block sentence ("Nothing has been sent yet.") + three hollow cells |

None of the three answers "what is stuck" per business on the Overview (no days-in-state beyond the gate rows); all rely on the Pipeline. Instrument is the only one that answers all four without scrolling; Soft cards puts question b under the fold; Statement's order (a, then d, then b, then c) is the brief's order.

## Craft against references — located gaps

Reference measurements (digit height on the capture → font size scaled to 1440): Shopeers KPI "16,431" 15 px → ~36 px bold, label ~13 px, card ~137 px tall; Nodus "1,395" 55 px → ~100 px light; Mondly "24,9" 32 px → ~60 px; Logip "18" 12.5 px → ~22 px; Sypher "95.1%" 9 px → ~17 px, label 9 px tracked caps, rows 33 px on the capture → ~44 px at 1440; NexaFlow "₹85L" 17.5 px → ~40 px; FinGuard block sentence cap 16 px → ~30 px; R. AI Ops "2.7M" 15 px → ~26 px; Nexus "12,450" 12.5 px → ~30 px.

**Instrument** (measured: KPI numerals 20 px/500, labels 11 px, panel radius 8, panel gap 12, panel padding 16, table rows 32 px, no shadow, no border; funnel 668×214 with bars 16 px at 28 px pitch and a 0/10/20/30 axis; barcode 114×24, 10 px bars).
- Closest of the three to its references: Sypher's skeleton (cells divided by rules, tidy 32 px tables, pill tabs) is there; the funnel with axis and count/% columns is the best-drawn chart in the set.
- Three empty KPI cells (Pitched / Replies / Clients, x 641–1240, y 100–130) each hold a two-line 11 px grey sentence; Sypher never puts prose in a KPI cell (label, value, delta, chart).
- Needs-you rows carry three accent treatments each (accent link, accent pill, accent arrow chip) = 12 accent items in 488 px (x 944–1416, y 220–312); Sypher keeps table text ink and one coloured element per row.
- Nothing on the screen ranks question a first: the 28 px "3" competes with a 485 px blue bar.
- Panel titles 15 px/600 over 13 px body (declared deviation); Sypher's ~21 px at 1440.
- Radius 8/4 vs §5's 12–20: declared (concepts §A, notes deviation 4). 1024: sidebar to a 56 px rail, Needs-you first, KPI 3×2, no overflow (1024/1024) — good.

**Soft cards** (measured: KPI numerals 44 px/300, big 64 px/300, labels 13 px/700, card radius 20, gap 24, padding 28, shadow `0 1px 2px .04 + 0 8px 24px .06`, cards 235 wide × 307 / 265 tall, feed items 105 px, funnel 696×420 with 32 px bars at 60 px pitch, legend rows 44 px, h1 28 px/700).
- Card system (radius 20, gap 24, one soft shadow, 240 px sidebar with 15 px labels) matches Logip within a few px; the accent card is NexaFlow's single filled card, done deliberately and well.
- KPI cards are 307 px tall for one 44 px numeral: Shopeers' KPI card is ~137 px at 1440. The three empty cards are 50–60 % grey prose (4–5 lines of 13 px, x 524–1016, y 100–380); Shopeers has one 10 px grey line.
- Numerals 44 px light are larger than any KPI reference (Shopeers ~36 bold, Logip ~22, NexaFlow ~40) while carrying no delta pill except on Researched — the anatomy the concept took from Shopeers appears once.
- The funnel (the biggest chart) starts at y = 692; Logip's chart sits in the first screen.
- "Researched" 170×36 sparkline of a constant (see Data honesty).
- Feed items 105 px with 2-line notes vs Logip's ~72 px rows at 1440; 6 items fill 772 px.
- Tooltips fade in over 120 ms (`.tip{transition:opacity .12s}`); §5 says hover states are instant.

**Statement** (measured: numeral 120 px/200 with 12 px caption 10 px under; block 440×220 radius 16, sentence 28 px/400 two lines, sub 13 px; KPI row 32 px/200 numerals, 12 px labels, rules above/below, gap 32; funnel 1280×256, columns 120 wide, 32 gap; activity rows 44 px; page 1601 px tall).
- The Nodus statement is faithful: 120 px light numeral (Nodus ~100 at 1440) with a tight caption; FinGuard's block at 28 px (FinGuard ~30) with the white pill button; the funnel's black leader tag is FinGuard's.
- The one saturated element in the funnel is the smallest: "built 3" is a 120×15 px slab at 572,861 under 120×170 tint columns. The linear scale is honest (declared, notes deviation 4) but the eye reads "big pale, small blue"; the tag carries the meaning alone.
- The KPI rule row hides two 96×20 sparklines and a 96×6 segment bar under 12 px labels; Nodus has no micro-charts in its KPI row and its small KPIs carry delta pills instead.
- The meta line "+3 vs ahangama-01 · gates open per day ⌒" (12 px + a 96×20 unlabelled line at y 354) is the least legible object on the page.
- Whitespace: 320 px statement band + 64 px section gaps push Recent activity below 900 px; Nodus keeps its table header at ~75 % of the first screen.
- The proposals pill (tint) is a fourth pill in a different colour among three white ones; its text is the AA fail.
- Rail 72 px vs §3 "left sidebar": declared (concepts §C, notes "Conflicts"); it is still a left rail with labels, the run selector moved to pills — Nodus's pattern, and a one-line switch at the gate.

## Charts — tested one datum per chart type, hover then keyboard focus, 400 ms settle

| Chart | Instrument | Soft cards | Statement |
|---|---|---|---|
| Sparkline | barcode 114×24, `<title>`, date range in the cell header, no values on the SVG; hover + focus tip "19 Sep · 0" ✓, 2 px accent ring ✓; zero days as 1 px ticks | 170×36 line, first/last date under, end value printed, hover + focus tip "19 Sep · 0" ✓ (after 120 ms), ring ✓ | 96×20 line, **no dates, no values, no axis**; only the series name beside it as HTML; hover + focus tip "19 Sep · 3" ✓, ring ✓ |
| Critic | 168×24 dots on a 0–100 track, "80" pass line + "100" tick labelled, hollow dot = verification; hover + focus tip "KA Surf Hostel · 86 · verification" ✓; 20 px ring not focusable (value beside it) | 180×104 gauge, "pass 80" tick, 44 px numeral in the mouth, focus/hover tip lists 3 sites ✓ | "89.7 /100" + 96×6 three-segment bar: widths are each score ÷ 269 (32 / 34 / 34 %) — a share of a sum that means nothing; no labels; hover + focus tip "KA Surf Hostel · 86.0 · verification" ✓ |
| Funnel | 0/10/20/30 axis, count + % of previous, 7 focusable rows, hover + focus tip ✓, ring ✓ | 7 rounded bars, count 18 px, drop "−11", % on hover + focus ✓, zero stages as dashed stubs, no axis (declared) | 7 columns, value in/above, name, "% of previous", zero columns dashed, leader tag; hover + focus tip ✓, 2 px ring ✓ |
| Station bar (Pipeline) | 9 segments × 35 rows, each focusable with a 2–3 row tip (station, date, agent version, gate) ✓; 315 tab stops | one focusable bar per row: focus tip "8 Deliver · packaged / since 25 Sep / next: send the pitch · you" ✓, per-segment tip on hover ✓ | 9 pills per row in one focusable group with ←/→; station number visible; `title` on hover only, no visible value on focus (aria only) |
| Empty states | hollow 0 + "fills on packaged → pitched · when Shahar sends the first pitch; three are ready" ✓ | hollow 0 + sentence + "3 ready to send →" (lands on Pipeline filtered to the 3) ✓ | hollow 0 + "send one of the 3 pitches" link + "appears with packaged → pitched" ✓ |
| Run 01 | funnel axis 0–4, "Nothing waits on you", sparklines withheld ✓ | "±0", no "ready to send" button, sparklines withheld ✓ | "Nothing is waiting on you in this run. It stopped at 'shortlisted'", sparklines withheld ✓ |

Judgement on the hard-fail rule "a chart without labels": statement's two sparklines and segment bar have a label (the series name) but no scale or values — labelled in the ordinary sense, so not a hard fail; it costs 3 of the 5 points deducted. All charts in all three are inline SVG with a `<title>` and `tabindex` datums; no external script, no library (2 `<script>` tags per file: the data and the page's own code).

## Accessibility and speed — measured

| | Instrument | Soft cards | Statement |
|---|---|---|---|
| Text under AA (computed on the rendered page, background resolved through ancestors) | `.nav .n` badges "35 / 3 / 46" and `.pill.grey` "review prompt diffs": `#6B7280` on `#F3F5F9` = **4.43:1** at 11 px (4 on the Overview); the same pill on 23 out-rows of the Pipeline ("shortlisted" / "scored") | Overview clean; Pipeline filter counts `.pills button i{opacity:.7}` → `#7E8691` on `#F5F7FB` = **3.43:1** at 13 px (×4) | `.pill.tint .kind` "review prompt diffs": `#6B7280` on `#EEF1FF` = **4.30:1** at 14 px (Overview) |
| Keyboard, Overview | 85 stops, cycle returns, every stop has a visible ring (2 px accent outline or the datum's `.hit` stroke); tab strips move with ←/→ and keep focus | 31 stops, all ringed; native selects show the ring on the pill wrapper (`:focus-within`) | 43 stops; charts, pills, menu, radiogroup and tablist all ringed; 10 activity rows show a 3 px inset accent bar + `#F2F4F8` band only |
| Keyboard, Pipeline | 390 stops (315 are station segments) — usable, heavy | 49 stops | 80 stops; 35 rows with the inset bar only; ←/→ walk the 9 pills |
| Reduced motion | final values at 60 ms ("3, 3, 0, 0, 0, 89.7"), 0 animations | same ("3, 0, 0, 0, 35, 3") | same ("3, 3, 3, 89.7, 35") |
| Motion default | counting at 120 ms ("1, 1, 37.7"), 0 running animations after 4 s | counting ("2, 19") · 0 after 4 s | counting ("2, 48.4, 19") · 0 after 4 s |
| Requests / console errors | 1 / 0 | 1 / 0 | 1 / 0 |
| Bytes before data (total) | 101 751 (355 226) | 81 911 (335 081) | 87 358 (340 528) |
| Font / tabular figures / uppercase | IBM Plex Sans, 93 numeric nodes all `tabular-nums`, 0 uppercase | Manrope, 59 / 59, 0 | Geist, 58 / 58, 0 |
| Overflow 1440 / 1024, both views | 1440/1440 · 1024/1024 | 1440/1440 · 1024/1024 | 1440/1440 · 1024/1024 |

## Top 5 fixes

**Instrument**
1. Contrast: `.nav .n` and `.pill.grey` set `#6B7280` text on the `#F3F5F9` ground (4.43:1, 11 px) — 4 elements on the Overview, 23 on the Pipeline. Use `--ink2` `#4B5563` (6.9:1) or a white pill.
2. Rank question a first: the Needs-you panel has no more weight than the funnel (28 px "3" vs a 485×16 px accent bar). Give the panel the one saturated treatment on the screen (tint ground or 3 px accent top rule) or swap it to the left column.
3. Empty KPI cells (x 641–1240): replace the two-line 11 px sentences with one line ("fills on packaged → pitched") and move "earliest" to the title, or merge Pitched · Replies · Clients into one cell while all three are 0.
4. Barcode sparklines: print the first/last day under the bars and the current value at the right (Sypher's ▾ marker); today the SVG has 0 visible labels and the range lives in the cell header.
5. Needs-you rows: one accent affordance per row (the arrow); name in ink, gate pill grey while all rows share the same gate. Also: 315 station tab stops on the Pipeline — one stop per bar with ←/→ inside (statement's pattern).

**Soft cards**
1. Contrast: `.pills button i{opacity:.7}` makes the filter counts 3.43:1 (13 px) on the Pipeline; drop the opacity or set `--ink2`.
2. Question b is under the fold: the funnel starts at y = 692 in a 900 px viewport. KPI cards are 307 px tall for one 44 px number (Shopeers ≈ 137 px); cap them near 180 px and the funnel rises ~250 px.
3. The three empty cards carry 4–5 lines of 13 px grey prose plus "no earlier run to compare"; keep one grey line + the "3 ready to send →" button, put the transition in `title`.
4. "Researched" sparkline plots the constant 35; use the delta pill alone or plot `series.ledger_lines` (152 / 22 / 12 / 52 / 77 / 0 / 4 / 0 / 0), a real series.
5. `.tip{transition:opacity .12s}` → instant (§5); and print the per-segment station tooltips on keyboard focus too, not only the bar summary.

**Statement**
1. Contrast: `.pill.tint .kind` "review prompt diffs" is `#6B7280` on `#EEF1FF` = 4.30:1 at 14 px; use `--sec` `#4B5563` (7.0:1) or a white pill like the other three.
2. Label the micro-charts: the two 96×20 sparklines and the 96×6 segment bar show no dates, values or scale. Print first/last day and the end value (13 px) beside the sparklines; replace the segment bar (scores as shares of their sum) with three labelled dots on a 0–100 track with the 80 line (instrument's drawing).
3. Funnel: the only accent element is a 120×15 px slab ("built 3"); either carry the count into the tag ("3 built of 35 · none pitched") or make the highlighted column the one needing action (pitched 0, dashed accent). Keep the linear scale.
4. Keyboard: 35 Pipeline rows and 10 activity rows are tab stops whose only indicator is a 3 px inset bar on the first cell; add the 2 px accent outline every other control uses (`outline-offset:-2px`).
5. First screen: band padding 40 → 24 and KPI row padding 22/24 → 16 bring the funnel base above 900 px; drop or enlarge the 12 px "+3 vs ahangama-01 · gates open per day" meta line (least legible element on the page).

## §5 items each variant bent, and whether the concept declared it

| Bend | Declared? |
|---|---|
| Instrument radius 8 / 4 vs §5 cards 12–20 px | Yes — concepts §A "Radius 8 (panels), 4 (chips)", notes.md deviation 4 (§6 "low radius" vs §5). A deviation, not an oversight. |
| Instrument panel titles 15 px outside its 11/12/13/20/28 scale | Yes — notes.md deviation 1. |
| Soft cards: one filled accent card vs §5 "cards: white" | Yes — concepts §B (NexaFlow's single filled card), notes.md. |
| Soft cards: 120 ms tooltip fade vs "hover states are instant" | No. |
| Statement: 72 px rail vs §3 "left sidebar" | Yes — concepts §C "Sidebar" paragraph, notes.md "Conflicts" (fold into a Nodus top bar is a one-line change at the gate). It is still a left rail with labels. |
| Statement: two decorative 1 px white rings in the accent block | Not declared; not a gradient, FinGuard's block has the same rings. |
| All three: hollow "0" at 1.82:1 | Yes — concepts §2 (shared empty-state component). |
| All three: one font, self-hosted, `tnum` on every number, no caps labels, no 01/02 numbering, < 300 KB before data, data embedded once, inline SVG only | Compliant, measured. |

## Notes

- Look loops: instrument 5 rounds (Pipeline drawn in round 1, declared as deviation 6; rounds 1–3 judged on the Overview), soft cards 5 rounds (Pipeline first looked at in round 4), statement 6 rounds (Pipeline in round 4; round 6 changed state shots, not the sheets — the designer says so). Each round's log names concrete, measured differences; no hollow rounds.
- `data.mjs` observations, not mockup faults: `deltas.needs_you.previous` = 0 for run 01 because its 4 shortlisted rows classify as `superseded`, so "+3 vs ahangama-01 (0)" appears in all three; `gates[3]` (proposals) has `since: null`, so no age is shown anywhere; KA's `copy_rounds` is 8 (concepts.md's "10" was a miscount).
- Instrument's Pipeline "Critic" column prints KA's 86 without saying it is a verification, not a round; the Overview dots do.
- Statement's `dist/pipeline.html` is a 179-byte meta-refresh so `tools/shoot.mjs` can shoot the Pipeline; harmless.

## Sheets for the gate

- Contact sheet, three Overviews side by side at 1440 (full page, top-aligned): `dashboard/mockups/overviews-1440.png` (4480×1697).
- Instrument: round 1 `dashboard/mockups/instrument/shots/round-1/desktop-sheet.png` → final `dashboard/mockups/instrument/shots/round-5/desktop-sheet.png` (Pipeline: `round-5/pipeline-1440.png`).
- Soft cards: round 1 `dashboard/mockups/soft-cards/shots/round-1/desktop-sheet.png` → final `dashboard/mockups/soft-cards/shots/round-5/desktop-sheet.png` (Pipeline: `round-5/w1440-pipeline-sheet.png`).
- Statement: round 1 `dashboard/mockups/statement/shots/round-1/desktop-sheet.png` → final `dashboard/mockups/statement/shots/round-6/desktop-sheet.png` (Pipeline: `round-6/pipeline/desktop-sheet.png`).
