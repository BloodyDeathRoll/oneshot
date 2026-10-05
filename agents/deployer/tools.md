# deployer / tools.md — what the agent may call, and how.

version: 0.4.0 — station 8 gains `check`, the post-CMS acceptance suite (`tools/site-check.mjs`), after `verify`; the same tool's smoke subset runs every 6 h on GitHub Actions (2026-10-05). 0.3.0: station 6 is now Preview (static build to `*.workers.dev`, no CMS); the three adapters below run only at station 8 Deliver, after `outcome:sale` and the client's `product_chosen` line (2026-10-05). The `managed` adapter is real code (`deploy/managed/deploy.mjs`, first run 2026-09-25); the other two adapters still follow the Payload spike (`spikes/payload/README.md`).

## Station 6 — Preview (no adapter, no CMS)

| Step | Calls | Evidence |
|---|---|---|
| build | in `sites/<slug>/final/`: `npm run build` as a **preview build** — no production `SITE_URL` (unset, or the `https://<brand>.os1.workers.dev` address; the site's preview rule, `IS_PREVIEW` in `src/lib/site.mjs` on the sites built so far, then writes noindex, a disallow-all `robots.txt` and no sitemap) | build output, `dist/` page list |
| deploy | `npx wrangler deploy` from `sites/<slug>/final/` with the template's own `wrangler.jsonc` (name = the customer's brand slug, no prefix; `workers_dev: true`; `assets.directory: ./dist`; no `main`), logged in to the Oneshot Cloudflare account only (PLAN.md §9) | URL, Worker version id |
| verify | `curl` every page → 200; live HTML of every page byte-identical to `dist/` (e.g. `cmp` / sha256 of each); noindex meta in the live HTML; `robots.txt` disallows all; `/sitemap.xml` → 404 | status codes, hashes, the strings found |

Nothing else: no Payload call, no tenant, no seed, no owner user, no domain, no `sites/<slug>/deploy.json`, no zip. The report's URL and evidence go into the orchestrator's `previewed` line.

## Station 8 — Deliver: the three adapters

The deployer calls exactly one adapter per business, the one named by the `hosting_mode` of the `product_chosen` line. All three implement the same steps with the same names and the same result record (`{step, ok, started, ms, evidence}` appended to `sites/<slug>/deploy.json`).

| Step | managed | self_hosted_docker | static_only |
|---|---|---|---|
| `provision` | tenant in our Payload | compose stack on the client's VPS | skip |
| `seed` | ✓ | ✓ | skip |
| `deploy` | `wrangler deploy` to the site's Worker | build in the stack, Caddy serves | build only |
| `attach_domain` | Cloudflare | DNS → client box, Caddy HTTPS | client's host |
| `verify` | ✓ | ✓ | skip |
| `check` | `site-check.mjs --full` | acceptance (`--full` for this mode not built yet) | acceptance, if we host the files; else skip |
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

Run: `node deploy/managed/deploy.mjs <slug> [--steps provision,seed,deploy,verify,check]` — each step appends its record to `sites/<slug>/deploy.json`. Env overrides: `CMS_URL`, `CMS_SSH`, `CMS_SSH_KEY`, `CMS_REMOTE_DIR`.

| Step | Calls | Evidence |
|---|---|---|
| `provision` | rsync the template to the server (no build products, no photos); REST as super-admin: create `tenants` doc (name, slug), the owner user (email/password generated, role `owner`, `tenants: [tenant]`) and an empty `sites` doc. Idempotent | tenant id, owner user id, site id; password only to the sealed channel `~/.oneshot/sealed/<slug>.json` (mode 600, outside the repo) |
| `seed` | `content.json` → export-format dir → import **as super-admin** (`ratings`, `testimonials` and `forecast.rosaSpotId` are deployer fields an owner cannot write). Photo names = `<slug>-<sha256:8>-<original>`: no clash across tenants (Payload renames clashes), and a re-seed reuses the stored file. Photos of the tenant the site no longer uses are deleted. Photos only with an allowed license note | field keys seeded, gaps, media ids, reused/removed |
| `deploy` | `cms/scripts/publish.sh <slug>` over SSH → publisher `POST /publish {tenant, wait: true}` (the same queue as the CMS hook, so it never overlaps a hook build); `DEPLOY_MODE=live` in `cms/.env`; Worker config = the template's own `wrangler.jsonc` (name = the customer's brand slug, no prefix; `assets.directory: ./dist`, no `main`). Never run `publisher/src/cli.mjs` while the service is up | publish record (buildMs, deployMs, url, version); parity: the CMS-built `index.html` equals a local build of `content.json` (photo names aside); live HTML equals the build, 200, noindex on `*.workers.dev` |
| `attach_domain` | Station 8 only, after the client's `product_chosen` line. Client already owns a domain: we set up its DNS to the Worker. Otherwise Cloudflare Registrar purchase (**human "go"**, billed through to the client), then DNS + custom domain on the Worker via `infra/` scripts | domain, DNS records, HTTPS 200 on the domain |
| `verify` | owner login → change one price (no `priceList` rows: the intro text block) → site rebuilt through the hook → new value in live HTML → restore (also when the edit fails to show); owner `GET /api/sites` returns exactly one doc; owner `GET` another tenant's site → 404; owner sees no foreign media; anonymous reads → 403 and anonymous writes (`POST` sites/tenants/users with an empty body, `PATCH` the site) → 403; owner adding a rating → 400 (put back if it ever succeeds). Code: `deploy/managed/lib/cms.mjs` `ownerPath`, shared with `check` | status codes, strings found, save→live ms |
| `check` | `node tools/site-check.mjs <slug> --full` (below) against the live site — the client's domain once `attach_domain` recorded it, else the Worker | `sites/<slug>/site-check.json` (full report); in `deploy.json`: ok, each check's result, the failures |
| `handoff` | skip (managed clients get `handoff/03-how-to-edit.md` only, filled and translated) | — |
| `export` | optional: static zip of the last build to `dist/<slug>.zip`, static check | zip sha256, pages opened |

Auth on the server: a scoped Cloudflare API token (`Workers Scripts: Edit`, one account) in the publisher's env (decided 2026-09-18). Personal `wrangler login` OAuth is for laptops only.

## The acceptance suite and the monitor — `tools/site-check.mjs`

One tool, three depths; JSON report + short summary; exit 1 on any failure. It never requests a booking-engine host (links are parsed; forms are submitted into a route that aborts the navigation and records the URL), and logs in only with `--full`.

| Depth | Command | Checks |
|---|---|---|
| smoke | `--smoke` | every page (internal links crawled) and asset (src, srcset, poster, `<source>`, lazy `data-*` video sources, CSS `url()` incl. fonts) → 200; no third-party or mixed-content asset in the HTML; booking hand-offs well formed (engine links and GET forms: `start` with `end` or `duration`, real dates, not all in the past, never `end` without `start`; WhatsApp/tel links); Rosa JSON 200 and < 24 h old + widget page 200, when `forecast.enabled`; SEO plumbing — preview (`*.workers.dev`): noindex on every page, robots `Disallow: /`, no sitemap; production (custom domain): no noindex, robots allows and names a same-origin sitemap that serves URLs on that origin |
| acceptance | (default) | smoke, plus Playwright at 390 and 1440 on every page: no console or page errors, no HTTP ≥ 400, no third-party request on first load, no mixed content, no horizontal overflow, no engine request without interaction; booking: `tools/funnel.mjs` hero action vs `dossier/<slug>/audit.json.recommended` (`booking_flow.clicks_to_flow`, or `clicks_to_book`), the hero CTA tapped to the booking page, the booking form filled with first choices and submitted with JS on (390, 1440) and off (390) — the hand-off URL captured, never sent — and checked as above; Rosa block (390, 1440): JSON loaded, headline drawn from fresh data, widget iframe present, block height unchanged and layout shift < 0.01 while it loads; video: every rendition in `src/tenant/videos*.json` and in the HTML 200, container sniffed = extension = declared type = served type, metadata loads in Chromium at the manifest's size (±2 px); reduced motion requests no video on any page; playbook §4 budgets on the home page at 390 under the critics' throttling (1.6 Mbps, 150 ms, 4x CPU): LCP ≤ 2.5 s, CLS < 0.1, first load ≤ 1.5 MB without video, JS ≤ 300 KB, 0 third-party requests. `max_taps_to_engine` stays with the critic's site-specific walk |
| full | `--full` | acceptance, plus the CMS (`managed`; needs `CMS_SSH` and the sealed owner credentials): CMS health (admin 200, API JSON); parity — the CMS-built `index.html` (over SSH) is the live page and equals a local build of the repo's `content.json` (built like the publisher, in a temp copy, with `cms/publisher/site-deps` and the tenant's media downloaded from the CMS; names compared without the seed's `<slug>-<sha256:8>-` prefix; `--no-parity` once the owner has edited content); the owner path as in `verify`; the live HTML byte-identical before and after |

Run it: at station 8 as `check`; **after any CMS server upgrade, `--full` for every tenant** (`cms/README.md`); by hand for any live site (`<slug>` or a URL; `--targets` lists them).

**Monitor:** `.github/workflows/site-monitor.yml` runs `node tools/site-check.mjs --all --smoke` every 6 h and on demand: every site with a `sites/<slug>/deploy.json` (its Worker, and its domain once attached), every preview in the ledger (`previewed`, `delivered`, and the older passed→passed `PREVIEW DEPLOY` lines; a slug whose last line is `void` is dropped), and each CMS's public health. Read-only, no secrets, no browser, no Lighthouse. A failure fails the workflow run; GitHub's failed-run email is the alert.

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
