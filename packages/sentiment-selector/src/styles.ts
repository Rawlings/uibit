import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: var(--uibit-sentiment-selector-gap, calc(0.625rem * var(--uibit-spacing-factor, 1)));
    font-family: var(--uibit-sentiment-selector-font-family, inherit);
    -webkit-user-select: none;
    user-select: none;
  }

  .track {
    display: flex;
    align-items: center;
    gap: var(--uibit-sentiment-selector-item-gap, calc(0.25rem * var(--uibit-spacing-factor, 1)));
    padding: var(--uibit-sentiment-selector-padding, calc(0.375rem * var(--uibit-spacing-factor, 1)));
    background: var(--uibit-sentiment-selector-bg, var(--uibit-bg-subtle, #f3f4f6));
    border-radius: var(--uibit-sentiment-selector-radius, 9999px);
    border: var(--uibit-sentiment-selector-border, 0.0625rem solid var(--uibit-border-color, #e5e7eb));
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--uibit-sentiment-selector-item-size, calc(2.5rem * var(--uibit-spacing-factor, 1)));
    height: var(--uibit-sentiment-selector-item-size, calc(2.5rem * var(--uibit-spacing-factor, 1)));
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
    color: var(--uibit-text-secondary, #374151);
    transition: background 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
  }

  .item:hover,
  .item:focus-visible {
    background: var(--uibit-sentiment-selector-item-hover-bg, var(--uibit-bg-subtle, rgba(0, 0, 0, 0.06)));
    opacity: 1 !important;
  }

  .item:active {
    opacity: 0.7;
  }

  .item:focus-visible {
    outline: 0.125rem solid var(--uibit-sentiment-selector-focus-color, #000000);
    outline-offset: 0.125rem;
  }

  .item[data-selected] {
    background: var(--uibit-sentiment-selector-item-selected-bg, var(--uibit-bg-surface, #ffffff));
    box-shadow: var(--uibit-sentiment-selector-item-selected-shadow, 0 0.125rem 0.5rem rgba(0, 0, 0, 0.12));
    color: var(--uibit-text-primary, #111827);
    opacity: 1 !important;
  }

  .item.dimmed {
    opacity: var(--uibit-sentiment-selector-unselected-opacity, 0.35);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--uibit-sentiment-selector-icon-size, calc(1.25rem * var(--uibit-spacing-factor, 1)));
    height: var(--uibit-sentiment-selector-icon-size, calc(1.25rem * var(--uibit-spacing-factor, 1)));
    pointer-events: none;
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .label {
    font-size: var(--uibit-sentiment-selector-label-font-size, var(--uibit-font-size-xs, calc(0.75rem * var(--uibit-font-scale-factor, 1))));
    font-weight: var(--uibit-sentiment-selector-label-font-weight, var(--uibit-font-weight-medium, 500));
    color: var(--uibit-sentiment-selector-label-color, var(--uibit-text-muted, #6b7280));
    min-height: 1em;
    min-width: 5rem;
    text-align: center;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    opacity: 0;
    visibility: hidden;
  }

  .label.visible {
    opacity: 1;
    visibility: visible;
  }
`;
