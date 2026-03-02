/* home.js */
(function () {
  /* ── Terminal ── */
  var tb = document.getElementById('term-body');
  if (tb) {
    var lines = [
      { t: 'cmd', v: 'whoami' },
      { t: 'out', v: 'santhosh.kumar.raju', c: 'ok' },
      { t: 'cmd', v: 'cat /etc/role' },
      { t: 'out', v: 'AWS &amp; DevOps Engineer', c: 'hi' },
      { t: 'cmd', v: 'kubectl get nodes' },
      { t: 'out', v: 'eks-prod-1&nbsp;&nbsp; Ready&nbsp;&nbsp; v1.28.4', c: 'ok' },
      { t: 'out', v: 'eks-prod-2&nbsp;&nbsp; Ready&nbsp;&nbsp; v1.28.4', c: 'ok' },
      { t: 'cmd', v: 'docker service ls' },
      { t: 'out', v: 'elk-stack&nbsp;&nbsp;&nbsp; 3/3&nbsp; replicated', c: 'ok' },
      { t: 'out', v: 'grafana&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1&nbsp; replicated', c: 'ok' },
      { t: 'out', v: 'traefik&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1/1&nbsp; global', c: 'ok' },
      { t: 'cmd', v: 'aws sts get-caller-identity' },
      { t: 'out', v: '"Account": "PROD-ap-south-1 ✓"', c: 'hi' },
      { t: 'cmd', v: 'echo "Open to work 🚀"' },
      { t: 'out', v: 'Open to work 🚀', c: 'hi' }
    ];
    var i = 0;
    function next() {
      if (!document.contains(tb) || i >= lines.length) return;
      var l = lines[i++];
      var d = document.createElement('div'); d.className = 'tl';
      if (l.t === 'cmd') {
        d.innerHTML = '<span class="tp">~$</span><span class="tc"> ' + l.v + '</span>';
      } else {
        var cls = l.c === 'ok' ? 'to tok' : l.c === 'hi' ? 'to thi' : 'to';
        d.innerHTML = '<span class="' + cls + '">' + l.v + '</span>';
      }
      tb.appendChild(d); tb.scrollTop = 9999;
      setTimeout(next, l.t === 'cmd' ? 560 : 140);
    }
    tb.innerHTML = '<div class="tl"><span class="tp">~$</span><span class="tcur"></span></div>';
    setTimeout(function () { tb.innerHTML = ''; next(); }, 900);
  }

  /* ── Marquee ── */
  var mq = document.getElementById('marquee');
  if (mq) {
    mq.innerHTML += mq.innerHTML;
    var pos = 0;
    (function tick() {
      pos -= 0.42;
      if (pos < -(mq.scrollWidth / 2)) pos = 0;
      mq.style.transform = 'translateX(' + pos + 'px)';
      requestAnimationFrame(tick);
    })();
  }
  /* -- Download Blast -- */
  var dlLinks = document.querySelectorAll('.hero-dl');
  if (dlLinks.length) {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fx = document.createElement('div');
    fx.className = 'dl-screen';
    fx.innerHTML = '<div class="dl-screen__veil"></div><div class="dl-screen__ring"></div><div class="dl-screen__txt"></div>';

    var txt = fx.querySelector('.dl-screen__txt');
    for (var p = 0; p < 96; p++) {
      var piece = document.createElement('span');
      piece.className = p % 3 === 0 ? 'dl-spark' : 'dl-paper';
      fx.appendChild(piece);
    }
    var particles = fx.querySelectorAll('.dl-paper, .dl-spark');
    document.body.appendChild(fx);

    var isBusy = false;
    var linkedinUrl = 'https://linkedin.com/in/santhosh-kumar-raju-dasararaju-5905a81b3';
    var dlPop = document.createElement('div');
    dlPop.className = 'dl-pop';
    dlPop.innerHTML =
      '<div class="dl-pop__back"></div>' +
      '<div class="dl-pop__card" role="dialog" aria-modal="true" aria-label="Download completed">' +
      '<button type="button" class="dl-pop__close" aria-label="Close">x</button>' +
      '<div class="dl-pop__head">Thanks for downloading my resume.</div>' +
      '<div class="dl-pop__sub">Let&apos;s connect.</div>' +
      '<a class="dl-pop__cta" href="' + linkedinUrl + '" target="_blank" rel="noopener noreferrer">View LinkedIn Profile</a>' +
      '</div>';
    document.body.appendChild(dlPop);

    var dlPopClose = dlPop.querySelector('.dl-pop__close');
    var dlPopBack = dlPop.querySelector('.dl-pop__back');
    var dlPopTimer = null;

    function closeDlPop() {
      dlPop.classList.remove('on');
      document.body.classList.remove('dl-pop-open');
    }
    function openDlPop() {
      if (dlPopTimer) {
        clearTimeout(dlPopTimer);
        dlPopTimer = null;
      }
      dlPop.classList.add('on');
      document.body.classList.add('dl-pop-open');
      dlPopTimer = setTimeout(closeDlPop, 9000);
    }

    dlPopClose.addEventListener('click', closeDlPop);
    dlPopBack.addEventListener('click', closeDlPop);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDlPop();
    });

    function queuePopupAfterFileDialogClose() {
      var shown = false;
      var fallbackTimer = null;

      function cleanup() {
        window.removeEventListener('focus', onFocusReturn);
        document.removeEventListener('visibilitychange', onVisibilityReturn);
        if (fallbackTimer) {
          clearTimeout(fallbackTimer);
          fallbackTimer = null;
        }
      }
      function showOnce() {
        if (shown) return;
        shown = true;
        cleanup();
        openDlPop();
      }
      function tryShow() {
        if (document.visibilityState === 'visible' && document.hasFocus()) {
          setTimeout(showOnce, 150);
        }
      }
      function onFocusReturn() { tryShow(); }
      function onVisibilityReturn() { tryShow(); }

      window.addEventListener('focus', onFocusReturn);
      document.addEventListener('visibilitychange', onVisibilityReturn);
      fallbackTimer = setTimeout(showOnce, 4200);
      tryShow();
    }

    function triggerBlobDownload(blob, filename) {
      var blobUrl = URL.createObjectURL(blob);
      var temp = document.createElement('a');
      temp.href = blobUrl;
      temp.download = filename || 'download.pdf';
      temp.style.display = 'none';
      document.body.appendChild(temp);
      temp.click();
      temp.remove();
      setTimeout(function () { URL.revokeObjectURL(blobUrl); }, 4000);
    }

    function showDownloadError() {
      txt.textContent = 'Download blocked. Run this page via Live Server/localhost.';
      fx.classList.remove('on');
      void fx.offsetWidth;
      fx.classList.add('on');
      setTimeout(function () { fx.classList.remove('on'); }, 5200);
    }

    function startDownload(a) {
      var href = a.getAttribute('data-file') || a.getAttribute('href') || '';
      var name = a.getAttribute('data-name') || a.getAttribute('download') || (href.split('/').pop() || 'download.pdf');
      if (!href) return;

      // XHR blob download is more reliable for local/static files than direct navigation.
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', href, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status === 0 && xhr.response)) {
            triggerBlobDownload(xhr.response, name);
            queuePopupAfterFileDialogClose();
          } else {
            showDownloadError();
          }
        };
        xhr.onerror = function () { showDownloadError(); };
        xhr.send();
      } catch (err) {
        showDownloadError();
      }
    }

    function prepBlast(label) {
      txt.textContent = 'Downloading ' + label + '...';

      particles.forEach(function (paper) {
        var tx = (Math.random() * 2 - 1) * window.innerWidth * 0.52;
        var ty = (Math.random() * 2 - 1) * window.innerHeight * 0.52;
        if (Math.abs(ty) < 80) ty += ty < 0 ? -110 : 110;
        var rot = (Math.random() * 780 - 390).toFixed(0) + 'deg';
        var delay = (Math.random() * 0.16).toFixed(2) + 's';
        var dur = (2.6 + Math.random() * 1.6).toFixed(2) + 's';
        var hue = Math.floor(Math.random() * 360);
        paper.style.setProperty('--tx', tx.toFixed(0) + 'px');
        paper.style.setProperty('--ty', ty.toFixed(0) + 'px');
        paper.style.setProperty('--rot', rot);
        paper.style.setProperty('--delay', delay);
        paper.style.setProperty('--dur', dur);
        paper.style.setProperty('--hue', hue);

        if (paper.classList.contains('dl-paper')) {
          var w = (10 + Math.random() * 12).toFixed(0) + 'px';
          var h = (13 + Math.random() * 15).toFixed(0) + 'px';
          paper.style.setProperty('--w', w);
          paper.style.setProperty('--h', h);
        } else {
          var s = (5 + Math.random() * 8).toFixed(0) + 'px';
          paper.style.setProperty('--size', s);
        }
      });

      fx.classList.remove('on');
      void fx.offsetWidth;
      fx.classList.add('on');
      setTimeout(function () { fx.classList.remove('on'); }, 5200);
    }

    dlLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (isBusy) return;

        isBusy = true;
        var label = /cv/i.test(a.textContent) ? 'CV' : 'Resume';

        if (!reduceMotion) prepBlast(label);
        setTimeout(function () { startDownload(a); }, reduceMotion ? 0 : 280);
        setTimeout(function () { isBusy = false; }, reduceMotion ? 120 : 5300);
      });
    });
  }
})();
