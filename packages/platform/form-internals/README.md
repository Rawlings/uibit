# @uibit/form-internals

[![NPM Version](https://img.shields.io/npm/v/@uibit/form-internals.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/form-internals)

## Resources

- **[Documentation & Guides](https://rawlings.github.io/uibit/tooling/form-internals)**
- **[NPM Package](https://www.npmjs.com/package/@uibit/form-internals)**
- **[GitHub Source Code](https://github.com/rawlings/uibit/tree/main/packages/platform/form-internals)**

An ElementInternals abstraction mixin for Lit components. Enables HTML5 form association, constraint validation mapping, and CSS validation state reflection.

## Installation

```bash
npm install @uibit/form-internals
# or
pnpm add @uibit/form-internals
# or
yarn add @uibit/form-internals
```

## Features

- **Automatic form association**: Registers custom elements to submit value data with parent `<form>` elements natively without light DOM input wrappers.
- **Custom interaction states**: Sets CSS states (`:state(touched)`, `:state(dirty)`, `:state(user-valid)`, and `:state(user-invalid)`) through `ElementInternals` to avoid displaying error styles before users interact with the field.
- **Constraint validation mapping**: Maps properties like `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`, `step`, and `type` directly to browser constraint validation algorithms.
- **AOM (Accessibility Object Model) support**: Automatically manages standard accessibility properties (`ariaDisabled`, `ariaReadOnly`, `ariaChecked`, `ariaRequired`, and `ariaInvalid`) on the element internals.
- **Standard form control API mirror**: Replicates the standard `HTMLInputElement` properties, including `valueAsNumber`, `valueAsDate`, `selectionStart`, `selectionEnd`, `selectionDirection`, `indeterminate`, and file selection (`files` getter/setter).
- **Control interaction methods**: Proxies native utility methods (`select()`, `setSelectionRange()`, `setRangeText()`, `stepUp()`, `stepDown()`, and `showPicker()`) directly to the inner input/interactive element.
- **CSS custom state reflection**: Reflected properties map automatically to CSS custom states, including `:state(disabled)`, `:state(readonly)`, and `:state(checked)`.
- **Form lifecycle hooks**: Automatically implements form resets (`formResetCallback`), parent `fieldset` disabling (`formDisabledCallback`), and state restoration (`formStateRestoreCallback`).
- **Automatic anchor element resolution**: Automatically queries the shadow root for the primary interactive element (`input, textarea, select, button`) to anchor native validation popups.
- **Composed event propagation**: Automatically forwards shadow DOM input events (`change`, `select`, and `search`) outside the shadow boundary for native event parity.

## Usage

Extend your custom element using `FormAssociatedMixin` to inherit all standard HTML5 form control properties and validation behaviors.

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { FormAssociatedMixin } from '@uibit/form-internals';

@customElement('my-text-input')
export class MyTextInput extends FormAssociatedMixin(LitElement) {
  static styles = css`
    :host {
      display: inline-block;
    }
    input {
      border: 0.0625rem solid #ccc;
      padding: 0.5rem;
      border-radius: 0.25rem;
    }
    /* Style invalid state only after the user has interacted with the field */
    :host(:state(user-invalid)) input {
      border-color: #ef4444;
      outline: none;
    }
  `;

  render() {
    return html`
      <input 
        .value=${String(this.value || '')} 
        ?disabled=${this.disabled}
        ?required=${this.required}
        @input=${this._handleInput}
      />
    `;
  }

  private _handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }
}
```

## Focus and anchor configuration

### Validation anchor override

By default, the mixin queries the shadow root for interactive elements (`input, textarea, select, button, [tabindex="0"]`) to use as the validation anchor. If a specific child element must act as the anchor, override the `validationAnchor` getter:

```typescript
protected get validationAnchor() {
  return this.shadowRoot?.querySelector('#custom-input-id') as HTMLElement;
}
```

### Focus delegation

`FormAssociatedMixin` automatically configures shadow root options with `delegatesFocus: true`. When a parent or script focuses the custom element, focus is delegated automatically to the first interactive element inside the shadow root.

## Form validation lifecycle

Use standard HTML5 validation APIs. Do not expose custom validation properties or non-standard hooks.

### Custom validation

Use the standard `setCustomValidity(message)` method to set custom error states. Passing an empty string clears the custom error.

```typescript
const emailInput = this.shadowRoot?.querySelector('my-text-input');
emailInput.setCustomValidity('Enter an email address associated with an organization.');
```

### Validation check

Call `checkValidity()` or `reportValidity()` to trigger validation constraints checks. These methods dispatch the standard `invalid` event if constraint requirements are not satisfied.
