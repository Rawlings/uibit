import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitCountdown',
      fileName: (format) => `countdown.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'countdown.js',
          assetFileNames: 'countdown[extname]'
        },
        {
          format: 'umd',
          name: 'UIBitCountdown',
          entryFileNames: 'countdown.umd.js',
          assetFileNames: 'countdown[extname]',
          globals: { lit: 'lit' }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
