# orchestrator / CHANGELOG.md — version history, one entry per approved diff.

- **0.2.1** — 2026-09-21 — Approved by Shahar in session. Hard constraint 3's existence check for `mocked` was "mockup dirs"; since designer 0.3.0 a 4e mockup is one HTML file with a look-log and per-round shots, so the check now names `dist/index.html`, the `look-log` in `notes.md` and `shots/round-N/` for all three variants.
- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs orchestrator`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable.
