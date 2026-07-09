import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import react from '@vitejs/plugin-react';

const packagesDir = resolve(__dirname, 'packages');

// Dynamically generate aliases for all packages in the monorepo
const packageNames = readdirSync(packagesDir).filter(
  (file) => !file.startsWith('.') && file !== 'docs'
);

const aliases = packageNames.map((pkg) => ({
  find: new RegExp(`^@uibit\\/${pkg}$`),
  replacement: resolve(packagesDir, pkg, 'src/index.ts'),
}));

// Also map @uibit/core core decorators and utilities
aliases.push({
  find: /^@uibit\/core$/,
  replacement: resolve(packagesDir, 'core', 'src/index.ts'),
});

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['packages/**/*.{test,spec}.{ts,tsx}'],
  },
});
