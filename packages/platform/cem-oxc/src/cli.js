import { parseArgs } from 'node:util';
import { globSync } from 'node:fs';
import { watch } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import fs from 'node:fs';
import { create } from './create.js';
import { debounce, updatePackageJson } from './utils/cli-helpers.js';

export async function cli(argv = process.argv.slice(2), cwd = process.cwd()) {
  const { values: args } = parseArgs({
    args: argv,
    options: {
      config: { type: 'string' },
      globs: { type: 'string', multiple: true },
      exclude: { type: 'string', multiple: true },
      outdir: { type: 'string', default: '.' },
      watch: { type: 'boolean' },
      quiet: { type: 'boolean' },
      dev: { type: 'boolean' },
      packagejson: { type: 'boolean', default: true },
    },
    strict: false,
  });

  const configPath = args.config ? resolve(cwd, args.config) : resolve(cwd, 'custom-elements-manifest.config.js');
  let userConfig = {};

  if (fs.existsSync(configPath)) {
    try {
      const module = await import(configPath);
      userConfig = module.default || {};
    } catch (e) {
      if (args.dev) console.error('Failed to load user config:', e);
    }
  }

  const globs = args.globs || userConfig.globs || ['**/*.{js,ts}'];
  const exclude = args.exclude || userConfig.exclude || ['**/node_modules/**', '**/dist/**', '**/build/**'];
  const outdir = args.outdir || userConfig.outdir || '.';
  const dev = args.dev || userConfig.dev || false;
  const quiet = args.quiet || userConfig.quiet || false;
  const packagejson = args.packagejson !== undefined ? args.packagejson : (userConfig.packagejson !== undefined ? userConfig.packagejson : true);

  async function run() {
    const files = [];
    for (const pattern of globs) {
      const matched = globSync(pattern, { cwd, ignore: exclude });
      files.push(...matched);
    }

    const uniqueFiles = Array.from(new Set(files)).map(f => resolve(cwd, f));

    if (dev) {
      console.log(`[cem-oxc] Found ${uniqueFiles.length} files to scan.`);
    }

    const customElementsManifest = create({
      files: uniqueFiles,
      plugins: userConfig.plugins || [],
      context: { dev },
    });

    const outputDir = resolve(cwd, outdir);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      join(outputDir, 'custom-elements.json'),
      JSON.stringify(customElementsManifest, null, 2) + '\n'
    );

    if (!quiet) {
      console.log(`[cem-oxc] Created Custom Elements Manifest in ${outdir}/custom-elements.json`);
    }

    if (packagejson) {
      updatePackageJson(cwd, outdir);
    }

    return customElementsManifest;
  }

  await run();

  if (args.watch) {
    if (!quiet) {
      console.log('[cem-oxc] Watching for file changes...');
    }
    const debouncedRun = debounce(run, 150);
    try {
      const watcher = watch(cwd, { recursive: true });
      for await (const event of watcher) {
        if (event.filename && (event.filename.endsWith('.js') || event.filename.endsWith('.ts'))) {
          const fullPath = resolve(cwd, event.filename);
          const isExcluded = exclude.some(ex => {
            const regex = new RegExp(ex.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
            return regex.test(fullPath);
          });
          if (!isExcluded) {
            debouncedRun();
          }
        }
      }
    } catch (e) {
      console.error('Watch error:', e);
    }
  }
}
