import assert from 'node:assert/strict'
import { test } from 'node:test'
import { setTimeout as sleep } from 'node:timers/promises'

import { createQueue } from '../src/queue.mjs'

const fakePublisher = (ms) => {
  const calls = []
  let concurrent = 0
  let maxConcurrent = 0
  const publish = async (tenant, triggers) => {
    concurrent += 1
    maxConcurrent = Math.max(maxConcurrent, concurrent)
    calls.push({ tenant, triggers })
    await sleep(ms)
    concurrent -= 1
    return { ok: true, tenant }
  }
  return { calls, publish, max: () => maxConcurrent }
}

test('a burst of saves becomes one build', async () => {
  const p = fakePublisher(30)
  const q = createQueue({ publish: p.publish, debounceMs: 20 })
  for (let i = 0; i < 5; i++) q.request('a', `save-${i}`)
  await sleep(120)
  assert.equal(p.calls.length, 1)
  assert.equal(p.calls[0].triggers.length, 5)
})

test('saves during a build queue exactly one more build', async () => {
  const p = fakePublisher(80)
  const q = createQueue({ publish: p.publish, debounceMs: 10 })
  q.request('a', 'first')
  await sleep(40) // build running now
  q.request('a', 'during-1')
  q.request('a', 'during-2')
  q.request('a', 'during-3')
  await sleep(300)
  assert.equal(p.calls.length, 2)
  assert.deepEqual(p.calls[1].triggers, ['during-1', 'during-2', 'during-3'])
  assert.equal(q.status().a.state, 'idle')
})

test('tenants are independent but builds never overlap', async () => {
  const p = fakePublisher(50)
  const q = createQueue({ publish: p.publish, debounceMs: 10 })
  q.request('a', 'x')
  q.request('b', 'y')
  await sleep(250)
  assert.deepEqual(p.calls.map((c) => c.tenant).sort(), ['a', 'b'])
  assert.equal(p.max(), 1)
})

test('requestAndWait during a hook build waits for the NEXT build and never overlaps it', async () => {
  const log = []
  let running = 0
  const publish = async (slug, triggers) => {
    running += 1
    assert.equal(running, 1, 'builds overlap')
    log.push(triggers.join('+'))
    await new Promise((r) => setTimeout(r, 40))
    running -= 1
    return { ok: true, tenant: slug, triggers }
  }
  const q = createQueue({ publish, debounceMs: 10 })
  q.request('a', 'hook')
  await new Promise((r) => setTimeout(r, 20)) // hook build now running
  const { done } = q.requestAndWait('a', 'operator')
  const rec = await done
  assert.deepEqual(rec.triggers, ['operator'])
  assert.deepEqual(log, ['hook', 'operator'])
})
