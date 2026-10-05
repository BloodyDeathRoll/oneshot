# Oneshot — Project Plan

Find surf businesses along a defined stretch of coast that have no or weak websites, harvest everything public about them, one-shot a new site from a tuned prompt, and pitch it as a demo on a static preview. The CMS comes only after a sale, once the client has chosen the product (Shahar, 2026-10-05: "We build a demo to sell to a client. If we succeed and the client wants a CMS, THEN you implement a CMS. NOT BEFORE."). Every agent is a versioned prompt that improves after each run: the critic proposes diffs, a human approves.

Workflow graph: Figma → Workflows file → `workflows` page → frame `oneshot-workflow`.

---

## 1. Decisions so far

| Topic | Decision |
|---|---|
| Repo | Own VS Code project, own git repo (`oneshot`) |
| Runtime | Claude Code headless, one business at a time; disk is the memory (ledger + files), no daemon, no DB |
| Area definition | Three modes (§3): a town + shore buffer · a stretch between two anchors + shore buffer · a single business + radius around it |
| Site output | Every client site is a static **Astro** build that pulls its tenant's content from Payload's API at build time. Design lives in the Astro template (this is where the designer's canvas/WebGL, editorial grids and booking drawers go); editable content (hours, prices, photos, copy blocks, contact, booking links) lives in Payload. **Not WordPress.** |
| CMS | One CMS for all client sites, run by us: Payload CMS 3 with the official multi-tenant plugin, Postgres, Docker Compose, on one VPS — decided 2026-09-18: the second Oracle Cloud Always Free account, Ampere A1 shape (ARM64, up to 2 OCPU / 12 GB), account upgraded to pay-as-you-go so the instance cannot be idle-reclaimed; env-configurable so it can move (e.g. Hetzner CX23) later. One tenant per business. Each owner gets an email/password login scoped to their tenant only. |
| Hosting | Cloudflare Workers with static assets, one Worker per site, deployed with Wrangler, custom domain per site via Cloudflare. **Not** Cloudflare Pages (being folded into Workers). **Not** Vercel or GoDaddy. |
| Domains | Cloudflare Registrar, one per client, billed through to the client. Bought only after a sale and the client's product choice, at station 8 Deliver, never for the preview. Clients who already own a domain keep it; we set up the DNS. |
| Publish flow | Owner edits are drafts; pressing **Publish** in Payload → hook → rebuild only that tenant's site → `wrangler deploy` → live in ~1 minute. Not on every save (decided 2026-09-18). |
| Export | Any client can receive their static build as a zip that runs on any host (GoDaddy included). Optional handoff, not the deliverable; replaces the old per-site-CMS-in-a-zip idea. |
| Commercial default | "We host it, you edit it, monthly fee." The pitch recommends it, as one of the three products the client chooses from (hosting modes, below). |
| Hosting modes | Per business, recorded in the ledger and the run file (`runs/<run_id>.yaml`). **`managed`** (default) — our multi-tenant Payload + Cloudflare Workers; monthly fee. **`self_hosted_docker`** — the client's own VPS (Hetzner, Contabo, Hostinger KVM, DigitalOcean — anything with Docker; 2 vCPU / 4 GB minimum): single-tenant Payload + Postgres + Astro builder + Caddy (HTTPS) in one `docker-compose.yml`, rebuild-on-save inside the stack; we install, verify, hand over, revoke our access. **`static_only`** — static build + source zip, no CMS; runs on any host including shared PHP hosting; edits require a developer. No split mode, no PHP flat-file CMS port. **The client chooses the mode after a sale** (decided 2026-10-05): the pitch presents the three as products to choose from, the choice is a human gate recorded as a ledger line `product_chosen` carrying `hosting_mode`, and only then does station 8 build what that mode needs. No CMS tenant, owner login or domain exists before that. |
| One of everything | One content schema (`schemas/site-content.md`), one Astro template per site, one Payload config. Hosting mode is a deployer adapter, never a fork of the site or the CMS. Anything that would need a second renderer or a second CMS is out of scope. |
| Mockups | Designer produces **three** mockups per business: (1) calm, standard (2) interactive, some bells and whistles (3) full-blown unique |
| Critique of mockups | Critic scores all three cheaply (screenshot + rubric) *before* the human sees them; only the human's pick goes through the full build/critique rounds |
| Self-improvement | Critic writes diffs to prompts/tools/playbook/rubric with evidence; human approves each; merged → version bump → CHANGELOG |
| Agent prompts | Two layers per agent: `base.md` (Claude: role, I/O, constraints) + `custom.md` (Shahar: taste, rules, references). Runtime prompt = playbook + base + custom + references |
| Preview | The site's `*.workers.dev` address is the before/after link: station 6 deploys the static build there (noindex, no CMS) for the pitch; production is the same Worker on the client's domain after Deliver |
| Human gates | (a) shortlist approval (b) mockup pick (c) send pitch (d) approve prompt diffs (e) the client's product choice after a sale (added 2026-10-05) |
| Operators | Decided 2026-10-02: two operators, Shahar and Alon (`team.json`), each on their own machine and Claude Code sessions, one repo. Work goes on branches and reaches `main` only through pull requests that a human merges; nobody pushes to `main`. Either may pass any gate. Every ledger line carries `operator`; work between states and assignments go to `activity.jsonl`; `notes/<slug>.md` is the per-business handoff; the dashboard shows who worked on what last and who has an open assignment. `docs/team.md` |
| Parallel runs | Decided 2026-10-04: several runs can be active at once, one per operator and machine. Each run is one file, `runs/<run_id>.yaml`, with an `operator` and a `status` (`active` \| `closed`); a session works on exactly one run (`ONESHOT_RUN`, else its operator's one active run; `node tools/run.mjs`). All runs share one `ledger.jsonl` (lines carry `run_id`; `merge=union`). The dashboard shows every run, with the ledger and activity of this checkout merged with `origin/main`, fetched every minute, so each operator sees what the other has merged. A business belongs to one active run at a time. `docs/team.md` |
| Media | Decided 2026-10-02: no image or video in git, ever, and none hosted online. Each operator keeps media on disk and in a local store (`~/.oneshot/assets`); `media/<slug>.tsv` lists every file with its sha256 and source, and every new file must be made by a committed recipe, so the other operator rebuilds it (`tools/media.mjs restore`). Screenshots are scratch: one shared set per page, deleted after each scored round. The 3.5 GB of images already in git history are removed by a one-time history rewrite. `docs/team.md` |

---

## 2. Repo layout

```
oneshot/
  PLAN.md                     # this file
  CLAUDE.md                   # instructions for Claude Code sessions in this repo
  runs/<run_id>.yaml          # one file per run: area, budgets, pins, operator, status (§3)
  playbook.md                 # what a great surf-business site is — shared by all agents
  rubric.md                   # critic scoring, weights, pass thresholds
  taxonomy.md                 # business types, what counts as "surf-related"
  server-hardening.md         # security baseline for the one CMS server (one server, one admin)
  agents/
    orchestrator/  scout/  harvester/  auditor/  visual-critic/  experience-critic/  copywriter/  humanizer/  copyeditor/  creative-director/  designer/  seo/  aiseo/  critic/  deployer/  writer/
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
  schemas/                    # audit.md (auditor output, proposal 007); site-content.md — the content contract between Payload and the templates
  scripts/                    # deterministic helpers (geocode, coastline buffer, scrape, zip)
  dossier/<slug>/             # dossier.json + assets/ per business (assets: local only, listed in media/<slug>.tsv)
  sites/<slug>/               # copy/ + concepts.md + mockups/ (3 variants) + final/ (Astro site)
  reports/<run-id>/           # per-site scorecards, run summary
  proposals/<run-id>/         # critic's proposed diffs awaiting human review
  dist/<slug>.zip             # optional static export per client (runs on any host)
  ledger.jsonl                # append-only: every state change of every business
  activity.jsonl              # append-only: work between states + assignments, per operator (docs/team.md)
  team.json                   # the operators and how a session knows who it is
  notes/<slug>.md             # per-business handoff between operators
  media/<slug>.tsv            # every image/video of a business: path, sha256, size, source (files stay local)
```

---

## 3. The run file: `runs/<run_id>.yaml`

```yaml
run_id: 2026-09-ahangama-02        # = the file name
operator: shahar                   # team.json id; only this operator's sessions run it
status: active                     # active | closed
area:
  mode: business                 # town | stretch | business
  # town:     one anchor (a town or beach) + shore_buffer_m along its coast
  # stretch:  two anchors + shore_buffer_m along the coastline between them
  # business: one anchor (a named business) + radius_m circle around it
  anchors:
    - "The Lavish Haven, Ahangama, Sri Lanka"
  radius_m: 300                  # business mode
  shore_buffer_m: 100            # town / stretch modes
types: [surf_school, board_rental, surf_shop, surf_camp, beach_lodging, shaper]
presence_threshold: 2            # shortlist businesses scoring <= this (0–5)
max_sites: 3
languages: [en]                  # English only for now; audience languages (de, es, pt, ru…) may come later
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

Several runs may be active at once; one active run per operator is the norm, and an operator with two picks one per session with `ONESHOT_RUN=<run_id>`. `node tools/run.mjs` prints the session's run, `node tools/run.mjs list` all of them. Closing a run = `status: closed`; the file stays. In agent prompts, `playbook.md`, `rubric.md` and the schemas, "`run.yaml`" means the session's run file: `tools/prompt.mjs` loads it as the `run.yaml` layer and names the file.

Scout geocodes the anchors and builds the area polygon: `town` = the anchor's coast buffered by `shore_buffer_m`; `stretch` = the OSM coastline between the two anchors buffered by `shore_buffer_m`; `business` = a circle of `radius_m` around the one anchor. Only businesses whose location falls inside the polygon are kept.

---

## 4. Pipeline

Each business moves through these stations. The orchestrator owns the order, retries, budgets, and writes every transition to `ledger.jsonl`.

| # | Station | Agent | Input | Output | Gate |
|---|---|---|---|---|---|
| 1 | Target | human | — | `runs/<run_id>.yaml` | — |
| 2 | Scout | scout | the run file | `candidates.json` with geo, contact, links, presence score 0–5 + reason, and `existing_site.funnel` (taps to book, measured with `tools/funnel.mjs --depth 1`) | **Human approves shortlist** |
| 3 | Harvest | harvester | approved candidates | `dossier/<slug>/dossier.json` + `assets/`; every fact/image carries its source; gaps flagged | — |
| 3b | Audit | auditor | dossier, old site, `candidates.json` entry | `dossier/<slug>/audit.json` + `audit.md` + `funnel/` (`schemas/audit.md`): the old path to a booking measured with `tools/funnel.mjs`, findings with evidence, and the recommended funnel in site-schema terms (proposal 007). Businesses with no site are audited too (`scope: no_site`) | — |
| 4a | Copy | copywriter | dossier, schema | site copy per locale in `sites/<slug>/copy/<locale>.json` + `copy/sources.md` (every paragraph mapped to its dossier fields) | — |
| 4b | Humanize | humanizer | draft copy | same files rewritten so they read as a person wrote them; facts unchanged; `copy/humanizer-notes.md` | — |
| 4c | Copy review | copyeditor | copy, draft, dossier | per-claim audit (`sourced` / `shared-context` / `framing` / `unsourced` / `contradicted`) + voice audit; `copy/review.md`; fail → back to 4a or 4b, max 2 rounds | — |
| 4d | Concept | creative-director | dossier (incl. the images themselves), passed copy, references, every other `concepts.md` in this run | `sites/<slug>/concepts.md`: the page **archetype** for this business plus three concepts (calm / interactive / unique), and a divergence table proving no two businesses share an archetype + first-screen device |  |
| 4e | Mockups | designer | playbook + base + custom + references + dossier + **passed copy** + `concepts.md` | 3 mockups, **one HTML file each** at `sites/<slug>/mockups/{calm,interactive,unique}/dist/index.html` (+ `dist/img/`, `notes.md` with a look-log, `shots/round-N/`), built to the three concepts and laid out around the real words. A look, not a build: no Astro, no schema binding (designer 0.3.0, proposal 003) | — |
| 4f | Pre-score | critic + visual-critic + experience-critic (independent) | 3 mockups, the current site | rubric quick score per mockup: critic dimensions 1–7, the two visual critics dimension 8 each, side by side with the current site. A mockup below 8/10 from either visual critic, or not better than the current site, loops back to 4e (max 3) before the gate | **Human picks one (pick + reason logged)** |
| 4g | Build | designer | chosen mockup + passed copy | Astro site **ported from the chosen mockup without changing how it looks**, bound to `schemas/site-content.md` and built from its own `src/tenant/content.json`; nothing is seeded in Payload before a sale (station 8) | — |
| 4h | SEO | seo | built site, dossier | classical SEO pass on `templates/<variant>/`: JSON-LD from CMS content, head + headings, local signals, Core Web Vitals, sitemap/robots; `sites/<slug>/seo-report.md` | — |
| 4i | AI SEO | aiseo | built site, dossier, `seo-report.md` | answer-engine pass: self-contained answers to the questions people actually ask, `FAQPage` data, `/llms.txt`, AI-crawler policy, no-JS check; `sites/<slug>/aiseo-report.md` | — |
| 5 | Critique | critic + visual-critic + experience-critic (independent) | final site, dossier, both SEO reports, `audit.json`, the current site | scorecard, including `tools/funnel.mjs` on the built site against `audit.json.recommended`; fail → back to 4f, max 3 rounds | — |
| 6 | Preview | deployer | passing site | the static build of `sites/<slug>/final/` deployed with Wrangler to `<brand>.os1.workers.dev` (noindex, robots `Disallow`, no sitemap) and verified: 200s, live HTML byte-identical to the local build. **No CMS, no tenant, no owner login, no domain.** URL + evidence in the `previewed` ledger line | — |
| 7 | Pitch | writer | dossier, `audit.md`, old vs new, preview URL from the `previewed` ledger line | proposal page + outreach message in local language; presents the product options (`managed` recommended — we host, you edit, monthly fee; `self_hosted_docker`; `static_only`) **for the client to choose**, and claims no CMS or login that does not exist yet | **Human sends; outcome logged** |
| 8 | Deliver | deployer | `outcome:sale` + the client's product choice (`product_chosen` line with `hosting_mode`) | the adapter for that mode (§5): `managed` — CMS tenant + seed + publish + domain + owner login + verify; `self_hosted_docker` — install, verify, handoff, revoke; `static_only` — build + zip. The CMS, and any CMS server upgrade it needs, is implemented here and never earlier | **Before it: the client's product choice, recorded by a human** |
| ∞ | Learn | critic | reports, mockup picks, pitch outcomes | `proposals/<run>/` diffs to prompts/tools/playbook/rubric | **Human approves diffs** → merge, bump, CHANGELOG |

### Ledger states
`discovered → scored → shortlisted → approved → harvested → audited → copy_drafted → copy_humanised → copy_passed | copy_failed → concepted → mocked → picked → built → optimised → ai_optimised → critiqued(n) → passed | failed → previewed → packaged → pitched → outcome:{reply,meeting,sale,ignored}`

After `outcome:sale`: `→ product_chosen → delivered`. `product_chosen` is the human line that records the client's choice and carries `hosting_mode`; `delivered` is written when the chosen adapter has finished (`managed`: verify passed; `static_only`: zip built and checked).

`self_hosted_docker` only, once the client has chosen it: `… → delivered → handoff_verified → access_revoked`. `handoff_verified` = the adapter's `verify` passed on the client's box and the handoff kit is complete; `access_revoked` = our keys, users and tokens are removed from the client's box and we have checked that they no longer work.

History: until 2026-10-05, station 6 was Deliver (CMS tenant + seed + deploy + owner login, before the pitch) and wrote `packaged` for "full deploy done"; Pitch then went `packaged → pitched`. Those lines stay as written (append-only); from 2026-10-05 `packaged` means "pitch written, waiting for a human to send it" (`docs/ledger.md`).

---

## 5. Agents

Each agent folder has the same six files (§2). Below: what `base.md` must cover, and what is already known for `custom.md`.

### orchestrator
- Reads the session's run file (`node tools/run.mjs`), walks each of that run's businesses through §4 in order, one at a time. Never touches another run's businesses.
- Enforces budgets, retries (max 2 per station), stops at human gates, never runs past a gate unattended.
- Writes ledger entries; resumable from any state after a crash.
- Tools: Claude Code headless, `scripts/`.

### scout
- Discovery sources: Google Places/Maps, OpenStreetMap, Instagram/Facebook pages, TripAdvisor, local directories.
- Geo filter: anchors → coastline → buffer polygon → point-in-polygon.
- Presence score 0–5: none / Facebook-only / dead link / not mobile / no booking / stale content. Each score carries the reason.
- Funnel probe (proposal 007): when the site loads, `tools/funnel.mjs --depth 1` → `existing_site.funnel` (taps to book, primary action, CTA above fold), cited in the reason.
- Output schema: `candidates.json` (name, type, lat/lng, address, phone, WhatsApp, socials, existing site URL, score, reason, evidence links).
- Evals: precision of "surf-related" (human spot-check), % of shortlist the human approves.

### harvester
- Per business: old site, Google Business Profile, socials, reviews (Google/TripAdvisor), booking path (WhatsApp/phone/3rd-party engine), hours, prices, facilities, images.
- Every fact and image carries `source_url` + `fetched_at`; images carry a license/ownership note (business-owned, review photo, stock, unknown).
- Gaps are flagged, not invented — they become pitch talking points.
- Output schema: `dossier.json` (define in Phase 1) + `assets/`.
- Tools: headless browser, image download + dedupe + resize, `tools/fetch-video.mjs` (business-owned video: download, web renditions, posters).
- Video (2026-09-28): every business-owned video is harvested into `videos[]`; a business that publishes video and has none in its dossier is an incomplete harvest.
- Evals: fact count, source coverage %, critic's "facts match dossier" score downstream.

### creative-director (station 4d)
- Added 2026-09-20, after Shahar rejected nine mockups across three businesses for looking like one cookie cutter. The cause was structural: a designer working from one playbook and one schema reaches for the same page every time, and this project's whole pitch is that the client does not look like everyone else.
- Decides **what kind of page this is**, before any markup exists: one **archetype** per business (a hotel brochure · a kitchen noticeboard · a printed spec card · a tide table · a menu — not "editorial" or "modern and clean"), then three concepts mapped onto the designer's calm / interactive / unique brief.
- Looks at every photograph and records the pixel width of the best one. **A photograph under 1200 px wide may not be a full-bleed hero** — that rule alone changes the page for a business whose best picture is small, and it is where several of the differences between these sites come from.
- Ends with a divergence table covering every business already concepted in the run. No two rows may repeat archetype + first-screen device.
- Writes only `sites/<slug>/concepts.md`. No markup, no CSS, no build. Does not pick a winner.
- Evals: how often two businesses in a run share a first-screen device (target 0), whether the human's pick tracks the concept they preferred, critic scores by archetype over time.

### designer
- Builds the three concepts the creative director wrote; it no longer decides what kind of page this is.
- Produces three mockups — one HTML file per variant, each made through a mandatory look loop (build, shoot with `tools/shoot.mjs`, look, revise, at least three rounds) — then the full build of the chosen one.
- Output at 4e: the three single-file mockups. Output at 4g: one Astro project per site (no shared template; `templates/{calm,interactive,unique}/` was deleted on 2026-09-20) written against a fixed content schema — `schemas/site-content.md`, the contract between Payload and the templates. Design lives in the template; everything the schema covers comes from Payload at build time and is never hard-coded.
- **`custom.md` (verbatim, from Shahar):**

  > Use custom canvas/webGL to replace static image grids with interactive movement, fluid motion and canvas-rendered depth. Use editorial layouts, asymmetrical css grid designs, varying column grids and overlapping kinetic texts whenever it fits better than the repetitive hero and card framework. Generate a painless booking UX — hide complex booking engines behind sliding modal drawers or slide-outs, maintaining visual immersion until the user chooses to book.
  >
  > For each website, create three mockups for a human to choose from: the first should be calm, moderate and expressing a conformist standard approach. The second should be more interactive with some bells and whistles, and the third full blown unique.

- **`references.md` seed:** ranchosantana.com · malibupopoyo.com · morgansrock.com · tandjungsarihotel.com · white-desert.com · kubehotel-saint-tropez.com/en — Phase 1 task: analyse each (layout, motion, typography, booking UX, imagery) into reusable notes so the prompt doesn't depend on live fetches.
- Evals: which variant humans pick and why (over time), critic score, rounds to pass, measured first-load weight and LCP.

### auditor (station 3b, proposal 007)
- For one harvested business: measures the old path to a booking on a phone with `tools/funnel.mjs` (depth 3) and one walk by hand (site, Google listing, top OTA page), and writes `dossier/<slug>/audit.json` + `audit.md` (`schemas/audit.md`).
- Findings are what a visitor meets, each with evidence a reader can open (URL, screenshot, click path); a finding without evidence is deleted.
- Writes the recommended funnel in `schemas/site-content.md` terms only: primary action (= the dossier's booking path), label, above-fold order by type, offer framing, closing line, off-site advice. Required for businesses with no site too.
- No money or conversion numbers. Not a fact source for the site.
- Consumers: creative director (above-fold order, primary action), copywriter (CTA label, offer framing), critic (measures the built site with the same tool), writer (before/after taps with screenshots).
- Evals: evidence coverage 100 %, Shahar's spot-check of 3 findings per business, target met on the built site.

### visual-critic and experience-critic (stations 4f and 5, 2026-09-28)
- Added after Shahar rejected every Global Surf mockup as far below the business's own site: *"A Critic that judges whether a page looks good is ABSOLUTELY CRITICAL. I'd even rather have two independent ones running, with some overlap."*
- **visual-critic** judges the page as design (media use, composition, type, colour, hierarchy, polish, distinctiveness); **experience-critic** walks it as a traveller on a phone and a laptop (first seconds, story, desire, booking, motion). Overlap: both score rubric dimension 8 (0–10), both say whether the page beats the current site, both judge the first screen and the use of video.
- Independent: neither reads the other's or the critic's report for the round. Either one below 8, or "not better than the current site", is a hard fail and the mockup goes back to the designer before any human sees it.
- Evals: a mockup Shahar rejects as weak must never have passed either of them.

### copywriter (station 4a)
- Writes the **site's** words (not the pitch — that is `writer`, station 7) **before the designer starts**, so the mockups are laid out around real copy instead of placeholder text: `copyBlocks[]`, `tagline`, `spot`, `season` and the per-type modules, per locale.
- Built for thin dossiers. The rule that makes it safe: **expand voice, structure and atmosphere; never expand facts.** Framing around a sourced fact is writing; a new fact is a lie the owner has to answer for.
- Shared context (what Kabalana's wave does, when the season runs) may give a paragraph somewhere to stand, but is never attributed to the business.
- Guest testimonials in the dossier are mined for *what to talk about* and quoted verbatim where they belong — never paraphrased into the business's own voice.
- Silence is a legitimate output: a section the dossier cannot support does not get written.
- Every paragraph is mapped to its dossier fields in `copy/sources.md`; a paragraph with no line is not shippable.
- Evals: sourced-claim ratio (must be 100%), sections left honestly empty, copyeditor rounds to pass.

### humanizer (station 4b)
- Rewrites the draft so it does not read as generated. Rewrites only: facts arrive fixed and leave fixed.
- Targets the actual tells — triads, uniform sentence length, "nestled in the heart of", marketing verbs with no object, category nouns instead of concrete ones, relentless positivity, punctuation that is too clean.
- Leaves an honest limit in (reception closes at seven, it is a walk from town): the most credible sentence on a page is the one that admits something.
- Never chases a detector: no odd spellings, no injected typos, no invisible characters. The goal is prose a person would write, not prose that fools a classifier.
- Evals: tell-list hits before/after, facts preserved exactly, copyeditor voice score.

### copyeditor (station 4c)
- Independent review of the words before they reach a page; separate from `critic`, who judges the built site.
- Audits **every** claim against the dossier: `sourced` / `shared-context` / `framing` / `unsourced` / `contradicted`. One `unsourced` or `contradicted` fails the whole copy.
- Diffs the pre-humanizer draft against the final to catch facts that appeared or vanished in the rewrite — the likeliest place for an invented claim to enter.
- Then a voice audit, then a completeness audit against the `businessType`'s required fields.
- Never rewrites: writing a sentence for the page would end its ability to review it. Fails with specifics and names which agent the sentence goes back to.
- Max 2 rounds; still failing means the dossier cannot support a site, which in `mode: test` takes the business out of the run.
- Evals: claims audited per run, unsourced caught, false-pass rate measured against the critic's later findings.

### seo (station 4h)
- Classical search: Google, Bing and the map surfaces that actually send customers to a beach business.
- Emits JSON-LD from CMS content (`LodgingBusiness` / `Hostel` / `SportsActivityLocation` / `Store` per `businessType`), unique title + description + canonical + `hreflang` per page per locale, Open Graph, sitemap and robots.
- Local signals: name/address/phone identical to the business's Google listing, character for character; `geo` from the dossier; map embed lazy.
- Core Web Vitals are treated as ranking work, not polish: target LCP < 2.5 s, CLS < 0.1 on a mid-range phone on 4G, measured not estimated.
- The query that matters most is the business's own name — the site must answer it better than the OTA listing does.
- Fixes land in `templates/<variant>/`, never as per-site hacks. `aggregateRating` only from a real platform score in `ratings[]`, attributed to that platform.
- Evals: measured LCP/CLS before and after, structured-data validity, brand-query position over time.

### aiseo (station 4i)
- Answer engines, not results pages: the unit of work is a self-contained, attributable, machine-readable fact that survives being lifted out of the page.
- Writes the questions travellers actually ask for this `businessType`, ensures each has a direct answer in the rendered HTML near a matching heading, and emits `FAQPage` data alongside (not instead of) the business JSON-LD.
- Generates `/llms.txt` at build time from the same CMS content; never hand-maintained.
- Checks the built site with JavaScript disabled: a fact that lives only in the designer's canvas or WebGL does not exist.
- Sets the AI-crawler policy explicitly in `robots.txt` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…). Default **allow** — being quotable is the point — but it is the owner's decision and the writer must put it to them.
- Hard line: no hidden text, no prompt injection, nothing written for a model and concealed from a human. A page a model reads is the page a person reads.
- Evals: share of identified questions answered on-page, `/llms.txt` accuracy, no-JS fact coverage, citations observed in assistant answers over time.

### critic
- Two modes: **quick** (screenshot + rubric, for the 3 mockups) and **full** (final site).
- Rubric dimensions: facts match dossier · mobile + measured performance · booking CTA works end-to-end · brand fit vs playbook · copy quality · accessibility · security baseline present.
- Writes `reports/<run>/<slug>.md` with scores and a note on what the designer prompt got wrong.
- After the run: reads all reports + mockup picks + pitch outcomes and writes `proposals/<run>/` — one diff per proposal, each with the evidence that motivated it.
- Evals: agreement between critic pre-score and human pick; false-pass rate found by humans later.

### deployer (was packager)
- Two invocations per business (2026-10-05): **station 6 Preview** — `wrangler deploy` of the static build to `<brand>.os1.workers.dev` (noindex, robots `Disallow`, no sitemap), verified, no CMS; and **station 8 Deliver**, only after `outcome:sale` and the client's `product_chosen` line — the adapter below for the chosen mode. Nothing in the adapter table runs at station 6.
- One `base.md`; three adapter tool specs in `tools.md` — `managed`, `self_hosted_docker`, `static_only` — with their code in `deploy/<adapter>/`. The adapter is picked by the business's `hosting_mode`. Adapters never fork the site or the CMS (§1).
- Every adapter implements the same steps:

  | Step | What it does | managed | self_hosted_docker | static_only |
  |---|---|---|---|---|
  | `provision` | make the place the CMS runs | tenant in our Payload | compose stack on the client's VPS | skip |
  | `seed` | tenant + content + assets from the dossier | ✓ | ✓ | skip |
  | `deploy` | build the Astro site and put it live | `wrangler deploy` to the site's Worker (the same Worker as the station-6 preview, now built from Payload) | build inside the stack, served by Caddy | build, no CMS |
  | `attach_domain` | client's domain on the site | Cloudflare (Registrar, billed through) | DNS to the client's box, Caddy HTTPS | client's host |
  | `verify` | owner login works, one edit round-trips to the live site | ✓ | ✓ | skip |
  | `handoff` | credentials sheet, revoke our keys | skip | ✓ — kit from `handoff/`, then `access_revoked` | zip + README only |
  | `export` | static zip that runs on any host | ✓ optional | ✓ | ✓ — the deliverable (build + source) |

- Owner credentials are always handed over sealed, never in a README or zip.

### writer
- Proposal page: before vs after, what was fixed, and what the owner would be able to edit alone once they choose a product with the CMS. The preview is a finished static build: the pitch never claims a CMS, login or domain exists yet.
- The pitch presents the products **for the client to choose** and states the trade honestly: **managed** (recommended; monthly fee, we host it, they edit it, we keep it alive — hosting, updates, backups are ours) · **self-hosted on their own VPS** (one-time fee, fully theirs, ~$6–12/mo to their host, they carry updates and backups) · **static only** (the finished site as files, no CMS; edits need a developer). The choice comes back after a sale and is logged as `product_chosen` (gate e).
- Preview URL from the ledger's `previewed` line (`deploy.json` exists only after station 8).
- Outreach message in the local language, short, with the preview (`*.workers.dev`) link.

---

## 6. CMS + server hardening

One Payload instance serves every client (§1). Client sites are static files on Cloudflare, so there is nothing to patch on them; the single ops surface is our CMS server. A client gets a tenant only at station 8 Deliver, after a sale and their product choice; the pipeline up to the pitch never needs the CMS (2026-10-05).

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
3. Approved diffs are merged, the agent's version bumps (semver pins in each active run file), CHANGELOG gets one line per diff.
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
- Hand-pick one business in the Mirissa stretch. Run Harvest → Mockups → pick → Build → Critique → Preview → Pitch manually, station by station.
- Goal: one site live on its `*.workers.dev` preview and one pitch page. The owner's Payload login comes at Deliver, after a sale (2026-10-05).
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

- ~~Image rights~~ Decided 2026-09-18: business-owned images and review photos with credit. **Amended 2026-09-20 (Shahar): freely-licensed ATMOSPHERE photography is allowed** — the place, the coast, the wave, the light, the town — fetched by `tools/fetch-atmosphere.mjs` from Wikimedia Commons, CC0 and CC BY only (no share-alike, no NC, no ND), stored in `dossier/<slug>/stock/` with author, licence and the required credit string, and displayed with that credit. The business's own photographs remain the only source for anything about the business. The hard line stands and `rubric.md` still fails a build for it: **a non-business photograph is never presented as the business** — no borrowed room, pool, interior, meal or face. **Second hard line, added the same day after it was crossed: an atmosphere photograph may not be presented as a place it is not.** The first build of KA's site carried Hikkaduwa (33 km up the coast), Weligama, Thiranagama and Negombo (180 km) on a page about Ahangama, plus an Admiralty chart plan titled *Weligama Bay*. That is the same class of error as inventing a price. Every entry now records `place` and `place_ok` (`local` = the business's own locality, `neutral` = open sea, sky or a detail with no landmark and no other place named in its credit), and `tools/check-places.mjs` fails a build that uses anything else. **CC BY-SA is allowed for display only** — such a file is shown whole with its credit and is never cropped, re-saved or fed through a shader, because share-alike binds adaptations; that distinction is what makes the genuinely-local photography usable, since almost all of it is BY-SA. Every atmosphere image is looked at before use and carries a written description; across two rounds twenty-four of thirty-four fetched images were rejected on sight, including a candlelight vigil that a filename called "Kabalana", a five-star hotel's suite, and nine tea-factory interiors filed under "Ahangama". Generated imagery: still no.
- ~~Booking~~ Decided 2026-09-18: WhatsApp/phone, plus links to the booking platforms the business is already on (Booking.com, Agoda, Airbnb…) via `bookingLinks[]`. No form → email.
- Decided 2026-09-18: one owner login per business; self-hosted editor lives at `<domain>/admin`.
- Decided 2026-09-18: sites are English only for now; multilingual later targets the audience (German, Spanish, Portuguese, Russian…), not Sinhala.
- Decided 2026-09-18: the server deploys with a scoped Cloudflare API token, never a personal login.
- Decided 2026-09-18: Worker name = the customer's brand slug, no Oneshot prefix. Dedicated Oneshot Cloudflare account (login shaharnaor@outlook.com), workers.dev subdomain `os1` → preview links look like `<brand>.os1.workers.dev`. No other Cloudflare account is ever used.
- Decided 2026-09-18: our CMS server = second OCI account ("shibumi", Frankfurt), A1 2 OCPU / 12 GB, Pay As You Go with a free-tier quota cap. Instance `oneshot-cms` is up; both spike suites pass on it (ARM64 proven). Details: `infra/oci/README.md`.
- Decided 2026-09-18: mockup 1 (calm) skips the canvas/WebGL animation; if it is picked, the animation is added in the build. → needs a line in `agents/designer/custom.md` (proposal below).
- ~~Open 2026-09-21: the Payload collection is behind the schema. `spikes/payload/cms/src/collections/Sites.ts` is still v0.1; `schemas/site-content.md` is v0.3 (v0.2 `businessType` + per-type modules, v0.3 `forecast`). Not needed for stations 4d–4f; must be closed before a 4g build binds to those fields.~~ Closed (checked 2026-10-05): the production app `cms/app/src/collections/Sites.ts` (header "schema v0.8": `businessType` + the `rooms` / `lessons` / `rentals` / `amenities` modules, `forecast`, `featureLine`, `closing`, `ratings[].capturedAt`, `heroVideo` / `heroVideoPoster` / `videos[]`) + `Media.ts` (MP4/WebM accepted) implement `schemas/site-content.md` v0.8, and v0.9 adds no field (renditions are made by the build). The spike's copy under `spikes/` stays v0.1 and is not used. Note: the CMS *server* may run an older build (ledger 2026-10-05: "shared CMS 0.7.0 has no video support"); upgrading it is station 8 work.
- Pitch channel: WhatsApp, email, or in-person? Affects what the writer produces.
- Pricing/offer in the pitch — out of scope for the pipeline or a template?

---

## 10. First session in VS Code — checklist

1. `git init`, add this file, create the layout in §2.
2. Write `CLAUDE.md`: point to PLAN.md, state the gate rule (never pass a human gate unattended), the ledger rule (every transition is logged), and the two-layer prompt rule.
3. Create `run.yaml` (§3) for Mirissa.
4. Paste Shahar's designer paragraph into `agents/designer/custom.md`, the six URLs into `references.md`.
5. Start Phase 1 with the reference-site analysis and the CMS spike in parallel.
