# @uibit/hotspot

Interactive hotspots on images that open popovers or links.

## Features

- **Positioned Hotspots**: Define spots with x/y coordinates
- **Custom Content**: Add text, links, or custom HTML
- **Click Handlers**: Dispatch events for custom logic
- **Touch Support**: Works seamlessly on mobile
- **Accessible**: ARIA labels and keyboard navigation
- **Responsive**: Scales with image

## Installation

```bash
pnpm add @uibit/hotspot
```

## Quick Start

```html
<uibit-hotspot>
  <img src="product.jpg" alt="Product with hotspots" />
</uibit-hotspot>

<script>
  const hotspot = document.querySelector('uibit-hotspot');
  hotspot.hotspots = [
    { id: '1', x: 30, y: 40, label: 'Feature 1' },
    { id: '2', x: 70, y: 60, label: 'Feature 2' },
  ];
</script>
```

## API

### Properties

- `hotspots`: Array of hotspot objects with `id`, `x`, `y`, `title`, `content`
- `interactive`: Enable/disable interactions (default: true)
- `trigger`: Trigger interaction method: `'click'` or `'hover'` (default: `'click'`)

### Slots

| Slot Name | Description |
|---|---|
| *default* | The main image or background media to overlay hotspots onto |
| `popover-[id]` | Custom popover card markup for a specific hotspot (e.g. `popover-1`, `popover-2`). Falls back to `spot.title` and `spot.content` properties. |

### CSS Variables

| Variable Name | Type | Default | Description |
|---|---|---|---|
| `--uibit-hotspot-trigger-size` | length | `32px` | Size of the hotspot trigger dot |
| `--uibit-hotspot-trigger-bg` | color | `rgba(0, 0, 0, 0.6)` | Background color of the trigger dot |
| `--uibit-hotspot-trigger-bg-hover` | color | `rgba(0, 0, 0, 0.85)` | Background color of the trigger dot on hover/active |
| `--uibit-hotspot-trigger-border` | border | `2px solid #ffffff` | Border of the trigger dot |
| `--uibit-hotspot-trigger-color` | color | `#ffffff` | Text/symbol color inside trigger dot |
| `--uibit-hotspot-popover-bg` | color | `rgba(255, 255, 255, 0.95)` | Background color of the popover content card |
| `--uibit-hotspot-popover-color` | color | `#111827` | Main text color in popover |
| `--uibit-hotspot-popover-content-color` | color | `#4b5563` | Paragraph content color in popover |
| `--uibit-hotspot-popover-border` | border | `1px solid rgba(0, 0, 0, 0.1)` | Border of the popover card |
| `--uibit-hotspot-popover-border-radius` | length | `12px` | Border radius of the popover card |
| `--uibit-hotspot-popover-shadow` | shadow | `0 10px 25px -5px rgba(...)` | Box shadow of the popover card |
| `--uibit-hotspot-focus-outline` | shadow | `0 0 0 3px #000000` | Focus shadow ring around trigger |
| `--uibit-hotspot-focus-outline-color` | color | `#000000` | Outline color of the popover close button |

### CSS Shadow Parts

| Part Name | Description |
|---|---|
| `container` | The container element enclosing slots and hotspots |
| `wrapper` | The relative wrapper around each hotspot trigger and popover |
| `trigger` | The interactive hotspot trigger button element |
| `trigger-active` | Added to the trigger when its popover is active |
| `popover` | The popover dialog card element |
| `popover-content` | The content container inside the popover card |
| `popover-close` | The button to close the popover details |

### Events

- `hotspot-click`: Fired when a hotspot is clicked

## Browser Support

All modern browsers with ES2020 support.

## License

MIT
