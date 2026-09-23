(() => {
const R = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- the drawer (enhancement over real links) ---------- */
const drawer = document.getElementById('drawer'), dock = document.getElementById('dock');
let lastFocus = null;
const focusables = () => [...drawer.querySelectorAll('a,button')];
function openDrawer(from){
  lastFocus = from || document.activeElement;
  drawer.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => drawer.classList.add('open')));
  setTimeout(() => focusables()[0].focus(), reduce ? 0 : 60);
}
function closeDrawer(){
  drawer.classList.remove('open');
  setTimeout(() => { drawer.hidden = true; }, reduce ? 0 : 300);
  if (lastFocus) lastFocus.focus();
}
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-drawer], .dock summary');
  if (t) { e.preventDefault(); openDrawer(t); return; }
  if (e.target.closest('.drawer .x')) { closeDrawer(); return; }
  if (!drawer.hidden && !e.target.closest('.drawer')) closeDrawer();
});
document.addEventListener('keydown', (e) => {
  if (drawer.hidden) return;
  if (e.key === 'Escape') { closeDrawer(); return; }
  if (e.key === 'Tab') {
    const f = focusables(), i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  }
});

/* ---------- the Rosa forecast (playbook §4 exception) — 4g: live, not the fixture ----------
   One request to Rosa's per-spot JSON, made only when the block nears the viewport. With fresh data
   (under 24 h) the site draws the headline in the mockup's form, and only then is Rosa's widget
   iframe given its src, so a failed network never leaves an empty widget box. On failure, stale
   data, a 10 s timeout or no JS: the plain link in the widget's reserved box, and the headline's
   box stays reserved (hidden), so nothing shifts. Same mechanics as the KA build. */
const fc = document.querySelector('.fc');
if (fc) {
  const now = fc.querySelector('.fc-now'), rosa = fc.querySelector('.fc-rosa'), rosaFrame = rosa.querySelector('iframe');
  const set = (k, v) => { const e = now.querySelector(`[data-f="${k}"]`); if (e) { e.textContent = v; e.hidden = !v; } };
  const fail = () => { delete now.dataset.loading; fc.classList.add('off'); };
  const WORDS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
  const from = (deg) => WORDS[Math.round((((+deg % 360) + 360) % 360) / 45) % 8];
  const parts = (iso, tz, o) => {
    const d = new Date(iso);
    if (isNaN(d)) throw new Error('bad time');
    return Object.fromEntries(new Intl.DateTimeFormat('en-GB', {timeZone: tz, hourCycle: 'h23', ...o}).formatToParts(d).map((x) => [x.type, x.value]));
  };
  const f1 = (x) => (+x).toFixed(1);
  const n1 = (x) => String(+(+x).toFixed(1));
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
  const draw = (d) => {
    const c = d.current, tz = (d.spot && d.spot.timezone) || 'Asia/Colombo';
    if (!c || !Array.isArray(c.h) || !isFinite(c.h[0]) || !isFinite(c.h[1])) throw new Error('no current');
    const nh = now.querySelector('.nh');
    if (!nh.firstChild || nh.firstChild.nodeType !== 3) nh.insertBefore(document.createTextNode(''), nh.firstChild);
    nh.firstChild.textContent = `${f1(c.h[0])}–${f1(c.h[1])}`;
    const t = parts(c.t, tz, {weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'});
    set('t', `${t.weekday} ${t.day} ${t.month}, ${t.hour}:${t.minute}`);
    const sw = (c.swells || []).find((x) => x.in_window);
    set('swell', sw && isFinite(sw.period) ? `Swell ${f1(sw.period)} s from the ${from(sw.dir)}` : '');
    const w = c.wind;
    set('wind', w && isFinite(w.kph) ? `Wind ${n1(w.kph)} km/h from the ${from(w.dir)}${w.class ? ', ' + w.class : ''}` : '');
    const u = parts(d.generated_at, tz, {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'});
    set('upd', `Rosa, updated ${u.day} ${u.month} ${u.year}, ${u.hour}:${u.minute}`);
    fc.classList.add('live');
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    let lastW = now.clientWidth;
    if ('ResizeObserver' in window) new ResizeObserver(() => { if (now.clientWidth !== lastW) { lastW = now.clientWidth; fit(); } }).observe(now);
  };
  /* a cross-origin iframe fires `load` even when its request was blocked or failed (it loads the
     browser's error page), so `load` alone showed an empty box with the link hidden. The widget is
     shown only when a HEAD request to the same URL has answered OK (rosa.surf/widget/ answers HEAD 200
     with access-control-allow-origin *, checked 2026-09-23) AND the frame has loaded, within 10 s.
     Otherwise the frame loses its src and the plain link, visible all along in the same reserved box,
     stays. The headline keeps its fresh data: that request succeeded. Same as The Lavish Haven build. */
  const widget = () => {
    const src = rosaFrame.dataset.src;
    let done = false;
    rosa.dataset.loading = 'true';
    const end = (show) => {
      if (done) return;
      done = true;
      clearTimeout(to);
      delete rosa.dataset.loading;
      if (show) rosa.classList.add('on');
      else { rosa.classList.remove('on'); rosaFrame.removeAttribute('src'); }
    };
    const to = setTimeout(() => end(false), 10000);
    fetch(src, {method: 'HEAD', credentials: 'omit'})
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        rosaFrame.addEventListener('load', () => end(true), {once: true});
        rosaFrame.src = src;
      })
      .catch(() => end(false));
  };
  /* rosa.surf sends frame-ancestors *, which does not match a file:// page: there, the link */
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

/* ---------- the docked berth's ladder grows one rung while "Finding the door" is on screen ---------- */
const ladder = document.getElementById('ladder'), door = document.getElementById('door');
if ('IntersectionObserver' in window) {
  const rung = document.createElement('b'); rung.style.top = '4%'; rung.className = 'extra';
  new IntersectionObserver((es) => { for (const e of es) {
    if (e.isIntersecting) { ladder.style.top = '-34%'; ladder.appendChild(rung); }
    else { ladder.style.top = ''; rung.remove(); }
  } }, {threshold: .25}).observe(door);
}

if (reduce) return;   /* reduced motion: the static CSS box, the berth docked from the start */

/* ---------- the box: a dozen flat quads, a camera on a scroll path ---------- */
let cv = document.getElementById('box');
let gl = null, g2 = null;
try { gl = cv.getContext('webgl', {alpha: true, antialias: true, premultipliedAlpha: true}); } catch (e) {}
if (!gl) g2 = cv.getContext('2d');
if (!gl && !g2) return;
R.classList.add('fly');

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const COL = { y: hex('#E2B827'), lit: hex('#EED38F'), sh: hex('#CF9B0D'), ink: hex('#0B0F10') };

let prog = null, posLoc, colLoc, resLoc, buf;
function initGL(){
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p;uniform vec2 r;void main(){vec2 c=p/r*2.0-1.0;gl_Position=vec4(c.x,-c.y,0.0,1.0);}'));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, 'precision mediump float;uniform vec3 c;void main(){gl_FragColor=vec4(c,1.0);}'));
  gl.linkProgram(prog); gl.useProgram(prog);
  posLoc = gl.getAttribLocation(prog, 'p'); colLoc = gl.getUniformLocation(prog, 'c'); resLoc = gl.getUniformLocation(prog, 'r');
  buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
}
if (gl) {
  initGL();
  /* 4g: a lost WebGL context (a GPU reset, a backgrounded tab; in headless Chromium it happened on
     most loads of this build) used to leave the canvas blank. Now: wait for the browser to restore
     it, and if it has not within a second, draw the same box on a fresh 2D canvas. */
  let lostT = 0;
  const onLost = (e) => {
    e.preventDefault();
    lostT = setTimeout(() => {
      const fresh = cv.cloneNode(false); cv.replaceWith(fresh); cv = fresh;
      gl = null; g2 = cv.getContext('2d');
      if (!g2) { R.classList.remove('fly'); return; }
      measure(); kick();
    }, 1000);
  };
  cv.addEventListener('webglcontextlost', onLost);
  cv.addEventListener('webglcontextrestored', () => { clearTimeout(lostT); if (gl) { initGL(); measure(); kick(); } });
}

const stage = document.getElementById('stage'), wall = document.getElementById('wall'), niche = document.getElementById('niche');
const CLIMB = 0.8;
const EXT = 48, W = 1.6, CZ0 = 1, D0 = 1.5;
let B = null;      /* base geometry, measured from the static layout */
let dpr = 1, VW = 0, VH = 0;

function measure(){
  R.classList.remove('docked');
  wall.style.transform = ''; wall.style.opacity = '';
  dpr = Math.min(devicePixelRatio || 1, 1.5);
  VW = innerWidth; VH = innerHeight;
  cv.width = Math.round(VW * dpr); cv.height = Math.round(VH * dpr);
  const s = stage.getBoundingClientRect();
  const a = parseFloat(getComputedStyle(stage).getPropertyValue('--a')) || .2;
  const w = s.width, h = s.height;
  const wl = a * w, wt = a * h;
  const kb = (w + EXT - wl) / W;                 /* px per world unit on the back wall */
  const Hb = (h + EXT - wt) / kb;
  const cx = (.5 - a) * w / kb, cy = Hb - (.5 - a) * h / kb;
  const f = kb * (CZ0 + D0);
  const n = niche.getBoundingClientRect(), wr = wall.getBoundingClientRect();
  const toW = (sx, sy) => [cx + (sx - (s.left + w / 2)) / kb, cy - (sy - (s.top + h / 2)) / kb];
  const [nx0, ny1] = toW(n.left, n.top), [nx1, ny0] = toW(n.right, n.bottom);
  const mobile = w < 768;
  B = { w, h, a, f, Hb, cx, cy, kb, mobile,
    niche: [nx0 / W, nx1 / W, ny0 / Hb, ny1 / Hb],
    wall0: { l: wr.left - s.left, t: wr.top - s.top },
    back0: { l: wl, t: wt, w: w + EXT - wl } };
  const d = dock.getBoundingClientRect();
  B.dock = { l: d.left, t: d.top, w: d.width, h: d.height };
  wall.style.transformOrigin = (B.back0.l - B.wall0.l) + 'px ' + (B.back0.t - B.wall0.t) + 'px';
}

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (a, b, t) => a + (b - a) * t;

let tilt = [0, 0], tiltT = [0, 0];
if (matchMedia('(pointer: fine)').matches) {
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    tiltT = [(e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1];
    kick();
  });
  stage.addEventListener('pointerleave', () => { tiltT = [0, 0]; kick(); });
}

function frame(){
  const s = stage.getBoundingClientRect();
  /* 4g pick note 2: the whole climb-out runs over 0.8 of a screen (mockup: 1.2), and the pinned
     run after the first screen is 30svh (mockup: 90/80svh), so the page arrives as the box docks */
  const p = clamp(scrollY / (VH * CLIMB));
  tilt[0] += (tiltT[0] - tilt[0]) * .08; tilt[1] += (tiltT[1] - tilt[1]) * .08;
  const pa = ease(clamp(p / .5)), pb = ease(clamp((p - .38) / .32)), pc = ease(clamp((p - .68) / .32));

  /* camera: from lying inside, pull back out through the open side, centred */
  const w = B.w, h = B.h;
  const Hb = lerp(B.Hb, 1.0, pb);
  const D = lerp(D0, 0.0001, pb);
  const tw = B.mobile ? .66 * w : .42 * w;
  const cz1 = B.f * W / tw;
  const cz = 1 / lerp(1 / CZ0, 1 / cz1, pa);
  const cx = lerp(B.cx, W / 2, pa);
  const cy = lerp(B.cy, B.Hb / 2, pa) + (Hb - B.Hb) / 2 * pa;
  /* 4g: once the shorter pinned run ends, the box keeps the pinned stage's centre instead of riding up
     with it, so it flattens and docks where the mockup's did while the page arrives beneath */
  const ppx = s.left + w / 2, ppy = Math.max(s.top, 0) + h / 2;
  /* lean: orbit about the back wall, at most 3 degrees, only while inside */
  const lean = 1 - pa, th = tilt[0] * .0524 * lean, ph = tilt[1] * .0524 * lean;
  const Zb = cz + D;
  const ex = cx + Math.tan(th) * Zb * .9, ey = cy - Math.tan(ph) * Zb * .9;
  const cth = Math.cos(th), sth = Math.sin(th), cph = Math.cos(ph), sph = Math.sin(ph);
  const P = (x, y, z) => {
    let X = x - ex, Y = y - ey, Z = cz - z;
    const X1 = X * cth + Z * sth, Z1 = -X * sth + Z * cth;
    const Y2 = Y * cph - Z1 * sph, Z2 = Y * sph + Z1 * cph;
    return [ppx + B.f * X1 / Z2, ppy - B.f * Y2 / Z2];
  };

  const polys = [], PENDING = [];
  const quad = (a, b, c, d, col) => polys.push([[a, b, c, d], col]);
  const [fx0, fx1, fy0, fy1] = B.niche;
  const nx0 = fx0 * W, nx1 = fx1 * W, nmid = (fy0 + fy1) / 2 * Hb, nh = (fy1 - fy0) * B.Hb / 2, ny0 = nmid - nh, ny1 = nmid + nh, dn = D * .22, zb = -D, zn = -D - dn;
  /* the niche, deepest first */
  quad(P(nx0, ny0, zn), P(nx1, ny0, zn), P(nx1, ny1, zn), P(nx0, ny1, zn), COL.sh);
  if (ey < ny1) quad(P(nx0, ny1, zn), P(nx1, ny1, zn), P(nx1, ny1, zb), P(nx0, ny1, zb), COL.sh);
  if (ey > ny0) quad(P(nx0, ny0, zn), P(nx1, ny0, zn), P(nx1, ny0, zb), P(nx0, ny0, zb), COL.lit);
  if (ex > nx0) quad(P(nx0, ny0, zn), P(nx0, ny1, zn), P(nx0, ny1, zb), P(nx0, ny0, zb), COL.lit);
  if (ex < nx1) quad(P(nx1, ny0, zn), P(nx1, ny1, zn), P(nx1, ny1, zb), P(nx1, ny0, zb), COL.lit);
  /* the back wall, around the niche */
  quad(P(0, 0, zb), P(nx0, 0, zb), P(nx0, Hb, zb), P(0, Hb, zb), COL.y);
  quad(P(nx1, 0, zb), P(W, 0, zb), P(W, Hb, zb), P(nx1, Hb, zb), COL.y);
  quad(P(nx0, ny1, zb), P(nx1, ny1, zb), P(nx1, Hb, zb), P(nx0, Hb, zb), COL.y);
  quad(P(nx0, 0, zb), P(nx1, 0, zb), P(nx1, ny0, zb), P(nx0, ny0, zb), COL.y);
  /* walls: left in shade, ceiling lit, right lit, floor in shade */
  quad(P(0, 0, 0), P(0, 0, zb), P(0, Hb, zb), P(0, Hb, 0), COL.sh);
  quad(P(W, 0, 0), P(W, 0, zb), P(W, Hb, zb), P(W, Hb, 0), COL.lit);
  quad(P(0, Hb, 0), P(0, Hb, zb), P(W, Hb, zb), P(W, Hb, 0), COL.lit);
  quad(P(0, 0, 0), P(0, 0, zb), P(W, 0, zb), P(W, 0, 0), COL.sh);
  /* hairlines: the four inner corners of the box, 1px ink */
  const seam = (A, Bp) => line(A, Bp, 1);
  PENDING.push(() => { seam(P(0, 0, zb), P(0, Hb, zb)); seam(P(0, Hb, zb), P(W, Hb, zb)); seam(P(W, Hb, zb), P(W, 0, zb)); seam(P(W, 0, zb), P(0, 0, zb));
    seam(P(0, Hb, zb), P(0, Hb, 0)); seam(P(W, Hb, zb), P(W, Hb, 0)); seam(P(0, 0, zb), P(0, 0, 0)); seam(P(W, 0, zb), P(W, 0, 0)); });
  /* the lamp: a black arm on the left wall */
  const line = (a, b, wpx) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * wpx / 2, ny = dx / L * wpx / 2;
    polys.push([[[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]], COL.ink]);
  };
  if (pb < .98) PENDING.forEach((fn) => fn());
  if (pb < .98) {
    const ly = Hb * .72 - (Hb - B.Hb) * 0, lz = zb * .78;
    const base = P(0, B.Hb * .7 * Hb / B.Hb, zb * .7), tip = P(.07, B.Hb * .66 * Hb / B.Hb, zb * .7);
    const head = P(.12, B.Hb * .61 * Hb / B.Hb, zb * .7);
    const pl = (y0, y1, z0, z1) => quad(P(0, y0, z0), P(0, y1, z0), P(0, y1, z1), P(0, y0, z1), COL.ink);
    const yb = B.Hb * .7 * Hb / B.Hb;
    pl(yb - .025, yb + .025, zb * .7 - .02, zb * .7 + .02);
    line(base, tip, 2); line(tip, head, 11);
  }

  /* after the box is flat: it docks. 2D map from the flat rectangle to the corner berth */
  let T = null;
  const tl = P(0, Hb, zb), br = P(W, 0, zb);
  const flat = { l: tl[0], t: tl[1], w: br[0] - tl[0], h: br[1] - tl[1] };
  if (pc > 0) {
    const d = B.dock;
    const to = { l: lerp(flat.l, d.l, pc), t: lerp(flat.t, d.t, pc), w: lerp(flat.w, d.w, pc), h: lerp(flat.h, d.h, pc) };
    T = (pt) => [to.l + (pt[0] - flat.l) / flat.w * to.w, to.t + (pt[1] - flat.t) / flat.h * to.h];
    for (const q of polys) q[0] = q[0].map(T);
  }
  /* the ladder climbs up the flat berth's right edge */
  if (pb > .5) {
    const r = T ? { l: T([flat.l, flat.t])[0], t: T([flat.l, flat.t])[1], w: T([flat.l + flat.w, 0])[0] - T([flat.l, 0])[0], h: T([0, flat.t + flat.h])[1] - T([0, flat.t])[1] } : flat;
    const k = clamp((pb - .5) / .5), lw = B.mobile ? 24 : 30, x0 = r.l + r.w, top = r.t + r.h * (1 - k);
    if (!B.mobile || pc < .5) {
      line([x0 + 1, r.t + r.h], [x0 + 1, top], 2);
      line([x0 + lw - 1, r.t + r.h], [x0 + lw - 1, top], 2);
      for (const f of [.22, .5, .78]) { const y = r.t + r.h * f; if (y >= top) line([x0, y], [x0 + lw, y], 2); }
    }
  }

  draw(polys, pa < .999 ? Math.max(0, s.top) : 0);

  /* the words on the back wall ride with it, then give way to the docked berth */
  const s0 = B.back0, scale = (flat.w * (T ? (T([flat.l + flat.w, 0])[0] - T([flat.l, 0])[0]) / flat.w : 1)) / s0.w;
  const L = T ? T([flat.l, flat.t]) : [flat.l, flat.t];
  /* 4g: once the words are hidden (p > .42) the wall drops its transform, so it cannot push the
     page's scroll height down while the stage scrolls away */
  wall.style.transform = p > .42 ? '' : `translate(${L[0] - s.left - s0.l}px,${L[1] - s.top - s0.t}px) scale(${scale})`;
  wall.style.opacity = String(1 - clamp((p - .26) / .16));
  wall.style.visibility = p > .42 ? 'hidden' : '';
  R.classList.toggle('docked', p >= 1);
  return Math.abs(tiltT[0] - tilt[0]) + Math.abs(tiltT[1] - tilt[1]) > .002;
}

function draw(polys, clipTop){
  if (gl && gl.isContextLost()) return;
  if (gl) {
    gl.viewport(0, 0, cv.width, cv.height);
    gl.disable(gl.SCISSOR_TEST);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(0, 0, cv.width, Math.max(0, Math.round((VH - clipTop) * dpr)));
    gl.uniform2f(resLoc, VW, VH);
    for (const [pts, c] of polys) {
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([pts[0], pts[1], pts[2], pts[0], pts[2], pts[3]].flat()), gl.STREAM_DRAW);
      gl.uniform3f(colLoc, c[0], c[1], c[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  } else {
    g2.setTransform(dpr, 0, 0, dpr, 0, 0);
    g2.clearRect(0, 0, VW, VH);
    g2.save(); g2.beginPath(); g2.rect(0, clipTop, VW, VH - clipTop); g2.clip();
    for (const [pts, c] of polys) {
      g2.fillStyle = `rgb(${c.map((v) => Math.round(v * 255)).join(',')})`;
      g2.beginPath(); g2.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) g2.lineTo(pts[i][0], pts[i][1]);
      g2.closePath(); g2.fill();
    }
    g2.restore();
  }
}

let raf = 0;
function loop(){ raf = 0; if (frame()) kick(); }
function kick(){ if (!raf) raf = requestAnimationFrame(loop); }
addEventListener('scroll', kick, {passive: true});
addEventListener('resize', () => { measure(); kick(); });
measure(); kick();
})();
