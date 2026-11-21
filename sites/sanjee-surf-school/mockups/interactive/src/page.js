/* Everything below is an enhancement. Every booking control is a real wa.me link without it. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var calm = matchMedia('(prefers-reduced-motion: reduce)');
  var smooth = function () { return calm.matches ? 'auto' : 'smooth'; };

  /* header: solid as soon as the title reaches it, so the title never prints through the wordmark.
     The header's button and the phone bar come in when the hero's own button has gone. */
  var hdr = $('.hdr'), bar = $('.bar'), heroBtn = $('.hero-btn'), hdrCta = $('.hdr-cta'), h1 = $('h1');
  function ctaRoom() { hdr.style.setProperty('--cta', (hdrCta.offsetWidth ? hdrCta.offsetWidth + 24 : 0) + 'px'); }
  ctaRoom();
  addEventListener('resize', ctaRoom);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ctaRoom);
  var solidIO = function () {
    new IntersectionObserver(function (es) { hdr.classList.toggle('solid', es[0].intersectionRatio < 1); },
      { rootMargin: -(hdr.offsetHeight + 4) + 'px 0px 0px 0px', threshold: 1 }).observe(h1);
  };
  solidIO();
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
  var bubble = $('#bubble'), barText = $('#bar-text'), barMsg = $('.bar-msg'), fits = $('#fits');
  var shown = [];

  function fmtDate(v) {
    var p = v.split('-');
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  }
  /* the visitor's words only: nothing here states a fact about the school */
  function tail(noLevel) {
    var w = '';
    if (state.level && !noLevel) w += ' ' + SITE.levels[state.level];
    if (state.date === 'unsure') w += " I'm not sure of the date yet.";
    else if (state.date) w += ' The date I have in mind is ' + fmtDate(state.date) + '.';
    if (state.people === 'unsure') w += " I'm not sure how many of us there will be.";
    else if (state.people === '1') w += " It's just me.";
    else if (state.people === '2') w += ' There are 2 of us.';
    else if (state.people === '3') w += ' There are 3 or more of us.';
    return w;
  }
  var hello = function () { return 'Hello ' + SITE.biz + ", I'd like to ask about "; };
  function lessonWords() {
    if (state.lesson && state.lesson !== 'unsure') return SITE.lessonAsk[state.lesson] + '.';
    return state.lesson === 'unsure' ? "a surf lesson, I'm not sure which one." : SITE.generic + '.';
  }
  function words() { return hello() + lessonWords() + tail(); }
  function waHref(text) { return 'https://wa.me/' + SITE.wa + '?text=' + encodeURIComponent(text); }

  /* every WhatsApp link on the page carries the same message. A button about its own thing (a lesson card,
     a tour, renting a board) keeps its subject and adds the visitor's level, date and people. */
  var links = $$('a[data-ask]');
  function syncLinks(text) {
    /* a tea estate or a fort does not need the visitor's surfing level, only the date and the people */
    links.forEach(function (a) {
      a.href = a.hasAttribute('data-own') ? waHref(hello() + a.getAttribute('data-ask') + '.' + tail(a.hasAttribute('data-outing'))) : waHref(text);
    });
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
    syncLinks(text);
    /* the phone bar shows what it will send, the moment there is something to send */
    var built = state.level || state.lesson || state.date || state.people;
    var line = text.replace(hello(), '').replace(SITE.generic + '. ', '');
    barText.textContent = line.charAt(0).toUpperCase() + line.slice(1);
    barMsg.classList.toggle('on', !!built);
    barMsg.tabIndex = built ? 0 : -1;
  }

  /* ---- tiles: a ring slides to the choice; matching cards take a dot; nothing is ever dimmed ---- */
  var tilesBox = $('.tiles'), ring = $('.tile-ring'), tiles = $$('.tile'), cards = $$('.card');
  function moveRing(t, instant) {
    if (!t) { tilesBox.classList.remove('on'); return; }
    var was = tilesBox.classList.contains('on');
    if (!was || instant) ring.style.transition = 'none';
    ring.style.width = t.offsetWidth + 'px';
    ring.style.height = t.offsetHeight + 'px';
    ring.style.transform = 'translate(' + t.offsetLeft + 'px,' + t.offsetTop + 'px)';
    tilesBox.classList.add('on');
    if (!was || instant) { void ring.offsetWidth; ring.style.transition = ''; }
  }
  /* what the tile did, right under it: the lessons that fit, and a way to the message */
  function drawFits(matched) {
    fits.textContent = '';
    if (!state.level) { fits.classList.remove('on'); return; }
    matched.forEach(function (c) {
      var a = document.createElement('a');
      a.className = 'fit-chip';
      a.href = '#' + c.id;
      a.innerHTML = '<i></i>';
      a.appendChild(document.createTextNode(c.getAttribute('data-lesson') + ' | ' + c.getAttribute('data-price')));
      a.addEventListener('click', function (e) { e.preventDefault(); showCard(c, true); });
      fits.appendChild(a);
    });
    var m = document.createElement('a');
    m.className = 'fit-chip fit-msg';
    m.href = '#message';
    m.textContent = 'Your message';
    m.classList.toggle('only', !matched.length);
    fits.appendChild(m);
    fits.classList.add('on');
  }
  var cardRow = $('.cards');
  function showCard(c, page) {
    if (cardRow.scrollWidth > cardRow.clientWidth + 4) {
      cardRow.scrollTo({ left: c.offsetLeft - cardRow.offsetLeft - parseFloat(getComputedStyle(cardRow).paddingLeft), behavior: smooth() });
    }
    if (page) c.scrollIntoView({ block: 'center', behavior: smooth() });
  }
  function setLevel(k) {
    state.level = state.level === k ? null : k;
    var cur = null;
    tiles.forEach(function (t) {
      var on = t.getAttribute('data-level') === state.level;
      t.setAttribute('aria-pressed', on);
      if (on) cur = t;
    });
    moveRing(cur);
    var matched = [];
    cards.forEach(function (c) {
      var fit = !!state.level && (c.getAttribute('data-levels') || '').split(' ').indexOf(state.level) > -1;
      c.classList.toggle('fit', fit);
      $('.foryou', c).setAttribute('aria-hidden', !fit);
      if (fit) matched.push(c);
    });
    drawFits(matched);
    if (matched[0]) showCard(matched[0], false);
    $$('.wave').forEach(function (p) {
      p.classList.toggle('lit', !!state.level && p.getAttribute('data-for').split(' ').indexOf(state.level) > -1);
    });
    render();
  }
  tiles.forEach(function (t) { t.addEventListener('click', function () { setLevel(t.getAttribute('data-level')); }); });
  addEventListener('resize', function () {
    var cur = $('.tile[aria-pressed=true]');
    if (cur) moveRing(cur, true);
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
    /* a date before today is not sent: the picker's min does not stop typing. Do not clear the field here:
       Chromium fires change on each year digit, so a good date reads as 0002 on its way to 2026 */
    state.date = dateIn.value >= dateIn.min ? dateIn.value : null;
    dateIn.classList.toggle('filled', !!state.date);
    $$('.chip[data-group=date]').forEach(function (b) { b.setAttribute('aria-pressed', false); });
    render();
  });
  /* leaving the field with a past date: it goes from the field too */
  dateIn.addEventListener('blur', function () { if (dateIn.value && dateIn.value < dateIn.min) dateIn.value = ''; });
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
      /* the rolling digits are drawn by CSS from data attributes, so the unused price is never page text */
      out += '<span class="dg' + cls + '" style="transition-delay:' + (i * 30) + 'ms"><i data-d="' + a[i].trim() + '"></i><i data-d="' + b[i].trim() + '"></i></span>';
    }
    var td = $('.roll', tr);
    td.innerHTML = '<span class="vh price-t">USD ' + s + '</span><span aria-hidden="true"><span class="u"></span><span class="dgs">' + out + '</span></span>';
    td.removeAttribute('aria-hidden');
  });
  var kindHead = $('thead .roll', rates);
  kindHead.removeAttribute('aria-hidden');
  function setKind(k) {
    rates.setAttribute('data-show', k);
    kindHead.textContent = k === 'soft' ? 'Soft-top' : 'Hardboard';
    $$('.kind button', rates).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-kind') === k); });
    $$('tbody tr', rates).forEach(function (tr) { $('.price-t', tr).textContent = 'USD ' + tr.getAttribute('data-' + k); });
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
    row.scrollTo({ left: qs[i].offsetLeft - row.offsetLeft - pad, behavior: smooth() });
  }
  dots.forEach(function (b, i) { b.addEventListener('click', function () { goTo(i); }); });
  row.addEventListener('scroll', markDot, { passive: true });
  markDot();
  if (matchMedia('(pointer: fine)').matches) {
    var down = false, sx = 0, sl = 0, vx = 0, lx = 0, lt = 0;
    row.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      down = true; sx = lx = e.clientX; sl = row.scrollLeft; vx = 0; lt = e.timeStamp;
      row.setPointerCapture(e.pointerId); row.classList.add('drag');
    });
    row.addEventListener('pointermove', function (e) {
      if (!down) return;
      row.scrollLeft = sl - (e.clientX - sx);
      var dt = e.timeStamp - lt; if (dt > 0) vx = (lx - e.clientX) / dt;
      lx = e.clientX; lt = e.timeStamp;
    });
    var up = function () {
      if (!down) return; down = false;
      var v = calm.matches ? 0 : vx * 16;
      (function coast() {
        if (Math.abs(v) > .4) { row.scrollLeft += v; v *= .93; requestAnimationFrame(coast); return; }
        goTo(nearest());
        setTimeout(function () { row.classList.remove('drag'); }, 320);
      })();
    };
    row.addEventListener('pointerup', up);
    row.addEventListener('pointercancel', up);
  }

  /* ---- the boards stand up once, the first time the chart is seen ---- */
  var chart = $('.chart');
  if (chart && !calm.matches) {
    if (chart.getBoundingClientRect().top > innerHeight) {
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
