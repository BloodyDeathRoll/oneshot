#!/usr/bin/env node
// tools/check-design.mjs — house rules that are easy to state and easy to break.
//
// Every one of these was a real regression on 2026-09-20: a dark ground came
// back on a rebuilt mockup, captions came back under photographs, and a photo
// grid went back to equal-height boxes padded out with empty space. Saying
// "don't" in a prompt did not hold. This measures the built page instead.
//
//   node tools/check-design.mjs [slug|variant ...] [--no-shots]
//   node tools/check-design.mjs path/to/page.html      (any single page, e.g. agents/designer/gold/*.html)
//
// Screenshots are taken through tools/shoot.mjs (scrolled, per viewport, with contact sheets) into
// <variant>/shots/check-design/, or a temp folder for a single page. --no-shots skips them.
//
// Checks, per built mockup, at 1440 and 390:
//   1. LIGHT GROUND, surf vertical only (designer house rule 1; other verticals have no theme
//      rule, so the check is skipped for a business whose run is not `vertical: surf`). The page
//      background luminance must be >= 0.55, and no element taller than a third
//      of the viewport may be a dark ground (luminance < 0.35) behind body text.
//      A container filled by a photograph is not a dark theme, so one that is
//      covered by its own img or canvas is skipped.
//   2. NO CAPTION UNDER A PHOTOGRAPH. Alt text carries the description for
//      anyone who cannot see it; a label under every picture is noise for
//      everyone who can. Quote attributions are fine — those are not pictures.
//   3. NO PADDED-OUT PICTURE BOXES. In any container of three or more figures,
//      no figure may have more than 12% of its height as empty space below its
//      image. Either crop to one ratio or let masonry give every picture its
//      own height; never stretch the boxes to match and leave holes.
//   4. NO UPSCALED FULL-BLEED PHOTOGRAPH (designer hard constraint 7). At 1440, an image or a CSS
//      background drawn >= 1200 px wide must come from a source >= 1200 px wide. The source width
//      is the file's natural width, or the dossier's recorded width when the filename carries an
//      asset id and that is smaller (a copy resized upwards into dist/img/ does not get past it).
//      Since designer 0.3.0 a 4e mockup is one HTML file with no photos.json, so
//      tools/build-mockup.mjs, which refuses this at 4g, never sees it. A photograph drawn into a
//      canvas cannot be measured here.
//
// And one report that WARNS and never fails — THE DEFAULT LOOK (creative-director hard
// constraint 15): the computed font family on h1, h2 and body against the listed faces; the page
// ground in HSL, flagged as cream when hue is 30-60, saturation < 40% and lightness > 88%; how
// many elements are tracked all-caps labels (text-transform: uppercase, letter-spacing > 0.05em);
// and how many headings are directly preceded by one. Each warning needs a reason in notes.md or
// a change; the critic reports them to the human as facts.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { serve } from './_serve.mjs';
import { listRuns } from './run.mjs';

const root = process.cwd();
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const noShots = process.argv.includes('--no-shots');
const SHOOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'shoot.mjs');
const MIN_BLEED_SRC = 1200;  // px, source width of anything drawn full-bleed
const DEFAULT_DISPLAY = ['instrument serif', 'fraunces', 'playfair display', 'cormorant', 'cormorant garamond', 'dm serif display', 'dm serif text'];
const DEFAULT_BODY = ['inter', 'inter tight', 'roboto', 'arial'];
const MIN_LUM = 0.55;      // the page's own ground
const MIN_BLOCK_LUM = 0.35; // a panel behind text
const MAX_SLACK = 0.12;

const PROBE = `(async () => {
  const lum = (c) => {
    const m = c.match(/[\\d.]+/g); if (!m) return 1;
    const [r, g, b] = m.slice(0, 3).map(Number);
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const out = { bg: lum(getComputedStyle(document.body).backgroundColor), darkBlocks: [], captions: [], padded: [] };

  // 1. big dark grounds behind text
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    const c = s.backgroundColor;
    if (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') continue;
    const r = el.getBoundingClientRect();
    if (r.height < innerHeight / 3 || r.width < innerWidth * 0.5) continue;
    if (lum(c) >= ${MIN_BLOCK_LUM}) continue;
    // a container filled by its own photograph is a picture, not a dark theme
    const cover = [...el.querySelectorAll(':scope > img, :scope > canvas, :scope > figure > img, :scope > figure > canvas')]
      .some((m) => { const b = m.getBoundingClientRect(); return b.height > r.height * 0.8 && b.width > r.width * 0.8; });
    if (cover) continue;
    if (!el.innerText || el.innerText.trim().length < 40) continue;
    out.darkBlocks.push(el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ')[0] + ' L=' + lum(c).toFixed(2));
  }

  // 2. captions under photographs
  for (const fc of document.querySelectorAll('figcaption')) {
    const fig = fc.closest('figure');
    if (!fig) continue;
    const img = fig.querySelector('img, canvas');
    if (!img) continue;                                  // a quote card, not a picture
    if (fc.getBoundingClientRect().top < img.getBoundingClientRect().bottom - 2) continue; // an overlay label
    out.captions.push((fc.textContent || '').trim().slice(0, 60));
  }

  // 3. picture boxes padded out with empty space
  const groups = new Map();
  for (const fig of document.querySelectorAll('figure')) {
    const img = fig.querySelector('img');
    if (!img) continue;
    const parent = fig.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push([fig, img]);
  }
  for (const [parent, list] of groups) {
    if (list.length < 3) continue;
    for (const [fig, img] of list) {
      const f = fig.getBoundingClientRect(), i = img.getBoundingClientRect();
      if (f.height < 40) continue;
      const slack = (f.bottom - i.bottom) / f.height;
      if (slack > ${MAX_SLACK}) out.padded.push(
        (parent.className || parent.tagName).toString().split(' ')[0] + ' ' + Math.round(slack * 100) + '% empty');
    }
  }

  // 4. anything drawn full-bleed, with the width of what it was drawn from
  out.bleed = [];
  const natural = (url) => new Promise((res) => { const i = new Image(); i.onload = () => res(i.naturalWidth); i.onerror = () => res(0); i.src = url; });
  const name = (u) => u.startsWith('data:') ? 'inline image' : u.split('/').pop().split('?')[0];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width < ${MIN_BLEED_SRC} || r.height < 80) continue;
    if (el.tagName === 'IMG' && el.currentSrc) out.bleed.push({ file: name(el.currentSrc), drawn: Math.round(r.width), natural: el.naturalWidth });
    const bg = getComputedStyle(el).backgroundImage.match(/url\\("?([^")]+)"?\\)/);
    if (bg) out.bleed.push({ file: name(bg[1]), drawn: Math.round(r.width), natural: await natural(bg[1]) });
  }

  // the default look — reported, never failed
  const first = (el) => el ? getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim() : null;
  const hsl = (c) => {
    const m = c.match(/[\\d.]+/g).map(Number); const [r, g, b] = m.slice(0, 3).map((v) => v / 255);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    let h = 0; if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return { h: Math.round((h * 60 + 360) % 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };
  const clear = (c) => !c || c === 'transparent' || /,\\s*0\\)$/.test(c);
  let ground = getComputedStyle(document.body).backgroundColor;
  if (clear(ground)) ground = getComputedStyle(document.documentElement).backgroundColor;
  if (clear(ground)) ground = 'rgb(255, 255, 255)';
  const isLabel = (el) => {
    if (!el || !(el.textContent || '').trim()) return false;
    const s = getComputedStyle(el), fs = parseFloat(s.fontSize), ls = parseFloat(s.letterSpacing);
    return s.textTransform === 'uppercase' && fs > 0 && ls / fs > 0.05;
  };
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
  out.look = {
    h1: first(document.querySelector('h1')), h2: first(document.querySelector('h2')), body: first(document.body),
    ground, hsl: hsl(ground),
    labels: [...document.querySelectorAll('body *')].filter((el) => ownText(el) && isLabel(el)).length,
    headings: headings.length,
    labelledHeadings: headings.filter((h) => isLabel(h.previousElementSibling)).length,
  };
  return out;
})()`;

/* The vertical of a business: its latest ledger line's run → runs/<run_id>.yaml (default surf). */
const RUN_VERTICAL = new Map(listRuns().map((r) => [r.run_id, r.vertical]));
const LAST_RUN = new Map();
for (const l of fs.readFileSync(path.join(root, 'ledger.jsonl'), 'utf8').split('\n')) { try { const j = JSON.parse(l); if (j.slug) LAST_RUN.set(j.slug, j.run_id); } catch {} }
const verticalOf = (slug) => RUN_VERTICAL.get(LAST_RUN.get(slug)) ?? 'surf';

/* What to check: every built mockup under sites/ (optionally filtered by slug or variant), or a
   single page given by path. */
const targets = [];
const asPath = only.filter((a) => fs.existsSync(a) && (a.endsWith('.html') || fs.statSync(a).isDirectory() && fs.existsSync(path.join(a, 'index.html'))));
for (const a of asPath) {
  const abs = path.resolve(a), isDir = fs.statSync(abs).isDirectory();
  targets.push({ label: path.relative(root, abs), dir: isDir ? abs : path.dirname(abs), file: isDir ? '' : path.basename(abs), slug: path.relative(root, abs).match(/^sites\/([^/]+)\//)?.[1] ?? null,
    shots: path.join(os.tmpdir(), 'check-design-' + path.basename(abs).replace(/\W+/g, '-')) });
}
if (!asPath.length) for (const slug of fs.readdirSync(path.join(root, 'sites'))) {
  const mdir = path.join(root, 'sites', slug, 'mockups');
  if (!fs.existsSync(mdir)) continue;
  for (const v of fs.readdirSync(mdir)) {
    if (only.length && !only.includes(v) && !only.includes(slug)) continue;
    const dist = path.join(mdir, v, 'dist');
    if (!fs.existsSync(dist)) continue;
    targets.push({ label: `${slug} / ${v}`, dir: dist, file: '', slug, shots: path.join(mdir, v, 'shots', 'check-design') });
  }
}

/* The dossier's recorded width per asset id, so a copy resized upwards into dist/img/ is still
   measured as what it came from. */
const dossierWidths = (slug) => {
  const m = new Map();
  for (const f of ['assets', 'stock']) {
    const idx = path.join(root, 'dossier', slug, f, 'index.json');
    if (fs.existsSync(idx)) for (const e of JSON.parse(fs.readFileSync(idx, 'utf8'))) if (e.id && e.width) m.set(e.id, e.width);
  }
  return m;
};

const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
let port = 8960, fails = 0;
const rows = [];
for (const t of targets) {
  const srv = await serve(t.dir, port);
  const url = `http://localhost:${port}/${t.file}`;
  const widths = t.slug ? dossierWidths(t.slug) : new Map();
  const problems = [], warnings = [];
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const page = await b.newPage({ viewport: { width: w, height: h } });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const el = document.scrollingElement.scrollHeight > document.scrollingElement.clientHeight + 4
        ? document.scrollingElement
        : [...document.querySelectorAll('*')].find((e) => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 4) || document.scrollingElement;
      for (let y = 0; y < el.scrollHeight; y += el.clientHeight * 0.7) { el.scrollTop = y; await new Promise((r) => setTimeout(r, 70)); }
      el.scrollTop = 0;
    });
    await page.waitForTimeout(500);
    const r = await page.evaluate(PROBE);
    if (verticalOf(t.slug) === 'surf') {
      if (r.bg < MIN_LUM) problems.push(`${w}px: page ground is dark (luminance ${r.bg.toFixed(2)} < ${MIN_LUM})`);
      for (const d of new Set(r.darkBlocks)) problems.push(`${w}px: dark ground behind text — ${d}`);
    }
    for (const c of new Set(r.captions)) problems.push(`${w}px: caption under a photograph — "${c}"`);
    for (const p of new Set(r.padded)) problems.push(`${w}px: picture box padded out — ${p}`);
    if (w === 1440) {
      for (const x of r.bleed) {
        const id = [...widths.keys()].find((k) => x.file.includes(k));
        const src = id ? Math.min(x.natural || Infinity, widths.get(id)) : x.natural;
        if (src && src < MIN_BLEED_SRC) problems.push(`1440px: ${x.file} is drawn ${x.drawn}px wide from a ${src}px source${id ? ` (${id})` : ''} — nothing under ${MIN_BLEED_SRC}px goes full-bleed (hard constraint 7)`);
      }
      const k = r.look, fam = (f) => (f || '').toLowerCase();
      for (const tag of ['h1', 'h2']) if (DEFAULT_DISPLAY.includes(fam(k[tag]))) warnings.push(`${tag} is set in ${k[tag]} — a default-look display face`);
      if (DEFAULT_BODY.includes(fam(k.body))) warnings.push(`body is set in ${k.body} — a default-look body face`);
      const { h: H, s: S, l: L } = k.hsl;
      if (H >= 30 && H <= 60 && S < 40 && L > 88) warnings.push(`page ground ${k.ground} is hsl(${H} ${S}% ${L}%) — in the cream range`);
      if (k.labels) warnings.push(`${k.labels} tracked all-caps label(s)`);
      if (k.labelledHeadings) warnings.push(`${k.labelledHeadings} of ${k.headings} headings directly preceded by an all-caps label`);
      t.look = `fonts h1 "${k.h1}" · h2 "${k.h2}" · body "${k.body}"   ground ${k.ground} = hsl(${H} ${S}% ${L}%)   all-caps labels ${k.labels}   labelled headings ${k.labelledHeadings}/${k.headings}`;
    }
    await page.close();
  }
  if (!noShots) {
    // not spawnSync: the page is served from this process, which must stay free to answer
    const sh = await new Promise((res) => {
      let err = '';
      const c = spawn(process.execPath, [SHOOT, url, '--out', t.shots]);
      c.stderr.on('data', (d) => { err += d; });
      c.on('close', (status) => res({ status, err }));
    });
    t.shot = sh.status === 0 ? (t.slug ? path.relative(root, t.shots) : t.shots) : 'shoot.mjs failed: ' + sh.err.trim().split('\n')[0];
  }
  srv.close(); port++;
  console.log(`\n${problems.length ? 'FAIL' : 'ok  '}  ${t.label}`);
  for (const p of problems) console.log('      ' + p);
  console.log('      look: ' + t.look);
  for (const x of warnings) console.log('      WARN default look — ' + x);
  if (t.shot) console.log('      shots: ' + t.shot);
  if (problems.length) fails++;
  rows.push({ page: t.label, problems: problems.length, warnings: warnings.length });
}
await b.close();
console.table(rows);
console.log(`\n${rows.length} page(s) · ${fails} failing · default-look warnings never fail`);
process.exit(fails ? 1 : 0);
