# deployer / CHANGELOG.md — version history, one entry per approved diff.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs deployer`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable.
- **tools.md 0.2.0** — 2026-09-25 — `managed` adapter documented as built (`deploy/managed/deploy.mjs`, `cms/`): super-admin seed (deployer-only fields), content-hashed photo names, operator publish through the hook's queue, parity and live checks on `deploy`, the intro-text edit when a site has no prices, the sealed-credentials path. Shahar asked for the stale docs to be fixed.
