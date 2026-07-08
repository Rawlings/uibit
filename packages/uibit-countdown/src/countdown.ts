import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('uibit-countdown')
export class Countdown extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: monospace;
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
    }

    .countdown {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
    }

    .unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .value {
      font-size: 2.5rem;
      min-width: 80px;
    }

    .label {
      font-size: 0.8rem;
      text-transform: uppercase;
      opacity: 0.7;
    }
  `;

  @property({ type: String }) target?: string;
  @property({ type: Number }) duration?: number;
  @property({ type: Boolean }) autoStart = true;
  @property({ type: String }) format = 'HH:MM:SS';

  @property({ type: Number }) remaining = 0;
  @property({ type: Number }) days = 0;
  @property({ type: Number }) hours = 0;
  @property({ type: Number }) minutes = 0;
  @property({ type: Number }) seconds = 0;

  private timer?: NodeJS.Timeout;

  connectedCallback() {
    super.connectedCallback();
    if (this.autoStart) {
      this.start();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }

  start() {
    this.timer = setInterval(() => this.tick(), 1000);
    this.tick();
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private tick() {
    const now = Date.now();
    const targetTime = this.target ? new Date(this.target).getTime() : now + (this.duration || 0);
    this.remaining = Math.max(0, targetTime - now);

    this.days = Math.floor(this.remaining / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.remaining % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.remaining % (1000 * 60)) / 1000);

    this.dispatchEvent(
      new CustomEvent('countdown-tick', {
        detail: {
          remaining: this.remaining,
          days: this.days,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds
        },
        bubbles: true,
        composed: true
      })
    );

    if (this.remaining === 0) {
      this.stop();
      this.dispatchEvent(
        new CustomEvent('countdown-complete', { bubbles: true, composed: true })
      );
    }
  }

  render() {
    return html`
      <div class="countdown">
        <div class="unit">
          <div class="value">${String(this.days).padStart(2, '0')}</div>
          <div class="label">Days</div>
        </div>
        <div class="unit">
          <div class="value">${String(this.hours).padStart(2, '0')}</div>
          <div class="label">Hours</div>
        </div>
        <div class="unit">
          <div class="value">${String(this.minutes).padStart(2, '0')}</div>
          <div class="label">Minutes</div>
        </div>
        <div class="unit">
          <div class="value">${String(this.seconds).padStart(2, '0')}</div>
          <div class="label">Seconds</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-countdown': Countdown;
  }
}

export default Countdown;
