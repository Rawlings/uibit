import { html } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Cycles through an array of phrases by simulating realistic keystroke
 * typing and backspace deletion. Includes subtle speed variance, randomized
 * simulated typos that auto-correct, and a blinking cursor node.
 *
 * Pass phrases as a JSON array string on the `phrases` attribute, or set the
 * property directly.
 *
 * @fires {{ phrase: string, index: number }} phrase-change - Fired when a new phrase begins typing
 *
 * @cssprop [--uibit-text-typing-font-size=inherit] - Font size
 * @cssprop [--uibit-text-typing-font-weight=inherit] - Font weight
 * @cssprop [--uibit-text-typing-color=inherit] - Text color
 * @cssprop [--uibit-text-typing-font-family=inherit] - Font family
 * @cssprop [--uibit-text-typing-line-height=inherit] - Line height
 * @cssprop [--uibit-text-typing-cursor-color=currentColor] - Cursor bar color
 * @cssprop [--uibit-text-typing-cursor-width=0.125rem] - Cursor bar width
 * @cssprop [--uibit-text-typing-cursor-radius=0.0625rem] - Cursor bar border radius
 * @cssprop [--uibit-text-typing-cursor-blink=0.75s] - Cursor blink interval
 */
@customElement('uibit-text-typing')
export class TextTyping extends UIBitElement {
  static styles = styles;

  @state() private phrases: string[] = [];

  /** Base typing speed in ms per character. A small random variance is applied. */
  @property({ type: Number, attribute: 'type-speed' }) typeSpeed = 80;
  /** Base delete speed in ms per character. */
  @property({ type: Number, attribute: 'delete-speed' }) deleteSpeed = 40;
  /** Pause in ms after finishing a phrase before starting to delete. */
  @property({ type: Number, attribute: 'pause-after' }) pauseAfter = 1800;
  /** Pause in ms after fully deleting before typing the next phrase. */
  @property({ type: Number, attribute: 'pause-before' }) pauseBefore = 400;
  /** Probability (0–1) that a character will be mis-typed and immediately corrected. */
  @property({ type: Number, attribute: 'typo-rate' }) typoRate = 0.04;
  /** Show the blinking cursor. */
  @property({ type: Boolean, attribute: 'show-cursor' }) showCursor = true;
  /** Loop indefinitely. Set to false to stop after the last phrase. */
  @property({ type: Boolean }) loop = true;

  @state() private _visible = '';

  private _timer?: ReturnType<typeof setTimeout>;
  private _phraseIndex = 0;
  private _charIndex = 0;
  private _deleting = false;
  private _typoChar = '';

  connectedCallback() {
    super.connectedCallback();
    if (this.phrases.length) this._tick();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._timer);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('phrases') && this.phrases.length) {
      clearTimeout(this._timer);
      this._phraseIndex = 0;
      this._charIndex = 0;
      this._deleting = false;
      this._visible = '';
      this._tick();
    }
  }

  private _jitter(base: number, factor = 0.4): number {
    return base + (Math.random() * 2 - 1) * base * factor;
  }

  private _tick() {
    const phrase = this.phrases[this._phraseIndex] ?? '';

    if (!this._deleting) {
      if (this._charIndex < phrase.length) {
        if (!this._typoChar && Math.random() < this.typoRate) {
          const wrongChar = String.fromCharCode(phrase.charCodeAt(this._charIndex) + (Math.random() > 0.5 ? 1 : -1));
          this._visible += wrongChar;
          this._typoChar = wrongChar;
          this._timer = setTimeout(() => {
            this._visible = this._visible.slice(0, -1);
            this._typoChar = '';
            this._tick();
          }, this._jitter(120));
          return;
        }

        this._visible += phrase[this._charIndex];
        this._charIndex++;
        this._timer = setTimeout(() => this._tick(), this._jitter(this.typeSpeed));
      } else {
        this.setAttribute('paused', '');
        this._timer = setTimeout(() => {
          this.removeAttribute('paused');
          this._deleting = true;
          this._tick();
        }, this.pauseAfter);
      }
    } else {
      if (this._charIndex > 0) {
        this._charIndex--;
        this._visible = phrase.slice(0, this._charIndex);
        this._timer = setTimeout(() => this._tick(), this._jitter(this.deleteSpeed));
      } else {
        this._deleting = false;
        const next = (this._phraseIndex + 1) % this.phrases.length;
        if (!this.loop && next === 0) return;
        this._phraseIndex = next;
        this._charIndex = 0;
        this.dispatchCustomEvent('phrase-change', { phrase: this.phrases[this._phraseIndex], index: this._phraseIndex });
        this._timer = setTimeout(() => this._tick(), this.pauseBefore);
      }
    }
  }

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    const phrases = nodes
      .map(node => node.textContent?.trim() ?? '')
      .filter(text => text !== '');
    if (phrases.length > 0) {
      this.phrases = phrases;
    }
  }

  render() {
    return html`
      <slot @slotchange=${this._handleSlotChange} style="display: none;"></slot>
      <span class="text" part="text" aria-live="polite" aria-atomic="true">${this._visible}</span>${this.showCursor
        ? html`<span class="cursor" part="cursor" aria-hidden="true"></span>`
        : ''}
    `;
  }
}

export default TextTyping;
