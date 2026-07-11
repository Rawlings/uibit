import type NumberIncrement from './number-increment';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-number-increment': NumberIncrement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-number-increment': NumberIncrement;
    }
  }
}
