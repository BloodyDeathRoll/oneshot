/* Postcard — booking page. Build-time snapshot first; Bookinglayer's public API only after the visitor
   has chosen guests / a date (playbook §4, docs/bookinglayer.md §6). The form is a plain GET to the
   engine's product URL, so everything works without this file. */
(() => {
  const D = JSON.parse(document.getElementById('bk-data').textContent);
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const form = $('#bk'), API = 'https://api.bookinglayer.io/public';
  const q = new URLSearchParams(location.search);
  const S = { level: D.levels[q.get('level')] ? q.get('level') : 'level-1-fomies', room: D.rooms[q.get('room')] ? q.get('room') : null, start: null, nights: 7 };
  const live = { checkin: null, rooms: null, base: null, status: 'snap' };
  $$('#start, #end').forEach((s) => s.removeAttribute('required'));

  const iso = (d) => d.toISOString().slice(0, 10);
  const dt = (s) => new Date(s + 'T00:00:00Z');
  const addDays = (s, n) => { const d = dt(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
  const fmtD = (s, y = true) => dt(s).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: y ? 'numeric' : undefined, timeZone: 'UTC' }).replace(',', '').replace('Sept', 'Sep');
  // cents only on a live quote; snapshot and "from" figures are whole dollars
  const money = (x) => { const c = live.status === 'live'; const r = c ? Math.round(x * 100) / 100 : Math.round(x); return '$' + r.toLocaleString('en-US', { minimumFractionDigits: c && r % 1 ? 2 : 0, maximumFractionDigits: c ? 2 : 0 }); };
  const g = () => ({ f: +$('#g-female').value || 0, m: +$('#g-male').value || 0, c: +$('#g-couple').value || 0 });
  const count = () => { const x = g(); return x.f + x.m + 2 * x.c; };

  // ---------- level
  const setLevel = (slug, first) => {
    S.level = slug; const L = D.levels[slug];
    $$('input[name=lvl]').forEach((r) => { r.checked = r.value === slug; });
    form.action = D.engine + slug;
    $('#band-title').textContent = L.name; $('#s-level').textContent = L.name;
    $('.band').setAttribute('aria-label', L.name);
    $$('[data-incl]').forEach((u) => { u.hidden = u.dataset.incl !== L.incl; });
    const img = $('#band-img'); img.src = `../video/${L.vid}-poster.jpg`;
    const src = img.previousElementSibling; if (src) src.srcset = `../img/${L.vid}-poster-1600.webp`;
    const v = $('#band-vid');
    v.classList.remove('on'); v.pause && v.pause(); v.innerHTML = ''; delete v.dataset.on;
    v.dataset.webmM = `../video/${L.vid}-m1280.webm`; v.dataset.mp4M = `../video/${L.vid}-m720.mp4`;
    if (!window.__calm) { const go = () => { window.__attach(v); const p = v.play(); p && p.catch(() => {}); }; first ? (document.readyState === 'complete' ? setTimeout(go, 150) : addEventListener('load', () => setTimeout(go, 150))) : go(); }
    if (!first) { live.checkin = live.rooms = live.base = null; live.status = 'snap'; refreshLive(); }
    render();
  };
  $$('input[name=lvl]').forEach((r) => r.addEventListener('change', () => setLevel(r.value)));

  // ---------- room
  $$('input[name=room]').forEach((r) => r.addEventListener('change', () => { S.room = r.value; render(); }));
  if (S.room) $(`input[name=room][value=${S.room}]`).checked = true;

  // ---------- calendar (only choosable Saturdays)
  const cal = $('#cal'), btn = $('#cal-btn'), field = $('#cal-field');
  const days = () => (live.checkin ? [...live.checkin] : D.saturdays).sort();
  let month = null;
  const drawCal = () => {
    const list = days(); if (!list.length) { $('#cal-grid').innerHTML = ''; return; }
    const months = [...new Set(list.map((d) => d.slice(0, 7)))];
    if (!month || !months.includes(month)) month = (S.start && months.includes(S.start.slice(0, 7))) ? S.start.slice(0, 7) : months[0];
    const i = months.indexOf(month);
    $('[data-m="-1"]', cal).disabled = i <= 0; $('[data-m="1"]', cal).disabled = i >= months.length - 1;
    const first = dt(month + '-01');
    $('#cal-month').textContent = first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).replace(',', '').replace('Sept', 'Sep');
    let h = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => `<span class="dow" aria-hidden="true">${d}</span>`).join('');
    const pad = (first.getUTCDay() + 6) % 7; h += '<span></span>'.repeat(pad);
    const n = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
    for (let d = 1; d <= n; d++) {
      const s = `${month}-${String(d).padStart(2, '0')}`;
      h += list.includes(s) ? `<button type="button" data-d="${s}" aria-pressed="${s === S.start}" aria-label="${fmtD(s)}">${d}</button>` : `<span class="d" aria-hidden="true">${d}</span>`;
    }
    $('#cal-grid').innerHTML = h;
    $('#cal-foot').textContent = live.checkin ? '' : D.t.snap.replace('{date}', D.asOf);
  };
  const openCal = (o) => { cal.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); if (o) { drawCal(); const b = $('button[aria-pressed=true]', cal) || $('.cal-grid button', cal); b && b.focus(); } };
  btn.addEventListener('click', () => openCal(!cal.classList.contains('open')));
  cal.addEventListener('click', (ev) => {
    const m = ev.target.closest('[data-m]');
    if (m) { const months = [...new Set(days().map((d) => d.slice(0, 7)))]; month = months[months.indexOf(month) + +m.dataset.m] || month; drawCal(); return; }
    const b = ev.target.closest('[data-d]'); if (!b) return;
    S.start = b.dataset.d; openCal(false); btn.focus(); stay();
  });
  cal.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') { openCal(false); btn.focus(); } });
  $$('input[name=nights]').forEach((r) => r.addEventListener('change', () => { S.nights = +r.value; stay(); }));

  const setSel = (sel, v) => { if (!v) { sel.value = ''; return; } if (![...sel.options].some((o) => o.value === v)) sel.add(new Option(v, v)); sel.value = v; };
  const stay = () => {
    setSel($('#start'), S.start); setSel($('#end'), S.start ? addDays(S.start, S.nights) : '');
    btn.textContent = S.start ? `${fmtD(S.start)}  –  ${fmtD(addDays(S.start, S.nights))}` : D.t.place;
    btn.classList.toggle('ph', !S.start);
    live.rooms = live.base = null; refreshLive(); render();
  };

  // ---------- guests
  const clampAll = (changed) => {
    let x = g(); const tot = () => x.f + x.m + 2 * x.c;
    while (tot() > 6) { const k = changed || 'f'; const el = $('#g-' + { f: 'female', m: 'male', c: 'couple' }[k]); el.value = Math.max(0, +el.value - 1); x = g(); }
    $$('.stepper').forEach((s) => { const i = $('input', s); $('.minus', s).disabled = +i.value <= 0; $('.plus', s).disabled = +i.value >= +i.max || count() + (i.name === 'couple' ? 2 : 1) > 6; });
  };
  $$('.stepper').forEach((s) => {
    const i = $('input', s), k = { female: 'f', male: 'm', couple: 'c' }[i.name];
    $$('.sb', s).forEach((b) => b.addEventListener('click', () => { i.value = Math.min(+i.max, Math.max(0, (+i.value || 0) + +b.dataset.d)); guests(k); }));
    i.addEventListener('change', () => { i.value = Math.min(+i.max, Math.max(0, Math.round(+i.value || 0))); guests(k); });
  });
  const guests = (k) => { clampAll(k); live.checkin = live.rooms = live.base = null; refreshLive(); render(); };

  // ---------- live layer (after interaction only)
  let timer, seq = 0;
  const get = (url, opt = {}) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), 8000); return fetch(url, { ...opt, signal: c.signal }).then((r) => { clearTimeout(t); if (!r.ok) throw r.status; return r.json(); }); };
  const refreshLive = () => {
    clearTimeout(timer); const n = count(); if (!n) { live.status = 'snap'; return; }
    timer = setTimeout(async () => {
      const my = ++seq, L = D.levels[S.level], x = g(), pax = `female=${x.f}&male=${x.m}&couple=${x.c}`, bd = `business_domain=${D.bd}`;
      try {
        if (!live.checkin) {
          const today = iso(new Date()), to = addDays(today, 365);
          const r = await get(`${API}/products/${L.id}/availabilities?format=choosable&show_available_only=1&mode=checkin&start=${today}&end=${to}&${pax}&${bd}`);
          if (my !== seq) return;
          const dates = r && r.data && r.data.dates; if (!dates) throw 'shape';
          live.checkin = new Set(Object.keys(dates).filter((d) => dates[d] && dates[d].choosable));
          if (cal.classList.contains('open')) drawCal();
        }
        if (S.start) {
          const end = addDays(S.start, S.nights);
          const [rooms, quote] = await Promise.all([
            get(`${API}/accommodations/availabilities?product=${L.id}&start=${S.start}&end=${end}&currency=USD&${pax}&${bd}`),
            get(`${API}/packages/${L.id}/items?${bd}`, { method: 'POST', headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ start: S.start, end, currency: 'USD', guests: Array.from({ length: n }, (_, i) => ({ id: crypto.randomUUID(), index: i + 1 })), items: [] }) }),
          ]);
          if (my !== seq) return;
          if (!Array.isArray(rooms.data) || !quote.data || !quote.data.totals) throw 'shape';
          live.rooms = new Map();
          rooms.data.forEach((a) => { const t = a.translations && a.translations.en && a.translations.en.title; if (t && !live.rooms.has(t)) live.rooms.set(t, { sup: (a.price && a.price.from) || 0, spots: a.pax && a.pax.availability }); });
          live.base = quote.data.totals.base;
          live.status = 'live';
        }
      } catch (err) { if (my === seq) live.status = 'fail'; }
      render();
    }, 500);
  };

  // ---------- render totals, summary, room states
  const render = () => {
    const n = count(), x = g(), R = S.room && D.rooms[S.room];
    let pkg = live.base && n ? live.base / n : (S.nights === 7 ? D.base7 : null);
    let sup = null;
    if (R) {
      if (live.rooms) sup = live.rooms.has(R.title) ? live.rooms.get(R.title).sup : null;
      else sup = (x.c > 0 && x.f + x.m === 0) ? R.couple : R.single;
    }
    const pp = pkg == null ? null : pkg + (sup || 0);
    const later = D.t.later.replace('{n}', S.nights);
    $('#t-pkg').textContent = pkg == null ? later : money(pkg);
    $('#t-room').textContent = !R ? '–' : (sup ? '+' + money(sup) : D.t.included);
    $('#t-pp').textContent = pp == null ? '–' : money(pp);
    const k = Math.max(n, 1);
    $('#t-all-l').textContent = D.t.all.replace('{n}', k).replace(/ guests$/, k === 1 ? ' guest' : ' guests');
    $('#t-all').textContent = pp == null ? '–' : money(pp * k);
    const src = live.status === 'live' ? D.t.live : live.status === 'fail' ? D.t.fail.replace('{date}', D.asOf) : D.t.snap.replace('{date}', D.asOf);
    $('#t-src').innerHTML = `${D.t.cur}<span class="sep">|</span>${src}`;
    $('#s-src').textContent = src;
    // summary
    const sd = $('#s-dates'); sd.textContent = S.start ? `${fmtD(S.start, false)} – ${fmtD(addDays(S.start, S.nights))}` : D.t.place; sd.classList.toggle('muted', !S.start);
    const sg = $('#s-guests'); sg.textContent = n; sg.classList.toggle('muted', !n);
    const sr = $('#s-room'); sr.textContent = R ? R.label : '–'; sr.classList.toggle('muted', !R);
    $('#s-total').textContent = pp == null ? '–' : money(pp * k);
    $('#m-total').textContent = pp == null ? D.t.later.replace('{n}', S.nights) : money(pp * k);
    // WhatsApp question carries what the visitor chose
    const parts = [D.levels[S.level].name];
    if (S.start) parts.push(`${fmtD(S.start, false)} – ${fmtD(addDays(S.start, S.nights))} (${S.nights} nights)`);
    const gp = []; if (x.f) gp.push(`${x.f} ${x.f > 1 ? 'women' : 'woman'}`); if (x.m) gp.push(`${x.m} ${x.m > 1 ? 'men' : 'man'}`); if (x.c) gp.push(`${x.c} ${x.c > 1 ? 'couples' : 'couple'}`);
    if (gp.length) parts.push(gp.join(', '));
    if (R) parts.push(R.label);
    const wa = $('#wa-q'); if (wa) wa.href = D.wa + encodeURIComponent(`Hi Global Surf Lodge Kabalana, I have a question about ${parts.join(', ')}.`);
    // room cards against live availability
    const free = live.rooms ? [...live.rooms.keys()] : null;
    $$('.rcard').forEach((c) => {
      const r = D.rooms[c.dataset.room], st = $('.state', c), on = !free || free.includes(r.title);
      c.classList.toggle('off', !on);
      st.hidden = on && !(free && free.length === 1);
      st.textContent = !on ? D.t.notfree : (free && free.length === 1 ? D.t.onlyone.replace('{room}', r.label) : '');
      if (live.rooms && on) { const s = live.rooms.get(r.title).sup; $('[data-sup]', c).innerHTML = `<b>${s ? D.t.sup.replace('${amount}', Math.round(s)) : D.t.included}</b><small>${D.t.live}</small>`; }
    });
  };

  // ---------- hand-off: guide to what is missing, else submit the plain GET form
  const missing = () => {
    if (!S.start) { $('#step-dates').scrollIntoView({ behavior: window.__calm ? 'auto' : 'smooth' }); setTimeout(() => openCal(true), 400); return true; }
    if (!count()) { $('#step-dates .fields.three').scrollIntoView({ behavior: window.__calm ? 'auto' : 'smooth', block: 'center' }); $('#g-female').focus({ preventScroll: true }); return true; }
    return false;
  };
  form.addEventListener('submit', (ev) => { if (missing()) ev.preventDefault(); });
  $('#m-go').addEventListener('click', () => { if (!missing()) form.requestSubmit(); });

  const bar = $('#mbar'), go = $('#step-total');
  if (bar && go && 'IntersectionObserver' in window) new IntersectionObserver((es) => bar.classList.toggle('away', es[0].isIntersecting)).observe(go);

  setLevel(S.level, true);
  clampAll();
  stay();
})();
