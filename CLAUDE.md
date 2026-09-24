# Oneshot — instructions for Claude Code sessions

Read `PLAN.md` fully before doing anything. It is the source of truth for decisions, layout, pipeline and phases. Ask Shahar only when a decision isn't already in PLAN.md.

## Rules (every session)

1. **Gates.** Never pass a human gate unattended: shortlist approval, mockup pick, send pitch, approve prompt diffs. Stop, present what the human needs, and wait.
2. **Ledger.** Every business state change is appended to `ledger.jsonl` (schema: `docs/ledger.md`). Append only — never rewrite or delete lines.
3. **Two-layer prompts.** Each agent's prompt is `base.md` (Claude writes) + `custom.md` (Shahar writes). Never edit any `custom.md`; propose changes to it as a separate proposal under `proposals/<run-id>/`, flagged as a custom.md proposal. Runtime prompt = `playbook.md` + `base.md` + `custom.md` + `references.md`.
4. **Small commits.** One commit per step, with a clear message.

## Architecture (fixed constraint — final, do not re-litigate)

- **One CMS for all client sites, run by us:** Payload CMS 3 with the official multi-tenant plugin, Postgres, Docker Compose, on one VPS — the second Oracle Cloud Always Free account, Ampere A1 (ARM64), pay-as-you-go upgraded; env-configurable so it can move later. One tenant per business. Each owner gets an email/password login scoped to their tenant only.
- **Every client site is a static Astro build** that pulls its tenant's content from Payload's API at build time. Design lives in the Astro template (the designer's canvas/WebGL, editorial grids and booking drawers); editable content (hours, prices, photos, copy blocks, contact, booking links) lives in Payload. `schemas/site-content.md` is the contract between the two.
- **Hosting:** Cloudflare Workers with static assets, one Worker per site, deployed with Wrangler, custom domain per site via Cloudflare. Do NOT use Cloudflare Pages. Do NOT use Vercel or GoDaddy for hosting.
- **Domains:** Cloudflare Registrar, one per client, billed through to the client.
- **Publish flow:** owner saves in Payload → `afterChange` hook → rebuild only that tenant's site → `wrangler deploy` → live in ~1 minute.
- **Export/handoff:** any client can receive their static build as a zip that runs on any host (GoDaddy included). Optional, not the deliverable.
- **Commercial default:** "we host it, you edit it, monthly fee". The writer's pitch reflects this.
- **Hosting modes**, per business, recorded in the ledger and `run.yaml`: `managed` (the default, everything above), `self_hosted_docker` (single-tenant Payload + Postgres + Astro builder + Caddy in one compose stack on the client's VPS; we install, verify, hand over, revoke our access), `static_only` (static build + source zip, no CMS). No split mode.
- **One of everything:** one content schema (`schemas/site-content.md`), one Astro template per site, one Payload config (two profiles, multi-tenant / single-tenant, selected by env var). Hosting mode is a deployer adapter, never a fork of the site or the CMS. Anything that would need a second renderer or a second CMS is out of scope.
- No PHP flat-file CMS port, no PHP CMS of any kind.

## Resuming a session from `ledger.jsonl`

Disk is the memory — no daemon, no DB.

1. Read `run.yaml` for the current `run_id`, budgets and pinned agent versions.
2. Read `ledger.jsonl` and keep only lines with that `run_id`. For each `slug`, the **last** line's `to_state` is the business's current state.
3. Map each state to its next station using PLAN.md §4 (`discovered → scored → shortlisted → approved → harvested → copy_drafted → copy_humanised → copy_passed | copy_failed → concepted → mocked → picked → built → optimised → ai_optimised → critiqued(n) → passed | failed → packaged → pitched → outcome:*`).
4. If the next transition is a human gate (`shortlisted → approved`, `mocked → picked`, `packaged → pitched`, or merging anything in `proposals/`), stop and ask. Do not infer approval from files on disk.
5. Otherwise, check that the current state's outputs actually exist on disk (e.g. `harvested` → `dossier/<slug>/dossier.json`). If they are missing or partial, redo that station rather than trusting the ledger line.
6. Work one business at a time. Append a ledger line as each transition completes — after the output is written, never before.
7. An empty ledger means nothing has run: start at Scout for the current `run.yaml`.
