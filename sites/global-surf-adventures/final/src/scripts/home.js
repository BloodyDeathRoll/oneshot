(function(){
var calm = window.__calm, GS = window.GS;
var hdr = document.getElementById('hdr'), hero = document.querySelector('.hero'), bar = document.getElementById('bar');

/* header turns white and shows its Book now once the hero has gone; phone bar likewise [sign] */
if ('IntersectionObserver' in window) {
  new IntersectionObserver(function(es){
    var gone = !es[0].isIntersecting;
    hdr.classList.toggle('solid', gone);
    bar.classList.toggle('on', gone);
    bar.setAttribute('aria-hidden', gone ? 'false' : 'true');
    bar.querySelector('a').tabIndex = gone ? 0 : -1;
  }, {rootMargin: '-' + (hdr.offsetHeight + 1) + 'px 0px 0px 0px'}).observe(hero);
}
hdr.addEventListener('focusin', function(){ if (!hdr.classList.contains('solid') && window.scrollY > 40) hdr.classList.add('solid'); });

/* hero video (schema v0.9 snippet): sources attached after first paint, the phone tiers chosen by their
   media query; poster only for reduced motion / Save-Data / failure */
var v = hero.querySelector('video[data-hero-video]');
function attach(){
  if (calm || !v) return;
  [].slice.call(v.querySelectorAll('source[data-src]')).forEach(function(s){
    if (s.media && !matchMedia(s.media).matches) s.remove(); /* older engines ignore `media` on <source> */
    else s.src = s.dataset.src;
  });
  v.addEventListener('playing', function(){ v.classList.add('on'); }, {once: true});
  v.addEventListener('error', function(){ v.remove(); }, true);
  v.load(); var p = v.play(); if (p) p.catch(function(){});
}
function later(){ requestAnimationFrame(function(){ setTimeout(attach, 50); }); }
if (document.readyState === 'complete') later(); else addEventListener('load', later, {once: true});

/* level panels: all three clips loop while the row is on screen, no hover needed (Shahar, 2026-09-30). [sign] */
var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
function ensure(vid){
  if (vid.dataset.ready) return; vid.dataset.ready = '1';
  [].slice.call(vid.querySelectorAll('source[data-src]')).forEach(function(s){
    if (s.media && !matchMedia(s.media).matches) s.remove(); else s.src = s.dataset.src;
  });
  vid.load();
}
function playAll(on){
  panels.forEach(function(q){
    var vid = q.querySelector('video');
    if (on && !calm) { ensure(vid); var r = vid.play(); if (r) r.catch(function(){}); }
    else if (!vid.paused) vid.pause();
  });
}
if ('IntersectionObserver' in window) {
  new IntersectionObserver(function(es){ playAll(es[es.length - 1].isIntersecting); }, {rootMargin: '200px 0px'}).observe(document.querySelector('.panels'));
} else playAll(true);

/* guest quotes: the slideshow takes the height of the quote on show (no grey gap under a short one);
   phones step through them with ‹ n / 9 › instead of nine dots that would wrap */
var qs = document.querySelector('.quotes');
if (qs) {
  var qt = qs.querySelector('.show-track'), qn = qs.querySelector('.qnav'), qi = 0, qitems = [].slice.call(qt.children);
  var qfit = function(){ if (innerWidth <= 900) qt.style.height = qitems[qi].offsetHeight + 'px'; else qt.style.height = ''; };
  qs.addEventListener('slide', function(e){ qi = e.detail.index; qfit();
    if (qn) { qn.querySelector('span').textContent = (qi + 1) + ' / ' + qitems.length; qn.querySelector('.qp').disabled = qi === 0; qn.querySelector('.qx').disabled = qi === qitems.length - 1; } });
  var qgo = function(d){ var k = Math.max(0, Math.min(qitems.length - 1, qi + d)); qt.scrollTo({left: qitems[k].offsetLeft - qitems[0].offsetLeft, behavior: GS.RM ? 'auto' : 'smooth'}); };
  if (qn) { qn.querySelector('.qp').addEventListener('click', function(){ qgo(-1); }); qn.querySelector('.qx').addEventListener('click', function(){ qgo(1); }); }
  addEventListener('resize', qfit); if (qs._upd) qs._upd();
}

/* rooms [week] */
GS.roomViewer(document.getElementById('rooms'));

/* instagram dots [week] */
var row = document.getElementById('igRow'), dots = document.getElementById('igDots'), tiles = row.children;
function igPages(){ var vis = Math.round(row.clientWidth / tiles[0].offsetWidth); return Math.max(1, Math.ceil((tiles.length - vis) / Math.max(1, Math.floor(vis))) + 1); }
function igDraw(){ dots.innerHTML = ''; var n = igPages(); for (var k = 0; k < n; k++) { (function(k){ var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Instagram photos ' + (k+1) + ' of ' + n); b.onclick = function(){ row.scrollTo({left: (row.scrollWidth - row.clientWidth) * k / (n - 1 || 1), behavior: GS.RM ? 'auto' : 'smooth'}); }; dots.appendChild(b); })(k); } igMark(); }
function igMark(){ var n = dots.children.length, max = row.scrollWidth - row.clientWidth, k = max > 0 ? Math.round(row.scrollLeft / max * (n - 1)) : 0; [].forEach.call(dots.children, function(b, j){ b.setAttribute('aria-current', j === k); }); }
row.addEventListener('scroll', igMark, {passive: true}); addEventListener('resize', igDraw); igDraw();

/* Rosa (playbook §4) [postcard]: one lazy request to the spot JSON when the block nears the viewport.
   Data older than 24 h, or no answer: the headline and the widget give way to the plain link. */
var box = document.querySelector('[data-rosa]'), now = document.getElementById('rosa-now');
if (box && now && 'IntersectionObserver' in window) {
  var DAY = 864e5, fresh = function(iso){ return Date.now() - new Date(iso).getTime() <= DAY; };
  var pts = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  var compass = function(d){ return pts[Math.round(((d % 360) + 360) % 360 / 22.5) % 16]; };
  var $ = function(s){ return document.querySelector(s); };
  var plain = function(){ now.hidden = true; $('#rosa-meta').hidden = true; $('#rosa-plain').classList.add('on'); box.classList.add('off'); };
  var ok = function(){ now.classList.add('ok'); $('#rosa-meta').classList.add('ok'); };
  var widget = function(){
    var f = document.createElement('iframe');
    f.src = box.dataset.rosa; f.title = box.dataset.title; f.loading = 'lazy';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin');
    f.style.cssText = 'position:relative;z-index:1';
    box.setAttribute('data-loading', 'true');
    f.addEventListener('load', function(){ box.removeAttribute('data-loading'); });
    setTimeout(function(){ box.removeAttribute('data-loading'); }, 4000);
    box.appendChild(f);
  };
  var draw = function(j){
    var c = j.current, sw = (c.swells || []).find(function(x){ return x.in_window; });
    var h = c.h.map(function(x){ return x.toFixed(1); }).join('–');
    $('#rosa-h').innerHTML = h + '<small>m</small>'; $('#rosa-hk').textContent = 'Wave height, ' + c.phrase;
    if (sw) { $('#rosa-p').innerHTML = Math.round(sw.period) + '<small>s</small>'; $('#rosa-pk').textContent = 'Swell from the ' + compass(sw.dir); }
    $('#rosa-w').innerHTML = Math.round(c.wind.kph) + '<small>km/h</small>'; $('#rosa-wk').textContent = 'Wind, ' + c.wind.class;
    var t = new Date(c.t);
    $('#rosa-time').textContent = t.toLocaleString('en-GB', {weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Colombo'}).replace(',', '').replace('Sept', 'Sep');
  };
  var go = function(){
    if (fresh(now.dataset.generated)) { ok(); widget(); return; }
    var c = new AbortController(); setTimeout(function(){ c.abort(); }, 8000);
    fetch(now.dataset.json, {signal: c.signal}).then(function(r){ if (!r.ok) throw 0; return r.json(); })
      .then(function(j){ if (!j.current || !fresh(j.generated_at)) throw 0; draw(j); ok(); widget(); })
      .catch(function(){ plain(); });
  };
  var rio = new IntersectionObserver(function(es){ if (es.some(function(x){ return x.isIntersecting; })) { rio.disconnect(); go(); } }, {rootMargin: '300px'});
  rio.observe(box);
}
})();
