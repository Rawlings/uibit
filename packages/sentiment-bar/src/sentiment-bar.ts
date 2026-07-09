import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

export interface SentimentOption {
  value: number;
  emoji: string;
  label: string;
}

const DEFAULT_OPTIONS: SentimentOption[] = [
  { value: 1, emoji: '😣', label: 'Terrible' },
  { value: 2, emoji: '😕', label: 'Bad' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '😊', label: 'Good' },
  { value: 5, emoji: '😍', label: 'Excellent' },
];

/**
 * Micro-feedback widget displaying a horizontal row of expressive emoji
 * options. Tapping or clicking an option scales it up with a spring animation
 * and fires a scored event. Grayscale dimming on unselected options draws
 * focus to the current selection.
 *
 * Customize the option set by setting the `options` property programmatically
 * or by passing a JSON array string on the `options` attribute.
 *
 * @fires {{ value: number, label: string }} sentiment-change - Fired when the user selects an option
 * @fires {{ value: number, label: string }} sentiment-submit - Fired when the user confirms a selection (second tap or explicit submit)
 *
 * @cssprop [--uibit-sentiment-bar-bg=#f3f4f6] - Track background color
 * @cssprop [--uibit-sentiment-bar-border=0.0625rem solid #e5e7eb] - Track border
 * @cssprop [--uibit-sentiment-bar-radius=9999px] - Track border radius
 * @cssprop [--uibit-sentiment-bar-padding=0.375rem] - Track padding
 * @cssprop [--uibit-sentiment-bar-item-gap=0.25rem] - Gap between items
 * @cssprop [--uibit-sentiment-bar-item-size=2.5rem] - Width and height of each item button
 * @cssprop [--uibit-sentiment-bar-emoji-size=1.25rem] - Font size of each emoji
 * @cssprop [--uibit-sentiment-bar-item-hover-bg=rgba(0,0,0,0.06)] - Item hover background
 * @cssprop [--uibit-sentiment-bar-item-selected-bg=#ffffff] - Selected item background
 * @cssprop [--uibit-sentiment-bar-item-selected-shadow=0 0.125rem 0.5rem rgba(0,0,0,0.12)] - Selected item shadow
 * @cssprop [--uibit-sentiment-bar-unselected-grayscale=0.5] - Grayscale amount for unselected items (0–1)
 * @cssprop [--uibit-sentiment-bar-label-font-size=0.75rem] - Label font size
 * @cssprop [--uibit-sentiment-bar-label-font-weight=500] - Label font weight
 * @cssprop [--uibit-sentiment-bar-label-color=#6b7280] - Label color
 * @cssprop [--uibit-sentiment-bar-gap=0.625rem] - Gap between track and label
 */
@customElement('uibit-sentiment-bar')
export class SentimentBar extends LitElement {
  static styles = styles;

  /** Array of sentiment options. Each must have `value` (number), `emoji` (string), and `label` (string). */
  @property({
    type: Array,
    converter: {
      fromAttribute: (v: string | null) => {
        if (!v) return DEFAULT_OPTIONS;
        try { return JSON.parse(v); } catch { return DEFAULT_OPTIONS; }
      },
      toAttribute: (v: SentimentOption[]) => JSON.stringify(v),
    },
  }) options: SentimentOption[] = DEFAULT_OPTIONS;

  /** Currently selected value. Reflected as an attribute. */
  @property({ type: Number, reflect: true }) value?: number;

  /** Show the label text for the selected option below the track. */
  @property({ type: Boolean, attribute: 'show-label' }) showLabel = true;

  @state() private _hoverValue?: number;

  private _select(option: SentimentOption) {
    const isReselect = this.value === option.value;
    this.value = option.value;
    this.setAttribute('value', String(option.value));

    this.dispatchEvent(new CustomEvent('sentiment-change', {
      detail: { value: option.value, label: option.label },
      bubbles: true,
      composed: true,
    }));

    if (isReselect) {
      this.dispatchEvent(new CustomEvent('sentiment-submit', {
        detail: { value: option.value, label: option.label },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _activeLabel(): string {
    const hovered = this._hoverValue !== undefined
      ? this.options.find(o => o.value === this._hoverValue)
      : undefined;
    const selected = this.value !== undefined
      ? this.options.find(o => o.value === this.value)
      : undefined;
    return (hovered ?? selected)?.label ?? '';
  }

  render() {
    return html`
      <div class="track" part="track" role="radiogroup" aria-label="Sentiment rating">
        ${this.options.map(option => html`
          <button
            class="item"
            part="item"
            role="radio"
            aria-checked=${this.value === option.value ? 'true' : 'false'}
            aria-label=${option.label}
            ?data-selected=${this.value === option.value}
            @click=${() => this._select(option)}
            @mouseenter=${() => { this._hoverValue = option.value; }}
            @mouseleave=${() => { this._hoverValue = undefined; }}
          >
            <span class="emoji" part="emoji" aria-hidden="true">${option.emoji}</span>
          </button>
        `)}
      </div>
      ${this.showLabel
        ? html`<div class="label" part="label" aria-live="polite">${this._activeLabel()}</div>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-sentiment-bar': SentimentBar;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-sentiment-bar': SentimentBar;
    }
  }
}

export default SentimentBar;
