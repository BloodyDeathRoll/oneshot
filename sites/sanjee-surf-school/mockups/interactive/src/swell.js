/* The swell: a hand-written WebGL pass over the hero photograph (img-009).
   The <img> stays underneath as the LCP and the still. This only ever adds moving water on top.
   Off for reduced motion and Save-Data, and when WebGL is missing or the texture is refused.
   Software renderers run the light tier (10 fps). A slow device steps down in resolution, then stops. */
(function () {
  var stage = document.querySelector('[data-swell]');
  if (!stage) return;
  var img = stage.querySelector('img');
  var cv = stage.querySelector('canvas');
  var calm = matchMedia('(prefers-reduced-motion: reduce)');
  if (calm.matches) return;
  var conn = navigator.connection;
  if (conn && conn.saveData) return;

  var FS = [
    'precision highp float;',
    'uniform sampler2D T; uniform vec2 R; uniform vec4 C; uniform vec2 P; uniform float t; uniform float g;',
    'uniform vec2 F0; uniform vec2 F1; uniform vec2 F2; uniform float A;',
    'float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}',
    /* ripples: two octaves of noise drifting towards the camera */
    'float rp(vec2 p){return vn(p)*.65+vn(p*2.13+vec2(7.1,3.7))*.35;}',
    /* a figure is held still inside r and released by 2.4 r */
    'float fig(vec2 u,vec2 c,vec2 r){return smoothstep(1.,2.4,length((u-c)/r));}',
    'void main(){',
    ' vec2 s=gl_FragCoord.xy/R; s.y=1.-s.y;',
    ' vec2 u=C.xy*s+C.zw;',
    /* the horizon in this photograph tilts: 0.210 on the left, 0.185 on the right */
    ' float hz=mix(.210,.185,u.x);',
    ' float d=clamp((u.y-hz)/(1.-hz),0.,1.);',
    ' float m=smoothstep(.02,.14,d);',
    ' m*=fig(u,F0,vec2(.046,.05))*fig(u,F1,vec2(.012,.016))*fig(u,F2,vec2(.012,.016));',
    /* the droplets on the lens at the foot of the frame stay put too */
    ' m*=1.-smoothstep(.83,.90,u.y);',
    ' m*=g;',
    /* perspective: distance from the camera, and a sideways coordinate that narrows with distance */
    ' float z=.35/(d+.08);',
    ' float x=(u.x-.5)*z*A;',
    /* the swell: long crests walking at the camera, a little oblique, about 8 s apart */
    ' float ph=z*10.+t*.8+x*1.1;',
    ' float a=ph*1.87+1.7+x*1.9+t*.13;',
    ' float sw=sin(ph)*.72+sin(a)*.28;',
    ' float sl=cos(ph)*.72+cos(a)*.28*1.87;',
    /* ripples, for refraction and for the light on the surface */
    ' vec2 q=vec2(x*9.,z*16.+t*.42);',
    ' float e=.06;',
    ' float n0=rp(q);',
    ' vec2 dn=vec2(rp(q+vec2(e,0.))-n0,rp(q+vec2(0.,e))-n0)/e;',
    /* css px to image uv: P. the swell lifts rows by at most 3 css px near the camera */
    ' float near=.3+.7*d;',
    ' vec2 o=vec2(0.,sw*3.*near)*P+dn*vec2(.9,1.1)*(.25+.75*d)*P;',
    /* the surface travels: two layers of the same water sliding at the camera, each faded out as it
       resets, phases offset by a slow noise so nothing pulses as one. The wave's face stays put. */
    ' float fl=(.16+.84*smoothstep(.36,.62,d))*(.25+.75*d);',
    ' float p0=fract(t*.15+vn(vec2(x*1.3,z*2.1))*.8);',
    ' float p1=fract(p0+.5);',
    ' vec2 v=vec2(0.,8.)*fl*P*m;',
    ' vec2 b=u+o*m;',
    ' vec3 c=mix(texture2D(T,b-v*(p0-.5)).rgb,texture2D(T,b-v*(p1-.5)).rgb,abs(2.*p0-1.));',
    /* the crest catches light and the back of it falls away, as a soft band passing through */
    ' c*=1.+m*near*.055*sl;',
    /* faint moving glints, only where the water is already bright */
    ' float l=dot(c,vec3(.3,.59,.11));',
    ' float gl=smoothstep(.58,.92,rp(vec2(x*26.,z*44.+t*.9)+dn*.5))*smoothstep(.3,.7,l);',
    ' c+=gl*m*.05*(.35+.65*d);',
    ' gl_FragColor=vec4(c,1.);',
    '}'
  ].join('\n');
  var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

  function boot() {
    var gl = cv.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
    if (!gl) return;
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.bindAttribLocation(pr, 0, 'a');
    gl.linkProgram(pr);
    gl.useProgram(pr);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); }
    catch (e) { return; } /* a refused texture keeps the still */

    var U = {};
    ['R', 'C', 'P', 't', 'g', 'F0', 'F1', 'F2', 'A'].forEach(function (k) { U[k] = gl.getUniformLocation(pr, k); });
    /* where the figures are, in image coordinates: data, so a replaced photograph lines up (schema v0.10) */
    var f = (stage.getAttribute('data-figures') || '').split(' ').map(function (p) { return p.split(',').map(Number); });
    gl.uniform2f(U.F0, f[0][0], f[0][1]);
    gl.uniform2f(U.F1, f[1][0], f[1][1]);
    gl.uniform2f(U.F2, f[2][0], f[2][1]);

    var dbg = gl.getExtension('WEBGL_debug_renderer_info');
    var soft = dbg && /swiftshader|llvmpipe|software/i.test(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
    var coarse = matchMedia('(pointer: coarse)').matches;
    /* 1x, except a phone: the source holds 1.26 px per css px there, so 1.3 keeps the water as sharp as the still */
    var res = (coarse && (devicePixelRatio || 1) > 1.25) ? 1.3 : 1;
    var minDt = soft ? 100 : coarse ? 33 : 0;       /* 10 / 30 / display rate */

    function size() {
      var W = stage.clientWidth, H = stage.clientHeight;
      if (!W || !H) return;
      cv.width = Math.round(W * res);
      cv.height = Math.round(H * res);
      gl.viewport(0, 0, cv.width, cv.height);
      var iw = img.naturalWidth, ih = img.naturalHeight, k = Math.max(W / iw, H / ih);
      var dw = iw * k, dh = ih * k;
      var pos = getComputedStyle(img).objectPosition.split(' ').map(parseFloat);
      var ox = (W - dw) * pos[0] / 100, oy = (H - dh) * pos[1] / 100;
      gl.uniform2f(U.R, cv.width, cv.height);
      gl.uniform4f(U.C, W / dw, H / dh, -ox / dw, -oy / dh);
      gl.uniform2f(U.P, 1 / dw, 1 / dh);
      gl.uniform1f(U.A, iw / ih);
    }
    size();
    var ro = new ResizeObserver(size);
    ro.observe(stage);

    var seen = true, raf = 0, t0 = performance.now(), last = 0, slow = 0, n = 0, shown = false, dead = false;
    function stop() { dead = true; cancelAnimationFrame(raf); ro.disconnect(); cv.style.opacity = 0; }
    function frame(now) {
      raf = 0;
      if (dead) return;
      if (seen && !document.hidden) raf = requestAnimationFrame(frame);
      if (now - last < minDt) return;
      var dt = now - last; last = now;
      /* the guard: 30 frames in a row under 20 fps steps down, then stops. Not on the light tier. */
      if (!soft && !document.hidden) {
        n++; if (n > 6 && dt > 50) slow++; else if (n > 6) slow = Math.max(0, slow - 1);
        if (slow > 30) {
          slow = 0; n = 0;
          if (res > 0.7) { res = 0.7; size(); } else { stop(); return; }
        }
      }
      var e = (now - t0) / 1000;
      var ramp = Math.min(1, e / 2.4);              /* the water wakes up, so the still never pops */
      gl.uniform1f(U.t, (e + 40) % 3600);
      gl.uniform1f(U.g, ramp * ramp * (3 - 2 * ramp));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shown) { shown = true; cv.style.opacity = 1; }
    }
    function go() { if (!raf && !dead && seen && !document.hidden) raf = requestAnimationFrame(frame); }
    new IntersectionObserver(function (es) { seen = es[0].isIntersecting; go(); }, { rootMargin: '80px' }).observe(stage);
    document.addEventListener('visibilitychange', go);
    calm.addEventListener('change', function () { if (calm.matches) stop(); });
    cv.addEventListener('webglcontextlost', stop);
    go();
  }

  /* after first paint, once the photograph is decoded */
  function later() {
    var run = function () { requestAnimationFrame(function () { setTimeout(boot, 60); }); };
    if (img.decode) img.decode().then(run, function () {}); else if (img.complete) run(); else img.onload = run;
  }
  if (document.readyState === 'complete') later(); else addEventListener('load', later);
})();
