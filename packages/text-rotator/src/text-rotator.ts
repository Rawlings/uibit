import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Rotates a single word inside a static sentence by animating between items
 * with a vertical slide or 3D flip transition. Designed to highlight changing
 * value propositions without motion outside the component boundary.
 *
 * @fires {{ word: string, index: number }} word-change - Fired when the active word changes
 *
 * @cssprop [--uibit-text-rotator-font-size=inherit] - Font size
 * @cssprop [--uibit-text-rotator-font-weight=inherit] - Font weight
 * @cssprop [--uibit-text-rotator-color=inherit] - Text color
 * @cssprop [--uibit-text-rotator-font-family=inherit] - Font family
 * @cssprop [--uibit-text-rotator-line-height=1.2] - Line height (also controls host height)
 * @cssprop [--uibit-text-rotator-duration=0.4s] - Transition animation duration
 */
@customElement('uibit-text-rotator')
export class TextRotator extends LitElement {
  static styles = styles;

  @state() private words: string[] = [];

  /** Interval in ms between rotations. */
  @property({ type: Number }) interval = 2500;

  /** Transition style: 'slide' for vertical slide, 'flip' for 3D perspective flip. */
  @property({ type: String }) transition: 'slide' | 'flip' = 'slide';

  /** Loop indefinitely. Set to false to stop after the last word. */
  @property({ type: Boolean }) loop = true;

  @state() private _activeIndex = 0;
  @state() private _prevIndex = -1;
  @state() private _animating = false;
  @state() private _mounted = false;

  private _timer?: ReturnType<typeof setInterval>;

  connectedCallback() {
    super.connectedCallback();
    this._start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  firstUpdated() {
    // Mark as mounted so the first word renders without an enter animation
    requestAnimationFrame(() => { this._mounted = true; });
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('words') && this.words.length) {
      clearInterval(this._timer);
      this._activeIndex = 0;
      this._prevIndex = -1;
      this._animating = false;
      this._mounted = false;
      requestAnimationFrame(() => { this._mounted = true; });
      this._start();
    }
  }

  private _start() {
    if (!this.words.length) return;
    this._timer = setInterval(() => this._advance(), this.interval);
  }

  private _advance() {
    if (this._animating || !this.words.length) return;
    const next = (this._activeIndex + 1) % this.words.length;
    if (!this.loop && next === 0) {
      clearInterval(this._timer);
      return;
    }
    this._animating = true;
    this._prevIndex = this._activeIndex;
    this._activeIndex = next;

    this.dispatchEvent(new CustomEvent('word-change', {
      detail: { word: this.words[this._activeIndex], index: this._activeIndex },
      bubbles: true,
      composed: true,
    }));

    const durationStr = getComputedStyle(this).getPropertyValue('--uibit-text-rotator-duration') || '0.4s';
    const dur = this._parseCssDuration(durationStr);
    setTimeout(() => {
      this._prevIndex = -1;
      this._animating = false;
    }, dur + 50);
  }

  private _parseCssDuration(val: string): number {
    const trimmed = val.trim();
    if (!trimmed) return 400;
    if (trimmed.endsWith('ms')) {
      return parseFloat(trimmed);
    }
    if (trimmed.endsWith('s')) {
      return parseFloat(trimmed) * 1000;
    }
    return parseFloat(trimmed) || 400;
  }

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    const words = nodes
      .map(node => node.textContent?.trim() ?? '')
      .filter(text => text !== '');
    if (words.length > 0) {
      this.words = words;
    }
  }

  render() {
    const t = this.transition;
    const activeWord = this.words[this._activeIndex] ?? '';
    const prevWord = this._prevIndex >= 0 ? this.words[this._prevIndex] : null;

    return html`
      <slot @slotchange=${this._handleSlotChange} style="display: none;"></slot>
      <span class="stage">
        ${prevWord !== null ? html`<span class="word leaving-${t}" aria-hidden="true">${prevWord}</span>` : ''}
        <span class="word ${this._mounted ? `entering-${t}` : 'initial'} active">${activeWord}</span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-text-rotator': TextRotator;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-text-rotator': TextRotator;
    }
  }
}

export default TextRotator;
