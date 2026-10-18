#!/usr/bin/env node
// tools/notion.mjs — push one row per business to a Notion database (one-way: disk → Notion).
//
//   node tools/notion.mjs setup <parent-page-id> [workflow]   # creates that workflow's database (default lk-surf)
//   node tools/notion.mjs sync [--dry-run]                    # upserts every business, matched on Run + Slug
//   node tools/notion.mjs add-column <name> [workflow]        # adds that one SCHEMA column to that workflow's database
//
// The rows come from the dashboard's buildData() (dashboard/data.mjs), so Notion shows exactly what
// the dashboard shows: `businesses` for the state, `prospects` (the ledger view) for the verdict and
// its reason. Rate is our presence score, 0-5 (lower = weaker web presence = better prospect). Notion is a read-only mirror: nothing is read back, the ledger stays the source
// of truth, and a row edited in Notion is overwritten by the next sync.
//
// Secrets stay out of git (like ~/.oneshot/cf-token):
//   token        NOTION_TOKEN, else ~/.oneshot/notion-token (an internal integration secret)
//   database id  one database per workflow (Shahar, 2026-10-18): Surf | Sri-Lanka (lk-surf) in
//                NOTION_DATABASE_ID, else ~/.oneshot/notion-db (written by `setup`); any other workflow in
//                ~/.oneshot/notion-db-<workflow> (Custom: notion-db-custom), written by `setup <page> <workflow>`.
//                lk-surf without a database is an error; any other workflow without one is skipped. `setup`
//                refuses lk-surf while NOTION_DATABASE_ID is set: sync reads the env first, so the new
//                database would never be written to.
// The integration must be shared with the parent page (Notion: page ⋯ → Connections).

import { readFileSync, writeFileSync, existsSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const API = 'https://api.notion.com/v1';
const VERSION = '2022-06-28';
const HOME = join(homedir(), '.oneshot');
const TOKEN_FILE = join(HOME, 'notion-token');
const DB_FILE = join(HOME, 'notion-db');
export const dbFileOf = (workflow) => {
  // `_` too: an outbound workflow is <market>-<vertical>, and verticals use it (brand_design).
  if (!/^[a-z0-9_-]+$/.test(workflow)) throw new Error(`bad workflow name "${workflow}"`);
  return workflow === 'lk-surf' ? DB_FILE : join(HOME, `notion-db-${workflow}`);
};

const secret = (env, file) => process.env[env]?.trim() || (existsSync(file) ? readFileSync(file, 'utf8').trim() : '');
const dbOf = (workflow) => (workflow === 'lk-surf' ? secret('NOTION_DATABASE_ID', DB_FILE) : secret('', dbFileOf(workflow)));

// Database columns: name → Notion property schema.
export const SCHEMA = {
  Name: { title: {} },
  Slug: { rich_text: {} },
  Run: { select: {} },
  State: { select: {} },
  Verdict: { select: {} },
  Rate: { number: {} },
  Reason: { rich_text: {} },
  'Next step': { rich_text: {} },
  Owner: { select: {} },
  'Hosting mode': { select: {} },
  Preview: { url: {} },
  Proposal: { url: {} },
  'Last change': { date: {} },
  'Last worked by': { select: {} },
  Out: { checkbox: {} },
};

const text = (s) => ({ rich_text: s ? [{ text: { content: String(s).slice(0, 2000) } }] : [] });
// Notion select options may not contain commas.
const select = (s) => ({ select: s ? { name: String(s).replace(/,/g, ' ').slice(0, 100) } : null });

// Ledger state → the word shown in Notion (Shahar, 2026-10-15). The ledger keeps its names.
const STATE_LABEL = { packaged: 'Ready' };

export const keyOf = (b) => `${b.run_id}/${b.slug}`;

// The dashboard's prospect verdict, with "not shortlisted" called what it is (Shahar, 2026-10-15).
// prospects keep one run per slug (the newest), so older runs fall back to the business's group.
export function verdictOf(b, p) {
  if (p) return p.verdict === 'not shortlisted' ? 'rejected' : p.verdict;
  if (b.state === 'void') return 'voided';
  if (b.group === 'superseded') return 'not continued';
  if (b.group === 'not_shortlisted') return 'rejected';
  return b.group ?? null;
}

// One business (dashboard buildData().businesses[i]) and its prospect, if any → Notion page properties.
export function toProperties(b, p = null) {
  return {
    Name: { title: [{ text: { content: b.name || b.slug } }] },
    Slug: text(b.slug),
    Run: select(b.run_id),
    State: select(STATE_LABEL[b.state] ?? b.state),
    Verdict: select(verdictOf(b, p)),
    Rate: { number: Number.isFinite(b.presence) ? b.presence : null },
    Reason: text(p?.why ?? (b.group === 'superseded' ? 'Found in a run that stopped before the shortlist.' : b.why)),
    'Next step': text(b.next_step),
    Owner: select(b.owner),
    // The client picks the mode after a sale (ledger product_chosen); older lines carry a
    // hosting_mode from the pre-2026-10-05 deploy flow, which is not a choice.
    'Hosting mode': select(b.reached?.includes('product_chosen') ? b.hosting_mode : null),
    Preview: { url: b.preview_url || null },
    Proposal: { url: b.pitch?.proposal_url || null },
    'Last change': { date: b.last_change ? { start: b.last_change } : null },
    'Last worked by': select(b.last_worked?.name),
    Out: { checkbox: !!b.out },
  };
}

async function notion(token, method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Notion-Version': VERSION, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path}: ${res.status} ${json.code ?? ''} ${json.message ?? ''}`.trim());
  return json;
}

// Every page in the database, as <run>/<slug> → page id.
async function existingRows(token, db) {
  const rows = new Map();
  let cursor;
  do {
    const r = await notion(token, 'POST', `/databases/${db}/query`, { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) });
    for (const p of r.results) {
      const plain = (prop) => prop?.rich_text?.map((t) => t.plain_text).join('') ?? '';
      const run = p.properties?.Run?.select?.name, slug = plain(p.properties?.Slug);
      if (run && slug) rows.set(`${run}/${slug}`, p.id);
    }
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  return rows;
}

// Never replaces a workflow's database id: a second setup would point every later sync at the new one.
async function setup(token, parent, workflow = 'lk-surf') {
  if (!parent) throw new Error('usage: node tools/notion.mjs setup <parent-page-id> [workflow]');
  const file = dbFileOf(workflow);
  if (existsSync(file)) throw new Error(`${workflow} already has a database (${file}); delete that file first to replace it`);
  if (workflow === 'lk-surf' && process.env.NOTION_DATABASE_ID?.trim()) throw new Error('lk-surf already has a database (NOTION_DATABASE_ID); unset it first to replace it');
  const { workflowLabel } = await import('../dashboard/data.mjs');
  const db = await notion(token, 'POST', '/databases', {
    parent: { type: 'page_id', page_id: parent },
    title: [{ text: { content: `Oneshot - ${workflowLabel(workflow)}` } }],
    properties: SCHEMA,
  });
  writeFileSync(file, db.id + '\n');
  console.log(`created ${db.url}\nid ${db.id} → ${file}`);
}

// Adds one column, never the whole SCHEMA: a schema PATCH with every column re-creates the ones
// Shahar deleted in Notion (2026-10-15).
async function addColumn(token, db, name) {
  if (!SCHEMA[name]) throw new Error(`no column "${name}" in SCHEMA: ${Object.keys(SCHEMA).join(', ')}`);
  await notion(token, 'PATCH', `/databases/${db}`, { properties: { [name]: SCHEMA[name] } });
  console.log(`notion: column "${name}" added`);
}

async function sync(token, dryRun) {
  const { buildData } = await import('../dashboard/data.mjs');
  const { businesses, prospects } = buildData();
  const prospectOf = new Map(prospects.map((p) => [keyOf(p), p]));
  if (dryRun) {
    for (const b of businesses) console.log(`${b.workflow}\t${keyOf(b)}\t${b.state}\t${verdictOf(b, prospectOf.get(keyOf(b)))}\t${b.presence ?? ''}`);
    console.log(`${businesses.length} businesses (dry run, nothing sent)`);
    return;
  }
  // Every database id first: a missing lk-surf database must fail before any workflow is written,
  // not halfway through the sync.
  const dbs = [...new Set(businesses.map((b) => b.workflow))].sort().map((wf) => [wf, dbOf(wf)]);
  if (dbs.some(([wf, db]) => wf === 'lk-surf' && !db)) throw new Error(`lk-surf: no database: run \`node tools/notion.mjs setup <parent-page-id>\` or set NOTION_DATABASE_ID`);
  for (const [wf, db] of dbs) {
    if (!db) { console.log(`notion: ${wf}: no database (${dbFileOf(wf)}), skipped`); continue; }
    // Only the columns the database has are written: a column deleted in Notion stays deleted
    // (Shahar, 2026-10-15). Run and Slug are how a row is found, so those two must exist.
    const have = new Set(Object.keys((await notion(token, 'GET', `/databases/${db}`)).properties));
    for (const c of ['Run', 'Slug']) if (!have.has(c)) throw new Error(`${wf}: the database has no "${c}" column; rows are matched on Run + Slug`);
    const skipped = Object.keys(SCHEMA).filter((c) => !have.has(c));
    if (skipped.length) console.log(`notion: ${wf}: not in the database, skipped: ${skipped.join(', ')}`);
    const rows = await existingRows(token, db);
    let created = 0, updated = 0;
    for (const b of businesses.filter((x) => x.workflow === wf)) {
      const properties = Object.fromEntries(Object.entries(toProperties(b, prospectOf.get(keyOf(b)))).filter(([c]) => have.has(c)));
      const id = rows.get(keyOf(b));
      if (id) { await notion(token, 'PATCH', `/pages/${id}`, { properties }); updated++; }
      else { await notion(token, 'POST', '/pages', { parent: { database_id: db }, properties }); created++; }
    }
    console.log(`notion: ${wf}: ${created} created, ${updated} updated`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(process.argv[1])) {
  const [cmd, arg, wfArg] = process.argv.slice(2).filter((a) => a !== '--dry-run');
  const dryRun = process.argv.includes('--dry-run');
  try {
    const token = secret('NOTION_TOKEN', TOKEN_FILE);
    if (cmd === 'sync' && dryRun) await sync(null, true);
    else if (!token) throw new Error(`no token: set NOTION_TOKEN or write it to ${TOKEN_FILE}`);
    else if (cmd === 'setup') await setup(token, arg, wfArg);
    else if (cmd === 'sync' || cmd === 'add-column') {
      if (cmd === 'sync') await sync(token, false);
      else {
        const wf = wfArg ?? 'lk-surf';
        const db = dbOf(wf);
        if (!db) throw new Error(`${wf}: no database: run \`node tools/notion.mjs setup <parent-page-id> ${wf}\`${wf === 'lk-surf' ? ' or set NOTION_DATABASE_ID' : ''}`);
        await addColumn(token, db, arg);
      }
    } else throw new Error('usage: node tools/notion.mjs setup <parent-page-id> [workflow] | sync [--dry-run] | add-column <name> [workflow]');
  } catch (e) { console.error(`notion: ${e.message}`); process.exit(1); }
}
