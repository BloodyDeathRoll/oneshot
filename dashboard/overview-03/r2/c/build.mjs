// Builds dashboard/overview-03/r2/c/index.html (round 2, direction C "Queue") from template.html.
// Embeds Manrope as base64, the fields the Overview needs from dashboard/data.json, and the real
// pitch drafts from sites/<slug>/pitch/. Run from the worktree root (after `node dashboard/data.mjs`):
//   node dashboard/overview-03/r2/c/build.mjs
// No images are copied: thumbnails are referenced by relative path.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..', '..');
const D = JSON.parse(readFileSync(join(ROOT, 'dashboard/data.json'), 'utf8'));
const font = readFileSync(join(ROOT, 'dashboard/mockups/soft-cards/src/fonts/manrope-latin-wght-normal.woff2')).toString('base64');

// ---------- markdown -> html (headings, lists, bold, links) and -> plain text ----------
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
// The message is the fenced ```text part, else the part between --- rules, else the whole file minus
// its title. Sender notes are the files' own notes re-worded in plain language (no file names, no
// run jargon); each was checked against the file it comes from.
const NOTES = {
  'global-surf-adventures/message.en.email.md': {
    notes: ['The link to the pitch page is still a placeholder in the text ("[LINK TO THE PROPOSAL PAGE]"), because the pitch page is not online yet. Replace it before you send.'],
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

// ---------- sites (every run): ready to send, pitched, replied ----------
const NOT_LIVE = new Set(['global-surf-adventures']); // brief §3: its pitch page returns 404
const gateBy = Object.fromEntries(D.gates.filter((g) => g.slug).map((g) => [g.slug, g]));
const statusFrom = (b) => {
  const s = b.state;
  if (s === 'packaged') return { kind: 'ready' };
  const date = (b.pitched_at || b.last_change || '').slice(0, 10);
  const how = b.pitch_sent?.channel || null;
  if (s === 'pitched') return { kind: 'pitched', date, how };
  if (s === 'outcome:reply') return { kind: 'reply', date, how };
  if (s === 'outcome:meeting') return { kind: 'meeting', date, how };
  if (s === 'outcome:sale') return { kind: 'sale', date, how };
  return null;
};
const seen = new Set();
const sites = D.businesses
  .filter((b) => b.pitch?.proposal_url && statusFrom(b) && !seen.has(b.slug) && seen.add(b.slug))
  .map((b) => ({
    slug: b.slug, name: b.name, run_id: b.run_id, state: b.state,
    ran_by: b.ran_by?.operator || null,
    days: gateBy[b.slug]?.days ?? b.days_since_change,
    preview_url: b.preview_url, proposal_url: b.pitch.proposal_url,
    proposal_live: b.pitch.proposal_live ?? !NOT_LIVE.has(b.slug),
    status: statusFrom(b),
    drafts: {
      email: readDraft(b.slug, 'message.en.email.md'),
      whatsapp: readDraft(b.slug, 'message.en.whatsapp.md'),
      inperson: readDraft(b.slug, 'in-person.en.md'),
    },
  }));

// Being built: past shortlist approval, not yet packaged, across all runs.
const BUILDING = ['approved', 'harvested', 'audited', 'copy_drafted', 'copy_humanised', 'copy_passed', 'copy_failed',
  'concepted', 'mocked', 'picked', 'built', 'optimised', 'ai_optimised', 'critiqued', 'passed', 'failed', 'previewed'];
const building = new Set(D.businesses.filter((b) => BUILDING.includes(b.state.replace(/\(\d+\)$/, ''))).map((b) => b.slug)).size;

// Suggested agent tweaks waiting for a yes or no (the live "Needs you" counts each one).
const tweaks = D.proposals.filter((p) => p.kind === 'proposal' && p.status === 'pending')
  .map((p) => ({ id: p.file.replace(/.*\//, '').replace(/\.md$/, ''), title: p.title, agent: p.agent, what: p.what, why: p.why, custom_md: p.custom_md }));
// Other gates (mockup picks, shortlist approvals) - none today.
const gates = D.gates.filter((g) => g.slug && g.kind !== 'send the pitch').map((g) => ({ slug: g.slug, name: g.name, kind: g.kind, days: g.days }));

// Sidebar counts, computed the way the live dashboard computes them.
const s1 = new Set();
const builtSlugs = new Set(D.businesses.filter((b) => (b.reached || []).some((s) => ['built', 'passed', 'previewed', 'packaged', 'pitched'].includes(s))).map((b) => b.slug));
const nav = {
  ledger: (D.prospects || []).length,
  pipeline: D.businesses.filter((b) => b.state !== 'void' && !s1.has(b.slug) && s1.add(b.slug)).length,
  sites: new Set(D.businesses.filter((b) => ['packaged', 'pitched'].includes(b.state.replace(/^outcome:.*/, 'pitched'))).map((b) => b.slug)).size,
  agents: Object.keys(D.agents).length,
  decisions: D.decisions.filter((d) => builtSlugs.has(d.slug)).length,
};

const out = {
  generated_at: D.generated_at,
  viewer: D.team.viewer,
  operators: D.team.operators,
  money: {
    revenues: { total: Object.values(D.revenues.accumulated || {}).reduce((a, b) => a + (+b || 0), 0), entries: D.revenues.entries.length, monthly: D.revenues.monthly },
    expenses: { total: Object.values(D.expenses.accumulated || {}).reduce((a, b) => a + (+b || 0), 0), entries: D.expenses.entries.length, monthly: D.expenses.monthly },
  },
  building, sites, tweaks, gates, nav,
  handoffs: (D.team.open_assignments || []).map((a) => ({ id: a.id, slug: a.slug, task: a.task, to: a.to, by: a.by, ts: a.ts })),
};

const tpl = readFileSync(join(HERE, 'template.html'), 'utf8');
const json = JSON.stringify(out).replace(/</g, '\\u003c');
writeFileSync(join(HERE, 'index.html'), tpl.replace('__FONT__', `data:font/woff2;base64,${font}`).replace('__DATA__', () => json));
console.log(`wrote index.html: ${sites.length} sites, ${tweaks.length} tweaks, ${gates.length} other gates, building ${building}, nav ${JSON.stringify(nav)}`);
