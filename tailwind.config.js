/** @type {import('tailwindcss').Config} */
/* ------------------------------------------------------------------
   Tailwind build config for this site.

   The site previously loaded Tailwind from the Play CDN
   (https://cdn.tailwindcss.com), which ships ~120 KB of JS and
   generates CSS in the browser on every page load. We now ship a
   prebuilt, purged stylesheet instead (~19 KB, ~4.4 KB gzipped).

   Rebuild after editing any HTML/JS class names:

     npx tailwindcss@3.4.17 \
       -c tailwind.config.js \
       -i assets/css/tailwind.src.css \
       -o assets/css/tailwind.min.css --minify

   NOTE: keep the version pinned to 3.4.x — the markup uses v3 syntax.
   ------------------------------------------------------------------ */
module.exports = {
  content: [
    './**/*.html',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        bg: 'var(--bg)',
        card: 'var(--card)',
        text: 'var(--text)',
        'text-soft': 'var(--text-soft)',
        border: 'var(--border)',
        hover: 'var(--hover)',
      },
      borderRadius: { DEFAULT: '8px' },
      fontFamily: { sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
