# scout / tools.md — what the agent may call, and how.

## `tools/funnel.mjs` — the funnel probe (proposal 007)

`node tools/funnel.mjs <url> --depth 1 --out reports/<run-id>/funnel/<slug>` on every candidate whose site loads. Mobile viewport 390×844. Copy from `funnel.json` into `existing_site.funnel`: `clicks_to_book` (taps from the landing page to the first WhatsApp / tel / engine / dated form; `null` = none within depth 1), `primary_action.class`, `cta_above_fold`, `measured_at`. One call per live site; no prose. Never submits a form or logs in.
