import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface LoopControllerOptions {
  callback: (timestamp: number) => void;
  autoStart?: boolean;
}

export class LoopController implements ReactiveController {
  private host: ReactiveControllerHost;
  private options: LoopControllerOptions;
  private rafId: number | null = null;
  private running = false;

  constructor(host: ReactiveControllerHost, options: LoopControllerOptions) {
    this.host = host;
    this.options = options;
    if (options.autoStart !== false) {
      this.running = true;
    }
    this.host.addController(this);
  }

  hostConnected() {
    if (this.running) {
      this.start();
    }
  }

  hostDisconnected() {
    // Cancel the animation frame loop when disconnected from the DOM to avoid background leaks.
    // However, keep the `running` state as true if it was active, so that it automatically
    // resumes when reconnected to the DOM.
    this.stopLoop();
  }

  start() {
    this.running = true;
    if (this.rafId !== null) return;

    const tick = (timestamp: number) => {
      if (!this.running) return;
      this.options.callback(timestamp);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    this.stopLoop();
  }

  private stopLoop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  isLooping() {
    return this.rafId !== null;
  }
}
