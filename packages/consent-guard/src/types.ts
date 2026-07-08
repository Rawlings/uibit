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
