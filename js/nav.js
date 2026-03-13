/* ══════════════════════════════════════
   nav.js  —  runs on every page
   Handles: cursor, scroll-reveal, active nav
══════════════════════════════════════ */
(function () {
  'use strict';
  var qp = new URLSearchParams(window.location.search);
  var viewMode = (qp.get('view') || '').toLowerCase();
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var NAV_HEIGHT = null;
  if (viewMode === 'mobile' || viewMode === 'desktop') {
    document.documentElement.setAttribute('data-view', viewMode);
  }

  function navHeight() {
    if (NAV_HEIGHT !== null) return NAV_HEIGHT;
    var raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '';
    var parsed = parseInt(raw, 10);
    NAV_HEIGHT = isNaN(parsed) ? 0 : parsed;
    return NAV_HEIGHT;
  }

  function scrollElementIntoView(el, options) {
    if (!el) return;
    var behavior = (options && options.behavior) || 'smooth';
    var align = (options && options.align) || 'start';
    var rect = el.getBoundingClientRect();
    var navH = navHeight();
    var target;

    if (align === 'center') {
      var elTop = window.scrollY + rect.top;
      var elMid = elTop + rect.height / 2;
      var visibleMid = window.scrollY + navH + (Math.max(window.innerHeight - navH, 0) / 2);
      target = window.scrollY + (elMid - visibleMid);
    } else {
      target = window.scrollY + rect.top - navH - 16;
    }

    window.scrollTo({
      top: Math.max(0, target),
      behavior: behavior
    });
  }

  function forceTop() {
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch (e) {}
    requestAnimationFrame(function () {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }

  window.addEventListener('load', forceTop);
  window.addEventListener('pageshow', function (e) {
    if (e && e.persisted) forceTop();
  });

  document.addEventListener('click', function (e) {
    var navLink = e.target.closest('.g-nav__link, .g-nav__logo');
    if (!navLink) return;
    var href = (navLink.getAttribute('href') || '').split('#')[0];
    var current = window.location.pathname.split('/').pop();
    var target = href.split('/').pop();
    if (href && target && target === current) {
      forceTop();
    }
  }, true);

  function ensureGlobalLoader() {
    var existing = document.getElementById('g-app-loader');
    if (existing) return existing;

    var loader = document.createElement('div');
    loader.id = 'g-app-loader';
    loader.className = 'g-app-loader';
    loader.innerHTML =
      '<div class="g-loader-box">' +
        '<div class="g-loader-spin" aria-hidden="true"></div>' +
        '<div class="g-loader-txt">Loading...</div>' +
      '</div>';
    document.body.appendChild(loader);
    return loader;
  }

  function showGlobalLoader() {
    var loader = ensureGlobalLoader();
    loader.classList.add('on');
    document.body.classList.add('g-loading');
  }

  function hideGlobalLoader() {
    var loader = document.getElementById('g-app-loader');
    if (loader) loader.classList.remove('on');
    document.body.classList.remove('g-loading');
  }

  function addClickPop(target) {
    if (!target) return;
    target.classList.remove('g-click-pop');
    target.offsetWidth;
    target.classList.add('g-click-pop');
    setTimeout(function () {
      target.classList.remove('g-click-pop');
    }, 260);
  }

  function markClickables(root) {
    var scope = root || document;
    scope.querySelectorAll(
      'a, button, [role="button"], input[type="button"], input[type="submit"], .cg-item, .cg-toggle'
    ).forEach(function (el) {
      el.classList.add('g-clickable');
    });
  }

  function shouldShowLoaderForClick(target, event) {
    if (!target) return false;
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return false;
    if (target.closest('.ct-pop') || target.closest('[data-contact-popup="true"]') || target.closest('[data-phone-popup="true"]')) return false;

    var link = target.closest('a[href]');
    if (link) {
      var href = (link.getAttribute('href') || '').trim();
      if (!href || href.charAt(0) === '#') return false;
      if (/^javascript:/i.test(href)) return false;
      if (/^(mailto:|tel:)/i.test(href)) return false;
      if (link.hasAttribute('download')) return false;
      var targetAttr = (link.getAttribute('target') || '').toLowerCase();
      if (targetAttr === '_blank') return false;
      return true;
    }

    var submit = target.closest('button[type="submit"], input[type="submit"]');
    if (submit) return true;

    return false;
  }

  markClickables(document);
  var clickableObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (!node || node.nodeType !== 1) return;
        if (node.matches && node.matches('a, button, [role="button"], input[type="button"], input[type="submit"], .cg-item, .cg-toggle')) {
          node.classList.add('g-clickable');
        }
        markClickables(node);
      });
    });
  });
  clickableObserver.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('pointerdown', function (e) {
    var target = e.target.closest('a, button, [role="button"], input[type="button"], input[type="submit"], .cg-item, .cg-toggle');
    if (!target) return;
    addClickPop(target);
  }, true);

  document.addEventListener('click', function (e) {
    if (shouldShowLoaderForClick(e.target, e)) {
      showGlobalLoader();
    }
  }, true);

  document.addEventListener('submit', function () {
    showGlobalLoader();
  }, true);

  window.addEventListener('beforeunload', function () {
    showGlobalLoader();
  });
  window.addEventListener('pageshow', hideGlobalLoader);
  window.addEventListener('load', hideGlobalLoader);
  window.addEventListener('focus', hideGlobalLoader);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') hideGlobalLoader();
  });
  function initThemeMode() {
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var storageKey = 'skr-theme-mode';
    var allowed = { auto: true, light: true, dark: true };
    var mode = (localStorage.getItem(storageKey) || 'auto').toLowerCase();
    if (!allowed[mode]) mode = 'auto';

    function resolvedTheme(nextMode) {
      if (nextMode === 'light') return 'light';
      if (nextMode === 'dark') return 'dark';
      return media.matches ? 'dark' : 'light';
    }

    function labelFor(resolved) {
      return resolved === 'dark' ? 'Light' : 'Dark';
    }

    function apply(nextMode) {
      mode = nextMode;
      var resolved = resolvedTheme(mode);
      document.documentElement.setAttribute('data-theme', resolved);
      document.documentElement.setAttribute('data-theme-mode', mode);
      localStorage.setItem(storageKey, mode);

      var btn = document.getElementById('g-theme-btn');
      if (btn) {
        btn.textContent = labelFor(resolved);
        btn.setAttribute('aria-label', 'Theme mode: ' + mode + '. Click to change.');
        btn.setAttribute('title', 'Theme: ' + mode + ' (click to switch)');
        btn.classList.toggle('g-theme-pulse', resolved === 'light');
      }
    }

    function toggleMode() {
      var resolved = resolvedTheme(mode);
      if (resolved === 'dark') apply('light');
      else apply('dark');
    }

    function mountButton() {
      var nav = document.querySelector('.g-nav');
      if (!nav || document.getElementById('g-theme-btn')) return;
      var btn = document.createElement('button');
      btn.id = 'g-theme-btn';
      btn.type = 'button';
      btn.className = 'g-theme-btn g-clickable';
      btn.setAttribute('data-h', '');
      btn.addEventListener('click', function () {
        toggleMode();
      });
      nav.appendChild(btn);
      apply(mode);
    }

    function showLightHintToast() {
      var resolved = resolvedTheme(mode);
      if (resolved !== 'light') return;

      var btn = document.getElementById('g-theme-btn');
      if (btn) {
        btn.classList.add('g-theme-pulse');
        btn.classList.add('g-theme-toast-focus');
      }

      var toast = document.createElement('div');
      toast.className = 'g-theme-toast';
      toast.innerHTML =
        '<div class="g-theme-toast__title">Better Visual Mode</div>' +
        '<div class="g-theme-toast__msg">For better viewing, click <strong>Dark</strong> on the top bar.</div>';
      document.body.appendChild(toast);

      setTimeout(function () {
        toast.classList.add('on');
      }, 120);

      setTimeout(function () {
        toast.classList.remove('on');
        if (btn) btn.classList.remove('g-theme-toast-focus');
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 240);
      }, 5000);
    }

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', function () {
        if (mode === 'auto') apply('auto');
      });
    } else if (typeof media.addListener === 'function') {
      media.addListener(function () {
        if (mode === 'auto') apply('auto');
      });
    }

    apply(mode);
    mountButton();
    showLightHintToast();
  }
  initThemeMode();


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

  /* ── Task-card toggling ──
     reused across multiple project pages; moved from inline scripts */
  (function(){
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-task]'));
    if (!cards.length) return;
    function panel(card) {
      return card.querySelector('.task-panel');
    }
    function button(card) {
      return card.querySelector('.task-toggle');
    }
    function initVariantSwitcher(card) {
      var p = panel(card);
      if (!p) return;
      var inner = p.querySelector('.task-panel-inner') || p;
      var blocks = Array.prototype.slice.call(inner.querySelectorAll('[data-variant]'));
      if (!blocks.length) return;

      var variants = [];
      blocks.forEach(function (blk) {
        var key = String(blk.getAttribute('data-variant') || '').trim().toLowerCase();
        if (!key) return;
        blk.dataset.variant = key;
        if (variants.indexOf(key) === -1) variants.push(key);
      });
      if (!variants.length) return;

      var switcher = document.createElement('div');
      switcher.className = 'task-variant-switch';
      var defaultKey = String(inner.getAttribute('data-variant-default') || '').trim().toLowerCase() || variants[0];
      function applyVariant(nextKey) {
        variants.forEach(function (key) {
          var active = key === nextKey;
          switcher.querySelectorAll('[data-variant-key="' + key + '"]').forEach(function (btn) {
            btn.classList.toggle('act', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
          blocks.forEach(function (blk) {
            if (blk.dataset.variant === key) {
              blk.style.display = active ? '' : 'none';
            }
          });
        });
        if (card.classList.contains('is-open')) {
          p.style.maxHeight = p.scrollHeight + 'px';
        }
      }

      variants.forEach(function (key, idx) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'task-variant-btn';
        btn.textContent = key;
        btn.setAttribute('data-variant-key', key);
        btn.setAttribute('aria-pressed', 'false');
        btn.addEventListener('click', function () {
          applyVariant(key);
        });
        if (idx === 0) btn.classList.add('first');
        switcher.appendChild(btn);
      });

      inner.insertBefore(switcher, inner.firstChild);
      applyVariant(defaultKey);
    }
    function scrollTaskCard(card) {
      [60, 450].forEach(function (delay) {
        setTimeout(function () {
          scrollElementIntoView(card, { behavior: 'smooth', align: 'start' });
        }, delay);
      });
    }
    function openCard(card) {
      var p = panel(card);
      var b = button(card);
      card.classList.add('is-open');
      b.setAttribute('aria-expanded', 'true');
      p.style.maxHeight = p.scrollHeight + 'px';
      scrollTaskCard(card);
    }
    function closeCard(card) {
      var p = panel(card);
      var b = button(card);
      card.classList.remove('is-open');
      b.setAttribute('aria-expanded', 'false');
      p.style.maxHeight = '0px';
    }
    cards.forEach(function (card) {
      initVariantSwitcher(card);
      var btn = button(card);
      closeCard(card);
      btn.addEventListener('click', function () {
        var isOpen = card.classList.contains('is-open');
        cards.forEach(closeCard);
        if (!isOpen) {
          openCard(card);
        }
      });
    });
    window.addEventListener('resize', function () {
      cards.forEach(function (card) {
        if (card.classList.contains('is-open')) {
          var p = panel(card);
          p.style.maxHeight = p.scrollHeight + 'px';
          // Re-center the card when resizing
          setTimeout(function() {
            scrollElementIntoView(card, { behavior: 'smooth', align: 'start' });
          }, 100);
        }
      });
    });
  })();
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
    var isMobilePhone =
      /Android|iPhone|iPod|Windows Phone|Opera Mini|IEMobile/i.test(navigator.userAgent || '') ||
      (window.matchMedia('(max-width: 768px)').matches && isTouch);
    var defaultEmail =
      'https://mail.google.com/mail/?view=cm&fs=1&to=dssanthoshraju1999@gmail.com&su=DevOps%20Job%20Opportunity%20%7C%20%5BCompany%20Name%5D%20%7C%20From%20Portfolio&body=Hi%20Santhosh%2C%0A%0AI%20hope%20you%20are%20doing%20well.%20I%20am%20reaching%20out%20from%20%5BCompany%20Name%5D%20regarding%20a%20DevOps%20Engineer%20opportunity%20that%20matches%20your%20profile.%0A%0AWe%20reviewed%20your%20portfolio%20and%20were%20impressed%20by%20your%20experience%20in%20AWS%2C%20CI%2FCD%2C%20containers%2C%20and%20production%20infrastructure.%0A%0APosition%3A%20%5BRole%20Title%5D%0ALocation%3A%20%5BCity%20%2F%20Remote%5D%0AEmployment%20Type%3A%20%5BFull-time%20%2F%20Contract%5D%0ACompensation%20Range%3A%20%5BCTC%20Range%5D%0A%0AIf%20you%20are%20open%20to%20exploring%20this%20opportunity%2C%20please%20share%20your%20updated%20resume%20and%20availability%20for%20a%20quick%20discussion.%0A%0ARegards%2C%0A%5BHR%20Name%5D%0A%5BDesignation%5D%0A%5BCompany%20Name%5D%0A%5BPhone%5D%20%7C%20%5BEmail%5D';
    var linkedinUrl = 'https://linkedin.com/in/santhosh-kumar-raju-dasararaju-5905a81b3';
    var whatsappUrl =
      'https://wa.me/919177093821?text=Hi%20Santhosh%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20DevOps%20opportunity.';
    var defaultPhone = 'tel:+919177093821';

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
      '<button class="ct-opt" type="button" data-kind="call"><span class="ct-opt__ico">C</span><span class="ct-opt__txt">Call</span></button>' +
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
    var callTarget = defaultPhone;
    var opening = false;
    var navTimer = null;
    var closeTimer = null;
    var countTimer = null;

    function clearFlowTimers() {
      if (navTimer) { clearTimeout(navTimer); navTimer = null; }
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (countTimer) { clearInterval(countTimer); countTimer = null; }
    }

    function openPop(sourceHref, mode) {
      if (opening) return;
      clearFlowTimers();
      var phoneMode = mode === 'phone';
      emailTarget = sourceHref || defaultEmail;
      popup.classList.toggle('mode-phone', phoneMode);
      popup.classList.toggle('mode-contact', !phoneMode);
      popup.classList.remove('phase-thanks');
      if (phoneMode) {
        head.textContent = 'Thanks for reaching out.';
        sub.textContent = 'Choose call or WhatsApp.';
        note.textContent = 'I appreciate your interest and would be happy to connect.';
      } else {
        head.textContent = 'Thanks for reaching out.';
        sub.textContent = 'Choose your preferred contact channel.';
        note.textContent = 'I am grateful for your interest and message.';
      }
      optsWrap.style.display = '';
      popup.classList.add('on');
      document.body.classList.add('ct-pop-open');
    }

    function closePop() {
      clearFlowTimers();
      popup.classList.remove('on');
      popup.classList.remove('phase-thanks');
      popup.classList.remove('mode-phone');
      popup.classList.remove('mode-contact');
      document.body.classList.remove('ct-pop-open');
      hideGlobalLoader();
      opening = false;
    }

    function launch(kind) {
      var url =
        kind === 'linkedin'
          ? linkedinUrl
          : kind === 'whatsapp'
            ? whatsappUrl
            : kind === 'call'
              ? callTarget
              : emailTarget;
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
        if (kind === 'call' || url.indexOf('tel:') === 0) {
          window.location.href = url;
        } else {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
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

    function onCloseIntent(e) {
      var closeEl = e.target.closest('.ct-pop__close');
      var backEl = e.target.closest('.ct-pop__back');
      if (!closeEl && !backEl) return;
      e.preventDefault();
      e.stopPropagation();
      closePop();
    }

    closeBtn.addEventListener('click', closePop);
    back.addEventListener('click', closePop);
    popup.addEventListener('pointerdown', onCloseIntent, true);
    popup.addEventListener('click', onCloseIntent, true);
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
        openPop(el.getAttribute('href'), 'contact');
      });
    });

    var phoneTriggers = document.querySelectorAll('[data-phone-popup="true"]');
    phoneTriggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        callTarget = el.getAttribute('href') || defaultPhone;
        if (isMobilePhone) {
          hideGlobalLoader();
          window.location.href = callTarget;
          return;
        }
        openPop(defaultEmail, 'phone');
      });
    });

    var directTriggers = document.querySelectorAll(
      'a[href^="mailto:"], a[href*="mail.google.com/mail/?view=cm"], a[href*="linkedin.com/"], a[href^="tel:"], a[href*="wa.me/"]'
    );
    directTriggers.forEach(function (el) {
      if (el.hasAttribute('data-contact-popup')) return;
      if (el.hasAttribute('data-phone-popup')) return;
      el.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        var href = el.getAttribute('href') || defaultEmail;
        if (href.indexOf('tel:') === 0) {
          if (isMobilePhone) {
            hideGlobalLoader();
            window.location.href = href;
          } else {
            callTarget = href;
            openPop(defaultEmail, 'phone');
          }
          return;
        }
        var label = 'contact page';
        if (href.indexOf('mailto:') === 0 || href.indexOf('mail.google.com/mail/?view=cm') !== -1) label = 'email compose';
        else if (href.indexOf('linkedin.com/') !== -1) label = 'LinkedIn';
        else if (href.indexOf('wa.me/') !== -1) label = 'WhatsApp';
        directContactFlow(href, label);
      });
    });
  })();

// ═════════ TERMINAL FUNCTIONALITY ═════════
(function(){
  function getSampleOutputs(){
    return window.terminalData && window.terminalData.outputs
      ? window.terminalData.outputs
      : {};
  }
  // Terminal engine (runs commands sequentially)
  function runTerminal(outputEl){
    var commands = window.terminalData && window.terminalData.commands
      ? window.terminalData.commands
      : [];
    var outputs = getSampleOutputs();
    var index = 0;
    function addLine(className,text){
      var div = document.createElement("div");
      div.className = "tl " + className;
      div.textContent = text;
      outputEl.appendChild(div);
      outputEl.scrollTop = outputEl.scrollHeight;
    }
    function runNext(){
      if(index >= commands.length) return;
      var cmd = commands[index];
      // print command
      addLine("term-cmd",cmd);
      setTimeout(function(){
        var result = outputs[cmd] || [];
        result.forEach(function(line){
          addLine("term-out",line);
        });
        // blank prompt line
        addLine("term-cmd","");
        index++;
        setTimeout(runNext,600);
      },400);
    }
    runNext();
  }
  // ═════ Bottom Terminal Elements ═════
  var bottomPanel  = document.getElementById("bottomTerminalPanel");
  var bottomOutput = document.getElementById("bottomTermOutput");
  var bottomClose  = document.getElementById("bottomTermClose");
  var expandBtn    = document.getElementById("terminalExpand");
  if(bottomOutput){
    bottomOutput.innerHTML = "";
  }
  if(bottomClose){
    bottomClose.addEventListener("click",function(){
      if(bottomPanel){
        bottomPanel.style.display = "none";
      }
    });
  }
  // ═════ Modal Terminal Elements ═════
  var modal       = document.getElementById("terminalModal");
  var modalBack   = document.getElementById("terminalModalBack");
  var modalClose  = document.getElementById("modalTermClose");
  var modalOutput = document.getElementById("modalTermOutput");
  function openModal(){
    if(modal && modalOutput){
      modalOutput.innerHTML = "";
      runTerminal(modalOutput);
      modal.classList.add("on");
      document.body.style.overflow = "hidden";
    }
  }
  function closeModal(){
    if(modal){
      modal.classList.remove("on");
      document.body.style.overflow = "";
    }
  }
  if(expandBtn){
    expandBtn.addEventListener("click",openModal);
  }
  if(modalBack){
    modalBack.addEventListener("click",closeModal);
  }
  if(modalClose){
    modalClose.addEventListener("click",closeModal);
  }
  // ESC key closes modal
  document.addEventListener("keydown",function(e){
    if(e.key === "Escape" && modal && modal.classList.contains("on")){
      closeModal();
    }
  });
  // ═════ Terminal Button ═════
  var btn = document.getElementById("terminalBtn");
  if(btn){
    btn.addEventListener("click",function(){
      if(bottomPanel){
        bottomPanel.style.display = "block";
      }
      if(bottomOutput){
        bottomOutput.innerHTML = "";
        runTerminal(bottomOutput);
      }
      // center terminal on screen
      setTimeout(function(){
        scrollElementIntoView(bottomPanel, { behavior: "smooth", align: "center" });
      },100);
    });
  }
})();

// ══ DISABLE INSPECT/DEV TOOLS ══
  // (function() {
  //   'use strict';

  //   // Disable right-click context menu
  //   document.addEventListener('contextmenu', function(e) {
  //     e.preventDefault();
  //     return false;
  //   });

  //   // Disable common developer tool keyboard shortcuts
  //   document.addEventListener('keydown', function(e) {
  //     // F12 - Developer Tools
  //     if (e.keyCode === 123) {
  //       e.preventDefault();
  //       return false;
  //     }

  //     // Ctrl+Shift+I - Developer Tools
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
  //       e.preventDefault();
  //       return false;
  //     }

  //     // Ctrl+Shift+J - Console
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
  //       e.preventDefault();
  //       return false;
  //     }

  //     // Ctrl+Shift+C - Inspect Element
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
  //       e.preventDefault();
  //       return false;
  //     }

  //     // Ctrl+U - View Source (though this doesn't prevent it completely)
  //     if (e.ctrlKey && e.keyCode === 85) {
  //       e.preventDefault();
  //       return false;
  //     }

  //     // F11 - Fullscreen (optional, but can be annoying)
  //     if (e.keyCode === 122) {
  //       e.preventDefault();
  //       return false;
  //     }
  //   });

  //   // Disable text selection (optional, for extra protection)
  //   document.addEventListener('selectstart', function(e) {
  //     e.preventDefault();
  //     return false;
  //   });

  //   // Disable drag and drop (optional)
  //   document.addEventListener('dragstart', function(e) {
  //     e.preventDefault();
  //     return false;
  //   });

  // })();


})();
