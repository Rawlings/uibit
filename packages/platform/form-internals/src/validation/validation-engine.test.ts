import { describe, it, expect } from 'vitest';
import { validateValue, getValidationMessage } from './validation-engine.js';

describe('ValidationEngine', () => {
  describe('validateValue', () => {
    it('should validate required constraint', () => {
      const constraints = { required: true };
      expect(validateValue('', constraints).valueMissing).toBe(true);
      expect(validateValue(null, constraints).valueMissing).toBe(true);
      expect(validateValue(undefined, constraints).valueMissing).toBe(true);
      expect(validateValue('hello', constraints).valueMissing).toBe(false);

      // Checkbox / Radio toggle checks
      const toggleConstraintsUnchecked = {
        required: true,
        type: 'checkbox',
        checked: false,
      };
      const toggleConstraintsChecked = {
        required: true,
        type: 'checkbox',
        checked: true,
      };
      expect(validateValue('on', toggleConstraintsUnchecked).valueMissing).toBe(
        true,
      );
      expect(validateValue('on', toggleConstraintsChecked).valueMissing).toBe(
        false,
      );

      // Empty collections (FileList / Array)
      expect(validateValue([], constraints).valueMissing).toBe(true);
    });

    it('should validate minlength and maxlength constraints', () => {
      const constraints = { minlength: 3, maxlength: 5 };
      // Native programmatic validation bypasses tooShort/tooLong checks
      expect(validateValue('ab', constraints).tooShort).toBe(false);
      expect(validateValue('abc', constraints).tooShort).toBe(false);
      expect(validateValue('abcdef', constraints).tooLong).toBe(false);
      expect(validateValue('abcde', constraints).tooLong).toBe(false);
    });

    it('should validate pattern constraint', () => {
      const constraints = { pattern: '[0-9]{3}' };
      expect(validateValue('12', constraints).patternMismatch).toBe(true);
      expect(validateValue('abc', constraints).patternMismatch).toBe(true);
      expect(validateValue('123', constraints).patternMismatch).toBe(false);
    });

    it('should validate email and url type constraints', () => {
      expect(
        validateValue('invalid-email', { type: 'email' }).typeMismatch,
      ).toBe(true);
      expect(
        validateValue('test@domain.com', { type: 'email' }).typeMismatch,
      ).toBe(false);

      expect(validateValue('invalid-url', { type: 'url' }).typeMismatch).toBe(
        true,
      );
      expect(
        validateValue('https://google.com', { type: 'url' }).typeMismatch,
      ).toBe(false);
    });

    it('should validate badInput constraint for numbers', () => {
      // Native programmatic assignment clears invalid numbers, returning badInput = false
      expect(validateValue('abc', { type: 'number' }).badInput).toBe(false);
      expect(validateValue('123.45', { type: 'number' }).badInput).toBe(false);
    });

    it('should validate range constraints', () => {
      const constraints = { min: 10, max: 20, type: 'number' };
      expect(validateValue('5', constraints).rangeUnderflow).toBe(true);
      expect(validateValue('10', constraints).rangeUnderflow).toBe(false);
      expect(validateValue('25', constraints).rangeOverflow).toBe(true);
      expect(validateValue('20', constraints).rangeOverflow).toBe(false);
    });

    it('should validate step constraints', () => {
      const constraints = { min: 5, step: 3, type: 'number' }; // valid: 5, 8, 11, 14...
      expect(validateValue('8', constraints).stepMismatch).toBe(false);
      expect(validateValue('10', constraints).stepMismatch).toBe(true);
      expect(validateValue('11', constraints).stepMismatch).toBe(false);

      // default min is 0
      expect(
        validateValue('1.5', { step: 0.5, type: 'number' }).stepMismatch,
      ).toBe(false);
      expect(
        validateValue('1.3', { step: 0.5, type: 'number' }).stepMismatch,
      ).toBe(true);
    });
  });

  describe('getValidationMessage', () => {
    it('should return correct messages', () => {
      expect(getValidationMessage({ valueMissing: true } as any, {})).toBe(
        'Please fill out this field.',
      );
      expect(
        getValidationMessage({ tooShort: true } as any, { minlength: 5 }),
      ).toContain('lengthen this text to 5');
      expect(
        getValidationMessage({ tooLong: true } as any, { maxlength: 10 }),
      ).toContain('shorten this text to 10');
      expect(getValidationMessage({ patternMismatch: true } as any, {})).toBe(
        'Please match the requested format.',
      );
      expect(
        getValidationMessage({ typeMismatch: true } as any, { type: 'email' }),
      ).toBe('Please enter an email address.');
      expect(
        getValidationMessage({ typeMismatch: true } as any, { type: 'url' }),
      ).toBe('Please enter a URL.');
      expect(getValidationMessage({ badInput: true } as any, {})).toBe(
        'Please enter a number.',
      );
      expect(
        getValidationMessage({ rangeUnderflow: true } as any, { min: 10 }),
      ).toBe('Value must be greater than or equal to 10.');
      expect(
        getValidationMessage({ rangeOverflow: true } as any, { max: 20 }),
      ).toBe('Value must be less than or equal to 20.');
      expect(getValidationMessage({ stepMismatch: true } as any, {})).toBe(
        'Please enter a valid value.',
      );
    });
  });
});
