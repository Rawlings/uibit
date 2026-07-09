import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--uibit-countdown-font-family, inherit);
    font-size: var(--uibit-countdown-font-size, var(--uibit-font-size-base, 1rem));
    font-weight: var(--uibit-countdown-font-weight, var(--uibit-font-weight-semibold, 600));
    color: var(--uibit-countdown-color, #111827);
    text-align: center;
  }

  .countdown {
    display: flex;
    gap: var(--uibit-countdown-gap, 1.5rem);
    justify-content: center;
    align-items: center;
  }

  .unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--uibit-countdown-unit-gap, 0.375rem);
  }

  .value {
    font-size: var(--uibit-countdown-value-font-size, var(--uibit-font-size-3xl, 2.25rem));
    min-width: var(--uibit-countdown-value-min-width, 4rem);
    line-height: 1;
    letter-spacing: var(--uibit-letter-spacing-tight, -0.025em);
    font-variant-numeric: tabular-nums;
  }

  .label {
    font-size: var(--uibit-countdown-label-font-size, var(--uibit-font-size-xs, 0.6875rem));
    text-transform: uppercase;
    letter-spacing: var(--uibit-letter-spacing-widest, 0.1em);
    color: var(--uibit-countdown-label-color, #6b7280);
    font-weight: var(--uibit-font-weight-medium, 500);
  }

  .separator {
    font-size: var(--uibit-countdown-separator-font-size, var(--uibit-font-size-3xl, 2.25rem));
    align-self: flex-start;
    color: var(--uibit-countdown-separator-color, #d1d5db);
    line-height: 1;
  }
`;
