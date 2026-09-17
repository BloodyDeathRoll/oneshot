/**
 * Coalescing queue.
 *  - A request for tenant T (re)starts T's debounce timer; bursts collapse into one build.
 *  - While T is building, further requests set ONE pending flag → exactly one more build.
 *  - Builds run one at a time across all tenants (the Astro project dir holds per-build tenant
 *    data, and the target box is small), first-come first-served.
 */
export const createQueue = ({ publish, debounceMs }) => {
  const tenants = new Map() // slug -> { timer, state: idle|debouncing|queued|building, pending, triggers, builds, last }
  const ready = [] // FIFO of slugs waiting for the single build slot
  let busy = false

  const get = (slug) => {
    if (!tenants.has(slug)) {
      tenants.set(slug, { timer: null, state: 'idle', pending: false, triggers: [], requests: 0, builds: 0, last: null })
    }
    return tenants.get(slug)
  }

  const pump = async () => {
    if (busy) return
    const slug = ready.shift()
    if (!slug) return
    busy = true
    const t = get(slug)
    const triggers = t.triggers.splice(0)
    t.state = 'building'
    try {
      t.last = await publish(slug, triggers)
    } catch (err) {
      t.last = { ok: false, tenant: slug, error: err.message }
    }
    t.builds += 1
    busy = false
    if (t.pending) {
      t.pending = false
      t.state = 'queued'
      ready.push(slug)
    } else {
      t.state = 'idle'
    }
    void pump()
  }

  const request = (slug, trigger = 'unknown') => {
    const t = get(slug)
    t.requests += 1
    t.triggers.push(trigger)
    if (t.state === 'building') {
      t.pending = true
      return 'pending-after-current-build'
    }
    if (t.state === 'queued') return 'already-queued'
    clearTimeout(t.timer)
    t.state = 'debouncing'
    t.timer = setTimeout(() => {
      t.state = 'queued'
      ready.push(slug)
      void pump()
    }, debounceMs)
    return 'debouncing'
  }

  const status = () =>
    Object.fromEntries(
      [...tenants].map(([slug, t]) => [
        slug,
        { state: t.state, pending: t.pending, requests: t.requests, builds: t.builds, last: t.last },
      ]),
    )

  return { request, status }
}
