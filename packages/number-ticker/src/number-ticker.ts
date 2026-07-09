import { html } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Animates a numeric value from zero (or a custom start) up to the `value`
 * attribute once the element scrolls into the viewport. Supports easing,
 * decimal places, prefix/suffix strings, and locale-aware formatting.
 *
 * The animation runs entirely in the shadow DOM on a rAF loop so it never
 * blocks the main thread via layout thrashing.
 *
 * @fires void ticker-start - Fired when the count animation begins
 * @fires void ticker-end - Fired when the count animation completes
 *
 * @cssprop [--uibit-number-ticker-font-size=inherit] - Font size
 * @cssprop [--uibit-number-ticker-font-weight=inherit] - Font weight
 * @cssprop [--uibit-number-ticker-color=inherit] - Text color
 * @cssprop [--uibit-number-ticker-font-family=inherit] - Font family
 * @cssprop [--uibit-number-ticker-line-height=inherit] - Line height
 */
@customElement('uibit-number-ticker')
export class NumberTicker extends UIBitElement {
  static styles = styles;

  /** Target numeric value to count up to. */
  @property({ type: Number }) value = 0;
  /** Starting value for the animation. */
  @property({ type: Number, attribute: 'from' }) from = 0;
  /** Duration of the count animation in milliseconds. */
  @property({ type: Number }) duration = 1800;
  /** Number of decimal places to display. */
  @property({ type: Number }) decimals = 0;
  /** String prepended to the value (e.g. "$"). */
  @property({ type: String }) prefix = '';
  /** String appended to the value (e.g. "k" or "%"). */
  @property({ type: String }) suffix = '';
  /** BCP 47 locale string for number formatting (e.g. "en-US"). Empty disables locale formatting. */
  @property({ type: String }) locale = '';
  /** Easing curve: "ease-out" | "ease-in-out" | "linear". */
  @property({ type: String }) easing: 'ease-out' | 'ease-in-out' | 'linear' = 'ease-out';
  /** Intersection threshold (0–1) at which the animation triggers. */
  @property({ type: Number }) threshold = 0.2;
  /** Re-animate each time the element re-enters the viewport. */
  @property({ type: Boolean }) repeat = false;

  @state() private _display = '';

  private _observer?: IntersectionObserver;
  private _raf?: number;
  private _started = false;

  connectedCallback() {
    super.connectedCallback();
    this._display = this._format(this.from);
    this._observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && (!this._started || this.repeat)) {
          this._start();
        }
      },
      { threshold: this.threshold }
    );
    this._observer.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('value') && this._started) {
      this._start();
    }
  }

  private _ease(t: number): number {
    if (this.easing === 'linear') return t;
    if (this.easing === 'ease-in-out') return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    // ease-out cubic
    return 1 - Math.pow(1 - t, 3);
  }

  private _format(n: number): string {
    const fixed = n.toFixed(this.decimals);
    let formatted: string;
    if (this.locale) {
      formatted = Number(fixed).toLocaleString(this.locale, {
        minimumFractionDigits: this.decimals,
        maximumFractionDigits: this.decimals,
      });
    } else {
      formatted = fixed;
    }
    return `${this.prefix}${formatted}${this.suffix}`;
  }

  private _start() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._started = true;
    const startVal = this.from;
    const endVal = this.value;
    const duration = this.duration;
    let startTime: number | null = null;

    this.dispatchCustomEvent('ticker-start');

    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startVal + (endVal - startVal) * this._ease(progress);
      this._display = this._format(current);

      if (progress < 1) {
        this._raf = requestAnimationFrame(step);
      } else {
        this._display = this._format(endVal);
        this.dispatchCustomEvent('ticker-end');
      }
    };

    this._raf = requestAnimationFrame(step);
  }

  render() {
    return html`<span class="value" part="value" aria-live="polite">${this._display}</span>`;
  }
}

export default NumberTicker;
