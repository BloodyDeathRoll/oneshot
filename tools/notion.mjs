#!/usr/bin/env node
// tools/notion.mjs — push one row per business to a Notion database (one-way: disk → Notion).
//
//   node tools/notion.mjs setup <parent-page-id>   # creates the database under that page, prints its id
//   node tools/notion.mjs sync [--dry-run]         # upserts every business, keyed by <run_id>/<slug>
//
// The rows come from the dashboard's buildData() (dashboard/data.mjs), so Notion shows exactly what
// the dashboard shows. Notion is a read-only mirror: nothing is read back, the ledger stays the source
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
  Key: { rich_text: {} },
  Slug: { rich_text: {} },
  Run: { select: {} },
  State: { select: {} },
  'Next step': { rich_text: {} },
  Gate: { rich_text: {} },
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

// One business (dashboard buildData().businesses[i]) → Notion page properties.
export function toProperties(b) {
  return {
    Name: { title: [{ text: { content: b.name || b.slug } }] },
    Key: text(keyOf(b)),
    Slug: text(b.slug),
    Run: select(b.run_id),
    State: select(b.state),
    'Next step': text(b.next_step),
    Gate: text(b.gate),
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

// Every page in the database, as Key → page id.
async function existingRows(token, db) {
  const rows = new Map();
  let cursor;
  do {
    const r = await notion(token, 'POST', `/databases/${db}/query`, { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) });
    for (const p of r.results) {
      const key = p.properties?.Key?.rich_text?.map((t) => t.plain_text).join('');
      if (key) rows.set(key, p.id);
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
  const businesses = buildData().businesses;
  if (dryRun) {
    for (const b of businesses) console.log(`${keyOf(b)}\t${b.state}\t${b.next_step ?? ''}`);
    console.log(`${businesses.length} businesses (dry run, nothing sent)`);
    return;
  }
  // Columns added to SCHEMA after `setup` are created on the fly; existing ones are left alone.
  await notion(token, 'PATCH', `/databases/${db}`, { properties: SCHEMA });
  const rows = await existingRows(token, db);
  let created = 0, updated = 0;
  for (const b of businesses) {
    const properties = toProperties(b);
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
