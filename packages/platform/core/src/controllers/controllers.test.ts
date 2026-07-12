import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LitElement, html } from 'lit';
import { customElement } from '../decorators.js';
import { ViewportController } from './viewport.js';
import { ResizeController } from './resize.js';
import { LoopController } from './loop.js';

// Define a test element to attach controllers to
@customElement('uibit-test-element')
class TestElement extends LitElement {
  viewportCtrl?: ViewportController;
  resizeCtrl?: ResizeController;
  loopCtrl?: LoopController;

  render() {
    return html`<div>Test Element</div>`;
  }
}

describe('Shared Lit.js Reactive Controllers', () => {
  let element: TestElement;
  let observerCallback: any = null;
  let resizeCallback: any = null;
  let observeMock = vi.fn();
  let disconnectMock = vi.fn();
  let resizeObserveMock = vi.fn();
  let resizeDisconnectMock = vi.fn();

  beforeEach(async () => {
    // Stub IntersectionObserver
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn().mockImplementation((cb) => {
        observerCallback = cb;
        return {
          observe: observeMock,
          disconnect: disconnectMock,
          unobserve: vi.fn(),
        };
      })
    );

    // Stub ResizeObserver
    vi.stubGlobal(
      'ResizeObserver',
      vi.fn().mockImplementation((cb) => {
        resizeCallback = cb;
        return {
          observe: resizeObserveMock,
          disconnect: resizeDisconnectMock,
          unobserve: vi.fn(),
        };
      })
    );

    // Create element
    element = document.createElement('uibit-test-element') as TestElement;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
    vi.unstubAllGlobals();
    observeMock.mockClear();
    disconnectMock.mockClear();
    resizeObserveMock.mockClear();
    resizeDisconnectMock.mockClear();
    observerCallback = null;
    resizeCallback = null;
  });

  describe('ViewportController', () => {
    it('observes the host element on connect', () => {
      const callback = vi.fn();
      element.viewportCtrl = new ViewportController(element, { callback });
      element.viewportCtrl.hostConnected();

      expect(observeMock).toHaveBeenCalledWith(element);
    });

    it('updates intersecting state and triggers callback on intersection', () => {
      const callback = vi.fn();
      element.viewportCtrl = new ViewportController(element, { callback });
      element.viewportCtrl.hostConnected();

      // Simulate intersecting
      observerCallback([{ isIntersecting: true, target: element }]);
      expect(element.viewportCtrl.isIntersecting).toBe(true);
      expect(element.viewportCtrl.hasIntersected).toBe(true);
      expect(callback).toHaveBeenCalled();
    });

    it('respects the "once" option and disconnects after first intersection', () => {
      element.viewportCtrl = new ViewportController(element, { once: true });
      element.viewportCtrl.hostConnected();

      observerCallback([{ isIntersecting: true, target: element }]);
      expect(element.viewportCtrl.isIntersecting).toBe(true);
      expect(disconnectMock).toHaveBeenCalled();
    });
  });

  describe('ResizeController', () => {
    it('observes the host element and updates contentRect on resize', () => {
      const callback = vi.fn();
      element.resizeCtrl = new ResizeController(element, { callback });
      element.resizeCtrl.hostConnected();

      expect(resizeObserveMock).toHaveBeenCalledWith(element, { callback });

      const rect = { width: 100, height: 200 } as DOMRectReadOnly;
      resizeCallback([{ contentRect: rect, target: element }]);

      expect(element.resizeCtrl.contentRect).toEqual(rect);
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('LoopController', () => {
    it('starts requestAnimationFrame loop automatically by default', () => {
      const callback = vi.fn();
      const rafMock = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(123 as any);

      element.loopCtrl = new LoopController(element, { callback });
      element.loopCtrl.hostConnected();

      expect(element.loopCtrl.isLooping()).toBe(true);
      expect(rafMock).toHaveBeenCalled();
      
      rafMock.mockRestore();
    });

    it('does not start automatically if autoStart is false', () => {
      const callback = vi.fn();
      const rafMock = vi.spyOn(window, 'requestAnimationFrame');

      element.loopCtrl = new LoopController(element, { callback, autoStart: false });
      element.loopCtrl.hostConnected();

      expect(element.loopCtrl.isLooping()).toBe(false);
      expect(rafMock).not.toHaveBeenCalled();
      
      rafMock.mockRestore();
    });

    it('stops the animation frame on stop()', () => {
      const callback = vi.fn();
      const cancelMock = vi.spyOn(window, 'cancelAnimationFrame');
      const rafMock = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(123 as any);

      element.loopCtrl = new LoopController(element, { callback });
      element.loopCtrl.hostConnected();
      element.loopCtrl.stop();

      expect(element.loopCtrl.isLooping()).toBe(false);
      expect(cancelMock).toHaveBeenCalledWith(123);

      cancelMock.mockRestore();
      rafMock.mockRestore();
    });

    it('pauses loop on hostDisconnected and auto-resumes on hostConnected', () => {
      const callback = vi.fn();
      const rafMock = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(123 as any);
      const cancelMock = vi.spyOn(window, 'cancelAnimationFrame');

      element.loopCtrl = new LoopController(element, { callback });
      element.loopCtrl.hostConnected();

      expect(element.loopCtrl.isLooping()).toBe(true);

      // Disconnect
      element.loopCtrl.hostDisconnected();
      expect(element.loopCtrl.isLooping()).toBe(false);
      expect(cancelMock).toHaveBeenCalledWith(123);

      // Reset mocks and reconnect
      cancelMock.mockClear();
      rafMock.mockClear();

      element.loopCtrl.hostConnected();
      expect(element.loopCtrl.isLooping()).toBe(true);
      expect(rafMock).toHaveBeenCalled();

      rafMock.mockRestore();
      cancelMock.mockRestore();
    });
  });
});
