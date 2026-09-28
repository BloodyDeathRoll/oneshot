# Session Handoff — 2026-09-28

## Goal
Build Oneshot's internal dashboard (read the ledger at a glance, drill down, answer the human
gates from the page) through creative director → designer → critic with Shahar's pick gate; keep
the three Ahangama sites (run `2026-09-ahangama-02`) parked at `packaged` until Shahar sends the
pitches; fold the process learnings into the generic `~/Projects/design-loop` package.

## Current State
- **Dashboard shipped, PASS.** Picked direction B "Soft cards" (Shahar, 2026-09-27); all five
  views (Overview, Pipeline, Sites, Agents, Decisions) built from real ledger data; critic final
  pass 86/100, forms review 88/100, no hard fails. Palette **locked** to purple `#6A2FE0`
  (Shahar: "back to the purple, lock it down"), blue `#1F4BFF` for links only — marked LOCKED in
  `src/index.html` and `dashboard/BRIEF.md` Amendments.
- **Control layer step 1 works** (`proposals/dashboard-01/001`, approved 2026-09-27):
  `node dashboard/server.mjs` → http://127.0.0.1:8970, live `data.json` + SSE; the four gate
  forms (shortlist / pick / pitch+outcome / proposal) POST `/decide`, which appends exactly one
  `human` ledger line after a stale-state check; a decided proposal cannot be decided twice (409).
  Tested only against ledger copies; **no real decision has been written through it yet.**
- Read-only snapshot: `node dashboard/mockups/soft-cards/build.mjs` → `dist/index.html`
  (zero requests, forms disabled). Published: https://claude.ai/artifact/99EX88HbA7rDWhfg2nVE9L (v5, purple).
- Three sites: still `packaged`, pitches drafted, not sent. Ledger: run 02 unchanged.
- `origin/main` = `~/Projects/oneshot` main = `230b26e`; the worktree has ONE unpushed commit
  `a605081` (proposal 006, Laya pilot). Branch `resume-session` also pushed at 230b26e.
- Figma `Workflows` file, frame `oneshot-workflow` (198:2): updated 2026-09-28 (Dashboard card
  `308:2`, Deliver/Pitch/gate/rule-1 texts, schema v0.7).
- `~/Projects/design-loop` 0.2.0 + `design-loop.zip`: rewritten agents/command/rubric/taste, two
  job types, `ref/`, templates, `shoot.mjs --widths/--hash/--reduced-motion` (tool smoke-tested;
  the `/design-loop` command NOT run end to end).
- **Open from the critic on the forms** (low, not fixed): live re-render aborts if a Sites card has
  no critic score (`countUp(null)`); focus drops to body after a decided row disappears; pick panel
  probes 8 missing sheet paths; read-only mode renders dead forms; shortlist gate loses the other
  rows' forms after one approval (batch "approve N" needs Shahar's call).
- **Untested:** the server behind Caddy/tunnel for the phone; real phones/GPUs for the sites.

## Active Files
- `dashboard/BRIEF.md` — Shahar's product-UI brief + dated Amendments (accent history, lock).
- `dashboard/data.mjs` + `DATA.md` — the data layer (`buildData({ledgerPath})`), every field → source.
- `dashboard/server.mjs` — control layer (GET /data.json, /events, /gates, /files/<allowlist>; POST /decide).
- `dashboard/mockups/soft-cards/{src/index.html,build.mjs,dist/,notes.md,shots/round-1..11}` — the picked build; rounds 10–11 = forms.
- `dashboard/mockups/{instrument,statement}/` — the two unpicked directions (kept).
- `dashboard/concepts.md`, `dashboard/critique-mockups.md` (rounds + "Final build" + "dashboard-02 forms"), `dashboard/gate-01.html`, `dashboard/mockups/overviews-1440.png`, `final-1440-*.png`, `forms-1440-*.png`.
- `dashboard/template.html` + `tools/dashboard.mjs` — the earlier register page (superseded, still renders).
- `docs/expenses.md` (schema, file not yet created), `docs/pricing.md` (DRAFT price sheet, numbers unconfirmed), `docs/ledger.md` (+ `proposal:approved|rejected` line shape).
- `proposals/dashboard-01/001-control-layer-gates.md` (approved), `proposals/2026-09-ahangama-02/006-laya-classifier-pilot.md` (filed, undecided).
- `ledger.jsonl` — runs `dashboard-01` (briefed→…→passed) and `dashboard-02` (briefed→built→passed), one `proposal:approved` line.
- `.gitignore` — `dashboard/index.html`, `dashboard/data.json` ignored; `dashboard/mockups/*/dist/` kept.

## Changes Made This Session
1. Resumed; answered Shahar's six workflow questions (tracker, affiliates — **pinned, not started**, leads, upsells, prices, expenses).
2. First dashboard = a register page (`tools/dashboard.mjs`, `template.html`); Shahar: too much → overview + drill-down. Both superseded by the product build but left in place.
3. Shahar's BRIEF (dashboard/BRIEF.md) → CD wrote three directions → three designers in parallel → critic (81/79/83) → gate page → **pick B**, reason verbatim in ledger.
4. Data layer moved to `dashboard/data.mjs`; fixed by critic findings: critic overrides misattributed; critic score = latest scored verdict (KA 86, not 92); proposals read decisions from the ledger.
5. B built out (purple), critic PASS 86, round 9 polish (thumbnails 4 MB→87 KB, focus, accent budget).
6. Proposal 001 written and approved → `server.mjs` + forms; critic PASS 88.
7. Accent: purple → `#0E34CB` (Shahar) → **back to purple, locked** (Shahar). Lesson: republish the artifact the moment a visual change lands.
8. Pushed main (fast-forward) on "push all"; local main fast-forwarded too.
9. Price sheet draft, Laya proposal, Figma frame update, design-loop 0.2.0.

## Failed Attempts
- **Colour change invisible for an hour:** I routed the recolour through the designer and never republished the artifact; Shahar saw purple and thought nothing happened. Republish after every visual change.
- **Data layer bugs, page blamed twice:** critic rounds counted human lines; critic score took round 3 not the later verification; critic card showed the copyeditor's overrides. When a number is wrong, check `data.mjs` first.
- **Register dashboard (v1) rejected** as "mass of info"; the at-a-glance overview is what Shahar wants.
- **A corrupted `:root` (orange `#F0A20D`) appeared in `src/index.html`** between designer rounds, from no agent — likely a manual edit. Purple restored; watch for hand edits in `src/`.
- **`pkill` in a `&&` chain** aborted later steps (exit 144) twice — put the kill last or `; true`.
- **`NODE_PATH` doesn't resolve ESM imports**; testing design-loop's `shoot.mjs` needed a copy inside the worktree.
- Shared `tools/shoot.mjs` still lacks `--width`/`--hash`; designers used scratch copies. (Fixed only in the design-loop package's copy.)

## Next Step
1. Ask Shahar: push `a605081` (Laya proposal) to main? decide proposal 006 (pilot yes/no)?
   confirm the price sheet numbers (`docs/pricing.md` §5)? shortlist batch "approve N"?
2. Then the phone path for the control layer: run `dashboard/server.mjs` on the CMS VPS behind
   Caddy + basic auth (or a Cloudflare tunnel) — a `deploy/` script + README; test `/decide`
   from a phone against a ledger copy first.
3. Fix the five low critic items on the forms (`dashboard/mockups/soft-cards/src/index.html`).
4. Pitch gate for the three sites is Shahar's: `packaged → pitched` (now possible from the dashboard).
Pinned: affiliate links (Shahar: "put a pin on it").
