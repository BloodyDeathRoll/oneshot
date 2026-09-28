# copyeditor / CHANGELOG.md

## 0.1.0 — 2026-09-19
- First version.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs copyeditor`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable. Station id corrected to 4c.
- **0.3.0** — 2026-09-23 — Shahar's standing rules: every round is a full re-check of every sentence against the dossier, never only the changed fields (hard constraint 6); a verbatim guest observation of a physical fact counts as a source for that fact (`sourced`).
- **0.3.1** — 2026-09-28 — From proposal 007 (approved by Shahar). Hard constraint 2: a sentence sourced only to the auditor's `audit.json` is `unsourced`.
