# Overview, run `dashboard-03` round 3: critique

Critic, 2026-10-06, ~01:00 local. I judged the pages, not the designers' notes. Every number below was re-measured.

**Scope**
- Builds: `r3/a/index.html` (option A) and `r3/b/index.html` (option B), served at
  `http://localhost:8970/files/dashboard/overview-03/r3/<x>/index.html`.
- Baselines: `r2/a`, `r2/b` and the live page `http://localhost:8970/`.
- Rubric: Shahar's round-3 words (`BRIEF-overview-03.md`, last amendment), checked point by point. Then the round-2
  rubric (BRIEF.md §8, with Shahar's questions).
- Data: `dashboard/data.json`, `generated_at` 2026-10-05T20:51:09Z.

**Method:** Playwright Chromium at 1920×1080, 1440×1000, 1024×800 and 390×844 (touch). At 1440, in both builds:
- all 8 Suggested popups, closed in turn by Esc, × and a veil click, with Copy read back from the clipboard;
- Update status: saved KA as pitched, then reopened;
- Hand off: Layday, typed a request, submitted, Copy prompt read back, Done;
- Review, and the "Ready to send 4" count;
- a 40-stop Tab walk;
- contrast for every visible text node.

Shots are in the scratchpad (`critic-r3/`), not in the repo. `side-by-side.png` shows both 1440 first screens.

## His words, point by point

✓ met · ◐ partly · ✗ not

### Option A

| His words | | Evidence |
|---|---|---|
| "Use option B's top section (revenue/expenses + 5 others)" | ✓ | r2/b's money blocks: $0 at 48 px, "in total", "This month", the how-to-record hint. On white, not r2/b's grey. |
| "Make the 5 others bigger" | ✓ | Values are 32 px (r2/b: 16 px); 28 px at 1024 and 24 px on a phone. |
| "keep the structure: Three columns (revenue/expenses/others)" | ✓ | Three equal columns: 378/378/378 at 1440, 538×3 at 1920. Hairlines between them. |
| "the 'others' … two inner columns (3 rows)" | ✓ | A 2×3 grid with the 6th cell empty. That empty cell is drawn as a bordered box, so it looks like a missing value. |
| "Sites & Also waiting for you on the same row, sites as the lead" | ✓ | At 1440, Sites is 832 px wide and "Also waiting on you" 280 px, side by side. At 1920 they are 1206 and 360. Below 1400 px the waiting block stacks under the list (at 1024 it starts at y 1202). |
| "Remove handoffs" | ✓ | There is no Handoffs block. After a Hand off, the row gets a quiet "Handed off to Alon" line. |
| "Use WAY bigger thumbs" | ✓ | 208×129 at 1440 and 222×138 at 1920. r2/a was 62×38 (3.4× the width); the live page is 224×140. You can read each site's headline. |
| "two rows for status/website/messages column" | ✓ | Each column has two rows: Ready to send / for 10 days; Preview website / Pitch; Suggested ×2.<br>Side effect: at 1440 and 1024, Update status and Hand off move up to the name line. They sit under the **"Messages"** header, which is wrong. |

### Option B

| His words | | Evidence |
|---|---|---|
| Top: "Same instructions as A" | ✓ | Same three columns (378×3 at 1440). Counts are 28 px (r2/b: 16 px), 2×3 with the 6th cell empty and no box drawn. The hints sit right under "This month", which fixes the r2 complaint. |
| "Move both suggestions to the update status/handoff block, underneath these two" | ✓ | Each row ends in a 2×2 block: Update status · Hand off on top, the site's two Suggested buttons under them. |
| "Aligned to right of line" | ✓ | The block's right edge is **0 px** from the row's padding edge in every row, at 1920, 1440 and 1024. |
| "vertical align to center of line" | ✓ | The block's centre is **0–1 px** from the row's centre in every row at every desktop width. |
| "On the left: Larger thumbs" | ✓ | 158×98 at 1440 and 174×108 at 1920. r2/a was 62×38. They are smaller than A's. |
| "Preview and pitch closer to the titles" | ✓ | 2 px under the name, at the same x. In r2/a they were in a separate column, 358 px to the right. |
| "On the right: remove handoffs" | ◐ | Handoffs are gone. But the right-hand column exists **only at ≥1600 px**. At 1440 (the brief's target width), "Also waiting on you" is under the list at **y 1019, below the fold**. The designer chose this and flagged it; Shahar did not ask for it. |

## Data (against `data.json`)

**Both builds show these correctly:**
- Revenues and Expenses: $0 (`entries: []`).
- Counts: Being built 0, Ready 4, Pitched 0, Replies 0, Clients 0 (states: 4 `packaged`, 25 `shortlisted`, 11 `scored`,
  1 `void`).
- 4 sites, all "by Shahar".
- Drafts: Global Surf has email + WhatsApp; the other three have WhatsApp + in-person.
- Global Surf's Pitch is inactive (`aria-disabled`, with a tooltip). The 7 links match `preview_url` /
  `proposal_url` and open in a new tab.
- Copied KA WhatsApp text: 512 characters, the same as the text between the lines of
  `message.en.whatsapp.md`.
- **Waiting = 7 everywhere:** sidebar "Needs you 7", the phone menu badge 7, the first sentence, and 4 sites + 3
  tweaks.
  - After Save as pitched: 3 to send + 1 waiting for an answer + 3 = **7**.
  - Counts read Ready 3 · Pitched 1, the list still has 4 rows, and the header says "3 ready to send · 1 pitched".
  - The date defaults to 2026-10-06, the local day (the r2/b bug is fixed in both).

**Where they differ: ages.**
- **A** shows 10 / 10 / 7 days and "since today". This matches `days_since_change` and the live page.
- **B** shows **11 / 11 / 8 days and "for 1 day"**. It counts calendar days, so Global Surf, ready ~10 hours ago, reads
  "for 1 day". It disagrees with the data and with the live page.

No invented numbers in either build.

## Popups, jargon, access (both builds unless noted)

**Popups and jargon**
- All 8 Suggested popups open over `rgba(255,255,255,.8)`, and Copy works.
- Esc, × and a veil click each close the popup, and focus returns to its opener.
- Update status says "Nothing is sent from here". After a save, reopening it offers Reply / Meeting / Sale / No answer.
- Hand off shows the request in plain words. The full prompt is collapsed, and Copy prompt copies all 436 characters.
- Review shows a "Decisions is another view" toast.
- Page text has no jargon (scanned for state names, run ids, file names, `node`, `localhost`, "active run").
- Global Surf's email contains the real draft's "[LINK TO THE PROPOSAL PAGE]". Both builds warn about it above the text.

**Layout and contrast**
- `scrollWidth` equals the viewport at all four widths (the live page is 504 px wide at 390).
- Smallest text is 14 px (the live page has 73 nodes at 13 px).
- No AA failures: the lowest pair is `#6B7280` on white, 4.83:1.
- No console errors and no failed requests.
- Phone: Update status opens as a bottom sheet, tap targets are ≥32 px, and the 7 badge is on the menu button.

**Focus**
- Every Tab stop shows a ring, and both have a skip link.
- **A:** at 1440 and 1024 the Tab order is Suggested → Update status, but Update status is drawn *above* the Suggested
  buttons.
- **B:** the Tab order matches the visual order (Preview, Pitch, Update status, Hand off, Suggested, Suggested).

## First screen

| | A | B | Live |
|---|---|---|---|
| Sites with Update status fully visible, 1920 | **3** of 4 (the 4th button is at y 1055–1087, cut. A's notes claim 4: wrong) | **4**, plus the whole waiting column | 4 |
| Same, 1440 | **3** of 4 (the 4th button is at y 999) | **4** (the last button row ends at y 968) | 3 |
| Same, 1024 | 2 | 3 | 0 |
| 390: first Update status | y 1086 | y 890 | (sideways scroll) |
| "Also waiting on you" visible at 1440 | ✓ on the right, all 3 tweaks | ✗ title at y 1038 | n/a |
| Row height, 1440 | 164 px | 133 px | n/a |
| **Eye lands first (1440)** | The four big thumbnails (the green and yellow blocks), then the purple Update status on each name line, then $0 | The column of four filled purple Update status buttons at the right, then the two $0, then the thumbs | |

## Scores

| Dimension (weight) | A | B | r2/a | r2/b |
|---|---|---|---|---|
| Data honesty (25) | 25 | 23 (ages) | 24 | 23 |
| Shahar's questions (25) | 21 | 22 | 21 | 22 |
| Craft (25) | 17 | 20 | 18 | 16 |
| Charts / counts (15) | 12 | 12 | 12 | 11 |
| Access and speed (10) | 9 | 10 | 9 | 8 |
| **Total /100** | **84** | **87** | 84 | 80 |

**Craft, A:**
- The rows are 164 px tall, with a dead band between the name line and the two-row columns.
- Update status sits under the "Messages" header.
- The row has two layouts: at 1920 the actions are a column; at 1440 and below they are on the name line.
- The money hints float about 45 px under "This month" (r2's complaint, not fixed here).
- The empty 6th count cell is drawn as a box.

**Craft, B:**
- One row form at every desktop width, and the 2×2 block is pixel-exact.
- Hand off is outlined, the same weight as the Suggested buttons.
- At 1024 the row heights vary (122 / 139 / 123 / 167) because "by Shahar" wraps.

## Hard fails

None in either build. No invented number, no jargon or file names, no ambiguous action, nothing under AA.

## Top fixes

**Option A**
1. **Get the 4th site onto the first screen at 1440 and 1920.**
   - Rows are 164/173 px today. Aim for ~130: put the name in line with the two-row columns, or use a 176×110 thumb.
   - 176×110 is still about 3× r2/a's thumb.
2. **Give Update status · Hand off their own header/column**, as at 1920. Today they sit under "Messages" at 1440 and
   1024. Use one row layout at every width.
3. **Tab order:** move Update status · Hand off before the Suggested buttons, as they are drawn.
4. **Money hints:** place them right under "This month", as B does.
5. **Empty 6th count cell:** remove its borders.

**Option B**
1. **At 1440, put "Also waiting on you" on the right, as he wrote.**
   - Today it is below the fold at y 1019.
   - To make room, tighten the action block: it is 461 px (201 + 240 px buttons), and the labels fit in ~420.
   - Or ask him whether stacking below 1600 is acceptable.
2. **Ages:** use elapsed days (10 / 10 / 7 / since today), as the data and the live page do, instead of calendar days.
3. **1024:** keep "by Shahar" on the name line or drop it there, so the rows are one height.
4. **Make Hand off quieter than Update status** (ghost or link weight). Today the 2×2 reads as one filled button and
   three equal ones.

## Which matches him better

**To the letter, A.**
- Every one of his option-A points is met at 1440 and 1920.
- B misses one at 1440: the right-hand column is not on the right.

**As a page, B.**
- All four sites with every action fit on one 1440 screen.
- Every alignment he asked for is measured exact.
- The rows are 31 px shorter.
- Its own deviation is one breakpoint (1600 → ~1400). Fixing it makes B the stronger pick.

**A's cost of following him exactly:** the WAY-bigger thumbs push the fourth site below the fold at 1440 and 1920.
