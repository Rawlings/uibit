import { css } from 'lit';

export const styles = css`
  :host {
    display: inline;
    font-size: var(--uibit-text-typing-font-size, inherit);
    font-weight: var(--uibit-text-typing-font-weight, inherit);
    color: var(--uibit-text-typing-color, inherit);
    font-family: var(--uibit-text-typing-font-family, inherit);
    line-height: var(--uibit-text-typing-line-height, inherit);
  }

  .text {
    display: inline;
  }

  .cursor {
    display: inline-block;
    width: var(--uibit-text-typing-cursor-width, 0.125rem);
    height: 1.1em;
    background: var(--uibit-text-typing-cursor-color, currentColor);
    margin-left: 0.05em;
    vertical-align: text-bottom;
    border-radius: var(--uibit-text-typing-cursor-radius, 0.0625rem);
    animation: blink var(--uibit-text-typing-cursor-blink, 0.75s) step-end infinite;
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
