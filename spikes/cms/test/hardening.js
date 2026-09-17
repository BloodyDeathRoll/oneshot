#!/usr/bin/env node
/*
 * Hardening probes against FRESH root instances (run ./serve.sh up first; smoke.js must not
 * have been run on them, because this script does the first-run itself).
 *   node hardening.js
 * Probes (PLAN.md §6 hardening list): admin path rename, 2FA availability, upload whitelist,
 * login throttling, direct access to data files. Prints OBSERVATIONS, not pass/fail: read them.
 * It edits config files inside test/out/www/ only.
 */
const { chromium } = require('playwright-core');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const WWW = process.env.WORK || path.join(__dirname, 'out', 'www');
const FIX = path.join(__dirname, 'fixtures');
const PASS = 'Sp1ke-' + crypto.randomBytes(12).toString('base64url');
const say = (cms, what, result) => console.log(`[${cms}] ${what}: ${result}`);
const status = async (url) => { const r = await fetch(url, { redirect: 'manual' }); return r.status; };

async function grav(browser) {
  const base = 'http://localhost:8081/', root = path.join(WWW, 'grav-root');
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 1100 } });
  const p = await ctx.newPage(); p.setDefaultTimeout(20000);
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.fill('#username', 'spikeowner'); await p.fill('#email', 'owner@example.invalid');
  await p.fill('#password', PASS); await p.fill('#confirm', PASS);
  await p.click('button:has-text("Create administrator")');
  await p.waitForURL(u => !u.toString().includes('/setup')); await p.waitForLoadState('networkidle');

  // data files over HTTP
  for (const f of ['user/accounts/spikeowner.yaml', 'user/config/system.yaml', 'user/pages/02.lessons/prices.md', 'logs/grav.log', 'backup/', 'vendor/autoload.php'])
    say('grav', `GET /${f}`, await status(base + f));

  // upload whitelist through the page media uploader
  await p.goto(base + 'admin/pages/edit/home', { waitUntil: 'load' }); await p.waitForSelector('text=Page Media');
  for (const f of ['evil.php', 'evil.svg']) {
    const resp = p.waitForResponse(r => r.url().includes('/media') && r.request().method() === 'POST', { timeout: 15000 }).catch(() => null);
    await p.locator('input[type=file]').first().setInputFiles(path.join(FIX, f));
    const r = await resp; say('grav', `upload ${f}`, r ? `${r.status()} ${(await r.text()).slice(0, 110)}` : 'no request sent');
    await p.waitForTimeout(3000);
  }
  const svg = path.join(root, 'user/pages/01.home/evil.svg');
  say('grav', 'stored evil.svg', fs.existsSync(svg) ? fs.readFileSync(svg, 'utf8').trim() : 'not stored');
  say('grav', 'any .php under user/pages', fs.readdirSync(path.join(root, 'user/pages/01.home')).filter(f => /php/i.test(f)).join(',') || 'none');

  // 2FA: is there an owner-reachable enrolment UI?
  await p.goto(base + 'admin/users', { waitUntil: 'networkidle' });
  await p.locator('text=spikeowner').first().click().catch(() => {});
  await p.waitForTimeout(2500);
  const userText = await p.locator('body').innerText();
  say('grav', 'user screen mentions 2FA', /two.?factor|2fa/i.test(userText) ? 'yes: "' + (userText.match(/[^\n]*(two.?factor|2fa)[^\n]*/i) || [''])[0].trim().slice(0, 80) + '"' : 'no');
  await p.screenshot({ path: path.join(__dirname, 'out', 'shots', 'grav-user-2fa.png'), fullPage: true });

  // login throttling: 7 wrong passwords against the endpoint the login form posts to
  for (let i = 1; i <= 7; i++) {
    const r = await fetch(base + 'api/v1/auth/token', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ username: 'spikeowner', password: 'wrong-' + i }) });
    if (i === 1 || i >= 5) say('grav', `wrong login #${i}`, `${r.status} ${(await r.text()).slice(0, 110)}`);
  }

  // admin path rename by config only
  fs.mkdirSync(path.join(root, 'user/config/plugins'), { recursive: true });
  fs.writeFileSync(path.join(root, 'user/config/plugins/admin2.yaml'), 'enabled: true\nroute: /desk-7f3k\n');
  await p.waitForTimeout(1500);
  say('grav', 'after route rename: GET /admin', await status(base + 'admin'));
  const c3 = await browser.newContext(); const r3 = await c3.newPage();
  const resp = await r3.goto(base + 'desk-7f3k', { waitUntil: 'networkidle' });
  say('grav', 'after route rename: GET /desk-7f3k', `${resp.status()} -> ${r3.url()} password field: ${await r3.locator('input[type=password]').count()}`);
  await c3.close(); await ctx.close();
}

async function bludit(browser) {
  const base = 'http://localhost:8083/', root = path.join(WWW, 'bludit-root');
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 1100 } });
  const p = await ctx.newPage(); p.setDefaultTimeout(20000);
  await p.goto(base + 'first-run.php'); await p.fill('input[name=password]', PASS); await p.fill('input[name=confirm]', PASS); await p.click('button[type=submit]');
  await p.goto(base + 'admin/'); await p.fill('input[name=username]', 'admin'); await p.fill('input[name=password]', PASS); await p.click('button[type=submit]'); await p.waitForLoadState('load');

  for (const f of ['bl-content/databases/users.php', 'bl-content/databases/site.php', 'bl-content/pages/home/index.txt', 'bl-content/uploads/', 'bl-kernel/boot/init.php', 'bl-plugins/tinymce/plugin.php'])
    say('bludit', `GET /${f}`, await status(base + f));
  say('bludit', 'body of GET /bl-plugins/tinymce/plugin.php', (await (await fetch(base + 'bl-plugins/tinymce/plugin.php')).text()).replace(/\s+/g, ' ').slice(0, 140));

  // upload whitelist, posting straight to the endpoint (bypasses the browser-side filter)
  await p.goto(base + 'admin/edit-content/home', { waitUntil: 'load' });
  for (const f of ['evil.php', 'evil.svg', 'evil.php.jpg']) {
    const body = fs.readFileSync(path.join(FIX, f)).toString('base64');
    const out = await p.evaluate(async ([name, b64]) => {
      const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const fd = new FormData(); fd.append('tokenCSRF', tokenCSRF); fd.append('uuid', '0a1b2c3d4e5f60718293a4b5c6d7e8f1');
      fd.append('images[]', new File([bytes], name, { type: 'image/jpeg' }));
      const r = await fetch(HTML_PATH_ADMIN_ROOT + 'ajax/upload-images', { method: 'POST', body: fd }); return r.status + ' ' + (await r.text()).slice(0, 120);
    }, [f, body]);
    say('bludit', `upload ${f}`, out);
  }
  const up = path.join(root, 'bl-content/uploads/pages/0a1b2c3d4e5f60718293a4b5c6d7e8f1');
  say('bludit', 'files now in the page upload folder', fs.readdirSync(up).join(', '));
  const svg = path.join(up, 'evil-svg.svg');
  say('bludit', 'stored evil-svg.svg', fs.existsSync(svg) ? fs.readFileSync(svg, 'utf8').trim() : 'not stored');
  const j = await fetch(base + 'bl-content/uploads/pages/0a1b2c3d4e5f60718293a4b5c6d7e8f1/evil-php-jpg.jpg');
  const jt = await j.text(); // if PHP had run, the "<?php" source would be gone from the body
  say('bludit', 'GET evil-php-jpg.jpg', `${j.status} ${j.headers.get('content-type')} php-executed=${!jt.includes('<?php')}`);

  // 2FA
  await p.goto(base + 'admin/edit-user/admin', { waitUntil: 'load' });
  say('bludit', 'user screen mentions 2FA', /two.?factor|2fa|authenticator/i.test(await p.locator('body').innerText()) ? 'yes' : 'no');

  // login throttling: 12 wrong passwords (security.php: numberFailuresAllowed 10, minutesBlocked 5)
  const c2 = await browser.newContext(); const q = await c2.newPage(); q.setDefaultTimeout(20000);
  for (let i = 1; i <= 12; i++) {
    await q.goto(base + 'admin/', { waitUntil: 'load' });
    if (await q.locator('input[name=password]').count() === 0) { say('bludit', `wrong login #${i}`, 'login form gone: ' + (await q.locator('body').innerText()).slice(0, 100)); break; }
    await q.fill('input[name=username]', 'admin'); await q.fill('input[name=password]', 'wrong-' + i); await q.click('button[type=submit]'); await q.waitForLoadState('load');
    if (i === 1 || i >= 10) say('bludit', `wrong login #${i}`, (await q.locator('.alert, #alert').first().innerText().catch(() => '(no alert text)')).trim().slice(0, 100));
  }
  // does the right password still work from the same IP while blocked?
  await q.goto(base + 'admin/', { waitUntil: 'load' });
  await q.fill('input[name=username]', 'admin').catch(() => {}); await q.fill('input[name=password]', PASS).catch(() => {}); await q.click('button[type=submit]').catch(() => {}); await q.waitForLoadState('load');
  say('bludit', 'correct password right after the wrong ones', q.url());
  await c2.close();

  // admin path rename = editing a core constant
  const vars = path.join(root, 'bl-kernel/boot/variables.php');
  fs.writeFileSync(vars, fs.readFileSync(vars, 'utf8').replace("define('ADMIN_URI_FILTER', 'admin');", "define('ADMIN_URI_FILTER', 'desk-7f3k');"));
  await new Promise(r => setTimeout(r, 3000)); // let opcache (revalidate_freq 2s) pick up the edited file
  say('bludit', 'after ADMIN_URI_FILTER edit: GET /admin/', await status(base + 'admin/'));
  const c3 = await browser.newContext(); const r3 = await c3.newPage();
  const resp = await r3.goto(base + 'desk-7f3k/', { waitUntil: 'load' });
  say('bludit', 'after ADMIN_URI_FILTER edit: GET /desk-7f3k/', `${resp.status()} password field: ${await r3.locator('input[name=password]').count()}`);
  await c3.close(); await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const fn of [grav, bludit]) { try { await fn(browser); } catch (e) { console.log(`[${fn.name}] ABORTED: ${e.message.split('\n')[0]}`); } }
  await browser.close();
})();
