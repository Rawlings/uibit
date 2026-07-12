import type { Form } from './form';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-form': Form;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-form': Form;
    }
  }
}
