import type ConsentGuardClass from './consent-guard';

export interface ConsentGuardConfig {
  title?: string;
  description?: string;
  placeholderImage?: string;
  src?: string;
  contentType?: 'iframe' | 'script';
  autoHeight?: boolean;
  height?: number | string;
  acceptLabel?: string;
  declineLabel?: string;
}

export interface ConsentGuard {
  title: string;
  description: string;
  placeholderImage?: string;
  src?: string;
  contentType: 'iframe' | 'script';
  autoHeight: boolean;
  height: number | string;
  acceptLabel: string;
  declineLabel: string;
  isConsentGiven: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-consent-guard': ConsentGuardClass;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-consent-guard': ConsentGuardClass;
    }
  }
}
