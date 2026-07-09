import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--uibit-diff-viewer-font-family, ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace);
    font-size: var(--uibit-diff-viewer-font-size, 0.8125rem);
    line-height: var(--uibit-diff-viewer-line-height, 1.6);
    border: 1px solid var(--uibit-diff-viewer-border-color, #e5e7eb);
    border-radius: var(--uibit-diff-viewer-radius, 0.5rem);
    overflow: hidden;
  }

  .header {
    display: grid;
    border-bottom: 1px solid var(--uibit-diff-viewer-border-color, #e5e7eb);
    background: var(--uibit-diff-viewer-header-bg, #f9fafb);
  }

  :host([mode="split"]) .header {
    grid-template-columns: 1fr 1fr;
  }

  :host([mode="inline"]) .header {
    grid-template-columns: 1fr;
  }

  .header-cell {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
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
    min-width: 3rem;
    padding: 0 0.75rem;
    text-align: right;
    color: var(--uibit-diff-viewer-gutter-color, #9ca3af);
    background: var(--uibit-diff-viewer-gutter-bg, #f9fafb);
    border-right: 1px solid var(--uibit-diff-viewer-border-color, #e5e7eb);
    flex-shrink: 0;
  }

  .content {
    padding: 0 1rem;
    white-space: pre;
    flex: 1;
  }

  .line.delete {
    background: var(--uibit-diff-viewer-delete-bg, #fef2f2);
    color: var(--uibit-diff-viewer-delete-color, #991b1b);
  }

  .line.delete .gutter {
    background: var(--uibit-diff-viewer-delete-gutter-bg, #fee2e2);
    color: var(--uibit-diff-viewer-delete-color, #991b1b);
  }

  .line.insert {
    background: var(--uibit-diff-viewer-insert-bg, #f0fdf4);
    color: var(--uibit-diff-viewer-insert-color, #166534);
  }

  .line.insert .gutter {
    background: var(--uibit-diff-viewer-insert-gutter-bg, #dcfce7);
    color: var(--uibit-diff-viewer-insert-color, #166534);
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
`;
