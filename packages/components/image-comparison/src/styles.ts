import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;
    outline: none;
    border-radius: 0.5rem;

    --uibit-image-comparison-handle-size: 2.25rem;
    --uibit-image-comparison-handle-bg: #ffffff;
    --uibit-image-comparison-handle-border-color: #e5e7eb;
    --uibit-image-comparison-handle-inner-color: #111827;
    --uibit-image-comparison-border-color: #ffffff;
  }

  :host(:focus-visible) {
    box-shadow: 0 0 0 0.1875rem rgba(0, 0, 0, 0.35);
  }

  .container {
    position: relative;
    width: 100%;
    height: 100%;
    touch-action: none;
  }

  .container.dragging,
  .container.dragging .handle {
    cursor: grabbing !important;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .layer::slotted(*),
  .layer slot::slotted(*) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    display: block;
  }

  .layer-after {
    z-index: 0;
  }

  .layer-before {
    z-index: 1;
    pointer-events: none;
  }

  .divider {
    position: absolute;
    z-index: 2;
    background-color: var(--uibit-image-comparison-border-color);
    pointer-events: none;
    opacity: 0.9;
  }

  .divider-horizontal {
    top: 0;
    bottom: 0;
    width: 0.125rem;
    transform: translateX(-50%);
  }

  .divider-vertical {
    left: 0;
    right: 0;
    height: 0.125rem;
    transform: translateY(-50%);
  }

  .handle {
    position: absolute;
    z-index: 3;
    width: var(--uibit-image-comparison-handle-size);
    height: var(--uibit-image-comparison-handle-size);
    border-radius: 9999px;
    background-color: var(--uibit-image-comparison-handle-bg);
    border: 0.0625rem solid var(--uibit-image-comparison-handle-border-color);
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    cursor: grab;
    transition: background-color 150ms ease, border-color 150ms ease, transform 150ms ease;
  }

  .handle:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
    box-shadow: none;
    transform: translate(-50%, -50%) scale(1.06);
  }

  .handle:active {
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(0.95);
  }

  .handle-icon {
    width: 1.125rem;
    height: 1.125rem;
    color: var(--uibit-image-comparison-handle-inner-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .handle-icon svg {
    width: 100%;
    height: 100%;
  }
`;
