# @uibit/core

Core utilities and decorators for UIBit web components.

## Features

- **Safe customElement Decorator**: Replaces the native `@customElement` decorator from `lit/decorators.js` with a version that checks if the component is already defined in the `customElements` registry. This prevents duplicate registration errors (`NotSupportedError`).
