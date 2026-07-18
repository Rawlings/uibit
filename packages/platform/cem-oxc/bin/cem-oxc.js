#!/usr/bin/env node
import fs from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const argv = process.argv.slice(2);
  const cwd = process.cwd();

  // Find custom config path if provided
  let configPath = resolve(cwd, 'custom-elements-manifest.config.js');
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--config' && argv[i + 1]) {
      configPath = resolve(cwd, argv[i + 1]);
      break;
    }
  }

  let hasJsPlugins = false;
  if (fs.existsSync(configPath)) {
    try {
      const module = await import(configPath);
      const userConfig = module.default || {};
      if (
        userConfig.plugins &&
        Array.isArray(userConfig.plugins) &&
        userConfig.plugins.length > 0
      ) {
        hasJsPlugins = true;
      }
    } catch (_e) {}
  }

  if (!hasJsPlugins) {
    const binPath = resolve(__dirname, '../target/release/cem-oxc-bin');
    if (fs.existsSync(binPath)) {
      try {
        execFileSync(binPath, argv, { stdio: 'inherit', cwd });
        return;
      } catch (_e) {
        // Fallback to JS wrapper if executing native binary fails
      }
    }
  }

  // Fallback to JavaScript Hybrid execution path
  const { cli } = await import('../src/cli.js');
  cli();
}

main();
