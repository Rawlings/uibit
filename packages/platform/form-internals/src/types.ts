export type Constructor<T = {}> = new (...args: any[]) => T;

export interface FormAssociatedInterface {
  value: string | File | FormData | null;
  name: string;
  disabled: boolean;
  required: boolean;
  defaultValue: string;
  readOnly: boolean;
  checked: boolean;
  defaultChecked: boolean;
  multiple: boolean;
  placeholder: string;
  autofocus: boolean;
  autocomplete: string;

  pattern: string;
  minlength?: number;
  maxlength?: number;
  min: string;
  max: string;
  step: string;
  type: string;
  
  readonly internals: ElementInternals;
  readonly validity: ValidityState;
  readonly validationMessage: string;
  readonly willValidate: boolean;
  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  readonly files: FileList | null;

  valueAsNumber: number;
  valueAsDate: Date | null;
  selectionStart: number | null;
  selectionEnd: number | null;
  selectionDirection: 'forward' | 'backward' | 'none' | null;
  indeterminate: boolean;

  formAction: string;
  formEnctype: string;
  formMethod: string;
  formNoValidate: boolean;
  formTarget: string;
  readonly validationAnchor?: HTMLElement;
  
  checkValidity(): boolean;
  reportValidity(): boolean;
  setCustomValidity(message: string): void;

  select(): void;
  setSelectionRange(start: number | null, end: number | null, direction?: 'forward' | 'backward' | 'none'): void;
  setRangeText(replacement: string, start?: number, end?: number, selectionMode?: 'select' | 'start' | 'end' | 'preserve'): void;
  stepUp(n?: number): void;
  stepDown(n?: number): void;
  showPicker(): void;
  
  // Lifecycle methods
  formAssociatedCallback?(form: HTMLFormElement | null): void;
  formResetCallback(): void;
  formDisabledCallback(disabled: boolean): void;
  formStateRestoreCallback(state: string | File | FormData | null, mode: 'restore' | 'autocomplete'): void;
}
