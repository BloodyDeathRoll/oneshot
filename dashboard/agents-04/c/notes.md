# Agents, direction C "Checkpoints": notes

`index.html` is the deliverable: one self-contained file (295 KB), Manrope embedded as base64, no external request.
`node dashboard/agents-04/c/build.mjs` (after `node dashboard/data.mjs`) builds it from `template.html`,
`plain.mjs`, `dashboard/data.json`, the files under `agents/<name>/` and the three pending suggestions in
`proposals/`. The build prints every number the page shows and a jargon check of every string it shows from the
data. The agents' files and the suggestions are embedded gzipped and unpacked once in the page
(`DecompressionStream`), since they are read only when a popup opens. `plain.mjs` turns the ledger's notes into
plain words (see "Plain words" below).

## Numbers (all runs, `data.json` of 2026-10-05), checked against concepts.md §1.4, then re-attributed (round 6)

- Your shortlist **5 of 10** dropped by the harvester: red. Your own 4 drops are shown on the bar (white cells with a
  purple edge) but no longer count against the scout (was 9 of 14).
- Copy review 11 of 22 sent back, you stepped in 6 times: red (unchanged).
- Your mockup pick 7 of 12 without a pick: red (unchanged).
- Critique **1 of 7** sent back for the build itself: **Doing fine** (was 3 of 7, Watch). The critic's own notes put
  KA's rounds 1 and 2 on "Hard fail from the passed copy" / "from unchanged copy", so those 2 no longer count against
  the designer. The card still says the critic sent back 3 of 7 in all.
- Agents: still 5 need fixing (scout 5 of 10 is exactly half; the designer stays red through its shared mockup
  verdict), 0 watch, 0 fine, 11 no signal. Header sentence unchanged: three of four checkpoints send back half or more.
- Since the last change: copywriter 3 of 6 (28 Sep), humanizer 11 of 19 (20 Sep), creative director 3 of 4 (28 Sep),
  designer not judged since 5 Oct, scout 0 of 2 dropped (28 Sep).
- 5 agents need fixing, 0 watch, 0 fine, 11 no signal; 7 at a checkpoint, 9 not checked; 3 tweaks waiting
  (designer 2, one of them for your rules; copyeditor 1). Harvester 12 businesses / 15 harvests, auditor 2 audits.
- The critic's notes put 2 of its 3 send-backs on copy facts that had passed copy review (KA rounds 1 and 2:
  "Hard fail from the passed copy", "Hard fail from unchanged copy").

## Assumptions (decided, not asked)

- **Mode line** reads "Mockup: what you change stays on this page", not the concept's "Live · your changes are
  saved": every save, tweak, approve and reject works in the page and is posted nowhere (as the Overview C mockup).
- **Plain words** (round 6): the ledger's notes are never shown raw. `plain.mjs` only counts what a note states
  ("5 unsourced + 1 contradicted" → "5 claims with no source in the facts, 1 that contradicted the facts"), quotes words
  that are in it (your verbatim answers, or lines of the site's copy the checker quoted, under "Quoted in its note"),
  or swaps a technical token for its plain name (file names → "the source list", "the facts"; station codes → step
  names; `copyBlocks[1]` → "copy block 2"; FAIL → "sent back"; "Shahar" → "you"). Nothing is paraphrased by hand.
  The critic's rounds show only the score and whether its hard fail was copy or the build.
- **"Last changed"** is now "Changed 28 Sep" plus **Read the history**, which opens the History tab (the rendered
  changelog). The changelog lines are not summarised, because no plain summary exists in the data.
- **Removed:** "Read the copy review" and "Read the critic's report". Both files are written for Claude and full of
  file names; the rounds popup now gives each round's reason in plain words.
- **Global Surf Lodge's critique verdict** is `null` in `critic_series` (data.mjs's pattern misses "critic PASS
  71.4/80"). The build reads PASS from the same ledger note. Data gap, see below.
- **Shortlist footer**: the concept said "some approvals were random draws". The ledger says so for one approval
  (Briza Surf Kabalana), so the page says exactly that: "One approval there is noted as a random draw".
- **Copy review link** for a site folder shared by two runs (`global-surf-adventures`) is shown only on the row of
  the run the review names (Global Surf 02), not on Global Surf Adventures (Global Surf 01).
- **Critic's report** is the file the critic's own ledger note names (`…critic-final.md` for Global Surf Lodge),
  else `reports/<run>/<slug>.md`.
- **The suggested rules text** ("Put it in my rules") is the proposal's "Suggested replacement" quote, with its
  hard-wrapped lines joined into paragraphs (markdown reads them the same).
- **Sidebar**: seven views; all but Agents link to the current dashboard (`mockups/soft-cards/dist/index.html#…`).
  Needs you 7 (4 pitches + 3 tweaks, the current dashboard's rule), Decisions 3; both drop as tweaks are answered.
- **Toast with Undo** stays 10 s (the concept gives 4 s for the toast and 10 s for Undo; the Undo lives in the toast).
- **Full width**: no max-width on the content, after Shahar's Overview round-2 note ("None are full width").

## Deviations from concepts.md (C), with reasons

- **Top band, two cards (round 6, from the critique):** "What needs fixing" (one row per red checkpoint: its agents,
  the count and one plain reason counted from the notes; for the mockup pick, your own latest words) and "Waiting for
  you" (the 3 tweaks with Approve / Reject / Put it in my rules and "What changes and why"). At 1440×1000 both are
  fully on the first screen. This replaces round 5's "5 agents need fixing" chips.
- **Numerals are ink, not red** (critique: one highlight, not three). The card edge and the state pill carry the
  state; red cards don't repeat the reason that the top band gives.
- **Kept / sent back marks are not colour-only:** kept is a filled green disc with a white tick; sent back is a white
  disc with a red ring and a red ×; your step-ins stay purple diamonds. Shortlist cells carry the same tick and ×.
- **"See the rounds ›"** replaces "Open ›" on business rows (it opens that business's rounds at the checkpoint).
- **The agent popup** shows the red agent's reason under its name, and "Where it was sent back" is collapsed by default
  so the files start higher.
- **A key above each card's rounds** ("Each check, oldest first: ● Kept ● Sent back ◇ You stepped in"). Without it the
  dots and diamonds could only be decoded by hovering.
- **Business rows** show "Ahangama 02 · 5 of 8" under the name, so the count is readable without counting dots.
- **Legend card** ("What the colours mean") under the grid, with §1.3's sentences verbatim.
- **Agent popup** has a slim sticky top bar (name, state, ×) that fills in once the header band scrolls away, so the
  × never sits on top of a button and you always see whose file you are reading.
- **"Went on"** chips were tried in round 2 and removed (the green cells already say it, and the card grew too tall).

## Look-log

References used side by side: Mondly (`15-36-41`, one highlighted card in a quiet row), Models (`15-46-57`, rows
with status pill and value), Sypher (`15-36-13`, segmented cells), FinGuard (`15-43-09`, sentence plus action pills),
and the Overview C mockup (`overview-03/c`) for the product language. Shots: scratchpad `agents-c/round-N/`.

### Round 1

1440/1024/390 full page, copywriter and designer popups, editor, suggest popup, story, empty rules.
What is worse than the references, concretely:
1. "Dropped by you" chips collapsed into a 40 px column of broken words: the class `you` collided with the sidebar's
   40 px disc rule.
2. Business rows: "Ahangama 02 · 5 of 8 sent back" wraps to three lines in the 168 px name column; rows are 60–70 px
   where Models keeps one tight line.
3. In the agent popup the × floats over "Suggest a change" once scrolled, and nothing says which agent you are in.
4. Code spans render in the browser's monospace (a `code` element), the terminal look the brief bans.
5. The mini discs in the header row show the tweak badge over the initials (Designer).
6. Tweak cards: "For your rules" pill stretched across the card; a third, empty column.
7. Discard flow: Chrome closes the agent popup on a second Esc even when `cancel` is prevented, so the edit was lost
   and the page threw an error.
8. The diff counted a blank line as an added line ("2 lines added" for one sentence).
9. The shortlist card had ~150 px of empty space next to the copy card.

### Round 2

All nine fixed: class renamed; rows read "Ahangama 02 · 5 of 8"; sticky top bar with name, state and ×; chips use
Manrope; no badge on mini discs; pill hugs its text and cards fill the row; Esc is handled on keydown (the agent popup
now always asks "Discard your changes?"); blank lines are not counted; a "Went on" chip group filled the shortlist.
Still worse:
1. KA Surf Hostel's ten marks wrap to a second line at 1440.
2. No key for dots and diamonds in the cards (Sypher labels its cells; ours need a hover).
3. "Went on" made the shortlist card ~120 px taller than the copy card and repeats the green cells.
4. Opening an agent shows a focus box around its name (programmatic focus).
5. 390: "Made by" and "Checked by" stack, ~180 px per card.

### Round 3

Key line added, "Went on" removed, heading focus without a ring, discs side by side at 390. Still worse:
1. KA's marks still wrap by one dot at 1440 (name column 168 + "Open ›" leave 219 px for 221).
2. The key line wraps, leaving "You stepped in" alone on a second line.
3. "Put it in my rules": the suggested text breaks mid-sentence ("On the / first screen"), because the proposal's
   quote is hard-wrapped; the highlight layer also covers the editor's purple focus border.
4. Tweak cards stretch to the tallest card (a short new tweak shows a 400 px empty card).
5. Toast inside the popup sits across the popup's bottom edge.
6. 390: each business row is three lines with "Open ›" alone on the third.

### Round 4

KA fits on one line (name column 156, 5 px gaps); key shortened to "Each check, oldest first:"; quote lines joined into
paragraphs; highlight inset 2 px; cards top-aligned; toast sits above the editor footer; phone rows put "Open ›"
beside the name. Still worse:
1. 390: "Discard your changes?" fills the whole screen (a modal dialog with `height:auto` stretches; needs
   `fit-content`).
2. A toast from a closed popup shows half-hidden under the next popup's veil.
3. Opening an agent from "1 tweak waiting" put focus on the scroll area, not on Approve; after approving, Esc
   returned focus nowhere (the pill had been re-rendered).

### Round 5

All three fixed (fit-content; a toast hides when another popup opens; focus goes to the first tweak's Approve, and
returns to the same agent's control after closing). Small type raised to 14 px ("empty", verdict pills, counts).
Checks run on the final build:
- `scrollWidth` equals the viewport at 1440, 1024 and 390; no console errors; 0 external requests.
- Esc, × and a click on the veil close every popup; the agent popup asks before discarding unsaved text.
- Your rules: Write your first rule → Save → "Saved to your rules." with Undo → Undo restores the empty state.
- What it does: Suggest a change → Review my suggestion → diff → Add to suggested tweaks → it appears first in
  "Waiting for you" with Approve and Reject; Approve shrinks it to "Approved just now · Claude applies it in its
  next session"; the Decisions and Needs you badges and the disc badges drop.
- Put it in my rules opens the rules editor with the suggestion in place and the changed lines highlighted.
- Dots, diamonds and cells are buttons with labels; a tooltip shows on hover and on focus; the focus ring is a
  2 px `#6A2FE0` outline; vertical tabs move with the arrow keys.
- Reduced motion: no popup animation (`animation-name: none`), no transitions.

Contrast (computed): white on `#C0182B` 6.2:1; `#9A5B00` on white 5.4:1; white on `#1A7F37` 5.1:1; `#6A2FE0` on
`#F3EEFD` 5.96:1; `#6B7280` on white 4.8:1; `#A3132A` on `#FDECEE` and `#17702F` on `#EDF7F0` above 5:1.

### Round 6 (revision after the critique; shots `round-6/`, 1920/1440/1024/390)

The five points from the coordinator, all done (see Deviations and Plain words): jargon removed from every view,
"See the rounds", attribution (scout 5 of 10, designer builds 1 of 7), a reason per red checkpoint and agent plus
the tweaks on the first screen, tick and × marks. What the shots still showed, concretely:
1. Red cards repeated the top band's reason under the numeral: about 90 px of duplicate text per card.
2. In the rounds popup the pill said "Kept" and the line under it began "Kept." again.
3. A schema rule the copyeditor quoted ("a fact lives in exactly one field") was listed under "The lines it
   questioned", which it was not.
4. Step-ins read "You on the full round-1 fail" and "You, standing rule for the copyeditor".
5. "Put it in my rules" from the top band did nothing when no popup was open, and Approve there threw an error.
6. Global Surf Adventures read "went on to be built" though its run was voided.

### Round 7 (`round-7/`)

All six fixed: reason only in the top band for red cards; verdict words not repeated; the label is now "Quoted in its
note"; "Your answer to the full round-1 send-back", "Your standing rule"; top-band actions open the popup when needed;
"went on; the run was later voided". Still worse: the "Dropped by you" name chips kept a red square while their bar
cells are now white (not counted).

### Round 8 (`round-8/`)

Chips match the cells. Final checks, on the build in the folder:
- **Jargon grep (Playwright):** the visible text, tooltips and aria-labels of the main page, all 16 agent popups (with
  "Where it was sent back" open) and all 28 rounds popups: 45 views, 0 hits for file extensions, FAIL/PASS, field
  paths like `x[1]`, version numbers, station codes, camelCase / snake_case identifiers, §, "dossier", "gate a",
  "mode: test", slugs, "ledger". The only exceptions, by design, are the agent's own files in the tabs (What it does,
  Your rules, History, References, Tools, How it's judged) and "Read the full suggestion": they are the documents
  you read and edit, shown exactly as written.
- `scrollWidth` equals the viewport at 1920, 1440, 1024 and 390; no console errors; 0 external requests.
- Approve from the top band, Put it in my rules from the top band, Save + Undo on your rules, Esc / × / veil close,
  Read the history → History tab with focus on it; reduced motion: no animation.

## Data gaps found (for `data.mjs`, not done here)

1. `critic_series[].verdict` is null for Global Surf Lodge's round 1: the note's format "critic PASS 71.4/80" is not
   matched. The page reads it from the note.
2. The rest are as concepts.md §7: no `sent_back_to`; `proposals[].agent` is free text; no role per agent; no save
   endpoint.
3. **No plain summary per CHANGELOG entry**, so "Last changed" shows only the date with a link to the history.
4. **No structured send-back reason.** The plain reasons are counted from free-text notes by pattern
   (`plain.mjs`); a field like `reasons: {unsourced, contradicted, voice, duplicate}` on fail lines, and
   `cause: copy|build` on the critic's, would make them exact.

## Blocking

None. The agent's own files and the full suggestion text keep their file names on purpose (they are what you read
and edit); everything else is plain words.
