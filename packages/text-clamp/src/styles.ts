import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-size: var(--uibit-text-clamp-font-size, inherit);
    font-weight: var(--uibit-text-clamp-font-weight, inherit);
    color: var(--uibit-text-clamp-color, inherit);
    font-family: var(--uibit-text-clamp-font-family, inherit);
    line-height: var(--uibit-text-clamp-line-height, 1.5);
  }

  .content {
    overflow: hidden;
  }

  .content.clamped {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .toggle {
    display: inline;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: var(--uibit-text-clamp-toggle-color, currentColor);
    font-weight: var(--uibit-text-clamp-toggle-font-weight, 600);
    cursor: pointer;
    text-decoration: var(--uibit-text-clamp-toggle-decoration, underline);
    text-underline-offset: 0.15em;
  }

  .toggle:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 0.125rem;
  }
`;
