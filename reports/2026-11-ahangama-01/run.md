# run.md — 2026-11-ahangama-01

Operator alon. One business, `the-sandhya`, `mode: test`. Caps from the run file: 12,000,000 tokens and 850 minutes per business (raised by Alon from 2M and 90 on 2026-11-06, then from 10M and 600 on 2026-11-09).

## the-sandhya

State: `packaged`, waiting at gate c (send the pitch). At gate b Alon kept calm only, with date fields (2026-11-09). Preview: https://the-sandhya.os1.workers.dev. Proposal: https://the-sandhya-proposal.os1.workers.dev.

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
| 4g | designer 0.7.1 | 1 | 329,213 | 26.5 | calm ported to Astro, date fields |
| 4h | seo 0.2.2 | | 180,604 | 18.0 | noindex preview rules, JSON-LD |
| 4i | aiseo 0.2.2 | | 194,929 | 8.7 | llms.txt, AI crawler policy |
| 4g | designer 0.7.1 | fix | 365,192 | 14.3 | early-scroll CLS 0.4 to 0.0032 |
| 5 | three reviewers | 1 | 697,802 | 41.9 | PASS 85.1/100 |
| 4c | copyeditor 0.4.2 | follow-up | 85,458 | 1.8 | "Every room has" passes |
| 4g | designer 0.7.1 | fix | 424,077 | 13.6 | dates after rooms, hero first |
| 5 | critic 0.4.3 | v1 | 312,419 | 13.1 | PASS 89.0/100 |
| 4g | designer 0.7.1 | fix | 106,903 | 9.2 | labels never clip |
| 6 | deployer 0.5.0 | | 96,148 | 3.0 | preview live, byte-identical |
| 7 | writer 0.5.1 | | 253,867 | 11.6 | pitch and proposal page |
| | | | **10,769,422** | **605.9** | |

Minutes are each agent's own run time added up; agents that ran side by side took less elapsed time. Not counted: Scout and orchestrator time in the session, and a harvester start stopped within minutes to move worktree. Some reviewer runs include time lost to a network outage.

**Budget:** 90 % of the 12M tokens and 71 % of the 850 agent minutes used. For scale, `sanjee-surf-school` used 9.6M tokens and 587 minutes on the same stations (usage on its branch).

## Gate b

| Mockup | Critic /80 | Visual | Experience | Total /100 | Result |
|---|---|---|---|---|---|
| calm | 68.2 | 8 | 8 | 84.0 | passes (round 1) |
| interactive | 66.6 | 8.5 | 8 | 82.5 | passes (round 2); dots and tablet contrast fixed after, not re-scored |
| unique | 68.5 | 7 | 7 | 81.9 | fails |

Unique is presented marked as failing. Orchestrator rule 4a says a human always gets three passing mockups, with an ask after round 5. Alon was offered going to the pick with the two that pass, or another round on unique, and answered "continue"; the session took that as the first. Unique can still get its round.

**Picked (2026-11-09):** calm. The build adds check-in and check-out fields that pass the dates to the Cloudbeds URL, which meets `agents/designer/custom.md`. The unique rulings are moot.

## After the pick

Built from calm (4g), SEO and AI SEO, critique round 1 PASS 85.1/100 (critic 69.4/80, visual 8, experience 8), a fix pass, critic verification 1 PASS 89.0/100. Preview https://the-sandhya.os1.workers.dev, proposal https://the-sandhya-proposal.os1.workers.dev. Waiting at gate c; the list a person must check before sending is in `notes/the-sandhya.md`.
