# Overview, round 3, option B: notes

Built from Shahar's round-3 words (`dashboard/BRIEF-overview-03.md`, "Amendment — round 3"), with the round-2 B top
(`r2/b`) and the round-2 A site rows (`r2/a`) as the starting code, and `r2/critique.md` for lessons.
`index.html` is written by `node dashboard/overview-03/r3/b/build.mjs` (run `node dashboard/data.mjs` first) from
`template.html`. The build embeds the Overview's fields from `data.json` (`generated_at` 2026-10-05T20:51:09Z, the
same file round 2 used), the real drafts from `sites/<slug>/pitch/` (round-1 A's parser, unchanged) and Manrope as
base64. Thumbnails are referenced at `../../../mockups/soft-cards/dist/img/<slug>.jpg`; nothing is copied.

## His points, and how each is met

| His words | On the page |
|---|---|
| Top: B's revenue/expenses + 5 others, three columns | One white band, three equal columns split by hairlines: Revenues · Expenses · the five counts. The third column's left edge lines up with the "Also waiting on you" column below at ≥1600. |
| The 5 others bigger | Values 28 px (were 16 px in r2/b), label above value. "Ready to send 4 ›" goes to the list; the other non-zero counts say which view they open. |
| …in two inner columns, 3 rows | Being built · Ready to send / Pitched · Replies / Clients · (empty). Hairlines between rows. |
| Move both suggestions to the Update status / Hand off block, underneath these two | Each row ends in a 2×2 block: Update status · Hand off on top, the site's two Suggested buttons directly under them. |
| Aligned to the right of the line, vertically centred | The block's right edge sits on the row's right padding in every row; its centre is 0–1 px from the row's centre (measured). Rows share columns (CSS subgrid), so the four blocks are one aligned column of buttons. |
| On the left: larger thumbs | 176×110 at ≥1600, 160×100 at 1440, 144×90 at 1024, 112×70 on a phone (r2/a had 64×40, r2/b 112×70). |
| Preview and Pitch closer to the titles | Directly under the site name (same line height step), then the status line. |
| On the right: remove handoffs | No Handoffs block anywhere. The right-hand column is "Also waiting on you" (the three suggested agent tweaks, each with Review). A handoff you make shows only as a quiet line in that site's row ("Handed off to Alon today"); handoffs *to* you would be items in "Also waiting on you", since they wait on you. |

Kept from the brief: full width (sidebar + fluid content), the locked purple, Manrope embedded, real data only, exact
CTA labels (Preview website, Pitch, Suggested email / WhatsApp / in-person script, Update status, Hand off), popups over
a white 80 % veil, after Hand off the request in plain words with the full prompt collapsed (Copy prompt copies all
443 characters), sidebar order Overview, Needs you, Ledger, Pipeline, Sites, Agents, Decisions.

## Decisions I took (flagged)

- **White ground, not r2/b's grey.** The critic's top fix for r2/b was "one white sheet with hairlines instead of cards
  on grey". I kept B's structure (bordered band, bordered list, bordered column) but on white, which is the Stripe look
  the round-2 amendment asks for.
- **Hand off is an outlined button, not a ghost link.** In a 2×2 block a ghost button looks like a floating label; all
  four cells are buttons, Update status is the only filled one.
- **"Also waiting on you" is a right-hand column only at ≥1600 px.** At 1440 the row needs ~1010 px (thumb, name,
  460 px action block, padding) and the content area is 1136 px, so a column beside it would leave the names ~120 px.
  Below 1600 it sits under the list, full width, same rows. At 1440 its title is at y 1019, just under the 1000 px
  fold; the page's first sentence already says "3 suggested agent tweaks".
- **"by Shahar" sits beside the name** (quiet grey), not in the status line: a separator dot otherwise starts a
  wrapped line at 1024.
- **List title follows the rows.** "Sites to pitch 4"; after one Update status it reads "Sites to pitch or follow up 4"
  with "3 ready to send · 1 pitched", so the count always equals the rows (r2/b's "3 over 4 rows" fixed).
- **Dates are local.** The Update status date defaults to the local day (r2/b used the UTC day and wrote "5 Oct" on 6 Oct).

## Data, as embedded

- Revenues and Expenses $0, no entries: "This month $0" and the how-to-record hint.
- Counts with the live dashboard's rules: Being built 0, Ready to send 4, Pitched 0, Replies 0, Clients 0.
- Waiting on you 7 = sidebar "Needs you" 7 = first sentence ("4 pitches to send and 3 suggested agent tweaks"), one
  function (`waiting()`, the live `needsItems()` rule). After one Save as pitched: 3 to send + 1 waiting for an answer
  + 3 tweaks = 7.
- Ages from `gates[].since`, counted in calendar days in the browser: on 6 Oct KA and Layday read 11 days, Lavish 8,
  Global Surf 1 (they grow by a day after midnight).
- Global Surf's Pitch is "not online yet" (brief §3); its email warns about the "[LINK TO THE PROPOSAL PAGE]" gap.
- Tweak sub-lines say "Suggested tweak to the Designer (your own notes)", not the file name.

## Look-log

Shots in the session scratchpad, `r3-b/round-N/` (not in the repo): 1920×1080, 1440×1000, 1024×800, 390×844, first
screen and full page, plus popups: Hand off through to its result and Done (1920), Suggested WhatsApp + Copy, then
Update status + Save (1440), Suggested email + veil click (1024), Suggested in-person script as a bottom sheet (390).

**Round 1.** No sideways scroll at any width, no console errors or failed requests, 14 px minimum text. The 2×2 block
is right-aligned and centred in every row. What was wrong:
1. The thumbnail overlapped the text by 4 px: a subgrid takes its padding out of its edge tracks, so the 176 px thumb
   ran 24 px past its track into the gap.
2. Separator dots led wrapped lines ("· by Shahar" alone on a line at 1024 and 390).
3. Money hints floated ~60 px under "This month" (bottom-pinned in a band made taller by the counts), the round-2
   critic's complaint about r2/b.

**Round 2.** The thumb track now carries the row padding; hints sit 16 px under "This month"; the "by" part was
grouped with its dot. What was still wrong:
1. A grouped dot still started a wrapped line ("· Handed off to Alon" at 1920, "· by Shahar" at 1024).
2. The 1920 page was 1083 px tall: a 3 px vertical scroll.

**Round 3.** "by Shahar" moved beside the name, the handoff note to its own line, dots dropped; bottom padding 40 px.
Checked at all four widths:
- `scrollWidth` = viewport at 1920, 1440, 1024 and 390. Page height 1080 / 1349 / 1345 / 2532 (r2/b's phone page was 3352).
- 1920: money, counts, all four sites with every action and the whole "Also waiting on you" column on one screen.
  1440: all four sites and every action above the fold (last button row at y 932–968).
- Tab walk: Skip to content, the seven views, Ready to send 4, then per site Preview website, Pitch, Update status,
  Hand off, Suggested…, Suggested…, then Review ×3; every stop shows the purple ring. Thumbnails are not tab stops.
- Contrast: every visible text node ≥ 4.83:1 (lowest `#6B7280` on white).
- × , Esc and a veil click close the popup; focus returns to its opener (after Hand off, to the redrawn row's Hand off).
- Copied WhatsApp text (KA) 512 characters, as in round 2. Visible text scanned for jargon (state names, file names,
  run ids, `node`, `localhost`, raw dates): none.

**Round 4 (after Shahar picked B, 2026-10-06).** His words: "Center align the revenues and expenses. Color the
suggestions with light purple background. Add icons for update status cta. Remove icons from also waiting on you".
Plus the round-3 critic's fixes 2–4. Changes:
- Revenues and Expenses: label, figure, "This month" and hint centred.
- Suggested buttons: `#F3EEFD` with purple `#6A2FE0` text (6.0:1), hover `#EDE6FB`.
- Update status: a pencil icon.
- "Also waiting on you": no icons; title, sub-line, Review.
- Hand off: a ghost button (no border, grey text), quieter than Update status.
- Ages: elapsed days, as `days_since_change`: 10 / 10 / 7 / since today (round 3 counted calendar days: 11 / 11 / 8 / 1).
- 1024: every row one height (shared rows, `grid-auto-rows:1fr`), 119 px each. The thumb is 128×80, button padding is
  10 px, and the Suggested icons are hidden there, so Global Surf's "Pitch · not online yet" fits on one line.
  Before, the rows were 122 / 139 / 123 / 167.
- Checked at 1920 / 1440 / 1024 / 390 (shots in `round-4/`): no sideways scroll, contrast ≥ 4.83:1, the Tab walk is
  unchanged, × / Esc / veil click close, Copy prompt copies 443 characters, no jargon.

Not done in this round: the critic's fix 1 ("Also waiting on you" on the right at 1440). It was not in this round's ask.

## Not fixed, not blocking

- At 1440 "Also waiting on you" starts just under the fold (see the decision above; the critic's fix 1).
- Four filled Update status buttons are the strongest colour on the page, as in round 2.
- In the 1024 sidebar the "S" avatar sits mid-height (inherited from r2/b's rail; outside this round's ask).

## Blocking

None.
