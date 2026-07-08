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

- `hotspots`: Array of hotspot objects with `id`, `x`, `y`, `label`
- `interactive`: Enable/disable interactions (default: true)

### Events

- `hotspot-click`: Fired when a hotspot is clicked

## Browser Support

All modern browsers with ES2020 support.

## License

MIT
