import type DiffViewer from './diff-viewer';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-diff-viewer': DiffViewer;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-diff-viewer': DiffViewer;
    }
  }
}
