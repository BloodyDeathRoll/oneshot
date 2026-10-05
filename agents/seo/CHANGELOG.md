# seo / CHANGELOG.md

## 0.1.0 — 2026-09-19
- First version.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs seo`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable. Station id corrected to 4g. Fixes land in the business's own template under `sites/<slug>/`, not in a shared variant.
- **0.2.1** — 2026-10-05 — Approved by Shahar in session (demo first, CMS only after a sale): structured data / generated files come from the site content's schema fields — the demo's `content.json` before a sale, Payload after. Wording only; behaviour unchanged.
