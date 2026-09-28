#!/usr/bin/env node
/**
 * Deployer adapter `managed` (agents/deployer/tools.md): our multi-tenant Payload + Cloudflare Workers.
 *
 *   node deploy/managed/deploy.mjs <slug> [--steps provision,seed,deploy,verify]
 *
 * Runs from the operator's machine. Talks to the CMS over HTTPS (CMS_URL) and to the CMS server
 * over SSH (CMS_SSH) for the two things that are not exposed on the internet: the super-admin
 * credentials (read into memory, never written here) and the publisher (scripts/publish.sh).
 *
 * Steps (attach_domain, handoff, export are skipped for this adapter until a sale):
 *   provision  sync the site's template to the server; tenant + owner user + empty site doc
 *   seed       sites/<slug>/final/src/tenant/{content.json,media/} → export format → import
 *              (video: content.json's, else dossier/<slug> videos[] → heroVideo/heroVideoPoster/videos[])
 *   deploy     publisher builds the tenant from the CMS and runs `wrangler deploy`; URL → 200;
 *              parity: the CMS-built index.html against a local build of the repo's content.json
 *   verify     owner path: login, one edit round-tripped to the live site and restored, tenant
 *              isolation, anonymous 403, evidence rows delete-only
 *
 * Each step appends {step, ok, started, ms, evidence} to sites/<slug>/deploy.json.
 * Owner credentials: generated here, written ONLY to ~/.oneshot/sealed/<slug>.json (mode 600).
 */
import { execFileSync, spawnSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, chmodSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { importTenant, Rest } from '../../cms/scripts/lib/tenant-io.mjs'
import { resolveVideo, writeSeedExport } from './seed-export.mjs'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const ADAPTER_VERSION = '0.1.0'
const CMS_URL = process.env.CMS_URL || 'https://130-61-212-182.sslip.io'
const CMS_SSH = process.env.CMS_SSH || 'ubuntu@130.61.212.182'
const SSH_KEY = process.env.CMS_SSH_KEY || path.join(os.homedir(), '.ssh', 'oneshot_cms')
const REMOTE = process.env.CMS_REMOTE_DIR || 'oneshot' // on the server: ~/oneshot/{cms,sites}
const SEALED = path.join(os.homedir(), '.oneshot', 'sealed')
const OWNER_DOMAIN = 'oneshot.test' // test run: owners are never contacted (Shahar, 2026-09-25)

const args = process.argv.slice(2)
const slug = args[0]
const steps = (args.includes('--steps') ? args[args.indexOf('--steps') + 1] : 'provision,seed,deploy,verify').split(',')
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('usage: deploy.mjs <slug> [--steps provision,seed,deploy,verify]')
  process.exit(2)
}
const final = path.join(repo, 'sites', slug, 'final')
const content = JSON.parse(readFileSync(path.join(final, 'src', 'tenant', 'content.json'), 'utf8'))
const site = content.locales.en
const worker = JSON.parse(readFileSync(path.join(final, 'wrangler.jsonc'), 'utf8')).name
const liveUrl = `https://${worker}.os1.workers.dev/`
const deployJsonPath = path.join(repo, 'sites', slug, 'deploy.json')

// ------------------------------------------------------------------ helpers

const ssh = (cmd, { input } = {}) =>
  execFileSync('ssh', ['-i', SSH_KEY, '-o', 'BatchMode=yes', CMS_SSH, cmd], { input, encoding: 'utf8', maxBuffer: 64 << 20 })

const remoteEnv = (key) => ssh(`grep -E '^${key}=' ${REMOTE}/cms/.env | head -1 | cut -d= -f2-`).trim()

const superAdmin = async () => Rest.login(CMS_URL, remoteEnv('SUPERADMIN_EMAIL'), remoteEnv('SUPERADMIN_PASSWORD'))

const sealedPath = path.join(SEALED, `${slug}.json`)
const ownerCredentials = () => {
  if (existsSync(sealedPath)) return JSON.parse(readFileSync(sealedPath, 'utf8'))
  mkdirSync(SEALED, { recursive: true, mode: 0o700 })
  const creds = { cms: CMS_URL, tenant: slug, email: `owner+${slug}@${OWNER_DOMAIN}`, password: randomBytes(18).toString('base64url') }
  writeFileSync(sealedPath, JSON.stringify(creds, null, 2) + '\n', { mode: 0o600 })
  chmodSync(sealedPath, 0o600)
  return creds
}

const record = { adapter: 'managed', adapterVersion: ADAPTER_VERSION, slug, worker, cms: CMS_URL, steps: [] }
if (existsSync(deployJsonPath)) Object.assign(record, JSON.parse(readFileSync(deployJsonPath, 'utf8')), { adapterVersion: ADAPTER_VERSION })
const save = () => writeFileSync(deployJsonPath, JSON.stringify(record, null, 2) + '\n')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const fetchText = async (url) => {
  const res = await fetch(url, { cache: 'no-store', headers: { 'cache-control': 'no-cache' } })
  return { status: res.status, text: await res.text() }
}
const waitFor = async (predicate, { timeoutMs = 240_000, everyMs = 2000 } = {}) => {
  const t0 = Date.now()
  while (Date.now() - t0 < timeoutMs) {
    if (await predicate()) return Date.now() - t0
    await sleep(everyMs)
  }
  return null
}
const tenantOf = async (rest) => (await rest.get(`/api/tenants?where[slug][equals]=${slug}&depth=0&limit=1`)).docs[0]
const siteOf = async (rest, tenantId, q = 'depth=0') => (await rest.get(`/api/sites?where[tenant][equals]=${tenantId}&${q}&limit=1`)).docs[0]

// ------------------------------------------------------------------ steps

const STEPS = {
  async provision() {
    // the template (not the content: that comes from the CMS at build time), without build products
    const rsync = spawnSync('rsync', [
      '-a', '--delete', '-e', `ssh -i ${SSH_KEY} -o BatchMode=yes`,
      '--exclude', 'node_modules', '--exclude', 'dist', '--exclude', '.astro', '--exclude', 'shots',
      '--exclude', 'public/photos', '--exclude', 'src/tenant/media', '--exclude', 'src/tenant/photos.generated.json',
      '--exclude', 'public/video', '--exclude', 'src/tenant/videos.generated.json',
      '--exclude', 'package-lock.json', '--exclude', 'audit.json', '--exclude', 'notes.md', '--exclude', '*-vs-*',
      `${final}/`, `${CMS_SSH}:${REMOTE}/sites/${slug}/`,
    ], { encoding: 'utf8' })
    if (rsync.status !== 0) throw new Error(`rsync: ${rsync.stderr}`)

    const sa = await superAdmin()
    let tenant = await tenantOf(sa)
    const createdTenant = !tenant
    if (!tenant) tenant = (await sa.post('/api/tenants', { name: site.businessName, slug })).doc

    const creds = ownerCredentials()
    let owner = (await sa.get(`/api/users?where[email][equals]=${encodeURIComponent(creds.email)}&depth=0&limit=1`)).docs[0]
    const createdOwner = !owner
    if (!owner) {
      owner = (await sa.post('/api/users', {
        email: creds.email, password: creds.password, role: 'owner', name: `${site.businessName} owner`, tenants: [{ tenant: tenant.id }],
      })).doc
    }
    let doc = await siteOf(sa, tenant.id)
    const createdSite = !doc
    if (!doc) {
      doc = (await sa.post('/api/sites?locale=en&depth=0', {
        tenant: tenant.id, businessName: site.businessName, businessType: site.businessType, languages: site.languages,
      })).doc
    }
    return {
      template: `${REMOTE}/sites/${slug}`,
      tenantId: tenant.id, createdTenant, ownerUserId: owner.id, ownerEmail: creds.email, createdOwner,
      siteId: doc.id, createdSite, credentials: `sealed: ${sealedPath.replace(os.homedir(), '~')} (not in the repo)`,
    }
  },

  async seed() {
    // content.json (the dossier → schema conversion the build already passed critique with) → export format v1
    const dir = mkdtempSync(path.join(os.tmpdir(), `oneshot-seed-${slug}-`))
    try {
      // video: content.json's own video fields, else the dossier's videos[] (schema v0.8 mapping)
      const seedSite = structuredClone(site)
      const video = resolveVideo(seedSite, { dossierPath: path.join(repo, 'dossier', slug, 'dossier.json') })
      const { media } = writeSeedExport({ site: seedSite, slug, mediaDir: path.join(final, 'src', 'tenant', 'media'), dir })

      // super-admin: ratings/testimonials/forecast.rosaSpotId are deployer fields an owner cannot write
      const sa = await superAdmin()
      const tenant = await tenantOf(sa)
      if (!tenant) throw new Error('no tenant — run provision first')
      const result = await importTenant({ rest: sa, dir, tenantId: tenant.id, reuseMedia: true })
      // idempotent re-seed: photos of this tenant that the site no longer references are removed
      const used = new Set(Object.values(result.mediaIds).map(String))
      const all = (await sa.get(`/api/media?where[tenant][equals]=${tenant.id}&depth=0&limit=500`)).docs
      const removed = []
      for (const m of all.filter((m) => !used.has(String(m.id)))) {
        await sa.call('DELETE', `/api/media/${m.id}`)
        removed.push(m.filename)
      }
      const empty = Object.entries(site)
        .filter(([k, v]) => !['id', 'tenant', 'createdAt', 'updatedAt'].includes(k) && (v == null || (Array.isArray(v) && v.length === 0)))
        .map(([k]) => k)
      const contactEmpty = Object.entries(site.contact ?? {}).filter(([, v]) => v == null).map(([k]) => `contact.${k}`)
      return {
        source: `sites/${slug}/final/src/tenant/content.json (critic-passed; built from dossier/${slug}/dossier.json by scripts/seed-from-dossier.mjs)`,
        siteId: result.siteId, replacedExisting: result.replacedExisting, locales: result.locales,
        fieldsSeeded: Object.keys(site).filter((k) => !['id', 'tenant', 'createdAt', 'updatedAt'].includes(k) && !empty.includes(k)),
        gaps: [...empty, ...contactEmpty],
        photos: media.filter((m) => !m.mimeType.startsWith('video/')).map((m) => ({ filename: m.filename, mediaId: result.mediaIds[m.filename] })),
        video: {
          source: video.source, // content.json | dossier | none
          heroVideo: seedSite.heroVideo ? { from: seedSite.heroVideo.path ? path.relative(repo, seedSite.heroVideo.path) : seedSite.heroVideo.filename } : null,
          rows: (seedSite.videos ?? []).length,
          files: media.filter((m) => m.mimeType.startsWith('video/')).map((m) => ({ filename: m.filename, mediaId: result.mediaIds[m.filename] })),
          dossierEntriesNotUsed: video.skipped,
        },
        renamed: result.renamed,
        reused: result.reused.length,
        unreferencedMediaRemoved: removed,
        licence: 'business-owned photographs and videos only (dossier assets); no atmosphere/stock images are in content.json',
      }
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  },

  async deploy() {
    const raw = ssh(`${REMOTE}/cms/scripts/publish.sh ${slug}`)
    const rec = raw.split('\n').filter((l) => l.startsWith('{')).map((l) => JSON.parse(l)).find((r) => r.event === 'publish')
    if (!rec?.ok) throw new Error(`publish failed: ${rec?.error ?? raw.slice(-2000)}`)

    // parity: the CMS round trip must not change the site. Build the repo's content.json locally the
    // same way and compare index.html with what the publisher built from Payload.
    const cmsHtml = ssh(`cd ${REMOTE}/cms && docker compose --env-file .env exec -T publisher cat /data/out/${slug}/dist/index.html`)
    const b = spawnSync('npm', ['run', 'build'], { cwd: final, encoding: 'utf8' })
    if (b.status !== 0) throw new Error(`local build failed: ${b.stderr.slice(-1000)}`)
    const localHtml = readFileSync(path.join(final, 'dist', 'index.html'), 'utf8')
    const diff = lineDiff(localHtml, cmsHtml.replace(new RegExp(`${slug}-[0-9a-f]{8}-(img|vid)-`, 'g'), '$1-'))

    let live = null
    if (rec.mode === 'live') {
      const ms = await waitFor(async () => (await fetchText(liveUrl)).text === cmsHtml, { timeoutMs: 120_000 })
      const r = await fetchText(liveUrl)
      live = { url: liveUrl, status: r.status, identicalToBuild: r.text === cmsHtml, msUntilIdentical: ms, noindex: /<meta name="robots" content="noindex/.test(r.text) }
      if (r.status !== 200 || !live.identicalToBuild) throw new Error(`live check failed: ${JSON.stringify(live)}`)
    }
    return {
      mode: rec.mode, worker: rec.worker, url: rec.url, version: rec.version, buildMs: rec.buildMs, deployMs: rec.deployMs, totalMs: rec.totalMs,
      parity: { identical: diff.length === 0, note: 'photo and video names compared without the seed\'s slug-hash prefix', differingLines: diff.slice(0, 20) },
      live,
    }
  },

  async verify() {
    if (!record.steps.some((s) => s.step === 'deploy' && s.ok && s.evidence?.mode === 'live')) {
      throw new Error('verify needs a live deploy first (DEPLOY_MODE=live on the server)')
    }
    const creds = ownerCredentials()
    const owner = await Rest.login(CMS_URL, creds.email, creds.password)
    const ev = {}

    // isolation
    const mine = await owner.get('/api/sites?depth=0&limit=10')
    ev.ownerSitesVisible = mine.totalDocs
    if (mine.totalDocs !== 1) throw new Error(`owner sees ${mine.totalDocs} sites`)
    const sa = await superAdmin()
    const others = (await sa.get('/api/sites?depth=0&limit=50')).docs.filter((d) => d.id !== mine.docs[0].id)
    ev.otherTenantSites = []
    for (const o of others) {
      const r = await owner.raw('GET', `/api/sites/${o.id}?depth=0`)
      ev.otherTenantSites.push({ siteId: o.id, status: r.status })
      if (r.status !== 404) throw new Error(`owner read site ${o.id}: ${r.status}`)
    }
    const media = await owner.get('/api/media?depth=0&limit=100')
    const tenantId = (await tenantOf(sa)).id
    ev.ownerMediaForeign = media.docs.filter((m) => String(m.tenant) !== String(tenantId)).length
    if (ev.ownerMediaForeign) throw new Error('owner sees foreign media')
    ev.anonymous = {}
    for (const c of ['sites', 'media', 'tenants', 'users']) ev.anonymous[c] = (await fetch(new URL(`/api/${c}`, CMS_URL))).status
    if (Object.values(ev.anonymous).some((s) => s !== 403)) throw new Error(`anonymous access: ${JSON.stringify(ev.anonymous)}`)

    // evidence rows are delete-only for owners
    const doc = (await owner.get(`/api/sites/${mine.docs[0].id}?depth=0&locale=en`))
    const addRating = await owner.raw('PATCH', `/api/sites/${doc.id}?locale=en`, {
      json: { ratings: [...(doc.ratings ?? []), { platform: 'google', score: 5, scale: '5', count: 999, capturedAt: '2026-09-25' }] },
    })
    ev.ownerAddsRating = addRating.status
    if (addRating.ok) throw new Error('owner could add a rating')

    // one edit through the normal publish flow (no priceList rows on this site: the intro text instead)
    const marker = `verify-${randomBytes(4).toString('hex')}`
    const blocks = doc.copyBlocks.map((b) => ({ ...b }))
    const target = blocks.findIndex((b) => b.slot === 'intro')
    const original = blocks[target].body
    blocks[target].body = `${original} ${marker}`
    const t0 = Date.now()
    const saved = await owner.raw('PATCH', `/api/sites/${doc.id}?locale=en&depth=0`, { json: { copyBlocks: blocks } })
    ev.edit = { field: `copyBlocks[${target}].body (intro)`, marker, saveStatus: saved.status, saveMs: Date.now() - t0 }
    if (!saved.ok) throw new Error(`owner save: ${saved.status} ${await saved.text()}`)
    const liveMs = await waitFor(async () => (await fetchText(liveUrl)).text.includes(marker))
    ev.edit.saveToLiveMs = liveMs === null ? null : liveMs + ev.edit.saveMs
    if (liveMs === null) throw new Error('edit never reached the live site')

    blocks[target].body = original
    const restored = await owner.raw('PATCH', `/api/sites/${doc.id}?locale=en&depth=0`, { json: { copyBlocks: blocks } })
    const goneMs = await waitFor(async () => !(await fetchText(liveUrl)).text.includes(marker))
    ev.restore = { saveStatus: restored.status, saveToLiveMs: goneMs }
    if (!restored.ok || goneMs === null) throw new Error('restore did not reach the live site')
    const after = (await owner.get(`/api/sites/${doc.id}?depth=0&locale=en`)).copyBlocks[target].body
    ev.restore.valueMatchesOriginal = after === original
    if (!ev.restore.valueMatchesOriginal) throw new Error('restored value differs from the original')
    const liveNow = await fetchText(liveUrl)
    ev.liveAfter = { status: liveNow.status, noindex: /<meta name="robots" content="noindex/.test(liveNow.text) }
    return ev
  },
}

/** Lines that differ between two HTML files (after splitting tags onto their own lines). */
function lineDiff(a, b) {
  const split = (s) => s.replace(/></g, '>\n<').split('\n')
  const A = split(a), B = split(b)
  const out = []
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    if (A[i] !== B[i]) out.push({ line: i + 1, local: (A[i] ?? '').slice(0, 200), cms: (B[i] ?? '').slice(0, 200) })
  }
  return out
}

// ------------------------------------------------------------------ run

for (const step of steps) {
  if (!STEPS[step]) throw new Error(`unknown step ${step}`)
  const started = new Date()
  const entry = { step, ok: false, started: started.toISOString() }
  try {
    entry.evidence = await STEPS[step]()
    entry.ok = true
  } catch (err) {
    entry.error = err.message
  }
  entry.ms = Date.now() - started.getTime()
  record.steps.push(entry)
  save()
  console.log(JSON.stringify(entry, null, 2))
  if (!entry.ok) process.exit(1)
}
