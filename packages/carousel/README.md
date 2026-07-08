# @uibit/carousel

A native, accessible carousel web component built with Lit.js. Uses CSS scroll-snap for smooth scrolling and scroll-driven animations for enhanced interactivity.

## Features

- ✨ **Native CSS Scroll-Snap** – Smooth, performant scrolling without JavaScript libraries
- 🎬 **Scroll-Driven Animations** – CSS `animation-timeline` for scroll-based effects
- ♿ **Accessible** – ARIA labels, keyboard navigation (arrow keys), focus management
- 📱 **Responsive** – Configurable items per view and gap
- 🎯 **Touch & Swipe** – Works seamlessly on touch devices
- 🔄 **Auto-Play** – Optional automatic slide cycling with configurable interval
- 🎨 **Customizable** – CSS variables for easy theming
- 📦 **Lightweight** – Built on Lit.js, minimal bundle impact

## Installation

```bash
pnpm add @uibit/carousel
```

## Quick Start

### HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import '@uibit/carousel';
    </script>
  </head>
  <body>
    <uibit-carousel auto-play>
      <div slot="item">
        <img src="slide-1.jpg" alt="Slide 1" />
      </div>
      <div slot="item">
        <img src="slide-2.jpg" alt="Slide 2" />
      </div>
      <div slot="item">
        <img src="slide-3.jpg" alt="Slide 3" />
      </div>
    </uibit-carousel>
  </body>
</html>
```

### React

```tsx
import '@uibit/carousel';

function MyCarousel() {
  return (
    <uibit-carousel
      autoPlay={true}
      autoPlayInterval={5000}
      itemsPerView={1}
      gap={16}
    >
      <div slot="item"><img src="slide-1.jpg" alt="Slide 1" /></div>
      <div slot="item"><img src="slide-2.jpg" alt="Slide 2" /></div>
      <div slot="item"><img src="slide-3.jpg" alt="Slide 3" /></div>
    </uibit-carousel>
  );
}
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `autoPlay` | boolean | `false` | Enable automatic slide cycling |
| `autoPlayInterval` | number | `5000` | Interval in milliseconds between auto-play slides |
| `loop` | boolean | `true` | Allow cycling through slides in a loop |
| `itemsPerView` | number | `1` | Number of items visible at once (responsive) |
| `gap` | number | `16` | Gap between carousel items in pixels |
| `duration` | number | `300` | Scroll animation duration in milliseconds |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `prev()` | `prev(): void` | Navigate to previous slide |
| `next()` | `next(): void` | Navigate to next slide |
| `goToSlide()` | `goToSlide(index: number): void` | Navigate to specific slide index |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `slide-change` | `{ index: number, totalSlides: number }` | Fires when active slide changes |

### CSS Variables

Customize the carousel appearance with CSS variables:

```css
uibit-carousel {
  --carousel-gap: 1rem;
  --carousel-duration: 300ms;
  --carousel-items-per-view: 1;
  --carousel-border-color: #e5e7eb;
  --carousel-button-bg: #f3f4f6;
  --carousel-button-bg-hover: #e5e7eb;
  --carousel-indicator-bg: #d1d5db;
  --carousel-indicator-active-bg: #374151;
}
```

## Usage Examples

### Basic Carousel

```html
<uibit-carousel>
  <div slot="item">Slide 1</div>
  <div slot="item">Slide 2</div>
  <div slot="item">Slide 3</div>
</uibit-carousel>
```

### Auto-Play with Custom Interval

```html
<uibit-carousel auto-play auto-play-interval="3000">
  <img slot="item" src="image-1.jpg" alt="Slide 1" />
  <img slot="item" src="image-2.jpg" alt="Slide 2" />
  <img slot="item" src="image-3.jpg" alt="Slide 3" />
</uibit-carousel>
```

### Multiple Items Per View

```html
<uibit-carousel items-per-view="3" gap="20">
  <div slot="item" style="flex: 0 0 calc((100% - 40px) / 3)">Item 1</div>
  <div slot="item" style="flex: 0 0 calc((100% - 40px) / 3)">Item 2</div>
  <div slot="item" style="flex: 0 0 calc((100% - 40px) / 3)">Item 3</div>
  <!-- More items... -->
</uibit-carousel>
```

### With Event Handling

```html
<uibit-carousel id="carousel">
  <div slot="item">Slide 1</div>
  <div slot="item">Slide 2</div>
</uibit-carousel>

<script>
  const carousel = document.getElementById('carousel');
  carousel.addEventListener('slide-change', (event) => {
    console.log(`Current slide: ${event.detail.index + 1}`);
  });
</script>
```

### Programmatic Control

```html
<div>
  <button onclick="carousel.prev()">← Prev</button>
  <button onclick="carousel.next()">Next →</button>
  <button onclick="carousel.goToSlide(0)">Go to Start</button>
</div>

<uibit-carousel id="carousel">
  <div slot="item">Slide 1</div>
  <div slot="item">Slide 2</div>
  <div slot="item">Slide 3</div>
</uibit-carousel>

<script>
  const carousel = document.getElementById('carousel');
</script>
```

### Responsive with CSS

```html
<style>
  uibit-carousel {
    --carousel-items-per-view: 1;
  }

  @media (min-width: 640px) {
    uibit-carousel {
      --carousel-items-per-view: 2;
    }
  }

  @media (min-width: 1024px) {
    uibit-carousel {
      --carousel-items-per-view: 4;
    }
  }
</style>

<uibit-carousel gap="16">
  <div slot="item">Item 1</div>
  <div slot="item">Item 2</div>
  <div slot="item">Item 3</div>
  <div slot="item">Item 4</div>
</uibit-carousel>
```

## Accessibility

The carousel component is built with accessibility in mind:

- **Keyboard Navigation**: Use arrow keys to navigate slides
- **ARIA Labels**: Proper labels and roles for screen readers
- **Focus Management**: All interactive elements are focusable
- **Semantic HTML**: Uses proper HTML elements for structure

## Browser Support

- Chrome/Edge 93+
- Firefox 91+
- Safari 16.4+
- All modern browsers with ES2020 support

## License

MIT – See [LICENSE](../../LICENSE)
