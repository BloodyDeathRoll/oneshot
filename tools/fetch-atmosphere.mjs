#!/usr/bin/env node
// tools/fetch-atmosphere.mjs — fetch freely-licensed ATMOSPHERE photography.
//
// Policy (PLAN.md §9, decided 2026-09-20, tightened 2026-09-20 after a real
// mistake): a business may use freely-licensed photographs of ITS OWN PLACE.
//
// Two hard lines, both of which have now been crossed once:
//
// 1. **Never presented as the business.** No borrowed room, pool, meal or face.
//    Caught on the first run: a five-star hotel's suite and infinity pool were
//    fetched and deleted before use.
//
// 2. **Never presented as somewhere it is not.** The first build of KA's site
//    carried photographs of Hikkaduwa (33 km away), Weligama (8 km), Thiranagama
//    and Negombo (180 km) on a page about Ahangama, and an Admiralty chart plan
//    of *Weligama Bay* captioned as this coast. Shahar: "Hikkaduwa beach is NOT
//    IN AHANGAMA. Weligama bay IS NOT IN AHANGAMA." He is right, and it is the
//    same class of error as inventing a price. Every entry now carries `place`
//    and `place_ok`, and `tools/check-places.mjs` fails a build that uses an
//    image whose place is not the business's own locality or explicitly
//    place-neutral (open sea, sky, a wave with no landmark).
//
// Source: Wikimedia Commons, which carries real photographs of these villages
// with a machine-readable licence and a named author.
//
// Licences: CC0, public domain and CC BY are taken for any use. **CC BY-SA is
// taken too, but marked `modify: false`** — share-alike binds adaptations, so
// such a file may be displayed whole with its credit and may not be cropped,
// re-saved, recoloured or fed through a shader. That distinction is what makes
// the genuinely-Ahangama photography usable at all: almost all of it is BY-SA.
//
//   node tools/fetch-atmosphere.mjs <slug> "<query>" [more queries...]
//
// Writes dossier/<slug>/stock/<id>.jpg and maintains dossier/<slug>/stock/index.json
// with the attribution every use of the file must carry.

import fs from 'node:fs';
import path from 'node:path';

const UA = 'oneshot/0.1 (site builder for small surf businesses; shaharnaor@outlook.com)';
const FREE = new Set(['cc0', 'cc by 1.0', 'cc by 2.0', 'cc by 2.5', 'cc by 3.0', 'cc by 4.0', 'public domain']);
const SHARE_ALIKE = /^cc by-sa /;
const MIN_WIDTH = 1600;

const [slug, ...queries] = process.argv.slice(2);
if (!slug || !queries.length) {
  console.error('usage: fetch-atmosphere.mjs <slug> "<query>" [more queries...]');
  process.exit(2);
}

const strip = (s) => (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const api = async (params) => {
  const u = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({ format: 'json', ...params });
  const r = await fetch(u, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`commons ${r.status}`);
  return r.json();
};

const outDir = path.join('dossier', slug, 'stock');
fs.mkdirSync(outDir, { recursive: true });
const indexFile = path.join(outDir, 'index.json');
const index = fs.existsSync(indexFile) ? JSON.parse(fs.readFileSync(indexFile, 'utf8')) : [];
const have = new Set(index.map((i) => i.source_url));

/* Number on from the highest id issued, not from the count: entries are deleted after the look
   (last lines of this file), and a count would re-issue an id that is still in use. */
let n = Math.max(0, ...index.map((i) => Number(/^stock-(\d+)$/.exec(i.id)?.[1] ?? 0)));
for (const q of queries) {
  const d = await api({ action: 'query', generator: 'search', gsrsearch: q, gsrnamespace: '6',
                        gsrlimit: '20', prop: 'imageinfo', iiprop: 'url|size|extmetadata' });
  const pages = Object.values(d?.query?.pages ?? {});
  for (const p of pages.sort((a, b) => b.imageinfo[0].width - a.imageinfo[0].width)) {
    const ii = p.imageinfo[0], em = ii.extmetadata ?? {};
    const licence = strip(em.LicenseShortName?.value).toLowerCase();
    if (ii.width < MIN_WIDTH) continue;
    const free = FREE.has(licence);
    const shareAlike = SHARE_ALIKE.test(licence);
    if (!free && !shareAlike) continue;                   // no NC, no ND, nothing unclear
    if (have.has(ii.descriptionurl)) continue;
    if (!/\.(jpe?g|png)$/i.test(ii.url.split('?')[0])) continue;

    /* Commons rate-limits, and a throttled request answers with an HTML error
       page, not an image. Check the bytes, not the status line. */
    let buf = null;
    for (let attempt = 0; attempt < 3 && !buf; attempt++) {
      if (attempt) await new Promise((r) => setTimeout(r, 1500 * attempt));
      const res = await fetch(ii.url, { headers: { 'User-Agent': UA, Accept: 'image/*' } });
      const b = Buffer.from(await res.arrayBuffer());
      const jpeg = b[0] === 0xff && b[1] === 0xd8;
      const png = b[0] === 0x89 && b[1] === 0x50;
      if ((jpeg || png) && b.length > 20000) buf = b;
    }
    if (!buf) { console.log(`  skipped ${p.title.slice(5, 50)} — Commons would not serve the file`); continue; }

    const id = `stock-${String(++n).padStart(3, '0')}`;
    const file = `stock/${id}.jpg`;
    fs.writeFileSync(path.join('dossier', slug, file), buf);
    await new Promise((r) => setTimeout(r, 400));   // be a good citizen

    const author = strip(em.Artist?.value) || 'unknown';
    const entry = {
      id, file,
      title: p.title.replace(/^File:/, ''),
      width: ii.width, height: ii.height, bytes: buf.length,
      license: 'stock-cc',
      /* share-alike may be shown, not adapted */
      modify: free,
      /* filled in by whoever looks at the picture; the build refuses an image
         with place_ok unset */
      place: null,
      place_ok: null,
      license_name: strip(em.LicenseShortName?.value),
      license_url: strip(em.LicenseUrl?.value) || null,
      author,
      source: 'Wikimedia Commons',
      source_url: ii.descriptionurl,
      fetched_at: new Date().toISOString(),
      query: q,
      /* the exact string every page using this file must show */
      credit: `${p.title.replace(/^File:/, '').replace(/\.[a-z]+$/i, '')} — ${author}, ${strip(em.LicenseShortName?.value)}, via Wikimedia Commons`,
      use: 'ATMOSPHERE ONLY. Never presented as the business, and never presented as a place it is not. Set place to where it actually was taken and place_ok to "local" or "neutral" after looking at it.',
      description: null,   // filled in by whoever looks at it
    };
    index.push(entry); have.add(ii.descriptionurl);
    fs.writeFileSync(indexFile, JSON.stringify(index, null, 1));   // a later Commons error must not lose this record
    console.log(`${id}  ${String(ii.width).padStart(5)}x${ii.height}  ${entry.license_name.padEnd(12)}  ${free ? 'may adapt ' : 'show only '}  ${entry.title.slice(0, 46)}`);
    if (index.length >= 24) break;
  }
  if (index.length >= 24) break;
}

fs.writeFileSync(indexFile, JSON.stringify(index, null, 1));
console.log(`\n${index.length} atmosphere image(s) in ${outDir}.`);
console.log('Now LOOK at every one, set its "place" and "place_ok", and delete anything that is');
console.log('not this business\'s own locality or genuinely place-neutral. Filenames lie.');
