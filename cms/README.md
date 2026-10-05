# cms/ — the one Payload app, its publisher and the production stack for the managed hosting mode.

One codebase, two profiles, selected by one env var (`ONESHOT_PROFILE`, read only in `app/src/lib/profile.ts`):

- **multi-tenant** — our server. Official multi-tenant plugin on, one tenant per business, owner logins scoped to their tenant. Used by the `managed` hosting mode. Stack: `docker-compose.yml`.
- **single-tenant** — a client's own box. Tenants plugin disabled, exactly one admin user (the owner). Used by the `self_hosted_docker` hosting mode (its stack still lives in `spikes/payload/docker-compose.self-hosted.yml`).

Both profiles have the same collections, the same content schema (`schemas/site-content.md`, v0.9; fields in `app/src/collections/Sites.ts`) and give the site templates the same API shape. A change that would make the profiles diverge is out of scope (PLAN.md §1, "One of everything"). Grown from `spikes/payload/` (see its README for the proofs); the spike stays as it was.

| Dir | What |
|---|---|
| `app/` | Payload 3 (Next standalone). Per-profile migrations (`src/migrations/<profile>/`) run on boot; a schema change needs one per profile: `ONESHOT_PROFILE=<profile> npx payload migrate:create <name>` against a database migrated to the previous one. |
| `publisher/` | Tiny HTTP service the CMS hook calls. Builds ONE tenant from ITS OWN template (`TEMPLATES_ROOT/<tenant>` = the repo's `sites/<slug>/final`, synced by `deploy/managed/deploy.mjs`), then `wrangler deploy` with that template's `wrangler.jsonc`. Between the template's fetch and photo steps it runs its own `src/video.mjs` (owner video → web renditions with ffmpeg, cached in the `publisher_data` volume; schema v0.9). `site-deps/` = astro + sharp shared by every template. |
| `caddy/` | The only published service: HTTPS (sslip.io hostname until we own a domain), per-IP rate limit on login/reset. |
| `scripts/` | `init-env.sh`, `backup.sh` (nightly via `install-backup-cron.sh`, off-box to OCI Object Storage), `restore.sh`, `publish.sh`, tenant `export-/import-tenant.mjs`. |

On the server (`~/oneshot/cms`, see `infra/oci/README.md`):

```bash
./scripts/init-env.sh                                   # once: cms/.env with generated secrets (mode 600)
docker compose --env-file .env up -d --build --wait
./scripts/install-backup-cron.sh
./scripts/publish.sh <tenant-slug>                      # rebuild + deploy one tenant now
```

Live deploys need `DEPLOY_MODE=live` and `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` in `cms/.env` (a scoped token, Workers Scripts:Edit on the Oneshot account only). A copy of the same token lives on the operator machine at `~/.oneshot/cf-token` (mode 600, never in the repo; Shahar, 2026-09-28) for deploys run from there, such as the proposal pages: `CLOUDFLARE_API_TOKEN=$(cat ~/.oneshot/cf-token) npx wrangler deploy`. Rotating it means updating both places.

**After any CMS server upgrade** (Payload, Postgres, the publisher, Caddy, the site-deps, the box itself), run the post-CMS acceptance suite for every tenant before calling the upgrade done (deployer `tools.md`, 2026-10-05):

```bash
for s in $(node -e "for (const f of require('fs').readdirSync('sites')) { try { const d = require('./sites/' + f + '/deploy.json'); if (d.adapter === 'managed') console.log(f) } catch {} }"); do
  node tools/site-check.mjs "$s" --full --no-parity || echo "FAILED: $s"
done
```

`--full` logs in as each owner, makes one edit, publishes it and puts it back (the live HTML is compared byte for byte before and after); `--no-parity` because an owner's own edits make the CMS build differ from the repo's `content.json` on purpose — drop it for tenants nobody has edited. Between upgrades, `.github/workflows/site-monitor.yml` checks this server's public health (`/admin`, `/api/users/me`) and every live site every 6 h.
