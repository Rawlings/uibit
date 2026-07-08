export interface ABTestConfig {
  storageKey: string;
  variantDistribution?: Record<string, number>;
  defaultVariant?: string;
}

export interface VariantRenderedEvent extends CustomEvent {
  detail: {
    variant: string;
    isNewUser: boolean;
  };
}
