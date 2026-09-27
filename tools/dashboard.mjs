#!/usr/bin/env node
// tools/dashboard.mjs — one readable page for what the disk already tracks.
//
// Disk is the memory (CLAUDE.md): this script reads it and renders it, it never writes to
// ledger.jsonl or expenses.jsonl. Sources, all optional except the ledger:
//   ledger.jsonl                 every business state change (docs/ledger.md)
//   run.yaml                     current run id, mode, area, budgets
//   dossier/<slug>/dossier.json  name, business type, headline ratings
//   sites/<slug>/deploy.json     preview URL + CMS (managed adapter)
//   sites/<slug>/pitch/          pitch drafts; wrangler.jsonc names the proposal Worker
//   expenses.jsonl               money out, one line per charge (docs/expenses.md)
//
//   node tools/dashboard.mjs             # writes dashboard/data.json + dashboard/index.html
//   node tools/dashboard.mjs --data-only # just data.json
//
// index.html = dashboard/template.html with the JSON dropped into <script id="data">.
// The template is the designer's; this file owns the data model only.

import { readFileSync, existsSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dashboard');
const dataOnly = process.argv.includes('--data-only');

// ---- pipeline order (PLAN.md §4 / docs/ledger.md) -------------------------------------------
const ORDER = [
  'discovered', 'scored', 'shortlisted', 'approved', 'harvested',
  'copy_drafted', 'copy_humanised', 'copy_failed', 'copy_passed',
  'concepted', 'mocked', 'picked', 'built', 'optimised', 'ai_optimised',
  'critiqued', 'failed', 'passed', 'packaged', 'pitched', 'outcome',
  'handoff_verified', 'access_revoked',
];
const GATES = { shortlisted: 'approve shortlist', mocked: 'pick a mockup', packaged: 'send the pitch' };
const HUMAN_LABEL = 'Shahar';

const rank = (s) => {
  if (!s) return -1;
  const base = s.startsWith('critiqued') ? 'critiqued' : s.startsWith('outcome:') ? 'outcome' : s;
  return ORDER.indexOf(base);
};

// ---- readers ------------------------------------------------------------------------------
const read = (rel) => (existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), 'utf8') : null);
const readJsonl = (rel) => (read(rel) ?? '').split('\n').filter((l) => l.trim()).map((l, i) => {
  try { return JSON.parse(l); } catch (e) { throw new Error(`${rel}:${i + 1} is not JSON: ${e.message}`); }
});
const readJson = (rel) => { const t = read(rel); return t ? JSON.parse(t) : null; };

// run.yaml: only the few scalar keys the page shows, no YAML library in this repo.
function readRun() {
  const y = read('run.yaml') ?? '';
  const scalar = (k) => (y.match(new RegExp(`^${k}:\\s*([^#\\n]+)`, 'm'))?.[1] ?? '').trim().replace(/^["']|["']$/g, '');
  const anchors = [...y.matchAll(/^\s*-\s*"([^"]+)"/gm)].map((m) => m[1]);
  return {
    run_id: scalar('run_id'), mode: scalar('mode'),
    area_mode: (y.match(/^\s+mode:\s*(\w+)/m)?.[1] ?? ''), anchors,
    max_sites: Number(scalar('max_sites')) || null,
    presence_threshold: Number(scalar('presence_threshold')) || null,
    tokens_per_business: (y.match(/tokens_per_business:\s*([\d_]+)/)?.[1] ?? '').replace(/_/g, ''),
    default_mode: (y.match(/default_mode:\s*(\w+)/)?.[1] ?? null),
  };
}

const val = (x) => (x && typeof x === 'object' && 'value' in x ? x.value : x ?? null);

function readDossier(slug) {
  const d = readJson(`dossier/${slug}/dossier.json`);
  if (!d) return null;
  const ratings = {};
  for (const [platform, r] of Object.entries(d.reviews ?? {})) {
    if (r && typeof r === 'object' && typeof r.rating === 'number') {
      ratings[platform] = { rating: r.rating, count: r.count ?? null, fetched_at: r.fetched_at ?? null };
    }
  }
  return {
    name: val(d.business?.name) ?? null,
    type: d.businessType ?? null,
    harvested_at: d.harvested_at ?? null,
    ratings,
    town: val(d.location?.town) ?? null,
    gaps: Array.isArray(d.gaps) ? d.gaps.length : null,
  };
}

function readDeploy(slug) {
  const d = readJson(`sites/${slug}/deploy.json`);
  if (!d) return null;
  const deploys = (d.steps ?? []).filter((s) => s.step === 'deploy' && s.ok);
  const last = deploys.at(-1);
  return {
    adapter: d.adapter ?? null,
    cms: d.cms ?? null,
    url: last?.evidence?.url ?? null,
    version: last?.evidence?.version ?? null,
    deployed_at: last?.started ?? null,
    verified: (d.steps ?? []).some((s) => s.step === 'verify' && s.ok),
  };
}

function readPitch(slug) {
  const dir = join(ROOT, 'sites', slug, 'pitch');
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir);
  const wr = read(`sites/${slug}/pitch/wrangler.jsonc`);
  const worker = wr?.match(/"name":\s*"([^"]+)"/)?.[1] ?? null;
  return {
    drafts: files.filter((f) => /^(index\.html|message\..*\.md|in-person\..*\.md)$/.test(f)),
    proposal_url: worker ? `https://${worker}.os1.workers.dev` : null,
  };
}

// ---- ledger → businesses -------------------------------------------------------------------
const ledger = readJsonl('ledger.jsonl');
const run = readRun();

const byKey = new Map();
const corrections = [];
for (const line of ledger) {
  if (!line.slug || line.slug === '-') { corrections.push(line); continue; }
  const k = `${line.run_id}\u0000${line.slug}`;
  if (!byKey.has(k)) byKey.set(k, []);
  byKey.get(k).push(line);
}

const DROP_RE = /\b(dropped|withdrawn|disqualified|reversed by|FAILS the|leaves the run|aborted)\b/i;

function classify(hist, runHasApprovals, isCurrentRun) {
  const last = hist.at(-1);
  const state = last.to_state;
  const regressed = rank(last.to_state) < rank(last.from_state);
  if (state.startsWith('outcome:')) return { group: 'outcome', label: state.slice(8) };
  if (!isCurrentRun && rank(state) < rank('approved') && !runHasApprovals) {
    return { group: 'superseded', label: 'run not continued' };
  }
  if (state === 'pitched') return { group: 'pitched', label: 'pitched' };
  if (state === 'packaged') return { group: 'delivered', label: 'built + deployed, pitch not sent' };
  if (state === 'access_revoked' || state === 'handoff_verified') return { group: 'delivered', label: state };
  if (regressed || DROP_RE.test(last.note ?? '')) return { group: 'dropped', label: 'dropped' };
  if (state === 'scored') return { group: 'not_shortlisted', label: 'scored above threshold' };
  if (state === 'shortlisted') {
    return runHasApprovals
      ? { group: 'not_approved', label: 'shortlisted, not approved' }
      : { group: 'gate', label: 'awaiting shortlist approval' };
  }
  if (GATES[state]) return { group: 'gate', label: `awaiting: ${GATES[state]}` };
  return { group: 'pipeline', label: state };
}

const runsSeen = [...new Set(ledger.map((l) => l.run_id))];
const approvalsByRun = Object.fromEntries(runsSeen.map((r) => [r,
  ledger.some((l) => l.run_id === r && l.to_state === 'approved')]));

// Files under dossier/ and sites/ are keyed by slug only: they belong to the slug's latest run.
const latestRunOf = {};
for (const k of byKey.keys()) {
  const [run_id, slug] = k.split('\u0000');
  if (!latestRunOf[slug] || run_id > latestRunOf[slug]) latestRunOf[slug] = run_id;
}

const businesses = [];
for (const [k, hist] of byKey) {
  const [run_id, slug] = k.split('\u0000');
  // File order, not timestamp order: CLAUDE.md defines the current state as the LAST LINE for
  // the run, and a few lines were appended out of time order (e.g. a preview redeploy after packaging).
  const last = hist.at(-1);
  const own = latestRunOf[slug] === run_id;
  const dossier = own ? readDossier(slug) : null;
  const deploy = own ? readDeploy(slug) : null;
  const pitch = own ? readPitch(slug) : null;
  const { group, label } = classify(hist, approvalsByRun[run_id], run_id === run.run_id);
  const reached = new Set(hist.map((h) => h.to_state.replace(/\(\d+\)$/, '')));
  const humanLines = hist.filter((h) => h.agent === 'human');
  const scoreNote = hist.find((h) => h.to_state === 'scored')?.note ?? '';
  const presence = scoreNote.match(/presence\s+(\d)\s*\/\s*5/i)?.[1];
  const pitchedLine = hist.find((h) => h.to_state === 'pitched');
  const outcomeLine = [...hist].reverse().find((h) => h.to_state.startsWith('outcome:'));
  const hosting = [...hist].reverse().find((h) => h.hosting_mode)?.hosting_mode ?? null;
  const previewFromLedger = [...hist].reverse().map((h) => h.note?.match(/https:\/\/[\w.-]+\.workers\.dev/)?.[0]).find(Boolean);
  const critiques = hist.filter((h) => h.agent === 'critic' && /^critiqued\(\d+\)$/.test(h.to_state));
  // The score is the critic's latest, including full-mode verifications written after the pass
  // (passed -> passed lines), not only the numbered rounds.
  const score = [...hist].reverse().filter((h) => h.agent === 'critic')
    .map((h) => h.note?.match(/PASS|FAIL/) && h.note.match(/(\d+(?:\.\d+)?)\s*\/\s*100/)?.[1]).find(Boolean) ?? null;
  const discovered = hist.find((h) => h.to_state === 'discovered');

  businesses.push({
    slug, run_id,
    name: dossier?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    type: dossier?.type ?? null,
    presence: presence != null ? Number(presence) : null,
    ratings: dossier?.ratings ?? {},
    state: last.to_state, group, label,
    why: last.note ?? '',
    found_via: discovered?.note?.replace(/^found via\s*/i, '') ?? null,
    first_seen: hist[0].ts, last_change: last.ts,
    days_since_change: Math.floor((Date.now() - Date.parse(last.ts)) / 86400000),
    lines: hist.length,
    human_decisions: humanLines.length,
    copy_rounds: hist.filter((h) => h.to_state === 'copy_failed' && h.agent === 'copyeditor').length
      + hist.filter((h) => h.to_state === 'copy_passed').length,
    critic_rounds: critiques.length, critic_score: score ? Number(score) : null,
    hosting_mode: hosting ?? (rank(last.to_state) >= rank('packaged') ? run.default_mode : null),
    preview_url: deploy?.url ?? previewFromLedger ?? null,
    deploy: deploy,
    cms_verified: deploy?.verified ?? false,
    pitch: pitch,
    pitched_at: pitchedLine?.ts ?? null,
    outcome: outcomeLine ? { state: outcomeLine.to_state.slice(8), ts: outcomeLine.ts, note: outcomeLine.note } : null,
    // packaged is both delivered and a gate: the pitch is not sent until Shahar sends it.
    gate: group === 'gate' || group === 'delivered' ? (GATES[last.to_state] ?? null) : null,
    reached: [...reached],
    history: hist.map((h) => ({ ts: h.ts, from: h.from_state, to: h.to_state, agent: h.agent, v: h.agent_version, note: h.note, hosting_mode: h.hosting_mode })),
  });
}
businesses.sort((a, b) => (b.run_id.localeCompare(a.run_id)) || (rank(b.state) - rank(a.state)) || a.slug.localeCompare(b.slug));

// ---- funnel for the current run (how many businesses ever reached each state) ----------------
const FUNNEL = ['discovered', 'scored', 'shortlisted', 'approved', 'harvested', 'copy_passed', 'concepted', 'mocked', 'picked', 'built', 'passed', 'packaged', 'pitched', 'outcome:reply', 'outcome:meeting', 'outcome:sale'];
const current = businesses.filter((b) => b.run_id === run.run_id);
const funnel = FUNNEL.map((s) => ({ state: s, count: current.filter((b) => b.reached.includes(s)).length }));

// ---- runs ---------------------------------------------------------------------------------
const runs = runsSeen.sort().reverse().map((r) => {
  const bs = businesses.filter((b) => b.run_id === r);
  const groups = {};
  for (const b of bs) groups[b.group] = (groups[b.group] ?? 0) + 1;
  const ts = ledger.filter((l) => l.run_id === r).map((l) => l.ts).sort();
  return { run_id: r, businesses: bs.length, groups, first_ts: ts[0], last_ts: ts.at(-1), current: r === run.run_id };
});

// ---- gates waiting on a human, decisions, leads --------------------------------------------
const gates = businesses.filter((b) => b.gate).map((b) => ({ slug: b.slug, name: b.name, run_id: b.run_id, gate: b.gate, since: b.last_change, days: b.days_since_change }));
const decisions = ledger.filter((l) => l.agent === 'human').sort((a, b) => b.ts.localeCompare(a.ts))
  .map((l) => ({ ts: l.ts, slug: l.slug, run_id: l.run_id, from: l.from_state, to: l.to_state, note: l.note }));
// A lead is a business whose discovery names a referrer: `referral:<slug>` at the start of the note.
const leads = businesses.filter((b) => /^referral:/i.test(b.found_via ?? '')).map((b) => ({
  slug: b.slug, name: b.name, referred_by: b.found_via.replace(/^referral:\s*/i, '').split(/[;\s]/)[0], state: b.state, group: b.group, first_seen: b.first_seen,
}));

// ---- expenses (docs/expenses.md) ------------------------------------------------------------
const expenseLines = existsSync(join(ROOT, 'expenses.jsonl')) ? readJsonl('expenses.jsonl') : null;
function expenses() {
  if (!expenseLines) return { tracked: false, entries: [], monthly: {}, accumulated: {}, per_client: {}, vendors: {} };
  const monthly = {}, accumulated = {}, per_client = {}, vendors = {};
  for (const e of expenseLines) {
    const cur = e.currency ?? 'USD';
    const month = (e.period ?? e.ts).slice(0, 7);
    const who = e.slug ?? 'shared';
    ((monthly[month] ??= {})[cur] = (monthly[month][cur] ?? 0) + e.amount);
    accumulated[cur] = (accumulated[cur] ?? 0) + e.amount;
    ((per_client[who] ??= {})[cur] = (per_client[who][cur] ?? 0) + e.amount);
    ((vendors[e.vendor] ??= {})[cur] = (vendors[e.vendor][cur] ?? 0) + e.amount);
  }
  return { tracked: true, entries: expenseLines, monthly, accumulated, per_client, vendors };
}

// ---- write --------------------------------------------------------------------------------
const data = {
  generated_at: new Date().toISOString(),
  human: HUMAN_LABEL,
  pipeline_order: ORDER, gate_states: GATES,
  run, runs, funnel, gates, businesses, decisions, leads, corrections,
  expenses: expenses(),
  totals: {
    businesses_all_runs: new Set(businesses.map((b) => b.slug)).size,
    ledger_lines: ledger.length,
    human_decisions: decisions.length,
    tokens_per_business_budget: run.tokens_per_business || null,
    token_spend_tracked: false,
  },
};

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'data.json'), JSON.stringify(data, null, 2) + '\n');
console.log(`dashboard/data.json: ${businesses.length} business rows, ${runs.length} runs, ${gates.length} gates open, ${decisions.length} human decisions, expenses ${data.expenses.tracked ? data.expenses.entries.length + ' lines' : 'not tracked'}`);

if (!dataOnly) {
  const tpl = read('dashboard/template.html');
  if (!tpl) { console.error('dashboard/template.html missing — only data.json written'); process.exit(2); }
  const marker = '<script id="data" type="application/json"></script>';
  if (!tpl.includes(marker)) { console.error(`template lacks ${marker}`); process.exit(2); }
  const safe = JSON.stringify(data).replace(/<\//g, '<\\/');
  writeFileSync(join(OUT, 'index.html'), tpl.replace(marker, `<script id="data" type="application/json">${safe}</script>`));
  console.log('dashboard/index.html written');
}
