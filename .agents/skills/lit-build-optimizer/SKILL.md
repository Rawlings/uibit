---
name: lit-build-optimizer
description: Optimize Lit component build configuration and bundle output
category: performance
tags: [performance, build, optimization, vite, bundle]
author: UIBit Team
---

# Lit Build Optimizer

Analyzes and optimizes Vite build configuration, bundle output, and dependency usage for Lit web components to reduce size, improve performance, and follow best practices.

## What It Does

Analyzes and improves:

- **Bundle size** - Identify and remove unused code
- **Vite configuration** - Optimize minification, code splitting
- **Dependencies** - Find unused or heavy dependencies
- **Tree-shaking** - Improve dead code elimination
- **CSS size** - Optimize CSS-in-JS and stylesheets
- **Lit library usage** - Ensure efficient Lit API usage
- **Build performance** - Reduce build time

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `packageName` | string | ✓ | Package name or path (e.g., "@uibit/button") |
| `analyzeType` | string | | Analysis: "bundle" (default), "config", "performance", "all" |
| `targetSize` | string | | Size target: "aggressive" (minimal), "balanced" (default), "loose" (with features) |
| `includeReport` | boolean | | Generate detailed report (default: true) |
| `generatePatches` | boolean | | Generate vite.config fixes (default: true) |

## Usage Examples

### Full Analysis
```bash
claude --skill lit-build-optimizer --args '{
  "packageName": "@uibit/button",
  "analyzeType": "all",
  "targetSize": "balanced",
  "includeReport": true
}'
```

### Bundle Size Only
```bash
claude --skill lit-build-optimizer --args '{
  "packageName": "@uibit/table",
  "analyzeType": "bundle",
  "targetSize": "aggressive"
}'
```

### Build Configuration Review
```bash
claude --skill lit-build-optimizer --args '{
  "packageName": "@uibit/docs",
  "analyzeType": "config",
  "generatePatches": true
}'
```

## Analysis Output

### Bundle Analysis

**Current State:**
```
Bundle Analysis: @uibit/button
═════════════════════════════════════════════

Production Bundle
  Size: 28.5 KB (minified)
  Gzip: 9.2 KB
  Brotli: 8.1 KB

Development Bundle
  Size: 156 KB (unminified)
  Source maps: 245 KB

Top Contributors
  1. lit: 14.2 KB (50%)
  2. lit/decorators: 3.8 KB (13%)
  3. component-styles: 6.1 KB (21%)
  4. utils: 4.4 KB (15%)
```

**Opportunities:**
```
Unused Exports (Remove)
  - LegacyButton class
  - DeprecatedProps interface
  - OldStyleMixin

Heavy Dependencies
  - lodash-es (3.2 KB) - Can be replaced with native

Duplicate Code
  - String utilities duplicated in 2 files
  - Validation logic in 3 places

Tree-shaking Issues
  - CommonJS import detected (use ESM)
  - Side effects declared but none found
```

### Optimization Recommendations

**High Impact (5-10 KB savings):**
1. Remove unused exports and legacy code
2. Extract shared string utilities
3. Use native JS instead of lodash-es
4. Enable CSS minification

**Medium Impact (2-5 KB savings):**
5. Convert CommonJS imports to ESM
6. Remove unnecessary async/await
7. Compress inline templates
8. Optimize CSS variable usage

**Low Impact (< 1 KB savings):**
9. Remove console.log in production
10. Minify comments

### Performance Analysis

**Build Time:**
```
Current: 2.3 seconds
After optimization: 1.8 seconds (21% improvement)

Breakdown
  Type checking: 850ms
  Transpiling: 450ms
  CSS processing: 230ms
  Bundling: 770ms
```

**Rendering Performance:**
```
Current
  Time to interactive: 145ms
  Render time: 2.1ms per update
  Memory: 8.2 MB

Optimized
  Time to interactive: 118ms (19% faster)
  Render time: 1.8ms per update (14% faster)
  Memory: 7.6 MB (7% less)
```

## Vite Configuration Optimization

### Before
```typescript
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  plugins: [
    terser({
      compress: true,
    }),
  ],
});
```

### After
```typescript
export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: false, // Remove for production
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/lit')) {
            return 'lit-vendor';
          }
        },
      },
    },
  },
  plugins: [
    terser({
      compress: {
        pure_getters: true,
        passes: 3,
      },
    }),
  ],
});
```

## CSS Optimization

### Template Literals

**Before:**
```typescript
static styles = css`
  :host { display: block; }
  .button { padding: 8px 16px; }
  .button:hover { opacity: 0.9; }
  .button:disabled { opacity: 0.5; }
  .button.primary { background: #007bff; }
  .button.secondary { background: #6c757d; }
  /* ... 50+ more lines ... */
`;
```

**After:**
```typescript
static styles = [
  css`
    :host { display: block; }
    .button {
      padding: var(--button-padding, 8px 16px);
      background: var(--button-bg);
      transition: opacity 150ms;
    }
    .button:hover { opacity: var(--button-hover-opacity, 0.9); }
    .button:disabled { opacity: var(--button-disabled-opacity, 0.5); }
  `,
  buttonVariantStyles,
];
```

## Dependency Analysis

### Identify Heavy Dependencies

```
Module Size Analysis
═════════════════════════════════════════════

lodash-es                           3.2 KB (unused functions)
  → Solution: Use native JS or tree-shake

date-fns                            12.4 KB (only 2 functions used)
  → Solution: Use simple date utils

classnames                          1.8 KB (only 1 function)
  → Solution: Use template literals

uuid                                2.1 KB (only v4 used)
  → Solution: Import only what needed
```

## Performance Targets

Based on Lit component best practices:

| Component Type | Bundle Size | Gzip Size | Load Time |
|---|---|---|---|
| Simple (Button, Badge) | < 15 KB | < 5 KB | < 50ms |
| Complex (Form, Table) | < 50 KB | < 15 KB | < 150ms |
| Composite (Page) | < 100 KB | < 30 KB | < 300ms |

## Generated Artifacts

1. **optimization-report.md** - Detailed findings and recommendations
2. **vite.config.optimization.ts** - Optimized Vite configuration
3. **bundle-analysis.json** - Detailed bundle breakdown
4. **performance-metrics.json** - Before/after metrics

## Applying Recommendations

### Step 1: Review Recommendations
```bash
cat optimization-report.md
```

### Step 2: Update Configuration
```bash
cp vite.config.optimization.ts vite.config.ts
```

### Step 3: Remove Unused Code
- Delete unused exports
- Extract shared utilities
- Replace heavy dependencies

### Step 4: Rebuild and Measure
```bash
pnpm build
pnpm -F @uibit/button run build:analyze
```

### Step 5: Compare Metrics
```bash
diff current-metrics.json previous-metrics.json
```

## Monitoring

After optimization, monitor:

- **Bundle size** - Track over time
- **Build time** - Ensure improvements persist
- **Runtime performance** - Profile in browser
- **Dependencies** - Keep updated

Add to CI/CD:
```bash
# Fail if bundle exceeds target
pnpm build:check-size --max=15kb
```

## Browser Target Optimization

### Modern Targets (Lower Overhead)
```typescript
target: 'es2020' // 5-10% smaller bundles
```

### Older Targets (Higher Overhead)
```typescript
target: 'es2015' // 15-20% larger, needed for IE11
```

## After Optimization

1. **Verify functionality** - Test in browsers
2. **Check performance** - Use Lighthouse
3. **Monitor build times** - CI/CD metrics
4. **Update documentation** - Document optimizations
5. **Set up monitoring** - Track over time

## Performance Checklist

- ✓ Bundle size < target
- ✓ Gzip size optimized
- ✓ Tree-shaking effective
- ✓ CSS minified
- ✓ Build time < 5 seconds
- ✓ No source maps in production
- ✓ Unused code removed
- ✓ Dependencies audited

## Next Steps

After optimization:

1. **Deploy** - Roll out optimized bundles
2. **Monitor** - Check real-world performance
3. **Re-audit** - Run again in 3-6 months
4. **Maintain** - Keep dependencies updated

---

**Best Practice:** Optimize before release, then monitor continuously. Small optimizations add up: 1KB × 1000 components = 1MB saved.

**Tools Used:**
- Vite built-in bundle analysis
- rollup-plugin-visualizer
- source-map-explorer
- lighthouse-cli
