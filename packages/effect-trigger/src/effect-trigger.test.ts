import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './effect-trigger';
import { EffectTrigger } from './effect-trigger';

describe('EffectTrigger Component', () => {
  let element: EffectTrigger;
  let animateSpy: any;

  beforeEach(() => {
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
    element.click();
    expect(igniteSpy).toHaveBeenCalled();
  });

  it('emits uibit-effect-ignite custom event on ignition', async () => {
    const eventHandler = vi.fn();
    element.addEventListener('uibit-effect-ignite', eventHandler);
    element.ignite();
    expect(eventHandler).toHaveBeenCalled();
  });

  it('fires uibit-particle-create and allows mutating the cloned particle', async () => {
    const createHandler = vi.fn().mockImplementation((e: CustomEvent) => {
      e.detail.particle.textContent = 'MUTATED';
    });
    element.addEventListener('uibit-particle-create', createHandler as EventListener);
    
    element.ignite();
    
    expect(createHandler).toHaveBeenCalled();
    const createdParticle = createHandler.mock.calls[0][0].detail.particle;
    expect(createdParticle.textContent).toBe('MUTATED');
  });

  it('respects inline custom keyframes property overriding standard path', async () => {
    element.keyframes = JSON.stringify([{ opacity: 0 }, { opacity: 1 }]);
    await element.updateComplete;

    element.ignite();

    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: 1000 })
    );
  });
});
