/* Canvas wave overlay for the hero image. Plain JS, no dependencies.
   Included to check that each CMS lets the designer ship custom JS untouched. */
(function () {
  var c = document.querySelector('[data-waves]');
  if (!c || !c.getContext) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = c.getContext('2d'), w = 0, h = 0, t = 0;
  function size() { w = c.width = c.clientWidth; h = c.height = c.clientHeight; }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var k = 0; k < 5; k++) {
      ctx.beginPath();
      var y0 = h * (0.58 + k * 0.08), amp = 6 + k * 4, wl = 160 + k * 50;
      for (var x = 0; x <= w; x += 8) {
        var y = y0 + amp * Math.sin((x / wl) * 6.283 + t * (0.6 + k * 0.15) + k);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,' + (0.10 + k * 0.04) + ')';
      ctx.fill();
    }
    t += 0.02;
    if (!reduce) requestAnimationFrame(draw);
  }
  size(); draw();
  window.addEventListener('resize', function () { size(); if (reduce) draw(); });
})();
