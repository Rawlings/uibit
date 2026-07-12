export type ComparisonMode = 'horizontal' | 'vertical' | 'diagonal' | 'radial';

export interface ImageComparisonConfig {
  mode?: ComparisonMode;
  progress?: number;
  interactive?: boolean;
  hoverReveal?: boolean;
}
