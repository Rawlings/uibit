# @uibit/ab-test

A/B testing harness with automatic variant distribution and localStorage persistence.

## Features

- **Variant Distribution**: Weighted distribution (e.g., 50/50, 70/30)
- **Persistence**: localStorage keeps users consistent
- **Event Dispatch**: Know which variant was selected
- **Easy Integration**: Simple slot-based API
- **No Tracking**: Fully client-side, no external dependencies

## Installation

```bash
pnpm add @uibit/ab-test
```

## Quick Start

```html
<uibit-ab-test storage-key="my-test">
  <div slot="variant-a">
    <h1>Version A</h1>
    <p>This is variant A</p>
  </div>
  <div slot="variant-b">
    <h1>Version B</h1>
    <p>This is variant B</p>
  </div>
</uibit-ab-test>

<script>
  const test = document.querySelector('uibit-ab-test');
  test.addEventListener('variant-rendered', (e) => {
    console.log(`Rendered: ${e.detail.variant} (new: ${e.detail.isNewUser})`);
  });
</script>
```

## API

### Properties

- `storageKey`: localStorage key for persistence
- `variantDistribution`: Object with variant names and weights

### Events

- `variant-rendered`: Fired with `{ variant, isNewUser }`

## Browser Support

All modern browsers with localStorage support.

## License

MIT
