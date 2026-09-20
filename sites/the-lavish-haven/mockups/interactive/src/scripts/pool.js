/* The Lavish Haven — mockup 2, "interactive".
   A WebGL water surface over the hotel's own pool photographs. The pool is
   literally in the middle of this hotel and, per the copy, "most evenings that
   is where people end up" — so scrolling the hero walks the pool from daylight
   to dusk to night, and the surface moves under the pointer.

   Written by hand against WebGL1: no three.js, no CDN, nothing to vendor
   (base.md hard constraint 7). It is an enhancement on top of a plain <img>:
   if WebGL is missing, the context is lost, or the visitor prefers reduced
   motion, the photograph stays and this file does nothing.

   references.md #19 records that none of the six reference sites uses canvas
   or WebGL, so there is no cached precedent for this; custom.md asks for it. */

const VERT = `
attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uA, uB;
uniform float uMix, uTime, uAmp, uPointerAmp;
uniform vec2 uRes, uImg, uPointer;

/* object-fit: cover, in uv space. A canvas wider than the photograph crops the
   top and bottom; a canvas narrower crops the sides. Getting this backwards
   stretches the image against CLAMP_TO_EDGE and smears it down the frame. */
vec2 cover(vec2 uv){
  float ar = uRes.x / uRes.y, ir = uImg.x / uImg.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main(){
  vec2 uv = cover(vUv);
  float t = uTime;
  /* the water is in the lower half of every one of these photographs; vUv.y is 1
     at the top of the canvas, so the mask has to run the other way */
  float depth = smoothstep(0.62, 0.05, vUv.y);

  vec2 d;
  d.x = sin(uv.y * 26.0 + t * 1.10) * 0.0038 + sin(uv.y * 61.0 - t * 0.70) * 0.0016;
  d.y = sin(uv.x * 22.0 - t * 0.90) * 0.0032 + sin(uv.x * 47.0 + t * 1.30) * 0.0014;

  vec2 toP = vUv - uPointer;
  float pd = length(toP) + 0.0001;
  d += (toP / pd) * sin(pd * 58.0 - t * 3.2) * 0.0045 * uPointerAmp * exp(-pd * 5.0);

  uv += d * uAmp * (0.35 + depth);

  vec3 col = mix(texture2D(uA, uv).rgb, texture2D(uB, uv).rgb, uMix);

  /* caustic sheen, only on the water, and only where the water is already bright */
  float c = sin(uv.x * 74.0 + t * 1.25) * sin(uv.y * 52.0 - t * 0.95)
          + 0.5 * sin(uv.x * 121.0 - t * 1.9) * sin(uv.y * 97.0 + t * 1.4);
  float lit = smoothstep(0.10, 0.42, dot(col, vec3(0.30, 0.59, 0.11)));
  col += vec3(0.11, 0.20, 0.20) * smoothstep(0.62, 1.15, c) * depth * lit * uAmp;

  gl_FragColor = vec4(col, 1.0);
}`;

export function startPool(canvas, sources, still) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return null;

  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const p = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(p);
  gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);

  const U = (n) => gl.getUniformLocation(prog, n);
  const u = { mix: U('uMix'), time: U('uTime'), amp: U('uAmp'), pAmp: U('uPointerAmp'),
              res: U('uRes'), img: U('uImg'), pointer: U('uPointer') };
  gl.uniform1i(U('uA'), 0); gl.uniform1i(U('uB'), 1);

  const textures = sources.map(() => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([12, 27, 32]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    return t;
  });

  let loaded = 0, imgW = 4, imgH = 3;
  sources.forEach((src, i) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, textures[i]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
      imgW = im.naturalWidth; imgH = im.naturalHeight;
      if (++loaded === 1 && still) still.dataset.replaced = 'yes';
    };
    im.src = src;
  });

  let w = 0, h = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.75);
    const r = canvas.getBoundingClientRect();
    const nw = Math.round(r.width * dpr), nh = Math.round(r.height * dpr);
    if (nw === w && nh === h) return;
    w = canvas.width = nw; h = canvas.height = nh;
    gl.viewport(0, 0, w, h);
  };

  /* progress 0..1 across the pinned hero: daylight -> dusk -> night */
  let progress = 0, pointer = [0.5, 0.78], pAmp = 0, running = true, raf = 0;
  const api = {
    setProgress(v) { progress = Math.max(0, Math.min(1, v)); },
    stop() { running = false; cancelAnimationFrame(raf); },
  };

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
    pAmp = 1;
  }, { passive: true });

  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(0); });
  io.observe(canvas);
  gl.canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); api.stop(); });

  const start = performance.now();
  function loop(now) {
    if (!running) return;
    resize();
    const t = (now - start) / 1000;
    const seg = progress * (sources.length - 1);
    const i = Math.min(sources.length - 2, Math.floor(seg));
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, textures[i]);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, textures[i + 1]);
    gl.uniform1f(u.mix, seg - i);
    gl.uniform1f(u.time, t);
    gl.uniform1f(u.amp, 1.0);
    gl.uniform1f(u.pAmp, pAmp);
    gl.uniform2f(u.res, w, h);
    gl.uniform2f(u.img, imgW, imgH);
    gl.uniform2f(u.pointer, pointer[0], pointer[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    pAmp *= 0.97;
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return api;
}
