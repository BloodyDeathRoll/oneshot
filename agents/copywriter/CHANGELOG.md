# copywriter / CHANGELOG.md

## 0.1.0 — 2026-09-19
- First version.

- **0.2.0** — 2026-09-20 — Runtime prompt is now assembled from `agents/wiring.json` by `node tools/prompt.mjs copywriter`, and the `Runtime prompt =` line names every layer it really gets (`tools.md`, `evals.md`, `run.yaml` and the schemas were silently dropped before). `tools/check-wiring.mjs` fails the run if any layer is unreachable. Station id corrected to 4a.
- **0.3.0** — 2026-09-23 — Hard constraint 9: `contact.address` is the business's Google listing address, character for character, with its postcode (Shahar's standing rule; playbook 0.5.0 §6). A missing Google address is a flagged gap, never filled from another platform.
- **0.3.1** — 2026-09-23 — Hard constraint 9 refined (Shahar): a postcode Google lacks is taken from another platform with its source noted; place names capitalised; order street, town postcode, country. Playbook 0.5.1 §6.
- **0.3.2** — 2026-09-28 — From proposal 007 (approved by Shahar). Input `dossier/<slug>/audit.json`: CTA label, offer framing and closing line from the auditor; the audit is not a fact source.
- **0.3.3** — 2026-09-28 — Auditor 0.1.1: reads `recommended.closing_intent` (what the closing line must do) instead of a ready-made line; the copywriter writes it. Approved by Shahar in session.
- **0.3.4** — 2026-10-17 — From proposal 2026-09-globalsurf-02/004 (approved by Shahar), step 1 packs. `schemas/business-types.md` and `taxonomy.md` moved to the vertical pack and are named by their layer, `vertical/business-types.md` / `vertical/taxonomy.md` (= `verticals/surf/` for every run so far); content unchanged.
- **0.4.0** — 2026-10-18 — Shahar in session (PR #29 review: fix all). Inbound input `direction.md`: every "what the site must do" item gets copy or a stated reason in `copy/sources.md` (the copyeditor already fails copy against them). Outbound unchanged. Also reads `dossier/<slug>/industry/industry.md` (inbound), whose claim IDs the copyeditor accepts as `sourced`.
