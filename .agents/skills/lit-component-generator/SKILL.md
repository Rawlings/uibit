---
name: lit-component-generator
description: Generate new Lit web components with scaffolding, TypeScript, tests, and docs
category: development
tags: [lit, components, scaffolding, typescript, web-components]
author: UIBit Team
---

# Lit Component Generator

Generates a complete, production-ready Lit web component package within the monorepo, following UIBit architecture, styling, and testing conventions.

## What It Does

This skill scaffolds a new component package inside `components/<component-name>/` with:

- **Component file** (`src/<component-name>.ts`) extending `UIBitElement` from `@uibit/core` and using `@customElement` and `msg` from `@uibit/core`
- **Styles** (`src/styles.ts`) using Lit CSS tagged template (rem units only, grayscale palette, no chromatic colors)
- **Tests** (`src/<component-name>.test.ts`) using **Vitest** with browser-like happy-dom environment setup
- **Types** (`src/types.ts`) exposing JSX and global HTML type declarations for framework support
- **README.md** with component description, basic HTML/React usage, a11y notes, and main docs site references
- **Package structure** matching our pnpm workspace build setup (`tsconfig.json`, `package.json` with build scripts)

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentName` | string | ✓ | PascalCase component name (e.g., "ScrollProgress") |
| `category` | string | ✓ | Category for the docs site (e.g. "Data", "Feedback", "Navigation") |
| `description` | string | | Short component description |
| `hasSlots` | boolean | | Include slot support (default: true) |
| `hasEvents` | boolean | | Include custom events (default: true) |

## Usage Examples

### Scaffold a Sentiment Selector Component
```bash
claude --skill lit-component-generator --args '{
  "componentName": "SentimentSelector",
  "category": "Feedback",
  "description": "Interactive feedback bar tracking sentiment ratings"
}'
```

### Scaffold a Custom Video Player
```bash
claude --skill lit-component-generator --args '{
  "componentName": "VideoPlayer",
  "category": "Media",
  "description": "Scandinavian minimalist video player wrapping native video elements",
  "hasSlots": true
}'
```

## Generated Structure

```
components/<kebab-case>/
├── src/
│   ├── component-name.ts          # Main component class extending UIBitElement
│   ├── styles.ts                  # Lit CSS styles (rem units, grayscale)
│   ├── component-name.test.ts     # Vitest unit & integration tests
│   ├── types.ts                   # Types and JSX declarations
│   └── index.ts                   # Entry point exporting component and types
├── package.json                   # Build scripts and dependency configurations
├── tsconfig.json                  # Extends root tsconfig.base.json
├── README.md                      # Basic installation & usage guide
└── LICENSE                        # MIT License
```

## Implementation Guidelines

### 1. Main Component Class (`src/component-name.ts`)
- **Base Class:** Every component MUST extend `UIBitElement` from `@uibit/core`. Never inherit from `LitElement` directly.
- **Decorator:** Register using `@customElement('uibit-component-name')` imported from `@uibit/core` (to avoid double-registration errors).
- **Properties Naming & Attributes:**
  - CamelCase properties map to kebab-case attributes automatically via `UIBitElement`, but they should be documented explicitly: `@property({ type: Boolean, attribute: 'auto-play' }) autoPlay = false;`.
  - Properties referencing a CSS selector of another DOM element must end in `Selector` and map to attributes ending in `-selector` (e.g., `targetSelector` maps to `target-selector`).
- **Slots Over Properties:** Never pass user-facing text, titles, or inner content through reactive string properties. Expose `<slot>` tags instead, using a property value as a fallback:
  ```typescript
  // ✅ Correct: slot with fallback
  render() {
    return html`<div class="label"><slot name="label">${this.label}</slot></div>`;
  }
  ```
- **Localization:** Wrap all default user-facing strings in the `msg` function from `@uibit/core`:
  ```typescript
  import { msg } from '@uibit/core';
  
  html`<span aria-label=${msg('Close panel')}>✕</span>`
  ```
- **Clean Event Registration:** Use `this.listen(target, type, handler, options)` helper from `UIBitElement` for adding event listeners. These are automatically disconnected when the component is unmounted.

### 2. Styling System (`src/styles.ts`)
- **Rem Units only:** Never use `px` in CSS rules. Spacings, widths, borders, radii, shadows, and fonts must use `rem` values matching the Tailwind theme equivalents (defined in `DESIGN.md`). Exception: bare `0` needs no unit.
- **Grayscale Palette:** Use the Tailind CSS `gray` scale hex codes. No chromatic accent colors (blues, greens, reds) allowed in defaults.
- **Focus Rings:** Must be black. Standard ring outline: `outline: 0.125rem solid #000000; outline-offset: 0.125rem;`.
- **CSS Shadow Parts:** Attach `part="..."` attributes to sub-elements to allow theme styling from outside the shadow root (e.g., `<button part="button">`).
- **Encapsulation:** Define CSS variable defaults in `:host {}`. All custom variables must be prefixed: `--uibit-[component-name]-[variable]`.
- **Minimalist Overlay Controls & Buttons:** All control, toggle, drag handle, and close buttons must be circular, borderless, shadowless, and use solid `#ffffff` or translucent background with backdrop-filter blur. Hover states must be extremely subtle (bg `#f3f4f6`, border-color `#d1d5db`), avoiding thick black borders or heavy drop shadows. Use soft transitions (hover `scale(1.05)` or direction slide shifts, active click `scale(0.95)`).

### 3. Vitest Testing (`src/component-name.test.ts`)
- All tests run under **Vitest** in the workspace root with Happy DOM.
- Do NOT use Mocha, Chai, or Open Web Components `fixture` helpers.
- Setup/Teardown should create the element using `document.createElement('uibit-component-name')` and append/remove from the body:
  ```typescript
  import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
  import './component-name';
  import { ComponentName } from './component-name';

  describe('ComponentName', () => {
    let element: ComponentName;

    beforeEach(async () => {
      element = document.createElement('uibit-component-name') as ComponentName;
      document.body.appendChild(element);
      await element.updateComplete;
    });

    afterEach(() => {
      element.remove();
    });

    it('renders with default states', () => {
      expect(element.active).toBe(false);
    });
  });
  ```

### 4. Code Generation & Exports
- **`tsconfig.json`:** Minimal configuration extending `../../tsconfig.base.json`:
  ```json
  {
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
      "outDir": "./dist",
      "rootDir": "./src"
    },
    "include": ["src"]
  }
  ```
- **`package.json` Scripts:**
  ```json
  "scripts": {
    "build": "npm run analyze && uibit-codegen --package . && tsc",
    "dev": "concurrently \"cem analyze --globs 'src/**/*.ts' --litelement --watch\" \"tsc --watch\"",
    "analyze": "cem analyze --globs 'src/**/*.ts' --litelement"
  }
  ```
- **Framework Wrappers:** Running `uibit-codegen` parses `custom-elements.json` (CEM manifest) to automatically generate React/Vue/Svelte/etc. wrappers inside `dist/frameworks/`.

### 5. JSX Usage Examples
When generating React/JSX documentation, verify:
- HTML wrapper elements use `className="..."`.
- Custom web components (`<uibit-*>`) use `class="..."` (since React ignores `className` on custom elements):
  ```jsx
  <div className="wrapper">
    <uibit-scroll-progress class="sticky top-0 block" />
  </div>
  ```

---

**Best Practice:** Scaffolding the basic skeleton sets a clean foundation. Ensure it builds (`pnpm build`) and passes its tests (`pnpm test`) before adding logic.
