import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface ViewportControllerOptions extends IntersectionObserverInit {
  target?: HTMLElement | null | (() => HTMLElement | null);
  callback?: (entry: IntersectionObserverEntry) => void;
  once?: boolean;
}

export class ViewportController implements ReactiveController {
  private host: ReactiveControllerHost & HTMLElement;
  private observer: IntersectionObserver | null = null;
  private options: ViewportControllerOptions;
  isIntersecting = false;
  hasIntersected = false;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    options: ViewportControllerOptions = {},
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

    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const prevIntersecting = this.isIntersecting;
      this.isIntersecting = entry.isIntersecting;

      if (entry.isIntersecting) {
        this.hasIntersected = true;
        if (this.options.once) {
          this.unobserve();
        }
      }

      if (this.options.callback) {
        this.options.callback(entry);
      }

      if (prevIntersecting !== this.isIntersecting) {
        this.host.requestUpdate();
      }
    }, this.options);

    this.observer.observe(target);
  }

  unobserve() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
