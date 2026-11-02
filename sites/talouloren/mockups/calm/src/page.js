(() => {
  const d = document, root = d.documentElement, app = d.getElementById('app')
  root.classList.remove('no-js')
  const store = { get(k) { try { return JSON.parse(sessionStorage.getItem('tl.' + k)) } catch { return null } },
    set(k, v) { try { sessionStorage.setItem('tl.' + k, JSON.stringify(v)) } catch {} } }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)')
  const html = { he: app.innerHTML, en: d.getElementById('tpl-en').innerHTML }
  let lang = 'he'
  try { if (localStorage.getItem('tl.lang') === 'en' || /[?&]lang=en/.test(location.search)) lang = 'en' } catch {}
  const $ = (s, el = d) => el.querySelector(s), $$ = (s, el = d) => [...el.querySelectorAll(s)]

  // ---------- language ----------
  function setLang(l, keepFocus) {
    lang = l
    root.lang = l; root.dir = l === 'he' ? 'rtl' : 'ltr'
    app.innerHTML = html[l]
    try { localStorage.setItem('tl.lang', l) } catch {}
    init(); route()
    if (keepFocus) $('[data-lang]')?.focus()
  }

  // ---------- router ----------
  let current = null
  function route() {
    const h = location.hash
    if (h && !h.startsWith('#/')) return
    let key = decodeURIComponent(h.slice(2)).replace(/\/$/, '')
    let view = $$('.view', app).find(v => v.dataset.route === key)
    if (!view) { key = '404'; view = $('.view[data-route="404"]', app) }
    $$('.view', app).forEach(v => { const on = v === view; v.classList.toggle('on', on) })
    d.title = view.dataset.title || d.title
    d.body.classList.toggle('is-check', key === 'check')
    d.body.classList.toggle('is-book', key === 'book')
    d.body.classList.toggle('is-home', key === '')
    d.body.classList.toggle('is-after', key === 'snapshot' || key === 'thanks')
    $$('[data-nav]', app).forEach(a => a.dataset.nav === key.split('/')[0] ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'))
    closeMenu()
    if (current !== key) { scrollTo(0, 0); if (h && current !== null) $('#main', app)?.focus({ preventScroll: true }); current = key }
    onRoute[key.split('/')[0]]?.(view)
    header(); parallax()
  }
  const onRoute = {
    '': () => heroVideo(),
    thanks: v => { const n = store.get('contact')?.name?.split(' ')[0]; if (n) fill(v, 'first_name', n) },
    snapshot: v => { const b = store.get('answers')?.q1?.split(/[,،]/)[0]; if (b) fill(v, 'business_name', b) },
    booked: v => { const b = store.get('booking'); if (b) { fill(v, 'date', b.date); fill(v, 'time', b.time) } },
    check: () => showQ(store.get('q') || 0),
  }
  const fill = (el, key, val) => $$('.ph[data-key="' + key + '"]', el).forEach(p => { p.textContent = val; p.className = ''; p.removeAttribute('title') })

  // ---------- header / menu ----------
  function header() { $('[data-hdr]', app)?.classList.toggle('solid', scrollY > 40 || current !== '') }
  function closeMenu(back) {
    if (!d.body.classList.contains('menu-open')) return
    d.body.classList.remove('menu-open'); const b = $('[data-menu]', app); b?.setAttribute('aria-expanded', 'false')
    $('#main', app)?.removeAttribute('inert'); $('.ftr', app)?.removeAttribute('inert')
    if (back) b?.focus()
  }
  function openMenu() {
    d.body.classList.add('menu-open'); $('[data-menu]', app).setAttribute('aria-expanded', 'true')
    $('#main', app)?.setAttribute('inert', ''); $('.ftr', app)?.setAttribute('inert', '')
    setTimeout(() => $('[data-sheet] a', app)?.focus(), 30)
  }
  // focus stays inside the open menu: the sheet's links and the menu button
  function trapMenu(e) {
    const items = [$('[data-menu]', app), ...$$('[data-sheet] a', app)]
    const i = items.indexOf(d.activeElement)
    if (i === -1) { e.preventDefault(); items[1].focus(); return }
    if (e.shiftKey && i === 0) { e.preventDefault(); items.at(-1).focus() }
    else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus() }
  }

  // ---------- hero video: poster first, sources after first paint, never under reduced motion / Save-Data ----------
  function heroVideo() {
    const v = $('video[data-hero]', app)
    if (!v || v.dataset.on || reduce.matches || navigator.connection?.saveData) return
    const attach = () => {
      if (v.dataset.on) return; v.dataset.on = 1
      for (const s of $$('source[data-src]', v)) { if (s.media && !matchMedia(s.media).matches) s.remove(); else s.src = s.dataset.src }
      v.addEventListener('playing', () => v.classList.add('playing'), { once: true })
      v.load(); v.play().catch(() => {})
    }
    const later = () => requestAnimationFrame(() => setTimeout(attach, 0))
    d.readyState === 'complete' ? later() : addEventListener('load', later, { once: true })
  }

  // ---------- parallax ±4rem (off on phones and under reduced motion) ----------
  let pxTick = false
  function parallax() {
    if (pxTick) return; pxTick = true
    requestAnimationFrame(() => {
      pxTick = false
      if (reduce.matches || innerWidth < 768) return
      for (const el of $$('.view.on [data-px]', app)) {
        const r = el.parentElement.getBoundingClientRect()
        if (r.bottom < 0 || r.top > innerHeight) continue
        const p = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2)
        el.style.setProperty('--py', (Math.max(-1, Math.min(1, p)) * -64).toFixed(1) + 'px')
      }
    })
  }

  // ---------- film lightbox (embed loads only on tap) ----------
  let lastFocus = null
  function openFilm(a) {
    const dlg = $('[data-dialog]', app); if (!dlg?.showModal) return false
    lastFocus = a
    dlg.classList.toggle('tall', !!a.dataset.tall)
    $('.box', dlg).innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${a.dataset.film}?autoplay=1&rel=0&playsinline=1" title="${a.dataset.label.replace(/"/g, '&quot;')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
    $('.cap', dlg).textContent = a.dataset.label
    dlg.showModal(); $('[data-close]', dlg).focus(); return true
  }
  function closeFilm() { const dlg = $('[data-dialog]', app); if (!dlg?.open) return; dlg.close(); $('.box', dlg).innerHTML = ''; lastFocus?.focus() }

  // ---------- check ----------
  let qi = 0
  const answers = () => store.get('answers') || {}
  function answered(q) {
    if (!q || +q.dataset.q === 0) return true
    for (const r of $$('[data-req]', q)) {
      if (r.matches('.opts')) { if (!$('input:checked', r)) return false; continue }
      if (r.type === 'checkbox') { if (!r.checked) return false; continue }
      const none = $('[data-none]', q)
      if (none?.checked) continue
      if (!r.value.trim()) return false
      if (r.type === 'email' && !/^\S+@\S+\.\S+$/.test(r.value)) return false
      if (r.type === 'tel' && r.value.replace(/\D/g, '').length < 9) return false
    }
    return true
  }
  function showQ(i) {
    const form = $('[data-check]', app); if (!form) return
    const qs = $$('.q', form); qi = Math.max(0, Math.min(i, qs.length - 1)); store.set('q', qi)
    qs.forEach((q, k) => q.classList.toggle('on', k === qi))
    const nav = $('.check-nav', form); nav.hidden = qi === 0
    const last = qi === qs.length - 1
    $('[data-next]:not(.q [data-next])', nav).hidden = last; $('[data-submit]', nav).hidden = !last
    gate()
    const f = $('.q.on input:not([type=hidden]), .q.on textarea', form)
    if (qi > 0 && f && innerWidth > 767) setTimeout(() => f.focus({ preventScroll: true }), 60)
  }
  function gate() {
    const form = $('[data-check]', app); if (!form) return
    const ok = answered($('.q.on', form))
    const nav = $('.check-nav', form)
    $('[data-next]:not(.q [data-next])', nav).disabled = !ok
    $('[data-submit]', nav).disabled = !ok
    $('.why', nav).textContent = ok ? '' : (lang === 'he' ? 'בחרו תשובה כדי להמשיך' : 'Choose an answer to continue')
  }
  function saveCheck(e) {
    const el = e.target; if (!el.name) return
    const a = answers()
    if (el.type === 'checkbox' && !el.matches('[data-none]') && el.name !== 'consent') a[el.name] = $$(`input[name="${el.name}"]:checked`, app).map(x => x.value)
    else if (el.type === 'checkbox') a[el.name] = el.checked
    else a[el.name] = el.value
    store.set('answers', a); gate()
  }
  function restoreCheck() {
    const a = answers(), form = $('[data-check]', app); if (!form) return
    for (const [k, v] of Object.entries(a)) {
      for (const el of $$(`[name="${k}"]`, form)) {
        if (el.type === 'radio') el.checked = el.value === v
        else if (el.type === 'checkbox') el.checked = Array.isArray(v) ? v.includes(el.value) : !!v
        else el.value = v
      }
    }
  }

  // ---------- booking ----------
  const pick = { day: null, slot: null }
  function buildWeek() {
    const w = $('[data-week]', app); if (!w) return
    const loc = lang === 'he' ? 'he-IL' : 'en-GB'
    const days = []; const t = new Date(); t.setHours(12)
    for (let i = 1; days.length < 7; i++) { const x = new Date(t); x.setDate(t.getDate() + i); days.push(x) }
    w.innerHTML = days.map(x => `<button type="button" class="day" aria-pressed="false" data-day="${x.toISOString().slice(0, 10)}" ${x.getDay() === 6 ? 'disabled' : ''}><small>${x.toLocaleDateString(loc, { weekday: 'short' })}</small><b>${x.getDate()}</b><small>${x.toLocaleDateString(loc, { month: 'short' })}</small></button>`).join('')
  }
  function bookSummary() {
    const dd = $('[data-when]', app); if (!dd) return
    const loc = lang === 'he' ? 'he-IL' : 'en-GB'
    dd.textContent = pick.day ? new Date(pick.day + 'T12:00').toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' }) + (pick.slot ? ', ' + pick.slot : '') : '—'
  }
  function validate(form) {
    let ok = true
    for (const inp of $$('input[required], textarea[required]', form)) {
      const v = inp.value.trim()
      const bad = !v || (inp.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) || (inp.type === 'tel' && v.replace(/\D/g, '').length < 9)
      inp.closest('.fl')?.classList.toggle('bad', bad); if (bad && ok) { inp.focus(); ok = false }
    }
    return ok
  }

  // ---------- cases dots (phone swipe) ----------
  function dots() {
    const row = $('[data-swipe]', app), dd = $('[data-dots]', app); if (!row || !dd) return
    row.addEventListener('scroll', () => {
      const cards = [...row.children], c = row.getBoundingClientRect()
      let best = 0, bd = 1e9
      cards.forEach((el, i) => { const r = el.getBoundingClientRect(); const dist = Math.abs((lang === 'he' ? c.right - r.right : r.left - c.left)); if (dist < bd) { bd = dist; best = i } })
      $$('button', dd).forEach((b, i) => b.setAttribute('aria-current', i === best))
    }, { passive: true })
  }

  function init() {
    heroVideo(); buildWeek(); restoreCheck(); dots()
    pick.day = pick.slot = null
  }

  // ---------- events (delegated, survive the language swap) ----------
  d.addEventListener('click', e => {
    const t = e.target.closest('a,button,label'); if (!t) return
    if (t.matches('[data-lang]')) return setLang(lang === 'he' ? 'en' : 'he', true)
    if (t.matches('[data-menu]')) { d.body.classList.contains('menu-open') ? closeMenu(true) : openMenu(); return }
    if (t.matches('[data-film]') && openFilm(t)) return e.preventDefault()
    if (t.matches('[data-close]')) return closeFilm()
    if (t.closest('[data-check]')) {
      if (t.matches('[data-next]')) { if (qi === 0 || answered($('.q.on', app))) showQ(qi + 1); return }
      if (t.matches('[data-back]')) return showQ(qi - 1)
    }
    if (t.matches('[data-dots] button')) { const i = $$('[data-dots] button', app).indexOf(t); $('[data-swipe]', app).children[i].scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', inline: 'start', block: 'nearest' }); return }
    if (t.matches('[data-filter] button')) {
      $$('[data-filter] button', app).forEach(b => b.setAttribute('aria-pressed', b === t))
      $$('.rows li', app).forEach(li => li.hidden = !(t.dataset.f === 'all' || li.dataset.sector === t.dataset.f)); return
    }
    if (t.matches('[data-day]')) { $$('[data-day]', app).forEach(b => b.setAttribute('aria-pressed', b === t)); pick.day = t.dataset.day; bookSummary(); return }
    if (t.matches('[data-slot]')) { $$('[data-slot]', app).forEach(b => b.setAttribute('aria-pressed', b === t)); pick.slot = t.dataset.slot; bookSummary(); return }
    if (t.matches('.sheet a')) closeMenu()
  })
  d.addEventListener('input', e => { if (e.target.closest('[data-check]')) saveCheck(e); e.target.closest('.fl')?.classList.remove('bad') })
  d.addEventListener('change', e => { if (e.target.closest('[data-check]')) saveCheck(e) })
  d.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeFilm(); closeMenu(true) }
    if (e.key === 'Tab' && d.body.classList.contains('menu-open')) trapMenu(e)
    if (e.key === 'Enter' && e.target.matches('[data-check] input[type=text], [data-check] input[type=email], [data-check] input[type=tel]')) { e.preventDefault(); if (answered($('.q.on', app))) $('.q.on', app).dataset.q === '11' ? $('[data-submit]', app).click() : showQ(qi + 1) }
  })
  d.addEventListener('submit', e => {
    const f = e.target; e.preventDefault()
    if (f.matches('[data-check]')) {
      if (!answered($('.q.on', f))) return
      store.set('contact', { name: f.elements.name.value }); store.set('q', 0); location.hash = '#/thanks'; return
    }
    if (f.matches('[data-book]')) {
      const why = $('.why', f)
      if (!pick.day || !pick.slot) { why.textContent = lang === 'he' ? 'בחרו יום ושעה' : 'Pick a day and a time'; $('[data-week]', f).scrollIntoView({ block: 'center' }); return }
      if (!validate(f)) return
      const loc = lang === 'he' ? 'he-IL' : 'en-GB'
      store.set('booking', { date: new Date(pick.day + 'T12:00').toLocaleDateString(loc, { day: 'numeric', month: 'long' }), time: pick.slot })
      location.hash = '#/booked'; return
    }
    if (f.matches('[data-mock]') && validate(f)) f.classList.add('sent')
  })
  $('[data-dialog]', app)
  d.addEventListener('close', e => { if (e.target.matches?.('[data-dialog]')) { $('.box', e.target).innerHTML = ''; lastFocus?.focus() } }, true)
  addEventListener('hashchange', route)
  addEventListener('scroll', () => { header(); parallax() }, { passive: true })
  addEventListener('resize', parallax, { passive: true })
  if (lang === 'en') setLang('en'); else { init(); route() }
})()
