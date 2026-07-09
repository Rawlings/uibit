import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './number-ticker';
import { NumberTicker } from './number-ticker';

describe('NumberTicker Component', () => {
  let element: NumberTicker;

  // Mock IntersectionObserver
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn().mockImplementation((callback) => {
        return {
          observe: vi.fn().mockImplementation((el) => {
            // Immediately trigger intersection to start animation
            callback([{ isIntersecting: true, target: el }]);
          }),
          disconnect: vi.fn(),
          unobserve: vi.fn(),
        };
      })
    );
  });

  beforeEach(async () => {
    element = document.createElement('uibit-number-ticker') as NumberTicker;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders default state with starting value', () => {
    const valueEl = element.shadowRoot?.querySelector('.value');
    expect(valueEl).toBeTruthy();
    expect(valueEl?.textContent).toBe('0');
  });

  it('respects decimal places configurations', async () => {
    element.decimals = 2;
    element.from = 5;
    element.value = 5;
    // Forcing format update
    element.connectedCallback();
    await element.updateComplete;
    
    const valueEl = element.shadowRoot?.querySelector('.value');
    expect(valueEl?.textContent).toBe('5.00');
  });

  it('applies prefix and suffix strings', async () => {
    element.prefix = '$';
    element.suffix = '/mo';
    element.from = 100;
    element.value = 100;
    element.connectedCallback();
    await element.updateComplete;

    const valueEl = element.shadowRoot?.querySelector('.value');
    expect(valueEl?.textContent).toBe('$100/mo');
  });
});
