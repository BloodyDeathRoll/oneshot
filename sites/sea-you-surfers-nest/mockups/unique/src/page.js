/* Sea You Surfers Nest, unique mockup: "Every side of the four-poster". Plain JS, no library.
   1. header + phone bar  2. the booking door  3. room slideshows  4. the quote stack
   5. the piece: the hero photograph pulls back into a mint four-poster drawn in WebGL, which turns a full
      circle while the house's own photographs show it from each side (scroll pattern 2, pinned rotation).
   Every link is a real <a>; with JS off the page is the still layout (html.piece is never set). */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const phoneMQ = matchMedia('(max-width: 899px)');
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

/* ------------------------------------------------------------ 1. header + phone bar */
const top = $('#top');
const onScrollTop = () => top.classList.toggle('solid', scrollY > 40);
addEventListener('scroll', onScrollTop, { passive: true }); onScrollTop();
const bar = $('#bar'), heroBtn = $('.btn-hero');
if (bar && heroBtn && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => bar.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0))
    .observe(heroBtn);
}

/* ------------------------------------------------------------ 2. the door: a side sheet hinged on its right edge */
const door = $('#door'), panel = door && $('.door-panel', door);
let lastTrigger = null, closeTimer = 0;
const focusables = () => $$('a[href],button:not([disabled])', panel);
function openDoor(trigger) {
  clearTimeout(closeTimer);
  lastTrigger = trigger || document.activeElement;
  door.hidden = false; door.classList.remove('closing');
  void panel.offsetWidth;                               // start from the closed angle
  door.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => (focusables().find((el) => el.classList.contains('tile')) || panel).focus(), reduce.matches ? 0 : 80);
}
function closeDoor() {
  if (door.hidden) return;
  door.classList.add('closing'); door.classList.remove('open');
  document.body.style.overflow = '';
  closeTimer = setTimeout(() => { door.hidden = true; door.classList.remove('closing'); }, reduce.matches ? 0 : 320);
  if (lastTrigger && lastTrigger.focus) lastTrigger.focus({ preventScroll: true });
}
if (door) {
  $$('[data-door]').forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); openDoor(a); }));
  $$('[data-door-close]', door).forEach((b) => b.addEventListener('click', closeDoor));
  door.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') { ev.preventDefault(); closeDoor(); return; }
    if (ev.key !== 'Tab') return;
    const f = focusables(); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  });
}

/* ------------------------------------------------------------ 3. slideshows with dots */
$$('[data-show]').forEach((show) => {
  const track = $('.track', show), dots = $$('.dot', show), n = dots.length;
  let cur = 0, raf = 0;
  const mark = (i) => { cur = i; dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false')); };
  const go = (i) => { i = (i + n) % n; track.scrollTo({ left: i * track.clientWidth, behavior: reduce.matches ? 'auto' : 'smooth' }); mark(i); };
  dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
  $('.prev', show).addEventListener('click', () => go(cur - 1));
  $('.next', show).addEventListener('click', () => go(cur + 1));
  track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => mark(Math.round(track.scrollLeft / track.clientWidth))); }, { passive: true });
  track.addEventListener('keydown', (ev) => { if (ev.key === 'ArrowRight') { ev.preventDefault(); go(cur + 1); } if (ev.key === 'ArrowLeft') { ev.preventDefault(); go(cur - 1); } });
  mark(0);
});

/* ------------------------------------------------------------ 4. the quote stack: the front card turns away to the back */
const stack = $('.qstack');
if (stack) {
  const cards = $$('.qcard', stack), dots = $$('.dot', stack), n = cards.length;
  let front = 0, busy = false;
  cards.forEach((c, i) => c.style.setProperty('--tilt', i % 2 ? -1 : 1));
  const lay = () => cards.forEach((c, i) => {
    const d = (i - front + n) % n; c.dataset.d = d; c.style.setProperty('--d', Math.min(d, 3));
    c.setAttribute('aria-hidden', d ? 'true' : 'false');
    dots[i].setAttribute('aria-current', d ? 'false' : 'true');
  });
  const next = () => {
    if (busy) return; busy = true;
    const c = cards[front];
    if (reduce.matches) { front = (front + 1) % n; lay(); busy = false; return; }
    c.classList.add('out');
    setTimeout(() => { front = (front + 1) % n; lay(); c.classList.remove('out'); busy = false; }, 340);
  };
  const to = (i) => { if (i === front) return; front = i; lay(); };
  const prev = () => to((front - 1 + n) % n);
  $('.qnext', stack).addEventListener('click', next);
  $('.qprev', stack).addEventListener('click', prev);
  dots.forEach((d, i) => d.addEventListener('click', () => to(i)));
  stack.addEventListener('keydown', (ev) => { if (ev.key === 'ArrowRight') { ev.preventDefault(); next(); } if (ev.key === 'ArrowLeft') { ev.preventDefault(); prev(); } });
  let x0 = null;
  stack.addEventListener('pointerdown', (ev) => { if (ev.target.closest('.qcard')) x0 = ev.clientX; });
  stack.addEventListener('pointerup', (ev) => {
    if (x0 === null) return; const dx = ev.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)(); else if (ev.target.closest('.qcard[data-d="0"]') && !getSelection().toString()) next();
  });
  lay();
}

/* ------------------------------------------------------------ 5. the piece */
if (!root.classList.contains('piece')) return;
const piece = $('#piece'), stage = $('.stage', piece);
const ph0 = $('.ph0', stage), ph0img = $('img', ph0);
const sides = $$('.side', stage);
const caps = $('.caps', stage), capEls = $$('.cap', caps), capDots = $$('.cap-dots i', caps);
const loadingEl = $('.loading', stage);
const heroIn = $('.hero-in', piece), hint = $('.hint', piece), glance = $('#glance');
const cvB = $('.gl-back', stage), cvF = $('.gl-front', stage);
if (phoneMQ.matches && ph0img.dataset.altPhone) ph0img.alt = ph0img.dataset.altPhone;

// ---- the bed, in metres, proportioned by eye from img-015 (gabled canopy) and img-002 / img-053 (panels)
const PX = 0.77, PZ = 1.02, PT = 0.075, PH = 2.1, G = 0.34;
const RAF = Math.atan2(G, PX), RL = Math.hypot(PX, G);
const PANEL = (z, y0, y1, dz) => [                       // a framed board: rails and stiles proud of a recessed panel
  { c: [0, (y0 + y1) / 2, z], s: [2 * PX - PT, y1 - y0, 0.026] },
  { c: [0, y1, z], s: [2 * PX + 0.03, 0.075, 0.07] }, { c: [0, y0, z], s: [2 * PX - PT, 0.06, 0.05] },
  ...[-0.42, 0, 0.42].map((x) => ({ c: [x, (y0 + y1) / 2, z + dz * 0.012], s: [0.05, y1 - y0 - 0.04, 0.03] })),
];
const BOXES = [
  ...[-1, 1].flatMap((sx) => [-1, 1].map((sz) => ({ c: [sx * PX, PH / 2, sz * PZ], s: [PT, PH, PT] }))),        // posts
  ...[-1, 1].map((sz) => ({ c: [0, PH - 0.035, sz * PZ], s: [2 * PX - PT + 0.002, 0.06, 0.058] })),           // top rails across
  ...[-1, 1].map((sx) => ({ c: [sx * PX, PH - 0.035, 0], s: [0.058, 0.06, 2 * PZ - PT + 0.002] })),           // top rails along
  ...[-1, 1].flatMap((sz) => [-1, 1].map((sx) => ({ c: [sx * PX / 2, PH + G / 2 - 0.02, sz * PZ], s: [RL + 0.05, 0.052, 0.052], rz: -sx * RAF }))), // gable rafters
  { c: [0, PH + G - 0.02, 0], s: [0.056, 0.056, 2 * PZ + 0.05] },                                              // ridge
  ...PANEL(-PZ, 0.32, 0.95, 1),                                                                                // headboard
  ...PANEL(PZ, 0.17, 0.6, -1),                                                                                 // footboard
  ...[-1, 1].map((sx) => ({ c: [sx * PX, 0.3, 0], s: [0.03, 0.26, 2 * PZ - PT - 0.004] })),                   // side boards
  ...[-1, 1].map((sx) => ({ c: [sx * PX, 0.445, 0], s: [0.055, 0.04, 2 * PZ - PT - 0.004] })),
];
// The photograph is seated in the opening of the face turned to the camera at each rest: post to post, from the
// footboard / side board / headboard rail up to the canopy rail. Its edges tuck under the drawn posts and rails.
const TOPY = PH - 0.04, TUCK = 0.012;
const FACE = [
  [[-(PX - TUCK), 0.6, PZ], [PX - TUCK, 0.6, PZ], [PX - TUCK, TOPY, PZ], [-(PX - TUCK), TOPY, PZ]],          // 0: the foot
  [[-PX, 0.445, -(PZ - TUCK)], [-PX, 0.445, PZ - TUCK], [-PX, TOPY, PZ - TUCK], [-PX, TOPY, -(PZ - TUCK)]],  // 90: a long side
  [[-(PX - TUCK), 0.95, -PZ], [PX - TUCK, 0.95, -PZ], [PX - TUCK, TOPY, -PZ], [-(PX - TUCK), TOPY, -PZ]],   // 180: the head
  [[PX, 0.445, -(PZ - TUCK)], [PX, 0.445, PZ - TUCK], [PX, TOPY, PZ - TUCK], [PX, TOPY, -(PZ - TUCK)]],      // 270: the other side
];
const FOV = 28 * Math.PI / 180, F = 1 / Math.tan(FOV / 2), TGT = [0, 1.2, 0], ELEV = 0.13, YAW0 = -0.1;

// ---- geometry: one merged buffer of boxes (36 vertices each), positions + normals
function boxGeo() {
  const P = [], N = [], Q = [];
  const faces = [[[1,0,0],[0,1,0],[0,0,1]],[[-1,0,0],[0,1,0],[0,0,-1]],[[0,1,0],[0,0,1],[1,0,0]],
                 [[0,-1,0],[0,0,-1],[1,0,0]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]];
  for (const b of BOXES) {
    const cz = Math.cos(b.rz || 0), sz = Math.sin(b.rz || 0);
    const rot = (v) => [v[0] * cz - v[1] * sz, v[0] * sz + v[1] * cz, v[2]];
    for (const [n, u, v] of faces) {
      const corner = (a, c) => rot([(n[0] + a * u[0] + c * v[0]) * b.s[0] / 2, (n[1] + a * u[1] + c * v[1]) * b.s[1] / 2, (n[2] + a * u[2] + c * v[2]) * b.s[2] / 2]).map((x, i) => x + b.c[i]);
      const q = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, -1), corner(1, 1), corner(-1, 1)];
      // keep counter-clockwise winding outward
      const e1 = q[1].map((x, i) => x - q[0][i]), e2 = q[2].map((x, i) => x - q[0][i]);
      const cr = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
      const rn = rot(n);
      if (cr[0] * rn[0] + cr[1] * rn[1] + cr[2] * rn[2] < 0) q.reverse();
      const hu = Math.abs(u[0] * b.s[0] + u[1] * b.s[1] + u[2] * b.s[2]) / 2, hv = Math.abs(v[0] * b.s[0] + v[1] * b.s[1] + v[2] * b.s[2]) / 2;
      const ac = [[-1, -1], [1, -1], [1, 1], [-1, -1], [1, 1], [-1, 1]];
      if (cr[0] * rn[0] + cr[1] * rn[1] + cr[2] * rn[2] < 0) ac.reverse();
      q.forEach((p, k) => { P.push(...p); N.push(...rn); Q.push(ac[k][0] * hu, ac[k][1] * hv, hu, hv); });
    }
  }
  return { P: new Float32Array(P), N: new Float32Array(N), Q: new Float32Array(Q), count: P.length / 3 };
}

// ---- small matrix kit (column-major)
const perspective = (asp) => { const n = 0.1, f = 60; return [F / asp,0,0,0, 0,F,0,0, 0,0,(f + n) / (n - f),-1, 0,0,2 * f * n / (n - f),0]; };
function lookAt(e, t) {
  let z = [e[0] - t[0], e[1] - t[1], e[2] - t[2]]; const zl = Math.hypot(...z); z = z.map((v) => v / zl);
  let x = [z[2], 0, -z[0]]; const xl = Math.hypot(...x); x = x.map((v) => v / xl);    // up = +y
  const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
  return [x[0],y[0],z[0],0, x[1],y[1],z[1],0, x[2],y[2],z[2],0,
    -(x[0]*e[0]+x[1]*e[1]+x[2]*e[2]), -(y[0]*e[0]+y[1]*e[1]+y[2]*e[2]), -(z[0]*e[0]+z[1]*e[1]+z[2]*e[2]), 1];
}
const xf = (m, p) => [m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12], m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13], m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14]];
const rotY = (a) => { const c = Math.cos(a), s = Math.sin(a); return [c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1]; };
const mat3of = (m) => [m[0],m[1],m[2], m[4],m[5],m[6], m[8],m[9],m[10]];

const VS = `attribute vec3 p;attribute vec3 n;attribute vec4 e;uniform mat4 uM,uV,uP;uniform mat3 uR;uniform vec2 uOff;
varying vec3 vN,vW;varying vec4 vE;varying float vZ;
void main(){vE=e;vec4 w=uM*vec4(p,1.);vW=w.xyz;vN=uR*n;vec4 v=uV*w;vZ=-v.z;gl_Position=uP*v;gl_Position.xy+=uOff*gl_Position.w;}`;
const FS = `precision mediump float;uniform float uSplit,uSide;uniform vec3 uCol,uEye;varying vec3 vN,vW;varying vec4 vE;varying float vZ;
void main(){if(uSide*(vZ-uSplit)>0.)discard;vec3 n=normalize(vN);vec3 L=normalize(vec3(-.5,.85,.62));
float dif=max(dot(n,L),0.);vec3 amb=mix(vec3(.5,.52,.5),vec3(1.),.5+.5*n.y);
float ao=mix(.74,1.,smoothstep(0.,.9,vW.y));vec3 V=normalize(uEye-vW);vec3 H=normalize(L+V);
float ed=min(vE.z-abs(vE.x),vE.w-abs(vE.y));float edge=mix(.86,1.,smoothstep(.0,.014,ed));
vec3 lin=uCol*(amb*.56+vec3(1.,.95,.86)*dif*.62)*ao*edge+pow(max(dot(n,H),0.),24.)*.03;
gl_FragColor=vec4(pow(lin,vec3(1./2.2)),1.);}`;
const SVS = `attribute vec2 p;uniform mat4 uM,uV,uP;uniform vec2 uOff,uHalf;varying vec2 vU;
void main(){vU=p;vec4 v=uV*uM*vec4(p.x*uHalf.x,.002,p.y*uHalf.y,1.);gl_Position=uP*v;gl_Position.xy+=uOff*gl_Position.w;}`;
const SFS = `precision mediump float;varying vec2 vU;uniform vec2 uPost;
void main(){float a=.17*(1.-smoothstep(.1,1.,length(vU)));
vec2 q=abs(vU)-uPost;a+=.32*(1.-smoothstep(0.,.075,length(q)))+.1*(1.-smoothstep(0.,.2,length(q)));
gl_FragColor=vec4(vec3(.075,.17,.16)*a,a);}`;

function makeGL(canvas, withShadow) {
  const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
  if (!gl) return null;
  const prog = (vs, fs) => {
    const p = gl.createProgram();
    for (const [t, s] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
      const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
      gl.attachShader(p, sh);
    }
    gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    const u = {}; const nu = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < nu; i++) { const nm = gl.getActiveUniform(p, i).name; u[nm] = gl.getUniformLocation(p, nm); }
    return { p, u, a: (nm) => gl.getAttribLocation(p, nm) };
  };
  const geo = boxGeo();
  const bed = prog(VS, FS);
  const bp = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bp); gl.bufferData(gl.ARRAY_BUFFER, geo.P, gl.STATIC_DRAW);
  const bn = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bn); gl.bufferData(gl.ARRAY_BUFFER, geo.N, gl.STATIC_DRAW);
  const be = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, be); gl.bufferData(gl.ARRAY_BUFFER, geo.Q, gl.STATIC_DRAW);
  let sh = null, sb = null;
  if (withShadow) {
    sh = prog(SVS, SFS);
    sb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, sb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, 1,1, -1,-1, 1,1, -1,1]), gl.STATIC_DRAW);
  }
  const col = [0x74, 0xC2, 0x9A].map((c) => Math.pow(c / 255, 2.2));
  return {
    gl,
    draw(st) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      if (sh) {
        gl.disable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.useProgram(sh.p);
        gl.uniformMatrix4fv(sh.u.uM, false, st.M); gl.uniformMatrix4fv(sh.u.uV, false, st.V); gl.uniformMatrix4fv(sh.u.uP, false, st.P);
        gl.uniform2fv(sh.u.uOff, st.off); gl.uniform2f(sh.u.uHalf, PX + 0.55, PZ + 0.55); gl.uniform2f(sh.u.uPost, PX / (PX + 0.55), PZ / (PZ + 0.55));
        gl.bindBuffer(gl.ARRAY_BUFFER, sb); const a = sh.a('p'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6); gl.disableVertexAttribArray(a);
      }
      gl.disable(gl.BLEND); gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE);
      gl.useProgram(bed.p);
      gl.uniformMatrix4fv(bed.u.uM, false, st.M); gl.uniformMatrix4fv(bed.u.uV, false, st.V); gl.uniformMatrix4fv(bed.u.uP, false, st.P);
      gl.uniformMatrix3fv(bed.u.uR, false, mat3of(st.M)); gl.uniform2fv(bed.u.uOff, st.off);
      gl.uniform1f(bed.u.uSplit, st.split); gl.uniform1f(bed.u.uSide, withShadow ? -1 : 1);
      gl.uniform3fv(bed.u.uCol, col); gl.uniform3fv(bed.u.uEye, st.eye);
      const ap = bed.a('p'), an = bed.a('n'), ae = bed.a('e');
      gl.bindBuffer(gl.ARRAY_BUFFER, be); gl.enableVertexAttribArray(ae); gl.vertexAttribPointer(ae, 4, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, bp); gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, bn); gl.enableVertexAttribArray(an); gl.vertexAttribPointer(an, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, geo.count);
    },
  };
}

// ---- layout numbers, measured once per resize (never per frame)
let W = 0, H = 0, phone = false, geo = null, D1 = 7, OFF = [0, 0], dpr = 1;
function measure() {
  W = stage.clientWidth; H = stage.clientHeight; phone = phoneMQ.matches;
  const pTop = piece.getBoundingClientRect().top + scrollY;
  const gTop = glance.getBoundingClientRect().top + scrollY - pTop;
  const gBot = glance.getBoundingClientRect().bottom + scrollY - pTop;
  const asp = W / H;
  if (phone) {
    // the glance is an opaque sheet over the stage: the photograph backs into the bed while it is covered,
    // so the stage is revealed already showing the bed (the hero is never shown twice), and the turn starts at once
    D1 = F * (PZ + PT / 2) / (0.98 * asp) + PX;
    OFF = [0, 0.28];
    const p0 = gTop + 0.02 * H, p1 = Math.max(p0 + 1, gBot - 1.02 * H);
    geo = { top: pTop, pull0: p0, pull1: p1, turn0: gBot - 0.45 * H, capsOn: gBot - 0.5 * H, turnLen: 2.2 * H };
  } else {
    D1 = Math.max(F * 1.25 / 0.78 + 0.3, F * Math.hypot(PX, PZ) / (0.6 * asp) + 1.28);
    OFF = [0.27, -0.09];
    geo = { top: pTop, pull0: 0, pull1: 0.7 * H, turn0: gBot - 0.3 * H, capsOn: gBot - 0.3 * H, turnLen: 1.6 * H };
  }
  geo.exit = geo.turn0 + geo.turnLen;
  geo.loadAt = phone ? gTop - 0.5 * H : 0.08 * H;
  for (const cv of [cvB, cvF]) {
    const px = W * H * dpr * dpr, cap = soft ? 1.0e6 : 4.2e6, k = px > cap ? Math.sqrt(cap / px) : 1;
    cv.width = Math.round(W * dpr * k); cv.height = Math.round(H * dpr * k);
  }
  dirty = true;
}

// ---- photo rects: the photograph is a DOM image, moved by transform + clip-path only (no layout, no CLS)
function natural(im) {
  return im.naturalWidth ? [im.naturalWidth, im.naturalHeight] : [+im.getAttribute('width'), +im.getAttribute('height')];
}
function place(el, im, R) {
  const [iw, ih] = natural(im);
  const s = Math.max(R.w / iw, R.h / ih) / Math.max(W / iw, H / ih);
  im.style.transform = `translate(-50%,-50%) translate(${(R.x + R.w / 2 - W / 2).toFixed(2)}px,${(R.y + R.h / 2 - H / 2).toFixed(2)}px) scale(${s.toFixed(5)})`;
  const r = 2;
  el.style.clipPath = `inset(${R.y.toFixed(2)}px ${(W - R.x - R.w).toFixed(2)}px ${(H - R.y - R.h).toFixed(2)}px ${R.x.toFixed(2)}px round ${r.toFixed(1)}px)`;
}

// ---- state: targets from scroll, damped toward in the loop
const cur = { e: 0, q: 0 }, tgt = { e: 0, q: 0 };
let sidesAsked = false, dirty = true, last = 0, running = false, glB = null, glF = null, soft = false, side = 0, capI = -1, capsVisible = false;
function targets() {
  const s = scrollY - geo.top;
  tgt.e = clamp((s - geo.pull0) / (geo.pull1 - geo.pull0));
  const t = clamp((s - geo.turn0) / geo.turnLen) * 3.6 - 0.3, i = Math.floor(t);   // four rests: 0, 90, 180, 270
  tgt.q = clamp(i + sstep(0.28, 0.72, t - i), 0, 3);      // a rest at every quarter turn (the labels)
  const on = s >= geo.capsOn && s <= geo.exit + H;   // the last sentence leaves with the stage
  if (on !== capsVisible) { capsVisible = on; caps.classList.toggle('on', on); }
  if (!phone) {
    const f = 1 - sstep(0.02 * H, 0.16 * H, s);
    heroIn.style.opacity = f.toFixed(3); hint.style.opacity = f.toFixed(3);
  }
  if (!sidesAsked && s > geo.loadAt) { sidesAsked = true; loadSides(); }   // the four sides load once the visitor heads for the turn
  const wantLoad = s > geo.turn0 - 0.3 * H;
  loadingEl.classList.toggle('show', wantLoad);
}
function frame(now) {
  const dt = clamp((now - last) / 1000, 0, 0.1) || 0.016; last = now;   // rAF time can run behind performance.now()
  const k = 1 - Math.exp(-6 * dt);                       // damp, lambda 6
  let moving = false;
  for (const key of ['e', 'q']) {
    const d = tgt[key] - cur[key];
    if (Math.abs(d) > 1e-4) { cur[key] += d * k; moving = true; } else cur[key] = tgt[key];
  }
  if (moving || dirty) render();
  dirty = false;
  if (moving) requestAnimationFrame(frame); else running = false;
}
function kick() { targets(); if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } }

function openRect(k, V, asp, off) {
  const M = rotY(YAW0 + k * Math.PI / 2);
  const pts = FACE[k].map((p) => {
    const v = xf(V, xf(M, p)), z = -v[2];
    return [((F / asp * v[0] / z + off[0]) + 1) / 2 * W, (1 - (F * v[1] / z + off[1])) / 2 * H];
  });
  // corners 0,1 bottom, 2,3 top; 0,3 one end, 1,2 the other: the middle of inner and outer edges, hidden under the wood
  const xa = [pts[0][0], pts[3][0]], xb = [pts[1][0], pts[2][0]];
  const lx = Math.min(...xa) < Math.min(...xb) ? xa : xb, rx = lx === xa ? xb : xa;
  const x0 = (lx[0] + lx[1]) / 2, x1 = (rx[0] + rx[1]) / 2;
  const y0 = (pts[2][1] + pts[3][1]) / 2, y1 = (pts[0][1] + pts[1][1]) / 2;
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}
function render() {
  const e = cur.e, q = cur.q, asp = W / H;
  const D = lerp(D1 * 0.56, D1, sstep(0, 1, e));
  const off = [OFF[0] * sstep(0, 1, e), OFF[1] * sstep(0, 1, e)];
  const eye = [0, TGT[1] + D * Math.sin(ELEV), D * Math.cos(ELEV)];
  const V = lookAt(eye, TGT), P = perspective(asp);
  const zc = -xf(V, [0, 1.2, 0])[2];
  const k0 = clamp(Math.floor(q), 0, 3), k1 = Math.min(3, k0 + 1), f = q - k0;
  const A = openRect(k0, V, asp, off), Bq = k1 === k0 ? A : openRect(k1, V, asp, off);
  // between rests the corner posts sweep across the middle: the photograph draws in a little and comes back
  const sh = 1 - 0.32 * Math.sin(Math.PI * f), cw = lerp(A.w, Bq.w, f) * sh, ch = lerp(A.h, Bq.h, f) * sh;
  const cx = lerp(A.x + A.w / 2, Bq.x + Bq.w / 2, f), cy = lerp(A.y + A.h / 2, Bq.y + Bq.h / 2, f);
  const B = { x: cx - cw / 2, y: cy - ch / 2, w: cw, h: ch };
  const kk = sstep(0, 0.62, e);
  const R = { x: lerp(0, B.x, kk), y: lerp(0, B.y, kk), w: lerp(W, B.w, kk), h: lerp(H, B.h, kk) };
  const attached = kk > 0.985;
  const si = attached ? ((Math.round(q) % 4) + 4) % 4 : -1;
  // desktop: the hero photograph itself stays the 0-degree side; phone: the hero is img-005, so img-015 takes 0
  const usePh0 = !phone || !attached;
  place(ph0, ph0img, R);
  ph0.style.opacity = usePh0 ? '1' : '0';
  sides.forEach((el) => {
    const im = el.firstElementChild, k = +el.dataset.side;
    if (attached || el.classList.contains('on')) place(el, im, B);
    const want = k === si && !(k === 0 && usePh0);
    const on = want && im.complete && im.naturalWidth > 0;
    if (on !== el.classList.contains('on')) { el.classList.toggle('on', on); el.setAttribute('aria-hidden', on ? 'false' : 'true'); }
  });
  side = si;
  const ci = clamp(Math.round(q), 0, 3);
  if (ci !== capI) { capI = ci; capEls.forEach((p, i) => p.classList.toggle('on', i === ci)); capDots.forEach((d, i) => d.classList.toggle('on', i === ci)); }
  const a = sstep(0.1, 0.3, e);
  cvB.style.opacity = cvF.style.opacity = a.toFixed(3);
  if (glB && a > 0.001) {
    const st = { M: rotY(YAW0 + q * Math.PI / 2), V, P, off, split: zc, eye };
    glB.draw(st); glF.draw(st);
  }
}

// ---- side photographs load after first paint; a loading state shows if the turn is reached first
function loadSides() {
  const ims = sides.map((el) => el.firstElementChild);
  let left = ims.length;
  stage.dataset.loading = 'true';
  ims.forEach((im) => {
    const done = () => { if (--left <= 0) { stage.dataset.loading = 'false'; dirty = true; kick(); } };
    im.addEventListener('load', done, { once: true }); im.addEventListener('error', done, { once: true });
    im.src = im.dataset.src;
  });
}
function bootGL() {
  try {
    const coarse = matchMedia('(pointer: coarse)').matches;
    dpr = Math.min(devicePixelRatio || 1, coarse ? 1.5 : 2);
    glB = makeGL(cvB, true); glF = makeGL(cvF, false);
    if (!glB || !glF) throw new Error('no webgl');
    const g = glB.gl, ext = g.getExtension('WEBGL_debug_renderer_info');
    const r = ext ? String(g.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : '';
    if (!r || /swiftshader|llvmpipe|software/i.test(r)) { soft = true; dpr = 1; }
    for (const cv of [cvB, cvF]) cv.addEventListener('webglcontextlost', (ev) => { ev.preventDefault(); glB = glF = null; cvB.style.display = cvF.style.display = 'none'; });
    measure(); kick();
  } catch (err) {
    glB = glF = null; cvB.style.display = cvF.style.display = 'none';   // the photographs still pull back and turn
  }
}

measure(); targets(); render();
addEventListener('scroll', kick, { passive: true });
addEventListener('resize', () => { measure(); kick(); });
phoneMQ.addEventListener?.('change', () => location.reload());
document.fonts?.ready.then(() => { measure(); kick(); });
const later = () => {
  const go = () => { bootGL(); };
  'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 1500 }) : setTimeout(go, 200);
};
document.readyState === 'complete' ? later() : addEventListener('load', later, { once: true });
addEventListener('pageshow', (ev) => { if (ev.persisted) { measure(); kick(); } });
})();
