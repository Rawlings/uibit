// Test helper to polyfill attachInternals and Canvas getContext for Happy-DOM in tests

if (typeof window !== 'undefined') {
  Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
    value: function(this: HTMLElement) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const host = this;
      const states = new Set<string>();
      const validity = {
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
        valid: true,
      };
      
      const internalsObj = {
        states,
        validity,
        validationMessage: '',
        willValidate: true,
        ariaDisabled: 'false',
        ariaRequired: 'false',
        ariaInvalid: 'false',
        formValue: null as any,
        get form() {
          let parent = host.parentElement;
          while (parent) {
            if (parent.tagName === 'FORM') {
              return parent as HTMLFormElement;
            }
            parent = parent.parentElement;
          }
          return null;
        },
        get labels() {
          const id = host.id;
          if (id) {
            return host.ownerDocument.querySelectorAll(`label[for="${id}"]`);
          }
          // Fallback to empty NodeList by querying a non-existent tag
          return host.ownerDocument.querySelectorAll('uibit-nonexistent-label-selector');
        },
        setFormValue: (val: any) => {
          internalsObj.formValue = val;
        },
        setValidity: (flags: any, message: string) => {
          Object.assign(validity, flags);
          validity.valid = !Object.values(flags).some(Boolean);
          internalsObj.validationMessage = message;
        },
        checkValidity: () => validity.valid,
        reportValidity: () => validity.valid,
      };

      return internalsObj as unknown as ElementInternals;
    },
    writable: true,
    configurable: true
  });

  // Always polyfill Canvas getContext for Happy-DOM
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: function(this: HTMLCanvasElement) {
      return {
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        quadraticCurveTo: () => {},
        stroke: () => {},
        clearRect: () => {},
        drawImage: () => {},
        scale: () => {},
      } as any;
    },
    writable: true,
    configurable: true
  });
}
export {};
