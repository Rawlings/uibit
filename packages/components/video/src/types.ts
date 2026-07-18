import type Video from './video';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-video': Video;
  }
}
