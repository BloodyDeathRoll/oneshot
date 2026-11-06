/* Lotus Surf House, interactive: the light shader, floor switch, tiles, slideshows, digits, drag row, bar.
   Every link and every section works without it. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData === true;

  /* ---------- the dappled light: moves the sunlight already in img-020, adds nothing ---------- */
  const startLight = () => {
    const canvas = document.querySelector('.light'), photo = document.querySelector('.hero-img');
    if (!canvas || reduce || saveData) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;
      uniform sampler2D img; uniform vec2 res, isz; uniform float t;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int k=0;k<4;k++){v+=a*n(p);p=p*2.03+17.1;a*=.5;}return v;}
      void main(){
        vec2 frag=vec2(gl_FragCoord.x,res.y-gl_FragCoord.y);
        float s=max(res.x/isz.x,res.y/isz.y);
        vec2 uv=(frag-res*.5)/(isz*s)+.5;
        vec2 q=uv*vec2(isz.x/isz.y,1.)*3.2;
        float a=fbm(q+vec2(t*.045,t*.028)), b=fbm(q*1.3-vec2(t*.031,-t*.037)+9.);
        vec3 base=texture2D(img,uv).rgb;
        float lum=dot(base,vec3(.299,.587,.114));
        float sun=smoothstep(.42,.78,lum);                 // the photo's own sun patches
        float leaf=smoothstep(.15,.45,lum)*(1.-sun*.6);    // lit leaves sway a little too
        vec2 d=(vec2(a,b)-.5)*(6./(isz*s))*(sun+leaf*.7);  // <= 6 css px of drift
        vec3 c=texture2D(img,uv+d).rgb;
        float dap=smoothstep(.32,.68,fbm(q*1.7+vec2(-t*.06,t*.05)));
        c*=1.+.065*(dap-.5)*2.*sun;                        // <= 6.5% brightness, only where the sun is
        gl_FragColor=vec4(c,1.);
      }`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = k => gl.getUniformLocation(pr, k);
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(k => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const pic = new Image(); pic.decoding = 'async'; pic.src = photo.currentSrc || photo.src;
    const force = /[?&]light=force/.test(location.search);
    let run = false, vis = true, raf = 0, t0 = performance.now(), slow = 0, frames = 0;
    const size = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(U('res'), canvas.width, canvas.height);
    };
    const frame = now => {
      raf = 0; if (!run || !vis || document.hidden) return;
      const dt = now - (frame.last || now); frame.last = now;
      if (++frames > 10 && frames < 70 && dt > 40) slow++;
      if (slow > 25 && !force) { canvas.classList.remove('on'); return; }   // a weak phone keeps the still photo (?light=force skips this, for checking in software GL)
      gl.uniform1f(U('t'), (now - t0) / 1000); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && run && vis && !document.hidden) { frame.last = 0; raf = requestAnimationFrame(frame); } };
    pic.onload = () => {
      try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, pic); } catch (err) { return; }   // file:// or a tainted copy: the still stays
      gl.uniform2f(U('isz'), pic.naturalWidth, pic.naturalHeight); gl.uniform1i(U('img'), 0);
      size(); run = true; gl.uniform1f(U('t'), 0); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.classList.add('on'); kick();
    };
    addEventListener('resize', () => { if (run) { size(); kick(); } }, { passive: true });
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; kick(); }).observe(canvas);
    document.addEventListener('visibilitychange', kick);
  };
  const later = () => requestAnimationFrame(() => setTimeout(startLight, 120));
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

  /* ---------- floor switch: sliding pill, panels cross-fade with a short rise ---------- */
  const sw = document.querySelector('.switch');
  if (sw) {
    sw.hidden = false;
    const tabs = [...sw.querySelectorAll('[role=tab]')], pill = sw.querySelector('.pill');
    const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    const place = t => { pill.style.width = t.offsetWidth + 'px'; pill.style.transform = `translateX(${t.offsetLeft}px)`; };
    const pick = (i, focus) => {
      tabs.forEach((t, j) => { const on = i === j; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; panels[j].classList.toggle('on', on); panels[j].inert = !on; });
      place(tabs[i]); if (focus) tabs[i].focus();
      // photos of a hidden panel load when it is chosen
      panels[i].querySelectorAll('img[loading=lazy]').forEach(im => { im.loading = 'eager'; });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => pick(i));
      t.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); pick((i + d + tabs.length) % tabs.length, true); }
      });
    });
    pill.style.transition = 'none'; pick(0); pill.offsetWidth; pill.style.transition = '';
    addEventListener('resize', () => place(tabs.find(t => t.getAttribute('aria-selected') === 'true')), { passive: true });
  }

  /* ---------- room tiles: one open at a time ---------- */
  const heads = [...document.querySelectorAll('.tile-head')];
  heads.forEach(h => h.addEventListener('click', () => {
    const open = h.getAttribute('aria-expanded') !== 'true';
    heads.forEach(o => o.setAttribute('aria-expanded', 'false'));
    h.setAttribute('aria-expanded', open);
  }));

  /* ---------- rolling digits on first view ---------- */
  const rolls = [...document.querySelectorAll('[data-roll]')];
  rolls.forEach(el => {
    const v = el.dataset.roll; el.textContent = '';
    for (const ch of v) {
      if (/\d/.test(ch)) {
        const c = document.createElement('span'); c.className = 'col'; c.dataset.d = ch; c.setAttribute('aria-hidden', 'true');
        c.innerHTML = Array.from({ length: 10 }, (_, k) => `<span>${k}</span>`).join(''); el.append(c);
      } else { const s = document.createElement('span'); s.className = 'fix'; s.setAttribute('aria-hidden', 'true'); s.textContent = ch; el.append(s); }
    }
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    e.target.querySelectorAll('.col').forEach((c, k) => setTimeout(() => { c.style.transform = `translateY(${-c.dataset.d * 1.2}em)`; }, k * 60));
  }), { threshold: .6 });
  rolls.forEach(r => io.observe(r));

  /* ---------- review row: drag with momentum on a mouse; touch and trackpads scroll natively ---------- */
  for (const row of document.querySelectorAll('[data-drag]')) {
    let down = false, x0 = 0, s0 = 0, v = 0, lx = 0, lt = 0, moved = 0;
    row.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; x0 = lx = e.clientX; s0 = row.scrollLeft; lt = performance.now(); v = 0; row.classList.add('dragging'); row.setPointerCapture(e.pointerId); });
    row.addEventListener('pointermove', e => {
      if (!down) return; const now = performance.now(); row.scrollLeft = s0 - (e.clientX - x0);
      v = (lx - e.clientX) / Math.max(1, now - lt); lx = e.clientX; lt = now; moved += Math.abs(e.movementX);
    });
    const up = () => {
      if (!down) return; down = false;
      let vel = v * 16; const glide = () => { if (Math.abs(vel) < .4) { row.classList.remove('dragging'); return; } row.scrollLeft += vel; vel *= .94; requestAnimationFrame(glide); };
      reduce ? row.classList.remove('dragging') : glide();
    };
    row.addEventListener('pointerup', up); row.addEventListener('pointercancel', up);
  }

  /* ---------- header and phone bar after the first screen; the bar opens to the summary ---------- */
  const top = document.querySelector('.top'), bar = document.getElementById('bar'), hero = document.querySelector('.hero');
  new IntersectionObserver(([e]) => { top.classList.toggle('solid', !e.isIntersecting); bar.classList.toggle('on', !e.isIntersecting); },
    { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
  const tog = bar.querySelector('.bar-tog'), more = document.getElementById('bar-more');
  tog.hidden = false;
  tog.addEventListener('click', () => { const open = tog.getAttribute('aria-expanded') !== 'true'; tog.setAttribute('aria-expanded', open); more.hidden = !open; });
})();
