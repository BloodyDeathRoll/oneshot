# usage.jsonl schema

`usage.jsonl` records what each station run cost in tokens and time. One JSON object per agent run, append-only like `ledger.jsonl`. It answers "what does it take to get from a spot to a pitch" per business and per station. `node tools/usage.mjs [run_id]` summarises it.

## Fields

| Field | Type | Description |
|---|---|---|
| `ts` | string | UTC, ISO 8601, when the run finished |
| `run_id` | string | `run.yaml` `run_id` |
| `slug` | string | business slug, or `-` for a run-wide station (scout) |
| `station` | string | PLAN.md §4 id: `2`, `3`, `3b`, `4a` … `7`, or `orchestrator` |
| `agent` | string | agent name, or `human` for gate waits |
| `agent_version` | string \| null | pinned version |
| `tokens` | number \| null | total tokens the agent run used, as reported by the harness for that subagent (input + output, cache reads included) |
| `tool_uses` | number \| null | tool calls in the run |
| `wall_s` | number | wall-clock seconds of the run |
| `round` | number, optional | retry or review round |
| `source` | string | `subagent-report` (harness numbers) or `estimate` (orchestrator's own share, not measured per step) |
| `note` | string | what the run produced, or why it was repeated |

Human gate time is not tokens; it is recorded as `agent: "human"`, `tokens: null`, `wall_s` = time from the gate being presented to the answer.

Money: tokens × the model's price is computed by `tools/usage.mjs`, not stored, so a price change does not rewrite history.
