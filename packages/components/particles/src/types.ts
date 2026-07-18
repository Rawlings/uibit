export type ParticleMode =
  | 'float'
  | 'snow'
  | 'rain'
  | 'neural'
  | 'matrix'
  | 'wave'
  | 'vortex'
  | 'smoke'
  | 'bubbles'
  | 'grid'
  | 'aurora'
  | 'noise'
  | 'rings';

export type ParticleHoverEffect = 'repel' | 'attract' | 'grab' | 'none';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color?: string;
  angle?: number;
  baseSpeed?: number;
  originX?: number;
  originY?: number;
  opacity?: number;
  life?: number;
  maxLife?: number;
  angularVelocity?: number;
  orbitRadius?: number;
  amplitude?: number;
  phase?: number;
  prevX?: number;
  prevY?: number;
}

export interface NetworkPulse {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
}

export interface EffectParticlesConfig {
  count?: number;
  speed?: number;
  mode?: ParticleMode;
  connect?: boolean;
  connectDistance?: number;
  hoverEffect?: ParticleHoverEffect;
  interactiveRadius?: number;
}
