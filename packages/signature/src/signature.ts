import { html, css } from 'lit';
import { customElement, fromLucide, getIcon, UIBitElement } from '@uibit/core';
import { RotateCcw } from 'lucide';
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
 * @slot hint - Placeholder text shown when the pad is empty. Defaults to "Sign here".
 * @slot clear-label - Label text inside the clear button. Defaults to "Clear".
 *
 * @cssprop [--uibit-signature-width=100%] - Width of the signature area
 * @cssprop [--uibit-signature-height=11.25rem] - Height of the signature area
 * @cssprop [--uibit-signature-background=#ffffff] - Canvas background color
 * @cssprop [--uibit-signature-border=0.0625rem solid #e5e7eb] - Border around the canvas
 * @cssprop [--uibit-signature-border-radius=0.5rem] - Border radius
 * @cssprop [--uibit-signature-stroke-color=#111111] - Ink/stroke color
 * @cssprop [--uibit-signature-stroke-width=0.15625rem] - Base stroke width (varies with velocity)
 * @cssprop [--uibit-signature-hint-color=rgba(0,0,0,0.22)] - Color of the sign-here hint text
 * @cssprop [--uibit-signature-hint-font-size=0.8125rem] - Font size of the hint text
 * @cssprop [--uibit-signature-cursor=crosshair] - Cursor style over the canvas
 *
 * @csspart container - The outermost wrapper element
 * @csspart canvas - The drawing canvas element
 * @csspart hint - The "Sign here" placeholder hint
 * @csspart clear-button - The clear button
 */
@customElement('uibit-signature')
export class Signature extends UIBitElement {
  static styles = css`
    :host {
      display: block;
      --uibit-signature-width: 100%;
      --uibit-signature-height: 11.25rem;
      --uibit-signature-background: #ffffff;
      --uibit-signature-border: 0.0625rem solid #e5e7eb;
      --uibit-signature-border-radius: 0.5rem;
      --uibit-signature-stroke-color: #111111;
      --uibit-signature-stroke-width: 0.15625rem;
      --uibit-signature-hint-color: rgba(0, 0, 0, 0.22);
      --uibit-signature-hint-font-size: 0.8125rem;
      --uibit-signature-cursor: crosshair;
    }

    .container {
      position: relative;
      width: var(--uibit-signature-width);
      height: var(--uibit-signature-height);
      background: var(--uibit-signature-background);
      border: var(--uibit-signature-border);
      border-radius: var(--uibit-signature-border-radius);
      overflow: hidden;
      user-select: none;
      touch-action: none;
      box-sizing: border-box;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      cursor: var(--uibit-signature-cursor);
    }

    .hint {
      position: absolute;
      bottom: 0.75rem;
      left: 50%;
      transform: translateX(-50%);
      color: var(--uibit-signature-hint-color);
      font-size: var(--uibit-signature-hint-font-size);
      font-family: inherit;
      pointer-events: none;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }

    .hint::before {
      content: '';
      display: block;
      width: 2rem;
      height: 0.0625rem;
      background: currentColor;
    }

    .hint::after {
      content: '';
      display: block;
      width: 2rem;
      height: 0.0625rem;
      background: currentColor;
    }

    .clear-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 1.75rem;
      height: 1.75rem;
      padding: 0;
      font-family: inherit;
      background: transparent;
      border: none;
      border-radius: 9999rem;
      color: var(--uibit-signature-hint-color);
      cursor: pointer;
      transition: color 150ms ease, background-color 150ms ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .clear-button:hover {
      color: var(--uibit-signature-stroke-color);
      background-color: rgba(0, 0, 0, 0.06);
    }

    .clear-button:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .clear-button:focus-visible {
      outline: 0.125rem solid var(--uibit-signature-stroke-color);
      outline-offset: 0.125rem;
    }
  `;

  /** Whether to hide the clear button. */
  @property({ type: Boolean, attribute: 'hide-clear' }) hideClear = false;

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
      this.dispatchCustomEvent('signature-change', { isEmpty: this.isEmpty, dataUrl: this.toDataURL() });
    }
  }

  private strokeWidth(): number {
    const raw = this.getCssPropertyValue('--uibit-signature-stroke-width').trim();
    if (!raw) return 2;
    const num = parseFloat(raw);
    if (isNaN(num)) return 2;
    if (raw.endsWith('rem')) {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return num * rootFontSize;
    }
    if (raw.endsWith('em')) {
      const parentFontSize = parseFloat(getComputedStyle(this).fontSize) || 16;
      return num * parentFontSize;
    }
    return num;
  }

  private strokeColor(): string {
    return getComputedStyle(this).getPropertyValue('--uibit-signature-stroke-color').trim() || '#111111';
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
    this.dispatchCustomEvent('signature-clear', { previouslyEmpty: wasEmpty });
  }

  render() {
    return html`
      <div part="container" class="container" role="img" aria-label="Signature pad">
        <canvas part="canvas"></canvas>
        ${this.isEmpty
        ? html`<div part="hint" class="hint"><slot name="hint">Sign here</slot></div>`
        : ''}
        <slot name="clear-button" @click=${() => this.clear()}>
          ${!this.hideClear
          ? html`<button
                part="clear-button"
                class="clear-button"
                ?disabled=${this.isEmpty}
              >${getIcon('rotate-ccw', 14, fromLucide(RotateCcw))}</button>`
          : ''}
        </slot>
      </div>
    `;
  }
}

export default Signature;
