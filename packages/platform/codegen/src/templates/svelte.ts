import type { ComponentMetadata } from '../core/types.js';
import {
  SourceBuilder,
  mergePropertiesAndAttributes,
  generateTypeImports,
} from '../core/utils.js';

export const sveltePlugin = {
  name: 'svelte',
  generate(component: ComponentMetadata) {
    return {
      'index.svelte': buildSvelte(component),
    };
  },
};

function buildSvelte(component: ComponentMetadata): string {
  const {
    name,
    tagName,
    properties,
    attributes,
    events = [],
    slots,
    referencedTypes,
    importPath = '../../index.js',
  } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);
  const namedSlots = slots.filter((s) => s.name && s.name !== '');

  const builder = new SourceBuilder();

  // Imports
  builder.append(`<script lang="ts">
  import '${importPath}';
  import type { ${name} as HTMLElementClass } from '${importPath}';
  ${generateTypeImports(referencedTypes, importPath)}`);

  // Props declaration using Svelte 5 $bindable() and restProps
  const svelteProps = Array.from(propMap.keys())
    .map((name) => `    ${name} = $bindable()`)
    .join(',\n');
  const slotProps = namedSlots
    .map((s) => `    ${s.name} = undefined`)
    .join(',\n');
  const allProps = [svelteProps, slotProps, '    children', '    ...restProps']
    .filter(Boolean)
    .join(',\n');

  const svelteTypes = Array.from(propMap.entries())
    .map(([propName, propType]) => {
      return `    ${propName}?: ${propType};`;
    })
    .join('\n');

  const slotTypes = namedSlots
    .map((s) => `    ${s.name}?: import('svelte').Snippet;`)
    .join('\n');

  builder.append(`  let {
${allProps}
  } = $props<{
    children?: import('svelte').Snippet;
${svelteTypes}
${slotTypes}
    [key: string]: any;
  }>();`);

  // Element ref
  builder.append(`  let elementRef: HTMLElementClass | null = $state(null);`);

  // Effect to sync properties from Svelte to Web Component
  const syncToElement = Array.from(propMap.keys())
    .map((propName) => {
      return `    if (elementRef && ${propName} !== undefined && elementRef.${propName} !== ${propName}) {
      elementRef.${propName} = ${propName};
    }`;
    })
    .join('\n');

  builder.append(`  $effect(() => {
${syncToElement}
  });`);

  // Effect to sync properties from Web Component back to Svelte when events fire
  const syncToSvelte = Array.from(propMap.keys())
    .map((propName) => {
      return `      if (${propName} !== element.${propName}) {
        ${propName} = element.${propName} as any;
      }`;
    })
    .join('\n');

  const eventsList = Array.from(
    new Set(['change', 'input', ...events.map((e) => e.name)]),
  );

  builder.append(`  $effect(() => {
    const element = elementRef;
    if (!element) return;

    const handleEvent = () => {
${syncToSvelte}
    };

    const events = [${eventsList.map((e) => `'${e}'`).join(', ')}];
    for (const event of events) {
      element.addEventListener(event, handleEvent);
    }
    return () => {
      for (const event of events) {
        element.removeEventListener(event, handleEvent);
      }
    };
  });`);

  builder.append(`</script>`);

  // Template section
  const projectedSlots = namedSlots
    .map((s) => {
      return `  {#if ${s.name}}
    <div slot="${s.name}">
      {@render ${s.name}()}
    </div>
  {/if}`;
    })
    .join('\n');

  builder.append(`<${tagName} bind:this={elementRef} {...restProps}>
${projectedSlots}
  {#if children}
    {@render children()}
  {:else}
    <slot />
  {/if}
</${tagName}>`);

  return builder.toString();
}
