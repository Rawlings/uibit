import { html } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';
import type { ComparisonMode } from './types';

/**
 * An interactive visual comparison curtain component. Displays before and after states
 * and allows users to peel them back horizontally, vertically, diagonally, or radially.
 *
 * @fires { progress: number } comparison-progress - Fired when the curtain progress updates
 *
 * @cssprop [--uibit-comparison-curtain-handle-size=2.75rem] - Diameter of the handle knob
 * @cssprop [--uibit-comparison-curtain-handle-bg=#ffffff] - Background color of the handle knob
 * @cssprop [--uibit-comparison-curtain-handle-border-color=transparent] - Border outline color of the handle
 * @cssprop [--uibit-comparison-curtain-handle-inner-color=#111111] - Color of the arrows/icons inside the handle
 * @cssprop [--uibit-comparison-curtain-border-color=#ffffff] - Separation line border color
 */
@customElement('uibit-comparison-curtain')
export class ComparisonCurtain extends UIBitElement {
  static styles = styles;

  /** Visual mode of reveal: 'horizontal' | 'vertical' | 'diagonal' | 'radial' */
  @property({ type: String }) mode: ComparisonMode = 'horizontal';

  /** Reveal progress percentage (0 to 100) */
  @property({ type: Number }) progress = 50;

  /** Whether progress is interactive via dragging/touching */
  @property({ type: Boolean }) interactive = true;

  /** If true, pointer movement tracks progress immediately without click-dragging */
  @property({ type: Boolean }) hoverReveal = false;

  @state() private _isDragging = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', this.getAttribute('tabindex') || '0');
    this.setAttribute('role', 'slider');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '100');
    this._updateAria();

    this.listen(this, 'keydown', this._onKeyDown);
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('progress')) {
      this._updateAria();
    }
  }

  private _updateAria() {
    this.setAttribute('aria-valuenow', String(this.progress));
    this.setAttribute('aria-label', `Visual comparison slider, current progress ${this.progress}%`);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (!this.interactive) return;

    let newProgress = this.progress;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newProgress = Math.max(0, this.progress - 5);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newProgress = Math.min(100, this.progress + 5);
        break;
      case 'Home':
        newProgress = 0;
        break;
      case 'End':
        newProgress = 100;
        break;
      default:
        return; // Let other keys propagate
    }

    e.preventDefault();
    if (newProgress !== this.progress) {
      this.progress = newProgress;
      this.dispatchCustomEvent('comparison-progress', { progress: this.progress });
    }
  }

  private _updateProgressFromEvent(e: PointerEvent) {
    const rect = this.getBoundingClientRect();
    let pct = 50;

    if (this.mode === 'horizontal') {
      const x = e.clientX - rect.left;
      pct = (x / rect.width) * 100;
    } else if (this.mode === 'vertical') {
      const y = e.clientY - rect.top;
      pct = (y / rect.height) * 100;
    } else if (this.mode === 'diagonal') {
      const x = e.clientX - rect.left;
      pct = (x / rect.width) * 100;
    } else if (this.mode === 'radial') {
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(x * x + y * y);
      const maxDist = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
      pct = (dist / maxDist) * 100;
    }

    pct = Math.max(0, Math.min(100, pct));
    const rounded = Math.round(pct);
    if (rounded !== this.progress) {
      this.progress = rounded;
      this.dispatchCustomEvent('comparison-progress', { progress: this.progress });
    }
  }

  private _onPointerDown(e: PointerEvent) {
    if (!this.interactive || this.hoverReveal) return;
    const container = this.shadowRoot?.querySelector('.container') as HTMLElement;
    if (container) {
      container.setPointerCapture(e.pointerId);
    }
    this._isDragging = true;
    this._updateProgressFromEvent(e);
  }

  private _onPointerMove(e: PointerEvent) {
    if (!this.interactive) return;
    if (this.hoverReveal || this._isDragging) {
      this._updateProgressFromEvent(e);
    }
  }

  private _onPointerUp(e: PointerEvent) {
    if (this._isDragging) {
      const container = this.shadowRoot?.querySelector('.container') as HTMLElement;
      if (container) {
        container.releasePointerCapture(e.pointerId);
      }
      this._isDragging = false;
    }
  }

  private _getClipPath(): string {
    const p = this.progress;
    if (this.mode === 'horizontal') {
      return `inset(0 ${100 - p}% 0 0)`;
    }
    if (this.mode === 'vertical') {
      return `inset(0 0 ${100 - p}% 0)`;
    }
    if (this.mode === 'radial') {
      return `circle(${p}% at 50% 50%)`;
    }
    if (this.mode === 'diagonal') {
      if (p <= 50) {
        return `polygon(0 0, ${p * 2}% 0, 0 ${p * 2}%)`;
      } else {
        return `polygon(0 0, 100% 0, 100% ${(p - 50) * 2}%, ${(p - 50) * 2}% 100%, 0 100%)`;
      }
    }
    return 'none';
  }

  private _getHandleStyle(): string {
    const p = this.progress;
    if (this.mode === 'horizontal') {
      return `left: ${p}%; top: 50%;`;
    }
    if (this.mode === 'vertical') {
      return `left: 50%; top: ${p}%;`;
    }
    if (this.mode === 'diagonal') {
      return `left: ${p}%; top: ${p}%;`;
    }
    // Radial placing handle in center
    return `left: 50%; top: 50%;`;
  }

  private _getDividerStyle(): string {
    const p = this.progress;
    if (this.mode === 'horizontal') {
      return `left: ${p}%;`;
    }
    if (this.mode === 'vertical') {
      return `top: ${p}%;`;
    }
    return '';
  }

  private _renderHandleIcon() {
    if (this.mode === 'horizontal') {
      return html`
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 7L4 12L9 17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 7L20 12L15 17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    if (this.mode === 'vertical') {
      return html`
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 9L12 4L17 9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 15L12 20L17 15" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    if (this.mode === 'diagonal') {
      return html`
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7L4 4M4 4L9 4M4 4L4 9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 17L20 20M20 20L15 20M20 20L20 15" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    // Radial
    return html`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L12 8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M12 16L12 20" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M4 12L8 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M16 12L20 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M6.34 6.34L9.17 9.17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M14.83 14.83L17.66 17.66" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M17.66 6.34L14.83 9.17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <path d="M9.17 14.83L6.34 17.66" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
      </svg>
    `;
  }

  render() {
    const clipStyle = `clip-path: ${this._getClipPath()};`;
    const handleStyle = this._getHandleStyle();
    const dividerStyle = this._getDividerStyle();

    return html`
      <div 
        class="container" 
        part="container"
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
      >
        <div class="layer layer-after" part="after-layer">
          <slot name="after"></slot>
        </div>

        <div class="layer layer-before" style=${clipStyle} part="before-layer">
          <slot name="before"></slot>
        </div>

        ${this.mode === 'horizontal' || this.mode === 'vertical'
          ? html`
              <div 
                class="divider divider-${this.mode}" 
                style=${dividerStyle}
                part="divider"
              ></div>
            `
          : ''}

        <div 
          class="handle" 
          style=${handleStyle} 
          part="handle"
          role="presentation"
        >
          <slot name="handle">
            <div class="handle-icon">
              ${this._renderHandleIcon()}
            </div>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-comparison-curtain': ComparisonCurtain;
  }
}

export default ComparisonCurtain;
