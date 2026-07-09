import type SentimentBar from './sentiment-bar';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-sentiment-bar': SentimentBar;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-sentiment-bar': SentimentBar;
    }
  }
}
