import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitScratchReveal',
      fileName: (format) => `scratch-reveal.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'scratch-reveal.js',
          assetFileNames: 'scratch-reveal[extname]'
        },
        {
          format: 'umd',
          name: 'UIBitScratchReveal',
          entryFileNames: 'scratch-reveal.umd.js',
          assetFileNames: 'scratch-reveal[extname]',
          globals: { lit: 'lit' }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
