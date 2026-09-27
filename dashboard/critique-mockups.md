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

---

# Final build — Soft cards (BRIEF §9 final critic pass)

Critic, 2026-09-27 evening. Under review: `dashboard/mockups/soft-cards/dist/index.html` + `dist/img/*.png` as committed in 6d69d18 (designer rounds 6–8, purple lead accent per the BRIEF amendment). Measured in headless Chromium at 1440×900 and 1024×768 on all five views; scripts and `final-audit.json` in the critic scratchpad. Screenshots: `dashboard/mockups/soft-cards/final-1440-{overview,pipeline,sites,agents,decisions}.png` (full page, 1440 wide).

**Verdict: PASS — 86/100, no hard fail.** One condition before it is used as a tool: fix 1 below is a data-layer error that puts a number on the Agents page the ledger does not support.

| Dimension (weight) | Score | One-line evidence |
|---|---|---|
| Data honesty (25) | 22 | every Overview, Pipeline, Sites and Decisions value traced to `data.json` and to raw ledger lines / CHANGELOG headings; the critic card's "Overrides 4" is the copyeditor's 4 overrides attached to the critic by `data.mjs` (ledger has 0 critic overrides) |
| The four questions (25) | 23 | a 1 s, b 3 s (funnel now on the first screen), c 2 s + the Agents glance chart shows copyeditor 5 / 2 / 1 = 8 at once, d 2 s |
| Craft against references (25) | 20 | Shopeers KPI anatomy landed (199 px cards); the purple made the accent card heavier and Decisions/Sites over-coloured; Sites thumbnails are contact sheets with a magenta grid |
| Charts (15) | 13 | every chart labelled, hover + focus value on all five views; "max" highlight on an all-equal column chart; "pass" label hidden under the last dot |
| Accessibility and speed (10) | 8 | 0 text pairs under AA on any view (lowest real 4.51); 107 283 B before data; 4.04 MB of site PNGs on Sites; Sites nav button drops focus after Enter |
| **Total** | **86** | |

Hard fails: none. Contrast ≥ 4.5:1 for all text on all five views at both widths (the only sub-AA element is the shared hollow "0" outline, `#C3ACF3` on white 2.0:1, a shape with the value in `aria-label`, as before). No invented number. No chart without labels. No chart library (2 `<script>` tags: data + page code; 0 external `src`/`href`).

## Staleness of the embedded data

The dist embeds `data.json` generated 13:13:29 UTC (byte-identical after normalisation). The ledger has since gained 5 lines (323–327: designer `mocked`, critic `critiqued`, human `picked`, human `proposal:approved`, designer `built`) and `proposals/dashboard-01/001-control-layer-gates.md`. No business line changed, so every KPI, funnel, Pipeline, Sites and Agents number is current. Stale: Recent activity (misses the 5 dashboard-01 lines), "322 ledger lines" (327), and "6 proposals to review" (7 files now, one of them approved). `data.mjs` does not yet read the new `proposal:approved` line shape (it marks every proposal "no merge record"), so a regeneration alone would show 7 unmerged — a one-clause addition in `readProposals()`. It does not affect the verdict.

## The five B fixes — did they land?

| Fix asked | Measured now |
|---|---|
| 1. Filter counts at 3.43:1 | `.pills button i{color:var(--ink2)}`: `#4B5563` on `#F5F7FB` = 7.05:1 (31 text nodes on Pipeline). Landed. |
| 2. Funnel under the fold; KPI cards 307 px → ~180 | Funnel card top y = 544, header y = 572 (was 692); Researched → Pitched bars visible above y = 887 in a 900 px viewport. KPI cards 235×199 (row 1) and 235×225 (row 2), down from 307/265; the 376×448 Needs-you card sets the row, so 180 is not reached. Landed, short by ~20 px. |
| 3. Empty cards with 4–5 lines of prose | Hollow 0 + one 13 px line ("fills on packaged → pitched") + the "3 ready to send →" pill; transition and earliest date in `title`. Landed. |
| 4. Constant-35 "Researched" sparkline | Gone; the card shows "35 · ▲ +31 vs ahangama-01 (4)". The real `gates_open` series (3,1,1,0,0,0,3,3,3) is a 130×32 white sparkline in the accent card with 19 Sep / 27 Sep and the end value 3. Landed. |
| 5. 120 ms tooltip fade; segment tips on keyboard | `.tip,.tipdot{opacity:0;pointer-events:none}` — no transition. Station bar: focus shows the current segment's own tip ("8 Deliver · reached 25 Sep · current · packaged"), ←/→/Home/End walk the nine with a polite live region; one tab stop per row (35 on the Pipeline, was 49 incl. controls). Landed. |

## Data honesty — trace (final build)

- **Overview**: identical numbers to the mockup pass (35 / 24 / 10 / 3 / 0 / 0 / 0; 3 live; 3 gates since 25 Sep · 2 days; 89.7 = (86 + 91.5 + 91.5)/3; +31 vs 4; sparklines `live_sites` and `gates_open` recomputed from the raw lines); "+3 vs ahangama-01" from `deltas.needs_you`; "Also 6 proposals to review" from `gates[3]` (stale, above).
- **Pipeline**, 8 rows re-read: KA / Layday / Lavish "8 Deliver · since 25 Sep · send the pitch · You · 2 days" (lines 318–320); Bappa, Boardwalk, Good Story, Surf Front "2 Shortlist · last there 19 Sep · dropped · 7 days" with the last note verbatim (lines 121, 136, 114, 130); Dad And Sun "not approved · score <= presence_threshold 2 · 8 days" (line 39). Presence n/5 per row = the `scored` note.
- **Sites**: KA 86 · PASS · verification · 23 Sep · 3 rounds, 3 verifications; chart R1 73 / R2 72 / R3 92 / V1 92 / V2 93 / V3 86 = critic lines 206, 218, 230, 238, 241, 315 (tooltip dates 22/22/22/22/23/23 Sep match). Layday 91.5 · round 1 · 23 Sep = line 293. Lavish 91.5 · round 2; R1 70 / R2 91.5 = lines 296, 310. "deployed 25 Sep · CMS verified" = `sites/<slug>/deploy.json` (last ok deploy 25 Sep 07:52–07:53, verify ok). Preview hosts `ka-surf-hostel`, `layday-surf`, `the-lavish-haven` and proposal hosts `*-proposal` = `deploy.json` / `pitch/wrangler.jsonc`. "Final vs picked: no sheet on disk for this site" for KA and desktop + mobile for the other two = `final/shots/final-vs-picked/` on disk. Critic report and the 3 pitch drafts per site = files on disk. Thumbnail caption "first sheet · round-1 / 4g-round-1" = `shots.first`.
- **Agents** (`agents{}` vs my recompute from the raw ledger, all 13 agents): copyeditor 8 passes / 8 fails / 18 lines, fails KA 5 · Lavish 2 · Layday 1 (lines 180, 183, 210, 220, 223 / 252, 275 / 276), rounds per pass 1, 4, 3, 1, 2, 1, 3, 1 (passes at lines 143, 213, 226, 146, 286, 149, 284, 300), mean 2.0; critic 7 / 3 / 15, fails KA 2 · Lavish 1 (206, 218 / 296), rounds per pass 5, 1, 1, 1, 3, 1, 3, mean 2.1; scout 35 / 0 / 94, every pass 2 lines; designer 25 / 0 / 39 (one pass of 5); harvester 13 / 0 / 22 (one pass of 2); the 8 agents without a pass/fail state show their line counts (aiseo 6, copywriter 22, creative-director 6, deployer 11, humanizer 15, orchestrator 5, seo 8, writer 0) — all equal to the ledger. Version pills: `run.yaml` pin = highest `**x.y.z**` heading in each `agents/*/CHANGELOG.md` for all 13 (copyeditor 0.3.0, critic 0.3.2, designer 0.3.4, copywriter 0.3.1, creative-director 0.2.3, orchestrator 0.2.1, rest 0.2.0 / harvester 0.3.0); the CHANGELOG line shown is that heading's line. "11 fails across 2 agents" = 8 + 3.
  - **The one wrong number:** both the copyeditor and the critic card show "Overrides 4" and list the same four lines (184, 254, 277, 278). All four are Shahar's answers to copyeditor (4c) fails; the ledger has no critic override (KA passed the critic in round 3 without one). `data.mjs` line 357 attaches every override line to both agents (`.filter(() => name === 'copyeditor' || name === 'critic')`). The page renders `data.json` faithfully, so this is a data-layer defect — but it is a false statement about the critic on screen.
- **Decisions**: 46 items = 46 human business lines; "17 gates" = lines whose `from_state` is a gate state and changed; "4 overrides" = the four lines above. First 10 entries (newest first) = ledger lines 302, 303, 297, 277, 278, 279, 264, 263, 258, 254 — timestamps, transitions and notes verbatim; the gate tag text ("approve the shortlist", "pick a mockup") = `gate_states[from]`. Proposals card: 7 files, "6 without a merge record" (the `-APPLY.md` is an application record) = `proposals/` at 13:13.

## The four questions — re-timed (1440×900, first screen)

Eye lands on the purple Needs-you card (376×448 px at 1040,72), then the 64 px/300 "3" at 1068,160. a: ~1 s (three names, "send the pitch · since 25 Sep · 2 days", Open). b: ~3 s — the funnel header sits at y = 572 and five bars are on the first screen; "stuck" is still only the Pipeline's days column. c: ~2 s (gauge 89.7 · pass 80 at y ≈ 348); on Agents the glance chart answers "which agent keeps failing" in ~2 s: `copyeditor ▇5 ▇2 ▇1 = 8`, `critic ▇2 ▇1 = 3`, the legend line "copyeditor: KA 5 · Lavish Haven 2 · Layday 1" under it, then the copyeditor card with Fails 8 in red and the chips KA 5 / Lavish Haven 2 / Layday 1 — the brief's "visible at a glance" is met. d: ~2 s (three hollow zeros + "3 ready to send →").

## Craft against references — what the purple did, and the new views

- Purple `#6A2FE0` is darker than the blue it replaced (6.78:1 vs 5.99:1 on white), so the one filled card now reads as the heaviest object on the page; NexaFlow's filled card is a lighter violet. Acceptable at Overview scale (one card + badge + logo), but the accent multiplies on the new views: Decisions carries 26 purple "Show the full reason" buttons, 17 purple gate dots and ~20 purple tags in one 5 493 px column; Sites puts 13 blue links (`--blue` for links is the "touch of blue") next to purple pills, arcs and lines, so two accents compete on every card. Logip's feed uses one accent per row.
- Overview: KPI cards 235×199 with 40 px/300 numerals, the sparkline beside the number (Shopeers' anatomy), one 13 px grey line — the row now matches Shopeers' proportion (card ≈ 137 px at 1440; ours 199). Funnel and activity cards align at 772 px.
- Sites (Shopeers card + 23andMe hairline rows): 368×762 cards, 16 px image inset, 44 px score, verdict line, 312×110 score chart with a 60/80/100 axis, dashed pass line, filled round / hollow verification dots and R/V labels, then five 19 px key–value rows. Clean. The thumbnail is the 3×3 contact sheet on its magenta ground cropped 16:10 — nine tiny pages with pink rules instead of one screenshot; Shopeers' product image is one object.
- Agents: Logip's three-stat row (Passes / Fails / Overrides / Ledger lines, 24 px/700, hairlines), Mondly's highlighted column with the black value tag and dashed mean, NexaFlow's stacked tint bar in the glance card. The 35- and 25-column charts (scout, designer) label only the range ("KA … Wak (35 passes)"). The eight agents with no pass/fail state get 270×250 cards of near-identical text; one table would carry them in 300 px.
- Decisions: Logip's feed rhythm on a 2 px rail; 92–139 px per item, 46 items, three filter pills; the proposals card lists 7 files with kind and status. It is a 5 600 px page; the filters make it usable.
- 1024: all five views 1024/1024, Agents overflow from round 7 gone; Sites 2-up, Agents 1-up with 2-up minis, Decisions single column with proposals first.

## Charts — all five views

| View | Chart | Labels | Hover / focus value | Notes |
|---|---|---|---|---|
| Overview | sparkline 150×36 (live sites), white sparkline 130×32 (gates open) | first/last day + end value | ✓ / ✓ (ring on `.hit`) | |
| | gauge 156×88 | "pass 80" tick, 36 px numeral | ✓ / ✓ (per-site list) | |
| | funnel 696×420 | name, count 18 px, drop, dashed zero stubs | ✓ / ✓ | "3 of 35 built (9 %)" + legend 9 / 12 / 11 |
| Pipeline | 35 station bars 288×22 | "8 Deliver · since 25 Sep" under each; gate rings | per-segment tip on hover; focus = current segment, arrows walk | one tab stop per row |
| Sites | 3 score charts 312×110 | 60 / 80 / 100, "pass", R1–R3 / V1–V3 | ✓ / ✓ ("round 1 · 73 · FAIL · 22 Sep") | "pass" label drawn before the dots: hidden under V3 (86) on KA and R2 (91.5) on Lavish |
| Agents | fails chart 1096×240 | agent, value inside each segment, total, dashed empty pill | ✓ / ✓ ("KA · 5 fails · copyeditor") | business names only in the legend sentence and tips |
| | 5 rounds-per-pass column charts 508×132 | y ticks, "mean 2.0", x labels (≤ 16 columns) or a range label | ✓ / ✓ ("KA · pass on 19 Sep · 1 rounds") | max column highlighted + black tag: on scout all 35 columns are 2, the first is tagged as if it were an outlier |
| Decisions | none (timeline) | — | — | dots: purple = gate, red ring = override |

Empty states: hollow 0 + one line (Pitched / Replies / Clients), dashed empty pills for agents with 0 fails, "No built site in this run" for ahangama-01, "No decision in this range".

## Accessibility and speed — measured

- Contrast (rendered, backgrounds resolved incl. SVG rects): no text under 4.5:1 on any view at 1440 or 1024. Lowest real pairs: `#6B7280` on `#F5F7FB` 4.51 (title sub-line, 13 px), green `#1A7F37` on `#EDF7F0` 4.63, `#6B7280` on white 4.83. Purple pairs: white on `#6A2FE0` 6.78; `#6A2FE0` on white 6.78; `#6A2FE0` on `#F3EEFD` 5.96; `#EDE6FB` on `#6A2FE0` 5.59 (dates in the accent card); ink on `#A682EC` 6.26 and on `#C3ACF3` 9.38 (values inside the fails-chart segments). Blue link 5.99. Hollow "0" outline 2.0:1 (shape, as before).
- Keyboard: Overview 42 stops (skip link → 6 nav → 2 selects → 9 + 1 + 9 chart data → 4 Open → 7 funnel rows → Show all), every stop with a 2 px accent outline, the pill wrapper's `:focus-within` ring or the datum's `.hit` stroke; Pipeline 34 bars + controls; Sites 23; Agents 87 (each column of each chart is a stop: 35 for scout alone); Decisions 52 (26 "Show the full reason" toggles, 7 proposal links, filters). No stop without a ring. Enter on a sidebar button switches the view and keeps focus on the button for Overview, Needs you, Pipeline, Agents, Decisions; **for Sites the active element becomes `body`** (measured twice), so the next Tab restarts at the skip link. "3 ready to send →" lands on Pipeline with "Waiting on you 3" pressed and exactly the three rows. Decisions' toggle removes the 3-line clamp and sets `aria-expanded`.
- Reduced motion: at 120 ms every numeral is final (3, 0, 0, 0, 35, 3, 86, 91.5, 91.5), 0 animations, 0 undrawn `.pre` elements; default motion counts up once (values 2 / 21 / 46 at 120 ms) and 0 animations run after 4 s.
- Requests: 1 (the file) on Overview, Pipeline, Agents, Decisions; 4 on Sites — the file + `img/ka-surf-hostel-and-restaurant.png` 1 222 399 B, `img/layday-surf-ahangama.png` 1 015 210 B, `img/the-lavish-haven.png` 1 798 079 B = **4.04 MB** for three 336×210 px slots (1952×2048 sources, `loading="lazy"`, so nothing loads on the other views). 0 console errors on every view. Page 360 453 B, 107 283 B before data. One font (Manrope), 0 numeric nodes without tabular figures (63 / 182 / 45 / 129 / 113 per view), 0 uppercase labels.

## Top fixes (none blocking the pick; 1 blocks use as a tool)

1. **`data.mjs` line 357** — `third_fail_overrides` gives the critic the copyeditor's four override lines; match the override line's `from_state` to the agent's states (copy_failed → copyeditor, critiqued(n) → critic). The critic card then shows Overrides 0. While there: read the `proposal:approved|rejected` line shape in `readProposals()` so the proposals count and status stay honest after a regeneration.
2. **Sites images**: 4.04 MB for three thumbnails; export each `desktop-00.png` (the first tile, not the contact sheet with its magenta grid) at ≤ 720 px wide as WebP/PNG (≈ 60 KB each), keep `width`/`height`.
3. **Sites nav button** loses focus after Enter (active element = `body`); the other five keep it. Find what steals it in `go('sites')` and keep focus on the button.
4. **Column charts**: highlight the max column only when it is unique (or > mean + 1); on scout all 35 columns are 2 and the first is tagged. Draw the score chart's "pass" label after the dots or left of the axis so V3 (KA) and R2 (Lavish) do not cover it.
5. **Accent budget on the new views**: "Show the full reason" ×26 in ink or `--ink2` (purple only for the gate dots and tags); on Sites keep one blue link per card (Preview) and set the rest in ink with an underline; consider one table row per no-state agent instead of eight 250 px cards. Also: group each column chart's 25–35 datums behind one tab stop with ←/→ (the station-bar pattern) to bring the Agents walk from 87 stops to ~12.

Round-1 and final sheets for this build: `dashboard/mockups/soft-cards/shots/round-1/desktop-sheet.png` → `shots/round-8/desktop-sheet.png` (Overview), plus `round-8/w1440-{pipeline,sites,agents,decisions}-sheet.png`.

---

# dashboard-02 forms — the four gates from the page (proposals/dashboard-01/001, step 1)

Critic, 2026-09-27 evening. Under review: `dashboard/mockups/soft-cards/dist/index.html` + `dist/img/*.jpg` and `dashboard/server.mjs` as committed in 0812cd7 (designer rounds 10–11; accent `#0E34CB` per the second BRIEF amendment). Two modes, both measured in headless Chromium at 1440×900: read-only over `file://`, and live against `node dashboard/server.mjs --port 8973 --ledger <copy> --root dashboard/mockups/soft-cards/dist`, where the copy is `ledger.jsonl` (330 lines, md5 `02cf835a51d796d42b4d691aa5d7e26a`) plus six synthetic lines under `run_id test-critic-01` (`bappa-surf-school` and `hool-kabalana` `shortlisted` with no approval in that run, `layday-surf-ahangama` and `the-lavish-haven` `mocked` — both have mockup sheets on disk — and `ka-surf-hostel-and-restaurant` critiqued PASS 88 then `packaged`). The coordinator asked for three synthetic rows; the extra three let the stale path run on a pick without consuming a success path, and give the packaged row a critic score (the first run without one surfaced a page error, kept below). The real `ledger.jsonl` md5 is identical before and after every run; the server was spawned and stopped by the test script, nothing listens on 8973 afterwards. Screenshots: `dashboard/mockups/soft-cards/forms-1440-{shortlist,pick,pick-stale,pitch-empty,pitch,outcome,proposal}.png`.

**Verdict: PASS.** No hard fail: every writable line shape is one the proposal lists (approved / shortlisted-drop / picked / pitched / outcome:* / proposal:approved|rejected — the server's `DECISIONS` table has exactly those five gates and the server rejects any other gate or choice with 400); no form submits without a reason (client blocks under 3 characters with no request; the server independently returns 400); every business decision carries `expected_state`; the stale page gets a 409 with the ledger's current line and a Reload action; contrast on every live pair of the new blue is ≥ 5.4:1.

| Dimension (weight) | Score | Evidence |
|---|---|---|
| Data honesty (25) | 24 | read-only build embeds `data.json` 18:52 (328 lines): critic card Overrides 0 / copyeditor 4, proposals "6 without a merge record · 1 decided" with 001 tagged approved, Overview and Sites numbers unchanged from the final pass; live mode re-fetches `data.json` on every SSE event and the rendered rows matched the copy's last line after each decision |
| The four questions (25) | 23 | unchanged first screen in read-only (Needs-you card, funnel header at y ≈ 608); live adds one 20 px mode strip |
| Craft against references (25) | 20 | the blue is calmer than the purple (8.85:1 on white); read-only now renders dead forms on Sites (card 762 → 1063 px) and Decisions |
| Charts (15) | 13 | unchanged |
| Accessibility and speed (10) | 8 | 127 742 B before data; 1 request + 3 JPEGs (89 KB) read-only; live = page + gates + data.json + events; keyboard path complete; focus lost after a decision removes its row |
| **Total** | **88** | |

## Read-only (file://)

- Requests: `index.html` only on Overview, Pipeline, Agents, Decisions; `+ img/{ka…,layday…,lavish…}.jpg` (32 060 + 22 632 + 34 185 B) on Sites. 0 console errors on all five views; no overflow at 1440 or 1024 (1440/1440, 1024/1024 everywhere). Page 384 116 B, data tag 256 374 B, **127 742 B before data**.
- Mode strip: "read-only · open the CLI or start dashboard/server.mjs to decide"; no `gates` probe is made under `file://` (verified by the request log).
- Truth spot-check: Overview live 3 · gates 3 since 25 Sep · 89.7 · 35 · funnel 35/24/10/3/0/0/0; Sites KA 86 verification 3 rounds 3 verifications, R1–V3 73/72/92/92/93/86; Agents critic 7 / 3 / **0** / 15, copyeditor 8 / 8 / 4 / 18 — the data.mjs fix from 3375cf4 is on the page; Decisions 46 · 17 gates · 4 overrides, proposals 8 files, 001 "approved".
- Contrast, the new blue on every pair it sits on (computed on the rendered page): `#0E34CB` on white **8.85**; white on `#0E34CB` **8.85**; `#0E34CB` on `--t5 #ECEFFB` (active nav, gate pill) **7.72**; `--acc-sec #E2E7F9` on `#0E34CB` (dates and sub-lines in the accent card) **7.18**; ink `#0B1220` on `--t2 #6E85E0` (second fails-chart segment value) **5.43**; ink on `--t3 #9FAEEA` (third segment) **8.66**; `#4B5563` on `--t5` (filter counts) **6.59**; tints as series on the card: `--t4 #CFD6F5` bars carry no text; hollow "0" stroke `#9FAEEA` on white 2.16 (shape, as before). Lowest real text pair on the page stays `#6B7280` on `#F5F7FB` 4.51. Under AA only inside the **disabled** read-only forms: radio pills `#989EA7` on `#F5F7FB` 2.52:1 (12 on Sites), disabled primary buttons `#879AE5` on `#0E34CB` 3.28:1 (3 on Sites, 6 on Decisions), disabled "Reject" 3.51:1 (6) — inactive controls are exempt from 1.4.3, so not a hard fail, but they are dead weight (fix 5).
- Accent audit (elements whose colour, background, fill or stroke is `#0E34CB`): Overview 45 (the card, 4 Open pills, 18 sparkline tip-dots at opacity 0, badge, logo, 6 human discs, the "3 ready to send" link), Pipeline 25 (10 gate rings, 3 owner discs, 3 gate pills), Sites 27 (3 Preview links, 3 disabled buttons, chart lines/dots), Agents 13, Decisions 49 (17 gate dots, 19 tags, 6 disabled Approve buttons, 1 link). Purple's Decisions problem is gone (toggles and file links are ink-2 underlined); the remaining count there is gate dots and tags, which is the intent.
- Keyboard: Enter on each of the six sidebar buttons switches the view and keeps focus on the button (Sites included, the round-9 fix holds). Overview 42 stops, Pipeline 34 bars + controls, Sites 23, Agents 13 (one stop per column chart, ←/→ walk), Decisions 47; no stop without a visible ring.

## Live (server on port 8973, ledger copy)

Requests on load: `GET /`, `GET /gates`, `GET /data.json`, `GET /events` — nothing else on switching to Pipeline, Sites, Agents or Decisions (one of three loads also fetched one lazily-loaded site JPEG on the Overview; harmless). Mode strip: "live · 127.0.0.1:8973 · decisions append to the ledger". Opening a pick panel fetches the three sheets through `/files/`: 11 requests for 3 images, because the page probes `shots/round-9 … round-1/desktop-sheet.png` newest-first and Layday's newest sheets are round-6 / round-6 / round-7 — 8 × 404, each logged as a console error.

| Path, driven by Tab / Space / arrows / Enter | Request | Response | Rendered |
|---|---|---|---|
| a. shortlist · approve (Needs-you → "Decide here" → reason → Tab → Enter on Approve) | `{"gate":"shortlist","run_id":"test-critic-01","choice":"approve","reason":"…","slug":"bappa-surf-school","expected_state":"shortlisted"}` | **201** `{ts, run_id, slug, agent:"human", from_state:"shortlisted", to_state:"approved", note:"gate a: approved by Shahar via dashboard. Verbatim: \"…\""}`; the copy's last line is byte-identical to the returned line | the "last written:" strip in the mode line shows the returned JSON verbatim (string-equal); the SSE event arrived ~300 ms later and the row left Needs-you (5 → 3 rows); Pipeline row reads `approved` |
| b. pick · calm (Pipeline → "Pick a mockup" → Tab to the radio group → Space → reason → Enter on "Pick this variant") | `{"gate":"pick",…,"choice":"calm","slug":"layday-surf-ahangama","expected_state":"mocked"}` | **201** `to_state:"picked", note:"Shahar picks CALM via dashboard. Verbatim: \"…\""` | three variant cards with the newest sheet each (calm round-6 1952×1232, interactive round-6, unique round-7) and "open the mockup ↗"; after SSE the row reads `picked`, panel gone |
| stale (fresh page with `/events` blocked; a `mocked → picked` line for The Lavish Haven appended to the copy after load; then radio "interactive" + reason + Enter) | `{"gate":"pick",…,"choice":"interactive","slug":"the-lavish-haven","expected_state":"mocked"}` | **409** `stale: the-lavish-haven is now "picked", this decision needs mocked` + `current: {…the external line…}`; nothing appended | red status "409: stale: …", `ledger now: {…}` verbatim, "Reload the page data" button; Tab + Enter on it → row reads `picked`, panel gone (`forms-1440-pick-stale.png`) |
| c. pitch · empty reason (Sites → WhatsApp radio → Enter on "I sent it") | **no request** (request count unchanged) | — | red "a reason is required (at least 3 characters) — it becomes the ledger note verbatim", focus moved to the note field (`forms-1440-pitch-empty.png`) |
| c. pitch · "I sent it" | `{"gate":"pitch",…,"choice":"whatsapp","slug":"ka-…","expected_state":"packaged","date":"2026-09-27"}` | **201** `to_state:"pitched", note:"sent by Shahar via whatsapp on 2026-09-27. …"` | card re-renders as `pitched` with "Outcome · now pitched" and reply / meeting / sale / ignored |
| outcome · reply | `{"gate":"outcome",…,"choice":"reply","expected_state":"pitched"}` | **201** `to_state:"outcome:reply"` | card `outcome:reply`, "written to the ledger:" + the line under the form (`forms-1440-outcome.png`) |
| d. proposal · reject 002-pick-feedback.md (Decisions → reason → Enter on Reject) | `{"gate":"proposal","run_id":"2026-09-ahangama-02","choice":"rejected","reason":"…","file":"proposals/2026-09-ahangama-02/002-pick-feedback.md"}` | **201** `slug:"-", to_state:"proposal:rejected", note:"proposals/…/002-pick-feedback.md: …"` | after SSE: "5 without a merge record · 2 decided", 002 tagged `rejected`, its form gone |

Server refusals probed directly: unknown gate → 400 listing the five; choice outside the list (`sms` for pitch) → 400; reason "ab" → 400; `files/../ledger.jsonl` → 404 (normalised out of `/files/`), `files/ledger.jsonl` → 403 (not a readable prefix). Every one of the five form POSTs carried `expected_state`; the proposal form carries `file` and no state, as designed. Five lines were appended by the server in total, all `agent: "human"`, each returned verbatim.

Keyboard in live mode: Overview 44 stops with the two "Decide here" toggles and the Open pills, all ringed; on-accent forms use the white focus ring; the pick panel receives focus when opened (`div#pick-<slug>`), the radio group is one Tab stop with ←/→ inside; "Reload the page data" and every submit button are reachable by Tab.

## Findings

1. **`countUp(null)` throws during a live re-render.** On the first run (KA `packaged` in the test run without a critic line) the SSE refresh after the shortlist approval logged `Cannot read properties of null (reading 'toFixed')` — `renderSites` calls `countUp(num, b.critic_score)` and `fmt()` on a null score. `render()` aborts there, so Agents and Decisions are not re-rendered and `rerender()` never restores focus. Real data always has a score on a packaged row, but one null anywhere in `critic_score` takes the live page down; guard `fmt`/`countUp` for null.
2. **Proposal decisions are not guarded server-side.** A second `POST /decide` for a file that already has a `proposal:*` line returns 201 (the copy now holds `proposal:rejected` and `proposal:approved` for 002, one second apart). The page hides the form after a decision, but a stale page or a retry writes a contradiction. Refuse when the ledger already carries a `proposal:approved|rejected` line for that `file` (or require an `expected_status`).
3. **Focus after a decision that removes its row goes to `body`**: shortlist approve (row leaves Needs-you), and Reload after a 409 (panel leaves the Pipeline). The next Tab restarts at the skip link. Focus the card or the next row.
4. **Sheet probing**: 8 × 404 and 8 console errors per pick panel. Let `data.json` carry each variant's newest `desktop-sheet.png` path (data.mjs already reads `shots/` for sites), or add `GET /files/sites/<slug>/mockups/<v>/shots/latest`.
5. **Read-only renders dead forms**: 12 disabled radio pills + date + button per packaged Sites card (card 762 → 1063 px) and six disabled Approve / Reject rows on Decisions, at 2.5–3.5:1. Hide the forms when `LIVE` is false; the one-line mode strip already says how to decide.
6. **Gate a as one-by-one approvals**: the page (and `data.mjs`) treat a `shortlisted` row as an open gate only while its run has no `approved` line. After the first approval, the other shortlisted rows lose their form (Hool vanished from Needs-you the moment Bappa was approved) and read "not approved". The proposal's form is a batch ("check rows … one approve N button"); either build the batch, or keep rows open until an explicit drop.
7. Minor: the in-form "written to the ledger: {line}" confirmation is replaced within ~300 ms by the SSE re-render whenever the decision removes or changes its own form; the persistent record is the mode strip's "last written:" line (dismissable) — fine, but say so in the strip ("last written · 19:31:40"). The live Needs-you number (5 in the test run, page rule) and the sidebar badge (3, `data.json`'s count for the current run) are two different counts on one screen; the sub-line's `title` explains it, a visible word would be better.

## Top fixes, in order

1. Server: refuse a second proposal decision for the same file (fix 2) — the one path that can write a contradictory line today.
2. Page: null-safe `fmt` / `countUp` and a try/catch around each `render*()` so one bad row cannot abort the live re-render (fix 1).
3. Page: focus management after a row disappears (fix 3); hide forms in read-only (fix 5).
4. Data: newest sheet path per variant in `data.json` (fix 4); decide the shortlist batch question with Shahar (fix 6) — it changes the ledger convention, so it is a proposal, not a patch.
