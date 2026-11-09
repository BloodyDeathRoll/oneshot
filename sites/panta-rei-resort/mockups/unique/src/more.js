  /* ---------- slideshows: scroll-snap tracks with dots and arrows ---------- */
  document.querySelectorAll('[data-gal]').forEach(function (g) {
    var track = g.querySelector('.gal-track'), dots = g.querySelectorAll('.dot');
    var kids = function () { return track.children; };
    var idx = function () { var w = kids()[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0); return Math.round(track.scrollLeft / (w || 1)); };
    var go = function (i) { var n = kids().length; i = (i + n) % n; track.scrollTo({ left: kids()[i].offsetLeft - kids()[0].offsetLeft }); };
    var mark = function () { var i = idx(); dots.forEach(function (d, k) { d.classList.toggle('on', k === i); d.setAttribute('aria-current', k === i ? 'true' : 'false'); }); };
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    g.querySelector('.prev').addEventListener('click', function () { go(idx() - 1); });
    g.querySelector('.next').addEventListener('click', function () { go(idx() + 1); });
    track.addEventListener('scroll', function () { requestAnimationFrame(mark); }, { passive: true });
    track.addEventListener('keydown', function (ev) { if (ev.key === 'ArrowRight') { ev.preventDefault(); go(idx() + 1); } if (ev.key === 'ArrowLeft') { ev.preventDefault(); go(idx() - 1); } });
    mark();
  });

  /* ---------- rooms: the photo stage follows the room in the middle of the screen ---------- */
  var stages = document.querySelectorAll('.stage-room');
  var setRoom = function (k) { stages.forEach(function (s) { s.classList.toggle('on', s.dataset.room === k); }); };
  setRoom('double');
  var rio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) setRoom(e.target.dataset.room); }); }, { rootMargin: '-48% 0px -48% 0px' });
  document.querySelectorAll('.room').forEach(function (r) { rio.observe(r); });

  /* ---------- the week strip: today ---------- */
  var dow = (new Date().getDay() + 6) % 7, day = document.querySelector('.day[data-d="' + dow + '"]');
  if (day && !day.classList.contains('off')) day.classList.add('today');

  /* ---------- the closing film: attached when near, never under reduced motion / Save-Data ---------- */
  var cv = document.querySelector('[data-close-video]'), conn = navigator.connection || {};
  if (cv && !matchMedia('(prefers-reduced-motion: reduce)').matches && !conn.saveData) {
    if (mobile) cv.poster = 'img/close-m.webp';
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !cv.dataset.on) {
          cv.dataset.on = '1';
          cv.querySelectorAll('source').forEach(function (s) { if (s.media && !matchMedia(s.media).matches) s.remove(); else s.src = s.dataset.src; });
          cv.load(); cv.addEventListener('playing', function () { cv.classList.add('playing'); }, { once: true });
          cv.play().catch(function () {});
        } else if (cv.dataset.on) { e.isIntersecting ? cv.play().catch(function () {}) : cv.pause(); }
      });
    }, { rootMargin: '300px 0px' });
    vio.observe(cv);
  }

  /* ---------- the pool photograph: Kube's 4 rem parallax, desktop only ---------- */
  var pp = document.querySelector('.pool-pic img');
  if (pp && !mobile && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    (function par() {
      var r = pp.parentNode.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) { var t = (innerHeight - r.top) / (innerHeight + r.height); pp.style.transform = 'translateY(' + ((t - .5) * -64).toFixed(1) + 'px) scale(1.06)'; }
      requestAnimationFrame(par);
    })();
  }

  /* ---------- the shala loop behind "Panta Fitness Club": attached when near, paused when away ---------- */
  document.querySelectorAll('[data-lazy-video]').forEach(function (v) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.connection || {}).saveData) return;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !v.dataset.on) {
          v.dataset.on = '1';
          v.querySelectorAll('source').forEach(function (s) { s.src = s.dataset.src; });
          v.load(); v.addEventListener('playing', function () { v.classList.add('playing'); }, { once: true });
          v.play().catch(function () {});
        } else if (v.dataset.on) { e.isIntersecting ? v.play().catch(function () {}) : v.pause(); }
      });
    }, { rootMargin: '200px 0px' }).observe(v);
  });
