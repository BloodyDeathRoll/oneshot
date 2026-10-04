// critic 4f round-2 probe: contrast of the text in the new ink guests band (photo toned into ink), text hidden, background sampled behind each text run.
// usage: node probe-guests.mjs <url> <out-dir> → guests-contrast.json
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const [url, out] = process.argv.slice(2);
const b = await chromium.launch(); const res = {};
for (const [w, vp, mobile] of [['1440', { width: 1440, height: 900 }, false], ['390', { width: 390, height: 844 }, true]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce' });
  const p = await ctx.newPage(); await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(() => document.querySelector('#guests').scrollIntoView()); await p.waitForTimeout(1500);
  const runs = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('#guests *')) {
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      const rc = el.getBoundingClientRect(); if (!rc.width || rc.bottom < 0 || rc.top > innerHeight) continue;
      const c = getComputedStyle(el); if (c.visibility === 'hidden' || c.display === 'none') continue;
      out.push({ t: el.textContent.trim().slice(0, 30), tag: el.tagName, color: c.color, size: c.fontSize, weight: c.fontWeight, x: Math.max(0, Math.round(rc.left)), y: Math.max(0, Math.round(rc.top)), w: Math.round(rc.width), h: Math.round(rc.height) });
    }
    return out;
  });
  await p.addStyleTag({ content: '#guests *{color:transparent!important;text-shadow:none!important;border-color:transparent!important}#guests .btn,#guests button{visibility:hidden!important}' });
  await p.waitForTimeout(300);
  const f = `${out}/hero/guests-${w}.png`; await p.screenshot({ path: f });
  const py = `
import json,sys
from PIL import Image
import numpy as np
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)/255
runs=json.loads(sys.argv[2]); out=[]
def lum(px):
  lin=np.where(px<=0.04045,px/12.92,((px+0.055)/1.055)**2.4); return 0.2126*lin[...,0]+0.7152*lin[...,1]+0.0722*lin[...,2]
for r in runs:
  px=im[r['y']:r['y']+r['h'], r['x']:r['x']+r['w']].reshape(-1,3)
  if not len(px): continue
  import re
  m=re.findall(r'[\\d.]+', r['color']); rgb=np.array([float(m[0]),float(m[1]),float(m[2])])/255; a=float(m[3]) if len(m)>3 else 1.0
  fg=a*rgb+(1-a)*px
  c=(np.maximum(lum(fg),lum(px))+0.05)/(np.minimum(lum(fg),lum(px))+0.05)
  out.append({'t':r['t'],'size':r['size'],'weight':r['weight'],'color':r['color'],'median':round(float(np.median(c)),2),'p10':round(float(np.percentile(c,10)),2),'min':round(float(c.min()),2)})
print(json.dumps(out))`;
  res[w] = JSON.parse(execFileSync('python3', ['-c', py, f, JSON.stringify(runs)]).toString());
  await ctx.close();
}
fs.writeFileSync(`${out}/guests-contrast.json`, JSON.stringify(res, null, 1)); await b.close();
for (const w in res) { console.log(w); for (const r of res[w]) console.log(' ', JSON.stringify(r)); }
