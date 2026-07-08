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
