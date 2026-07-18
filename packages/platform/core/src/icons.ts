import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { type IconNode } from 'lucide';

export type IconDefinition = string | ((size: number) => string);

const registry = new Map<string, IconDefinition>();

function escapeAttrValue(value: unknown): string {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function iconNodeToSvg(node: IconNode, size: number): string {
  const children = node
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${escapeAttrValue(v)}"`)
        .join(' ');
      return `<${tag} ${attrStr}/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${children}</svg>`;
}

export function fromLucide(node: IconNode): IconDefinition {
  return (size: number) => iconNodeToSvg(node, size);
}

export function registerIcons(icons: Record<string, IconDefinition>): void {
  for (const [name, def] of Object.entries(icons)) {
    registry.set(name, def);
  }
}

export function getIcon(name: string, size = 16, fallback?: IconDefinition): ReturnType<typeof unsafeHTML> | string {
  const def = registry.get(name) ?? fallback;
  if (!def) return '';
  const svgStr = typeof def === 'function' ? def(size) : def;
  return unsafeHTML(svgStr);
}
