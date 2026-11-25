/* Sea You Surfers Nest — the palm cinemagraph, vendored at 4g from mockups/interactive/src/page.js (round 3).
   Raw WebGL, no library: one quad samples the hero still the page already shows (the graded img-003, cut by
   scripts/photos.mjs), and a mask painted on that photograph (public/palms/) gates a slow displacement, so only the
   fronds move: the table, chairs, pot and parapet never do. Gusts every 6–9 s plus pointer and tilt; capped and
   faded to zero at the canvas edges; shown only after a drawn frame reads back as not flat. Off under reduced
   motion, Save-Data, no WebGL, a software renderer, a slow first 60 frames, a file:// page, or a hero photo the
   mask was not painted for (the page writes data-mask-* only when photos.generated.json has a mask for it).
   ?palms forces it on a software renderer (headless checks). */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData === true;
  const q = new URLSearchParams(location.search);
  const force = q.has('palms');                       // ?palms : run the shader even on a software renderer (headless checks)
  function palms() {
    const hero = $('.hero'), img = $('.hero-img', hero), cv = $('canvas.palms', hero);
    if (!cv || calm || (saveData && !force)) return;     // reduced motion always wins
    if (!img.dataset.maskWide || !img.dataset.maskTall) return;   // a mask exists only for the photograph it was painted on
    let gl;
    try { gl = cv.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' }); } catch (e) {}
    if (!gl) return;
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
    if (!force && /swiftshader|llvmpipe|software|basic render/i.test(renderer)) return;   // weak device: the still stays

    const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
    const FS = `precision mediump float;
varying vec2 v;uniform sampler2D uI,uM;uniform vec2 uS,uO,uE;uniform float uT,uG,uA;
vec3 pm(vec3 x){return mod(((x*34.)+1.)*x,289.);}
float sn(vec2 P){const vec4 C=vec4(.211324865,.366025404,-.577350269,.024390244);
vec2 i=floor(P+dot(P,C.yy));vec2 x0=P-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);
vec3 p=pm(pm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;
vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;
m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}
void main(){
  vec2 uv=v*uS+uO;
  float m=texture2D(uM,uv).r;
  vec2 p=uv*vec2(3.,2.);
  float t=uT;
  float tip=smoothstep(.0,.6,m);                     // fronds far from the parapet move most
  vec2 d=vec2(sn(p+vec2(t*.12,t*.05)),sn(p+vec2(17.3-t*.07,4.1+t*.12)))*.009;
  d+=vec2(sn(p*3.1+vec2(t*.55,-t*.4)),sn(p*3.1+vec2(9.7+t*.45,t*.5)))*.0022;
  d.x+=sin(t*.7+uv.x*2.3+uv.y*3.1)*.0032;
  d+=vec2(clamp(uG,-1.,1.)*.011,-abs(clamp(uG,-1.,1.))*.003)*tip;
  d*=uA;                                             // the phone crop is narrower: same motion on screen as the laptop
  float l=length(d);if(l>.02)d*=.02/l;                // hard cap: no frame can smear, whatever the frame time
  vec2 e=smoothstep(vec2(0.),uE,v)*smoothstep(vec2(0.),uE,1.-v);   // fade to still over the outer ~60 px
  gl_FragColor=vec4(texture2D(uI,uv+d*m*e.x*e.y).rgb,1.);
}`;
    const sh = (type, s) => { const o = gl.createShader(type); gl.shaderSource(o, s); gl.compileShader(o); if (force && !gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.warn('palms shader:', gl.getShaderInfoLog(o)); return o; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(pr, n);
    const uS = U('uS'), uO = U('uO'), uT = U('uT'), uG = U('uG'), uE = U('uE'), uA = U('uA');
    gl.uniform1i(U('uI'), 0); gl.uniform1i(U('uM'), 1);
    const tex = unit => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
      for (const [k, val] of [[gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE], [gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR]]) gl.texParameteri(gl.TEXTURE_2D, k, val);
      return t; };
    const tI = tex(0), tM = tex(1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const phone = matchMedia('(max-width: 767px)');
    let iw = 16, ih = 9, src = '', ready = false;
    const load = () => new Promise((ok, no) => {
      src = img.currentSrc || img.src;
      const mask = new Image(); mask.src = phone.matches ? img.dataset.maskTall : img.dataset.maskWide;
      Promise.all([img.decode ? img.decode() : Promise.resolve(), mask.decode()]).then(() => {
        try {
          gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tI); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
          gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tM); gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, mask);
        } catch (e) { return no(e); }                  // file:// or a tainted source: the still photograph stays
        iw = img.naturalWidth; ih = img.naturalHeight; ok();
      }, no);
    }).catch(e => { if (force) console.warn('palms:', e && e.message); throw e; });
    const fit = () => {                                // object-fit: cover, at the same object-position as the <img>
      const dpr = Math.min(devicePixelRatio || 1, 1.5), w = cv.clientWidth, h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); gl.viewport(0, 0, cv.width, cv.height);
      const pos = getComputedStyle(img).objectPosition.split(' ').map(s => parseFloat(s) / 100);
      const ca = w / h, ia = iw / ih;
      let sx = 1, sy = 1; if (ca > ia) sy = ia / ca; else sx = ca / ia;
      gl.uniform2f(uS, sx, sy); gl.uniform2f(uO, (1 - sx) * pos[0], (1 - sy) * (1 - pos[1]));
      gl.uniform2f(uE, Math.min(.2, 60 / w), Math.min(.2, 60 / h));
      gl.uniform1f(uA, Math.min(2.2, Math.max(1, 1440 / Math.max(w, 1) * .55)));
    };
    // the gust: pointer speed (or a tilt of the phone) pushes the fronds, and a spring brings them back in ~1.2 s
    let g = 0, gv = 0, kick = 0, lx = null, lt = 0;
    hero.addEventListener('pointermove', e => {
      const now = performance.now();
      if (lx !== null && now > lt) kick += Math.max(-1, Math.min(1, (e.clientX - lx) / (now - lt) / 2.2));
      lx = e.clientX; lt = now;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { lx = null; });
    let lg = null;
    addEventListener('deviceorientation', e => { if (e.gamma == null) return; if (lg !== null) kick += Math.max(-.6, Math.min(.6, (e.gamma - lg) / 12)); lg = e.gamma; }, { passive: true });

    let running = false, raf = 0, t0 = performance.now(), last = t0, frames = 0, slow = 0, visible = true;
    let nextGust = t0 + 2500, shown = false, checks = 0;                          // the first gust soon after load, then every 6-9 s
    const frame = now => {
      raf = 0; if (!running) return;
      const dt = Math.min(.05, (now - last) / 1000);
      if (frames < 60) { frames++; if (now - last > 40) slow++; if (frames === 60 && slow > 25 && !force) { cv.classList.remove('on'); running = false; return; } }
      last = now;
      if (now > nextGust) { kick += (Math.random() < .75 ? 1 : -1) * (.75 + Math.random() * .35); nextGust = now + 6000 + Math.random() * 3000; }
      kick *= Math.exp(-dt * 2.2);
      kick = Math.max(-1.1, Math.min(1.1, kick));
      const a = 46 * (kick - g) - 7 * gv; gv += a * dt; g = Math.max(-1.2, Math.min(1.2, g + gv * dt));
      gl.uniform1f(uT, (now - t0) / 1000); gl.uniform1f(uG, g);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!shown) {                                    // a starved renderer can paint a flat block: check before showing
        const px = new Uint8Array(4), seen = [];
        for (const [fx, fy] of [[.2, .8], [.5, .9], [.8, .75], [.35, .65], [.65, .85]]) { gl.readPixels(Math.floor(cv.width * fx), Math.floor(cv.height * fy), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); seen.push(px[0] + px[1] + px[2]); }
        if (Math.max(...seen) - Math.min(...seen) > 24) { shown = true; cv.classList.add('on'); }
        else if (++checks > 30) { running = false; return; }
      }
      raf = requestAnimationFrame(frame);
    };
    const play = () => { if (!ready || running || !visible || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); };
    const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : stop(); }).observe(hero);
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : play());
    addEventListener('resize', () => {
      if (!ready) return;
      if ((img.currentSrc || img.src) !== src) { ready = false; stop(); cv.classList.remove('on'); load().then(() => { ready = true; fit(); play(); }, () => {}); }
      else fit();
    });
    const start = () => load().then(() => { ready = true; fit(); play(); }, () => {});
    // after first paint, so the LCP is the photograph
    if (document.readyState === 'complete') requestAnimationFrame(() => setTimeout(start, 0));
    else addEventListener('load', () => requestAnimationFrame(() => setTimeout(start, 0)), { once: true });
  }

  /* ---------------------------------------------------------- header turns solid once the hero is gone; phone bar */
  palms();
})();
