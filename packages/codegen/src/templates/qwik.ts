import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder } from '../core/utils.js';

export const qwikPlugin = {
  name: 'qwik',
  generate(component: ComponentMetadata) {
    return {
      'index.tsx': buildTSX(component)
    };
  }
};

function renderQwikImports(): string {
  return [
    `import { component$, Slot } from '@builder.io/qwik';`,
    `import '../../index.js';`
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
  return new SourceBuilder()
    .append(renderQwikImports())
    .append(renderQwikComponent(component.name, component.tagName))
    .toString();
}
