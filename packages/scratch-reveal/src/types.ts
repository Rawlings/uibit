export interface ScratchRevealDetail {
  revealPercentage: number;
}

export interface ScratchProgressDetail {
  revealPercentage: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-scratch-reveal': import('./scratch-reveal').ScratchReveal;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-scratch-reveal': import('./scratch-reveal').ScratchReveal;
    }
  }
}
