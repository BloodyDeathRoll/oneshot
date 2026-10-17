#!/usr/bin/env node
// dashboard/data.mjs — the one data layer for the OneShot dashboard (BRIEF.md §2).
//
// Reads the disk and emits dashboard/data.json. Never invents a number: every field is derived
// from a file named in dashboard/DATA.md, and where the ledger has no data yet the field is null
// and `empty_states` says which transition will fill it. tools/dashboard.mjs imports buildData()
// to render the earlier register page; the mockups read data.json directly.
//
//   node dashboard/data.mjs          # writes dashboard/data.json
//   import { buildData } from './data.mjs'

import { readFileSync, existsSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { readActivity, assignments as toAssignments, team as readTeam, operatorFor, whoami } from '../tools/team.mjs';
import { status as mediaStatus } from '../tools/media.mjs';
import { readJsonlMerged, showMain, lsMain, mainSha, MAIN } from '../tools/origin.mjs';
import { RUNS_DIR } from '../tools/run.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dashboard');

// ---- pipeline (PLAN.md §4 / docs/ledger.md) ----------------------------------------------------
// From 2026-10-05: 6 Preview (previewed, static, no CMS) → 7 Pitch (packaged = pitch written, gate c
// → pitched → outcome:*) → after outcome:sale, gate e: the client's product choice (product_chosen,
// carries hosting_mode) → 8 Deliver (delivered; self-hosted then handoff_verified → access_revoked).
// A `packaged` line dated before 2026-10-05 meant "full deploy done" (docs/ledger.md, History).
export const ORDER = [
  'discovered', 'scored', 'shortlisted', 'approved',
  'briefed', 'planned', 'lanes_approved', 'researched', 'aligned', // inbound runs (PLAN.md §4, proposal 004)
  'harvested', 'audited',
  'copy_drafted', 'copy_humanised', 'copy_failed', 'copy_passed',
  'concepted', 'mocked', 'picked', 'built', 'optimised', 'ai_optimised',
  'critiqued', 'failed', 'passed', 'previewed', 'packaged', 'pitched', 'outcome',
  'product_chosen', 'delivered', 'handoff_verified', 'access_revoked', 'void',
];
const PRODUCT_GATE = "record the client's product choice";
export const GATES = { shortlisted: 'approve the shortlist', planned: 'approve the research lanes', researched: 'confirm the direction with the client', mocked: 'pick a mockup', packaged: 'send the pitch', 'outcome:sale': PRODUCT_GATE };
const PACKAGED_MEANING_CHANGED = '2026-10-05'; // docs/ledger.md, "History: packaged before 2026-10-05"
const HUMAN = 'Shahar';

// Ten station segments for the Pipeline bar (concepts.md: PLAN's 1–8 + 4a–4i collapsed; Preview and
// Deliver split on 2026-10-05).
export const STATIONS = [
  { n: 1, name: 'Scout / brief', states: ['discovered', 'scored', 'briefed'] },
  { n: 2, name: 'Shortlist / research', states: ['shortlisted', 'approved', 'planned', 'lanes_approved', 'researched', 'aligned'], gate: 'approve the shortlist (inbound: lanes, direction)' },
  { n: 3, name: 'Harvest', states: ['harvested', 'audited'] },
  { n: 4, name: 'Copy', states: ['copy_drafted', 'copy_humanised', 'copy_failed', 'copy_passed'] },
  { n: 5, name: 'Concept + mockups', states: ['concepted', 'mocked', 'picked'], gate: 'pick a mockup' },
  { n: 6, name: 'Build + SEO', states: ['built', 'optimised', 'ai_optimised'] },
  { n: 7, name: 'Critique', states: ['critiqued', 'failed', 'passed'] },
  { n: 8, name: 'Preview', states: ['previewed'] },
  { n: 9, name: 'Pitch', states: ['packaged', 'pitched', 'outcome'], gate: 'send the pitch' },
  { n: 10, name: 'Deliver', states: ['product_chosen', 'delivered', 'handoff_verified', 'access_revoked'], gate: PRODUCT_GATE },
];

// Next step per state (concepts.md, creative director) with its owner.
export const NEXT_STEP = {
  discovered: ['score', 'scout'], scored: ['shortlist', 'scout'],
  shortlisted: ['approve the shortlist', HUMAN], approved: ['harvest', 'harvester'],
  briefed: ['plan the research', 'analyst'], planned: ['approve the research lanes', HUMAN],
  lanes_approved: ['research the industry', 'analyst'], researched: ['confirm the direction with the client', HUMAN],
  aligned: ['harvest', 'harvester'],
  harvested: ['audit the funnel', 'auditor'], audited: ['draft copy', 'copywriter'], copy_drafted: ['humanise copy', 'humanizer'],
  copy_humanised: ['review copy', 'copyeditor'], copy_failed: ['redraft copy', 'copywriter'],
  copy_passed: ['write concepts', 'creative-director'], concepted: ['build mockups', 'designer'],
  mocked: ['pick a mockup', HUMAN], picked: ['build the site', 'designer'],
  built: ['SEO', 'seo'], optimised: ['AI SEO', 'aiseo'], ai_optimised: ['critic review', 'critic'],
  critiqued: ['fix and rebuild', 'designer'], failed: ['fix and rebuild', 'designer'],
  passed: ['deploy the preview', 'deployer'], previewed: ['write the pitch', 'writer'], packaged: ['send the pitch', HUMAN],
  pitched: ['log the outcome', HUMAN], 'outcome:reply': ['follow up', HUMAN],
  'outcome:meeting': ['follow up', HUMAN], 'outcome:sale': [PRODUCT_GATE, HUMAN],
  product_chosen: ['deliver the chosen product', 'deployer'], delivered: ['done', null],
  'outcome:ignored': ['leave it or re-pitch', HUMAN], handoff_verified: ['revoke our access', 'deployer'],
  access_revoked: ['done', null], void: ['voided by Shahar — ignore', null],
};

const baseState = (s) => (!s ? null : s.startsWith('critiqued') ? 'critiqued' : s.startsWith('outcome:') ? 'outcome' : s);
const rank = (s) => (s ? ORDER.indexOf(baseState(s)) : -1);
const stationOf = (s) => STATIONS.find((st) => st.states.includes(baseState(s)))?.n ?? null;

// ---- readers ----------------------------------------------------------------------------------
const read = (rel) => (existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), 'utf8') : null);
const readJson = (rel) => { const t = read(rel); return t ? JSON.parse(t) : null; };
const readJsonl = (rel) => ((rel.startsWith('/') ? (existsSync(rel) ? readFileSync(rel, 'utf8') : null) : read(rel)) ?? '').split('\n').filter((l) => l.trim()).map((l, i) => {
  try { return JSON.parse(l); } catch (e) { throw new Error(`${rel}:${i + 1} is not JSON: ${e.message}`); }
});
const val = (x) => (x && typeof x === 'object' && 'value' in x ? x.value : x ?? null);
const day = (ts) => ts.slice(0, 10);

// Every run file (runs/<run_id>.yaml): this checkout's, plus the ones only on origin/main
// (the other operator's merged runs). A file in both is read from this checkout.
function readRuns() {
  const files = new Map();
  for (const f of lsMain(RUNS_DIR)) if (f.endsWith('.yaml')) files.set(f, showMain(`${RUNS_DIR}/${f}`));
  if (existsSync(join(ROOT, RUNS_DIR))) for (const f of readdirSync(join(ROOT, RUNS_DIR))) if (f.endsWith('.yaml')) files.set(f, read(`${RUNS_DIR}/${f}`));
  return [...files.values()].filter(Boolean).map(parseRun).sort((a, b) => a.run_id.localeCompare(b.run_id));
}

function parseRun(y) {
  const scalar = (k) => (y.match(new RegExp(`^${k}:\\s*([^#\\n]+)`, 'm'))?.[1] ?? '').trim().replace(/^["']|["']$/g, '');
  const pins = {};
  const block = y.split(/^agents:/m)[1] ?? '';
  for (const m of block.matchAll(/^\s+([\w-]+):\s*([\d.]+)/gm)) pins[m[1]] = m[2];
  return {
    run_id: scalar('run_id'), mode: scalar('mode'),
    operator: scalar('operator') || null, status: scalar('status') || 'active',
    area_mode: (y.match(/^\s+mode:\s*(\w+)/m)?.[1] ?? ''),
    anchors: [...y.matchAll(/^\s*-\s*"([^"]+)"/gm)].map((m) => m[1]),
    max_sites: Number(scalar('max_sites')) || null,
    presence_threshold: Number(scalar('presence_threshold')) || null,
    tokens_per_business: Number((y.match(/tokens_per_business:\s*([\d_]+)/)?.[1] ?? '').replace(/_/g, '')) || null,
    default_mode: (y.match(/default_mode:\s*(\w+)/)?.[1] ?? null),
    agent_pins: pins,
    // packs and engagement (proposal 2026-09-globalsurf-02/004); a workflow is market × vertical
    market: scalar('market') || 'lk', vertical: scalar('vertical') || 'surf', engagement: scalar('engagement') || 'outbound',
    get workflow() { return `${this.market}-${this.vertical}`; },
  };
}

function readDossier(slug) {
  const d = readJson(`dossier/${slug}/dossier.json`);
  if (!d) return null;
  const ratings = {};
  for (const [platform, r] of Object.entries(d.reviews ?? {})) {
    if (r && typeof r === 'object' && typeof r.rating === 'number') ratings[platform] = { rating: r.rating, count: r.count ?? null, fetched_at: r.fetched_at ?? null };
  }
  return { name: val(d.business?.name) ?? null, type: d.businessType ?? null, harvested_at: d.harvested_at ?? null, ratings, gaps: Array.isArray(d.gaps) ? d.gaps.length : null };
}

function readDeploy(slug) {
  const d = readJson(`sites/${slug}/deploy.json`);
  if (!d) return null;
  const last = (d.steps ?? []).filter((s) => s.step === 'deploy' && s.ok).at(-1);
  return { adapter: d.adapter ?? null, cms: d.cms ?? null, url: last?.evidence?.url ?? null, version: last?.evidence?.version ?? null, deployed_at: last?.started ?? null, verified: (d.steps ?? []).some((s) => s.step === 'verify' && s.ok) };
}

function readPitch(slug) {
  const dir = join(ROOT, 'sites', slug, 'pitch');
  if (!existsSync(dir)) return null;
  const worker = read(`sites/${slug}/pitch/wrangler.jsonc`)?.match(/"name":\s*"([^"]+)"/)?.[1] ?? null;
  return { drafts: readdirSync(dir).filter((f) => /^(index\.html|message\..*\.md|in-person\..*\.md)$/.test(f)), proposal_url: worker ? `https://${worker}.os1.workers.dev` : null };
}

// Screenshots: the site's earliest and latest desktop contact sheets, and the final-vs-picked folder.
function readShots(slug) {
  const base = `sites/${slug}/final/shots`;
  if (!existsSync(join(ROOT, base))) return null;
  // Folder names differ per site (round-1, 4g-round-1, critic-2, aiseo…): the first sheet is the
  // one named round-1 when it exists, else the earliest by capture time; the latest is the newest.
  // Capture time is shoot.json's `at`; folders shot before it was recorded fall back to mtime,
  // which a clone or checkout does not preserve.
  const mtime = (n) => Date.parse(readJson(`${base}/${n}/shoot.json`)?.at ?? '') || statSync(join(ROOT, base, n, 'desktop-sheet.png')).mtimeMs;
  const rounds = readdirSync(join(ROOT, base), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    .filter((n) => existsSync(join(ROOT, base, n, 'desktop-sheet.png')))
    .sort((a, b) => (/^(4g-)?round-1$/.test(b) - /^(4g-)?round-1$/.test(a)) || (mtime(a) - mtime(b)));
  const fvp = join(ROOT, base, 'final-vs-picked');
  return {
    first: rounds[0] ? `${base}/${rounds[0]}/desktop-sheet.png` : null,
    latest: rounds.at(-1) ? `${base}/${rounds.at(-1)}/desktop-sheet.png` : null,
    rounds: rounds.map((r) => `${base}/${r}/desktop-sheet.png`),
    final_vs_picked: existsSync(fvp) ? readdirSync(fvp).filter((f) => /\.(png|jpg|html|md)$/i.test(f)).map((f) => `${base}/final-vs-picked/${f}`) : [],
    critic_report: existsSync(join(ROOT, 'reports')) ? readdirSync(join(ROOT, 'reports')).flatMap((r) => (existsSync(join(ROOT, 'reports', r, `${slug}.md`)) ? [`reports/${r}/${slug}.md`] : [])) : [],
  };
}

// agents/*/CHANGELOG.md: highest semver in the file (the files are not all newest-first) and its line.
// ---- operators (docs/team.md) -------------------------------------------------------------------
// Ledger lines before the operator field existed are Shahar's: he ran every session until 2026-10-02.
const opOfLine = (l) => l.operator ?? (l.ts < '2026-10-02' ? 'shahar' : null);

// Commits that touched one business (sites/, dossier/ or notes/<slug>), newest first. A commit that
// touched more than three businesses is project-wide housekeeping, not work on any one of them.
function readCommits(ops) {
  let out = '';
  try { out = execFileSync('git', ['log', '-n', '800', 'HEAD', ...(mainSha() ? [MAIN] : []), '--format=%x1e%h%x09%aI%x09%ae%x09%an%x09%s', '--name-only', '--', 'sites', 'dossier', 'notes'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 256e6 }); } catch { return {}; }
  const bySlug = {};
  for (const rec of out.split('\x1e').filter((r) => r.trim())) {
    const [head, ...files] = rec.split('\n').filter(Boolean);
    const [ref, ts, email, name, subject] = head.split('\t');
    const slugs = new Set(files.map((f) => f.match(/^(?:sites|dossier|notes)\/([^/.]+)/)?.[1]).filter((s) => s && s !== 'README'));
    if (slugs.size > 3) continue;
    const ev = { ts: new Date(ts).toISOString().replace(/\.\d+Z$/, 'Z'), operator: operatorFor({ email, name }, ops) ?? name, kind: 'commit', note: subject, ref };
    for (const s of slugs) (bySlug[s] ??= []).push(ev);
  }
  return bySlug;
}

function readChangelogs() {
  const out = {};
  for (const name of readdirSync(join(ROOT, 'agents'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
    const text = read(`agents/${name}/CHANGELOG.md`);
    if (!text) { out[name] = { version: null, line: null }; continue; }
    let best = null;
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*(?:##\s*|-\s*\*\*)?\[?v?(\d+\.\d+\.\d+)\]?\*{0,2}\s*[—–-]\s*(\d{4}-\d{2}-\d{2})?/);
      if (!m) continue;
      const v = m[1].split('.').map(Number);
      if (!best || v.some((n, i) => n !== best.v[i] && n > best.v[i] && v.slice(0, i).every((x, j) => x === best.v[j]))) {
        best = { v, version: m[1], date: m[2] ?? null, line: line.replace(/^\s*(?:##\s*|-\s*)/, '').trim() };
      }
    }
    out[name] = best ? { version: best.version, date: best.date, line: best.line } : { version: null, line: null };
  }
  return out;
}

// proposals/ = suggested agent tweaks. dashboard/tweaks.json carries a plain-language summary of each
// and whether it is already applied or out of date; a ledger approve/reject line always wins.
function readProposals(proposalDecisions = []) {
  const base = join(ROOT, 'proposals');
  if (!existsSync(base)) return [];
  const plain = readJson('dashboard/tweaks.json') ?? {};
  const out = [];
  for (const run of readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
    for (const f of readdirSync(join(base, run)).filter((f) => f.endsWith('.md'))) {
      const text = read(`proposals/${run}/${f}`) ?? '';
      const title = text.match(/^#\s+(.+)$/m)?.[1] ?? f;
      // Merging a proposal is a human gate (PLAN.md) and no ledger line records one yet, so the only
      // honest status is "no merge record". *-APPLY.md files are application notes, not proposals.
      const record = /-APPLY\.md$/.test(f);
      const file = `proposals/${run}/${f}`;
      const decision = [...proposalDecisions].reverse().find((l) => (l.note ?? '').startsWith(file));
      const t = plain[file] ?? {};
      if (t.hidden) continue;
      out.push({ run_id: run, file, title: t.title ?? title, file_title: title, kind: record ? 'application record' : 'proposal',
        agent: t.agent ?? null, what: t.what ?? null, why: t.why ?? null,
        // pending | approved | rejected | applied | superseded | info
        status: record ? null : decision ? decision.to_state.replace('proposal:', '') : (t.status ?? 'pending'),
        status_note: decision ? null : t.status_note ?? null,
        decided_at: decision?.ts ?? null, decision_note: decision?.note ?? null, decided_by: decision ? opOfLine(decision) : null,
        custom_md: t.custom_md ?? (/custom\.md/i.test(title) || /custom-md/.test(f)) });
    }
  }
  return out;
}

// Scout output per run: reports/<run>/candidates.json (location, presence score + reason) and the
// search area, reports/<run>/area.geojson. For the Ledger view's table and map.
function readCandidates() {
  const out = {}, areas = {};
  const base = join(ROOT, 'reports');
  if (!existsSync(base)) return { bySlug: out, areas };
  for (const r of readdirSync(base)) {
    const c = readJson(`reports/${r}/candidates.json`);
    for (const x of c?.candidates ?? []) (out[x.slug] ??= {})[r] = x;
    const a = readJson(`reports/${r}/area.geojson`);
    if (a) areas[r] = a;
  }
  return { bySlug: out, areas };
}

// ---- build ------------------------------------------------------------------------------------
// The ledger and activity are this checkout's lines plus origin/main's (tools/origin.mjs), so the
// page shows what either operator has merged. `origin: false` reads this checkout only.
export function buildData({ ledgerPath = 'ledger.jsonl', operator = null, origin = true } = {}) {
  const ledgerAbs = ledgerPath.startsWith('/') ? ledgerPath : join(ROOT, ledgerPath);
  const ledger = origin && ledgerAbs === join(ROOT, 'ledger.jsonl') ? readJsonlMerged('ledger.jsonl') : readJsonl(ledgerPath);
  const ops = readTeam();
  let viewer = operator;
  if (!viewer) { try { viewer = whoami(); } catch { viewer = Object.keys(ops)[0]; } }
  const viewerName = ops[viewer]?.name ?? viewer;
  const activity = origin ? readJsonlMerged('activity.jsonl') : readActivity();
  const allAssignments = toAssignments(activity);
  const commitsBySlug = readCommits(ops);
  const media = mediaStatus();
  // Several runs can be active at once, one per operator (docs/team.md). `run` is the one the page
  // opens on: the viewer's active run, else the newest active one, else the newest file.
  const runFiles = readRuns();
  const wfRun = (id) => runFiles.find((r) => r.run_id === id) ?? parseRun('');
  const wfOf = (id) => wfRun(id).workflow;
  const activeRuns = runFiles.filter((r) => r.status === 'active');
  const run = activeRuns.find((r) => r.operator === viewer) ?? activeRuns.at(-1) ?? runFiles.at(-1) ?? parseRun('');
  const isActive = (r) => activeRuns.some((x) => x.run_id === r);
  const businessLines = ledger.filter((l) => l.slug && l.slug !== '-' && l.slug !== 'dashboard');
  const corrections = ledger.filter((l) => (!l.slug || l.slug === '-') && !/^proposal:/.test(l.to_state));
  const nonBusinessRuns = ledger.filter((l) => l.slug === 'dashboard');

  const byKey = new Map();
  for (const line of businessLines) {
    const k = `${line.run_id}\u0000${line.slug}`;
    if (!byKey.has(k)) byKey.set(k, []);
    byKey.get(k).push(line);
  }
  const runsSeen = [...new Set(businessLines.map((l) => l.run_id))].sort();
  const approvalsByRun = Object.fromEntries(runsSeen.map((r) => [r, businessLines.some((l) => l.run_id === r && l.to_state === 'approved')]));
  const latestRunOf = {};
  for (const k of byKey.keys()) { const [r, s] = k.split('\u0000'); if (!latestRunOf[s] || r > latestRunOf[s]) latestRunOf[s] = r; }
  const DROP_RE = /\b(dropped|withdrawn|disqualified|reversed by|FAILS the|leaves the run|aborted)\b/i;
  const OVERRIDE_RE = /\b(allow(?:ed|s)? (?:a )?(?:third|3rd|fourth|4th|one more|another) (?:pass|round)|allow round [3-9]|third pass|one more round|overr(?:ide|ode|ules?))\b/i;

  function classify(hist, runHasApprovals, isCurrent) {
    const last = hist.at(-1); const state = last.to_state;
    // A drop goes back to before the approval gate. A step back to any later state is a rework loop
    // (copy_failed → copy_drafted, critiqued(n) → copy_drafted, mocked → concepted): still in the pipeline.
    const regressed = rank(state) < rank(last.from_state) && rank(state) < rank('approved');
    if (state.startsWith('outcome:')) return { group: 'outcome', label: state.slice(8) };
    if (!isCurrent && rank(state) < rank('approved') && !runHasApprovals) return { group: 'superseded', label: 'run not continued' };
    if (state === 'pitched') return { group: 'pitched', label: 'pitched' };
    if (state === 'previewed') return { group: 'delivered', label: 'preview live, pitch not written' };
    if (state === 'packaged') return { group: 'delivered', label: last.ts < PACKAGED_MEANING_CHANGED ? 'built + deployed, pitch not sent' : 'preview live, pitch ready to send' };
    if (state === 'product_chosen') return { group: 'delivered', label: 'sold, product chosen, delivery pending' };
    if (['delivered', 'handoff_verified', 'access_revoked'].includes(state)) return { group: 'delivered', label: state };
    if (regressed || (rank(state) < rank('approved') && DROP_RE.test(last.note ?? ''))) return { group: 'dropped', label: 'dropped' };
    if (state === 'scored') return { group: 'not_shortlisted', label: 'scored above threshold' };
    if (state === 'shortlisted') return runHasApprovals ? { group: 'not_approved', label: 'shortlisted, not approved' } : { group: 'gate', label: 'awaiting shortlist approval' };
    if (GATES[state]) return { group: 'gate', label: `awaiting: ${GATES[state]}` };
    return { group: 'pipeline', label: state };
  }

  // Critic lines → numbered rounds and post-pass verifications, each with its score when the note has one.
  function criticSeries(hist) {
    return hist.filter((h) => h.agent === 'critic').map((h) => {
      // Scores are always out of 100. Notes from 2026-10 that headline the critic's part (dimensions 1–7,
      // out of 80) are totalled per rubric.md: + dimension 8 = the lower visual score (/10) × 2.5.
      let m = h.note?.match(/\b(PASS|FAIL)\b[^0-9]{0,20}(\d+(?:\.\d+)?)\s*\/\s*100/);
      const part = !m && h.note?.match(/\b(PASS|FAIL)\b[^0-9]{0,20}(\d+(?:\.\d+)?)\s*\/\s*80\b/);
      const vis = h.note?.match(/visual-critic\s+(\d+(?:\.\d+)?)\s*\/\s*10/)?.[1];
      const exp = h.note?.match(/experience-critic\s+(\d+(?:\.\d+)?)\s*\/\s*10/)?.[1];
      if (part && vis && exp) m = [null, part[1], String(Math.round((Number(part[2]) + Math.min(vis, exp) * 2.5) * 10) / 10)];
      const round = h.to_state.match(/^critiqued\((\d+)\)$/)?.[1];
      const kind = round ? 'round' : /verification/i.test(h.note ?? '') ? 'verification' : /pre-score/i.test(h.note ?? '') ? 'pre-score' : 'other';
      return { ts: h.ts, kind, round: round ? Number(round) : null, verdict: m?.[1] ?? null, score: m ? Number(m[2]) : null, to: h.to_state };
    }).filter((c) => c.score != null || c.kind === 'round');
  }

  const businesses = [];
  for (const [k, hist] of byKey) {
    const [run_id, slug] = k.split('\u0000');
    const last = hist.at(-1); // file order = current state (CLAUDE.md)
    const own = latestRunOf[slug] === run_id;
    const dossier = own ? readDossier(slug) : null;
    const deploy = own ? readDeploy(slug) : null;
    const pitch = own ? readPitch(slug) : null;
    const shots = own ? readShots(slug) : null;
    const { group, label } = classify(hist, approvalsByRun[run_id], isActive(run_id));
    const reached = new Set(hist.map((h) => baseState(h.to_state)));
    const scoreNote = hist.find((h) => h.to_state === 'scored')?.note ?? '';
    const presence = scoreNote.match(/presence\s+(\d)\s*\/\s*5/i)?.[1];
    const pitchedLine = hist.find((h) => h.to_state === 'pitched');
    const outcomeLine = [...hist].reverse().find((h) => h.to_state.startsWith('outcome:'));
    const hosting = [...hist].reverse().find((h) => h.hosting_mode)?.hosting_mode ?? null;
    const previewFromLedger = [...hist].reverse().map((h) => h.note?.match(/https:\/\/[\w.-]+\.workers\.dev/)?.[0]).find(Boolean);
    const critic = criticSeries(hist);
    const criticRounds = critic.filter((c) => c.kind === 'round');
    const latestScored = [...critic].reverse().find((c) => c.score != null && c.verdict);
    const discovered = hist.find((h) => h.to_state === 'discovered');
    const stationDates = {};
    for (const h of hist) { const n = stationOf(h.to_state); if (n && !stationDates[n]) stationDates[n] = h.ts; }
    const out = ['dropped', 'not_shortlisted', 'not_approved', 'superseded'].includes(group);
    const nextKey = NEXT_STEP[last.to_state] ? last.to_state : baseState(last.to_state);
    const selfHostedDelivered = last.to_state === 'delivered' && hosting === 'self_hosted_docker';
    const [nextStep, ownerRaw] = out ? ['—', null] : selfHostedDelivered ? ['verify the handoff', 'deployer'] : (NEXT_STEP[nextKey] ?? [null, null]);
    const owner = ownerRaw === HUMAN ? viewerName : ownerRaw; // a gate is either operator's: shown as "you"
    // One timeline per business: ledger transitions, operators' work and assignments, commits.
    const timeline = [
      ...hist.map((h) => ({ ts: h.ts, operator: opOfLine(h), kind: 'ledger', agent: h.agent, note: `${h.from_state ?? '—'} → ${h.to_state}${h.note ? ': ' + h.note : ''}` })),
      ...(own ? activity.filter((a) => a.slug === slug).map((a) => ({ ts: a.ts, operator: a.operator, kind: a.kind, note: a.kind === 'assign' ? `assigned to ${ops[a.to]?.name ?? a.to}: ${a.task}` : a.note, files: a.files ?? null, id: a.id ?? null })) : []),
      ...(own ? commitsBySlug[slug] ?? [] : []),
    ].sort((x, y) => y.ts.localeCompare(x.ts));
    const lastWorked = timeline.find((e) => e.operator && (e.kind !== 'ledger' || e.agent === 'human' || e.ts >= '2026-10-02')) ?? timeline.find((e) => e.operator) ?? null;
    const gate = (group === 'gate' || group === 'delivered' || group === 'outcome') ? (GATES[last.to_state] ?? null) : null;
    const overrides = hist.filter((h) => h.agent === 'human' && OVERRIDE_RE.test(h.note ?? '')).map((h) => ({ ts: h.ts, note: h.note }));
    // Who ran the site: the run file's operator, else whoever wrote most of its ledger lines.
    const lineOps = hist.map(opOfLine).filter(Boolean);
    const ranBy = runFiles.find((r) => r.run_id === run_id)?.operator
      ?? [...new Set(lineOps)].sort((a, b) => lineOps.filter((o) => o === b).length - lineOps.filter((o) => o === a).length)[0] ?? null;

    businesses.push({
      slug, run_id, workflow: wfOf(run_id),
      name: dossier?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      type: dossier?.type ?? null,
      presence: presence != null ? Number(presence) : null,
      ratings: dossier?.ratings ?? {},
      state: last.to_state, group, label, out,
      why: last.note ?? '',
      found_via: discovered?.note?.replace(/^found via\s*/i, '') ?? null,
      first_seen: hist[0].ts, last_change: last.ts,
      days_since_change: Math.floor((Date.now() - Date.parse(last.ts)) / 86400000),
      station: stationOf(last.to_state), station_dates: stationDates,
      next_step: nextStep, owner,
      gate,
      gate_target: gate ? { view: gate === 'send the pitch' || gate === PRODUCT_GATE ? 'sites' : 'pipeline', slug } : null,
      lines: hist.length,
      human_decisions: hist.filter((h) => h.agent === 'human').length,
      overrides,
      copy_rounds: hist.filter((h) => h.agent === 'copyeditor' && (h.to_state === 'copy_failed' || h.to_state === 'copy_passed')).length,
      copy_fails: hist.filter((h) => h.agent === 'copyeditor' && h.to_state === 'copy_failed').length,
      critic_rounds: criticRounds.length,
      critic_score: latestScored?.score ?? null,
      critic_score_kind: latestScored ? `${latestScored.kind}${latestScored.round ? ' ' + latestScored.round : ''}` : null,
      critic_series: critic,
      // The client chooses the mode after a sale (product_chosen carries it); before that, none is shown.
      // Lines before 2026-10-05 carry a hosting_mode that was not the client's choice: ignored until product_chosen.
      hosting_mode: reached.has('product_chosen') ? (hosting ?? run.default_mode) : null,
      preview_url: deploy?.url ?? previewFromLedger ?? null,
      deploy, cms_verified: deploy?.verified ?? false,
      pitch, shots,
      last_worked: lastWorked ? { operator: lastWorked.operator, name: ops[lastWorked.operator]?.name ?? lastWorked.operator, ts: lastWorked.ts, kind: lastWorked.kind, note: lastWorked.note } : null,
      assignments: own ? allAssignments.filter((a) => a.slug === slug) : [],
      timeline: timeline.slice(0, 80),
      media: own ? media[slug] ?? null : null,
      pitched_at: pitchedLine?.ts ?? null,
      // the server writes "sent by <name> via <channel>[ on <date>]. <note>" (dashboard/server.mjs, gate c)
      pitch_sent: pitchedLine ? { ts: pitchedLine.ts, by: opOfLine(pitchedLine), channel: pitchedLine.note?.match(/\bvia (whatsapp|in person|email|phone)\b/i)?.[1] ?? null, note: pitchedLine.note ?? null } : null,
      ran_by: ranBy ? { operator: ranBy, name: ops[ranBy]?.name ?? ranBy } : null,
      outcome: outcomeLine ? { state: outcomeLine.to_state.slice(8), ts: outcomeLine.ts, note: outcomeLine.note } : null,
      reached: [...reached],
      history: hist.map((h) => ({ ts: h.ts, from: h.from_state, to: h.to_state, agent: h.agent, v: h.agent_version, note: h.note, hosting_mode: h.hosting_mode })),
    });
  }
  businesses.sort((a, b) => b.run_id.localeCompare(a.run_id) || (rank(b.state) - rank(a.state)) || a.slug.localeCompare(b.slug));

  // ---- KPIs per run and deltas -----------------------------------------------------------------
  const FUNNEL = ['discovered', 'shortlisted', 'harvested', 'built', 'pitched', 'outcome:reply', 'outcome:sale'];
  const FUNNEL_LABELS = ['researched', 'shortlisted', 'harvested', 'built', 'pitched', 'replied', 'client'];
  // Inbound businesses enter at `briefed` and pass gate b′ at `aligned`: they count as found and shortlisted.
  const ALIAS = { discovered: 'briefed', shortlisted: 'aligned' };
  function kpisFor(runId) { return kpisOf(businesses.filter((b) => b.run_id === runId)); }
  function kpisOf(bs) {
    const live = bs.filter((b) => ['delivered', 'pitched', 'outcome'].includes(b.group));
    const scored = live.filter((b) => b.critic_score != null);
    const reachedCount = (s) => bs.filter((b) => (b.reached.includes(baseState(s)) || (ALIAS[s] && b.reached.includes(ALIAS[s]))) && (!s.startsWith('outcome:') || b.history.some((h) => h.to === s))).length;
    const inbound = bs.length > 0 && bs.every((b) => wfRun(b.run_id).engagement === 'inbound');
    return {
      researched: bs.length,
      live_sites: live.length,
      needs_you: bs.filter((b) => b.gate).length,
      pitched: bs.filter((b) => b.pitched_at).length,
      replies: bs.filter((b) => b.history.some((h) => h.to === 'outcome:reply' || h.to === 'outcome:meeting')).length,
      meetings: bs.filter((b) => b.history.some((h) => h.to === 'outcome:meeting')).length,
      clients: bs.filter((b) => b.outcome?.state === 'sale').length,
      avg_critic: scored.length ? Math.round((scored.reduce((s, b) => s + b.critic_score, 0) / scored.length) * 10) / 10 : null,
      funnel: FUNNEL.map((s, i) => ({ state: inbound && ALIAS[s] ? ALIAS[s] : s, label: inbound && ALIAS[s] ? ALIAS[s] : FUNNEL_LABELS[i], count: reachedCount(s) })),
    };
  }
  const kpis_by_run = Object.fromEntries(runsSeen.map((r) => [r, kpisFor(r)]));
  // A run with no ledger line yet (a run file just created, or an empty ledger) is not in runsSeen.
  // Deltas compare runs of the same workflow only (proposal 004).
  const sameWf = runsSeen.filter((r) => wfOf(r) === wfOf(run.run_id));
  const runIdx = sameWf.indexOf(run.run_id);
  const prevRun = (runIdx === -1 ? sameWf.filter((r) => r < run.run_id).at(-1) : sameWf[runIdx - 1]) ?? null;
  const cur = kpis_by_run[run.run_id] ?? kpisFor(run.run_id), prev = prevRun ? kpis_by_run[prevRun] : null;
  const deltas = {};
  for (const k of ['researched', 'live_sites', 'needs_you', 'pitched', 'replies', 'clients', 'avg_critic']) {
    const stageReachedBefore = prev && (k === 'researched' || k === 'needs_you' || (k === 'avg_critic' ? prev.avg_critic != null : prev[k] > 0 || prev.funnel.some((f) => f.count > 0 && ['live_sites'].includes(k) && f.state === 'built')));
    deltas[k] = { current: cur[k], previous: stageReachedBefore ? prev[k] : null, previous_run: prevRun,
      delta: stageReachedBefore && cur[k] != null && prev[k] != null ? Math.round((cur[k] - prev[k]) * 10) / 10 : null,
      note: prev ? (stageReachedBefore ? `vs ${prevRun}` : `first run to reach this stage (${prevRun} stopped at scoring)`) : 'first run' };
  }

  // ---- per-day series for sparklines ------------------------------------------------------------
  const allTs = businessLines.map((l) => l.ts).sort();
  const days = [];
  for (let d = new Date((allTs[0] ?? new Date().toISOString()).slice(0, 10)); d <= new Date(); d.setUTCDate(d.getUTCDate() + 1)) days.push(d.toISOString().slice(0, 10));
  const series = { days, ledger_lines: [], decisions: [], gates_open: [], live_sites: [], businesses_seen: [] };
  for (const dday of days) {
    const upto = businessLines.filter((l) => day(l.ts) <= dday && l.run_id === run.run_id);
    series.ledger_lines.push(businessLines.filter((l) => day(l.ts) === dday).length);
    series.decisions.push(businessLines.filter((l) => day(l.ts) === dday && l.agent === 'human').length);
    const lastBy = new Map();
    for (const l of upto) lastBy.set(l.slug, l);
    series.gates_open.push([...lastBy.values()].filter((l) => GATES[l.to_state] && !(l.to_state === 'shortlisted' && upto.some((x) => x.to_state === 'approved'))).length);
    series.live_sites.push([...lastBy.values()].filter((l) => rank(l.to_state) >= rank('previewed')).length);
    series.businesses_seen.push(lastBy.size);
  }

  // ---- agents -------------------------------------------------------------------------------------
  const changelogs = readChangelogs();
  const AGENT_PASS = { copyeditor: (h) => h.to === 'copy_passed', critic: (h) => /\bPASS\b/.test(h.note ?? '') && (h.to.startsWith('critiqued') || h.to === 'passed'), harvester: (h) => h.to === 'harvested', auditor: (h) => h.to === 'audited', designer: (h) => h.to === 'built' || h.to === 'mocked', scout: (h) => h.to === 'scored' };
  const AGENT_FAIL = { copyeditor: (h) => h.to === 'copy_failed', critic: (h) => /\bFAIL\b/.test(h.note ?? '') && h.to.startsWith('critiqued') };
  const agents = {};
  for (const name of Object.keys(changelogs)) {
    const perRun = {};
    for (const r of runsSeen) {
      const lines = businesses.filter((b) => b.run_id === r).flatMap((b) => b.history.filter((h) => h.agent === name).map((h) => ({ ...h, slug: b.slug })));
      const passes = lines.filter(AGENT_PASS[name] ?? (() => false));
      const fails = lines.filter(AGENT_FAIL[name] ?? (() => false));
      // rounds needed per pass: for each pass, the agent's lines on that slug since its previous pass
      const roundsPerPass = passes.map((p) => {
        const mine = lines.filter((l) => l.slug === p.slug);
        const idx = mine.indexOf(p);
        const prevPass = mine.slice(0, idx).map((l, i) => ((AGENT_PASS[name] ?? (() => false))(l) ? i : -1)).filter((i) => i >= 0).at(-1) ?? -1;
        return { slug: p.slug, ts: p.ts, rounds: idx - prevPass };
      });
      perRun[r] = { lines: lines.length, passes: passes.length, fails: fails.length, rounds_per_pass: roundsPerPass,
        fails_by_slug: Object.fromEntries([...new Set(fails.map((f) => f.slug))].map((s) => [s, fails.filter((f) => f.slug === s).length])),
        versions_seen: [...new Set(lines.map((l) => l.v).filter(Boolean))] };
    }
    agents[name] = {
      version_changelog: changelogs[name].version, changelog_date: changelogs[name].date ?? null, changelog_line: changelogs[name].line,
      version_pinned: run.agent_pins[name] ?? null,
      pin_matches_changelog: run.agent_pins[name] != null && run.agent_pins[name] === changelogs[name].version,
      by_run: perRun,
      // An override belongs to the agent whose fail it overrode: the note names the station or agent.
      third_fail_overrides: businesses.flatMap((b) => b.overrides.map((o) => ({ ...o, slug: b.slug, run_id: b.run_id })))
        .filter((o) => (name === 'copyeditor' && /copyeditor|\b4c\b|copy/i.test(o.note)) || (name === 'critic' && /critic(?!.*copyeditor)/i.test(o.note) && !/\b4c\b/.test(o.note))),
    };
  }

  // ---- gates, decisions, activity, proposals, expenses ---------------------------------------------
  const proposals = readProposals(ledger.filter((l) => /^proposal:(approved|rejected)$/.test(l.to_state)));
  const gates = businesses.filter((b) => b.gate).map((b) => ({ kind: b.gate, slug: b.slug, name: b.name, run_id: b.run_id, workflow: b.workflow, since: b.last_change, days: b.days_since_change, target: b.gate_target }));
  const unmerged = proposals.filter((p) => p.kind === 'proposal' && p.status === 'pending');
  if (unmerged.length) gates.push({ kind: 'approve or reject', slug: null, name: `${unmerged.length} suggested agent tweak${unmerged.length === 1 ? '' : 's'}`, run_id: null, since: null, days: null, target: { view: 'decisions', proposals: unmerged.map((p) => p.file) } });
  const decisions = businessLines.filter((l) => l.agent === 'human').sort((a, b) => b.ts.localeCompare(a.ts)).map((l) => ({ ts: l.ts, slug: l.slug, run_id: l.run_id, operator: opOfLine(l), from: l.from_state, to: l.to_state, note: l.note, gate: !!(GATES[l.from_state] && l.from_state !== l.to_state), override: OVERRIDE_RE.test(l.note ?? '') }));
  const recent_activity = [...ledger].slice(-25).reverse().map((l) => ({ ts: l.ts, slug: l.slug, run_id: l.run_id, agent: l.agent, operator: opOfLine(l), from: l.from_state, to: l.to_state, note: l.note }));
  const leads = businesses.filter((b) => /^referral:/i.test(b.found_via ?? '')).map((b) => ({ slug: b.slug, name: b.name, referred_by: b.found_via.replace(/^referral:\s*/i, '').split(/[;\s]/)[0], state: b.state, group: b.group, first_seen: b.first_seen }));

  // Money books, both operators' lines (tools/money.mjs, docs/expenses.md, docs/revenues.md).
  const book = (rel) => { const l = origin ? readJsonlMerged(rel) : (existsSync(join(ROOT, rel)) ? readJsonl(rel) : []); return l.length ? l : null; };
  const expenseLines = book('expenses.jsonl');
  const expenses = { tracked: !!expenseLines, entries: expenseLines ?? [], monthly: {}, accumulated: {}, per_client: {}, vendors: {} };
  const revenueLines = book('revenues.jsonl');
  const revenues = { tracked: !!revenueLines, entries: revenueLines ?? [], monthly: {}, accumulated: {}, per_client: {} };
  for (const e of revenueLines ?? []) {
    const cur = e.currency ?? 'USD', month = (e.period ?? e.ts).slice(0, 7);
    ((revenues.monthly[month] ??= {})[cur] = (revenues.monthly[month][cur] ?? 0) + e.amount);
    revenues.accumulated[cur] = (revenues.accumulated[cur] ?? 0) + e.amount;
    ((revenues.per_client[e.slug] ??= {})[cur] = (revenues.per_client[e.slug][cur] ?? 0) + e.amount);
  }
  for (const e of expenseLines ?? []) {
    const cur = e.currency ?? 'USD', month = (e.period ?? e.ts).slice(0, 7), who = e.slug ?? 'shared';
    ((expenses.monthly[month] ??= {})[cur] = (expenses.monthly[month][cur] ?? 0) + e.amount);
    expenses.accumulated[cur] = (expenses.accumulated[cur] ?? 0) + e.amount;
    ((expenses.per_client[who] ??= {})[cur] = (expenses.per_client[who][cur] ?? 0) + e.amount);
    ((expenses.vendors[e.vendor] ??= {})[cur] = (expenses.vendors[e.vendor][cur] ?? 0) + e.amount);
  }

  // Price list suggestion per market (docs/pricing.md); null when the file is missing or not JSON.
  let pricing = null;
  try { pricing = JSON.parse(read('markets/lk/pricing.json') ?? 'null'); } catch { pricing = null; }

  // ---- ledger view: every business ever reviewed, once, in its newest run --------------------------
  const cands = readCandidates();
  const seenSlug = new Set();
  const clean = (n) => (n ?? '').replace(/^gate a:\s*/i, '').replace(/^mode: test\s*[—-]?\s*/i, '').trim();
  const prospects = businesses.filter((b) => !seenSlug.has(b.slug) && seenSlug.add(b.slug)).map((b) => {
    const h = b.history;
    const cand = cands.bySlug[b.slug]?.[b.run_id] ?? Object.values(cands.bySlug[b.slug] ?? {}).at(-1) ?? null;
    const scored = h.find((x) => x.to === 'scored');
    const approved = [...h].reverse().find((x) => x.to === 'approved');
    const left = [...h].reverse().find((x) => rank(x.to) < rank(x.from) && rank(x.to) < rank('approved') && x.from);
    const google = (scored?.note ?? cand?.presence?.reason ?? '').match(/Google[^()]*?\((\d(?:\.\d)?),\s*(\d+)\s+reviews?/i);
    const reached = (s) => b.reached.includes(s);
    let verdict, why;
    if (b.state === 'void') { verdict = 'voided'; why = b.why; }
    else if (reached('built') || reached('passed') || reached('previewed') || reached('packaged')) { verdict = 'built'; why = clean(approved?.note); }
    else if (approved && left && left.ts > approved.ts) { verdict = 'dropped'; why = clean(left.note); }
    else if (approved) { verdict = 'in progress'; why = clean(approved.note); }
    else if (b.group === 'not_shortlisted') { verdict = 'not shortlisted'; why = `Already has a decent online presence (${b.presence}/5 is above the cut-off). ${cand?.presence?.reason ?? scored?.note?.replace(/^presence \d\/5:\s*/, '') ?? ''}`.trim(); }
    else if (b.group === 'superseded') { verdict = 'not continued'; why = 'Found in a run that stopped before the shortlist.'; }
    else if (b.state === 'shortlisted') { verdict = 'shortlisted, not picked'; why = left ? clean(left.note) : 'Made the shortlist; other businesses were picked for the run.'; }
    else { verdict = 'in progress'; why = b.why; }
    return {
      slug: b.slug, name: cand?.name ?? b.name, type: cand?.type ?? b.type, run_id: b.run_id, state: b.state, verdict, why,
      presence: b.presence, presence_reason: cand?.presence?.reason ?? scored?.note?.replace(/^presence \d\/5:\s*/, '') ?? null,
      google: google ? { rating: Number(google[1]), reviews: Number(google[2]) } : null,
      site_url: cand?.existing_site?.url ?? null,
      lat: cand?.location?.lat ?? null, lng: cand?.location?.lng ?? null, address: cand?.location?.address ?? null,
      first_seen: b.first_seen, ran_by: b.ran_by,
    };
  });

  // Runs with ledger lines, plus active runs that have none yet (a run file just created).
  const runIds = [...new Set([...runsSeen, ...activeRuns.map((r) => r.run_id)])].sort();
  const runs = [...runIds].reverse().map((r) => {
    const file = runFiles.find((x) => x.run_id === r);
    const bs = businesses.filter((b) => b.run_id === r); const groups = {};
    for (const b of bs) groups[b.group] = (groups[b.group] ?? 0) + 1;
    const ts = businessLines.filter((l) => l.run_id === r).map((l) => l.ts).sort();
    const w = wfRun(r);
    return { run_id: r, businesses: bs.length, groups, first_ts: ts[0], last_ts: ts.at(-1), current: r === run.run_id, active: isActive(r), operator: file?.operator ?? null, status: file ? file.status : null, market: w.market, vertical: w.vertical, engagement: w.engagement, workflow: w.workflow, kpis: kpis_by_run[r] ?? kpisFor(r) };
  });
  // One entry per workflow (market × vertical) with at least one run: its runs and summed KPIs.
  const workflows = [...new Set(runs.map((r) => r.workflow))].sort().map((id) => {
    const rs = runs.filter((r) => r.workflow === id);
    // The pack files its runs load (tools/prompt.mjs); a stub has only its title comment.
    const packFiles = (dir) => (existsSync(join(ROOT, dir)) ? readdirSync(join(ROOT, dir)).sort().map((f) => { const t = read(`${dir}/${f}`) ?? ''; return { file: `${dir}/${f}`, stub: f.endsWith('.md') && !t.split('\n').some((l) => l.trim() && !l.trim().startsWith('#')) }; }) : null);
    const packs = { market: packFiles(`markets/${rs[0].market}`), vertical: packFiles(`verticals/${rs[0].vertical}`) };
    return { id, market: rs[0].market, vertical: rs[0].vertical, packs, engagements: [...new Set(rs.map((r) => r.engagement))], runs: rs.map((r) => r.run_id), active_runs: rs.filter((r) => r.active).map((r) => r.run_id), kpis: kpisOf(businesses.filter((b) => b.workflow === id)) };
  });

  return {
    generated_at: new Date().toISOString(), human: viewerName,
    sync: { origin_main: origin ? mainSha() : null, note: origin ? `this checkout + ${MAIN}` : 'this checkout only' },
    team: {
      viewer, operators: Object.fromEntries(Object.entries(ops).map(([id, o]) => [id, o.name])),
      open_assignments: allAssignments.filter((a) => a.open).map((a) => ({ ...a, to_name: ops[a.to]?.name ?? a.to, by_name: ops[a.by]?.name ?? a.by, business: businesses.find((b) => b.slug === a.slug)?.name ?? a.slug })),
      // per operator: their latest piece of work, on which business
      last_by_operator: Object.fromEntries(Object.keys(ops).map((id) => {
        const e = businesses.flatMap((b) => b.timeline.filter((t) => t.operator === id && t.kind !== 'ledger').map((t) => ({ ...t, slug: b.slug, business: b.name })))
          .concat(activity.filter((a) => a.operator === id && a.slug === '-').map((a) => ({ ...a, business: 'Project' })))
          .sort((x, y) => y.ts.localeCompare(x.ts))[0];
        return [id, e ? { ts: e.ts, slug: e.slug ?? '-', business: e.business, kind: e.kind, note: e.note } : null];
      })),
      media: Object.fromEntries(Object.entries(media).filter(([g]) => g === '_shared')),
    },
    pipeline_order: ORDER, gate_states: GATES, stations: STATIONS, next_step: NEXT_STEP,
    run: { ...run, workflow: run.workflow }, runs, workflows, kpis: cur, kpis_by_run, deltas, funnel: cur.funnel, series,
    gates, businesses, prospects, areas: cands.areas, decisions, recent_activity, leads, corrections, proposals, agents, expenses, revenues, pricing,
    non_business_runs: nonBusinessRuns.map((l) => ({ ts: l.ts, run_id: l.run_id, agent: l.agent, to: l.to_state, note: l.note })),
    empty_states: {
      pitched: { filled_by: 'a ledger line packaged → pitched (agent: human)', earliest: 'when Shahar sends the first pitch; three are ready', view: 'overview, pipeline' },
      replies: { filled_by: 'a ledger line pitched → outcome:reply or outcome:meeting', earliest: 'after the first pitch is sent', view: 'overview' },
      clients: { filled_by: 'a ledger line → outcome:sale', earliest: 'after the first reply', view: 'overview' },
      cost: { filled_by: 'expenses.jsonl (docs/expenses.md); token spend per business is not recorded anywhere', earliest: 'when the first charge is written; none exists yet', view: 'overview' },
      sparkline: { filled_by: 'ledger timestamps per day (series.*)', earliest: 'present for gates_open, live_sites, ledger_lines, decisions; absent for pitched/replies/clients until they have a first value', view: 'overview KPI cards' },
      delta: { filled_by: 'kpis_by_run of the previous run', earliest: 'a second run that reaches the stage; 2026-09-ahangama-01 stopped at scoring', view: 'overview KPI cards' },
    },
    totals: {
      businesses_all_runs: new Set(businesses.map((b) => b.slug)).size, ledger_lines: ledger.length,
      human_decisions: decisions.length, tokens_per_business_budget: run.tokens_per_business, token_spend_tracked: false,
    },
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const data = buildData();
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'data.json'), JSON.stringify(data, null, 2) + '\n');
  console.log(`dashboard/data.json: ${data.businesses.length} rows, ${data.runs.length} runs, gates ${data.gates.length}, decisions ${data.decisions.length}, agents ${Object.keys(data.agents).length}, proposals ${data.proposals.length}, days ${data.series.days.length}`);
}
