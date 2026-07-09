import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
    width: var(--uibit-isometric-cluster-width, 100%);
    height: var(--uibit-isometric-cluster-height, 20rem);
    overflow: hidden;
    user-select: none;
    cursor: grab;
  }

  :host([expanded]) {
    cursor: grabbing;
  }

  .scene {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    perspective: var(--uibit-isometric-cluster-perspective, 1200px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stack {
    position: relative;
    transform-style: preserve-3d;
    transition: transform var(--uibit-isometric-cluster-transition, 0.5s) cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .layer {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: var(--uibit-isometric-cluster-layer-width, 16rem);
    height: var(--uibit-isometric-cluster-layer-height, 3rem);
    background: var(--uibit-isometric-cluster-layer-bg, #f3f4f6);
    border: 1px solid var(--uibit-isometric-cluster-layer-border, #e5e7eb);
    border-radius: var(--uibit-isometric-cluster-layer-radius, 0.375rem);
    display: flex;
    align-items: center;
    padding: 0 1rem;
    gap: 0.625rem;
    font-family: var(--uibit-isometric-cluster-font-family, inherit);
    font-size: var(--uibit-isometric-cluster-font-size, 0.8125rem);
    font-weight: 500;
    color: var(--uibit-isometric-cluster-color, #111827);
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.07);
    cursor: pointer;
    transition:
      background var(--uibit-isometric-cluster-transition, 0.5s),
      border-color var(--uibit-isometric-cluster-transition, 0.5s),
      box-shadow var(--uibit-isometric-cluster-transition, 0.5s);
  }

  .layer:hover,
  .layer[aria-selected="true"] {
    background: var(--uibit-isometric-cluster-layer-active-bg, #ffffff);
    border-color: var(--uibit-isometric-cluster-layer-active-border, #9ca3af);
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 0.1);
  }

  .layer[aria-selected="true"] {
    outline: 2px solid var(--uibit-isometric-cluster-select-ring, #111827);
    outline-offset: 2px;
  }

  .icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.25rem;
    background: var(--uibit-isometric-cluster-icon-bg, #e5e7eb);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6875rem;
  }

  .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .badge {
    flex-shrink: 0;
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--uibit-isometric-cluster-badge-color, #6b7280);
    background: var(--uibit-isometric-cluster-badge-bg, #f3f4f6);
    border: 1px solid var(--uibit-isometric-cluster-layer-border, #e5e7eb);
    border-radius: 9999px;
    padding: 0.125rem 0.5rem;
  }

  .hint {
    position: absolute;
    bottom: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.6875rem;
    color: var(--uibit-isometric-cluster-hint-color, #9ca3af);
    pointer-events: none;
    white-space: nowrap;
    transition: opacity 0.3s;
  }

  :host([expanded]) .hint {
    opacity: 0;
  }
`;
