# @uibit/codegen

[![NPM Version](https://img.shields.io/npm/v/@uibit/codegen.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/codegen)


A generic, high-performance web component wrapper generator for multiple frontend frameworks. It reads a standard Custom Elements Manifest (`custom-elements.json`) and generates native-feeling, tree-shakable wrappers for React, Vue 3, Svelte 5, Angular, SolidJS, Astro, Qwik, and Nuxt 3.

## Features

- **Zero Runtime Dependencies**: The generated wrappers are written as raw, standalone source code using standard native framework primitives (e.g., standard React Hooks, Vue's `h` render function, or Svelte 5 runes) with no external library dependencies.
- **Tree Shakable**: Generates individual files per component and framework, enabling modern bundlers to optimize your bundle sizes.
- **Strictly Typed**: Outputs precise TypeScript declarations (`.d.ts`) matching your components' properties, attributes, and custom events.
- **Svelte 5 Runes**: Automatically templates wrappers using Svelte 5's new `$props()`, `$state()`, and `$effect()` runes.
- **SSR Friendly**: Generates `"use client";` directives for React/Next.js and safe client-side loading wrappers for Nuxt 3.

## Installation

```bash
npm install -D @uibit/codegen
# or
pnpm add -D @uibit/codegen
```

## Usage

Ensure you have run the Custom Elements Manifest analyzer first:

```bash
# Generate the manifest first (runs up to 123x faster using our binary)
npx @uibit/cem-oxc analyze --globs "src/**/*.ts" --litelement
```

Then run the wrapper generator:

```bash
npx uibit-codegen --package .
```

This will output all wrappers directly to `./dist/frameworks/` inside your package.
