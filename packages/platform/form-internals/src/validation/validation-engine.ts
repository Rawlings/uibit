export interface ValidationConstraints {
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  type?: string;
  checked?: boolean;
}

/**
 * Validates a string value against standard HTML5 constraints.
 * Returns a ValidityStateFlags object representing the results.
 */
export function validateValue(value: any, constraints: ValidationConstraints): ValidityStateFlags {
  const input = document.createElement('input');
  
  // Set type
  const type = constraints.type || 'text';
  input.type = type;
  
  // Set validation attributes
  if (constraints.required) input.required = true;
  if (constraints.minlength !== undefined) input.minLength = constraints.minlength;
  if (constraints.maxlength !== undefined) input.maxLength = constraints.maxlength;
  if (constraints.pattern) input.pattern = constraints.pattern;
  if (constraints.min !== undefined && constraints.min !== '') input.min = String(constraints.min);
  if (constraints.max !== undefined && constraints.max !== '') input.max = String(constraints.max);
  if (constraints.step !== undefined && constraints.step !== '') input.step = String(constraints.step);

  const isToggle = type === 'checkbox' || type === 'radio';
  
  // Populate values
  if (isToggle) {
    input.checked = !!constraints.checked;
    input.value = value !== undefined && value !== null ? String(value) : '';
  } else if (typeof FileList !== 'undefined' && value instanceof FileList) {
    if (value.length > 0 && typeof DataTransfer !== 'undefined') {
      input.files = value;
    }
  } else if (typeof File !== 'undefined' && value instanceof File) {
    if (typeof DataTransfer !== 'undefined') {
      const dt = new DataTransfer();
      dt.items.add(value);
      input.files = dt.files;
    }
  } else {
    input.value = value !== undefined && value !== null ? String(value) : '';
  }

  // Trigger validation
  input.checkValidity();

  return {
    valueMissing: input.validity.valueMissing,
    typeMismatch: input.validity.typeMismatch,
    patternMismatch: input.validity.patternMismatch,
    tooLong: input.validity.tooLong,
    tooShort: input.validity.tooShort,
    rangeUnderflow: input.validity.rangeUnderflow,
    rangeOverflow: input.validity.rangeOverflow,
    stepMismatch: input.validity.stepMismatch,
    badInput: input.validity.badInput,
    customError: false,
  };
}

/**
 * Gets a default native-like message for the failed validation constraints.
 */
export function getValidationMessage(flags: ValidityStateFlags, constraints: ValidationConstraints): string {
  if (flags.valueMissing) return 'Please fill out this field.';
  if (flags.tooShort) return `Please lengthen this text to ${constraints.minlength} characters or more.`;
  if (flags.tooLong) return `Please shorten this text to ${constraints.maxlength} characters or less.`;
  if (flags.patternMismatch) return 'Please match the requested format.';
  if (flags.typeMismatch) {
    if (constraints.type === 'email') return 'Please enter an email address.';
    if (constraints.type === 'url') return 'Please enter a URL.';
    return 'Please enter a valid value.';
  }
  if (flags.badInput) return 'Please enter a number.';
  if (flags.rangeUnderflow) return `Value must be greater than or equal to ${constraints.min}.`;
  if (flags.rangeOverflow) return `Value must be less than or equal to ${constraints.max}.`;
  if (flags.stepMismatch) return 'Please enter a valid value.';
  return '';
}
