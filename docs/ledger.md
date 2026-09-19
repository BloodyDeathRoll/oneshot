# ledger.jsonl schema

`ledger.jsonl` is append-only. One JSON object per line, one line per business state change. Never rewrite or delete lines; a correction is a new line.

## Fields

| Field | Type | Description |
|---|---|---|
| `ts` | string | UTC timestamp, ISO 8601 (`2026-09-17T14:05:00Z`), when the transition completed |
| `run_id` | string | `run_id` from `run.yaml` |
| `slug` | string | Business slug; matches `dossier/<slug>/` and `sites/<slug>/` |
| `from_state` | string \| null | Previous state; `null` only for the first line of a business (`discovered`) |
| `to_state` | string | New state |
| `agent` | string | Who made the transition: `orchestrator`, `scout`, `harvester`, `designer`, `copywriter`, `humanizer`, `copyeditor`, `seo`, `aiseo`, `critic`, `deployer`, `writer`, or `human` for gates |
| `agent_version` | string \| null | Semver pinned in `run.yaml`; `null` when `agent` is `human` |
| `note` | string | Short free text: reason, score, pick reason, error, outcome detail |
| `hosting_mode` | string, optional | `managed` \| `self_hosted_docker` \| `static_only`. Present on every line written by the `deployer`, and on the `human` line that records a client's choice of mode. The last line that carries it is the business's hosting mode; absent = `run.yaml` `hosting.default_mode`. |

The first eight fields are present on every line.

## States (PLAN.md §4)

`discovered → scored → shortlisted → approved → harvested → copy_drafted → copy_humanised → copy_passed | copy_failed → mocked → picked → built → optimised → ai_optimised → critiqued(n) → passed | failed → packaged → pitched → outcome:{reply,meeting,sale,ignored}`

- `copy_drafted` (copywriter) → `copy_humanised` (humanizer) → `copy_passed` or `copy_failed` (copyeditor) all run before `mocked` — the copy exists before the designer starts, so the mockups are built around real words. A `copy_failed` line names the round; after two failures the business leaves the run in `mode: test`.
- `optimised` is written by the `seo` agent, `ai_optimised` by the `aiseo` agent; both run after `built` and before the first `critiqued(n)`. A rebuild after a failed critique re-runs both, appending the pair again.
- `critiqued(n)` is written literally with the round number: `critiqued(1)`, `critiqued(2)`, `critiqued(3)`.
- `self_hosted_docker` only, once the client has chosen it: `… → handoff_verified → access_revoked`. `handoff_verified` = the adapter's `verify` passed on the client's box and the handoff kit is complete. `access_revoked` = our keys, users and tokens are removed from the client's box and checked to no longer work.
- Outcomes are written as `outcome:reply`, `outcome:meeting`, `outcome:sale`, `outcome:ignored`.
- Human-gate transitions (`shortlisted → approved`, `mocked → picked`, `packaged → pitched`) always have `agent: "human"`.

The current state of a business is the `to_state` of its last line for the current `run_id`.

## Examples

```jsonl
{"ts":"2026-09-18T08:12:41Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":null,"to_state":"discovered","agent":"scout","agent_version":"0.1.0","note":"found via OSM + Google Places; inside shore buffer"}
{"ts":"2026-09-18T08:15:03Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":"discovered","to_state":"scored","agent":"scout","agent_version":"0.1.0","note":"presence 1/5: Facebook page only, no booking path"}
{"ts":"2026-09-18T09:40:27Z","run_id":"2026-09-ahangama-01","slug":"example-surf-school","from_state":"shortlisted","to_state":"approved","agent":"human","agent_version":null,"note":"Shahar approved shortlist"}
```
