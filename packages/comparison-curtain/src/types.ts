export type ComparisonMode = 'horizontal' | 'vertical' | 'diagonal' | 'radial';

export interface ComparisonCurtainConfig {
  mode?: ComparisonMode;
  progress?: number;
  interactive?: boolean;
  hoverReveal?: boolean;
}
