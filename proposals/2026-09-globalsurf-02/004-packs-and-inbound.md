# 004 — Packs (market × vertical) and the inbound workflow

Filed 2026-10-17 on Shahar's instruction ("Packs seems the logical choice … write the proposal").
A proposal for PLAN.md, CLAUDE.md, `docs/ledger.md`, the dashboard and one new agent. Nothing is
built; no `custom.md` is touched.

## What it changes, in one sentence

Oneshot stops being "surf businesses in Sri Lanka, found cold" and becomes one repo that runs any
**workflow** = a *market* pack × a *vertical* pack × an *engagement* (outbound as today, or
**inbound**: a known client with a brief), with one ledger, one dashboard and one learning loop.

## Why

Three jobs are on the table: the surf run (Sri Lanka, outbound), an Israeli brand-design studio
with a brief (inbound, Hebrew, one business), and later mom-and-pop businesses in the US. Today
"surf" and "Sri Lanka" are hard-wired in the run file (`types`, coastline `area`),
`schemas/business-types.md`, the `businessType` enum and `forecast` module in
`schemas/site-content.md`, scout and designer `base.md`, the designers' and creative-director's
`references.md`, and `tools/check-places.mjs` / `tools/fetch-atmosphere.mjs`. Forking the repo per
job splits the agents, the proposals and the dashboard. Packs keep one of everything.

## 1. Packs

```
markets/<id>/            # where
  market.md              # language(s), script direction, currency, legal bits, pitch language and tone
  sources.md             # scout sources: directories, maps, review platforms that matter here
verticals/<id>/          # what
  taxonomy.md            # what counts as in-scope per type (replaces the root taxonomy.md)
  business-types.md      # the type registry: modules of schemas/site-content.md per type
  references.md          # curated sites for the creative-director and designer
  playbook.md            # what a great site in this vertical is (optional; the root playbook stays)
  custom.md              # Shahar's taste for this vertical (optional, Shahar writes, never Claude)
```

- First packs: `markets/lk`, `verticals/surf` (moved from today's files, byte-identical content),
  `markets/il`, `verticals/brand_design`.
- The run file names one of each: `market: lk`, `vertical: surf`, `engagement: outbound | inbound`.
  Missing fields default to `lk` / `surf` / `outbound`, so every existing run file still parses.
- `tools/prompt.mjs` adds the pack files as layers after `run.yaml`; `agents/wiring.json` lists them
  as `pack:<file>`; `tools/check-wiring.mjs` fails if the named pack does not exist.
- Agents' `base.md` lose the words "surf" and "Sri Lanka": "surf-related" becomes "in scope per the
  vertical's taxonomy"; the designer's "Light themes. Every surf business" becomes a vertical
  playbook rule under `verticals/surf/`. Each is a normal versioned diff with a CHANGELOG entry.
- Schema: `schemas/site-content.md` stays the one schema. `businessType` becomes free text validated
  against the vertical's `business-types.md`; the `forecast` module is marked "surf vertical only".
  No second schema, no second renderer.
- Ledger: no new field. `run_id` → run file → packs. Convention: `runs/<yyyy-mm>-<market>-<vertical>-NN.yaml`
  (`2026-10-il-brand-01`).
- A **one-off** is a pack used by one run. Nothing else is special about it.

## 2. The inbound engagement

Outbound (today): Target → Scout → shortlist gate → Harvest → … → Pitch → sale.
Inbound: the client exists, has agreed, and says what they want. No Scout, no shortlist, mode `live`.

| # | Station | Agent | Input | Output | Gate |
|---|---|---|---|---|---|
| 1 | Brief | human | the client's words | `brief/<slug>/brief.md`: goals, must-haves, dislikes, references they like, languages, deadline, budget band | — |
| 2 | Industry | analyst (new) | brief, run file, packs | `dossier/<slug>/industry/`: `plan.md`, `lane-<x>.md` per lane, `skeptic.md`, `industry.md` | **a′. Human approves the research lanes** |
| 3 | Align | analyst | brief, `industry.md`, old site | `dossier/<slug>/direction.md`: the brief read back in our words, positioning, audience, what the site must do, page-archetype hints, open questions for the client | **b′. Human (with the client) confirms the direction** |
| 4 | Harvest | harvester | brief, direction, client-supplied assets | `dossier/<slug>/dossier.json` as today; new source kind `client` for anything the owner handed us | — |
| 5 | Audit | auditor | as today | as today | — |
| 6 | Copy, humanize, copy review | as today, per language in `run.yaml` | as today; RTL languages flagged in `copy/<locale>.json` | — |
| 7 | Concept, mockups, pre-score | as today, with `direction.md` and the vertical's references as inputs | as today | **c. Shahar picks what the client sees: one, two or three mockups, or another series of three** |
| 8 | Build, SEO, AI SEO, critique, preview | as today | as today | — |
| 9 | Proposal | writer | brief, direction, preview, old vs new | proposal page on `<brand>-proposal.os1.workers.dev`: brief → what was delivered, item by item; the three hosting modes, no price. **No cold outreach message.** | **d. Human sends** |
| 10 | Sale, product choice, deliver | as today | as today | **e. Client chooses the mode** |

Ledger states for inbound: `briefed → researched → aligned → harvested → audited → …` identical to
today from `harvested` on. `briefed` is written by a human (`agent: "human"`, `from_state: null`,
note "client brief"). Gate a′ is `researched` waiting; gate b′ is `aligned`, written by a human.

### The analyst (new agent, `agents/analyst/`)

Shape taken from `~/Projects/graph-flow`: planner → parallel researcher lanes → skeptic → merger.
One agent folder, four roles described in `base.md`; the runner is the orchestrator.

- **Planner** reads the brief and proposes lanes. Default lanes: what the industry is and how it
  makes money; the meta of sites in this space and what converts; key players and their sites (with
  screenshots, scratch, deleted after the round); the client's current position; the audience and
  what it searches for. Stops at gate a′.
- **Researchers** run in parallel, one file each, and mint claims `C-<lane>-NN` with evidence,
  source, date, confidence and what would change their mind.
- **Skeptic** rules on every claim: SURVIVES / WEAKENED / KILLED; five mandatory attack passes
  (unsupported, stale, ignored competitors, pain vs willingness to pay, confident but unproven);
  may reopen one lane once.
- **Merger** writes `industry.md` citing survivors only, WEAKENED claims in narrowed form, and
  lists what was killed. Then writes `direction.md` for gate b′.
- The copyeditor may mark copy `sourced` against a surviving claim ID, so industry statements on
  the site are as auditable as dossier facts.
- **Pack drafting:** when the run's vertical has no pack yet, the merger also drafts
  `verticals/<id>/taxonomy.md`, `business-types.md` and `references.md` as a proposal under
  `proposals/<run-id>/`. Shahar approves, the pack exists. One-off verticals cost no hand-written pack.
- Never edits a lane file to fix a contract violation; sends it back to the lane.

Files: `base.md`, `custom.md` (empty, Shahar's), `references.md` (graph-flow's CONTRACTS as the
output contract), `tools.md` (web search, `tools/shoot.mjs` for competitor screenshots,
`tools/funnel.mjs` on competitor sites), `evals.md` (claims killed per lane, claims cited by the
copy, direction accepted at b′ without rewrite), `CHANGELOG.md`. Version 0.1.0.

### Writer changes (proposal station, inbound)

- Input adds `brief.md` and `direction.md`; output drops the outreach message.
- The page opens with the brief, then shows each ask answered with where on the site it lives.
- Hosting-mode options stay, with no price; "we host it, you edit it" stays the recommendation.
- Outbound behaviour unchanged. `engagement` in `run.yaml` selects the shape. Bump to 0.5.0.

### Orchestrator changes

- Reads `engagement`; inbound skips stations 2 and gate a, expects `briefed` as the first line,
  runs the analyst for stations 2–3 and stops at a′ and b′.
- Hard constraint 1 lists the two new gates. Bump to 0.5.0.

## 3. Dashboard

Organising unit: **workflow** = market × vertical. Runs belong to a workflow, businesses to a run.

1. **Workflow chips** across the top, plus "All". A chip exists only for a workflow with at least
   one run. Default chip = the viewer's active run's workflow. Scopes everything below except 2.
2. **Needs you** stays global: every gate from every workflow, tagged with its workflow chip.
3. **KPIs, funnel, deltas** are per workflow; deltas compare runs of the same workflow only; "All"
   sums and shows no deltas. Inbound funnels start at `briefed`; gate a never appears.
4. **Business table** gains `market` and `vertical` columns (hidden on mobile like `type`/`run`);
   filter `workflow=` next to `run=`.
5. **Business page** header shows its workflow once.
6. **Agents table** adds the packs each active run uses.
7. `data.mjs`: `run` gains `market, vertical, engagement, workflow`; new `workflows[]` with the
   per-workflow KPI set; `gate_states` gains `researched` (a′) and `aligned` (b′) for inbound runs.
   `DATA.md` updated in the same commit.

Not now: a landing page with one card per workflow. Worth it at ~10 workflows, noise at 3.

## 4. What does not change

The architecture block in CLAUDE.md (one CMS, Astro static builds, Workers, Cloudflare domains,
the three hosting modes, the CMS only at Deliver). The ledger is append-only and gains no field.
The two-layer prompt rule. The gates listed today, plus a′ and b′ for inbound.

## 5. Order of work (each a PR)

1. Packs: folders, `markets/lk` + `verticals/surf` moved, `tools/prompt.mjs` + `wiring.json` +
   `check-wiring.mjs`, run-file defaults. Existing run unchanged in behaviour.
2. PLAN.md §3, §4 (inbound table), §5 (analyst), CLAUDE.md resume rules, `docs/ledger.md` states.
3. Analyst agent 0.1.0, orchestrator 0.5.0, writer 0.5.0.
4. Dashboard: chips, columns, per-workflow KPIs, new gate states.
5. `markets/il`, `verticals/brand_design` (drafted by the analyst on the first inbound run),
   `runs/2026-10-il-brand-01.yaml`, first `briefed` line.

## 6. Shahar's answers (2026-10-17)

- **Pack granularity:** one `brand_design` vertical, for the current one-off client. Widen it only if more clients fit this workflow.
- **Mockup pick (gate c):** Shahar picks what the client sees, not the client. He keeps one mockup, or two or three, or asks for another series of three and picks from those. The gate line is `agent: "human"` as today.
- **Price on the proposal page:** none for the inbound one-off; the writer leaves fees out. Outbound Sri Lanka prices are a suggestion in `docs/pricing.lk.json`, shown on the dashboard's Pricing tab, and stay out of pitches until decided.

## 7. As applied (2026-10-17)

- **Inbound states corrected.** §2 put gate a′ (approve the lanes) at `researched`, after the research it approves. Applied as `briefed → planned → lanes_approved → researched → aligned`: `planned` = the planner's lanes, waiting for a′; `researched` = `industry.md` + `direction.md`, waiting for b′.
- **Gate c with more than one mockup kept:** a second human `picked → picked` line names the one to build; another series is a human `mocked → copy_passed` line.
- **Pack layers** are named `market/<file>` and `vertical/<file>` in prompts and `wiring.json`, resolved through the run like `run.yaml`.
