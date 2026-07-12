export interface ValidationConstraints {
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  type?: string;
}

/**
 * Validates a string value against standard HTML5 constraints.
 * Returns a ValidityStateFlags object representing the results.
 */
export function validateValue(value: any, constraints: ValidationConstraints): ValidityStateFlags {
  const flags: ValidityStateFlags = {
    valueMissing: false,
    typeMismatch: false,
    patternMismatch: false,
    tooLong: false,
    tooShort: false,
    rangeUnderflow: false,
    rangeOverflow: false,
    stepMismatch: false,
    badInput: false,
    customError: false,
  };

  let hasValue = false;
  if (value !== undefined && value !== null) {
    if (typeof value === 'string') {
      hasValue = value !== '';
    } else if (typeof File !== 'undefined' && value instanceof File) {
      hasValue = true;
    } else if (typeof FormData !== 'undefined' && value instanceof FormData) {
      hasValue = Array.from(value.keys()).length > 0;
    } else {
      hasValue = true;
    }
  }

  if (constraints.required && !hasValue) {
    flags.valueMissing = true;
  }

  if (hasValue && typeof value === 'string') {
    const len = value.length;
    if (constraints.minlength !== undefined && len < constraints.minlength) {
      flags.tooShort = true;
    }
    if (constraints.maxlength !== undefined && len > constraints.maxlength) {
      flags.tooLong = true;
    }

    if (constraints.pattern) {
      try {
        const regex = new RegExp(`^(?:${constraints.pattern})$`);
        if (!regex.test(value)) {
          flags.patternMismatch = true;
        }
      } catch (e) {
        // Safe regex failure fallback
      }
    }

    if (constraints.type === 'email') {
      // Simple native-matching email check
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailRegex.test(value)) {
        flags.typeMismatch = true;
      }
    } else if (constraints.type === 'url') {
      try {
        new URL(value);
      } catch (e) {
        flags.typeMismatch = true;
      }
    }

    // Number range checks
    if (constraints.min !== undefined || constraints.max !== undefined) {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        if (constraints.min !== undefined && numValue < Number(constraints.min)) {
          flags.rangeUnderflow = true;
        }
        if (constraints.max !== undefined && numValue > Number(constraints.max)) {
          flags.rangeOverflow = true;
        }
      }
    }
  }

  return flags;
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
  if (flags.rangeUnderflow) return `Value must be greater than or equal to ${constraints.min}.`;
  if (flags.rangeOverflow) return `Value must be less than or equal to ${constraints.max}.`;
  return '';
}
