import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitCarousel',
      fileName: (format) => `carousel.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'carousel.js',
          assetFileNames: 'carousel[extname]'
        },
        {
          format: 'umd',
          name: 'UIBitCarousel',
          entryFileNames: 'carousel.umd.js',
          assetFileNames: 'carousel[extname]',
          globals: {
            lit: 'lit'
          }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
