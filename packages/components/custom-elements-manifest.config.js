import uibitCemExtended from '../platform/cem-extended/dist/index.js';

export default {
  globs: ['src/**/*.ts', '../../platform/core/src/element.ts'],
  exclude: ['**/*.test.ts', 'dist', 'node_modules'],
  litelement: true,
  plugins: [
    uibitCemExtended()
  ]
};
