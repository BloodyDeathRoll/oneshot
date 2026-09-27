# Dashboard concept — the ledger, read as a page

One concept, for `dashboard/template.html`. Built by the designer from `dashboard/data.json`
(model: `tools/dashboard.mjs`). Internal tool for two people, read daily, offline, from file://.
Revised for brief v2: an **overview** is the landing view; the register is the drill-down layer.

## 0. Overview — the landing view

**Answers "where do we stand" in two phone screens.** Three numbers, seven small ones, one
short table; every one a link into the layer below. No funnel, decisions, history or
expenses table here.

### Three main metrics

| Metric | Value | Links to |
|---|---|---|
| Live sites | rows with `group` in delivered, pitched, outcome (3 today) | `#all?group=live` |
| Needs attention | `gates.length` (0 today) | `#all?group=gate`; when 0 the link still works and lands on "Nothing waits on Shahar." |
| Clients | rows with `outcome.state = sale` (0 today) | `#pitches` |

The whole metric block is one link: the number is not underlined, the label under it is
(1px ink underline), the tap target at least 44px tall. Needs attention is the only metric
that takes the accent: its number is `#C7360D` above zero and ink at zero. No box, no icon.

- **At 390:** the three stack, one per 72px row: number 40px / 44px bold, set left, label
  14px underlined on the next line; 1px ink rule above the first and below the last. About
  220px under the page title.
- **At 768:** one row, three equal columns, number 48px / 52px, label under it.
- **At 1024 and 1440:** the same row at 56px / 60px, spanning the 1360px content width,
  rules above and below.

### Sub-metrics

Seven, small, each a link. Field, wording and destination:

| Reads | Value | Links to |
|---|---|---|
| researched | `totals.businesses_all_runs` (35) | `#all` |
| out, with a reason | rows in dropped, not approved, not shortlisted (32 today; superseded rows are earlier runs of slugs counted once already, so they are not added) | `#dropped` |
| pitched | rows with `pitched_at` (0) | `#pitches` |
| replies and meetings | rows whose `outcome.state` is neither sale nor ignored (0) | `#pitches` |
| critic, live sites | mean `critic_score` of the live rows, one decimal (91.7) | `#all?group=live` |
| cost this month | `expenses.tracked` false → "not tracked"; true → `monthly` for the current month per currency | `#expenses` |
| last activity | newest `runs[].last_ts` as date and time (25 Sep 06:45) | `#business/<slug>` of the row whose `last_change` equals it; else `#decisions` |

- **At 390:** a two-column list, 7 rows of 28px: grey 14px label left, underlined ink 14px
  value right. No rules between rows; a 1px ink rule below the list.
- **At 768 and up:** one table row of seven cells, 16px value over 13px grey label, rules
  above and below; wraps to two lines of cells if the width needs it.

### "In play"

Every business row not in an out group (dropped, not approved, not shortlisted, superseded).
Today: the three delivered sites. One grey sentence under the heading: "Tap one for its history."

| Column | Reads |
|---|---|
| Business | `name`; the row is one link to `#business/<slug>` |
| Status | the one word from §4; `label` under it in grey where it adds something |
| Next step | the station that acts next and who (table below), from `state`; for a gate, the gate text and "you" |
| Since | `last_change` as "25 Sep" and `days_since_change` as "2 d" in grey |

Order: rows with `gate` set first, longest waiting first; then the rest in `businesses[]`
order (furthest state first). Gate rows carry the accent: a 3px `#C7360D` left rule and the
status word in accent fill with white text. Next-step wording, in `ORDER` from `dashboard.mjs`:

| `state` | Next step |
|---|---|
| discovered | score — Claude |
| scored | shortlist — Claude |
| shortlisted | approve the shortlist — you |
| approved | harvest — Claude |
| harvested | draft copy — Claude |
| copy_drafted | humanise copy — Claude |
| copy_humanised | review copy — Claude |
| copy_failed | redraft copy — Claude |
| copy_passed | write concepts — Claude |
| concepted | build mockups — Claude |
| mocked | pick a mockup — you |
| picked | build the site — Claude |
| built | SEO — Claude |
| optimised | AI SEO — Claude |
| ai_optimised | critic review — Claude |
| critiqued(n), failed | fix and rebuild — Claude |
| passed | package — Claude |
| packaged | send the pitch — you |
| pitched | log the outcome — you |
| outcome:reply, outcome:meeting | follow up — you |
| outcome:sale | attach the domain and hand over — Claude |
| outcome:ignored | leave it or re-pitch — you |
| handoff_verified | revoke our access — Claude |
| access_revoked | done |

The accent follows `gate`, not the wording: today the three packaged rows read "send the
pitch — you" in ink and Needs attention reads 0, because `classify()` in `dashboard.mjs`
returns `delivered` for `packaged` before the `GATES` check and never sets `gate` on them.
A one-line data-model fix to report, not for the template to paper over.

- **At 390:** stacked rows, 1px row rules, each at least 56px: line 1 name in bold with the
  status word right-aligned; line 2 next step in ink with since in grey at the right. The
  whole overview is then about 800px tall: within two phone screens, with room for more rows.
- **At 768 and up:** a four-column table, header row as in §7.

### Navigation model

- Views are hash routes in the one file: empty or `#overview` (landing), `#business/<slug>`,
  `#all`, `#dropped` (= `#all` with the status filter preset to "out"), `#decisions`,
  `#funnel`, `#expenses`, `#pitches`, `#leads`. Register filter state follows a `?` inside the
  hash (`#all?run=2026-09-ahangama-02&group=live&q=hostel`). The status filter gains two
  presets, "live" and "out", covering the groups named above, so the overview's links land on
  exactly what they counted.
- `hashchange` renders; back and forward work; a reload restores the view and its filters;
  an unknown hash renders the overview. On every change focus moves to the view's heading
  and the document title becomes "Oneshot — <view>".
- Every drill-down view starts with "Back to overview" in 14px underlined ink, above its
  heading; the page title "Oneshot" is also that link. No arrow, no chevron.
- A metric reads as a link because its label is underlined text and nothing else is: no
  border, no fill, no corner radius, no hover colour. Focus is the 2px ink outline.
- Rows in "In play" and in the register are links or buttons with the whole row as the
  target, at least 44px tall. No mid-word breaks in names or notes; only URLs may break.

## 1. The one idea

**A register.** Under the overview, the page is `ledger.jsonl` made readable: tables under
plain headings, each on its own view. Nothing is decoration and nothing is a summary that
cannot be traced to a line: every count, word and date is a field of the JSON, and every
business opens to the ledger lines it was computed from. The only colour says "this waits
on Shahar". Today nothing does, so the page is black on cool white.

## 2. The drill-down layer — sections and their views

Each section: a heading over a 1px black rule, at most one sentence, then a table.

| View | Section | What it shows |
|---|---|---|
| all views, top | **Now** — one line: `run.run_id`, `run.mode`, `run.area_mode` with `run.anchors[0]`, `run.max_sites` sites, `run.default_mode` hosting; `generated_at` in grey | on the overview it sits under the title; on drill-downs under the back link |
| `#all?group=gate` | **Waiting on Shahar** — `gates[]`: name, gate, since, days; accent lives here (§5). Empty today: "Nothing waits on Shahar." in ink | rendered above the register table when the gate preset is active |
| `#all?group=live` | **Delivered** — live rows: name, preview (`preview_url` as link text), proposal (`pitch.proposal_url`), critic (`critic_score` / 100, `critic_rounds` grey), hosting (`hosting_mode`), CMS (`cms_verified` → "verified" / "not verified"), deployed (`deploy.deployed_at`), pitch (`pitched_at` null → "not sent", in ink). Sentence under the heading: "Three sites are live. No pitch has been sent." | rendered above the register table when the live preset is active |
| `#funnel` | **Funnel, current run** — `funnel[]`: state, count reached, pipeline order; zeros printed in grey; from 1024 up the table turns sideways, states over counts; no bars | |
| `#all`, `#dropped` | **Businesses, all runs** — the register table (§3) with filters and search | `#dropped` presets status to "out" |
| `#business/<slug>` | **One business** — the expanded row of §3 as a page: name, type, run, status word and `why` in full with provenance, `ratings`, preview and proposal links, critic score and rounds, hosting, CMS verified, pitch state ("not sent" / `pitched_at`, `outcome`), then the full history table | back link at top |
| `#decisions` | **Decisions** — `decisions[]` newest first: when, business (slug resolved to name), from → to, note in full; every row is Shahar's | |
| `#pitches` | **Pitches and outcomes** — empty today (§6) | |
| `#leads` | **Leads** — `leads[]`, empty today (§6) | |
| `#expenses` | **Expenses** — `expenses`, `tracked: false` today (§6) | |
| all views, bottom | **Footer** — `generated_at`, `totals.ledger_lines`, `totals.human_decisions`, `totals.businesses_all_runs` across `runs[]`; then `corrections[]` in full under "Corrections to the ledger": date, agent, note | |

## 3. The businesses table (`#all`)

Sorted as `data.json` delivers it (current run first, furthest state first, then slug).

| Column | Field | Reads as |
|---|---|---|
| Business | `name`; `slug` under it in grey 13px | The name is the expand button. |
| Type | `type` | `beach_lodging` → "beach lodging"; null → an em dash in grey. |
| Run | `run_id` | Short form "02", "01"; full id in the run filter. |
| Presence | `presence` | "1 / 5"; null → dash. |
| Ratings | `ratings{}` | One platform per line: "Google 4.8" then the count in grey "42". Nothing is rescaled; the number is quoted as the platform prints it. |
| Status | `group`, `label` | The one word from §4; `label` under it in grey when it adds something. |
| Why | `why` | See below. |
| Changed | `last_change`, `days_since_change` | "25 Sep" over "2 d" in grey. |

**How "why" reads.** `why` is the last ledger note, verbatim, never rewritten. Closed, it
shows the first sentence (cut at the first full stop after 40 characters, or at 160 with an
ellipsis). Under it in grey 13px, provenance from `history[-1]`: "scout, 19 Sep" or "Shahar,
25 Sep". For the twelve `not approved` rows the last note is the scout's shortlisting line
("score <= presence_threshold 2"), not a reason for non-approval; the page shows it as it is
and lets the status word and the author carry the meaning. Open, the whole note.

**Expanding a row.** The name is a button. Enter, Space or a click opens a full-width panel
under the row, on the same ground, bounded by a 1px black rule below. It holds one line
(`found_via` as a link, `first_seen`, `lines`, `human_decisions`, `copy_rounds`,
`critic_rounds` — grey labels, ink values); `reached[]` as a comma-separated sentence; a link
"Open as a page" to `#business/<slug>`; and the **history table**: when (`ts`), from → to,
agent with `v` in grey ("designer 0.3.3", "Shahar"), note in full, oldest first. Human rows
are bold ink, not accent: a decision already taken waits on no one. `hosting_mode` on a line
is appended to its note in grey. Escape on an open row closes it and keeps focus on its name.

**Filters and search.** One line above the table that wraps:

- Run: buttons "All", then each `runs[].run_id` with its count; the current run marked "(current)".
- Status: buttons "All", "live", "out", then one per group present, in this order: awaiting
  Shahar, delivered, pitched, outcome, in progress, dropped, not approved, not shortlisted,
  superseded. A group with zero rows is not shown; "live" and "out" always are.
- Search: one text field, placeholder "name, slug, note"; matches `name`, `slug`, `why` and
  every `history[].note`. A history match adds a grey "matches a ledger line" under Why.
- Right of the line: "Showing 35 of 39 rows", then Expand all / Collapse all.

Filter buttons are 1px-ruled ink text; the active one is solid ink with white text. State
lives in the hash. No match: one grey row, "No business matches."

## 4. Status vocabulary

One plain word per `group`, no colour except the first:

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

`pipeline` is not in the brief's list but `classify()` returns it for any in-flight state
that is not a gate; "in progress" is its word. The word does the work, not a badge.

## 5. Colour

| Role | Hex | Used for |
|---|---|---|
| Ground | `#F5F7F9` | the whole page; one surface, no panels |
| Ink | `#111417` | all text, the 1px section and header rules, active filter fill, link underlines |
| Grey | `#66707A` | secondary text: slugs, counts, provenance, zeros, labels, empty-state sentences; 4.7:1 on the ground |
| Row rule | `#D5DAE0` | 1px lines between table rows only |
| Accent | `#C7360D` | the Needs attention number above zero (4.9:1 on the ground), the "awaiting Shahar" fill (white text, 5.3:1), the 3px left rule on gate rows; nowhere else |

A clean saturated red-orange on a cool ground, not orange on cream; a signal, absent when
there is none. Links are ink with a 1px underline. Focus is a 2px solid ink outline offset
2px. No hover colour: a hovered row gets its row rules in ink instead of grey, nothing else.

## 6. Empty sections, honestly

Each empty view keeps its heading, its table header row so the shape is visible, and one
grey row saying what is true and what will appear. None is hidden or given an illustration.

- **Pitches and outcomes** — columns: business, sent (`pitched_at`), channel, outcome
  (`outcome.state`), outcome date (`outcome.ts`), note (`outcome.note`). Empty row: "No pitch
  has been sent. When the ledger gets a `pitched` line, the business appears here with the
  date; the outcome columns fill from the first `outcome:*` line." Channel is filled only if
  the `pitched` line's note names one — the data model has no channel field.
- **Leads** — columns: business, referred by, state, first seen. Empty row: "No lead yet. A
  lead is a `discovered` ledger line whose note starts `referral:<slug>`."
- **Expenses** — `tracked` false: no table, two sentences in ink. "Nothing is recorded:
  `expenses.jsonl` does not exist yet (schema in `docs/expenses.md`)." and "Token spend per
  business is not recorded anywhere; the budget is 2,000,000 tokens per business
  (`totals.tokens_per_business_budget`)." When tracked: `monthly`, `accumulated`, `vendors`,
  `per_client`, each with a currency column, side by side from 1024 up, stacked below.

## 7. Type and spacing

System stack: `system-ui`, then the platform's own UI face. No web font, no request. One
family, weights 400 and 600, tabular figures wherever a number sits in a column.

| Element | Size / leading |
|---|---|
| Main metric numbers | 40px / 44px at 390, 48px / 52px at 768, 56px / 60px from 1024, bold |
| Page title ("Oneshot") and the Now line | 22px / 28px, bold |
| Section heading | 17px / 24px, bold |
| Sub-metric values from 768 | 16px / 20px |
| Table body, notes, why, history, filter buttons, metric labels | 14px / 20px |
| Secondary (slug, provenance, counts, labels, footer) | 13px / 18px, grey |
| Table header row | 13px / 18px, bold, ink, 1px ink rule beneath |

Spacing on an 8px unit: cell padding 8px vertical, 12px horizontal, 0 on the outer edges;
8px between filter buttons; 24px heading to table; 64px between sections (48px below 768);
32px between the overview's three blocks. Gutter 16px at 390, 24px at 768, 32px from 1024;
content capped at 1360px, left-aligned. Notes wrap at up to 72 characters where the column
allows; URLs may break anywhere, words never.

## 8. Responsive

- **390** — the overview as in §0. Every drill-down table becomes stacked rows: one block per
  record with a 1px row rule between, the primary field first in bold, then label–value
  pairs, grey label left in 13px, ink value right; Why in full under the pairs. The funnel is
  the two-column table. Filters wrap; the search field is full width.
- **768** — metrics in one row. The register has five columns (business, status, presence,
  ratings, changed); Why runs under each row full width, type in grey after the name.
  Delivered and decisions are still stacked. Expenses tables stack.
- **1024** — all eight register columns, Why at 32%. Delivered and decisions are tables. The
  funnel turns sideways. Expenses tables two by two.
- **1440** — content at 1360px; Why at 40%. Nothing else changes.
- Never a horizontal scroll: fixed column widths that sum to the container; long strings
  wrap or break inside their cell. Checked at all four widths with the longest note (1005
  characters).

## 9. Interaction and motion

Nothing moves. A view change or an expanded row is an instant re-render: no fade, slide,
skeleton or spinner, so `prefers-reduced-motion` changes nothing (a template comment says
so). Native buttons, text field and links, keyboard-operable in document order. Zero
network requests. Console clean.

## 10. Do not

- No cream, ivory or sand ground; no serif; no chosen display face — the stack is the system's.
- No tracked all-caps labels over headings, metrics or table heads.
- No "01 / 02 / 03" numbering on sections; section headings are words.
- No middle dots between metadata; separate fields with cells, lines, or a plain comma.
- No arrows appended to links or the back link; a link is underlined text.
- No dark panels, no dark mode, no near-black page.
- No cards, rounded corners, shadows, gradients, tints or icons; metrics are numbers on the
  ground, not tiles.
- No colour per status, traffic lights, progress bars, charts or sparklines; the accent is
  for what waits on Shahar alone.
- No paraphrase of a ledger note, no "recently" in place of a date, no hidden empty view.
