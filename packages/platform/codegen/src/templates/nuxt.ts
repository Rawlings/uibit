import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder } from '../core/utils.js';

export const nuxtPlugin = {
  name: 'nuxt',
  generate(component: ComponentMetadata) {
    return {
      'index.ts': buildTS(component),
    };
  },
};

function renderNuxtImports(): string {
  return `import { defineNuxtPlugin } from '#app';`;
}

function renderNuxtPlugin(importPath: string): string {
  return `export default defineNuxtPlugin(() => {
  if (process.client) {
    import('${importPath}');
  }
});`;
}

function buildTS(component: ComponentMetadata): string {
  const importPath = component.importPath || '../../index.js';
  return new SourceBuilder()
    .append(renderNuxtImports())
    .append(renderNuxtPlugin(importPath))
    .toString();
}
