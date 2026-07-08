import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBit360Viewer',
      fileName: (format) => `360-viewer.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: '360-viewer.js',
          assetFileNames: '360-viewer[extname]'
        },
        {
          format: 'umd',
          name: 'UIBit360Viewer',
          entryFileNames: '360-viewer.umd.js',
          assetFileNames: '360-viewer[extname]',
          globals: { lit: 'lit' }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
