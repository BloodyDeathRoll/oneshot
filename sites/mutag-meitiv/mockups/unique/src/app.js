(() => {
  const d = document.documentElement
  const $ = (s, r = document) => r.querySelector(s)
  const $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection && navigator.connection.saveData === true

  // ---- header: transparent over the stage, a deep-green pill once the page moves
  const onScrollHdr = () => d.classList.toggle('scrolled', scrollY > 30)
  addEventListener('scroll', onScrollHdr, { passive: true }); onScrollHdr()

  // ---- phone menu closes on a link tap
  $$('.mnav a').forEach((a) => a.addEventListener('click', () => { $('.mnav').open = false }))
  addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && $('.mnav')?.open) { $('.mnav').open = false; $('.mnav summary').focus() } })

  // ---- clips: sources attached only when near the viewport, after load, never under reduced motion / Save-Data
  const clips = $$('video[data-clip]')
  const attach = (v) => {
    if (v.dataset.on) return; v.dataset.on = '1'
    $$('source[data-src]', v).forEach((s) => { s.src = s.dataset.src })
    v.load()
  }
  const play = (v, yes) => {
    if (calm || saveData) return
    if (yes) { attach(v); v.play().then(() => v.closest('figure')?.classList.add('playing')).catch(() => {}) }
    else if (!v.paused) v.pause()
  }

  // ---- the set-piece "into the screen" (pinned tier only: html.pinned is set in <head> before first paint)
  const stage = $('[data-stage]'), photo = $('[data-photo] img'), copy = $('[data-copy]'), screen = $('[data-screen]')
  const head = $('[data-head]'), slides = $$('[data-slide]'), dotBtns = $$('[data-go]')
  const ZOOM = 0.6, HEAD_END = 1.05, STEP = 0.45          // in viewport heights of scroll
  let armed = false, raf = 0, last = -2
  const render = () => {
    raf = 0
    if (!d.classList.contains('pinned')) return
    const vh = innerHeight, y = scrollY - stage.offsetTop, dd = y / vh
    const z = clamp(dd / ZOOM), ez = 1 - (1 - z) * (1 - z)
    photo.style.transform = `scale(${1 + 0.25 * ez})`
    const t = clamp(dd / 0.3)
    copy.style.opacity = String(1 - t)
    copy.style.transform = `translateX(-50%) translateY(${-40 * t}px)`
    copy.style.visibility = t >= 1 ? 'hidden' : ''
    const g = clamp((dd - 0.55) / 0.18)            // the zoom is seen first, then the green comes fast
    screen.style.opacity = String(g)
    screen.classList.toggle('live', g > 0.5)
    const hIn = clamp((dd - 0.68) / 0.15)                 // the logo slide arrives only once the screen has filled the room
    const idx = dd < HEAD_END ? -1 : Math.min(slides.length - 1, Math.floor((dd - HEAD_END) / STEP))
    head.style.opacity = idx >= 0 ? '0' : String(hIn)
    if (idx !== last) {
      last = idx
      head.classList.toggle('off', idx >= 0)
      slides.forEach((s, i) => s.classList.toggle('on', i === idx))
      dotBtns.forEach((b, i) => { b.classList.toggle('on', i === idx); b.setAttribute('aria-current', i === idx ? 'step' : 'false') })
      clips.forEach((v) => play(v, v.closest('[data-slide]')?.classList.contains('on')))
    }
  }
  const req = () => { if (armed && !raf) raf = requestAnimationFrame(render) }
  dotBtns.forEach((b, i) => b.addEventListener('click', () => {
    scrollTo({ top: stage.offsetTop + (HEAD_END + STEP * i + STEP * 0.4) * innerHeight, behavior: calm ? 'auto' : 'smooth' })
  }))
  const decode = (im) => (im.complete && im.naturalWidth ? (im.decode ? im.decode().catch(() => {}) : Promise.resolve())
    : new Promise((r) => { im.addEventListener('load', () => r(), { once: true }); im.addEventListener('error', () => r(), { once: true }) }))
  const arm = () => {
    // the motion starts only once the stage photo and every slide photo are decoded; the section's height
    // is reserved in CSS from first paint, so nothing moves when it takes over
    const ims = [photo, ...$$('.slide img, .m-icon')]
    ims.forEach((im) => { im.loading = 'eager' })
    Promise.all(ims.map(decode)).then(() => {
      armed = true; d.classList.add('armed'); render()
      addEventListener('scroll', req, { passive: true })
      addEventListener('resize', () => { last = -2; if (!d.classList.contains('pinned')) clearPinned(); req() })
    })
  }
  const clearPinned = () => {
    photo.style.transform = ''; copy.style.cssText = ''; screen.style.opacity = ''
    head.classList.remove('off'); head.style.opacity = ''; slides.forEach((s) => s.classList.remove('on'))
  }
  let arming = false
  const maybeArm = () => { if (stage && !calm && !arming && d.classList.contains('pinned')) { arming = true; arm() } }
  maybeArm(); addEventListener('resize', maybeArm)

  // stacked tiers: the MAKING clip plays while it is on screen
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (d.classList.contains('pinned') && en.target.closest('[data-slide]')) return
      play(en.target, en.isIntersecting)
    }), { rootMargin: '200px 0px' })
    clips.forEach((v) => io.observe(v))
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) clips.forEach((v) => v.pause()) })

  // ---- voices: one quote at a time, dots follow the swipe, "read more" opens a long quote in place
  const track = $('[data-track]'), qs = track ? $$('.slide-q', track) : [], qd = $$('[data-q]')
  const setQ = (i) => qd.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-current', k === i ? 'true' : 'false') })
  if (track) {
    setQ(0)
    qd.forEach((b, i) => b.addEventListener('click', () => {
      track.scrollTo({ left: qs[i].offsetLeft - track.offsetLeft - (track.clientWidth - qs[i].offsetWidth) / 2, behavior: calm ? 'auto' : 'smooth' })
    }))
    const qio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) setQ(qs.indexOf(en.target)) }), { root: track, threshold: 0.6 })
    qs.forEach((q) => qio.observe(q))
    $$('.q-more', track).forEach((b) => b.addEventListener('click', () => {
      const f = b.closest('.slide-q'), open = f.classList.toggle('open')
      b.setAttribute('aria-expanded', String(open)); b.textContent = open ? 'סגירה' : 'קראו עוד'
    }))
  }

  $$('.s-more').forEach((b) => b.addEventListener('click', () => {
    const body = b.parentElement.querySelector('[data-more]'), open = body.classList.toggle('open')
    b.setAttribute('aria-expanded', String(open)); b.textContent = open ? 'סגירה' : 'קראו עוד'
  }))
  $$('.s-body').forEach((s) => { if (s.querySelectorAll('p').length < 2) s.parentElement.querySelector('.s-more')?.remove() })

  // ---- phone bar: shows once the hero button has left the screen; the header pill hides meanwhile
  const cta = $('[data-hero-cta]')
  const bar = $('[data-bar]')
  if (bar) bar.inert = true                              // out of the tab order while it is off screen
  if (cta && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => {
      const on = !en.isIntersecting && en.boundingClientRect.top < 0
      d.classList.toggle('bar-on', on); if (bar) bar.inert = !on || innerWidth >= 900
    }).observe(cta)
  }
})()
