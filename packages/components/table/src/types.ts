import type Table from './table';

declare global {
  interface HTMLElementTagNameMap { 'uibit-table': Table; }
  namespace JSX { interface IntrinsicElements { 'uibit-table': Table; } }
}
