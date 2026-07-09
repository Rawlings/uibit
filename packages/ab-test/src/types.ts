import type ABTest from './ab-test';

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

declare global {
  interface HTMLElementTagNameMap {
    'uibit-ab-test': ABTest;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-ab-test': ABTest;
    }
  }
}
