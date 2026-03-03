/* projects.js - builds sidebar accordion + inline detail panel from PDATA */
(function () {
  'use strict';

  var data = window.PDATA;
  if (!data) { console.error('projects-data.js not loaded'); return; }

  var sidebar = document.getElementById('pj-sidebar');
  var detail = document.getElementById('pj-detail');
  var pageRoot = document.querySelector('.g-page');
  var hero = document.querySelector('.pj-hero');
  var totalCountEl = document.getElementById('pj-total-count');
  var completedCountEl = document.getElementById('pj-count-completed');
  var progressCountEl = document.getElementById('pj-count-progress');
  var pendingCountEl = document.getElementById('pj-count-pending');
  var completedMeterEl = document.getElementById('pj-meter-completed');
  var progressMeterEl = document.getElementById('pj-meter-progress');
  var pendingMeterEl = document.getElementById('pj-meter-pending');
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-status-filter]'));
  var statusValidationPrinted = false;
  var statusValidationErrors = [];
  var currentFilter = 'all';
  var selectedProjectKey = '';
  var flat = []; // { ci, pi, concept, proj }

  function resolveProjectPage(concept, proj) {
    var fallback = '../../projects/' + concept.id + '/' + proj.id + '/index.html';
    if (!proj || typeof proj.page !== 'string' || !proj.page.trim()) return fallback;

    var raw = proj.page.trim().replace(/\\/g, '/');
    if (/^\.\.\/\.\.\/projects\/[^/]+\/[^/]+\/index\.html$/i.test(raw)) return raw;
    return fallback;
  }

  function addTap(el) {
    if (!el) return;
    el.classList.remove('tap');
    el.classList.remove('pj-btn-press');
    el.offsetWidth;
    el.classList.add('tap');
    el.classList.add('pj-btn-press');
    setTimeout(function () {
      el.classList.remove('tap');
      el.classList.remove('pj-btn-press');
    }, 300);
  }

  function animateCount(el, target, duration) {
    if (!el) return;
    var startTs = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(ts) {
      if (!startTs) startTs = ts;
      var elapsed = ts - startTs;
      var p = Math.min(elapsed / duration, 1);
      var value = Math.round(target * easeOutCubic(p));
      el.textContent = String(value);
      if (p < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function normalizeStatus(raw) {
    var t = String(raw || '').trim().toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
    if (!t) return '';
    if (t === 'completed' || t === 'done' || t === 'complete') return 'completed';
    if (t === 'in_progress' || t === 'progress' || t === 'wip' || t === 'ongoing') return 'in_progress';
    if (t === 'not_completed' || t === 'pending' || t === 'todo' || t === 'notdone') return 'not_completed';
    return '';
  }

  function projectStatusKey(proj) {
    var directStatus = normalizeStatus(proj && proj.status);
    if (directStatus) return directStatus;

    if (proj && proj.status && !directStatus) {
      statusValidationErrors.push({
        id: proj.id || 'unknown',
        status: String(proj.status)
      });
    }

    var metaStatus = '';
    if (Array.isArray(proj.meta)) {
      for (var i = 0; i < proj.meta.length; i += 1) {
        var entry = proj.meta[i] || {};
        if (String(entry.k || '').toLowerCase() === 'status') {
          metaStatus = normalizeStatus(entry.v);
          break;
        }
      }
    }

    if (metaStatus === 'completed') return 'completed';
    if (metaStatus === 'in_progress') return 'in_progress';
    return 'not_completed';
  }

  function printStatusValidationOnce() {
    if (statusValidationPrinted) return;
    statusValidationPrinted = true;
    if (!statusValidationErrors.length) return;

    console.warn(
      '[projects] Invalid project.status values found. Use only: completed | in_progress | not_completed',
      statusValidationErrors
    );
  }

  function initHeroAutoHide() {
    if (!pageRoot) return;
    pageRoot.classList.remove('pj-hero-hidden');
    var forcedMobileView = document.documentElement.getAttribute('data-view') === 'mobile';
    var isMobileLayout = window.matchMedia('(max-width: 900px)').matches || forcedMobileView;
    var isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    // On mobile/touch, keep native page flow and avoid hero-hide scroll logic.
    if (isMobileLayout || isTouchDevice) {
      return {
        enterWorkspaceView: function () {},
        showHero: function () {}
      };
    }

    // Desktop behavior:
    // - Scroll down: hide hero.
    // - When panel reaches top and stays there for a short time, show hero.
    var lastToggleTs = 0;
    var TOGGLE_GAP_MS = 120;
    var TOP_SHOW_DELAY_MS = 1400;
    var workspacePanels = [sidebar, detail].filter(Boolean);

    function enterWorkspaceView() {
      hideHero(true);
    }

    function showHero(force) {
      if (!pageRoot.classList.contains('pj-hero-hidden')) return;
      if (!force && Date.now() - lastToggleTs < TOGGLE_GAP_MS) return;
      pageRoot.classList.remove('pj-hero-hidden');
      lastToggleTs = Date.now();
    }

    function hideHero(force) {
      if (pageRoot.classList.contains('pj-hero-hidden')) return;
      if (!force && Date.now() - lastToggleTs < TOGGLE_GAP_MS) return;
      pageRoot.classList.add('pj-hero-hidden');
      lastToggleTs = Date.now();
    }

    workspacePanels.forEach(function (panel) {
      var lastTop = panel.scrollTop || 0;
      var showTimer = null;

      function clearTopShowTimer() {
        if (!showTimer) return;
        clearTimeout(showTimer);
        showTimer = null;
      }

      function scheduleTopShow() {
        clearTopShowTimer();
        showTimer = setTimeout(function () {
          showTimer = null;
          if ((panel.scrollTop || 0) <= 2) {
            showHero(true);
          }
        }, TOP_SHOW_DELAY_MS);
      }

      panel.addEventListener('scroll', function () {
        var top = panel.scrollTop || 0;
        var reachedTopNow = lastTop > 2 && top <= 2;
        lastTop = top;

        if (top > 2) {
          clearTopShowTimer();
          return;
        }

        if (reachedTopNow) {
          scheduleTopShow();
        }
      }, { passive: true });

      panel.addEventListener('wheel', function (e) {
        if (e.deltaY > 6) {
          clearTopShowTimer();
          hideHero(false);
          return;
        }
        if (e.deltaY < -6 && (panel.scrollTop || 0) <= 2 && !showTimer) {
          // If already at top, upward push arms the delayed header reveal.
          scheduleTopShow();
        }
      }, { passive: true, capture: true });
    });

    if (hero && detail) {
      hero.addEventListener('wheel', function (e) {
        if (e.deltaY <= 0) return;
        hideHero(false);
        detail.scrollTop += e.deltaY;
        e.preventDefault();
      }, { passive: false });
    }

    return {
      enterWorkspaceView: enterWorkspaceView,
      showHero: showHero
    };
  }

  function initSmoothWheelScrolling() {
    // Native wheel/touch scroll provides the smoothest behavior and avoids
    // stuck states between nested scroll containers.
  }

  function initNestedScrollPriority() {
    // Intentionally no custom wheel interception.
    // Native scrolling is more reliable across browsers and input devices.
  }

  function initKeyboardScroll() {
    var activePanel = detail || sidebar;
    [detail, sidebar].forEach(function (panel) {
      if (!panel) return;
      panel.setAttribute('tabindex', '0');
      panel.addEventListener('mouseenter', function () { activePanel = panel; });
      panel.addEventListener('focus', function () { activePanel = panel; });
      panel.addEventListener('wheel', function () { activePanel = panel; }, { passive: true });
    });

    document.addEventListener('keydown', function (e) {
      if (!activePanel) return;
      var key = e.key;
      var step = 56;
      var page = Math.max(120, Math.floor(activePanel.clientHeight * 0.88));

      if (key === 'ArrowDown') {
        e.preventDefault();
        activePanel.scrollTop += step;
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        activePanel.scrollTop -= step;
      } else if (key === 'PageDown') {
        e.preventDefault();
        activePanel.scrollTop += page;
      } else if (key === 'PageUp') {
        e.preventDefault();
        activePanel.scrollTop -= page;
      } else if (key === 'Home') {
        e.preventDefault();
        activePanel.scrollTop = 0;
      } else if (key === 'End') {
        e.preventDefault();
        activePanel.scrollTop = activePanel.scrollHeight;
      }
    });
  }

  function statusLabel(key) {
    if (key === 'completed') return 'Completed';
    if (key === 'in_progress') return 'In Progress';
    if (key === 'not_completed') return 'Not Completed';
    return 'All projects';
  }

  function statusVisualByKey(key) {
    if (key === 'completed') return { label: 'Completed', color: 'var(--grn)' };
    if (key === 'in_progress') return { label: 'In Progress', color: 'var(--cyn)' };
    return { label: 'Not Completed', color: 'var(--gold)' };
  }

  function renderPlaceholder(msg) {
    detail.innerHTML =
      '<div class="pj-placeholder">' +
        '<div class="pj-ph-ico">&#9881;&#65039;</div>' +
        '<div class="pj-ph-title">Select a project</div>' +
        '<div class="pj-ph-sub">' + (msg || '&#8592; Expand a concept from the sidebar') + '</div>' +
      '</div>';
  }

  function updateFilterUi(activeKey, visibleCount) {
    filterButtons.forEach(function (btn) {
      btn.classList.toggle('act', btn.getAttribute('data-status-filter') === activeKey);
      btn.setAttribute('aria-pressed', btn.classList.contains('act') ? 'true' : 'false');
    });
    document.title = 'Projects - ' + statusLabel(activeKey) + ' (' + visibleCount + ')';
  }

  function openFirstVisibleGroup() {
    var firstGroup = null;
    sidebar.querySelectorAll('.cg').forEach(function (group) {
      if (!firstGroup && !group.classList.contains('fh')) firstGroup = group;
    });
    if (!firstGroup) return;
    var toggle = firstGroup.querySelector('.cg-toggle');
    var list = firstGroup.querySelector('.cg-list');
    if (toggle) {
      toggle.classList.add('op');
      setExtendState(toggle, true);
    }
    if (list) list.classList.add('op');
  }

  function applyStatusFilter(filterKey) {
    currentFilter = filterKey || 'all';
    var visibleProjects = 0;
    var selectedStillVisible = false;

    sidebar.querySelectorAll('.cg').forEach(function (group) {
      var groupVisible = 0;
      group.querySelectorAll('.cg-item').forEach(function (item) {
        var itemStatus = item.getAttribute('data-status-key') || 'not_completed';
        var show = currentFilter === 'all' || itemStatus === currentFilter;
        item.classList.toggle('fh', !show);
        if (show) {
          groupVisible += 1;
          visibleProjects += 1;
          if (selectedProjectKey && item.getAttribute('data-project-key') === selectedProjectKey) {
            selectedStillVisible = true;
          }
        }
      });
      group.classList.toggle('fh', groupVisible === 0);
    });

    closeAllGroups();
    openFirstVisibleGroup();
    updateFilterUi(currentFilter, visibleProjects);

    if (selectedProjectKey && !selectedStillVisible) {
      selectedProjectKey = '';
      renderPlaceholder('Select from filtered projects');
    }
  }

  function spawnClickBurst(x, y) {
    var burst = document.createElement('span');
    burst.className = 'pj-click-burst';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    document.body.appendChild(burst);
    setTimeout(function () {
      if (burst && burst.parentNode) burst.parentNode.removeChild(burst);
    }, 560);
  }

  function initClickFx() {
    document.addEventListener('pointerdown', function (e) {
      var target = e.target.closest('a, button, .cg-item, .cg-toggle, .pj-open-btn, .pj-nb');
      if (!target) return;

      var x = e.clientX;
      var y = e.clientY;
      if (!x && !y) {
        var rect = target.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }

      addTap(target);
      spawnClickBurst(x, y);
    }, true);
  }

  function setExtendState(toggle, expanded) {
    var ext = toggle ? toggle.querySelector('.cg-ext') : null;
    if (!ext) return;
    ext.textContent = expanded ? 'Collapse' : 'Expand';
  }

  function closeAllGroups() {
    document.querySelectorAll('.cg-list').forEach(function (l) { l.classList.remove('op'); });
    document.querySelectorAll('.cg-toggle').forEach(function (t) {
      t.classList.remove('op');
      setExtendState(t, false);
    });
  }

  function animateStatusCounts() {
    var total = flat.length;
    var completed = 0;
    var progress = 0;
    var pending = 0;

    flat.forEach(function (item) {
      var key = projectStatusKey(item.proj);
      if (key === 'completed') completed += 1;
      else if (key === 'in_progress') progress += 1;
      else pending += 1;
    });

    animateCount(totalCountEl, total, 1150);
    animateCount(completedCountEl, completed, 1250);
    animateCount(progressCountEl, progress, 1350);
    animateCount(pendingCountEl, pending, 1450);

    var safeTotal = total > 0 ? total : 1;
    if (completedMeterEl) completedMeterEl.style.width = Math.round((completed / safeTotal) * 100) + '%';
    if (progressMeterEl) progressMeterEl.style.width = Math.round((progress / safeTotal) * 100) + '%';
    if (pendingMeterEl) pendingMeterEl.style.width = Math.round((pending / safeTotal) * 100) + '%';

    printStatusValidationOnce();
  }

  // Build flat list for count + prev/next
  data.forEach(function (concept, ci) {
    concept.projects.forEach(function (proj, pi) {
      flat.push({ ci: ci, pi: pi, concept: concept, proj: proj });
    });
  });

  animateStatusCounts();

  // Build sidebar
  data.forEach(function (concept) {
    var cg = document.createElement('div');
    cg.className = 'cg';
    cg.setAttribute('data-concept-id', concept.id);

    var toggle = document.createElement('button');
    toggle.className = 'cg-toggle';
    toggle.innerHTML =
      '<span class="cg-ico">' + concept.icon + '</span>' +
      '<span class="cg-lbl">' + concept.label + '</span>' +
      '<span class="cg-cnt">' + concept.projects.length + '</span>' +
      '<span class="cg-ext">Expand</span>' +
      '<span class="cg-arr">&#9658;</span>';

    var list = document.createElement('div');
    list.className = 'cg-list';

    concept.projects.forEach(function (proj) {
      var envTag =
        proj.env === 'local' ? '<span class="g-tag tg" style="font-size:.5rem;padding:.07rem .36rem">local</span>' :
        proj.env === 'server' ? '<span class="g-tag tc" style="font-size:.5rem;padding:.07rem .36rem">server</span>' :
        '<span class="g-tag tgd" style="font-size:.5rem;padding:.07rem .36rem">free</span>';

      var item = document.createElement('div');
      item.className = 'cg-item';
      item.setAttribute('data-concept-id', concept.id);
      item.setAttribute('data-project-id', proj.id);
      item.setAttribute('data-project-key', concept.id + '/' + proj.id);
      item.setAttribute('data-status-key', projectStatusKey(proj));
      item.innerHTML = '<span class="cg-item-lbl">' + proj.title + '</span>' + envTag;

      item.addEventListener('click', function () {
        addTap(item);
        document.querySelectorAll('.cg-item').forEach(function (i) { i.classList.remove('act'); });
        item.classList.add('act');
        selectedProjectKey = concept.id + '/' + proj.id;
        if (heroAutoHide.enterWorkspaceView) heroAutoHide.enterWorkspaceView();
        renderDetail(concept, proj);
      });

      list.appendChild(item);
    });

    toggle.addEventListener('click', function () {
      addTap(toggle);
      var isOpen = list.classList.contains('op');
      closeAllGroups();
      if (!isOpen) {
        if (heroAutoHide.enterWorkspaceView) heroAutoHide.enterWorkspaceView();
        list.classList.add('op');
        toggle.classList.add('op');
        setExtendState(toggle, true);
      }
    });

    cg.appendChild(toggle);
    cg.appendChild(list);
    sidebar.appendChild(cg);
  });

  function renderDetail(concept, proj) {
    var pos = flat.findIndex(function (f) { return f.concept.id === concept.id && f.proj.id === proj.id; });
    var prev = pos > 0 ? flat[pos - 1] : null;
    var next = pos < flat.length - 1 ? flat[pos + 1] : null;

    var envBadge =
      proj.env === 'local' ? '<span class="g-tag tg">&#9679; localhost</span>' :
      proj.env === 'server' ? '<span class="g-tag tc">&#9679; server</span>' :
      '<span class="g-tag tgd">&#9679; free tier</span>';

    var stepsHtml = proj.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('');

    var statusKey = projectStatusKey(proj);
    var statusVisual = statusVisualByKey(statusKey);

    var metaHtml = proj.meta.map(function (m) {
      var mk = String(m.k || '').toLowerCase();
      var valueText = m.v;
      var valueStyle = m.g ? 'color:var(--grn)' : '';

      if (mk === 'status') {
        valueText = statusVisual.label;
        valueStyle = 'color:' + statusVisual.color;
      }

      return '<div class="pj-mc"><div class="pj-mk">' + m.k + '</div>' +
             '<div class="pj-mv" style="' + valueStyle + '">' + valueText + '</div></div>';
    }).join('');

    var codeHtml = '';
    if (proj.code) {
      codeHtml = '<div class="g-code">' +
        '<div class="g-code__bar">' +
          '<div class="g-code__dots">' +
            '<div class="g-code__dot" style="background:#ff5f57"></div>' +
            '<div class="g-code__dot" style="background:#febc2e"></div>' +
            '<div class="g-code__dot" style="background:#28c840"></div>' +
          '</div>' +
          '<span class="g-code__fname">' + proj.code.fname + '</span>' +
          '<span class="g-code__lang">' + proj.code.lang + '</span>' +
        '</div>' +
        '<div class="g-code__body">' + proj.code.body + '</div>' +
      '</div>';
    }

    var projectPage = resolveProjectPage(concept, proj);
    var openLinkHtml = '<a class="pj-open-btn" href="' + projectPage + '" target="_blank">Open full page &#8599;</a>';

    detail.innerHTML =
      '<div class="pj-proj">' +
        '<div class="pj-bc">' +
          '<span>projects</span>' +
          '<span class="pj-bc-sep">/</span>' +
          '<span>' + concept.id + '</span>' +
          '<span class="pj-bc-sep">/</span>' +
          '<span class="pj-bc-cur">' + proj.id + '</span>' +
        '</div>' +
        '<div class="pj-hdr">' +
          '<div>' +
            '<div class="pj-concept">// ' + concept.label + '</div>' +
            '<div class="pj-title">' + proj.title + '</div>' +
            '<div>' + envBadge + '</div>' +
          '</div>' +
          openLinkHtml +
        '</div>' +
        '<p class="pj-desc">' + proj.desc + '</p>' +
        '<div class="pj-steps-title">Setup Steps</div>' +
        '<ol class="pj-steps">' + stepsHtml + '</ol>' +
        codeHtml +
        '<div class="pj-meta">' + metaHtml + '</div>' +
        '<div class="pj-nav">' +
          '<button class="pj-nb" id="pj-prev" ' + (!prev ? 'disabled' : '') + '>' +
            '&#8592; ' + (prev ? prev.proj.title : 'First') +
          '</button>' +
          '<button class="pj-nb" id="pj-next" ' + (!next ? 'disabled' : '') + '>' +
            (next ? next.proj.title : 'Last') + ' &#8594;' +
          '</button>' +
        '</div>' +
      '</div>';

    detail.scrollTop = 0;

    var btnPrev = document.getElementById('pj-prev');
    var btnNext = document.getElementById('pj-next');

    if (prev && btnPrev) {
      btnPrev.addEventListener('click', function () {
        openGroup(prev.concept.id);
        markActive(prev.concept, prev.proj);
        renderDetail(prev.concept, prev.proj);
      });
    }

    if (next && btnNext) {
      btnNext.addEventListener('click', function () {
        openGroup(next.concept.id);
        markActive(next.concept, next.proj);
        renderDetail(next.concept, next.proj);
      });
    }

    detail.querySelectorAll('a, button, [data-h]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('ch'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('ch'); });
    });
  }

  function openGroup(conceptId) {
    closeAllGroups();
    sidebar.querySelectorAll('.cg').forEach(function (group) {
      if (group.getAttribute('data-concept-id') === conceptId) {
        var toggle = group.querySelector('.cg-toggle');
        var list = group.querySelector('.cg-list');
        if (toggle) {
          toggle.classList.add('op');
          setExtendState(toggle, true);
        }
        if (list) list.classList.add('op');
      }
    });
  }

  function markActive(concept, proj) {
    document.querySelectorAll('.cg-item').forEach(function (i) { i.classList.remove('act'); });
    var selector = '.cg-item[data-concept-id="' + concept.id + '"][data-project-id="' + proj.id + '"]';
    var item = sidebar.querySelector(selector);
    if (item) item.classList.add('act');
    selectedProjectKey = concept.id + '/' + proj.id;
  }

  initClickFx();
  var heroAutoHide = initHeroAutoHide() || {};
  initSmoothWheelScrolling();
  initNestedScrollPriority();
  initKeyboardScroll();
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      addTap(btn);
      if (heroAutoHide.enterWorkspaceView) heroAutoHide.enterWorkspaceView();
      applyStatusFilter(btn.getAttribute('data-status-filter') || 'all');
    });
  });

  // Initial state: all groups collapsed, detail placeholder visible.
  closeAllGroups();
  renderPlaceholder();
  applyStatusFilter('all');
})();
