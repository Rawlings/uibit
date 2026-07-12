import type Countdown from './countdown';

export interface CountdownConfig {
  target?: string | Date;
  duration?: number;
  autoStart?: boolean;
  format?: string;
  timezone?: string;
}

export interface CountdownTickEvent extends CustomEvent {
  detail: {
    remaining: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

declare global {
interface HTMLElementTagNameMap {
    'uibit-countdown': Countdown;
}
}