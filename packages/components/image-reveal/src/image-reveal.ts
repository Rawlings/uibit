import { html } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { property, state, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { styles } from './styles';

/**
 * Reveals a synchronized secondary "xray" image through a circular lens that

 * @summary A scroll-triggered overlay image reveal effect component.
 * follows the user's cursor or touch point over the primary image.
 *
 * Place the primary image in the default slot and the reveal image in the
 * `xray` named slot. Both images are pixel-aligned so the lens shows exactly
 * what lies beneath the cursor on the xray layer.
 *
 * @slot - Primary (outer) image
 * @slot xray - Secondary image revealed through the lens
 *
 * @fires {{ x: number, y: number }} reveal-move - Fired as the lens moves; `detail.x` and `detail.y` are percentages
 *
 * @cssprop [--uibit-image-reveal-lens-size=12rem] - Diameter of the circular lens
 * @cssprop [--uibit-image-reveal-lens-shadow=0 0 0 0.1875rem #ffffff, 0 0.5rem 2rem rgba(0,0,0,0.35)] - Box shadow of the lens ring
 
 * @cssstate revealed - Active when the image has completed its reveal transition.*/
@customElement('uibit-image-reveal')
export class ImageReveal extends UIBitElement {
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

  private _lensSize(): number {
    const prop =
      this.size ||
      this.getCssPropertyValue('--uibit-image-reveal-lens-size').trim() ||
      '12rem';
    if (prop.endsWith('rem')) {
      return (
        parseFloat(prop) *
        parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
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

    this.dispatchCustomEvent('reveal-move', {
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
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
    this.listen(this._base, 'mouseenter', this._onMouseEnter);
    this.listen(this._base, 'mousemove', this._onMouseMove);
    this.listen(this._base, 'mouseleave', this._onMouseLeave);
    this.listen(this._base, 'touchstart', this._onTouchStart, {
      passive: false,
    });
    this.listen(this._base, 'touchmove', this._onTouchMove, { passive: false });
    this.listen(this._base, 'touchend', this._onTouchEnd);
    this.listen(this._base, 'touchcancel', this._onTouchEnd);
  }

  render() {
    const size = this.size || 'var(--uibit-image-reveal-lens-size, 12rem)';
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
              <slot name="reveal"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default ImageReveal;
