(function () {
  'use strict';

  var header = document.getElementById('header');
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('globalNav');
  var fixedCta = document.getElementById('fixedCta');
  var contact = document.getElementById('contact');

  /* ---------- スマホメニュー開閉 ---------- */
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('is-menu-open', open);
  }

  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- スクロール時のヘッダー影・固定予約ボタン ---------- */
  var contactVisible = false;

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    fixedCta.classList.toggle('is-show', y > window.innerHeight * 0.6 && !contactVisible);
  }

  if ('IntersectionObserver' in window) {
    // 予約セクション表示中は固定ボタンを隠す
    var contactObserver = new IntersectionObserver(function (entries) {
      contactVisible = entries[0].isIntersecting;
      onScroll();
    });
    if (contact) contactObserver.observe(contact);

    /* ---------- フェードイン ---------- */
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.fade-in').forEach(function (el) {
      fadeObserver.observe(el);
    });
    document.documentElement.classList.add('js');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- コピーライト年 ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
