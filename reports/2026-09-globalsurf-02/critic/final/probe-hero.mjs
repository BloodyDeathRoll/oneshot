// critic station 5 r1 (4f r2 probe, unchanged): hero title background contrast, poster + ffmpeg-extracted loop frames (d1920 desktop, p546 portrait phone) drawn in the poster place, shade on, title hidden.
// usage: node probe-hero.mjs <url> <out-dir>   → hero-contrast.json + hero/<w>-<t>.png (scratch)
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const [url, out] = process.argv.slice(2);
fs.mkdirSync(`${out}/hero`, { recursive: true });
const b = await chromium.launch();
const res = {};
for (const [w, vp, mobile] of [['1440', { width: 1440, height: 900 }, false], ['390', { width: 390, height: 844 }, true]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(3500);
  // hide the title glyphs and their shadow; keep the ::before shade
  await p.addStyleTag({ content: '.hero h1{color:transparent!important;text-shadow:none!important}.hero .btn,.hdr{visibility:hidden!important}' });
  const box = await p.evaluate(() => {
    const h = document.querySelector('.hero h1'); const r = document.createRange(); r.selectNodeContents(h);
    const rs = [...r.getClientRects()].map((x) => ({ x: Math.round(x.left), y: Math.round(x.top), w: Math.round(x.width), h: Math.round(x.height) }));
    return rs;
  });
  res[w] = { line_boxes: box, frames: {} };
  const times = ['poster', '0.5', '2.0', '3.4', '4.2', '4.8', '5.4', '6.5', '7.5', '8.5', '9.0', '9.8'];
  for (const t of times) {
    const arg = t === 'poster' ? t : 'data:image/jpeg;base64,' + fs.readFileSync(`${out}/hero/frames/${w === '1440' ? 'd' : 'm'}-${t}.jpg`).toString('base64');
    const info = await p.evaluate(async (t) => {
      const v = document.querySelector('.hero video');
      if (t === 'poster') { if (v) v.style.visibility = 'hidden'; return { src: v && v.currentSrc, mode: 'poster' }; }
      if (!v) return { err: 'no video' };
      v.style.visibility = 'hidden';
      const img = document.querySelector('.hero-p img'); img.removeAttribute('srcset'); const pic = img.closest('picture'); if (pic) pic.querySelectorAll('source').forEach((s) => s.remove());
      img.src = t; await img.decode().catch(() => {});
      return { frame: t.split('/').pop() };
    }, arg);
    if (t !== 'poster') info.frame = `${w === '1440' ? 'd' : 'm'}-${t}.jpg`;
    await p.waitForTimeout(400);
    const f = `${out}/hero/${w}-${t}.png`;
    await p.screenshot({ path: f });
    // stats over every line box of the title
    const py = `
import json,sys
from PIL import Image
import numpy as np
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)/255
boxes=json.loads(sys.argv[2])
px=np.concatenate([im[b['y']:b['y']+b['h'], b['x']:b['x']+b['w']].reshape(-1,3) for b in boxes])
lin=np.where(px<=0.04045,px/12.92,((px+0.055)/1.055)**2.4)
L=0.2126*lin[:,0]+0.7152*lin[:,1]+0.0722*lin[:,2]
c=1.05/(L+0.05)
print(json.dumps({'median':round(float(np.median(c)),2),'p10_lightest':round(float(np.percentile(c,10)),2),'min':round(float(c.min()),2),'share_under_3':round(float((c<3).mean()),3),'mean_rgb':[round(float(x*255)) for x in px.mean(0)]}))`;
    const stats = JSON.parse(execFileSync('python3', ['-c', py, f, JSON.stringify(box)]).toString());
    res[w].frames[t] = { ...info, ...stats };
  }
  await ctx.close();
}
fs.writeFileSync(`${out}/hero-contrast.json`, JSON.stringify(res, null, 1));
await b.close();
console.log(JSON.stringify(res, null, 1));
