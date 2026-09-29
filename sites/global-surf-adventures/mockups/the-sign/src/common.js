(function(){
var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
var SD = !!(navigator.connection && navigator.connection.saveData);
window.__calm = RM || SD;

/* mobile menu */
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

/* dot slideshows: .show > .slides + .dots ; .rg > .rg-track + .dots + arrows */
function wire(root, track, step){
  var items = Array.prototype.slice.call(track.children);
  var dots = root.querySelector('.dots');
  if (!dots || items.length < 2) return;
  var bs = items.map(function(it, i){
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Show ' + (i+1) + ' of ' + items.length);
    b.addEventListener('click', function(){ go(i); }); dots.appendChild(b); return b;
  });
  dots.removeAttribute('aria-hidden');
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
  upd();
}
document.querySelectorAll('[data-show]').forEach(function(r){ wire(r, r.querySelector('.slides')); });
document.querySelectorAll('[data-panels]').forEach(function(r){ wire(r, r.querySelector('.panels')); });
document.querySelectorAll('[data-gallery]').forEach(function(r){ wire(r, r.querySelector('.rg-track')); });
})();
