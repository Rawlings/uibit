import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    height: var(--uibit-scroll-progress-height, 0.1875rem);
    background: var(--uibit-scroll-progress-bg, transparent);
  }

  .progress {
    height: 100%;
    background: var(--uibit-scroll-progress-color, #000000);
    width: 0%;
    transition: width 150ms ease;
  }
`;
