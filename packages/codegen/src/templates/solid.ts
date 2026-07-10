import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports } from '../core/utils.js';

export const solidPlugin = {
  name: 'solid',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function renderSolidImports(name: string, referencedTypes: string[]): string {
  return [
    `import type { JSX } from 'solid-js';`,
    `import type { ${name} as HTMLElementClass } from '../../index.js';`,
    `import '../../index.js';`,
    generateTypeImports(referencedTypes)
  ].filter(Boolean).join('\n');
}

function renderSolidModuleDeclaration(component: ComponentMetadata): string {
  const { tagName, properties, attributes, events } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);
  
  const propTypes = Array.from(propMap.entries())
    .map(([propName, propType]) => `      ${propName}?: ${propType};`)
    .join('\n');

  const eventTypes = events
    .map(e => `      "on:${e.name}"?: (event: CustomEvent) => void;`)
    .join('\n');

  return `declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      '${tagName}': Partial<HTMLElementClass> & JSX.HTMLAttributes<HTMLElementClass> & {
${propTypes}
${eventTypes}
      };
    }
  }
}`;
}

function buildDTS(component: ComponentMetadata): string {
  return new SourceBuilder()
    .append(renderSolidImports(component.name, component.referencedTypes))
    .append(renderSolidModuleDeclaration(component))
    .toString();
}
