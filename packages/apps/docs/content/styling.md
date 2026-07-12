# Styling & Theming

UIBit components are Shadow DOM encapsulated, which gives them complete style isolation. Customisation happens entirely through CSS custom properties — you never need to reach into component internals.

## Setup

Import the theme file once in your root stylesheet. This sets all default tokens on `:root` — components will inherit them automatically.

```css
@import "@uibit/core/theme.css";
```

## Token hierarchy

Tokens are layered. Override at the highest level that makes sense — changing a palette variable ripples down through everything that references it.

### Palette (Tier 1)
Raw color values. These are the ground truth — nothing below this tier defines a hex value directly.
`--uibit-color-gray-100, --uibit-color-gray-900`

### Semantic (Tier 2)
Contextual tokens shared across all components. This is where most overrides happen.
`--uibit-border-color, --uibit-radius-lg, --uibit-text-primary`

### Component (Tier 3)
Scoped per component. Automatically fall back to semantic tokens by default.
`--uibit-carousel-border-color, --uibit-table-max-height`

## Token reference

These are the semantic tokens you'll override most often. All are defined in `@uibit/core/theme.css` and have dark mode counterparts.

### Colours
- `--uibit-border-color` (Light: `gray-200`, Dark: `gray-800`): Borders on all components
- `--uibit-focus-color` (Light: `black`, Dark: `white`): Focus ring colour
- `--uibit-bg-base` (Light: `white`, Dark: `gray-950`): Root background
- `--uibit-bg-surface` (Light: `white`, Dark: `gray-900`): Raised surface background
- `--uibit-bg-subtle` (Light: `gray-50`, Dark: `gray-900`): Subtle fills, stripes
- `--uibit-text-primary` (Light: `gray-900`, Dark: `gray-100`): Primary text
- `--uibit-text-secondary` (Light: `gray-800`, Dark: `gray-200`): Secondary text
- `--uibit-text-muted` (Light: `gray-600`, Dark: `gray-400`): Placeholder, labels

### Border radius
- `--uibit-radius-sm` (Default: `0.125rem`): Small elements, badges
- `--uibit-radius-md` (Default: `0.25rem`): Inputs, chips
- `--uibit-radius-lg` (Default: `0.375rem`): Panels, cards
- `--uibit-radius-xl` (Default: `0.5rem`): Modals, popovers
- `--uibit-radius-2xl` (Default: `0.75rem`): Large containers

### Spacing
- `--uibit-spacing-1` (Default: `0.25rem`): Spacing base 1
- `--uibit-spacing-2` (Default: `0.5rem`): Spacing base 2
- `--uibit-spacing-4` (Default: `1rem`): Spacing base 4
- `--uibit-spacing-6` (Default: `1.5rem`): Spacing base 6

### Typography
- `--uibit-font-sans` (Default: `inherit`): Sans-serif font family
- `--uibit-font-mono` (Default: `inherit`): Monospace font family
- `--uibit-font-size-sm` (Default: `fluid ~0.875rem`): Small text, labels
- `--uibit-font-size-base` (Default: `fluid ~1rem`): Body text
- `--uibit-font-size-lg` (Default: `fluid ~1.125rem`): Subheadings

## Density

Set `data-density` on `:root` to scale all component spacing and font sizes proportionally. Compact works well for data-dense interfaces; spacious suits content-heavy or marketing contexts.

- **compact**: Spacing `0.7×`, Font scale `0.95×` (Dense UIs, admin tools)
- **normal**: Spacing `1×`, Font scale `1×` (Default — no attribute needed)
- **spacious**: Spacing `1.35×`, Font scale `1.05×` (Content sites, marketing)

```html
<!-- Set on the root element -->
<html data-density="compact">

<!-- Or scope it to a section -->
<div data-density="spacious">
  <uibit-carousel></uibit-carousel>
</div>
```

## Dark mode

All semantic tokens have dark mode counterparts declared in `theme.css`. Dark mode activates via two mechanisms — you can use either or both.

### Via class
Add the `.dark` class to `<html>` — useful when your app manages theme state in JS.
```html
<html class="dark">
  <!-- all UIBit components switch to dark tokens -->
</html>
```

### Via data attribute
```html
<html data-theme="dark">
  ...
</html>
```

### Via system preference
If neither `.dark` nor `data-theme` is set, components automatically respect `prefers-color-scheme`. Opt out by explicitly setting `data-theme="light"`.

## Font inheritance

Both `--uibit-font-sans` and `--uibit-font-mono` default to `inherit`, so whatever font your host app sets is adopted automatically. Override them explicitly if you need components to differ from the surrounding page.

```css
:root {
  --uibit-font-sans: 'Geist', system-ui, sans-serif;
  --uibit-font-mono: 'Geist Mono', monospace;
}
```

## Customisation examples

### Global overrides
Redefine semantic tokens on `:root` to change the default look across every component at once.
```css
:root {
  --uibit-border-color: #3b82f6;
  --uibit-radius-lg: 0.125rem;
  --uibit-font-sans: 'Inter', sans-serif;
}
```

### Scoped theme variant
Wrap components in a selector to create a design variant without touching globals — useful for embedding components in different visual contexts on the same page.
```css
.neo-brutalist {
  --uibit-border-color: #000000;
  --uibit-radius-lg: 0rem;
  --uibit-focus-color: #facc15;
}
```

### Per-component override
Target a component-specific token when you only want to change one component's appearance. Find each component's available tokens in its API reference.
```css
uibit-table {
  --uibit-table-max-height: 40rem;
}

uibit-carousel {
  --uibit-carousel-border-color: transparent;
}
```
