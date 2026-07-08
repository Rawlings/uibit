import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

const packagesDir = resolve(__dirname, '..');

function watchComponentPackages(): Plugin {
  return {
    name: 'watch-component-packages',
    configureServer(server) {
      server.watcher.add(resolve(packagesDir, '*/src/**'));
      server.watcher.on('change', (file) => {
        if (file.includes('/packages/') && !file.includes('/packages/docs/')) {
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/uibit/' : '/',
  css: {
    postcss: null,
  },
  plugins: [tailwindcss(), react(), watchComponentPackages()],
  resolve: {
    alias: [
      '@uibit/360-viewer',
      '@uibit/ab-test',
      '@uibit/carousel',
      '@uibit/consent-guard',
      '@uibit/core',
      '@uibit/countdown',
      '@uibit/hotspot',
      '@uibit/scratch-reveal',
      '@uibit/scroll-progress',
      '@uibit/signature-pad',
    ].map((pkg) => ({
      find: new RegExp(`^${pkg.replace('/', '\\/')}$`),
      replacement: resolve(packagesDir, pkg.replace('@uibit/', ''), 'src/index.ts'),
    })),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});
