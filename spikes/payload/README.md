# Spike — Payload multi-tenant → Astro → Cloudflare Workers (+ single-tenant self-hosted profile)

Phase 1 spike for PLAN.md §6. Run 2026-09-17/18 on a Linux dev box (32 cores, 125 GB — **not** the target hardware; see Footprint). Every claim below is marked **[tested]** (run here, from clean), **[cited]** (URL) or **[untested]**.

**Result in one paragraph.** One Payload 3 config, one Astro template, one publisher and one content schema run in two hosting profiles selected by `ONESHOT_PROFILE`. *multi-tenant* (our server): two tenants, owners scoped to their tenant in REST and in the admin UI, a save rebuilds only that tenant's site and runs `wrangler deploy --dry-run` for that tenant's Worker — save → built + dry-run in **3.2 s** [tested]. *single-tenant* (a client's own box): same images with the plugin off, one owner user, Caddy serving the rebuilt site — save → live in **2.3 s** [tested]. A tenant moves from the first to the second with an export/import script, losslessly for content and photos [tested]. 29/29 and 14/14 end-to-end checks pass from clean. **No live Cloudflare deploy was made**; the switch is one command (below).

Content schema v0.1: [`/schemas/site-content.md`](../../schemas/site-content.md) (the contract; field table, REST shape, profile difference).

## Exact versions

| Thing | Version | Where pinned |
|---|---|---|
| Payload, `@payloadcms/next`, `db-postgres`, `plugin-multi-tenant`, `ui` | 3.89.0 | `cms/package.json` (exact) + lockfile |
| Next.js / React | 16.3.5 / 19.2.6 | same |
| sharp | 0.35.4 | `cms/`, `site/` |
| Astro | 7.3.3 | `site/package.json` |
| Wrangler | 4.134.0 (devDependency, never global) | `publisher/package.json` |
| Node (containers) | `node:24.21.0-bookworm-slim` | both Dockerfiles |
| Postgres | `postgres:17.11-alpine3.24` | compose files |
| Caddy (self-hosted only) | `caddy:2.11.4-alpine` | `docker-compose.self-hosted.yml` |
| Host used for the run | Docker 29, Compose v5, Node 24.14.0, npm 11 | – |
| Headless browser for UI checks | playwright-core 1.62.1 + its Chromium from `~/.npm/_npx` / `~/.cache/ms-playwright` (found locally, nothing installed) | – |

`npm audit`: `site/` and `publisher/` 0 findings; `cms/` 7 (1 low, 6 moderate), all the dev-server `esbuild` advisory GHSA-67mh-4wv8-2f99 pulled in by `drizzle-kit` via `@payloadcms/db-postgres` — no fix available upstream, not reachable in the production image [tested 2026-09-17].

## Layout

```
cms/         Payload 3 app. src/lib/profile.ts = the ONE switch; collections Sites, Media, Tenants, Users, Builders;
             hooks (notifyPublisher, enforceOwnTenant); per-profile migrations; Dockerfile (Next standalone)
site/        the ONE Astro template. scripts/fetch-tenant.mjs (pre-build pull) + src/pages/[...locale].astro + 404
publisher/   tiny Node HTTP service (zero runtime deps): queue.mjs, publish.mjs (adapters: cloudflare | local-dir), cli.mjs
seed/        fixtures/ (two fictional tenants, synthetic photos) + seed.mjs
scripts/     init-env.sh, export-tenant.mjs, import-tenant.mjs, host-publisher.sh, footprint.sh, selfhosted-{backup,restore,update}.sh
caddy/       Caddyfile for the self-hosted stack
test/        e2e-multi-tenant.mjs, e2e-self-hosted.mjs, run-*.sh (from clean); publisher/test = queue unit tests
docker-compose.yml               multi-tenant: postgres + cms + publisher(cloudflare adapter, dry-run)
docker-compose.self-hosted.yml   single-tenant: postgres + cms + publisher(local-dir adapter) + caddy
```

## Run from clean

Multi-tenant (our server):

```bash
cd spikes/payload
./scripts/init-env.sh                       # writes .env (git-ignored, mode 600) with generated secrets
docker compose up -d --build --wait         # postgres (not published) + cms on 127.0.0.1:3100 + publisher (not published)
node --env-file=.env seed/seed.mjs          # 2 tenants, 1 owner each → passwords only in seed/credentials.json (git-ignored)
# admin: http://localhost:3100/admin   super-admin = SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD in .env
docker compose logs -f publisher            # one JSON line per publish: tenant, triggers, buildMs, deployMs, totalMs
node --env-file=.env test/e2e-multi-tenant.mjs
docker compose down -v                      # stop and delete this spike's volumes
```

Everything above in one go, wiping first: `./test/run-multi-tenant.sh [--down]`. Self-hosted equivalent: `./test/run-self-hosted.sh [--down]` (needs `exports/wobbly-pelican`, otherwise falls back to the seed fixture). Publisher unit tests: `cd publisher && npm test`.

Host prerequisites for the scripts that run on the host (seed, tests, export/import): Node ≥ 22, nothing to install. For the host-mode publisher / live deploy: `npm ci` in `site/` and `publisher/`.

### Switching to a LIVE Cloudflare deploy (not done in this spike)

Default everywhere is `DEPLOY_MODE=dry-run` (`wrangler deploy --dry-run`). With the multi-tenant stack up and seeded:

```bash
# ONE command, one-shot, uses the host's existing `wrangler login` OAuth session:
cd spikes/payload/publisher && DEPLOY_MODE=live node --env-file=../.env src/cli.mjs wobbly-pelican lazy-turtle
```

The identical command without `DEPLOY_MODE=live` was run here and passes (build + dry-run for both tenants) [tested]. It creates Workers `oneshot-spike-wobbly-pelican` and `oneshot-spike-lazy-turtle` on `*.workers.dev`; the URL is parsed from wrangler's output into the log record's `url` [untested — regex never saw real output]. `wrangler whoami` (read-only) confirms the host OAuth session works non-interactively with `CI=1`, has `workers (write)` and exactly one account, so no `account_id` is needed [tested]. Remove afterwards with `npx wrangler delete --name oneshot-spike-<slug>`.

Hook-driven live publishing (every owner save deploys):

- on the host, OAuth: `./scripts/host-publisher.sh live` — stops the compose publisher, re-points the CMS hook at the host via `host.docker.internal`, runs the publisher bound to the Docker bridge address (172.17.0.1 here, not a LAN interface). Tested end to end in `dry-run` mode [tested]; `live` [untested]. `docker compose up -d` restores the compose publisher.
- in compose, API token: set `DEPLOY_MODE=live`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` in `.env`, then `docker compose up -d publisher` [untested].

## Architecture of the publish flow

```
owner saves "My site" / a photo in Payload admin (or REST)
  └─ collection hook  afterChange / afterDelete  on `sites` and `media`          cms/src/hooks/notifyPublisher.ts
       fire-and-forget (never awaited, 5 s timeout, errors only logged) ──► POST publisher /publish
                                                                           { tenant: "<slug>", trigger: "sites.update" }
                                                                           Authorization: Bearer PUBLISH_SECRET
publisher (publisher/src)
  1. auth (constant-time compare) → slug regex → queue
  2. queue: per-tenant debounce (DEBOUNCE_MS=1500) → bursts collapse; a save during a build sets ONE pending flag →
     exactly one more build; builds are serial across tenants (FIFO)
  3. site/scripts/fetch-tenant.mjs   TENANT_SLUG + read-only builder API key → src/tenant/content.json + photos
  4. astro build                     → site/.build/<slug> → copied to OUT_ROOT/<slug>/dist (swapped in only on success)
  5. deploy adapter
       cloudflare: write OUT_ROOT/<slug>/wrangler.jsonc {name: oneshot-spike-<slug>, compatibility_date,
                   assets.directory: ./dist, no `main`} → wrangler deploy [--dry-run]
       local-dir : copy to WEB_ROOT/releases/<stamp>, atomically flip the WEB_ROOT/current symlink (Caddy root)
  6. one JSON log line + OUT_ROOT/publish-log.jsonl: tenant, triggers[], adapter, mode, buildMs, deployMs, totalMs, ok/error
```

**Auth decisions.** Nothing in the CMS is publicly readable — anonymous REST and media-file requests get 403 [tested]. The build uses a **read-only builder API key**: a separate auth collection `builders` (`useAPIKey`, `disableLocalStrategy`), header `Authorization: builders API-Key <key>`; it can read `sites`, `media`, `tenants` for every tenant and cannot write anything or read users [tested]. The key and the first admin user are provisioned at first boot from env (`cms/src/lib/bootstrap.ts`), which also closes Payload's "first user may self-register" window (`/api/users/first-register` → 403) [tested]. API keys are encrypted with `PAYLOAD_SECRET`; rotating the secret invalidates them [cited: https://payloadcms.com/docs/authentication/api-keys]. The builder key is handed to the fetch step only and stripped from the `astro build` and `wrangler` child environments; `CLOUDFLARE_*` is stripped from the build.

## Two profiles, one codebase

`ONESHOT_PROFILE=multi-tenant` (default) | `single-tenant` — read in exactly one place, `cms/src/lib/profile.ts`. Hosting mode is a deploy adapter of the one publisher (`DEPLOY_ADAPTER=cloudflare | local-dir`), never a fork.

| | multi-tenant (`docker-compose.yml`) | single-tenant (`docker-compose.self-hosted.yml`) |
|---|---|---|
| multi-tenant plugin | enabled | `enabled: false` — no tenant field, no selector, no tenant columns in the DB |
| collections | sites, media, tenants, users, builders | sites, media, users, builders (`/api/tenants` → 404) |
| users | super-admins + owners (exactly one tenant each) | exactly **one** user, the owner, bootstrapped from `OWNER_EMAIL`/`OWNER_PASSWORD`; create/delete/role change impossible through any API |
| `sites` | one doc per tenant (plugin `isGlobal`), created by super-admin | singleton; the owner may create it once |
| DB migrations | `cms/src/migrations/multi-tenant` | `cms/src/migrations/single-tenant` (schemas differ by the tenant columns) |
| publisher adapter | `cloudflare` (wrangler) | `local-dir` (image built with `WITH_WRANGLER=false`) |
| published ports | cms `127.0.0.1:3100` | caddy `127.0.0.1:8180` (+8543) only |
| template, content fields, REST shape | identical | identical minus the `tenant` key; the query difference lives in `resolveScope()` in `site/scripts/fetch-tenant.mjs` |

Same CMS image (`oneshot-spike-cms:0.1.0`) in both stacks [tested].

Self-hosted quick start:

```bash
./scripts/init-env.sh self-hosted                                   # writes .env.self-hosted
docker compose -f docker-compose.self-hosted.yml --env-file .env.self-hosted up -d --build --wait
# import a tenant exported from the multi-tenant server (or a seed fixture):
node --env-file=.env scripts/export-tenant.mjs wobbly-pelican exports/wobbly-pelican      # needs the multi-tenant stack up
set -a; . ./.env.self-hosted; set +a
IMPORT_PASSWORD="$OWNER_PASSWORD" node scripts/import-tenant.mjs exports/wobbly-pelican --cms "$SERVER_URL" --email "$OWNER_EMAIL"
# site: http://localhost:8180/   admin: http://localhost:8180/admin
```

**Real domain** (what changes; [untested] here, behaviour [cited: https://caddyserver.com/docs/automatic-https]): in `.env.self-hosted` set `SITE_ADDRESS=example.com`, `HTTP_BIND=0.0.0.0:80`, `HTTPS_BIND=0.0.0.0:443`, `SERVER_URL=https://example.com`, `COOKIE_SECURE=true`; point DNS at the box; open 80/443. Caddy then obtains and renews the certificate itself (state in the `caddy_data` volume). Locally the stack runs plain HTTP on `127.0.0.1:8180` (`SITE_ADDRESS=:80`).

One-command operations for the self-hosted stack (all [tested] in `test/e2e-self-hosted.mjs`):

| | Command | Measured |
|---|---|---|
| backup | `./scripts/selfhosted-backup.sh [dir]` → `db.dump` (`pg_dump -Fc`) + `media.tgz` + `backup.meta` (sha256) — safe while live | 0.3 s |
| restore | `./scripts/selfhosted-restore.sh <dir>` — stops cms+publisher, `pg_restore --clean --single-transaction`, replaces media, restarts, rebuilds. Destructive. | 18 s (restored site live 20.6 s after start) |
| update | `git pull && ./scripts/selfhosted-update.sh` — pre-update backup, `build --pull`, `up -d`, migrations on boot (`prodMigrations`), rebuild site | 2.4 s with nothing changed (warm layer cache); a real update = image build time [untested] |

Restore test: backup → rename the business + delete a photo (row and file) → restore → name, 3 photos, the deleted file and the live site all came back [tested].

### Moving a tenant: multi-tenant → single-tenant

`scripts/export-tenant.mjs` (read-only builder key) writes `manifest.json`, `site.json` (all locales), `media.json`, `media/*`; `scripts/import-tenant.mjs` logs in as a writer, uploads media, creates/overwrites the site doc in `en`, then patches `si` re-using Payload's array row ids. The seed fixtures use the same format, so seeding = importing.

Round trip export(multi) → import(single) → export(single): `site.json` identical in both locales, `media.json` identical, photos byte-identical [tested].

**Lossy / not carried:** document ids, array row ids, `createdAt`/`updatedAt`; users and passwords (the owner gets a new login on the new box); the builder key and all secrets; media `focalX/focalY` (defaults again); media docs not referenced by `photos[]` (unused uploads are skipped); filenames change if the target already has the same name (reported as `renamed`, none occurred); no versions/drafts exist to lose. Import into a non-empty target overwrites the site doc but does not delete old media [untested beyond the empty-target case]. single → multi import works through the same script with `--tenant <slug>` [tested only via the seed path].

## Test results (from clean, 2026-09-17, `test/run-multi-tenant.sh` then `test/run-self-hosted.sh`)

### Multi-tenant — 29 passed, 0 failed, 0 skipped

Isolation, owner A = `wobbly-pelican`, tenant B = `lazy-turtle`, all via REST unless noted:

| Check | Result |
|---|---|
| anonymous: `sites, media, tenants, users, builders` | 403 ×5; media file 403; `first-register` 403 |
| A lists sites / media / tenants / users | 1 own doc / 3 own photos, 0 foreign / 1 own tenant / 1 user (self) |
| A reads `builders` | 403 |
| A filters `where[tenant][equals]=B` | 0 docs |
| A reads B's site / media doc / media file | 404 / 404 / 403 |
| A updates B's site / media | 403 / 403; bulk update by query → 200 with nothing matched; B verified unchanged |
| A deletes B's site / media | 403 / 403; bulk delete → 200 with nothing matched; B verified intact |
| A sets own `role: super-admin` | 200 but field ignored (field-level access) — role still `owner` |
| A sets own `tenants` to B, or to A+B | 200 but ignored — still `[A]` |
| A moves own site / photo to tenant B | 403 / 403 |
| A uploads a photo with `tenant: B` | 403, nothing stored |
| A creates user / tenant / second site; deletes or renames own tenant | 403 ×5 |
| builder key | reads both tenants (200); write 403; users 403 |
| `javascript:` URL in `mapUrl` | 400 (validation) |
| admin UI as A (headless Chromium) | dashboard shows only "My site" + "Photos"; `/admin/collections/sites` redirects to A's doc; media list shows only `pelican-*`; B's site URL shows nothing of B; `/admin/collections/tenants` → 404; no tenant selector |
| admin UI as super-admin | both businesses listed |

Publish flow:

| Check | Result |
|---|---|
| A changes a price | save answered in **30 ms** (hook does not block); only A rebuilt; new price in A's `index.html` and `si/index.html`; B's build counter unchanged and B's output byte-identical (sha256 over all files + dir mtime) |
| 5 saves in a row | 1 build, last value wins |
| A edits a photo's alt text (`media.afterChange`) | A rebuilt with the new alt; B not rebuilt |
| built site | no CMS URLs, images are local `/_astro/*` avif+webp+jpeg, `wa.me` CTA present |
| publisher without / with wrong secret, `/status` without secret, path-like slug | 401 / 401 / 401 / 400; nothing queued |
| exposure | Postgres and publisher: no host port bindings; cms bound to 127.0.0.1 only |

Login protection (what Payload offers): `auth.maxLoginAttempts: 5`, `lockTime: 10 min` → 6 wrong passwords answered 401, then the **correct** password is refused: "This user is locked due to having too many failed login attempts." [tested]. It is per account, **not per IP**: 12 failed logins for unknown emails from one IP all got 401, never 429 [tested] — IP throttling has to come from the reverse proxy.

Publisher queue unit tests (`publisher/test/queue.test.mjs`): burst → one build; saves during a build → exactly one more; two tenants never build concurrently — 3/3 pass [tested].

### Self-hosted single-tenant — 14 passed, 0 failed, 0 skipped

Round trip lossless · exactly one user (REST = 1, `SELECT count(*) FROM users` = 1, role owner) · second user / first-register / self-delete / role escalation all refused · no tenants collection, table or column, no `tenant` key in REST docs · REST keys match the schema · second site doc 403 · anonymous REST through Caddy 403 · Caddy: `/` 200, `/si/` 200, hashed asset 200 with `immutable`, unknown path 404 (template's 404 page), `/admin/login` 200 · only Caddy has host port bindings (127.0.0.1); nothing answers on host 4100/3000 · publisher 401 without secret · price change live on Caddy · admin UI: no tenant selector/field, no Businesses/Users/Builders screens, site form loads · backup/restore · update.

Not tested: tenant deletion cascade (`cleanupAfterTenantDelete`), password reset e-mails (no mail adapter configured), uploads near the 8 MB limit, real phone-camera photos, ARM64 images, anything on Cloudflare.

## Timings

Measured on the dev box (fast, 32 cores); 3 synthetic photos (20–30 KB each) per tenant.

| | multi-tenant → wrangler dry-run | self-hosted → Caddy |
|---|---|---|
| owner's save answered | 30 ms | 22 ms |
| debounce (configurable `DEBOUNCE_MS`) | 1500 ms | 1500 ms |
| fetch + `astro build`, warm image cache | 615 ms | 640 ms |
| fetch + `astro build`, cold (first build of a tenant: 17–23 image variants incl. AVIF) | 2.5–2.7 s | 2.7 s |
| deploy step | 513 ms (`wrangler deploy --dry-run`) | 5 ms (symlink flip) |
| **save → built / live, end to end** | **3.2 s** | **2.3 s** |
| same build with the publisher capped at 2 CPUs / 1 GB (`docker update`) | cold 3.0 s, warm 0.68 s, no OOM | – |

What a live deploy adds [untested]: the dry-run already covers config parsing and reading the assets directory; live adds the asset-manifest upload (only changed files are uploaded) and the Worker version deploy — expect single-digit seconds, more on first deploy. PLAN's "live in ~1 minute" looks comfortable but is unproven until the parent's live run. Real photos (3–8 MB each, 10–20 per site) will make the *cold* build much slower than here; warm rebuilds only re-encode changed photos because Astro's image cache persists per tenant (`node_modules/.astro-cache/<slug>`, lost when the publisher container is recreated).

## Footprint

`scripts/footprint.sh`, idle = after the test run, 3 samples 5 s apart; peak = cgroup `memory.peak` since container start (includes page cache, so it overstates) [tested].

| Container | multi-tenant idle | peak | self-hosted idle | peak |
|---|---|---|---|---|
| cms (Payload/Next) | 88–172 MiB | 193 MiB | 69–70 MiB | 103 MiB |
| postgres | 32–49 MiB | 105 MiB | 37–39 MiB | 100 MiB |
| publisher | 26–28 MiB | 785 MiB (during builds + wrangler) | 24–27 MiB | 438–794 MiB (during builds) |
| caddy | – | – | 21 MiB | 27 MiB |
| **total** | **≈ 150–250 MiB idle** | ≈ 1.1 GiB worst case | **≈ 155 MiB idle** | ≈ 0.7–1.0 GiB |

CPU idle ≈ 0 % for every container; one warm rebuild costs 1.3 CPU-seconds in the publisher.
Images: cms 300 MB · publisher 650 MB (with wrangler) / 419 MB (self-hosted, without) · postgres 297 MB · caddy 63 MB. Volumes after the run: pg_data 51 MB, media + builds < 1 MB.

Against the targets: Hetzner **CX23 = 2 vCPU, 4 GB RAM, 40 GB NVMe, 20 TB traffic** [cited: https://www.hetzner.com/cloud/cost-optimized/ — price not shown on the page when fetched]. OCI Always Free: **Ampere A1 up to 2 OCPU / 12 GB** total, or 2× AMD micro with 1/8 OCPU / 1 GB; idle A1 instances may be reclaimed when CPU, network and memory stay under 20 % for 7 days [cited: https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm]. Both stacks fit a 2 vCPU / 4 GB box with ~3 GB to spare at idle; the publisher's build peak is the number to watch, and it is serial by design. The 1 GB AMD micro is too small for builds. A1 is ARM64 — all base images are multi-arch but this spike only ran on amd64 [untested]; our idle stack would also trip OCI's idle-reclaim rule.

## What worked / what didn't / surprises

Worked [tested]:
- The official plugin enforces tenant scoping in **both** REST and admin for `create/read/update/delete/readVersions/unlock`, including the tenants and users collections, with no custom access code beyond role checks. `isGlobal: true` gives owners a single "My site" document with a redirect from the list view.
- Two defence-in-depth additions were still worth it: a `beforeValidate` hook that pins an owner's writes to their own tenant (also lets REST clients omit `tenant`), and a narrower `users.read/update` rule (the plugin's own rule is "self OR same tenant" — read in its source, `utilities/withTenantAccess.ts` — which would show co-owners once a tenant has two users).
- Payload localization (`en`, `si`, fallback) with localized fields inside arrays; writing `si` by PATCHing with the row ids from the `en` write keeps both locales [tested by the lossless round trip].
- `payload migrate:create` needs **no database connection**, so per-profile migrations were generated offline and run on container boot via `prodMigrations` [cited: https://payloadcms.com/docs/database/migrations].
- Payload without `@payloadcms/richtext-lexical` (no rich-text fields) builds and runs fine; smaller image.
- Assets-only Worker config — `name`, `compatibility_date`, `assets.directory`, no `main` — passes `wrangler deploy --dry-run` ("Read 29 files from the assets directory") [tested; config shape cited: https://developers.cloudflare.com/workers/static-assets/]. Static asset requests are free and unlimited [cited: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/].

Surprises / things that bit [all tested]:
1. **Astro 7 moves build output with `rename()`** → `EXDEV: cross-device link not permitted` when `outDir` is a Docker volume. Fix: build inside the site dir (`site/.build/<slug>`), then copy to the out dir.
2. **`import.meta.url` points into the build output** in Astro's prerender chunks, so reading `../tenant/content.json` relative to it fails at build time. Fix: `import.meta.glob(..., { eager: true })`.
3. **Payload returns absolute media URLs** built from `SERVER_URL` (`http://localhost:3100/...`), which is wrong from inside the compose network. Fix: the fetch/export helpers keep only the path.
4. A stray host-side `site/.build/` got copied into the publisher image root-owned and broke every build with "Permission denied" — caught only by the from-clean run. Fix: `.dockerignore` + the Dockerfile creates the dir for the `node` user.
5. Role/tenant escalation attempts return **200** with the protected fields silently ignored (field-level access), not 403. Correct but easy to misread in logs; the tests assert on stored state.
6. Bulk `PATCH/DELETE ?where=…` against another tenant returns 200 with zero affected docs (not 403).
7. Media filenames are unique per CMS instance, not per tenant: owner B uploading `pelican-lineup.jpg` gets `pelican-lineup-1.jpg` — a (very) minor cross-tenant information leak and a reason not to rely on filenames.
8. afterChange hooks run **before** the request's transaction commits; an immediate build could read stale data. The publisher's debounce (1.5 s) is what makes this safe. [reasoned, race itself not reproduced]
9. The owner dashboard briefly renders "Locale: undefined" before hydration (cosmetic, Payload UI).
10. In single-tenant mode `sites` is an ordinary collection, so the owner sees a one-row list before the form (the redirect is a plugin feature).
11. `.gitignore` `media/` also matched `seed/fixtures/*/media/` — fixed; **the fixture JPEGs must be committed** or a fresh clone cannot seed.

Didn't / not done: live Cloudflare deploy (by instruction); custom domains; e-mail (password reset prints to the CMS log); per-IP login throttling.

## Production would need, beyond the spike

- **HTTPS + reverse proxy** in front of the multi-tenant CMS (Caddy as in the self-hosted stack), `COOKIE_SECURE=true`, `SERVER_URL=https://…`; **per-IP rate limit on `/api/users/login`** at the proxy (Payload only locks accounts; stock Caddy has no rate-limit module — needs a plugin build, or nginx/Cloudflare in front).
- **Backups per PLAN §6**: nightly `pg_dump` + media to object storage. `selfhosted-backup.sh` is the working core for both stacks; missing: schedule, off-box upload, retention, restore drill.
- **Where builds run**: fine on the CMS box at this size (serial, ~0.8 GiB peak). Give the publisher a memory limit so a build can never starve Payload/Postgres; move builds off-box if tenants × photos grows.
- **Build concurrency**: serial by design (the template dir holds per-build tenant data). Parallel builds need a per-build working copy. Publisher state is in memory: a restart forgets queued builds — add a "rebuild all / rebuild stale" sweep on start.
- **Secrets**: `.env` files are fine for the spike; production wants a scoped Cloudflare API token (Workers Scripts:Edit on one account) instead of personal OAuth, secret rotation procedure (`PAYLOAD_SECRET` rotation invalidates API keys), and sealed owner-password handoff.
- **E-mail adapter** (password reset, owner invites); without it a locked-out single-tenant owner can only wait 10 minutes.
- **Monitoring**: publish failures are only log lines today — alert on `ok:false`, surface "last published" to the owner in the admin.
- Pin base images by digest, image registry + CI build instead of building on the box, unattended security updates on the host.
- Self-hosted handoff still missing: real-domain/TLS run, e-mail, off-box backup target, an update channel (registry images + changelog), a documented support boundary, admin on a separate hostname if the client wants `/admin` off the public site.

## Open questions for Shahar

1. **Text model**: v0.1 is plain text in four fixed slots (`intro/about/offer/info`). Enough for the three template variants, or do the "interactive/unique" designs need richer structures (services/lessons as items, testimonials, rich text)?
2. **Opening hours**: day-set + open/close rows, unlisted days = closed, one free-text note. Do we need seasons (monsoon / high season) and one-off closures in v0.2?
3. **Currencies and languages** are closed lists (LKR/USD/EUR; en/si). Add Tamil / German / Russian now, or per run?
4. **Sinhala**: all `si` strings (template labels and fixture content) are machine-written placeholders — who reviews?
5. **Owner users**: exactly one owner per tenant today. Do some businesses need two logins (owner + manager)?
6. **Live deploy auth**: personal `wrangler login` OAuth on a laptop vs a scoped API token inside the publisher container on the server — the second is what the PLAN's "save → live" flow needs in production. OK to create that token?
7. **Worker naming** `oneshot-spike-<slug>` for the spike; production prefix? (The `*.workers.dev` URL is the pitch preview link, so the name is client-visible.)
8. **Debounce**: 1.5 s feels instant but deploys on every save. Would you rather have an explicit "Publish" button (drafts) so owners can make several edits before going live?
9. **Self-hosted profile**: is `/admin` on the client's own domain acceptable, or should it live on `admin.<domain>`? And who holds the client's backups?
10. **OCI free tier**: current Always Free A1 is 2 OCPU / 12 GB, ARM64, with idle reclamation — is that box still a candidate, or Hetzner CX23 only?

## Cleanup state after this spike

Both stacks were brought down with `down -v` (no containers, networks or volumes left). Left on the machine: the three built images `oneshot-spike-cms:0.1.0`, `oneshot-spike-publisher:0.1.0`, `oneshot-spike-publisher:0.1.0-selfhosted` and the pulled `postgres:17.11-alpine3.24` and `caddy:2.11.4-alpine` (remove with `docker image rm …` if unwanted; BuildKit cache holds the Node base layers); git-ignored `.env`, `.env.self-hosted`, `test/output/` (logs, JSON results, admin screenshots) and `node_modules/`. No other container or image was touched.
