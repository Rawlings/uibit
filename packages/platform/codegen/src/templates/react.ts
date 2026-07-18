import type { ComponentMetadata } from '../core/types.js';
import {
  SourceBuilder,
  mergePropertiesAndAttributes,
  generateTypeImports,
  toReactEventName,
  sanitizeEventType,
} from '../core/utils.js';
import swc from '@swc/core';

export const reactPlugin = {
  name: 'react',
  generate(component: ComponentMetadata) {
    return {
      'index.ts': buildTS(component),
    };
  },
};

function buildTS(component: ComponentMetadata): string {
  const {
    name,
    tagName,
    properties,
    attributes,
    events = [],
    referencedTypes,
    importPath = '../../index.js',
  } = component;
  const builder = new SourceBuilder();

  const propMap = mergePropertiesAndAttributes(properties, attributes);

  builder.append(`import React, { useRef, useEffect, useLayoutEffect, useImperativeHandle } from 'react';
import type { ${name} as HTMLElementClass } from '${importPath}';
import '${importPath}';
${generateTypeImports(referencedTypes, importPath)}

const useTypeOfLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;`);

  const eventMap = new Map<string, string>();
  for (const e of events) {
    eventMap.set(e.name, toReactEventName(e.name));
  }

  const reactProps = new Map<string, string[]>();
  for (const [eventName, reactPropName] of eventMap.entries()) {
    if (!reactProps.has(reactPropName)) {
      reactProps.set(reactPropName, []);
    }
    reactProps.get(reactPropName)?.push(eventName);
  }

  const propTypes = Array.from(propMap.entries())
    .map(([propName, propType]) => {
      const isComplex =
        propType.includes('[]') ||
        propType.includes('Array') ||
        propType.includes('Record') ||
        propType.includes('Object') ||
        propType.startsWith('{');
      const typeStr = isComplex ? `${propType} | string` : propType;
      return `  ${propName}?: ${typeStr};`;
    })
    .join('\n');

  const eventTypes = Array.from(reactProps.entries())
    .map(([reactPropName, eventNames]) => {
      const unionTypes = eventNames.map((eventName) => {
        const e = events.find((event) => event.name === eventName)!;
        return e.type?.text
          ? `CustomEvent<${sanitizeEventType(e.type.text)}>`
          : `Event`;
      });
      const uniqueTypes = Array.from(new Set(unionTypes));
      return `  ${reactPropName}?: (event: ${uniqueTypes.join(' | ')}) => void;`;
    })
    .join('\n');

  const uniqueReactEventProps = Array.from(reactProps.keys());
  const omitKeys = [
    ...Array.from(propMap.keys()).map((k) => `'${k}'`),
    ...uniqueReactEventProps.map((k) => `'${k}'`),
  ].join(' | ');

  builder.append(`export interface ${name}Props extends Omit<React.HTMLAttributes<HTMLElementClass>, ${omitKeys}> {
  children?: React.ReactNode;
${propTypes}
${eventTypes}
}`);

  const effectHooks: string[] = [];

  // Prop-sync effects
  for (const propName of propMap.keys()) {
    effectHooks.push(`  useTypeOfLayoutEffect(() => {
    const element = innerRef.current;
    if (element && props.${propName} !== undefined) {
      (element as any).${propName} = props.${propName};
    }
  }, [props.${propName}]);`);
  }

  // Event-listener effects
  for (const [eventName, reactPropName] of eventMap.entries()) {
    effectHooks.push(`  useTypeOfLayoutEffect(() => {
    const element = innerRef.current;
    if (!element) return;

    const handleEvent = (event: Event) => {
      if (propsRef.current.${reactPropName}) {
        propsRef.current.${reactPropName}(event as any);
      }
    };

    element.addEventListener('${eventName}', handleEvent);
    return () => {
      element.removeEventListener('${eventName}', handleEvent);
    };
  }, []);`);
  }

  const customPropNames = [
    ...Array.from(propMap.keys()).map((k) => `'${k}'`),
    ...uniqueReactEventProps.map((k) => `'${k}'`),
  ];

  builder.append(`export const ${name} = ({
  ref,
  children,
  ...props
}: ${name}Props & { ref?: React.Ref<HTMLElementClass> }) => {
  const innerRef = useRef<HTMLElementClass>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  useImperativeHandle(ref, () => innerRef.current!);

${effectHooks.join('\n\n')}

  const domProps = { ...props };
  const customPropNames = [${customPropNames.join(', ')}];
  for (const key of customPropNames) {
    delete (domProps as any)[key];
  }

  return React.createElement('${tagName}', {
    ref: innerRef,
    ...domProps
  }, children);
};

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        '${tagName}': React.ClassAttributes<HTMLElementClass> & React.HTMLAttributes<HTMLElementClass> & {
          children?: React.ReactNode;
          class?: string;
${Array.from(propMap.entries())
  .map(([name, type]) => {
    const isComplex =
      type.includes('[]') ||
      type.includes('Array') ||
      type.includes('Record') ||
      type.includes('Object') ||
      type.startsWith('{');
    const typeStr = isComplex ? `${type} | string` : type;
    return `          ${name}?: ${typeStr};`;
  })
  .join('\n')}
${Array.from(reactProps.entries())
  .map(([reactPropName, eventNames]) => {
    const unionTypes = eventNames.map((eventName) => {
      const e = events.find((event) => event.name === eventName)!;
      return `CustomEvent<${sanitizeEventType(e.type?.text)}>`;
    });
    const uniqueTypes = Array.from(new Set(unionTypes));
    return `          ${reactPropName}?: (event: ${uniqueTypes.join(' | ')}) => void;`;
  })
  .join('\n')}
        };
      }
    }
  }
}
`);

  const rawSource = builder.toString();
  try {
    const ast = swc.parseSync(rawSource, {
      syntax: 'typescript',
      tsx: true,
      decorators: true,
      comments: true,
      target: 'es2022',
    });
    const output = swc.printSync(ast, {
      minify: false,
    });
    return output.code;
  } catch (e) {
    console.error(
      `Error: Failed to parse generated React component for ${component.name}:`,
      e,
    );
    throw e;
  }
}
