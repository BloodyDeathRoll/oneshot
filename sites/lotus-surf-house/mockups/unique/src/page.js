/* Lotus Surf House, unique: the cloth net (WebGL), the room chooser, slideshows, quotes, header and bar.
   Without it: the still SVG net, /stay/ as a page, scroll-snap rows, and every link works. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const force = /[?&]net=force/.test(location.search);   // skips the weak-device check, for software GL

  /* ---------- the net: Verlet cloth pinned to a rail, tied at both lower corners ---------- */
  function Net(stage, opts) {
    const canvas = stage.querySelector('.net-gl');
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!gl) return null;
    const NX = opts.nx, NY = opts.ny, N = NX * NY;
    let W = 0, H = 0, dpr = 1;
    const pos = new Float32Array(N * 2), prev = new Float32Array(N * 2), rest = new Float32Array(N * 2), pin = new Uint8Array(N);
    const dens = new Float32Array(N), uv = new Float32Array(N * 2);
    const cons = []; // [a, b, len]
    const shape = (u, v) => {   // the same drape as the still SVG (build.py net_svg)
      const top = 0, xl = W * (0.012 + 0.058 * v * v), xr = W - xl;
      const hem = H * (0.90 + 0.07 * Math.sin(Math.PI * u));
      return [xl + (xr - xl) * u, top + v * (hem - top)];
    };
    const layout = () => {
      const r = stage.getBoundingClientRect(); W = r.width; H = r.height; dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); gl.viewport(0, 0, canvas.width, canvas.height);
      cons.length = 0;
      for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
        const k = j * NX + i, [x, y] = shape(i / (NX - 1), j / (NY - 1));
        rest[2 * k] = pos[2 * k] = prev[2 * k] = x; rest[2 * k + 1] = pos[2 * k + 1] = prev[2 * k + 1] = y;
        uv[2 * k] = i / (NX - 1); uv[2 * k + 1] = j / (NY - 1);
        pin[k] = j === 0 || (j === NY - 1 && (i === 0 || i === NX - 1)) ? 1 : 0;
      }
      const link = (a, b) => cons.push([a, b, Math.hypot(rest[2 * a] - rest[2 * b], rest[2 * a + 1] - rest[2 * b + 1])]);
      for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
        const k = j * NX + i; if (i < NX - 1) link(k, k + 1); if (j < NY - 1) link(k, k + NX);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, bUV); gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
      gl.uniform2f(uCells, W / 4, H / 4);
    };
    // GL
    const vs = `attribute vec2 p,t;attribute float d;uniform vec2 res;varying vec2 vt;varying float vd;
      void main(){vt=t;vd=d;vec2 c=p/res*2.-1.;gl_Position=vec4(c.x,-c.y,0.,1.);}`;
    const fs = `precision mediump float;varying vec2 vt;varying float vd;uniform vec2 cells;uniform float hem;
      void main(){
        vec2 g=fract(vt*cells);vec2 e=min(g,1.-g);
        float th=1.-smoothstep(.05,.16,min(e.x,e.y));
        float fade=smoothstep(0.,.09,vt.y);
        float a=clamp(vd,.75,1.8)*fade;
        float fold=pow(.5+.5*sin(vt.x*43.98+sin(vt.y*3.)*.7),2.2);   // seven soft folds, carried by the mesh
        float edge=smoothstep(.0,.06,vt.x)*smoothstep(1.,.94,vt.x);
        vec4 shade=vec4(vec3(140.,124.,108.)/255.,(.035+.13*fold)*a*(.55+.45*edge));
        vec4 haze=vec4(1.,1.,1.,.03*a);
        vec4 thr=vec4(vec3(120.,104.,90.)/255.,.12*a*th*(.8+.4*fold));
        vec4 c=vec4(haze.rgb*haze.a,haze.a);                               // premultiplied, back to front
        c=vec4(shade.rgb*shade.a,shade.a)+c*(1.-shade.a);
        c=vec4(thr.rgb*thr.a,thr.a)+c*(1.-thr.a);
        float hm=smoothstep(1.-hem*1.25,1.-hem,vt.y);
        vec4 hc=vec4(189.,163.,142.,242.)/255.;
        c=mix(c,vec4(hc.rgb*hc.a,hc.a),hm);
        gl_FragColor=c;
      }`;
    const sh = (ty, s) => { const o = gl.createShader(ty); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    const uRes = gl.getUniformLocation(pr, 'res'), uCells = gl.getUniformLocation(pr, 'cells');
    gl.uniform1f(gl.getUniformLocation(pr, 'hem'), opts.hem);
    const bP = gl.createBuffer(), bUV = gl.createBuffer(), bD = gl.createBuffer(), bI = gl.createBuffer();
    const idx = new Uint16Array((NX - 1) * (NY - 1) * 6); let n = 0;
    for (let j = 0; j < NY - 1; j++) for (let i = 0; i < NX - 1; i++) { const k = j * NX + i; idx.set([k, k + 1, k + NX, k + 1, k + NX + 1, k + NX], n); n += 6; }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bI); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    const attr = (name, buf, size) => { const l = gl.getAttribLocation(pr, name); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, size, gl.FLOAT, false, 0, 0); };
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    layout(); attr('t', bUV, 2);
    gl.bindBuffer(gl.ARRAY_BUFFER, bP); gl.bufferData(gl.ARRAY_BUFFER, pos.byteLength, gl.DYNAMIC_DRAW); attr('p', bP, 2);
    gl.bindBuffer(gl.ARRAY_BUFFER, bD); gl.bufferData(gl.ARRAY_BUFFER, dens.byteLength, gl.DYNAMIC_DRAW); attr('d', bD, 1);

    let mx = -1e4, my = -1e4, active = false, raf = 0, quiet = 0, inView = true, t = 0, costs = [];
    const R = () => Math.max(70, W * 0.17);
    const step = () => {
      const g = 0.05, damp = 0.965, r = R();
      for (let k = 0; k < N; k++) {
        if (pin[k]) continue;
        const x = pos[2 * k], y = pos[2 * k + 1];
        let vx = (x - prev[2 * k]) * damp, vy = (y - prev[2 * k + 1]) * damp;
        prev[2 * k] = x; prev[2 * k + 1] = y;
        // a soft pull back to the hanging shape, so the net always settles where it was drawn
        vx += (rest[2 * k] - x) * 0.012; vy += (rest[2 * k + 1] - y) * 0.012 + g * 0.02;
        const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy);
        if (d < r && d > 0.01) { const f = (r - d) / r; vx += dx / d * f * 1.1; vy += dy / d * f * 0.5; }
        pos[2 * k] = x + vx; pos[2 * k + 1] = y + vy;
      }
      for (let it = 0; it < 3; it++) for (const [a, b, len] of cons) {
        const ax = pos[2 * a], ay = pos[2 * a + 1], dx = pos[2 * b] - ax, dy = pos[2 * b + 1] - ay;
        const d = Math.hypot(dx, dy) || 1e-4, diff = (d - len) / d * 0.5;
        const ox = dx * diff, oy = dy * diff;
        if (!pin[a]) { pos[2 * a] += ox; pos[2 * a + 1] += oy; }
        if (!pin[b]) { pos[2 * b] -= ox; pos[2 * b + 1] -= oy; }
      }
      // density: how gathered the mesh is around each point (gathered net looks thicker)
      let e = 0;
      for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
        const k = j * NX + i, k2 = i < NX - 1 ? k + 1 : k - 1;
        const cur = Math.abs(pos[2 * k2] - pos[2 * k]) || 1e-3, rl = Math.abs(rest[2 * k2] - rest[2 * k]) || 1e-3;
        dens[k] = rl / cur;
        e += Math.abs(pos[2 * k] - prev[2 * k]) + Math.abs(pos[2 * k + 1] - prev[2 * k + 1]);
      }
      return e / N;
    };
    const draw = () => {
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, W, H);
      gl.bindBuffer(gl.ARRAY_BUFFER, bP); gl.bufferSubData(gl.ARRAY_BUFFER, 0, pos);
      gl.bindBuffer(gl.ARRAY_BUFFER, bD); gl.bufferSubData(gl.ARRAY_BUFFER, 0, dens);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    };
    const frame = () => {
      raf = 0; if (!inView || document.hidden) return;
      const t0 = performance.now(); const e = step(); draw(); t++;
      if (costs.length < 30) {
        costs.push(performance.now() - t0);
        if (costs.length === 30 && !force && costs.slice(5).reduce((s, v) => s + v, 0) / 25 > 20) { stage.classList.remove('net-on'); return; } // weak device: the still net
      }
      quiet = e < 0.01 && mx < -1e3 ? quiet + 1 : 0;
      if (quiet > 40) return;   // settled: sleep until the pointer comes back
      raf = requestAnimationFrame(frame);
    };
    const wake = () => { quiet = 0; if (!raf && inView) raf = requestAnimationFrame(frame); };
    const sway = (amt) => { for (let k = 0; k < N; k++) if (!pin[k]) { const v = Math.floor(k / NX) / (NY - 1); prev[2 * k] -= amt * v * Math.sin(k % NX / NX * Math.PI); } wake(); };
    const toLocal = (cx, cy) => { const r = stage.getBoundingClientRect(); return [cx - r.left, cy - r.top]; };
    const over = e => { const [x, y] = toLocal(e.clientX, e.clientY); const pad = R(); if (x > -pad && y > -pad && x < W + pad && y < H + pad) { mx = x; my = y; wake(); } else if (mx > -1e3) { mx = my = -1e4; wake(); } };
    if (!coarse) addEventListener('pointermove', over, { passive: true });
    stage.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') over(e); });
    stage.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') over(e); }, { passive: true });
    const off = () => { mx = my = -1e4; wake(); };
    stage.addEventListener('pointerup', off); stage.addEventListener('pointercancel', off); stage.addEventListener('pointerleave', e => { if (e.pointerType !== 'mouse') off(); });
    new IntersectionObserver(([en]) => { inView = en.isIntersecting; if (inView) { if (opts.swayOnView) sway(opts.swayOnView); wake(); } }).observe(stage);
    document.addEventListener('visibilitychange', wake);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { layout(); draw(); }, 120); }, { passive: true });
    stage.classList.add('net-on'); step(); draw();
    return { sway, wake };
  }
  const startNets = () => {
    if (reduce) return;
    const hero = document.querySelector('[data-net="hero"]');
    const h = hero && Net(hero, { nx: 40, ny: 40, hem: 0.011 });
    if (h) h.sway(coarse ? 5 : 3);                     // one sway on load (1.2 s), then still on a phone
    const c = document.querySelector('[data-net="closing"]');
    if (c) Net(c, { nx: 40, ny: 12, hem: 0.05, swayOnView: 3 });
  };
  const later = () => requestAnimationFrame(() => setTimeout(startNets, 60));
  document.readyState === 'complete' ? later() : addEventListener('load', later, { once: true });

  /* ---------- slideshows ---------- */
  for (const show of document.querySelectorAll('[data-show]')) {
    const track = show.querySelector('.track'), slides = [...track.children], dots = [...show.querySelectorAll('.dot')];
    show.querySelector('.ctrl').hidden = false;
    let cur = 0;
    const mark = i => { cur = i; dots.forEach((d, j) => d.setAttribute('aria-current', j === i ? 'true' : 'false')); };
    const go = i => { i = (i + slides.length) % slides.length; track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' }); mark(i); };
    let tm; track.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(() => mark(Math.round(track.scrollLeft / track.clientWidth)), 60); }, { passive: true });
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    show.querySelector('.prev').addEventListener('click', () => go(cur - 1));
    show.querySelector('.next').addEventListener('click', () => go(cur + 1));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
    mark(0);
  }

  /* ---------- one review at a time ---------- */
  for (const box of document.querySelectorAll('[data-quotes]')) {
    const qs = [...box.querySelectorAll('.q')], dots = [...box.querySelectorAll('.dot')];
    box.classList.add('ready'); box.querySelector('.ctrl').hidden = false;
    let cur = 0;
    const go = i => { cur = (i + qs.length) % qs.length;
      qs.forEach((q, j) => { q.classList.toggle('on', j === cur); q.setAttribute('aria-hidden', j === cur ? 'false' : 'true'); });
      dots.forEach((d, j) => d.setAttribute('aria-current', j === cur ? 'true' : 'false')); };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    box.querySelector('.prev').addEventListener('click', () => go(cur - 1));
    box.querySelector('.next').addEventListener('click', () => go(cur + 1));
    go(0);
  }

  /* ---------- the slide-down room chooser (a real /stay/ page without JS) ---------- */
  const stay = document.getElementById('stay'), scrim = document.querySelector('.scrim');
  const tiles = [...stay.querySelectorAll('[data-tile]')], answers = [...stay.querySelectorAll('[data-ans]')];
  let opener = null;
  const choose = key => {
    tiles.forEach(t => t.setAttribute('aria-pressed', t.dataset.tile === key ? 'true' : 'false'));
    answers.forEach(a => a.classList.toggle('on', a.dataset.ans === key));
  };
  tiles.forEach(t => t.addEventListener('click', () => choose(t.dataset.tile)));
  const focusables = () => [...stay.querySelectorAll('a[href],button:not([disabled])')].filter(el => el.offsetParent !== null);
  const open = (from, key) => {
    opener = from; stay.hidden = false; scrim.hidden = false; choose(key || null);
    requestAnimationFrame(() => { stay.classList.add('open'); scrim.classList.add('on'); });
    document.querySelector('main').inert = true; document.getElementById('bar').inert = true;
    setTimeout(() => (key ? stay.querySelector(`[data-tile="${key}"]`) : focusables()[0]).focus({ preventScroll: true }), 60);
  };
  const close = () => {
    stay.classList.remove('open'); scrim.classList.remove('on');
    document.querySelector('main').inert = false; document.getElementById('bar').inert = false;
    setTimeout(() => { stay.hidden = true; scrim.hidden = true; }, reduce ? 0 : 460);
    if (opener) opener.focus({ preventScroll: true });
  };
  document.querySelectorAll('[data-stay]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); open(a, a.dataset.tileOpen); }));
  stay.querySelector('.x').addEventListener('click', close);
  scrim.addEventListener('click', close);
  stay.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- header and phone bar ---------- */
  const top = document.querySelector('.top'), bar = document.getElementById('bar'), hero = document.querySelector('.hero');
  new IntersectionObserver(([e]) => bar.classList.toggle('on', !e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
  const solid = () => top.classList.toggle('solid', scrollY > 24); solid();
  addEventListener('scroll', solid, { passive: true });
})();
