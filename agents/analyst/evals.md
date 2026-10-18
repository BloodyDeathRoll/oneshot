# analyst / evals.md — how we judge this agent; metrics collected per run.

| Metric | How | Bar |
|---|---|---|
| Lanes accepted | gate a′ note: lanes approved without change / lanes proposed | collected; no bar until 3 inbound runs |
| Skeptic bite | claims KILLED or WEAKENED / claims minted, per lane | > 0 per run; 0 is a failed skeptic pass |
| Contract violations | files sent back by the orchestrator, per role | 0 second failures |
| Direction accepted | gate b′: `direction.md` confirmed without a rewrite (the `aligned` note says what the client changed) | collected |
| Cited downstream | site copy lines the copyeditor marks `sourced` against a claim ID; `concepts.md` naming a direction hint | collected |
| Cost | tokens + wall time for 2a–2b, from `usage.jsonl` | ≤ 25 % of `tokens_per_business` |
