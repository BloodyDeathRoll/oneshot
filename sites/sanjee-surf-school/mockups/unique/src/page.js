/* The set: a slow swell lifts the business's own prints in turn, right to left, about every 8.4 s. The prints ride it nearly rigid.
   Hand-written WebGL, no library. The DOM <img>s stay the true content and the LCP; the canvas takes over when ready.
   ?still = static prints. ?nogl = the CSS fallback. ?swell=0..1 freezes the swell at that phase (for looking at it). */
(function () {
  var q = new URLSearchParams(location.search);
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || q.has('still');
  var saveData = navigator.connection && navigator.connection.saveData;

  /* button press-fill: the flood starts where the finger lands */
  document.addEventListener('pointerdown', function (e) {
    var b = e.target.closest && e.target.closest('.btn');
    if (!b) return;
    var r = b.getBoundingClientRect();
    b.style.setProperty('--px', (e.clientX - r.left) + 'px');
    b.style.setProperty('--py', (e.clientY - r.top) + 'px');
  }, { passive: true });
  document.addEventListener('pointerover', function (e) {       /* and for a mouse, where it enters */
    if (e.pointerType !== 'mouse' || !e.target.closest) return;
    var b = e.target.closest('.btn');
    if (!b || (e.relatedTarget && b.contains(e.relatedTarget))) return;
    var r = b.getBoundingClientRect();
    b.style.setProperty('--px', (e.clientX - r.left) + 'px');
    b.style.setProperty('--py', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* ---- the persistent bar slides up once the hero's button has left the screen ---- */
  var bar = document.getElementById('bar'), heroCta = document.getElementById('hero-cta');
  if (bar && heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { root.classList.toggle('cta-on', !es[0].isIntersecting); }).observe(heroCta);
  } else if (bar) root.classList.add('cta-on');

  /* ---- the prints further down settle 18 px the first time they come into view, the last of the swell. Transform only ---- */
  if (!reduce && 'IntersectionObserver' in window) {
    var settle = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        settle.unobserve(en.target);
        en.target.classList.add('settling'); en.target.classList.remove('pre');
        setTimeout(function () { en.target.classList.remove('settling'); }, 700);
      });
    }, { threshold: .12 });
    [].forEach.call(document.querySelectorAll('.pr'), function (m) {
      if (m.getBoundingClientRect().top > innerHeight) { m.classList.add('pre'); settle.observe(m); }
    });
  }

  /* ---- the blurred placeholder under the bay goes once the real picture is in ---- */
  var ground = document.querySelector('.ground');
  if (ground) {
    var grounded = function () { ground.closest('.hero').classList.add('loaded'); };
    if (ground.complete && ground.naturalWidth) grounded(); else ground.addEventListener('load', grounded, { once: true });
  }

  /* ---- the header sits on the sky at the top and turns solid as soon as anything could pass under it ---- */
  var top = document.querySelector('.top');
  if (top) {
    var solid = function () { top.classList.toggle('solid', scrollY > 4); };
    addEventListener('scroll', solid, { passive: true }); solid();
  }

  /* ---- phone menu: closes on a choice, on a tap outside and on Esc ---- */
  var menu = document.querySelector('.menu');
  if (menu) {
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.open = false; });
    document.addEventListener('pointerdown', function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; }, { passive: true });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
  }

  /* ---- the strip: drag with momentum for a mouse; touch and trackpad scroll natively ---- */
  var strip = document.getElementById('strip');
  if (strip) {
    var down = false, sx = 0, sl = 0, vx = 0, lx = 0, lt = 0;
    strip.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; sx = lx = e.clientX; sl = strip.scrollLeft; vx = 0; lt = e.timeStamp; });
    addEventListener('pointermove', function (e) {
      if (!down) return;
      if (Math.abs(e.clientX - sx) > 3) strip.classList.add('drag');
      strip.scrollLeft = sl - (e.clientX - sx);
      var dt = e.timeStamp - lt; if (dt > 0) vx = (lx - e.clientX) / dt; lx = e.clientX; lt = e.timeStamp;
    }, { passive: true });
    addEventListener('pointerup', function () {
      if (!down) return; down = false;
      if (reduce) { strip.classList.remove('drag'); return; }
      (function glide() { if (Math.abs(vx) < .02) { strip.classList.remove('drag'); return; } strip.scrollLeft += vx * 16; vx *= .94; requestAnimationFrame(glide); })();
    });
  }

  /* ---- the quote row on a phone: dots stretch with the card in view ---- */
  var qs = document.getElementById('quotes'), qd = document.getElementById('qdots');
  if (qs && qd) {
    var cards = [].slice.call(qs.children), ds = [].slice.call(qd.children);
    var mark = function () {
      var c = qs.scrollLeft + 16, best = 0;
      cards.forEach(function (k, i) { if (Math.abs(k.offsetLeft - c) < Math.abs(cards[best].offsetLeft - c)) best = i; });
      ds.forEach(function (d, i) { d.classList.toggle('on', i === best); d.setAttribute('aria-current', i === best ? 'true' : 'false'); });
    };
    qs.addEventListener('scroll', mark, { passive: true });
    ds.forEach(function (d, i) { d.addEventListener('click', function () { qs.scrollTo({ left: cards[i].offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' }); }); });
    mark();
  }

  /* ---- the bottom sheet: an enhancement on real links. No JS, no dialog: the link goes straight to WhatsApp ---- */
  var sheet = document.getElementById('sheet');
  if (sheet && sheet.showModal) {
    var form = document.getElementById('sheet-form'), bubble = document.getElementById('bubble'), send = document.getElementById('sheet-send'), dateI = document.getElementById('sheet-date');
    var WA = send.getAttribute('href').split('?')[0], opener = null, closing = false;
    var pick = function (n) { var r = form.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : ''; };
    var message = function () {
      var t = "Hello Sanjee Surf School, I'd like to ask about " + (pick('lesson') === 'Private Coaching' ? '' : 'the ') + pick('lesson') + '.', lv = pick('level'), pe = pick('people'), ns = pick('dateNS');
      if (lv && lv !== 'Not sure') t += ' My level: ' + lv.toLowerCase() + '.';
      if (lv === 'Not sure') t += " I'm not sure of my level.";
      if (dateI.value) { var d = new Date(dateI.value + 'T12:00:00'); t += ' Date: ' + d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '.'; }
      else if (ns) t += " I'm not sure of the date yet.";
      if (pe && pe !== 'Not sure') t += ' People: ' + pe + '.';
      if (pe === 'Not sure') t += " I'm not sure how many people yet.";
      return t;
    };
    var render = function (soft) {
      var t = message();
      send.setAttribute('href', WA + '?text=' + encodeURIComponent(t));
      if (!soft || reduce) { bubble.textContent = t; return; }
      bubble.classList.add('fade');
      setTimeout(function () { bubble.textContent = t; bubble.classList.remove('fade'); }, 130);
    };
    var openSheet = function (lesson, from) {
      opener = from;
      var r = form.querySelectorAll('input[name="lesson"]')[lesson]; if (r) r.checked = true;
      render(false);
      sheet.classList.remove('closing');
      sheet.showModal();
      if (r) r.focus({ preventScroll: true });
    };
    var closeSheet = function () {
      if (closing || !sheet.open) return;
      if (reduce) { sheet.close(); sheet.style.transform = ''; return; }
      closing = true;
      sheet.classList.add('closing');
      setTimeout(function () { sheet.close(); sheet.classList.remove('closing', 'back'); sheet.style.transform = ''; closing = false; }, 190);
    };
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-open-drawer]');
      if (!a) return;
      e.preventDefault();
      openSheet(+a.dataset.lesson || 0, a);
    });
    var drag = sheet.querySelector('.sh-drag');
    if (drag) {
      var dy = 0, y0 = 0, t0 = 0, held = false;
      drag.addEventListener('pointerdown', function (e) {
        if (e.target.closest('button')) return;
        held = true; y0 = e.clientY; t0 = e.timeStamp; dy = 0;
        sheet.classList.remove('back'); drag.setPointerCapture(e.pointerId);
      });
      drag.addEventListener('pointermove', function (e) {
        if (!held) return;
        dy = e.clientY - y0;
        sheet.style.transform = 'translateY(' + (dy > 0 ? dy : dy * .15) + 'px)';   /* friction upward, not a wall */
      });
      var drop = function (e) {
        if (!held) return; held = false;
        var v = dy / Math.max(1, e.timeStamp - t0);
        if (dy > 120 || (dy > 12 && v > .5)) closeSheet();
        else { sheet.classList.add('back'); sheet.style.transform = ''; }
      };
      drag.addEventListener('pointerup', drop); drag.addEventListener('pointercancel', drop);
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); closeSheet(); });
    sheet.addEventListener('cancel', function (e) { e.preventDefault(); closeSheet(); });   /* Esc */
    sheet.addEventListener('click', function (e) { if (e.target === sheet) { var r = sheet.getBoundingClientRect(); if (e.clientY < r.top || e.clientX < r.left || e.clientX > r.right) closeSheet(); } });
    sheet.addEventListener('close', function () { if (opener) opener.focus({ preventScroll: true }); });
    send.addEventListener('click', function () { setTimeout(closeSheet, 300); });
    form.addEventListener('change', function (e) {
      var tile = e.target.closest('.tile');
      if (tile && !reduce) { tile.classList.remove('bump'); void tile.offsetWidth; tile.classList.add('bump'); }
      if (e.target === dateI && dateI.value) { var n = form.querySelector('input[name="dateNS"]'); if (n) n.checked = false; }
      if (e.target.name === 'dateNS') dateI.value = '';
      render(true);
    });
  }

  var set = document.getElementById('set');
  if (!set) return;
  var canvas = document.getElementById('swell');
  var phone = matchMedia('(max-width: 759px)').matches;
  var weak = (navigator.deviceMemory && navigator.deviceMemory < 3) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 3);

  if (reduce || saveData) return;                      /* static prints in their resting layout */
  if (q.has('nogl') || weak) { set.classList.add('bob'); return; }

  var VS = [
    'attribute vec2 a;',
    'uniform vec4 uRect; uniform vec2 uRes; uniform float uFront,uAmp,uW,uLift,uDepth,uPad,uShadow;',
    'varying vec2 vUv; varying float vShade; varying float vH; varying vec2 vPx;',
    /* the swell: a long back and a steeper face on the side it travels towards (left) */
    'float hgt(vec2 p){ float d=(p.x+p.y*.28-uFront)/uW; float e=d<0.?exp(-d*d*3.4):exp(-d*d*.8); return uAmp*e*uDepth; }',
    'void main(){',
    ' vec2 r=a*(uRect.zw+2.*uPad)-uPad; vec2 p=uRect.xy+r;',
    ' vec2 c=uRect.xy+uRect.zw*.5;',
    /* a print rides as a body: height and tilt are read at its centre, and only a trace of the local curve is left at its edges */
    ' float H=hgt(c); float sl=(hgt(c+vec2(40.,0.))-hgt(c-vec2(40.,0.)))/80.;',
    ' float t=clamp(sl*.75,-.022,.022); float cs=cos(t), sn=sin(t);',
    ' vec2 o=p-c; vec2 q=c+vec2(o.x*cs-o.y*sn,o.x*sn+o.y*cs)*(1.+H*.0007);',
    ' q.y-=H+uLift+(hgt(p)-H)*.14;',
    ' if(uShadow>.5){ q.y+=10.+H*1.15+uLift; q.x+=H*.25; }',
    ' vUv=r/uRect.zw; vShade=sl; vH=H+uLift; vPx=r;',
    ' vec2 ndc=q/uRes*2.-1.; gl_Position=vec4(ndc.x,-ndc.y,0.,1.);',
    '}'
  ].join('\n');
  var FS = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif',
    'varying vec2 vUv; varying float vShade; varying float vH; varying vec2 vPx;',
    'uniform sampler2D uTex; uniform vec4 uRect; uniform float uShadow,uAmp;',
    'void main(){',
    ' if(uShadow>.5){',
    '  float blur=46.+vH*2.2; vec2 d=abs(vPx-uRect.zw*.5)-uRect.zw*.5+blur*.32;',
    '  float sd=length(max(d,0.))+min(max(d.x,d.y),0.);',
    '  float al=(1.-smoothstep(-blur*.6,blur*.9,sd))*(.40-.12*clamp(vH/max(uAmp,1.),0.,1.));',
    '  gl_FragColor=vec4(.102,.133,.188,1.)*al; return;',
    ' }',
    ' vec2 e=min(vPx,uRect.zw-vPx); float al=clamp(min(e.x,e.y)+.5,0.,1.);',
    ' vec3 col=texture2D(uTex,vUv).rgb;',
    /* the face of the swell catches the light, the back falls into shade */
    ' col*=1.+vShade*.9;',
    ' gl_FragColor=vec4(col,1.)*al;',
    '}'
  ].join('\n');

  var gl = null;
  try {
    var opts = { alpha: true, premultipliedAlpha: true, antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: true };   /* we draw only while something moves */
    gl = canvas.getContext('webgl2', opts) || canvas.getContext('webgl', opts);
  } catch (e) {}
  if (!gl) { set.classList.add('bob'); return; }
  var isGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;

  function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(o); return o; }
  var pr, U = {}, N = 40, count;
  function setup() {
    pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.bindAttribLocation(pr, 0, 'a'); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw gl.getProgramInfoLog(pr);
    gl.useProgram(pr);
    ['uRect', 'uRes', 'uFront', 'uAmp', 'uW', 'uLift', 'uDepth', 'uPad', 'uShadow', 'uTex'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
    /* one grid, shared by every plane */
    var v = [], idx = [], x, y;
    for (y = 0; y <= N; y++) for (x = 0; x <= N; x++) v.push(x / N, y / N);
    for (y = 0; y < N; y++) for (x = 0; x < N; x++) { var i = y * (N + 1) + x; idx.push(i, i + 1, i + N + 1, i + 1, i + N + 2, i + N + 1); }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    count = idx.length;
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
  }
  try { setup(); } catch (e) { if (q.has('debug')) console.error(e); set.classList.add('bob'); return; }

  /* the smaller print is further out and rides a little less */
  var DEPTH = { 'p-006': .8, 'p-007': 1 };
  var prints = [].slice.call(set.querySelectorAll('[data-print]')).filter(function (m) { return m.getBoundingClientRect().width > 2; }).map(function (m) {
    return { el: m, tex: null, rect: [0, 0, 0, 0], lift: 0, liftTo: 0, depth: DEPTH[m.className.split(' ')[1]] || 1, z: +getComputedStyle(m).zIndex || 0 };
  }).sort(function (a, b) { return a.z - b.z; });   /* the same stacking as the CSS layout */
  var W = 0, H = 0, dpr = 1;

  function measure() {
    var c = set.getBoundingClientRect();
    W = c.width; H = c.height;
    /* the canvas spans the hero and the part of the prints that hang below it */
    prints.forEach(function (p) { var r = p.el.getBoundingClientRect(); H = Math.max(H, r.bottom - c.top + 80); p.rect = [r.left - c.left, r.top - c.top, r.width, r.height]; });
    canvas.style.height = H + 'px';
    dpr = Math.min(window.devicePixelRatio || 1, phone && (navigator.hardwareConcurrency || 4) < 6 ? 1.5 : 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U.uRes, W, H);
  }

  function upload(p) {
    var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, p.el);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (isGL2) { gl.generateMipmap(gl.TEXTURE_2D); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); }
    else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    p.tex = t;
  }

  var AMP = phone ? 10 : 12, WID = phone ? 210 : 420;
  function AMP_() { return AMP; }
  var PERIOD = 8400, PASS = 5600;
  var frozen = q.has('swell') ? parseFloat(q.get('swell')) : null;
  var startAt = 0, front = 1e6, amp = 0, damp = 1, raf = 0, inView = true, ready = false, timer = 0;
  if (frozen !== null) { amp = AMP_(); front = 0; }

  function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(U.uFront, front); gl.uniform1f(U.uW, WID); gl.uniform1f(U.uAmp, amp);
    /* painter's order: DOM order is back to front */
    prints.forEach(function (p) {
      gl.uniform4f(U.uRect, p.rect[0], p.rect[1], p.rect[2], p.rect[3]);
      gl.uniform1f(U.uDepth, p.depth); gl.uniform1f(U.uLift, p.lift);
      gl.uniform1f(U.uShadow, 1); gl.uniform1f(U.uPad, 90);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
      gl.bindTexture(gl.TEXTURE_2D, p.tex);
      gl.uniform1f(U.uShadow, 0); gl.uniform1f(U.uPad, 1);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
    });
  }

  function phaseToFront(ph) { var from = W + WID * 2.2, to = -WID * 1.6 - H * .28; return from + (to - from) * ph; }

  function tick(now) {
    raf = 0;
    if (!ready) return;
    var active = false;
    /* hover lift */
    prints.forEach(function (p) { var d = p.liftTo - p.lift; if (Math.abs(d) > .02) { p.lift += d * .18; active = true; } else p.lift = p.liftTo; });
    damp += ((scrollY > 0 ? 1 - Math.min(scrollY / (innerHeight * .4), 1) : 1) - damp) * .12;
    if (frozen !== null) { front = phaseToFront(frozen); amp = AMP; }
    else {
      var ph = startAt ? (now - startAt) / PASS : 2;
      if (ph < 1) { front = phaseToFront(ph); amp = AMP * damp; active = true; }
      else if (startAt) { startAt = 0; front = 1e6; amp = 0; schedule(PERIOD - PASS); }
    }
    draw();
    if (active && inView) kick();
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  function schedule(ms) { clearTimeout(timer); timer = setTimeout(function () { if (inView && !document.hidden && scrollY < innerHeight * .4) { startAt = performance.now(); kick(); } else schedule(1500); }, ms); }

  function fallback() { ready = false; clearTimeout(timer); set.classList.remove('gl'); set.classList.add('bob'); }
  function takeover() {
    if (gl.isContextLost()) { fallback(); return; }
    try { measure(); prints.forEach(upload); } catch (e) { /* file://, tainted: the CSS fallback */ if (q.has('debug')) console.error(e); fallback(); return; }
    draw();
    /* trust nothing: read one pixel back from the middle of the front print before hiding the real <img>s */
    var f = prints[prints.length - 1], px = new Uint8Array(4);
    gl.readPixels(Math.round((f.rect[0] + f.rect[2] / 2) * dpr), Math.round((H - f.rect[1] - f.rect[3] / 2) * dpr), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    if (px[3] < 200 || gl.isContextLost()) { fallback(); return; }
    ready = true;
    set.classList.remove('bob'); set.classList.add('gl');
    if (frozen !== null) { kick(); return; }
    schedule(900);
  }

  function whenLoaded() {
    return Promise.all(prints.map(function (p) { return p.el.decode ? p.el.decode().catch(function () {}) : Promise.resolve(); }));
  }
  /* after first paint, never before */
  addEventListener('load', function () { requestAnimationFrame(function () { setTimeout(function () { whenLoaded().then(takeover); }, 60); }); });

  addEventListener('resize', function () { if (ready) { measure(); kick(); } }, { passive: true });
  addEventListener('scroll', function () { if (ready && startAt) kick(); }, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; if (inView && ready) kick(); }).observe(set);
  /* a lost context never leaves a blank first screen: the real prints come straight back, and the swell returns if the GPU does */
  canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); if (q.has('debug')) console.warn('context lost'); fallback(); });
  canvas.addEventListener('webglcontextrestored', function () { try { setup(); takeover(); } catch (e) { fallback(); } });

  /* prints lift 6 px on hover; the DOM img underneath still takes the pointer */
  prints.forEach(function (p) {
    p.el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { p.liftTo = 6; if (ready) kick(); } });
    p.el.addEventListener('pointerleave', function () { p.liftTo = 0; if (ready) kick(); });
  });
})();
