---
name: lit-test-generator
description: Generate comprehensive test suites for Lit web components
category: quality
tags: [testing, lit, web-components, test-runner, accessibility]
author: UIBit Team
---

# Lit Test Generator

Generates comprehensive test suites for Lit web components including unit tests, accessibility tests, and visual regression stubs.

## What It Does

Generates tests for:

- **Unit tests** - Property mutations, methods, lifecycle
- **Integration tests** - Component interaction, DOM updates
- **Accessibility tests** - WCAG compliance, axe-core integration
- **Interaction tests** - Keyboard, mouse, touch events
- **Snapshot tests** - DOM and style verification
- **Visual regression** - Stubs for visual testing tools

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentPath` | string | ✓ | Path to component package (e.g., "packages/button") |
| `testType` | string | | Test types: "unit" (default), "a11y", "interaction", "all" |
| `coverage` | string | | Coverage target: "basic" (60%), "standard" (80%), "complete" (95%) |
| `framework` | string | | Test framework: "web-test-runner" (default), "vitest" |
| `includeStubs` | boolean | | Include placeholder tests (default: true) |

## Usage Examples

### Generate All Test Types
```bash
claude --skill lit-test-generator --args '{
  "componentPath": "packages/button",
  "testType": "all",
  "coverage": "complete"
}'
```

### Unit Tests Only
```bash
claude --skill lit-test-generator --args '{
  "componentPath": "packages/card",
  "testType": "unit",
  "coverage": "standard"
}'
```

### Accessibility Focus
```bash
claude --skill lit-test-generator --args '{
  "componentPath": "packages/form-input",
  "testType": "a11y",
  "coverage": "complete"
}'
```

## Generated Test Structure

```
packages/<component>/
└── test/
    ├── component-name.test.ts       # Unit tests
    ├── component-name.a11y.test.ts  # Accessibility tests
    ├── component-name.interaction.test.ts
    ├── setup.ts                     # Test utilities
    └── fixtures/
        └── sample-data.ts           # Test fixtures
```

## Test Categories

### Unit Tests
- Property getters/setters
- Method behavior
- Event emission
- Lifecycle hooks
- State management
- Computed properties

Example:
```typescript
it('should update label when property changes', async () => {
  const button = await fixture(html`<my-button></my-button>`);
  button.label = 'New Label';
  await button.updateComplete;
  expect(button.shadowRoot?.textContent).to.include('New Label');
});
```

### Accessibility Tests
- ARIA attributes
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Focus management
- Color contrast
- Screen reader announcements
- Semantic HTML

Example:
```typescript
it('should be keyboard accessible', async () => {
  const button = await fixture(html`<my-button></my-button>`);
  const axeResults = await axe(button);
  expect(axeResults.violations).to.be.empty;
});

it('should handle keyboard activation', async () => {
  const button = await fixture(html`<my-button></my-button>`);
  button.focus();
  button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  expect(button.pressed).to.be.true;
});
```

### Interaction Tests
- Mouse clicks
- Touch events
- Hover states
- Focus/blur
- Custom events

Example:
```typescript
it('should emit click event', async () => {
  const button = await fixture(html`<my-button></my-button>`);
  const clicked = oneEvent(button, 'click');
  button.click();
  await clicked;
  expect(button.pressed).to.be.true;
});
```

### Integration Tests
- Multiple components working together
- Slot rendering
- Event bubbling
- Parent-child communication

Example:
```typescript
it('should render slotted content', async () => {
  const card = await fixture(html`
    <my-card>
      <h2>Card Title</h2>
      <p>Card content</p>
    </my-card>
  `);
  expect(card.textContent).to.include('Card Title');
});
```

### Snapshot Tests
- DOM structure
- CSS output
- Attribute presence
- Event structure

Example:
```typescript
it('should match snapshot', async () => {
  const button = await fixture(html`<my-button></my-button>`);
  expect(button).dom.to.equalSnapshot();
});
```

## Test Utilities Included

### Helpers
- `fixture()` - Create component instances for testing
- `oneEvent()` - Wait for single event emission
- `waitUntil()` - Poll for condition
- `sendMouse()` - Simulate mouse events
- `sendKeys()` - Simulate keyboard input
- `typeString()` - Type text input

### Assertions
- DOM assertions (`.dom.to.equal()`)
- Element queries (`.querySelector()` helpers)
- Event assertions (`.emitted()`)
- Style assertions (`.computed()`)

## Configuration

Tests use Web Test Runner configured in `web-test-runner.config.mjs`:

```javascript
export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,
  coverage: true,
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
  ],
};
```

## Running Tests

```bash
# Run all tests
pnpm -F @uibit/component-name run test

# Watch mode
pnpm -F @uibit/component-name run test:watch

# With coverage
pnpm -F @uibit/component-name run test:coverage

# Specific test file
pnpm -F @uibit/component-name run test -- button.test.ts
```

## Coverage Report

Generated with:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

Target: 80%+ for production components

## After Generation

1. **Review generated tests** - Customize for your component
2. **Add business logic tests** - Implement specific test cases
3. **Run tests:** `pnpm -F @uibit/component run test`
4. **Check coverage:** `pnpm -F @uibit/component run test:coverage`
5. **Add to CI/CD** - Run tests on every commit

## Test-Driven Development (TDD) Workflow

1. **Generate tests first** with `lit-test-generator`
2. **Implement component** to make tests pass
3. **Refactor** using `lit-component-refactor`
4. **Audit accessibility** with `lit-a11y-audit`
5. **Update docs** with `lit-docs-generator`

## Next Steps

After test generation:

1. **`lit-component-refactor`** - Optimize component structure
2. **`lit-a11y-audit`** - Add accessibility tests
3. **`lit-docs-generator`** - Document test cases in README

---

**Best Practice:** Aim for 80%+ code coverage. Focus on critical paths and edge cases first. Use `.skip()` and `.only()` for focused development.

**Coverage Metrics:**
- **Line Coverage** - % of lines executed
- **Branch Coverage** - % of conditional branches tested
- **Function Coverage** - % of functions called
- **Statement Coverage** - % of statements executed
