import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 9.375rem; /* 150px equivalent */
    overflow: hidden;
    /* Custom CSS variables for visual defaults */
    --uibit-effect-particles-color: #6b7280;
    --uibit-effect-particles-line-color: #e5e7eb;
    --uibit-effect-particles-opacity: 1;
  }

  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    opacity: var(--uibit-effect-particles-opacity);
    pointer-events: none; /* Let clicks/hovers pass through to the slot content */
  }

  .content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
`;
