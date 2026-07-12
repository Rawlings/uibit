import type DiffViewer from './diff-viewer';

declare global {
interface HTMLElementTagNameMap {
    'uibit-diff-viewer': DiffViewer;
}
}