import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Countdown timer to a target date/time or a fixed duration. Supports
 * configurable display formats and fires events on each tick and on completion.
 *
 * @fires {{ days: number, hours: number, minutes: number, seconds: number, remaining: number }} countdown-tick - Fired every second while the countdown is running
 * @fires void countdown-complete - Fired when the countdown reaches zero
 *
 * @cssprop [--uibit-countdown-font-family=ui-monospace,'SF Mono',Menlo,monospace] - Font family for the entire countdown
 * @cssprop [--uibit-countdown-font-size=1rem] - Base font size
 * @cssprop [--uibit-countdown-font-weight=600] - Font weight
 * @cssprop [--uibit-countdown-color=#111827] - Text color for values
 * @cssprop [--uibit-countdown-gap=1.5rem] - Gap between time units
 * @cssprop [--uibit-countdown-unit-gap=0.375rem] - Gap between the value and label within a unit
 * @cssprop [--uibit-countdown-value-font-size=2.25rem] - Font size for the numeric value
 * @cssprop [--uibit-countdown-value-min-width=4rem] - Min width of each value block
 * @cssprop [--uibit-countdown-label-font-size=0.6875rem] - Font size for unit labels (Days, Hours…)
 * @cssprop [--uibit-countdown-label-color=#6b7280] - Color for unit labels
 * @cssprop [--uibit-countdown-separator-font-size=2.25rem] - Font size of the colon separator
 * @cssprop [--uibit-countdown-separator-color=#d1d5db] - Color of the colon separator
 */
@customElement('uibit-countdown')
export class Countdown extends LitElement {
  static styles = styles;

  /** ISO 8601 date/time string for the countdown target (e.g. `"2025-12-31T00:00:00"`). Takes precedence over `duration`. */
  @property({ type: String }) target?: string;
  /** Fixed countdown duration in milliseconds. Used when `target` is not set. */
  @property({ type: Number }) duration?: number;
  /** Automatically start the countdown on connect. */
  @property({ type: Boolean }) autoStart = true;
  /** Display format. Tokens: `DD` days, `HH` hours, `MM` minutes, `SS` seconds. */
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

export default Countdown;
