# revenues.jsonl schema

`revenues.jsonl` is the revenue book: money in, one JSON object per line, one line per payment received. Append-only like `ledger.jsonl` and `expenses.jsonl` (`docs/expenses.md`); a correction is a new line with a negative `amount` and a `note` that names the line it corrects. The dashboard shows the total above the Overview tiles. The file does not exist until the first payment is written.

Written by hand after each payment, with `node tools/money.mjs revenue …` (or `expense …` for `expenses.jsonl`).

## Fields

| Field | Type | Description |
|---|---|---|
| `ts` | string | UTC timestamp, ISO 8601, when the line was written |
| `operator` | string | `team.json` id of who recorded it |
| `slug` | string | The client (business slug) who paid |
| `item` | string | What for: `setup`, `monthly`, `self_hosted`, `static_export`, `domain`, … |
| `amount` | number | In `currency`; negative for a refund or correction |
| `currency` | string | ISO 4217 (`USD`, `EUR`, `LKR`) |
| `period` | string | The month the payment belongs to, `YYYY-MM` |
| `note` | string | Invoice or transfer id, what the payment covered, or which line this corrects |

## Example

```jsonl
{"ts":"2026-11-02T09:00:00Z","operator":"shahar","slug":"the-lavish-haven","item":"setup","amount":300,"currency":"USD","period":"2026-11","note":"bank transfer 4471, managed setup"}
```
