# @uibit/core

The `@uibit/core` package provides the shared foundation, lifecycle utilities, and reactive controllers for all UIBit components. 

## Features

- **UIBitElement**: A foundational base class extending `LitElement` with automated attribute mapping, layout resets, custom event dispatchers, and resource cleanup.
- **Reactive Controllers**: Encapsulated state controllers for viewport visibility, element resize observation, and requestAnimationFrame loops.
- **Localization**: Built-in wrapper utilities around `@lit/localize` for configuring and switching active component locales.
- **Reset Styles**: Auto-injected `:host` border-box layouts and typography defaults.

## Decorators

### `@customElement(tagName: string)`
Registers a custom element under the specified tag name. It automatically checks `customElements.get(tagName)` to verify if the tag is already registered first, preventing double-registration crashes. Supports both Stage 3 standard decorators and TypeScript experimental decorators.

```ts
import { customElement, UIBitElement } from '@uibit/core';

@customElement('uibit-my-component')
export class MyComponent extends UIBitElement {
  // ...
}
```

---

## UIBitElement Base Class

All UIBit web components extend `UIBitElement` instead of the raw `LitElement`.

### Kebab-Case Attribute Mapping
Properties declared with `@property()` are automatically mapped from camelCase to kebab-case attributes (e.g. `searchableEnabled` maps to `searchable-enabled` attribute) without requiring manual configuration.

### Injected Reset Styles
Automatically prepends a standard layout reset to the component's final styles:
```css
:host {
  box-sizing: border-box;
  font-family: var(--uibit-font-sans, inherit);
  color: var(--uibit-text-primary, inherit);
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

### Event Dispatcher Helper
Provides a shorthand method to dispatch custom events with standard `bubbles: true`, `composed: true`, and `cancelable: true` options:
```ts
this.dispatchCustomEvent('change', { value: this.value });
```

### Automatic Cleanup & Event Listeners
Avoid memory leaks by letting the base element track event listeners and disposables. Registered cleanups are automatically executed when the element is disconnected from the DOM.

```ts
// Adds event listener and returns a cleanup function that is automatically called on disconnect
this.listen(window, 'scroll', () => {
  this.handleScroll();
});

// Register any manual teardown code
this.registerDisposable(() => {
  this.mySubscription.unsubscribe();
});
```

---

## Reactive Controllers

### ViewportController
Encapsulates the `IntersectionObserver` API to track element visibility within a scroll container or the viewport.
```ts
import { ViewportController } from '@uibit/core';

class MyComponent extends UIBitElement {
  private viewport = new ViewportController(this, {
    once: true,
    callback: (entry) => console.log('Entered viewport!'),
  });

  render() {
    return html`
      <div>
        ${this.viewport.isIntersecting ? 'Visible!' : 'Hidden...'}
      </div>
    `;
  }
}
```

### ResizeController
Encapsulates the `ResizeObserver` API to track the bounding rect changes of the host element or a custom target.
```ts
import { ResizeController } from '@uibit/core';

class MyComponent extends UIBitElement {
  private resize = new ResizeController(this);

  render() {
    const width = this.resize.contentRect?.width ?? 0;
    return html`<div>Width is ${width}px</div>`;
  }
}
```

### LoopController
A controller for managing a smooth `requestAnimationFrame` render loop. Automatically stops loops when the component disconnects from the DOM and resumes them when reconnected.
```ts
import { LoopController } from '@uibit/core';

class MyComponent extends UIBitElement {
  private loop = new LoopController(this, {
    callback: (timestamp) => this.draw(timestamp),
    autoStart: true
  });
}
```

---

## Localization

UIBit uses `@lit/localize` internally. Call `configureUIBitLocalization` once at application startup to register additional locales.

```ts
import { configureUIBitLocalization, setLocale } from '@uibit/core';

const { setLocale } = configureUIBitLocalization({
  targetLocales: ['fr', 'de'],
  loadLocale: (locale) => import(`./locales/uibit.${locale}.js`),
});

// Switch active locale
await setLocale('fr');
```
