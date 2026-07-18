import { msg, str } from '@lit/localize';

/**
 * Defines standard HTML5 form validation constraint attributes.
 */
export interface ValidationConstraints {
  /** Whether the field requires a value. */
  required?: boolean;
  /** The minimum character length. */
  minlength?: number;
  /** The maximum character length. */
  maxlength?: number;
  /** A regular expression pattern for the value to match. */
  pattern?: string;
  /** The minimum value allowed. */
  min?: string | number;
  /** The maximum value allowed. */
  max?: string | number;
  /** The step interval for numeric/date inputs. */
  step?: string | number;
  /** The type of input control, dictating default validation rules. */
  type?: string;
  /** The checked state, checked for validity against required. */
  checked?: boolean;
}

/**
 * Validates a string value against standard HTML5 constraints.
 * Returns a ValidityStateFlags object representing the results.
 */
export function validateValue(
  value: any,
  constraints: ValidationConstraints,
): ValidityStateFlags {
  const input = document.createElement('input');

  // Set type
  const type = constraints.type || 'text';
  input.type = type;

  // Set validation attributes
  if (constraints.required) input.required = true;
  if (constraints.minlength !== undefined)
    input.minLength = constraints.minlength;
  if (constraints.maxlength !== undefined)
    input.maxLength = constraints.maxlength;
  if (constraints.pattern) input.pattern = constraints.pattern;
  if (constraints.min !== undefined && constraints.min !== '')
    input.min = String(constraints.min);
  if (constraints.max !== undefined && constraints.max !== '')
    input.max = String(constraints.max);
  if (constraints.step !== undefined && constraints.step !== '')
    input.step = String(constraints.step);

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
export function getValidationMessage(
  flags: ValidityStateFlags,
  constraints: ValidationConstraints,
): string {
  if (flags.valueMissing) return msg('Please fill out this field.');
  if (flags.tooShort)
    return msg(
      str`Please lengthen this text to ${constraints.minlength} characters or more.`,
    );
  if (flags.tooLong)
    return msg(
      str`Please shorten this text to ${constraints.maxlength} characters or less.`,
    );
  if (flags.patternMismatch) return msg('Please match the requested format.');
  if (flags.typeMismatch) {
    if (constraints.type === 'email')
      return msg('Please enter an email address.');
    if (constraints.type === 'url') return msg('Please enter a URL.');
    return msg('Please enter a valid value.');
  }
  if (flags.badInput) return msg('Please enter a number.');
  if (flags.rangeUnderflow)
    return msg(str`Value must be greater than or equal to ${constraints.min}.`);
  if (flags.rangeOverflow)
    return msg(str`Value must be less than or equal to ${constraints.max}.`);
  if (flags.stepMismatch) return msg('Please enter a valid value.');
  return '';
}
