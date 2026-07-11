import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { readdirSync, existsSync, readFileSync } from 'fs';

const packagesDir = resolve(__dirname, '..');

// Dynamically generate aliases for all workspace components under packages/
const getWorkspaceAliases = () => {
  const aliases: { find: RegExp; replacement: string }[] = [];
  try {
    const dirs = readdirSync(packagesDir);
    for (const dir of dirs) {
      if (dir === 'docs' || dir === 'codegen') continue;
      const pkgJsonPath = resolve(packagesDir, dir, 'package.json');
      const srcIndexPath = resolve(packagesDir, dir, 'src/index.ts');

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
    console.error('Error auto-generating workspace aliases:', err);
  }
  return aliases;
};

function watchComponentPackages(): Plugin {
  let timeout: NodeJS.Timeout | null = null;
  return {
    name: 'watch-component-packages',
    configureServer(server) {
      server.watcher.add(resolve(packagesDir, '*/src/**'));
      server.watcher.on('change', (file) => {
        // Filter changes to source files that affect browser runtime
        // and ignore tests or test outputs.
        if (
          file.includes('/packages/') &&
          !file.includes('/packages/docs/') &&
          /\.(ts|tsx|css|json)$/.test(file) &&
          !file.endsWith('.test.ts') &&
          !file.endsWith('.spec.ts')
        ) {
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            server.ws.send({ type: 'full-reload' });
          }, 150);
        }
      });
    },
  };
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/uibit/' : '/',
  css: {
    postcss: null,
  },
  plugins: [tailwindcss(), react(), watchComponentPackages()],
  resolve: {
    alias: getWorkspaceAliases(),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  }
});

