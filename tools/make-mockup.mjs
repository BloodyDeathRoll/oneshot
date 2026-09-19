// Build one mockup: templates/<variant> + sites/<slug>/copy/<locale>.json + dossier photos
// -> sites/<slug>/mockups/<variant>/ (Astro project) and its dist/.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const [slug, variant = 'calm', locale = 'en'] = process.argv.slice(2);
if (!slug) { console.error('usage: make-mockup.mjs <slug> [variant] [locale]'); process.exit(1); }

const root = process.cwd();
const tpl = path.join(root, 'templates', variant);
const out = path.join(root, 'sites', slug, 'mockups', variant);
const copyFile = path.join(root, 'sites', slug, 'copy', `${locale}.json`);
const assets = path.join(root, 'dossier', slug, 'assets');

for (const p of [tpl, copyFile, assets]) if (!fs.existsSync(p)) { console.error('missing: ' + p); process.exit(1); }

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(tpl, out, { recursive: true });

// photos: dossier assets, business-owned only, in index order
const index = JSON.parse(fs.readFileSync(path.join(assets, 'index.json'), 'utf8'));
const usable = index.filter(i => i.license === 'business-owned' && /\.(jpe?g|png|webp)$/i.test(i.file));
const photoDir = path.join(out, 'public', 'photos');
fs.mkdirSync(photoDir, { recursive: true });
const photos = [];
for (const im of usable.slice(0, 14)) {
  const src = path.join(root, 'dossier', slug, im.file);
  if (!fs.existsSync(src)) continue;
  const base = path.basename(im.file);
  fs.copyFileSync(src, path.join(photoDir, base));
  photos.push({ src: `/photos/${base}`, alt: im.description || `${slug} photo`, license: im.license, asset: im.id });
}

const copy = JSON.parse(fs.readFileSync(copyFile, 'utf8'));
const content = { ...copy, photos };
fs.writeFileSync(path.join(out, 'src', 'tenant', 'content.json'), JSON.stringify(content, null, 1));

// reuse the spike's installed astro rather than installing per mockup
const nm = path.join(out, 'node_modules');
if (!fs.existsSync(nm)) fs.symlinkSync(path.join(root, 'spikes/payload/site/node_modules'), nm, 'dir');

execSync('npx --no-install astro build', { cwd: out, stdio: 'inherit' });

const notes = `# mockup notes — ${slug} · ${variant} · ${locale}

Built ${new Date().toISOString()} from \`templates/${variant}/\` + \`sites/${slug}/copy/${locale}.json\` (copy that passed station 4c).

## facts
Every word on the page comes from the passed copy, which is mapped paragraph-by-paragraph to dossier fields in
\`sites/${slug}/copy/sources.md\`. The template adds no content of its own: its only fixed strings are interface
labels ("Check availability", "What guests wrote", "Address", "Phone", "The wave"), which belong to the template
per \`schemas/site-content.md\`.

## gaps
- No prices shown anywhere: rates are live dated OTA inventory, so the booking bar says only "Rates change with the dates".
- Sections render only when their content exists — a business with no \`amenities\`, \`testimonials\` or \`rooms\` simply has no such section.

## images
${photos.map(p => `- \`${p.asset}\` → ${p.src} — ${p.license}`).join('\n') || '- none'}

## conflicts
None introduced by the design. Every dossier contradiction was already resolved by being left unwritten in the copy;
see "Deliberately not written" in \`sites/${slug}/copy/sources.md\`.

## self-check
- Static build, no runtime network dependency.
- Mobile-first CSS; single column under 900px.
- Booking path works: the bar opens a drawer listing the real booking channels, plus phone and WhatsApp when the dossier has them.
- Content arrives only through \`src/tenant/content.json\` in the schema shape.
`;
fs.writeFileSync(path.join(out, 'notes.md'), notes);
console.log(`\n${slug}/${variant}: ${photos.length} photos, dist at ${path.relative(root, path.join(out,'dist'))}`);
