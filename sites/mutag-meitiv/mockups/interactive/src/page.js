(function () {
  var d = document, root = d.documentElement;
  root.classList.remove('no-js'); root.classList.add('js');
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SAVE = navigator.connection && navigator.connection.saveData;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var DATA = JSON.parse($('#fmt-data').textContent);

  /* header: solid after the hero top; WhatsApp pill hidden while the hero card's button is in view */
  var hdr = $('.hdr'), hdrWa = $('.hdr-wa'), bar = $('.pbar'), heroBtn = $('#hero-wa'), foot = $('.foot');
  function onScroll() { hdr.classList.toggle('solid', scrollY > 40 || hdr.classList.contains('open')); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var heroIn = true, footIn = false;
  function syncBar() {
    bar.classList.toggle('on', !heroIn && !footIn);
    hdrWa.classList.toggle('off', heroIn);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { heroIn = es[0].isIntersecting; syncBar(); }).observe(heroBtn);
    new IntersectionObserver(function (es) { footIn = es[0].isIntersecting; syncBar(); }).observe(foot);
  }
  var menuBtn = $('.menu-btn');
  menuBtn.addEventListener('click', function () {
    var o = hdr.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); onScroll();
  });
  $$('.nav a').forEach(function (a) { a.addEventListener('click', function () { hdr.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && hdr.classList.contains('open')) { hdr.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); } });

  /* hero: format chips -> photo, line, WhatsApp message */
  var chips = $$('.chip'), pics = $$('.hero-ph picture'), line = $('#hero-line'), bub = $('#hero-msg');
  var loaded = false;
  function loadAll() {
    if (loaded) return; loaded = true;
    pics.forEach(function (p) {
      $$('[data-srcset]', p).forEach(function (s) { s.srcset = s.dataset.srcset; s.removeAttribute('data-srcset'); });
      var im = $('img[data-src]', p); if (im) { im.src = im.dataset.src; im.removeAttribute('data-src'); }
    });
  }
  function pick(k, fromHero) {
    var f = DATA[k]; if (!f) return;
    loadAll();
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.k === k); c.classList.remove('cur'); });
    var p = $('.hero-ph picture[data-k="' + k + '"]'), im = $('img', p);
    function show() { pics.forEach(function (q) { q.classList.toggle('on', q === p); }); }
    var done = false; function sh() { if (!done) { done = true; show(); } } if (im.decode) im.decode().then(sh, sh); else im.addEventListener('load', sh, { once: true }); setTimeout(sh, 700);
    line.textContent = f.line;
    heroBtn.href = f.wa;
    bub.classList.add('swap');
    setTimeout(function () { bub.textContent = f.msg; bub.classList.remove('swap'); }, RM ? 0 : 160);
    if (fromHero) selectTab(k, false);
  }
  chips.forEach(function (c) {
    c.setAttribute('role', 'button'); c.setAttribute('aria-pressed', 'false');
    c.addEventListener('click', function (e) { e.preventDefault(); pick(c.dataset.k, true); });
    c.addEventListener('keydown', function (e) { if (e.key === ' ') { e.preventDefault(); pick(c.dataset.k, true); } });
  });
  $('.chips').addEventListener('pointerenter', loadAll, { once: true });
  $('.chips').addEventListener('focusin', loadAll, { once: true });

  /* formats: tabs */
  var tabs = $$('.tab'), ink = $('.tab-ink'), tablist = $('.tabs');
  tablist.setAttribute('role', 'tablist');
  function moveInk(t) {
    if (!ink) return;
    var r = t.getBoundingClientRect(), pr = tablist.getBoundingClientRect();
    ink.style.width = r.width + 'px';
    ink.style.transform = 'translateX(' + (r.right - pr.right + 0) + 'px)';
  }
  function selectTab(k, focus) {
    tabs.forEach(function (t) {
      var on = t.dataset.k === k;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
      if (on) { moveInk(t); if (focus) t.focus(); var tr = t.getBoundingClientRect(), lr = tablist.getBoundingClientRect(); if (tr.left < lr.left || tr.right > lr.right) tablist.scrollLeft += (tr.left < lr.left ? tr.left - lr.left - 16 : tr.right - lr.right + 16); }
    });
  }
  tabs.forEach(function (t, i) {
    t.setAttribute('role', 'tab');
    t.addEventListener('click', function (e) { e.preventDefault(); selectTab(t.dataset.k); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowRight' ? -1 : 0;   /* RTL: left = forward */
      if (n) { e.preventDefault(); var j = (i + n + tabs.length) % tabs.length; selectTab(tabs[j].dataset.k, true); }
    });
  });
  $$('.panel').forEach(function (p) { p.setAttribute('role', 'tabpanel'); });
  selectTab(tabs[0].dataset.k);
  addEventListener('resize', function () { var t = $('.tab[aria-selected=true]'); if (t) moveInk(t); });
  if (d.fonts) d.fonts.ready.then(function () { var t = $('.tab[aria-selected=true]'); if (t) moveInk(t); });

  /* video: attached after load, only when it is shown; never under reduced motion or Save-Data */
  var vid = $('#making-vid');
  function vidOn(on) {
    if (!vid || RM || SAVE) return;
    if (on && !vid.dataset.ready) {
      vid.dataset.ready = 1;
      $$('source[data-src]', vid).forEach(function (s) { s.src = s.dataset.src; });
      vid.load();
    }
    if (on) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } else if (vid.dataset.ready) vid.pause();
  }

  /* method: the deck */
  var deckSec = $('.deck-sec'), slides = $$('.slide'), cards = $$('.bcard'), stTabs = $$('.stage-tabs button'), dDots = $$('.deck-sec .dot');
  var wide = matchMedia('(min-width:1024px)');
  var front = 0;
  function layout() {
    var fan = wide.matches && !RM;
    deckSec.classList.toggle('fan', fan);
    cards.forEach(function (c, i) {
      var pos = (i - front + 4) % 4;
      c.dataset.pos = pos;
      c.classList.toggle('flipped', fan && pos === 0 && c.dataset.flip !== '0');
      var back = $('.back', c), fr = $('.front', c);
      if (fan) {
        c.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
        c.tabIndex = -1;
      } else { c.removeAttribute('aria-hidden'); c.removeAttribute('tabindex'); }
    });
    slides.forEach(function (s, i) { s.classList.toggle('front', i === front); });
    stTabs.forEach(function (b, i) { b.setAttribute('aria-current', i === front); });
    dDots.forEach(function (b, i) { b.setAttribute('aria-current', i === front); });
  }
  function go(i) {
    front = (i + 4) % 4;
    cards.forEach(function (c) { c.dataset.flip = '1'; c.classList.remove('flipped'); });
    layout();
    var c = cards[front];
    if (deckSec.classList.contains('fan')) { c.classList.remove('flipped'); setTimeout(function () { c.classList.add('flipped'); }, RM ? 0 : 260); }
    vidOn(front === 2 && deckVisible);
  }
  cards.forEach(function (c, i) {
    c.addEventListener('click', function () {
      if (!deckSec.classList.contains('fan')) return;
      if (i === front) { c.dataset.flip = c.classList.contains('flipped') ? '0' : '1'; c.classList.toggle('flipped'); }
      else go(i);
    });
  });
  stTabs.forEach(function (b, i) { b.addEventListener('click', function () { go(i); }); });
  $$('.deck-ctl .arrow').forEach(function (b) { b.addEventListener('click', function () { go(front + (+b.dataset.dir)); }); });
  deckSec.addEventListener('keydown', function (e) {
    if (!deckSec.classList.contains('fan')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(front + 1); } else if (e.key === 'ArrowRight') { e.preventDefault(); go(front - 1); }
  });
  /* drag / swipe on the fanned deck */
  var sx = null;
  $('.slides').addEventListener('pointerdown', function (e) { if (deckSec.classList.contains('fan')) sx = e.clientX; });
  addEventListener('pointerup', function (e) { if (sx === null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(front + (dx < 0 ? 1 : -1)); });
  /* phone: scroll-snap row; dots follow the scroll */
  var row = $('.slides');
  row.addEventListener('scroll', function () {
    if (deckSec.classList.contains('fan')) return;
    var best = 0, bd = 1e9, rr = row.getBoundingClientRect();
    slides.forEach(function (s, i) { var r = s.getBoundingClientRect(); var dd = Math.abs(r.right - rr.right - (-parseFloat(getComputedStyle(row).paddingRight || 0))); if (dd < bd) { bd = dd; best = i; } });
    if (best !== front) { front = best; layout(); vidOn(front === 2 && deckVisible); }
  }, { passive: true });
  dDots.forEach(function (b, i) { b.addEventListener('click', function () { slides[i].scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'nearest', inline: 'start' }); }); });
  var deckVisible = false;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { deckVisible = es[0].isIntersecting; vidOn(front === 2 && deckVisible); }, { rootMargin: '100px' }).observe(deckSec);
  wide.addEventListener('change', layout);
  layout();
  if (deckSec.classList.contains('fan')) cards[0].classList.add('flipped');

  /* in-page links to a tab panel or an individuals list: select / open it first, then scroll there */
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#fmt-"], a[href^="#acc-"]');
    if (!a || a.classList.contains('chip') || a.classList.contains('tab') || a.classList.contains('subchip')) return;
    var id = a.getAttribute('href').slice(1), dest;
    if (id.indexOf('fmt-') === 0) { selectTab(id.slice(4)); dest = $('.tabs'); }
    else { var sc = $('.subchip[aria-controls="' + id + '"]'); if (sc && sc.getAttribute('aria-expanded') !== 'true') sc.click(); dest = $('#also'); }
    if (!dest) return;
    e.preventDefault();
    hdr.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false');
    dest.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  });

  /* logo marquee: pause button */
  var mq = $('.mq'), mqb = $('.mq-btn button');
  if (mqb) mqb.addEventListener('click', function () {
    var p = mq.classList.toggle('paused'); mqb.setAttribute('aria-pressed', p);
    $('span', mqb).textContent = p ? mqb.dataset.play : mqb.dataset.pause;
  });

  /* quotes: one at a time, the track takes the height of the shown quote */
  var qt = $('.qtrack'), qs = $$('.qs'), qd = $$('.quotes .dot'), qi = 0;
  qs.forEach(function (q) {
    var bq = $('blockquote', q), mb = $('.q-more', q);
    if (q.classList.contains('clamp') && bq.scrollHeight > bq.clientHeight + 4) {
      mb.hidden = false;
      mb.addEventListener('click', function () { var o = q.classList.toggle('clamp'); mb.setAttribute('aria-expanded', !o); mb.textContent = o ? mb.dataset.more : mb.dataset.less; fit(); });
    } else q.classList.remove('clamp');
  });
  function fit() { qt.style.height = qs[qi].offsetHeight + 'px'; }
  function qgo(i, scroll) {
    qi = (i + qs.length) % qs.length;
    qd.forEach(function (b, j) { b.setAttribute('aria-current', j === qi); });
    if (scroll !== false) qt.scrollTo({ left: qs[qi].offsetLeft - qt.offsetLeft - (qt.clientWidth - qs[qi].offsetWidth), behavior: RM ? 'auto' : 'smooth' });
    fit();
  }
  $$('.qnav .arrow').forEach(function (b) { b.addEventListener('click', function () { qgo(qi + (+b.dataset.dir)); }); });
  qd.forEach(function (b, i) { b.addEventListener('click', function () { qgo(i); }); });
  var qtm;
  qt.addEventListener('scroll', function () {
    clearTimeout(qtm); qtm = setTimeout(function () {
      var rr = qt.getBoundingClientRect(), best = 0, bd = 1e9;
      qs.forEach(function (q, i) { var dd = Math.abs(q.getBoundingClientRect().right - rr.right); if (dd < bd) { bd = dd; best = i; } });
      if (best !== qi) qgo(best, false);
    }, 90);
  }, { passive: true });
  addEventListener('resize', fit); if (d.fonts) d.fonts.ready.then(fit); fit();

  /* individuals: sub-chips open their list */
  $$('.subchip').forEach(function (b) {
    var acc = $('#' + b.getAttribute('aria-controls'));
    b.setAttribute('aria-expanded', 'false'); acc.classList.add('shut'); acc.setAttribute('inert', '');
    b.addEventListener('click', function (e) {
      e.preventDefault();
      var open = b.getAttribute('aria-expanded') !== 'true';
      $$('.subchip').forEach(function (o) { var a = $('#' + o.getAttribute('aria-controls')); o.setAttribute('aria-expanded', 'false'); a.classList.add('shut'); a.setAttribute('inert', ''); });
      if (open) { b.setAttribute('aria-expanded', 'true'); acc.classList.remove('shut'); acc.removeAttribute('inert'); }
    });
  });

  /* demo case study: the four stages light in order, the story opens in place */
  var dt = $('.demo-tile'), dbtn = $('#demo-btn'), dmore = $('#demo-more'), lis = $$('.stg li');
  function light() { if (RM) { lis.forEach(function (l) { l.classList.add('lit'); }); return; } lis.forEach(function (l, i) { setTimeout(function () { l.classList.add('lit'); }, 140 * i); }); }
  function unlight() { lis.forEach(function (l) { l.classList.remove('lit'); }); }
  dt.addEventListener('pointerenter', light); dt.addEventListener('pointerleave', function () { if (dmore.hidden) unlight(); });
  dmore.hidden = true; dbtn.setAttribute('aria-expanded', 'false');
  dbtn.addEventListener('click', function () { var o = dmore.hidden; dmore.hidden = !o; dbtn.setAttribute('aria-expanded', o); $('span', dbtn).textContent = o ? dbtn.dataset.less : dbtn.dataset.more; if (o) light(); });

  /* team: bios open in place, Esc closes, focus returns */
  var openBio = null, opener = null;
  function closeBio() { if (!openBio) return; openBio.hidden = true; opener.setAttribute('aria-expanded', 'false'); opener.focus(); openBio = null; }
  $$('.person button').forEach(function (b) {
    b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', function () {
      var bio = $('#' + b.getAttribute('aria-controls'));
      if (openBio === bio) { closeBio(); return; }
      if (openBio) { openBio.hidden = true; opener.setAttribute('aria-expanded', 'false'); }
      var li = b.closest('.person'), list = li.parentNode, items = $$('.person', list), wide2 = matchMedia('(max-width:900px)').matches;
      /* place the bio after the last person of the clicked row */
      var top = li.offsetTop, last = li;
      items.forEach(function (p) { if (Math.abs(p.offsetTop - top) < 30) last = p; });
      last.after(bio);
      bio.hidden = false; b.setAttribute('aria-expanded', 'true'); openBio = bio; opener = b;
      $('.x', bio).focus();
    });
  });
  $$('.bio').forEach(function (bio) { bio.hidden = true; $('.x', bio).addEventListener('click', closeBio); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBio(); });
})();
