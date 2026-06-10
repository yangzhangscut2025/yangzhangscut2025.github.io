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
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
      return;
    }
    // Fallback for older browsers
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
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

  /* ---- Boot ---- */
  function boot(){
    highlightNav();
    initMobileMenu();
    initThemePopover();
    initModeToggle();
    initLangToggle();
    initScrollTop();
    initLazyImages();
    initExternalLinks();
    if (window.I18n) window.I18n.init();
    if (window.Theme) window.Theme._updateUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
