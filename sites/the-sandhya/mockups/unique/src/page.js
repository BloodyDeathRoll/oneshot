/* The Hour: page behaviour, round 2. Nothing here is needed to read the page or to book: every
   booking control is a real link in the HTML. The first screen has no script work at all; the
   canvas exists only in the set-piece, and only once the visitor is close to it. */
(function () {
  var doc = document.documentElement, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phone = matchMedia('(max-width:767px)');
  var isPhone = phone.matches;
  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };

  /* ---------- The bar that remembers. One label element, always: it can never stack. ---------- */
  var barLinks = $$('[data-remember]');
  var general = { href: barLinks[0].getAttribute('href'), label: barLinks[0].querySelector('.t').textContent };
  var bar = {
    cur: general.href, timer: 0,
    set: function (room) {
      var a = room ? $('.btn.go', room) : null;
      var next = a ? { href: a.getAttribute('href'), label: a.textContent } : general;
      if (this.cur === next.href) return;
      this.cur = next.href;
      clearTimeout(this.timer);
      barLinks.forEach(function (l) { l.setAttribute('href', next.href); l.querySelector('.t').style.opacity = 0; });
      this.timer = setTimeout(function () {
        barLinks.forEach(function (l) { var t = l.querySelector('.t'); t.textContent = next.label; t.style.opacity = 1; });
      }, reduced ? 0 : 120);
    }
  };

  /* The persistent action waits until the hero's own button has left the screen. */
  var heroBtn = $('.say .btn');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { doc.classList.toggle('past', !es[es.length - 1].isIntersecting); }).observe(heroBtn);
  } else doc.classList.add('past');

  /* ---------- The rooms: elevation panels ---------- */
  var elev = $('.elev'), rooms = $$('.room');
  function setBaseWidths() {
    if (phone.matches) { rooms.forEach(function (r) { r.style.removeProperty('--base'); }); return; }
    if ($('.room.open')) return;
    rooms.forEach(function (r) { r.style.setProperty('--base', r.offsetWidth + 'px'); });
    elev.style.setProperty('--open', Math.round(elev.clientWidth * .62) + 'px');
  }
  setBaseWidths();
  addEventListener('resize', setBaseWidths);

  function closeAll() { rooms.forEach(function (r) { r.classList.remove('open'); $('.grow', r).setAttribute('aria-expanded', 'false'); }); elev.classList.remove('has-open'); }
  rooms.forEach(function (room) {
    var btn = $('.grow', room), head = $('.rhead', room), strip = $('.strip', room), dots = $$('.dot', room), slides = $$('.slide', room), i = 0;
    function show(n, fromScroll) {
      i = (n + slides.length) % slides.length;
      dots.forEach(function (d, k) { d.classList.toggle('on', k === i); d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      if (phone.matches) { if (!fromScroll) strip.scrollTo({ left: slides[i].offsetLeft, behavior: reduced ? 'auto' : 'smooth' }); }
      else slides.forEach(function (s, k) { s.classList.toggle('on', k === i); if (k === i) $('img', s).loading = 'eager'; });
    }
    function toggle(want) {
      var was = room.classList.contains('open');
      closeAll();
      if (want === undefined ? !was : want) { room.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); elev.classList.add('has-open'); bar.set(room); }
      else bar.set(null);
    }
    dots.forEach(function (d, k) { d.addEventListener('click', function (e) { e.stopPropagation(); show(k); if (!room.classList.contains('open') && !phone.matches) toggle(true); }); });
    head.addEventListener('click', function () { if (!phone.matches) toggle(); });
    strip.addEventListener('click', function () {
      if (phone.matches) return;
      if (!room.classList.contains('open')) toggle(true); else show(i + 1);
    });
    strip.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    });
    var st;
    strip.addEventListener('scroll', function () { clearTimeout(st); st = setTimeout(function () { if (phone.matches) show(Math.round(strip.scrollLeft / strip.clientWidth), true); }, 60); }, { passive: true });
    show(0, true);
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('.room.open')) { var o = $('.room.open .grow'); closeAll(); bar.set(null); o.focus(); } });

  var strips = $$('.strip');
  if ('IntersectionObserver' in window) {
    var nearRoom = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('near'); nearRoom.unobserve(e.target); } }); }, { rootMargin: '40% 0px 40% 0px' });
    var inRoom = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('near', 'seen'); inRoom.unobserve(e.target); } }); });
    strips.forEach(function (x) { nearRoom.observe(x); inRoom.observe(x); });
  } else strips.forEach(function (x) { x.classList.add('near', 'seen'); });
  if ('IntersectionObserver' in window) {
    var seen = new Map();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { seen.set(e.target, e.intersectionRatio); });
      if ($('.room.open')) return;
      var best = null, r = .35;
      seen.forEach(function (v, k) { if (v > r) { r = v; best = k; } });
      // On a desktop all four panels are in view at once: only an open one speaks for itself.
      bar.set(phone.matches ? best : null);
    }, { threshold: [0, .35, .6, .9] });
    rooms.forEach(function (r) { io.observe(r); });
  }

  /* ---------- Swipe rows on a phone: dots, and a keyboard stop only where they really scroll ---------- */
  $$('.swipe').forEach(function (row) {
    var items = Array.prototype.slice.call(row.children), wrap = row.nextElementSibling;
    if (!wrap || !wrap.classList.contains('swipe-dots')) return;
    if (!phone.matches) row.removeAttribute('tabindex');
    var ds = items.map(function (it, k) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'dot' + (k ? '' : ' on');
      b.setAttribute('aria-label', (k + 1) + ' / ' + items.length); b.appendChild(document.createElement('i'));
      b.addEventListener('click', function () { row.scrollTo({ left: it.offsetLeft - row.offsetLeft - 20, behavior: reduced ? 'auto' : 'smooth' }); });
      wrap.appendChild(b); return b;
    });
    var st;
    row.addEventListener('scroll', function () {
      clearTimeout(st);
      st = setTimeout(function () {
        var c = row.scrollLeft + 20, best = 0, d = 1e9;
        items.forEach(function (it, k) { var v = Math.abs(it.offsetLeft - row.offsetLeft - c); if (v < d) { d = v; best = k; } });
        ds.forEach(function (b, k) { b.classList.toggle('on', k === best); });
      }, 60);
    }, { passive: true });
  });

  /* ---------- A print that drifts a little, desktop only ---------- */
  var drift = $$('[data-drift]');
  function driftNow() {
    if (reduced || phone.matches) return;
    var vh = innerHeight;
    drift.forEach(function (el) {
      var r = el.getBoundingClientRect(); if (r.bottom < -80 || r.top > vh + 80) return;
      el.style.transform = 'translate3d(0,' + (((r.top + r.height / 2 - vh / 2) / vh) * parseFloat(el.dataset.drift)).toFixed(1) + 'px,0)';
    });
  }

  /* ---------- The set-piece ---------- */
  var FULL = [0, 0, 1, 1];
  var SRC_PHONE = [930 / 1920, 0, 891 / 1920, 1];     // the phone's copy of the photograph
  var WIN_PHONE = [1000 / 1920, 0, 499 / 1920, 1];    // what the pinned phone screen looks at
  var piece = $('.piece'), stage = $('.stage'), frame = $('.frame'), print = $('.print'), pdots = $('.pdots'), dots = $$('.pd'), still = $('.frame img');
  var canvas = $('#hour');
  var pinned = doc.classList.contains('pin');
  var gl = null, software = false, raf = 0, started = false;
  var S = { a: 1, b: 1.85, view: FULL, win: [0, 1], dirty: true };

  function progress() {
    if (!pinned) return 1;
    var r = piece.getBoundingClientRect(), top = parseFloat(getComputedStyle(stage).top) || 0;
    var span = r.height - stage.offsetHeight;
    return span > 0 ? clamp((top - r.top) / span) : 1;
  }
  function size() {
    if (!pinned) return;
    var w = frame.clientWidth, h = frame.clientHeight; if (!w || !h) return;
    var win = isPhone ? WIN_PHONE : FULL;
    S.view = window.hourCover(win, w / h, .5, 1);
    S.win = [win[0], win[0] + win[2]];
    if (isPhone && still) {   // the fallback still looks at exactly what the canvas looks at
      var scale = h / 1080 / (S.view[3]), iw = 891 * scale, off = (S.view[0] * 1920 - 930) * scale;
      still.style.objectPosition = (iw > w ? (off / (iw - w)) * 100 : 50) + '% 100%';
    }
    if (gl) {
      var cap = isPhone ? 2 : (matchMedia('(pointer:coarse)').matches ? 1 : 1.5);
      var dpr = Math.min(devicePixelRatio || 1, cap);
      // A software renderer draws only when something changes, so a capped canvas stays affordable.
      if (software) dpr = Math.min(dpr, Math.sqrt(1400000 / (w * h)));
      var cw = Math.round(w * dpr), ch = Math.round(h * dpr);
      if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    }
    S.dirty = true;
  }
  function tick() {
    raf = 0;
    driftNow();
    if (!pinned) return;
    var r = piece.getBoundingClientRect();
    // A canvas drawn off screen can come back blank, so every arrival on screen draws again, and the
    // canvas only covers the still once it has really drawn on screen.
    var onScreen = r.top < innerHeight && r.bottom > 0;
    if (onScreen && !S.vis) S.dirty = true;
    S.vis = onScreen;
    if (r.top > innerHeight * 1.2 || r.bottom < -innerHeight * .2) return;
    var p = progress();
    // The sweep runs to .84. The real photograph starts rising over it at .68, so no graded frame is
    // ever where the page comes to rest: it ends on img-027, and the graded frame fades out behind it.
    var e = clamp(p / .84), q = clamp((p - .68) / .22), fade = clamp((p - .86) / .1);
    q = q * q * (3 - 2 * q);
    var ta = 1 - 1.86 * e, tb = ta + .85;
    var k = reduced ? 1 : .16, da = ta - S.a, db = tb - S.b;
    S.a += da * k; S.b += db * k;
    var n = Math.round(e * dots.length);
    dots.forEach(function (d, i) { d.classList.toggle('on', i < n); });
    frame.style.opacity = 1 - fade; pdots.style.opacity = 1 - q;
    print.style.transform = isPhone ? 'translateY(' + ((1 - q) * 105).toFixed(2) + '%)' : 'translate(-50%,calc(-50% + ' + ((1 - q) * 112).toFixed(2) + '%))';
    if (gl && fade < 1 && (S.dirty || Math.abs(da) + Math.abs(db) > .0004)) {
      gl.draw(S.view, S.win, S.a, S.b); S.dirty = false;
      if (onScreen) { canvas.classList.add('on'); frame.classList.add('live'); }
    }
    if (Math.abs(da) + Math.abs(db) > .0004) kick();
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', function () { size(); kick(); });

  function start() {
    if (started) return; started = true;
    var c = navigator.connection;
    if (reduced || (c && c.saveData) || !window.HourGL) return;
    var photo = new Image(), mask = new Image(), folds = new Image(), n = 0;
    function ready() {
      if (++n < 3) return;
      try {
        gl = window.HourGL(canvas, photo, mask, folds, { src: isPhone ? SRC_PHONE : FULL, preserve: true });
        if (!gl) return;
        var ctx = canvas.getContext('webgl');
        var ext = ctx.getExtension('WEBGL_debug_renderer_info');
        var name = ext ? String(ctx.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : '';
        software = !name || /swiftshader|llvmpipe|software/i.test(name);
        if (!software && ((navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2)) { gl.lose(); gl = null; return; }
        canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); gl = null; canvas.classList.remove('on'); frame.classList.remove('live'); });
        size();
        S.dirty = true;
        kick();
      } catch (err) { gl = null; }
    }
    photo.onload = mask.onload = folds.onload = ready;
    photo.src = isPhone ? 'img/hour-noon-phone.webp' : 'img/hour-noon.webp';
    mask.src = 'img/hour-mask.webp';
    folds.src = 'img/hour-folds.webp';
  }
  size();
  kick();
  if (pinned && 'IntersectionObserver' in window) {
    var near = new IntersectionObserver(function (es) { if (es[es.length - 1].isIntersecting) { near.disconnect(); $('img', print).loading = 'eager'; start(); } }, { rootMargin: '150% 0px 150% 0px' });
    near.observe(piece);
  } else if (pinned) start();
})();
