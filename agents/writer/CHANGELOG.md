# writer / CHANGELOG.md — version history, one entry per approved diff.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs writer`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable.
- **0.2.1** — 2026-09-28 — From proposal 007 (approved by Shahar). Input `audit.md`/`audit.json`: before/after taps to book, the audit's pitch-point findings with screenshots, off-site advice list.
