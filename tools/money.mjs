#!/usr/bin/env node
// tools/money.mjs — record a payment by hand: money in (revenues.jsonl, docs/revenues.md) or money out
// (expenses.jsonl, docs/expenses.md). Append-only; a correction is a new line with a negative amount.
//
//   node tools/money.mjs revenue <slug> <item> <amount> [--currency USD] [--period YYYY-MM] [--note "…"]
//   node tools/money.mjs expense <vendor> <item> <amount> [--currency USD] [--period YYYY-MM] [--slug <slug>] [--billed-to-client] [--note "…"]
import { appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { whoami } from './team.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (k) => { const i = args.indexOf(`--${k}`); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const bool = (k) => { const i = args.indexOf(`--${k}`); if (i < 0) return false; args.splice(i, 1); return true; };
const usage = () => { console.error('usage:\n  node tools/money.mjs revenue <slug> <item> <amount> [--currency USD] [--period YYYY-MM] [--note "…"]\n  node tools/money.mjs expense <vendor> <item> <amount> [--currency USD] [--period YYYY-MM] [--slug <slug>] [--billed-to-client] [--note "…"]'); process.exit(2); };

const currency = (flag('currency') ?? 'USD').toUpperCase(), note = flag('note') ?? '', slugFlag = flag('slug'), billed = bool('billed-to-client');
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const period = flag('period') ?? now.slice(0, 7);
const [kind, who, item, amountRaw] = args;
const amount = Number(amountRaw);
if (!['revenue', 'expense'].includes(kind) || !who || !item || !Number.isFinite(amount)) usage();
if (!/^[A-Z]{3}$/.test(currency) || !/^\d{4}-\d{2}$/.test(period)) usage();

const line = kind === 'revenue'
  ? { ts: now, operator: whoami(), slug: who, item, amount, currency, period, note }
  : { ts: now, operator: whoami(), vendor: who.toLowerCase(), item, amount, currency, period, slug: slugFlag, ...(billed ? { billed_to_client: true } : {}), note };
appendFileSync(join(ROOT, kind === 'revenue' ? 'revenues.jsonl' : 'expenses.jsonl'), JSON.stringify(line) + '\n');
console.log(JSON.stringify(line));
