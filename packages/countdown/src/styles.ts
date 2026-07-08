import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--uibit-countdown-font-family, monospace);
    font-size: var(--uibit-countdown-font-size, 1.5rem);
    font-weight: var(--uibit-countdown-font-weight, bold);
    color: var(--uibit-countdown-color, #000000);
    text-align: center;
  }

  .countdown {
    display: flex;
    gap: var(--uibit-countdown-gap, 1rem);
    justify-content: center;
    align-items: center;
  }

  .unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--uibit-countdown-unit-gap, 0.5rem);
  }

  .value {
    font-size: var(--uibit-countdown-value-font-size, 2.5rem);
    min-width: var(--uibit-countdown-value-min-width, 80px);
  }

  .label {
    font-size: var(--uibit-countdown-label-font-size, 0.8rem);
    text-transform: uppercase;
    color: var(--uibit-countdown-label-color, #4b5563);
    opacity: 0.8;
  }

  .separator {
    font-size: var(--uibit-countdown-separator-font-size, 2.5rem);
    align-self: flex-start;
    margin-top: -8px;
    color: var(--uibit-countdown-separator-color, #000000);
    opacity: 0.5;
  }
`;
