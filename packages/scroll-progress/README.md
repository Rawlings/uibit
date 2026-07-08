# @uibit/scroll-progress

A progress bar showing how far the user has scrolled on the page.

## Features

- **Fixed Positioning**: Stays at top of viewport
- **Smooth Animation**: GPU-accelerated CSS transitions
- **Customizable**: CSS variables for colors and height
- **Performance**: Throttled scroll events
- **Accessible**: Respects `prefers-reduced-motion`
- **Lightweight**: Minimal JavaScript

## Installation

```bash
pnpm add @uibit/scroll-progress
```

## Quick Start

```html
<uibit-scroll-progress></uibit-scroll-progress>

<style>
  uibit-scroll-progress {
    --uibit-scroll-progress-color: #000000;
    --uibit-scroll-progress-height: 4px;
  }
</style>
```

## API

### CSS Variables

| Variable Name | Type | Default | Description |
|---|---|---|---|
| `--uibit-scroll-progress-color` | color | `#000000` | Progress bar color |
| `--uibit-scroll-progress-height` | length | `4px` | Height of the progress bar |
| `--uibit-scroll-progress-bg` | color | `transparent` | Background color of the container |

### CSS Shadow Parts

| Part Name | Description |
|---|---|
| `progress` | The active progress bar element |

### Events

- `progress-change`: Fired when scroll percentage changes

## Browser Support

All modern browsers with ES2020 support.

## License

MIT
