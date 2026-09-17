#!/usr/bin/env node
/**
 * One-shot publish without the HTTP service:
 *   node --env-file=../.env src/cli.mjs <tenant-slug> [<tenant-slug> …]
 * Honours DEPLOY_MODE (default dry-run). Builds run one after another.
 */
import { assertConfig, config } from './config.mjs'
import { publish } from './publish.mjs'

const tenants = process.argv.slice(2)
if (tenants.length === 0) {
  console.error('usage: cli.mjs <tenant-slug> [<tenant-slug> …]')
  process.exit(2)
}
assertConfig()
console.error(`publisher cli: mode=${config.deployMode} cms=${config.cmsUrl} out=${config.outRoot}`)

let failed = 0
for (const tenant of tenants) {
  const record = await publish(tenant, ['cli'])
  if (!record.ok) {
    failed += 1
    console.error(record.output || record.error)
  }
}
process.exit(failed ? 1 : 0)
