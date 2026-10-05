(function(){
/* Booking [sign], one step per screen: #level → #room → #dates → #total, each with its own URL (history), back/next.
   JS off: the four steps stack as one working GET form to the engine. */
var calm = window.__calm, GS = window.GS;
/* everything this script knows about the business comes from the page (#bk-data, written at build time
   from Payload's content, the SCHEMA GAP file and the approved labels) */
var D = JSON.parse(document.getElementById('bk-data').textContent), TX = D.b;
var F = document.getElementById('bk');
var ENGINE = F.getAttribute('action').replace(/[^/]+$/, '');
var API = D.engine.api;
var BD = 'business_domain=' + D.engine.businessDomain;
var LEVELS = D.levels;
/* build-time snapshot: lessons[].price (7 nights) and the engine's room supplements, per person: one guest / a couple sharing.
   Every price is rounded to whole dollars once, where it enters (snapshot or live), so the lines and the totals on the page
   always add up (must-fix 7: $80.025 + $1,466 used to be rounded only at display) */
var SNAP = {base7: Math.round(D.snap.base7), supp: function(k, g){ var r = D.snap.rooms[k]; return r ? Math.round((g.n === 2 && g.couple === 1) ? r.couple : r.one) : null; }};
var ROOMS = {};
var STEPS = ['level', 'room', 'dates', 'total'];
var live = null;

function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
$$('.room-panel').forEach(function(p){ ROOMS[p.dataset.room] = $('h3', p).textContent; });
function money(x){ return '$' + Math.round(x).toLocaleString('en-US'); }  /* whole dollars on the page; the engine works out the cents */
function level(){ var r = $('input[name=level]:checked'); return r ? r.value : null; }  /* null when the visitor came from a room and has not chosen yet */
function room(){ var r = $('input[name=room]:checked'); return r ? r.value : null; }  /* null until the visitor chooses */
function nights(){ return +$('input[name=nights]:checked').value; }
function guests(){ var f = +$('#f-female').value || 0, m = +$('#f-male').value || 0, c = +$('#f-couple').value || 0; return {female: f, male: m, couple: c, n: f + m + 2 * c}; }
function addDays(iso, d){ var t = new Date(iso + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + d); return t.toISOString().slice(0, 10); }
function fmt(iso){ var t = new Date(iso + 'T12:00:00Z'); return t.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'}); }

/* preselect from the URL (?level=… &room=…) */
var q = new URLSearchParams(location.search);
if (LEVELS[q.get('level')]) $('input[name=level][value="' + q.get('level') + '"]').checked = true;
if (ROOMS[q.get('room')]) $('input[name=room][value="' + q.get('room') + '"]').checked = true;
/* a room chosen on the home page says nothing about the level: no level is assumed (must-fix 3) */
if (!LEVELS[q.get('level')] && ROOMS[q.get('room')]) $$('input[name=level]').forEach(function(r){ r.checked = false; });

/* room selector (Dorm / Twin / Deluxe double) [week]; on desktop the viewed room's gallery fills the media half */
var roomBox = $('#room .room-box');
var tabs = GS.roomViewer(roomBox, function(){ if (cur === 'room') show('room'); });
function viewed(){ var t = tabs.tabs.filter(function(x){ return x.getAttribute('aria-selected') === 'true'; })[0]; return t ? t.getAttribute('aria-controls').replace('b-room-', '') : Object.keys(ROOMS)[0]; }
function chosenTab(){ var r = room(); tabs.tabs.forEach(function(t){ t.classList.toggle('chosen', !!r && t.getAttribute('aria-controls') === 'b-room-' + r); }); }
(function(){ var k = Object.keys(ROOMS).indexOf(room()); if (k > 0) tabs.select(k); chosenTab(); })();

/* Saturday chips from the select's options, grouped by month. Saturdays before the visitor's today are dropped
   (the build drops them too, for JS off). With JS the page checks the fields itself, so the no-JS "required" goes. */
var sel = $('#f-start'), chips = $('[data-chips]');
var today = (function(d){ return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); })(new Date());
$$('option', sel).forEach(function(o){ if (o.value && o.value < today) o.remove(); });
sel.required = false; F.noValidate = true;
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
/* a check-in counts only while the engine still offers it: a date the live calendar strikes out is cleared, and the page says why */
function dateOk(){ var o = sel.options[sel.selectedIndex]; return !!(sel.value && o && !o.disabled); }
var dateNote = '';
function guestParts(g){ var p = []; if (g.female) p.push(g.female + ' ' + (g.female === 1 ? 'woman' : 'women')); if (g.male) p.push(g.male + ' ' + (g.male === 1 ? 'man' : 'men')); if (g.couple) p.push(g.couple + ' ' + (g.couple === 1 ? 'couple' : 'couples')); return p; }
/* the live answer for the current choices, or null */
function liveNow(){ return live && live.key === liveKey() ? live : null; }
/* the chosen room is never switched behind the visitor's back: when the engine says it is not free, it stays chosen and
   the step on screen says so (dates, total), with a way to change it */
function roomFree(){ var rm = room(), L = liveNow(); return !(rm && L && L.supp[rm] == null); }
function noneFree(){ var L = liveNow(); return !!L && !Object.keys(L.supp).some(function(k){ return L.supp[k] != null; }); }

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

/* media half: crossfade by step. Level clips play on desktop only; phones keep the poster in a slim band. */
var media = $$('.bk-media .m'), booted = false, cur = 'level';
var wide = matchMedia('(min-width: 901px)');
function show(k){
  var want = k === 'level' ? (level() || Object.keys(LEVELS)[0]) : k === 'room' ? 'room-' + viewed() : k;
  media.forEach(function(m){ m.classList.toggle('on', m.dataset.m === want); });
  /* step photographs load when their step is first shown, and the next one just before */
  [want, STEPS[STEPS.indexOf(k) + 1]].forEach(function(n){ var im = $('.bk-media [data-m="' + n + '"] img[data-src]'); if (im) { im.src = im.dataset.src; im.removeAttribute('data-src'); } });
  media.forEach(function(m){
    var v = $('video', m); if (!v) return;
    if (m.dataset.m === want && !calm && booted && wide.matches) {
      if (!v.dataset.ready) { v.dataset.ready = 1; [[v.dataset.webm, 'video/webm'], [v.dataset.mp4, 'video/mp4']].forEach(function(x){ var s = document.createElement('source'); s.src = x[0]; s.type = x[1]; v.appendChild(s); }); v.load(); }
      var p = v.play(); if (p) p.catch(function(){});
      v.addEventListener('playing', function(){ m.classList.add('playing'); }, {once: true});
    } else if (!v.paused) v.pause();
  });
  var g = $('.bk-media [data-m="' + want + '"] [data-show]'); if (g && g._upd) g._upd();
}
/* steps: one per screen, URL per step */
var prog = $$('.prog a'), back = $('[data-back]'), next = $('[data-next]'), goBtn = $('.snav .go'), fixBtn = $('.snav .fix'), barT = $('.snav-t');
var FROM = [$('[data-s=barlabel]').textContent, $('[data-s=bartotal]').textContent];
/* the bar: Next is the coral action except on the room step before a room is chosen ("Choose this room" is it then);
   on the total step the hand-off itself sits in the bar */
function navState(){
  var blocked = !dateOk() || !roomFree();
  next.hidden = cur === 'total';
  /* on the total step the hand-off is offered only for dates and a room the engine still has; otherwise the bar offers the fix */
  goBtn.hidden = cur !== 'total' || blocked; fixBtn.hidden = cur !== 'total' || !blocked;
  fixBtn.dataset.to = (!dateOk() || noneFree()) ? 'dates' : 'room';
  fixBtn.firstChild.textContent = fixBtn.dataset.to === 'dates' ? D.t.changeDates : D.t.changeRoom;
  var soft = (cur === 'room' && !room()) || (cur === 'level' && !level());
  next.classList.toggle('btn-book', !soft); next.classList.toggle('btn-soft', soft);
}
function go(k, how){
  if (STEPS.indexOf(k) < 0) k = 'level';
  var prev = cur; cur = k;
  var i = STEPS.indexOf(k), pi = STEPS.indexOf(prev);
  $$('.step').forEach(function(s){ var on = s.id === k; s.classList.toggle('cur', on); s.classList.toggle('back', on && i < pi); });
  prog.forEach(function(a, j){
    a.classList.toggle('done', j < i); a.classList.toggle('todo', j > i + 1 && !reached(j));
    if (j === i) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
  });
  back.hidden = i === 0;
  document.body.setAttribute('data-step', k);
  navState();
  show(k);
  if (k === 'room') { var s = $$('.room-panel').filter(function(x){ return !x.hidden; })[0]; if (s) { var w = $('[data-show]', s); if (w && w._upd) w._upd(); } }
  if (how === 'push') { history.pushState({step: k, from: prev}, '', location.search + '#' + k); depth++; }
  if (how === 'pop') depth = Math.max(0, depth - 1);
  if (how === 'push' || how === 'pop') {
    window.scrollTo({top: 0, behavior: 'auto'});
    var h = $('#' + k + ' .script'); if (h) h.focus({preventScroll: true});
  }
}
var furthest = 0;
function reached(j){ return j <= furthest; }
function advance(k){ furthest = Math.max(furthest, STEPS.indexOf(k)); go(k, 'push'); }
function levelOk(){
  if (level()) return true;
  if (cur !== 'level') go('level', 'push');
  var pk = $('.pick'); if (pk) { $('input', pk).focus({preventScroll: true}); pk.classList.remove('nudge'); void pk.offsetWidth; pk.classList.add('nudge'); }
  return false;
}
function roomOk(force){
  if (room() && !force) return true;
  if (cur !== 'room') go('room', 'push');
  var c = $$('#room .room-panel').filter(function(x){ return !x.hidden; })[0], ch = c && $('.choose', c);
  if (ch) { $('input', ch).focus({preventScroll: true}); ch.classList.remove('nudge'); void ch.offsetWidth; ch.classList.add('nudge'); ch.scrollIntoView({block: 'center', behavior: calm ? 'auto' : 'smooth'}); }
  return false;
}
function datesOk(){
  var g = guests();
  if (dateOk() && g.n) return true;
  if (cur !== 'dates') go('dates', 'push');
  (!g.n ? $('#f-female') : ($('.chip:not(:disabled)') || sel)).focus();  /* the guests come first: they decide which Saturdays are free */
  return false;
}
fixBtn.addEventListener('click', function(){ var k = fixBtn.dataset.to; if (k === 'dates') { if (cur !== 'dates') go('dates', 'push'); ($('.chip:not(:disabled)') || sel).focus(); } else roomOk(true); });
$$('[data-to-room]').forEach(function(b){ b.addEventListener('click', function(){ roomOk(true); }); });
next.addEventListener('click', function(){
  var i = STEPS.indexOf(cur);
  if (cur === 'level' && !levelOk()) return;
  if (cur === 'room' && !roomOk()) return;
  if (cur === 'dates' && (!datesOk() || !roomOk())) return;
  advance(STEPS[i + 1]);
});
/* Back = the previous step; it walks history when this page pushed the current step, so browser back stays in step */
var depth = 0;
back.addEventListener('click', function(){
  var prev = STEPS[Math.max(0, STEPS.indexOf(cur) - 1)];
  if (depth > 0 && history.state && history.state.from === prev) { history.back(); }
  else go(prev, 'push');
});
prog.forEach(function(a){ a.addEventListener('click', function(ev){ ev.preventDefault(); var k = a.dataset.go; if (k === cur) return; var j = STEPS.indexOf(k); if (j > 0 && !levelOk()) return; if (j > STEPS.indexOf('room') && !roomOk()) return; if (j > STEPS.indexOf('dates') && !datesOk()) return; advance(k); }); });
addEventListener('popstate', function(){ go(location.hash.slice(1) || 'level', 'pop'); });
/* choosing a room shows "Chosen", then moves on to dates; tapping a level card moves on to the room
   (pointer taps only: arrow keys inside the radio group must not jump steps) */
$$('input[name=room]').forEach(function(r){ r.addEventListener('click', function(){ chosenTab(); navState(); setTimeout(function(){ if (cur === 'room') advance('dates'); }, calm ? 0 : 450); }); });
$$('.pick').forEach(function(l){ l.addEventListener('click', function(ev){ if (!ev.detail || ev.target.tagName === 'INPUT') return; setTimeout(function(){ if (cur === 'level') advance('room'); }, calm ? 0 : 320); }); });

/* keep the choices in the URL, so a reload or a shared link keeps them */
function syncURL(){ var u = new URL(location.href); if (level()) u.searchParams.set('level', level()); if (room()) u.searchParams.set('room', room()); else u.searchParams.delete('room'); history.replaceState(history.state, '', u); }

/* the summary */
function render(){
  var lv = level(), LV = LEVELS[lv] || null, g = guests(), rm = room(), st = $('#f-start').value, n = nights();
  $$('[data-incl-list]').forEach(function(l){ l.hidden = l.dataset.inclList !== (LV ? LV.n : '1'); });
  syncChips(); chosenTab();
  $('[data-s=level]').textContent = LV ? LV.name : '—';
  /* the range and the nights are two items: one line with ' | ' where it fits, two lines on phones ("7 nights" never splits; must-fix 5) */
  var dd = $('[data-s=dates]');
  if (st) dd.innerHTML = '<span class="di">' + fmt(st) + ' – ' + fmt(addDays(st, n)) + '<span class="sep">|</span></span><span class="di">' + n + '\u00a0nights</span>';
  else dd.textContent = TX.field_checkin_nojs_placeholder;
  var parts = guestParts(g);
  $('[data-s=guests]').textContent = parts.length ? parts.join(', ') : '—';
  $('[data-s=room]').textContent = rm ? ROOMS[rm] : '—';

  var lk = liveKey(), L = live && live.key === lk ? live : null;
  var basePP = L ? L.basePP : (n === 7 ? SNAP.base7 : null);
  var suppPP = !rm ? null : L ? L.supp[rm] : (n === 7 ? SNAP.supp(rm, g) : null);
  $('[data-s=base]').textContent = basePP == null ? 'Shown on the booking page' : money(basePP);
  $('[data-s=supp]').textContent = !rm ? '—' : suppPP == null ? (L ? 'Not free on these dates' : 'Shown on the booking page') : (suppPP === 0 ? 'Included' : '+' + money(suppPP));
  var pp = (basePP != null && suppPP != null) ? basePP + suppPP : null;
  $('[data-s=pp]').textContent = pp == null ? '—' : money(pp);
  var cnt = Math.max(g.n, 1);
  $('[data-s=alllabel]').textContent = 'Total for ' + cnt + ' ' + (cnt === 1 ? 'guest' : 'guests');
  $('[data-s=all]').textContent = pp == null ? '—' : money(pp * cnt);
  /* the bar shows a total only once level, room, a Saturday and the guests are all set; "From $1,466 pp" until then */
  var full = pp != null && dateOk() && g.n && rm;
  $('[data-s=barlabel]').textContent = full ? $('.snav-t').dataset.total : FROM[0];
  $('[data-s=bartotal]').textContent = full ? money(pp * cnt) : FROM[1];
  /* what is wrong with the choices, on the step the visitor is on */
  var msg = dateNote, roomGone = !roomFree();
  if (roomGone) msg = (msg ? msg + ' ' : '') + TX.room_not_free + ': ' + ROOMS[rm] + '.' + (L.only ? ' ' + TX.room_only_one_free.replace('{room}', ROOMS[L.only]) + '.' : '');
  $$('[data-dmsg]').forEach(function(d){ d.hidden = !msg; $('p', d).textContent = msg; $('[data-to-room]', d).hidden = !roomGone || noneFree(); });
  navState();
  $('[data-s=note]').textContent = TX.currency_note + ' | ' + (L ? TX.prices_live : (liveFailed ? TX.prices_fallback.replace('{date}', D.snap.roomsAsOf) : TX.prices_snapshot.replace('{date}', D.snap.roomsAsOf)));
  $$('.room-panel').forEach(function(c){
    var k = c.dataset.room, s = $('[data-rstate]', c), p = $('[data-rprice]', c);
    if (!p.dataset.orig) p.dataset.orig = p.innerHTML;
    if (L) {
      c.classList.toggle('off', L.supp[k] == null);
      s.hidden = L.supp[k] != null && L.only !== k; s.textContent = L.only === k ? 'Only the ' + ROOMS[k] + ' is free on these dates' : 'Not free on these dates';
      if (L.supp[k] != null) p.textContent = L.supp[k] === 0 ? 'Included' : '+' + money(L.supp[k]) + ' pp';
    } else { c.classList.remove('off'); s.hidden = true; p.innerHTML = p.dataset.orig; }
  });
  /* WhatsApp message carries the choices */
  var wa = $('[data-wa]'); var base = D.wa ? D.wa.base : null;
  var bits = [LV ? LV.name : '', st ? 'check-in ' + fmt(st) : '', st ? n + ' nights' : ''].concat(parts, rm ? [ROOMS[rm]] : []).filter(Boolean);
  var wmsg = (D.wa ? D.wa.prefix : '') + (bits.length ? ' ' + bits.join(', ') + '.' : '');
  if (wa && base) wa.href = base + '?text=' + encodeURIComponent(wmsg);
  F.action = ENGINE + (lv || Object.keys(LEVELS)[0]);
}

/* live data from the engine, only after the visitor has touched the booking controls */
var liveFailed = false, tmr, dateKey = '';
function liveKey(){ var g = guests(); return [level(), $('#f-start').value, nights(), g.female, g.male, g.couple].join('|'); }
function timeout(p, ms){ return Promise.race([p, new Promise(function(_, rej){ setTimeout(function(){ rej(new Error('timeout')); }, ms); })]); }
function getJSON(u, opt){ return timeout(fetch(u, opt).then(function(r){ if (!r.ok) throw new Error(r.status); return r.json(); }), 7000); }
function refreshDates(){
  var g = guests(); if (!g.n || !level()) return; var id = LEVELS[level()].id;
  var dk = level() + '|' + g.female + '|' + g.male + '|' + g.couple; if (dk === dateKey) return; dateKey = dk;
  var today = new Date().toISOString().slice(0, 10), end = addDays(today, 300);
  getJSON(API + 'products/' + id + '/availabilities?format=choosable&show_available_only=1&mode=checkin&start=' + today + '&end=' + end + '&female=' + g.female + '&male=' + g.male + '&couple=' + g.couple + '&' + BD).then(function(j){
    var d = j && j.data && j.data.dates; if (!d) throw new Error('shape');
    if (dk !== dateKey) return;  /* a newer guest mix is already being asked for */
    var chosen = sel.options[sel.selectedIndex], chosenLabel = chosen && chosen.value ? chosen.textContent.replace(/ \| full$/, '') : '';
    $$('#f-start option').forEach(function(o){
      if (!o.value) return; var ok = d[o.value] ? d[o.value].choosable : false;
      o.disabled = !ok; o.textContent = o.textContent.replace(/ \| full$/, '') + (ok ? '' : ' | full');
    });
    if (chosenLabel && chosen.disabled) {
      sel.value = '';
      dateNote = D.t.dateGone.replace('{date}', chosenLabel).replace('{guests}', guestParts(guests()).join(', '));
    }
    render();
  }).catch(function(){ dateKey = ''; });
}
function refreshQuote(){
  var g = guests(), st = $('#f-start').value; if (!g.n || !st || !level()) return;
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
      $$('.room-panel').forEach(function(c){ if (c.dataset.engineTitle === t) supp[c.dataset.room] = a.price && typeof a.price.from === 'number' ? Math.round(a.price.from) : 0; });
    });
    if (lk !== liveKey()) return;
    live = {key: lk, basePP: Math.round(tot.base / g.n), supp: supp}; liveFailed = false;
    var free = Object.keys(supp).filter(function(k){ return supp[k] != null; });
    live.only = free.length === 1 ? free[0] : null;
    render();
  }).catch(function(){ liveFailed = true; render(); });
}
function onTouch(){ clearTimeout(tmr); tmr = setTimeout(function(){ refreshDates(); refreshQuote(); }, 500); }
F.addEventListener('input', function(){ render(); onTouch(); });
F.addEventListener('change', function(e){
  if (e.target === sel) dateNote = '';
  render(); onTouch(); syncURL();
  if (e.target.name === 'level' && cur === 'level') show('level');
});

/* hand-off: GET to the engine's product with start, end (never duration) and the guest mix */
F.addEventListener('submit', function(ev){
  /* never an end without a start, never dates or a room the engine has just said no to */
  if (!levelOk() || !roomOk() || !datesOk() || !roomFree()) { ev.preventDefault(); if (!roomFree()) roomOk(true); return; }
  var st = sel.value;
  if (!st) { ev.preventDefault(); return; }
  var e = document.createElement('input'); e.type = 'hidden'; e.name = 'end'; e.value = addDays(st, nights()); F.appendChild(e);
  ['#f-female', '#f-male', '#f-couple'].forEach(function(s){ var i = $(s); if (!(+i.value)) i.disabled = true; });
  setTimeout(function(){ ['#f-female', '#f-male', '#f-couple'].forEach(function(s){ $(s).disabled = false; }); e.remove(); }, 500);
});

render();
var first = location.hash.slice(1);
furthest = Math.max(0, STEPS.indexOf(first));
history.replaceState({step: STEPS.indexOf(first) >= 0 ? first : 'level'}, '', location.href);
go(STEPS.indexOf(first) >= 0 ? first : 'level');
function boot(){ setTimeout(function(){ booted = true; show(cur); }, 60); }
if (document.readyState === 'complete') boot(); else addEventListener('load', boot);
})();
