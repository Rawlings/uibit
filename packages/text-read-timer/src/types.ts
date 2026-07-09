import type TextReadTimer from './text-read-timer';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-text-read-timer': TextReadTimer;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-text-read-timer': TextReadTimer;
    }
  }
}
