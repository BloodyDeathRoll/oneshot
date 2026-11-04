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
})();
