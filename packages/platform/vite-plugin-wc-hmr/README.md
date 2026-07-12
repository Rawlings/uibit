# @uibit/vite-plugin-wc-hmr

[![NPM Version](https://img.shields.io/npm/v/@uibit/vite-plugin-wc-hmr.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/vite-plugin-wc-hmr)


Vite plugin for true Hot Module Replacement of custom elements. Updates templates, styles, and methods in-place without a full page reload, preserving component state.

Works out of the box with **Lit**, and is configurable for other custom element frameworks or vanilla registrations.

## Installation

```bash
npm install -D @uibit/vite-plugin-wc-hmr
```

## Usage

```ts
import { defineConfig } from 'vite';
import { uibitHmr } from '@uibit/vite-plugin-wc-hmr';

export default defineConfig({
  plugins: [uibitHmr()],
});
```

## Options

```ts
uibitHmr({
  /**
   * Additional decorator names that register a custom element.
   * Merged with the built-in default: ['customElement'].
   */
  decorators: ['define', 'element'],

  /**
   * Additional function call patterns that register a custom element.
   * Merged with the built-in default: ['customElements.define'].
   */
  defineFunctions: ['FASTElement.define'],
})
```

## Framework Examples

### Lit

Works out of the box — no extra configuration needed.

```ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-button')
export class MyButton extends LitElement {
  static styles = css`:host { display: inline-block; }`;

  @property() label = 'Click me';

  render() {
    return html`<button>${this.label}</button>`;
  }
}
```

### Vanilla custom elements

Also works out of the box via the `customElements.define` pattern.

```ts
export class MyButton extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `<button>${this.textContent}</button>`;
  }
}

customElements.define('my-button', MyButton);
```

### FAST Element

FAST's `@customElement` decorator is detected automatically.

```ts
import { FASTElement, customElement, attr } from '@microsoft/fast-element';

@customElement({ name: 'my-button', template, styles })
export class MyButton extends FASTElement {
  @attr label = 'Click me';
}
```

For the `FASTElement.define` imperative style, add it to `defineFunctions`:

```ts
uibitHmr({
  defineFunctions: ['FASTElement.define'],
})
```

```ts
import { FASTElement, html, css } from '@microsoft/fast-element';

const template = html<MyButton>`<button>${x => x.label}</button>`;
const styles = css`:host { display: inline-block; }`;

export class MyButton extends FASTElement {}

FASTElement.define(MyButton, { name: 'my-button', template, styles });
```

### Stencil

Stencil uses `@Component` as the registration decorator. Add it to `decorators`:

```ts
uibitHmr({
  decorators: ['Component'],
})
```

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({ tag: 'my-button', shadow: true })
export class MyButton {
  @Prop() label: string = 'Click me';

  render() {
    return <button>{this.label}</button>;
  }
}
```

> Note: Stencil has its own HMR in its dev server. This plugin is useful when bundling Stencil output into a Vite project.

### Catalyst (GitHub)

Catalyst uses `@controller` and derives the tag name from the class name. Add the decorator:

```ts
uibitHmr({
  decorators: ['controller'],
})
```

```ts
import { controller } from '@github/catalyst';

@controller
export class MyButtonElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button>Click me</button>`;
  }
}
```

### Hybrids

Hybrids registers via a `define` call:

```ts
uibitHmr({
  defineFunctions: ['define'],
})
```

```ts
import { define, html } from 'hybrids';

export const MyButton = define({
  tag: 'my-button',
  label: 'Click me',
  render: ({ label }) => html`<button>${label}</button>`,
});
```

## Detection

The plugin statically detects component registrations at transform time.

**Built-in patterns:**

```ts
// Decorator form: @decoratorName('tag-name')
@customElement('my-button')
class MyButton extends LitElement { ... }

// Function form: defineFn('tag-name', ClassName)
customElements.define('my-button', MyButton);
```

Additional decorator names and define functions are added via options; no existing defaults are removed.

The plugin uses `enforce: 'pre'` to run before esbuild, so it sees raw TypeScript source and can detect decorator patterns before they are compiled away.

No code is injected in production builds (`apply: 'serve'` only).

## Update Mechanism

When a component file (or a file it imports) changes, Vite re-executes the module. The plugin's injected `register()` call receives the new class and applies the update:

1. All live instances in the DOM are found via `document.querySelectorAll(tagName)`
2. Each instance has its prototype swapped to the new class
3. Re-render paths are tried in order:
   - **Lit / ReactiveElement** — calls `finalize()`, replaces `adoptedStyleSheets`, calls `requestUpdate()`
   - **`update()`** — called if present
   - **Vanilla fallback** — if `render()` returns a string, it is written to `shadowRoot.innerHTML`

## What Gets Updated

- Render output (templates, HTML)
- Styles — including changes in separately imported style files
- Methods and lifecycle callbacks
- Reactive property definitions

## What Is Preserved

- Live property values
- DOM position and light DOM children
- Slot assignments
- `ElementInternals` state

## What Falls Back to Full Reload

- Tag name changes
- Constructor-only setup (canvas contexts, Web Audio nodes)
- Components using private class fields (`#field`) — prototype swap cannot reach them
