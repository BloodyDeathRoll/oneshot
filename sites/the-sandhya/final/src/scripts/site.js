// sites/the-sandhya/final/src/scripts/site.js — the page's one script, inlined at the end of <body>.
// Ported from the calm mockup's script unchanged, plus the 4g parts marked "4g:". Every part is an
// enhancement: with JS off the page, the strips and every engine link work as they are.
(function(){
  document.querySelectorAll('img').forEach(function(im){if(im.complete&&im.naturalWidth)im.classList.add('in')});
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
  var L=document.body.dataset;

  // 4g: the hero first. Photographs below it that the browser would fetch early (the doors, each room's
  // first photograph) wait for the hero to finish, then wake as they come near, so they never share the
  // phone's bandwidth with it. A 4 s timer covers a hero that stalls.
  var heroImg=document.querySelector('.hero-media img'),heroWaits=[],heroDone=false;
  var heroReady=function(){if(heroDone)return;heroDone=true;heroWaits.forEach(function(f){f()})};
  var afterHero=function(f){if(heroDone)f();else heroWaits.push(f)};
  if(!heroImg||(heroImg.complete&&heroImg.naturalWidth))heroReady();
  else{heroImg.addEventListener('load',heroReady);heroImg.addEventListener('error',heroReady);setTimeout(heroReady,4000)}
  var nearby=function(el,wake){afterHero(function(){
    if(!('IntersectionObserver'in window))return wake();
    var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){wake();io.disconnect()}},{rootMargin:'500px 0px'});io.observe(el);
  })};
  document.querySelectorAll('.frame > img[data-src]').forEach(function(im){nearby(im.parentNode,function(){im.src=im.dataset.src;im.removeAttribute('data-src')})});

  // Slideshows: crossfade under a mouse; under a finger the native strip stays, dots follow it.
  document.querySelectorAll('.show').forEach(function(show){
    var strip=show.querySelector('.strip'),slides=[].slice.call(strip.children),dotsEl=show.querySelector('.dots'),cur=0,name=show.getAttribute('aria-label');
    var dots=slides.map(function(_,i){
      var b=document.createElement('button');b.className='dot';b.type='button';b.setAttribute('aria-label',name+', '+L.lPhoto+' '+(i+1)+' '+L.lOf+' '+slides.length);
      b.addEventListener('click',function(){go(i)});dotsEl.appendChild(b);return b;
    });
    function mark(i){cur=i;dots.forEach(function(d,j){d.setAttribute('aria-current',j===i?'true':'false')});slides.forEach(function(s,j){s.classList.toggle('on',j===i)})}
    function go(i){
      i=(i+slides.length)%slides.length;
      if(fine)mark(i);else{strip.scrollTo({left:strip.clientWidth*i,behavior:calm?'auto':'smooth'});mark(i)}
    }
    var wake=function(){slides.forEach(function(s){var im=s.querySelector('img[data-src]');if(im){im.srcset=im.dataset.srcset;im.src=im.dataset.src;im.removeAttribute('data-src')}})};
    nearby(show,wake);
    if(fine){
      show.classList.add('fade');
      var stage=show.querySelector('.stage');
      [['prev',-1,L.lPrev],['next',1,L.lNext]].forEach(function(c){
        var b=document.createElement('button');b.type='button';b.className='step '+c[0];b.setAttribute('aria-label',name+': '+c[2]);
        b.innerHTML='<svg class="ic" aria-hidden="true"><use href="#i-arrow"/></svg>';
        b.addEventListener('click',function(){go(cur+c[1])});stage.appendChild(b);
      });
    }else{
      var t;strip.addEventListener('scroll',function(){cancelAnimationFrame(t);t=requestAnimationFrame(function(){mark(Math.round(strip.scrollLeft/strip.clientWidth))})},{passive:true});
    }
    strip.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)}else if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)}});
    mark(0);
  });

  // The ±4rem image parallax (references #17), desktop only.
  if(!calm&&matchMedia('(min-width: 768px)').matches&&'IntersectionObserver'in window){
    var rem=parseFloat(getComputedStyle(document.documentElement).fontSize)*4,live=new Set(),tick=0;
    var run=function(){tick=0;var vh=innerHeight;live.forEach(function(el){var r=el.getBoundingClientRect(),p=((r.top+r.height/2)-vh/2)/(vh/2+r.height/2);p=Math.max(-1,Math.min(1,p));el.querySelector('img').style.transform='translate3d(0,'+(-p*rem).toFixed(1)+'px,0)'})};
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)live.add(e.target);else live.delete(e.target)});run()},{rootMargin:'10% 0px'});
    document.querySelectorAll('[data-px],.bleed').forEach(function(t){io.observe(t)});
    addEventListener('scroll',function(){if(!tick)tick=requestAnimationFrame(run)},{passive:true});
  }

  // The details row: a mouse can drag it, with momentum; a finger has the native scroll.
  var row=document.getElementById('details');
  if(row){
    // 4g (critic, dimension 6): the row took focus without coming into view.
    row.addEventListener('focus',function(){var r=row.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)row.scrollIntoView({block:'center',behavior:calm?'auto':'smooth'})});
  }
  if(row&&fine){
    var down=false,sx=0,sl=0,lx=0,lt=0,vel=0,raf=0;
    row.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;sx=lx=e.clientX;sl=row.scrollLeft;lt=e.timeStamp;vel=0;cancelAnimationFrame(raf);row.classList.add('drag');row.setPointerCapture(e.pointerId)});
    row.addEventListener('pointermove',function(e){if(!down)return;row.scrollLeft=sl-(e.clientX-sx);var dt=e.timeStamp-lt;if(dt>0)vel=(lx-e.clientX)/dt;lx=e.clientX;lt=e.timeStamp});
    var up=function(){if(!down)return;down=false;if(calm){row.classList.remove('drag');return}var glide=function(){row.scrollLeft+=vel*16;vel*=.94;if(Math.abs(vel)>.02)raf=requestAnimationFrame(glide);else row.classList.remove('drag')};glide()};
    row.addEventListener('pointerup',up);row.addEventListener('pointercancel',up);
  }

  // The phone bar rises once the first screen's own button has gone.
  var bar=document.getElementById('bar'),heroBook=document.getElementById('hero-book');
  if(bar&&heroBook&&'IntersectionObserver'in window){
    new IntersectionObserver(function(es){bar.classList.toggle('up',!es[0].isIntersecting)}).observe(heroBook);
  }else if(bar)bar.classList.add('up');


  // 4g: the date fields (Alon, gate b). Two sets, one state: one after the rooms (by "Nightly rates are on
  // our booking page…") and one in the booking card. Each engine link keeps its own href as written in the
  // HTML; with both dates chosen, check-in today or later and check-out after it, every engine link gets
  // them in the format the audit saw the engine receive (#checkin=YYYY-MM-DD&checkout=YYYY-MM-DD), and the
  // buttons name them ("Check 9–12 Dec · 3 nights"; labels in src/lib/labels.mjs). With one date or none,
  // every link and label goes back to what the HTML says, so booking without dates is still one tap and no
  // date is shown that the engine does not get. The pair is kept in sessionStorage, so Back from the
  // engine keeps it. Nobody has yet seen the engine honour the dates (notes.md).
  var sets=[].slice.call(document.querySelectorAll('[data-dates]'));
  if(sets.length){
    var links=[].slice.call(document.querySelectorAll('a[data-engine]'));
    links.forEach(function(a){a.dataset.base=a.getAttribute('href');var l=a.querySelector('.lbl');if(l)a.dataset.label=l.textContent});
    var ins=[],outs=[],notes=[];
    sets.forEach(function(s){ins.push(s.querySelector('.d-in'));outs.push(s.querySelector('.d-out'));notes.push(s.querySelector('.dates-note'))});
    var pad=function(n){return(n<10?'0':'')+n};
    var iso=function(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
    var day=function(s){var p=s.split('-');return new Date(+p[0],p[1]-1,+p[2])};
    var after=function(s){var d=day(s);d.setDate(d.getDate()+1);return iso(d)};
    var today=iso(new Date()),KEY='sandhya-dates',lang=document.documentElement.lang||'en';
    var cur={a:'',b:''},active=null;
    var mon=function(d){return d.toLocaleDateString(lang,{month:'short'})};
    var range=function(a,b){
      var x=day(a),y=day(b);
      if(x.getFullYear()!==y.getFullYear())return x.getDate()+' '+mon(x)+' '+x.getFullYear()+' – '+y.getDate()+' '+mon(y)+' '+y.getFullYear();
      if(x.getMonth()!==y.getMonth())return x.getDate()+' '+mon(x)+' – '+y.getDate()+' '+mon(y);
      return x.getDate()+'–'+y.getDate()+' '+mon(y);
    };
    var fill=function(t,v){return t.replace(/\{(\w+)\}/g,function(m,k){return k in v?v[k]:m})};
    var put=function(a,b){
      cur.a=a;cur.b=b;
      ins.forEach(function(i){i.value=a;i.min=today});
      outs.forEach(function(o){o.value=b;o.min=a?after(a):after(today)});
    };
    var apply=function(){
      var a=cur.a,b=cur.b,ok=!!a&&!!b&&a>=today&&b>a,v;
      if(ok){var n=Math.round((Date.UTC.apply(null,b.split('-').map(function(x,i){return i===1?x-1:+x}))-Date.UTC.apply(null,a.split('-').map(function(x,i){return i===1?x-1:+x})))/864e5);v={range:range(a,b),nights:fill(n===1?L.lNight:L.lNights,{n:n})}}
      links.forEach(function(l){
        l.href=ok?l.dataset.base+'#checkin='+a+'&checkout='+b:l.dataset.base;
        var lb=l.querySelector('.lbl');
        if(lb)lb.textContent=ok?(l.dataset.room?fill(L.lRoom,{room:l.dataset.room,range:v.range,nights:v.nights}):fill(L.lCta,v)):l.dataset.label;
      });
      notes.forEach(function(n,i){n.textContent=(a||b)&&!ok&&(active===null||active===i)?L.lHalf:''});
      try{if(ok)sessionStorage.setItem(KEY,JSON.stringify({a:a,b:b}));else sessionStorage.removeItem(KEY)}catch(e){}
    };
    ins.forEach(function(inp,i){inp.addEventListener('change',function(){
      var a=inp.value,b=cur.b;
      if(a&&(!b||b<=a))b=after(a);
      active=i;put(a,b);apply();
    })});
    outs.forEach(function(out,i){out.addEventListener('change',function(){active=i;put(cur.a,out.value);apply()})});
    var saved=null;
    try{saved=JSON.parse(sessionStorage.getItem(KEY)||'null')}catch(e){}
    if(saved&&saved.a>=today&&saved.b>saved.a)put(saved.a,saved.b);else put('','');
    addEventListener('pageshow',function(){put(cur.a,cur.b);apply()});
    sets.forEach(function(s){s.hidden=false;var d=s.querySelector('.dates');if(d)d.hidden=false});
    apply();
  }
})();
