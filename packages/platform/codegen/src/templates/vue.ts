import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports } from '../core/utils.js';

export const vuePlugin = {
  name: 'vue',
  generate(component: ComponentMetadata) {
    return {
      'index.ts': buildTS(component)
    };
  }
};

function renderVueImports(name: string, referencedTypes: string[], importPath: string): string {
  return [
    `import { defineComponent, h } from 'vue';`,
    `import type { ${name} as HTMLElementClass } from '${importPath}';`,
    `import '${importPath}';`,
    generateTypeImports(referencedTypes, importPath)
  ].filter(Boolean).join('\n');
}

function renderVueComponent(component: ComponentMetadata): string {
  const { name, tagName, events, properties, attributes } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);
  
  const propsList = Array.from(propMap.keys())
    .map(propName => `    ${propName}: { type: [String, Number, Boolean, Array, Object] as any }`)
    .join(',\n');

  const emitsList = events.map(e => `'${e.name}'`).join(', ');

  const eventBindings = events.map(e => {
    const vueEventName = `on${e.name.charAt(0).toUpperCase() + e.name.slice(1)}`;
    return `      eventListeners['${vueEventName}'] = (event: Event) => {
        emit('${e.name}', event);
      };`;
  }).join('\n');

  return `export const ${name} = defineComponent({
  name: '${name}',
  props: {
${propsList}
  },
  emits: [${emitsList}],
  setup(props, { slots, emit }) {
    return () => {
      const eventListeners: Record<string, any> = {};
${eventBindings}

      return h('${tagName}', {
        ...props,
        ...eventListeners
      }, slots.default?.());
    };
  }
});`;
}

function buildTS(component: ComponentMetadata): string {
  const importPath = component.importPath || '../../index.js';
  return new SourceBuilder()
    .append(renderVueImports(component.name, component.referencedTypes, importPath))
    .append(renderVueComponent(component))
    .toString();
}
