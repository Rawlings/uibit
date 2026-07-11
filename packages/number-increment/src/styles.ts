import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    font-variant-numeric: tabular-nums;
    font-size: var(--uibit-number-increment-font-size, inherit);
    font-weight: var(--uibit-number-increment-font-weight, inherit);
    color: var(--uibit-number-increment-color, inherit);
    font-family: var(--uibit-number-increment-font-family, inherit);
    line-height: var(--uibit-number-increment-line-height, inherit);
  }

  .value {
    display: inline;
  }
`;
