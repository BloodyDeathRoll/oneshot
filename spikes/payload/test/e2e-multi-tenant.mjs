#!/usr/bin/env node
/**
 * End-to-end checks for the multi-tenant stack (docker-compose.yml), run against a stack that is
 * already up and seeded (test/run-multi-tenant.sh does that from clean).
 *
 *   node --env-file=.env test/e2e-multi-tenant.mjs
 */
import { readFile } from 'node:fs/promises'
import net from 'node:net'
import path from 'node:path'

import { assert, compose, createSuite, denied, http, loadPlaywright, login, outputDir, root, skip, sleep, waitFor } from './lib/harness.mjs'

const env = process.env
const CMS = `http://localhost:${env.CMS_PORT || 3100}`
const A = 'wobbly-pelican'
const B = 'lazy-turtle'
const dc = compose('docker-compose.yml', '.env')
const { check, finish, notes } = createSuite('e2e-multi-tenant')

const creds = JSON.parse(await readFile(path.join(root, 'seed', 'credentials.json'), 'utf8'))
const ownerA = creds.owners.find((o) => o.tenant === A)
const ownerB = creds.owners.find((o) => o.tenant === B)

const admin = await login(CMS, env.SUPERADMIN_EMAIL, env.SUPERADMIN_PASSWORD)
const a = await login(CMS, ownerA.email, ownerA.password)
assert(admin.token && a.token, 'could not log in as super-admin / owner A — is the stack seeded?')

const asAdmin = (p, o = {}) => http(`${CMS}${p}`, { token: admin.token, ...o })
const asA = (p, o = {}) => http(`${CMS}${p}`, { token: a.token, ...o })

const siteOf = async (tenantId) => (await asAdmin(`/api/sites?where[tenant][equals]=${tenantId}&depth=0&limit=1`)).body.docs[0]
const mediaOf = async (tenantId) => (await asAdmin(`/api/media?where[tenant][equals]=${tenantId}&depth=0&limit=50`)).body.docs
const siteA = await siteOf(ownerA.tenantId)
const siteB = await siteOf(ownerB.tenantId)
const mediaB = (await mediaOf(ownerB.tenantId))[0]

const status = async () => (await dc.publisher('/status', { secret: env.PUBLISH_SECRET })).body.tenants
const built = (tenant, file = 'index.html') => dc.execIn('publisher', ['cat', `/data/out/${tenant}/dist/${file}`])
const fingerprint = (tenant) =>
  dc.execIn('publisher', ['sh', '-c', `cd /data/out/${tenant} && stat -c %Y dist && find dist -type f -exec sha256sum {} + | sort | sha256sum`])
const idle = async () => Object.values(await status()).every((t) => t.state === 'idle')

// make sure both tenants have a finished build before measuring anything (seeding normally
// triggered them; after a publisher restart its in-memory counters are empty, so ask again)
for (const t of [A, B]) {
  if (!(await status())[t]) await dc.publisher('/publish', { method: 'POST', secret: env.PUBLISH_SECRET, body: { tenant: t, trigger: 'e2e.warmup' } })
}
await waitFor(async () => (await idle()) && (await status())[A]?.last?.ok && (await status())[B]?.last?.ok, { what: 'initial builds of both tenants' })

// ------------------------------------------------------------------ 1. nothing is public

await check('anonymous REST: every collection is closed', async () => {
  const codes = {}
  for (const c of ['sites', 'media', 'tenants', 'users', 'builders']) codes[c] = (await http(`${CMS}/api/${c}`)).status
  assert(Object.values(codes).every((s) => s === 401 || s === 403), JSON.stringify(codes))
  return JSON.stringify(codes)
})

await check('anonymous: media FILES are not downloadable', async () => {
  const r = await http(`${CMS}/api/media/file/${mediaB.filename}`)
  assert(denied(r.status), `got ${r.status}`)
  return `GET /api/media/file/${mediaB.filename} → ${r.status}`
})

await check('first-register endpoint is closed (super-admin is bootstrapped from env)', async () => {
  const r = await http(`${CMS}/api/users/first-register`, { method: 'POST', json: { email: 'evil@example.com', password: 'x'.repeat(12), role: 'super-admin' } })
  assert(r.status >= 400, `got ${r.status}`)
  const still = await asAdmin('/api/users?where[email][equals]=evil@example.com')
  assert(still.body.totalDocs === 0, 'user was created!')
  return `→ ${r.status}`
})

// ------------------------------------------------------------------ 2. owner A sees only tenant A

await check('owner A lists sites → exactly their one document', async () => {
  const r = await asA('/api/sites?depth=0&limit=100')
  assert(r.status === 200 && r.body.totalDocs === 1 && r.body.docs[0].id === siteA.id, JSON.stringify(r.body).slice(0, 200))
  return `totalDocs=1 (site #${siteA.id})`
})

await check('owner A lists media → only tenant A photos', async () => {
  const r = await asA('/api/media?depth=0&limit=100')
  const foreign = r.body.docs.filter((m) => m.tenant !== ownerA.tenantId)
  assert(r.status === 200 && r.body.totalDocs > 0 && foreign.length === 0, `foreign docs: ${foreign.length}`)
  return `${r.body.totalDocs} docs, 0 foreign`
})

await check('owner A cannot list other tenants', async () => {
  const r = await asA('/api/tenants?limit=100')
  assert(r.status === 200 && r.body.docs.every((t) => t.id === ownerA.tenantId) && r.body.totalDocs === 1, JSON.stringify(r.body.docs))
  return 'sees 1 tenant (own)'
})

await check('owner A cannot list other users', async () => {
  const r = await asA('/api/users?limit=100')
  assert(r.status === 200 && r.body.totalDocs === 1 && r.body.docs[0].email === ownerA.email, JSON.stringify(r.body.docs.map((u) => u.email)))
  return 'sees 1 user (self)'
})

await check('owner A cannot read the builder API-key collection', async () => {
  const r = await asA('/api/builders')
  assert(denied(r.status), `got ${r.status}`)
  return `→ ${r.status}`
})

await check('owner A cannot query tenant B content with a where filter', async () => {
  const r = await asA(`/api/sites?where[tenant][equals]=${ownerB.tenantId}`)
  assert(r.status === 200 && r.body.totalDocs === 0, JSON.stringify(r.body).slice(0, 200))
  return 'totalDocs=0'
})

// ------------------------------------------------------------------ 3. cross-tenant read / update / delete

await check('owner A cannot READ tenant B site / media doc / media file', async () => {
  const codes = [
    (await asA(`/api/sites/${siteB.id}`)).status,
    (await asA(`/api/media/${mediaB.id}`)).status,
    (await asA(`/api/media/file/${mediaB.filename}`)).status,
  ]
  assert(codes.every(denied), codes.join(','))
  return `→ ${codes.join(', ')}`
})

await check('owner A cannot UPDATE tenant B site or media (and nothing changed)', async () => {
  const c1 = (await asA(`/api/sites/${siteB.id}`, { method: 'PATCH', json: { businessName: 'HACKED' } })).status
  const c2 = (await asA(`/api/media/${mediaB.id}`, { method: 'PATCH', json: { alt: 'HACKED' } })).status
  const c3 = (await asA(`/api/sites?where[id][equals]=${siteB.id}`, { method: 'PATCH', json: { businessName: 'HACKED' } })).status // bulk update
  const after = await siteOf(ownerB.tenantId)
  const mAfter = (await asAdmin(`/api/media/${mediaB.id}?depth=0`)).body
  assert(denied(c1) && denied(c2), `${c1},${c2}`)
  assert(after.businessName === siteB.businessName && mAfter.alt === mediaB.alt, 'tenant B data changed!')
  return `→ ${c1}, ${c2}, bulk ${c3}; B unchanged`
})

await check('owner A cannot DELETE tenant B site or media (and they still exist)', async () => {
  const c1 = (await asA(`/api/sites/${siteB.id}`, { method: 'DELETE' })).status
  const c2 = (await asA(`/api/media/${mediaB.id}`, { method: 'DELETE' })).status
  const c3 = (await asA(`/api/media?where[tenant][equals]=${ownerB.tenantId}`, { method: 'DELETE' })).status // bulk delete
  assert(denied(c1) && denied(c2), `${c1},${c2}`)
  assert((await siteOf(ownerB.tenantId))?.id === siteB.id, 'site B is gone!')
  assert((await asAdmin(`/api/media/${mediaB.id}`)).status === 200, 'media B is gone!')
  return `→ ${c1}, ${c2}, bulk ${c3}; B intact`
})

// ------------------------------------------------------------------ 4. escalation

await check('owner A cannot escalate role', async () => {
  const r = await asA(`/api/users/${a.user.id}`, { method: 'PATCH', json: { role: 'super-admin' } })
  const me = (await asAdmin(`/api/users/${a.user.id}?depth=0`)).body
  assert(me.role === 'owner', `role is now ${me.role}`)
  return `PATCH → ${r.status}, role still "owner"`
})

await check('owner A cannot reassign themselves to tenant B (or add it)', async () => {
  const r1 = await asA(`/api/users/${a.user.id}`, { method: 'PATCH', json: { tenants: [{ tenant: ownerB.tenantId }] } })
  const r2 = await asA(`/api/users/${a.user.id}`, { method: 'PATCH', json: { tenants: [{ tenant: ownerA.tenantId }, { tenant: ownerB.tenantId }] } })
  const me = (await asAdmin(`/api/users/${a.user.id}?depth=0`)).body
  const ids = me.tenants.map((t) => t.tenant)
  assert(ids.length === 1 && ids[0] === ownerA.tenantId, `tenants now ${JSON.stringify(ids)}`)
  return `PATCH → ${r1.status}, ${r2.status}; tenants still [${ids}]`
})

await check('owner A cannot move their site or a photo into tenant B', async () => {
  const c1 = (await asA(`/api/sites/${siteA.id}`, { method: 'PATCH', json: { tenant: ownerB.tenantId } })).status
  const mediaA = (await mediaOf(ownerA.tenantId))[0]
  const c2 = (await asA(`/api/media/${mediaA.id}`, { method: 'PATCH', json: { tenant: ownerB.tenantId } })).status
  assert((await siteOf(ownerA.tenantId))?.id === siteA.id, 'site A moved!')
  assert((await asAdmin(`/api/media/${mediaA.id}?depth=0`)).body.tenant === ownerA.tenantId, 'media moved!')
  assert(c1 >= 400 && c2 >= 400, `${c1},${c2}`)
  return `→ ${c1}, ${c2}`
})

await check('owner A cannot upload a photo INTO tenant B', async () => {
  const form = new FormData()
  form.append('file', new Blob([await readFile(path.join(root, 'seed/fixtures/lazy-turtle/media/turtle-longboards.jpg'))], { type: 'image/jpeg' }), 'planted.jpg')
  form.append('_payload', JSON.stringify({ alt: 'planted', tenant: ownerB.tenantId }))
  const res = await fetch(`${CMS}/api/media`, { method: 'POST', headers: { Authorization: `JWT ${a.token}` }, body: form })
  const planted = (await asAdmin('/api/media?where[filename][like]=planted')).body
  assert(res.status >= 400 && planted.totalDocs === 0, `status ${res.status}, planted docs ${planted.totalDocs}`)
  return `→ ${res.status}`
})

await check('owner A cannot create users, tenants, a second site, or delete their tenant', async () => {
  const codes = {
    createUser: (await asA('/api/users', { method: 'POST', json: { email: 'x@example.com', password: 'x'.repeat(12), role: 'super-admin' } })).status,
    createTenant: (await asA('/api/tenants', { method: 'POST', json: { name: 'x', slug: 'x' } })).status,
    createSite: (await asA('/api/sites', { method: 'POST', json: { businessName: 'x', contact: { whatsapp: '+94770000000' } } })).status,
    deleteTenant: (await asA(`/api/tenants/${ownerA.tenantId}`, { method: 'DELETE' })).status,
    renameTenant: (await asA(`/api/tenants/${ownerA.tenantId}`, { method: 'PATCH', json: { slug: 'lazy-turtle-2' } })).status,
  }
  assert(Object.values(codes).every(denied), JSON.stringify(codes))
  return JSON.stringify(codes)
})

await check('builder API key is read-only and sees all tenants', async () => {
  const read = await http(`${CMS}/api/sites?depth=0`, { apiKey: env.BUILDER_API_KEY })
  const write = await http(`${CMS}/api/sites/${siteA.id}`, { method: 'PATCH', apiKey: env.BUILDER_API_KEY, json: { businessName: 'HACKED' } })
  const users = await http(`${CMS}/api/users`, { apiKey: env.BUILDER_API_KEY })
  assert(read.status === 200 && read.body.totalDocs === 2, `read ${read.status}`)
  assert(denied(write.status) && denied(users.status), `write ${write.status}, users ${users.status}`)
  return `read 200 (2 sites), write → ${write.status}, users → ${users.status}`
})

await check('stored-XSS guard: javascript: URL is rejected by validation', async () => {
  const r = await asA(`/api/sites/${siteA.id}`, { method: 'PATCH', json: { contact: { whatsapp: '+94770000101', mapUrl: 'javascript:alert(1)' } } })
  assert(r.status === 400, `got ${r.status}`)
  return '→ 400'
})

// ------------------------------------------------------------------ 5. publish flow

await check('owner A changes a price → ONLY tenant A is rebuilt, new price is in A\'s HTML, B untouched', async () => {
  const before = await status()
  const fpB = await fingerprint(B)
  const current = (await asA(`/api/sites/${siteA.id}?depth=0&locale=en`)).body
  const newPrice = current.priceList[0].price === 9750 ? 9800 : 9750
  const priceList = current.priceList.map((row, i) => (i === 0 ? { ...row, price: newPrice } : row))

  const t0 = Date.now()
  const r = await asA(`/api/sites/${siteA.id}?locale=en`, { method: 'PATCH', json: { priceList } })
  const saveMs = Date.now() - t0
  assert(r.status === 200, `PATCH → ${r.status} ${JSON.stringify(r.body).slice(0, 300)}`)

  const done = await waitFor(async () => {
    const s = (await status())[A]
    return s.builds > before[A].builds && s.state === 'idle' ? s : null
  }, { what: 'tenant A rebuild' })
  const totalMs = Date.now() - t0
  const last = done.value.last
  assert(last.ok, `build failed: ${last.error}\n${last.output}`)

  const html = await built(A)
  const htmlSi = await built(A, 'si/index.html')
  const shown = newPrice.toLocaleString('en-US')
  assert(html.includes(shown) && htmlSi.includes(shown), `price ${shown} not found in built HTML`)
  const after = await status()
  assert(after[B].builds === before[B].builds, `tenant B was rebuilt (${before[B].builds} → ${after[B].builds})`)
  assert((await fingerprint(B)) === fpB, 'tenant B output changed')
  assert(!html.includes('Lazy Turtle') && !(await built(B)).includes('Wobbly Pelican'), 'cross-tenant content in built HTML')

  notes.saveToBuilt = { saveMs, totalMs, debounceMs: Number(env.DEBOUNCE_MS || 1500), buildMs: last.buildMs, deployDryRunMs: last.deployMs, publisherTotalMs: last.totalMs, triggers: last.triggers }
  return `save answered in ${saveMs} ms; save→built+dry-run ${totalMs} ms (build ${last.buildMs}, wrangler dry-run ${last.deployMs}); B builds unchanged (${after[B].builds}), B files identical`
})

await check('a burst of 5 saves is coalesced (≤ 2 builds) and the last value wins', async () => {
  const before = (await status())[A].builds
  const current = (await asA(`/api/sites/${siteA.id}?depth=0&locale=en`)).body
  let last
  for (let i = 1; i <= 5; i++) {
    last = 10000 + i * 111
    const priceList = current.priceList.map((row, j) => (j === 1 ? { ...row, price: last } : row))
    const r = await asA(`/api/sites/${siteA.id}?locale=en`, { method: 'PATCH', json: { priceList } })
    assert(r.status === 200, `PATCH ${i} → ${r.status}`)
  }
  await sleep(2500)
  await waitFor(idle, { what: 'publisher idle' })
  const builds = (await status())[A].builds - before
  assert(builds >= 1 && builds <= 2, `${builds} builds for 5 saves`)
  assert((await built(A)).includes(last.toLocaleString('en-US')), 'last saved price not in HTML')
  return `5 saves → ${builds} build(s); HTML shows ${last.toLocaleString('en-US')}`
})

await check('editing a photo\'s alt text (media.afterChange) republishes tenant A only', async () => {
  const before = await status()
  const mediaA = (await mediaOf(ownerA.tenantId))[0]
  const alt = `A surfboard in the sand, edited ${Date.now()}`
  const r = await asA(`/api/media/${mediaA.id}?locale=en`, { method: 'PATCH', json: { alt } })
  assert(r.status === 200, `PATCH → ${r.status}`)
  await waitFor(async () => { const s = (await status())[A]; return s.builds > before[A].builds && s.state === 'idle' }, { what: 'tenant A rebuild' })
  assert((await built(A)).includes(alt), 'new alt text not in HTML')
  assert((await status())[B].builds === before[B].builds, 'tenant B was rebuilt')
  return 'alt text is in the rebuilt HTML; B not rebuilt'
})

await check('built site has no runtime dependency on the CMS', async () => {
  const html = (await built(A)) + (await built(A, 'si/index.html'))
  const hits = html.match(/localhost:3100|cms:3000|\/api\/media/g)
  assert(!hits, `found ${hits}`)
  assert(/<img[^>]+src="\/_astro\//.test(html) && html.includes('image/avif'), 'expected local optimised images')
  assert(html.includes('https://wa.me/94770000101'), 'WhatsApp CTA missing')
  return 'no CMS URLs; images are local /_astro/* (avif+webp+jpg); wa.me CTA present'
})

// ------------------------------------------------------------------ 6. publisher + network exposure

await check('publisher rejects unauthenticated and wrongly-authenticated requests', async () => {
  const before = await status()
  const none = await dc.publisher('/publish', { method: 'POST', body: { tenant: A } })
  const wrong = await dc.publisher('/publish', { method: 'POST', secret: 'not-the-secret', body: { tenant: A } })
  const stat = await dc.publisher('/status')
  const bad = await dc.publisher('/publish', { method: 'POST', secret: env.PUBLISH_SECRET, body: { tenant: '../../etc' } })
  await sleep(2500)
  const after = await status()
  assert(none.status === 401 && wrong.status === 401 && stat.status === 401, `${none.status},${wrong.status},${stat.status}`)
  assert(bad.status === 400, `path-like slug → ${bad.status}`)
  assert(after[A].requests === before[A].requests, 'a rejected request was queued')
  return 'no secret → 401, wrong secret → 401, /status → 401, bad slug → 400; nothing queued'
})

await check('publisher and Postgres are not published on the host', async () => {
  const ports = {}
  for (const svc of ['postgres', 'publisher', 'cms']) {
    const id = (await dc.run(['ps', '-q', svc])).trim()
    const { execFile } = await import('node:child_process')
    ports[svc] = await new Promise((res) => execFile('docker', ['inspect', '-f', '{{json .HostConfig.PortBindings}}', id], (_e, out) => res(out.trim())))
  }
  assert(ports.postgres === '{}' && ports.publisher === '{}', JSON.stringify(ports))
  assert(ports.cms.includes('"HostIp":"127.0.0.1"'), `cms binding: ${ports.cms}`)
  const open = await new Promise((res) => { const s = net.connect(4100, '127.0.0.1'); s.on('connect', () => { s.destroy(); res(true) }); s.on('error', () => res(false)) })
  assert(!open, 'something answers on host port 4100')
  return `postgres ${ports.postgres}, publisher ${ports.publisher}, cms ${ports.cms}`
})

// ------------------------------------------------------------------ 7. login lockout

await check('login lockout: 5 wrong passwords lock the account (correct password then refused)', async () => {
  const email = `locktest-${Date.now()}@example.com`
  const password = 'correct-horse-battery-staple'
  const created = await asAdmin('/api/users', { method: 'POST', json: { email, password, role: 'owner', tenants: [{ tenant: ownerA.tenantId }] } })
  assert(created.status === 201, `create → ${created.status}`)
  const id = created.body.doc.id
  try {
    assert((await login(CMS, email, password)).status === 200, 'sanity login failed')
    const wrong = []
    for (let i = 0; i < 6; i++) wrong.push((await login(CMS, email, 'wrong-password')).status)
    const locked = await login(CMS, email, password)
    const doc = (await asAdmin(`/api/users/${id}?depth=0&showHiddenFields=true`)).body
    assert(locked.status === 401 && !locked.token, `correct password after lockout → ${locked.status}`)
    notes.lockout = { wrongAttemptStatuses: wrong, correctPasswordAfter: locked.status, message: locked.body?.errors?.[0]?.message, lockUntil: doc.lockUntil ?? '(hidden)' }
    return `wrong ×6 → ${wrong.join(',')}; then correct password → ${locked.status} "${locked.body?.errors?.[0]?.message}"`
  } finally {
    await asAdmin(`/api/users/${id}`, { method: 'DELETE' })
  }
})

await check('lockout is per ACCOUNT, not per IP: other accounts still log in, unknown emails are not throttled', async () => {
  const codes = []
  for (let i = 0; i < 12; i++) codes.push((await login(CMS, `nobody-${i}@example.com`, 'wrong')).status)
  const ok = await login(CMS, ownerA.email, ownerA.password)
  assert(ok.status === 200, 'owner A could not log in')
  notes.ipRateLimit = 'none in Payload — 12 failed logins for unknown emails from one IP were all answered 401, none 429'
  assert(!codes.includes(429), 'unexpected 429')
  return `12 bad logins from one IP → all ${[...new Set(codes)].join('/')} (no 429): IP throttling must come from the reverse proxy`
})

// ------------------------------------------------------------------ 8. admin UI (headless browser)

await check('admin UI: owner A sees only their own site and photos; no tenant switcher, no admin collections', async () => {
  const pw = await loadPlaywright()
  if (!pw) skip('playwright-core not found under ~/.npm/_npx')
  let browser
  try { browser = await pw.chromium.launch() } catch (e) { skip(`chromium could not start: ${e.message.split('\n')[0]}`) }
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
    await page.goto(`${CMS}/admin/login`, { waitUntil: 'networkidle' })
    await page.fill('input[name="email"]', ownerA.email)
    await page.fill('input[name="password"]', ownerA.password)
    await page.click('button[type="submit"]')
    await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 20000 })
    await page.waitForLoadState('networkidle')
    const dashboard = await page.locator('body').innerText()
    await page.screenshot({ path: path.join(outputDir, 'admin-owner-a-dashboard.png') })

    await page.goto(`${CMS}/admin/collections/sites`, { waitUntil: 'networkidle' })
    const sitesUrl = page.url()
    const sitesText = await page.locator('body').innerText()
    const nameValue = await page.locator('input[name="businessName"]').inputValue().catch(() => '')
    await page.screenshot({ path: path.join(outputDir, 'admin-owner-a-site.png'), fullPage: true })

    await page.goto(`${CMS}/admin/collections/media`, { waitUntil: 'networkidle' })
    const mediaText = await page.locator('body').innerText()
    await page.screenshot({ path: path.join(outputDir, 'admin-owner-a-media.png') })

    await page.goto(`${CMS}/admin/collections/sites/${siteB.id}`, { waitUntil: 'networkidle' })
    const foreignText = await page.locator('body').innerText()
    const foreignName = await page.locator('input[name="businessName"]').inputValue().catch(() => '')

    const tenantsPage = await page.goto(`${CMS}/admin/collections/tenants`, { waitUntil: 'networkidle' })
    const tenantsText = await page.locator('body').innerText()

    assert(nameValue === 'Wobbly Pelican Surf School', `site form shows "${nameValue}" at ${sitesUrl}`)
    assert(mediaText.includes('pelican-') && !mediaText.includes('turtle-'), 'media list leaks tenant B files')
    assert(!foreignName.includes('Lazy Turtle') && !foreignText.includes('Lazy Turtle'), 'tenant B site is visible in admin UI')
    assert(!/Businesses|Builders/.test(dashboard), `dashboard shows admin collections: ${dashboard.slice(0, 300)}`)
    assert(!dashboard.includes('Lazy Turtle') && !sitesText.includes('Lazy Turtle'), 'tenant B name visible')
    assert(!tenantsText.includes('Lazy Turtle'), 'tenants list leaks tenant B')
    return `sites → redirected to own doc (${new URL(sitesUrl).pathname}); media lists only pelican-*; /sites/${siteB.id} → not shown; tenants page status ${tenantsPage?.status()}; screenshots in test/output/`
  } finally {
    await browser.close()
  }
})

await check('admin UI: super-admin sees the tenant selector and both businesses', async () => {
  const pw = await loadPlaywright()
  if (!pw) skip('playwright-core not found under ~/.npm/_npx')
  let browser
  try { browser = await pw.chromium.launch() } catch (e) { skip(`chromium could not start: ${e.message.split('\n')[0]}`) }
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
    await page.goto(`${CMS}/admin/login`, { waitUntil: 'networkidle' })
    await page.fill('input[name="email"]', env.SUPERADMIN_EMAIL)
    await page.fill('input[name="password"]', env.SUPERADMIN_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 20000 })
    await page.goto(`${CMS}/admin/collections/tenants`, { waitUntil: 'networkidle' })
    const text = await page.locator('body').innerText()
    await page.screenshot({ path: path.join(outputDir, 'admin-superadmin-tenants.png') })
    assert(text.includes('Lazy Turtle') && text.includes('Wobbly Pelican'), 'super-admin does not see both tenants')
    return 'both tenants listed'
  } finally {
    await browser.close()
  }
})

process.exit(await finish())
