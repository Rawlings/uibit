import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  ::slotted([slot="trigger"]) {
    display: inline-block;
  }

  /* Hide the template asset from standard layout */
  slot[name="asset"] {
    display: none !important;
  }
`;
