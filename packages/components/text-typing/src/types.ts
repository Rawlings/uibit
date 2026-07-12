import type TextTyping from './text-typing';

declare global {
interface HTMLElementTagNameMap {
    'uibit-text-typing': TextTyping;
}
}