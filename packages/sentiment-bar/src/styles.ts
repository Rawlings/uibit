import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: var(--uibit-sentiment-bar-gap, calc(0.625rem * var(--uibit-spacing-factor, 1)));
    font-family: var(--uibit-sentiment-bar-font-family, inherit);
    -webkit-user-select: none;
    user-select: none;
  }

  .track {
    display: flex;
    align-items: center;
    gap: var(--uibit-sentiment-bar-item-gap, calc(0.25rem * var(--uibit-spacing-factor, 1)));
    padding: var(--uibit-sentiment-bar-padding, calc(0.375rem * var(--uibit-spacing-factor, 1)));
    background: var(--uibit-sentiment-bar-bg, var(--uibit-bg-subtle, #f3f4f6));
    border-radius: var(--uibit-sentiment-bar-radius, 9999px);
    border: var(--uibit-sentiment-bar-border, 0.0625rem solid var(--uibit-border-color, #e5e7eb));
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--uibit-sentiment-bar-item-size, calc(2.5rem * var(--uibit-spacing-factor, 1)));
    height: var(--uibit-sentiment-bar-item-size, calc(2.5rem * var(--uibit-spacing-factor, 1)));
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
    color: var(--uibit-text-secondary, #374151);
    transition:
      background 0.15s ease,
      transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.15s ease;
  }

  .item:hover,
  .item:focus-visible {
    background: var(--uibit-sentiment-bar-item-hover-bg, var(--uibit-bg-subtle, rgba(0, 0, 0, 0.06)));
    transform: scale(1.15) translateY(-0.125rem);
    opacity: 1 !important;
  }

  .item[data-selected] {
    background: var(--uibit-sentiment-bar-item-selected-bg, var(--uibit-bg-surface, #ffffff));
    box-shadow: var(--uibit-sentiment-bar-item-selected-shadow, 0 0.125rem 0.5rem rgba(0, 0, 0, 0.12));
    transform: scale(1.25) translateY(-0.25rem);
    color: var(--uibit-text-primary, #111827);
    opacity: 1 !important;
  }

  .item[data-selected]:hover {
    transform: scale(1.3) translateY(-0.3rem);
  }

  .item.dimmed {
    opacity: var(--uibit-sentiment-bar-unselected-opacity, 0.35);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--uibit-sentiment-bar-icon-size, calc(1.25rem * var(--uibit-spacing-factor, 1)));
    height: var(--uibit-sentiment-bar-icon-size, calc(1.25rem * var(--uibit-spacing-factor, 1)));
    pointer-events: none;
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .label {
    font-size: var(--uibit-sentiment-bar-label-font-size, calc(0.75rem * var(--uibit-font-scale-factor, 1)));
    font-weight: var(--uibit-sentiment-bar-label-font-weight, 500);
    color: var(--uibit-sentiment-bar-label-color, var(--uibit-text-muted, #6b7280));
    min-height: 1em;
    min-width: 5rem;
    text-align: center;
    transition: opacity 0.2s ease;
  }

  :host(:not([value])) .label {
    opacity: 0;
  }
`;
