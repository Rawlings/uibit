import type ScratchReveal from './scratch-reveal';

export interface ScratchRevealDetail {
  revealPercentage: number;
}

export interface ScratchProgressDetail {
  revealPercentage: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-scratch-reveal': ScratchReveal;
  }
}
