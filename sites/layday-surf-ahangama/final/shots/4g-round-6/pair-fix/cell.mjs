import { chromium } from 'playwright';
const b = await chromium.launch();
for (const w of [1440,1525,1560,1600,1640,1660,1680,1700,1703,1704]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, javaScriptEnabled: false })).newPage();
  await p.goto('http://127.0.0.1:8751/');
  const r = await p.evaluate(() => { const c = document.querySelector('.room .pair'), q = document.querySelector('.room .beth'); const i = c.querySelectorAll('img'); return [Math.round(c.getBoundingClientRect().width), Math.round(i[0].getBoundingClientRect().left), Math.round(q.getBoundingClientRect().right)]; });
  console.log(w, 'cell', r[0], 'img0 left', r[1], 'quote right', r[2]);
}
await b.close();
