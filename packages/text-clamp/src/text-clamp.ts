import { html } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { property, query, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Clamps slotted content to an exact line count. When content overflows the
 * clamped height a "More" toggle appears inline at the truncation point.
 * Clicking it expands the block; clicking "Less" collapses it again.
 *
 * Uses a ResizeObserver to recalculate on every container-width change.
 *
 * @slot - The text content to clamp (HTML is preserved)
 *
 * @fires {{ expanded: boolean }} toggle - Fired when expanded/collapsed state changes
 *
 * @cssprop [--uibit-text-clamp-font-size=inherit] - Font size
 * @cssprop [--uibit-text-clamp-font-weight=inherit] - Font weight
 * @cssprop [--uibit-text-clamp-color=inherit] - Text color
 * @cssprop [--uibit-text-clamp-font-family=inherit] - Font family
 * @cssprop [--uibit-text-clamp-line-height=1.5] - Line height (unitless recommended)
 * @cssprop [--uibit-text-clamp-toggle-color=currentColor] - Toggle button color
 * @cssprop [--uibit-text-clamp-toggle-font-weight=600] - Toggle button font weight
 * @cssprop [--uibit-text-clamp-toggle-decoration=underline] - Toggle button text decoration
 */
@customElement('uibit-text-clamp')
export class TextClamp extends UIBitElement {
  static styles = styles;

  /** Maximum number of lines to show when collapsed. */
  @property({ type: Number }) lines = 3;



  @state() private _expanded = false;
  @state() private _overflows = false;

  @query('.content') private _contentEl!: HTMLElement;

  private _ro?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this._ro = new ResizeObserver(() => this._measure());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._ro?.disconnect();
  }

  firstUpdated() {
    if (this._contentEl) this._ro?.observe(this._contentEl);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('lines')) this._measure();
    if (changed.has('_expanded')) this._applyClamp();
  }

  private _onSlotChange() {
    this._measure();
  }

  private _measure() {
    const el = this._contentEl;
    if (!el) return;

    // Unconstrain to get natural scroll height
    el.style.removeProperty('-webkit-line-clamp');
    el.style.removeProperty('display');
    el.style.removeProperty('-webkit-box-orient');
    el.style.removeProperty('overflow');
    el.classList.remove('clamped');

    const fullH = el.scrollHeight;

    // Apply clamp to measure clamped height
    el.classList.add('clamped');
    el.style.webkitLineClamp = String(this.lines);

    const clampedH = el.getBoundingClientRect().height;
    const overflows = fullH > Math.round(clampedH) + 1;

    this._overflows = overflows;

    if (!overflows || this._expanded) {
      el.classList.remove('clamped');
      el.style.removeProperty('-webkit-line-clamp');
    }
  }

  private _applyClamp() {
    const el = this._contentEl;
    if (!el) return;
    if (this._expanded) {
      el.classList.remove('clamped');
      el.style.removeProperty('-webkit-line-clamp');
    } else if (this._overflows) {
      el.classList.add('clamped');
      el.style.webkitLineClamp = String(this.lines);
    }
  }

  private _toggle() {
    this._expanded = !this._expanded;
    this.dispatchCustomEvent('toggle', { expanded: this._expanded });
  }

  render() {
    return html`
      <div class="content" part="content">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
      ${this._overflows ? html`
        <div class="toggle-container" part="toggle-container">
          ${this._expanded ? html`
            <slot name="less" @click=${this._toggle}>
              <button
                class="toggle"
                part="toggle"
                aria-expanded="true"
              >Less</button>
            </slot>
          ` : html`
            <slot name="more" @click=${this._toggle}>
              <button
                class="toggle"
                part="toggle"
                aria-expanded="false"
              >… More</button>
            </slot>
          `}
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-text-clamp': TextClamp;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-text-clamp': TextClamp;
    }
  }
}

export default TextClamp;
