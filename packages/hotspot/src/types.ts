import type Hotspot from './hotspot';

export interface HotspotItem {
  id: string;
  x: string | number;
  y: string | number;
  label: string;
  title?: string;
  content?: string;
  link?: string;
}

export interface HotspotConfig {
  hotspots?: HotspotItem[];
  interactive?: boolean;
  showLabels?: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-hotspot': Hotspot;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-hotspot': Hotspot;
    }
  }
}
