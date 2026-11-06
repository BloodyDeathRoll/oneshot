/* The Hour: one fragment shader, one renderer. No library.
   src/make-media.sh runs this same code in headless Chromium to bake the posters, and
   src/build.mjs inlines it into dist/index.html, so the page's first paint and its canvas are
   the same picture. Coordinates: "frame uv" is 0..1 across the 1920x1080 frame of img-152,
   y down. Nothing is drawn that is not a re-grade of a pixel of img-152. */
window.HOUR_FS = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPhoto, uMask;
uniform vec4 uView;   // frame uv of the canvas rect: x, y, w, h
uniform vec4 uSrc;    // frame uv of the photo texture (the phone source is a crop)
uniform vec2 uWin;    // the part of the frame the day runs across: x0, x1
uniform vec2 uSlice;  // noon ends at uSlice.x, dusk is complete at uSlice.y (window space)
uniform float uKeep;  // 1 where the title sits on the sand; 0 in the all-dusk still
uniform vec4 uPane[NPANES];
uniform float uOn[NPANES];
uniform float uCloth[NPANES];

vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }
vec3 srgb(vec3 c){ return pow(max(c, vec3(0.)), vec3(1./2.2)); }
vec3 hex(float r, float g, float b){ return lin(vec3(r, g, b) / 255.); }
float timeAt(float x){ return smoothstep(uSlice.x, uSlice.y, (x - uWin.x) / (uWin.y - uWin.x)); }
float lum(vec3 c){ return dot(c, vec3(.2126, .7152, .0722)); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main(){
  vec2 f = uView.xy + vUv * uView.zw;
  vec2 q = (f - uSrc.xy) / uSrc.zw;
  vec2 px = vec2(1. / 1920., 1. / 1080.) / uSrc.zw;
  vec3 s = texture2D(uPhoto, q).rgb;
  vec3 m = texture2D(uMask, f).rgb;
  vec3 c = lin(s);
  float sl = lum(s);
  float t = timeAt(f.x);

  // Mattes. The polygons (mask texture) say where a thing can be; the photograph says where it is.
  float gb = s.g - s.b;
  float sky = m.r * (1. - m.b) * smoothstep(.27, .42, sl) * (1. - smoothstep(.012, .05, gb));
  float notGreen = 1. - smoothstep(.02, .07, s.g - s.r);
  float sand = m.g * notGreen;
  float veg = (1. - sky) * (1. - sand) * smoothstep(.01, .05, gb) * smoothstep(-.03, .02, s.g - s.r);
  veg = max(veg, m.b);

  // Under the title the sand has a floor: a tone curve on its shadows and specks, never new detail.
  // Its darkest pixel must still give the ink 4.5:1 at the full 0.82 multiply below.
  float zone = uKeep * (1. - smoothstep(.68, 1.02, f.x));
  c *= mix(1., max(1., .40 / max(dot(c, vec3(.2126, .7152, .0722)), .01)), sand * zone);

  // Golden hour: the same pixels with warmer light.
  // The sky's light splits: warm low down, already cool and lilac high up. Going through brown or
  // grey in between is what makes a day-to-night grade look like a trick.
  float hg = clamp((.438 - f.y) / .438, 0., 1.);
  vec3 goldSky = c * mix(vec3(1.20, .94, .76), vec3(.72, .66, .90), smoothstep(.12, .86, hg));
  vec3 gold = mix(c * vec3(1.08, .90, .70), goldSky, sky);

  // Sky at dusk: a gradient map on the cloud's own luminance, softened a little because the
  // source is a compressed 1920 px file and a map exposes its blocks. Aimed at img-027 (#142E66)
  // at the top and img-029 (#FF9B87) in a band low on the horizon.
  float h = clamp((.438 - f.y) / .438, 0., 1.);
  float bl = sl;
  bl += lum(texture2D(uPhoto, q + px * vec2(3., 0.)).rgb) + lum(texture2D(uPhoto, q - px * vec2(3., 0.)).rgb);
  bl += lum(texture2D(uPhoto, q + px * vec2(0., 3.)).rgb) + lum(texture2D(uPhoto, q - px * vec2(0., 3.)).rgb);
  bl *= .2;
  float sat = max(s.r, max(s.g, s.b)) - min(s.r, min(s.g, s.b));
  float cl = smoothstep(.36, .92, bl) * (1. - smoothstep(.08, .30, sat) * .8);
  vec3 lowD = hex(150., 96., 122.), midD = hex(62., 62., 118.), topD = hex(20., 46., 102.);
  vec3 lowL = hex(255., 160., 138.), midL = hex(186., 132., 152.), topL = hex(74., 82., 134.);
  vec3 skyDark = mix(mix(lowD, midD, smoothstep(.0, .34, h)), topD, smoothstep(.30, .78, h));
  vec3 skyLite = mix(mix(lowL, midL, smoothstep(.04, .34, h)), topL, smoothstep(.30, .92, h));
  vec3 duskSky = mix(skyDark, skyLite, cl);

  // Concrete takes the sky's blue; foliage and palms sink nearly to silhouette.
  float ll = dot(c, vec3(.2126, .7152, .0722));
  vec3 duskBuilt = pow(ll, .78) * vec3(.135, .205, .36);
  vec3 duskVeg = pow(ll, 1.15) * vec3(.022, .045, .06) + hex(10., 18., 28.);
  vec3 dusk = mix(duskBuilt, duskVeg, veg);

  // Sand stays the lightest thing in the frame, and under the title it stays light for real.
  float sandMul = mix(.30, .82, zone);
  vec3 duskSand = c * mix(vec3(.84, .74, .92), vec3(1., .96, .96), zone) * sandMul;

  // Panes: every bay comes on as a whole, at the time its own centre has reached.
  float lit = 0., spill = 0., py = 0., upper = 0., hung = 1.;
  for (int i = 0; i < NPANES; i++) {
    vec4 r = uPane[i];
    float on = smoothstep(uOn[i], uOn[i] + .24, timeAt((r.x + r.z) * .5));
    if (on <= 0.) continue;
    vec2 e = vec2(.00045, .0008);
    vec2 a = smoothstep(r.xy - e, r.xy + e, f) * (1. - smoothstep(r.zw - e, r.zw + e, f));
    float v = on * a.x * a.y;
    if (v > lit) { lit = v; py = (f.y - r.y) / (r.w - r.y); upper = step(r.y, .5); hung = uCloth[i]; }
    vec2 d = max(max(r.xy - f, f - r.zw), vec2(0.)) * vec2(1.778, 1.);
    spill = max(spill, on * exp(-length(d) * 42.));
  }
  lit *= (1. - m.b) * (1. - smoothstep(.02, .07, s.g - max(s.r, s.b)));
  // Curtains hang: their only real structure is vertical. Average up and down the pane, so the
  // folds stay and the file's blocks go; anything really dark (a chair, a mullion) stays dark.
  float fold = 0.;
  for (int k = -3; k <= 3; k++) fold += lum(texture2D(uPhoto, q + px * vec2(0., float(k) * 4.)).rgb);
  fold /= 7.;
  float shape = smoothstep(.13, .36, min(sl, fold + .10));   // parasols and chairs stay black
  float curtain = hung * smoothstep(.14, .28, fold);   // the double bays are glass; the rest are hung
  float cove = mix(1.12, .86, smoothstep(.0, 1., py));
  vec3 cloth = mix(hex(240., 186., 74.), hex(252., 226., 150.), smoothstep(.46, .98, fold)) * cove * (.84 + .26 * fold);
  vec3 room = ll * vec3(1.9, 1.02, .36) + hex(128., 72., 20.) * .30;
  vec3 pane = mix(room, cloth, curtain) * mix(.05, 1., shape);
  pane *= mix(vec3(1.), mix(vec3(1.), vec3(.74, .68, .60), step(.66, py)), upper);   // the upper bays' glass balustrade

  dusk = mix(dusk, duskSky, sky);
  dusk = mix(dusk, duskSand, sand);
  dusk += spill * (1. - sky) * (1. - sand) * (1. - veg) * hex(245., 170., 90.) * .16 * (ll * 1.6 + .03);

  vec3 day = mix(c, mix(gold, c * vec3(1.03, .97, .92), sand), smoothstep(.0, .5, t));
  vec3 o3 = mix(day, dusk, smoothstep(.30, 1., t));
  // Stone and leaves give up the daylight before the sky does.
  o3 = mix(o3, dusk, (1. - sky) * (1. - sand) * smoothstep(.18, .80, t));
  o3 = mix(o3, pane, lit);

  vec3 o = srgb(o3) + (hash(gl_FragCoord.xy) - .5) * 1.6 / 255.;
  gl_FragColor = vec4(o, 1.);
}`;

/* Every pane, read off a 2x crop of img-152 by hand: x0, y0, x1, y1 in frame px, then the moment
   it comes on (0..1 of its centre's time). The order is a house at dusk, not a left-to-right wipe. */
window.HOUR_PANES = [
  [241, 496, 355, 590, .66], [387, 495, 505, 590, .72], [532, 495, 657, 590, .62],
  [684, 494, 969, 590, .58, 0], [985, 494, 1125, 589, .50], [1139, 493, 1278, 589, .56],
  [1298, 493, 1432, 589, .68], [1459, 493, 1605, 589, .60],
  [245, 606, 354, 698, .58], [387, 606, 505, 698, .64], [532, 606, 657, 698, .54],
  [684, 606, 958, 698, .36, 0], [983, 606, 1112, 704, .46], [1137, 606, 1277, 704, .42],
  [1297, 606, 1430, 704, .58], [1459, 606, 1587, 704, .52]
];

window.HourGL = function (canvas, photo, mask, o) {
  const panes = window.HOUR_PANES;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: !!o.preserve, powerPreference: 'low-power' });
  if (!gl) return null;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const p = gl.createProgram();
  gl.attachShader(p, sh(gl.VERTEX_SHADER, 'attribute vec2 a;varying vec2 vUv;void main(){vUv=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}'));
  gl.attachShader(p, sh(gl.FRAGMENT_SHADER, window.HOUR_FS.replace(/NPANES/g, String(panes.length))));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  gl.useProgram(p);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aL = gl.getAttribLocation(p, 'a'); gl.enableVertexAttribArray(aL); gl.vertexAttribPointer(aL, 2, gl.FLOAT, false, 0, 0);
  const tex = (unit, img) => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v); };
  tex(0, photo); tex(1, mask);
  const u = (n) => gl.getUniformLocation(p, n);
  gl.uniform1i(u('uPhoto'), 0); gl.uniform1i(u('uMask'), 1);
  gl.uniform4fv(u('uPane'), new Float32Array(panes.flatMap((r) => [r[0] / 1920, r[1] / 1080, r[2] / 1920, r[3] / 1080])));
  gl.uniform1fv(u('uOn'), new Float32Array(panes.map((r) => r[4])));
  gl.uniform1fv(u('uCloth'), new Float32Array(panes.map((r) => (r[5] === 0 ? 0 : 1))));
  const view = u('uView'), src = u('uSrc'), win = u('uWin'), slice = u('uSlice'), keep = u('uKeep');
  const s = o.src || [0, 0, 1, 1]; gl.uniform4f(src, s[0], s[1], s[2], s[3]);
  return {
    draw(v, w, a, b, k) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform4f(view, v[0], v[1], v[2], v[3]);
      gl.uniform2f(win, w[0], w[1]);
      gl.uniform2f(slice, a, b);
      gl.uniform1f(keep, k);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    lose() { const e = gl.getExtension('WEBGL_lose_context'); if (e) e.loseContext(); }
  };
};

/* Frame uv of a box of the given aspect inside a frame-uv window: cover, anchored. Same arithmetic
   as object-fit: cover with the poster's object-position, so canvas and poster register exactly. */
window.hourCover = function (win, aspect, ax, ay) {
  const frame = 1920 / 1080, wa = (win[2] * frame) / win[3];
  let w = win[2], h = win[3];
  if (aspect > wa) h = (w * frame) / aspect; else w = (h * aspect) / frame;
  return [win[0] + (win[2] - w) * ax, win[1] + (win[3] - h) * ay, w, h];
};
