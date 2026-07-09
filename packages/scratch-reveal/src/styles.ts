import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    --uibit-scratch-reveal-width: 25rem;
    --uibit-scratch-reveal-height: 12.5rem;
    --uibit-scratch-reveal-overlay-color: #d1d5db;
    --uibit-scratch-reveal-cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="%23111" opacity="0.5"/><circle cx="16" cy="16" r="12" fill="none" stroke="white" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="white"/></svg>') 16 16, crosshair;
    --uibit-scratch-reveal-brush-size: 5rem;
  }

  .scratch-container {
    position: relative;
    width: var(--uibit-scratch-reveal-width);
    height: var(--uibit-scratch-reveal-height);
    overflow: hidden;
    border-radius: var(--uibit-scratch-reveal-border-radius, 0.5rem);
    background: var(--uibit-scratch-reveal-background, #f3f4f6);
    user-select: none;
    touch-action: none;
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--uibit-scratch-reveal-padding, 1rem);
    font-size: var(--uibit-scratch-reveal-font-size, var(--uibit-font-size-base, 1rem));
    font-weight: var(--uibit-scratch-reveal-font-weight, var(--uibit-font-weight-semibold, 600));
    color: var(--uibit-scratch-reveal-color, #111827);
    text-align: center;
    word-break: break-word;
    z-index: 1;
  }

  canvas {
    position: absolute;
    inset: 0;
    cursor: var(--uibit-scratch-reveal-cursor);
    z-index: 2;
    display: block;
  }

  .instructions {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: var(--uibit-scratch-reveal-instructions-color, rgba(0, 0, 0, 0.4));
    font-size: var(--uibit-scratch-reveal-instructions-font-size, var(--uibit-font-size-sm, 0.875rem));
    pointer-events: none;
    z-index: 3;
  }

  .instructions-text {
    display: block;
    margin-bottom: 0.5rem;
  }
`;
