import type ImageXray from './image-xray';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-image-xray': ImageXray;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-image-xray': ImageXray;
    }
  }
}
