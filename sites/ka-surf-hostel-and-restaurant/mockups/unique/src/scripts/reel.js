/* KA Surf Hostel — mockup 3, "unique".

   Every review of this hostel says the same thing: it feels like family. Its
   best photographs are not of rooms, they are of people at a table at night,
   shot on a phone, slightly soft, slightly warm. So the hero is treated the way
   a home film is: grain, halation around the bright parts, a gentle vignette
   and a weave that breathes. Nothing is added to the photograph and nothing is
   taken out of it — the grain sits on top.

   WebGL1 by hand: no three.js, no CDN, nothing vendored (base.md constraint 7).
   Decoration only; every fact on the page is DOM text. Without WebGL, without
   JavaScript, or under prefers-reduced-motion, the photograph is what shows. */

const VERT = `
attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTime;
uniform vec2 uRes, uImg;

vec2 cover(vec2 uv){
  float ar = uRes.x / uRes.y, ir = uImg.x / uImg.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (uv - 0.5) * s + 0.5;
}

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main(){
  vec2 uv = cover(vUv);
  float t = uTime;

  /* the weave: a frame of film never sits perfectly still */
  uv += vec2(sin(t * 0.7) * 0.0012, cos(t * 0.53) * 0.0009);

  vec3 col = texture2D(uTex, uv).rgb;

  /* halation — the bright parts bleed into what is next to them, which is what
     a lamp over a dinner table does on film */
  float o = 1.6 / uRes.y;
  vec3 around = texture2D(uTex, uv + vec2( o * 3.0, 0.0)).rgb
              + texture2D(uTex, uv + vec2(-o * 3.0, 0.0)).rgb
              + texture2D(uTex, uv + vec2(0.0,  o * 3.0)).rgb
              + texture2D(uTex, uv + vec2(0.0, -o * 3.0)).rgb;
  around *= 0.25;
  float bright = smoothstep(0.55, 0.95, dot(around, vec3(0.30, 0.59, 0.11)));
  col += around * vec3(0.16, 0.09, 0.04) * bright;

  /* grain, moving every frame, stronger in the shadows as real film is */
  float g = hash(vUv * uRes + fract(t) * 137.0) - 0.5;
  float shade = 1.0 - smoothstep(0.05, 0.75, dot(col, vec3(0.30, 0.59, 0.11)));
  col += g * (0.030 + 0.055 * shade);

  /* vignette */
  float d = distance(vUv, vec2(0.5, 0.5));
  col *= 1.0 - smoothstep(0.42, 0.95, d) * 0.45;

  gl_FragColor = vec4(col, 1.0);
}`;

export function startReel(canvas, src) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const sh = (type, s) => { const x = gl.createShader(type); gl.shaderSource(x, s); gl.compileShader(x);
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
  const u = { time: U('uTime'), res: U('uRes'), img: U('uImg') };
  gl.uniform1i(U('uTex'), 0);

  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([26, 20, 16]));
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
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) raf = requestAnimationFrame(loop); });
  io.observe(canvas);

  const t0 = performance.now();
  function loop(now) {
    if (!running) return;
    resize();
    gl.uniform1f(u.time, (now - t0) / 1000);
    gl.uniform2f(u.res, w, h);
    gl.uniform2f(u.img, imgW, imgH);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return { stop() { running = false; cancelAnimationFrame(raf); } };
}
