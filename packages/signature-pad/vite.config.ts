import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIBitSignaturePad',
      fileName: (format) => `signature-pad.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['lit'],
      output: [
        {
          format: 'es',
          entryFileNames: 'signature-pad.js',
          assetFileNames: 'signature-pad[extname]'
        },
        {
          format: 'umd',
          name: 'UIBitSignaturePad',
          entryFileNames: 'signature-pad.umd.js',
          assetFileNames: 'signature-pad[extname]',
          globals: { lit: 'lit' }
        }
      ]
    },
    outDir: 'dist',
    sourcemap: true
  }
});
