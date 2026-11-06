(function(){
'use strict';
/* Round 2: the hero is the drone loop (heroVideo, schema v0.9 snippet): the poster paints first, the sources are
   attached after load + one frame, never under reduced motion or Save-Data (html.still), and the footage pauses
   off screen. The shop reel in the intro's board window (videos[0]) is attached only as it nears the screen. */
var H=document.documentElement, still=!H.classList.contains('motion');
var top=document.getElementById('top');
function onScrollHeader(){top.classList.toggle('solid', scrollY>24);}
addEventListener('scroll',onScrollHeader,{passive:true});onScrollHeader();

function attach(video){
  [].forEach.call(video.querySelectorAll('source[data-src]'),function(s){
    if(s.media&&!matchMedia(s.media).matches) s.remove(); /* older engines ignore `media` on <source> */
    else {s.src=s.getAttribute('data-src');s.removeAttribute('data-src');}
  });
  video.addEventListener('playing',function(){video.classList.add('on');},{once:true});
  video.load();
}
function play(v){var p=v.play();if(p&&p.catch)p.catch(function(){});} /* autoplay refused: the poster stays */
function watch(el,video,margin,first){
  var ready=false;
  if(!('IntersectionObserver' in window)){first();ready=true;play(video);return}
  new IntersectionObserver(function(es){var on=es[0].isIntersecting;
    if(on&&!ready){ready=true;first();}
    if(ready){on?play(video):video.pause();}
  },{rootMargin:margin}).observe(el);
}
if(!still){
  var hv=document.querySelector('video[data-hero-video]');
  if(hv){
    var later=function(){requestAnimationFrame(function(){setTimeout(function(){
      watch(document.getElementById('hero'),hv,'0px',function(){attach(hv);});
    },0)})};
    document.readyState==='complete'?later():addEventListener('load',later,{once:true});
  }
  /* round 3 (experience r2 fix 1): the board's reel is never part of the first load. It is armed only once the hero
     loop is playing, or at the visitor's first scroll, whichever comes first (or after load when there is no hero
     loop, or it fails), and then attaches as the board nears the screen */
  var board=document.querySelector('[data-reel]'), rv=board&&board.querySelector('video');
  if(rv){
    var armed=false;
    var arm=function(){if(armed)return;armed=true;removeEventListener('scroll',arm);
      rv.addEventListener('playing',function(){board.classList.remove('loading');},{once:true});
      watch(board,rv,'200px 0px',function(){board.classList.add('loading');attach(rv);});};
    addEventListener('scroll',arm,{passive:true});
    if(hv){hv.addEventListener('playing',arm,{once:true});hv.addEventListener('error',arm,true);}
    else document.readyState==='complete'?arm():addEventListener('load',arm,{once:true});
  }
}
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
  var cnt=show.querySelector('.q-count'), fit=track.classList.contains('q-track');
  /* round 3: the quote slideshow takes the height of the quote on show (no empty card under a short one) */
  function size(){if(fit){var li=track.children[cur];if(li)track.style.height=li.offsetHeight+'px';}}
  function sync(){var i=Math.round(track.scrollLeft/Math.max(1,track.clientWidth));if(i!==cur){cur=i;dots.forEach(function(d,j){d.setAttribute('aria-current',j===i?'true':'false')});if(cnt)cnt.textContent=(i+1)+' / '+n;size();}}
  if(fit){size();addEventListener('resize',size);if(document.fonts)document.fonts.ready.then(size);}
  track.addEventListener('scroll',function(){requestAnimationFrame(sync)},{passive:true});
  dots.forEach(function(d,j){d.addEventListener('click',function(){go(j,true)})});
  var p=show.querySelector('.prev'),nx=show.querySelector('.next');
  if(p)p.addEventListener('click',function(){go(cur-1,true)});
  if(nx)nx.addEventListener('click',function(){go(cur+1,true)});
  track.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1,true)}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1,true)}});
});

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

/* ---------- the Rosa forecast (playbook §4 exception; 2026-11-04, Alon: Rosa's `rams`) ----------
   Port of sites/layday-surf-ahangama/final (same mechanics as KA and The Lavish Haven). One request to Rosa's
   per-spot JSON, made only when the block nears the viewport. With fresh data (under 24 h) the site draws the
   headline, and only then is Rosa's widget iframe given its src. On failure, stale data, a 10 s timeout or no JS:
   the plain link in the widget's reserved box. The headline's box stays reserved (hidden) when the block is on or
   above the screen, so nothing shifts; when it fails while still below the screen, the empty box is dropped. */
var fc=document.querySelector('.fc');
if(fc){
  var fNow=fc.querySelector('.fc-now'), fRosa=fc.querySelector('.fc-rosa'), fFrame=fRosa.querySelector('iframe');
  var fSet=function(k,v){var el=fNow.querySelector('[data-f="'+k+'"]');if(el){el.textContent=v;el.hidden=!v;}};
  var fFail=function(){delete fNow.dataset.loading;fc.classList.add('off');
    if(fc.getBoundingClientRect().top>innerHeight) fc.classList.add('solo');};
  var WORDS=['north','north-east','east','south-east','south','south-west','west','north-west'];
  var from=function(deg){return WORDS[Math.round((((+deg%360)+360)%360)/45)%8];};
  var parts=function(iso,tz,o){var d=new Date(iso);if(isNaN(d))throw new Error('bad time');var r={};
    new Intl.DateTimeFormat('en-GB',Object.assign({timeZone:tz,hourCycle:'h23'},o)).formatToParts(d).forEach(function(x){r[x.type]=x.value});return r;};
  var f1=function(x){return (+x).toFixed(1);}, n1=function(x){return String(+(+x).toFixed(1));};
  var fit=function(){ /* the height range never wraps: it shrinks to the card's width if it must */
    var nh=fNow.querySelector('.nh');nh.style.fontSize='';
    var avail=fNow.querySelector('.live').clientWidth, w=nh.getBoundingClientRect().width;
    if(!avail||w<=avail)return;
    var fs=parseFloat(getComputedStyle(nh).fontSize)*avail/w;
    for(var i=0;i<12;i++){nh.style.fontSize=Math.floor(fs)+'px';if(nh.getBoundingClientRect().width<=avail)break;fs-=2;}
  };
  var draw=function(d){
    var c=d.current, tz=(d.spot&&d.spot.timezone)||'Asia/Colombo';
    if(!c||!Array.isArray(c.h)||!isFinite(c.h[0])||!isFinite(c.h[1]))throw new Error('no current');
    var nh=fNow.querySelector('.nh');
    if(!nh.firstChild||nh.firstChild.nodeType!==3)nh.insertBefore(document.createTextNode(''),nh.firstChild);
    nh.firstChild.textContent=f1(c.h[0])+'–'+f1(c.h[1]);
    var t=parts(c.t,tz,{weekday:'long',day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'});
    fSet('t',t.weekday+' '+t.day+' '+t.month+', '+t.hour+':'+t.minute);
    var sw=(c.swells||[]).filter(function(x){return x.in_window})[0];
    fSet('swell',sw&&isFinite(sw.period)?'Swell '+f1(sw.period)+' s from the '+from(sw.dir):'');
    var w=c.wind;
    fSet('wind',w&&isFinite(w.kph)?'Wind '+n1(w.kph)+' km/h from the '+from(w.dir)+(w.class?', '+w.class:''):'');
    var u=parts(d.generated_at,tz,{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'});
    fSet('upd','Rosa, updated '+u.day+' '+u.month+' '+u.year+', '+u.hour+':'+u.minute);
    fc.classList.add('live');
    fit();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
    var lastW=fNow.clientWidth;
    if('ResizeObserver' in window)new ResizeObserver(function(){if(fNow.clientWidth!==lastW){lastW=fNow.clientWidth;fit();}}).observe(fNow);
  };
  /* a cross-origin iframe fires `load` even when its request failed (it loads the browser's error page), so the
     widget is shown only when a HEAD request to the same URL answered OK (rosa.surf/widget/ answers HEAD 200 with
     access-control-allow-origin *, checked 2026-11-04) AND the frame has loaded, within 10 s. Otherwise the frame
     loses its src and the plain link, visible all along in the same reserved box, stays. */
  var widget=function(){
    var src=fFrame.dataset.src, done=false, to;
    fRosa.dataset.loading='true';
    var end=function(show){if(done)return;done=true;clearTimeout(to);delete fRosa.dataset.loading;
      if(show)fRosa.classList.add('on');else{fRosa.classList.remove('on');fFrame.removeAttribute('src');}};
    to=setTimeout(function(){end(false)},10000);
    fetch(src,{method:'HEAD',credentials:'omit'}).then(function(r){
      if(!r.ok)throw new Error(r.status);
      fFrame.addEventListener('load',function(){end(true)},{once:true});
      fFrame.src=src;
    }).catch(function(){end(false)});
  };
  /* rosa.surf sends frame-ancestors *, which does not match a file:// page: there, the link */
  if(!('IntersectionObserver' in window)||!window.fetch||!window.Intl||location.protocol==='file:')fFail();
  else{
    var fio=new IntersectionObserver(function(es){
      if(!es.some(function(e){return e.isIntersecting}))return;
      fio.disconnect();
      fNow.dataset.loading='true';
      var ac='AbortController' in window?new AbortController():null;
      var to=setTimeout(function(){if(ac)ac.abort()},10000);
      fetch(fc.dataset.json,{credentials:'omit',signal:ac&&ac.signal})
        .then(function(r){return r.ok?r.json():Promise.reject(new Error(r.status))})
        .then(function(d){
          var age=Date.now()-Date.parse(d.generated_at);
          if(!(age>=-36e5&&age<864e5))throw new Error('stale');
          draw(d);
          delete fNow.dataset.loading;
          widget();
        })
        .catch(fFail)
        .then(function(){clearTimeout(to)});
    },{rootMargin:'400px 0px'});
    fio.observe(fc);
  }
}
})();
