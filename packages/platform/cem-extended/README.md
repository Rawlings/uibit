# @uibit/cem-extended

[![NPM Version](https://img.shields.io/npm/v/@uibit/cem-extended.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/cem-extended)

## Resources

- **[Documentation & Guides](https://rawlings.github.io/uibit/tooling/cem-extended)**
- **[NPM Package](https://www.npmjs.com/package/@uibit/cem-extended)**
- **[GitHub Source Code](https://github.com/rawlings/uibit/tree/main/packages/platform/cem-extended)**

A custom Custom Elements Manifest (CEM) Analyzer plugin that extends the standard analyzer to extract undocumented public APIs and custom JSDoc metadata.

## Features

- **Lifecycle and Reference Metadata:** Captures `@deprecated`, `@since`, and `@see` annotations.
- **Parameter & Return Documentation:** Extracts parameter and return descriptions for custom element class methods.
- **CSS State Extraction:** Parses `@cssstate` JSDoc annotations to document custom element states.

## Supported JSDoc Tags

| Tag | Target | Description | Example |
| :--- | :--- | :--- | :--- |
| `@cssstate` | Class | Declares custom CSS element states. | `@cssstate loading - Element is loading` |
| `@deprecated` | Class, Field, Method | Marks API as deprecated with an optional reason string. | `@deprecated Use newMethod instead` |
| `@since` | Class, Field, Method | Declares the version when the element was introduced. | `@since v1.2.0` |
| `@see` | Class, Field, Method | Links to external references, specs, or URLs. | `@see https://lit.dev` |
| `@param` | Method | Adds descriptions to method parameters. | `@param value - The input value` |
| `@returns` / `@return` | Method | Adds descriptions to method return values. | `@returns True if successful` |

## Installation

The plugin is already pre-configured inside the UIBit monorepo under `@uibit/cem-extended`.

## Usage

Create a `custom-elements-manifest.config.js` configuration file in your package:

```javascript
import uibitCemExtended from '../platform/cem-extended/dist/index.js';

export default {
  globs: ['src/**/*.ts'],
  exclude: ['**/*.test.ts', 'dist', 'node_modules'],
  litelement: true,
  plugins: [
    uibitCemExtended()
  ]
};
```

Run the analyzer:

```bash
cem analyze --config custom-elements-manifest.config.js
```
