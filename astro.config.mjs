// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://marcelofernandes.dev.br',
  // "preserve" mantém as URLs antigas: ia.astro -> /ia.html, blog/index.astro -> /blog/
  build: {
    format: 'preserve',
    inlineStylesheets: 'always',
    assets: 'assets',
  },
  trailingSlash: 'ignore',
  compressHTML: true,
  devToolbar: { enabled: false },
});
