/* Lotus Surf House, calm: slideshows, quote cross-fade, header + phone bar. Everything works without it. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // dot slideshows over a scroll-snap row
  for (const show of document.querySelectorAll('[data-show]')) {
    const track = show.querySelector('.track'), slides = [...track.children];
    const ctrl = show.querySelector('.ctrl'), dots = [...show.querySelectorAll('.dot')];
    ctrl.hidden = false;
    let cur = 0;
    const mark = i => { cur = i; dots.forEach((d, j) => d.setAttribute('aria-current', j === i ? 'true' : 'false')); };
    const go = i => {
      i = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
      mark(i);
    };
    let t;
    track.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => mark(Math.round(track.scrollLeft / track.clientWidth)), 60); }, { passive: true });
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    show.querySelector('.prev').addEventListener('click', () => go(cur - 1));
    show.querySelector('.next').addEventListener('click', () => go(cur + 1));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
    mark(0);
  }

  // one review at a time, cross-faded; the grid stack keeps the height of the longest, so nothing jumps
  for (const box of document.querySelectorAll('[data-quotes]')) {
    const qs = [...box.querySelectorAll('.q')], dots = [...box.querySelectorAll('.dot')];
    box.classList.add('ready'); box.querySelector('.ctrl').hidden = false;
    let cur = 0;
    const go = i => {
      cur = (i + qs.length) % qs.length;
      qs.forEach((q, j) => { q.classList.toggle('on', j === cur); q.setAttribute('aria-hidden', j === cur ? 'false' : 'true'); });
      dots.forEach((d, j) => d.setAttribute('aria-current', j === cur ? 'true' : 'false'));
    };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    box.querySelector('.prev').addEventListener('click', () => go(cur - 1));
    box.querySelector('.next').addEventListener('click', () => go(cur + 1));
    go(0);
  }

  // the header turns solid and the phone bar slides up once the first screen has gone
  const top = document.querySelector('.top'), bar = document.getElementById('bar'), hero = document.querySelector('.hero');
  new IntersectionObserver(([e]) => {
    const past = !e.isIntersecting;
    top.classList.toggle('solid', past); bar.classList.toggle('on', past);
  }, { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
})();
