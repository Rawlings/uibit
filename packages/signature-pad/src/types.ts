import type SignaturePad from './signature-pad';

export interface SignaturePoint {
  x: number;
  y: number;
  pressure: number;
  timestamp: number;
}

export interface SignatureStroke {
  points: SignaturePoint[];
}

export interface SignatureChangeDetail {
  isEmpty: boolean;
  dataUrl: string;
}

export interface SignatureClearDetail {
  previouslyEmpty: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-signature-pad': SignaturePad;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-signature-pad': SignaturePad;
    }
  }
}
