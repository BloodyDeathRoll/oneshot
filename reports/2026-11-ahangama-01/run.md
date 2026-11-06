# run.md — 2026-11-ahangama-01

Operator alon. One business, `the-sandhya`, `mode: test`. Caps from the run file: 2,000,000 tokens and 90 minutes per business.

## the-sandhya

State: `copy_failed`, round 2, on voice only. Next: humanizer, then the copyeditor's third pass, once Alon has decided what the ruling covers.

| Station | Agent | Tokens | Minutes | Result |
|---|---|---|---|---|
| 3 | harvester 0.5.0 | 397,489 | 34.4 | 187 images, 20 gaps, 0 blocking |
| 3b | auditor 0.1.3 | 355,678 | 30.3 | 16 findings: 1 high, 13 medium, 2 low |
| 4a | copywriter 0.5.0 | 211,111 | 8.6 | en, round 1 |
| 4b | humanizer 0.2.1 | 129,333 | 3.8 | nine lines changed |
| 4c | copyeditor 0.4.2 | 184,543 | 8.9 | FAIL, round 1 |
| 4a | copywriter 0.5.0 | 130,765 | 5.5 | round 2 |
| 4b | humanizer 0.2.1 | 169,264 | 7.8 | round 2 |
| 4c | copyeditor 0.4.2 | 232,784 | 9.5 | FAIL, round 2: facts clean, 6 voice sentences |
| | **Total** | **1,810,967** | **108.7** | |

Not counted: Scout and orchestrator time in the session, and a harvester start stopped within minutes to move worktree.

**Budget:** Alon raised the caps on 2026-11-06 from 2M tokens and 90 minutes to 10M and 600, at 1.28M and 86 minutes used (at 95 % of the old wall-clock cap). For scale, `sanjee-surf-school` used 9.6M tokens and 587 minutes on the same stations up to the mockup pick (usage on its branch). Review again at gate b.

## Waiting for a human

1. Does the owner-prose ruling cover moved clauses and one-word grammar or article changes? `copy/review.md` scored them as not exempt.
2. If the third pass fails on voice alone, the copyeditor's rule sends the business to the harvester or out of the run. Is that what should happen?

No gate is passed by either; gate b (mockup pick) is still ahead.
