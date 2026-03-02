/* ══════════════════════════════════════
   nav.js  —  runs on every page
   Handles: cursor, scroll-reveal, active nav
══════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Cursor ── */
  const cur  = document.getElementById('g-cur');
  const ring = document.getElementById('g-cur-r');
  if (cur && ring) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    });
    (function loop() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, [data-h]'))
        document.body.classList.add('ch');
      else
        document.body.classList.remove('ch');
    });
  }

  /* ── Scroll Reveal ── */
  var ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('in'); }, i * 60);
        ro.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(function (el) { ro.observe(el); });
  }
  initReveal();
  window.SKR = window.SKR || {};
  window.SKR.initReveal = initReveal;

  /* ── Active nav link ──
     Match current filename against nav link hrefs */
  var current = window.location.pathname.replace(/\\/g, '/');
  document.querySelectorAll('.g-nav__link').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/\\/g, '/');
    // normalise to just the filename part
    var hn = href.split('/').pop();
    var cn = current.split('/').pop();
    if (hn && cn && hn === cn) {
      a.classList.add('active');
    }
    // special case: index.html or root should highlight Home
    if ((cn === '' || cn === 'index.html') && href.indexOf('home.html') !== -1) {
      a.classList.add('active');
    }
  });

})();
