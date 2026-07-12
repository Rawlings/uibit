import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports } from '../core/utils.js';

export const sveltePlugin = {
  name: 'svelte',
  generate(component: ComponentMetadata) {
    return {
      'index.svelte': buildSvelte(component)
    };
  }
};

function renderSvelteScriptImports(name: string, referencedTypes: string[]): string {
  return [
    `import '../../index.js';`,
    `import type { ${name} as HTMLElementClass } from '../../index.js';`,
    generateTypeImports(referencedTypes)
  ].filter(Boolean).join('\n');
}

function renderSveltePropsDeclaration(propMap: Map<string, string>, namedSlots: any[]): string {
  const svelteProps = Array.from(propMap.keys()).map(name => `${name} = undefined`).join(',\n    ');
  const slotProps = namedSlots.map(s => `${s.name} = undefined`).join(',\n    ');
  const allProps = [svelteProps, slotProps, 'children'].filter(Boolean).join(',\n    ');

  const svelteTypes = Array.from(propMap.entries()).map(([propName, propType]) => {
    return `  ${propName}?: ${propType};`;
  }).join('\n');

  const slotTypes = namedSlots.map(s => `  ${s.name}?: import('svelte').Snippet;`).join('\n');

  return `let {
  ${allProps}
} = $props<{
  children?: any;
${svelteTypes}
${slotTypes}
}>();`;
}

function renderSvelteEffects(propMap: Map<string, string>): string {
  const svelteEffects = Array.from(propMap.keys()).map(propName => {
    return `  if (elementRef && ${propName} !== undefined) {
    elementRef.${propName} = ${propName};
  }`;
  }).join('\n');

  return `let elementRef: HTMLElementClass | null = $state(null);

$effect(() => {
${svelteEffects}
});`;
}

function renderSvelteScriptBlock(component: ComponentMetadata): string {
  const { name, properties, attributes, slots, referencedTypes } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);
  const namedSlots = slots.filter(s => s.name && s.name !== '');

  const scriptContent = new SourceBuilder()
    .append(renderSvelteScriptImports(name, referencedTypes))
    .append(renderSveltePropsDeclaration(propMap, namedSlots))
    .append(renderSvelteEffects(propMap))
    .toString();

  const indentedContent = scriptContent
    .split('\n')
    .map(line => '  ' + line)
    .join('\n');

  return `<script lang="ts">
${indentedContent}
</script>`;
}

function renderSvelteTemplate(component: ComponentMetadata): string {
  const { tagName, slots } = component;
  const namedSlots = slots.filter(s => s.name && s.name !== '');

  const projectedSlots = namedSlots.map(s => {
    return `  {#if ${s.name}}
    <div slot="${s.name}">
      {@render ${s.name}()}
    </div>
  {/if}`;
  }).join('\n');

  return `<${tagName} bind:this={elementRef} {...$$restProps}>
${projectedSlots}
  {#if children}
    {@render children()}
  {:else}
    <slot />
  {/if}
</${tagName}>`;
}

function buildSvelte(component: ComponentMetadata): string {
  return new SourceBuilder()
    .append(renderSvelteScriptBlock(component))
    .append(renderSvelteTemplate(component))
    .toString();
}
