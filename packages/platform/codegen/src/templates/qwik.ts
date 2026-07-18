import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder } from '../core/utils.js';

export const qwikPlugin = {
  name: 'qwik',
  generate(component: ComponentMetadata) {
    return {
      'index.tsx': buildTSX(component),
    };
  },
};

function renderQwikImports(importPath: string): string {
  return [
    `import { component$, Slot } from '@builder.io/qwik';`,
    `import '${importPath}';`,
  ].join('\n');
}

function renderQwikComponent(name: string, tagName: string): string {
  return `export const ${name} = component$<any>((props) => {
  return (
    <${tagName} {...props}>
      <Slot />
    </${tagName}>
  );
});`;
}

function buildTSX(component: ComponentMetadata): string {
  const importPath = component.importPath || '../../index.js';
  return new SourceBuilder()
    .append(renderQwikImports(importPath))
    .append(renderQwikComponent(component.name, component.tagName))
    .toString();
}
