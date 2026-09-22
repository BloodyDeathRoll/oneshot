/* KA Surf Hostel — mockup 3, "unique". Archetype: the chart
   (concepts.md §3, concept 3 "Latitude").

   One horizon runs the first screen: open sea above the line, chart paper
   below it. The sea is not a pool and not a wave breaking — it is the water
   seen edge-on from a boat, a long swell that lifts the horizon a few pixels
   and drops it again, with the light running along it.

   WebGL1 by hand: one texture, one full-screen triangle, no three.js, no CDN
   (base.md constraint 9). Decoration only; every fact on the page is DOM text.
   Without WebGL, without JavaScript, or under prefers-reduced-motion the
   photograph is what shows. */

const VERT = `
attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uSea;
uniform float uTime;
uniform vec2 uRes, uImg;

vec2 cover(vec2 uv){
  float ar = uRes.x / uRes.y, ir = uImg.x / uImg.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main(){
  vec2 uv = cover(vUv);
  float t = uTime;

  /* a long swell: two slow trains, almost in phase, so the period is minutes
     rather than seconds and the water never looks like it is looping */
  float swell = sin(uv.x * 2.6 + t * 0.22) * 0.5 + sin(uv.x * 1.7 - t * 0.17) * 0.5;
  /* the nearer the bottom of the band, the more it moves — perspective */
  float near = 1.0 - vUv.y;
  uv.y += swell * 0.010 * (0.25 + near * 1.2);
  uv.x += sin(uv.y * 9.0 + t * 0.4) * 0.0025;

  vec3 col = texture2D(uSea, uv).rgb;

  /* light running along the swell */
  float glint = smoothstep(0.55, 1.0, swell) * near;
  col += vec3(0.10, 0.11, 0.09) * glint;

  gl_FragColor = vec4(col, 1.0);
}`;

export function startSwell(canvas, src) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const sh = (ty, s) => { const x = gl.createShader(ty); gl.shaderSource(x, s); gl.compileShader(x);
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
  gl.uniform1i(U('uSea'), 0);

  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([42, 100, 114]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  let iw = 4, ih = 3;
  const im = new Image(); im.decoding = 'async';
  im.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
    iw = im.naturalWidth; ih = im.naturalHeight;
  };
  im.src = src;

  let w = 0, h = 0, running = true, raf = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.7);
    const r = canvas.getBoundingClientRect();
    const nw = Math.max(1, Math.round(r.width * dpr)), nh = Math.max(1, Math.round(r.height * dpr));
    if (nw === w && nh === h) return;
    w = canvas.width = nw; h = canvas.height = nh; gl.viewport(0, 0, w, h);
  };
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); running = false; cancelAnimationFrame(raf); });
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) raf = requestAnimationFrame(loop); });
  io.observe(canvas);
  const t0 = performance.now();
  function loop(now) {
    if (!running) return;
    resize();
    gl.uniform1f(u.time, (now - t0) / 1000);
    gl.uniform2f(u.res, w, h); gl.uniform2f(u.img, iw, ih);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return { stop() { running = false; cancelAnimationFrame(raf); } };
}
