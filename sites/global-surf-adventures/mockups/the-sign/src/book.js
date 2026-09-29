(function(){
var calm = window.__calm;
var F = document.getElementById('bk');
var ENGINE = 'https://globalsurfadventures.bookinglayer.com/en/product/';
var API = 'https://api.bookinglayer.io/public/';
var BD = 'business_domain=globalsurfadventures.bookinglayer.com';
var LEVELS = {
  'level-1-fomies': {name: 'Level 1 – Fomies', id: '877aef3d-86ed-4b60-8932-03e49c613af8', n: '1'},
  'level-2-rollers': {name: 'Level 2 – Rollers', id: '4b58b491-24fc-4fb8-a40d-2705df961db4', n: '2'},
  'level-3-riders': {name: 'Level 3 – Riders', id: '54ec3447-2efb-4677-8685-f272e00d32e8', n: '3'}
};
/* build-time snapshot: dossier offers[].price (7 nights, 28 Sep 2026) and rooms_engine supplement samples (29 Sep 2026) */
var SNAP = {base7: 1466, supp: {dorm: function(){ return 0; }, twin: function(g){ return (g.n === 2 && g.couple === 1) ? 80.025 : 140.04; }, double: function(){ return 418.46; }}};
var ROOMS = {dorm: 'Mixed dorm room – 4 beds', twin: 'Shared Twin Room – 2 Beds', double: 'Deluxe double room'};
var live = null; // {key, base, supp:{dorm:x|null(not free)...}}

function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function money(x){ var r = Math.round(x * 100) / 100; var s = r.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}); return '$' + s.replace(/\.00$/, ''); }
function level(){ return $('input[name=level]:checked').value; }
function room(){ return $('input[name=room]:checked').value; }
function nights(){ return +$('input[name=nights]:checked').value; }
function guests(){ var f = +$('#f-female').value || 0, m = +$('#f-male').value || 0, c = +$('#f-couple').value || 0; return {female: f, male: m, couple: c, n: f + m + 2 * c}; }
function addDays(iso, d){ var t = new Date(iso + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + d); return t.toISOString().slice(0, 10); }
function fmt(iso){ var t = new Date(iso + 'T12:00:00Z'); return t.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'}); }

/* preselect from the URL (?level=… &room=…) */
var q = new URLSearchParams(location.search);
if (LEVELS[q.get('level')]) $('input[name=level][value="' + q.get('level') + '"]').checked = true;
if (ROOMS[q.get('room')]) $('input[name=room][value="' + q.get('room') + '"]').checked = true;

/* Saturday chips from the select's options, grouped by month */
var sel = $('#f-start'), chips = $('[data-chips]');
(function(){
  var months = {};
  $$('option', sel).forEach(function(o){ if (!o.value) return; var k = o.value.slice(0, 7); (months[k] = months[k] || []).push(o); });
  Object.keys(months).forEach(function(k){
    var m = document.createElement('div'); m.className = 'chips-m';
    var t = new Date(k + '-01T12:00:00Z').toLocaleDateString('en-GB', {month: 'long', year: 'numeric', timeZone: 'UTC'});
    m.innerHTML = '<p>' + t + '</p><div></div>';
    months[k].forEach(function(o){
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.dataset.v = o.value;
      b.textContent = 'Sat ' + (+o.value.slice(8)); b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', o.textContent);
      b.addEventListener('click', function(){ sel.value = o.value; sel.dispatchEvent(new Event('change', {bubbles: true})); });
      $('div', m).appendChild(b);
    });
    chips.appendChild(m);
  });
  chips.hidden = false; $('#l-chips').hidden = false; document.documentElement.classList.add('chips-on');
})();
function syncChips(){ $$('.chip', chips).forEach(function(b){ var o = $('option[value="' + b.dataset.v + '"]', sel); b.disabled = o.disabled; b.setAttribute('aria-pressed', sel.value === b.dataset.v ? 'true' : 'false'); }); }

/* steppers */
$$('.stp').forEach(function(w){
  var inp = $('input', w);
  $$('.sb', w).forEach(function(b){
    b.addEventListener('click', function(){
      var v = Math.max(+inp.min, Math.min(+inp.max, (+inp.value || 0) + (+b.dataset.d)));
      var g = guests(); if (+b.dataset.d > 0 && g.n + (inp.id === 'f-couple' ? 2 : 1) > 6) return;
      inp.value = v; inp.dispatchEvent(new Event('input', {bubbles: true}));
    });
  });
});

/* media: crossfade by step (desktop pinned half / phone band) */
var media = $$('.bk-media .m');
var narrow = matchMedia('(max-width: 900px)');
var cur = 'level', booted = false;
function key(k){ return (k === 'level' || (k === 'room' && narrow.matches)) ? level() : k; }
function show(k){
  cur = k; var want = key(k);
  media.forEach(function(m){ m.classList.toggle('on', m.dataset.m === want); });
  media.forEach(function(m){
    var v = $('video', m); if (!v) return;
    if (m.dataset.m === want && !calm && booted) {
      if (!v.dataset.ready) { v.dataset.ready = 1; [[v.dataset.webm, 'video/webm'], [v.dataset.mp4, 'video/mp4']].forEach(function(x){ var s = document.createElement('source'); s.src = x[0]; s.type = x[1]; v.appendChild(s); }); v.load(); }
      var p = v.play(); if (p) p.catch(function(){});
    } else if (!v.paused) v.pause();
  });
}
if ('IntersectionObserver' in window) {
  var sio = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) show(e.target.dataset.media); }); }, {rootMargin: '-45% 0px -50% 0px'});
  $$('.step').forEach(function(s){ sio.observe(s); });
}
/* the room layer follows the chosen room's current photograph */
var roomImg = $('.bk-media [data-m=room] img');
function syncRoom(el){ if (!el) { var c = $('.rcard[data-room="' + room() + '"] .rg-track img'); el = c; } if (el) { roomImg.src = el.currentSrc || el.src; } }
$$('.rcard').forEach(function(c){
  $('[data-gallery]', c).addEventListener('slide', function(e){ if (c.dataset.room === room()) syncRoom(e.detail.el); });
});
/* phone: the band shrinks as you scroll */
var band = $('.bk-media');


/* the summary */
function render(){
  var lv = level(), g = guests(), rm = room(), st = $('#f-start').value, n = nights();
  $$('[data-incl-list]').forEach(function(l){ l.hidden = l.dataset.inclList !== LEVELS[lv].n; });
  syncChips();
  $('[data-s=level]').textContent = LEVELS[lv].name;
  $('[data-s=dates]').textContent = st ? fmt(st) + ' – ' + fmt(addDays(st, n)) + ' | ' + n + ' nights' : 'Choose a Saturday';
  var parts = []; if (g.female) parts.push(g.female + ' ' + (g.female === 1 ? 'woman' : 'women')); if (g.male) parts.push(g.male + ' ' + (g.male === 1 ? 'man' : 'men')); if (g.couple) parts.push(g.couple + ' ' + (g.couple === 1 ? 'couple' : 'couples'));
  $('[data-s=guests]').textContent = parts.length ? parts.join(', ') : '—';
  $('[data-s=room]').textContent = ROOMS[rm];

  var lk = liveKey(), L = live && live.key === lk ? live : null;
  var basePP = L ? L.basePP : (n === 7 ? SNAP.base7 : null);
  var suppPP = L ? L.supp[rm] : (n === 7 ? SNAP.supp[rm](g) : null);
  $('[data-s=base]').textContent = basePP == null ? 'Shown on the booking page' : money(basePP);
  $('[data-s=supp]').textContent = suppPP == null ? (L ? 'Not free on these dates' : 'Shown on the booking page') : (suppPP === 0 ? 'Included' : '+' + money(suppPP));
  var pp = (basePP != null && suppPP != null) ? basePP + suppPP : null;
  $('[data-s=pp]').textContent = pp == null ? '—' : money(pp);
  var cnt = Math.max(g.n, 1);
  $('[data-s=alllabel]').textContent = 'Total for ' + cnt + ' ' + (cnt === 1 ? 'guest' : 'guests');
  $('[data-s=all]').textContent = pp == null ? '—' : money(pp * cnt);
  $('[data-s=bartotal]').textContent = pp == null ? '—' : money(pp * cnt);
  $('[data-s=note]').textContent = 'Prices in USD | ' + (L ? 'Live price from the booking engine' : (liveFailed ? "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026." : 'Prices from the booking engine, 29 Sep 2026'));
  $$('.rcard').forEach(function(c){
    var k = c.dataset.room, s = $('[data-rstate]', c), p = $('[data-rprice]', c);
    if (L) {
      c.classList.toggle('off', L.supp[k] == null);
      s.hidden = L.supp[k] != null && L.only !== k; s.textContent = L.only === k ? 'Only the ' + ROOMS[k] + ' is free on these dates' : 'Not free on these dates';
      if (L.supp[k] != null) p.textContent = L.supp[k] === 0 ? 'Included' : '+' + money(L.supp[k]) + ' pp';
    } else { c.classList.remove('off'); s.hidden = true; if (p.dataset.orig) p.textContent = p.dataset.orig; }
    if (!p.dataset.orig) p.dataset.orig = p.textContent;
  });
  /* WhatsApp message carries the choices */
  var wa = $('[data-wa]'); var msg = 'Hi Global Surf Lodge Kabalana, I have a question about the surf packages. ' + LEVELS[lv].name + (st ? ', check-in ' + fmt(st) + ', ' + n + ' nights' : '') + (parts.length ? ', ' + parts.join(', ') : '') + ', ' + ROOMS[rm] + '.';
  wa.href = 'https://wa.me/972523593240?text=' + encodeURIComponent(msg);
  F.action = ENGINE + lv;
}

/* live data from the engine, only after the visitor has touched the booking controls */
var touched = false, liveFailed = false, tmr, dateKey = '';
function liveKey(){ var g = guests(); return [level(), $('#f-start').value, nights(), g.female, g.male, g.couple].join('|'); }
function timeout(p, ms){ return Promise.race([p, new Promise(function(_, rej){ setTimeout(function(){ rej(new Error('timeout')); }, ms); })]); }
function getJSON(u, opt){ return timeout(fetch(u, opt).then(function(r){ if (!r.ok) throw new Error(r.status); return r.json(); }), 7000); }
function refreshDates(){
  var g = guests(); if (!g.n) return; var id = LEVELS[level()].id;
  var dk = level() + '|' + g.female + '|' + g.male + '|' + g.couple; if (dk === dateKey) return; dateKey = dk;
  var today = new Date().toISOString().slice(0, 10), end = addDays(today, 300);
  getJSON(API + 'products/' + id + '/availabilities?format=choosable&show_available_only=1&mode=checkin&start=' + today + '&end=' + end + '&female=' + g.female + '&male=' + g.male + '&couple=' + g.couple + '&' + BD).then(function(j){
    var d = j && j.data && j.data.dates; if (!d) throw new Error('shape');
    $$('#f-start option').forEach(function(o){
      if (!o.value) return; var ok = d[o.value] ? d[o.value].choosable : false;
      o.disabled = !ok; o.textContent = o.textContent.replace(/ \| full$/, '') + (ok ? '' : ' | full');
    });
    syncChips();
  }).catch(function(){ dateKey = ''; });
}
function refreshQuote(){
  var g = guests(), st = $('#f-start').value; if (!g.n || !st) return;
  var lk = liveKey(), id = LEVELS[level()].id, end = addDays(st, nights());
  var gs = []; for (var i = 1; i <= g.n; i++) gs.push({id: 'g' + i + '-' + Date.now(), index: i});
  var roomsP = getJSON(API + 'accommodations/availabilities?product=' + id + '&start=' + st + '&end=' + end + '&currency=USD&female=' + g.female + '&male=' + g.male + '&couple=' + g.couple + '&' + BD);
  var quoteP = getJSON(API + 'packages/' + id + '/items?' + BD, {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({start: st, end: end, currency: 'USD', guests: gs, items: []})});
  Promise.all([roomsP, quoteP]).then(function(r){
    var list = r[0] && r[0].data, tot = r[1] && r[1].data && r[1].data.totals;
    if (!Array.isArray(list) || !tot || typeof tot.base !== 'number') throw new Error('shape');
    var supp = {dorm: null, twin: null, double: null};
    list.forEach(function(a){
      var t = (a.translations && a.translations.en && a.translations.en.title) || '';
      Object.keys(ROOMS).forEach(function(k){
        var card = $('.rcard[data-room="' + k + '"]');
        if (card.dataset.engineTitle === t) supp[k] = a.price && typeof a.price.from === 'number' ? a.price.from : 0;
      });
    });
    if (lk !== liveKey()) return;
    live = {key: lk, basePP: tot.base / g.n, supp: supp}; liveFailed = false;
    var free = Object.keys(supp).filter(function(k){ return supp[k] != null; });
    if (free.length && supp[room()] == null) { $('input[name=room][value="' + free[0] + '"]').checked = true; syncRoom(); }
    live.only = free.length === 1 ? free[0] : null;
    render();
  }).catch(function(){ liveFailed = true; render(); });
}
function onTouch(){
  touched = true; clearTimeout(tmr);
  tmr = setTimeout(function(){ refreshDates(); refreshQuote(); }, 500);
}
F.addEventListener('input', function(){ render(); onTouch(); });
F.addEventListener('change', function(e){
  render(); onTouch();
  if (e.target.name === 'level' && cur === 'level') show('level');
  if (e.target.name === 'room') syncRoom();
});

/* hand-off: GET to the engine's product with start, end (never duration) and the guest mix */
F.addEventListener('submit', function(ev){
  var st = $('#f-start').value;
  if (!st || !guests().n) { ev.preventDefault(); document.getElementById('step-dates').scrollIntoView({behavior: calm ? 'auto' : 'smooth'}); (st ? $('#f-female') : ($('.chip:not(:disabled)') || $('#f-start'))).focus({preventScroll: true}); return; }
  var e = document.createElement('input'); e.type = 'hidden'; e.name = 'end'; e.value = addDays(st, nights()); F.appendChild(e);
  ['#f-female', '#f-male', '#f-couple'].forEach(function(s){ var i = $(s); if (!(+i.value)) i.disabled = true; });
  setTimeout(function(){ ['#f-female', '#f-male', '#f-couple'].forEach(function(s){ $(s).disabled = false; }); e.remove(); }, 500);
});

/* phone bar: Continue walks the steps, then submits */
$('[data-next]').addEventListener('click', function(){
  var order = ['step-level', 'step-room', 'step-dates', 'step-total'];
  var i = order.indexOf('step-' + (cur === 'room' ? 'room' : cur)); if (i < 0) i = 0;
  if (cur === 'total') { F.requestSubmit(); return; }
  document.getElementById(order[i + 1]).scrollIntoView({behavior: calm ? 'auto' : 'smooth'});
});

render();
function boot(){ setTimeout(function(){ booted = true; show(cur); }, 60); }
if (document.readyState === 'complete') boot(); else addEventListener('load', boot);
})();
