import type TextClamp from './text-clamp';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-text-clamp': TextClamp;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-text-clamp': TextClamp;
    }
  }
}
