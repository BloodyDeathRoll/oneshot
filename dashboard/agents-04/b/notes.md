# Direction B "Board": notes

`index.html` is the deliverable: one self-contained file, Manrope embedded as base64, every agent's real
`base.md`, `custom.md`, `references.md`, `tools.md`, `evals.md` and parsed `CHANGELOG.md` embedded (all 16 agents),
plus the text of the 3 pending tweak proposals. Built by `node dashboard/agents-04/b/build.mjs` (run from the
worktree root, after `node dashboard/data.mjs`) from `template.html`. Nothing is saved anywhere: edits, saves,
approvals and rejections live in the page until reload.

## Data: how every number is computed (concepts.md §1)

All in `build.mjs`, from `dashboard/data.json` (generated 2026-10-05 20:28 UTC). The build prints the check line.
Since round 6 it applies the critic's attribution (see Round 6); before that every number matched concepts.md §1.4
(9/14, 11/22, 7/12, 3/7):

```
shortlist dropped by the harvester 5/10 (your own 4 drops not counted); since scout change 0/2
copy sent back 11/22, step-ins 6; since copywriter 3/6; since humanizer 11/19
mockups no pick 7/12; since creative director 3/4; since designer 0/0
builds sent back 1/5 (copy-caused, not counted: 2), step-ins 1; since designer 0/0
pending tweaks 3: designer, copyeditor, designer(rules)
```

- **Shortlist** (scout): every business with a `history` line `to: approved`; dropped = its last line goes from
  `approved`/`harvested` to `shortlisted`; "by you" = that line's agent is `human` (these squares carry the purple dot,
  as concepts §4 asks). Square order = approval time.
- **Copy review** (copywriter + humanizer, shared): copyeditor lines `to: copy_passed | copy_failed`. Step-ins = human
  lines `from: copy_failed`, attached to the latest copy verdict on the same business before them (6).
- **Mockup pick** (creative director + designer, shared): human lines `from: mocked`; `to: picked` = pick.
- **Critique** (designer): `critic_series` entries with `kind: round`. One round (Global Surf Lodge Kabalana,
  5 Oct) has an empty `verdict`; the orchestrator's next line on it goes to `passed`, so it counts as kept. That is
  how concepts §1.4 gets "0 of 1" for it. Step-ins = human lines `from: critiqued(n)` (3).
- **Since its last change**: the cut is the first ledger line by that agent at its current `version_changelog`;
  verdicts at or after it count.
- **States**: red ≥ half sent back, amber ≥ 1 in 5, green below, "too early" under 4 checked, "no signal" when no
  checkpoint judges the agent. Designer takes the worse of its two strips.
- **Ranking**: state, then share sent back, then step-ins. For the designer the share is all its checked work
  combined (10 of 19); that reproduces the order of concepts §4's table (Scout, Creative director, Designer,
  Copywriter, Humanizer). Ranking by its worse strip alone (7 of 12) would put it above the creative director.
- **Last changed** (since round 6): the newest CHANGELOG entry by date (the files are not in date order). Its
  first sentence is shown only if it passes the jargon guard in `build.mjs` (no file names, paths, version
  numbers, station codes, field names, code). Otherwise the page shows only "Last changed 28 Sep." and a "Read the
  history" link, which opens the rendered changelog. Today 3 of 16 lines pass: creative director, deployer (your
  quoted words) and writer.
- **Ledger notes shown to Shahar** (since round 6): they are no longer first-sentence cuts, which dropped the
  reason. Each verdict's words are derived from its note:
  - copy send-backs: the copyeditor's own counts, e.g. "5 claims with no source, 1 fact that contradicts the
    sources";
  - mockup decisions: your verbatim quote, or the pick;
  - builds: "kept, scored 92 of 100", "sent back for copy that had passed copy review", or the critic's image
    finding;
  - drops: the harvester's reason, sorted into four kinds.

  Every shown string also passes the jargon guard, which cuts it before the first file name or field.
- **Not used**: concepts §1.4 says some Ahangama 02 approvals "were random draws". Only 1 of the 14 approval lines
  says so (Briza Surf Kabalana), so the page does not repeat the claim; it says "All 5 were in Ahangama 02", which is
  computed.
- Copy reviews and critic reports (up to 184 KB each, 900 KB together) are not embedded. "Read the copy review" /
  "Read the critic's report" fetch them from the project folder when the page is served by `dashboard/server.mjs`
  (`/files/dashboard/agents-04/b/index.html`); opened from disk, the popup says the report opens when the dashboard
  is running.

## look-log

References used for comparison: **Models (R.)** `15-46-57` (the board: rows, status pills, monogram tiles),
**Logip** `15-38-48` (the stat strip with dividers), **Sypher** `15-36-13` (cells read as a pattern), and the
picked-quality Overview mockup C (`overview-03/c`) for the shared product language.

Shots (scratch, outside the repo): `…/scratchpad/agents-b/round-N/`, each round at 1440×1000 and 1024×800 full
page and 390×844, with the board, a square's tooltip, "Since each agent's last change", an agent open (copywriter,
designer), the editor on Claude's file, the "Suggest a change" popup, the tweak added, empty "Your rules", and
"Put it in my rules". `scrollWidth` = 1440 / 1024 / 390 in every round; no page errors.

**Round 1.** First build. What was concretely worse than the references:
- The "You stepped in" column header inherited the 22 px numeral style and broke into three huge lines.
- The 22-square copy strips wrapped one square onto a second line: tick margins pushed the strip to 338 px in a
  336 px column.
- Monograms collided: Copywriter and Copyeditor were both "CO"; Designer and Deployer both "DE". Models gives each
  row a distinct tile.
- "Shared verdict with …" wrapped to two lines in the 248 px agent column.
- In the legend, the five state pills stretched to the full column width and read as bars, not pills.
- In "Last changed", code spans fell back to the browser's monospace: terminal look.
- At 1024 and 390, "You stepped in –" was printed for the scout and the creative director, where step-ins are not
  counted.
- The sidebar footer wrapped to four lines.
- On the agent page, the mockup rows said "No pick" twice: once in the head, once in the quoted note.
- The edit footer was covered by the toast.

**Round 2.** All of round 1 fixed:
- Columns now 248/136/1fr/88/104/32. The tick takes no extra margin, so 22 squares fit.
- Header cell sized at 14/600.
- Fixed monogram map (CW, CE, DE, DP …).
- "Shared with Humanizer".
- Legend pills sized to their content.
- Global code-chip style.
- Step-in cell hidden where it does not apply.
- Toast lifted above the edit footer.

Compared again with Models:
- Five red monogram tiles beside five red pills, red squares and red fractions were too much red. Models keeps its
  tiles neutral and lets the status pill speak.
- The rows did not say *why* at a glance: the role line says what the agent does, not where its work bounced.
- At 390, a `:has()` rule for the 1024 band also moved the strip above the agent name.

**Round 3.**
- Monograms are neutral grey.
- Each row has a "why" line under its strip, computed from the data: "Judged after your shortlist: you dropped 4,
  the harvester 5", "Judged at copy review, by the copyeditor", "Judged at your mockup pick and by the critic".
- The `:has()` rule is scoped to 640–1279 px.
- Squares are centred on the row (the dot space sits in the wrap gap, not above).

Still worse:
- In the rail, the designer's "Builds." block ran straight on from the "Mockups" strip.
- "Last changed" lines still opened with jargon: "4g builds …", "Schemas/audit.md 0.1.2: …", "Rubric 0.3.1: …".
- The deployer's line read "— both an acceptance suite …", because a quoted opening was cut badly.
- The CHANGELOG's `tools.md x.y.z` entries were swallowed into the previous entry.

**Round 4.**
- The rail parts are split by a rule.
- In "Last changed", station codes and "file x.y.z:" prefixes are stripped, and a "—" left after a quote is dropped.
- `tools.md` entries are parsed as their own History entries, tagged "Tools · version 0.4.0".

Tested the interactions through the dashboard server:
- "Read the copy review" opens the real file.
- Esc and a veil click close the popup.
- Approve and Reject collapse the card, and the Decisions badge drops from 3 to 1.
- Saving the harvester's first rule shows it at once.
- Tabbing reaches the squares, with a ring and a tooltip.

Still worse:
- At 390, the sticky tab row slid under the 56 px top bar.
- In report tables, code chips broke mid-word ("unsource / d").
- "Run voided. Run voided by you" was doubled.
- A square's spoken label said "Dropped. Dropped by …".
- "Approved just now" did not say which tweak.
- At 390, the "Shares this verdict with Creative director" pill overflowed its fixed 36 px height.

**Round 5.** All of round 4 fixed:
- Tabs stick at 56 px on phones.
- Code chips break only between words.
- Duplicated prefixes removed.
- The approved line carries the tweak's title.
- The shared pill grows with its text.

The board's first screen at 1440×1000 now shows the summary, the toggle and all five red rows with their squares,
fractions, step-ins, the designer's tweak pill and the "why" lines. The worst agents and the reason are read before
any scroll. Side by side with Models, it is calmer: one red family, neutral tiles, a quiet legend, no zebra.

## Deviations from concepts.md, on purpose

- Under each strip there is one computed "why" line (round 2), so the reason is on the row and not only in a
  tooltip. Concepts §4 has only the role line there.
- Scout and creative-director rows show "–" for step-ins, as concepts §4's table does. The scout's purple dots mark
  businesses you dropped yourself, and the tooltip says so.
- The Undo after saving "Your rules" stays for 10 s, with the toast visible for that long. Concepts gives "a 4 s
  toast" and "Undo for 10 s".
- Sidebar: "Needs you" shows the 5 open items from `data.json` `gates`, which do not change in the page.
  "Decisions" shows the live count of tweaks waiting.
- The mode pill reads "Preview copy: changes stay on this page", the same words as the line under the editor.


**Round 6 (coordinator's revision after `dashboard/agents-04/critique.md`).** Shots at 1920×1080, 1440×1000,
1024×800 and 390×844 in `round-6/`. `scrollWidth` = 1920 / 1440 / 1024 / 390, no page errors.

1. **Full width.**
   - `main` has no max-width. The content is 1600 px at 1920.
   - At 1600 px and up, the board's agent column grows to 340 px, so roles show whole. The strip column is capped at
     560 px, with the fraction right beside it.
   - The no-signal grid fills the row (6 columns at 1920, 4 at 1440). The agent page's rail grows to 440 px.
2. **No file names or jargon.**
   - "Last changed" is plain words or the date only, plus "Read the history". The `audit.json` chip in the
     copyeditor header is gone.
   - Every tooltip, row note and quote is derived as described above.
   - Check: a Playwright grep of all rendered text, aria-labels, titles and every tooltip found nothing:
     16 agent pages × 3 tabs, the board in both modes, 4,845 text pieces. The agents' own documents are excluded
     (`#tabpanel .prose`, History, the editor, popups); file names there are the files themselves.
3. **Attribution, recomputed.**
   - **Scout:** your 4 own drops are not counted; they are drawn as hollow squares. The scout is now **5 of 10**
     (was 9 of 14). That is still exactly half, so it stays red, now for the harvester's drops only. Since its last
     change it is 0 of 2, "Too early".
   - **Designer builds:** the 2 KA rounds the critic itself put on the copy ("Hard fail from the passed copy, not the
     build", "Hard fail from unchanged copy …") are not counted; they are hollow. Builds are now **1 of 5** (was
     3 of 7), so builds are amber. Step-ins are now **1** (was 3); the page says "twice more on the rounds not
     counted".
   - The designer stays red because of its mockups (7 of 12, shared).
   - The critic's own card still says it sent builds back 3 of 7 times: those are its verdicts.
   - New ranking: Creative director, Copywriter, Humanizer, Scout, Designer.
   - Not changed: the voided Global Surf Adventures run still counts as a no pick. It was your verdict on those
     mockups, and the coordinator's list named only the scout and designer.
4. **A plain reason on each red row.** A red "Why it's red:" line replaces "Judged at …", computed from the
   verdicts shown, so it follows the toggle:
   - creative director: "7 of 12 mockup decisions ended without a pick. You said “no mockup looks good”";
   - copywriter and humanizer: "Mostly claims with no source: in 8 of the 11 send-backs";
   - scout: "The harvester dropped 5 of the 10 you kept, most often for no text written by the owner anywhere (2)".

   "In your words" uses only verbatim quotes from your ledger lines. The agent page's "How it's doing" gives the
   full breakdown.
5. **Not colour alone; one tab stop.**
   - Kept is a round dot, sent back is a square, not counted is a hollow square. The legend says so.
   - The squares in each row share one tab stop; arrow keys, Home and End move inside it and show the tooltip.
   - From the first board row to the first no-signal card now takes **11** Tab presses (was 101).

Still worse after round 6: the red reason lines make rows taller. At 1440×1000 four red rows and the start of the
fifth (the designer) are on the first screen; before, all five were. The reason is worth the scroll.

## After the pick (Shahar, 2026-10-06; `BRIEF-agents-04.md`, "Amendment — pick")

Shots at 1920×1080, 1440×1000, 1024×800 and 390×844 in `round-7/` and `round-8/`: the board, the simple page for
copywriter, designer and harvester, the fix popup, advanced copywriter, the advanced edit popup, and "Put it in my
rules". `scrollWidth` = viewport at every width; no page errors.

**What changed**

- **Board.**
  - Each row has four things: name with a one-line role, state, the checked-work marks, and the sent-back fraction.
  - Removed: the "Why it's red" line, the initials tiles, "Shared with …" (agents judged together simply show the
    same marks), and the "You stepped in" and "Tweaks" columns.
  - States are a light tint with coloured text: red `#FDECEE` with `#C0182B` (5.4:1), amber, green. Fractions are
    ink, not red. The only red left is the marks, the state text and the summary's "5".
  - The legend is one line of mark shapes; the state rules sit under a closed "How the state is decided".
  - The no-signal cards lost their tiles too.
- **Agent page, Simple (the default, `#agents/<name>`).**
  - **What it does:** two plain sentences per agent, restated from PLAN.md §5 (in `build.mjs`, `DOES`).
  - **What is wrong:** one or two sentences, computed from the same counts as the board. Examples:
    - copywriter: "Copy review sent the copy back 11 of 22 times, mostly for claims with no source (in 8 of the 11).
      Since its last change on 28 Sep: 3 of 6.";
    - harvester: "Nothing checks its work yet.";
    - copyeditor: "Nothing checks its work yet. But the critic sent 2 builds of KA Surf Hostel back (22 Sep) for
      copy the copyeditor had passed: “Hard fail from the passed copy, not the build”."
  - **One action, "Get Claude's suggested fix".** It opens a popup with a ready prompt and **Copy prompt**. It shows
    only where the data says something is wrong: the 5 red agents and the copyeditor. Elsewhere one line says
    "Nothing to fix from the data …".
  - **What the prompt contains,** all built from the data, never a fix:
    - the agent and what is wrong, with counts, kinds of send-back, and the since-last-change count;
    - what is not counted;
    - the 3 most recent examples, with business, run and date;
    - any tweak already waiting, so the session doesn't duplicate it;
    - which file to change (`agents/<name>/base.md`, and `custom.md` as read-only);
    - "Propose a change … and save it as a suggested tweak under proposals/ … Do not apply the change".
  - The prompt is the one place a file name appears outside the agents' own files: it is written for Claude, and
    the coordinator asked for the file in it.
  - **Pending tweaks** are one small line each, under "Waiting for your answer", with Approve / Reject / Read it.
    The rules tweak has "Put it in my rules", which opens Advanced with the editor filled in.
  - The simple page has no history and no send-back list. **All 16 simple pages fit one screen at 1440×1000**
    (`scrollHeight` = 1000 for each). They also fit at 1920. At 1024 the designer runs slightly over (two tweak
    lines). On a phone the page scrolls.
- **Advanced** (a Simple | Advanced switch in the header, `#agents/<name>/advanced`). Holds everything from before:
  - the full record and every send-back, "Where it was sent back", and "Waiting for you" with full tweak cards;
  - the History tab and the agent's files;
  - the two editors. The tabs say who writes what: **"Claude's instructions"** (*an edit becomes a suggested tweak*)
    and **"Your rules"** (*you write these; saves directly*).
  - "Suggest a change", which Shahar found unclear, is now **"Edit as a suggested tweak"**. Its review popup is
    "Your edit to the <agent>'s instructions".
- **Fixed on the way:**
  - A popup now closes when the page navigates (Back, or a deep link).
  - The programmatic focus on the page heading no longer draws a ring.
  - The critic's quote on the copyeditor is verbatim again ("never re-audited").

**Look rounds**

- **Round 7:**
  - The board fits all five rows on the first screen at 1440 again, and the red is down to the marks.
  - On the simple page, the role line under the name repeated "What it does".
  - The heading showed a focus ring after load.
  - The tabs said who writes what only after you clicked them.
  - At 1024 the designer page ran over by its two tweak lines.
- **Round 8:**
  - The role line shows on the Advanced page only.
  - The focus ring on load is gone.
  - Each tab carries its own small "who writes it" line.
  - The note under the action is shorter.
  - The 1024 overflow remains for the designer only, because it has two tweaks, and is accepted: the brief's
    one-screen target is 1440.

**Checks, round 8**

- **Jargon grep (Playwright):** 5,677 text pieces checked, with no file names or jargon outside the agents' own
  files. It covered the board in both modes, every tooltip, and all 16 agents in Simple and Advanced with their
  tabs.
- **Keyboard:** 11 Tab presses from the first board row to the first no-signal card.
- **Copy prompt:** the clipboard holds the prompt.

## Blocking

None.

**Trimmed 2026-10-06 (PR #11 review):** after the pick was built into the live dashboard (`dashboard/mockups/soft-cards/src/`), only this mockup's built `index.html` and these notes are kept; `template.html`, `build.mjs`, the other variants and the comparison pages are in git history (commit 8d03802 and earlier).
