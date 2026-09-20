#!/usr/bin/env node
// tools/fetch-atmosphere.mjs — fetch freely-licensed ATMOSPHERE photography.
//
// Policy (PLAN.md §9, decided 2026-09-20): a business may use freely-licensed
// photographs of its PLACE — the coast, the wave, the light, the town — when its
// own photographs cannot carry a page. Its own photographs stay the only source
// for anything about the business itself.
//
// The hard line, which rubric.md already fails a build for: **a non-business
// photograph is never presented as the business.** No stock room, no stock
// breakfast, no stock person implying they are staff or guests. Sea, sky, palms,
// coastline, surf, the town — nothing with a bed, a plate or a face in it that a
// visitor could read as "this is the place I am booking".
//
// Source: Wikimedia Commons, because it carries real photographs of these actual
// villages with machine-readable licences and a named author. Only CC0 and CC BY
// are taken: share-alike would put an obligation on the client's whole site, and
// nothing here is worth that.
//
//   node tools/fetch-atmosphere.mjs <slug> "<query>" [more queries...]
//
// Writes dossier/<slug>/stock/<id>.jpg and maintains dossier/<slug>/stock/index.json
// with the attribution every use of the file must carry.

import fs from 'node:fs';
import path from 'node:path';

const UA = 'oneshot/0.1 (site builder for small surf businesses; shaharnaor@outlook.com)';
const OK_LICENCES = new Set(['cc0', 'cc by 1.0', 'cc by 2.0', 'cc by 2.5', 'cc by 3.0', 'cc by 4.0', 'public domain']);
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

let n = index.length;
for (const q of queries) {
  const d = await api({ action: 'query', generator: 'search', gsrsearch: q, gsrnamespace: '6',
                        gsrlimit: '20', prop: 'imageinfo', iiprop: 'url|size|extmetadata' });
  const pages = Object.values(d?.query?.pages ?? {});
  for (const p of pages.sort((a, b) => b.imageinfo[0].width - a.imageinfo[0].width)) {
    const ii = p.imageinfo[0], em = ii.extmetadata ?? {};
    const licence = strip(em.LicenseShortName?.value).toLowerCase();
    if (ii.width < MIN_WIDTH) continue;
    if (!OK_LICENCES.has(licence)) continue;              // no share-alike, no NC, no ND
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
      license_name: strip(em.LicenseShortName?.value),
      license_url: strip(em.LicenseUrl?.value) || null,
      author,
      source: 'Wikimedia Commons',
      source_url: ii.descriptionurl,
      fetched_at: new Date().toISOString(),
      query: q,
      /* the exact string every page using this file must show */
      credit: `${p.title.replace(/^File:/, '').replace(/\.[a-z]+$/i, '')} — ${author}, ${strip(em.LicenseShortName?.value)}, via Wikimedia Commons`,
      use: 'ATMOSPHERE ONLY — the place, never the business. Must not be captioned or positioned so a visitor could read it as a photograph of this business.',
      description: null,   // filled in by whoever looks at it
    };
    index.push(entry); have.add(ii.descriptionurl);
    console.log(`${id}  ${ii.width}x${ii.height}  ${entry.license_name.padEnd(10)}  ${entry.title.slice(0, 52)}`);
    if (index.length >= 24) break;
  }
  if (index.length >= 24) break;
}

fs.writeFileSync(indexFile, JSON.stringify(index, null, 1));
console.log(`\n${index.length} atmosphere image(s) in ${outDir}. Every one is CC0 or CC BY — no share-alike.`);
console.log('Each carries the credit string that any page using it must display.');
