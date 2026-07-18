import type Table from './table';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-table': Table;
  }
}
