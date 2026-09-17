import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const env = process.env

const deployMode = env.DEPLOY_MODE || 'dry-run'
if (!['dry-run', 'live'].includes(deployMode)) {
  throw new Error(`DEPLOY_MODE must be "dry-run" or "live" (got "${deployMode}")`)
}

// Hosting mode is a deploy ADAPTER of the one publisher — never a fork of the site or the CMS.
//   cloudflare: generate wrangler config + `wrangler deploy` (one Worker per tenant)
//   local-dir:  copy the build into WEB_ROOT/releases/<stamp> and flip WEB_ROOT/current (Caddy root)
const deployAdapter = env.DEPLOY_ADAPTER || 'cloudflare'
if (!['cloudflare', 'local-dir'].includes(deployAdapter)) {
  throw new Error(`DEPLOY_ADAPTER must be "cloudflare" or "local-dir" (got "${deployAdapter}")`)
}

export const config = {
  deployAdapter,
  profile: env.ONESHOT_PROFILE || 'multi-tenant', // passed through to the site's fetch helper
  webRoot: path.resolve(env.WEB_ROOT || path.join(here, '..', '..', 'out', '_webroot')),
  keepReleases: Number(env.KEEP_RELEASES ?? 3),
  host: env.PUBLISHER_HOST || '127.0.0.1',
  port: Number(env.PUBLISHER_PORT || 4100),
  publishSecret: env.PUBLISH_SECRET || '',
  deployMode, // DEFAULT dry-run: `wrangler deploy --dry-run`, nothing leaves the machine
  cmsUrl: env.CMS_URL || `http://localhost:${env.CMS_PORT || 3100}`,
  builderApiKey: env.BUILDER_API_KEY || '',
  siteDir: path.resolve(env.SITE_DIR || path.join(here, '..', '..', 'site')),
  outRoot: path.resolve(env.OUT_ROOT || path.join(here, '..', '..', 'out')),
  workerPrefix: env.WORKER_PREFIX || 'oneshot-spike',
  compatibilityDate: env.COMPATIBILITY_DATE || '2026-09-17',
  debounceMs: Number(env.DEBOUNCE_MS ?? 1500),
  wranglerBin: path.join(here, '..', 'node_modules', '.bin', 'wrangler'),
}

export const TENANT_RE = /^[a-z0-9](?:[a-z0-9-]{0,40}[a-z0-9])?$/

export const assertConfig = () => {
  if (config.publishSecret.length < 24) throw new Error('PUBLISH_SECRET missing or shorter than 24 chars')
  if (!config.builderApiKey) throw new Error('BUILDER_API_KEY missing')
}
