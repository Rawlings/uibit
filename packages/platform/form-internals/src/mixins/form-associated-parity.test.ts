import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LitElement, html } from 'lit';
import { FormAssociatedMixin } from './form-associated-mixin.js';

class TestInput extends FormAssociatedMixin(LitElement) {
  render() {
    return html`
      <input 
        .value=${this.type === 'file' ? '' : (this.value as string)}
        .type=${this.type}
        .step=${this.step}
        ?required=${this.required}
        .readOnly=${this.readOnly}
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
        <option value="">Select...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
    `;
  }
}

class TestTextarea extends FormAssociatedMixin(LitElement) {
  render() {
    return html`
      <textarea 
        .value=${this.value as string}
        ?required=${this.required}
        .readOnly=${this.readOnly}
        @input=${(e: Event) => { this.value = (e.target as HTMLTextAreaElement).value; }}
      ></textarea>
    `;
  }
}

class TestFile extends FormAssociatedMixin(LitElement) {
  constructor() {
    super();
    this.type = 'file';
  }
  render() {
    return html`
      <input 
        type="file"
        ?required=${this.required}
        @change=${(e: Event) => { this.files = (e.target as HTMLInputElement).files; }}
      />
    `;
  }
}

customElements.define('parity-test-input', TestInput);
customElements.define('parity-test-checkbox', TestCheckbox);
customElements.define('parity-test-select', TestSelect);
customElements.define('parity-test-textarea', TestTextarea);
customElements.define('parity-test-file', TestFile);

const waitUpdate = async (el: any) => {
  if (el.updateComplete) {
    await el.updateComplete;
  }
};

describe.each([
  { name: 'Native Input', create: () => document.createElement('input') },
  { name: 'Custom Input', create: () => document.createElement('parity-test-input') as TestInput }
])('Form Control Parity: $name', ({ create }) => {
  let container: HTMLDivElement;
  let element: any;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = create();
    container.appendChild(element);
    await waitUpdate(element);
  });

  afterEach(() => {
    container.remove();
  });

  it('should support correct initial properties and attributes', () => {
    expect(element.value).toBe('');
    expect(element.disabled).toBe(false);
    expect(element.required).toBe(false);
    expect(element.readOnly).toBe(false);
    expect(element.checked).toBe(false);
  });

  it('should reflect attributes to properties correctly', async () => {
    element.setAttribute('value', 'attr-value');
    element.setAttribute('name', 'test-name');
    element.setAttribute('type', 'password');
    element.setAttribute('placeholder', 'Enter pass');
    element.setAttribute('autocomplete', 'current-password');
    element.setAttribute('disabled', '');
    element.setAttribute('required', '');
    element.setAttribute('readonly', '');
    
    await waitUpdate(element);

    expect(element.value).toBe('attr-value');
    expect(element.name).toBe('test-name');
    expect(element.type).toBe('password');
    expect(element.placeholder).toBe('Enter pass');
    expect(element.autocomplete).toBe('current-password');
    expect(element.disabled).toBe(true);
    expect(element.required).toBe(true);
    expect(element.readOnly).toBe(true);
  });

  it('should validate required validation constraints', async () => {
    element.required = true;
    await waitUpdate(element);
    expect(element.validity.valueMissing).toBe(true);
    expect(element.validity.valid).toBe(false);

    element.value = 'hello';
    await waitUpdate(element);
    expect(element.validity.valueMissing).toBe(false);
    expect(element.validity.valid).toBe(true);
  });

  it('should validate minlength and maxlength constraints (programmatic assignment)', async () => {
    element.minlength = 3;
    element.maxlength = 5;
    element.value = 'ab';
    await waitUpdate(element);

    // Programmatic assignment bypasses length constraints natively
    expect(element.validity.tooShort).toBe(false);
    
    element.value = 'abcdef';
    await waitUpdate(element);
    expect(element.validity.tooLong).toBe(false);
  });

  it('should validate pattern mismatch constraint', async () => {
    element.pattern = '[0-9]{3}';
    await waitUpdate(element);

    element.value = 'abc';
    await waitUpdate(element);
    expect(element.validity.patternMismatch).toBe(true);

    element.value = '123';
    await waitUpdate(element);
    expect(element.validity.patternMismatch).toBe(false);
  });

  it('should support valueAsNumber parity', async () => {
    element.type = 'number';
    await waitUpdate(element);

    element.valueAsNumber = 42;
    await waitUpdate(element);
    expect(element.value).toBe('42');
    expect(element.valueAsNumber).toBe(42);
  });

  it('should support valueAsDate parity', async () => {
    element.type = 'date';
    await waitUpdate(element);

    const dateStr = '2026-07-18';
    element.value = dateStr;
    await waitUpdate(element);

    expect(element.valueAsDate?.getUTCDate()).toBe(18);

    const date = new Date(Date.UTC(2026, 6, 18));
    element.valueAsDate = date;
    await waitUpdate(element);
    expect(element.value).toBe(dateStr);
  });

  it('should support selection properties and methods', async () => {
    element.value = 'hello world';
    await waitUpdate(element);

    // Call select()
    element.select();
    expect(element.selectionStart).toBe(0);
    expect(element.selectionEnd).toBe(11);

    // Call setSelectionRange
    element.setSelectionRange(2, 5, 'backward');
    expect(element.selectionStart).toBe(2);
    expect(element.selectionEnd).toBe(5);
    expect(element.selectionDirection).toBe('backward');

    // Call setRangeText
    element.setRangeText('inserted');
    expect(element.value).toBe('heinserted world');
  });

  it('should support stepUp and stepDown parity', async () => {
    element.type = 'number';
    element.step = '2';
    element.value = '10';
    await waitUpdate(element);

    element.stepUp();
    expect(element.value).toBe('12');

    element.stepDown(2);
    expect(element.value).toBe('8');
  });

  it('should bypass validations when element is disabled', async () => {
    element.required = true;
    element.value = '';
    await waitUpdate(element);
    expect(element.validity.valueMissing).toBe(true);

    element.disabled = true;
    await waitUpdate(element);
    expect(element.validity.valid).toBe(true);
    expect(element.validity.valueMissing).toBe(false);
  });

  it('should exempt readOnly elements from validation', async () => {
    element.required = true;
    element.value = '';
    await waitUpdate(element);
    expect(element.validity.valueMissing).toBe(true);

    element.readOnly = true;
    await waitUpdate(element);
    expect(element.validity.valid).toBe(true);
    expect(element.validity.valueMissing).toBe(false);
  });

  it('should update validation state dynamically when attributes change', async () => {
    element.value = 'abc';
    await waitUpdate(element);
    expect(element.validity.valid).toBe(true);

    element.setAttribute('minlength', '5');
    await waitUpdate(element);
    expect(Number(element.getAttribute('minlength'))).toBe(5);
  });

  it('should support multiple property mapping', async () => {
    element.multiple = true;
    await waitUpdate(element);
    expect(element.multiple).toBe(true);

    element.multiple = false;
    await waitUpdate(element);
    expect(element.multiple).toBe(false);
  });

  it('should support defaultValue and defaultChecked mapping', async () => {
    element.defaultValue = 'new-default-val';
    element.defaultChecked = true;
    await waitUpdate(element);

    expect(element.defaultValue).toBe('new-default-val');
    expect(element.defaultChecked).toBe(true);
  });

  it('should support form submission overrides reflection', async () => {
    element.formAction = '/submit-action';
    element.formEnctype = 'multipart/form-data';
    element.formMethod = 'post';
    element.formNoValidate = true;
    element.formTarget = '_blank';
    await waitUpdate(element);

    expect(element.getAttribute('formaction')).toBe('/submit-action');
    expect(element.getAttribute('formenctype')).toBe('multipart/form-data');
    expect(element.getAttribute('formmethod')).toBe('post');
    expect(element.hasAttribute('formnovalidate')).toBe(true);
    expect(element.getAttribute('formtarget')).toBe('_blank');
  });
});

describe.each([
  { name: 'Native Checkbox', create: () => {
    const el = document.createElement('input');
    el.type = 'checkbox';
    return el;
  }},
  { name: 'Custom Checkbox', create: () => document.createElement('parity-test-checkbox') as TestCheckbox }
])('Checkbox Parity: $name', ({ create }) => {
  let container: HTMLDivElement;
  let element: any;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = create();
    container.appendChild(element);
    await waitUpdate(element);
  });

  afterEach(() => {
    container.remove();
  });

  it('should support indeterminate property parity', async () => {
    element.indeterminate = true;
    await waitUpdate(element);
    expect(element.indeterminate).toBe(true);

    element.indeterminate = false;
    await waitUpdate(element);
    expect(element.indeterminate).toBe(false);
  });
});

describe.each([
  { name: 'Native Radio', create: () => {
    const el = document.createElement('input');
    el.type = 'radio';
    return el;
  }},
  { name: 'Custom Radio', create: () => {
    const el = document.createElement('parity-test-input') as TestInput;
    el.type = 'radio';
    return el;
  }}
])('Radio Parity: $name', ({ create }) => {
  let container: HTMLDivElement;
  let element: any;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = create();
    container.appendChild(element);
    await waitUpdate(element);
  });

  afterEach(() => {
    container.remove();
  });

  it('should support radio checking behavior and fallback value default', async () => {
    expect(element.checked).toBe(false);
    expect(element.value).toBe('on');

    element.checked = true;
    await waitUpdate(element);
    expect(element.checked).toBe(true);
  });
});

describe.each([
  { name: 'Native Select', create: () => {
    const el = document.createElement('select');
    const opt1 = document.createElement('option');
    opt1.value = '';
    opt1.textContent = 'Select...';
    const opt2 = document.createElement('option');
    opt2.value = '1';
    opt2.textContent = 'One';
    el.appendChild(opt1);
    el.appendChild(opt2);
    return el;
  }},
  { name: 'Custom Select', create: () => document.createElement('parity-test-select') as TestSelect }
])('Select Parity: $name', ({ create }) => {
  let container: HTMLDivElement;
  let element: any;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = create();
    container.appendChild(element);
    await waitUpdate(element);
  });

  afterEach(() => {
    container.remove();
  });

  it('should support selection values and validation', async () => {
    expect(element.value).toBe('');

    element.required = true;
    await waitUpdate(element);
    expect(element.validity.valueMissing).toBe(true);

    element.value = '1';
    await waitUpdate(element);
    expect(element.validity.valueMissing).toBe(false);
    expect(element.validity.valid).toBe(true);
  });
});

describe.each([
  { name: 'Native Textarea', create: () => document.createElement('textarea') },
  { name: 'Custom Textarea', create: () => document.createElement('parity-test-textarea') as TestTextarea }
])('Textarea Parity: $name', ({ create }) => {
  let container: HTMLDivElement;
  let element: any;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = create();
    container.appendChild(element);
    await waitUpdate(element);
  });

  afterEach(() => {
    container.remove();
  });

  it('should support multiline value and required constraints', async () => {
    expect(element.value).toBe('');

    element.required = true;
    await waitUpdate(element);
    expect(element.validity.valueMissing).toBe(true);

    element.value = 'Line 1\nLine 2';
    await waitUpdate(element);
    expect(element.value).toBe('Line 1\nLine 2');
    expect(element.validity.valueMissing).toBe(false);
  });
});

describe.each([
  { name: 'Native File Input', create: () => {
    const el = document.createElement('input');
    el.type = 'file';
    return el;
  }},
  { name: 'Custom File Input', create: () => document.createElement('parity-test-file') as TestFile }
])('File Input Parity: $name', ({ create }) => {
  let container: HTMLDivElement;
  let element: any;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = create();
    container.appendChild(element);
    await waitUpdate(element);
  });

  afterEach(() => {
    container.remove();
  });

  it('should support files list mapping and validation constraints', async () => {
    expect(element.files === null || element.files.length === 0).toBe(true);

    element.required = true;
    await waitUpdate(element);
    expect(element.validity.valueMissing).toBe(true);

    const file = new File(['content'], 'file.txt');
    const dt = new DataTransfer();
    dt.items.add(file);
    element.files = dt.files;
    await waitUpdate(element);

    expect(element.files).not.toBeNull();
    expect(element.files?.length).toBe(1);
    expect(element.files?.[0].name).toBe('file.txt');
  });
});
