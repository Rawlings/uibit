# @uibit/360-viewer

Display 360-degree product rotations with multiple images and full touch support.

## Features

- **Image Rotation**: Cycle through images with mouse drag or touch swipe
- **Auto-Play**: Optional automatic rotation
- **Zoom Controls**: Pinch to zoom on touch devices
- **Responsive**: Works on all screen sizes
- **Accessible**: Keyboard navigation and ARIA labels
- **Performance**: Optimized image loading and rendering

## Installation

```bash
pnpm add @uibit/360-viewer
```

## Quick Start

```html
<uibit-360-viewer>
  <img src="product-0.jpg" slot="image" alt="Product view 0" />
  <img src="product-1.jpg" slot="image" alt="Product view 1" />
  <img src="product-2.jpg" slot="image" alt="Product view 2" />
</uibit-360-viewer>
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `autoPlay` | boolean | `false` | Enable automatic rotation |
| `rotationSpeed` | number | `100` | Speed of auto rotation (ms per image) |
| `allowZoom` | boolean | `true` | Enable zoom controls |

### Events

- `rotation-change`: Fired when the displayed image changes
- `zoom-change`: Fired when zoom level changes

## Browser Support

All modern browsers with ES2020 support.

## License

MIT
