import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitScrollProgress',
      fileName: (format) => `scroll-progress.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'scroll-progress.js',
          assetFileNames: 'scroll-progress[extname]'
        },
        {
          format: 'umd',
          name: 'UIBitScrollProgress',
          entryFileNames: 'scroll-progress.umd.js',
          assetFileNames: 'scroll-progress[extname]',
          globals: { lit: 'lit' }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
