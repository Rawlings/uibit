import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports, toReactEventName } from '../core/utils.js';

export const reactPlugin = {
  name: 'react',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function buildDTS(component: ComponentMetadata): string {
  const { name, tagName, properties, attributes, events = [], referencedTypes, importPath = '../../index.js' } = component;
  const builder = new SourceBuilder();

  builder.append(`import type { HTMLAttributes, ClassAttributes } from 'react';
import type { ${name} as HTMLElementClass } from '${importPath}';
import '${importPath}';
${generateTypeImports(referencedTypes, importPath)}`);

  const propMap = mergePropertiesAndAttributes(properties, attributes);
  let propTypes = Array.from(propMap.entries()).map(([propName, propType]) => {
    return `      ${propName}?: ${propType};`;
  }).join('\n');

  if (events.length > 0) {
    const eventTypes = events.map(e => {
      const reactEventName = toReactEventName(e.name);
      return `      ${reactEventName}?: (event: any) => void;`;
    }).join('\n');
    propTypes = propTypes + '\n' + eventTypes;
  }

  builder.append(`declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        '${tagName}': ClassAttributes<HTMLElementClass> & HTMLAttributes<HTMLElementClass> & {
          children?: React.ReactNode;
          class?: string;
${propTypes}
        };
      }
    }
  }
}`);

  return builder.toString();
}
