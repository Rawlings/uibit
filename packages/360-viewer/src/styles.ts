import { css } from 'lit';

export const styles = css`
  :host {
    --uibit-360-viewer-bg: #f9fafb;
    --uibit-360-viewer-border: #e5e7eb;
    --uibit-360-viewer-button-bg: rgba(255, 255, 255, 0.75);
    --uibit-360-viewer-button-bg-hover: rgba(255, 255, 255, 0.95);
    --uibit-360-viewer-button-color: #374151;
    --uibit-360-viewer-focus-color: #000000;
    --uibit-360-viewer-progress-track-bg: rgba(0, 0, 0, 0.08);
    --uibit-360-viewer-hint-bg: rgba(17, 24, 39, 0.65);
    display: block;
    width: 100%;
  }

  .viewer {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: var(--uibit-360-viewer-bg);
    border: 0.0625rem solid var(--uibit-360-viewer-border);
    border-radius: 0.5rem;
    touch-action: none;
    user-select: none;
    -webkit-user-drag: none;
    outline: none;
  }

  .viewer:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--uibit-360-viewer-focus-color);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--uibit-360-viewer-button-bg);
    backdrop-filter: blur(0.5rem);
    -webkit-backdrop-filter: blur(0.5rem);
    border: 0.0625rem solid rgba(255, 255, 255, 0.25);
    color: var(--uibit-360-viewer-button-color);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 200ms ease, background-color 150ms ease, transform 150ms ease;
    z-index: 10;
    box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.1);
  }

  .viewer:hover .nav-button,
  .nav-button:focus-visible {
    opacity: 1;
  }

  .nav-button:hover {
    background: var(--uibit-360-viewer-button-bg-hover);
    transform: translateY(-50%) scale(1.05);
  }

  .nav-button:active {
    transform: translateY(-50%) scale(0.95);
  }

  .nav-button-prev {
    left: 0.75rem;
  }

  .nav-button-next {
    right: 0.75rem;
  }

  .nav-button svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
  }

  .drag-hint {
    position: absolute;
    bottom: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--uibit-360-viewer-hint-bg);
    color: #ffffff;
    padding: 0.375rem 0.75rem;
    border-radius: 9999rem;
    font-size: 0.75rem;
    pointer-events: none;
    opacity: 0.85;
    transition: opacity 300ms ease;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    backdrop-filter: blur(0.25rem);
    -webkit-backdrop-filter: blur(0.25rem);
    z-index: 5;
  }

  .viewer.dragging .drag-hint {
    opacity: 0;
  }

  .progress-track {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1875rem;
    background: var(--uibit-360-viewer-progress-track-bg);
    z-index: 5;
  }

  .progress-bar {
    height: 100%;
    background: var(--uibit-360-viewer-focus-color);
    transition: width 100ms ease;
  }

  .sr-only {
    position: absolute;
    width: 0.0625rem;
    height: 0.0625rem;
    padding: 0;
    margin: -0.0625rem;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
