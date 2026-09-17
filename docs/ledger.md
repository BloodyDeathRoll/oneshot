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
| `agent` | string | Who made the transition: `orchestrator`, `scout`, `harvester`, `designer`, `critic`, `packager`, `writer`, or `human` for gates |
| `agent_version` | string \| null | Semver pinned in `run.yaml`; `null` when `agent` is `human` |
| `note` | string | Short free text: reason, score, pick reason, error, outcome detail |

All eight fields are present on every line.

## States (PLAN.md §4)

`discovered → scored → shortlisted → approved → harvested → mocked → picked → built → critiqued(n) → passed | failed → packaged → pitched → outcome:{reply,meeting,sale,ignored}`

- `critiqued(n)` is written literally with the round number: `critiqued(1)`, `critiqued(2)`, `critiqued(3)`.
- Outcomes are written as `outcome:reply`, `outcome:meeting`, `outcome:sale`, `outcome:ignored`.
- Human-gate transitions (`shortlisted → approved`, `mocked → picked`, `packaged → pitched`) always have `agent: "human"`.

The current state of a business is the `to_state` of its last line for the current `run_id`.

## Examples

```jsonl
{"ts":"2026-09-18T08:12:41Z","run_id":"2026-09-mirissa-01","slug":"example-surf-school","from_state":null,"to_state":"discovered","agent":"scout","agent_version":"0.1.0","note":"found via OSM + Google Places; inside shore buffer"}
{"ts":"2026-09-18T08:15:03Z","run_id":"2026-09-mirissa-01","slug":"example-surf-school","from_state":"discovered","to_state":"scored","agent":"scout","agent_version":"0.1.0","note":"presence 1/5: Facebook page only, no booking path"}
{"ts":"2026-09-18T09:40:27Z","run_id":"2026-09-mirissa-01","slug":"example-surf-school","from_state":"shortlisted","to_state":"approved","agent":"human","agent_version":null,"note":"Shahar approved shortlist"}
```
