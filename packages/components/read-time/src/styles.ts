import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--uibit-read-time-font-family, inherit);
  }

  .timer {
    display: inline-flex;
    align-items: center;
    gap: var(--uibit-read-time-gap, 0.375rem);
    font-size: var(--uibit-read-time-font-size, var(--uibit-font-size-sm, 0.8125rem));
    font-weight: var(--uibit-read-time-font-weight, var(--uibit-font-weight-medium, 500));
    color: var(--uibit-read-time-color, #6b7280);
    line-height: var(--uibit-line-height-normal, 1.5);
  }

  .icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--uibit-read-time-icon-color, currentColor);
    width: var(--uibit-read-time-icon-size, 0.875rem);
    height: var(--uibit-read-time-icon-size, 0.875rem);
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .label {
    white-space: nowrap;
  }
`;
