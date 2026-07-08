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
      style={{
        '--uibit-carousel-items-per-view': '1',
        '--uibit-carousel-gap': '16px'
      } as React.CSSProperties}
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

Customize the carousel layout and appearance with CSS variables:

| Variable Name | Type | Default | Description |
|---|---|---|---|
| `--uibit-carousel-gap` | length | `16px` | Gap between carousel items |
| `--uibit-carousel-duration` | duration | `300ms` | Scroll/snap transition speed |
| `--uibit-carousel-items-per-view` | number | `1` | Number of items visible at once |
| `--uibit-carousel-border-color` | color | `#e5e7eb` | Border color around the viewport and buttons |
| `--uibit-carousel-button-bg` | color | `#f3f4f6` | Default background color of control buttons |
| `--uibit-carousel-button-bg-hover` | color | `#e5e7eb` | Background color of control buttons on hover |
| `--uibit-carousel-indicator-bg` | color | `#e5e7eb` | Background color of inactive slide dots |
| `--uibit-carousel-indicator-active-bg` | color | `#000000` | Background color of the active slide dot |
| `--uibit-carousel-focus-outline-color` | color | `#000000` | Color of focus indicators on interactive parts |

### CSS Shadow Parts

| Part Name | Description |
|---|---|
| `carousel` | The main carousel grid/flex container |
| `viewport` | The overflow-hidden wrapper enclosing items |
| `content` | The scrollable element holding the items slot |
| `controls` | The bar layout containing buttons and indicators |
| `buttons` | The wrapper element for the navigation buttons |
| `button` | Style applied to both navigation buttons |
| `button-prev` | Applied specifically to the Prev button |
| `button-next` | Applied specifically to the Next button |
| `indicators` | The container element for dot indicators |
| `indicator` | Applied to all indicator dot buttons |
| `indicator-active` | Applied specifically to the active indicator dot button |

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
<uibit-carousel style="--uibit-carousel-items-per-view: 3; --uibit-carousel-gap: 20px;">
  <div slot="item">Item 1</div>
  <div slot="item">Item 2</div>
  <div slot="item">Item 3</div>
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
    --uibit-carousel-items-per-view: 1;
  }

  @media (min-width: 640px) {
    uibit-carousel {
      --uibit-carousel-items-per-view: 2;
    }
  }

  @media (min-width: 1024px) {
    uibit-carousel {
      --uibit-carousel-items-per-view: 4;
    }
  }
</style>

<uibit-carousel>
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
