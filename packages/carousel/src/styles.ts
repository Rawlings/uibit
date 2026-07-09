import { css } from 'lit';

export const styles = css`
  :host {
    --uibit-carousel-gap: var(--uibit-spacing-4, 1rem);
    --uibit-carousel-duration: 300ms;
    --uibit-carousel-items-per-view: 1;
    --uibit-carousel-border-color: var(--uibit-border-color, var(--uibit-color-gray-200, #e5e7eb));
    --uibit-carousel-button-bg: var(--uibit-bg-surface, var(--uibit-color-white, #ffffff));
    --uibit-carousel-button-bg-hover: var(--uibit-focus-color, var(--uibit-color-black, #000000));
    --uibit-carousel-indicator-bg: var(--uibit-border-color, var(--uibit-color-gray-200, #e5e7eb));
    --uibit-carousel-indicator-active-bg: var(--uibit-focus-color, var(--uibit-color-black, #000000));
    --uibit-carousel-focus-color: var(--uibit-focus-color, var(--uibit-color-black, #000000));
    display: block;
    width: 100%;
  }

  .carousel {
    display: flex;
    flex-direction: column;
    gap: var(--uibit-spacing-4, 1rem);
    width: 100%;
  }

  .carousel-viewport {
    position: relative;
    overflow: hidden;
    border: 0.0625rem solid var(--uibit-carousel-border-color);
    border-radius: var(--uibit-radius-2xl, 0.75rem);
    background-color: var(--uibit-bg-surface, var(--uibit-color-white, #ffffff));
  }

  .carousel-content {
    display: flex;
    gap: var(--uibit-carousel-gap);
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding: var(--uibit-spacing-4, 1rem);
    width: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .carousel-content::-webkit-scrollbar {
    display: none;
  }

  ::slotted([slot='item']) {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    flex: 0 0 calc(
      (100% - (var(--uibit-carousel-items-per-view) - 1) * var(--uibit-carousel-gap)) /
        var(--uibit-carousel-items-per-view)
    );
    min-width: 0;
  }

  .carousel-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--uibit-spacing-4, 1rem);
  }

  .carousel-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .carousel-button {
    padding: var(--uibit-spacing-2, 0.5rem) var(--uibit-spacing-4, 1rem);
    background-color: var(--uibit-carousel-button-bg);
    border: 0.0625rem solid var(--uibit-carousel-border-color);
    border-radius: var(--uibit-radius-lg, 0.375rem);
    cursor: pointer;
    font-weight: 500;
    font-size: 0.875rem;
    color: var(--uibit-text-primary, var(--uibit-color-gray-900, #111827));
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
    display: inline-flex;
    align-items: center;
    gap: var(--uibit-spacing-1, 0.25rem);
  }

  .carousel-button:hover:not(:disabled) {
    background-color: var(--uibit-carousel-button-bg-hover);
    color: var(--uibit-bg-surface, var(--uibit-color-white, #ffffff));
    border-color: var(--uibit-carousel-button-bg-hover);
  }

  .carousel-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .carousel-button:focus-visible {
    outline: 0.125rem solid var(--uibit-carousel-focus-color);
    outline-offset: 0.125rem;
  }

  .carousel-indicators {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }

  .carousel-indicator {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999rem;
    background-color: var(--uibit-carousel-indicator-bg);
    cursor: pointer;
    border: none;
    padding: 0;
    transition: background-color 150ms ease, width 150ms ease, border-radius 150ms ease;
  }

  .carousel-indicator:hover {
    background-color: var(--uibit-carousel-indicator-active-bg);
  }

  .carousel-indicator.active {
    width: 1.25rem;
    border-radius: 0.25rem;
    background-color: var(--uibit-carousel-indicator-active-bg);
  }

  .carousel-indicator:focus-visible {
    outline: 0.125rem solid var(--uibit-carousel-focus-color);
    outline-offset: 0.125rem;
  }

  @media (max-width: 40rem) {
    .carousel-controls {
      flex-wrap: wrap;
    }

    .carousel-content {
      padding: 0.75rem;
    }

    .carousel-button {
      padding: 0.375rem 0.75rem;
    }
  }
`;
