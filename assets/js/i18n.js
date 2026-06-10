/* ============================================================
   i18n — Chinese / English Toggle + localStorage
   ============================================================ */
(function(){
  'use strict';

  const LANG_KEY = 'site-lang';  // 'zh' | 'en'
  const saved    = localStorage.getItem(LANG_KEY) || 'zh';

  /* ---- Shared translation dictionary ---- */
  const dict = {
        zh: {
      'nav.home':    '首页',
      'nav.about':   '关于我',
      'nav.resume':  '简历',
      'nav.works':   '作品集',
      'nav.blog':    '博客',
      'nav.contact': '联系我',
      'lang.label':  'EN',
      'lang.switch': '切换英文',
      'mode.light':  '浅色模式',
      'mode.dark':   '深色模式',
      'theme.switch':'主题切换',
      'theme.gp':    '绿紫配色',
      'theme.by':    '蓝黄配色',
      'back.top':    '回到顶部',
      'menu.open':   '打开菜单',
      'menu.close':  '关闭菜单',
      '404.title':   '页面未找到',
      '404.desc':    '您访问的页面不存在或已被移走。',
      '404.back':    '返回首页',
      'hero.role':   '工业工程 | 数据分析 | 运筹优化 | 数学建模',
      'hero.bio':    '华南理工大学工业工程与管理在读硕士，主攻运筹优化与数据分析。在校参与多项学科竞赛与两段实习，熟悉Python、Gurobi等常用工具。日常记录学习笔记，沉淀项目实践心得。',
      'hero.cta':    '查看简历',
      'home.works':  '作品一览',
      'home.allworks':'查看全部作品 →',
      'about.title': '关于我',
      'about.exp':   '经历',
      'about.hobby': '爱好',
      'works.title': '作品集',
      'works.subtitle':'精选项目与作品展示',
      'works.back':  '← 返回作品集列表',
      'works.detail.intro':'项目介绍',
      'works.detail.results':'量化成果',
      'works.noDemo':'暂无 Demo',
      'works.viewDetail':'查看详情',
      'works.demo':'在线 Demo',
      'blog.title':  '博客',
      'blog.category':'分类',
      'blog.cat1':'数据分析',
      'blog.cat2':'专业知识',
      'blog.cat3':'运筹优化',
      'blog.cat4':'数学建模',
      'blog.cat5':'数据挖掘',
      'blog.readTime':'预计阅读',
      'blog.minutes':'分钟',
      'blog.back':'← 返回博客首页',
      'contact.title':'联系我',
      'contact.desc':'欢迎交流算法、数据分析、学习与求职相关问题。',
      'contact.email':'邮箱',
      'contact.github':'GitHub',
    },
    en: {
      'nav.home':    'Home',
      'nav.about':   'About',
      'nav.resume':  'Resume',
      'nav.works':   'Works',
      'nav.blog':    'Blog',
      'nav.contact': 'Contact',
      'lang.label':  '中文',
      'lang.switch': 'Switch to Chinese',
      'mode.light':  'Light Mode',
      'mode.dark':   'Dark Mode',
      'theme.switch':'Theme',
      'theme.gp':    'Green-Purple',
      'theme.by':    'Blue-Yellow',
      'back.top':    'Back to Top',
      'menu.open':   'Open Menu',
      'menu.close':  'Close Menu',
      '404.title':   'Page Not Found',
      '404.desc':    'The page you are looking for does not exist or has been moved.',
      '404.back':    'Back to Home',
      'hero.role':   'IE | Data Analysis | OR | Mathematical Modeling',
      'hero.bio':    'Master student at SCUT, major in IE&M, focusing on OR and data analysis. Participated in several competitions and internships, familiar with Python, Gurobi. Document study notes and project experience regularly.',
      'hero.cta':    'View Resume',
      'home.works':  'Works',
      'home.allworks':'View All Works →',
      'about.title': 'About Me',
      'about.exp':   'Experience',
      'about.hobby': 'Hobbies',
      'works.title': 'Works',
      'works.subtitle':'Selected projects and works',
      'works.back':  '← Back to Works',
      'works.detail.intro':'Introduction',
      'works.detail.results':'Results',
      'works.noDemo':'No Demo',
      'works.viewDetail':'Details',
      'works.demo':'Live Demo',
      'blog.title':  'Blog',
      'blog.category':'Categories',
      'blog.cat1':'Data Analysis',
      'blog.cat2':'Major Knowledge',
      'blog.cat3':'OR',
      'blog.cat4':'Math Modeling',
      'blog.cat5':'Data Mining',
      'blog.readTime':'Read time',
      'blog.minutes':'min',
      'blog.back':'← Back to Blog',
      'contact.title':'Contact',
      'contact.desc':'Feel free to reach out about algorithms, data analysis, and job consultation.',
      'contact.email':'Email',
      'contact.github':'GitHub',
    },

  /* ---- Apply translations ---- */
  function apply(lang){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[lang] && dict[lang][key]) {
        el.textContent = dict[lang][key];
      }
    });
    // aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[lang] && dict[lang][key]) {
        el.setAttribute('aria-label', dict[lang][key]);
      }
    });
    // Update lang toggle button text
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = dict[lang]['lang.label'] || (lang==='zh'?'EN':'中文');
  }

  /* ---- Public API ---- */
  window.I18n = {
    get lang(){ return localStorage.getItem(LANG_KEY) || 'zh'; },

    t(key){
      const l = this.lang;
      return (dict[l] && dict[l][key]) ? dict[l][key] : key;
    },

    toggle(){
      const next = this.lang === 'zh' ? 'en' : 'zh';
      localStorage.setItem(LANG_KEY, next);
      apply(next);
      // Dispatch so page-specific scripts can react
      window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: next } }));
    },

    setLang(l){
      localStorage.setItem(LANG_KEY, l);
      apply(l);
      window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
    },

    /** Call once on page load */
    init(){ apply(this.lang); }
  };

})();
