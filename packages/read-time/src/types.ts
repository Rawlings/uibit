import type ReadTime from './read-time';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-read-time': ReadTime;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-read-time': ReadTime;
    }
  }
}
