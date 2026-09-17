/**
 * publish(tenant): fetch + `astro build` for ONE tenant → per-tenant out dir → deploy adapter:
 *   cloudflare  generated wrangler config → `wrangler deploy` (`--dry-run` unless DEPLOY_MODE=live)
 *   local-dir   release dir + atomic `current` symlink flip under WEB_ROOT (served by Caddy)
 */
import { spawn } from 'node:child_process'
import { appendFile, cp, mkdir, readdir, rename, rm, symlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { config, TENANT_RE } from './config.mjs'

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

export const workerName = (tenant) => `${config.workerPrefix}-${tenant}`

export const wranglerConfigFor = (tenant) => ({
  $schema: 'node_modules/wrangler/config-schema.json',
  name: workerName(tenant),
  compatibility_date: config.compatibilityDate,
  // assets-only Worker: no `main`, Cloudflare serves ./dist directly
  assets: { directory: './dist', not_found_handling: '404-page', html_handling: 'auto-trailing-slash' },
  workers_dev: true,
  preview_urls: false,
})

const adapters = {
  /** Cloudflare Workers static assets: per-tenant wrangler config, then `wrangler deploy`. */
  cloudflare: async ({ tenant, tenantDir }) => {
    const wranglerConfigPath = path.join(tenantDir, 'wrangler.jsonc')
    await writeFile(wranglerConfigPath, JSON.stringify(wranglerConfigFor(tenant), null, 2) + '\n')
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
    return { worker: workerName(tenant), url: out.match(/https:\/\/[^\s]+\.workers\.dev/)?.[0] ?? null }
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
  const tenantDir = path.join(config.outRoot, tenant)
  const building = path.join(tenantDir, 'dist.building')
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
    await mkdir(tenantDir, { recursive: true })
    await rm(building, { recursive: true, force: true })

    // 1. content + photos for this tenant only, then the static build
    const buildEnv = {
      ...envWithout('PUBLISH_SECRET', 'CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'),
      TENANT_SLUG: tenant,
      ONESHOT_PROFILE: config.profile,
      CMS_URL: config.cmsUrl,
      BUILDER_API_KEY: config.builderApiKey,
      OUT_DIR: building,
      ASTRO_TELEMETRY_DISABLED: '1',
    }
    await run(process.execPath, ['scripts/fetch-tenant.mjs'], { cwd: config.siteDir, env: buildEnv })
    delete buildEnv.BUILDER_API_KEY
    await run(path.join(config.siteDir, 'node_modules', '.bin', 'astro'), ['build'], {
      cwd: config.siteDir,
      env: buildEnv,
    })
    // swap in only after a successful build: a failed build never damages the last good output
    await rm(dist, { recursive: true, force: true })
    await rename(building, dist)
    record.buildMs = Date.now() - started

    // 2. deploy through the configured adapter
    const deployStarted = Date.now()
    Object.assign(record, await adapters[config.deployAdapter]({ tenant, tenantDir, dist }))
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
