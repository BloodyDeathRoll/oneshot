# Oneshot — Project Plan

Find surf businesses along a defined stretch of coast that have no or weak websites, harvest everything public about them, one-shot a new site + CMS from a tuned prompt, and pitch it. Every agent is a versioned prompt that improves after each run: the critic proposes diffs, a human approves.

Workflow graph: Figma → Workflows file → `workflows` page → frame `oneshot-workflow`.

---

## 1. Decisions so far

| Topic | Decision |
|---|---|
| Repo | Own VS Code project, own git repo (`oneshot`) |
| Runtime | Claude Code headless, one business at a time; disk is the memory (ledger + files), no daemon, no DB |
| Area definition | Anchor points + shore buffer (see §3) |
| Site output | Every client site is a static **Astro** build that pulls its tenant's content from Payload's API at build time. Design lives in the Astro template (this is where the designer's canvas/WebGL, editorial grids and booking drawers go); editable content (hours, prices, photos, copy blocks, contact, booking links) lives in Payload. **Not WordPress.** |
| CMS | One CMS for all client sites, run by us: Payload CMS 3 with the official multi-tenant plugin, Postgres, Docker Compose, on one VPS (Hetzner CX23 or our OCI free-tier box — env-configurable). One tenant per business. Each owner gets an email/password login scoped to their tenant only. |
| Hosting | Cloudflare Workers with static assets, one Worker per site, deployed with Wrangler, custom domain per site via Cloudflare. **Not** Cloudflare Pages (being folded into Workers). **Not** Vercel or GoDaddy. |
| Domains | Cloudflare Registrar, one per client, billed through to the client. |
| Publish flow | Owner saves in Payload → `afterChange` hook → rebuild only that tenant's site → `wrangler deploy` → live in ~1 minute. |
| Export | Any client can receive their static build as a zip that runs on any host (GoDaddy included). Optional handoff, not the deliverable; replaces the old per-site-CMS-in-a-zip idea. |
| Commercial default | "We host it, you edit it, monthly fee." The pitch reflects this. |
| Hosting modes | Per business, recorded in the ledger and `run.yaml`. **`managed`** (default) — our multi-tenant Payload + Cloudflare Workers; monthly fee. **`self_hosted_docker`** — the client's own VPS (Hetzner, Contabo, Hostinger KVM, DigitalOcean — anything with Docker; 2 vCPU / 4 GB minimum): single-tenant Payload + Postgres + Astro builder + Caddy (HTTPS) in one `docker-compose.yml`, rebuild-on-save inside the stack; we install, verify, hand over, revoke our access. **`static_only`** — static build + source zip, no CMS; runs on any host including shared PHP hosting; edits require a developer. Self-hosted is the client's choice at pitch time. No split mode, no PHP flat-file CMS port. |
| One of everything | One content schema (`schemas/site-content.md`), one Astro template per site, one Payload config. Hosting mode is a deployer adapter, never a fork of the site or the CMS. Anything that would need a second renderer or a second CMS is out of scope. |
| Mockups | Designer produces **three** mockups per business: (1) calm, standard (2) interactive, some bells and whistles (3) full-blown unique |
| Critique of mockups | Critic scores all three cheaply (screenshot + rubric) *before* the human sees them; only the human's pick goes through the full build/CMS/critique rounds |
| Self-improvement | Critic writes diffs to prompts/tools/playbook/rubric with evidence; human approves each; merged → version bump → CHANGELOG |
| Agent prompts | Two layers per agent: `base.md` (Claude: role, I/O, constraints) + `custom.md` (Shahar: taste, rules, references). Runtime prompt = playbook + base + custom + references |
| Preview | The site's `*.workers.dev` address is the before/after link; production is the same Worker on the client's domain |
| Human gates | (a) shortlist approval (b) mockup pick (c) send pitch (d) approve prompt diffs |

---

## 2. Repo layout

```
oneshot/
  PLAN.md                     # this file
  CLAUDE.md                   # instructions for Claude Code sessions in this repo
  run.yaml                    # current run definition
  playbook.md                 # what a great surf-business site is — shared by all agents
  rubric.md                   # critic scoring, weights, pass thresholds
  taxonomy.md                 # business types, what counts as "surf-related"
  server-hardening.md         # security baseline for the one CMS server (one server, one admin)
  agents/
    orchestrator/  scout/  harvester/  designer/  critic/  deployer/  writer/
      base.md        # Claude writes: role, inputs, outputs, hard constraints
      custom.md      # Shahar writes: taste, rules, house style
      references.md  # curated examples (URLs + what we like about each), cached notes
      tools.md       # what the agent may call, and how
      evals.md       # how we judge it; metrics collected per run
      CHANGELOG.md   # version history, one entry per approved diff
  cms/                        # Payload app: collections, multi-tenant config, hooks, docker-compose
  templates/<variant>/        # Astro templates (calm / interactive / unique) — the designer's output shape
  infra/                      # wrangler config generator, Cloudflare domain scripts, deploy scripts
  deploy/
    managed/                  # adapter: our multi-tenant Payload + Cloudflare Workers
    self-hosted-docker/       # adapter: single-tenant compose stack (Payload + Postgres + Astro builder + Caddy) on the client's VPS
    static/                   # adapter: static build + source zip, no CMS
  handoff/                    # handoff kit templates: README, credentials sheet, backup/restore, update procedure, "how to edit" guide with screenshots
  schemas/                    # site-content.md — the content contract between Payload and the templates
  scripts/                    # deterministic helpers (geocode, coastline buffer, scrape, lighthouse, zip)
  dossier/<slug>/             # dossier.json + assets/ per business
  sites/<slug>/               # mockups/ (3 variants) + final/ (Astro site)
  reports/<run-id>/           # per-site scorecards, run summary
  proposals/<run-id>/         # critic's proposed diffs awaiting human review
  dist/<slug>.zip             # optional static export per client (runs on any host)
  ledger.jsonl                # append-only: every state change of every business
```

---

## 3. `run.yaml`

```yaml
run_id: 2026-09-mirissa-01
area:
  anchors:                       # 1 anchor = town/point; 2 anchors = a stretch of coast between them
    - "Niira Hotel, Mirissa, Sri Lanka"
    - "Ritz-Carlton, Mirissa, Sri Lanka"
  shore_buffer_m: 100
types: [surf_school, board_rental, surf_shop, surf_camp, beach_lodging, shaper]
presence_threshold: 2            # shortlist businesses scoring <= this (0–5)
max_sites: 3
languages: [en, si]
budget:
  tokens_per_business: 2_000_000
  wallclock_min_per_business: 90
hosting:
  default_mode: managed          # managed | self_hosted_docker | static_only
  modes: {}                      # slug → mode, when the client chooses something other than the default
agents:                          # pinned versions for reproducibility
  scout: 0.1.0
  harvester: 0.1.0
  designer: 0.1.0
  critic: 0.1.0
```

Scout geocodes anchors, pulls the coastline between them from OSM, buffers it by `shore_buffer_m`, and keeps only businesses whose location falls inside the polygon.

---

## 4. Pipeline

Each business moves through these stations. The orchestrator owns the order, retries, budgets, and writes every transition to `ledger.jsonl`.

| # | Station | Agent | Input | Output | Gate |
|---|---|---|---|---|---|
| 1 | Target | human | — | `run.yaml` | — |
| 2 | Scout | scout | run.yaml | `candidates.json` with geo, contact, links, presence score 0–5 + reason | **Human approves shortlist** |
| 3 | Harvest | harvester | approved candidates | `dossier/<slug>/dossier.json` + `assets/`; every fact/image carries its source; gaps flagged | — |
| 4a | Mockups | designer | playbook + base + custom + references + dossier | 3 mockups in `sites/<slug>/mockups/{calm,interactive,unique}/` | — |
| 4b | Pre-score | critic | 3 mockups | screenshot + rubric quick score per mockup | **Human picks one (pick + reason logged)** |
| 4c | Build | designer | chosen mockup | Astro site from chosen template + tenant content model seeded in Payload | — |
| 5 | Critique | critic | final site, dossier | scorecard; fail → back to 4c, max 3 rounds | — |
| 6 | Deliver | deployer | passing site | deployer runs the adapter for the business's `hosting_mode` (§5). `managed`: tenant + seed + `wrangler deploy` + domain + owner login; the preview URL is just the `*.workers.dev` address. `self_hosted_docker` ends with a verified handoff kit and our access revoked. `static_only` ends with the zip | — |
| 7 | Pitch | writer | dossier, old vs new, preview URL | proposal page + outreach message in local language | **Human sends; outcome logged** |
| ∞ | Learn | critic | reports, mockup picks, pitch outcomes | `proposals/<run>/` diffs to prompts/tools/playbook/rubric | **Human approves diffs** → merge, bump, CHANGELOG |

### Ledger states
`discovered → scored → shortlisted → approved → harvested → mocked → picked → built → critiqued(n) → passed | failed → packaged → pitched → outcome:{reply,meeting,sale,ignored}`

`self_hosted_docker` only, once the client has chosen it: `… → handoff_verified → access_revoked`. `handoff_verified` = the adapter's `verify` passed on the client's box and the handoff kit is complete; `access_revoked` = our keys, users and tokens are removed from the client's box and we have checked that they no longer work.

---

## 5. Agents

Each agent folder has the same six files (§2). Below: what `base.md` must cover, and what is already known for `custom.md`.

### orchestrator
- Reads `run.yaml`, walks each business through §4 in order, one at a time.
- Enforces budgets, retries (max 2 per station), stops at human gates, never runs past a gate unattended.
- Writes ledger entries; resumable from any state after a crash.
- Tools: Claude Code headless, `scripts/`.

### scout
- Discovery sources: Google Places/Maps, OpenStreetMap, Instagram/Facebook pages, TripAdvisor, local directories.
- Geo filter: anchors → coastline → buffer polygon → point-in-polygon.
- Presence score 0–5: none / Facebook-only / dead link / not mobile / no booking / stale content. Each score carries the reason.
- Output schema: `candidates.json` (name, type, lat/lng, address, phone, WhatsApp, socials, existing site URL, score, reason, evidence links).
- Evals: precision of "surf-related" (human spot-check), % of shortlist the human approves.

### harvester
- Per business: old site, Google Business Profile, socials, reviews (Google/TripAdvisor), booking path (WhatsApp/phone/3rd-party engine), hours, prices, facilities, images.
- Every fact and image carries `source_url` + `fetched_at`; images carry a license/ownership note (business-owned, review photo, stock, unknown).
- Gaps are flagged, not invented — they become pitch talking points.
- Output schema: `dossier.json` (define in Phase 1) + `assets/`.
- Tools: headless browser, image download + dedupe + resize.
- Evals: fact count, source coverage %, critic's "facts match dossier" score downstream.

### designer
- Produces three mockups, then the full build of the chosen one.
- Output: Astro templates (`templates/{calm,interactive,unique}/` is the shape) written against a fixed content schema — `schemas/site-content.md`, the contract between Payload and the templates. Design lives in the template; everything the schema covers comes from Payload at build time and is never hard-coded.
- **`custom.md` (verbatim, from Shahar):**

  > Use custom canvas/webGL to replace static image grids with interactive movement, fluid motion and canvas-rendered depth. Use editorial layouts, asymmetrical css grid designs, varying column grids and overlapping kinetic texts whenever it fits better than the repetitive hero and card framework. Generate a painless booking UX — hide complex booking engines behind sliding modal drawers or slide-outs, maintaining visual immersion until the user chooses to book.
  >
  > For each website, create three mockups for a human to choose from: the first should be calm, moderate and expressing a conformist standard approach. The second should be more interactive with some bells and whistles, and the third full blown unique.

- **`references.md` seed:** ranchosantana.com · malibupopoyo.com · morgansrock.com · tandjungsarihotel.com · white-desert.com · kubehotel-saint-tropez.com/en — Phase 1 task: analyse each (layout, motion, typography, booking UX, imagery) into reusable notes so the prompt doesn't depend on live fetches.
- Evals: which variant humans pick and why (over time), critic score, rounds to pass, Lighthouse.

### critic
- Two modes: **quick** (screenshot + rubric, for the 3 mockups) and **full** (final site).
- Rubric dimensions: facts match dossier · mobile + Lighthouse · booking CTA works end-to-end · brand fit vs playbook · copy quality · accessibility · security baseline present.
- Writes `reports/<run>/<slug>.md` with scores and a note on what the designer prompt got wrong.
- After the run: reads all reports + mockup picks + pitch outcomes and writes `proposals/<run>/` — one diff per proposal, each with the evidence that motivated it.
- Evals: agreement between critic pre-score and human pick; false-pass rate found by humans later.

### deployer (was packager)
- One `base.md`; three adapter tool specs in `tools.md` — `managed`, `self_hosted_docker`, `static_only` — with their code in `deploy/<adapter>/`. The adapter is picked by the business's `hosting_mode`. Adapters never fork the site or the CMS (§1).
- Every adapter implements the same steps:

  | Step | What it does | managed | self_hosted_docker | static_only |
  |---|---|---|---|---|
  | `provision` | make the place the CMS runs | tenant in our Payload | compose stack on the client's VPS | skip |
  | `seed` | tenant + content + assets from the dossier | ✓ | ✓ | skip |
  | `deploy` | build the Astro site and put it live | `wrangler deploy` to the site's Worker (`*.workers.dev` = preview) | build inside the stack, served by Caddy | build, no CMS |
  | `attach_domain` | client's domain on the site | Cloudflare (Registrar, billed through) | DNS to the client's box, Caddy HTTPS | client's host |
  | `verify` | owner login works, one edit round-trips to the live site | ✓ | ✓ | skip |
  | `handoff` | credentials sheet, revoke our keys | skip | ✓ — kit from `handoff/`, then `access_revoked` | zip + README only |
  | `export` | static zip that runs on any host | ✓ optional | ✓ | ✓ — the deliverable (build + source) |

- Owner credentials are always handed over sealed, never in a README or zip.

### writer
- Proposal page: before vs after, what was fixed, what the owner can now edit alone.
- The pitch offers two options and states the trade honestly in one paragraph: **managed** (monthly fee, we keep it alive — hosting, updates, backups are ours) vs **self-hosted on their own VPS** (one-time fee, fully theirs, ~$6–12/mo to their host, they carry updates and backups). Managed is the default.
- `static_only` is mentioned only if the owner says they never intend to edit.
- Outreach message in the local language, short, with the preview (`*.workers.dev`) link.

---

## 6. CMS + server hardening

One Payload instance serves every client (§1). Client sites are static files on Cloudflare, so there is nothing to patch on them; the single ops surface is our CMS server.

Phase 1 spike — Payload multi-tenant: `docker-compose up` locally, two tenants, one Astro template rendering each tenant, `afterChange` hook triggering a rebuild + `wrangler deploy` to two `*.workers.dev` sites. Deliverable: `spikes/payload/README.md` with what worked and the content schema v0.1. The same spike builds the single-tenant profile: same codebase, selected by env var, tenants plugin off, one admin user, running in a self-hosted compose stack (Payload + Postgres + Astro builder + Caddy) with rebuild-on-save inside the stack.

`cms/` runs in two profiles from one codebase — **multi-tenant** (our server) and **single-tenant** (a client's box) — selected by one env var. Same collections, same content schema, same API shape for the templates.

`server-hardening.md` (one server, one admin):
- Admin behind HTTPS.
- Rate-limited login.
- Postgres not exposed.
- Nightly `pg_dump` + media backup to object storage.
- Pinned versions.
- Single ops surface.

---

## 7. Learning loop mechanics

1. After every run, critic writes `proposals/<run-id>/NNN-<agent>-<slug>.md`: target file, diff, evidence (report lines, pick reasons, outcomes).
2. Human reviews each: approve / edit / reject (PR-style, can be literal PRs).
3. Approved diffs are merged, the agent's version bumps (semver in `run.yaml` pins), CHANGELOG gets one line per diff.
4. `custom.md` is never edited by the critic — it may only *propose* additions there, flagged separately.
5. Conflicts between `base.md` and `custom.md` are surfaced by the critic, not resolved silently.

---

## 8. Phases

**Phase 0 — Scaffold (first VS Code session)**
- Init repo, this PLAN.md, CLAUDE.md, folder skeleton, empty six-file set per agent.
- `run.yaml` for the Mirissa example. Ledger schema.

**Phase 1 — Foundations**
- `playbook.md` v0.1 + `references.md` analysis of the six sites.
- `dossier.json` and `candidates.json` schemas.
- CMS spike — Payload multi-tenant (§6) → content schema v0.1 (`schemas/site-content.md`).
- `rubric.md` v0.1.
- Designer `base.md` v0.1 (Claude), `custom.md` (Shahar, as above).

**Phase 2 — Vertical slice, one business**
- Hand-pick one business in the Mirissa stretch. Run Harvest → Mockups → pick → Build → Critique → Deploy manually, station by station.
- Goal: one site live on its `*.workers.dev` address, editable by its owner in Payload, and one pitch page.
- The vertical slice stays `managed`.

**Phase 2b — Self-hosted handoff**
- Run the same business through `self_hosted_docker` on a throwaway Hetzner box: install, verify, handoff kit, revoke our access, confirm the revocation — then destroy the box.
- `static_only` after that.

**Phase 3 — Scout + orchestrator**
- Geo filter, presence scoring, ledger, resumability, human gates as CLI prompts.
- First full run on the Mirissa stretch, `max_sites: 3`.

**Phase 4 — Learning loop**
- Critic proposals, review flow, version bumps. Run 2 uses run 1's approved diffs.

**Phase 5 — Tune until one-shot**
- Repeat runs on new stretches (Ahangama next). Track: pick distribution, critic scores, rounds to pass, pitch outcomes. Stop tuning when first output passes without rounds on most sites.

---

## 9. Open questions

- Image rights: do we use business-owned images only, or also review photos with attribution? Stock/generated fallback?
- Booking: do we integrate the owner's existing path (WhatsApp/phone) only, or also offer a simple form → email?
- Pitch channel: WhatsApp, email, or in-person? Affects what the writer produces.
- Pricing/offer in the pitch — out of scope for the pipeline or a template?

---

## 10. First session in VS Code — checklist

1. `git init`, add this file, create the layout in §2.
2. Write `CLAUDE.md`: point to PLAN.md, state the gate rule (never pass a human gate unattended), the ledger rule (every transition is logged), and the two-layer prompt rule.
3. Create `run.yaml` (§3) for Mirissa.
4. Paste Shahar's designer paragraph into `agents/designer/custom.md`, the six URLs into `references.md`.
5. Start Phase 1 with the reference-site analysis and the CMS spike in parallel.
