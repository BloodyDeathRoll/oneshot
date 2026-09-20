/* KA Surf Hostel — mockup 2, "interactive".

   A day at KA, on one pinned screen: the breakfast table in the morning, the
   beach at midday, the sun going down, and the long table at night. Four of the
   hostel's own photographs, cross-faded as you scroll, with the air moving over
   them — a slow heat shimmer, not water. This hostel has no pool; it has a
   garden, a beach five minutes away and afternoons at 30 degrees.

   WebGL1 by hand: no three.js, no CDN, nothing vendored (base.md constraint 7).
   Decoration only — every fact is DOM text above it. If WebGL is missing, the
   context is lost, or the visitor prefers reduced motion, the photograph stays
   and this file does nothing. */

const VERT = `
attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uA, uB;
uniform float uMix, uTime;
uniform vec2 uRes, uImg;

vec2 cover(vec2 uv){
  float ar = uRes.x / uRes.y, ir = uImg.x / uImg.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (uv - 0.5) * s + 0.5;
}

/* value noise, cheap enough for a phone */
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main(){
  vec2 uv = cover(vUv);
  float t = uTime;

  /* heat rising: the shimmer is strongest low in the frame, where the ground is,
     and it drifts upward rather than sideways */
  float ground = smoothstep(0.75, 0.05, vUv.y);
  float n = noise(vec2(uv.x * 9.0, uv.y * 16.0 - t * 0.45));
  float n2 = noise(vec2(uv.x * 23.0 + 4.0, uv.y * 31.0 - t * 0.85));
  vec2 shift = vec2((n - 0.5) * 0.0055 + (n2 - 0.5) * 0.0022,
                    (n2 - 0.5) * 0.0030) * (0.25 + ground);

  vec3 col = mix(texture2D(uA, uv + shift).rgb, texture2D(uB, uv + shift).rgb, uMix);

  /* a little warmth in the shimmer, so it reads as air and not as a glitch */
  col += vec3(0.055, 0.030, 0.0) * (n - 0.5) * ground;

  gl_FragColor = vec4(col, 1.0);
}`;

export function startDay(canvas, sources) {
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
  const u = { mix: U('uMix'), time: U('uTime'), res: U('uRes'), img: U('uImg') };
  gl.uniform1i(U('uA'), 0); gl.uniform1i(U('uB'), 1);

  const textures = sources.map(() => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([42, 33, 26]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    return t;
  });

  let imgW = 4, imgH = 3;
  sources.forEach((src, i) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[i]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
      imgW = im.naturalWidth; imgH = im.naturalHeight;
    };
    im.src = src;
  });

  let w = 0, h = 0, progress = 0, running = true, raf = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.7);
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
    const seg = progress * (sources.length - 1);
    const i = Math.min(sources.length - 2, Math.floor(seg));
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, textures[i]);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, textures[i + 1]);
    gl.uniform1f(u.mix, seg - i);
    gl.uniform1f(u.time, (now - t0) / 1000);
    gl.uniform2f(u.res, w, h);
    gl.uniform2f(u.img, imgW, imgH);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  return { setProgress(v) { progress = Math.max(0, Math.min(1, v)); }, stop() { running = false; cancelAnimationFrame(raf); } };
}
