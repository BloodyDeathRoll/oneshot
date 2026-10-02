# Oneshot

Finds local businesses with weak websites, builds each one a better site, and pitches it.
Claude Code agents run the pipeline. Two operators share the repo (`docs/team.md`).

- `PLAN.md`: decisions, pipeline, phases (source of truth)
- `CLAUDE.md`: rules for every Claude Code session
- `ledger.jsonl`: every business state change, append only (`docs/ledger.md`)
- `run.yaml`: current run, budgets, pinned agent versions

## Setup (new clone or worktree)

```bash
npm ci
tools/setup.sh                 # git hooks, links + restores media from ~/.oneshot
node tools/team.mjs whoami     # fails? add your git user.email to team.json
```

Images and video are never in git. They live in `~/.oneshot/assets`, listed in `media/<slug>.tsv`.

## Git

Branches and pull requests only, never push to `main` (`docs/team.md`):

```bash
git switch main && git pull --rebase && git switch -c <operator>/<slug>-<what>
# ...commit...
git push -u origin HEAD && gh pr create
```

## Dashboard

```bash
node dashboard/server.mjs      # http://127.0.0.1:8970, live, records gate decisions
node tools/dashboard.mjs       # or: static dashboard/index.html + data.json
```

Keep it local. To use it from a phone, put it behind Caddy with basic auth or a Cloudflare Tunnel.

## Team

```bash
node tools/team.mjs status [slug]
node tools/team.mjs assign <slug> "<task>" [--to <operator>]
node tools/team.mjs log <slug> "<what changed>"
node tools/team.mjs done <id>
```

## CMS server (Oracle Cloud)

Payload 3 (multi-tenant) + Postgres + publisher + Caddy run in Docker Compose on one
OCI Always Free A1 instance (`oneshot-cms`, Frankfurt). Details: `infra/oci/README.md`, `cms/README.md`.

```bash
ssh -i ~/.ssh/oneshot_cms ubuntu@130.61.212.182
```

- Admin: https://130-61-212-182.sslip.io/admin
- Stack: `~/oneshot/cms` on the box (`docker compose --env-file .env up -d --build --wait`)
- Rebuild and deploy one tenant now: `cd ~/oneshot/cms && ./scripts/publish.sh <tenant-slug>`
- Backups run nightly to OCI Object Storage. Restore with `cms/scripts/restore.sh`.

## Cloudflare

Each site is a static Astro build on its own Cloudflare Worker (no Pages, no Vercel).
The scoped API token is in `~/.oneshot/cf-token` locally and in `cms/.env` on the box.
If you rotate it, update both places.

Managed site, full flow (provision, seed, deploy, verify):

```bash
node deploy/managed/deploy.mjs <slug> [--steps provision,seed,deploy,verify]
```

Manual deploy from this machine (e.g. a proposal page):

```bash
cd sites/<slug>/final && npm ci && npm run build
CLOUDFLARE_API_TOKEN=$(cat ~/.oneshot/cf-token) npx wrangler deploy
```

Other hosting modes: `deploy/self-hosted-docker/`, `deploy/static/`.

## Useful tools

| Command | What |
|---|---|
| `node tools/usage.mjs <run-id>` | agent token cost of a run |
| `node tools/media.mjs status` | media present / missing per business |
| `node tools/clean-shots.mjs` | delete scored review screenshots |
| `node tools/serve-mockups.mjs` | serve every built mockup, one port each |
