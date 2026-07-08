# Scratch Reveal Component

A gamified, accessible web component that reveals hidden content by scratching away an opaque "silver" overlay. Perfect for promotions, surprise announcements, or interactive experiences.

## Installation

```bash
npm install @uibit/scratch-reveal
```

## Usage

### Basic Example

```html
<uibit-scratch-reveal>
  <div>You won $50!</div>
</uibit-scratch-reveal>
```

### With JavaScript

```javascript
import { ScratchReveal } from '@uibit/scratch-reveal';

const scratchPanel = document.querySelector('uibit-scratch-reveal');

// Listen for reveal event
scratchPanel.addEventListener('scratch-reveal', (e) => {
  console.log('Revealed at:', e.detail.revealPercentage + '%');
});

// Listen for progress updates
scratchPanel.addEventListener('scratch-progress', (e) => {
  console.log('Current reveal:', e.detail.revealPercentage + '%');
});

// Reset the panel
scratchPanel.reset();
```

## Attributes

No custom attributes.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `revealPercentage` | number | 0 | Current percentage of panel revealed (read-only) |

## Methods

| Method | Description |
|--------|-------------|
| `reset()` | Resets the panel to its original state |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `scratch-reveal` | `{ revealPercentage: number }` | Fired when 50% or more of the panel is revealed |
| `scratch-progress` | `{ revealPercentage: number }` | Fired continuously as the user scratches |

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--uibit-scratch-reveal-width` | 300px | Panel width |
| `--uibit-scratch-reveal-height` | 200px | Panel height |
| `--uibit-scratch-reveal-overlay-color` | #c0c0c0 | Color of the scratch-off overlay |
| `--uibit-scratch-reveal-background` | #f0f0f0 | Background color behind overlay |
| `--uibit-scratch-reveal-color` | #000000 | Text color of revealed content |
| `--uibit-scratch-reveal-font-size` | 1rem | Font size of revealed content |
| `--uibit-scratch-reveal-font-weight` | bold | Font weight of revealed content |
| `--uibit-scratch-reveal-border-radius` | 8px | Border radius of panel |
| `--uibit-scratch-reveal-padding` | 1rem | Padding inside panel |
| `--uibit-scratch-reveal-brush-size` | 40px | Size of scratch brush |
| `--uibit-scratch-reveal-cursor` | - | Custom cursor for scratch interaction |
| `--uibit-scratch-reveal-instructions-font-size` | 0.875rem | Font size of instructions text |
| `--uibit-scratch-reveal-instructions-color` | rgba(0, 0, 0, 0.6) | Color of instructions text |

## CSS Shadow Parts

| Part | Description |
|------|-------------|
| `container` | The outer scratch container block |
| `content` | The revealed content area |
| `canvas` | The scratching canvas overlay |
| `instructions` | The instruction text shown before scratching |

## Accessibility

- ARIA labels and roles for screen readers
- Touch and mouse support
- Keyboard-accessible through standard web component patterns
- High contrast overlay for visibility

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT
