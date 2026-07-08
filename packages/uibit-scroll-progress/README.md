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
    --progress-color: #3b82f6;
    --progress-height: 4px;
  }
</style>
```

## API

### CSS Variables

- `--progress-color`: Progress bar color
- `--progress-height`: Height of the progress bar (default: 4px)
- `--progress-bg`: Background color

### Events

- `progress-change`: Fired when scroll percentage changes

## Browser Support

All modern browsers with ES2020 support.

## License

MIT
