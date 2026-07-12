# Browser Support

UIBit targets modern browsers and relies on widespread web standards like Custom Elements, Shadow DOM, and modern CSS layout features.

## Supported Environments

| Browser | Minimum Version |
| :--- | :--- |
| Chrome / Edge | 90+ |
| Firefox | 90+ |
| Safari (macOS/iOS) | 15+ |
| Opera | 80+ |

## Graceful Degradation

Some components utilize advanced CSS features (like Scroll-Driven Animations or `@property`). When these are unsupported:

- Visual effects may fall back to simpler CSS transitions or static states.
- Core functionality and accessibility remain intact.
- No JavaScript polyfills are required or loaded automatically.
