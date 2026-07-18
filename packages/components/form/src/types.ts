import type { Form } from './form';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-form': Form;
  }
}
