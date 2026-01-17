import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://algorythm.dev',
  i18n: {
    locales: ['en', 'mr', 'gu', 'hi'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
