import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';


import { styles } from './styles';

/**
 * Clamps slotted text content to an exact line count. When content overflows
 * the clamped height, a "More" toggle button appears inline. Clicking it
 * expands the block; clicking "Less" collapses it again.
 *
 * Uses a ResizeObserver to recalculate overflow whenever the container width
 * changes, ensuring correct behaviour across all viewport sizes.
 *
 * @slot - The text content to clamp
 *
 * @fires {{ expanded: boolean }} toggle - Fired when expanded/collapsed state changes
 *
 * @cssprop [--uibit-text-clamp-font-size=inherit] - Font size
 * @cssprop [--uibit-text-clamp-font-weight=inherit] - Font weight
 * @cssprop [--uibit-text-clamp-color=inherit] - Text color
 * @cssprop [--uibit-text-clamp-font-family=inherit] - Font family
 * @cssprop [--uibit-text-clamp-line-height=1.5] - Line height (unitless recommended)
 * @cssprop [--uibit-text-clamp-toggle-color=currentColor] - "More"/"Less" button color
 * @cssprop [--uibit-text-clamp-toggle-font-weight=600] - "More"/"Less" button font weight
 * @cssprop [--uibit-text-clamp-toggle-decoration=underline] - "More"/"Less" button text decoration
 */
@customElement('uibit-text-clamp')
export class TextClamp extends LitElement {
  static styles = styles;

  /** Maximum number of lines to show when collapsed. */
  @property({ type: Number }) lines = 3;

  /** Label for the expand button. */
  @property({ attribute: 'more-label' }) moreLabel = 'More';

  /** Label for the collapse button. */
  @property({ attribute: 'less-label' }) lessLabel = 'Less';

  @state() private _expanded = false;
  @state() private _overflows = false;
  @state() private _slotText = '';

  private get _contentEl(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.content') ?? null;
  }

  private _ro?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this._ro = new ResizeObserver(() => this._checkOverflow());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._ro?.disconnect();
  }

  firstUpdated() {
    if (this._contentEl) {
      this._ro?.observe(this._contentEl);
    }
    this._checkOverflow();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('lines') || changed.has('_slotText')) {
      this._checkOverflow();
    }
  }

  private _checkOverflow() {
    const el = this._contentEl;
    if (!el) return;

    // Temporarily unconstrain to measure natural height
    el.style.webkitLineClamp = '';
    el.classList.remove('clamped');

    const fullHeight = el.scrollHeight;

    // Re-apply clamp to measure clamped height
    el.classList.add('clamped');
    el.style.webkitLineClamp = String(this.lines);

    const clampedHeight = el.getBoundingClientRect().height;

    const overflows = fullHeight > clampedHeight + 1;
    if (overflows !== this._overflows) {
      this._overflows = overflows;
    }

    // If not overflowing or expanded, remove clamp
    if (!overflows || this._expanded) {
      el.style.webkitLineClamp = '';
      el.classList.remove('clamped');
    }
  }

  private _onSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;
    const assigned = slot.assignedNodes({ flatten: true });
    this._slotText = assigned.map(n => n.textContent ?? '').join('');
    this.requestUpdate();
    // Defer to let DOM settle
    requestAnimationFrame(() => this._checkOverflow());
  }

  private _toggle() {
    this._expanded = !this._expanded;
    const el = this._contentEl;
    if (el) {
      if (this._expanded) {
        el.style.webkitLineClamp = '';
        el.classList.remove('clamped');
      } else {
        el.classList.add('clamped');
        el.style.webkitLineClamp = String(this.lines);
      }
    }
    this.dispatchEvent(new CustomEvent('toggle', { detail: { expanded: this._expanded }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <slot @slotchange=${this._onSlotChange}></slot>
      <div class="content ${this._expanded ? '' : 'clamped'}" part="content">
        ${this._slotText}${this._overflows && !this._expanded
          ? html`… <button
              class="toggle"
              part="toggle"
              aria-expanded="false"
              @click=${this._toggle}
            >${this.moreLabel}</button>`
          : this._overflows && this._expanded
          ? html` <button
              class="toggle"
              part="toggle"
              aria-expanded="true"
              @click=${this._toggle}
            >${this.lessLabel}</button>`
          : ''}
      </div>
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
