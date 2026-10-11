document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // ---- Scroll-reveal for gallery images, tiles and text blocks ----
  document.querySelectorAll('.section-head, .cell:not(.cell-img), .split > *').forEach(function (el) {
    el.classList.add('reveal');
  });
  var targets = document.querySelectorAll('.gallery figure, .cell-img, .reveal');
  // stagger: delay by position within the parent grid (capped)
  var counters = new Map();
  targets.forEach(function (el) {
    var p = el.parentElement;
    var i = counters.get(p) || 0;
    counters.set(p, i + 1);
    el.style.setProperty('--d', Math.min(i, 5) * 110 + 'ms');
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Lightbox ----
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lightbox-cap');
    var closeBtn = lb.querySelector('.lightbox-close');
    document.querySelectorAll('[data-lightbox]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var img = el.querySelector('img');
        if (!img) return;
        e.preventDefault();
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        lbCap.textContent = img.alt || '';
        lb.classList.add('open');
      });
    });
    var close = function () { lb.classList.remove('open'); lbImg.src = ''; };
    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
});
