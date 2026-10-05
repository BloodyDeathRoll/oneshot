# Overview, direction A "Today": notes

Built from `dashboard/overview-03/concepts.md` §1 and §2. The file is `index.html`, written by
`node dashboard/overview-03/a/build.mjs` (run `node dashboard/data.mjs` first) from `template.html`.
The build embeds the Overview's fields from `data.json`, the real drafts from `sites/<slug>/pitch/`, and
Manrope as base64. Thumbnails are referenced at `../../mockups/soft-cards/dist/img/<slug>.jpg`. Nothing was copied.

## Data, as embedded

- Revenues and expenses are $0 with no entries.
- The counts use the current dashboard's rules: being built 0, ready to send 4, pitched 0, replies 0, clients 0.
- The four sites are ordered by `gates[].since`, so the ages are live: KA 10 days, Layday 10, Lavish 7, Global Surf today.
- Quality comes from `critic_score` and shows only where it exists, so not for Global Surf.
- Global Surf's Pitch is shown as not online, as the brief says. The other three link to `pitch.proposal_url`.
- The drafts shown are only the ones that exist:
  - Global Surf: email (subject split out, `[LINK TO THE PROPOSAL PAGE]` flagged) and WhatsApp.
  - The other three: WhatsApp and the in-person script.
- How the message is found in each draft:
  - It is the ```text fence when there is one (Lavish).
  - For KA's WhatsApp it is the `---` block.
  - Otherwise it is the whole file.
- Sender notes go under "Before you send". Sentences that name files, test mode, gates or lengths are dropped. The recipient number becomes a "To" line.
- The Decisions badge shows 3: the number of tweaks in `gates[].target.proposals`, not the gate count.

## look-log

Shots: `scratchpad/design-a/round-N/` at 1440×1000 and 1024×800 (full page) and 390×844. Every round opened
popups (WhatsApp, Copied state, email, in-person, Update status, saved state, Hand off and its prompt). References
looked at alongside them: Logip `15-38-48` (greeting and stat strip), Shopeers `15-38-04` (cards), FinGuard `15-43-09`
(sentence and action pills), Mondly `15-36-41` (numeral with a label, one strong button per card).

**Round 1.** What was worse than the references:

1. **Wasted space in each step card.** The 288×180 thumbnail sat beside a body about 250 px tall, leaving about 90 px of
   empty white under every picture. Logip's rows and Shopeers' cards have no dead blocks like that.
2. **The labels floated.** The action lines started 140 px right of the thumbnail edge, so the right-aligned labels
   floated.
3. **1024 broke the card.** The lines dropped under the thumbnail with a 45 px gap, and the meta line wrapped with an
   orphan "·" before "Quality".
4. **The sidebar stopped at 1000 px** on the full page, with bare ground below it.
5. **The Decisions badge said "1"** (the gate count) where there are 3 tweaks. That is a wrong number.
6. **The money icons read as download and upload,** not money in and money out.
7. **The toast lowercased "WhatsApp"** ("5 oct by whatsapp").
8. **The email's "gap to fill" warning** sat under a long scrolling message, out of sight.
9. **The Hand off result had two copy controls,** an icon and "Copy prompt".
10. **The phone mode chip** wrapped into a two-line pill.

**Round 2.** Changes:

- The step card is restructured. The name, meta and status run across the top over a hairline. Below it, the 288×180
  thumbnail sits beside the three action lines, which are 48 px rows with 18 px gaps, exactly 180 px, so the picture
  and the actions end on one line.
- The sidebar column is painted full height.
- The badge is 3.
- The icons are a banknote and a receipt.
- The toast keeps its case.
- The warning moved above the email.
- There is one "Copy prompt" primary.
- The phone chip reads "Preview copy".
- The Pitch link gap went from 30 to 22 px.

Still worse:

- **The pitched group broke the page.** After "Save as pitched", its chevron rendered at about 600 px because the size
  sat on a wrapper, not the svg. The page went 1532 px wide and its heading wrapped one word per line.
- **The decisions card inherited the step grid areas** and grew an empty row.
- **At 1024 the suggested pills wrapped to two lines,** making the action column about 200 px against a 150 px
  thumbnail.
- **On the phone,** the Update status popup's footer buttons sat 8 px left of the form edge.

**Round 3.** Changes:

- The chevron is sized on the svg. After saving, the page stays 1440 wide and "Pitched, waiting for a reply (1)" reads
  as a proper section.
- The decisions card has its areas reset.
- Popup footers use one class, with a gutter per breakpoint.
- At 1024 the thumbnail stretched to the lines' height.

Still worse:

- **The stretched thumbnail cropped the site's own headline** ("ve minutes om Kabalana"), which makes the preview
  useless.
- **The pills still wrapped,** because the measured widths were 213 + 252 px against a 451 px column.

**Round 4.** Changes at 1024:

- The thumbnail keeps 16:10 at 208 px and is centred against the lines.
- The label column went from 120 to 112 px, the card padding from 28 to 24, and the chip padding is 2 px tighter.

Every row now fits on one line at 1024, and Hand off aligns right. The keyboard focus ring was shot on "Suggested
WhatsApp": a 2.5 px purple ring, visible.

Still worse, on the phone:

- **Update status was content-width,** not the full-width 48 px button the concept asks for.
- **The meta line ended a wrapped row** with an orphan "·".

**Round 5.** Changes on the phone:

- Update status fills the card width at 48 px, with Hand off centred under it.
- The meta separators are hidden at 640 px and below, so wrapped rows never end in a dot.

Checks, all passing:

- `scrollWidth` equals the viewport width at all three sizes.
- No page errors.
- A veil click, Esc and × each close the popup.

## Checks

- **Contrast:**
  - ink3 `#6B7280` on white: 4.83.
  - ink3 on the ground colour: 4.51. It is used only for labels on white cards.
  - Purple on `#F3EEFD`: 5.96. Blue links: 5.99.
  - Red on red-bg: 5.36. Green on green-bg: 4.63. White on purple: 6.78.
- **Nothing posts:** the file contains no `fetch`, XHR, beacon or form `action`.
- **File names:** they appear only inside the hand-off prompt's copy box, which is meant for Claude (concepts §1.4).
- **Reduced motion:** turns off the popup animation, the chevron turn, the toast slide and smooth scrolling.

## conflicts

- **Saving is a mock that records.** Concepts §1.3 says that in the static mockup Save is disabled ("Saving works when
  the dashboard server is running"). The task asked for a form mock that records, so Save works in memory instead:
  - The status updates in place.
  - The site moves to "Pitched, waiting for a reply".
  - The counts and the summary sentence change, and a toast says what changed.

  The mode line says so plainly: "Preview copy · what you record stays until you reload". Hand off works the same way:
  the task appears under "Waiting on Alon" with Copy prompt.
- **The thumbnail sits under the name row, not beside it** (§2's sketch puts it beside the name). This change is what
  lets the 180 px picture and the three 48 px action rows end on the same line; the sketch's version left 90 px of dead
  space per card.
- **"Review them" and the sidebar views** open a toast saying the view is not part of this mockup, because only the
  Overview is built.

## Blocking

None. Known and not fixed:

1. **The toast covers buttons for 4 s.** It sits at the bottom centre and can cover the lower part of a card, including
   an Update status button, until it fades.
2. **A full-page shot taken after scrolling** draws the sticky sidebar mid-page. That is how Playwright stitches the
   shot; in a browser the sidebar stays put.
