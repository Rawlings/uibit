import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './effect-trigger';
import { EffectTrigger } from './effect-trigger';

describe('EffectTrigger Component', () => {
  let element: EffectTrigger;
  let animateSpy: any;

  beforeEach(() => {
    // Mock HTMLElement.prototype.animate
    animateSpy = vi.fn().mockImplementation(() => {
      return {
        onfinish: null,
        cancel: vi.fn(),
        finish: vi.fn(),
      };
    });
    vi.stubGlobal('HTMLElement', class extends HTMLElement {
      animate = animateSpy;
    });
    // Also stub the prototype directly just in case happy-dom has its own prototype
    if (typeof window !== 'undefined' && window.HTMLElement) {
      window.HTMLElement.prototype.animate = animateSpy;
    }
  });

  beforeEach(async () => {
    element = document.createElement('uibit-effect-trigger') as EffectTrigger;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders default state with standard parameters', () => {
    expect(element.trigger).toBe('click');
    expect(element.behavior).toBe('float-displace');
    expect(element.density).toBe(1);
    expect(element.velocity).toBe('1s');
    expect(element.randomize).toBe(false);
  });

  it('triggers ignition when clicked', async () => {
    const igniteSpy = vi.spyOn(element, 'ignite');
    
    // Simulate click on the component
    element.click();
    
    expect(igniteSpy).toHaveBeenCalled();
  });

  it('emits a custom event on ignition', async () => {
    const eventHandler = vi.fn();
    element.addEventListener('uibit-effect-ignite', eventHandler);
    
    element.ignite();
    
    expect(eventHandler).toHaveBeenCalled();
    const eventDetail = eventHandler.mock.calls[0][0].detail;
    expect(eventDetail.trigger).toBe('click');
    expect(eventDetail.behavior).toBe('float-displace');
  });

  it('allows registering and running custom behaviors', async () => {
    const customBehaviorSpy = vi.fn();
    EffectTrigger.registerBehavior('custom-pop', customBehaviorSpy);
    
    element.behavior = 'custom-pop';
    await element.updateComplete;
    
    element.ignite();
    
    expect(customBehaviorSpy).toHaveBeenCalled();
  });
});
