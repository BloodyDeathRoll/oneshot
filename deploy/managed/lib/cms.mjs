/**
 * The managed CMS as the deployer and the acceptance suite reach it: config from env, SSH to the
 * server for what is not on the internet (super-admin credentials, the publisher, the CMS build),
 * and the owner-path checks of `verify`. Shared by deploy/managed/deploy.mjs and tools/site-check.mjs.
 */
import { execFileSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { Rest } from '../../../cms/scripts/lib/tenant-io.mjs'

export const CMS_URL = process.env.CMS_URL || 'https://130-61-212-182.sslip.io'
export const CMS_SSH = process.env.CMS_SSH || 'ubuntu@130.61.212.182'
export const SSH_KEY = process.env.CMS_SSH_KEY || path.join(os.homedir(), '.ssh', 'oneshot_cms')
export const REMOTE = process.env.CMS_REMOTE_DIR || 'oneshot' // on the server: ~/oneshot/{cms,sites}
export const SEALED = path.join(os.homedir(), '.oneshot', 'sealed')

export const ssh = (cmd, { input } = {}) =>
  execFileSync('ssh', ['-i', SSH_KEY, '-o', 'BatchMode=yes', CMS_SSH, cmd], { input, encoding: 'utf8', maxBuffer: 64 << 20 })

export const remoteEnv = (key) => ssh(`grep -E '^${key}=' ${REMOTE}/cms/.env | head -1 | cut -d= -f2-`).trim()

export const superAdmin = async () => Rest.login(CMS_URL, remoteEnv('SUPERADMIN_EMAIL'), remoteEnv('SUPERADMIN_PASSWORD'))

/** The CMS-built index.html of a tenant, as the publisher left it (what it deployed). */
export const cmsBuiltHtml = (slug) => ssh(`cd ${REMOTE}/cms && docker compose --env-file .env exec -T publisher cat /data/out/${slug}/dist/index.html`)

/** The owner's sealed credentials (written by deploy.mjs provision), or null. Never printed. */
export const readSealed = (slug) => {
  const p = path.join(SEALED, `${slug}.json`)
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
export const fetchText = async (url) => {
  const res = await fetch(url, { cache: 'no-store', headers: { 'cache-control': 'no-cache' } })
  return { status: res.status, text: await res.text() }
}
export const waitFor = async (predicate, { timeoutMs = 240_000, everyMs = 2000 } = {}) => {
  const t0 = Date.now()
  while (Date.now() - t0 < timeoutMs) {
    if (await predicate()) return Date.now() - t0
    await sleep(everyMs)
  }
  return null
}
export const tenantOf = async (rest, slug) => (await rest.get(`/api/tenants?where[slug][equals]=${slug}&depth=0&limit=1`)).docs[0]
export const siteOf = async (rest, tenantId, q = 'depth=0') => (await rest.get(`/api/sites?where[tenant][equals]=${tenantId}&${q}&limit=1`)).docs[0]

/** CMS health from the outside: the admin answers, the API answers (anonymous `users/me` → 200 `{user:null}`). */
export const cmsHealth = async (cmsUrl = CMS_URL) => {
  const admin = await fetch(new URL('/admin', cmsUrl), { redirect: 'follow' }).then((r) => r.status, (e) => `error: ${e.message}`)
  const api = await fetch(new URL('/api/users/me', cmsUrl)).then(async (r) => ({ status: r.status, json: /json/.test(r.headers.get('content-type') ?? '') }), (e) => ({ status: `error: ${e.message}` }))
  return { url: cmsUrl, admin, api, ok: admin === 200 && api.status === 200 && api.json }
}

/**
 * Anonymous reads and writes are refused. Write bodies are deliberately empty or invalid, so that a
 * collection whose access were open would answer 400 (validation) instead of creating anything.
 */
export const anonymousAccess = async (cmsUrl, siteId) => {
  const req = (method, p, body) => fetch(new URL(p, cmsUrl), {
    method, headers: body ? { 'content-type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined,
  }).then((r) => r.status, (e) => `error: ${e.message}`)
  const read = {}, write = {}
  for (const c of ['sites', 'media', 'tenants', 'users']) read[c] = await req('GET', `/api/${c}`)
  for (const c of ['sites', 'tenants', 'users']) write[`POST ${c}`] = await req('POST', `/api/${c}`, {})
  if (siteId != null) write[`PATCH sites/${siteId}`] = await req('PATCH', `/api/sites/${siteId}`, {})
  const ok = Object.values(read).every((s) => s === 403) && Object.values(write).every((s) => s === 403 || s === 401)
  return { read, write, ok }
}

/**
 * The owner's path (deployer base.md constraint 5): owner sees exactly its own site and media, never
 * another tenant's; anonymous access refused; evidence rows delete-only; one edit through the normal
 * publish flow reaches the live site and is put back. Throws on the first failure; `ev` (passed in)
 * holds everything measured up to that point, so a caller can report how far it got.
 */
export async function ownerPath({ cmsUrl = CMS_URL, slug, liveUrl, creds, sa, ev = {} }) {
  const owner = await Rest.login(cmsUrl, creds.email, creds.password)

  // isolation
  const mine = await owner.get('/api/sites?depth=0&limit=10')
  ev.ownerSitesVisible = mine.totalDocs
  if (mine.totalDocs !== 1) throw new Error(`owner sees ${mine.totalDocs} sites`)
  const others = (await sa.get('/api/sites?depth=0&limit=50')).docs.filter((d) => d.id !== mine.docs[0].id)
  ev.otherTenantSites = []
  for (const o of others) {
    const r = await owner.raw('GET', `/api/sites/${o.id}?depth=0`)
    ev.otherTenantSites.push({ siteId: o.id, status: r.status })
    if (r.status !== 404) throw new Error(`owner read site ${o.id}: ${r.status}`)
  }
  const media = await owner.get('/api/media?depth=0&limit=100')
  const tenantId = (await tenantOf(sa, slug)).id
  ev.ownerMediaForeign = media.docs.filter((m) => String(m.tenant) !== String(tenantId)).length
  if (ev.ownerMediaForeign) throw new Error('owner sees foreign media')
  const anon = await anonymousAccess(cmsUrl, mine.docs[0].id)
  ev.anonymous = anon.read
  ev.anonymousWrite = anon.write
  if (!anon.ok) throw new Error(`anonymous access: ${JSON.stringify({ read: anon.read, write: anon.write })}`)

  // evidence rows are delete-only for owners
  const doc = (await owner.get(`/api/sites/${mine.docs[0].id}?depth=0&locale=en`))
  const addRating = await owner.raw('PATCH', `/api/sites/${doc.id}?locale=en`, {
    json: { ratings: [...(doc.ratings ?? []), { platform: 'google', score: 5, scale: '5', count: 999, capturedAt: '2026-09-25' }] },
  })
  ev.ownerAddsRating = addRating.status
  if (addRating.ok) {
    // never leave the probe row behind: put the original rows back before failing
    const back = await owner.raw('PATCH', `/api/sites/${doc.id}?locale=en`, { json: { ratings: doc.ratings ?? [] } })
    ev.ownerAddsRatingRestored = back.status
    throw new Error('owner could add a rating')
  }

  // one edit through the normal publish flow (no priceList rows on these sites: the intro text instead)
  const marker = `verify-${randomBytes(4).toString('hex')}`
  const blocks = doc.copyBlocks.map((b) => ({ ...b }))
  const target = blocks.findIndex((b) => b.slot === 'intro')
  if (target < 0) throw new Error('no intro copy block to edit')
  const original = blocks[target].body
  blocks[target].body = `${original} ${marker}`
  const t0 = Date.now()
  const saved = await owner.raw('PATCH', `/api/sites/${doc.id}?locale=en&depth=0`, { json: { copyBlocks: blocks } })
  ev.edit = { field: `copyBlocks[${target}].body (intro)`, marker, saveStatus: saved.status, saveMs: Date.now() - t0 }
  if (!saved.ok) throw new Error(`owner save: ${saved.status} ${await saved.text()}`)
  try {
    const liveMs = await waitFor(async () => (await fetchText(liveUrl)).text.includes(marker))
    ev.edit.saveToLiveMs = liveMs === null ? null : liveMs + ev.edit.saveMs
    if (liveMs === null) throw new Error('edit never reached the live site')
  } finally {
    // restore whatever happened above
    blocks[target].body = original
    const restored = await owner.raw('PATCH', `/api/sites/${doc.id}?locale=en&depth=0`, { json: { copyBlocks: blocks } })
    const goneMs = await waitFor(async () => !(await fetchText(liveUrl)).text.includes(marker))
    ev.restore = { saveStatus: restored.status, saveToLiveMs: goneMs }
    const after = (await owner.get(`/api/sites/${doc.id}?depth=0&locale=en`)).copyBlocks[target].body
    ev.restore.valueMatchesOriginal = after === original
  }
  if (ev.restore.saveStatus !== 200 || ev.restore.saveToLiveMs === null) throw new Error('restore did not reach the live site')
  if (!ev.restore.valueMatchesOriginal) throw new Error('restored value differs from the original')
  const liveNow = await fetchText(liveUrl)
  ev.liveAfter = { status: liveNow.status, noindex: /<meta name="robots" content="noindex/.test(liveNow.text) }
  return ev
}
