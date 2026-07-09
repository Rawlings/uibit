import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-size: var(--uibit-table-font-size, 0.875rem);
    font-family: var(--uibit-table-font-family, inherit);
    color: var(--uibit-table-color, #111827);
  }

  /* ── Toolbar ─────────────────────────────────────────────── */

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

  .search:focus { border-color: var(--uibit-table-focus-color, #6b7280); }
  .search::placeholder { color: #9ca3af; }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  .toolbar-label {
    font-size: 0.75rem;
    color: #6b7280;
    white-space: nowrap;
  }

  .ctrl-select {
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

  .ctrl-select:focus { border-color: var(--uibit-table-focus-color, #6b7280); }

  .ctrl-btn {
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
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .ctrl-btn:hover { background: #f9fafb; border-color: #d1d5db; }
  .ctrl-btn:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  .ctrl-btn .chevron { font-size: 0.625rem; opacity: 0.6; }

  /* ── Column menu ─────────────────────────────────────────── */

  .col-menu-wrap { position: relative; }

  .col-dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 0.25rem);
    z-index: 20;
    background: var(--uibit-table-bg, #ffffff);
    border: 1px solid var(--uibit-table-border-color, #e5e7eb);
    border-radius: var(--uibit-table-radius, 0.375rem);
    padding: 0.375rem;
    min-width: 10rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06);
  }

  .col-dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.8125rem;
    white-space: nowrap;
    user-select: none;
  }

  .col-dropdown-item:hover { background: #f3f4f6; }

  .col-dropdown-item input[type="checkbox"] {
    width: 0.875rem;
    height: 0.875rem;
    cursor: pointer;
    flex-shrink: 0;
    margin: 0;
    accent-color: #111827;
  }

  /* ── Selection banner ────────────────────────────────────── */

  .sel-banner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding: 0.5rem 0.875rem;
    margin-bottom: 0.5rem;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: var(--uibit-table-radius, 0.375rem);
    font-size: 0.8125rem;
    color: #1e40af;
  }

  .sel-banner-count { font-weight: 600; }

  .sel-banner-btn {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-size: 0.8125rem;
    color: #1d4ed8;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }

  .sel-banner-btn:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; border-radius: 0.125rem; }

  .sel-banner-sep { color: #93c5fd; }

  /* ── Table wrapper ───────────────────────────────────────── */

  .table-wrap {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--uibit-table-border-color, #e5e7eb);
    border-radius: var(--uibit-table-radius, 0.375rem);
  }

  :host([sticky-header]) .table-wrap {
    max-height: var(--uibit-table-max-height, 24rem);
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
  }

  /* ── Head ────────────────────────────────────────────────── */

  thead { background: var(--uibit-table-head-bg, #f9fafb); }

  :host([sticky-header]) thead th {
    position: sticky;
    top: 0;
    z-index: 2;
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
    position: relative;
    white-space: nowrap;
  }

  th.sortable { cursor: pointer; }
  th.sortable:hover { color: var(--uibit-table-color, #111827); }

  .th-inner {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  /* ── Sort icon ───────────────────────────────────────────── */

  .sort-icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
    opacity: 0.35;
  }

  th.sort-asc .sort-icon,
  th.sort-desc .sort-icon { opacity: 1; }

  .sort-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #374151;
    color: #fff;
    font-size: 0.625rem;
    font-weight: 700;
    line-height: 1;
    flex-shrink: 0;
  }

  /* ── Resize handle ───────────────────────────────────────── */

  .resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    cursor: col-resize;
    z-index: 1;
  }

  .resize-handle::after {
    content: '';
    position: absolute;
    right: 1px;
    top: 20%;
    bottom: 20%;
    width: 2px;
    background: transparent;
    border-radius: 1px;
    transition: background 0.15s;
  }

  .resize-handle:hover::after,
  .resizing .resize-handle::after { background: var(--uibit-table-focus-color, #6b7280); }

  /* ── Filter row ──────────────────────────────────────────── */

  .filter-row th {
    padding: 0.3rem 0.5rem;
    background: var(--uibit-table-head-bg, #f9fafb);
    border-bottom: 1px solid var(--uibit-table-border-color, #e5e7eb);
    text-transform: none;
    letter-spacing: 0;
    font-weight: 400;
  }

  :host([sticky-header]) .filter-row th {
    position: sticky;
    top: var(--uibit-table-header-height, 2.5rem);
    z-index: 2;
    background: var(--uibit-table-head-bg, #f9fafb);
  }

  .filter-input {
    width: 100%;
    padding: 0.2rem 0.375rem;
    border: 1px solid var(--uibit-table-border-color, #e5e7eb);
    border-radius: 0.25rem;
    font: inherit;
    font-size: 0.75rem;
    background: var(--uibit-table-bg, #ffffff);
    color: inherit;
    outline: none;
    min-width: 0;
    box-sizing: border-box;
  }

  .filter-input:focus { border-color: var(--uibit-table-focus-color, #6b7280); }
  .filter-input::placeholder { color: #d1d5db; }
  .filter-input.active { border-color: #6b7280; background: #fafafa; }

  /* ── Checkbox column ─────────────────────────────────────── */

  .col-check {
    width: 2.75rem;
    text-align: center;
    padding-left: 0.875rem;
    padding-right: 0;
  }

  td.col-check { padding-left: 0.875rem; padding-right: 0; }

  input[type="checkbox"] {
    width: 0.875rem;
    height: 0.875rem;
    cursor: pointer;
    margin: 0;
    vertical-align: middle;
    accent-color: #111827;
  }

  /* ── Body rows ───────────────────────────────────────────── */

  td {
    padding: var(--uibit-table-cell-padding, 0.625rem 0.875rem);
    border-bottom: 1px solid var(--uibit-table-border-color, #e5e7eb);
    color: var(--uibit-table-color, #111827);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20rem;
  }

  tr:last-child td { border-bottom: none; }

  tbody tr { transition: background 0.1s; }
  tbody tr:hover { background: var(--uibit-table-hover-bg, #f9fafb); }

  tbody tr.row-selected td { background: var(--uibit-table-selected-bg, #eff6ff); }
  tbody tr.row-selected:hover td { background: #dbeafe; }

  :host([striped]) tbody tr:nth-child(even):not(.row-selected) td {
    background: var(--uibit-table-stripe-bg, #f9fafb);
  }

  /* ── Density ─────────────────────────────────────────────── */

  :host([density="compact"]) td,
  :host([density="compact"]) th {
    padding: 0.25rem 0.5rem;
  }

  :host([density="comfortable"]) td,
  :host([density="comfortable"]) th {
    padding: 1rem 1.25rem;
  }

  /* ── Misc ────────────────────────────────────────────────── */

  .empty {
    padding: 2.5rem;
    text-align: center;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .highlight {
    background: var(--uibit-table-highlight-bg, #fef9c3);
    border-radius: 0.125rem;
    padding: 0 0.1em;
  }

  .filter-highlight {
    background: var(--uibit-table-filter-highlight-bg, #dcfce7);
    border-radius: 0.125rem;
    padding: 0 0.1em;
  }

  /* ── Footer ──────────────────────────────────────────────── */

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
    transition: background 0.12s;
  }

  .page-btn:hover:not(:disabled) { background: #f3f4f6; }
  .page-btn.active { background: #111827; color: #fff; border-color: #111827; font-weight: 600; }
  .page-btn:disabled { opacity: 0.4; cursor: default; }
  .page-btn:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }

  slot { display: none; }
`;
