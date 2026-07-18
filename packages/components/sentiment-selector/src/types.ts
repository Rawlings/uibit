import type SentimentSelector from './sentiment-selector';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-sentiment-selector': SentimentSelector;
  }
}
