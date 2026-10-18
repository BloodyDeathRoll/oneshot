#!/usr/bin/env node
// tools/check-wiring.mjs — fail if any agent instruction on disk is unreachable at runtime.
//
// Run this before every station, and after touching anything under agents/,
// schemas/, playbook.md, rubric.md or PLAN.md.
//
// Checks:
//  1. every agent folder has the six files PLAN.md §2 requires
//  2. every file under agents/ is claimed by agents/wiring.json (nothing orphaned); a folder is
//     allowed only when wiring.json lists it under nonPromptDirs and the agent's base.md names it
//  3. every repo doc with real content is reachable by at least one agent
//  3b. runs/*.yaml are well formed and this session resolves to exactly one run (tools/run.mjs)
//  3c. every run names packs that exist, holding every pack layer its agents load, and every pack file
//      with content is loaded by some agent
//  4. each base.md's "Runtime prompt =" line matches the layers wiring.json gives it
//  5. each agent's station ids in wiring.json exist in PLAN.md §4's pipeline table
//  6. each agent listed in PLAN.md §2 has a folder, and vice versa

import { readFileSync, existsSync, readdirSync, realpathSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layersFor, isStub, RUN_LAYER, PACK_KINDS, packOf } from './prompt.mjs';
import { listRuns, currentRun } from './run.mjs';
import { team, whoami } from './team.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const wiring = JSON.parse(read('agents/wiring.json'));
const AGENTS = readdirSync(join(ROOT, 'agents'), { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => d.name).sort();

const fail = [], warn = [];

// 1 + 2 — six files per agent, no orphans
for (const a of AGENTS) {
  const onDisk = readdirSync(join(ROOT, 'agents', a)).sort();
  for (const f of wiring.agentFiles) if (!onDisk.includes(f)) fail.push(`${a}: missing ${f}`);
  const dirs = wiring.nonPromptDirs?.[a] ?? [];
  for (const d of dirs) {
    if (onDisk.includes(d) && !read(`agents/${a}/base.md`).includes(`agents/${a}/${d}/`)) fail.push(`${a}: ${d}/ is allowed by wiring.json but base.md never names agents/${a}/${d}/, so the agent will not open it`);
  }
  for (const f of onDisk) if (!wiring.agentFiles.includes(f) && !dirs.includes(f)) fail.push(`${a}: ${f} exists on disk but no agent loads it — add it to wiring.json or delete it`);
}

// 3 — repo docs with content must reach some agent
const reachable = new Set(AGENTS.flatMap((a) => layersFor(a).map((l) => l.rel)));
for (const rel of ['playbook.md', 'rubric.md', 'server-hardening.md', 'PLAN.md',
                   'docs/ledger.md', 'schemas/site-content.md']) {
  if (!existsSync(join(ROOT, rel))) { fail.push(`shared doc missing: ${rel}`); continue; }
  if (isStub(read(rel))) warn.push(`${rel} is a stub — no agent gets instructions from it yet`);
  else if (!reachable.has(rel)) fail.push(`${rel} has content but no agent loads it`);
}

// 3b — the run layer: every runs/*.yaml is well formed, and this session resolves to one run
if (!reachable.has(RUN_LAYER)) fail.push(`${RUN_LAYER} (the session's run file) is not loaded by any agent`);
// The files are checked on any machine; resolving this session's run needs a known operator, so an
// unknown one (a fresh clone, CI) is a warning, not a wiring failure.
try {
  for (const r of listRuns()) if (r.status === 'active' && !team()[r.operator]) fail.push(`${r.file}: active run's operator "${r.operator}" is not in team.json`);
} catch (e) { fail.push(`run: ${e.message}`); }
let op = null;
try { op = whoami(); } catch (e) { warn.push(`run: not resolved for this session (${e.message})`); }
if (op) try { currentRun({ operator: op }); } catch (e) { fail.push(`run: ${e.message}`); }

// The pack files a run's agents load (market/<file>, vertical/<file>) that its packs lack. Read from
// wiring.json, not layersFor(): layersFor resolves this session's run only. An inbound run never runs
// the scout (PLAN.md §4), so the scout's layers do not bind it.
export function missingPackLayers(run, agents = AGENTS) {
  const out = [];
  for (const a of agents) {
    if (a === 'scout' && run.engagement === 'inbound') continue;
    for (const rel of [...wiring.shared.always, ...(wiring.shared.byAgent[a] ?? [])]) {
      const pack = packOf(rel);
      if (!pack) continue;
      const src = `${PACK_KINDS[pack.kind]}/${run[pack.kind]}/${pack.file}`;
      if (!existsSync(join(ROOT, src))) out.push({ agent: a, rel, src });
    }
  }
  return out;
}

// 3c — packs (proposal 2026-09-globalsurf-02/004): each run's market and vertical exist, its
// engagement is known, and every pack .md with content is a layer some agent loads (as market/<file>
// or vertical/<file>, whatever the pack).
try {
  for (const r of listRuns()) {
    for (const [kind, dir] of Object.entries(PACK_KINDS)) if (!existsSync(join(ROOT, dir, r[kind]))) fail.push(`${r.file}: ${kind} "${r[kind]}" has no pack (${dir}/${r[kind]}/)`);
    for (const m of missingPackLayers(r)) fail.push(`${r.file}: ${m.agent} loads ${m.rel}, but ${m.src} does not exist`);
    if (!['outbound', 'inbound'].includes(r.engagement)) fail.push(`${r.file}: engagement "${r.engagement}" is not outbound or inbound`);
  }
} catch { /* listRuns errors are reported by 3b */ }
for (const [kind, dir] of Object.entries(PACK_KINDS)) {
  if (!existsSync(join(ROOT, dir))) continue;
  for (const pack of readdirSync(join(ROOT, dir), { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const f of readdirSync(join(ROOT, dir, pack.name)).filter((x) => x.endsWith('.md'))) {
      const rel = `${dir}/${pack.name}/${f}`;
      if (isStub(read(rel))) warn.push(`${rel} is a stub — no agent gets instructions from it yet`);
      else if (!reachable.has(`${kind}/${f}`)) fail.push(`${rel} has content but no agent loads ${kind}/${f}`);
    }
  }
}

// 4 — base.md's declared assembly must match reality
for (const a of AGENTS) {
  const base = read(`agents/${a}/base.md`);
  const line = base.split('\n').find((l) => l.startsWith('Runtime prompt ='));
  if (!line) { fail.push(`${a}/base.md: no "Runtime prompt =" line`); continue; }
  const declared = new Set([...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]).filter((f) => /\.(md|yaml)$/.test(f)));
  if (line.includes('this file')) declared.add('base.md');
  const actual = layersFor(a).map((l) => l.rel.replace(`agents/${a}/`, ''));
  for (const rel of actual) {
    if (rel === 'CHANGELOG.md') continue;
    if (!declared.has(rel)) fail.push(`${a}/base.md: loads ${rel} at runtime but does not declare it in the "Runtime prompt =" line`);
  }
  for (const d of declared) if (!actual.includes(d)) fail.push(`${a}/base.md: declares ${d} but wiring.json does not load it`);
}

// 5 — station ids must exist in PLAN.md §4
const plan = read('PLAN.md');
const planStations = new Set([...plan.matchAll(/^\|\s*(\d+[a-z]?|∞)\s*\|/gm)].map((m) => m[1]));
for (const [a, ids] of Object.entries(wiring.station)) {
  for (const id of ids) {
    if (id === '*' || id === 'inf') continue;
    if (!planStations.has(id)) fail.push(`wiring.json: ${a} claims station ${id}, which is not in PLAN.md §4`);
  }
  if (!AGENTS.includes(a)) fail.push(`wiring.json: station map names unknown agent "${a}"`);
}
for (const a of AGENTS) if (!wiring.station[a]) fail.push(`wiring.json: no station for agent "${a}"`);

// 6 — base.md must not name a station id that is not its own
for (const a of AGENTS) {
  const mine = new Set(wiring.station[a] ?? []);
  if (mine.has('*')) continue;
  for (const m of read(`agents/${a}/base.md`).matchAll(/\(station (\d+[a-z])\b/gi)) {
    if (!mine.has(m[1])) warn.push(`${a}/base.md mentions station ${m[1]} as its own; wiring says ${[...mine].join(', ')}`);
  }
}

// 7 — PLAN.md §2's agents/ folder list and the folders on disk must agree (header check 6)
const layout = plan.split(/^## 2\./m)[1]?.split(/^## /m)[0] ?? '';
const planAgents = layout.match(/^[ \t]*agents\/[ \t]*\n[ \t]*((?:[\w-]+\/[ \t]*)+)$/m)?.[1].match(/[\w-]+(?=\/)/g) ?? [];
if (!planAgents.length) fail.push('PLAN.md §2: no agents/ folder list found');
else {
  for (const a of planAgents) if (!AGENTS.includes(a)) fail.push(`PLAN.md §2 lists agents/${a}/, which does not exist`);
  for (const a of AGENTS) if (!planAgents.includes(a)) fail.push(`agents/${a}/ is not listed in PLAN.md §2`);
}

// Report only when run, so a test can import missingPackLayers.
if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(process.argv[1])) {
  for (const w of warn) console.log(`WARN  ${w}`);
  for (const f of fail) console.log(`FAIL  ${f}`);
  console.log(`\n${AGENTS.length} agents · ${fail.length} failure(s) · ${warn.length} warning(s)`);
  process.exit(fail.length ? 1 : 0);
}
