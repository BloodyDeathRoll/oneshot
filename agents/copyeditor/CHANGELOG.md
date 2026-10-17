# copyeditor / CHANGELOG.md

## 0.1.0 — 2026-09-19
- First version.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs copyeditor`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable. Station id corrected to 4c.
- **0.3.0** — 2026-09-23 — Shahar's standing rules: every round is a full re-check of every sentence against the dossier, never only the changed fields (hard constraint 6); a verbatim guest observation of a physical fact counts as a source for that fact (`sourced`).
- **0.3.1** — 2026-09-28 — From proposal 007 (approved by Shahar). Hard constraint 2: a sentence sourced only to the auditor's `audit.json` is `unsourced`.
- **0.4.0** — 2026-10-07 — From proposal 2026-09-ahangama-02/005 (approved by Shahar on the dashboard). The fact audit in `review.md` is one row per sentence with its dossier key; a bulk count is not an audit. Comparatives, superlatives, frequencies and conditions are claims needing their own source, never `framing`. A dropped qualifier that widens a fact is `contradicted`. On KA three unsourced claims passed a count and cost a copy loop, a failed critique and a rebuild.
- **0.4.1** — 2026-10-17 — From proposal 2026-09-globalsurf-02/004 (approved by Shahar), step 1 packs. `schemas/business-types.md` and `taxonomy.md` moved to the vertical pack and are named by their layer, `vertical/business-types.md` / `vertical/taxonomy.md` (= `verticals/surf/` for every run so far); content unchanged.
