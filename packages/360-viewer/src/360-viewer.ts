import { html } from 'lit';
import { customElement, getIcon, UIBitElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * 360° product viewer driven by an array of sequential images.
 * Supports drag, touch, auto-rotation, and keyboard controls.
 *
 * @fires {{ index: number, total: number }} change - Fired each time the displayed frame changes
 *
 * @cssprop [--uibit-360-viewer-bg=#f9fafb] - Background color of the viewer container
 * @cssprop [--uibit-360-viewer-border=#e5e7eb] - Border color of the viewer container
 * @cssprop [--uibit-360-viewer-button-bg=rgba(255,255,255,0.75)] - Background of control buttons
 * @cssprop [--uibit-360-viewer-button-bg-hover=rgba(255,255,255,0.95)] - Hover background of control buttons
 * @cssprop [--uibit-360-viewer-button-color=#374151] - Icon/text color of control buttons
 * @cssprop [--uibit-360-viewer-focus-color=#000000] - Focus outline color for interactive elements
 * @cssprop [--uibit-360-viewer-progress-track-bg=rgba(0,0,0,0.08)] - Background of the progress bar track
 * @cssprop [--uibit-360-viewer-hint-bg=rgba(17,24,39,0.65)] - Background of the drag hint overlay
 */
@customElement('uibit-360-viewer')
export class Viewer360 extends UIBitElement {
  static styles = styles;

  @state() private images: string[] = [];
  /** Automatically rotate through frames when no user interaction is occurring. */
  @property({ type: Boolean }) autoRotate = false;
  /** Milliseconds between frames during auto-rotation. Lower values spin faster. */
  @property({ type: Number }) rotationSpeed = 150;
  /** Horizontal pixel distance a drag must travel before advancing one frame. */
  @property({ type: Number }) dragSensitivity = 15;
  /** Show the play/pause and directional control buttons. */
  @property({ type: Boolean }) showControls = true;
  /** Show the frame progress bar at the bottom of the viewer. */
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
      img.src = this.images[idx]!;
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
    this.dispatchCustomEvent('change', {
      index: this.currentIndex,
      image: this.images[this.currentIndex]
    });
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

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements({ flatten: true }).filter(el => el.tagName === 'IMG') as HTMLImageElement[];
    if (elements.length > 0) {
      this.images = elements.map(el => el.getAttribute('src') || el.src || '');
      this.currentIndex = 0;
      this.preloadAllImages();
    }
  }

  render() {
    const image = this.images[this.currentIndex];
    const progressPercent = this.images.length > 0 
      ? ((this.currentIndex + 1) / this.images.length) * 100 
      : 0;

    return html`
      <slot @slotchange=${this.handleSlotChange} style="display: none;"></slot>
      <div 
        part="viewer"
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
                part="image"
                src="${image}" 
                alt="360 view frame ${this.currentIndex + 1} of ${this.images.length}" 
              />
            ` 
          : html`<p style="padding: 24px; text-align: center; color: var(--uibit-360-viewer-button-color);">No images provided</p>`
        }

        ${this.images.length > 0 && !this.isDragging ? html`
          <slot name="hint">
            <div part="drag-hint" class="drag-hint">
              ${getIcon('move', 16)}
              Drag to rotate
            </div>
          </slot>
        ` : ''}

        ${this.showControls && this.images.length > 0 ? html`
          <slot name="prev" @click=${(e: Event) => {
            e.stopPropagation();
            this.stopAutoRotate();
            this.clearResumeTimer();
            this.prev();
            this.scheduleAutoRotateResume();
          }}>
            <button
              part="nav-button nav-button-prev"
              class="nav-button nav-button-prev"
              aria-label="Rotate left"
            >
              ${getIcon('chevron-left', 20)}
            </button>
          </slot>
          <slot name="next" @click=${(e: Event) => {
            e.stopPropagation();
            this.stopAutoRotate();
            this.clearResumeTimer();
            this.next();
            this.scheduleAutoRotateResume();
          }}>
            <button
              part="nav-button nav-button-next"
              class="nav-button nav-button-next"
              aria-label="Rotate right"
            >
              ${getIcon('chevron-right', 20)}
            </button>
          </slot>
        ` : ''}

        ${this.showProgressBar && this.images.length > 0 ? html`
          <div part="progress-track" class="progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="${this.images.length}" aria-valuenow="${this.currentIndex + 1}">
            <div part="progress-bar" class="progress-bar" style="width: ${progressPercent}%"></div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

export default Viewer360;
