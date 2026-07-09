# UIBit Design System

Scandinavian — clean, minimal, spacious. Black and white as the foundation. Silence over decoration.

All values map directly to Tailwind CSS's built-in theme. Use Tailwind classes in docs/React code. Use the hex equivalents in Lit component styles (where Tailwind doesn't apply inside Shadow DOM).

---

## Principles

- **Less is more.** Every element earns its place.
- **Grayscale only.** No accent colors in defaults. Black, white, and gray.
- **Spacious.** Generous whitespace. Never cramped.
- **Consistent.** Values from the Tailwind theme scale, everywhere. No one-offs.
- **Standalone.** Each component is self-contained. No shared global CSS variables.

---

## Color — Tailwind `gray` scale

| Tailwind class | Hex | Usage |
|---|---|---|
| `black` | `#000000` | Primary action, focus rings, active states |
| `white` | `#ffffff` | Surfaces, text on dark |
| `gray-950` | `#030712` | — |
| `gray-900` | `#111827` | Primary text |
| `gray-800` | `#1f2937` | Secondary text |
| `gray-700` | `#374151` | Body text, button labels |
| `gray-600` | `#4b5563` | Muted text |
| `gray-500` | `#6b7280` | Placeholder, icons |
| `gray-400` | `#9ca3af` | Disabled text |
| `gray-300` | `#d1d5db` | Borders on colored bg |
| `gray-200` | `#e5e7eb` | Default border |
| `gray-100` | `#f3f4f6` | Subtle bg, chip bg |
| `gray-50` | `#f9fafb` | Section bg, card bg |

**Rule:** No blues, greens, or chromatic colors in component defaults. Focus rings are `black`.

---

## Typography

Font stack: `Inter, system-ui, -apple-system, sans-serif`  
Monospace: `ui-monospace, 'SF Mono', Menlo, monospace` → Tailwind `font-mono`

### Premium Fluid Scale

To create a balanced, premium feel across varying screens, UIBit components utilize a **fluid typography scale** defined via CSS variables and `clamp()`. This scale smoothly adjusts sizes relative to the viewport inline width.

| Token | CSS Variable | Fluid Value Range | Usage |
|---|---|---|---|
| `xs` | `--uibit-font-size-xs` | `0.75rem` ↔ `0.8125rem` | Labels, captions, meta |
| `sm` | `--uibit-font-size-sm` | `0.8125rem` ↔ `0.875rem` | Secondary text, controls, code |
| `base` | `--uibit-font-size-base` | `0.9375rem` ↔ `1.0625rem` | Body text, standard content |
| `lg` | `--uibit-font-size-lg` | `1.0625rem` ↔ `1.25rem` | Subheadings, card titles |
| `xl` | `--uibit-font-size-xl` | `1.25rem` ↔ `1.5rem` | Block / Section headings |
| `2xl` | `--uibit-font-size-2xl` | `1.5rem` ↔ `1.875rem` | Page sub-headings |
| `3xl` | `--uibit-font-size-3xl` | `1.875rem` ↔ `2.5rem` | Page titles, major headings |
| `4xl` | `--uibit-font-size-4xl` | `2.5rem` ↔ `3.5rem` | Hero text, display |
| `5xl` | `--uibit-font-size-5xl` | `3.5rem` ↔ `5.0rem` | High-impact numbers, graphics |

**Letter spacing (Tracking):**
* Tight (`-0.025em`): `--uibit-letter-spacing-tight` (used on headings/large displays)
* Normal (`0em`): `--uibit-letter-spacing-normal` (default body text)
* Wide (`0.05em`): `--uibit-letter-spacing-wide` (small inline elements)
* Widest (`0.1em`): `--uibit-letter-spacing-widest` (uppercase labels)

**Line height (Leading):**
* Tight (`1.25`): `--uibit-line-height-tight` (headings)
* Normal (`1.5`): `--uibit-line-height-normal` (secondary and code)
* Relaxed (`1.625`): `--uibit-line-height-relaxed` (default body paragraphs)

**Font Weights:**
* Normal (`400`): `--uibit-font-weight-normal`
* Medium (`500`): `--uibit-font-weight-medium`
* Semibold (`600`): `--uibit-font-weight-semibold`
* Bold (`700`): `--uibit-font-weight-bold`

### Encapsulation Rules

Each Lit component must declare its typography fallback defaults in `:host {}` to allow independent rendering when theme stylesheets are not loaded:

```css
:host {
  font-size: var(--uibit-component-font-size, var(--uibit-font-size-base, 1rem));
  font-weight: var(--uibit-component-font-weight, var(--uibit-font-weight-normal, 400));
  line-height: var(--uibit-component-line-height, var(--uibit-line-height-relaxed, 1.625));
}
```

---

## Spacing

Use Tailwind's default spacing scale. Key values:

| Tailwind | rem | px equiv |
|---|---|---|
| `1` | `0.25rem` | 4px |
| `2` | `0.5rem` | 8px |
| `3` | `0.75rem` | 12px |
| `4` | `1rem` | 16px |
| `5` | `1.25rem` | 20px |
| `6` | `1.5rem` | 24px |
| `8` | `2rem` | 32px |
| `10` | `2.5rem` | 40px |
| `12` | `3rem` | 48px |
| `16` | `4rem` | 64px |
| `20` | `5rem` | 80px |
| `24` | `6rem` | 96px |

---

## Border Radius

| Tailwind class | Value | Usage |
|---|---|---|
| `rounded-sm` | `0.125rem` | Tight inline elements |
| `rounded` | `0.25rem` | Chips, badges, code inline |
| `rounded-md` | `0.375rem` | Buttons |
| `rounded-lg` | `0.5rem` | Cards, panels, inputs |
| `rounded-xl` | `0.75rem` | Modals, popovers |
| `rounded-full` | `9999px` | Pills, circles |

---

## Shadows

| Tailwind class | Usage |
|---|---|
| `shadow-xs` | Subtle lift |
| `shadow-sm` | Cards |
| `shadow-md` | Popovers, dropdowns |
| `shadow-lg` | Elevated overlays |

Focus ring: `ring-2 ring-black` or in CSS `box-shadow: 0 0 0 2px #000000`.

---

## Motion

| Usage | Value |
|---|---|
| Hover color/bg | `transition-colors duration-150` → `150ms ease` |
| Reveals/fades | `transition-opacity duration-200` → `200ms ease` |
| Layout changes | `transition-all duration-300` → `300ms ease` |

---

## Units in component styles

Inside Lit Shadow DOM, Tailwind classes don't apply — use rem values that match the Tailwind scale above. **Never use px** (exception: bare `0`). For sub-pixel shadow values use `0.0625rem` (= 1px).

---

## CSS Custom Properties Convention

- Prefix: `--uibit-[component-name]-[property]`
- Define defaults in `:host {}` — no external dependency
- Use `var(--uibit-..., <fallback>)` so the component renders without consumer overrides
- Never rely on a parent component's variables

---

## Focus

All interactive elements must show a visible focus ring.  
Default: `outline: 0.125rem solid #000000; outline-offset: 0.125rem`  
or `box-shadow: 0 0 0 0.125rem #000000`

---

## Applied to Components

When writing or reviewing component styles, verify:

- [ ] No `px` values (use `rem` mapped to Tailwind scale)
- [ ] Colors from the Tailwind `gray` scale only (hex equivalents in component styles)
- [ ] No chromatic colors (blue, green, red) in defaults
- [ ] Border radius from Tailwind scale
- [ ] Spacing from Tailwind scale
- [ ] Focus rings are black
- [ ] Component defines its own CSS custom property defaults in `:host {}`
- [ ] No dependency on external or global CSS variables
