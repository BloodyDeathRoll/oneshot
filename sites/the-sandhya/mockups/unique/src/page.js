/* The Hour: page behaviour. Nothing here is needed to read the page or to book: every booking
   control is a real link in the HTML, and the canvas only arrives on top of a poster that already
   shows the same picture. Runs after first paint. */
(function () {
  var doc = document.documentElement, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phone = matchMedia('(max-width:767px)');

  /* ---------- The rooms: elevation panels ---------- */
  var elev = $('.elev'), rooms = $$('.room');
  function setBaseWidths() {
    if (phone.matches) { rooms.forEach(function (r) { r.style.removeProperty('--base'); }); return; }
    var open = $('.room.open'); if (open) return;
    rooms.forEach(function (r) { r.style.setProperty('--base', r.offsetWidth + 'px'); });
    var w = elev.clientWidth; elev.style.setProperty('--open', Math.round(w * .62) + 'px');
  }
  setBaseWidths();
  addEventListener('resize', function () { if (!$('.room.open')) setBaseWidths(); });

  function closeAll() { rooms.forEach(function (r) { r.classList.remove('open'); $('.grow', r).setAttribute('aria-expanded', 'false'); }); elev.classList.remove('has-open'); }
  rooms.forEach(function (room) {
    var btn = $('.grow', room), strip = $('.strip', room), dots = $$('.dot', room), slides = $$('.slide', room), i = 0;
    function show(n, fromScroll) {
      i = (n + slides.length) % slides.length;
      dots.forEach(function (d, k) { d.classList.toggle('on', k === i); d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      if (phone.matches) { if (!fromScroll) strip.scrollTo({ left: slides[i].offsetLeft, behavior: reduced ? 'auto' : 'smooth' }); }
      else slides.forEach(function (s, k) { s.classList.toggle('on', k === i); if (k === i) { var im = $('img', s); im.loading = 'eager'; } });
    }
    dots.forEach(function (d, k) { d.addEventListener('click', function (e) { e.stopPropagation(); show(k); if (!room.classList.contains('open') && !phone.matches) toggle(true); }); });
    function toggle(want) {
      var was = room.classList.contains('open');
      closeAll();
      if (want === undefined ? !was : want) { room.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); elev.classList.add('has-open'); bar.set(room); }
      else bar.set(null);
    }
    btn.addEventListener('click', function () { if (!phone.matches) toggle(); });
    strip.addEventListener('click', function (e) {
      if (phone.matches) return;
      if (!room.classList.contains('open')) toggle(true); else show(i + 1);
    });
    var st;
    strip.addEventListener('scroll', function () { clearTimeout(st); st = setTimeout(function () { if (phone.matches) show(Math.round(strip.scrollLeft / strip.clientWidth), true); }, 60); }, { passive: true });
    show(0, true);
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('.room.open')) { var o = $('.room.open .grow'); closeAll(); bar.set(null); o.focus(); } });

  /* ---------- The bar that remembers ---------- */
  var barLinks = $$('[data-remember]');
  var general = { href: barLinks[0].getAttribute('href'), label: barLinks[0].querySelector('.t').textContent };
  var bar = {
    cur: null,
    set: function (room) {
      var a = room ? $('.btn.go', room) : null;
      var next = a ? { href: a.getAttribute('href'), label: a.textContent } : general;
      if (this.cur === next.href) return; this.cur = next.href;
      barLinks.forEach(function (l) {
        l.setAttribute('href', next.href);
        var t = l.querySelector('.t'), g = document.createElement('span');
        g.className = 't'; g.textContent = next.label; g.style.opacity = 0;
        l.appendChild(g);
        t.style.opacity = 0;
        requestAnimationFrame(function () { g.style.opacity = 1; });
        setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 260);
      });
    }
  };
  bar.cur = general.href;
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

  /* ---------- Prints that drift a little, desktop only ---------- */
  var drift = $$('[data-drift]');
  function driftNow() {
    if (reduced || phone.matches) return;
    var vh = innerHeight;
    drift.forEach(function (el) {
      var r = el.getBoundingClientRect(); if (r.bottom < -80 || r.top > vh + 80) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = 'translate3d(0,' + (p * parseFloat(el.dataset.drift)).toFixed(1) + 'px,0)';
    });
  }

  /* ---------- The Hour ---------- */
  var FULL = [0, 0, 1, 1], WIN_PHONE = [668 / 1920, 60 / 1080, 651 / 1920, 930 / 1080];
  var hero = $('.hero .pic'), piece = $('.piece'), frame = $('.piece .frame'), still = $('.piece .still-dusk'), pdots = $$('.piece .pd');
  var canvas = $('#hour');
  var S = { hA: .2, hB: .9, hKeep: 1, a: .2, b: .9, keep: 1, stage: 'hero', dirty: true };
  var gl = null, p = 0, pointer = 0, pointerT = 0, raf = 0;
  var isPhone = phone.matches;
  var rest = isPhone ? { a: .04, b: 1.02, keep: .5 } : { a: .2, b: .9, keep: 1 };
  S.hA = S.a = rest.a; S.hB = S.b = rest.b; S.keep = rest.keep;

  function pieceProgress() {
    if (!doc.classList.contains('pin')) return 1;
    var r = piece.getBoundingClientRect(), span = r.height - innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
  }
  function targets() {
    var pp = pieceProgress();
    var heroGone = Math.min(1, scrollY / Math.max(1, hero.offsetHeight));
    var r = piece.getBoundingClientRect(), near = r.top < innerHeight * 1.2 && r.bottom > -innerHeight * .2;
    if (near) {
      var e = pp * pp * (3 - 2 * pp);
      return { stage: 'piece', a: rest.a + (-1.25 - rest.a) * e, b: rest.b + (-.2 - rest.b) * e, keep: rest.keep * (1 - e), p: pp };
    }
    return { stage: 'hero', a: rest.a + .035 * pointer - .2 * heroGone, b: rest.b + .035 * pointer - .2 * heroGone, keep: rest.keep, p: pp };
  }
  function paintPiece(pp) {
    var n = Math.round(pp * pdots.length);
    pdots.forEach(function (d, k) { d.classList.toggle('on', k < n); });
    if (!gl && still) still.style.opacity = pp;
  }
  function size() {
    if (!gl) return;
    var host = S.stage === 'piece' ? frame : hero, w = host.clientWidth, h = host.clientHeight;
    var cap = isPhone ? 2 : (matchMedia('(pointer:coarse)').matches ? 1 : 1.5);
    var dpr = Math.min(devicePixelRatio || 1, cap);
    // A software renderer draws only when something changes, so a capped canvas stays affordable
    // and the picture stays as sharp as its poster.
    if (software) dpr = Math.min(dpr, Math.sqrt(1400000 / (w * h)));
    var cw = Math.round(w * dpr), ch = Math.round(h * dpr);
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    S.view = window.hourCover(isPhone ? WIN_PHONE : FULL, w / h, .5, 1);
    S.win = isPhone ? [WIN_PHONE[0], WIN_PHONE[0] + WIN_PHONE[2]] : [0, 1];
    S.dirty = true;
  }
  function tick() {
    raf = 0;
    var t = targets();
    pointer += (pointerT - pointer) * .08;
    if (t.stage !== S.stage && gl) { S.stage = t.stage; (t.stage === 'piece' ? frame : hero).appendChild(canvas); S.a = t.a; S.b = t.b; S.keep = t.keep; size(); }
    var k = reduced ? 1 : .14;
    var da = t.a - S.a, db = t.b - S.b, dk = t.keep - S.keep;
    S.a += da * k; S.b += db * k; S.keep += dk * k;
    paintPiece(t.p);
    if (gl && (S.dirty || Math.abs(da) + Math.abs(db) + Math.abs(dk) > .0004)) { gl.draw(S.view, S.win, S.a, S.b, S.keep); S.dirty = false; }
    driftNow();
    if (Math.abs(da) + Math.abs(db) + Math.abs(dk) > .0004 || Math.abs(pointerT - pointer) > .001) kick();
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', function () { size(); kick(); });
  if (!reduced && !phone.matches && matchMedia('(hover:hover)').matches) {
    $('.hero').addEventListener('pointermove', function (e) { pointerT = (e.clientX / innerWidth - .5) * 2; kick(); }, { passive: true });
    $('.hero').addEventListener('pointerleave', function () { pointerT = 0; kick(); }, { passive: true });
  }
  kick();

  var software = false;
  function start() {
    var c = navigator.connection;
    if (reduced || (c && c.saveData) || !window.HourGL) return;
    var photo = new Image(), mask = new Image(), n = 0;
    function ready() {
      if (++n < 2) return;
      try {
        gl = window.HourGL(canvas, photo, mask, { src: isPhone ? WIN_PHONE : FULL });
        if (!gl) return;
        var ctx = canvas.getContext('webgl');
        var ext = ctx.getExtension('WEBGL_debug_renderer_info');
        var name = ext ? String(ctx.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : '';
        software = !name || /swiftshader|llvmpipe|software/i.test(name);
        if (!software && ((navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2)) { gl.lose(); gl = null; return; }
        canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); gl = null; canvas.classList.remove('on'); });
        size();
        gl.draw(S.view, S.win, S.a, S.b, S.keep);
        canvas.classList.add('on');
        if (still) still.style.opacity = 0;
        kick();
      } catch (err) { gl = null; }
    }
    photo.onload = mask.onload = ready;
    photo.src = isPhone ? 'img/hour-noon-phone.webp' : 'img/hour-noon.webp';
    mask.src = 'img/hour-mask.webp';
  }
  function later() { if (window.requestIdleCallback) requestIdleCallback(start, { timeout: 1500 }); else setTimeout(start, 300); }
  if (document.readyState === 'complete') later(); else addEventListener('load', later);
})();
