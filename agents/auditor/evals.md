# auditor / evals.md — how we judge this agent; metrics collected per run.

| Metric | How | Bar |
|---|---|---|
| Evidence coverage | findings with ≥ 1 evidence entry that opens (200, or a file that exists) / findings | 100 % — a finding without evidence fails the self-check |
| Human spot-check | Shahar opens 3 findings per business from the evidence links | ≥ 2 of 3 reproduce as written; a finding that does not reproduce is a proposal against this prompt |
| Target met | the critic's `tools/funnel.mjs` run on the built site: `clicks_to_book` ≤ `recommended.clicks_to_book`, primary action class = `recommended.primary_action` | met on every passed site; a miss is a finding against the designer or against this audit's target, decided in the critic's scorecard |
| Consumed downstream | `concepts.md` names the recommended above-fold order; the pitch cites ≥ 1 `pitch_point` finding with its screenshot | both, per business |
| Pitch outcome | later: `outcome:*` lines on pitches that led with an audit finding vs those that did not | collected from the ledger; no bar until 10 pitches exist |
| Cost | tokens + wall time per audit, from `reports/<run-id>/run.md` | ≤ 10 % of the business's `tokens_per_business` |
