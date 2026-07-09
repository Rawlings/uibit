import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Move,
  Eraser,
  RotateCcw,
  Frown,
  Meh,
  Smile,
  Laugh,
  Angry,
  Clock,
  type IconNode,
} from 'lucide';

export type IconDefinition = string | ((size: number) => string);

const registry = new Map<string, IconDefinition>();

function iconNodeToSvg(node: IconNode, size: number): string {
  const children = node
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${attrStr}/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${children}</svg>`;
}

function fromLucide(node: IconNode): IconDefinition {
  return (size: number) => iconNodeToSvg(node, size);
}

const defaults: Record<string, IconDefinition> = {
  'chevron-left': fromLucide(ChevronLeft),
  'chevron-right': fromLucide(ChevronRight),
  'x': fromLucide(X),
  'plus': fromLucide(Plus),
  'move': fromLucide(Move),
  'eraser': fromLucide(Eraser),
  'rotate-ccw': fromLucide(RotateCcw),
  'angry': fromLucide(Angry),
  'frown': fromLucide(Frown),
  'meh': fromLucide(Meh),
  'smile': fromLucide(Smile),
  'laugh': fromLucide(Laugh),
  'clock': fromLucide(Clock),
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
