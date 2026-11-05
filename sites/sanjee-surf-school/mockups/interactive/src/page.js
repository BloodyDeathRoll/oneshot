/* Everything below is an enhancement. Every booking control is a real wa.me link without it. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var calm = matchMedia('(prefers-reduced-motion: reduce)');

  /* header and persistent bar come in when the hero's own button leaves the screen */
  var hdr = $('.hdr'), bar = $('.bar'), heroBtn = $('.hero-btn'), hdrCta = $('.hdr-cta');
  function ctaRoom() { hdr.style.setProperty('--cta', (hdrCta.offsetWidth ? hdrCta.offsetWidth + 24 : 0) + 'px'); }
  ctaRoom();
  addEventListener('resize', ctaRoom);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ctaRoom);
  new IntersectionObserver(function (es) {
    var gone = !es[0].isIntersecting;
    hdr.classList.toggle('on', gone);
    if (hdrCta) hdrCta.tabIndex = gone ? 0 : -1;
    if (bar) bar.classList.toggle('on', gone);
  }, { rootMargin: '-60px 0px 0px 0px' }).observe(heroBtn);

  /* phone menu: closes on a link, Esc or a tap outside */
  var menu = $('.menu');
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menu.open = false; }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.open) { menu.open = false; $('summary', menu).focus(); } });
  document.addEventListener('click', function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; });

  /* ---- the state: what the visitor is about to send ---- */
  var state = { level: null, lesson: null, date: null, people: null };
  var bubble = $('#bubble'), send = $('#send');
  var shown = [];

  function fmtDate(v) {
    var p = v.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  }
  /* the visitor's words only: nothing here states a fact about the school */
  function words() {
    var w = 'Hello ' + SITE.biz + ", I'd like to ask about ";
    if (state.lesson && state.lesson !== 'unsure') w += 'the ' + state.lesson + '.';
    else w += state.lesson === 'unsure' ? "a surf lesson, I'm not sure which one." : 'a surf lesson.';
    if (state.level) w += ' ' + SITE.levels[state.level];
    if (state.date === 'unsure') w += " I'm not sure of the date yet.";
    else if (state.date) w += ' The date I have in mind is ' + fmtDate(state.date) + '.';
    if (state.people === 'unsure') w += " I'm not sure how many of us there will be.";
    else if (state.people === '1') w += " It's just me.";
    else if (state.people === '2') w += ' There are 2 of us.';
    else if (state.people === '3') w += ' There are 3 or more of us.';
    return w;
  }
  /* new words fade in, in order; words that stay do not move */
  function render() {
    var text = words();
    var next = text.split(' ');
    var a = 0; while (a < shown.length && a < next.length && shown[a] === next[a]) a++;
    var z = 0; while (z < shown.length - a && z < next.length - a && shown[shown.length - 1 - z] === next[next.length - 1 - z]) z++;
    var frag = document.createDocumentFragment();
    var quiet = calm.matches || !shown.length, n = 0;
    next.forEach(function (w, i) {
      var s = document.createElement('span');
      s.textContent = w + (i < next.length - 1 ? ' ' : '');
      frag.appendChild(s);
      if (!quiet && i >= a && i < next.length - z && s.animate) {
        s.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, delay: Math.min(n++, 14) * 22, easing: 'ease-out', fill: 'backwards' });
      }
    });
    bubble.textContent = '';
    bubble.appendChild(frag);
    shown = next;
    send.href = 'https://wa.me/' + SITE.wa + '?text=' + encodeURIComponent(text);
  }

  /* ---- tiles: a pill slides to the choice; matching cards take a dot; nothing is ever dimmed ---- */
  var tilesBox = $('.tiles'), pill = $('.tile-pill'), tiles = $$('.tile'), cards = $$('.card');
  function movePill(t, instant) {
    if (!t) { tilesBox.classList.remove('on'); return; }
    if (instant) pill.style.transition = 'none';
    var was = tilesBox.classList.contains('on');
    pill.style.height = t.offsetHeight + 'px';
    if (!was) { pill.style.transition = 'none'; }
    pill.style.width = t.offsetWidth + 'px';
    pill.style.transform = 'translate(' + t.offsetLeft + 'px,' + t.offsetTop + 'px)';
    tilesBox.classList.add('on');
    if (!was || instant) { void pill.offsetWidth; pill.style.transition = ''; }
  }
  function setLevel(k) {
    state.level = state.level === k ? null : k;
    var cur = null;
    tiles.forEach(function (t) {
      var on = t.getAttribute('data-level') === state.level;
      t.setAttribute('aria-pressed', on);
      if (on) cur = t;
    });
    movePill(cur);
    var first = null;
    cards.forEach(function (c) {
      var fit = !!state.level && (c.getAttribute('data-levels') || '').split(' ').indexOf(state.level) > -1;
      c.classList.toggle('fit', fit);
      $('.foryou', c).setAttribute('aria-hidden', !fit);
      if (fit && !first) first = c;
    });
    /* on a phone the matching card may be off to the side: bring it into the row's view */
    var row = $('.cards');
    if (first && row.scrollWidth > row.clientWidth + 4) {
      row.scrollTo({ left: first.offsetLeft - row.offsetLeft - parseFloat(getComputedStyle(row).paddingLeft), behavior: calm.matches ? 'auto' : 'smooth' });
    }
    $$('.wave').forEach(function (p) {
      p.classList.toggle('lit', !!state.level && p.getAttribute('data-for').split(' ').indexOf(state.level) > -1);
    });
    render();
  }
  tiles.forEach(function (t) { t.addEventListener('click', function () { setLevel(t.getAttribute('data-level')); }); });
  addEventListener('resize', function () {
    var cur = $('.tile[aria-pressed=true]');
    if (cur) movePill(cur, true);
  });

  /* ---- lesson from a card, or from the chips ---- */
  function setLesson(v) {
    state.lesson = state.lesson === v ? null : v;
    cards.forEach(function (c) {
      var on = c.getAttribute('data-lesson') === state.lesson;
      c.classList.toggle('picked', on);
      $('.add', c).setAttribute('aria-pressed', on);
    });
    $$('.chip[data-group=lesson]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-value') === state.lesson); });
    render();
  }
  cards.forEach(function (c) { $('.add', c).addEventListener('click', function () { setLesson(c.getAttribute('data-lesson')); }); });

  var dateIn = $('#date');
  var today = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  dateIn.min = today;
  dateIn.addEventListener('change', function () {
    state.date = dateIn.value || null;
    dateIn.classList.toggle('filled', !!dateIn.value);
    $$('.chip[data-group=date]').forEach(function (b) { b.setAttribute('aria-pressed', false); });
    render();
  });
  $$('.chip').forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.getAttribute('data-group'), v = b.getAttribute('data-value');
      if (g === 'lesson') return setLesson(v);
      state[g] = state[g] === v ? null : v;
      if (g === 'date') { dateIn.value = ''; dateIn.classList.remove('filled'); }
      $$('.chip[data-group=' + g + ']').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-value') === state[g]); });
      render();
    });
  });
  render();

  /* ---- soft-top / hardboard on a phone: digits roll, the ones that stay do not move ---- */
  var rates = $('.rates');
  $$('tbody tr', rates).forEach(function (tr) {
    var s = tr.getAttribute('data-soft'), h = tr.getAttribute('data-hard');
    var len = Math.max(s.length, h.length), a = s.padStart(len, ' '), b = h.padStart(len, ' '), out = '';
    for (var i = 0; i < len; i++) {
      var cls = a[i] === ' ' ? ' nope-soft' : b[i] === ' ' ? ' nope-hard' : '';
      out += '<span class="dg' + cls + '" style="transition-delay:' + (i * 30) + 'ms"><i>' + (a[i] === ' ' ? '&nbsp;' : a[i]) + '</i><i>' + (b[i] === ' ' ? '&nbsp;' : b[i]) + '</i></span>';
    }
    var td = $('.roll', tr);
    td.innerHTML = 'USD <span class="dgs">' + out + '</span>';
    td.removeAttribute('aria-hidden');
    td.setAttribute('aria-label', 'USD ' + s);
  });
  var kindHead = $('thead .roll', rates);
  function setKind(k) {
    rates.setAttribute('data-show', k);
    kindHead.textContent = k === 'soft' ? 'Soft-top' : 'Hardboard';
    $$('.kind button', rates).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-kind') === k); });
    $$('tbody tr', rates).forEach(function (tr) { $('.roll', tr).setAttribute('aria-label', 'USD ' + tr.getAttribute('data-' + k)); });
  }
  $$('.kind button', rates).forEach(function (b) { b.addEventListener('click', function () { setKind(b.getAttribute('data-kind')); }); });
  setKind('soft');

  /* ---- reviews: dots, and a drag with momentum for a mouse ---- */
  var row = $('.quotes'), qs = $$('.quote', row), dots = $$('.dot');
  function nearest() {
    var pad = parseFloat(getComputedStyle(row).paddingLeft), x = row.scrollLeft, best = 0, d = 1e9;
    qs.forEach(function (q, i) { var o = Math.abs(q.offsetLeft - row.offsetLeft - pad - x); if (o < d) { d = o; best = i; } });
    if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 4) best = qs.length - 1;
    return best;
  }
  function markDot() { var n = nearest(); dots.forEach(function (b, i) { b.setAttribute('aria-current', i === n); }); }
  function goTo(i) {
    var pad = parseFloat(getComputedStyle(row).paddingLeft);
    row.scrollTo({ left: qs[i].offsetLeft - row.offsetLeft - pad, behavior: calm.matches ? 'auto' : 'smooth' });
  }
  dots.forEach(function (b, i) { b.addEventListener('click', function () { goTo(i); }); });
  row.addEventListener('scroll', markDot, { passive: true });
  markDot();
  if (matchMedia('(pointer: fine)').matches) {
    var down = false, sx = 0, sl = 0, vx = 0, lx = 0, lt = 0, moved = 0;
    row.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      down = true; moved = 0; sx = lx = e.clientX; sl = row.scrollLeft; vx = 0; lt = e.timeStamp;
      row.setPointerCapture(e.pointerId); row.classList.add('drag');
    });
    row.addEventListener('pointermove', function (e) {
      if (!down) return;
      row.scrollLeft = sl - (e.clientX - sx);
      moved = Math.max(moved, Math.abs(e.clientX - sx));
      var dt = e.timeStamp - lt; if (dt > 0) vx = (lx - e.clientX) / dt;
      lx = e.clientX; lt = e.timeStamp;
    });
    function up() {
      if (!down) return; down = false;
      var v = calm.matches ? 0 : vx * 16;
      (function coast() {
        if (Math.abs(v) > .4) { row.scrollLeft += v; v *= .93; requestAnimationFrame(coast); return; }
        goTo(nearest());
        setTimeout(function () { row.classList.remove('drag'); }, 320);
      })();
    }
    row.addEventListener('pointerup', up);
    row.addEventListener('pointercancel', up);
  }

  /* ---- the boards stand up once, the first time the chart is seen ---- */
  var chart = $('.chart');
  if (chart && !calm.matches && 'IntersectionObserver' in window) {
    var r0 = chart.getBoundingClientRect();
    if (r0.top > innerHeight) {
      chart.classList.add('wait');
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        chart.classList.remove('wait');
        setTimeout(function () { chart.classList.add('done'); }, 800);
      }, { threshold: .2 });
      io.observe(chart);
    } else chart.classList.add('done');
  } else if (chart) chart.classList.add('done');

  /* ---- the print of Sanjee: Kube's parallax, the image 4rem taller than its frame. Off on phones. ---- */
  var pw = $('[data-parallax]'), pi = pw && $('img', pw);
  var wide = matchMedia('(min-width: 901px)');
  if (pw && !calm.matches) {
    var active = false, tick = false, rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    var apply = function () {
      tick = false;
      if (!wide.matches) { pi.style.transform = ''; return; }
      var r = pw.getBoundingClientRect(), vh = innerHeight;
      var p = Math.min(1, Math.max(0, (vh * .7 - r.top) / (vh * .4 + r.height)));
      pi.style.transform = 'translate3d(0,' + (-p * 4 * rem).toFixed(1) + 'px,0)';
    };
    new IntersectionObserver(function (es) { active = es[0].isIntersecting; if (active) apply(); }, { rootMargin: '100px' }).observe(pw);
    addEventListener('scroll', function () { if (active && !tick) { tick = true; requestAnimationFrame(apply); } }, { passive: true });
  }
})();
