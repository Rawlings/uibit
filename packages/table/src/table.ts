import { LitElement, html, nothing } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

type SortDir = 'asc' | 'desc' | null;

interface Col {
  key: string;
  label: string;
  sortable: boolean;
  numeric: boolean;
}

/**
 * Wraps a standard HTML `<table>` placed in the default slot and adds
 * search/filtering, multi-column sorting, pagination, and CSV export.
 * The source table is read once on slot assignment; all rendering happens
 * in shadow DOM so the original table is never mutated.
 *
 * @slot - A standard `<table>` element whose structure is parsed and enhanced
 *
 * @fires {{ query: string }} search - Fired on each keystroke in the search field
 * @fires {{ column: string, direction: 'asc' | 'desc' }} sort - Fired when a column header is clicked
 * @fires {{ page: number }} page-change - Fired when the active page changes
 *
 * @cssprop [--uibit-table-font-size=0.875rem] - Base font size
 * @cssprop [--uibit-table-font-family=inherit] - Font family
 * @cssprop [--uibit-table-color=#111827] - Text color
 * @cssprop [--uibit-table-border-color=#e5e7eb] - Border and separator color
 * @cssprop [--uibit-table-radius=0.375rem] - Border radius of table wrapper and controls
 * @cssprop [--uibit-table-bg=#ffffff] - Background of cells and controls
 * @cssprop [--uibit-table-head-bg=#f9fafb] - Background of header row
 * @cssprop [--uibit-table-head-color=#6b7280] - Color of header labels
 * @cssprop [--uibit-table-hover-bg=#f9fafb] - Row hover background
 * @cssprop [--uibit-table-highlight-bg=#fef9c3] - Search term highlight background
 * @cssprop [--uibit-table-focus-color=#6b7280] - Focus ring / border color for inputs
 * @cssprop [--uibit-table-cell-padding=0.625rem 0.875rem] - Cell padding
 */
@customElement('uibit-table')
export class Table extends LitElement {
  static styles = styles;

  /** Show the global search input. */
  @property({ type: Boolean, attribute: 'searchable' }) searchable = true;

  /** Show per-page selector and pagination controls. */
  @property({ type: Boolean, attribute: 'paginated' }) paginated = true;

  /** Show CSV export button. */
  @property({ type: Boolean, attribute: 'exportable' }) exportable = true;

  /** Rows per page options, comma-separated. */
  @property({ attribute: 'page-sizes' }) pageSizes = '10,25,50,100';

  /** Placeholder text for the search input. */
  @property({ attribute: 'search-placeholder' }) searchPlaceholder = 'Search…';

  @state() private _cols: Col[] = [];
  @state() private _rows: string[][] = [];
  @state() private _query = '';
  @state() private _sortCol: string | null = null;
  @state() private _sortDir: SortDir = null;
  @state() private _page = 1;
  @state() private _perPage = 10;

  private get _pageSizeOptions(): number[] {
    return this.pageSizes.split(',').map(n => parseInt(n.trim(), 10)).filter(Boolean);
  }

  connectedCallback() {
    super.connectedCallback();
    const sizes = this._pageSizeOptions;
    if (sizes.length) this._perPage = sizes[0]!;
  }

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const table = slot.assignedElements({ flatten: true }).find(el => el.tagName === 'TABLE') as HTMLTableElement | undefined;
    if (!table) return;

    const headers = Array.from(table.querySelectorAll('thead th, thead td'));
    this._cols = headers.map(th => {
      const label = th.textContent?.trim() ?? '';
      return {
        key: label.toLowerCase().replace(/\s+/g, '_') || String(Math.random()),
        label,
        sortable: th.getAttribute('data-sortable') !== 'false',
        numeric: th.getAttribute('data-type') === 'number',
      };
    });

    this._rows = Array.from(table.querySelectorAll('tbody tr')).map(tr =>
      Array.from(tr.querySelectorAll('td, th')).map(td => td.textContent?.trim() ?? '')
    );

    this._page = 1;
  }

  private get _filtered(): string[][] {
    if (!this._query) return this._rows;
    const q = this._query.toLowerCase();
    return this._rows.filter(row => row.some(cell => cell.toLowerCase().includes(q)));
  }

  private get _sorted(): string[][] {
    const rows = [...this._filtered];
    if (!this._sortCol || !this._sortDir) return rows;
    const idx = this._cols.findIndex(c => c.key === this._sortCol);
    if (idx < 0) return rows;
    const numeric = this._cols[idx]?.numeric;
    const dir = this._sortDir === 'asc' ? 1 : -1;
    return rows.sort((a, b) => {
      const av = a[idx] ?? '';
      const bv = b[idx] ?? '';
      if (numeric) return (parseFloat(av) - parseFloat(bv)) * dir;
      return av.localeCompare(bv, undefined, { sensitivity: 'base' }) * dir;
    });
  }

  private get _paginated(): string[][] {
    if (!this.paginated) return this._sorted;
    const start = (this._page - 1) * this._perPage;
    return this._sorted.slice(start, start + this._perPage);
  }

  private get _totalPages(): number {
    return Math.max(1, Math.ceil(this._sorted.length / this._perPage));
  }

  private _onSearch(e: Event) {
    this._query = (e.target as HTMLInputElement).value;
    this._page = 1;
    this.dispatchEvent(new CustomEvent('search', { detail: { query: this._query }, bubbles: true, composed: true }));
  }

  private _onSort(col: Col) {
    if (!col.sortable) return;
    if (this._sortCol === col.key) {
      this._sortDir = this._sortDir === 'asc' ? 'desc' : this._sortDir === 'desc' ? null : 'asc';
      if (this._sortDir === null) this._sortCol = null;
    } else {
      this._sortCol = col.key;
      this._sortDir = 'asc';
    }
    if (this._sortDir) {
      this.dispatchEvent(new CustomEvent('sort', { detail: { column: this._sortCol, direction: this._sortDir }, bubbles: true, composed: true }));
    }
    this._page = 1;
  }

  private _onPerPage(e: Event) {
    this._perPage = parseInt((e.target as HTMLSelectElement).value, 10);
    this._page = 1;
  }

  private _exportCsv() {
    const header = this._cols.map(c => `"${c.label.replace(/"/g, '""')}"`).join(',');
    const body = this._sorted.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','));
    const csv = [header, ...body].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  private _highlight(text: string): unknown {
    if (!this._query) return text;
    const q = this._query;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx < 0) return text;
    return html`${text.slice(0, idx)}<mark class="highlight">${text.slice(idx, idx + q.length)}</mark>${text.slice(idx + q.length)}`;
  }

  private _renderSortIcon(col: Col) {
    if (!col.sortable) return nothing;
    const active = this._sortCol === col.key;
    const asc = active && this._sortDir === 'asc';
    const desc = active && this._sortDir === 'desc';
    return html`
      <svg class="sort-icon" viewBox="0 0 10 14" fill="none" aria-hidden="true">
        <path d="M5 1v12M2 4l3-3 3 3" stroke="currentColor" stroke-width="1.4"
          stroke-linecap="round" stroke-linejoin="round"
          opacity=${asc ? '1' : active ? '0.3' : '0.4'}/>
        <path d="M5 13V1M2 10l3 3 3-3" stroke="currentColor" stroke-width="1.4"
          stroke-linecap="round" stroke-linejoin="round"
          opacity=${desc ? '1' : active ? '0.3' : '0.4'}/>
      </svg>
    `;
  }

  private _renderPagination() {
    const total = this._totalPages;
    if (total <= 1) return nothing;

    const pages: (number | '…')[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (this._page > 3) pages.push('…');
      for (let i = Math.max(2, this._page - 1); i <= Math.min(total - 1, this._page + 1); i++) pages.push(i);
      if (this._page < total - 2) pages.push('…');
      pages.push(total);
    }

    return html`
      <div class="pagination" role="navigation" aria-label="Pagination">
        <button class="page-btn" ?disabled=${this._page === 1} @click=${() => { this._page--; this.dispatchEvent(new CustomEvent('page-change', { detail: { page: this._page }, bubbles: true, composed: true })); }} aria-label="Previous page">‹</button>
        ${pages.map(p =>
          p === '…'
            ? html`<span class="page-btn" style="cursor:default;border-color:transparent">…</span>`
            : html`<button class="page-btn ${this._page === p ? 'active' : ''}" @click=${() => { this._page = p as number; this.dispatchEvent(new CustomEvent('page-change', { detail: { page: this._page }, bubbles: true, composed: true })); }} aria-current=${this._page === p ? 'page' : nothing}>${p}</button>`
        )}
        <button class="page-btn" ?disabled=${this._page === total} @click=${() => { this._page++; this.dispatchEvent(new CustomEvent('page-change', { detail: { page: this._page }, bubbles: true, composed: true })); }} aria-label="Next page">›</button>
      </div>
    `;
  }

  render() {
    const start = this.paginated ? (this._page - 1) * this._perPage + 1 : 1;
    const end = this.paginated ? Math.min(start + this._perPage - 1, this._sorted.length) : this._sorted.length;
    const total = this._sorted.length;

    return html`
      <slot @slotchange=${this._onSlotChange}></slot>

      ${this.searchable || this.exportable ? html`
        <div class="toolbar" part="toolbar">
          ${this.searchable ? html`
            <div class="search-wrap">
              <svg class="search-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.4"/>
                <path d="M10 10l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
              <input
                class="search"
                part="search"
                type="search"
                placeholder=${this.searchPlaceholder}
                .value=${this._query}
                @input=${this._onSearch}
                aria-label="Search table"
              />
            </div>
          ` : nothing}
          <div class="controls">
            ${this.paginated ? html`
              <label class="per-page-label" for="per-page">Rows:</label>
              <select id="per-page" class="per-page" part="per-page" @change=${this._onPerPage} aria-label="Rows per page">
                ${this._pageSizeOptions.map(n => html`<option value=${n} ?selected=${this._perPage === n}>${n}</option>`)}
              </select>
            ` : nothing}
            ${this.exportable ? html`
              <button class="export-btn" part="export-btn" @click=${this._exportCsv} aria-label="Export as CSV">
                Export CSV
              </button>
            ` : nothing}
          </div>
        </div>
      ` : nothing}

      <div class="table-wrap" part="table-wrap" role="region" aria-label="Data table">
        <table part="table">
          ${this._cols.length ? html`
            <thead part="thead">
              <tr>
                ${this._cols.map(col => html`
                  <th
                    class="${col.sortable ? 'sortable' : ''} ${this._sortCol === col.key ? `sort-${this._sortDir}` : ''}"
                    part="th"
                    @click=${() => this._onSort(col)}
                    aria-sort=${this._sortCol === col.key
                      ? this._sortDir === 'asc' ? 'ascending' : 'descending'
                      : nothing}
                  >
                    <span class="th-inner">
                      ${col.label}
                      ${this._renderSortIcon(col)}
                    </span>
                  </th>
                `)}
              </tr>
            </thead>
          ` : nothing}
          <tbody part="tbody">
            ${this._paginated.length === 0 ? html`
              <tr><td colspan=${this._cols.length || 1} class="empty" part="empty">No results found</td></tr>
            ` : this._paginated.map(row => html`
              <tr part="row">
                ${row.map(cell => html`<td part="cell">${this._highlight(cell)}</td>`)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>

      ${this.paginated && total > 0 ? html`
        <div class="footer" part="footer">
          <span part="count">
            ${total === 0 ? 'No results' : `${start}–${end} of ${total} row${total === 1 ? '' : 's'}`}
          </span>
          ${this._renderPagination()}
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-table': Table;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-table': Table;
    }
  }
}

export default Table;
