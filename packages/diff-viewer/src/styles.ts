import { css } from 'lit';

export const styles = css`
  :host {
    --uibit-diff-viewer-border-color: var(--uibit-border-color, var(--uibit-color-gray-200, #e5e7eb));
    --uibit-diff-viewer-radius: var(--uibit-radius-2xl, 0.5rem);
    --uibit-diff-viewer-header-bg: var(--uibit-bg-subtle, var(--uibit-color-gray-50, #f9fafb));
    --uibit-diff-viewer-label-color: var(--uibit-text-muted, var(--uibit-color-gray-500, #6b7280));
    --uibit-diff-viewer-gutter-bg: var(--uibit-bg-subtle, var(--uibit-color-gray-50, #f9fafb));
    --uibit-diff-viewer-gutter-color: var(--uibit-color-gray-400, #9ca3af);
    --uibit-diff-viewer-equal-color: var(--uibit-text-secondary, var(--uibit-color-gray-700, #374151));

    display: block;
    font-family: var(--uibit-diff-viewer-font-family, var(--uibit-font-mono, ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace));
    font-size: var(--uibit-diff-viewer-font-size, var(--uibit-font-size-sm, calc(0.8125rem * var(--uibit-font-scale-factor, 1))));
    line-height: var(--uibit-diff-viewer-line-height, var(--uibit-line-height-normal, 1.5));
    border: 1px solid var(--uibit-diff-viewer-border-color);
    border-radius: var(--uibit-diff-viewer-radius);
    overflow: hidden;
  }

  .header {
    display: grid;
    border-bottom: 1px solid var(--uibit-diff-viewer-border-color);
    background: var(--uibit-diff-viewer-header-bg);
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
    font-family: inherit;
    border-right: 1px solid var(--uibit-diff-viewer-border-color, #e5e7eb);
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
    border-right: 1px solid var(--uibit-diff-viewer-border-color, #e5e7eb);
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
    color: var(--uibit-diff-viewer-gutter-color, #9ca3af);
    background: var(--uibit-diff-viewer-gutter-bg, #f9fafb);
    border-right: 1px solid var(--uibit-diff-viewer-border-color, #e5e7eb);
    flex-shrink: 0;
  }

  .content {
    padding: 0 calc(1rem * var(--uibit-spacing-factor, 1));
    white-space: pre;
    flex: 1;
  }

  .line.delete {
    background: var(--uibit-diff-delete-bg, #fef2f2);
    color: var(--uibit-diff-delete-color, #991b1b);
  }

  .line.delete .gutter {
    background: var(--uibit-diff-delete-gutter-bg, #fee2e2);
    color: var(--uibit-diff-delete-color, #991b1b);
  }

  .line.insert {
    background: var(--uibit-diff-insert-bg, #f0fdf4);
    color: var(--uibit-diff-insert-color, #166534);
  }

  .line.insert .gutter {
    background: var(--uibit-diff-insert-gutter-bg, #dcfce7);
    color: var(--uibit-diff-insert-color, #166534);
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
  }

  .divider {
    width: 1px;
    background: var(--uibit-diff-viewer-border-color, #e5e7eb);
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(0.5rem * var(--uibit-spacing-factor, 1)) calc(1rem * var(--uibit-spacing-factor, 1));
    background: var(--uibit-diff-viewer-header-bg);
    border-bottom: 1px solid var(--uibit-diff-viewer-border-color);
  }

  .title {
    font-size: var(--uibit-font-size-xs, calc(0.75rem * var(--uibit-font-scale-factor, 1)));
    font-weight: var(--uibit-font-weight-semibold, 600);
    color: var(--uibit-diff-viewer-label-color, #6b7280);
    text-transform: uppercase;
    letter-spacing: var(--uibit-letter-spacing-wide, 0.05em);
  }

  .toggle-group {
    display: inline-flex;
    background: var(--uibit-color-gray-100, #f3f4f6);
    padding: 0.125rem;
    border-radius: var(--uibit-radius-md, 0.375rem);
    border: 1px solid var(--uibit-diff-viewer-border-color);
  }

  .toggle-btn {
    font-size: var(--uibit-font-size-xs, calc(0.75rem * var(--uibit-font-scale-factor, 1)));
    font-weight: var(--uibit-font-weight-medium, 500);
    padding: 0.125rem 0.5rem;
    border: none;
    background: transparent;
    border-radius: var(--uibit-radius-sm, 0.25rem);
    cursor: pointer;
    color: var(--uibit-color-gray-600, #4b5563);
    transition: background 150ms ease, color 150ms ease;
  }

  .toggle-btn:hover {
    color: var(--uibit-color-gray-900, #111827);
  }

  .toggle-btn.active {
    background: var(--uibit-color-white, #ffffff);
    color: var(--uibit-color-black, #000000);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .toggle-btn:focus-visible {
    outline: 2px solid var(--uibit-diff-viewer-focus-color, #000000);
    outline-offset: 1px;
  }
`;
