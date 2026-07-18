import type Viewer360 from './360-viewer';

export interface Hotspot360 {
  id: string;
  x: number;
  y: number;
  label?: string;
}

export interface Viewer360Config {
  images: string[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  allowZoom?: boolean;
  zoomLevel?: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-360-viewer': Viewer360;
  }
}
