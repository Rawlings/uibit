export interface ScrollProgressConfig {
  height?: number;
  color?: string;
  backgroundColor?: string;
  position?: 'top' | 'bottom';
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-scroll-progress': import('./scroll-progress').ScrollProgress;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-scroll-progress': import('./scroll-progress').ScrollProgress;
    }
  }
}
