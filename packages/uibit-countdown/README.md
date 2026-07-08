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

## Browser Support

All modern browsers with ES2020 support.

## License

MIT
