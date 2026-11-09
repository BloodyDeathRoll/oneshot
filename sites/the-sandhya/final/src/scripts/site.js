// sites/the-sandhya/final/src/scripts/site.js — the page's one script, inlined at the end of <body>.
// Ported from the calm mockup's script unchanged, plus the 4g parts marked "4g:". Every part is an
// enhancement: with JS off the page, the strips and every engine link work as they are.
(function(){
  document.querySelectorAll('img').forEach(function(im){if(im.complete&&im.naturalWidth)im.classList.add('in')});
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
  var L=document.body.dataset;

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
    if('IntersectionObserver'in window){var near=new IntersectionObserver(function(es){if(es[0].isIntersecting){wake();near.disconnect()}},{rootMargin:'500px 0px'});near.observe(show)}else wake();
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

  // 4g: the date fields (Alon, gate b). Each engine link keeps its own href as written in the HTML; with
  // both dates chosen, check-in today or later and check-out after it, every engine link on the page gets
  // them in the format the audit saw the engine receive (#checkin=YYYY-MM-DD&checkout=YYYY-MM-DD). With
  // one date or none, every link goes back to its plain href, so no date is shown that the engine does
  // not get. Nobody has yet seen the engine honour the dates (notes.md).
  var box=document.getElementById('dates'),din=document.getElementById('d-in'),dout=document.getElementById('d-out'),note=document.getElementById('dates-note');
  if(box&&din&&dout){
    var links=[].slice.call(document.querySelectorAll('a[data-engine]'));
    links.forEach(function(a){a.dataset.base=a.getAttribute('href')});
    var pad=function(n){return(n<10?'0':'')+n};
    var iso=function(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
    var after=function(s){var p=s.split('-'),d=new Date(+p[0],p[1]-1,+p[2]+1);return iso(d)};
    var today=iso(new Date());
    din.min=today;dout.min=after(today);
    var apply=function(){
      var a=din.value,b=dout.value,ok=!!a&&!!b&&a>=today&&b>a;
      links.forEach(function(l){l.href=ok?l.dataset.base+'#checkin='+a+'&checkout='+b:l.dataset.base});
      note.textContent=(a||b)&&!ok?L.lHalf:'';
    };
    din.addEventListener('change',function(){if(din.value){var n=after(din.value);dout.min=n;if(!dout.value||dout.value<=din.value)dout.value=n}apply()});
    dout.addEventListener('change',apply);
    addEventListener('pageshow',apply);
    box.hidden=false;
    apply();
  }
})();
