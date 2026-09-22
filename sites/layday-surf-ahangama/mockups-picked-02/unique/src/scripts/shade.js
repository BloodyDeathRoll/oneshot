/* Layday Surf Ahangama — mockup 3, "unique".

   The whole hostel is one room, so the page is one room: an ochre wall you keep
   looking at, with the shadow of the planting outside moving across it. The
   garden here is banana and palm, pressing right up to the walkway — two of the
   hostel's own photographs are of nothing else — and on a plaster wall in
   Ahangama that is what the afternoon looks like.

   WebGL1 by hand: layered value noise thresholded into leaf-shaped shadow with a
   hard edge and a soft penumbra, swaying on two frequencies so it never repeats
   visibly. No three.js, no CDN, nothing vendored (base.md constraint 7).
   Decoration only; every fact is DOM text. Without WebGL, without JavaScript, or
   under prefers-reduced-motion the photograph is what shows. */

const VERT = `
attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTime, uDepth;
uniform vec2 uRes, uImg;

vec2 cover(vec2 uv){
  float ar = uRes.x / uRes.y, ir = uImg.x / uImg.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (uv - 0.5) * s + 0.5;
}

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p){
  return noise(p) * 0.55 + noise(p * 2.13) * 0.28 + noise(p * 4.41) * 0.17;
}

void main(){
  vec2 uv = cover(vUv);
  vec3 col = texture2D(uTex, uv).rgb;

  /* the leaves sway on two frequencies, so the pattern never visibly loops */
  vec2 sway = vec2(sin(uTime * 0.21) * 0.028 + sin(uTime * 0.53) * 0.009,
                   cos(uTime * 0.17) * 0.018);
  float m = fbm(vUv * vec2(3.4, 4.6) + sway * 3.0);

  /* a hard edge with a small penumbra — a leaf shadow is not a gradient */
  float shade = smoothstep(0.46, 0.56, m);
  /* a second, larger mass behind it, softer, the way a canopy layers */
  float behind = smoothstep(0.40, 0.72, fbm(vUv * vec2(1.5, 2.1) - sway * 1.4));

  float k = clamp(shade * 0.72 + behind * 0.28, 0.0, 1.0) * uDepth;

  /* shadow on warm plaster goes cool and green, it does not just go dark */
  col = mix(col, col * vec3(0.62, 0.66, 0.60), k);
  /* and the lit parts bleach a little */
  col += vec3(0.05, 0.04, 0.02) * (1.0 - k) * 0.6;

  gl_FragColor = vec4(col, 1.0);
}`;

export function startShade(canvas, src) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x);
    return gl.getShaderParameter(x, gl.COMPILE_STATUS) ? x : null; };
  const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

  const U = (n) => gl.getUniformLocation(prog, n);
  const u = { time: U('uTime'), depth: U('uDepth'), res: U('uRes'), img: U('uImg') };
  gl.uniform1i(U('uTex'), 0);

  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([227, 188, 107]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  let imgW = 4, imgH = 3;
  const im = new Image();
  im.decoding = 'async';
  im.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
    imgW = im.naturalWidth; imgH = im.naturalHeight;
  };
  im.src = src;

  let w = 0, h = 0, depth = 0.85, running = true, raf = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
    const r = canvas.getBoundingClientRect();
    const nw = Math.max(1, Math.round(r.width * dpr)), nh = Math.max(1, Math.round(r.height * dpr));
    if (nw === w && nh === h) return;
    w = canvas.width = nw; h = canvas.height = nh;
    gl.viewport(0, 0, w, h);
  };
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); running = false; cancelAnimationFrame(raf); });
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) raf = requestAnimationFrame(loop); });
  io.observe(canvas);

  const t0 = performance.now();
  function loop(now) {
    if (!running) return;
    resize();
    gl.uniform1f(u.time, (now - t0) / 1000);
    gl.uniform1f(u.depth, depth);
    gl.uniform2f(u.res, w, h);
    gl.uniform2f(u.img, imgW, imgH);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return { setDepth(v) { depth = Math.max(0, Math.min(1, v)); }, stop() { running = false; cancelAnimationFrame(raf); } };
}
