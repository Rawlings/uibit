import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitCore',
      fileName: (format) => `core.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'core.js'
        },
        {
          format: 'umd',
          name: 'UIBitCore',
          entryFileNames: 'core.umd.js',
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
