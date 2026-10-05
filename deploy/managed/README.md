# deploy/managed/ — deployer adapter for hosting_mode managed: tenant in our multi-tenant Payload + Cloudflare Workers. Steps: provision, seed, deploy, attach_domain, verify, check, export (handoff skipped).

- `deploy.mjs` — the adapter (`node deploy/managed/deploy.mjs <slug> [--steps provision,seed,deploy,verify,check]`); each step appends its record to `sites/<slug>/deploy.json`. Spec: `agents/deployer/tools.md`.
- `lib/cms.mjs` — CMS config (`CMS_URL`, `CMS_SSH`, `CMS_SSH_KEY`, `CMS_REMOTE_DIR`), SSH, super-admin login, CMS health, anonymous-access probe, and `ownerPath` (owner login, isolation, one edit round-tripped and restored) — used by `verify` and by `tools/site-check.mjs --full`.
- `lib/parity.mjs` — CMS build vs local build, compared without the seed's `<slug>-<sha256:8>-` file-name prefix.
- `seed-export.mjs` — `content.json` (+ dossier video) → the CMS export format the seed imports.

`check` (after `verify`) runs the post-CMS acceptance suite, `node tools/site-check.mjs <slug> --full`: full report in `sites/<slug>/site-check.json`, summary in `deploy.json`. Run the same command for every tenant after any CMS server upgrade (`cms/README.md`). The smoke subset (`--all --smoke`) runs every 6 h on GitHub Actions (`.github/workflows/site-monitor.yml`); a failed run is the alert.
