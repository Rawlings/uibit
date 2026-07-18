import type ReadTime from './read-time';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-read-time': ReadTime;
  }
}
