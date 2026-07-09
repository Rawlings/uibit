import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--uibit-text-read-timer-font-family, inherit);
  }

  .timer {
    display: inline-flex;
    align-items: center;
    gap: var(--uibit-text-read-timer-gap, 0.375rem);
    font-size: var(--uibit-text-read-timer-font-size, 0.8125rem);
    font-weight: var(--uibit-text-read-timer-font-weight, 500);
    color: var(--uibit-text-read-timer-color, #6b7280);
    line-height: 1;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--uibit-text-read-timer-icon-color, currentColor);
    width: var(--uibit-text-read-timer-icon-size, 0.875rem);
    height: var(--uibit-text-read-timer-icon-size, 0.875rem);
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .label {
    white-space: nowrap;
  }
`;
