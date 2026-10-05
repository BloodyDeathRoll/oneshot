# Round 2, direction C "Queue": designer notes

Build: `node dashboard/data.mjs && node dashboard/overview-03/r2/c/build.mjs` (from the worktree root).
`template.html` + `build.mjs` → `index.html` (one self-contained file: Manrope as base64, the Overview's
fields from `dashboard/data.json`, the real drafts from `sites/<slug>/pitch/`). Thumbnails are referenced at
`../../../mockups/soft-cards/dist/img/<slug>.jpg`; nothing is copied. Nothing posts anywhere.

## Data shown (checked against `dashboard/data.json`, 2026-10-05)

- Revenues $0 and Expenses $0, no entries (`revenues` / `expenses`).
- Being built 0 (no business between approved and packaged in any run) · Ready to send 4 · Pitched 0 ·
  Replies 0 · Clients 0.
- Waiting on you **7** = 4 sites ready to send + 3 pending suggested agent tweaks (004, 005, globalsurf-02 002)
  + 0 handoffs to Shahar + 0 other gates. The sidebar "Needs you" badge is computed from the same list, and
  it is the live sidebar's count (live page: 7, by the same rules as its `needsItems()`).
- Sidebar counts are the live page's: Ledger 36, Pipeline 36, Sites 4, Agents 16, Decisions 41.
- Ages from `gates[].days`: KA 10, Layday 10, Lavish 7, Global Surf 0. Global Surf's pitch is inactive.

## Decisions taken against concepts.md (flagged)

1. **Decisions group lists each tweak as its own row** (3 rows, each with **Review**), not one row
   "3 suggested agent tweaks". The queue count must equal the live "Needs you" count (7), and the live page
   counts each tweak; one row would make the queue say 5. Count = list.
2. **"Handed off to Alon" is in the queue but not counted** (it waits on Alon, not on Shahar). Its group
   header says so. "Handed off to you" is counted and hidden while empty.
3. **Group order:** Handed off to you · Ready to send · Pitched, waiting for a reply · The owner replied ·
   Decisions · Handed off to Alon. Pitched sites stay "waiting on you" (the live page counts them as
   follow-ups), so they sit with the sites, above decisions.
4. **Review** opens a popup with the tweak in plain words (what would change, why) and **Open Decisions**.
   Approving stays in Decisions. Sidebar items other than Overview open a one-line placeholder.

## look-log

### Round 1 (shots: 1920, 1440, 1024, 390; popups: WhatsApp and Hand off at 1440, email at 1024, in-person and Update status at 390)

Next to the live page at the same width: at 1440 the live page shows 2 sites and their actions on the first
screen, and mine shows all 4 sites, all 3 decisions and the money. It is calmer: white, hairlines, one filled
button per row. What is concretely worse:
- **1440 scrolls sideways** (`scrollWidth` 1469): the action group does not fit beside the name and status
  columns, so Hand off is cut off at the right edge. That is a hard bug.
- **The status column wobbles from row to row.** Each row is its own grid, so Global Surf's status sits about
  40 px to the right of KA's at 1920, because its action group is narrower. Stripe's columns are dead straight.
- **Global Surf's row wraps to 3 lines at 1440**, because "Pitch · not online yet" does not fit in the name
  column. The rhythm breaks.
- The group headers render at 16 px (the h3 default), so the right-hand hint shouts as loud as the title.
- The money hint wraps to 2 lines under the figures at 1440 and 1920. It makes the left of the band look busy
  next to the clean count line.
- The 56×35 thumbnails read as colour swatches, not websites.
- **Rail labels at 1024 are 12 px**, under the 14 px floor.
- **At 390 each site is about 320 px tall**, four stacked full-width buttons, so the 4 sites take 4 screens.
  The Decisions rows stack a full-width Review button under every title.
- The Hand off "Done" footer button sits at the left, where every other popup puts its buttons at the right.

Changes for round 2: one shared grid per group (CSS subgrid) so columns line up and the 1440 row fits; the
name column wide enough for the inactive Pitch; 14 px group headers; a one-line money hint; 64×40 thumbs (same
60 px row); a wider 84 px rail with 14 px labels; at 390, Update status and Hand off share a line and Review
sits beside its title; popup footers right-aligned.

### Round 2 (same shot set, plus the page after one Update status save at 1440)

Fixed: rail labels now 14 px (rail 84 px, so "Decisions" fits), group headers 14 px, the money hint on one
line, 64×40 thumbs, footers right-aligned, and the phone rows lost two full-width buttons. Measured, not
guessed: the four buttons of a KA row are 175 + 214 + 132 + 98 px, wider than the concept's budget, so a
one-tier row needs 1201 px of content (a 1505 px window). **1440 is now two-tier** (actions on a second line,
right-aligned, Update status at one x down the page); one tier starts at 1520. Next to the live page at 1440
this still shows all 4 sites with their actions on the first screen (last Update status at y 837) where the
live page shows 2. After a save the counts, the stage line (Ready to send → Pitched turns purple), the fact
line and the groups all agree, and the queue stays at 7 (a pitched site is a follow-up). What is concretely
worse:
- **At 1920 the thumbnails overlap the names**: the shared grid (subgrid) ignores the row's side padding,
  so the 64 px picture is pushed 16 px into the name column.
- A handoff row at 1440 drops its one button (Copy prompt) to a second line of its own: a 2-line row for one
  action.
- At 390 a site is still about 260 px: the two Suggested buttons stack.

### Round 3

Fixed: the first grid track is 80 px with the picture right-aligned in it and the actions carry the right
inset, so at 1920 every column is dead straight across the four rows (status at one x, Update status at one
x). Handoff rows stay one line at every width. At 390 the two Suggested buttons sit side by side (labels may
wrap inside a 44 px button), so a site is about 215 px and the first Update status is at y 876. What is
concretely worse:
- At 390 the top bar says "Overview" right above the 28 px "Overview" title: the same word twice.
- At 390 the copy icon in the message box reserves a 52 px right margin down the whole script, so the
  in-person script runs 4–5 words a line.

### Round 4 (final)

Fixed: the top bar says "OneShot"; on a phone the copy button floats in the box's corner and the text runs
the full width. Checked once at the end, at 1440 with reduced motion: no text under 4.5:1 (116 text nodes,
lowest `#6B7280` on white 4.83); no text under 14 px at any width; `scrollWidth` = viewport at 1920, 1440,
1024 and 390; no console errors or failed requests. The Tab order is skip link, the 7 views, then each row
left to right. The inactive Pitch shows its tooltip on focus. The KA WhatsApp copy is the file's 512
characters. Esc, × and a veil click close every popup, and focus returns to the opener. The Hand off result
shows the request and the site in plain words: no file name, run id or state in view, the prompt collapsed,
and Copy prompt still copying all of it. Review opens the tweak in plain words, and Open Decisions switches
the view.

Why it beats the live page at a glance: one white sheet instead of eight cards; money and the five counts in
one 190 px band instead of two rows of cards (about 330 px); every site, its age and all its actions in
60 px rows at 1920 (117 px at 1440) instead of 173 px cards; no command line, run id or commit hash
anywhere; and the "waiting on you" count is the list under it.

## Not fixed, not blocking

- **1440 is two-tier, not the concept's one-tier 60 px row.** The measured button widths do not fit
  (see round 2). The whole queue is still on the first screen at 1440×1000 down to the third decision.
- At 1024 the band stacks (money over counts, about 300 px), so the first screen shows 2 sites. The live
  page shows none there.
- In the Ready to send group every row repeats the purple "Ready to send" badge under a header that says the
  same. It is kept because the brief asks for a status per site, and pitched rows need theirs.
- Sidebar items other than Overview and **Open Decisions** go to a one-line placeholder (this is a mockup of
  the Overview only).

## Blocking

None.
