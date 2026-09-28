# scout / CHANGELOG.md — version history, one entry per approved diff.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs scout`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable.
- **0.3.0** — 2026-09-28 — From proposal 007 (approved by Shahar). Hard constraint 3: the funnel probe — `tools/funnel.mjs --depth 1` on every live site, copied into `existing_site.funnel` and cited in the reason. Scale unchanged.
