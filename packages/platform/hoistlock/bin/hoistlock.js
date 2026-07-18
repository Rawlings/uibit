#!/usr/bin/env node
import fs from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const argv = process.argv.slice(2);
  const cwd = process.cwd();

  // Try running compiled native binary
  const binPath = resolve(__dirname, 'hoistlock-bin');
  const localBinPath = resolve(__dirname, '../target/release/hoistlock-bin');
  const targetBin = fs.existsSync(binPath) ? binPath : (fs.existsSync(localBinPath) ? localBinPath : null);

  if (targetBin) {
    try {
      execFileSync(targetBin, argv, { stdio: 'inherit', cwd });
      return;
    } catch (e) {
      process.exit(e.status || 1);
    }
  }

  // Fallback to JS execution using NAPI bindings
  const { checkHoisting } = await import('../src/index.js');
  const cmd = argv[0] || 'check';

  if (cmd === 'init') {
    const configPath = resolve(cwd, 'hoistlock.json');
    if (fs.existsSync(configPath)) {
      console.log('hoistlock.json already exists!');
      return;
    }
    const defaultConfig = {
      entry: './src/main.tsx',
      tsconfig: './tsconfig.json',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.spec.*',
        '**/*.test.*'
      ]
    };
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    console.log('Created hoistlock.json with default configurations.');
  } else if (cmd === 'check') {
    const configPath = resolve(cwd, 'hoistlock.json');
    let config = {
      entry: './src/main.tsx',
      tsconfig: './tsconfig.json'
    };
    if (fs.existsSync(configPath)) {
      try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      } catch (e) {}
    }
    console.log(`[hoistlock] Auditing bundle paths starting from entry: ${config.entry}...`);
    try {
      const leaks = checkHoisting(config);
      if (leaks.length === 0) {
        console.log('\x1b[32m[hoistlock] Pass: No bundle hoisting regressions detected.\x1b[0m');
        process.exit(0);
      } else {
        console.error('\x1b[31m[hoistlock] Fail: Accidental bundle hoisting detected! Git commit blocked.\x1b[0m');
        for (const leak of leaks) {
          console.error(`  - File: ${leak.filePath}\n    Imported as: ${leak.importPath}\n    Required by dynamic chunk entry: ${leak.dynamicChunkEntry}\n`);
        }
        process.exit(1);
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  } else {
    console.error(`Unknown command: ${cmd}`);
    console.error('Available commands: init, check');
    process.exit(1);
  }
}

main();
