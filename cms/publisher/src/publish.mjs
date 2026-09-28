/**
 * publish(tenant): fetch + build ONE tenant's site from ITS OWN template → per-tenant out dir →
 * deploy adapter:
 *   cloudflare  the template's wrangler.jsonc → `wrangler deploy` (`--dry-run` unless DEPLOY_MODE=live)
 *   local-dir   release dir + atomic `current` symlink flip under WEB_ROOT (served by Caddy)
 *
 * Every site has its own Astro template (sites/<slug>/final in the repo), synced to
 * TEMPLATES_ROOT/<tenant>/. The template is never built in place: each build copies it into
 * WORK_ROOT/<tenant>, links the shared site dependencies (astro + sharp, one install for all
 * templates) and runs the template's own steps: scripts/fetch-tenant.mjs → [video.mjs, ours:
 * video renditions, schema v0.9] → scripts/photos.mjs → astro build.
 */
import { spawn } from 'node:child_process'
import { appendFile, cp, mkdir, readFile, readdir, rename, rm, stat, symlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { config, TENANT_RE } from './config.mjs'

const VIDEO_STEP = path.join(path.dirname(fileURLToPath(import.meta.url)), 'video.mjs')

const run = (cmd, args, { cwd, env }) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] })
    let output = ''
    const onData = (chunk) => {
      output += chunk
      if (output.length > 200_000) output = output.slice(-100_000)
    }
    child.stdout.on('data', onData)
    child.stderr.on('data', onData)
    child.on('error', reject)
    child.on('close', (code) =>
      code === 0
        ? resolve(output)
        : reject(Object.assign(new Error(`${path.basename(cmd)} ${args[0] ?? ''} exited ${code}`), { output })),
    )
  })

/** Secrets each child does not need are stripped from its environment. */
const envWithout = (...keys) => {
  const env = { ...process.env }
  for (const k of keys) delete env[k]
  return env
}

/** The template's own Worker config: name = the brand slug (PLAN §9), assets-only, no `main`. */
const readWranglerConfig = async (templateDir) => {
  const cfg = JSON.parse(await readFile(path.join(templateDir, 'wrangler.jsonc'), 'utf8'))
  if (!cfg.name || cfg.main || cfg.assets?.directory !== './dist') {
    throw new Error('template wrangler.jsonc must name the Worker, serve ./dist as assets and have no main')
  }
  return cfg
}

const adapters = {
  /** Cloudflare Workers static assets: per-tenant wrangler config, then `wrangler deploy`. */
  cloudflare: async ({ tenantDir, templateDir }) => {
    const cfg = await readWranglerConfig(templateDir)
    const wranglerConfigPath = path.join(tenantDir, 'wrangler.jsonc')
    await cp(path.join(templateDir, 'wrangler.jsonc'), wranglerConfigPath)
    const args = ['deploy', '--config', wranglerConfigPath]
    if (config.deployMode !== 'live') args.push('--dry-run')
    const out = await run(config.wranglerBin, args, {
      cwd: tenantDir,
      env: {
        ...envWithout('PUBLISH_SECRET', 'BUILDER_API_KEY'),
        WRANGLER_SEND_METRICS: 'false',
        CI: '1', // never prompt
      },
    })
    const clean = out.replace(/\x1b\[[0-9;]*m/g, '')
    return {
      worker: cfg.name,
      url: clean.match(/https:\/\/[^\s]+\.workers\.dev/)?.[0] ?? null,
      version: clean.match(/Current Version ID: ([0-9a-f-]+)/)?.[1] ?? null,
      deployLog: clean.trim().split('\n').slice(-6).join(' | '),
    }
  },

  /**
   * Self-hosted: the web server (Caddy) serves WEB_ROOT/current. Each publish is a new release
   * directory; `current` is a relative symlink swapped with an atomic rename, so visitors never
   * see a half-copied site.
   */
  'local-dir': async ({ dist }) => {
    const releases = path.join(config.webRoot, 'releases')
    const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 17)
    await mkdir(releases, { recursive: true })
    await cp(dist, path.join(releases, stamp), { recursive: true })
    const tmpLink = path.join(config.webRoot, `.current-${stamp}`)
    await symlink(path.join('releases', stamp), tmpLink)
    await rename(tmpLink, path.join(config.webRoot, 'current'))
    const old = (await readdir(releases)).sort().slice(0, -config.keepReleases)
    for (const name of old) await rm(path.join(releases, name), { recursive: true, force: true })
    return { release: stamp, webRoot: config.webRoot }
  },
}

export const publish = async (tenant, triggers = ['manual']) => {
  if (!TENANT_RE.test(tenant)) throw new Error(`invalid tenant slug: ${JSON.stringify(tenant)}`)

  const started = Date.now()
  const templateDir = path.join(config.templatesRoot, tenant)
  const tenantDir = path.join(config.outRoot, tenant)
  // Astro moves files with rename(), which fails across filesystems (EXDEV): the work dir and its
  // dist/ must sit on one filesystem, so the whole build happens inside WORK_ROOT/<tenant>.
  const work = path.join(config.workRoot, tenant)
  const building = path.join(work, 'dist')
  const staging = path.join(tenantDir, 'dist.staging')
  const dist = path.join(tenantDir, 'dist')
  const record = {
    at: new Date(started).toISOString(),
    tenant,
    triggers,
    adapter: config.deployAdapter,
    mode: config.deployAdapter === 'cloudflare' ? config.deployMode : 'n/a',
    ok: false,
  }

  try {
    if (!(await stat(path.join(templateDir, 'package.json')).catch(() => null))) {
      throw new Error(`no template for tenant "${tenant}" in ${config.templatesRoot}`)
    }
    await mkdir(tenantDir, { recursive: true })
    await rm(work, { recursive: true, force: true })
    await cp(templateDir, work, {
      recursive: true,
      filter: (src) => !/[\\/](node_modules|dist|\.astro|shots)$/.test(src),
    })
    await symlink(config.siteDepsModules, path.join(work, 'node_modules'))

    // 1. content + photos for this tenant only, then the template's own build steps
    const buildEnv = {
      ...envWithout('PUBLISH_SECRET', 'CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'),
      TENANT_SLUG: tenant,
      ONESHOT_PROFILE: config.profile,
      CMS_URL: config.cmsUrl,
      BUILDER_API_KEY: config.builderApiKey,
      ASTRO_TELEMETRY_DISABLED: '1',
    }
    await run(process.execPath, ['scripts/fetch-tenant.mjs'], { cwd: work, env: buildEnv })
    // owner video → web renditions (a child process: encodes must not block the HTTP server);
    // it may still need the builder key to fetch originals a pre-v0.8 fetch step did not download
    const videoLog = await run(process.execPath, [VIDEO_STEP, work], { cwd: work, env: { ...buildEnv, VIDEO_CACHE_DIR: config.videoCacheDir } })
    record.video = videoLog.trim().split('\n').pop()
    delete buildEnv.BUILDER_API_KEY
    await run(process.execPath, ['scripts/photos.mjs'], { cwd: work, env: buildEnv })
    await run(path.join(config.siteDepsModules, '.bin', 'astro'), ['build'], { cwd: work, env: buildEnv })
    // swap in only after a successful build: a failed build never damages the last good output
    await rm(staging, { recursive: true, force: true })
    await cp(building, staging, { recursive: true })
    await rm(dist, { recursive: true, force: true })
    await rename(staging, dist)
    await rm(work, { recursive: true, force: true })
    record.buildMs = Date.now() - started

    // 2. deploy through the configured adapter
    const deployStarted = Date.now()
    Object.assign(record, await adapters[config.deployAdapter]({ tenant, tenantDir, templateDir, dist }))
    record.deployMs = Date.now() - deployStarted
    record.ok = true
  } catch (err) {
    record.error = err.message
    record.output = (err.output ?? '').slice(-4000)
  }

  record.totalMs = Date.now() - started
  console.log(JSON.stringify({ event: 'publish', ...record }))
  await appendFile(path.join(config.outRoot, 'publish-log.jsonl'), JSON.stringify(record) + '\n').catch(() => {})
  return record
}
