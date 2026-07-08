---
name: lit-a11y-audit
description: Comprehensive accessibility audit of Lit web components
category: quality
tags: [accessibility, a11y, audit, wcag, aria]
author: UIBit Team
---

# Lit Component A11y Audit

Performs a comprehensive accessibility audit of Lit web components, checking for WCAG 2.1 compliance, ARIA best practices, and semantic HTML standards.

## What It Does

Audits:

- **Semantic HTML** - Proper use of `<button>`, `<input>`, `<label>`, etc.
- **ARIA attributes** - Correct `role`, `aria-label`, `aria-describedby`, etc.
- **Keyboard navigation** - Tab order, focus management, keyboard event handlers
- **Visual accessibility** - Color contrast, focus indicators, text sizing
- **Screen reader support** - Proper announcements, alt text, live regions
- **Form accessibility** - Labels, error messages, required indicators
- **Interactive elements** - Click targets, hover states, disabled states

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentPath` | string | ✓ | Path to component package (e.g., "packages/button") |
| `wcagLevel` | string | | Compliance level: A, AA (default), AAA |
| `interactive` | boolean | | Check interactive elements (default: true) |
| `forms` | boolean | | Check form elements (default: true) |
| `visual` | boolean | | Check visual design (default: true) |

## Usage Examples

### Quick Audit
```bash
claude --skill lit-a11y-audit --args '{
  "componentPath": "packages/button"
}'
```

### Full WCAG AAA Compliance Check
```bash
claude --skill lit-a11y-audit --args '{
  "componentPath": "packages/form-input",
  "wcagLevel": "AAA",
  "interactive": true,
  "forms": true,
  "visual": true
}'
```

### Visual Design Audit Only
```bash
claude --skill lit-a11y-audit --args '{
  "componentPath": "packages/card",
  "interactive": false,
  "forms": false,
  "visual": true
}'
```

## What It Checks

### Semantic HTML (Level A)
- ✓ Uses semantic elements (`<button>`, `<nav>`, `<main>`, etc.)
- ✓ No `<div role="button">` where `<button>` should be
- ✓ Proper heading hierarchy
- ✓ List structure (`<ul>`, `<ol>`, `<li>`)

### ARIA (Level A)
- ✓ `aria-label` or `aria-labelledby` on unlabeled elements
- ✓ Correct `role` values
- ✓ `aria-live` regions for dynamic content
- ✓ No contradictory ARIA (e.g., `role="button"` on `<input>`)
- ✓ Required ARIA attributes present

### Keyboard Navigation (Level A)
- ✓ All interactive elements keyboard accessible
- ✓ Logical tab order
- ✓ Escape key handling for modals/popovers
- ✓ Arrow keys for menu/listbox navigation
- ✓ Enter/Space for activation

### Focus Management (Level A)
- ✓ Visible focus indicators
- ✓ Focus outline contrast (4.5:1 minimum)
- ✓ Focus trap in modals
- ✓ Return focus after dismissal
- ✓ No keyboard trap (unless intentional)

### Color Contrast (Level AA)
- ✓ Text-to-background 4.5:1 (normal text)
- ✓ Text-to-background 3:1 (large text)
- ✓ UI component contrast 3:1
- ✓ No color-only information conveyance

### Form Accessibility (Level A)
- ✓ All form inputs have associated `<label>`
- ✓ Error messages associated with inputs
- ✓ Required fields indicated
- ✓ Input validation messages accessible
- ✓ Success/confirmation messages announced

### Screen Reader (Level A)
- ✓ Purpose is clear without visual context
- ✓ State changes announced
- ✓ Error messages descriptive
- ✓ Hidden elements properly hidden
- ✓ Decorative images have `alt=""`

## Report Output

The audit generates a report with:

1. **Summary** - Pass/fail by category, overall compliance level
2. **Violations** - Grouped by severity (Critical, Major, Minor)
3. **Suggestions** - Specific, actionable fixes with code examples
4. **Patterns** - Common issues across the codebase
5. **Test Cases** - Accessibility test cases to add

## Example Report Structure

```
ACCESSIBILITY AUDIT: @uibit/button
═══════════════════════════════════════════

SUMMARY
  Overall: FAIL (AA compliance)
  ✓ Semantic HTML: PASS
  ✗ Keyboard Navigation: FAIL
  ✓ ARIA Attributes: PASS
  ✗ Visual: FAIL

CRITICAL (Fix immediately)
  [1] Missing focus indicator
      Location: src/button.styles.ts:45
      Issue: Button has no visible focus state
      Fix: Add :focus-visible { outline: 2px solid #0066cc; }

MAJOR (Fix before release)
  [2] Contrast insufficient
      Location: src/button.styles.ts
      Issue: Text color #888 on #f0f0f0 = 3.2:1 (need 4.5:1)
      Fix: Change text-color to #555 (contrast: 5.1:1)

TESTS TO ADD
  □ Keyboard navigation test
  □ Focus indicator screenshot test
  □ Color contrast verification
```

## Integration

The audit works with:

- **Storybook** - Can audit component stories
- **Web Test Runner** - Generates test cases
- **axe-core** - Uses industry-standard accessibility engine
- **GitHub Actions** - Can run in CI/CD pipeline

## After Audit

1. **Review violations** - Prioritize by severity
2. **Make fixes** - Use suggested code examples
3. **Add tests** - Use generated test cases
4. **Re-audit** - Verify fixes with `lit-a11y-audit` again
5. **Document** - Update README with accessibility notes

## Next Steps

After audit, consider using:

1. **`lit-test-generator`** - Generate accessibility tests
2. **`lit-component-refactor`** - Refactor for accessibility
3. **`lit-docs-generator`** - Document accessibility features

---

**Best Practice:** Run this audit early and often—it's much cheaper to fix accessibility in development than after release.

**WCAG Levels:**
- **A** (Minimum) - Basic accessibility
- **AA** (Recommended) - Standard web accessibility
- **AAA** (Enhanced) - Best-in-class accessibility
