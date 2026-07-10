import { html } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { property, query } from 'lit/decorators.js';
import { styles } from './styles';
import type { StoryMode, TrackAlignment, TimelineScope } from './types';

/**
 * A scroll-driven storytelling layout orchestrator. Establishes a sticky visual
 * stage synchronized with a scrollable narrative track and broadcasts real-time
 * scroll state as CSS custom properties, enabling fully composable animations
 * without external dependencies.
 *
 * @fires { progress: number, step: number } story-progress - Emitted on each scroll tick with current progress (0–1) and active step index.
 * @fires { step: number, total: number } story-step - Emitted when the active narrative step changes.
 *
 * @slot stage - The sticky visual area. Locks to the viewport while scrolling through the track.
 *   Direct children or elements with `[data-step]` are treated as discrete visual layers
 *   managed by the active `mode`.
 * @slot track - The scrollable narrative content. Its scroll depth drives the animation timeline.
 *   Mark individual sections with `class="step"` or `[data-step]` for step-based tracking.
 * @slot overlay - A passive z-indexed layer above the stage. Use for progress indicators,
 *   chapter labels, or back-to-top controls.
 *
 * @csspart outer - The root flex/block container.
 * @csspart stage-wrapper - The sticky stage container.
 * @csspart stage-inner - Inner stage container.
 * @csspart overlay-wrapper - The overlay slot container.
 * @csspart track-wrapper - The scrollable narrative container.
 *
 * @cssprop [--uibit-effect-storytelling-stage-height=100vh] - Height of the sticky stage.
 * @cssprop [--uibit-effect-storytelling-gap=0rem] - Gap between stage and track in side-by-side layouts.
 * @cssprop [--uibit-effect-storytelling-transition=0.45s cubic-bezier(0.4,0,0.2,1)] - Transition for built-in mode animations.
 * @cssprop [--uibit-effect-storytelling-step-threshold=0.5] - IntersectionObserver threshold (0–1) for step activation.
 */
@customElement('uibit-effect-storytelling')
export class EffectStorytelling extends UIBitElement {
  static styles = styles;

  /**
   * Built-in animation mode applied to stage children on scroll.
   * - `sequence-fade`: steps fade in/out as the active track step changes (default).
   * - `reveal-wipe`: second stage child wipes over the first, driven by raw scroll progress.
   * - `layer-depth`: steps recede in 3D as focus shifts to the active step.
   * - `zoom-focus`: steps scale and blur relative to their distance from the active scroll position.
   */
  @property({ type: String }) mode: StoryMode = 'sequence-fade';

  /**
   * Spatial layout of the track relative to the stage.
   * - `right`: track on right, stage on left (default, Apple-style).
   * - `left`: track on left, stage on right.
   * - `center`: stage full-width, track centered narrow column overlaid.
   * - `overlap`: stage full-width, track freely overlaid.
   */
  @property({ type: String }) trackAlignment: TrackAlignment = 'right';

  /**
   * Whether the scroll progress is tracked against the viewport or a local
   * overflow container. Currently informational for user CSS; internal tracking
   * always uses the nearest scroll ancestor.
   */
  @property({ type: String }) timelineScope: TimelineScope = 'viewport';

  /**
   * When true, applies `scroll-snap-align: start` to narrative step elements
   * inside the track slot.
   */
  @property({ type: Boolean }) snapPoints = false;

  /**
   * When true, renders interactive dot navigation indicators on the stage.
   */
  @property({ type: Boolean, attribute: 'navigation' }) navigation = false;

  @query('slot[name="track"]') private _trackSlot!: HTMLSlotElement;
  @query('slot[name="stage"]') private _stageSlot!: HTMLSlotElement;

  private _stepObserver: IntersectionObserver | null = null;
  private _trackSteps: Element[] = [];
  // Cache so we don't traverse the DOM on every scroll frame.
  private _stageChildren: HTMLElement[] = [];
  // Set of indices that are currently intersecting the viewport.
  private _intersectingSteps = new Set<number>();
  private _activeStep = 0;
  private _stepCount = 0;
  private _rafId: number | null = null;
  private _lastProgress = -1;

  /**
   * Smoothly scrolls the viewport to align the step element at the given index.
   */
  scrollToStep(index: number) {
    const step = this._trackSteps[index];
    if (!step) return;
    step.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  firstUpdated() {
    this._trackSlot?.addEventListener('slotchange', () => this._onTrackSlotChange());
    this._stageSlot?.addEventListener('slotchange', () => this._onStageSlotChange());
    this._onTrackSlotChange();
    this._onStageSlotChange();
    this._syncStageHeight();
    this._setupScrollTracking();
    requestAnimationFrame(() => this._tick());
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('mode')) {
      this._stageChildren = this._collectStageChildren();
      this._initStageChildren();
      this._applyModeEffect(Math.max(0, this._lastProgress), this._activeStep);
    }
    if (changedProperties.has('snapPoints')) {
      this._syncSnapPoints();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stepObserver?.disconnect();
    if (this._rafId !== null) cancelAnimationFrame(this._rafId);
  }

  // ── Scroll tracking ─────────────────────────────────────────────────────────

  private _setupScrollTracking() {
    const schedule = () => {
      if (this._rafId !== null) return;
      this._rafId = requestAnimationFrame(() => {
        this._rafId = null;
        this._tick();
      });
    };
    this.listen(window, 'scroll', schedule, { passive: true });
    this.listen(window, 'resize', () => {
      this._syncStageHeight();
      schedule();
    }, { passive: true });
  }

  private _tick() {
    const progress = this._computeProgress();
    // Allow small updates so continuous transforms work smoothly
    if (Math.abs(progress - this._lastProgress) < 0.0001) return;
    this._lastProgress = progress;
    this._broadcastCssVars(progress);
    this._applyModeEffect(progress, this._activeStep);
    this.dispatchCustomEvent('story-progress', { progress, step: this._activeStep });
  }

  /**
   * Returns 0–1 representing how far the component has scrolled through.
   * 0 = component top at viewport top. 1 = component bottom at viewport bottom.
   */
  private _computeProgress(): number {
    const rect = this.getBoundingClientRect();
    const viewH = window.innerHeight;
    const scrollable = rect.height - viewH;
    if (scrollable <= 0) return 0;
    return Math.max(0, Math.min(1, -rect.top / scrollable));
  }

  private _broadcastCssVars(progress: number) {
    this.style.setProperty('--story-progress', progress.toFixed(5));
    this.style.setProperty('--story-step-active', String(this._activeStep));
    this.style.setProperty('--story-step-count', String(this._stepCount));

    const viewH = window.innerHeight;
    this._trackSteps.forEach((step, i) => {
      const rect = step.getBoundingClientRect();
      const range = viewH + rect.height;
      const stepProg = range > 0 ? Math.max(0, Math.min(1, (viewH - rect.top) / range)) : 0;
      this.style.setProperty(`--story-step-progress-${i}`, stepProg.toFixed(5));
      if (i === this._activeStep) {
        this.style.setProperty('--story-step-active-progress', stepProg.toFixed(5));
      }
    });
  }

  private _syncStageHeight() {
    const val = this.getCssPropertyValue('--uibit-effect-storytelling-stage-height') || '100vh';
    this.style.setProperty('--story-stage-height', val);
  }

  // ── Track slot ──────────────────────────────────────────────────────────────

  private _onTrackSlotChange() {
    this._stepObserver?.disconnect();
    this._intersectingSteps.clear();
    this._trackSteps = this._collectTrackSteps();
    this._stepCount = this._trackSteps.length;
    this.style.setProperty('--story-step-count', String(this._stepCount));
    this._setupStepObserver();
    this._syncSnapPoints();
  }

  private _collectTrackSteps(): Element[] {
    const assigned = this._trackSlot?.assignedElements() ?? [];
    const steps: Element[] = [];
    for (const el of assigned) {
      const marked = el.querySelectorAll('[data-step], .step');
      if (marked.length) {
        marked.forEach(s => steps.push(s));
      } else {
        steps.push(el);
      }
    }
    return steps;
  }

  private _setupStepObserver() {
    if (!this._trackSteps.length) return;
    const raw = this.getCssPropertyValue('--uibit-effect-storytelling-step-threshold');
    const threshold = parseFloat(raw) || 0.5;
    this._stepObserver = new IntersectionObserver(
      (entries) => this._onStepIntersect(entries),
      { threshold }
    );
    this._trackSteps.forEach(step => this._stepObserver!.observe(step));
  }

  private _onStepIntersect(entries: IntersectionObserverEntry[]) {
    // Update the set of currently-intersecting step indices.
    for (const entry of entries) {
      const idx = this._trackSteps.indexOf(entry.target);
      if (idx === -1) continue;
      if (entry.isIntersecting) {
        this._intersectingSteps.add(idx);
      } else {
        this._intersectingSteps.delete(idx);
      }
    }

    if (this._intersectingSteps.size === 0) return;

    // Among all currently-visible steps, pick the one closest to the
    // viewport center — most semantically "active" for the reader.
    let best = this._activeStep;
    let bestDist = Infinity;
    const viewCenter = window.innerHeight * 0.5;
    this._intersectingSteps.forEach(idx => {
      const el = this._trackSteps[idx] as HTMLElement;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height * 0.5;
      const dist = Math.abs(elCenter - viewCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = idx;
      }
    });

    if (best !== this._activeStep) {
      this._activeStep = best;
      this.style.setProperty('--story-step-active', String(this._activeStep));
      this._applyModeEffect(Math.max(0, this._lastProgress), this._activeStep);
      this.dispatchCustomEvent('story-step', { step: this._activeStep, total: this._stepCount });
      this.requestUpdate();
    }
  }

  private _syncSnapPoints() {
    const assigned = this._trackSlot?.assignedElements() ?? [];
    for (const host of assigned) {
      const marked = host.querySelectorAll('[data-step], .step') as NodeListOf<HTMLElement>;
      const targets = marked.length ? Array.from(marked) : [host as HTMLElement];
      targets.forEach(el => {
        el.style.scrollSnapAlign = this.snapPoints ? 'start' : '';
      });
    }
  }

  // ── Stage slot ──────────────────────────────────────────────────────────────

  private _onStageSlotChange() {
    this._stageChildren = this._collectStageChildren();
    this._initStageChildren();
    if (this._lastProgress >= 0) {
      this._applyModeEffect(this._lastProgress, this._activeStep);
    }
  }

  private _collectStageChildren(): HTMLElement[] {
    const assigned = this._stageSlot?.assignedElements() ?? [];
    const children: HTMLElement[] = [];
    for (const el of assigned) {
      const marked = el.querySelectorAll('[data-step]') as NodeListOf<HTMLElement>;
      if (marked.length) {
        marked.forEach(s => children.push(s));
      } else {
        children.push(el as HTMLElement);
      }
    }
    return children;
  }

  private _initStageChildren() {
    const children = this._stageChildren;
    const isStepMode = this.mode === 'sequence-fade' || this.mode === 'layer-depth';
    const transition = this.getCssPropertyValue('--uibit-effect-storytelling-transition')
      || '0.45s cubic-bezier(0.4, 0, 0.2, 1)';

    children.forEach((el, i) => {
      el.style.position = 'absolute';
      el.style.inset = '0';
      el.style.width = '100%';
      el.style.height = '100%';
      el.style.willChange = 'opacity, transform, filter, clip-path';
      el.style.transition = isStepMode
        ? `opacity ${transition}, transform ${transition}, filter ${transition}`
        : 'none';
      // reveal-wipe: both layers fully opaque; second one starts fully clipped.
      if (this.mode === 'reveal-wipe') {
        el.style.opacity = '1';
        el.style.clipPath = i === 1 ? 'inset(0 100% 0 0)' : '';
        el.style.transform = '';
        el.style.filter = '';
      } else {
        // Step-based modes: show only first child initially.
        el.style.opacity = i === 0 ? '1' : '0';
        el.style.clipPath = '';
        el.style.transform = '';
        el.style.filter = '';
      }
      el.removeAttribute('data-story-active');
    });

    // 3D perspective for layer-depth.
    const inner = this.shadowRoot?.querySelector('.stage-inner') as HTMLElement | null;
    if (inner) {
      inner.style.perspective = this.mode === 'layer-depth' ? '1200px' : '';
    }
  }

  // ── Mode effects ────────────────────────────────────────────────────────────

  private _applyModeEffect(progress: number, activeStep: number) {
    const children = this._stageChildren;
    if (!children.length) return;
    switch (this.mode) {
      case 'sequence-fade': this._modeSequenceFade(children, activeStep); break;
      case 'reveal-wipe':   this._modeRevealWipe(children, progress);     break;
      case 'layer-depth':   this._modeLayerDepth(children, activeStep);   break;
      case 'zoom-focus':    this._modeZoomFocus(children, progress);      break;
    }
  }

  private _modeSequenceFade(children: HTMLElement[], activeStep: number) {
    children.forEach((el, i) => {
      const isActive = i === activeStep;
      el.style.opacity = isActive ? '1' : '0';
      el.style.transform = isActive
        ? 'translateY(0) scale(1)'
        : i < activeStep
          ? 'translateY(-1rem) scale(0.98)'
          : 'translateY(1rem) scale(0.98)';
      el.style.filter = '';
      el.style.pointerEvents = isActive ? '' : 'none';
      el.toggleAttribute('data-story-active', isActive);
    });
  }

  private _modeRevealWipe(children: HTMLElement[], progress: number) {
    children.forEach((el, i) => {
      el.style.transform = '';
      el.style.filter = '';
      if (i === 0) {
        el.style.opacity = '1';
        el.style.clipPath = '';
        el.style.pointerEvents = '';
        el.toggleAttribute('data-story-active', true);
      } else if (i === 1) {
        const pct = (progress * 100).toFixed(3);
        el.style.opacity = '1';
        el.style.clipPath = `inset(0 ${(100 - parseFloat(pct)).toFixed(3)}% 0 0)`;
        el.style.pointerEvents = progress > 0.05 ? '' : 'none';
        el.toggleAttribute('data-story-active', progress > 0.5);
      } else {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.removeAttribute('data-story-active');
      }
    });
  }

  private _modeLayerDepth(children: HTMLElement[], activeStep: number) {
    children.forEach((el, i) => {
      const dist = i - activeStep;
      // All inactive elements recede into the screen (negative Z only).
      const tz = -Math.abs(dist) * 120;
      const scale = Math.max(0.82, 1 - Math.abs(dist) * 0.06);
      const opacity = Math.max(0, 1 - Math.abs(dist) * 0.55);
      const blur = Math.abs(dist) > 0.5 ? Math.abs(dist) * 2 : 0;
      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translateZ(${tz}px) scale(${scale.toFixed(3)})`;
      el.style.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : '';
      el.style.pointerEvents = i === activeStep ? '' : 'none';
      el.toggleAttribute('data-story-active', i === activeStep);
    });
  }

  private _modeZoomFocus(children: HTMLElement[], progress: number) {
    const count = children.length;
    if (!count) return;
    const focalPoint = progress * (count - 1);
    children.forEach((el, i) => {
      const dist = Math.abs(i - focalPoint);
      const opacity = Math.max(0.05, 1 - dist * 0.65);
      const scale = 1 + Math.max(0, 0.6 - dist) * 0.12;
      const blur = Math.max(0, dist - 0.4) * 7;
      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `scale(${scale.toFixed(4)})`;
      el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : '';
      el.style.pointerEvents = dist < 0.5 ? '' : 'none';
      el.toggleAttribute('data-story-active', dist < 0.5);
    });
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  render() {
    return html`
      <div class="outer" part="outer">
        <div class="stage-wrapper" part="stage-wrapper">
          <div class="stage-inner" part="stage-inner">
            <slot name="stage"></slot>
          </div>
          ${this.navigation ? html`
            <div class="nav-dots" part="nav-dots">
              ${Array.from({ length: this._stepCount }).map((_, i) => html`
                <button
                  class="nav-dot ${i === this._activeStep ? 'active' : ''}"
                  part="nav-dot ${i === this._activeStep ? 'nav-dot-active' : ''}"
                  @click=${() => this.scrollToStep(i)}
                  aria-label="Go to step ${i + 1}"
                ></button>
              `)}
            </div>
          ` : ''}
          <div class="overlay-wrapper" part="overlay-wrapper">
            <slot name="overlay"></slot>
          </div>
        </div>
        <div class="track-wrapper" part="track-wrapper">
          <slot name="track"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-effect-storytelling': EffectStorytelling;
  }
}

export default EffectStorytelling;
