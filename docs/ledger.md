# ledger.jsonl schema

`ledger.jsonl` is append-only. One JSON object per line, one line per business state change. Never rewrite or delete lines; a correction is a new line.

## Fields

| Field | Type | Description |
|---|---|---|
| `ts` | string | UTC timestamp, ISO 8601 (`2026-09-17T14:05:00Z`), when the transition completed |
| `run_id` | string | `run_id` of the session's run (`runs/<run_id>.yaml`, `node tools/run.mjs`) |
| `slug` | string | Business slug; matches `dossier/<slug>/` and `sites/<slug>/` |
| `from_state` | string \| null | Previous state; `null` only for a business's first line — `discovered` (outbound), `briefed` (inbound, a human line) or a mockup-pick (gate b) fork's `picked` — and for gate (d) proposal decisions (`slug: "-"`) |
| `to_state` | string | New state |
| `agent` | string | Who made the transition: `orchestrator`, `analyst`, `scout`, `harvester`, `auditor`, `visual-critic`, `experience-critic`, `copywriter`, `humanizer`, `copyeditor`, `creative-director`, `designer`, `seo`, `aiseo`, `critic`, `deployer`, `writer`, or `human` for gates |
| `agent_version` | string \| null | Semver pinned in the run file (`runs/<run_id>.yaml`); `null` when `agent` is `human` |
| `note` | string | Short free text: reason, score, pick reason, error, outcome detail |
| `operator` | string | Who ran the session that wrote the line, an id from `team.json` (`node tools/team.mjs whoami`). For `agent: "human"` lines it is the person who decided. Required from 2026-10-02 (docs/team.md); lines before that have none and are Shahar's |
| `hosting_mode` | string, optional | `managed` \| `self_hosted_docker` \| `static_only`. Present on every station-8 line written by the `deployer`, and required on the `human` `product_chosen` line that records the client's choice. The last line that carries it is the business's hosting mode; absent = the run file's `hosting.default_mode`. A `previewed` line does not need it (the preview is the same static build for every mode). |

The first eight fields are present on every line, and `operator` on every line from 2026-10-02.

## States (PLAN.md §4)

`discovered → scored → shortlisted → approved → harvested → audited → copy_drafted → copy_humanised → copy_passed | copy_failed → concepted → mocked → picked → built → optimised → ai_optimised → critiqued(n) → passed | failed → previewed → packaged → pitched → outcome:{reply,meeting,sale,ignored}`

After `outcome:sale`: `→ product_chosen → delivered` (and for `self_hosted_docker` `→ handoff_verified → access_revoked`).

Inbound runs (`engagement: inbound`, PLAN.md §4 "Inbound engagement", from 2026-10-17): `briefed → planned → lanes_approved → researched → aligned → harvested → …`, the same as above from `harvested`.

- `briefed`: `agent: "human"`, `from_state: null`, note `client brief: brief/<slug>/brief.md`. The first line of an inbound business; no `discovered`, `scored`, `shortlisted` or `approved`.
- `planned` (analyst, planner) is written when `dossier/<slug>/industry/plan.md` exists. Gate a′: a human approves the lanes, `planned → lanes_approved` (`agent: "human"`, note = changes to the lanes, if any).
- `researched` (analyst, merger) is written when `industry.md` and `dossier/<slug>/direction.md` exist and every claim in `industry.md` is a skeptic survivor. Gate b′: a human, with the client, confirms the direction, `researched → aligned` (`agent: "human"`, note = what the client changed).
- The mockup pick (gate b), every run (2026-10-17): the `picked` note names every variant Shahar keeps; each becomes its own site. The orchestrator forks each variant after the first as `<slug>-<variant>`: its first line is `null → picked`, note `forked from <slug> at picked: <variant>`, and it continues alone. Another series of three is a human `mocked → copy_passed` line, note `new series: <why>`; a later `picked` may name mockups from any series (`series-<n>/<variant>`).

- `audited` (auditor, station 3b, proposal 007) is written when `dossier/<slug>/audit.json` exists and validates against `schemas/audit.md`; a business with no old site is still `audited` (`scope: no_site`). Businesses already past `harvested` before 007 are not sent back.
- `copy_drafted` (copywriter) → `copy_humanised` (humanizer) → `copy_passed` or `copy_failed` (copyeditor) all run before `concepted`, so the copy exists before anyone designs. `concepted` (creative-director) is written when `sites/<slug>/concepts.md` exists: the page archetype for the business and its three concepts. The designer builds those, and `mocked` follows. A `copy_failed` line names the round; after two failures the business leaves the run in `mode: test`.
- `optimised` is written by the `seo` agent, `ai_optimised` by the `aiseo` agent; both run after `built` and before the first `critiqued(n)`. A rebuild after a failed critique re-runs both, appending the pair again.
- `critiqued(n)` is written literally with the round number: `critiqued(1)`, `critiqued(2)`, `critiqued(3)`. Its `note` leads with the rubric total out of 100: `PASS|FAIL NN/100` (critic dimensions 1–7 out of 80, plus dimension 8 = the lower visual score × 2.5, the sum × 100 ÷ 105, one decimal; rubric 0.3.2). A critic-only part score is never the headline (Shahar, 2026-10-17).
- `previewed` (deployer, station 6 Preview) is written when the static build of `sites/<slug>/final/` is live on `<brand>.os1.workers.dev` and verified (200s, live HTML byte-identical to the local build, noindex, robots `Disallow`, no sitemap). Its `note` carries the preview URL and that evidence: it is where the writer takes the URL from. No CMS, tenant, owner login or domain is made for it.
- `packaged` (from 2026-10-05) is written when the writer's pitch exists under `sites/<slug>/pitch/` and (from 2026-10-17) its proposal page is live on `<brand>-proposal.os1.workers.dev`; the business then waits at gate c for a human to send it (`packaged → pitched`).
- `product_chosen` is gate e, after `outcome:sale`: `agent: "human"`, `from_state: "outcome:sale"`, `hosting_mode` = what the client chose (`managed` | `self_hosted_docker` | `static_only`), `note` = how the client said it. Nothing for the CMS, a domain or an owner login is done before this line exists.
- `delivered` (deployer, station 8 Deliver) is written when the chosen mode's adapter has finished: `managed` — tenant, seed, publish, domain, owner login and `verify` passed; `static_only` — build + zip checked; `self_hosted_docker` — installed and verified on the client's box, then it continues below. The line carries `hosting_mode`; `sites/<slug>/deploy.json` exists from here on.
- `self_hosted_docker` only, once the client has chosen it: `… → delivered → handoff_verified → access_revoked`. `handoff_verified` = the adapter's `verify` passed on the client's box and the handoff kit is complete. `access_revoked` = our keys, users and tokens are removed from the client's box and checked to no longer work.
- `void` (2026-09-28): a human voids a run's business; its files are deleted, its earlier lines stay (append-only), and the dashboard shows it as voided.
- Outcomes are written as `outcome:reply`, `outcome:meeting`, `outcome:sale`, `outcome:ignored`.
- Human-gate transitions (`shortlisted → approved`, `mocked → picked`, `packaged → pitched`, `outcome:sale → product_chosen`, and for inbound `briefed`, `planned → lanes_approved`, `researched → aligned`) always have `agent: "human"`. Either operator may pass any gate; `operator` says which one did.
- Work that is not a state change (a fix, a tweak, a re-cut) is not a ledger line: it goes to `activity.jsonl` (docs/team.md).
- Gate (d), prompt diffs (approved 2026-09-27, proposals/dashboard-01/001): a decision on a file under `proposals/` is a line with `slug: "-"`, `agent: "human"`, `from_state: null`, `to_state: "proposal:approved"` or `"proposal:rejected"`, `note: "<file>: <reason>"`. The merge itself (version bump, CHANGELOG) is a later code change, recorded by its commit, not by the ledger.

The current state of a business is the `to_state` of its last line for the current `run_id`.

## History: `packaged` before 2026-10-05

Until 2026-10-05 station 6 was Deliver and ran before the pitch: the deployer made the CMS tenant, seeded it, deployed and set up the owner login, and the line it wrote was `passed → packaged`, meaning "full deploy done" (e.g. run `2026-09-ahangama-02`, 2026-09-25). On 2026-10-05 Shahar moved the CMS after the sale ("We build a demo to sell to a client. If we succeed and the client wants a CMS, THEN you implement a CMS. NOT BEFORE."): station 6 is now Preview (`previewed`), `packaged` now means "pitch written, not sent", and the full deploy is `delivered` at station 8. The old lines are not rewritten (append-only); read a `packaged` line dated before 2026-10-05 in its old meaning.

## Examples

```jsonl
{"ts":"2026-09-18T08:12:41Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":null,"to_state":"discovered","agent":"scout","agent_version":"0.1.0","note":"found via OSM + Google Places; inside shore buffer"}
{"ts":"2026-09-18T08:15:03Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":"discovered","to_state":"scored","agent":"scout","agent_version":"0.1.0","note":"presence 1/5: Facebook page only, no booking path"}
{"ts":"2026-09-18T09:40:27Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":"shortlisted","to_state":"approved","agent":"human","agent_version":null,"note":"Shahar approved shortlist"}
```
