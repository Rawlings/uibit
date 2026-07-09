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
  velocity: string; // e.g. "600ms", "2.5s", etc.
  randomize: boolean;
}

export type BehaviorFn = (ctx: BehaviorContext) => void;
