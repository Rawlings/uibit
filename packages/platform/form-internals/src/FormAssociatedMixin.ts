import { LitElement } from 'lit';
import type { Constructor, FormAssociatedInterface } from './types.js';
import { validateValue, getValidationMessage } from './ValidationEngine.js';
import { InteractionController } from './InteractionController.js';

export function FormAssociatedMixin<T extends Constructor<LitElement>>(Base: T) {
  class FormAssociatedClass extends Base implements FormAssociatedInterface {
    static formAssociated = true;

    static get properties() {
      return {
        value: { type: String },
        name: { type: String, reflect: true },
        disabled: { type: Boolean, reflect: true },
        required: { type: Boolean, reflect: true },
        pattern: { type: String, reflect: true },
        minlength: { type: Number, reflect: true },
        maxlength: { type: Number, reflect: true },
        min: { type: String, reflect: true },
        max: { type: String, reflect: true },
        step: { type: String, reflect: true },
        type: { type: String, reflect: true },
        readOnly: { type: Boolean, attribute: 'readonly', reflect: true },
        checked: { type: Boolean, reflect: true },
        multiple: { type: Boolean, reflect: true },
        placeholder: { type: String, reflect: true },
        autofocus: { type: Boolean, reflect: true }
      };
    }

    value!: string | File | FormData | null;
    name!: string;
    disabled!: boolean;
    required!: boolean;
    pattern!: string;
    minlength?: number;
    maxlength?: number;
    min!: string;
    max!: string;
    step!: string;
    type!: string;
    readOnly!: boolean;
    checked!: boolean;
    multiple!: boolean;
    placeholder!: string;
    autofocus!: boolean;

    get defaultValue() {
      return this.getAttribute('value') || '';
    }

    set defaultValue(newValue: string) {
      this.setAttribute('value', newValue);
    }

    get defaultChecked() {
      return this.hasAttribute('checked');
    }

    set defaultChecked(newValue: boolean) {
      if (newValue) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    }

    get files(): FileList | null {
      return null;
    }
    
    readonly internals: ElementInternals;
    private _interactionController: InteractionController;
    private _customValidityMessage = '';

    constructor(...args: any[]) {
      super(...args);
      this.internals = this.attachInternals();
      this._interactionController = new InteractionController(this, this.internals);
    }

    // Validity forwarding
    get validity() {
      return this.internals.validity;
    }

    get validationMessage() {
      return this.internals.validationMessage;
    }

    get willValidate() {
      return this.internals.willValidate;
    }

    get form() {
      return this.internals.form;
    }

    get labels() {
      return this.internals.labels;
    }

    checkValidity() {
      const isValid = this.internals.checkValidity();
      if (!isValid) {
        this.dispatchEvent(new Event('invalid', { bubbles: false, cancelable: true }));
      }
      return isValid;
    }

    reportValidity() {
      const isValid = this.internals.reportValidity();
      if (!isValid) {
        this.dispatchEvent(new Event('invalid', { bubbles: false, cancelable: true }));
      }
      return isValid;
    }

    setCustomValidity(message: string) {
      this._customValidityMessage = message;
      this.validate();
    }

    // Default validation anchor fallback
    get validationAnchor(): HTMLElement | undefined {
      return undefined;
    }

    attributeChangedCallback(name: string, old: string | null, value: string | null) {
      if (name === 'value' && this._interactionController?.dirty) {
        // Native parity: attribute changes do not overwrite the current value if the element is dirty
        return;
      }
      super.attributeChangedCallback(name, old, value);
    }

    connectedCallback() {
      super.connectedCallback();
      this._syncFormValue();
      this.validate();
    }

    willUpdate(changedProperties: Map<PropertyKey, unknown>) {
      super.willUpdate(changedProperties);
      
      if (changedProperties.has('disabled')) {
        if (this.internals.states) {
          if (this.disabled) {
            this.internals.states.add('disabled');
            this.internals.ariaDisabled = 'true';
          } else {
            this.internals.states.delete('disabled');
            this.internals.ariaDisabled = 'false';
          }
        }
      }
      
      if (changedProperties.has('readOnly')) {
        if (this.internals.states) {
          if (this.readOnly) {
            this.internals.states.add('readonly');
            this.internals.ariaReadOnly = 'true';
          } else {
            this.internals.states.delete('readonly');
            this.internals.ariaReadOnly = 'false';
          }
        }
      }

      if (changedProperties.has('checked')) {
        if (this.internals.states) {
          if (this.checked) {
            this.internals.states.add('checked');
            this.internals.ariaChecked = 'true';
          } else {
            this.internals.states.delete('checked');
            this.internals.ariaChecked = 'false';
          }
        }
      }

      if (changedProperties.has('required')) {
        this.internals.ariaRequired = this.required ? 'true' : 'false';
      }

      if (changedProperties.has('value') || changedProperties.has('checked')) {
        this._syncFormValue();
      } else if (
        changedProperties.has('required') ||
        changedProperties.has('pattern') ||
        changedProperties.has('minlength') ||
        changedProperties.has('maxlength') ||
        changedProperties.has('min') ||
        changedProperties.has('max') ||
        changedProperties.has('step') ||
        changedProperties.has('type')
      ) {
        this.validate();
      }
    }

    // Native ElementInternals Form Association lifecycle methods
    formResetCallback() {
      this.value = this.defaultValue;
      this.checked = this.defaultChecked;
      this._customValidityMessage = '';
      this._interactionController.reset();
      this._syncFormValue();
      this.validate();
    }

    formDisabledCallback(disabled: boolean) {
      this.disabled = disabled;
    }

    formStateRestoreCallback(state: string) {
      this.value = state;
    }

    // Custom validation hook helper
    protected async validate() {
      // Evaluate constraints with fallback to attributes for synchronous validation during connection
      const constraints = {
        required: this.required !== undefined ? this.required : this.hasAttribute('required'),
        minlength: this.minlength !== undefined ? this.minlength : (this.hasAttribute('minlength') ? Number(this.getAttribute('minlength')) : undefined),
        maxlength: this.maxlength !== undefined ? this.maxlength : (this.hasAttribute('maxlength') ? Number(this.getAttribute('maxlength')) : undefined),
        pattern: this.pattern !== undefined ? this.pattern : (this.getAttribute('pattern') || ''),
        min: this.min !== undefined ? this.min : (this.getAttribute('min') || ''),
        max: this.max !== undefined ? this.max : (this.getAttribute('max') || ''),
        step: this.step !== undefined ? this.step : (this.getAttribute('step') || ''),
        type: this.type !== undefined ? this.type : (this.getAttribute('type') || 'text'),
      };

      const val = this.value !== undefined ? this.value : (this.getAttribute('value') || '');

      let flags = validateValue(val, constraints);
      let message = getValidationMessage(flags, constraints);

      // Apply Custom Error message if setCustomValidity has been called
      if (this._customValidityMessage) {
        flags = { ...flags, customError: true };
        message = this._customValidityMessage;
      }

      // Update browser validation state
      this.internals.setValidity(flags, message);
      
      // Update custom interactive states (user-valid, user-invalid)
      this._interactionController.updateUserValidity();
      
      // Update AOM invalid attribute
      if (this.internals.states) {
        if (!flags.valueMissing && Object.values(flags).some(Boolean)) {
          this.internals.ariaInvalid = 'true';
        } else {
          this.internals.ariaInvalid = 'false';
        }
      }
    }

    // Custom state manipulation helpers for manual triggers if needed
    protected handleBlur(_e: Event) {
    }

    protected handleInput(_e: Event) {
    }

    private _syncFormValue() {
      const isToggle = this.type === 'checkbox' || this.type === 'radio';
      let formValue: any = null;
      if (!isToggle || this.checked) {
        formValue = this.value !== undefined ? this.value : (this.getAttribute('value') || '');
      }
      this.internals.setFormValue(formValue);
      this.validate();
    }
  }

  return FormAssociatedClass as unknown as Constructor<FormAssociatedInterface> & T;
}
