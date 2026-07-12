import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports, sanitizeEventType } from '../core/utils.js';

export const solidPlugin = {
  name: 'solid',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function renderSolidImports(name: string, referencedTypes: string[], importPath: string): string {
  return [
    `import type { JSX } from 'solid-js';`,
    `import type { ${name} as HTMLElementClass } from '${importPath}';`,
    `import '${importPath}';`,
    generateTypeImports(referencedTypes, importPath)
  ].filter(Boolean).join('\n');
}

function renderSolidModuleDeclaration(component: ComponentMetadata): string {
  const { tagName, properties, attributes, events = [] } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);
  
  const propTypes = Array.from(propMap.entries())
    .map(([propName, propType]) => `      ${propName}?: ${propType};`)
    .join('\n');

  const eventTypes = events
    .map(e => {
      const detailType = e.type?.text ? `CustomEvent<${sanitizeEventType(e.type.text)}>` : `Event`;
      return `      "on:${e.name}"?: (event: ${detailType}) => void;`;
    })
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
  const importPath = component.importPath || '../../index.js';
  return new SourceBuilder()
    .append(renderSolidImports(component.name, component.referencedTypes, importPath))
    .append(renderSolidModuleDeclaration(component))
    .toString();
}
