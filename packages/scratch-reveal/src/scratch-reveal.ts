import { LitElement, html, css } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';

@customElement('uibit-scratch-reveal')
export class ScratchReveal extends LitElement {
  static styles = css`
    :host {
      display: block;
      --uibit-scratch-reveal-width: 300px;
      --uibit-scratch-reveal-height: 200px;
      --uibit-scratch-reveal-overlay-color: #c0c0c0;
      --uibit-scratch-reveal-cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="none" stroke="black" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="black"/></svg>') 16 16, auto;
      --uibit-scratch-reveal-brush-size: 40px;
    }

    .scratch-container {
      position: relative;
      width: var(--uibit-scratch-reveal-width);
      height: var(--uibit-scratch-reveal-height);
      overflow: hidden;
      border-radius: var(--uibit-scratch-reveal-border-radius, 8px);
      background: var(--uibit-scratch-reveal-background, #f0f0f0);
      user-select: none;
      touch-action: none;
    }

    .content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--uibit-scratch-reveal-padding, 1rem);
      font-size: var(--uibit-scratch-reveal-font-size, 1rem);
      font-weight: var(--uibit-scratch-reveal-font-weight, bold);
      color: var(--uibit-scratch-reveal-color, #000000);
      text-align: center;
      word-break: break-word;
      z-index: 1;
    }

    canvas {
      position: absolute;
      inset: 0;
      cursor: var(--uibit-scratch-reveal-cursor);
      z-index: 2;
      display: block;
    }

    .instructions {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: var(--uibit-scratch-reveal-instructions-color, rgba(0, 0, 0, 0.6));
      font-size: var(--uibit-scratch-reveal-instructions-font-size, 0.875rem);
      pointer-events: none;
      z-index: 3;
    }

    .instructions-text {
      display: block;
      margin-bottom: 0.5rem;
    }
  `;

  @property({ type: Number }) revealPercentage = 0;

  get brushSize(): number {
    if (typeof window === 'undefined') return 40;
    const val = getComputedStyle(this).getPropertyValue('--uibit-scratch-reveal-brush-size').trim();
    return val ? parseFloat(val) || 40 : 40;
  }

  @state() private isRevealed = false;
  @state() private showInstructions = true;

  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
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

    this.canvas.addEventListener('touchstart', (e) => this.startScratching(e as any));
    this.canvas.addEventListener('touchmove', (e) => this.scratch(e as any));
    this.canvas.addEventListener('touchend', () => this.stopScratching());
    this.canvas.addEventListener('touchcancel', () => this.stopScratching());
  }

  private startScratching(e: MouseEvent | Touch) {
    this.isDrawing = true;
    this.showInstructions = false;
    this.scratch(e);
  }

  private stopScratching() {
    this.isDrawing = false;
  }

  private scratch(e: MouseEvent | { clientX: number; clientY: number }) {
    if (!this.isDrawing || !this.ctx || !this.canvas) return;

    e.preventDefault?.();

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

declare global {
  interface HTMLElementTagNameMap {
    'uibit-scratch-reveal': ScratchReveal;
  }
}

export default ScratchReveal;
