# run.md — 2026-11-ahangama-01

Operator alon. One business, `the-sandhya`, `mode: test`. Caps from the run file: 10,000,000 tokens and 600 minutes per business (raised by Alon from 2M and 90 on 2026-11-06).

## the-sandhya

State: `picked`. At gate b Alon kept calm only, with date fields added at the build (2026-11-09). Next: 4g build.

| Station | Agent | Round | Tokens | Minutes | Result |
|---|---|---|---|---|---|
| 3 | harvester 0.5.0 | | 397,489 | 34.4 | 187 images, 20 gaps, 0 blocking |
| 3b | auditor 0.1.3 | | 355,678 | 30.3 | 16 findings: 1 high, 13 medium, 2 low |
| 4a | copywriter 0.5.0 | 1 | 211,111 | 8.6 | en |
| 4b | humanizer 0.2.1 | 1 | 129,333 | 3.8 | nine lines changed |
| 4c | copyeditor 0.4.2 | 1 | 184,543 | 8.9 | FAIL: facts and voice |
| 4a | copywriter 0.5.0 | 2 | 130,765 | 5.5 | facts fixed |
| 4b | humanizer 0.2.1 | 2 | 169,264 | 7.8 | register lines |
| 4c | copyeditor 0.4.2 | 2 | 232,784 | 9.5 | FAIL: facts clean, 6 voice sentences |
| 4b | humanizer 0.2.1 | 3 | 153,198 | 5.0 | two sentences |
| 4c | copyeditor 0.4.2 | 3 | 233,518 | 8.3 | FAIL: one sentence |
| 4c | copyeditor 0.4.2 | 4 | 215,259 | 5.9 | PASS, resting on stated rulings |
| 4d | creative-director 0.6.1 | | 377,262 | 19.1 | one day, noon to twilight |
| 4e | designer 0.7.1 | 1 | 1,218,904 | 125.0 | three mockups, run in parallel |
| 4f | three reviewers | 1 | 1,012,009 | 56.8 | calm passes; interactive and unique back |
| 4e | designer 0.7.1 | 2 | 1,185,660 | 50.4 | interactive and unique rework |
| 4f | three reviewers | 2 | 1,394,533 | 50.0 | interactive passes; unique fails |
| 4e | designer 0.7.1 | 2b | 121,500 | 15.2 | interactive dots and tablet contrast |
| | | | **7,722,810** | **444.4** | |

Minutes are each agent's own run time added up; agents that ran side by side took less elapsed time. Not counted: Scout and orchestrator time in the session, and a harvester start stopped within minutes to move worktree. Some reviewer runs include time lost to a network outage.

**Budget:** 77 % of the tokens and 74 % of the agent minutes used. For scale, `sanjee-surf-school` used 9.6M tokens and 587 minutes on the same stations (usage on its branch).

## Gate b

| Mockup | Critic /80 | Visual | Experience | Total /100 | Result |
|---|---|---|---|---|---|
| calm | 68.2 | 8 | 8 | 84.0 | passes (round 1) |
| interactive | 66.6 | 8.5 | 8 | 82.5 | passes (round 2); dots and tablet contrast fixed after, not re-scored |
| unique | 68.5 | 7 | 7 | 81.9 | fails |

Unique is presented marked as failing. Orchestrator rule 4a says a human always gets three passing mockups, with an ask after round 5. Alon was offered going to the pick with the two that pass, or another round on unique, and answered "continue"; the session took that as the first. Unique can still get its round.

**Picked (2026-11-09):** calm. The build adds check-in and check-out fields that pass the dates to the Cloudbeds URL, which meets `agents/designer/custom.md`. The unique rulings are moot.
