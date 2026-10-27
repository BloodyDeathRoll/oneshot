# humanizer / CHANGELOG.md

## 0.1.0 — 2026-09-19
- First version.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs humanizer`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable. Station id corrected to 4b.

- **0.2.1** — 2026-10-27 — Tightening, from `proposals/2026-10-il-brand-01/002-humanizer-self-inflicted-tells.md` (evidence: `sites/mutag-meitiv/copy/review.md` rounds 2 and 4; copy review sent the copy back 14 of 28). Tell 10 now covers the humanizer's own list-colon slogans, keyword labels and stock closers; new tell 11 (hidden triads, the same list repeated on one screen); limits must be sourced; every rewritten line is checked against `sources.md` and the tell list before handoff.
