#!/usr/bin/env node
// tools/usage.mjs — summarise usage.jsonl (docs/usage.md): tokens and time per station and per business.
//   node tools/usage.mjs [run_id]
import { readFileSync, existsSync } from 'node:fs';
const file = new URL('../usage.jsonl', import.meta.url);
if (!existsSync(file)) { console.log('usage.jsonl does not exist yet'); process.exit(0); }
const want = process.argv[2];
const rows = readFileSync(file, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((r) => !want || r.run_id === want);
const sum = (a, k) => a.reduce((s, r) => s + (r[k] ?? 0), 0);
const fmt = (n) => n.toLocaleString('en-US');
const by = (f) => rows.reduce((m, r) => ((m[f(r)] ??= []).push(r), m), {});
console.log(`run ${want ?? '(all)'} · ${rows.length} agent runs`);
console.log('\nstation   agent               runs      tokens   tool uses   wall min');
for (const [key, rs] of Object.entries(by((r) => `${r.station}\u0000${r.agent}`))) {
  const st = key.split('\u0000')[0];
  console.log(`${st.padEnd(9)} ${String(rs[0].agent).padEnd(18)} ${String(rs.length).padStart(4)} ${fmt(sum(rs, 'tokens')).padStart(11)} ${String(sum(rs, 'tool_uses')).padStart(11)} ${(sum(rs, 'wall_s') / 60).toFixed(1).padStart(10)}`);
}
const agentRows = rows.filter((r) => r.agent !== 'human');
console.log(`\nagents total: ${fmt(sum(agentRows, 'tokens'))} tokens · ${(sum(agentRows, 'wall_s') / 60).toFixed(1)} min`);
const human = rows.filter((r) => r.agent === 'human');
if (human.length) console.log(`human gates: ${human.length} · ${(sum(human, 'wall_s') / 60).toFixed(1)} min waiting`);
