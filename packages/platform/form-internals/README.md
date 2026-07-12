# @uibit/form-internals

[![NPM Version](https://img.shields.io/npm/v/@uibit/form-internals.svg?style=flat-square&color=black)](https://www.npmjs.com/package/@uibit/form-internals)


A robust, enterprise-grade package that abstracts the `ElementInternals` API for Lit components, making form association and custom validation seamless.

## Installation

```bash
npm install @uibit/form-internals
# or
pnpm add @uibit/form-internals
# or
yarn add @uibit/form-internals
```

## Features

- **Automatic Form Association**: Registers your element to submit value data with parent `<form>` elements without wrapping native inputs in light DOM.
- **Custom Interaction States (CSS `:state()`)**: Adds `:state(touched)`, `:state(dirty)`, `:state(user-valid)`, and `:state(user-invalid)` states to prevent displaying error messages before user interactions.
- **Constraint Validation Mapping**: Syncs properties like `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`, `step`, and `type` directly with native browser constraint validation.
- **Form Lifecycle Mapping**: Automatic support for form resets (`formResetCallback`), parent `fieldset` disabling (`formDisabledCallback`), and state restoration (`formStateRestoreCallback`).
- **Anchor Element Mapping**: Enables native validation popups to point exactly to your custom element's inner input element.

## Usage

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { FormAssociatedMixin } from '@uibit/form-internals';

@customElement('my-text-input')
export class MyTextInput extends FormAssociatedMixin(LitElement) {
  static styles = css`
    :host {
      display: inline-block;
    }
    input {
      border: 1px solid #ccc;
      padding: 0.5rem;
      border-radius: 4px;
    }
    /* Show red border only after user interaction and it's invalid */
    :host(:state(user-invalid)) input {
      border-color: red;
      outline: none;
    }
  `;

  // Provide the validation anchor to align native tooltips correctly
  @query('input')
  validationAnchor!: HTMLInputElement;

  render() {
    return html`
      <input 
        .value=${this.value} 
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

## Advanced Features

### Custom Value Serialization (Multi-value / FormData)
If you have a complex element representing multiple inputs internally (e.g., date ranges, comboboxes), you can override `getFormValue()` to return a `FormData` object.

```typescript
protected getFormValue() {
  const data = new FormData();
  data.append(this.name, this.startVal);
  data.append(this.name, this.endVal);
  return data;
}
```

### Asynchronous Validation Hooks
Implement `performCustomValidation` to run async logic (e.g. backend verification) during the validation pipeline.

```typescript
protected async performCustomValidation(value: string) {
  const isAvailable = await checkUsernameAvailability(value);
  if (!isAvailable) {
    throw new Error('This username is already taken.');
  }
}
```
