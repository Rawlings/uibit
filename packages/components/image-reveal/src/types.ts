import type ImageReveal from './image-reveal';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-image-reveal': ImageReveal;
  }
}
