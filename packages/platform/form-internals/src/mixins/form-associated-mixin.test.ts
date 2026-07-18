import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LitElement, html } from 'lit';
import { FormAssociatedMixin } from './form-associated-mixin.js';

// Define a test element using the mixin
class TestInput extends FormAssociatedMixin(LitElement) {
  render() {
    return html`
      <input 
        .value=${this.type === 'file' ? '' : (this.value as string)}
        .type=${this.type}
        .step=${this.step}
        ?required=${this.required}
        @input=${(e: Event) => { this.value = (e.target as HTMLInputElement).value; }}
      />
    `;
  }
}

class TestCheckbox extends FormAssociatedMixin(LitElement) {
  constructor() {
    super();
    this.type = 'checkbox';
  }
  render() {
    return html`
      <input 
        type="checkbox"
        .checked=${this.checked}
        .indeterminate=${this.indeterminate}
        @change=${(e: Event) => { this.checked = (e.target as HTMLInputElement).checked; }}
      />
    `;
  }
}

class TestSelect extends FormAssociatedMixin(LitElement) {
  render() {
    return html`
      <select @change=${(e: Event) => { this.value = (e.target as HTMLSelectElement).value; }}>
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
    `;
  }
}

class TestCustomAnchor extends FormAssociatedMixin(LitElement) {
  render() {
    return html`
      <input id="first" />
      <input id="second" />
    `;
  }
  
  get validationAnchor() {
    return this.shadowRoot?.querySelector('#second') as HTMLElement || undefined;
  }
}

customElements.define('test-input', TestInput);
customElements.define('test-checkbox', TestCheckbox);
customElements.define('test-select', TestSelect);
customElements.define('test-custom-anchor', TestCustomAnchor);

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
    const form = container.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);
    expect(formData.get('my-input')).toBe('hello');
  });

  it('should submit value within a form when triggered by a submit button', async () => {
    container.innerHTML = `
      <form id="test-form">
        <test-input name="my-input" value="hello-button"></test-input>
        <button type="submit">Submit</button>
      </form>
    `;

    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;
    const form = container.querySelector('form') as HTMLFormElement;
    const button = container.querySelector('button') as HTMLButtonElement;

    let submittedData: FormData | null = null;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submittedData = new FormData(form);
    });

    button.click();

    expect(submittedData).not.toBeNull();
    expect(submittedData!.get('my-input')).toBe('hello-button');
  });

  it('should enable delegatesFocus natively on shadowRootOptions', () => {
    const options = (TestInput as any).shadowRootOptions;
    expect(options).toBeDefined();
    expect(options.delegatesFocus).toBe(true);
  });

  it('should participate in constraint validation and set validation anchor', async () => {
    container.innerHTML = `
      <form id="test-form">
        <test-input name="my-input" required></test-input>
      </form>
    `;

    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(true);
    expect(element.checkValidity()).toBe(false);

    // Verify the inner input exists
    const input = element.shadowRoot?.querySelector('input');
    expect(input).toBeDefined();

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

  it('should support File values and files property', async () => {
    container.innerHTML = `
      <form id="file-form">
        <test-input name="my-file"></test-input>
      </form>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    expect(element.files).toBeNull();

    // Create a mock file
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    element.value = file;
    await element.updateComplete;
    
    const form = container.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);
    expect(formData.get('my-file')).toBe(file);
    
    // Check files getter (should contain the file)
    expect(element.files).not.toBeNull();
    expect(element.files?.length).toBe(1);
    expect(element.files?.[0]).toBe(file);
  });

  it('should support FormData values', async () => {
    container.innerHTML = `
      <form id="fd-form">
        <test-input name="my-input"></test-input>
      </form>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    const formData = new FormData();
    formData.append('key1', 'val1');
    formData.append('key2', 'val2');

    element.value = formData;
    await element.updateComplete;
    
    const form = container.querySelector('form') as HTMLFormElement;
    const parentFormData = new FormData(form);
    expect(parentFormData.get('key1')).toBe('val1');
    expect(parentFormData.get('key2')).toBe('val2');
  });

  it('should support checkbox form state restore', async () => {
    container.innerHTML = `
      <form id="check-form">
        <test-checkbox name="my-checkbox"></test-checkbox>
      </form>
    `;
    const element = container.querySelector('test-checkbox') as TestCheckbox;
    await element.updateComplete;

    expect(element.checked).toBe(false);

    const form = container.querySelector('form') as HTMLFormElement;
    let formData = new FormData(form);
    expect(formData.get('my-checkbox')).toBeNull();

    // Check it
    element.checked = true;
    await element.updateComplete;
    formData = new FormData(form);
    expect(formData.get('my-checkbox')).toBe('on'); // defaults to 'on'

    // Restore state to unchecked
    element.formStateRestoreCallback('unchecked', 'restore');
    expect(element.checked).toBe(false);

    // Restore state to checked
    element.formStateRestoreCallback('checked', 'restore');
    expect(element.checked).toBe(true);
  });

  it('should support ancestor fieldset disabled state inheritance', async () => {
    container.innerHTML = `
      <fieldset id="my-fieldset">
        <test-input name="my-input"></test-input>
      </fieldset>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    expect(element.disabled).toBe(false);

    // Disable the parent fieldset
    element.formDisabledCallback(true);
    expect(element.disabled).toBe(true);

    // Re-enable the parent fieldset
    element.formDisabledCallback(false);
    expect(element.disabled).toBe(false);

    // Explicitly disable the element itself
    element.disabled = true;
    expect(element.disabled).toBe(true);

    // Disable parent fieldset again
    element.formDisabledCallback(true);
    expect(element.disabled).toBe(true);

    // Re-enable parent fieldset again (element should stay disabled!)
    element.formDisabledCallback(false);
    expect(element.disabled).toBe(true);
  });

  it('should validate required toggle inputs based on checked state', async () => {
    container.innerHTML = `
      <test-checkbox name="my-checkbox" required></test-checkbox>
    `;
    const element = container.querySelector('test-checkbox') as TestCheckbox;
    await element.updateComplete;

    // Required but unchecked -> invalid (valueMissing = true)
    expect(element.validity.valueMissing).toBe(true);
    expect(element.checkValidity()).toBe(false);

    // Check it -> valid
    element.checked = true;
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(false);
    expect(element.checkValidity()).toBe(true);
  });

  it('should not mark disabled/readonly elements as touched or dirty under interaction', async () => {
    container.innerHTML = `
      <test-input name="my-input" disabled></test-input>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    const internals = element.internals;
    expect(internals.states.has('touched')).toBe(false);
    expect(internals.states.has('dirty')).toBe(false);

    // Try blur and input on disabled element
    element.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
    element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    expect(internals.states.has('touched')).toBe(false);
    expect(internals.states.has('dirty')).toBe(false);

    // ReadOnly element checks
    element.removeAttribute('disabled');
    element.setAttribute('readonly', '');
    await element.updateComplete;

    element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    expect(internals.states.has('dirty')).toBe(false);
  });

  it('should restore File state instances correctly', async () => {
    container.innerHTML = `
      <test-input name="my-file-input"></test-input>
    `;
    const element = container.querySelector('test-input') as TestInput;
    await element.updateComplete;

    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    element.formStateRestoreCallback(file, 'restore');
    expect(element.value).toBe(file);
  });

  it('should restore state and autofill under autocomplete mode', async () => {
    container.innerHTML = `
      <form>
        <test-input name="user-name"></test-input>
        <test-checkbox name="newsletter"></test-checkbox>
      </form>
    `;
    const input = container.querySelector('test-input') as TestInput;
    const checkbox = container.querySelector('test-checkbox') as TestCheckbox;
    await Promise.all([input.updateComplete, checkbox.updateComplete]);

    // Simulate browser autofilling
    input.formStateRestoreCallback('John Doe', 'autocomplete');
    checkbox.formStateRestoreCallback('checked', 'autocomplete');

    expect(input.value).toBe('John Doe');
    expect(checkbox.checked).toBe(true);
  });

  it('should reset all input types correctly during form-wide reset', async () => {
    container.innerHTML = `
      <form id="reset-form">
        <test-input name="user-name" value="Default Name"></test-input>
        <test-checkbox name="newsletter" checked></test-checkbox>
        <test-input name="user-file" type="file"></test-input>
      </form>
    `;
    const form = container.querySelector('#reset-form') as HTMLFormElement;
    const input = container.querySelector('test-input[name="user-name"]') as TestInput;
    const checkbox = container.querySelector('test-checkbox') as TestCheckbox;
    const fileInput = container.querySelector('test-input[name="user-file"]') as TestInput;
    await Promise.all([input.updateComplete, checkbox.updateComplete, fileInput.updateComplete]);

    // Modify values
    input.value = 'New Name';
    checkbox.checked = false;
    const file = new File(['text'], 'text.txt');
    fileInput.value = file;
    await Promise.all([input.updateComplete, checkbox.updateComplete, fileInput.updateComplete]);

    expect(input.value).toBe('New Name');
    expect(checkbox.checked).toBe(false);
    expect(fileInput.value).toBe(file);

    // Trigger reset
    form.reset();

    expect(input.value).toBe('Default Name');
    expect(checkbox.checked).toBe(true);
    expect(fileInput.value).toBe('');
    expect(fileInput.files === null || fileInput.files.length === 0).toBe(true);
  });

  describe('Shadow DOM Event Composed Propagation', () => {
      let custom: TestInput;
      let customSelect: TestSelect;
  
      beforeEach(async () => {
        custom = document.createElement('test-input') as TestInput;
        customSelect = document.createElement('test-select') as TestSelect;
        container.appendChild(custom);
        container.appendChild(customSelect);
        await Promise.all([custom.updateComplete, customSelect.updateComplete]);
      });
  
      it('should bubble change event outside the shadow root for select inputs', async () => {
        let changeFired = false;
        customSelect.addEventListener('change', () => {
          changeFired = true;
        });
  
        const innerSelect = customSelect.shadowRoot?.querySelector('select') as HTMLSelectElement;
        innerSelect.value = '2';
        innerSelect.dispatchEvent(new Event('change', { bubbles: true }));
        expect(changeFired).toBe(true);
      });
  
      it('should bubble select event outside the shadow root for text inputs', async () => {
        let selectFired = false;
        custom.addEventListener('select', () => {
          selectFired = true;
        });
  
        const innerInput = custom.shadowRoot?.querySelector('input') as HTMLInputElement;
        innerInput.dispatchEvent(new Event('select', { bubbles: true }));
        expect(selectFired).toBe(true);
      });
  
      it('should bubble search event outside the shadow root for search inputs', async () => {
        custom.type = 'search';
        await custom.updateComplete;
  
        let searchFired = false;
        custom.addEventListener('search', () => {
          searchFired = true;
        });
  
        const innerInput = custom.shadowRoot?.querySelector('input') as HTMLInputElement;
        innerInput.dispatchEvent(new Event('search', { bubbles: true }));
        expect(searchFired).toBe(true);
      });
    });
  
    describe('Validation Anchor & Custom Error Internals', () => {
      it('should support custom validationAnchor overrides', async () => {
        const customAnchorEl = document.createElement('test-custom-anchor') as any;
        container.appendChild(customAnchorEl);
        await customAnchorEl.updateComplete;
  
        const secondInput = customAnchorEl.shadowRoot?.querySelector('#second') as HTMLElement;
        expect(customAnchorEl.validationAnchor).toBe(secondInput);
        expect(customAnchorEl['_defaultValidationAnchor']).toBe(secondInput);
      });
  
      it('should support custom validation messages via setCustomValidity', async () => {
        const custom = document.createElement('test-input') as TestInput;
        container.appendChild(custom);
        await custom.updateComplete;
  
        expect(custom.validity.valid).toBe(true);
        expect(custom.validity.customError).toBe(false);
  
        custom.setCustomValidity('This is a custom error message.');
        expect(custom.validity.valid).toBe(false);
        expect(custom.validity.customError).toBe(true);
        expect(custom.validationMessage).toBe('This is a custom error message.');
  
        custom.setCustomValidity('');
        expect(custom.validity.valid).toBe(true);
        expect(custom.validity.customError).toBe(false);
        expect(custom.validationMessage).toBe('');
      });
  
      it('should dispatch invalid event natively when checkValidity or reportValidity fails', async () => {
        const custom = document.createElement('test-input') as TestInput;
        custom.required = true;
        custom.value = '';
        container.appendChild(custom);
        await custom.updateComplete;
  
        let invalidFiredCount = 0;
        custom.addEventListener('invalid', () => {
          invalidFiredCount++;
        });
  
        const checkResult = custom.checkValidity();
        expect(checkResult).toBe(false);
        expect(invalidFiredCount).toBe(1);
  
        const reportResult = custom.reportValidity();
        expect(reportResult).toBe(false);
        expect(invalidFiredCount).toBe(2);
      });
    });
});
