# deployer / tools.md — what the agent may call, and how.

version: 0.1.0 — written after the Payload spike (`spikes/payload/README.md`); commands and env names follow it until `deploy/` and `infra/` replace them.

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

- **Payload REST** of the target instance. Writes use a short-lived writer login created for the run; reads for builds use the read-only builder API key (`Authorization: builders API-Key <key>`). Nothing in the CMS is anonymous-readable.
- **`scripts/import-tenant.mjs <dir> --cms <url> --email <owner>`** — seeds a site doc (all locales) + media from an export-format directory; `scripts/export-tenant.mjs <slug> <dir>` produces that format. The seed for a new business is a dossier → export-format conversion (`deploy/lib/dossier-to-content`, to be written) followed by the same import.
- **Astro build** of `sites/<slug>/final/` with `TENANT_SLUG=<slug>` and the builder key in the fetch step only (stripped from the build and deploy child processes).
- **Static check**: unpack/serve the build with a plain static server, open every page, assert no request leaves for the CMS or Cloudflare.
- **Secret scan** of every file the adapter wrote to the repo before reporting.

## Adapter `managed` — `deploy/managed/`

Target: our multi-tenant Payload (`ONESHOT_PROFILE=multi-tenant`, `docker-compose.yml`) + Cloudflare Workers static assets.

| Step | Calls | Evidence |
|---|---|---|
| `provision` | REST as super-admin: create `tenants` doc (name, slug), create the owner user (email/password generated, role `owner`, `tenants: [tenant]`), one-time writer login for seeding | tenant id, owner user id; password only to the sealed channel |
| `seed` | dossier → export-format dir → `import-tenant.mjs` as the owner; photos only with an allowed license note | field keys seeded, gaps, media ids |
| `deploy` | publisher `POST /publish {tenant}` with `PUBLISH_SECRET`, or `publisher/src/cli.mjs <slug>` with `DEPLOY_MODE=live`; Worker name `<prefix>-<slug>` (prefix: open question, spike used `oneshot-spike-`); config = `name`, `compatibility_date`, `assets.directory`, no `main` | publish log line (buildMs, deployMs, url), `*.workers.dev` URL opened → 200 |
| `attach_domain` | Cloudflare: Registrar purchase (**human "go"**, billed through to the client), DNS + custom domain on the Worker via `infra/` scripts | domain, DNS records, HTTPS 200 on the domain |
| `verify` | owner login → change one price → site rebuilt through the hook → new value in live HTML → restore; owner `GET /api/sites` returns exactly one doc; owner `GET` another tenant's site → 404; anonymous → 403 | status codes, strings found, save→live ms |
| `handoff` | skip (managed clients get `handoff/03-how-to-edit.md` only, filled and translated) | — |
| `export` | optional: static zip of the last build to `dist/<slug>.zip`, static check | zip sha256, pages opened |

Auth on the server: a scoped Cloudflare API token (`Workers Scripts: Edit`, one account) in the publisher's env — **open question 6 in the spike README; personal `wrangler login` OAuth is for laptops only.**

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
