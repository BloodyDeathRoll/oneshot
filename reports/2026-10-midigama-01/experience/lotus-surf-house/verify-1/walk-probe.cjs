const WT = process.env.WT;
const { chromium, devices } = require(WT + '/node_modules/playwright');
const OUT = WT + '/reports/2026-10-midigama-01/experience/lotus-surf-house/verify-1/states/';
const U = 'https://lotus-surf-house.os1.workers.dev/';
const L = (...a) => console.log(...a);
const phone = { ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

(async () => {
  const b = await chromium.launch();

  // A traveller's phone in Sri Lanka: what the forecast block says on their clock.
  const c = await b.newContext({ ...phone, timezoneId: 'Asia/Colombo' });
  const p = await c.newPage();
  await p.goto(U, { waitUntil: 'load' });
  L('clock in Colombo', await p.evaluate(() => new Date().toLocaleString('en-GB')));
  L('hero images', JSON.stringify(await p.evaluate(() => [...document.images].slice(0, 14).map((g) => ({ src: g.currentSrc.split('/').pop(), loading: g.loading, top: Math.round(g.getBoundingClientRect().top + scrollY), natural: g.naturalWidth, shown: Math.round(g.getBoundingClientRect().width) })))));

  // The header scrim once the phone header has slid away.
  await p.evaluate(() => window.scrollTo(0, 6800));
  await p.waitForTimeout(900);
  L('header scrim', JSON.stringify(await p.evaluate(() => {
    const t = document.querySelector('.top'), r = t.getBoundingClientRect(), s = getComputedStyle(t, '::before');
    return { cls: t.className, topBottom: Math.round(r.bottom), transform: getComputedStyle(t).transform, scrimBg: s.backgroundImage, scrimBottom: s.bottom, scrimOpacity: s.opacity };
  })));
  await p.screenshot({ path: OUT + 'scrim-white-section.png', clip: { x: 0, y: 0, width: 390, height: 120 } });

  await p.evaluate(() => { const r = document.querySelector('.fc').getBoundingClientRect(); window.scrollTo(0, scrollY + r.top - 90); });
  await p.waitForTimeout(3000);
  L('headline', JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('.fc-now .nh, .fc-now .nd span, .fc-now .upd span')].map((e) => e.innerText))));
  const fr = p.frames().find((f) => /rosa\.surf/.test(f.url()));
  L('widget', fr ? JSON.stringify((await fr.evaluate(() => document.body.innerText.slice(0, 120))).replace(/\n/g, ' | ')) : 'no frame');

  // Gaps inside the block, measured.
  L('block', JSON.stringify(await p.evaluate(() => {
    const f = document.querySelector('.fc'), n = f.querySelector('.fc-now'), w = f.querySelector('.fc-rosa'), cs = getComputedStyle(f);
    const sec = document.getElementById('getting-here').getBoundingClientRect();
    return { fcH: Math.round(f.getBoundingClientRect().height), marginTop: cs.marginTop, paddingTop: cs.paddingTop, borderTop: cs.borderTopWidth, card: Math.round(n.getBoundingClientRect().height), widgetBox: Math.round(w.getBoundingClientRect().height), sectionH: Math.round(sec.height), pageH: document.documentElement.scrollHeight };
  })));
  L('rosa mentions before the block', await p.evaluate(() => {
    const t = document.body.innerText, i = t.indexOf('Forecast for Lazy Left');
    return { lazyLeftBefore: t.slice(0, i).includes('Lazy Left'), surfWordsBefore: (t.slice(0, i).match(/\b(surf|wave|break|board)\w*/gi) || []).length, samples: (t.slice(0, i).match(/[^.\n]*\b(surf|wave|break|board)\w*[^.\n]*/gi) || []).slice(0, 8).map((s) => s.trim().slice(0, 80)) };
  }));
  await c.close();
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
