import { html, nothing } from 'lit';
import type { TemplateResult, PropertyValues } from 'lit';
import { customElement, fromLucide, getIcon, msg, str, UIBitElement } from '@uibit/core';
import { ChevronLeft, ChevronRight } from 'lucide';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

type SortDir = 'asc' | 'desc';

interface Col {
  key: string;
  label: string;
  sortable: boolean;
  numeric: boolean;
}

interface SortEntry {
  key: string;
  dir: SortDir;
}

interface IndexedRow {
  i: number;
  row: string[];
}

/**
 * Wraps a standard HTML `<table>` in the default slot and layers on a full
 * datagrid feature set. The source table is parsed once on slot assignment and
 * never mutated; all rendering happens inside shadow DOM.
 *
 * @slot - A standard `<table>` element
 * @slot search-placeholder - A slot to customize/translate the search input placeholder
 *
 * @fires {{ query: string }} search
 * @fires {{ sorts: SortEntry[] }} sort
 * @fires {{ page: number }} page-change
 * @fires {{ indices: number[], rows: string[][] }} row-select
 * @fires load-more - Dispatched when infiniteScroll is enabled and scrolled near the bottom
 *
 * @cssprop [--uibit-table-font-size=0.875rem]
 * @cssprop [--uibit-table-font-family=inherit]
 * @cssprop [--uibit-table-color=#111827]
 * @cssprop [--uibit-table-border-color=#e5e7eb]
 * @cssprop [--uibit-table-radius=0.375rem]
 * @cssprop [--uibit-table-bg=#ffffff]
 * @cssprop [--uibit-table-head-bg=#f9fafb]
 * @cssprop [--uibit-table-head-color=#6b7280]
 * @cssprop [--uibit-table-hover-bg=#f9fafb]
 * @cssprop [--uibit-table-selected-bg=#eff6ff]
 * @cssprop [--uibit-table-stripe-bg=#f9fafb]
 * @cssprop [--uibit-table-highlight-bg=#fef9c3]
 * @cssprop [--uibit-table-filter-highlight-bg=#dcfce7]
 * @cssprop [--uibit-table-focus-color=#6b7280]
 * @cssprop [--uibit-table-cell-padding=0.625rem 0.875rem]
 * @cssprop [--uibit-table-max-height=24rem] - Max height when sticky-header is set
 */
const defaultTrueBoolean = {
  fromAttribute: (value: string | null) => value === null ? true : value !== 'false',
  toAttribute: (value: boolean) => value ? '' : null
};

@customElement('uibit-table')
export class Table extends UIBitElement {
  static styles = styles;

  // ── Feature toggles ────────────────────────────────────────────
  /** Show the global search input. */
  @property({ converter: defaultTrueBoolean }) searchable = true;
  /** Show pagination controls and per-page selector. */
  @property({ converter: defaultTrueBoolean }) paginated = true;
  /** Show CSV export button. */
  @property({ converter: defaultTrueBoolean }) exportable = true;
  /** Enable row-selection checkboxes. */
  @property({ type: Boolean }) selectable = false;
  /** Show per-column filter row below the header. */
  @property({ type: Boolean }) filterable = false;
  /** Enable drag-to-resize column handles. */
  @property({ type: Boolean }) resizable = false;
  /** Show column visibility toggle in the toolbar. */
  @property({ type: Boolean, attribute: 'column-chooser' }) columnChooser = false;
  /** Alternating row background. */
  @property({ type: Boolean, reflect: true }) striped = false;
  /** Stick the header row when the table overflows vertically. */
  @property({ type: Boolean, attribute: 'sticky-header', reflect: true }) stickyHeader = false;

  // ── Config ─────────────────────────────────────────────────────
  /** Comma-separated rows-per-page options. */
  @property({ attribute: 'page-sizes' }) pageSizes = '10,25,50,100';
  /** Controls layout: 'inline' or consolidated 'menu' under a dropdown. */
  @property({ attribute: 'controls-layout' }) controlsLayout: 'inline' | 'menu' = 'inline';
  /** Enable infinite scroll behavior instead of page pagination. */
  @property({ type: Boolean, attribute: 'infinite-scroll' }) infiniteScroll = false;
  /** Indicates the table is loading more items in infinite scroll mode. */
  @property({ type: Boolean }) loading = false;

  // ── Reactive state ──────────────────────────────────────────────
  @state() private _cols: Col[] = [];
  @state() private _rows: string[][] = [];
  @state() private _query = '';
  @state() private _sorts: SortEntry[] = [];
  @state() private _page = 1;
  @state() private _perPage = 10;
  @state() private _selected = new Set<number>();
  @state() private _hiddenCols = new Set<string>();
  @state() private _colFilters = new Map<string, string>();
  @state() private _colMenuOpen = false;
  @state() private _optionsMenuOpen = false;
  @state() private _allFilteredSelected = false;
  @state() private _searchPlaceholderText = '';

  // ── Non-reactive internal ───────────────────────────────────────
  private _colWidths = new Map<string, number>();
  private _resizing: { key: string; startX: number; startW: number } | null = null;
  private _rafId = 0;
  private _closeMenuHandler?: (e: MouseEvent) => void;
  private _escMenuHandler?: (e: KeyboardEvent) => void;

  // ── Lifecycle ───────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    const sizes = this._pageSizeOptions;
    if (sizes.length) this._perPage = sizes[0]!;
    window.addEventListener('resize', this._resizeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupResizeListeners();
    this._removeMenuListener();
    window.removeEventListener('resize', this._resizeHandler);
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this._updateHeaderHeight();

    const root = this.shadowRoot;
    if (root) {
      // Scroll listener on wrapper
      const wrap = root.querySelector('.table-wrap');
      if (wrap) {
        wrap.addEventListener('scroll', (e) => this._onScroll(e));
      }

      // Slotchange listener delegation
      root.addEventListener('slotchange', (e) => {
        const slot = e.target as HTMLSlotElement;
        if (slot.name === 'search-placeholder') {
          this._onSearchPlaceholderChange(e);
        } else if (!slot.name) {
          this._onSlotChange(e);
        }
      });

      // Mousedown listener delegation for resize handles
      root.addEventListener('mousedown', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('resize-handle')) {
          const th = target.closest('th');
          const colKey = th?.getAttribute('data-col-key');
          const col = this._cols.find(c => c.key === colKey);
          if (col) {
            this._onResizeStart(e as MouseEvent, col);
          }
        }
      });

      // Click listener delegation
      root.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        // Column sort click
        const th = target.closest('th');
        if (th && th.classList.contains('sortable')) {
          const isResize = target.classList.contains('resize-handle');
          if (!isResize) {
            const colKey = th.getAttribute('data-col-key');
            const col = this._cols.find(c => c.key === colKey);
            if (col) {
              this._onSort(col, e as MouseEvent);
              return;
            }
          }
        }

        // Options menu button click
        const optionsBtn = target.closest('.options-menu-wrap button.ctrl-btn');
        if (optionsBtn) {
          this._optionsMenuOpen ? (this._optionsMenuOpen = false, this._removeMenuListener()) : this._openOptionsMenu();
          return;
        }

        // Column chooser button click
        const colBtn = target.closest('.col-menu-wrap button.ctrl-btn');
        if (colBtn && !optionsBtn) {
          this._colMenuOpen ? (this._colMenuOpen = false, this._removeMenuListener()) : this._openColMenu();
          return;
        }

        // Selection banner buttons
        const clearBtn = target.closest('.sel-banner-btn');
        if (clearBtn) {
          if (clearBtn.classList.contains('sel-banner-btn-clear') || clearBtn.textContent?.includes('Clear')) {
            this._clearSelection();
          } else {
            this._onSelectAllFiltered();
          }
          return;
        }

        // Options dropdown item click
        const dropdownBtn = target.closest('.options-dropdown .dropdown-btn');
        if (dropdownBtn) {
          if (dropdownBtn.classList.contains('dropdown-btn-danger')) {
            this._query = '';
            this._colFilters = new Map();
            this._page = 1;
          } else {
            this._exportCsv();
          }
          this._optionsMenuOpen = false;
          this._removeMenuListener();
          return;
        }

        // Pagination buttons click
        const pageBtn = target.closest('.pagination .page-btn');
        if (pageBtn) {
          const action = pageBtn.getAttribute('data-page-action');
          const numAttr = pageBtn.getAttribute('data-page-num');
          if (action === 'prev') {
            this._page = Math.max(1, this._page - 1);
            this.dispatchCustomEvent('page-change', { page: this._page });
          } else if (action === 'next') {
            this._page = Math.min(this._totalPages, this._page + 1);
            this.dispatchCustomEvent('page-change', { page: this._page });
          } else if (numAttr !== null) {
            this._page = parseInt(numAttr, 10);
            this.dispatchCustomEvent('page-change', { page: this._page });
          }
          return;
        }

        // Inline Clear Filters button click
        const inlineClearBtn = target.closest('.controls .ctrl-btn-clear-filters');
        if (inlineClearBtn) {
          this._query = '';
          this._colFilters = new Map();
          this._page = 1;
          return;
        }

        // Export CSV button click
        const exportBtn = target.closest('[part="export-btn"]');
        if (exportBtn) {
          this._exportCsv();
          return;
        }

        // Row click delegation (for selection)
        this._onTableClick(e);
      });

      // Change listener delegation
      root.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;

        // Select all header checkbox
        if (target.closest('thead th.col-check input')) {
          this._onSelectAllPage(target.checked);
          return;
        }

        // Row select checkbox
        if (target.closest('tbody td.col-check input')) {
          this._onTableChange(e);
          return;
        }

        // Column show/hide checkbox in options/column dropdowns
        if (target.closest('.col-dropdown-item input')) {
          const label = target.closest('.col-dropdown-item');
          const colLabel = label?.textContent?.trim();
          const col = this._cols.find(c => c.label === colLabel);
          if (col) {
            this._onToggleCol(col);
          }
          return;
        }

        // Rows per page dropdown
        if (target.classList.contains('footer-select')) {
          this._onPerPage(e);
          return;
        }
      });

      // Input listener delegation
      root.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.classList.contains('search')) {
          this._onSearch(e);
        } else if (target.classList.contains('filter-input')) {
          const th = target.closest('th');
          const colKey = th?.getAttribute('data-col-key');
          const col = this._cols.find(c => c.key === colKey);
          if (col) {
            this._onColFilter(col, e);
          }
        }
      });
    }

    // If slotchange hasn't fired yet (e.g. in test environment), parse manually
    if (this._rows.length === 0) {
      const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
      if (slot) {
        this._onSlotChange({ target: slot } as unknown as Event);
      }
    }
    const placeholderSlot = this.shadowRoot?.querySelector('slot[name="search-placeholder"]') as HTMLSlotElement | null;
    if (placeholderSlot) {
      this._onSearchPlaceholderChange({ target: placeholderSlot } as unknown as Event);
    }
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    const selectAllCheckbox = this.shadowRoot?.querySelector('thead th.col-check input') as HTMLInputElement | null;
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate = !this._allPageSelected && this._somePageSelected;
    }
  }

  // ── Data pipeline ───────────────────────────────────────────────

  private get _pageSizeOptions(): number[] {
    return this.pageSizes.split(',').map(n => parseInt(n.trim(), 10)).filter(Boolean);
  }

  private get _visibleCols(): Col[] {
    return this._cols.filter(c => !this._hiddenCols.has(c.key));
  }

  private get _indexed(): IndexedRow[] {
    return this._rows.map((row, i) => ({ i, row }));
  }

  private get _colFiltered(): IndexedRow[] {
    if (!this._colFilters.size) return this._indexed;
    return this._indexed.filter(({ row }) => {
      for (const [key, val] of this._colFilters) {
        if (!val) continue;
        const ci = this._cols.findIndex(c => c.key === key);
        if (ci < 0) continue;
        if (!(row[ci] ?? '').toLowerCase().includes(val.toLowerCase())) return false;
      }
      return true;
    });
  }

  private get _searched(): IndexedRow[] {
    if (!this._query) return this._colFiltered;
    const q = this._query.toLowerCase();
    return this._colFiltered.filter(({ row }) => row.some(cell => cell.toLowerCase().includes(q)));
  }

  private get _sortedRows(): IndexedRow[] {
    const rows = [...this._searched];
    if (!this._sorts.length) return rows;
    return rows.sort((a, b) => {
      for (const { key, dir } of this._sorts) {
        const ci = this._cols.findIndex(c => c.key === key);
        if (ci < 0) continue;
        const numeric = this._cols[ci]?.numeric ?? false;
        const av = a.row[ci] ?? '';
        const bv = b.row[ci] ?? '';
        const cmp = numeric
          ? parseFloat(av.replace(/[^0-9.\-]/g, '')) - parseFloat(bv.replace(/[^0-9.\-]/g, ''))
          : av.localeCompare(bv, undefined, { sensitivity: 'base' });
        if (cmp !== 0) return dir === 'asc' ? cmp : -cmp;
      }
      return 0;
    });
  }

  private get _pageRows(): IndexedRow[] {
    if (this.infiniteScroll || !this.paginated) return this._sortedRows;
    const start = (this._page - 1) * this._perPage;
    return this._sortedRows.slice(start, start + this._perPage);
  }

  private get _totalPages(): number {
    return Math.max(1, Math.ceil(this._sortedRows.length / this._perPage));
  }

  private get _allPageSelected(): boolean {
    const page = this._pageRows;
    return page.length > 0 && page.every(({ i }) => this._selected.has(i));
  }

  private get _somePageSelected(): boolean {
    return this._pageRows.some(({ i }) => this._selected.has(i));
  }

  // ── Header alignment ───────────────────────────────────────────

  private _resizeHandler = () => this._updateHeaderHeight();

  private _updateHeaderHeight() {
    if (!this.shadowRoot) return;
    const firstRow = this.shadowRoot.querySelector('thead tr:first-child') as HTMLElement;
    if (firstRow) {
      const height = firstRow.getBoundingClientRect().height;
      this.style.setProperty('--uibit-table-header-height', `${height}px`);
    }
  }

  // ── Slot parsing ────────────────────────────────────────────────

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    let table = slot.assignedElements({ flatten: true }).find(el => el.tagName === 'TABLE') as HTMLTableElement | undefined;
    if (!table) {
      table = this.querySelector('table') as HTMLTableElement | undefined;
    }
    if (!table) return;

    this._cols = Array.from(table.querySelectorAll('thead th, thead td')).map(th => {
      const label = th.textContent?.trim() ?? '';
      return {
        key: label.toLowerCase().replace(/\W+/g, '_') || `col_${Math.random().toString(36).slice(2)}`,
        label,
        sortable: th.getAttribute('data-sortable') !== 'false',
        numeric: th.getAttribute('data-type') === 'number',
      };
    });

    this._rows = Array.from(table.querySelectorAll('tbody tr')).map(tr =>
      Array.from(tr.querySelectorAll('td, th')).map(td => td.textContent?.trim() ?? '')
    );

    this._page = 1;
    this._selected = new Set();
    this._colFilters = new Map();
    this._sorts = [];

    this.updateComplete.then(() => {
      this._updateHeaderHeight();
    });
  }

  private _onSearchPlaceholderChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    let text = slot.assignedNodes({ flatten: true }).map(n => n.textContent).join('').trim();
    if (!text) {
      text = this.querySelector('[slot="search-placeholder"]')?.textContent?.trim() || '';
    }
    this._searchPlaceholderText = text;
  }

  // ── Event handlers ──────────────────────────────────────────────

  private _onSearch(e: Event) {
    this._query = (e.target as HTMLInputElement).value;
    this._page = 1;
    this._allFilteredSelected = false;
    this.dispatchCustomEvent('search', { query: this._query });
  }

  private _onSort(col: Col, e: MouseEvent) {
    if (!col.sortable) return;
    const shift = e.shiftKey && this._sorts.length > 0;

    if (shift) {
      const idx = this._sorts.findIndex(s => s.key === col.key);
      if (idx >= 0) {
        const cur = this._sorts[idx]!;
        if (cur.dir === 'asc') {
          this._sorts = [...this._sorts.slice(0, idx), { key: col.key, dir: 'desc' }, ...this._sorts.slice(idx + 1)];
        } else {
          this._sorts = [...this._sorts.slice(0, idx), ...this._sorts.slice(idx + 1)];
        }
      } else {
        this._sorts = [...this._sorts, { key: col.key, dir: 'asc' }];
      }
    } else {
      const cur = this._sorts.length === 1 && this._sorts[0]!.key === col.key ? this._sorts[0]! : null;
      if (!cur) {
        this._sorts = [{ key: col.key, dir: 'asc' }];
      } else if (cur.dir === 'asc') {
        this._sorts = [{ key: col.key, dir: 'desc' }];
      } else {
        this._sorts = [];
      }
    }

    this._page = 1;
    if (this._sorts.length) {
      this.dispatchCustomEvent('sort', { sorts: this._sorts });
    }
  }

  private _onPerPage(e: Event) {
    this._perPage = parseInt((e.target as HTMLSelectElement).value, 10);
    this._page = 1;
  }

  private _onColFilter(col: Col, e: Event) {
    const val = (e.target as HTMLInputElement).value;
    const next = new Map(this._colFilters);
    if (val) next.set(col.key, val); else next.delete(col.key);
    this._colFilters = next;
    this._page = 1;
    this._allFilteredSelected = false;
  }

  private _onSelectRow(i: number) {
    const next = new Set(this._selected);
    if (next.has(i)) next.delete(i); else next.add(i);
    this._selected = next;
    this._allFilteredSelected = false;
    this._emitSelect();
  }

  private _onSelectAllPage(checked: boolean) {
    const next = new Set(this._selected);
    for (const { i } of this._pageRows) {
      if (checked) next.add(i); else next.delete(i);
    }
    this._selected = next;
    this._allFilteredSelected = false;
    this._emitSelect();
  }

  private _onTableClick(e: Event) {
    if (!this.selectable) return;
    const target = e.target as HTMLElement;
    const isCheckbox = target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'checkbox';
    if (isCheckbox) return;

    const tr = target.closest('tr');
    if (!tr) return;
    const indexAttr = tr.getAttribute('data-row-index');
    if (indexAttr === null) return;
    const i = parseInt(indexAttr, 10);
    this._onSelectRow(i);
  }

  private _onTableChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
      const tr = target.closest('tr');
      if (!tr) return;
      const indexAttr = tr.getAttribute('data-row-index');
      if (indexAttr === null) return;
      const i = parseInt(indexAttr, 10);
      this._onSelectRow(i);
    }
  }

  private _onSelectAllFiltered() {
    const next = new Set<number>();
    for (const { i } of this._sortedRows) next.add(i);
    this._selected = next;
    this._allFilteredSelected = true;
    this._emitSelect();
  }

  private _clearSelection() {
    this._selected = new Set();
    this._allFilteredSelected = false;
    this._emitSelect();
  }

  private _emitSelect() {
    const indices = [...this._selected];
    const rows = indices.map(i => this._rows[i]!);
    this.dispatchCustomEvent('row-select', { indices, rows });
  }

  private _onToggleCol(col: Col) {
    const next = new Set(this._hiddenCols);
    if (next.has(col.key)) next.delete(col.key); else next.add(col.key);
    this._hiddenCols = next;
    this.updateComplete.then(() => {
      this._updateHeaderHeight();
    });
  }

  private _openColMenu() {
    this._colMenuOpen = true;
    this._removeMenuListener();
    this._closeMenuHandler = (e: MouseEvent) => {
      const path = e.composedPath();
      const wrap = this.shadowRoot?.querySelector('.col-menu-wrap');
      if (wrap && !path.includes(wrap)) {
        this._colMenuOpen = false;
        this._removeMenuListener();
      }
    };
    this._escMenuHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this._colMenuOpen = false;
        this._removeMenuListener();
        const btn = this.shadowRoot?.querySelector('.col-menu-wrap .ctrl-btn') as HTMLElement;
        btn?.focus();
      }
    };
    setTimeout(() => {
      document.addEventListener('click', this._closeMenuHandler!);
      document.addEventListener('keydown', this._escMenuHandler!);
    }, 0);
  }

  private _openOptionsMenu() {
    this._optionsMenuOpen = true;
    this._removeMenuListener();
    this._closeMenuHandler = (e: MouseEvent) => {
      const path = e.composedPath();
      const wrap = this.shadowRoot?.querySelector('.options-menu-wrap');
      if (wrap && !path.includes(wrap)) {
        this._optionsMenuOpen = false;
        this._removeMenuListener();
      }
    };
    this._escMenuHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this._optionsMenuOpen = false;
        this._removeMenuListener();
        const btn = this.shadowRoot?.querySelector('.options-menu-wrap .ctrl-btn') as HTMLElement;
        btn?.focus();
      }
    };
    setTimeout(() => {
      document.addEventListener('click', this._closeMenuHandler!);
      document.addEventListener('keydown', this._escMenuHandler!);
    }, 0);
  }

  private _removeMenuListener() {
    if (this._closeMenuHandler) {
      document.removeEventListener('click', this._closeMenuHandler);
      this._closeMenuHandler = undefined;
    }
    if (this._escMenuHandler) {
      document.removeEventListener('keydown', this._escMenuHandler);
      this._escMenuHandler = undefined;
    }
  }

  // ── Infinite scroll ──────────────────────────────────────────────

  private _onScroll(e: Event) {
    if (!this.infiniteScroll || this.loading) return;
    const wrap = e.currentTarget as HTMLElement;
    const threshold = 30; // px threshold from bottom
    const isNearBottom = wrap.scrollHeight - wrap.scrollTop - wrap.clientHeight <= threshold;
    if (isNearBottom) {
      this.dispatchCustomEvent('load-more');
    }
  }

  // ── Column resize ───────────────────────────────────────────────

  private _onResizeStart(e: MouseEvent, col: Col) {
    e.stopPropagation();
    e.preventDefault();
    const th = (e.currentTarget as HTMLElement).closest('th') as HTMLElement;
    const startW = th.getBoundingClientRect().width;
    this._resizing = { key: col.key, startX: e.clientX, startW };
    this.shadowRoot?.querySelector('.table-wrap')?.classList.add('resizing');

    const onMove = (ev: MouseEvent) => {
      if (!this._resizing) return;
      const diff = ev.clientX - this._resizing.startX;
      const newW = Math.max(60, this._resizing.startW + diff);
      this._colWidths.set(this._resizing.key, newW);
      if (!this._rafId) {
        this._rafId = requestAnimationFrame(() => {
          this._rafId = 0;
          this.requestUpdate();
        });
      }
    };

    const onUp = () => {
      this._resizing = null;
      this.shadowRoot?.querySelector('.table-wrap')?.classList.remove('resizing');
      this._cleanupResizeListeners();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp, { once: true });

    this._cleanupResizeListeners = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      this._cleanupResizeListeners = () => {};
    };
  }

  private _cleanupResizeListeners: () => void = () => {};

  // ── Export ──────────────────────────────────────────────────────

  private _exportCsv() {
    const exportRows = this._selected.size > 0
      ? [...this._selected].map(i => this._rows[i]!)
      : this._sortedRows.map(r => r.row);

    const visKeys = new Set(this._visibleCols.map(c => c.key));
    const visCols = this._cols.filter(c => visKeys.has(c.key));
    const csvCell = (val: string) => {
      const escaped = val.replace(/"/g, '""');
      return /^[=+\-@\t\r]/.test(val) ? `"'${escaped}"` : `"${escaped}"`;
    };
    const header = visCols.map(c => csvCell(c.label)).join(',');
    const colIdxs = visCols.map(c => this._cols.findIndex(col => col.key === c.key));
    const body = exportRows.map(row =>
      colIdxs.map(ci => csvCell(row[ci] ?? '')).join(',')
    );
    const csv = [header, ...body].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Highlight helpers ───────────────────────────────────────────

  private _highlight(text: string, colKey: string): unknown {
    let result: TemplateResult | string = text;

    const colFilter = this._colFilters.get(colKey);
    if (colFilter) {
      result = this._applyHighlight(text, colFilter, 'filter-highlight');
    }

    if (this._query) {
      const src = typeof result === 'string' ? result : text;
      return this._applyHighlight(src, this._query, 'highlight');
    }

    return result;
  }

  private _applyHighlight(text: string, term: string, cls: string): TemplateResult | string {
    const idx = text.toLowerCase().indexOf(term.toLowerCase());
    if (idx < 0) return text;
    return html`${text.slice(0, idx)}<mark class=${cls}>${text.slice(idx, idx + term.length)}</mark>${text.slice(idx + term.length)}`;
  }

  // ── Render helpers ──────────────────────────────────────────────

  private _colStyle(col: Col): string {
    const w = this._colWidths.get(col.key);
    return w ? `width:${w}px;min-width:${w}px` : '';
  }

  private _renderSortIcon(col: Col): TemplateResult | typeof nothing {
    if (!col.sortable) return nothing;
    const entry = this._sorts.find(s => s.key === col.key);
    const asc = entry?.dir === 'asc';
    const desc = entry?.dir === 'desc';
    const sortIdx = this._sorts.findIndex(s => s.key === col.key);

    return html`
      <svg class="sort-icon" viewBox="0 0 10 14" fill="none" aria-hidden="true">
        <path d="M5 1v12M2 4l3-3 3 3" stroke="currentColor" stroke-width="1.4"
          stroke-linecap="round" stroke-linejoin="round"
          opacity=${asc ? '1' : entry ? '0.25' : '0.35'}/>
        <path d="M5 13V1M2 10l3 3 3-3" stroke="currentColor" stroke-width="1.4"
          stroke-linecap="round" stroke-linejoin="round"
          opacity=${desc ? '1' : entry ? '0.25' : '0.35'}/>
      </svg>
      ${this._sorts.length > 1 && sortIdx >= 0
        ? html`<span class="sort-badge">${sortIdx + 1}</span>`
        : nothing}
    `;
  }

  private _renderPagination(): TemplateResult | typeof nothing {
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
      <nav class="pagination" aria-label=${msg('Pagination')}>
        <button class="page-btn" ?disabled=${this._page === 1} data-page-action="prev" aria-label=${msg('Previous')}>${getIcon('chevron-left', 14, fromLucide(ChevronLeft))}</button>
        ${pages.map(p =>
          p === '…'
            ? html`<span class="page-btn" style="cursor:default;border-color:transparent;background:transparent">…</span>`
            : html`<button
                class="page-btn ${this._page === p ? 'active' : ''}"
                data-page-num=${p}
                aria-current=${this._page === p ? 'page' : nothing}
              >${p}</button>`
        )}
        <button class="page-btn" ?disabled=${this._page === this._totalPages} data-page-action="next" aria-label=${msg('Next')}>${getIcon('chevron-right', 14, fromLucide(ChevronRight))}</button>
      </nav>
    `;
  }

  private _renderSelectionBanner(): TemplateResult | typeof nothing {
    if (!this.selectable || this._selected.size === 0) return nothing;

    const filteredTotal = this._sortedRows.length;
    const selCount = this._selected.size;
    const allFiltered = this._allFilteredSelected || selCount === filteredTotal;

    return html`
      <div class="sel-banner" role="status" aria-live="polite">
        <span class="sel-banner-count">${msg(str`${selCount} row${selCount === 1 ? '' : 's'} selected`)}</span>
        ${!allFiltered && filteredTotal > this._perPage ? html`
          <span class="sel-banner-sep">·</span>
          <button class="sel-banner-btn sel-banner-btn-all">
            ${msg(str`Select all ${filteredTotal} rows`)}
          </button>
        ` : nothing}
        <span class="sel-banner-sep">·</span>
        <button class="sel-banner-btn sel-banner-btn-clear">${msg('Clear selection')}</button>
      </div>
    `;
  }

  private _renderColMenu(): TemplateResult | typeof nothing {
    if (!this.columnChooser) return nothing;
    return html`
      <div class="col-menu-wrap">
        <button
          class="ctrl-btn"
          aria-haspopup="true"
          aria-expanded=${this._colMenuOpen ? 'true' : 'false'}
        >${msg('Columns')} <span class="chevron">▾</span></button>
        ${this._colMenuOpen ? html`
          <div class="col-dropdown" role="menu">
            ${this._cols.map(col => html`
              <label class="col-dropdown-item" role="menuitemcheckbox">
                <input
                  type="checkbox"
                  ?checked=${!this._hiddenCols.has(col.key)}
                />
                ${col.label}
              </label>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderOptionsMenu(): TemplateResult | typeof nothing {
    const hasActiveFilters = this._colFilters.size > 0 || this._query;
    return html`
      <div class="options-menu-wrap col-menu-wrap">
        <button
          class="ctrl-btn"
          aria-haspopup="true"
          aria-expanded=${this._optionsMenuOpen ? 'true' : 'false'}
        >
          <svg class="icon-cog" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:2px;">
            <circle cx="8" cy="8" r="2"/>
            <path d="M8 1v2m0 10v2M1 8h2m10 0h2m-2.5-4.5l-1.5 1.5M4 12l-1.5 1.5m9.5 0l-1.5-1.5M4 4L2.5 2.5"/>
          </svg>
          ${msg('Options')}
          <span class="chevron">▾</span>
        </button>
        ${this._optionsMenuOpen ? html`
          <div class="col-dropdown options-dropdown" role="menu">
            ${this.columnChooser ? html`
              <div class="dropdown-section-title">${msg('Columns')}</div>
              ${this._cols.map(col => html`
                <label class="col-dropdown-item" role="menuitemcheckbox">
                  <input
                    type="checkbox"
                    ?checked=${!this._hiddenCols.has(col.key)}
                  />
                  ${col.label}
                </label>
              `)}
              <div class="dropdown-divider"></div>
            ` : nothing}
            
            ${this.exportable ? html`
              <button class="dropdown-btn" role="menuitem">
                ${this._selected.size > 0 ? msg(str`Export ${this._selected.size} rows`) : msg('Export CSV')}
              </button>
            ` : nothing}

            ${hasActiveFilters ? html`
              <button class="dropdown-btn dropdown-btn-danger" role="menuitem">
                ${msg('Clear filters')}
              </button>
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderFilterRow(): TemplateResult | typeof nothing {
    if (!this.filterable) return nothing;
    const vis = this._visibleCols;
    return html`
      <tr class="filter-row" aria-label=${msg('Column filters')}>
        ${this.selectable ? html`<th class="col-check"></th>` : nothing}
        ${vis.map(col => html`
          <th style=${this._colStyle(col)} data-col-key=${col.key}>
            <input
              class="filter-input ${this._colFilters.get(col.key) ? 'active' : ''}"
              type="search"
              placeholder=${msg('Filter…')}
              value=${this._colFilters.get(col.key) ?? ''}
              aria-label=${msg(str`Filter ${col.label}`)}
            />
          </th>
        `)}
      </tr>
    `;
  }

  render() {
    const vis = this._visibleCols;
    const pageRows = this._pageRows;
    const total = this._sortedRows.length;
    const start = this.paginated && !this.infiniteScroll ? (this._page - 1) * this._perPage + 1 : 1;
    const end = this.paginated && !this.infiniteScroll ? Math.min(start + this._perPage - 1, total) : total;

    const selectAllChecked = this._allPageSelected;

    const showToolbar = this.searchable || this.exportable || this.columnChooser || (this.paginated && !this.infiniteScroll);
    const hasActiveFilters = this._colFilters.size > 0 || this._query;

    console.log('RENDER SHOWTOOLBAR:', {
      searchable: this.searchable,
      exportable: this.exportable,
      columnChooser: this.columnChooser,
      paginated: this.paginated,
      infiniteScroll: this.infiniteScroll,
      showToolbar,
      rowsCount: this._rows.length,
      colsCount: this._cols.length,
      totalSorted: total,
      pageRowsCount: pageRows.length
    });

    return html`
      <slot></slot>
      <div style="display: none;">
        <slot name="search-placeholder">${msg('Search…')}</slot>
      </div>

      ${showToolbar ? html`
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
                placeholder=${this._searchPlaceholderText || msg('Search…')}
                value=${this._query}
                aria-label=${msg('Search table')}
              />
            </div>
          ` : nothing}

          <div class="controls">
            ${this.controlsLayout === 'menu' ? this._renderOptionsMenu() : html`
              ${this._renderColMenu()}

              ${this.exportable ? html`
                <button class="ctrl-btn" part="export-btn" aria-label=${msg('Export as CSV')}>
                  ${this._selected.size > 0 ? msg(str`Export ${this._selected.size} rows`) : msg('Export CSV')}
                </button>
              ` : nothing}

              ${hasActiveFilters ? html`
                <button class="ctrl-btn ctrl-btn-clear-filters" aria-label=${msg('Clear all filters')}>
                  ${msg('Clear filters')}
                </button>
              ` : nothing}
            `}
          </div>
        </div>
      ` : nothing}

      ${this._renderSelectionBanner()}

      <div class="table-wrap" part="table-wrap" role="region" aria-label="Data table">
        <table part="table">
          ${vis.length ? html`
            <thead part="thead">
              <tr>
                ${this.selectable ? html`
                  <th class="col-check" part="th">
                    <input
                      type="checkbox"
                      checked=${selectAllChecked ? '' : nothing}
                      aria-label=${msg('Select all rows on this page')}
                    />
                  </th>
                ` : nothing}
                ${vis.map(col => {
                  const entry = this._sorts.find(s => s.key === col.key);
                  const sortClass = entry ? `sort-${entry.dir}` : '';
                  return html`
                    <th
                      class="${col.sortable ? 'sortable' : ''} ${sortClass}"
                      part="th"
                      style=${this._colStyle(col)}
                      data-col-key=${col.key}
                      aria-sort=${entry
                        ? entry.dir === 'asc' ? 'ascending' : 'descending'
                        : nothing}
                      title=${this._sorts.length > 0 ? 'Click to sort · Shift+click to add secondary sort' : nothing}
                    >
                      <span class="th-inner">
                        ${col.label}
                        ${this._renderSortIcon(col)}
                      </span>
                      ${this.resizable ? html`
                        <div
                          class="resize-handle"
                          aria-hidden="true"
                        ></div>
                      ` : nothing}
                    </th>
                  `;
                })}
              </tr>
              ${this._renderFilterRow()}
            </thead>
          ` : nothing}

          <tbody part="tbody">
            ${pageRows.length === 0 ? html`
              <tr>
                <td
                  colspan=${(this.selectable ? 1 : 0) + vis.length || 1}
                  class="empty"
                  part="empty"
                >${msg('No results found')}</td>
              </tr>
            ` : pageRows.map(({ i, row }) => html`
              <tr
                class=${this._selected.has(i) ? 'row-selected' : ''}
                part="row"
                data-row-index=${i}
                style=${this.selectable ? 'cursor:pointer' : ''}
              >
                ${this.selectable ? html`
                  <td class="col-check" part="cell">
                    <input
                      type="checkbox"
                      checked=${this._selected.has(i) ? '' : nothing}
                      aria-label=${msg('Select row')}
                    />
                  </td>
                ` : nothing}
                ${vis.map((col) => html`
                  <td part="cell" style=${this._colStyle(col)}>
                    ${this._highlight(row[this._cols.findIndex(c => c.key === col.key)] ?? '', col.key)}
                  </td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>

      ${(this.paginated || this.infiniteScroll) && total > 0 ? html`
        <div class="footer" part="footer">
          <div class="footer-left">
            <span part="count">
              ${total === 0 ? msg('No results') : (this.infiniteScroll ? msg(str`${total} rows`) : msg(str`${start}–${end} of ${total} rows`))}
              ${this._selected.size > 0 ? html` · <strong>${this._selected.size} selected</strong>` : nothing}
            </span>
            ${this.paginated && !this.infiniteScroll ? html`
              <span class="footer-sep">·</span>
              <label class="footer-label" for="uibit-per-page-footer">${msg('Rows per page:')}</label>
              <select id="uibit-per-page-footer" class="ctrl-select footer-select" aria-label=${msg('Rows per page')}>
                ${this._pageSizeOptions.map(n => html`<option value=${n} selected=${this._perPage === n ? '' : nothing}>${n}</option>`)}
              </select>
            ` : nothing}
          </div>
          ${this.infiniteScroll && this.loading ? html`
            <span class="loading-spinner" part="loading-spinner">${msg('Loading more…')}</span>
          ` : (this.infiniteScroll ? nothing : this._renderPagination())}
        </div>
      ` : nothing}
    `;
  }
}

export default Table;
