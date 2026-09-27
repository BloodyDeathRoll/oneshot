#!/usr/bin/env node
// tools/dashboard.mjs — render the register page (dashboard/template.html) from the shared data
// layer in dashboard/data.mjs. The data model lives there (dashboard/DATA.md lists every field).
//
//   node tools/dashboard.mjs             # writes dashboard/data.json + dashboard/index.html
//   node tools/dashboard.mjs --data-only # just data.json

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildData } from '../dashboard/data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dashboard');
const dataOnly = process.argv.includes('--data-only');

const data = buildData();
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'data.json'), JSON.stringify(data, null, 2) + '\n');
console.log(`dashboard/data.json: ${data.businesses.length} business rows, ${data.runs.length} runs, ${data.gates.length} gates open, ${data.decisions.length} human decisions, expenses ${data.expenses.tracked ? data.expenses.entries.length + ' lines' : 'not tracked'}`);

if (!dataOnly) {
  const tplPath = join(OUT, 'template.html');
  if (!existsSync(tplPath)) { console.error('dashboard/template.html missing — only data.json written'); process.exit(2); }
  const tpl = readFileSync(tplPath, 'utf8');
  const marker = '<script id="data" type="application/json"></script>';
  if (!tpl.includes(marker)) { console.error(`template lacks ${marker}`); process.exit(2); }
  const safe = JSON.stringify(data).replace(/<\//g, '<\\/');
  writeFileSync(join(OUT, 'index.html'), tpl.replace(marker, `<script id="data" type="application/json">${safe}</script>`));
  console.log('dashboard/index.html written');
}
