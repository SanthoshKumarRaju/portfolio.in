/* projects.js - builds sidebar accordion + inline detail panel from PDATA */
(function () {
  'use strict';

  var data = normalizeData(window.PDATA || []);
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
  var envFilterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-env-filter]'));
  var statusValidationPrinted = false;
  var statusValidationErrors = [];
  var activeStatusFilters = { completed: false, in_progress: false, not_completed: false };
  var activeEnvFilters = { local: false, server: false, cloud: false, free: false };
  var selectedProjectKey = '';
  var flat = []; // { ci, pi, concept, proj }
  var LAST_OPENED_KEY = 'pj:last-opened-project';
  var filterInfoEl = null;

  function normalizeData(raw) {
    var list = Array.isArray(raw) ? raw.slice() : [];
    list = list.map(applyConceptTags);           // respect pre-set tags; no hardcoding required
    list = normalizeConceptSectionsByMap(list);  // apply explicit section map (any concept)
    list = injectSharedProjects(list);           // add shared projects across concepts
    return list;
  }

  function applyConceptTags(concept) {
    var c = Object.assign({}, concept);

    function inferTag(proj) {
      if (proj.conceptTag) return String(proj.conceptTag);
      if (proj.sectionKey) return String(proj.sectionKey);
      return '';
    }

    function tagProject(proj) {
      var clone = Object.assign({}, proj);
      var tag = inferTag(clone);
      if (tag) clone.conceptTag = tag;
      return clone;
    }

    if (Array.isArray(c.projects)) {
      c.projects = c.projects.map(tagProject);
    }
    if (Array.isArray(c.sections)) {
      c.sections = c.sections.map(function (s) {
        var sc = Object.assign({}, s);
        if (Array.isArray(sc.projects)) sc.projects = sc.projects.map(tagProject);
        return sc;
      });
    }
    return c;
  }

  function normalizeCloudConcept(list) {
    // Legacy no-op: keep list unchanged (sections are now defined in projects-data.js via PDATA_SECTION_MAP).
    return list;
  }

  // Optional: allow sharing a project across concepts via window.PDATA_SHARED = [{ projectId, targets:[conceptId], sectionId }]
  function injectSharedProjects(list) {
    var config = Array.isArray(window.PDATA_SHARED) ? window.PDATA_SHARED : [];
    if (!config.length) return list;

    var projectIndex = {};
    list.forEach(function (concept) {
      (concept.projects || []).forEach(function (proj) {
        projectIndex[proj.id] = proj;
      });
      (concept.sections || []).forEach(function (section) {
        (section.projects || []).forEach(function (proj) { projectIndex[proj.id] = proj; });
      });
    });

    config.forEach(function (entry) {
      var proj = projectIndex[entry.projectId];
      if (!proj || !Array.isArray(entry.targets)) return;
      entry.targets.forEach(function (cid) {
        var concept = list.find(function (c) { return c.id === cid; });
        if (!concept) return;
        if (Array.isArray(concept.sections) && concept.sections.length) {
          var targetSection = concept.sections[0];
          if (entry.sectionId) {
            var found = concept.sections.find(function (s) { return s.id === entry.sectionId; });
            if (found) targetSection = found;
          }
          if (!targetSection.projects) targetSection.projects = [];
          if (!targetSection.projects.find(function (p) { return p.id === proj.id; })) {
            targetSection.projects.push(proj);
          }
        } else {
          if (!concept.projects) concept.projects = [];
          if (!concept.projects.find(function (p) { return p.id === proj.id; })) {
            concept.projects.push(proj);
          }
        }
      });
    });
    return list;
  }

  // Optional: external section mapping per concept (works for any concept, not just Cloud).
  // window.PDATA_SECTION_MAP = { conceptId: { sections: [ { id,label, ids:[], env:null } , ... ] } }
  function normalizeConceptSectionsByMap(list) {
    var map = window.PDATA_SECTION_MAP || {};
    if (!map || typeof map !== 'object') return list;

    function envKey(raw) {
      var key = String(raw || '').trim().toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
      if (!key) return '';
      if (key === 'localhost') return 'local';
      if (key === 'prod' || key === 'production') return 'server';
      return key;
    }

    function matchField(proj, field, value) {
      if (!field) return false;
      var lhs = String(proj && proj[field] !== undefined ? proj[field] : '').toLowerCase();
      var rhs = String(value || '').toLowerCase();
      return !!lhs && lhs === rhs;
    }

    return list.map(function (concept) {
      var cfg = map[concept.id];
      if (!cfg || !Array.isArray(cfg.sections) || !cfg.sections.length) return concept;
      if (Array.isArray(concept.sections) && !cfg.force) return concept;

      var remaining = Array.isArray(concept.projects) ? concept.projects.slice() : [];
      // If projects already split into sections, pull them back into the pool so remapping doesn't lose items.
      if (!remaining.length && Array.isArray(concept.sections)) {
        concept.sections.forEach(function (s) {
          (s.projects || []).forEach(function (p) { remaining.push(p); });
        });
      }
      var sections = cfg.sections.map(function (sec) {
        var collected = [];
        remaining = remaining.filter(function (proj) {
          var matchesId = Array.isArray(sec.ids) && sec.ids.includes(proj.id);
          var matchesEnv = sec.env && envKey(proj.env) === envKey(sec.env);
          var matchesConcept = sec.concept && String(proj.concept || '').toLowerCase() === String(sec.concept).toLowerCase();
          var matchesField = sec.field && matchField(proj, sec.field, sec.value);
          if (matchesId || matchesEnv || matchesConcept || matchesField) {
            collected.push(proj);
            return false;
          }
          return true;
        });
        return {
          id: sec.id,
          label: sec.label,
          projects: collected,
          theme: sec.theme || null
        };
      });

      if (remaining.length) {
        sections.push({ id: 'other', label: 'Other', projects: remaining });
      }

      return Object.assign({}, concept, { sections: sections, projects: undefined });
    });
  }

  function conceptSections(concept) {
    if (Array.isArray(concept.sections) && concept.sections.length) {
      return concept.sections;
    }
    return [];
  }

  function conceptProjects(concept) {
    var arr = [];
    var sections = conceptSections(concept);
    if (sections.length) {
      sections.forEach(function (section) {
        var list = Array.isArray(section.projects) ? section.projects : [];
        for (var i = 0; i < list.length; i += 1) {
          arr.push({ section: section, proj: list[i] });
        }
      });
    } else {
      var fallbackProjects = Array.isArray(concept.projects) ? concept.projects : [];
      fallbackProjects.forEach(function (proj) {
        arr.push({ section: null, proj: proj });
      });
    }
    return arr;
  }

  function resolveProjectPage(concept, proj) {
    var fallback = '../../projects/' + concept.id + '/' + proj.id + '/index.html';
    if (!proj || typeof proj.page !== 'string') return fallback;

    var raw = proj.page.trim();
    if (!raw) return fallback;

    // Normalize slashes so callers can use Windows-style paths in data.
    raw = raw.replace(/\\/g, '/');

    // Respect any author-supplied path (relative, root-absolute, or full URL).
    // Only fall back to the legacy convention if no page is provided.
    return raw;
  }

  function rememberOpenedProject(concept, proj) {
    var key = concept.id + '/' + proj.id;
    try {
      window.sessionStorage.setItem(LAST_OPENED_KEY, key);
    } catch (e) {}
    return key;
  }

  function lastOpenedProjectKey() {
    try {
      return window.sessionStorage.getItem(LAST_OPENED_KEY) || '';
    } catch (e) {
      return '';
    }
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
    // Keep hero fixed and rely on native scrolling for a stable UX.
    return {
      enterWorkspaceView: function () {},
      showHero: function () {}
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

  function hasActiveStatusFilters() {
    return activeStatusFilters.completed || activeStatusFilters.in_progress || activeStatusFilters.not_completed;
  }

  function clearStatusFilters() {
    activeStatusFilters.completed = false;
    activeStatusFilters.in_progress = false;
    activeStatusFilters.not_completed = false;
  }

  function statusFilterKeys() {
    return Object.keys(activeStatusFilters).filter(function (k) { return activeStatusFilters[k]; });
  }

  function isStatusVisible(itemStatusKey) {
    if (!hasActiveStatusFilters()) return true;
    return !!activeStatusFilters[itemStatusKey];
  }

  function normalizeEnv(raw) {
    var key = String(raw || '').trim().toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
    if (!key) return 'free';
    if (key === 'local' || key === 'localhost') return 'local';
    if (key === 'server' || key === 'prod' || key === 'production') return 'server';
    if (key === 'cloud') return 'cloud';
    if (key === 'free' || key === 'free_tier' || key === 'freetier') return 'free';
    return 'free';
  }

  function hasActiveEnvFilters() {
    return activeEnvFilters.local || activeEnvFilters.server || activeEnvFilters.cloud || activeEnvFilters.free;
  }

  function clearEnvFilters() {
    activeEnvFilters.local = false;
    activeEnvFilters.server = false;
    activeEnvFilters.cloud = false;
    activeEnvFilters.free = false;
  }

  function envFilterKeys() {
    return Object.keys(activeEnvFilters).filter(function (k) { return activeEnvFilters[k]; });
  }

  function envLabel(key) {
    if (key === 'local') return 'localhost';
    if (key === 'server') return 'server';
    if (key === 'cloud') return 'cloud';
    return 'free tier';
  }

  function isEnvVisible(itemEnvKey) {
    if (!hasActiveEnvFilters()) return true;
    return !!activeEnvFilters[itemEnvKey];
  }

  function renderPlaceholder(msg) {
    if (!detail) return;
    detail.innerHTML =
      '<div class="pj-placeholder">' +
        '<div class="pj-ph-ico">&#9881;&#65039;</div>' +
        '<div class="pj-ph-title">Select a project</div>' +
        '<div class="pj-ph-sub">' + (msg || '&#8592; Expand a concept from the sidebar') + '</div>' +
      '</div>';
  }

  function updateFilterUi(visibleCount) {
    filterButtons.forEach(function (btn) {
      var key = btn.getAttribute('data-status-filter') || 'all';
      var isAll = key === 'all';
      var active = isAll ? (!hasActiveStatusFilters() && !hasActiveEnvFilters()) : !!activeStatusFilters[key];
      btn.classList.toggle('act', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    var statusSelected = statusFilterKeys();
    var envSelected = envFilterKeys();
    var statusPart = statusSelected.length ? 'Status: ' + statusSelected.map(statusLabel).join(', ') + ' | ' : '';
    var envPart = envSelected.length ? ' | Env: ' + envSelected.join(', ') : '';
    document.title = 'Projects - ' + statusPart + 'Projects' + envPart + ' (' + visibleCount + ')';
  }

  function updateEnvFilterUi() {
    envFilterButtons.forEach(function (btn) {
      var key = normalizeEnv(btn.getAttribute('data-env-filter'));
      var active = !!activeEnvFilters[key];
      btn.classList.toggle('act', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function renderFilterInfo(visibleCount) {
    if (!filterInfoEl) return;
    var statusSelected = statusFilterKeys();
    var envSelected = envFilterKeys();
    var statusActive = statusSelected.length > 0;
    var envActive = envSelected.length > 0;

    if (!statusActive && !envActive) {
      filterInfoEl.classList.add('hidden');
      filterInfoEl.innerHTML = '';
      return;
    }

    var chips = [];
    statusSelected.forEach(function (k) {
      chips.push('<span class="pj-filter-chip pj-filter-chip--status">Status: ' + statusLabel(k) + '</span>');
    });
    envSelected.forEach(function (k) {
      chips.push('<span class="pj-filter-chip pj-filter-chip--env">Env: ' + envLabel(k) + '</span>');
    });

    filterInfoEl.classList.remove('hidden');
    filterInfoEl.innerHTML =
      '<div class="pj-filter-info__title">Active Filters</div>' +
      '<div class="pj-filter-info__chips">' + chips.join('') + '</div>' +
      '<div class="pj-filter-info__count">Showing ' + visibleCount + ' project' + (visibleCount === 1 ? '' : 's') + '</div>';
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

  function applyStatusFilter() {
    var visibleProjects = 0;
    var selectedStillVisible = false;

    sidebar.querySelectorAll('.cg').forEach(function (group) {
      var groupVisible = 0;
      group.querySelectorAll('.cg-item').forEach(function (item) {
        var itemStatus = item.getAttribute('data-status-key') || 'not_completed';
        var itemEnv = normalizeEnv(item.getAttribute('data-env-key'));
        var showByStatus = isStatusVisible(itemStatus);
        var showByEnv = isEnvVisible(itemEnv);
        var show = showByStatus && showByEnv;
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

    updateEnvFilterUi();
    updateFilterUi(visibleProjects);
    renderFilterInfo(visibleProjects);

    if (!visibleProjects) {
      selectedProjectKey = '';
      renderPlaceholder('No projects match the selected filters');
      return;
    }

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
    var entries = conceptProjects(concept);
    entries.forEach(function (entry, pi) {
      flat.push({ ci: ci, pi: pi, concept: concept, section: entry.section, proj: entry.proj });
    });
  });

  animateStatusCounts();

  filterInfoEl = document.createElement('div');
  filterInfoEl.className = 'pj-filter-info hidden';
  sidebar.appendChild(filterInfoEl);

  // Build sidebar
  data.forEach(function (concept) {
    var cg = document.createElement('div');
    cg.className = 'cg';
    cg.setAttribute('data-concept-id', concept.id);

    var conceptProjectEntries = conceptProjects(concept);
    var sections = conceptSections(concept);

    var toggle = document.createElement('button');
    toggle.className = 'cg-toggle';
    toggle.innerHTML =
      '<span class="cg-ico">' + concept.icon + '</span>' +
      '<span class="cg-lbl">' + concept.label + '</span>' +
      '<span class="cg-cnt">' + conceptProjectEntries.length + '</span>' +
      '<span class="cg-ext">Expand</span>' +
      '<span class="cg-arr">&#9658;</span>';

    var list = document.createElement('div');
    list.className = 'cg-list';

    if (sections.length) {
      sections.forEach(function (section) {
        var secWrap = document.createElement('div');
        secWrap.className = 'cg-sec';
        secWrap.setAttribute('data-section-id', section.id || '');
        if (section.theme) secWrap.classList.add('cg-sec--' + section.theme);

        var secHead = document.createElement('div');
        secHead.className = 'cg-sec-head';
        secHead.setAttribute('role', 'button');
        secHead.setAttribute('tabindex', '0');
        secHead.innerHTML =
          '<span class="cg-sec-lbl">' + (section.label || 'Projects') + '</span>' +
          '<span class="cg-sec-count">' + (Array.isArray(section.projects) ? section.projects.length : 0) + '</span>' +
          '<span class="cg-sec-arr">&#9658;</span>';
        secWrap.appendChild(secHead);

        var secList = document.createElement('div');
        secList.className = 'cg-sec-list';

        (Array.isArray(section.projects) ? section.projects : []).forEach(function (proj) {
          var envKey = normalizeEnv(proj.env);
          var envTag =
            envKey === 'local' ? '<span class="g-tag tg" style="font-size:.5rem;padding:.07rem .36rem">local</span>' :
            envKey === 'server' ? '<span class="g-tag tc" style="font-size:.5rem;padding:.07rem .36rem">server</span>' :
            envKey === 'cloud' ? '<span class="g-tag tc" style="font-size:.5rem;padding:.07rem .36rem">cloud</span>' :
            '<span class="g-tag tgd" style="font-size:.5rem;padding:.07rem .36rem">free</span>';

          var item = document.createElement('div');
          item.className = 'cg-item';
          item.setAttribute('data-concept-id', concept.id);
          item.setAttribute('data-section-id', section.id || '');
          item.setAttribute('data-project-id', proj.id);
          item.setAttribute('data-project-key', concept.id + '/' + proj.id);
          item.setAttribute('data-status-key', projectStatusKey(proj));
          item.setAttribute('data-env-key', envKey);
          item.innerHTML = '<span class="cg-item-lbl">' + proj.title + '</span>' + envTag;

          item.addEventListener('click', function () {
            addTap(item);
            document.querySelectorAll('.cg-item').forEach(function (i) { i.classList.remove('act'); });
            item.classList.add('act');
            selectedProjectKey = concept.id + '/' + proj.id;
            if (heroAutoHide.enterWorkspaceView) heroAutoHide.enterWorkspaceView();
            renderDetail(concept, proj);
          });

          secList.appendChild(item);
        });

        function toggleSection() {
          var isOpen = secList.classList.contains('op');
          secList.classList.toggle('op', !isOpen);
          secHead.classList.toggle('op', !isOpen);
        }

        secHead.addEventListener('click', toggleSection);
        secHead.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSection();
          }
        });

        secWrap.appendChild(secList);
        list.appendChild(secWrap);
      });
    } else {
      (Array.isArray(concept.projects) ? concept.projects : []).forEach(function (proj) {
        var envKey = normalizeEnv(proj.env);
        var envTag =
          envKey === 'local' ? '<span class="g-tag tg" style="font-size:.5rem;padding:.07rem .36rem">local</span>' :
          envKey === 'server' ? '<span class="g-tag tc" style="font-size:.5rem;padding:.07rem .36rem">server</span>' :
          envKey === 'cloud' ? '<span class="g-tag tc" style="font-size:.5rem;padding:.07rem .36rem">cloud</span>' :
          '<span class="g-tag tgd" style="font-size:.5rem;padding:.07rem .36rem">free</span>';

        var item = document.createElement('div');
        item.className = 'cg-item';
        item.setAttribute('data-concept-id', concept.id);
        item.setAttribute('data-project-id', proj.id);
        item.setAttribute('data-project-key', concept.id + '/' + proj.id);
        item.setAttribute('data-status-key', projectStatusKey(proj));
        item.setAttribute('data-env-key', envKey);
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
    }

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
    var projectPage = resolveProjectPage(concept, proj);
    var statusKey = projectStatusKey(proj);
    var statusVisual = statusVisualByKey(statusKey);
    var summary = String(proj.summary || proj.desc || '').trim();
    var purpose = String(proj.purpose || '').trim();
    var overview = Array.isArray(proj.overview) ? proj.overview : [];
    var projectKey = concept.id + '/' + proj.id;
    var isLastOpened = lastOpenedProjectKey() === projectKey;
    var safeTitle = String(proj.title || 'Untitled Project');
    var updateNoteHtml = '';

    if (statusKey === 'in_progress') {
      updateNoteHtml =
        '<div class="pj-update-note"><strong>Daily Update:</strong> This project is actively in progress and updated every day as work continues toward completion.</div>';
    } else if (statusKey === 'not_completed') {
      updateNoteHtml =
        '<div class="pj-update-note"><strong>Upcoming Project:</strong> This project is planned and will be completed based on current task priorities.</div>';
    }

    var envKey = normalizeEnv(proj.env);
    var envBadge =
      envKey === 'local' ? '<span class="g-tag tg">&#9679; localhost</span>' :
      envKey === 'server' ? '<span class="g-tag tc">&#9679; server</span>' :
      envKey === 'cloud' ? '<span class="g-tag tc">&#9679; cloud</span>' :
      '<span class="g-tag tgd">&#9679; free tier</span>';
    var openLinkHtml =
      '<div class="pj-link-row">' +
        '<a class="pj-open-btn pj-open-btn--primary' + (isLastOpened ? ' is-opened' : '') + '" data-open-page="1" href="' + projectPage + '" target="_blank" rel="noopener">' +
          '<span class="pj-open-btn__dot"></span>Guide &#8599;' +
        '</a>' +
        // '<a class="pj-open-btn pj-open-btn--subtle" data-open-page="1" href="' + projectPage + '">' +
        //   'Open' +
        // '</a>' +
        '<div class="pj-open-help">Complete steps, commands, and configs are inside the guide page.</div>' +
      '</div>';

    detail.innerHTML =
      '<div class="pj-proj">' +
        '<div class="pj-layout">' +
          '<div class="pj-main">' +
            '<div class="pj-bc">' +
              '<span>projects</span>' +
              '<span class="pj-bc-sep">/</span>' +
              '<span>' + concept.id + '</span>' +
              '<span class="pj-bc-sep">/</span>' +
              '<span class="pj-bc-cur">' + proj.id + '</span>' +
            '</div>' +
            '<div class="pj-hdr">' +
              '<div>' +
                '<div class="pj-concept"><span class="pj-concept-pill">' + concept.label + '</span></div>' +
                '<div class="pj-title" title="' + safeTitle.replace(/"/g, '&quot;') + '">' + safeTitle + '</div>' +
                '<div class="pj-badge-row">' + envBadge +
                  '<span class="g-tag" style="border-color:' + statusVisual.color + ';color:' + statusVisual.color + '">' +
                    '&#9679; ' + statusVisual.label +
                  '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="pj-steps-title">Project Overview</div>' +
            (summary ? '<p class="pj-desc pj-desc--hero">' + summary + '</p>' : '') +
            (purpose ? '<div class="pj-steps-title">Purpose</div><p class="pj-desc">' + purpose + '</p>' : '') +
            (overview.length ? '<div class="pj-steps-title">Overview</div><ol class="pj-steps">' +
              overview.map(function (item) { return '<li>' + item + '</li>'; }).join('') +
              '</ol>' : '') +
            '<div class="pj-motivate"><strong>Execution Promise:</strong> The full guide page contains everything needed to perform this project end-to-end on your own.</div>' +
            updateNoteHtml +
            '<div class="pj-nav">' +
              '<button class="pj-nb" id="pj-prev" ' + (!prev ? 'disabled' : '') + '>' +
                '&#8592; ' + (prev ? prev.proj.title : 'First') +
              '</button>' +
              '<button class="pj-nb" id="pj-next" ' + (!next ? 'disabled' : '') + '>' +
                (next ? next.proj.title : 'Last') + ' &#8594;' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<aside class="pj-action-rail">' + openLinkHtml + '</aside>' +
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

    detail.querySelectorAll('.pj-open-btn[data-open-page]').forEach(function (link) {
      link.addEventListener('click', function () {
        rememberOpenedProject(concept, proj);
      });
    });

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

  function openFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var conceptId = String(params.get('concept') || '').trim().toLowerCase();
    var projectId = String(params.get('project') || '').trim().toLowerCase();
    if (!conceptId) return;

    var concept = null;
    for (var ci = 0; ci < data.length; ci += 1) {
      if (String(data[ci].id || '').toLowerCase() === conceptId) {
        concept = data[ci];
        break;
      }
    }
    if (!concept) return;

    var conceptEntries = conceptProjects(concept);
    if (!conceptEntries.length) return;

    var projEntry = null;
    if (projectId) {
      for (var pi = 0; pi < conceptEntries.length; pi += 1) {
        if (String(conceptEntries[pi].proj.id || '').toLowerCase() === projectId) {
          projEntry = conceptEntries[pi];
          break;
        }
      }
    }

    if (!projEntry) {
      for (var vi = 0; vi < conceptEntries.length; vi += 1) {
        var candidate = conceptEntries[vi].proj;
        if (isStatusVisible(projectStatusKey(candidate)) && isEnvVisible(normalizeEnv(candidate.env))) {
          projEntry = conceptEntries[vi];
          break;
        }
      }
    }
    if (!projEntry) projEntry = conceptEntries[0];
    if (!projEntry) return;

    openGroup(concept.id);
    markActive(concept, projEntry.proj);
    if (heroAutoHide.enterWorkspaceView) heroAutoHide.enterWorkspaceView();
    renderDetail(concept, projEntry.proj);
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
      var key = btn.getAttribute('data-status-filter') || 'all';
      if (key === 'all') {
        clearStatusFilters();
        clearEnvFilters();
      } else {
        activeStatusFilters[key] = !activeStatusFilters[key];
      }
      applyStatusFilter();
    });
  });

  envFilterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = normalizeEnv(btn.getAttribute('data-env-filter'));
      addTap(btn);
      if (heroAutoHide.enterWorkspaceView) heroAutoHide.enterWorkspaceView();
      activeEnvFilters[key] = !activeEnvFilters[key];
      applyStatusFilter();
    });
  });

  // Initial state: all groups collapsed, detail placeholder visible.
  closeAllGroups();
  renderPlaceholder();
  applyStatusFilter();
  openFromQuery();

  // Keep new section lists collapsed on first load.
  document.querySelectorAll('.cg-sec-list').forEach(function (secList) {
    secList.classList.remove('op');
  });
})();
