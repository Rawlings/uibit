import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--uibit-read-timer-gap, 0.375rem);
    font-size: var(--uibit-read-timer-font-size, 0.8125rem);
    font-weight: var(--uibit-read-timer-font-weight, 500);
    color: var(--uibit-read-timer-color, #6b7280);
    font-family: var(--uibit-read-timer-font-family, inherit);
    line-height: 1;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--uibit-read-timer-icon-color, currentColor);
    width: var(--uibit-read-timer-icon-size, 0.875rem);
    height: var(--uibit-read-timer-icon-size, 0.875rem);
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .label {
    white-space: nowrap;
  }

  .content-slot {
    display: none;
  }
`;
