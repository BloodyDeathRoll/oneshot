#!/usr/bin/env node
// Builds dashboard/overview-03/r3/b/index.html (round 3, option B) from template.html:
// embeds the fields the Overview needs from dashboard/data.json, the real pitch drafts from
// sites/<slug>/pitch/, and Manrope as a base64 @font-face. Run `node dashboard/data.mjs` first.
// Started from the round-2 B build; draft parsing is round-1 A's (dashboard/overview-03/a/build.mjs), unchanged.
// Usage (from the repo root): node dashboard/overview-03/r3/b/build.mjs [--dump]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..', '..', '..');
const D = JSON.parse(readFileSync(join(root, 'dashboard/data.json'), 'utf8'));

// ---- which sites are on the Overview: same rule as the current dashboard (pitchSites) ----
const PITCH_FROM = ['previewed', 'packaged', 'pitched', 'outcome', 'product_chosen', 'delivered', 'handoff_verified', 'access_revoked'];
const baseOf = s => (s.startsWith('outcome:') ? 'outcome' : s);
const seen = new Set();
const ps = D.businesses
  .filter(b => PITCH_FROM.includes(baseOf(b.state)))
  .filter(b => !seen.has(b.slug) && seen.add(b.slug));

// ---- the 100,000-ft counts, same rules as the current dashboard (renderTiles) ----
const bs = D.businesses;
const kpis = {
  building: bs.filter(b => D.runs.find(r => r.run_id === b.run_id)?.active && ['pipeline', 'gate'].includes(b.group) && !PITCH_FROM.includes(baseOf(b.state))).length,
  ready: ps.filter(b => b.state === 'packaged').length,
  pitched: bs.filter(b => b.pitched_at).length,
  replies: bs.filter(b => (b.history || []).some(h => h.to === 'outcome:reply' || h.to === 'outcome:meeting')).length,
  clients: bs.filter(b => b.outcome?.state === 'sale' || ['product_chosen', 'delivered', 'handoff_verified', 'access_revoked'].includes(b.state)).length,
};

// ---- drafts: the message, and the sender notes cleaned of file names, markdown and internal words ----
const JARGON = /`|\.md\b|gate \(c\)|gate c\b|mode: test|^length:|len\(\)|dossier|sources for every claim|^sources:|^channel:|^limit \d+/i;
const stripMd = s => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/^#+\s*/gm, '').trim();
const sentences = t => t.replace(/\n+/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z(])/).map(s => s.trim()).filter(Boolean);
function cleanNotes(t) {
  const out = [];
  // "To: +94 … (why this number)." / "Channel: WhatsApp, to +94 … (why)." -> keep only the why
  t = t.replace(/dossier `[^`]+`,\s*/g, '').replace(/^(?:To:|Channel:)[^\n(]*\(([^)]*)\)\.?/gim, (m, why) => why[0].toUpperCase() + why.slice(1) + '.');
  for (const para of t.split(/\n{2,}/)) {
    for (const s of sentences(para)) {
      if (/^#\s/.test(s)) continue;
      if (/^---$/.test(s)) continue;
      if (JARGON.test(s)) continue;
      out.push(stripMd(s));
    }
  }
  return out;
}
function recipient(t) {
  const m = t.match(/\bto:?\s+(\+\d[\d ]{6,}\d)/i);
  return m ? m[1] : null;
}
// in-person scripts: keep the structure (headings, lists, bold), drop sentences that name files or test mode
function cleanScript(t) {
  return t
    .replace(/^# .*\n+/, '')
    .split('\n')
    .map(line => line.split(/(?<=[.!?:])\s+(?=[A-Z(])/).filter(s => !JARGON.test(s) || /^\s*[-\d]/.test(s) && !/`/.test(s)).join(' '))
    .filter((l, i, a) => !(l.trim() === '' && (a[i - 1] || '').trim() === ''))
    .join('\n')
    .trim();
}
function parseDraft(slug, file) {
  const p = join(root, 'sites', slug, 'pitch', file);
  if (!existsSync(p)) return null;
  const t = readFileSync(p, 'utf8').replace(/\r/g, '');
  const kind = /email/.test(file) ? 'email' : /whatsapp/.test(file) ? 'whatsapp' : 'inperson';
  const label = { email: 'Suggested email', whatsapp: 'Suggested WhatsApp', inperson: 'Suggested in-person script' }[kind];
  let message, notes = [], subject = null, to = null;
  const fence = t.match(/```(?:text)?\n([\s\S]*?)\n```/);
  const rules = t.match(/\n---\n([\s\S]*?)\n---\s*(\n|$)/);
  if (fence) {
    message = fence[1].trim();
    const rest = t.replace(fence[0], '');
    to = recipient(rest);
    notes = cleanNotes(rest);
  } else if (rules && kind !== 'inperson') {
    message = rules[1].trim();
    const rest = t.replace(rules[0], '\n');
    to = recipient(rest);
    notes = cleanNotes(rest);
  } else if (kind === 'inperson') {
    message = cleanScript(t);
  } else {
    message = t.replace(/^# .*\n+/, '').trim();
  }
  const sub = message.match(/^\*\*Subject:\*\*\s*(.+)\n+/);
  if (sub) { subject = sub[1].trim(); message = message.slice(sub[0].length).trim(); }
  // drop note sentences that only restate the recipient line ("To: +94 …")
  notes = notes.map(n => n.replace(/^To:?\s+\+[\d ]+\s*/i, '').replace(/^\((.*)\)\.?$/, '$1').replace(/^\(|\)\.?$/g, '').trim())
    .filter(n => n.length > 3)
    .map(n => n[0].toUpperCase() + n.slice(1) + (/[.!?]$/.test(n) ? '' : '.'));
  const placeholder = (message.match(/\[[A-Z][A-Z ]{6,}\]/) || [null])[0];
  return { kind, label, subject, to, message, notes, placeholder };
}

const ORDER = ['message.en.email.md', 'message.en.whatsapp.md', 'in-person.en.md'];
const gateOf = slug => D.gates.find(g => g.slug === slug && g.kind === 'send the pitch');
const TYPE = { surf_camp: 'Surf camp', beach_lodging: 'Beach lodging' };
const runName = id => id.replace(/^\d{4}-\d{2}-/, '').replace(/-(\d+)$/, ' $1').replace(/^./, c => c.toUpperCase());

const sites = ps.map(b => {
  const g = gateOf(b.slug);
  return {
    slug: b.slug,
    name: b.name,
    type: TYPE[b.type] || (b.type ? b.type.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()) : null),
    run_id: b.run_id,
    run: runName(b.run_id),
    ran_by: b.ran_by?.operator || null,
    state: b.state,
    pitch_sent: b.pitch_sent || null,
    preview_url: b.preview_url,
    proposal_url: b.pitch?.proposal_url || null,
    // The server sets proposal_live; this static mockup follows the brief: Global Surf's returns 404.
    proposal_live: b.pitch?.proposal_url ? b.slug !== 'global-surf-adventures' : false,
    critic_score: b.critic_score,
    since: g?.since || b.last_change,
    drafts: ORDER.filter(f => (b.pitch?.drafts || []).includes(f)).map(f => parseDraft(b.slug, f)).filter(Boolean),
  };
});

// Everything else waiting on the viewer, with the live sidebar's "Needs you" rule (soft-cards needsItems()):
// pending suggested agent tweaks, gates on a business other than "send the pitch", handoffs to the viewer.
// the agent name without the file name: "Designer (your custom.md)" -> "Designer", flagged as the viewer's own notes
const tweaks = (D.proposals || []).filter(p => p.kind === 'proposal' && p.status === 'pending')
  .map(p => ({ title: p.title, agent: (p.agent || '').replace(/\s*\(your custom\.md\)/i, ''), custom: /custom\.md/i.test(p.agent || '') }));
const gatesOther = D.gates.filter(g => g.slug && g.kind !== 'send the pitch')
  .map(g => ({ name: g.name, kind: g.kind, since: g.since }));
const viewer = D.team.viewer;
const toViewer = (D.team.open_assignments || []).filter(a => a.to === viewer && a.by !== a.to)
  .map(a => ({ id: a.id, slug: a.slug, business: a.business, task: a.task, by: a.by, ts: a.ts }));
const byViewer = (D.team.open_assignments || []).filter(a => a.by === viewer && a.to !== viewer)
  .map(a => ({ id: a.id, slug: a.slug, business: a.business, task: a.task, to: a.to, ts: a.ts }));

const EMBED = {
  generated_at: D.generated_at,
  viewer: D.team.viewer,
  operators: D.team.operators,
  to_viewer: toViewer,
  by_viewer: byViewer,
  tweaks,
  gates_other: gatesOther,
  revenues: { accumulated: D.revenues.accumulated, monthly: D.revenues.monthly, entries: D.revenues.entries.length },
  expenses: { accumulated: D.expenses.accumulated, monthly: D.expenses.monthly, entries: D.expenses.entries.length },
  kpis,
  sites,
};

const font = readFileSync(join(root, 'dashboard/mockups/soft-cards/src/fonts/manrope-latin-wght-normal.woff2')).toString('base64');
const tpl = readFileSync(join(here, 'template.html'), 'utf8');
const json = JSON.stringify(EMBED).replace(/</g, '\\u003c');
const html = tpl.replace('__FONT__', () => `data:font/woff2;base64,${font}`).replace('__DATA__', () => json);
writeFileSync(join(here, 'index.html'), html);
console.log(`wrote dashboard/overview-03/r3/b/index.html (${(html.length / 1024).toFixed(0)} KB, ${sites.length} sites, kpis ${JSON.stringify(kpis)})`);
if (process.argv.includes('--dump')) console.log(JSON.stringify(EMBED, null, 1));
