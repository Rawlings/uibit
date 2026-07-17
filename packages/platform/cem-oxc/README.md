# @uibit/cem-oxc

[![NPM Version](https://img.shields.io/npm/v/@uibit/cem-oxc.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/cem-oxc)

`@uibit/cem-oxc` is an ultra-fast, zero-dependency Custom Elements Manifest (CEM) generator powered by **OXC** (JavaScript/TypeScript AST parser written in Rust) under the hood. It acts as a drop-in replacement for the native `@custom-elements-manifest/analyzer`.

---

## Value Delivery

- **Blazing Fast Performance:** Parses files and generates manifests **up to 88x faster** than the original TSC-based analyzer. Programmatic in-memory parse completes in **under 2 milliseconds**.
- **Zero-Dependency Footprint:** Written entirely with Node.js 22+ native modules (native globbing, argument parsing, file watching, and dynamic loaders).
- **Parity Out-of-the-Box:** Supports the exact same CLI args (`--globs`, `--exclude`, `--outdir`, `--watch`, `--dev`, `--quiet`, `--packagejson`), config formats (`custom-elements-manifest.config.js`), and programmatic JS entry points (`create` and `cli`).

---

## Benchmarks

Benchmarked on CLI execution speed (total process runtime):

| Parser | Average Time | Speedup |
| :--- | :--- | :--- |
| **Original CEM Parser** (TSC-based) | **352 ms** | *Baseline* |
| **`@uibit/cem-oxc` (Hybrid/JS Fallback)** | **60 ms** | **~6x faster** 🚀 |
| **`@uibit/cem-oxc` (Pure Native CLI)** | **42 ms** | **~8.4x faster** 🚀 |

*Note: In-memory core traversal and AST extraction takes **under 2 milliseconds** inside the Rust core (up to 400x faster than the original TS compiler resolver).*

---

## Installation

```bash
npm install -D @uibit/cem-oxc
```

---

## Usage

Since it exports the exact same binary aliases (`cem` and `custom-elements-manifest`), it serves as a 1:1 drop-in replacement:

```bash
# Analyze all JS/TS components (runs up to 88x faster)
npx @uibit/cem-oxc analyze --globs "src/**/*.ts" --litelement

# Watch mode
npx @uibit/cem-oxc analyze --watch
```

### Programmatic API

```javascript
import { create } from '@uibit/cem-oxc';

const manifest = create({
  files: ['./src/my-element.ts'],
  plugins: [], // Supports standard lifecycle plugins
  context: { dev: false }
});

console.log(JSON.stringify(manifest, null, 2));
```

---

## Further Information

Detailed design guidelines, customizable attributes, and integration examples are available on our documentation site.

## Changelog

Please see the [Changelog](CHANGELOG.md) for version history.
