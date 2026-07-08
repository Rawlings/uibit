export interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  content?: string;
  link?: string;
}

export interface HotspotConfig {
  hotspots?: Hotspot[];
  interactive?: boolean;
  showLabels?: boolean;
}
