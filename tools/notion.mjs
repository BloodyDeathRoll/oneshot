#!/usr/bin/env node
// tools/notion.mjs — push one row per business to a Notion database (one-way: disk → Notion).
//
//   node tools/notion.mjs setup <parent-page-id>   # creates the database under that page, prints its id
//   node tools/notion.mjs sync [--dry-run]         # upserts every business, matched on Run + Slug
//
// The rows come from the dashboard's buildData() (dashboard/data.mjs), so Notion shows exactly what
// the dashboard shows: `businesses` for the state, `prospects` (the ledger view) for the verdict and
// its reason. Rate is our presence score, 0-5 (lower = weaker web presence = better prospect). Notion is a read-only mirror: nothing is read back, the ledger stays the source
// of truth, and a row edited in Notion is overwritten by the next sync.
//
// Secrets stay out of git (like ~/.oneshot/cf-token):
//   token        NOTION_TOKEN, else ~/.oneshot/notion-token (an internal integration secret)
//   database id  NOTION_DATABASE_ID, else ~/.oneshot/notion-db (written by `setup`)
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

const secret = (env, file) => process.env[env]?.trim() || (existsSync(file) ? readFileSync(file, 'utf8').trim() : '');

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
    State: select(b.state),
    Verdict: select(verdictOf(b, p)),
    Rate: { number: Number.isFinite(b.presence) ? b.presence : null },
    Reason: text(p?.why ?? (b.group === 'superseded' ? 'Found in a run that stopped before the shortlist.' : b.why)),
    'Next step': text(b.next_step),
    Owner: select(b.owner),
    'Hosting mode': select(b.hosting_mode),
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

async function setup(token, parent) {
  if (!parent) throw new Error('usage: node tools/notion.mjs setup <parent-page-id>');
  const db = await notion(token, 'POST', '/databases', {
    parent: { type: 'page_id', page_id: parent },
    title: [{ text: { content: 'Oneshot businesses' } }],
    properties: SCHEMA,
  });
  writeFileSync(DB_FILE, db.id + '\n');
  console.log(`created ${db.url}\nid ${db.id} → ${DB_FILE}`);
}

async function sync(token, db, dryRun) {
  const { buildData } = await import('../dashboard/data.mjs');
  const { businesses, prospects } = buildData();
  const prospectOf = new Map(prospects.map((p) => [keyOf(p), p]));
  if (dryRun) {
    for (const b of businesses) console.log(`${keyOf(b)}\t${b.state}\t${verdictOf(b, prospectOf.get(keyOf(b)))}\t${b.presence ?? ''}`);
    console.log(`${businesses.length} businesses (dry run, nothing sent)`);
    return;
  }
  // Only the columns the database has are written: a column deleted in Notion stays deleted
  // (Shahar, 2026-10-15). Run and Slug are how a row is found, so those two must exist.
  const have = new Set(Object.keys((await notion(token, 'GET', `/databases/${db}`)).properties));
  for (const c of ['Run', 'Slug']) if (!have.has(c)) throw new Error(`the database has no "${c}" column; rows are matched on Run + Slug`);
  const skipped = Object.keys(SCHEMA).filter((c) => !have.has(c));
  if (skipped.length) console.log(`notion: not in the database, skipped: ${skipped.join(', ')}`);
  const rows = await existingRows(token, db);
  let created = 0, updated = 0;
  for (const b of businesses) {
    const properties = Object.fromEntries(Object.entries(toProperties(b, prospectOf.get(keyOf(b)))).filter(([c]) => have.has(c)));
    const id = rows.get(keyOf(b));
    if (id) { await notion(token, 'PATCH', `/pages/${id}`, { properties }); updated++; }
    else { await notion(token, 'POST', '/pages', { parent: { database_id: db }, properties }); created++; }
  }
  console.log(`notion: ${created} created, ${updated} updated`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(process.argv[1])) {
  const [cmd, arg] = process.argv.slice(2);
  const dryRun = process.argv.includes('--dry-run');
  try {
    const token = secret('NOTION_TOKEN', TOKEN_FILE);
    if (cmd === 'sync' && dryRun) await sync(null, null, true);
    else if (!token) throw new Error(`no token: set NOTION_TOKEN or write it to ${TOKEN_FILE}`);
    else if (cmd === 'setup') await setup(token, arg);
    else if (cmd === 'sync') {
      const db = secret('NOTION_DATABASE_ID', DB_FILE);
      if (!db) throw new Error(`no database: run \`node tools/notion.mjs setup <parent-page-id>\` or set NOTION_DATABASE_ID`);
      await sync(token, db, false);
    } else throw new Error('usage: node tools/notion.mjs setup <parent-page-id> | sync [--dry-run]');
  } catch (e) { console.error(`notion: ${e.message}`); process.exit(1); }
}
