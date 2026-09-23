/* The Lavish Haven — the gold page's script, verbatim, except where marked "4g:".
   Booking links, the room list and the strip all work with none of this. */
(function(){
"use strict";
var doc=document.documentElement, reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var $=function(id){return document.getElementById(id)};
var bar=$("bar"),hero=$("hero"),pool=$("pool"),rim=$("rim"),canvas=$("water"),heroCopy=$("heroCopy"),cue=$("cue"),line=$("nightLine"),print=$("nightPrint");

/* ───────── booking drawer (links work without any of this) ───────── */
var drawer=$("drawer"),scrim=$("scrim"),picked=$("picked"),lastFocus=null;
function openDrawer(room){
  lastFocus=document.activeElement;
  if(room){picked.hidden=false;/* 4g: the gold line added a lookup hint that holds for one listing only; cut to what the page knows (notes.md) */picked.textContent="You were looking at the "+room+".";}else{picked.hidden=true;}
  doc.classList.add("open");$("top").inert=true;drawer.focus();
}
function closeDrawer(){doc.classList.remove("open");$("top").inert=false;if(lastFocus)lastFocus.focus();}
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-book]");
  if(t){e.preventDefault();openDrawer(t.getAttribute("data-room"));}
});
$("closeDrawer").addEventListener("click",closeDrawer);scrim.addEventListener("click",closeDrawer);
drawer.addEventListener("keydown",function(e){
  if(e.key==="Escape"){closeDrawer();return;}
  if(e.key!=="Tab")return;
  var f=drawer.querySelectorAll("a,button"),a=f[0],z=f[f.length-1];
  if(e.shiftKey&&(document.activeElement===a||document.activeElement===drawer)){e.preventDefault();z.focus();}
  else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}
});

/* ───────── drag to scroll the photo strip ───────── */
(function(){var s=$("strip"),down=false,x0=0,l0=0,moved=0;
  s.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse")return;down=true;x0=e.clientX;l0=s.scrollLeft;moved=0;s.setPointerCapture(e.pointerId);});
  s.addEventListener("pointermove",function(e){if(!down)return;var d=e.clientX-x0;moved=Math.abs(d);if(moved>4)s.classList.add("drag");s.scrollLeft=l0-d;});
  ["pointerup","pointercancel"].forEach(function(n){s.addEventListener(n,function(){down=false;s.classList.remove("drag");});});
})();

/* ───────── water ───────── */
/* 4g: under reduced motion the gold page still created an opaque WebGL context and never drew into it, so the pool was a black shape (seen in the gold page too); now no context is made and the CSS noon-blue gradient shows */
var gl=null;if(!reduce){try{gl=canvas.getContext("webgl",{antialias:false,alpha:false,powerPreference:"low-power"});}catch(e){}}
if(!gl||reduce){ headerOnly(); return; }

var VS="attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
var FS=[
"precision highp float;",
"uniform vec2 uRes;uniform float uT;uniform float uNight;uniform vec4 uRip[6];",
"float height(vec2 p,float t){",
"  float h=0.;",
"  h+=.50*sin(dot(p,vec2( .80, .60))*1.6+t*.90);",
"  h+=.35*sin(dot(p,vec2(-.55, .83))*2.3+t*1.15);",
"  h+=.22*sin(dot(p,vec2( .95,-.30))*3.7-t*1.40);",
"  h+=.12*sin(dot(p,vec2(-.20,-.98))*6.1+t*1.90);",
"  for(int i=0;i<6;i++){vec4 r=uRip[i];float a=t-r.z;if(r.w>.5&&a<3.5){float d=length(p-r.xy);",
"    h+=.9*sin(26.*(d-a*.55))*exp(-d*3.2)*exp(-a*1.3)*smoothstep(0.,.08,a*.55-d+.35);}}",
"  return h;}",
"vec2 hash2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return fract(sin(p)*43758.5453);}",
"float cells(vec2 p,float t){vec2 n=floor(p),f=fract(p);float d1=8.,d2=8.;",
"  for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){vec2 g=vec2(float(i),float(j));vec2 o=hash2(n+g);o=.5+.42*sin(t+6.2831*o);",
"    float d=length(g+o-f);if(d<d1){d2=d1;d1=d;}else if(d<d2){d2=d;}}",
"  return d2-d1;}",
"vec2 warp(vec2 p,float t){p.x+=.28*sin(1.3*p.y+t*.50)+.12*sin(2.9*p.y-t*.7);p.y+=.28*cos(1.1*p.x+t*.42)+.12*cos(3.1*p.x+t*.6);return p;}",
"float net(vec2 p,float t){p=warp(p,t);float e=cells(p,t*.9);return pow(1.-smoothstep(0.,.22,e),2.2);}",
"void main(){",
"  vec2 uv=gl_FragCoord.xy/uRes;float asp=uRes.x/uRes.y;",
"  float far=mix(1.,1.7,uv.y);",                       /* the far end of the pool is further away */
"  vec2 p=vec2((uv.x-.5)*asp,uv.y*1.25)*far*2.4;",
"  float t=uT;",
"  float e=.035;float h=height(p,t);",
"  vec2 g=vec2(height(p+vec2(e,0.),t)-h,height(p+vec2(0.,e),t)-h)/e;",
"  vec2 q=p+g*.055;",                                   /* what the ripple does to the floor of the pool */
"  vec2 tl=abs(fract(q*13.)-.5);float grout=smoothstep(.44,.5,max(tl.x,tl.y));",
"  float tone=fract(sin(dot(floor(q*13.),vec2(12.9898,78.233)))*43758.5453);", /* mosaic: no two tiles quite the same blue */
"  float c=net(q*1.25,t*.9)*.8+.45*net(q*2.1+7.3,t*1.2);",
"  vec3 dayA=vec3(.16,.74,.93),dayB=vec3(.04,.56,.85);",
"  vec3 ngtA=vec3(.07,.36,.66),ngtB=vec3(.02,.10,.30);",
"  vec3 day=mix(dayA,dayB,uv.y*.9+.1*tone)-grout*.05;day+=vec3(.78,.92,.9)*c*.5;",
"  vec3 ngt=mix(ngtA,ngtB,smoothstep(0.,1.,uv.y*1.1)+.06*tone)-grout*.035;",
"  float lamps=0.;",                                   /* the underwater lamps in img-002 */
"  lamps+=exp(-length((uv-vec2(.16,.30))*vec2(asp,1.6))*5.5);",
"  lamps+=exp(-length((uv-vec2(.55,.18))*vec2(asp,1.6))*5.0);",
"  lamps+=exp(-length((uv-vec2(.90,.42))*vec2(asp,1.6))*6.0)*.8;",
"  ngt+=vec3(.42,.74,1.)*lamps*(.5+.8*c);ngt+=vec3(.2,.42,.75)*c*.16;",
"  vec3 col=mix(day,ngt,uNight);",
"  col+=g.y*mix(.05,.03,uNight);",
"  gl_FragColor=vec4(col,1.);}"
].join("\n");
function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(s));return null;}return s;}
/* 4g: WebGL setup is a function so it can run again after a lost context. In headless Chromium this
   build lost its context ~once in six loads (the gold page, whose script ran later behind Google Fonts,
   0 of 6). On loss the canvas is hidden, so the pool shows its CSS noon-blue gradient, and the water
   comes back if the browser restores the context. */
var pr,uRes,uT,uNight,uRip,glOk=true;
function setup(){
var vs=sh(gl.VERTEX_SHADER,VS),fs=sh(gl.FRAGMENT_SHADER,FS);
if(!vs||!fs)return false;
pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);
if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return false;
gl.useProgram(pr);
var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
var loc=gl.getAttribLocation(pr,"a");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
uRes=gl.getUniformLocation(pr,"uRes");uT=gl.getUniformLocation(pr,"uT");uNight=gl.getUniformLocation(pr,"uNight");uRip=gl.getUniformLocation(pr,"uRip");
return true;}
if(!setup()){ headerOnly(); return; }
canvas.addEventListener("webglcontextlost",function(e){e.preventDefault();glOk=false;canvas.style.visibility="hidden";});
canvas.addEventListener("webglcontextrestored",function(){if(setup()){glOk=true;canvas.style.visibility="";size();}});

doc.classList.add("motion");

var W=0,H=0,scale=1;
function size(){var r=canvas.getBoundingClientRect();scale=Math.min(window.devicePixelRatio||1,1.5)*(r.width>900?.8:1);
  W=Math.max(2,Math.round(r.width*scale));H=Math.max(2,Math.round(r.height*scale));canvas.width=W;canvas.height=H;gl.viewport(0,0,W,H);}
size();addEventListener("resize",size);

/* ripples: the water answers the pointer */
var rip=new Float32Array(24),ri=0,lx=-1,ly=-1,t0=performance.now();
function now(){return (performance.now()-t0)/1000;}
function toP(cx,cy){var r=canvas.getBoundingClientRect(),u=(cx-r.left)/r.width,v=1-(cy-r.top)/r.height,asp=r.width/r.height,far=1+.7*v;return [(u-.5)*asp*far*2.4,v*1.25*far*2.4];}
function drop(cx,cy){var p=toP(cx,cy),k=ri*4;rip[k]=p[0];rip[k+1]=p[1];rip[k+2]=now();rip[k+3]=1;ri=(ri+1)%6;}
$("stage").addEventListener("pointermove",function(e){var dx=e.clientX-lx,dy=e.clientY-ly;if(dx*dx+dy*dy>110*110){lx=e.clientX;ly=e.clientY;drop(lx,ly);}},{passive:true});
$("stage").addEventListener("pointerdown",function(e){lx=e.clientX;ly=e.clientY;drop(lx,ly);},{passive:true});

/* the pool's outline: a rectangle with one corner cut, as it is built. It opens to the full screen as you scroll. */
var mq=matchMedia("(max-width:760px)");
var FROM_D=[[55,33],[100,27],[100,100],[84,100],[44,61]],FROM_M=[[24,60],[100,54],[100,100],[36,100],[4,82]],TO=[[0,0],[100,0],[100,100],[40,100],[0,100]];
function clamp(x){return x<0?0:x>1?1:x;}
function ease(x){return x*x*(3-2*x);}
function seg(p,a,b){return ease(clamp((p-a)/(b-a)));}
var visible=true,solid=false,onWater=false;
new IntersectionObserver(function(en){visible=en[0].isIntersecting;}).observe(hero);

function frame(){
  var r=hero.getBoundingClientRect(),vh=innerHeight,total=r.height-vh,p=clamp(-r.top/total);
  /* open */
  var k=seg(p,.10,.52),F=mq.matches?FROM_M:FROM_D,pts=[],raw=[];
  for(var i=0;i<5;i++){var x=F[i][0]+(TO[i][0]-F[i][0])*k,y=F[i][1]+(TO[i][1]-F[i][1])*k;pts.push(x.toFixed(2)+"% "+y.toFixed(2)+"%");raw.push(x.toFixed(2)+","+y.toFixed(2));}
  pool.style.clipPath=k>=1?"none":"polygon("+pts.join(",")+")";rim.setAttribute("points",raw.join(" "));rim.style.opacity=1-seg(p,.30,.50);
  /* the words leave before the water reaches them */
  var out=seg(p,.02,.16);heroCopy.style.opacity=1-out;heroCopy.style.transform="translateY("+(-40*out)+"px)";heroCopy.style.visibility=out>=1?"hidden":"visible";cue.style.opacity=1-seg(p,0,.06);
  /* dusk */
  var night=seg(p,.38,.72);
  var li=seg(p,.58,.74);line.style.opacity=li;
  if(!mq.matches)line.style.transform="translateY(calc(-50% + "+(24*(1-li))+"px))";
  print.style.transform="translate3d(0,"+Math.round(1.1*vh*(1-seg(p,.72,.96)))+"px,0)";
  /* header */
  var ow=k>.97&&r.bottom>64, so=r.bottom<=64;
  if(ow!==onWater){onWater=ow;bar.classList.toggle("on-water",ow);}
  if(so!==solid){solid=so;bar.classList.toggle("solid",so);}
  if(visible&&glOk){gl.uniform2f(uRes,W,H);gl.uniform1f(uT,now());gl.uniform1f(uNight,night);gl.uniform4fv(uRip,rip);gl.drawArrays(gl.TRIANGLES,0,3);}
  /* prints drift a little against the scroll, on wide screens only */
  if(!mq.matches){for(var j=0;j<pars.length;j++){var b=pars[j].getBoundingClientRect();if(b.bottom>-200&&b.top<vh+200){var c=(b.top+b.height/2-vh/2);/* 4g: the print is now <picture><img>, so the image itself moves */pars[j].querySelector("img").style.transform="translateY("+(c*parseFloat(pars[j].getAttribute("data-par"))).toFixed(1)+"px)";}}}
  var sb=strip.getBoundingClientRect();
  if(!mq.matches&&sb.bottom>0&&sb.top<vh&&!strip.classList.contains("drag")&&!stripTouched){strip.scrollLeft=clamp(1-(sb.top+sb.height)/(vh+sb.height))*(strip.scrollWidth-strip.clientWidth)*.55;}
  requestAnimationFrame(frame);
}
var strip=$("strip"),stripTouched=false;["pointerdown","wheel","keydown","touchstart"].forEach(function(n){strip.addEventListener(n,function(){stripTouched=true;},{passive:true});});
var pars=[].slice.call(document.querySelectorAll("[data-par]"));
requestAnimationFrame(frame);

function headerOnly(){
  function f(){var b=hero.getBoundingClientRect().bottom<=64;bar.classList.toggle("solid",b);}
  addEventListener("scroll",f,{passive:true});f();
}
})();

/* ---------- 4g: the Rosa forecast, live (playbook §4 exception) — replaces the gold page's widget-only loader ----------
   One request to Rosa's per-spot JSON, made only when the wave panel nears the viewport. With fresh data
   (under 24 h) the headline is drawn in the gold page's form, and only then is Rosa's widget iframe given
   its src, so a failed network never leaves an empty widget box. On failure, stale data, a 10 s timeout,
   no IntersectionObserver / fetch, a file:// page or no JS: the plain link in the widget's reserved box,
   and the headline's box stays reserved (hidden), so nothing shifts. Same mechanics as the KA and Layday
   builds. */
(function(){
"use strict";
var fc=document.querySelector(".wave .fc");
if(!fc)return;
var now=fc.querySelector(".fc-now"),rosa=fc.querySelector(".rosa"),frame=rosa&&rosa.querySelector("iframe");
function set(k,v){var e=now.querySelector('[data-f="'+k+'"]');if(e){e.textContent=v;e.hidden=!v;}}
function fail(){delete now.dataset.loading;fc.classList.add("off");}
var WORDS=["north","north-east","east","south-east","south","south-west","west","north-west"];
function from(deg){return WORDS[Math.round((((+deg%360)+360)%360)/45)%8];}
function parts(iso,tz,o){var d=new Date(iso);if(isNaN(d))throw new Error("bad time");var opt={timeZone:tz,hourCycle:"h23"};for(var k in o)opt[k]=o[k];
  var r={};new Intl.DateTimeFormat("en-GB",opt).formatToParts(d).forEach(function(x){r[x.type]=x.value;});return r;}
function f1(x){return (+x).toFixed(1);}
function n1(x){return String(+(+x).toFixed(1));}
/* the headline never runs out of its column: shrink the type until it fits (it fits at every width tested) */
function fit(){var nh=now.querySelector(".nh");nh.style.fontSize="";var avail=now.clientWidth,w=nh.getBoundingClientRect().width;
  if(!avail||w<=avail)return;var fs=parseFloat(getComputedStyle(nh).fontSize)*avail/w;
  for(var i=0;i<12;i++){nh.style.fontSize=Math.floor(fs)+"px";if(nh.getBoundingClientRect().width<=avail)break;fs-=2;}}
function draw(d){
  var c=d.current,tz=(d.spot&&d.spot.timezone)||"Asia/Colombo";
  if(!c||!c.h||!isFinite(c.h[0])||!isFinite(c.h[1]))throw new Error("no current");
  now.querySelector('[data-f="h"]').textContent=f1(c.h[0])+"–"+f1(c.h[1]);
  var t=parts(c.t,tz,{weekday:"long",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"});
  set("t",t.weekday+" "+t.day+" "+t.month+", "+t.hour+":"+t.minute);
  var sw=(c.swells||[]).filter(function(x){return x.in_window;})[0];
  set("swell",sw&&isFinite(sw.period)?"Swell "+f1(sw.period)+" s from the "+from(sw.dir):"");
  var w=c.wind;
  set("wind",w&&isFinite(w.kph)?"Wind "+n1(w.kph)+" km/h from the "+from(w.dir)+(w["class"]?", "+w["class"]:""):"");
  var u=parts(d.generated_at,tz,{day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"});
  set("upd","Updated "+u.day+" "+u.month+", "+u.hour+":"+u.minute);
  fc.classList.add("live");
  fit();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  var lastW=now.clientWidth;
  if("ResizeObserver" in window)new ResizeObserver(function(){if(now.clientWidth!==lastW){lastW=now.clientWidth;fit();}}).observe(now);
}
/* 4g round 2 (critic full round 1, fix 4): a cross-origin iframe fires `load` even when its request was
   blocked or failed (it loads the browser's error page), so `load` alone showed an empty box with the
   link hidden. The widget is shown only when a HEAD request to the same URL has answered OK
   (rosa.surf/widget/ answers HEAD 200 with access-control-allow-origin *, checked 2026-09-23) AND the
   frame has loaded, within 10 s. Otherwise the frame loses its src and the plain link, visible all along
   in the same reserved box, stays. The headline keeps its fresh data: that request succeeded. */
function widget(){
  if(!frame)return;
  var src=frame.dataset.src,ok=false,loaded=false,done=false;
  rosa.dataset.loading="true";
  function end(show){if(done)return;done=true;clearTimeout(to);delete rosa.dataset.loading;
    if(show)rosa.classList.add("on");else{rosa.classList.remove("on");frame.removeAttribute("src");}}
  function check(){if(ok&&loaded)end(true);}
  var to=setTimeout(function(){end(false);},10000);
  fetch(src,{method:"HEAD",credentials:"omit"})
    .then(function(r){if(!r.ok)throw new Error(r.status);ok=true;
      frame.addEventListener("load",function(){loaded=true;check();},{once:true});
      frame.src=src;})
    ["catch"](function(){end(false);});
}
/* rosa.surf sends frame-ancestors *, which does not match a file:// page: there, the link */
if(!("IntersectionObserver" in window)||!window.fetch||location.protocol==="file:"){fail();return;}
var io=new IntersectionObserver(function(es){
  if(!es.some(function(e){return e.isIntersecting;}))return;
  io.disconnect();
  now.dataset.loading="true";
  var ac="AbortController" in window?new AbortController():null;
  var to=setTimeout(function(){if(ac)ac.abort();},10000);
  fetch(fc.getAttribute("data-json"),{credentials:"omit",signal:ac&&ac.signal})
    .then(function(r){return r.ok?r.json():Promise.reject(new Error(r.status));})
    .then(function(d){
      var age=Date.now()-Date.parse(d.generated_at);
      if(!(age>=-36e5&&age<864e5))throw new Error("stale");
      draw(d);delete now.dataset.loading;widget();
    })
    ["catch"](fail)
    .then(function(){clearTimeout(to);});
},{rootMargin:"400px 0px"});
io.observe(fc);
})();
