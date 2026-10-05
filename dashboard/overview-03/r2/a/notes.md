# Overview, round 2, direction A "Payments": notes

This builds `../concepts.md` §2 (with §1.2, §1.3 and §5). The file is `index.html`. To rebuild it, run
`node dashboard/data.mjs`, then `node dashboard/overview-03/r2/a/build.mjs`, from the repo root. The build
writes `index.html` from `template.html` and embeds:
- the Overview's fields from `data.json`;
- the real drafts from `sites/<slug>/pitch/` (the round-1 A parser, copied unchanged);
- Manrope as base64.

Thumbnails are referenced as `../../../mockups/soft-cards/dist/img/<slug>.jpg`. Nothing was copied and the
folder holds no images.

## Data, as embedded

| What | Value | Source |
|---|---|---|
| Revenues, Expenses | $0, This month $0 | `revenues` / `expenses`, no entries |
| Sites | KA, Layday, Lavish, Global Surf | live `pitchSites()` rule, sorted by status, then oldest first |
| Ages | 10, 10, 7 days, today | `gates[].since` |
| Global Surf Pitch | not online | the brief says so |
| Drafts | GS: email + WhatsApp. Others: WhatsApp + in-person script | `pitch.drafts` |
| Being built | 0 | every run, past approval, before packaged, not dropped |
| Pitched, Replies, Clients | 0, 0, 0 | — |

**Waiting on you = 7**, the same as the live sidebar's "Needs you". It uses the live `needsItems()` rule:
- every site ready to send (4);
- every site to follow up (pitched, reply, or meeting booked; 0 today);
- every pending agent tweak (3, from `proposals[]` with status `pending`);
- every other gate that has a slug (0);
- every handoff to the viewer (0).

That 7 shows in three places: the sidebar badge, the head sentence ("7 things are waiting on you: 4 sites to
pitch and 3 suggested agent tweaks"), and the 4 rows plus "Also waiting on you 3". The count stays equal
after a status change. Recording a site as pitched moves it from "to pitch" to "to follow up", as on the live
page. "No answer" and "Sale" drop it from the count.

**The tiles split the sites into groups that do not overlap,** so a tile's count always equals the rows it
shows: All = Ready + Pitched + Replies + Clients.

## Deviations from the concept (decided, flagged)

1. **The mode chip reads "Mockup · nothing is saved or sent"**, not "Live · changes saved". The concept's
   line would be false in a static mockup.
2. **"Also waiting on you" lists the 3 tweaks one per row,** each with its real title and a **Review**
   button, instead of the concept's single "3 suggested agent tweaks" row. This makes 4 + 3 = 7 visible.
   "custom.md" in the agent name is shown as "(your own notes)".
3. **Breakpoints follow measurement, not the concept's estimates:**

   | Width | Row form |
   |---|---|
   | ≥1900 | one line, 57 px |
   | 1440–1899 | stacked cells, 77 px |
   | 1001–1439 | two lines, 99 px |
   | 721–1000 | name and status stacked, 153 px |
   | ≤720 | phone block |

   One line needs about 1890 px. The cut is 1900, so a 1920 window with a scrollbar (1905) still gets one
   line.
4. **In the stacked form, the Suggested buttons drop their icons** to fit 1440 without overflow. The icons
   come back in every other form.
5. **The status cell is a badge plus a quiet second part:**
   - "Ready to send" + "for 10 days";
   - "Pitched" + "6 Oct via WhatsApp";
   - "Reply" + "meeting booked".

   The full "Pitched 6 Oct via WhatsApp" badge was too wide for the stacked status column (see round 6).
6. **The rail at ≤1280 is 88 px, not 72,** so its labels can be 14 px, the brief's floor. The live rail uses
   11 px.

## look-log

Shots are in `scratchpad/r2-a/round-N/` (not in git), at 1920×1080, 1440×1000, 1024×800 and 390×844, first
screen and full page. Each round has a popup open:
- 1920: Update status with WhatsApp chosen;
- 1440: Suggested WhatsApp;
- 1024: the Hand off result;
- 390: the in-person script.

Compared against the live page at the same widths (`scratchpad/r2-a/live/`) and against Stripe-like
references: Models `15-46-57`, Sypher `15-36-13` / `15-44-34`, Shopeers `15-38-04`.

**Round 1. What was concretely worse:**
1. **1440 overflowed** (scrollWidth 1501). Hand off was cut off at the window edge.
2. **The empty Handoffs panel stretched** to the height of the 3-row tweaks panel: a 240 px empty box at
   1920.
3. **The Expenses hint wrapped to 2 lines at 1920**, so the two money columns had uneven heights.
4. **At 390, the money hint broke badly.** "None recorded yet · How?" wrapped centred, with "How?" floating
   right.
5. **The status popup shot had no choice selected.** The test click missed; the page was fine.

Against the live page: this page is already calmer. It has no grey ground, no five equal zero cards and no
terminal text, and all 4 sites plus their actions sit on one screen at 1440. The live page shows 2.5.

**Round 2. Changes:**
- The status cell stacks (badge over age) at 1440–1759.
- The Site column's minimum is lower.
- The panels align to the top.
- The hint is up to 76 characters.
- The phone hint reads "None recorded yet." with "How to add one" on its own line.

**Still worse:**
- At 1400 and 1760 the row still overflowed: 130 px at 1760.
- "Global Surf Lodge Kabalana" wrapped at 1440.

**Round 3. Changes:**
- Breakpoints were measured across 1399–2560 and moved: one line ≥1900, stacked 1440–1899.
- The column gap is now 20.
- The stacked form drops the Suggested icons.

**Still worse, from the full-page shots:**
1. **The sidebar's hairline stopped at 1000 px** on long pages.
2. **The thumbnail touched the site name.** The gap was 8 px, not 20: the subgrid did not widen track 1 for
   the row padding.
3. **The tweak titles wrapped in the 50/50 panels at 1440,** beside an empty Handoffs panel.
4. **At 1024 the rail badge "7" sat on top of the bell icon.**

**Round 4. Changes:**
- The hairline moved to the main column's left edge, so it runs the full height.
- Track 1 is now 80 px with the thumbnail right-aligned, and row padding is gone. The gap is now 24 px.
- The panels split 3 : 2.
- The rail badge sits beside the icon.

**Interaction pass:**
- Esc, × and a veil click each close the popup, and focus returns to the opener.
- Copy puts the exact 512-character KA WhatsApp text on the clipboard.
- The email's gap warning shows above the text.

**Still worse:** keyboard order. Tab went to Update status and Hand off before Preview website. The DOM was
in two-line order (line 1 holds the record actions), while the wide layouts read look → send → record.

**Round 5. Changes:**
- The row DOM is now in action order:
  - thumbnail;
  - an id group (name, by, status);
  - an action group (Preview website, Pitch, Suggested …);
  - Update status;
  - Hand off.
- In the table forms the groups are `display: contents`. The two-line form is a grid, `"th id rec ho" / "th
  act act act"`.
- Tab now runs: tiles → Preview website → Pitch → Suggested … → Update status → Hand off.
- This also fixed two bugs:
  - 721–1000 overflowed by up to 275 px;
  - at 1024 Global Surf's Update status sat 12 px right of the others.
- Every width from 390 to 2560 is now `scrollWidth` = viewport. Every Update status is at one x per form.

**Still worse:** after a save at 1440, the long "Pitched 6 Oct via WhatsApp" badge widened the Status column
and clipped Hand off again. The default date was in UTC: it said 5 Oct at 00:04 local on 6 Oct.

**Round 6. Changes:**
- The badge is "Pitched", and the date and channel are the cell's second part.
- The date defaults to the local day.
- The waiting count includes follow-ups, like the live page.
- On the phone, the message box puts the copy button above the text instead of in a 56 px right gutter.

**Checked after saving** two sites as pitched and one as "meeting booked", at 1920, 1440, 1024, 800 and 390:
- no overflow;
- tiles read All 4 / Ready 2 / Pitched 1 / Replies 1 / Clients 0;
- waiting stays 7.

**Final checks (round 6):**

| Check | Result |
|---|---|
| Console errors, failed requests | none |
| Smallest text | 14 px at every width |
| Lowest contrast | 4.83:1 (`#6B7280` on white), every visible text node computed |
| Reduced motion | transitions off |
| Hand off result | "Handed off to Alon.", Request (as typed), Site, then "Copy prompt" and a collapsed "Show the full prompt" |
| Copy prompt | copies the full machine prompt (run id, file names) |
| On display | back-ticks stripped |
| After Done | the handoff shows in the Handoffs panel in plain words |

**Beats the live page at a glance? Yes:**
- At 1440 all four sites, their status and every CTA are on the first screen, with the money above them and
  the tweaks starting at y 878. The live page shows 2.5 sites.
- The live page has `node tools/money.mjs` lines, the run footer and "localhost:8970 · decisions append to
  the ledger". This page has none of them.
- At 390 the live page is 504 px wide; this one is 390.

**Where it is still weaker than the references (not blocking):**
- At 1920 the money band is mostly white: two $0 on 1616 px. That is Stripe Balances' look, but empty data
  makes it sparse.
- At 1440 "Global Surf Lodge Kabalana" wraps to two lines once a status is recorded. The row height does not
  change.
- At 390 a site block is 357 px: two full-width Suggested buttons and Update status at 44 px each, as the
  concept specifies. Four sites make a 2900 px page.

## Blocking

None.
