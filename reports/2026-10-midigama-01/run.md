# Run 2026-10-midigama-01

Started here on 2026-11-05 for sanjee-surf-school. Earlier businesses in this run wrote no entries to this file.

## sanjee-surf-school

- **Budget warning, 2026-11-05:** 1.83M of `tokens_per_business` 2M recorded in `usage.jsonl` (over the 90 % line), at station 4c round 2. Resumed agents' harness figures are recorded as reported and may overcount, because they appear to include the context carried over from the first run.
- **Time cap:** `wallclock_min_per_business` 90 passed at 93 min. Alon allowed this through to the mockup pick (activity.jsonl, 2026-11-05).
- **Token cap:** Alon raised `tokens_per_business` for this business from 2M to 6M, with a check back before 6M is reached (2026-11-05). 2.15M recorded when copy passed. The run file value stays 2M for other businesses.
- **Pre-score round 1, 2026-11-05:** visual calm 6, interactive 5 (hard fail by that critic's ruling: first screen has no photograph of 1920 px or more), unique 6; experience calm 7, interactive 7, unique 8; critic calm 70.2, interactive 68.2, unique 66.9 of 80. All three back to 4e.
- **Token cap, round 2:** Alon raised `tokens_per_business` for this business from 6M to 10M to rework all three mockups; if they still fail near 10M, stop and report the scores (2026-11-05).
- **Spend limit, 2026-11-05 14:41 IST:** the account limit cut off the interactive designer in round 2, and the calm designer was stopped to save the remaining allowance. Both were resumed after the reset. Their figures for the interrupted part may be missing from `usage.jsonl`.
- **Pre-score round 2, 2026-11-05:** visual calm 7, interactive 7, unique 7, all better than the current site; experience calm 8, interactive 7, unique 8; critic calm 75.0, interactive 70.4, unique 73.5 of 80. No mockup passes. Visual critic: interactive nearest to 8; calm and unique not distinct on desktop; calm may not reach 8 with this photography.
- **Decision, 2026-11-05:** Alon chose to rework only interactive in round 3, staying inside the 10M cap. This departs from the rule of three passing mockups (orchestrator constraint 4a), by Alon's decision. Calm and unique stay at their round 2 state, failing, and can be viewed at the pick marked as failing.
- **Pre-score round 3, 2026-11-05, interactive only:** visual 8 (narrow, two conditions), experience 8 (narrow), critic 65.9 of 80 with dimension 3 at the floor of 6 because of a typed-date regression; no hard fail. Must-fix patches follow, without a full re-score.
- **Must-fix patch, 2026-11-05:** typed date, feature band above 2000 px, foam, hover pill and alt fixed on interactive by a scoped designer agent that did not load the full designer prompt. Not re-scored by the critics, to stay inside the 10M cap: the round 3 scores predate the patch. Typed date re-tested by the session with real key presses. Waiting at gate b.
