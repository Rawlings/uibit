import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type IconDefinition = string | ((size: number) => string);

const registry = new Map<string, IconDefinition>();

function lucide(paths: string): IconDefinition {
  return (size: number) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

const defaults: Record<string, IconDefinition> = {
  'chevron-left': lucide('<polyline points="15 18 9 12 15 6"/>'),
  'chevron-right': lucide('<polyline points="9 18 15 12 9 6"/>'),
  'x': lucide('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
  'plus': lucide('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
  'move': lucide('<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/>'),
  'eraser': lucide('<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>'),
  'rotate-ccw': lucide('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>'),
};

/**
 * Register custom icons that override the Lucide defaults.
 * Call this once before your components mount.
 *
 * Each value is either a full SVG string or a function `(size: number) => string`.
 *
 * @example
 * // Use FontAwesome SVGs
 * registerIcons({
 *   'chevron-left': '<svg ...>...</svg>',
 *   'x': (size) => `<svg width="${size}" height="${size}" ...>...</svg>`,
 * });
 */
export function registerIcons(icons: Record<string, IconDefinition>): void {
  for (const [name, def] of Object.entries(icons)) {
    registry.set(name, def);
  }
}

/**
 * Retrieve a registered icon as a Lit template result, ready to embed in `html` templates.
 * Falls back to the built-in Lucide icon set. Returns an empty string if the name is unknown.
 */
export function getIcon(name: string, size = 16): ReturnType<typeof unsafeHTML> | string {
  const def = registry.get(name) ?? defaults[name];
  if (!def) return '';
  const svgStr = typeof def === 'function' ? def(size) : def;
  return unsafeHTML(svgStr);
}
