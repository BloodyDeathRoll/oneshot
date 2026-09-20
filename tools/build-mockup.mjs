#!/usr/bin/env node
// tools/build-mockup.mjs — build one mockup of one business.
//
// There is no shared template (CLAUDE.md: one Astro template per site). Each
// mockup is its own Astro project, written for that business, living at
//   sites/<slug>/mockups/<variant>/
// This tool only does the deterministic parts: derive responsive photos from the
// dossier, merge them into the passed copy as src/tenant/content.json, build, and
// report the weight against playbook §4.
//
// The mockup declares which photos it wants, and what each one shows, in
//   sites/<slug>/mockups/<variant>/photos.json   -> [{ "id": "img-001", "alt": "..." }]
// Alt text is written here because the dossier's asset index only says
// "Booking.com listing photo" for every image (a gap, recorded in notes.md).
//
//   node tools/build-mockup.mjs <slug> <variant> [--no-build]

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, symlinkSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPIKE = join(ROOT, 'spikes/payload/site');
const sharp = createRequire(join(SPIKE, 'package.json'))('sharp');

const WIDTHS = [1024, 640, 400];
const [slug, variant] = process.argv.slice(2);
const noBuild = process.argv.includes('--no-build');
if (!slug || !variant) { console.error('usage: build-mockup.mjs <slug> <variant> [--no-build]'); process.exit(2); }

const proj = join(ROOT, 'sites', slug, 'mockups', variant);
const copyFile = join(ROOT, 'sites', slug, 'copy', 'en.json');
const assetDir = join(ROOT, 'dossier', slug, 'assets');
const manifestFile = join(proj, 'photos.json');
for (const p of [proj, copyFile, assetDir, manifestFile]) {
  if (!existsSync(p)) { console.error('missing: ' + relative(ROOT, p)); process.exit(1); }
}

const index = JSON.parse(readFileSync(join(assetDir, 'index.json'), 'utf8'));
const byId = new Map(index.map((i) => [i.id, i]));
const wanted = JSON.parse(readFileSync(manifestFile, 'utf8'));

const outDir = join(proj, 'public', 'photos');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const photos = {};
for (const w of wanted) {
  const asset = byId.get(w.id);
  if (!asset) { console.error(`photos.json: ${w.id} is not in the dossier asset index`); process.exit(1); }
  if (asset.license !== 'business-owned') { console.error(`photos.json: ${w.id} is "${asset.license}" — only business-owned images may be used (base.md §2)`); process.exit(1); }
  const src = join(ROOT, 'dossier', slug, asset.file);
  /* Several of these are phone photographs stored sideways with an EXIF
     orientation flag. sharp().rotate() applies it, but metadata() reports the
     stored dimensions, so swap them when the flag says the image is turned. */
  const meta = await sharp(src).metadata();
  const turned = (meta.orientation ?? 1) >= 5;
  const srcW = turned ? meta.height : meta.width;
  const srcH = turned ? meta.width : meta.height;
  /* Some assets are phone or Instagram crops smaller than our smallest step, and
     a few are stored on their side inside a square frame with no EXIF flag to
     say so — those carry "rotate" in photos.json. */
  const turn = w.rotate ?? 0;
  const outW = turn % 180 === 0 ? srcW : srcH;
  const outH = turn % 180 === 0 ? srcH : srcW;
  const widths = WIDTHS.filter((x) => x <= outW);
  if (!widths.length) widths.push(outW);
  const srcset = [];
  for (const width of widths) {
    const name = `${w.id}-${width}.webp`;
    await sharp(src).rotate(turn).resize({ width }).webp({ quality: width >= 1024 ? 70 : 74 }).toFile(join(outDir, name));
    srcset.push({ w: width, src: `photos/${name}`, bytes: statSync(join(outDir, name)).size });
  }
  photos[w.id] = {
    id: w.id, alt: w.alt, asset: asset.id, license: asset.license,
    width: Math.min(outW, WIDTHS[0]),
    height: Math.round(Math.min(outW, WIDTHS[0]) * outH / outW),
    src: srcset[0].src,
    srcset: srcset.map((s) => `${s.src} ${s.w}w`).join(', '),
    bytes: Object.fromEntries(srcset.map((s) => [s.w, s.bytes])),
  };
}

const copy = JSON.parse(readFileSync(copyFile, 'utf8'));
mkdirSync(join(proj, 'src', 'tenant'), { recursive: true });
writeFileSync(join(proj, 'src', 'tenant', 'content.json'), JSON.stringify({ ...copy, photos }, null, 1));

const nm = join(proj, 'node_modules');
if (!existsSync(nm)) symlinkSync(join(SPIKE, 'node_modules'), nm, 'dir');

if (!noBuild) execSync('npx --no-install astro build', { cwd: proj, stdio: 'inherit' });

// weight report against playbook §4
const dist = join(proj, 'dist');
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(d, e.name)) : [{ p: join(d, e.name), b: statSync(join(d, e.name)).size }]);
if (existsSync(dist)) {
  const files = walk(dist);
  const sum = (re) => files.filter((f) => re.test(f.p)).reduce((n, f) => n + f.b, 0);
  const report = {
    html: sum(/\.html$/), css: sum(/\.css$/), js: sum(/\.m?js$/),
    fonts: sum(/\.woff2?$/), images: sum(/\.(webp|jpe?g|png|svg)$/),
    total: files.reduce((n, f) => n + f.b, 0),
  };
  writeFileSync(join(proj, 'weight.json'), JSON.stringify(report, null, 1));
  const kb = (n) => (n / 1024).toFixed(0) + ' KB';
  console.log(`\nweight  html ${kb(report.html)} · css ${kb(report.css)} · js ${kb(report.js)} · fonts ${kb(report.fonts)} · images ${kb(report.images)} · dist total ${kb(report.total)}`);
  console.log(`photos  ${Object.keys(photos).length} used, largest single file ${kb(Math.max(...Object.values(photos).flatMap((p) => Object.values(p.bytes))))}`);
}
