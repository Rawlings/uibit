---
name: lit-test-generator
description: Generate comprehensive test suites for Lit web components
category: quality
tags: [testing, lit, web-components, vitest, happy-dom]
author: UIBit Team
---

# Lit Test Generator

Generates comprehensive test suites for UIBit components using **Vitest** and the **Happy DOM** testing environment.

## What It Does

Generates standard tests for UIBit components, located directly in `src/<component-name>.test.ts`, covering:

- **Initialization Tests:** Verify default attributes, properties, and CSS custom variables.
- **Reactivity & Lifecycle:** Test property mutability, template updates, and disconnected callbacks.
- **Custom Events:** Mock listener callbacks and verify event naming/detail payloads.
- **Keyboard Navigation & ARIA:** Validate focus controls, ARIA states, and key triggers (Enter, Space, arrows).
- **DOM & Slot Content:** Ensure fallback slots render when empty and handle nested consumer markup correctly.

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentPath` | string | ✓ | Path to component package (e.g., "components/scroll-progress") |
| `coverage` | string | | Target coverage detail: "basic" (default), "complete" (covers all inputs/events) |

## Usage Examples

### Generate Standard Component Tests
```bash
agent --skill lit-test-generator --args '{
  "componentPath": "components/scroll-progress"
}'
```

### Generate Complete Coverage Unit/Interaction Tests
```bash
agent --skill lit-test-generator --args '{
  "componentPath": "components/sentiment-bar",
  "coverage": "complete"
}'
```

---

## Test Implementation Reference

We use **Vitest** as the sole monorepo testing framework. Tests run at the workspace root using the Happy DOM browser environment. 

Do NOT use Web Test Runner, Mocha, Chai, or Open Web Components test fixture helpers (which are not installed).

### Standard Test Template (`src/component-name.test.ts`)

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './component-name';
import { ComponentName } from './component-name';

describe('ComponentName', () => {
  let element: ComponentName;

  beforeEach(async () => {
    // 1. Create the custom element using native DOM APIs
    element = document.createElement('uibit-component-name') as ComponentName;
    
    // 2. Append the element to the document body
    document.body.appendChild(element);
    
    // 3. Await Lit element compilation and initial render update completion
    await element.updateComplete;
  });

  afterEach(() => {
    // 4. Remove the element from the DOM to isolate test states
    element.remove();
  });

  it('renders default values correctly', () => {
    expect(element.active).toBe(false);
    expect(element.value).toBe(0);
  });

  it('updates rendering when properties change', async () => {
    element.active = true;
    
    // Always await updateComplete after changing properties before asserting DOM state!
    await element.updateComplete;

    const container = element.shadowRoot?.querySelector('.container');
    expect(container?.classList.contains('active')).toBe(true);
  });

  it('emits uibit-change custom event on interaction', async () => {
    const changeHandler = vi.fn();
    element.addEventListener('uibit-change', changeHandler as EventListener);

    // Trigger internal action
    element.triggerAction();

    expect(changeHandler).toHaveBeenCalled();
    const eventObj = changeHandler.mock.calls[0][0] as CustomEvent;
    expect(eventObj.detail.value).toBe(true);
  });

  it('respects slot override of property label fallback', async () => {
    // Check property default fallback first
    element.label = 'Default Label';
    await element.updateComplete;
    expect(element.shadowRoot?.textContent).toContain('Default Label');

    // Append slotted DOM child
    const slottedEl = document.createElement('span');
    slottedEl.slot = 'label';
    slottedEl.textContent = 'Custom Slotted Header';
    element.appendChild(slottedEl);
    
    await element.updateComplete;
    
    // Verify slot content overrides the fallback text
    const labelSlot = element.shadowRoot?.querySelector('slot[name="label"]') as HTMLSlotElement;
    expect(labelSlot).toBeTruthy();
  });
});
```

## Running & Verifying Tests

Tests are executed from the workspace root directory:

```bash
# Run all tests in the monorepo
pnpm test

# Run tests in watch mode
npx vitest

# Run tests for a specific component
npx vitest components/scroll-progress
```
