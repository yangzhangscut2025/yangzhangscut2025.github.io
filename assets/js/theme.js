/* ============================================================
   Theme — Dual Color Theme + Dark/Light Mode + localStorage
   ============================================================ */
(function(){
  'use strict';

  const THEME_KEY  = 'site-theme';   // 'green-purple' | 'blue-yellow'
  const MODE_KEY   = 'site-mode';    // 'light' | 'dark'
  const html       = document.documentElement;

  /* ---- Read stored preferences ---- */
  const savedTheme = localStorage.getItem(THEME_KEY) || 'green-purple';
  const savedMode  = localStorage.getItem(MODE_KEY)  || 'light';

  /* ---- Apply on load ---- */
  html.setAttribute('data-theme', savedTheme);
  html.setAttribute('data-mode',  savedMode);

  /* ---- API ---- */
  window.Theme = {

    get theme(){ return html.getAttribute('data-theme'); },
    get mode(){  return html.getAttribute('data-mode'); },

    /** Switch color theme */
    setTheme(t){
      html.setAttribute('data-theme', t);
      localStorage.setItem(THEME_KEY, t);
      Theme._updateUI();
    },

    /** Toggle light/dark */
    toggleMode(){
      const next = html.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-mode', next);
      localStorage.setItem(MODE_KEY, next);
      Theme._updateUI();
    },

    /** Set a specific mode */
    setMode(m){
      html.setAttribute('data-mode', m);
      localStorage.setItem(MODE_KEY, m);
      Theme._updateUI();
    },

    /** Sync button icons after any change */
    _updateUI(){
      const modeBtn  = document.getElementById('modeToggle');
      const themeBtns = document.querySelectorAll('.theme-option');

      if (modeBtn) {
        const isDark = html.getAttribute('data-mode') === 'dark';
        modeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      }

      if (themeBtns.length) {
        const cur = html.getAttribute('data-theme');
        themeBtns.forEach(b => {
          b.classList.toggle('ring-2', b.dataset.theme === cur);
          b.classList.toggle('ring-primary', b.dataset.theme === cur);
        });
      }
    }
  };

})();
