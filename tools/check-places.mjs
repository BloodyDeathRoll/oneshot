#!/usr/bin/env node
// tools/check-places.mjs — a borrowed photograph may not claim to be somewhere
// it is not.
//
// This exists because of a real mistake. KA Surf Hostel is in Ahangama, and the
// first build of its site carried photographs of Hikkaduwa (33 km up the coast),
// Weligama (8 km east), Thiranagama and Negombo (180 km), plus an Admiralty
// chart plan titled WELIGAMA BAY, all presented as this coast. Shahar:
// "Hikkaduwa beach is NOT IN AHANGAMA. Weligama bay IS NOT IN AHANGAMA."
//
// It is the same class of error as inventing a price: a checkable claim about
// the business that is not true. So it is checked, not remembered.
//
// Every atmosphere image must declare, in dossier/<slug>/stock/index.json:
//   place     — where it was actually taken, in words
//   place_ok  — "local"   the business's own locality, or
//               "neutral" open sea, sky, or a detail with no landmark AND no
//                         other place named in its title or credit
//
// A build fails if an image a mockup uses has place_ok unset, or is "neutral"
// while its title or credit names a place that is not the locality.
//
// Which images a mockup uses: its photos.json when it has one (an Astro project,
// station 4g and every mockup before designer 0.3.0). A 4e mockup is one HTML
// file with no photos.json, so there the stock ids are found in dist/index.html
// and in the filenames under dist/img/. Share-alike at 4e: a CC BY-SA id
// anywhere inside an inline <script> of dist/index.html fails, because a script
// is how a photograph becomes shader or canvas input, and that is an adaptation.
//
//   node tools/check-places.mjs [slug ...]

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));

/* The locality each run's businesses actually sit in, and the places near
   enough on this coast to read as the same stretch. Everything else is a
   different place and may not be shown as this one. */
const LOCALITY = {
  'ka-surf-hostel-and-restaurant': { town: 'Ahangama', near: ['ahangama', 'kabalana', 'welhengoda', 'goviyapana'] },
  'layday-surf-ahangama':          { town: 'Ahangama', near: ['ahangama', 'kabalana', 'welhengoda', 'warnagiri'] },
  'the-lavish-haven':              { town: 'Ahangama', near: ['ahangama', 'kabalana', 'piyadigama'] },
  'cheeky-monkey':                 { town: 'Midigama', near: ['midigama', 'kumbalgama'] },
};
/* Named places on this coast that are NOT the locality. Seen in a title or a
   credit on a page about somewhere else, each one is a false claim. */
const ELSEWHERE = ['hikkaduwa', 'thiranagama', 'weligama', 'welligama', 'mirissa', 'midigama',
                   'galle', 'unawatuna', 'negombo', 'bentota', 'koggala', 'tangalle',
                   'hambantota', 'colombo', 'arugam', 'trincomalee', 'jaffna'];

let fails = 0, checked = 0;
for (const slug of fs.readdirSync(path.join(root, 'sites')).sort()) {
  if (only.length && !only.includes(slug)) continue;
  const mdir = path.join(root, 'sites', slug, 'mockups');
  if (!fs.existsSync(mdir)) continue;
  const stockFile = path.join(root, 'dossier', slug, 'stock', 'index.json');
  if (!fs.existsSync(stockFile)) continue;
  const stock = new Map(JSON.parse(fs.readFileSync(stockFile, 'utf8')).map((s) => [s.id, s]));
  // a fork (<slug>-v2, <slug>-<variant>) is the same business in the same place
  const loc = LOCALITY[slug] ?? LOCALITY[Object.keys(LOCALITY).find((k) => slug.startsWith(k + '-'))];
  if (!loc) { console.log(`FAIL  ${slug}: no locality recorded in tools/check-places.mjs`); fails++; continue; }

  for (const v of fs.readdirSync(mdir)) {
    const pf = path.join(mdir, v, 'photos.json');
    const page = path.join(mdir, v, 'dist', 'index.html');
    let uses;
    if (fs.existsSync(pf)) uses = JSON.parse(fs.readFileSync(pf, 'utf8'));
    else if (fs.existsSync(page)) {
      const html = fs.readFileSync(page, 'utf8');
      const scripts = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).join('\n');
      const imgDir = path.join(mdir, v, 'dist', 'img');
      const names = fs.existsSync(imgDir) ? fs.readdirSync(imgDir).join('\n') : '';
      const has = (text, id) => new RegExp(id.replace(/[^\w-]/g, '\\$&') + '(?!\\d)').test(text);
      uses = [...stock.keys()].filter((id) => has(html, id) || has(names, id))
        .map((id) => ({ id, shader: has(scripts, id), fromPage: true }));
    } else continue;
    const problems = [], warnings = [];
    for (const w of uses) {
      const s = stock.get(w.id);
      if (!s) continue;                                   // the business's own photograph
      checked++;
      /* What matters is what a visitor sees and what we assert: the credit line
         and the recorded place. An archival file can be called anything on
         Commons; that is provenance, not a claim, so it is warned about rather
         than failed. */
      const hay = `${s.credit ?? ''} ${s.place ?? ''}`.toLowerCase();
      const titleHay = (s.title ?? '').toLowerCase();
      if (!s.place_ok) { problems.push(`${w.id}: place_ok is not set — nobody has said where this was taken`); continue; }
      if (!['local', 'neutral'].includes(s.place_ok)) { problems.push(`${w.id}: place_ok is "${s.place_ok}", expected local or neutral`); continue; }
      if (s.place_ok === 'local' && !loc.near.some((n) => hay.includes(n))) {
        problems.push(`${w.id}: marked local but nothing in its title, credit or place names ${loc.town}`);
      }
      const wrong = ELSEWHERE.filter((e) => hay.includes(e) && !loc.near.includes(e));
      if (wrong.length) {
        problems.push(`${w.id}: names ${wrong.join(', ')} — that is not ${loc.town}. "${(s.title ?? '').slice(0, 48)}"`);
      }
      const titleWrong = ELSEWHERE.filter((e) => titleHay.includes(e) && !loc.near.includes(e) && !hay.includes(e));
      if (titleWrong.length) warnings.push(`${w.id}: the source file is called "${(s.title ?? '').slice(0, 46)}", which names ${titleWrong.join(', ')}. The displayed credit does not, so this is provenance rather than a claim — but check the picture is not of ${titleWrong[0]}.`);
      if (!s.credit) problems.push(`${w.id}: no credit string`);
      const shareAlike = s.modify === false || /BY-SA/i.test(s.license_name ?? '');
      if (shareAlike && w.shader) problems.push(`${w.id}: ${s.license_name} is share-alike, so it may be shown but not adapted; it ${w.fromPage ? 'appears inside an inline <script> of dist/index.html' : 'is marked as shader input'}`);
    }
    if (warnings.length) { console.log(`\nWARN  ${slug} / ${v}`); for (const w of warnings) console.log('      ' + w); }
    if (problems.length) {
      fails++; console.log(`\nFAIL  ${slug} / ${v}`);
      for (const p of problems) console.log('      ' + p);
    }
  }
}
console.log(`\n${checked} borrowed image use(s) checked · ${fails} failing mockup(s)`);
process.exit(fails ? 1 : 0);
