# deployer / tools.md — what the agent may call, and how.

version: 0.2.0 — the `managed` adapter is real code now (`deploy/managed/deploy.mjs`, first run 2026-09-25); the other two adapters still follow the Payload spike (`spikes/payload/README.md`).

The deployer calls exactly one adapter per business. All three implement the same steps with the same names and the same result record (`{step, ok, started, ms, evidence}` appended to `sites/<slug>/deploy.json`).

| Step | managed | self_hosted_docker | static_only |
|---|---|---|---|
| `provision` | tenant in our Payload | compose stack on the client's VPS | skip |
| `seed` | ✓ | ✓ | skip |
| `deploy` | `wrangler deploy` to the site's Worker | build in the stack, Caddy serves | build only |
| `attach_domain` | Cloudflare | DNS → client box, Caddy HTTPS | client's host |
| `verify` | ✓ | ✓ | skip |
| `handoff` | skip | kit + revoke | zip + developer README |
| `export` | optional | ✓ | ✓ (the deliverable) |

## Shared tools (all adapters)

- **Payload REST** of the target instance. Writes use the super-admin login, read over SSH from the server's `cms/.env` into memory for the run and never written anywhere else; reads for builds use the read-only builder API key (`Authorization: builders API-Key <key>`). Nothing in the CMS is anonymous-readable.
- **`cms/scripts/import-tenant.mjs <dir> --cms <url> --email <e>`** — seeds a site doc (the locales present in the data) + media from an export-format directory; `cms/scripts/export-tenant.mjs <slug> <dir>` produces that format (library: `cms/scripts/lib/tenant-io.mjs`). The seed for a new business converts the critic-passed `sites/<slug>/final/src/tenant/content.json` (itself built from the dossier by the site's `scripts/seed-from-dossier.mjs`) to that format, then runs the same import.
- **Astro build** of the site's own template (`sites/<slug>/final/`, synced to the server's `~/oneshot/sites/<slug>/`) by the publisher: `scripts/fetch-tenant.mjs` (builder key in this step only) → `scripts/photos.mjs` → `astro build`.
- **Static check**: unpack/serve the build with a plain static server, open every page, assert no request leaves for the CMS or Cloudflare.
- **Secret scan** of every file the adapter wrote to the repo before reporting.

## Adapter `managed` — `deploy/managed/`

Target: our multi-tenant Payload (`ONESHOT_PROFILE=multi-tenant`, `cms/docker-compose.yml` on `oneshot-cms`, admin at `https://130-61-212-182.sslip.io/admin` until we own a hostname) + Cloudflare Workers static assets.

Run: `node deploy/managed/deploy.mjs <slug> [--steps provision,seed,deploy,verify]` — each step appends its record to `sites/<slug>/deploy.json`. Env overrides: `CMS_URL`, `CMS_SSH`, `CMS_SSH_KEY`, `CMS_REMOTE_DIR`.

| Step | Calls | Evidence |
|---|---|---|
| `provision` | rsync the template to the server (no build products, no photos); REST as super-admin: create `tenants` doc (name, slug), the owner user (email/password generated, role `owner`, `tenants: [tenant]`) and an empty `sites` doc. Idempotent | tenant id, owner user id, site id; password only to the sealed channel `~/.oneshot/sealed/<slug>.json` (mode 600, outside the repo) |
| `seed` | `content.json` → export-format dir → import **as super-admin** (`ratings`, `testimonials` and `forecast.rosaSpotId` are deployer fields an owner cannot write). Photo names = `<slug>-<sha256:8>-<original>`: no clash across tenants (Payload renames clashes), and a re-seed reuses the stored file. Photos of the tenant the site no longer uses are deleted. Photos only with an allowed license note | field keys seeded, gaps, media ids, reused/removed |
| `deploy` | `cms/scripts/publish.sh <slug>` over SSH → publisher `POST /publish {tenant, wait: true}` (the same queue as the CMS hook, so it never overlaps a hook build); `DEPLOY_MODE=live` in `cms/.env`; Worker config = the template's own `wrangler.jsonc` (name = the customer's brand slug, no prefix; `assets.directory: ./dist`, no `main`). Never run `publisher/src/cli.mjs` while the service is up | publish record (buildMs, deployMs, url, version); parity: the CMS-built `index.html` equals a local build of `content.json` (photo names aside); live HTML equals the build, 200, noindex on `*.workers.dev` |
| `attach_domain` | Only after a sale (ledger `outcome:sale`). Client already owns a domain: we set up its DNS to the Worker. Otherwise Cloudflare Registrar purchase (**human "go"**, billed through to the client), then DNS + custom domain on the Worker via `infra/` scripts | domain, DNS records, HTTPS 200 on the domain |
| `verify` | owner login → change one price (no `priceList` rows: the intro text block) → site rebuilt through the hook → new value in live HTML → restore; owner `GET /api/sites` returns exactly one doc; owner `GET` another tenant's site → 404; owner sees no foreign media; anonymous → 403; owner adding a rating → 400 | status codes, strings found, save→live ms |
| `handoff` | skip (managed clients get `handoff/03-how-to-edit.md` only, filled and translated) | — |
| `export` | optional: static zip of the last build to `dist/<slug>.zip`, static check | zip sha256, pages opened |

Auth on the server: a scoped Cloudflare API token (`Workers Scripts: Edit`, one account) in the publisher's env (decided 2026-09-18). Personal `wrangler login` OAuth is for laptops only.

## Adapter `self_hosted_docker` — `deploy/self-hosted-docker/`

Target: the client's VPS (2 vCPU / 4 GB minimum, Docker) running `docker-compose.self-hosted.yml`: single-tenant Payload (`ONESHOT_PROFILE=single-tenant`) + Postgres (not published) + publisher (`DEPLOY_ADAPTER=local-dir`) + Caddy (automatic HTTPS).

| Step | Calls | Evidence |
|---|---|---|
| `provision` | SSH to the box with our temporary key (box bought by the client, or by us with a human "go"); install Docker if absent; copy `deploy/self-hosted-docker/` to `{{install_dir}}` (default `/opt/oneshot`); `init-env.sh self-hosted` (generates `POSTGRES_PASSWORD`, `PAYLOAD_SECRET`, `PUBLISH_SECRET`, `BUILDER_API_KEY`, `OWNER_EMAIL`, `OWNER_PASSWORD`); `SITE_ADDRESS`, `SERVER_URL=https://…`, `COOKIE_SECURE=true`, binds `0.0.0.0:80/443`; `compose up -d --build --wait`; enable unattended security updates on the host | versions, `docker compose ps` healthy, only Caddy published |
| `seed` | `export-tenant.mjs` from our server if the business was managed, else dossier → export-format; `import-tenant.mjs` as the owner | as managed; report the documented lossy fields |
| `deploy` | a save (or `POST /publish`) → publisher builds → Caddy `current` symlink flips | live HTML on the box |
| `attach_domain` | client's DNS A/AAAA → box (client does it, or Cloudflare via `infra/` if the domain is ours); Caddy obtains the certificate | HTTPS 200 on the domain, certificate issuer |
| `verify` | `server-hardening.md` checks (HTTPS, login rate limit at Caddy, Postgres/CMS/publisher not reachable from outside, pinned versions); owner login + price round trip; `./oneshot backup` then `./oneshot restore <file>` on the box; `./oneshot update` and `./oneshot status` | each check with output |
| `handoff` | fill `handoff/` templates into `sites/<slug>/handoff/<lang>/`, screenshots from the owner's admin; credentials sheet sealed; then **revoke** (human "go"): remove our SSH key from `authorized_keys`, delete any non-owner CMS user, rotate `PUBLISH_SECRET`/builder key, remove our deploy hooks; attempt SSH + CMS login with our old credentials and record the refusal | kit complete, revocation refusals |
| `export` | `dist/<slug>.zip` = last build + `handoff/` + `deploy/self-hosted-docker/` source, static check | zip sha256 |

## Adapter `static_only` — `deploy/static/`

Target: the client's own host; no CMS anywhere.

| Step | Calls | Evidence |
|---|---|---|
| `provision`, `seed`, `verify` | skip | — |
| `deploy` | Astro build from `sites/<slug>/final/` with its local `content.json` (no Payload) | build output, static check |
| `attach_domain` | only if we host the files: Worker + domain as `managed` `deploy`/`attach_domain`; otherwise the client uploads the zip | — |
| `handoff` | `dist/<slug>.zip` = `site/` (built) + `source/` (template, `content.json`, build instructions) + `SOURCE-README.md` for a developer + `handoff/01-your-site.md` and `06-if-it-breaks.md` static variants | zip contents listed |
| `export` | same zip | sha256 |
