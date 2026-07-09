import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { styles } from './styles';

/**
 * Reveals a synchronized secondary "xray" image through a circular lens that
 * follows the user's cursor or touch point over the primary image.
 *
 * Place the primary image in the default slot and the reveal image in the
 * `xray` named slot. Both images are pixel-aligned so the lens shows exactly
 * what lies beneath the cursor on the xray layer.
 *
 * @slot - Primary (outer) image
 * @slot xray - Secondary image revealed through the lens
 *
 * @fires {{ x: number, y: number }} xray-move - Fired as the lens moves; `detail.x` and `detail.y` are percentages
 *
 * @cssprop [--uibit-image-xray-lens-size=12rem] - Diameter of the circular lens
 * @cssprop [--uibit-image-xray-lens-shadow=0 0 0 0.1875rem #ffffff, 0 0.5rem 2rem rgba(0,0,0,0.35)] - Box shadow of the lens ring
 */
@customElement('uibit-image-xray')
export class ImageXray extends LitElement {
  static styles = styles;

  /** Diameter of the lens in any CSS unit. Overrides the CSS custom property. */
  @property({ type: String }) size = '';

  @state() private _x = 0;
  @state() private _y = 0;

  @query('.base') private _base!: HTMLElement;
  @query('.lens-img') private _lensImg!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _lensSize(): number {
    const prop = this.size || getComputedStyle(this).getPropertyValue('--uibit-image-xray-lens-size').trim() || '12rem';
    if (prop.endsWith('rem')) {
      return parseFloat(prop) * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    if (prop.endsWith('px')) return parseFloat(prop);
    return 192;
  }

  private _updateLens(clientX: number, clientY: number) {
    const rect = this._base.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    this._x = x;
    this._y = y;

    const size = this._lensSize();

    // Sync the xray img position so the pixel under the cursor aligns
    if (this._lensImg) {
      this._lensImg.style.width = `${rect.width}px`;
      this._lensImg.style.height = `${rect.height}px`;
      this._lensImg.style.left = `${-(x - size / 2)}px`;
      this._lensImg.style.top = `${-(y - size / 2)}px`;
    }

    this.dispatchEvent(new CustomEvent('xray-move', {
      detail: { x: (x / rect.width) * 100, y: (y / rect.height) * 100 },
      bubbles: true,
      composed: true,
    }));
  }

  private _onMouseEnter = (e: MouseEvent) => {
    this.setAttribute('active', '');
    this._updateLens(e.clientX, e.clientY);
  };

  private _onMouseMove = (e: MouseEvent) => {
    this._updateLens(e.clientX, e.clientY);
  };

  private _onMouseLeave = () => {
    this.removeAttribute('active');
  };

  private _onTouchStart = (e: TouchEvent) => {
    this.setAttribute('touch', '');
    this.setAttribute('active', '');
    const t = e.touches[0];
    if (t) this._updateLens(t.clientX, t.clientY);
  };

  private _onTouchMove = (e: TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    const t = e.touches[0];
    if (t) this._updateLens(t.clientX, t.clientY);
  };

  private _onTouchEnd = () => {
    this.removeAttribute('active');
  };

  firstUpdated() {
    this._base.addEventListener('mouseenter', this._onMouseEnter);
    this._base.addEventListener('mousemove', this._onMouseMove);
    this._base.addEventListener('mouseleave', this._onMouseLeave);
    this._base.addEventListener('touchstart', this._onTouchStart, { passive: false });
    this._base.addEventListener('touchmove', this._onTouchMove, { passive: false });
    this._base.addEventListener('touchend', this._onTouchEnd);
    this._base.addEventListener('touchcancel', this._onTouchEnd);
  }

  render() {
    const size = this.size || 'var(--uibit-image-xray-lens-size, 12rem)';
    const lensStyle = styleMap({
      width: size,
      height: size,
      transform: `translate(calc(${this._x}px - 50%), calc(${this._y}px - 50%))`,
    });

    return html`
      <div class="base" part="base">
        <slot></slot>
        <div class="lens" part="lens" style=${lensStyle}>
          <div class="lens-inner" part="lens-inner">
            <div class="lens-img" part="lens-img">
              <slot name="xray"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-image-xray': ImageXray;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-image-xray': ImageXray;
    }
  }
}

export default ImageXray;
