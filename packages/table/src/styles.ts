import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-size: var(--uibit-table-font-size, 0.875rem);
    font-family: var(--uibit-table-font-family, inherit);
    color: var(--uibit-table-color, #111827);
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
  }

  .search-wrap {
    position: relative;
    flex: 1 1 12rem;
  }

  .search-icon {
    position: absolute;
    left: 0.625rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.875rem;
    height: 0.875rem;
    color: #9ca3af;
    pointer-events: none;
  }

  .search {
    width: 100%;
    padding: 0.375rem 0.625rem 0.375rem 2rem;
    border: 1px solid var(--uibit-table-border-color, #e5e7eb);
    border-radius: var(--uibit-table-radius, 0.375rem);
    font: inherit;
    font-size: 0.8125rem;
    background: var(--uibit-table-bg, #ffffff);
    color: inherit;
    outline: none;
    transition: border-color 0.15s;
  }

  .search:focus {
    border-color: var(--uibit-table-focus-color, #6b7280);
  }

  .search::placeholder {
    color: #9ca3af;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .per-page-label {
    font-size: 0.75rem;
    color: #6b7280;
    white-space: nowrap;
  }

  .per-page {
    padding: 0.3rem 0.5rem;
    border: 1px solid var(--uibit-table-border-color, #e5e7eb);
    border-radius: var(--uibit-table-radius, 0.375rem);
    font: inherit;
    font-size: 0.8125rem;
    background: var(--uibit-table-bg, #ffffff);
    color: inherit;
    cursor: pointer;
    outline: none;
  }

  .per-page:focus {
    border-color: var(--uibit-table-focus-color, #6b7280);
  }

  .export-btn {
    padding: 0.35rem 0.75rem;
    border: 1px solid var(--uibit-table-border-color, #e5e7eb);
    border-radius: var(--uibit-table-radius, 0.375rem);
    font: inherit;
    font-size: 0.8125rem;
    background: var(--uibit-table-bg, #ffffff);
    color: inherit;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.12s, border-color 0.12s;
  }

  .export-btn:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  .export-btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  .table-wrap {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--uibit-table-border-color, #e5e7eb);
    border-radius: var(--uibit-table-radius, 0.375rem);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    white-space: nowrap;
  }

  thead {
    background: var(--uibit-table-head-bg, #f9fafb);
  }

  th {
    padding: var(--uibit-table-cell-padding, 0.625rem 0.875rem);
    text-align: left;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--uibit-table-head-color, #6b7280);
    border-bottom: 1px solid var(--uibit-table-border-color, #e5e7eb);
    user-select: none;
  }

  th.sortable {
    cursor: pointer;
  }

  th.sortable:hover {
    color: var(--uibit-table-color, #111827);
  }

  .th-inner {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .sort-icon {
    width: 0.75rem;
    height: 0.75rem;
    opacity: 0.3;
    flex-shrink: 0;
  }

  th.sort-asc .sort-icon,
  th.sort-desc .sort-icon {
    opacity: 1;
  }

  td {
    padding: var(--uibit-table-cell-padding, 0.625rem 0.875rem);
    border-bottom: 1px solid var(--uibit-table-border-color, #e5e7eb);
    color: var(--uibit-table-color, #111827);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20rem;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: var(--uibit-table-hover-bg, #f9fafb);
  }

  .empty {
    padding: 2rem;
    text-align: center;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
    font-size: 0.75rem;
    color: #6b7280;
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .page-btn {
    min-width: 1.75rem;
    height: 1.75rem;
    padding: 0 0.375rem;
    border: 1px solid var(--uibit-table-border-color, #e5e7eb);
    border-radius: 0.25rem;
    font: inherit;
    font-size: 0.75rem;
    background: var(--uibit-table-bg, #ffffff);
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.12s, border-color 0.12s;
  }

  .page-btn:hover:not(:disabled) {
    background: #f3f4f6;
  }

  .page-btn.active {
    background: #111827;
    color: #ffffff;
    border-color: #111827;
    font-weight: 600;
  }

  .page-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .page-btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  .highlight {
    background: var(--uibit-table-highlight-bg, #fef9c3);
    border-radius: 0.125rem;
    padding: 0 0.1em;
  }

  slot {
    display: none;
  }
`;
