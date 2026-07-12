---
name: lit-a11y-audit
description: Comprehensive accessibility audit of Lit web components
category: quality
tags: [accessibility, a11y, audit, wcag, aria]
author: UIBit Team
---

# Lit Component A11y Audit

Performs a comprehensive accessibility audit of Lit web components, verifying WCAG 2.1 Level AA compliance, keyboard navigation, and proper ARIA semantics.

## What It Does

Audits components for:
- **Semantic HTML:** Proper use of native elements (`<button>`, `<input>`, `<label>`, `<dialog>`) inside shadow roots.
- **ARIA Semantics:** Valid role declarations, matching attributes (e.g. `aria-expanded`, `aria-checked`), and custom element labels.
- **Keyboard Access:** Tab navigation order, arrow-key layouts, activation states (Enter/Space key handlers), and modal focus traps.
- **Screen Reader Support:** Announcement of dynamic state changes, screen-reader-only labels, and **localization** (ensuring all user-facing fallback text is localized via `msg` from `@uibit/core`).
- **Visual Design (DESIGN.md):** Focus ring presence and size (defined in `rem` only: `0.125rem` solid black, with offset), color contrast (4.5:1 ratio for text, 3:1 for graphical objects), and target click sizes (minimum `2.75rem`).

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentPath` | string | ✓ | Path to component package (e.g., "components/scroll-progress") |
| `wcagLevel` | string | | Compliance level: "A", "AA" (default), "AAA" |

## Usage Examples

### Run Accessibility Audit
```bash
claude --skill lit-a11y-audit --args '{
  "componentPath": "components/hotspot"
}'
```

### Run Strict WCAG AAA Compliance Audit
```bash
claude --skill lit-a11y-audit --args '{
  "componentPath": "components/consent-guard",
  "wcagLevel": "AAA"
}'
```

---

## Auditing Guidelines & Checklist

### 1. Semantic Elements & Click Targets
- **Interactive elements:** Use native `<button>` or `<a href="...">` instead of styling `<div>` or `<span>` with click handlers.
- **Click targets:** Ensure touch targets are at least `2.75rem` or declare CSS variables to let consumers scale them.

### 2. Keyboard & Focus Management
- **Focus Ring:** Every interactive element must display a visible outline when focused. Outline sizes must be in `rem` (e.g. `outline: 0.125rem solid #000000; outline-offset: 0.125rem;`). Never hide outlines with `outline: none;` without providing a focus ring equivalent.
- **Keyboard Events:** If mapping custom elements to controls (menus, tabs, carousels), listen for and implement keyboard events (Arrow keys, Space/Enter to activate, Escape to close).
- **Focus Trap:** Overlays and dialogs must implement a focus trap. On open, focus must move to the first element; on close, focus must return to the trigger element.

### 3. ARIA Semantics
- **Labels:** Custom inputs or buttons must support label mapping (`aria-label` or `aria-labelledby`).
- **Roles:** Verify that ARIA roles represent the structure (e.g., `role="progressbar"` for status elements, `role="tooltip"` for hover info).
- **Dynamic States:** Update attributes dynamically (e.g., `aria-valuenow` on scroll indicators, `aria-hidden` on collapsed states).

### 4. Localization / I18n
- **User-Facing Strings:** Check that all hardcoded strings intended for screen reader announcements are wrapped in `msg` from `@uibit/core` (e.g. `aria-label=${msg('Close dialog')}`).

### 5. Automated Accessibility Testing (Vitest)
Verify that accessibility tests exist in `src/<component-name>.test.ts` and test keyboard events:

```typescript
it('handles keyboard navigation and activation', async () => {
  const element = document.createElement('uibit-my-button') as MyButton;
  document.body.appendChild(element);
  await element.updateComplete;

  const clickSpy = vi.fn();
  element.addEventListener('click', clickSpy);

  element.focus();
  element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

  expect(clickSpy).toHaveBeenCalled();
  element.remove();
});
```

---

## Example Audit Report

```
ACCESSIBILITY AUDIT: @uibit/signature-pad
═══════════════════════════════════════════

SUMMARY
  Overall: FAIL (AA compliance)
  ✓ Semantic HTML: PASS
  ✗ Keyboard Navigation: FAIL
  ✓ ARIA Attributes: PASS
  ✗ Visual: FAIL

CRITICAL (Fix immediately)
  [1] Focus indicator using forbidden px unit
      Location: src/styles.ts:24
      Issue: Focus visible outline uses px: "outline: 2px solid #000;"
      Fix: Replace with rem scale: "outline: 0.125rem solid #000000;"

  [2] Target sizing too small for pointer taps
      Location: src/styles.ts:56
      Issue: Signature clear button is less than 2.75rem.
      Fix: Set height/width to var(--uibit-signature-pad-btn-size, 2.75rem).

MAJOR (Fix before release)
  [3] Text styling has insufficient contrast
      Location: src/styles.ts:72
      Issue: Muted instruction label on canvas has contrast of 3.2:1 (need 4.5:1)
      Fix: Lighten/darken text color based on gray scale (e.g. gray-600 #4b5563).
```
