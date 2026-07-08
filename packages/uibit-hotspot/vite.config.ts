import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitHotspot',
      fileName: (format) => `hotspot.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'hotspot.js',
          assetFileNames: 'hotspot[extname]'
        },
        {
          format: 'umd',
          name: 'UIBitHotspot',
          entryFileNames: 'hotspot.umd.js',
          assetFileNames: 'hotspot[extname]',
          globals: { lit: 'lit' }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
