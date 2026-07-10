import { html } from 'lit';
import { customElement, fromLucide, getIcon, msg, UIBitElement, type IconDefinition } from '@uibit/core';
import { Angry, Frown, Laugh, Meh, Smile } from 'lucide';

const ICON_FALLBACKS: Record<string, IconDefinition> = {
  angry: fromLucide(Angry),
  frown: fromLucide(Frown),
  meh: fromLucide(Meh),
  smile: fromLucide(Smile),
  laugh: fromLucide(Laugh),
};
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

export interface SentimentOption {
  value: number;
  icon: string;
  label: string;
}

const DEFAULT_OPTIONS: SentimentOption[] = [
  { value: 1, icon: 'angry',  label: 'Terrible' },
  { value: 2, icon: 'frown',  label: 'Bad' },
  { value: 3, icon: 'meh',    label: 'Okay' },
  { value: 4, icon: 'smile',  label: 'Good' },
  { value: 5, icon: 'laugh',  label: 'Excellent' },
];

/**
 * Micro-feedback widget displaying a horizontal row of expressive face icons.
 * Tapping or clicking an option scales it up with a spring animation and fires
 * a scored event. Unselected options are dimmed to focus attention on the
 * current selection.
 *
 * Customize the option set by setting the `options` property programmatically
 * or by passing a JSON array string on the `options` attribute. Each option
 * references an icon name from the UIBit icon registry.
 *
 * @fires {{ value: number, label: string }} sentiment-change - Fired when the user selects an option
 * @fires {{ value: number, label: string }} sentiment-submit - Fired when the user confirms (second tap)
 *
 * @cssprop [--uibit-sentiment-bar-bg=#f3f4f6] - Track background color
 * @cssprop [--uibit-sentiment-bar-border=0.0625rem solid #e5e7eb] - Track border
 * @cssprop [--uibit-sentiment-bar-radius=9999px] - Track border radius
 * @cssprop [--uibit-sentiment-bar-padding=0.375rem] - Track padding
 * @cssprop [--uibit-sentiment-bar-item-gap=0.25rem] - Gap between items
 * @cssprop [--uibit-sentiment-bar-item-size=2.5rem] - Width and height of each item button
 * @cssprop [--uibit-sentiment-bar-icon-size=1.25rem] - Icon size (width and height)
 * @cssprop [--uibit-sentiment-bar-item-hover-bg=rgba(0,0,0,0.06)] - Item hover background
 * @cssprop [--uibit-sentiment-bar-item-selected-bg=#ffffff] - Selected item background
 * @cssprop [--uibit-sentiment-bar-item-selected-shadow=0 0.125rem 0.5rem rgba(0,0,0,0.12)] - Selected item shadow
 * @cssprop [--uibit-sentiment-bar-unselected-opacity=0.35] - Opacity for unselected items
 * @cssprop [--uibit-sentiment-bar-label-font-size=0.75rem] - Label font size
 * @cssprop [--uibit-sentiment-bar-label-font-weight=500] - Label font weight
 * @cssprop [--uibit-sentiment-bar-label-color=#6b7280] - Label color
 * @cssprop [--uibit-sentiment-bar-gap=0.625rem] - Gap between track and label
 */
@customElement('uibit-sentiment-bar')
export class SentimentBar extends UIBitElement {
  static styles = styles;

  @state() private options: SentimentOption[] = DEFAULT_OPTIONS;

  /** Currently selected value. Reflected as an attribute. */
  @property({ type: Number, reflect: true }) value?: number;

  /** Show the label text for the selected option below the track. */
  @property({ type: Boolean, attribute: 'show-label' }) showLabel = true;

  @state() private _hoverValue?: number;

  private _select(option: SentimentOption) {
    const isReselect = this.value === option.value;
    this.value = option.value;
    this.setAttribute('value', String(option.value));

    this.dispatchCustomEvent('sentiment-change', { value: option.value, label: option.label });

    if (isReselect) {
      this.dispatchCustomEvent('sentiment-submit', { value: option.value, label: option.label });
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

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements({ flatten: true });
    if (elements.length > 0) {
      this.options = elements.map(el => ({
        value: Number(el.getAttribute('value') || el.getAttribute('data-value') || 0),
        icon: el.getAttribute('icon') || el.getAttribute('data-icon') || '',
        label: el.getAttribute('label') || el.getAttribute('data-label') || el.textContent?.trim() || '',
      }));
    }
  }

  firstUpdated() {
    this.listen(this, 'keydown', this._onKeyDown);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = this.options.findIndex(o => o.value === this.value);
      let nextIndex = currentIndex;
      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex <= 0 ? this.options.length - 1 : currentIndex - 1;
      } else {
        nextIndex = currentIndex === -1 || currentIndex === this.options.length - 1 ? 0 : currentIndex + 1;
      }
      const nextOption = this.options[nextIndex];
      if (nextOption) {
        this._select(nextOption);
        const buttons = this.shadowRoot?.querySelectorAll('.item') as NodeListOf<HTMLElement>;
        buttons[nextIndex]?.focus();
      }
    }
  }

  render() {
    const iconPx = 20;
    const activeLabel = this._activeLabel();
    return html`
      <slot @slotchange=${this._onSlotChange} style="display: none;"></slot>
      <div class="track" part="track" role="radiogroup" aria-label=${msg('Sentiment rating')}>
        ${this.options.map(option => html`
          <button
            class="item ${this.value !== undefined && this.value !== option.value ? 'dimmed' : ''}"
            part="item"
            role="radio"
            aria-checked=${this.value === option.value ? 'true' : 'false'}
            aria-label=${option.label}
            ?data-selected=${this.value === option.value}
            @click=${() => this._select(option)}
            @mouseenter=${() => { this._hoverValue = option.value; }}
            @mouseleave=${() => { this._hoverValue = undefined; }}
          >
            <span class="icon" part="icon" aria-hidden="true">${getIcon(option.icon, iconPx, ICON_FALLBACKS[option.icon])}</span>
          </button>
        `)}
      </div>
      ${this.showLabel
        ? html`<div class="label ${activeLabel ? 'visible' : ''}" part="label" aria-live="polite">${activeLabel || '\u00a0'}</div>`
        : ''}
    `;
  }
}

export default SentimentBar;
