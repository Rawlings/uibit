---
name: lit-component-refactor
description: Refactor and optimize existing Lit web components
category: quality
tags: [refactoring, optimization, lit, performance]
author: UIBit Team
---

# Lit Component Refactor

Refactors and optimizes existing Lit web components within the UIBit monorepo to align them with best practices, improving architecture, performance, accessibility, and type safety.

## What It Does

Analyzes and refactors existing components to:
- **Base Class Alignment:** Migrate standard `LitElement` components to inherit from `UIBitElement` from `@uibit/core`.
- **Property & Attribute Naming:** Verify property configurations. CamelCase properties map automatically to kebab-case attributes via `UIBitElement`. Selector properties must end in `Selector` and map to `*-selector` attributes.
- **Composability (Properties to Slots):** Move static text content properties (e.g. `label`, `title`) to slots, keeping properties as optional fallbacks for backward compatibility.
- **Styling System (DESIGN.md):** Eliminate `px` units (using `rem` equivalents instead), ensure grayscale-only colors, black focus rings, CSS Custom Properties prefixed with `--uibit-[component-name]-*`, and decorate elements with shadow parts (`part="..."`).
- **Memory & Lifecycle Cleanup:** Convert manual event listeners to use `this.listen(...)` from `UIBitElement` for automatic garbage collection. Use `this.dispatchCustomEvent` for custom events.
- **Reactivity Optimization:** Remove manual `requestUpdate()` calls for standard reactive properties.
- **Vitest Testing Integration:** Update component tests to use Vitest + Happy DOM in `src/`.

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentPath` | string | ✓ | Path to component package (e.g., "packages/button") |
| `focus` | string | | Refactor focus: "all" (default), "performance", "accessibility", "styling", "types" |

## Usage Examples

### Scaffold/Run a Full Component Refactoring
```bash
claude --skill lit-component-refactor --args '{
  "componentPath": "packages/text-clamp",
  "focus": "all"
}'
```

### Refactor Style Declarations to follow DESIGN.md
```bash
claude --skill lit-component-refactor --args '{
  "componentPath": "packages/carousel",
  "focus": "styling"
}'
```

---

## Refactoring Reference Patterns

### 1. Property Optimization & Suffix Alignment
Properties referencing DOM selectors must end in the `Selector` suffix and map to `-selector` attributes. Other properties must map camelCase to kebab-case.

**Before:**
```typescript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class TextRotator extends LitElement {
  @property({ type: String }) target: string = ''; // Selector
  @property({ type: Boolean }) autoPlay = false;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('target')) {
      this.requestUpdate(); // Manual update is redundant
    }
  }
}
```

**After (Standardized):**
```typescript
import { UIBitElement } from '@uibit/core';
import { customElement } from '@uibit/core';
import { property } from 'lit/decorators.js';

@customElement('uibit-text-rotator')
export class TextRotator extends UIBitElement {
  @property({ type: String, attribute: 'target-selector' }) targetSelector = '';
  @property({ type: Boolean, attribute: 'auto-play' }) autoPlay = false;

  // UIBitElement automatically maps autoPlay -> auto-play and targetSelector -> target-selector.
  // No manual requestUpdate() needed for reactive properties.
}
```

### 2. Styling System Optimization (DESIGN.md)
Expose styling variables and shadow parts. Never use `px` values. Colors must belong to the grayscale spectrum.

**Before:**
```typescript
// styles.ts
export const styles = css`
  :host {
    display: inline-block;
  }
  
  button {
    padding: 8px 16px; /* px is forbidden */
    border-radius: 4px; /* px is forbidden */
    background: #007bff; /* Chromatic colors forbidden */
    color: #ffffff;
  }

  button:focus-visible {
    outline: 2px solid #007bff; /* px and chromatic forbidden */
  }
`;
```

**After (Standardized):**
```typescript
// styles.ts
export const styles = css`
  :host {
    display: inline-block;
  }
  
  button {
    padding: var(--uibit-button-padding, 0.5rem 1rem); /* rem units matching spacing scale */
    border-radius: var(--uibit-button-radius, 0.25rem); /* rem units matching radius scale */
    background: var(--uibit-button-bg, #000000); /* Grayscale palette only */
    color: var(--uibit-button-color, #ffffff);
    border: 0.0625rem solid var(--uibit-button-border, #e5e7eb); /* 0.0625rem = 1px */
    transition: background-color 150ms ease;
  }

  button:hover {
    background: var(--uibit-button-bg-hover, #1f2937);
  }

  button:focus-visible {
    outline: 0.125rem solid var(--uibit-focus-color, #000000); /* black focus ring */
    outline-offset: 0.125rem;
  }
`;
```

### 3. Composability Refactoring (Properties to Slots)
Expose slots for content instead of attributes. Wrap fallback rendering in slot tags for backward compatibility.

**Before:**
```typescript
// text-clamp.ts
export class TextClamp extends UIBitElement {
  @property({ type: String }) text = '';

  render() {
    return html`<div class="content">${this.text}</div>`;
  }
}
```

**After (Standardized):**
```typescript
// text-clamp.ts
export class TextClamp extends UIBitElement {
  @property({ type: String }) text = '';

  render() {
    return html`
      <div class="content" part="content">
        <slot>${this.text}</slot>
      </div>
    `;
  }
}
```

### 4. Event Handler & Listener Optimization
Use `this.listen(...)` to add listeners that clean themselves up automatically. Use `this.dispatchCustomEvent` for firing events.

**Before:**
```typescript
connectedCallback() {
  super.connectedCallback();
  window.addEventListener('resize', this._handleResize);
}

disconnectedCallback() {
  super.disconnectedCallback();
  window.removeEventListener('resize', this._handleResize);
}

private _fireEvent() {
  this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
}
```

**After (Standardized):**
```typescript
connectedCallback() {
  super.connectedCallback();
  this.listen(window, 'resize', this._handleResize, { passive: true });
}

// No disconnectedCallback listener cleanup needed - UIBitElement handles this!

private _fireEvent() {
  this.dispatchCustomEvent('uibit-change', { value: this.value });
}
```

---

## Refactoring Checklist

- [ ] Component inherits from `UIBitElement` from `@uibit/core`.
- [ ] Registered via `@customElement` from `@uibit/core`.
- [ ] No `px` values are used in `styles.ts` (use `rem` equivalents, e.g. `0.0625rem` for 1px).
- [ ] Colors are grayscale-only (no chromatic colors in default styles).
- [ ] Focus rings are black (`#000000`).
- [ ] Custom CSS variables default in `:host` and are prefixed with `--uibit-[component-name]-*`.
- [ ] Sub-elements exposed for style overrides via `part="..."` attributes.
- [ ] Properties referencing selectors end in `Selector` and map to `*-selector` attributes.
- [ ] Visual labels, titles, and body content use slots instead of static string properties.
- [ ] User-facing default strings are localized using `msg(...)` from `@uibit/core`.
- [ ] Custom events use `this.dispatchCustomEvent(...)`.
- [ ] Event listeners use `this.listen(target, type, callback)`.
- [ ] Component JSDocs correctly annotate `@cssprop` and `@csspart` for CEM generation.
- [ ] Vitest tests exist in `src/<component-name>.test.ts` using standard describe/it block.
