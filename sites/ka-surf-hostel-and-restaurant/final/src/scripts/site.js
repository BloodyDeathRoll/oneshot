(() => {
const R = document.documentElement;
R.classList.add('js'); /* also set in <head>, so nothing flips on first paint */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* header name appears once the clearing has scrolled away */
const onScrollName = () => R.classList.toggle('past', scrollY > innerHeight * 0.7);
addEventListener('scroll', onScrollName, {passive: true}); onScrollName();


/* ---------- the Rosa forecast (playbook §4 exception) ----------
   One request to Rosa's per-spot JSON, made only when the block nears the viewport. With fresh data
   (under 24 h) the site draws the headline, and only then is Rosa's widget iframe given its src, so a
   failed network never leaves an empty widget box. On failure, stale data or no JS: the plain link. */
const fc = document.querySelector('.fc');
if (fc) {
  const now = fc.querySelector('.fc-now'), box = fc.querySelector('.fc-rosa'), rosaFrame = box.querySelector('iframe');
  const spot = fc.dataset.spot;
  const set = (k, v) => { const e = now.querySelector(`[data-f="${k}"]`); if (e) { e.textContent = v; e.hidden = !v; } };
  const fail = () => { delete now.dataset.loading; fc.classList.add('off'); };
  const WORDS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
  const from = (deg) => WORDS[Math.round((((+deg % 360) + 360) % 360) / 45) % 8];
  const parts = (iso, tz, o) => {
    const d = new Date(iso);
    if (isNaN(d)) throw new Error('bad time');
    return Object.fromEntries(new Intl.DateTimeFormat('en-GB', {timeZone: tz, hourCycle: 'h23', ...o}).formatToParts(d).map((p) => [p.type, p.value]));
  };
  const draw = (d) => {
    const c = d.current, tz = (d.spot && d.spot.timezone) || 'Asia/Colombo';
    if (!c || !Array.isArray(c.h) || !isFinite(c.h[0]) || !isFinite(c.h[1])) throw new Error('no current');
    const f1 = (x) => (+x).toFixed(1);
    const nh = now.querySelector('.nh');
    if (!nh.firstChild || nh.firstChild.nodeType !== 3) nh.insertBefore(document.createTextNode(''), nh.firstChild);
    nh.firstChild.textContent = `${f1(c.h[0])}–${f1(c.h[1])}`;
    const t = parts(c.t, tz, {weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'});
    set('t', `${t.weekday} ${t.day} ${t.month}, ${t.hour}:${t.minute} at ${spot}`);
    const sw = (c.swells || []).find((x) => x.in_window);
    set('swell', sw && isFinite(sw.period) ? `Swell ${f1(sw.period)} s from the ${from(sw.dir)}` : '');
    const w = c.wind;
    set('wind', w && isFinite(w.kph) ? `Wind ${Math.round(w.kph)} km/h from the ${from(w.dir)}${w.class ? ', ' + w.class : ''}` : '');
    const u = parts(d.generated_at, tz, {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'});
    set('upd', `Rosa, updated ${u.day} ${u.month} ${u.year}, ${u.hour}:${u.minute}`);
    fc.classList.add('live');
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    let lastW = now.clientWidth;
    if ('ResizeObserver' in window) new ResizeObserver(() => { if (now.clientWidth !== lastW) { lastW = now.clientWidth; fit(); } }).observe(now);
  };
  /* the number and its unit keep the design's size when they fit, and shrink to the column when a
     wider range arrives ("1.8–2.4", "10.0–12.5"), so they never run under Rosa's widget. Measured on
     the box (an inline span has no scrollWidth), and again when the font arrives or the column changes. */
  const fit = () => {
    const nh = now.querySelector('.nh');
    nh.style.fontSize = '';
    const avail = now.clientWidth;
    let w = nh.getBoundingClientRect().width;
    if (!avail || w <= avail) return;
    let fs = parseFloat(getComputedStyle(nh).fontSize) * avail / w;
    for (let i = 0; i < 12; i++) {
      nh.style.fontSize = Math.floor(fs) + 'px';
      if (nh.getBoundingClientRect().width <= avail) break;
      fs -= 2;
    }
  };
  const widget = () => {
    box.dataset.loading = 'true';
    rosaFrame.addEventListener('load', () => { box.classList.add('on'); delete box.dataset.loading; }, {once: true});
    rosaFrame.src = rosaFrame.dataset.src;
  };
  if (!('IntersectionObserver' in window) || !window.fetch || location.protocol === 'file:') fail();
  else {
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      now.dataset.loading = 'true';
      const ac = 'AbortController' in window ? new AbortController() : null;
      const to = setTimeout(() => ac && ac.abort(), 10000);
      fetch(fc.dataset.json, {credentials: 'omit', signal: ac && ac.signal})
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
        .then((d) => {
          const age = Date.now() - Date.parse(d.generated_at);
          if (!(age >= -36e5 && age < 864e5)) throw new Error('stale');
          draw(d);
          delete now.dataset.loading;
          widget();
        })
        .catch(fail)
        .finally(() => clearTimeout(to));
    }, {rootMargin: '400px 0px'});
    io.observe(fc);
  }
}

/* ---------- booking slide-out: every "Check dates" is a real link; this is on top ---------- */
const panel = document.getElementById('book'), veil = document.querySelector('.veil'), ctx = panel.querySelector('.ctx');
let lastFocus = null, closeT = 0;
const focusables = () => [...panel.querySelectorAll('a[href],button')];
function key(e) {
  if (e.key === 'Escape') { e.preventDefault(); closePanel(); return; }
  if (e.key !== 'Tab') return;
  const f = focusables(), i = f.indexOf(document.activeElement);
  if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
  else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
}
function openPanel(e) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return;
  e.preventDefault(); clearTimeout(closeT);
  lastFocus = e.currentTarget;
  const room = lastFocus.dataset.room;
  ctx.textContent = room || ''; ctx.hidden = !room;
  panel.hidden = false; veil.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => { panel.classList.add('open'); panel.querySelector('.tile').focus({preventScroll: true}); }));
  document.addEventListener('keydown', key);
}
function closePanel() {
  panel.classList.remove('open'); veil.hidden = true;
  document.removeEventListener('keydown', key);
  closeT = setTimeout(() => { panel.hidden = true; }, reduce ? 0 : 300);
  if (lastFocus) lastFocus.focus({preventScroll: true});
}
document.querySelectorAll('a.book').forEach((a) => a.addEventListener('click', openPanel));
panel.querySelector('.x').addEventListener('click', closePanel);
veil.addEventListener('click', closePanel);

/* ---------- headings drift against the scroll; the green line slides to its new column ---------- */
if (!reduce) {
  const hs = [...document.querySelectorAll('.sec h2')], turns = [...document.querySelectorAll('.turn')];
  const scrub = () => {
    const vh = innerHeight;
    for (const h of hs) { const r = h.getBoundingClientRect(); if (r.bottom > -200 && r.top < vh + 200) h.style.transform = `translate3d(0,${((r.top + r.height / 2) - vh / 2) * -0.05}px,0)`; }
    for (const t of turns) {
      const r = t.getBoundingClientRect(), q = clamp((vh * 0.92 - r.top) / (vh * 0.4), 0, 1), k = ((1 - q) * 100).toFixed(1);
      t.style.clipPath = t.dataset.from === 'left' ? `inset(0 ${k}% 0 0)` : `inset(0 0 0 ${k}%)`;
    }
  };
  addEventListener('scroll', scrub, {passive: true}); addEventListener('resize', scrub); scrub();
}

/* ---------- the canopy ---------- */
const COL = {shade: [0x4C, 0x69, 0x09], garden: [0x75, 0xA1, 0x2B], lit: [0xA3, 0xC4, 0x15], ink: [6, 5, 4]};
const LAYER = [COL.shade, COL.garden, COL.lit];

function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const ease = (x) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/* A blade is cut paper: a straight-sided strip with a chamfered tip, a narrow central ribbon,
   and lateral pieces separated by angled slits, the way a banana leaf tears. */
function makeBlade(r, o) {
  const cuts = [[], []];
  for (const side of [0, 1]) {
    const n = o.whole ? 0 : Math.floor(r() * 4) + (o.L > 500 ? 2 : 1);
    const ts = [];
    for (let i = 0; i < n; i++) ts.push(0.22 + r() * 0.66);
    ts.sort((a, b) => a - b);
    cuts[side] = ts.filter((t, i) => i === 0 || t - ts[i - 1] > 0.07);
  }
  return Object.assign({ph: r() * 6.28, ph2: r() * 6.28, cuts, chamfer: 0.10 + r() * 0.08, delay: r() * 0.3}, o);
}

function layout(w, h, box, mobile) {
  const r = rng(11);
  const {x0, x1, y0, y1} = box;
  /* few, very large blades, weighted to the right and the corners so the clearing leans
     towards the type: [base x, base y, tip x, tip y, width, layer, bend] */
  const spec = mobile ? [
    [w + 90, -300, w * 0.6, h * 0.16, 220, 1, 0.2],
    [-160, -260, w * 0.3, h * 0.13, 200, 0, -0.2],
    [w * 0.55, -320, w * 0.46, h * 0.09, 160, 1, 0.1],
    [-110, h + 60, w * 0.3, h * 0.82, 220, 1, 0.25],
    [w + 100, h + 40, w * 0.66, h * 0.8, 230, 0, -0.2],
    [w * 0.5, h + 190, w * 0.47, h * 0.86, 170, 1, 0.1],
    [w + 80, h * 0.5, w - 14, h * 0.47, 100, 0, 0.1],
  ] : [
    [w + 120, h * 0.44, x1 + 40, h * 0.5, 430, 0, 0.1],
    [w + 100, h * 0.02, x1 + 50, y0 + 70, 380, 1, -0.2],
    [w + 90, h * 1.0, x1 + 90, y1 - 90, 410, 1, 0.22],
    [w * 0.8, -130, w * 0.63, y0 + 40, 300, 0, 0.18],
    [w * 0.97, -110, w * 0.81, h * 0.38, 330, 1, -0.1],
    [w * 0.44, -170, w * 0.39, y0 - 34, 250, 0, 0.12],
    [-130, h * 0.12, x0 - 52, y0 + 8, 300, 1, 0.25],
    [-150, h + 90, x0 - 150, h * 0.5, 300, 0, -0.18],
    [w * 0.27, h + 160, w * 0.2, y1 + 34, 320, 1, 0.2],
    [w * 0.6, h + 170, w * 0.55, y1 + 26, 300, 0, -0.15],
  ];
  const blades = spec.map(([bx, by, tx, ty, W, layer, bend]) =>
    makeBlade(r, {x: bx, y: by, ang: Math.atan2(ty - by, tx - bx), L: Math.hypot(tx - bx, ty - by), W, bend, layer}));
  const sorted = blades.slice().sort((a, b) => (a.y + a.L * Math.sin(a.ang)) - (b.y + b.L * Math.sin(b.ang)));
  sorted.forEach((b, i) => { b.band = i / sorted.length; });
  return blades;
}

function prof(t, side, ch) {
  const base = clamp((t - 0.02) / 0.10, 0.05, 1);
  const tipStart = side ? 1 - ch : 1 - ch * 0.35;   // oblique cut at the tip
  const tip = t > tipStart ? clamp((1 - t) / (1 - tipStart), 0, 1) : 1;
  return base * tip;
}

/* geometry for one blade: a list of strips {a:[x,y..], b:[x,y..], c:[r,g,b], layer} and one midrib polyline */
function bladeGeom(b, now, ptr, p, spine, H, strips, ribs) {
  const pe = p <= 0 ? 0 : ease(clamp((p - b.delay) / 0.7, 0, 1));
  const sway = (0.016 * Math.sin(now * 0.00055 + b.ph) + 0.009 * Math.sin(now * 0.0013 + b.ph2)) * (1 - pe);
  const a = b.ang + sway, dx = Math.cos(a), dy = Math.sin(a), nx = -dy, ny = dx;
  const bandY = b.band * H - 30, bandH = H / 7 + 60;
  const col = LAYER[b.layer].map((c, i) => c + (COL.garden[i] - c) * pe);
  const P = (t, s, side) => {
    const hw = b.W * 0.5 * prof(t, side, b.chamfer);
    const off = b.bend * b.L * 0.2 * 4 * t * (1 - t);
    let x = b.x + dx * b.L * t + nx * (off + s * hw), y = b.y + dy * b.L * t + ny * (off + s * hw);
    if (ptr.k > 0.001) {
      const ex = x - ptr.x, ey = y - ptr.y, d = Math.hypot(ex, ey) || 1;
      if (d < ptr.R) {
        const q = 1 - d / ptr.R, f = q * q * ptr.push * ptr.k * (0.25 + t), nx2 = x + ex / d * f, ny2 = y + ey / d * f;
        if (!keep.some((k) => nx2 > k.l && nx2 < k.r && ny2 > k.t && ny2 < k.b)) { x = nx2; y = ny2; }
      }
    }
    if (pe > 0) {
      const tx = spine.x + (s + 1) / 2 * spine.w, ty = bandY + t * bandH;
      x += (tx - x) * pe; y += (ty - y) * pe;
    }
    return [x, y];
  };
  const strip = (t0, t1, sa, sb, side, e0, e1) => {
    const m = Math.max(2, Math.ceil((t1 - t0) * 22));
    const A = [], B = [];
    for (let i = 0; i <= m; i++) {
      const u = i / m;
      A.push(...P(t0 + (t1 - t0) * u, sa, side));
      B.push(...P(clamp(e0 + (e1 - e0) * u, 0, 1), sb, side));
    }
    strips.push({a: A, b: B, c: col, layer: b.layer});
  };
  const inner = 0.14;
  strip(0, 1, -inner, inner, 1, 0, 1);
  const sk = 0.03 * (1 - pe), gap = 0.007 * (1 - pe);
  for (const side of [0, 1]) {
    const sg = side ? 1 : -1;
    const cuts = [0, ...b.cuts[side], 1];
    for (let j = 0; j < cuts.length - 1; j++) {
      const t0 = cuts[j], t1 = cuts[j + 1];
      const e0 = j === 0 ? t0 : t0 + sk + gap, e1 = j === cuts.length - 2 ? t1 : t1 + sk - gap;
      strip(t0, t1, sg * inner, sg, side, e0, e1);
    }
  }
  if (pe < 1) {
    const L = [];
    for (let i = 0; i <= 20; i++) L.push(...P(0.03 + i / 20 * 0.95, 0, 1));
    ribs.push({pts: L, alpha: 1 - pe, layer: b.layer});
  }
}

/* ---------- renderers: WebGL first, 2D canvas if WebGL is not there ---------- */
function glRenderer(cv) {
  const gl = cv.getContext('webgl', {antialias: true, alpha: true, premultipliedAlpha: true}) || cv.getContext('experimental-webgl');
  if (!gl) return null;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p;attribute vec4 c;uniform vec2 r;varying vec4 v;void main(){v=c;gl_Position=vec4(p/r*2.0-1.0,0,1);gl_Position.y*=-1.0;}'));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, 'precision mediump float;varying vec4 v;void main(){gl_FragColor=vec4(v.rgb*v.a,v.a);}'));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  const lp = gl.getAttribLocation(pr, 'p'), lc = gl.getAttribLocation(pr, 'c'), ur = gl.getUniformLocation(pr, 'r');
  gl.enableVertexAttribArray(lp); gl.enableVertexAttribArray(lc);
  gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 24, 0); gl.vertexAttribPointer(lc, 4, gl.FLOAT, false, 24, 8);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  let data = new Float32Array(1 << 16);
  const push = (n, arr) => { if (n + arr.length > data.length) { const d = new Float32Array(data.length * 2); d.set(data); data = d; } data.set(arr, n); return n + arr.length; };
  return {
    kind: 'webgl',
    draw(w, h, dpr, strips, ribs) {
      gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(ur, w, h);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      const byLayer = [0, 1, 2];
      for (const L of byLayer) {
        let n = 0;
        for (const s of strips) {
          if (s.layer !== L) continue;
          const c = [s.c[0] / 255, s.c[1] / 255, s.c[2] / 255, 1];
          const A = s.a, B = s.b;
          for (let i = 0; i + 3 < A.length; i += 2) {
            n = push(n, [A[i], A[i + 1], ...c, B[i], B[i + 1], ...c, A[i + 2], A[i + 3], ...c,
                         B[i], B[i + 1], ...c, B[i + 2], B[i + 3], ...c, A[i + 2], A[i + 3], ...c]);
          }
        }
        if (n) { gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, n), gl.DYNAMIC_DRAW); gl.drawArrays(gl.TRIANGLES, 0, n / 6); }
        n = 0;
        for (const rb of ribs) {
          if (rb.layer !== L) continue;
          const c = [COL.ink[0] / 255, COL.ink[1] / 255, COL.ink[2] / 255, rb.alpha];
          for (let i = 0; i + 3 < rb.pts.length; i += 2) n = push(n, [rb.pts[i], rb.pts[i + 1], ...c, rb.pts[i + 2], rb.pts[i + 3], ...c]);
        }
        if (n) { gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, n), gl.DYNAMIC_DRAW); gl.lineWidth(1); gl.drawArrays(gl.LINES, 0, n / 6); }
      }
    }
  };
}
function ctxRenderer(cv) {
  const x = cv.getContext('2d');
  if (!x) return null;
  return {
    kind: '2d',
    draw(w, h, dpr, strips, ribs) {
      x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, w, h);
      for (const L of [0, 1, 2]) {
        for (const s of strips) {
          if (s.layer !== L) continue;
          x.fillStyle = `rgb(${s.c[0] | 0},${s.c[1] | 0},${s.c[2] | 0})`;
          x.beginPath(); x.moveTo(s.a[0], s.a[1]);
          for (let i = 2; i < s.a.length; i += 2) x.lineTo(s.a[i], s.a[i + 1]);
          for (let i = s.b.length - 2; i >= 0; i -= 2) x.lineTo(s.b[i], s.b[i + 1]);
          x.closePath(); x.fill();
        }
        x.lineWidth = 1;
        for (const rb of ribs) {
          if (rb.layer !== L) continue;
          x.strokeStyle = `rgba(6,5,4,${rb.alpha})`;
          x.beginPath(); x.moveTo(rb.pts[0], rb.pts[1]);
          for (let i = 2; i < rb.pts.length; i += 2) x.lineTo(rb.pts[i], rb.pts[i + 1]);
          x.stroke();
        }
      }
    }
  };
}

const canBack = document.querySelector('canvas.back');
if (reduce) return;
const rBack = glRenderer(canBack) || ctxRenderer(canBack);
if (!rBack) return;
R.classList.add('gl'); R.dataset.canopy = rBack.kind;

const canopy = document.querySelector('.canopy');
const clearBox = document.querySelector('.clear');
const ptr = {x: -1e4, y: -1e4, k: 0, target: 0, R: 260, push: 120};
let W = 0, H = 0, dpr = 1, blades = [], spine = {x: 0, w: 0}, mobile = false, keep = [];

function measure() {
  W = innerWidth; H = document.querySelector('.stage').clientHeight; mobile = W <= 760;
  dpr = Math.min(1.5, devicePixelRatio || 1);
  for (const c of [canBack]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
  ptr.R = mobile ? 150 : 260; ptr.push = mobile ? 70 : 120;
  const kids = [...clearBox.children].map((e) => e.getBoundingClientRect());
  const top0 = canopy.getBoundingClientRect().top;
  const x0 = Math.min(...kids.map((k) => k.left)), x1 = Math.max(...kids.map((k) => k.right));
  const y0 = Math.min(...kids.map((k) => k.top)) - top0, y1 = Math.max(...kids.map((k) => k.bottom)) - top0;
  /* the headline's line boxes, padded: the pointer may never push a leaf onto them */
  const rg = document.createRange(); rg.selectNodeContents(document.querySelector('.clear .hl'));
  keep = [...rg.getClientRects()].map((b) => ({l: b.left - 12, r: b.right + 12, t: b.top - top0 - 8, b: b.bottom - top0 + 8}));
  blades = layout(W, H, {x0, x1, y0, y1}, mobile);
  const sp = document.querySelector('.rooms .spine');
  if (sp) { const b = sp.getBoundingClientRect(); spine = {x: b.left, w: b.width}; }
  else spine = mobile ? {x: 0, w: 44} : {x: W * 0.1, w: W * 0.14};
}

let running = true, last = 0;
function frame(now) {
  const walk = canopy.offsetHeight - H;
  const y = scrollY;
  const p = walk > 0 ? clamp(y / walk, 0, 1) : 0;
  ptr.k += (ptr.target - ptr.k) * 0.08;
  const back = [], rb = [];
  for (const b of blades) {
    bladeGeom(b, now, ptr, p, spine, H, back, rb);
  }
  rBack.draw(W, H, dpr, back, rb);
  if (y < canopy.offsetHeight) requestAnimationFrame(frame); else running = false;
}
const wake = () => { if (!running && scrollY < canopy.offsetHeight) { running = true; requestAnimationFrame(frame); } };
addEventListener('scroll', wake, {passive: true});
addEventListener('resize', () => { measure(); wake(); });
const move = (e) => { ptr.x = e.clientX; ptr.y = e.clientY + (scrollY - canopy.offsetTop) * 0; ptr.target = 1; };
addEventListener('pointermove', move, {passive: true});
addEventListener('pointerdown', move, {passive: true});
document.addEventListener('pointerleave', () => { ptr.target = 0; });
addEventListener('pointerup', (e) => { if (e.pointerType === 'touch') ptr.target = 0; });

(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { measure(); requestAnimationFrame(frame); });
})();
