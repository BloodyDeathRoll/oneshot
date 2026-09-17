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
| Site output | Static HTML/CSS/JS hosted on a dedicated Oneshot Vercel account (Pro — Hobby is non-commercial). One Vercel project per customer site, with no server code and no admin on it; one separate project holds the editor (CMS) for all sites — the owner logs in there, saving rebuilds their site. The owner's domain points at Vercel by DNS. **Not WordPress. No GoDaddy, no PHP.** Editor: free, open source, no per-site server — decide by spike in Phase 1 (§6). *Decided 2026-09-17; replaces "flat-file PHP CMS on GoDaddy". The Grav vs Bludit spike stays in `spikes/cms/` for the record: both need updates on the customer's host forever.* |
| Mockups | Designer produces **three** mockups per business: (1) calm, standard (2) interactive, some bells and whistles (3) full-blown unique |
| Critique of mockups | Critic scores all three cheaply (screenshot + rubric) *before* the human sees them; only the human's pick goes through the full build/CMS/critique rounds |
| Self-improvement | Critic writes diffs to prompts/tools/playbook/rubric with evidence; human approves each; merged → version bump → CHANGELOG |
| Agent prompts | Two layers per agent: `base.md` (Claude: role, I/O, constraints) + `custom.md` (Shahar: taste, rules, references). Runtime prompt = playbook + base + custom + references |
| Preview | A preview deployment of the site's own Vercel project for the before/after link; production is the same project on the owner's domain |
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
  cms-hardening.md            # security baseline for every delivered CMS
  agents/
    orchestrator/  scout/  harvester/  designer/  critic/  packager/  writer/
      base.md        # Claude writes: role, inputs, outputs, hard constraints
      custom.md      # Shahar writes: taste, rules, house style
      references.md  # curated examples (URLs + what we like about each), cached notes
      tools.md       # what the agent may call, and how
      evals.md       # how we judge it; metrics collected per run
      CHANGELOG.md   # version history, one entry per approved diff
  scripts/                    # deterministic helpers (geocode, coastline buffer, scrape, lighthouse, zip)
  dossier/<slug>/             # dossier.json + assets/ per business
  sites/<slug>/               # mockups/ (3 variants) + final/ (site + cms)
  reports/<run-id>/           # per-site scorecards, run summary
  proposals/<run-id>/         # critic's proposed diffs awaiting human review
  dist/<slug>.zip             # deliverables
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
| 4c | Build | designer | chosen mockup | full site + CMS in `sites/<slug>/final/` | — |
| 5 | Critique | critic | final site, dossier | scorecard; fail → back to 4c, max 3 rounds | — |
| 6 | Deliver | packager | passing site | Vercel project for the site, wired to the shared editor + sealed owner login + DNS steps for the owner's domain + preview URL + `dist/<slug>.zip` (static export, the owner's exit copy) | — |
| 7 | Pitch | writer | dossier, old vs new, preview URL | proposal page + outreach message in local language | **Human sends; outcome logged** |
| ∞ | Learn | critic | reports, mockup picks, pitch outcomes | `proposals/<run>/` diffs to prompts/tools/playbook/rubric | **Human approves diffs** → merge, bump, CHANGELOG |

### Ledger states
`discovered → scored → shortlisted → approved → harvested → mocked → picked → built → critiqued(n) → passed | failed → packaged → pitched → outcome:{reply,meeting,sale,ignored}`

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
- Output: standalone HTML/CSS/JS per mockup; final build wired to the CMS.
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

### packager
- Creates the site's Vercel project on the Oneshot account, wires it to the shared editor, deploys a preview.
- Hands over: sealed owner login for the editor, DNS steps for the owner's domain, README, and `dist/<slug>.zip` — a static export of the site as the owner's exit copy.
- Verifies by smoke-testing the preview: pages render, owner login works, one edit shows up on the site; and the zip runs from a plain static server.

### writer
- Proposal page: before vs after, what was fixed, what the owner can now edit alone.
- Outreach message in the local language, short, with the preview link.

---

## 6. CMS + security baseline

Goal: the customer is never left open to vulnerabilities and never has to update anything. So nothing runs on the customer's site: it is static files on Vercel. The only software to keep patched is the one shared editor project, and that is ours.

Requirements for the editor: free, open source, runs on Vercel (no PHP, no writable disk — content lives in git or Vercel Blob), one instance for all sites, login per owner who sees only their own site, simple enough for a surf-school owner to edit text/images/prices, dependency updates automatable.

Phase 1 spike (`spikes/editor/`): one editor project + one static site project; owner edits a price and a photo end to end; static zip export. Candidates to verify in the spike, not yet checked: Keystatic, Decap CMS (both git-based); fallback: a small editor of our own on Blob. Criteria: owner simplicity, freedom for the designer's custom HTML, per-owner isolation, upkeep, security record.

First spike (`spikes/cms/`, Grav vs Bludit on GoDaddy-style hosting, 2026-09-17) is superseded by the Vercel-only decision; see its COMPARE.md for why a CMS on the customer's host was dropped.

`cms-hardening.md` (applies to every delivery):
- Unique, generated owner credentials per site; delivered sealed (never in the zip or README). 2FA where the editor supports it.
- Each owner can reach only their own site's content.
- Customer sites carry no server code, no admin and no public write endpoints. HTTPS is Vercel's default.
- Editor dependencies pinned, updated automatically in the one editor project; versions recorded per run.
- Upload types whitelisted; uploads sanitized and re-encoded.
- Backups: content history (git or Blob) plus the static zip are the restore points; document how to restore.
- Spend cap set on the Vercel account.

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
- CMS spike (Grav vs Bludit) → done, superseded by the Vercel-only decision. Editor spike on Vercel → decision.
- `rubric.md` v0.1.
- Designer `base.md` v0.1 (Claude), `custom.md` (Shahar, as above).

**Phase 2 — Vertical slice, one business**
- Hand-pick one business in the Mirissa stretch. Run Harvest → Mockups → pick → Build → Critique → Package manually, station by station.
- Goal: one site live on a Vercel preview, editable by its owner through the shared editor, with its static exit zip, and one pitch page.

**Phase 3 — Scout + orchestrator**
- Geo filter, presence scoring, ledger, resumability, human gates as CLI prompts.
- First full run on the Mirissa stretch, `max_sites: 3`.

**Phase 4 — Learning loop**
- Critic proposals, review flow, version bumps. Run 2 uses run 1's approved diffs.

**Phase 5 — Tune until one-shot**
- Repeat runs on new stretches (Ahangama next). Track: pick distribution, critic scores, rounds to pass, pitch outcomes. Stop tuning when first output passes without rounds on most sites.

---

## 9. Open questions

- ~~Staging host: Vercel or the OCI box?~~ Vercel (decided 2026-09-17).
- Vercel account: who pays (Pro is $20/seat/month flat + usage), is it part of the offer, and what happens when a customer leaves — exit zip only, or transfer their project to their own Vercel account?
- Domains: owners without a domain — do we buy one for them or use a subdomain of ours?
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
