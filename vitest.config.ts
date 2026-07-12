import { defineConfig, defaultExclude } from 'vitest/config';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import react from '@vitejs/plugin-react';

const componentsDir = resolve(__dirname, 'packages/components');
const platformDir = resolve(__dirname, 'packages/platform');

// Dynamically generate aliases for all packages in components/ and platform/
const componentNames = readdirSync(componentsDir).filter(
  (file) => !file.startsWith('.')
);
const platformNames = readdirSync(platformDir).filter(
  (file) => !file.startsWith('.')
);

const aliases = [
  ...componentNames.map((pkg) => ({
    find: new RegExp(`^@uibit\\/${pkg}$`),
    replacement: resolve(componentsDir, pkg, 'src/index.ts'),
  })),
  ...platformNames.map((pkg) => ({
    find: new RegExp(`^@uibit\\/${pkg}$`),
    replacement: resolve(platformDir, pkg, 'src/index.ts'),
  }))
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: [
      'packages/components/**/*.{test,spec}.{ts,tsx}',
      'packages/platform/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: [...defaultExclude, 'packages/apps/docs/**'],
  },
});
