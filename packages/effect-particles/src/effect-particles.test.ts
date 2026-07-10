import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './effect-particles';
import { EffectParticles } from './effect-particles';

describe('EffectParticles Component', () => {
  let element: EffectParticles;

  // Mock ResizeObserver
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      vi.fn().mockImplementation((callback) => {
        return {
          observe: vi.fn().mockImplementation(() => {
            callback([{ contentRect: { width: 400, height: 300 } }]);
          }),
          disconnect: vi.fn(),
          unobserve: vi.fn(),
        };
      })
    );
  });

  beforeEach(async () => {
    element = document.createElement('uibit-effect-particles') as EffectParticles;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders default state with canvas', () => {
    const canvas = element.shadowRoot?.querySelector('canvas');
    expect(canvas).toBeTruthy();
    expect(element.count).toBe(50);
    expect(element.speed).toBe(1);
    expect(element.connect).toBe(false);
  });

  it('updates properties dynamically', async () => {
    element.count = 80;
    element.speed = 2;
    element.connect = true;
    
    await element.updateComplete;
    
    expect(element.count).toBe(80);
    expect(element.speed).toBe(2);
    expect(element.connect).toBe(true);
  });

  it('renders slotted content', async () => {
    const contentDiv = document.createElement('div');
    contentDiv.textContent = 'Slotted Visual Element';
    element.appendChild(contentDiv);
    
    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
