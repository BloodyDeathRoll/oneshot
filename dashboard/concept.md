# Dashboard concept — the ledger, read as a page

One concept, for `dashboard/template.html`. Built by the designer from `dashboard/data.json`
(model: `tools/dashboard.mjs`). Internal tool for two people, read daily, offline, from file://.

## 1. The one idea

**A register.** The page is `ledger.jsonl` made readable: one column of tables under plain
headings, in the order a reader asks the questions (where are we, what did we deliver, what
did we look at, what did we decide, what did it cost). Nothing on the page is decoration and
nothing is a summary that cannot be traced to a line: every count, word and date on it is a
field of the JSON, and every business row opens to the ledger lines it was computed from.
The only colour is the one that says "this waits on Shahar". Today nothing does, so today
the page is black on cool white, and that is the honest state.

## 2. Section order

Each section is a heading, one sentence of context at most, then a table. Sections are
separated by a 1px black rule above the heading. Field names below are `data.json` paths.

1. **Now** — one line, not a table: `run.run_id`, `run.mode`, `run.area_mode` with
   `run.anchors[0]`, `run.max_sites` sites, `run.default_mode` hosting. Beside it, in grey:
   generated `generated_at`.
2. **Waiting on Shahar** — `gates[]`: name, gate, since, days. This is the only place the
   accent lives (see §5). Empty today: the single sentence "Nothing waits on Shahar." in ink,
   no accent anywhere on the page.
3. **Delivered** — the businesses with `group = delivered`, one row each: name, preview
   (`preview_url`, the address as the link text), proposal (`pitch.proposal_url`), critic
   (`critic_score` over 100, `critic_rounds` in grey), hosting (`hosting_mode`), CMS
   (`cms_verified` → "verified" / "not verified"), deployed (`deploy.deployed_at`), pitch
   (`pitched_at` null → "not sent", in ink). The words "pitch not sent" appear once more in the
   sentence under the heading: "Three sites are live. No pitch has been sent."
4. **Funnel, current run** — `funnel[]` as one table: state in the first column, count of
   businesses that reached it in the second, in pipeline order. Zeros are printed as 0 in
   grey, never blanked. At 1024 and up the same table turns sideways: one row of states over
   one row of counts. No bars.
5. **Businesses, all runs** — `businesses[]`, the main table (§3). Filters and search above it.
6. **Decisions** — `decisions[]`, newest first: when, business (`slug`, resolved to the name
   where the slug is in `businesses[]`), from → to, note in full. Every row is Shahar's.
7. **Pitches and outcomes** — rows for businesses with `pitched_at` or `outcome`; empty today (§6).
8. **Leads** — `leads[]`; empty today (§6).
9. **Expenses** — `expenses`; `tracked: false` today (§6).
10. **Footer** — `generated_at`, `totals.ledger_lines`, `totals.human_decisions`,
    `totals.businesses_all_runs` across `runs[]`; then `corrections[]` in full under the
    sub-heading "Corrections to the ledger": date, agent, note.

## 3. The businesses table

Sorted as `data.json` delivers it (current run first, furthest state first, then slug).

| Column | Field | Reads as |
|---|---|---|
| Business | `name`; `slug` under it in grey 13px | The name is the expand button. |
| Type | `type` | `beach_lodging` → "beach lodging"; null → an em dash in grey. |
| Run | `run_id` | Short form after the first row of each run: "02", "01"; full id in the run filter. |
| Presence | `presence` | "1 / 5"; null → dash. |
| Ratings | `ratings{}` | One platform per line: "Google 4.8" then the count in grey "42". Nothing is rescaled; Google is out of 5, Booking and Hostelworld out of 10, and the page does not say so — the number is quoted as the platform prints it. |
| Status | `group`, `label` | The one plain word from §4; `label` under it in grey when it adds something ("built + deployed, pitch not sent"; "scored above threshold"). |
| Why | `why` | See below. |
| Changed | `last_change`, `days_since_change` | "25 Sep" over "2 d" in grey. |

**How "why" reads.** `why` is the last ledger note, verbatim, never rewritten. Closed, it
shows the first sentence (cut at the first full stop after 40 characters, or at 160
characters with an ellipsis, whichever comes first). Under it in grey 13px, provenance from
`history[-1]`: agent and date — "scout, 19 Sep" or "Shahar, 25 Sep". The provenance matters
because for the twelve `not approved` rows the last note is the scout's shortlisting line
("score <= presence_threshold 2"), which is not a reason for non-approval; the page shows it
as it is and lets the status word and the author carry the meaning. Open, the cell shows the
whole note.

**Expanding a row.** The name is a button. Enter, Space or a click opens a full-width panel
directly under the row, on the same cool white, bounded by a 1px black rule below. It holds:

- one line: `found_via` as a link, `first_seen`, `lines` ledger lines, `human_decisions`
  decisions, `copy_rounds` copy rounds, `critic_rounds` critic rounds — grey labels, ink values;
- `reached[]` as a plain comma-separated sentence: "Reached: discovered, scored, …";
- the **history table**: when (`ts`, date and time), from → to, agent with `v` in grey
  ("designer 0.3.3", "Shahar"), note in full. Rows in ledger order, oldest first, so the
  story reads down. Human rows are set in bold ink — bold, not the accent; a decision already
  taken does not wait on anyone. `hosting_mode`, when present on a line, is appended to the note
  in grey.

One row open at a time is not enforced; "Expand all" and "Collapse all" sit right of the
filters. Escape on a focused open row closes it and keeps focus on its name.

**Filters and search.** Above the table, one line that wraps:

- Run: buttons "All", then each `runs[].run_id` with its `businesses` count. Default: all.
  The current run's button carries "(current)".
- Status: buttons "All" and one per group present in the data with its count, in this order:
  awaiting Shahar, delivered, pitched, outcome, in progress, dropped, not approved,
  not shortlisted, superseded. A group with zero rows is not shown.
- Search: one text field, placeholder "name, slug, note". Matches `name`, `slug`, `why` and
  every `history[].note`, case-insensitive. A history match opens nothing, but the row's
  Why cell gains a grey "matches a ledger line" under it.
- Right of the line: "Showing 35 of 39 rows", then Expand all / Collapse all.

Filter buttons are 1px-ruled ink text; the active one is a solid ink fill with white text.
Filter state lives in the URL hash so a reload keeps it. When nothing matches, the table
body is one row: "No business matches." in grey.

## 4. Status vocabulary

One plain word per `group`, in `label` casing, no colour except the first:

| `group` | Reads | Colour |
|---|---|---|
| `gate` | awaiting Shahar | accent fill, white text — the only accent on the page |
| `delivered` | delivered | ink |
| `pitched` | pitched | ink |
| `outcome` | outcome, with `label` beside it: "outcome: reply" | ink |
| `pipeline` | in progress, with `label` (the state) under it in grey | ink |
| `dropped` | dropped | ink |
| `not_approved` | not approved | ink |
| `not_shortlisted` | not shortlisted | ink |
| `superseded` | superseded | ink |

`pipeline` is not in the brief's list but is in `dashboard.mjs` (`classify()` returns it for
any in-flight state that is not a gate); "in progress" is its word here. Status words are set
in the same 14px as the rest of the row: the word does the work, not a badge, and there is no
colour code per status — a page where every status has its own colour teaches nothing except
the colours.

## 5. Colour

| Role | Hex | Used for |
|---|---|---|
| Ground | `#F5F7F9` | the whole page; one surface, no panels |
| Ink | `#111417` | all text, the 1px section and header rules, active filter fill, link underlines |
| Grey | `#66707A` | secondary text: slugs, counts, provenance, zeros, labels, empty-state sentences; 4.7:1 on the ground |
| Row rule | `#D5DAE0` | 1px lines between table rows only |
| Accent | `#C7360D` | "awaiting Shahar" fill (white text, 5.3:1) and the Waiting on Shahar table's 3px left rule; nowhere else |

The accent is a clean saturated red-orange on a cool ground, not orange on cream; it reads as
a signal, and it is absent when there is no signal. Links are ink with a 1px underline; visited
is not distinguished. Focus is a 2px solid ink outline offset 2px. No hover colour: a hovered
row gets the row rule above and below it in ink instead of grey, nothing else.

## 6. Empty sections, honestly

Each empty section keeps its heading, its table header row so the shape is visible, and one
grey row saying what is true and what will appear:

- **Pitches and outcomes** — columns: business, sent (`pitched_at`), channel, outcome
  (`outcome.state`), outcome date (`outcome.ts`), note (`outcome.note`). Empty row: "No pitch
  has been sent. When the ledger gets a `pitched` line, the business appears here with the
  date; the outcome columns fill from the first `outcome:*` line." The channel column is
  filled only if the `pitched` line's note names one — the data model has no channel field.
- **Leads** — columns: business, referred by, state, first seen. Empty row: "No lead yet. A
  lead is a `discovered` ledger line whose note starts `referral:<slug>`; it appears here with
  the referring business."
- **Expenses** — when `expenses.tracked` is false, no table: two sentences in ink. "Nothing is
  recorded: `expenses.jsonl` does not exist yet (schema in `docs/expenses.md`)." and "Token
  spend per business is not recorded anywhere; the budget is 2,000,000 tokens per business
  (`totals.tokens_per_business_budget`)." When tracked, four tables side by side at 1024 and
  up, stacked below: by month (`monthly`), accumulated (`accumulated`), by vendor (`vendors`),
  by client (`per_client`), each with a currency column, plus the entry count.

No empty section is hidden, greyed out as a block, or given an illustration.

## 7. Type and spacing

System stack: `system-ui` first, then the platform's own UI face. No web font, no file, no
request. One family, two weights (regular 400, bold 600), tabular figures everywhere a number
sits in a column.

| Element | Size / leading |
|---|---|
| Page title ("Oneshot") and the Now line | 22px / 28px, bold |
| Section heading | 17px / 24px, bold |
| Table body, notes, why, history, filter buttons | 14px / 20px |
| Secondary (slug, provenance, counts, labels, footer) | 13px / 18px, grey |
| Table header row | 13px / 18px, bold, ink, 1px ink rule beneath |

Spacing on an 8px unit: cell padding 8px vertical, 12px horizontal, 0 on the outer edges so
text aligns with the page margin; 8px between filter buttons; 24px from heading to table;
64px between sections (48px below 768). Page gutter 16px at 390, 24px at 768, 32px from 1024;
content width capped at 1360px and left-aligned inside the cap. Long notes wrap at up to
72 characters per line where the column allows; URLs may break anywhere so no cell is wider
than its column.

## 8. Responsive

- **390** — every table becomes stacked rows: one block per record with a 1px row rule
  between, the primary field (name, state, date) on the first line in bold, then label–value
  pairs, grey label left in 13px, ink value right, wrapping as needed. Why appears in full
  under the pairs. The funnel is the two-column table. Filters wrap onto as many lines as they
  need; the search field is full width. Expanded history is the same stacked form.
- **768** — the businesses table is a real table with five columns (business, status,
  presence, ratings, changed); Why runs under each row as a full-width line, type in grey
  after the name. Delivered and decisions are stacked rows still. Expenses tables stack.
- **1024** — all eight business columns; Why at 32% of the width. Delivered and decisions are
  tables. The funnel turns sideways. Expenses tables sit two by two.
- **1440** — content at 1360px; Why at 40%. Nothing else changes.
- Never a horizontal scroll at any width: tables use fixed column widths that sum to the
  container, and long strings wrap or break inside their cell. Verified at all four widths
  with the longest note in the data (1005 characters).

## 9. Interaction and motion

Nothing moves. Expanding a row inserts the panel with no transition; filtering re-renders the
table body at once; there is no fade, no slide, no skeleton, no spinner. `prefers-reduced-
motion` therefore changes nothing, and the page says so in a comment for the next builder.
All controls are native buttons, a native text field and native links, keyboard-operable in
document order; Tab order is filters, then rows top to bottom, then the links inside an open
panel. Zero network requests: every byte is in the file. Console clean.

## 10. Do not

- No cream, ivory or sand ground; the ground is the cool white above and nothing warmer.
- No serif anywhere, and no chosen display face; the stack is the system's.
- No tracked all-caps labels over headings or table heads.
- No "01 / 02 / 03" numbering on sections; section headings are words.
- No middle dots between metadata; separate fields with cells, lines, or a plain comma.
- No arrows appended to links; a link is underlined text.
- No dark panels, no dark mode, no near-black page.
- No cards, rounded corners, shadows, gradients, background tints or icons of any kind.
- No colour per status, no traffic lights, no progress bars, no charts; the accent is for
  "awaiting Shahar" alone.
- No paraphrase of a ledger note, no relative language ("recently", "a while ago") in place
  of a date, no rounding of a critic score, no hidden empty section.
