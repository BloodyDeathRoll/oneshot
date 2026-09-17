/** Minimal test harness + helpers shared by both end-to-end suites. Zero dependencies. */
import { execFile } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const exec = promisify(execFile)
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
export const outputDir = path.join(root, 'test', 'output')
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export const createSuite = (name) => {
  const results = []
  const notes = {}
  const check = async (title, fn) => {
    const started = Date.now()
    try {
      const detail = await fn()
      results.push({ title, status: 'PASS', ms: Date.now() - started, detail: detail ?? '' })
      console.log(`PASS  ${title}${detail ? `  — ${detail}` : ''}`)
    } catch (err) {
      const status = err.skip ? 'SKIP' : 'FAIL'
      results.push({ title, status, ms: Date.now() - started, detail: err.message })
      console.log(`${status}  ${title}  — ${err.message}`)
    }
  }
  const finish = async () => {
    const count = (s) => results.filter((r) => r.status === s).length
    const summary = { suite: name, at: new Date().toISOString(), pass: count('PASS'), fail: count('FAIL'), skip: count('SKIP'), notes, results }
    await mkdir(outputDir, { recursive: true })
    await writeFile(path.join(outputDir, `${name}.json`), JSON.stringify(summary, null, 2) + '\n')
    console.log(`\n${name}: ${summary.pass} passed, ${summary.fail} failed, ${summary.skip} skipped → test/output/${name}.json`)
    return summary.fail === 0 ? 0 : 1
  }
  return { check, finish, notes }
}

export const assert = (cond, message) => {
  if (!cond) throw new Error(message)
}
export const skip = (message) => {
  throw Object.assign(new Error(message), { skip: true })
}

/** fetch wrapper returning { status, body } with JSON parsed when possible. */
export const http = async (url, { method = 'GET', token, apiKey, json, headers = {} } = {}) => {
  const res = await fetch(url, {
    method,
    headers: {
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...(apiKey ? { Authorization: `builders API-Key ${apiKey}` } : {}),
      ...(json ? { 'content-type': 'application/json' } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : undefined,
    redirect: 'manual',
  })
  const text = await res.text()
  let body = text
  try { body = JSON.parse(text) } catch { /* not json */ }
  return { status: res.status, body, ms: 0 }
}

export const login = async (cms, email, password) => {
  const r = await http(`${cms}/api/users/login`, { method: 'POST', json: { email, password } })
  return { status: r.status, token: r.body?.token, user: r.body?.user, body: r.body }
}

export const denied = (status) => [401, 403, 404].includes(status)

/** docker compose helper bound to one compose file/project. */
export const compose = (file, envFile) => {
  const base = ['compose', '-f', path.join(root, file), '--env-file', path.join(root, envFile)]
  const run = async (args, opts = {}) => (await exec('docker', [...base, ...args], { cwd: root, maxBuffer: 32e6, ...opts })).stdout
  return {
    run,
    execIn: (service, cmd) => run(['exec', '-T', service, ...cmd]),
    /** HTTP call made from INSIDE the publisher container (it is not published on the host). */
    publisher: async (p, { method = 'GET', secret, body } = {}) => {
      const script = `fetch('http://127.0.0.1:4100${p}',{method:'${method}',headers:{${secret ? `authorization:'Bearer ${secret}',` : ''}'content-type':'application/json'}${body ? `,body:${JSON.stringify(JSON.stringify(body))}` : ''}}).then(async r=>console.log(JSON.stringify({status:r.status,body:await r.json().catch(()=>null)})))`
      return JSON.parse(await run(['exec', '-T', 'publisher', 'node', '-e', script]))
    },
  }
}

export const waitFor = async (fn, { timeoutMs = 120_000, everyMs = 500, what = 'condition' } = {}) => {
  const started = Date.now()
  for (;;) {
    const value = await fn()
    if (value) return { value, ms: Date.now() - started }
    if (Date.now() - started > timeoutMs) throw new Error(`timed out after ${timeoutMs} ms waiting for ${what}`)
    await sleep(everyMs)
  }
}

/** playwright-core from the local npx cache, if present (never installed by this spike). */
export const loadPlaywright = async () => {
  const { readdir } = await import('node:fs/promises')
  const npx = path.join(process.env.HOME || '', '.npm', '_npx')
  for (const dir of await readdir(npx).catch(() => [])) {
    try {
      const require = createRequire(path.join(npx, dir, 'node_modules') + '/')
      return require('playwright-core')
    } catch { /* keep looking */ }
  }
  return null
}
