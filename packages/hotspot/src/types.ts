export interface HotspotItem {
  id: string;
  x: number;
  y: number;
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
    'uibit-hotspot': import('./hotspot').Hotspot;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-hotspot': import('./hotspot').Hotspot;
    }
  }
}
