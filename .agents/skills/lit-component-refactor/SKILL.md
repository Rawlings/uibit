---
name: lit-component-refactor
description: Refactor and optimize existing Lit web components
category: quality
tags: [refactoring, optimization, lit, performance]
author: UIBit Team
---

# Lit Component Refactor

Refactors and optimizes existing Lit web components following Lit best practices, improving code quality, performance, and maintainability.

## What It Does

Analyzes and improves:

- **Reactive properties** - Optimize decorators and change detection
- **Rendering logic** - Simplify templates and reduce re-renders
- **Lifecycle hooks** - Streamline connectedCallback, disconnectedCallback
- **Type safety** - Improve TypeScript typing and inference
- **Performance** - Reduce memory, bundle size, and render time
- **Accessibility** - Add missing ARIA attributes and semantic HTML
- **Code organization** - Extract reusable logic and components

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentPath` | string | ✓ | Path to component package (e.g., "packages/button") |
| `focus` | string | | Refactor focus: "all" (default), "performance", "accessibility", "code-quality", "types" |
| `modernLit` | boolean | | Use modern Lit patterns (default: true) |
| `extractShared` | boolean | | Extract shared logic to base classes (default: true) |
| `aggressive` | boolean | | Apply aggressive optimizations (default: false) |

## Usage Examples

### Full Refactor
```bash
claude --skill lit-component-refactor --args '{
  "componentPath": "packages/button",
  "focus": "all",
  "modernLit": true,
  "extractShared": true
}'
```

### Performance Focused
```bash
claude --skill lit-component-refactor --args '{
  "componentPath": "packages/table",
  "focus": "performance",
  "aggressive": true
}'
```

### Accessibility Improvements
```bash
claude --skill lit-component-refactor --args '{
  "componentPath": "packages/form-input",
  "focus": "accessibility"
}'
```

## Refactoring Patterns

### Property Optimization

**Before:**
```typescript
export class MyButton extends LitElement {
  @property() label: string = '';
  @property() variant: string = 'primary';
  @property({ type: Boolean }) disabled = false;
  
  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('label')) {
      this.requestUpdate();
    }
  }
}
```

**After:**
```typescript
export class MyButton extends LitElement {
  @property() label = '';
  @property() variant: 'primary' | 'secondary' = 'primary';
  @property({ type: Boolean }) disabled = false;
  
  // No manual updated() needed - Lit handles reactivity
}
```

### Template Optimization

**Before:**
```typescript
render() {
  return html`
    <button 
      class="btn ${this.variant} ${this.disabled ? 'disabled' : ''}"
      ?disabled="${this.disabled}"
      @click="${this.onClick}"
    >
      ${this.label}
    </button>
  `;
}
```

**After:**
```typescript
render() {
  return html`
    <button 
      class="btn"
      class.variant="${this.variant}"
      ?disabled="${this.disabled}"
      @click="${() => this.onClick()}"
    >
      ${this.label}
    </button>
  `;
}
```

### Event Handler Optimization

**Before:**
```typescript
constructor() {
  super();
  this.handleClick = this.handleClick.bind(this);
  this.handleKeydown = this.handleKeydown.bind(this);
}

connectedCallback() {
  super.connectedCallback();
  this.addEventListener('click', this.handleClick);
  this.addEventListener('keydown', this.handleKeydown);
}

disconnectedCallback() {
  super.disconnectedCallback();
  this.removeEventListener('click', this.handleClick);
  this.removeEventListener('keydown', this.handleKeydown);
}
```

**After:**
```typescript
// Use event handlers directly in template
@click="${this._onClick}"
@keydown="${this._onKeydown}"

private _onClick = () => { /* handler */ };
private _onKeydown = () => { /* handler */ };
```

### Memoization for Expensive Computations

**Before:**
```typescript
get displayLabel(): string {
  return this.label.toUpperCase().trim().replace(/\s+/g, ' ');
}
```

**After:**
```typescript
@state() private _displayLabel = '';

willUpdate(changedProperties: PropertyValues) {
  if (changedProperties.has('label')) {
    this._displayLabel = this.label
      .toUpperCase()
      .trim()
      .replace(/\s+/g, ' ');
  }
}
```

### Style Optimization

**Before:**
```typescript
static styles = css`
  :host {
    display: inline-block;
  }
  
  button {
    padding: 8px 16px;
    background: var(--button-bg, #007bff);
    color: var(--button-text, #fff);
    border: none;
    cursor: pointer;
  }
  
  button:hover { opacity: 0.9; }
  button:focus-visible { outline: 2px solid #0066cc; }
`;
```

**After:**
```typescript
static styles = css`
  :host { display: inline-block; }
  
  button {
    padding: var(--button-padding, 8px 16px);
    background: var(--button-bg, #007bff);
    color: var(--button-text, #fff);
    border: none;
    cursor: pointer;
    transition: opacity 150ms ease-in-out;
  }
  
  button:hover { opacity: 0.9; }
  button:focus-visible { 
    outline: 2px solid;
    outline-offset: 2px;
  }
`;
```

## Refactoring Categories

### 1. Performance

- Remove unnecessary re-renders
- Memoize expensive computations
- Lazy-load components
- Optimize change detection strategy
- Reduce template complexity
- Extract large templates
- Cache computed properties

### 2. Accessibility

- Add missing ARIA attributes
- Improve semantic HTML
- Add keyboard event handlers
- Improve focus management
- Add screen reader support
- Improve color contrast
- Add alt text where needed

### 3. Code Quality

- Remove dead code
- Extract reusable methods
- Improve naming
- Add JSDoc comments
- Reduce complexity
- Remove duplicated logic
- Follow Lit best practices

### 4. Type Safety

- Improve TypeScript typing
- Use strict types
- Add generics where appropriate
- Remove `any` types
- Export types properly
- Add type guards
- Improve inference

### 5. Maintainability

- Extract shared logic to base classes
- Create mixin functions
- Improve code organization
- Add component composition
- Reduce coupling
- Improve documentation
- Add error handling

## Shared Logic Extraction

Can extract to:

**Base Classes:**
```typescript
export class FormElement extends LitElement {
  @property() name = '';
  @property() disabled = false;
  @property() required = false;
  
  protected checkValidity(): boolean { /* ... */ }
  protected reportValidity(): boolean { /* ... */ }
}

export class MyInput extends FormElement { /* ... */ }
```

**Mixins:**
```typescript
export const ResizableMixin = <T extends Constructor<LitElement>>(Base: T) => {
  return class Resizable extends Base {
    @property() width = '';
    @property() height = '';
    /* ... */
  };
};
```

**Shared Utilities:**
```typescript
export const createFormValidator = () => { /* ... */ };
export const createAccessibilityHelpers = () => { /* ... */ };
```

## Quality Metrics

Reports improvements in:

- **Bundle size** - Pre and post refactor
- **Render time** - Update detection performance
- **Type coverage** - % of code with types
- **Accessibility score** - WCAG compliance
- **Code complexity** - Cyclomatic complexity
- **Test coverage** - Impact on tests

## Safe Refactoring

The refactoring:

1. **Preserves API** - No breaking changes
2. **Maintains tests** - Tests should still pass
3. **Improves types** - Better TypeScript support
4. **Adds comments** - Documents non-obvious changes
5. **Keeps semantics** - Same DOM structure

## After Refactoring

1. **Review changes** - Understand improvements
2. **Run tests** - Verify tests still pass
3. **Check performance** - Benchmark improvements
4. **Update docs** - If API changed
5. **Deploy** - Roll out improvements

## Verification

After refactoring, verify:

- ✓ All tests pass
- ✓ No new console warnings
- ✓ No accessibility regressions
- ✓ Bundle size reduced or stable
- ✓ Render performance improved
- ✓ API unchanged (backward compatible)

## Next Steps

After refactoring:

1. **`lit-test-generator`** - Ensure tests updated
2. **`lit-a11y-audit`** - Verify accessibility
3. **`lit-build-optimizer`** - Optimize further

---

**Best Practice:** Refactor with a full test suite in place. Make small, atomic changes. Measure before and after. Keep PRs focused on a single refactoring pattern.

**When to Refactor:**
- ✓ Component code is hard to understand
- ✓ Performance is noticeably slow
- ✓ Accessibility issues found
- ✓ Type safety is poor
- ✓ Duplication is high
- ✓ During feature additions
- ✗ Just before release
- ✗ Without tests
