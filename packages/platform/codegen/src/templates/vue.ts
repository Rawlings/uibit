import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports, capitalize, isEventAssociatedWithProp } from '../core/utils.js';
import swc from '@swc/core';

export const vuePlugin = {
  name: 'vue',
  generate(component: ComponentMetadata) {
    return {
      'index.ts': buildTS(component)
    };
  }
};

function buildTS(component: ComponentMetadata): string {
  const { name, tagName, events = [], properties, attributes, formAssociated, referencedTypes, importPath = '../../index.js' } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);

  const builder = new SourceBuilder();

  // Imports
  builder.append(`import { defineComponent, h, ref, watch } from 'vue';
import type { ${name} as HTMLElementClass } from '${importPath}';
import '${importPath}';
${generateTypeImports(referencedTypes, importPath)}`);

  // Build props list
  const propsObj: string[] = [];
  for (const propName of propMap.keys()) {
    propsObj.push(`    ${propName}: { type: [String, Number, Boolean, Array, Object] as any }`);
  }
  if (formAssociated) {
    propsObj.push(`    modelValue: { type: [String, Number, Boolean, Array, Object] as any }`);
  }

  // Build emits list
  const emitsList = events.map(e => `'${e.name}'`);
  if (formAssociated) {
    emitsList.push(`'update:modelValue'`);
  }

  // Setup function with event listeners and property sync
  const eventBindings: string[] = [];
  const handledValueChangeEvents = new Set<string>();

  for (const e of events) {
    const vueEventName = 'on' + capitalize(e.name);
    let handlerBody = `emit('${e.name}', event);`;

    if (formAssociated && isEventAssociatedWithProp(component, e.name, 'value')) {
      handlerBody += `\n        emit('update:modelValue', (event.target as any).value);`;
      handledValueChangeEvents.add(e.name);
    }

    eventBindings.push(`      eventListeners['${vueEventName}'] = (event: Event) => {
        ${handlerBody}
      };`);
  }

  // Fallback for formAssociated if no custom value-change event was found in the events list
  if (formAssociated && handledValueChangeEvents.size === 0) {
    eventBindings.push(`      eventListeners['onChange'] = (event: Event) => {
        emit('update:modelValue', (event.target as any).value);
      };`);
    eventBindings.push(`      eventListeners['onInput'] = (event: Event) => {
        emit('update:modelValue', (event.target as any).value);
      };`);
  }

  builder.append(`export const ${name} = defineComponent({
  name: '${name}',
  props: {
${propsObj.join(',\n')}
  },
  emits: [${emitsList.join(', ')}],
  setup(props, { slots, emit }) {
    const elementRef = ref<HTMLElementClass | null>(null);

    // Sync modelValue or value prop to the element's value property
    if (${formAssociated}) {
      watch(() => props.modelValue, (newVal) => {
        if (elementRef.value && newVal !== undefined && elementRef.value.value !== newVal) {
          elementRef.value.value = newVal;
        }
      });
      watch(() => props.value, (newVal) => {
        if (elementRef.value && newVal !== undefined && elementRef.value.value !== newVal) {
          elementRef.value.value = newVal;
        }
      });
    }

    // Watch other props to sync to element properties
    ${Array.from(propMap.keys()).filter(k => k !== 'value').map(propName => `
    watch(() => props.${propName}, (newVal) => {
      if (elementRef.value && newVal !== undefined) {
        (elementRef.value as any).${propName} = newVal;
      }
    });`).join('')}

    return () => {
      const eventListeners: Record<string, any> = {};
${eventBindings.join('\n')}

      const mergedProps = {
        ...props,
        ...eventListeners,
        ref: elementRef
      };

      if (${formAssociated} && props.modelValue !== undefined) {
        (mergedProps as any).value = props.modelValue;
      }

      return h('${tagName}', mergedProps, slots.default?.());
    };
  }
});`);

  const rawSource = builder.toString();
  try {
    const ast = swc.parseSync(rawSource, {
      syntax: 'typescript',
      tsx: false,
      decorators: true,
      comments: true,
      target: 'es2022'
    });
    const output = swc.printSync(ast, {
      minify: false
    });
    return output.code;
  } catch (e) {
    console.error(`Error: Failed to parse generated Vue component for ${component.name}:`, e);
    throw e;
  }
}

