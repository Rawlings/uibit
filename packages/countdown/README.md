# @uibit/countdown

Countdown timer to a target date or duration with customizable formatting.

## Features

- **Target Date**: Countdown to a specific date/time
- **Duration**: Or countdown a fixed duration
- **Auto-Start**: Begin counting automatically
- **Custom Format**: Display days, hours, minutes, seconds
- **Events**: Get tick updates and completion notifications
- **Accessible**: Live regions for screen readers

## Installation

```bash
pnpm add @uibit/countdown
```

## Quick Start

```html
<!-- Countdown to a date -->
<uibit-countdown target="2025-12-25T00:00:00"></uibit-countdown>

<!-- Or countdown a duration (milliseconds) -->
<uibit-countdown duration="86400000"></uibit-countdown>

<script>
  const countdown = document.querySelector('uibit-countdown');
  countdown.addEventListener('countdown-tick', (e) => {
    console.log(`${e.detail.days}d ${e.detail.hours}h ${e.detail.minutes}m`);
  });
  countdown.addEventListener('countdown-complete', () => {
    console.log('Done!');
  });
</script>
```

## API

### Properties

- `target`: ISO date string for countdown target
- `duration`: Milliseconds to count down
- `autoStart`: Start counting on mount (default: true)
- `format`: Display format (default: "HH:MM:SS")

### Methods

- `start()`: Begin counting
- `stop()`: Pause counting

### Events

- `countdown-tick`: Fired every second with time details
- `countdown-complete`: Fired when reaching zero

### CSS Variables

Customize the countdown appearance with CSS variables:

| Variable Name | Type | Default | Description |
|---|---|---|---|
| `--uibit-countdown-font-family` | string | `monospace` | Font family of the countdown display |
| `--uibit-countdown-font-size` | length | `1.5rem` | Base font size of the timer |
| `--uibit-countdown-font-weight` | string | `bold` | Font weight of the timer |
| `--uibit-countdown-color` | color | `#000000` | Base text color |
| `--uibit-countdown-gap` | length | `1rem` | Gap spacing between units |
| `--uibit-countdown-unit-gap` | length | `0.5rem` | Vertical gap between value and label |
| `--uibit-countdown-value-font-size` | length | `2.5rem` | Font size of numerical value |
| `--uibit-countdown-value-min-width` | length | `80px` | Minimum width of numerical value to prevent shifts |
| `--uibit-countdown-label-font-size` | length | `0.8rem` | Font size of text labels |
| `--uibit-countdown-label-color` | color | `#4b5563` | Color of text labels |
| `--uibit-countdown-separator-font-size` | length | `2.5rem` | Font size of unit separator `:` |
| `--uibit-countdown-separator-color` | color | `#000000` | Color of unit separator `:` |

### CSS Shadow Parts

| Part Name | Description |
|---|---|
| `countdown` | The main flexbox container for the countdown timer |
| `unit` | Individual countdown unit wrapper (e.g. Days container) |
| `value` | The numerical display element for a unit |
| `label` | The text label element for a unit (e.g. "Days") |
| `separator` | The divider elements between units |

## Browser Support

All modern browsers with ES2020 support.

## License

MIT
