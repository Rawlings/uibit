import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    font-variant-numeric: tabular-nums;
    font-size: var(--uibit-number-ticker-font-size, inherit);
    font-weight: var(--uibit-number-ticker-font-weight, inherit);
    color: var(--uibit-number-ticker-color, inherit);
    font-family: var(--uibit-number-ticker-font-family, inherit);
    line-height: var(--uibit-number-ticker-line-height, inherit);
  }

  .value {
    display: inline;
  }
`;
