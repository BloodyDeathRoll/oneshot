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
import { readJsonlMerged } from './origin.mjs';

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

// A business slug must be one the ledger knows (this checkout's or origin/main's), so a typo never
// becomes a phantom business in Revenues.
const slug = kind === 'revenue' ? who : slugFlag;
if (slug) {
  const known = new Set(readJsonlMerged('ledger.jsonl').map((l) => l.slug));
  if (!known.has(slug)) {
    const near = [...known].filter((s) => s && s !== '-' && (s.includes(slug) || slug.includes(s.split('-')[0]))).slice(0, 5);
    console.error(`money: "${slug}" is not a business in ledger.jsonl${near.length ? `; did you mean: ${near.join(', ')}` : ''}`);
    process.exit(2);
  }
}

const line = kind === 'revenue'
  ? { ts: now, operator: whoami(), slug: who, item, amount, currency, period, note }
  : { ts: now, operator: whoami(), vendor: who.toLowerCase(), item, amount, currency, period, slug: slugFlag, ...(billed ? { billed_to_client: true } : {}), note };
appendFileSync(join(ROOT, kind === 'revenue' ? 'revenues.jsonl' : 'expenses.jsonl'), JSON.stringify(line) + '\n');
console.log(JSON.stringify(line));
