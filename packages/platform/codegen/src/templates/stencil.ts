import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports } from '../core/utils.js';

export const stencilPlugin = {
  name: 'stencil',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function buildDTS(component: ComponentMetadata): string {
  const { name, tagName, properties, attributes, referencedTypes } = component;
  const builder = new SourceBuilder();

  builder.append(`import type { ${name} as HTMLElementClass } from '../../index.js';
import '../../index.js';
${generateTypeImports(referencedTypes)}`);

  const propMap = mergePropertiesAndAttributes(properties, attributes);
  const propTypes = Array.from(propMap.entries()).map(([propName, propType]) => {
    return `    ${propName}?: ${propType};`;
  }).join('\n');

  builder.append(`declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      '${tagName}': HTMLElementClass & {
${propTypes}
      };
    }
  }
}`);

  return builder.toString();
}
