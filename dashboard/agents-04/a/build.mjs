// Builds dashboard/agents-04/a/index.html (Agents view, direction A "Line") from template.html.
// Embeds Manrope as base64, every health number computed from dashboard/data.json as
// dashboard/agents-04/concepts.md §1 defines it (with the attribution fixes of the critique, round 4),
// and the real text of every agent's files under agents/<name>/.
// Run from the worktree root:  node dashboard/data.mjs && node dashboard/agents-04/a/build.mjs
//
// Plain words: every sentence the page shows outside an agent's own files is either fixed UI copy or
// derived here from the ledger by counting (categories matched in the checkers' notes) and quoting
// (the site copy or your own words, verbatim). The build refuses to write the page if any derived
// sentence still carries a file name, a field path or a ledger code (see JARGON below).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const D = JSON.parse(read('dashboard/data.json'));
const font = readFileSync(join(ROOT, 'dashboard/mockups/soft-cards/src/fonts/manrope-latin-wght-normal.woff2')).toString('base64');

// ---------- agents: names, roles (PLAN.md §4–§5, as written in concepts.md §1.4) ----------
const META = {
  scout: ['Scout', 'Finds surf businesses and scores how weak their web presence is'],
  harvester: ['Harvester', 'Collects facts, photos and video, each with its source'],
  auditor: ['Auditor', 'Measures the old site’s taps to book and sets the target'],
  copywriter: ['Copywriter', 'Writes the site’s words from the facts only'],
  humanizer: ['Humanizer', 'Rewrites the copy so it reads as a person wrote it'],
  copyeditor: ['Copyeditor', 'Checks every claim against the facts; passes or sends back'],
  'creative-director': ['Creative director', 'Decides what kind of page each business gets; writes three concepts'],
  designer: ['Designer', 'Builds three mockups, then the site from your pick'],
  seo: ['SEO', 'Makes the site findable on Google and maps'],
  aiseo: ['AI SEO', 'Makes the site quotable by answer engines'],
  critic: ['Critic', 'Scores the built site; passes or sends back'],
  'visual-critic': ['Visual critic', 'Judges the page as design, independently'],
  'experience-critic': ['Experience critic', 'Walks the page as a traveller, independently'],
  deployer: ['Deployer', 'Puts the preview online; delivers after a sale'],
  writer: ['Writer', 'Writes the pitch page and the message you send'],
  orchestrator: ['Orchestrator', 'Moves each business along this line and stops at your decisions'],
};
const NAMES = Object.keys(META);
if (NAMES.some((n) => !D.agents[n]) || Object.keys(D.agents).length !== 16) throw new Error('agent list changed: update META');

const runName = (id) => id.replace(/^\d{4}-\d{2}-/, '').split('-').map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');
const bizKey = (b) => `${b.run_id}/${b.slug}`;
const B = D.businesses;
const share = (n, of) => (of ? n / of : 0);
const stateOf = (n, of) => (of < 4 ? 'early' : share(n, of) >= 0.5 ? 'red' : share(n, of) >= 0.2 ? 'amber' : 'green');
const RANK = { red: 4, amber: 3, early: 2, green: 1, none: 0 };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dshort = (iso) => { const d = new Date(iso.length === 10 ? iso + 'T12:00:00Z' : iso); return `${d.getUTCDate()} ${MON[d.getUTCMonth()]}`; };
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const times = (n) => (n === 1 ? 'once' : n === 2 ? 'twice' : `${n} times`);
const list = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);

// The cut for "since its last change": the first ledger line written by the agent's current version.
const cutOf = (agent) => {
  const v = D.agents[agent].version_changelog; let first = null;
  for (const b of B) for (const h of b.history) if (h.agent === agent && h.v === v && (!first || h.ts < first)) first = h.ts;
  return first;
};

// ---------- jargon guard: nothing derived may carry these ----------
const JARGON = /[\w-]+\.(md|json|mjs|js|html|ya?ml|png|txt)\b|\b(tools|agents|schemas|sites|reports|dossier|proposals|src)\/|\w\[\d+\]|\bFAILS?\b|\bPASS(ED)?\b(?=[^a-z])|\b[1-8][a-i]\b|copyBlocks|img-\d+|stock-\d+|\bHF-\d|check-places|\bv?\d+\.\d+\.\d+\b|\bmode: test\b|_[a-z]+_|\b[a-z]+_[a-z]+\b/;
const said = []; // every derived string, checked at the end
const plain = (s) => { said.push(s); return s; };

// ---------- quoting: site copy or your own words, verbatim, only when it is clean ----------
const quotes = (note) => [...String(note).matchAll(/"([^"]{6,200})"|“([^”]{6,200})”|(?:^|[\s(])'([^']{6,140})'(?=[\s),.;:]|$)/g)].map((m) => (m[1] || m[2] || m[3]).trim()).filter((q) => !JARGON.test(q) && /[a-z]{3}/.test(q) && !/^s /.test(q));

// =========================================================================================
// Checkpoint 1: your shortlist. Approved businesses the harvester then dropped. Businesses you
// dropped yourself are your own decision and are not counted against the scout (critique, round 4).
// =========================================================================================
const DROP_WHY = [ // what the harvester's note says, in plain words (matched, never paraphrased beyond this)
  [/no owner-written copy/, 'no text written by the owner anywhere'],
  [/no lesson prices/, 'no lesson prices published anywhere'],
  [/isn't taking reservations|not taking reservations/, 'not taking bookings on Booking.com'],
  [/allegations of a USD 600 'board breakage' charge/, 'reviews accuse it of a USD 600 charge for broken boards'],
];
const YOUR_WHY = [
  [/no usable photos and no published material/i, 'no usable photos and nothing published'],
  [/material too thin \(9 low-res IG photos, no prices, 1 review\)/i, 'too little to build from: 9 small Instagram photos, no prices, 1 review'],
  [/Temporarily closed/, 'likely closed: Google says temporarily closed and the newest review is 7 years old'],
  [/dropped from the approved set\. Dossier/, 'you took it off the approved list'],
];
const approved = B.filter((b) => b.history.some((h) => h.to === 'approved')).map((b) => {
  const last = b.history[b.history.length - 1];
  const dropped = last.to === 'shortlisted' && ['approved', 'harvested'].includes(last.from);
  const by = dropped ? (last.agent === 'human' ? 'you' : last.agent) : null;
  const src = `${b.why || ''} ${last.note || ''}`;
  const why = dropped ? ((by === 'you' ? YOUR_WHY : DROP_WHY).find(([re]) => re.test(src)) || [null, null])[1] : null;
  if (dropped && !why) throw new Error(`no plain reason for the drop of ${b.name}: add a pattern`);
  return { key: bizKey(b), name: b.name, run: runName(b.run_id), slug: b.slug, ts: b.history.find((h) => h.to === 'approved').ts, dropped, by, when: dropped ? last.ts : null, why };
});
const byYou = approved.filter((a) => a.by === 'you');
const judged = approved.filter((a) => a.by !== 'you');            // the scout's picks the harvester actually judged
const harvDrops = judged.filter((a) => a.dropped);
const scoutCut = cutOf('scout');
const findSince = judged.filter((a) => a.ts >= scoutCut);
const whyCount = {};
for (const a of harvDrops) whyCount[a.why] = (whyCount[a.why] || 0) + 1;
const whyTop = Object.entries(whyCount).sort((x, y) => y[1] - x[1]);
const material = harvDrops.filter((a) => /owner|prices/.test(a.why)).length;

// =========================================================================================
// Checkpoint 2: copy review. Each copyeditor verdict (to copy_passed / copy_failed); the reasons are the
// categories the copyeditor's note counts (unsourced, contradicted, voice, duplication).
// =========================================================================================
const COPY_CAT = {
  unsourced: 'claims with no source in the facts',
  contradicted: 'claims the facts contradict',
  voice: 'wording that does not read naturally',
  duplication: 'the same fact said twice',
};
function copyCats(note) {
  const n = (re) => { let m, t = 0; const r = new RegExp(re, 'g'); while ((m = r.exec(note))) t = Math.max(t, m[1] === 'One' || m[1] === 'one' ? 1 : +m[1]); return t; };
  const c = { unsourced: n('(\\d+|One|one) unsourced'), contradicted: n('(\\d+) contradicted'), voice: n('(\\d+) voice(?! clean)(?!\\s*\\d)') };
  if (/FAIL on (duplication|completeness)|\d+ duplication/.test(note)) c.duplication = 1;
  return Object.entries(c).filter(([, v]) => v > 0).map(([k]) => k);
}
const copyVerdicts = []; const copySteps = [];
for (const b of B) for (const h of b.history) {
  if (h.agent === 'copyeditor' && (h.to === 'copy_passed' || h.to === 'copy_failed')) {
    const fail = h.to === 'copy_failed';
    const cats = fail ? copyCats(h.note) : [];
    if (fail && !cats.length) throw new Error(`copy send-back without a category: ${b.name} ${h.ts}`);
    copyVerdicts.push({ key: bizKey(b), b, ts: h.ts, fail, cats, note: h.note });
  }
  if (h.agent === 'human' && h.from === 'copy_failed') copySteps.push({ key: bizKey(b), ts: h.ts });
}
for (const b of B.filter((x) => x.copy_rounds)) { // cross-check with data.mjs's own per-business fields
  const v = copyVerdicts.filter((x) => x.key === bizKey(b));
  if (v.length !== b.copy_rounds || v.filter((x) => x.fail).length !== b.copy_fails) throw new Error(`copy count mismatch ${bizKey(b)}`);
}

// =========================================================================================
// Checkpoint 3: your mockup pick. Your lines from `mocked`; `to: picked` is a pick. A no-pick whose words
// reject the work is "rejected"; the rest are rounds that ended without a pick yet.
// =========================================================================================
const REJECT = /no mockup looks good|far below the current site|original is significantly better|far off from the desired/i;
const pickVerdicts = [];
for (const b of B) for (const h of b.history) if (h.agent === 'human' && h.from === 'mocked') {
  const fail = h.to !== 'picked';
  pickVerdicts.push({ key: bizKey(b), b, ts: h.ts, fail, rejected: fail && REJECT.test(h.note), voided: h.to === 'void', quotes: quotes(h.note), note: h.note });
}

// =========================================================================================
// Checkpoint 4: critique. A round with no parsed verdict takes it from the critic's own line. A send-back
// whose hard fail was copy that had passed copy review is not counted against the designer (critique, round 4).
// =========================================================================================
const critVerdicts = []; const critSteps = [];
for (const b of B) {
  for (const c of (b.critic_series || []).filter((x) => x.kind === 'round')) {
    const line = b.history.find((h) => h.ts === c.ts && h.agent === 'critic' && h.to === c.to);
    let verdict = c.verdict;
    if (!verdict && line) verdict = /\bcritic PASS\b|^[^.]*: PASS\b/.test(line.note) ? 'PASS' : /\bFAIL\b/.test(line.note) ? 'FAIL' : null;
    if (!verdict) throw new Error(`critique round without verdict ${bizKey(b)} ${c.ts}`);
    const note = line?.note || '';
    const fail = verdict === 'FAIL';
    const copy = fail && /Hard fail from (the passed|unchanged) copy/.test(note);
    let why = null;
    if (copy) why = 'copy that had passed copy review';
    else if (fail) { const m = note.match(/alt '([^']+)' - the photo shows ([^.;]+?)(?:\s*->.*)?(?=[.;])/); why = m ? `a photo described as “${m[1]}”, but it shows ${m[2].trim()}` : null; }
    if (fail && !why) throw new Error(`no plain reason for critique send-back ${b.name} ${c.ts}`);
    critVerdicts.push({ key: bizKey(b), b, ts: c.ts, fail, copy, why, quotes: copy ? quotes(note.split(/Build:|New defect:/)[0]) : [] });
  }
  for (const h of b.history) if (h.agent === 'human' && /^critiqued/.test(h.from || '')) critSteps.push({ key: bizKey(b), ts: h.ts });
}

// ---------- per-business rows, with a verdict sequence (k = kept, s = sent back, c = sent back for copy) ----------
function groupBy(verdicts, steps = []) {
  const m = new Map();
  for (const v of verdicts.slice().sort((a, b) => a.ts.localeCompare(b.ts))) {
    if (!m.has(v.key)) m.set(v.key, { key: v.key, name: v.b.name, run: runName(v.b.run_id), slug: v.b.slug, n: 0, of: 0, seq: [], fails: [], steps: 0, voided: false });
    const g = m.get(v.key); g.of++; g.seq.push(v.fail ? (v.copy ? 'c' : 's') : 'k');
    if (v.fail) { g.n++; g.fails.push(v); g.last = v.ts; } if (v.voided) g.voided = true;
  }
  for (const s of steps) if (m.has(s.key)) m.get(s.key).steps++;
  return [...m.values()].sort((a, b) => b.n - a.n || b.of - a.of || a.name.localeCompare(b.name));
}
const since = (verdicts, agent, count = (v) => v.fail) => { const cut = cutOf(agent); const v = verdicts.filter((x) => cut && x.ts >= cut); return { n: v.filter(count).length, of: v.length, cut_label: dshort(D.agents[agent].changelog_date) }; };

const cp = {};
{ // Find
  const n = harvDrops.length, of = judged.length;
  cp.find = {
    id: 'find', title: 'Your shortlist', makers: ['scout'], checker: 'harvester', n, of, state: stateOf(n, of),
    chip: `Dropped ${n} of ${of}`,
    reason: plain(material ? `${material} had no owner text or prices` : `${whyTop[0][1]} ${whyTop[0][0]}`),
    rows: harvDrops.map((a) => ({ key: a.key, name: a.name, run: a.run, slug: a.slug, seq: ['s'], label: 'Dropped by the harvester', when: dshort(a.when), note: plain(cap(a.why) + '.') })),
    yours: byYou.map((a) => ({ key: a.key, name: a.name, run: a.run, slug: a.slug, when: dshort(a.when), note: plain(cap(a.why) + '.') })),
    kept: approved.filter((a) => !a.dropped).map((a) => a.name),
    since_scout: { n: findSince.filter((a) => a.dropped).length, of: findSince.length, cut_label: dshort(D.agents.scout.changelog_date) },
    sub: plain(`Of the ${of} businesses you approved and kept, the harvester dropped ${n} before any copy was written. You dropped ${byYou.length} more yourself; those don’t count against the scout.`),
    tip: plain(`The harvester dropped ${n} of the scout’s ${of} picks: ${list(whyTop.map(([w, k]) => `${k} for ${w}`))}. Your own ${byYou.length} drops are not counted.`),
  };
}
{ // Words
  const g = groupBy(copyVerdicts, copySteps);
  const fails = copyVerdicts.filter((v) => v.fail);
  const catN = Object.fromEntries(Object.keys(COPY_CAT).map((k) => [k, fails.filter((v) => v.cats.includes(k)).length]));
  const topCat = Object.entries(catN).sort((a, b) => b[1] - a[1])[0];
  cp.words = {
    id: 'words', title: 'Copy review', makers: ['copywriter', 'humanizer'], checker: 'copyeditor',
    n: fails.length, of: copyVerdicts.length, steps: copySteps.length, state: stateOf(fails.length, copyVerdicts.length),
    chip: `Sent back ${fails.length} of ${copyVerdicts.length}`,
    reason: plain(`${topCat[1]} of the ${fails.length} for ${COPY_CAT[topCat[0]]}`),
    cats: Object.entries(catN).filter(([, k]) => k).map(([k, v]) => [COPY_CAT[k], v]),
    rows: g.filter((x) => x.n).map((x) => {
      const c = {}; for (const f of x.fails) for (const k of f.cats) c[k] = (c[k] || 0) + 1;
      const q = quotes(x.fails[x.fails.length - 1].note)[0];
      const what = Object.entries(c).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${COPY_CAT[k]} (${v === 1 ? "once" : `${v} times`})`);
      return { key: x.key, name: x.name, run: x.run, slug: x.slug, seq: x.seq, label: `Sent back ${x.n} of ${x.of}`, when: dshort(x.last), note: plain(`${cap(list(what))}.${q ? ` Latest example: “${q}”` : ''}`), steps: x.steps };
    }),
    kept: g.filter((x) => !x.n).map((x) => x.name),
    steps_by: g.filter((x) => x.steps).map((x) => [x.name, x.steps]),
    since: { copywriter: since(copyVerdicts, 'copywriter'), humanizer: since(copyVerdicts, 'humanizer') },
    sub: plain(`The copyeditor sent the copywriter’s and humanizer’s words back ${fails.length} times in ${copyVerdicts.length} checks. You stepped in ${copySteps.length} times.`),
    tip: plain(`${list(Object.entries(catN).filter(([, k]) => k).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v} for ${COPY_CAT[k]}`))}. A send-back can have more than one reason.`),
  };
}
{ // Look
  const g = groupBy(pickVerdicts);
  const fails = pickVerdicts.filter((v) => v.fail); const rej = fails.filter((v) => v.rejected).length;
  cp.look = {
    id: 'look', title: 'Your mockup pick', makers: ['creative-director', 'designer'], checker: 'you', n: fails.length, of: pickVerdicts.length,
    state: stateOf(fails.length, pickVerdicts.length), picks: pickVerdicts.length - fails.length, rejected: rej,
    chip: `No pick ${fails.length} of ${pickVerdicts.length}`,
    reason: plain(`${rej} rejected outright, ${fails.length - rej} more rounds before a pick`),
    rows: g.filter((x) => x.n).map((x) => {
      const qs = [...x.fails.filter((f) => f.rejected), ...x.fails.filter((f) => !f.rejected)].flatMap((f) => f.quotes.slice(0, 1)).slice(0, 2);
      return { key: x.key, name: x.name, run: x.run, slug: x.slug, seq: x.seq, label: `No pick ${x.n} of ${x.of}${x.voided ? ' · run voided' : ''}`, when: dshort(x.last), note: plain(qs.length ? `You said: ${qs.map((q) => `“${q}”`).join(' · ')}` : 'No reason is on record.') };
    }),
    kept: g.filter((x) => !x.n).map((x) => x.name),
    since: { 'creative-director': since(pickVerdicts, 'creative-director'), designer: since(pickVerdicts, 'designer') },
    sub: plain(`You picked ${pickVerdicts.length - fails.length} times in ${pickVerdicts.length} decisions on the creative director’s and designer’s mockups. ${rej} of the ${fails.length} without a pick were rejections in your words; the others were rework before a pick.`),
    tip: plain(`${rej} times you rejected the mockups outright; ${fails.length - rej} more rounds ended without a pick yet. Shared by the creative director and the designer.`),
  };
}
{ // Check
  const g = groupBy(critVerdicts, critSteps);
  const fails = critVerdicts.filter((v) => v.fail); const copy = fails.filter((v) => v.copy).length; const own = fails.length - copy;
  cp.check = {
    id: 'check', title: 'Critique', makers: ['designer'], checker: 'critic', n: fails.length, of: critVerdicts.length, own, copy,
    steps: critSteps.length, state: stateOf(own, critVerdicts.length),
    chip: `Sent back ${fails.length} of ${critVerdicts.length}`,
    reason: plain(`${copy} for copy facts, ${own} for the build`),
    rows: g.filter((x) => x.n).map((x) => {
      const parts = x.fails.map((f) => f.why); const uniq = [...new Set(parts)];
      const q = x.fails.flatMap((f) => f.quotes)[0];
      return { key: x.key, name: x.name, run: x.run, slug: x.slug, seq: x.seq, label: `Sent back ${x.n} of ${x.of}`, when: dshort(x.last), note: plain(`${cap(list(uniq.map((u) => `${u}${parts.filter((p) => p === u).length > 1 ? ` (${times(parts.filter((p) => p === u).length)})` : ''}`)))}.${q ? ` For example: “${q}”` : ''}`) };
    }),
    kept: g.filter((x) => !x.n).map((x) => x.name),
    steps_by: g.filter((x) => x.steps).map((x) => [x.name, x.steps]),
    since: { designer: since(critVerdicts, 'designer', (v) => v.fail && !v.copy) },
    sub: plain(`The critic sent the built site back ${fails.length} times in ${critVerdicts.length} rounds. ${copy} of those were copy that had passed copy review, so they count against the copy, not the designer. You stepped in ${critSteps.length} times.`),
    tip: plain(`${copy} of the ${fails.length} send-backs were copy facts that had passed copy review; ${own} was about the build itself. Only that one counts against the designer.`),
  };
}
for (const c of Object.values(cp)) c.width = Math.min(8, 2 + (c.id === 'check' ? c.own : c.n) / 2);

// =========================================================================================
// Agents
// =========================================================================================
const pendingTweaks = D.proposals.filter((p) => p.kind === 'proposal' && p.status === 'pending');
const tweakAgents = (p) => String(p.agent || '').replace(/\(your custom\.md\)/i, '').split(/,|\band\b/).map((s) => s.trim().toLowerCase()).filter(Boolean)
  .map((s) => NAMES.find((n) => META[n][0].toLowerCase() === s)).filter(Boolean);
function suggestedRules(md) { // the whole-file replacement quoted in a custom.md proposal, unwrapped
  const part = md.split(/^## Suggested replacement.*$/m)[1]; if (!part) return null;
  const quote = part.split(/^## /m)[0].split('\n').filter((l) => l.startsWith('>')).map((l) => l.replace(/^>\s?/, ''));
  return quote.join('\n').split(/\n\s*\n/).map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean).join('\n\n') + '\n';
}
const tweaks = pendingTweaks.map((p, i) => ({
  id: `t${i + 1}`, agents: tweakAgents(p), title: plain(p.title), what: plain(p.what), why: plain(p.why), custom: !!p.custom_md,
  rules: p.custom_md ? suggestedRules(read(p.file)) : null,
}));

const touched = (agent) => new Set(B.flatMap((b) => b.history.filter((h) => h.agent === agent).map(() => bizKey(b)))).size;
const pitched = B.filter((b) => b.pitched_at).length;

const A = {};
for (const name of NAMES) {
  const [label, role] = META[name];
  const kinds = Object.values(cp).filter((c) => c.makers.includes(name)).map((c) => c.id);
  const kindState = (k) => cp[k].state;
  const state = kinds.length ? kinds.map(kindState).sort((a, b) => RANK[b] - RANK[a])[0] : 'none';
  const shared = kinds.filter((k) => cp[k].makers.length > 1).map((k) => ({ cp: k, with: cp[k].makers.find((m) => m !== name) }));
  const checker = name === 'copyeditor' ? 'words' : name === 'critic' ? 'check' : null;
  const files = {};
  for (const f of ['base', 'custom', 'CHANGELOG', 'references', 'tools', 'evals']) { const p = `agents/${name}/${f}.md`; files[f] = existsSync(join(ROOT, p)) ? read(p) : ''; }
  const lc = /^(SEO|AI SEO)$/.test(label) ? `${label} agent` : label.toLowerCase();
  const tiles = []; const lines = []; let why = null;
  const sinceTile = (s, verb) => ({ big: s.of ? `${s.n} of ${s.of}` : '–', label: s.of ? `${verb} since its last change on ${s.cut_label}` : `nothing judged since its last change on ${s.cut_label}`, state: s.of ? stateOf(s.n, s.of) : 'plain' });
  if (name === 'scout') {
    const c = cp.find;
    why = `The harvester dropped ${c.n} of its ${c.of} picks: ${c.reason}.`;
    tiles.push({ big: `${c.n} of ${c.of}`, label: 'picks the harvester dropped before any copy was written', state: c.state });
    tiles.push({ big: String(byYou.length), label: 'more you dropped yourself (not counted)', state: 'plain' });
    tiles.push(sinceTile(c.since_scout, 'dropped'));
    lines.push(`The harvester’s reasons: ${list(whyTop.map(([w, k]) => `${w} (${k})`))}.`);
    lines.push(`All ${approved.filter((a) => a.dropped).length} drops were in ${[...new Set(approved.filter((a) => a.dropped).map((a) => a.run))].join(', ')}, a test run. Since its last change it has been judged only ${c.since_scout.of} times, too few to judge.`);
  } else if (name === 'copywriter' || name === 'humanizer') {
    const c = cp.words; const s = c.since[name]; const other = name === 'copywriter' ? 'humanizer' : 'copywriter';
    why = `Copy sent back ${c.n} of ${c.of} times: ${c.reason}.`;
    tiles.push({ big: `${c.n} of ${c.of}`, label: 'times the copy was sent back', state: c.state });
    tiles.push({ big: String(c.steps), label: 'times you stepped in', state: 'plain' });
    tiles.push(sinceTile(s, 'sent back'));
    lines.push(`Why: ${list(c.cats.sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} (${v})`))}. One send-back can have several reasons.`);
    lines.push(`The copyeditor sends the words back to the copywriter and the humanizer together, so this is one verdict shared with the ${other}.`);
    lines.push(`The critic later sent a built site back ${times(cp.check.copy)} over copy that had passed copy review.`);
  } else if (name === 'creative-director') {
    const c = cp.look;
    why = `No pick in ${c.n} of ${c.of} mockup decisions: ${c.reason}.`;
    tiles.push({ big: `${c.n} of ${c.of}`, label: 'mockup decisions ended without a pick', state: c.state });
    tiles.push({ big: String(c.rejected), label: 'of those you rejected outright', state: 'plain' });
    tiles.push(sinceTile(c.since[name], 'without a pick'));
    lines.push(`Your pick judges the concept and the mockups together, so this verdict is shared with the designer.`);
  } else if (name === 'designer') {
    const l = cp.look; const k = cp.check;
    why = `No pick in ${l.n} of ${l.of} mockup decisions: ${l.reason}. Its builds are fine.`;
    tiles.push({ big: `${l.n} of ${l.of}`, label: 'mockup decisions ended without a pick (shared with the creative director)', state: l.state });
    tiles.push({ big: `${k.own} of ${k.of}`, label: `built-site rounds sent back for the build (${k.copy} more for copy)`, state: k.state });
    tiles.push({ big: String(k.steps), label: 'times you stepped in at critique', state: 'plain' });
    lines.push(`Its state is the worse of the two: mockups ${l.state === 'red' ? 'need fixing' : 'are fine'}, builds ${k.state === 'green' ? 'are doing fine' : k.state === 'amber' ? 'are on watch' : 'need fixing'}.`);
    lines.push(`Nothing it made has been judged since its last change on ${dshort(D.agents.designer.changelog_date)}.`);
  } else if (name === 'copyeditor') {
    const c = cp.words;
    lines.push(`Nothing checks the copyeditor’s work yet, so there is no score.`);
    lines.push(`It sent the copy back ${c.n} of ${c.of} times. These are its verdicts on the copywriter and humanizer, not its own failures.`);
    lines.push(`The critic later sent a built site back ${times(cp.check.copy)} over copy the copyeditor had passed.`);
  } else if (name === 'critic') {
    const c = cp.check;
    lines.push(`Nothing checks the critic’s work yet, so there is no score.`);
    lines.push(`It sent built sites back ${c.n} of ${c.of} times, ${c.copy} of them over copy. You overruled it ${D.agents.critic.third_fail_overrides.length} times.`);
  } else if (name === 'visual-critic' || name === 'experience-critic') {
    lines.push(`Nothing checks the ${lc}’s work yet, so there is no score.`);
    lines.push(touched(name) ? `It has worked on ${touched(name)} businesses.` : `It has no entries of its own in the Ledger: its scores are written inside the critic’s.`);
  } else if (name === 'writer') {
    lines.push(`Nothing checks the writer’s work yet, so there is no score.`);
    lines.push(pitched ? `${pitched} pitches sent so far.` : `Your pitch outcomes will judge it once there are some. No pitch has been sent yet.`);
  } else if (name === 'orchestrator') {
    lines.push(`Nothing checks the orchestrator’s work yet, so there is no score. It is the frame of the line rather than a step on it.`);
    lines.push(`It has moved ${touched(name)} businesses along the line.`);
  } else {
    lines.push(`Nothing checks the ${lc}’s work yet, so there is no score.`);
    lines.push(`It has worked on ${touched(name)} ${touched(name) === 1 ? 'business' : 'businesses'}.`);
  }
  for (const t of tiles) plain(t.label); for (const l of lines) plain(l); if (why) plain(why);
  const a = D.agents[name];
  A[name] = {
    name, label, role, state, kinds, shared, checker, why,
    tip: plain(why || (checker ? lines[1] : lines.join(' '))),
    tiles, lines,
    // "Last changed": the CHANGELOG lines are written for Claude, so the page shows only the date and version
    // and links to the history (critique, round 4).
    changed: { label: dshort(a.changelog_date), version: a.version_changelog },
    files,
    tweaks: tweaks.filter((t) => t.agents.includes(name)).map((t) => t.id),
  };
}

const states = Object.values(A).reduce((m, a) => ((m[a.state] = (m[a.state] || 0) + 1), m), {});
const reds = Object.values(A).filter((a) => a.state === 'red');
const sentence = plain(`${reds.length} agents need fixing; the line bounces most at copy review and at your mockup pick. ${states.none || 0} of the ${NAMES.length} have nothing checking their work yet.`);
// "most": the two red checkpoints with the most send-backs (count, not share)
const top2 = Object.values(cp).filter((c) => c.state === 'red').sort((a, b) => b.n - a.n).slice(0, 2).map((c) => c.id);
if (top2.join() !== 'words,look') throw new Error(`header sentence names the wrong checkpoints: ${top2}`);

// ---------- jargon check over everything derived ----------
for (const c of Object.values(cp)) { for (const r of [...c.rows, ...(c.yours || [])]) plain(r.note); plain(c.chip); }
const bad = said.filter((s) => s && JARGON.test(s));
if (bad.length) throw new Error('jargon in derived text:\n' + bad.map((s) => `  ${s}  <<${s.match(JARGON)[0]}>>`).join('\n'));

const out = { generated_at: D.generated_at, viewer: D.team.viewer, operators: D.team.operators, sentence, states, cp, agents: A, tweaks };
const tpl = readFileSync(join(HERE, 'template.html'), 'utf8');
const LS = new RegExp('[' + String.fromCharCode(0x2028, 0x2029) + ']', 'g');
const json = JSON.stringify(out).replace(/</g, '\\u003c').replace(LS, (c) => '\\u' + c.charCodeAt(0).toString(16));
writeFileSync(join(HERE, 'index.html'), tpl.replace('__FONT__', () => `data:font/woff2;base64,${font}`).replace('__DATA__', () => json));
const sum = Object.values(cp).map((c) => `${c.id} ${c.id === 'check' ? `${c.own}(+${c.copy} copy)` : c.n}/${c.of} ${c.state} — ${c.reason}`).join('\n  ');
console.log(`wrote index.html (${Math.round(readFileSync(join(HERE, 'index.html')).length / 1024)} KB); states ${JSON.stringify(states)}; tweaks ${tweaks.length}\n  ${sum}`);
console.log(sentence);
