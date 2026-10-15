(function () {
  var nav = document.querySelector('header.nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
      var n = e.target.querySelector('[data-count]');
      if (n) countUp(n);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });

  function countUp(root) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.parentNode.querySelectorAll('[data-count]').forEach(function (el) {
      var target = +el.getAttribute('data-count'), suffix = el.getAttribute('data-suffix') || '';
      if (reduce) return;
      var start = performance.now(), dur = 1100;
      (function tick(t) {
        var p = Math.min(1, (t - start) / dur), v = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = v.toLocaleString('en-US') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }
})();
