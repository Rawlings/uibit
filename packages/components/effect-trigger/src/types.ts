export type EffectTriggerType = 'click' | 'hover' | 'visible' | 'custom';

export type EffectBehaviorType =
  | 'traverse-x-right'
  | 'traverse-x-left'
  | 'traverse-y-up'
  | 'traverse-y-down'
  | 'fountain-burst'
  | 'vortex-attractor'
  | 'ambient-drift'
  | 'focal-pop'
  | 'orbit-halo'
  | 'float-displace'
  | string;

export interface BehaviorContext {
  triggerEl: HTMLElement;
  assetEl: HTMLElement;
  containerEl: HTMLElement;
  density: number;
  velocity: string;
  randomize: boolean;
  stagger: string;
  scaleRange: string;
  rotationRange: string;
  destinationSelector?: string;
}

export type BehaviorFn = (ctx: BehaviorContext) => void;

import type { EffectTrigger } from './effect-trigger';

declare global {
  interface HTMLElementTagNameMap {
    'uibit-effect-trigger': EffectTrigger;
  }
}
