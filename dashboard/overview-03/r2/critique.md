# Overview mockups, run `dashboard-03` round 2: critique

Critic, 2026-10-06 (00:00–01:00 local). I judged the pages, not the designers' notes; where a note claims something, I
re-measured it.

**What I scored:**
- `r2/a/index.html` ("Payments"), `r2/b/index.html` ("Home"), `r2/c/index.html` ("Queue"), served at
  `http://localhost:8970/files/dashboard/overview-03/r2/<x>/index.html`.
- Baseline: the live page `http://localhost:8970/`. Reference: round-1 C (`overview-03/c/index.html`), re-shot.

**How:**
- Rubric: `dashboard/BRIEF.md` §8, with "The four questions" replaced by Shahar's questions (`BRIEF-overview-03.md`
  §5), and his round-2 feedback (the amendment) checked point by point.
- Data truth: `dashboard/data.json`, `generated_at` 2026-10-05T20:51:09Z.

**What I tested (Playwright Chromium, from the worktree):**
- First screens at 1920×1080, 1440×1000, 1024×800 and 390×844 (touch), page height and `scrollWidth` at each.
- At 1440, in each variant, every popup used:
  - Suggested WhatsApp (KA): Copy, clipboard read back, Esc.
  - Suggested in-person script (KA): closed with ×.
  - Suggested email (Global Surf): closed by a veil click.
  - Update status (KA): WhatsApp → Save as pitched, then reopened.
  - Hand off (Layday): typed a request, submitted, Copy prompt, clipboard read back, Done.
  - Review (first agent tweak).
  - A: every status tile clicked, arrow keys on the tiles.
- At 390: Update status as a bottom sheet, and the views menu.
- Every "Suggested …" popup in every row opened with all disclosures expanded, and the text scanned for jargon (file
  names, run ids, state names, markdown, `node`, `localhost`).
- Contrast computed for every visible text node; a 22-stop Tab walk with the focus ring checked; the smallest font
  size on the page at each width.

Shots are in the scratchpad (`critic-r2/`), not in the repo. The side-by-side sheet is `critic-r2/side-by-side.png`
(the three 1440 first screens).

## Scores

| Dimension (weight) | A "Payments" | B "Home" | C "Queue" | Live page | Round-1 C (ref.) |
|---|---|---|---|---|---|
| Data honesty (25) | **24** | **23** | **24** | 25 | 20 |
| Shahar's questions (25) | **21** | **22** | **19** | 10 | 21 |
| Craft against references (25) | **18** | **16** | **17** | 9 | 18 |
| Charts (15) | **12** | **11** | **11** | 9 | 12 |
| Accessibility and speed (10) | **9** | **8** | **8** | 4 | 9 |
| **Total /100** | **84** | **80** | **79** | **57** | **80** |

- The live page and round-1 C keep their round-1 scores. I re-shot both and nothing they are scored on has changed.
- Round-1 C's 80 was scored before the amendment. On the round-2 checklist below it fails four points: not full width,
  the solid purple card, the Shahar | Alon card and "active run".
- **Read these numbers with care.** Round 1 gave 78–80, and Shahar rejected all three. The checklist and the hard
  fails below decide more than the totals do. No variant is above 84, because none is yet as calm as Stripe at 1440
  (see Craft).

## His round-2 feedback, point by point

✓ = done, verified. ◐ = partly. ✗ = not done.

| His point (amendment) | A "Payments" | B "Home" | C "Queue" |
|---|---|---|---|
| **Full width**, fluid like the live page | ✓ main runs 240 → 1920 at 1920 and 240 → 1440 at 1440 | ✓ same | ✓ same |
| **Top: C's clear divisions** | ✓ head / hairline / money / hairline / sites | ◐ divisions are three white cards on a grey ground: round-1 cards, not C's sheet | ✓ the most literal: head, one band (money \| counts), hairline, queue |
| **No coloured money card** | ✓ white, ink $0 at 40 px | ✓ white card, $0 at 48 px | ✓ white, $0 at 36 px |
| **Small count tiles / chain "need work"** (Stripe metric row as the bar) | ◐ five *boxed* tiles, 72 px tall, which work as filters (Stripe Payments). At 1920 each box is 313 px wide around a 24 px digit, and this is still the row-of-boxes form he called clumsy | ◐ a label/value list (Stripe Balances). Clean, but the values are **16 px**: the metric row carries no weight | ◐ a figure line (28 px) over a dotted stage line. No boxes, closest to a Stripe metric row, but the dots repeat the numbers and add nothing |
| **No Shahar / Alon differentiation** | ✓ | ✓ | ✓ |
| **"Who ran it" as a quiet attribute** | ✓ "by Shahar", 14 px grey | ✓ | ✓ |
| **No "active run" or run jargon** | ✓ none on the page (scanned) | ✓ | ✓, but the sidebar still shows the counts Ledger 36 · Pipeline 36 · Sites 4 · Agents 16 · Decisions 41 (noise, not jargon) |
| **A's list, much cleaner: compact row, small thumb, name, status, CTAs, nothing else** | ◐ 1920: one line, 57 px, the cleanest list of the three. 1440: 77 px, and the two Suggested buttons stack in the Messages cell with ragged widths | ✓ two-line rows, 95 px, the same shape at every desktop width | ◐ 1920: one line, 67 px. 1440: **two tiers, 117 px**, with a ~600 px empty hole in the middle of line 1 |
| **Small thumbs of the websites** | ◐ **62×38**: a colour swatch, and you cannot tell which site it is | ✓ **110×68**: you can read "Five minutes from Kabalana Beach" | ◐ **62×38**, as in A |
| **Type / run / score dropped (the Sites tab has them)** | ✓ | ✓ | ✓ |
| **Stripe-clean** (white, hairlines, one accent, compact tables) | ✓ the closest: a white page, a table with headers, hairline rows. It mixes in boxed tiles and two boxed panels | ✗ grey `#F6F7F9` ground with radius-12 cards: the live page's look, calmer | ◐ a white sheet, but with grey group-header bands and tall rows at 1440 |
| **Exact CTA labels** | ✓ all seven | ✓ | ✓ |
| **Popups over a white 80 % veil** | ✓ `rgba(255,255,255,.8)` measured | ✓ | ✓ |
| **Hand off shows the request in plain words, full prompt collapsed, Copy prompt copies all** | ✓ verified: the 447-character prompt is copied, and the disclosure is closed by default | ✓ | ✓ |
| **Waiting count = live "Needs you" 7** | ✓ sidebar 7, head sentence "7 things… 4 sites to pitch and 3 suggested agent tweaks", 4 rows + "Also waiting on you 3". After a save it is still 7 (3 + 1 to follow up + 3) | ✓ sidebar 7, sentence 7, strip "Waiting on you 7". After a save it is still 7 | ✓ sidebar 7, "Waiting on you 7" = 4 rows + 3 rows. After a save it is still 7 |

## Data honesty: every number against `data.json`

| Shown | Source | A | B | C |
|---|---|---|---|---|
| Revenues $0, Expenses $0, This month $0 | `revenues` / `expenses`: `entries: []`, `monthly: {}` | ✓ | ✓ | ✓ ("USD" is added; the data has no currency) |
| Being built 0 · Ready 4 · Pitched 0 · Replies 0 · Clients 0 | states: 4 `packaged`, 25 `shortlisted`, 11 `scored`, 1 `void`: none between approved and packaged; no pitched | ✓ | ✓ | ✓ |
| 4 sites, names, "by Shahar" | 4 `packaged`, `ran_by.operator` = shahar for all | ✓ | ✓ | ✓ |
| Ages 10 / 10 / 7 / today | `gates[].since` (KA and Layday 09-25 06:31Z, Lavish 09-28, GS 10-05 11:58Z) at 21:0x Z | ✓ | ✓ | ✓ |
| Drafts per site | `pitch.drafts`: GS email + WhatsApp; the others WhatsApp + in-person | ✓ | ✓ | ✓ |
| Pitch inactive for GS only | brief §3 | ✓ `aria-disabled`, with a tooltip | ✓ | ✓ |
| Preview and Pitch links | `preview_url`, `pitch.proposal_url` | ✓ all 8 match, `target=_blank` | ✓ | ✓ |
| Waiting 7 | 4 `packaged` + 3 `proposals[]` with `status: pending` = live `needsItems()` | ✓ | ✓ | ✓ |
| Three tweak titles | `proposals[].title` (004, 005, globalsurf-02 002) | ✓ verbatim | n/a (count only) | ✓ verbatim; Review shows `what` / `why` |
| Copied WhatsApp text (KA) | `sites/ka-surf-hostel-and-restaurant/pitch/message.en.whatsapp.md` | ✓ 512 characters | ✓ 512 | ✓ 512 |
| "Updated 5 Oct, 23:51" | `generated_at` 20:51Z = 23:51 Israel time | ✓ | ✓ | ✓ |

**Deductions:**
- **A −1: count ≠ list after a save.** With "Ready to send" selected, saving KA as pitched makes the tile read **3**, but the
  table still shows **4** rows, one of them "Pitched". This is deliberate (`template.html` line 508, the `keep` set,
  and line 560), but the selected tile no longer matches its list.
- **B −2:**
  - **Wrong day.** At 00:xx on 6 Oct local time, the Update status date field defaults to **10/05/2026**, so the row
    reads "**Pitched 5 Oct via WhatsApp · today**", which contradicts itself. The default is the UTC date. A and C both
    write "6 Oct".
  - After a save, "Sites to pitch **3**" sits over **4** rows (the subtitle "3 ready to send · 1 pitched" explains it).
- **C −1:** the chip says "**Live** · updated 23:51" on a page where nothing is saved (A and B say "Mockup" / "Preview
  copy"). It also adds "USD", which is not in the data.

No variant invents a number.

## Shahar's questions (timed, 1440×1000 first screen)

I am one observer timing my own reading; this is not a user test. All y values are measured from the DOM.

| Question | A "Payments" | B "Home" | C "Queue" | Live |
|---|---|---|---|---|
| **Eye lands first on** | The bold sentence "7 things are waiting on you" (y 68), then the purple-bordered "Ready to send 4" tile, then the column of four purple Update status buttons | The four thumbnails (the only photos on the page) and the four purple buttons, then the 48 px $0 | The two "$0 USD" and the filled purple dot on the stage line, then the Update status column at x 1156 | "$0" twice, then five equal cards |
| What makes money | ~2 s ($0 at y 169) | ~2 s (y 173) | ~2 s (y 169) | ~3 s, with a `node tools/money.mjs` command under each |
| What can I act on now | ~2 s: the sentence, then Update status at y 552–783 | ~2 s: the "Waiting on you 7" strip at y 391, then the rows | ~2 s: "Waiting on you 7" at y 342, then the first row at y 432 | ~5 s |
| Which sites are ready, who ran them | ~2 s: 4 names at y 548–779, each with "by Shahar" | ~3 s: y 599–884 | ~2 s: y 432–783 | ~6 s: 3 of 4 names visible (the 4th at y 1057) |
| What is waiting on me | ~1 s for the count (sentence). The tweak rows start at y ≈ 945 and are cut by the fold; the Handoffs title is at y 893 | **~1 s, all of it**: the sentence, then the strip (4 pitches · 3 tweaks · Review them), then Handoffs at y 450 | ~4 s: the 7 is at y 342, but the tweak rows start at y 967 and **"Handed off to Alon" is at y 1177, below the fold** | ~4 s: "Needs you 7" in the sidebar only |

**First screen at other widths** (Update status buttons fully visible):

| Width | Live | A | B | C |
|---|---|---|---|---|
| 1920 | 3 | 4, plus tweaks and handoffs | 4, plus strip and handoffs | 4, plus tweaks and handoffs |
| 1024 | **0** | 3 | 2 | 2 |
| 390 (first Update status) | 504 px wide page (scrolls sideways) | y 962 | **y 1545** | y 876 |

**Result:**
- B answers all four questions on one 1440 screen; the whole page is 1009 px tall.
- A answers all four on one screen, but the tweak rows themselves are below the fold.
- C needs a scroll for the handoffs and the tweaks at 1440. Its two-tier rows are 117 px.

## Craft against the references (located)

Stripe is cited from memory, as in `concepts.md` §1; it needs a login and I did not measure it. The other references
are the 13 PNGs named in the concepts.

**A "Payments"**
- **1920 is the best list in this round.**
  - One line per site at 57 px, column headers, hairline rows. It is Stripe Payments' table almost literally, and close
    to Models (`15-46-57`, ~42 px rows).
  - The eye travels **1253 px** from the site name to Update status (x 373 → 1626); Stripe's tables do the same.
- **1440 is busier.**
  - The two Suggested buttons stack inside the Messages cell (widths 174 and 214, so the right edge is ragged), and the
    row grows to 77 px.
  - The "Website" column (Preview website / Pitch, 181 px) costs the width that would keep the buttons on one line.
- **Money band is 200 px of mostly empty white.**
  - $0 is 40 px in a 568 px half at 1440, with a full-height vertical rule.
  - The Expenses hint wraps to 2 lines at 1440, so the halves are uneven.
  - Sypher's (`15-44-34`) invoice header holds three figures in ~110 px.
- **The tiles are boxes** (1 px border, radius 8, 72 px tall). They work: the filter, the empty state ("No site is
  pitched yet…" with "Show all sites") and the arrow keys are all tested. But they are the row-of-boxes form he has now
  rejected twice.
- **Two boxed panels** ("Also waiting on you", "Handoffs") under an otherwise unboxed page mix two surface languages.
- **Thumbs are 62×38.** At that size they are swatches: KA is a green blob and Layday a yellow one.

**B "Home"**
- **The ground is grey `#F6F7F9`, with three white radius-12 cards.**
  - Calmer than the live page (one border, no shadow, 14 px minimum), but it is the same card-on-grey language he
    called messy, not Stripe's white sheet.
  - Shopeers (`15-38-04`) is the honest reference here, not Stripe.
- **Counts are a key-value list at 16 px** (the "Ready to send" value is 16 px / 600). Stripe Balances uses this form
  for secondary figures; as the business's 100,000-ft row it has no weight.
- **Row CTA grammar is split across the two lines.**
  - Update status + Hand off sit at the right of line 1 (x 1141).
  - The Suggested buttons sit on line 2 (x 651).
  - Read top-left to bottom-right, it says "record" before "send yourself", the opposite of the concept's order.
- **1920 wastes the bottom.**
  - The sites card ends at y 815 and the page at 1080, with 230 px of empty grey under it.
  - The money hints are bottom-aligned 60 px below "This month $0".
- **Thumbnails at 110×68 are the only ones in this round that let you recognise the site** (Logip-style list with
  real pictures). That is the clearest answer to "small thumbs of the websites".

**C "Queue"**
- **The top is round-1 C without the purple: one white band**, money at the left, five figures at the right, split by a
  hairline. It is the closest answer to "top part of C is better".
  - The stage line (2 px line, 9 px rings, one filled dot) is lighter than round 1's pills.
  - It encodes only "count > 0", which the figures above it already say.
- **1440 rows are two tiers and 117 px tall.**
  - Line 1 has the name and links at x 366–560 and the badge at x ~1280, with nothing between: a ~700 px hole.
  - Line 2 has the actions right-aligned.
  - Four rows take 468 px; Stripe-like rows would take ~240.
  - At 1920 the row is one tier, 67 px, and clean.
- **"Ready to send" is repeated 5×**: the group header "Ready to send · 4", then a purple badge in every row of that
  group.
- **Grey group-header bands** (40 px, `#F6F7F9`) are Stripe-like as group headers, but four of them plus a badge per
  row put more chrome on the page than A.
- Thumbs are 62×38, as in A.

## Charts

No variant draws a chart or uses a chart library. The data has no history.
- **A (12):** the tiles are labelled counts and filter the table. The zero tiles have a written empty state. Selection is
  shown by a 2 px purple border and a purple label.
- **B (11):** a labelled list with "Ready to send 4 ›" linking to the list. It has no visual form, and the 16 px values
  are weak.
- **C (11):** the stage line is labelled and updates live: after one save, Ready 3 · Pitched 1 and the Pitched dot
  fills. The line itself adds no information.

## Accessibility and speed

**All three:**
- `scrollWidth` = viewport at 1920, 1440, 1024 and 390.
- The smallest text is **14 px** at every width; the live page has 73 nodes at 13 px and 11 px rail labels.
- No console errors and no failed requests.
- 98–110 KB per file.
- Native `<dialog>` (focus trapped). Esc, × and a veil click all close the popup, and focus returns to its opener
  (tested each time).
- The copy button shows "Copied".
- Every focused stop shows a ring.
- No contrast failures. The lowest pair is `#6B7280` on white at 4.83:1 (A, B), and in C `#6B7280` on the `#F6F7F9`
  group band at **4.55:1**, just over AA.
- The 1024 rail has 14 px labels under the icons (the round-1 complaint is fixed).

**Per variant:**
- **A (9):**
  - It has a skip link.
  - Accessible names carry the site ("Update status of KA Surf Hostel").
  - The tiles are a real tablist with arrow keys.
  - The phone top bar has no "7" badge (B and C have one).
- **B (8):**
  - **It has no skip link**: Tab starts at the sidebar.
  - The phone page is 3352 px, with the first Update status at y 1545.
- **C (8):**
  - Each thumbnail is a **second tab stop** with the same target as "Preview website" (4 extra stops).
  - The buttons' accessible names omit the site, so a screen reader hears "Suggested WhatsApp" 4×.
  - On the phone, Preview website and Pitch are **20 px** tall tap targets; A and B are 32 px.

## Hard fails

| Hard fail | A | B | C |
|---|---|---|---|
| Invented number | none | none (the "5 Oct" date is a wrong default, not an invented figure: fix 2) | none |
| Jargon / raw file names shown | **none.** The round-1 hard fail is fixed: the Hand off result shows the request and the site only, and the prompt (slug, run id, `state: packaged`, `CLAUDE.md`, back-ticks) is inside a closed "Show the full prompt" | none | none |
| Ambiguous action | none ("Record what happened. Nothing is sent from here." in Update status; Hand off says you send the prompt yourself) | none | none |
| Contrast under AA | none | none | none |
| Chart library | none | none | none |

**One shared content flag, not a fail:**
- Global Surf's suggested email contains the literal placeholder **"[LINK TO THE PROPOSAL PAGE]"**. It is in the real
  draft (`sites/global-surf-adventures/pitch/message.en.email.md` line 17).
- All three warn about it above the text:
  - A and B: "One gap to fill before this can go out…";
  - C names the placeholder.
- If he copies the email without reading the warning, that placeholder goes to the owner.

## Top 5 fixes per variant

### A "Payments"
1. **Keep count = list after a save.**
   - When a row leaves the selected tile's status, fade it out, or switch the selection to All.
   - Today: "Ready to send 3" over 4 rows (`template.html` lines 508, 560, 682).
2. **Make the thumbnails ~96×60 instead of 62×38**, so the site can be recognised. B's 110×68 proves it works in a
   row.
3. **Make the 1440 row one line of buttons.**
   - Move Preview website · Pitch under the name, as B and C do, and drop the "Website" column (181 px).
   - The two Suggested buttons then sit side by side and the row drops from 77 to ~60 px.
4. **Shrink the money band from ~200 to ~110 px.**
   - One-line hints.
   - Or put the five counts in the empty right part of each half, C's top.
5. **Drop the boxes.**
   - Make the tiles borderless tabs with counts and a 2 px underline for the selection.
   - Make "Also waiting on you" / "Handoffs" hairline sections, not bordered panels.
   - Add the 7 badge to the phone menu button.

### B "Home"
1. **Use one white sheet with hairlines instead of three cards on grey.** Today it is the look he rejected, made calmer.
2. **Fix the date default** to the local date: today "Pitched 5 Oct via WhatsApp · today" on 6 Oct.
   - "Sites to pitch 3" over 4 rows should agree too.
3. **Give the counts weight**: values at 20–24 px, or a horizontal figure row. Today they are 16 px in a list.
4. **Put the CTAs in reading order on one line**: Suggested…, then Update status, then Hand off. Or put Update status
   at the end of line 2. Today "record" sits above "send".
5. **Close the gaps.**
   - 230 px of empty grey under the list at 1920, and hints 60 px below "This month".
   - Add a skip link.
   - Phone: a smaller thumbnail, so the first Update status is not at y 1545.

### C "Queue"
1. **Make the 1440 rows one tier** (≤ 72 px instead of 117).
   - Put the status beside the name, or move the actions up into line 1's ~700 px hole.
   - This alone brings the tweaks and the handoffs onto the first screen.
2. **Bring "Handed off to Alon" (y 1177) and the tweak rows (y 967+) above the 1000 px fold at 1440.** Follows from
   fix 1.
3. **Inside "Ready to send · 4", drop the per-row "Ready to send" badge** (5× the same words). Keep the age.
4. **Make the thumbnails ~96×60.**
   - Remove the thumbnail's tab stop.
   - Add the site to the button names.
   - Make the phone Preview website / Pitch at least 32 px tall (today 20).
5. **Remove the noise.**
   - The sidebar counts 36 / 36 / 4 / 16 / 41.
   - "Live" on a page that saves nothing.
   - "USD", which is not in the data.
   - The stage-line dots, unless they show something the figures don't.

## Recommendation

**A "Payments"**, with fixes 1–3, and B's thumbnail size.
- **Stripe.** It is the only one that reads as Stripe: a white page, a real table with headers, hairline rows, one
  accent.
- **The list.** It is the cleanest "A's list" he asked for. At 1920 each site is one 57 px line with all its CTAs.
- **Top to bottom.** At 1440 money, counts, all four sites with every action, and the waiting/handoff panels' titles
  are on one screen. The waiting count is in the first sentence.
- **Defects.** Its data defect is one behaviour (the kept row); the rest are sizes.

**Risk:**
- Its five boxed tiles are the element most like what he called clumsy.
- If he reacts to them, C's top band (figure line, no boxes) over A's table answers "top part of C" and "list of A"
  together. Both are built and measured.

**B** is the fastest to read at 1440 (everything in 1009 px), and the only one with recognisable thumbnails. But it
keeps the card-on-grey look, which is the opposite of the Stripe ask.

**C** has the best top and the weakest list at 1440 (117 px two-tier rows, handoffs below the fold). At 1920 its list
is nearly as clean as A's.

## Beats the current page?

| | Verdict |
|---|---|
| **A** | **Yes, clearly.** It removes everything he named:<br>• no `node tools/money.mjs`, no "localhost:8970 · decisions append to the ledger", no `globalsurf-02` / `ahangama-02`, no "in active runs", no commit hash;<br>• 14 px minimum where the live page has 73 nodes at 13 px;<br>• no sideways scroll at 390 (live: 504 px);<br>• all 4 sites with every CTA on the first screen at 1920, 1440 and (3 of 4) 1024, where the live page shows 3 / 3 / **0**;<br>• full width like the live page;<br>• page 1189 px at 1440 vs 1455. |
| **B** | **Yes.** It has the same removals as A and shows the most on one screen (1009 px at 1440). It looks the most like the current page (cards on grey), so the change will feel smaller to him. |
| **C** | **Yes.** It has the same removals as A, and its 1920 view is excellent. At 1440 its rows are taller than A's and B's, and the handoffs need a scroll, so on "what is waiting on me" it beats the live page by less. |

**Also noted (outside the Overview, not scored):**
- The brief's output list names a comparison page, `dashboard/overview-03/r2/index.html`. **It does not exist yet.**
- All three keep the live sidebar's seven items, including "Needs you" and "Ledger", so the round-1 question about the
  five views is settled by the live page.
