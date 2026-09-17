#!/usr/bin/env node
/*
 * Browser smoke test for one freshly unpacked site (run ./serve.sh up first).
 *   node smoke.js grav   http://localhost:8081/
 *   node smoke.js bludit http://localhost:8084/surf/
 *
 * Steps: first-run admin creation (throwaway random password, never written to disk),
 * 3 public pages render, admin login page loads, log in in a NEW browser context,
 * change the first price in the admin UI, upload a new photo and make it the home page
 * photo, confirm the public pages show both changes.
 * Exit code 0 = all checks passed. Screenshots land in out/shots/.
 */
const { chromium } = require('playwright-core');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const [cms, baseArg] = process.argv.slice(2);
if (!['grav', 'bludit'].includes(cms) || !baseArg) { console.error('usage: smoke.js grav|bludit <base-url>'); process.exit(2); }
const base = baseArg.endsWith('/') ? baseArg : baseArg + '/';
const tag = cms + '-' + (new URL(base).pathname === '/' ? 'root' : 'sub');
const shots = path.join(__dirname, 'out', 'shots'); fs.mkdirSync(shots, { recursive: true });
const USER = cms === 'grav' ? 'spikeowner' : 'admin';
const PASS = 'Sp1ke-' + crypto.randomBytes(12).toString('base64url');
const NEW_PRICE = '$' + (37 + Math.floor(Math.random() * 50));
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${tag}: ${name}${detail ? '  [' + detail + ']' : ''}`); };

async function publicPages(ctx, expectPrice, label, expectPhoto = 'hero') {
  const p = await ctx.newPage();
  const want = [
    ['', 'h1', 'Learn to surf'],
    ['lessons', 'h1', 'Lessons & Prices'],
    ['contact', 'h1', 'Contact'],
  ];
  for (const [slug, sel, text] of want) {
    const r = await p.goto(base + slug, { waitUntil: 'load' });
    const h1 = (await p.locator(sel).first().innerText().catch(() => '')).trim();
    check(`${label}: /${slug} renders (HTTP ${r.status()})`, r.status() === 200 && h1.includes(text), h1);
    if (slug === '') {
      const css = await p.evaluate(() => getComputedStyle(document.querySelector('.hero h1')).fontFamily);
      const img = await p.evaluate(() => { const i = document.querySelector('.hero-media img'); return i && i.complete && i.naturalWidth > 0; });
      check(`${label}: home has theme CSS and hero image`, /Georgia/.test(css) && img === true, css);
      const src = await p.locator('.hero-media img').getAttribute('src');
      check(`${label}: home photo is "${expectPhoto}"`, src.includes(expectPhoto), src);
      const from = (await p.locator('.teaser .from').innerText()).trim();
      check(`${label}: home teaser price is ${expectPrice}`, from === expectPrice, from);
      await p.screenshot({ path: path.join(shots, `${tag}-home.png`) });
    }
    if (slug === 'lessons') {
      const first = (await p.locator('.price-amount').first().innerText()).trim();
      const rows = await p.locator('.price').count();
      check(`${label}: price list shows 4 rows, first price ${expectPrice}`, rows === 4 && first === expectPrice, `${rows} rows, first=${first}`);
      await p.screenshot({ path: path.join(shots, `${tag}-lessons-${label.replace(/\W+/g, '')}.png`), fullPage: true });
    }
    if (slug === 'contact') {
      const wa = await p.locator('.cards a.btn-wa').getAttribute('href');
      const tel = await p.locator('.cards a[href^="tel:"]').count();
      const map = await p.locator('.cards a[href*="openstreetmap.org"]').count();
      check(`${label}: contact has WhatsApp, tel and map links`, wa === 'https://wa.me/000005550100' && tel === 1 && map === 1, wa);
    }
  }
  await p.close();
}

async function gravFlow(browser) {
  // 1. first run: any URL redirects to the Admin2 setup wizard while user/accounts is empty
  let ctx = await browser.newContext({ viewport: { width: 1400, height: 1100 } });
  let p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'networkidle' });
  check('first run: public URL redirects to setup wizard', p.url().includes('/admin/setup'), p.url());
  await p.fill('#username', USER); await p.fill('#fullname', 'Spike Owner'); await p.fill('#email', 'owner@example.invalid');
  await p.fill('#password', PASS); await p.fill('#confirm', PASS);
  await p.click('button:has-text("Create administrator")');
  await p.waitForURL(u => !u.toString().includes('/setup'), { timeout: 20000 });
  await p.waitForLoadState('networkidle');
  check('first run: administrator created, dashboard shown', (await p.locator('body').innerText()).includes('Dashboard'));
  await ctx.close();

  await publicPages(await browser.newContext(), '$35', 'before edit');

  // 2. admin login in a clean context
  ctx = await browser.newContext({ viewport: { width: 1400, height: 1100 } });
  p = await ctx.newPage();
  const r = await p.goto(base + 'admin', { waitUntil: 'networkidle' });
  await p.screenshot({ path: path.join(shots, `${tag}-login.png`) });
  check(`admin login page loads (HTTP ${r.status()})`, r.status() === 200 && await p.locator('input[type=password]').count() === 1, p.url());
  await p.locator('input[type=text], input[name=username], #username').first().fill(USER);
  await p.locator('input[type=password]').fill(PASS);
  await p.locator('button[type=submit]').first().click();
  await p.waitForURL(u => !u.toString().includes('login'), { timeout: 20000 }).catch(() => {});
  await p.waitForLoadState('networkidle');
  check('login works', (await p.locator('body').innerText()).includes('Dashboard'), p.url());

  // 3. edit the first price on the Lessons page
  await p.goto(base + 'admin/pages/edit/lessons', { waitUntil: 'networkidle' });
  await p.waitForSelector('text=Price list', { timeout: 20000 });
  const idx = await p.locator('input[type=text]').evaluateAll(els => els.findIndex(e => e.value === '$35'));
  check('editor shows the price list as form fields', idx >= 0, 'input index ' + idx);
  await p.locator('input[type=text]').nth(idx).fill(NEW_PRICE);
  await p.screenshot({ path: path.join(shots, `${tag}-admin-edit.png`), fullPage: true });
  const saved = p.waitForResponse(res => res.url().includes('/api/') && ['PATCH', 'PUT', 'POST'].includes(res.request().method()), { timeout: 20000 });
  await p.locator('button:has-text("Save")').first().click();
  const res = await saved;
  check(`save request accepted (${res.request().method()} ${res.status()})`, res.status() < 300, res.url());
  await p.waitForTimeout(1000);

  // 4. owner swaps the home page photo: upload under Page Media, pick it in the "Big photo" field, save
  await p.goto(base + 'admin/pages/edit/home', { waitUntil: 'networkidle' });
  await p.waitForSelector('text=Page Media', { timeout: 20000 });
  const up = p.waitForResponse(res => res.url().includes('/media') && res.request().method() === 'POST', { timeout: 20000 });
  await p.locator('input[type=file]').first().setInputFiles(path.join(__dirname, 'fixtures', 'new-photo.jpg'));
  check('photo upload accepted', (await up).status() === 201);
  await p.waitForTimeout(1500);
  // The "Big photo" field is a custom dropdown: open it with its chevron, then pick the new file.
  const ctl = p.locator(':text-is("hero.jpg")').first().locator('xpath=ancestor::div[contains(@class,"min-h-")][1]');
  const bb = await ctl.boundingBox();
  await p.mouse.click(bb.x + bb.width - 16, bb.y + bb.height / 2);
  await p.waitForTimeout(600);
  const option = p.locator(':text-is("new-photo.jpg")').first();
  check('new photo is offered in the "Big photo" field without reloading the editor', await option.isVisible());
  await option.click();
  await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(shots, `${tag}-admin-photo.png`), fullPage: true });
  const saved2 = p.waitForResponse(res => res.url().includes('/api/v1/pages/') && ['PATCH', 'PUT'].includes(res.request().method()), { timeout: 20000 });
  await p.locator('button:has-text("Save")').first().click();
  check('photo change saved', (await saved2).status() < 300);
  await p.waitForTimeout(1000);
  await ctx.close();
}

async function bluditFlow(browser) {
  // 1. first run: our first-run.php creates the admin user, then deletes itself
  let ctx = await browser.newContext({ viewport: { width: 1400, height: 1100 } });
  let p = await ctx.newPage();
  await p.goto(base + 'first-run.php', { waitUntil: 'load' });
  await p.fill('input[name=password]', PASS); await p.fill('input[name=confirm]', PASS);
  await p.click('button[type=submit]');
  await p.waitForLoadState('load');
  check('first run: admin user created', (await p.locator('body').innerText()).includes('Admin user admin created'));
  const again = await p.goto(base + 'first-run.php');
  check('first run: first-run.php deleted itself', again.status() === 404, 'HTTP ' + again.status());
  await ctx.close();

  await publicPages(await browser.newContext(), '$35', 'before edit');

  // 2. admin login in a clean context
  ctx = await browser.newContext({ viewport: { width: 1400, height: 1100 } });
  p = await ctx.newPage();
  const r = await p.goto(base + 'admin/', { waitUntil: 'load' });
  await p.screenshot({ path: path.join(shots, `${tag}-login.png`) });
  check(`admin login page loads (HTTP ${r.status()})`, r.status() === 200 && await p.locator('input[name=password]').count() === 1, p.url());
  await p.fill('input[name=username]', USER); await p.fill('input[name=password]', PASS);
  await p.click('button[type=submit]');
  await p.waitForLoadState('load');
  check('login works', p.url().includes('/admin/dashboard'), p.url());
  check('owner-facing sidebar link "Prices & contact" exists', await p.locator('a:has-text("Prices & contact")').count() > 0);

  // 3. edit the first price on the theme plugin's settings screen
  await p.goto(base + 'admin/configure-plugin/wobbly', { waitUntil: 'load' });
  const first = p.locator('input[name="priceAmount[]"]').first();
  check('settings screen shows the price list as form fields', (await first.inputValue()) === '$35', await first.inputValue().catch(() => ''));
  await first.fill(NEW_PRICE);
  await p.screenshot({ path: path.join(shots, `${tag}-admin-edit.png`), fullPage: true });
  await p.locator('button[name=save], button:has-text("Save")').first().click();
  await p.waitForLoadState('load');
  check('save accepted', (await p.locator('input[name="priceAmount[]"]').first().inputValue()) === NEW_PRICE);

  // 4. owner swaps the home page photo: Images > upload > "Set as cover image" > Save
  await p.goto(base + 'admin/edit-content/home', { waitUntil: 'load' });
  await p.click('button:has-text("Images"), a:has-text("Images")');
  const up = p.waitForResponse(res => res.url().includes('ajax/upload-images'), { timeout: 20000 });
  await p.locator('#jsimages').setInputFiles(path.join(__dirname, 'fixtures', 'new-photo.jpg'));
  check('photo upload accepted', (await (await up).text()).includes('"status":0'));
  await p.waitForTimeout(1500);
  await p.locator('tr:has-text("new-photo"), .modal.show *:has(> *:text("new-photo"))').first().locator('text=Set as cover image').first().click();
  await p.waitForTimeout(800);
  await p.screenshot({ path: path.join(shots, `${tag}-admin-photo.png`) });
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  await p.locator('button:has-text("Save")').first().click();
  await p.waitForLoadState('load'); await p.waitForTimeout(800);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    await (cms === 'grav' ? gravFlow(browser) : bluditFlow(browser));
    await publicPages(await browser.newContext(), NEW_PRICE, 'after edit', 'new-photo');
  } catch (e) {
    check('test run aborted: ' + e.message.split('\n')[0], false);
  }
  await browser.close();
  const failed = results.filter(r => !r.ok).length;
  console.log(`${tag}: ${results.length - failed}/${results.length} checks passed`);
  process.exit(failed ? 1 : 0);
})();
