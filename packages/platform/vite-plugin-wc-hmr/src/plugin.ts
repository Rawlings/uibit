import type { Plugin } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

export interface UibitHmrOptions {
  /**
   * Decorator names that register a custom element.
   * Each decorator must accept a tag name as its first argument.
   * Merged with the built-in defaults: ['customElement'].
   *
   * @example
   * // Support FAST's @customElement and a bespoke @define decorator
   * decorators: ['customElement', 'define']
   */
  decorators?: string[];

  /**
   * Additional `customElements.define`-style function names to detect.
   * Each must be called as `fnName('tag-name', ClassName)`.
   * Merged with the built-in default: ['customElements.define'].
   *
   * @example
   * // Support FASTElement.define(MyEl, 'my-el') style calls
   * defineFunctions: ['FASTElement.define']
   */
  defineFunctions?: string[];
}

const VIRTUAL_CLIENT = 'virtual:uibit-hmr/client';
const RESOLVED_CLIENT = `\0${VIRTUAL_CLIENT}`;

interface TagClass {
  tag: string;
  cls: string;
}

function buildDecoratorPattern(names: string[]): RegExp {
  const alts = names
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  return new RegExp(
    `@(?:${alts})\\(\\s*['"\`]([^'"\`]+)['"\`]\\s*\\)\\s+(?:export\\s+)?(?:abstract\\s+)?class\\s+(\\w+)`,
    'g',
  );
}

function buildDefineFunctionPattern(fns: string[]): RegExp {
  const alts = fns
    .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  return new RegExp(
    `(?:${alts})\\(\\s*['"\`]([^'"\`]+)['"\`]\\s*,\\s*(\\w+)`,
    'g',
  );
}

function extractTagClassPairs(
  code: string,
  decoratorPattern: RegExp,
  definePattern: RegExp,
): TagClass[] {
  const pairs: TagClass[] = [];
  const seen = new Set<string>();

  const add = (tag: string | undefined, cls: string | undefined) => {
    if (tag && cls && !seen.has(tag)) {
      seen.add(tag);
      pairs.push({ tag, cls });
    }
  };

  decoratorPattern.lastIndex = 0;
  let m: RegExpExecArray | null = decoratorPattern.exec(code);
  while (m !== null) {
    add(m[1], m[2]);
    m = decoratorPattern.exec(code);
  }

  definePattern.lastIndex = 0;
  m = definePattern.exec(code);
  while (m !== null) {
    add(m[1], m[2]);
    m = definePattern.exec(code);
  }

  return pairs;
}

export function uibitHmr(options: UibitHmrOptions = {}): Plugin {
  const decoratorNames = ['customElement', ...(options.decorators ?? [])];
  const defineFunctions = [
    'customElements.define',
    ...(options.defineFunctions ?? []),
  ];

  const decoratorPattern = buildDecoratorPattern(decoratorNames);
  const definePattern = buildDefineFunctionPattern(defineFunctions);

  const clientSrc = readFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), 'client.js'),
    'utf-8',
  );

  return {
    name: 'uibit-hmr',
    enforce: 'pre',
    apply: 'serve',

    resolveId(id) {
      if (id === VIRTUAL_CLIENT) return RESOLVED_CLIENT;
      return undefined;
    },

    load(id) {
      if (id === RESOLVED_CLIENT) return clientSrc;
      return undefined;
    },

    transform(code, id) {
      if (id.includes('node_modules')) return;
      if (!id.endsWith('.ts') && !id.endsWith('.js')) return;
      if (id.endsWith('.test.ts') || id.endsWith('.spec.ts')) return;

      const pairs = extractTagClassPairs(code, decoratorPattern, definePattern);
      if (pairs.length === 0) return;

      const registerCalls = pairs
        .map(
          ({ tag, cls }) =>
            `  __wcHmr.register(import.meta, ${JSON.stringify(tag)}, ${cls});`,
        )
        .join('\n');

      return {
        code:
          `import * as __wcHmr from '${VIRTUAL_CLIENT}';\n` +
          code +
          `\nif (import.meta.hot) {\n${registerCalls}\n  import.meta.hot.accept();\n}`,
        map: null,
      };
    },
  };
}
