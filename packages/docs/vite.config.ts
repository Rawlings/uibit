import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/uibit/' : '/',
  css: {
    postcss: null,
  },
  plugins: [tailwindcss(), react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: [
        '@uibit/carousel',
        '@uibit/360-viewer',
        '@uibit/scroll-progress',
        '@uibit/hotspot',
        '@uibit/consent-guard',
        '@uibit/ab-test',
        '@uibit/countdown',
        '@uibit/scratch-reveal'
      ]
    }
  }
});
