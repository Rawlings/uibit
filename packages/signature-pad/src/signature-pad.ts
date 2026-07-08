import { LitElement, html, css } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import type { SignaturePoint, SignatureStroke } from './types.js';

/**
 * Canvas area for capturing freehand signatures or drawings using touch or
 * mouse gestures, rendered immediately as smooth bezier-curved vector lines
 * with simulated pen pressure.
 *
 * @fires {{ isEmpty: boolean; dataUrl: string }} signature-change - Fired after each stroke ends
 * @fires {{ previouslyEmpty: boolean }} signature-clear - Fired when the canvas is cleared
 *
 * @cssprop [--uibit-signature-pad-width=100%] - Width of the signature area
 * @cssprop [--uibit-signature-pad-height=200px] - Height of the signature area
 * @cssprop [--uibit-signature-pad-background=#ffffff] - Canvas background color
 * @cssprop [--uibit-signature-pad-border=1px solid #d1d5db] - Border around the canvas
 * @cssprop [--uibit-signature-pad-border-radius=8px] - Border radius
 * @cssprop [--uibit-signature-pad-stroke-color=#111111] - Ink/stroke color
 * @cssprop [--uibit-signature-pad-stroke-width=2px] - Base stroke width (varies with velocity)
 * @cssprop [--uibit-signature-pad-hint-color=rgba(0,0,0,0.25)] - Color of the sign-here hint text
 * @cssprop [--uibit-signature-pad-hint-font-size=0.875rem] - Font size of the hint text
 * @cssprop [--uibit-signature-pad-cursor=crosshair] - Cursor style over the canvas
 *
 * @csspart container - The outermost wrapper element
 * @csspart canvas - The drawing canvas element
 * @csspart hint - The "Sign here" placeholder hint
 * @csspart clear-button - The clear button
 */
@customElement('uibit-signature-pad')
export class SignaturePad extends LitElement {
  static styles = css`
    :host {
      display: block;
      --uibit-signature-pad-width: 100%;
      --uibit-signature-pad-height: 200px;
      --uibit-signature-pad-background: #ffffff;
      --uibit-signature-pad-border: 1px solid #d1d5db;
      --uibit-signature-pad-border-radius: 8px;
      --uibit-signature-pad-stroke-color: #111111;
      --uibit-signature-pad-stroke-width: 2px;
      --uibit-signature-pad-hint-color: rgba(0, 0, 0, 0.25);
      --uibit-signature-pad-hint-font-size: 0.875rem;
      --uibit-signature-pad-cursor: crosshair;
    }

    .container {
      position: relative;
      width: var(--uibit-signature-pad-width);
      height: var(--uibit-signature-pad-height);
      background: var(--uibit-signature-pad-background);
      border: var(--uibit-signature-pad-border);
      border-radius: var(--uibit-signature-pad-border-radius);
      overflow: hidden;
      user-select: none;
      touch-action: none;
      box-sizing: border-box;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      cursor: var(--uibit-signature-pad-cursor);
    }

    .hint {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--uibit-signature-pad-hint-color);
      font-size: var(--uibit-signature-pad-hint-font-size);
      font-family: inherit;
      pointer-events: none;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .hint::before {
      content: '';
      display: block;
      width: 32px;
      height: 1px;
      background: currentColor;
    }

    .hint::after {
      content: '';
      display: block;
      width: 32px;
      height: 1px;
      background: currentColor;
    }

    .clear-button {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-family: inherit;
      background: transparent;
      border: 1px solid currentColor;
      border-radius: 4px;
      color: var(--uibit-signature-pad-hint-color);
      cursor: pointer;
      line-height: 1.5;
      transition: color 120ms ease, border-color 120ms ease;
    }

    .clear-button:hover {
      color: var(--uibit-signature-pad-stroke-color);
      border-color: var(--uibit-signature-pad-stroke-color);
    }

    .clear-button:focus-visible {
      outline: 2px solid var(--uibit-signature-pad-stroke-color);
      outline-offset: 2px;
    }
  `;

  /** Placeholder text shown when the pad is empty. */
  @property({ type: String }) hint = 'Sign here';
  /** Label for the clear button. */
  @property({ type: String }) clearLabel = 'Clear';
  /** Whether to show the clear button. */
  @property({ type: Boolean }) hideClear = false;

  @state() private isEmpty = true;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private strokes: SignatureStroke[] = [];
  private currentStroke: SignaturePoint[] = [];
  private isPointerDown = false;
  private lastVelocity = 0;

  firstUpdated() {
    this.canvas = this.shadowRoot!.querySelector('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.attachListeners();

    const ro = new ResizeObserver(() => {
      const imageData = this.toDataURL();
      this.resizeCanvas();
      if (imageData && !this.isEmpty) this.restoreFromDataUrl(imageData);
    });
    ro.observe(this.canvas);
  }

  private resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.redrawStrokes();
  }

  private attachListeners() {
    this.canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.canvas.addEventListener('pointerup', (e) => this.onPointerUp(e));
    this.canvas.addEventListener('pointercancel', (e) => this.onPointerUp(e));
    this.canvas.addEventListener('pointerleave', (e) => this.onPointerUp(e));
  }

  private getPoint(e: PointerEvent): SignaturePoint {
    const rect = this.canvas.getBoundingClientRect();
    const pressure = e.pressure > 0 ? e.pressure : 0.5;
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure,
      timestamp: e.timeStamp,
    };
  }

  private onPointerDown(e: PointerEvent) {
    e.preventDefault();
    this.canvas.setPointerCapture(e.pointerId);
    this.isPointerDown = true;
    this.lastVelocity = 0;
    this.currentStroke = [this.getPoint(e)];
  }

  private onPointerMove(e: PointerEvent) {
    if (!this.isPointerDown) return;
    e.preventDefault();
    const point = this.getPoint(e);
    this.currentStroke.push(point);
    this.drawStrokeSegment(this.currentStroke);
    if (this.isEmpty) {
      this.isEmpty = false;
    }
  }

  private onPointerUp(_e: PointerEvent) {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;

    if (this.currentStroke.length > 0) {
      this.strokes.push({ points: [...this.currentStroke] });
      this.currentStroke = [];
      this.dispatchEvent(
        new CustomEvent('signature-change', {
          detail: { isEmpty: this.isEmpty, dataUrl: this.toDataURL() },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private strokeWidth(): number {
    const raw = getComputedStyle(this).getPropertyValue('--uibit-signature-pad-stroke-width').trim();
    return parseFloat(raw) || 2;
  }

  private strokeColor(): string {
    return getComputedStyle(this).getPropertyValue('--uibit-signature-pad-stroke-color').trim() || '#111111';
  }

  private drawStrokeSegment(points: SignaturePoint[]) {
    if (points.length < 2) return;

    const ctx = this.ctx;
    const baseWidth = this.strokeWidth();
    const color = this.strokeColor();

    const last = points[points.length - 2]!;
    const curr = points[points.length - 1]!;

    const dx = curr.x - last.x;
    const dy = curr.y - last.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dt = Math.max(curr.timestamp - last.timestamp, 1);
    const velocity = dist / dt;

    this.lastVelocity = this.lastVelocity * 0.7 + velocity * 0.3;
    const speedFactor = Math.max(0.4, 1 - this.lastVelocity * 0.04);
    const width = baseWidth * speedFactor * (curr.pressure * 1.5 + 0.5);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (points.length === 2) {
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(curr.x, curr.y);
    } else {
      const prev = points[points.length - 3]!;
      const cx = (last.x + curr.x) / 2;
      const cy = (last.y + curr.y) / 2;
      const prevCx = (prev.x + last.x) / 2;
      const prevCy = (prev.y + last.y) / 2;
      ctx.moveTo(prevCx, prevCy);
      ctx.quadraticCurveTo(last.x, last.y, cx, cy);
    }

    ctx.stroke();
  }

  private redrawStrokes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const stroke of this.strokes) {
      for (let i = 1; i < stroke.points.length; i++) {
        this.drawStrokeSegment(stroke.points.slice(0, i + 1));
      }
    }
  }

  private restoreFromDataUrl(dataUrl: string) {
    const img = new Image();
    img.onload = () => {
      const rect = this.canvas.getBoundingClientRect();
      this.ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };
    img.src = dataUrl;
  }

  /** Returns the signature as a PNG data URL, or an empty string if the pad is empty. */
  toDataURL(type = 'image/png'): string {
    if (this.isEmpty) return '';
    return this.canvas.toDataURL(type);
  }

  /** Returns the signature as an inline SVG string built from the recorded strokes. */
  toSVG(): string {
    if (this.isEmpty) return '';
    const rect = this.canvas.getBoundingClientRect();
    const baseWidth = this.strokeWidth();
    const color = this.strokeColor();
    const paths: string[] = [];

    for (const stroke of this.strokes) {
      if (stroke.points.length < 2) continue;
      const pts = stroke.points;
      let d = `M ${pts[0]!.x.toFixed(2)} ${pts[0]!.y.toFixed(2)}`;
      for (let i = 1; i < pts.length; i++) {
        if (i === 1) {
          d += ` L ${pts[i]!.x.toFixed(2)} ${pts[i]!.y.toFixed(2)}`;
        } else {
          const prev = pts[i - 1]!;
          const curr = pts[i]!;
          const cx = ((prev.x + curr.x) / 2).toFixed(2);
          const cy = ((prev.y + curr.y) / 2).toFixed(2);
          d += ` Q ${prev.x.toFixed(2)} ${prev.y.toFixed(2)} ${cx} ${cy}`;
        }
      }
      paths.push(`<path d="${d}" stroke="${color}" stroke-width="${baseWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}" viewBox="0 0 ${rect.width} ${rect.height}">${paths.join('')}</svg>`;
  }

  /** Clears all strokes from the pad. */
  clear() {
    const wasEmpty = this.isEmpty;
    this.strokes = [];
    this.currentStroke = [];
    this.isEmpty = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.dispatchEvent(
      new CustomEvent('signature-clear', {
        detail: { previouslyEmpty: wasEmpty },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div part="container" class="container" role="img" aria-label="Signature pad">
        <canvas part="canvas"></canvas>
        ${this.isEmpty
          ? html`<div part="hint" class="hint">${this.hint}</div>`
          : ''}
        ${!this.hideClear
          ? html`<button
              part="clear-button"
              class="clear-button"
              ?disabled=${this.isEmpty}
              @click=${() => this.clear()}
            >${this.clearLabel}</button>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-signature-pad': SignaturePad;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-signature-pad': any;
    }
  }
}

export default SignaturePad;
