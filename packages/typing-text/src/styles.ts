import { css } from 'lit';

export const styles = css`
  :host {
    display: inline;
    font-size: var(--uibit-typing-text-font-size, inherit);
    font-weight: var(--uibit-typing-text-font-weight, inherit);
    color: var(--uibit-typing-text-color, inherit);
    font-family: var(--uibit-typing-text-font-family, inherit);
    line-height: var(--uibit-typing-text-line-height, inherit);
  }

  .text {
    display: inline;
  }

  .cursor {
    display: inline-block;
    width: var(--uibit-typing-text-cursor-width, 0.125rem);
    height: 1.1em;
    background: var(--uibit-typing-text-cursor-color, currentColor);
    margin-left: 0.05em;
    vertical-align: text-bottom;
    border-radius: var(--uibit-typing-text-cursor-radius, 0.0625rem);
    animation: blink var(--uibit-typing-text-cursor-blink, 0.75s) step-end infinite;
  }

  :host([paused]) .cursor {
    animation: none;
    opacity: 1;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
