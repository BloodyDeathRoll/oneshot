# copywriter / CHANGELOG.md

## 0.1.0 — 2026-09-19
- First version.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs copywriter`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable. Station id corrected to 4a.
- **0.3.0** — 2026-09-23 — Hard constraint 9: `contact.address` is the business's Google listing address, character for character, with its postcode (Shahar's standing rule; playbook 0.5.0 §6). A missing Google address is a flagged gap, never filled from another platform.
