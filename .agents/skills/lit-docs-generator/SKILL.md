---
name: lit-docs-generator
description: Auto-generate comprehensive component documentation
category: documentation
tags: [docs, documentation, readme, storybook, api]
author: UIBit Team
---

# Lit Docs Generator

Auto-generates comprehensive documentation for Lit web components including README, API tables, usage examples, and Storybook integration.

## What It Does

Generates:

- **README.md** - Component overview, features, installation
- **API documentation** - Property, method, and event tables
- **Usage examples** - Copy-paste ready code snippets
- **Accessibility guide** - WCAG compliance notes
- **Installation guide** - pnpm/npm setup
- **Migration guide** - Upgrade instructions (if versioned)
- **Storybook stories** - Interactive component examples

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentPath` | string | ✓ | Path to component package (e.g., "packages/button") |
| `outputFormat` | string | | Output: "markdown" (default), "html", "both" |
| `includeAPI` | boolean | | Generate API reference (default: true) |
| `includeExamples` | boolean | | Include code examples (default: true) |
| `includeStorybook` | boolean | | Generate Storybook stories (default: true) |
| `includeA11y` | boolean | | Include accessibility section (default: true) |

## Usage Examples

### Generate Full Documentation
```bash
claude --skill lit-docs-generator --args '{
  "componentPath": "packages/button",
  "outputFormat": "both",
  "includeAPI": true,
  "includeExamples": true,
  "includeA11y": true
}'
```

### README Only
```bash
claude --skill lit-docs-generator --args '{
  "componentPath": "packages/card",
  "outputFormat": "markdown",
  "includeExamples": true
}'
```

### API Reference Only
```bash
claude --skill lit-docs-generator --args '{
  "componentPath": "packages/form-input",
  "outputFormat": "markdown",
  "includeAPI": true,
  "includeExamples": true
}'
```

## Generated Documentation

### README.md Structure

```markdown
# @uibit/button

Short description of the component.

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation

### With pnpm
\`\`\`bash
pnpm add @uibit/button
\`\`\`

### With npm
\`\`\`bash
npm install @uibit/button
\`\`\`

## Usage

### Basic Example
\`\`\`html
<my-button>Click me</my-button>
\`\`\`

### With Properties
\`\`\`html
<my-button variant="primary" disabled>
  Submit
</my-button>
\`\`\`

## API

### Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | string | "" | Button text/label |
| variant | "primary" \| "secondary" | "primary" | Visual style |
| disabled | boolean | false | Disable interaction |
| loading | boolean | false | Show loading state |

### Methods

| Name | Parameters | Return | Description |
|------|-----------|--------|-------------|
| focus() | — | void | Focus the button |
| blur() | — | void | Blur the button |

### Events

| Name | Detail | Description |
|------|--------|-------------|
| click | — | Fired when button clicked |
| focus | — | Fired when button focused |
| blur | — | Fired when button blurred |

### Slots

| Name | Description |
|------|-------------|
| default | Button content/label |
| icon | Icon slot (optional) |

### CSS Custom Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| --button-bg-color | color | #007bff | Background color |
| --button-text-color | color | #fff | Text color |
| --button-padding | length | 8px 16px | Internal spacing |

## Accessibility

This component meets WCAG 2.1 Level AA standards:

- ✓ Keyboard accessible (Tab, Enter, Space)
- ✓ Proper ARIA attributes
- ✓ Focus indicators
- ✓ Sufficient color contrast
- ✓ Screen reader support

See [Accessibility Guide](./docs/ACCESSIBILITY.md) for details.

## Examples

### Loading State
\`\`\`html
<my-button loading>
  Processing...
</my-button>
\`\`\`

### Icon Button
\`\`\`html
<my-button>
  <icon-component slot="icon"></icon-component>
  Click
</my-button>
\`\`\`

### Disabled State
\`\`\`html
<my-button disabled>
  Unavailable
</my-button>
\`\`\`

## Browser Support

- Chrome/Edge: ✓ All versions
- Firefox: ✓ 78+
- Safari: ✓ 14+

## License

MIT
```

### API Reference Table Format

**Properties Table:**
- Name, Type, Default, Description
- Sortable by name or type
- Links to detailed documentation

**Methods Table:**
- Name, Parameters, Return type, Description
- Includes parameter types and return types

**Events Table:**
- Name, Detail object structure, Description
- Event data structure documented

**CSS Variables Table:**
- Custom property name (must be prefixed with `--uibit-[component-name]-[variable-name]`)
- Type (color, length, number, etc.)
- Default value
- Description / Use case

**CSS Shadow Parts Table:**
- Part name (defined via the `part="..."` attribute)
- Description / Exposed element context

### Code Examples

Generated with:
- Basic usage
- Common variants
- Advanced features
- Error cases
- Accessibility patterns

### Storybook Stories

Generated stories include:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@uibit/button';

type Story = StoryObj;

export default {
  title: 'Components/Button',
  component: 'my-button',
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
} as Meta;

export const Primary: Story = {
  render: () => html`<my-button>Primary Button</my-button>`,
};

export const Secondary: Story = {
  render: () => html`<my-button variant="secondary">Secondary</my-button>`,
};

export const Loading: Story = {
  render: () => html`<my-button loading>Loading...</my-button>`,
};

export const Disabled: Story = {
  render: () => html`<my-button disabled>Disabled</my-button>`,
};
```

## Documentation Features

### Automatic Extraction
- Reads JSDoc comments from source
- Extracts TypeScript types
- Finds custom elements and properties
- Discovers events and methods

### Cross-referencing
- Links between related components
- References to Storybook stories
- Links to accessibility guidelines
- Related components sidebar

### Code Highlighting
- Syntax highlighting for all code blocks
- Framework-specific highlighting (HTML, TypeScript, CSS)
- Copy-to-clipboard buttons
- Line highlighting for specific examples

### Responsive Design
- Mobile-friendly tables
- Collapsible code blocks
- Touch-friendly Storybook stories
- Mobile documentation site

## Output Files

- `README.md` - Main documentation
- `docs/API.md` - Detailed API reference
- `docs/ACCESSIBILITY.md` - A11y guidelines
- `docs/EXAMPLES.md` - Advanced examples
- `src/component.stories.ts` - Storybook integration

## Publishing

Generated docs are ready for:

- **GitHub** - README displays in repo
- **npm** - README shows on npmjs.com
- **Storybook** - Stories integrate with Storybook site
- **Documentation sites** - Deploy markdown to Docusaurus, VitePress, etc.

## After Generation

1. **Review documentation** - Verify accuracy
2. **Add custom examples** - Include your use cases
3. **Update Storybook** - Add controls and interactions
4. **Publish** - Push to GitHub and npm
5. **Maintain** - Update docs with new features

## Updating Documentation

Regenerate docs after:
- Adding new properties or methods
- Changing public APIs
- Updating default values
- Adding new events
- Accessibility improvements

Run again with:
```bash
claude --skill lit-docs-generator --args '{
  "componentPath": "packages/button",
  "outputFormat": "both"
}'
```

## Next Steps

After documentation:

1. **`lit-test-generator`** - Add test cases to examples
2. **`lit-a11y-audit`** - Verify accessibility claims
3. **`lit-build-optimizer`** - Optimize bundle size for docs

---

**Best Practice:** Keep documentation up-to-date with code. Regenerate when APIs change. Use Storybook for interactive examples.

**Documentation Quality Checklist:**
- ✓ README is clear and concise
- ✓ API table is complete
- ✓ Examples are copy-paste ready
- ✓ Accessibility is documented
- ✓ Browser support is listed
- ✓ Installation instructions are clear
