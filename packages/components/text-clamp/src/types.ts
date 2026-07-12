import type TextClamp from './text-clamp';

declare global {
interface HTMLElementTagNameMap {
    'uibit-text-clamp': TextClamp;
}
}