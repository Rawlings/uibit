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
