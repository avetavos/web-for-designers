// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/web-for-designers',
  output: 'static',
  integrations: [starlight({
      title: 'Web for Designers',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/web-for-designers/enhance.js' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/web-for-designers/manifest.webmanifest' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/web-for-designers/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/web-for-designers/icon-192.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#e8649b' } },
        { tag: 'meta', attrs: { name: 'mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: "Web for Designers" } },
        { tag: 'script', content: "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/web-for-designers/sw.js',{scope:'/web-for-designers/'}).catch(function(){})})}" },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/web-for-designers' }],
      sidebar: [
        { label: 'How the Web Works', items: [{ autogenerate: { directory: 'how-web-works' } }] },
        { label: 'HTML — Structure & Content', items: [{ autogenerate: { directory: 'html' } }] },
        { label: 'CSS — Styling Basics', items: [{ autogenerate: { directory: 'css' } }] },
        { label: 'CSS Layout — Flexbox & Grid', items: [{ autogenerate: { directory: 'layout' } }] },
        { label: 'Responsive Design', items: [{ autogenerate: { directory: 'responsive' } }] },
        { label: 'A Little JavaScript', items: [{ autogenerate: { directory: 'javascript' } }] },
        { label: 'Design-to-Code Workflow', items: [{ autogenerate: { directory: 'workflow' } }] },
      ],
      }), preact()],
});