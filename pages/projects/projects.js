/* projects.js — builds sidebar accordion + inline detail panel from PDATA */
(function () {
  'use strict';

  var data = window.PDATA;
  if (!data) { console.error('projects-data.js not loaded'); return; }

  var sidebar = document.getElementById('pj-sidebar');
  var detail  = document.getElementById('pj-detail');
  var flat = []; // {ci, pi, concept, proj}

  /* ── Build flat list for prev/next ── */
  data.forEach(function (concept, ci) {
    concept.projects.forEach(function (proj, pi) {
      flat.push({ ci: ci, pi: pi, concept: concept, proj: proj });
    });
  });

  /* ── Build sidebar ── */
  data.forEach(function (concept) {
    var cg = document.createElement('div');
    cg.className = 'cg';

    var toggle = document.createElement('button');
    toggle.className = 'cg-toggle';
    toggle.innerHTML =
      '<span class="cg-ico">' + concept.icon + '</span>' +
      '<span class="cg-lbl">' + concept.label + '</span>' +
      '<span class="cg-cnt">' + concept.projects.length + '</span>' +
      '<span class="cg-arr">&#9658;</span>';

    var list = document.createElement('div');
    list.className = 'cg-list';

    concept.projects.forEach(function (proj) {
      var envTag =
        proj.env === 'local'  ? '<span class="g-tag tg"  style="font-size:.5rem;padding:.07rem .36rem">local</span>'  :
        proj.env === 'server' ? '<span class="g-tag tc"  style="font-size:.5rem;padding:.07rem .36rem">server</span>' :
                                '<span class="g-tag tgd" style="font-size:.5rem;padding:.07rem .36rem">free</span>';

      var item = document.createElement('div');
      item.className = 'cg-item';
      item.innerHTML = '<span class="cg-item-lbl">' + proj.title + '</span>' + envTag;

      item.addEventListener('click', function () {
        document.querySelectorAll('.cg-item').forEach(function (i) { i.classList.remove('act'); });
        item.classList.add('act');
        renderDetail(concept, proj);
      });

      list.appendChild(item);
    });

    toggle.addEventListener('click', function () {
      var isOpen = list.classList.contains('op');
      /* close all */
      document.querySelectorAll('.cg-list').forEach(function (l) { l.classList.remove('op'); });
      document.querySelectorAll('.cg-toggle').forEach(function (t) { t.classList.remove('op'); });
      /* open this one */
      if (!isOpen) { list.classList.add('op'); toggle.classList.add('op'); }
    });

    cg.appendChild(toggle);
    cg.appendChild(list);
    sidebar.appendChild(cg);
  });

  /* ── Render detail panel ── */
  function renderDetail(concept, proj) {
    var pos  = flat.findIndex(function (f) { return f.concept.id === concept.id && f.proj.id === proj.id; });
    var prev = pos > 0 ? flat[pos - 1] : null;
    var next = pos < flat.length - 1 ? flat[pos + 1] : null;

    var envBadge =
      proj.env === 'local'  ? '<span class="g-tag tg">&#9679; localhost</span>' :
      proj.env === 'server' ? '<span class="g-tag tc">&#9679; server</span>'    :
                              '<span class="g-tag tgd">&#9679; free tier</span>';

    var stepsHtml = proj.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('');

    var metaHtml = proj.meta.map(function (m) {
      return '<div class="pj-mc"><div class="pj-mk">' + m.k + '</div>' +
             '<div class="pj-mv" style="' + (m.g ? 'color:var(--grn)' : '') + '">' + m.v + '</div></div>';
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

    var openLinkHtml = '';
    if (proj.page) {
      openLinkHtml = '<a class="pj-open-btn" href="' + proj.page + '" target="_blank">Open full page &#8599;</a>';
    }

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

    /* wire prev/next buttons */
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

    /* re-bind cursor hover for new elements */
    detail.querySelectorAll('a, button, [data-h]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('ch'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('ch'); });
    });
  }

  function openGroup(conceptId) {
    document.querySelectorAll('.cg-list').forEach(function (l) { l.classList.remove('op'); });
    document.querySelectorAll('.cg-toggle').forEach(function (t) { t.classList.remove('op'); });
    sidebar.querySelectorAll('.cg-toggle').forEach(function (toggle) {
      var list = toggle.nextElementSibling;
      if (!list) return;
      var firstItem = list.querySelector('.cg-item');
      /* We match by concept label in the toggle text */
      var lbl = toggle.querySelector('.cg-lbl');
      if (!lbl) return;
      var concept = data.find(function (c) { return c.label === lbl.textContent.trim(); });
      if (concept && concept.id === conceptId) {
        toggle.classList.add('op');
        list.classList.add('op');
      }
    });
  }

  function markActive(concept, proj) {
    document.querySelectorAll('.cg-item').forEach(function (item) {
      var lbl = item.querySelector('.cg-item-lbl');
      if (lbl && lbl.textContent.trim() === proj.title) {
        document.querySelectorAll('.cg-item').forEach(function (i) { i.classList.remove('act'); });
        item.classList.add('act');
      }
    });
  }

})();
