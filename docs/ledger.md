# ledger.jsonl schema

`ledger.jsonl` is append-only. One JSON object per line, one line per business state change. Never rewrite or delete lines; a correction is a new line.

## Fields

| Field | Type | Description |
|---|---|---|
| `ts` | string | UTC timestamp, ISO 8601 (`2026-09-17T14:05:00Z`), when the transition completed |
| `run_id` | string | `run_id` of the session's run (`runs/<run_id>.yaml`, `node tools/run.mjs`) |
| `slug` | string | Business slug; matches `dossier/<slug>/` and `sites/<slug>/` |
| `from_state` | string \| null | Previous state; `null` only for the first line of a business (`discovered`) |
| `to_state` | string | New state |
| `agent` | string | Who made the transition: `orchestrator`, `scout`, `harvester`, `auditor`, `visual-critic`, `experience-critic`, `copywriter`, `humanizer`, `copyeditor`, `creative-director`, `designer`, `seo`, `aiseo`, `critic`, `deployer`, `writer`, or `human` for gates |
| `agent_version` | string \| null | Semver pinned in the run file (`runs/<run_id>.yaml`); `null` when `agent` is `human` |
| `note` | string | Short free text: reason, score, pick reason, error, outcome detail |
| `operator` | string | Who ran the session that wrote the line, an id from `team.json` (`node tools/team.mjs whoami`). For `agent: "human"` lines it is the person who decided. Required from 2026-10-02 (docs/team.md); lines before that have none and are Shahar's |
| `hosting_mode` | string, optional | `managed` \| `self_hosted_docker` \| `static_only`. Present on every line written by the `deployer`, and on the `human` line that records a client's choice of mode. The last line that carries it is the business's hosting mode; absent = the run file's `hosting.default_mode`. |

The first eight fields are present on every line, and `operator` on every line from 2026-10-02.

## States (PLAN.md §4)

`discovered → scored → shortlisted → approved → harvested → audited → copy_drafted → copy_humanised → copy_passed | copy_failed → concepted → mocked → picked → built → optimised → ai_optimised → critiqued(n) → passed | failed → packaged → pitched → outcome:{reply,meeting,sale,ignored}`

- `audited` (auditor, station 3b, proposal 007) is written when `dossier/<slug>/audit.json` exists and validates against `schemas/audit.md`; a business with no old site is still `audited` (`scope: no_site`). Businesses already past `harvested` before 007 are not sent back.
- `copy_drafted` (copywriter) → `copy_humanised` (humanizer) → `copy_passed` or `copy_failed` (copyeditor) all run before `concepted`, so the copy exists before anyone designs. `concepted` (creative-director) is written when `sites/<slug>/concepts.md` exists: the page archetype for the business and its three concepts. The designer builds those, and `mocked` follows. A `copy_failed` line names the round; after two failures the business leaves the run in `mode: test`.
- `optimised` is written by the `seo` agent, `ai_optimised` by the `aiseo` agent; both run after `built` and before the first `critiqued(n)`. A rebuild after a failed critique re-runs both, appending the pair again.
- `critiqued(n)` is written literally with the round number: `critiqued(1)`, `critiqued(2)`, `critiqued(3)`.
- `self_hosted_docker` only, once the client has chosen it: `… → handoff_verified → access_revoked`. `handoff_verified` = the adapter's `verify` passed on the client's box and the handoff kit is complete. `access_revoked` = our keys, users and tokens are removed from the client's box and checked to no longer work.
- `void` (2026-09-28): a human voids a run's business; its files are deleted, its earlier lines stay (append-only), and the dashboard shows it as voided.
- Outcomes are written as `outcome:reply`, `outcome:meeting`, `outcome:sale`, `outcome:ignored`.
- Human-gate transitions (`shortlisted → approved`, `mocked → picked`, `packaged → pitched`) always have `agent: "human"`. Either operator may pass any gate; `operator` says which one did.
- Work that is not a state change (a fix, a tweak, a re-cut) is not a ledger line: it goes to `activity.jsonl` (docs/team.md).
- Gate (d), prompt diffs (approved 2026-09-27, proposals/dashboard-01/001): a decision on a file under `proposals/` is a line with `slug: "-"`, `agent: "human"`, `from_state: null`, `to_state: "proposal:approved"` or `"proposal:rejected"`, `note: "<file>: <reason>"`. The merge itself (version bump, CHANGELOG) is a later code change, recorded by its commit, not by the ledger.

The current state of a business is the `to_state` of its last line for the current `run_id`.

## Examples

```jsonl
{"ts":"2026-09-18T08:12:41Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":null,"to_state":"discovered","agent":"scout","agent_version":"0.1.0","note":"found via OSM + Google Places; inside shore buffer"}
{"ts":"2026-09-18T08:15:03Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":"discovered","to_state":"scored","agent":"scout","agent_version":"0.1.0","note":"presence 1/5: Facebook page only, no booking path"}
{"ts":"2026-09-18T09:40:27Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":"shortlisted","to_state":"approved","agent":"human","agent_version":null,"note":"Shahar approved shortlist"}
```
