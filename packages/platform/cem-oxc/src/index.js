import { createRequire } from 'node:module';
import { platform, arch } from 'node:os';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));

let nativeBinding = null;

// Require the compiled binary from the parent directory
if (platform() === 'darwin') {
  if (arch() === 'arm64') {
    nativeBinding = require('../cem-oxc.darwin-arm64.node');
  } else {
    nativeBinding = require('../cem-oxc.darwin-x64.node');
  }
} else if (platform() === 'linux') {
  if (arch() === 'x64') {
    nativeBinding = require('../cem-oxc.linux-x64-gnu.node');
  } else {
    throw new Error(`Unsupported linux architecture: ${arch()}`);
  }
} else {
  throw new Error(`Unsupported platform: ${platform()} ${arch()}`);
}

export const { analyzeSource } = nativeBinding;
export { create } from './create.js';
export { cli } from './cli.js';
