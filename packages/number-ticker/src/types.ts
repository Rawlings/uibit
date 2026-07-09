import type NumberTicker from './number-ticker';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-number-ticker': NumberTicker;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-number-ticker': NumberTicker;
    }
  }
}
