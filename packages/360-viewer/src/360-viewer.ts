import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('uibit-360-viewer')
export class Viewer360 extends LitElement {
  static styles = css`
    :host {
      --viewer-bg: #f5f5f5;
      --viewer-border: #e5e7eb;
      --viewer-button-bg: rgba(255, 255, 255, 0.7);
      --viewer-button-bg-hover: rgba(255, 255, 255, 0.9);
      --viewer-button-color: #374151;
      --viewer-focus-color: #3b82f6;
      display: block;
      width: 100%;
    }

    .viewer {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: var(--viewer-bg);
      border: 1px solid var(--viewer-border);
      border-radius: 8px;
      touch-action: none;
      user-select: none;
      -webkit-user-drag: none;
      outline: none;
    }

    .viewer:focus-visible {
      box-shadow: 0 0 0 3px var(--viewer-focus-color);
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      pointer-events: none;
      user-select: none;
      -webkit-user-drag: none;
    }

    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: var(--viewer-button-bg);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: var(--viewer-button-color);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transition: opacity 200ms ease, background-color 150ms ease, transform 150ms ease;
      z-index: 10;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .viewer:hover .nav-button,
    .nav-button:focus-visible {
      opacity: 1;
    }

    .nav-button:hover {
      background: var(--viewer-button-bg-hover);
      transform: translateY(-50%) scale(1.05);
    }

    .nav-button:active {
      transform: translateY(-50%) scale(0.95);
    }

    .nav-button-prev {
      left: 12px;
    }

    .nav-button-next {
      right: 12px;
    }

    .nav-button svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .drag-hint {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(17, 24, 39, 0.7);
      color: white;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      pointer-events: none;
      opacity: 0.8;
      transition: opacity 300ms ease;
      display: flex;
      align-items: center;
      gap: 6px;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 5;
    }

    .viewer.dragging .drag-hint {
      opacity: 0;
    }

    .progress-track {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(0, 0, 0, 0.1);
      z-index: 5;
    }

    .progress-bar {
      height: 100%;
      background: var(--viewer-focus-color);
      transition: width 100ms ease;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  `;

  @property({ type: Array }) images: string[] = [];
  @property({ type: Boolean }) autoRotate = false;
  @property({ type: Number }) rotationSpeed = 150; // ms per frame
  @property({ type: Number }) dragSensitivity = 15; // px of horizontal drag to trigger index change
  @property({ type: Boolean }) showControls = true;
  @property({ type: Boolean }) showProgressBar = true;

  @state() private currentIndex = 0;
  @state() private isDragging = false;

  private autoRotateTimer?: number;
  private resumeTimer?: number;
  private startX = 0;
  private startImageIndex = 0;

  connectedCallback() {
    super.connectedCallback();
    this.startAutoRotate();
    this.preloadAllImages();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoRotate();
    this.clearResumeTimer();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('autoRotate') || changedProperties.has('rotationSpeed')) {
      if (this.autoRotate) {
        this.startAutoRotate();
      } else {
        this.stopAutoRotate();
      }
    }
    if (changedProperties.has('images')) {
      this.currentIndex = 0;
      this.preloadAllImages();
      if (this.autoRotate) {
        this.startAutoRotate();
      }
    }
  }

  private startAutoRotate() {
    this.stopAutoRotate();
    if (!this.autoRotate || this.images.length === 0) return;
    this.autoRotateTimer = window.setInterval(() => {
      this.next();
    }, this.rotationSpeed);
  }

  private stopAutoRotate() {
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
      this.autoRotateTimer = undefined;
    }
  }

  private scheduleAutoRotateResume() {
    if (!this.autoRotate) return;
    this.clearResumeTimer();
    this.resumeTimer = window.setTimeout(() => {
      this.startAutoRotate();
    }, 2000);
  }

  private clearResumeTimer() {
    if (this.resumeTimer) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = undefined;
    }
  }

  private preloadAdjacentImages() {
    if (!this.images || this.images.length === 0) return;
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    
    [nextIndex, prevIndex].forEach((idx) => {
      const img = new Image();
      img.src = this.images[idx];
    });
  }

  private preloadAllImages() {
    if (!this.images) return;
    this.images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  next() {
    if (this.images.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.preloadAdjacentImages();
    this.emitChange();
  }

  prev() {
    if (this.images.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.preloadAdjacentImages();
    this.emitChange();
  }

  private emitChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          index: this.currentIndex,
          image: this.images[this.currentIndex]
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private handlePointerDown(e: PointerEvent) {
    if (this.images.length === 0) return;
    this.isDragging = true;
    this.startX = e.clientX;
    this.startImageIndex = this.currentIndex;
    this.stopAutoRotate();
    this.clearResumeTimer();
    
    const viewer = e.currentTarget as HTMLElement;
    viewer.setPointerCapture(e.pointerId);
  }

  private handlePointerMove(e: PointerEvent) {
    if (!this.isDragging || this.images.length === 0) return;
    const deltaX = e.clientX - this.startX;
    const step = this.dragSensitivity;
    const offset = Math.round(deltaX / step);
    let newIndex = (this.startImageIndex - offset) % this.images.length;
    if (newIndex < 0) {
      newIndex += this.images.length;
    }
    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
      this.preloadAdjacentImages();
    }
  }

  private handlePointerUp(e: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    try {
      const viewer = e.currentTarget as HTMLElement;
      viewer.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore pointer capture release exceptions if target unmounted
    }
    this.scheduleAutoRotateResume();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.stopAutoRotate();
      this.clearResumeTimer();
      this.next();
      this.scheduleAutoRotateResume();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.stopAutoRotate();
      this.clearResumeTimer();
      this.prev();
      this.scheduleAutoRotateResume();
    }
  }

  render() {
    const image = this.images[this.currentIndex];
    const progressPercent = this.images.length > 0 
      ? ((this.currentIndex + 1) / this.images.length) * 100 
      : 0;

    return html`
      <div 
        class="viewer ${this.isDragging ? 'dragging' : ''}"
        tabindex="0"
        role="region"
        aria-label="360 degree product view. Use drag, arrow keys, or buttons to rotate."
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointercancel=${this.handlePointerUp}
        @keydown=${this.handleKeyDown}
      >
        ${image 
          ? html`
              <img 
                src="${image}" 
                alt="360 view frame ${this.currentIndex + 1} of ${this.images.length}" 
              />
            ` 
          : html`<p style="padding: 24px; text-align: center; color: var(--viewer-button-color);">No images provided</p>`
        }

        ${this.images.length > 0 && !this.isDragging ? html`
          <div class="drag-hint">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/>
            </svg>
            Drag to rotate
          </div>
        ` : ''}

        ${this.showControls && this.images.length > 0 ? html`
          <button 
            class="nav-button nav-button-prev" 
            aria-label="Rotate left"
            @click=${(e: Event) => {
              e.stopPropagation();
              this.stopAutoRotate();
              this.clearResumeTimer();
              this.prev();
              this.scheduleAutoRotateResume();
            }}
          >
            <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button 
            class="nav-button nav-button-next" 
            aria-label="Rotate right"
            @click=${(e: Event) => {
              e.stopPropagation();
              this.stopAutoRotate();
              this.clearResumeTimer();
              this.next();
              this.scheduleAutoRotateResume();
            }}
          >
            <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        ` : ''}

        ${this.showProgressBar && this.images.length > 0 ? html`
          <div class="progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="${this.images.length}" aria-valuenow="${this.currentIndex + 1}">
            <div class="progress-bar" style="width: ${progressPercent}%"></div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-360-viewer': Viewer360;
  }
}

export default Viewer360;
