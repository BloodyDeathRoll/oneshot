# run.md — 2026-11-ahangama-01

Operator alon. One business, `the-sandhya`, `mode: test`. Caps from the run file: 2,000,000 tokens and 90 minutes per business.

## the-sandhya

State: `copy_failed`, round 1. Next: copy round 2 (4a, then 4b, then 4c; at most 2 rounds).

| Station | Agent | Tokens | Minutes | Result |
|---|---|---|---|---|
| 3 | harvester 0.5.0 | 397,489 | 34.4 | 187 images, 20 gaps, 0 blocking |
| 3b | auditor 0.1.3 | 355,678 | 30.3 | 16 findings: 1 high, 13 medium, 2 low |
| 4a | copywriter 0.5.0 | 211,111 | 8.6 | en, round 1 |
| 4b | humanizer 0.2.1 | 129,333 | 3.8 | nine lines changed |
| 4c | copyeditor 0.4.2 | 184,543 | 8.9 | FAIL, round 1 |
| | **Total** | **1,278,154** | **85.9** | |

Not counted: Scout and orchestrator time in the session, and a harvester start stopped within minutes to move worktree.

**Budget warning: wall-clock is at 95 % of the cap; tokens at 64 %.** The business is stopped at its current state until Alon decides. For scale, `sanjee-surf-school` used 9.6M tokens and 587 minutes on the same stations up to the mockup pick (usage on its branch).

## Waiting for a human

1. Budget: raise the caps or stop here.
2. Ruling: does the copy review's "no triads, no padding" apply to the hotel's own verbatim sentences? `copy/review.md` sets out the conflict.
3. Testimonials: may a long review be excerpted with a visible ellipsis?

No gate is passed by any of these; gate b (mockup pick) is still ahead.
