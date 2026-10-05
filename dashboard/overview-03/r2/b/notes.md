# Overview, round 2, direction B "Home": notes

Built from `dashboard/overview-03/r2/concepts.md` §1 and §3, with the round-2 amendment in
`dashboard/BRIEF-overview-03.md` as the task layer. `index.html` is written by
`node dashboard/overview-03/r2/b/build.mjs` (run `node dashboard/data.mjs` first) from `template.html`. The
build embeds the Overview's fields from `data.json`, the real drafts from `sites/<slug>/pitch/` (round-1 A's
parser, unchanged) and Manrope as base64. Thumbnails are referenced at
`../../../mockups/soft-cards/dist/img/<slug>.jpg`; nothing is copied.

## Data, as embedded

- Revenues and Expenses: $0, no entries, so "This month $0" and the how-to-record hint.
- The five counts use the live dashboard's rules: Being built 0, Ready to send 4, Pitched 0, Replies 0, Clients 0.
- **Waiting on you = 7**, the live sidebar's "Needs you" rule (`soft-cards/src/index.html` `needsItems()`):
  4 sites ready to send + 0 pitched sites waiting for an answer + 3 pending suggested agent tweaks
  (`proposals[]`, `kind: proposal`, `status: pending`) + 0 other gates + 0 handoffs to Shahar. The sidebar badge,
  the page sentence and the rail use that one function, so they cannot disagree. After Update status a site
  moves from "pitches to send" to "waiting for an answer", so the total stays 7, as on the live page; Sale and
  No answer take it out.
- Ages from `gates[].since`: KA 10 days, Layday 10, Lavish 7, Global Surf today.
- Global Surf's Pitch is "not online yet" (brief §3); the other three link to `pitch.proposal_url`.
- Drafts shown are only the ones that exist: Global Surf email + WhatsApp; the other three WhatsApp + in-person.

## Decisions I took (flagged)

- **Mode chip.** The concept's head says "● Live · changes saved". In a static mockup that is false, so the chip
  says it is a preview copy and nothing is saved (data honesty, BRIEF.md §2).
- **"Waiting on you" holds the pitches too.** Concept B's rail listed only the tweaks ("Waiting on you 1"). The
  task requires the waiting count to equal the sidebar's 7, and the round-1 critic asked B for a "4 pitches to
  send" row, so the rail's first item is "4 pitches to send" (no button: the list is beside it).
- **Sidebar nav counts.** Only "Needs you 7" carries a badge, as on Stripe; the live page's other counts
  (Ledger 36, Pipeline 36…) are not Overview information.

## look-log

Shots: `scratchpad/r2-b/round-N/` at 1920×1080, 1440×1000, 1024×800 and 390×844, first screen and full page.
Each round opened popups: Hand off through to its result (1920), Suggested WhatsApp + Copy and Update status +
Save (1440), Suggested email + veil click (1024), Suggested in-person script as a bottom sheet (390). Compared
with the live page `http://localhost:8970/` at the same widths, and with Logip `15-38-48`, Shopeers `15-38-04`,
NexaFlow `15-41-49`, Models `15-46-57` and Sypher `15-36-13`.

**Round 1.** Measured: no sideways scroll at any width; no console errors or failed requests; first Update status
at y 447 (1920) and 597 (1440); all four sites and every CTA on the first screen at 1920 and 1440 (the live page
shows 2.5 sites at 1920 and none of its handoffs). What is concretely worse:

1. **The page sentence wraps at 1440** ("…has waited / 10 days.") because the mode chip takes 307 px; it pushes
   everything down 24 px and the orphan looks careless next to Models' one-line subtitle.
2. **The strip at 1440 is two different shapes.** Left half: title on one line, items under it; right half: title
   and text inline. After one Update status the left half grows to three lines (three items + button). Stripe's
   strips are one line.
3. **"Copied" covers the message.** The copy button grows from 32 to 90 px inside the box's 56 px right padding and
   hides "just" in KA's WhatsApp text.
4. **Phone breaks the CTA grammar.** At 390 the order is Update status, Hand off, then the links and Suggested
   buttons: "record" comes before "send yourself". The top bar also repeats "Overview" right above the H1.
5. **1024 rail labels are 12 px**, under the 14 px floor. In the full-page shot the white sidebar stops at 800 px
   and the grey ground shows under it.
6. **Money hint orphans** ("…when a client / pays.") at 1920.

Better than the live page already: no `node tools/money.mjs` command line, no run ids, no "in active runs", no
13 px text, one filled button per site, and the 4 sites in 4 × 95 px rows instead of 4 × 173 px cards.

**Round 2.** Changes: the chip is shorter ("Preview copy · nothing is saved") and the sentence uses `text-wrap:
pretty`; the strip is 2fr | 1fr with title and items on one line and at most two items plus "+ n more"; the copy
button stays 32 px and "Copied" floats beside it; each row is a grid (`l1 | actions` over `l2`), so the phone order
is links, Suggested, Update status, Hand off; the top bar says "Oneshot"; the 1024 rail is 80 px with 14 px labels;
the sidebar is painted full height (sticky inner column). What the shots showed was still worse:

1. **The sidebar footer broke at 1440 and 1920**: "Signed in as Shahar" and "Updated…" drew on top of each other.
   Cause: the new row class `.txt` also matched the footer's `.txt`.
2. **The sentence still wrapped at 1440**: at 16 px it needs ~860 px and has 805.
3. **The strip's Handoffs half wrapped to 3 lines** in its 378 px, and after one Update status "+ 1 more" hid the
   only item with a button (the tweaks) while showing two items with none.
4. **"Copied" still covered the first line** of the message for 1.6 s.
5. **Phone strip overflowed**: `scrollWidth` 416 at 390 ("3 suggested agent tweaks" + Review them on one line).
6. A 1 px vertical scroll at 1920 from the live region sitting under the page.

**Round 3.** Changes: the row text class is `.rt`; the sentence drops "The oldest pitch has waited 10 days" (every
row shows its age, the rail names the oldest), so it is one line at 1440 and 1024; below 1600 the strip is two
stacked 60 px rows (Waiting on you / Handoffs) with titles in a 168 px column, so the items of both rows start at
one x, like a Balances summary; "Copied" sits above the button, in the gap over the box; the phone strip puts the
title over the items; the live region is fixed. What was still worse:

1. **Tab order did not match the screen** below 1600: the strip is drawn above the list (`order:-1`) but came after
   it in the DOM, so Tab went through 16 row controls before reaching "Review them".
2. **Every thumbnail was a second tab stop** with the same name as "Preview website" next to it (8 extra stops).
3. **Money hints at 1920** sat at different heights (one line vs two) because the hint is bottom-aligned and capped
   at 60 ch.
4. **The strip's two-item cap** still hid the tweaks after one save, though the row has room for three (measured
   640 px of items in a 920 px row at 1440).

**Round 4.** Changes: the rail comes before the list in the DOM and is placed in column 2 by the grid at ≥1600;
thumbnails are mouse targets only (`tabindex=-1`, `aria-hidden`); hints capped at 72 ch, so both are one line at
1920; the strip shows three items before "+ n more". Checked again at all four widths with the same popups:

- `scrollWidth` = viewport at 1920, 1440, 1024 and 390; page height 1080 / 1009 / 1068 at the three desktop widths.
- All four sites and every CTA on the first screen at 1920 and 1440 (last Update status at y 732 / 878); at 1024×800
  the first screen ends after the second site (Update status at y 652 / 747 / 842 / 937).
- Waiting on you 7 = sidebar "Needs you" 7 = page sentence 7; after one Save as pitched: 3 to send + 1 waiting for an
  answer + 3 tweaks = 7, counts column Ready 3 · Pitched 1, list header "3 ready to send · 1 pitched".
- Contrast: lowest text pair `#6B7280` on white, 4.83:1. No text under 14 px at any width.
- Tab walk: sidebar, Ready to send 4, Review them, then per site Preview website, Pitch, Suggested…, Update status,
  Hand off; every stop shows the purple ring. Esc, × and a veil click close the popup; focus returns to its opener.
- No console errors, no failed requests (the four thumbnails load from `dashboard/mockups/soft-cards/dist/img/`).

Against the live page at the same widths: the live page needs 1.6 screens at 1920 for four sites and shows a
terminal command under each $0; this page shows money, the five counts, all four sites with every action, what is
waiting and the handoffs in one 1080 px screen, with nothing under 14 px. Against the references it is closest to
Models (`15-46-57`) for the list and NexaFlow (`15-41-49`) for the rail; it is plainer than Shopeers because there is
no chart to draw (no money history).

## Not fixed, not blocking

- **Phone length.** At 390 the page is 3352 px: the concept makes the thumbnail full width (358×224) on a phone so
  the site can be judged by eye, which puts each site at ~550 px. A smaller thumbnail would halve it; I kept the
  concept's choice.
- **Four filled buttons.** Update status ×4 is the one purple fill per row, as the concept specifies; Stripe would
  have one primary per region. It is the strongest colour on the page.
- Ages are computed in the browser from `gates[].since`, so they grow by a day after midnight (KA reads 11 days on 6 Oct).

## Blocking

None.
