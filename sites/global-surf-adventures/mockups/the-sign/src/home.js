(function(){
var calm = window.__calm;
var hdr = document.getElementById('hdr'), hero = document.querySelector('.hero'), bar = document.getElementById('bar');

/* header turns white and shows its Book now once the hero has gone; phone bar likewise */
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

/* hero video: attached after first paint; poster only for reduced motion / Save-Data / failure */
var v = hero.querySelector('video');
function attach(){
  if (calm) return;
  var m = innerWidth < 768;
  [[m ? v.dataset.mWebm : v.dataset.dWebm, 'video/webm'], [m ? v.dataset.mMp4 : v.dataset.dMp4, 'video/mp4']].forEach(function(s){
    var el = document.createElement('source'); el.src = s[0]; el.type = s[1]; v.appendChild(el);
  });
  v.load(); var p = v.play(); if (p) p.catch(function(){});
}
if (document.readyState === 'complete') setTimeout(attach, 50); else addEventListener('load', function(){ setTimeout(attach, 50); });

/* level panels: one clip at a time. Desktop: point/focus to open and play. Phone: the one in view plays. */
var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
var wide = matchMedia('(min-width: 1001px)');
function ensure(vid){
  if (vid.dataset.ready) return; vid.dataset.ready = '1';
  var s = document.createElement('source');
  if (innerWidth < 768) { s.src = vid.dataset.m; s.type = 'video/mp4'; } else { s.src = vid.dataset.d; s.type = vid.dataset.dt; }
  vid.appendChild(s); vid.load();
}
function playOnly(p){
  panels.forEach(function(q){
    var vid = q.querySelector('video');
    if (q === p && !calm) { ensure(vid); var r = vid.play(); if (r) r.catch(function(){}); }
    else if (!vid.paused) vid.pause();
  });
}
function open(p){
  if (!wide.matches || calm) return;
  playOnly(p);
}
panels.forEach(function(p){
  p.addEventListener('mouseenter', function(){ open(p); });
  p.addEventListener('focusin', function(){ open(p); });
});
document.querySelector('.panels').addEventListener('mouseleave', function(){
  if (!wide.matches) return;
  playOnly(null);
});
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function(es){
    if (wide.matches) return;
    es.forEach(function(en){ if (en.isIntersecting) playOnly(en.target); else { var vd = en.target.querySelector('video'); if (!vd.paused) vd.pause(); } });
  }, {threshold: .6});
  panels.forEach(function(p){ io.observe(p); });
}

/* inclusions by level */
var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-incl]'));
tabs.forEach(function(t){
  t.addEventListener('click', function(){
    tabs.forEach(function(u){ u.setAttribute('aria-selected', u === t ? 'true' : 'false'); });
    document.querySelectorAll('[data-incl-list]').forEach(function(l){ l.hidden = l.dataset.inclList !== t.dataset.incl; });
  });
});

/* Rosa widget: src set only when the block nears the viewport */
var rw = document.querySelector('[data-rosa]');
if (rw && 'IntersectionObserver' in window) {
  var ro = new IntersectionObserver(function(es){
    if (!es[0].isIntersecting) return; ro.disconnect();
    var f = rw.querySelector('iframe'); rw.setAttribute('data-loading', 'true');
    f.addEventListener('load', function(){ rw.removeAttribute('data-loading'); });
    setTimeout(function(){ rw.removeAttribute('data-loading'); }, 4000);
    f.src = f.dataset.src;
  }, {rootMargin: '400px 0px'});
  ro.observe(rw);
}
})();
