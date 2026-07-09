import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './table';
import { Table } from './table';

describe('Table Component', () => {
  let element: Table;

  beforeEach(async () => {
    element = document.createElement('uibit-table') as Table;
    // Append standard table structure
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th data-type="number">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Item A</td><td>10</td></tr>
        <tr><td>Item B</td><td>20</td></tr>
        <tr><td>Item C</td><td>30</td></tr>
      </tbody>
    `;
    element.appendChild(table);
    document.body.appendChild(element);
    // Wait for slotchange and rendering to complete
    await new Promise(r => setTimeout(r, 50));
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('parses table structure and headers', () => {
    expect(element.searchable).toBe(true);
    expect(element.exportable).toBe(true);
    expect(element.paginated).toBe(true);
    const cols = (element as any)._cols;
    expect(cols.length).toBe(2);
    expect(cols[0].label).toBe('Name');
    expect(cols[1].label).toBe('Value');
    expect(cols[1].numeric).toBe(true);

    const rows = (element as any)._rows;
    expect(rows.length).toBe(3);
    expect(rows[0]).toEqual(['Item A', '10']);
  });

  it('filters rows based on search query', async () => {
    console.log('TEST INNER HTML:', element.shadowRoot?.innerHTML);
    const searchInput = element.shadowRoot?.querySelector('.search') as HTMLInputElement;
    expect(searchInput).toBeDefined();

    searchInput.value = 'Item B';
    searchInput.dispatchEvent(new Event('input'));
    await element.updateComplete;

    const sortedRows = (element as any)._sortedRows;
    expect(sortedRows.length).toBe(1);
    expect(sortedRows[0].row).toEqual(['Item B', '20']);
  });

  it('selects rows and triggers row-select event', async () => {
    element.selectable = true;
    await element.updateComplete;

    const rowSelectSpy = vi.fn();
    element.addEventListener('row-select', rowSelectSpy as EventListener);

    const check = element.shadowRoot?.querySelector('tbody tr td.col-check input') as HTMLInputElement;
    expect(check).toBeDefined();
    check.click();

    expect(rowSelectSpy).toHaveBeenCalled();
    const eventDetail = rowSelectSpy.mock.calls[0][0].detail;
    expect(eventDetail.indices).toEqual([0]);
    expect(eventDetail.rows).toEqual([['Item A', '10']]);
  });

  it('uses slot search-placeholder if provided', async () => {
    const slot = document.createElement('span');
    slot.slot = 'search-placeholder';
    slot.textContent = 'Custom Search Text';
    element.appendChild(slot);

    await new Promise(r => setTimeout(r, 50));
    await element.updateComplete;

    const searchInput = element.shadowRoot?.querySelector('.search') as HTMLInputElement;
    expect(searchInput.placeholder).toBe('Custom Search Text');
  });

  it('renders menu layout when controlsLayout is menu', async () => {
    element.controlsLayout = 'menu';
    await element.updateComplete;

    const optionsBtn = element.shadowRoot?.querySelector('.options-menu-wrap button.ctrl-btn') as HTMLElement;
    expect(optionsBtn).toBeDefined();
    expect(optionsBtn.textContent).toContain('Options');
  });

  it('dispatches load-more event on infinite scroll near bottom', async () => {
    element.infiniteScroll = true;
    await element.updateComplete;

    const loadMoreSpy = vi.fn();
    element.addEventListener('load-more', loadMoreSpy);

    const wrap = element.shadowRoot?.querySelector('.table-wrap') as HTMLElement;
    
    Object.defineProperty(wrap, 'scrollHeight', { value: 200, configurable: true });
    Object.defineProperty(wrap, 'clientHeight', { value: 100, configurable: true });
    Object.defineProperty(wrap, 'scrollTop', { value: 90, configurable: true });

    wrap.dispatchEvent(new Event('scroll'));

    expect(loadMoreSpy).toHaveBeenCalled();
  });
});
