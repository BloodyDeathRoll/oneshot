# Overview, run `dashboard-03`: three directions

Creative director, 2026-10-05. Task layer: `dashboard/BRIEF-overview-03.md`, which overrides
`agents/creative-director/base.md` where they conflict. `dashboard/BRIEF.md` §5 and the locked purple palette
(Amendments) still apply. This is a product UI, so the archetype, photo and sampled-colour rules in base.md do
not apply here.

## 0. What I looked at, and what is wrong today

**The current page** (`http://localhost:8970/`, shot at 1440×1000, 1024×800 and 390×844). Here is what is
concretely wrong, beyond "looks bad":

1. **Every site row has seven buttons of almost the same weight.** Preview website, Pitch, two drafts, Update
   status and Hand off are all 13 px pills. Only Update status is filled, and it sits apart in a right-hand
   column. Nothing says which button opens a website, which opens text to copy, and which changes the record.
   That is why "Send the pitch" read as if it sent something.
2. **Hand off opens inline.** It expands a panel inside the list and pushes the next site down. This is the
   "very weird way & location". Update status is a popup, so the two actions on the same row behave differently.
3. **Terminal text and jargon on the page:** `node tools/money.mjs revenue <slug> <item> <amount>` under both
   money cards; "live · localhost:8970 · decisions append to the ledger"; run ids such as `globalsurf-02`;
   "Other gates waiting"; the sidebar footer ("401 ledger lines · main da4957d"). Each draft file starts with
   sender notes ("Human sends (gate c); run is `mode: test`"), so those notes need hiding too.
4. **Four zeros take a whole row of five equal cards** (Pitched 0, Replies 0, Clients 0, Being built 0). They
   take as much room as the one number that matters (Ready to send 4).
5. **Type is too small to read comfortably.** Labels, metadata, status and every button are 13 px.
6. **The 390 px layout breaks.** The page is 504 px wide, so it scrolls sideways. The sidebar stays a rail, the
   site names wrap one word per line, and the money hint runs one word per line.
7. **Useful facts are missing.** The page never says *how long* each pitch has been waiting (KA and Layday 10
   days, Lavish 7, Global Surf 0, from `gates[].since`). That is the most actionable number on the page.

**The data today** (`dashboard/data.json`):
- Revenues $0 and Expenses $0, with no entries.
- 4 sites ready to send, all run by Shahar: Global Surf Lodge Kabalana (surf camp, run `2026-09-globalsurf-02`,
  no critic score, pitch page not live) and KA Surf Hostel 86, Layday Surf Ahangama 91.5 and The Lavish Haven
  91.5 (beach lodging, run `2026-09-ahangama-02`).
- The drafts differ per site. **Global Surf has a suggested email and WhatsApp, but no in-person script. The
  other three have WhatsApp and an in-person script, but no email.**
- 0 pitched, 0 replies, 0 clients and 0 being built. No open handoffs. One other gate: "3 suggested agent tweaks".

**References**: all 13 PNGs in `~/Projects/oneshot/dashboard/ref/` were opened. Each is named by its file and by
the product shown:

| File | Product | What it is good at |
|---|---|---|
| `…09-25 15-38-36` | 23andMe relationship tree | Reached steps are solid colour, unreached ones are grey outlines, and the path between them is drawn. |
| `…09-25 15-40-32` | Ancestry "Compare" | Two people side by side (SN / AH initials discs), one row per measure, a value per person. |
| `…09-27 15-36-13`, `15-44-34` | Sypher | Tabs that filter a table (All · Unpaid · Paid), a segmented bar over figures, dense and calm. |
| `…09-27 15-36-41` | Mondly | Big numeral with a small grey label beside it; one highlighted (purple) card in a row of cards; one black "Continue learning" button per card. |
| `…09-27 15-38-04` | Shopeers | White KPI cards, title + numeral + small context line; a tidy product table. |
| `…09-27 15-38-28` | Nexus | Purple tints as the only colour; restrained headers. |
| `…09-27 15-38-48` | Logip | "Hello, Margaret" plus a one-line summary; a stat strip with icon discs and dividers instead of cards; a task list with status dots; a right-hand activity rail. |
| `…09-27 15-41-49` | NexaFlow | One solid purple card holding three money figures in white; a small "Pending approvals 2 / Change orders awaiting" card with a plain-words link. |
| `…09-27 15-42-53` | Nodus | One oversized number dominating the screen, with small stats to its left. |
| `…09-27 15-43-09` | FinGuard | A statement card ("Your transaction volume has increased…"); "Secure your account further by: [Verify email] [Enable 2FA]", i.e. suggested actions as labelled pills under a sentence; history rows with status pills. |
| `…09-27 15-45-44` | Dasbor | A "To-Do List / Today" column with checkboxes beside the main content. |
| `…09-27 15-46-57` | Models (R.) | A page title with a one-line subtitle and one black primary button; table rows with status pills; a side card listing items with a value each. |

## 1. Shared by all three directions

These are the fixes for Shahar's complaints. They hold in A, B and C, so the three differ in structure, not in
whether they work.

### 1.1 One action grammar: four kinds of action, four looks

| Kind | Actions | Look | Behaviour |
|---|---|---|---|
| **Opens a website** (new tab) | Preview website, Pitch | Blue `#1F4BFF` text with a ↗ icon, no fill, 15 px, weight 700. Blue is for links only, so blue always means "a website opens". | New tab. Nothing changes in the dashboard. |
| **Opens text to copy** | Suggested email, Suggested WhatsApp, Suggested in-person script | Outline pill: white, 1.5 px `#E5E8EF` border, ink text, 15 px / 700, 40 px tall, with a small speech-bubble icon on the left. | Opens the popup in §1.2. |
| **Changes the record** | Update status | The **only filled purple** (`#6A2FE0`, white text) button for the site, 44 px tall. | Opens the Update status popup (§1.3). |
| **Involves the other operator** | Hand off | Ghost button: no border, `#4B5563` text plus a person-arrow icon. | Opens the Hand off popup (§1.4). Never inline. |

Each site gets **only the drafts it actually has**. Global Surf shows Suggested email and Suggested WhatsApp. The
other three show Suggested WhatsApp and Suggested in-person script. A missing draft is not shown greyed out,
because nothing can be done about it from here.

**Pitch, inactive** (Global Surf today) stays in the same place so rows line up:
- grey `#6B7280` text, no ↗ icon, and a small clock icon;
- the words **"Pitch · not online yet"**: in A and C as a second line under "Pitch", in B as a tooltip and as
  the `aria-describedby` text;
- `aria-disabled="true"` with the cursor left as default. Hover or focus shows: "The pitch page for Global Surf
  Lodge Kabalana is written but not online yet."

It must never look like a broken link or a dashed placeholder (today it is a dashed pill that just looks faulty).

### 1.2 The message popup (the three Suggested … actions)

**Container**
- One component for every popup on the page.
- Centred, 600 px wide, card radius 20, padding 28, over a `rgba(255,255,255,.8)` veil. No dark scrim.
- Title: "Suggested WhatsApp — KA Surf Hostel" at 20 px / 700. Close is a 40 px × button. Esc, a click on the
  veil, or × closes it. Focus is trapped inside and returns to the button that opened it.

**Contents, top to bottom**
1. The recipient, when the draft names one ("To: +94 77 374 6053"), at 15 px.
2. The message alone, in a soft box (`#F5F7FB`, radius 12) at 16 px / 1.6. The copy icon button (40×40,
   tooltip "Copy") sits at the top-right of that box. On click it shows a check and "Copied" for 1.6 s, and a
   polite live region says "copied".
3. The draft's sender notes, collapsed under "Before you send". No file names and no markdown symbols.

**Footer**
- One line: "Sent it? **Update status** to record it." The link swaps this popup for the Update status popup of
  the same site.
- This is the bridge that answers "the button didn't send anything": the popup itself says you send it and the
  dashboard records it.

### 1.3 The Update status popup

- Same container. Title: "Update status — KA Surf Hostel". The subtitle sits directly under the title, in
  15 px ink2: **"Record what happened. Nothing is sent from here."**

**When the site is Ready to send**
- Question: "Did you send the pitch?"
- "How": four large choice chips (WhatsApp · Email · In person · Phone, 44 px, radio semantics).
- "When": a date, defaulting to today.
- "Note": optional ("who you spoke to").
- Primary button: **Save as pitched**.

**When the site is already pitched**
- Question: "What did the owner do?"
- Choice chips, plain words for the four outcomes: **Replied · Booked a meeting · Bought · No answer**
  (reply / meeting / sale / ignored).
- Primary button: **Save**.

**After saving**
- The popup closes and the site's status updates in place ("Pitched 5 Oct by WhatsApp").
- A 4 s toast says what changed.
- In the static mockup, Save is disabled with the line "Saving works when the dashboard server is running".

### 1.4 The Hand off popup

- Same container. Title: "Hand off — KA Surf Hostel".
- "To": Alon, the other operator, pre-selected.
- "What should Alon do?": a textarea.
- Primary button: **Hand off**.
- After saving, the popup changes in place to: "Saved as Alon's task. Now send him this:", followed by the
  prompt in the same copy box as §1.2 and a button labelled **Copy prompt**.
- The prompt text is the existing `handoffPrompt()`. It is meant for Claude, so it may name files. It is shown
  only inside this copy box and never on the page.

### 1.5 Words and type

- **Status pills**:
  - Ready to send: `#F3EEFD` ground, `#6A2FE0` text.
  - Pitched 5 Oct by WhatsApp: grey ground.
  - Replied and Booked a meeting: green `#EDF7F0` / `#1A7F37`.
  - Bought: solid green with white text.
  - No answer: grey.
- **Age**: "Ready for 10 days" in ink2, turning red `#C0182B` from 14 days. That threshold is a design choice,
  shown as an age and not as a score.
- **Who ran it**: a 28 px initials disc ("S" on `#F3EEFD`, "A" on `#EDE6FB`) plus the name. The disc is filled
  purple with white text when it is the viewer.
- **Run**: the run id without the date prefix, written as a name ("Ahangama 02", "Globalsurf 02"). The full id
  is in the tooltip.
- **Critic score**: "Quality 86/100". Shown only where `critic_score` exists, so not for Global Surf.
- **Money empty state** (Revenues): "$0 so far" in `#6B7280`, light weight, then "No payments recorded yet.
  When a client pays, tell Claude 'record a payment' and it shows here."
- **Money empty state** (Expenses): "No expenses recorded yet. When you pay for a domain, hosting or a tool,
  tell Claude 'record an expense'."
  - No command line anywhere. `tools/money.mjs` is what Claude runs; Shahar never types it.
- **Mode line**: "Live · your changes are saved" (green dot) or "Read-only copy: start the dashboard to make
  changes" (grey dot). It never names the port or the ledger.
- **Sidebar footer**: becomes "Signed in as Shahar" plus "Updated 19:45". Commit hashes and ledger counts go.
- **Type**:
  - One family, Manrope (self-hosted, `tnum` on).
  - **Nothing on the Overview is under 14 px.** Body and buttons are 15–16 px.
  - Numerals use weight 300; names and buttons use 700.
- **Below 640 px** the left sidebar becomes a 56 px top bar (logo, "Overview", a menu button that opens the five
  views as a sheet). The gutter is 16 px and nothing scrolls sideways: `scrollWidth` must equal 390.

### 1.6 Left out by all three, on purpose

- Which agent ran when, and "last worked".
- Station progress bars and state names (`packaged`, `previewed`).
- The run selector on the Overview. It covers every run, so a selector there contradicts it; it stays on
  Pipeline.
- Recent-activity feeds, ledger line counts, commit hashes and port numbers.
- Sparklines and deltas: there is no history for money, pitches, replies or clients yet, and an empty sparkline
  is noise.
- File names, markdown, and the command lines.

## 2. Direction A: "Today"

**The idea:** the Overview is one to-do list, oldest first. Every site ready to pitch, every handoff for you and
every decision waiting on you is a step in the same queue, under the money.

**References: what it takes from each**
- **Logip** (`15-38-48`):
  - the greeting header "Good evening, Shahar" with a one-line plain summary under it ("4 sites are ready to
    pitch. Nothing has been sent yet.");
  - the stat strip: five figures in one white card, separated by 1 px dividers, each with a 36 px icon disc.
    This replaces the row of five cards.
- **Dasbor** (`15-45-44`): the "To-Do / Today" idea. The things you can act on form one list with a count, not
  three boxes.
- **FinGuard** (`15-43-09`): "Secure your account further by: [Verify email] [Enable 2FA]". Each site card
  writes its actions as short labelled lines, a sentence followed by pills, so the order of work is legible.
- **Mondly** (`15-36-41`): one strong button per card (their black "Continue learning", ours the purple Update
  status); the big numeral with a small grey label beside it, used for the money.
- **Shopeers** (`15-38-04`): white cards, radius about 16–20, very soft shadow, title + numeral + context line,
  for the two money cards.

### Layout at 1440 (content 1120, gutters 40)

```
┌ sidebar 240 ┬──────────────────────────── content 1120 ────────────────────────────────┐
│ OneShot     │ Good evening, Shahar                       ● Live · your changes are saved │
│ Overview ◀  │ 4 sites are ready to pitch. Nothing has been sent yet.            (17 px) │
│ Pipeline    │                                                                           │
│ Sites       │ ┌ Revenues ─────────────────────────┐ ┌ Expenses ────────────────────────┐│
│ Agents      │ │ $0  so far                  72 px │ │ $0  so far                 72 px ││
│ Decisions   │ │ No payments recorded yet. When a  │ │ No expenses recorded yet. When   ││
│             │ │ client pays, tell Claude …        │ │ you pay for a domain …           ││
│             │ └───────────────────────────────────┘ └──────────────────────────────────┘│
│             │ ┌ one card, five cells ─────────────────────────────────────────────────┐ │
│             │ │ ◎ Being built 0 │ ◎ Ready to send 4 │ ◎ Pitched 0 │ ◎ Replies 0 │ ◎ Clients 0│ │
│             │ └────────────────────────────────────────────────────────────────────────┘ │
│             │                                                                           │
│             │ Your next steps  (5)                                         28 px / 700  │
│             │ ┌ step ─────────────────────────────────────────────────────────────────┐ │
│             │ │ ┌ thumb 288×180 ┐  KA Surf Hostel                  Ready for 10 days  │ │
│             │ │ │  live site    │  Beach lodging, Ahangama 02  (S) Shahar  Quality 86  │ │
│             │ │ └───────────────┘                                                     │ │
│             │ │   Look first     Preview website ↗    Pitch ↗                         │ │
│             │ │   Send it yourself  [💬 Suggested WhatsApp] [💬 Suggested in-person…] │ │
│             │ │   Then record it [ Update status ]                        Hand off ⇢  │ │
│             │ └────────────────────────────────────────────────────────────────────────┘ │
│             │ ┌ step: Layday Surf Ahangama (10 days) ───────────── same shape ────────┐ │
│             │ ┌ step: The Lavish Haven (7 days) ─────────────────── same shape ────────┐ │
│             │ ┌ step: Global Surf Lodge Kabalana (today) ── Pitch · not online yet ───┐ │
│             │ ┌ step, compact, no thumb ──────────────────────────────────────────────┐ │
│             │ │ ◇ 3 suggested agent tweaks: approve or reject       [ Review them ]   │ │
│             │ └────────────────────────────────────────────────────────────────────────┘ │
│             │                                                                           │
│             │ Waiting on Alon  (0)                                         20 px / 700  │
│             │ Nothing handed off. Use Hand off on a site to ask Alon for something.     │
└─────────────┴───────────────────────────────────────────────────────────────────────────┘
```

**Step order:**
1. Handoffs *to you*. There are none today; when there are, they come first, because someone is blocked.
2. Pitches, by age (10, 10, 7, 0 days; ties by name).
3. Other decisions: tweaks, mockup picks, shortlist approvals.

The step label column is 140 px wide and right-aligned in ink3 15 px. The pills start at a shared left edge in
every step, so the three lines read as three rows of one table.

### Layout at 1024 (rail 72, content 888, gutters 32)

```
┌72┬─────────────────────────── content 888 ───────────────────────────┐
│  │ Good evening, Shahar                          ● Live              │
│  │ 4 sites are ready to pitch. Nothing has been sent yet.            │
│  │ ┌ Revenues  $0 (64 px) ─────────┐ ┌ Expenses  $0 ──────────────┐  │
│  │ └───────────────────────────────┘ └────────────────────────────┘  │
│  │ ┌ Being built 0 │ Ready 4 │ Pitched 0 │ Replies 0 │ Clients 0 ┐   │  icon discs drop, labels stay
│  │ Your next steps (5)                                               │
│  │ ┌ thumb 224×140 ┐ KA Surf Hostel            Ready for 10 days     │
│  │ └───────────────┘ Beach lodging, Ahangama 02 (S) Shahar Quality 86│
│  │ Look first        Preview website ↗  Pitch ↗                      │  labels go above the pills,
│  │ Send it yourself  [Suggested WhatsApp] [Suggested in-person…]     │  pills wrap to a second line
│  │ Then record it    [Update status]                    Hand off     │
```

### At 390

- The sidebar becomes a top bar.
- The money cards sit side by side at 171 px each: label, $0 at 40 px, and the hint shortened to "None
  recorded yet". The full sentence is in the card's info popup.
- The five-cell strip becomes a 2×3 grid (one cell blank, or Clients spanning two).
- Each step stacks: the thumbnail at full width (16:10), then the name, then each action line as a full-width
  label over wrapped pills. Update status becomes a full-width 48 px button. Hand off is a text button under it.

### Hierarchy (eye: first, second, third)

1. **The two $0 at 72 px**, the largest type on the page and at the top, where the eye starts. Money comes
   first, as Shahar ranked it.
2. **The summary sentence and the "Ready to send 4" cell.** It is the only non-zero cell, so it carries the
   `#6A2FE0` numeral; the zeros are ink3. Shahar sees the 100,000-ft view as one fact, "4 ready, nothing sent",
   rather than five boxes.
3. **The first step: the oldest pitch**, with its thumbnail, "Ready for 10 days", and who ran it next to the
   name.

What is waiting on Shahar is the list itself, so "what can I act on now" is the whole lower page. Handoffs
*to* him are steps; handoffs *from* him wait at the bottom under "Waiting on Alon".

### Actions

- **Primary:** Update status, one filled purple button per step, on the "Then record it" line.
- **Secondary:**
  - Suggested … pills on the "Send it yourself" line;
  - Preview website ↗ and Pitch ↗ as blue links on the "Look first" line;
  - Hand off as a ghost button at the far right of the last line.
- **Inactive Pitch:** "Pitch" in grey, with "not online yet" as a second line in 14 px ink3, under the same
  "Look first" label. Preview website ↗ stays blue beside it.
- The three line labels ("Look first / Send it yourself / Then record it") are the answer to "Send the pitch
  didn't send anything". The order of work is written on the card. This is a real sequence, so it is in words,
  not 01/02/03.
- The tweaks step has one secondary button, **Review them**, which opens Decisions at the tweaks.

### Empty states

- **Money:** as §1.5, inside the money cards. "$0" in `#6B7280` weight 300, with "so far" beside it at 17 px
  (Mondly's numeral-plus-label).
- **Handoffs:** "Waiting on Alon (0)" stays as a heading with one line under it: "Nothing handed off. Use Hand
  off on a site to ask Alon for something."
- **Empty queue:** "Nothing is waiting on you. New sites appear here when they are ready to pitch."

### Scales and palette

| | Scale |
|---|---|
| Type (px) | money 72 / 300 · page greeting 32 / 700 · section 28 / 700 · site name 22 / 700 · summary 17 · body and buttons 16 · labels and meta 15 · smallest 14 |
| Spacing | 4 · 8 · 12 · 16 · 24 · 32 · 48. Card padding 32. Gap between steps 16. Gap between sections 48 |
| Radius | cards 20, thumbnails 12, pills 999, popup 20 |

**Purple** is used for:
- the Update status buttons;
- the one non-zero numeral in the strip;
- the "Ready to send" pills;
- the count badge "(5)" (`#F3EEFD` ground, `#6A2FE0` text);
- the focus ring.

Nowhere else. It is the calmest of the three.

### Left out on purpose

- The thumbnails' size competing with money. They are 288 px, half of what B uses.
- Any chart.
- The pitch status of sites *already pitched*. When a site is pitched it leaves "Your next steps" and is listed
  under a collapsed "Pitched, waiting for a reply (n)" group at the bottom. It returns as a step when it has
  been waiting 7 days, with "No reply after 7 days: Update status".
- A separate "Other gates" box: decisions are steps.

**Risk:** with 20 sites ready, the list gets long. The step card must stay compact (thumbnail 180 px high at
most), and the designer should show it with the real 4.

## 3. Direction B: "Gallery"

**The idea:** the sites *are* the page. Each one is a large live-site picture card you can judge at a glance,
filtered by pitch status, with money above and a slim rail of what is waiting on you beside it.

**References: what it takes from each**
- **Mondly** (`15-36-41`):
  - the "My schedule" row of large cards, with a person disc and a name at the bottom of each, which becomes
    "who ran it" at each card's foot;
  - one card highlighted while the others are quiet: the oldest Ready to send card gets a 2 px `#6A2FE0`
    outline and a "Waiting longest" pill.
- **Sypher** (`15-36-13`): the "All · Unpaid · Resent request · Paid" tabs over a list become **All 4 · Ready to
  send 4 · Pitched 0 · Replies 0 · Clients 0**. The 100,000-ft view and the filter are one control. Zero tabs
  stay visible (that *is* the view) but are not clickable.
- **Sypher**: the segmented money bar under "Paid / Recent request / Unpaid", reused for Revenues vs Expenses
  once there are entries. Today it is not drawn (§Empty).
- **Logip** (`15-38-48`): the right-hand activity rail becomes "Waiting on you" (top) and "Handoffs" (below), in
  a 320 px column.
- **NexaFlow** (`15-41-49`): the small "Pending approvals 2 / Change orders awaiting" card, with a numeral and a
  plain-words link, for "3 suggested agent tweaks / approve or reject".
- **Shopeers** (`15-38-04`): the one-row money band, two numerals side by side in one card.

### Layout at 1440 (content 1120)

```
┌ sidebar 240 ┬──────────────────────────── content 1120 ────────────────────────────────┐
│             │ Overview                                         ● Live · changes saved   │
│             │ ┌ one card ────────────────────────────────────────────────────────────┐  │
│             │ │ Revenues            $0  so far   │ Expenses            $0  so far     │  │
│             │ │ 64 px numerals, hint under each (one line, §1.5)                      │  │
│             │ └───────────────────────────────────────────────────────────────────────┘  │
│             │ [ All 4 ] [ Ready to send 4 ] [ Pitched 0 ] [ Replies 0 ] [ Clients 0 ]   │
│             │                                         Being built: 0 in active runs    │
│             │ ┌──────────── gallery 776 ──────────────────┐ ┌──── rail 320 ──────────┐  │
│             │ │ ┌ card 376 ─────────┐ ┌ card 376 ─────────┐│ │ Waiting on you         │  │
│             │ │ │ thumb 376×235     │ │ thumb             ││ │ ┌ 3                   ┐│  │
│             │ │ │ (whole image =    │ │                   ││ │ │ suggested agent      ││  │
│             │ │ │  Preview website) │ │                   ││ │ │ tweaks               ││  │
│             │ │ ├───────────────────┤ ├───────────────────┤│ │ │ Approve or reject →  ││  │
│             │ │ │ KA Surf Hostel    │ │ Layday Surf …     ││ │ └─────────────────────┘│  │
│             │ │ │ Beach lodging,    │ │                   ││ │                        │  │
│             │ │ │ Ahangama 02       │ │                   ││ │ Handoffs               │  │
│             │ │ │ ● Ready to send   │ │                   ││ │ Nothing handed off.    │  │
│             │ │ │ 10 days  Qual. 86 │ │                   ││ │ Use Hand off on a site │  │
│             │ │ │ Preview website ↗ │ │                   ││ │ to ask Alon for        │  │
│             │ │ │ Pitch ↗           │ │                   ││ │ something.             │  │
│             │ │ │ Messages          │ │                   ││ │                        │  │
│             │ │ │ [💬 WhatsApp…]    │ │                   ││ │                        │  │
│             │ │ │ [💬 In-person…]   │ │                   ││ │                        │  │
│             │ │ │[  Update status  ]│ │                   ││ │                        │  │
│             │ │ │(S) Shahar Hand off│ │                   ││ │                        │  │
│             │ │ └───────────────────┘ └───────────────────┘│ └────────────────────────┘  │
│             │ │ ┌ The Lavish Haven ─┐ ┌ Global Surf … ────┐│                              │
│             │ └────────────────────────────────────────────┘                              │
└─────────────┴───────────────────────────────────────────────────────────────────────────┘
```

**Inside each card, top to bottom:**
1. The thumbnail, a 16:10 link to the live site, with a ↗ badge at its top-right corner.
2. Name, 20 px.
3. Type and run, 15 px ink3.
4. The status pill and age.
5. Quality, when it exists.
6. The links line: Preview website ↗ and Pitch ↗.
7. "Messages", a 14 px ink3 label, over the draft pills stacked full width.
8. Update status: a full-width purple button.
9. The foot row: the ran-by disc and name on the left, Hand off on the right.

All four cards share the same row heights, because there is the same number of drafts per card (two each).

**Rail:** the 3 is a 40 px numeral in `#6A2FE0`, with "Approve or reject →" as a blue link that opens Decisions.

### Layout at 1024 (content 888)

```
┌72┬──────────────────────── content 888 ─────────────────────────┐
│  │ Overview                                         ● Live       │
│  │ ┌ Revenues $0 (56 px) │ Expenses $0 ──────────────────────┐   │
│  │ [All 4][Ready to send 4][Pitched 0][Replies 0][Clients 0]     │
│  │ ┌ Waiting on you: 3 suggested agent tweaks  [Approve or reject]│  the rail becomes a one-line
│  │ │ Handoffs: nothing handed off.                               ││  card above the gallery
│  │ ┌ card 432 ────────────┐ ┌ card 432 ────────────┐             │
│  │ │ thumb 432×270        │ │                      │  2 × 2      │
│  │ │ … same card …        │ │                      │             │
```

### At 390

- The money card splits into two stacked rows (label left, $0 40 px right).
- The tabs wrap onto two lines. They are pills and are never scrolled sideways.
- The "Waiting on you" card stays above the gallery.
- Cards are 1-up and full width (358 px). Each card's links line is two half-width buttons, and the message
  pills are full width.

### Hierarchy

1. **Money at 64 px**, the top band and the only large numerals on the page.
2. **The pictures: four live sites.** This direction deliberately lets the sites carry the second look. It
   answers "which sites are ready" in the way Shahar would judge them, by what they look like. Who ran each one
   sits at the card foot with an initials disc, the way Mondly puts the mentor there.
3. **The highlighted card** (oldest, outlined in purple, "Waiting longest") and **the rail's "3"**. These are
   what is waiting on him.

Handoffs live in the rail, quiet until there are some. Then each handoff is a row with a disc, "Alon → you",
the site, the request, and **Copy prompt**.

### Actions

- **Primary:** Update status, a full-width filled purple button. It is the largest button on every card, so the
  one thing that changes the record is unmistakable.
- **Secondary:**
  - Preview website ↗ and Pitch ↗ as blue links. The thumbnail is a second Preview website target, with the
    same accessible name.
  - The message pills under the "Messages" label.
  - Hand off as a ghost button in the foot row.
- **Inactive Pitch:** "Pitch" in grey with a small clock icon. On focus or hover a tooltip says "Not online yet:
  the pitch page is written but not deployed". The card also shows the grey line "Pitch page not online yet"
  under the status pill, so it is visible without hovering, because the card is the place you judge a site.
- **Filter tabs** change only which cards show. The URL hash keeps the tab (`#ready`), so a reload keeps it.

### Empty states

- **Money:** both numerals "$0" at 64 px in `#6B7280`, with the §1.5 hints, one line each. The Sypher segmented
  bar is replaced by a 6 px `#F3EEFD` track with no fill and no label, so the band's height does not jump when
  the first payment lands.
- **Handoffs:** in the rail, as drawn.
- **A zero tab** (Pitched 0): visible, ink3, `aria-disabled`. Its tooltip says "Sites move here when you Update
  status after sending."
- **No sites at all:** one wide card, "No site is ready to pitch yet. Sites appear here when a run finishes its
  pitch."

### Scales and palette

| | Scale |
|---|---|
| Type (px) | money 64 / 300 · title 28 / 700 · card name 20 / 700 · rail numeral 40 / 300 · body and buttons 16 · meta 15 · smallest 14 |
| Spacing | 4 · 8 · 12 · 16 · 24 · 32 · 40. Card padding 20 (below the thumbnail). Gallery gap 24. Rail gap 24 |
| Radius | cards 20, thumbnail top corners 20 (bleeds to the card edge), buttons 12 (the full-width Update status), pills 999 |

**Purple** is used for:
- the active tab (`#6A2FE0` fill, white text);
- the Update status buttons;
- the outline of the highlighted card;
- the rail numeral.

The inactive tabs use a white fill with ink2 text.

### Left out on purpose

- The five-tile row. The tabs carry the counts.
- A table view of the sites.
- Per-site history.
- "Being built" as a tab: it is not a pitch status. It is one line of text at the end of the tab row.
- On the cards, the run's full id and anything about agents.

**Risk:** pictures are loud. If the thumbnails pull the eye above the money, the money band must grow, not the
cards shrink. The critic should time where the eye lands first.

## 4. Direction C: "Cockpit"

**The idea:**
- **Top:** one solid purple money block, with a drawn chain from "being built" to "clients".
- **Below:** a list of sites on the left, and the selected site's large preview with every action on the
  right, like a mail app.
- **Beside the money:** a two-person card showing what is on Shahar's side and what is on Alon's.

**References: what it takes from each**
- **NexaFlow** (`15-41-49`): the solid purple "Total Project Budget" card with white figures. Revenues and
  Expenses live in one `#6A2FE0` block, the only bold block on the page.
- **Nodus** (`15-42-53`): one oversized numeral dominating, with small figures beside it. Revenues is 72 px;
  Expenses is 40 px beside it, because money in matters more than money out.
- **23andMe** (`15-38-36`): reached nodes solid, unreached nodes as grey outlines, joined by a line. Being built
  0 → **Ready to send 4** → Pitched 0 → Replies 0 → Clients 0 is drawn as five connected pills. Filled purple
  where the count is above zero; grey outline where it is zero. It shows at a glance where the business is
  stuck: everything is at "ready to send".
- **Ancestry Compare** (`15-40-32`): two people side by side with initials discs and one row per measure.
  **Shahar | Alon**: sites ready to pitch (4 | 0), handoffs to each (0 | 0), runs active (1 | 0). The two-operator
  reality becomes something you see at a glance.
- **Models** (`15-46-57`): list rows with a status pill and a value per row, and the "Model signal map" side card
  (a name, a dot and a value per line). This is the site list on the left.
- **FinGuard** (`15-43-09`): "Secure your account further by: [pill] [pill]", used as the detail panel's
  "Send it yourself" line.

### Layout at 1440 (content 1120)

```
┌ sidebar 240 ┬──────────────────────────── content 1120 ────────────────────────────────┐
│             │ Overview                                         ● Live · changes saved   │
│             │ ┌ purple block #6A2FE0, 728 ───────────────────┐ ┌ white, 368 ───────────┐ │
│             │ │ Revenues                    Expenses          │ │        (S)     (A)     │ │
│             │ │ $0          72 px white    $0      40 px      │ │      Shahar    Alon    │ │
│             │ │ No payments recorded yet.   No expenses yet.  │ │ Sites ready  4 │ 0     │ │
│             │ │ When a client pays, tell Claude …  (#E1D5F9)  │ │ Handoffs to  0 │ 0     │ │
│             │ └───────────────────────────────────────────────┘ │ Active runs  1 │ 0     │ │
│             │                                                   └───────────────────────┘ │
│             │ (Being built 0)──(Ready to send 4)──(Pitched 0)──(Replies 0)──(Clients 0)  │
│             │   grey outline     solid purple      grey outline …                         │
│             │ ┌ list 400 ──────────────────────┐ ┌ detail 696 ─────────────────────────┐ │
│             │ │ Ready to pitch (4)             │ │ ┌ thumb 640×400 ── link ↗ ─────────┐│ │
│             │ │▌(S) KA Surf Hostel    10 days  │ │ │                                    ││ │
│             │ │    Ready to send · Quality 86  │ │ └────────────────────────────────────┘│ │
│             │ │ (S) Layday Surf Ahangama 10 d. │ │ KA Surf Hostel                24 px  │ │
│             │ │ (S) The Lavish Haven    7 days │ │ Beach lodging, Ahangama 02           │ │
│             │ │ (S) Global Surf Lodge … today  │ │ (S) Ran by Shahar  ● Ready to send   │ │
│             │ │                                │ │ for 10 days  Quality 86/100          │ │
│             │ │ Waiting on you (1)             │ │ ─────────────────────────────────    │ │
│             │ │ ◇ 3 suggested agent tweaks  →  │ │ Look        Preview website ↗ Pitch ↗│ │
│             │ │                                │ │ Send it yourself  [💬 WhatsApp]      │ │
│             │ │ Handoffs (0)                   │ │                   [💬 In-person]     │ │
│             │ │ Nothing handed off.            │ │ [ Update status ]       Hand off ⇢  │ │
│             │ └────────────────────────────────┘ └──────────────────────────────────────┘ │
└─────────────┴───────────────────────────────────────────────────────────────────────────┘
```

**List rows** are 72 px high, with the initials disc, the name (16 / 700), the age at the right, and a second
line with the status and quality. The selected row has a `#F3EEFD` ground and a 3 px `#6A2FE0` bar on its left.
The list is a `listbox`: arrow keys move the selection and Enter moves focus to the detail panel. On load the
first row is selected: the oldest pitch.

### Layout at 1024 (content 888)

```
┌72┬──────────────────────── content 888 ─────────────────────────┐
│  │ ┌ purple block, full width: Revenues $0 (64) · Expenses $0 ┐   │
│  │ ┌ Shahar | Alon card, one row: Sites ready 4|0 · Handoffs 0|0 ┐│  team card becomes a single row
│  │ (Built 0)─(Ready 4)─(Pitched 0)─(Replies 0)─(Clients 0)        │  short labels, full in aria
│  │ ┌ list 300 ──────────┐ ┌ detail 564 ──────────────────────┐    │
│  │ │ rows, 2-line       │ │ thumb 516×322                    │    │
│  │ │                    │ │ actions: labels above pills      │    │
```

### At 390

**Master-detail:**
- The list shows on its own.
- Tapping a site opens its detail as a full-screen sheet that slides up, with "← All sites" at the top and the
  actions at the bottom.
- Update status is pinned as a 56 px bar at the foot of the sheet.

This is the mail-app pattern, so it reads as normal on a phone rather than "weird".

**The other blocks:**
- The purple block stacks Revenues over Expenses (48 / 32 px).
- The chain becomes a vertical list of five pills joined by a 2 px line.
- The team card keeps its two columns. It is 358 px wide, enough for two 120 px columns.

### Hierarchy

1. **The purple money block.** It is the only filled colour block on the page, and Revenues is the largest
   numeral (72 px white on `#6A2FE0`, contrast about 6.8:1). Money is first and impossible to miss.
2. **The chain.** It is one line, and one filled pill among four outlines says "everything is ready, nothing is
   sent" without reading a number.
3. **The selected site**, the oldest pitch, with its large preview and every action in one place. The list
   beside it is the inventory of every site ready to pitch, with who ran each one. The list's "Waiting on you"
   and "Handoffs" sections are the third and fourth priorities, in the order Shahar ranked them.

The Shahar | Alon card answers "who ran them" and "what is between us" for the business as a whole, not just
per site.

### Actions

All of a site's actions are in the detail panel, under three labelled lines like A's, but with more room.

- **Primary:** Update status, filled purple, 48 px, bottom-left of the panel.
- **Secondary:** Preview website ↗ and Pitch ↗ (blue), the message pills, and Hand off as a ghost button at the
  bottom-right.
- **The preview image** is 640 px wide, so Shahar can judge the site before he previews it. Clicking it is
  Preview website.
- **Inactive Pitch:** "Pitch" in grey, with the second line "not online yet". The panel's status block adds one
  grey line, "Pitch page not online yet", so the reason sits next to the status.
- **The list rows carry no buttons.** A row selects; the panel acts. The list stays calm and scannable, and
  there is exactly one place where buttons live.
- **The tweaks row** ("3 suggested agent tweaks →") opens Decisions directly; it has no detail panel.
- **Handoff rows,** when there are some, select into the panel. The panel then shows the request, who asked and
  when, and the **Copy prompt** box from §1.4.

### Empty states

- **Money:** inside the purple block, "$0" at full size in white. The plain hint in `#E1D5F9` (4.9:1 on the
  purple) says how a payment gets added (§1.5). The block keeps its size, because it is intentional and is
  where money will land.
- **Team card:** shows the zeros honestly. Alon's column reads "No runs yet" in ink3 instead of three zeros.
- **Handoffs:** "Nothing handed off. Select a site and use Hand off to ask Alon for something."
- **Empty list:** the detail panel shows "Pick a site on the left."

### Scales and palette

| | Scale |
|---|---|
| Type (px) | revenues 72 / 300 · expenses 40 / 300 · title 28 / 700 · detail name 24 / 700 · list name 16 / 700 · chain pills 15 / 700 · body and buttons 16 · meta 15 · smallest 14 |
| Spacing | 4 · 8 · 12 · 16 · 24 · 32. Card padding 28; the money block 32. List row 72 high. Gap 24 |
| Radius | money block 24, cards 20, chain pills 999, buttons 12, thumbnail 16 |

**Purple** is used for:
- the money block (solid `#6A2FE0`);
- the chain's filled pill;
- the selected row's bar and `#F3EEFD` ground;
- Update status.

The tints `#C3ACF3` (chain outlines) and `#E1D5F9` (text on the block) are used only where they meet contrast.
Tint text never sits on white.

### Left out on purpose

- Thumbnails in the list. Only the selected site shows its picture, large.
- Showing four sites' actions at once. One site at a time, by design.
- Any per-site card grid.
- Agent and run detail beyond "Active runs".
- The chain's conversion percentages: no data yet, and percentages of zero are noise.

**Risk:** three of the four sites' actions are one click away. If Shahar wants to send all four pitches in one
sitting, A and B are faster. C trades that for calm and a large preview.

## 5. How they differ

| | A · Today | B · Gallery | C · Cockpit |
|---|---|---|---|
| Organising idea | one to-do queue, oldest first | the sites as pictures, filtered by status | money and chain on top, list + detail below |
| Money | two white cards, 72 px | one white band, 64 px | one solid purple block, 72 / 40 px |
| 100,000-ft view | five-cell strip (Logip) | filter tabs with counts (Sypher) | drawn chain, filled vs outlined (23andMe) |
| Sites ready | stacked step cards, 288 px thumbnail | 2-up cards, 376 px thumbnail | 72 px list rows + one 640 px preview |
| Who ran it | disc in the meta line | disc at the card foot (Mondly) | disc per row + Shahar | Alon card (Ancestry) |
| Waiting on you | it *is* the list | right rail (Logip / NexaFlow) | a section of the left list |
| Handoffs | "Waiting on Alon" at the bottom; to-you items are steps | rail, under Waiting on you | list section, opens in the panel |
| Where buttons live | on every step, in three labelled lines | on every card | only in the detail panel |
| Fastest for | working through pitches in one sitting | judging the sites | reading the state of the business |
