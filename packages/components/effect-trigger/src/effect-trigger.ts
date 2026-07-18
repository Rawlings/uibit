import { html } from 'lit';
import { customElement, UIBitElement, ViewportController } from '@uibit/core';
import { property } from 'lit/decorators.js';
import { styles } from './styles';
import type {
  EffectTriggerType,
  EffectBehaviorType,
  BehaviorFn,
} from './types';

let globalContainer: HTMLElement | null = null;

function getGlobalContainer(): HTMLElement {
  if (typeof document === 'undefined') return {} as HTMLElement;
  if (!globalContainer) {
    globalContainer = document.createElement('div');
    globalContainer.id = 'uibit-effect-trigger-container';
    globalContainer.style.cssText =
      'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 999999; overflow: visible;';
    document.body.appendChild(globalContainer);
  }
  return globalContainer;
}

/**
 * Trigger visual effects like particles or vortex attractions.

 * @summary A viewport scroll, hover, or click reactive trigger for visual micro-animations.
 *
 * @fires {{ particle: HTMLElement, index: number, trigger: string }} uibit-particle-create - Fired when a particle is created
 
 * @cssstate triggered - Active when the micro-animation is currently running.*/
@customElement('uibit-effect-trigger')
export class EffectTrigger extends UIBitElement {
  static styles = styles;

  /** Registry of custom behaviors */
  private static _customBehaviors: Map<string, BehaviorFn> = new Map();

  /**
   * Register a custom behavior that content authors can use by setting the behavior attribute.
   */
  static registerBehavior(name: string, fn: BehaviorFn) {
    EffectTrigger._customBehaviors.set(name, fn);
  }

  /**
   * Get all registered custom behaviors.
   */
  static getRegisteredBehaviors(): Map<string, BehaviorFn> {
    return EffectTrigger._customBehaviors;
  }

  /** The trigger action to listen for */
  @property({ type: String }) trigger: EffectTriggerType = 'click';

  /** The movement behavior/vector path to execute */
  @property({ type: String }) behavior: EffectBehaviorType = 'float-displace';

  /** Number of dynamic asset clones generated for particle-based behaviors */
  @property({ type: Number }) density = 1;

  /** Duration/velocity bound of the movement (e.g. "600ms", "2.5s") */
  @property({ type: String }) velocity = '1s';

  /** Applies real-time visual variations (scale, drift, rotation) to each clone */
  @property({ type: Boolean }) randomize = false;

  /** Stagger delay between spawning each particle (e.g., "50ms", "0.1s") */
  @property({ type: String }) stagger = '0ms';

  /** Min,Max range scale bounds for randomization (e.g., "0.5,1.5") */
  @property({ type: String, attribute: 'scale-range' }) scaleRange = '0.5,1.5';

  /** Min,Max range rotation degrees for randomization (e.g., "-180,180") */
  @property({ type: String, attribute: 'rotation-range' }) rotationRange =
    '-180,180';

  /** Custom keyframe definition in JSON string format to override behavior */
  @property({ type: String }) keyframes?: string;

  /** CSS selector of an external element to bind trigger events to */
  @property({ type: String, attribute: 'target-selector' })
  targetSelector?: string;

  /** CSS selector of a destination element to animate particles towards */
  @property({ type: String, attribute: 'destination-selector' })
  destinationSelector?: string;

  private _viewport?: ViewportController;
  private _hasIntersections = false;
  private _boundEventsCleanups: Array<() => void> = [];

  connectedCallback() {
    super.connectedCallback();
    this._setupListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupObserver();
    this._cleanupBoundEvents();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (
      changedProperties.has('trigger') ||
      changedProperties.has('targetSelector')
    ) {
      this._setupListeners();
    }
  }

  private _cleanupObserver() {
    if (this._viewport) {
      this.removeController(this._viewport);
      this._viewport.unobserve();
      this._viewport = undefined;
    }
  }

  private _cleanupBoundEvents() {
    this._boundEventsCleanups.forEach((cleanup) => {
      cleanup();
    });
    this._boundEventsCleanups = [];
  }

  private _getTriggerElement(): HTMLElement {
    if (this.targetSelector) {
      const el = document.querySelector(this.targetSelector);
      if (el) return el as HTMLElement;
    }

    const triggerSlot = this.shadowRoot?.querySelector(
      'slot[name="trigger"]',
    ) as HTMLSlotElement;
    const assigned = triggerSlot?.assignedNodes({ flatten: true }) || [];
    const triggerEl = assigned.find(
      (node) => node.nodeType === Node.ELEMENT_NODE,
    ) as HTMLElement;
    return triggerEl || this;
  }

  private _getAssetTemplate(): HTMLElement {
    const assetSlot = this.shadowRoot?.querySelector(
      'slot[name="asset"]',
    ) as HTMLSlotElement;
    const assigned = assetSlot?.assignedNodes({ flatten: true }) || [];
    const assetEl = assigned.find(
      (node) => node.nodeType === Node.ELEMENT_NODE,
    ) as HTMLElement;

    if (assetEl) return assetEl;

    // Fallback: Default Star Icon
    const fallback = document.createElement('span');
    fallback.style.display = 'inline-block';
    fallback.style.color =
      'var(--uibit-effect-trigger-fallback-color, #000000)';
    fallback.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="display: block;">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    `;
    return fallback;
  }

  private _setupListeners() {
    this._cleanupObserver();
    this._cleanupBoundEvents();

    const triggerEl = this._getTriggerElement();
    if (!triggerEl) return;

    if (this.trigger === 'click') {
      const cleanup = this.listen(triggerEl, 'click', (e) => this.ignite(e));
      this._boundEventsCleanups.push(cleanup);
    } else if (this.trigger === 'hover') {
      const cleanup = this.listen(triggerEl, 'mouseenter', (e) =>
        this.ignite(e),
      );
      this._boundEventsCleanups.push(cleanup);
    } else if (this.trigger === 'visible') {
      this._viewport = new ViewportController(this, {
        target: triggerEl,
        threshold: 0.1,
        callback: (entry) => {
          if (entry.isIntersecting) {
            if (!this._hasIntersections) {
              this.ignite();
              this._hasIntersections = true;
            }
          } else {
            this._hasIntersections = false;
          }
        },
      });
    }
  }

  /**
   * Launch/Ignite the visual effect. Can be called programmatically.
   */
  ignite(event?: Event) {
    const triggerEl = this._getTriggerElement();
    const assetEl = this._getAssetTemplate();
    const container = getGlobalContainer();

    if (!triggerEl || !assetEl || !container) return;

    // Emit global ignition event
    this.dispatchCustomEvent('uibit-effect-ignite', {
      trigger: this.trigger,
      behavior: this.behavior,
      event,
    });

    const staggerMs = this._parseDuration(this.stagger);
    const count = this.density || 1;

    for (let i = 0; i < count; i++) {
      if (staggerMs > 0 && i > 0) {
        setTimeout(() => {
          this._spawnParticle(i, triggerEl, assetEl, container, event);
        }, staggerMs * i);
      } else {
        this._spawnParticle(i, triggerEl, assetEl, container, event);
      }
    }
  }

  private _spawnParticle(
    index: number,
    triggerEl: HTMLElement,
    assetEl: HTMLElement,
    container: HTMLElement,
    event?: Event,
  ) {
    const clone = this._createClone(assetEl);

    // Lifecycle hook: uibit-particle-create
    const cancelableEvent = new CustomEvent('uibit-particle-create', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        particle: clone,
        index,
        trigger: this.trigger,
        behavior: this.behavior,
      },
    });

    this.dispatchEvent(cancelableEvent);

    if (cancelableEvent.defaultPrevented) {
      return;
    }

    const runWithAnimation = (
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      container.appendChild(clone);
      const anim = clone.animate(keyframes, options);
      anim.onfinish = () => {
        // Lifecycle hook: uibit-particle-destroy
        this.dispatchCustomEvent('uibit-particle-destroy', {
          particle: clone,
          index,
        });
        clone.remove();
      };
    };

    // If custom inline keyframes are provided
    if (this.keyframes) {
      try {
        const parsedKeyframes = JSON.parse(this.keyframes);
        const duration = this._parseDuration(this.velocity);
        const rect = triggerEl.getBoundingClientRect();
        let startX = rect.left + rect.width / 2;
        let startY = rect.top + rect.height / 2;

        if (event instanceof MouseEvent) {
          startX = event.clientX;
          startY = event.clientY;
        }

        clone.style.left = `${startX}px`;
        clone.style.top = `${startY}px`;

        runWithAnimation(parsedKeyframes, { duration, easing: 'ease-out' });
        return;
      } catch (err) {
        console.error(
          'Failed to parse effect-trigger keyframes JSON attribute',
          err,
        );
      }
    }

    // Check custom behavior registry
    const customBehavior = EffectTrigger._customBehaviors.get(this.behavior);
    if (customBehavior) {
      customBehavior({
        triggerEl,
        assetEl: clone,
        containerEl: container,
        density: this.density,
        velocity: this.velocity,
        randomize: this.randomize,
        stagger: this.stagger,
        scaleRange: this.scaleRange,
        rotationRange: this.rotationRange,
        destinationSelector: this.destinationSelector,
      });
      return;
    }

    // Trajectory Destination Animation (Fly-to-Target)
    if (this.destinationSelector) {
      const destEl = document.querySelector(this.destinationSelector);
      if (destEl) {
        const rect = triggerEl.getBoundingClientRect();
        let clickX = rect.left + rect.width / 2;
        let clickY = rect.top + rect.height / 2;

        if (event instanceof MouseEvent) {
          clickX = event.clientX;
          clickY = event.clientY;
        }

        clone.style.left = `${clickX}px`;
        clone.style.top = `${clickY}px`;

        const destRect = destEl.getBoundingClientRect();
        const destX = destRect.left + destRect.width / 2;
        const destY = destRect.top + destRect.height / 2;

        const dx = destX - clickX;
        const dy = destY - clickY;

        const duration = this._parseDuration(this.velocity);
        const keyframes: Keyframe[] = [];
        const steps = 30;

        for (let s = 0; s <= steps; s++) {
          const pct = s / steps;
          const curX = dx * pct;
          const arcHeight = -120 * Math.sin(pct * Math.PI); // Parabolic peak upward
          const curY = dy * pct + arcHeight;

          const baseScale = this.randomize
            ? this._getRandomFromRange(this.scaleRange)
            : 1;
          const scale = baseScale * (1 - pct * 0.4);

          keyframes.push({
            transform: `translate(-50%, -50%) translate(${curX}px, ${curY}px) scale(${scale})`,
            opacity: (1 - pct * 0.2).toString(),
            offset: pct,
          });
        }

        runWithAnimation(keyframes, { duration, easing: 'ease-in-out' });
        return;
      }
    }

    // Standard pre-baked behaviors
    this._executeBakedBehavior(triggerEl, clone, container, event);
  }

  private _getRandomFromRange(rangeStr: string): number {
    const parts = rangeStr.split(',').map((p) => parseFloat(p.trim()));
    const p0 = parts[0] ?? 1;
    const p1 = parts[1] ?? 1;
    if (parts.length < 2 || Number.isNaN(p0) || Number.isNaN(p1)) return 1;
    const min = Math.min(p0, p1);
    const max = Math.max(p0, p1);
    return min + Math.random() * (max - min);
  }

  private _parseDuration(v: string): number {
    const match = v.trim().match(/^([\d.]+)(ms|s)$/);
    if (!match) return 1000;
    const value = parseFloat(match[1] || '0');
    const unit = match[2];
    return unit === 's' ? value * 1000 : value;
  }

  private _createClone(template: HTMLElement): HTMLElement {
    const clone = template.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.pointerEvents = 'none';
    clone.style.zIndex = '999999';
    return clone;
  }

  private _executeBakedBehavior(
    triggerEl: HTMLElement,
    clone: HTMLElement,
    container: HTMLElement,
    event?: Event,
  ) {
    const rect = triggerEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const duration = this._parseDuration(this.velocity);

    const runWithAnimation = (
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      container.appendChild(clone);
      const anim = clone.animate(keyframes, options);
      anim.onfinish = () => {
        this.dispatchCustomEvent('uibit-particle-destroy', {
          particle: clone,
        });
        clone.remove();
      };
    };

    switch (this.behavior) {
      case 'traverse-x-right':
      case 'traverse-x-left': {
        const isRight = this.behavior === 'traverse-x-right';
        clone.style.top = `${centerY}px`;
        clone.style.transform = 'translate(-50%, -50%)';

        const startX = isRight ? -100 : window.innerWidth + 100;
        const endX = isRight ? window.innerWidth + 100 : -100;

        const baseScale = this.randomize
          ? this._getRandomFromRange(this.scaleRange)
          : 1;
        const rotVal = this.randomize
          ? this._getRandomFromRange(this.rotationRange)
          : 360;

        runWithAnimation(
          [
            {
              left: `${startX}px`,
              transform: `translate(-50%, -50%) scale(${baseScale}) rotate(0deg)`,
            },
            {
              left: `${endX}px`,
              transform: `translate(-50%, -50%) scale(${baseScale}) rotate(${rotVal}deg)`,
            },
          ],
          { duration, easing: 'linear' },
        );
        break;
      }

      case 'traverse-y-up':
      case 'traverse-y-down': {
        const isUp = this.behavior === 'traverse-y-up';
        clone.style.left = `${centerX}px`;
        clone.style.transform = 'translate(-50%, -50%)';

        const startY = isUp ? window.innerHeight + 100 : -100;
        const endY = isUp ? -100 : window.innerHeight + 100;

        const baseScale = this.randomize
          ? this._getRandomFromRange(this.scaleRange)
          : 1;
        const rotVal = this.randomize
          ? this._getRandomFromRange(this.rotationRange)
          : 360;

        runWithAnimation(
          [
            {
              top: `${startY}px`,
              transform: `translate(-50%, -50%) scale(${baseScale}) rotate(0deg)`,
            },
            {
              top: `${endY}px`,
              transform: `translate(-50%, -50%) scale(${baseScale}) rotate(${rotVal}deg)`,
            },
          ],
          { duration, easing: 'linear' },
        );
        break;
      }

      case 'fountain-burst': {
        clone.style.left = `${centerX}px`;
        clone.style.top = `${centerY}px`;

        const angle = Math.PI * 1.25 + Math.random() * Math.PI * 0.5;
        const speed =
          (this.randomize ? 8 + Math.random() * 8 : 12) * (duration / 1000);
        const vx = Math.cos(angle) * speed * 25;
        const vy = Math.sin(angle) * speed * 25;

        const keyframes: Keyframe[] = [];
        const steps = 20;
        const g = 0.8;

        const rotVal = this.randomize
          ? this._getRandomFromRange(this.rotationRange)
          : 360;
        const baseScale = this.randomize
          ? this._getRandomFromRange(this.scaleRange)
          : 1;

        for (let step = 0; step <= steps; step++) {
          const pct = step / steps;
          const x = vx * pct;
          const y = vy * pct + 0.5 * g * (pct * 30) * (pct * 30);
          const opacity = pct > 0.8 ? 1 - (pct - 0.8) / 0.2 : 1;
          const scale = baseScale * (1 - pct * 0.4);

          keyframes.push({
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale}) rotate(${rotVal * pct}deg)`,
            opacity: opacity.toString(),
            offset: pct,
          });
        }

        runWithAnimation(keyframes, { duration, easing: 'ease-out' });
        break;
      }

      case 'vortex-attractor': {
        clone.style.left = `${centerX}px`;
        clone.style.top = `${centerY}px`;

        const startRadius = 150 + Math.random() * 200;
        const startAngle = Math.random() * Math.PI * 2;
        const spins = 1 + (this.randomize ? Math.random() * 2 : 1.5);
        const baseScale = this.randomize
          ? this._getRandomFromRange(this.scaleRange)
          : 1;
        const rotVal = this.randomize
          ? this._getRandomFromRange(this.rotationRange)
          : 720;

        const keyframes: Keyframe[] = [];
        const steps = 30;

        for (let step = 0; step <= steps; step++) {
          const pct = step / steps;
          const radius = startRadius * (1 - pct);
          const angle = startAngle + pct * spins * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const opacity = 1 - pct;
          const scale = baseScale * (1 - pct);

          keyframes.push({
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale}) rotate(${pct * rotVal}deg)`,
            opacity: opacity.toString(),
            offset: pct,
          });
        }

        runWithAnimation(keyframes, { duration, easing: 'ease-in-out' });
        break;
      }

      case 'ambient-drift': {
        const offsetRange = 60;
        const spawnX =
          rect.left +
          Math.random() * rect.width +
          (Math.random() - 0.5) * offsetRange;
        const spawnY = rect.bottom;

        clone.style.left = `${spawnX}px`;
        clone.style.top = `${spawnY}px`;

        const sway = 15 + Math.random() * 25;
        const riseDistance = 100 + Math.random() * 100;
        const scale = this.randomize
          ? this._getRandomFromRange(this.scaleRange)
          : 0.8;

        runWithAnimation(
          [
            {
              transform: `translate(-50%, 0) translateX(0px) scale(${scale})`,
              opacity: '0',
            },
            {
              transform: `translate(-50%, -20px) translateX(${sway / 2}px) scale(${scale})`,
              opacity: '1',
              offset: 0.2,
            },
            {
              transform: `translate(-50%, -60px) translateX(-${sway}px) scale(${scale})`,
              offset: 0.6,
            },
            {
              transform: `translate(-50%, -${riseDistance}px) translateX(${sway / 3}px) scale(${scale * 0.5})`,
              opacity: '0',
            },
          ],
          {
            duration:
              duration * (this.randomize ? 0.8 + Math.random() * 0.5 : 1),
            easing: 'ease-out',
          },
        );
        break;
      }

      case 'focal-pop': {
        clone.style.left = '50%';
        clone.style.top = '50%';

        const baseScale = this.randomize
          ? this._getRandomFromRange(this.scaleRange)
          : 1.2;

        runWithAnimation(
          [
            {
              transform: 'translate(-50%, -50%) scale(0) rotate(-15deg)',
              opacity: '0',
            },
            {
              transform: `translate(-50%, -50%) scale(${baseScale}) rotate(5deg)`,
              opacity: '1',
              offset: 0.2,
            },
            {
              transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
              opacity: '1',
              offset: 0.3,
            },
            {
              transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
              opacity: '1',
              offset: 0.8,
            },
            {
              transform: 'translate(-50%, -50%) scale(0) rotate(15deg)',
              opacity: '0',
            },
          ],
          { duration, easing: 'ease-in-out' },
        );
        break;
      }

      case 'orbit-halo': {
        const radius = Math.max(rect.width, rect.height) / 2 + 15;
        clone.style.left = `${centerX}px`;
        clone.style.top = `${centerY}px`;

        const startAngle = Math.random() * Math.PI * 2;
        const keyframes: Keyframe[] = [];
        const steps = 30;

        for (let step = 0; step <= steps; step++) {
          const pct = step / steps;
          const angle = startAngle + pct * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const opacity = pct > 0.7 ? 1 - (pct - 0.7) / 0.3 : 1;

          keyframes.push({
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${pct * 360}deg)`,
            opacity: opacity.toString(),
            offset: pct,
          });
        }

        runWithAnimation(keyframes, { duration, easing: 'ease-in-out' });
        break;
      }
      default: {
        let clickX = centerX;
        let clickY = centerY;

        if (event instanceof MouseEvent) {
          clickX = event.clientX;
          clickY = event.clientY;
        }

        clone.style.left = `${clickX}px`;
        clone.style.top = `${clickY}px`;

        const distance = 120 + (this.randomize ? Math.random() * 60 : 30);
        const sway = this.randomize
          ? this._getRandomFromRange(this.rotationRange) * 0.15
          : 0;
        const scale = this.randomize
          ? this._getRandomFromRange(this.scaleRange)
          : 1;

        runWithAnimation(
          [
            {
              transform: `translate(-50%, -50%) translateY(0px) translateX(0px) scale(${scale})`,
              opacity: '0',
            },
            {
              transform: `translate(-50%, -50%) translateY(-20px) translateX(${sway * 0.1}px) scale(${scale})`,
              opacity: '1',
              offset: 0.15,
            },
            {
              transform: `translate(-50%, -50%) translateY(-${distance}px) translateX(${sway}px) scale(${scale * 0.5})`,
              opacity: '0',
            },
          ],
          { duration, easing: 'ease-out' },
        );
        break;
      }
    }
  }

  render() {
    return html`
      <slot name="trigger"></slot>
      <slot name="asset"></slot>
    `;
  }
}

export default EffectTrigger;
