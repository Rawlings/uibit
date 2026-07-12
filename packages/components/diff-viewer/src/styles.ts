import { css } from 'lit';

export const styles = css`
  :host {
    --uibit-diff-viewer-border-color: var(--uibit-border-color, var(--uibit-color-gray-200, #e5e7eb));
    --uibit-diff-viewer-radius: var(--uibit-radius-2xl, 0.5rem);
    --uibit-diff-viewer-label-color: var(--uibit-text-muted, var(--uibit-color-gray-500, #6b7280));
    --uibit-diff-viewer-gutter-color: var(--uibit-color-gray-400, #d1d5db);
    --uibit-diff-viewer-equal-color: var(--uibit-text-secondary, var(--uibit-color-gray-700, #374151));

    display: block;
    font-family: var(--uibit-diff-viewer-font-family, var(--uibit-font-mono, ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace));
    font-size: var(--uibit-diff-viewer-font-size, var(--uibit-font-size-sm, calc(0.8125rem * var(--uibit-font-scale-factor, 1))));
    line-height: var(--uibit-diff-viewer-line-height, var(--uibit-line-height-normal, 1.5));
    border: 0.0625rem solid var(--uibit-diff-viewer-border-color);
    border-radius: var(--uibit-diff-viewer-radius);
    overflow: hidden;
  }

  .header {
    display: grid;
    border-bottom: 0.0625rem solid var(--uibit-diff-viewer-border-color);
  }

  :host([mode="split"]) .header {
    grid-template-columns: 1fr 1fr;
  }

  :host([mode="inline"]) .header {
    grid-template-columns: 1fr;
  }

  .header-cell {
    padding: calc(0.5rem * var(--uibit-spacing-factor, 1)) calc(1rem * var(--uibit-spacing-factor, 1));
    font-size: var(--uibit-font-size-xs, calc(0.75rem * var(--uibit-font-scale-factor, 1)));
    font-weight: var(--uibit-font-weight-medium, 500);
    color: var(--uibit-diff-viewer-label-color, #6b7280);
    font-family: var(--uibit-diff-viewer-font-family, inherit);
    border-right: 0.0625rem solid var(--uibit-diff-viewer-border-color, #e5e7eb);
  }

  .header-cell:last-child {
    border-right: none;
  }

  .body {
    display: grid;
    overflow: auto;
  }

  :host([mode="split"]) .body {
    grid-template-columns: 1fr 1fr;
  }

  :host([mode="inline"]) .body {
    grid-template-columns: 1fr;
  }

  .pane {
    overflow: auto;
    border-right: 0.0625rem solid var(--uibit-diff-viewer-border-color, #e5e7eb);
  }

  .pane:last-child {
    border-right: none;
  }

  .line {
    display: flex;
    min-width: max-content;
  }

  .gutter {
    user-select: none;
    min-width: calc(3rem * var(--uibit-spacing-factor, 1));
    padding: 0 calc(0.75rem * var(--uibit-spacing-factor, 1));
    text-align: right;
    color: var(--uibit-diff-viewer-gutter-color, #d1d5db);
    border-right: 0.0625rem solid var(--uibit-diff-viewer-border-color, #e5e7eb);
    flex-shrink: 0;
  }

  .content {
    padding: 0 calc(1rem * var(--uibit-spacing-factor, 1));
    white-space: pre;
    flex: 1;
  }

  .line.delete {
    background: rgba(239, 68, 68, 0.06);
    color: var(--uibit-diff-delete-color, #991b1b);
  }

  .line.delete .gutter {
    color: rgba(153, 27, 27, 0.4);
  }

  .line.insert {
    background: rgba(34, 197, 94, 0.06);
    color: var(--uibit-diff-insert-color, #166534);
  }

  .line.insert .gutter {
    color: rgba(22, 101, 52, 0.4);
  }

  .line.equal {
    background: transparent;
    color: var(--uibit-diff-viewer-equal-color, #374151);
  }

  .sign {
    display: inline-block;
    width: 1rem;
    margin-right: 0.25rem;
    flex-shrink: 0;
    opacity: 0.5;
  }

  .divider {
    width: 0.0625rem;
    background: var(--uibit-diff-viewer-border-color, #e5e7eb);
  }
`;
