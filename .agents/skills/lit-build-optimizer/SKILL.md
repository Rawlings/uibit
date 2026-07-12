---
name: lit-build-optimizer
description: Optimize Lit component build configuration and bundle output
category: performance
tags: [performance, build, optimization, tsc, bundles]
author: UIBit Team
---

# Lit Build Optimizer

Analyzes and optimizes component packaging, dependencies, import sizes, and build scripts for UIBit components to guarantee lightweight, tree-shakable monorepo builds.

## What It Does

Analyzes and suggests optimizations for:

- **Monorepo Packaging (pnpm):** Ensures correct scripts and configuration exports. Component build scripts must run `npm run analyze && uibit-codegen --package . && tsc`.
- **Peer & Dev Dependencies:** Prevents bundler bloat by ensuring that standard dependencies (like `lit` or framework-specific wrappers) are registered as `peerDependencies` and `devDependencies` rather than standard `dependencies`.
- **Import Efficiency & Tree-Shaking:** Audits packages for heavy dependencies (e.g., using whole library imports of `lodash` or `date-fns` instead of light, native JS alternatives).
- **CSS Footprint:** Validates CSS in `styles.ts` (ensuring variables default correctly in `:host`, removing duplicate styles, and confirming `rem` sizing variables).
- **TSConfig Extensions:** Confirms package `tsconfig.json` extends `../../tsconfig.base.json` to prevent build compilation drift.
- **Docs Vite Build Config:** Audits and optimizes the `@uibit/docs` application Vite compilation settings (e.g., manual chunking, terser optimizations).

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `packageName` | string | ✓ | Package folder path or name (e.g. "components/scroll-progress") |

## Usage Examples

### Audit Package Configuration & Imports
```bash
claude --skill lit-build-optimizer --args '{
  "packageName": "components/scroll-progress"
}'
```

### Audit Docs Application Vite Config
```bash
claude --skill lit-build-optimizer --args '{
  "packageName": "apps/docs"
}'
```

---

## Optimization Guidelines

### 1. Peer Dependency Validation
To avoid duplicate copies of libraries loading in client browsers:
- `lit` must be listed under `peerDependencies` (e.g. `"lit": "^3.0.0"`) and `devDependencies` (e.g. `"lit": "^3.3.3"`), but NEVER in the `dependencies` section.
- Direct dependencies must only contain shared monorepo workspace packages (e.g. `"@uibit/core": "workspace:*"`).

### 2. Heavy Imports and Tree-Shaking
- **Lodash/Date-Fns:** Avoid importing heavy packages. Replace utility functions with native Javascript (e.g. using `Intl.NumberFormat` instead of currency formats, using native array map/filter, using native ResizeObserver/IntersectionObserver).
- **CSS Footprint:** Avoid embedding heavy inline svg assets or massive base64 strings directly in CSS templates. Keep styles minimal and clean.

### 3. Build & codegen scripts
- Packages must generate a Custom Elements Manifest (using `cem analyze`) which exports `custom-elements.json` before compiling:
  ```json
  "scripts": {
    "build": "npm run analyze && uibit-codegen --package . && tsc",
    "dev": "concurrently \"cem analyze --globs 'src/**/*.ts' --litelement --watch\" \"tsc --watch\"",
    "analyze": "cem analyze --globs 'src/**/*.ts' --litelement"
  }
  ```

### 4. Docs App Vite Optimizations (`apps/docs/vite.config.ts`)
For the main `@uibit/docs` application, verify:
- Production source maps are disabled (`sourcemap: false`).
- Manual chunks are enabled to separate vendors:
  ```typescript
  export default defineConfig({
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/react')) return 'react-vendor';
            if (id.includes('node_modules/lit')) return 'lit-vendor';
          }
        }
      }
    }
  });
  ```
- CSS is minified using modern bundlers.

---

## Verification

After applying optimizations:

1. **Verify Builds:** Run `pnpm build` in the monorepo root to confirm compiling succeeds.
2. **Review Wrappers:** Verify that React, Vue, Svelte, etc. wrappers in `dist/frameworks/` generate correctly.
3. **Verify Bundle Size:** Ensure the component package size falls within UIBit limits:
   - Simple utilities (e.g., scroll-progress, countdown): < 15 KB unminified JS.
   - Interactive lists & inputs (e.g., table, signature-pad): < 50 KB unminified JS.
