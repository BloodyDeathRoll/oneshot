#!/usr/bin/env node
/**
 * Publisher: tiny HTTP service the CMS hooks call.
 *   POST /publish  {"tenant":"<slug>","trigger":"sites.update"}   Authorization: Bearer <PUBLISH_SECRET>
 *   GET  /status                                                   Authorization: Bearer <PUBLISH_SECRET>
 *   GET  /healthz                                                  (no auth, no information)
 */
import { createHash, timingSafeEqual } from 'node:crypto'
import http from 'node:http'

import { assertConfig, config, TENANT_RE } from './config.mjs'
import { publish } from './publish.mjs'
import { createQueue } from './queue.mjs'

assertConfig()
const queue = createQueue({ publish, debounceMs: config.debounceMs })

const digest = (s) => createHash('sha256').update(s).digest()
const authorised = (req) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  return timingSafeEqual(digest(token), digest(config.publishSecret))
}

const send = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' })
  res.end(JSON.stringify(body))
}

const readJson = (req, limit = 10_000) =>
  new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (c) => {
      size += c.length
      if (size > limit) {
        reject(Object.assign(new Error('body too large'), { status: 413 }))
        req.destroy()
      } else chunks.push(c)
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch {
        reject(Object.assign(new Error('invalid JSON'), { status: 400 }))
      }
    })
    req.on('error', reject)
  })

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://publisher')
    if (req.method === 'GET' && url.pathname === '/healthz') return send(res, 200, { ok: true })

    if (!authorised(req)) {
      console.log(JSON.stringify({ event: 'rejected', reason: 'unauthorised', path: url.pathname, from: req.socket.remoteAddress }))
      return send(res, 401, { error: 'unauthorised' })
    }
    if (req.method === 'GET' && url.pathname === '/status') {
      return send(res, 200, { adapter: config.deployAdapter, mode: config.deployMode, tenants: queue.status() })
    }
    if (req.method === 'POST' && url.pathname === '/publish') {
      const body = await readJson(req)
      if (typeof body.tenant !== 'string' || !TENANT_RE.test(body.tenant)) {
        return send(res, 400, { error: 'tenant must be a slug' })
      }
      const trigger = typeof body.trigger === 'string' ? body.trigger.slice(0, 80) : 'unknown'
      const queued = queue.request(body.tenant, trigger)
      console.log(JSON.stringify({ event: 'request', tenant: body.tenant, trigger, queued }))
      return send(res, 202, { accepted: true, tenant: body.tenant, queued })
    }
    return send(res, 404, { error: 'not found' })
  } catch (err) {
    return send(res, err.status || 500, { error: err.status ? err.message : 'internal error' })
  }
})

server.listen(config.port, config.host, () => {
  console.log(JSON.stringify({
    event: "listening", host: config.host, port: config.port, adapter: config.deployAdapter, mode: config.deployMode, profile: config.profile,
    cms: config.cmsUrl, outRoot: config.outRoot, debounceMs: config.debounceMs,
  }))
})
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => server.close(() => process.exit(0)))
