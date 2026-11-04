(function () {
  'use strict';
  var d = document, root = d.documentElement, W = window;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phone = W.matchMedia('(max-width: 767px)');

  /* ---------------- room slideshows: scroll-snap tracks with stretching dots */
  $$('[data-show]').forEach(function (show) {
    var track = $('.track', show), ctrl = $('.ctrl', show), dots = $$('.dot', show), n = dots.length, cur = -1;
    if (n < 2) return;
    ctrl.hidden = false;
    var held = $$('img[data-src]', show), wake = function () { held.forEach(function (im) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); }); held = []; };
    if ('IntersectionObserver' in W) { var wio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { wio.disconnect(); wake(); } }, { rootMargin: '300px 0px' }); wio.observe(show); } else wake();
    track.addEventListener('pointerdown', wake, { once: true });
    function mark(i) { if (i === cur) return; cur = i; dots.forEach(function (b, k) { b.setAttribute('aria-current', k === i ? 'true' : 'false'); }); }
    function go(i) { i = (i + n) % n; track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' }); mark(i); }
    var raf = 0;
    track.addEventListener('scroll', function () { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; mark(Math.round(track.scrollLeft / Math.max(1, track.clientWidth))); }); }, { passive: true });
    dots.forEach(function (b, k) { b.addEventListener('click', function () { go(k); }); });
    $('.prev', show).addEventListener('click', function () { go(cur - 1); });
    $('.next', show).addEventListener('click', function () { go(cur + 1); });
    track.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
    mark(0);
  });

  /* ---------------- guests: one quote at a time, cross-faded */
  $$('[data-quotes]').forEach(function (box) {
    var qs = $$('.q-big', box), dots = $$('.dot', box), ctrl = $('.qctrl', box), cur = 0;
    ctrl.hidden = false;
    function go(i) {
      cur = (i + qs.length) % qs.length;
      qs.forEach(function (q, k) { q.classList.toggle('on', k === cur); q.setAttribute('aria-hidden', k === cur ? 'false' : 'true'); });
      dots.forEach(function (b, k) { b.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
      var qn = $('.qn', box); if (qn) qn.textContent = (cur + 1) + ' / ' + qs.length;
    }
    dots.forEach(function (b, k) { b.addEventListener('click', function () { go(k); }); });
    $('.prev', box).addEventListener('click', function () { go(cur - 1); });
    $('.next', box).addEventListener('click', function () { go(cur + 1); });
    go(0);
  });

  /* ---------------- phone bar: slides up once the hero's button has left the screen */
  var bar = $('#bar'), heroBtn = $('.hero .btn-hero');
  if (bar) {
    if (!heroBtn || !('IntersectionObserver' in W)) bar.classList.add('up');
    else new IntersectionObserver(function (es) { bar.classList.toggle('up', !es[0].isIntersecting && es[0].boundingClientRect.top < 0); }).observe(heroBtn);
  }

  /* ---------------- the stay, round the clock */
  var clock = $('#stay');
  if (clock && root.classList.contains('pin')) {
    var blocks = $$('.blk', clock), frames = $$('.fr', clock), dial = $('.dial', clock), ticks = $$('.tick', clock);
    var media = $('.clock-media', clock), stage = $('.frames', clock), canvas = $('canvas.gl', clock);
    var active = -1, gl = null;
    function setActive(i) {
      if (i === active) return;
      active = i;
      blocks.forEach(function (b, k) { b.classList.toggle('cur', k === i); });
      frames.forEach(function (f, k) { f.classList.toggle('on', k === i); });
      ticks.forEach(function (t, k) { t.classList.toggle('past', k <= i); });
      dial.style.setProperty('--k', i);
      if (gl) gl.to(i);
    }
    var ticking = 0;
    function measure() {
      ticking = 0;
      var h = W.innerHeight, line;
      if (phone.matches) { var mb = media.getBoundingClientRect().bottom; line = mb + (h - mb) * 0.3; }
      else line = h * 0.55;
      var i = 0;
      for (var k = 0; k < blocks.length; k++) if (blocks[k].getBoundingClientRect().top < line) i = k;
      setActive(i);
    }
    W.addEventListener('scroll', function () { if (!ticking) ticking = requestAnimationFrame(measure); }, { passive: true });
    W.addEventListener('resize', function () { measure(); if (gl) gl.resize(); });
    measure();

    // WebGL horizon wipe: the next photograph opens along a soft band travelling out from its own horizon.
    var near = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      near.disconnect();
      frames.forEach(function (f) { f.loading = 'eager'; });
      Promise.all(frames.map(function (f) { return f.decode ? f.decode().catch(function () {}) : Promise.resolve(); }))
        .then(function () { try { gl = makeGL(canvas, frames, stage); } catch (e) { gl = null; } if (gl) { gl.show(active); stage.classList.add('gl-on'); } });
    }, { rootMargin: '120% 0px' });
    near.observe(clock);
  }

  function makeGL(cv, imgs, stage) {
    if (/[?&]nogl\b/.test(location.search)) return null;
    var g = cv.getContext('webgl', { premultipliedAlpha: false, antialias: false, alpha: false });
    if (!g) return null;
    var VS = 'attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}';
    var FS = [
      'precision mediump float;varying vec2 v;uniform sampler2D A,B;uniform float P,H;uniform vec2 S;',
      'void main(){',
      ' vec2 u=(v-.5)*S+.5;',
      ' vec4 a=texture2D(A,u),b=texture2D(B,u);',
      ' float n=sin(u.x*15.+P*4.)*.012+sin(u.x*37.-P*6.)*.006;',
      ' float mx=max(H,1.-H)+.14;',
      ' float e=mix(-.1,mx,P);',
      ' float d=abs(u.y-H)+n;',
      ' float m=1.-smoothstep(e-.09,e,d);',
      ' float glow=smoothstep(.07,0.,abs(d-e+.035))*sin(P*3.14159)*.16;',
      ' vec3 c=mix(a.rgb,b.rgb,m)+glow*vec3(1.,.86,.7);',
      ' gl_FragColor=vec4(c,1.);}'
    ].join('\n');
    function sh(t, s) { var o = g.createShader(t); g.shaderSource(o, s); g.compileShader(o); if (!g.getShaderParameter(o, g.COMPILE_STATUS)) throw new Error(g.getShaderInfoLog(o)); return o; }
    var pr = g.createProgram(); g.attachShader(pr, sh(g.VERTEX_SHADER, VS)); g.attachShader(pr, sh(g.FRAGMENT_SHADER, FS)); g.linkProgram(pr);
    if (!g.getProgramParameter(pr, g.LINK_STATUS)) return null;
    g.useProgram(pr);
    var buf = g.createBuffer(); g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW);
    var loc = g.getAttribLocation(pr, 'p'); g.enableVertexAttribArray(loc); g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
    var U = {}; ['A', 'B', 'P', 'H', 'S'].forEach(function (k) { U[k] = g.getUniformLocation(pr, k); });
    g.uniform1i(U.A, 0); g.uniform1i(U.B, 1);
    var tex = imgs.map(function (im) {
      var t = g.createTexture(); g.bindTexture(g.TEXTURE_2D, t);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, im);
      return { t: t, hz: parseFloat(im.getAttribute('data-hz')) || .5, ar: im.naturalWidth / im.naturalHeight };
    });
    var from = 0, to = 0, p = 1, t0 = 0, run = 0, DUR = 1100;
    function resize() {
      var r = stage.getBoundingClientRect(), dpr = Math.min(W.devicePixelRatio || 1, 1.5);
      var px = r.width * r.height * dpr * dpr, cap = 1400000;
      if (px > cap) dpr *= Math.sqrt(cap / px);
      cv.width = Math.max(1, Math.round(r.width * dpr)); cv.height = Math.max(1, Math.round(r.height * dpr));
      g.viewport(0, 0, cv.width, cv.height);
      var ca = r.width / r.height, ia = tex[0].ar;
      g.uniform2f(U.S, ca > ia ? 1 : ca / ia, ca > ia ? ia / ca : 1);
      draw();
    }
    function draw() {
      g.activeTexture(g.TEXTURE0); g.bindTexture(g.TEXTURE_2D, tex[from].t);
      g.activeTexture(g.TEXTURE1); g.bindTexture(g.TEXTURE_2D, tex[to].t);
      g.uniform1f(U.P, p); g.uniform1f(U.H, tex[to].hz);
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
    }
    function ease(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
    function frame(now) {
      var x = Math.min(1, (now - t0) / DUR); p = ease(x); draw();
      if (x < 1) run = requestAnimationFrame(frame); else { run = 0; from = to; }
    }
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); stage.classList.remove('gl-on'); });
    resize();
    return {
      resize: resize,
      show: function (i) { from = to = Math.max(0, i); p = 1; draw(); },
      to: function (i) {
        if (i === to && run) return;
        if (run) { cancelAnimationFrame(run); run = 0; from = p > .5 ? to : from; }
        else from = to;
        to = i; p = 0; t0 = performance.now(); run = requestAnimationFrame(frame);
      }
    };
  }

  /* ---------------- Rosa: headline (fixture, refreshed live when near) + Rosa's own widget, both lazy */
  var now = $('#rosa-now'), box = $('.rosa-box');
  var DAY = 864e5;
  if (now) {
    var gen = Date.parse(now.getAttribute('data-generated'));
    if (!(Date.now() - gen < DAY)) now.classList.add('stale');
    var PTS = 'N NNE NE ENE E ESE SE SSE S SSW SW WSW W WNW NW NNW'.split(' ');
    var fmt = function (x) { return x.toFixed(1); };
    var fill = function (j) {
      var c = j.current, s = (c.swells || []).filter(function (w) { return w.in_window; })[0];
      if (!c || !s || !(Date.now() - Date.parse(j.generated_at) < DAY)) return false;
      var t = new Date(c.t);
      var ds = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: j.spot.timezone || 'Asia/Colombo' }).format(t).replace(',', '');
      var hs = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: j.spot.timezone || 'Asia/Colombo' }).format(t);
      $('#rosa-h').textContent = fmt(c.h[0]) + '–' + fmt(c.h[1]);
      $('#rosa-phrase').textContent = 'Wave height now, ' + c.phrase;
      $('#rosa-time').textContent = ds + ', ' + hs;
      $('#rosa-p').textContent = (s.period >= 10 ? s.period.toFixed(0) : s.period.toFixed(1)) + ' s';
      $('#rosa-d').textContent = PTS[Math.round(s.dir / 22.5) % 16];
      $('#rosa-w').textContent = Math.round(c.wind.kph) + ' km/h';
      $('#rosa-wc').textContent = c.wind['class'];
      return true;
    };
    var sec = $('#break');
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        now.setAttribute('data-loading', 'true');
        fetch(now.getAttribute('data-json'), { mode: 'cors' }).then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) { if (j && fill(j)) now.classList.remove('stale'); })
          .catch(function () {})
          .then(function () { now.removeAttribute('data-loading'); });
        if (box) {
          var f = d.createElement('iframe');
          f.title = box.getAttribute('data-title'); f.width = '100%'; f.height = '500';
          f.setAttribute('style', 'max-width:420px;border:0;border-radius:16px;display:block');
          f.loading = 'lazy'; f.referrerPolicy = 'strict-origin-when-cross-origin';
          f.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin');
          f.addEventListener('load', function () { box.classList.add('loaded'); var fb = $('.fallback', box); if (fb) fb.remove(); });
          f.src = box.getAttribute('data-rosa');
          box.appendChild(f);
        }
      }, { rootMargin: '400px 0px' });
      io.observe(sec);
    }
  }

  /* ---------------- "Find your room": in-page overlay, tiles by how many are coming */
  var sheet = $('#sheet'), scrim = $('#scrim'), opener = null;
  if (sheet) {
    var tiles = $$('.tile', sheet), picks = $$('.pick', sheet), ns = $('.notsure', sheet);
    var focusables = function () { return $$('a[href],button:not([disabled])', sheet).filter(function (e) { return e.offsetParent !== null; }); };
    var open = function (from) {
      opener = from; sheet.open = true; sheet.hidden = false; scrim.hidden = false; root.style.overflow = 'hidden';
      requestAnimationFrame(function () { requestAnimationFrame(function () { sheet.classList.add('open'); scrim.classList.add('open'); }); });
      tiles[0].focus({ preventScroll: true });
    };
    var close = function () {
      sheet.open = false; sheet.classList.remove('open'); scrim.classList.remove('open'); root.style.overflow = '';
      setTimeout(function () { if (!sheet.classList.contains('open')) { sheet.hidden = true; scrim.hidden = true; } }, reduce ? 0 : 460);
      if (opener) opener.focus({ preventScroll: true });
    };
    $$('[data-finder]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); open(a); }); });
    $$('[data-close]', sheet).forEach(function (b) { b.addEventListener('click', close); });
    scrim.addEventListener('click', close);
    d.addEventListener('keydown', function (e) {
      if (sheet.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        var f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    tiles.forEach(function (t) {
      t.setAttribute('aria-pressed', 'false');
      t.addEventListener('click', function () {
        var n = +t.getAttribute('data-n');
        tiles.forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
        picks.forEach(function (p) { var s = +p.getAttribute('data-sleeps'); p.classList.toggle('fit', n > 0 && s >= n && s <= n + 1); });
        ns.hidden = n !== 0;
      });
    });
  }
})();
