import type IsometricCluster from './isometric-cluster';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-isometric-cluster': IsometricCluster;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-isometric-cluster': IsometricCluster;
    }
  }
}
