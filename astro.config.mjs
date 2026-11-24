// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // ⚠️ Cambia esta URL por tu dominio final de Netlify (necesaria para Open Graph absoluto)
  site: 'https://andres-cantuna-portfolio.netlify.app',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
