/* The swell: a hand-written WebGL pass over the water of the hero photograph (img-018).
   The <img> stays underneath as the LCP and the still, and the sky is never touched: the canvas starts at the horizon.
   A front lifts the water as it walks in to the shore, the light comes along its face, and the sun's path glitters.
   Off for reduced motion and Save-Data, and when WebGL is missing or the texture is refused (a page on file:// keeps
   the still; over http it runs). Software renderers run at 10 fps. A slow device steps down in resolution, then stops. */
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
    'uniform sampler2D T; uniform vec2 R; uniform vec4 D; uniform vec2 O; uniform vec4 K; uniform float t; uniform float g; uniform float Q;',
    'float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}',
    'float rp(vec2 p){return vn(p)*.65+vn(p*2.13+vec2(7.1,3.7))*.35;}',
    /* a crest: narrow on top, long in the trough, so a front reads as one thing arriving */
    'float cr(float p){float s=.5+.5*sin(p);return s*s*s;}',
    'float crd(float p){float s=.5+.5*sin(p);return 3.*s*s*.5*cos(p);}',
    'void main(){',
    /* css px inside the stage */
    ' vec2 px=vec2(gl_FragCoord.x/Q,O.y+(R.y-gl_FragCoord.y)/Q);',
    ' vec2 u=(px-D.xy)/D.zw;',
    ' vec2 P=1./D.zw;',
    /* v: position in the whole photograph, 0..1. Horizon and shoreline are measured on it */
    ' vec2 v=(u*K.zw+K.xy);',
    ' float hz=mix(.450,.463,v.x);',
    ' float sa=mix(.925,.775,v.x);',
    ' float d=clamp((v.y-hz)/(sa-hz),0.,1.);',
    ' float m=smoothstep(.0,.07,d)*(1.-smoothstep(.93,1.02,d))*g;',
    ' float z=.35/(d+.08);',
    ' float x=(v.x-.44)*z*1.3;',
    /* two fronts on one 9 s clock, a little oblique: they walk in to the shore and speed up as they near it */
    ' float ph=z*6.2+t*.7+x*.9+v.x*3.4;',
    ' float h=cr(ph)+.55*cr(ph*.5+1.1+x*.4);',
    ' float sl=crd(ph);',
    /* lift: up to 8 css px where the water is close, nothing near the horizon */
    ' float near=smoothstep(.06,.55,d);',
    /* the shore band lifts less, so the foam does not rise and fall as one mass */
    ' float sb=smoothstep(.40,.62,d);',
    ' float lift=h*8.*near*(1.-.45*sb);',
    /* ripples, for refraction and glitter */
    ' vec2 q=vec2(x*9.,z*16.+t*.5);',
    ' float e=.06, n0=rp(q);',
    ' vec2 dn=vec2(rp(q+vec2(e,0.))-n0,rp(q+vec2(0.,e))-n0)/e;',
    /* and it churns: a slow sideways travel with the front, plus a drift that differs from clump to clump */
    ' vec2 cn=v*vec2(46.,90.);',
    ' vec2 ch=vec2(vn(cn+vec2(t*.35,0.)),vn(cn.yx+vec2(3.7,t*.3)))-.5;',
    ' vec2 fo=(vec2(sin(ph*.5+t*.2)*2.6,0.)+ch*vec2(6.,5.))*sb;',
    ' vec2 o=(vec2(0.,lift)+fo+dn*vec2(1.,1.3)*(.3+.9*d))*P*m;',
    ' vec3 c=texture2D(T,u+o).rgb;',
    /* the back of the front falls into shade and its face takes the light */
    ' c*=1.+m*near*(1.-.6*sb)*(.10*sl+.05*h);',
    ' vec3 sun=vec3(1.,.74,.48);',
    ' float l=dot(c,vec3(.3,.59,.11));',
    /* a specular pass running along the crest */
    /* only where the water is already reflecting the sky, never on the blue-grey foam */
    ' float warm=smoothstep(.015,.11,c.r-c.b);',
    ' float sp=smoothstep(.25,.95,h)*smoothstep(.5,.82,rp(vec2(v.x*90.,v.y*520.-t*1.4)+dn*.4))*warm;',
    ' c+=sun*sp*m*near*.16;',
    /* foam brightens as the front reaches it */
    ' c+=vec3(1.,.93,.86)*smoothstep(.42,.75,l)*h*m*near*.09*(1.-.5*sb);',
    /* glitter down the sun\'s path, wider as it comes closer */
    ' float pa=(v.x-.436)/(.05+.22*d);',
    ' float gl=smoothstep(.62,.88,rp(vec2(v.x*120.,v.y*760.-t*2.)+dn*.6))*exp(-pa*pa)*warm;',
    ' c+=sun*gl*m*.20;',
    ' float a=smoothstep(0.,10.,px.y-O.y);',
    ' gl_FragColor=vec4(c*a,a);',
    '}'
  ].join('\n');
  var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

  var start = null;
  function prep() {
    var gl = cv.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
    if (!gl) return;
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.bindAttribLocation(pr, 0, 'a');
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    start = function () {
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); }
    catch (e) { return; } /* a refused texture keeps the still */

    var U = {};
    ['R', 'D', 'O', 'K', 't', 'g', 'Q'].forEach(function (k) { U[k] = gl.getUniformLocation(pr, k); });

    /* which crop of the photograph the browser chose: x y w h as fractions of the whole image */
    var tall = /tall/.test(img.currentSrc || img.src);
    var k = (stage.getAttribute(tall ? 'data-crop-tall' : 'data-crop-wide') || '0 0 1 1').split(' ').map(Number);
    gl.uniform4f(U.K, k[0], k[1], k[2], k[3]);

    var dbg = gl.getExtension('WEBGL_debug_renderer_info');
    var soft = dbg && /swiftshader|llvmpipe|software/i.test(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
    var coarse = matchMedia('(pointer: coarse)').matches;
    /* only the water is drawn, so a phone can afford the screen's own sharpness, up to 2x */
    var maxRes = Math.min(devicePixelRatio || 1, 2);
    var res = maxRes;
    var minDt = soft ? 100 : coarse ? 33 : 0;       /* 10 / 30 / display rate */

    function size() {
      var W = stage.clientWidth, H = stage.clientHeight;
      if (!W || !H) return;
      var iw = img.naturalWidth, ih = img.naturalHeight, s = Math.max(W / iw, H / ih);
      var dw = iw * s, dh = ih * s;
      var pos = getComputedStyle(img).objectPosition.split(' ').map(parseFloat);
      var ox = (W - dw) * pos[0] / 100, oy = (H - dh) * pos[1] / 100;
      /* the canvas starts just above the horizon at its highest (.450 of the photograph) */
      var top = Math.max(0, Math.floor(((.446 - k[1]) / k[3]) * dh + oy));
      var cssH = H - top;
      /* never more than about 3.2 million pixels of water, on any screen */
      res = Math.min(res, Math.sqrt(3.2e6 / (W * cssH)));
      cv.style.top = top + 'px';
      cv.style.height = cssH + 'px';
      cv.width = Math.round(W * res);
      cv.height = Math.round(cssH * res);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(U.R, cv.width, cv.height);
      gl.uniform1f(U.Q, res);
      gl.uniform2f(U.O, 0, top);
      gl.uniform4f(U.D, ox, oy, dw, dh);
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
          if (res > 1.1) { res = 1; size(); } else if (res > .7) { res = .7; size(); } else { stop(); return; }
        }
      }
      var e = (now - t0) / 1000;
      var ramp = Math.min(1, e / .7);               /* the water wakes fast, without the still popping */
      gl.uniform1f(U.t, (e + 3) % 3600);            /* starts with a front already in the near water */
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
    };
  }

  /* the shader compiles just after first paint, and runs as soon as the photograph is decoded */
  requestAnimationFrame(function () {
    setTimeout(function () {
      prep();
      if (!start) return;
      var run = function () { if (start) { var s = start; start = null; s(); } };
      if (img.decode) img.decode().then(run, function () { img.addEventListener('load', run); });
      else if (img.complete) run(); else img.addEventListener('load', run);
    }, 0);
  });
})();
