import { css } from 'lit';

export const styles = css`
  :host {
    --uibit-360-viewer-bg: #f5f5f5;
    --uibit-360-viewer-border: #e5e7eb;
    --uibit-360-viewer-button-bg: rgba(255, 255, 255, 0.7);
    --uibit-360-viewer-button-bg-hover: rgba(255, 255, 255, 0.9);
    --uibit-360-viewer-button-color: #374151;
    --uibit-360-viewer-focus-color: #000000;
    --uibit-360-viewer-progress-track-bg: rgba(0, 0, 0, 0.1);
    --uibit-360-viewer-hint-bg: rgba(17, 24, 39, 0.7);
    display: block;
    width: 100%;
  }

  .viewer {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: var(--uibit-360-viewer-bg);
    border: 1px solid var(--uibit-360-viewer-border);
    border-radius: 8px;
    touch-action: none;
    user-select: none;
    -webkit-user-drag: none;
    outline: none;
  }

  .viewer:focus-visible {
    box-shadow: 0 0 0 3px var(--uibit-360-viewer-focus-color);
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
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: var(--uibit-360-viewer-button-color);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 200ms ease, background-color 150ms ease, transform 150ms ease;
    z-index: 10;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
    left: 12px;
  }

  .nav-button-next {
    right: 12px;
  }

  .nav-button svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  .drag-hint {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--uibit-360-viewer-hint-bg);
    color: white;
    padding: 6px 12px;
    border-radius: 9999px;
    font-size: 0.75rem;
    pointer-events: none;
    opacity: 0.8;
    transition: opacity 300ms ease;
    display: flex;
    align-items: center;
    gap: 6px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
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
    height: 3px;
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
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
