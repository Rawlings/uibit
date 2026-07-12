import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder } from '../core/utils.js';

export const astroPlugin = {
  name: 'astro',
  generate(component: ComponentMetadata) {
    return {
      'index.d.ts': buildDTS(component)
    };
  }
};

function renderAstroImports(name: string): string {
  return [
    `import type { ${name} as HTMLElementClass } from '../../index.js';`,
    `import '../../index.js';`
  ].join('\n');
}

function renderAstroGlobalDeclaration(tagName: string): string {
  return `declare global {
  namespace astroHTML.JSX {
    interface IntrinsicElements {
      '${tagName}': Partial<HTMLElementClass> & astroHTML.JSX.HTMLAttributes;
    }
  }
}`;
}

function buildDTS(component: ComponentMetadata): string {
  return new SourceBuilder()
    .append(renderAstroImports(component.name))
    .append(renderAstroGlobalDeclaration(component.tagName))
    .toString();
}
