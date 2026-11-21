/* The Hour, round 2: one fragment shader, one renderer, no library. It runs only inside the pinned
   set-piece, live, on the page's own daylight photograph. The first screen is that photograph
   ungraded. The sweep ends on a real blue-hour photograph (img-027), never on a graded still.
   Coordinates: "frame uv" is 0..1 across the 1920x1080 frame of img-152, y down.
   Nothing is drawn that is not a re-grade of a pixel of img-152. Aimed side by side at img-027:
   curtains lit from their own folds in amber, stone taking the sky's blue, a dark green hedge,
   light spilling on soffits and hedge tops. */
window.HOUR_FS = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPhoto, uMask, uFolds;
uniform vec4 uView;   // frame uv of the canvas rect: x, y, w, h
uniform vec4 uSrc;    // frame uv of the photo texture (the phone source is a crop)
uniform vec2 uWin;    // the part of the frame the day runs across: x0, x1
uniform vec2 uSlice;  // noon ends at uSlice.x, dusk is complete at uSlice.y (window space)
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
  float sl = lum(s), ll = lum(c);
  float t = timeAt(f.x);

  // Mattes. The polygons say where a thing can be; the photograph says where it is.
  float gb = s.g - s.b;
  float sky = m.r * (1. - m.b) * smoothstep(.27, .42, sl) * (1. - smoothstep(.012, .05, gb));
  float sand = m.g * smoothstep(-.012, .03, s.r - s.g);
  // Concrete is olive in this photograph, so colour alone would stain it green: above the roofline
  // anything not sky is tree; below it a leaf must be truly greener than red.
  float veg = (1. - sky) * smoothstep(.015, .05, s.g - s.r) * smoothstep(.02, .07, gb);
  veg = max(veg, m.r * (1. - sky));
  veg = max(veg, m.b) * (1. - sand);
  float trunk = m.b * (1. - step(.685, f.y));

  // Sky: a map on the cloud's own luminance, read through a wide low-pass because a map exposes the
  // blocks of a compressed file. Deep blue like img-027; pink held low on the horizon.
  float h = clamp((.438 - f.y) / .438, 0., 1.);
  float bl = sl, wt = 1.;
  for (int k = 0; k < 8; k++) {
    float a = float(k) * .7854;
    float v = lum(texture2D(uPhoto, q + px * vec2(cos(a), sin(a)) * 7.).rgb);
    float w = step(.36, v);   // a palm next door must not darken its neighbour: no halo
    bl += v * w; wt += w;
  }
  bl /= wt;
  float sat = max(s.r, max(s.g, s.b)) - min(s.r, min(s.g, s.b));
  float cl = smoothstep(.40, .92, bl) * (1. - smoothstep(.08, .30, sat) * .85);
  vec3 skyDark = mix(mix(hex(110., 92., 128.), hex(40., 56., 112.), smoothstep(.0, .22, h)), hex(20., 46., 102.), smoothstep(.2, .7, h));
  vec3 skyLite = mix(mix(hex(232., 160., 140.), hex(88., 94., 148.), smoothstep(.02, .2, h)), hex(48., 68., 124.), smoothstep(.2, .85, h));
  vec3 duskSky = mix(skyDark, skyLite, cl);

  // Golden hour on the way there: warm low down, already cool high up, never brown or grey.
  vec3 goldSky = c * mix(vec3(1.16, .95, .80), vec3(.76, .74, .94), smoothstep(.12, .86, h));
  vec3 gold = mix(c * vec3(1.05, .92, .74), goldSky, sky);

  // Stone takes the sky's blue, as the concrete does in img-027. Hedge and palms stay dark green.
  vec3 duskBuilt = pow(ll, .8) * vec3(.11, .20, .38);
  vec3 duskVeg = pow(min(ll, .24), 1.05) * vec3(.03, .095, .055) + hex(7., 15., 14.);
  vec3 dusk = mix(duskBuilt, duskVeg, veg);
  dusk = mix(dusk, ll * vec3(.05, .06, .085) + hex(8., 11., 15.), trunk);
  vec3 duskSand = c * vec3(.17, .18, .26);

  // Bays. Each comes on as a whole, at the time its own centre has reached. Spill falls on soffits,
  // decks and hedge tops from the bays that are on; the sky and the sand get none.
  float lit = 0., spill = 0., py = 0., upper = 0., hung = 1.;
  for (int i = 0; i < NPANES; i++) {
    vec4 r = uPane[i];
    float on = smoothstep(uOn[i], uOn[i] + .22, timeAt((r.x + r.z) * .5));
    if (on <= 0.) continue;
    vec2 e = vec2(.00045, .0008);
    vec2 a = smoothstep(r.xy - e, r.xy + e, f) * (1. - smoothstep(r.zw - e, r.zw + e, f));
    float v = on * a.x * a.y;
    if (v > lit) { lit = v; py = (f.y - r.y) / (r.w - r.y); upper = step(r.y, .5); hung = uCloth[i]; }
    vec2 d = max(max(r.xy - f, f - r.zw), vec2(0.)) * vec2(1.778, 1.);
    spill = max(spill, on * exp(-length(d) * 52.));
  }
  lit *= 1. - m.b;

  // The glow comes from the source's own folds: a column-median texture of each pane, so the folds
  // are there and the reflections, block marks and stains are not. Anything truly darker than its
  // own column is an object in front (a chair, a parasol, a frond) and stays a silhouette.
  float fold = texture2D(uFolds, f).r;
  float front = smoothstep(.24, .42, sl);
  float greenFront = 1. - (1. - step(.345, f.x)) * smoothstep(.02, .07, s.g - max(s.r, s.b));
  float hang = smoothstep(.20, .42, fold);
  vec3 amberLo = hex(176., 100., 34.), amberMid = hex(240., 164., 66.), amberHi = hex(255., 214., 140.);
  vec3 cloth = mix(amberLo, mix(amberMid, amberHi, smoothstep(.72, .96, fold)), smoothstep(.42, .78, fold));
  cloth *= mix(1.12, .70, smoothstep(.0, 1., py));
  vec3 room = hex(122., 70., 26.) * (.42 + .9 * fold) + ll * vec3(.50, .30, .12);
  vec3 pane = mix(room, cloth, hung * hang);
  pane *= mix(vec3(1.), mix(vec3(1.), vec3(.70, .66, .62), smoothstep(.62, .68, py)), upper);   // the glass balustrade
  pane = mix(hex(16., 14., 18.) + ll * vec3(.05, .04, .03), pane, front * greenFront);

  dusk = mix(dusk, duskSky, sky);
  dusk = mix(dusk, duskSand, sand);
  dusk += spill * spill * (1. - sky) * (1. - sand) * (1. - veg) * hex(244., 170., 96.) * (.012 + ll * .16);
  dusk += spill * spill * veg * (1. - m.b * .6) * hex(150., 136., 54.) * (.012 + ll * .28);

  vec3 day = mix(c, mix(gold, c * vec3(1.02, .97, .93), sand), smoothstep(.0, .5, t));
  vec3 o3 = mix(day, dusk, smoothstep(.34, 1., t));
  // Stone and leaves give up the daylight before the sky does.
  o3 = mix(o3, dusk, (1. - sky) * (1. - sand) * smoothstep(.20, .78, t));
  o3 = mix(o3, pane, lit);

  vec3 o = srgb(o3) + (hash(gl_FragCoord.xy) - .5) * step(.001, t) * 1.6 / 255.;
  gl_FragColor = vec4(o, 1.);
}`;

/* Every pane, read off a 2x crop of img-152 by hand: x0, y0, x1, y1 in frame px, the moment it comes
   on (0..1 of its centre's time), and 0 for the two glass-fronted double bays. The order is a house
   at dusk, not a left-to-right wipe. They come on late, when the stone around them has already gone. */
window.HOUR_PANES = [
  [241, 496, 355, 590, .70], [387, 495, 505, 590, .76], [532, 495, 657, 590, .66],
  [684, 494, 969, 590, .62, 0], [985, 494, 1125, 589, .58], [1139, 493, 1278, 589, .64],
  [1298, 493, 1432, 589, .72], [1459, 493, 1605, 589, .66],
  [245, 606, 354, 698, .62], [387, 606, 505, 698, .68], [532, 606, 657, 698, .58],
  [684, 606, 958, 698, .46, 0], [983, 606, 1112, 704, .54], [1137, 606, 1277, 704, .50],
  [1297, 606, 1430, 704, .62], [1459, 606, 1587, 704, .56]
];

window.HourGL = function (canvas, photo, mask, folds, o) {
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
  tex(0, photo); tex(1, mask); tex(2, folds);
  const u = (n) => gl.getUniformLocation(p, n);
  gl.uniform1i(u('uPhoto'), 0); gl.uniform1i(u('uMask'), 1); gl.uniform1i(u('uFolds'), 2);
  gl.uniform4fv(u('uPane'), new Float32Array(panes.flatMap((r) => [r[0] / 1920, r[1] / 1080, r[2] / 1920, r[3] / 1080])));
  gl.uniform1fv(u('uOn'), new Float32Array(panes.map((r) => r[4])));
  gl.uniform1fv(u('uCloth'), new Float32Array(panes.map((r) => (r[5] === 0 ? 0 : 1))));
  const view = u('uView'), src = u('uSrc'), win = u('uWin'), slice = u('uSlice');
  const s = o.src || [0, 0, 1, 1]; gl.uniform4f(src, s[0], s[1], s[2], s[3]);
  return {
    draw(v, w, a, b) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform4f(view, v[0], v[1], v[2], v[3]);
      gl.uniform2f(win, w[0], w[1]);
      gl.uniform2f(slice, a, b);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    lose() { const e = gl.getExtension('WEBGL_lose_context'); if (e) e.loseContext(); }
  };
};

/* Frame uv of a box of the given aspect inside a frame-uv window: cover, anchored. Same arithmetic
   as object-fit: cover with the poster's object-position, so canvas and still register exactly. */
window.hourCover = function (win, aspect, ax, ay) {
  const frame = 1920 / 1080, wa = (win[2] * frame) / win[3];
  let w = win[2], h = win[3];
  if (aspect > wa) h = (w * frame) / aspect; else w = (h * aspect) / frame;
  return [win[0] + (win[2] - w) * ax, win[1] + (win[3] - h) * ay, w, h];
};
