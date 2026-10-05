// Builds dashboard/agents-04/c/index.html (Agents, direction C "Checkpoints") from template.html.
// Run from the worktree root, after `node dashboard/data.mjs`:  node dashboard/agents-04/c/build.mjs
// Every number on the page is computed here from dashboard/data.json, exactly as
// dashboard/agents-04/concepts.md §1 defines it. The agents' own files (base.md, custom.md, CHANGELOG.md,
// references.md, tools.md, evals.md), the pending suggestion files, the copy reviews and the critic's
// reports are embedded gzipped (they are only read when a popup opens). Nothing is written anywhere else.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import * as P from './plain.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const D = JSON.parse(readFileSync(join(ROOT, 'dashboard/data.json'), 'utf8'));
const font = readFileSync(join(ROOT, 'dashboard/mockups/soft-cards/src/fonts/manrope-latin-wght-normal.woff2')).toString('base64');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

// ---------- agents: names, roles (concepts.md §1.4, from PLAN.md §4–§5; data gap 11), lanes ----------
const AGENTS = [
  ['scout', 'Scout', 'SC', 'Find', 'Finds surf businesses and scores how weak their web presence is'],
  ['harvester', 'Harvester', 'HA', 'Find', 'Collects facts, photos and video, each with its source'],
  ['auditor', 'Auditor', 'AU', 'Find', "Measures the old site's taps to book and sets the target"],
  ['copywriter', 'Copywriter', 'CW', 'Words', "Writes the site's words from the facts only"],
  ['humanizer', 'Humanizer', 'HU', 'Words', 'Rewrites the copy so it reads as a person wrote it'],
  ['copyeditor', 'Copyeditor', 'CE', 'Words', 'Checks every claim against the facts; passes or sends back'],
  ['creative-director', 'Creative director', 'CD', 'Look', 'Decides what kind of page each business gets; writes three concepts'],
  ['designer', 'Designer', 'DE', 'Look', 'Builds three mockups, then the site from your pick'],
  ['seo', 'SEO', 'SE', 'Check', 'Makes the site findable on Google and maps'],
  ['aiseo', 'AI SEO', 'AI', 'Check', 'Makes the site quotable by answer engines'],
  ['critic', 'Critic', 'CR', 'Check', 'Scores the built site; passes or sends back'],
  ['visual-critic', 'Visual critic', 'VC', 'Check', 'Judges the page as design, independently'],
  ['experience-critic', 'Experience critic', 'EC', 'Check', 'Walks the page as a traveller, independently'],
  ['deployer', 'Deployer', 'DP', 'Ship', 'Puts the preview online; delivers after a sale'],
  ['writer', 'Writer', 'WR', 'Ship', 'Writes the pitch page and the message you send'],
  ['orchestrator', 'Orchestrator', 'OR', 'Running the line', 'Moves each business along the line and stops at your decisions'],
].map(([id, name, ini, lane, role]) => ({ id, name, ini, lane, role }));
const A = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

const runName = (r) => r.replace(/^\d{4}-\d{2}-/, '').replace('globalsurf', 'global surf').replace(/(^|\s)(\w)/g, (m, s, c) => s + c.toUpperCase()).replace(/-(\d+)$/, ' $1');
const B = D.businesses;
P.setNames(Object.fromEntries(B.map((b) => [b.slug, b.name])));
const firstSentence = (s) => {
  if (!s) return '';
  const t = s.replace(/\s+/g, ' ').trim();
  const m = t.match(/^(.{20,}?[.!?])(\s+(?=[A-Z"“'(])|$)/);
  return m ? m[1] : t;
};

// ---------- §1.3 state rule ----------
function stateOf(back, checked) {
  if (checked < 4) return 'early';
  if (back * 2 >= checked) return 'red';
  if (back * 5 >= checked) return 'amber';
  return 'green';
}
const RANK = { red: 0, amber: 1, green: 2, early: 3, none: 4 };

// ---------- checkpoint 1: your shortlist ----------
// approved = a history line `to: approved`; dropped = its last line goes from approved/harvested back to shortlisted.
const approved = B.filter((b) => b.history.some((h) => h.to === 'approved'));
const shortCells = approved.map((b) => {
  const last = b.history[b.history.length - 1];
  const appr = b.history.find((h) => h.to === 'approved');
  const dropped = (last.from === 'approved' || last.from === 'harvested') && last.to === 'shortlisted';
  return {
    slug: b.slug, run: b.run_id, name: b.name, dropped, by: dropped ? (last.agent === 'human' ? 'you' : last.agent) : null,
    ts: dropped ? last.ts : appr.ts, why: dropped ? P.dropSay(last.note) : null,
    cause: dropped && last.agent !== 'human' ? (/allegation|reputational/i.test(last.note) ? 'risk' : /owner-written copy|prices|taking reservations|booking channel/i.test(last.note) ? 'material' : 'other') : null,
    story: b.history.filter((h) => h.ts >= appr.ts && (h.to === 'approved' || (h.agent === 'harvester' && h.to === 'harvested') || (h.to === 'shortlisted' && h.from !== 'scored') || h.to === 'void'))
      .map((h) => ({ ts: h.ts, agent: h.agent, to: h.to, from: h.from, say: h.to === 'approved' || (h.to === 'shortlisted') || h.to === 'void' ? P.dropSay(h.note) : '' })),
  };
});
const sDropped = shortCells.filter((c) => c.dropped);
const scoutCut = cutOf('scout');
const sSince = shortCells.filter((c) => scoutCut && c.by !== 'you' && approvedTs(c) >= scoutCut);
function approvedTs(c) { return B.find((b) => b.slug === c.slug && b.run_id === c.run).history.find((h) => h.to === 'approved').ts; }
const droppedRuns = [...new Set(sDropped.map((c) => c.run))];
const randomDraws = approved.filter((b) => /random draw/i.test(b.history.find((h) => h.to === 'approved').note)).map((b) => b.name);
const testRun = droppedRuns.length === 1 && B.some((b) => b.run_id === droppedRuns[0] && b.history.some((h) => /mode: test/.test(h.note || '')));

// ---------- the version cut for "since its last change" ----------
function cutOf(agent) {
  const v = D.agents[agent]?.version_changelog;
  if (!v) return null;
  let first = null;
  for (const b of B) for (const h of b.history) if (h.agent === agent && h.v === v && (!first || h.ts < first)) first = h.ts;
  return first;
}

// ---------- checkpoint 2: copy review ----------
const copyRows = [];
for (const b of B) {
  const v = b.history.filter((h) => h.agent === 'copyeditor' && /^copy_(passed|failed)$/.test(h.to));
  if (!v.length) continue;
  const steps = b.history.filter((h) => h.agent === 'human' && h.from === 'copy_failed');
  const marks = [...v.map((h) => ({ k: 'v', ok: h.to === 'copy_passed', ts: h.ts, ...P.copySay(h.note, h.to === 'copy_passed') })), ...steps.map((h) => ({ k: 's', ts: h.ts, ...P.stepSay(h.note) }))]
    .sort((x, y) => x.ts.localeCompare(y.ts) || (x.k === 's' ? 1 : -1));
  copyRows.push({ slug: b.slug, run: b.run_id, name: b.name, marks, back: v.filter((h) => h.to === 'copy_failed').length, total: v.length, steps: steps.length });
}
// ---------- checkpoint 3: your mockup pick ----------
const mockRows = [];
for (const b of B) {
  const v = b.history.filter((h) => h.agent === 'human' && h.from === 'mocked');
  if (!v.length) continue;
  const marks = v.map((h) => ({ k: 'v', ok: h.to === 'picked', ts: h.ts, voided: h.to === 'void', ...P.mockSay(h.note, h.to === 'picked', h.to === 'void') }));
  mockRows.push({ slug: b.slug, run: b.run_id, name: b.name, marks, back: marks.filter((m) => !m.ok).length, total: marks.length, steps: 0, voided: marks.some((m) => m.voided) });
}
// ---------- checkpoint 4: critique ----------
// verdict from critic_series (kind: round). Where data.mjs could not read the verdict (null), it is read from the
// same ledger note ("critic PASS 71.4/80"): data gap, see notes.md.
const critRows = [];
for (const b of B) {
  const rounds = (b.critic_series || []).filter((c) => c.kind === 'round');
  if (!rounds.length) continue;
  const lines = b.history.filter((h) => h.agent === 'critic' && /^critiqued/.test(h.to));
  const steps = b.history.filter((h) => h.agent === 'human' && /^critiqued/.test(h.from || ''));
  const vs = rounds.map((r) => {
    const line = lines.find((h) => h.ts === r.ts);
    let verdict = r.verdict;
    if (!verdict && line) verdict = (line.note.match(/\bcritic (PASS|FAIL)\b/) || line.note.match(/\b(PASS|FAIL)\b/) || [])[1] || null;
    return { k: 'v', ok: verdict === 'PASS', ts: r.ts, score: r.score, ...P.critSay(line?.note || '', verdict === 'PASS', r.score) };
  });
  const marks = [...vs, ...steps.map((h) => ({ k: 's', ts: h.ts, ...P.stepSay(h.note) }))].sort((x, y) => x.ts.localeCompare(y.ts) || (x.k === 's' ? 1 : -1));
  // the critic's report: the path its own note names, else reports/<run>/<slug>.md
  let report = null;
  for (const h of [...lines].reverse()) {
    const m = h.note.match(/reports\/[^\s,;]+?\.(?:\{[^}]*\}[^\s,;]*?\.)?md/);
    if (m) { report = m[0].replace(/\.\{([^,}]+)[^}]*\}/, '.$1'); break; }
  }
  if (!report || !existsSync(join(ROOT, report))) report = existsSync(join(ROOT, `reports/${b.run_id}/${b.slug}.md`)) ? `reports/${b.run_id}/${b.slug}.md` : null;
  critRows.push({ slug: b.slug, run: b.run_id, name: b.name, marks, back: vs.filter((m) => !m.ok).length, own: vs.filter((m) => !m.ok && m.cause === 'build').length, total: vs.length, steps: steps.length });
}
const sortRows = (r) => r.sort((a, b) => b.back - a.back || b.total - a.total || a.name.localeCompare(b.name));
sortRows(copyRows); sortRows(mockRows); sortRows(critRows);
const sum = (rows, k) => rows.reduce((n, r) => n + r[k], 0);

// copy review file: shown only where the file is about this business's run
const copyReviewFor = (slug, run) => {
  const p = `sites/${slug}/copy/review.md`;
  if (!existsSync(join(ROOT, p))) return null;
  // a site folder used by one run is that run's; one shared by two runs (Global Surf) is matched by the run it names
  if (new Set(B.filter((b) => b.slug === slug).map((b) => b.run_id)).size === 1) return p;
  return read(p).slice(0, 1500).includes(run) ? p : null;
};


// since-last-change counts at a checkpoint, for one agent
function since(agent, rows) {
  const cut = cutOf(agent);
  if (!cut) return null;
  let t = 0, back = 0;
  for (const r of rows) for (const m of r.marks) if (m.k === 'v' && m.ts >= cut) { t++; if (!m.ok && m.cause !== 'copy') back++; }
  return { cut, date: D.agents[agent].changelog_date, total: t, back };
}

const CP = [
  { id: 'shortlist', title: 'Your shortlist', line: "You approve the scout's picks; the harvest then shows whether there is enough to build.",
    total: shortCells.filter((c) => c.by !== 'you').length, back: sDropped.filter((c) => c.by !== 'you').length, youDropped: sDropped.filter((c) => c.by === 'you').length,
    verb: 'dropped by the harvester after you approved', made: ['scout'], checked: ['you', 'harvester'] },
  { id: 'copy', title: 'Copy review', line: "The copyeditor checks the copywriter's and humanizer's words against the facts.",
    total: sum(copyRows, 'total'), back: sum(copyRows, 'back'), steps: sum(copyRows, 'steps'), verb: 'sent back', made: ['copywriter', 'humanizer'], checked: ['copyeditor'], rows: copyRows },
  { id: 'mockup', title: 'Your mockup pick', line: "You judge the creative director's concept and the designer's mockups together, by picking one or not.",
    total: sum(mockRows, 'total'), back: sum(mockRows, 'back'), verb: 'without a pick', made: ['creative-director', 'designer'], checked: ['you'], rows: mockRows },
  { id: 'critique', title: 'Critique', line: 'The critic scores the built site, while the visual critic and the experience critic judge it independently.',
    total: sum(critRows, 'total'), back: sum(critRows, 'own'), allBack: sum(critRows, 'back'), steps: sum(critRows, 'steps'), verb: 'sent back for the build itself', made: ['designer'], checked: ['critic', 'visual-critic', 'experience-critic'], rows: critRows },
];
for (const c of CP) c.state = stateOf(c.back, c.total);
const cp = Object.fromEntries(CP.map((c) => [c.id, c]));
// ---------- one plain reason per checkpoint, counted from the notes ----------
{
  const h = sDropped.filter((c) => c.by !== 'you');
  const mat = h.filter((c) => c.cause === 'material').length, risk = h.filter((c) => c.cause === 'risk').length;
  cp.shortlist.reason = `${mat} of the ${h.length} lacked material a site needs (owner-written copy, prices or a way to book)${risk ? `; ${risk} had a warning in its reviews` : ''}. Your own ${cp.shortlist.youDropped} drops don't count against the scout.`;
  const fails = copyRows.flatMap((r) => r.marks.filter((m) => m.k === 'v' && !m.ok));
  const uns = fails.filter((m) => m.cats.uns).length, con = fails.filter((m) => m.cats.con).length, dup = fails.filter((m) => m.cats.dup).length, voice = fails.filter((m) => m.cats.voice).length;
  cp.copy.reason = `Mostly claims with no source in the facts: in ${uns} of the ${fails.length} send-backs. Facts said twice in ${dup}, wording problems in ${voice}, facts contradicted in ${con}.`;
  const no = mockRows.flatMap((r) => r.marks.filter((m) => !m.ok).map((m) => ({ ...m, name: r.name })));
  const rej = no.filter((m) => m.rejected);
  const lastRej = [...rej].sort((a, b) => b.ts.localeCompare(a.ts)).find((m) => m.words && !/trace of this run/.test(m.words));
  cp.mockup.reason = `In ${rej.length} of the ${no.length} you rejected all three mockups.`;
  cp.mockup.quote = lastRej ? { name: lastRej.name, ts: lastRej.ts, words: lastRej.words } : null;
  cp.critique.reason = `${cp.critique.allBack - cp.critique.back} more were sent back for copy facts that had passed copy review. In the critic's own notes those are copy, so they don't count against the designer.`;
}

// ---------- tweaks waiting (proposals[] status pending, matched to agents by name: data gap 10) ----------
const proposalText = {};
const tweaks = D.proposals.filter((p) => p.kind === 'proposal' && p.status === 'pending').map((p, i) => {
  const who = AGENTS.filter((a) => new RegExp(`\\b${a.name}\\b`, 'i').test(p.agent || '')).map((a) => a.id);
  proposalText[p.file] = read(p.file);
  let suggested = null;
  if (p.custom_md) {
    // the suggested replacement text: the blockquote under "Suggested replacement"
    const md = proposalText[p.file];
    const sec = md.split(/^## /m).find((s) => /^Suggested replacement/i.test(s));
    // the quote's hard-wrapped lines are joined into paragraphs (markdown reads them the same way)
    if (sec) suggested = sec.split('\n').filter((l) => /^>/.test(l)).map((l) => l.replace(/^> ?/, '')).join('\n').trim().split(/\n\s*\n/).map((para) => para.replace(/\s*\n\s*/g, ' ')).join('\n\n') + '\n';
  }
  return { id: 't' + i, file: p.file, title: p.title, what: p.what, why: p.why, agents: who, rules: !!p.custom_md, suggested };
});

// ---------- agent files ----------
const FILES = ['base', 'custom', 'CHANGELOG', 'references', 'tools', 'evals'];
const docs = {};
for (const a of AGENTS) for (const f of FILES) {
  const p = `agents/${a.id}/${f}.md`;
  if (existsSync(join(ROOT, p))) docs[`${a.id}/${f}`] = read(p);
}
// History: CHANGELOG entries, sorted newest first (the files are not in date order: data gap 8)
function changelog(md) {
  const out = []; let cur = null; let i = 0;
  for (const line of md.split('\n')) {
    let m;
    if ((m = line.match(/^- \*\*([^*]+)\*\* — (\d{4}-\d{2}-\d{2}) — (.*)$/))) { cur = { v: m[1], date: m[2], text: m[3], i: i++ }; out.push(cur); continue; }
    if ((m = line.match(/^## ([\d.]+) — (\d{4}-\d{2}-\d{2})/))) { cur = { v: m[1], date: m[2], text: '', i: i++ }; out.push(cur); continue; }
    if (cur && /^- /.test(line) && !cur.text) { cur.text = line.slice(2); continue; }
    if (cur && /^\s+\S/.test(line)) cur.text += ' ' + line.trim();
  }
  return out.sort((a, b) => b.date.localeCompare(a.date) || b.i - a.i);
}
// "Last changed": the newest entry's first sentence that says what changed (a bare "Approved by Shahar
// in session." / "From proposal 007 (approved by Shahar)." is provenance, not a change, and is skipped).
const PROV = /^(Approved by Shahar in session( \([^)]*\))?|From proposal \d+ \(approved by Shahar\)|Approved by Shahar)\.$/;
function lastChanged(entries) {
  const e = entries[0];
  if (!e) return null;
  const parts = e.text.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z"“`(*])/);
  let s = parts.find((x) => !PROV.test(x.trim())) || parts[0];
  if (/^Approved by Shahar in session( \([^)]*\))?: /.test(s)) s = s.replace(/^Approved by Shahar in session( \([^)]*\))?: /, 'You: ');
  return { date: e.date };
}
const history = {}; const last = {};
for (const a of AGENTS) { history[a.id] = changelog(docs[`${a.id}/CHANGELOG`] || ''); last[a.id] = lastChanged(history[a.id]); }

// ---------- per agent: state, sentences, rows ----------
const ledgerLines = (agent) => B.reduce((n, b) => n + b.history.filter((h) => h.agent === agent).length, 0);
const day = (iso) => { const d = new Date(iso.length === 10 ? iso + 'T12:00:00Z' : iso); return `${d.getUTCDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()]}`; };
const copyFromCritic = critRows.flatMap((r) => r.marks.filter((m) => m.k === 'v' && !m.ok && m.cause === 'copy')).length;
const critFails = cp.critique.allBack;
const harvested = B.filter((b) => b.history.some((h) => h.agent === 'harvester' && h.to === 'harvested')).length;
const harvests = B.reduce((n, b) => n + b.history.filter((h) => h.agent === 'harvester' && h.to === 'harvested').length, 0);
const audits = B.reduce((n, b) => n + b.history.filter((h) => h.to === 'audited').length, 0);
const pitched = B.filter((b) => b.pitch_sent).length;
const overruled = (D.agents.critic?.third_fail_overrides || []).length;

const per = {};
for (const a of AGENTS) {
  const at = CP.filter((c) => c.made.includes(a.id));
  let state = 'none';
  for (const c of at) if (state === 'none' || RANK[c.state] < RANK[state]) state = c.state;
  const checker = CP.some((c) => c.checked.includes(a.id) && ['copyeditor', 'critic'].includes(a.id));
  per[a.id] = { state, checker, at: at.map((c) => c.id), how: [], shared: null };
}
per.copywriter.shared = 'humanizer'; per.humanizer.shared = 'copywriter';
per['creative-director'].shared = 'designer'; per.designer.shared = 'creative-director';

const sc = since('copywriter', copyRows), sh = since('humanizer', copyRows), scd = since('creative-director', mockRows);
const sdm = since('designer', mockRows), sdb = since('designer', critRows);
const sinceTxt = (s, verb) => s.total ? `Since its last change on ${day(s.date)}: ${s.back} of ${s.total} ${verb}.` : `Not judged since its last change on ${day(s.date)}.`;
const S = (o) => o;
per.scout.how = [
  S({ cp: 'shortlist', own: true, big: `${cp.shortlist.back} of ${cp.shortlist.total}`, t: `of its picks you approved were dropped by the harvester before any copy was written. The ${cp.shortlist.youDropped} you dropped yourself don't count.` }),
  S({ t: droppedRuns.length === 1 ? `All ${sDropped.length} drops, yours included, were in ${runName(droppedRuns[0])}${testRun ? ', a test run' : ''}.${randomDraws.length ? ` ${randomDraws.length === 1 ? 'One approval there is' : randomDraws.length + ' approvals there are'} noted as a random draw.` : ''}` : '' }),
  S({ t: scoutCut ? `Since its last change on ${day(D.agents.scout.changelog_date)}: ${sSince.filter((c) => c.dropped).length} of ${sSince.length} dropped.` : '' }),
];
per.copywriter.how = [
  S({ cp: 'copy', own: true, big: `${cp.copy.back} of ${cp.copy.total}`, t: 'times the copy was sent back, a verdict shared with the humanizer.' }),
  S({ t: `You stepped in ${cp.copy.steps} times.` }), S({ t: sinceTxt(sc, 'sent back') })];
per.humanizer.how = [
  S({ cp: 'copy', own: true, big: `${cp.copy.back} of ${cp.copy.total}`, t: 'times the copy was sent back, a verdict shared with the copywriter.' }),
  S({ t: `You stepped in ${cp.copy.steps} times.` }), S({ t: sinceTxt(sh, 'sent back') })];
per['creative-director'].how = [
  S({ cp: 'mockup', own: true, big: `${cp.mockup.back} of ${cp.mockup.total}`, t: 'mockup decisions ended without a pick, a verdict shared with the designer.' }),
  S({ t: sinceTxt(scd, 'without a pick') })];
per.designer.how = [
  S({ cp: 'mockup', own: true, big: `${cp.mockup.back} of ${cp.mockup.total}`, t: 'mockup decisions ended without a pick (shared with the creative director).' }),
  S({ cp: 'critique', own: true, big: `${cp.critique.back} of ${cp.critique.total}`, t: `builds sent back for the build itself. ${cp.critique.allBack - cp.critique.back} more were copy facts that had passed copy review, and don't count against the designer.` }),
  S({ t: `You stepped in ${cp.critique.steps} times at critique. ${sdm.total + sdb.total ? sinceTxt({ ...sdm, total: sdm.total + sdb.total, back: sdm.back + sdb.back }, 'sent back or not picked') : `Not judged since its last change on ${day(sdm.date)}.`}` })];
per.copyeditor.how = [
  S({ t: "Nothing checks the copyeditor's work, so it has no score of its own." }),
  S({ cp: 'copy', big: `${cp.copy.back} of ${cp.copy.total}`, t: 'times it sent the copy back to the copywriter and humanizer.' }),
  S({ t: `The critic's notes put ${copyFromCritic} of its ${critFails} build send-backs on copy facts that had passed copy review.`, link: 'critique' })];
per.critic.how = [
  S({ t: "Nothing checks the critic's work, so it has no score of its own." }),
  S({ cp: 'critique', big: `${cp.critique.allBack} of ${cp.critique.total}`, t: 'builds it sent back.' }),
  S({ t: `You overruled it ${overruled === 0 ? '0 times' : overruled === 1 ? 'once' : overruled + ' times'}.` })];
for (const id of ['visual-critic', 'experience-critic']) per[id].how = [
  S({ t: `Nothing checks the ${A[id].name.toLowerCase()}'s work yet, so there is no score.` }),
  S({ t: ledgerLines(id) === 0 ? "It is not in the record of work yet: its scores are written inside the critic's notes." : '' })];
per.harvester.how = [S({ t: `Nothing checks the harvester's work yet, so there is no score. It has harvested ${harvested} businesses (${harvests} harvests).` })];
per.auditor.how = [S({ t: `Nothing checks the auditor's work yet, so there is no score. It has made ${audits} audits.` })];
per.writer.how = [S({ t: `Nothing checks the writer's work yet, so there is no score. Your pitch outcomes will judge it once there are some (${pitched} pitched today).` })];
for (const id of ['seo', 'aiseo', 'deployer', 'orchestrator']) per[id].how = [S({ t: `Nothing checks the ${id === 'aiseo' ? 'AI SEO agent' : id === 'seo' ? 'SEO agent' : A[id].name.toLowerCase()}'s work yet, so there is no score.` })];
for (const a of AGENTS) per[a.id].how = per[a.id].how.filter((x) => x.t);
for (const a of AGENTS) { const red = CP.find((c) => c.made.includes(a.id) && c.state === per[a.id].state && c.state === 'red'); per[a.id].reason = red ? red.reason : null; per[a.id].reasonCp = red ? red.id : null; }

const atCheckpoint = AGENTS.filter((a) => CP.some((c) => c.made.includes(a.id)) || ['copyeditor', 'critic'].includes(a.id)).map((a) => a.id);
const notChecked = AGENTS.filter((a) => !atCheckpoint.includes(a.id)).map((a) => a.id);

const redCps = CP.filter((c) => c.state === 'red').length;
const NUM = ['No', 'One', 'Two', 'Three', 'Four'];
const headline = `Work is judged in four places. ${NUM[redCps]} of them ${redCps === 1 ? 'sends' : 'send'} back half or more.`;

// ---------- reader documents (copy reviews, critic reports, suggestions) ----------
const reader = {};
Object.assign(reader, proposalText);

// ---------- sidebar counts (same rules as the current dashboard) ----------
const PITCH_FROM = ['packaged', 'pitched', 'outcome:reply', 'outcome:meeting'];
const seen = new Set();
const pitchSites = B.filter((b) => PITCH_FROM.includes(b.state)).filter((b) => !seen.has(b.slug) && seen.add(b.slug));
const needs = pitchSites.length + tweaks.length + D.gates.filter((g) => g.slug && g.kind !== 'send the pitch').length
  + (D.team?.open_assignments || []).filter((a) => a.to === D.team?.viewer && a.by !== a.to).length;

const DATA = {
  generated_at: D.generated_at, viewer: D.team?.viewer || 'shahar', operators: D.team?.operators || { shahar: 'Shahar' },
  headline, agents: AGENTS, per, last, cp: CP.map((c) => ({ ...c, rows: c.rows?.map((r) => ({ ...r })) })),
  shortCells: shortCells.map((c) => ({ ...c, run: c.run })), dropRuns: droppedRuns.map(runName), randomDraws, testRun,
  scoutSince: scoutCut ? { date: D.agents.scout.changelog_date, total: sSince.length, back: sSince.filter((c) => c.dropped).length } : null,
  since: { copywriter: sc, humanizer: sh, 'creative-director': scd, designer: { mock: sdm, build: sdb } },
  tweaks, notChecked, atCheckpoint, needs, runNames: Object.fromEntries(D.runs.map((r) => [r.run_id, runName(r.run_id)])),
  copyFromCritic, critFails,
};
const DOCS = { docs, history, reader };
const docsGz = gzipSync(Buffer.from(JSON.stringify(DOCS)), { level: 9 }).toString('base64');

const tpl = read('dashboard/agents-04/c/template.html');
const out = tpl.replace('__FONT__', `data:font/woff2;base64,${font}`)
  .replace('__DATA__', () => JSON.stringify(DATA).replace(/</g, '\\u003c'))
  .replace('__DOCS__', () => docsGz);
writeFileSync(join(HERE, 'index.html'), out);

// ---------- a printed check: no jargon left in anything the page shows from the data ----------
{
  const SHOWN = new Set(['say', 'words', 'quotes', 'reason', 't', 'why', 'title', 'what', 'line', 'verb', 'role', 'name', 'headline', 'big', 'dropRuns', 'randomDraws', 'runNames']);
  const hits = [];
  const walk = (o, k) => {
    if (typeof o === 'string') { if (SHOWN.has(k) && P.JARGON.test(o)) hits.push(`${k}: ${o.slice(0, 120)}`); return; }
    if (Array.isArray(o)) o.forEach((x) => walk(x, k));
    else if (o && typeof o === 'object') for (const [kk, v] of Object.entries(o)) walk(v, kk === 'runNames' ? 'runNames' : SHOWN.has(k) && !isNaN(kk) ? k : kk);
  };
  walk(DATA, '');
  console.log('jargon check:', hits.length ? hits : 'clean');
}
// ---------- a printed check of every number the page shows ----------
console.log(headline);
for (const c of CP) console.log(`${c.title}: ${c.back} of ${c.total} ${c.verb} -> ${c.state}${c.steps != null ? ` · you stepped in ${c.steps}` : ''}`);
for (const a of AGENTS) console.log(`  ${a.name.padEnd(18)} ${per[a.id].state.padEnd(6)} ${per[a.id].how.map((h) => (h.big ? h.big + ' ' : '') + h.t).join(' | ')}`);
console.log('tweaks', tweaks.map((t) => `${t.agents.join('+')}: ${t.title}`));
console.log('since', JSON.stringify({ sc, sh, scd, sdm, sdb }));
console.log('not checked', notChecked.length, 'at checkpoint', atCheckpoint.length, '· needs you', needs);
console.log('reader files', Object.keys(reader));
console.log(`index.html ${(out.length / 1024).toFixed(0)} KB (docs gz ${(docsGz.length / 1024).toFixed(0)} KB)`);
