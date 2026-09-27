# expenses.jsonl schema

`expenses.jsonl` is the expenses book: money out, one JSON object per line, one line per charge. Append-only like `ledger.jsonl`; a correction is a new line with a negative `amount` and a `note` that names the line it corrects. `tools/dashboard.mjs` reads it and shows monthly, accumulated, per-vendor and per-client totals. The file does not exist until the first charge is written.

## Fields

| Field | Type | Description |
|---|---|---|
| `ts` | string | UTC timestamp, ISO 8601, when the line was written |
| `vendor` | string | Who was paid: `oracle`, `cloudflare`, `anthropic`, `figma`, `rosa`, … lowercase, one spelling per vendor |
| `item` | string | What for: `vps`, `domain`, `workers`, `tokens`, `seat`, … |
| `amount` | number | In `currency`; negative for a refund or correction |
| `currency` | string | ISO 4217 (`USD`, `EUR`, `LKR`) |
| `period` | string | The month the charge belongs to, `YYYY-MM`. A yearly charge (a domain) is one line in the month it was paid, not spread |
| `slug` | string \| null | The business it belongs to, or `null` for shared cost (the CMS server, our tooling). A pass-through charge billed on to a client (their domain) still carries the client's slug |
| `billed_to_client` | boolean, optional | `true` when the charge is recharged to the client at cost |
| `note` | string | Invoice id, what the charge covered, or which line this corrects |

## Example

```jsonl
{"ts":"2026-10-01T08:00:00Z","vendor":"oracle","item":"vps","amount":0,"currency":"USD","period":"2026-09","slug":null,"note":"oneshot-cms A1 2 OCPU / 12 GB, inside the Always Free quota — invoice 0.00"}
{"ts":"2026-10-01T08:00:00Z","vendor":"cloudflare","item":"domain","amount":10.44,"currency":"USD","period":"2026-10","slug":"the-lavish-haven","billed_to_client":true,"note":"thelavishhaven.com, 1 year, Registrar at cost"}
```

## Not yet tracked

Token spend per business (the largest real cost) is not written anywhere yet; `run.yaml` only carries the budget. Until it is, the dashboard says so instead of showing a number.
