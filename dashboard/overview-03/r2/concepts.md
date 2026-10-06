# Overview, run `dashboard-03`, round 2: three directions

Creative director, 2026-10-05. Task layer: `dashboard/BRIEF-overview-03.md`, including the round-2 amendment at
its end, which overrides round 1 (`../concepts.md`) wherever they differ. `dashboard/BRIEF.md` §5 and the locked
purple palette still apply.

## 0. What I looked at

**Shot for this round** (Playwright, scratch only):
- the live page `http://localhost:8970/` at 1920, 1440, 1024 and 390;
- round-1 A and C at 1920 and 1440, plus 1440 full page.

**Re-read:** the round-1 concepts and critique. **Opened again:** all 13 reference PNGs.

**What the shots show:**

1. **Round 1 does not use the window.** A and C stop at x ≈ 1400 at 1920, which leaves a 500 px empty strip
   on the right. The live page fills the window, with sidebar 240, gutters 24 and content 1632 at 1920. That
   is why Shahar could not compare them. Every direction below is fluid: content = viewport − sidebar −
   gutters, with no max-width.
2. **What Shahar liked in C's top** is the divisions: a title with a one-line fact, then distinct bands (money,
   the chain, then the work), each with its own edge. What he did not like:
   - the 339 px solid purple block;
   - the Shahar | Alon card;
   - the chain of five 52 px pills. Read with the compare card, that is the "smaller matrixes".
3. **What Shahar liked in A's sites** is that every site shows its actions without a click. What made it
   "way too messy":
   - 353 px per site;
   - three row labels repeated four times;
   - a 288×180 thumbnail;
   - meta (type, run, quality) on every card;
   - four different button looks inside one card.
4. **The live page at 1024** already has a 72 px icon rail *with labels under the icons*, which fixes the
   critic's round-1 complaint, so that rail is kept. **At 390** the live page is 504 px wide; that must
   be fixed.
5. **Label widths, measured** in Manrope 14 px / 600 with tabular figures, so the row budgets below are real:

| Label | Width |
|---|---|
| Preview website | 96 |
| Pitch | 31 |
| Suggested email | 96 |
| Suggested WhatsApp | 128 |
| Suggested in-person script | 158 |
| Update status | 82 |
| Hand off | 53 |
| Copy prompt | 80 |
| Ready to send | 84 |
| Pitched 5 Oct via WhatsApp | 170 |

Site names at 15 px / 700 run up to 185 px (Global Surf Lodge Kabalana).

**The data today** (`dashboard/data.json`, generated 2026-10-05T20:28Z):
- Money: Revenues and Expenses are $0, with no entries.
- Sites: 4 ready to send, all run by Shahar.
- Drafts:
  - Global Surf has a suggested email and a suggested WhatsApp, and its pitch page is not online.
  - KA, Layday and Lavish each have a suggested WhatsApp and a suggested in-person script.
- Waiting: KA and Layday 10 days, Lavish 7, Global Surf 0.
- The funnel: 0 pitched, 0 replies, 0 clients. Being built is 0 across all runs, since no business is between
  approved and packaged.
- Handoffs: none open.
- Other gates: one, "3 suggested agent tweaks".

## 1. What makes the Stripe Dashboard clean

This section is **from memory of the Stripe Dashboard** (Home, Payments, Customers, Balances, as of 2024–26). I
did not measure the live product (it needs a login), so the px values are targets that match what I remember,
not citations.

**Type.** One sans family, and hierarchy comes from size and weight, never from colour.
- Body and table text: 14 px / 20, regular.
- Page title: "Home", "Payments", 28 px / 36, bold.
- Section titles: "Today", "Your overview", 20 px / 28, semibold.
- Metric labels: "Gross volume", "USD balance", 14 px, medium, secondary grey.
- Metric values: 20–28 px semibold in tiles, larger only for the one hero figure on Home.
- Table headers: about 13 px semibold grey, sentence case.
- Badges: about 12 px semibold.
- Amounts use tabular figures and are right-aligned. The currency code ("USD") is a grey suffix.

**Rows and rules.**
- Table rows are about 40–44 px, one line each.
- Rows are separated by a single 1 px rule in a very light grey (about `#EBEEF1`). There is no zebra and no
  card per row.
- Hover tints the whole row (about `#F6F8FA`), and the row is the click target that opens the detail page.
- Column headers sit on the same hairline grid. Amount columns are bold, and everything else is regular.

**Surfaces.**
- The page is white. Sections are separated by whitespace (about 32–48 px) and hairlines, not by shadows or
  coloured blocks.
- Where there is a box (a filter tile, a modal), it is a 1 px border with radius about 6–8. Shadows appear only
  on things that float (menus, modals).

**Colour.**
- One accent: blurple `#635BFF`. It is used for the primary button, the selected nav item, the selected
  filter tile, focus and the chart line.
- Everything else is three or four greys for text (about `#1A1B25` / `#414552` / `#687385`) and two for rules
  (control border about `#D5DBE1`, divider about `#EBEEF1`).
- Green and red appear only inside status badges and percentage deltas. Numbers are never coloured for emphasis.

**Badges.** These are short status words in a tinted rounded rectangle, not a pill: about 20 px tall, radius
4, 12 px semibold. Examples: green "Succeeded ✓", grey "Refunded" or "Incomplete", red "Failed".

**Metrics.**
- **Home "Today"** has a hero figure with an intraday line chart (today in blurple, yesterday as a grey dashed
  line). Beside it, a narrow right column holds "USD balance" and "Payouts", each with a label, a value and a
  "View" link, divided from the chart by a vertical hairline.
- **Home "Your overview"** is a grid of tiles. Each tile has a label, a delta badge, a value, a small chart, the
  previous-period value in grey and a "View more" link. The tiles have no heavy borders; space separates them.
- **Payments status tiles** are a row of equal, selectable bordered tiles: All · Succeeded · Refunded ·
  Disputed · Failed · Uncaptured. Each has a label over a count. The selected tile gets an accent border and
  accent label, and it **filters the table below**. The metric row and the filter are the same control.
- **Balances** is a summary written as label/value rows (Incoming, Available…), hairline-separated, with
  values right-aligned.

**Actions in tables.**
- The row is the main action, since clicking it opens the detail page. Secondary row actions live in a
  "•••" overflow at the row's end, which shows on hover.
- Page-level actions sit at the top right of the page title, at most one filled primary ("+ Create payment")
  plus a few white secondary buttons.
- Buttons are about 28–32 px tall, 14 px semibold, radius 6. The primary is filled; the secondary is white with
  a 1 px border and a 1 px shadow.
- Filters are small dashed-outline chips ("+ Status", "+ Date").

**Empty states.** An empty table shows one small icon, one 16 px heading ("No payments yet"), one sentence and
one button, centred where the rows would be. The table header stays, so the page does not jump.

**Why it reads as calm:**
- One accent.
- Hairlines instead of boxes.
- One row height.
- Every number in the same ink, so the numbers themselves carry the weight.
- Short labels.
- One primary button per region.
- Generous space between sections, tight space inside them.

### 1.1 How this transfers here, and where we deviate on purpose

| Stripe | Here | Why |
|---|---|---|
| Blurple accent | `#6A2FE0`, used where Stripe uses blurple: primary button, selected nav/tile, focus | locked palette |
| Accent-coloured links | blue `#1F4BFF`, only for "opens a website" (Preview website ↗, Pitch ↗) | locked palette: blue is links only |
| 12–13 px badges and headers | **14 px minimum everywhere** | brief floor (round-1 critic enforced it) |
| Row actions hidden in "•••" | **all CTAs visible in the row** | Shahar: "small thumbs of the websites and CTAs"; round-1 critic: a click per site was C's cost |
| System / Söhne | Manrope, `tnum` on, self-hosted | locked |
| Content can sit in a max width | **always fluid** | amendment |

### 1.2 Tokens shared by A, B and C

**Colour**
- Ink `#1A1D29`, ink2 `#4B5263`, ink3 `#6B7280` (4.83:1 on white, measured in round 1).
- Hairline `#E6E8EE`. Control border `#D5D9E2`. Row hover `#F7F8FA`.
- Purple `#6A2FE0`, tint `#F3EEFD`. Link blue `#1F4BFF`.
- Status green `#1A7F37` on `#EDF7F0`. Age red `#C0182B`.

**Type** (Manrope, `tnum`)

| Use | Size / line height / weight |
|---|---|
| Page title | 28 / 36 / 700 |
| Page summary | 16 / 24 / 500 ink2 |
| Section title | 18 / 28 / 700 |
| Metric label | 14 / 20 / 500 ink2 |
| Body, links, buttons | 14 / 20 / 600 |
| Site name | 15 / 20 / 700 |
| Meta ("by Shahar", age) | 14 / 20 / 500 ink3 |

Each direction sets its own money and count sizes. Nothing on the page is under 14 px.

**Space.** 4-point steps: 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48.
- Gutters: 32 at ≥1280, 24 at 1024, 16 at 390.
- 40 between sections. 16 from a section title to its content.

**Controls**

| Control | Look |
|---|---|
| Primary button | 32 px tall, radius 8, padding 0 16, purple fill, white 14 / 600. The only filled button in any site row is **Update status**. |
| Secondary button | 32 px tall, white, 1 px `#D5D9E2`, radius 8, padding 0 12, ink 14 / 600, optional 16 px icon with a 6 px gap. Used for **Suggested …** and other text-to-copy actions. |
| Link | blue 14 / 600 with a 12 px ↗ icon, no chrome, 32 px hit area. Only **Preview website** and **Pitch**. |
| Ghost button | ink2 14 / 600, 16 px icon, no border, hover `#F7F8FA`. **Hand off**, **Copy prompt** in lists. |
| Badge | 24 px tall, radius 6, padding 0 8, 14 / 600 (see below). |
| Thumbnail | radius 6, 1 px hairline border (several heroes are white and would bleed into the page), `object-fit: cover; object-position: top`. Source: `dashboard/mockups/soft-cards/dist/img/<slug>.jpg` (672×420, 16:10). |

**Badges**

| Status | Look |
|---|---|
| Ready to send | tint `#F3EEFD`, purple text |
| Pitched <date> via <channel> | `#EEF0F3`, ink2 |
| Reply | green tint, green text |
| Sale | green tint, green text, ✓ icon |

These are the brief's four words, exactly.

**Sidebar**
- It is the live sidebar, item for item: Overview, Needs you, Ledger, Pipeline, Sites, Agents, Decisions. It is
  240 px at 1440 and 1920 and the 72 px labelled rail at 1024, switching at the same breakpoint as the live page.
- The footer changes to "Signed in as Shahar · Updated 23:00". The live footer shows "globalsurf-02 · test mode
  · main da4957d · 407 ledger lines", which is run jargon on the Overview.
- At 390 the sidebar becomes a 56 px top bar (logo, "Overview", a menu button that opens the views as a
  sheet), so `scrollWidth` = 390.

### 1.3 Rules shared by A, B and C

**Page head.** C's structure, kept:
- "Overview" (28 / 700);
- under it, one fact in plain words: "4 sites are ready to pitch. The oldest has waited 10 days.";
- the mode line at the top right ("● Live · your changes are saved").

There is no greeting.

**A site row holds four things.** It has the thumbnail, the name, the status and the CTAs. Two cases need a
rule:
- **Who ran it.** The amendment says "who ran it stays as a quiet attribute per site", and Alon's sites will
  join. It is written as "by Shahar" in 14 / 500 ink3, attached to the name. It is not a disc and not a
  column. That is the one exception to "nothing else", and I chose it.
- **Age.** "10 days" is part of the status, because it says how long the status has held. It turns red at
  14 days.

**Dropped from the Overview** (they stay on the Sites tab):
- type;
- run;
- critic score;
- the large preview.

**CTA grammar** (four looks, same as round 1, now Stripe-quiet):
- **Opens a website** (blue links): **Preview website ↗** and **Pitch ↗**.
- **Opens text to copy** (secondary buttons): the **Suggested …** buttons, only the drafts that exist.
  - Global Surf: **Suggested email**, **Suggested WhatsApp**.
  - The other three: **Suggested WhatsApp**, **Suggested in-person script**.
- **Changes the record** (the one filled button): **Update status**.
- **Asks the other operator** (ghost): **Hand off**.

The labels are exactly as written here and never shortened. The order is always: look, send yourself, record,
hand off.

**Inactive Pitch** (Global Surf):
- the text "Pitch · not online yet" in ink3, with no ↗ and a 14 px clock icon;
- `aria-disabled`;
- the tooltip "The pitch page for Global Surf Lodge Kabalana is written but not online yet."

With its clock icon it measures 144 px (14 + 6 + 124), and every budget below uses that worst case.

**No run jargon and no operator comparison anywhere:**
- no run ids;
- no "active run" or "in active runs";
- no Shahar | Alon card;
- no "Ahangama 02".

"Being built" means businesses across all runs that are past shortlist approval and not yet packaged (0 today).

**Popups.** All three directions use the same three popups (§5).

## 2. Direction A: "Payments"

**The idea:** the Overview is Stripe's Payments page:
- money as a balance summary;
- the five counts as selectable status tiles that filter the table below them;
- the sites as a real table with column headers, one aligned row per site;
- what else is waiting on you and the handoffs in two panels under the table.

**Borrowings**
- **Stripe Payments:**
  - the status tiles that filter the table;
  - the table with sentence-case grey headers, hairline rows and whole-row hover;
  - the empty-table state (header kept, one line, centred).
- **Stripe Balances:** money as two label/value columns split by a vertical hairline, with a sub-row of
  "This month" figures.
- **Models** (`15-46-57`):
  - title plus one-line subtitle;
  - status pills in a column;
  - rows about 42 px with the name and a quiet second line under it ("gpt-4o / OpenAI" becomes
    "KA Surf Hostel / by Shahar").
- **Sypher** (`15-36-13`): the whole page on white with hairline divisions, and filter words over the table.
- **Round-1 C:** two side-by-side panels as the lower division ("Waiting on you" | "Handoffs").

**Ground.** Pure Stripe: the content ground is white. There are no cards around the money or the table, only
hairlines and 40 px of space. The only boxes are the five tiles and the two lower panels (1 px `#E6E8EE`,
radius 8, no shadow).

### Grid at 1920 (sidebar 240 · gutters 32 · content 1616)

```
┌ 240 ┬───────────────────────────────────────── content 1616 ──────────────────────────────────────────┐
│     │ Overview                                                              ● Live · changes saved    │
│     │ 4 sites are ready to pitch. The oldest has waited 10 days.                                      │
│     │ ─────────────────────────────────────────────────────────────────────────────────────────────── │
│     │ Revenues                                    │ Expenses                                          │
│     │ $0                              40/600      │ $0                                                │
│     │ This month $0                               │ This month $0                                     │
│     │ No payments recorded yet. Tell Claude       │ No expenses recorded yet. Tell Claude             │
│     │ "record a payment" when a client pays.      │ "record an expense" when you pay for something.   │
│     │ ─────────────────────────────────────────────────────────────────────────────────────────────── │
│     │ Sites                                                                       0 being built       │
│     │ ┌ All ─────┐┌ Ready to send ┐┌ Pitched ──────┐┌ Replies ──────┐┌ Clients ──────┐   5 tiles, 1fr   │
│     │ │ 4        ││ 4  (selected) ││ 0             ││ 0             ││ 0             │   each, 72 tall │
│     │ └──────────┘└───────────────┘└───────────────┘└───────────────┘└───────────────┘                 │
│     │ Site                      Status                  Website                     Messages …        │
│     │ ─────────────────────────────────────────────────────────────────────────────────────────────── │
│     │ ▭ KA Surf Hostel  by Shahar  [Ready to send] 10 days  Preview website ↗  Pitch ↗  [Suggested Wh… │
│     │ ─────────────────────────────────────────────────────────── one line per site, 56 px ───────── │
│     │ ▭ Layday Surf Ahangama …                                                                        │
│     │ ▭ The Lavish Haven …                                                                            │
│     │ ▭ Global Surf Lodge Kabalana … Preview website ↗  ◷ Pitch · not online yet  [Suggested email] … │
│     │ ─────────────────────────────────────────────────────────────────────────────────────────────── │
│     │ ┌ Also waiting on you  1 ──────────────────────┐ ┌ Handoffs  0 ───────────────────────────────┐ │
│     │ │ ⚙ 3 suggested agent tweaks      [Review them]│ │ Nothing handed off. Use Hand off on a site │ │
│     │ │   Approve or reject each one in Decisions.   │ │ to ask Alon for something.                 │ │
│     │ └──────────────────────────────────────────────┘ └────────────────────────────────────────────┘ │
└─────┴─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

At ≥1760 every row is **one line, 56 px**. The full row at 1920, left to right:

`▭ thumb · KA Surf Hostel by Shahar · [Ready to send] 10 days · Preview website ↗ Pitch ↗ · [Suggested WhatsApp] [Suggested in-person script] · [Update status] · ⇢ Hand off`

### Grid at 1440 (content 1136)

```
┌ 240 ┬────────────────────────── content 1136 ──────────────────────────┐
│     │ Overview                                     ● Live · changes saved│
│     │ 4 sites are ready to pitch. The oldest has waited 10 days.         │
│     │ ────────────────────────────────────────────────────────────────── │
│     │ Revenues                         │ Expenses                        │
│     │ $0                       40/600  │ $0                              │
│     │ This month $0                    │ This month $0                   │
│     │ No payments recorded yet. Tell … │ No expenses recorded yet. Tell …│
│     │ ────────────────────────────────────────────────────────────────── │
│     │ Sites                                              0 being built   │
│     │ [All 4] [Ready to send 4] [Pitched 0] [Replies 0] [Clients 0]      │
│     │ Site          Status       Website        Messages                 │
│     │ ────────────────────────────────────────────────────────────────── │
│     │ ▭ KA Surf     [Ready to   Preview website↗ ◌ Suggested WhatsApp   [Update status] ⇢ Hand off
│     │   Hostel        send]      Pitch ↗          ◌ Suggested in-person  │
│     │   by Shahar    10 days                        script               │
│     │ ────────────────────────────────── 72 px, cells stack to 2 lines ─ │
│     │ ▭ Layday … ▭ The Lavish Haven … ▭ Global Surf Lodge Kabalana …     │
│     │ ┌ Also waiting on you 1 ───────┐ ┌ Handoffs 0 ────────────────────┐ │
│     │ └──────────────────────────────┘ └────────────────────────────────┘ │
└─────┴────────────────────────────────────────────────────────────────────┘
```

**Height check at 1440**:

| Block | Height |
|---|---|
| Head | ~100 |
| Money | ~150 |
| Tiles block | ~120 |
| Table | 40 header + 4 × 72 |
| Gaps | 3 × 40 |

The two panels start at about y 820, inside a 1000 px viewport. All four of Shahar's questions are answered on
the first screen.

### Grid at 1024 (rail 72 · gutters 24 · content 904)

```
┌72┬──────────────────── content 904 ─────────────────────┐
│  │ Overview                              ● Live         │
│  │ Revenues $0 (32)        │ Expenses $0 (32)           │
│  │ [All 4][Ready to send 4][Pitched 0][Replies 0][Clients 0]   tiles 1fr, count 20
│  │ ───────────────────────── (no column headers) ──────── │
│  │ ▭ KA Surf Hostel by Shahar  [Ready to send] 10 days   [Update status] ⇢ Hand off │ line 1
│  │   Preview website ↗  Pitch ↗   [Suggested WhatsApp] [Suggested in-person script]   │ line 2
│  │ ─────────────────────────────────────────── 92 px ──── │
│  │ Also waiting on you (full width) / Handoffs (full width), stacked │
└──┴──────────────────────────────────────────────────────┘
```

This two-line form applies to every width below 1400. Budget at 1024 (inner 872, 76 for the thumb):
- line 1: 185 + 8 + 56 + 16 + 100 + 8 + 43 + 24 + 114 + 8 + 91 = 653;
- line 2, worst case: 112 + 16 + 144 + 24 + 204 + 8 + 174 = 682.

Both fit in 796.

### At 390 (top bar 56 · gutters 16 · content 358)

- **Money:** two columns of 171, with $0 at 28 px. The hint is cut to "None recorded yet". The full sentence
  sits behind a 14 px "How?" link that opens a small popup.
- **Tiles:** a 2-column grid. "All 4" spans both columns.
- **Each site** is a block divided by hairlines:
  - thumbnail 96×60 at the left, with the name, "by Shahar" and the badge with its age at the right;
  - then a links line (Preview website ↗ · Pitch ↗);
  - then the Suggested buttons stacked full width (44 px tall at this width);
  - then **Update status**, full width, 44 px;
  - then Hand off, a centred ghost button.
- **Panels:** stacked.

### The metric row: status tiles

**Money**

| Element | Size and colour |
|---|---|
| Label | 14 / 500 ink2 |
| Value | 40 / 48 / 600 ink. "$0" stays ink, not grey: it is a true figure, and Stripe shows $0.00 in ink. |
| "This month $0" | 14 / 500 ink2, value in ink |
| Hint | one line, 14 / 500 ink3, max 56 ch |

- The vertical hairline between the two columns runs the full block height. The columns are 1fr each.
- At 1920 each column is 808 wide, and the figures stay left-aligned with the space to their right left
  empty, as on Stripe Balances.

**Tiles**

| Property | Value |
|---|---|
| Grid | `repeat(5, 1fr)`, gap 12 |
| Height | 72 |
| Padding | 12 16 |
| Border | 1 px `#E6E8EE`, radius 8 |
| Label | 14 / 500 ink2 |
| Count | 24 / 32 / 600; ink when above 0, ink3 when 0 |

- **Selected tile:** 2 px purple border (with the inner padding reduced by 1 px so nothing shifts) and the
  label in purple. **Ready to send** is selected on load.
- **Hover:** `#F7F8FA`.
- **Semantics:** `role="tablist"` / `tab`, with `aria-controls` pointing at the table.
- **Clicking a tile filters the table.** A zero tile is clickable. It shows the empty-table state: "No site is
  pitched yet. A site moves here when you Update status after sending."
- **Being built** is not a tile, because it is not a pitch status and filtering by it would show nothing here.
  It is the quiet text "0 being built" (14 / 500 ink3) right-aligned on the "Sites" section title line. It is
  a link to Pipeline when it is above 0.

There are no icons, no deltas and no sparklines, because there is no history.

### Row anatomy (≥1760: one line, 56 px)

The row has `padding: 0 16`. Its cells, left to right, with a 24 gap between cells:

| Cell | Content | Width |
|---|---|---|
| Thumb | 64×40, radius 6 | 64, then a 12 gap |
| Site | name 15 / 700 ink; then "by Shahar" 14 / 500 ink3 under it (two-line cell, Stripe's customer cell) | flexible, min 185 |
| Status | badge + age (14 / 500 ink3, red at 14+ days) on one line | min 160 |
| Website | Preview website ↗, 16 gap, Pitch ↗ (or the inactive form) | min 272 |
| Messages | the two Suggested secondary buttons, 8 gap | content: KA 174 + 8 + 204 = 386; GS 142 + 8 + 174 = 324 |
| Record | Update status | 114 |
| Hand off | ghost button with icon | 91 |

**Budget:** 76 + 185 + 160 + 272 + 386 + 114 + 91 + 5 × 24 = **1404**, plus 32 padding. That fits from about
1740 viewport, so the switch is set at **1760**.

**Between 1400 and 1760** the Website and Messages cells stack to two lines inside the same columns:
- Preview website ↗ over Pitch ↗;
- Suggested WhatsApp over Suggested in-person script.

In this range the Suggested buttons become 28 px tall, and the row is **72 px**. Budget at 1440: 76 + 185 +
120 + 144 + 204 + 114 + 91 + 120 = **1054** ≤ 1104 inner. The Site column takes the spare. This needs a
1390 viewport, so **below 1400** the row takes the two-line 1024 form (below).

**Column headers** ("Site · Status · Website · Messages", 14 / 600 ink3, 40 px, hairline under) show above
1400 only. Update status and Hand off have no header, as Stripe's row actions don't.

**Hover:** the row tints `#F7F8FA`. The row itself is **not** a click target, because every action is
explicit. A row click would be a sixth, unlabelled action.

**Sort:** by status, then age (oldest first), then name. That gives KA, Layday, Lavish, Global Surf today.

### CTAs

- They sit in fixed columns, so every Update status in the table lines up vertically. You can scan down one
  column and see one purple button per site.
- Hand off sits at the far right in every row.
- Preview website and Pitch open new tabs.
- The Suggested buttons and Update status open the popups in §5. So does Hand off.

### Waiting on you and handoffs

Two panels side by side under the table (each 1fr, gap 24). Each has a header row of 48 px: title 16 / 700
and a count badge `#F3EEFD` / purple. Under it is a hairline list.

**"Also waiting on you"**
- It holds everything waiting on Shahar that is not a site row: decisions (agent tweaks, mockup picks,
  shortlist approvals) and handoffs *to* Shahar.
- Each row is 56 px: a 20 px icon in ink2; a title (14 / 600 ink, "3 suggested agent tweaks"); a sub-line
  (14 / 500 ink3, "Approve or reject each one in Decisions."); and at the right, the secondary button
  **Review them**, which opens Decisions.
- A handoff to Shahar adds a row: "Alon asks: <request>" · "KA Surf Hostel · 2 days" · **Copy prompt**.

**"Handoffs"**
- It holds what Shahar handed to Alon: "To Alon · KA Surf Hostel" / "<request in plain words>" / age ·
  **Copy prompt**.
- Empty: "Nothing handed off. Use Hand off on a site to ask Alon for something."

### Type and space (A)

| Element | Size |
|---|---|
| Money | 40 / 48 / 600 |
| Tile count | 24 / 32 / 600 |
| Section title | 18 / 700 |
| Table and body | 14 |
| Name | 15 / 700 |

- Row heights: 56 at ≥1760, 72 from 1400 to 1760, 92 below 1400.
- Gaps: 40 between sections and 16 from a section title to its content. Tiles gap 12. Panels gap 24.

**Purple is used for:**
- Update status (×4);
- the selected tile's border and label;
- the "Ready to send" badges;
- the panel count badges;
- the focus ring.

### Left out (A)

- Any coloured block.
- Icons on tiles.
- Deltas or sparklines.
- Type, run and quality per site.
- A row click.
- A "•••" menu: every action is visible, so none is hidden.

## 3. Direction B: "Home"

**The idea:** Stripe Home. One full-width "Today" band holds the money, with the five counts as a quiet
key-value column at its right. Under it are the sites as comfortable two-line rows, and on wide screens a
right rail holds what is waiting on you and the handoffs.

**Borrowings**
- **Stripe Home "Today":**
  - the hero figures at the left;
  - a narrow right column of label/value pairs split off by a vertical hairline (their USD balance and
    Payouts become the five counts);
  - the right-hand column of the page, which Stripe uses for "Recommendations" and balances, becomes the rail.
- **Stripe Balances:** the five counts as hairline-separated label/value rows, values right-aligned.
- **Logip** (`15-38-48`): the task list. Each row is a thing to do, with its status in its own column and the
  action at the right end, about 54 px. Here the rows are two-line because the CTAs are many.
- **Shopeers** (`15-38-04`): white surfaces on a cool ground, 1 px borders, radius 12, title + figure + one
  context line.
- **NexaFlow** (`15-41-49`): the "Pending approvals 2 / Change orders awaiting" small card, a figure plus one
  plain-words link, for the rail's tweaks item. Only its shape is taken, not its purple.
- **Round-1 C:** divisions as distinct white surfaces on a cool ground. This is the most literal take on "top
  part of C" minus the purple.

**Ground.** Cool `#F6F7F9`. Three white surfaces (money band, sites list, rail): 1 px `#E6E8EE`, radius 12, no
shadow, padding 24.

### Grid at 1920 (content 1616; rail at ≥1600)

```
┌ 240 ┬──────────────────────────────────────── content 1616 ───────────────────────────────────────────┐
│     │ Overview                                                              ● Live · changes saved     │
│     │ 4 sites are ready to pitch. The oldest has waited 10 days.                                       │
│     │ ┌ band, white ───────────────────────────────────────────────────────────────────────────────┐  │
│     │ │ Revenues                       Expenses                        │ Being built            0   │  │
│     │ │ $0                    48/600   $0                    48/600    │ ───────────────────────── │  │
│     │ │ This month $0                  This month $0                   │ Ready to send          4   │  │
│     │ │ No payments recorded yet.      No expenses recorded yet.       │ ───────────────────────── │  │
│     │ │ Tell Claude "record a payment" Tell Claude "record an expense" │ Pitched                0   │  │
│     │ │                                                                │ Replies                0   │  │
│     │ │                                                                │ Clients                0   │  │
│     │ └────────────────────────────────────────────────────── 1fr ────┴──── 360 ─────────────────┘  │
│     │ ┌ Sites ready to pitch  4 ─────────────────────────────────────────┐ ┌ rail 360 ──────────────┐  │
│     │ │ ▭▭▭▭  KA Surf Hostel  by Shahar  [Ready to send] 10 days         │ │ Waiting on you      1  │  │
│     │ │ 112×70                                [Update status] ⇢ Hand off │ │ 3                      │  │
│     │ │       Preview website ↗  Pitch ↗  [Suggested WhatsApp] [Sugg…]   │ │ suggested agent tweaks │  │
│     │ │ ─────────────────────────────────────────────── 94 px ────────── │ │ Review them            │  │
│     │ │ ▭▭▭▭  Layday Surf Ahangama …                                     │ │ ────────────────────── │  │
│     │ │ ▭▭▭▭  The Lavish Haven …                                         │ │ Handoffs            0  │  │
│     │ │ ▭▭▭▭  Global Surf Lodge Kabalana …                               │ │ Nothing handed off. …  │  │
│     │ └──────────────────────────────────────────────────────────────────┘ └────────────────────────┘  │
└─────┴──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

The rail column is the same 360 px width as the band's right column, so the two right-hand edges stack into
one column. That is the Stripe Home spine.

### Grid at 1440 (content 1136; no rail)

```
┌ 240 ┬────────────────────────── content 1136 ──────────────────────────┐
│     │ Overview                                     ● Live · changes saved│
│     │ 4 sites are ready to pitch. The oldest has waited 10 days.         │
│     │ ┌ band ─────────────────────────────────────┬─ 320 ──────────────┐ │
│     │ │ Revenues $0 (48)     Expenses $0 (48)     │ Being built     0  │ │
│     │ │ This month $0        This month $0        │ Ready to send   4  │ │
│     │ │ No payments … (1 line, ellipsis + title)  │ Pitched 0 · Rep… 0 │ │
│     │ └───────────────────────────────────────────┴────────────────────┘ │
│     │ ┌ strip, white, 56 px ─────────────────────────────────────────────┐│
│     │ │ ⚙ 3 suggested agent tweaks  [Review them]  │  Handoffs: none yet  ││
│     │ └────────────────────────────────────────────────────────────────────┘│
│     │ ┌ Sites ready to pitch 4 ────────────────────────────────────────────┐│
│     │ │ ▭▭▭▭ KA Surf Hostel by Shahar [Ready to send] 10 days  [Update status] ⇢ Hand off │
│     │ │      Preview website ↗  Pitch ↗  [Suggested WhatsApp] [Suggested in-person script] │
│     │ │ … ×4, 94 px each                                                    ││
│     │ └────────────────────────────────────────────────────────────────────┘│
└─────┴────────────────────────────────────────────────────────────────────────┘
```

Below 1600 the rail folds into a **one-line strip** above the list, split into two halves by a
vertical hairline: "Waiting on you" items at the left, handoffs at the right. When there are more than 2
items, the strip shows the first 2 and "+ n more", which expands it in place.

### Grid at 1024 (content 904)

- **The band** keeps both money figures (40 px). The count column goes under them as one row of five
  label/value pairs split by hairlines.
- **The strip** and the **list** keep their 1440 form. The row budget (§ below) fits in 872.

### At 390

- **The band** stacks: Revenues, Expenses, then the five counts as a key-value list with 44 px rows.
- **The strip** becomes two stacked rows.
- **Each site row:**
  - the thumbnail goes full width at 16:10 (358×224), radius 8;
  - then the name, "by Shahar" and the badge with its age;
  - then the links line;
  - then the Suggested buttons full width;
  - then **Update status** full width at 44 px, and Hand off.

This is the only direction where the picture grows on a phone. On a phone you judge the site by eye before
sending from it.

### The metric row: a key-value column

**Money**

| Element | Size and colour |
|---|---|
| Label | 14 / 500 ink2 |
| Value | 48 / 56 / 600 ink. The largest type on the page: money first and biggest, as ranked. |
| "This month $0" | 14 / 500 |
| Hint | one line, 14 / 500 ink3 |

- The two money columns sit inside the band's 1fr area, each `minmax(240px, 1fr)`.

**The five counts.** A Stripe balance summary, not tiles. One column, 360 (320 at 1440), split from the money
by a full-height vertical hairline.

| Property | Value |
|---|---|
| Rows | 5 × 40 px, hairline between |
| Label | left, 14 / 500 ink2 |
| Value | right, 16 / 600 ink, ink3 when 0 |
| Order | the brief's: Being built, Ready to send, Pitched, Replies, Clients |

- A row whose count is above 0 shows a 14 px chevron after the value and is a link. Ready to send scrolls to
  the list. Being built opens Pipeline. Pitched, Replies and Clients open Sites, filtered.
- No boxes, no icons and no bars: the "small matrixes" become five lines of text.

### Row anatomy (all widths ≥1024: two lines, 94 px)

`padding: 12 16`. Left: the thumbnail, 112×70, radius 6, then a 16 gap. The text area beside it holds two
lines with an 8 gap.

**Line 1** (24 px): name 15 / 700 · 8 · "by Shahar" 14 / 500 ink3 · 16 · badge · 8 · age 14 / 500 ink3. Then
pushed right: **Update status** (primary, 32 tall), 8, **Hand off** (ghost).

**Line 2** (32 px): Preview website ↗ · 16 · Pitch ↗ (or the inactive form) · 24 · Suggested … secondary
buttons with a 16 px speech icon and an 8 gap between them.

**Budget**
- Line 1: 185 + 8 + 56 + 16 + 100 + 8 + 43 + 24 + 114 + 8 + 91 = 653.
- Line 2, worst case (inactive Pitch and the two longest Suggested labels): 112 + 16 + 144 + 24 + 204 + 8 + 174 = 682.
- Text area need: 682. Full row: 128 + 682 + 32 = **842**.
- That fits 872 (1024), 1104 (1440) and the 1920 list with the rail (1616 − 360 − 24 = 1232).
- The rail is shown only at ≥1600, where the list is ≥ 912. At 1440 the list with a rail would be 752 and the
  row would not fit, which is why the rail folds there.

The thumbnail is also a link: Preview website, same accessible name. Row height is 70 + 24 = **94** at every
width ≥1024. With 4 sites the list is 4 × 94 + a 56 header = 432 px.

### CTAs

- **Update status** and **Hand off** sit on line 1 at the right. The "record" action shares a line with the
  status it changes. You read "Ready to send · 10 days" and the button that changes it is on the same line.
- **The opening and copying actions** sit on line 2, left-aligned under the name, in grammar order.
- **Height check at 1440:** each Update status is at the same x and 94 px apart. At 1440 the first one is at
  about y 420 and the last at about y 700, all four on the first screen.

### Waiting on you and handoffs: the rail

At ≥1600 the rail is a white surface, 360, padding 24. Two sections with a hairline between.

**"Waiting on you"** (title 16 / 700 + count badge). Each item is a NexaFlow-style block:
- the figure "3" at 28 / 600 ink;
- the label "suggested agent tweaks" at 14 / 500 ink2;
- the secondary button **Review them**, 32 px, full rail width.

Items are stacked with 16 between them. Handoffs to Shahar join this list ("Alon asks…", with **Copy prompt**).

**"Handoffs"** lists what Shahar handed to Alon. Each is 3 lines:
- "To Alon · KA Surf Hostel";
- the request in plain words, max 2 lines with an ellipsis;
- the age plus **Copy prompt** (ghost).

Empty: one line, "Nothing handed off. Use Hand off on a site to ask Alon for something."

### Type and space (B)

| Element | Size |
|---|---|
| Money | 48 / 56 / 600 |
| Count values | 16 / 600 |
| Rail figure | 28 / 600 |
| Section title | 18 / 700 |
| Name | 15 / 700 |

- Surface padding 24, gap between surfaces 24, row 94.
- Ground `#F6F7F9`, surfaces white, radius 12.

**Purple is used for:**
- Update status (×4);
- "Ready to send" badges;
- count badges;
- the focus ring.

The number column is ink only. Of the three, B uses the least purple.

### Left out (B)

- Status tiles and any filter: the list is only "ready to pitch" plus pitched sites, sorted. The full
  filtering is on Sites.
- Column headers: two-line rows don't need them.
- Charts. When money entries exist, a 12-month bar pair (revenue vs expenses, 120 px) may appear inside the band
  under the figures. Today it is not drawn.
- Rows for sites in any state other than ready to send and pitched.

## 4. Direction C: "Queue"

**The idea:** one white sheet divided by hairlines, Sypher-style:
- money and the five counts in one top band, with the counts written as a single figure line over a dotted
  stage line;
- below it, **one queue of everything that waits on Shahar**, grouped by what kind of thing it is, in dense
  one-tier rows. Sites to pitch, decisions and handoffs are rows of the same list.

**Borrowings**
- **Sypher** (`15-36-13`, `15-44-34`):
  - the whole page as one white sheet cut into areas by full-bleed hairlines (no cards);
  - the Invoices header: Paid / Recent request / Unpaid as label + figure columns, with a thin bar running
    under all of them. Here the five counts become five figure columns, with a 2 px stage line and dots under
    them.
- **23andMe** (`09-25 15-38-36`): reached vs not reached. A dot is filled purple when that stage holds at least
  one site, and is a grey ring when it holds none. This is round-1 C's chain without the pills or boxes.
- **Stripe Payments / Customers:**
  - the two-line name cell (name over a quiet second line), which carries the website links here;
  - one-line hairline rows, about 56 px;
  - grouped sections in one table, each with a 40 px group header (as Stripe groups by date).
- **Dasbor** (`15-45-44`): the to-do idea, one list with a count, not separate boxes. A fixed list, not
  checkboxes.

**Ground.** White, edge to edge. Full-bleed horizontal hairlines (from the sidebar edge to the window edge)
divide the head, the top band and the queue. There are no boxes on the page except buttons and badges.

### Grid at 1920 (content 1616)

```
┌ 240 ┬───────────────────────────────────────── content 1616 ──────────────────────────────────────────┐
│     │ Overview                                                              ● Live · changes saved    │
│     │ 4 sites are ready to pitch. The oldest has waited 10 days.                                      │
├─────┼─────────────────────────────────────────────────────────────────────────────────────────────────┤ full-bleed
│     │ Revenues          Expenses        ┃ Being built   Ready to send   Pitched    Replies    Clients  │
│     │ $0      36/600    $0              ┃ 0             4               0          0          0        │
│     │ This month $0     This month $0   ┃ ○─────────────●───────────────○──────────○──────────○        │
│     │ No payments recorded yet. Tell Claude "record a payment" · No expenses recorded yet. Tell …     │
├─────┼─────────────────────────────────────────────────────────────────────────────────────────────────┤ full-bleed
│     │ Waiting on you  5                                                                               │
│     │ READY TO SEND · 4 (group header, 40 px, `#F7F8FA` ground)                                       │
│     │ ▭ KA Surf Hostel  by Shahar      [Ready to send]   [Suggested WhatsApp] [Suggested in-person     │
│     │   Preview website ↗ · Pitch ↗    10 days            script]   [Update status]  ⇢ Hand off       │
│     │ ───────────────────────────────────────────────────────────────── 60 px, one tier ──────────── │
│     │ ▭ Layday Surf Ahangama …                                                                        │
│     │ ▭ The Lavish Haven …                                                                            │
│     │ ▭ Global Surf Lodge Kabalana / Preview website ↗ · ◷ Pitch · not online yet … [Suggested email] │
│     │ DECISIONS · 1                                                                                   │
│     │ ⚙ 3 suggested agent tweaks / Approve or reject each one in Decisions.         [Review them]     │
│     │ HANDED OFF TO ALON · 0 → one quiet line: "Nothing handed off. Use Hand off on a site…"          │
│     │ PITCHED, WAITING FOR A REPLY · 0 → hidden while empty                                           │
└─────┴─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

The group headers are written here in capitals only to mark them in the sketch. On the page they are sentence
case, 14 / 700 ink2.

### Grid at 1440 (content 1136)

```
┌ 240 ┬────────────────────────── content 1136 ──────────────────────────┐
│     │ Overview                                     ● Live · changes saved│
│     │ 4 sites are ready to pitch. The oldest has waited 10 days.         │
├─────┼────────────────────────────────────────────────────────────────────┤
│     │ Revenues      Expenses     ┃ Being built  Ready to send  Pitched  Replies  Clients │
│     │ $0 (36)       $0           ┃ 0            4              0        0        0       │
│     │ This month $0 This month $0┃ ○────────────●──────────────○────────○────────○       │
│     │ No payments recorded yet … · No expenses recorded yet …            │
├─────┼────────────────────────────────────────────────────────────────────┤
│     │ Waiting on you 5                                                    │
│     │ Ready to send · 4                                                   │
│     │ ▭ KA Surf Hostel by Shahar  [Ready to send] [Suggested WhatsApp] [Suggested in-person script] [Update status] ⇢ Hand off │
│     │   Preview website ↗ · Pitch ↗  10 days                              │
│     │ … ×4, 60 px                                                         │
│     │ Decisions · 1                                                       │
│     │ ⚙ 3 suggested agent tweaks …                          [Review them] │
│     │ Handed off to Alon · 0  Nothing handed off. …                       │
└─────┴────────────────────────────────────────────────────────────────────┘
```

The band split is money `minmax(0, 2fr)` | a 1 px vertical rule | counts `3fr`. The money hints run under the
band as one line (they would wrap inside the 2fr column).

**Height at 1440**:

| Block | Height |
|---|---|
| Head | ~100 |
| Band | ~150 |
| Queue header | 48 |
| One group header | 40 |
| Four site rows | 4 × 60 |
| Decisions | 40 + 60 |
| Handoffs line | 40 |

That totals about 760. Everything Shahar asked for is on one screen at 1440, the shortest page of the three.

### Grid at 1024 (content 904)

- **The band:** money on top (two columns), then the five counts and the stage line full width under them.
- **The queue rows** go two-tier (§ below), 100 px.

### At 390

- **The band:** money as two columns of 171 (28 px). The counts become a vertical list of five 40 px rows, with
  the dots in a 12 px left gutter joined by a vertical 2 px line, the same stage line turned 90°.
- **Queue rows** stack:
  - thumbnail 72×45, name, by, badge with age;
  - then the links line;
  - then the Suggested buttons full width;
  - then **Update status** full width at 44 px, and Hand off.
- **Group headers** stay.

### The metric row: one figure line plus a stage line

**Money**

| Element | Size and colour |
|---|---|
| Label | 14 / 500 ink2 |
| Value | 36 / 44 / 600 ink |
| "This month $0" | 14 / 500 |

- Money still has the largest figures on the page, but C keeps the band low (about 150), so the queue is the
  main body.

**The five counts.** Five equal columns.

| Element | Size and colour |
|---|---|
| Label | 14 / 500 ink2 |
| Count | 28 / 36 / 600; ink when above 0, ink3 when 0 |

**The stage line** sits 12 px under the figures:
- one 2 px `#E6E8EE` line runs from the first column's left edge to the last column's;
- on it, one 10 px dot per column, left-aligned with the column's label;
- a dot is solid purple if its stage holds ≥1 site, and a 2 px `#C3ACF3` ring otherwise (the ring is a
  graphic, not text, so it is not held to text contrast);
- the line segment between two purple dots is purple. Today none is, because only Ready to send holds sites.

It reads in one glance: everything is at "ready to send". There is no pill, box or icon, and no percentages
(of zero).

Each count is a link when it is above 0: Ready to send jumps to the group, Being built opens Pipeline, and the
others open Sites, filtered.

### Row anatomy (≥1400: one tier, 60 px)

`padding: 0 16`. Cells left to right, with a 16 gap between them:

| Cell | Content | Width |
|---|---|---|
| Thumb | 56×35, radius 6 | 56, then a 12 gap |
| Name cell | line 1: name 15 / 700 + 8 + "by Shahar" 14 / 500 ink3 · line 2: Preview website ↗ · Pitch ↗ in blue 14 / 600, separated by a 14 px ink3 "·" (or the inactive form) | min 272 |
| Status | badge over the age (14 / 500 ink3), stacked | 120 |
| Right group (`margin-left: auto`) | the Suggested secondary buttons **without icons** (the labels say it all), 8 gap · 16 · Update status · 8 · Hand off ghost | KA 152 + 8 + 182 + 16 + 114 + 8 + 91 = 571; GS 120 + 8 + 152 + 16 + 114 + 8 + 91 = 509 |

**Budget:** 68 + 272 + 16 + 120 + 16 + 571 + 32 = **1095**. That fits from a 1399 viewport, so the switch is
at **1400** and 1440 is one tier with 41 px to spare.

**Below 1400** the right group drops to a second tier, under the name cell and right-aligned. The row is then
100 px.

**Rows of other kinds** use the same grid and are 60 px:
- **Decision row:** a 20 px icon in a 56×35 `#F7F8FA` box in the thumb slot; the name cell holds the title over
  a sub-line ("Approve or reject each one in Decisions."); the right group holds **Review them** (secondary).
- **Handoff row:** the thumb slot holds the site's thumbnail; line 1 is "To Alon · KA Surf Hostel"; line 2 is
  the request in plain words; the status cell holds the age; the right group holds **Copy prompt** (ghost).

**Group headers:** 40 px, `#F7F8FA` ground, 14 / 700 ink2 "Ready to send" + " · 4" in ink3.

**Group order:**
1. Handed off to you.
2. Ready to send (oldest first).
3. Decisions.
4. Handed off to Alon.
5. Pitched, waiting for a reply.

An empty group shows one quiet line under its header if it is a group Shahar should know is empty ("Handed
off to Alon · 0 — Nothing handed off…"). Otherwise it is hidden: "Handed off to you" and "Pitched" are hidden
while they are 0.

**The queue title** "Waiting on you 5" counts every row in it: 4 sites + 1 decision today.

### CTAs

- **Update status** sits at the same x in every site row; that x is fixed because the right group is
  right-aligned.
- **The website links** live with the name (look at the site), and everything you *do* is at the right.
- **No row is clickable.**
- **Review them** and **Copy prompt** take the Update status slot in their own row types, so the right edge of
  the queue is always "the thing to do".

### Type and space (C)

| Element | Size |
|---|---|
| Money | 36 / 44 / 600 |
| Counts | 28 / 36 / 600 |
| Queue title | 18 / 700 |
| Group header | 14 / 700 |
| Name | 15 / 700 |

- Row 60, group header 40.
- Full-bleed hairlines between the head, the band and the queue. Band padding 32 0.

**Purple is used for:**
- Update status (×4);
- the filled stage dot or dots;
- "Ready to send" badges;
- the queue count badge;
- the focus ring.

### Left out (C)

- All boxes and surfaces.
- Column headers: the group header does that job.
- Separate panels for waiting and handoffs (they are groups).
- Icons on Suggested buttons.
- Any filter: groups replace it.

## 5. Popups (same in A, B and C)

### Container

- Centred, 560 px wide (`min(560px, 100vw − 32px)`), white, 1 px `#E6E8EE`, radius 12.
- Shadow `0 12px 32px rgba(17,24,39,.12)`. This is the one shadow on the page, because it floats.
- Over a `rgba(255,255,255,.8)` veil.
- **Header:** padding 20 24; title 18 / 700; subtitle 14 / 500 ink2; a 32 px × button; hairline under.
- **Body:** padding 24.
- **Footer:** hairline, padding 16 24, buttons right-aligned (secondary then primary).
- **Behaviour:**
  - Esc, ×, or a veil click closes it.
  - Focus is trapped inside and returns to the button that opened it.
- **At 390** it is a bottom sheet: full width, radius 16 at the top, max-height 90 vh, with the footer pinned.

### Suggested email / WhatsApp / in-person script

- **Title:** "Suggested WhatsApp", with the subtitle "KA Surf Hostel".
- **Body:**
  1. "To: …" when the draft names one (14 / 500).
  2. The message alone in a `#F7F8FA` box, radius 8, padding 16, 15 / 24, `white-space: pre-wrap`. A 32 px
     copy icon button sits in the box's top-right corner. On click it shows a check and "Copied" for 1.6 s,
     with a polite live region.
  3. "Before you send" (disclosure, collapsed): the draft's sender notes, with markdown stripped and no file
     names.
- **Footer:**
  - at the left, the text "Sent it?" and the link **Update status**, which swaps to that site's Update status
    popup;
  - at the right, **Close**.
- The text is the real draft from `sites/<slug>/pitch/message.*.md` / `in-person.*.md`, as in round 1.

### Update status

- **Title:** "Update status", with the subtitle "KA Surf Hostel". Under the header, the line "Record what
  happened. Nothing is sent from here."

**Ready to send:**
- "Did you send the pitch?";
- "How" as four radio cards in a row (WhatsApp · Email · In person · Phone): 44 px, 1 px border, selected =
  2 px purple border;
- "When" as a date (today);
- "Note" (optional);
- primary **Save as pitched**.

**Pitched:**
- "What did the owner do?";
- radio cards **Reply · Booked a meeting · Sale · No answer**;
- primary **Save**.

**After saving:**
- the popup closes and the row's badge updates in place ("Pitched 5 Oct via WhatsApp");
- a 4 s toast at the bottom centre says what changed;
- every count (tiles / key-value column / figure line, and the queue count) updates with it.

This fixes round-1 C's "4 beside 3" mismatch.

### Hand off (with the round-1 hard fail fixed)

**Step 1**
- **Title:** "Hand off", with the subtitle "KA Surf Hostel".
- "To": Alon, as a fixed line. There are only two operators, so it is not a select.
- "What should Alon do?" (textarea, 4 rows).
- Primary **Hand off**.

**Step 2** replaces the body in place:
- A green check and "Handed off to Alon."
- **Request** (14 / 600 ink2 label), then *exactly what Shahar typed*, in 15 / 24 ink.
- **Site:** "KA Surf Hostel".
- "Send it to Alon: copy the prompt and paste it to him." Slack comes later.
- **Copy prompt**: a secondary button with a copy icon. It copies the full `handoffPrompt()` text and shows
  "Copied" for 1.6 s.
- **Show the full prompt**: a disclosure, **collapsed by default**. Expanded, it shows the prompt in a
  `#F7F8FA` box at 14 / 22. Only there can file names appear. Back-ticks are stripped for display; the
  copied text is unchanged.
- **Footer:** **Done**.

**Afterwards** the handoff appears in the direction's handoff area:
- A: the Handoffs panel;
- B: the rail or strip;
- C: the "Handed off to Alon" group.

It shows the request in plain words, its age and **Copy prompt**. The prompt itself is never shown on the page.

## 6. How the three differ

| | A · Payments | B · Home | C · Queue |
|---|---|---|---|
| Surfaces | white page, hairlines; only tiles and two panels are boxed | cool ground, three white surfaces (C's divisions) | one white sheet cut by full-bleed hairlines |
| Money | balance summary, 40 px | hero, 48 px | low band, 36 px |
| Five counts | 5 selectable status tiles that filter the table (Stripe Payments) | key-value column at the band's right (Stripe Home / Balances) | one figure line over a dotted stage line (Sypher + 23andMe) |
| Site list | table with headers; 56 px one line at ≥1760, 72 px stacked cells at 1400–1760, 92 px two-line below | two-line rows, 112×70 thumb, 94 px | one-tier rows in groups, 56×35 thumb, 60 px |
| Where Update status sits | its own column | line 1, right, beside the status | right end of the row |
| Waiting on you + handoffs | two panels under the table | right rail at ≥1600, a one-line strip below that | groups inside the same queue |
| Page height at 1440 | ~960 | ~900 (rail folded) | ~760 |
| Fastest for | scanning and filtering many sites | reading the business at a glance, then acting | working through everything in one list |

## 7. Notes for Shahar and the designer (decisions I took, flagged)

1. **The sidebar mirrors the live one** (seven items, including Needs you and Ledger). The round-1 critic flagged
   this as unconfirmed. The live "Needs you 7" will not match the Overview's waiting count (5 in C), so one of
   the two definitions needs aligning. I did not change it; it is outside the Overview.
2. **"by Shahar" stays in the row** despite "nothing else", because the amendment keeps who ran it as a quiet
   attribute.
3. **Status words** are the brief's: Ready to send / Pitched <date> via <channel> / Reply / Sale. Round 1 used
   "Replied" / "Bought", which are now gone.
4. **The Stripe specifics in §1 are from memory**, not measured. The Manrope widths in §0 and the row budgets are
   measured.
