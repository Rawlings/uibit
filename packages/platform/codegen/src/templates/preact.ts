import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports, toReactEventName, sanitizeEventType } from '../core/utils.js';

export const preactPlugin = {
  name: 'preact',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function buildDTS(component: ComponentMetadata): string {
  const { name, tagName, properties, attributes, events = [], referencedTypes, importPath = '../../index.js' } = component;
  const builder = new SourceBuilder();

  builder.append(`import type { JSX } from 'preact';
import type { ${name} as HTMLElementClass } from '${importPath}';
import '${importPath}';
${generateTypeImports(referencedTypes, importPath)}`);

  const propMap = mergePropertiesAndAttributes(properties, attributes);
  const propTypes = Array.from(propMap.entries()).map(([propName, propType]) => {
    return `      ${propName}?: ${propType};`;
  }).join('\n');

  const eventTypes = events.map(e => {
    const detailType = e.type?.text ? `CustomEvent<${sanitizeEventType(e.type.text)}>` : `Event`;
    const reactName = toReactEventName(e.name);
    return `      ${reactName}?: (event: ${detailType}) => void;\n      "on:${e.name}"?: (event: ${detailType}) => void;`;
  }).join('\n');

  builder.append(`declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      '${tagName}': JSX.HTMLAttributes<HTMLElementClass> & {
${propTypes}
${eventTypes}
      };
    }
  }
}`);

  return builder.toString();
}
