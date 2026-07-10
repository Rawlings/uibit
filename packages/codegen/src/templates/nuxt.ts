import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder } from '../core/utils.js';

export const nuxtPlugin = {
  name: 'nuxt',
  generate(_component: ComponentMetadata) {
    return {
      'index.ts': buildTS()
    };
  }
};

function renderNuxtImports(): string {
  return `import { defineNuxtPlugin } from '#app';`;
}

function renderNuxtPlugin(): string {
  return `export default defineNuxtPlugin(() => {
  if (process.client) {
    import('../../index.js');
  }
});`;
}

function buildTS(): string {
  return new SourceBuilder()
    .append(renderNuxtImports())
    .append(renderNuxtPlugin())
    .toString();
}
