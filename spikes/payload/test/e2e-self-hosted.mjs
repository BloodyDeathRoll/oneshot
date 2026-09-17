#!/usr/bin/env node
/**
 * End-to-end checks for the self-hosted single-tenant stack (docker-compose.self-hosted.yml):
 * Caddy + single-tenant Payload + Postgres + publisher (local-dir adapter). Expects the stack to
 * be up and the site imported from exports/wobbly-pelican (test/run-self-hosted.sh does that).
 *
 *   node --env-file=.env.self-hosted test/e2e-self-hosted.mjs
 */
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

import { exportTenant, Rest } from '../scripts/lib/tenant-io.mjs'
import { assert, compose, createSuite, denied, http, loadPlaywright, login, outputDir, root, skip, waitFor } from './lib/harness.mjs'

const exec = promisify(execFile)
const env = process.env
const SITE = env.SERVER_URL || 'http://localhost:8180'
const SOURCE_EXPORT = path.join(root, 'exports', 'wobbly-pelican')
const dc = compose('docker-compose.self-hosted.yml', '.env.self-hosted')
const { check, finish, notes } = createSuite('e2e-self-hosted')

const owner = await login(SITE, env.OWNER_EMAIL, env.OWNER_PASSWORD)
assert(owner.token, 'could not log in as the owner through Caddy')
const asOwner = (p, o = {}) => http(`${SITE}${p}`, { token: owner.token, ...o })
const page = async (p = '/') => (await fetch(`${SITE}${p}`)).text()
const sha = (buf) => createHash('sha256').update(buf).digest('hex')
const psql = async (sql) => (await dc.execIn('postgres', ['psql', '-U', 'payload', '-d', 'payload', '-At', '-c', sql])).trim()
const cgroup = async (file) => (await dc.execIn('publisher', ['cat', `/sys/fs/cgroup/${file}`])).trim()

await waitFor(async () => (await page('/')).includes('Wobbly Pelican'), { what: 'imported site to be live' })

// ------------------------------------------------------------------ data path: multi-tenant → single-tenant

await check('export (multi-tenant) → import (single-tenant) → re-export is lossless for content + photos', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'oneshot-reexport-'))
  try {
    await exportTenant({ rest: Rest.withBuilderKey(SITE, env.BUILDER_API_KEY), profile: 'single-tenant', tenantSlug: 'site', dir })
    const a = JSON.parse(await readFile(path.join(SOURCE_EXPORT, 'site.json'), 'utf8'))
    const b = JSON.parse(await readFile(path.join(dir, 'site.json'), 'utf8'))
    const ma = JSON.parse(await readFile(path.join(SOURCE_EXPORT, 'media.json'), 'utf8'))
    const mb = JSON.parse(await readFile(path.join(dir, 'media.json'), 'utf8'))
    assert(JSON.stringify(a) === JSON.stringify(b), 'site.json differs after the round trip')
    assert(JSON.stringify(ma) === JSON.stringify(mb), 'media.json differs after the round trip')
    const files = await readdir(path.join(SOURCE_EXPORT, 'media'))
    for (const f of files) {
      assert(sha(await readFile(path.join(SOURCE_EXPORT, 'media', f))) === sha(await readFile(path.join(dir, 'media', f))), `${f} bytes differ`)
    }
    return `site.json identical (both locales), media.json identical, ${files.length} photos byte-identical`
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

// ------------------------------------------------------------------ one admin user, no tenants

await check('exactly one admin user exists (REST + database)', async () => {
  const r = await asOwner('/api/users?limit=100')
  const rows = await psql('select count(*) from users')
  assert(r.body.totalDocs === 1 && rows === '1', `REST ${r.body.totalDocs}, DB ${rows}`)
  assert(r.body.docs[0].role === 'owner', `role ${r.body.docs[0].role}`)
  return `REST totalDocs=1, SELECT count(*) FROM users = ${rows}, role=owner`
})

await check('nobody can add a second user, escalate, or delete the owner', async () => {
  const codes = {
    ownerCreates: (await asOwner('/api/users', { method: 'POST', json: { email: 'second@example.com', password: 'x'.repeat(12), role: 'owner' } })).status,
    anonymousCreates: (await http(`${SITE}/api/users`, { method: 'POST', json: { email: 'second@example.com', password: 'x'.repeat(12) } })).status,
    firstRegister: (await http(`${SITE}/api/users/first-register`, { method: 'POST', json: { email: 'second@example.com', password: 'x'.repeat(12) } })).status,
    deleteSelf: (await asOwner(`/api/users/${owner.user.id}`, { method: 'DELETE' })).status,
  }
  await asOwner(`/api/users/${owner.user.id}`, { method: 'PATCH', json: { role: 'super-admin' } })
  const role = await psql(`select role from users where id = ${owner.user.id}`)
  assert(Object.values(codes).every((c) => c >= 400) && (await psql('select count(*) from users')) === '1' && role === 'owner', JSON.stringify({ codes, role }))
  return `${JSON.stringify(codes)}; role still "${role}"; still 1 user`
})

await check('no tenants anywhere: no collection, no table, no tenant key in the REST shape', async () => {
  const api = (await asOwner('/api/tenants')).status
  const table = await psql("select count(*) from information_schema.tables where table_name = 'tenants'")
  const cols = await psql("select count(*) from information_schema.columns where column_name like 'tenant%'")
  const site = (await asOwner('/api/sites?depth=1&locale=en')).body.docs[0]
  assert(api === 404 && table === '0' && cols === '0', `api ${api}, table ${table}, tenant columns ${cols}`)
  assert(!('tenant' in site) && !('tenant' in site.photos[0].image), 'tenant key present')
  return `GET /api/tenants → 404; no tenants table; 0 tenant columns; sites/media docs have no "tenant" key`
})

await check('REST shape matches schema v0.1 (same keys as multi-tenant minus `tenant`)', async () => {
  const site = (await asOwner('/api/sites?depth=1&locale=en')).body.docs[0]
  const expected = ['id', 'businessName', 'tagline', 'languages', 'copyBlocks', 'openingHours', 'hoursNote', 'priceList', 'photos', 'contact', 'bookingLinks', 'updatedAt', 'createdAt']
  const got = Object.keys(site)
  const missing = expected.filter((k) => !got.includes(k))
  const extra = got.filter((k) => !expected.includes(k))
  assert(missing.length === 0 && extra.length === 0, `missing ${missing} extra ${extra}`)
  return `keys: ${got.join(', ')}`
})

await check('the site document is a singleton: owner cannot create a second one', async () => {
  const r = await asOwner('/api/sites', { method: 'POST', json: { businessName: 'Second', contact: { whatsapp: '+94770000000' } } })
  assert(denied(r.status) && (await psql('select count(*) from sites')) === '1', `→ ${r.status}`)
  return `→ ${r.status}; 1 row in sites`
})

await check('anonymous REST through Caddy is closed', async () => {
  const codes = {}
  for (const c of ['sites', 'media', 'users', 'builders']) codes[c] = (await http(`${SITE}/api/${c}`)).status
  assert(Object.values(codes).every((s) => s === 401 || s === 403), JSON.stringify(codes))
  return JSON.stringify(codes)
})

// ------------------------------------------------------------------ Caddy

await check('Caddy serves the static site (en + si, hashed assets, 404 page) and proxies the admin', async () => {
  const home = await fetch(`${SITE}/`)
  const si = await fetch(`${SITE}/si/`)
  const html = await home.text()
  const asset = html.match(/\/_astro\/[^"' ]+\.(?:webp|avif|jpg)/)?.[0]
  const img = await fetch(`${SITE}${asset}`)
  const missing = await fetch(`${SITE}/definitely-not-here/`)
  const admin = await fetch(`${SITE}/admin/login`)
  assert(home.status === 200 && si.status === 200 && (await si.text()).includes('lang="si"'), 'pages')
  assert(img.status === 200 && /immutable/.test(img.headers.get('cache-control') || ''), `asset ${asset} → ${img.status} ${img.headers.get('cache-control')}`)
  assert(missing.status === 404, `missing → ${missing.status}`)
  assert(admin.status === 200, `admin → ${admin.status}`)
  return `/ 200, /si/ 200, ${asset} 200 (immutable), unknown path 404, /admin/login 200`
})

await check('only Caddy is reachable from the host; Postgres, CMS and publisher are not published', async () => {
  const ports = {}
  for (const svc of ['postgres', 'cms', 'publisher', 'caddy']) {
    const id = (await dc.run(['ps', '-q', svc])).trim()
    ports[svc] = (await exec('docker', ['inspect', '-f', '{{json .HostConfig.PortBindings}}', id])).stdout.trim()
  }
  assert(ports.postgres === '{}' && ports.cms === '{}' && ports.publisher === '{}', JSON.stringify(ports))
  assert(!ports.caddy.includes('0.0.0.0') && ports.caddy.includes('127.0.0.1'), ports.caddy)
  const open = async (port) => new Promise((res) => { const s = net.connect(port, '127.0.0.1'); s.on('connect', () => { s.destroy(); res(true) }); s.on('error', () => res(false)) })
  assert(!(await open(4100)) && !(await open(3000)), 'publisher/cms port answers on the host')
  notes.hostPort5432 = 'host port 5432 belongs to an unrelated container (toll-e-db) — not part of this stack, untouched'
  return `postgres ${ports.postgres}, cms ${ports.cms}, publisher ${ports.publisher}; caddy → 127.0.0.1 only`
})

await check('publisher rejects unauthenticated requests', async () => {
  const none = await dc.publisher('/publish', { method: 'POST', body: { tenant: 'site' } })
  const wrong = await dc.publisher('/publish', { method: 'POST', secret: 'nope', body: { tenant: 'site' } })
  assert(none.status === 401 && wrong.status === 401, `${none.status},${wrong.status}`)
  return '→ 401, 401'
})

// ------------------------------------------------------------------ save → live

await check('owner changes a price → the site served by Caddy shows it (save → live measured)', async () => {
  const site = (await asOwner('/api/sites?depth=0&locale=en')).body.docs[0]
  const newPrice = site.priceList[0].price === 9900 ? 9950 : 9900
  const priceList = site.priceList.map((row, i) => (i === 0 ? { ...row, price: newPrice } : row))
  const cpu0 = Number((await cgroup('cpu.stat')).match(/usage_usec (\d+)/)[1])
  const t0 = Date.now()
  const r = await asOwner(`/api/sites/${site.id}?locale=en`, { method: 'PATCH', json: { priceList } })
  const saveMs = Date.now() - t0
  assert(r.status === 200, `PATCH → ${r.status}`)
  const shown = newPrice.toLocaleString('en-US')
  await waitFor(async () => (await page('/')).includes(shown), { everyMs: 200, what: 'new price on the live site' })
  const liveMs = Date.now() - t0
  assert((await page('/si/')).includes(shown), 'si page not updated')
  const cpuSec = (Number((await cgroup('cpu.stat')).match(/usage_usec (\d+)/)[1]) - cpu0) / 1e6
  const last = (await dc.publisher('/status', { secret: env.PUBLISH_SECRET })).body.tenants.site.last
  notes.saveToLive = { saveMs, liveMs, debounceMs: Number(env.DEBOUNCE_MS || 1500), buildMs: last.buildMs, deployMs: last.deployMs, publisherCpuSeconds: cpuSec, publisherPeakMemMiB: Math.round(Number(await cgroup('memory.peak')) / 1048576) }
  return `save answered in ${saveMs} ms; live on Caddy after ${liveMs} ms (debounce ${env.DEBOUNCE_MS || 1500} + build ${last.buildMs} + flip ${last.deployMs}); build used ${cpuSec.toFixed(2)} CPU-s`
})

// ------------------------------------------------------------------ admin UI

await check('admin UI: no tenant selector, no Businesses/Users/Builders screens, site form loads', async () => {
  const pw = await loadPlaywright()
  if (!pw) skip('playwright-core not found under ~/.npm/_npx')
  let browser
  try { browser = await pw.chromium.launch() } catch (e) { skip(`chromium could not start: ${e.message.split('\n')[0]}`) }
  try {
    const p = await browser.newPage({ viewport: { width: 1280, height: 900 } })
    await p.goto(`${SITE}/admin/login`, { waitUntil: 'networkidle' })
    await p.fill('input[name="email"]', env.OWNER_EMAIL)
    await p.fill('input[name="password"]', env.OWNER_PASSWORD)
    await p.click('button[type="submit"]')
    await p.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 20000 })
    await p.waitForLoadState('networkidle')
    const dashboard = await p.locator('body').innerText()
    const selector = await p.locator('.tenant-selector').count()
    await p.screenshot({ path: path.join(outputDir, 'selfhosted-admin-dashboard.png') })
    const tenants = await p.goto(`${SITE}/admin/collections/tenants`, { waitUntil: 'networkidle' })
    await p.goto(`${SITE}/admin/collections/sites`, { waitUntil: 'networkidle' })
    await p.locator('table a, .collection-list a').first().click().catch(() => {})
    await p.waitForLoadState('networkidle')
    const name = await p.locator('input[name="businessName"]').inputValue().catch(() => '')
    const hasTenantField = await p.locator('[id*="field-tenant"]').count()
    await p.screenshot({ path: path.join(outputDir, 'selfhosted-admin-site.png'), fullPage: true })
    assert(!/Businesses|Builders|Users/.test(dashboard), `dashboard: ${dashboard.slice(0, 200)}`)
    assert(selector === 0 && hasTenantField === 0, `tenant selector ${selector}, tenant field ${hasTenantField}`)
    assert(tenants.status() === 404, `tenants page → ${tenants.status()}`)
    assert(name === 'Wobbly Pelican Surf School', `site form shows "${name}"`)
    return `dashboard cards: ${dashboard.replace(/\s+/g, ' ').slice(0, 80)}…; /admin/collections/tenants → 404; no tenant selector/field`
  } finally {
    await browser.close()
  }
})

// ------------------------------------------------------------------ backup / restore / update

await check('one-command backup → change → one-command restore brings back DB, media and the live site', async () => {
  const dir = path.join(root, 'backups', `e2e-${Date.now()}`)
  const before = (await asOwner('/api/sites?depth=1&locale=en')).body.docs[0]
  const t0 = Date.now()
  await exec(path.join(root, 'scripts', 'selfhosted-backup.sh'), [dir], { cwd: root })
  const backupMs = Date.now() - t0

  // damage: change the name and delete a photo (DB row + file)
  await asOwner(`/api/sites/${before.id}?locale=en`, { method: 'PATCH', json: { businessName: 'Broken Name', photos: before.photos.slice(0, 1).map((p) => ({ image: p.image.id })) } })
  const victim = before.photos[2].image
  assert((await asOwner(`/api/media/${victim.id}`, { method: 'DELETE' })).status === 200, 'could not delete photo')
  await waitFor(async () => (await page('/')).includes('Broken Name'), { what: 'damaged site live' })

  const t1 = Date.now()
  await exec(path.join(root, 'scripts', 'selfhosted-restore.sh'), [dir], { cwd: root, maxBuffer: 32e6 })
  const restoreMs = Date.now() - t1
  const again = await login(SITE, env.OWNER_EMAIL, env.OWNER_PASSWORD)
  const after = (await http(`${SITE}/api/sites?depth=1&locale=en`, { token: again.token })).body.docs[0]
  const file = await http(`${SITE}/api/media/file/${victim.filename}`, { token: again.token })
  assert(after.businessName === before.businessName && after.photos.length === before.photos.length, 'content not restored')
  assert(file.status === 200, `restored media file → ${file.status}`)
  await waitFor(async () => { const h = await page('/'); return h.includes(before.businessName) && !h.includes('Broken Name') }, { what: 'restored site live' })
  notes.backupRestore = { backupMs, restoreMs, restoreToLiveMs: Date.now() - t1 }
  return `backup ${backupMs} ms; restore ${restoreMs} ms; name, 3 photos and the deleted file are back; live site restored ${Date.now() - t1} ms after starting the restore`
})

await check('one-command update keeps data and the site stays served', async () => {
  const t0 = Date.now()
  const { stdout } = await exec(path.join(root, 'scripts', 'selfhosted-update.sh'), [], { cwd: root, maxBuffer: 64e6, timeout: 900_000 })
  const ms = Date.now() - t0
  const again = await login(SITE, env.OWNER_EMAIL, env.OWNER_PASSWORD)
  assert(again.token, 'owner cannot log in after update')
  const site = (await http(`${SITE}/api/sites?depth=0`, { token: again.token })).body.docs[0]
  assert(site?.businessName === 'Wobbly Pelican Surf School', 'content lost')
  assert((await fetch(`${SITE}/`)).status === 200, 'site not served after update')
  notes.update = { ms, note: 'images were already built, so this measures a no-change update (docker layer cache warm)' }
  return `update finished in ${ms} ms (warm cache, includes pre-update backup); login + content + site OK; ${stdout.includes('rebuild requested: 202') ? 'rebuild triggered' : 'rebuild NOT confirmed'}`
})

process.exit(await finish())
