import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitConsentGuard',
      fileName: (format) => `consent-guard.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'consent-guard.js',
          assetFileNames: 'consent-guard[extname]'
        },
        {
          format: 'umd',
          name: 'UIBitConsentGuard',
          entryFileNames: 'consent-guard.umd.js',
          assetFileNames: 'consent-guard[extname]',
          globals: { lit: 'lit' }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
