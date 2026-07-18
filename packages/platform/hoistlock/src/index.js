import { createRequire } from 'node:module';
import { platform, arch } from 'node:os';

const require = createRequire(import.meta.url);

let nativeBinding = null;

if (platform() === 'darwin') {
  if (arch() === 'arm64') {
    nativeBinding = require('../hoistlock.darwin-arm64.node');
  } else {
    nativeBinding = require('../hoistlock.darwin-x64.node');
  }
} else if (platform() === 'linux') {
  if (arch() === 'x64') {
    nativeBinding = require('../hoistlock.linux-x64-gnu.node');
  } else {
    throw new Error(`Unsupported linux architecture: ${arch()}`);
  }
} else {
  throw new Error(`Unsupported platform: ${platform()} ${arch()}`);
}

export const { checkHoisting } = nativeBinding;
