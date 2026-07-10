import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports } from '../core/utils.js';

export const preactPlugin = {
  name: 'preact',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function buildDTS(component: ComponentMetadata): string {
  const { name, tagName, properties, attributes, referencedTypes } = component;
  const builder = new SourceBuilder();

  builder.append(`import type { JSX } from 'preact';
import type { ${name} as HTMLElementClass } from '../../index.js';
import '../../index.js';
${generateTypeImports(referencedTypes)}`);

  const propMap = mergePropertiesAndAttributes(properties, attributes);
  const propTypes = Array.from(propMap.entries()).map(([propName, propType]) => {
    return `      ${propName}?: ${propType};`;
  }).join('\n');

  builder.append(`declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      '${tagName}': JSX.HTMLAttributes<HTMLElementClass> & {
${propTypes}
      };
    }
  }
}`);

  return builder.toString();
}
