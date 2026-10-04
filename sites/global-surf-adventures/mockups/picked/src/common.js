(function(){
var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
var SD = !!(navigator.connection && navigator.connection.saveData);
window.__calm = RM || SD;
var GS = window.GS = {RM: RM};

/* mobile menu [sign] */
var mb = document.querySelector('.menu-btn'), menu = document.getElementById('menu'), hdr = document.getElementById('hdr');
if (mb) {
  mb.addEventListener('click', function(){
    var open = mb.getAttribute('aria-expanded') === 'true';
    mb.setAttribute('aria-expanded', String(!open)); menu.hidden = open;
    hdr.classList.toggle('menu-open', !open);
  });
  menu.addEventListener('click', function(e){ if (e.target.closest('a')) { mb.setAttribute('aria-expanded','false'); menu.hidden = true; hdr.classList.remove('menu-open'); } });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !menu.hidden) { mb.click(); mb.focus(); } });
}

/* dot slideshows: root > track (scroll-snap) + .dots + optional arrows [sign] */
GS.wire = function(root, track){
  if (!track || track._w) return; track._w = 1;
  var items = Array.prototype.slice.call(track.children);
  var dots = root.querySelector('.dots');
  if (!dots || items.length < 2) return;
  var bs = items.map(function(it, i){
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Show ' + (i+1) + ' of ' + items.length);
    b.addEventListener('click', function(){ go(i); }); dots.appendChild(b); return b;
  });
  function left(i){ return items[i].offsetLeft - items[0].offsetLeft; }
  function go(i){ i = Math.max(0, Math.min(items.length-1, i)); track.scrollTo({left: left(i), behavior: RM ? 'auto' : 'smooth'}); }
  function cur(){
    var x = track.scrollLeft, best = 0, bd = 1e9;
    items.forEach(function(it, i){ var d = Math.abs(left(i) - x); if (d < bd) { bd = d; best = i; } });
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) best = items.length - 1;
    return best;
  }
  var prev = root.querySelector('.arrow.prev'), next = root.querySelector('.arrow.next');
  function upd(){
    var c = cur();
    bs.forEach(function(b, i){ b.setAttribute('aria-current', i === c ? 'true' : 'false'); });
    if (prev) prev.disabled = c === 0;
    if (next) next.disabled = c === items.length - 1;
    root.dispatchEvent(new CustomEvent('slide', {detail: {index: c, el: items[c]}}));
  }
  var t; track.addEventListener('scroll', function(){ clearTimeout(t); t = setTimeout(upd, 60); }, {passive: true});
  if (prev) prev.addEventListener('click', function(){ go(cur() - 1); });
  if (next) next.addEventListener('click', function(){ go(cur() + 1); });
  track.addEventListener('keydown', function(e){
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur() - 1); }
  });
  root._upd = upd; upd();
};
document.querySelectorAll('[data-show]').forEach(function(r){ GS.wire(r, r.querySelector('.show-track')); });
document.querySelectorAll('[data-panels]').forEach(function(r){ GS.wire(r, r.querySelector('.panels')); });

/* ' | ' details: a separator whose next item starts a new line is hidden, so no line ends on a bare '|' */
GS.seps = function(root){
  (root || document).querySelectorAll('.di > .sep').forEach(function(s){
    var a = s.parentNode.getBoundingClientRect(), n = s.parentNode.nextElementSibling;
    s.style.visibility = (n && a.height && n.getBoundingClientRect().top >= a.bottom - 4) ? 'hidden' : '';
  });
};
(function(){
  var hosts = [].slice.call(document.querySelectorAll('.di')).map(function(d){ return d.parentNode; }).filter(function(h, i, l){ return l.indexOf(h) === i; });
  if ('ResizeObserver' in window) { var ro = new ResizeObserver(function(es){ es.forEach(function(x){ GS.seps(x.target); }); }); hosts.forEach(function(h){ ro.observe(h); }); }
  /* re-measure when a line comes into view too: fonts, images and hidden panels change the breaks after the first pass */
  if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function(es){ es.forEach(function(x){ if (x.isIntersecting) GS.seps(x.target); }); }); hosts.forEach(function(h){ io.observe(h); }); }
  if (document.fonts) { document.fonts.ready.then(function(){ GS.seps(); }); document.fonts.addEventListener('loadingdone', function(){ GS.seps(); }); }  /* the web fonts arrive after load (non-blocking stylesheet) */
  addEventListener('load', function(){ GS.seps(); });
  GS.seps();
})();

/* tabs + room viewer [week] */
GS.tabs = function(list, onchange){
  var tabs = [].slice.call(list.querySelectorAll('[role=tab]'));
  function sel(t, focus){
    var prev = tabs.findIndex(function(x){ return x.getAttribute('aria-selected') === 'true'; });
    var idx = tabs.indexOf(t);
    tabs.forEach(function(x){ var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
    if (focus) t.focus();
    if (onchange && idx !== prev) onchange(idx, prev);
  }
  tabs.forEach(function(t){
    t.addEventListener('click', function(){ sel(t); });
    t.addEventListener('keydown', function(e){ var k = tabs.indexOf(t);
      if (e.key === 'ArrowRight') { sel(tabs[(k+1) % tabs.length], true); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { sel(tabs[(k-1+tabs.length) % tabs.length], true); e.preventDefault(); } });
  });
  tabs.forEach(function(x){ x.tabIndex = x.getAttribute('aria-selected') === 'true' ? 0 : -1; });
  return {select: function(k){ sel(tabs[k]); }, tabs: tabs};
};
GS.roomViewer = function(box, onchange){
  var list = box.querySelector('[role=tablist]'); if (!list) return null;
  var panels = [].slice.call(box.querySelectorAll('.room-panel'));
  var cur = panels.findIndex(function(p){ return !p.hidden; });
  panels.forEach(function(p, k){ p.hidden = k !== Math.max(cur, 0); });
  return GS.tabs(list, function(k, prev){
    panels.forEach(function(p, j){ p.hidden = j !== k; p.classList.remove('enter', 'back'); });
    var p = panels[k]; void p.offsetWidth; p.classList.add('enter'); if (prev > k) p.classList.add('back');
    var s = p.querySelector('[data-show]'); if (s && s._upd) s._upd();
    if (onchange) onchange(k);
  });
};
})();
