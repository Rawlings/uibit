import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitABTest',
      fileName: (format) => `ab-test.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'ab-test.js',
          assetFileNames: 'ab-test[extname]'
        },
        {
          format: 'umd',
          name: 'UIBitABTest',
          entryFileNames: 'ab-test.umd.js',
          assetFileNames: 'ab-test[extname]',
          globals: { lit: 'lit' }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
