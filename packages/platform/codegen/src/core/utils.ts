import type { Property, Attribute } from './types.js';

/**
 * A helper class to construct code files with clean formatting and spacing.
 */
export class SourceBuilder {
  private blocks: string[] = [];

  /**
   * Appends a logical block of code (e.g., banner, imports, or declarations).
   */
  append(block: string): this {
    const trimmed = block.trim();
    if (trimmed) {
      this.blocks.push(trimmed);
    }
    return this;
  }

  /**
   * Joins all blocks with a double newline for excellent readability.
   */
  toString(): string {
    return this.blocks.join('\n\n') + '\n';
  }
}

/**
 * Converts a kebab-case event name (e.g., 'slide-change') to camelCase prefixed with 'on'.
 */
export function toReactEventName(eventName: string): string {
  const cleanName = eventName.replace(/[^a-zA-Z0-9-]/g, '');
  return 'on' + cleanName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Merges properties and attributes into a unique map of names and their TS types.
 */
export function mergePropertiesAndAttributes(properties: Property[], attributes: Attribute[]): Map<string, string> {
  const propMap = new Map<string, string>();
  for (const p of properties) {
    propMap.set(p.name, p.type?.text || 'any');
  }
  for (const attr of attributes) {
    const fieldName = attr.fieldName || attr.name;
    if (!propMap.has(fieldName)) {
      propMap.set(fieldName, attr.type?.text || 'string');
    }
  }
  return propMap;
}

/**
 * Generates type imports for any custom referenced types.
 */
export function generateTypeImports(referencedTypes: string[], importPath: string = '../../index.js'): string {
  if (referencedTypes.length === 0) return '';
  return `import type { ${referencedTypes.join(', ')} } from '${importPath}';`;
}

/**
 * Converts a kebab-case or snake-case string to camelCase.
 */
export function toCamelCase(str: string): string {
  return str.replace(/[-_]([a-z])/g, (g) => g[1]!.toUpperCase());
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
