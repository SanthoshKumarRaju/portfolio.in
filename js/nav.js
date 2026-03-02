/* ══════════════════════════════════════
   nav.js  —  runs on every page
   Handles: cursor, scroll-reveal, active nav
══════════════════════════════════════ */
(function () {
  'use strict';
  var qp = new URLSearchParams(window.location.search);
  var viewMode = (qp.get('view') || '').toLowerCase();
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (viewMode === 'mobile' || viewMode === 'desktop') {
    document.documentElement.setAttribute('data-view', viewMode);
  }


  /* ── Cursor ── */
  const cur  = document.getElementById('g-cur');
  const ring = document.getElementById('g-cur-r');
  if (cur && ring && !isTouch) {
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
  } else {
    document.body.classList.remove('ch');
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

  /* -- Contact Flow Popup -- */
  (function initContactFlow() {
    var defaultEmail =
      'https://mail.google.com/mail/?view=cm&fs=1&to=dssanthoshraju1999@gmail.com&su=DevOps%20Job%20Opportunity%20%7C%20%5BCompany%20Name%5D%20%7C%20From%20Portfolio&body=Hi%20Santhosh%2C%0A%0AI%20hope%20you%20are%20doing%20well.%20I%20am%20reaching%20out%20from%20%5BCompany%20Name%5D%20regarding%20a%20DevOps%20Engineer%20opportunity%20that%20matches%20your%20profile.%0A%0AWe%20reviewed%20your%20portfolio%20and%20were%20impressed%20by%20your%20experience%20in%20AWS%2C%20CI%2FCD%2C%20containers%2C%20and%20production%20infrastructure.%0A%0APosition%3A%20%5BRole%20Title%5D%0ALocation%3A%20%5BCity%20%2F%20Remote%5D%0AEmployment%20Type%3A%20%5BFull-time%20%2F%20Contract%5D%0ACompensation%20Range%3A%20%5BCTC%20Range%5D%0A%0AIf%20you%20are%20open%20to%20exploring%20this%20opportunity%2C%20please%20share%20your%20updated%20resume%20and%20availability%20for%20a%20quick%20discussion.%0A%0ARegards%2C%0A%5BHR%20Name%5D%0A%5BDesignation%5D%0A%5BCompany%20Name%5D%0A%5BPhone%5D%20%7C%20%5BEmail%5D';
    var linkedinUrl = 'https://linkedin.com/in/santhosh-kumar-raju-dasararaju-5905a81b3';
    var whatsappUrl =
      'https://wa.me/919177093821?text=Hi%20Santhosh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20DevOps%20opportunity.';

    var popup = document.createElement('div');
    popup.className = 'ct-pop';
    popup.innerHTML =
      '<div class="ct-pop__back"></div>' +
      '<div class="ct-pop__card" role="dialog" aria-modal="true" aria-label="Contact options">' +
      '<div class="ct-pop__orb ct-pop__orb-a"></div>' +
      '<div class="ct-pop__orb ct-pop__orb-b"></div>' +
      '<button class="ct-pop__close" type="button" aria-label="Close">x</button>' +
      '<div class="ct-pop__head">Thanks for reaching out.</div>' +
      '<div class="ct-pop__sub">Choose your preferred contact channel.</div>' +
      '<div class="ct-pop__opts">' +
      '<button class="ct-opt" type="button" data-kind="email"><span class="ct-opt__ico">✉</span><span class="ct-opt__txt">Email</span></button>' +
      '<button class="ct-opt" type="button" data-kind="linkedin"><span class="ct-opt__ico">in</span><span class="ct-opt__txt">LinkedIn</span></button>' +
      '<button class="ct-opt" type="button" data-kind="whatsapp"><span class="ct-opt__ico">W</span><span class="ct-opt__txt">WhatsApp</span></button>' +
      '</div>' +
      '<div class="ct-pop__note">I am grateful for your interest and message.</div>' +
      '</div>';
    document.body.appendChild(popup);

    var closeBtn = popup.querySelector('.ct-pop__close');
    var back = popup.querySelector('.ct-pop__back');
    var head = popup.querySelector('.ct-pop__head');
    var sub = popup.querySelector('.ct-pop__sub');
    var note = popup.querySelector('.ct-pop__note');
    var optsWrap = popup.querySelector('.ct-pop__opts');
    var emailTarget = defaultEmail;
    var opening = false;
    var navTimer = null;
    var closeTimer = null;
    var countTimer = null;

    function clearFlowTimers() {
      if (navTimer) { clearTimeout(navTimer); navTimer = null; }
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (countTimer) { clearInterval(countTimer); countTimer = null; }
    }

    function openPop(sourceHref) {
      if (opening) return;
      clearFlowTimers();
      emailTarget = sourceHref || defaultEmail;
      popup.classList.remove('phase-thanks');
      head.textContent = 'Thanks for reaching out.';
      sub.textContent = 'Choose your preferred contact channel.';
      note.textContent = 'I am grateful for your interest and message.';
      optsWrap.style.display = '';
      popup.classList.add('on');
      document.body.classList.add('ct-pop-open');
    }

    function closePop() {
      clearFlowTimers();
      popup.classList.remove('on');
      popup.classList.remove('phase-thanks');
      document.body.classList.remove('ct-pop-open');
      opening = false;
    }

    function launch(kind) {
      var url = kind === 'linkedin' ? linkedinUrl : kind === 'whatsapp' ? whatsappUrl : emailTarget;
      opening = true;
      popup.classList.add('phase-thanks');
      optsWrap.style.display = 'none';
      head.textContent = 'Thank you for contacting me.';
      var waitMs = 2000 + Math.floor(Math.random() * 3001); // 2s to 5s
      var secondsLeft = Math.ceil(waitMs / 1000);
      sub.textContent = 'Opening your selected contact channel in ' + secondsLeft + 's.';
      note.textContent = 'I truly appreciate your time and interest.';
      countTimer = setInterval(function () {
        secondsLeft -= 1;
        if (secondsLeft > 0) {
          sub.textContent = 'Opening your selected contact channel in ' + secondsLeft + 's.';
        } else if (countTimer) {
          clearInterval(countTimer);
          countTimer = null;
        }
      }, 1000);
      navTimer = setTimeout(function () {
        window.open(url, '_blank', 'noopener,noreferrer');
        opening = false;
      }, waitMs);
      closeTimer = setTimeout(closePop, waitMs + 900);
    }

    function directContactFlow(url, label) {
      if (!url) return;
      clearFlowTimers();
      opening = true;
      popup.classList.add('phase-thanks');
      optsWrap.style.display = 'none';
      head.textContent = 'Thank you for contacting me.';
      var waitMs = 2000 + Math.floor(Math.random() * 3001); // 2s to 5s
      var secondsLeft = Math.ceil(waitMs / 1000);
      sub.textContent = 'Opening ' + label + ' in ' + secondsLeft + 's.';
      note.textContent = 'I am grateful for your message and interest.';
      popup.classList.add('on');
      document.body.classList.add('ct-pop-open');
      countTimer = setInterval(function () {
        secondsLeft -= 1;
        if (secondsLeft > 0) {
          sub.textContent = 'Opening ' + label + ' in ' + secondsLeft + 's.';
        } else if (countTimer) {
          clearInterval(countTimer);
          countTimer = null;
        }
      }, 1000);
      navTimer = setTimeout(function () {
        if (url.indexOf('mailto:') === 0) {
          window.location.href = url;
        } else if (url.indexOf('tel:') === 0) {
          window.location.href = url;
        } else {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
        opening = false;
      }, waitMs);
      closeTimer = setTimeout(closePop, waitMs + 900);
    }

    closeBtn.addEventListener('click', closePop);
    back.addEventListener('click', closePop);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePop();
    });

    popup.querySelectorAll('.ct-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        launch(btn.getAttribute('data-kind'));
      });
    });

    var optionTriggers = document.querySelectorAll('[data-contact-popup="true"]');
    optionTriggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        openPop(el.getAttribute('href'));
      });
    });

    var directTriggers = document.querySelectorAll(
      'a[href^="mailto:"], a[href*="mail.google.com/mail/?view=cm"], a[href*="linkedin.com/"], a[href^="tel:"], a[href*="wa.me/"]'
    );
    directTriggers.forEach(function (el) {
      if (el.hasAttribute('data-contact-popup')) return;
      el.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        var href = el.getAttribute('href') || defaultEmail;
        var label = 'contact page';
        if (href.indexOf('mailto:') === 0 || href.indexOf('mail.google.com/mail/?view=cm') !== -1) label = 'email compose';
        else if (href.indexOf('linkedin.com/') !== -1) label = 'LinkedIn';
        else if (href.indexOf('tel:') === 0) label = 'phone dialer';
        else if (href.indexOf('wa.me/') !== -1) label = 'WhatsApp';
        directContactFlow(href, label);
      });
    });
  })();

})();


