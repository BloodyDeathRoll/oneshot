#!/usr/bin/env node
// tools/media.mjs — images and video live on each operator's disk, never in git (docs/team.md).
//
// Git carries a manifest per business, media/<slug>.tsv (path, sha256, bytes, source), so the
// other operator knows exactly which files exist and how to get each one back. The files
// themselves are kept in a local store, ~/.oneshot/assets/tree/<repo path> (ONESHOT_ASSETS
// overrides the root), so a removed worktree loses nothing.
//
//   node tools/media.mjs save [slug]        # copy media into the store, rewrite the manifests (pre-commit runs this)
//   node tools/media.mjs status [slug]      # per business: files present / missing here, and how many have no recipe
//   node tools/media.mjs restore <slug>     # store → checkout, then every recipe, then report what is still missing
//   node tools/media.mjs restore <slug> --zip <file>   # also unpack a zip the other operator sent
//   node tools/media.mjs pack <slug>        # zip of the files that have no recipe → ~/oneshot-<slug>-media.zip
//   node tools/media.mjs forget <path>      # drop manifest rows for files deleted on purpose (path or folder)
//
// Sources (column 4 of the manifest), and what restore does with each:
//   dossier        dossier/<slug>/assets images whose own URL is in dossier.json: tools/restore-assets.py re-downloads them
//   video          dossier/<slug>/assets/video: tools/fetch-video.mjs with the dossier.videos[] source_url (restore names them)
//   stock          dossier/<slug>/stock: re-downloaded from Wikimedia Commons (stock/index.json)
//   recipe:<file>  made by a committed script whose header declares it with "# media: <glob>"
//   local          nothing in git can make it: only the store or a zip from the other operator has it
// Screenshots (any path with a shots/ folder) are scratch: never in the manifest, never restored —
// except agents/designer/gold/shots/, the visual bar the designer is held to.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, lstatSync, realpathSync, copyFileSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { homedir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const STORE_ROOT = process.env.ONESHOT_ASSETS ?? join(homedir(), '.oneshot', 'assets');
const STORE = join(STORE_ROOT, 'tree');
const MANIFESTS = join(ROOT, 'media');

export const MEDIA_RE = /\.(png|jpe?g|webp|gif|avif|heic|tiff?|bmp|ico|mp4|webm|mov|m4v|mkv|avi)$/i;
export const SCRATCH_RE = /^(?!agents\/designer\/gold\/).*(^|\/)shots\//;   // the designer's gold shots are the visual bar, not scratch
// Folders that hold build output or installs, not media anyone made; dossier/<slug>/assets/mockups/
// is where the mockups' dist/video links point (tools/link-assets.sh), so those files count once, there.
const SKIP_DIRS = new Set(['.git', 'node_modules', '.astro', '.next', '.wrangler', '.venv', 'venv', '__pycache__']);
const SKIP_RE = /^sites\/[^/]+\/final\/dist\/|^sites\/[^/]+\/mockups[^/]*\/[^/]+\/public\/photos\/|^dossier\/[^/]+\/assets\/mockups\/|^dashboard\/mockups\/[^/]+\/dist\/img\//;

const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
export const groupOf = (p) => p.match(/^(?:sites|dossier)\/([^/]+)\//)?.[1] ?? '_shared';

// Every media file in the checkout (following the links tools/link-assets.sh makes), repo-relative.
export function walk(dir = ROOT, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const abs = join(dir, e.name);
    const rel = relative(ROOT, abs).split(sep).join('/');
    let isDir = e.isDirectory(), isFile = e.isFile();
    if (e.isSymbolicLink()) { try { const s = statSync(abs); isDir = s.isDirectory(); isFile = s.isFile(); } catch { continue; } }
    if (isDir) { if (!SKIP_RE.test(rel + '/')) walk(abs, out); }
    else if (isFile && MEDIA_RE.test(e.name) && !SCRATCH_RE.test(rel) && !SKIP_RE.test(rel)) out.push(rel);
  }
  return out;
}

// "# media: <glob>" lines in committed make-*.sh scripts → [{ script, re }]
function recipes() {
  let files = [];
  try { files = execFileSync('git', ['ls-files', '*make-*.sh', '*make-*.py', '*make-*.mjs'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean); } catch {}
  const out = [];
  for (const script of files) {
    for (const m of readFileSync(join(ROOT, script), 'utf8').matchAll(/^#\s*media:\s*(\S+)/gm)) {
      const re = new RegExp('^' + m[1].replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*') + '$');
      out.push({ script, re });
    }
  }
  return out;
}

const urlCache = new Map();
function imageUrls(slug) {
  if (!urlCache.has(slug)) {
    const set = new Set();
    try {
      const d = JSON.parse(readFileSync(join(ROOT, 'dossier', slug, 'dossier.json'), 'utf8'));
      const logo = d.business?.logo ?? {};
      const entries = [...(d.images ?? []).map((e) => [e.file, e.source_url]), [logo.value, logo.source_url], ...(logo.variants ?? []).map((v) => [v.file, v.source_url])];
      for (const [file, url] of entries) if (file && /^https?:\/\/.+\.(jpe?g|png|webp|gif|avif|svg)(\?.*)?$/i.test(url ?? '')) set.add(file);
    } catch {}
    urlCache.set(slug, set);
  }
  return urlCache.get(slug);
}

export function sourceOf(p, rs = recipes()) {
  const r = rs.find((x) => x.re.test(p));
  if (r) return `recipe:${r.script}`;
  // dossier images come back only when dossier.json recorded the image's own URL; older harvests
  // recorded the page it was found on, which cannot be downloaded as the file
  const dm = p.match(/^dossier\/([^/]+)\/(assets\/(?:img|logo)-[^/]+)$/);
  if (dm && imageUrls(dm[1]).has(dm[2])) return 'dossier';
  if (/^dossier\/[^/]+\/assets\/video\//.test(p)) return 'video';
  if (/^dossier\/[^/]+\/stock\/[^/]+$/.test(p)) return 'stock';
  return 'local';
}

export function readManifest(slug) {
  const f = join(MANIFESTS, `${slug}.tsv`);
  if (!existsSync(f)) return [];
  return readFileSync(f, 'utf8').split('\n').filter((l) => l && !l.startsWith('#')).map((l) => {
    const [path, sha256, bytes, source] = l.split('\t');
    return { path, sha256, bytes: Number(bytes), source };
  });
}

function writeManifest(slug, rows) {
  mkdirSync(MANIFESTS, { recursive: true });
  const body = rows.sort((a, b) => a.path.localeCompare(b.path)).map((r) => [r.path, r.sha256, r.bytes, r.source].join('\t')).join('\n');
  writeFileSync(join(MANIFESTS, `${slug}.tsv`), `# path\tsha256\tbytes\tsource  (tools/media.mjs; docs/team.md)\n${body}${body ? '\n' : ''}`);
}

// A file reached through a link into the store is already saved.
const inStore = (abs) => { try { return realpathSync(abs).startsWith(realpathSync(STORE_ROOT) + sep); } catch { return false; } };

export function save(only) {
  const rs = recipes();
  const files = walk().filter((p) => !only || groupOf(p) === only);
  const groups = new Map();
  let copied = 0;
  for (const p of files) {
    const abs = join(ROOT, p);
    const st = statSync(abs);
    const row = { path: p, sha256: sha(abs), bytes: st.size, source: sourceOf(p, rs) };
    const g = groupOf(p);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(row);
    if (!inStore(abs)) {
      const dst = join(STORE, p);
      if (!existsSync(dst) || statSync(dst).size !== st.size || sha(dst) !== row.sha256) { mkdirSync(dirname(dst), { recursive: true }); copyFileSync(abs, dst); copied++; }
    }
  }
  // A manifest keeps rows for files this checkout does not have (the other operator made them,
  // or they are not restored here yet): saving never forgets a file. Rows are dropped only by
  // `forget`, when a file was deleted on purpose.
  const slugs = new Set([...groups.keys(), ...(only ? [only] : listManifests())]);
  for (const g of slugs) {
    const fresh = new Map((groups.get(g) ?? []).map((r) => [r.path, r]));
    for (const old of readManifest(g)) if (!fresh.has(old.path) && !existsSync(join(ROOT, old.path))) fresh.set(old.path, old);
    writeManifest(g, [...fresh.values()]);
  }
  return { files: files.length, copied, groups: slugs.size };
}

export function listManifests() {
  return existsSync(MANIFESTS) ? readdirSync(MANIFESTS).filter((f) => f.endsWith('.tsv')).map((f) => f.slice(0, -4)) : [];
}

// Per business: how many manifest files are here, missing, and without a recipe.
export function status(only) {
  const out = {};
  for (const g of only ? [only] : listManifests()) {
    const rows = readManifest(g);
    const missing = rows.filter((r) => !existsSync(join(ROOT, r.path)));
    out[g] = { files: rows.length, bytes: rows.reduce((s, r) => s + r.bytes, 0), present: rows.length - missing.length, missing: missing.length,
      no_recipe: rows.filter((r) => r.source === 'local').length, missing_no_recipe: missing.filter((r) => r.source === 'local').length };
  }
  return out;
}

function fromStore(rows) {
  let n = 0;
  for (const r of rows) {
    const dst = join(ROOT, r.path), src = join(STORE, r.path);
    if (!existsSync(dst) && existsSync(src) && sha(src) === r.sha256) { mkdirSync(dirname(dst), { recursive: true }); copyFileSync(src, dst); n++; }
  }
  return n;
}

async function fetchStock(slug, rows) {
  const idx = JSON.parse(readFileSync(join(ROOT, 'dossier', slug, 'stock', 'index.json'), 'utf8'));
  let n = 0;
  for (const r of rows) {
    const e = idx.find((x) => `dossier/${slug}/${x.file}` === r.path);
    const name = e?.source_url?.match(/\/wiki\/File:(.+)$/)?.[1];
    if (!name) continue;
    let res;
    for (let attempt = 1; attempt <= 5; attempt++) { // Commons rate-limits bursts (429): wait as told, then retry
      res = await fetch(`https://commons.wikimedia.org/wiki/Special:FilePath/${name}`, { headers: { 'User-Agent': 'oneshot-media-restore/1 (operator tool)' } });
      if (res.status !== 429 && res.status < 500) break;
      await new Promise((ok) => setTimeout(ok, (Number(res.headers.get('retry-after')) || 10 * attempt) * 1000));
    }
    await new Promise((ok) => setTimeout(ok, 1500));
    if (!res.ok) { console.log(`  stock ${r.path}: HTTP ${res.status}`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    if (createHash('sha256').update(buf).digest('hex') !== r.sha256) { console.log(`  stock ${r.path}: downloaded file differs from the manifest (re-saved or cropped after fetch)`); continue; }
    mkdirSync(dirname(join(ROOT, r.path)), { recursive: true });
    writeFileSync(join(ROOT, r.path), buf); n++;
  }
  return n;
}

async function restore(slug, zip) {
  const rows = readManifest(slug);
  if (!rows.length) { console.log(`no manifest media/${slug}.tsv`); return; }
  const missing = () => rows.filter((r) => !existsSync(join(ROOT, r.path)));
  console.log(`${slug}: ${rows.length} files, ${missing().length} missing`);
  if (zip) {
    const r = spawnSync('unzip', ['-n', '-q', zip, '-d', ROOT], { stdio: 'inherit' });
    console.log(r.status === 0 ? `  unpacked ${zip}` : `  unzip failed (${r.status})`);
  }
  console.log(`  from the store: ${fromStore(missing())}`);
  if (missing().some((r) => r.source === 'dossier')) {
    console.log('  dossier images: tools/restore-assets.py');
    spawnSync('python3', [join(ROOT, 'tools/restore-assets.py'), slug], { cwd: ROOT, stdio: 'inherit' });
  }
  const stock = missing().filter((r) => r.source === 'stock');
  if (stock.length) console.log(`  stock from Wikimedia: ${await fetchStock(slug, stock)} of ${stock.length}`);
  const vids = [...new Set(missing().filter((r) => r.source === 'video').map((r) => r.path.match(/(vid-\d+)/)?.[1]).filter(Boolean))];
  if (vids.length) {
    const d = JSON.parse(readFileSync(join(ROOT, 'dossier', slug, 'dossier.json'), 'utf8'));
    console.log('  video sources — run tools/fetch-video.mjs for each (its header lists the options):');
    for (const id of vids) console.log(`    ${id}: ${(d.videos ?? []).find((v) => v.id === id)?.source_url ?? 'no source_url in dossier.videos'}`);
  }
  for (const script of [...new Set(missing().filter((r) => r.source.startsWith('recipe:')).map((r) => r.source.slice(7)))]) {
    console.log(`  recipe: ${script}`);
    const cmd = script.endsWith('.py') ? 'python3' : script.endsWith('.mjs') ? 'node' : 'bash';
    spawnSync(cmd, [join(ROOT, script)], { cwd: ROOT, stdio: 'inherit' });
  }
  const left = missing();
  const bad = rows.filter((r) => existsSync(join(ROOT, r.path)) && sha(join(ROOT, r.path)) !== r.sha256);
  if (!left.length && !bad.length) { console.log(`  complete: all ${rows.length} files present and matching`); return; }
  if (bad.length) console.log(`  ${bad.length} present but differ from the manifest (a recipe made a different file): ${bad.slice(0, 5).map((r) => r.path).join(', ')}${bad.length > 5 ? ' …' : ''}`);
  if (left.length) {
    console.log(`  still missing ${left.length}:`);
    const by = {};
    for (const r of left) (by[r.source] ??= []).push(r.path);
    for (const [s, ps] of Object.entries(by)) console.log(`    ${s}: ${ps.length}${s === 'local' ? ' — ask the operator who made them for `node tools/media.mjs pack ' + slug + '`' : ''}`);
  }
}

// Drop manifest rows for files deleted on purpose (a path or a folder prefix).
function forget(prefix) {
  for (const g of listManifests()) {
    const rows = readManifest(g);
    const keep = rows.filter((r) => !(r.path === prefix || r.path.startsWith(prefix.replace(/\/?$/, '/'))));
    if (keep.length !== rows.length) { writeManifest(g, keep); console.log(`${g}: forgot ${rows.length - keep.length}`); }
  }
}

function pack(slug) {
  const rows = readManifest(slug).filter((r) => r.source === 'local' && existsSync(join(ROOT, r.path)));
  if (!rows.length) { console.log('nothing to pack: every file here has a recipe'); return; }
  const out = join(homedir(), `oneshot-${slug}-media.zip`);
  const r = spawnSync('zip', ['-q', '-X', out, '-@'], { cwd: ROOT, input: rows.map((x) => x.path).join('\n') });
  if (r.status !== 0) throw new Error(`zip failed: ${r.stderr}`);
  console.log(`${out}: ${rows.length} files, ${(statSync(out).size / 1e6).toFixed(1)} MB. The other operator runs: node tools/media.mjs restore ${slug} --zip <file>`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [cmd, slug, ...rest] = process.argv.slice(2);
  const zi = rest.indexOf('--zip');
  try {
    if (cmd === 'save') { const r = save(slug); console.log(`media: ${r.files} files in ${r.groups} manifests, ${r.copied} copied to ${STORE}`); }
    else if (cmd === 'status') {
      for (const [g, s] of Object.entries(status(slug))) console.log(`${g.padEnd(36)} ${String(s.present).padStart(5)}/${s.files} here  ${s.missing ? s.missing + ' missing' : 'complete'}${s.no_recipe ? `  (${s.no_recipe} without a recipe)` : ''}  ${(s.bytes / 1e6).toFixed(0)} MB`);
    } else if (cmd === 'restore' && slug) await restore(slug, zi > -1 ? rest[zi + 1] : null);
    else if (cmd === 'pack' && slug) pack(slug);
    else if (cmd === 'forget' && slug) forget(slug);
    else { console.error(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(7, 14).map((l) => l.slice(3)).join('\n')); process.exit(2); }
  } catch (e) { console.error(e.message); process.exit(1); }
}
