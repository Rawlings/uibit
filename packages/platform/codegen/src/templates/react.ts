import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports } from '../core/utils.js';

export const reactPlugin = {
  name: 'react',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function buildDTS(component: ComponentMetadata): string {
  const { name, tagName, properties, attributes, referencedTypes, importPath = '../../index.js' } = component;
  const builder = new SourceBuilder();

  builder.append(`import type { HTMLAttributes } from 'react';
import type { ${name} as HTMLElementClass } from '${importPath}';
import '${importPath}';
${generateTypeImports(referencedTypes, importPath)}`);

  const propMap = mergePropertiesAndAttributes(properties, attributes);
  const propTypes = Array.from(propMap.entries()).map(([propName, propType]) => {
    return `      ${propName}?: ${propType};`;
  }).join('\n');

  builder.append(`declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        '${tagName}': Omit<HTMLElementClass, 'children'> & HTMLAttributes<HTMLElementClass> & {
${propTypes}
        };
      }
    }
  }
}`);

  return builder.toString();
}
