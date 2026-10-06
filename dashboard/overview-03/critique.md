# Overview mockups, run `dashboard-03`: critique

Critic, 2026-10-05. I judged the pages, not the designers' notes.

**What I scored:**
- `a/index.html` ("Today"), `b/index.html` ("Gallery") and `c/index.html` ("Cockpit"), each opened over file:// in Playwright Chromium.
- The current page at `http://localhost:8970/`, for comparison.

**How I scored it:**
- Rubric: `dashboard/BRIEF.md` §8. "The four questions" is replaced by Shahar's questions, as `BRIEF-overview-03.md` §5 says.
- Data truth: `dashboard/data.json`, generated 2026-10-05T20:00:40Z.

**What I tested:**
- Screenshots at 1440×1000 (first screen and full page), 1024×800 and 390×844.
- I opened every popup type and used it:
  - Suggested WhatsApp, then Copy, then Esc;
  - Suggested in-person script, closed with ×;
  - Suggested email (Global Surf), closed by clicking the veil;
  - Update status: picked WhatsApp, saved, then reopened it;
  - Hand off: typed a request, submitted it, then pressed Copy prompt.
- `scrollWidth` at each width.
- A Tab walk through the page.
- Contrast computed for every visible text node on the page.

The side-by-side sheet is `dashboard/overview-03/side-by-side.png` (the three 1440 first screens). It is not committed.

## Scores

| Dimension (weight) | A "Today" | B "Gallery" | C "Cockpit" | Current page |
|---|---|---|---|---|
| Data honesty (25) | **25** | **24** | **20** | 25 |
| Shahar's questions (25) | **15** | **13** | **21** | 10 |
| Craft against references (25) | **17** | **15** | **18** | 9 |
| Charts (15) | **12** | **10** | **12** | 9 |
| Accessibility and speed (10) | **9** | **8** | **9** | 4 |
| **Total /100** | **78** | **70** | **80** | **57** |

The current page is scored on the same rubric only as a baseline. Its hard fails are terminal text, `node tools/money.mjs` on the page, and sideways scroll at 390.

### Data honesty: every number checked against `data.json`

| Shown | Source | A | B | C |
|---|---|---|---|---|
| Revenues $0, Expenses $0 | `revenues` / `expenses`: no entries | ✓ | ✓ | ✓ |
| Being built 0 · Ready 4 · Pitched 0 · Replies 0 · Clients 0 | 4 businesses `packaged`; the active run (`globalsurf-02`) has nothing between approved and packaged; `kpis.pitched/replies/clients` = 0 | ✓ | ✓ | ✓ at 1440. **At 1024 the label reads "0 Built"**: false, because 4 sites are built |
| Waiting 10 / 10 / 7 days / today | `gates[].days` = 10, 10, 7, 0 | ✓ | ✓ | ✓ |
| Quality 86 / 91.5 / 91.5, none for Global Surf | `critic_score` | ✓ | ✓ | ✓ |
| Decisions badge 3 | 3 paths in `gates[4].target.proposals` | ✓ | ✓ | ✓ |
| "Your next steps 5" | 4 sites + 1 tweaks gate | ✓ | n/a | n/a |
| Shahar: 4 ready · 0 handoffs · 1 active run; Alon: no runs | `runs[]` (one active, operator shahar), `team.open_assignments` = [] | n/a | n/a | ✓ values. **At 1440 Alon's column is blank and "No runs yet" sits in the "Handoffs to them" row** |
| Pitch inactive for Global Surf only | brief §3 | ✓ | ✓ | ✓ |
| Drafts per site (GS: email + WhatsApp; others: WhatsApp + in-person) | `pitch.drafts` | ✓ | ✓ | ✓ |
| Copied WhatsApp text (KA) | `sites/ka-surf-hostel-and-restaurant/pitch/message.en.whatsapp.md` | ✓ 512 characters, identical in all three |

**Deductions:**
- **B −1:** an empty 6 px track is drawn under each $0 (`b/src.html` line 466, `.track`). It is a bar with no data and no label, and it reads as "0 % of something". Concept §3 says "Today it is not drawn".
- **C −5:** two problems.
  - The "0 Built" label at 1024 (`c/template.html` line 551, short label `'Built'`).
  - The Shahar | Alon card at 1440 (line 539 places "No runs yet" into row 2). A reader sees Alon's sites, handoffs and runs as blank cells, with "No runs yet" opposite "Handoffs to them".
  - Also: after one save, "Sites to pitch **4**" stands beside a chain that says Ready **3** · Pitched **1**.
  - C's notes (round 1, item 5) say the "No runs yet" placement was fixed. It is still misplaced in the 1440 shot.

No variant invents a number.

### Shahar's questions

I timed each answer myself on the 1440 first screen, then scrolled where needed. These are my readings, one observer, not a user test. The y values are measured from the DOM.

| Question | A "Today" | B "Gallery" | C "Cockpit" | Current |
|---|---|---|---|---|
| **Where the eye lands first** | The H1 "Good evening, Shahar" (32 px black), then the two grey 72 px "$0" | The two purple-outlined thumbnails with "Waiting longest" pills; the websites' own 60 px headlines out-shout the page | The solid purple money block and its white 72 px "$0" | "$0" twice, then the row of five equal zero cards |
| What makes money | ~2 s ($0 / $0 at y 230) | ~2 s ($0 80 px at y 245) | ~2 s (purple block) | ~3 s, with a command line under each |
| What can I act on now | ~3 s for KA: "Look first / Send it yourself / Then record it", Update status at y 909. Each other site is one more screen down. | ~6 s: the first Update status is at **y 1127, below the fold** | ~3 s: KA's actions are in the panel at y 770–930. Every other site needs a click on its row first. | ~5 s: 6 actions per row, 4 of them the same pill |
| Which sites are ready, and who ran them | ~10 s: names at y 670 / 1023 / 1375 / **1728**, so you scroll 1.7 screens | ~10 s: names at y 768 / 768 / 1549 / 1549; **"Shahar · Ran this site" is at y ≈1150**, under the fold | **~3 s: all 4 names, ages, quality and an "S" disc at y 661–889**; "Shahar: Sites ready to pitch 4" beside them | ~6 s |
| What is waiting on me | ~3 s for the count ("Your next steps 5", y 580). But the 5th item, "3 suggested agent tweaks", is at **y 2077**. | ~3 s for the rail (tweaks, y 550). The 4 pitches waiting on him are not in it, so the answer is split. | ~5 s: "Waiting on you 1" at y 998, cut by the fold | ~4 s: "Needs you 7" in the sidebar, which is a different count from the page |

**Result:** C is the only one that answers all four questions on one screen. A answers "act now" best but needs 2.3 screens for the rest. B needs a scroll for three of the four.

### Craft against the references (located)

**A "Today"**
- The stat strip copies Logip (`15-38-48`) well: icon discs, 1 px dividers, one purple "4" among grey zeros.
- **Step cards are 353 px tall.** Four sites run from y 670 to y 1966. Logip's task rows are ~54 px, and the current page fits 2.5 sites on the first screen where A fits one.
- "Look first / Send it yourself / Then record it" is repeated 4× (12 labels). It explains well once and is noise after that.
- The money cards are 252 px tall (y 138–390) for "$0 so far" and a 2-line hint. Shopeers' (`15-38-04`) KPI cards are ~80 px with title, numeral and context line.

**B "Gallery"**
- The Mondly (`15-36-41`) card row is taken literally. Each card is **715 px** tall (thumbnail 376×220, then meta, links, two message rows, a 48 px button, then the person). Mondly's cards are ~225 px, with the person at the foot. Here the person lands below the fold.
- The money icons are a **download arrow and an upload arrow** (y 178). They read as file transfer. A's notes (round 1, item 6) found the same flaw in A and replaced them with a banknote and a receipt; B kept them.
- There are 7 purple fills on the first screen, and "Waiting longest" is applied to two cards at once. Mondly highlights exactly one card.
- The Sypher (`15-36-13`) tabs-with-counts work: "All 4 · Ready to send 4 · Pitched 0…", with zero tabs disabled and explained in a tooltip.

**C "Cockpit"**
- The whole Overview is **1455 px** at 1440, the same height as the current page, and it carries more.
- The 23andMe (`09-25 15-38-36`) chain reads at a glance: filled = where the sites are, grey = not reached.
- The NexaFlow (`15-41-49`) purple block is **339 px tall** (y 104–443) for two $0s. The Expenses hint wraps to 4 lines in a 40 % column. NexaFlow's card holds three figures in about half the height.
- The Ancestry (`09-25 15-40-32`) compare card is broken at 1440: Alon's column is blank, so the comparison has nothing to compare. At 1024 the same data is a clean 2-line strip ("Shahar (you) 4 ready to pitch · 0 handoffs · 1 active run | Alon No runs yet"), which is better.
- List rows are 76 px against ~42 px in Models (`15-46-57`).
- The preview image repeats "Preview website" as a pill (y ≈995) right under the "Preview website ↗" link.

### Charts

None of the three uses a chart library or draws a real chart; the brief's data has no history.
- **A (12):** the strip is labelled and the empty states are written in words. The zeros are grey 32 px light.
- **B (10):** the tabs are labelled counts. The unlabelled empty track under each $0 (see above) costs points.
- **C (12):** the chain is labelled, and it updates live (verified: after a save it went 4 ready → 3 ready, 1 pitched). It loses points for "Built" at 1024.

### Accessibility and speed

All three meet these:
- No sideways scroll at 1440, 1024 or 390 (`scrollWidth` = viewport).
- No console errors and no failed requests.
- Files of 99, 98 and 118 KB, with the font embedded.

All three popups behave the same, verified each time:
- Esc, × and a veil click all close the popup.
- Focus returns to the button that opened it.
- Copy shows "Copied".
- Update status says "Record what happened. Nothing is sent from here." and swaps to the outcome question once a site is pitched.

**Contrast (computed, every text node in normal state):**
- **No failures in any variant.**
- Lowest: `#6B7280` on white at 4.83:1 in all three (labels, "so far", the zeros).
- C: `#E1D5F9` on `#6A2FE0` at 4.87:1 (the money labels and hints).
- B: white on `#8758E6` at 4.56:1 (the 14 px bold tab count).

**Per variant:**
- **A:** the 14 px minimum holds at every width. There is no skip link.
- **B:** the Decisions badge is **11 px** at 1024 and the mode chip is **13 px** at 390, both under the brief's 14 px floor. Its thumbnail links are correctly named.
- **C:** the badge is **12 px** at 1024. The list is a real listbox: the arrow keys move the selection and Enter moves focus to the panel (tested).
- **All three:** at 1024 the sidebar is icons only, with no visible label and nothing on hover (tested on Pipeline). Shahar cannot tell Pipeline from Decisions by icon.

## Hard fails

| Hard fail | A | B | C |
|---|---|---|---|
| Invented number | none | none | none. "0 Built" at 1024 is a false label on a true number: must fix, see C fix 1 |
| **Jargon / raw file names shown** | **Yes** | **Yes** | **Yes** |
| Ambiguous action | none | borderline: "Approve or reject ›" in the rail reads as if it approves there; it navigates to Decisions | none |
| Contrast under AA | none | none | none |
| Chart library | none | none | none |

**The shared hard fail is the same in all three, with the same cause.**
- The Hand off result shows the whole prompt on screen.
- It includes `state: packaged`, the slug `(layday-surf-ahangama)`, the run id, `CLAUDE.md`, `PLAN.md`, `notes/layday-surf-ahangama.md` and a back-ticked `` `node tools/team.mjs status …` ``. The back-ticks render literally.
- The concept allowed it "inside the copy box". The brief's hard-fail line does not make that exception, and it is exactly the "raw file names and markdown" Shahar complained about.
- **Fix:**
  - Show "Request: *what you typed*" in plain words.
  - Keep the machine prompt collapsed under "Show the full prompt".
  - **Copy prompt** still copies all of it.

## Top 5 fixes per variant

### A "Today"
1. **Make the step cards about 200 px tall instead of 353 px.**
   - Cut the thumbnail from 288×180 to ~160×100.
   - Drop the three row labels from cards 2–4, or move them into the section subtitle.
   - Evidence: 4 sites span y 670–1966. Only 1 site shows on the first screen, against 2.5 on the current page.
2. **Bring the non-site item up.**
   - "3 suggested agent tweaks" is at y 2077, but it is counted in "Your next steps 5" at y 580.
   - Put a one-line "Also waiting: 3 suggested agent tweaks · Review them" under the section header.
3. **Halve the money cards** (y 138–390, 252 px) and keep the hint to one line, as Shopeers does.
4. **Hand off result:** see the hard fail above (file names, back-ticks, `state: packaged`).
5. **The H1 says nothing actionable.** Make it the fact: "4 sites ready to pitch — oldest waiting 10 days". Today that is the grey subline, and "Good evening" takes the 32 px.
   - Also add labels or tooltips to the 1024 icon rail.

### B "Gallery"
1. **Move "who ran it" and the actions above the fold.**
   - Put "S Shahar" in the meta line, as A and C do; today the foot is at y ≈1150.
   - Cut the thumbnail height from 220 to ~140.
   - The first Update status is at y 1127 at 1440.
2. **Remove the empty `.track` bar** under each $0 (`src.html` line 466). It is unlabelled and carries no data.
3. **Replace the download/upload arrow icons** on Revenues and Expenses (y 178) with money-in / money-out icons.
4. **"Waiting on you" rail:**
   - Add the row "4 pitches to send".
   - Rename "Approve or reject ›" to "Review them in Decisions ›" so it does not read as an in-place action.
   - Mark one card "Waiting longest", not two; KA and Layday tie, so drop the pill, since it says nothing that "for 10 days" doesn't.
5. **Hand off result:** see the hard fail above.
   - Raise the Decisions badge from 11 px (1024) and the mode chip from 13 px (390) to 14 px.

### C "Cockpit"
1. **"0 Built" at 1024 → "0 Building"** (`template.html` line 551). As written, it says no site is built while 4 are.
2. **Fix the Shahar | Alon card at 1440.**
   - Today Alon's column is blank and "No runs yet" lands in the "Handoffs to them" row (line 539).
   - Show 0 / 0 / 0 for Alon, as the card already does after a handoff, or use the 1024 two-line layout at every width.
3. **Cut the money block from 339 px to ~200 px.**
   - Keep the hints to one line each; Expenses wraps to 4 lines today.
   - This brings "Waiting on you" (now y 998, cut by the fold) onto the first screen.
4. **Reduce clicks for the next site.**
   - After a save, auto-select the next oldest Ready to send site.
   - Make the "Sites to pitch" count agree with the chain after a save (it stays 4 while the chain says 3 ready).
   - Remove the duplicate "Preview website" pill on the picture.
5. **Hand off result:** see the hard fail above.
   - Raise the Decisions badge from 12 px (1024) to 14 px.
   - Add labels or tooltips to the 1024 icon rail.

## Recommendation

**C "Cockpit", with fixes 1–3 made before it is built.** The reasons:
- It is the only one where Shahar's four questions are all answered on the first screen at 1440: money, where the business is stuck (the chain), all four sites with age, quality and who ran them, and the selected site's actions.
- It is the shortest page (1455 px), so the 100,000-ft view does not depend on scrolling.
- Its defects are local and small: one wrong word, one misplaced grid cell, an over-tall block. A's and B's are structural: card height decides how many sites you can see.

**The cost of C:** you act on one site at a time, and each other site needs a click.

**When to pick A instead:** if Shahar's real use is "sit down and send all four pitches in one go". A shows every site's actions without a click and has the clearest action grammar. It needs fix 1 (card height) to stop being a three-screen scroll.

**B** is the weakest for this judge. It optimises for looking at the sites, which Shahar did not ask for. The actions and "who ran it" sit under the fold.

## Beats the current page?

| | Verdict |
|---|---|
| **A** | **Yes.** It removes everything Shahar named:<br>• no `node tools/money.mjs` line, no "localhost:8970 · decisions append to the ledger", no commit hash;<br>• 14 px minimum where the current page has 73 text nodes at 13 px;<br>• no sideways scroll at 390 (the current page is 504 px wide there);<br>• Hand off is a popup, not inline;<br>• one filled button per site.<br>But it shows **fewer sites per screen** than the current page (1 vs 2.5). |
| **B** | **Yes, narrowly.** It has the same removals as A. But the first screen at 1440 shows no action button at all (the first Update status is at y 1127), where the current page shows three. On "what can I act on now" it is worse than the current page. |
| **C** | **Yes, clearly.** It has the same removals as A, the same page height as the current page (1455 px), and it answers more on the first screen than the current page does. |

All three drop "Needs you" and "Ledger" from the sidebar. The brief asks for "the five views", but the Ledger view was added in the latest commit (942178d), so Shahar should confirm before the build.
