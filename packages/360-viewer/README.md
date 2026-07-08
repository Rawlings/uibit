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
| `images` | string[] | `[]` | List of image source URLs for 360-degree rotation |
| `autoRotate` | boolean | `false` | Enable automatic image rotation |
| `rotationSpeed` | number | `150` | Auto-rotation speed in milliseconds per frame |
| `dragSensitivity` | number | `15` | Horizontal pixel drag distance required to trigger frame change |
| `showControls` | boolean | `true` | Show or hide overlay navigation buttons |
| `showProgressBar` | boolean | `true` | Show or hide bottom progress bar indicator |

### CSS Variables

| Variable Name | Type | Default | Description |
|---|---|---|---|
| `--uibit-360-viewer-bg` | color | `#f5f5f5` | Viewer background color |
| `--uibit-360-viewer-border` | border | `#e5e7eb` | Border around viewer element |
| `--uibit-360-viewer-button-bg` | color | `rgba(255, 255, 255, 0.7)` | Background color of navigation buttons |
| `--uibit-360-viewer-button-bg-hover` | color | `rgba(255, 255, 255, 0.9)` | Hover background color of navigation buttons |
| `--uibit-360-viewer-button-color` | color | `#374151` | Text/symbol color of navigation buttons |
| `--uibit-360-viewer-focus-color` | color | `#000000` | Border/focus ring color |
| `--uibit-360-viewer-progress-track-bg` | color | `rgba(0, 0, 0, 0.1)` | Background color of progress track |
| `--uibit-360-viewer-hint-bg` | color | `rgba(17, 24, 39, 0.7)` | Background color of "Drag to rotate" hint bubble |

### CSS Shadow Parts

| Part Name | Description |
|---|---|
| `viewer` | The main viewer container block |
| `image` | The displayed frame image element |
| `drag-hint` | The floating drag helper badge |
| `nav-button` | Style applied to both left and right buttons |
| `nav-button-prev` | Applied specifically to the left/previous button |
| `nav-button-next` | Applied specifically to the right/next button |
| `progress-track` | Bottom progress bar track container |
| `progress-bar` | Bottom progress fill indicator |

### Events

- `change`: Fired when display index/image changes. Detail contains `{ index: number, image: string }`

## Browser Support

All modern browsers with ES2020 support.

## License

MIT
