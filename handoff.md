# Session Handoff — 2026-09-19

## Goal
Oneshot (PLAN.md): find surf businesses with weak websites on a stretch of coast, one-shot each a new static Astro site fed by one shared Payload CMS on Cloudflare Workers, and pitch it. This session did Phase 0 (scaffold), Phase 1 (foundations), the architecture decisions, the CMS server, and the first scout runs. Phase 2 (vertical slice on one business) is next and waits on a human gate.

## Current State
- Repo: https://github.com/BloodyDeathRoll/oneshot (private), `main`, clean, all pushed. Last commit `6bfbf54`.
- PLAN.md is the source of truth (rewritten twice this session for the final architecture, "option C"). CLAUDE.md has the rules + a fixed "Architecture" section + the ledger resume procedure.
- Architecture (final, do not re-litigate): Payload CMS 3 + multi-tenant plugin + Postgres + Docker Compose on our server; per-client static Astro sites pulling content at build time against `schemas/site-content.md`; hosting on Cloudflare Workers static assets (one Worker per site, Wrangler); domains via Cloudflare Registrar after a sale; hosting modes `managed` (default, monthly fee) / `self_hosted_docker` / `static_only`; "one of everything" rule (one schema, one template per site, one Payload config with 2 profiles).
- Payload spike (`spikes/payload/`): both profiles built and tested from clean — multi-tenant 29/29 (dev box) and 27/27 + 2 skipped on the ARM server; self-hosted single-tenant 14/14 (dev) and 13/13 + 1 skipped (ARM). Skips = admin-UI checks needing a headless browser. Content schema v0.1 in `schemas/site-content.md`. Spike test runner fallback flaw: `test/run-self-hosted.sh` needs a real export in `exports/wobbly-pelican` or its round-trip check fails against the fixture (not fixed).
- CMS server: Oracle Cloud tenancy "shibumi" (2nd OCI account, Frankfurt, `~/.oci/config` profile `DEFAULT`), now Pay As You Go with quota policy `oneshot-free-tier-cap` (A1 ≤ 2 OCPU/12 GB, storage ≤ 200 GB, x86 flex zeroed). Instance `oneshot-cms` RUNNING, `130.61.212.182`, SSH `ssh -i ~/.ssh/oneshot_cms ubuntu@130.61.212.182`, Docker + Node + ufw installed, spike source at `~/oneshot/payload`, nothing running on it. Details in `infra/oci/README.md`. Nothing production-grade is deployed there yet.
- Cloudflare: a dedicated Oneshot account exists (login shaharnaor@outlook.com), workers.dev subdomain `os1` → previews will be `<brand>.os1.workers.dev`. NO API token yet; nothing deployed there. The other logged-in wrangler account (`einhanamer`) must NEVER be used (see memory + PLAN §9); the two spike Workers put there by mistake were deleted.
- All 7 agents have `base.md` v0.1.0; deployer also has `tools.md` (3 adapter specs). `custom.md` files are Shahar's (designer's has content; others header-only; deployer's header still says "packager" — never edit custom.md). `tools.md`/`evals.md`/`references.md` are header-only except designer references (6-site analysis) and deployer tools. `taxonomy.md` header-only. `rubric.md` v0.1, `playbook.md` v0.1, `schemas/{site-content,candidates,dossier}.md` v0.1, `handoff/` kit templates, `server-hardening.md` header-only.
- Scout runs: `reports/2026-09-ahangama-01/` (100 m, 4 candidates, rejected by Shahar as too small) and `reports/2026-09-ahangama-02/` (300 m around "The Lavish Haven, Ahangama": 35 candidates, 24 shortlisted). `ledger.jsonl` has discovered→scored→shortlisted lines for both runs (106 lines). **Gate a is open: Shahar has not approved any shortlist.**
- Figma `oneshot-workflow` (file DO4wXVmArw9ihwZVx6gTA4, page `workflows`, frame `198:2`) is current and rewritten in plain language; loop arrows fixed.
- Proposal `proposals/2026-09-mirissa-01/001-designer-custom-calm-variant.md` (calm mockup skips canvas/WebGL) awaits Shahar's approval; the directory name still says mirissa (historical).

## Active Files
- `PLAN.md`, `CLAUDE.md`, `run.yaml` (run `2026-09-ahangama-02`, mode `business`, radius 300 m, languages `[en]`, hosting block) — plan, rules, current run.
- `docs/ledger.md`, `ledger.jsonl` — schema (+ optional `hosting_mode` field, states `handoff_verified`/`access_revoked`) and the append-only log.
- `agents/*/base.md` — all seven prompts; `agents/deployer/tools.md`; `agents/designer/references.md` (analysis).
- `playbook.md`, `rubric.md`, `schemas/*.md`, `handoff/*.md`, `server-hardening.md`, `cms/README.md`, `deploy/*/README.md`, `templates/*/README.md`, `infra/README.md`.
- `spikes/payload/**` (Payload app, Astro site, publisher, compose files, tests, README), `schemas/site-content.md`.
- `infra/oci/{create-cms-instance.sh,bootstrap-cms.sh,README.md}`.
- `reports/2026-09-ahangama-0{1,2}/{area.geojson,candidates.json,scout-log.md}`.
- `proposals/2026-09-mirissa-01/001-designer-custom-calm-variant.md`.
- Memory: `~/.claude/projects/-home-shahar/memory/oneshot-cloudflare-account.md`.

## Changes Made This Session
1. Phase 0 scaffold (repo, layout, CLAUDE.md, run.yaml, ledger schema, designer custom.md verbatim + reference URLs).
2. Phase 1: designer base.md, playbook v0.1, six-site reference analysis; Grav vs Bludit spike (later deleted); rubric; candidates/dossier schemas; base.md for the other agents.
3. Architecture went GoDaddy/PHP → (my unrequested Vercel detour, overwritten) → option C (Payload multi-tenant + Cloudflare Workers) → plus self-hosted handoff modes. Reason: the client must never be left with software to patch; one server we run is the only ops surface.
4. Payload spike built, tested from clean on dev box and on the ARM server; decisions recorded from it: Publish button (drafts, not deploy-on-save), API token on the server, brand-slug Worker names, one owner login per business, `/admin` on the client's domain, English only for now (Sinhala dropped), images = business-owned + review photos with credit, booking = WhatsApp/phone + existing OTA links, domains only after a sale.
5. Area modes added to run.yaml: `town` / `stretch` / `business` (+ `radius_m`).
6. OCI: VCN + A1 instance created after 29 launch rounds (capacity came right after the pay-as-you-go upgrade); quota cap policy; old unused `rosa-vcn` in that tenancy deleted on Shahar's instruction.
7. Figma frame updated three times; final version is plain-language.

## Failed Attempts
- Live `wrangler deploy` from the session is blocked by the permission classifier ("Production Deploy"); when Shahar ran it via me it went to the WRONG Cloudflare account (`einhanamer`, another project's). Both Workers deleted. Rule now: ask before any external setup; Oneshot account only.
- Creating a Claude Docs review artifact when Shahar only asked a status question — unwanted; deleted. Rule: answer questions, don't prepare docs unless asked.
- OCI `NotAuthorizedOrNotFound` 404s are intermittent on the shibumi tenancy; `create-cms-instance.sh` wraps `oci` with retries. A1 "out of host capacity" ×28 rounds on the free tier; landed only after the PAYG upgrade.
- Bootstrap script flushed iptables after installing Docker → containers had no network (npm EAI_AGAIN). Fixed: restart docker after the flush.
- rsync to the box excluded `.env.*` (lost `.env.example`) and `media/` (lost fixture photos); a stale Postgres volume kept an old password. Fixed by hand; a private-repo `git clone` on the box needs a token (not set up).
- Scout: Nominatim knows none of these businesses; TripAdvisor 403s; Overpass coastline `out geom` times out; Google's "website" field was wrong/hijacked in 3 of 15 cases. Booking.com pins via headless Chromium (playwright-core under `~/.npm/_npx`) were the reliable geocoder.
- Mirissa (Niira Hotel → Ritz-Carlton) was only an example; a scout run on it was stopped.

## Next Step
1. Ask Shahar to decide gate a for run `2026-09-ahangama-02`: pick up to 3 of the 24 shortlisted (strongest by evidence: `kabalana-surf-point-kasuns-place`, `bappa-surf-school`, `surf-revolution-kabalana`, `ka-surf-hostel-and-restaurant`, `good-story-surf-school-ahangama`). Log `shortlisted → approved` with `agent: "human"` in `ledger.jsonl`. Do NOT assume any approval.
2. Apply the scout lessons (edit `agents/scout/base.md`, `schemas/candidates.md`, write `agents/scout/tools.md`, `taxonomy.md`): score rungs for "Google only" vs "OTA only", white-label booking pages, non-surf lodging exclusion rule, dedupe = 30 m AND same name/phone, always fetch the Google website field, add `distance_to_anchor_m`.
3. Phase 2 station 3: run the harvester (`agents/harvester/base.md`) on the approved business → `dossier/<slug>/dossier.json`. Then mockups (needs `templates/<variant>/` — not written yet; the spike's `spikes/payload/site/` is the only Astro template so far).
4. Still open for Shahar: stock/generated images (default no); proposal 001; whether to install a headless browser on the CMS box; production stack on `oneshot-cms` (HTTPS/Caddy, backups, Cloudflare API token — ask for the token only when a deploy is due).
