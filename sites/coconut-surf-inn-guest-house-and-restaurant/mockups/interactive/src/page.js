/* Coconut Surf Inn, interactive mockup ("Under the thatch"). Everything here is an enhancement:
   with JS off every link works, the rooms stack in two groups, the rows scroll natively. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const q = new URLSearchParams(location.search);
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const phoneQ = matchMedia('(max-width: 767px)');
  const seen = (el, fn, margin = '0px') => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); fn(e.target); } }), { rootMargin: margin });
    io.observe(el);
  };

  /* ---------- header sticks (desktop) and the phone bar slides up once the hero has gone */
  const hero = $('.hero'), top = $('.top'), bar = $('#bar');
  /* the blurred placeholder under the hero photo is a loading state only: dropped once the photo is in */
  const himg = $('.hero-img');
  if (himg) { const ok = () => himg.classList.add('loaded'); himg.complete && himg.naturalWidth ? ok() : himg.addEventListener('load', ok, { once: true }); }
  new IntersectionObserver(([e]) => {
    top.classList.toggle('stuck', !e.isIntersecting);
    bar.classList.toggle('up', !e.isIntersecting);
  }, { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
  const tog = $('.bar-tog'), more = $('#bar-more');
  tog.hidden = false;
  tog.addEventListener('click', () => {
    const open = tog.getAttribute('aria-expanded') !== 'true';
    tog.setAttribute('aria-expanded', open); more.hidden = !open;
  });

  /* ---------- rolling digits, once, on first view */
  $$('.num[data-roll]').forEach((el) => {
    if (calm) return;
    const txt = el.dataset.roll;
    el.textContent = '';
    const cols = [...txt].map((ch) => {
      if (!/\d/.test(ch)) { const s = document.createElement('span'); s.textContent = ch; s.setAttribute('aria-hidden', 'true'); el.append(s); return null; }
      const c = document.createElement('span'); c.className = 'col'; c.setAttribute('aria-hidden', 'true');
      for (let d = 0; d <= 9; d++) { const s = document.createElement('span'); s.textContent = d; c.append(s); }
      el.append(c); return [c, +ch];
    }).filter(Boolean);
    seen(el, () => cols.forEach(([c, d], i) => setTimeout(() => { c.style.transform = `translateY(${-d * 1.2}em)`; }, 80 * i)));
  });

  /* ---------- the forecast's height counts up once it is in view */
  const cnt = $('.now-v .cnt');
  if (cnt && !calm) {
    const to = parseFloat(cnt.textContent);
    seen(cnt, () => {
      const t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 300); cnt.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(1); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  /* ---------- Rosa's widget: only when its block nears the viewport, in its reserved box */
  const box = $('.rosa-box');
  if (box) seen(box, () => {
    box.dataset.loading = 'true';
    const f = document.createElement('iframe');
    f.title = box.dataset.title; f.width = '100%'; f.height = '500'; f.loading = 'lazy';
    f.style.cssText = 'max-width:420px;border:0;border-radius:16px;display:block';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin');
    const done = (ok) => { box.dataset.loading = 'false'; if (ok) box.classList.add('loaded'); else f.remove(); };   // the plain link stays under the frame either way
    const timer = setTimeout(() => done(false), 12000);
    f.addEventListener('load', () => { clearTimeout(timer); done(true); }, { once: true });
    // a failed frame still fires 'load' (on an empty error page that would cover the link), so the
    // frame is only added once Rosa answers at all; until then, and if it never does, the plain link stays
    fetch(box.dataset.rosa, { mode: 'no-cors', credentials: 'omit' })
      .then(() => { f.src = box.dataset.rosa; box.append(f); })
      .catch(() => { clearTimeout(timer); done(false); });
  }, '600px');

  /* ---------- deferred slides: written as <img> only when their room or slideshow is shown */
  const hydrate = (root) => $$('.lazy', root).forEach((sp) => {
    const im = new Image(); im.decoding = 'async'; im.loading = 'lazy';
    im.width = +sp.dataset.w; im.height = +sp.dataset.h; im.alt = sp.dataset.alt;
    im.sizes = sp.dataset.sizes; im.srcset = sp.dataset.srcset; im.src = sp.dataset.src;
    sp.replaceWith(im);
  });
  $$('.roof [data-show]').forEach((sh) => seen(sh, hydrate, '200px'));

  /* ---------- slideshows: dots and arrows over a scroll-snap track */
  $$('[data-show]').forEach((sh) => {
    const track = $('.track', sh), dots = $$('.dot', sh), ctrl = $('.ctrl', sh);
    if (dots.length < 2) return;
    ctrl.hidden = false;
    let i = 0;
    const set = (n) => { i = n; dots.forEach((d, k) => d.setAttribute('aria-current', k === n ? 'true' : 'false')); };
    const go = (n) => { n = (n + dots.length) % dots.length; track.scrollTo({ left: n * track.clientWidth, behavior: calm ? 'auto' : 'smooth' }); set(n); };
    set(0);
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    $('.prev', sh).addEventListener('click', () => go(i - 1));
    $('.next', sh).addEventListener('click', () => go(i + 1));
    let raf = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => set(Math.round(track.scrollLeft / track.clientWidth))); }, { passive: true });
  });

  /* ---------- the reviews: a paged carousel (round 3). One dot per page of what fits (3 / 2 / 1),
     arrows that stop at the ends, swipe and trackpad scroll natively; every control is 44 px or more. */
  $$('[data-revs]').forEach((rv) => {
    const track = $('.cards', rv), cards = [...track.children], ctrl = $('.rev-ctrl', rv), dotsBox = $('.dots', rv);
    const prev = $('.prev', rv), next = $('.next', rv), count = $('.rev-count', rv);
    let per = 1, pages = 1, page = 0, dots = [];
    const x = (k) => cards[k].offsetLeft - cards[0].offsetLeft;
    const mark = (n) => {
      page = n; dots.forEach((d, k) => d.setAttribute('aria-current', k === n ? 'true' : 'false'));
      count.textContent = `${n + 1} of ${pages}`;
      prev.disabled = n === 0; next.disabled = n >= pages - 1;
    };
    const go = (n) => { n = Math.max(0, Math.min(pages - 1, n)); track.scrollTo({ left: x(Math.min(n * per, cards.length - 1)), behavior: calm ? 'auto' : 'smooth' }); mark(n); };
    const build = () => {
      per = Math.max(1, Math.round(track.clientWidth / (cards[0].offsetWidth || 1)));
      pages = Math.ceil(cards.length / per);
      dotsBox.textContent = '';
      dots = Array.from({ length: pages }, (_, k) => {
        const d = document.createElement('button'); d.type = 'button'; d.className = 'dot';
        d.setAttribute('aria-label', `Reviews ${k * per + 1} to ${Math.min(cards.length, (k + 1) * per)}`);
        d.addEventListener('click', () => go(k)); dotsBox.append(d); return d;
      });
      ctrl.hidden = pages < 2;
      // more pages than fit as 44 px dots (a phone, one review a page): a counter between the arrows
      const many = pages > 6; dotsBox.hidden = many; count.hidden = !many;
      mark(Math.min(page, pages - 1));
    };
    prev.addEventListener('click', () => go(page - 1));
    next.addEventListener('click', () => go(page + 1));
    let raf = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const end = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
        mark(end ? pages - 1 : Math.round(track.scrollLeft / Math.max(1, x(Math.min(per, cards.length - 1)))));
      });
    }, { passive: true });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(page + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(page - 1); }
    });
    build();
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 120); });
  });

  /* ---------- How do you like to sleep? tiles -> rooms that match -> one room on the stage */
  const viewer = $('#viewer');
  if (viewer) {
    const tiles = $$('.tile'), picks = $$('.pick'), pill = $('.pill'), rail = $('.picks');
    const rooms = Object.fromEntries($$('.room').map((r) => [r.dataset.room, r]));
    let group = 'ac', cur = picks[0].dataset.pick, near = false;
    seen(viewer, () => { near = true; hydrate(rooms[cur]); }, '200px');
    const place = () => {
      const p = picks.find((b) => b.dataset.pick === cur); if (!p) return;
      const row = getComputedStyle(rail).flexDirection === 'row';
      pill.style.width = row ? p.offsetWidth + 'px' : '100%';
      pill.style.height = p.offsetHeight + 'px';
      pill.style.transform = row ? `translate(${p.offsetLeft}px, ${p.offsetTop}px)` : `translateY(${p.offsetTop}px)`;
      if (row) rail.scrollTo({ left: p.offsetLeft - 24, behavior: calm ? 'auto' : 'smooth' });
    };
    const pick = (slug) => {
      cur = slug;
      picks.forEach((b) => b.setAttribute('aria-pressed', b.dataset.pick === slug ? 'true' : 'false'));
      Object.entries(rooms).forEach(([k, r]) => { r.classList.toggle('on', k === slug); r.toggleAttribute('inert', k !== slug); });
      if (near) hydrate(rooms[slug]);
      place();
    };
    const choose = (g, focus) => {
      group = g;
      tiles.forEach((t) => { const on = t.dataset.group === g; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
      viewer.setAttribute('aria-labelledby', 'tab-' + g);
      picks.forEach((b) => { b.hidden = !b.dataset.groups.split(' ').includes(g); });
      const vis = picks.filter((b) => !b.hidden);
      pick(vis.some((b) => b.dataset.pick === cur) ? cur : vis[0].dataset.pick);
    };
    tiles.forEach((t, k) => {
      t.addEventListener('click', (e) => { e.preventDefault(); choose(t.dataset.group); });
      t.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (d) { e.preventDefault(); choose(tiles[(k + d + tiles.length) % tiles.length].dataset.group, true); }
        if (e.key === ' ') { e.preventDefault(); choose(t.dataset.group); }
      });
    });
    picks.forEach((b) => b.addEventListener('click', () => pick(b.dataset.pick)));
    choose('ac');
    addEventListener('resize', place);
    document.fonts && document.fonts.ready.then(place);
  }

  /* ---------- the hero: a depth parallax on img-102 itself, from the hand-painted depth map.
     The photograph <img> paints first and is the LCP; the canvas draws the same pixels over it after
     first paint and only moves the layers against each other. Reduced motion, Save-Data, no WebGL,
     a page opened from file:// and a slow first 30 frames all keep the still photograph. */
  const force = q.get('depth') === 'force';
  const start = () => {
    const cv = $('.depth'), im = $('.hero-img');
    if (!cv || !im || ((calm || saveData) && !force)) return;
    const gl = cv.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0.,1.);}'));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, `precision mediump float;varying vec2 v;uniform sampler2D img,dep;uniform vec2 st,sp,off;
      void main(){vec2 t=st+v*sp;float d=texture2D(dep,t).r;float d2=texture2D(dep,t-off*d).r;vec2 o=off*mix(d,d2,.5);gl_FragColor=texture2D(img,t-o);}`));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(prog, n);
    const tex = (unit, source) => {
      const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
      [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((w) => gl.texParameteri(gl.TEXTURE_2D, w, gl.CLAMP_TO_EDGE));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
      return t;
    };
    gl.uniform1i(U('img'), 0); gl.uniform1i(U('dep'), 1);
    let ready = false, tw = 0, th = 0, uvpx = [0, 0], loaded = '';
    const load = () => {
      const want = im.currentSrc;
      if (!want || want === loaded || !im.complete || !im.naturalWidth) return;
      loaded = want;
      const dm = new Image();
      dm.onload = () => {
        try { tex(0, im); tex(1, dm); } catch (e) { cv.remove(); return; }   // file:// taints the texture: keep the still
        tw = im.naturalWidth; th = im.naturalHeight; ready = true; size(); kick();
      };
      dm.src = phoneQ.matches ? cv.dataset.depthTall : cv.dataset.depthWide;
    };
    const size = () => {
      if (!tw) return;
      const dpr = Math.min(devicePixelRatio || 1, 2), cw = cv.clientWidth, ch = cv.clientHeight;
      cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr); gl.viewport(0, 0, cv.width, cv.height);
      const s = Math.max(cw / tw, ch / th), dw = tw * s, dh = th * s, k = 1.03;         // object-fit: cover, scale(1.03)
      const pos = getComputedStyle(im).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
      const ox = (cw - dw) * pos[0], oy = (ch - dh) * pos[1];
      gl.uniform2f(U('sp'), cw / (k * dw), ch / (k * dh));
      gl.uniform2f(U('st'), (cw / 2 * (1 - 1 / k) - ox) / dw, (ch / 2 * (1 - 1 / k) - oy) / dh);
      uvpx = [1 / (dw * k), 1 / (dh * k)];
      last = null;
    };
    // the eye (round 2): it is never still while the hero is in view. An idle drift, a slow figure
    // of eight (±7 px across, ±2.5 px up and down at the nearest layer, a 10 s loop), so the depth
    // reads with no pointer and on every phone. Scrolling away lowers the eye (up to 8 px), so the
    // thatch slides over the sea as you leave. A pointer or a tilt takes over and hands back after
    // 2.5 s. 0 at the horizon. Reduced motion and Save-Data never start any of it.
    const AMP = [10, 6];
    let eye = [0, 0], aim = [0, 0], user = [0, 0], userAt = -1e9, last = null, raf = 0, prev = 0, frames = 0, slow = 0, inView = true, dead = false, clock = 0;
    const draw = () => {
      gl.uniform2f(U('off'), -eye[0] * uvpx[0], -eye[1] * uvpx[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      last = eye.slice();
    };
    const tick = (t) => {
      raf = 0;
      if (dead || !ready || !inView || document.hidden) { prev = 0; return; }
      const dt = prev ? Math.min(64, t - prev) : 16; prev = t;
      if (frames < 30) { frames++; if (frames > 3 && dt > 24) slow++; if (frames === 30 && slow > 12 && !force) { dead = true; cv.classList.remove('live'); return; } }
      clock += dt / 1000;
      const ramp = Math.min(1, clock / 2.5), w = 2 * Math.PI * clock / 10;
      const idle = [7 * Math.sin(w) * ramp, 2.5 * Math.sin(2 * w + .6) * ramp];
      const sc = Math.min(1, Math.max(0, scrollY / innerHeight)) * 8;
      aim = t - userAt < 2500 ? [user[0], user[1] + sc] : [idle[0], idle[1] + sc];
      const a = 1 - Math.exp(-dt / (t - userAt < 2500 ? 140 : 600));
      eye = [eye[0] + (aim[0] - eye[0]) * a, eye[1] + (aim[1] - eye[1]) * a];
      if (!last || Math.abs(eye[0] - last[0]) > .01 || Math.abs(eye[1] - last[1]) > .01) draw();
      if (!cv.classList.contains('live')) cv.classList.add('live');
      raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && !dead) raf = requestAnimationFrame(tick); };
    const point = (nx, ny) => { userAt = performance.now(); user = [Math.max(-1, Math.min(1, nx)) * AMP[0], Math.max(-1, Math.min(1, ny)) * AMP[1]]; kick(); };
    if (fine) addEventListener('pointermove', (e) => { if (inView) point((e.clientX / innerWidth - .5) * 2, (e.clientY / innerHeight - .5) * 2); }, { passive: true });
    hero.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') { const r = hero.getBoundingClientRect(); point((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1); } }, { passive: true });
    // tilt on phones: iOS asks first, on the visitor's first tap on the picture (never on the button)
    let b0 = null;
    const tilt = (e) => { if (e.gamma == null) return; if (b0 == null) b0 = e.beta; point(e.gamma / 18, (e.beta - b0) / 18); };
    if (!fine && 'DeviceOrientationEvent' in window) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const ask = (e) => {
          if (e.target.closest('a,button')) return;
          hero.removeEventListener('click', ask);
          DeviceOrientationEvent.requestPermission().then((s) => { if (s === 'granted') addEventListener('deviceorientation', tilt); }).catch(() => {});
        };
        hero.addEventListener('click', ask);
      } else addEventListener('deviceorientation', tilt);
    }
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) kick(); }).observe(hero);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) { prev = 0; kick(); } });
    addEventListener('resize', () => { size(); load(); kick(); });
    im.addEventListener('load', load);
    load();
  };
  const later = () => requestAnimationFrame(() => setTimeout(start, 0));   // after first paint
  document.readyState === 'complete' ? later() : addEventListener('load', later, { once: true });
})();
