// Prerender the Hebrew Home into dist/index.html, so the page is whole before (and without) JavaScript.
// The script then enhances that markup in place (page.js boot(): chrome(false), route(null, false)).
// Usage: node sites/talouloren/mockups/unique/src/prerender.mjs  (run by build.py)
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
const file = fileURLToPath(new URL('../dist/index.html', import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await p.goto(pathToFileURL(file).href + '?prerender'); await p.waitForFunction(() => document.getElementById('main').children.length > 0);
const parts = await p.evaluate(() => ({ HDR: hdr.innerHTML, MENU: menu.innerHTML, MAIN: main.innerHTML, FTR: ftr.innerHTML, BAR: bar.innerHTML, CHIP: chip.outerHTML,
  title: document.title, desc: document.querySelector('meta[name=description]').content }));
await b.close();
let html = readFileSync(file, 'utf8');
html = html.replace('<a id="chip"></a>', () => parts.CHIP);
for (const k of ['HDR', 'MENU', 'MAIN', 'FTR', 'BAR']) { if (!html.includes(`<!--${k}-->`)) throw new Error('slot ' + k); html = html.replace(`<!--${k}-->`, () => parts[k]); }
html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${parts.title}</title>`).replace('<meta name="description" content="">', () => `<meta name="description" content="${parts.desc.replace(/"/g, '&quot;')}">`);
html = html.replace('<main id="main" tabindex="-1">', '<main id="main" tabindex="-1" data-pre="he">');
writeFileSync(file, html);
if (!/<h1/.test(parts.MAIN) || !/wa\.me\/972504635536/.test(html)) throw new Error('prerender missing h1 or WhatsApp link');
console.log('prerendered', Math.round(html.length / 1024), 'KB');
