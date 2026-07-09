import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: var(--uibit-sentiment-bar-gap, 0.625rem);
    font-family: var(--uibit-sentiment-bar-font-family, inherit);
    -webkit-user-select: none;
    user-select: none;
  }

  .track {
    display: flex;
    align-items: center;
    gap: var(--uibit-sentiment-bar-item-gap, 0.25rem);
    padding: var(--uibit-sentiment-bar-padding, 0.375rem);
    background: var(--uibit-sentiment-bar-bg, #f3f4f6);
    border-radius: var(--uibit-sentiment-bar-radius, 9999px);
    border: var(--uibit-sentiment-bar-border, 0.0625rem solid #e5e7eb);
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--uibit-sentiment-bar-item-size, 2.5rem);
    height: var(--uibit-sentiment-bar-item-size, 2.5rem);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
    color: #374151;
    transition:
      background 0.15s ease,
      transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.15s ease;
  }

  .item:hover,
  .item:focus-visible {
    background: var(--uibit-sentiment-bar-item-hover-bg, rgba(0, 0, 0, 0.06));
    transform: scale(1.15) translateY(-0.125rem);
    opacity: 1 !important;
  }

  .item[data-selected] {
    background: var(--uibit-sentiment-bar-item-selected-bg, #ffffff);
    box-shadow: var(--uibit-sentiment-bar-item-selected-shadow, 0 0.125rem 0.5rem rgba(0, 0, 0, 0.12));
    transform: scale(1.25) translateY(-0.25rem);
    color: #111827;
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
    width: var(--uibit-sentiment-bar-icon-size, 1.25rem);
    height: var(--uibit-sentiment-bar-icon-size, 1.25rem);
    pointer-events: none;
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .label {
    font-size: var(--uibit-sentiment-bar-label-font-size, 0.75rem);
    font-weight: var(--uibit-sentiment-bar-label-font-weight, 500);
    color: var(--uibit-sentiment-bar-label-color, #6b7280);
    min-height: 1em;
    min-width: 5rem;
    text-align: center;
    transition: opacity 0.2s ease;
  }

  :host(:not([value])) .label {
    opacity: 0;
  }
`;
