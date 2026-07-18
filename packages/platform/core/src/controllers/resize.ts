import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface ResizeControllerOptions extends ResizeObserverOptions {
  target?: HTMLElement | null | (() => HTMLElement | null);
  callback?: (entry: ResizeObserverEntry) => void;
}

export class ResizeController implements ReactiveController {
  private host: ReactiveControllerHost & HTMLElement;
  private observer: ResizeObserver | null = null;
  private options: ResizeControllerOptions;
  contentRect?: DOMRectReadOnly;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    options: ResizeControllerOptions = {},
  ) {
    this.host = host;
    this.options = options;
    this.host.addController(this);
  }

  hostConnected() {
    this.observe();
  }

  hostDisconnected() {
    this.unobserve();
  }

  hostUpdated() {
    // If the observer was not initialized (e.g. because dynamic target wasn't in DOM yet),
    // try to observe it now after the update.
    if (!this.observer) {
      this.observe();
    }
  }

  observe() {
    this.unobserve();

    const target =
      typeof this.options.target === 'function'
        ? this.options.target()
        : (this.options.target ?? this.host);

    if (!target) return;

    this.observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      this.contentRect = entry.contentRect;

      if (this.options.callback) {
        this.options.callback(entry);
      }
      this.host.requestUpdate();
    });

    this.observer.observe(target, this.options);
  }

  unobserve() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
