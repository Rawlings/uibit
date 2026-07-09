import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
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
 * @cssprop [--uibit-typing-text-font-size=inherit] - Font size
 * @cssprop [--uibit-typing-text-font-weight=inherit] - Font weight
 * @cssprop [--uibit-typing-text-color=inherit] - Text color
 * @cssprop [--uibit-typing-text-font-family=inherit] - Font family
 * @cssprop [--uibit-typing-text-line-height=inherit] - Line height
 * @cssprop [--uibit-typing-text-cursor-color=currentColor] - Cursor bar color
 * @cssprop [--uibit-typing-text-cursor-width=0.125rem] - Cursor bar width
 * @cssprop [--uibit-typing-text-cursor-radius=0.0625rem] - Cursor bar border radius
 * @cssprop [--uibit-typing-text-cursor-blink=0.75s] - Cursor blink interval
 */
@customElement('uibit-typing-text')
export class TypingText extends LitElement {
  static styles = styles;

  /** JSON array of phrases to cycle through. */
  @property({
    type: Array,
    converter: {
      fromAttribute: (v: string | null) => {
        if (!v) return [];
        try { return JSON.parse(v); } catch { return [v]; }
      },
      toAttribute: (v: string[]) => JSON.stringify(v),
    },
  }) phrases: string[] = [];

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
      // Typing forward
      if (this._charIndex < phrase.length) {
        // Simulate typo: inject wrong char then schedule immediate correction
        if (!this._typoChar && Math.random() < this.typoRate) {
          const wrongChar = String.fromCharCode(phrase.charCodeAt(this._charIndex) + (Math.random() > 0.5 ? 1 : -1));
          this._visible += wrongChar;
          this._typoChar = wrongChar;
          this._timer = setTimeout(() => {
            // Delete the typo
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
        // Phrase complete — pause then delete
        this.setAttribute('paused', '');
        this._timer = setTimeout(() => {
          this.removeAttribute('paused');
          this._deleting = true;
          this._tick();
        }, this.pauseAfter);
      }
    } else {
      // Deleting backward
      if (this._charIndex > 0) {
        this._charIndex--;
        this._visible = phrase.slice(0, this._charIndex);
        this._timer = setTimeout(() => this._tick(), this._jitter(this.deleteSpeed));
      } else {
        // Done deleting — move to next phrase
        this._deleting = false;
        const next = (this._phraseIndex + 1) % this.phrases.length;
        if (!this.loop && next === 0) return;
        this._phraseIndex = next;
        this._charIndex = 0;
        this.dispatchEvent(new CustomEvent('phrase-change', {
          detail: { phrase: this.phrases[this._phraseIndex], index: this._phraseIndex },
          bubbles: true,
          composed: true,
        }));
        this._timer = setTimeout(() => this._tick(), this.pauseBefore);
      }
    }
  }

  render() {
    return html`
      <span class="text" part="text" aria-live="polite" aria-atomic="true">${this._visible}</span>${this.showCursor
        ? html`<span class="cursor" part="cursor" aria-hidden="true"></span>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-typing-text': TypingText;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-typing-text': TypingText;
    }
  }
}

export default TypingText;
