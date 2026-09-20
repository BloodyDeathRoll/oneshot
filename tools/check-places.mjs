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
// A build fails if an image in a mockup's photos.json has place_ok unset, or is
// "neutral" while its title or credit names a place that is not the locality.
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
  const loc = LOCALITY[slug];
  if (!loc) { console.log(`FAIL  ${slug}: no locality recorded in tools/check-places.mjs`); fails++; continue; }

  for (const v of fs.readdirSync(mdir)) {
    const pf = path.join(mdir, v, 'photos.json');
    if (!fs.existsSync(pf)) continue;
    const problems = [], warnings = [];
    for (const w of JSON.parse(fs.readFileSync(pf, 'utf8'))) {
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
      if (s.modify === false && w.shader) problems.push(`${w.id}: ${s.license_name} is share-alike, so it may be shown but not adapted; it is marked as shader input`);
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
