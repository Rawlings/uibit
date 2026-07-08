---
name: lit-component-generator
description: Generate new Lit web components with scaffolding, TypeScript, tests, and docs
category: development
tags: [lit, components, scaffolding, typescript, web-components]
author: UIBit Team
---

# Lit Component Generator

Generates a complete, production-ready Lit web component with TypeScript, accessibility features, tests, and documentation.

## What It Does

This skill scaffolds:

- **Component file** (`component-name.ts`) with Lit reactive properties and methods
- **Styles** (`component-name.styles.ts`) using Lit CSS tagged template
- **Tests** (`component-name.test.ts`) with Web Test Runner setup
- **Story** (`component-name.stories.ts`) for Storybook integration
- **README.md** with usage documentation and API table
- **Package structure** ready for pnpm workspace

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentName` | string | ✓ | PascalCase component name (e.g., "MyButton") |
| `category` | string | ✓ | Component category: forms, layout, feedback, navigation, etc. |
| `description` | string | | Short component description |
| `hasSlots` | boolean | | Include slot support (default: true) |
| `hasEvents` | boolean | | Include custom events (default: true) |
| `accessible` | boolean | | Include ARIA attributes (default: true) |
## Usage Examples

### Basic Button Component via Claude CLI
```bash
claude --skill lit-component-generator --args '{
  "componentName": "MyButton",
  "category": "forms",
  "description": "A versatile button component with multiple variants"
}'
```

### Form Input with Advanced Features
```bash
claude --skill lit-component-generator --args '{
  "componentName": "TextInput",
  "category": "forms",
  "description": "Text input field with validation and error states",
  "hasSlots": true,
  "hasEvents": true,
  "accessible": true
}'
```

### Layout Container
```bash
claude --skill lit-component-generator --args '{
  "componentName": "Card",
  "category": "layout",
  "description": "Content container with consistent spacing and shadow",
  "hasSlots": true
}'
```

## Generated Structure

```
packages/<kebab-case>/
├── src/
│   ├── component-name.ts          # Main component class
│   ├── component-name.styles.ts   # Lit CSS styles
│   ├── component-name.test.ts     # Web Test Runner tests
│   ├── component-name.stories.ts  # Storybook stories
│   └── types.ts                   # TypeScript type definitions
├── package.json
├── tsconfig.json
├── vite.config.ts
├── web-test-runner.config.mjs
├── README.md
└── index.ts                       # Entry point / exports
```

## What's Included

### Component Boilerplate
- Lit class component with TypeScript
- Reactive `@property` decorators (only for behavioral parameters and data; do not use properties for styling or setting text content)
- Expose HTML `<slot>` components for rendering user-facing text, labels, or inner markup instead of properties
- Lifecycle hooks (`connectedCallback`, `disconnectedCallback`)
- Default styling setup following **Scandinavian Greyscale** aesthetic (monochrome colors, clear borders, transitions, no vibrant default colors)
- Standardized CSS Custom Properties prefixed with `--uibit-[component-name]-[variable-name]`
- Elements decorated with `part="..."` attributes to expose Shadow Parts
- Element registration via `@customElement` decorator

### Accessibility
- ARIA attributes scaffolding
- Semantic HTML structure
- Keyboard event handlers (if applicable)
- Focus management hints
- Screen reader support comments

### Testing
- Web Test Runner configuration
- Unit test template
- Accessibility test example (axe-core)
- Snapshot testing setup

### Documentation
- API property table
- Event documentation
- Slot documentation
- Usage examples
- Accessibility notes

### React / JSX Usage

When documenting or generating usage examples of web components inside React/JSX:

- Use **`class`** (not `className`) on custom elements — `className` is a React abstraction that only applies to React-controlled DOM elements. Web components are native HTML elements in the JSX output, so the standard HTML attribute name is correct:
  ```jsx
  // ✅ correct
  <uibit-scroll-progress class="sticky top-0 z-10 block" />

  // ❌ wrong — className is silently ignored on custom elements
  <uibit-scroll-progress className="sticky top-0 z-10 block" />
  ```
- Similarly, other DOM-mapped React aliases (`htmlFor` → `for`, `tabIndex` → `tabindex`, etc.) should use their **HTML attribute names** on custom elements, not their React prop aliases.

### Build Configuration
- TypeScript configuration (`tsconfig.json`): Must be kept minimal, extending `../../tsconfig.base.json` to prevent duplicated settings, specifying output directory:
  ```json
  {
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
      "outDir": "./dist"
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  }
  ```
- Node TS configuration (`tsconfig.node.json`): Configures TypeScript settings for compilation of `vite.config.ts`.
- Vite configuration (`vite.config.ts`): Packages must use library mode with Rollup configuration to bundle UMD and ES outputs cleanly.
- Package exports: Package `package.json` must export UMD/ES entrypoints, types, and CSS.
- Web component manifest (if applicable)

## After Generation

1. **Implement component logic** in the generated `.ts` file
2. **Add tests** to the `.test.ts` file
3. **Run dev server:** `pnpm dev`
4. **View in Storybook:** Check `.stories.ts` file
5. **Test locally:** `pnpm -F @uibit/component-name run test`

## Template Variables Used

The generator substitutes:
- `{ComponentName}` → PascalCase class name
- `{component-name}` → kebab-case tag name
- `{category}` → folder structure
- `{description}` → README and docs

## Next Steps

After generation, consider using:

1. **`lit-test-generator`** - Generate comprehensive test suite
2. **`lit-docs-generator`** - Auto-generate full documentation
3. **`lit-a11y-audit`** - Verify accessibility compliance
4. **`lit-build-optimizer`** - Optimize for production

---

**Best Practice:** Generate components early in development, customize them, then let `lit-test-generator` create a full test suite.
