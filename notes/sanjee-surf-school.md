# sanjee-surf-school

Operator: alon. Run: `2026-10-midigama-01` (`mode: test`, no owner contact). Branch: `alon/sanjee-surf-school`, worktree `.superset/worktrees/oneshot/sanjee-surf-school`. It carries all of `alon/seo-cheeky-monkey` (PR #68), so its PR should wait for that one or be based on it.

## Where it stands

State `mocked`, waiting at **gate b (mockup pick)**. Next line is a human `mocked -> picked`. Nothing deployed or sent.

| Mockup | Last scored | Visual | Experience | Critic (of 80) | Status |
|---|---|---|---|---|---|
| interactive | round 3 | 8, with conditions | 8 | 65.9 | Passes, narrowly; must-fix patch applied afterwards, not re-scored |
| calm | round 2 | 7 | 8 | 75.0 | Failing; not reworked, by Alon's decision |
| unique | round 2 | 7 | 8 | 73.5 | Failing; not reworked, by Alon's decision |

Reports: `reports/2026-10-midigama-01/sanjee-surf-school.md`, `.visual.md`, `.experience.md`. Costs and exceptions: `reports/2026-10-midigama-01/run.md`, `usage.jsonl`.

## Check before trusting the pass

- The visual 8 depends on a person watching interactive's foam live for about 20 seconds. Nobody has. Breathing foam puts it back to 7. The patch lowered the swing, but that is measured, not seen.
- Nothing has run on a real phone or iOS Safari. Shader cost is unknown.

## Exceptions Alon decided on (2026-11-05)

- Run in parallel with coconut-surf-inn, against the orchestrator's one business in flight.
- `max_sites` 3 to 4. Tokens 2M to 10M for this business. Past the 90 minute cap to the pick.
- Harvest went on stills: 2 business-owned Google clips return 403 and were never seen.
- Round 3 reworked only interactive, against the rule of three passing mockups.

## Open before any pitch

- Who runs the business and holds the phone. Legal pages name a Berlin operator; a review carries the same name, unproven as the same person (`dossier.flags_for_operator`). The old site's builder may be the person pitched.
- The new page gives up the old site's live slots and online deposit, and WhatsApp has not been seen answered.
- Rights: `img-007` (possible beach photographer), `img-005` and `img-008` (identifiable people, consent).
- Owner facts left unresolved on purpose: hours, cancellation, party size on tours, whether a deposit applies over WhatsApp, "30 seconds from the sand" against a pin 105 m from shore, instructor certificates.

## Known, not fixed

- Interactive: a mistyped five-digit year can reach the message ("20 February 61210"). Hover pill stays under 4.5:1 on some pixels at 1280 and 1440. `og:image` host is an assumption until station 6. Fonts are from Google, due to be self-hosted at 4g.
- Calm and unique are not distinct on desktop first screens (visual critic, round 2).

## Tool problems to raise as proposals

- `tools/setup.sh` changes a fresh worktree: it restored a retired Cheeky Monkey image (which blocks commits), re-captured Mutag Meitiv screenshots into the shared store and deleted its tracked fonts.
- `tools/check-design.mjs` (port 8960) and `tools/audit-mockup.mjs` (port 8980) hardcode ports, which collide across sessions.
- `tools/audit-mockup.mjs` cannot see a hero that exactly fills the viewport, so its LCP can pass on the H1 alone.
- The rubric's "at least 1920 px" names no axis. The visual critic also proposes comparing all three first screens side by side every round, and a 2560 shot in the look loop.
- `/review-animations` refuses agents, and `/impeccable`'s scripts install a binary outside the worktree, so no mockup has had those reviews.
