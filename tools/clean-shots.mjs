#!/usr/bin/env node
// tools/clean-shots.mjs — delete review screenshots once they have been scored (docs/team.md).
//
// Screenshots are how an agent looks at a page; the scorecard (text) is the record. After a review
// round the orchestrator runs this. It keeps, per shots/ folder, only the newest round's contact
// sheets (desktop-sheet.png, mobile-sheet.png) and shoot.json — the dashboard and the next gate
// show those — and deletes every per-viewport frame, every older round, and the critics' image
// evidence under reports/ and the mockups' funnel/ folders.
//
//   node tools/clean-shots.mjs [path ...] [--dry]     # default: sites/ reports/ dashboard/mockups/
//
// Never touches agents/designer/gold/ (the visual bar), dossier/ (the auditor's evidence for the
// pitch) or sites/<slug>/pitch/.

import { readdirSync, statSync, rmSync, existsSync, lstatSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = /\.(png|jpe?g|webp|gif|avif)$/i;
const KEEP_IN_ROUND = new Set(['desktop-sheet.png', 'mobile-sheet.png', 'shoot.json']);
const NEVER = /^(agents\/designer\/gold\/|dossier\/|sites\/[^/]+\/pitch\/)/;

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const roots = args.filter((a) => !a.startsWith('--'));
const rel = (p) => relative(ROOT, p).split(sep).join('/');
let removed = 0, bytes = 0;

function rm(p) {
  if (NEVER.test(rel(p))) return;
  const st = lstatSync(p);
  if (st.isDirectory()) { for (const e of readdirSync(p)) rm(join(p, e)); if (!dry && !readdirSync(p).length) rmSync(p, { recursive: true }); return; }
  removed++; bytes += st.size;
  if (!dry) rmSync(p);
}

const files = (d) => readdirSync(d, { withFileTypes: true });
const mtime = (d) => { try { return statSync(join(d, 'shoot.json')).mtimeMs; } catch { try { return statSync(join(d, 'desktop-sheet.png')).mtimeMs; } catch { return statSync(d).mtimeMs; } } };

// One shots/ folder: a round is any folder holding a contact sheet or shoot.json (the folder itself
// counts when it was shot into directly). Keep the newest round's sheets, delete the rest.
function cleanShots(dir) {
  const rounds = [];
  (function find(d) {
    const es = files(d);
    if (es.some((e) => KEEP_IN_ROUND.has(e.name))) rounds.push(d);
    for (const e of es) if (e.isDirectory()) find(join(d, e.name));
  })(dir);
  const newest = rounds.sort((a, b) => mtime(a) - mtime(b)).at(-1);
  (function sweep(d) {
    for (const e of files(d)) {
      const p = join(d, e.name);
      if (e.isDirectory()) { sweep(p); if (!dry && !readdirSync(p).length) rmSync(p, { recursive: true }); }
      else if (!(d === newest && KEEP_IN_ROUND.has(e.name))) rm(p);
    }
  })(dir);
}

// Walk: shots/ folders get cleanShots; images under reports/ and under a mockup's funnel*/ go.
function walk(d) {
  if (!existsSync(d) || NEVER.test(rel(d) + '/')) return;
  for (const e of files(d)) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const p = join(d, e.name);
    if (e.isSymbolicLink()) continue;
    if (e.isDirectory()) {
      if (e.name === 'shots') cleanShots(p);
      else walk(p);
    } else if (IMG.test(e.name) && (/^reports\//.test(rel(p)) || /^sites\/.*\/funnel[^/]*\//.test(rel(p)))) rm(p);
  }
}

for (const r of roots.length ? roots : ['sites', 'reports', 'dashboard/mockups']) walk(join(ROOT, r));
console.log(`${dry ? 'would remove' : 'removed'} ${removed} files, ${(bytes / 1e6).toFixed(0)} MB`);
