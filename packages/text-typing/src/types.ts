import type TextTyping from './text-typing';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-text-typing': TextTyping;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-text-typing': TextTyping;
    }
  }
}
