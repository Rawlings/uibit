import { LitElement, html, css } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';

@customElement('uibit-countdown')
export class Countdown extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--uibit-countdown-font-family, monospace);
      font-size: var(--uibit-countdown-font-size, 1.5rem);
      font-weight: var(--uibit-countdown-font-weight, bold);
      color: var(--uibit-countdown-color, #000000);
      text-align: center;
    }

    .countdown {
      display: flex;
      gap: var(--uibit-countdown-gap, 1rem);
      justify-content: center;
      align-items: center;
    }

    .unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--uibit-countdown-unit-gap, 0.5rem);
    }

    .value {
      font-size: var(--uibit-countdown-value-font-size, 2.5rem);
      min-width: var(--uibit-countdown-value-min-width, 80px);
    }

    .label {
      font-size: var(--uibit-countdown-label-font-size, 0.8rem);
      text-transform: uppercase;
      color: var(--uibit-countdown-label-color, #4b5563);
      opacity: 0.8;
    }

    .separator {
      font-size: var(--uibit-countdown-separator-font-size, 2.5rem);
      align-self: flex-start;
      margin-top: -8px;
      color: var(--uibit-countdown-separator-color, #000000);
      opacity: 0.5;
    }
  `;

  @property({ type: String }) target?: string;
  @property({ type: Number }) duration?: number; // duration in milliseconds
  @property({ type: Boolean }) autoStart = true;
  @property({ type: String }) format = 'HH:MM:SS';

  @state() private remaining = 0;
  @state() private days = 0;
  @state() private hours = 0;
  @state() private minutes = 0;
  @state() private seconds = 0;

  private timer?: number;
  private resolvedTargetTime = 0;

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

  updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('target') ||
      changedProperties.has('duration') ||
      changedProperties.has('autoStart')
    ) {
      if (this.autoStart) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  start() {
    this.stop();
    const now = Date.now();
    this.resolvedTargetTime = this.target 
      ? new Date(this.target).getTime() 
      : now + (this.duration || 0);

    this.tick();
    this.timer = window.setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private tick() {
    const now = Date.now();
    this.remaining = Math.max(0, this.resolvedTargetTime - now);

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

    if (this.remaining <= 0) {
      this.stop();
      this.dispatchEvent(
        new CustomEvent('countdown-complete', { bubbles: true, composed: true })
      );
    }
  }

  private getFormattedUnits() {
    const fmt = (this.format || 'HH:MM:SS').toUpperCase();
    
    let displayDays = 0;
    let displayHours = 0;
    let displayMinutes = 0;
    let displaySeconds = 0;

    const totalSeconds = Math.floor(this.remaining / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    if (fmt.includes('DD') || fmt.includes('DAY')) {
      displayDays = this.days;
      displayHours = this.hours;
      displayMinutes = this.minutes;
      displaySeconds = this.seconds;
    } else if (fmt.includes('HH')) {
      displayHours = totalHours;
      displayMinutes = this.minutes;
      displaySeconds = this.seconds;
    } else if (fmt.includes('MM')) {
      displayMinutes = totalMinutes;
      displaySeconds = this.seconds;
    } else {
      displaySeconds = totalSeconds;
    }

    const units = [];
    if (fmt.includes('DD') || fmt.includes('DAY')) {
      units.push({ value: String(displayDays).padStart(2, '0'), label: 'Days' });
    }
    if (fmt.includes('HH') || fmt.includes('HOUR')) {
      units.push({ value: String(displayHours).padStart(2, '0'), label: 'Hours' });
    }
    if (fmt.includes('MM') || fmt.includes('MIN')) {
      units.push({ value: String(displayMinutes).padStart(2, '0'), label: 'Minutes' });
    }
    if (fmt.includes('SS') || fmt.includes('SEC')) {
      units.push({ value: String(displaySeconds).padStart(2, '0'), label: 'Seconds' });
    }
    
    // If format matches nothing standard, default to HH:MM:SS
    if (units.length === 0) {
      units.push({ value: String(totalHours).padStart(2, '0'), label: 'Hours' });
      units.push({ value: String(this.minutes).padStart(2, '0'), label: 'Minutes' });
      units.push({ value: String(this.seconds).padStart(2, '0'), label: 'Seconds' });
    }

    return units;
  }

  render() {
    const units = this.getFormattedUnits();
    return html`
      <div part="countdown" class="countdown" role="timer" aria-live="polite" aria-label="Countdown timer">
        ${units.map(
          (unit, index) => html`
            ${index > 0 ? html`<div part="separator" class="separator">:</div>` : ''}
            <div part="unit" class="unit">
              <div part="value" class="value">${unit.value}</div>
              <div part="label" class="label">${unit.label}</div>
            </div>
          `
        )}
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
