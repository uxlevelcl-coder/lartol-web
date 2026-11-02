import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://uxlevelcl-coder.github.io',
  base: '/lartol-web',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
