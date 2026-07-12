import type TextRotator from './text-rotator';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-text-rotator': TextRotator;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-text-rotator': TextRotator;
    }
  }
}
