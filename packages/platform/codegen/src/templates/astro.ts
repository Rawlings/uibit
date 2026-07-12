import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports, sanitizeEventType } from '../core/utils.js';

export const astroPlugin = {
  name: 'astro',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function renderAstroImports(name: string, referencedTypes: string[], importPath: string): string {
  return [
    `import type { ${name} as HTMLElementClass } from '${importPath}';`,
    `import '${importPath}';`,
    generateTypeImports(referencedTypes, importPath)
  ].filter(Boolean).join('\n');
}

function renderAstroGlobalDeclaration(component: ComponentMetadata): string {
  const { tagName, properties, attributes, events = [] } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);

  const propTypes = Array.from(propMap.entries()).map(([propName, propType]) => {
    return `      ${propName}?: ${propType};`;
  }).join('\n');

  const eventTypes = events.map(e => {
    const detailType = e.type?.text ? `CustomEvent<${sanitizeEventType(e.type.text)}>` : `Event`;
    return `      "on:${e.name}"?: (event: ${detailType}) => void;`;
  }).join('\n');

  return `declare global {
  namespace astroHTML.JSX {
    interface IntrinsicElements {
      '${tagName}': Partial<HTMLElementClass> & astroHTML.JSX.HTMLAttributes & {
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
    .append(renderAstroImports(component.name, component.referencedTypes, importPath))
    .append(renderAstroGlobalDeclaration(component))
    .toString();
}
