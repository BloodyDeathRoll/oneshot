// Builds dashboard/overview-03/b/index.html (direction B, "Gallery") from src.html:
// embeds the real fields from dashboard/data.json, the real pitch drafts and the Manrope font.
// Run from the worktree root:  node dashboard/data.mjs && node dashboard/overview-03/b/build.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const D = JSON.parse(readFileSync(join(ROOT, 'dashboard/data.json'), 'utf8'));

// ---- which sites are ready to pitch (same rule as the current Overview) ----
const PITCH_FROM = ['previewed', 'packaged', 'pitched', 'outcome', 'product_chosen', 'delivered', 'handoff_verified', 'access_revoked'];
const baseOf = (s) => (s.startsWith('outcome:') ? 'outcome' : s);
const seen = new Set();
const pitchSites = D.businesses
  .filter((b) => PITCH_FROM.includes(baseOf(b.state)))
  .filter((b) => !seen.has(b.slug) && seen.add(b.slug));

// The static mockup treats Global Surf's pitch page as not online (it returns 404); the other three are live.
const NOT_LIVE = new Set(['global-surf-adventures']);

const TYPE = { beach_lodging: 'Beach lodging', surf_camp: 'Surf camp', surf_school: 'Surf school' };
const runName = (id) => {
  const m = /^\d{4}-\d{2}-(.+)$/.exec(id || '');
  const s = (m ? m[1] : id || '').replace(/-(\d+)$/, ' $1');
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// ---- draft parsing ----
const JARGON = /`|mode: test|gate \(?c\)?|Length:|len\(\)|notes\.md|dossier|Sources|Human sends|\brun is\b|^Run\b|^Channel:/i;
const cleanSentence = (s) => {
  s = s.trim().replace(/^[-–—,;:\s]+/, '').replace(/\s+/g, ' ');
  if (!s) return '';
  s = s.charAt(0).toUpperCase() + s.slice(1);
  if (!/[.!?]$/.test(s)) s += '.';
  return s;
};
function notesFrom(text) {
  // pull out the recipient, then keep only plain-language advice to the sender
  let to = null;
  const m = /(?:To:|, to)\s*(\+\d[\d ]*\d)/.exec(text);
  if (m) to = m[1];
  const parts = [];
  for (const para of text.split(/\n\s*\n/)) {
    const p = para.replace(/^#.*$/gm, '').trim();
    if (!p || /^Length:/i.test(p)) continue; // character counts are for the writer, not the sender
    // parenthetical content after the phone number is advice; keep it whole when clean,
    // else keep only its clean ';' parts
    for (const paren of p.match(/\(([^()]*)\)/g) || []) {
      const inner = paren.slice(1, -1);
      if (!JARGON.test(inner)) { if (inner.trim().length > 12) parts.push(cleanSentence(inner)); continue; }
      for (const seg of inner.split(';')) if (!JARGON.test(seg) && seg.trim().length > 12) parts.push(cleanSentence(seg));
    }
    const noParen = p.replace(/\s*\([^()]*\)/g, '');
    for (const sent of noParen.split(/(?<=[.!?])\s+/)) {
      if (JARGON.test(sent) || /^(To|Channel)\b/i.test(sent.trim()) || sent.trim().length < 12) continue;
      parts.push(cleanSentence(sent));
    }
  }
  return { to, notes: [...new Set(parts.filter(Boolean))] };
}
function parseMessage(raw) {
  raw = raw.replace(/\r/g, '');
  let message, rest = '';
  const fence = /```text\n([\s\S]*?)\n```/.exec(raw);
  const rule = /\n---\n([\s\S]*?)\n---/.exec(raw);
  if (fence) { message = fence[1]; rest = raw.replace(fence[0], '\n\n'); }
  else if (rule) { message = rule[1]; rest = raw.slice(0, rule.index); }
  else message = raw;
  let subject = null;
  const sm = /^\*\*Subject:\*\*\s*(.+)\n/.exec(message);
  if (sm) { subject = sm[1].trim(); message = message.slice(sm[0].length); }
  const { to, notes } = rest ? notesFrom(rest) : { to: null, notes: [] };
  return { subject, to, text: message.trim(), notes };
}
// in-person script: markdown → a small block list (no markdown symbols reach the page)
function parseScript(raw) {
  const lines = raw.replace(/\r/g, '').split('\n');
  const blocks = [];
  let para = [];
  const flush = () => {
    if (!para.length) return;
    const s = para.join(' ');
    const allBold = /^\*\*([^*]+)\*\*$/.exec(s); // a paragraph that is only bold is a heading
    blocks.push(allBold ? { t: 'h', s: allBold[1] } : { t: 'p', s });
    para = [];
  };
  for (const line of lines) {
    if (/^# /.test(line)) { flush(); continue; } // the title repeats the popup title
    let m;
    if ((m = /^#{2,3} (.+)/.exec(line))) { flush(); blocks.push({ t: 'h', s: m[1] }); continue; }
    if ((m = /^(\s*)(\d+)\. (.+)/.exec(line))) { flush(); blocks.push({ t: 'ol', n: +m[2], s: m[3] }); continue; }
    if ((m = /^(\s*)- (.+)/.exec(line))) { flush(); blocks.push({ t: m[1].length ? 'li2' : 'li', s: m[2] }); continue; }
    if (!line.trim()) { flush(); continue; }
    para.push(line.trim());
  }
  flush();
  // drop sender bookkeeping sentences (test mode, source files); keep the rest word for word
  for (const b of blocks) {
    b.s = b.s.split(/(?<=[.!?])\s+/).filter((s) => !/`|mode: test|notes\.md|^Sources/i.test(s)).join(' ');
  }
  return blocks.filter((b) => b.s.trim());
}

const DRAFTS = [
  ['email', 'message.en.email.md', 'Suggested email'],
  ['whatsapp', 'message.en.whatsapp.md', 'Suggested WhatsApp'],
  ['inperson', 'in-person.en.md', 'Suggested in-person script'],
];

const gateBySlug = Object.fromEntries(D.gates.filter((g) => g.slug).map((g) => [g.slug, g]));

const sites = pitchSites.map((b) => {
  const dir = join(ROOT, 'sites', b.slug, 'pitch');
  const drafts = [];
  for (const [kind, file, label] of DRAFTS) {
    const p = join(dir, file);
    if (!existsSync(p)) continue;
    const raw = readFileSync(p, 'utf8');
    drafts.push(kind === 'inperson' ? { kind, label, script: parseScript(raw) } : { kind, label, ...parseMessage(raw) });
  }
  const g = gateBySlug[b.slug];
  const st = baseOf(b.state);
  const status = st === 'packaged' || st === 'previewed' ? 'ready' : st === 'pitched' ? 'pitched' : b.state === 'outcome:sale' ? 'sale' : st === 'outcome' ? 'reply' : 'ready';
  return {
    slug: b.slug,
    name: b.name,
    type: TYPE[b.type] || '',
    run_id: b.run_id,
    run: runName(b.run_id),
    ran_by: b.ran_by,
    status,
    pitched_at: b.pitched_at || null,
    since: g?.since || b.last_change || null,
    days: g?.days ?? b.days_since_change ?? null,
    quality: b.critic_score ?? null,
    preview_url: b.preview_url,
    proposal_url: b.pitch?.proposal_url || null,
    proposal_live: !!b.pitch?.proposal_url && !NOT_LIVE.has(b.slug),
    state: b.state,
    drafts,
  };
});

const activeRuns = new Set(D.runs.filter((r) => r.active).map((r) => r.id || r.run_id));
const bs = D.businesses;
const counts = {
  ready: sites.filter((s) => s.status === 'ready').length,
  pitched: bs.filter((b) => b.pitched_at).length,
  replies: bs.filter((b) => (b.history || []).some((h) => h.to === 'outcome:reply' || h.to === 'outcome:meeting')).length,
  clients: bs.filter((b) => b.outcome?.state === 'sale' || ['product_chosen', 'delivered', 'handoff_verified', 'access_revoked'].includes(b.state)).length,
  building: bs.filter((b) => activeRuns.has(b.run_id) && ['pipeline', 'gate'].includes(b.group) && !PITCH_FROM.includes(baseOf(b.state))).length,
};

const sum = (o) => Object.values(o || {}).reduce((a, v) => a + (typeof v === 'number' ? v : 0), 0);
const money = (book) => ({ total: sum(book?.accumulated), entries: (book?.entries || []).length });

const waiting = D.gates.filter((g) => !g.slug).map((g) => {
  const m = /^(\d+)\s+(.+)$/.exec(g.name || '');
  return { n: m ? +m[1] : null, what: m ? m[2] : g.name, action: g.kind, view: g.target?.view || null };
});

const DATA = {
  generated_at: D.generated_at,
  viewer: D.team.viewer,
  operators: D.team.operators,
  handoffs: (D.team.open_assignments || []).map((a) => ({ slug: a.slug, to: a.to, by: a.by, task: a.task, ts: a.ts, id: a.id })),
  revenues: money(D.revenues),
  expenses: money(D.expenses),
  counts,
  waiting,
  sites,
};

const font = readFileSync(join(ROOT, 'dashboard/mockups/soft-cards/src/fonts/manrope-latin-wght-normal.woff2')).toString('base64');
const src = readFileSync(join(HERE, 'src.html'), 'utf8');
const json = JSON.stringify(DATA).replace(/</g, '\\u003c');
const out = src.replace('__FONT_BASE64__', font).replace('/*__DATA__*/null', json);
writeFileSync(join(HERE, 'index.html'), out);
if (process.argv.includes('--dump')) console.log(JSON.stringify(DATA, null, 1));
console.log(`wrote index.html (${(out.length / 1024).toFixed(0)} KB, ${sites.length} sites)`);
