import './test-helper.js';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LitElement, html } from 'lit';
import { FormAssociatedMixin } from './FormAssociatedMixin.js';

// Define a test element using the mixin
class TestInput extends FormAssociatedMixin(LitElement) {
  render() {
    return html`
      <input 
        .value=${this.value}
        ?required=${this.required}
        @input=${(e: Event) => { this.value = (e.target as HTMLInputElement).value; }}
      />
    `;
  }

  get validationAnchor() {
    return this.shadowRoot?.querySelector('input') || undefined;
  }
}

customElements.define('test-input', TestInput);

describe('FormAssociatedMixin', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should associate with a parent form and submit values', async () => {
    container.innerHTML = `
      <form id="test-form">
        <test-input name="my-input" value="hello"></test-input>
      </form>
    `;

    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;
    expect((element.internals as any).formValue).toBe('hello');
  });

  it('should participate in constraint validation', async () => {
    container.innerHTML = `
      <form id="test-form">
        <test-input name="my-input" required></test-input>
      </form>
    `;

    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(true);
    expect(element.checkValidity()).toBe(false);

    element.value = 'valid';
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(false);
    expect(element.checkValidity()).toBe(true);
  });

  it('should track touched/dirty states and apply CSS states', async () => {
    container.innerHTML = `
      <test-input name="my-input" required></test-input>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;
    const internals = element.internals;

    // Initially neither touched nor dirty
    expect(internals.states.has('touched')).toBe(false);
    expect(internals.states.has('dirty')).toBe(false);
    expect(internals.states.has('user-invalid')).toBe(false);

    // Simulate input/change (dirty)
    element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    expect(internals.states.has('dirty')).toBe(true);
    // Since value is empty and required, it should be user-invalid once dirty
    expect(internals.states.has('user-invalid')).toBe(true);

    // Simulate blur (touched)
    element.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
    expect(internals.states.has('touched')).toBe(true);
  });

  it('should respond to form resets', async () => {
    container.innerHTML = `
      <form id="test-form">
        <test-input name="my-input" value="initial"></test-input>
      </form>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    element.value = 'modified';
    expect(element.value).toBe('modified');

    element.formResetCallback();
    expect(element.value).toBe('initial');
  });

  it('should expose the form property', async () => {
    container.innerHTML = `
      <form id="my-form">
        <test-input id="my-input"></test-input>
      </form>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;
    expect(element.form).not.toBeNull();
    expect(element.form?.id).toBe('my-form');
  });

  it('should expose the labels property', async () => {
    container.innerHTML = `
      <div>
        <label for="my-input">Input Label</label>
        <test-input id="my-input"></test-input>
      </div>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;
    
    // In Happy-DOM/ElementInternals mock, labels are tracked if they target the element ID.
    // Happy-DOM natively links labels to elements if they are nested or use 'for' attribute,
    // and exposes them via element.internals.labels.
    // Since we mock internals.labels in test-helper as empty or supported natively if present:
    // Let's verify that the mixin getter forwards element.internals.labels correctly.
    expect(element.labels).toBeDefined();
  });

  it('should dispatch an invalid event when checkValidity or reportValidity fails', async () => {
    container.innerHTML = `
      <test-input required></test-input>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    let invalidFired = false;
    element.addEventListener('invalid', () => {
      invalidFired = true;
    });

    const checkResult = element.checkValidity();
    expect(checkResult).toBe(false);
    expect(invalidFired).toBe(true);

    invalidFired = false;
    const reportResult = element.reportValidity();
    expect(reportResult).toBe(false);
    expect(invalidFired).toBe(true);
  });

  it('should update value on attribute change only if pristine', async () => {
    container.innerHTML = `
      <test-input value="initial"></test-input>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;
    expect(element.value).toBe('initial');

    // Case 1: Attribute change when pristine -> Updates value
    element.setAttribute('value', 'updated-pristine');
    await element.updateComplete;
    expect(element.value).toBe('updated-pristine');

    // Case 2: Attribute change when dirty -> Does NOT update value
    // Simulate user interaction to make it dirty
    element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    element.setAttribute('value', 'updated-dirty');
    await element.updateComplete;
    expect(element.value).toBe('updated-pristine'); // still the old value
    expect(element.defaultValue).toBe('updated-dirty'); // but defaultValue matches attribute
  });

  it('should support File values and files property', async () => {
    container.innerHTML = `
      <test-input></test-input>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    expect(element.files).toBeNull();

    // Create a mock file
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    element.value = file;
    await element.updateComplete;
    expect((element.internals as any).formValue).toBe(file);
  });

  it('should support FormData values', async () => {
    container.innerHTML = `
      <test-input></test-input>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    const formData = new FormData();
    formData.append('key1', 'val1');
    formData.append('key2', 'val2');

    element.value = formData;
    await element.updateComplete;
    expect((element.internals as any).formValue).toBe(formData);
  });

  it('should support required constraint validation on complex values', async () => {
    container.innerHTML = `
      <test-input required></test-input>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    // Initially value is empty string, which fails required
    expect(element.validity.valueMissing).toBe(true);

    // Set a File: satisfies required
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    element.value = file;
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(false);

    // Set empty FormData: fails required
    const emptyFormData = new FormData();
    element.value = emptyFormData;
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(true);

    // Set populated FormData: satisfies required
    const populatedFormData = new FormData();
    populatedFormData.append('field', 'value');
    element.value = populatedFormData;
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(false);
  });
});

