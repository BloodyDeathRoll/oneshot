# Dashboard critique — `dashboard/index.html` (generated 2026-09-27T08:25Z from template.html + data.json)

Reviewed from file:// in headless Chromium at 390 / 768 / 1024 / 1440, and at 1440 with all 39 rows expanded.
Scripts, `review.json` and 60 screenshots live in the critic scratch dir (`shots/<width>-*.png`, `shots/*-focus-*.png`).

## Verdict: FAIL

One truth error. Everything else on the page is faithful to `data.json` (780 rendered values compared, 0 mismatches),
there is no horizontal scroll at any width, zero network requests, zero console errors.

## Findings, by severity

### 1. Truth — critic rounds are overstated for KA and The Lavish Haven (hard fail)

- Delivered table and the expanded info line show KA Surf Hostel "92 / 100, **5 rounds**" and The Lavish Haven "91.5 / 100, **3 rounds**".
- `ledger.jsonl`: KA has five `critiqued(n)` lines but two are Shahar's comment lines (`critiqued(1) → critiqued(1)`, `critiqued(2) → critiqued(2)`, `agent: human`); the critic wrote three rounds and the last note says "Full round 3 (last): PASS, 92/100". Lavish: 3 lines, 2 by the critic. Layday: 1 / 1, correct.
- Source: `tools/dashboard.mjs:181` — `critiques = hist.filter(/^critiqued\(\d+\)$/)` has no agent filter, unlike `copy_rounds` two lines above, which filters `agent === 'copyeditor'`. The template renders `critic_rounds` as given, so the fix is in the tool, not the template.
- Fix (one line): `const critiques = hist.filter((h) => /^critiqued\(\d+\)$/.test(h.to_state) && h.agent === 'critic');` then regenerate; the score regex already reads the last critic line.

### 2. Layout — mid-word breaks in fixed columns (medium)

`th, td { overflow-wrap: anywhere }` lets whole words split where a column is a few px too narrow:
- 768, history table inside an expanded row: Agent column is 101 px (14%) and "orchestrator" breaks as "orchestrato / r" in 5 rows of KA's history (`shots/768-hist-crop.png` shows the column; measured via Range.getClientRects).
- 1024, Status column 96 px: "superseded" renders "supersede / d" in all 4 run-01 rows (`shots/1024-biz-last-screen.png`).
- 1024, Business column 115 px: "Summer Of Surf Accommodation" renders "Accommodati / on" (`shots/1024-summer-crop.png`).
- 390, 768, 1440: no mid-word break outside URLs and slugs (which the concept allows).
Fix: keep `overflow-wrap: anywhere` only on `.c-why`, `.h-note` cells and links; give words elsewhere `overflow-wrap: normal; hyphens: manual`, and at 1024 move 2% from Why to Status (10 → 12%) and 1% to Business.

### 3. Layout — funnel headers hyphenated at 1024 (medium-low)

At 1024 the sideways funnel is 16 columns in 960 px; the soft hyphens in `HYPH` fire on 6 of them: "discov-ered", "short-listed", "ap-proved", "har-vested", "con-cepted", "pack-aged" (`shots/1024-funnel.png`; `th` widths 53–63 px). State names are identifiers, not prose; a reader scanning "con-cepted" over "3" has to reassemble the word. At 1440 nothing hyphenates.
Fix: turn the funnel sideways from 1280 instead of 1024 (`@media (min-width: 1280px)` for `.funnel-h`), or drop the `outcome:*` prefix into a second header line so the 16 columns fit unhyphenated.

### 4. Tap targets at 390 — every control is under 44 px (medium)

Measured heights at 390: filter buttons 34 px (9), search field 34 px, Expand/Collapse all 32 px, the 39 row-name buttons 20 px, the 6 Delivered links 19–39 px. 57 of 57 targets < 44 px. Nothing overlaps (name buttons are 605–625 px apart), so mis-taps are unlikely, but the brief's "works at 390" and playbook §4's 44 px rule both apply to a page the two of you will open on a phone.
Fix: under 768, `.filter, .textbtn, input[type=search] { padding: 12px 10px }` (→ 44 px) and `button.name { padding: 12px 0; margin: -12px 0 }` so the row rhythm is unchanged.

### 5. Empty-table header words run together at 390 (low)

`.stack.empty th { display: inline }` prints "Business Sent Channel Outcome Outcome date Note" as one wrapped line; "Outcome date" wraps as "Outcome / date" so the second line reads "date Note" (`shots/390-pitches.png`). Same pattern for Leads.
Fix: `.stack.empty th { display: inline-block; white-space: nowrap; margin-right: 12px }`.

### 6. "3 sites" in the Now line is `max_sites`, not a count (low)

"Run 2026-09-ahangama-02, mode test, area business (…), 3 sites, managed hosting." Today `max_sites` and delivered sites are both 3, so it reads as a fact about delivery. Fix: print "max 3 sites".

### 7. Footer "35 businesses across 2 runs" vs "Showing 39 of 39 rows" (low)

Both numbers are in the data (35 unique slugs; 39 run×slug rows, 4 of run 01 repeat in run 02). The page never says so. Fix: footer "35 businesses (39 rows, 4 seen in both runs) across 2 runs", or the count line "Showing 39 of 39 rows (35 businesses)".

## Simplicity (E)

Things a reader does not need to answer "who did we research, keep, drop and why; who did we pitch; status; what waits on Shahar; what did it cost":
- The "Reached: discovered, scored, …" sentence in every expanded panel restates the From → to column of the history table directly beneath it (39 × up to 16 words). Drop it.
- "Ledger lines N" in the panel info line is a row count of the table that follows. Drop it.
- The Run column short form "02" on 34 of 35 current-run rows; the run filter already scopes the table. Keep the column only when more than one run is shown, or rely on the filter.
- The Type column is "—" on 32 of 39 rows (only harvested businesses carry a dossier type). Truthful, and the brief asks for type, so keep it; but note the column earns 8% of the width for 7 values.
Nothing else on the page is decoration: no icons, images, charts or panels.

## Checked and found correct

- **Truth vs data.json** (1440, all rows expanded): Now line; 3 gates (name, gate, since, days); Delivered ×3 (name, preview href, proposal href, score, hosting, CMS, deployed, "not sent"); the lead "3 sites are live. No pitch has been sent."; funnel ×16 in both the vertical and the sideways table; "Showing 39 of 39 rows"; row order = data order; filter labels and counts; 12 businesses across all five groups (KA, Layday, Lavish; Bappa, Boardwalk, Kasuns Place, Surf Front; Licuala, Sun And Surf Rest; Dad And Sun, Yathis; Lavish run 01): name, slug, type, run title, presence, ratings (platform, score, count), status word + label, why short/full, provenance, changed + days, expanded info line, found-via href, reached, and every history row (ts, from → to, agent + version, note, human bold) — 780 comparisons, 0 mismatches; 46 decisions (ts, resolved name, slug + run, from → to, full note) and their newest-first order; pitches/leads empty sentences verbatim from the concept; expenses two sentences with the 2,000,000 budget; footer totals (320 lines, 46 decisions, 35 businesses, 2 runs); the one correction in full.
- **Truth vs ledger.jsonl** (6 businesses): KA, Layday, Boardwalk, Licuala, Dad And Sun, Lavish-01 — line counts, last note verbatim, last ts, presence from the `scored` note, human-line counts, critic score, hosting mode; funnel counts recomputed from the ledger (35/35/24/12/10/3/3); deploy timestamps and preview URLs from `sites/<slug>/deploy.json`; proposal Worker names from `pitch/wrangler.jsonc`. Only the critic-round count (finding 1) disagrees.
- **Layout**: `scrollWidth == innerWidth` at 390/768/1024/1440 and at 1440 expanded (page heights 32,796 / 17,605 / 12,903 / 10,371 / 45,411 px); no element's right edge past the viewport; no overlapping text boxes (the one detector hit at 390 was inline `th` wrapping, finding 5); gutters 16/24/32/32 px, content capped at 1360 px at 1440; Why column 307 px (32%) at 1024, 518 px (40%) at 1440; funnel vertical below 1024, sideways from 1024; delivered/decisions stacked below 1024; businesses 5 columns + why-row at 768, 8 columns from 1024, stacked at 390.
- **Contrast** (computed): ink #111417 on #F5F7F9 17.21:1; grey #66707A 4.70:1; accent #C7360D 4.94:1; white on accent 5.30:1; white on ink (active filter) 18.48:1.
- **Accent**: the only element carrying #C7360D anywhere (colour, background, border, outline) is the 3 px left rule of the Waiting on Shahar table. No `.status-gate` renders because no business is in group `gate`; the three `packaged` rows are `delivered` by the data model and appear in the gates table, as the concept allows.
- **Interaction, keyboard only** (390 and 1440): Tab order = Delivered links, run filters, status filters, search, Expand/Collapse, row names, panel links; Enter and Space toggle filters (`aria-pressed` flips, count updates, hash written); typing filters live; Escape in the search field clears it and the hash; `#run=…&group=not_approved&q=surf` restores 11 rows, the pressed buttons and the field, and survives reload; `hashchange` re-renders; Enter/Space on a name opens the panel (`aria-expanded`, `hidden`, 6 history rows), focus stays on the name; Tab enters the panel's links; Escape from inside the panel closes it and returns focus to the name; Escape on the name closes; Expand all opens 39, open state survives a filter round-trip, Collapse all closes 39; "No business matches." and "Showing 0 of 39 rows" on an empty result; "matches a ledger line" appears on history-only hits (search "Lighthouse NOT run": 3 rows, 3 marks). Focus ring: 2 px solid ink, offset 2 px (3 px on names), present on `:focus-visible` after Tab and absent after a mouse click (`shots/390-focus-filter.png`, `shots/1440-focus-open.png`).
- **Reduced motion**: with `prefers-reduced-motion: reduce` and without, 0 elements have a transition or animation; nothing to switch off, as the template's comment says.
- **Hygiene**: 1 request (the file itself), 0 console errors or warnings, `index.html` 229,499 bytes (data 190 KB minified, template 39 KB); no `http(s)://`, `@import` or `url(` in the template; favicon `data:`; no `<img>`/`<svg>`. Default-look scan over every element: 0 border-radius, 0 box-shadow, 0 background-image, 0 `text-transform: uppercase`, 0 letter-spacing, one font stack (`system-ui, …`), grounds #F5F7F9 and the active-filter ink only; no middle dots, no arrows on links (the 93 "→" are the From → to cells the concept specifies), no section numbering.

## Verification — round 2 (regenerated 2026-09-27T08:39Z; `tools/dashboard.mjs:181` now filters `agent === 'critic'`; template changes at lines 60–61, 76–81, 98–108, 131–133, 293, 464–468)

### Verdict: PASS

Re-checked at 390 / 768 / 1024 / 1280 / 1440, each closed and with all 39 rows expanded (`shots/v2/`, 38 files).

- **Truth, critic rounds**: page now shows KA "92 / 100, 3 rounds", Layday "91.5 / 100, 1 round", Lavish "91.5 / 100, 2 rounds" (Delivered table and panel info lines); ledger critic-written `critiqued(n)` lines: 3 / 1 / 2, last notes "Full round 3 (last): PASS, 92/100", "Full round 1: PASS, 91.5/100", "Full round 2: PASS, 91.5/100". Match.
- **Mid-word breaks** (letters-only tokens ≥ 4, outside URLs/paths/slugs): 0 at every width, closed and expanded. `th, td` are `overflow-wrap: normal; hyphens: manual`; `anywhere` only on Why, note cells, links, `.sub`, `.info`. "orchestrator" at 768 (Agent 101 px), "superseded" and "Accommodation" at 1024 (Status now 12%, Business 13%, Why 30%) each sit on one line (`shots/v2/768-exp-hist.png`, `1024-summer.png`, `1024-biz-last.png`).
- **Funnel**: vertical two-column table at 390–1024 (`funnel-v: table, funnel-h: none`), sideways from 1280 (`1280-funnel.png`: all 16 state names unhyphenated on one line each; same at 1440).
- **Tap targets at 390**: minimum heights now 44 px for every kind — filters ×9, search field, Expand/Collapse ×2, row-name buttons ×39, links ×6 (×45 expanded); 0 overlapping hit boxes among names, links and controls; row pitch unchanged.
- **Now line**: "Run 2026-09-ahangama-02, mode test, area business (The Lavish Haven, Ahangama, Sri Lanka), up to 3 sites, managed hosting."
- **Footer**: "Generated 27 Sep 2026 08:39 UTC from 320 ledger lines, 46 human decisions, 35 businesses across 2 runs (39 rows: 4 seen in both runs)." — 39 − 35 = 4, correct.
- **scrollWidth == innerWidth** at all five widths, closed and expanded; 0 elements past the right edge. **Console**: 0 errors/warnings ×10 loads. **Requests**: 1 (the file), 0 external. Accent still only on the gates rule. `index.html` 229,545 bytes.

### Remaining, low (not blocking)

- **Empty-table header row hidden below its table's breakpoint.** Round-1 finding 5 asked for `inline-block; nowrap` on the empty heads; instead the `.empty thead` override was removed, so at 390 Pitches and Leads show heading + sentence only (thead 0 px; `shots/v2/390-pitches.png`, `390-leads.png`), and Pitches also at 768 (it is `.wide`, so hidden below 1024). Concept §6: "keeps its heading, its table header row so the shape is visible". Fix: restore `.stack.empty thead, .wide.empty thead { display: block }` with `th { display: inline-block; white-space: nowrap; margin-right: 12px }`.
- Pitches empty header at 1024 is 53 px (two lines) because "Outcome date" wraps in its 12% column; one line at 1280+. Cosmetic.
- Simplicity items from round 1 ("Reached:" line, "Ledger lines" count) are unchanged; 39 `.reached` lines rendered when expanded. Not required by the brief; left to the designer.
