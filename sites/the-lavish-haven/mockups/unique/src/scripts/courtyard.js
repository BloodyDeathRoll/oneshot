/* The Lavish Haven — mockup 3, "unique".

   The hotel is built around its pool: two storeys of rooms on both sides, water
   in the middle. So the page is built around it too. A band of water is fixed to
   the bottom of the viewport for the whole page — the courtyard you keep walking
   past — and the heading of whatever section you are in is reflected in it,
   upside down and rippling, the way a lit sign reflects in a pool at night.

   WebGL1 by hand: two textures (the hotel's own pool photograph, and a 2D canvas
   with the current heading drawn into it), one full-screen triangle, ~90 lines of
   GLSL. No three.js, no CDN, nothing vendored (base.md hard constraint 7).

   It is an enhancement and nothing else. Every heading it reflects is a real
   <h2> in the DOM above it. With no WebGL, no JavaScript, or
   prefers-reduced-motion, the band is a still photograph of the pool and the
   page loses nothing. */

const VERT = `
attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uPool, uText;
uniform float uTime, uFade;
uniform vec2 uRes, uImg;

/* object-fit: cover in uv space */
vec2 cover(vec2 uv){
  float ar = uRes.x / uRes.y, ir = uImg.x / uImg.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (uv - 0.5) * s + 0.5;
}

/* two crossed wave trains, the standard cheap water */
vec2 ripple(vec2 uv, float t, float amp){
  vec2 d;
  d.x = sin(uv.y * 30.0 + t * 1.15) * 0.0042 + sin(uv.y * 71.0 - t * 0.75) * 0.0017;
  d.y = sin(uv.x * 25.0 - t * 0.95) * 0.0036 + sin(uv.x * 55.0 + t * 1.35) * 0.0015;
  return uv + d * amp;
}

/* A long, slow swell for the reflection. The photograph can take the short
   chop above; letters cannot — at this scale the fast train shreds them into
   an unreadable squiggle, which is what a reflection must not be. */
vec2 swell(vec2 uv, float t, float amp){
  vec2 d;
  d.x = sin(uv.y * 5.5 + t * 0.85) * 0.010 + sin(uv.y * 11.0 - t * 0.55) * 0.004;
  d.y = sin(uv.x * 3.4 - t * 0.70) * 0.006;
  return uv + d * amp;
}

void main(){
  float t = uTime;
  /* deeper water at the bottom of the band, calmer at the lip */
  float depth = smoothstep(0.0, 0.85, 1.0 - vUv.y);

  /* The band is a 6:1 slot and the photograph is 4:3, so a plain cover crop
     lands in the middle of the frame — which in this photograph is the building,
     not the water. Bias the crop down to the bottom of the image, where the pool
     actually is. (The texture is uploaded flipped, so v near 0 is the foot of
     the photograph.) */
  vec2 puv = cover(vUv);
  puv.y = puv.y - 0.30;
  vec3 pool = texture2D(uPool, ripple(puv, t, 0.55 + depth)).rgb;
  pool *= 0.74 + 0.26 * depth;

  /* The reflection. The heading texture is uploaded without a vertical flip, so
     sampling it straight already gives the mirror image; it is then squeezed
     into the top 58% of the band — the lip of the water shows the foot of the
     letters, and the further down you look the further up the word you see. */
  const float LIP = 0.22;
  float v = (vUv.y - LIP) / (1.0 - LIP);
  vec2 r = vec2(vUv.x, v);
  vec2 rr = swell(r, t, 0.55 + (1.0 - v) * 1.5);
  float inside = step(0.0, rr.x) * step(rr.x, 1.0) * step(0.0, rr.y) * step(rr.y, 1.0);
  float ink = texture2D(uText, rr).a * inside;
  /* fades out as it sinks, and never touches the very lip */
  ink *= smoothstep(-0.02, 0.28, v) * (1.0 - smoothstep(0.72, 1.04, v));

  vec3 col = mix(pool, vec3(0.92, 0.96, 0.97), ink * 0.34 * uFade);

  /* Caustics, computed in the photograph's own uv space — in screen space a
     band this wide and this short turns them into a row of identical blobs. */
  float c = sin(puv.x * 150.0 + t * 1.3) * sin(puv.y * 150.0 - t * 1.0)
          + 0.5 * sin(puv.x * 249.0 - t * 1.8) * sin(puv.y * 231.0 + t * 1.5);
  float lit = smoothstep(0.12, 0.40, dot(col, vec3(0.30, 0.59, 0.11)));
  col += vec3(0.09, 0.17, 0.17) * smoothstep(0.72, 1.20, c) * depth * lit;

  gl_FragColor = vec4(col, 1.0);
}`;

export function startCourtyard(canvas, poolSrc) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const sh = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(a);
  gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

  const U = (n) => gl.getUniformLocation(prog, n);
  const u = { time: U('uTime'), fade: U('uFade'), res: U('uRes'), img: U('uImg') };
  gl.uniform1i(U('uPool'), 0);
  gl.uniform1i(U('uText'), 1);

  const mkTex = (unit) => {
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    return t;
  };
  const poolTex = mkTex(0), textTex = mkTex(1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, poolTex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([10, 40, 48]));

  let imgW = 4, imgH = 3, ready = false;
  const im = new Image();
  im.decoding = 'async';
  im.onload = () => {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, poolTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    imgW = im.naturalWidth; imgH = im.naturalHeight;
    ready = true;
  };
  im.src = poolSrc;

  /* the heading, drawn into a 2D canvas and uploaded as an alpha mask */
  const tc = document.createElement('canvas');
  tc.width = 1024; tc.height = 200;
  const ctx = tc.getContext('2d');
  let current = '', fade = 0, target = 0;

  const setLabel = (text) => {
    if (text === current) return;
    current = text;
    ctx.clearRect(0, 0, tc.width, tc.height);
    if (text) {
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let size = 150;
      do {
        ctx.font = `600 ${size}px "Bricolage Grotesque", system-ui, sans-serif`;
        size -= 6;
      } while (ctx.measureText(text).width > tc.width * 0.94 && size > 26);
      ctx.fillText(text, tc.width / 2, tc.height / 2);
    }
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);   /* the flip IS the reflection */
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc);
    target = text ? 1 : 0;
  };

  let w = 0, h = 0, running = true, raf = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
    const r = canvas.getBoundingClientRect();
    const nw = Math.max(1, Math.round(r.width * dpr)), nh = Math.max(1, Math.round(r.height * dpr));
    if (nw === w && nh === h) return;
    w = canvas.width = nw; h = canvas.height = nh;
    gl.viewport(0, 0, w, h);
  };

  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); running = false; cancelAnimationFrame(raf); });
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) raf = requestAnimationFrame(loop);
  });

  const t0 = performance.now();
  function loop(now) {
    if (!running) return;
    resize();
    fade += (target - fade) * 0.07;
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, poolTex);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.uniform1f(u.time, (now - t0) / 1000);
    gl.uniform1f(u.fade, ready ? fade : 0);
    gl.uniform2f(u.res, w, h);
    gl.uniform2f(u.img, imgW, imgH);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  return { setLabel, stop() { running = false; cancelAnimationFrame(raf); } };
}
