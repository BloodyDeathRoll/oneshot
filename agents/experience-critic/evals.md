# experience-critic / evals.md — how we judge this agent; metrics collected per run.

| Metric | How | Bar |
|---|---|---|
| Agreement with Shahar | his mockup pick and any rejection vs this agent's ranking and pass/fail | a mockup Shahar rejects as weak must never have passed this agent |
| Calibration | this agent's score vs the other visual critic's on the same page | a gap over 2 points is reviewed in the learn step |
| Actionability | share of fix-list items the designer could act on without asking | ≥ 4 of 5 |
