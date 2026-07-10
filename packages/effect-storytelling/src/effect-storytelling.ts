import { html } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { property, query, state } from 'lit/decorators.js';
import { styles } from './styles';
import type { StoryMode, TrackAlignment, TimelineScope } from './types';

/**
 * A scroll-driven storytelling layout orchestrator. Establishes a sticky visual
 * stage synchronized with a scrollable narrative track using native CSS Scroll-driven
 * Animations (view-timeline) for ultra-performant, 0-latency animations.
 *
 * @slot stage - The sticky visual area. Locks to the viewport while scrolling through the track.
 * @slot track - The scrollable narrative content.
 * @slot overlay - A passive z-indexed layer above the stage.
 */
@customElement('uibit-effect-storytelling')
export class EffectStorytelling extends UIBitElement {
  static styles = styles;

  @property({ type: String }) mode: StoryMode = 'sequence-fade';

  @property({ type: String }) trackAlignment: TrackAlignment = 'right';

  @property({ type: String }) timelineScope: TimelineScope = 'viewport';

  @property({ type: Boolean }) snapPoints = false;

  @property({ type: Boolean, attribute: 'navigation' }) navigation = false;

  @query('slot[name="track"]') private _trackSlot!: HTMLSlotElement;
  @query('slot[name="stage"]') private _stageSlot!: HTMLSlotElement;

  @state() private _stepCount = 0;
  @state() private _activeStep = 0;

  private _trackSteps: Element[] = [];
  private _stageChildren: HTMLElement[] = [];
  private _stepObserver: IntersectionObserver | null = null;

  scrollToStep(index: number) {
    const step = this._trackSteps[index];
    if (!step) return;
    step.scrollIntoView({ behavior: 'smooth', block: 'center' });
    this._activeStep = index;
  }

  firstUpdated() {
    this._trackSlot?.addEventListener('slotchange', () => this._onTrackSlotChange());
    this._stageSlot?.addEventListener('slotchange', () => this._onStageSlotChange());
    this._onTrackSlotChange();
    this._onStageSlotChange();
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('mode') || changedProperties.has('snapPoints')) {
      this._updateTimelines();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stepObserver?.disconnect();
  }

  private _onTrackSlotChange() {
    this._trackSteps = this._collectTrackSteps();
    this._stepCount = this._trackSteps.length;
    this._updateTimelines();
    this._setupIntersectionObserver();
  }

  private _onStageSlotChange() {
    this._stageChildren = this._collectStageChildren();
    this._updateTimelines();
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

  private _updateTimelines() {
    // 1. Assign view-timeline to each track step
    this._trackSteps.forEach((step, idx) => {
      const htmlEl = step as HTMLElement;
      htmlEl.style.setProperty('view-timeline', `--story-step-${idx} block`);
      if (this.snapPoints) {
        htmlEl.style.scrollSnapAlign = 'start';
      } else {
        htmlEl.style.scrollSnapAlign = '';
      }
    });

    // 2. Set timeline-scope on the host
    const scopes = this._trackSteps.map((_, idx) => `--story-step-${idx}`).join(', ');
    if (scopes) {
      this.style.setProperty('timeline-scope', scopes);
    }

    // 3. Link stage children animations to the timelines
    const animationName = `uibit-story-mode-${this.mode}`;
    this._stageChildren.forEach((el, idx) => {
      el.style.position = 'absolute';
      el.style.inset = '0';
      el.style.width = '100%';
      el.style.height = '100%';
      el.style.setProperty('animation-name', animationName);
      el.style.setProperty('animation-timeline', `--story-step-${idx}`);
      el.style.setProperty('animation-fill-mode', 'both');
      el.style.setProperty('animation-timing-function', 'linear');

      // Stagger or clip rules for reveal-wipe
      if (this.mode === 'reveal-wipe' && idx > 0) {
        el.style.setProperty('animation-name', 'uibit-story-mode-reveal-wipe');
      }
    });
  }

  // Use simple IntersectionObserver solely to update active step class in HUD navigation
  private _setupIntersectionObserver() {
    this._stepObserver?.disconnect();
    if (!this._trackSteps.length) return;

    this._stepObserver = new IntersectionObserver(
      () => {
        let bestIdx = this._activeStep;
        let bestDist = Infinity;
        const viewCenter = window.innerHeight * 0.5;

        this._trackSteps.forEach((step, idx) => {
          const rect = step.getBoundingClientRect();
          const elCenter = rect.top + rect.height * 0.5;
          const dist = Math.abs(elCenter - viewCenter);
          if (dist < bestDist && rect.top < window.innerHeight && rect.bottom > 0) {
            bestDist = dist;
            bestIdx = idx;
          }
        });

        if (bestIdx !== this._activeStep) {
          this._activeStep = bestIdx;
          this.dispatchCustomEvent('story-step', { step: this._activeStep, total: this._stepCount });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );

    this._trackSteps.forEach(step => this._stepObserver!.observe(step));
  }

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

export default EffectStorytelling;
