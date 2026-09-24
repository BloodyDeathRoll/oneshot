/* Layday Surf Ahangama — mockup 2, "interactive".

   One dormitory with ochre plaster walls, and a day that mostly consists of the
   light moving across them. So the pinned hero is the room, and scrolling walks
   the sun across it: a warm band of light with the shadow of the window louvres
   in it, travelling from one side of the wall to the other, warm and low in the
   morning, white and high at midday, long and red at the end.

   WebGL1 by hand — no three.js, no CDN, nothing vendored (base.md constraint 7).
   Decoration only: every fact is DOM text above it. Without WebGL, without
   JavaScript, or under prefers-reduced-motion the photograph is what shows. */

const VERT = `
attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTime, uSun;      /* uSun: 0 = morning, 1 = evening */
uniform vec2 uRes, uImg;

vec2 cover(vec2 uv){
  float ar = uRes.x / uRes.y, ir = uImg.x / uImg.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main(){
  vec2 uv = cover(vUv);
  vec3 col = texture2D(uTex, uv).rgb;

  /* the patch of sun: a soft band that crosses the wall, tilted the way a
     window throws it, and narrower in the middle of the day */
  float centre = mix(-0.18, 1.18, uSun);
  float tilt = (vUv.y - 0.5) * mix(0.42, -0.42, uSun);
  float d = abs(vUv.x - centre + tilt);
  float width = mix(0.30, 0.20, abs(uSun - 0.5) * 2.0);
  float patch = 1.0 - smoothstep(0.0, width, d);

  /* louvre shadow inside the patch — the slats of the window, not a gradient */
  float slats = smoothstep(0.42, 0.58, abs(fract((vUv.y + tilt * 0.6) * 9.0) - 0.5) * 2.0);
  patch *= mix(0.55, 1.0, slats);

  /* warm at the ends of the day, white in the middle, and it breathes a little
     the way light does when something outside moves in the wind */
  float breath = 0.92 + 0.08 * sin(uTime * 0.55 + vUv.y * 2.0);
  vec3 warm = mix(vec3(1.00, 0.72, 0.38), vec3(1.00, 0.95, 0.86), 1.0 - abs(uSun - 0.5) * 2.0);
  col += warm * patch * 0.26 * breath;

  /* and the rest of the wall sits back a touch, so the patch reads as light */
  col *= 1.0 - (1.0 - patch) * 0.10;

  gl_FragColor = vec4(col, 1.0);
}`;

export function startLight(canvas, src) {
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
  const u = { time: U('uTime'), sun: U('uSun'), res: U('uRes'), img: U('uImg') };
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

  let w = 0, h = 0, sun = 0, running = true, raf = 0;
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
    gl.uniform1f(u.time, (now - t0) / 1000);
    gl.uniform1f(u.sun, sun);
    gl.uniform2f(u.res, w, h);
    gl.uniform2f(u.img, imgW, imgH);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return { setSun(v) { sun = Math.max(0, Math.min(1, v)); }, stop() { running = false; cancelAnimationFrame(raf); } };
}
