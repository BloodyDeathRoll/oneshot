import { chromium } from 'playwright';
const [url, out] = process.argv.slice(2);
const b = await chromium.launch();
for (const [name, vp, mob] of [['1440', {width:1440,height:900}, false], ['390', {width:390,height:844}, true]]) {
  const p = await b.newPage({viewport: vp, deviceScaleFactor: 1, isMobile: mob, hasTouch: mob});
  await p.goto(url); await p.waitForTimeout(600);
  await p.screenshot({path: `${out}/hero-${name}-poster.png`});
  await p.waitForFunction(() => { const v = document.querySelector('.hero-v'); return v && v.readyState >= 3; }, null, {timeout: 20000});
  for (const t of [0.5, 3.4, 4.8, 7.5, 9.8]) {
    await p.evaluate((t) => { const v = document.querySelector('.hero-v'); v.pause(); v.currentTime = t; }, t);
    await p.waitForTimeout(500);
    await p.screenshot({path: `${out}/hero-${name}-t${t}.png`});
  }
  await p.close();
}
await b.close();
