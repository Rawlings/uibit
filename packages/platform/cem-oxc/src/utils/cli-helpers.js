import fs from 'node:fs';
import { resolve, join } from 'node:path';

export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function updatePackageJson(cwd, outdir) {
  try {
    const pkgPath = resolve(cwd, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      pkg.customElements = join(outdir, 'custom-elements.json');
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
  } catch (e) {
    console.error('[cem-oxc] Failed to update package.json:', e);
  }
}
