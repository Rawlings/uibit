import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Canvas-based scratch card that reveals slotted content as the user
 * scratches over a configurable overlay layer.
 *
 * @fires {{ percentage: number }} scratch-progress - Fired as the user scratches; `detail.percentage` is 0–100
 * @fires void scratch-reveal - Fired once when the revealed area crosses `revealPercentage`
 *
 * @slot - The content revealed beneath the scratch overlay
 *
 * @cssprop [--uibit-scratch-reveal-width=25rem] - Width of the scratch card
 * @cssprop [--uibit-scratch-reveal-height=12.5rem] - Height of the scratch card
 * @cssprop [--uibit-scratch-reveal-border-radius=0.5rem] - Border radius of the card
 * @cssprop [--uibit-scratch-reveal-background=#f3f4f6] - Background color of the revealed content area
 * @cssprop [--uibit-scratch-reveal-padding=1rem] - Padding of the revealed content area
 * @cssprop [--uibit-scratch-reveal-font-size=1rem] - Font size of the revealed content
 * @cssprop [--uibit-scratch-reveal-font-weight=600] - Font weight of the revealed content
 * @cssprop [--uibit-scratch-reveal-color=#111827] - Text color of the revealed content
 * @cssprop [--uibit-scratch-reveal-overlay-color=#d1d5db] - Fill color of the scratchable overlay
 * @cssprop [--uibit-scratch-reveal-instructions-color=rgba(0,0,0,0.4)] - Color of the scratch instruction hint
 * @cssprop [--uibit-scratch-reveal-instructions-font-size=0.875rem] - Font size of the scratch instruction hint
 */
@customElement('uibit-scratch-reveal')
export class ScratchReveal extends LitElement {
  static styles = styles;

  /** Percentage (0–100) of the overlay that must be scratched before the `scratch-reveal` event fires. */
  @property({ type: Number }) revealPercentage = 0;

  get brushSize(): number {
    if (typeof window === 'undefined') return 80;
    const val = getComputedStyle(this).getPropertyValue('--uibit-scratch-reveal-brush-size').trim();
    return val ? parseFloat(val) || 80 : 80;
  }

  @state() private isRevealed = false;
  @state() private showInstructions = true;

  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D | null;
  private isDrawing = false;

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.setupCanvas();
  }

  private setupCanvas() {
    const container = this.shadowRoot?.querySelector('.scratch-container') as HTMLElement;
    if (!container) return;

    this.canvas = this.shadowRoot?.querySelector('canvas') as HTMLCanvasElement;
    if (!this.canvas) return;

    const rect = container.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;

    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!this.ctx) return;

    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.drawOverlay();
    this.attachEventListeners();
  }

  private drawOverlay() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.fillStyle = 'var(--uibit-scratch-reveal-overlay-color, #c0c0c0)';
    this.ctx.fillRect(0, 0, this.canvas.width / window.devicePixelRatio, this.canvas.height / window.devicePixelRatio);
  }

  private attachEventListeners() {
    if (!this.canvas) return;

    this.canvas.addEventListener('mousedown', (e) => this.startScratching(e));
    this.canvas.addEventListener('mousemove', (e) => this.scratch(e));
    this.canvas.addEventListener('mouseup', () => this.stopScratching());
    this.canvas.addEventListener('mouseleave', () => this.stopScratching());

    this.canvas.addEventListener('touchstart', (e) => {
      this.isDrawing = true;
      this.showInstructions = false;
      const touch = e.touches[0];
      if (touch) {
        this.scratch(touch);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      const touch = e.touches[0];
      if (touch) {
        this.scratch(touch);
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => this.stopScratching());
    this.canvas.addEventListener('touchcancel', () => this.stopScratching());
  }

  private startScratching(e: MouseEvent) {
    this.isDrawing = true;
    this.showInstructions = false;
    this.scratch(e);
  }

  private stopScratching() {
    this.isDrawing = false;
  }

  private scratch(e: MouseEvent | Touch) {
    if (!this.isDrawing || !this.ctx || !this.canvas) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * window.devicePixelRatio;
    const y = (e.clientY - rect.top) * window.devicePixelRatio;

    this.ctx.clearRect(
      x - (this.brushSize * window.devicePixelRatio) / 2,
      y - (this.brushSize * window.devicePixelRatio) / 2,
      this.brushSize * window.devicePixelRatio,
      this.brushSize * window.devicePixelRatio
    );

    this.calculateRevealPercentage();
  }

  private calculateRevealPercentage() {
    if (!this.ctx || !this.canvas) return;

    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const data = imageData.data;

    let revealed = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        revealed++;
      }
    }

    const newPercentage = Math.round((revealed / (data.length / 4)) * 100);
    this.revealPercentage = newPercentage;

    if (newPercentage >= 50 && !this.isRevealed) {
      this.isRevealed = true;
      this.dispatchEvent(
        new CustomEvent('scratch-reveal', {
          detail: { revealPercentage: newPercentage },
          bubbles: true,
          composed: true
        })
      );
    }

    this.dispatchEvent(
      new CustomEvent('scratch-progress', {
        detail: { revealPercentage: newPercentage },
        bubbles: true,
        composed: true
      })
    );
  }

  reset() {
    this.isRevealed = false;
    this.showInstructions = true;
    this.revealPercentage = 0;
    if (this.ctx && this.canvas) {
      this.ctx.fillStyle = 'var(--uibit-scratch-reveal-overlay-color, #c0c0c0)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  render() {
    return html`
      <div part="container" class="scratch-container" role="img" aria-label="Scratch-off panel to reveal content">
        <div class="content" part="content">
          <slot></slot>
        </div>
        <canvas part="canvas"></canvas>
        ${this.showInstructions
        ? html`
              <div class="instructions" part="instructions">
                <span class="instructions-text">Scratch to reveal</span>
              </div>
            `
        : ''}
      </div>
    `;
  }
}

export default ScratchReveal;
