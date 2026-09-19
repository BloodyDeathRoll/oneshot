// Screenshot every built mockup at 390px and 1440px, over a local http server.
import fs from 'node:fs'; import path from 'node:path'; import http from 'node:http';
import { chromium } from '/home/shahar/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core/index.mjs';
const root = process.cwd();
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
const serve = (dir, port) => new Promise(res => {
  const s = http.createServer((req, rp) => {
    let f = path.join(dir, decodeURIComponent(req.url.split('?')[0]));
    if (f.endsWith('/')) f += 'index.html';
    fs.readFile(f, (e, b) => e ? (rp.statusCode = 404, rp.end('nope'))
      : (rp.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream'), rp.end(b)));
  }).listen(port, () => res(s));
});
const b = await chromium.launch();
const rows = [];
let port = 8900;
for (const slug of fs.readdirSync(path.join(root,'sites'))) {
  const mdir = path.join(root,'sites',slug,'mockups');
  if (!fs.existsSync(mdir)) continue;
  for (const v of fs.readdirSync(mdir)) {
    const dist = path.join(mdir, v, 'dist');
    if (!fs.existsSync(dist)) continue;
    const srv = await serve(dist, port);
    const url = `http://localhost:${port}/`;
    const shots = path.join(mdir, v, 'shots'); fs.mkdirSync(shots, { recursive: true });
    const m = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
    await m.goto(url, { waitUntil:'networkidle' }); await m.waitForTimeout(600);
    await m.screenshot({ path: path.join(shots,'mobile.png'), fullPage:true });
    const d = await b.newPage({ viewport:{width:1440,height:900} });
    await d.goto(url, { waitUntil:'networkidle' }); await d.waitForTimeout(600);
    await d.screenshot({ path: path.join(shots,'desktop.png'), fullPage:true });
    const bad = await d.$$eval('img', e => e.filter(i => !i.naturalWidth).length);
    const bytes = fs.readdirSync(dist, { recursive:true }).map(f => { try { return fs.statSync(path.join(dist,f)).size } catch { return 0 } }).reduce((a,c)=>a+c,0);
    rows.push({ slug, variant:v, brokenImages:bad, distKB: Math.round(bytes/1024) });
    await m.close(); await d.close(); srv.close(); port++;
  }
}
await b.close();
console.table(rows);
