import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { uibitHmr } from '@uibit/vite-plugin-wc-hmr';
import { resolve } from 'path';
import { readdirSync, existsSync, readFileSync } from 'fs';

const componentsDir = resolve(__dirname, '../../components');
const platformDir = resolve(__dirname, '../../platform');

// Dynamically generate aliases for all workspace components and platform packages
const getWorkspaceAliases = () => {
  const aliases: { find: RegExp; replacement: string }[] = [];
  const scanDirectory = (dirPath: string) => {
    try {
      const dirs = readdirSync(dirPath);
      for (const dir of dirs) {
        const pkgJsonPath = resolve(dirPath, dir, 'package.json');
        const srcIndexPath = resolve(dirPath, dir, 'src/index.ts');

        if (existsSync(pkgJsonPath) && existsSync(srcIndexPath)) {
          const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
          if (pkgJson.name && pkgJson.name.startsWith('@uibit/')) {
            aliases.push({
              find: new RegExp(`^${pkgJson.name.replace('/', '\\/')}$`),
              replacement: srcIndexPath,
            });
          }
        }
      }
    } catch (err) {
      console.error(`Error auto-generating workspace aliases for ${dirPath}:`, err);
    }
  };

  scanDirectory(componentsDir);
  scanDirectory(platformDir);
  return aliases;
};

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/uibit/' : '/',
  css: {
    postcss: null,
  },
  plugins: [
    tailwindcss(),
    react(),
    uibitHmr(),
  ],
  resolve: {
    alias: getWorkspaceAliases(),
  },
  optimizeDeps: {
    exclude: ['@uibit/vite-plugin-wc-hmr'],
    esbuildOptions: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  }
});

