(function(){
var D=document,H=D.documentElement;
function $(s,r){return (r||D).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}
var calm=matchMedia('(prefers-reduced-motion: reduce)').matches||!!(navigator.connection&&navigator.connection.saveData);
var smooth=calm?'auto':'smooth';

/* header + phone bar */
var hd=$('#hd'),hero=$('.hero'),pbar=$('#pbar');
function onScroll(){var past=scrollY>hero.offsetHeight-80;hd.classList.toggle('solid',past);pbar.classList.toggle('on',past);pbar.setAttribute('aria-hidden',past?'false':'true');$('a',pbar).tabIndex=past?0:-1}
addEventListener('scroll',onScroll,{passive:true});onScroll();
var menu=$('.menu',hd),sheet=$('#sheet');
/* phone menu: a modal sheet; focus stays in menu button + sheet while it is open, Esc closes and returns focus */
var shut=[$('main'),$('.ft'),pbar,$('.logo',hd),$('.skip')];
function setMenu(o){sheet.classList.toggle('open',o);menu.setAttribute('aria-expanded',o);menu.setAttribute('aria-label',o?'Close menu':'Menu');
  shut.forEach(function(el){if(el){if(o)el.setAttribute('inert','');else el.removeAttribute('inert')}});
  if(o){hd.classList.add('solid');$('a',sheet).focus()}else{onScroll()}}
menu.addEventListener('click',function(){setMenu(!sheet.classList.contains('open'))});
$$('a',sheet).forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
D.addEventListener('keydown',function(e){
  if(!sheet.classList.contains('open'))return;
  if(e.key==='Escape'){setMenu(false);menu.focus();return}
  if(e.key==='Tab'){var f=[menu].concat($$('a',sheet)),i=f.indexOf(D.activeElement);
    if(e.shiftKey&&(i<=0)){e.preventDefault();f[f.length-1].focus()}
    else if(!e.shiftKey&&(i===f.length-1||i<0)){e.preventDefault();f[0].focus()}}
});
addEventListener('resize',function(){if(sheet.classList.contains('open')&&!matchMedia('(max-width:860px)').matches)setMenu(false)});

/* sources for a <video> from "a.webm|b.mp4" */
function fill(v,list){list.split('|').forEach(function(u){var s=D.createElement('source');s.src=u;s.type='video/'+u.split('.').pop();v.appendChild(s)})}

/* hero video: after first paint, never under reduced motion or Save-Data */
var hv=$('#hv');
if(!calm){addEventListener('load',function(){setTimeout(function(){
  var k=matchMedia('(max-width:700px)').matches?'p':(matchMedia('(min-width:1281px)').matches?'d':'m');
  fill(hv,hv.dataset[k]);hv.addEventListener('playing',function(){hv.classList.add('on')},{once:true});
  hv.load();var p=hv.play();if(p&&p.catch)p.catch(function(){});
},120)})}

/* a snap row with arrows and dots; onChange(index) */
function row(sc,ctl,items,opt){
  var dots=$('.dots',ctl),prev=$('.prev',ctl),next=$('.next',ctl),cur=-1;
  var ind=opt.makeDots&&matchMedia('(max-width:600px)').matches;
  if(opt.makeDots){if(ind)dots.setAttribute('aria-hidden','true');items.forEach(function(it,i){var b=D.createElement(ind?'span':'button');if(!ind){b.type='button';b.setAttribute('aria-label',opt.label(i))}dots.appendChild(b)})}
  var db=$$('button,span',dots);
  function idx(){
    if(opt.center){var c=sc.scrollLeft+sc.clientWidth/2,best=0,bd=1e9;items.forEach(function(it,i){var m=it.offsetLeft+it.offsetWidth/2,d=Math.abs(m-c);if(d<bd){bd=d;best=i}});return best}
    var l=sc.scrollLeft,best2=0;items.forEach(function(it,i){if(it.offsetLeft-sc.offsetLeft-8<=l)best2=i});if(sc.scrollLeft+sc.clientWidth>=sc.scrollWidth-4)best2=items.length-1;return best2;
  }
  function go(i){i=Math.max(0,Math.min(items.length-1,i));var it=items[i];var x=opt.center?it.offsetLeft+it.offsetWidth/2-sc.clientWidth/2:it.offsetLeft-items[0].offsetLeft;sc.scrollTo({left:x,behavior:smooth})}
  function upd(){var i=idx();if(i===cur)return;cur=i;db.forEach(function(b,j){b.setAttribute('aria-current',j===i?'true':'false')});prev.disabled=i===0;next.disabled=i===items.length-1;opt.onChange&&opt.onChange(i)}
  var t;sc.addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(upd,90)},{passive:true});
  prev.addEventListener('click',function(){go(cur-1)});next.addEventListener('click',function(){go(cur+1)});
  db.forEach(function(b,j){if(b.tagName==='BUTTON')b.addEventListener('click',function(){go(j)})});
  sc.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)}});
  return {go:go,upd:upd,jump:function(i){var it=items[i];sc.scrollLeft=opt.center?it.offsetLeft+it.offsetWidth/2-sc.clientWidth/2:0;upd()}};
}

/* the level reel: only the centred card plays */
var reel=$('#reel'),cards=$$('.lv',reel),near=false;
var R=row(reel,$('.levels .reel-ctl'),cards,{center:true,onChange:function(i){
  cards.forEach(function(c,j){c.classList.toggle('cur',j===i)});
  if(near)playCard(i);
}});
function playCard(i){
  cards.forEach(function(c,j){var v=$('video',c);if(!v)return;
    if(j===i&&!calm){if(!v.firstChild)fill(v,'video/'+c.dataset.clip+'.webm|video/'+c.dataset.clip+'.mp4');v.addEventListener('playing',function(){v.classList.add('on')},{once:true});var p=v.play();if(p&&p.catch)p.catch(function(){})}
    else{v.pause()}});
}
R.jump(matchMedia('(min-width:861px)').matches?1:0);
new IntersectionObserver(function(es){es.forEach(function(e){near=e.isIntersecting;if(near){var c=$('.lv.cur',reel);playCard(cards.indexOf(c))}else{cards.forEach(function(c){var v=$('video',c);v&&v.pause()})}})},{rootMargin:'200px 0px'}).observe(reel);

/* what's included: level switch + compare */
var inc=$('#included'),tg=$('.toggle',inc),sess=$('[data-sess]',inc);tg.hidden=false;
$$('button',tg).forEach(function(b){b.addEventListener('click',function(){
  $$('button',tg).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
  var v=b.dataset.v;inc.classList.toggle('compare',v==='compare');
  if(v!=='compare')sess.textContent=v==='3'?'5 coached surf sessions of 2 hours':'5 guided surf sessions of 2 hours';
})});

/* the pool, two ways */
var wipe=$('#wipe'),rng=$('input',wipe);
function setX(){wipe.style.setProperty('--x',rng.value+'%')}
rng.addEventListener('input',setX);setX();

/* rooms: full-screen gallery */
var gal=$('#gal'),track=$('.gal-track',gal),gdots=$('.dots',gal),gcur=0,opener=null;
function gIdx(){return Math.round(track.scrollLeft/track.clientWidth)}
function gUpd(){gcur=gIdx();$$('button',gdots).forEach(function(b,j){b.setAttribute('aria-current',j===gcur?'true':'false')});$('.prev',gal).disabled=gcur===0;$('.next',gal).disabled=gcur===track.children.length-1}
function gGo(i){i=Math.max(0,Math.min(track.children.length-1,i));track.scrollTo({left:i*track.clientWidth,behavior:smooth})}
var gt;track.addEventListener('scroll',function(){clearTimeout(gt);gt=setTimeout(gUpd,80)},{passive:true});
$('.prev',gal).addEventListener('click',function(){gGo(gcur-1)});$('.next',gal).addEventListener('click',function(){gGo(gcur+1)});
gal.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();gGo(gcur+1)}if(e.key==='ArrowLeft'){e.preventDefault();gGo(gcur-1)}});
$('.gal-x',gal).addEventListener('click',function(){gal.close()});
gal.addEventListener('close',function(){if(opener)opener.focus()});
gal.addEventListener('click',function(e){if(e.target===gal)gal.close()});
$$('.room').forEach(function(room){
  $$('.room-media button',room).forEach(function(m){m.addEventListener('click',function(){
    opener=m;var d=room.dataset,at=+m.dataset.i||0;
    $('#gal-t').textContent=d.name;$('[data-g=line]',gal).textContent=d.line;$('[data-g=det]',gal).textContent=d.det;$('[data-g=sup]',gal).textContent=d.sup;$('[data-g=go]',gal).href='book/?room='+d.room;
    track.innerHTML='';gdots.innerHTML='';
    d.photos.split(' ').forEach(function(p,i){
      var f=D.createElement('figure');f.innerHTML='<img src="img/room-'+p.split(':')[0]+'-1400.webp" width="1400" height="933" alt="">';$('img',f).alt=p.split(':').slice(1).join(':').replace(/_/g,' ');track.appendChild(f);
      var b=D.createElement('button');b.type='button';b.setAttribute('aria-label','Photo '+(i+1));b.addEventListener('click',function(){gGo(i)});gdots.appendChild(b);
    });
    gal.showModal();track.scrollLeft=at*track.clientWidth;gUpd();$('.gal-x',gal).focus();
  })});
});

/* guests: draggable quote row */
var qrow=$('#qrow'),qs=$$('.q',qrow);
row(qrow,$('.guests .reel-ctl'),qs,{makeDots:true,label:function(i){return 'Review '+(i+1)}}).upd();
var dn=false,sx=0,sl=0,moved=false;
qrow.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;moved=false;sx=e.clientX;sl=qrow.scrollLeft;qrow.classList.add('drag')});
addEventListener('pointermove',function(e){if(!dn)return;var dx=e.clientX-sx;if(Math.abs(dx)>4)moved=true;qrow.scrollLeft=sl-dx});
addEventListener('pointerup',function(){if(!dn)return;dn=false;qrow.classList.remove('drag');var i=0,bd=1e9;qs.forEach(function(q,j){var d=Math.abs(q.offsetLeft-qs[0].offsetLeft-qrow.scrollLeft);if(d<bd){bd=d;i=j}});qrow.scrollTo({left:qs[i].offsetLeft-qs[0].offsetLeft,behavior:smooth})});
qrow.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation()}},true);

/* the Rosa headline: the build's snapshot is shown only while it is under 24 h old; after that the block fetches
   Rosa's live file once, when it nears the viewport, and shows the hour that is now, or nothing (the widget's link stays) */
var fc=$('[data-fc]'),DAY=864e5;
function fresh(iso){var t=Date.parse(iso);return t&&Date.now()-t<DAY}
function compass(d){return ['north','north-east','east','south-east','south','south-west','west','north-west'][Math.round(d/45)%8]}
function n(x){return String(+x.toFixed(2))}
function drawFc(j){
  var now=Date.now(),hs=j.hours||[],c=j.current;hs.forEach(function(h){if(Date.parse(h.t)<=now)c=h});
  if(!c||now-Date.parse(c.t)>DAY/4){fc.classList.add('stale');return}
  var sw=(c.swells||[]).filter(function(x){return x.in_window})[0],t=new Date(c.t),tz=(j.spot&&j.spot.timezone)||'Asia/Colombo';
  $('[data-fh]',fc).textContent=n(c.h[0])+'–'+n(c.h[1]);
  $('[data-fw]',fc).innerHTML='';$('[data-fw]',fc).append('South Point, '+c.phrase+' ',D.createElement('br'),'at '+t.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:tz})+', '+t.toLocaleDateString('en-GB',{day:'numeric',month:'short',timeZone:tz}));
  var r=$('[data-fr]',fc);r.innerHTML='';
  if(sw){var a=D.createElement('span');a.textContent='Swell '+n(sw.h)+' m at '+n(sw.period)+' s from the '+compass(sw.dir);r.appendChild(a)}
  var w=D.createElement('span');w.textContent='Wind '+Math.round(c.wind.kph)+' km/h, '+c.wind['class'];r.appendChild(w);
  fc.classList.remove('stale');
}
var fcLive=fc&&!fresh(fc.dataset.gen);if(fcLive)fc.classList.add('stale');

/* Rosa's widget, only when its block nears the viewport. The designed card with the plain link stays until the frame
   has really loaded: the widget cannot be framed from a file: page (Rosa's frame-ancestors), and a refused or failed
   request leaves the card in place */
var rosa=$('#rosa');
new IntersectionObserver(function(es,o){es.forEach(function(e){if(!e.isIntersecting)return;o.disconnect();
  if(fcLive&&/^https?:$/.test(location.protocol))fetch('https://rosa-data-opal.vercel.app/data/spots/south-point.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){if(fresh(j.generated_at))drawFc(j)}).catch(function(){});
  if(!/^https?:$/.test(location.protocol))return;
  fetch(rosa.dataset.src,{mode:'no-cors'}).then(function(){
    var f=D.createElement('iframe');f.src=rosa.dataset.src;f.title='Rosa surf forecast - South Point';f.width='100%';f.height='500';f.loading='lazy';f.referrerPolicy='strict-origin-when-cross-origin';
    f.setAttribute('sandbox','allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin');
    f.style.opacity='0';f.addEventListener('load',function(){f.style.opacity='';rosa.classList.add('has')});
    rosa.appendChild(f);
  }).catch(function(){});
})},{rootMargin:'400px 0px'}).observe(rosa);
})();
