/* KA Surf Hostel — mockup 2, "interactive". Archetype: the chart.

   The page opens on Admiralty Chart 3730 — the 1900s survey of this coast,
   public domain — and as you scroll the chart washes out into the water it
   describes. The dissolve is not a crossfade laid over the artwork: it is
   driven BY the artwork. Where the chart is dark (the coastline, the soundings,
   the lettering) the paper holds on; where it is empty it goes first. So the
   ink is the last thing to leave, and for a moment the depth figures float on
   the real sea.

   WebGL1 by hand: two textures, one full-screen triangle, no three.js, no CDN
   (base.md constraint 9). Decoration only — every fact on the page is DOM text.
   Without WebGL, without JavaScript, or under prefers-reduced-motion, the
   photograph is what shows. */

const VERT = `
attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uChart, uSea;
uniform float uProgress, uTime;
uniform vec2 uRes, uChartSize, uSeaSize;

vec2 cover(vec2 uv, vec2 img){
  float ar = uRes.x / uRes.y, ir = img.x / img.y;
  vec2 s = ar > ir ? vec2(1.0, ir / ar) : vec2(ar / ir, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main(){
  vec2 cu = cover(vUv, uChartSize);
  vec2 su = cover(vUv, uSeaSize);

  /* the chart drifts very slowly, the way a paper chart does on a table */
  cu += vec2(sin(uTime * 0.07) * 0.004, cos(uTime * 0.05) * 0.003);

  vec3 chart = texture2D(uChart, cu).rgb;
  vec3 sea   = texture2D(uSea, su).rgb;

  /* ink density: 1 where the chart is drawn on, 0 where it is blank paper */
  float ink = 1.0 - smoothstep(0.42, 0.88, dot(chart, vec3(0.30, 0.59, 0.11)));

  /* the threshold sweeps from 1 to 0; blank paper crosses it first, ink last */
  float t = 1.0 - uProgress;
  float wash = smoothstep(t - 0.22, t + 0.22, ink);

  vec3 col = mix(sea, chart, wash);

  /* a thin bright edge where the wash is happening, like paper going wet */
  float edge = exp(-pow((ink - t) * 7.0, 2.0)) * uProgress * (1.0 - uProgress) * 4.0;
  col += vec3(0.16, 0.14, 0.10) * edge;

  gl_FragColor = vec4(col, 1.0);
}`;

export function startSoundings(canvas, chartSrc, seaSrc) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
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
  const u = { progress: U('uProgress'), time: U('uTime'), res: U('uRes'),
              chartSize: U('uChartSize'), seaSize: U('uSeaSize') };
  gl.uniform1i(U('uChart'), 0); gl.uniform1i(U('uSea'), 1);

  const sizes = [[4, 3], [4, 3]];
  const tex = [0, 1].map((unit) => {
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([244, 239, 226]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    return t;
  });
  [chartSrc, seaSrc].forEach((src, i) => {
    const im = new Image(); im.decoding = 'async';
    im.onload = () => {
      gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, tex[i]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
      sizes[i] = [im.naturalWidth, im.naturalHeight];
    };
    im.src = src;
  });

  let w = 0, h = 0, progress = 0, running = true, raf = 0;
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
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex[0]);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tex[1]);
    gl.uniform1f(u.progress, progress);
    gl.uniform1f(u.time, (now - t0) / 1000);
    gl.uniform2f(u.res, w, h);
    gl.uniform2f(u.chartSize, sizes[0][0], sizes[0][1]);
    gl.uniform2f(u.seaSize, sizes[1][0], sizes[1][1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  return { setProgress(v) { progress = Math.max(0, Math.min(1, v)); }, stop() { running = false; cancelAnimationFrame(raf); } };
}
