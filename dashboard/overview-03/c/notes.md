# Direction C "Cockpit": notes

Files: `index.html` is the deliverable (one self-contained file, 118 KB, Manrope embedded as base64). It is built by
`node dashboard/overview-03/c/build.mjs` from `template.html`, `dashboard/data.json` and the real drafts in
`sites/<slug>/pitch/`. Thumbnails are referenced from `../../mockups/soft-cards/dist/img/` and are not copied.

## Assumptions (decided, not asked)

- **Saving in the mockup.** Concept §1.3 says Save is disabled in a static mockup. The task asked for popups that
  work, so Save, Hand off and the outcome choices do change the page in place: the status pill, the chain, the
  Shahar | Alon card and the Handoffs section update, and a toast says "Nothing was sent". Nothing is posted
  anywhere. To keep this honest, the header pill says "Mockup: what you record stays on this page" instead of the
  concept's "Live · your changes are saved".
- **Sender notes.** The message text is read from disk unchanged (the fenced part, the part between `---` rules, or
  the whole file). The notes under "Before you send" are re-worded in plain words from the same file, without file
  names, "gate (c)", "mode: test" or character counts. In the in-person scripts, the file title and the sentences
  "Run is `mode: test` …" and "Sources: `notes.md`" are removed; everything else is shown as written.
- **Chain counts** use the same rules as the current dashboard's tiles (`renderTiles()`), computed at build time.
- **Zero chain nodes** have grey outlines (the 23andMe reference: unreached = grey). The concept also mentions
  `#C3ACF3` for outlines; I used that tint for the connector that leaves a filled node instead.
- **Sidebar links** go to the current dashboard's views (`../../mockups/soft-cards/dist/index.html#pipeline` and so
  on), as does the "3 suggested agent tweaks" row (`#decisions`). The Decisions badge "3" is the number of tweaks in
  `gates[].target.proposals`.
- **"Updated 22:59"** in the sidebar is `data.json`'s `generated_at`, shown in the viewer's local time.

## Look-log

References used side by side: NexaFlow (`15-41-49`, solid purple money card), Ancestry Compare (`15-40-32`, two
people side by side), Models (`15-46-57`, list rows with a pill and a value), 23andMe (`09-25 15-38-36`, the drawn
chain), FinGuard (`15-43-09`, labelled pills under a sentence).

### Round 1

Shots: `round-1/` (1440 full + fold, 1024 full, 390 full, 390 sheet, popups: WhatsApp, copied, in-person, Update
status, Hand off done, email, and the page after a save). Popups close on Esc, ×, veil click; focus returns to the
opener; no horizontal scroll at 1440 / 1024 / 390; no console errors.

What is worse than the references, concretely:
1. **Sidebar** stops at the viewport height in a full-page view (white column ends at y=1000, ground below), and
   after scrolling it floats mid-page; Nexus / Shopeers have a full-height white column.
2. **Broken discs**: the 40 px disc in the sidebar footer and in the 1024 team row renders with its "S" pushed to the
   top-left, because a `span{display:block}` rule hits the disc itself.
3. **1024 team card** says "Shahar and Alon" twice (heading and row title): 22 px of wasted height and a stutter.
4. **List rows** truncate the quality: at 1024 (300 px list) every row ends "Quality" with the number cut off, and at
   1440 the same happens after a save ("Pitched 5 Oct by WhatsApp · Quality" cut). Models never truncates the value.
5. **Team card at 1440**: "No runs yet" wraps to two lines in its 76 px column and sits off-centre against the
   three rows.
6. **Money block** is 360 px tall at 1440; the Expenses hint wraps to 4 lines in its 40 % column while Revenues'
   wraps to 2. NexaFlow's card is calmer because its columns are even.
7. **Long popups** (in-person script, email): the copy button scrolls out of view with the text.
8. **Global Surf email** has "[LINK TO THE PROPOSAL PAGE]" in the text, and the only warning is in a collapsed
   "Before you send". It should be visible without clicking.
9. **390**: the top bar says "Overview" and the H1 below says "Overview" again, 60 px of repeat.

Changes for round 2: full-height sidebar column; fix the disc selectors; one title in the 1024 team row; list rows
let the name wrap and run the second line under the age column, list 340 px at 1024; 88 px compare columns; money
columns 1.3 : 1; sticky copy bar in the message box; the email's placeholder note shown open; H1 visually hidden on
phones (kept for screen readers).

### Round 2

Shots: `round-2/`. Visible changes: full-height white sidebar column; sidebar and team-row discs render correctly;
list rows let names wrap and run "Ready to send · Quality 86" under the age (no truncation at 1440 or 1024); list
340 px at 1024; "No runs yet" on one line; the email popup opens with a tinted "Before you send" box above the text
naming the placeholder; the copy bar stays visible while a long script scrolls; phone H1 hidden visually.

What is still worse, concretely:
1. **1440: every action is below the fold.** The 640×400 preview sits first in the panel, so "Update status" is at
   y≈1350 on a 1000 px screen. Logip and Models put the thing you act on in the first screen. This is the biggest flaw.
2. **1024 team row**: Shahar's line wraps "1 / active run" over two lines because a title column takes ~160 px.
3. **1024 draft pills** stack one per line (214 + 254 + 10 px gap > 476 px).
4. **390 team card** lost its heading (the 1024 rule hiding it also applied on phones).
5. **390 chain** is 345 px tall for five pills, more than the money block's second half.
6. **1440 team header** is uneven: "you" under Shahar adds a line Alon does not have.
7. A toast that is showing when a popup opens sits under the white veil, half-readable.

Changes for round 3: in the panel, name, status and facts come first, then the three action lines, then the large
preview (a deliberate change from the concept's order; see Deviations); 1024 team row without its title column;
tighter draft pills at 1024; phone team heading restored; phone chain pills 44 px with 10 px joints; "(you)" kept for
screen readers only (the filled disc already says it); the toast hides when a popup opens.

### Round 3

Shots: `round-3/`. At 1440×1000 the whole working set is now on the first screen: money, chain, the list, the
selected site's name, status, facts and all three action lines, with the preview starting at y≈965. At 1024 the team
card is one clean row, and the two draft pills sit on one line.

What is still worse:
1. **After a save the list row breaks**: "Pitched 5 Oct by WhatsApp · Quality 86" wraps into three lines with the
   status dot alone on the first, because the line is a wrapping flex row.
2. **Pitched rows still show "10 days"**, which is the age of a ready pitch and is wrong once sent.
3. **The list heading** says "Ready to pitch 4" while one of the four is already pitched.
4. **Phone sheet**: "Then record it" is followed only by Hand off, because Update status moved to the pinned bar.
   The label lies.
5. **Phone list rows** have no sign they open something (the chevron rule was overridden by a later rule).

Changes for round 4: the second line is plain inline text with an inline dot; the age shows only while a site is
ready; heading "Sites to pitch"; the "Then record it" label is hidden in the phone sheet; a chevron per row on phones.

### Round 4

Shots: `round-4/`. After saving KA as pitched, its row reads "● Pitched 5 Oct by WhatsApp · Quality 86" on one
line with no age; the chain shows Ready 3 → Pitched 1 (both filled); Shahar | Alon shows 3 | 0 ready and Alon 1
handoff (the "No runs yet" cell turns into numbers once Alon has something). Phone rows have chevrons.

What is still worse:
1. **Phone list**: "Quality 91.5" breaks between "Quality" and "91.5" in the Layday row.
2. **Long popups**: the sticky copy bar sticks 20 px below the top edge of the scroll area, so script text shows
   above it while scrolling (seen when scrolling the in-person script).

Changes for round 5: "Quality n" never breaks; the copy bar sticks flush to the top of the scroll area.

### Round 5

Shots: `round-5/` (plus `1440-pop-inperson-scrolled.png`, `390-list-crop.png`, `1440-focus.png`). The copy bar
now covers the top edge while the script scrolls; "Quality 91.5" moves to its own line as one unit. Checks:
- no horizontal scroll at 1440, 1024 and 390 (`scrollWidth` = width); no console errors;
- popups close on ×, Esc and a click on the veil; focus returns to the button that opened them;
- list: Arrow keys move the selection, Enter moves focus to the site's name in the panel; focus ring is a 2 px
  `#6A2FE0` outline, visible on every control (white on the purple block);
- Global Surf's Pitch is `aria-disabled` with the tooltip "The pitch page for Global Surf Lodge Kabalana is written
  but not online yet."; the panel also says "Pitch page not online yet";
- no `fetch`, no form posts: every form calls `preventDefault()` and changes only the page;
- reduced motion: no popup or sheet animation, no transitions.

Contrast (computed): white on `#6A2FE0` 6.8:1; `#E1D5F9` hint text on `#6A2FE0` 4.9:1; `#1F4BFF` links on white
6.0:1; `#6B7280` on white 4.8:1. `#6B7280` on the ground `#F5F7FB` is 4.5:1 at best, so no ink3 text sits on the
ground or on the selected-row tint (those use `#4B5563`).

## Deviations from concepts.md (C), with reasons

- **Panel order**: name, status and actions first, the 640 px preview under them (concept: preview first). With the
  preview first, Update status sat at y≈1350 at 1440×1000, below the fold. The preview is still 640×400 and still a
  Preview website link.
- **Save works in the page** instead of being disabled (see Assumptions).
- **List heading** "Sites to pitch" instead of "Ready to pitch", because a pitched site stays in the list with its
  new status.
- **Message popups** carry a small header bar inside the text box ("Message" / "Email" / "What to say") that holds
  the copy button, so the button never covers text and stays visible while a long script scrolls. The email's
  subject has its own copy button.
- **In-person footer** says "Been there? Update status to record it." instead of "Sent it?".

## Blocking

None for the mockup itself. Not done, by design, and for whoever builds the picked direction:
- A toast fired just before opening another popup is hidden while the popup is open (it no longer shows half-veiled).
- The sidebar links and the "3 suggested agent tweaks" row open the current dashboard
  (`dashboard/mockups/soft-cards/dist/index.html`), since this mockup has only the Overview.
- The handoff prompt (copy box only) names files and a command; that is intended for Claude (concept §1.4).
