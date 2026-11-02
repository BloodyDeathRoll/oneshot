(function () {
  'use strict';
  var d = document, root = d.documentElement, $ = function (s, c) { return (c || d).querySelector(s); },
    $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  root.classList.add('js');
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(pointer: fine)').matches;
  var store = { get: function (k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  var lang = 'he';
  var t = function (k) { var v = COPY[lang][k]; return v == null ? '' : v; }; // COPY holds resolved values per key (built by build.mjs)

  /* ---------- language toggle (he <-> en), every visible string from copy/<locale>.json */
  function setLang(l) {
    lang = l; root.lang = l; root.dir = l === 'he' ? 'rtl' : 'ltr';
    $$('[data-t]').forEach(function (e) { var v = t(e.dataset.t); if (e.dataset.nFill) v = v.replace('{n}', e.dataset.nFill); e.innerHTML = trHtml(v); });
    $$('[data-tp]').forEach(function (e) { e.innerHTML = t(e.dataset.tp).split(/\n\s*\n/).map(function (p) { return '<p>' + trHtml(p) + '</p>'; }).join(''); });
    $$('[data-ta]').forEach(function (e) { var p = e.dataset.ta.split(':'); e.setAttribute(p[0], t(p[1])); });
    $$('[data-wa]').forEach(function (e) { e.href = e.href.split('?')[0] + '?text=' + encodeURIComponent(t(e.dataset.wa)); });
    $('[data-lang]').lang = l === 'he' ? 'en' : 'he';
    try { localStorage.setItem('tl-lang', l); } catch (e) {}
    fillDynamic(); route(true);
  }
  $('[data-lang]').addEventListener('click', function () { setLang(lang === 'he' ? 'en' : 'he'); });

  /* ---------- router: hash = view id; CSS :target is the no-JS fallback */
  var views = $$('.view'), current;
  function route(keep) {
    var id = (location.hash || '#home').slice(1).split('?')[0] || 'home';
    var v = d.getElementById(id);
    if (!v || !v.classList.contains('view')) { v = d.getElementById(id === 'main' ? 'home' : 'notfound'); }
    if (id === 'book' && !keep && current && current.id !== 'book' && !d.body.dataset.direct) { /* keep the page: open drawer instead */ }
    views.forEach(function (x) { x.classList.toggle('on', x === v); });
    var changed = current !== v; current = v;
    d.body.classList.toggle('check-on', v.id === 'check');
    $$('.nav a').forEach(function (a) { a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + v.id || (v.id.indexOf('work-') === 0 && a.getAttribute('href') === '#work')); });
    var seo = { home: 'home', story: 'story', launch: 'launch', partnership: 'partnership', work: 'work', about: 'about', brands: 'brands', watch: 'watch', course: 'course', check: 'check' }[v.id];
    d.title = seo ? t('x.seo.' + seo + '.title') : ((($('h1', v) || {}).textContent || '') + ' · Talou L\'oren');
    if (changed && !keep) {
      window.scrollTo(0, 0);
      var h = $('h1', v); if (h && v.id !== 'home') { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }
    if (v.id === 'snapshot' || v.id === 'thanks' || v.id === 'booked') fillDynamic();
    if (v.id === 'check' && changed && !keep) checkOpen();
    requestAnimationFrame(onScroll);
    setTimeout(layoutPin, 50);
  }
  addEventListener('hashchange', function () { route(false); closeMenu(true); });

  /* ---------- menu */
  var menu = $('#menu'), menuBtn = $('[data-menu]');
  function closeMenu(keep) { if (menu.hidden) return; menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); setTimeout(function () { menu.hidden = true; }, 200); if (!keep) menuBtn.focus(); }
  menuBtn.addEventListener('click', function () {
    if (!menu.hidden) return closeMenu();
    menu.hidden = false; menuBtn.setAttribute('aria-expanded', 'true');
    $$('a', menu).forEach(function (a, i) { a.style.setProperty('--i', i); });
    requestAnimationFrame(function () { menu.classList.add('open'); $('a', menu).focus(); });
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); closeDrawer(); closeLb(); } });
  menu.addEventListener('keydown', function (e) { if (e.key !== 'Tab') return; var f = $$('a', menu), i = f.indexOf(d.activeElement); if (e.shiftKey && i === 0) { e.preventDefault(); menuBtn.focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); menuBtn.focus(); } });
  menuBtn.addEventListener('keydown', function (e) { if (e.key === 'Tab' && !menu.hidden) { e.preventDefault(); var f = $$('a', menu); (e.shiftKey ? f[f.length - 1] : f[0]).focus(); } });

  /* ---------- the spot: pointer (fine) or a slow drift (touch), lerp 0.12 */
  var sp = { x: innerWidth * .62, y: innerHeight * .42, tx: 0, ty: 0, active: false, last: 0 };
  sp.tx = sp.x; sp.ty = sp.y;
  var heroFilm = $('.hero-film');
  if (heroFilm) { var r0 = heroFilm.getBoundingClientRect(); sp.x = sp.tx = r0.left + r0.width * .55; sp.y = sp.ty = r0.top + r0.height * .36; }
  function restOn(el) { var r = el.getBoundingClientRect(); sp.tx = r.left + r.width * .5; sp.ty = r.top + r.height * .5; }
  // the light lands on the person: rest point is the face in the film (vid-033 crop: x 55 %, y 36 %)
  function restFace() { var r = heroFilm.getBoundingClientRect(); sp.tx = r.left + r.width * .55; sp.ty = r.top + r.height * (matchMedia('(max-width: 860px)').matches ? .42 : .36); }
  if (!RM) {
    addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') { sp.tx = e.clientX; sp.ty = e.clientY; sp.last = performance.now(); } }, { passive: true });
    if (!FINE) {
      // touch: drift between the headline and Tal's face, then rest on the headline after 4 s
      var t0 = performance.now();
      setInterval(function () {
        if (current && current.id !== 'home') return;
        var k = (performance.now() - t0) / 1000, hd = $('#h-hero');
        if (k > 3.2) { restFace(); return; }
        var r = heroFilm.getBoundingClientRect(), h = hd.getBoundingClientRect();
        var a = (Math.sin(k * 2 - 1.57) + 1) / 2;
        sp.tx = (r.left + r.width * .58) * (1 - a) + (h.left + h.width * .5) * a;
        sp.ty = (r.top + r.height * .4) * (1 - a) + (h.top + h.height * .5) * a;
      }, 60);
    }
    (function tick() {
      // nothing moves while the visitor is idle on a fine pointer: rest on the headline after 4 s
      if (FINE && performance.now() - sp.last > 2500 && current && current.id === 'home' && scrollY < innerHeight * .6) restFace();
      sp.x += (sp.tx - sp.x) * .12; sp.y += (sp.ty - sp.y) * .12;
      root.style.setProperty('--sx', sp.x.toFixed(1) + 'px');
      root.style.setProperty('--sy', sp.y.toFixed(1) + 'px');
      $$('.spot').forEach(function (s) { var z = s.parentNode.getBoundingClientRect(); s.style.setProperty('--sx', (sp.x - z.left).toFixed(1) + 'px'); s.style.setProperty('--sy', (sp.y - z.top).toFixed(1) + 'px'); });
      if (heroFilm) { var r = heroFilm.getBoundingClientRect(); heroFilm.style.setProperty('--fx', (sp.x - r.left).toFixed(1) + 'px'); heroFilm.style.setProperty('--fy', (sp.y - r.top).toFixed(1) + 'px'); }
      requestAnimationFrame(tick);
    })();
  }

  /* ---------- hero video: poster first, attached after first paint; never under reduced motion / Save-Data */
  var hv = $('#hero-video');
  var saveData = navigator.connection && navigator.connection.saveData;
  if (hv && !RM && !saveData) {
    addEventListener('load', function () {
      setTimeout(function () {
        var m = matchMedia('(max-width: 860px)').matches ? hv.dataset.srcM : hv.dataset.srcD;
        hv.innerHTML = '<source src="' + m + '.webm" type="video/webm"><source src="' + m + '.mp4" type="video/mp4">';
        hv.load(); hv.play().then(function () { hv.classList.add('playing'); }).catch(function () {});
        hv.addEventListener('playing', function () { hv.classList.add('playing'); });
      }, 300);
    });
  }

  /* ---------- per-card light: doors and case cards follow the pointer */
  $$('[data-spot-card]').forEach(function (c) {
    c.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(); c.style.setProperty('--cx', (e.clientX - r.left) + 'px'); c.style.setProperty('--cy', (e.clientY - r.top) + 'px'); });
  });
  $$('[data-pair]').forEach(function (p) {
    $$(':scope > div', p).forEach(function (col, i) {
      col.addEventListener('pointerenter', function () { p.classList.add('focus-' + i); });
      col.addEventListener('pointerleave', function () { p.classList.remove('focus-' + i); });
    });
  });
  $$('[data-dimrow]').forEach(function (r) {
    r.addEventListener('pointerenter', function () { r.classList.add('dim-on'); });
    r.addEventListener('pointerleave', function () { r.classList.remove('dim-on'); });
  });

  /* ---------- scroll: the mirror's lines light at the centre, ladder words fill, method numbers fill, the pin */
  var hdr = $('.hdr');
  var pains = $$('.pains li'), words = $$('.fw'), cases = $('.cases'), track = $('.cases-track');
  var pinOn = false;
  function layoutPin() {
    pinOn = !RM && innerWidth >= 1024 && current && current.id === 'home';
    cases.classList.toggle('pinned', pinOn);
    if (!pinOn) { cases.style.height = ''; track.style.transform = ''; return; }
    var over = track.scrollWidth - innerWidth;
    cases.style.height = (innerHeight + Math.max(0, over)) + 'px';
  }
  function onScroll() {
    var vh = innerHeight, c = vh / 2;
    if (!RM) pains.forEach(function (li) {
      var r = li.getBoundingClientRect(), m = r.top + r.height / 2, k = Math.max(0, 1 - Math.abs(m - c) / (vh * .32));
      li.style.setProperty('--o', (.35 + .65 * k).toFixed(3));
      li.style.setProperty('--g', (k > .85 ? (k - .85) / .15 : 0).toFixed(3));
    });
    words.forEach(function (w, i) { var r = w.getBoundingClientRect(); if (r.top < vh * (.78 - i * .05)) w.classList.add('fill'); else if (r.top > vh) w.classList.remove('fill'); });
    $$('.view.on [data-method] li.in').forEach(function (li) { if (li.getBoundingClientRect().top < vh * .8) li.classList.add('lit'); });
    if (pinOn) {
      var r = cases.getBoundingClientRect(), total = cases.offsetHeight - vh, p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      var over = track.scrollWidth - innerWidth;
      track.style.transform = 'translateX(' + ((root.dir === 'rtl' ? 1 : -1) * p * over).toFixed(1) + 'px)';
    }
    $$('.stat-v').forEach(function (e) { if (e.getBoundingClientRect().top < vh * .85) e.classList.add('fill'); });
    hdr.classList.toggle('scrolled', scrollY > 24 || (current && current.id !== 'home' && scrollY > 0));
    $$('.sig-draw').forEach(function (s) { if (s.getBoundingClientRect().top < vh * .95 && s.offsetParent) s.classList.add('drawn'); });
  }
  addEventListener('scroll', function () { requestAnimationFrame(onScroll); }, { passive: true });
  addEventListener('resize', function () { layoutPin(); onScroll(); });

  /* ---------- marquees: duplicate once for a seamless loop */
  $$('[data-marquee] ul').forEach(function (u) { $$('li', u).forEach(function (li) { var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $$('img', c).forEach(function (i) { i.alt = ''; }); u.appendChild(c); }); });

  /* ---------- work filter with a sliding underlay */
  var chips = $('[data-filter]');
  function placeUl() { var on = $('.chip[aria-pressed=true]', chips), ul = $('.chip-ul', chips); if (!on.offsetParent) return; ul.style.left = on.offsetLeft + 'px'; ul.style.width = on.offsetWidth + 'px'; }
  $$('.chip', chips).forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.chip', chips).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      $$('.w-row').forEach(function (r) { r.hidden = b.dataset.f !== 'all' && r.dataset.sector !== b.dataset.f; });
      placeUl();
    });
  });
  addEventListener('hashchange', function () { setTimeout(placeUl, 30); });

  /* ---------- video lightbox: the embed loads only on tap */
  var lb = $('#lightbox'), lbFrom;
  function closeLb() { if (lb.hidden) return; $('iframe', lb).src = 'about:blank'; lb.hidden = true; if (lbFrom) lbFrom.focus(); }
  d.addEventListener('click', function (e) {
    var b = e.target.closest('[data-video]'); if (!b) return;
    lbFrom = b; $('iframe', lb).src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.video + '?autoplay=1&rel=0';
    lb.hidden = false; $('[data-lbclose]', lb).focus();
  });
  $('[data-lbclose]').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

  /* ---------- trap focus in a dialog */
  function trap(box, e) {
    if (e.key !== 'Tab') return;
    var f = $$('a[href],button:not([disabled]),input,textarea,[tabindex="0"]', box).filter(function (x) { return x.offsetParent; });
    if (!f.length) return; var a = f[0], z = f[f.length - 1];
    if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
  }
  lb.addEventListener('keydown', function (e) { trap(lb, e); });

  /* ---------- booking: drawer on desktop and phone, its own page for links / JS off */
  var dr = $('#drawer'), drFrom;
  function openDrawer(from) { drFrom = from; dr.hidden = false; requestAnimationFrame(function () { dr.classList.add('open'); var f = $('.day', dr) || $('.x', dr); f.focus(); }); d.body.style.overflow = 'hidden'; }
  function closeDrawer() { if (dr.hidden) return; dr.classList.remove('open'); d.body.style.overflow = ''; setTimeout(function () { dr.hidden = true; }, 420); if (drFrom) drFrom.focus(); }
  d.addEventListener('click', function (e) { var b = e.target.closest('[data-book]'); if (!b) return; e.preventDefault(); openDrawer(b); });
  $$('[data-close]', dr).forEach(function (b) { b.addEventListener('click', closeDrawer); });
  dr.addEventListener('keydown', function (e) { trap(dr, e); });

  var DAYS = [], now = new Date();
  for (var i = 1; DAYS.length < 7; i++) { var dd = new Date(now); dd.setDate(now.getDate() + i); if (dd.getDay() !== 6) DAYS.push(dd); }
  var SLOTS = ['09:00', '10:30', '12:00', '14:30', '16:00', '18:30']; // shortcut: mock slots; the calendar tool (not chosen) supplies real ones
  function bookSetup(form) {
    var st = { step: 0, day: null, slot: null };
    var dayBox = $('[data-days]', form), slotBox = $('[data-slots]', form);
    function draw() {
      var fmt = new Intl.DateTimeFormat(lang === 'he' ? 'he-IL' : 'en-GB', { weekday: 'short' });
      dayBox.innerHTML = DAYS.map(function (x, i) { return '<button type="button" class="day" role="radio" aria-checked="' + (st.day === i) + '" data-i="' + i + '">' + fmt.format(x) + '<b>' + x.getDate() + '</b></button>'; }).join('');
      slotBox.innerHTML = st.day == null ? '' : SLOTS.map(function (s, i) { return '<button type="button" class="slot" role="radio" aria-checked="' + (st.slot === i) + '" data-i="' + i + '">' + s + '</button>'; }).join('');
    }
    function show() {
      $$('.b-step', form).forEach(function (s) { s.hidden = +s.dataset.step !== st.step; });
      $$('.b-steps li', form).forEach(function (l, i) { l.classList.toggle('on', i <= st.step); });
      $('[data-bback]', form).hidden = st.step === 0;
      $('[data-bnext]', form).hidden = st.step === 2; $('[data-bpay]', form).hidden = st.step !== 2;
      valid();
    }
    function valid() {
      var ok = st.step === 0 ? st.slot != null : st.step === 1 ? $$('.b-step[data-step="1"] input', form).every(function (i) { return i.value.trim(); }) : true;
      $('[data-bnext]', form).disabled = !ok;
    }
    dayBox.addEventListener('click', function (e) { var b = e.target.closest('.day'); if (!b) return; st.day = +b.dataset.i; st.slot = null; draw(); $('.day[aria-checked=true]', form).focus(); valid(); });
    slotBox.addEventListener('click', function (e) { var b = e.target.closest('.slot'); if (!b) return; st.slot = +b.dataset.i; draw(); $('.slot[aria-checked=true]', form).focus(); valid(); });
    form.addEventListener('input', valid);
    $('[data-bnext]', form).addEventListener('click', function () { st.step++; show(); });
    $('[data-bback]', form).addEventListener('click', function () { st.step--; show(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var day = DAYS[st.day];
      store.set('tl-booked', { date: day.toISOString(), time: SLOTS[st.slot] });
      closeDrawer(); location.hash = '#booked';
    });
    form.redraw = draw; draw(); show();
  }
  $$('[data-bookform]').forEach(bookSetup);

  /* ---------- the Focused Check: one question per screen, the spot on the question, then on the chosen option */
  var cf = $('[data-check]'), intro = $('[data-intro]'), qs = $$('.q', cf), qi = 0, ans = store.get('tl-check') || {};
  function checkOpen() {
    if (ans.q3 != null) { intro.hidden = true; cf.hidden = false; showQ(0); }
  }
  function answered(i) {
    var q = qs[i]; if (q.hasAttribute('data-optional')) return true;
    if (i === 10) return $$('input', q).every(function (x) { return x.type === 'checkbox' ? x.checked : x.value.trim(); });
    var txt = $('input[type=text],textarea', q), none = $('input[name$=none]', q);
    if (txt) return !!txt.value.trim() || (none && none.checked);
    return !!$('input:checked', q);
  }
  function save() {
    qs.forEach(function (q, i) {
      $$('input,textarea', q).forEach(function (x) { if (x.type === 'radio' || x.type === 'checkbox') { if (x.checked) ans[x.name + (x.type === 'checkbox' ? '_' + x.value : '')] = x.value; else if (x.type === 'checkbox') delete ans[x.name + '_' + x.value]; } else ans[x.name] = x.value; });
    });
    store.set('tl-check', ans);
  }
  function restore() {
    $$('input,textarea', cf).forEach(function (x) {
      if (x.type === 'radio') x.checked = ans[x.name] === x.value;
      else if (x.type === 'checkbox') x.checked = ans[x.name + '_' + x.value] != null || (x.value === 'on' && ans[x.name + '_on'] != null);
      else if (ans[x.name] != null) x.value = ans[x.name];
    });
  }
  function showQ(i) {
    qi = i; qs.forEach(function (q, j) { q.hidden = j !== i; });
    $('[data-n]', cf).textContent = Math.min(i + 1, 10);
    $('.progress', cf).style.setProperty('--p', Math.min(1, i / 10));
    $('[data-back]', cf).disabled = false;
    $('[data-next]', cf).hidden = i === 10; $('[data-submit]', cf).hidden = i !== 10;
    $('[data-next]', cf).disabled = !answered(i);
    var lg = $('legend', qs[i]); if (lg) { lg.setAttribute('tabindex', '-1'); lg.focus({ preventScroll: true }); if (!RM) restOnSoon(lg); }
    window.scrollTo(0, 0);
  }
  function restOnSoon(el) { setTimeout(function () { restOn(el); sp.last = performance.now(); }, 40); }
  restore();
  $('[data-start]').addEventListener('click', function () { intro.hidden = true; cf.hidden = false; showQ(0); });
  cf.addEventListener('input', function (e) { save(); $('[data-next]', cf).disabled = !answered(qi); if (qi === 10) $('[data-submit]', cf).disabled = !answered(10); });
  cf.addEventListener('change', function (e) { var o = e.target.closest('.opt'); if (o && !RM) { restOn(o); sp.last = performance.now(); } });
  $('[data-next]', cf).addEventListener('click', function () { if (answered(qi)) showQ(qi + 1); });
  $('[data-back]', cf).addEventListener('click', function () { if (qi === 0) { cf.hidden = true; intro.hidden = false; return; } showQ(qi - 1); });
  cf.addEventListener('submit', function (e) { e.preventDefault(); if (!answered(10)) return; save(); location.hash = '#thanks'; });
  // question 3 answered on Home: the answer is saved and the Check opens at question 1
  $$('[data-q3]').forEach(function (a) { a.addEventListener('click', function () { ans.q3 = String(a.dataset.q3); store.set('tl-check', ans); restore(); }); });

  /* ---------- values the visitor typed, shown back on thanks / snapshot / booked */
  function fillDynamic() {
    var biz = (ans.q1 || '').split(/[,،]/)[0].trim(), first = (ans.name || '').trim().split(/\s+/)[0];
    var h = $('[data-bizname]'); h.innerHTML = biz ? trHtml(biz) : trHtml(t('x.pages.snapshot.title'));
    var th = $('#thanks h1'); th.innerHTML = trHtml(first ? t('x.pages.thanks.title').replace('{first_name}', first) : t('x.pages.thanks.title'));
    var b = store.get('tl-booked'), bk = $('[data-booked]');
    if (b) { var dt = new Date(b.date); bk.innerHTML = trHtml(t('x.pages.booked.body').replace('{date}', dt.toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-GB', { day: 'numeric', month: 'long' })).replace('{time}', b.time)); }
    $$('[data-bookform]').forEach(function (f) { if (f.redraw) f.redraw(); });
  }

  /* ---------- mock forms (no backend at this stage) */
  $$('[data-mockform]').forEach(function (f) { f.addEventListener('submit', function (e) { e.preventDefault(); var ok = $('.ok', f); if (ok) ok.hidden = false; }); });
  $$('[data-mock]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });

  /* ---------- magnetic gold buttons on fine pointers (0.25x) */
  if (FINE && !RM) $$('.btn-gold').forEach(function (b) {
    b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .25).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * .25).toFixed(1) + 'px)'; });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });

  var saved = null; try { saved = localStorage.getItem('tl-lang'); } catch (e) {}
  if (saved === 'en') setLang('en'); else route(true);
  placeUl(); onScroll();
})();
