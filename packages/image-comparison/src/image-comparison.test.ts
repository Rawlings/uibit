import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './image-comparison';
import { ImageComparison } from './image-comparison';

describe('ImageComparison Component', () => {
  let element: ImageComparison;

  beforeEach(async () => {
    element = document.createElement('uibit-image-comparison') as ImageComparison;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders default state with horizontal mode and progress 50', () => {
    expect(element.mode).toBe('horizontal');
    expect(element.progress).toBe(50);
    expect(element.interactive).toBe(true);
    expect(element.hoverReveal).toBe(false);

    const container = element.shadowRoot?.querySelector('.container');
    expect(container).toBeTruthy();
  });

  it('updates accessibility attributes on progress change', async () => {
    element.progress = 75;
    await element.updateComplete;

    expect(element.getAttribute('aria-valuenow')).toBe('75');
  });

  it('changes progress via keyboard events', async () => {
    const progressSpy = vi.fn();
    element.addEventListener('comparison-progress', progressSpy);

    // Trigger right arrow key
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await element.updateComplete;

    expect(element.progress).toBe(55);
    expect(progressSpy).toHaveBeenCalled();
    expect(progressSpy.mock.calls[0][0].detail).toEqual({ progress: 55 });

    // Trigger left arrow key
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await element.updateComplete;

    expect(element.progress).toBe(50);
  });

  it('clamps keyboard navigation progress between 0 and 100', async () => {
    element.progress = 98;
    await element.updateComplete;

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await element.updateComplete;
    expect(element.progress).toBe(100);

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await element.updateComplete;
    expect(element.progress).toBe(100);
  });
});
