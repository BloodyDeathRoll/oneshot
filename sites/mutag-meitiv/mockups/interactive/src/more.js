  document.documentElement.classList.add('js');
  var mqPhone = window.matchMedia('(max-width:900px)');

  // ---- tab sets (lead services on phone, offer groups everywhere); RTL: the ink slides toward the left = forward
  function tabSet(tablist, onChange){
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role=tab]'));
    var ink = tablist.querySelector('.tab-ink');
    function place(t){
      if (!ink) return;
      var r = tablist.getBoundingClientRect(), b = t.getBoundingClientRect();
      ink.style.width = b.width + 'px'; ink.style.right = (r.right - b.right) + 'px';
    }
    function select(t, focus){
      tabs.forEach(function(x){
        var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls')); if (onChange) onChange(p, on);
      });
      place(t); if (focus) t.focus();
    }
    tabs.forEach(function(t, i){
      t.addEventListener('click', function(){ select(t); });
      t.addEventListener('keydown', function(ev){
        // in RTL the left arrow moves forward
        var d = ev.key === 'ArrowLeft' ? 1 : ev.key === 'ArrowRight' ? -1 : 0;
        if (d){ ev.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
      });
    });
    var cur = tabs.filter(function(t){ return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
    select(cur);
    window.addEventListener('resize', function(){ place(tablist.querySelector('[aria-selected=true]')); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ place(tablist.querySelector('[aria-selected=true]')); });
  }
  var svcTabs = document.querySelector('.services .tabs');
  if (svcTabs) tabSet(svcTabs, function(p, on){ p.classList.toggle('off', !on); });
  var offTabs = document.querySelector('.offers .tabs');
  if (offTabs) tabSet(offTabs, function(p, on){ p.hidden = !on; var gi = document.getElementById(p.id.replace('g-', 'gi-')); if (gi) gi.hidden = !on; });

  // ---- accordions (offers) and team bios: height animates, Esc closes, focus moves in
  document.querySelectorAll('.offer-head').forEach(function(b){
    b.addEventListener('click', function(){
      var art = b.closest('.offer'), open = !art.classList.contains('open');
      art.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
    });
  });
  document.querySelectorAll('.m-card').forEach(function(b){
    var bio = document.getElementById(b.getAttribute('aria-controls'));
    function set(open){ bio.classList.toggle('open', open); b.setAttribute('aria-expanded', open); }
    b.addEventListener('click', function(){ var open = !bio.classList.contains('open'); set(open); if (open) setTimeout(function(){ bio.focus({preventScroll:true}); }, 260); });
    bio.addEventListener('keydown', function(ev){ if (ev.key === 'Escape'){ set(false); b.focus(); } });
  });
  document.addEventListener('keydown', function(ev){
    if (ev.key !== 'Escape') return;
    var o = document.activeElement && document.activeElement.closest && document.activeElement.closest('.offer.open');
    if (o){ o.classList.remove('open'); var h = o.querySelector('.offer-head'); h.setAttribute('aria-expanded', false); h.focus(); }
  });

  // ---- testimonial slideshow: dots + arrows + swipe (native scroll-snap)
  document.querySelectorAll('[data-slider]').forEach(function(sl){
    var track = sl.querySelector('.track'), slides = sl.querySelectorAll('.slide'), dots = sl.querySelectorAll('.dot-btn'), cur = 0;
    function fit(){ track.style.height = slides[cur].offsetHeight + 'px'; }
    window.addEventListener('resize', fit);
    function mark(i){ cur = i; fit(); dots.forEach(function(d, k){ if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); }); }
    fit();
    dots.forEach(function(d, k){ d.addEventListener('click', function(){ go(k); }); });
    sl.querySelector('.next').addEventListener('click', function(){ go(cur + 1); });
    sl.querySelector('.prev').addEventListener('click', function(){ go(cur - 1); });
    var st; track.addEventListener('scroll', function(){ clearTimeout(st); st = setTimeout(function(){
      var mid = track.getBoundingClientRect().left + track.clientWidth / 2, best = 0, bd = 1e9;
      slides.forEach(function(s, k){ var r = s.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd){ bd = d; best = k; } });
      mark(best); }, 80); }, {passive:true});
    function go(i){ i = (i + slides.length) % slides.length; var t = slides[i]; var tr = track.getBoundingClientRect(), r = t.getBoundingClientRect();
      track.scrollBy({left: (r.left + r.width / 2) - (tr.left + tr.width / 2), behavior: reduce ? 'auto' : 'smooth'}); mark(i); }
  });

  // ---- logo marquee pause button
  document.querySelectorAll('[data-marquee]').forEach(function(mq){
    var b = mq.querySelector('.mq-pause');
    b.addEventListener('click', function(){ var p = !mq.classList.contains('paused'); mq.classList.toggle('paused', p); b.setAttribute('aria-pressed', p); });
  });

  // ---- method: the ring of the stage in view lights (scroll-lit list, no scrubbing)
  var bigRings = document.querySelectorAll('.m-sticky .m-ring, .m-sticky .m-lbl');
  var stages = document.querySelectorAll('.stage');
  if ('IntersectionObserver' in window && stages.length){
    var sio = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if (!en.isIntersecting) return;
        var i = en.target.dataset.stage;
        stages.forEach(function(s){ s.classList.toggle('is-on', s === en.target); });
        bigRings.forEach(function(r){ r.classList.toggle('on', r.dataset.r === i); });
      });
    }, {rootMargin: '-45% 0px -45% 0px'});
    stages.forEach(function(s){ sio.observe(s); });
    stages[0].classList.add('is-on');
  }

  // ---- the second clip plays only near the viewport
  var offVid = document.getElementById('offVid');
  if (offVid && 'IntersectionObserver' in window){
    var vio = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if (en.isIntersecting){ if (!offVid.dataset.on){ offVid.dataset.on = 1; startVideo(offVid); } else if (!reduce) offVid.play().catch(function(){}); }
        else if (offVid.dataset.on) offVid.pause();
      });
    }, {rootMargin: '200px'});
    vio.observe(offVid);
  }

  // ---- phone menu
  var mb = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (mb) mb.addEventListener('click', function(){ var o = !nav.classList.contains('open'); nav.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); });
  if (nav) nav.addEventListener('click', function(ev){ if (ev.target.tagName === 'A'){ nav.classList.remove('open'); mb.setAttribute('aria-expanded', false); } });

  // ---- persistent phone bar once the hero button has scrolled out
  var bar = document.getElementById('pbar'), heroCta = document.getElementById('heroCta');
  if (bar && heroCta && 'IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      var show = !es[0].isIntersecting && es[0].boundingClientRect.top < 0;
      bar.classList.toggle('show', show); bar.setAttribute('aria-hidden', !show); document.body.classList.toggle('bar-on', show);
      bar.querySelector('a').tabIndex = show ? 0 : -1;
    }).observe(heroCta);
  }

  // ---- menu closes when the visitor scrolls
  window.addEventListener('scroll', function(){ if (nav && nav.classList.contains('open')){ nav.classList.remove('open'); mb.setAttribute('aria-expanded', false); } }, {passive:true});

  // ---- hero service links pick their tab on the phone
  document.querySelectorAll('.hero-svcs a[data-tab]').forEach(function(a){
    a.addEventListener('click', function(){ var t = document.getElementById(a.dataset.tab); if (t) t.click(); });
  });

  // ---- quotes: "להמשך הציטוט" only where the quote is longer than the clamp
  document.querySelectorAll('.slide').forEach(function(s){
    var q = s.querySelector('.q-body'), b = s.querySelector('.q-more');
    if (q.scrollHeight > q.clientHeight + 4) b.hidden = false;
    b.addEventListener('click', function(){
      var open = !q.classList.contains('open'); q.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
      b.textContent = open ? 'פחות' : 'להמשך הציטוט';
      var tr = s.closest('.track'); if (tr) tr.style.height = s.offsetHeight + 'px';
    });
  });
  var track0 = document.querySelector('.track'); if (track0) { var s0 = track0.querySelector('.slide'); track0.style.height = s0.offsetHeight + 'px'; }

  // ---- method: the rest of a stage on request
  document.querySelectorAll('.st-more-btn').forEach(function(b){
    var m = document.getElementById(b.getAttribute('aria-controls'));
    if (!m.textContent.trim()) return;
    b.hidden = false;
    b.addEventListener('click', function(){ m.classList.add('open'); b.setAttribute('aria-expanded', true); var p = m.querySelector('p'); if (p){ p.tabIndex = -1; p.focus({preventScroll:true}); } });
  });

  // ---- phone: each stage's rings fill one by one as its card enters
  var minis = document.querySelectorAll('.stage .mini');
  if (minis.length && !reduce && 'IntersectionObserver' in window){
    minis.forEach(function(mn){ mn.querySelectorAll('.mm-ring').forEach(function(r){ r.dataset.lit = r.classList.contains('on') ? 1 : ''; r.classList.remove('on'); }); });
    var mio = new IntersectionObserver(function(es){ es.forEach(function(en){ if (!en.isIntersecting) return;
      en.target.querySelectorAll('.mm-ring').forEach(function(r){ if (r.dataset.lit) r.classList.add('on'); }); mio.unobserve(en.target); }); }, {threshold: .6});
    minis.forEach(function(mn){ mio.observe(mn); });
  }
