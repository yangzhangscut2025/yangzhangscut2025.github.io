/* ============================================================
   Shared — Nav Highlight / Mobile Menu / Scroll-to-Top / Lazy
   ============================================================ */
(function(){
  'use strict';

  /* ---- 1. Current-page nav highlight ---- */
  function highlightNav(){
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll('.nav-link').forEach(a => {
      const linkPage = a.getAttribute('data-nav');
      if (linkPage === page) {
        a.classList.add('text-[var(--primary)]','font-semibold');
      } else {
        a.classList.add('text-[var(--text-soft)]');
      }
    });
  }

  /* ---- 2. Mobile hamburger menu ---- */
  function initMobileMenu(){
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('hidden');
      if (open) {
        mobileMenu.classList.add('hidden');
        hamburger.textContent = '☰';
      } else {
        mobileMenu.classList.remove('hidden');
        hamburger.textContent = '✕';
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburger.textContent = '☰';
      });
    });
  }

  /* ---- 3. Theme popover ---- */
  function initThemePopover(){
    const btn   = document.getElementById('themeToggle');
    const popover = document.getElementById('themePopover');
    if (!btn || !popover) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.classList.toggle('hidden');
    });

    document.addEventListener('click', () => popover.classList.add('hidden'));
    popover.addEventListener('click', (e) => e.stopPropagation());

    // Theme option buttons
    popover.querySelectorAll('.theme-option').forEach(opt => {
      opt.addEventListener('click', () => {
        window.Theme.setTheme(opt.dataset.theme);
        popover.classList.add('hidden');
      });
    });
  }

  /* ---- 4. Mode toggle button ---- */
  function initModeToggle(){
    const btn = document.getElementById('modeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => window.Theme.toggleMode());
  }

  /* ---- 5. Language toggle ---- */
  function initLangToggle(){
    const btn = document.getElementById('langToggle');
    if (!btn) return;
    btn.addEventListener('click', () => window.I18n.toggle());
  }

  /* ---- 6. Scroll-to-top button ---- */
  function initScrollTop(){
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.style.opacity = window.scrollY > 300 ? '1' : '0';
      btn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- 7. Image lazy loading ---- */
  function initLazyImages(){
    const imgs = document.querySelectorAll('img[data-src]');
    if (!imgs.length) return;

    const load = img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    };

    if ('loading' in HTMLImageElement.prototype) {
      imgs.forEach(load);
      return;
    }
    // Fallback: IntersectionObserver, else load everything
    if (!('IntersectionObserver' in window)) {
      imgs.forEach(load);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          load(e.target);
          observer.unobserve(e.target);
        }
      });
    });
    imgs.forEach(img => observer.observe(img));
  }

  /* ---- 8. External links → new tab ---- */
  function initExternalLinks(){
    document.querySelectorAll('a[href^="http"]').forEach(a => {
      if (!a.hostname.includes('github.io') && !a.hostname.includes('localhost')) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /* ---- 9. Scroll reveal (below-the-fold only, so nothing flashes) ---- */
  function initReveal(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = document.querySelectorAll('article[data-category], .grid > .group, [data-reveal]');
    if (!els.length) return;

    const vh = window.innerHeight || document.documentElement.clientHeight;
    const targets = [];

    els.forEach(el => {
      // Already on screen at load → leave it alone (no flash, no re-animation)
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      el.classList.add('reveal');
      const idx = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.transitionDelay = Math.min(idx, 8) * 55 + 'ms';
      targets.push(el);
    });

    if (!targets.length) return;

    // No IntersectionObserver → just show everything
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => { el.classList.remove('reveal'); el.style.transitionDelay = ''; });
      return;
    }

    const cleanup = el => {
      el.classList.add('is-visible');
      io.unobserve(el);
      // Drop the animation classes/delay afterwards so hover transitions stay snappy
      setTimeout(() => {
        el.classList.remove('reveal', 'is-visible');
        el.style.transitionDelay = '';
      }, 1200);
    };

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) cleanup(e.target); });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => io.observe(el));
  }

    /* ---- 0. Render navigation bar ---- */
  function renderNav(){
    const container = document.getElementById('navbar');
    if (!container) return;
    if (container.children.length > 0) return; // already rendered

    const links = [
      { href: '/',          nav: 'home',    label: '首页' },
      { href: '/about/',    nav: 'about',   label: '关于我' },
      { href: '/resume/',   nav: 'resume',  label: '简历' },
      { href: '/works/',    nav: 'works',   label: '作品集' },
      { href: '/blog/',     nav: 'blog',    label: '博客' },
      { href: '/contact/',  nav: 'contact', label: '联系我' },
    ];

    var navHtml = '<nav class="nav-bg fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[var(--border)]">' +
      '<div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">' +
      '<a href="/" class="text-lg font-bold text-[var(--text)] hover:text-[var(--primary)] transition-colors">Kyra</a>' +
      '<div class="hidden md:flex items-center gap-6 text-sm font-medium">';

    links.forEach(function(l) {
      navHtml += '<a href="' + l.href + '" class="nav-link" data-nav="' + l.nav + '" data-i18n="nav.' + l.nav + '">' + l.label + '</a>';
    });

    navHtml += '</div>' +
      '<div class="flex items-center gap-3 text-sm">' +
      '<button id="langToggle" class="px-2 py-1 rounded-md border border-[var(--border)] text-[var(--text-soft)] hover:text-[var(--text)] bg-[var(--card)] text-xs font-medium" data-i18n="lang.label">EN</button>' +
      '<button id="modeToggle" class="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-soft)]" aria-label="Toggle dark mode">\uD83C\uDF19</button>' +
      '<div class="relative">' +
      '<button id="themeToggle" class="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-soft)]" aria-label="Switch theme">\uD83C\uDFA8</button>' +
      '<div id="themePopover" class="theme-popover hidden absolute right-0 top-10 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-md p-3 z-50" style="min-width:160px">' +
      '<button class="theme-option block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-[var(--hover)] mb-1" data-theme="green-purple">\uD83D\uDFE2\uD83D\uDFE3 \u7EFF\u7D2B</button>' +
      '<button class="theme-option block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-[var(--hover)]" data-theme="blue-yellow">\uD83D\uDD35\uD83D\uDFE1 \u84DD\u9EC4</button>' +
      '</div></div>' +
      '<button id="hamburger" class="md:hidden text-xl text-[var(--text)]">\u2630</button>' +
      '</div></div>' +
      '<div id="mobileMenu" class="hidden md:hidden border-t border-[var(--border)] bg-[var(--card)] px-6 py-3 space-y-2">';

    links.forEach(function(l) {
      navHtml += '<a href="' + l.href + '" class="block py-2 nav-link" data-nav="' + l.nav + '" data-i18n="nav.' + l.nav + '">' + l.label + '</a>';
    });

    navHtml += '</div></nav>';

    container.innerHTML = navHtml;
  }

  /* ---- 0b. Render footer ---- */
  function renderFooter(){
    const container = document.getElementById('footer');
    if (!container) return;
    if (container.children.length > 0) return; // already rendered

    const year = new Date().getFullYear();
    container.innerHTML =
      '<footer class="border-t border-[var(--border)] mt-16">' +
      '<div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--text-soft)]">' +
      '<p>\u00A9 ' + year + ' Kyra \u00B7 <span data-i18n="footer.rights">\u4FDD\u7559\u6240\u6709\u6743\u5229</span></p>' +
      '<div class="flex items-center gap-5">' +
      '<a href="https://github.com/yangzhangscut2025" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--primary)] transition-colors">GitHub</a>' +
      '<a href="mailto:zy13819041939@qq.com" class="hover:text-[var(--primary)] transition-colors" data-i18n="contact.email">\u90AE\u7BB1</a>' +
      '</div></div></footer>';
  }

  /* ---- Boot ---- */
  function boot(){
    renderNav();
    renderFooter();
    highlightNav();
    initMobileMenu();
    initThemePopover();
    initModeToggle();
    initLangToggle();
    initScrollTop();
    initLazyImages();
    initExternalLinks();
    initReveal();
    if (window.I18n) window.I18n.init();
    if (window.Theme) window.Theme._updateUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
