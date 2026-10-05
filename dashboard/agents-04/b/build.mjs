// Builds dashboard/agents-04/b/index.html (direction B "Board") from template.html.
// Embeds Manrope as base64, the health measures computed from dashboard/data.json exactly as
// dashboard/agents-04/concepts.md §1 defines them, and the real text of every agent's files.
// Run from the worktree root, after `node dashboard/data.mjs`:  node dashboard/agents-04/b/build.mjs
// Long reports (copy reviews, critic reports) are NOT embedded: the page reads them from the project
// folder on demand when it is served by dashboard/server.mjs (/files/...).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const D = JSON.parse(readFileSync(join(ROOT, 'dashboard/data.json'), 'utf8'));
const TW = JSON.parse(readFileSync(join(ROOT, 'dashboard/tweaks.json'), 'utf8'));
const font = readFileSync(join(ROOT, 'dashboard/mockups/soft-cards/src/fonts/manrope-latin-wght-normal.woff2')).toString('base64');
const read = (p) => (existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), 'utf8') : null);

// ---------- agents: display names and one-line roles (PLAN.md §4–§5, as concepts.md §1.4 words them) ----------
const AGENTS = [
  ['scout', 'Scout', 'Finds surf businesses and scores how weak their web presence is'],
  ['harvester', 'Harvester', 'Collects facts, photos and video, each with its source'],
  ['auditor', 'Auditor', "Measures the old site's taps to book and sets the target"],
  ['copywriter', 'Copywriter', "Writes the site's words from the facts only"],
  ['humanizer', 'Humanizer', 'Rewrites the copy so it reads as a person wrote it'],
  ['copyeditor', 'Copyeditor', 'Checks every claim against the facts; passes or sends back'],
  ['creative-director', 'Creative director', 'Decides what kind of page each business gets; writes three concepts'],
  ['designer', 'Designer', 'Builds three mockups, then the site from your pick'],
  ['seo', 'SEO', 'Makes the site findable on Google and maps'],
  ['aiseo', 'AI SEO', 'Makes the site quotable by answer engines'],
  ['critic', 'Critic', 'Scores the built site; passes or sends back'],
  ['visual-critic', 'Visual critic', 'Judges the page as design, independently'],
  ['experience-critic', 'Experience critic', 'Walks the page as a traveller, independently'],
  ['deployer', 'Deployer', 'Puts the preview online; delivers after a sale'],
  ['writer', 'Writer', 'Writes the pitch page and the message you send'],
  ['orchestrator', 'Orchestrator', 'Moves each business along the line and stops at your decisions'],
];
const NAME = Object.fromEntries(AGENTS.map(([id, n]) => [id, n]));

const runName = (id) => id.replace(/^\d{4}-\d{2}-/, '').split('-').map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');
const bs = D.businesses;

// "Since its last change": the first ledger line written by the agent at its current version (concepts §1.2).
function cutOf(id) {
  const v = D.agents[id]?.version_changelog; let t = null;
  for (const b of bs) for (const h of b.history) if (h.agent === id && h.v === v && (!t || h.ts < t)) t = h.ts;
  return t;
}

// Ledger notes are written for Claude. Shown to Shahar, they lose file names, field paths and shouting.
function plain(note) {
  if (!note) return '';
  let s = note
    .replace(/^mode: test\s*[—-]\s*/i, '')
    .replace(/\s*\(review\.md[^)]*\)/g, '')
    .replace(/\breview\.md round (\d+)/g, 'Round $1')
    .replace(/\breview\.md\b/g, 'the copy review')
    .replace(/\bsources\.md\b/g, 'the source list')
    .replace(/\bFAIL\b/g, 'sent back').replace(/\bPASS\b/g, 'kept')
    .replace(/\bBLOCK-SCOPED\b/g, 'Block-scoped')
    .replace(/\b(4a|4b|4c|4d|4e|4f|4g)\b/g, (m) => ({ '4a': 'the copywriter', '4b': 'the humanizer', '4c': 'copy review', '4d': 'concepts', '4e': 'mockups', '4f': 'mockup review', '4g': 'the build' }[m]))
    .replace(/\b([a-z]+)([A-Z][a-z]+)?\[(\d+)\]/g, (m, a, b, n) => `${(a + (b ? ' ' + b.toLowerCase() : '')).replace(/ies$/, 'y').replace(/s$/, '')} ${+n + 1}`)
    .replace(/^Station \d+ /, '').replace(/ on the built final\//g, ' on the built site').replace(/ on d1-7\b/g, '')
    .replace(/Shahar picks (INTERACTIVE|UNIQUE|CALM) \('(.+?)'\)/g, (m, k, t) => `the ${k.toLowerCase()} mockup, '${t}'`)
    .replace(/^gate: Shahar picked a COMPOSITE/, 'a composite')
    .replace(/^Gate: no pick\.\s*/, '')
    .replace(/^Shahar approves/, 'You approved')
    .replace(/^Shahar, \d{4}-\d{2}-\d{2}, on /, 'Your notes on ')
    .replace(/\(Shahar-allowed\)/g, '(you allowed it)')
    .replace(/\bShahar allows\b/g, 'You allowed')
    .replace(/^Shahar, standing rule/, 'Your standing rule')
    .replace(/^Shahar on\b/, 'Your answer on')
    .replace(/\bby Shahar\b/g, 'by you')
    .replace(/Shahar( verbatim| at the gate)?:\s*/g, 'You said: ')
    .replace(/\bShahar's\b/g, 'your')
    .replace(/\bShahar\b/g, 'you')
    .replace(/\b([a-z]{3,})[._]([a-z]{3,})(?:_([a-z]{3,}))?\b/g, (m, a, b, c) => (/^(com|net|org|html|json|mjs)$/.test(b) ? m : [a, b, c].filter(Boolean).join(' ')))
    .replace(/`/g, '');
  s = s.trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}
const firstSentence = (s) => sentence1(s).replace(/[;.]$/, '');

// ---------- jargon guard: nothing shown outside an agent's own document may carry file names or internal terms ----------
const JARGON = /`|\b[\w<>-]+\/[\w.<>*-]+\/|\b(tools|agents|schemas|sites|reports|dossier|src|proposals|final|mockups)\/|\b[\w<>-]+\.(md|json|mjs|js|ya?ml|html|png|jpg)\b|\b\d+\.\d+\.\d+\b|\b4[a-g]\b|→|\b(CLS|LCP|JS|WebGL|API|axe|HF-\d|d1-7|HEAD)\b|\w+\[\d*\]|\b[a-z]+_[a-z_]+\b|\b(FAIL|PASS)\b|\bproposal \d+|\bstation\b|\bimg-\d+|\bstock-\d+|\bgate [a-e]\b/i;
const isPlain = (t) => !JARGON.test(t);
function safe(text, fallback) {
  const m = text.match(JARGON); if (!m) return text;
  const cut = text.slice(0, m.index).replace(/[\s,;:(—–-]+$/, '').replace(/\s+\w+$/, (w) => (/^(the|a|an|of|to|in|on|at|for|and|by|with)$/i.test(w.trim()) ? '' : w));
  return cut.length >= 16 ? cut + '…' : fallback;
}
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// What a copy send-back was for, counted from the copyeditor's own note (concepts §1.1 copy review).
function copyCats(note) {
  const n = (re) => { const m = note.match(re); return m ? (/^one$/i.test(m[1]) ? 1 : +m[1]) : 0; };
  const c = {
    unsourced: n(/\b(\d+|One) unsourced/i),
    contradicted: n(/\b(\d+) contradicted/),
    voice: n(/\b(\d+) voice/),
    repeat: /\d+ duplication|FAIL on (completeness|duplication)/.test(note) ? 1 : 0,
    guest: /guest's words[^.]*in the business's voice/.test(note) ? 1 : 0,
  };
  return c;
}
const CAT = {
  unsourced: (k) => plural(k, 'claim with no source', 'claims with no source'),
  contradicted: (k) => plural(k, 'fact that contradicts the sources', 'facts that contradict the sources'),
  voice: (k) => plural(k, 'line that reads machine-written', 'lines that read machine-written'),
  repeat: () => 'a sentence that repeats another',
  guest: () => "one guest's words stated as fact",
};
const catText = (c) => Object.keys(CAT).filter((k) => c[k]).map((k) => CAT[k](c[k])).join(', ');
// Why the harvester dropped an approved business, from its own note.
const DROP = [[/no owner-written copy/i, 'no text written by the owner anywhere'], [/no lesson prices/i, 'no prices published'], [/(not|isn't) taking reservations/i, 'not taking bookings'], [/allegations|complain/i, 'serious complaints in its reviews']];
const dropCat = (note) => (DROP.find(([re]) => re.test(note)) || [null, 'other'])[1];

// ---------- the four checkpoints (concepts §1.1) ----------
const kinds = {}; // key -> { verdicts: [...] }

// 1. Your shortlist: every business with an `approved` line. Dropped = its last line goes from approved or
//    harvested back to shortlisted. Who dropped it is that line's agent.
{
  const v = [];
  for (const b of bs) {
    const ap = b.history.find((h) => h.to === 'approved'); if (!ap) continue;
    const last = b.history[b.history.length - 1];
    const dropped = ['approved', 'harvested'].includes(last.from) && last.to === 'shortlisted';
    const byYou = dropped && last.agent === 'human';
    v.push({
      ts: ap.ts, slug: b.slug, run: b.run_id, name: b.name, bad: dropped && !byYou, excluded: byYou, byYou, steps: 0, cat: dropped && !byYou ? dropCat(last.note) : null,
      when: dropped ? last.ts : ap.ts,
      text: dropped ? (byYou ? `Dropped by you, so not counted against the scout: ${safe(firstSentence(plain(last.note).replace(/^dropped by you:\s*/i, '').replace(/^gate a reversed by you:\s*/i, '')), 'your call')}` : `Dropped by the harvester: ${dropCat(last.note)}`) : 'Approved, and went on past the harvest',
      full: dropped ? safe(plain(last.note), '') : '',
    });
  }
  kinds.shortlist = v;
}

// 2. Copy review: the copyeditor's verdict lines (copy_passed / copy_failed). Step-ins: human lines from
//    copy_failed, attached to the latest copy verdict on the same business before them.
// 4. Critique: critic_series entries of kind `round`. Where a round's verdict is empty, the orchestrator's
//    next line on that business decides it (to `passed` = kept). Step-ins: human lines from critiqued(n).
// 3. Your mockup pick: human lines from `mocked`. to `picked` is a pick; anything else is "no pick".
{
  const copy = [], build = [], mock = [];
  for (const b of bs) {
    const H = b.history;
    for (let i = 0; i < H.length; i++) {
      const h = H[i];
      if (h.agent === 'copyeditor' && (h.to === 'copy_passed' || h.to === 'copy_failed')) {
        const bad = h.to === 'copy_failed'; const cats = bad ? copyCats(h.note) : null;
        const ok = /\b0 unsourced/.test(h.note) && /\b0 contradicted/.test(h.note);
        copy.push({ ts: h.ts, slug: b.slug, run: b.run_id, name: b.name, bad, cats, steps: 0, when: h.ts, text: bad ? `Sent back: ${catText(cats) || 'see the copy review'}` : ok ? 'Kept: no claim without a source, none contradicted' : 'Kept', full: '', stepNotes: [] });
      }
      if (h.agent === 'human' && h.from === 'mocked') {
        const picked = h.to === 'picked';
        const qm = h.note.match(/"([^"]{6,90}?)(?:\.|"| \.\.\.)/); const rej = h.note.match(/rejected as ([^:;.]+)/);
        const quote = !rej && qm && isPlain(qm[1]) ? qm[1] : null; // only Shahar's verbatim words
        let text;
        if (picked) { const k = h.note.match(/picks (INTERACTIVE|UNIQUE|CALM)/); text = k ? `You picked the ${k[1].toLowerCase()} mockup` : /COMPOSITE/.test(h.note) ? 'You picked a mix of all three' : 'You picked one'; }
        else if (rej) text = `Run voided: all three rejected as ${rej[1]}`;
        else if (qm && isPlain(qm[1])) text = `No pick. You said: “${qm[1]}”`;
        else if (/Sent back to station 4d/.test(h.note)) text = 'No pick: sent back for new concepts';
        else { const t = safe(firstSentence(plain(h.note)), 'asked for changes'); text = 'No pick: ' + t.charAt(0).toLowerCase() + t.slice(1); }
        mock.push({ ts: h.ts, slug: b.slug, run: b.run_id, name: b.name, bad: !picked, steps: 0, when: h.ts, text, quote: !picked && quote && /good|far|better|below|bad|worse/i.test(quote) ? quote : null, full: '' });
      }
    }
    for (const c of b.critic_series || []) {
      if (c.kind !== 'round') continue;
      let verdict = c.verdict;
      const line = H.find((h) => h.ts === c.ts && h.to === c.to);
      if (!verdict) { const nx = H.find((h) => h.ts >= c.ts && h.from === c.to); verdict = nx && nx.to === 'passed' ? 'PASS' : nx ? 'FAIL' : null; }
      if (!verdict) continue;
      const note = line?.note || ''; const bad = verdict === 'FAIL';
      // The critic's own words decide whose fault a send-back was: "Hard fail from the passed copy, not the build".
      const copyCaused = bad && /Hard fail from (the passed copy|unchanged copy)/.test(note);
      const alt = note.match(/alt '([^']+)' - the photo shows ([^-]+?) ->/);
      const text = !bad ? `Kept${c.score ? `, scored ${c.score} of 100` : ''}`
        : copyCaused ? `Sent back for copy that had passed copy review, so not counted against the designer${/New defect/.test(note) ? '. The critic also noted one new layout defect' : ''}`
        : alt ? `Sent back: an image description says “${alt[1]}”, but the photo shows ${alt[2].trim()}` : 'Sent back';
      build.push({ ts: c.ts, slug: b.slug, run: b.run_id, name: b.name, bad: bad && !copyCaused, excluded: copyCaused, copyCaused, steps: 0, when: c.ts, score: c.score, text, why: alt ? 'an image description did not match its photo' : null, full: '', stepNotes: [] });
    }
    // step-ins
    for (const h of H) {
      if (h.agent !== 'human' || !h.from) continue;
      const list = h.from === 'copy_failed' ? copy : /^critiqued\(\d+\)$/.test(h.from) ? build : null;
      if (!list) continue;
      const prev = list.filter((x) => x.slug === b.slug && x.run === b.run_id && x.ts <= h.ts).sort((a, z) => a.ts.localeCompare(z.ts)).pop();
      if (prev) { prev.steps++; prev.stepNotes.push({ ts: h.ts, text: safe(firstSentence(plain(h.note)), 'You answered the send-back') }); }
    }
  }
  const byTs = (a, z) => a.ts.localeCompare(z.ts);
  kinds.copy = copy.sort(byTs); kinds.build = build.sort(byTs); kinds.mock = mock.sort(byTs);
  kinds.shortlist.sort(byTs);
}

// Which agent is judged at which checkpoint. "shared" lists the other agent sharing that verdict.
const JUDGED = {
  scout: [{ kind: 'shortlist', label: 'Approved businesses', noun: 'dropped', unit: 'approved businesses', shared: [] }],
  copywriter: [{ kind: 'copy', label: 'Copy reviews', noun: 'sent back', unit: 'copy reviews', shared: ['humanizer'] }],
  humanizer: [{ kind: 'copy', label: 'Copy reviews', noun: 'sent back', unit: 'copy reviews', shared: ['copywriter'] }],
  'creative-director': [{ kind: 'mock', label: 'Mockup rounds', noun: 'no pick', unit: 'mockup decisions', shared: ['designer'] }],
  designer: [
    { kind: 'mock', label: 'Mockups', noun: 'no pick', unit: 'mockup decisions', shared: ['creative-director'] },
    { kind: 'build', label: 'Builds', noun: 'sent back', unit: 'critique rounds', shared: [] },
  ],
};
const CHECKER = { copyeditor: 'copy', critic: 'build' };

// ---------- CHANGELOG: parse, sort newest first (the files are not in date order) ----------
function parseChangelog(md) {
  const out = []; const L = md.split('\n'); let cur = null;
  for (const l of L) {
    let m;
    if ((m = l.match(/^##\s+(\d+\.\d+\.\d+)\s+[—-]\s+(\d{4}-\d{2}-\d{2})/))) { cur = { v: m[1], date: m[2], text: '' }; out.push(cur); continue; }
    if ((m = l.match(/^-\s+\*\*(?:([a-z]+)\.md\s+)?(\d+\.\d+\.\d+)\*\*\s+[—-]\s+(\d{4}-\d{2}-\d{2})\s+[—-]\s+(.*)$/))) { cur = { v: (m[1] ? m[1] + ' ' : '') + m[2], file: m[1] || null, date: m[3], text: m[4] }; out.push(cur); continue; }
    if (cur && l.trim() && !/^#\s/.test(l)) cur.text += (cur.text ? '\n' : '') + l.replace(/^-\s+/, '');
  }
  const vn = (v) => v.split('.').map((x) => x.padStart(4, '0')).join('.');
  const num = (e) => vn(e.v.replace(/^\S+\s/, ''));
  return out.sort((a, z) => z.date.localeCompare(a.date) || (a.file ? 1 : 0) - (z.file ? 1 : 0) || num(z).localeCompare(num(a)));
}
// First sentence, not split inside `code`, quotes or brackets.
function sentence1(s) {
  let tick = false, depth = 0, q = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '`') tick = !tick;
    else if (tick) continue;
    else if (ch === '"') q = !q;
    else if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth = Math.max(0, depth - 1);
    else if (ch === ';' && !q && !depth && i > 20) return s.slice(0, i);
    else if (ch === '.' && !q && !depth && i > 20 && /\s/.test(s[i + 1] || ' ') && /[A-Z"(`]|$/.test(s.slice(i + 1).trimStart()[0] || '')) return s.slice(0, i + 1);
  }
  return s;
}
function lastChangedLine(text) {
  const q = text.match(/^Approved by Shahar in session(?:\s*\([^)]*\))?:\s*"([^"]+)"\s*[—-]/);
  if (q) return `You said: “${q[1]}”`;
  const s = text
    .replace(/^Approved by Shahar in session(\s*\([^)]*\))?(:\s*"[^"]*"\.?|[.:])\s*/, '').replace(/^[—-]\s*/, '')
    .replace(/^[\w/.-]+ \d+\.\d+\.\d+:\s*/i, '')
    .replace(/^From proposal \d+ \([^)]*\)\.\s*/, '')
    .replace(/^Same change:\s*/, '');
  const t = s.replace(/^(4[a-g]|[1-9])\b:?\s*/, (m) => '').replace(/^Shahar, after /, 'After ');
  return sentence1(t.charAt(0).toUpperCase() + t.slice(1)).trim();
}

// ---------- proposals: pending tweaks, matched to agents ----------
const lc = (s) => s.toLowerCase();
const tweaks = [];
for (const p of D.proposals) {
  if (p.status !== 'pending') continue;
  const custom = /your custom\.md/i.test(p.agent) || p.custom_md;
  const ids = p.agent.replace(/\(your custom\.md\)/i, '').split(',').map((x) => lc(x.trim())).map((n) => AGENTS.find(([, name]) => lc(name) === n)?.[0]).filter(Boolean);
  const md = read(p.file) || '';
  let suggested = null;
  if (custom) {
    const sec = md.split(/^## Suggested replacement.*$/m)[1];
    if (sec) suggested = sec.split(/^## /m)[0].split('\n').filter((l) => l.startsWith('>')).map((l) => l.replace(/^>\s?/, '')).join('\n')
      .replace(/([^\n])\n(?!\n)/g, '$1 ').trim() + '\n';
  }
  tweaks.push({ id: p.file.replace(/^proposals\//, '').replace(/\.md$/, ''), agents: ids, title: p.title, what: p.what, why: p.why, custom, md, suggested, run: p.run_id });
}

// ---------- per agent ----------
const latestRun = {}; for (const b of bs) if (!latestRun[b.slug] || b.run_id > latestRun[b.slug]) latestRun[b.slug] = b.run_id;
const files = {};
const agents = AGENTS.map(([id, name, role]) => {
  const dir = `agents/${id}`;
  const f = { base: read(`${dir}/base.md`), custom: read(`${dir}/custom.md`), references: read(`${dir}/references.md`), tools: read(`${dir}/tools.md`), evals: read(`${dir}/evals.md`) };
  files[id] = f;
  const history = parseChangelog(read(`${dir}/CHANGELOG.md`) || '');
  const newest = history[0];
  const lines = bs.reduce((n, b) => n + b.history.filter((h) => h.agent === id).length, 0);
  const a = {
    id, name, role, cut: cutOf(id), checker: CHECKER[id] || null,
    judged: JUDGED[id] || [],
    // Plain words only when the CHANGELOG line has none of the jargon above; otherwise only the date (concepts §7 gap 7).
    changed: newest ? { date: newest.date, line: isPlain(lastChangedLine(newest.text)) ? lastChangedLine(newest.text) : null } : null,
    history,
    customEmpty: !(f.custom || '').split('\n').some((l) => l.trim() && !/^#\s/.test(l)),
    inLedger: lines > 0,
  };
  return a;
});

// facts for the agents nothing checks (counted from the ledger, never estimated)
const facts = {};
{
  const harv = []; for (const b of bs) for (const h of b.history) if (h.agent === 'harvester' && h.to === 'harvested') harv.push(b.slug + '|' + b.run_id);
  facts.harvester = `${harv.length} harvests of ${new Set(harv).size} businesses`;
  const aud = []; for (const b of bs) for (const h of b.history) if (h.agent === 'auditor' && h.to === 'audited') aud.push(b.slug);
  facts.auditor = `Audited ${aud.length} old site${aud.length === 1 ? '' : 's'}`;
  const pitched = bs.filter((b) => b.pitched_at).length;
  facts.writer = pitched ? `${pitched} pitched so far` : 'Your pitch outcomes will judge it once there are some. None pitched yet';
  facts['visual-critic'] = 'Not in the ledger yet: its scores are written inside the critic\'s lines';
  facts['experience-critic'] = 'Not in the ledger yet: its scores are written inside the critic\'s lines';
  facts.critic_overrides = (D.agents.critic.third_fail_overrides || []).length;
}
// what the critic said about copy that had passed review (shown on the copyeditor as the critic's words)
const criticOnCopy = [];
for (const b of bs) for (const h of b.history) {
  if (h.agent !== 'critic' || !/^critiqued/.test(h.to)) continue;
  const m = h.note.match(/Hard fail from (the passed copy|unchanged c[a-z]*)[^.:]*/);
  if (m) criticOnCopy.push({ ts: h.ts, name: b.name, slug: b.slug, run: b.run_id, text: m[0].replace(/re-audited/, 're-checked') });
}

const reports = {};
for (const b of bs) {
  const r = {};
  if (latestRun[b.slug] === b.run_id && existsSync(join(ROOT, `sites/${b.slug}/copy/review.md`))) r.copy = `sites/${b.slug}/copy/review.md`;
  if (existsSync(join(ROOT, `reports/${b.run_id}/${b.slug}.md`))) r.critic = `reports/${b.run_id}/${b.slug}.md`;
  reports[`${b.slug}|${b.run_id}`] = r;
}

const out = {
  generated_at: D.generated_at,
  viewer: D.team.viewer, operators: D.team.operators,
  gates: D.gates.length,
  agents, facts, criticOnCopy, kinds, tweaks, reports,
  runs: Object.fromEntries([...new Set(bs.map((b) => b.run_id))].map((r) => [r, runName(r)])),
  testRuns: D.runs.filter((r) => r.mode === 'test').map((r) => r.run_id),
};

// ---------- sanity: the numbers concepts.md §1.4 states, recomputed ----------
const cnt = (k, since) => { const v = kinds[k].filter((x) => (!since || x.ts >= since) && !x.excluded); return `${v.filter((x) => x.bad).length}/${v.length}`; };
const step = (k) => kinds[k].filter((x) => !x.excluded).reduce((n, x) => n + x.steps, 0);
const c = Object.fromEntries(agents.map((a) => [a.id, a.cut]));
console.log(`shortlist dropped by the harvester ${cnt('shortlist')} (your own ${kinds.shortlist.filter((x) => x.excluded).length} drops not counted); since scout change ${cnt('shortlist', c.scout)}`);
console.log(`copy sent back ${cnt('copy')}, step-ins ${step('copy')}; since copywriter ${cnt('copy', c.copywriter)}; since humanizer ${cnt('copy', c.humanizer)}`);
console.log(`mockups no pick ${cnt('mock')}; since creative director ${cnt('mock', c['creative-director'])}; since designer ${cnt('mock', c.designer)}`);
console.log(`builds sent back ${cnt('build')} (copy-caused, not counted: ${kinds.build.filter((x) => x.excluded).length}), step-ins ${step('build')}; since designer ${cnt('build', c.designer)}`);
console.log(`pending tweaks ${tweaks.length}: ${tweaks.map((t) => t.agents.join('+') + (t.custom ? '(rules)' : '')).join(', ')}`);

const tpl = readFileSync(join(HERE, 'template.html'), 'utf8');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const html = tpl
  .replace('__FONT__', () => `data:font/woff2;base64,${font}`)
  .replace('__DATA__', () => json(out))
  .replace('__FILES__', () => json(files));
writeFileSync(join(HERE, 'index.html'), html);
console.log(`wrote index.html (${Math.round(html.length / 1024)} KB)`);
