#!/usr/bin/env node
// tools/prompt.mjs — assemble an agent's full runtime prompt from disk.
//
// Why this exists: on run 2026-09-ahangama-02 the designer was run without ever
// reading agents/designer/references.md (28 KB of reference analysis written for
// exactly that purpose) and the mockups were rejected. Nothing on disk forced the
// layers to be loaded. Now they are assembled by a script, from agents/wiring.json,
// and check-wiring.mjs fails if any file with real content is unreachable.
//
//   node tools/prompt.mjs <agent>            # full prompt to stdout
//   node tools/prompt.mjs <agent> --manifest # just the inventory table
//   node tools/prompt.mjs --all --manifest   # inventory for every agent

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { currentRun } from './run.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const wiring = JSON.parse(readFileSync(join(ROOT, 'agents/wiring.json'), 'utf8'));
const AGENTS = readdirSync(join(ROOT, 'agents'), { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => d.name).sort();

// A file whose body is only its title comment carries no instruction yet.
export function isStub(text) {
  const body = text.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')).join('').trim();
  return body.length === 0;
}

export const RUN_LAYER = 'run.yaml';
// `vertical/<file>` and `market/<file>` mean this session's run's pack: verticals/<vertical>/<file>,
// markets/<market>/<file> (proposal 2026-09-globalsurf-02/004). The layer keeps the logical name.
export const PACK_KINDS = { vertical: 'verticals', market: 'markets' };
export const packOf = (rel) => { const m = rel.match(/^(vertical|market)\/(.+)$/); return m ? { kind: m[1], file: m[2] } : null; };

export function layersFor(agent) {
  if (!AGENTS.includes(agent)) throw new Error(`unknown agent "${agent}" (have: ${AGENTS.join(', ')})`);
  const paths = [
    ...wiring.shared.always,
    ...wiring.agentFiles.map((f) => `agents/${agent}/${f}`),
    ...(wiring.shared.byAgent[agent] ?? []),
  ];
  return paths.map((rel) => {
    // `run.yaml` in wiring.json and in every prompt means this session's run file, runs/<run_id>.yaml
    // (tools/run.mjs). The layer keeps the name the prompts use and says which file it is.
    if (rel === RUN_LAYER) {
      let run;
      try { run = currentRun(); } catch (e) { return { rel, missing: true, why: e.message }; }
      return { rel, src: run.file, text: run.text, bytes: Buffer.byteLength(run.text), stub: isStub(run.text) };
    }
    const pack = packOf(rel);
    if (pack) {
      let run;
      try { run = currentRun(); } catch (e) { return { rel, missing: true, why: e.message }; }
      const src = `${PACK_KINDS[pack.kind]}/${run[pack.kind]}/${pack.file}`;
      if (!existsSync(join(ROOT, src))) return { rel, missing: true, why: `${run.run_id} names ${pack.kind} "${run[pack.kind]}"; ${src} does not exist` };
      const text = readFileSync(join(ROOT, src), 'utf8');
      return { rel, src, text, bytes: Buffer.byteLength(text), stub: isStub(text) };
    }
    const abs = join(ROOT, rel);
    if (!existsSync(abs)) return { rel, missing: true };
    const text = readFileSync(abs, 'utf8');
    return { rel, text, bytes: Buffer.byteLength(text), stub: isStub(text) };
  });
}

function manifest(agent) {
  const rows = layersFor(agent);
  const out = [`${agent}  (station ${(wiring.station[agent] ?? ['?']).join(', ')})`];
  for (const l of rows) {
    out.push(l.missing ? `  MISSING  ${l.rel}${l.why ? ` (${l.why})` : ''}`
      : `  ${l.stub ? 'stub    ' : 'LOADED  '} ${String(l.bytes).padStart(6)} B  ${l.rel}${l.src ? ` = ${l.src}` : ''}`);
  }
  const loaded = rows.filter((l) => !l.missing && !l.stub);
  out.push(`  -> ${loaded.length} file(s) with content, ${rows.filter((l) => l.stub).length} stub(s), ` +
    `${rows.filter((l) => l.missing).length} missing, ` +
    `${loaded.reduce((n, l) => n + l.bytes, 0)} B total`);
  return out.join('\n');
}

function prompt(agent) {
  const rows = layersFor(agent);
  const missing = rows.filter((l) => l.missing);
  if (missing.length) throw new Error(`cannot assemble ${agent}: missing ${missing.map((m) => m.rel + (m.why ? ` (${m.why})` : '')).join(', ')}`);
  const head = [
    `# RUNTIME PROMPT — agent: ${agent}  (station ${(wiring.station[agent] ?? ['?']).join(', ')})`,
    `# Assembled by tools/prompt.mjs from agents/wiring.json at ${new Date().toISOString()}.`,
    `# Every layer below is part of your instructions. Read all of them before acting.`,
    `# Layers: ${rows.map((l) => l.rel + (l.stub ? ' (stub)' : '')).join(' + ')}`,
    '',
  ].join('\n');
  const body = rows.map((l) =>
    `\n\n${'='.repeat(78)}\n=== LAYER: ${l.rel}${l.src ? (packOf(l.rel) ? ` (this run's pack: ${l.src})` : ` (this session's run: ${l.src})`) : ''}${l.stub ? '   [stub — no instructions yet]' : ''}\n${'='.repeat(78)}\n\n${l.text.trimEnd()}\n`
  ).join('');
  return head + body;
}

if (process.argv[1] && process.argv[1].endsWith('prompt.mjs')) {
  const args = process.argv.slice(2);
  const wantManifest = args.includes('--manifest');
  const targets = args.includes('--all') ? AGENTS : args.filter((a) => !a.startsWith('--'));
  if (!targets.length) {
    console.error('usage: node tools/prompt.mjs <agent|--all> [--manifest]');
    console.error('agents: ' + AGENTS.join(', '));
    process.exit(2);
  }
  try {
    console.log(targets.map((a) => (wantManifest ? manifest(a) : prompt(a))).join('\n\n'));
  } catch (e) {
    console.error('ERROR: ' + e.message);
    process.exit(1);
  }
}
