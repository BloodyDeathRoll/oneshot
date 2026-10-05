# Agents mockups, run `dashboard-04`: critique

Critic, 2026-10-06. I judged the pages, not the designers' notes. Every claim below was tested in Playwright Chromium against
the live server (`http://localhost:8970/files/dashboard/agents-04/<x>/index.html`, current view `http://localhost:8970/#agents`).

**Rubric:** `dashboard/BRIEF.md` §8. "The four questions" is replaced by this brief's three questions (`BRIEF-agents-04.md` §3).
Two more standards come from Shahar's Overview round-2 note: **full width** and **clean like Stripe**.

**Truth:** `ledger.jsonl` (408 lines). I recomputed every health number from the raw ledger, not from `data.json` or the build logs.

**What I tested:**
- Screens at 1920×1080, 1440×1000, 1024×800 and 390×844, captured in viewport steps.
- Flows, each one run:
  - open an agent;
  - read the tabs;
  - Your rules → Write your first rule → Save → toast with Undo;
  - What it does → Suggest a change → Review my suggestion → Add to suggested tweaks;
  - Approve, then Reject;
  - Open in Pipeline / Open.
- A Tab walk, Enter and Esc, and a deep link to `#agents/critic`.
- `scrollWidth` at each width.
- Contrast computed for every visible text node, main view and agent detail.

Shots are in the scratchpad (`critic-agents/`), not in git. The three 1440 first screens are in `side-by-side.png`.

## Scores

| Dimension (weight) | A "Line" | B "Board" | C "Checkpoints" | Current view |
|---|---|---|---|---|
| Data honesty (25) | **20** | **21** | **21** | 12 |
| Shahar's three questions (25) | **14** | **20** | **15** | 3 |
| Craft against references (25) | **13** | **15** | **16** | 9 |
| Charts (15) | **12** | **11** | **12** | 5 |
| Accessibility and speed (10) | **6** | **6** | **7** | 4 |
| **Total /100** | **65** | **73** | **71** | **33** |

**Full width?**
- **C: yes.** Content is 1600 px at 1920.
- **A and B: no.** `main{max-width:1200px}` in both templates (line 54) holds the content to 1120 px. That leaves about 560 px of empty
  ground at 1920. This is the reason Shahar gave for rejecting Overview round 1, so A and B repeat a fault he has already named.

## Data honesty: every number recomputed from the ledger

All four checkpoints match the ledger exactly, in all three variants.

| Shown | Ledger recount | A | B | C |
|---|---|---|---|---|
| Shortlist: dropped 9 of 14 after approval (4 by you, 5 by the harvester) | 14 `to: approved`. 9 whose last line is `approved/harvested → shortlisted`: human 4, harvester 5 | ✓ | ✓ | ✓ |
| Copy: sent back 11 of 22 (KA 5/8, Lavish 2/5, GS Lodge 2/4, Layday 1/3, GS Adventures 1/2) | copyeditor `copy_passed/failed` lines | ✓ | ✓ | ✓ |
| You stepped in at copy: 6 | human `from: copy_failed`: KA 2, Lavish 3, Layday 1 | ✓ | ✓ | ✓ |
| Mockup pick: no pick 7 of 12 | human `from: mocked`, 5 `to: picked` | ✓ | ✓ | ✓ |
| Critique: sent back 3 of 7; you stepped in 3 | `critiqued(n)` rounds KA F/F/P, Lavish F/P, Layday P, GS Lodge P (`critic PASS 71.4/80`) | ✓ | ✓ | ✓ |
| Since last change: copywriter 3/6, humanizer 11/19, creative director 3/4, scout 0/2, designer none | first line at `version_changelog` | ✓ | ✓ (toggle) | ✓ |
| Tweaks waiting 3 (designer 2, one of them for your rules; copyeditor 1) | `proposals[] status: pending` | ✓ | ✓ | ✓ |

No invented number and no chart library in any variant. Each variant has 0 external requests and 0 page errors.

**Where the numbers are true but the picture misleads.** These are shared, and they cost points.

1. **The scout is solid red for your own drops in a test run.**
   - 4 of its 9 "dropped" businesses were dropped by you.
   - Since its last change it is 0 of 2 dropped.
   - B's "Since each agent's last change" view honestly turns it into **Too early**. A and C keep it red on the main view.
   - A goes further: it draws the "Dropped 9 of 14" arc **from the Harvester**, which pins your 4 on the harvester.
2. **The designer's critique fails were mostly copy.** The critic's own notes say 2 of the 3 send-backs were copy facts
   ("Hard fail from the passed copy"), yet they count against the designer. C says so in the Critique footer, and B says so on the
   copyeditor page. In A you have to read the note under KA to find out.
3. **A voided run counts as a "no pick".** "No pick 1 of 1 · run voided" counts against the creative director and the designer.
   All three show the tag, but it still feeds the red.
4. **B cuts each note at its first sentence, which removes the reason.** KA's latest copy send-back reads "Round 7, full-file
   re-check: all six round-6 fails fixed". That sounds like a pass, but it was sent back for "one unsourced left". B's tooltip
   also reads "No pick No pick: Your notes on …".

**Current view (baseline):**
- "Fails this run" shows `globalsurf-02` only, while the selector says "All runs".
- "Passes" counts unjudged work, for example designer 3.
- Jargon: `v0.3.1 · pin = changelog`, "Ledger lines".
- Its numbers trace to the data, but they answer nothing.

## Shahar's three questions: timed, and where the eye lands

These are single-observer times at 1440×1000, from page load. Positions are measured in px from the top of the page.

| | Eye lands first | 1. Which agent isn't performing, and why | 2. What can I do about it | 3. What does it do, and how do I change it |
|---|---|---|---|---|
| Current | the purple "copyeditor 2" bar | not answerable. The only bar is the checker, from one run | nothing on the page | nothing on the page |
| A | the 2×2 block of red pills (Copywriter, Humanizer, Creative director, Designer) | **which: 3 s.** **Why: about 20 s.** The chips give counts only, and the hover gives counts again. Reasons are in "Where work was sent back" at y=1270 | **about 10 s.** "Waiting for you" starts at y=1270 and the first Approve is at y=1703, almost two screens down | **about 15 s.** In the sheet, the "What it does" tab is at y=2302, 2.3 screens of scrolling below the stats, tweaks and send-back lists |
| B | the red "9 of 14 / 7 of 12" numerals and the five red pills | **which: 3 s.** **Why: about 12 s.** The row says *where* the work was judged ("Judged at copy review, by the copyeditor"). The reason needs the agent page | **3 s.** "Tweaks waiting 3 · Review them" is at y=185. The designer row shows "2 waiting" | **4 s.** Click the row and the full page opens with the tabs, the document and "Suggest a change" on the first screen |
| C | the 48 px red "9 of 14" and "11 of 22", then the "5 agents need fixing" chips | **which: 3 s** (chips). **Why: about 10 s.** Dots, then Open, then the story popup with each round's note | **about 10 s.** There is no "waiting" block. Tweaks are pills in card footers, the first at y=982 (cut by the fold) and the second at y=1891 | **about 10 s.** In the popup, the tabs are at y=1555 in an 880 px popup, so the document starts about 1.8 popup heights down |

**What these times show:**
- No variant answers "why" on the first screen in plain words. All three show *how much* bounced. *What went wrong* needs a click
  and then reading ledger notes written for Claude.
- B is the only variant where the definition, the edit button and the "why is this red" rail share one screen.

## Hard fails

| Hard fail | A | B | C |
|---|---|---|---|
| Invented or untraceable health number | none | none | none |
| Jargon or raw file names shown outside the agent's own document | **yes** | **yes** | **yes** |
| Ambiguous action | no | no | borderline: **"Open ›"** on business rows opens a story popup; it does not open the business (aria-label only) |
| Text contrast under AA | no. Lowest 4.83:1 (`#6B7280` on white) | no. Lowest 4.71:1 | no. Lowest 4.83:1 |
| Chart library | no | no | no |

**The jargon, located:**

- **All three: "Last changed" prints the raw CHANGELOG line.** Every variant shows this in the agent detail, and C also shows it on
  the main view:
  - Scout: "tools/funnel.mjs --depth 1 … existing_site.funnel".
  - Humanizer: "agents/wiring.json by node tools/prompt.mjs".
  - Critic: "audit.json.recommended.booking_flow … funnel.json.hero_action".
  - Designer (B): "src/tenant/content.json".
  - Copyeditor (B and C headers): `audit.json` as a chip.
  - C's main view, auditor row: "schemas/audit.md 0.1.2:".
- **A, main view, "Where work was sent back":**
  - "One unsourced left: amenities[3]";
  - "Round 3 FAIL: 5 unsourced";
  - "quotes[1] … Address passes 0.5.1. Stale sources.md strings";
  - "Re-run check-places".
- **C, agent popup, "Where it sent work back":**
  - "review.md round 7, full-file re-check";
  - "review.md round 3 … FAIL on one clause".
- **B** cleans the ledger notes (`FAIL` → "sent back", `copyBlocks[1]` → "copy block 2", file names removed). B fails on the
  "Last changed" lines only.

The designers flagged "Last changed" as a data gap. That explains it, but the page still fails: Shahar asked for "readable for
humans", and he will read these lines first in every agent header.

## Accessibility and speed

**Contrast:**
- All text passes AA in all three; the numbers are in the hard-fail table above.
- Non-text: B's squares and C's dots tell **kept from sent back by hue alone**. `#1A7F37` against `#C0182B` is 1.21:1 in luminance,
  so a red-green colour-blind viewer sees one row of same-shaped grey squares. The concept promised "colour never carries the
  meaning alone".
- A's nodes carry a "!" icon and a word, so A passes this.

**Keyboard:**
- **A:** best order. Nodes come in work order, then arcs, then Approve. Esc returns focus.
- **B:** shows a focus ring on the whole row, but every square is a tab stop. It takes **101 Tab presses** to get from the Scout row
  to the first no-signal card.
- **C:** has the same weight with its dots and cells.

**Deep links:** `#agents/critic` opens the detail in all three.

**Width:**
- 390: `scrollWidth` is 390 in A, B and C.
- Current view: 493 at 390, which means sideways scroll.

**Weight** (brief: under 300 KB before data):

| | A | B | C |
|---|---|---|---|
| Size | 956 KB | 448 KB | 522 KB |

All three are over. Each embeds every agent file, and A embeds them uncompressed.

## Top 5 fixes per variant

### A "Line" (65)

1. **Go full width.** `a/template.html:54` sets `main{max-width:1200px}`. At 1920 the map sits in the left 60 % of the window.
   Let the lanes stretch, or let the two cards beside them use the right side.
2. **Replace raw notes and CHANGELOG lines with plain sentences.** Fixes the hard fail. In "Where work was sent back", use B's
   cleaning at the least: no `amenities[3]`, `FAIL`, `sources.md`, `quotes[1]`. In the sheet's "Last changed", no `tools/…`.
3. **Draw the shortlist arc from the true source.** The "Dropped 9 of 14" arc starts at the Harvester, but 4 of the 9 were your
   own drops. Split the arc (you 4, harvester 5), or draw it from the shortlist diamond itself.
4. **Put the reason and the action on the first screen.**
   - Today the first Approve is at y=1703, and the reason text is at y=1270+.
   - Add the first sentence of the worst reason to each arc chip, or move "Waiting for you" beside the map.
   - Move the sheet's tabs above the send-back list: "What it does" is at y=2302 inside the sheet.
5. **De-clutter the map** (the 23andMe bar is short, quiet connectors):
   - "No pick 7 of 12" sits on the Words lane's "one shared verdict" label.
   - The critic's amber arc crosses the "builds your pick" loop.
   - Four right-edge elbow arrows add grey that carries no meaning.

### B "Board" (73)

1. **Go full width.** Same `max-width:1200px` at `b/template.html:54`. A Stripe-style table should run edge to edge. The
   no-signal grid can then go to 5–6 columns and stop taking the bottom 60 % of the page.
2. **Plain "Last changed" lines.** Fixes the hard fail: "src/tenant/content.json", "agents/wiring.json",
   "audit.json.recommended.booking_flow", and the `audit.json` chip in the copyeditor header.
3. **Put the reason on the row, not only the place.** "Judged at copy review, by the copyeditor" says *where* the work was judged.
   Add the top reason in plain words, e.g. "mostly unsourced claims (KA 5 of 8)". Fix the first-sentence cut that makes KA's
   send-back read as "all six round-6 fails fixed". Fix the "No pick No pick" tooltip.
4. **Make kept and sent back readable without colour.** Give sent-back squares a different shape or an inner mark: hollow, or a
   cross. Make the strip **one** tab stop with arrow keys inside it; today it takes 101 Tab presses to pass the board.
5. **Show the scout's real state, and show tweaks on rows:**
   - The scout is red on "All work" but "Too early" on "Since each agent's last change". Default to the since view, or show both
     states on the row.
   - The copyeditor's waiting tweak lives only in the no-signal grid at the bottom. Surface it in the summary or on a pinned
     "Waiting for you" row.

### C "Checkpoints" (71)

1. **Plain "Last changed" lines and plain notes.** Fixes the hard fail: "schemas/audit.md 0.1.2:" on the main view, and
   "review.md round 7", "FAIL on one clause" in the agent popup.
2. **Add one "Waiting for you" block near the top.** Today the 3 tweaks are footer pills at y=982 (behind the fold) and y=1891.
   Shahar asked for "only what he can act on", so the actions must not sit at card bottoms.
3. **Calm the alarm look** (Stripe and Mondly keep one highlight):
   - Three 6 px red card edges, three 48 px red numerals, red discs and red dots on one screen.
   - Keep the edge, or the numeral, not both.
   - Shahar already said "not loving the colored card" on the Overview.
4. **Put the document higher in the agent popup.** The tabs start at y=1555 in an 880 px popup. Put "What it does / Your rules"
   beside "How it's doing", as B's rail does, and collapse the send-back list. Rename **"Open ›"** to what it opens, e.g. "See the
   rounds ›".
5. **Make dots colour-independent, and fill the dead space:**
   - Same hue-only problem as B: use a hollow dot for sent back.
   - The Critique card has about 170 px of empty space under 4 rows, because it is matched to the Mockup card's height.
   - The shortlist card's 9 name chips take more room than the bar that already says it.

## Beats the current view?

- **A: yes.** The current view cannot answer any of the three questions. A answers "which" in 3 s and lets you read, edit, suggest
  and approve. It is still not full width, and still not plain-worded in its notes.
- **B: yes, by the widest margin on usability.** It answers all three questions fastest (3 s / 3 s / 4 s to the document). It
  loses the full-width test that the current view passes (current: 1632 px of content at 1920).
- **C: yes.** It is the only variant that keeps the current view's full width. It is weaker than B on "what can I do" and "how do I
  change it".

## Recommendation

**Pick B "Board", conditional on three fixes before it is shown again:**
1. full width;
2. plain "Last changed" lines;
3. a plain reason on each red row.

Why B:
- It is the only variant where the weak agents, the action waiting and the agent's own definition are each one glance or one
  click away.
- Its row list is the closest of the three to the Stripe and Models tables Shahar pointed at.
- Its first fault is one CSS line.
- C's first faults are structural: an agent's picture is split across cards, and the actions sit at card bottoms.

If Shahar wants the pipeline drawn as a graph (the brief's "on a graph"), A is the only true graph. A needs the most work: width,
arc attribution, jargon, and reasons pushed two screens down.

**Not ready as is:** all three carry the same hard fail, raw file names in "Last changed". It needs a plain one-line summary per
CHANGELOG entry (concepts.md §7 gap 7), and nothing can be invented to fill it.
