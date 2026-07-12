import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
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

function watchComponentPackages(): Plugin {
  let timeout: NodeJS.Timeout | null = null;
  return {
    name: 'watch-component-packages',
    configureServer(server) {
      server.watcher.add(resolve(componentsDir, '*/src/**'));
      server.watcher.add(resolve(platformDir, '*/src/**'));
      server.watcher.on('change', (file) => {
        // Filter changes to source files that affect browser runtime
        // and ignore tests or test outputs.
        if (
          (file.includes('/packages/components/') || file.includes('/packages/platform/')) &&
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react') || id.includes('lucide')) {
              return 'vendor-lucide';
            }
            return 'vendor-others';
          }
        }
      }
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  }
});

