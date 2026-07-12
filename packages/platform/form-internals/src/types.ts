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
  
  readonly internals: ElementInternals;
  readonly validity: ValidityState;
  readonly validationMessage: string;
  readonly willValidate: boolean;
  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  readonly files: FileList | null;
  
  checkValidity(): boolean;
  reportValidity(): boolean;
  setCustomValidity(message: string): void;
  
  // Lifecycle methods
  formResetCallback(): void;
  formDisabledCallback(disabled: boolean): void;
  formStateRestoreCallback(state: string): void;
}
