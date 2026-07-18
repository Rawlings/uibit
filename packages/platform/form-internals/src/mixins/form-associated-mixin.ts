import { LitElement } from 'lit';
import type { Constructor, FormAssociatedInterface } from '../types.js';
import { validateValue, getValidationMessage } from '../validation/validation-engine.js';
import { InteractionController } from '../controllers/interaction-controller.js';

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
        autofocus: { type: Boolean, reflect: true },
        autocomplete: { type: String, reflect: true },
        formAction: { type: String, attribute: 'formaction', reflect: true },
        formEnctype: { type: String, attribute: 'formenctype', reflect: true },
        formMethod: { type: String, attribute: 'formmethod', reflect: true },
        formNoValidate: { type: Boolean, attribute: 'formnovalidate', reflect: true },
        formTarget: { type: String, attribute: 'formtarget', reflect: true }
      };
    }

    private _value: string | File | FormData | null = '';

    get value(): string | File | FormData | null {
      const isToggle = this.type === 'checkbox' || this.type === 'radio';
      if (isToggle && (this._value === '' || this._value === undefined || this._value === null)) {
        return 'on';
      }
      return this._value;
    }

    set value(newValue: string | File | FormData | null) {
      const oldValue = this._value;
      this._value = newValue;
      this._files = null;
      this._syncFormValue();
      this.requestUpdate('value', oldValue);
    }

    name!: string;
    private _disabled = false;
    private _fieldsetDisabled = false;

    get disabled() {
      return this._disabled || this._fieldsetDisabled;
    }

    set disabled(value: boolean) {
      const oldValue = this._disabled;
      this._disabled = value;
      
      if (value) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
      
      this.validate();
      this.requestUpdate('disabled', oldValue || this._fieldsetDisabled);
    }
    required = false;
    pattern = '';
    minlength?: number;
    maxlength?: number;
    min = '';
    max = '';
    step = '';
    type = 'text';
    readOnly = false;
    checked = false;
    multiple = false;
    placeholder = '';
    autofocus = false;
    autocomplete = '';

    private _initialDefaultValue: string | null = null;
    private _initialDefaultChecked: boolean | null = null;
    private _initialValueInitialized = false;

    get defaultValue() {
      if (this._initialDefaultValue === null) {
        const isToggle = this.type === 'checkbox' || this.type === 'radio';
        const attrVal = this.getAttribute('value');
        this._initialDefaultValue = attrVal !== null ? attrVal : (isToggle ? 'on' : '');
      }
      return this._initialDefaultValue;
    }

    set defaultValue(newValue: string) {
      this._initialDefaultValue = newValue;
      this.setAttribute('value', newValue);
    }

    get defaultChecked() {
      if (this._initialDefaultChecked === null) {
        this._initialDefaultChecked = this.hasAttribute('checked');
      }
      return this._initialDefaultChecked;
    }

    set defaultChecked(newValue: boolean) {
      this._initialDefaultChecked = newValue;
      if (newValue) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    }

    private _files: FileList | null = null;

    get files(): FileList | null {
      const input = this._defaultValidationAnchor as HTMLInputElement;
      if (input && 'files' in input && this.type === 'file') {
        return input.files;
      }
      if (this._files) {
        return this._files;
      }
      if (this.value instanceof File) {
        if (typeof DataTransfer !== 'undefined') {
          const dt = new DataTransfer();
          dt.items.add(this.value);
          return dt.files;
        }
      }
      return null;
    }

    set files(newFiles: FileList | null) {
      this._files = newFiles;
      const input = this._defaultValidationAnchor as HTMLInputElement;
      if (input && 'files' in input) {
        input.files = newFiles;
      }
      if (newFiles && newFiles.length > 0) {
        this.value = newFiles[0] || null;
      } else {
        this.value = null;
      }
    }
    
    readonly internals: ElementInternals;
    private _interactionController: InteractionController;
    private _customValidityMessage = '';

    constructor(...args: any[]) {
      super(...args);
      this.internals = this.attachInternals();
      this._interactionController = new InteractionController(this, this.internals);
      this.value = '';
      this.name = '';
      this.type = 'text';
      this.disabled = false;
      this.required = false;
      this.readOnly = false;
      this.checked = false;
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
      return this.internals.checkValidity();
    }

    reportValidity() {
      return this.internals.reportValidity();
    }

    setCustomValidity(message: string) {
      this._customValidityMessage = message;
      this.validate();
    }

    static get shadowRootOptions() {
      return {
        ...(Base as any).shadowRootOptions,
        delegatesFocus: true
      } as ShadowRootInit;
    }

    get validationAnchor(): HTMLElement | undefined {
      return undefined;
    }

    private get _defaultValidationAnchor(): HTMLElement | undefined {
      if (this.validationAnchor) {
        return this.validationAnchor;
      }
      if (!this.shadowRoot) return undefined;
      return this.shadowRoot.querySelector('input, textarea, select, button, [tabindex="0"]') as HTMLElement || undefined;
    }

    attributeChangedCallback(name: string, old: string | null, value: string | null) {
      if (name === 'value' && this._interactionController?.dirty) {
        // Native parity: attribute changes do not overwrite the current value if the element is dirty
        return;
      }
      super.attributeChangedCallback(name, old, value);
    }

    private _changeListenerAdded = false;

    connectedCallback() {
      super.connectedCallback();
      this._syncFormValue();
      this.validate();
      this._setupShadowListeners();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.shadowRoot && this._changeListenerAdded) {
        this.shadowRoot.removeEventListener('change', this._handleShadowEvent);
        this.shadowRoot.removeEventListener('select', this._handleShadowEvent);
        this.shadowRoot.removeEventListener('search', this._handleShadowEvent);
        this._changeListenerAdded = false;
      }
    }

    firstUpdated(changedProperties: Map<PropertyKey, unknown>) {
      super.firstUpdated(changedProperties);
      this.validate();
      this._setupShadowListeners();
    }

    private _setupShadowListeners() {
      if (this.shadowRoot && !this._changeListenerAdded) {
        this.shadowRoot.addEventListener('change', this._handleShadowEvent);
        this.shadowRoot.addEventListener('select', this._handleShadowEvent);
        this.shadowRoot.addEventListener('search', this._handleShadowEvent);
        this._changeListenerAdded = true;
      }
    }

    private _handleShadowEvent = (e: Event) => {
      if (e.target === this) return;
      e.stopPropagation();
      this.dispatchEvent(new Event(e.type, {
        bubbles: e.bubbles,
        cancelable: e.cancelable,
        composed: true
      }));
    };

    willUpdate(changedProperties: Map<PropertyKey, unknown>) {
      if (!this._initialValueInitialized) {
        // Eagerly cache default values from attributes on first update
        void this.defaultValue;
        void this.defaultChecked;
        this._initialValueInitialized = true;
      }
      
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

      if (changedProperties.has('value')) {
        this._files = null;
        this._syncFormValue();
      } else if (changedProperties.has('checked')) {
        this._syncFormValue();
      } else if (
        changedProperties.has('required') ||
        changedProperties.has('pattern') ||
        changedProperties.has('minlength') ||
        changedProperties.has('maxlength') ||
        changedProperties.has('min') ||
        changedProperties.has('max') ||
        changedProperties.has('step') ||
        changedProperties.has('type') ||
        changedProperties.has('readOnly')
      ) {
        this.validate();
      }
    }

    // Native ElementInternals Form Association lifecycle methods
    formAssociatedCallback(_form: HTMLFormElement | null) {
      // Hook for sub-classes
    }

    formResetCallback() {
      this.value = this.defaultValue;
      this.checked = this.defaultChecked;
      this._customValidityMessage = '';
      this._files = null;
      this._interactionController.reset();
      this._syncFormValue();
      this.validate();
    }

    formDisabledCallback(disabled: boolean) {
      const oldValue = this.disabled;
      this._fieldsetDisabled = disabled;
      this.validate();
      this.requestUpdate('disabled', oldValue);
    }

    formStateRestoreCallback(state: string | File | FormData | null, _mode: 'restore' | 'autocomplete') {
      const isToggle = this.type === 'checkbox' || this.type === 'radio';
      if (isToggle) {
        this.checked = state === 'checked';
      } else if (typeof File !== 'undefined' && state instanceof File) {
        this.value = state;
      } else {
        this.value = state as string;
      }
    }

    protected async validate() {
      if (this.disabled || this.readOnly) {
        this.internals.setValidity({}, '');
        this._interactionController.updateUserValidity();
        return;
      }

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
        checked: this.checked,
      };

      const val = this.value !== undefined ? this.value : (this.getAttribute('value') || '');

      let flags = validateValue(val, constraints);
      let message = getValidationMessage(flags, constraints);

      // Apply Custom Error message if setCustomValidity has been called
      if (this._customValidityMessage) {
        flags = { ...flags, customError: true };
        message = this._customValidityMessage;
      }

      // Update browser validation state, passing our default validation anchor element
      this.internals.setValidity(flags, message, this._defaultValidationAnchor);
      
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



    private _syncFormValue() {
      const isToggle = this.type === 'checkbox' || this.type === 'radio';
      let submissionValue: any = null;
      let stateValue: any = null;

      if (isToggle) {
        const val = this.value !== undefined && this.value !== null && this.value !== '' ? this.value : (this.getAttribute('value') || 'on');
        submissionValue = this.checked ? val : null;
        stateValue = this.checked ? 'checked' : 'unchecked';
      } else {
        submissionValue = this.value !== undefined ? this.value : (this.getAttribute('value') || '');
        stateValue = submissionValue;
      }

      this.internals.setFormValue(submissionValue, stateValue);
      this.validate();
    }

    get valueAsNumber(): number {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && 'valueAsNumber' in anchor) {
        return anchor.valueAsNumber;
      }
      return Number(this.value);
    }

    set valueAsNumber(val: number) {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && 'valueAsNumber' in anchor) {
        anchor.valueAsNumber = val;
        this.value = anchor.value;
      } else {
        this.value = isNaN(val) ? '' : String(val);
      }
    }

    get valueAsDate(): Date | null {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && 'valueAsDate' in anchor) {
        return anchor.valueAsDate;
      }
      if (!this.value) return null;
      const parsed = Date.parse(String(this.value));
      return isNaN(parsed) ? null : new Date(parsed);
    }

    set valueAsDate(val: Date | null) {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && 'valueAsDate' in anchor) {
        anchor.valueAsDate = val;
        this.value = anchor.value;
      } else {
        this.value = val ? val.toISOString() : '';
      }
    }

    get selectionStart(): number | null {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      return anchor ? anchor.selectionStart : null;
    }

    set selectionStart(val: number | null) {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor) anchor.selectionStart = val;
    }

    get selectionEnd(): number | null {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      return anchor ? anchor.selectionEnd : null;
    }

    set selectionEnd(val: number | null) {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor) anchor.selectionEnd = val;
    }

    get selectionDirection(): 'forward' | 'backward' | 'none' | null {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      return anchor ? anchor.selectionDirection : null;
    }

    set selectionDirection(val: 'forward' | 'backward' | 'none' | null) {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor) anchor.selectionDirection = val;
    }

    get indeterminate(): boolean {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      return anchor ? anchor.indeterminate : false;
    }

    set indeterminate(val: boolean) {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor) anchor.indeterminate = val;
    }

    get formAction(): string {
      return this.getAttribute('formaction') || '';
    }

    set formAction(val: string) {
      this.setAttribute('formaction', val);
    }

    get formEnctype(): string {
      return this.getAttribute('formenctype') || '';
    }

    set formEnctype(val: string) {
      this.setAttribute('formenctype', val);
    }

    get formMethod(): string {
      return this.getAttribute('formmethod') || '';
    }

    set formMethod(val: string) {
      this.setAttribute('formmethod', val);
    }

    get formNoValidate(): boolean {
      return this.hasAttribute('formnovalidate');
    }

    set formNoValidate(val: boolean) {
      if (val) {
        this.setAttribute('formnovalidate', '');
      } else {
        this.removeAttribute('formnovalidate');
      }
    }

    get formTarget(): string {
      return this.getAttribute('formtarget') || '';
    }

    set formTarget(val: string) {
      this.setAttribute('formtarget', val);
    }

    select() {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && typeof anchor.select === 'function') {
        anchor.select();
      }
    }

    setSelectionRange(start: number | null, end: number | null, direction?: 'forward' | 'backward' | 'none') {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && typeof anchor.setSelectionRange === 'function') {
        anchor.setSelectionRange(start, end, direction);
      }
    }

    setRangeText(replacement: string, start?: number, end?: number, selectionMode?: 'select' | 'start' | 'end' | 'preserve') {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && typeof anchor.setRangeText === 'function') {
        if (start !== undefined && end !== undefined) {
          anchor.setRangeText(replacement, start, end, selectionMode);
        } else {
          anchor.setRangeText(replacement);
        }
        this.value = anchor.value;
      }
    }

    stepUp(n?: number) {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && typeof anchor.stepUp === 'function') {
        anchor.stepUp(n);
        this.value = anchor.value;
      }
    }

    stepDown(n?: number) {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && typeof anchor.stepDown === 'function') {
        anchor.stepDown(n);
        this.value = anchor.value;
      }
    }

    showPicker() {
      const anchor = this._defaultValidationAnchor as HTMLInputElement;
      if (anchor && typeof anchor.showPicker === 'function') {
        anchor.showPicker();
      }
    }
  }

  return FormAssociatedClass as unknown as Constructor<FormAssociatedInterface> & T;
}
