// Builds dashboard/overview-03/c/index.html (direction C "Cockpit") from template.html:
// embeds Manrope as base64, the fields the Overview needs from dashboard/data.json, and the real
// pitch drafts from sites/<slug>/pitch/. Run from the worktree root: node dashboard/overview-03/c/build.mjs
// (run `node dashboard/data.mjs` first). No images are copied; thumbnails are referenced by path.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const D = JSON.parse(readFileSync(join(ROOT, 'dashboard/data.json'), 'utf8'));
const font = readFileSync(join(ROOT, 'dashboard/mockups/soft-cards/src/fonts/manrope-latin-wght-normal.woff2')).toString('base64');

// ---------- small markdown → html (headings, lists, bold, links); and → plain text ----------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, '$1')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(https:\/\/[^\s)<]+[^\s)<.,;:])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
const plainInline = (s) => s.replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');

function mdToHtml(md) {
  const L = md.split('\n'); const out = []; let i = 0;
  const isItem = (l) => /^(\d+\.|[-*])\s/.test(l); const isSub = (l) => /^\s{2,}[-*]\s/.test(l);
  while (i < L.length) {
    const l = L[i]; let m;
    if (!l.trim()) { i++; continue; }
    if ((m = l.match(/^#{2,3}\s+(.*)/))) { out.push(`<h4>${inline(m[1])}</h4>`); i++; continue; }
    if (isItem(l)) {
      const tag = /^\d/.test(l) ? 'ol' : 'ul'; let html = `<${tag}>`;
      while (i < L.length && isItem(L[i])) {
        const item = L[i].replace(/^(\d+\.|[-*])\s+/, ''); i++;
        const subs = []; while (i < L.length && isSub(L[i])) { subs.push(L[i].replace(/^\s+[-*]\s+/, '')); i++; }
        html += `<li>${inline(item)}${subs.length ? '<ul>' + subs.map((x) => `<li>${inline(x)}</li>`).join('') + '</ul>' : ''}</li>`;
      }
      out.push(html + `</${tag}>`); continue;
    }
    const para = []; while (i < L.length && L[i].trim() && !/^(#{2,3}\s|\d+\.\s|[-*]\s)/.test(L[i])) { para.push(L[i].trim()); i++; }
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}
function mdToText(md) {
  return md.split('\n').map((l) => {
    let m;
    if ((m = l.match(/^#{2,3}\s+(.*)/))) return plainInline(m[1]);
    return plainInline(l.replace(/^\s{2,}[-*]\s+/, '    • ').replace(/^[-*]\s+/, '• '));
  }).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ---------- drafts ----------
// The message is read from disk. Where a file has a ```text fence, the message is the fenced part;
// where it has --- rules, the message is between them; otherwise the whole file (minus its title).
// Sender notes are re-worded in plain language from the same file (no file names, no jargon).
const NOTES = {
  'global-surf-adventures/message.en.email.md': {
    notes: ['The link to the pitch page is still a placeholder in the text ("[LINK TO THE PROPOSAL PAGE]"), because the pitch page is not online yet. Replace it before sending.'],
    open: true,
  },
  'ka-surf-hostel-and-restaurant/message.en.whatsapp.md': {
    to: '+94 77 374 6053',
    notes: ['This is the phone number on the Google listing. No WhatsApp number is published, so check that it takes WhatsApp before you send.'],
  },
  'the-lavish-haven/message.en.whatsapp.md': {
    to: '+94 76 483 2988',
    notes: ['This is the phone number on the Google listing. No WhatsApp number is published, so check that it has WhatsApp before you send.',
      'Send it as plain text; WhatsApp turns the link into a preview card.'],
  },
};
function readDraft(slug, file) {
  const p = join(ROOT, 'sites', slug, 'pitch', file);
  if (!existsSync(p)) return null;
  const src = readFileSync(p, 'utf8');
  const meta = NOTES[`${slug}/${file}`] || {};
  if (file.startsWith('in-person')) {
    // the whole script is the message; drop its title and the internal-only sentences
    const md = src.replace(/^# .*\n+/, '')
      .replace(/ ?Run is `mode: test`[^.]*\.( Sources: `notes\.md`\.)?/g, '')
      .replace(/ ?Sources: `notes\.md`\./g, '');
    return { kind: 'inperson', html: mdToHtml(md), text: mdToText(md), notes: meta.notes || [] };
  }
  let msg;
  const fence = src.match(/```text\n([\s\S]*?)\n```/);
  if (fence) msg = fence[1];
  else if (/\n---\n/.test(src)) msg = src.split(/\n---\n/)[1];
  else msg = src.replace(/^# .*\n+/, '');
  msg = msg.trim();
  let subject = null;
  const sm = msg.match(/^\*\*Subject:\*\*\s*(.*)\n+/);
  if (sm) { subject = sm[1].trim(); msg = msg.slice(sm[0].length); }
  return { kind: file.includes('email') ? 'email' : 'whatsapp', to: meta.to || null, subject, text: msg.trim(), notes: meta.notes || [], notes_open: !!meta.open };
}

// ---------- sites ready to pitch (every run) ----------
const TYPE = { surf_camp: 'Surf camp', beach_lodging: 'Beach lodging', surf_school: 'Surf school', hostel: 'Hostel' };
const runName = (id) => id.replace(/^\d{4}-\d{2}-/, '').split('-').map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');
const NOT_LIVE = new Set(['global-surf-adventures']); // brief §3: its pitch page returns 404
const gateBy = Object.fromEntries(D.gates.filter((g) => g.slug).map((g) => [g.slug, g]));
const ready = D.businesses.filter((b) => b.pitch?.proposal_url && b.state === 'packaged');
const sites = ready.map((b) => ({
  slug: b.slug, name: b.name, type: TYPE[b.type] || b.type, run_id: b.run_id, run: runName(b.run_id),
  ran_by: b.ran_by?.operator || null,
  days: gateBy[b.slug]?.days ?? b.days_since_change, since: gateBy[b.slug]?.since || b.last_change,
  quality: b.critic_score ?? null, state: b.state,
  preview_url: b.preview_url, proposal_url: b.pitch.proposal_url,
  proposal_live: b.pitch.proposal_live ?? !NOT_LIVE.has(b.slug),
  pitch_sent: b.pitch_sent,
  drafts: {
    email: readDraft(b.slug, 'message.en.email.md'),
    whatsapp: readDraft(b.slug, 'message.en.whatsapp.md'),
    inperson: readDraft(b.slug, 'in-person.en.md'),
  },
})).sort((a, b) => b.days - a.days || a.name.localeCompare(b.name));

// ---------- the chain (same rules as the current dashboard's tiles) ----------
const PITCH_FROM = ['packaged', 'pitched'];
const baseOf = (s) => s.replace(/\(\d+\)$/, '');
const bs = D.businesses;
const chain = {
  building: bs.filter((b) => D.runs.find((r) => r.run_id === b.run_id)?.active && ['pipeline', 'gate'].includes(b.group) && !PITCH_FROM.includes(baseOf(b.state))).length,
  ready: sites.length,
  pitched: bs.filter((b) => b.pitched_at).length,
  replies: bs.filter((b) => b.history.some((h) => h.to === 'outcome:reply' || h.to === 'outcome:meeting')).length,
  clients: bs.filter((b) => b.outcome?.state === 'sale' || ['product_chosen', 'delivered', 'handoff_verified', 'access_revoked'].includes(b.state)).length,
};

const ops = Object.keys(D.team.operators);
const team = ops.map((op) => ({
  op, name: D.team.operators[op],
  ready: sites.filter((s) => s.ran_by === op).length,
  handoffs: (D.team.open_assignments || []).filter((a) => a.to === op).length,
  active_runs: D.runs.filter((r) => r.active && r.operator === op).length,
  any_runs: D.runs.some((r) => r.operator === op) || bs.some((b) => b.ran_by?.operator === op),
}));

const waiting = D.gates.filter((g) => !g.slug).map((g) => ({ name: g.name, kind: g.kind, view: g.target?.view, count: g.target?.proposals?.length ?? null }));

const out = {
  generated_at: D.generated_at,
  viewer: D.team.viewer,
  operators: D.team.operators,
  money: {
    revenues: { accumulated: D.revenues.accumulated, monthly: D.revenues.monthly, entries: D.revenues.entries.length },
    expenses: { accumulated: D.expenses.accumulated, monthly: D.expenses.monthly, entries: D.expenses.entries.length },
  },
  chain, team, waiting,
  handoffs: (D.team.open_assignments || []).map((a) => ({ id: a.id, slug: a.slug, task: a.task, to: a.to, by: a.by, ts: a.ts })),
  sites,
};

const tpl = readFileSync(join(HERE, 'template.html'), 'utf8');
const json = JSON.stringify(out).replace(/</g, '\\u003c');
writeFileSync(join(HERE, 'index.html'), tpl.replace('__FONT__', `data:font/woff2;base64,${font}`).replace('__DATA__', () => json));
console.log(`wrote index.html: ${sites.length} sites, chain ${JSON.stringify(chain)}`);
