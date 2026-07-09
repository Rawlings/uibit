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
    transition: background 0.2s ease, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-size: var(--uibit-sentiment-bar-emoji-size, 1.25rem);
    line-height: 1;
    position: relative;
    border: none;
    background: transparent;
    outline: none;
  }

  .item:hover,
  .item:focus-visible {
    background: var(--uibit-sentiment-bar-item-hover-bg, rgba(0, 0, 0, 0.06));
    transform: scale(1.15) translateY(-0.125rem);
  }

  .item[data-selected] {
    background: var(--uibit-sentiment-bar-item-selected-bg, #ffffff);
    box-shadow: var(--uibit-sentiment-bar-item-selected-shadow, 0 0.125rem 0.5rem rgba(0, 0, 0, 0.12));
    transform: scale(1.25) translateY(-0.25rem);
  }

  .item[data-selected]:hover {
    transform: scale(1.3) translateY(-0.3rem);
  }

  .emoji {
    display: block;
    transition: filter 0.2s ease;
    line-height: 1;
  }

  .item:not([data-selected]) .emoji {
    filter: grayscale(var(--uibit-sentiment-bar-unselected-grayscale, 0.5)) opacity(0.7);
  }

  .label {
    font-size: var(--uibit-sentiment-bar-label-font-size, 0.75rem);
    font-weight: var(--uibit-sentiment-bar-label-font-weight, 500);
    color: var(--uibit-sentiment-bar-label-color, #6b7280);
    min-height: 1em;
    text-align: center;
    transition: opacity 0.2s ease;
  }

  :host(:not([value])) .label {
    opacity: 0;
  }
`;
