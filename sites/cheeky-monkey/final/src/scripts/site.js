(function(){
'use strict';
var H=document.documentElement, motion=H.classList.contains('motion');
/* 4g: the hero reel's poster and renditions, written by the page from content (index.astro) */
var D={poster:'',desk:[],phone:[]};try{D=JSON.parse(document.getElementById('cm-data').textContent)}catch(e){}
if(!D.desk.length&&!D.phone.length) motion=false, H.classList.replace('motion','still');
var top=document.getElementById('top');
function onScrollHeader(){top.classList.toggle('solid', scrollY>24);}

/* ================= the board window and its zoom-through ================= */
var stage=document.getElementById('stage'), pick=document.getElementById('pick'), slot=document.getElementById('slot'),
    zm=document.getElementById('zm'), heroLine=document.getElementById('heroLine'), heroCta=document.getElementById('heroB'),
    shadow=slot.querySelector('.shadow'), cv=document.getElementById('gl');
var G={}; /* geometry, CSS px in stage space */
function measure(){
  var sr=stage.getBoundingClientRect(), b=slot.getBoundingClientRect();
  G.vw=sr.width; G.vh=sr.height;
  G.bx=b.left-sr.left; G.by=b.top-sr.top; G.bw=b.width; G.bh=b.height;
  /* start: the reel covers the board (9:16 by height) */
  G.vi={w:G.bh*9/16,h:G.bh}; G.vi.x=G.bx+G.bw/2-G.vi.w/2; G.vi.y=G.by;
  /* end: desktop at most 1080 px wide, centred, never upscaled; phone covers the screen */
  var wf,hf; if(G.vw>860){wf=Math.min(G.vw,1080);hf=wf*16/9;if(hf<G.vh){hf=G.vh;wf=hf*9/16;}}
  else{ if(G.vw/G.vh>9/16){wf=G.vw;hf=wf*16/9}else{hf=G.vh;wf=hf*9/16} }
  G.vf={w:wf,h:hf,x:(G.vw-wf)/2,y:(G.vh-hf)/2};
  var rw=Math.min(G.vw,wf), rh=G.vh;
  G.smax=Math.max(rw/(0.66*G.bw), rh/(0.62*G.bh))*1.06;
  /* the board's anchor (its widest band) travels to the screen centre */
  G.ax0=G.bx+G.bw/2; G.ay0=G.by+G.bh*0.55;
  zm.style.width=wf+'px'; zm.style.height=hf+'px';
  if(GL.ok) GL.resize();
}
function clamp(v,a,b){return v<a?a:v>b?b:v}
function sstep(a,b,v){v=clamp((v-a)/(b-a),0,1);return v*v*v*(v*(v*6-15)+10)}
var S={p:0,e:0,box:null,vid:null};
function frame(p){
  var e=sstep(0.02,0.86,p); S.p=p; S.e=e;
  var vi=G.vi, vf=G.vf;
  var v={x:vi.x+(vf.x-vi.x)*e, y:vi.y+(vf.y-vi.y)*e, w:vi.w+(vf.w-vi.w)*e, h:vi.h+(vf.h-vi.h)*e};
  var s=1+(G.smax-1)*Math.pow(e,2.2);
  var bw=G.bw*s, bh=G.bh*s;
  var ax=G.ax0+(G.vw/2-G.ax0)*e, ay=G.ay0+(G.vh/2-G.ay0)*e;
  var box={x:ax-bw/2, y:ay-bh*0.55, w:bw, h:bh};
  /* the reel always covers the visible part of the board, so the outline never gets a flat cut */
  var ct=Math.max(box.y,0), cb=Math.min(box.y+box.h,G.vh), cw=Math.min(box.w,G.vw);
  var nh=Math.min(vf.h,Math.max(v.h,cb-ct,cw*16/9));
  if(nh>v.h){var cy=v.y+v.h/2; v.h=nh; v.w=nh*9/16; v.x=G.vw/2-v.w/2; v.y=Math.min(Math.max(cy-nh/2,cb-nh),ct);}
  S.box=box; S.vid=v;
  var k=v.w/vf.w;
  zm.style.transform='translate('+v.x.toFixed(2)+'px,'+v.y.toFixed(2)+'px) scale('+k.toFixed(5)+')';
  var ms=(bw/k).toFixed(1)+'px '+(bh/k).toFixed(1)+'px', mp=((box.x-v.x)/k).toFixed(1)+'px '+((box.y-v.y)/k).toFixed(1)+'px';
  zm.style.webkitMaskSize=ms; zm.style.maskSize=ms; zm.style.webkitMaskPosition=mp; zm.style.maskPosition=mp;
  var t=sstep(0.0,0.14,p);
  heroLine.style.opacity=heroCta.style.opacity=(1-t).toFixed(3);
  heroLine.style.transform='translateY('+(-24*t).toFixed(1)+'px)';
  heroCta.style.transform='translateY('+(24*t).toFixed(1)+'px)';
  heroCta.style.visibility=heroLine.style.visibility=t>=1?'hidden':'visible';
  shadow.style.opacity=(1-sstep(0,0.08,p)).toFixed(3);
  GL.dirty=true;
}
function progress(){
  var r=pick.getBoundingClientRect(), len=r.height-G.vh;
  return len>0?clamp(-r.top/len,0,1):0;
}

/* ---------- WebGL: the reel on a plane inside the board mask, with a resin gloss ---------- */
var GL={ok:false,dirty:true,lx:0.34,tlx:0.34};
function initGL(){
  var gl; try{gl=cv.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:false});}catch(e){}
  if(!gl) return;
  var vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var fs=[
  'precision mediump float;',
  'uniform vec2 uRes;uniform float uDpr;uniform vec4 uBox;uniform vec4 uVid;uniform sampler2D uMask;uniform sampler2D uTex;',
  'uniform float uLight;uniform float uZoom;uniform vec2 uTexel;',
  'float m(vec2 u){if(u.x<0.||u.y<0.||u.x>1.||u.y>1.)return 0.;return texture2D(uMask,u).a;}',
  'void main(){',
  ' vec2 px=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)/uDpr;',
  ' vec2 bu=(px-uBox.xy)/uBox.zw; float a=m(bu); if(a<=0.){gl_FragColor=vec4(0.);return;}',
  ' vec2 vu=(px-uVid.xy)/uVid.zw; if(vu.x<0.||vu.y<0.||vu.x>1.||vu.y>1.){gl_FragColor=vec4(0.);return;}',
  ' vec3 c=texture2D(uTex,vu).rgb;',
  /* rail rim: how close to the outline, measured from the mask itself */
  ' vec2 d=uTexel*7.;',
  ' float n=(m(bu+vec2(d.x,0.))+m(bu-vec2(d.x,0.))+m(bu+vec2(0.,d.y*.35))+m(bu-vec2(0.,d.y*.35)))*.25;',
  ' float rim=clamp((a-n)*2.2,0.,1.);',
  ' float side=bu.x<.5?1.-uLight:uLight;',
  /* a soft specular band that slides along the board with the light, like fresh resin */
  ' float lx=clamp(uLight,.18,.82);\n float band=exp(-pow((bu.x-lx)*6.,2.))*smoothstep(.02,.3,bu.y)*smoothstep(.98,.72,bu.y);\n float roll=1.-.16*pow(abs(bu.x-.5)*2.,3.);',
  ' float g=(band*.10+rim*(.22+.5*side))*(1.-uZoom);\n c*=mix(1.,roll,1.-uZoom);',
  ' c=mix(c,vec3(1.),g);',
  ' gl_FragColor=vec4(c*a,a);',
  '}'].join('\n');
  function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o}
  var pr=gl.createProgram();
  try{gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);}catch(e){return}
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  var loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  function tex(unit){var t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);return t}
  /* the board outline, drawn once into a mask texture */
  var mc=document.createElement('canvas');mc.width=320;mc.height=1024;var x=mc.getContext('2d');
  x.scale(3.2,3.2);x.fill(new Path2D(getComputedStyle(H).getPropertyValue('--board').trim().replace(/^"|"$/g,'')));
  var tMask=tex(0);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,mc);
  var tVid=tex(1);
  var U={};['uRes','uDpr','uBox','uVid','uMask','uTex','uLight','uZoom','uTexel'].forEach(function(n){U[n]=gl.getUniformLocation(pr,n)});
  gl.uniform1i(U.uMask,0);gl.uniform1i(U.uTex,1);gl.uniform2f(U.uTexel,1/320,1/1024);
  gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
  var dpr=1;
  GL.resize=function(){dpr=Math.min(devicePixelRatio||1,1.75);
    if(/swiftshader|llvmpipe|software/i.test(GL.renderer||'')) dpr=Math.min(1,dpr);
    cv.width=Math.round(G.vw*dpr);cv.height=Math.round(G.vh*dpr);gl.viewport(0,0,cv.width,cv.height);GL.dirty=true};
  var ext=gl.getExtension('WEBGL_debug_renderer_info');GL.renderer=ext?String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)):'';
  GL.src=null;
  GL.draw=function(){
    if(!GL.src) return;
    gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,tVid);
    try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,GL.src);}catch(e){return}
    var b=S.box,v=S.vid;
    gl.uniform2f(U.uRes,cv.width,cv.height);gl.uniform1f(U.uDpr,dpr);
    gl.uniform4f(U.uBox,b.x,b.y,b.w,b.h);gl.uniform4f(U.uVid,v.x,v.y,v.w,v.h);
    gl.uniform1f(U.uLight,GL.lx);gl.uniform1f(U.uZoom,Math.min(1,S.e*1.6));
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    if(!GL.live){GL.live=true;H.classList.add('gl-live');}
  };
  cv.addEventListener('webglcontextlost',function(e){e.preventDefault();GL.ok=false;H.classList.remove('gl-live');});
  GL.ok=true; GL.resize();
}

/* ---------- the reel: attached after first paint, never under reduced motion or Save-Data ---------- */
var video=null, inView=true;
function attachVideo(){
  video=document.createElement('video');
  video.muted=true;video.loop=true;video.playsInline=true;video.setAttribute('playsinline','');video.setAttribute('muted','');
  video.preload='auto';video.poster=D.poster; /* 4g: from content (heroVideoPoster) */
  var big=G.vw>860;
  /* 4g: the renditions come from content (heroVideo) through src/tenant/videos.generated.json, never a fixed file:
     desktop (> 860 px) the 1080-wide tier, phones the 720 tier, as in the mockup; WebM before MP4 */
  (big?D.desk:D.phone).forEach(function(s){var o=document.createElement('source');o.src=s.src;o.type=s.type;video.appendChild(o)});
  zm.appendChild(video);
  video.addEventListener('playing',function(){zm.classList.add('playing');if(GL.ok)GL.src=video;document.getElementById('loadNote').textContent='';});
  video.addEventListener('error',function(){},true);
  if(inView) video.play().catch(function(){});
}

var raf=0;
function loop(){
  raf=requestAnimationFrame(loop);
  GL.lx+=(GL.tlx-GL.lx)*0.08;
  if(GL.ok&&GL.src&&inView) GL.draw();
}

if(motion){
  measure(); frame(progress());
  var poster=zm.querySelector('img');
  addEventListener('scroll',function(){frame(progress());onScrollHeader();},{passive:true});
  addEventListener('resize',function(){measure();frame(progress());});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){measure();frame(progress());});
  addEventListener('pointermove',function(e){ if(e.pointerType!=='mouse'||!S.box) return;
    GL.tlx=clamp((e.clientX-S.box.x)/S.box.w,-.2,1.2);},{passive:true});
  new IntersectionObserver(function(es){inView=es[0].isIntersecting;
    if(video){inView?video.play().catch(function(){}):video.pause();}},{rootMargin:'100px'}).observe(stage);
  var boot=function(){
    initGL();
    if(GL.ok){ GL.src=poster.complete?poster:null; poster.addEventListener('load',function(){if(!GL.src)GL.src=poster}); }
    document.getElementById('loadNote').textContent="Loading the shop's reel";
    attachVideo(); loop();
  };
  var go=function(){('requestIdleCallback' in window)?requestIdleCallback(boot,{timeout:1200}):setTimeout(boot,300)};
  document.readyState==='complete'?go():addEventListener('load',go);
}else{
  addEventListener('scroll',onScrollHeader,{passive:true});
}
onScrollHeader();
})();
/* ================= the rest of the page ================= */
(function(){
'use strict';
var H=document.documentElement, still=H.classList.contains('still');

/* phone bar: in after the first scroll, never over the hero button at rest */
var bar=document.getElementById('bar');
function onBar(){bar.classList.toggle('on',scrollY>24);}
addEventListener('scroll',onBar,{passive:true});onBar();

/* slideshows: native scroll-snap tracks, dots + arrows on top */
document.querySelectorAll('[data-show]').forEach(function(show){
  var track=show.querySelector('.track'), dots=[].slice.call(show.querySelectorAll('.dot')), n=dots.length, cur=0;
  function go(i,smooth){i=(i+n)%n;track.scrollTo({left:i*track.clientWidth,behavior:(smooth&&!still)?'smooth':'auto'});}
  var cnt=show.querySelector('.q-count');
  function sync(){var i=Math.round(track.scrollLeft/Math.max(1,track.clientWidth));if(i!==cur){cur=i;dots.forEach(function(d,j){d.setAttribute('aria-current',j===i?'true':'false')});if(cnt)cnt.textContent=(i+1)+' / '+n;}}
  track.addEventListener('scroll',function(){requestAnimationFrame(sync)},{passive:true});
  dots.forEach(function(d,j){d.addEventListener('click',function(){go(j,true)})});
  var p=show.querySelector('.prev'),nx=show.querySelector('.next');
  if(p)p.addEventListener('click',function(){go(cur-1,true)});
  if(nx)nx.addEventListener('click',function(){go(cur+1,true)});
  track.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1,true)}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1,true)}});
});

/* card boards lean toward the pointer (fine pointers only) */
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!still){
  document.querySelectorAll('[data-tilt]').forEach(function(c){
    var img=c.querySelector('.card-board img');
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      img.style.setProperty('--ry',(x*10).toFixed(2)+'deg');img.style.setProperty('--rx',(-y*6).toFixed(2)+'deg');img.style.setProperty('--rz',(x*2).toFixed(2)+'deg');});
    c.addEventListener('pointerleave',function(){['--ry','--rx','--rz'].forEach(function(k){img.style.setProperty(k,'0deg')})});
  });
}

/* shop photos settle from 0.98 to 1 as they come in (transform only) */
if(!still&&'IntersectionObserver' in window){
  var ms=document.querySelectorAll('.m');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  ms.forEach(function(m){var r=m.getBoundingClientRect();if(r.top>innerHeight){m.classList.add('pre');io.observe(m)}});
}

/* ---------- the plan drawer ---------- */
var plan=document.getElementById('book'), panel=plan.querySelector('.plan-panel'), back=plan.querySelector('.plan-back'), opener=null;
var steps=[].slice.call(plan.querySelectorAll('.step'));
function show(name){steps.forEach(function(s){s.classList.toggle('on',s.dataset.step===name)});back.hidden=name==='start';
  var f=plan.querySelector('.step.on .tile, .step.on .seg button, .step.on a.btn');}
function focusables(){return [].slice.call(panel.querySelectorAll('a[href],button:not([hidden])')).filter(function(el){return el.offsetParent!==null})}
function open(e){if(e)e.preventDefault();opener=document.activeElement;show('start');plan.classList.add('open');document.body.style.overflow='hidden';
  history.replaceState(null,'','#book');setTimeout(function(){plan.querySelector('.plan-x').focus()},60);}
function close(){plan.classList.remove('open');document.body.style.overflow='';history.replaceState(null,'',location.pathname+location.search);if(opener&&opener.focus)opener.focus();}
document.querySelectorAll('[data-plan]').forEach(function(a){a.addEventListener('click',open)});
plan.querySelectorAll('[data-close]').forEach(function(b){b.addEventListener('click',close)});
back.addEventListener('click',function(){show('start');plan.querySelector('.tile').focus()});
plan.querySelectorAll('[data-go]').forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();show(t.dataset.go);
  var f=plan.querySelector('.step.on .tile, .step.on .seg button, .step.on a.btn');if(f)f.focus();})});
plan.addEventListener('keydown',function(e){
  if(!plan.classList.contains('open'))return;
  if(e.key==='Escape'){e.preventDefault();close();return}
  if(e.key==='Tab'){var f=focusables();if(!f.length)return;var a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
});
Object.defineProperty(plan,'open',{get:function(){return plan.classList.contains('open')}});
if(location.hash==='#book')open();
/* room tiles: pick one, then the hand-off to Booking.com */
var ho=plan.querySelector('[data-handoff]');
plan.querySelectorAll('[data-room]').forEach(function(b){b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){
  plan.querySelectorAll('[data-room]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
  ho.querySelector('[data-sum]').textContent=b.dataset.room;ho.hidden=false;ho.querySelector('a').focus({preventScroll:false});})});
/* surf week: package x room -> the published price, rolled in */
var pk=plan.querySelectorAll('[data-pk]'), rm=plan.querySelectorAll('[data-r]'), tot=plan.querySelector('[data-total]'), mail=plan.querySelector('[data-mail]');
var rooms=['private room','shared double room','shared triple room'];
function pick(list,b){list.forEach(function(x){x.setAttribute('aria-checked',x===b?'true':'false')});}
function price(){var p=plan.querySelector('[data-pk][aria-checked="true"]'),r=plan.querySelector('[data-r][aria-checked="true"]');
  var v=p.dataset.p.split(',')[+r.dataset.r];tot.textContent='USD '+v;tot.classList.remove('roll');void tot.offsetWidth;tot.classList.add('roll');
  mail.href='mailto:cheekymonkeymidi@gmail.com?subject='+encodeURIComponent('Cheeky Monkey: '+p.dataset.pk+', '+rooms[+r.dataset.r]);}
pk.forEach(function(b){b.addEventListener('click',function(){pick(pk,b);price()})});
rm.forEach(function(b){b.addEventListener('click',function(){pick(rm,b);price()})});
[pk,rm].forEach(function(list){[].forEach.call(list,function(b,i){b.addEventListener('keydown',function(e){
  var d=e.key==='ArrowRight'||e.key==='ArrowDown'?1:e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:0;if(!d)return;e.preventDefault();
  var nb=list[(i+d+list.length)%list.length];nb.focus();nb.click();})})});
})();

/* the Midigama band (2.2 MB, served as published, never re-encoded): fetched only as it nears the screen */
(function(){var im=document.querySelector('.atmo img[data-src]');if(!im)return;
  function go(){im.onload=function(){im.removeAttribute('data-src')};im.src=im.getAttribute('data-src');}
  if(!('IntersectionObserver' in window)){go();return}
  var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();go()}},{rootMargin:'600px 0px'});io.observe(im);})();
