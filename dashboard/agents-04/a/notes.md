# Agents, direction A "Line": designer notes

Run `dashboard-04`, 2026-10-05. Build: `node dashboard/data.mjs && node dashboard/agents-04/a/build.mjs`
(writes `index.html` from `template.html`; one self-contained file, about 400 KB, Manrope embedded as base64).
Round 4 (2026-10-06) answers `dashboard/agents-04/critique.md`; see "Round 4" at the end, which supersedes the
numbers table and deviations below where they differ.

## What is in the page

- The map: five lanes (Find, Words, Look, Check, Ship), the orchestrator as the frame pill on top, 16 agents
  as pills, your three decisions as purple diamonds, and four send-back arcs with their chips. Red nodes are
  the five "Needs fixing" agents; the other eleven are grey "No signal" outlines.
- Under it: "Waiting for you" (the three pending tweaks, Approve / Reject / Put it in my rules) and "Where work was sent back" (every business behind each arc, in arc order, with each
  check marked and Open in Pipeline).
- The agent sheet (720 px, right, white 80 % veil, `#agents/<name>`): header, last change, How it's doing,
  Waiting for you, Where it was sent back, then the tabs What it does / Your rules / History / More
  (References, Tools, How it's judged), all rendered from the real files.
- Editing is in-page only. "Your rules" saves at once (toast with Undo); a change to "What it does" goes
  through "Review my suggestion" → popup "Suggest a change to the designer" (line diff, optional Why) →
  "Add to suggested tweaks", which puts it on top of Waiting for you with Approve / Reject. Unsaved Cancel
  asks "Discard your changes?". Changed lines are highlighted live in the editor.

## Numbers: where each one comes from (all computed in `build.mjs`, all runs)

| Shown | Computed from `dashboard/data.json` |
|---|---|
| Dropped 9 of 14 after you approved (4 by you, 5 by the harvester) | businesses with a history line `to: approved`; dropped = last line goes from `approved`/`harvested` back to `shortlisted`; who = that line's `agent` |
| Sent back 11 of 22, you stepped in 6 | copyeditor lines `to: copy_passed / copy_failed` (cross-checked against `copy_rounds` / `copy_fails` per business; the build stops on a mismatch); human lines `from: copy_failed` |
| No pick 7 of 12, 5 picks | human lines `from: mocked`; `to: picked` is a pick |
| Sent back 3 of 7, you stepped in 3, 2 on copy facts | `critic_series` rounds; human lines `from: critiqued(n)`; critic FAIL notes reading "Hard fail from the passed / unchanged copy" |
| Since its last change | verdicts after the first ledger line written by the agent's current version (`history[].v` = `version_changelog`); the label shows the CHANGELOG date. Copywriter 3 of 6, humanizer 11 of 19, creative director 3 of 4, scout 0 of 2, designer not judged since 5 Oct |
| States | worst over the checkpoints an agent makes work for; < 4 checks = too early; ≥ ½ red; ≥ 1/5 amber; else green. Checkers and everyone else: no signal |
| Arc width | 2 + sent back ÷ 2, capped at 8 |
| Header sentence | the two red checkpoints with the highest share, then the count of no-signal agents |
| "It has worked on N businesses" | distinct businesses with any ledger line by that agent |

The data was regenerated at 20:28 UTC; every number matches concepts.md §1.4 except the harvester line
(concepts: "15 harvests of 12 businesses"; the page says "worked on 14 businesses", i.e. businesses it has any
line on, including the ones it withdrew).

## look-log

References used: 23andMe relationship tree (`…09-25 15-38-36`: filled pills where there is something to see,
grey outlines elsewhere, joined by thin lines), NexaFlow (`…09-27 15-41-49`: the small approvals card), Models R.
(`…09-27 15-46-57`: status words beside colour, calm rows), and the picked Overview C for the shell.

**Round 1** (1440 / 1024 / 390, page, tooltip, designer sheet, editor, review popup, copyeditor rules and history).
Worse than the references: (1) the send-back arcs did not show at all in the first-screen shot, so the one thing
the direction is about was missing; (2) the lane-to-lane wrap lines ran right, down and all the way back left,
which drew big grey brackets round every lane: 23andMe's connectors are short and quiet, mine were the loudest
grey on the card; (3) "No pick 7 of 12" sat on top of "one shared verdict"; (4) the "builds your pick" arrow had no
label and its arrowhead collided with the critic's arc; (5) the map ran below the 1000 px fold (Ship cut off);
(6) at 1024 "Copyeditor ✓ checks the copy" broke into three lines; (7) "Where work was sent back" was a 9-row wall
before the copy group even started, three times taller than the tweaks card; (8) 390 overflowed by 3 px (a
"No pick 1 of 1 · run voided" label). Changed: wraps became a short right-edge elbow with a down arrow; bracket
labels left-aligned under the pair; "builds your pick" labelled and rerouted to the designer's right edge; lane
gap and header tightened; 1024 drops the wrap column and narrows node padding; groups show 3 rows plus "Show the
other N"; the label row wraps on phones.

**Round 2.** The arcs still looked missing. Cause found by inspecting the live SVG: the arcs were there but the
full-page shot resized the viewport, the map re-rendered and the draw-in animation restarted, and the chips sat
on the arc crowns and hid what was drawn. Fixed: the arcs draw in once only, and the chip sits on the crown of a
taller arch (lift 0.7 of the lane gap), so both legs show. Interaction run (`flow` script): Approve, Put it in my
rules → Save → Undo, Write your first rule → Cancel → Discard popup, Esc, veil click, More menu, report popup,
Suggest a change → Add to suggested tweaks. Two real bugs found: the Undo button in the toast could not be
clicked while the sheet was open (the modal sheet made the page behind it inert), and re-rendering the sheet
deleted the toast. Fixed: the toast moves into the top-most open dialog and is held by reference. Also: "Read the
critic's report" opened KA's file at the *mockup pre-score*, which is not what the row is about; it now opens at
"full · round 1". Tweak cards in the sheet got a soft ground panel so the three are separable; "Waiting for you"
sticks while the long right column scrolls.

**Round 3.** Map at 1440 is whole on the first screen (orchestrator to Ship) with five red pills and three
thick red arcs plus one amber arc, against eleven quiet outlines: comparable to 23andMe's "filled vs outline"
read, and the eye lands on the Words/Look red block first. Remaining flaws fixed this round: the toast covered the
editor's Cancel / Save hint (now shown under the sheet bar while editing); phone "How it's doing" tiles left one
orphan tile (now full-width rows, number left); reading column sat tight under the tab line (16 px more space).
Checked again at 1440 / 1024 / 390: no page errors, `scrollWidth` 1440 / 1024 / 390.

Where it is still weaker than the references (not blocking): 23andMe's map has more air between rows; mine is
denser because the whole line has to fit the first screen. The "No pick 7 of 12" chip sits closer to the Words
lane than to the Look lane it belongs to; the arc makes the link, the position alone does not.

## Deviations from concepts.md, on purpose

- Diamond labels sit to the right of the diamond, not under it.
- Lane wraps are removed (round 4); "builds your pick" is the words "then builds it" (round 4).
- No reader for copy reviews, critic reports or proposal files (round 4: written for Claude; plain words cannot be derived).
- The Save toast stays 10 s, not 4 s, because its Undo is good for 10 s.

## Data gaps (raised, not fixed; nothing outside this folder was changed)

1. The Global Surf Lodge critique round of 5 Oct has `verdict: null` in `critic_series`; the build reads PASS from
   the critic's own note ("critic PASS 71.4/80") and the orchestrator's `passed` line. `data.mjs` should parse it.
2. The "last sent back" sentences are the copyeditor's and critic's ledger notes, lightly tidied (file names and
   station codes removed). They are still technical ("Round 7, full-file re-check …"); a plain one-line field per
   fail would read better. Same for "Last changed": CHANGELOG lines are written for Claude.
3. Plus concepts.md §7 items 1, 3–11, unchanged.

## Round 4: after the critique (2026-10-06)

Shots: 1920×1080, 1440×1000, 1024×800 full page, 390×844, agent opened, popup shown
(`scratchpad/agents-a/round-4/`). No page errors; `scrollWidth` 1920 / 1440 / 1024 / 390.

**1. Full width.** `main` has no max-width any more. At ≥1680 px the map and "Waiting for you" sit side by
side (map | 440 px rail), so the first Approve is on the first screen at 1920; "Where work was sent back" runs
full width below it in two columns. 1280–1679: map full width, the two cards under it. Below 1280: one column.

**2. No file names or jargon outside the agents' own files.**
- "Last changed" no longer prints the CHANGELOG line: the sheet shows "Changed 5 Oct · version 0.4.3 · Read the
  history", and the link opens the History tab (the rendered CHANGELOG).
- Send-back notes are derived, not copied. For copy review, the page counts the categories the copyeditor's
  note itself counts (unsourced, contradicted, voice, duplication), names them in plain words ("claims with no
  source in the facts", "claims the facts contradict", "wording that does not read naturally", "the same fact
  said twice"), and quotes the site copy verbatim. For drops, a matched phrase table turns the harvester's and
  your notes into plain reasons ("no text written by the owner anywhere"). For your mockup decisions, it quotes
  your own words. For critique, "copy that had passed copy review", or the photo case read from the note.
- Removed: "Read the copy review", "Read the critic's report" and "Read the full suggestion". Those files are
  written for Claude, and plain words for them cannot be derived honestly. The tweak cards keep their plain
  "What changes" and "Why".
- `build.mjs` refuses to write the page if any derived sentence matches a file-name / field-path / code pattern.
  A Playwright pass (`scratchpad/grep.mjs`) renders the page, every tooltip, all 16 agent panels (everything
  except the agent's own file), the editor chrome and every popup at 1920 and 390: 149 surfaces, about 93 000
  characters, **0 hits**. The same pass with the agent's own file included does find file names, which shows
  that the check works.
- What stays: the agent's own files (What it does, Your rules, History, More, and the editor) are shown as
  written, because they are the definition Shahar reads and edits. The critique's hard-fail rule exempts
  them, and the "Read the history" link points at one of them.

**3. Attribution: what changed.**

| | Before | Now | Why |
|---|---|---|---|
| Shortlist (scout) | dropped 9 of 14, red; arc from the harvester carried all 9 | **dropped 5 of 10, still red** (exactly half); the arc carries only the harvester's 5; your 4 drops are listed apart, "not counted against the scout" | you dropped 4 yourself; those leave both the count and the base |
| Critique (designer's builds) | sent back 3 of 7, amber | **sent back 3 of 7, of which 2 for copy facts and 1 for the build → 1 of 7, "Doing fine"**; the arc and chip are drawn grey | the critic's notes say "Hard fail from the passed / unchanged copy" for both KA fails |
| Designer | red (mockups) + amber (builds) | **red** (mockups 7 of 12) + builds fine | builds re-attributed |
| Copywriter, humanizer, copyeditor | – | unchanged counts; their panels now say the critic later sent a built site back twice over copy that had passed review | where those 2 fails really belong |
| Mockup pick | no pick 7 of 12 | unchanged, now split as "3 rejected outright, 4 more rounds before a pick" | see "Open question" |

Still red: Scout, Copywriter, Humanizer, Creative director, Designer (5). Doing fine: 0 agents (the designer's
builds are fine, but its mockups decide its state).

**4. One plain reason per red agent on the first screen.** Each arc chip now has two lines, the count and the
reason, and the arc forks onto the agents it judges:
- Scout: "Dropped 5 of 10 · 3 had no owner text or prices".
- Copywriter + Humanizer: "Sent back 11 of 22 · 8 of the 11 for claims with no source in the facts".
- Creative director + Designer: "No pick 7 of 12 · 3 rejected outright, 4 more rounds before a pick".

The same sentence opens each red agent's panel, in 17 px, under the state pill. On the phone it sits under
the checker's row.

**5. Kept vs sent back by shape, not only by colour.**
- Every business row now draws each check in order. Kept is a green circle with a tick. Sent back is a red
  square with a cross. Sent back for copy, not the build, is an outlined red square with a cross.
- The legend explains the three marks. Each mark has a title, and each row's strip has an aria-label
  ("kept, sent back, …").

**Also from the critique:**
- The map is decluttered: the four grey lane-to-lane elbows are gone, the red "one shared verdict" brackets
  are gone (the fork shows the sharing, and the legend says so), and the "builds your pick" loop is replaced
  by the words "then builds it" under Your pick, so nothing crosses the critic's arc.
- In the agent panel, "Where it was sent back" folds into a closed disclosure inside "How it's doing", so the
  tabs come sooner.
- The file is 402 KB (was 956 KB), because the reports and proposal files are no longer embedded.

**Compared again with the references:**
- 23andMe (`…09-25 15-38-36`): the map is now as quiet as their connector bars. The red sits only on five
  pills and three arcs; the grey arc and chip read as "fine".
- NexaFlow's approvals card (`…09-27 15-41-49`): at 1920 the tweak rail sits beside the map, the way their
  card sits beside the charts.
- Still worse than both: at 1440 the chips sit close under the lane above, about 20 px apart. The map has to
  fit the 1000 px first screen, so the lane gap cannot grow.

**Open question for Shahar (not changed, nothing invented):**
- 4 of the 7 "no pick" decisions were not rejections. In two of them you asked for more rounds ("I asked for
  3 mockups", a fix round), one was a re-concept, and one approved the level with no pick yet.
- Counting only outright rejections would make your mockup pick 3 of 12. That is amber: the creative director
  would turn amber, and the designer amber or fine.
- The concept counts every round without a pick. Both numbers are on the page.

## Blocking

None.
