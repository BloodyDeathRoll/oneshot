/* The page's own script, ported from mockups/unique/dist/index.html. No library: the drop is a sticky stage
   driven by the page's own scroll progress (mockup round 2.2). 4g changes are marked "4g". */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const D = JSON.parse($('#pagedata').textContent);
  const home = D.page === 'home';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const quiet = reduce || saveData;
  const later = (f) => { const go = () => requestAnimationFrame(() => setTimeout(f, 0)); document.readyState === 'complete' ? go() : addEventListener('load', go, { once: true }); };

  /* header + phone bar after the hero */
  const hdr = $('#hdr'), pbar = $('#pbar'), hero = $('.hero');
  if (hero && pbar) new IntersectionObserver(([e]) => {
    const past = !e.isIntersecting;
    hdr.classList.toggle('solid', past);
    pbar.classList.toggle('on', past);
    pbar.setAttribute('aria-hidden', String(!past));
    pbar.querySelector('a').tabIndex = past ? 0 : -1;
  }, { rootMargin: '-50% 0px -49% 0px' }).observe(hero); /* station 5 r1: solid once the hero's lower half is gone */

  /* hero video: after first paint, never under reduced motion or Save-Data. 4g: the sources are the build's
     renditions (schema v0.9); the upload starts on the poster frame, so there is no seek */
  const hv = $('#herovid');
  if (hv && !quiet) later(() => {
    const phone = matchMedia('(max-width: 700px) and (orientation: portrait)').matches;
    const list = JSON.parse(phone ? hv.dataset.phone : hv.dataset.desk);
    hv.innerHTML = list.map(([s, t]) => `<source src="${s}" type='${t}'>`).join('');
    hv.preload = 'auto';
    hv.addEventListener('playing', () => hv.classList.add('on'), { once: true });
    hv.load(); hv.play().catch(() => {});
  });

  /* level clips: the one in view plays (4g: over its poster image, which stays with JS off) */
  const clips = $$('.lvclip');
  function src(v) { if (v.dataset.on) return; v.dataset.on = 1; v.innerHTML = (v.dataset.webm ? `<source src="${v.dataset.webm}" type="video/webm">` : '') + `<source src="${v.dataset.mp4}" type="video/mp4">`; v.addEventListener('playing', () => v.classList.add('on'), { once: true }); v.load(); }
  if (!quiet && clips.length) {
    const vis = new Map();
    const io = new IntersectionObserver(es => {
      es.forEach(e => vis.set(e.target, e.intersectionRatio));
      let best = null, r = 0.45;
      vis.forEach((v, el) => { if (v > r) { r = v; best = el; } });
      clips.forEach(c => { if (c === best) { src(c); c.play().catch(() => {}); } else c.pause(); });
    }, { threshold: [0, .25, .45, .6, .8, 1] });
    clips.forEach(c => io.observe(c));
  }

  /* slideshows: native scroll-snap + dots + arrows */
  $$('[data-slides]').forEach(s => {
    const tr = $('.track', s), items = [...tr.children], dots = $('.dots', s);
    items.forEach((_, i) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Show ${i + 1} of ${items.length}`); b.onclick = () => go(i); dots.appendChild(b); });
    const bs = [...dots.children];
    let cur = 0;
    const go = i => { i = (i + items.length) % items.length; tr.scrollTo({ left: items[i].offsetLeft - tr.offsetLeft, behavior: reduce ? 'auto' : 'smooth' }); };
    const mark = () => { cur = Math.round(tr.scrollLeft / (tr.clientWidth || 1)); bs.forEach((b, i) => b.setAttribute('aria-current', String(i === cur))); };
    tr.addEventListener('scroll', () => requestAnimationFrame(mark), { passive: true }); mark();
    const p = $('.prev', s), n = $('.next', s);
    if (p) p.onclick = () => go(cur - 1); if (n) n.onclick = () => go(cur + 1);
    tr.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
  });

  /* rooms: the names are the control */
  const tabs = $$('.room-names [role=tab]');
  function showRoom(t, focus) {
    tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).classList.toggle('on', on); });
    if (focus) t.focus();
  }
  tabs.forEach((t, i) => { t.onclick = () => showRoom(t); t.onkeydown = e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); showRoom(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true); } }; });

  /* Rosa (playbook §4 exception). 4g: live only — no inlined reading. When the block nears, one request to
     Rosa's JSON; fresh (< 24 h) → the headline, else the plain link. The headline and the link share one grid
     cell, so the block never changes height. Rosa's widget is framed only after that request succeeds. */
  const rosa = $('#rosa'), fcnow = $('#fcnow'), fclink = $('#fclink');
  if (rosa && D.rosa) {
    const PTS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const comp = d => PTS[Math.round(((d % 360) + 360) % 360 / 22.5) % 16];
    const parse = d => { const c = d.current || {}, sw = (c.swells || []).find(x => x.in_window) || {}, w = c.wind || {};
      return { g: d.generated_at, t: c.t, h: c.h, phrase: c.phrase, per: sw.period, sdir: sw.dir, wk: w.kph, wdir: w.dir, wc: w.class }; };
    const show = f => {
      const fresh = f && f.h && f.t && (Date.now() - Date.parse(f.g)) < 864e5;
      fcnow.classList.toggle('off', !fresh); fcnow.setAttribute('aria-hidden', String(!fresh));
      fclink.classList.toggle('off', !!fresh); fclink.setAttribute('aria-hidden', String(!!fresh));
      $$('a', fclink).forEach(a => { a.tabIndex = fresh ? -1 : 0; });
      if (!fresh) return false;
      const set = (k, v) => { $(`[data-k="${k}"]`, fcnow).textContent = v; };
      set('h', `${f.h[0]}–${f.h[1]} m`); set('phrase', f.phrase ? f.phrase[0].toUpperCase() + f.phrase.slice(1) : '');
      set('per', f.per ? `${Math.round(f.per)} s` : '–'); set('swell', f.sdir != null ? `Swell from the ${comp(f.sdir)}` : 'Swell');
      set('wind', f.wk != null ? `${Math.round(f.wk)} km/h` : '–'); set('wtxt', f.wdir != null ? `Wind from the ${comp(f.wdir)}${f.wc ? ', ' + f.wc : ''}` : 'Wind');
      const day = new Date(f.t.slice(0, 10) + 'T12:00:00Z');
      set('time', `${D.rosa.name}, ${day.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).replace(',', '')}, ${f.t.slice(11, 16)}`);
      return true;
    };
    fcnow.setAttribute('data-loading', 'true');
    new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting) return; o.disconnect();
      fetch(`https://rosa-data-opal.vercel.app/data/spots/${D.rosa.id}.json`).then(r => { if (!r.ok) throw 0; return r.json(); }).then(d => {
        show(parse(d));
        if (location.protocol === 'file:') return; /* Rosa's frame-ancestors cannot match a file: page */
        const f = document.createElement('iframe');
        f.title = `Rosa surf forecast - ${D.rosa.name}`; f.width = '100%'; f.height = '500'; f.loading = 'lazy';
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        f.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin');
        f.style.cssText = 'max-width:420px;border:0;border-radius:16px;display:block';
        f.onload = () => rosa.classList.add('loaded');
        f.src = `https://rosa.surf/widget/?spot=${D.rosa.id}&theme=light&units=metric`;
        rosa.appendChild(f);
      }).catch(() => {}).finally(() => fcnow.removeAttribute('data-loading'));
    }, { rootMargin: '600px 0px' }).observe(rosa);
  }

  /* ---------------- the drop (scroll set-piece, pattern 9) ----------------
     4g (designer 0.5.1): the tier is decided in <head> and never changes, so the section's height (pin spacing
     included) is fixed from first paint. Station 5 r1 (experience must-fix 1–2, Shahar: "loading state until
     everything is loaded, then the motion — never skip ahead"):
     - the stage's ground is a blurred inline still of plate 1 from first paint, so the box is never empty;
     - a small sharp poster (the stage's own crop of plate 1) is requested as soon as the levels come into
       view, then the plates; it fades in only once decoded, so it is never seen half-painted;
     - the motion starts when every plate is decoded. If the reader is already inside the run by then, the whole
       sequence is mapped onto the scroll that remains (from p 0 at the ready point), never jumped to the
       current progress; the remap is dropped when the reader is back above the block.
     A plate that fails leaves the poster with the feature line. */
  const H_ = document.documentElement, P = D.plates;
  if (H_.classList.contains('drop-live') && P && $('#droprun')) {
    const run = $('#droprun'), pin = $('#droppin'), stage = $('#stage'), [p1, p2m, p2, p3] = $$('.pl', stage), line = $('.drop-line', stage), ddots = $$('.drop-dots li', stage), poster = $('.drop-poster', stage);
    let ready = false, started = false, p0 = 0;
    const phoneSet = () => innerWidth < 760;
    const loadImg = (im, src) => new Promise((ok, no) => { im.onload = ok; im.onerror = no; im.decoding = 'async'; im.src = src; if (im.complete && im.naturalWidth) ok(); });
    function fetchPlates() {
      if (started) return; started = true;
      const set = phoneSet() ? P.m : P.d, files = [set[0], set[1], set[1], set[2]];
      const plates = () => Promise.all([p1, p2m, p2, p3].map((im, i) => loadImg(im, files[i])))
        .then(() => Promise.all([p1, p2, p3].map(im => (im.decode ? im.decode().catch(() => {}) : 0))))
        .then(() => { ready = true; size(); const raw = rawP(); p0 = raw > 0 && raw < 1 ? raw : 0; measure(); cur = tgt; render(cur); stage.classList.add('ready'); kick(); })
        .catch(() => stage.classList.add('failed'));
      /* the poster first (about 30 KB on a phone), the plates as soon as it is in */
      const ps = poster && (phoneSet() ? P.poster.m : P.poster.d);
      if (!ps) { plates(); return; }
      loadImg(poster, ps).then(() => (poster.decode ? poster.decode().catch(() => {}) : 0)).then(() => poster.classList.add('in'), () => {}).finally(plates);
    }
    /* requested as soon as the reader leaves the first screen (the levels come into view), never on first load */
    const nearIO = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { nearIO.disconnect(); fetchPlates(); } }, { rootMargin: '0px 0px -10% 0px' });
    [$('#levels'), $('.incl'), run].forEach(el => el && nearIO.observe(el));

    /* source geometry: each plate's focal point, in fractions of the plate (src/pages/index.astro, schema v0.10) */
    const A = { w: 2000, h: 2000 * P.a.h / P.a.w }, C = { w: 2000, h: 2000 * P.c.h / P.c.w };
    const POOL1 = { x: P.a.pool[0] * A.w, y: P.a.pool[1] * A.h }, POOL2 = { x: P.b.pool[0] * A.w, y: P.b.pool[1] * A.h }, R = P.ratio;
    const WATER = { x: P.b.water[0] * A.w, y: P.b.water[1] * A.h };
    let W, Hh, c1, c3, pinTop, pinH, gut;
    function size() {
      W = stage.clientWidth; Hh = stage.clientHeight;
      c1 = Math.max(W / A.w, Hh / A.h); c3 = Math.max(W / C.w, Hh / C.h);
      [p1, p2m, p2].forEach(im => { im.style.width = A.w * c1 + 'px'; im.style.height = A.h * c1 + 'px'; });
      p3.style.width = C.w * c3 + 'px'; p3.style.height = C.h * c3 + 'px';
      pinTop = parseFloat(getComputedStyle(pin).top) || 0; pinH = pin.offsetHeight;
      gut = parseFloat(getComputedStyle($('.wrap')).paddingLeft) || 24;
    }
    const cl = (v, a, b) => Math.min(b, Math.max(a, v));
    const seg = (p, a, b) => cl((p - a) / (b - a), 0, 1);
    const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const lerp = (a, b, t) => a + (b - a) * t;
    function place(el, base, src, s, fx, fy, X, Y, clamp, op) {
      let x = X - fx * s, y = Y - fy * s;
      if (clamp) { x = cl(x, W - src.w * s, 0); y = cl(y, Hh - src.h * s, 0); }
      el.style.transform = `translate3d(${x}px,${y}px,0) scale(${s / base})`;
      el.style.opacity = op;
      return { x, y };
    }
    function render(p) {
      if (W >= 760) { const e = 1 - ease(seg(p, 0, .07)); stage.style.clipPath = e > 0.001 ? `inset(0 ${(e * gut).toFixed(1)}px round ${(e * 14).toFixed(1)}px)` : 'none'; }
      const z1 = Math.exp(lerp(0, Math.log(1.55), ease(seg(p, 0, .34))));
      const s1 = c1 * z1, tf = ease(seg(p, 0, .32));
      const o1 = place(p1, c1, A, s1, lerp(A.w / 2, POOL1.x, tf), lerp(A.h / 2, POOL1.y, tf), W / 2, Hh / 2, true, 1);
      const Pp = { x: o1.x + POOL1.x * s1, y: o1.y + POOL1.y * s1 };
      const g = ease(seg(p, .34, .48));
      let s2 = Math.exp(lerp(Math.log(s1 * R), Math.log(c1), g));
      let fx = lerp(POOL2.x, A.w / 2, g), fy = lerp(POOL2.y, A.h / 2, g), X = lerp(Pp.x, W / 2, g), Y = lerp(Pp.y, Hh / 2, g);
      if (g > 0) {
        const sL = s2 / R, Q = { x: X + (POOL2.x - fx) * s2, y: Y + (POOL2.y - fy) * s2 };
        place(p1, c1, A, sL, POOL1.x, POOL1.y, Q.x, Q.y, false, p < .5 ? 1 : 0);
        /* 4g (experience 4f r2 fix 3): a lighter, shorter focus pull at the roof → pool switch (was ≤ 5 px) */
        p1.style.filter = `blur(${Math.min(2.4, 0.5 * (sL / s1 - 1)).toFixed(2)}px)`;
      } else p1.style.filter = '';
      const dive = ease(seg(p, .57, .8));
      if (dive > 0) { s2 = c1 * lerp(1, 1.6, dive); fx = lerp(A.w / 2, WATER.x, dive); fy = lerp(A.h / 2, WATER.y, dive); X = W / 2; Y = Hh / 2; }
      const om = seg(p, .24, .34), of = seg(p, .474, .494);
      place(p2m, c1, A, s2, fx, fy, X, Y, g >= 1, p < .5 ? om : 0);
      /* 4g (experience fix 3): the pool → bar cross-fade is short, and the pool is gone once the bar is in */
      const f3 = seg(p, .8, .83);
      place(p2, c1, A, s2, fx, fy, X, Y, g >= 1, of * (f3 < 1 ? 1 : 0));
      place(p3, c3, C, c3 * lerp(1.1, 1, ease(seg(p, .8, .87))), C.w / 2, C.h / 2, W / 2, Hh / 2, true, f3);
      if (line) { const fl = seg(p, .88, .96); line.style.opacity = fl; line.style.transform = `translateY(${((1 - fl) * 14).toFixed(1)}px)`; }
      const k = p < .42 ? 0 : p < .82 ? 1 : 2;
      ddots.forEach((d, i) => d.classList.toggle('on', i === k));
    }
    let cur = -1, tgt = 0, raf = 0, last = 0;
    function rawP() { const r = run.getBoundingClientRect(); return cl((pinTop - r.top) / (r.height - pinH), 0, 1); }
    function measure() { const raw = rawP(); if (raw <= 0) p0 = 0; tgt = p0 > 0 ? cl((raw - p0) / (1 - p0), 0, 1) : raw; }
    function tick(t) {
      raf = 0; const dt = last ? Math.min(64, t - last) : 16; last = t;
      cur = cur < 0 ? tgt : cur + (tgt - cur) * (1 - Math.exp(-dt / 90));
      if (Math.abs(tgt - cur) < 1e-4) cur = tgt;
      render(cur);
      if (cur !== tgt) raf = requestAnimationFrame(tick); else last = 0;
    }
    function kick() { if (!ready) return; measure(); if (!raf) raf = requestAnimationFrame(tick); }
    let near = false;
    new IntersectionObserver(([e]) => { near = e.isIntersecting; if (near) kick(); }, { rootMargin: '200px 0px' }).observe(run);
    addEventListener('scroll', () => { if (near) kick(); }, { passive: true });
    addEventListener('resize', () => { if (ready) { size(); cur = -1; kick(); } });
  }

  /* ---------------- phone menu ---------------- */
  const sheet = $('#sheet'), menub = $('#menub');
  let mOpener = null;
  const sFocus = () => $$('a[href],button', sheet);
  function openMenu() { mOpener = menub; sheet.classList.add('open'); menub.setAttribute('aria-expanded', 'true'); document.body.classList.add('locked'); setTimeout(() => $('[data-sclose]', sheet).focus(), 30); }
  function closeMenu(back = true) { if (!sheet.classList.contains('open')) return; sheet.classList.remove('open'); menub.setAttribute('aria-expanded', 'false'); document.body.classList.remove('locked'); if (back && mOpener) mOpener.focus(); }
  menub.onclick = openMenu; $('[data-sclose]', sheet).onclick = () => closeMenu();
  $$('nav a', sheet).forEach(a => a.addEventListener('click', () => closeMenu(false)));
  $$('[data-book]', sheet).forEach(a => a.addEventListener('click', () => closeMenu(false)));
  sheet.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
    if (e.key === 'Tab') { const f = sFocus(), a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });

  /* ---------------- booking: the side desk on home, the same form as a page at book/ ---------------- */
  const book = $('#book'), panel = $('#bookpanel'), form = $('#bookform'), scroller = $('#bookscroll'), band = $('#bookband'), bandv = $('#bandvid'), bandp = $('#bandposter');
  const today = new Date().toISOString().slice(0, 10);
  $$('#start option').forEach(o => { if (o.value < today) o.remove(); });
  $('#end').disabled = false;
  /* JS off sends the chosen check-out (#endsel); with JS the end follows from the nights chosen */
  if ($('#endsel')) $('#endsel').disabled = true;
  $$('#nights input').forEach(i => i.setAttribute('form', 'noform'));
  $$('input[name=lvl]').forEach(i => i.setAttribute('form', 'noform'));
  const nights = () => +(($('#nights input:checked') || { value: 8 }).value) - 1;
  /* 4g (experience fix 2): whole dollars everywhere, as on the room cards */
  const money = v => '$' + Math.round(v).toLocaleString('en-US');
  let opener = null;
  function update() {
    const lvl = (form.querySelector('input[name=lvl]:checked') || {}).value || Object.keys(D.levels)[0];
    form.action = D.engine + lvl;
    const sl = $('#sessline');
    if (sl && D.sess[lvl]) { $('span', sl).textContent = D.sess[lvl]; sl.classList.toggle('diff', D.sess[lvl] !== Object.values(D.sess)[0]); }
    const f = +$('#g-f').value || 0, m = +$('#g-m').value || 0, c = +$('#g-c').value || 0, n = f + m + 2 * c;
    const wk = nights() / 7;
    if ($('#start').value) { const s = new Date($('#start').value + 'T12:00:00Z'); s.setUTCDate(s.getUTCDate() + nights()); $('#end').value = s.toISOString().slice(0, 10); }
    const room = (form.querySelector('input[name=room]:checked') || {}).value;
    const sup = r => { const x = D.rooms[r]; if (!x) return 0; return (c > 0 && f + m === 0) ? x.couple : x.one; };
    const ta = $('#twinamt'); if (ta && D.rooms.twin) ta.textContent = '+' + money(sup('twin')) + ' pp';
    const s = sup(room);
    $('#t-pkg').textContent = money(D.base * wk);
    $('#t-room').textContent = s ? '+' + money(s * wk) : D.included;
    $('#t-all-l').textContent = n === 1 ? 'Total for 1 guest' : D.totalAll.replace('{n}', n);
    $('#t-all').textContent = money((D.base + s) * wk * n);
    $$('.stp button').forEach(b => { const i = $('#' + b.dataset.for), d = +b.dataset.step; b.disabled = d > 0 ? (n + (i.id === 'g-c' ? 2 : 1) > 6) : (+i.value <= 0 || n - (i.id === 'g-c' ? 2 : 1) < 1); });
    const L = D.levels[lvl];
    if (bandp && L && bandp.dataset.k !== lvl) { bandp.dataset.k = lvl; bandp.src = L.poster;
      if (!quiet && book.classList.contains('open')) { bandv.classList.remove('on'); bandv.innerHTML = (L.webm ? `<source src="${L.webm}" type="video/webm">` : '') + `<source src="${L.mp4}" type="video/mp4">`; bandv.load(); bandv.play().catch(() => {}); } }
  }
  const pick = (name, v) => { const r = v && form.querySelector(`input[name=${name}][value="${v}"]`); if (r) r.checked = true; };
  $$('.stp button').forEach(b => b.onclick = () => { const i = $('#' + b.dataset.for); i.value = Math.max(0, +i.value + +b.dataset.step); update(); });
  form.addEventListener('change', update); form.addEventListener('input', update);
  form.addEventListener('submit', () => { update(); });

  if (!home) {
    const q = new URLSearchParams(location.search);
    pick('lvl', q.get('level')); pick('room', q.get('room'));
    $$('[data-book]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); book.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }));
    update();
    return;
  }

  if (band) scroller.addEventListener('scroll', () => band.classList.toggle('small', scroller.scrollTop > 60), { passive: true });
  const bookUrl = new URL('book/', location.href).pathname;
  const atBook = () => location.pathname === bookUrl;
  function focusables() { return $$('a[href],button:not([disabled]),input:not([type=hidden]):not([disabled]),select', panel).filter(e => e.offsetParent !== null); }
  function open(trigger) {
    opener = (trigger && sheet.contains(trigger)) ? menub : (trigger || document.activeElement);
    if (trigger) { pick('lvl', trigger.dataset.level); pick('room', trigger.dataset.room); }
    book.classList.add('open'); document.body.classList.add('locked');
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-labelledby', 'bk-t');
    if (bandp) bandp.dataset.k = ''; update();
    if (!atBook()) history.pushState({ book: 1 }, '', bookUrl + location.search);
    scroller.scrollTop = 0;
    setTimeout(() => $('.x', panel).focus(), 50);
  }
  function close(fromPop) {
    if (!book.classList.contains('open')) return;
    book.classList.remove('open'); document.body.classList.remove('locked'); if (bandv) bandv.pause();
    if (!fromPop && atBook()) history.back();
    if (opener && opener.focus) opener.focus();
  }
  if (bandv) bandv.addEventListener('playing', () => bandv.classList.add('on'));
  $$('[data-book]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); open(a); }));
  $('[data-close]').onclick = () => close();
  book.addEventListener('click', e => { if (e.target === book) close(); });
  addEventListener('keydown', e => {
    if (!book.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') { const f = focusables(), a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });
  addEventListener('popstate', () => { if (atBook()) open(); else close(true); });
  update();
})();
