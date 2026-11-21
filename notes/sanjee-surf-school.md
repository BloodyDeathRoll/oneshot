# sanjee-surf-school

Operator: alon. Run: `2026-10-midigama-01` (`mode: test`, no owner contact). Branch: `alon/sanjee-surf-school`, worktree `.superset/worktrees/oneshot/sanjee-surf-school`. PR #68 (`alon/seo-cheeky-monkey`, which this branch carried) is merged; main merged in on 2026-11-22 and the branch is open as its own PR.

## Where it stands

State `packaged`, waiting at **gate c (send pitch)**. Next line is a human `packaged -> pitched`. Nothing has been sent to the business.

- Preview: https://sanjee-surf-school.os1.workers.dev (noindex)
- Proposal: https://sanjee-surf-school-proposal.os1.workers.dev (noindex)
- Messages, not sent: `sites/sanjee-surf-school/pitch/message.en.whatsapp.md`, `message.en.email.md`. They carry no sender name and need signing.
- Sender's checklist and the operator question: `sites/sanjee-surf-school/pitch/notes.md` (not served).

Station 5 passed in round 1: 91.2 of 100 by the ledger formula, 86.9 if the rubric weights, which sum to 105, are normalised. Visual 8, experience 8, critic 71.2 of 80. A later defect patch (message link label, bar landmark, swell on rotation, separators) went live with the preview and was not re-scored.

Picked mockup: `interactive` only. Calm and unique were failing at round 2 and were not kept.

## Check before sending

- **Who decides.** Legal pages name a Berlin operator; a Google review carries the same name, unproven as the same person. The old site's builder may be the person pitched. The page and messages are written to the school, with no name.
- **Channel.** Nobody has seen +94 77 400 4422 answered or knows who holds it, and it is also the customer line. Email to sanjee@sanjee-surf.com is untested. Don't use the sanjeesurf.com address or the contact form.
- **Take-down offer.** The writer added an offer to take the preview down on request. Keep it only if it will be honoured.
- **Unasked reuse.** The preview uses the site's words and photos. `img-007` (possible beach photographer) and `img-005` (identifiable people) are reachable on the preview before clearance.
- **Stale findings.** Dated 5 November. Open the old site once on a real phone before sending.
- **Real devices.** Alon viewed the interactive mockup's foam on a phone and it read as water. The deployed site has not been tested on a real iPhone or a range of Android phones.

## Exceptions Alon decided on (2026-11-05)

- Run in parallel with coconut-surf-inn, against the orchestrator's one business in flight.
- `max_sites` 3 to 4. Tokens 2M to 14M for this business. Past the 90 minute cap, first to the pick, then carried on with the budget for build through pitch.
- Harvest went on stills: 2 business-owned Google clips return 403 and were never seen.
- Round 3 reworked only interactive, against the rule of three passing mockups.

## Decisions left open

- The new page gives up the old site's live slots and online deposit, and the message has no time of day. Experience critic's top fix: a Morning / Afternoon / Not sure row.
- Visual critic's top fix: a lighter scrim on the desktop sky. Trial value in `reports/2026-10-midigama-01/sanjee-surf-school.visual.md`.
- Tours section: quieter icons and a shorter list on phones. Weakest stretch of the page.
- Certificates in `llms.txt`, a one-line change. Left out because self-reported.
- Owner facts left out on purpose: hours, cancellation, party size on tours, deposit over WhatsApp, "30 seconds from the sand" against a pin 105 m from shore, instructor certificates, AI-crawler policy.
- Six schema gaps (`final/notes.md`), and the swell runs only on the current hero: both are station 8 questions.

## Known, not fixed

- `/favicon.ico` 404 (same on Lotus); the dossier has no logo.
- Two separators still read as a capital I (Bodyboard row, fit chips). Separator contrast is 2.2 to 2.8:1, decorative.
- `og:image` on the preview uses the workers.dev host; set `SITE_URL` for production.

## Tool problems to raise as proposals

- `tools/setup.sh` changes a fresh worktree: it restored a retired Cheeky Monkey image (which blocks commits), re-captured Mutag Meitiv screenshots into the shared store and deleted its tracked fonts.
- `tools/check-design.mjs` (port 8960) and `tools/audit-mockup.mjs` (port 8980) hardcode ports, which collide across sessions.
- `tools/audit-mockup.mjs` cannot see a hero that exactly fills the viewport, so its LCP can pass on the H1 alone.
- `agents/seo/base.md` allows `aggregateRating`, against Shahar's decision of 2026-09-22 applied to every site.
- Rubric: "at least 1920 px" names no axis; weights sum to 105; the video hard fail doesn't cover a human decision to go on stills; contrast is a flat 4.5:1 where WCAG allows 3:1 for large text.
- The visual critic proposes comparing all three first screens side by side every round, and a 2560 shot in the look loop.
- `agents/writer/base.md` takes taps from `audit.json.measured`, which here is a false positive, and names `~/.oneshot/cf-token`, which doesn't exist.
- `/review-animations` refuses agents, and `/impeccable`'s scripts install a binary outside the worktree, so no mockup has had those reviews.
- `~/.npm` on this machine has a permissions fault; `npm install` needs `--cache`.
